const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', {
    featureList: [{
      name: "Player Cards",
      description: "Adds information cards about a player when hovering over a username",
      image: "/img/screenshot-75997c87.dist.jpg",
    },
    {
      name: "CTRL+Enter to submit",
      description: "Adds ability to submit messages and forum posts with CTRL+Enter",
      image: "/img/screenshot-f4174d1c.dist.jpg",
    },
    {
      name: "Fix cursor on space page",
      description: "Adds back in the hand cursor when hovering over movable cells on the space page",
      image: "/img/screenshot-e11ceda3.dist.jpg",
    },
    {
      name: "Markdown posts",
      description: "The forum posts are so 90's, not supporting anything except smileys. This takes the post content and runs it through a Markdown converter so that posts can now be styled, include links, have images, list etc ...",
      image: "/img/screenshot-8bfd87b3.dist.jpg",
    }]
  }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
