import {
  Box,
  Button,
  Card,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Student } from "@/types/student";
import { useState, useEffect } from "react";

export interface StudentFormProps {
  initialData?: Student;
  onSubmit: (student: Omit<Student, "id">) => Promise<void>;
  isEditing?: boolean;
}

type StudentFormState = Omit<Student, "id" | "gpa"> & {
  gpa: string;
};

export const StudentForm = ({ initialData, onSubmit }: StudentFormProps) => {
  const [form, setForm] = useState<StudentFormState>({
    name: "",
    registrationNumber: "",
    dob: "",
    major: "",
    gpa: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  useEffect(() => {
    if (initialData) {
      const { gpa, ...rest } = initialData;
      setForm({
        ...rest,
        gpa: gpa === undefined || gpa === null ? "" : String(gpa),
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
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

    const gpa = Number(form.gpa);
    if (form.gpa.trim() === "" || Number.isNaN(gpa)) {
      newErrors.gpa = "GPA must be a number.";
    } else if (gpa < 0 || gpa > 4) {
      newErrors.gpa = "GPA must be between 0.0 and 4.0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        name: form.name.trim(),
        registrationNumber: form.registrationNumber.trim(),
        major: form.major.trim(),
        gpa: Number(form.gpa),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card.Root maxW="3xl" borderRadius="lg">
        <Card.Body p={{ base: 5, md: 8 }}>
          <Fieldset.Root size="lg">
            <Stack mb={4}>
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
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
                <Field.Root invalid={Boolean(errors.name)}>
                  <Field.Label>Name</Field.Label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Student full name"
                    size="lg"
                  />
                  {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                </Field.Root>

                <Field.Root invalid={Boolean(errors.registrationNumber)}>
                  <Field.Label>Registration Number</Field.Label>
                  <Input
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    placeholder="REG20260001"
                    size="lg"
                  />
                  {errors.registrationNumber && (
                    <Field.ErrorText>{errors.registrationNumber}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={Boolean(errors.dob)}>
                  <Field.Label>Date of Birth</Field.Label>
                  <Input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    size="lg"
                  />
                  {errors.dob && <Field.ErrorText>{errors.dob}</Field.ErrorText>}
                </Field.Root>

                <Field.Root invalid={Boolean(errors.major)}>
                  <Field.Label>Major</Field.Label>
                  <NativeSelect.Root size="lg">
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
                  {errors.major && <Field.ErrorText>{errors.major}</Field.ErrorText>}
                </Field.Root>
              </SimpleGrid>

              <Box mt={5} maxW={{ base: "100%", md: "calc(50% - 10px)" }}>
                <Field.Root invalid={Boolean(errors.gpa)}>
                  <Field.Label>GPA</Field.Label>
                  <Input
                    name="gpa"
                    type="number"
                    step="0.01"
                    min={0}
                    max={4}
                    value={form.gpa}
                    onChange={handleChange}
                    placeholder="3.75"
                    size="lg"
                  />
                  <Field.HelperText>Enter a value from 0.00 to 4.00.</Field.HelperText>
                  {errors.gpa && <Field.ErrorText>{errors.gpa}</Field.ErrorText>}
                </Field.Root>
              </Box>
            </Fieldset.Content>

            <Button
              type="submit"
              alignSelf="flex-start"
              mt={6}
              colorPalette="teal"
              loading={submitting}
            >
              {initialData ? "Update Student" : "Create Student"}
            </Button>
          </Fieldset.Root>
        </Card.Body>
      </Card.Root>
    </form>
  );
};
