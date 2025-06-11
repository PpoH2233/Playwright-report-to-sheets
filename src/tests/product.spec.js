import {expect} from '@playwright/test';
import {test} from '../pages/base';

test.beforeEach(async ({productPage}) => {
    await productPage.gotoWithValidUser();
    expect(await productPage.isValidUrl()).toBe(true);
});

test.only('Adding all available products to the cart and then removing them, verifying that the cart updates correctly', async ({productPage}) => {
    console.log('Starting test: Adding and removing products from the cart');
});


