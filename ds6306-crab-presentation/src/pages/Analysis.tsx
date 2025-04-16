import { Box, Typography, Card, CardContent, CardMedia, Grid, Container, Divider, Button } from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface AnalysisCardProps {
  title: string;
  description: string;
  imagePath: string;
  onExpand: () => void;
}

const AnalysisCard = ({ title, description, imagePath, onExpand }: AnalysisCardProps) => (
  <Card sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    borderRadius: 2,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    }
  }}>
    <Box sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={`${process.env.PUBLIC_URL}${imagePath}`}
        alt={title}
        sx={{ 
          objectFit: 'contain', 
          p: 2, 
          bgcolor: 'background.paper',
          cursor: 'pointer'
        }}
        onClick={onExpand}
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          color: 'primary.main',
          '&:hover': { 
            bgcolor: 'rgba(255, 255, 255, 0.9)', 
            color: 'secondary.main' 
          },
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
        onClick={onExpand}
      >
        <ZoomOutMapIcon />
      </IconButton>
    </Box>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        startIcon={<ZoomOutMapIcon />}
        onClick={onExpand}
        variant="text"
        color="primary"
        sx={{ textTransform: 'none' }}
      >
        View Larger
      </Button>
    </Box>
  </Card>
);

const analysisData = [
  {
    title: 'Age Distribution',
    description: 'Distribution of crab ages in the dataset shows clustering around certain age groups. This helps us understand the natural age patterns in the crab population.',
    imagePath: '/assets/plots/age_distribution.png'
  },
  {
    title: 'Age by Sex',
    description: 'Analysis of age patterns across different crab sexes reveals interesting variations. Female and male crabs show distinct growth and aging characteristics.',
    imagePath: '/assets/plots/age_by_sex.png'
  },
  {
    title: 'Correlation Matrix',
    description: 'Visualization of relationships between different physical measurements. Strong correlations indicate which features will be most predictive for our models.',
    imagePath: '/assets/plots/correlation_matrix.png'
  },
  {
    title: 'Feature Importance',
    description: 'Key physical characteristics that best predict crab age. Weight and shell dimensions emerged as the most important predictors in our analysis.',
    imagePath: '/assets/plots/feature_importance.png'
  }
];

const Analysis = () => {
  const [dialogImage, setDialogImage] = useState<string | null>(null);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogDescription, setDialogDescription] = useState<string>('');

  const handleOpenDialog = (item: { title: string; description: string; imagePath: string }) => {
    setDialogImage(`${process.env.PUBLIC_URL}${item.imagePath}`);
    setDialogTitle(item.title);
    setDialogDescription(item.description);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 600,
            mt: 2
          }}
        >
          Data Analysis
        </Typography>
        
        <Divider sx={{ width: '80px', mx: 'auto', borderColor: 'secondary.main', borderWidth: 2, mb: 3 }} />
        
        <Typography variant="body1" sx={{ mb: 4 }} align="center" maxWidth="800px" mx="auto">
          Our analysis explores the relationships between various physical characteristics
          of crabs and their age, identifying key patterns and correlations that inform
          our prediction models.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {analysisData.map((item, index) => (
          <Grid item key={index} xs={12} md={6}>
            <AnalysisCard
              title={item.title}
              description={item.description}
              imagePath={item.imagePath}
              onExpand={() => handleOpenDialog(item)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary.main" fontWeight={600}>
          Key Findings
        </Typography>
        <Divider sx={{ width: '60px', borderColor: 'secondary.main', borderWidth: 2, mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary.main" fontWeight={600}>
                  Physical Measurements
                </Typography>
                <Typography variant="body2" paragraph>
                  Strong correlations were found between crab age and physical measurements,
                  particularly with shell weight and diameter. These relationships form the
                  foundation of our prediction models. Weight-related measurements showed the
                  highest correlation coefficients, indicating they are reliable predictors of age.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary.main" fontWeight={600}>
                  Sex-Based Variations
                </Typography>
                <Typography variant="body2" paragraph>
                  Notable differences in age-related characteristics were observed between
                  male and female crabs, suggesting sex-specific growth patterns. Female crabs
                  showed different weight-to-age relationships compared to males, which was
                  incorporated into our prediction models to improve accuracy.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      <Dialog
        open={!!dialogImage}
        maxWidth="lg"
        fullWidth
        onClose={() => setDialogImage(null)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">{dialogTitle}</Typography>
          <IconButton
            sx={{
              color: 'white',
            }}
            onClick={() => setDialogImage(null)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 3 }}>
          {dialogImage && (
            <>
              <img
                src={dialogImage}
                alt={dialogTitle}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  marginBottom: '16px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {dialogDescription}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Analysis;