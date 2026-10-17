import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import BrandLogo from '../Brand/BrandLogo';
import { BRAND_TAGLINE } from '../../constants/brand';

import "./footertitle.css";

gsap.registerPlugin(ScrollTrigger);

const FooterTitle = () => {
    const ftConRef = useRef(null);

    useGSAP(() => {
        if (!ftConRef.current) return;

        gsap.from(".footer-brand-name", {
            y: 60,
            x: 0,
            opacity: 0,
            scale: 0.96,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ftConRef.current,
                start: "top 90%",
                end: "top 75%",
                scrub: true,
            },
        });
    }, { scope: ftConRef });

    return (
        <section ref={ftConRef} className='relative z-1 w-full min-h-[40vh] border-1 border-t-[var(--terracotta)] overflow-hidden max-w-full'>
            <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-2 px-4 sm:px-6 mt-6'>
                <p className='text-[var(--natural)] text-[0.7rem]'>
                    جميع الحقوق محفوظة © 2026
                </p>
                <p className='text-[var(--natural)] text-[0.7rem] tracking-[0.2em] uppercase' dir="ltr">
                    {BRAND_TAGLINE}
                </p>
            </div>

            <div className='footer-title'>
                <BrandLogo
                    name=""
                    theme="light"
                    size="xl"
                    tagline={false}
                    className="footer-brand-name"
                />
            </div>
        </section>
    );
};

export default FooterTitle;
