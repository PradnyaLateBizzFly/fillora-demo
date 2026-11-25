import { useState } from 'react'
import './RegistrationForm.css'

const INITIAL_STATE = {
  fullName: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  confirmPassword: '',
  dob: '',
  gender: '',
  address: '',
}

function validate(fields) {
  const errors = {}

  // Full Name
  if (!fields.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  } else if (fields.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.'
  }

  // First Name
  if (!fields.firstName.trim()) {
    errors.firstName = 'First name is required.'
  } else if (!/^[A-Za-z\s'-]+$/.test(fields.firstName.trim())) {
    errors.firstName = 'First name can only contain letters, spaces, hyphens and apostrophes.'
  }

  // Last Name
  if (!fields.lastName.trim()) {
    errors.lastName = 'Last name is required.'
  } else if (!/^[A-Za-z\s'-]+$/.test(fields.lastName.trim())) {
    errors.lastName = 'Last name can only contain letters, spaces, hyphens and apostrophes.'
  }

  // Email
  if (!fields.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  // Phone
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!/^\+?[0-9\s\-().]{7,20}$/.test(fields.phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }

  // Username
  if (!fields.username.trim()) {
    errors.username = 'Username is required.'
  } else if (fields.username.length < 3 || fields.username.length > 20) {
    errors.username = 'Username must be between 3 and 20 characters.'
  } else if (!/^[a-zA-Z0-9_]+$/.test(fields.username)) {
    errors.username = 'Username can only contain letters, numbers and underscores.'
  }

  // Password
  if (!fields.password) {
    errors.password = 'Password is required.'
  } else if (fields.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (!/[A-Z]/.test(fields.password)) {
    errors.password = 'Password must contain at least one uppercase letter.'
  } else if (!/[0-9]/.test(fields.password)) {
    errors.password = 'Password must contain at least one number.'
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(fields.password)) {
    errors.password = 'Password must contain at least one special character.'
  }

  // Confirm Password
  if (!fields.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  // Date of Birth
  if (!fields.dob) {
    errors.dob = 'Date of birth is required.'
  } else {
    const dobDate = new Date(fields.dob)
    const today = new Date()
    const age = today.getFullYear() - dobDate.getFullYear()
    const monthDiff = today.getMonth() - dobDate.getMonth()
    const realAge =
      monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate()) ? age - 1 : age
    if (realAge < 13) {
      errors.dob = 'You must be at least 13 years old to register.'
    } else if (realAge > 120) {
      errors.dob = 'Please enter a valid date of birth.'
    }
  }

  // Gender
  if (!fields.gender) {
    errors.gender = 'Please select your gender.'
  }

  // Address
  if (!fields.address.trim()) {
    errors.address = 'Address is required.'
  } else if (fields.address.trim().length < 10) {
    errors.address = 'Please enter a complete address (at least 10 characters).'
  }

  return errors
}

function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++

  if (score <= 2) return { level: 1, label: 'Weak', color: '#e74c3c' }
  if (score <= 3) return { level: 2, label: 'Fair', color: '#f39c12' }
  if (score <= 4) return { level: 3, label: 'Good', color: '#2ecc71' }
  return { level: 4, label: 'Strong', color: '#27ae60' }
}

export default function RegistrationForm() {
  const [fields, setFields] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const passwordStrength = getPasswordStrength(fields.password)

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // Live-validate touched fields
    if (touched[name]) {
      const newErrors = validate({ ...fields, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validate(fields)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
  }

  function handleReset() {
    setFields(INITIAL_STATE)
    setErrors({})
    setTouched({})
    setSubmitted(false)
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const allTouched = Object.keys(INITIAL_STATE).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)
    const validationErrors = validate(fields)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="form-wrapper">
        <div className="success-card">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h1>Registration Successful!</h1>
          <p>Welcome, <strong>{fields.firstName} {fields.lastName}</strong>!</p>
          <p className="success-sub">Your account has been created with username <strong>@{fields.username}</strong>.</p>
          <button className="btn-primary" onClick={handleReset}>Register Another</button>
        </div>
      </div>
    )
  }

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <header className="form-header">
          <h1>Create Account</h1>
          <p>Fill in the details below to get started</p>
        </header>

        <form
          id="registration-form"
          name="registration"
          onSubmit={handleSubmit}
          onReset={(e) => { e.preventDefault(); handleReset() }}
          noValidate
          aria-label="Registration Form"
        >

          {/* ── Personal Info Section ── */}
          <fieldset className="form-section">
            <legend>Personal Information</legend>

            {/* Full Name */}
            <div className={`form-group ${errors.fullName && touched.fullName ? 'has-error' : ''}`}>
              <label htmlFor="fullName">Full Name <span className="required" aria-hidden="true">*</span></label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                placeholder="e.g. John Michael Doe"
                value={fields.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-describedby={errors.fullName && touched.fullName ? 'fullName-error' : undefined}
                aria-invalid={!!(errors.fullName && touched.fullName)}
              />
              {errors.fullName && touched.fullName && (
                <span className="error-msg" id="fullName-error" role="alert">{errors.fullName}</span>
              )}
            </div>

            {/* First + Last Name */}
            <div className="form-row">
              <div className={`form-group ${errors.firstName && touched.firstName ? 'has-error' : ''}`}>
                <label htmlFor="firstName">First Name <span className="required" aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="John"
                  value={fields.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-describedby={errors.firstName && touched.firstName ? 'firstName-error' : undefined}
                  aria-invalid={!!(errors.firstName && touched.firstName)}
                />
                {errors.firstName && touched.firstName && (
                  <span className="error-msg" id="firstName-error" role="alert">{errors.firstName}</span>
                )}
              </div>

              <div className={`form-group ${errors.lastName && touched.lastName ? 'has-error' : ''}`}>
                <label htmlFor="lastName">Last Name <span className="required" aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Doe"
                  value={fields.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-describedby={errors.lastName && touched.lastName ? 'lastName-error' : undefined}
                  aria-invalid={!!(errors.lastName && touched.lastName)}
                />
                {errors.lastName && touched.lastName && (
                  <span className="error-msg" id="lastName-error" role="alert">{errors.lastName}</span>
                )}
              </div>
            </div>

            {/* Date of Birth + Gender */}
            <div className="form-row">
              <div className={`form-group ${errors.dob && touched.dob ? 'has-error' : ''}`}>
                <label htmlFor="dob">Date of Birth <span className="required" aria-hidden="true">*</span></label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  autoComplete="bday"
                  value={fields.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  max={new Date().toISOString().split('T')[0]}
                  aria-required="true"
                  aria-describedby={errors.dob && touched.dob ? 'dob-error' : undefined}
                  aria-invalid={!!(errors.dob && touched.dob)}
                />
                {errors.dob && touched.dob && (
                  <span className="error-msg" id="dob-error" role="alert">{errors.dob}</span>
                )}
              </div>

              <div className={`form-group ${errors.gender && touched.gender ? 'has-error' : ''}`}>
                <label htmlFor="gender">Gender <span className="required" aria-hidden="true">*</span></label>
                <select
                  id="gender"
                  name="gender"
                  autoComplete="sex"
                  value={fields.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-describedby={errors.gender && touched.gender ? 'gender-error' : undefined}
                  aria-invalid={!!(errors.gender && touched.gender)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && touched.gender && (
                  <span className="error-msg" id="gender-error" role="alert">{errors.gender}</span>
                )}
              </div>
            </div>
          </fieldset>

          {/* ── Contact Info Section ── */}
          <fieldset className="form-section">
            <legend>Contact Information</legend>

            {/* Email */}
            <div className={`form-group ${errors.email && touched.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Email Address <span className="required" aria-hidden="true">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="john.doe@example.com"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                aria-invalid={!!(errors.email && touched.email)}
              />
              {errors.email && touched.email && (
                <span className="error-msg" id="email-error" role="alert">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className={`form-group ${errors.phone && touched.phone ? 'has-error' : ''}`}>
              <label htmlFor="phone">Phone Number <span className="required" aria-hidden="true">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
                value={fields.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                aria-invalid={!!(errors.phone && touched.phone)}
              />
              {errors.phone && touched.phone && (
                <span className="error-msg" id="phone-error" role="alert">{errors.phone}</span>
              )}
            </div>

            {/* Address */}
            <div className={`form-group ${errors.address && touched.address ? 'has-error' : ''}`}>
              <label htmlFor="address">Address <span className="required" aria-hidden="true">*</span></label>
              <textarea
                id="address"
                name="address"
                autoComplete="street-address"
                placeholder="123 Main St, City, State, ZIP, Country"
                value={fields.address}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                aria-required="true"
                aria-describedby={errors.address && touched.address ? 'address-error' : undefined}
                aria-invalid={!!(errors.address && touched.address)}
              />
              {errors.address && touched.address && (
                <span className="error-msg" id="address-error" role="alert">{errors.address}</span>
              )}
            </div>
          </fieldset>

          {/* ── Account Info Section ── */}
          <fieldset className="form-section">
            <legend>Account Details</legend>

            {/* Username */}
            <div className={`form-group ${errors.username && touched.username ? 'has-error' : ''}`}>
              <label htmlFor="username">Username <span className="required" aria-hidden="true">*</span></label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="john_doe123"
                value={fields.username}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-describedby={errors.username && touched.username ? 'username-error' : 'username-hint'}
                aria-invalid={!!(errors.username && touched.username)}
              />
              {errors.username && touched.username ? (
                <span className="error-msg" id="username-error" role="alert">{errors.username}</span>
              ) : (
                <span className="hint-msg" id="username-hint">3–20 characters. Letters, numbers and underscores only.</span>
              )}
            </div>

            {/* Password */}
            <div className={`form-group ${errors.password && touched.password ? 'has-error' : ''}`}>
              <label htmlFor="password">Password <span className="required" aria-hidden="true">*</span></label>
              <div className="input-with-toggle">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  value={fields.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-describedby={
                    errors.password && touched.password ? 'password-error' : 'password-hint'
                  }
                  aria-invalid={!!(errors.password && touched.password)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {fields.password && (
                <div className="password-strength" aria-label={`Password strength: ${passwordStrength.label}`}>
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="strength-bar"
                        style={{
                          backgroundColor: n <= passwordStrength.level ? passwordStrength.color : '#e0e0e0',
                        }}
                      />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
              {errors.password && touched.password ? (
                <span className="error-msg" id="password-error" role="alert">{errors.password}</span>
              ) : (
                <span className="hint-msg" id="password-hint">
                  Must be 8+ characters with uppercase, number and special character.
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className={`form-group ${errors.confirmPassword && touched.confirmPassword ? 'has-error' : ''}`}>
              <label htmlFor="confirmPassword">Confirm Password <span className="required" aria-hidden="true">*</span></label>
              <div className="input-with-toggle">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={fields.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-describedby={errors.confirmPassword && touched.confirmPassword ? 'confirmPassword-error' : undefined}
                  aria-invalid={!!(errors.confirmPassword && touched.confirmPassword)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="error-msg" id="confirmPassword-error" role="alert">{errors.confirmPassword}</span>
              )}
            </div>
          </fieldset>

          {/* ── Actions ── */}
          <div className="form-actions">
            <button type="reset" className="btn-secondary">Reset Form</button>
            <button type="submit" className="btn-primary">Create Account</button>
          </div>

          <p className="form-footer">
            All fields marked <span className="required" aria-hidden="true">*</span> are required.
          </p>
        </form>
      </div>
    </div>
  )
}
