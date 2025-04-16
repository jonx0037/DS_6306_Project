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
