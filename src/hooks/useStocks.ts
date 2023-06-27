import { useQuery } from "react-query";
import { DataRow } from "../types";
import axios from "axios";

// Fetch Stocks Belonging to a Session and Operator
export const useStocks = (sessionName: string, operatorName: string) => {
  return useQuery<DataRow[], Error>(
    ["stocks", sessionName, operatorName],
    async () => {
      const { data } = await axios.get<DataRow[]>(
        "http://localhost:8081/stocks/operator",
        {
          params: {
            sessionName: encodeURIComponent(sessionName as string),
            operatorName: operatorName,
          },
        }
      );
      return data;
    },
    {
      retry: (_failureCount, error) => {
        // Retry only if there's an error
        return error ? true : false;
      },
      retryOnMount: false,
      staleTime: Infinity,
    }
  );
};
