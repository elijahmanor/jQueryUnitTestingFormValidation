
/// <reference path="../../Content/Scripts/ContactCreateModule.js" />

QUnit.specify.extendAssertions({
    isNotDisplayed: function(actual, expected, message) {
        ok(actual.is(":hidden") || actual.text().length == 0, message || "okay: isNotDisplayed");
    },
    isDisplayed: function (actual, expected, message) {
        ok(actual.is(":visible") || actual.text().length > 0, message || "okay: isDisplayed");
    }
});

QUnit.init({ moduleTestDelimeter: ", it " });
QUnit.specify.globalApi = true;
QUnit.specify("Contact", function () {

    describe("Create", function () {

        var contactWasPosted;

        before(function () {
            contactWasPosted = false;

            contactCreateModule.postContactBackup = contactCreateModule.postContact;
            contactCreateModule.postContact = function (callback) {
                contactWasPosted = true;
            };

            $("#createContact").click();
        });

        after(function () {
            contactCreateModule.postContact = contactCreateModule.postContact;
            contactCreateModule.createDialog.dialog('close');
        });

        describe("When the contact button is clicked", function () {
            it("should display the dialog", function () {
                assert($("#createDialog:visible").length).isEqualTo(1);
            });

            it("should not display name validation", function () {
                assert($("#Name_validationMessage:visible")).isNotDisplayed();
            });

            it("should not display email validation", function () {
                assert($("#Email_validationMessage:visible")).isNotDisplayed();
            });

            it("should not display PhoneNumber validation", function () {
                assert($("#PhoneNumber_validationMessage:visible")).isNotDisplayed();
            });

            it("should not display DateOfBirth validation", function () {
                assert($("#DateOfBirth_validationMessage:visible")).isNotDisplayed();
            });

            it("should not display IsMarried validation", function () {
                assert($("#IsMarried_validationMessage:visible")).isNotDisplayed();
            });
        });

        describe("When clicking save on an empty form", function () {
            before(function () {
                $(".ui-button-text:contains('Save')").parent().click();
            });

            it("should keep the dialog displayed", function () {
                assert($("#createDialog:visible").length).isEqualTo(1);
            });

            it("should display Name validation", function () {
                assert($("#Name_validationMessage:visible")).isDisplayed();
            });

            it("should display Email validation", function () {
                assert($("#Email_validationMessage:visible")).isDisplayed();
            });

            it("should display PhoneNumber validation", function () {
                assert($("#PhoneNumber_validationMessage:visible")).isDisplayed();
            });

            it("should display DateOfBirth validation", function () {
                assert($("#DateOfBirth_validationMessage:visible")).isDisplayed();
            });

            it("should display IsMarried validation", function () {
                assert($("#IsMarried_validationMessage:visible")).isDisplayed();
            });
        });

        describe("When clicking save on a completed form", function () {
            before(function () {
                $("#Name").val("xNamex");
                $("#Email").val("tasty@bacon.com");
                $("#PhoneNumber").val("xPhoneNumberx");
                $("#DateOfBirth").val("xDateOfBirthx");
                $("#IsMarried").attr("checked", true);

                $(".ui-button-text:contains('Save')").parent().click();
            });

            it("should not display name validation", function () {
                assert($("#Name_validationMessage:visible")).isNotDisplayed();
            });

            it("should not display email validation", function () {
                assert($("#Email_validationMessage:visible")).isNotDisplayed();
            });

            it("should not display PhoneNumber validation", function () {
                assert($("#PhoneNumber_validationMessage:visible")).isNotDisplayed();
            });

            it("should not display DateOfBirth validation", function () {
                assert($("#DateOfBirth_validationMessage:visible")).isNotDisplayed();
            });

            it("should not display IsMarried validation", function () {
                assert($("#IsMarried_validationMessage:visible")).isNotDisplayed();
            });

            it("should post contact", function () {
                assert(contactWasPosted).isTrue();
            });

            it("should close the dialog", function () {
                assert($("#createDialog:visible").length).isEqualTo(0);
            });
        });

    });

});
