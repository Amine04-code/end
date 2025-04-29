import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'; 


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.username || !formData.password || !formData.confirmPassword || !formData.role) {
      toast.error('All fields are required!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Account created successfully!');
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className="signup-page"> {/* ✅ Added for centering */}
      <ToastContainer />
      <div className="card">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Full Name</label>
          <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} value={formData.fullname} />

          <label>Email</label>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />

          <label>Username</label>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />

          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} />

          <label>Role</label>
          <select name="role" onChange={handleChange} value={formData.role}>
            <option value="" disabled>Select a role</option>
            <option value="accountant">Accountant</option>
            <option value="candidate">Candidate</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>

          <button type="submit">Signup</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
