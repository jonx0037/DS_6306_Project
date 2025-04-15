# Crab Age Prediction Project

## Project Overview

This project, developed as part of the DS 6306 course at Southern Methodist University, focuses on developing a machine learning solution for predicting crab ages based on physical measurements. Our approach combines statistical analysis, machine learning, and interactive data visualization to create accurate age prediction models.

Visit our project website: [https://jonx0037.github.io/DS_6306_Project/](https://jonx0037.github.io/DS_6306_Project/)

### Key Objectives

1. **Age Prediction Model**: Develop accurate regression models to predict crab age using physical measurements
2. **Feature Analysis**: Identify and analyze key physical characteristics that best indicate crab age
3. **Interactive Visualization**: Create comprehensive visualizations to communicate findings effectively
4. **Statistical Insights**: Provide detailed statistical analysis of relationships between physical attributes and age

## Features

- **Multiple Model Comparison**: Implementation and comparison of various machine learning models
- **Interactive Visualizations**: Dynamic charts and plots showing relationships between variables
- **Comprehensive Analysis**: In-depth statistical analysis of crab physical characteristics
- **Feature Engineering**: Advanced feature creation and selection techniques

## Technical Implementation

### Data Science Stack

- **R**: Primary language for statistical analysis and modeling
  - Data cleaning and preprocessing
  - Feature engineering
  - Model training and evaluation
  - Statistical analysis
  - R Shiny dashboard development

- **React**: Frontend web development
  - Interactive visualization presentation
  - Responsive design
  - Modern user interface
  - Component-based architecture

### Models Implemented

- Linear Regression
- Random Forest
- Support Vector Machine (SVM)
- XGBoost
- Ensemble Methods

### Key Features Analyzed

- Sex
- Length
- Diameter
- Height
- Weight
- Shucked Weight
- Viscera Weight
- Shell Weight

## Repository Structure

```
DS_6306_Project/
├── data/                      # Data directory
│   ├── train-1.csv           # Training data
│   └── sample_submission-1.csv # Sample submission format
├── scripts/                   # R scripts directory
│   ├── 01_data_cleaning.R    # Data cleaning and preprocessing
│   ├── 02_exploratory_analysis.R # EDA with visualizations
│   ├── 03_feature_engineering.R # Feature creation and selection
│   ├── 04_model_training.R   # Model training and evaluation
│   ├── 05_model_prediction.R # Generate predictions
│   └── 06_shiny_dashboard.R  # RShiny dashboard code
├── models/                    # Trained model files
├── output/                    # Analysis outputs
│   ├── plots/                # Visualization files
│   └── model_results/        # Model evaluation results
├── reports/                   # Analysis reports
└── ds6306-crab-presentation/ # Project website
```

## Getting Started

### Prerequisites

Required R packages:
```r
install.packages(c(
    "tidyverse", "caret", "randomForest", "xgboost", "e1071",
    "corrplot", "gridExtra", "ggpubr", "recipes", "vip",
    "doParallel", "shiny", "shinydashboard", "shinythemes",
    "plotly", "DT", "knitr", "kableExtra"
))
```

### Running the Analysis

1. Clone the repository
2. Install required R packages
3. Run scripts in numerical order (01_data_cleaning.R through 06_shiny_dashboard.R)
4. View results in the output directory
5. Run the Shiny dashboard for interactive exploration

## Team

- **Jonathan Rocha**
  - React App Development
  - R Shiny Development
  - Website Implementation
  - ML Engineering & Data Visualization

- **Kyle Davisson**
  - R Code Analysis
  - Statistical Modeling
  - R Shiny Dashboard Development
  - Applied Statistical Analysis

## Project Website

Visit our project website for interactive visualizations and detailed analysis:
[https://jonx0037.github.io/DS_6306_Project/](https://jonx0037.github.io/DS_6306_Project/)

## Project Status

This project is actively being developed for the DS 6306 course at Southern Methodist University.
Project Deadline: Sunday, April 21st, 2025 at 11:59 pm CST
