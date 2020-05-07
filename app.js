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
        this.percentage = -1;
    };

    // Calculate the percentage for each expense
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    // Return the percentage of expense
    Expense.prototype.getPercent = function() {
        return this.percentage;
    };

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
        // Delete Item from data 
        deleteItem: function(type, deleteID) {
            // The map() method creates a new array with the results of calling a function for every array element.
            var ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            var index = ids.indexOf(deleteID);
            if (index !== -1) {
                // The Array.splice() method is an inbuilt method in JavaScript which is used to modify the contents 
                // of an array by removing the existing elements and/or by adding new elements.
                data.allItems[type].splice(index, 1);
            }
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
        // invoke the method calPercentage() for each item in the expense array to calculate percentage
        caluclatePercentage: function() {
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },
        getPercentage: function() {
            var percentages = data.allItems.exp.map(function(current) {
                return current.getPercent();
            });
            return percentages;
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
        container: '.container',
        itemPercentage: '.item__percentage'
    };

    // format the number with decimal and ',' to seperate thousands
    var formatNumber = function(num, type) {
        var numArr, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);
        numArr = num.split('.');

        int = numArr[0];
        dec = numArr[1];

        if (int.length > 3) {
            // format ',' to seperate thousands
            int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, int.length);
        }
        return (type === 'exp' ? "-" : "+") + '' + int + "." + dec;
    };

    return {
        getInputData: function() {
            return {
                type: document.querySelector(DOMStrings.typeString).value,
                description: document.querySelector(DOMStrings.descString).value,
                value: parseFloat(document.querySelector(DOMStrings.valueString).value)
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // Remove the DOM element from inc or exp
        deleteListItems: function(deleteID) {
            var el = document.getElementById(deleteID);
            el.parentNode.removeChild(el);
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

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.incLabel).textContent = formatNumber(obj.totInc, 'inc');
            document.querySelector(DOMStrings.expLabel).textContent = formatNumber(obj.totExp, 'exp');
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = "--";
            }
        },

        // Display Percentage on each items on expense
        displayExpItemsPercentage: function(percentages) {

            var fields = document.querySelectorAll(DOMStrings.itemPercentage);

            var fieldListForEach = function(list, callback) {
                for (let index = 0; index < list.length; index++) {
                    callback(list[index], index);
                }
            };

            fieldListForEach(fields, function(current, index) {

                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + "%";
                } else {
                    current.textContent = "--%";
                }
            });
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
        var itemId, splitId, type, ID;

        //select the ID of top parent element to egt deleted
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            // split the type and ID
            splitId = itemId.split("-");
            type = splitId[0];
            ID = parseInt(splitId[1]);

            // 1.Delete the Item from Data Structure
            bdgtCtrl.deleteItem(type, ID)

            // 2.Delete the Item from UI
            UICtrl.deleteListItems(itemId);

            // 3.Update the Budget and display it in the UI
            updateBudget();

            // 4. update the percentage and display it in the UI
            updatePercentage();
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

            // 4. Clear Fields
            UICtrl.clearFields();

            // 5. update budget
            updateBudget();

            // 6. update the percentage and display it in the UI
            updatePercentage();
        }
    };

    var updateBudget = function() {

        // 4. Calculate the Budget
        bdgtCtrl.calculateBudget();

        // Get Budget values
        var budgetData = bdgtCtrl.getBudgetData();

        // 5. Display the budget
        UICtrl.displayBudgetFields(budgetData);

    };

    var updatePercentage = function() {
        // 1. Calculate the percentage
        bdgtCtrl.caluclatePercentage();

        // 2. Get percentage
        var percentages = bdgtCtrl.getPercentage();

        // 3. Display the percentage in the UI
        UICtrl.displayExpItemsPercentage(percentages);
    };

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