# https://github.com/jenkinsci/docker/blob/master/README.md
docker run --rm -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk11
