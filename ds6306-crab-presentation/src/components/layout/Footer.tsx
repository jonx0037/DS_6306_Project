import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src={`${process.env.PUBLIC_URL}/assets/smu-logo.png`} 
                alt="SMU Logo" 
                style={{ height: '30px', marginRight: '10px' }} 
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              This project uses machine learning to predict crab age based on physical characteristics.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Links
            </Typography>
            <Link 
              href="https://github.com/jonx0037/DS_6306_Project" 
              target="_blank" 
              rel="noopener"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'text.secondary',
                mb: 1,
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              <GitHubIcon sx={{ mr: 1, fontSize: '1rem' }} />
              <Typography variant="body2">GitHub Repository</Typography>
            </Link>
            <Link 
              href="https://www.smu.edu/datascience" 
              target="_blank" 
              rel="noopener"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              <SchoolIcon sx={{ mr: 1, fontSize: '1rem' }} />
              <Typography variant="body2">SMU Data Science</Typography>
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              About
            </Typography>
            <Typography variant="body2" color="text.secondary">
              DS 6306 Final Project - Southern Methodist University
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Using R and machine learning to predict crab age.
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} SMU Data Science
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;