const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    if (blogs.length > 0) {
        return blogs.reduce((prev,curr) => prev + curr.likes, 0)
    }

    return 0
}
  
  module.exports = {
    dummy,
    totalLikes
  }