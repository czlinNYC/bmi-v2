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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const moment = require("moment");
let UsersService = class UsersService {
    constructor(knex) {
        this.knex = knex;
    }
    async create(user) {
        try {
            const newUser = await this.knex
                .table('users')
                .insert({ ...user })
                .returning('*');
            return newUser;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findAll() {
        try {
            const users = await this.knex.table('users');
            return users;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOne(id) {
        try {
            const user = await this.knex
                .table('users')
                .where({ id })
                .first()
                .then((row) => row);
            return user;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async update(id, user) {
        try {
            let now = moment.utc().format();
            const modifiedUser = await this.knex('users')
                .where('id', id)
                .update({
                ...user,
                updated_at: now
            })
                .returning('*');
            return modifiedUser;
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
            return { ...removed, message: 'This user has been deleted' };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.UsersService = UsersService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "create", null);
__decorate([
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "update", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], UsersService);
//# sourceMappingURL=users.service.js.map