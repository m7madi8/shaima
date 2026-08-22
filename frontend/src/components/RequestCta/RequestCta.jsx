import { Link } from 'react-router-dom';
import { FiArrowUpLeft } from 'react-icons/fi';
import './requestcta.css';

const RequestCta = ({
    service = 'contact',
    label = 'اطلب خدمة',
    theme = 'dark',
    className = '',
}) => {
    return (
        <Link
            to={`/request?service=${service}`}
            className={`request-cta request-cta--${theme}${className ? ` ${className}` : ''}`}
        >
            {label}
            <FiArrowUpLeft aria-hidden="true" />
        </Link>
    );
};

export default RequestCta;
