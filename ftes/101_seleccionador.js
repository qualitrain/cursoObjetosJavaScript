function Seleccionador(sel){
    this.txtOpciones = sel.arrOpciones;
    this.idsOpciones = sel.arrIds;
    this.padre = sel.elemPadre;
    this.valorSeleccionado = undefined;

    Seleccionador.num++;
    this.nombre = "Sel_" + ("0000" + Seleccionador.num).slice(-3);
    this.id = "id" + this.nombre;
    this.idHtml = "div" + this.id;

    this.idsHtml = [];
    for(let i=0; i<this.txtOpciones.length; i++){
        this.idsHtml.push( "id_" + this.id + "_" + (i +1));
    }
}

Seleccionador.num = 0;

Seleccionador.prototype.setClase = function(clase){
    this.clase = clase;
}

Seleccionador.prototype.inspeccionar = function(){
    console.log("id: " + this.id);
    console.log("nombre: " + this.nombre);
    console.log("padre: " + this.padre.tagName);
    console.log("class: " + this.clase);
    console.log("opciones: ")
    for(let i=0; i<this.txtOpciones.length; i++){
        console.log(this.txtOpciones[i] + ": " + this.idsOpciones[i] + " (" + this.idsHtml[i] + ") ");
    }
}

Seleccionador.prototype.getCambiadorValor = function (){
    var seleccionador = this;
    var cambiadorValor = function(evt){
        console.log("valor activo en " + seleccionador.id + ": " + evt.target.value);
        seleccionador.valorSeleccionado = evt.target.value;
    }
    return cambiadorValor; //una función que contiene la referencia al seleccionador gracias a una cerradura
}

Seleccionador.prototype.generarHtml = function(){
    var div = document.createElement("div");
    div.setAttribute("id", this.idHtml);
    if(this.clase)
        div.setAttribute("class",this.clase);

    for(let i=0; i<this.txtOpciones.length; i++){
        let labelI = document.createElement("label");
        labelI.setAttribute("for", this.idsHtml[i]);

        let radioI = document.createElement("input");
        radioI.setAttribute("id", this.idsHtml[i]);
        radioI.setAttribute("type","radio");
        radioI.setAttribute("name",this.nombre);
        radioI.setAttribute("value",this.idsOpciones[i]);

        radioI.onclick = this.getCambiadorValor();

        let txtI = document.createTextNode(this.txtOpciones[i]);

        labelI.appendChild(radioI);
        labelI.appendChild(txtI);

        div.appendChild(labelI);
    }
    this.padre.appendChild(div);
}
