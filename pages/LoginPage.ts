import { BaseFunctions } from "../base/base_functions"
import { Page } from "@playwright/test"
import { RegisterPage } from "./RegisterPage.ts"
import { DeliveryPage } from "./DeliveryPage.ts"

export class LoginPage extends BaseFunctions {
    constructor(page: Page){
        super (page)
    }

    //LOCATORS
    EMAIL_FIELD = this.page.getByPlaceholder('E-mail')
    PASSWORD_FIELD = this.page.getByPlaceholder('Password')
    LOGIN_BUTTON = this.page.getByRole('button', { name: 'Login' })
    REGISTER_BUTTON = this.page.locator('[data-qa="go-to-signup-button"]')

    //METHODS    
    click_register_button = async () => {
        await this.click_element(this.REGISTER_BUTTON)
        return new RegisterPage(this.page)
    }

    enter_email = async (email: string) => {
        await this.input_text(this.EMAIL_FIELD, email)
    }

    enter_password = async (password: string) => {
        await this.input_text(this.PASSWORD_FIELD, password)
    }

    click_login_button = async () => {
        await this.click_element(this.LOGIN_BUTTON)
        return new DeliveryPage(this.page)
    }
    
}