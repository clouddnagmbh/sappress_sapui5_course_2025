sap.ui.define(
    [],
    function(){
        return {
            genderFormatter: function(sGender){
                let oView = this.getView(),
                    oi18nModel = oView.getModel("i18n"),
                    oResourceBundle = oi18nModel.getResourceBundle();
                return oResourceBundle.getText(sGender);
            }
        };
    }
)