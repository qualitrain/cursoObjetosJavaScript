function Seleccionador(sel) {
    this.txtOpciones = sel.arrOpciones;
    this.idsOpciones = sel.arrIds;
    this.padre = sel.elemPadre;
    this.valorSeleccionado = undefined;

    Seleccionador.num++;
    this.nombre = "Sel_" + ("0000" + Seleccionador.num).slice(-3);
    this.id = "id" + this.nombre;
    this.idHtml = "div" + this.id;

    this.idsHtml = [];
    for (let i = 0; i < this.txtOpciones.length; i++) {
        this.idsHtml.push("id_" + this.id + "_" + (i + 1));
    }
}

Seleccionador.num = 0;

Seleccionador.prototype.setClase = function (clase) {
    this.claseCss = clase;
}

Seleccionador.prototype.inspeccionar = function () {
    console.log("id: " + this.id);
    console.log("nombre: " + this.nombre);
    console.log("padre: " + this.padre.tagName);
    console.log("class: " + this.claseCss);
    console.log("opciones: ")
    for (let i = 0; i < this.txtOpciones.length; i++) {
        console.log(this.txtOpciones[i] + ": " + this.idsOpciones[i] + " (" + this.idsHtml[i] + ") ");
    }
    console.log("-----------------------");
}

Seleccionador.prototype.getCambiadorValor = function () {
    var seleccionador = this;
    var cambiadorValor = function (evt) {
        console.log("valor activo en " + seleccionador.id + ": " + evt.target.value);
        seleccionador.valorSeleccionado = evt.target.value;
    }
    return cambiadorValor; //una función que contiene la referencia al seleccionador gracias a una cerradura
}

Seleccionador.prototype.generarHtml = function () {
    var div = document.createElement("div");
    div.setAttribute("id", this.idHtml);
    if (this.claseCss)
        div.setAttribute("class", this.claseCss);
    this.armarEstructura(div);

    this.padre.appendChild(div);
}
Seleccionador.prototype.armarEstructura = function (div) {
    for (let i = 0; i < this.txtOpciones.length; i++) {
        let labelI = document.createElement("label");
        labelI.setAttribute("for", this.idsHtml[i]);

        let radioI = document.createElement("input");
        radioI.setAttribute("id", this.idsHtml[i]);
        radioI.setAttribute("type", "radio");
        radioI.setAttribute("name", this.nombre);
        radioI.setAttribute("value", this.idsOpciones[i]);

        radioI.onclick = this.getCambiadorValor();

        let txtI = document.createTextNode(this.txtOpciones[i]);

        labelI.appendChild(radioI);
        labelI.appendChild(txtI);

        div.appendChild(labelI);
    }

}

function SeleccionadorLista(selConfig, titulo) {
    this.titulo = titulo;
    Seleccionador.call(this, selConfig);
}

SeleccionadorLista.prototype.inspeccionar = function (div) {
    console.log("titulo:" + this.titulo);
    let _super = new Seleccionador({arrOpciones:[], arrIds:[], elemPadre:{} });
    _super.inspeccionar.call(this);
}


SeleccionadorLista.prototype.armarEstructura = function (div) {

    let label = document.createElement("label");
    label.setAttribute("for", this.idHtml + "_sel");
    let txtTit = document.createTextNode(this.titulo);
    label.appendChild(txtTit);

    let selec = document.createElement("select");
    selec.setAttribute("name", this.nombre);
    selec.setAttribute("id", this.idHtml + "_sel");
    selec.onchange = this.getCambiadorValor();

    for (let i = 0; i < this.txtOpciones.length; i++) {
        let optI = document.createElement("option");
        optI.setAttribute("id", this.idsHtml[i]);
        optI.setAttribute("value", this.idsOpciones[i]);
        txtOptI = document.createTextNode(this.txtOpciones[i]);
        optI.appendChild(txtOptI);

        selec.appendChild(optI);
    }
    div.appendChild(label);
    div.appendChild(selec);
}

Object.setPrototypeOf(SeleccionadorLista.prototype, Seleccionador.prototype);
