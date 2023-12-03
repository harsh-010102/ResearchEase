import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchPaperSchema } from 'src/research-papers/schemas';
import { CollectionSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ResearchPaper', schema: ResearchPaperSchema },
      { name: 'Collection', schema: CollectionSchema },
    ]),
  ],

  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
