import UserController from './UserController.js';

jest.mock('./UserController');

describe('UserController.js', () => {
    const userController = new UserController();
  
    beforeEach(() => {
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

        localStorage.setItem('currentUser', JSON.stringify(
            {
              "name": "My name 1",
              "cpf": "04080757247",
              "phone": "11987654321",
              "email": "myemail1@test.com.br"
            }
        ));

        document.body.innerHTML = `
            <ul id="listContainer"></ul>
            <div id="sideModal"></div>
        `;
    });

    afterEach(() => {
    });

    test('method "get" should return 3 users in the localstorage', () => {
        userController.get();
        expect(JSON.parse(localStorage.getItem('users')).length).toBe(3);
    });

    test('method "getById" should reeturn the testUser', () => {
        const testUser = {
            "name": "My name 1",
            "cpf": "04080757247",
            "phone": "11987654321",
            "email": "myemail1@test.com.br"
        }
        const _getUser = userController.getById(testUser.cpf);
        expect(_getUser).toEqual(testUser)
    });
    
    test('method "post" should add a user in localstorage and return 4 users', () => {
        const user = {
            "name": "Bruno Severino",
            "cpf": "22830374843",
            "phone": "12981090327",
            "email": "bo.severino@gmail.com"
        }
        
        userController.post(user)
        expect(JSON.parse(localStorage.getItem('users')).length).toBe(4);
    });
    test('method "remove" should remove the user in localstorage and return 2 users', () => {
        const testUser = {
            "name": "My name 1",
            "cpf": "04080757247",
            "phone": "11987654321",
            "email": "myemail1@test.com.br"
        }
        
        userController.remove(testUser)
        expect(JSON.parse(localStorage.getItem('users')).length).toBe(2);
    });

    test('method "put" should change the user in localstorage and return not be equals how it was', () => {
        const newUser = {
            "name": "Bruno Severino",
            "cpf": "04080757247",
            "phone": "11987654321",
            "email": "myemail1@test.com.br"
        }
        const oldUser = userController.getById(newUser.cpf);

        userController.put(newUser);

        expect(oldUser.name).not.toBe(newUser.name);
    });
});