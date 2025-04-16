# Crab Age Prediction Project
DS 6306 - SMU Data Science Masters Program

## Project Overview
This project applies machine learning techniques to predict crab ages based on physical measurements. The project combines R-based data science with a React TypeScript web application for presenting results.

## Project Structure
```
DS_6306_Project/
├── Input Data
│   ├── train-1.csv              # Training dataset
│   ├── competition-1.csv        # Test dataset
│   └── sample_submission-1.csv  # Submission format
│
├── R Analysis Pipeline
│   ├── scripts/
│   │   ├── 01_data_cleaning.R        # Data preprocessing
│   │   ├── 02_exploratory_analysis.R # Data exploration
│   │   ├── 03_feature_engineering.R  # Feature creation
│   │   ├── 04_model_training.R       # Model development
│   │   ├── 05_model_prediction.R     # Predictions
│   │   └── 06_shiny_dashboard.R      # Dashboard
│   │
│   ├── models/                  # Trained ML models
│   │   ├── best_model.rds
│   │   ├── linear_regression_model.rds
│   │   ├── random_forest_model.rds
│   │   ├── svm_model.rds
│   │   └── xgboost_model.rds
│   │
│   ├── output/                  # Analysis outputs
│   │   ├── plots/              # Generated visualizations
│   │   ├── model_comparison.csv
│   │   └── submission.csv
│   │
│   └── reports/                 # Analysis documentation
│
└── Web Application
    └── ds6306-crab-presentation/
        ├── src/                 # React source code
        │   ├── components/      # UI components
        │   ├── pages/          # Page components
        │   └── styles/         # Styling
        └── public/             # Static assets
```

## Analysis Pipeline
1. **Data Preprocessing**
   - Initial data cleaning
   - Feature normalization
   - Missing value handling

2. **Model Development**
   - Feature engineering and selection
   - Model training and validation (5 different models)
   - Performance comparison
   - Final model selection

3. **Results Visualization**
   - Statistical analysis plots
   - Model performance metrics
   - Feature importance analysis
   - Prediction visualizations

## Web Application Features
- Interactive data exploration
- Model results visualization
- Mobile-responsive design
- TypeScript-based components
- Modern React architecture

## Data Source
The crab dataset contains physical measurements including sex, length, diameter, height, and various weight measurements, along with the age of crabs. This dataset is used for predictive modeling to determine crab age based on physical characteristics, which has applications in marine biology research and sustainable fishery management.

## Dependencies

### R Analysis
- R version 4.2.0 or higher
- Required Packages:
  - tidyverse (data manipulation and visualization)
  - caret (machine learning and preprocessing)
  - randomForest (for Random Forest model)
  - e1071 (for SVM model)
  - xgboost (for XGBoost model)
  - ggplot2 (visualization)
  - corrplot (correlation visualization)

### Web Application
- Node.js 16.x or higher
- npm 8.x or higher
- React 18.2
- TypeScript 4.9
- Material UI 5.13
- Recharts 2.6 (for data visualization)

## Setup Instructions
1. **R Analysis**
   ```r
   # Execute scripts in sequence
   source("scripts/01_data_cleaning.R")
   source("scripts/02_exploratory_analysis.R")
   source("scripts/03_feature_engineering.R")
   source("scripts/04_model_training.R")
   source("scripts/05_model_prediction.R")
   ```

2. **Web Application**
   ```bash
   cd ds6306-crab-presentation
   npm install
   npm start
   ```

   Note: Visualizations are automatically linked from the R output directory

## Project Documentation
- Detailed analysis in `reports/analysis_report.Rmd`
- Model documentation in output files
- React component documentation in source files
- Visualization descriptions in plots directory

## File Organization
- Generated plots are in `output/plots/`
- Models are saved in `models/`
- Web app uses symbolic links to access plots
- All intermediate data files are in `output/`

## Version Control
This project uses Git for version control with the following branch structure:
- `main`: Production-ready code
- `development`: Integration branch for feature development
- `feature/*`: Individual feature branches

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Create a Pull Request to the development branch

## Testing Strategy
- **R Analysis**:
  - Model validation using 5-fold cross-validation
  - Performance metrics: RMSE, MAE, R²
  - Out-of-sample testing with held-out validation set (20% of data)

- **Web Application**:
  - Jest unit tests for React components
  - End-to-end testing with React Testing Library
  - Cross-browser compatibility testing

## Deployment Information
- The web application is deployed to GitHub Pages: https://jonx0037.github.io/DS_6306_Project
- For local deployment:
  ```bash
  cd ds6306-crab-presentation
  npm run build
  # Serve the build directory with your preferred HTTP server
  ```
- R analysis results are stored in version control and linked to the web application

## Project Status
- **Current Status**: Active Development (As of April 15, 2025)
- **Completed**:
  - Data preprocessing
  - Exploratory data analysis
  - Model training and validation
  - Basic web application structure
- **In Progress**:
  - Refining model performance
  - Enhancing visualization interactivity
  - Documentation improvements
- **Planned**:
  - Integration of additional feature engineering techniques
  - Implementation of ensemble modeling approach
  - Deployment of Shiny dashboard for data exploration

## Project Team
- Jonathan Rocha - Data Scientist, Web Developer
- Kyle Davisson - Data Scientist, Model Development

For questions or contributions, please contact: jonathan.rocha@smu.edu
