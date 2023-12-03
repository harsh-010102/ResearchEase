"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResearchPaperDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_research_paper_dto_1 = require("./create-research-paper.dto");
class UpdateResearchPaperDto extends (0, mapped_types_1.PartialType)(create_research_paper_dto_1.CreateResearchPaperDto) {
}
exports.UpdateResearchPaperDto = UpdateResearchPaperDto;
//# sourceMappingURL=update-research-paper.dto.js.map