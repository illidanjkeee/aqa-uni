import { test, expect } from '@playwright/test';

test.describe('API Tests - JSONPlaceholder', () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';

    test('GET - Fetch all posts', async ({ request }) => {
        const response = await request.get(`${baseUrl}/posts`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test('POST - Create new post', async ({ request }) => {
        const response = await request.post(`${baseUrl}/posts`, {
            data: {
                title: 'New Post',
                body: 'Content',
                userId: 1
            }
        });
        expect(response.status()).toBe(201);
    });

    test('PUT - Update post', async ({ request }) => {
        const response = await request.put(`${baseUrl}/posts/1`, {
            data: {
                title: 'Updated Post',
                body: 'Updated Content',
                userId: 1
            }
        });
        expect(response.ok()).toBeTruthy();
    });

    test('DELETE - Remove post', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/posts/1`);
        expect(response.status()).toBe(200);
    });

    test('GET - Fetch specific user', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`);
        expect(response.ok()).toBeTruthy();
        const user = await response.json();
        expect(user.id).toBe(1);
    });
});