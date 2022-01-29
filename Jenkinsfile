pipeline {
    agent { docker { image 'node:16-alpine' } }
    stages {
        stage('build') {
            steps {
                echo '=====stage build====='
                sh 'node --version'
            }
        }
    }
}