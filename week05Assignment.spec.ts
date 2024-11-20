import test from "@playwright/test";
import { parse } from "csv-parse/sync";
import path from "path";
import fs from "fs";
import dropDownData from "../../data/leaftapsDropDownData.json"; //importing json file
import dotenv from "dotenv";

//Read data from env file
dotenv.config({
  path: path.resolve(__dirname, "../../../tests/data/leaftapsDataenvfile.env"),
});

// Read data from csv file
const inputData = parse(
  fs.readFileSync(
    path.join(__dirname, "../.././data/leaftapsData.csv"),
    "utf8"
  ),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

for (let data of inputData) {
  test(`Data parameterization of csv file in leaftaps application`, async ({
    page,
  }) => {
    const url = process.env.BASE_URL as string;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.fill("#username", data.username);
    await page.fill("#password", data.password);
    await page.click("[value='Login']");
    // click on crm/sfa link
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }), // Waits for the new page to fully load
      await page.click("div#label"),
    ]);
    // click on leads link
    await page
      .locator(".x-panel-header a")
      .filter({ hasText: "Leads" })
      .click();
    // click on create lead link
    await page
      .locator("//div[@class= 'frameSectionBody']//a")
      .filter({ hasText: "Create Lead" })
      .click();
    // enter company name
    await page.fill("#createLeadForm_companyName", data.cName, {
      timeout: 10000,
    });
    //enter First name
    await page.fill("#createLeadForm_firstName", data.fName);
    //Enter last name
    await page.fill("#createLeadForm_lastName", data.lName);
    //select source and Direct Mail
    await page.selectOption("#createLeadForm_dataSourceId", data.source);
    //select marketing campaign and Demo Marketing Campaign
    await page.selectOption(
      "#createLeadForm_marketingCampaignId",
      data.marketCompaign,
      { timeout: 10000 }
    );
    //Get the count and print all the values in the Marketing Campaign dropdown
    const dropDownOptions = page.locator(
      "#createLeadForm_marketingCampaignId option"
    );
    const optionCount = await page
      .locator("#createLeadForm_marketingCampaignId option")
      .count();
    console.log("The count of options in the dropdown is: " + optionCount);
    const options = await dropDownOptions.all();
    for (const option of options) {
      const text = await option.textContent();
      console.log(`Option: ${text?.trim()}`);
    }
    //select industry and General Services
    await page.selectOption("#createLeadForm_industryEnumId", data.industry);
    //select Currency and Rupee
    await page.selectOption("#createLeadForm_currencyUomId", data.currency);
    //select country and India
    await page.selectOption(
      "#createLeadForm_generalCountryGeoId",
      data.country
    );
    //select state and Tamilnadu
    await page.selectOption(
      "#createLeadForm_generalStateProvinceGeoId",
      data.state
    );
    //Get the count of all states and print the values in the console
    const stateOptions = page.locator(
      "#createLeadForm_generalStateProvinceGeoId option"
    );
    const stateCount = await page
      .locator("#createLeadForm_generalStateProvinceGeoId option")
      .count();
    console.log("The count of options in the dropdown is: " + stateCount);
    const stateDropdown = await stateOptions.all();
    for (const option of stateDropdown) {
      const text = await option.textContent();
      console.log(`Option: ${text?.trim()}`);
    }
    //click on create lead button
    await page.click("input[value='Create Lead']", { timeout: 15000 });
  });
}

for (const data of dropDownData) {
  test(`Data parameterization of json file in leaftaps application`, async ({
    page,
  }) => {
    const url = process.env.BASE_URL as string;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.fill("#username", data.username);
    await page.fill("#password", data.password);
    await page.click("[value='Login']");
    // click on crm/sfa link
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }), // Waits for the new page to fully load
      await page.click("div#label"),
    ]);
    // click on leads link
    await page
      .locator(".x-panel-header a")
      .filter({ hasText: "Leads" })
      .click();
    //await page.click("//a[text()='Leads']");
    // click on create lead link
    await page
      .locator("//div[@class= 'frameSectionBody']//a")
      .filter({ hasText: "Create Lead" })
      .click();
    // enter company name
    await page.fill("#createLeadForm_companyName", data.cName, {
      timeout: 10000,
    });
    //enter First name
    await page.fill("#createLeadForm_firstName", data.fName);
    //Enter last name
    await page.fill("#createLeadForm_lastName", data.lName);
    //select source and Direct Mail
    await page.selectOption("#createLeadForm_dataSourceId", data.source);
    //select marketing campaign and Demo Marketing Campaign
    await page.selectOption(
      "#createLeadForm_marketingCampaignId",
      data.marketCompaign,
      { timeout: 10000 }
    );
    //Get the count and print all the values in the Marketing Campaign dropdown
    const dropDownOptions = page.locator(
      "#createLeadForm_marketingCampaignId option"
    );
    const optionCount = await page
      .locator("#createLeadForm_marketingCampaignId option")
      .count();
    console.log("The count of options in the dropdown is: " + optionCount);
    const options = await dropDownOptions.all();
    for (const option of options) {
      const text = await option.textContent();
      console.log(`Option: ${text?.trim()}`);
    }
    //select industry and General Services
    await page.selectOption("#createLeadForm_industryEnumId", data.industry);
    //select Currency and Rupee
    await page.selectOption("#createLeadForm_currencyUomId", data.currency);
    //select country and India
    await page.selectOption(
      "#createLeadForm_generalCountryGeoId",
      data.country
    );
    //select state and Tamilnadu
    await page.selectOption(
      "#createLeadForm_generalStateProvinceGeoId",
      data.state
    );
    //Get the count of all states and print the values in the console
    const stateOptions = page.locator(
      "#createLeadForm_generalStateProvinceGeoId option"
    );
    const stateCount = await page
      .locator("#createLeadForm_generalStateProvinceGeoId option")
      .count();
    console.log("The count of options in the dropdown is: " + stateCount);
    const stateDropdown = await stateOptions.all();
    for (const option of stateDropdown) {
      const text = await option.textContent();
      console.log(`Option: ${text?.trim()}`);
    }
    //click on create lead button
    await page.click("input[value='Create Lead']", { timeout: 15000 });
  });
}
