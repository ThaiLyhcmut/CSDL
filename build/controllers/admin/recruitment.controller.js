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
exports.patchRecruitmentId = exports.postRecruitmentCreate = exports.getRecruitmentCreate = exports.deleteRecruitmentId = exports.getRecruitmentIdDetail = exports.getRecruitmentId = void 0;
const database_1 = __importDefault(require("../../configs/database"));
const sequelize_1 = require("sequelize");
const recruitment_model_1 = require("../../models/recruitment.model");
const category_model_1 = require("../../models/category.model");
const moment_1 = __importDefault(require("moment"));
const employer_model_1 = require("../../models/employer.model");
const getRecruitmentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sort_param = req.query.sort || "";
        let value_param = req.query.order || "";
        let limit_param = parseInt(req.query.limit) || 4;
        let page = parseInt(req.query.page) || 1;
        const categoryId = req.params.id || "";
        const keyword = req.query.keyword || "";
        let offset_param = (page - 1) * limit_param;
        let recruitments;
        const careers = yield database_1.default.query(`CALL GetCareerRecruitmentCounts()`, {
            type: sequelize_1.QueryTypes.RAW,
        });
        let categoryName = "tất cả";
        let totlePage = -1;
        if (req.query.keyword) {
            totlePage = 1,
                limit_param = 50,
                offset_param = 0;
            page = 1;
        }
        if (!categoryId) {
            const condition = keyword
                ? {
                    [sequelize_1.Op.or]: [
                        { title: { [sequelize_1.Op.regexp]: keyword } },
                        { workPosition: { [sequelize_1.Op.regexp]: keyword } },
                    ],
                }
                : {};
            const orderCondition = sort_param && value_param
                ? [[sort_param, value_param === "ASC" ? "ASC" : "DESC"]]
                : undefined;
            recruitments = yield recruitment_model_1.Recruitment.findAll({
                where: condition,
                limit: limit_param,
                offset: offset_param,
                order: orderCondition,
                raw: true,
            });
        }
        else {
            recruitments = yield database_1.default.query(`CALL GetCategoryRecumentById(:categoryId, :keyword, :limit_param, :offset_param, :sort_param, :value_param)`, {
                replacements: { categoryId, keyword, limit_param, offset_param, sort_param, value_param },
                type: sequelize_1.QueryTypes.RAW
            });
            categoryName = careers.find(item => item.categoryId == categoryId).name;
        }
        let totle = 0;
        console.log(careers);
        careers.forEach((item, _) => {
            if (item.categoryId == categoryId) {
                totlePage = ((item.totleRecruitId + (limit_param - 1)) / limit_param);
            }
            totle += item.totleRecruitId;
        });
        if (totlePage == -1) {
            totlePage = ((totle + (limit_param - 1)) / limit_param);
        }
        totlePage = parseInt(totlePage);
        for (const item of recruitments) {
            item["deadline"] = (0, moment_1.default)(item.deadline).format("DD/MM/YY");
            item["createAt"] = (0, moment_1.default)(item.createAt).format("HH:mm DD/MM/YY");
        }
        res.render("admin/pages/recruitment/index", {
            pageTitle: `Trang danh sách bài đăng ${categoryName}`,
            recruitments: recruitments,
            careers: careers,
            categoryId: categoryId,
            keyword: keyword,
            totle: totle,
            totlePage: totlePage,
            currentPage: page,
            sort: sort_param,
            value: value_param
        });
    }
    catch (err) {
        console.log(err);
        res.render("admin/pages/error/404", {
            code: 400,
            code_param: 0,
            msg: err
        });
    }
});
exports.getRecruitmentId = getRecruitmentId;
const getRecruitmentIdDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const careers = yield database_1.default.query(`CALL GetCareerRecruitmentCounts()`, {
            type: sequelize_1.QueryTypes.RAW,
        });
        const recruitmentId = req.params.id;
        const recruitment = yield recruitment_model_1.Recruitment.findOne({
            where: { recruitmentId: recruitmentId },
            include: [
                {
                    model: category_model_1.Category,
                    where: { recruitmentId: recruitmentId },
                    required: true
                }
            ],
            raw: true
        });
        const employerId = recruitment.employerId;
        const [result] = yield database_1.default.query('SELECT GetNamebyEmployerId(:employerId) AS fullName', {
            replacements: { employerId },
            type: sequelize_1.QueryTypes.SELECT
        });
        console.log(careers);
        res.render("admin/pages/recruitment/edit", {
            pageTitle: `Trang chi tiet bai dang của Công Ty ${result.fullName}`,
            recruitment: recruitment,
            recruitmentId: recruitmentId,
            careers: careers,
            categoryId: recruitment['Categories.categoryId'],
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
exports.getRecruitmentIdDetail = getRecruitmentIdDetail;
const deleteRecruitmentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recruitmentId = req.params.id;
        const result = yield database_1.default.query('CALL DeleteRecruitmentId(:recruitmentId)', {
            replacements: { recruitmentId },
            raw: true
        });
        console.log(result[0]["success"]);
        if (result[0]["success"] == 1) {
            res.status(200).json({
                "code": "success",
                "msg": "Xoa thanh cong"
            });
            return;
        }
        res.status(400).json({
            "code": "error",
            "msg": "Xoa khong thanh cong"
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
exports.deleteRecruitmentId = deleteRecruitmentId;
const getRecruitmentCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employers = yield database_1.default.query('CALL process_employers()', {
            type: sequelize_1.QueryTypes.RAW,
        });
        console.log(employers);
        const careers = yield database_1.default.query(`CALL GetCareerRecruitmentCounts()`, {
            type: sequelize_1.QueryTypes.RAW,
        });
        console.log(employers);
        res.render("admin/pages/recruitment/create", {
            careers: careers,
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
exports.getRecruitmentCreate = getRecruitmentCreate;
const postRecruitmentCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exitsEmployer = yield employer_model_1.Employer.findOne({
            where: {
                employerId: req.body.employer_id
            }
        });
        if (!req.body.employer_id || !exitsEmployer) {
            res.redirect("back");
        }
        const data = {
            employerId_param: parseInt(req.body.employer_id),
            title_param: req.body.title,
            workPosition_param: req.body.position,
            location_param: req.body.location,
            description_param: req.body.description,
            experience_param: req.body.experience,
            salary_param: parseFloat(req.body.salary) || 0,
            openings_param: parseInt(req.body.numbers) || 1,
            deadline_param: req.body.deadline || Date,
            categoryId_param: req.body.category_id
        };
        const record = yield database_1.default.query('CALL InsertRecruitment(:employerId_param, :title_param, :workPosition_param, :location_param, :description_param, :experience_param, :salary_param, :openings_param, :deadline_param, :categoryId_param)', {
            replacements: data,
            raw: true
        });
        res.redirect("/admin/recruitment");
    }
    catch (err) {
        res.redirect("back");
    }
});
exports.postRecruitmentCreate = postRecruitmentCreate;
const patchRecruitmentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recruitmentId = req.params.id;
        const data = {
            recruitmentId_param: parseInt(recruitmentId),
            title_param: req.body.title,
            workPosition_param: req.body.position,
            location_param: req.body.location,
            description_param: req.body.description,
            experience_param: req.body.experience,
            salary_param: parseFloat(req.body.salary),
            theNumberOfOpenings_param: parseInt(req.body.numbers),
            deadline_param: req.body.deadline,
            categoryId: req.body.category_id
        };
        const record = yield database_1.default.query('CALL UpdateRecruitment(:recruitmentId_param, :title_param, :workPosition_param, :location_param, :description_param, :experience_param, :salary_param, :theNumberOfOpenings_param, :deadline_param, :categoryId)', {
            replacements: data,
            raw: true
        });
        res.redirect("/admin/recruitment");
    }
    catch (err) {
        res.render("admin/pages/error/404", {
            code: 400,
            code_param: 0,
            msg: err
        });
    }
});
exports.patchRecruitmentId = patchRecruitmentId;
