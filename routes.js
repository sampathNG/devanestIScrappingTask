const router = require("express").Router();
const puppeteer = require("puppeteer");
// router.get("/", async (req, res) => {
//   try {
//     console.log("Hello World!");
//     res.send("Hello World!");
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(error.message);
//   }
// });
router.get("/", async (req, res) => {
  try {
    console.log("Before launching browser");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
    );
    // FOR WINDOWS  ONLY
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134');

    console.log("After launching browser");

    await page.goto("https://www.amazon.in/");
    await page.waitForSelector("#nav-search");
    const parentElement = await page.$("#nav-search");
    const firstChildElement = await parentElement.$("#nav-search-bar-form");
    const secondChildElement = await firstChildElement.$(".nav-fill");
    const thirdChildElement = await secondChildElement.$(".nav-search-field ");
    const enterTextElement = await thirdChildElement.$("#twotabsearchtextbox");
    await enterTextElement.type("fastrack");
    await page.keyboard.press("Enter");
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    const secondPageElement = await page.$("#search");
    const secondPageFirstChild = await secondPageElement.$(
      ".s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row"
    );
    const secondPageSecondChild = await secondPageFirstChild.$(
      ".sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16"
    );
    const secondPageElementParent = await secondPageSecondChild.$(
      ".s-main-slot.s-result-list.s-search-results.sg-row"
    );
    const xcv = await secondPageElementParent.$eval(
      // ":scope > :nth-child(7)",
      ":scope > :nth-child(9)",
      (element) => element.innerHTML
    );
    // const productList1 = xcv.split(/\s+/);
    // console.log(xcv);
    const fProduct = await secondPageElementParent.$(":scope > :nth-child(7)");
    const fProductName = await fProduct.$eval(
      ".a-size-base-plus.a-color-base",
      (element) => element.textContent.trim()
    );
    const fProductDesc = await fProduct.$eval(
      ".a-size-base-plus.a-color-base.a-text-normal",
      (element) => element.textContent.trim()
    );
    const fProductRatingReview = await fProduct.$eval(
      ".a-row.a-size-small",
      (element) => element.textContent.trim()
    );
    const fProductRating = fProductRatingReview.split(/\s+/)[0];
    const fProductReview = fProductRatingReview.split(/\s+/)[5];
    const fProductPrice = await fProduct.$eval(".a-offscreen", (element) =>
      element.textContent.trim()
    );
    const sProduct = await secondPageElementParent.$(":scope > :nth-child(8)");
    const sProductName = await sProduct.$eval(
      ".a-size-base-plus.a-color-base",
      (element) => element.textContent.trim()
    );
    const sProductDesc = await sProduct.$eval(
      ".a-size-base-plus.a-color-base.a-text-normal",
      (element) => element.textContent.trim()
    );
    const sProductRatingReview = await sProduct.$eval(
      ".a-row.a-size-small",
      (element) => element.textContent.trim()
    );
    const sProductRating = sProductRatingReview.split(/\s+/)[0];
    const sProductReview = sProductRatingReview.split(/\s+/)[5];
    const sProductPrice = await sProduct.$eval(".a-offscreen", (element) =>
      element.textContent.trim()
    );
    const tProduct = await secondPageElementParent.$(":scope > :nth-child(9)");
    const tProductName = await tProduct.$eval(
      ".a-size-base-plus.a-color-base",
      (element) => element.textContent.trim()
    );
    const tProductDesc = await tProduct.$eval(
      ".a-size-base-plus.a-color-base.a-text-normal",
      (element) => element.textContent.trim()
    );
    const tProductRatingReview = await tProduct.$eval(
      ".a-row.a-size-small",
      (element) => element.textContent.trim()
    );
    const tProductRating = tProductRatingReview.split(/\s+/)[0];
    const tProductReview = tProductRatingReview.split(/\s+/)[5];
    const tProductPrice = await tProduct.$eval(".a-offscreen", (element) =>
      element.textContent.trim()
    );
    const foProduct = await secondPageElementParent.$(
      ":scope > :nth-child(10)"
    );
    const foProductName = await foProduct.$eval(
      ".a-size-base-plus.a-color-base",
      (element) => element.textContent.trim()
    );
    const foProductDesc = await foProduct.$eval(
      ".a-size-base-plus.a-color-base.a-text-normal",
      (element) => element.textContent.trim()
    );
    const foProductRatingReview = await foProduct.$eval(
      ".a-row.a-size-small",
      (element) => element.textContent.trim()
    );
    const foProductRating = foProductRatingReview.split(/\s+/)[0];
    const foProductReview = foProductRatingReview.split(/\s+/)[5];
    const foProductPrice = await foProduct.$eval(".a-offscreen", (element) =>
      element.textContent.trim()
    );
    console.log(
      "firstProductName",
      `${fProductName}`,
      "firstProductDescription",
      `${fProductDesc}`,
      "firstProductRating",
      `${fProductRating}`,
      "firstProductNoOfReviews",
      `${fProductReview}`,
      "firstProductPrice",
      `${fProductPrice}`,
      "secondProductName",
      `${sProductName}`,
      "secondProductDescription",
      `${sProductDesc}`,
      "secondProductRating",
      `${sProductRating}`,
      "secondProductNoOfReviews",
      `${sProductReview}`,
      "secondProductPrice",
      `${sProductPrice}`,
      "thirdProductName",
      `${tProductName}`,
      "thirdProductDescription",
      `${tProductDesc}`,
      "thirdProductRating",
      `${tProductRating}`,
      "thirdProductNoOfReviews",
      `${tProductReview}`,
      "thirdProductPrice",
      `${tProductPrice}`,
      "fourthProductName",
      `${foProductName}`,
      "fourthProductDescription",
      `${foProductDesc}`,
      "fourthProductRating",
      `${foProductRating}`,
      "fourthProductNoOfReviews",
      `${foProductReview}`,
      "fourthProductPrice",
      `${foProductPrice}`
    );
    res.json({
      firstProductName: `${fProductName}`,
      firstProductDescription: `${fProductDesc}`,
      firstProductRating: `${fProductRating}`,
      firstProductNoOfReviews: `${fProductReview}`,
      firstProductPrice: `${fProductPrice}`,
      secondProductName: `${sProductName}`,
      secondProductDescription: `${sProductDesc}`,
      secondProductRating: `${sProductRating}`,
      secondProductNoOfReviews: `${sProductReview}`,
      secondProductPrice: `${sProductPrice}`,
      thirdProductName: `${tProductName}`,
      thirdProductDescription: `${tProductDesc}`,
      thirdProductRating: `${tProductRating}`,
      thirdProductNoOfReviews: `${tProductReview}`,
      thirdProductPrice: `${tProductPrice}`,
      fourthProductName: `${foProductName}`,
      fourthProductDescription: `${foProductDesc}`,
      fourthProductRating: `${foProductRating}`,
      fourthProductNoOfReviews: `${foProductReview}`,
      fourthProductPrice: `${foProductPrice}`,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(error.message);
  }
});

module.exports = router;
