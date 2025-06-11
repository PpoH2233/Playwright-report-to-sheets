import {test as base } from '@playwright/test';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';

type BaseFixtures = {
    // Define any base fixtures here
    loginPage : LoginPage
    productPage: ProductPage;
};

export const test = base.extend<BaseFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    }
});

