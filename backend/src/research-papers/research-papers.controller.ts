import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResearchPapersService } from './research-papers.service';
import { CreateResearchPaperDto } from './dto/create-research-paper.dto';
import { UpdateResearchPaperDto } from './dto/update-research-paper.dto';
import { JwtGuard } from 'src/auth/strategy';
import { User } from 'src/utility/user-decorator';
import { UserDto } from 'src/users/dtos';

@Controller('research-papers')
export class ResearchPapersController {
  constructor(private readonly researchPapersService: ResearchPapersService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @User() user: UserDto,
    @Body() createResearchPaperDto: CreateResearchPaperDto,
  ) {
    return this.researchPapersService.create(createResearchPaperDto, user);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@User() user: UserDto) {
    return this.researchPapersService.findAll(user);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserDto) {
    return this.researchPapersService.findOne(id, user);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateResearchPaperDto: UpdateResearchPaperDto,
  // ) {
  //   return this.researchPapersService.update(id, updateResearchPaperDto);
  // }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchPapersService.remove(id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/comments')
  addCommentToResearchPaper(
    @Param('id') researchPaperId: string,
    @Body('comment') comment: string,
    @User() user: UserDto,
  ) {
    return this.researchPapersService.addCommentToResearchPaper(
      user,
      researchPaperId,
      comment,
    );
  }
}
