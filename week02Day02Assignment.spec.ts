import { chromium, firefox, test } from "@playwright/test";

test(`Login salesforce application and printing the title of page`, async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  // navigate to salesforce login page
  await page.goto("https://login.salesforce.com/");
  // enter username in input field
  await page.fill("input#username", "elumalaianj86@testleaf.com");
  // enter password in input field
  await page.fill("input#password", "testLeaf86@");
  // click on login button
  await page.click("input#Login");
  // wait for the page to load
  await page.waitForNavigation({ timeout: 15000 });
  // get the title of the page
  const title = await page.title();
  console.log(title);
  // get the url of the page
  const url = page.url();
  console.log(url);
  // close the browser
  await browser.close();
});

test(`launch two separate browser instances`, async () => {
  const browserEdge = await chromium.launch({ channel: "msedge" });
  const contextEdge = await browserEdge.newContext();
  const pageEdge = await contextEdge.newPage();

  const browserFirefox = await firefox.launch();
  const contextFirefox = await browserFirefox.newContext();
  const pageFirefox = await contextFirefox.newPage();

  // Naviagte to RedBus Application
  await pageEdge.goto("https://www.redbus.in");
  const redbusTitle = await pageEdge.title();
  console.log(redbusTitle);
  const edgeUrl = pageEdge.url();
  console.log(edgeUrl);

  // Navigate to flipkart application
  await pageFirefox.goto("https://www.flipkart.com");
  const flipkartTitle = await pageFirefox.title();
  console.log(flipkartTitle);
  const firefoxUrl = pageFirefox.url();
  console.log(firefoxUrl);
});
