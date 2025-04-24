import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';
import { faker } from '@faker-js/faker';

describe('Product Review Functionality', () => {
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const productDetailsPage = new ProductDetailsPage();

    beforeEach(() => {
        cy.visit('/');
        homePage.verifyHomePageVisible();
    });

    it('TC21: should add a review to a product', () => {
        cy.log('[TC21] Starting test case...');

        homePage.navigateToProducts();
        productsPage.verifyAllProductsPageVisible();
        productsPage.allProductsHeading.should('be.visible');
        productsPage.clickFirstProductViewLink();
        productDetailsPage.verifyProductDetailsPageVisible();
        productDetailsPage.verifyReviewSectionVisible();

        const reviewData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            review: faker.lorem.paragraph(1)
        };
        productDetailsPage.fillReviewDetails(reviewData.name, reviewData.email, reviewData.review);
        productDetailsPage.submitReview();
        productDetailsPage.verifyReviewSuccessMessageVisible();

        cy.log('TC21 Completed: Successfully submitted product review.');
    });
});