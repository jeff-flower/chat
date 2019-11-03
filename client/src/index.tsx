import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GraphqlProvider} from './components/GraphqlProvider';
import App from './components/App';

const Root = (<GraphqlProvider><App /></GraphqlProvider>);

ReactDOM.render(Root, document.getElementById('root'));