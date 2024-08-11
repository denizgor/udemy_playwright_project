import { BaseFunctions } from "../base/base_functions"
import { Page } from "@playwright/test"


export class ConfirmationPage extends BaseFunctions {
    constructor(page: Page){
        super(page)
    }

    //LOCATORS
    THANK_YOU_TEXT = this.page.getByRole('heading')
    BACK_TO_SHOPPING_BUTTON = this.page.getByRole('button', { name: 'Back to shop' })


    //METHODS
    check_confirmation_page_url = async (url: string) => {
        await this.check_page_url(url)
    }
}