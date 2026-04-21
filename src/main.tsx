import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { Route, Switch } from 'wouter';
import App from './App.tsx';
import ProgettoBorgo from './pages/ProgettoBorgo.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/progetto-borgo" component={ProgettoBorgo} />
    </Switch>
  </StrictMode>,
);
