import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';
import { ResearchPaper } from 'src/research-papers/schemas';
import { User } from 'src/users/schemas/user.schema';
import { ResearchPaperDoc } from '../dto/interface';

export type CollectionDocument = Collection & Document;

@Schema()
export class Collection {
  @Prop({ required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' }) // Reference to User schema
  userId: User;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'ResearchPaper' }] }) // Reference to User schema
  researchPapers: ResearchPaperDoc[]; // Assume a research paper can have multiple authors (users)
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
CollectionSchema.index({ userId: 1, name: 1 }, { unique: true });
