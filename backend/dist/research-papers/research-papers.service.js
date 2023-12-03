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
exports.ResearchPapersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ResearchPapersService = class ResearchPapersService {
    constructor(researchPaperModel) {
        this.researchPaperModel = researchPaperModel;
    }
    async create(createResearchPaperDto, user) {
        const { name, url, description, comments } = createResearchPaperDto;
        try {
            const researchPaper = new this.researchPaperModel({
                name,
                url,
                description,
                comments,
                userId: user.id,
            });
            const researchPaperResp = await researchPaper.save();
            return {
                statusCode: 201,
                data: researchPaperResp,
            };
        }
        catch (error) {
            if (error.code === 11000 &&
                error.keyPattern &&
                error.keyPattern.uniqueNameUserIdCombination) {
                throw new common_1.ConflictException('A research paper with this name already exists for the user.');
            }
            else {
                throw new common_1.InternalServerErrorException('Unable to create the research paper.');
            }
        }
    }
    async findAll(user) {
        const researchPapers = await this.researchPaperModel
            .find({ userId: user.id })
            .populate('userId', 'name email')
            .exec();
        if (!researchPapers) {
            return {
                statusCode: 404,
                data: 'Papers not found',
            };
        }
        return {
            statusCode: 200,
            data: researchPapers,
        };
    }
    async findOne(id, user) {
        const researchPaper = await this.researchPaperModel
            .findOne({
            _id: id,
            userId: user.id,
        })
            .populate('userId', 'name email')
            .exec();
        if (!researchPaper) {
            throw new common_1.NotFoundException(`Research Paper with ID ${id} not found`);
        }
        return {
            statusCode: 200,
            data: researchPaper,
        };
    }
    async remove(id) {
        const deletedPaper = await this.researchPaperModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedPaper) {
            throw new common_1.NotFoundException(`Research Paper with ID ${id} not found`);
        }
        return {
            statusCode: 202,
            message: `Research paper with #${id} is removed`,
        };
    }
    async addCommentToResearchPaper(user, researchPaperId, comment) {
        const researchPaper = await this.researchPaperModel.findOne({
            _id: researchPaperId,
            userId: user.id,
        });
        if (!researchPaper) {
            throw new common_1.NotFoundException('Research paper not found or you do not have permission to add a comment.');
        }
        researchPaper.comments.push(comment);
        const researchPaperResp = await researchPaper.save();
        try {
            return {
                statusCode: 201,
                data: researchPaperResp,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to add the comment to the research paper.');
        }
    }
};
ResearchPapersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('ResearchPaper')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ResearchPapersService);
exports.ResearchPapersService = ResearchPapersService;
//# sourceMappingURL=research-papers.service.js.map