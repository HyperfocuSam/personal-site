# Personal Website

Welcome to my personal website! This is the source for [samwong.me](https://samwong.me/), a React-based Jamstack site where I share my work as an AI private tutor in Hong Kong. It is [MIT licensed](./LICENSE), easy to customize, and deploys cleanly to static hosting (including [GitHub Pages](https://pages.github.com/)).

## 🚀 Features

- Built with modern JavaScript using [create-react-app](https://github.com/facebook/create-react-app), [React Router](https://reactrouter.com/), and SCSS.
- Automated workflows via [GitHub Actions](https://github.com/features/actions) for static deployments.
- And more!

## 🛠 Adapting this Project

This repo started from an open source template and has been customized for my site. If you want to adapt it for yourself, follow the setup instructions below and check out the **[detailed guide and checklist](./docs/adapting-guide.md)**.

## 🤝 Contributing

If you spot a bug or have an idea to improve the site, feel free to open an issue or a pull request. See the [design goals](./docs/design-goals.md), [roadmap](./docs/roadmap.md), and [contributing guidelines](./docs/contributing.md) for more detail.

## 🔧 Dependencies

Ensure you have [node](https://nodejs.org/) >= v16. Optionally, use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage node versions.

## 🚀 Setup and Running

1. Clone the repository:

   ```bash
   git clone git://github.com/HyperfocuSam/personal-site.git
   cd personal-site
   ```

2. (Optional) Ensure you're on Node v16 or higher:

   ```bash
   nvm install
   node --version
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

By default, the application should be available at [http://localhost:3000/](http://localhost:3000/).

## 🚢 Deploying

### Deploying to GitHub Pages

1. Update the environment variables and Git remote URL in [`.github/workflows/github-pages.yml`](.github/workflows/github-pages.yml).
2. Adjust the `homepage` value in `package.json` based on your hosting preferences.
3. Planning on using a custom domain? Update `public/CNAME`. Otherwise, remove it.

After making a commit to `main`, simply push your changes, and the deployment will be handled automatically.

### Static Export

For a static export without deploying to GitHub Pages:

- Remove or disable `.github/workflows/github-pages.yml`.
- Execute:

  ```bash
  npm run predeploy
  ```

This will generate a static version in `personal-site/build/` which you can host or deploy to a CDN.

## 🙌 Acknowledgements

- Initial template from [Future Imperfect](https://html5up.net/future-imperfect) by [@ajlkn](https://github.com/ajlkn) for [HTML5 UP](html5up.net).
- Special thanks to [@typpo](https://github.com/typpo) for tirelessly answering all of my node.js and react questions.
- Kudos to [@notrueblood](https://github.com/notrueblood)[<sup>[1]</sup>](https://github.com/mldangelo/personal-site/pull/218) and [@sjhsieh](https://github.com/sjhsieh)[<sup>[2]</sup>](https://github.com/mldangelo/personal-site/issues/168) for their constructive feedback.
