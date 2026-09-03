import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Components/LoginSignup.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setpass] = useState('');
  const [cpass, setcpass] = useState('');
  
  const [accept, setaccept] = useState(false); 
  const [backendError, setBackendError] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setaccept(true);       
    setBackendError('');   

    if (name.trim() !== '' && name.length >= 3 && email && pass.length >= 8 && pass === cpass) {
      axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: pass,
        password_confirmation: cpass
      })
      .then((response) => {
        console.log("Sign up success!", response.data);
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
    <div className="page-wrapper">
      {/* 🌟 واجهة التسجيل المرتبة (Auth Section) */}
      <section id="register-section" className="auth-section-wrapper">
        <div className="auth-container">
          <div className="left-side">
            <h1>Get Started</h1>
            <p>Already have an account?</p>
            <Link className="log-in-btn" to="/login">Log In</Link>
          </div>

          <div className="right-side">
            {isSuccess ? (
              <div className="success-container">
                <div className="success-icon">✓</div>
                <h2>Successfully Registered!</h2>
                <p>Your account has been created. You can now log in to explore your personal dashboard.</p>
                <button className="submit-btn" onClick={() => setIsSuccess(false)}>
                  Back to Sign Up
                </button>
              </div>
            ) : (
              <div className="form-content-area">
                <h2>Create Account</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                  {backendError && (
                    <p className="error-text server-error">{backendError}</p>
                  )}

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
                      <p className="error-text">Password must be at least 8 characters</p>
                    )}
                  </div>

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
                    {accept && pass !== cpass && (
                      <p className="error-text">Passwords do not match</p>
                    )}
                  </div>

                  <div className="checkbox-group">
                    <input type="checkbox" id="agree" required />
                    <label htmlFor="agree">I accept the terms of the agreement</label>
                  </div>

                  <button type="submit" className="submit-btn">Sign Up</button>
                </form>
              </div>
            )}

            <div className="form-footer">
              <a href="#privacy">Privacy Policy</a>
              <span>•</span>
              <a href="#terms">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
