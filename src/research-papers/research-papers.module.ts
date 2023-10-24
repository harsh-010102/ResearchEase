import { Module } from '@nestjs/common';
import { ResearchPapersService } from './research-papers.service';
import { ResearchPapersController } from './research-papers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchPaperSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ResearchPaper', schema: ResearchPaperSchema },
    ]),
  ],

  controllers: [ResearchPapersController],
  providers: [ResearchPapersService],
})
export class ResearchPapersModule {}
