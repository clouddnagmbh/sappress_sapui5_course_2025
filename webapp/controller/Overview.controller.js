sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "sap/ui/model/Filter",
        "sap/m/MessageToast",
        "sap/ui/model/json/JSONModel"
        //"com/sappress/customerapp/controller/modules/GenderFormatter"
    ],
    function (BaseController, MessageBox, Filter, MessageToast, JSONModel, GenderFormatter) {
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
            //formatter: GenderFormatter,

            /**
             * Intitialization-Livecycle Method 
             * @override
             * @public
             */
            onInit: function () {
                
            },

            onAfterRendering: function() {
                let uiModel = new JSONModel({
                    decisionDemandPopin: true
                });
                this.getView().setModel(uiModel, "ui");
            },

            segmentedButtonChanged: function(oEvent) {
                let sSelectedKey = oEvent.getSource().getSelectedKey();
                this.getView().getModel("ui").setProperty("/decisionDemandPopin", sSelectedKey === "more");
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

            genderFormatter: function(sGender){
                let oView = this.getView(),
                    //Get the Internationalization Model
                    oi18nModel = oView.getModel("i18n"),
                    oResourceBundle = oi18nModel.getResourceBundle();
                return oResourceBundle.getText(sGender);
            },

            onTestReadPress: function () {

                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                MessageToast.show(oResourceBundle.getText("customer.messageHint"));

                /*
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
                */
            },

            phoneNumberState(phone) {
                const regex = /^(\+?\d{1,3}[- ]?)?\(?\d{1,4}\)?([- ]?\d{1,4}){1,3}$/;

                return regex.test(phone) ? "Success" : "Error";
            }

        });
    }
);
