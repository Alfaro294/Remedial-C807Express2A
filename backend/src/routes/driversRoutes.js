import express from "express";
import DriverController from "../controllers/driversController.js";

const router = express.Router();
router.route("/")
.get(DriverController.getDriver);

router.route("/:id")
.put(DriverController.updateDriver)
.delete(DriverController.deleteDriver);

export default router;