import { colRowIterator, colRowMapIterator } from 'utils/iterators'

let itShouldActLikeAColRowIterator = function(cols, rows, spy) {
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

    itShouldActLikeAColRowIterator(cols, rows, spy)
})

describe('colRowMapIterator', function() {
    let mapFunction = (col, row) => {
        return {col: col, row: row}
    }
    let spy = sinon.spy(mapFunction)
    let cols = 2
    let rows = 2
    let mapResult

    before(function() {
        mapResult = colRowMapIterator(cols, rows, spy)
    })

    itShouldActLikeAColRowIterator(cols, rows, spy)

    it('should return a matrix mapped according to the given map function', function() {
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                mapResult[col][row].should.deep.equal({col: col, row: row})
            }
        }
    })
})
