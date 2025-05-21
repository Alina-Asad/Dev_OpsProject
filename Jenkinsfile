pipeline {
    agent {
        docker {
            image 'node:18' // Use official Node.js image
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Allow Docker access
        }
    }

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
                    sh """
                        docker run -d --name react-app-test -p 8080:80 ${IMAGE_NAME}:${IMAGE_TAG}
                        sleep 5
                        docker ps | grep react-app-test
                    """
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
