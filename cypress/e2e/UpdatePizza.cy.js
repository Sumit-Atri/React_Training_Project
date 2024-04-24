describe("Pizza Record Update", () => {
    it("should allow for the edit of records", () => {
        const id = "6"; // replace with actual ID of the pizza record

        // Visit the update page for the pizza record
        cy.visit(`http://localhost:5173/update-pizza/${id}`);

        // // Check if the form is prefilled
        //
         cy.get('.form-control').should('have.prop', 'value').should('not.be.empty')
        //cy.get('.field [type="checkbox"]').should('be.checked');
        cy.get('.field [type="radio"]').should("be.checked");
        cy.get('.css-art2ul-ValueContainer2').should('not.be.empty')




        // Verify that the form elements are present and interact with them
        cy.get(".form-control").clear().type("Cheese Updateddd"); // Update pizza name
        cy.get('.field [type="checkbox"]').check("onions"); // Check onions checkbox
        cy.get('.field [type="radio"]').check("Yes"); // Select radio button with value "Yes"
        cy.get('.css-art2ul-ValueContainer2').click().type('Yes{enter}'); // Select first option from dropdown

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the update to be processed, then assert the update in the main record table
        cy.wait(2000); // Adjust time as per your application's update processing time
        cy.visit("http://localhost:5173/"); // Replace with the URL of your main record table
        cy.contains(id); // Assert that the updates pizza id appears in the table
    });
});
