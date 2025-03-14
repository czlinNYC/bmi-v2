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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const moment = require("moment");
let CompaniesService = class CompaniesService {
    constructor(knex) {
        this.knex = knex;
    }
    async create(company) {
        try {
            const newcompany = await this.knex
                .table('companies')
                .insert({ ...company })
                .returning('*');
            return newcompany;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findAll() {
        try {
            const companies = await this.knex.table('companies');
            return companies;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOne(id) {
        try {
            const company = await this.knex
                .table('companies')
                .where({ id })
                .first()
                .then((row) => row);
            return company;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async update(id, company) {
        try {
            let now = moment.utc().format();
            const modifiedcompany = await this.knex('companies')
                .where('id', id)
                .update({
                ...company,
                updated_at: now
            })
                .returning('*');
            return modifiedcompany;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async remove(id) {
        try {
            const removed = await this.knex
                .table('companies')
                .where('id', id)
                .delete('*');
            return { ...removed, message: 'This company has been deleted' };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.CompaniesService = CompaniesService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompaniesService.prototype, "create", null);
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map