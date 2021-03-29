import UserController from "./UserController.js";

class RegisterController {
  constructor() {
    this.handleLabel();
  }

  handleLabel() {
    const handleFocus = (e) => {
      const target = e.target;
      target.parentNode.parentNode.classList.add('active');
    };
    
    const handleBlur = (e) => {
      const target = e.target;
      if(!target.value) {
        target.parentNode.parentNode.classList.remove('active');
      }
    };  
    
    const bindEvents = (element) => {
      const input = element.querySelector('input');
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);    
    };
    
    const init = () => {
      const labels = document.querySelectorAll('label');
      
      labels.forEach((element) => {
        if (element.querySelector('input').value) {
            element.classList.add('active');
        }      
        
        bindEvents(element);
      });
    };

    return {
      init: init
    }
  };

  handleValidation () {
    let $register= document.getElementById('register');
    let $name= document.getElementById('name');
    let $email= document.getElementById('email');
    let $phone= document.getElementById('phone');
    let $cpf= document.getElementById('cpf');

    const bindEvents = () => {
    
      $register.addEventListener('click', () => {

        if(validateForms()) {
          const user = {
            name: $name.value,
            cpf: $cpf.value,
            phone: $phone.value,
            email: $email.value,
          }

          if (!!localStorage.getItem('currentUser')) {
            new UserController().put(user);
          } else {
            new UserController().post(user);
          }
          
          localStorage.removeItem('currentUser');
          document.querySelector('[name=myForm]').reset()
        } else {
          return false;
        }
    
      }); 
    
      //validade name
      $name.addEventListener('input', function (e) {
        let hasError = e.target.parentElement.parentElement.classList.contains('error');
        if (e.target.checkValidity()) { 
          e.target.parentElement.parentElement.classList.remove('error'); 
        }
      });
    
      //validade email
      $email.addEventListener('input', function (e) {
        let hasError = e.target.parentElement.parentElement.classList.contains('error');
        if (e.target.checkValidity()) { 
          e.target.parentElement.parentElement.classList.remove('error'); 
        }
      });
    
      //validade & add phone mask
      $phone.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        let hasError = e.target.parentElement.parentElement.classList.contains('error');
        if (e.target.checkValidity()) { 
          e.target.parentElement.parentElement.classList.remove('error'); 
        }
      });
    
      //validade & add cpf mask
      $cpf.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + (x[3] ? '.' + x[3] + (x[4] ? '-' + x[4] : ''): '');
        let hasError = e.target.parentElement.parentElement.classList.contains('error');
        if (e.target.checkValidity()) { 
          e.target.parentElement.parentElement.classList.remove('error'); 
        }
      });
    }
    
    const validateForms = () => {
      let isValid = true;
  
      if (!$name.checkValidity()) {
        $name.parentElement.parentElement.classList.add('error');
        $name.focus();
        isValid = false;
      } else {
        $name.parentElement.parentElement.classList.remove('error');
      }
  
      if (!$email.checkValidity()) {
        $email.parentElement.parentElement.classList.add('error');
        $email.focus();
        isValid = false;
      } else {
        $email.parentElement.parentElement.classList.remove('error');
      }
  
      if ($phone !== "" & !$phone.checkValidity()) {
        $phone.parentElement.parentElement.classList.add('error');
        $phone.focus();
        isValid = false;
      } else {
        $phone.parentElement.parentElement.classList.remove('error');
      }
  
      if (!$cpf.checkValidity()) {
        $cpf.parentElement.parentElement.classList.add('error');
        $cpf.focus();
        isValid = false;
      } else {
        $cpf.parentElement.parentElement.classList.remove('error');
      }
    
      return isValid;
    }

    const init = () => {
      bindEvents();
    };

    return {
      init: init
    }
  }
}

export default RegisterController;