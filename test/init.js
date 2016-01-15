import chai from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'

chai.use(sinonChai)
GLOBAL.should = chai.should()
GLOBAL.sinon = sinon
