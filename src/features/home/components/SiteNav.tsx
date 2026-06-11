import { Link } from "@/i18n/routing";

export function SiteNav() {
  return (
    <header className="nav" data-screen-label="nav">
      <a className="nav__mark" href="#top" aria-label="PURE EVIL home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/PURE_EVIL_LOGO_4.png" alt="PURE EVIL emblem" />
        <span className="nav__wordmark">Pure Evil</span>
      </a>
      <nav className="nav__links">
        <a href="#collections">Shop</a>
        <a href="#collections">Collections</a>
        <a href="#lookbook">Lookbook</a>
        <a href="#manifesto">Manifesto</a>
      </nav>
      <div className="nav__util">
        <Link href="/login" className="nav__search">
          Sign In
        </Link>
        <a href="#cult" className="nav__cart">
          Bag <sup>(0)</sup>
        </a>
        <button className="nav__burger" aria-label="Menu">
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
