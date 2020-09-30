const _ = require('lodash')

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
  const blogCounts = _(array)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .value()

  const topAuthor = _.maxBy(blogCounts, 'blogs')
  return topAuthor
}

const mostLikes = array => {
  const likeCounts = _(array)
    .groupBy('author')
    .map((objs, key) => {
      return {
        'author': key,
        'likes': _.sumBy(objs, 'likes')
      }
    })
    .value()

  const topLikes = _.maxBy(likeCounts, 'likes')

  return topLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}