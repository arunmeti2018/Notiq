# Notiqq - Note Taking Application

## Overview

Notiqq is a modern note-taking web application built with Node.js and Express.js. It provides a secure and efficient platform for users to create, manage, and organize their notes with support for markdown formatting and AI-powered note generation.

## Features

- Create and edit notes with markdown support
- Secure user authentication and authorization
- Responsive design for all devices
- Search functionality for notes
- File upload and attachment support
- Clean and intuitive user interface
- XSS protection and security measures
- AI-powered note generation and summarization
- Smart note templates and suggestions
- Automatic note categorization

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript)
- **Database**: MongoDB with Mongoose
- **Authentication**: Express Session, bcryptjs
- **File Handling**: Multer
- **Markdown Processing**: Marked
- **Security**: DOMPurify

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/notiqq.git
cd notiqq
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

4. Start the application:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── public/          # Static files (CSS, JS, images)
├── views/           # EJS templates
├── routes/          # Route handlers
├── models/          # Database models
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── scripts/         # Build and utility scripts
└── server.js        # Application entry point
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout

### Notes

- `GET /notes` - Get all notes
- `POST /notes` - Create a new note
- `GET /notes/:id` - Get a specific note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

### AI Generation

- `POST /notes/generate` - Generate a new note from prompt
- `POST /notes/summarize` - Summarize existing note
- `POST /notes/categorize` - Auto-categorize note content
- `POST /notes/template` - Apply smart template to note

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- All user inputs are sanitized using DOMPurify
- Passwords are hashed using bcryptjs
- Session management with secure cookies
- XSS protection implemented

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.


## AI Note Generation Features

### Smart Note Creation

- Generate notes from text prompts
- Convert audio recordings to text notes
- Summarize long documents automatically
- Create structured notes from unstructured content

### Templates and Suggestions

- Pre-built note templates for different use cases
- Smart suggestions for note organization
- Automatic tagging and categorization
- Content recommendations based on note context

### Integration

- Seamless integration with existing note system
- Real-time generation and updates
- Batch processing for multiple notes
- Export options for generated content
