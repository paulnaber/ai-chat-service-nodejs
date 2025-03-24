import request from 'supertest';
import { db } from '../db';
import { chats } from '../db/schema';
import { app } from '../index'; // You might need to export the app from index.ts

// const mockUser = { preferred_username: 'testuser@example.com' };

// Mock authentication middleware
jest.mock('../authentication', () => ({
  expressAuthentication: jest
    .fn()
    .mockResolvedValue({ preferred_username: 'testuser@example.com' }),
  getEmailFromToken: jest.fn().mockReturnValue('test@example.com'),
}));

describe('Chat API', () => {
  describe('POST /v1/chats', () => {
    it('should create a new chat', async () => {
      const response = await request(app)
        .post('/v1/chats')
        .send({ content: 'Test chat' })
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test chat');
      expect(response.body.userId).toBe(
        { preferred_username: 'testuser@example.com' }.preferred_username
      );
    });
  });

  describe('GET /v1/chats', () => {
    beforeEach(async () => {
      // Insert a test chat
      await db.insert(chats).values({
        userId: { preferred_username: 'testuser@example.com' }
          .preferred_username,
        title: 'Test chat',
      });
    });

    it('should return all chats for the user', async () => {
      const response = await request(app).get('/v1/chats').expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0].title).toBe('Test chat');
      expect(response.body[0].userId).toBe(
        { preferred_username: 'testuser@example.com' }.preferred_username
      );
    });
  });
});
