describe("Header", () => {
  it("should be 'React Skeleton'", () => {
    cy.visit("");
    cy.get("h1")
      .text()
      .should("equal", "React Skeleton");
  });
});
