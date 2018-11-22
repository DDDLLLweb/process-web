import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Page1 from '../pages/Page1/Page1';
import Counter from '../pages/Counter/Counter';
const AppRouter = () =>(
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/page1">page1</Link>
                    </li>
                    <li>
                        <Link to="/counter">counter</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/home" exact component={Home} />
            <Route path="/page1" component={Page1} />
            <Route path="/counter" component={Counter} />

        </div>
    </Router>
)
export default AppRouter;