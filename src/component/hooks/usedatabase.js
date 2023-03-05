import { useCallback, useState } from "react";

const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks =  useCallback(async (requestData, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method ? requestData.method : "GET",
        body: requestData.body ? JSON.stringify(requestData.body) : null,
        headers: requestData.headers ? requestData.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, fetchTasks };
};

export default useDatabase;
