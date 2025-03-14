"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const moment = require("moment");
let OrganizationsService = class OrganizationsService {
    constructor(knex) {
        this.knex = knex;
    }
    async create(organization) {
        try {
            const newOrganization = await this.knex
                .table('users')
                .insert({ ...organization })
                .returning('*');
            return newOrganization;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findAll(page) {
        try {
            const prospects = await this.knex
                .table('organizations')
                .limit(100)
                .offset(page * 100);
            return prospects;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOne(id) {
        try {
            const organization = await this.knex
                .table('organizations')
                .where({ id })
                .first()
                .then((row) => row);
            return organization;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async update(id, organization) {
        try {
            let now = moment.utc().format();
            const modifiedOrg = await this.knex('organization')
                .where('id', id)
                .update({
                ...organization,
                updated_at: now
            })
                .returning('*');
            return modifiedOrg;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async remove(id) {
        try {
            const removed = await this.knex
                .table('users')
                .where('id', id)
                .delete('*');
            return {
                ...removed,
                message: 'This organization has been deleted'
            };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.OrganizationsService = OrganizationsService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationsService.prototype, "create", null);
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map