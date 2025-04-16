# Deployment Guide

This document outlines the deployment processes for both components of the Crab Age Prediction project: the R analysis environment and the React web application.

## Web Application Deployment

### GitHub Pages Deployment

The React application is deployed to GitHub Pages using the following process:

1. **Setup GitHub Pages**
   - The repository has been configured to use GitHub Pages
   - Deployment source: `gh-pages` branch
   - Public URL: [https://jonx0037.github.io/DS_6306_Project](https://jonx0037.github.io/DS_6306_Project)

2. **Automated Deployment Process**
   ```bash
   # From the ds6306-crab-presentation directory
   npm run deploy
   ```

   This command runs the following sequence:
   - Executes `npm run build` to create a production build
   - Uses `gh-pages` package to push the build folder to the gh-pages branch
   - GitHub automatically serves the content from this branch

3. **Deployment Configuration**
   - The `homepage` field in `package.json` is set to `https://jonx0037.github.io/DS_6306_Project`
   - The `copy-assets.js` script runs before build to copy visualization assets

4. **Manual Deployment Steps**
   ```bash
   cd ds6306-crab-presentation
   npm run build
   npm run deploy
   ```

5. **Troubleshooting Deployment**
   - If deployment fails, check GitHub repository settings
   - Verify that the `gh-pages` branch exists and contains the latest build
   - Check for build errors in the GitHub Actions log

### Local Deployment for Testing

1. **Build the Application**
   ```bash
   cd ds6306-crab-presentation
   npm run build
   ```

2. **Serve Locally**
   ```bash
   # Using npm serve package (install if needed: npm install -g serve)
   serve -s build
   
   # Or using Python's built-in HTTP server
   cd build
   python -m http.server 8000
   ```

3. **Access the Local Deployment**
   - Navigate to `http://localhost:8000` (or the port specified)

## R Analysis Environment

The R analysis environment is not deployed as a service but can be packaged for reproducibility:

### Environment Setup for New Users

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jonx0037/DS_6306_Project.git
   cd DS_6306_Project
   ```

2. **Set Up R Environment**
   ```r
   # Open R or RStudio and run:
   source("scripts/r_environment.R")
   ```

3. **Execute Analysis Pipeline**
   ```r
   source("scripts/01_data_cleaning.R")
   source("scripts/02_exploratory_analysis.R")
   source("scripts/03_feature_engineering.R")
   source("scripts/04_model_training.R")
   source("scripts/05_model_prediction.R")
   ```

### Shiny Dashboard (Planned)

For the future Shiny dashboard deployment:

1. **Local Development**
   ```r
   source("scripts/06_shiny_dashboard.R")
   ```

2. **Planned Deployment Options**
   - **shinyapps.io**
     - Free tier available for basic deployment
     - Professional tier for more resources and privacy
   
   - **Shiny Server**
     - Self-hosted option
     - Open-source version available
   
   - **RStudio Connect**
     - Enterprise solution for internal deployment
     - Advanced security and scalability features

## Continuous Integration

A GitHub Actions workflow will be implemented to:

1. Run tests on the R scripts
2. Build and test the React application
3. Deploy to GitHub Pages on successful completion

The workflow configuration will be stored in `.github/workflows/deploy.yml`

## Data Updates

To update the models with new data:

1. Place new data files in the root directory
2. Run the R analysis scripts in sequence
3. The new model files will be generated in the `models/` directory
4. The web application will automatically use the updated visualization assets

## Access Control

- GitHub repository access is controlled through GitHub permissions
- Only collaborators can push changes to the repository
- For expanded team access, consider:
  - Creating a GitHub organization
  - Setting up team-based permissions

## Backup Strategy

1. **Repository Backup**
   - GitHub provides primary repository backup
   - Consider periodic local backups using git clone

2. **Data Backup**
   - Important datasets should be backed up separately
   - Consider using Git LFS for large data files

3. **Model Backup**
   - Trained models are stored in the `models/` directory and version-controlled
   - Consider tagging significant model versions in Git