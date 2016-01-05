// ==UserScript==
// @name         Godville UI tricks
// @namespace    https://github.com/DmitryKuzmenko/gv
// @version      0.3
// @description  Add wide resizeable mode to UI (3 columns)
// @author       Dmitry Kuzmenko <dmitry.a.kuzmenko@gmail.com>
// @match        http://godville.net/superhero
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var WS = 0;
var WC = 0;
var WW = 0;

function doReLay(){  
    if ($(document.body).width() <= WW) {
        $("#main_wrapper").width(WW);
    } else {
        $("#main_wrapper").css("width", "100%");
    }

    var w_total = $("#hero_block").width() - 15;
    var w_left = WS;
    var w_cntr = WC;
    var w_right = WS;
    
    if (w_total > WC * 3) {
        w_left = w_cntr = w_right = w_total / 3;
    } else {
        var w_free = w_total - w_left - w_cntr - w_right;
        if (w_free >= 1) {
            w_right = Math.min(w_cntr, w_right + w_free);
            w_free = w_total - w_left - w_cntr - w_right;
            if (w_free >= 1) {
                w_left = Math.min(w_cntr, w_left + w_free);
            }
        }
    }

    $("#left_block").outerWidth(w_left);
    $("#central_block").outerWidth(w_cntr);
    $("#right_block").outerWidth(w_right);
};

function initReLay() {
    if (WS == 0) {
        WS = $("#left_block").outerWidth(true);
        WC = $("#central_block").outerWidth(true);
        WW = $("#main_wrapper").width();
    }
    doReLay();
};

$(document).ready(initReLay);
$(window).resize(doReLay);
