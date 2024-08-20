import { BaseFunctions } from "../base/base_functions";
import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class RegisterPage extends BaseFunctions {
    constructor(page: Page){
        super (page)
    }

    //LOCATORS
    LOGIN_BUTTON = this.page.getByRole('button', { name: 'Login' })
    REGISTER_BUTTON = this.page.getByRole('button', { name: 'Register' })
    EMAIL_FIELD = this.page.getByPlaceholder('E-mail')
    PASSWORD_FIELD = this.page.getByPlaceholder('Password')


    //METHODS

    enter_email = async (email: string) => {
        await this.input_text(this.EMAIL_FIELD, email)
    }

    enter_password = async (password: string) => {
        await this.input_text(this.PASSWORD_FIELD, password)
    }

    click_register_button = async () => {
        await this.click_element(this.REGISTER_BUTTON)
        return new HomePage(this.page)
    }

}