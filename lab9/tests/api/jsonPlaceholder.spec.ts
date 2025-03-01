import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  test('GET /posts/:id returns correct post structure', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/1`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
    expect(body).toHaveProperty('userId');
  });

  test('POST /posts can create a new resource', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1
    };
    
    const response = await request.post(`${baseUrl}/posts`, {
      data: newPost
    });
    
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    
    expect(body.title).toBe(newPost.title);
    expect(body.body).toBe(newPost.body);
    expect(body).toHaveProperty('id'); // Server should assign an ID
  });

  test('PUT /posts/:id can update a resource', async ({ request }) => {
    const updatedPost = {
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1
    };
    
    const response = await request.put(`${baseUrl}/posts/1`, {
      data: updatedPost
    });
    
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    
    expect(body.title).toBe(updatedPost.title);
    expect(body.body).toBe(updatedPost.body);
  });

  test('DELETE /posts/:id returns success status', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/posts/1`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});