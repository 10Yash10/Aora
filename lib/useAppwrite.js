import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true); // data is started to fetch

    try {
      const response = await fn();
      // console.log("Fetched data", response);
      setData(response);
    } catch (error) {
      Alert.alert("Error: Fetching Data::", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("updated data fetched");
  }, [data]);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
