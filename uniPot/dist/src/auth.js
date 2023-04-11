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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.validateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const PRIVATE_KEY = 'PRIVATE_KEY';
const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(token, PRIVATE_KEY, (error, decoded) => {
            if (error)
                return reject(error);
            resolve(decoded);
        });
    });
};
exports.validateToken = validateToken;
const generateToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        name: 'Usuário da API',
        userId: 123,
        accessTypes: [
            'getExtrato'
        ]
    };
    const signInOptions = {
        // RS256 uses a public/private key pair. The API provides the private key
        // to generate the JWT. The client gets a public key to validate the
        // signature
        algorithm: 'HS256',
        expiresIn: '60000',
        allowInvalidAsymmetricKeyTypes: true,
    };
    // generate JWT
    return (0, jsonwebtoken_1.sign)(payload, PRIVATE_KEY, signInOptions);
});
exports.generateToken = generateToken;
