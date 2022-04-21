import React from 'react';
import { useQuery } from '@apollo/client';



import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div>
        <h1>TBC</h1>
      
      </div>
    </main>
  );
};

export default Home;
