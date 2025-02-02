const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })
  
  after(() => {
    app.close() // Close the app server
    db.quit()  // Close the Redis client
  })

  // POST /user tests
  describe('POST /user', () => {

    it('should create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
    })
    
    it('should return error when passing wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
    })
  })

  // GET /user/:username tests
  describe('GET /user/:username', () => {

    it('should return a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      // First, create the user via the POST route
      chai.request(app)
        .post('/user')
        .send(user)
        .then(() => {
          // Then get the user by username
          chai.request(app)
            .get('/user/sergkudinov')
            .then((res) => {
              chai.expect(res).to.have.status(200)
              chai.expect(res.body.status).to.equal('success')
              chai.expect(res.body.user).to.include({
                firstname: 'Sergei',
                lastname: 'Kudinov'
              })
              done()
            })
            .catch((err) => {
              throw err
            })
        })
    })

    it('should return an error when trying to get a non-existent user', (done) => {
      chai.request(app)
        .get('/user/nonexistentuser')
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res.body.msg).to.equal('User not found')
          done()
        })
        .catch((err) => {
          throw err
        })
    })
  })

  // DELETE /user/:username tests
  describe('DELETE /user/:username', () => {

    it('should delete an existing user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      // First, create the user via the POST route
      chai.request(app)
        .post('/user')
        .send(user)
        .then(() => {
          // Then delete the user
          chai.request(app)
            .delete('/user/sergkudinov')
            .then((res) => {
              chai.expect(res).to.have.status(200)
              chai.expect(res.body.status).to.equal('success')
              chai.expect(res.body.msg).to.equal(1) // Redis returns 1 when the key is deleted
              done()
            })
            .catch((err) => {
              throw err
            })
        })
    })

    it('should return an error when trying to delete a non-existent user', (done) => {
      chai.request(app)
        .delete('/user/nonexistentuser')
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res.body.msg).to.equal('User not found')
          done()
        })
        .catch((err) => {
          throw err
        })
    })
  })
})
