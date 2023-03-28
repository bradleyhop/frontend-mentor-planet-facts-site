# Frontend Mentor - Planets fact site solution

This is a solution to the [Planets fact site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/planets-fact-site-gazqN8w_f). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Links](#links)
    -   [Screenshot](#screenshot)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [What I would do differently](#what-i-would-do-differently)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

-   View the optimal layout for the app depending on their device's screen size
-   See hover states for all interactive elements on the page
-   View each planet page and toggle between "Overview", "Internal Structure", and "Surface Geology"

### Links

-   Solution URL: [GitHub Repo](https://github.com/bradleyhop/frontend-mentor-planet-facts-site)
-   Live Site URL: [via GitHub Pages](https://bradleyhop.github.io/frontend-mentor-planet-facts-site/)

### Screenshot

#### Desktop

![dekstop layout](./desktop.png)

#### Tablet

![tablet layout](./tablet.png)

#### Mobile

![mobile layout](./mobile.png)

## My process

### Built with

-   Semantic HTML5 markup
-   CSS custom properties
-   Flexbox
-   CSS Grid
-   Sass
-   Mobile-first workflow
-   [Vue 3](https://vuejs.org/) - JS library

### What I learned

#### Views vs Components

At first, I was going to build a page for each planet and use Vue Router to link
the pages together. However, I quickly changed my strategy to abstraction and
instead use a component to display a planet's information. The main page pulls
in a local json file, sets "Earth" as the default view, and then sends new
planet information when the use selects from the menu.

#### Automate Lists

I changed my strategy from hard-coding a list for the menu to a for loop. Since
the style for the mobile is so different from the other views, I made a separate
loop. I utilized Vue's conditional rendering to show the appropriate menus based
on device size; of course, media queries also aide in this showing and hiding
blocks of HTML that this project requires.

#### CSS Level Up

With each FrontendMentor project, I find myself becoming more and more skilled
in CSS. With this project, I added small animations on hover using `transition`
and a nice, simple sliding animation using `keyframes`.

I also lost some time trying to stylize the list icons in the mobile menu; I
finally decided that having a semantic list with no icon styling but with CSS
`<div>`s would get what I wanted to see much easier.

#### Local Asset Linking

I also had trouble linking in my local images using Vite. For the developer
build, using a function to get the local asset worked:

```javascript
function getImageUrl(name) {
    return new URL(`./dir/${name}.png`, import.meta.url).href;
}
```

However, the images would not display when I built and pushed the site to GitHub
Pages. Hard-linking and moving the images to the root directory of the build
worked, which also required changing the `images` properties in the JSON file to
point to this directory. Then my function changed to:

```javascript
imageUrl() {
  let imgLink;

  // surface geology image is overlayed on the Overview image
  if (this.num === 2) {
    imgLink = this.planet.images[this.imgLayer[0]];
  } else {
    imgLink = this.planet.images[this.imgLayer[this.num]];

  return imgLink;
}
```

This method works because when I build the page using Vite, the site uses
Server-side Rendering, which is something I learned about with this project.
From Vite's link local assets documentation:

> Does not work with SSR
>
> [The first] pattern [above] does not work if you are using Vite for Server-Side Rendering,
> because import.meta.url have different semantics in browsers vs. Node.js. The
> server bundle also cannot determine the client host URL ahead of time.

### What I would do differently

On returning to this project, I noticed that I put too much of the structure in one file, App.vue. I would rip out the heading and navigation into its own component, as well as the footer.

I updated the animation of the mobile menu as well as hiding the `<main>` content on the active menu.

## Author

-   Website - [Bradley Smith](https://bradleysmith.tech)
-   Frontend Mentor - [@bradleyhop](https://www.frontendmentor.io/profile/bradleyhop)

## Acknowledgments

TBA ;)
