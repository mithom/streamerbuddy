const Enum = require('enum')

const categories = new Enum(['CORE', 'GAMING', 'UTILITY'])
const widthType = new Enum(['HALF','THIRD','TWO_THIRD'])

module.exports = {categories, widthType, Enum}
