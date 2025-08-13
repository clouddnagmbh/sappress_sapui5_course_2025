sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "com/sappress/customerapp/controller/modules/GenderFormatter"
    ],
    function(BaseController, JSONModel, GenderFormatter) {
      "use strict";
  
      return BaseController.extend("com.sappress.customerapp.controller.Overview", {
        formatter: GenderFormatter,

        onInit: function() {
            /*let oModel = new JSONModel({
                firstName: "Max",
                age: 27,
                isEditable: true,
                people: [{
                    firstName: "Max",
                    age: 27,
                },{
                    firstName: "Daniel",
                    age: 26,
                }]
            });

            this.getView().setModel(oModel);*/
        }
      });
    }
  );
  