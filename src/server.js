// importa dependecia

const express = require("express");
const path = require("path");

const pages = require("./pages.js");


// inicinado o express
const server = express();

server

//utilizar body do req
    .use(express.urlencoded({ extended: true }))

// utilizando os arquivos estatico
.use(express.static("public"))

// configurar template engine
.set("views", path.join(__dirname, "views"))
    .set("view engine", "hbs")

// rota da apricação
.get("/", pages.index)
    .get("/orphanage", pages.orphanage)
    .get("/orphanages", pages.orphanages)
    .get("/create-orphanage", pages.createOrphanage)
    .post("/save-orphanage", pages.saveOrphanage);


// liga o servidor
server.listen(80, () => {
    console.log("Server started");
});