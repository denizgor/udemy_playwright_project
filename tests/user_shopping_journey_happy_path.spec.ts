import {test, expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage.ts"
import { userData } from "../data/userData.ts"

test("user_shopping_journey_happy_path", async ({ page }) => {

    // TEST VARIABLES
    const homePage = new HomePage(page)
    const baseURL = "http://localhost:2221/"
    const card_owner = userData.first_name + " " + userData.last_name
    const button_index = 1
    const basket_page_url = /.*basket/
    const login_page_url = /.*login/
    const delivery_page_url = /.*delivery-details/
    const payment_page_url = /.*payment/
    const confirmation_page_url = /.*thank-you/
   
    //TEST CASE 1
    await page.goto(baseURL)
    await expect(homePage.ADD_PRODUCT_BUTTON.nth(button_index)).toHaveText("Add to Basket")

    await homePage.add_product_to_basket()
    await homePage.add_product_to_basket(button_index)
    await homePage.add_product_to_basket(2)

    await expect(homePage.ADD_PRODUCT_BUTTON.nth(button_index)).toHaveText("Remove from Basket")

    let basket_count = await homePage.get_basket_count()
    await expect(basket_count).not.toBe(0)

    const basketPage = await homePage.go_to_basket()
    await expect(page).toHaveURL(basket_page_url)
    await basketPage.remove_item_with_lowest_price()
    
    await expect(await homePage.get_basket_count()).toEqual(basket_count - 1)

    const loginPage = await basketPage.continue_to_checkout()
    await expect(page).toHaveURL(login_page_url)
    await loginPage.enter_email(userData.admin_name)
    await loginPage.enter_password(userData.admin_password)

    const deliveryPage = await loginPage.click_login_button()
    await expect(page).toHaveURL(delivery_page_url)
    await deliveryPage.fill_delivery_address()

    const paymentPage = await deliveryPage.click_continue_to_payment_button()
    await expect(page).toHaveURL(payment_page_url)
    await paymentPage.enter_card_owner(card_owner)
    await paymentPage.enter_card_number(userData.card_number)
    await paymentPage.enter_card_expiry(userData.card_expiry)
    await paymentPage.enter_card_cvc(userData.card_cvc)
    
    const discount_code = await paymentPage.get_discount_code()
    await paymentPage.enter_discount_code(discount_code ?? "")
    await paymentPage.apply_discount()

    const confirmationPage = await paymentPage.click_payment_button()
    await expect(confirmationPage.BACK_TO_SHOPPING_BUTTON).toBeVisible()
    await expect(page).toHaveURL(confirmation_page_url)
    await confirmationPage.click_back_to_shopping_button()
    basket_count = await homePage.get_basket_count()
    await expect(basket_count).toEqual(0)
    
}) 
