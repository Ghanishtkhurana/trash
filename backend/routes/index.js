const express = require("express");
const UserRoutes = require("./UserRoutes");
const AdminRoutes = require("./Admin");
const AllRoutes = express.Router();

AllRoutes.use("/users",UserRoutes)
AllRoutes.use("/admin",AdminRoutes)

module.exports = AllRoutes;
