/// <reference types="cypress" />

// https://on.cypress.io/interacting-with-elements
context("Actions", () => {
  beforeEach(() => {
    cy.server();
    cy.route(
      "GET",
      "https://pokeapi.co/api/v2/generation/*",
      "fixture:generation1.json"
    );
    cy.route(
      "GET",
      "https://pokeapi.co/api/v2/pokemon/*",
      "fixture:pokemonDetails.json"
    );
    cy.visit("/");
  });

  it("Request first generation at init", () => {
    cy.get("img[alt=logo]").should("be.visible");
    cy.contains("bulbasaur").should("be.visible");
  });

  it("Filter by name", () => {
    cy.get("input").type("b");
    cy.contains("bulbasaur").should("be.visible");
    cy.contains("zubat").should("be.exist");
  });

  it("Enter at details", () => {
    cy.contains("bulbasaur").click();
    cy.contains("bulbasaur").should("be.visible");
  });

  it("Go Back main page", () => {
    cy.contains("bulbasaur").click();
    cy.contains("x").click();
    cy.contains("bulbasaur").should("be.visible");
  });
});

context("Errors", () => {
  it("Generation request", () => {
    cy.server({
      delay: 1000,
      status: 400,
      response: {},
    });
    cy.route("GET", "https://pokeapi.co/api/v2/generation/*");
    cy.visit("/");
    cy.contains("Loading");
    cy.contains("Request failed with status code 400");
  });
});
