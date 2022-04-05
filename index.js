// Segundo desafío entregable para el curso ed JavaScript de CoderHouse
//Esteban dos Santos Mello

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

class Personaje{
    constructor(nombre){
        this.nombre = nombre;
        this.lvl = 1;
        this.hp = 50;
        this.actualHp = 50;
        this.dmg = 10;
        this.def = 1;
        this.vivo = true;
    }
    
    Atacar(){
        const num = random(1,3)/2;
        return this.dmg * num;
    }

    Cubrirse(){
        this.def = 2;
    }

    RecibirDanio(cant){
        let valor = Math.trunc(cant/this.def);
        this.actualHp -= valor;
        if(this.actualHp <= 0){
            this.vivo = false; 
        }
        if(this.def==2){
            this.def = 1;
        }
        return Math.trunc(valor);
    }

    Curar(cant){
        this.actualHp += cant;
        if(this.actualHp > this.hp){
            this.actualHp = this.hp;
        }
    }

    SubirNivel(){
        this.lvl++;
        this.hp += 5;
        this.dmg += 2;
    }

    NormalizarDef(){
        this.def = 1;
    }
}

class Enemigo{
    constructor(nombre,lvl,hp,dmg){
        this.nombre = nombre;
        this.lvl = lvl;
        this.hp = hp;
        this.dmg = dmg;
        this.def = 1;   
        this.vivo = true;  
    }
     
    Atacar(){
        const num = random(1,4)/3;
        return this.dmg * num;
    }

    Cubrirse(){
        this.def = 2;
    }

    RecibirDanio(cant){
        let valor = Math.trunc(cant/this.def)
        this.hp -= valor;
        if(this.hp <= 0){
            this.vivo = false; 
        }
        if(this.def==2){
            this.def = 1;
        }
        return Math.trunc(valor);
    }

    NormalizarDef(){
        this.def=1;
    }
}

function GenerarEnemigo(personaje){
    if(personaje.lvl <= 3){
        let enemigo = new Enemigo('Goblin',personaje.lvl,personaje.hp - 10,personaje.dmg);
        return enemigo;
    }else if(personaje.lvl <= 6){
        let enemigo = new Enemigo('Orco',personaje.lvl,personaje.hp + 10,personaje.dmg - 2);
        return enemigo;
    }else{
        let enemigo = new Enemigo('Dragon',20, 100, 20);
        return enemigo;
    }
}

function AccionPersonaje(string, origen, destino){
    if(string == 'atacar'){
        alert(`${origen.nombre} ataca al ${destino.nombre} enemigo`);
        let cant = destino.RecibirDanio(origen.Atacar());
        alert(`${destino.nombre} recibe ${cant} de daño`);
    }
    else if(string == 'cubrir'){
        origen.Cubrirse();
        alert(`${origen.nombre} se cubre`);
    }
    else if(string == 'curar'){
        origen.Curar(30);
        alert(`${origen.nombre} se toma una poción`)
    }
}

function AccionEnemiga(origen, destino){
    let num = random(1,3);
    if(num <= 2){
        alert(`El ${origen.nombre} enemigo ataca a ${destino.nombre}`);
        let cant = destino.RecibirDanio(origen.Atacar());
        alert(`El ${origen.nombre} hizo ${cant} de daño`);
    }else{
        origen.Cubrirse();
        alert(` El ${origen.nombre} se cubre`);
    }
}

alert(`Bienvenido\nVamos a jugar un juego de batallas por turnos`);
const nombrePersonaje = prompt('Ponle un nombre a tu personaje');
const personaje = new Personaje(nombrePersonaje);
alert('Estás en una planicie y ves un camino y sin tener nada más que hacer empiezas a andar...\nHasta que de pronto...');

while(personaje.vivo){
    let enemigo = GenerarEnemigo(personaje);
    alert(`Aparece un ${enemigo.nombre} enemigo, de nivel ${enemigo.lvl}!`);
    while(enemigo.vivo && personaje.vivo){
        let accion = prompt('Que quieres hacer?\n(atacar, cubrir, curar)');
        while(accion.toLowerCase() != 'atacar' && accion.toLowerCase() != 'cubrir' && accion.toLowerCase() != 'curar'){
            alert('Debes seleccionar entre atacar, cubir o curar');
            accion = prompt('Que quieres hacer?\n(atacar, cubrir, curar)');
        }
        AccionPersonaje(accion, personaje, enemigo);
        if(!enemigo.vivo){
            break;
        }
        AccionEnemiga(enemigo, personaje);
        alert(`NOMBRE: ${personaje.nombre}\nLVL: ${personaje.lvl}\nHP: ${personaje.actualHp}`);
    }
    if(!personaje.vivo){
        alert(`${personaje.nombre} ha muerto! Has perdido! :(`)
        break;
    }
    personaje.SubirNivel();
    alert(`Mataste al ${enemigo.nombre} enemigo, y subiste de nivel!\nAhora eres nivel ${personaje.lvl}!`);
    let queHacer = prompt('Quieres seguir jugando? (si o no)');
    while(queHacer.toLowerCase() != 'si' && queHace.toLowerCase() != 'no'){
        queHacer = prompt('Quieres seguir jugando? (si o no)');
    }
    alert('Pronto sigues caminando hasta que...')
}
