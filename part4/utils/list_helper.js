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

const mostBlogs = (blogs) => {
    let topAuthor = {name: null, blogs: 0}
    const authors = {}
    blogs.forEach(blog => {
        if (authors[blog.author]) {
            authors[blog.author] += 1
        } else {
            authors[blog.author] = 1
        }

        topAuthor = authors[blog.author] > topAuthor.blogs 
            ? {name: blog.author, blogs: authors[blog.author]}
            : topAuthor
    })

    return topAuthor
}

const mostLikes = (blogs) => {
    let topAuthor = {name: null, likes: 0}
    const authors = {}
    blogs.forEach(blog => {
        if (authors[blog.author]) {
            authors[blog.author] += blog.likes
        } else {
            authors[blog.author] = blog.likes
        }

        topAuthor = authors[blog.author] > topAuthor.likes 
            ? {name: blog.author, likes: authors[blog.author]}
            : topAuthor
    })

    return topAuthor
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }