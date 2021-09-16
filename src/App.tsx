import { useEffect, useState } from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import arweave from './api/arweave';
import {GlobalStorage, getGlobalStorageOfWallet} from './arweave-globalstorage';
import { ctx } from './utils';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './style/global';
import {light, dark} from './style/themes';
import Header from './components/Header';
import DevMode from './components/ui/DevMode';
import AppBarBottom from './components/Header/AppBarBottom';
import Profile from './components/Profile';
import Main from './components/Main';

function App() {
  const history = createBrowserHistory();
  const [walletAddr, updateWalletAddr] = useState("");
  const setWalletAddr = (addr: string) => {
    updateWalletAddr(addr);
  }

  const [theme, updateTheme] = useState(true);
  const setTheme = (t: boolean) => {
    updateTheme(t);
  }

  useEffect(() => {
    (async () => {
      const walletStorage = await getGlobalStorageOfWallet(arweave, "test");
      console.log(walletStorage);
    })()
  });

  return (
    <ctx.Provider value={{
      walletAddr, setWalletAddr, 
      theme, setTheme,
    }}>
      <ThemeProvider theme={theme ? light : dark}>
        <GlobalStyles />
        <main>
          <Router history={history}>
            <Switch>
              <Route exact path='/'><Header /><DevMode /></Route>
              <Route exact path='/:pathBase/profile/:addr'><Header /><Profile /><AppBarBottom /></Route>
              <Route exact path='/:pathBase'><Header /><Main /><AppBarBottom /></Route>
            </Switch>
          </Router>
        </main>
      </ThemeProvider>
    </ctx.Provider>
  );
}

export default App;
