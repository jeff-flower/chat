import React, {useState} from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import {Contacts} from './Contacts'
import {Messenger} from './Messenger';

import './App.css';

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

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const {loading, data: userData} = useQuery<UserQueryData>(GET_USERS);
  const [contact, setContact] = useState<string>('');

  return (
    <div className="App">
      {loading && <p>loading...</p>}
      {userData && !userName && (
        <label>
          Who are you?
          <select value={userName} onChange={e => setUserName(e.target.value)}>
            <option value=""></option>
            {userData.users.map(user => <option value={user.username} key={user.username}>{user.username}</option>)}
          </select>
        </label>
      )}
      {userName && <p>{`Welcome ${userName}!`}</p>}
      {userName && <Contacts contacts={userData!.users.filter(user => user.username !== userName)} onContactSelection={(name: string) => setContact(name)} />}
      {contact && <Messenger from={userName} to={contact}/>}
    </div>
  );
}

export default App;
