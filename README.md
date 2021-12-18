# A simple social media app built with Node.js, ReactJS, MongoDB, Socket.IO
## Main features
- CRUD posts
- Like and comment on a post
- Follow an user
- Realtime chat with image uploading
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
- Create an user: db.createUser({user:"writetApp", pwd:"writeApp", roles:[{role:"dbOwner", db:"social_media_app"}]});
- Get all users: db.getUsers();
### Backend
1. Build the image
- docker build . -t nct_social_server:r1
- docker-compose build nct_social_server
2. Run the image
- docker run --env-file=.env.dev --rm -p 49160:8080 nct_social_server:r1
- docker-compose --env-file server/.env.dev up nct_social_server
### Debug
- docker exec -it <mycontainer> bash
