import { useLocation } from 'react-router-dom';
import BrandLogo from '../Brand/BrandLogo';
import { BRAND_NAME_AR } from '../../constants/brand';

const Logo = () => {
    const { pathname } = useLocation();
    const isHome = pathname === '/' || pathname === '/shaima';

    if (isHome) return null;

    return (
        <div className='relative z-50'>
            <div className="absolute top-4 md:top-[2vw] right-5 md:right-7">
                <BrandLogo
                    useImage
                    name=""
                    tagline={false}
                    size="sm"
                    imageAlt={BRAND_NAME_AR}
                />
            </div>
        </div>
    );
};

export default Logo;
