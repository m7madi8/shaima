import background1 from '../assets/background1.png';
import background2 from '../assets/background2.png';
import background3 from '../assets/background3.png';
import background4 from '../assets/background4.png';
import interiorImg from '../assets/interior.jpg';
import exteriorImg from '../assets/exterior.jpg';
import landscapeImg from '../assets/landscape-design.jpg';
import cap1 from '../assets/cap1-square.jpg';
import cap2 from '../assets/cap2-square.jpg';
import cap3 from '../assets/cap3-square.jpg';
import project02 from '../assets/project-02.jpg';
import project03 from '../assets/project-03.jpg';
import project05 from '../assets/project-05.jpg';

export const projects = [
    {
        id: 1,
        title: "01",
        category: "interior",
        coverImage: interiorImg,
        images: [interiorImg, cap1, background1],
        description: "تصميم داخلي متكامل لفيلا فاخرة تجمع بين الأناقة العصرية والدفء العربي، مع استخدام مواد طبيعية فاخرة وألوان دافئة."
    },
    {
        id: 2,
        title: "02",
        category: "interior",
        coverImage: project02,
        images: [project02, cap2, background2],
        description: "تصميم شقة مودرن بإطلالة بحرية، تتميز بمساحات مفتوحة وإضاءة طبيعية وفيرة مع لمسات عصرية أنيقة."
    },
    {
        id: 3,
        title: "03",
        category: "interior",
        coverImage: project03,
        images: [project03, cap3, background3],
        description: "تجديد وتصميم منزل عائلي يحافظ على الطابع التقليدي مع إضافة لمسات عصرية عملية تناسب احتياجات العائلة."
    },
    {
        id: 4,
        title: "04",
        category: "exterior",
        coverImage: exteriorImg,
        images: [exteriorImg, background4, cap3],
        description: "تصميم واجهة خارجية لفيلا بأسلوب معماري حديث يدمج الحجر الطبيعي مع الزجاج لخلق مظهر فاخر وعصري."
    },
    {
        id: 5,
        title: "05",
        category: "exterior",
        coverImage: project05,
        images: [project05, exteriorImg, background1],
        description: "إعادة تصميم واجهة مبنى مكاتب تجاري ليعكس الهوية المهنية ويجذب الانتباه بتصميم عصري وأنيق."
    },
    {
        id: 6,
        title: "06",
        category: "garden",
        coverImage: landscapeImg,
        images: [landscapeImg, exteriorImg, background1],
        description: "تصميم حديقة ومساحة خارجية هادئة تمتد من البيت إلى الطبيعة، بمسارات متزنة وإضاءة دافئة وهوية نباتية راقية."
    }
];

export const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'interior', name: 'داخلي' },
    { id: 'exterior', name: 'خارجي' },
    { id: 'garden', name: 'حدائق' }
];
