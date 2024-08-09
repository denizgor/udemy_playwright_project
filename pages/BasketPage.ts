import { BaseFunctions } from "../base/base_functions"
import { Page } from "@playwright/test"
import { LoginPage } from "./LoginPage.ts"

export class BasketPage extends BaseFunctions {
constructor(page: Page){
    super(page)
    }

    //LOCATORS
    ITEM_PRICES = this.page.locator('[data-qa="basket-item-price"]')
    REMOVE_ITEM_BUTTON = this.page.locator('[data-qa="basket-card-remove-item"]')
    CONTINUE_TO_CHECKOUT_BUTTON = this.page.locator('[data-qa="continue-to-checkout"]')


    //METHODS
    check_basket_page_url = async (url: string) => {
        await this.check_page_url(url)
    }

    remove_item_with_lowest_price = async (index = 0) => {
        const min_index = await this.findMinPriceIndex(this.ITEM_PRICES)
        await this.click_element(this.REMOVE_ITEM_BUTTON, min_index)
    }

    continue_to_checkout = async () => {
        await this.click_element(this.CONTINUE_TO_CHECKOUT_BUTTON)
        return new LoginPage(this.page)
    }



}

