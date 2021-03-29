import RegisterController from './RegisterController.js';

jest.mock('./RegisterController');

describe('RegisterController.js', () => {
    const registerController = new RegisterController();
  
    beforeEach(() => {
        document.body.innerHTML = `
        <form class="container" name="myForm" >
            <label class='input' for="name">
                <div class="label">Nome completo (sem abreviações)</div>
                <div class="inputValidity">
                    <input type="text" name="name" id="name" required minlength="3">
                    <span class="validity"></span>
                </div>
                <span class="msgError">Campo deve conter 3 caracteres ou mais</span>
            </label>
        
            <label class='input' for="email">
                <div class="label">E-mail</div>
                <div class="inputValidity">
                    <input type="email" name="email" id="email" required>
                    <span class="validity"></span>
                </div>
                <span class="msgError">Email inválido</span>
            </label>
        
            <label class='input' for="cpf">
                <div class="label">CPF</div>
                <div class="inputValidity">
                    <input type="text" name="cpf" id="cpf" required
                    pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$" maxlength="14" inputmode="numeric">
                    <span class="validity"></span>
                </div>
                <span class="msgError">CPF inválido</span>
            </label>
        
            <label class='input' for="phone">
                <div class="label">Telefone</div>
                <div class="inputValidity">
                    <input type="tel" name="phone" id="phone" 
                    pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$"  maxlength="15" inputmode="numeric">
                    <span class="validity"></span>
                </div>
                <span class="msgError">Telefone inválido, ex. (00) 9 0000-0000</span>
            </label>
        
            <button type="button" id="register">
                Cadastrar
            </button>
        </form>
        <div id="sideModal"></div>
        `;
        localStorage.setItem('users', JSON.stringify([
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
        ]));
    });
  
    afterEach(() => {
    });

    test('add handleLabel events, on focus should addd active to label class, and blue should remove', () => {
        registerController.handleLabel().init();
        const input = document.querySelector('#name');
        input.focus();
        expect(input.parentNode.parentNode.classList).toContain('active');
        input.blur();
        expect(input.parentNode.parentNode.classList).not.toContain('active');
    });

    test('Register new USER, should add new user and return 4 users from localstorage', () => {
        registerController.handleValidation().init();

        const input = document.getElementById('name');
        const cpf = document.getElementById('cpf');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const register = document.getElementById('register');

        input.value = "Bruno Severino";
        input.dispatchEvent(new Event('input'));
        cpf.value = "228.303.748-43";
        cpf.dispatchEvent(new Event('input'));
        email.value = "bo.severino@gmail.com";
        email.dispatchEvent(new Event('input'));
        phone.value = "";
        phone.dispatchEvent(new Event('input'));

        register.click();

        expect(JSON.parse(localStorage.getItem('users')).length).toBe(4);
    });

    test('Register new USER with errors', () => {
        registerController.handleValidation().init();

        const input = document.getElementById('name');
        const cpf = document.getElementById('cpf');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const register = document.getElementById('register');

        input.value = "B";
        input.dispatchEvent(new Event('input'));
        cpf.value = "228.303";
        cpf.dispatchEvent(new Event('input'));
        email.value = "bo.severino";
        email.dispatchEvent(new Event('input'));
        phone.value = "12";
        phone.dispatchEvent(new Event('input'));


        expect(register.click()).toBeFalsy();

    });

});