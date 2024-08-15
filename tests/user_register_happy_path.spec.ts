import {test, expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage.ts"
import { userData } from "../data/userData.ts"
import { DeliveryPage } from "../pages/DeliveryPage.ts"


test.only("register new user", async ({ page }) => {
    //TEST VARIABLES
    const baseURL = "localhost:2221"
    const homePage = new HomePage(page)
    
    const card_owner = userData.first_name + " " + userData.last_name
    const register_page_url = /.*signup/
    const my_account_page_url = /.*my-account/
    const delivery_page_url = /.*delivery-details/
    
    
    // TEST CASE
    await page.goto(baseURL)
    const loginPage = await homePage.go_to_my_account()
    const registerPage = await loginPage.click_register_button()

    await expect(page).toHaveURL(register_page_url)

    await registerPage.enter_email(userData.email)
    await registerPage.enter_password(userData.password)
    const newHomePage = await registerPage.click_register_button()
    await page.waitForLoadState("networkidle")

    await expect(page).toHaveURL(my_account_page_url)
    
    await newHomePage.go_to_art()
    await newHomePage.add_product_to_basket()
    //await page.pause()
    const basketPage = await newHomePage.go_to_basket()
    await basketPage.continue_to_checkout()
    
    const deliveryPage = new DeliveryPage(page)
    await expect(page).toHaveURL(delivery_page_url)

    await deliveryPage.enter_first_name(userData.first_name)
    await expect(deliveryPage.FIRST_NAME_FIELD).toHaveValue(userData.first_name)

    await deliveryPage.enter_last_name(userData.last_name)
    await expect(deliveryPage.LAST_NAME_FIELD).toHaveValue(userData.last_name)

    await deliveryPage.enter_street(userData.street)
    await expect(deliveryPage.STREET_FIELD).toHaveValue(userData.street)

    await deliveryPage.enter_postcode(userData.postcode)
    await expect(deliveryPage.POSTCODE_FIELD).toHaveValue(userData.postcode)

    await deliveryPage.enter_city(userData.city)
    await expect(deliveryPage.CITY_FIELD).toHaveValue(userData.city)
    
    await deliveryPage.click_save_address_button()
    
    const paymentPage = await deliveryPage.click_continue_to_payment_button()
    await paymentPage.enter_card_owner(card_owner)
    await paymentPage.enter_card_number(userData.card_number)
    await paymentPage.enter_card_expiry(userData.card_expiry)
    await paymentPage.enter_card_cvc(userData.card_cvc)
        
})