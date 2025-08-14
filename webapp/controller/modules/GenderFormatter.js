sap.ui.define(
    [],
    function(){
        return {
            /**
             * Formatter to translate a Gender into the current Language
             *
             * @param {string} sGender: Gender in the Base Language 
             * @public
             * @returns {string}: The translated Gender
             */
            genderFormatter: function(sGender){
                let oView = this.getView(),
                    //Get the Internationalization Model
                    oi18nModel = oView.getModel("i18n"),
                    oResourceBundle = oi18nModel.getResourceBundle();
                return oResourceBundle.getText(sGender);
            }
        };
    }
)