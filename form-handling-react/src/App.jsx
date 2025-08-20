import React, { useState } from 'react';
import RegistrationForm from './components/RegisterationForm.jsx';
import FormikForm from './components/FormikForm.jsx';

function App() {
  const [currentForm, setCurrentForm] = useState('controlled');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">React Form Demo</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentForm('controlled')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentForm === 'controlled'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Controlled Components
              </button>
              <button
                onClick={() => setCurrentForm('formik')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentForm === 'formik'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Formik
              </button>
            </div>
          </div>
        </div>
      </nav>

      {currentForm === 'controlled' ? <RegistrationForm /> : <FormikForm />}
    </div>
  );
}

export default App;