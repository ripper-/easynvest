import register from './register.js';

jest.mock('./register');

describe('register.js', () => {
    const reg = new register();
    beforeEach(() => { 
        localStorage.setItem('currentUser', JSON.stringify(
            {
              "name": "My name 1",
              "cpf": "04080757247",
              "phone": "11987654321",
              "email": "myemail1@test.com.br"
            }
        ));

        document.body.innerHTML = `
            <div id="sideModal"></div>
            <input type="text" name="name" id="name" required minlength="3">
            <input type="email" name="email" id="email" required>
            <input type="text" name="cpf" id="cpf" required pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$" maxlength="14" inputmode="numeric">
            <input type="tel" name="phone" id="phone" required pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$"  maxlength="15" inputmode="numeric">
        `;
    });

    afterEach(() => {
    });

    test('"close" should remove the currentUser from localstorage', () => {
        reg.close();
        expect(localStorage.getItem('currentUser')).toBeFalsy()
    });

    test('"open" should get the currentUser from localstorage, and populate the fields', () => {
        reg.open();
        const input = document.getElementById('name');
        const cpf = document.getElementById('cpf');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        expect(input.value).not.toBeNull();
        expect(cpf.value).not.toBeNull();
        expect(email.value).not.toBeNull();
        expect(phone.value).not.toBeNull();
    });

    
    test('"open" should no get the currentUser from localstorage', () => {
        localStorage.removeItem('currentUser');
        reg.open();
        const input = document.getElementById('name');
        const cpf = document.getElementById('cpf');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        expect(input.value).toBe("");
        expect(cpf.value).toBe("");
        expect(email.value).toBe("");
        expect(phone.value).toBe("");
    });
    
});