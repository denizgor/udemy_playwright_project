import { BaseFunctions } from "../base/base_functions"
import { Page } from "@playwright/test"


export class PaymentPage extends BaseFunctions {
    constructor(page: Page){
        super(page)
    }

    //LOCATORS
    CARD_OWNER_FIELD = this.page.locator('[data-qa="credit-card-owner"]')
    CARD_NUMBER_FIELD = this.page.locator('[data-qa="credit-card-number"]')
    CARD_EXPIRY_FIELD = this.page.locator('[data-qa="valid-until"]')
    CARD_CVC_FIELD = this.page.locator('[data-qa="credit-card-cvc"]')
    PAYMENT_BUTTON = this.page.locator('[data-qa="pay-button"]')
    DISCOUNT_CODE_FIELD = this.page.locator('[data-qa="discount-code"]')
    SUBMIT_DISCOUNT_BUTTON = this.page.locator('[submit-discount-button]')


    //METHODS
    check_payment_page_url = async (url: string) => {
        await this.check_page_url(url)
    }

    enter_card_owner = async (card_owner: string) => {
        await this.input_text(this.CARD_OWNER_FIELD, card_owner)
    }

    enter_card_number = async (card_number: string) => {
        await this.input_text(this.CARD_NUMBER_FIELD, card_number)
    }
    
    enter_card_expiry = async (card_expiry: string) => {
        await this.input_text(this.CARD_EXPIRY_FIELD, card_expiry)
    }

    enter_card_cvc = async (card_cvc: string) => {
        await this.input_text(this.CARD_CVC_FIELD, card_cvc)
    }

    enter_discount_code = async (discount_code: string) => {
        await this.input_text(this.DISCOUNT_CODE_FIELD, discount_code)
    }

    apply_discount = async () => {
        await this.click_element(this.SUBMIT_DISCOUNT_BUTTON)
    }

    click_payment_button = async () => {
        await this.click_element(this.PAYMENT_BUTTON)
    }
}