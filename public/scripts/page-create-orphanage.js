// Create map
const map = L.map("mapid").setView([-8.0419884, -35.0086759], 11);

// create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
});

//

let marker;

// create and add marker

map.on("click", (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector("[name=lat]").value = lat;
    document.querySelector("[name=lng]").value = lng;

    console.log("latitude", lat, "longitude ", lng);

    //remove icon
    marker && map.removeLayer(marker);

    // add icon layer

    marker = L.marker([lat, lng], { icon }).addTo(map);
});

// adiciona o capo de fotos

function addPhotoField() {
    // pega os contenes de fotos #images
    const container = document.querySelector("#images");

    // pega o conteniner para duprica new-upload
    const fieldsContainer = document.querySelectorAll(".new-upload");

    // realizar o clone da utima imagem adicionada.
    const newFieldContainer = fieldsContainer[
        fieldsContainer.length - 1
    ].cloneNode(true);

    // Verifica se o capo esta vasil de casso estiva nao adiciona um novo capo de imagem
    const input = newFieldContainer.children[0];

    if (input.value == "") {
        // console.log("Vasio")
        return;
    }

    // Limpar o campo antes de adicionar ao conteines de images
    input.value = "";
    console.log("Novo campo");

    // adicionar o clone ao conteniner de #images
    container.appendChild(newFieldContainer);
}

// butao de deleta capo de imagem

function deleteField(event) {
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll(".new-upload");

    if (fieldsContainer.length <= 1) {
        // Limpar o valor do campo
        span.parentNode.children[0].value = "";
        return;
    }

    // deletar o cam
    span.parentNode.remove();
}

// function toggleSelect(event) {
//     document.querySelectorAll('.button-select button')
//         .forEach((button) => button.classList.remove('active'))

//     const button = event.currentTarget
//     button.classList.add('active')

//     const input = document.querySelector('[name="open_on_weekends"]')
//     input.value = button.dataset.value
// }

// select yes or no
function toggleSelect(event) {
    //retirar a class .active (dos botons)
    document.querySelectorAll(".button-select button").forEach(function(button) {
        button.classList.remove("active");
    });

    // colocar a class .active nesse botao clicado

    const button = event.currentTarget;
    button.classList.add("active");

    // verifica se sim ou nao

    //atualizar o meu inpude hidden com o valor selecionado

    const input = document.querySelector('[name="open_on_weekends"]');
    input.value = button.dataset.value;
}

// desafio
function validate(event) {
    //validar se lat a lng astao preechidos
    const field = event.target
    field.setCustomValidity("0000")



    const needsLatAndLng = validate(event);
    if (needsLatAndLng) {
        event.preventDefault();
        console.log(event)
        alert("Selecione um ponto no mapa!");
    } else {
        alert("Enviado com suceso. Obrigado!")
    }
}