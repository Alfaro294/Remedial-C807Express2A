import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import customersModels from "../models/customersModels";

import { config } from "../config.js";

const registerCustomerController = {};

registerCustomerController.register = async (req, res) => {
    try {
        const {
             name,
            lastName,
            email,
            phone,
            address,
            password,
            isVerified,
            loginAttempts, timeOut
        } = req.body;

        const dataCustomer = await customersModels.findOne({email})
        if (dataCustomer){
            return res.status (400).json({message: "Customer already exists"})
        }

        const passworHash = await bcrypt.hash(password,10);

        const newCustomer = new customersModels({
             name,
            lastName,
            email,
            phone,
            address,
            password : passwordHash,
            isVerified : isVerified || false,
            loginAttempts, timeOut,
        });

        await newCustomer.save();

        const verificationCode= crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn : "20m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})

        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from : config.email.user_email,
            to : email,
            subject : "Verificación de tu cuenta plis",
            text : "Para verificar tu cuenta, utiliza este código " + verificationCode + "expira en 20 minutos"
        }

        transporter.sendMail(mailOptions,(error,info) => {
            if (error){
                console.log("error" + error)
                return res.status(500).json({message:"error"})
            }


            res.status(200).json({message: "email send"})
        });

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Server error"})
    }
};

registerCustomerController.verifyCode = async (req, res) => {
    try {
        const {verificationCodeRequest} = req.body;

        const token = req.cookies.verificationTokenCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode_storedCode} = decoded;

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message:"Invalid codigito"})
        }

        const customer = await customerModel.findOne({email});
        customer.isVerified = true;
        await customer.save();

        res.clearCookie("verificationTokenCookie")
        res.json ({message: "Email verified successfully"})
    } catch (error) {
        console.log("error"+ error)
        return res.status(500).json({message:"Error"})
    }
};

export default registerCustomerController;