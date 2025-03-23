"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = expressAuthentication;
exports.getEmailFromToken = getEmailFromToken;
const jwt = __importStar(require("jsonwebtoken"));
const jwksClient = __importStar(require("jwks-rsa"));
const config_js_1 = require("./config.js");
function expressAuthentication(request, securityName, scopes) {
    if (securityName === 'BearerAuth') {
        const token = request.body.token ||
            request.query.token ||
            request.headers['authorization'];
        return new Promise((resolve, reject) => {
            verifyJwt(token)
                .then((verifiedData) => {
                // Resolve the new promise with the result of verifyJwt
                console.warn('token verified...');
                if (checkRoles(verifiedData, scopes)) {
                    console.warn('user has the required roles...');
                    resolve(verifiedData);
                }
                else {
                    reject(new Error('User does not have the required role'));
                }
            })
                .catch((error) => {
                // Reject the new promise with the error from verifyJwt
                reject(new Error(error.message));
            });
        });
    }
    return Promise.reject(new Error('Unsupported security name'));
}
// Initialize a JSON Web Key Set (JWKS) client with Keycloak's public key endpoint
// TODO make this call only once maybe?
const jwksUri = config_js_1.config.auth.certsUrl;
const client = new jwksClient.JwksClient({
    jwksUri,
});
// Verify and decode the JWT token
const verifyJwt = async (token) => {
    if (!token) {
        throw new Error('No token provided');
    }
    const newToken = token.substring(7, token.length);
    const decoded = jwt.decode(newToken, { complete: true });
    if (!decoded || !decoded.header || !decoded.header.kid) {
        throw new Error('Invalid token format');
    }
    const kid = decoded.header.kid;
    const key = await new Promise((resolve, reject) => {
        client.getSigningKey(kid, (err, key) => {
            if (err) {
                reject(err);
            }
            resolve(key?.getPublicKey());
        });
    });
    // Verify the token with the public key
    try {
        const verified = jwt.verify(newToken, key, { algorithms: ['RS256'] });
        return verified;
    }
    catch (error) {
        throw new Error('JWT verification failed: ' + error.message);
    }
};
function checkRoles(token, scopes) {
    return scopes.every((scope) => token.realm_access?.roles?.includes(scope));
}
function getEmailFromToken(verifiedData) {
    console.warn('verifiedData ---------------------->', verifiedData);
    return 'hier das hat geklappt';
}
