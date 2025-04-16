import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'));
const Analysis = lazy(() => import('./pages/Analysis'));
const Visualizations = lazy(() => import('./pages/Visualizations'));
const Models = lazy(() => import('./pages/Models'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/visualizations" element={<Visualizations />} />
            <Route path="/models" element={<Models />} />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
