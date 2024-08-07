import {test, expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage.ts"

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
    const basket_count = await homePage.get_basket_count();
    await expect(basket_count).not.toBe(0);

    const basketPage = await homePage.go_to_checkout();
    await basketPage.check_basket_page_url(url_tobe_checked);
    await basketPage.remove_item_with_lowest_price();
    await page.waitForTimeout(1000);
    await expect(await homePage.get_basket_count()).toEqual(basket_count - 1);
    
    await page.pause();

}) 

