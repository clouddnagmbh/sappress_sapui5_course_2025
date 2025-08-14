sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    function (Controller, Fragment) {
        "use strict";

        /**
         * @class
         * Controller for the Customer-View
         *
         * @extends sap.ui.core.mvc.Controller
         * @author Daniel Krancz
         */
        return Controller.extend("com.sappress.customerapp.controller.Customer", {

            /**
             * Intitialization-Livecycle Method 
             * @override
             * @public
             */
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();

                //Adding an Eventhandler to react to routes being called
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched.bind(this));
            },

            /**
             * Eventhandler for navigating to the Customer-View
             *
             * @param {sap.ui.base.Event} oEvent: Event Object for the patternMatched-Event of the Route 
             * @private
             */
            _onPatternMatched: function (oEvent) {
                //Get the provided Customer ID
                const oCustomerId = oEvent.getParameter("arguments").customerId;

                //Bind the Context of the Customer to the View
                this.getView().bindElement("/customers/" + oCustomerId);
                this._showCustomerFragment("CustomerDisplay");
            },

            /**
             * Display a Fragment in the Customer-Views Page
             *
             * @param {string} sFragmentName: Name of the Fragment to be shown
             * @private
             */
            _showCustomerFragment: function (sFragmentName) {
                Fragment.load({
                    id: this.getView().createId(sFragmentName),
                    name: "com.sappress.customerapp.view.fragments." + sFragmentName,
                    controller: this
                }).then((oContent) => {

                    const oPage = this.getView().byId("customer_page");
                    oPage.removeAllContent();
                    oPage.addContent(oContent);
                });
            },

            /**
                 * Eventhandler for the pressing of the Edit-Button in the Customer-View
                 *
                 * @param {sap.ui.base.Event} oEvent: Event Object for the press-Event of the Button 
                 * @public
                 */
            onEditPress: function (oEvent) {
                this._showCustomerFragment("CustomerEdit");
            }
        });
    });
