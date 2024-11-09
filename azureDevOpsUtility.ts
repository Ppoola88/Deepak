import axios from "axios";

// Fetch Test Point IDs for a specific test case
async function getTestPointIdForSingleCase(
  testPlanId: number,
  testSuiteId: number,
  testCaseId: number,
  pat: string
): Promise<number | null> {
  const url = `https://dev.azure.com/deepakqe2502/PlaywrightPipeline/_apis/testplan/Plans/${testPlanId}/Suites/${testSuiteId}/TestPoint?tstCaseId=${testCaseId}&api-version=7.1`;
  const authHeader = `Basic ${Buffer.from(`:${pat}`).toString("base64")}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (response.data.value && response.data.value.length > 0) {
      // Loop through all values to find the matching testCaseReference.id
      for (let index = 0; index < response.data.value.length; index++) {
        if (response.data.value[index].testCaseReference.id === testCaseId) {
          return response.data.value[index].id; // Return the matching Test Point ID
        }
      }

      console.error(
        `No matching Test Point found for Test Case ID: ${testCaseId}.`
      );
      return null;
    } else {
      console.error(`No test points found for Test Case ID: ${testCaseId}.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching test point ID:", error);
    return null;
  }
}

// Update a single Test Point with the outcome
async function updateSingleTestPointOutcome(
  testPlanId: number,
  testSuiteId: number,
  testPointId: number,
  outcome: number,
  pat: string
): Promise<void> {
  const url = `https://dev.azure.com/deepakqe2502/PlaywrightPipeline/_apis/testplan/Plans/${testPlanId}/Suites/${testSuiteId}/TestPoint?api-version=7.1`;
  const authHeader = `Basic ${Buffer.from(`:${pat}`).toString("base64")}`;

  const body = [
    {
      id: testPointId,
      results: {
        outcome: outcome,
      },
    },
  ];

  try {
    await axios.patch(url, body, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });
    console.log(`Test point ${testPointId} updated with outcome: ${outcome}`);
  } catch (error) {
    console.error("Error updating test point outcome:", error);
  }
}

// Main function to handle updating a single test case's outcome
export async function updateOutcomeForTestCaseFile(
  testPlanId: number,
  testSuiteId: number,
  testCaseFile: string,
  outcome: number,
  pat: string
): Promise<void> {
  const testCaseId = parseInt(testCaseFile.split(".")[0]);

  const testPointId = await getTestPointIdForSingleCase(
    testPlanId,
    testSuiteId,
    testCaseId,
    pat
  );

  console.log("TestcaseID: ", testCaseId);
  console.log("TestPointID: ", testPointId);

  if (testPointId !== null) {
    await updateSingleTestPointOutcome(
      testPlanId,
      testSuiteId,
      testPointId,
      outcome,
      pat
    );
  } else {
    console.error(
      `Failed to retrieve Test Point ID for ${testCaseFile}; cannot update outcome.`
    );
  }
}
