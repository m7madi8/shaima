import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { FiArrowRight, FiArrowUpLeft, FiCheck } from 'react-icons/fi';
import requestVisual from '../../assets/interior.jpg';
import {
    BRAND_NAME_AR,
    BRAND_TAGLINE,
    BRAND_WHATSAPP_URL,
} from '../../constants/brand';
import {
    REQUEST_SERVICES,
    PROJECT_SCOPES,
    getRequestService,
} from '../../constants/requestServices';
import './request.css';

const INITIAL_FORM = {
    name: '',
    phone: '',
    city: '',
    scope: 'residential',
    message: '',
};

const Request = () => {
    const pageRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const serviceId = searchParams.get('service') || 'contact';
    const selectedService = getRequestService(serviceId);

    const [form, setForm] = useState(INITIAL_FORM);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setIsSubmitted(false);
        setError('');
    }, [serviceId]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.request-reveal',
                { y: 28, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' }
            );
            gsap.fromTo(
                '.request-visual',
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 1.05, ease: 'power3.out' }
            );
        }, pageRef);

        return () => ctx.revert();
    }, [isSubmitted]);

    const handleServiceChange = (id) => {
        setSearchParams({ service: id }, { replace: true });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
            setError('الرجاء تعبئة الاسم ورقم التواصل ووصف المشروع');
            return;
        }

        const scopeLabel =
            PROJECT_SCOPES.find((item) => item.id === form.scope)?.label || form.scope;

        const text = [
            `طلب خدمة — ${BRAND_NAME_AR}`,
            `الخدمة: ${selectedService.label}`,
            `الاسم: ${form.name.trim()}`,
            `التواصل: ${form.phone.trim()}`,
            form.city.trim() ? `المدينة: ${form.city.trim()}` : '',
            `نوع المشروع: ${scopeLabel}`,
            `التفاصيل: ${form.message.trim()}`,
        ]
            .filter(Boolean)
            .join('\n');

        window.open(
            `${BRAND_WHATSAPP_URL}?text=${encodeURIComponent(text)}`,
            '_blank',
            'noopener,noreferrer'
        );

        setIsSubmitted(true);
    };

    return (
        <div ref={pageRef} className="request-page">
            <div className="request-shell">
                <aside className="request-visual">
                    <img src={requestVisual} alt={selectedService.title} />
                    <div className="request-visual__overlay" />
                    <div className="request-visual__copy">
                        <span dir="ltr">{BRAND_TAGLINE}</span>
                        <h2>{selectedService.title}</h2>
                        <p>{selectedService.desc}</p>
                    </div>
                </aside>

                <section className="request-main" aria-labelledby="request-title">
                    <Link to="/" className="request-back request-reveal">
                        <FiArrowRight aria-hidden="true" />
                        العودة للرئيسية
                    </Link>

                    {isSubmitted ? (
                        <div className="request-success" role="status">
                            <span className="request-success__icon" aria-hidden="true">
                                <FiCheck />
                            </span>
                            <h1 className="request-reveal">تم تجهيز طلبكم</h1>
                            <p className="request-reveal">
                                سيُفتح واتساب برسالة جاهزة لـ {BRAND_NAME_AR}. أرسلوها
                                وسأرد عليكم لتأكيد التفاصيل وخطوات العمل.
                            </p>
                            <div className="request-success__actions request-reveal">
                                <a
                                    href={BRAND_WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="request-submit"
                                >
                                    فتح واتساب
                                    <FiArrowUpLeft aria-hidden="true" />
                                </a>
                                <Link to="/" className="request-ghost">
                                    العودة للرئيسية
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <header className="request-header">
                                <span className="request-eyebrow request-reveal">طلب الخدمة</span>
                                <h1 id="request-title" className="request-title request-reveal">
                                    أخبروني عن
                                    <br />
                                    <span>مساحتكم</span>
                                </h1>
                                <p className="request-lead request-reveal">
                                    عبّئوا النموذج باختصار، وسأراجع الطلب وأتواصل معكم
                                    لترتيب الاستشارة أو بدء المشروع.
                                </p>
                            </header>

                            <div
                                className="request-services request-reveal"
                                role="group"
                                aria-label="نوع الخدمة"
                            >
                                {REQUEST_SERVICES.map((service) => (
                                    <button
                                        key={service.id}
                                        type="button"
                                        className={`request-chip${
                                            service.id === selectedService.id
                                                ? ' request-chip--active'
                                                : ''
                                        }`}
                                        onClick={() => handleServiceChange(service.id)}
                                        aria-pressed={service.id === selectedService.id}
                                    >
                                        {service.label}
                                    </button>
                                ))}
                            </div>

                            <form className="request-form" onSubmit={handleSubmit} noValidate>
                                <div className="request-grid">
                                    <label className="request-field request-reveal">
                                        <span>الاسم</span>
                                        <input
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>

                                    <label className="request-field request-reveal">
                                        <span>رقم التواصل</span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            autoComplete="tel"
                                            dir="ltr"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>

                                    <label className="request-field request-reveal">
                                        <span>المدينة (اختياري)</span>
                                        <input
                                            type="text"
                                            name="city"
                                            autoComplete="address-level2"
                                            value={form.city}
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <fieldset className="request-field request-reveal">
                                        <legend>نوع المشروع</legend>
                                        <div className="request-scopes">
                                            {PROJECT_SCOPES.map((scope) => (
                                                <label
                                                    key={scope.id}
                                                    className={`request-scope${
                                                        form.scope === scope.id
                                                            ? ' request-scope--active'
                                                            : ''
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="scope"
                                                        value={scope.id}
                                                        checked={form.scope === scope.id}
                                                        onChange={handleChange}
                                                    />
                                                    {scope.label}
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>

                                <label className="request-field request-reveal">
                                    <span>وصف المشروع</span>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="المساحة، الأسلوب المطلوب، أو أي تفاصيل تساعد على فهم المشروع"
                                        required
                                    />
                                </label>

                                {error && (
                                    <p className="request-error" role="alert">
                                        {error}
                                    </p>
                                )}

                                <div className="request-footer request-reveal">
                                    <p>يُرسل الطلب عبر واتساب مباشرة إلى {BRAND_NAME_AR}.</p>
                                    <button type="submit" className="request-submit">
                                        إرسال طلب الخدمة
                                        <FiArrowUpLeft aria-hidden="true" />
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Request;
