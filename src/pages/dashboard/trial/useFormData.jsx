import { useEffect } from "react";

export const useFormData = (formData, setFormData, flattenedData, checkAndHideParent) => {
  console.log('formData', formData)
  useEffect(() => {
    formData.forEach((f) => {
      checkAndHideParent(f.parentName);
    });
  }, [formData, checkAndHideParent]);

  const handleOnChange = (
    id,
    type,
    value,
    opening_balance,
    debit,
    credit,
    closing_balance,
    name,
    parentName,
    masterHead

  ) => {
    const index = formData.findIndex((item) => item.id === id);

    const formDataObj = {
      id,
      head: type === "head" ? value : formData[index]?.head || "",
      child: type === "child" ? value : formData[index]?.child || "",
      opening_balance,
      debit,
      credit,
      closing_balance,
      name,
      parentName,
      masterHead
    };

    if (index !== -1) {
      const updatedFormData = [...formData];
      updatedFormData[index] = formDataObj;
      setFormData(updatedFormData);
    } else {
      setFormData((prevFormData) => [...prevFormData, formDataObj]);
    }
  };

  return { formData, handleOnChange };
};
