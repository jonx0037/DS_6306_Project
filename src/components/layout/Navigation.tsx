import { Box, Tabs, Tab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/analysis', label: 'Analysis' },
  { path: '/visualizations', label: 'Visualizations' },
  { path: '/models', label: 'Models' },
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = routes.findIndex(
    route => route.path === (location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`)
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    navigate(routes[newValue].path);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={currentTab !== -1 ? currentTab : 0}
        onChange={handleChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        aria-label="main navigation"
      >
        {routes.map((route) => (
          <Tab
            key={route.path}
            label={route.label}
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default Navigation;