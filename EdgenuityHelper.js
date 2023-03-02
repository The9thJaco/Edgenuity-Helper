//testing

// ==UserScript==
// @name         Edgenuity Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  an automatic next clicker
// @author       9th jaco
// @match        *://*.core.learn.edgenuity.com/*
// @match        https://brainly.com/question/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=edgenuity.com
// @grant        none
// ==/UserScript==

var skip_speaking_intros = true;
// Default = true (If problems occur, try turning this off by replacing true with false)
// Description: This will allow the user to check boxes, complete assignments, or skip instructions as the speaker is talking as in the intro buttons.  If problems are occuring, try turning this off
// Bugs:
//
// May cause "Unable to load video file." error (You can change skip_speaking_intros if this problem occurs).  The program as of right now will just turn off the display of the error message that pops up.  I will look into fixing it

var is_auto_clicking = true;
// Default = true (If problems occur, try turning this off by replacing true with false)
// Description: This will automatically click the next button
// Bugs:
//
// Untested if left at false
// MAJOR: After Direct Instructions, it will get stuck in a loop at going to the next assignment.  This must be fixed!

var autodefi = true;
// Default = true (If problems occur, try turning this off by replacing true with false)
// Description: This will fill out textboxes for Vocabulary automatically using a method found by /u/Turtlemower.  The code for this part of the script was created by /u/Mrynot88 and has been greatly appreciated.
// Bugs:
//
// Currently, there are no bugs reported!

var prevent_inactive = true;
// Default = true (If problems occur, try turning this off by replacing true with false)
// Description: This will prevent inactivity emails and automatic logoff.  The code for this part of the script was created by XANADryden.
// Bugs:
//
// Doesn't yet work, TODO: Change element

var question_search = true;

var lookForQuestion = true;

var e;

function triggerEvent(el, type) {
    if ('createEvent' in document) {
        // modern browsers, IE9+
        e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE 8
        e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on'+e.eventType, e);
    }
}
let input = document.createElement("input");
input.id = "InsertQuestion";
input.placeholder = "Put Question Here";

let btn = document.createElement("button");

btn.id = "SearchUpQuestion";
btn.style.color = "#FFFFFF";
btn.style.border = "2px solid #D3D3D3";
btn.style.borderRadius = "32px";
btn.style.cursor = "pointer";
btn.style.marginRight = "4px";
btn.textContent = "Search Up Answer";
btn.style.backgroundColor = "#0A6522";

function ButtonColor(color)
{
    btn.style.backgroundColor = color;
}

function RespondClick()
{
    ButtonColor("#00FF00")
    var url = "https://www.bing.com/search?q=" + input.value;
    //search?q=site:brainly.com+
    //"https://brainly.com/app/ask?q=" + input.value;
    window.open(url, '_blank');
    document.getElementById("SearchQuestion").reset();
}
function RespondOver()
{
    ButtonColor("#FF0000")
}
function RespondOut()
{
    ButtonColor("#0A6522")
}

