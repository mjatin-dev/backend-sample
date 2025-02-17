"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FirebaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const env_config_1 = __importDefault(require("../../../config/env.config"));
const env_config_2 = __importDefault(require("../../../config/env.config"));
const secret_manager_config_1 = require("../../../config/secret-manager.config");
const common_1 = require("@nestjs/common");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const firebase_controller_1 = require("./firebase.controller");
const types_1 = require("./types");
const firebaseProvider = {
    provide: types_1.FIREBASE_PROVIDER_TOKEN,
    useFactory: async (firebaseOptions) => {
        const firebaseSecretName = (0, env_config_1.default)().firebaseSecretName;
        const serviceAccount = await (0, secret_manager_config_1.getSecret)(firebaseSecretName);
        (0, app_1.initializeApp)({
            credential: (0, app_1.cert)(serviceAccount),
        });
        const db = (0, firestore_1.getFirestore)().doc(firebaseOptions.firestoreBasePath);
        return { db };
    },
    inject: [{ token: 'FIREBASE_OPTIONS', optional: true }],
};
let FirebaseModule = FirebaseModule_1 = class FirebaseModule {
    static forRoot(options) {
        var _a;
        const firestoreBasePath = `${(_a = (0, env_config_2.default)().stage) !== null && _a !== void 0 ? _a : 'development'}/${options.firestoreMainDoc}`;
        const firebaseOptions = {
            firestoreBasePath,
        };
        return {
            module: FirebaseModule_1,
            providers: [
                { provide: 'FIREBASE_OPTIONS', useValue: firebaseOptions },
                firebaseProvider,
            ],
            exports: [firebaseProvider],
            controllers: [firebase_controller_1.FirebaseController],
        };
    }
};
FirebaseModule = FirebaseModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], FirebaseModule);
exports.FirebaseModule = FirebaseModule;
//# sourceMappingURL=firebase.module.js.map