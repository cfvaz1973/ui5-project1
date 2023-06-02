/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "ui5/futureview/ui5project1/model/models",
  ],
  function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("ui5.futureview.ui5project1.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // access league model (through leagues.json file)
        let oLeagues = this.getModel("leagueInfo"); // access league model

        oLeagues.dataLoaded().then(
          function () {
            console.log("leagues.json file read");
            let leagues = oLeagues.getProperty("/response/league"); // Access specific block
            // Try to access the model on the dataLoaded event -> OK
            //            let oModel = this.getModel("some_info"); // Access model
            //console.log("Try to access the model on dataLoaded event");
            //console.log(JSON.stringify(oModel.getData()));
          }.bind(this)
        );

        /*
        // Try to access the model on the init event -> FAILS
        let oModel = this.getModel("some_info"); // Access model
        //console.log("Try to access the model on init event");
        //console.log(JSON.stringify(oModel.getData()));

        // read the json file directly
        let oMydata = new sap.ui.model.json.JSONModel();
        oMydata.loadData("model/some_info.json");

        // process the file data, when it's ready - Generic Event Handler
        oMydata.attachEventOnce("requestCompleted", function (oEvent) {
          //console.log("Generic Event Handler");
          //console.log(JSON.stringify(oMydata.getData()));
        });

        // process the file data, when it's ready - Specific Event Handler
        oMydata.attachRequestCompleted(function (oEvent) {
          //console.log("Specific Event Handler");
          //console.log(JSON.stringify(oMydata.getData()));
        });

        // process the file data, when it's ready - dataloaded event
        oMydata.dataLoaded().then(
          function () {
            //console.log("dataLoaded Event Handler");
            let myString = oMydata.getProperty("/Meta Data"); // Access specific block
            //console.log(myString);
            // Try to access the model on the dataLoaded event -> OK
            let oModel = this.getModel("some_info"); // Access model
            //console.log("Try to access the model on dataLoaded event");
            //console.log(JSON.stringify(oModel.getData()));
          }.bind(this)
        );
*/

        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            console.log(this.responseText);
          }
        });

        xhr.open("GET", "https://v3.football.api-sports.io/leagues");
        xhr.setRequestHeader(
          "X-RapidAPI-Key",
          "794f3a8d8764b46731df887b0c0240e9"
        );
        xhr.setRequestHeader("X-RapidAPI-Host", "v3.football.api-sports.io");

        xhr.send(data);

        // REST call AlphaVantage
        let sUriAlpha =
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=H3PJ3WC57XZ85L0F";

        let oAPIAlpha = new sap.ui.model.json.JSONModel();
        oAPIAlpha.loadData(sUriAlpha, null, true, "GET", null, false, null);
        // process the file data, when it's ready - dataloaded event
        oAPIAlpha.dataLoaded().then(
          function () {
            //console.log("REST CALL - dataLoaded Event Handler");
            let myString = oAPIAlpha.getProperty("/Meta Data"); // Access specific block
            console.log(myString);
          }.bind(this)
        );

        // REST call to API Sports
        var sUriSports = "https://v3.football.api-sports.io/leagues";
        var oHeaders = {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "794f3a8d8764b46731df887b0c0240e9",
        };
        var oParameters = null;

        var oAPISports = new sap.ui.model.json.JSONModel();
        //loadData(sURL, oParameters?, bAsync?, sType?, bMerge?, bCache?, mHeaders?) : Promise|undefined
        oAPISports.loadData(
          sUriSports,
          oParameters,
          true,
          "GET",
          null,
          false,
          oHeaders
        );
        // process the file data, when it's ready - dataloaded event
        oAPISports.dataLoaded().then(
          function () {
            //let myString = JSON.stringify(oAPISports.getData());
            let myString = oAPISports.getJSON();
            console.log(myString);
          }.bind(this)
        );
      },
    });
  }
);
