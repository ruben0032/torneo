//Obtener informacion de archivo json
let Personajes = (() =>{
    const url = "./dbz.json";
    const getData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };
    return {getData};
})();

export default Personajes;