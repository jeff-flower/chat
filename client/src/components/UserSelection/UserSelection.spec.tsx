import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {UserSelection, UserSelectionProps} from './UserSelection';

it('should provide a select when no user has been selected', () => {
  const props: UserSelectionProps = {
    users: [{username: 'billy'}],
    selectedUser: '',
    onSelectUser: jest.fn()
  };
  const {getByTestId} = render(<UserSelection {...props}/>);
  getByTestId('userSelection');
});

it('should show the name of the selected user', () => {
  const props: UserSelectionProps = {
    users: [{username: 'billy'}],
    selectedUser: 'billy',
    onSelectUser: jest.fn()
  };
  const {getByText} = render(<UserSelection {...props}/>);
  getByText('Welcome billy!');
});

it('should call the provided callback when a user is selected', () => {
  const props: UserSelectionProps = {
    users: [{username: 'billy'}],
    selectedUser: '',
    onSelectUser: jest.fn()
  };
  const {getByTestId, getByText} = render(<UserSelection {...props}/>);
  const userSelect = getByTestId('userSelection');
  fireEvent.change(userSelect, {target: {value: 'billy'}});
  expect(props.onSelectUser).toBeCalled();
});
