sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], function (Opa5, Press) {
	"use strict";
	var sViewName = "Overview";
	
	Opa5.createPageObjects({
		onTheViewPage: {

			actions: {},

			assertions: {

				iShouldSeeThePageView: function () {
					return this.waitFor({
						id: "overview_semanticPage",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
						},
						errorMessage: "Did not find the " + sViewName + " view"
					});
				},

				iShouldClickOnTheButton: function() {
                    return this.waitFor({
                        id: "overview_button_test",
                        viewName: sViewName,
                        actions: new Press(),
                        success: function (oControl) {
                            Opa5.assert.ok(true, "The Button on the " + sViewName + " view was pressed");
                        },
                        errorMessage: "Did not find the button"
                    });
                }

				
			}
		}
	});

});
