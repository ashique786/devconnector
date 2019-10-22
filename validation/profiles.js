const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

   if(!validator.isLength(data.handle, {min:2, max: 40})){
       errors.handle= 'handle must be between 2 and 40 letters'
   }
   if(validator.isEmpty(data.handle)){
    errors.handle= 'handle is required'
    }
    if(validator.isEmpty(data.status)){
        errors.status= 'status is required'
    }
    if(validator.isEmpty(data.skills)){
        errors.skills= 'skills is required'
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website= 'not a valid URL'
        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter= 'not a valid URL'
        }
    }
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook= 'not a valid URL'
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin= 'not a valid URL'
        }
    }
    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram= 'not a valid URL'
        }
    }
    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube= 'not a valid URL'
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
} 