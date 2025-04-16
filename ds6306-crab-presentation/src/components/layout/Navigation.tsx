import { Box, Tabs, Tab, useMediaQuery, useTheme, Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import BarChartIcon from '@mui/icons-material/BarChart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useState } from 'react';

const routes = [
  { path: '/', label: 'Home', icon: <HomeIcon /> },
  { path: '/analysis', label: 'Analysis', icon: <InsightsIcon /> },
  { path: '/visualizations', label: 'Visualizations', icon: <BarChartIcon /> },
  { path: '/models', label: 'Models', icon: <PsychologyIcon /> },
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentTab = routes.findIndex(
    route => route.path === (location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`)
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    navigate(routes[newValue].path);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile drawer navigation
  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {routes.map((route, index) => (
          <ListItem 
            button 
            key={route.path}
            onClick={() => navigate(route.path)}
            selected={currentTab === index}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(53, 76, 161, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(53, 76, 161, 0.12)',
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: currentTab === index ? 'primary.main' : 'inherit' }}>
              {route.icon}
            </ListItemIcon>
            <ListItemText 
              primary={route.label}
              primaryTypographyProps={{
                fontWeight: currentTab === index ? 600 : 400,
                color: currentTab === index ? 'primary.main' : 'inherit'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Desktop tabs navigation
  if (!isMobile) {
    return (
      <Box 
        sx={{ 
          width: '100%', 
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Tabs
          value={currentTab !== -1 ? currentTab : 0}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="secondary"
          aria-label="main navigation"
        >
          {routes.map((route) => (
            <Tab
              key={route.path}
              label={route.label}
              icon={route.icon}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                fontSize: '0.95rem',
                minHeight: '64px',
                textTransform: 'none',
                '&:hover': {
                  color: 'primary.main',
                  opacity: 0.9,
                },
                '&.Mui-selected': {
                  fontWeight: 700,
                }
              }}
            />
          ))}
        </Tabs>
      </Box>
    );
  }

  // Mobile navigation
  return (
    <Box sx={{ display: 'flex' }}>
      <Box 
        sx={{ 
          width: '100%', 
          bgcolor: 'background.paper',
          display: 'flex',
          justifyContent: 'flex-start',
          borderBottom: 1,
          borderColor: 'divider',
          px: 1
        }}
      >
        <IconButton
          color="primary"
          aria-label="open navigation drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navigation;