@RestResource(urlMapping='/ConsultoresAPI/*')
global with sharing class ApiRestConsultores {
    @HttpGet
    global static List<Consultor__c> ObtenerConsultores() {
        // RestRequest req = RestContext.request;
        // RestResponse res = RestContext.response;
        // String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
        // Account result = [SELECT Id, Name, Phone, Website FROM Account WHERE Id = :accountId];
        List<Consultor__c> result = [SELECT Id, Name, ingreso__c, salario__c, 	correo__c FROM Consultor__c];
        return result;
    }
    @HttpPost
    global static List<Consultor__c> crearConsultor() {
        // RestRequest req = RestContext.request;
        // RestResponse res = RestContext.response;
        // String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
        // Account result = [SELECT Id, Name, Phone, Website FROM Account WHERE Id = :accountId];
        List<Consultor__c> result = [SELECT Id, Name, ingreso__c, salario__c, 	correo__c FROM Consultor__c];
        return result;
    }
}