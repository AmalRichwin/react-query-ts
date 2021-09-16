import * as React from 'react';
import { useQuery } from 'react-query';
import { fetchPerson } from '@pages/person';

const PersonComponent: React.FC = () => {
  const { data } = useQuery('person', fetchPerson);

  return (
    <div>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </div>
  );
};

export default PersonComponent;
