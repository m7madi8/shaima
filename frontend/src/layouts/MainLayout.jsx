import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    destroyLenis,
    initLenis,
    pauseLenis,
    resumeLenis,
} from "../lib/lenis";
import PreloaderII from "../components/Preloader/PreloaderII";
import Logo from "../components/Buttons/Logo";
import Footer from "../components/Footer/Footer";
import Menu from "../components/Menu";

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        initLenis();

        const handleOverlay = (event) => {
            if (event.detail?.isOpen) pauseLenis();
            else resumeLenis();
        };

        window.addEventListener("menu:toggle", handleOverlay);
        window.addEventListener("reserve:toggle", handleOverlay);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        window.addEventListener("resize", refresh);

        return () => {
            window.removeEventListener("menu:toggle", handleOverlay);
            window.removeEventListener("reserve:toggle", handleOverlay);
            window.removeEventListener("load", refresh);
            window.removeEventListener("resize", refresh);
            destroyLenis();
        };
    }, []);

    useEffect(() => {
        const id = window.setTimeout(() => ScrollTrigger.refresh(), 180);
        return () => window.clearTimeout(id);
    }, [pathname]);

    return (
        <>
            <PreloaderII />
            <Logo />
            <Menu />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        <Outlet />
                        <Footer />
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;
