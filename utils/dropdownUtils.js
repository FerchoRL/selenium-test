/**
 * Selects an option from a dropdown by visible text
 * @param {WebDriver} driver
 * @param {string} selectId
 * @param {string} textToSelect
 */

const {By} = require('selenium-webdriver')
async function selectOptionByText(driver, selectId, textToSelect){
    const select = await driver.findElement(By.id(selectId));
    const options = await select.findElements(By.css('option'));

    for (let option of options){
        const text = await option.getText();
        if(text.trim() === textToSelect){
            await option.click();
            return;
        }
    }

    throw new Error(`Option "${textToSelect}" not found in dropdown`);
}

module.exports = { selectOptionByText };

