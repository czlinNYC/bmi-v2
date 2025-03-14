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
exports.ProspectsController = void 0;
const common_1 = require("@nestjs/common");
const prospects_service_1 = require("./prospects.service");
let phoneQueueInProgress = false;
let emailQueueInProgress = false;
let emailQueue = [];
let phoneQueue = [];
let ProspectsController = class ProspectsController {
    constructor(prospectsService) {
        this.prospectsService = prospectsService;
    }
    async createMany(email, phone, DNC, prospects) {
        console.log('ROUTE HIT', phone, DNC, email, prospects);
        const cleanPhone = (phoneString) => {
            if (phoneString) {
                return Number(phoneString.replace(/[^\d]+/g, '').substr(-10));
            }
            else {
                return '0000000000';
            }
        };
        const addToeMailQueue = async (prospects) => {
            if (emailQueueInProgress === true) {
                emailQueue = [...emailQueue, ...prospects];
            }
            else {
                const processEmailQueue = async () => {
                    console.log('email queue starting');
                    if (emailQueue.length === 0) {
                        emailQueue = prospects;
                        emailQueueInProgress = true;
                        setTimeout(processEmailQueue, 5000);
                    }
                    else if (emailQueue.length > 200) {
                        let results = await this.prospectsService.validateEmail(emailQueue.splice(0, 200));
                        for (let prospect of results) {
                            await this.prospectsService.update(prospect.id, prospect);
                        }
                        setTimeout(processEmailQueue, 21000);
                    }
                    else {
                        let results = await this.prospectsService.validateEmail(emailQueue.splice(0));
                        for (let prospect of results) {
                            await this.prospectsService.update(prospect.id, prospect);
                        }
                        emailQueueInProgress = false;
                    }
                };
                processEmailQueue();
            }
        };
        const addToPhoneQueue = async (prospects) => {
            if (phoneQueueInProgress) {
                phoneQueue = [...phoneQueue, ...prospects];
            }
            else {
                phoneQueue = [...phoneQueue, ...prospects];
                phoneQueueInProgress = true;
                processPhoneQueue();
            }
        };
        const processPhoneQueue = async () => {
            if (phoneQueue.length === 0) {
                phoneQueueInProgress = false;
                return;
            }
            let phoneSplice = phoneQueue.splice(0, 1)[0];
            console.log(phoneSplice, 'PHONE SPLICE---------------------');
            let results = await this.prospectsService.validatePhone([phoneSplice], phone, DNC);
            for (let prospect of results) {
                await this.prospectsService.update(prospect.id, prospect);
            }
            setTimeout(processPhoneQueue, 240);
        };
        let submittedProspects = await this.prospectsService.createMany(prospects);
        submittedProspects = submittedProspects.map((prospect) => {
            return { ...prospect, ...{ phone: cleanPhone(prospect.phone) } };
        });
        if (email === 'true') {
            addToeMailQueue(submittedProspects);
        }
        if (phone === 'true' || DNC === 'true') {
            addToPhoneQueue(submittedProspects);
        }
        return submittedProspects;
    }
    create(prospect) {
        return this.prospectsService.create(prospect);
    }
    findAll(page = 0) {
        return this.prospectsService.findAll(page);
    }
    findOne(id) {
        return this.prospectsService.findOne(+id);
    }
    update(id, prospect) {
        return this.prospectsService.update(+id, prospect);
    }
    remove(id) {
        return this.prospectsService.remove(+id);
    }
};
exports.ProspectsController = ProspectsController;
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Query)('phone')),
    __param(2, (0, common_1.Query)('DNC')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Array]),
    __metadata("design:returntype", Promise)
], ProspectsController.prototype, "createMany", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProspectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProspectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProspectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProspectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProspectsController.prototype, "remove", null);
exports.ProspectsController = ProspectsController = __decorate([
    (0, common_1.Controller)('api/prospects'),
    __metadata("design:paramtypes", [prospects_service_1.ProspectsService])
], ProspectsController);
//# sourceMappingURL=prospects.controller.js.map