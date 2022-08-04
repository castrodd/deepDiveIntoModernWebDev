const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    if (blogs.length > 0) {
        return blogs.reduce((prev,curr) => prev + curr.likes, 0)
    }

    return 0
}

const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
        let highestBlog = blogs[0]
        blogs.forEach(blog => {
            if (blog.likes > highestBlog.likes) {
                highestBlog = blog
            }
        })

        return highestBlog
    }

    return {}
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }