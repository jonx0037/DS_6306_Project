################################################################################
# DS_6306 Project 2: Crab Age Prediction
# Script: 05_model_prediction.R
# Description: Generate predictions for competition data
# Author: Jonathan Rocha, Kyle Davisson (Group 3)
# Date: April 7, 2025
################################################################################

# Load required libraries
library(tidyverse)  # For data manipulation
library(caret)      # For preprocessing

# Set seed for reproducibility
set.seed(6306)

# Load the best model
cat("Loading best model...\n")
best_model <- readRDS("models/best_model.rds")
cat("Best model loaded:", class(best_model)[1], "\n")

# Load preprocessing objects
cat("Loading preprocessing objects...\n")
preproc <- readRDS("output/preprocessing_object.rds")
feature_recipe <- tryCatch({
  readRDS("output/feature_engineering_recipe.rds")
}, error = function(e) {
  cat("Feature engineering recipe not found. Will apply basic preprocessing only.\n")
  NULL
})

selected_features <- tryCatch({
  readRDS("output/selected_features.rds")
}, error = function(e) {
  cat("Selected features list not found. Will use all features.\n")
  NULL
})

# Load competition data
cat("Loading competition data...\n")
competition_data <- tryCatch({
  read.csv("competition-1.csv")
}, error = function(e) {
  stop("Error loading competition data: ", e$message)
})

cat("Competition data dimensions:", dim(competition_data), "\n")
cat("Competition data column names:", names(competition_data), "\n")
cat("First few rows of competition data:\n")
print(head(competition_data))

# Load sample submission for reference
cat("\nLoading sample submission for reference...\n")
sample_submission <- tryCatch({
  read.csv("sample_submission-1.csv")
}, error = function(e) {
  stop("Error loading sample submission: ", e$message)
})

cat("Sample submission dimensions:", dim(sample_submission), "\n")
cat("Sample submission column names:", names(sample_submission), "\n")
cat("First few rows of sample submission:\n")
print(head(sample_submission))

# Preprocess competition data
cat("\nPreprocessing competition data...\n")

# Apply the same preprocessing steps as for training data
competition_data_processed <- predict(preproc, competition_data)

# Handle categorical variables (if any)
if ("Sex" %in% names(competition_data)) {
  cat("Converting 'Sex' to factor...\n")
  competition_data_processed$Sex <- as.factor(competition_data_processed$Sex)
}

# Apply feature engineering if recipe is available
if (!is.null(feature_recipe)) {
  cat("Applying feature engineering...\n")
  
  # Function to create ratio features (same as in feature engineering script)
  create_ratio_features <- function(data, predictors) {
    result <- data
    n <- length(predictors)
    
    # Create ratios between different measurements
    for (i in 1:(n-1)) {
      for (j in (i+1):n) {
        col1 <- predictors[i]
        col2 <- predictors[j]
        ratio_name <- paste0("ratio_", col1, "_to_", col2)
        result[[ratio_name]] <- data[[col1]] / data[[col2]]
      }
    }
    
    return(result)
  }
  
  # Identify numerical predictors (excluding id)
  numerical_predictors <- names(competition_data)[sapply(competition_data, is.numeric)]
  numerical_predictors <- setdiff(numerical_predictors, "id")
  
  # Create ratio features
  competition_data_processed <- create_ratio_features(competition_data_processed, numerical_predictors)
  
  # Select only the features used in the model
  if (!is.null(selected_features)) {
    # Ensure id column is included
    competition_data_processed <- competition_data_processed %>%
      select(id, all_of(intersect(names(competition_data_processed), selected_features)))
  }
}

cat("Processed competition data dimensions:", dim(competition_data_processed), "\n")

# Generate predictions
cat("\nGenerating predictions...\n")
competition_predictions <- predict(best_model, newdata = competition_data_processed %>% select(-id))

# Create submission file
cat("Creating submission file...\n")
submission <- data.frame(
  id = competition_data$id,
  Age = competition_predictions
)

# Ensure submission has the same format as sample_submission
if (nrow(submission) != nrow(sample_submission)) {
  warning("Submission has different number of rows than sample submission!")
}

if (!all(submission$id == sample_submission$id)) {
  warning("Submission IDs don't match sample submission IDs!")
  # Sort by ID to match sample submission
  submission <- submission %>% arrange(id)
}

# Save submission file
cat("Saving submission file...\n")
write.csv(submission, "output/submission.csv", row.names = FALSE)

# Basic statistics of predictions
cat("\nBasic statistics of predictions:\n")
summary_stats <- summary(submission$Age)
print(summary_stats)

# Create histogram of predictions
cat("Creating histogram of predictions...\n")
pred_hist <- ggplot(submission, aes(x = Age)) +
  geom_histogram(bins = 30, fill = "steelblue", color = "black", alpha = 0.7) +
  labs(
    title = "Distribution of Predicted Crab Ages",
    subtitle = "Competition Data",
    x = "Predicted Age (years)",
    y = "Count"
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold"),
    plot.subtitle = element_text(size = 12),
    axis.title = element_text(size = 12),
    axis.text = element_text(size = 10)
  )

# Save the histogram
if (!dir.exists("output/plots")) {
  dir.create("output/plots", recursive = TRUE)
}
ggsave("output/plots/prediction_distribution.png", pred_hist, width = 10, height = 6, dpi = 300)

cat("\nPrediction generation completed. Submission file saved as 'output/submission.csv'.\n")
cat("Remember to upload this file to the competition platform!\n")

