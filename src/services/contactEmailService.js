import { cortexBrand } from '../data/cortexData';

/**
 * Service to handle sending client project enquiries directly to the team email account.
 * Supports:
 *  1. FormSubmit AJAX API (Zero backend, zero registration required. Directly emails cortexBrand.primaryEmail)
 *  2. Web3Forms (Optional: activated if VITE_WEB3FORMS_ACCESS_KEY is defined in .env)
 */

export const RECIPIENT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || cortexBrand.primaryEmail || 'hackathoncortex@gmail.com';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

/**
 * Format enquiry payload into a structured summary for email clients
 */
function formatMessageBody(data) {
  return `
NEW PROJECT INQUIRY DETAILS
===========================

Client Name: ${data.name}
Client Email: ${data.email}
Phone / WhatsApp: ${data.phone || 'Not provided'}
Company / Brand: ${data.company || 'Not provided'}

Project Classification:
- Project Type: ${data.projectType}
- Target Timeline: ${data.timeline || 'Flexible'}
- Budget Range: ${data.budget || 'Discuss based on scope'}
- Existing Website / App: ${data.currentUrl || 'None / New build'}

Project Vision & Requirements:
------------------------------
${data.description}

Additional Technical / Integration Notes:
-----------------------------------------
${data.additionalRequirements || 'None specified'}

-----------------------------------------
Submitted at: ${new Date().toISOString()} via Cortex Freelancing Portal
`.trim();
}

/**
 * Sends inquiry using Web3Forms endpoint
 */
async function sendViaWeb3Forms(data, apiKey) {
  const payload = {
    access_key: apiKey,
    subject: `[Cortex Inquiry] ${data.name} — ${data.projectType}`,
    from_name: `${data.name} (via Cortex Portal)`,
    name: data.name,
    email: data.email,
    reply_to: data.email,
    phone: data.phone || 'N/A',
    company: data.company || 'N/A',
    project_type: data.projectType,
    timeline: data.timeline || 'Flexible',
    budget: data.budget || 'Discuss based on scope',
    current_url: data.currentUrl || 'N/A',
    additional_notes: data.additionalRequirements || 'N/A',
    message: formatMessageBody(data),
  };

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || 'Failed to deliver inquiry via Web3Forms.');
  }

  return {
    provider: 'Web3Forms',
    message: result.message || 'Your inquiry has been successfully sent!',
  };
}

/**
 * Sends inquiry using FormSubmit AJAX endpoint (Direct to recipient email)
 */
async function sendViaFormSubmit(data, targetEmail) {
  const payload = {
    _subject: `[Cortex Inquiry] ${data.name} — ${data.projectType}`,
    _replyto: data.email,
    _template: 'table',
    _captcha: 'false',
    _honey: data.honeypot || '',
    'Client Name': data.name,
    'Client Email': data.email,
    'Phone / WhatsApp': data.phone || 'Not provided',
    'Company / Organization': data.company || 'Not provided',
    'Project Type': data.projectType,
    'Project Scope & Description': data.description,
    'Current Website / App': data.currentUrl || 'None',
    'Target Timeline': data.timeline || 'Flexible',
    'Budget Discussion': data.budget || 'Requirements based',
    'Additional Requirements': data.additionalRequirements || 'None',
    'Submitted On': new Date().toLocaleString(),
  };

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || (result.success !== 'true' && result.success !== true && !result.message)) {
    throw new Error(
      result.message || 'Unable to deliver inquiry to the email server. Please try again or use direct email.'
    );
  }

  return {
    provider: 'FormSubmit',
    message: result.message || 'Your inquiry has been sent directly to our email account.',
  };
}

/**
 * Main dispatcher to send the contact inquiry directly to the email account
 */
export async function sendContactInquiry(formData) {
  // Silent bot trap
  if (formData.honeypot) {
    return { success: true, message: 'Inquiry received.' };
  }

  if (WEB3FORMS_KEY) {
    return await sendViaWeb3Forms(formData, WEB3FORMS_KEY);
  }

  return await sendViaFormSubmit(formData, RECIPIENT_EMAIL);
}

/**
 * Direct mailto fallback link generator in case of client network disconnect
 */
export function buildMailtoFallback(formData, recipient = RECIPIENT_EMAIL) {
  const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType || 'New Project'} - ${formData.name || 'Client'}`);
  const body = encodeURIComponent(formatMessageBody(formData));
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
