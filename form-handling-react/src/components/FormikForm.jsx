import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Formik Form Submitted:", values);
    alert("User registered successfully (Formik)!");
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-4 max-w-md mx-auto p-6 border rounded-lg shadow">
        <h2 className="text-xl font-bold">User Registration (Formik)</h2>

        <div>
          <Field
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-2 rounded"
          />
          <ErrorMessage
            name="username"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <ErrorMessage
            name="email"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <ErrorMessage
            name="password"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
}
