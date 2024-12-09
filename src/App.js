import FormTemplate from './FormTemplate';
import './App.css';

// Setup the direction of text-based components - Theme direction.
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Right-to-Left Layout.
const theme = createTheme({
  direction: 'rtl'
});

const cacheRtl = createCache({
key: 'muirtl',
stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <FormTemplate />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
