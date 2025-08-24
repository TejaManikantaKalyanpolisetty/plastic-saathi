import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function validateName(name) {
  return /^[A-Za-z]+$/.test(name);
}

function validateEmail(email) {
  // Very basic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  // At least one letter, one number, one special character, min 6 chars
  const letter = /[A-Za-z]/.test(password);
  const number = /\d/.test(password);
  const symbol = /[^A-Za-z0-9]/.test(password);
  return password.length >= 6 && letter && number && symbol;
}

export default function Signup() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // For live error checking
  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    // Check validity on change
    let error = "";
    if ((name === "firstName" || name === "lastName") && value && !validateName(value)) {
      error = "Only letters allowed";
    }
    if (name === "email" && value && !validateEmail(value)) {
      error = "Invalid email address";
    }
    if (name === "password" && value && !validatePassword(value)) {
      error = "Password must include letters, numbers, and symbols (min 6 characters)";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  // On blur, mark field as touched
  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Final validation before submitting
    const formErrors = {};
    if (!validateName(fields.firstName)) formErrors.firstName = "Only letters allowed";
    if (!validateName(fields.lastName)) formErrors.lastName = "Only letters allowed";
    if (!validateEmail(fields.email)) formErrors.email = "Invalid email address";
    if (!validatePassword(fields.password)) formErrors.password = "Password must include letters, numbers, and symbols (min 6 characters)";

    setErrors(formErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    // If no errors, proceed
    if (Object.keys(formErrors).length === 0) {
      // Store user details
      localStorage.setItem("plastic-saathi-user", JSON.stringify({
        email: fields.email,
        password: fields.password,
        firstName: fields.firstName,
        lastName: fields.lastName
      }));
      // Redirect to Login
      navigate("/login");
    }
  }

  // Check if all fields are valid
  const isFormValid =
    validateName(fields.firstName) &&
    validateName(fields.lastName) &&
    validateEmail(fields.email) &&
    validatePassword(fields.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-green-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">First Name</label>
            <input
              name="firstName"
              value={fields.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.firstName && touched.firstName ? "border-red-400 focus:ring-red-400" : "focus:ring-green-400"
              }`}
              autoFocus
            />
            {errors.firstName && touched.firstName && (
              <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Last Name</label>
            <input
              name="lastName"
              value={fields.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.lastName && touched.lastName ? "border-red-400 focus:ring-red-400" : "focus:ring-green-400"
              }`}
            />
            {errors.lastName && touched.lastName && (
              <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.email && touched.email ? "border-red-400 focus:ring-red-400" : "focus:ring-green-400"
              }`}
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={fields.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.password && touched.password ? "border-red-400 focus:ring-red-400" : "focus:ring-green-400"
              }`}
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            disabled={!isFormValid}
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer font-semibold hover:underline"
            onClick={() => navigate("/")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
