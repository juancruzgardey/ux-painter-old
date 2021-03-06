function AddFormValidationRefactoring(json) {
    UsabilityRefactoringOnElement.call(this, json);
    if (json) {
        this.requiredInputXpaths = json.requiredInputXpaths;
    }

}

AddFormValidationRefactoring.prototype = new UsabilityRefactoringOnElement();
AddFormValidationRefactoring.prototype.constructor = AddFormValidationRefactoring;

AddFormValidationRefactoring.prototype.transform = function () {
    var formElement = $(this.getElement());
    var me = this;
    if (typeof(formElement[0]) != "undefined") {
        formElement.submit(function (e) {
            var invalidInputs = false;
            $.each(me.requiredInputXpaths, function (i, xpath) {
                var input = new XPathInterpreter().getSingleElementByXpath(xpath, document.body);
                if (!input || !$(input).val()) {
                    $(input).css("border-color", "rgb(255,0,0)");
                    invalidInputs = true;
                }
            });
            if (invalidInputs) {
                e.preventDefault();
                return false;
            }
            else {
                formElement[0].submit();
            }
        });

    }
};

AddFormValidationRefactoring.prototype.serialize = function () {
    var json = UsabilityRefactoringOnElement.prototype.serialize.call(this);
    json.requiredInputXpaths = this.requiredInputXpaths;
    return json;
}

AddFormValidationRefactoring.prototype.setRequiredInputs = function (requiredInputs) {
    this.requiredInputXpaths = requiredInputs;
}

AddFormValidationRefactoring.getName = function () {
    return "Add Form Validation";
}

AddFormValidationRefactoring.getView = function () {
    return AddFormValidationView;
}

AddFormValidationRefactoring.targetElements = function () {
    return "form";
}
