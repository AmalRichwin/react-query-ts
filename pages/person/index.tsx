import { FC, useState } from 'react';
import { useQuery, useQueryClient, UseQueryResult, useQueries } from 'react-query';
import { IPerson } from '@src/lib/interfaces/IPerson';
import PersonComponent from '@src/components/PersonComponent';
import { ITodo } from '@src/lib/interfaces/ITodo';

export const fetchPerson = async (): Promise<IPerson> => {
  const res = await fetch('/api/person');
  // need to do this with fetch since it doesn't automatically throws error unlike axios and graph-ql '
  if (res.ok) {
    return res.json();
  }
  throw new Error('Network response not ok');
};

const fetchTodo = async (): Promise<ITodo> => {
  const res = await fetch(`/api/todo`);
  // need to do this with fetch since doesn't automatically throw errors axios and graphql-request do
  if (res.ok) {
    return res.json();
  }
  throw new Error('Network response not ok'); // need to throw because react-query functions need to have error thrown to know its in error state
};

const PersonPage: FC = () => {
  const [enabled, setEnabled] = useState(true);
  const { data, isLoading, isError, error, isSuccess }: UseQueryResult<IPerson, Error> = useQuery(
    'person',
    fetchPerson,
    {
      enabled,
    }
  );
  const { isSuccess: todoSuccess }: UseQueryResult<ITodo, Error> = useQuery('todo', fetchTodo, {
    enabled,
  });

  const userQueries = useQueries(
    ['1', '2', '3'].map((id) => {
      return {
        queryKey: ['todo', { page: id }],
        queryFn: () => {
          return id;
        },
        enabled,
      };
    })
  );

  const queryClient = useQueryClient();

  if (todoSuccess && isSuccess && enabled) {
    setEnabled(false);
  }

  if (isLoading) {
    return (
      <div>
        <p>...loading</p>
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div>
        <button
          type="button"
          onClick={(evt) => {
            evt.preventDefault();
            queryClient.invalidateQueries();
          }}
        >
          Invalidate Queries
        </button>

        <button
          type="button"
          onClick={(evt) => {
            evt.preventDefault();
            queryClient.invalidateQueries('person');
          }}
        >
          Invalidate Person
        </button>

        <button
          type="button"
          onClick={(evt) => {
            evt.preventDefault();
            queryClient.invalidateQueries({
              predicate: (query) => {
                // eslint-disable-next-line radix
                return parseInt(query?.queryKey[1]?.page) % 2 === 1;
              },
            });
          }}
        >
          Invalidate Todo
        </button>
      </div>
      <p>ID : {data?.id}</p>
      <p>Name : {data?.name}</p>
      <p>AGE : {data?.age}</p>
    </div>
  );
};

export default PersonPage;
