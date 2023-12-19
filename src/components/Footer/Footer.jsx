import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; 

const Footer = () => {
    return (
    <footer className='footer'>
        <div className="social-icons">
            <a href="https://wa.me/15879714981" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
            <a href="https://facebook.com/catahomestore" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://instagram.com/catahomestore" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
        </div>
        <p>&copy; 2023 Cozy Home Store. All rights reserved.</p>
    </footer>
    );
};

export default Footer;

