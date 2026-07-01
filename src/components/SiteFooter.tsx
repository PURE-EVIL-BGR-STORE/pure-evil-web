export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="foot" data-screen-label="footer">
      <div className="foot__top">
        <div className="foot__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/PURE_EVIL_LOGO_4.png" alt="PURE EVIL" />
          <p>Built for the ones consumed by obsession. Controlled insanity, worn in obsidian.</p>
        </div>
        <div className="foot__col">
          <h5>Shop</h5>
          <a href="#">All Products</a>
          <a href="#">Apparel</a>
          <a href="#">Gymwear</a>
          <a href="#">Accessories</a>
        </div>
        <div className="foot__col">
          <h5>Collections</h5>
          <a href="#">Void</a>
          <a href="#">Ascension</a>
          <a href="#">Ritual</a>
          <a href="#">Eclipse</a>
        </div>
        <div className="foot__col">
          <h5>Info</h5>
          <a href="#">About</a>
          <a href="#">Size Guide</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>
      </div>

      <p className="foot__quote">&ldquo;Obsession is not a flaw. It is a gift.&rdquo;</p>

      <div className="foot__rule"></div>
      <div className="foot__bottom">
        <small>&copy; {year} Pure Evil — All Rights Reserved</small>
        <div className="foot__social">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Discord</a>
        </div>
        <div className="foot__legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
      <div className="foot__ghost" aria-hidden="true">
        Pure Evil
      </div>
    </footer>
  );
}
