import React from 'react';
import { NextPage } from 'next';
import { Request } from 'express';

import { typedQuery } from '../app/apollo-client';

export async function getServerSideProps({ req }) {
  const data = await typedQuery(
		{ cars: { number: true, drivers: { name: true } } },
    req,
  );

  return {
		props: { user: (req as Request).user, cars: data.cars },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Cars: NextPage<Props['props']> = (props) => {
  return (
    <div>
      <h1>Cars overview</h1>
      {JSON.stringify(props)}
    </div>
  );
};

export default Cars;
