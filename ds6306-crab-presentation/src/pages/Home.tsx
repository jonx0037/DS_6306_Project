import { Box, Typography, Grid, Paper, Button, Card, CardContent, CardMedia, Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AssessmentIcon from '@mui/icons-material/Assessment';

const HeroBanner = styled(Box)(({ theme }) => ({
  height: '400px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  overflow: 'hidden',
  marginBottom: theme.spacing(6),
  backgroundColor: theme.palette.grey[800],
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url("/assets/hero-crab.jpg")', // We'll need to add this image
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  }
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
  },
}));

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
}

const FeatureCard = ({ title, description, icon, linkTo }: FeatureCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Grid item xs={12} sm={6} lg={3}>
      <StyledCard elevation={3}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            pt: 3,
            pb: 1,
            color: 'primary.main'
          }}
        >
          {icon}
        </Box>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom color="primary.main">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => navigate(linkTo)}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Explore
          </Button>
        </Box>
      </StyledCard>
    </Grid>
  );
};

const features = [
  {
    title: 'Data Analysis',
    description: 'Comprehensive analysis of crab physical characteristics and their correlation with age',
    icon: <InsightsIcon fontSize="large" />,
    linkTo: '/analysis'
  },
  {
    title: 'Visualizations',
    description: 'Interactive charts and plots showing key relationships in the data',
    icon: <BarChartIcon fontSize="large" />,
    linkTo: '/visualizations'
  },
  {
    title: 'Models',
    description: 'Machine learning models for accurate age prediction',
    icon: <ModelTrainingIcon fontSize="large" />,
    linkTo: '/models'
  },
  {
    title: 'Results',
    description: 'Model performance metrics and key findings',
    icon: <AssessmentIcon fontSize="large" />,
    linkTo: '/models'
  }
];

const Home = () => {
  return (
    <Box>
      <HeroBanner>
        <HeroContent>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            Crab Age Prediction
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Using physical characteristics to accurately predict crab age
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ 
              mr: 2, 
              textTransform: 'none', 
              fontSize: '1.1rem',
              px: 3,
              py: 1,
              borderRadius: 2
            }}
            onClick={() => document.getElementById('feature-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </Button>
          <Button 
            variant="outlined" 
            color="secondary"
            size="large"
            sx={{ 
              textTransform: 'none', 
              fontSize: '1.1rem',
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
            href="https://github.com/jonx0037/DS_6306_Project"
            target="_blank"
          >
            View GitHub
          </Button>
        </HeroContent>
      </HeroBanner>

      <Container id="feature-section">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" align="center" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
            Project Overview
          </Typography>
          <Divider sx={{ mb: 3, width: '80px', mx: 'auto', borderWidth: 2, borderColor: 'secondary.main' }}/>
          <Typography variant="body1" align="center" paragraph sx={{ maxWidth: '800px', mx: 'auto' }}>
            This project applies machine learning techniques to predict the age of crabs based on physical characteristics.
            Our work demonstrates how data science can be applied to biological research and conservation efforts.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              linkTo={feature.linkTo}
            />
          ))}
        </Grid>

        <Box sx={{ mt: 10, mb: 6 }}>
          <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
            Project Highlights
          </Typography>
          <Divider sx={{ mb: 3, width: '60px', borderWidth: 2, borderColor: 'secondary.main' }}/>
          
          <Grid container spacing={4} alignItems="center" sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box 
                component="img" 
                src="/assets/visualization-preview.jpg"
                alt="Data visualization preview" 
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" color="primary.dark" gutterBottom>
                Data-Driven Insights
              </Typography>
              <Typography variant="body1" paragraph>
                Our analysis reveals key relationships between physical attributes and crab age, with weight and shell dimensions 
                being the strongest predictors. We applied various machine learning algorithms to find the most accurate model 
                for age prediction.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2, 
                  mt: 2
                }}
                onClick={() => window.location.href = '/visualizations'}
              >
                Explore Visualizations
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;