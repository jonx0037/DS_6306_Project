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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

interface VisualizationCardProps {
  title: string;
  description: string;
  imagePath: string;
  onExpand: () => void;
}

const VisualizationCard = ({ title, description, imagePath, onExpand }: VisualizationCardProps) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="250"
        image={imagePath}
        alt={title}
        sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'background.default' },
        }}
        onClick={onExpand}
      >
        <ZoomOutMapIcon />
      </IconButton>
    </Box>
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

const visualizationCategories = [
  {
    category: 'Distribution Analysis',
    items: [
      {
        title: 'Age Distribution',
        description: 'Overall distribution of crab ages in the dataset.',
        imagePath: '/output/plots/age_distribution.png'
      },
      {
        title: 'Age by Sex',
        description: 'Age distribution separated by crab sex.',
        imagePath: '/output/plots/age_by_sex.png'
      }
    ]
  },
  {
    category: 'Correlation Analysis',
    items: [
      {
        title: 'Correlation Matrix',
        description: 'Heatmap showing correlations between different measurements.',
        imagePath: '/output/plots/correlation_matrix.png'
      },
      {
        title: 'Feature Importance',
        description: 'Relative importance of different features in predicting age.',
        imagePath: '/output/plots/feature_importance.png'
      }
    ]
  },
  {
    category: 'Physical Measurements',
    items: [
      {
        title: 'Length vs Age',
        description: 'Relationship between crab length and age.',
        imagePath: '/output/plots/scatter_Length_vs_age.png'
      },
      {
        title: 'Weight vs Age',
        description: 'Relationship between crab weight and age.',
        imagePath: '/output/plots/scatter_Weight_vs_age.png'
      }
    ]
  }
];

const Visualizations = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [dialogImage, setDialogImage] = useState<string | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Visualizations
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 4 }}
      >
        {visualizationCategories.map((category, index) => (
          <Tab key={index} label={category.category} />
        ))}
      </Tabs>

      {visualizationCategories.map((category, index) => (
        <TabPanel key={index} value={currentTab} index={index}>
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(12, 1fr)' }}>
            {category.items.map((item, itemIndex) => (
              <Box
                key={itemIndex}
                sx={{
                  gridColumn: {
                    xs: 'span 12',
                    md: 'span 6'
                  }
                }}
              >
                <VisualizationCard
                  {...item}
                  onExpand={() => setDialogImage(item.imagePath)}
                />
              </Box>
            ))}
          </Box>
        </TabPanel>
      ))}

      <Dialog
        open={!!dialogImage}
        maxWidth="lg"
        fullWidth
        onClose={() => setDialogImage(null)}
      >
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.default' },
            }}
            onClick={() => setDialogImage(null)}
          >
            <CloseIcon />
          </IconButton>
          {dialogImage && (
            <img
              src={dialogImage}
              alt="Enlarged visualization"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Visualizations;