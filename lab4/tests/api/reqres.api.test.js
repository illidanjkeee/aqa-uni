const axios = require('axios');

/**
 * Test suite for the Reqres API endpoints
 * Base URL: https://reqres.in/api
 */
describe('Reqres API Tests', () => {
    const baseURL = 'https://reqres.in/api';

    /**
     * Test to verify that GET /users endpoint returns a list of users
     * Checks if response is successful and contains an array of users
     */
    test('GET /users returns list of users', async () => {
        const response = await axios.get(`${baseURL}/users`);
        expect(response.status).toBe(200);
        expect(response.data.data).toBeDefined();
        expect(Array.isArray(response.data.data)).toBeTruthy();
    });

    /**
     * Test to verify that GET /users/{id} returns a specific user
     * Using userId = 2 as test data
     */
    test('GET /users/{id} returns single user', async () => {
        const userId = 2;
        const response = await axios.get(`${baseURL}/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.data.data.id).toBe(userId);
    });

    /**
     * Test to verify error handling for non-existent users
     * Expects a 404 status code when requesting invalid user ID
     */
    test('GET /users/{id} returns 404 for non-existent user', async () => {
        try {
            await axios.get(`${baseURL}/users/999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });

    /**
     * Test to verify that GET /unknown endpoint returns list of resources
     * Checks if response contains an array of resource data
     */
    test('GET /unknown returns list of resources', async () => {
        const response = await axios.get(`${baseURL}/unknown`);
        expect(response.status).toBe(200);
        expect(response.data.data).toBeDefined();
        expect(Array.isArray(response.data.data)).toBeTruthy();
    });

    /**
     * Test to verify pagination functionality of users endpoint
     * Checks if page 2 of results is returned correctly
     */
    test('GET /users with page parameter returns paginated results', async () => {
        const response = await axios.get(`${baseURL}/users?page=2`);
        expect(response.status).toBe(200);
        expect(response.data.page).toBe(2);
        expect(response.data.data).toBeDefined();
    });
});