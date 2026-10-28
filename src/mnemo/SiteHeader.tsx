import Logo from "@/components/Logo";
import NavLinks from "@/components/NavLinks";
import { IGithub } from "@/components/art/Icons";
import { GITHUB_URL } from "@/lib/site";

/**
 * The site's header without the live star count: that one is an async server component
 * that asks GitHub at render time, and the cartridge has no server to run it.
 */
export default function SiteHeader() {
  return (
    <header className="site-head">
      <div className="head-left">
        <Logo />
        <NavLinks />
      </div>
      <a className="gh" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="Bygga on GitHub">
        <span className="gh-main">
          <IGithub size={17} />
          <span className="gh-label">GitHub</span>
        </span>
      </a>
    </header>
  );
}
