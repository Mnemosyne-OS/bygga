import Link from "next/link";
import Logo from "./Logo";
import { GITHUB_URL, SCAN_ENABLED } from "@/lib/site";

const MARKS = [0, 50, 100];

export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="foot-ruler" aria-hidden="true">
        {MARKS.map((m) => (
          <span key={m} style={{ left: `${m}%` }}>
            {m === 100 ? "100 cm" : m}
          </span>
        ))}
      </div>
      <div className="foot-main">
        <Logo size={22} />
        <nav className="foot-nav" aria-label="Footer">
          <Link href="/browse">All guides</Link>
          <Link href="/builds">Workshop</Link>
          {SCAN_ENABLED && <Link href="/scan">Scan a manual</Link>}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
      <div className="foot-base">
        <p>Not affiliated with IKEA. Product names are trademarks of Inter IKEA Systems B.V.</p>
        <a className="foot-powered" href="https://www.together.ai" target="_blank" rel="noreferrer">
          Powered by <span>Together AI</span>
        </a>
      </div>
    </footer>
  );
}
