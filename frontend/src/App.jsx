import React from 'react';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-purple-200 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
         <h1 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-300">
          Student Registration Form 
        </h1>
        <RegistrationForm />

      </div>
    </div>
  );
}

export default App;
