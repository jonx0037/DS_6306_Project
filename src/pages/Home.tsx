import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6', lg: 'span 3' } }}>
    <StyledPaper elevation={2}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </StyledPaper>
  </Box>
);

const features = [
  {
    title: 'Data Analysis',
    description: 'Comprehensive analysis of crab physical characteristics and their correlation with age'
  },
  {
    title: 'Visualizations',
    description: 'Interactive charts and plots showing key relationships in the data'
  },
  {
    title: 'Models',
    description: 'Machine learning models for accurate age prediction'
  },
  {
    title: 'Results',
    description: 'Model performance metrics and key findings'
  }
];

const Home = () => {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          Crab Age Prediction
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          DS 6306 Project - SMU Data Science
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'grid',
          gap: 4,
          gridTemplateColumns: 'repeat(12, 1fr)'
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;