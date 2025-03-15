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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const moment = require("moment");
let TeamsService = class TeamsService {
    constructor(knex) {
        this.knex = knex;
    }
    async create(team) {
        try {
            const newteam = await this.knex
                .table('teams')
                .insert({ ...team })
                .returning('*');
            return newteam;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findAll() {
        try {
            const teams = await this.knex.table('teams');
            return teams;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOne(id) {
        try {
            const team = await this.knex
                .table('teams')
                .where({ id })
                .first()
                .then((row) => row);
            return team;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async update(id, team) {
        try {
            let now = moment.utc().format();
            const modifiedteam = await this.knex('teams')
                .where('id', id)
                .update({
                ...team,
                updated_at: now
            })
                .returning('*');
            return modifiedteam;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async remove(id) {
        try {
            const removed = await this.knex
                .table('teams')
                .where('id', id)
                .delete('*');
            return { ...removed, message: 'This team has been deleted' };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.TeamsService = TeamsService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamsService.prototype, "create", null);
__decorate([
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TeamsService.prototype, "update", null);
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], TeamsService);
//# sourceMappingURL=teams.service.js.map