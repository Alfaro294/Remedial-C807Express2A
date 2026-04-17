import customerModel from "../models/customersModels.js";

const customerController = {};

customerController.getCustomer = async (req, res) => {
    try {
        const customers = await customerModel.find();
        return res.status(200).json(customers)
    } catch (error) {
        console.log ("error" + error)
        return res.status(500).json({message : "Internal server error"});
    }
};

customerController.deleteCustomer = async (req , res) => {
    try {
        const deletedCustomer = await customerModel.findByIdAndDelete(req.params.id)
        if(!deletedCustomer){
            return res.status(404).json({message : "Customer not deleted"})
        }

        return res.status(200).json({message:"Customer deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message : "Internal server error"});
    }
};

customerController.updateCustomer = async (req, res) => {
    try {
        let {
            name,
            lastName,
            email,
            phone,
            address,
            password,
            isVerified,
            loginAttempts, timeOut

        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if (name.length < 3 || name.length > 15){
            return res.status(400).json({message : "Name Invalid"})
        }

        const updateCustomer = await customerModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            email,
            phone,
            address,
            password,
            isVerified,
            loginAttempts, timeOut
        }, {new : true});

        if (!updatedCustomer){
            return res.status(404).json({message: "Customer not updated"})
        }

        return res.status(200).json({message : "Customer Updated"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
};

export default customerController;