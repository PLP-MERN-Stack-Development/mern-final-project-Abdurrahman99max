// Client/src/components/auth/RegisterForm.jsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    storeName: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      addToast(err.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-field">
        <label className="auth-label">Full name</label>
        <input
          className="auth-input"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Store owner name"
        />
      </div>
      <div className="auth-field">
        <label className="auth-label">Store name</label>
        <input
          className="auth-input"
          type="text"
          name="storeName"
          value={form.storeName}
          onChange={handleChange}
          placeholder="e.g. MicroBiz Mart"
        />
      </div>
      <div className="auth-field">
        <label className="auth-label">Email</label>
        <input
          className="auth-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@store.com"
        />
      </div>
      <div className="auth-field">
        <label className="auth-label">Password</label>
        <input
          className="auth-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
      </div>
      <div className="auth-actions">
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? "Creating your workspace..." : "Create MicroBiz workspace"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
