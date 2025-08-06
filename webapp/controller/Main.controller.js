sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("com.sappress.customerapp.controller.Main", {
        
        //Life-Cycle-Methods:
        onInit: function(){
            console.log("onInit executed");
        },
        onBeforeRendering: function(){
            console.log("onBeforeRendering executed");
        },
        onAfterRendering: function() {
            console.log("onAfterRendering executed");
        },
        onExit: function(){
            console.log("onExit executed");
        },

        //Event-Handlers:
        onButtonPressed: function() {

            let oView = this.getView();
            let oFirstnameInput = oView.byId("inpFirstname");
            let sFirstnameValue = oFirstnameInput.getValue();

            console.log("Button pressed");
            console.log("Firstname is " + sFirstnameValue);
        }

    });
});
