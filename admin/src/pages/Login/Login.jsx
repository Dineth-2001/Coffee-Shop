import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({url}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/employee/login', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Store token in local storage
        window.location.href = '/admin/dashboard'; // Redirect to admin dashboard
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Employee Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;



// import React from 'react'
// import './Login.css'

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/admin/login', {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         localStorage.setItem('token', response.data.token); // Store token in local storage
//         window.location.href = '/admin/dashboard'; // Redirect to admin dashboard
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred while logging in.");
//     }
//   };

//   return (
//     <div className="login-page">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Admin Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="login-button">Login</button>
//       </form>
//     </div>
//   );
// }

//export default Login
