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
}
