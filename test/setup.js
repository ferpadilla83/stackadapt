import { chromium } from 'playwright';
import chai from 'chai';
import { describe, it, before, after, beforeEach, afterEach } from 'mocha';

global.expect = chai.expect;
global.describe = describe;
global.it = it;
global.before = before;
global.after = after;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

let browser;
let context;
let page;

before(async () => {
  browser = await chromium.launch();
});

beforeEach(async () => {
  context = await browser.newContext();
  page = await context.newPage();
  global.page = page;
  global.context = context;
});

afterEach(async () => {
  await page.close();
  await context.close();
});

after(async () => {
  await browser.close();
});


