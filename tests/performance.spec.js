describe('Bid Submission Performance', () => {
  it('should submit a bid within the performance criteria', async ({page}) => {
    await page.goto('http://localhost:3000');

    const startTime = Date.now();

    await page.fill('#bidAmount', '100');
    await page.fill('#bidderName', 'Alice');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.bid-details');

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`Bid submission took ${duration}ms`);
    expect(duration).to.be.lessThan(100);
  });
});

