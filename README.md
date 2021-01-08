# RPG-of-Life-frontend

Next.js frontend

## Setup

1. Install NodeJS
2. `cd app`
3. `npm run dev` to run the app locally on `http://localhost:3000`

Check out the docs:

- [Setup Guide](https://nextjs.org/learn/basics/create-nextjs-app/setup).
- [React](https://reactjs.org/) (Important, we will be mostly working with React. Next.JS is built on top of React)
- [React Bootstrap](https://react-bootstrap.github.io/layout/grid/)
- [FontAwesome](https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use)

## Structure

The app only has one page, `index.js`, which renders the main component, `App.js`.

`App.js` is the top-level component of the app. It decides what components get rendered. For example, `App.js` decides if the home page is showing, or if the friends page is showing.

New "pages", like the Friends screen, will be under `/components/`, as they are not really pages, just elements that will be shown on the same page (remember, the app only has one page). The CSS for the components is also under `/components/`. To add a CSS class to an HTML element, just add it to the corresponding css module and add the attribute `className={styles.theNameOfTheCSSClasYouCreated}`.

We will mostly just be working with `/components/`
