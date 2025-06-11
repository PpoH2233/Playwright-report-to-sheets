import {expect} from '@playwright/test';
import {test} from '../pages/base';

test.beforeEach(async ({productPage}) => {
    await productPage.gotoWithValidUser();
});

test.only('Adding all available products to the cart and then removing them, verifying that the cart updates correctly', async ({productPage}) => {
   await productPage.clickAllAddToCartButtons();
   expect( await productPage.isTextFromAllAddToCartButton('Remove')).toBe(true);
   //click all "Remove" buttons
    await productPage.clickAllAddToCartButtons();
    expect( await productPage.isTextFromAllAddToCartButton('Add to cart')).toBe(true);
   
});

test('Product should correctly sorts items from A to Z', async ({productPage}) => {
});

test('Product should correctly sorts items from Z to A', async ({productPage}) => {
});

test('Product should correctly sorts items from low to high', async ({productPage}) => {
});

test('Product should correctly sorts items from high to low', async ({productPage}) => {
});

test('Should navigate to the cart page when clicking the cart icon', async ({productPage}) => {

});

