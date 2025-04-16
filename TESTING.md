# Testing Strategy

This document outlines the testing approach for the Crab Age Prediction project, covering both the R analysis pipeline and the React web application.

## R Analysis Testing

### Model Validation

#### Cross-Validation
- **Method**: 5-fold cross-validation
- **Implementation**: Using `caret` package's `trainControl` with `method="cv"` and `number=5`
- **Purpose**: Evaluate model performance on different data subsets and prevent overfitting

#### Performance Metrics
- **Primary Metrics**:
  - RMSE (Root Mean Square Error): Primary optimization metric
  - MAE (Mean Absolute Error): Secondary metric for error assessment
  - R² (Coefficient of Determination): For explained variance evaluation
- **Implementation**: Calculated via the `caret` package during training and validation

#### Out-of-Sample Testing
- **Method**: 80/20 train-validation split
- **Implementation**: Created in `01_data_cleaning.R` using `createDataPartition` function
- **Purpose**: Final model validation on unseen data
- **Documentation**: Results recorded in `model_comparison.csv`

### Feature Engineering Validation
- **Method**: Recipe testing framework
- **Implementation**: `test_recipe.R` script and `recipe_test_log.txt` output
- **Purpose**: Validate that feature transformations work correctly on new data
- **Checks**:
  - Data types consistency
  - Missing value handling
  - Feature scaling consistency
  - No data leakage between training and test sets

### Model Diagnostics
- **Residual Analysis**: Histograms and plots in `output/plots/`
- **Feature Importance**: Generated in `output/plots/feature_importance.png`
- **Prediction vs. Actual**: Scatter plots in `output/plots/prediction_vs_actual.png`

## Web Application Testing

### Unit Tests
- **Framework**: Jest with React Testing Library
- **Location**: `ds6306-crab-presentation/src/__tests__/`
- **Components Tested**:
  - All UI components in `components/` directory
  - Page components in `pages/` directory
  - Helper functions and utilities

### Integration Tests
- **Purpose**: Validate component interactions and data flow
- **Key Tests**:
  - Navigation between pages
  - Data visualization rendering
  - State management
  - Component prop passing

### End-to-End Testing
- **Planned Implementation**: Cypress.io
- **Key Flows**:
  - Complete user journey through application
  - Interactive visualization testing
  - Mobile responsiveness

### Cross-Browser Testing
- **Browsers**:
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)
- **Responsive Testing**:
  - Desktop (1920x1080, 1366x768)
  - Tablet (iPad - 768x1024)
  - Mobile (iPhone - 375x667)

## Test Execution

### R Analysis Tests
- Execute as part of the analysis pipeline sequence
- Record results in log files and performance comparison tables
- Generate diagnostic plots automatically

### Web Application Tests
- Run unit and integration tests with `npm test`
- Run specific tests with `npm test -- -t "test name"` 
- Generate coverage report with `npm test -- --coverage`

## Continuous Integration
- GitHub Actions workflow to:
  - Run R script tests
  - Run React application tests
  - Build web application
  - Deploy to GitHub Pages on successful tests

## Accessibility Testing
- WCAG 2.1 AA compliance
- Test with screen readers
- Check color contrast ratios
- Ensure keyboard navigation