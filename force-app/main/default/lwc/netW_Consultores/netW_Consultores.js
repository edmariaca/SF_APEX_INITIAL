import { LightningElement, wire } from 'lwc';

// getConsultores() method in Consultores Apex class
import getConsultores from '@salesforce/apex/Consultores.getConsultores';

export default class NetW_Consultores extends LightningElement {
    /** Se usa titulo dinamico **/
    ListaMostrada = "consultores NETW";
    /**
     * Se usa wire para ejecutar metodo
     * consultores.data -> devuelve la informacion
     * consultores.error -> si salio un error
    */
    @wire(getConsultores)
    consultores;
}