import {Page, Locator} from "@playwright/test"

export class BaseFunctions{
    page: Page
    constructor (page: Page) {
        this.page = page
    }

/**
+ * Clicks on an element located by the given locator.
+ *
+ * @param {string} locator - The locator used to find the element.
+ * @param {number} [index=0] - The index of the element to click.
+ * @return {Promise<void>} A promise that resolves when the element is clicked.
+ */
    click_element = async (locator: Locator, index: number = 0) => {
        await locator.nth(index).waitFor({ state: 'visible' })
        await locator.nth(index).click()
        await this.page.waitForTimeout(500)
    }


    /**
     * Retrieves the text content of the cart count element and returns it as integer.
     *
     * @param {Locator} locator - The locator used to find the element.
     * @return {Promise<number>} A promise that resolves with the text content of the element.
     */

    get_cart_count = async (locator) => {
        await locator.waitFor()
        const text = await locator.textContent();
        return parseInt(text, 10)
    }

    /**
     * Retrieves an array of prices from the elements located by the given locator.
     *
     * @param {Locator} locator - The locator used to find the elements containing prices.
     * @return {Promise<number[]>} A promise that resolves with an array of prices.
     */
    async getPrices(locator: Locator): Promise<number[]> {
        const priceStrings = await locator.allTextContents()
        const prices = priceStrings.map(priceStr => {
            return parseFloat(priceStr.replace(/[^0-9.-]+/g, ""))
        });
        return prices
    }

    /**
     * Finds the index of the minimum price in a list of prices.
     *
     * @param {Locator} locator - The locator used to find the elements containing prices.
     * @return {Promise<number>} A promise that resolves with the index of the minimum price.
     */
    async findMinPriceIndex(locator: Locator): Promise<number> {
        const prices = await this.getPrices(locator)
        return prices.reduce((minIndex, price, index, array) => 
            price < array[minIndex] ? index : minIndex, 0
        )
    }

    /**
     * Enters the given text into the input field located by the given locator.
     *
     * @param {Locator} locator - The locator used to find the input field.
     * @param {string} text - The text to be entered into the input field.
     * @return {Promise<void>} A promise that resolves when the text has been entered.
     */
    async input_text(locator: Locator, text: string) {
        await locator.waitFor()
        await locator.fill(text)
        await this.page.waitForTimeout(500)
    }

}