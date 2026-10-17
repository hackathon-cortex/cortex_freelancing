import { test, expect } from '@playwright/test';

test.describe('Cortex Freelancing - Contact Inquiry Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
    await page.waitForLoadState('domcontentloaded');
    // Ensure contact form is in view
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });

  test('1. Homepage and contact form load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Cortex/i);
    const heading = page.locator('#contact-heading');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Have an Idea?');
    await expect(page.locator('form[aria-label="Project Inquiry Form"]')).toBeVisible();
  });

  test('2. Empty required fields show validation errors', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#name-error')).toContainText('Please provide your name');

    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#email-error')).toContainText('Please provide your email address');

    await expect(page.locator('#description-error')).toBeVisible();
    await expect(page.locator('#description-error')).toContainText('Please describe what you want to build');
  });

  test('3. Invalid email addresses are rejected with clear message', async ({ page }) => {
    await page.locator('#name').fill('Sarah Jenkins');
    await page.locator('#email').fill('sarah-not-an-email');
    await page.locator('#description').fill('Need an AI workflow platform.');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#email-error')).toContainText('Please enter a valid email address');
  });

  test('4. Invalid optional URLs are rejected with clear message', async ({ page }) => {
    await page.locator('#name').fill('Sarah Jenkins');
    await page.locator('#email').fill('sarah@example.com');
    await page.locator('#currentUrl').fill('invalid-domain-without-protocol');
    await page.locator('#description').fill('Need an AI workflow platform.');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#currentUrl-error')).toBeVisible();
    await expect(page.locator('#currentUrl-error')).toContainText('Please enter a valid URL');
  });

  test('5. A valid submission triggers the expected provider request format', async ({ page }) => {
    let capturedRequest = null;

    await page.route('https://formsubmit.co/ajax/**', async (route) => {
      capturedRequest = {
        url: route.request().url(),
        method: route.request().method(),
        postData: JSON.parse(route.request().postData() || '{}'),
      };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: 'true', message: 'Form submitted successfully.' }),
      });
    });

    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@doe.com');
    await page.locator('#phone').fill('+91 9876543210');
    await page.locator('#company').fill('Acme Corp');
    await page.locator('#projectType').selectOption('AI / ML Solution');
    await page.locator('#currentUrl').fill('https://acme.org');
    await page.locator('#description').fill('Building automated image processing pipeline.');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.form-status-success')).toBeVisible();

    expect(capturedRequest).not.toBeNull();
    expect(capturedRequest.method).toBe('POST');
    expect(capturedRequest.url).toContain('https://formsubmit.co/ajax/hackathoncortex%40gmail.com');
    expect(capturedRequest.postData['Client Name']).toBe('John Doe');
    expect(capturedRequest.postData['Client Email']).toBe('john@doe.com');
    expect(capturedRequest.postData['Project Type']).toBe('AI / ML Solution');
    expect(capturedRequest.postData['Project Scope & Description']).toBe('Building automated image processing pipeline.');
  });

  test('6. A successful provider response displays the success confirmation state', async ({ page }) => {
    await page.route('https://formsubmit.co/ajax/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: 'true', message: 'Form submitted successfully.' }),
      });
    });

    await page.locator('#name').fill('Alice Walker');
    await page.locator('#email').fill('alice@walker.com');
    await page.locator('#description').fill('FinTech SaaS product build.');

    await page.locator('button[type="submit"]').click();

    const successCard = page.locator('.form-status-success');
    await expect(successCard).toBeVisible();
    await expect(successCard).toContainText('Inquiry Submitted Successfully');
    await expect(successCard).toContainText('Alice Walker');
    await expect(successCard).toContainText('hackathoncortex@gmail.com');

    // Can click "Send Another Inquiry" to reset
    await page.locator('button:has-text("Send Another Inquiry")').click();
    await expect(page.locator('form[aria-label="Project Inquiry Form"]')).toBeVisible();
    await expect(page.locator('#name')).toHaveValue('');
  });

  test('7. A failed provider response displays an error alert and preserves form data', async ({ page }) => {
    await page.route('https://formsubmit.co/ajax/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: 'false',
          message: "This form needs Activation. We've sent you an email containing an 'Activate Form' link.",
        }),
      });
    });

    await page.locator('#name').fill('Bob Smith');
    await page.locator('#email').fill('bob@smith.com');
    await page.locator('#description').fill('E-commerce custom storefront.');

    await page.locator('button[type="submit"]').click();

    // Must show error, NEVER false success
    await expect(page.locator('.form-status-error')).toBeVisible();
    await expect(page.locator('.form-status-success')).not.toBeVisible();
    await expect(page.locator('.form-status-error')).toContainText('activation');

    // Form data must be preserved so user does not lose work
    await expect(page.locator('#name')).toHaveValue('Bob Smith');
    await expect(page.locator('#email')).toHaveValue('bob@smith.com');
    await expect(page.locator('#description')).toHaveValue('E-commerce custom storefront.');

    // Fallback mailto button should be present
    await expect(page.locator('.form-status-error a:has-text("Send via Email App")')).toBeVisible();
  });

  test('8. Network failure displays an error and allows retry without losing data', async ({ page }) => {
    let attempts = 0;

    await page.route('https://formsubmit.co/ajax/**', async (route) => {
      attempts += 1;
      if (attempts === 1) {
        await route.abort('failed');
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: 'true', message: 'Delivered on retry.' }),
        });
      }
    });

    await page.locator('#name').fill('Clara Oswald');
    await page.locator('#email').fill('clara@tardis.org');
    await page.locator('#description').fill('Time travel telemetry dashboard.');

    // 1st attempt: fails due to network abort
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.form-status-error')).toBeVisible();
    await expect(page.locator('.form-status-error')).toContainText('Network error');
    await expect(page.locator('#name')).toHaveValue('Clara Oswald');

    // 2nd attempt: click submit again to retry
    await page.locator('button[type="submit"]').click();

    // Now success displays
    await expect(page.locator('.form-status-success')).toBeVisible();
    await expect(page.locator('.form-status-error')).not.toBeVisible();
    expect(attempts).toBe(2);
  });

  test('9. Double-click and duplicate submissions are prevented', async ({ page }) => {
    let networkRequestCount = 0;

    await page.route('https://formsubmit.co/ajax/**', async (route) => {
      networkRequestCount += 1;
      // Delay response by 500ms to allow testing rapid multiple clicks
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: 'true', message: 'Processed.' }),
      });
    });

    await page.locator('#name').fill('Daniel Fastclick');
    await page.locator('#email').fill('daniel@fastclick.com');
    await page.locator('#description').fill('Testing debounce and duplicate prevention.');

    const submitBtn = page.locator('button[type="submit"]');

    // Trigger multiple rapid clicks
    await Promise.all([
      submitBtn.click(),
      submitBtn.click({ force: true }).catch(() => {}),
      submitBtn.click({ force: true }).catch(() => {}),
    ]);

    await expect(page.locator('.form-status-success')).toBeVisible();

    // Exactly 1 request must have been dispatched
    expect(networkRequestCount).toBe(1);
  });
});
