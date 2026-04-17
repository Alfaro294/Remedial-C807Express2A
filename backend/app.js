import express from "express";
import customerRoutes from "./src/routes/customersRoutes.js";
import registerCustomer from "./src/routes/registerCustomer.js";
import loginCustomer from "./src/routes/loginCustomer.js";
import logoutRoutes from "./src/routes/logoutRoutes.js";
import driverRoutes from "./src/routes/driversRoutes.js";
import registerDriver from "./src/routes/registerDriver.js";
import loginDriver from "./src/routes/loginDriver.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/registerCustomers", registerCustomer);
app.use("/api/loginCustomer", loginCustomer);
app.use("/api/logout", logoutRoutes );
app.use("api/driver", driverRoutes);
app.use ("/api/registerDriver", registerDriver);
app.use("/api/loginDriver", loginDriver);

export default app;