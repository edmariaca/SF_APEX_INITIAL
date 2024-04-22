public with sharing class Consultores {
  @AuraEnabled(Cacheable=true)
  public static List<Consultor__c> getConsultores() {
    List<Consultor__c> result = [
      SELECT
        Id,
        avatar__c,
        correo__c,
        CreatedById,
        escolaridad__c,
        ingreso__c,
        Name,
        OwnerId,
        salario__c,
        LastModifiedById
      FROM Consultor__c
      LIMIT 200
    ];

    return result;
  }

  @AuraEnabled
  public static List<Consultor__c> getConsultor(String Correo) {
    List<Consultor__c> result = [
      SELECT
        Id,
        avatar__c,
        correo__c,
        CreatedById,
        escolaridad__c,
        ingreso__c,
        Name,
        OwnerId,
        salario__c,
        LastModifiedById
      FROM Consultor__c
      WHERE correo__c = :Correo
    ];

    return result;
  }

  @AuraEnabled
  public static List<Nota__c> getNotas(String Id) {
    List<Nota__c> result = [
      SELECT Id, Name, Nota__c, CreatedDate
      FROM Nota__c
      WHERE Consultor__c = :Id
    ];

    return result;
  }

  @AuraEnabled
  public static String saveNota(String titulo, String nota, String Id) {
    Nota__c notadb = new Nota__c(
      Name = titulo,
      Nota__c = nota,
      Consultor__c = Id
    );
    insert notadb;

    DateTime todaysDate = System.today();
    String todaysDateStr = todaysDate.format('yyyy-MM-dd');
    EmailManager em = new EmailManager();
    String body =
      '<table>' +
      '<tr>' +
      '  <th>Titulo</th>' +
      '  <th>Nota</th>' +
      '  <th>Fecha</th>' +
      '</tr>' +
      '<tr>' +
      '  <td>' +
      titulo +
      '</td>' +
      '  <td>' +
      nota +
      '</td>' +
      '  <td>' +
      todaysDateStr +
      '</td>' +
      '</tr>' +
      '</table>';

    Consultor__c email = [
      SELECT correo__c
      FROM Consultor__c
      WHERE Id = :Id
      LIMIT 1
    ];

    em.sendMail(email.correo__c, 'Nueva Nota Asignada', body);

    return notadb.ID;
  }
}
