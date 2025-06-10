import {expect} from '@playwright/test';
import {test} from '../pages/base'
import { validUser } from '../test-data/user';

// login page  
test.beforeEach(async ({loginPage}) => {
    await loginPage.goto();
});

test('Input fields should display as the data that was filled', async ({loginPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-1'
    });
    
    const username = 'testuser';
    const password = 'testpassword';

    await loginPage.fillUserPassword(username, password);
    
    expect(await loginPage.getUsername()).toBe(username);
    expect(await loginPage.getPassword()).toBe(password);
});


test('Should show an error message if log in without a username', async ({loginPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-2'
    });
    
    const password = 'testpassword';

    await loginPage.fillUserPassword('', password);
    await loginPage.clickLoginButton();
    
    expect(await loginPage.isValidUrl()).toBe(true);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username is required');
});


test('Should show an error message if log in without a password', async ({loginPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-3'
    });
    
    const username = 'test-username';

    await loginPage.fillUserPassword(username, '');
    await loginPage.clickLoginButton();
    
    expect(await loginPage.isValidUrl()).toBe(true);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Password is required');
});

test('Should show an error message if log in with both fields blank', async ({loginPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-4'
    });

    await loginPage.fillUserPassword('', '');
    await loginPage.clickLoginButton();
    
    expect(await loginPage.isValidUrl()).toBe(true);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username is required');
});

test('Should logged in successfully with valid credentials', async ({loginPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-5'
    });
    for (const user of validUser) {
        await loginPage.fillUserPassword(user.username, user.password);
        await loginPage.clickLoginButton();
        
        expect(await loginPage.isValidUrl()).toBe(false);
        
        // Go back to login page for next iteration
        await loginPage.goto();
    }
});


test('Should logged in fails with an error message when using invalid credentials', async ({loginPage}) => {
    test.info().annotations.push({
        type: 'testId',
        description: 'TC-6'
    });
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_password';

    await loginPage.fillUserPassword(invalidUsername, invalidPassword);
    await loginPage.clickLoginButton();
    
    expect(await loginPage.isValidUrl()).toBe(true);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
});