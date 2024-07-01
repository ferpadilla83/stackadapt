describe('Successful Bid Submission', () => {
  it('should submit a valid bid and display it on the dashboard', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.fill('#bidAmount', '100');
    await page.fill('#bidderName', 'John Doe');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.bid-details');
    const bidDetails = await page.textContent('.bid-details');
    expect(bidDetails).to.contain('John Doe');
  });
});