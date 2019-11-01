import React from 'react';

import {User} from './App';

export const Contacts: React.FC<{contacts: User[], onContactSelection: (contactName: string) => void}> = ({contacts, onContactSelection}) => (
  <ul>
    {contacts.map(contact=> <li key={contact.name}><button onClick={() => onContactSelection(contact.name)}>{contact.name}</button></li>)} 
  </ul>
);
