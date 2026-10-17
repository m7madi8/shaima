import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import {
    BRAND_NAME,
    BRAND_FOUNDER_AR,
    BRAND_FOUNDER_EN,
    BRAND_INSTAGRAM_URL,
    BRAND_WHATSAPP_URL,
    BRAND_PHONE_DISPLAY,
    BRAND_ADDRESS_AR,
    BRAND_ADDRESS_CITY_AR,
} from '../../constants/brand';
import BrandLogo from '../Brand/BrandLogo';
import RequestCta from '../RequestCta/RequestCta';
import { prefersReducedMotion } from '../../lib/lenis';
import './contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        message: ''
    });

    useEffect(() => {
        if (prefersReducedMotion() || !sectionRef.current) return undefined;

        sectionRef.current.classList.add('motion-ready');

        const ctx = gsap.context(() => {
            gsap.fromTo(".contact-heading, .contact-form",
                { y: 14, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.62,
                    stagger: 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".contact-section",
                        start: "top 76%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('شكراً لتواصلك! سأرد عليك قريباً.');
        setFormData({ name: '', contact: '', message: '' });
    };

    return (
        <section id="contact" className="contact-section" ref={sectionRef} aria-labelledby="contact-title">
            <div className="contact-shell">
                <header className="contact-heading contact-reveal">
                    <span className="contact-kicker">تواصل</span>
                    <h2 id="contact-title">
                        فلنحول فكرتك
                        <span>إلى واقع ملموس</span>
                    </h2>
                </header>

                <div className="contact-grid">
                    <aside className="contact-meta contact-reveal">
                        <p className="contact-lead">
                            أنا هنا للاستماع إلى أفكاركم والرد على استفساراتكم حول مشاريعكم التصميمية.
                        </p>

                        <address className="contact-address">
                            <span>{BRAND_ADDRESS_AR}</span>
                            <span>{BRAND_ADDRESS_CITY_AR}</span>
                        </address>

                        <p className="contact-founder">
                            {BRAND_FOUNDER_AR}
                            <span dir="ltr">{BRAND_FOUNDER_EN}</span>
                        </p>

                        <div className="contact-actions">
                            <div className="contact-social">
                                {BRAND_INSTAGRAM_URL ? (
                                    <a
                                        href={BRAND_INSTAGRAM_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-icon"
                                        aria-label="انستغرام"
                                    >
                                        <FaInstagram />
                                    </a>
                                ) : null}
                                {BRAND_WHATSAPP_URL ? (
                                    <a
                                        href={BRAND_WHATSAPP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-icon"
                                        aria-label={`واتساب ${BRAND_PHONE_DISPLAY}`}
                                    >
                                        <FaWhatsapp />
                                    </a>
                                ) : null}
                            </div>
                            <RequestCta service="contact" label="قدّم طلب خدمة" theme="dark" />
                        </div>
                    </aside>

                    <form onSubmit={handleSubmit} className="contact-form contact-reveal">
                        <div className="contact-field">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <label htmlFor="name">الاسم</label>
                        </div>

                        <div className="contact-field">
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <label htmlFor="contact">وسيلة التواصل</label>
                        </div>

                        <div className="contact-field">
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder=" "
                            />
                            <label htmlFor="message">الرسالة</label>
                        </div>

                        <button type="submit" className="contact-submit">
                            إرسال الرسالة
                        </button>
                    </form>
                </div>

                <footer className="contact-close contact-reveal">
                    <BrandLogo
                        name=""
                        tagline={false}
                        theme="light"
                        size="sm"
                        className="contact-mark"
                    />
                    <p>
                        © 2026 {BRAND_NAME}
                        <span>{BRAND_FOUNDER_AR} · {BRAND_ADDRESS_CITY_AR}</span>
                    </p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
