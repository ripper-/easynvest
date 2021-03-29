import Main from './script.js';
jest.mock('./script');

const createMockXHR = responseJSON => {
  const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    responseText: JSON.stringify(responseJSON || {}),
    onreadystatechange: jest.fn(),
  };
  return mockXHR;
};
global.fetch = jest.fn(() => Promise.resolve(true));

describe('script.js - the MAIN JS', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    const main = new Main();
    let mockXHR = null;
  
    beforeEach(() => {
      jest.setTimeout(10000);
      mockXHR = createMockXHR();
      mockXHR.responseText = JSON.stringify([
        {
          "name": "My name 1",
          "cpf": "04080757247",
          "phone": "11987654321",
          "email": "myemail1@test.com.br"
        },
        {
          "name": "My name 2",
          "cpf": "77797584192",
          "phone": "11987654321",
          "email": "myemail2@test.com.br"
        },
        {
          "name": "My name 3",
          "cpf": "45486737688",
          "phone": "11987654321",
          "email": "myemail3@test.com.br"
        }
      ]);
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      document.body.innerHTML = `
        <button id="new">New</button>
        <div id="sideModal">
          <button id="back"><span class="icon back"></span> Voltar</button>
          <include src="./app/register/register.html">Loading...</include>
        </div>
        <input type="text" name="name" id="name" required minlength="3">
        <input type="email" name="email" id="email" required>
        <input type="text" name="cpf" id="cpf" required pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$" maxlength="14" inputmode="numeric">
        <input type="tel" name="phone" id="phone" required pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$"  maxlength="15" inputmode="numeric">
      `;
    });
  
    afterEach(() => {
      window.XMLHttpRequest = oldXMLHttpRequest;
    });

    test('test window load', () => {
      dispatchEvent(new Event('load'));
    });

    test('"init" should initialize the main scripts', () => {
        jest.spyOn(main, 'initUserList').mockImplementation();
        mockXHR.onreadystatechange();
        main.init();
        return undefined;
    });

    test('"includePages" should return a promise resolve, after add a include page', () => {
      main.includePages();
      // return expect(main.includePages()).resolves.toBeTruthy();
    });

    test('hadleEvents should add event listeners to button new and back', () => {

      main.hadleEvents();

      const BTNnew = document.querySelector('#new');
      const BTNback = document.querySelector('#back');

      BTNnew.click();
      BTNback.click();
      
    });
});
