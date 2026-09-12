const {getAllEmployee,deleteEmployee,registerEmployee,updateEmployee,login} = require("../controllers/employee.controller");
const {uploadAny} = require("../uploads/upload")
const employeeRoute = (app) => {
    app.get("/api/employee", getAllEmployee);
    app.post("/api/employee", uploadAny, registerEmployee);
    app.put("/api/employee/:id", uploadAny, updateEmployee);
    app.delete("/api/employee/:id", deleteEmployee);
    app.post("/api/employee/login", login);
}

module.exports = employeeRoute