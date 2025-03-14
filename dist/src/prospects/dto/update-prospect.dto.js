"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProspectDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_prospect_dto_1 = require("./create-prospect.dto");
class UpdateProspectDto extends (0, mapped_types_1.PartialType)(create_prospect_dto_1.CreateProspectDto) {
}
exports.UpdateProspectDto = UpdateProspectDto;
//# sourceMappingURL=update-prospect.dto.js.map