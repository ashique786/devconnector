const validator = require('validator');
const isEmpty = require ('./is-emty') ;
module.exports = function validateRegisterInput(data){
    let errors ={};
    if(!validator.isLength(data.name, { min: 2, max: 30})){
        errors.name = 'name n=must be between 2 and 30 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
} 