export class configuracion extends HTMLElement{
    constructor(){
        super();
        /* variables de configuraciones */
        this.shadow = true;
        this.fog;
    }

    castShadow = true

    //este es el get de los parametros
    static get observerAttributes(){
        return['shadow', 'fog']
    }

    //funcion para cambiar el valor de las variables de configuraciones
    attibuteChangeCallback(shadowAtr, newValue){
        switch (shadowAtr) {
            case "shadow":
                this.shadow = newValue
                console.log(this.shadow);
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


window.customElements.define("configuracion-prueba", configuracion)