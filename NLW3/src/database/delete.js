const Database = require("./db");


Database.then(async(db) => {

    //deleta tudo
    // console.log(await db.run("DELETE FROM orphanages "))

    //deleta unidade
    console.log(await db.run("DELETE FROM orphanages WHERE id = '1'"))

});