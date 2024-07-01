
describe('Winning Bid Display', () => {
  it('should correctly identify and display the highest bid', async ({page}) => {
    await page.goto('http://localhost:3000');

    // Submit first bid
    await page.fill('#bidAmount', '100');
    await page.fill('#bidderName', 'Alice');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(100);

    // Submit second bid
    await page.fill('#bidAmount', '200');
    await page.fill('#bidderName', 'Bob');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(100);

    // Submit third bid
    await page.fill('#bidAmount', '150');
    await page.fill('#bidderName', 'Charlie');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(100);

    // Check the winning bid
    await page.waitForSelector('.winning-bid');
    const winningBid = await page.textContent('.winning-bid');
    expect(winningBid).to.contain('200');
    expect(winningBid).to.contain('Bob');
  });
});

