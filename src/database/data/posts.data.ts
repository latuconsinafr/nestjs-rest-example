import { Post } from '../../services/posts/entities/post.entity';
import { usersData } from './users.data';

/**
 * Dummy data for {@link Post} entity.
 */
export const postsData = [
  new Post({
    id: '5d43ec16-25fb-4de3-9b79-8dee1816ce95',
    title: 'Post 1',
    content: 'This is a brand new post',
    category: 'Other',
    authorId: usersData[1].id,
  }),
  new Post({
    id: '8b8e0aad-a697-4e1c-ac77-48ed34998c39',
    title: 'Post 2',
    content: 'This is the second post',
    category: 'Other',
    authorId: usersData[1].id,
  }),
] as const;
