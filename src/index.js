import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { VideoProvider } from './components/VideoContext';
import { ModalProvider } from './components/ModalContext';
import { LoginProvider } from './components/LoginContext';
import { FollowProvider } from './components/FollowContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <ModalProvider>
                <LoginProvider>
                    <FollowProvider>
                        <VideoProvider>
                            <App />
                        </VideoProvider>
                    </FollowProvider>
                </LoginProvider>
            </ModalProvider>
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
