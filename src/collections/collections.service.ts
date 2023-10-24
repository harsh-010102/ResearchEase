import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UserDto } from 'src/users/dtos';
import { CollectionDocument } from './schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResearchPaperDocument } from 'src/research-papers/schemas';
import { CollectionDoc, ResearchPaperDoc } from './dto/interface';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel('Collection')
    private readonly collectionModel: Model<CollectionDocument>,
    @InjectModel('ResearchPaper')
    private researchPaperModel: Model<ResearchPaperDocument>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto, user: UserDto) {
    const { name } = createCollectionDto;

    if (!name) {
      throw new BadRequestException('Name is required');
    }

    const existingCollection = await this.collectionModel.findOne({
      name,
      userId: user.id,
    });
    if (existingCollection) {
      throw new ConflictException(
        'A collection with the same name already exists',
      );
    }

    const newCollection = new this.collectionModel({
      name,
      userId: user.id,
      researchPapers: [],
    });

    try {
      return await newCollection.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create the collection');
    }
    return 'This action adds a new collection';
  }

  // async addPaper(collectionId: string, researchPaperId: string, user: UserDto) {
  //   const existingCollection = await this.collectionModel.findOne({
  //     _id: collectionId,
  //     userId: user.id,
  //   });
  //   if (!existingCollection) {
  //     throw new NotFoundException(
  //       'Collection not found or you do not have permission to add research paper',
  //     );
  //   }

  //   // Check if the research paper exists
  //   const researchPaper = await this.researchPaperModel.findOne({
  //     _id: researchPaperId,
  //   });
  //   if (!researchPaper) {
  //     throw new NotFoundException('Research paper not found');
  //   }

  //   const isResearchPaperInCollection = existingCollection.researchPapers.some(
  //     (paper) => paper._id === researchPaperId,
  //   );
  //   console.log(isResearchPaperInCollection, '***');
  //   if (!isResearchPaperInCollection) {
  //     existingCollection.researchPapers.push(researchPaper);
  //   } else {
  //     throw new ConflictException(
  //       'A research paper with the same name already exists in collection',
  //     );
  //   }

  //   try {
  //     return await existingCollection.save();
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Failed to add the research paper to the collection',
  //     );
  //   }
  // }

  async addPaper(collectionId: string, researchPaperId: string, user: UserDto) {
    const existingCollection = (await this.collectionModel.findOne({
      _id: collectionId,
      userId: user.id,
    })) as CollectionDoc; // Type assertion to CollectionDocument

    if (!existingCollection) {
      throw new NotFoundException(
        'Collection not found or you do not have permission to add research paper',
      );
    }

    // Check if the research paper exists
    const researchPaper = (await this.researchPaperModel.findOne({
      _id: researchPaperId,
    })) as ResearchPaperDoc; // Type assertion to ResearchPaperDocument

    if (!researchPaper) {
      throw new NotFoundException('Research paper not found');
    }
    const isResearchPaperInCollection = existingCollection.researchPapers.some(
      (paper) => paper._id.toString() === researchPaperId,
    );
    if (!isResearchPaperInCollection) {
      existingCollection.researchPapers.push(researchPaper);
    } else {
      throw new ConflictException(
        'A research paper with the same name already exists in the collection',
      );
    }

    try {
      return await existingCollection.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to add the research paper to the collection',
      );
    }
  }

  async findAll(userId: string) {
    try {
      const collections = await this.collectionModel
        .find({ userId })
        .populate('researchPapers');
      if (!collections) {
        throw new NotFoundException('Collections not found');
      }
      return collections;
    } catch (error) {
      throw new NotFoundException('Collections not found');
    }
  }

  async findOne(id: string, user: UserDto) {
    const collection = await this.collectionModel
      .findOne({ _id: id, userId: user.id })
      .populate('researchPapers')
      .exec();

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    return collection;
    return `This action returns a #${id} collection`;
  }

  update(id: string, updateCollectionDto: { collectionName: string }) {
    return `This action updates a #${id} collection`;
  }

  async remove(id: string, user: UserDto) {
    const existingCollection = await this.collectionModel.findOne({
      _id: id,
      userId: user.id,
    });
    if (!existingCollection) {
      throw new NotFoundException(
        'Collection not found or you do not have permission to delete it',
      );
    }

    try {
      await this.collectionModel.findByIdAndDelete(id).exec();
      return {
        statusCode: 202,
        message: "'Collection deleted successfully' ",
      };
    } catch (error) {
      // Handle database errors
      throw new InternalServerErrorException('Failed to delete the collection');
    }
    return `This action removes a #${id} collection`;
  }

  async removeResearchPaperFromCollection(
    collectionId: string,
    researchPaperId: string,
    user: UserDto,
  ) {
    const existingCollection = await this.collectionModel.findOne({
      _id: collectionId,
      userId: user.id,
    });
    if (!existingCollection) {
      throw new NotFoundException(
        'Collection not found or you do not have permission to remove research paper',
      );
    }

    const researchPaperIndex = existingCollection.researchPapers.findIndex(
      (paperId) => paperId.toString() === researchPaperId,
    );

    if (researchPaperIndex === -1) {
      throw new NotFoundException('Research paper not found in the collection');
    }

    // Remove the research paper from the collection
    existingCollection.researchPapers.splice(researchPaperIndex, 1);

    try {
      return await existingCollection.save();
    } catch (error) {
      // Handle database errors
      throw new InternalServerErrorException(
        'Failed to remove the research paper from the collection',
      );
    }
  }

  async updateCollectionName(
    collectionId: string,
    updatedName: string,
    user: UserDto,
  ) {
    const existingCollection = await this.collectionModel.findOne({
      _id: collectionId,
      userId: user.id,
    });
    if (!existingCollection) {
      throw new NotFoundException(
        'Collection not found or you do not have permission to update it',
      );
    }

    try {
      existingCollection.name = updatedName;
      return await existingCollection.save();
    } catch (error) {
      // Handle database errors
      throw new InternalServerErrorException(
        'Failed to update the collection name',
      );
    }
  }
}
