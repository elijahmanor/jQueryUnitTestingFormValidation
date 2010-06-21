var contactWasPosted = false;
module("Contact: Create", {
    setup: function () {
        contactWasPosted = false;

        contactCreateModule.postContactBackup = contactCreateModule.postContact;
        contactCreateModule.postContact = function (callback) {
            contactWasPosted = true;
        };
    },
    teardown: function () {
        contactCreateModule.postContact = contactCreateModule.postContact;
        contactCreateModule.createDialog.dialog('close');
    }
});

test("When New Contact Button Clicked", function () {
    //Arrange

    //Act
    $("#createContact").click();

    //Assert
    ok($("#createDialog:visible").length, "Dialog Should Display");
    ok($("#Name_validationMessage:not(:visible)").length, "Name Validation Should Not Display");
    ok($("#Email_validationMessage:not(:visible)").length, "Email Validation Should Not Display");
    ok($("#PhoneNumber_validationMessage:not(:visible)").length, "PhoneNumber Validation Should Not Display");
    ok($("#DateOfBirth_validationMessage:not(:visible)").length, "DateOfBirth Validation Should Not Display");
    ok($("#IsMarried_validationMessage:not(:visible)").length, "IsMarried Validation Should Not Display");
});

test("When Click Save On an Empty Form", function () {
    //Arrange
    $("#createContact").click();

    //Act
    $(".ui-button-text:contains('Save')").parent().click();

    //Assert
    ok($("#Name_validationMessage:visible").length, "Name Validation Should Display");
    ok($("#Email_validationMessage:visible").length, "Email Validation Should Display");
    ok($("#PhoneNumber_validationMessage:visible").length, "PhoneNumber Validation Should Display");
    ok($("#DateOfBirth_validationMessage:visible").length, "DateOfBirth Validation Should Display");
    ok($("#IsMarried_validationMessage:visible").length, "IsMarried Validation Should Display");
    ok($("#createDialog:visible").length, "Dialog Should Remain Displayed");
});

test("When Click Save On an Complete Form", function () {
    //Arrange
    $("#createContact").click();

    $("#Name").val("xNamex");
    $("#Email").val("tasty@bacon.com");
    $("#PhoneNumber").val("xPhoneNumberx");
    $("#DateOfBirth").val("xDateOfBirthx");
    $("#IsMarried").attr("checked", true);

    //Act
    $(".ui-button-text:contains('Save')").parent().click();

    //Assert
    ok($("#Name_validationMessage:not(:visible)").length, "Name Validation Should Not Display");
    ok($("#Email_validationMessage:not(:visible)").length, "Email Validation Should Not Display");
    ok($("#PhoneNumber_validationMessage:not(:visible)").length, "PhoneNumber Validation Should Not Display");
    ok($("#DateOfBirth_validationMessage:not(:visible)").length, "DateOfBirth Validation Should Not Display");
    ok($("#IsMarried_validationMessage:not(:visible)").length, "IsMarried Validation Should Not Display");
    ok(contactWasPosted, "Contact Should Post");
    ok($("#createDialog:not(:visible)").length, "Dialog Should Be Closed");
});