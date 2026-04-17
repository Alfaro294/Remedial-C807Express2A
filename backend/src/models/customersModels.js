/* name, lastName, email, phone, addres*/

import { Schema, model } from "mongoose";

const CustomerSchema = new Schema ({
    name : {
        type : String
    },
    lastName : {
        type: String
    },
    email : {
        type : String
    },
    phone : {
        type : String
    },
    address : {
        type : String
    },
    password : {
        type : String
    },
    isVerified : {
        type : Boolean
    },
    loginAttemps : {
        type : Number
    },
    timeOut : {
        type : Date
    }
},
{
    timestamps : true,
    strict : false
}
)

export default model ("Customers", CustomerSchema)