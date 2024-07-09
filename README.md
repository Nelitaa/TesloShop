<a name="readme-top"></a>

<div align="center">
  <h3><b>README</b></h3>
</div>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 [your_project_name] <a name="about-project"></a>

> Describe your project in 1 or 2 sentences.

**[your_project__name]** is a...

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

> Describe the tech stack and include only the relevant sections that apply to your project.

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

> Describe between 1-3 key features of the application.

- **[key_feature_1]**
- **[key_feature_2]**
- **[key_feature_3]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->

## 🚀 Live Demo <a name="live-demo"></a>

> Add a link to your deployed project.

- [Live Demo Link](https://google.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

<!--
Example command:

```sh
 gem install rails
```
--->

### Setup

Clone this repository to your desired folder:

```sh
  cd my-folder
  git clone git@github.com:Nelitaa/tesloshop.git
  cd tesloshop
```

### Install

Install this project:

1. Create a copy of `.env.template` and rename it to `.env`.
2. Open the `.env` file in a text editor. Replace the values of the environment variables as needed with your specific environment configuration.
3. Install dependencies `npm install`.
4. To start the database, use Docker. Run the command: `docker compose up -d`.
5. Run Prisma migrations `npx prisma migrate dev`.
6. Run seed `npm run seed`.

### Usage

To run the project, execute the following command:

```sh
  npm run dev
```

### Run tests

To run tests, run the following command:

<!--
Example command:

```sh
  bin/rails test test/models/article_test.rb
```
--->

### Deployment

You can deploy this project using:

<!--
Example:

```sh

```
 -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

👤 **Marianela Muñoz Gutierrez**

- GitHub: [@Nelitaa](https://github.com/Nelitaa)
- Twitter: [@MarianelaMunoz](https://twitter.com/MarianelaMunoz_)
- LinkedIn: [Marianela-munoz](https://www.linkedin.com/in/marianela-munoz/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

> Describe 1 - 3 features you will add to the project.

- [ ] **[new_feature_1]**
- [ ] **[new_feature_2]**
- [ ] **[new_feature_3]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

If you like this project, give me a star.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank Tesla for the design inspiration from their apparel collection: [TeslaShop](https://shop.tesla.com/category/apparel).

I also want to extend my gratitude to [Fernando Herrera](https://fernando-herrera.com/) for his course, "Next.js: The React Framework for Production" which provided invaluable guidance and knowledge throughout this project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Commands used and visited web pages <a name="commands"></a>

```sh
npx create-next-app@latest .
npm install react-icons --save
npm install zustand
npm i clsx
npm install swiper
npm install prisma --save-dev
npx prisma init --datasource-provider PostgreSQL
npx prisma migrate dev --name ProductCategory
npx prisma migrate dev --name ProductImage
npm i -D ts-node
npx tsc --init (cd src/seed/)
npx prisma generate
```

https://react-icons.github.io/react-icons/
https://zustand-demo.pmnd.rs/
https://swiperjs.com/
https://tailwindcomponents.com/component/hoverable-table
https://tableplus.com/
https://www.prisma.io/
https://www.prisma.io/docs/getting-started/quickstart
https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

<p align="right">(<a href="#readme-top">back to top</a>)</p>
