import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import BrandLogo from "../Brand/BrandLogo";
import { BRAND_NAME, BRAND_TAGLINE, BRAND_INSTAGRAM_URL } from "../../constants/brand";
import "./footertitle.css";

const Footer = () => {
    return (
        <section className='w-full min-h-[50vh] px-6 py-20 mt-10 bg-[var(--base-100)] overflow-x-hidden'>
            <div className='max-w-6xl mx-auto'>
                <p className='text-[.7rem] text-[var(--base-300)] choose-subtitle mt-10'>
                    هل لديكم مشروع تصميم في ذهنكم؟<br />
                    دعونا نحوله إلى واقع ملموس
                </p>

                <div className='flex flex-col md:flex-row justify-between items-center mt-14 gap-8'>
                    <div className='flex flex-col items-center md:items-start gap-4'>
                        <BrandLogo name={BRAND_NAME} theme="light" size="lg" tagline className="footer-brand-block" />
                    </div>

                    <div className='flex flex-col justify-center items-center md:items-start gap-4'>
                        <a 
                            href={BRAND_INSTAGRAM_URL} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-[var(--base-300)] text-2xl hover:text-[var(--accent)] transition-colors flex items-center gap-2'
                        >
                            <FaInstagram className="text-xl" />
                            انستغرام
                        </a>
                        <a 
                            href="https://wa.me/972546656914" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-[var(--base-300)] text-2xl hover:text-[var(--accent)] transition-colors flex items-center gap-2'
                        >
                            <FaWhatsapp className="text-xl" />
                            واتساب
                        </a>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center mt-20 gap-8">
                    <div className="flex justify-center items-center gap-4">
                        <a 
                            href={BRAND_INSTAGRAM_URL} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className='border-[1px] border-[var(--terracotta)] rounded-full p-3 text-[var(--base-300)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors'
                        >
                            <FaInstagram className="text-xl" />
                        </a>
                        <a 
                            href="https://wa.me/972546656914" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className='border-[1px] border-[var(--terracotta)] rounded-full p-3 text-[var(--base-300)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors'
                        >
                            <FaWhatsapp className="text-xl" />
                        </a>
                    </div>

                    <div>
                        <p className="text-[0.8rem] text-[var(--natural)] text-center md:text-left">
                            © 2026 {BRAND_NAME} {BRAND_TAGLINE}<br />
                            جميع الحقوق محفوظة
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;