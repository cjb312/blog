import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

//browser interacts with history library, Route = react component provides config to react router, 
//Switch = looks at all routes and only renders first route that matches current url
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importing reducers
import reducers from './reducers';

//importing components
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


// with switch put most specific routes at the top of the list
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
	    <Switch>
	    	<Route path="/posts/new" component={PostsNew} />
	    	<Route path="/" component={PostsIndex} />
	    </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
