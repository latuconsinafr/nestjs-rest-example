import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostByIdPipe } from './pipes/post-by-id.pipe';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

/**
 * Defines the posts module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService, PostByIdPipe],
  controllers: [PostsController],
  exports: [],
})
export class PostsModule {}
