import {test, expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage.ts"
import { CheckoutPage } from "../pages/CheckoutPage.ts";

test("user_journey_happy_path", async ({ page }) => {

    const homePage = new HomePage(page);
    const button_index = 1
    const url_tobe_checked = "/basket"

    await page.goto("localhost:2221");

    //TEST CASE 1
    await expect(homePage.ADD_PRODUCT_BUTTON.nth(button_index)).toHaveText("Add to Basket");

    await homePage.add_product_to_basket();
    await homePage.add_product_to_basket(1);

    await expect(homePage.ADD_PRODUCT_BUTTON.nth(button_index)).toHaveText("Remove from Basket");
    await expect(homePage.get_basket_count()).not.toBe(0);

    const checkoutPage = await homePage.go_to_checkout();
    await checkoutPage.check_basket_page_url(url_tobe_checked);
    await page.pause();

}) 

