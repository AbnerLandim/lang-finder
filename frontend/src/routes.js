import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import List from './pages/List';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/list" component={List} />
            </Switch>
        </BrowserRouter>
    );
}