sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ui5.futureview.ui5project1.controller.View1", {
            onInit: function () {
            },
            onAfterRendering: function() {
                let oModel = this.getView().getModel("some_info");
                //console.log("onAfterRendering")
                //console.log(JSON.stringify(oModel.getData()));
            }
        });
    });
