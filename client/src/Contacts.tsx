import React from 'react';

import {User} from './App';

export const Contacts: React.FC<{contacts: User[], onContactSelection: (contactName: string) => void}> = ({contacts, onContactSelection}) => (
  <ul>
    {contacts.map(contact => <li key={contact.username}><button onClick={() => onContactSelection(contact.username)}>{contact.username}</button></li>)} 
  </ul>
);
