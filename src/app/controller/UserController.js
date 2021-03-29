import register from "../register/register.js";

class UserController {
    get() {      
        let users = JSON.parse(localStorage.getItem('users'));

        const $listContainer = document.getElementById('listContainer');

        if(!$listContainer) {
            return;
        }

        //clean container
        $listContainer.innerHTML = '';

        //append inner Html
        let $liElement = '';
        users.forEach(user => {
            $liElement += createLiElement(user); 
        });
        $listContainer.innerHTML = $liElement;

        this.handleEvents();

        console.info("LOG: [GET] all users;", users);
    }

    getById(cpf) {
        let users = JSON.parse(localStorage.getItem('users'));
        let response = '';
        if(cpf){
            response = users.find(u => u.cpf === cpf);
        }
        console.info("LOG: [GET] user by id; ", response);
        return response;
    }

    post(user) {
        let users = JSON.parse(localStorage.getItem('users'));
        //regex phone & cpf, remove especial caracter
        users.push(user);
        users = removeEspecialCaracter(users);

        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('sideModal').classList.remove('active');
        this.get();
        console.info("LOG: [POST] user; ", user);
    }

    remove(user) {
        let users = JSON.parse(localStorage.getItem('users'));
        users = users.filter(u => u.cpf !== user.cpf);
        localStorage.setItem('users', JSON.stringify(users));
        this.get();
        console.info("LOG: [REMOVE] user; ", user);
    }

    put(user) {
        let users = JSON.parse(localStorage.getItem('users'));
        
        let _old = JSON.parse(localStorage.getItem('currentUser'))
        users[users.findIndex(u => u.cpf ===_old.cpf)] = user;
        users = removeEspecialCaracter(users);

        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('sideModal').classList.remove('active');
        this.get();
        console.info("LOG: [PUT] user; old:", _old, "new:", user);
    }

    handleEvents() {
        const allEditElement = document.querySelectorAll('.selectorUserEdit');
        const allRemoveElement = document.querySelectorAll('.selectorUserRemove');
    
        allEditElement.forEach(editElement => {
            editElement.addEventListener('click', () => {
                let _user =  this.getById(editElement.getAttribute('data-id'));
                localStorage.setItem('currentUser', JSON.stringify(_user));

                new register().open();
            });
        });
    
        allRemoveElement.forEach(removeElement => {
            removeElement.addEventListener('click', () => {
                let _user =  this.getById(removeElement.getAttribute('data-id'));
                if(window.confirm("Want to delete user "+ _user.name)) {
                    this.remove(_user);
                }
            });
        });
    }
}
export default UserController;

function createLiElement(user) {
    //regex phone to show the numbers, ex (12) 98109-0327
    user = addEspecialCaracter(user);

    return `
        <li>
            <span><strong>Name: </strong>${user.name}</span>
            <span><strong>CPF: </strong>${user.cpf}</span>
            <span><strong>Phone: </strong>${user.phone}</span>
            <span><strong>E-mail: </strong>${user.email}</span>
            <div class="action">
                <button class="selectorUserEdit" data-id="${regexCPF(user.cpf,false)}">
                    <span class="icon edit"></span>
                </button>
                <button class="selectorUserRemove" data-id='${regexCPF(user.cpf,false)}'>
                    <span class="icon delete"></span>
                </button>
            </div>
        </li>
    `; 
}

function addEspecialCaracter(_user) {
    _user.phone = regexPhone(_user.phone, true);
    _user.cpf = regexCPF(_user.cpf, true);

    return _user;
}

function removeEspecialCaracter(_users) {
    _users.forEach(u => {
        u.phone = regexPhone(u.phone, false);
        u.cpf = regexCPF(u.cpf, false);
    });
    return _users;
}

/**
 * 
 * @param {string} phone user phone ex.12981090327
 * @param {boolean} add to add or remove regex
 * @returns phone
 */
 function regexPhone(phone, add) {
    if(add){
        let _phone = phone.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        return !_phone[2] ? _phone[1] : '(' + _phone[1] + ') ' + _phone[2] + (_phone[3] ? '-' + _phone[3] : '');
    } else {
        return phone.replace(/[^\w\s]/g, '').replace(/\s/g, '');
    }
}

/**
 * 
 * @param {string} cpf user cpf ex.22830374843
 * @param {boolean} add to add or remove regex
 * @returns cpf
 */
function regexCPF(cpf, add) {
    if(add){
        let _cpf = cpf.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
        return !_cpf[2] ? _cpf[1] : _cpf[1] + '.' + _cpf[2] + (_cpf[3] ? '.' + _cpf[3] + (_cpf[4] ? '-' + _cpf[4] : ''): '');
    } else {
        return cpf.replace(/[^\w\s]/g, '');
    }
}