import test from "@playwright/test";

test(`Create a leads in leaftaps application`, async ({ page }) => {
  await page.goto("http://leaftaps.com/opentaps/control/main");
  await page.fill("#username", "demosalesManager");
  await page.fill("#password", "crmsfa");
  await page.locator("[value='Login']").click();
  // click on crm/sfa link
  await page.locator("div#label").click();
  // click on leads link
  await page.locator("//a[text()='Leads']").click();
  // click on create lead link
  await page.locator('//a[text()="Create Lead"]').click();
  // enter company name
  await page.fill("#createLeadForm_companyName", "TestLeaf");
  //enter First name
  await page.fill("#createLeadForm_firstName", "Elumalai");
  //Enter last name
  await page.fill("#createLeadForm_lastName", "Raj");
  //select Source
  await page.selectOption("#createLeadForm_dataSourceId", "Direct Mail");
  //select Marketing Campaign
  await page.selectOption(
    "#createLeadForm_marketingCampaignId",
    "Demo Marketing Campaign"
  );
  //select Industry
  await page.selectOption("#createLeadForm_industryEnumId", "Distribution");
  // click on create lead button
  await page.locator('[name="submitButton"]').click();
});
