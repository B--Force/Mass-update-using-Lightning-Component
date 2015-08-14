({
	initScripts: function(component, event, helper) {

        //Ignore duplicate notifications that may arrive because other components 
        //loading scripts using the same library. 
        if (component.alreadyhandledEvent)  
            return;
        
            var btn = component.find("massUpdate").getElement();
            var dlg = component.find("modalDlg").getElement();
            jQuery(btn).on("click", function() {
                if(component.get("v.selectedLeads") != ''){
                jQuery(dlg).modal();
                }else{
                    alert('Please Select Any Leads');
                }
            });
            component.alreadyhandledEvent = true;
        },
    massupdate:function(component, event) {
        var recids =   $A.util.json.encode(component.get("v.selectedLeads"));
        var status = component.find("status");
        status = status.get("v.value");        
        var action = component.get("c.massUpdateLeads");       
        action.setParams({
            "recIds": recids,
            "Status": status
        });
        action.setCallback(this, function(a) {
            component.set("v.Leads", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    updateOwner:function(component, event) {
        if(component.get("v.selectedLeads") != ''){
            var recids =   $A.util.json.encode(component.get("v.selectedLeads"));              
            var action = component.get("c.massUpdateOwner");       
            action.setParams({
                "recIds": recids            
            });
            action.setCallback(this, function(a) {
                component.set("v.Leads", a.getReturnValue());
            });
            $A.enqueueAction(action);  
        }else{
            alert('Please Select Any Leads');
        }
      
    },
    doInit : function(component, event) {
        var action = component.get("c.getLeadRecord");
        action.setCallback(this, function(a) {
            component.set("v.Leads", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    updateSelectedLeads : function(component, event) {
        var id = event.source.get("v.text");
        if (event.source.get("v.value")) {
            
            if (component.get("v.selectedLeads").indexOf(id) < 0) {
                component.get("v.selectedLeads").push(id);
                console.log(component.get("v.selectedLeads"));
            }
        } else {
            
            var index = component.get("v.selectedLeads").indexOf(id);
            if (index > -1) {
                component.get("v.selectedLeads").splice(index, 1);
            }
            console.log(component.get("v.selectedLeads"));
        }
},
    getLeads: function(component, event) {
    var searchKey = event.getParam("recName");      
    var action = component.get("c.getLeadByName");       
    action.setParams({
      "recName": searchKey
    });
    action.setCallback(this, function(a) {
        component.set("v.Leads", a.getReturnValue());
    });
    $A.enqueueAction(action);
}
})
