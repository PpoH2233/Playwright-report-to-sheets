import {expect} from '@playwright/test';
import {test} from '../pages/base';
import { ADDRGETNETWORKPARAMS } from 'dns';

test.beforeEach(async ({productPage}) => {
    await productPage.gotoWithValidUser();
});

test('Adding all available products to the cart and then removing them, verifying that the cart updates correctly', async ({productPage}) => {
   test.info().annotations.push({
         type: 'testId',
         description: 'TC-7'
    });

    await productPage.clickAllAddToCartButtons();
   expect( await productPage.isTextFromAllAddToCartButton('Remove')).toBe(true);
   //click all "Remove" buttons
    await productPage.clickAllAddToCartButtons();
    expect( await productPage.isTextFromAllAddToCartButton('Add to cart')).toBe(true);
   
});

test('Product should correctly sorts items from A to Z', async ({productPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-8'
    });

    await productPage.clickSortDropdown();
    await productPage.selectSortOption('az');
    expect(await productPage.isProductsSortedA_Z()).toBe(true);

});

test('Product should correctly sorts items from Z to A', async ({productPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-9'
    });

    await productPage.clickSortDropdown();
    await productPage.selectSortOption('za');
    expect(await productPage.isProductsSortedZ_A()).toBe(true);
});

test('Product should correctly sorts items from low to high', async ({productPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-10'
    });

    await productPage.clickSortDropdown();
    await productPage.selectSortOption('lohi');
    expect(await productPage.isProductsSortedLowToHigh()).toBe(true);
});

test('Product should correctly sorts items from high to low', async ({productPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-11'
    });

    await productPage.clickSortDropdown();
    await productPage.selectSortOption('hilo');
    expect(await productPage.isProductsSortedHighToLow()).toBe(true);
});

test('Should navigate to the cart page when clicking the cart icon', async ({productPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-12'
    });

    expect(await productPage.ClickCartIcon(2)).toBe(true);
});

