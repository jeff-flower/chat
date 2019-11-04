import React from 'react';
import { User } from '../App';

import './UserSelection.css';

export interface UserSelectionProps {
  users: User[];
  selectedUser: User['username'];
  onSelectUser: (userName: User['username']) => void;
}

export const UserSelection: React.FC<UserSelectionProps> = ({users, selectedUser, onSelectUser}) => {
  return (
    <div className="user-selection">
      {!selectedUser && (
        <label>
          Who are you?
          <select
            value={selectedUser}
            onChange={e => onSelectUser(e.target.value)}
            className="user-selection__select-user"
            data-testid="userSelection"
          >
            <option value=""></option>
            {users.map(user => <option value={user.username} key={user.username}>{user.username}</option>)}
          </select>
        </label>
      )}
      {selectedUser && <p>{`Welcome ${selectedUser}!`}</p>}
    </div>
  ); 
};