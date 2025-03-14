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
exports.BatchesController = void 0;
const common_1 = require("@nestjs/common");
const batches_service_1 = require("./batches.service");
const update_batch_dto_1 = require("./dto/update-batch.dto");
const prospects_service_1 = require("../prospects/prospects.service");
let BatchesController = class BatchesController {
    constructor(batchesService, prospectService) {
        this.batchesService = batchesService;
        this.prospectService = prospectService;
    }
    create(batch) {
        return this.batchesService.create(batch);
    }
    findAll(page = 0) {
        return this.batchesService.findAll(page);
    }
    findOne(id) {
        return this.batchesService.findOne(+id);
    }
    update(id, updateBatchDto) {
        return this.batchesService.update(+id, updateBatchDto);
    }
    remove(id) {
        const prospectsRemoved = this.prospectService.removeAll(+id);
        return this.batchesService.remove(+id);
    }
};
exports.BatchesController = BatchesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BatchesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BatchesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BatchesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_batch_dto_1.UpdateBatchDto]),
    __metadata("design:returntype", void 0)
], BatchesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BatchesController.prototype, "remove", null);
exports.BatchesController = BatchesController = __decorate([
    (0, common_1.Controller)('api/batches'),
    __metadata("design:paramtypes", [batches_service_1.BatchesService,
        prospects_service_1.ProspectsService])
], BatchesController);
//# sourceMappingURL=batches.controller.js.map