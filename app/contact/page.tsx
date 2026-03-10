import Link from "next/link";
import Image from "next/image";
import { GithubIcon, LinkedInIcon, MailIcon } from "@/components/logo-pack";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { getPortfolioContent } from "@/lib/content-service";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { profile } = await getPortfolioContent();
  const profilePhoto = profile.photoPath || "/images/mahfuzul-islam.jpg";
  const collaborationTopics = [
    "Healthcare data engineering and integration pipelines",
    "Applied machine learning and survival/risk modeling",
    "Engineering simulation and control-oriented analysis",
    "Technical product development for research and software teams",
  ];

  return (
    <div className="space-y-12">
      <Reveal>
        <PageHero
          kicker="Contact"
          title="Open to collaboration in data engineering, AI systems, and technical research"
          description="This is a personal profile. I am open to roles, research collaboration, and technical product work."
        />
      </Reveal>

      <section className="section-shell p-5 md:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="card p-7">
            <h2 className="section-title text-2xl font-semibold">Direct Contact</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <Image
                src={profilePhoto}
                alt="Md. Mahfuzul Islam"
                width={860}
                height={460}
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="mt-5 space-y-3 text-sm text-muted">
              <p>
                <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                  <MailIcon className="h-7 w-7" />
                  Email:
                </span>{" "}
                <a href={`mailto:${profile.email}`} className="hover:text-accent">
                  {profile.email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-foreground">Alternative Email:</span>{" "}
                <a href={`mailto:${profile.secondaryEmail}`} className="hover:text-accent">
                  {profile.secondaryEmail}
                </a>
              </p>
              <p>
                <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                  <GithubIcon className="h-7 w-7" />
                  GitHub:
                </span>{" "}
                <Link href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {profile.github}
                </Link>
              </p>
              <p>
                <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                  <LinkedInIcon className="h-7 w-7" />
                  LinkedIn:
                </span>{" "}
                <Link href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {profile.linkedin}
                </Link>
              </p>
            </div>
            <div className="accent-line my-5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Collaboration Focus
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                {collaborationTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="card p-7">
            <h2 className="section-title text-2xl font-semibold">Quick Message</h2>
            <p className="mt-3 text-sm text-muted">
              Share a concise message about your role, project, or research context.
            </p>
            <form className="mt-5 space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Name</span>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent/50"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Email</span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent/50"
                  placeholder="name@email.com"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Message</span>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent/50"
                  placeholder="Tell me about your project or collaboration idea."
                  required
                />
              </label>
              <button
                type="button"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </article>
        </div>
      </section>
    </div>
  );
}
