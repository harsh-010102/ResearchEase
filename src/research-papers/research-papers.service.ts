import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResearchPaperDto } from './dto/create-research-paper.dto';
import { UpdateResearchPaperDto } from './dto/update-research-paper.dto';
import { ResearchPaperDocument } from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dtos';

@Injectable()
export class ResearchPapersService {
  constructor(
    @InjectModel('ResearchPaper')
    private readonly researchPaperModel: Model<ResearchPaperDocument>,
  ) {}

  async create(createResearchPaperDto: CreateResearchPaperDto, user: UserDto) {
    const { name, url, description, comments } = createResearchPaperDto;
    try {
      const researchPaper = new this.researchPaperModel({
        name,
        url,
        description,
        comments,
        userId: user.id,
      });
      const researchPaperResp = await researchPaper.save();
      return {
        statusCode: 201,
        data: researchPaperResp,
      };
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.uniqueNameUserIdCombination
      ) {
        throw new ConflictException(
          'A research paper with this name already exists for the user.',
        );
      } else {
        // Handle other errors
        throw new InternalServerErrorException(
          'Unable to create the research paper.',
        );
      }
    }
  }

  async findAll(user: UserDto) {
    const researchPapers = await this.researchPaperModel
      .find({ userId: user.id })
      .populate('userId', 'name email')
      .exec();
    if (!researchPapers) {
      return {
        statusCode: 404,
        data: 'Papers not found',
      };
    }
    return {
      statusCode: 200,
      data: researchPapers,
    };
  }

  async findOne(id: string, user: UserDto) {
    const researchPaper = await this.researchPaperModel
      .findOne({
        _id: id,
        userId: user.id,
      })
      .populate('userId', 'name email')
      .exec();
    if (!researchPaper) {
      throw new NotFoundException(`Research Paper with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      data: researchPaper,
    };
  }

  async remove(id: string) {
    const deletedPaper = await this.researchPaperModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedPaper) {
      throw new NotFoundException(`Research Paper with ID ${id} not found`);
    }
    return {
      statusCode: 202,
      message: `Research paper with #${id} is removed`,
    };
  }

  async addCommentToResearchPaper(
    user: UserDto,
    researchPaperId: string,
    comment: string,
  ) {
    const researchPaper = await this.researchPaperModel.findOne({
      _id: researchPaperId,
      userId: user.id,
    });

    if (!researchPaper) {
      throw new NotFoundException(
        'Research paper not found or you do not have permission to add a comment.',
      );
    }

    researchPaper.comments.push(comment);
    const researchPaperResp = await researchPaper.save();
    try {
      return {
        statusCode: 201,
        data: researchPaperResp,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to add the comment to the research paper.',
      );
    }
  }

  getGraphData(user: UserDto) {
    const data = {
      nodes: [
        { id: 'id1', name: 'name1', val: 1 },
        { id: 'id2', name: 'name2', val: 10 },
        { id: 'id3', name: 'name3', val: 5 },
        { id: 'id4', name: 'name4', val: 8 },
        { id: 'id5', name: 'name5', val: 3 },
        { id: 'id6', name: 'name6', val: 7 },
        { id: 'id7', name: 'name7', val: 4 },
        { id: 'id8', name: 'name8', val: 12 },
        { id: 'id9', name: 'name9', val: 6 },
        { id: 'id10', name: 'name10', val: 9 },
        { id: 'id11', name: 'name11', val: 14 },
        { id: 'id12', name: 'name12', val: 2 },
        { id: 'id13', name: 'name13', val: 11 },
        { id: 'id14', name: 'name14', val: 15 },
        { id: 'id15', name: 'name15', val: 18 },
        { id: 'id16', name: 'name16', val: 20 },
        { id: 'id17', name: 'name17', val: 13 },
        { id: 'id18', name: 'name18', val: 17 },
        { id: 'id19', name: 'name19', val: 22 },
        { id: 'id20', name: 'name20', val: 25 },
        { id: 'id21', name: 'name21', val: 28 },
        { id: 'id22', name: 'name22', val: 30 },
        { id: 'id23', name: 'name23', val: 35 },
        { id: 'id24', name: 'name24', val: 38 },
        { id: 'id25', name: 'name25', val: 40 },
        { id: 'id26', name: 'name26', val: 45 },
        { id: 'id27', name: 'name27', val: 48 },
        { id: 'id28', name: 'name28', val: 50 },
        { id: 'id29', name: 'name29', val: 55 },
        { id: 'id30', name: 'name30', val: 58 },
        { id: 'id31', name: 'name31', val: 60 },
        { id: 'id32', name: 'name32', val: 62 },
        { id: 'id33', name: 'name33', val: 65 },
        { id: 'id34', name: 'name34', val: 68 },
        { id: 'id35', name: 'name35', val: 70 },
        { id: 'id36', name: 'name36', val: 75 },
        { id: 'id37', name: 'name37', val: 78 },
        { id: 'id38', name: 'name38', val: 80 },
        { id: 'id39', name: 'name39', val: 85 },
        { id: 'id40', name: 'name40', val: 88 },
        { id: 'id41', name: 'name41', val: 90 },
        { id: 'id42', name: 'name42', val: 92 },
        { id: 'id43', name: 'name43', val: 95 },
        { id: 'id44', name: 'name44', val: 98 },
        { id: 'id45', name: 'name45', val: 100 },
        { id: 'id46', name: 'name46', val: 105 },
        { id: 'id47', name: 'name47', val: 108 },
        { id: 'id48', name: 'name48', val: 110 },
        { id: 'id49', name: 'name49', val: 115 },
        { id: 'id50', name: 'name50', val: 118 },
      ],
      links: [
        { source: 'id1', target: 'id2' },
        { source: 'id2', target: 'id3' },
        { source: 'id3', target: 'id4' },
        { source: 'id4', target: 'id5' },
        { source: 'id5', target: 'id6' },
        { source: 'id6', target: 'id7' },
        { source: 'id7', target: 'id8' },
        { source: 'id8', target: 'id9' },
        { source: 'id9', target: 'id10' },
        { source: 'id11', target: 'id12' },
        { source: 'id13', target: 'id14' },
        { source: 'id15', target: 'id16' },
        { source: 'id17', target: 'id18' },
        { source: 'id19', target: 'id20' },
        { source: 'id21', target: 'id22' },
        { source: 'id23', target: 'id24' },
        { source: 'id25', target: 'id26' },
        { source: 'id27', target: 'id28' },
        { source: 'id29', target: 'id30' },
        { source: 'id31', target: 'id32' },
        { source: 'id33', target: 'id34' },
        { source: 'id35', target: 'id36' },
        { source: 'id37', target: 'id38' },
        { source: 'id39', target: 'id40' },
        { source: 'id41', target: 'id42' },
        { source: 'id43', target: 'id44' },
        { source: 'id45', target: 'id46' },
        { source: 'id47', target: 'id48' },
        { source: 'id49', target: 'id50' },
      ],
    };
    return data;
  }
}
