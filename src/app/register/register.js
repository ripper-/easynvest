class register {
    close() {
        localStorage.removeItem('currentUser');
        document.getElementById('sideModal').classList.remove('active');
    }

    open() {
        let $name= document.getElementById('name');
        let $email= document.getElementById('email');
        let $phone= document.getElementById('phone');
        let $cpf= document.getElementById('cpf');

        const user = JSON.parse(localStorage.getItem('currentUser')) || null;
        if (user){
            $name.value = user.name;
            $name.parentNode.parentNode.classList.add('active');

            $email.value = user.email;
            $email.parentNode.parentNode.classList.add('active');

            $phone.value = regexPhone(user.phone, true);
            $phone.parentNode.parentNode.classList.add('active');

            $cpf.value = regexCPF(user.cpf, true);
            $cpf.parentNode.parentNode.classList.add('active');
        } else {
            $name.value = '';
            $name.parentNode.parentNode.classList.remove('active');

            $cpf.value = '';
            $cpf.parentNode.parentNode.classList.remove('active');

            $phone.value = '';
            $phone.parentNode.parentNode.classList.remove('active');

            $email.value = '';
            $email.parentNode.parentNode.classList.remove('active');
        }

        document.getElementById('sideModal').classList.add('active');
    }
}
export default register;


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