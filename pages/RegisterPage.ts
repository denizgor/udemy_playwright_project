import { BaseFunctions } from "../base/base_functions";
import { Page } from "@playwright/test";

export class RegisterPage extends BaseFunctions {
    constructor(page: Page){
        super (page)
    }

    //LOCATORS
    LOGIN_BUTTON = this.page.getByRole('button', { name: 'Login' })
    REGISTER_BUTTON = this.page.locator('[data-qa="go-to-signup-button"]')


    //METHODS

    check_register_page_url = async (url: string) => {
        await this.check_page_url(url)
    }

    

}