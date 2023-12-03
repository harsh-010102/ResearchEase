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
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { JwtGuard } from 'src/auth/strategy';
import { User } from 'src/utility/user-decorator';
import { UserDto } from 'src/users/dtos';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @User() user: UserDto,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    return this.collectionsService.create(createCollectionDto, user);
  }

  @UseGuards(JwtGuard)
  @Post(':id/add')
  addPaper(@Param('id') id: string, @Body() body, @User() user: UserDto) {
    const researchPaperId = body.id;
    return this.collectionsService.addPaper(id, researchPaperId, user);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/remove')
  removeResearchPaperFromCollection(
    @Param('id') id: string,
    @Body() body: { id: string },
    @User() user: UserDto,
  ) {
    const researchPaperId = body.id;
    return this.collectionsService.removeResearchPaperFromCollection(
      id,
      researchPaperId,
      user,
    );
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@User() user: UserDto) {
    return this.collectionsService.findAll(user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserDto) {
    return this.collectionsService.findOne(id, user);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: { collectionName: string },
    @User() user: UserDto,
  ) {
    const nameToBeUpdate = updateCollectionDto.collectionName;
    return this.collectionsService.updateCollectionName(
      id,
      nameToBeUpdate,
      user,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserDto) {
    return this.collectionsService.remove(id, user);
  }
}
