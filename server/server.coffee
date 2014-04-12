http = require("http")
connect = require("connect")
express = require("express")
build = require("./build")

build.watch()

app = express()
oneDay = 86400000

app.use connect.static(__dirname + "/../public",
  maxAge: oneDay
)

server = http.createServer(app)
server.listen 80