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
   
}