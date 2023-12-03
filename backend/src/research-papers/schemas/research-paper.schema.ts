import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ResearchPaperDocument = ResearchPaper & Document;

@Schema()
export class ResearchPaper {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: String }] }) // Array of strings for comments
  comments: string[];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  }) // Reference to User schema
  userId: User;
}

export const ResearchPaperSchema = SchemaFactory.createForClass(ResearchPaper);
ResearchPaperSchema.index({ userId: 1, name: 1 }, { unique: true });
