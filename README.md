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

## 2. CI/CD pipeline

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

