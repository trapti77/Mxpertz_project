import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <span className="logo-icon">🧠</span>
        <Link to="/">BrainyLingo</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/daily-quiz">Daily Quiz</Link>
        <Link to="/games">Games</Link>
      </nav>
      <button className="sign-out-btn">Sign Out</button>
    </header>
  );
};

export default Header;
