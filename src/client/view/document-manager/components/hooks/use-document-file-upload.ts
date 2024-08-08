import useDocumentUpload from "@/client/components/common/hooks/use-document-upload";

export const useDocumentFileUpload = () => {
  const { data, loading, error, documentFileUpload } = useDocumentUpload();

  async function handleChange(event: any) {
    event.preventDefault();
    const file = event.target.files[0];
    documentFileUpload(file);
  }

  return {
    data,
    loading,
    error,
    handleChange,
  };
};
