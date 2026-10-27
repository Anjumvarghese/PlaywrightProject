const {test, expect} = require('@playwright/test');

const POManager=require('../pages/POManager');
const testData =require('../utils/TestData.json')

test('1. Sign Up -> Enter Data -> Click Sign Up',async({page})=>{
    const poManager=new POManager(page)
    const signup=poManager.getSignupPage()
    await signup.goto();
    const data = testData.signup[0];
    const message = await signup.validSignUp(data.username+Date.now(),data.password);
    expect(message).toBe(data.expectedMessage);
})

test('2. Sign Up -> Enter Data -> Click Close', async({page})=>{
    const poManager=new POManager(page)
    const signup=poManager.getSignupPage()
    await signup.goto();
    const data = testData.signup[1];
    const message=await signup.invalidSignUp(data.username, data.password);
    expect(message).toBe(data.expectedMessage);
    await expect(page.locator('#signInModal')).toBeHidden();
});

test('3. Login with valid credentials', async({page})=>{
    const poManager=new POManager(page)
    const login=poManager.getLoginPage()
    await login.goto();
    await login.login(testData.validUser.username, testData.validUser.password);  
});

test('4. Login with invalid username and valid password', async({page}) =>{
    const poManager=new POManager(page)
    const login=poManager.getLoginPage()
    await login.goto();
    const alertBox= page.waitForEvent('dialog');
    await login.login(testData.invalidUser.username, testData.invalidUser.password);  
    const alert= await alertBox;
    expect(alert.message()).toBe('User does not exist.');
    await alert.accept();
});

test('5. Login with valid username and invalid password ', async({page})=>{
    const poManager=new POManager(page)
    const login=poManager.getLoginPage()
    await login.goto();
    const alertBox= page.waitForEvent('dialog');
    await login.login(testData.invalidPassword.username, testData.invalidPassword.password);  
    const alert= await alertBox;
    expect(alert.message()).toBe('Wrong password.');
    await alert.accept();
});

test('6. Login with invalid username and invalid password ', async({page})=>{
    const poManager=new POManager(page)
    const login=poManager.getLoginPage()
    await login.goto();
    const alertBox= page.waitForEvent('dialog');
    await login.login(testData.invalidBoth.username, testData.invalidBoth.password);  
    const alert= await alertBox;
    expect(alert.message()).toBe('User does not exist.');
    await alert.accept();
});

test('7. Login with valid credentials and add a product to cart', async({page})=>{
    const poManager = new POManager(page);
    const login = poManager.getLoginPage();
    const product = poManager.getProduct();
    await login.goto();
    await login.login(testData.validUser.username,testData.validUser.password);
    await product.addProduct();
    const message=await product.addCart()
    expect(message).toBe('Product added.')
});

test('8. Login with valid credentials -> Select a product under Phones-> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase', async({page})=>{
    const poManager = new POManager(page);
    const login = poManager.getLoginPage();
    const product = poManager.getProduct();
    const checkout=poManager.getCheckout();
    await login.goto();
    await login.login(testData.validUser.username,testData.validUser.password);
    await product.addPhone();
    const message=await product.addCart();
    expect(message).toBe('Product added.');
    await product.clickCart();
    await checkout.purchaseProduct(testData.name,testData.country,testData.city,testData.creditcard,testData.month,testData.year)
    await expect(page.getByText('Thank you for your purchase!')).toBeVisible();
});

test('9. Login with valid credentials -> Select a product under Monitors-> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase', async({page})=>{
    const poManager = new POManager(page);
    const login = poManager.getLoginPage();
    const product = poManager.getProduct();
    const checkout=poManager.getCheckout();
    await login.goto();
    await login.login(testData.validUser.username,testData.validUser.password);
    await product.addMonitor();
    const message=await product.addCart();
    expect(message).toBe('Product added.');
    await product.clickCart();
    await checkout.purchaseProduct(testData.name,testData.country,testData.city,testData.creditcard,testData.month,testData.year)
    await expect(page.getByText('Thank you for your purchase!')).toBeVisible();
});

test('10. Login with valid credentials -> Logout', async({page})=>{
    const poManager=new POManager(page)
    const login=poManager.getLoginPage()
    const logout=poManager.getLogout()
    await login.goto();
    await login.login(testData.validUser.username, testData.validUser.password); 
    await logout.logoutApp(); 
});
