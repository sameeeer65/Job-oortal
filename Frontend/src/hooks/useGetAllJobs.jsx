import { setAllJobs } from "@/redux/jobSlice";
import { toast } from "sonner";

import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchedQuery } = useSelector((store) => store.jobs);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", res.data);
        dispatch(setAllJobs(res.data.jobs || []));
        if (!res.data.jobs || res.data.jobs.length === 0) {
          toast.info("No jobs available");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery]);

  const allJobs = useSelector((store) => store.jobs.allJobs);
  return { loading, error, allJobs };
};

export default useGetAllJobs;
