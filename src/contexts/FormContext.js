import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  
  // Form data that is needed to send question generetion request.
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    materialText: "",
    highlightsNGuidelines: "",
    complexity: "medium",
    questionsAmount: 5,
    questionType: "openEnded",
  });

  // Handle each change with respect to the form data.
  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, handleFormChange }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);