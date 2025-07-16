const { Builder, By} = require('selenium-webdriver')
const { expect } = require('chai');
const { selectOptionByText } = require('../../utils/dropdownUtils');

describe.only('Dropdown validation test', function () {
    /** @type {import('selenium-webdriver').WebDriver} */
    let driver;
    this.timeout(20000);

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://the-internet.herokuapp.com/dropdown');
    });

    after(async () => {
        await driver.quit();
    });

    it('Should select an option dynamically and validate it', async () => {
        await selectOptionByText(driver, 'dropdown', 'Option 2');
        const dropdown = await driver.findElement(By.id('dropdown'));
        const selected = await dropdown.findElement(By.css('option:checked'));
        /**
         * Selenium no necesita que aparezca :checked en el DOM. Internamente, el navegador sabe cuál opción está seleccionada y Selenium puede acceder a eso con:
         */
        expect(await selected.getText()).to.equal('Option 2')
    })
})