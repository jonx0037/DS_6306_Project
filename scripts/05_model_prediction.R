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

# Preprocess & Feature‑Engineer Competition Data
cat("\nPreprocessing competition data...\n")

# a) Initial caret preProcess (imputation, centering/scaling)
competition_pp <- predict(preproc, competition_data)

# b) Full recipes pipeline (interactions, polys, normalization)
competition_fe <- bake(feature_recipe, new_data = competition_pp)

# c) Manually recreate ratio features (since your recipe doesn’t include them)
create_ratio_features <- function(data, predictors) {
  result <- data
  n <- length(predictors)
  for (i in seq_len(n-1)) {
    for (j in seq((i+1), n)) {
      col1 <- predictors[i]; col2 <- predictors[j]
      ratio_name <- paste0("ratio_", col1, "_to_", col2)
      result[[ratio_name]] <- data[[col1]] / data[[col2]]
    }
  }
  result
}

# Identify raw numeric cols (excluding id)
num_cols <- setdiff(
  names(competition_data)[sapply(competition_data, is.numeric)],
  "id"
)

# Build a small DF of ratio features from the pre-processed raw data
competition_ratios <- create_ratio_features(
  competition_pp[, num_cols], num_cols
) %>% 
  select(starts_with("ratio_"))

# d) Combine baked features + ratio features, then re‑attach id and subset
competition_full <- bind_cols(competition_fe, competition_ratios)

competition_final <- bind_cols(
  id = competition_data$id,
  competition_full %>% select(all_of(selected_features))
)

cat("Final competition data dimensions:", dim(competition_final), "\n")

# Encode predictors for numeric-only models (XGB, SVM)
cat("\nEncoding predictors for numeric-only model...\n")

# a) Read in the same final training data you used for modeling
train_data_final <- readRDS("output/train_data_final.rds")

# b) Recreate the dummyVars mapping on all predictor columns
# Note: drop id and Age
dummies <- dummyVars(
  formula = ~ .,
  data    = train_data_final %>% select(-id, -Age)
)

# c) Apply to competition features (also drop id)
competition_mat <- predict(
  dummies,
  newdata = competition_final %>% select(-id)
)

# d) Now generate predictions
cat("Generating predictions...\n")
competition_predictions <- predict(best_model, newdata = competition_mat)

# Create submission file
cat("Creating submission file...\n")
submission <- tibble(
  id  = competition_final$id,
  Age = competition_predictions
)

# Sanity checks against the sample submission
if (nrow(submission) != nrow(sample_submission))
  stop("❌ Row count mismatch vs. sample submission!")
if (!all(submission$id == sample_submission$id))
  stop("❌ IDs misaligned vs. sample submission!")

# Write it out
write_csv(submission, "output/submission.csv")
cat("Submission file saved to output/submission.csv\n")

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

