import {Page} from '@playwright/test';
import { LoginPage } from './login.page';
import { validUser } from '../test-data/user';

export class ProductPage {
    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        this.page = page;
    }

    baseUrl = 'https://www.saucedemo.com/inventory.html';

    containBaseUrlCartPage = 'https://www.saucedemo.com/inventory-item.html?id=';

    locatorAddToCartButtons = '.btn_small';
    locatorSortDropdown = '.product_sort_container';
    locatorNameProducts = '.inventory_item_name';;
    locatorPriceProducts = '.inventory_item_price';
    locatorCartIcon = '.inventory_item_img';
    

    async gotoWithValidUser() {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        
        let usernameValid = validUser[0].username;
        let passwordValid = validUser[0].password;
        
        await loginPage.fillUserPassword(usernameValid, passwordValid);
        await loginPage.clickLoginButton();
    }

    async isValidUrl() {
        const currentUrl = this.page.url();
        return currentUrl == this.baseUrl;
    }

    async getListOfAddToCartButtons() {
        return await this.page.locator(this.locatorAddToCartButtons).all(); // returns an array of locators
    }

    async clickAddToCartButton(buttonLocator) { // like '.btn_small.nth(1)'
        await buttonLocator.click();
    }

    async getTextFromAddToCartButton(button) {
        return await button.textContent();
    }

    async isTextFromAllAddToCartButton(text) {
        const buttons = await this.getListOfAddToCartButtons();
        for (const button of buttons) {
            const buttonText = await this.getTextFromAddToCartButton(button);
            if (buttonText !== text) {
                return false;
            }
        }
        return true;
    }

    async clickAllAddToCartButtons() {
        const buttons = await this.getListOfAddToCartButtons();
        for (const button of buttons) {
            await this.clickAddToCartButton(button);
        }
    }

    async clickSortDropdown() {
        await this.page.locator(this.locatorSortDropdown).click();
    }

    async selectSortOption(option) {
        await this.page.locator(this.locatorSortDropdown).selectOption(option);
    }

    // Sort A to Z 
    async convertSnallLetterToNumber(letter) {
        return letter.charCodeAt(0) - 96; // 'a' is 1, 'b' is 2, ..., 'z' is 26
    }

    async isProductsSortedA_Z() {
        const products = await this.page.locator(this.locatorNameProducts).allTextContents();
        const StartLetter = products.map(product => product.charAt(0).toLowerCase());
        const NumberLetter_A =  await this.convertSnallLetterToNumber('a');
        let lowestLetter = NumberLetter_A;

        for (let letter of StartLetter) {
            const currentLetterNumber = await this.convertSnallLetterToNumber(letter);
            if (currentLetterNumber < lowestLetter) {
                return false; 
            }
            lowestLetter = currentLetterNumber; 
        }

        return true;
     }

    async isProductsSortedZ_A() {
        const products = await this.page.locator(this.locatorNameProducts).allTextContents();
        const StartLetter = products.map(product => product.charAt(0).toLowerCase());
        const NumberLetter_Z =  await this.convertSnallLetterToNumber('z');
        let highestLetter = NumberLetter_Z;

        for (let letter of StartLetter) {
            const currentLetterNumber = await this.convertSnallLetterToNumber(letter);
            if (currentLetterNumber > highestLetter) {
                return false; 
            }
            highestLetter = currentLetterNumber; 
        }

        return true;
     }

    async isProductsSortedLowToHigh() {
        const priceOfProducts = await this.page.locator(this.locatorPriceProducts).allTextContents();
        const prices = priceOfProducts.map(price => parseFloat(price.replace('$', '')));
        let lowestPrice = prices[0];
        for (let price of prices) {
            if (isNaN(price)) {
                console.error(`Invalid price found: ${price}`);
                return false; // If any price is not a number, return false
            }
            if (price < lowestPrice) {
                console.error(`Price out of order: ${price} < ${lowestPrice}`);
                return false; 
            }
            lowestPrice = price; 
        }
        
        return true;
    }

    async isProductsSortedHighToLow() {
        const priceOfProducts = await this.page.locator(this.locatorPriceProducts).allTextContents();
        const prices = priceOfProducts.map(price => parseFloat(price.replace('$', '')));
        let highestPrice = prices[0];
        for (let price of prices) {
            if (isNaN(price)) {
                return false; // If any price is not a number, return false
            }
            if (price > highestPrice) {
                return false; 
            }
            highestPrice = price; 
        }
        
        return true;
    }

    async ClickCartIcon(indexCartIcon = 0) {
        const cartIcons = this.page.locator(this.locatorCartIcon);
        await cartIcons.nth(indexCartIcon).click();
        
        const currentUrl = await this.page.url();
        return currentUrl.includes(this.containBaseUrlCartPage);
}

    
}