import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullName || item?.applicant?.name || 'N/A'}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                      {/* {item?.applicant?.profile?.resume} */}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
              <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-44 p-2 rounded-lg shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
                       {shortlistingStatus.map((status, index) => {
                          const isAccepted = status === 'Accepted';
                          return (
                            <div
                              key={index}
                              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer my-1 transition-all duration-200 font-medium hover:shadow-md hover:scale-[1.02] ${
                                isAccepted 
                                  ? 'hover:bg-gradient-to-r from-emerald-400/20 to-green-400/20 hover:text-emerald-700 border border-emerald-200/50 hover:border-emerald-300 text-emerald-800' 
                                  : 'hover:bg-gradient-to-r from-rose-400/20 to-red-400/20 hover:text-rose-700 border border-rose-200/50 hover:border-rose-300 text-rose-800'
                              }`}
                              onClick={() => statusHandler(status, item?._id)}
                            >
                              <div className={`w-3 h-3 rounded-full ${
                                isAccepted ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}></div>
                              <span>{status}</span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;