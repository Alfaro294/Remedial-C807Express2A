/* name, lastName, licenseNumber, phone, email, password, isActive, isVerified, loginAttemps, timeOut*/

import { Schema, model } from "mongoose";

const DriverSchema = new Schema ({
    name : {
        type : String
    },
    lastName : {
        type: String
    },
    licenseNumber : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : String
    },
    password : {
        type : String
    },
    isActive : {
        type : Boolean
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

export default model ("Drivers", DriverSchema)