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
        },
        budget: 0,
        percentage: -1
    }
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
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
        calculateBudget: function() {
            // Calculate Total
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate Budget
            data.budget = data.totals.inc - data.totals.exp;

            // calculate Percentage of Spending
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },
        getBudgetData: function() {
            return {
                budget: data.budget,
                percentage: data.percentage,
                totInc: data.totals.inc,
                totExp: data.totals.exp
            }
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
        addBtnString: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        incLabel: '.budget__income--value',
        expLabel: '.budget__expenses--value',
        budgetLabel: '.budget__value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    return {
        getInputData: function() {
            return {
                type: document.querySelector(DOMStrings.typeString).value,
                description: document.querySelector(DOMStrings.descString).value,
                value: parseInt(document.querySelector(DOMStrings.valueString).value)
            }
        },
        addListItems: function(obj, type) {
            var html, newHtml;

            // Create HTML String with placeholder text
            if (type === "inc") {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "exp") {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // clear fields on click of add button or on keypress "enter"
        clearFields: function() {
            var fields = document.querySelectorAll(DOMStrings.descString + ", " + DOMStrings.valueString)
            var fieldArr = Array.prototype.slice.call(fields);

            fieldArr.forEach(function(current, index, array) {
                current.value = '';
            });
            fieldArr[0].focus();
        },

        // Display Budget labels including income, expense, budget and Percentage
        displayBudgetFields: function(obj) {
            document.querySelector(DOMStrings.incLabel).textContent = obj.totInc;
            document.querySelector(DOMStrings.expLabel).textContent = obj.totExp;
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = "--";
            }
        },

        //returm DOM Strings to use in other functions
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

        document.querySelector(DOMStrings.container).addEventListener('click', itemDeleteCtrl);
    }

    // Delete the selected row of income or expense
    var itemDeleteCtrl = function(event) {
        var itemId;

        //select the ID of top parent element to egt deleted
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            // split the type and ID
            splitId = itemId.split("-");
            type = splitId[0];
            ID = splitID[1];

            // 1.Delete the Item from Data Structure

            // 2.Delete the Item from UI

            // 3.Update the Budget and display it in the UI
        }
    }

    var itemAddCtrl = function() {
        // 1. Get the input data
        var inputData = UICtrl.getInputData();

        // Validate description and value
        if (inputData.description !== "" && !isNaN(inputData.value) && inputData.value > 0) {
            // 2. Add the item to the budget contoller
            var newItem = bdgtCtrl.addItem(inputData.type, inputData.description, inputData.value);

            // 3. Add the item to the UI
            UICtrl.addListItems(newItem, inputData.type);

            // Clear Fields
            UICtrl.clearFields();

            // update budget
            updateBudget();
        }
    };

    var updateBudget = function() {

        // 4. Calculate the Budget
        bdgtCtrl.calculateBudget();

        // Get Budget values
        var budgetData = bdgtCtrl.getBudgetData();

        // 5. Display the budget
        UICtrl.displayBudgetFields(budgetData);

    }

    return {
        init: function() {
            setEventListeners();
            UICtrl.displayBudgetFields({
                budget: 0,
                percentage: -1,
                totInc: 0,
                totExp: 0
            });
        }
    }

})(budgetcontroller, UIController);

//init method on load
Controller.init();