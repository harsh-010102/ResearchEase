import { Document } from 'mongoose';
import { Collection } from '../schemas';
import { ResearchPaper } from 'src/research-papers/schemas';

// Interface for Collection Document
export interface CollectionDoc extends Collection, Document {
  _id: string;
}

// Interface for ResearchPaper Document
export interface ResearchPaperDoc extends ResearchPaper, Document {
  _id: string;
}
