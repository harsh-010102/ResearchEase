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
exports.CollectionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CollectionsService = class CollectionsService {
    constructor(collectionModel, researchPaperModel) {
        this.collectionModel = collectionModel;
        this.researchPaperModel = researchPaperModel;
    }
    async create(createCollectionDto, user) {
        const { name } = createCollectionDto;
        if (!name) {
            throw new common_1.BadRequestException('Name is required');
        }
        const existingCollection = await this.collectionModel.findOne({
            name,
            userId: user.id,
        });
        if (existingCollection) {
            throw new common_1.ConflictException('A collection with the same name already exists');
        }
        const newCollection = new this.collectionModel({
            name,
            userId: user.id,
            researchPapers: [],
        });
        try {
            return await newCollection.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create the collection');
        }
        return 'This action adds a new collection';
    }
    async addPaper(collectionId, researchPaperId, user) {
        const existingCollection = (await this.collectionModel.findOne({
            _id: collectionId,
            userId: user.id,
        }));
        if (!existingCollection) {
            throw new common_1.NotFoundException('Collection not found or you do not have permission to add research paper');
        }
        const researchPaper = (await this.researchPaperModel.findOne({
            _id: researchPaperId,
        }));
        if (!researchPaper) {
            throw new common_1.NotFoundException('Research paper not found');
        }
        const isResearchPaperInCollection = existingCollection.researchPapers.some((paper) => paper._id.toString() === researchPaperId);
        if (!isResearchPaperInCollection) {
            existingCollection.researchPapers.push(researchPaper);
        }
        else {
            throw new common_1.ConflictException('A research paper with the same name already exists in the collection');
        }
        try {
            return await existingCollection.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to add the research paper to the collection');
        }
    }
    async findAll(userId) {
        try {
            const collections = await this.collectionModel
                .find({ userId })
                .populate('researchPapers');
            if (!collections) {
                throw new common_1.NotFoundException('Collections not found');
            }
            return collections;
        }
        catch (error) {
            throw new common_1.NotFoundException('Collections not found');
        }
    }
    async findOne(id, user) {
        const collection = await this.collectionModel
            .findOne({ _id: id, userId: user.id })
            .populate('researchPapers')
            .exec();
        if (!collection) {
            throw new common_1.NotFoundException('Collection not found');
        }
        return collection;
        return `This action returns a #${id} collection`;
    }
    update(id, updateCollectionDto) {
        return `This action updates a #${id} collection`;
    }
    async remove(id, user) {
        const existingCollection = await this.collectionModel.findOne({
            _id: id,
            userId: user.id,
        });
        if (!existingCollection) {
            throw new common_1.NotFoundException('Collection not found or you do not have permission to delete it');
        }
        try {
            await this.collectionModel.findByIdAndDelete(id).exec();
            return {
                statusCode: 202,
                message: "'Collection deleted successfully' ",
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete the collection');
        }
        return `This action removes a #${id} collection`;
    }
    async removeResearchPaperFromCollection(collectionId, researchPaperId, user) {
        const existingCollection = await this.collectionModel.findOne({
            _id: collectionId,
            userId: user.id,
        });
        if (!existingCollection) {
            throw new common_1.NotFoundException('Collection not found or you do not have permission to remove research paper');
        }
        const researchPaperIndex = existingCollection.researchPapers.findIndex((paperId) => paperId.toString() === researchPaperId);
        if (researchPaperIndex === -1) {
            throw new common_1.NotFoundException('Research paper not found in the collection');
        }
        existingCollection.researchPapers.splice(researchPaperIndex, 1);
        try {
            return await existingCollection.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to remove the research paper from the collection');
        }
    }
    async updateCollectionName(collectionId, updatedName, user) {
        const existingCollection = await this.collectionModel.findOne({
            _id: collectionId,
            userId: user.id,
        });
        if (!existingCollection) {
            throw new common_1.NotFoundException('Collection not found or you do not have permission to update it');
        }
        try {
            existingCollection.name = updatedName;
            return await existingCollection.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update the collection name');
        }
    }
};
CollectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Collection')),
    __param(1, (0, mongoose_2.InjectModel)('ResearchPaper')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], CollectionsService);
exports.CollectionsService = CollectionsService;
//# sourceMappingURL=collections.service.js.map