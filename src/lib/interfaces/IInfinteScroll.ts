import { ITodo } from './ITodo';

export interface IInfinteScroll {
  nextCursor: number | undefined;
  page: {
    todos: ITodo[];
    hasMore: boolean;
  };
}
