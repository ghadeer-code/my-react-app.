import SignUp from "./SignUp";
import Header from "./Components/Header";
import Login from "./Components/Login";
import LandingPage from "./LandingPage"; // 🌟 تم استيراد الواجهة التعريفية الجديدة
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Header /> 
      <Routes>
        {/* 🌟 المسار الرئيسي يعرض الآن الواجهة التعريفية */}
        <Route path="/" element={<LandingPage />} />
        
        {/* 🌟 مسارات صفحات التسجيل وتسجيل الدخول */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
