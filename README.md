# Student Management App

A simple student management web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Mock API integration**. It allows you to view, add, update, and delete student records.

---

## Features

- List all students
- View student details
- Add new student
- Update student information
- Delete student
- Supports both local (in-memory) and remote (MockAPI) data sources

---

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MockAPI](https://mockapi.io/)
- RESTful API (via Next.js API routes and/or MockAPI)

---

## Folder Structure

├── pages/
│ ├── index.tsx # Homepage (redirects to /students or lists them)
│ └── students/
│ ├── index.tsx # List students
│ └── [id].tsx # View/edit individual student
│
├── pages/api/students/ # Next.js API routes
│ ├── index.ts # GET (all students) / POST (new student)
│ └── [id].ts # GET, PUT, DELETE for a student
│
├── lib/
│ ├── db.ts # In-memory student data
│ └── api.ts # API base URL config
│
├── types/
│ └── student.ts # Student type definition
│
├── styles/
│ └── globals.css # Global styles with Tailwind CSS

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/boarnerges/student-management.git
cd student-management
```

2. Install Dependencies
   Make sure you have Node.js (>=18) installed.

npm install

# or

yarn install

3. Run the Development Server
   npm run dev

# or

yarn dev

# Mock API Integration

The project uses MockAPI to simulate a real backend.

If you want to switch from local in-memory data (lib/db.ts) to remote API, update the fetch logic to use this URL:
https://6841a061d48516d1d35c4ea1.mockapi.io/stu/student
The base URL is already abstracted in lib/api.ts:
export const API_BASE_URL = "https://6841a061d48516d1d35c4ea1.mockapi.io/stu/student";

# Development Approach

This project was built with the following in mind:

Modular Codebase: Components and API routes are split logically.

Type Safety: TypeScript interfaces define the student data shape.

UI-first Thinking: TailwindCSS enables fast UI prototyping.

Progressive Enhancement: Started with local mock DB, easily extendable to real APIs.

Separation of Concerns: API logic, types, styles, and components are modular and well-separated.

# Future Improvements

Add form validation (with libraries like react-hook-form or zod)

Integrate persistent database (MongoDB or Supabase)

Add authentication for protected actions

Add pagination to student list

# Contributions

Feel free to fork the repo, open issues, or submit PRs!
