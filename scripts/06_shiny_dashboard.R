################################################################################
# DS_6306 Project 2: Crab Age Prediction
# Script: 06_shiny_dashboard.R
# Description: RShiny dashboard for crab age prediction
# Author: Jonathan Rocha, Kyle Davisson (Group 3) 
# Date: April 7, 2025
################################################################################

# Load required libraries
library(shiny)
library(shinydashboard)
library(shinythemes)
library(tidyverse)
library(plotly)
library(DT)
library(randomForest)  # For random forest model
library(xgboost)       # For xgboost model

# Set seed for reproducibility
set.seed(6306)

# Load the best model
best_model <- tryCatch({
  readRDS("models/best_model.rds")
}, error = function(e) {
  # If best model is not available, try to load any available model
  models <- list.files("models", pattern = "\\.rds$", full.names = TRUE)
  if (length(models) > 0) {
    readRDS(models[1])
  } else {
    NULL
  }
})

# Load training data for reference ranges
train_data <- tryCatch({
  readRDS("output/train_data_raw.rds")
}, error = function(e) {
  # If preprocessed data is not available, try to load raw data
  tryCatch({
    read.csv("train-1.csv")
  }, error = function(e) {
    NULL
  })
})

# Get model type
model_type <- if (!is.null(best_model)) class(best_model)[1] else "Unknown"

# Get feature ranges for sliders
if (!is.null(train_data)) {
  # Identify numerical predictors (excluding id and Age)
  numerical_predictors <- names(train_data)[sapply(train_data, is.numeric)]
  numerical_predictors <- setdiff(numerical_predictors, c("id", "Age"))
  
  # Get min, max, and mean values for each predictor
  feature_ranges <- lapply(numerical_predictors, function(col) {
    c(
      min = min(train_data[[col]], na.rm = TRUE),
      max = max(train_data[[col]], na.rm = TRUE),
      mean = mean(train_data[[col]], na.rm = TRUE)
    )
  })
  names(feature_ranges) <- numerical_predictors
  
  # Check if Sex is a categorical variable
  has_sex_variable <- "Sex" %in% names(train_data)
  if (has_sex_variable) {
    sex_levels <- levels(as.factor(train_data$Sex))
  } else {
    sex_levels <- NULL
  }
} else {
  # Default ranges if data is not available
  numerical_predictors <- c("Length", "Diameter", "Height", "Weight", 
                           "Shucked_Weight", "Viscera_Weight", "Shell_Weight")
  
  feature_ranges <- lapply(numerical_predictors, function(col) {
    c(min = 0, max = 100, mean = 50)
  })
  names(feature_ranges) <- numerical_predictors
  
  has_sex_variable <- TRUE
  sex_levels <- c("M", "F", "I")  # Male, Female, Indeterminate
}

