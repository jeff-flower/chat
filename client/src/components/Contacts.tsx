import React from 'react';

import {User} from './AppContainer';

export const Contacts: React.FC<{contacts: User[], onContactSelection: (contactName: string) => void}> = ({contacts, onContactSelection}) => (
  <section>
    <h2>Contacts</h2>
    <ul>
      {contacts.map(contact => <li key={contact.username}><button onClick={() => onContactSelection(contact.username)}>{contact.username}</button></li>)} 
    </ul>
  </section>
);
