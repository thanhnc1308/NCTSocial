# A simple social media app
A small project I used to study Node.js, ReactJS, MongoDB, Socket.IO, K8s and Jenkins.
## Main features
- CRUD posts
- Like posts
- Follow an user
- Realtime chat
- Check online users

## Build the app using Docker
### Frontend
1. Build the image
- yarn build
- Run yarn build again if you change the variables in .env
- Using docker
    + Go to the directory that has your Dockerfile and run the following command to build the Docker image. The -t flag lets you tag your image so it's easier to find later using the docker images command
    + docker build . --rm -f Dockerfile -t nct_social_ui:r1
- Using docker-compose
    + docker-compose build nct_social_ui
2. Run the image
- Using docker:
    + Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container
    + Map port 8002 in the server to port 80 in the container. We've already expose port 80 in Dockerfile
    + docker run --env-file=.env.dev --rm -p 8002:80 nct_social_ui:r1
- Using docker-compose
    + docker-compose up nct_social_ui
    + docker-compose --env-file client/.env.dev up nct_social_ui
### Database
- docker-compose up mongo mongo-express
- Login to the database: mongo -u root -p 123456 --authenticationDatabase admin
- Connect to a remote database: mongo host:port/database -u username -p password
- Create an user: db.createUser({user:"writetApp", pwd:"writeApp", roles:[{role:"dbOwner", db:"social_media_app"}]});
- Get all users: db.getUsers();
### Backend
1. Build the image
- docker build . -t nct_social_server:r1
- docker-compose build nct_social_server
2. Run the image
- docker run --env-file=.env.dev --rm -p 49160:8080 nct_social_server:r1
- docker-compose --env-file server/.env.dev up nct_social_server
### Socket
1. Build the image
- docker build . -t nct_social_socket:r1
- docker-compose build nct_social_socket
2. Run the image
- docker run --env-file=.env.dev --rm -p 8900:8900 nct_social_socket:r1
- docker-compose --env-file socket/.env.dev up nct_social_socket
### Jenkins
- Run jenkins.sh
- Run docker logs CONTAINER_ID or go to /var/jenkins_home/secrets/initialAdminPassword to get the password
### Debug
- docker exec -it <mycontainer> bash
