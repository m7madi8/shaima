import { useEffect, useState } from "react";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import heroBg from "../../assets/hero-background.jpg";
import BrandLogo from "../Brand/BrandLogo";
import { BRAND_NAME_AR } from "../../constants/brand";
import Reserve from "../Reserve";
import RequestCta from "../RequestCta/RequestCta";
import { prefersReducedMotion } from "../../lib/lenis";
import "./hero.css";

const Hero = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 769px)");
        const update = () => setIsDesktop(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    useGSAP(() => {
        if (isDesktop || prefersReducedMotion()) return;

        gsap.fromTo(
            ".hero-reveal",
            { y: 12, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                delay: 0.12,
            }
        );
    }, [isDesktop]);

    return (
        <section className="hero-section">
            <div className="hero-frame">
                <Reserve />

                <div className="hero-media hero-media--mobile" aria-hidden="true">
                    <img
                        src={heroBg}
                        alt=""
                        className="hero-still"
                        fetchPriority="high"
                        decoding="async"
                    />
                </div>

                {isDesktop && (
                    <div className="hero-media hero-media--desktop" aria-hidden="true">
                        <img
                            src={heroBg}
                            alt=""
                            className="hero-img"
                            fetchPriority="high"
                            decoding="async"
                        />
                    </div>
                )}

                <div className="hero-content">
                    <div className="hero-content__top">
                        <BrandLogo
                            useImage
                            name=""
                            tagline={false}
                            theme="light"
                            size="hero"
                            imageAlt={BRAND_NAME_AR}
                            className="hero-brand hero-reveal"
                        />
                    </div>

                    <div className="hero-content__bottom">
                        <div className="hero-copy hero-reveal">
                            <RequestCta
                                service="consultation"
                                label="اطلب استشارة"
                                theme="dark"
                                className="hero-cta"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
