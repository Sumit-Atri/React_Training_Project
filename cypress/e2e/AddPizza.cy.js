describe('Add Pizza', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/add-pizza') // change URL to match your dev URL
  })

  it('Form test', () => {

    cy.intercept('POST', 'http://localhost:3000/pizzas').as('submitPizza');

    let pizzaname = "Peperoni Added"

    

    cy.get(".form-control").type(pizzaname)
    cy.get('.field [type="checkbox"]').check("onions");
    cy.get('.field [type="radio"]').check("Yes");
    cy.get('.css-art2ul-ValueContainer2').type('Yes{enter}');// click on first option

    cy.get('button[type="submit"]').click();
    cy.wait('@submitPizza').then((interception) => {
    // Assert that the POST request was successful
    expect(interception.response.statusCode).to.equal(201);
    // Optionally, you can also assert on the response body or other properties of the response
    // expect(interception.response.body).to.deep.equal({ success: true }); // Example assertion on response body
  });

    cy.visit("http://localhost:5173/"); // Replace with the URL of your main record table
    cy.contains(pizzaname);


  });




});