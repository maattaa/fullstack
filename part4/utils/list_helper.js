const { xor } = require('lodash')
const lodash = require('lodash')

const dummy = () => 1

const totalLikes = array => {

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = array => {

  const reducer = (favorite, item) => {
    return !favorite || item.likes > favorite.likes
      ? item
      : favorite
  }

  const { author, title, likes } = array.reduce(reducer, 0)

  return array.length === 0
    ? []
    : { author, title, likes }
}

const mostBlogs = array => {
  return undefined
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}