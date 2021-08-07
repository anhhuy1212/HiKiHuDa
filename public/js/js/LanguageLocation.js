var languageCookieName = 'UserLanguage';
var locationCookieName = 'visSelectedSiteGroup';

Vista.LanguageLocation = {
    setSiteGroup: function (siteGroup) {
        var expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 1);
        Vista.Utilities.setCookie(locationCookieName, siteGroup, expiry);
        //$('#site-group-set .change-site-group').text(siteGroup); -- we don't need to set text as it's going to reloadPage    
        $('#site-group-select').hide();
        Vista.LanguageLocation.reloadPage();
    },

    getSiteGroup: function () {
        return Vista.Utilities.getCookie(locationCookieName);
    },

    toggleLanguage: function () {

        var userLanguageContext = Vista.Utilities.getJsonCookie(languageCookieName) || { IsPrimaryLanguage : true };

        userLanguageContext.IsPrimaryLanguage = !userLanguageContext.IsPrimaryLanguage;
        userLanguageContext.UserLanguageTag = null;

        var expiry = Vista.Utilities.addDaysToDate(new Date(), 365);

        Vista.Utilities.setJsonCookie(languageCookieName, userLanguageContext, expiry);

        Vista.LanguageLocation.reloadPage();
    },

    reloadPage: function () {
        window.location.reload();
    }
};


$(function () {
    $('#site-group').click(function () {
        $('#site-group-select').show();
        $('body').bind('click', hideSiteGroupSelect);
        // returns false so that the body click is not fired afterwards
        return false;
    });

    $('#site-group-select .item').click(function () {
        var item = $(this);        
        var selectedSiteGroup = item.attr('id') == null ? item.text() : item.attr('id');
        Vista.LanguageLocation.setSiteGroup(selectedSiteGroup);
    });

    $('#change-language').click(function () {
        Vista.LanguageLocation.toggleLanguage();
    });

    function hideSiteGroupSelect() {
        $('#site-group-select').hide();
        $('body').unbind('click', hideSiteGroupSelect);
    }
});