
describe('Pizza App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/') // change URL to match your dev URL
  })
  
  it('should display table with pizzas', () => {
    cy.get('.container').should('exist');

    //cy.get('.container table tbody tr').should('have.length.gt', 0);
  });

  it('renders table headers correctly', () => {
    cy.get('#table thead tr').should('have.length', 1); // Ensure there is only one table header row
    cy.get('#table thead th').should('have.length.gt', 0); // Ensure there are table header cells
  });

  it('Deletes a row when the delete button is clicked', () => {

    let initialRowCount;
    let lastRowId;
    cy.get('#table tbody tr').its('length').then((count) => {
      initialRowCount = parseInt(count);
      cy.log('Initial table Length is: ' + initialRowCount);
      // cy.get('#table tbody tr:last-child').invoke('attr', 'data-row-id').then((id) => {
      // lastRowId = id;
      // cy.log('Id of deleted Pizza' + lastRowId);
    //});
    });

   cy.get(' #table tbody tr:last-child td .delete-button').click();
    // Confirm deletion by checking if the row count decreased
    cy.get('#table tbody tr').its('length').then((lenAfter) => {
      cy.log('After table Length is: ' + lenAfter);
      expect(lenAfter).to.equal(initialRowCount-1);
      //cy.get(`#${lastRowId}`).should('not.exist');
    });// Ensure the row count decreased


  });

  it('should redirect to update page when update button is clicked', () => {
      // Use cy.get() to locate the update button by its class or id
      cy.get('#table tbody tr:first-child td .update-button').click(); // Assuming the update button has a class of "update-button"

      // Wait for the URL to change to the update page URL
      cy.url().should('include', '/update-pizza/');
    });

  it('contain a bar graph', () => {
      // Use cy.get() to locate the update button by its class or id
      cy.get('.chart-container').should('exist'); // Assuming the update button has a class of "update-button"

      // Wait for the URL to change to the update page URL
      //cy.url().should('include', '/update-pizza/');
    });
  


})