/*global QUnit*/

sap.ui.define([
	"comsappress/customerapp/controller/Overview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Overview Controller");

	QUnit.test("I should test the Overview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

	QUnit.module("Formatter");

    QUnit.test("I should test the Phone State Formatter", function (assert) {
        var oAppController = new Controller();

        assert.equal(oAppController.phoneNumberState("+1-202-555-0173"), "Success");
		assert.equal(oAppController.phoneNumberState("202-555-0173"), "Success");
		assert.equal(oAppController.phoneNumberState("(202) 555-0173"), "Success");
        assert.equal(oAppController.phoneNumberState("123456"), "Success");
        assert.equal(oAppController.phoneNumberState("abcd-1234"), "Error");
		
    });


});
