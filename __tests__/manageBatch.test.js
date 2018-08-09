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

const randomNumber = Math.floor(1000 + (Math.random() * 9000));
const newBatch = {
  batchId: `TS-${randomNumber}`,
  startDate: '10/10/2018',
  endDate: '10/12/2018',
  status: '1',
};

beforeAll(async () => {
  browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  page = await browser.newPage();
});

describe('End to end Test for Batch Management for Instructors', () => {
  test('Instructor can view batches and create new batch', async () => {
    await commonFunctions.login(page, instructor);
    await page.waitForSelector(SELECTORS.dashboard);
    await page.click(SELECTORS.batchesButton);
    await page.waitForSelector(SELECTORS.addBatchButton);
    await page.click(SELECTORS.addBatchButton);
    await commonFunctions.addNewBatch(page, newBatch);
    await page.waitForSelector(SELECTORS.addBatchSuccess);
    const success = await page.$eval(SELECTORS.addBatchSuccess, e => e.innerHTML);
    expect(success).toBe('batch added successfully');
  });
});

afterAll(async () => {
  await browser.close();
});
