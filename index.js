const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = process.env.PORT || 6700;
app.get("/", async (req, res) => {
  try {
    await webScraping()
    return res.status(200).send("Web_Scraping_task_one_location")
  } catch (error) {
    return res.status(500).send(error)
  }
});
app.listen(port, async (req, res) => {
  console.log(`server listening the port ${port} .......`);
});

async function webScraping() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.on("response", async (response) => {
    // console.log(await response._headers.server);
    // console.log(await response._request._resourceType);
    // if (response._request._resourceType == "image") {
    //   console.log(await response._url);
    // }
    // console.log(response.url());
    console.log(await response["_callbacks"]);
    // if (response.url().includes("/foodweb/v2/search")) {
    //   console.log(await response.json());
    // }
  });
  // await page.setRequestInterception(true);
  // page.on('request', request => {
  //     console.log(request.url());
  //     //.........................
  //     request.continue();
  // });

  await page.goto("https://food.grab.com/sg/en/", {
    waitUntil: "networkidle2",
  });
  // await page.waitForTimeout(10000);

  await page.screenshot({ path: "myimg.png" });

  await page.type("#location-input", "manilla");

  await page.click(".ant-btn.submitBtn___2roqB.ant-btn-primary");

  // const [response] = await Promise.all([page.waitForResponse(response => response.url().includes("/foodweb/v2/search"))])
  // const dataObj = await response.json();
  // console.log(dataObj)
  // // let res = await page.waitForResponse((response) =>
  //   response.url().includes("https://portal.grab.com/foodweb/v2/search")
  // );
  // console.log(res);
  // await page.on("response", async (response) => {
  //   if (response.url() == "https://portal.grab.com/foodweb/v2/search") {
  //     console.log(await response.json());
  //   }
  // });

  await browser.close();
}
