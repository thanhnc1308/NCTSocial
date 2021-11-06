var db = connect("mongodb://root:123456@localhost:27017/admin");

db = db.getSiblingDB('new_db'); // we can not use "use" statement here to switch db

db.createUser(
    {
        user: "username1",
        pwd: "password1",
        roles: [ { role: "readWrite", db: "new_db"} ],
        passwordDigestor: "server",
    }
)
