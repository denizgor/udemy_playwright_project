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

    click_back_to_shopping_button = async () => {
        await this.click_element(this.BACK_TO_SHOPPING_BUTTON)
    }
    
}