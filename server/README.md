# Database
1. Create database
- docker exec -it mongodb_container bash
- mongo -u root
- use social_media_app
- db.createUser(
  {
    user: "newuser",
    pwd: "12345678",
    roles: [ { role: "readWrite", db: "social_media_app" } ]
  }
)
- MONGO_URL=mongodb://newuser:12345678@0.0.0.0:27017/social_media_app
- MONGO_URL=mongodb://root:123456@0.0.0.0:27017/admin
