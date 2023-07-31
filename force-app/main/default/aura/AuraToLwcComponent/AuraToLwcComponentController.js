({
    lwcEventHandler : function(component, event, helper) {
        console.log('aura handler');
        var lwcMsg = event.getParam('msg');
        console.log(lwcMsg);
        component.set("v.message",lwcMsg);
    }
})
