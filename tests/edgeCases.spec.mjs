

describe('Edge Cases', () => {
  it('should handle simultaneous bid submissions', async () => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('http://localhost:3000');
    await page2.goto('http://localhost:3000');

    // Submit first bid
    await page1.fill('#bidAmount', '300');
    await page1.fill('#bidderName', 'Dave');
    await page1.click('button[type="submit"]');
    await page1.waitForTimeout(100);

    // Submit second bid simultaneously
    await page2.fill('#bidAmount', '400');
    await page2.fill('#bidderName', 'Eve');
    await page2.click('button[type="submit"]');
    await page2.waitForTimeout(100);

    // Verify the bids
    await page1.waitForSelector('.bid-details');
    await page2.waitForSelector('.bid-details');

    const bid1 = await page1.textContent('.bid-details');
    const bid2 = await page2.textContent('.bid-details');

    expect(bid1).to.contain('Dave');
    expect(bid2).to.contain('Eve');

    await page1.close();
    await page2.close();
  });

  it('should handle very high/low bid values', async () => {
    await page.goto('http://localhost:3000');

    // Submit a very low bid
    await page.fill('#bidAmount', '0.01');
    await page.fill('#bidderName', 'Frank');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.bid-details');
    let bidDetails = await page.textContent('.bid-details');
    expect(bidDetails).to.contain('Frank');

    // Submit a very high bid
    await page.fill('#bidAmount', '1000000');
    await page.fill('#bidderName', 'Grace');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.bid-details');
    bidDetails = await page.textContent('.bid-details');
    expect(bidDetails).to.contain('Grace');
  });

  it('should display correct message when no bids are submitted', async () => {
    await page.goto('http://localhost:3000/dashboard');

    await page.waitForSelector('.no-bids');
    const noBidsMessage = await page.textContent('.no-bids');
    expect(noBidsMessage).to.contain('No bids submitted');
  });
});
