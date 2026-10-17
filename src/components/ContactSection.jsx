
import React, { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';

import { cortexBrand, projectTypeOptions } from '../data/cortexData';
import {
  sendContactInquiry,
  buildMailtoFallback,
  RECIPIENT_EMAIL,
  ACTIVE_PROVIDER,
} from '../services/contactEmailService';

export default function ContactSection() {
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submittedDetails, setSubmittedDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const submitBtnRef = useRef(null);
  const isSubmittingRef = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.projectType) {
      errs.projectType = 'Please select a project type.';
    }

    if (!formData.description.trim()) {
      errs.description = 'Please describe what you want to build.';
    }

    if (formData.currentUrl.trim()) {
      try {
        const url = new URL(formData.currentUrl.trim());

        if (!['http:', 'https:'].includes(url.protocol)) {
          errs.currentUrl = 'Please enter a valid HTTP or HTTPS URL.';
        }
      } catch {
        errs.currentUrl = 'Please enter a valid URL, including https://.';
      }
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (import.meta.env.DEV) {
      console.log('[Contact] Submit handler triggered');
    }

    if (formData.honeypot) {
      if (import.meta.env.DEV) {
        console.warn('[Contact] Honeypot triggered');
      }
      return;
    }

    // Guard against duplicate / concurrent submission triggers
    if (isSubmittingRef.current || status === 'loading') {
      if (import.meta.env.DEV) {
        console.warn('[Contact] Submission already in flight, ignoring duplicate trigger.');
      }
      return;
    }

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      if (import.meta.env.DEV) {
        console.warn('[Contact] Validation failed for fields:', Object.keys(validationErrors));
      }
      setErrors(validationErrors);

      const firstKey = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(firstKey);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }

      return;
    }

    isSubmittingRef.current = true;
    setStatus('loading');
    setErrorMessage('');
    setErrors({});

    try {
      if (import.meta.env.DEV) {
        console.log('[Contact] Initiating dispatch', {
          provider: ACTIVE_PROVIDER,
          recipient: RECIPIENT_EMAIL,
        });
      }

      const result = await sendContactInquiry({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        description: formData.description.trim(),
        currentUrl: formData.currentUrl.trim(),
      });

      if (!result || result.success !== true) {
        throw new Error(
          result?.message || 'The email provider did not confirm submission.'
        );
      }

      if (import.meta.env.DEV) {
        console.log('[Contact] Provider response confirmed success:', {
          provider: result.provider,
          message: result.message,
        });
      }

      setSubmittedDetails({
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType,
      });

      setStatus('success');
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('[Contact] Submission failed:', err);
      }

      setStatus('error');

      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to send your inquiry. Please try again.'
      );
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSubmittedDetails(null);
    setErrors({});
    setErrorMessage('');
    setStatus('idle');
  };

  const fieldError = (name) =>
    errors[name] ? (
      <span
        id={`${name}-error`}
        className="form-error-text"
        role="alert"
      >
        <AlertCircle size={12} aria-hidden="true" />
        {errors[name]}
      </span>
    ) : null;

  return (
    <section
      id="contact"
      className="section section-page"
      aria-labelledby="contact-heading"
    >
      <div className="container">
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
              <span
                className="reveal-line-inner"
                style={{ color: 'var(--color-brand-primary)' }}
              >
                We Can Build It.
              </span>
            </span>
          </h2>

          <p className="section-intro">
            Tell us what you're trying to build. We'll review your
            requirements and discuss the best way to turn the idea into a
            working solution.
          </p>
        </div>

        <div className="contact-layout">
          <aside
            className="contact-info-panel"
            aria-label="Direct Contact Information"
          >
            <div className="direct-contact-card">
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
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
                Have questions before filling out the form? Reach out
                directly to the Cortex team.
              </p>

              <div className="contact-detail-row">
                <Mail
                  size={18}
                  style={{
                    color: 'var(--color-brand-primary)',
                    marginTop: '2px',
                  }}
                  aria-hidden="true"
                />

                <div>
                  <div className="contact-detail-label">
                    Primary Email
                  </div>

                  <a
                    href={`mailto:${RECIPIENT_EMAIL}`}
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {RECIPIENT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="contact-detail-row">
                <Phone
                  size={18}
                  style={{
                    color: 'var(--color-brand-primary)',
                    marginTop: '2px',
                  }}
                  aria-hidden="true"
                />

                <div>
                  <div className="contact-detail-label">
                    Phone / WhatsApp
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    {cortexBrand.phoneNumbers.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        +91 {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="contact-detail-row">
                <MapPin
                  size={18}
                  style={{
                    color: 'var(--color-brand-primary)',
                    marginTop: '2px',
                  }}
                  aria-hidden="true"
                />

                <div>
                  <div className="contact-detail-label">
                    Location
                  </div>

                  <div
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {cortexBrand.location}
                  </div>
                </div>
              </div>

              <div className="contact-detail-row">
                <Github
                  size={18}
                  style={{
                    color: 'var(--color-brand-primary)',
                    marginTop: '2px',
                  }}
                  aria-hidden="true"
                />

                <div>
                  <div className="contact-detail-label">
                    GitHub Organization
                  </div>

                  <a
                    href={cortexBrand.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    github.com/hackathon-cortex
                  </a>
                </div>
              </div>
            </div>

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
              <strong>Pricing Approach:</strong> We scope every project
              individually based on your requirements, technical complexity,
              integrations, and milestones.
            </div>
          </aside>

          <div className="form-card">
            {status === 'success' ? (
              <div
                className="form-status-alert form-status-success"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2
                  size={26}
                  style={{
                    flexShrink: 0,
                    marginTop: '2px',
                    color: '#10b981',
                  }}
                  aria-hidden="true"
                />

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      marginBottom: '6px',
                    }}
                  >
                    Inquiry Submitted Successfully
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      marginBottom: '8px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    Thank you, {submittedDetails?.name}! Your project inquiry for{' '}
                    <strong>{submittedDetails?.projectType}</strong> has been confirmed.
                  </p>

                  <p
                    style={{
                      fontSize: '13px',
                      marginBottom: '16px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    The inquiry details were delivered to{' '}
                    <strong>{RECIPIENT_EMAIL}</strong>. Our engineering team will review your specifications and reply to <strong>{submittedDetails?.email}</strong>.
                  </p>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleReset}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Project Inquiry Form"
              >
                {status === 'error' && (
                  <div
                    className="form-status-alert form-status-error"
                    role="alert"
                    style={{
                      marginBottom: '20px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <AlertCircle
                      size={22}
                      style={{
                        flexShrink: 0,
                        marginTop: '2px',
                        color: '#ef4444',
                      }}
                      aria-hidden="true"
                    />

                    <div style={{ flex: 1 }}>
                      <strong
                        style={{
                          display: 'block',
                          marginBottom: '4px',
                          fontSize: '15px',
                        }}
                      >
                        Submission Failed
                      </strong>

                      <p
                        style={{
                          fontSize: '13px',
                          marginBottom: '10px',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {errorMessage}
                      </p>

                      <a
                        href={buildMailtoFallback(
                          formData,
                          RECIPIENT_EMAIL
                        )}
                        className="btn btn-secondary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          fontSize: '12px',
                        }}
                      >
                        <Mail size={14} aria-hidden="true" />
                        <span>Send via Email App</span>
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                )}

                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="honeypot-field"
                  aria-hidden="true"
                />

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <span>
                        Name <span className="form-req">*</span>
                      </span>
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
                      aria-describedby={
                        errors.name ? 'name-error' : undefined
                      }
                      autoComplete="name"
                      disabled={status === 'loading'}
                    />

                    {fieldError('name')}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <span>
                        Email <span className="form-req">*</span>
                      </span>
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
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                      autoComplete="email"
                      disabled={status === 'loading'}
                    />

                    {fieldError('email')}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone / WhatsApp
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="input"
                      autoComplete="tel"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      Company / Business
                    </label>

                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company or project name"
                      className="input"
                      autoComplete="organization"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="projectType" className="form-label">
                      <span>
                        Project Type <span className="form-req">*</span>
                      </span>
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
                      {projectTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="currentUrl" className="form-label">
                      Current Website / App URL
                    </label>

                    <input
                      type="url"
                      id="currentUrl"
                      name="currentUrl"
                      value={formData.currentUrl}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className={`input ${
                        errors.currentUrl ? 'input-error' : ''
                      }`}
                      aria-invalid={!!errors.currentUrl}
                      aria-describedby={
                        errors.currentUrl ? 'currentUrl-error' : undefined
                      }
                      disabled={status === 'loading'}
                    />

                    {fieldError('currentUrl')}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    <span>
                      What do you want to build?{' '}
                      <span className="form-req">*</span>
                    </span>
                    <span className="form-hint">
                      Goals, users, key features
                    </span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your idea, desired features, reference products, or problem statement..."
                    className={`textarea ${
                      errors.description ? 'input-error' : ''
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.description}
                    aria-describedby={
                      errors.description ? 'description-error' : undefined
                    }
                    disabled={status === 'loading'}
                  />

                  {fieldError('description')}
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="timeline" className="form-label">
                      Preferred Timeline
                    </label>

                    <input
                      type="text"
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder="e.g., 3 weeks, 1 month, flexible"
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

                <div className="form-group">
                  <label
                    htmlFor="additionalRequirements"
                    className="form-label"
                  >
                    <span>Additional Requirements</span>
                    <span className="form-hint">
                      Integrations, compliance, hosting
                    </span>
                  </label>

                  <input
                    type="text"
                    id="additionalRequirements"
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                    placeholder="e.g., Firebase auth, WhatsApp API, payment gateway"
                    className="input"
                    disabled={status === 'loading'}
                  />
                </div>

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
                        <span>Sending to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <Send size={16} className="btn-arrow" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Mail
                      size={13}
                      style={{
                        color: 'var(--color-brand-primary)',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    <span>
                      Inquiries are sent to{' '}
                      <strong>{RECIPIENT_EMAIL}</strong>
                    </span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
