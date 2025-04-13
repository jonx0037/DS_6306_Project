################################################################################
# DS_6306 Project 2: Crab Age Prediction
# Script: 01_data_cleaning.R
# Description: Data cleaning and preprocessing for crab age prediction
# Author: Jonathan Rocha, Kyle Davisson (Group 3)
# Date: April 7, 2025
################################################################################

# Load required libraries
library(tidyverse)  # For data manipulation and visualization
library(caret)      # For data preprocessing

# Set seed for reproducibility
set.seed(6306)

# Load the training data
cat("Loading training data...\n")
train_data <- tryCatch({
  read.csv("~/Desktop/DS_6306_Project/train-1.csv")
}, error = function(e) {
  stop("Error loading training data: ", e$message)
})

# Display basic information about the dataset
cat("Training data dimensions:", dim(train_data), "\n")
cat("Training data column names:", names(train_data), "\n")
cat("First few rows of training data:\n")
print(head(train_data))

# Check for missing values
cat("\nChecking for missing values...\n")
missing_values <- colSums(is.na(train_data))
print(missing_values)

if (sum(missing_values) > 0) {
  cat("Handling missing values...\n")
  # Impute missing values or remove rows with missing values
  # This will be implemented based on the actual data structure
} else {
  cat("No missing values found.\n")
}

# Check for outliers in numerical columns
cat("\nChecking for outliers in numerical columns...\n")
numerical_cols <- sapply(train_data, is.numeric)
numerical_data <- train_data[, numerical_cols]

# Function to identify outliers using IQR method
identify_outliers <- function(x) {
  q1 <- quantile(x, 0.25, na.rm = TRUE)
  q3 <- quantile(x, 0.75, na.rm = TRUE)
  iqr <- q3 - q1
  lower_bound <- q1 - 1.5 * iqr
  upper_bound <- q3 + 1.5 * iqr
  return(sum(x < lower_bound | x > upper_bound, na.rm = TRUE))
}

# Apply the function to each numerical column
outliers_count <- sapply(numerical_data, identify_outliers)
print(outliers_count)

# Handle categorical variables (if any)
cat("\nHandling categorical variables...\n")
# Check if 'Sex' is a column in the dataset
if ("Sex" %in% names(train_data)) {
  cat("Converting 'Sex' to factor...\n")
  train_data$Sex <- as.factor(train_data$Sex)
  cat("Levels of Sex:", levels(train_data$Sex), "\n")
}

# Normalize/standardize numerical features
cat("\nNormalizing numerical features...\n")
# Identify columns to normalize (exclude ID and target variable)
cols_to_normalize <- setdiff(names(numerical_data), c("id", "Age"))

# Create preprocessing object
preproc <- preProcess(train_data[, cols_to_normalize], method = c("center", "scale"))
train_data_normalized <- predict(preproc, train_data)

cat("First few rows of normalized data:\n")
print(head(train_data_normalized[, cols_to_normalize]))

# Split data into training and validation sets (80% train, 20% validation)
cat("\nSplitting data into training and validation sets...\n")
train_index <- createDataPartition(train_data$Age, p = 0.8, list = FALSE)
training_set <- train_data[train_index, ]
validation_set <- train_data[-train_index, ]

cat("Training set dimensions:", dim(training_set), "\n")
cat("Validation set dimensions:", dim(validation_set), "\n")

# Save preprocessed data for later use
cat("\nSaving preprocessed data...\n")
saveRDS(train_data, "output/train_data_raw.rds")
saveRDS(train_data_normalized, "output/train_data_normalized.rds")
saveRDS(training_set, "output/training_set.rds")
saveRDS(validation_set, "output/validation_set.rds")
saveRDS(preproc, "output/preprocessing_object.rds")

cat("\nData cleaning and preprocessing completed.\n")
cat("Preprocessed data saved in the 'output' directory.\n")

