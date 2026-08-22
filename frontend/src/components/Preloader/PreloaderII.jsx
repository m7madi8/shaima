import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "./preloaderII.css";
import { BRAND_NAME } from "../../constants/brand";

export default function PreloaderII() {
    useGSAP(() => {
        try {
            gsap.set(".preloader-progress-fill", { scaleX: 0 });
            gsap.set(".preloader-brand-name", { opacity: 0, y: 16 });

            const tl = gsap.timeline({ delay: 0.08 });

            tl.to(".preloader-brand-name", {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power3.out",
            })
            .to(
                ".preloader-progress-fill",
                {
                    scaleX: 1,
                    duration: 0.7,
                    ease: "power2.inOut",
                },
                "-=0.18"
            )
            .to(
                ".preloader-brand-name",
                {
                    opacity: 0,
                    y: -10,
                    duration: 0.22,
                    ease: "power2.in",
                },
                "+=0.08"
            )
            .to(
                ".preloader-panel",
                {
                    y: "-100%",
                    duration: 0.55,
                    ease: "power4.inOut",
                },
                "-=0.08"
            )
            .to(
                ".preloader-mask",
                {
                    scale: 5,
                    duration: 0.85,
                    ease: "power3.inOut",
                },
                "-=0.42"
            )
            .to(
                ".preloader-mask",
                {
                    opacity: 0,
                    duration: 0.28,
                    ease: "power2.out",
                },
                "-=0.28"
            )
            .set(".preloader-root", { display: "none" });
        } catch (e) {
            console.warn("Preloader animation fallback:", e);
        }
    }, []);

    return (
        <div className="preloader-root fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
            <div className="preloader-panel">
                <div className="preloader-inner">
                    <div className="preloader-logo">
                        <span className="preloader-brand-name">{BRAND_NAME}</span>
                    </div>

                    <div className="preloader-progress-track">
                        <div className="preloader-progress-fill" />
                    </div>
                </div>
            </div>

            <div className="preloader-mask" />
        </div>
    );
}
