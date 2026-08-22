import { useEffect, useRef, useState, useCallback, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useNavigate } from 'react-router-dom';
import { FaArrowDown, FaArrowLeft } from 'react-icons/fa';
import interiorBg from '../../assets/interior.jpg';
import exteriorBg from '../../assets/exterior.jpg';
import gardenBg from '../../assets/landscape-design.jpg';
import RequestCta from '../RequestCta/RequestCta';
import './services.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const panels = [
    {
        id: 'interior',
        number: '01',
        title: 'تصميم داخلي',
        desc: 'تصاميم داخلية فاخرة تجمع بين الأناقة والوظيفة، لخلق مساحات معيشية مريحة تعكس ذوقكم وشخصيتكم الفريدة.',
        image: interiorBg,
        imageAlt: 'تصميم داخلي',
        filter: 'interior',
    },
    {
        id: 'exterior',
        number: '02',
        title: 'تصميم خارجي',
        desc: 'واجهات معمارية مبتكرة تعكس الهوية البصرية وتندمج بانسجام مع البيئة المحيطة، بأناقة تصمد أمام الزمن.',
        image: exteriorBg,
        imageAlt: 'تصميم خارجي',
        filter: 'exterior',
    },
    {
        id: 'garden',
        number: '03',
        title: 'تصميم حدائق',
        desc: 'حدائق ومساحات خارجية تُصمَّم كامتداد للبيت: هوية نباتية متزنة، مسارات هادئة، وإحساس بالفخامة في الهواء الطلق.',
        image: gardenBg,
        imageAlt: 'تصميم حدائق',
        filter: 'garden',
    },
];

const Services = () => {
    const sectionRef = useRef(null);
    const panelRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [navVisible, setNavVisible] = useState(false);
    const navigate = useNavigate();

    const goToPanel = useCallback((index) => {
        const panel = panelRefs.current[index];
        if (!panel) return;

        gsap.to(window, {
            scrollTo: { y: panel, autoKill: true },
            duration: 0.65,
            ease: 'power2.inOut',
            overwrite: true,
        });
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const triggers = [];

        const ctx = gsap.context(() => {
            panelRefs.current.forEach((panel, index) => {
                if (!panel) return;

                const img = panel.querySelector('.services-panel__img');
                const contentItems = panel.querySelectorAll('.services-panel__content > *');

                gsap.from(contentItems, {
                    y: 32,
                    duration: 0.75,
                    stagger: 0.07,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                });

                if (img) {
                    gsap.fromTo(
                        img,
                        { scale: 1.06 },
                        {
                            scale: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: panel,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            },
                        }
                    );
                }

                const st = ScrollTrigger.create({
                    trigger: panel,
                    start: 'top 55%',
                    end: 'bottom 45%',
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                });
                triggers.push(st);
            });

            const sectionSt = ScrollTrigger.create({
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => setNavVisible(true),
                onLeave: () => setNavVisible(false),
                onEnterBack: () => setNavVisible(true),
                onLeaveBack: () => setNavVisible(false),
            });
            triggers.push(sectionSt);

            ScrollTrigger.refresh();
        }, section);

        return () => {
            triggers.forEach((st) => st.kill());
            ctx.revert();
        };
    }, []);

    const handleExploreClick = (category) => {
        navigate('/projects', { state: { filter: category } });
    };

    return (
        <section className="services-section" ref={sectionRef} aria-label="خدمات التصميم">
            {panels.map((panel, index) => (
                <Fragment key={panel.id}>
                    {index > 0 && (
                        <div className="services-divider" aria-hidden="true">
                            <span className="services-divider__line" />
                            <span className="services-divider__dot" />
                            <span className="services-divider__line" />
                        </div>
                    )}

                    <article
                        id={`service-${panel.id}`}
                        ref={(el) => {
                            panelRefs.current[index] = el;
                        }}
                        className={`services-panel services-panel--${panel.id}`}
                    >
                        <div className="services-panel__frame">
                            <img
                                src={panel.image}
                                alt={panel.imageAlt}
                                className="services-panel__img"
                                loading={index === 0 ? 'eager' : 'lazy'}
                            />
                            <div className="services-panel__overlay" />

                            <div className="services-panel__content">
                                <span className="services-panel__number">{panel.number}</span>
                                <h2 className="services-panel__title">{panel.title}</h2>
                                <p className="services-panel__desc">{panel.desc}</p>
                                <div className="services-panel__actions">
                                    <button
                                        type="button"
                                        onClick={() => handleExploreClick(panel.filter)}
                                        className="services-panel__btn"
                                    >
                                        اكتشف المزيد
                                        <FaArrowLeft className="text-sm" aria-hidden="true" />
                                    </button>
                                    <RequestCta
                                        service={panel.id}
                                        label="اطلب هذه الخدمة"
                                        theme="light"
                                    />
                                </div>
                            </div>

                            {index === 0 && (
                                <span className="services-panel__hint">
                                    مرر للأسفل
                                    <FaArrowDown aria-hidden="true" />
                                </span>
                            )}
                        </div>
                    </article>
                </Fragment>
            ))}

            <nav
                className={`services-nav${navVisible ? ' services-nav--visible' : ''}`}
                aria-label="التنقل بين الخدمات"
            >
                <div className="services-nav__dots">
                    {panels.map((panel, index) => (
                        <button
                            key={panel.id}
                            type="button"
                            className={`services-nav__dot${activeIndex === index ? ' services-nav__dot--active' : ''}`}
                            onClick={() => goToPanel(index)}
                            aria-label={panel.title}
                            aria-current={activeIndex === index ? 'true' : undefined}
                        />
                    ))}
                </div>
                <div className="services-nav__bar" aria-hidden="true">
                    <span
                        className="services-nav__bar-fill"
                        style={{ transform: `scaleX(${(activeIndex + 1) / panels.length})` }}
                    />
                </div>
            </nav>
        </section>
    );
};

export default Services;
