/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UserDto } from 'src/users/dtos';
import { CollectionDocument } from './schemas';
import { Model } from 'mongoose';
import { ResearchPaperDocument } from 'src/research-papers/schemas';
import { CollectionDoc } from './dto/interface';
export declare class CollectionsService {
    private readonly collectionModel;
    private researchPaperModel;
    constructor(collectionModel: Model<CollectionDocument>, researchPaperModel: Model<ResearchPaperDocument>);
    create(createCollectionDto: CreateCollectionDto, user: UserDto): Promise<(import("mongoose").Document<unknown, {}, CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | "This action adds a new collection">;
    addPaper(collectionId: string, researchPaperId: string, user: UserDto): Promise<CollectionDoc>;
    findAll(userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findOne(id: string, user: UserDto): Promise<string | (import("mongoose").Document<unknown, {}, CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    update(id: string, updateCollectionDto: {
        collectionName: string;
    }): string;
    remove(id: string, user: UserDto): Promise<string | {
        statusCode: number;
        message: string;
    }>;
    removeResearchPaperFromCollection(collectionId: string, researchPaperId: string, user: UserDto): Promise<import("mongoose").Document<unknown, {}, CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateCollectionName(collectionId: string, updatedName: string, user: UserDto): Promise<import("mongoose").Document<unknown, {}, CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
