import {test, expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage.ts"
import { userData } from "../data/userData.ts"

test("user_journey_happy_path", async ({ page }) => {

    // TEST VARIABLES
    const homePage = new HomePage(page)
    const baseURL = "localhost:2221"
    const user_name = "admin"
    const password = "Admin123"
    const button_index = 1
    const basket_page_url = "/basket"
    const login_page_url = "/login"
    const register_page_url = "/signup"
    const delivery_page_url = "/delivery-details"
    const payment_page_url = "/payment"
    const confirmation_page_url = "/thank-you"


    await page.goto(baseURL)

    //TEST CASE 1
    await expect(homePage.ADD_PRODUCT_BUTTON.nth(button_index)).toHaveText("Add to Basket")

    await homePage.add_product_to_basket()
    await homePage.add_product_to_basket(button_index)
    await homePage.add_product_to_basket(2)

    await expect(homePage.ADD_PRODUCT_BUTTON.nth(button_index)).toHaveText("Remove from Basket")

    const basket_count = await homePage.get_basket_count()
    await expect(basket_count).not.toBe(0)

    const basketPage = await homePage.go_to_checkout()
    await basketPage.check_basket_page_url(basket_page_url)
    await basketPage.remove_item_with_lowest_price()
    await page.waitForTimeout(1000)
    
    await expect(await homePage.get_basket_count()).toEqual(basket_count - 1)

    const loginPage = await basketPage.continue_to_checkout()
    await loginPage.check_login_page_url(login_page_url)
    await loginPage.enter_email(user_name)
    await loginPage.enter_password(password)
    await page.waitForTimeout(1000)

    const deliveryPage = await loginPage.click_login_button()
    await deliveryPage.check_delivery_page_url(delivery_page_url)
    await deliveryPage.fill_delivery_address()
    await page.waitForTimeout(1000)

    const PaymentPage = await deliveryPage.click_continue_to_payment_button()
    await PaymentPage.check_payment_page_url(payment_page_url)
    await PaymentPage.enter_card_owner(userData.card_owner)
    await PaymentPage.enter_card_number(userData.card_number)
    await PaymentPage.enter_card_expiry(userData.card_expiry)
    await PaymentPage.enter_card_cvc(userData.card_cvc)
    const discount_code = await PaymentPage.get_discount_code()
    await PaymentPage.enter_discount_code(discount_code ?? "")
    await page.waitForTimeout(1000)
    await PaymentPage.apply_discount()
    
    const confirmationPage = await PaymentPage.click_payment_button()
    await confirmationPage.check_confirmation_page_url(confirmation_page_url)
    await page.goto(baseURL)
    

}) 

