import React from 'react';
import './brand.css';
import {
    BRAND_NAME,
    BRAND_TAGLINE,
    BRAND_NAME_AR,
    BRAND_LOGO_SRC,
} from '../../constants/brand';

const BrandLogo = ({
    name = BRAND_NAME,
    theme = 'light',
    size = 'md',
    tagline = true,
    useImage = true,
    imageAlt = BRAND_NAME_AR,
    className = '',
}) => {
    return (
        <div className={`brand-logo brand-logo--${theme} brand-logo--${size}${useImage ? ' brand-logo--image' : ''} ${className}`}>
            {useImage ? (
                <>
                    <img
                        src={BRAND_LOGO_SRC}
                        alt={imageAlt}
                        className="brand-logo__image"
                    />
                    {name ? (
                        <span className="brand-logo__name" dir="ltr">{name}</span>
                    ) : null}
                    {tagline ? (
                        <span className="brand-logo__tagline" dir="ltr">{BRAND_TAGLINE}</span>
                    ) : null}
                </>
            ) : (
                <>
                    <span className="brand-logo__name" dir="ltr">{name}</span>
                    {tagline ? (
                        <span className="brand-logo__tagline" dir="ltr">{BRAND_TAGLINE}</span>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default BrandLogo;
