import type { NextApiRequest, NextApiResponse } from "next";
import { Student } from "@/types/student";
import { API_BASE_URL } from "@/lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Student | { message: string }>
) {
  const {
    query: { id },
    method,
  } = req;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid or missing student ID." });
  }

  try {
    switch (method) {
      case "GET": {
        // Fetch the student from the external API
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (response.status === 404) {
          return res.status(404).json({ message: "Student not found" });
        }
        if (!response.ok) {
          return res
            .status(response.status)
            .json({ message: "Failed to fetch student" });
        }
        const student: Student = await response.json();
        return res.status(200).json(student);
      }

      case "PUT": {
        // Validate the incoming data
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

        // Send PUT request to update the student remotely
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, registrationNumber, major, dob, gpa }),
        });

        if (!response.ok) {
          return res
            .status(response.status)
            .json({ message: "Failed to update student" });
        }

        const updatedStudent: Student = await response.json();
        return res.status(200).json(updatedStudent);
      }

      case "DELETE": {
        // Send DELETE request to remove the student remotely
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          return res
            .status(response.status)
            .json({ message: "Failed to delete student" });
        }

        return res.status(204).end();
      }

      default: {
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ message: `Method ${method} Not Allowed` });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
