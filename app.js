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
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    return {
        addItem: function(type, desc, val) {
            var newItem, id;

            // id = last id element + 1, only when the lenght > 0 else set 0
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            // add to income OR expense based on the type of selection
            if (type === "inc") {
                newItem = new Income(id, desc, val);
            } else
            if (type === "exp") {
                newItem = new Expense(id, desc, val);
            }

            // add item to the last element of the array
            data.allItems[type].push(newItem);
            // return the new item added
            return newItem;
        },
        test: function() {
            console.log(data);
        }
    }
})();

// UI Controller
var UIController = (function() {

    var DOMStrings = {
        typeString: '.add__type',
        descString: '.add__description',
        valueString: '.add__value',
        addBtnString: '.add__btn'
    };

    return {
        getInputData: function() {
            return {
                type: document.querySelector(DOMStrings.typeString).value,
                description: document.querySelector(DOMStrings.descString).value,
                value: document.querySelector(DOMStrings.valueString).value
            }
        },
        getDOMStrings: function(a) {
            return DOMStrings;
        }
    }
})();

// Global App Controller
var Controller = (function(bdgtCtrl, UICtrl) {

    //add event listeners for click and key press event
    var setEventListeners = function() {
        var DOMStrings = UICtrl.getDOMStrings();
        // Click Event on click of submit button
        document.querySelector(DOMStrings.addBtnString).addEventListener('click', itemAddCtrl);

        // Click Event on Key Press "Enter"
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13) {
                itemAddCtrl();
            }
        });
    }

    var itemAddCtrl = function() {
        // 1. Get the input data
        var inputData = UICtrl.getInputData();

        // 2. Add the item to the budget contoller
        var newItem = bdgtCtrl.addItem(inputData.type, inputData.description, inputData.value);
        console.log(newItem);

        // 3. Add the item to the UI

        // 4. Calculate the Budget

        // 5. Display the budget

    };

    return {
        init: function() {
            setEventListeners();
        }
    }

})(budgetcontroller, UIController);

//init method on load
Controller.init();