class configuracion extends HTMLElement{
    constructor(){
        super();
        /* variables de configuraciones */
        this.shadow ;
        this.fog;
    }

	connectedCallback(){
		this.innerHTML=`
		<label style="color: black;">Cast Shadow</label>
		<input type="checkbox" id="shadow" checked>
		<br>
		<label style="color: black;">Fog</label>
		<input type="range" id="fog" min="1" max="100" value="1" id="myRange"></input>
		`
	}
    //este es el get de los parametros
    static get observedAttributes(){
        return['shadow', 'fog']
    }

    //funcion para cambiar el valor de las variables de configuraciones
    attributeChangedCallback(shadowAtr,oldValue, newValue){
		//console.log(shadowAtr, newValue);
        switch (shadowAtr) {
            case "shadow":
                this.shadow = newValue
            break;
        }
    }

    /* connectedCallback(){
        this.innerHTML = `
        <label style="color: black;">Cast Shadow</label><input type="checkbox">
        <br>
        <label style="color: black;">Fog</label><input type="range" min="1" max="100" value="1" id="myRange">
        `
    } */

}

var config;

window.customElements.define("configuracion-prueba", configuracion);

function init() {
	config=new configuracion();
}
export {config,init};