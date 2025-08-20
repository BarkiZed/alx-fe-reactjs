import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

export default function App() {
  return (
    <div className="p-6 flex flex-col gap-12">
      <RegistrationForm />
      <FormikForm />
    </div>
  );
}

