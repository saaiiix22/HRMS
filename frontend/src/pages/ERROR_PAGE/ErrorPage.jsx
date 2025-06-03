import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-[#ffe2ec] to-[#fff9e6] overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-floatSlow" />
      <div className="absolute bottom-[-15%] right-[-15%] w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
      <div className="absolute top-[25%] right-[30%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-floatReverse" />

      <div className="z-10 p-8 bg-white/60 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-lg text-center border border-white/30">
        <h1 className="text-[5rem] font-extrabold text-indigo-500 mb-2 drop-shadow-sm">404</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          {params.paramName ? `${params.paramName} – ` : ''}Page Not Found
        </h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Oops! The page you’re looking for doesn’t exist, might’ve been moved, or is under construction 🛠️.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full transition-transform hover:scale-105 shadow-md"
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
