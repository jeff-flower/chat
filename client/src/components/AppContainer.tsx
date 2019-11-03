import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import {App} from './App';

const GET_USERS = gql`
  query allUsers {
    users {
      username
    }
  }
`;

export interface User {
  username: string;
}

interface UserQueryData {
  users: User[];
}

export const AppContainer: React.FC = () => {
  const {loading, data} = useQuery<UserQueryData>(GET_USERS);

  return (
    <div className="App">
      {loading && <p>loading...</p>}
      {data && <App users={data.users} />} 
    </div>
  );
};