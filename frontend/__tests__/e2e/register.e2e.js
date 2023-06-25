import { test, expect } from '@playwright/test';

const fillInitialForm = async (page, email, confirmEmail, password) => {
  await page.goto('http://localhost:3000/register');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="confirmEmail"]', confirmEmail);
  await page.fill('input[name="password"]', password);
  await page.click('button[name="next"]');
};

const fillDetailsForm = async (page, firstName, lastName, phoneNumber) => {
  await page.fill('input[name="firstName"]', firstName);
  await page.fill('input[name="lastName"]', lastName);
  await page.fill('input[name="phoneNumber"]', phoneNumber);
  await page.click('button[name="register"]');
};

const checkErrorMessage = async (page, expectedError) => {
  const error = await page.textContent('.error_text');
  expect(error).toBe(expectedError);
  expect(page.url()).toBe('http://localhost:3000/register');  // Ensure no redirection
};

test.describe('Registration Page', () => {

//   // Successful Registration & Token Storage
//   test('should register successfully and store token', async ({ page, context }) => {
//     await fillInitialForm(page, 'test@example.com', 'test@example.com', 'Test@12345');
//     await fillDetailsForm(page, 'Test', 'User', '0412345678');
//     expect(page.url()).toBe('http://localhost:3000/');
//     const localStorage = await context.storageState();
//     expect(localStorage.localStorage[0].value).toBeDefined();  // Assuming token is non-empty
//   });

  // Invalid Email
  test('should display error for invalid email', async ({ page }) => {
    await fillInitialForm(page, 'invalidEmail', 'invalidEmail', 'Test@12345');
    await checkErrorMessage(page, 'Enter a valid email address');
  });

  // Mismatched Emails
  test('should display error for mismatched emails', async ({ page }) => {
    await fillInitialForm(page, 'test@example.com', 'different@example.com', 'Test@12345');
    await checkErrorMessage(page, 'Email addresses do not match');
  });

  // Empty Email Field
  test('should display error for empty email field', async ({ page }) => {
    await fillInitialForm(page, '', '', 'Test@12345');
    await checkErrorMessage(page, 'This field is required');
  });

  // Password Errors

  const passwordErrorCases = [
    ['Test @12345', 'Password should not contain whitespace'],
    ['test@12345', 'Password should contain at least one uppercase character'],
    ['TEST@12345', 'Password should contain at least one lowercase character'],
    ['Test@pass', 'Password should contain at least one digit'],
    ['Testpassword1', 'Password should contain at least one special character'],
    ['Test@1', 'Password should be 8-20 characters long'],
    ['', 'This field is required'],
  ];

  passwordErrorCases.forEach(([password, errorMessage]) => {
    test(`should display error for password: ${password}`, async ({ page }) => {
      await fillInitialForm(page, 'test@example.com', 'test@example.com', password);
      await checkErrorMessage(page, errorMessage);
    });
  });

  // Further Registration Errors

  // Missing First Name
  test('should display error for missing first name', async ({ page }) => {
    await fillInitialForm(page, 'test@example.com', 'test@example.com', 'Test@12345');
    await fillDetailsForm(page, '', 'User', '0412345678');
    await checkErrorMessage(page, 'This field is required');
  });

  // Missing Last Name
  test('should display error for missing last name', async ({ page }) => {
    await fillInitialForm(page, 'test@example.com', 'test@example.com', 'Test@12345');
    await fillDetailsForm(page, 'Test', '', '0412345678');
    await checkErrorMessage(page, 'This field is required');
  });

  // Invalid Phone Number
  test('should display error for invalid phone number', async ({ page }) => {
    await fillInitialForm(page, 'test@example.com', 'test@example.com', 'Test@12345');
    await fillDetailsForm(page, 'Test', 'User', '1234567890'); // Not starting with '04'
    await checkErrorMessage(page, 'Enter a valid phone number');
  });

  // Invalid Phone Number Length
  test('should display error for invalid phone number length', async ({ page }) => {
    await fillInitialForm(page, 'test@example.com', 'test@example.com', 'Test@12345');
    await fillDetailsForm(page, 'Test', 'User', '04123456789'); // More than 10 digits
    await checkErrorMessage(page, 'Enter a valid phone number');
  });

  // Missing Phone Number
  test('should display error for missing phone number', async ({ page }) => {
    await fillInitialForm(page, 'test@example.com', 'test@example.com', 'Test@12345');
    await fillDetailsForm(page, 'Test', 'User', ''); // More than 10 digits
    await checkErrorMessage(page, 'This field is required');
  });

  // Back Button
  test('should go back to initial registration from further registration', async ({ page }) => {
    await fillInitialForm(page, 'test@example.com', 'test@example.com', 'Test@12345');
    await page.click('button[name="back"]');
    const heading = await page.textContent('.heading_text');
    expect(heading).toBe('Register');
    expect(page.url()).toBe('http://localhost:3000/register');
  });

  // Email Already in Use
  test('should display error for email already in use', async ({ page }) => {
    await fillInitialForm(page, 'austintest@gmail.com', 'austintest@gmail.com', 'Test@12345');
    await fillDetailsForm(page, 'Test', 'User', '0412345678');
    const error = await page.textContent('.error_text');
    expect(error).toBe('This email is already in use');
    const heading = await page.textContent('.heading_text');
    expect(heading).toBe('Register');
    expect(page.url()).toBe('http://localhost:3000/register');  // Ensure no redirection
  });
});