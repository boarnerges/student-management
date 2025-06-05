import {
  Button,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Student } from "@/types/student";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export interface StudentFormProps {
  initialData?: Student;
  onSubmit: (student: Omit<Student, "id">) => Promise<void>;
  isEditing?: boolean;
}

export const StudentForm = ({ initialData, onSubmit }: StudentFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState<Omit<Student, "id">>({
    name: "",
    registrationNumber: "",
    dob: "",
    major: "",
    gpa: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setForm(rest);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "gpa" ? parseFloat(value) : value,
    }));

    // Clear the error as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required.";
    if (!form.dob) newErrors.dob = "Date of birth is required.";
    if (!form.major) newErrors.major = "Major is required.";
    if (form.gpa === undefined || isNaN(form.gpa)) {
      newErrors.gpa = "GPA must be a number.";
    } else if (form.gpa < 0 || form.gpa > 4) {
      newErrors.gpa = "GPA must be between 0.0 and 4.0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>
            {initialData ? "Edit Student" : "Create Student"}
          </Fieldset.Legend>
          <Fieldset.HelperText>
            {initialData
              ? "Update student information below."
              : "Fill in details to create a new student."}
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <Text color="red.500">{errors.name}</Text>}
          </Field.Root>

          <Field.Root>
            <Field.Label>Registration Number</Field.Label>
            <Input
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
            />
            {errors.registrationNumber && (
              <Text color="red.500">{errors.registrationNumber}</Text>
            )}
          </Field.Root>

          <Field.Root>
            <Field.Label>Date of Birth</Field.Label>
            <Input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
            {errors.dob && <Text color="red.500">{errors.dob}</Text>}
          </Field.Root>

          <Field.Root>
            <Field.Label>Major</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                name="major"
                value={form.major}
                onChange={handleChange}
              >
                <option value="">Select a major</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Engineering">Engineering</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Economics">Economics</option>
                <option value="Psychology">Psychology</option>
                <option value="History">History</option>
                <option value="Business Administration">
                  Business Administration
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Environmental Science">
                  Environmental Science
                </option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {errors.major && <Text color="red.500">{errors.major}</Text>}
          </Field.Root>

          <Field.Root>
            <Field.Label>GPA</Field.Label>
            <Input
              name="gpa"
              type="number"
              step="0.01"
              value={form.gpa}
              onChange={handleChange}
            />
            {errors.gpa && <Text color="red.500">{errors.gpa}</Text>}
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start" mt={4} colorScheme="teal">
          {initialData ? "Update Student" : "Create Student"}
        </Button>
      </Fieldset.Root>
    </form>
  );
};
