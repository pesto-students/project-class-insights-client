import puppeteer from 'puppeteer';

import { SELECTORS, jestTimeout } from '../src/constants/selectors.constants';
import { commonFunctions } from '../src/helpers/commonFunctions';

jest.setTimeout(jestTimeout);

let browser;
let page;
const instructor = {
  name: 'monis',
  email: 'monis.ahmad42@gmail.com',
  password: 'password',
};
const randomNumber = Math.floor(100000 + (Math.random() * 900000));
const randomUser = {
  email: `random${randomNumber}@example.com`,
  password: 'password',
  name: `random${randomNumber}`,
};

beforeAll(async () => {
  browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  page = await browser.newPage();
});

describe('End to end Test of Instructor Login', () => {
  test('user can login', async () => {
    await commonFunctions.login(page, instructor);
    await page.waitForSelector(SELECTORS.dashboard);
  });

  test('user can logout', async () => {
    await page.click(SELECTORS.navbarAction);
    await page.click(SELECTORS.logout);
    await page.waitForSelector(SELECTORS.loginForm);
  });

  test('already registered user cannot register', async () => {
    await commonFunctions.register(page, instructor);
    await page.waitForSelector(SELECTORS.registerFailure);
    const failure = await page.$eval(SELECTORS.registerFailure, e => e.innerHTML);
    expect(failure).toBe('email already registered');
  });

  test('user can register', async () => {
    await commonFunctions.register(page, randomUser);
    await page.waitForSelector(SELECTORS.registerSuccess);
    const failure = await page.$eval(SELECTORS.registerSuccess, e => e.innerHTML);
    expect(failure).toBe('Registration Successful, Please check your email for confirmation Link');
  });
});

afterAll(async () => {
  await browser.close();
});
