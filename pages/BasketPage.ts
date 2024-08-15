import { BaseFunctions } from "../base/base_functions"
import { Page } from "@playwright/test"
import { LoginPage } from "./LoginPage.ts"
import { DeliveryPage } from "./DeliveryPage.ts"

export class BasketPage extends BaseFunctions {
constructor(page: Page){
    super(page)
    }

    //LOCATORS
    ITEM_PRICES = this.page.locator('[data-qa="basket-item-price"]')
    REMOVE_ITEM_BUTTON = this.page.locator('[data-qa="basket-card-remove-item"]')
    CONTINUE_TO_CHECKOUT_BUTTON = this.page.locator('[data-qa="continue-to-checkout"]')
    //CONTINUE_TO_CHECKOUT_BUTTON = this.page.getByRole('link', { name: 'Continue to Checkout' })


    //METHODS
    remove_item_with_lowest_price = async (index = 0) => {
        const min_index = await this.findMinPriceIndex(this.ITEM_PRICES)
        await this.click_element(this.REMOVE_ITEM_BUTTON, min_index)
    }

    continue_to_checkout = async () => {
        await this.click_element(this.CONTINUE_TO_CHECKOUT_BUTTON)
        return new LoginPage(this.page), new DeliveryPage(this.page)
    }



}

