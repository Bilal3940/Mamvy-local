# Memvy

Memvy is a web application built with Next.js. This readme file will guide you through the steps to set up, run, and deploy the project in different environments.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v18.x or later)
- Yarn (v1.22.x or later)
- Docker (v20.x or later) if you intend to run the application using Docker

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/umember/website-umembr.git
    cd website-umembr
    ```

2. Install the dependencies using Yarn:
    ```sh
    yarn install
    ```

## Running the Application

### Development

To run the application in development mode:
```sh
yarn dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### Production

To run the application in production mode, you can use one of the following methods:

#### Using Yarn

1. Build the application:
    ```sh
    yarn build
    ```

2. Start the application:
    ```sh
    yarn start
    ```

#### Using Docker

1. Build the Docker image:
    ```sh
    docker build -t memvy:latest .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 3000:3000 memvy:latest
    ```

This will start the application on [http://localhost:3000](http://localhost:3000).

### Docker Swarm

To deploy the application using Docker Swarm, you can use the `deploy.sh` script located in the `scripts` folder. Ensure you have Docker Swarm initialized and configured on your system.

1. Make the `deploy.sh` script executable:
    ```sh
    chmod +x scripts/deploy.sh
    ```

2. Run the deployment script:
    ```sh
    ./scripts/deploy.sh
    ```

This will deploy the application as a Docker service.

## Documentation

Detailed documentation including the Flow Chart, Database Diagram, Roles for users, and Infrastructure Diagram can be found at the following link:

[Memvy Documentation](https://whimsical.com/umembr-AKodLcVCG3Agh1WJxkf4ip)

## Contributing

To contribute to Memvy, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## Contact

If you have any questions or issues, please open an issue on the GitHub repository or contact to jbastidas@aimonkey.io

---

Thank you for using Memvy!
