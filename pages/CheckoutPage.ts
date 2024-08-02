import { BaseFunctions } from "../base/base_functions";
import { Page } from "@playwright/test";

export class CheckoutPage extends BaseFunctions {
constructor(page: Page){
    super(page)
    }

    check_basket_page_url = async (url: string) => {
        await this.check_page_url(url);
    }



}

