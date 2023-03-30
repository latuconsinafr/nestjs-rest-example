import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'nest-casl';
import { TopicsModule } from '../topics/topics.module';
import { Post } from './entities/post.entity';
import { PostPermissions } from './permissions/post.permissions';
import { PostByIdPipe } from './pipes/post-by-id.pipe';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { IsPostExistValidator } from './validators/is-post-exist.validator';

/**
 * Defines the posts module.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CaslModule.forFeature({ permissions: PostPermissions }),
    TopicsModule,
  ],
  providers: [PostsService, PostByIdPipe, IsPostExistValidator],
  controllers: [PostsController],
  exports: [],
})
export class PostsModule {}
