import { Document } from 'mongoose';
import { Collection } from '../schemas';
import { ResearchPaper } from 'src/research-papers/schemas';
export interface CollectionDoc extends Collection, Document {
    _id: string;
}
export interface ResearchPaperDoc extends ResearchPaper, Document {
    _id: string;
}
