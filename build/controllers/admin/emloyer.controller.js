"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const database_1 = __importDefault(require("../../configs/database"));
const sequelize_1 = require("sequelize");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employers = yield database_1.default.query(`CALL GetEmployerDetails`, {
            type: sequelize_1.QueryTypes.RAW
        });
        console.log(employers);
        res.render("admin/pages/employer/index", {
            pageTitle: "Trang quản lý nhà tuyển dụng",
            employers: employers
        });
    }
    catch (err) {
        res.render("admin/pages/error/404", {
            code: 400,
            code_param: 0,
            msg: err
        });
    }
});
exports.index = index;
