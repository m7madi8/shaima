import { useEffect, useState } from "react";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import smoke from "../../assets/smoke_final.mp4";
import heroBg from "../../assets/hero-background.jpg";
import BrandLogo from "../Brand/BrandLogo";
import { BRAND_NAME_AR } from "../../constants/brand";
import Reserve from "../Reserve";
import RequestCta from "../RequestCta/RequestCta";
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
        if (isDesktop) {
            gsap.to(".hero-img", {
                yPercent: -5,
                scale: 1.12,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
            return;
        }

        gsap.fromTo(
            ".hero-reveal",
            { y: 22, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.15,
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
                    />
                    <div className="hero-veil" />
                </div>

                {isDesktop && (
                    <div className="hero-media hero-media--desktop" aria-hidden="true">
                        <img src={heroBg} alt="" className="hero-img" />
                        <video
                            src={smoke}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="none"
                            className="hero-smoke"
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
                        <h1 className="hero-headline hero-reveal">
                            <span>عالمي مليان</span>
                            <span>تفاصيل وجمال</span>
                            <span>بعبر عنكم</span>
                        </h1>

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
