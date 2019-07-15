Project Aurora
==============

A modernisation project for the community over at [Skylords.com](https://www.skylords.com)

What is this project
--------------------

Project Aurora is an open source plugin for the game [Skylords.com](https://www.skylords.com). It is hosted on free [Heroku](https://www.heroku.com/) servers and is managed through its [Github page](https://github.com/AaronLayton/skylords-project-aurora).

The projects aim is to add UI improvements to the game and features ontop of the current game. Why a plugin you say, because its easier and faster to get updates out this way. Happy to work on the baskend aswell but this allows the community to work on a closed sourse project.

Installation
------------

To install this extension onto Skylords we are currently recommending users install [CSS and JavaScript Injection](https://chrome.google.com/webstore/detail/css-and-javascript-inject/ckddknfdmcemedlmmebildepcmneakaa).

This plugin allows an end user to inject their own code onto their favourite sites.

Once installed, click the new icon in chrome and then paste the below into the JavaScript tab whilst you are on the Skylords website.

```javascript
(function(a,u,r,o,ra){ra=u.createElement(r),m=u.getElementsByTagName('head')[0];ra.async=1;ra.src=o;m.appendChild(ra,m)
})(window,document,'script','https://skylords-project-aurora.herokuapp.com/js/aurora.dist.js');
```

Suggest a feature
-----------------

If you have a feature suggestion, be it a new UI element, a new tool to help plan attacks or just fixing something that is currently broke then feel free to create an Issue over on the project page. I welcome all new suggestions and will review each one, if it is something small and simple then turn around time will usually be within the day.

* [Suggest new feature](https://github.com/AaronLayton/skylords-project-aurora/issues/new)
* [See current Issues](https://github.com/AaronLayton/skylords-project-aurora/issues)

Contributing
------------

This is an open source project and as such the community is the driving force to its success. I welcome anyone who like to contribute to this project, that can include planning, Issue management and even code contributions.

If you would like to contribute you can fork the project over on Github and create any changes you like. Once you are complete, create a Pull Request where it will be reviewed and merged into the main code base. Again, any help is greatly appreciated.