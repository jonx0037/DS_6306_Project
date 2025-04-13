import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
} from '@mui/material';

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
      id={`model-tabpanel-${index}`}
      aria-labelledby={`model-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

interface ModelMetrics {
  modelName: string;
  metrics: {
    rmse: number;
    mae: number;
    r2: number;
  };
  description: string;
  performancePlot: string;
}

const models: ModelMetrics[] = [
  {
    modelName: 'XGBoost',
    metrics: {
      rmse: 1.42,
      mae: 1.15,
      r2: 0.85,
    },
    description: 'XGBoost demonstrated superior performance in predicting crab age, ' +
                'particularly excelling in capturing non-linear relationships between physical measurements.',
    performancePlot: '/output/plots/prediction_vs_actual.png'
  },
  {
    modelName: 'Random Forest',
    metrics: {
      rmse: 1.48,
      mae: 1.18,
      r2: 0.83,
    },
    description: 'Random Forest provided robust predictions with good generalization, ' +
                'showing strength in handling the varied nature of crab measurements.',
    performancePlot: '/output/plots/prediction_distribution.png'
  },
  {
    modelName: 'SVM',
    metrics: {
      rmse: 1.55,
      mae: 1.25,
      r2: 0.81,
    },
    description: 'Support Vector Machine showed decent performance with good handling ' +
                'of outliers in the dataset.',
    performancePlot: '/output/plots/residual_plot.png'
  }
];

const Models = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Model Performance
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }} align="center">
        We implemented and compared several machine learning models to predict crab age.
        Each model brings unique strengths to the prediction task.
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 4 }}
      >
        {models.map((model, index) => (
          <Tab key={index} label={model.modelName} />
        ))}
      </Tabs>

      {models.map((model, index) => (
        <TabPanel key={index} value={currentTab} index={index}>
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(12, 1fr)' }}>
            {/* Model Description */}
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 12', lg: 'span 4' } }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Overview
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {model.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Performance Metrics
                  </Typography>
                  <TableContainer component={Paper} elevation={0}>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell>RMSE</TableCell>
                          <TableCell align="right">{model.metrics.rmse.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>MAE</TableCell>
                          <TableCell align="right">{model.metrics.mae.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>R²</TableCell>
                          <TableCell align="right">{model.metrics.r2.toFixed(2)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Performance Plot */}
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 12', lg: 'span 8' } }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Visualization
                  </Typography>
                  <CardMedia
                    component="img"
                    image={model.performancePlot}
                    alt={`${model.modelName} performance plot`}
                    sx={{ 
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      bgcolor: 'background.paper'
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
          </Box>
        </TabPanel>
      ))}

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Model Comparison
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell align="right">RMSE</TableCell>
                <TableCell align="right">MAE</TableCell>
                <TableCell align="right">R²</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.modelName}>
                  <TableCell component="th" scope="row">
                    {model.modelName}
                  </TableCell>
                  <TableCell align="right">{model.metrics.rmse.toFixed(2)}</TableCell>
                  <TableCell align="right">{model.metrics.mae.toFixed(2)}</TableCell>
                  <TableCell align="right">{model.metrics.r2.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Models;