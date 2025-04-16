import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          {/* TODO: Add SMU logo image */}
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              marginLeft: 2
            }}
          >
            DS 6306 Project
          </Typography>
        </Box>
        
        <Button
          href="https://github.com/jonx0037/DS_6306_Project"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          color="primary"
        >
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;