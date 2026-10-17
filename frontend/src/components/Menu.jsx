import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiInstagram } from "react-icons/fi";
import {
  BRAND_NAME_AR,
  BRAND_FOUNDER_AR,
  BRAND_INSTAGRAM_URL,
} from "../constants/brand";
import BrandLogo from "./Brand/BrandLogo";
import "./menu.css";

gsap.registerPlugin(useGSAP);

const navItems = [
  { label: "الرئيسية", path: "/", hash: null },
  { label: "من نحن", path: "/#about", hash: "about" },
  { label: "الخدمات", path: "/#services", hash: "services" },
  { label: "تواصل معنا", path: "/#contact", hash: "contact" },
  { label: "طلب الخدمة", path: "/request", hash: null },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => {
    if (!overlayRef.current || !panelRef.current) {
      setIsOpen(false);
      return;
    }
    gsap
      .timeline({ onComplete: () => setIsOpen(false) })
      .to(".menu-link", { y: -12, opacity: 0, duration: 0.22, stagger: 0.02, ease: "power2.in" }, 0)
      .to(panelRef.current, { opacity: 0, duration: 0.28, ease: "power2.in" }, 0)
      .to(overlayRef.current, { opacity: 0, duration: 0.32, ease: "power2.inOut" }, 0.05);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeMenu();
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("menu:toggle", { detail: { isOpen } }));
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useGSAP(
    () => {
      if (!isOpen || !overlayRef.current || !panelRef.current) return;

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(panelRef.current, { opacity: 0 });

      gsap
        .timeline()
        .to(overlayRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" })
        .to(panelRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.12")
        .fromTo(
          ".menu-link",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" },
          "-=0.1"
        );
    },
    { dependencies: [isOpen] }
  );

  return createPortal(
    <>
      <button
        type="button"
        onClick={isOpen ? closeMenu : openMenu}
        aria-expanded={isOpen}
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        className={`menu-toggle${isOpen ? " menu-toggle--open" : ""}`}
        dir="rtl"
      >
        <span className="menu-toggle__icon">{isOpen ? "✕" : "☰"}</span>
        <span className="menu-toggle__label">{isOpen ? "إغلاق" : "القائمة"}</span>
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          className="menu-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل"
        >
          <div ref={panelRef} className="menu-panel">
            <header className="menu-top">
              <BrandLogo
                name=""
                tagline={false}
                theme="dark"
                size="sm"
                imageAlt={BRAND_NAME_AR}
              />
              <p className="menu-top__name">{BRAND_FOUNDER_AR}</p>
            </header>

            <nav className="menu-nav">
              <ul className="menu-nav__list">
                {navItems.map((item, index) => (
                  <li key={item.path} className="menu-nav__item">
                    <Link
                      to={item.path}
                      onClick={() => {
                        closeMenu();
                        if (item.hash) {
                          window.setTimeout(() => {
                            document.getElementById(item.hash)?.scrollIntoView({ behavior: "smooth" });
                          }, 320);
                        }
                      }}
                      className="menu-link"
                    >
                      <span className="menu-index" dir="ltr">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="menu-link__text">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <footer className="menu-foot">
              {BRAND_INSTAGRAM_URL ? (
                <a
                  href={BRAND_INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="انستغرام"
                  className="menu-social__link"
                >
                  <FiInstagram />
                </a>
              ) : null}
              <p>{BRAND_NAME_AR}</p>
            </footer>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Menu;
