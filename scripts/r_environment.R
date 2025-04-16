################################################################################
# DS_6306 Project 2: Crab Age Prediction
# Script: r_environment.R
# Description: Environment setup and package installation for Crab Age prediction project
# Author: Jonathan Rocha, Kyle Davisson (Group 3)
# Date: April 15, 2025
################################################################################

# Record R version information
cat("R Version Information:\n")
print(version)
cat("\n")

# Function to install packages if they're not already installed
install_if_missing <- function(packages) {
  new_packages <- packages[!(packages %in% installed.packages()[,"Package"])]
  if(length(new_packages)) {
    cat("Installing packages:", paste(new_packages, collapse=", "), "\n")
    install.packages(new_packages)
  } else {
    cat("All required packages are already installed.\n")
  }
  
  # Load all packages
  cat("Loading packages...\n")
  for(package in packages) {
    library(package, character.only = TRUE)
    cat("Loaded:", package, "\n")
  }
}

# List of required packages
required_packages <- c(
  # Data manipulation and visualization
  "tidyverse",   # Collection of packages for data science
  "dplyr",       # Data manipulation
  "ggplot2",     # Data visualization
  "tidyr",       # Data tidying
  "readr",       # Data import
  "purrr",       # Functional programming tools
  
  # Machine learning and modeling
  "caret",       # Machine learning framework
  "randomForest", # Random forest algorithms
  "e1071",       # SVM implementation
  "xgboost",     # Gradient boosting
  "glmnet",      # Regularized regression
  
  # Visualization
  "corrplot",    # Correlation visualization
  "ggcorrplot",  # Correlation plots with ggplot2
  "gridExtra",   # Arrange multiple plots
  "viridis",     # Color palettes
  
  # Preprocessing and feature engineering
  "recipes",     # Feature engineering pipelines
  "vtreat",      # Variable treatment
  
  # Utility
  "knitr",       # Dynamic report generation
  "rmarkdown",   # R Markdown
  "here",        # File path management
  "doParallel"   # Parallel processing
)

# Install and load packages
install_if_missing(required_packages)

cat("\nEnvironment setup complete.\n")
cat("Run this script at the beginning of your R session to ensure all required packages are available.\n")

# Set seed for reproducibility across the project
set.seed(6306)
cat("Random seed set to 6306 for reproducibility.\n")

# Set default working directory
# Uncomment and modify the line below when sharing this script
# setwd("/path/to/DS_6306_Project")

cat("\nRecommended workflow:\n")
cat("1. source('scripts/r_environment.R')\n")
cat("2. source('scripts/01_data_cleaning.R')\n")
cat("3. source('scripts/02_exploratory_analysis.R')\n")
cat("4. source('scripts/03_feature_engineering.R')\n")
cat("5. source('scripts/04_model_training.R')\n")
cat("6. source('scripts/05_model_prediction.R')\n")