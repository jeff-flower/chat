import React from 'react';

import {AppContainer} from './AppContainer';
import {GraphqlProvider} from './GraphqlProvider';

export const App: React.FC = () => (
  <GraphqlProvider>
    <AppContainer />
  </GraphqlProvider>
)