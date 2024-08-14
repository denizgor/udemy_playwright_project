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
    SAVE_ADDRESS_BUTTON = this.page.locator('[data-qa="save-address-button"]')
    
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

    click_save_address_button = async () => {
        await this.click_element(this.SAVE_ADDRESS_BUTTON)
    }

}