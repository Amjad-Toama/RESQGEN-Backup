import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QuestionsProvider } from './contexts/QuestionsContext'
import { ClientProvider } from './contexts/ClientContext'
import { FormProvider } from './contexts/FormContext';
import { TabsProvider } from './contexts/TabsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TabsProvider>
      <FormProvider>
        <ClientProvider>
          <QuestionsProvider>
            <App />
          </QuestionsProvider>
        </ClientProvider>
      </FormProvider>
    </TabsProvider>
  </React.StrictMode>
);
