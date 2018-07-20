
const ZREVRANGE = {
    MAX: 9,
    MIN: 0
}
const ZSCAN = {
    CURSOR: 0,
    COUNT: 10 //default
}

const ZINCRBY = {
    KEY: 'test',
    INCREMENT: 1
}

module.exports = {
    ZREVRANGE,
    ZSCAN,
    ZINCRBY
}
