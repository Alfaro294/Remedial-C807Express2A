import driverModel from "../models/driversModel.js";

const DriverController = {};

DriverController.getDriver = async (req, res) => {
    try {
        const drivers = await driverModel.find();
        return res.status(200).json(drivers)
    } catch (error) {
        console.log ("error" + error)
        return res.status(500).json({message : "Internal server error"});
    }
};

DriverController.deleteDriver = async (req , res) => {
    try {
        const deletedDriver = await driverModel.findByIdAndDelete(req.params.id)
        if(!deletedDriver){
            return res.status(404).json({message : "Driver not deleted"})
        }

        return res.status(200).json({message:"Driver deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message : "Internal server error"});
    }
};

DriverController.updateDriver = async (req, res) => {
    try {
        let {
            name, 
            lastName, 
            licenseNumber, 
            phone, 
            email, 
            password, 
            isActive, 
            isVerified, 
            loginAttemps, timeOut

        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if (name.length < 3 || name.length > 15){
            return res.status(400).json({message : "Name Invalid"})
        }

        const updateDriver = await driverModel.findByIdAndUpdate(req.params.id, {
            name, 
            lastName, 
            licenseNumber, 
            phone, 
            email, 
            password, 
            isActive, 
            isVerified, 
            loginAttemps, timeOut
        }, {new : true});

        if (!updatedDriver){
            return res.status(404).json({message: "Driver not updated"})
        }

        return res.status(200).json({message : "Driver Updated"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
};

export default DriverController;