# UI
ui <- dashboardPage(
  dashboardHeader(title = "Crab Age Prediction Dashboard"),
  
  dashboardSidebar(
    sidebarMenu(
      menuItem("Prediction Tool", tabName = "prediction", icon = icon("calculator")),
      menuItem("Model Information", tabName = "model_info", icon = icon("info-circle")),
      menuItem("Data Exploration", tabName = "data_exploration", icon = icon("chart-bar")),
      menuItem("About", tabName = "about", icon = icon("question-circle"))
    )
  ),
  
  dashboardBody(
    # Custom CSS
    tags$head(
      tags$style(HTML("
        .content-wrapper, .right-side {
          background-color: #f8f9fa;
        }
        .box {
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          border-radius: 5px;
        }
        .value-box {
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        .slider-container {
          padding: 10px;
          margin-bottom: 15px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
      "))
    ),
    
    tabItems(
      # Prediction Tool Tab
      tabItem(tabName = "prediction",
        fluidRow(
          box(
            title = "Crab Age Prediction Tool",
            status = "primary",
            solidHeader = TRUE,
            width = 12,
            p("Enter the physical characteristics of a crab to predict its age. Adjust the sliders to match the crab's measurements."),
            p("The prediction is based on a machine learning model trained on historical crab data.")
          )
        ),
        
        fluidRow(
          column(width = 6,
            # Input parameters
            box(
              title = "Crab Characteristics",
              status = "primary",
              solidHeader = FALSE,
              width = 12,
              
              # Sex selection (if available)
              if (has_sex_variable) {
                selectInput("sex", "Sex", 
                           choices = sex_levels,
                           selected = sex_levels[1])
              },
              
              # Create sliders for each numerical predictor
              lapply(numerical_predictors, function(feature) {
                range <- feature_ranges[[feature]]
                sliderInput(
                  inputId = feature,
                  label = feature,
                  min = round(range["min"], 2),
                  max = round(range["max"], 2),
                  value = round(range["mean"], 2),
                  step = (range["max"] - range["min"]) / 100
                )
              }),
              
              actionButton("predict_button", "Predict Age", 
                          class = "btn-primary", 
                          style = "margin-top: 15px; width: 100%")
            )
          ),
          
          column(width = 6,
            # Prediction output
            box(
              title = "Prediction Result",
              status = "success",
              solidHeader = FALSE,
              width = 12,
              height = 150,
              
              valueBoxOutput("age_prediction", width = 12)
            ),
            
            # Visualization
            box(
              title = "Visualization",
              status = "info",
              solidHeader = FALSE,
              width = 12,
              
              plotlyOutput("prediction_viz", height = "300px")
            ),
            
            # Feature importance
            box(
              title = "Feature Importance",
              status = "warning",
              solidHeader = FALSE,
              width = 12,
              
              plotOutput("feature_importance", height = "300px")
            )
          )
        )
      ),
      
      # Model Information Tab
      tabItem(tabName = "model_info",
        fluidRow(
          box(
            title = "Model Information",
            status = "primary",
            solidHeader = TRUE,
            width = 12,
            
            h4("Model Type"),
            verbatimTextOutput("model_type"),
            
            h4("Model Performance"),
            verbatimTextOutput("model_performance"),
            
            h4("Feature Importance"),
            plotOutput("model_feature_importance", height = "400px"),
            
            h4("Model Details"),
            verbatimTextOutput("model_details")
          )
        )
      ),
      
      # Data Exploration Tab
      tabItem(tabName = "data_exploration",
        fluidRow(
          box(
            title = "Data Exploration",
            status = "primary",
            solidHeader = TRUE,
            width = 12,
            
            p("Explore the relationships between crab characteristics and age in the training dataset.")
          )
        ),
        
        fluidRow(
          box(
            title = "Distribution of Crab Ages",
            status = "info",
            solidHeader = FALSE,
            width = 6,
            
            plotlyOutput("age_distribution", height = "300px")
          ),
          
          box(
            title = "Correlation Matrix",
            status = "info",
            solidHeader = FALSE,
            width = 6,
            
            plotlyOutput("correlation_matrix", height = "300px")
          )
        ),
        
        fluidRow(
          box(
            title = "Relationship Explorer",
            status = "warning",
            solidHeader = FALSE,
            width = 12,
            
            fluidRow(
              column(width = 3,
                selectInput("x_var", "X Variable", choices = numerical_predictors)
              ),
              column(width = 3,
                selectInput("y_var", "Y Variable", choices = c("Age", numerical_predictors),
                           selected = "Age")
              ),
              column(width = 3,
                selectInput("color_var", "Color By", 
                           choices = c("None", if (has_sex_variable) "Sex" else NULL, numerical_predictors),
                           selected = "None")
              ),
              column(width = 3,
                selectInput("plot_type", "Plot Type", 
                           choices = c("Scatter", "Box", "Violin", "Histogram"),
                           selected = "Scatter")
              )
            ),
            
            plotlyOutput("relationship_plot", height = "400px")
          )
        )
      ),
      
      # About Tab
      tabItem(tabName = "about",
        fluidRow(
          box(
            title = "About This Dashboard",
            status = "primary",
            solidHeader = TRUE,
            width = 12,
            
            h3("Crab Age Prediction Dashboard"),
            p("This dashboard was created as part of DS_6306 Project 2 by Group 3."),
            p("The goal of this project is to predict the age of crabs based on their physical characteristics."),
            
            h4("Authors"),
            p("Jonathan Rocha"),
            p("Kyle Davisson"),
            
            h4("Data Source"),
            p("The data used in this project contains measurements of various crab physical attributes and their corresponding ages."),
            
            h4("Model"),
            p("We trained several machine learning models including Linear Regression, Random Forest, XGBoost, and SVM."),
            p("The best performing model was selected based on Mean Absolute Error (MAE) on a validation dataset."),
            
            h4("Usage"),
            p("Use the 'Prediction Tool' tab to predict the age of a crab based on its physical characteristics."),
            p("Explore model details in the 'Model Information' tab."),
            p("Visualize relationships in the data using the 'Data Exploration' tab.")
          )
        )
      )
    )
  )
)

# Server
server <- function(input, output, session) {
  
  # Reactive value for prediction
  prediction <- reactiveVal(NULL)
  
  # Function to make prediction
  make_prediction <- function() {
    # Create a data frame with input values
    input_data <- data.frame(
      id = 1  # Dummy ID
    )
    
    # Add numerical predictors
    for (feature in numerical_predictors) {
      input_data[[feature]] <- input[[feature]]
    }
    
    # Add Sex if available
    if (has_sex_variable) {
      input_data$Sex <- input$sex
    }
    
    # Make prediction if model is available
    if (!is.null(best_model)) {
      # Preprocess input data (simplified for dashboard)
      # In a real application, you would apply the same preprocessing steps as in training
      
      # Make prediction
      pred <- predict(best_model, newdata = input_data %>% select(-id))
      return(pred)
    } else {
      # Return random prediction if model is not available (for demonstration)
      return(runif(1, 5, 15))
    }
  }
  
  # Update prediction when button is clicked
  observeEvent(input$predict_button, {
    pred <- make_prediction()
    prediction(pred)
  })
  
  # Display prediction
  output$age_prediction <- renderValueBox({
    pred <- prediction()
    
    if (is.null(pred)) {
      valueBox(
        "N/A",
        "Predicted Age (years)",
        icon = icon("hourglass"),
        color = "blue"
      )
    } else {
      valueBox(
        round(pred, 1),
        "Predicted Age (years)",
        icon = icon("calendar"),
        color = "green"
      )
    }
  })
  
  # Prediction visualization
  output$prediction_viz <- renderPlotly({
    pred <- prediction()
    
    if (is.null(pred) || is.null(train_data)) {
      # Default plot if no prediction or data
      p <- ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = "Make a prediction to see visualization") +
        theme_void()
      
      return(ggplotly(p))
    }
    
    # Create age distribution with prediction marker
    p <- ggplot(train_data, aes(x = Age)) +
      geom_histogram(bins = 30, fill = "steelblue", color = "black", alpha = 0.7) +
      geom_vline(xintercept = pred, color = "red", size = 1.5) +
      annotate("text", x = pred, y = max(hist(train_data$Age, plot = FALSE)$counts) * 0.9, 
               label = paste("Prediction:", round(pred, 1)), 
               color = "red", hjust = -0.1) +
      labs(
        title = "Where the prediction falls in the age distribution",
        x = "Age (years)",
        y = "Count"
      ) +
      theme_minimal()
    
    ggplotly(p)
  })
  
  # Feature importance visualization
  output$feature_importance <- renderPlot({
    pred <- prediction()
    
    if (is.null(pred) || is.null(best_model)) {
      # Default plot if no prediction or model
      ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = "Feature importance not available") +
        theme_void()
    } else {
      # Try to extract feature importance from the model
      importance_data <- tryCatch({
        if (inherits(best_model, "train") && best_model$method == "rf") {
          # For random forest from caret
          imp <- varImp(best_model)$importance
          imp$Feature <- rownames(imp)
          imp <- imp %>% 
            arrange(desc(Overall)) %>%
            head(10)
          
          ggplot(imp, aes(x = reorder(Feature, Overall), y = Overall)) +
            geom_bar(stat = "identity", fill = "orange") +
            coord_flip() +
            labs(
              title = "Top 10 Feature Importance",
              x = "",
              y = "Importance"
            ) +
            theme_minimal()
        } else if (inherits(best_model, "train") && best_model$method == "xgbTree") {
          # For xgboost from caret
          imp <- xgb.importance(model = best_model$finalModel)
          imp <- as.data.frame(imp) %>% head(10)
          
          ggplot(imp, aes(x = reorder(Feature, Gain), y = Gain)) +
            geom_bar(stat = "identity", fill = "orange") +
            coord_flip() +
            labs(
              title = "Top 10 Feature Importance",
              x = "",
              y = "Gain"
            ) +
            theme_minimal()
        } else {
          # Generic importance plot
          ggplot() +
            annotate("text", x = 0.5, y = 0.5, 
                     label = "Feature importance not available for this model type") +
            theme_void()
        }
      }, error = function(e) {
        # If error, return empty plot
        ggplot() +
          annotate("text", x = 0.5, y = 0.5, 
                   label = "Feature importance not available") +
          theme_void()
      })
      
      importance_data
    }
  })
  
  # Model type output
  output$model_type <- renderText({
    paste("Model Type:", model_type)
  })
  
  # Model performance output
  output$model_performance <- renderText({
    if (is.null(best_model)) {
      return("Model performance metrics not available.")
    }
    
    # Try to extract performance metrics
    perf <- tryCatch({
      if (inherits(best_model, "train")) {
        # For caret models
        metrics <- best_model$results[best_model$results$RMSE == min(best_model$results$RMSE), ]
        paste(
          "RMSE:", round(metrics$RMSE, 3), "\n",
          "MAE:", round(metrics$MAE, 3), "\n",
          "R²:", round(metrics$Rsquared, 3)
        )
      } else {
        "Detailed performance metrics not available."
      }
    }, error = function(e) {
      "Error retrieving performance metrics."
    })
    
    perf
  })
  
  # Model feature importance plot
  output$model_feature_importance <- renderPlot({
    if (is.null(best_model)) {
      # Default plot if no model
      ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = "Model not available") +
        theme_void()
    } else {
      # Try to extract feature importance from the model
      tryCatch({
        if (inherits(best_model, "train") && best_model$method == "rf") {
          # For random forest from caret
          imp <- varImp(best_model)$importance
          imp$Feature <- rownames(imp)
          imp <- imp %>% arrange(desc(Overall))
          
          ggplot(imp %>% head(20), aes(x = reorder(Feature, Overall), y = Overall)) +
            geom_bar(stat = "identity", fill = "steelblue") +
            coord_flip() +
            labs(
              title = "Feature Importance",
              subtitle = "Based on Random Forest model",
              x = "",
              y = "Importance"
            ) +
            theme_minimal()
        } else if (inherits(best_model, "train") && best_model$method == "xgbTree") {
          # For xgboost from caret
          imp <- xgb.importance(model = best_model$finalModel)
          imp <- as.data.frame(imp)
          
          ggplot(imp %>% head(20), aes(x = reorder(Feature, Gain), y = Gain)) +
            geom_bar(stat = "identity", fill = "steelblue") +
            coord_flip() +
            labs(
              title = "Feature Importance",
              subtitle = "Based on XGBoost model",
              x = "",
              y = "Gain"
            ) +
            theme_minimal()
        } else {
          # Generic importance plot
          ggplot() +
            annotate("text", x = 0.5, y = 0.5, 
                     label = "Feature importance not available for this model type") +
            theme_void()
        }
      }, error = function(e) {
        # If error, return empty plot
        ggplot() +
          annotate("text", x = 0.5, y = 0.5, 
                   label = "Feature importance not available") +
          theme_void()
      })
    }
  })
  
  # Model details output
  output$model_details <- renderPrint({
    if (is.null(best_model)) {
      return("Model details not available.")
    }
    
    # Try to extract model details
    tryCatch({
      if (inherits(best_model, "train")) {
        # For caret models
        cat("Training method:", best_model$method, "\n\n")
        cat("Best tuning parameters:\n")
        print(best_model$bestTune)
        cat("\nFinal model:\n")
        print(best_model$finalModel)
      } else {
        print(best_model)
      }
    }, error = function(e) {
      cat("Error retrieving model details:", e$message)
    })
  })
  
  # Age distribution plot
  output$age_distribution <- renderPlotly({
    if (is.null(train_data)) {
      # Default plot if no data
      p <- ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = "Training data not available") +
        theme_void()
      
      return(ggplotly(p))
    }
    
    # Create age distribution
    p <- ggplot(train_data, aes(x = Age)) +
      geom_histogram(bins = 30, fill = "steelblue", color = "black", alpha = 0.7) +
      labs(
        title = "Distribution of Crab Ages",
        x = "Age (years)",
        y = "Count"
      ) +
      theme_minimal()
    
    ggplotly(p)
  })
  
  # Correlation matrix plot
  output$correlation_matrix <- renderPlotly({
    if (is.null(train_data)) {
      # Default plot if no data
      p <- ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = "Training data not available") +
        theme_void()
      
      return(ggplotly(p))
    }
    
    # Calculate correlation matrix
    cor_data <- train_data %>% 
      select(all_of(c(numerical_predictors, "Age"))) %>%
      cor(use = "pairwise.complete.obs")
    
    # Convert to long format for plotting
    cor_data_long <- as.data.frame(as.table(cor_data))
    names(cor_data_long) <- c("Var1", "Var2", "Correlation")
    
    # Create heatmap
    p <- ggplot(cor_data_long, aes(x = Var1, y = Var2, fill = Correlation, text = paste(
      "Variables:", Var1, "vs", Var2,
      "<br>Correlation:", round(Correlation, 3)
    ))) +
      geom_tile() +
      scale_fill_gradient2(low = "blue", mid = "white", high = "red", midpoint = 0) +
      theme_minimal() +
      theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
      labs(title = "Correlation Matrix")
    
    ggplotly(p, tooltip = "text")
  })
  
  # Relationship explorer plot
  output$relationship_plot <- renderPlotly({
    if (is.null(train_data)) {
      # Default plot if no data
      p <- ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = "Training data not available") +
        theme_void()
      
      return(ggplotly(p))
    }
    
    # Get selected variables
    x_var <- input$x_var
    y_var <- input$y_var
    color_var <- input$color_var
    plot_type <- input$plot_type
    
    # Base plot
    p <- ggplot(train_data)
    
    # Add color if selected
    if (color_var != "None") {
      if (color_var == "Sex" && has_sex_variable) {
        # For categorical color
        p <- p + aes_string(color = "Sex", group = "Sex")
      } else {
        # For numerical color
        p <- p + aes_string(color = color_var)
      }
    }
    
    # Add plot type
    if (plot_type == "Scatter") {
      p <- p + aes_string(x = x_var, y = y_var) +
        geom_point(alpha = 0.5) +
        geom_smooth(method = "loess", se = TRUE)
    } else if (plot_type == "Box") {
      if (color_var != "None" && color_var != "Sex") {
        # Create bins for numerical color variable
        train_data$color_bins <- cut(train_data[[color_var]], breaks = 5)
        p <- ggplot(train_data, aes_string(x = "color_bins", y = y_var, fill = "color_bins")) +
          geom_boxplot(alpha = 0.7) +
          labs(x = color_var)
      } else {
        p <- p + aes_string(x = x_var, y = y_var, group = x_var) +
          geom_boxplot(alpha = 0.7)
      }
    } else if (plot_type == "Violin") {
      if (color_var != "None" && color_var != "Sex") {
        # Create bins for numerical color variable
        train_data$color_bins <- cut(train_data[[color_var]], breaks = 5)
        p <- ggplot(train_data, aes_string(x = "color_bins", y = y_var, fill = "color_bins")) +
          geom_violin(alpha = 0.7) +
          labs(x = color_var)
      } else {
        p <- p + aes_string(x = x_var, y = y_var, group = x_var) +
          geom_violin(alpha = 0.7)
      }
    } else if (plot_type == "Histogram") {
      p <- p + aes_string(x = x_var) +
        geom_histogram(bins = 30, alpha = 0.7)
    }
    
    # Add labels
    p <- p + labs(
      title = paste("Relationship between", x_var, "and", y_var),
      x = x_var,
      y = y_var
    ) + theme_minimal()
    
    ggplotly(p)
  })
}

# Run the application
shinyApp(ui = ui, server = server)
