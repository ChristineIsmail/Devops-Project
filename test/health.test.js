// test/health.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index'); // Import the app
const { expect } = chai;

chai.use(chaiHttp);

describe('Health Check API', () => {
  it('should return success message when the server is up and running', (done) => {
    chai.request(app)
      .get('/health')
      .end((err, res) => {
        expect(res).to.have.status(200); // Assert that the status is 200
        expect(res.body.status).to.equal('success'); // Assert the status is success
        expect(res.body.message).to.equal('API is running smoothly'); // Assert the message
        done();
      });
  });
});
