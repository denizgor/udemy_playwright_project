import { BaseFunctions } from "../base/base_functions"
import { Page } from "@playwright/test"
import { PaymentPage } from "./PaymentPage.ts"


export class DeliveryPage extends BaseFunctions {
    constructor(page: Page){
        super(page)
    }

    //LOCATORS
    DELIVERY_ADDRESS = this.page.locator('[data-qa="saved-address-container"]')
    CONTINUE_TO_PAYMENT_BUTTON = this.page.locator('[data-qa="continue-to-payment-button"]')
    FIRST_NAME_FIELD = this.page.locator('[data-qa="delivery-first-name"]')
    LAST_NAME_FIELD = this.page.locator('[data-qa="delivery-last-name"]')
    STREET_FIELD = this.page.locator('[data-qa="delivery-address-street"]')
    POSTCODE_FIELD = this.page.locator('[data-qa="delivery-postcode"]')
    CITY_FIELD = this.page.locator('[data-qa="delivery-city"]')
    COUNTRY_FIELD = this.page.locator('[data-qa="country-dropdown"]')
    SAVE_ADDRESS_BUTTON = this.page.locator('[data-qa="save-address-button"]')
    SAVED_FIRST_NAME = this.page.locator('[data-qa="saved-address-firstName"]')
    SAVED_LAST_NAME = this.page.locator('[data-qa="saved-address-lastName"]')
    SAVED_STREET = this.page.locator('[data-qa="saved-address-street"]')
    SAVED_POSTCODE = this.page.locator('[data-qa="saved-address-postcode"]')
    SAVED_CITY = this.page.locator('[data-qa="saved-address-city"]')
    SAVED_COUNTRY = this.page.locator('[data-qa="saved-address-country"]')
    
    //METHODS
    fill_delivery_address = async () => {
        await this.click_element(this.DELIVERY_ADDRESS)
    }

    click_continue_to_payment_button = async () => {
        await this.click_element(this.CONTINUE_TO_PAYMENT_BUTTON)
        return new PaymentPage(this.page)
    }

    enter_first_name = async (firstName: string) => {
        await this.input_text(this.FIRST_NAME_FIELD, firstName)
    }

    enter_last_name = async (lastName: string) => {
        await this.input_text(this.LAST_NAME_FIELD, lastName)
    }

    enter_street = async (street: string) => {
        await this.input_text(this.STREET_FIELD, street)
    }

    enter_postcode = async (postcode: string) => {
        await this.input_text(this.POSTCODE_FIELD, postcode)
    }

    enter_city = async (city: string) => {
        await this.input_text(this.CITY_FIELD, city)
    }

    enter_country = async (country: string) => {
        await this.COUNTRY_FIELD.selectOption(country)
    }

    click_save_address_button = async () => {
        await this.click_element(this.SAVE_ADDRESS_BUTTON)
    }

    get_saved_address_texts = async () => {
        const firstName = await this.SAVED_FIRST_NAME.textContent()
        const lastName = await this.SAVED_LAST_NAME.textContent()
        const street = await this.SAVED_STREET.textContent()
        const postcode = await this.SAVED_POSTCODE.textContent()
        const city = await this.SAVED_CITY.textContent()
        const country = await this.SAVED_COUNTRY.textContent()
        return {firstName, lastName, street, postcode, city, country}
    }

}