import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux';

const AppliedJob = () => {
    const { allAppliedJobs } = useSelector((store) => store.jobs);
  return (
    <div>
    <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>
   <TableHeader>
    <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
   </TableHeader>
     <TableBody>
          {(!allAppliedJobs || allAppliedJobs.length <= 0) ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-32">You have not applied any job yet.</TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt ? appliedJob.createdAt.split("T")[0] : 'N/A'}</TableCell>
                <TableCell>{appliedJob.job?.title || 'N/A'}</TableCell>
                <TableCell>{appliedJob.job?.company?.name || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 rounded-full font-medium shadow-lg transition-all duration-200 hover:scale-105 text-white ${
                      appliedJob?.status === "rejected"
                        ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-red-300/50 hover:shadow-red-400/70 hover:from-red-600"
                        : appliedJob?.status === "accepted"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-300/50 hover:shadow-emerald-400/70 hover:from-emerald-600"
                        : "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-300/50 hover:shadow-gray-400/70 hover:from-gray-500"
                    }`}
                  >
                    {appliedJob?.status || 'Pending'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
    </Table>
    </div>
  )
}

export default AppliedJob
