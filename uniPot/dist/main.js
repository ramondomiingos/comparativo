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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("./src/auth");
const faker_1 = require("@faker-js/faker");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
app.use((0, morgan_1.default)('tiny'));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: 'Bem vindo ao Banco UniPOT' });
});
app.get('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, auth_1.generateToken)();
    res.json({ token });
}));
app.get('/extrato', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const statement = {
        transactions: [
            {
                datetime: faker_1.faker.datatype.datetime(),
                place: faker_1.faker.company.name(),
                price: faker_1.faker.commerce.price(100, 200)
            },
            {
                datetime: faker_1.faker.datatype.datetime(),
                place: faker_1.faker.company.name(),
                price: faker_1.faker.commerce.price(100, 200)
            },
            {
                datetime: faker_1.faker.datatype.datetime(),
                place: faker_1.faker.company.name(),
                price: faker_1.faker.commerce.price(100, 200)
            },
        ],
        bank_balance: faker_1.faker.commerce.price(100, 200, 0, '$')
    };
    const token = req.query['token'] || '';
    try {
        yield (0, auth_1.validateToken)(token[0]);
        res.json({ statement });
        return;
    }
    catch (e) {
        res.status(403).json({ message: 'token invalido ' });
        return;
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
