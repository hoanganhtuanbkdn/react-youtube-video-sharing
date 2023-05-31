# Funny App - Video Sharing Website

## Introduction

The Funny App is a platform where users can share and view videos shared by other community members. The website allows users to share YouTube links with the community and receive notifications when new videos are shared.

### Demo

Web App: https://remitano-web-gamma.vercel.app/

Server Api: https://remitano-api.code4change.dev/explorer

## Key features of the Funny App include:

-   User registration and authentication

-   User profile management

-   Video sharing management

-   Videos sharing community

-   Real-time notifications for new video uploads

## Prerequisites

To use the Funny website, you need the following:

-   Web browser (Chrome, Firefox, Safari, etc.)

-   Internet connection

-   Installation & Configuration

-   To set up the Funny website locally, follow these steps:

## Directory Structure

```sh
├── src/ # Directory containing the main source code of the project
│ ├── components/ # Directory containing reusable React components
│ ├── constants/ # Directory containing reusable React components
│ ├── hooks/ # Directory containing custom React hooks
│ ├── pages/ # Directory containing the pages of the application (Next.js specific)
│ ├── utils/ # Directory containing utility functions
│ ├── styles/ # Directory containing CSS or SCSS files
│ ├── services/ # Directory containing other services related to the project ( API, Socket )
├── public/ # Directory containing static assets such as images, favicon, etc.
├── tests/ # Directory containing test files
├── .gitignore # File specifying the list of files/directories to be ignored during commit
├── package.json # File defining project dependencies and scripts
├── next.config.js # Next.js configuration file (Next.js specific)
├── tailwind.config.js # TailwindCss configuration file
└── README.md # Project documentation and guide
```

## Install

1. Clone the repository:

```sh
git clone https://github.com/hoanganhtuanbkdn/remitano-web.git
```

2. Navigate to the project directory:

```sh
cd remitano-web
```

3. Install project dependencies:

```sh
npm install
```

4. Start the development server

```sh
npm run dev`

```

-   Start the production server:

```sh
npm run build
```

```sh
npm run start
```

Open your web browser and access the website at http://localhost:3000.

If you haven't registered yet, create a new user account by clicking on the "Register" button.

Log in to your account using your credentials.

Explore the website by viewing videos shared by other users

To share a YouTube video link, navigate to the "Share a movie" button on header of the website and provide the YouTube link.

Receive real-time notifications whenever a new video is shared by another user.

## Docker Deployment

To deploy the Funny website using Docker, follow these steps:

1. Install Docker on your system.

2. Build the Docker image:

```sh
npm run docker:build
```

or

```sh
docker build -t funny-web .
```

3. Run the Docker container:

```sh
npm run docker:run
```

or

```sh
docker run -p 3000:3000 funny-web
```

4. Open your web browser and access the website at http://localhost:3000.

## Testing

The Funny website includes a comprehensive testing suite to ensure its functionality and reliability. To run the unit tests, follow these steps:

Make sure you have all the project dependencies installed.

Run the unit tests command:

```sh
npm run test
```

The test suite will run, and you will see the test results and any failures or errors encountered.

The testing process helps maintain the quality and stability of the website. If you encounter any test failures, investigate the specific failure points and debug or fix the corresponding code.

### Start the local server

Clone the server repository

```sh
git clone https://github.com/hoanganhtuanbkdn/remitano-server
```

Navigate to the project directory:

```sh
cd remitano-server
```

Create a .env file based on the provided env.example file. This file will contain the environment variables required for the project.

```sh
cp env.example .env
```

Start the server with Docker

```sh
docker-compose build && docker-compose up -d` or `npm run docker:deploy
```

Open your web browser and access the website at http://localhost:5000/explorer.

## Acknowledgements

We would like to acknowledge the following resources and libraries that have contributed to the development of the Video Sharing Community website:

ReactJs - JavaScript library for building user interfaces

NextJs - The React Framework for the Web

Node.js - JavaScript runtime

[Loopback](https://loopback.io/) - A highly extensible Node.js and TypeScript framework
for building APIs and microservices.

Socket.io - Real-time communication library

PostgresSQL - Relational database management system

[TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework packed

[Ant Design](https://ant.design/) - A popular UI library and design system for building modern and responsive user interfaces

We are grateful for the valuable contributions made by the open-source community.

## Contact

If you have any questions, suggestions, or issues related to the Video Sharing Community website, feel free to contact us at:

Email: tuanpha.it@gmail.com

Website: https://remitano-web-gamma.vercel.app/
