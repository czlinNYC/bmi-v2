"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const path_1 = require("path");
const app_service_1 = require("./app.service");
const serve_static_1 = require("@nestjs/serve-static");
const nest_knexjs_1 = require("nest-knexjs");
const users_module_1 = require("./users/users.module");
const prospects_module_1 = require("./prospects/prospects.module");
const companies_module_1 = require("./companies/companies.module");
const organizations_module_1 = require("./organizations/organizations.module");
const teams_module_1 = require("./teams/teams.module");
const roles_module_1 = require("./roles/roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
const batches_module_1 = require("./batches/batches.module");
const notes_module_1 = require("./notes/notes.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../', 'client/build'),
                exclude: ['api/*']
            }),
            nest_knexjs_1.KnexModule.forRootAsync({
                useFactory: () => ({
                    config: {
                        client: 'pg',
                        connection: 'postgresql://blue_max_dev_owner:PvU1fWIzSc7u@ep-lucky-hat-a65zlnzq.us-west-2.aws.neon.tech/blue_max_dev?sslmode=require',
                        searchPath: ['knex', 'public']
                    }
                })
            }),
            users_module_1.UsersModule,
            prospects_module_1.ProspectsModule,
            companies_module_1.CompaniesModule,
            organizations_module_1.OrganizationsModule,
            teams_module_1.TeamsModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            batches_module_1.BatchesModule,
            notes_module_1.NotesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map