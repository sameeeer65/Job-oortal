import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.jobs);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  console.log("COMPANIES", companies);
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <span>No Job Added</span>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
    <PopoverContent className="w-40 p-1.5 rounded-lg shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
      <div
        onClick={() => navigate(`/admin/companies/${job._id}`)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer mb-1 hover:bg-gradient-to-r from-emerald-400/20 to-green-400/20 hover:text-emerald-700 hover:shadow-sm transition-all duration-200 hover:scale-[1.01] border border-emerald-200/50 hover:border-emerald-300"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="font-medium text-sm">Edit</span>
      </div>
      <hr className="border-gray-300 mx-1 my-1" />
      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gradient-to-r from-blue-400/20 to-indigo-400/20 hover:text-blue-700 hover:shadow-sm transition-all duration-200 hover:scale-[1.01] border border-blue-200/50 hover:border-blue-300">
        <Eye className="w-3.5 h-3.5" />
        <span className="font-medium text-sm">Applicants</span>
      </div>
    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
