pipeline {
    agent any

    environment {
        IMAGE_NAME = "leenamalik/react-app-nginx"
        IMAGE_TAG  = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Run Docker Container Test') {
            steps {
                script {
                    docker.image("${IMAGE_NAME}:${IMAGE_TAG}").inside {
                        // run your tests here, e.g. 
                        // sh 'npm test' or any container health check
                        echo 'Container test placeholder'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker rm -f react-app-test || true'
        }
    }
}
