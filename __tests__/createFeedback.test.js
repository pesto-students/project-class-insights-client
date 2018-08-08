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

beforeAll(async () => {
  browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  page = await browser.newPage();
});

const feedbackForm = {
  subject: 'End to End Test',
  topic: 'Puppeteer',
  subTopic: 'Importance of E2E test',
  subTopic0: 'What to test in E2E tests',
  batchId: 'M-01',
  date: '10/10/2018',
};

describe('End to end Test for Major flows for Instructors', () => {
  test('Instructor can create a new feedback form', async () => {
    await commonFunctions.login(page, instructor);
    await page.waitForSelector(SELECTORS.dashboard);
    await page.click(SELECTORS.createFeedback);
    await commonFunctions.createNewFeedback(page, feedbackForm);
    await page.waitForSelector(SELECTORS.feedbackSuccess);
    const success = await page.$eval(SELECTORS.feedbackSuccess, e => e.innerHTML);
    expect(success).toBe('submitted successfully');
  });
});

afterAll(async () => {
  await browser.close();
});
