/// <reference path="Vista.js"/>
/// <reference path="../Utilities/Utilities.js" />

(function () {
    'use strict';
    Vista.Collapsible = function (textbox, options) {
        var defaults = {
            placeholder: Vista.Lang.Shared.OverflowPlaceholder.replace(/\s/g, '&nbsp;'), // placeholder text, e.g. ...[3 more]
            collapsedHeight: 2, // number of lines the control should be trimmed to when calling .collapse()
            separator: ', ', // separator between items
            maxLines: 0 // maximum number of lines before collapsed is triggered, 0 to base it on container height 
        };

        this.options = $.extend(defaults, options);
        this.textbox = textbox;

        this.lineHeight = undefined;

        this.collapsed = false;
        this.hiddenItems = 0;

        var initial = this.textbox.text().split(this.options.separator);
        if (initial[0] !== '')
            this.items = initial;
        else
            this.items = [];

        this.refresh();
    };

    Vista.Collapsible.prototype.reset = function () {
        this.items = [];
        this.collapsed = false;
        this.hiddenItems = 0;
        this.textbox.empty();
    };

    Vista.Collapsible.prototype.refresh = function () {
        if (!this.lineHeight) {
            // assume the textbox is visible at this point and calculate the line height
            var tester = $('<span></span>').css({
                position: 'absolute',
                'line-height': 'inherit'
            }).html('&nbsp;');

            this.textbox.append(tester);
            this.lineHeight = tester.height();
            tester.remove();
        }

        if (!this.lineHeight) return; // failed to get line-height, container is not visible

        var lines = this.textbox.height() / this.lineHeight;
        if (this.options.maxLines) {
            if (this.options.maxLines && lines > this.options.maxLines) {
                this._trim(this.options.maxLines);
            }
        }
        else if ((this.textbox.position().top - this.textbox.parent().position().top + this.textbox.outerHeight(true)) > this.textbox.parent().outerHeight(true)) { // overflow
            this._trim(lines - 1);
        }
    };

    Vista.Collapsible.prototype.append = function (text) {
        if (this.collapsed) {
            this.items.push(text);
            this.textbox.find('span').html(Vista.Utilities.format(this.options.placeholder, ++this.hiddenItems));
            // TODO: (minor) placeholder width expanding is not handled (1 -> 2 -> 3 digits)
            return;
        }

        if (this.items.length) {
            this.textbox.append(this.options.separator);
        }

        this.textbox.append(text);
        this.items.push(text);

        this.refresh();
    };

    Vista.Collapsible.prototype._trim = function (maxLines) {
        if (this.collapsed) {
            // unpack collapsed items 
            this.textbox.empty().append(this.items.join(this.options.separator));
        }

        this.collapsed = true;
        var currentLines = this.textbox.height() / this.lineHeight;
        if (currentLines <= maxLines) return;

        for (var i = 1; i <= this.items.length; i++) {
            var last = this.items.slice(this.items.length - i)[0];
            var text = this.textbox.text();

            this.textbox.text(text.substr(0, text.length - last.length)); // take out last item

            currentLines = this.textbox.height() / this.lineHeight;

            if (currentLines <= maxLines) {
                var placeholder = $('<span></span>').html(Vista.Utilities.format(this.options.placeholder, i));
                this.textbox.append(placeholder);
                var adjusted = this.textbox.height() / this.lineHeight;
                if (adjusted <= maxLines) {
                    this.hiddenItems = i;
                    break;
                }
            }

            this.textbox.text(text.substr(0, text.length - last.length - this.options.separator.length));
        }
    };

    Vista.Collapsible.prototype.collapse = function () {
        this._trim(this.options.collapsedHeight);
    };
})();
