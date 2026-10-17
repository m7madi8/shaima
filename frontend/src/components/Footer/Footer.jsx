import { useLocation } from "react-router-dom";
import {
    BRAND_NAME,
    BRAND_FOUNDER_AR,
    BRAND_ADDRESS_CITY_AR,
} from "../../constants/brand";

const Footer = () => {
    const { pathname } = useLocation();
    const isHome = pathname === "/" || pathname === "/shaima";

    if (isHome) return null;

    return (
        <footer className="w-full px-6 py-8 bg-[var(--paper)] border-t border-[var(--ink)]">
            <p className="text-[0.8rem] text-[var(--grey-700)] text-center leading-relaxed">
                © 2026 {BRAND_NAME} · {BRAND_FOUNDER_AR} · {BRAND_ADDRESS_CITY_AR}
            </p>
        </footer>
    );
};

export default Footer;
