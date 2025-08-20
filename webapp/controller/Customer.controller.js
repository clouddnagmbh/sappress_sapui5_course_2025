sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
],
    function (Controller, Fragment, JSONModel, History) {
        "use strict";

        /**
         * @class
         * Controller for the Customer-View
         *
         * @extends sap.ui.core.mvc.Controller
         * @author Daniel Krancz
         */
        return Controller.extend("com.sappress.customerapp.controller.Customer", {

            editModel: undefined,
            customerFragments: {},

            /**
             * Intitialization-Livecycle Method 
             * @override
             * @public
             */
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter(),
                    oEditModel = new JSONModel({
                        editmode: false
                    });

                this.getView().setModel(oEditModel, "editModel");

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
                this._toggleEdit(false);
            },

            /**
             * Display a Fragment in the Customer-Views Page
             *
             * @param {string} sFragmentName: Name of the Fragment to be shown
             * @private
             */
            _showCustomerFragment: function (sFragmentName) {
                const oPage = this.getView().byId("customer_page");

                oPage.removeAllContent();

                if (this.customerFragments[sFragmentName]) {
                    oPage.addContent(this.customerFragments[sFragmentName]);
                } else {
                    Fragment.load({
                        id: this.getView().createId(sFragmentName),
                        name: "com.sappress.customerapp.view.fragments." + sFragmentName,
                        controller: this
                    }).then((oContent) => {
                        this.customerFragments[sFragmentName] = oContent;


                        oPage.addContent(oContent);
                    });
                }
            },

            /**
                 * Eventhandler for the pressing of the Edit-Button in the Customer-View
                 *
                 * @param {sap.ui.base.Event} oEvent: Event Object for the press-Event of the Button 
                 * @public
                 */
            onEditPress: function (oEvent) {
                this._toggleEdit(true);
            },

            /**
                 * Eventhandler for the pressing of the Save-Button in the Customer-View
                 *
                 * @param {sap.ui.base.Event} oEvent: Event Object for the press-Event of the Button 
                 * @public
                 */
            onSavePressed: function (oEvent) {
                this._toggleEdit(false);
            },

            /**
                 * Eventhandler for the pressing of the Cancel-Button in the Customer-View
                 *
                 * @param {sap.ui.base.Event} oEvent: Event Object for the press-Event of the Button 
                 * @public
                 */
            onCancelPressed: function (oEvent) {
                this._toggleEdit(false);
            },

            /**
             * Method to toggle between edit and display modes
             *
             * @param {boolean} bEditMode: Edit Mode
             * @private
             */
            _toggleEdit: function (bEditMode) {
                const oEditModel = this.getView().getModel("editModel");

                oEditModel.setProperty("/editmode", bEditMode);

                this._showCustomerFragment(bEditMode ? "CustomerEdit" : "CustomerDisplay");
            },

            /**
                 * Eventhandler for navigating back to the main-Page
                 *
                 * @param {sap.ui.base.Event} oEvent: Event Object for the press-Event of the Button 
                 * @public
                 */
            onNavBackPress: function (oEvent) {
                const oHistory = History.getInstance(),
                    sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteMain", {}, true);
                }
            }

        });
    });
