import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm'; // Note: .js extension is optional
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">React Form Handling Comparison</h1>
        <p className="app-subtitle">Controlled Components vs Formik with Yup</p>
      </header>
      
      <div className="forms-container">
        <div className="form-section">
          <RegistrationForm />
        </div>
        
        <div className="form-section">
          <FormikForm />
        </div>
      </div>
    </div>
  );
}

export default App;