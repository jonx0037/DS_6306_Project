import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

interface AnalysisCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const AnalysisCard = ({ title, description, imagePath }: AnalysisCardProps) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="img"
      height="200"
      image={imagePath}
      alt={title}
      sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
    />
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const analysisData = [
  {
    title: 'Age Distribution',
    description: 'Distribution of crab ages in the dataset shows clustering around certain age groups.',
    imagePath: '/output/plots/age_distribution.png'
  },
  {
    title: 'Age by Sex',
    description: 'Analysis of age patterns across different crab sexes reveals interesting variations.',
    imagePath: '/output/plots/age_by_sex.png'
  },
  {
    title: 'Correlation Matrix',
    description: 'Visualization of relationships between different physical measurements.',
    imagePath: '/output/plots/correlation_matrix.png'
  },
  {
    title: 'Feature Importance',
    description: 'Key physical characteristics that best predict crab age.',
    imagePath: '/output/plots/feature_importance.png'
  }
];

const Analysis = () => {
  return (
    <Box>
      <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Data Analysis
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }} align="center">
        Our analysis explores the relationships between various physical characteristics
        of crabs and their age, identifying key patterns and correlations that inform
        our prediction models.
      </Typography>

      <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(12, 1fr)' }}>
        {analysisData.map((item, index) => (
          <Box 
            key={index}
            sx={{ 
              gridColumn: { 
                xs: 'span 12', 
                md: 'span 6', 
                lg: 'span 6' 
              } 
            }}
          >
            <AnalysisCard
              title={item.title}
              description={item.description}
              imagePath={item.imagePath}
            />
          </Box>
        ))}
      </Box>

      <Typography variant="h4" sx={{ mt: 6, mb: 3 }}>
        Key Findings
      </Typography>
      
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(12, 1fr)' }}>
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Physical Measurements
              </Typography>
              <Typography variant="body2" paragraph>
                Strong correlations were found between crab age and physical measurements,
                particularly with shell weight and diameter. These relationships form the
                foundation of our prediction models.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sex-Based Variations
              </Typography>
              <Typography variant="body2" paragraph>
                Notable differences in age-related characteristics were observed between
                male and female crabs, suggesting sex-specific growth patterns.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Analysis;