import { api } from 'lwc';
import LightningModal from 'lightning/modal';

// metodo APEX para obtener informacion de las notas
import getNotas from '@salesforce/apex/Consultores.getNotas';
import saveNota from '@salesforce/apex/Consultores.saveNota';

const columns = [
  { label: 'Titulo', fieldName: 'Name' },
  { label: 'Nota', fieldName: 'Nota__c', type: 'text' },
  { label: 'Fecha', fieldName: 'CreatedDate', type: 'date' },
];


export default class ModalConsultor extends LightningModal {
  /** Se recibe el Id para consultar las notas asociadas al consultor **/
  @api id_consultor;
  /** Variables **/
  guardando = true;
  nota_crear;
  titulo_crear;
  data = [];
  columns = columns;

  /** Llenar los campos del formulario **/
  genericOnChange(event) {
    this[event.target.name] = event.target.value;
    // console.log(this[event.target.name]);
  }

  /** Se consultan las notas del consultor **/
  async connectedCallback() {
    await getNotas({ //imperative Apex call
      Id: this.id_consultor
    })
      .then(data => {
        console.log(data);
        this.data = data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  btnSaveNota() {
    this.guardando = false;
    console.log('ejecutando....3');
    console.log(this.id_consultor);
    saveNota({ //imperative Apex call
      Id: this.id_consultor,
      titulo: this.titulo_crear,
      nota: this.nota_crear
    })
      .then(data => {
        console.log(data);
        this.guardando = true;
        this.titulo_crear = '';
        this.nota_crear = '';
        this.connectedCallback();
      })
      .catch(error => {
        console.log(error);
        this.guardando = true;
      });
  }
}
