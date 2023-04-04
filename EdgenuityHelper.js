// ==UserScript==
// @name         Edgenuity Helper
// @namespace    http://https://github.com/The9thJaco
// @version      0.1
// @description  an automatic next clicker
// @author       9th jaco
// @match        *://*.core.learn.edgenuity.com/*
// @match        https://brainly.com/question/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=edgenuity.com
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var skip_speaking_intros = true;
var is_auto_clicking = true;
var autodefi = true;
var prevent_inactive = true;
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
let inputSearchUpQuestion = document.createElement("input");
inputSearchUpQuestion.id = "InsertQuestion";
inputSearchUpQuestion.placeholder = "Put Question Here";

let txtQuesAsked = document.createElement("h2")
let txtAnswer = document.createElement("text")

let btnSearchUpQuestion = document.createElement("button");
btnSearchUpQuestion.id = "SearchUpQuestion";
btnSearchUpQuestion.style.color = "#FFFFFF";
btnSearchUpQuestion.style.border = "2px solid #D3D3D3";
btnSearchUpQuestion.style.borderRadius = "32px";
btnSearchUpQuestion.style.cursor = "pointer";
btnSearchUpQuestion.style.marginRight = "4px";
btnSearchUpQuestion.textContent = "Search Up Answer";
btnSearchUpQuestion.style.backgroundColor = "#0A6522";

var TheQuestion

function ButtonColor(color)
{
    btnSearchUpQuestion.style.backgroundColor = color;
}

function RespondClick()
{
    ButtonColor("#00FF00")
    var url = "https://www.bing.com/search?q=" + inputSearchUpQuestion.value;
    txtQuesAsked.innerHTML = "Asked: " + inputSearchUpQuestion.value;
    //txtAnswer.innerHTML = "Answer: " + inputSearchUpQuestion.value;
    //search?q=site:brainly.com+
    //"https://brainly.com/app/ask?q=" + input.value;
    window.open(url, '_blank');
    document.getElementById("SearchQuestion").reset();
}
function RespondClick2()
{
    var url = "https://www.bing.com/search?q=" + inputSearchUpQuestion.value;
    txtQuesAsked.innerHTML = "Asked: " + inputSearchUpQuestion.value;
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

function test()
{
    var TheQuestion = document.getElementsByClassName("Practice_Question_Body")[0];
    //TheQuestion.setAttribute("id", "Practice_Question_Body_TheQuestion");

    var AnswerChoices = document.getElementsByClassName("Practice_Question_Body")[1];
    //AnswerChoices.setAttribute("id", "Practice_Question_Body_AnswerChoices");

    let txtAnswerTitle = document.createElement("h1")
    txtAnswerTitle.id = "txtAnswerTitle";
    txtAnswerTitle.innerHTML = "The Answer in down Below in Blue";
    txtAnswerTitle.style.cssText = "font-size: 40px; color: #FDEFBF;";
    txtAnswerTitle.style.left = "150px";
    txtAnswerTitle.style.position = 'absolute';

    txtQuesAsked.id = "txtQuesAsked";
    txtQuesAsked.style.cssText = "font-size: 15px; color: #FF0000;";
    txtQuesAsked.style.left = "150px";
    txtQuesAsked.style.top = "225px";
    txtQuesAsked.style.position = 'absolute';

    txtAnswer.id = "txtAnswer";
    txtAnswer.innerHTML = "The answer will be put here";
    txtAnswer.style.cssText = "font-size: 20px; color: #0052FF;";

    let AnswerMainDiv = document.createElement("div");
    AnswerMainDiv.id = "AnswerMainDiv";
    AnswerMainDiv.setAttribute("data-bind", "style: { width: !$root.stageView().useLargePlayer() ? $root.stageView().width : '' }, with: $root.stageView");
    AnswerMainDiv.style = "width: 854px;";
    AnswerMainDiv.style.padding = "10px 475px";
    AnswerMainDiv.style.margin = "0 auto"

    let AnswerBoxDiv = document.createElement("div");
    AnswerBoxDiv.id = "AnswerBoxDiv";
    AnswerBoxDiv.setAttribute("data-bind", "style: { width: !$root.stageView().useLargePlayer() ? $root.stageView().width : '' }, with: $root.stageView");
    AnswerBoxDiv.style = "width: 500px;";
    AnswerBoxDiv.style.padding = "75px 15px";
    AnswerBoxDiv.style.margin = "0 auto"

    var lessonInfo = document.getElementById("lesson-title");

    const infoElemSelector = "div#lessonInfo";

    //AnswerMainDiv.appendChild(inputAnswerQuestion);
    AnswerMainDiv.appendChild(txtAnswerTitle);
    AnswerMainDiv.appendChild(txtQuesAsked);

    AnswerMainDiv.appendChild(AnswerBoxDiv);
    AnswerBoxDiv.appendChild(txtAnswer)

    if(TheQuestion)
    {
    }
    if(lessonInfo)
    {
        let infoElem = document.querySelector(infoElemSelector);
        infoElem.parentElement.insertBefore(AnswerMainDiv, infoElem.nextSibling);
    }
}

function brainly()
{
    localStorage.clear()
    window.onload = function () {
        document.getElementsByClassName("brn-expanded-bottom-banner")[0].remove()
        document.getElementsByClassName("brn-brainly-plus-box")[0].remove()
        document.getElementsByClassName("brn-fullscreen-toplayer")[0].remove()
        document.getElementsByClassName("sg-overlay sg-overlay--dark")[0].remove()
    }
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
            //test();
            let SearchQuestionDiv = document.createElement("div");
            SearchQuestionDiv.id = "SearchQuestion";
            SearchQuestionDiv.setAttribute("data-bind", "style: { width: !$root.stageView().useLargePlayer() ? $root.stageView().width : '' }, with: $root.stageView");
            SearchQuestionDiv.style = "width: 854px;";
            SearchQuestionDiv.style.padding = "10px 250px";
            var lessonInfo = document.getElementById("lesson-title");
            const infoElemSelector = "div#lessonInfo";

            btnSearchUpQuestion.addEventListener("click", RespondClick);
            inputSearchUpQuestion.addEventListener('keypress', function (e) {if (e.key === 'Enter') {RespondClick2();}});
            btnSearchUpQuestion.addEventListener("mouseover", RespondOver);
            btnSearchUpQuestion.addEventListener("mouseout", RespondOut);

            SearchQuestionDiv.appendChild(inputSearchUpQuestion);
            SearchQuestionDiv.appendChild(btnSearchUpQuestion);
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
                var PracticeQuestion = document.getElementsByClassName("Practice_Question_Body")[0];
                if (nextactivity && !nextactivity_disabled) {
                    nextactivity.click();
                    clearInterval(pageload);
                    if (prevent_inactive) {
                        clearInterval(no_inactive);
                    }
                    setTimeout(loadpage, 1000);
                }
                if(nextactivity_disabled)
                {
                    txtQuesAsked.innerHTML = (function() {
                        if (PracticeQuestion){
                            TheQuestion = PracticeQuestion;
                            "Asked: " + TheQuestion.nextSibling.innerHTML;
                        }

                    })
                }
                //document.querySelector('iframe').contentWindow.API.E2020.freeMovement = true
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
    switch(document.URL){
        case 'https://r22.core.learn.edgenuity.com/Player/':
            loadpage();
            break;
        case 'https://brainly.com/question/' + document.URL.replace( /^\D+/g, ''):
            brainly();
            break;
        default:
            loadpage();
    }
})();
