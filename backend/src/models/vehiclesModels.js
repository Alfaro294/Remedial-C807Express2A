/* plate,
model,
capacity,
status, 
driverId
*/

import mongoose, { Schema, model } from "mongoose";

const vehicleSchema = new Schema ({
    plate : {
        type : String
    },
    model : {
        type: String
    },
    capacity : {
        type : int
    },
    status : {
        type : Boolean
    },
    driverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Drivers"
    }
},
{
    timestamps : true,
    strict : false
}
)

export default model ("Vehicles", vehicleSchema)