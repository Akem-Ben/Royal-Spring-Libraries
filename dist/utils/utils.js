"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePassword = exports.GenerateSalt = exports.option = exports.adminRegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.adminRegisterSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password')).
        required().label('Confirm Password').messages({ "any.only": "{{#label}} does not match" }),
    phone: joi_1.default.string().required(),
    address: joi_1.default.string().required()
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
};
const GenerateSalt = async () => {
    return await bcryptjs_1.default.genSalt();
};
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = async (password, salt) => {
    return await bcryptjs_1.default.hash(password, salt);
};
exports.GeneratePassword = GeneratePassword;
