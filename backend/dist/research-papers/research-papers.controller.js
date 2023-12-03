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
exports.ResearchPapersController = void 0;
const common_1 = require("@nestjs/common");
const research_papers_service_1 = require("./research-papers.service");
const create_research_paper_dto_1 = require("./dto/create-research-paper.dto");
const strategy_1 = require("../auth/strategy");
const user_decorator_1 = require("../utility/user-decorator");
const dtos_1 = require("../users/dtos");
let ResearchPapersController = class ResearchPapersController {
    constructor(researchPapersService) {
        this.researchPapersService = researchPapersService;
    }
    create(user, createResearchPaperDto) {
        return this.researchPapersService.create(createResearchPaperDto, user);
    }
    findAll(user) {
        return this.researchPapersService.findAll(user);
    }
    findOne(id, user) {
        return this.researchPapersService.findOne(id, user);
    }
    remove(id) {
        return this.researchPapersService.remove(id);
    }
    addCommentToResearchPaper(researchPaperId, comment, user) {
        return this.researchPapersService.addCommentToResearchPaper(user, researchPaperId, comment);
    }
};
__decorate([
    (0, common_1.UseGuards)(strategy_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserDto,
        create_research_paper_dto_1.CreateResearchPaperDto]),
    __metadata("design:returntype", void 0)
], ResearchPapersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(strategy_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserDto]),
    __metadata("design:returntype", void 0)
], ResearchPapersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(strategy_1.JwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UserDto]),
    __metadata("design:returntype", void 0)
], ResearchPapersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(strategy_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResearchPapersController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(strategy_1.JwtGuard),
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, dtos_1.UserDto]),
    __metadata("design:returntype", void 0)
], ResearchPapersController.prototype, "addCommentToResearchPaper", null);
ResearchPapersController = __decorate([
    (0, common_1.Controller)('research-papers'),
    __metadata("design:paramtypes", [research_papers_service_1.ResearchPapersService])
], ResearchPapersController);
exports.ResearchPapersController = ResearchPapersController;
//# sourceMappingURL=research-papers.controller.js.map