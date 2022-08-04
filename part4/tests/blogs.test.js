const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const longList = [
        {
            "_id": "62e886c248d20189c7d5856e",
            "title": "That's a Blog",
            "author": "Some Body",
            "url": "www.blog.dev",
            "likes": 3,
            "__v": 0
        },
        {
            "_id": "62e886ef48d20189c7d58570",
            "title": "So Bloggy",
            "author": "You Know",
            "url": "www.bloggy.co",
            "likes": 11,
            "__v": 0
        },
        {
            "_id": "62e8872a48d20189c7d58572",
            "title": "Blogtown",
            "author": "Dez Diaz",
            "url": "www.suchablog.es",
            "likes": 7,
            "__v": 0
        },
        {
            "_id": "62e9ea435bdbbd8ea8be0a5e",
            "title": "More Blog",
            "author": "W. Ferrell",
            "url": "moreblogbell.web",
            "likes": 17,
            "__v": 0
        }
    ]

    test('empty list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
      })
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when the list has multiple blogs, equals the likes of total', () => {
        const result = listHelper.totalLikes(longList)
        expect(result).toBe(38)
    })
  })