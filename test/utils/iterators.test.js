import { colRowEach, colRowMapToMatrix } from 'utils/iterators'

let itShouldActLikeAcolRowEach = function(cols, rows, spy) {
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

describe('colRowEach', function() {
    let spy = sinon.spy()
    let cols = 1
    let rows = 2

    before(function() {
        colRowEach(cols, rows, spy)
    })

    itShouldActLikeAcolRowEach(cols, rows, spy)
})

describe('colRowMapToMatrix', function() {
    let mapFunction = (col, row) => {
        return {col: col, row: row}
    }
    let spy = sinon.spy(mapFunction)
    let cols = 2
    let rows = 2
    let mapResult

    before(function() {
        mapResult = colRowMapToMatrix(cols, rows, spy)
    })

    itShouldActLikeAcolRowEach(cols, rows, spy)

    it('should return a matrix mapped according to the given map function', function() {
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                mapResult[col][row].should.deep.equal({col: col, row: row})
            }
        }
    })
})
