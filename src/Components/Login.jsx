import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./LoginSignup.css"; // 🌟 نقطة واحدة لأن الملفين في نفس المجلد




export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setpass] = useState('');
  const [accept, setaccept] = useState(false); 
  const [backendError, setBackendError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setaccept(true);       
    setBackendError('');   

    if (email && pass.length >= 8) {
      axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: pass
      })
      .then((response) => {
        console.log("Login success!", response.data);
        // تخزين التوكن في المتصفح (أسلوب احترافي للسوق)
        if(response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        // التوجيه لصفحة رئيسية بعد النجاح (يمكنك تعديل المسار لاحقاً)
        navigate('/'); 
      })
      .catch((error) => {
        setBackendError(error.response?.data?.message || "Invalid email or password.");
      });
    }
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      <section className="auth-section-wrapper">
        <div className="auth-container">
          {/* القسم الأيسر للتوجيه */}
          <div className="left-side">
            <h1>Welcome Back!</h1>
            <p>Don't have an account yet?</p>
            <Link className="log-in-btn" to="/register">Sign Up</Link>
          </div>

          {/* القسم الأيمن للفورم */}
          <div className="right-side">
            <div className="form-content-area">
              <h2>Login to Account</h2>
              <form className="signup-form" onSubmit={handleSubmit}>
                {backendError && (
                  <p className="error-text server-error">{backendError}</p>
                )}

                {/* حقل البريد الإلكتروني */}
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setaccept(false); }} 
                    required
                  />
                </div>

                {/* حقل كلمة المرور */}
                <div className="input-group">
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={pass}
                    onChange={(e) => { setpass(e.target.value); setaccept(false); }} 
                    required
                  />
                  {accept && pass.length < 8 && (
                    <p className="error-text">Password must be at least 8 characters</p>
                  )}
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me on this device</label>
                </div>

                <button type="submit" className="submit-btn">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
