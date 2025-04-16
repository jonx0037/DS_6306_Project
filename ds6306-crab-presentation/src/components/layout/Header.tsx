import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Box sx={{ height: 50, mr: 2, display: 'flex', alignItems: 'center' }}>
            <img 
              src={`${process.env.PUBLIC_URL}/assets/smu-logo.png`} 
              alt="SMU Logo" 
              style={{ height: '40px' }} 
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 600
              }}
            >
              Crab Age Prediction
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary'
              }}
            >
              DS 6306 Project
            </Typography>
          </Box>
        </Box>
        
        <Button
          href="https://github.com/jonx0037/DS_6306_Project"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;