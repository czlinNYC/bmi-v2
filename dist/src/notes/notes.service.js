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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const moment = require("moment");
function sortNotesByCreatedAtDesc(notes) {
    return notes.sort((a, b) => {
        const dateA = moment(a.created_at);
        const dateB = moment(b.created_at);
        return dateB.diff(dateA);
    });
}
let NotesService = class NotesService {
    constructor(knex) {
        this.knex = knex;
    }
    async create(note) {
        try {
            const newnote = await this.knex
                .table('notes')
                .insert({ ...note })
                .returning('*');
            return newnote;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findAll(page, prospect_id) {
        try {
            const notes = await this.knex
                .table('notes')
                .where('prospect_id', prospect_id)
                .limit(100)
                .offset(page * 100);
            const sortedNotes = sortNotesByCreatedAtDesc(notes);
            console.log(sortedNotes);
            return sortedNotes;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    findOne(id) {
        return `This action returns a #${id} note`;
    }
    update(id, note) {
        return `This action updates a #${id} notes`;
    }
    async remove(id) {
        try {
            const removed = await this.knex
                .table('notes')
                .where('id', id)
                .delete('*');
            return {
                ...removed,
                message: `This note has been deleted, along with the ${removed[0].entries} entries within it.`
            };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.NotesService = NotesService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesService.prototype, "create", null);
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], NotesService);
//# sourceMappingURL=notes.service.js.map