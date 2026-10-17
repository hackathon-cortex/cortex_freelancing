import { cortexBrand } from '../data/cortexData';

/**
 * Service to handle sending client project enquiries directly to the team email account.
 * Primary Provider: FormSubmit AJAX endpoint (https://formsubmit.co/ajax/<recipient>)
 * Optional Provider: Web3Forms (activated if VITE_WEB3FORMS_ACCESS_KEY is defined)
 */

export const RECIPIENT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || cortexBrand.primaryEmail || 'hackathoncortex@gmail.com';

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || cortexBrand.deploymentUrl || 'https://cortex-blush-three.vercel.app';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

export const ACTIVE_PROVIDER = WEB3FORMS_KEY ? 'Web3Forms' : 'FormSubmit';

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
Submitted at: ${new Date().toISOString()} via Cortex Freelancing Portal (${SITE_URL})
`.trim();
}

/**
 * Sends inquiry using FormSubmit AJAX endpoint.
 * Note: FormSubmit requires one-time activation if the recipient email hasn't been verified yet.
 */
async function sendViaFormSubmit(data, targetEmail) {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;

  if (import.meta.env.DEV) {
    console.log('[contactEmailService] Request start:', {
      provider: 'FormSubmit',
      recipient: targetEmail,
      projectType: data.projectType,
    });
  }

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
    'Deployment URL': SITE_URL,
    'Submitted On': new Date().toLocaleString(),
  };

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    if (import.meta.env.DEV) {
      console.error('[contactEmailService] Network failure during FormSubmit request:', networkErr);
    }
    throw new Error('Network error: Unable to connect to the email delivery server. Please check your internet connection or use direct email.');
  }

  let result;
  try {
    result = await response.json();
  } catch (jsonErr) {
    if (import.meta.env.DEV) {
      console.error('[contactEmailService] Failed to parse FormSubmit JSON response, HTTP status:', response.status);
    }
    throw new Error(`Email server returned an invalid response (HTTP ${response.status}). Please try again later.`);
  }

  if (import.meta.env.DEV) {
    console.log('[contactEmailService] Request completion:', {
      provider: 'FormSubmit',
      httpStatus: response.status,
      successField: result?.success,
    });
  }

  const isSuccess = response.ok && (result.success === 'true' || result.success === true);

  if (!isSuccess) {
    const rawMessage = typeof result.message === 'string' ? result.message : '';
    if (rawMessage.toLowerCase().includes('activation')) {
      throw new Error(
        `Email delivery requires one-time activation. FormSubmit sent an activation link to ${targetEmail}. Please check that inbox and click "Activate Form" to enable inquiry forwarding.`
      );
    }
    throw new Error(rawMessage || `FormSubmit rejected the inquiry (HTTP ${response.status}).`);
  }

  return {
    success: true,
    provider: 'FormSubmit',
    message: result.message || 'Your inquiry has been sent directly to our email account.',
  };
}

/**
 * Sends inquiry using Web3Forms endpoint
 */
async function sendViaWeb3Forms(data, apiKey) {
  const endpoint = 'https://api.web3forms.com/submit';

  if (import.meta.env.DEV) {
    console.log('[contactEmailService] Request start:', {
      provider: 'Web3Forms',
      projectType: data.projectType,
    });
  }

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

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    if (import.meta.env.DEV) {
      console.error('[contactEmailService] Network failure during Web3Forms request:', networkErr);
    }
    throw new Error('Network error: Unable to connect to Web3Forms server. Please check your internet connection or use direct email.');
  }

  let result;
  try {
    result = await response.json();
  } catch (jsonErr) {
    if (import.meta.env.DEV) {
      console.error('[contactEmailService] Failed to parse Web3Forms JSON response, HTTP status:', response.status);
    }
    throw new Error(`Email service returned an invalid response (HTTP ${response.status}). Please try again later.`);
  }

  if (import.meta.env.DEV) {
    console.log('[contactEmailService] Request completion:', {
      provider: 'Web3Forms',
      httpStatus: response.status,
      successField: result?.success,
    });
  }

  if (!response.ok || result.success !== true) {
    throw new Error(result.message || `Web3Forms rejected the submission (HTTP ${response.status}).`);
  }

  return {
    success: true,
    provider: 'Web3Forms',
    message: result.message || 'Your inquiry has been successfully sent!',
  };
}

/**
 * Main dispatcher to send the contact inquiry directly to the email account
 */
export async function sendContactInquiry(formData) {
  // Silent bot trap
  if (formData.honeypot) {
    if (import.meta.env.DEV) {
      console.warn('[contactEmailService] Honeypot triggered, simulating successful capture without dispatching.');
    }
    return { success: true, provider: 'Honeypot', message: 'Inquiry received.' };
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
  const subject = encodeURIComponent(
    `Project Inquiry: ${formData.projectType || 'New Project'} - ${formData.name || 'Client'}`
  );
  const body = encodeURIComponent(formatMessageBody(formData));
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
