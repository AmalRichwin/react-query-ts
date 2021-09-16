import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { IPerson } from '@src/lib/interfaces/IPerson';

async function getPersonById(id: string | string[] | undefined): Promise<IPerson> {
  if (typeof id === 'string') {
    const res = await fetch(`/api/person/${id}`);
    if (res.ok) {
      return res.json();
    }
    throw new Error('error fetching user with id');
  }
  throw new Error('invalid id');
}

const PersonPage: React.FC = () => {
  const {
    query: { id },
  } = useRouter();

  const { isLoading, isError, data, error } = useQuery<IPerson, Error>(['person', id], () => getPersonById(id), {
    enabled: !!id, // enabled will stop a query from running, so will call when id is available (dependent queries)
    select: (name) => name,
    staleTime: 5 * 1000,
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error occured {error?.message}</p>
      </div>
    );
  }

  return (
    <div>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </div>
  );
};

export default PersonPage;
