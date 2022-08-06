import request from 'supertest';
import server from './index';

describe('Server', () => {
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

  test('should call POST /sync', (done) => {
    request(server(false))
      .post('/sync')
      .send({
        reader: 'stub',
        paths: {
          members: 'members.json',
        },
        writers: {
          fake: {
            key: '123',
          },
        },
      })
      .set('Accept', 'application/json')
      .then((response) => {
        // console.log(response);
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
