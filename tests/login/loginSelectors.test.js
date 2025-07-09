
const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');


describe('Selector practice with Selenium WebDriver', function () {
    //Linea de codigo para reconocer el tipado del driver
    /** @type {import('selenium-webdriver').WebDriver} */

    let driver;

    // Aumenta el timeout de Mocha para entornos lentos
    this.timeout(20000);

    before(async () => {
        //🔧 Crea una nueva instancia del navegador Chrome
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://the-internet.herokuapp.com/login');
    });

    // Este bloque se ejecuta una vez después de que todos los tests han terminado
    after(async () => {
        //Cierra el navegador
        await driver.quit();
    });

    it('should locate elements using different selectors', async () => {
        // By.id - login form
        const formLogin = await driver.findElement(By.id('login'));
        expect(await formLogin.isDisplayed()).to.be.true;

        //By Name - Username input
        const usernameInput = await driver.findElement(By.name('username'));
        expect(await usernameInput.isDisplayed()).to.be.true;

        //By ClassName - heading container
        const heading = await driver.findElement(By.className('example'));
        const headingText = await heading.getText();
        expect(headingText).to.include('Login Page');


        //By CSS - Password input
        const passwordInput = await driver.findElement(By.css('input[type="password"]'));
        expect(await passwordInput.isEnabled()).to.be.true;

        //By.xpath - Label for username
        const label = await driver.findElement(By.xpath('//label[@for="username"]'));
        expect(await label.getText()).to.equal('Username');
    });
})