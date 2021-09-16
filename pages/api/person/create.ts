import { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '@src/lib/interfaces/IPerson';

export default (_req: NextApiRequest, res: NextApiResponse<IPerson | Error>): void => {
  const data: IPerson = JSON.parse(_req.body);
  res.status(200).json(data);
};
