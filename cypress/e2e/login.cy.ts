describe("Login form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1337");
  });

  context("First Form Input", () => {
    it("allows users to input the email", () => {
      cy.getByData("email-input").should("be.visible").type("tom@aol.com");
      cy.getByData("password-input").should("be.visible").type("root");
      cy.getByData("submit-button")
        .click()
        .wait(1000)
        .getByClass("ant-notification-notice-message")
        .should("exist");
      // .getByData("success-message")
      // .should("exist")
      // .contains("tom@aol.com");
    });

    // it("does NOT allow an invalid email address", () => {
    //   cy.getByData("email-input").should("be.visible").type("tom");
    //   cy.getByData("password-input").should("be.visible").type("root");
    //   cy.getByData("submit-button")
    //     .click()
    //     .wait(1000)
    //     .getByClass("ant-form-item-explain-error")
    //     .should("exist")
    //     .contains("'email' is not a valid email");
    // });
    //
    // it("does NOT allow empty email input", () => {
    //   cy.getByData("email-input").should("be.visible").type("abc");
    //   cy.getByData("submit-button").click();
    //   cy.getByData("email-input").clear();
    //   cy.getByData("submit-button").click();
    //   cy.getByClass("ant-form-item-explain-error")
    //     .should("exist")
    //     .contains("Please enter an Email");
    // });
    // it("does NOT allow empty password input", () => {
    //   cy.getByData("password-input").should("be.visible").type("abc");
    //   cy.getByData("submit-button").click();
    //   cy.getByClass("ant-form-item-explain-error")
    //     .should("exist")
    //     .contains("Please enter password");
    //   cy.getByData("password-input").clear().contains("");
    //   // cy.window().then(($window) => {
    //   //   expect($window.scrollY).not.to.be.equal(0);
    //   // });
    // });
  });
});
