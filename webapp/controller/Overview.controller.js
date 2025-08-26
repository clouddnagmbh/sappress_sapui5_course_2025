sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "com/sappress/customerapp/controller/modules/GenderFormatter",
        "sap/m/MessageBox",
        "sap/ui/model/Filter"
    ],
    function (BaseController, GenderFormatter, MessageBox, Filter) {
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
            },

            /**
             * Eventhandler for the pressing of the Create-Button in the Overview-View
             *
             * @param {sap.ui.base.Event} oEvent: Event Object for the press-Event of the Button 
             * @public
             */
            onCreatePress: function (oEvent) {
                const oRouter = this.getOwnerComponent().getRouter();

                //Navigate to the RouteCreate 
                oRouter.navTo("RouteCreate");
            },

            /**
             * Eventhandler for the pressing the delete Button in the Table
             *
             * @param {sap.ui.base.Event} oEvent: Event Object for the press-Event of the Delete-Button 
             * @public
             */
            onDeletePress: function (oEvent) {
                const sCustomerPath = oEvent.getParameter("listItem").getBindingContext().getPath(),
                    //Get the Internationalization Model
                    oi18nModel = this.getView().getModel("i18n"),
                    oResourceBundle = oi18nModel.getResourceBundle();

                //Show a confirmation Message
                MessageBox.confirm(oResourceBundle.getText("message.confirm.delete"), {
                    onClose: (sAction) => {
                        if (sAction === "OK") {
                            this.getView().getModel().remove(sCustomerPath, {
                                success: () => {
                                    MessageBox.success(oResourceBundle.getText("message.confirm.delete.success"));
                                },
                                error: () => {
                                    MessageBox.error(oResourceBundle.getText("message.confirm.delete.error"));
                                }
                            })
                        }
                    }
                });
            },

            onTestReadPress: function () {
                const oModel = this.getView().getModel();

                //Read Data 
                oModel.read("/Z_P_CUSTOMER", {
                    filters: [
                        new Filter("Lastname", "EQ", "Musterfrau")
                    ],
                    success: (oData, response) => {
                        this;
                        debugger;
                    },
                    error: (oError) => {
                        this;
                        debugger;
                    }
                });

                //Create Data
                oModel.create("/Z_P_CUSTOMER", {
                    Firstname: "Max",
                    Lastname: "Olzinger",

                }, {
                    success: (oData, response) => {
                        this;
                        debugger;
                    },
                    error: (oError) => {
                        this;
                        debugger;
                    }
                });

                //Updata Data
                oModel.update("/Z_P_CUSTOMER(guid'......')", {
                    Firstname: "Max"
                }, {
                    success: (oData, response) => {
                        this;
                        debugger;
                    },
                    error: (oError) => {
                        this;
                        debugger;
                    }
                });
            }
        });
    }
);
