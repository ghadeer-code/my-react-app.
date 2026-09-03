import React from 'react';
import { Link } from 'react-router-dom';
import './Components/LoginSignup.css'; // تأكد من تعديل مسار الـ CSS حسب مجلداتك

export default function LandingPage() {
  return (
    <div className="page-wrapper">
      {/* 🌟 القسم الأول: الشرح التعريفي والأبوت (Hero Section) */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="welcome-badge">مرحباً بك في منصتنا</span>
          <h1>اكتشف أبعاداً جديدة لإدارة مشاريعك</h1>
          <p>منصة ذكية متكاملة تساعدك على تنظيم أعمالك، التواصل مع فريقك، ومتابعة إنجازاتك اليومية بكل سهولة ومن مكان واحد.</p>
          <div className="hero-buttons">
            {/* تم تغيير الزر لينتقل مباشرة لصفحة التسجيل عبر الراوتر */}
            <Link to="/signup" className="primary-btn text-center-link">ابدأ الآن مجاناً</Link>
            <a href="#features" className="secondary-btn-link">اكتشف الميزات ↓</a>
          </div>
        </div>
      </section>

      {/* 🌟 القسم الثاني: ميزات الموقع البصرية (Features Section) */}
      <section id="features" className="features-section">
        <h2>لماذا تختار منصتنا?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>سرعة فائقة</h3>
            <p>واجهات مستخدم متطورة تضمن لك الوصول لبياناتك بلمح البصر دون أي تأخير.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>أمان وحماية</h3>
            <p>تشفير كامل لبياناتك وحساباتك لضمان أعلى مستويات الخصوصية والأمان.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>تقارير ذكية</h3>
            <p>رسوم بيانية وإحصائيات دقيقة تحلل مستوى أدائك وتطور مشاريعك تلقائياً.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
