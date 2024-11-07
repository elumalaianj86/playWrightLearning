import test, { expect } from "@playwright/test";

test(`Create Lead in SalesForce application`, async ({ page }) => {
  // navigate to salesforce login page
  await page.goto("https://login.salesforce.com/");
  // enter username in input field
  await page.fill("input#username", "elumalaianj86@testleaf.com");
  // enter password in input field
  await page.fill("input#password", "testLeaf86@");
  // click on login button
  await page.click("input#Login");
  //click on toggle menu button from the left corner
  await page.click('[title="App Launcher"]', { timeout: 10000 });
  //Click view All and click Sales from App Launcher
  await page.click('[aria-label="View All Applications"]');
  await page.click('div[data-name="Sales"]', { timeout: 15000 });
  //Click on Leads tab
  await page.click('[data-id="Lead"]');
  //Click on New button
  await page.click('[name="New"]');
  //Select Salutation dropdown
  await page.click('[name="salutation"]');
  await page.click('text="Mr."');
  //Enter the Last Name
  await page.getByPlaceholder("Last Name").fill("M S");
  //Enter the Company Name
  await page.locator('[name="Company"]').fill("TestLeaf");
  //Click Save and Verify Leads name created
  await page.click('[name="SaveEdit"]');
  const LeadsName = await page
    .locator('[slot="primaryField"]')
    .innerText({ timeout: 10000 });
  expect(LeadsName).toContain("M S");
});

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
  // click on create lead button
  await page.locator('[name="submitButton"]').click();
  //Click Edit
  await page.locator(".subMenuButton", { hasText: "Edit" }).click();
  //Change the company name
  await page.fill("#updateLeadForm_companyName", "TestLeaf_Updated");
  //Click Update
  await page.locator('[value="Update"]').click();
});

test(`Create New Indivials in SalesForce application`, async ({ page }) => {
  // navigate to salesforce login page
  await page.goto("https://login.salesforce.com/");
  // enter username in input field
  await page.fill("input#username", "elumalaianj86@testleaf.com");
  // enter password in input field
  await page.fill("input#password", "testLeaf86@");
  // click on login button
  await page.click("input#Login");
  //click on toggle menu button from the left corner
  await page.click('[title="App Launcher"]', { timeout: 10000 });
  //Click view All and click Sales from App Launcher
  await page.click('[aria-label="View All Applications"]');
  // Click on the search Box and search for Individuals
  await page.getByPlaceholder("Search apps or items...").fill("Individuals");
  await page.click('[id*="lgt-accordion-section"] p');
  //Click on New Individual
  await page.click('[data-aura-class="forceListViewManager"] a[title="New"]');
  //Enter the Last Name
  await page.getByPlaceholder("Last Name").fill("M S");
  //Click save and verify Individuals Name
  await page.click('[title="Save"]');
  const IndividualName = await page
    .locator("h1 div .uiOutputText")
    .last()
    .innerText();
  expect(IndividualName).toContain("M S");
});

test.only("Edit Individuals in SalesForce application", async ({ page }) => {
  await page.goto("https://login.salesforce.com/");
  // enter username in input field
  await page.fill("input#username", "elumalaianj86@testleaf.com");
  // enter password in input field
  await page.fill("input#password", "testLeaf86@");
  // click on login button
  await page.click("input#Login");
  //click on toggle menu button from the left corner
  await page.click('[title="App Launcher"]', { timeout: 10000 });
  //Click view All and click Sales from App Launcher
  await page.click('[aria-label="View All Applications"]');
  // Click on the search Box and search for Individuals
  await page.getByPlaceholder("Search apps or items...").fill("Individuals");
  await page.click('[id*="lgt-accordion-section"] p');
  // Search the Individual Name
  await page.getByPlaceholder("Search this list...").fill("M S");
  //Click on the Individual Name
  await page.click('span [data-aura-class="forceVirtualAction"]');
  //Click on Edit
  await page.click('[role="menuitem"] [title="Edit"]');
  //Select Salutation dropdown
  await page.click('.salutation [data-aura-class="uiPopupTrigger"]');
  await page.click('text="Mr."');
  //enter First name
  await page.fill(".firstName", "Elumalai");
  //Click save and verify First Name
  await page.click('[title="Save"]');
  await page.click('name="Individual-search-input"');
  const IndividualName = await page
    .locator("[data-aura-class='forceInlineEditCell'] a")
    .first()
    .innerText();
  expect(IndividualName).toContain("Elumalai");
});
