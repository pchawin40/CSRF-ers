import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import ChannelProvider from './context/ChannelContext';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import UserProvider from './context/UserContext';
import ChannelsUsersProvider from './context/ChannelsUsersContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <UserProvider>
          <ChannelProvider>
            <ChannelsUsersProvider>
              <App />
            </ChannelsUsersProvider>
          </ChannelProvider>
        </UserProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
