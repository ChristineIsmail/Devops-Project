# User API with Redis and Testing
## 1. Web Application

## Overview
This project is a simple **User API** built with **Node.js** and **Express**, using **Redis** as the database. It provides CRUD functionality for users and is covered with unit, API, configuration, and connection tests. A **health check endpoint** ensures that the application is functional.

## Features
- **CRUD Operations**:
  - Create a user (`POST /user`)
  - Retrieve user details (`GET /user/:username`)
  - Update user details (`PUT /user/:username`)
  - Delete a user (`DELETE /user/:username`)
- **Redis Database** for storing user data.
- **Unit and API Testing** using `mocha`, `chai`, and `chai-http`.
- **Health Check Endpoint** (`GET /health`) to verify application status.

## Setup Instructions

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **Redis** (running on `localhost:6379`)

### 2. Clone the Repository
```
git clone <repo-url>
cd <repo-folder>
```
### 3. Install Dependencies
```
npm install
```
### 4. Start Redis Server
```
redis-server
```
### 5. Run the Application
```
npm start
```
### 6. Run tests
```
npm test
```


## 2. CI/CD Pipeline Configuration and Deployment

In this project, we configured and applied a Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions for automation and Render for deployment. Below is a step-by-step explanation of the process we followed:

### Step 1: GitHub Actions Setup

We began by setting up GitHub Actions to automate the testing and deployment processes.

1. **Creating GitHub Actions Workflow**:
   - We created a `.github/workflows/` directory in the project repository to store the GitHub Actions workflow configuration.
   - Inside this directory, we defined a new workflow that is triggered whenever changes are pushed to the `main` branch of the repository.



2. **Adding Secrets to GitHub**:
   - To facilitate the deployment process, we added the necessary **Render API Key**  as secrets in the GitHub repository. These secrets are used securely during the GitHub Actions workflow to deploy the app to Render.

## Step 2: Render Deployment Setup

We used Render as the hosting platform for our application.

1. **Linking GitHub Repository to Render**:
   - We connected the GitHub repository to Render, allowing Render to automatically deploy the application whenever changes are made to the `main` branch.

2. **Configuring Environment Variables**:
   - On Render, we set up the required environment variables (like the Redis connection URL from Upstash) to ensure that the application functions correctly with the necessary external services.

3. **Triggering Deployment**:
   - Every time changes are pushed to the `main` branch, the GitHub Actions workflow is triggered. This workflow installs dependencies, runs tests, and then deploys the application to Render.

## Step 3: CI/CD in Action

With the pipeline in place, the deployment process became fully automated.

1. **Pushing Changes to GitHub**:
   - Whenever changes are pushed to the `main` branch of the GitHub repository, the GitHub Actions pipeline is automatically triggered.

2. **Running Tests**:
   - The pipeline runs tests to verify that the application is functioning as expected. If any tests fail, the pipeline stops, preventing faulty code from being deployed.

3. **Automatic Deployment**:
   - After the tests pass successfully, the pipeline triggers the deployment of the application to Render.

4. **Monitoring Deployment**:
   - We can monitor the deployment status and logs directly from the Render dashboard to ensure the application is working correctly in the deployed environment.



## 3. Vagrant and Ansible Setup

This section shows how to run the application using **Vagrant** and **Ansible** to configure the VM and install dependencies automatically.

### Requirements

- [Install Vagrant](https://www.vagrantup.com/downloads)
- [Install VirtualBox](https://www.virtualbox.org/wiki/Downloads)

### Setup

In the project directory, run the following commands:

```bash
vagrant destroy -f  # Destroy the old VM
vagrant up          # Create a new VM and apply Ansible provisioning

```
## 4. Docker Image 

- Created a `Dockerfile` to define the environment for the application.
-  Dockerized the application and tested it locally.
-  Pushed the Docker image to Docker Hub for deployment.

## 5. Container orchestration using Docker Compose
 - Created a `docker-compose.yml` file to manage the application and Redis containers.
 -  Defined the services for the app and Redis in the Docker Compose file.
 -  Used `docker-compose up -d` to start the containers and ensure proper communication between them.


## Technologies Used
- **Node.js**: Backend framework for building the API.
- **Redis**: In-memory data structure store, used as a database.
- **Docker**: Containerization technology to package the app.
- **Docker Compose**: Tool for defining and running Docker applications.
- **GitHub Actions**: Continuous Integration (CI) tool for automating testing and deployment.
- **Render**: Platform for deploying the application.
- **Upstash**: Redis service provider for hosting the Redis database.



## 6. Kubernetes Orchestration with Minikube

- Initialized a local Kubernetes cluster using **Minikube**.
- Created Kubernetes manifest files for **Deployment, Service, Persistent Volume, and Persistent Volume Claim**.
- Deployed the application and Redis database to Kubernetes.
- Exposed the application using a **LoadBalancer** service.
- Used `kubectl` commands to monitor pods, logs, and services.

### Steps:

1. **Apply Kubernetes Manifests**

   - **Persistent Volume for Redis**  
     ```bash
     kubectl apply -f k8s/persistent-volume.yaml
     kubectl apply -f k8s/persistent-volume-claim.yaml
     ```

   - **Deploy the Application**  
     ```bash
     kubectl apply -f k8s/deployment.yaml
     kubectl get pods
     ```

   - **Expose the Service**  
     ```bash
     kubectl apply -f k8s/service.yaml
     kubectl get services
     ```

2. **Access the Application**  
   ```bash
   minikube service devops-app-service
   ```
3. **Monitor and debug**  

```bash
kubectl logs -l app=devops-app
kubectl describe service devops-app-service

```
**Outcome**
The application is successfully deployed and accessible through Kubernetes.