import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { isInternal, navigate, toHash } from "../router";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
};

/** next/link for the cartridge: a site path becomes a hash route, anything else stays a link. */
// prefetch and scroll are taken out only so they never reach the <a>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, prefetch, replace, scroll, onClick, ...rest }, ref) {
  if (!isInternal(href)) return <a ref={ref} href={href} onClick={onClick} {...rest} />;
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href, replace);
  };
  return <a ref={ref} href={toHash(href)} onClick={go} {...rest} />;
});

export default Link;
