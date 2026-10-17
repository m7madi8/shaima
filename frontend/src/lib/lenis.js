import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let reducedMotionQuery = null;

export const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getLenis = () => lenis;

const handleMotionPreference = (event) => {
    if (event.matches) {
        teardownInstance();
        return;
    }
    createInstance();
};

const attachMotionListener = () => {
    if (typeof window === 'undefined' || reducedMotionQuery) return;
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionQuery.addEventListener('change', handleMotionPreference);
};

const createInstance = () => {
    if (lenis || prefersReducedMotion()) return lenis;

    lenis = new Lenis({
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    return lenis;
};

const teardownInstance = () => {
    if (!lenis) return;
    lenis.destroy();
    lenis = null;
};

export const initLenis = () => {
    if (typeof window === 'undefined') return null;
    attachMotionListener();
    return createInstance();
};

export const destroyLenis = () => {
    teardownInstance();
    if (!reducedMotionQuery) return;
    reducedMotionQuery.removeEventListener('change', handleMotionPreference);
    reducedMotionQuery = null;
};

export const pauseLenis = () => {
    lenis?.stop();
};

export const resumeLenis = () => {
    lenis?.start();
};

export const scrollToTarget = (target, options = {}) => {
    const el =
        typeof target === 'string'
            ? document.getElementById(target.replace('#', '')) || document.querySelector(target)
            : target;

    if (!el) return;

    if (lenis) {
        lenis.scrollTo(el, {
            offset: 0,
            duration: 1.05,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            ...options,
        });
        return;
    }

    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};
