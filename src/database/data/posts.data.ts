import { Post } from '../../services/posts/entities/post.entity';
import { topicsData } from './topics.data';
import { usersData } from './users.data';

/**
 * Dummy data for {@link Post} entity.
 */
export const postsData = [
  new Post({
    id: '5d43ec16-25fb-4de3-9b79-8dee1816ce95',
    content: 'Art is only the beginning, the end would be utterly chaos.',
    topics: [topicsData[1], topicsData[3]],
    authorId: usersData[1].id,
  }),
  new Post({
    id: '8b8e0aad-a697-4e1c-ac77-48ed34998c39',
    content: "Is a leaf's only purpose to fall?",
    topics: [topicsData[5]],
    authorId: usersData[1].id,
  }),
] as const;
