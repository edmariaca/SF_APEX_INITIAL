import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';
import getConsultor from '@salesforce/apex/Consultores.getConsultor';

export default class FormularioConsulta extends LightningElement {
    /** Variables usadas **/
    correoConsultar;
    NombreConsultado;

    /** Se actualiza el campo correo **/
    handleInputChange(event) {
        this.correoConsultar = event.detail.value;
    }

    /** Se valida el clic del boton **/
    handleClick() {
        /** Se envia valor a consultar **/
        ConsultarCorreo(this.correoConsultar);
    }
}

/** Funcion de consulta **/
function ConsultarCorreo(valor) {
    getConsultor({ //imperative Apex call
        Correo: valor
    })
        .then(data => {
            console.log(data);
            /** Se valida respuesta **/
            if (data.length > 0) {
                LightningAlert.open({
                    message: 'Nombre: ' + data[0].Name + ' Fecha de ingreso' + data[0].ingreso__c,
                    theme: 'error', // a red theme intended for error states
                    label: 'Datos Consultados!', // this is the header text
                });
            } else {
                LightningAlert.open({
                    message: 'Usuario no existe en la base de datos',
                    theme: 'error', // a red theme intended for error states
                    label: 'Datos Consultados!', // this is the header text
                });
            }

        })
        .catch(error => {
            console.log(error);
            /** Se muestran errrore **/
            LightningAlert.open({
                message: 'Ocurrio un error',
                theme: 'error', // a red theme intended for error states
                label: 'Datos Consultados!', // this is the header text
            });
        });

}