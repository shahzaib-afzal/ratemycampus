import { useState, useMemo } from "react";
import { Loader } from "@/components/ui/Loader";

export const useLoadingButton = (defaultText: string) => {
  const [loading, setLoading] = useState(false);

  const buttonContent = useMemo(() => {
    return loading ? <Loader /> : defaultText;
  }, [loading, defaultText]);

  return {
    loading,
    setLoading,
    buttonContent,
  };
};
