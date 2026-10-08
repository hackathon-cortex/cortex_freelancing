import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cortexBrand, projectTypeOptions } from '../data/cortexData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Business Website',
    description: '',
    currentUrl: '',
    timeline: '',
    budget: 'Pricing discussed based on requirements',
    additionalRequirements: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const submitBtnRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.projectType) {
      errs.projectType = 'Please select a project type.';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please describe what you want to build.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstKey);
      if (element) element.focus();
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'Something went wrong while submitting your request. Please try again or contact us directly at ' +
          cortexBrand.primaryEmail +
          '.'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: 'Business Website',
      description: '',
      currentUrl: '',
      timeline: '',
      budget: 'Pricing discussed based on requirements',
      additionalRequirements: '',
      honeypot: '',
    });
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id="contact" className="section section-page" aria-labelledby="contact-heading">
      <div className="container">
        {/* Section Header with Line Masks */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>11 — START A PROJECT</span>
          </div>
          <h2 id="contact-heading" className="section-title">
            <span className="reveal-line-mask">
              <span className="reveal-line-inner">Have an Idea?</span>
            </span>
            <span className="reveal-line-mask">
              <span className="reveal-line-inner" style={{ color: 'var(--color-brand-primary)' }}>
                We Can Build It.
              </span>
            </span>
          </h2>
          <p className="section-intro">
            Tell us what you're trying to build. We'll review your requirements and discuss the best
            way to turn the idea into a working solution.
          </p>
        </div>

        <div className="contact-layout">
          {/* Direct Contact Details Panel */}
          <aside className="contact-info-panel" aria-label="Direct Contact Information">
            <div className="direct-contact-card">
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                Direct Contact
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '12px',
                }}
              >
                Have questions before filling out the form? Reach out directly to the Cortex team.
              </p>

              {/* Primary Email */}
              <div className="contact-detail-row">
                <Mail
                  size={18}
                  style={{ color: 'var(--color-brand-primary)', marginTop: '2px' }}
                  aria-hidden="true"
                />
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Primary Email
                  </div>
                  <a
                    href={`mailto:${cortexBrand.primaryEmail}`}
                    style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}
                  >
                    {cortexBrand.primaryEmail}
                  </a>
                </div>
              </div>

              {/* Phones */}
              <div className="contact-detail-row">
                <Phone
                  size={18}
                  style={{ color: 'var(--color-brand-primary)', marginTop: '2px' }}
                  aria-hidden="true"
                />
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Phone / WhatsApp
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {cortexBrand.phoneNumbers.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}
                      >
                        +91 {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="contact-detail-row">
                <MapPin
                  size={18}
                  style={{ color: 'var(--color-brand-primary)', marginTop: '2px' }}
                  aria-hidden="true"
                />
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Location
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>
                    {cortexBrand.location}
                  </div>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-detail-row">
                <Github
                  size={18}
                  style={{ color: 'var(--color-brand-primary)', marginTop: '2px' }}
                  aria-hidden="true"
                />
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    GitHub Organization
                  </div>
                  <a
                    href={cortexBrand.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontWeight: 500 }}
                  >
                    github.com/hackathon-cortex
                  </a>
                </div>
              </div>
            </div>

            {/* Note on Private Custom Pricing */}
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: 'var(--color-surface-card)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border-subtle)',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <strong>Pricing Approach:</strong> We scope every project individually based on your
              requirements, technical complexity, integrations, and milestones.
            </div>
          </aside>

          {/* Project Inquiry Form */}
          <div className="form-card">
            {status === 'success' ? (
              <div className="form-status-alert form-status-success" role="status" aria-live="polite">
                <CheckCircle2 size={24} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>
                    Thanks! We've received your project details.
                  </h3>
                  <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    The Cortex team will review your requirements and get back to you shortly.
                  </p>
                  <button type="button" className="btn btn-secondary" onClick={handleReset}>
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Project Inquiry Form">
                {status === 'error' && (
                  <div className="form-status-alert form-status-error" role="alert">
                    <AlertCircle size={20} style={{ flexShrink: 0 }} aria-hidden="true" />
                    <div>
                      <strong>Something went wrong.</strong>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Honeypot field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="honeypot-field"
                  aria-hidden="true"
                />

                {/* Name & Email */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <span>Name <span className="form-req">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`input ${errors.name ? 'input-error' : ''}`}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      disabled={status === 'loading'}
                    />
                    {errors.name && (
                      <span id="name-error" className="form-error-text" role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <span>Email <span className="form-req">*</span></span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={`input ${errors.email ? 'input-error' : ''}`}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      disabled={status === 'loading'}
                    />
                    {errors.email && (
                      <span id="email-error" className="form-error-text" role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      <span>Phone / WhatsApp</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="input"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      <span>Company / Business</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company or project name"
                      className="input"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                {/* Project Type & Current URL */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="projectType" className="form-label">
                      <span>Project Type <span className="form-req">*</span></span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="select"
                      aria-required="true"
                      disabled={status === 'loading'}
                    >
                      {projectTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="currentUrl" className="form-label">
                      <span>Current Website / App URL</span>
                    </label>
                    <input
                      type="url"
                      id="currentUrl"
                      name="currentUrl"
                      value={formData.currentUrl}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="input"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    <span>What do you want to build? <span className="form-req">*</span></span>
                    <span className="form-hint">Goals, users, key features</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your idea, desired features, reference products, or problem statement..."
                    className={`textarea ${errors.description ? 'input-error' : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                    disabled={status === 'loading'}
                  />
                  {errors.description && (
                    <span id="description-error" className="form-error-text" role="alert">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.description}
                    </span>
                  )}
                </div>

                {/* Timeline & Budget */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="timeline" className="form-label">
                      <span>Preferred Timeline</span>
                    </label>
                    <input
                      type="text"
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder="e.g., ~3 Weeks, 1 month, flexible"
                      className="input"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="budget" className="form-label">
                      <span>Budget Range</span>
                      <span className="form-hint">Private discussion</span>
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="input"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="form-group">
                  <label htmlFor="additionalRequirements" className="form-label">
                    <span>Additional Requirements</span>
                    <span className="form-hint">Integrations, compliance, hosting</span>
                  </label>
                  <input
                    type="text"
                    id="additionalRequirements"
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                    placeholder="e.g., Need Firebase auth, WhatsApp API, payment gateway"
                    className="input"
                    disabled={status === 'loading'}
                  />
                </div>

                {/* Primary Submit Action */}
                <div style={{ marginTop: '16px' }}>
                  <button
                    ref={submitBtnRef}
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                    style={{ minWidth: '220px' }}
                    data-cursor="explore"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2
                          size={18}
                          className="btn-arrow"
                          style={{ animation: 'spin 1s linear infinite' }}
                          aria-hidden="true"
                        />
                        <span>Submitting Details...</span>
                      </>
                    ) : (
                      <>
                        <span>Start a Conversation</span>
                        <Send size={16} className="btn-arrow" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
