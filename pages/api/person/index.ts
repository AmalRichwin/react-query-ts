/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '@src/lib/interfaces/IPerson';

export default (_req: NextApiRequest, res: NextApiResponse<IPerson>): void => {
  console.log('GET PERSON');
  res.status(200).json({ name: 'amal', age: 24, id: '1' });
};
