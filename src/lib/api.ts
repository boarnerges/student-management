// lib/api.ts
export const API_BASE_URL = "https://6841a061d48516d1d35c4ea1.mockapi.io/stu";
// Fetch all students (GET)
export async function fetchStudents() {
  const res = await fetch(`${API_BASE_URL}/student`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

// Fetch single student by ID
export async function fetchStudentById(id: string) {
  const res = await fetch(`${API_BASE_URL}/student/${id}`);
  const data = await res.json();

  console.log("Status:", res.status);
  console.log("Data received:", data);

  if (!res.ok || !data || data.message || !data.id) {
    throw new Error(data.message || "Failed to fetch student");
  }

  return data;
}

// Create a new student (POST)
export async function createStudent(data: any) {
  const res = await fetch(`${API_BASE_URL}/student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create student");
  return res.json();
}

// Edit student (POST)
// Better return structure with raw response info
export async function updateStudent(id: string, data: Omit<Student, "id">) {
  try {
    const res = await fetch(`${API_BASE_URL}/student/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseBody = res.status === 204 ? null : await res.json();

    return {
      ok: res.ok,
      status: res.status,
      data: responseBody,
    };
  } catch (err) {
    console.error("Update student error:", err);
    throw err;
  }
}

// Delete student by ID
export async function deleteStudentById(id: string) {
  const res = await fetch(`${API_BASE_URL}/student/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete student");
}
