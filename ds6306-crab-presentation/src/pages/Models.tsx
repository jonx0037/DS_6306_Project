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
  Container,
  Divider,
  Grid,
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
    performancePlot: '/assets/plots/prediction_vs_actual.png'
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
    performancePlot: '/assets/plots/prediction_distribution.png'
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
    performancePlot: '/assets/plots/residual_plot.png'
  }
];

const Models = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
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
          Model Performance
        </Typography>
        <Divider sx={{ width: '80px', mx: 'auto', borderColor: 'secondary.main', borderWidth: 2, mb: 3 }} />
        <Typography variant="body1" sx={{ mb: 4 }} align="center" maxWidth="800px" mx="auto">
          We implemented and compared several machine learning models to predict crab age.
          Each model brings unique strengths to the prediction task.
        </Typography>
      </Box>

      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden', 
          mb: 4 
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="secondary"
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
          {models.map((model, index) => (
            <Tab key={index} label={model.modelName} />
          ))}
        </Tabs>

        {models.map((model, index) => (
          <TabPanel key={index} value={currentTab} index={index}>
            <Grid container spacing={4}>
              {/* Model Description */}
              <Grid item xs={12} lg={4}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary.main" fontWeight={600}>
                      Overview
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {model.description}
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="primary.main" fontWeight={600}>
                      Performance Metrics
                    </Typography>
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 500 }}>RMSE</TableCell>
                            <TableCell align="right">{model.metrics.rmse.toFixed(2)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 500 }}>MAE</TableCell>
                            <TableCell align="right">{model.metrics.mae.toFixed(2)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 500 }}>R²</TableCell>
                            <TableCell align="right">{model.metrics.r2.toFixed(2)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Performance Plot */}
              <Grid item xs={12} lg={8}>
                <Card sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary.main" fontWeight={600}>
                      Performance Visualization
                    </Typography>
                    <CardMedia
                      component="img"
                      image={`${process.env.PUBLIC_URL}${model.performancePlot}`}
                      alt={`${model.modelName} performance plot`}
                      sx={{ 
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        bgcolor: 'background.paper',
                        borderRadius: 1
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        ))}
      </Paper>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary.main" fontWeight={600}>
          Model Comparison
        </Typography>
        <Divider sx={{ width: '60px', borderColor: 'secondary.main', borderWidth: 2, mb: 3 }} />
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Model</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 600 }}>RMSE</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 600 }}>MAE</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 600 }}>R²</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {models.map((model, index) => (
                <TableRow 
                  key={model.modelName}
                  sx={{
                    backgroundColor: index === 0 ? 'rgba(53, 76, 161, 0.05)' : 'inherit',
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: index === 0 ? 600 : 400 }}>
                    {model.modelName}{index === 0 ? ' (Best)' : ''}
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
    </Container>
  );
};

export default Models;