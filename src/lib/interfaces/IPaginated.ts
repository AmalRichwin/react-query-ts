import { ITodo } from '@src/lib/interfaces/ITodo';

export interface IPaginatedTodos {
  todos: ITodo[];
  hasMore: boolean;
}
