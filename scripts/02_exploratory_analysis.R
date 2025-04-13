################################################################################
# DS_6306 Project 2: Crab Age Prediction
# Script: 02_exploratory_analysis.Rs
# Description: Exploratory data analysis for crab age prediction
# Author: Jonathan Rocha, Kyle Davisson (Group 3)
# Date: April 7, 2025
################################################################################

# Load required libraries
library(tidyverse)  # For data manipulation and visualization
library(corrplot)   # For correlation plots
library(gridExtra)  # For arranging multiple plots
library(ggpubr)     # For publication-ready plots

# Set seed for reproducibility
set.seed(6306)

# Load the preprocessed data
cat("Loading preprocessed data...\n")
train_data <- readRDS("~/Desktop/DS_6306_Project/output/train_data_raw.rds")

# Basic summary statistics
cat("\nSummary statistics of the dataset:\n")
summary_stats <- summary(train_data)
print(summary_stats)

# Create a directory for saving plots
if (!dir.exists("output/plots")) {
  dir.create("output/plots", recursive = TRUE)
}

# Function to save plots with consistent formatting
save_plot <- function(plot, filename, width = 10, height = 6) {
  ggsave(
    filename = paste0("output/plots/", filename),
    plot = plot,
    width = width,
    height = height,
    dpi = 300
  )
}

# 1. Distribution of crab ages
cat("\nCreating distribution plot of crab ages...\n")
age_dist_plot <- ggplot(train_data, aes(x = Age)) +
  geom_histogram(bins = 30, fill = "steelblue", color = "black", alpha = 0.7) +
  geom_density(alpha = 0.2, fill = "red") +
  labs(
    title = "Distribution of Crab Ages",
    subtitle = "Histogram with density overlay",
    x = "Age (years)",
    y = "Count",
    caption = "Source: Training dataset"
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold"),
    plot.subtitle = element_text(size = 12),
    axis.title = element_text(size = 12),
    axis.text = element_text(size = 10)
  )

print(age_dist_plot)
save_plot(age_dist_plot, "age_distribution.png")

# 2. Relationships between physical attributes and age
cat("\nCreating scatter plots of physical attributes vs. age...\n")

# Identify numerical predictors (excluding id and Age)
numerical_predictors <- names(train_data)[sapply(train_data, is.numeric)]
numerical_predictors <- setdiff(numerical_predictors, c("id", "Age"))

# Create scatter plots for each predictor vs. Age
scatter_plots <- list()
for (predictor in numerical_predictors) {
  p <- ggplot(train_data, aes_string(x = predictor, y = "Age")) +
    geom_point(alpha = 0.5, color = "steelblue") +
    geom_smooth(method = "loess", color = "red") +
    labs(
      title = paste("Relationship between", predictor, "and Age"),
      x = predictor,
      y = "Age (years)"
    ) +
    theme_minimal() +
    theme(
      plot.title = element_text(size = 14, face = "bold"),
      axis.title = element_text(size = 12),
      axis.text = element_text(size = 10)
    )
  
  scatter_plots[[predictor]] <- p
  save_plot(p, paste0("scatter_", predictor, "_vs_age.png"))
}
-
# 3. Correlation matrix of numerical variables
cat("\nCreating correlation matrix of numerical variables...\n")
numerical_data <- train_data[, c(numerical_predictors, "Age")]
correlation_matrix <- cor(numerical_data, use = "complete.obs")

# Create correlation plot
corr_plot <- corrplot(correlation_matrix, 
                     method = "circle", 
                     type = "upper", 
                     tl.col = "black", 
                     tl.srt = 45,
                     addCoef.col = "black",
                     number.cex = 0.7,
                     title = "Correlation Matrix of Crab Features",
                     mar = c(0, 0, 2, 0))

# Save correlation plot as PNG
png("output/plots/correlation_matrix.png", width = 10, height = 8, units = "in", res = 300)
corrplot(correlation_matrix, 
         method = "circle", 
         type = "upper", 
         tl.col = "black", 
         tl.srt = 45,
         addCoef.col = "black",
         number.cex = 0.7,
         title = "Correlation Matrix of Crab Features",
         mar = c(0, 0, 2, 0))
dev.off()

# 4. Boxplots of numerical variables
cat("\nCreating boxplots of numerical variables...\n")
numerical_data_long <- numerical_data %>%
  pivot_longer(cols = everything(), 
               names_to = "Variable", 
               values_to = "Value")

boxplot <- ggplot(numerical_data_long, aes(x = Variable, y = Value)) +
  geom_boxplot(fill = "steelblue", alpha = 0.7) +
  labs(
    title = "Boxplots of Numerical Variables",
    x = "Variable",
    y = "Value"
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold"),
    axis.title = element_text(size = 12),
    axis.text.x = element_text(angle = 45, hjust = 1, size = 10),
    axis.text.y = element_text(size = 10)
  )

print(boxplot)
save_plot(boxplot, "boxplots_numerical_variables.png", width = 12, height = 8)

# 5. If Sex is a variable, analyze patterns by sex
if ("Sex" %in% names(train_data)) {
  cat("\nAnalyzing patterns by sex...\n")
  
  # Boxplot of Age by Sex
  age_by_sex_plot <- ggplot(train_data, aes(x = Sex, y = Age, fill = Sex)) +
    geom_boxplot(alpha = 0.7) +
    labs(
      title = "Distribution of Crab Ages by Sex",
      x = "Sex",
      y = "Age (years)"
    ) +
    theme_minimal() +
    theme(
      plot.title = element_text(size = 16, face = "bold"),
      axis.title = element_text(size = 12),
      axis.text = element_text(size = 10),
      legend.position = "none"
    )
  
  print(age_by_sex_plot)
  save_plot(age_by_sex_plot, "age_by_sex.png")
  
  # Scatter plots of key measurements by Sex
  for (predictor in numerical_predictors[1:min(4, length(numerical_predictors))]) {
    p <- ggplot(train_data, aes_string(x = predictor, y = "Age", color = "Sex")) +
      geom_point(alpha = 0.5) +
      geom_smooth(method = "loess") +
      labs(
        title = paste("Relationship between", predictor, "and Age by Sex"),
        x = predictor,
        y = "Age (years)"
      ) +
      theme_minimal() +
      theme(
        plot.title = element_text(size = 14, face = "bold"),
        axis.title = element_text(size = 12),
        axis.text = element_text(size = 10)
      )
    
    print(p)
    save_plot(p, paste0("scatter_", predictor, "_vs_age_by_sex.png"))
  }
}

# 6. Pair plot of key variables
cat("\nCreating pair plot of key variables...\n")
# Select a subset of variables for the pair plot to keep it readable
key_variables <- c(sample(numerical_predictors, min(4, length(numerical_predictors))), "Age")
pair_data <- train_data[, key_variables]

# Create GGally pair plot
if (requireNamespace("GGally", quietly = TRUE)) {
  library(GGally)
  pair_plot <- ggpairs(pair_data,
                      title = "Pair Plot of Key Variables",
                      axisLabels = "show") +
    theme_minimal() +
    theme(
      plot.title = element_text(size = 16, face = "bold"),
      axis.title = element_text(size = 10),
      axis.text = element_text(size = 8)
    )
  
  print(pair_plot)
  save_plot(pair_plot, "pair_plot_key_variables.png", width = 12, height = 10)
} else {
  cat("GGally package not available. Skipping pair plot.\n")
}

cat("\nExploratory data analysis completed. Plots saved to 'output/plots/' directory.\n")

