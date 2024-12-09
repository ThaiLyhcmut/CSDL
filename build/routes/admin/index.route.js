"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const system_1 = require("../../configs/system");
const dashboard_route_1 = require("./dashboard.route");
const category_route_1 = require("./category.route");
const recruitment_route_1 = require("./recruitment.route");
const employer_route_1 = require("./employer.route");
const adminRoutes = (app) => {
    app.use(`${system_1.prefixAdmin}/dashboard`, dashboard_route_1.dashboarhRouter);
    app.use(`${system_1.prefixAdmin}/category`, category_route_1.categoryRouter);
    app.use(`${system_1.prefixAdmin}/recruitment`, recruitment_route_1.recruitmentRouter);
    app.use(`${system_1.prefixAdmin}/employer`, employer_route_1.employerRouter);
    app.get("*", (req, res) => {
        res.render("admin/pages/error/404", {
            code: 404,
            code_param: 4,
            msg: "Không tìm thấy đường dẫn"
        });
    });
};
exports.adminRoutes = adminRoutes;
