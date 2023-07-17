@RestResource(urlMapping='/order/*')
global without sharing class LoadOrdersApi {	
    
    public class OrderWrapper {
        public OrderInfo Order;
    }
    
    public class OrderInfo {
        public SenderInfo Sender;
        public LinesInfo Lines;
    }
    
    public class SenderInfo {
        public String LogicalId;
        public String Name;
        public String OrderNo;
        public String Agreement;
        public Date StartDate;
        public Date EndDate;
    }
    
    public class LinesInfo {
        public List<ItemInfo> Item;
    }
    
    public class ItemInfo {
        public String LineNo;
        public String Name;
        public Decimal Quantity;
        public Decimal Discount;
    }
    
    public class ErrorResponse {
        public String message;
    }
    
    @HttpPost
    global static void loadOrder(){
        RestRequest req = RestContext.request;
        String jsonRequestPayload=req.requestBody.toString();
        // Deserialize the JSON payload using the wrapper class
        LoadOrderWrapperClass orderWrapper= LoadOrderWrapperClass.parse(jsonRequestPayload);        
      //  OrderWrapper orderWrapper = (OrderWrapper) JSON.deserialize(jsonRequestPayload, OrderWrapper.class);
        System.debug('@@@@ orderWrapper  ' +orderWrapper);
        ErrorResponse response = new ErrorResponse();
        
        // Extract the order information from the wrapper class
        LoadOrderWrapperClass.Sender senderInfo = orderWrapper.Order.Sender;
        LoadOrderWrapperClass.Lines linesInfo = orderWrapper.Order.Lines;
        
        // Check if the order already exists in Salesforce based on the order number
        String orderNumber = senderInfo.OrderNo;
        Order existingOrder=null;
        if(orderNumber!= 'Undefined'){
        existingOrder = [SELECT Id FROM Order WHERE OrderNumber = :orderNumber LIMIT 1];
        System.Debug('@@@@'+ existingOrder);
        }
        List<Account> Accounts=[SELECT Id,Name FROM account WHERE Name = : senderInfo.Name LIMIT 1];
        if(Accounts.size()==0){
            System.debug('@@@@ Account null');
            String errorMessage = 'Customer has no Account found in salesforce to create or update the order';
            response.message = errorMessage;            
            RestContext.response.statusCode = 400; // Bad Request
            RestContext.response.responseBody = Blob.valueOf(JSON.serialize(response));
            return;
        }
        
        List<SalesAgreement> salesAgreement = [SELECT Id,PricebookId FROM SalesAgreement WHERE Name = :senderInfo.Agreement AND AccountId = :Accounts[0].id AND Status ='Activated' LIMIT 1];
        // List<OrderItem> LineItemProd=[SELECT id,OrderId,Product2Id,Discount__c,Quantity,OrderItemNumber from OrderItem WHERE OrderItemNumber = :linesInfo.Item];
        //        Map<Id,String>
        
        if(salesAgreement.size()==null){
            System.debug('@@@@ SA null ');
            String errorMessage = 'Customer has no sales agreement found in salesforce';
            response.message = errorMessage;            
            RestContext.response.statusCode = 400; // Bad Request
            RestContext.response.responseBody = Blob.valueOf(JSON.serialize(response));
            return;
        }
        if (existingOrder != null ) {
            // Update the existing line items
            updateLineItems(existingOrder.Id, linesInfo.Item);
        } else {
            
            // get products details and add them to list
            
            List<string> prodNamesFromPayload = new List<string>();
            for(LoadOrderWrapperClass.Item productsFromPayload: linesInfo.Item){
                prodNamesFromPayload.add(productsFromPayload.Name);
            }
			Map<Id, Product2> productsDetails = new Map<Id, Product2>([Select Id,Name from Product2 where Name IN :prodNamesFromPayload]); 
            
            // Some products aren't added as part of migration activity from business
            if(productsDetails.size()!=linesInfo.Item.size()){
                System.debug('@@@@ Products error ');
                String errorMessage = 'Products are not found in Salesforce Platform, Please load the products first.';                
                response.message = errorMessage;            
                RestContext.response.statusCode = 400; // Bad Request
                RestContext.response.responseBody = Blob.valueOf(JSON.serialize(response));
                return;
            }
            
            // Create a new Order record
            System.debug('@@@@ new order Creation block');
            Order newOrder = new Order();            
            // Set the fields for the Order record using the extracted information
            // newOrder.Name = senderInfo.Name;
            newOrder.AccountId=Accounts[0].Id;            
            // Set other mandatory fields
            newOrder.SalesAgreementId = salesAgreement[0].id;
            newOrder.EffectiveDate = Date.valueOf(senderInfo.StartDate);
            newOrder.Pricebook2Id=salesAgreement[0].PricebookId;
            newOrder.Status = 'Draft'; // Set default status
            
            // Insert the Order record
            Database.SaveResult orderInsertResult = Database.insert(newOrder, false);
            if (!orderInsertResult.isSuccess()) {
                System.debug('@@@@ Order error ');
                String errorMessage = orderInsertResult.getErrors()[0].getMessage();                
                response.message = errorMessage;            
                RestContext.response.statusCode = 400; // Bad Request
                RestContext.response.responseBody = Blob.valueOf(JSON.serialize(response));
                return;
            }
            
            // Create new Order Line Item records
            createLineItems(newOrder.Id, linesInfo.Item, productsDetails);
        }
    }
    
    private static void updateLineItems(Id orderId, List<LoadOrderWrapperClass.Item> lineItemsInfo) {
        // Retrieve the existing line items for the order
        List<OrderItem> existingLineItems = [SELECT id,OrderId,Product2Id,Discount__c,Quantity,OrderItemNumber FROM OrderItem WHERE OrderId = :orderId];
        ErrorResponse response = new ErrorResponse();
        // Map existing line items by line number for easy access
        Map<String, OrderItem> existingLineItemsMap = new Map<String, OrderItem>();
        for (OrderItem item : existingLineItems) {
            existingLineItemsMap.put(String.valueOf(item.OrderItemNumber), item);
        }
        
        // Update or create line items based on matching line numbers
        List<OrderItem> updatedLineItems = new List<OrderItem>();
        for (LoadOrderWrapperClass.Item lineItemInfo : lineItemsInfo) {
            String lineNumber = lineItemInfo.LineNo;           
            if (existingLineItemsMap.containsKey(lineNumber)) {
                OrderItem existingItem = existingLineItemsMap.get(lineNumber);                
                // Update the existing line item
                // Set the fields for the Order Line Item record using the extracted information                
                updatedLineItems.add(existingItem);
            } else {
                // Create a new line item
                OrderItem newItem = new OrderItem();
                // Set the fields for the Order Line Item record using the extracted information
                
                // Set other mandatory fields
                newItem.OrderId = orderId;                
                updatedLineItems.add(newItem);
            }
        }        
        // Update the line items in Salesforce
        Database.SaveResult[] lineItemUpdateResults = Database.update(updatedLineItems, false);
        for (Database.SaveResult result : lineItemUpdateResults) {
            if (!result.isSuccess()) {
                String errorMessage = result.getErrors()[0].getMessage();                
                response.message = errorMessage;            
                RestContext.response.statusCode = 400; // Bad Request
                RestContext.response.responseBody = Blob.valueOf(JSON.serialize(response));
                return;
            }
        }
    }
    
    private static void createLineItems(Id orderId, List<LoadOrderWrapperClass.Item> lineItemsInfo, Map<Id,Product2> prodDetails) {
        
        List<OrderItem> newLineItems = new List<OrderItem>();
        ErrorResponse response = new ErrorResponse();
        
        for (LoadOrderWrapperClass.Item lineItemInfo : lineItemsInfo) {
            OrderItem newItem = new OrderItem();
            for(Product2 product : prodDetails.values()){
                if(product.Name ==lineItemInfo.Name){
                    newItem.Product2Id=product.Id;
                }
            }            
            
            // Set the fields for the Order Line Item record using the extracted information                       
            newItem.OrderId = orderId;
            // Set other mandatory fields
            //newItem.Product2Id=lineItemInfo.Name;
            newItem.Quantity =Decimal.Valueof(lineItemInfo.Quantity);
            newItem.Discount__c = Decimal.Valueof(lineItemInfo.Discount);              
            newLineItems.add(newItem);
        }        
        // Insert the new line items into Salesforce
        Database.SaveResult[] lineItemInsertResults = Database.insert(newLineItems, false);
        for (Database.SaveResult result : lineItemInsertResults) {
            if (!result.isSuccess()) {
                System.debug('@@@@@ line item inserted ');
                String errorMessage = result.getErrors()[0].getMessage();                
                response.message = errorMessage;            
                RestContext.response.statusCode = 400; // Bad Request
                RestContext.response.responseBody = Blob.valueOf(JSON.serialize(response));
                return;
            }
        }
    }
}