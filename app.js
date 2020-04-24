// To-Do List

// Controller Module
// Add Event Handler - on click "OK"

// UI Module
// Get input values (Description and Value)
// Add new item to UI
// Update the UI

// Data Module
// Add new input values in to data structure
// Calculate Budget

// Budget Controller
var budgetcontroller = (function() {
    // Do something
})();

// UI Controller
var UIController = (function() {
    // do something
})();

// Global App Controller
var Controller = (function(bdgtCtrl, UICtrl) {

    var itemAddCtrl = function() {
        // 1. Get the input data

        // 2. Add the item to the budget contoller

        // 3. Add the item to the UI

        // 4. Calculate the Budget

        // 5. Display the budget
        console.log(">> Exit itemAddCtrl()");
    };

    // Click Event on click of submit button
    document.querySelector(".add__btn").addEventListener('click', itemAddCtrl);

    // Click Event on Key Press "Enter"
    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            itemAddCtrl();
        }
    });

})(budgetcontroller, UIController);