import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND_NAME_AR } from '../../constants/brand';
import RequestCta from '../RequestCta/RequestCta';
import './about.css';

gsap.registerPlugin(ScrollTrigger);

const principles = [
    { no: '01', title: 'الفكرة', text: 'كل مشروع يبدأ بقراءة المكان وشخصيتكم، قبل أي خامة أو لون.' },
    { no: '02', title: 'المادة', text: 'أخامات طبيعية وتفاصيل متقنة تعيش مع الوقت، لا تبهت بعد الموسم.' },
    { no: '03', title: 'التوازن', text: 'جمال واضح ووظيفة هادئة في المساحة نفسها، بلا مبالغة ولا نقص.' },
];

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-text',
                { y: 48, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-section',
                        start: 'top 72%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-section" ref={sectionRef} aria-labelledby="about-title">
            <div className="about-shell">
                <header className="about-header">
                    <span className="about-text about-label">من أنا</span>
                    <h2 id="about-title" className="about-text about-title">
                        أصمم
                        <span>مساحات راقية</span>
                    </h2>
                </header>

                <div className="about-body">
                    <p className="about-text about-lead">
                        أنا {BRAND_NAME_AR}، مهندسة معمارية. أؤمن بأن كل مساحة تحمل قصة فريدة تستحق أن تُروى بأسلوب راقٍ ومتقن.
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
