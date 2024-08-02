import {Page, Locator} from "@playwright/test";

export class BaseFunctions{
    page: Page;
    constructor (page: Page) {
        this.page = page;
    }

/**
+ * Clicks on an element located by the given locator.
+ *
+ * @param {string} locator - The locator used to find the element.
+ * @param {number} [index=0] - The index of the element to click.
+ * @return {Promise<void>} A promise that resolves when the element is clicked.
+ */
    click_element = async (locator: Locator, index: number = 0) => {
        await locator.nth(index).waitFor();
        await locator.nth(index).click();
    }

    get_cart_count = async (locator) => {
        await locator.waitFor();
        const text = await locator.textContent();
        return parseInt(text, 10);
    }

    check_page_url = async (url: string) => {
        await this.page.url().includes(url);
    }

}