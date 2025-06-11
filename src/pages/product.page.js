import {Page} from '@playwright/test';
import { LoginPage } from './login.page';
import { validUser } from '../test-data/user';
import { get } from 'http';

export class ProductPage {
    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        this.page = page;
    }

    baseUrl = 'https://www.saucedemo.com/inventory.html';

    locatorAddToCartButtons = '.btn_small';

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
    
}