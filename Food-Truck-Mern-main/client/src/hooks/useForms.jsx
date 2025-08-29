import { useCallback, useState } from "react";

function useForms(initialState = {}) {
  const [formData, setFormData] = useState(initialState);

  // Handle input changes
  const handleChange = useCallback(
    ({ target: { name, value, type, checked, files } }) => {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value
      }));
    },
    []
  );

  // Reset form to the initial state
  const resetForm = useCallback(
    (newState = initialState) => {
      setFormData(newState);
    },
    [initialState]
  );

  // Update a specific field programmatically
  const updateField = useCallback((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return { formData, handleChange, resetForm, updateField, setFormData };
}

export default useForms;
