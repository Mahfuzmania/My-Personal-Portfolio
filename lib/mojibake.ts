const MOJIBAKE_MARKERS = /(?:\u00C3.|\u00C2.|\u00E2.|\u00E0\u00A6|\u00E0\u00A7|\uFFFD)/;
const BANGLA_RANGE = /[\u0980-\u09FF]/;
const MARKER_CHARS = /[\u00C3\u00C2\u00E2\u00E0\uFFFD]/g;

const CP1252_TO_BYTE = new Map<number, number>([
  [0x20ac, 0x80],
  [0x201a, 0x82],
  [0x0192, 0x83],
  [0x201e, 0x84],
  [0x2026, 0x85],
  [0x2020, 0x86],
  [0x2021, 0x87],
  [0x02c6, 0x88],
  [0x2030, 0x89],
  [0x0160, 0x8a],
  [0x2039, 0x8b],
  [0x0152, 0x8c],
  [0x017d, 0x8e],
  [0x2018, 0x91],
  [0x2019, 0x92],
  [0x201c, 0x93],
  [0x201d, 0x94],
  [0x2022, 0x95],
  [0x2013, 0x96],
  [0x2014, 0x97],
  [0x02dc, 0x98],
  [0x2122, 0x99],
  [0x0161, 0x9a],
  [0x203a, 0x9b],
  [0x0153, 0x9c],
  [0x017e, 0x9e],
  [0x0178, 0x9f],
]);

function scoreText(value: string) {
  const banglaCount = (value.match(/[\u0980-\u09FF]/g) ?? []).length;
  const markerCount = (value.match(MARKER_CHARS) ?? []).length;
  return banglaCount * 5 - markerCount * 3;
}

function encodeAsCp1252Bytes(value: string) {
  const output: number[] = [];

  for (const char of value) {
    const codepoint = char.codePointAt(0);
    if (codepoint === undefined) return null;

    if (codepoint <= 0xff) {
      output.push(codepoint);
      continue;
    }

    const mapped = CP1252_TO_BYTE.get(codepoint);
    if (mapped === undefined) return null;
    output.push(mapped);
  }

  return Uint8Array.from(output);
}

function decodeCp1252AsUtf8(value: string) {
  const bytes = encodeAsCp1252Bytes(value);
  if (!bytes) return value;
  return new TextDecoder("utf-8").decode(bytes);
}

export function repairMojibakeText(input: string) {
  let current = input;

  for (let attempt = 0; attempt < 6; attempt += 1) {
    if (!MOJIBAKE_MARKERS.test(current)) break;

    const decoded = decodeCp1252AsUtf8(current);
    if (!decoded || decoded === current) break;

    if (scoreText(decoded) >= scoreText(current)) {
      current = decoded;
      continue;
    }

    break;
  }

  if (BANGLA_RANGE.test(current) && MOJIBAKE_MARKERS.test(current)) {
    const decoded = decodeCp1252AsUtf8(current);
    if (scoreText(decoded) > scoreText(current)) {
      current = decoded;
    }
  }

  return current.normalize("NFC");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

type RepairMode = "all" | "bnOnly";

export function repairMojibakeDeep<T>(value: T, mode: RepairMode = "all"): T {
  function walk(node: unknown, shouldRepair: boolean): unknown {
    if (typeof node === "string") {
      return shouldRepair ? repairMojibakeText(node) : node;
    }

    if (Array.isArray(node)) {
      return node.map((item) => walk(item, shouldRepair));
    }

    if (!isRecord(node)) return node;

    const output: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(node)) {
      const nextShouldRepair = mode === "all" ? true : shouldRepair || key === "bn";
      output[key] = walk(child, nextShouldRepair);
    }

    return output;
  }

  return walk(value, mode === "all") as T;
}
