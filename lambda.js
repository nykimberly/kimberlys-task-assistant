(function () {
    'use strict';

    var Alexa = require("alexa-sdk");

    var list = [
      "go grocery shopping",
      "clean old apartment",
      "complete checkpoint 5",
      "get some sleep",
      "this is the end of your to do list"
    ];

    var LIST_LENGTH = list.length;

    var handlers = {

        "LaunchRequest": function () {
            this.attributes.currentIndex = 0;
            this.response
                .speak("Welcome to kimberly's to do list. Do you want to view or update kimberly's to do list?").listen("Would you like to create item on to do list, view to do list, or update the to do list?");
            this.emit(":responseReady");
        },

        "MenuIntent": function () {
            this.attributes.currentIndex = 0;
            this.response
                .speak("Do you want to view or update kimberly's to do list?").listen("Would you like to create item on to do list, view to do list, or update the to do list?");
            this.emit(":responseReady");
        },

        "CreatePromptIntent": function () {
          this.response
              .speak("Okay, what would you like to add?").listen("What would you like to add to your to do list?");
          this.emit(":responseReady");
        },

        "CreateActionIntent": function () {
          // var actionItem = this.event.request.intent.slots.item.value.toString().toLowerCase();
          // backlog.push(actionItem);
          this.response
              .speak("Added! What else would you like to add? Say menu to return to the main menu.").listen("Your item has been added. Say menu to return to the main menu.");
          this.emit(":responseReady");
        },

        "ViewIntent": function () {
            // var allItems = [];
            // for (var i = 0; i < LIST_LENGTH; i += 1) {
            //     allItems.push(list[this.attributes.i].toUpperCase());
            // }
            // this.response.speak(allItems.toString());
            this.response
                .speak("OK. I will recite your list.").listen("I will recite your list to you.");
            this.emit(":responseReady");
        },

        "UpdateIntent": function () {
            var currentItem = list[this.attributes.currentIndex].toUpperCase();
            this.response
                .speak("Okay, I will remind you of your to do items one by one. You have " + LIST_LENGTH + " items. After each, please respond with completed, remove, or next to hear the next item. " +  currentItem)
                .listen(currentItem);
            this.emit(":responseReady");
        },

        "IndexIntent": function () {
          this.attributes.currentIndex += 1;
          var nextItem = list[this.attributes.currentIndex].toUpperCase();
          this.response
              .speak("You'll need to complete that at some point in your life. Here is your next to do item: " + nextItem)
              .listen(nextItem);
          this.emit(":responseReady");
        },

        "DestroyIntent": function () {
          // list.splice(currentIndex, 1);
          this.attributes.currentIndex += 1;
          var nextItem = list[this.attributes.currentIndex].toUpperCase();
          this.response
              .speak("Item removed. Here is your next to do item: " + nextItem)
              .listen(nextItem);
          this.emit(":responseReady");
        },

        "AMAZON.StopIntent": function () {
            this.response.speak("Exiting kimberly's to do list.");
            this.emit(":responseReady");
        },

        "AMAZON.CancelIntent": function () {
            this.response.speak("Exiting kimberly's to do list.");
            this.emit(":responseReady");
        }
    };

    exports.handler = function (event, context, callback) {
        var alexa = Alexa.handler(event, context);
        alexa.registerHandlers(handlers);
        alexa.execute();
    };
}());