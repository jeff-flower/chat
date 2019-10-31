import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GraphqlProvider} from './GraphqlProvider';
import App from './App';

const Root = (<GraphqlProvider><App /></GraphqlProvider>);

ReactDOM.render(Root, document.getElementById('root'));