# Todo App

A full-stack todo list application built with Next.js and FastAPI. Features user authentication, multiple todo lists, and real-time updates.

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- JWT Authentication

### Backend
- FastAPI
- MongoDB
- Python 3.11+
- JWT Authentication

## Features

- 🔐 User authentication (login/register)
- 📝 Multiple todo lists per user
- ✅ Create, read, update, and delete todos
- 🎯 Mark todos as complete/incomplete
- 🎨 Modern, responsive UI
- 🔒 Protected routes
- 🚀 Fast API responses

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd api
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

5. Start the development servers:

   **Frontend:**
   ```bash
   npm run dev
   ```

   **Backend:**
   ```bash
   cd api
   uvicorn index:app --reload
   ```

The app will be available at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## Project Structure

```
todo-app/
├── app/           # Next.js frontend
│   ├── components/ # React components
│   ├── lib/        # Utility functions
│   └── ...
├── api/           # FastAPI backend
│   ├── routes/     # API routes
│   ├── models/     # Data models
│   └── ...
└── README.md
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/token` - Login user

### Todo Lists
- `GET /lists` - Get all lists
- `POST /lists` - Create new list
- `GET /lists/{list_id}/todos` - Get todos in list

### Todos
- `POST /lists/{list_id}/todos` - Create new todo
- `PUT /todos/{todo_id}/toggle` - Toggle todo completion
- `DELETE /todos/{todo_id}` - Delete todo

## Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

