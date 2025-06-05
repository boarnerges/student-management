// pages/api/students/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Student } from "@/types/student";
import { students } from "@/lib/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Student | { message: string }>
) {
  const {
    query: { id },
    method,
  } = req;

  // Find the student index by id
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  switch (method) {
    case "GET":
      // Return the found student
      return res.status(200).json(students[studentIndex]);

    case "PUT":
      // Update student details

      const { name, registrationNumber, major, dob, gpa } = req.body;

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

      // Update the student object
      students[studentIndex] = {
        ...students[studentIndex],
        name,
        registrationNumber,
        major,
        dob,
        gpa,
      };

      return res.status(200).json(students[studentIndex]);

    case "DELETE":
      // Remove the student from array
      students.splice(studentIndex, 1);
      return res.status(204).end();

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
