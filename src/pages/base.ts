import {test as base } from '@playwright/test';
import { LoginPage } from './login.page';

type BaseFixtures = {
    // Define any base fixtures here
    loginPage : LoginPage
};

export const test = base.extend<BaseFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

