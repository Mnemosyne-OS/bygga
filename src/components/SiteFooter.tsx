import Link from "next/link";
import Logo from "./Logo";
import { GITHUB_URL } from "@/lib/site";
import { IArrowUpRight } from "./art/Icons";

export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="foot-ruler" aria-hidden="true">
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} style={{ left: `${i * 10}%` }}>
            {i * 10}
          </span>
        ))}
      </div>
      <div className="foot-main">
        <div className="foot-brand">
          <Logo size={22} />
          <p>Step by step assembly for IKEA furniture, drawn like the paper manual.</p>
        </div>
        <nav className="foot-nav" aria-label="Footer">
          <Link href="/browse">All guides</Link>
          <Link href="/builds">Workshop</Link>
          <Link href="/scan">Scan a manual</Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub <IArrowUpRight size={13} />
          </a>
        </nav>
      </div>
      <div className="foot-base">
        <p>Not affiliated with or endorsed by IKEA. Product names are trademarks of Inter IKEA Systems B.V. Keep the paper manual nearby.</p>
        <a className="foot-powered" href="https://www.together.ai" target="_blank" rel="noreferrer">
          Powered by <span>Together AI</span>
        </a>
      </div>
    </footer>
  );
}
