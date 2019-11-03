import React from 'react';

import {AppContainer} from './App';
import {GraphqlProvider} from './GraphqlProvider';

export const App: React.FC = () => (
  <GraphqlProvider>
    <AppContainer />
  </GraphqlProvider>
)