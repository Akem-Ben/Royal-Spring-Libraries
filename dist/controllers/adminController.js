"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSuperAdmin = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const utils_1 = require("../utils/utils");
const CreateSuperAdmin = async (req, res) => {
    try {
        const { fullname, email, password, phone, address, confirm_password } = req.body;
        const validateInput = utils_1.adminRegisterSchema.validate(req.body, utils_1.option);
        if (validateInput.error) {
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            });
        }
        const salt = await (0, utils_1.GenerateSalt)();
        const adminPassword = await (0, utils_1.GeneratePassword)(password, salt);
        const superAdmin = await adminModel_1.default.findOne({ email });
        if (!superAdmin) {
            let mainAdmin = await adminModel_1.default.create({
                fullname,
                email,
                password: adminPassword,
                phone,
                address,
                salt,
                role: "super-admin"
            });
            const mainSuperAdmin = await adminModel_1.default.findOne({ email });
            return res.status(201).json({
                message: "Super-Admin created successfully",
                name: mainSuperAdmin?.fullname,
                email: mainSuperAdmin?.email,
                role: mainSuperAdmin?.role
            });
        }
        return res.status(400).json({
            message: "Super-Admin already exists!"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/admin/create-superadmin'
        });
    }
};
exports.CreateSuperAdmin = CreateSuperAdmin;
