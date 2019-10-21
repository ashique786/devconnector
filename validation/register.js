const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (validator.isEmpty(data.name)) {
        errors.name = 'name field should not be empty';

    }

    else if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }


    if (validator.isEmpty(data.email)) {
        errors.email = 'email field should not be empty';

    }
    else if (!validator.isEmail(data.email)) {
        errors.email = 'email is not valid';

    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'password field should not be empty';

    }
    else if (!validator.isLength(data.password, { min: 2, max: 30 })) {
        errors.password = 'password must be of minimum 2 charaters and maximum of 30';

    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'password2 field should not be empty';

    }
    else if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'password2 must match';

    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
} 