({
	searchLeads: function(component, event, helper) {
       var myEvent = $A.get("e.bcool:SearchLead");
        myEvent.setParams({"recName": event.target.value});
        myEvent.fire();
    }
})
