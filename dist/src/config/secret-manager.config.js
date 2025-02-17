"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecret = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const env_config_1 = __importDefault(require("./env.config"));
const getSecret = async (secretName) => {
    if (!secretName)
        return;
    let secret;
    const region = (0, env_config_1.default)().cognitoRegion;
    const client = new client_secrets_manager_1.SecretsManagerClient({
        region: region,
        credentials: {
            accessKeyId: (0, env_config_1.default)().awsAccessKeyId,
            secretAccessKey: (0, env_config_1.default)().awsSecretAccessKey,
        },
    });
    const command = new client_secrets_manager_1.GetSecretValueCommand({
        SecretId: secretName,
    });
    try {
        const data = await client.send(command);
        if ('SecretString' in data) {
            secret = data.SecretString;
        }
        else {
            throw new Error(`Cannot read secret ${secretName}`);
        }
    }
    catch (err) {
        throw err;
    }
    return JSON.parse(secret);
};
exports.getSecret = getSecret;
//# sourceMappingURL=secret-manager.config.js.map