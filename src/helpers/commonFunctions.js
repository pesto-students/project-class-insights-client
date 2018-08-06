import { FRONTEND_URL } from '../constants/auth.constant';
import { SELECTORS } from '../constants/selectors.constants';

const login = async (page, instructor) => {
  await page.goto(FRONTEND_URL);
  await page.waitForSelector(SELECTORS.loginForm);
  await page.click(SELECTORS.emailInput);
  await page.type(SELECTORS.emailInput, instructor.email);
  await page.click(SELECTORS.passwordInput);
  await page.type(SELECTORS.passwordInput, instructor.password);
  await page.click(SELECTORS.submitButton);
};

const register = async (page, user) => {
  await page.goto(FRONTEND_URL);
  await page.click(SELECTORS.registerButton);
  await page.waitForSelector(SELECTORS.registerForm);
  await page.click(SELECTORS.nameInput);
  await page.type(SELECTORS.nameInput, user.name);
  await page.click(SELECTORS.emailInput);
  await page.type(SELECTORS.emailInput, user.email);
  await page.click(SELECTORS.passwordInput);
  await page.type(SELECTORS.passwordInput, user.password);
  await page.click(SELECTORS.submitButton);
};

const addNewBatch = async (page, newBatch) => {
  await page.waitForSelector(SELECTORS.addBatchForm);
  await page.click(SELECTORS.newBatchId);
  await page.type(SELECTORS.newBatchId, newBatch.batchId);
  await page.click(SELECTORS.newBatchStartDate);
  await page.type(SELECTORS.newBatchStartDate, newBatch.startDate);
  await page.click(SELECTORS.newBatchEndDate);
  await page.type(SELECTORS.newBatchEndDate, newBatch.endDate);
  await page.select(SELECTORS.newBatchStatus, newBatch.status);
  await page.click(SELECTORS.submitButton);
};

export const commonFunctions = {
  login,
  register,
  addNewBatch,
};
