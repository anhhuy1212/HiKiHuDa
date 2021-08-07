/// <reference path="Vista.js"/>
/// <reference path="../jquery.simplemodal.1.4.3.min.js"/>

Vista.ModalError = (function () {
    // TODO: lang for default values
    var template = '<div class="modal-error">' +
                       '<h2 class="modal-error-title">' + Vista.Lang.ModalError.Title + '</h2>' +
                       '<p class="modal-error-message"></p>' +
                       '<div class="modal-error-button-container"><button class="page-action"><span>' + Vista.Lang.ModalError.OkButton + '</span></button></div>' +
                   '</div>',

        thirdPartyExceededTemplate = '<div class="modal-error">' +
                       '<h2 class="modal-error-title">' + Vista.Lang.ModalError.Title + '</h2>' +
                       '<p class="modal-error-message"></p>' +
                       '<div class="modal-error-button-container"><button class="page-action" id="btnYes" style="display:inline"><span>' + Vista.Lang.ModalError.YesButton + '</span></button>' +
                                                                 '<button class="page-action" id="btnNo" style="background-color:#fff; color:black; display:inline"><span>' + Vista.Lang.ModalError.NoButton + '</span></button></div></div>',
        container,
        titleContainer,
        textContainer,
        defaultTitle,
        yesClick;

    var methods = {
        show: function (message, title, approvedQuantity, yesClickEvent, noClickEvent, ajaxPost, memberTicketToAddToOrder /* optional */) {
            //if (!container)
            createContainer(approvedQuantity, yesClickEvent, noClickEvent, ajaxPost, memberTicketToAddToOrder);

            textContainer.text(message);

            setTitle(title);

            container.modal({
                overlayClose: true,
                containerId: 'modal-error-container',
                modal: true,
                persist: true
            });
            yesClick = yesClickEvent;
        }
    };

    function onOkClick() {
        $.modal.close();
        $('.modal-error').hide();
    }

    function onYesClick() {
        $(template).yesClick;
    }

    function createContainer(approvedQuantity, yesClickEvent, noClickEvent, ajaxPost, memberTicketToAddToOrder) {
        if (approvedQuantity == undefined) {
            container = $(template).appendTo('body');
        }
        else {
            container = $(thirdPartyExceededTemplate).appendTo('body');
            container.find('#btnYes').on('click', function () {
                yesClickEvent(ajaxPost, memberTicketToAddToOrder);
            });
            container.find('#btnNo').on('click', function () {
                noClickEvent(ajaxPost, memberTicketToAddToOrder);
            });
        }        

        titleContainer = container.find('.modal-error-title');
        defaultTitle = titleContainer.text();

        textContainer = container.find('.modal-error-message');

        container.find('button').on('click', onOkClick);
       
    }

    function setTitle(optionalTitle) {
        titleContainer.text(typeof optionalTitle !== 'undefined' ? optionalTitle : defaultTitle);
    }
    return methods;
})();