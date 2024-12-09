"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./configs/database"));
const index_route_1 = require("./routes/admin/index.route");
const system_1 = require("./configs/system");
const method_override_1 = __importDefault(require("method-override"));
const body_parser_1 = __importDefault(require("body-parser"));
database_1.default;
const app = (0, express_1.default)();
const port = 3000;
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)("_method"));
app.set('views', `${__dirname}/views`);
app.set('view engine', `pug`);
app.use(express_1.default.static(`${__dirname}/public`));
app.locals.prefixAdmin = system_1.prefixAdmin;
(0, index_route_1.adminRoutes)(app);
app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
});
