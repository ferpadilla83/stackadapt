

describe('Form Validation', () => {
  it('should show an error message for missing fields', async () => {
    await page.goto('http://localhost:3000');
    await page.click('button[type="submit"]');
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).to.contain('Invalid input');
  });
});
