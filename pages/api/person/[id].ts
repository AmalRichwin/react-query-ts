import { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '@src/lib/interfaces/IPerson';

export default (_req: NextApiRequest, res: NextApiResponse<IPerson | Error>): void => {
  const {
    query: { id },
  } = _req;

  if (typeof id === 'string') {
    // eslint-disable-next-line no-console
    console.log(`GETTING PERSON ID - ${id}`);
    return res.status(200).json({ name: 'amal', age: 24, id });
  }
  return res.status(500).json(new Error('id is not of correct type'));
};
