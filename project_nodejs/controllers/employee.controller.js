const { Employee } = require("../models");
const { logError } = require("../middlewares/logError");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =====================================================
// GET ALL EMPLOYEE
// =====================================================
const getAllEmployee = async (req, res) => {
  try {
    const { search } = req.query;

    const where = {};

    if (search && search.trim() !== "") {
      where.full_name = {
        [Op.iLike]: `%${search.trim()}%`,
      };
    }

    const employees = await Employee.findAll({
      where,
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Fetched employees successfully",
      data: employees,
    });
  } catch (error) {
    logError("getAllEmployee", error, res);
  }
};

// =====================================================
// BUILD PHOTO
// =====================================================
const buildPhoto = (file) => {
  if (!file) {
    return null;
  }

  return `/image/${file.filename}`;
};

// =====================================================
// CHECK REQUIRED FIELDS
// =====================================================
const checkRequire = ({
  full_name,
  gender,
  phone,
  role,
  salary,
  email,
  password,
}) => {
  if (!full_name || full_name.trim() === "") {
    return "Full name is required";
  }

  if (!gender || gender.trim() === "") {
    return "Gender is required";
  }

  if (!phone || phone.trim() === "") {
    return "Phone is required";
  }

  if (!role || role.trim() === "") {
    return "Role is required";
  }

  if (salary === undefined || salary === null || salary === "") {
    return "Salary is required";
  }

  if (!email || email.trim() === "") {
    return "Email is required";
  }

  if (!password || password.trim() === "") {
    return "Password is required";
  }

  return null;
};

// =====================================================
// REGISTER EMPLOYEE
// =====================================================
const registerEmployee = async (req, res) => {
  try {
    const {
      full_name,
      gender,
      phone,
      role,
      salary,
      email,
      password,
    } = req.body;

    // ---------------------------------------------
    // CHECK REQUIRED
    // ---------------------------------------------
    const validationError = checkRequire({
      full_name,
      gender,
      phone,
      role,
      salary,
      email,
      password,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // ---------------------------------------------
    // CHECK EMAIL DUPLICATE
    // ---------------------------------------------
    const existingEmployee = await Employee.findOne({
      where: {
        email,
      },
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ---------------------------------------------
    // IMAGE
    // ---------------------------------------------
    const file = req.files?.[0];
    const image = buildPhoto(file);

    // ---------------------------------------------
    // HASH PASSWORD
    // ---------------------------------------------
    const passwordHash = await bcrypt.hash(password, 10);

    // ---------------------------------------------
    // CREATE EMPLOYEE
    // ---------------------------------------------
    const employee = await Employee.create({
      full_name,
      gender,
      phone,
      role,
      salary,
      email,
      password: passwordHash,
      image,
    });

    // ---------------------------------------------
    // REMOVE PASSWORD FROM RESPONSE
    // ---------------------------------------------
    const employeeResponse = employee.toJSON();

    delete employeeResponse.password;

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employeeResponse,
    });
  } catch (error) {
    logError("registerEmployee", error, res);
  }
};

// =====================================================
// UPDATE EMPLOYEE
// =====================================================
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // ---------------------------------------------
    // CHECK ID
    // ---------------------------------------------
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // ---------------------------------------------
    // FIND EMPLOYEE
    // ---------------------------------------------
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const {
      full_name,
      gender,
      phone,
      role,
      salary,
      email,
      password,
    } = req.body;

    // ---------------------------------------------
    // CHECK REQUIRED FIELDS
    // Password is NOT required for update
    // ---------------------------------------------
    if (!full_name || full_name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!gender || gender.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Gender is required",
      });
    }

    if (!phone || phone.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Phone is required",
      });
    }

    if (!role || role.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    if (salary === undefined || salary === null || salary === "") {
      return res.status(400).json({
        success: false,
        message: "Salary is required",
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // ---------------------------------------------
    // CHECK DUPLICATE EMAIL
    // ---------------------------------------------
    const existingEmployee = await Employee.findOne({
      where: {
        email,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ---------------------------------------------
    // UPDATE BASIC INFORMATION
    // ---------------------------------------------
    employee.full_name = full_name;
    employee.gender = gender;
    employee.phone = phone;
    employee.role = role;
    employee.salary = salary;
    employee.email = email;

    // ---------------------------------------------
    // UPDATE PASSWORD ONLY IF PROVIDED
    // ---------------------------------------------
    if (password && password.trim() !== "") {
      employee.password = await bcrypt.hash(password, 10);
    }

    // ---------------------------------------------
    // UPDATE IMAGE ONLY IF NEW IMAGE PROVIDED
    // ---------------------------------------------
    const file = req.files?.[0];

    if (file) {
      employee.image = buildPhoto(file);
    }

    // ---------------------------------------------
    // SAVE
    // ---------------------------------------------
    await employee.save();

    // ---------------------------------------------
    // REMOVE PASSWORD FROM RESPONSE
    // ---------------------------------------------
    const employeeResponse = employee.toJSON();

    delete employeeResponse.password;

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employeeResponse,
    });
  } catch (error) {
    logError("updateEmployee", error, res);
  }
};

// =====================================================
// DELETE EMPLOYEE
// =====================================================
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // ---------------------------------------------
    // CHECK ID
    // ---------------------------------------------
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // ---------------------------------------------
    // FIND EMPLOYEE
    // ---------------------------------------------
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // ---------------------------------------------
    // DELETE
    // ---------------------------------------------
    await employee.destroy();

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    logError("deleteEmployee", error, res);
  }
};

// =====================================================
// LOGIN
// =====================================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // ---------------------------------------------
    // CHECK EMAIL
    // ---------------------------------------------
    if (!email || email.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // ---------------------------------------------
    // CHECK PASSWORD
    // ---------------------------------------------
    if (!password || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // ---------------------------------------------
    // FIND EMPLOYEE
    // ---------------------------------------------
    const employee = await Employee.findOne({
      where: {
        email,
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // ---------------------------------------------
    // CHECK PASSWORD
    // ---------------------------------------------
    const isMatch = await bcrypt.compare(
      password,
      employee.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // ---------------------------------------------
    // CONVERT SEQUELIZE MODEL TO JSON
    // ---------------------------------------------
    const employeeData = employee.toJSON();

    // ---------------------------------------------
    // REMOVE PASSWORD
    // ---------------------------------------------
    delete employeeData.password;

    // ---------------------------------------------
    // CREATE TOKEN
    // ---------------------------------------------
    const token = accessToken(employeeData);

    return res.status(200).json({
      success: true,
      message: "Employee logged in successfully",
      data: employeeData,
      token,
    });
  } catch (error) {
    logError("EmployeeLogin", error, res);
  }
};

// =====================================================
// ACCESS TOKEN
// =====================================================
const accessToken = (employee) => {
  return jwt.sign(
    {
      id: employee.id,
      full_name: employee.full_name,
      email: employee.email,
      role: employee.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// =====================================================
// EXPORT
// =====================================================
module.exports = {
  getAllEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  login,
};