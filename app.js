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

var budgetcontroller = (function() {

    var a = 25;

    var add = function(x) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            return add(b);
        }
    }

})();

var UIController = (function() {
    // do something
})();

var Controller = (function(bdgtCtrl, UICtrl) {

    var z = bdgtCtrl.publicTest(5);

    return {
        anotherPublicTest: function() {
            return z;
        }
    }

})(budgetcontroller, UIController);