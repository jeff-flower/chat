import React, {useState} from 'react';

import {Contacts} from './Contacts'
import {Messenger} from './Messenger';
import {User} from './AppContainer';

import './App.css';


export const App: React.FC<{users: User[]}> = ({users}) => {
  const [userName, setUserName] = useState<string>('');
  const [contact, setContact] = useState<string>('');

  return (
    <>
      <section>
        {users && !userName && (
          <label>
            Who are you?
            <select value={userName} onChange={e => setUserName(e.target.value)}>
              <option value=""></option>
              {users.map(user => <option value={user.username} key={user.username}>{user.username}</option>)}
            </select>
          </label>
        )}
        {userName && <p>{`Welcome ${userName}!`}</p>}
      </section>
      {userName && <Contacts contacts={users.filter(user => user.username !== userName)} onContactSelection={(name: string) => setContact(name)} />}
      {contact && <Messenger from={userName} to={contact}/>}
    </>
  );
}

export default App;
