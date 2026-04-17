import express from "express"
import loginDriverController from "../controllers/driversController.js"

const router = express.Router();

router.route("/").post(loginDriverController.login);

export default router;       