################################################################################
# DS_6306 Project 2: Crab Age Prediction
# Script: 03_feature_engineering.R
# Description: Feature engineering for crab age prediction
# Author: Jonathan Rocha, Kyle Davisson (Group 3)
# Date: April 7, 2025
################################################################################

# Load required libraries
library(tidyverse)  # For data manipulation
library(caret)      # For feature selection
library(recipes)    # For feature engineering
library(vip)        # For variable importance

# Set seed for reproducibility
set.seed(6306)

# Load the preprocessed data
cat("Loading preprocessed data...\n")
train_data <- readRDS("~/Desktop/DS_6306_Project/output/train_data_raw.rds")
training_set <- readRDS("~/Desktop/DS_6306_Project/output/training_set.rds")
validation_set <- readRDS("~/Desktop/DS_6306_Project/output/validation_set.rds")

# Identify numerical predictors (excluding id and Age)
numerical_predictors <- names(train_data)[sapply(train_data, is.numeric)]
numerical_predictors <- setdiff(numerical_predictors, c("id", "Age"))

cat("Numerical predictors:", numerical_predictors, "\n")

# 1. Create interaction terms
cat("\nCreating interaction terms...\n")
# Create a recipe for feature engineering
recipe_obj <- recipe(Age ~ ., data = training_set) %>%
  # Remove id column
  step_rm(id) %>%
  # Create all 2-way interactions between numerical predictors
  step_interact(terms = ~ all_numeric_predictors():all_numeric_predictors()) %>%
  # Create polynomial terms for key predictors
  step_poly(all_of(numerical_predictors), degree = 2) %>%
  # Center and scale only numeric predictors
  step_normalize(all_numeric_predictors())

# Print the recipe
cat("Recipe summary:\n")
print(recipe_obj)

# Prepare the recipe
recipe_prepped <- prep(recipe_obj, training = training_set)

# Apply the recipe to the training and validation sets
train_data_fe <- bake(recipe_prepped, new_data = training_set)
valid_data_fe <- bake(recipe_prepped, new_data = validation_set)

cat("Dimensions of feature-engineered training data:", dim(train_data_fe), "\n")
cat("Column names of feature-engineered data (first 10):", 
    paste(names(train_data_fe)[1:min(10, ncol(train_data_fe))], collapse = ", "), "...\n")

# 2. Create ratio features
cat("\nCreating ratio features...\n")

# Function to create ratio features (unchanged)
create_ratio_features <- function(data, predictors) {
  result <- data
  n <- length(predictors)
  
  for (i in 1:(n-1)) {
    for (j in (i+1):n) {
      col1 <- predictors[i]
      col2 <- predictors[j]
      ratio_name <- paste0("ratio_", col1, "_to_", col2)
      result[[ratio_name]] <- data[[col1]] / data[[col2]]
    }
  }
  
  result
}

# 2a) Build ratio‑only tables from the raw preprocessed data
ratio_train <- create_ratio_features(training_set, numerical_predictors) %>%
  select(starts_with("ratio_"))
ratio_valid <- create_ratio_features(validation_set, numerical_predictors) %>%
  select(starts_with("ratio_"))

# 2b) Bind id back on, then recipe output, then ratios
train_data_with_ratios <- bind_cols(id = training_set$id, train_data_fe,
                                    ratio_train)
valid_data_with_ratios <- bind_cols(id = validation_set$id, valid_data_fe, 
                                    ratio_valid)
saveRDS(
  train_data_with_ratios,
  file = "output/train_data_full_features.rds"
)
cat(
  "Dimensions of training data with interactions/polys/normalized originals + ratios:",
  dim(train_data_with_ratios), "\n"
)
cat(
  "New ratio features (first 5):",
  paste(names(ratio_train)[1:min(5, ncol(ratio_train))], collapse = ", "),
  "...\n"
)

# 3. Feature selection using correlation
cat("\nPerforming feature selection using correlation...\n")
# Calculate correlation with target variable (only for numeric variables)
target_correlations <- sapply(train_data_with_ratios %>% 
                               select(-id, -Age) %>%
                               select_if(is.numeric), 
                             function(x) cor(x, train_data_with_ratios$Age, use = "complete.obs"))

# Sort correlations by absolute value
sorted_correlations <- sort(abs(target_correlations), decreasing = TRUE)
cat("Top 10 features by correlation with Age:\n")
print(head(sorted_correlations, 10))

# Select features with absolute correlation above threshold
correlation_threshold <- 0.3
selected_features_cor <- names(target_correlations[abs(target_correlations) > correlation_threshold])
cat("Selected", length(selected_features_cor), "features with absolute correlation >", 
    correlation_threshold, "with Age\n")

# 4. Use correlation-based feature selection only
cat("\nUsing correlation-based feature selection...\n")

# Use the features selected by correlation
all_selected_features <- selected_features_cor

# Add Sex as a categorical feature if it's not already included
if (!"Sex" %in% all_selected_features) {
  all_selected_features <- c(all_selected_features, "Sex")
  cat("Added categorical feature 'Sex' to selected features\n")
}

cat("Total of", length(all_selected_features), "features selected\n")

# Ensure all selected features exist in the data
all_selected_features <- all_selected_features[all_selected_features %in% names(train_data_with_ratios)]
cat("After filtering, using", length(all_selected_features), "features that exist in the dataset\n")

# Create final feature sets
train_data_final <- train_data_with_ratios %>% 
  select(id, Age, all_of(all_selected_features))
valid_data_final <- valid_data_with_ratios %>% 
  select(id, Age, all_of(all_selected_features))

cat("Dimensions of final training data:", dim(train_data_final), "\n")
cat("Dimensions of final validation data:", dim(valid_data_final), "\n")

# 6. Save feature-engineered datasets
cat("\nSaving feature-engineered datasets...\n")
saveRDS(train_data_final, "output/train_data_final.rds")
saveRDS(valid_data_final, "output/valid_data_final.rds")
saveRDS(recipe_prepped, "output/feature_engineering_recipe.rds")
saveRDS(all_selected_features, "output/selected_features.rds")

# 7. Create a feature importance plot
cat("\nCreating feature importance plot...\n")
# Train a simple random forest model to get feature importance
rf_model <- randomForest::randomForest(
  Age ~ ., 
  data = train_data_final %>% select(-id),
  importance = TRUE,
  ntree = 100
)

# Extract variable importance
importance_df <- as.data.frame(randomForest::importance(rf_model))
importance_df$Feature <- rownames(importance_df)
importance_df <- importance_df %>% 
  arrange(desc(`%IncMSE`)) %>%
  mutate(Feature = factor(Feature, levels = Feature))

# Create importance plot
importance_plot <- ggplot(importance_df %>% head(20), 
                         aes(x = `%IncMSE`, y = reorder(Feature, `%IncMSE`))) +
  geom_bar(stat = "identity", fill = "steelblue") +
  labs(
    title = "Top 20 Features by Importance",
    subtitle = "Based on Random Forest Mean Decrease in MSE",
    x = "% Increase in MSE when Feature is Permuted",
    y = "Feature"
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold"),
    plot.subtitle = element_text(size = 12),
    axis.title = element_text(size = 12),
    axis.text = element_text(size = 10)
  )

# Save the plot
if (!dir.exists("output/plots")) {
  dir.create("output/plots", recursive = TRUE)
}
ggsave("output/plots/feature_importance.png", importance_plot, width = 10, height = 8, dpi = 300)

cat("\nFeature engineering completed.\n")
