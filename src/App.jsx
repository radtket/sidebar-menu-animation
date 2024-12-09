import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { gsap } from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

gsap.defaults({
  ease: "main",
  duration: 0.7,
});

function App() {
  const [isOpen, setOpen] = useState(false);
  const app = useRef(null);
  const tl = useRef();

  const onClick = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".nav", { display: "none" });

      tl.current = gsap.timeline();
    }, app);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    tl.current = isOpen
      ? tl.current
          .clear()
          .set(".nav", { display: "block" })
          .set(".menu", { xPercent: 0 }, "<")
          .fromTo(
            ".menu-button p",
            { yPercent: 0 },
            { yPercent: -100, stagger: 0.2 }
          )
          .fromTo(".menu-button-icon", { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(".overlay", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(
            ".bg-panel",
            { xPercent: 101 },
            { xPercent: 0, stagger: 0.12, duration: 0.575 },
            "<"
          )
          .fromTo(
            ".menu-link",
            { yPercent: 140, rotate: 10 },
            { yPercent: 0, rotate: 0, stagger: 0.05 },
            "<+=0.35"
          )
          .fromTo(
            "[data-menu-fade]",
            { autoAlpha: 0, yPercent: 50 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04 },
            "<+=0.2"
          )
      : tl.current
          .clear()
          .to(".overlay", { autoAlpha: 0 })
          .to(".menu", { xPercent: 120 }, "<")
          .to(".menu-button p", { yPercent: 0 }, "<")
          .to(".menu-button-icon", { rotate: 0 }, "<")
          .set(".nav", { display: "none" });
  }, [isOpen]);

  useLayoutEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === "Escape" && isOpen) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <main ref={app}>
      <div className="shared-style-ui">
        <header className="header">
          <div className="container">
            <nav className="nav-row">
              <a
                aria-label="home"
                href="https://shared-style.supply/"
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  fill="none"
                  viewBox="0 0 66 20"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.67499 19.3499C4.32499 19.3499 0.899994 15.4249 0.899994 10.0499C0.899994 4.6749 4.32499 0.774902 9.67499 0.774902C15.025 0.774902 18.45 4.6749 18.45 10.0499C18.45 15.4249 15.025 19.3499 9.67499 19.3499ZM3.77499 10.0499C3.77499 13.7249 5.44999 16.9749 9.67499 16.9749C13.9 16.9749 15.575 13.7249 15.575 10.0499C15.575 6.3749 13.9 3.1499 9.67499 3.1499C5.44999 3.1499 3.77499 6.3749 3.77499 10.0499Z"
                    fill="currentColor"
                  />
                  <path
                    d="M25.7115 19.3499C21.8365 19.3499 19.9115 17.3499 19.8365 14.7499H22.3115C22.4115 16.2249 23.3115 17.3749 25.6865 17.3749C27.8365 17.3749 28.4115 16.4249 28.4115 15.4999C28.4115 13.8999 26.7115 13.7249 25.0615 13.3749C22.8365 12.8499 20.2865 12.1999 20.2865 9.5499C20.2865 7.3499 22.0615 5.8749 25.1365 5.8749C28.6365 5.8749 30.3115 7.7499 30.4865 9.9499H28.0115C27.8365 8.9749 27.3115 7.8499 25.1865 7.8499C23.5365 7.8499 22.8365 8.4999 22.8365 9.4499C22.8365 10.7749 24.2615 10.8999 26.0615 11.2999C28.4115 11.8499 30.9615 12.5249 30.9615 15.3749C30.9615 17.8499 29.0615 19.3499 25.7115 19.3499Z"
                    fill="currentColor"
                  />
                  <path
                    d="M40.5435 10.8249C40.5435 9.1249 40.1935 7.9749 38.3186 7.9749C36.4936 7.9749 35.3435 9.2499 35.3435 11.1749V18.9999H32.8935V6.2499H35.3435V7.8499H35.3935C36.0685 6.8749 37.2435 5.8749 39.1685 5.8749C40.9435 5.8749 42.0435 6.6749 42.5435 8.0999H42.5935C43.5185 6.8749 44.8185 5.8749 46.7685 5.8749C49.3435 5.8749 50.6436 7.4249 50.6436 10.1499V18.9999H48.1936V10.8249C48.1936 9.1249 47.8435 7.9749 45.9685 7.9749C44.1435 7.9749 42.9935 9.2499 42.9935 11.1749V18.9999H40.5435V10.8249Z"
                    fill="currentColor"
                  />
                  <path
                    d="M59.0281 19.3749C55.0531 19.3749 52.6531 16.6249 52.6531 12.6249C52.6531 8.6499 55.0531 5.8499 59.0531 5.8499C63.0031 5.8499 65.4031 8.6249 65.4031 12.5999C65.4031 16.5999 63.0031 19.3749 59.0281 19.3749ZM55.2031 12.6249C55.2031 15.2749 56.4031 17.3499 59.0531 17.3499C61.6531 17.3499 62.8531 15.2749 62.8531 12.6249C62.8531 9.9499 61.6531 7.8999 59.0531 7.8999C56.4031 7.8999 55.2031 9.9499 55.2031 12.6249Z"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  fill="none"
                  viewBox="0 0 160 160"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <div>
                <button className="menu-button" onClick={onClick} type="button">
                  <div className="menu-button-text">
                    <p>Menu</p>
                    <p>Close</p>
                  </div>
                  <figure className="icon-wrap">
                    <svg
                      className="menu-button-icon"
                      fill="none"
                      viewBox="0 0 16 16"
                      width="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                        fill="currentColor"
                      />
                    </svg>
                  </figure>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="cloneable">
        <svg
          fill="none"
          viewBox="0 0 160 160"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
            fill="currentColor"
          />
        </svg>
        <div className="nav">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="overlay" onClick={onClick} />
          <nav className="menu">
            <div className="menu-bg">
              <div className="bg-panel" />
              <div className="bg-panel" />
              <div className="bg-panel" />
            </div>
            <div className="menu-inner">
              <ul className="menu-list">
                {[
                  { href: "/about", text: "About us" },
                  { href: "/work", text: "Our work" },
                  { href: "/services", text: "Services" },
                  { href: "/blog", text: "Blog" },
                  { href: "/contact", text: "Contact us" },
                ].map(({ href, text }, idx) => {
                  return (
                    <li key={href}>
                      <a className="menu-link" href={href}>
                        <p className="menu-link-heading">{text}</p>
                        <p className="eyebrow">{"0".concat(idx + 1)}</p>
                        <div className="menu-link-bg" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div>
                <p data-menu-fade="">Socials</p>
                <div className="socials-row">
                  {[
                    { href: "#", text: "Instagram" },
                    { href: "#", text: "LinkedIn" },
                    { href: "#", text: "X/Twitter" },
                    { href: "#", text: "Awwwards" },
                  ].map(({ href, text }) => {
                    return (
                      <a key={text} data-menu-fade="" href={href}>
                        {text}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </main>
  );
}

export default App;
