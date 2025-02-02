const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('should create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('should return error when passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('should avoid creating an existing user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      // First, create the user
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        // Try to create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(err.message).to.equal('User already exists')
          done()
        })
      })
    })
  })

  describe('Get', () => {

    it('should get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      // First, create the user
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        // Then get the user by username
        userController.get('sergkudinov', (err, userData) => {
          expect(err).to.be.equal(null)
          expect(userData).to.include({
            firstname: 'Sergei',
            lastname: 'Kudinov'
          })
          done()
        })
      })
    })

    it('should return an error when trying to get a non-existent user', (done) => {
      userController.get('nonexistentuser', (err, userData) => {
        expect(err).to.not.be.equal(null)
        expect(err.message).to.equal('User not found')
        done()
      })
    })
  })

  describe('Delete', () => {

    it('should delete an existing user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      // First, create the user
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        // Then delete the user
        userController.delete('sergkudinov', (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.equal(1) // Redis returns 1 when a key is deleted
          done()
        })
      })
    })

    it('should return an error when trying to delete a non-existent user', (done) => {
      userController.delete('nonexistentuser', (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(err.message).to.equal('User not found')
        done()
      })
    })
  })
})
