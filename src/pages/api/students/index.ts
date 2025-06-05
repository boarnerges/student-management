// pages/api/students/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Student } from "@/types/student";
import { students } from "@/lib/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Student[] | Student | { message: string }>
) {
  if (req.method === "GET") {
    // Return all students
    res.status(200).json(students);
  } else if (req.method === "POST") {
    // Add a new student

    const { name, registrationNumber, major, dob, gpa } = req.body;

    // Simple server-side validation
    if (
      !name ||
      !registrationNumber ||
      !major ||
      !dob ||
      typeof gpa !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "Missing or invalid fields in request body." });
    }

    // Generate a new ID - simple example using timestamp
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      registrationNumber,
      major,
      dob,
      gpa,
    };

    students.push(newStudent); // Update in-memory DB

    res.status(201).json(newStudent);
  } else {
    // Method Not Allowed
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
