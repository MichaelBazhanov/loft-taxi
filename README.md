# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Танцы с бубном на момент 20.02.2022
---

> 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 <br/>

Скачиваем и устанавливаем Heroku CLI<br/>
  <https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up> <br/>

Скачиваем Ruby на официальном сайте <br/>
  <https://www.ruby-lang.org/en/downloads> <br/>

Через Ruby устанавливаем Travis CLI<br/>
  <https://github.com/travis-ci/travis.rb#installation>
  <https://github.com/travis-ci/travis.rb/releases>

Логинимся при помощи GitHab токена который мы создали на GitHab<br/>
  travis login --com --github-token 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 <br/>

Отдаем этот токен на Heroku <br/>
  travis encrypt $(heroku auth:token) --com --add deploy.api_key <br/>

Добавляем в .travis.yml <br/>
  before_deploy: <br/>
    - rvm $(travis_internal_ruby) --fuzzy do ruby -S gem install faraday -v 1.8.0 <br/>

Устанавливаем<br/>
  npm install serve --s <br/>

Добавляем в package.json сценарии для локального билда и билда на Heroku <br/>
  "local_build_start": "serve -s build", <br/>
  "heroku-postbuild": "npm run build", <br/>

Расширяем память для Heroku приложения а то при сборке вылетает ошибка <br/>
  Settings -> Config Vars добавляем key и value <br/>
  NODE_OPTIONS     --max_old_space_size=1024 value <br/>

---
