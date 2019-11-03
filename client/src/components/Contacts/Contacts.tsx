import React from 'react';

import {User} from '../App/';

import './Contacts.css';

export const Contacts: React.FC<{contacts: User[], onContactSelection: (contactName: string) => void}> = ({contacts, onContactSelection}) => (
  <section className="main__flex-item">
    <h2 id="contacts">Contacts</h2>
    <ul aria-labelledby="contacts" className="contacts-list">
      {contacts.map(contact => (
        <li key={contact.username} className="contacts-list__list-item">
          <span>{contact.username}</span>
          <button onClick={() => onContactSelection(contact.username)}>Chat</button>
        </li>
      ))
    } 
    </ul>
  </section>
);
