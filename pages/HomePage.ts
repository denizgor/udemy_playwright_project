import { Page } from "@playwright/test";
import { BaseFunctions } from "../base/base_functions.ts"
import { BasketPage } from "./BasketPage.ts"
import { LoginPage } from "./LoginPage.ts";


export class HomePage extends BaseFunctions {
    constructor(page: Page){
        super (page)
    }
    
    //LOCATORS
    ADD_PRODUCT_BUTTON = this.page.locator('[data-qa="product-button"]')
    CART_COUNTER = this.page.locator('[data-qa="header-basket-count"]')
    CHECKOUT_BUTTON = this.page.getByRole('link', { name: 'Checkout' })
    MY_ACCOUNT_BUTTON = this.page.getByRole('link', { name: 'My Account' })
    ART_BUTTON = this.page.getByRole('link', { name: 'Art' })
    

    //METHODS
     add_product_to_basket = async (index: number = 0) => {
        await this.click_element(this.ADD_PRODUCT_BUTTON, index)
    }

    get_basket_count = async () => {
       return await this.get_cart_count(this.CART_COUNTER)
    }

    go_to_basket = async () => {
        await this.click_element(this.CHECKOUT_BUTTON)
        return new BasketPage(this.page)
    }

    go_to_my_account = async () => {
        await this.click_element(this.MY_ACCOUNT_BUTTON)
        return new LoginPage(this.page)
    }

    go_to_art = async () => {
        await this.click_element(this.ART_BUTTON)
    }

}