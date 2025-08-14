sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "com/sappress/customerapp/controller/modules/GenderFormatter"
    ],
    function (BaseController, GenderFormatter) {
        "use strict";

        /**
         * @class
         * Controller for the Overview-View
         *
         * @extends sap.ui.core.mvc.Controller
         * @author Maximilian Olzinger
         */
        return BaseController.extend("com.sappress.customerapp.controller.Overview", {
            //Load Formatter-Module into Controller-Property
            formatter: GenderFormatter,

            /**
             * Intitialization-Livecycle Method 
             * @override
             * @public
             */
            onInit: function () {

            },

            /**
             * Eventhandler for pressing on an ColumnListItem corresponding to a customer
             *
             * @param {sap.ui.base.Event} oEvent: Event Object for the press-Event of the ColumnListItem
             * @public
             */
            onCustomerPress: function (oEvent) {
                const oColumnListItem = oEvent.getSource(),
                    oBindingContext = oColumnListItem.getBindingContext(),
                    //Get the Index of the Customer in the JSONModel-Array
                    sCustomerID = oBindingContext.getPath().split("/").at(-1);

                const oRouter = this.getOwnerComponent().getRouter();

                //Navigate to the RouteDetail and provide the Customer ID as a routing parameter
                oRouter.navTo("RouteDetail", {
                    customerId: sCustomerID
                });
            }
        });
    }
);
