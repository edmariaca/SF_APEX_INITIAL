import { LightningElement, api } from 'lwc';
import ModalConsultor from "c/modalConsultor";

export default class ProductTile extends LightningElement {
    /** Se recibe la infromacion del consultor del foreach. */
    @api consultor;
    /** Se abre el modal cuando se da clic en el boton. */
    nota_consultor() {
        ModalConsultor.open({
            id_consultor: this.consultor.Id
        }).then((result) => {
            console.log('Se abrio correctamente: '+result);
        });
    }
}