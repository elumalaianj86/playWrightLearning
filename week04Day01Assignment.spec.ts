import { expect, test } from "@playwright/test";
import { promises } from "dns";
import path from "path";
test(`Handle file upload in salesforce Application`, async ({ page }) => {
  // navigate to salesforce login page
  await page.goto("https://login.salesforce.com/");
  // enter username in input field
  await page.fill("input#username", "elumalaianj86@testleaf.com");
  // enter password in input field
  await page.fill("input#password", "testLeaf86@");
  // click on login button
  await page.click("input#Login");
  //wait until the DOM content is fully loaded
  await page.waitForLoadState("domcontentloaded");
  //click on toggle menu button from the left corner
  await page.click('[title="App Launcher"]');
  //Click view All
  await page.click('[aria-label="View All Applications"]');
  // Click on the search Box and search for Accounts
  await page.getByPlaceholder("Search apps or items...").fill("Accounts");
  //Click on the Accounts from the search results
  await page.click('[id*="lgt-accordion-section"] p');
  //click on New button
  await page.click('div[title="New"]');
  //Enter Account Name
  await page.locator('input[name="Name"]').fill("TestLeaf");
  // click on Rating Dropdown and select Warm
  await page.click("lightning-combobox label + div lightning-base-combobox");
  await page.click('[data-value="Warm"]');
  //click on Type Dropdown and select Prospect
  await page.click(
    "//lightning-combobox//label[text() = 'Type']/following-sibling::div//lightning-base-combobox"
  );
  await page.click('[data-value="Prospect"]');
  //click on Industry Dropdown and select Banking
  await page.click('button[aria-label="Industry"]');
  await page.click('[data-value="Banking"]');
  // click on Ownership Dropdown and select Public
  await page.click('[aria-label="Ownership"]');
  await page.click('[data-value="Public"]');
  //click on Save button
  await page.click('button[name="SaveEdit"]');
  expect(
    await page
      .locator("lightning-formatted-text[slot='primaryField']")
      .innerText()
  ).toBe("TestLeaf");

  //click on Upload Logo button and upload a file
  const filePromise = page.waitForEvent("filechooser");
  await page.click('[id*="file-selector-label"]');
  const uploadFile = await filePromise;
  await uploadFile.setFiles([path.join(__dirname, "../.././data/sample.txt")]);
  await page.click("//span[text()='Done']");

  expect(page.locator('[data-aura-class="forceToastMessage"]')).toBeVisible();
  expect(
    await page.innerText('[data-aura-class="forceActionsText"]')
  ).toContain("1 file was added to the Account.");
  expect(
    await page.innerText('.itemTitle[data-aura-class="uiOutputText"]')
  ).toBe("sample");
});

test.only(`Handle iframes in service now Application`, async ({ page }) => {
  await page.goto("https://dev198115.service-now.com/", {
    waitUntil: "domcontentloaded",
    timeout: 20000,
  });
  //enter username
  await page.locator("#user_name").fill("admin");
  //enter password
  await page.locator("#user_password").fill("NFD0$Usr6d=v");
  //click on login button
  await page.click("#sysverb_login");
  //click on All option from the left corner
  await page.locator('[role="menuitem"]').filter({ hasText: "All" }).click();
  //click on Service Catalog
  await page.getByPlaceholder("Filter").fill("Service Catalog");
  await page.keyboard.press("Enter");
  //click on Mobiles
  await page
    .locator('//div[@class="widget_body"]//td//a//h2')
    .filter({ hasText: "Mobiles" })
    .click();
  //click on Apple iPhone 13
  await page
    .locator('//div[@class="sc_category_item"]//h2')
    .filter({ hasText: "Apple iPhone 13" })
    .click();
  //click on No option for the specification
  const specification = '//span[@data-toggle="tooltip"]/following::span//label';
  await page.locator(specification).filter({ hasText: "No" }).click();
  //click on 500MB option for the specification
  await page.selectOption('//select[@class="form-control cat_item_option "]', {
    label: "500MB [add ₹84.38]",
  });
  //select the color as Starlight
  await page.locator(specification).filter({ hasText: "Starlight" }).click();
  expect(
    await page.locator(specification).filter({ hasText: "Starlight" })
  ).toBeChecked();
  //select the storage as 256GB
  await page
    .locator(specification)
    .filter({ hasText: "256 GB [add ₹8,438.24]" })
    .click();
  expect(
    await page
      .locator(specification)
      .filter({ hasText: "256 GB [add ₹8,438.24]" })
  ).toBeChecked();
  //click on Order Now button
  await page.click("#oi_order_now_button");
  //verify status message
  expect(
    await page
      .locator(".notification-icon.icon-check-circle + span")
      .innerText()
  ).toBe("Thank you, your request has been submitted");
  //verify the title and url
  expect(await page.title()).toContain("Order Status");
  expect(await page.url()).toContain("servicecatalog_checkout");
});

test(`Handle merge lead in leaftaps Application`, async ({ page, context }) => {
  await page.goto("http://leaftaps.com/opentaps/control/main");
  await page.fill("#username", "demosalesManager");
  await page.fill("#password", "crmsfa");
  await page.locator("[value='Login']").click();
  // click on crm/sfa link
  await page.locator("div#label").click();
  // click on leads link
  await page.locator("//a[text()='Leads']").click();
  // click on merge leads link
  await page.click("//a[text()='Merge Leads']");
  // Handling windows
  const fromPromise = context.waitForEvent("page");
  // click on from lead icon
  await page.click("#partyIdFrom + a");
  const fromPage = await fromPromise;
  //expect(await fromPage.title()).toBe("Find Leads");
  //click on first lead from the list
  await fromPage
    .locator("//div[contains(@class ,'x-grid3-col-partyId')]//a")
    .nth(0)
    .click();
  await fromPage.close();
  // click on to lead icon
  const toPromise = context.waitForEvent("page");
  await page.click("#partyIdTo + a");
  const toPage = await toPromise;
  //expect(await toPage.title()).toBe("Find Leads");
  //click on first lead from the list
  await toPage
    .locator("//div[contains(@class ,'x-grid3-col-partyId')]//a")
    .nth(1)
    .click();
  await toPage.close();
  await page.bringToFront();
  //click on merge button
  page.once("dialog", (alertType) => {
    const alertMessage = alertType.message();
    const dialogType = alertType.type();
    console.log(`${dialogType} having the message as ${alertMessage}`);
    alertType.accept();
  });
  await page.click("//a[text()='Merge']");
  await page.waitForTimeout(2000);
  expect(await page.title()).toBe("View Leads | opentaps CRM");
});
