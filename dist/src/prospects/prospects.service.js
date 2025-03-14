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
exports.ProspectsService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const moment = require("moment");
const ZeroBounceSDK = require('@zerobounce/zero-bounce-sdk');
const zeroBounce = new ZeroBounceSDK();
const token = '009D01D4-7320-40F4-806F-B3881FCDB677';
zeroBounce.init('171bee1d04f34fd28031d562f441f296');
let ProspectsService = class ProspectsService {
    constructor(knex) {
        this.knex = knex;
    }
    async create(prospect) {
        try {
            const newProspect = await this.knex
                .table('prospects')
                .insert({ ...prospect })
                .returning('*');
            return newProspect;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async createMany(prospects) {
        let submittedProspects = [];
        for (const prospect of prospects) {
            try {
                let newProspect = await this.create(prospect);
                submittedProspects.push(newProspect[0]);
            }
            catch (error) {
                console.log(prospect, 'FAILED---- Prospect');
                console.log(error);
                return error;
            }
        }
        return submittedProspects;
    }
    async validateEmail(prospects) {
        let emailsOnly = prospects.map((prospect) => {
            return { email_address: prospect.email };
        });
        try {
            let results = await zeroBounce.validateBatch(emailsOnly);
            results = results.email_batch;
            let validatedProspects = prospects.map((prospect, index) => {
                return {
                    ...prospect,
                    ...{
                        email_verified: results[index].status === 'invalid' ? false : true,
                        email_status: results[index].status,
                        email_sub_status: results[index].sub_status,
                        email_type: results[index].free_email === true
                            ? 'free'
                            : 'professional'
                    }
                };
            });
            return validatedProspects;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async validatePhone(prospects, phone, DNC) {
        try {
            console.log(prospects, 'function called in service', phone, 'PHONE', DNC, 'DNC');
            let response;
            let DNCresponse;
            if (phone === 'true') {
                console.log('phone called');
                response =
                    await fetch(`https://api.realvalidation.com/rpvWebService/TurboV3.php?output=json&phone=${prospects[0].phone}&token=
${token}`);
                response = await response.json();
            }
            if (DNC === 'true') {
                DNCresponse =
                    await fetch(`https://api.realvalidation.com/rpvWebService/DNCPlus.php?output=json&phone=${prospects[0].phone}&token=
${token}`);
                DNCresponse = await DNCresponse.json();
            }
            let DNCstatus = false;
            if (DNCresponse.state_dnc === 'Y' ||
                DNCresponse.national_dnc === 'Y' ||
                DNCresponse.litigator === 'Y') {
                DNCstatus = true;
            }
            console.log(response, 'RESPONSE JSON');
            console.log(DNCresponse, 'DNC_response here');
            console.log([
                {
                    ...prospects[0],
                    ...{
                        phone_verified: true,
                        phone_status: response.status,
                        phone_type: response.caller_type,
                        phone_DNC: DNCstatus
                    }
                }
            ], 'stuff');
            return [
                {
                    ...prospects[0],
                    ...{
                        phone_verified: true,
                        phone_status: response.status,
                        phone_type: response.caller_type,
                        phone_DNC: DNCstatus
                    }
                }
            ];
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAll(page) {
        try {
            const prospects = await this.knex
                .table('prospects')
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
            const prospect = await this.knex
                .table('prospects')
                .where({ id })
                .first()
                .then((row) => row);
            return prospect;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async update(id, prospect) {
        try {
            let now = moment.utc().format();
            const modifiedProspect = await this.knex('prospects')
                .where('id', id)
                .update({
                ...prospect,
                updated_at: now
            })
                .returning('*');
            return modifiedProspect;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async remove(id) {
        try {
            const removed = await this.knex
                .table('prospects')
                .where('id', id)
                .delete('*');
            return { ...removed, message: 'This prospect has been deleted' };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async removeAll(id) {
        try {
            const removed = await this.knex
                .table('prospects')
                .where('batch_id', id)
                .delete('*');
            console.log(removed);
            return {
                ...removed,
                message: 'The prospects from this batch have been deleted'
            };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.ProspectsService = ProspectsService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProspectsService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProspectsService.prototype, "createMany", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProspectsService.prototype, "validateEmail", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, String]),
    __metadata("design:returntype", Promise)
], ProspectsService.prototype, "validatePhone", null);
exports.ProspectsService = ProspectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], ProspectsService);
//# sourceMappingURL=prospects.service.js.map