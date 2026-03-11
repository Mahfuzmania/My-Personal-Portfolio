import io
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

import fitz

REPOS = {
    "EV Powertrain Simulation": "Mahfuzmania/EV-Powertrain-Simulation",
    "Breast Cancer Survival Prediction": "Mahfuzmania/Breast-Cancer-Survival-Prediction",
    "Anomaly Detection Using Gaussian Model": "Mahfuzmania/Anomaly-Detection-Using-Gaussian-Model",
    "ECG Signal Denoising with Wiener Filtering": "Mahfuzmania/ECG-Signal-Denoising-Wiener-Filtering",
    "Image Thresholding for Background Removal": "Mahfuzmania/Image-Thresholding-for-Background-Removal",
    "Bluetooth Interfacing with 8051": "Mahfuzmania/Bluetooth-Interfacing-8051-Final",
}

OUT_ROOT = Path("public/images/projects")
PDF_ROOT = Path("assets/reports")
OUT_ROOT.mkdir(parents=True, exist_ok=True)
PDF_ROOT.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "User-Agent": "portfolio-visual-fetcher",
    "Accept": "application/vnd.github+json",
}


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def request_json(url: str) -> dict:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.loads(r.read().decode("utf-8"))


def request_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": HEADERS["User-Agent"]})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


manifest = {}

for project, repo in REPOS.items():
    repo_meta = request_json(f"https://api.github.com/repos/{repo}")
    branch = repo_meta["default_branch"]

    tree = request_json(f"https://api.github.com/repos/{repo}/git/trees/{branch}?recursive=1")
    pdf_paths = [
        item["path"]
        for item in tree.get("tree", [])
        if item.get("type") == "blob" and item.get("path", "").lower().endswith(".pdf")
    ]

    project_slug = slugify(project)
    project_pdf_dir = PDF_ROOT / project_slug
    project_out_dir = OUT_ROOT / project_slug
    project_pdf_dir.mkdir(parents=True, exist_ok=True)
    project_out_dir.mkdir(parents=True, exist_ok=True)

    extracted_outputs = []

    for pdf_path in pdf_paths:
        encoded_path = urllib.parse.quote(pdf_path)
        raw_url = f"https://raw.githubusercontent.com/{repo}/{branch}/{encoded_path}"
        pdf_bytes = request_bytes(raw_url)

        pdf_name = Path(pdf_path).name
        local_pdf = project_pdf_dir / pdf_name
        local_pdf.write_bytes(pdf_bytes)

        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        image_candidates = []
        for page_index in range(len(doc)):
            page = doc.load_page(page_index)
            seen = set()
            for info in page.get_images(full=True):
                xref = info[0]
                if xref in seen:
                    continue
                seen.add(xref)
                try:
                    base = doc.extract_image(xref)
                except Exception:
                    continue
                if not base:
                    continue
                w = int(base.get("width", 0))
                h = int(base.get("height", 0))
                area = w * h
                if w < 520 or h < 300 or area < 220000:
                    continue
                ext = base.get("ext", "png")
                img_bytes = base.get("image")
                if not img_bytes:
                    continue
                image_candidates.append((area, page_index, ext, img_bytes))

        image_candidates.sort(key=lambda x: x[0], reverse=True)
        top_candidates = image_candidates[:2]

        # If no embedded figures, render 1-2 pages as fallback visuals.
        if not top_candidates:
            fallback_pages = [max(0, len(doc) // 3), max(0, (2 * len(doc)) // 3)]
            for pi in fallback_pages:
                page = doc.load_page(pi)
                pix = page.get_pixmap(matrix=fitz.Matrix(1.7, 1.7), alpha=False)
                img_bytes = pix.tobytes("jpg")
                top_candidates.append((pix.width * pix.height, pi, "jpg", img_bytes))

        for idx, (_, page_index, ext, img_bytes) in enumerate(top_candidates, start=1):
            output_name = f"{Path(pdf_name).stem.lower().replace(' ', '-')}-p{page_index + 1}-{idx}.{ext}"
            output_path = project_out_dir / output_name
            output_path.write_bytes(img_bytes)
            extracted_outputs.append(str(output_path).replace("\\", "/"))

    manifest[project] = {
        "repo": repo,
        "pdfs": pdf_paths,
        "images": extracted_outputs,
    }

manifest_path = OUT_ROOT / "manifest.json"
manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(f"Wrote {manifest_path}")
for project, data in manifest.items():
    print(project)
    print(f"  PDFs: {len(data['pdfs'])}, Images: {len(data['images'])}")
