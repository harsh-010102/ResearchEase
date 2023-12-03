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
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
export type ResearchPaperDocument = ResearchPaper & Document;
export declare class ResearchPaper {
    name: string;
    url: string;
    description: string;
    comments: string[];
    userId: User;
}
export declare const ResearchPaperSchema: import("mongoose").Schema<ResearchPaper, import("mongoose").Model<ResearchPaper, any, any, any, Document<unknown, any, ResearchPaper> & ResearchPaper & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ResearchPaper, Document<unknown, {}, import("mongoose").FlatRecord<ResearchPaper>> & import("mongoose").FlatRecord<ResearchPaper> & {
    _id: import("mongoose").Types.ObjectId;
}>;
