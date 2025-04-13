# Test script to verify the recipe fix
library(tidyverse)
library(recipes)

# Create a log file
log_file <- "output/test_recipe_log.txt"
file.create(log_file)

# Function to log messages to both console and file
log_message <- function(msg) {
  cat(msg)
  cat(msg, file = log_file, append = TRUE)
}

# Load the training set
log_message("Loading training set...\n")
training_set <- readRDS("output/training_set.rds")

# Check if Sex is a factor
log_message(paste("\nIs Sex a factor?", is.factor(training_set$Sex), "\n"))

# Create the recipe with the fix
log_message("\nCreating recipe...\n")
recipe_obj <- recipe(Age ~ ., data = training_set) %>%
  step_rm(id) %>%
  step_interact(terms = ~ all_numeric_predictors():all_numeric_predictors()) %>%
  step_poly(all_of(names(training_set)[sapply(training_set, is.numeric) & 
                                      !names(training_set) %in% c("id", "Age")]), 
           degree = 2) %>%
  step_normalize(all_numeric_predictors())

# Try to prep the recipe
log_message("\nPrepping the recipe...\n")
tryCatch({
  recipe_prepped <- prep(recipe_obj, training = training_set)
  log_message("Recipe prepped successfully!\n")
  
  # Try to bake the recipe
  log_message("\nBaking the recipe...\n")
  train_data_fe <- bake(recipe_prepped, new_data = training_set)
  log_message("Recipe baked successfully!\n")
  
  # Print dimensions of the feature-engineered data
  log_message(paste("\nDimensions of feature-engineered data:", 
                   paste(dim(train_data_fe), collapse = " x "), "\n"))
  
  # Save a success indicator file
  file.create("output/recipe_test_success.txt")
  
}, error = function(e) {
  error_msg <- paste("Error occurred:", conditionMessage(e), "\n")
  log_message(error_msg)
  # Save the error message to a file
  writeLines(error_msg, "output/recipe_test_error.txt")
})

log_message("\nTest completed. Check output directory for results.\n")
