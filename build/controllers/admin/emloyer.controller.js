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
exports.patchEditEmployer = exports.getEditEmployer = exports.deleteEmployer = exports.getCreateEmployer = exports.postCreateEmployer = exports.index = void 0;
const employer_model_1 = require("../../models/employer.model");
const database_1 = __importDefault(require("../../configs/database"));
const sequelize_1 = require("sequelize");
const company_model_1 = require("../../models/company.model");
const user_model_1 = require("../../models/user.model");
const system_1 = require("../../configs/system");
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
const postCreateEmployer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const dataUser = {
            email: req.body.email,
            fullName: req.body.fullName,
            birthday: req.body.birthday,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address,
            role: 'Employer',
            adminUserID: null
        };
        const recordUser = yield user_model_1.User.create(dataUser);
        const dataEmployer = {
            employerId: recordUser.dataValues.userId,
            companyId: req.body.companyId
        };
        yield employer_model_1.Employer.create(dataEmployer);
        res.redirect(`${system_1.prefixAdmin}/employer`);
    }
    catch (err) {
        res.render("admin/pages/error/404", {
            code: 400,
            code_param: 0,
            msg: err
        });
    }
});
exports.postCreateEmployer = postCreateEmployer;
const getCreateEmployer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield company_model_1.Company.findAll({
        raw: true
    });
    console.log(company);
    res.render("admin/pages/employer/create", {
        pageTitle: "Them moi nha tuyen dung",
        company: company
    });
});
exports.getCreateEmployer = getCreateEmployer;
const deleteEmployer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exitsUser = yield user_model_1.User.findOne({
            where: {
                userId: req.params.id
            },
            raw: true
        });
        if (exitsUser) {
            yield employer_model_1.Employer.destroy({
                where: {
                    employerId: req.params.id
                }
            });
            yield user_model_1.User.destroy({
                where: {
                    userId: req.params.id
                }
            });
        }
        res.status(200).json({
            "code": "success"
        });
    }
    catch (err) {
        res.status(400).json({
            "code": "error",
            msg: "Bị gàn buộc bởi bài đăng của User này"
        });
    }
});
exports.deleteEmployer = deleteEmployer;
const getEditEmployer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.redirect("back");
        }
        const exitsUser = yield user_model_1.User.findOne({
            where: {
                userId: id
            },
            raw: true
        });
        if (exitsUser) {
            console.log(exitsUser);
            res.render("admin/pages/employer/edit", {
                pageTile: "Chỉnh sửa thông tin của nhà tuyển dụng",
                User: exitsUser
            });
        }
        else
            res.redirect("back");
    }
    catch (err) {
        res.render("admin/pages/error/404", {
            code: 400,
            code_param: 0,
            msg: err
        });
    }
});
exports.getEditEmployer = getEditEmployer;
const patchEditEmployer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id, req.body);
        if (!req.params.id) {
            res.redirect("back");
        }
        const dataUser = {
            fullName: req.body.fullName,
            birthday: req.body.birthday,
            gender: req.body.gender,
            address: req.body.address
        };
        const exitsUser = yield user_model_1.User.findOne({
            where: {
                userId: req.params.id
            },
            raw: true
        });
        if (exitsUser) {
            yield user_model_1.User.update(dataUser, {
                where: {
                    userId: req.params.id
                }
            });
        }
        res.redirect(`${system_1.prefixAdmin}/employer`);
    }
    catch (err) {
        res.render("admin/pages/error/404", {
            code: 400,
            code_param: 0,
            msg: err
        });
    }
});
exports.patchEditEmployer = patchEditEmployer;
