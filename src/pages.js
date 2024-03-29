  const Database = require("./database/db");
  const saveOrphanage = require("./database/saveOrphanage");
  const verdadeiro = true
  const falso = false

  module.exports = {
      index(req, res) {
          // const city = req.query.city
          return res.render('index')
      },
      async orphanage(req, res) {
          const id = req.query.id;

          try {

              const db = await Database;
              const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);

              const orphanage = results[0];


              orphanage.images = orphanage.images.split(",");
              orphanage.firstImage = orphanage.images[0];

              if (orphanage.open_on_weekends == "0") {
                  orphanage.open_on_weekends = false;
              } else {
                  orphanage.open_on_weekends = true;
              }

              return res.render("orphanage", { orphanage });

          } catch (error) {

              console.log(error);
              return res.render("Erro no banco de dados!")

          }

      },

      async orphanages(req, res) {
          try {

              const db = await Database;

              const orphanages = await db.all("SELECT * FROM orphanages");
              return res.render("orphanages", { orphanages });

          } catch (error) {

              console.log(error);
              return res.render("Erro no banco de dados!")

          }


      },

      createOrphanage(req, res) {
          return res.render("create-orphanages");
      },

      async saveOrphanage(req, res) {
          const fields = req.body;


          if (Object.values(fields).includes("")) {
              return res.send(`Preecha e selecione todos os campos `);
          }


          //var
          //   if (Object.values(fields).includes("")) {

          //       // const field = event.target
          //       //   return document.alert("Erro! Tente novamente mas tarde");
          //       event.preventDefault();
          //       return alert("Erro! Tente novamente mas tarde")
          //           //   return res.send(`Selecione o local da instituição no mapa!`);
          //   }

          try {
              const db = await Database;
              await saveOrphanage(db, {
                  lat: fields.lat,
                  lng: fields.lng,
                  name: fields.name,
                  about: fields.about,
                  whatsapp: fields.whatsapp,
                  images: fields.images.toString(),
                  instructions: fields.instructions,
                  opening_hours: fields.opening_hours,
                  open_on_weekends: fields.open_on_weekends,
              });

              // Redirecionamento
              return res.redirect("/orphanages");

          } catch (error) {
              alert("Erro! Tente novamente mas tarde")
              console.log(error)
              return res.send("Erro no banco de dados");

          }
      },
  };