/* trackingNumber,
weight,
dimensions,
description,
senderId,
receiverId,
status*/

import { Schema, model } from "mongoose";

const PackageSchema = new Schema ({
    trackingNumber : {
        type : String
    },
    weight : {
        type: Double
    },
    dimensions : {
        type : Double
    },
    description : {
        type : String
    },
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Drivers"
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Customers"
    },
    status : {
        type : Boolean
    }
},
{
    timestamps : true,
    strict : false
}
)

export default model ("Customers", CustomerSchema)