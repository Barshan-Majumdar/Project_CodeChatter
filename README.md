# CodeChatter

**CodeChatter** is a unique platform combining the features of coding practice and social networking. It allows users to upload coding problems and solutions while interacting with a community through posts and discussions. Think of it as the hybrid of **LeetCode** and **Facebook**, with the power of AI integrated for real-time problem solving. Users can earn points for solving problems, contributing solutions, and engaging with content.

## Features

- **Post & Share Coding Problems**: Users can post coding challenges for others to solve.
- **Problem Solving**: Engage with coding problems posted by others or suggested by AI.
- **AI-Driven Solution Assistance**: Get real-time assistance from an integrated AI chatbot to solve coding problems.
- **Points System**: Earn points for solving problems, providing solutions, or engaging with content.
- **Community Interaction**: Comment, share, and like posts, building a social environment for coders.
- **Leaderboard**: Track your performance with a dynamic leaderboard to compete with others.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB running locally or access to a cloud instance.
- API key for OpenAI (if using AI functionality).

### Installing

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/CodeChatter.git
    ```
2. Navigate to the project folder:
    ```bash
    cd CodeChatter
    ```
3. Install dependencies for both frontend and backend:
    ```bash
    npm install
    ```
    For the frontend:
    ```bash
    cd client
    npm install
    ```
4. Set up environment variables (create `.env` files for both the frontend and backend):
    - **Backend**: Set up your MongoDB URI and OpenAI API key.
    - **Frontend**: Set up API base URL.

5. Start the development server:
    - For backend:
    ```bash
    npm run dev
    ```
    - For frontend:
    ```bash
    npm start
    ```

### Running the Project

After starting both the frontend and backend, you can access CodeChatter by visiting `http://localhost:3000` on your browser.

### Building for Production

To build the project for production:

1. Build the frontend:
    ```bash
    cd client
    npm run build
    ```
2. Deploy both frontend and backend using your preferred cloud service (e.g., AWS, Heroku).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
