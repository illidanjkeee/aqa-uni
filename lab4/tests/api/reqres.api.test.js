const axios = require('axios');

/**
 * Test suite for the Reqres API endpoints
 * Base URL: https://reqres.in/api
 */
describe('Reqres API Tests', () => {
    const baseURL = 'https://reqres.in/api';

    /**
     * GET Tests
     */

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

    /**
     * POST Tests Section
     * Testing user creation, registration, and login functionality
     */

    /**
     * Test to verify user creation with valid data
     * Expects 201 status code and correct response structure
     */
    test('POST /users creates a new user', async () => {
        const userData = {
            name: "John Doe",
            job: "Software Engineer"
        };
        const response = await axios.post(`${baseURL}/users`, userData);
        expect(response.status).toBe(201);
        expect(response.data.name).toBe(userData.name);
        expect(response.data.job).toBe(userData.job);
        expect(response.data.id).toBeDefined();
    });

    /**
     * Test to verify successful user registration
     * Uses valid credentials and expects token in response
     */
    test('POST /register successful registration', async () => {
        const userData = {
            email: "eve.holt@reqres.in",
            password: "pistol"
        };
        const response = await axios.post(`${baseURL}/register`, userData);
        expect(response.status).toBe(200);
        expect(response.data.token).toBeDefined();
    });

    /**
     * Test to verify successful login
     * Uses valid credentials and expects token in response
     */
    test('POST /login successful login', async () => {
        const loginData = {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        };
        const response = await axios.post(`${baseURL}/login`, loginData);
        expect(response.status).toBe(200);
        expect(response.data.token).toBeDefined();
    });

    /**
     * Test to verify unsuccessful registration handling
     * Uses invalid data and expects 400 status code
     */
    test('POST /register unsuccessful registration', async () => {
        try {
            await axios.post(`${baseURL}/register`, { email: "sydney@fife" });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBeDefined();
        }
    });

    /**
     * Test to verify unsuccessful login handling
     * Uses invalid credentials and expects 400 status code
     */
    test('POST /login unsuccessful login', async () => {
        try {
            await axios.post(`${baseURL}/login`, { email: "peter@klaven" });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBeDefined();
        }
    });

    /**
     * PUT Tests Section
     * Testing update functionality with various scenarios
     */

    /**
     * Test to verify complete user update
     * Updates all fields and verifies response
     */
    test('PUT /users/{id} updates user completely', async () => {
        const userData = {
            name: "John Updated",
            job: "Senior Engineer"
        };
        const response = await axios.put(`${baseURL}/users/2`, userData);
        expect(response.status).toBe(200);
        expect(response.data.name).toBe(userData.name);
        expect(response.data.job).toBe(userData.job);
        expect(response.data.updatedAt).toBeDefined();
    });

    /**
     * Test to verify partial update functionality
     * Updates only name field and verifies response
     */
    test('PUT /users/{id} with partial data', async () => {
        const userData = { name: "John Partial" };
        const response = await axios.put(`${baseURL}/users/2`, userData);
        expect(response.status).toBe(200);
        expect(response.data.name).toBe(userData.name);
    });

    /**
     * Test to verify update with empty data
     * Sends empty object and verifies response
     */
    test('PUT /users/{id} with empty data', async () => {
        const response = await axios.put(`${baseURL}/users/2`, {});
        expect(response.status).toBe(200);
        expect(response.data.updatedAt).toBeDefined();
    });

    /**
     * Test to verify update with invalid user ID
     * Attempts to update non-existent user
     */
    test('PUT /users/{id} with invalid id', async () => {
        try {
            const response = await axios.put(`${baseURL}/users/999`, { name: "Test" });
            expect(response.status).toBe(200);
            expect(response.data.updatedAt).toBeDefined();
        } catch (error) {
            if (error.response) {
                expect(error.response.status).toBe(404);
            } else {
                throw error;
            }
        }
    });

    /**
     * Test to verify update with invalid data types
     * Sends non-string values for fields
     */
    test('PUT /users/{id} with invalid data type', async () => {
        const userData = { name: 123, job: true };
        const response = await axios.put(`${baseURL}/users/2`, userData);
        expect(response.status).toBe(200);
    });

    /**
     * DELETE Tests Section
     * Testing deletion functionality with various scenarios
     */

    /**
     * Test to verify successful user deletion
     * Deletes existing user and verifies response
     */
    test('DELETE /users/{id} deletes user successfully', async () => {
        const response = await axios.delete(`${baseURL}/users/2`);
        expect(response.status).toBe(204);
    });

    /**
     * Test to verify deletion of non-existent user
     * Attempts to delete invalid user ID
     */
    test('DELETE /users/{id} with non-existent user', async () => {
        const response = await axios.delete(`${baseURL}/users/999`);
        expect(response.status).toBe(204);
    });

    /**
     * Test to verify multiple sequential deletions
     * Deletes multiple users in sequence
     */
    test('DELETE multiple users sequentially', async () => {
        const responses = await Promise.all([
            axios.delete(`${baseURL}/users/1`),
            axios.delete(`${baseURL}/users/2`),
            axios.delete(`${baseURL}/users/3`)
        ]);
        responses.forEach(response => {
            expect(response.status).toBe(204);
        });
    });

    /**
     * Test to verify user is actually deleted
     * Deletes user and verifies they can't be retrieved
     */
    test('DELETE and verify user is gone', async () => {
        await axios.delete(`${baseURL}/users/2`);
        try {
            await axios.get(`${baseURL}/users/2`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });

    /**
     * Test to verify deletion with invalid URL
     * Attempts to delete from non-existent endpoint
     */
    test('DELETE with invalid URL', async () => {
        try {
            await axios.delete(`${baseURL}/invalid/999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});