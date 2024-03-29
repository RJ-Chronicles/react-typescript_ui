import { useEffect, useState } from "react";

interface ApiCallResult<T> {
  data: T | null;
}

const useApiCall = <T, P>(
  apiFunction: (params: P) => Promise<T>,
  params: P
): ApiCallResult<T> => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchData = async () => {
      try {
        const response = await apiFunction(params);
        if (isMounted) {
          setData(response);
        }
      } catch (error) {
        if (isMounted && error instanceof Error) {
          // Handle error if needed
        }
      } finally {
        // Any cleanup code if needed
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiFunction, params]);

  return { data };
};

export default useApiCall;
