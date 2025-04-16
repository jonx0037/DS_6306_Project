import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  IconButton,
  Container,
  Divider,
  Paper,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import InfoIcon from '@mui/icons-material/Info';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`visualization-tabpanel-${index}`}
      aria-labelledby={`visualization-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, md: 3 } }}>{children}</Box>}
    </div>
  );
};

interface VisualizationCardProps {
  title: string;
  description: string;
  imagePath: string;
  onExpand: () => void;
}

const VisualizationCard = ({ title, description, imagePath, onExpand }: VisualizationCardProps) => {
  const theme = useTheme();
  
  return (
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
          height="250"
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
            color: theme.palette.primary.main,
            '&:hover': { 
              bgcolor: 'rgba(255, 255, 255, 0.9)', 
              color: theme.palette.secondary.main 
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
          startIcon={<InfoIcon />}
          onClick={onExpand}
          variant="text"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

const visualizationCategories = [
  {
    category: 'Distribution Analysis',
    items: [
      {
        title: 'Age Distribution',
        description: 'Overall distribution of crab ages in the dataset, showing the frequency of different age groups across the sampled population.',
        imagePath: '/assets/plots/age_distribution.png'
      },
      {
        title: 'Age by Sex',
        description: 'Age distribution separated by crab sex, highlighting potential differences in age patterns between male and female crabs.',
        imagePath: '/assets/plots/age_by_sex.png'
      }
    ]
  },
  {
    category: 'Correlation Analysis',
    items: [
      {
        title: 'Correlation Matrix',
        description: 'Heatmap showing correlations between different measurements, with stronger colors indicating stronger relationships between variables.',
        imagePath: '/assets/plots/correlation_matrix.png'
      },
      {
        title: 'Feature Importance',
        description: 'Relative importance of different features in predicting age, based on our machine learning model analysis.',
        imagePath: '/assets/plots/feature_importance.png'
      }
    ]
  },
  {
    category: 'Physical Measurements',
    items: [
      {
        title: 'Length vs Age',
        description: 'Relationship between crab length and age, showing how this physical attribute correlates with the age of the crab.',
        imagePath: '/assets/plots/scatter_Length_vs_age.png'
      },
      {
        title: 'Weight vs Age',
        description: 'Relationship between crab weight and age, demonstrating how weight increases with age across the crab population.',
        imagePath: '/assets/plots/scatter_Weight_vs_age.png'
      },
      {
        title: 'Height vs Age',
        description: 'Analysis of how crab height relates to age, with trend lines showing the general pattern across the dataset.',
        imagePath: '/assets/plots/scatter_Height_vs_age.png'
      },
      {
        title: 'Shell Weight vs Age',
        description: 'Examination of the relationship between shell weight and crab age, an important predictor in our models.',
        imagePath: '/assets/plots/scatter_Shell.Weight_vs_age.png'
      }
    ]
  }
];

const Visualizations = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [dialogImage, setDialogImage] = useState<string | null>(null);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogDescription, setDialogDescription] = useState<string>('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  
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
          Data Visualizations
        </Typography>
        <Divider sx={{ width: '80px', mx: 'auto', borderColor: 'secondary.main', borderWidth: 2, mb: 3 }} />
        <Typography variant="body1" align="center" sx={{ maxWidth: '800px', mx: 'auto' }}>
          Explore our data visualizations showing key relationships between crab physical characteristics and age. 
          These visualizations helped guide our machine learning approach and revealed important insights about crab aging patterns.
        </Typography>
      </Box>

      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden', 
          mb: 4,
          bgcolor: 'background.paper'
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="secondary"
          aria-label="visualization categories"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: '1rem',
              py: 2,
              textTransform: 'none'
            }
          }}
        >
          {visualizationCategories.map((category, index) => (
            <Tab key={index} label={category.category} />
          ))}
        </Tabs>

        {visualizationCategories.map((category, index) => (
          <TabPanel key={index} value={currentTab} index={index}>
            <Grid container spacing={3}>
              {category.items.map((item, itemIndex) => (
                <Grid item key={itemIndex} xs={12} sm={6} md={category.items.length > 2 ? 6 : 6}>
                  <VisualizationCard
                    {...item}
                    onExpand={() => handleOpenDialog(item)}
                  />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        ))}
      </Paper>

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

export default Visualizations;