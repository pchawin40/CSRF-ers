import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import channelReducer from './channel';
import dmrReducer from './dmr'
import userReducer from './users';
import channelsUsersReducer from './channels-users';
import messageReducer from './message';
import dmrUsersReducer from './dmr-users';

const rootReducer = combineReducers({
  session: sessionReducer,
  channels: channelReducer,
  dmrs: dmrReducer,
  users: userReducer,
  channelsUsers: channelsUsersReducer,
  dmrUsers: dmrUsersReducer,
  messages: messageReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
