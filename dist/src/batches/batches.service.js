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
exports.BatchesService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
let BatchesService = class BatchesService {
    constructor(knex) {
        this.knex = knex;
    }
    async create(batch) {
        try {
            const newBatch = await this.knex
                .table('batches')
                .insert({ ...batch })
                .returning('*');
            return newBatch;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findAll(page) {
        try {
            const batches = await this.knex
                .table('batches')
                .limit(100)
                .offset(page * 100);
            return batches;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    findOne(id) {
        return `This action returns a #${id} batch`;
    }
    update(id, updateBatchDto) {
        return `This action updates a #${id} batch`;
    }
    async remove(id) {
        try {
            const removed = await this.knex
                .table('batches')
                .where('id', id)
                .delete('*');
            return {
                ...removed,
                message: `This batch has been deleted, along with the ${removed[0].entries} entries within it.`
            };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.BatchesService = BatchesService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BatchesService.prototype, "create", null);
exports.BatchesService = BatchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], BatchesService);
//# sourceMappingURL=batches.service.js.map