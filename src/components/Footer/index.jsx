import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Categorias Populares</h3>
          <ul>
            <li><Link to="/search/amador">Amador</Link></li>
            <li><Link to="/search/brasileiras">Brasileiras</Link></li>
            <li><Link to="/search/novinhas">Novinhas</Link></li>
            <li><Link to="/search/anal">Anal</Link></li>
            <li><Link to="/search/lesbian">Lésbicas</Link></li>
            <li><Link to="/search/milf">MILF</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Informações</h3>
          <ul>
            <li><Link to="/dmca">DMCA</Link></li>
            <li><Link to="/2257">2257</Link></li>
            <li><Link to="/privacy">Privacidade</Link></li>
            <li><Link to="/terms">Termos de Uso</Link></li>
            <li><Link to="/contact">Contato</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Redes Sociais</h3>
          <div className="social-links">
            <a href="https://twitter.com/xpornhotbr" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://t.me/xpornhotbr" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="https://discord.gg/xpornhotbr" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-discord"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Sobre</h3>
          <p>XPornHot BR é o melhor site de vídeos adultos do Brasil. Conteúdo atualizado diariamente com as melhores categorias nacionais e internacionais.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
        <Link to="/" className="logo">
            <h1>
              <span className="x">X</span>
              <span className="porn">Porn</span>
              <span className="hot">Hot</span>
              <span className="dot">•</span>
              <span className="br">BR</span>
            </h1>
          </Link>
        </div>
        
        <div className="footer-disclaimer">
          <p>
            © {currentYear} XPornHot BR - Todos os direitos reservados. 
            <span className="age-warning">
              <i className="fas fa-exclamation-triangle"></i> Apenas para maiores de 18 anos
            </span>
          </p>
        </div>

        <div className="footer-compliance">
          <i className="fas fa-shield-alt" title="RTA Restricted To Adults"></i>
          <i className="fas fa-check-circle" title="ASACP Verified"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 