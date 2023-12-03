import { PartialType } from '@nestjs/mapped-types';
import { CreateResearchPaperDto } from './create-research-paper.dto';

export class UpdateResearchPaperDto extends PartialType(
  CreateResearchPaperDto,
) {}
