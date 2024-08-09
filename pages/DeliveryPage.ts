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
    
    
    //METHODS
    check_delivery_page_url = async (url: string) => {
        await this.check_page_url(url)
    }

    fill_delivery_address = async () => {
        await this.click_element(this.DELIVERY_ADDRESS)
    }

    click_continue_to_payment_button = async () => {
        await this.click_element(this.CONTINUE_TO_PAYMENT_BUTTON)
        return new PaymentPage(this.page)
    }
}