import express, { Router } from "express";
import registerDriverController from "../controllers/registerDriver.js";

const router = express.Router();

router.route("/").post(registerDriverController.register);
router.route("/verifyCodeEmail").post(registerDriverController.verifyCode);

export default router;
// Este es como un subEndpoint