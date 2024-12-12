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
exports.deleteCategory = exports.postCategory = exports.getCategory = exports.index = void 0;
const database_1 = __importDefault(require("../../configs/database"));
const sequelize_1 = require("sequelize");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const careers = yield database_1.default.query(`CALL GetCareerRecruitmentCounts()`, {
            type: sequelize_1.QueryTypes.RAW,
        });
        console.log(careers);
        res.render("admin/pages/category/index", {
            pageTitle: "Danh sách phân loại việc làm",
            careers: careers
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
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/category/create", {
        pageTitle: "Trang them moi danh muc"
    });
});
exports.getCategory = getCategory;
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name_param = req.body.name;
        const record = yield database_1.default.query('CALL InsertCareer(:name_param)', {
            replacements: { name_param },
            raw: true
        });
        res.redirect("/admin/category");
    }
    catch (err) {
        res.render("admin/pages/error/404", {
            code: 400,
            code_param: 0,
            msg: err
        });
    }
});
exports.postCategory = postCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carrerId_param = req.params.id;
        const record = yield database_1.default.query('CALL DeleteCareerById(:carrerId_param)', {
            replacements: { carrerId_param },
            raw: true
        });
        res.status(200).json({
            "code": "success",
            "msg": "Xóa bản ghi thành công"
        });
    }
    catch (err) {
        res.status(400).json({
            "code": "error",
            "msg": "Bị gàn buộc bỡi bài đăng"
        });
    }
});
exports.deleteCategory = deleteCategory;
