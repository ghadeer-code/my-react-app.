import { Link } from 'react-router-dom';
import './Header.css'; 
import "./LoginSignup.css"; // 🌟 تم تعديله بنقطة واحدة وسلاش ليعمل فوراً


export default function Header() {
  return (
    <nav className="main-navbar">
      <div className="nav-logo">
        <Link to="/">🚀 Platform</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/register" className="nav-btn-link">إنشاء حساب</Link>
        </li>
        <li>
          <Link to="/login" className="nav-btn-link login-special">تسجيل الدخول</Link>
        </li>
      </ul>
    </nav>
  );
}
