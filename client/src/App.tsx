import React, {useState} from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import './App.css';

const GET_USERS = gql`
  query allUsers {
    users {
      name
    }
  }
`;

interface User {
  name: string;
}

interface UserQueryData {
  users: User[];
}

const App: React.FC = () => {
  const [userName, setUserName] = useState<String>('');
  const {loading, data} = useQuery<UserQueryData>(GET_USERS);

  return (
    <div className="App">
      {loading && <p>loading...</p>}
      {data && !userName && (
        <label>
          Who are you?
          <select value={userName} onChange={e => setUserName(e.target.value)}>
            <option value=""></option>
            {data.users.map(user => <option value={user.name} key={user.name}>{user.name}</option>)}
          </select>
        </label>
      )}
      {userName && <p>{`Welcome ${userName}!`}</p>}
    </div>
  );
}

export default App;
