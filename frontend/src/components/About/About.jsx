import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../lib/lenis';
import { BRAND_NAME_AR, BRAND_FOUNDER_AR } from '../../constants/brand';
import founderImg from '../../assets/arwa.jpg';
import RequestCta from '../RequestCta/RequestCta';
import './about.css';

gsap.registerPlugin(ScrollTrigger);

const principles = [
    { no: '01', title: 'الفكرة', text: 'كل مشروع يبدأ بقراءة المكان وشخصيتكم، قبل أي خامة أو لون.' },
    { no: '02', title: 'المادة', text: 'خامات طبيعية وتفاصيل متقنة تعيش مع الوقت، لا تبهت بعد الموسم.' },
    { no: '03', title: 'التوازن', text: 'جمال واضح ووظيفة هادئة في المساحة نفسها، بلا مبالغة ولا نقص.' },
];

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (prefersReducedMotion() || !sectionRef.current) return undefined;

        sectionRef.current.classList.add('motion-ready');

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-title, .about-lead',
                { y: 14, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.08,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.about-section',
                        start: 'top 76%',
                    },
                }
            );

            gsap.fromTo(
                '.about-portrait img',
                { opacity: 0.55, y: 12 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.about-portrait',
                        start: 'top 82%',
                    },
                }
            );

            gsap.fromTo(
                '.about-principle',
                { y: 12, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    stagger: 0.06,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.about-principles',
                        start: 'top 84%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="about-section" ref={sectionRef} aria-labelledby="about-title">
            <div className="about-shell">
                <header className="about-header">
                    <span className="about-text about-label">{BRAND_NAME_AR}</span>
                    <h2 id="about-title" className="about-text about-title">
                        أصمم
                        <span>مساحات راقية</span>
                    </h2>
                </header>

                <div className="about-body">
                    <figure className="about-text about-portrait">
                        <img src={founderImg} alt={BRAND_FOUNDER_AR} />
                    </figure>
                    <p className="about-text about-lead">
                        أنا {BRAND_FOUNDER_AR}، أقود {BRAND_NAME_AR} وأؤمن أن كل مساحة تحمل قصة تستحق أن تُروى بأسلوب راقٍ ومتقن.
                    </p>
                    <div className="about-copy">
                        <p className="about-text">
                            أسعى إلى خلق بيئات تجمع بين الجمال الخالص والوظيفة الذكية، مع عناية بأدق التفاصيل التي تعكس شخصيتكم وتلبّي احتياجاتكم اليومية.
                        </p>
                        <div className="about-text about-cta">
                            <RequestCta service="collaboration" label="ابدأ مشروعك" theme="dark" />
                        </div>
                    </div>
                </div>

                <ul className="about-principles">
                    {principles.map((item) => (
                        <li key={item.no} className="about-text about-principle">
                            <span className="about-principle__no">{item.no}</span>
                            <h3 className="about-principle__title">{item.title}</h3>
                            <p className="about-principle__text">{item.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default About;
