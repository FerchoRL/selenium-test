# 🧪 Proyecto de Automatización con Selenium + JavaScript

Este proyecto utiliza **Selenium WebDriver** con **JavaScript (Node.js)** para automatizar pruebas de UI.  
Se estructura siguiendo el patrón **Page Object Model (POM)** para facilitar la escalabilidad, mantenimiento y reutilización de código.

---

## 📁 Estructura del proyecto

```
selenium-js-project/
├── pages/ # Objetos de página (POM)
├── tests/ # Casos de prueba (smoke, regression, e2e)
├── utils/ # Utilidades (driver, config)
├── reports/ # Reportes (mochawesome o logs)
├── node_modules/
├── package.json
├── .gitignore
└── README.md
```


---

## 🚀 Tecnologías y herramientas

- [Node.js](https://nodejs.org/)
- [Selenium WebDriver](https://www.selenium.dev/)
- [Mocha](https://mochajs.org/) – Test runner
- [Chai](https://www.chaijs.com/) – Librería de aserciones
- [ChromeDriver](https://sites.google.com/chromium.org/driver/) – Para ejecutar pruebas en Google Chrome

---

## 🔧 Instalación del proyecto

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd selenium-js-project

# 2. Instalar dependencias
npm install
```

✅ Comando para ejecutar pruebas

`npm test`

👨‍💻 Autor
Fercho RL
Proyecto personal de práctica con Selenium + JavaScript
Julio 2025


## 🧪 Running Tests

This project uses **Mocha** as the test runner and **Chai** for assertions.

### ✅ Run All Tests

To execute all tests inside the `tests/` folder:

```bash
npm test
```
This runs all files matching the pattern defined in package.json, typically:

"scripts": {
  "test": "mocha tests/**/*.test.js"
}

## ▶️ Run a Specific Test File

npx mocha tests/login/02.-loginActions.test.js

Or create a custom script in package.json for convenience:

```json
"scripts": {
  "test:loginActions": "mocha tests/login/02.-loginActions.test.js"
}
```

Then run: npm run test:loginActions


## 🔬 Run a Single Test or Suite with .only

```js
describe.only('Login Actions Test', function () {
  // Only this suite will run
});

it.only('should perform the login flow', async () => {
  // Only this test will run
});

```
Remove .only when you're ready to run the full test suite again.