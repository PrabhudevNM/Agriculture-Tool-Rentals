import User from "../Models/user-model.js";

export const userRegisterSchema={
    username:{
        exists:{
            errorMessage:"username field is required"
        },
        notEmpty:{
            errorMessage:"Email cannot be empty"
        },
        trim:true,
    },

    email:{
        exists:{
            errorMessage:"email field is required"
        },
        notEmpty:{
            errorMessage:"email cannot be empty"
        },
        isEmail:{
            errorMessage:"email should be valid format"
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options:async function(value){
                try {
                    const user=await User.findOne({email:value})
                    if(user){
                        throw new Error('email is already taken')
                    }
                } catch (error) {
                    throw new Error(error.message)
                    
                }
                return true
            }
        }
    },

    password:{
        exists:{
            errorMessage:"passoword field is required"
        },
        notEmpty:{
            errorMessage:"password cannot be empty"
        },
        isStrongPassword:{
            options:{
                minLength:8,
                maxLength:15,
                minUppercase:1,
                minLowercase:1,
                minNumber:1,
                minSymbol:1,
            },
            errorMessage:"password contain minimum 8 character, it should not be cross 15, one upperCase, one lowerCase, one number, one symbol."
        },
        trim:true
    },

    phone: {
        exists: {
            errorMessage: "phone field is required"
        },
        notEmpty: {
            errorMessage: "phone cannot be empty"
        },
        isNumeric: {
            errorMessage: "Phone number must be numeric"
        },
        isLength: {
            options: {
                min: 10,
                max: 10
            },
            errorMessage: "Phone number must be having 10 characters"
        }
    },
}

export const userLoginSchema={
    
    email:{
        exists:{
            errorMessage:"email field is required"
        },
        notEmpty:{
            errorMessage:"email cannot be empty"
        },
        isEmail:{
            errorMessage:"email should be valid format"
        },
        trim:true,
        normalizeEmail:true,
    },

    password:{
        exists:{
            errorMessage:"passoword field is required"
        },
        notEmpty:{
            errorMessage:"passowrd cannot be empty"
        },
        isStrongPassword:{
            options:{
                minLength:8,
                maxLength:15,
                minUppercase:1,
                minLowercase:1,
                minNumber:1,
                minSymbol:1,
            },
            errorMessage:"password contain minimum 8 character, it should not be cross 15, one upperCase, one lowerCase, one number, one symbol."
        },
        trim:true
    }

}