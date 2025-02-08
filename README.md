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
vagrant up          
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

# 7. Creating a Service Mesh with Istio

### 7.1. Installing Istio

Installing Istio using the Istio CLI and enable sidecar injection for the default namespace.

### 7.2. Deploy the Application

Deploying the v1 and v2 versions of the application using Kubernetes manifests.

### 7.3. Create an Istio Gateway

Setting up an Istio Gateway to expose the service to external traffic.

### 7.4. Create a VirtualService

Creating a VirtualService to route traffic to the different versions of the application (v1 and v2).

### 7.5. Add DestinationRules

Defining DestinationRules for the v1 and v2 versions of the app, allowing Istio to manage traffic routing to each version.

### 7.6. Traffic Shifting

Configuring traffic shifting in the VirtualService to route a percentage of the traffic to v1 and v2. For example, route 80% to v1 and 20% to v2.

### 7.7. Test the Traffic Routing

Checking the external IP of the Istio Ingress Gateway and verify that traffic is routed and shifted correctly between v1 and v2 by visiting the URL in the browser.


# 8. Setting up Alerts with Prometheus

### 8.1. Install Prometheus and Grafana

- Install **Prometheus** and **Grafana** in the Kubernetes cluster using Helm charts or YAML manifests.
- Expose **Prometheus** and **Grafana** via port-forwarding for local access.

### 8.2. Create Prometheus Alerting Rules

- Define **Prometheus alerting rules** to monitor system and application performance.
- Example alerts:
  - **High CPU usage** on pods.
  - **High memory usage** on pods.

### 8.3. Apply Alerting Rules

- Apply the defined alerting rules using the `kubectl apply -f <alerting-rule-file>.yaml` command.
- Ensure the Prometheus service is scraping the metrics and the alerting rules are active.

### 8.4. Verify Alerts in Prometheus

- Access **Prometheus** via the web interface (`localhost:9090`).
- Navigate to the **Alerting** section and verify that the defined alerts (e.g., High CPU usage, High memory usage) are listed and active.

### 8.5. Configure Grafana Dashboards (screenshots available)

- Link **Prometheus** as a data source in **Grafana**.
- Create or import **Grafana dashboards** that visualize the metrics and show triggered alerts.
- Set up Grafana alerts to receive notifications when Prometheus alerts are triggered.

### 8.6. Trigger Alerts by Shutting Down Applications

- Simulate **high CPU usage** or **high memory usage** by shutting down application pods.
- Monitor how **Prometheus** and **Grafana** handle the triggered alerts.

### 8.7. View Alerts in Grafana

- Access **Grafana** via the web interface (`localhost:3000`).
- Navigate to the **Alerting** section in **Grafana** to view the triggered alerts and monitor the alert status.

### 8.8. Test the Alerts

- Ensure the alerting system is functioning as expected by manually triggering the alerts and checking if they are reflected in both **Prometheus** and **Grafana**.
