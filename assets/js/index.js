import { Saiyajin, Humano } from "./Clases/Raza.js";

//Array para guardar informacion de participantes
let participantes = [];

document.getElementById("btnRegistrar").addEventListener("click", ()=> {
    let nombre = document.getElementById("nombre");
    let raza = document.getElementById("raza");
    let previewElement = document.getElementById("preview");
    let imagenSrcBg = previewElement.style.backgroundImage;
    //Ajustar imagen acorde a preview (con slice)
    let imgSrc = imagenSrcBg.slice(5, imagenSrcBg.length - 2);
    let ki = document.getElementById("poderPelea");

    let nuevoParticipante;

    if (raza.value == "Saiyajin") {
        nuevoParticipante = new Saiyajin(nombre.value, imgSrc, ki.value, raza.value);
    } else if (raza.value == "Humano") {
        nuevoParticipante = new Humano (nombre.value,imgSrc, ki.value, raza.value);
    }

    //Registrar el participante si estan los datos llenados, si falta alguno avisar con alert
    if (raza.value && nombre.value && ki.value && imagenSrcBg) {
        participantes.push(nuevoParticipante); 
        //Para que se reinicie el formulario
        nombre.selectedIndex = 0;
        raza.selectedIndex = 0;
        previewElement.style.backgroundImage = "none";
        imagenSrcBg = previewElement.style.backgroundColor = "#f0f0f0";
        ki.value = "";
        //Llamado a funcion para agregar la card
        reloadTable();
    } else {
        alert("Faltan datos por llenar");
    }

    console.log(participantes);

});

//Agregar card para tabla de participantes
const reloadTable = ()=>{
    const participantesTemplate = document.getElementById("Participantes");
    participantesTemplate.innerHTML = "";
    participantes.forEach((p,i) =>{
        participantesTemplate.innerHTML+= `
        <div class="px-2 pb-2 participante" data-fighter="${p.getNombre()}">
            <div class="card">
                <img src="${p.getImg()}" class="card-img-top" height="400" />
                <div class="card-body">
                    <h4 class="card-title">${p.getNombre()}</h4>
                    <hr class="w-50 mx-auto">
                    <h6 class="card-text">Raza: ${p.getRaza()}</h6>
                    <h6 class="card-text">Poder de pelea: <span class="text-danger"> ${p.getPoder()} </span>
                    <button class="btn btn-outline-warning" onclick="activarHabilidad('${i}')"> Habilidad Especial </button>
                </div>
            </div>
        </div>
        `;
    });
};

//Cuando se trabaja con modulos no reconoce funciones comunes (ES5 o ES6)
//Windows: variable global
//Metodo activarHabilidad, para incrementar el poder de habilidad al realizar su habilidad especial(i corresponde al indice de arreglo participantes)
window.activarHabilidad = (i) => {
    const participante = participantes[i]
    if (participante.getRaza() == "Saiyajin") {
        participante.transformacion();
    } else if (participante.getRaza() == "Humano") {
        participante.coraje();
    }
    //Cargar nuevamente la tabla
    reloadTable();
};

//Para quien es el mas fuerte
document.getElementById("btnMasFuerte").addEventListener("click", () => {
    //Para ordenar de mayor a menor (sort: ordenar)
    const masFuerte = participantes.sort((a,b) => b.getPoder() - a.getPoder())[0];
    const nombre = masFuerte.getNombre();
    reloadTable();
    document.querySelector(`[data-fighter='${nombre}'] div`).style.boxShadow = "0px 0px 5px 1px yellow"
});
