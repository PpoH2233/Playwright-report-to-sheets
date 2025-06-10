import { Page } from '@playwright/test';

export class LoginPage {
    /**
     * 
     * @param {Page} page 
    */

    constructor(page) {
        this.page = page;
    }    
   
   
    baseUrl = 'https://www.saucedemo.com/';
    locatorUsername = '#user-name';
    locatorPassword = '#password';
    locatorLoginButton = '#login-button';
    locatorErrorMessage = '[data-test="error"]';

    async goto() {
        await this.page.goto(this.baseUrl);
    }

    async fillUserPassword(username, password){
        await this.page.locator(this.locatorUsername).fill(username);
        await this.page.locator(this.locatorPassword).fill(password);
    }
    
    async clickLoginButton(){
        await this.page.click(this.locatorLoginButton);
    }

    async getUsername(){
        return await this.page.locator(this.locatorUsername).inputValue();
    }

    async getPassword(){
        return await this.page.locator(this.locatorPassword).inputValue();
    }

    async getErrorMessage() {
        try {
            return await this.page.locator(this.locatorErrorMessage).textContent() || '';
        } catch (error) {
            return '';
        }
    }

    async isValidUrl() {
        const currentUrl = this.page.url();
        return currentUrl === this.baseUrl;
    }    

    
}