(function() {
    'use strict';
    /*
----- Developer Info -----
Built on top of the "edgenuity next clicker" which can be found at https://greasyfork.org/en/scripts/19842-edgenuity-next-clicker, and https://greasyfork.org/en/scripts/395567-edgenuity-master-controller-v0-3/code
This is open and is available for the public as long as it is not sold in any way or form, even if modified.
Any questions or any contact about the original program can be sent to joseph.tortorelli5@gmail.com or you can contact them on reddit with the username /u/hemlck
Any bugs or issues should go to https://github.com/XANADryden/Edgenuity-Master-Controller/issues
Any questions or any contact about the current version should go to dryden@bonnerclan.com
--- Program Info ---
variable "pageload" is set to an interval every 1 second (1000ms)
variable "current_frame" will only get the current frame if it has been completed.  It will not actually get the current frame.
variable "nextactivity" and "nextactivity_disabled" are for the next button on the bottom of the screen.  It will not only turn to the next acitivty, but also the next lesson if its after a quiz.
variable "alreadyPlayedCheck" is specific to the code for the auto-completion of the vocab.
variable "no_inactive" is set to an interval every 10 seconds (10000ms)
variable current_page is unused as of right now because of a bug
*/
    var pageload, nextclicker, nextslide_button, nextactivity, iFramePreview, nextactivity_disabled, no_inactive, content, Practice_Question_Body, rightcolumn;
    var current_frame;
    var current_frame_id;
    var alreadyPlayedCheck;
    var current_page;
    function loadpage() {
        if(question_search)
        {
            let SearchQuestionDiv = document.createElement("div");
            SearchQuestionDiv.id = "SearchQuestion";
            SearchQuestionDiv.setAttribute("data-bind", "style: { width: !$root.stageView().useLargePlayer() ? $root.stageView().width : '' }, with: $root.stageView");
            SearchQuestionDiv.style = "width: 854px;";
            SearchQuestionDiv.style.padding = "10px 250px";
            var lessonInfo = document.getElementById("lesson-title");
            const infoElemSelector = "div#lessonInfo";

            btn.addEventListener("click", RespondClick);
            input.addEventListener('submit',RespondClick);
            btn.addEventListener("mouseover", RespondOver);
            btn.addEventListener("mouseout", RespondOut);

            SearchQuestionDiv.appendChild(input);
            SearchQuestionDiv.appendChild(btn);
            if(lessonInfo)
            {
                let infoElem = document.querySelector(infoElemSelector);
                infoElem.parentElement.insertBefore(SearchQuestionDiv, infoElem.nextSibling);
            }
        }
        if(skip_speaking_intros){
            var invis = document.getElementById("invis-o-div");
            var error_message_delete = document.getElementById("uid1_errorMessage");
            if(invis){
                invis.parentElement.removeChild(invis);
            }
            if(error_message_delete){
                error_message_delete.parentElement.removeChild(error_message_delete);
            }
        }
        if(is_auto_clicking){
            pageload = setInterval(function() {
                current_page = document.getElementById("activity-title");
                nextactivity = document.getElementsByClassName("footnav goRight")[0];
                nextactivity_disabled = document.getElementsByClassName("footnav goRight disabled")[0];
                if (nextactivity && !nextactivity_disabled) {
                    nextactivity.click();
                    clearInterval(pageload);
                    if (prevent_inactive) {
                        clearInterval(no_inactive);
                    }
                    setTimeout(loadpage, 1000);
                }
                document.querySelector('iframe').contentWindow.API.E2020.freeMovement = true
                current_frame = document.getElementsByClassName("FrameCurrent FrameComplete")[0];
                //if(current_frame){
                //current_frame_id = current_frame.id;
                //}
                nextslide_button = document.getElementsByClassName("FrameRight")[0];
                if (nextslide_button && current_frame) {
                    nextclicker = setInterval(function() {
                        nextslide_button.click();
                        setTimeout(function () {
                            //var invis = document.getElementById("invis-o-div");
                            //if (invis) {
                            //invis.setAttribute("style", "display: none;");
                            //}
                        }, 500);
                    }, 500);
                    clearInterval(pageload);
                    if (prevent_inactive) {
                        clearInterval(no_inactive);
                    }
                }
            }, 1000);
        }
        //if(current_page.innerhtml == "Vocabulary"){
        if (autodefi){ // This is for the auto-completition of the vocab
            setInterval(function () {
                var normalTextBox = document.getElementsByClassName("word-textbox word-normal")[0];
                var correctTextBox = document.getElementsByClassName("word-textbox word-correct")[0];
                var normalTextButton = document.getElementsByClassName("plainbtn alt blue selected")[0];
                var firstDefButton = document.getElementsByClassName("playbutton vocab-play")[0];
                var nextButton = document.getElementsByClassName("uibtn uibtn-blue uibtn-arrow-next")[0];
                if(normalTextBox && !correctTextBox){
                    normalTextBox.value = normalTextButton.innerHTML;
                    alreadyPlayedCheck = false;
                    triggerEvent(normalTextBox, "keyup");
                }
                if(correctTextBox && !alreadyPlayedCheck){
                    firstDefButton.click();
                    alreadyPlayedCheck = true;
                }
                if(nextButton && correctTextBox){
                    nextButton.click();
                }
            },2000);
        }
        if (prevent_inactive) {
            no_inactive = setInterval(function () {
                document.body.click();
                //nextactivity_disabled = document.getElementsByClassName("footnav goRight disabled")[0];
            },10000);
        }
        //}
    }
    loadpage();
})();
