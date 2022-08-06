import request from 'supertest';
import server from './index';

test('should return docs on /', (done) => {
  request(server(false))
    .get('/')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('Nectar API documentation');
      done();
    });
});

test('should validate on POST /sync', (done) => {
  request(server(false))
    .post('/sync')
    .then((response) => {
      expect(response.error).toBeInstanceOf(Error);
      expect(response.statusCode).toBe(400);
      expect(response.error ? response.error.text : null).toContain('paths');
      expect(response.error ? response.error.text : null).toContain('writers');
      done();
    });
});
