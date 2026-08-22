import React from 'react';
import './brand.css';
import logoImg from '../../assets/logo-mark.png';
import { BRAND_NAME, BRAND_TAGLINE, BRAND_NAME_AR } from '../../constants/brand';

const BrandLogo = ({
    name = BRAND_NAME,
    theme = 'light',
    size = 'md',
    tagline = true,
    useImage = false,
    imageAlt = BRAND_NAME_AR,
    className = '',
}) => {
    return (
        <div className={`brand-logo brand-logo--${theme} brand-logo--${size}${useImage ? ' brand-logo--image' : ''} ${className}`}>
            {useImage ? (
                <>
                    <img
                        src={logoImg}
                        alt={imageAlt}
                        className="brand-logo__image"
                    />
                    {name && (
                        <span className="brand-logo__name">{name}</span>
                    )}
                    {tagline && (
                        <span className="brand-logo__tagline">{BRAND_TAGLINE}</span>
                    )}
                </>
            ) : (
                <>
                    <span className="brand-logo__name">{name}</span>
                    {tagline && (
                        <span className="brand-logo__tagline">{BRAND_TAGLINE}</span>
                    )}
                </>
            )}
        </div>
    );
};

export default BrandLogo;
