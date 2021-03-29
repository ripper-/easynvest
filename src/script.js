import UserController from "./app/controller/UserController.js";
import RegisterController from "./app/controller/RegisterController.js";
import register from "./app/register/register.js";

let userController = new UserController();
let registerController = new RegisterController();

class Main {
    constructor() {
    }
    
    init () {
        // get users in localStorage, if it doens't exist get new list from mockUsers
        this.initUserList();

        // just to be sure that the register page is loaded first
        this.includePages().then(() => {
            registerController.handleLabel().init();
            registerController.handleValidation().init();
        })

        //handle the index buttons events
        this.hadleEvents();

        //reset currentUser on localstore
        localStorage.removeItem('currentUser');
    }

    initUserList = () => {
        const users = JSON.parse(localStorage.getItem('users'));
        if(!users) {
            this.httpRequest('GET', 'https://private-21e8de-rafaellucio.apiary-mock.com/users')
            .then(response => localStorage.setItem('users', response));
        }
        userController.get();
    }

    httpRequest = (method, url) => {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    resolve(xhr.responseText);
                }
            }
            xhr.send(null);
        });
        return promise;
    }

    hadleEvents()  {
        const $new = document.getElementById('new');
        const $back= document.getElementById('back');

        $new.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            new register().open();
        });

        $back.addEventListener('click', () => {
            new register().close()
        });
    }

    includePages() {
        const promise = new Promise((resolve, reject) => {
            const includes = document.querySelectorAll('include');
            includes.forEach(el => {
                let filePath = el.getAttribute('src');
                fetch(filePath).then(file => {
                    file.text().then(content => {
                        el.insertAdjacentHTML('afterend', content);
                        el.remove();
                        resolve(true);
                    });
                });
            });
        });
        return promise;
    }
}

export default Main;

window.addEventListener("load", function(){
    new Main().init();
});