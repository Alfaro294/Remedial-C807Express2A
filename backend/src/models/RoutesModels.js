/* 
origin,
destination,
distance,
estimatedTime */

import mongoose, { Schema, model } from "mongoose";

const RoutesSchema = new Schema ({
    origin : {
        type : String
    },
    destination : {
        type: String
    },
    distance : {
        type : String
    },
    estimatedTime : {
        type : Date
    }
},
{
    timestamps : true,
    strict : false
}
)

export default model ("Routes", RoutesSchema)