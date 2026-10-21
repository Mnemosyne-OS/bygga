import { Suspense } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { IGithub, IStar } from "./art/Icons";
import { getStars } from "@/lib/github";
import { GITHUB_URL } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-head">
      <div className="head-left">
        <Logo />
        <NavLinks />
      </div>
      <Suspense fallback={<GithubLink stars={null} />}>
        <GithubStars />
      </Suspense>
    </header>
  );
}

async function GithubStars() {
  const stars = await getStars();
  return <GithubLink stars={stars} />;
}

function GithubLink({ stars }: { stars: number | null }) {
  return (
    <a className="gh" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label={stars === null ? "Bygga on GitHub" : `Bygga on GitHub, ${stars} stars`}>
      <IGithub size={16} />
      <span className="gh-label">GitHub</span>
      {stars !== null && (
        <span className="gh-stars">
          <IStar size={13} strokeWidth={2} />
          {fmtStars(stars)}
        </span>
      )}
    </a>
  );
}

function fmtStars(n: number) {
  if (n < 1000) return String(n);
  return (n / 1000).toFixed(n < 10000 ? 1 : 0).replace(/\.0$/, "") + "k";
}
