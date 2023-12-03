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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UserDto } from 'src/users/dtos';
export declare class CollectionsController {
    private readonly collectionsService;
    constructor(collectionsService: CollectionsService);
    create(user: UserDto, createCollectionDto: CreateCollectionDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas").CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | "This action adds a new collection">;
    addPaper(id: string, body: any, user: UserDto): Promise<import("./dto/interface").CollectionDoc>;
    removeResearchPaperFromCollection(id: string, body: {
        id: string;
    }, user: UserDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas").CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(user: UserDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schemas").CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findOne(id: string, user: UserDto): Promise<string | (import("mongoose").Document<unknown, {}, import("./schemas").CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    update(id: string, updateCollectionDto: {
        collectionName: string;
    }, user: UserDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas").CollectionDocument> & import("./schemas").Collection & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string, user: UserDto): Promise<string | {
        statusCode: number;
        message: string;
    }>;
}
