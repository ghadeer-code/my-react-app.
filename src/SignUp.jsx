import './Components/LoginSignup.css';
import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  // 1. حالات تخزين بيانات المدخلات (State)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setpass] = useState('');
  const [cpass, setcpass] = useState('');
  
  // 2. حالات التحكم في إظهار الأخطاء والنجاح
  const [accept, setaccept] = useState(false); 
  const [backendError, setBackendError] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false); 

  // دالة التعامل مع إرسال الفورم
  const handleSubmit = (e) => {
    e.preventDefault();
    setaccept(true);       
    setBackendError('');   

    // الفحص المحلي (Frontend Validation)
    if (name.trim() !== '' && name.length >= 3 && email && pass.length >= 8 && pass === cpass) {
      
      axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: pass,
        password_confirmation: cpass
      })
      .then((response) => {
        console.log("Sign up success!", response.data);
        
        // الانتقال لواجهة النجاح وتفريغ الحقول
        setIsSuccess(true); 
        setName('');
        setEmail('');
        setpass('');
        setcpass('');
        setaccept(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const validationErrors = error.response.data.errors;
          if (validationErrors && validationErrors.email) {
            setBackendError("Email is already taken.");
          } else {
            setBackendError(error.response.data.message || "Invalid data submitted.");
          }
        } else {
          setBackendError("Something went wrong. Please try again.");
        }
      });
    }
  };

  return (
    <div className="auth-container">
      {/* القسم الأيسر للترحيب */}
      <div className="left-side">
        <h1>Get Started</h1>
        <p>Already have an account?</p>
        <button className="log-in-btn">Log In</button>
      </div>

      {/* القسم الأيمن لإنشاء الحساب أو عرض رسالة النجاح */}
      <div className="right-side">
        
        {isSuccess ? (
          /* واجهة رسالة النجاح المنظمة بالـ CSS الجديد */
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2>Successfully Registered!</h2>
            <p>Your account has been created. You can now log in to explore your personal dashboard.</p>
            <button className="submit-btn" onClick={() => setIsSuccess(false)}>
              Back to Sign Up
            </button>
          </div>
        ) : (
          /* واجهة الفورم الطبيعية وتختفي تلقائياً عند النجاح */
          <div>
            <h2>Create Account</h2>
            <form className="signup-form" onSubmit={handleSubmit}>

              {/* عرض خطأ السيرفر في الأعلى */}
              {backendError && (
                <p className="error-text" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {backendError}
                </p>
              )}

              {/* حقل اسم المستخدم */}
              <div className="input-group">
                <input 
                  id="name" 
                  type="text" 
                  placeholder="Username" 
                  value={name}
                  onChange={(e) => { 
                    setName(e.target.value); 
                    setaccept(false); 
                  }} 
                  required
                />
                {accept && (name.trim() === '' || name.length < 3) && (
                  <p className="error-text">Username is required (min 3 characters)</p>
                )}
              </div>

              {/* حقل البريد الإلكتروني */}
              <div className="input-group">
                <input 
                  id="email" 
                  type="email" 
                  placeholder="E-mail" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setaccept(false);
                    setBackendError(''); 
                  }} 
                  required
                />
              </div>

              {/* حقل كلمة المرور */}
              <div className="input-group">
                <input 
                  id="password" 
                  type="password" 
                  placeholder="Password" 
                  value={pass}
                  onChange={(e) => {
                    setpass(e.target.value);
                    setaccept(false);
                  }} 
                  required
                />
                {accept && pass.length < 8 && (
                  <p className="error-text">Password must be more than 8 characters</p>
                )}
              </div>

              {/* حقل تأكيد كلمة المرور */}
              <div className="input-group">
                <input 
                  id="Cpassword" 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={cpass}
                  onChange={(e) => {
                    setcpass(e.target.value);
                    setaccept(false);
                  }} 
                  required
                />
                {accept && cpass.length < 8 && (
                  <p className="error-text">Password must be more than 8 characters</p>
                )}
                {accept && pass !== cpass && (
                  <p className="error-text">Passwords do not match</p>
                )}
              </div>

              {/* شروط الاتفاقية */}
              <div className="checkbox-group">
                <input type="checkbox" id="agree" required />
                <label htmlFor="agree">I accept the terms of the agreement</label>
              </div>

              <button type="submit" className="submit-btn">Sign Up</button>
            </form>
          </div>
        )}

        {/* روابط أسفل الصفحة تظل ثابتة في الحالتين بناءً على تصميمك المختار */}
        <div className="form-footer">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
