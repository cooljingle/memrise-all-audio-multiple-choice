// ==UserScript==
// @name           Memrise All Audio Multiple Choice
// @namespace      https://github.com/cooljingle
// @description    Turns all tests into audio multiple choice
// @match          https://www.memrise.com/course/*/garden/*
// @match          https://www.memrise.com/garden/review/*
// @version        0.0.2
// @updateURL      https://github.com/cooljingle/memrise-all-audio-multiple-choice/raw/master/Memrise_All_Audio_Multiple_Choice.user.js
// @downloadURL    https://github.com/cooljingle/memrise-all-audio-multiple-choice/raw/master/Memrise_All_Audio_Multiple_Choice.user.js
// @grant          none
// ==/UserScript==

$(document).ready(function() {
    var testBoxTemplates = _.filter(Object.keys(MEMRISE.garden.box_mapping), key => MEMRISE.garden.box_mapping[key].prototype instanceof MEMRISE.garden.box_types.TestBox);
    MEMRISE.garden.boxes.load = (function() {
        var cached_function = MEMRISE.garden.boxes.load;
        return function() {
            enableAllAudioMultipleChoice();
            return cached_function.apply(this, arguments);
        };
    }());

    function enableAllAudioMultipleChoice() {
        MEMRISE.garden.session.box_factory.make = (function() {
            var cached_function = MEMRISE.garden.session.box_factory.make;
            return function() {
                var result = cached_function.apply(this, arguments);
                if(_.contains(testBoxTemplates, result.template)) {
                    result.template = "multiple_choice";
                    result.promptWith = "audio";
                }
                return result;
            };
        }());
    }
});
