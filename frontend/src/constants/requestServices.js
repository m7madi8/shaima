export const REQUEST_SERVICES = [
    {
        id: 'consultation',
        label: 'استشارة تصميم',
        title: 'استشارة تصميم',
        desc: 'جلسة للتعرّف على ذوقكم واحتياجات المساحة ووضع اتجاه واضح للمشروع.',
    },
    {
        id: 'collaboration',
        label: 'بدء مشروع كامل',
        title: 'بدء مشروع كامل',
        desc: 'مرافقة تصميمية من الفكرة حتى التنفيذ، بتفاصيل تعكس شخصيتكم.',
    },
    {
        id: 'interior',
        label: 'تصميم داخلي',
        title: 'تصميم داخلي',
        desc: 'تصاميم داخلية تجمع الأناقة والوظيفة لمساحات معيشة وعمل راقية.',
    },
    {
        id: 'exterior',
        label: 'تصميم خارجي',
        title: 'تصميم خارجي',
        desc: 'واجهات وهويات بصرية تنسجم مع المكان وتصمد أمام الزمن.',
    },
    {
        id: 'garden',
        label: 'تصميم حدائق',
        title: 'تصميم حدائق',
        desc: 'حدائق ومساحات خارجية بهوية نباتية متزنة وإحساس بالهدوء والفخامة.',
    },
    {
        id: 'visit',
        label: 'معاينة الموقع',
        title: 'معاينة الموقع',
        desc: 'زيارة للموقع لفهم الإضاءة، المقياس، والإمكانات قبل بدء التصميم.',
    },
    {
        id: 'contact',
        label: 'طلب عام',
        title: 'طلب خدمة',
        desc: 'أخبروني عن فكرتكم وسأقترح المسار الأنسب لمشروعكم.',
    },
];

export const PROJECT_SCOPES = [
    { id: 'residential', label: 'سكني' },
    { id: 'commercial', label: 'تجاري' },
    { id: 'other', label: 'أخرى' },
];

export const getRequestService = (id) =>
    REQUEST_SERVICES.find((service) => service.id === id) || REQUEST_SERVICES[0];
