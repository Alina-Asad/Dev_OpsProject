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

        stage('Install and Build React App') {
            agent {
                docker {
                    image 'node:18' // Node + npm for React build
                    args '-v /var/run/docker.sock:/var/run/docker.sock' // optional here
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Run Docker Container Test') {
            steps {
                sh 'docker run -d --name react-app-test -p 8080:80 $IMAGE_NAME:$IMAGE_TAG'
                echo 'Container test running'
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
