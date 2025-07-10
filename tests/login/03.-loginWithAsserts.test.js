const { Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');
const { expect } = require('chai');

describe('Full assertion test using Chai and Node.js assert', function () {
    /** @type {import('selenium-webdriver').WebDriver} */
    let driver;

    this.timeout(20000);

    before(async () =>{
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://the-internet.herokuapp.com/login');
    });


    after(async () => {
        await driver.quit();
    })

    it('should cover a wide range of assertion types', async () => {
        // INPUTS
        let username = await driver.findElement(By.name('username'));
        let password = await driver.findElement(By.name('password'));

        await username.clear();
        await password.clear();

        await username.sendKeys('invalid_user');
        await password.sendKeys('12345');

        //Submit
        const loginButton = await driver.findElement(By.css('button[type="submit"]'));
        await loginButton.click();

        //Explicit Wait & get message
        await driver.wait(until.elementLocated(By.id('flash')), 5000);
        const flash = await driver.findElement(By.id('flash'));
        const flashText = await flash.getText();


        // ✅ Chai assertions


        expect(await flash.isDisplayed()).to.be.true;
        expect(flashText).to.include('Your username is invalid');
        expect(flashText).to.not.equal('Welcome');
        expect(flashText.length).to.be.greaterThan(10);
        expect(flashText).to.be.a('string');
        expect(username).to.exist;
        expect(password).to.exist;


        //Despues del click de login el DOM se actualiza y por eso re asignamos username y password
        username = await driver.findElement(By.name('username'));
        password = await driver.findElement(By.name('password'));
        const tagName = await username.getTagName();
        expect(tagName).to.be.equal('input');

        const typeAttr = await password.getAttribute('type');
        expect(typeAttr).to.be.equal('password');


        const fakeValue = null;
        const undefinedVar = undefined;
        expect(fakeValue).to.be.null;
        expect(undefinedVar).to.be.undefined;

        const fakeArray = ['login', 'test'];
        expect(fakeArray).to.have.lengthOf(2);
        expect(fakeArray).to.deep.equal(['login','test']);
        expect(fakeArray).to.include('test');


        // ✅ NodeJS ASSERTS

        const tittle = await driver.getTitle();
        assert.strictEqual(tittle, 'The Internet');

        assert.ok(await flash.isDisplayed());
        assert.notStrictEqual(flashText, 'Success');
        assert.deepStrictEqual([1,2],[1,2]);//deep comparison
        assert.strictEqual(typeof flashText, 'string');


    })
})