import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import driverModels from "../models/driversModel.js";

import { config } from "../config.js";

const registerDriverController = {};

registerDriverController.register = async (req, res) => {
    try {
        const {
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

        const dataDriver = await driverModels.findOne({email})
        if (dataDriver){
            return res.status (400).json({message: "Driver already exists"})
        }

        const passworHash = await bcrypt.hash(password,10);

        const newDriver = new driverModels({
            name, 
            lastName, 
            licenseNumber, 
            phone, 
            email, 
            isActive,
            password : passwordHash,
            isVerified : isVerified || false,
            loginAttempts, timeOut,
        });

        await newDriver.save();

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

registerDriverController.verifyCode = async (req, res) => {
    try {
        const {verificationCodeRequest} = req.body;

        const token = req.cookies.verificationTokenCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode_storedCode} = decoded;

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message:"Invalid codigito"})
        }

        const Driver = await DriverModel.findOne({email});
        Driver.isVerified = true;
        await Driver.save();

        res.clearCookie("verificationTokenCookie")
        res.json ({message: "Email verified successfully"})
    } catch (error) {
        console.log("error"+ error)
        return res.status(500).json({message:"Error"})
    }
};

export default registerDriverController;