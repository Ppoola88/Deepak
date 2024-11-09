import { test, expect } from "@playwright/test";
import axios from "axios";
import { updateOutcomeForTestCaseFile } from "../utils/azureDevOpsUtility"; // Adjust the path as needed

// Azure DevOps Parameters (typically loaded from environment variables)
const testPlanId = Number(process.env.TEST_PLAN_ID);
const testSuiteId = Number(process.env.TEST_SUITE_ID);
const pat =
  process.env.PAT;
//const testCasefile = "8.spec.ts";
//const testCasefile = process.env.TEST_CASE_FILE;
const testCasefile: string = process.env.TEST_CASE_FILE";

// The Test Case ID, extracted from the file name
//const testCaseId = 8; // Set this to match the test case file name (e.g., 8 for "8.spec.ts")

// Map Playwright test results to Azure DevOps outcomes
const outcomeMapping = {
  passed: 2, // Azure DevOps "Passed"
  failed: 3, // Azure DevOps "Failed"
};

test.describe("Azure DevOps Test Integration", () => {
  test(`Test case ${testCasefile}`, async ({ page }) => {
    let outcome;

    try {
      // Run test steps here
      await page.goto("https://playwright.dev/");
      const pageTitle = await page.title();
      await expect(page).toHaveTitle(/Playwright/, { timeout: 20000 }); // Adjust expected title as needed

      // If the test passes
      outcome = outcomeMapping.passed;
    } catch (error) {
      // If the test fails
      outcome = outcomeMapping.failed;
      console.error(`Test case ${testCasefile} failed.`);
      throw error; // Rethrow to mark as failed in Playwright
    } finally {
      // Update Azure DevOps with the test outcome
      // await updateTestPointsForMultipleTestCases(
      //   testPlanId,
      //   testSuiteId,
      //   testCasefile,
      //   outcome,
      //   pat
      // );

      // await updateOutcomeForTestCaseFile(6, 7, testCasefile, outcome, pat);
      // console.log(
      //   `Test case ${testCasefile} updated in Azure DevOps with outcome: ${
      //     outcome === 2 ? "Passed" : "Failed"
      //   }`
      // );

      await updateOutcomeForTestCaseFile(
        testPlanId,
        testSuiteId,
        testCasefile,
        outcome,
        pat
      );
      console.log(
        `Test case ${testCasefile} updated in Azure DevOps with outcome: ${
          outcome === 2 ? "Passed" : "Failed"
        }`
      );
    }
  });
});
