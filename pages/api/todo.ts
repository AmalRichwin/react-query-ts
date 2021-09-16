import { NextApiRequest, NextApiResponse } from 'next';
import { ITodo } from '@src/lib/interfaces/ITodo';

export default (_req: NextApiRequest, _res: NextApiResponse<ITodo>): void => {
  _res.status(200).json({ id: 1, message: 'I AM A TODO' });
};
