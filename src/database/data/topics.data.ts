import { Topic } from '../../services/topics/entities/topic.entity';

/**
 * Dummy data for {@link Topic} entity.
 */
export const topicsData = [
  new Topic({
    id: '13402672-72ba-4d00-a9b0-1c2379ed7d65',
    name: 'Entertainment',
  }),
  new Topic({
    id: '28b6cd6a-49fc-4b84-a3c8-3158a9b4e3cb',
    name: 'Art',
  }),
  new Topic({
    id: '6c305b13-be87-46fd-aa75-d94a693087ce',
    name: 'Science',
  }),
  new Topic({
    id: 'f6861074-7b7a-4ca3-a6d8-7e3eac4c8dcc',
    name: 'Fiction',
  }),
  new Topic({
    id: '9260dbe7-47c1-4a86-9d83-032af62f0509',
    name: 'Lifestyle',
  }),
  new Topic({
    id: 'e3c8cb59-2d59-44d8-a3c9-299daf05aa5e',
    name: 'Other',
  }),
] as const;
