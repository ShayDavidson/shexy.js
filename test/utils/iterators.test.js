import { colRowIterator, colRowMapIterator } from 'utils/iterators'

let baseIteratorTests = function(cols, rows, spy) {
    it('should call the handler function col * rows times', function() {
        spy.should.have.been.callCount(cols * rows)
    })

    it('should call the handler function each time with the right col and row arguments', function() {
        let allPossibleArguments = []
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                allPossibleArguments.push(spy.withArgs(col, row))
            }
        }
        sinon.assert.callOrder(...allPossibleArguments)
    })
}

describe('colRowIterator', function() {
    let spy = sinon.spy()
    let cols = 1
    let rows = 2

    before(function() {
        colRowIterator(cols, rows, spy)
    })

    baseIteratorTests(cols, rows, spy)
})

describe('colRowMapIterator', function() {
    let mapFunction = () => {}
    let spy = sinon.spy(mapFunction)
    let cols = 2
    let rows = 2

    before(function() {
        colRowMapIterator(cols, rows, spy)
    })

    baseIteratorTests(cols, rows, spy)
})
