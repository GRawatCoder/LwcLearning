public with sharing class AccountController {
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccountList(){
        return [SELECT Id, Name, Type, Industry from Account LIMIT 5];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountListByName(String searchKey){
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Type, Industry FROM Account WHERE Name LIKE :key LIMIT 5];
    }
}