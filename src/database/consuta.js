const Database = require("./db");

Database.then(async(db) => {

    // consutar dados da tabela

    const selectedOrphanages = await db.all("SELECT * FROM orphanages");
    console.log(selectedOrphanages);

    // consultar somente 1 orphanage, pelo id

    // const orphanages = await db.all('SELECT * FROM orphanages WHERE id = "1"');
    // console.log(orphanages);

});