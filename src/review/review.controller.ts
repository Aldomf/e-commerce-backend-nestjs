import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':userId/:productId')
  create(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewService.create(userId, productId, createReviewDto);
  }

  @Patch('/:userId/:id')
  async updateUserComment(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.updateUserComment(userId, id, updateReviewDto);
  }

  @Delete('/:userId/:id')
  async deleteUserComment(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
  ): Promise<void> {
    await this.reviewService.deleteUserComment(userId, reviewId);
  }

  @Get(':productId/comments')
  async findAllUserComments(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<Review[]> {
    return this.reviewService.findAllUserComments(productId);
  }

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.reviewService.remove(id);
  }
}
