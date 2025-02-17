"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const parse_database_url_1 = __importDefault(require("parse-database-url"));
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const env_config_1 = __importDefault(require("./env.config"));
const path_1 = require("path");
const config = (0, parse_database_url_1.default)((0, env_config_1.default)().databaseURL);
exports.typeOrmConfig = {
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,
    database: config.database,
    entities: [(0, path_1.join)(__dirname, '/../**/**.entity{.ts,.js}')],
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
};
const ormConfig = Object.assign(Object.assign({}, exports.typeOrmConfig), { migrationsTableName: 'migrations', migrations: ['migrations/*.ts'], cli: {
        migrationsDir: 'migrations',
    } });
exports.default = ormConfig;
//# sourceMappingURL=orm.config.js.map