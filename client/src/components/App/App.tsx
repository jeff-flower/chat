import React, {useState} from 'react';

import {UserSelection} from '../UserSelection';
import {Contacts} from '../Contacts'
import {Messenger} from '../Messenger';
import {User} from './';

export const App: React.FC<{users: User[]}> = ({users}) => {
  const [userName, setUserName] = useState<string>('');
  const [contact, setContact] = useState<string>('');

  return (
    <>
      {users && <UserSelection users={users} selectedUser={userName} onSelectUser={(userName: User['username']) => setUserName(userName)} />}
      {userName && <Contacts contacts={users.filter(user => user.username !== userName)} onContactSelection={(name: string) => setContact(name)} />}
      {contact && <Messenger from={userName} to={contact}/>}
    </>
  );
}

export default App;
