const { Builder, By, until} = require('selenium-webdriver');
const { expect } = require('chai');

describe('Login Actions test', function (){
    /** @type {import('selenium-webdriver').WebDriver} */
    let driver;

    // Aumenta el timeout de Mocha para entornos lentos
    this.timeout(20000);

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://the-internet.herokuapp.com/login');
    });

    after(async() => {
        await driver.quit();
    });

    it('should perform full login interaction with all major actions', async () => {
        //Get and assert the page title
        const title = await driver.getTitle();
        expect(title).to.equal('The Internet');

        //Clear and fill username input
        const username = await driver.findElement(By.name('username'));
        await username.clear();
        await username.sendKeys('wrongUser');

        //Clear and fill password input
        const password = await driver.findElement(By.name('password'));
        await password.clear();
        await password.sendKeys('12345');

        //Validate password input is of type password
        const typeAttr = await password.getAttribute('type');
        expect(typeAttr).to.equal('password');

        //click login button
        const loginButton = await driver.findElement(By.css('button[type="submit"]'));
        await loginButton.click();


        //Wait for and get error message
        // Espera a que aparezca el mensaje
        await driver.wait(until.elementsLocated((By.id('flash'))),5000);
        //Obtiene el mensaje
        const errorMessage = await driver.findElement(By.id('flash'));
        const errorText = await errorMessage.getText();

        //Validate the error is shown and includes expected content
        expect(await errorMessage.isDisplayed()).to.be.true;
        expect(errorText).to.include('Your username is invalid');

        // await driver.sleep(5000); // espera 5 segundos


        //Refresh the page
        await driver.navigate().refresh();

        //Make sure fields are reset 
        const usernameIsEmpty = await driver.findElement(By.name('username'));
        const usernameValue = await usernameIsEmpty.getAttribute('value');
        expect(usernameValue).to.equal('');
    })
})