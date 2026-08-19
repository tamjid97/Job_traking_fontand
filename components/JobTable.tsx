"use client";

import { useTransition, useState } from "react";
import { Job, JobStatus, STATUS_LABELS, STATUS_STYLES } from "@/lib/types";
import { updateJobStatus, deleteJob } from "@/app/actions";
import { MoreVertical, Trash2, ExternalLink, Calendar, MapPin, DollarSign, Loader2 } from "lucide-react";

interface JobTableProps {
  jobs: Job[];
}

export function JobTable({ jobs }: JobTableProps) {
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: JobStatus) => {
    setLoadingId(id);
    startTransition(async () => {
      try {
        await updateJobStatus(id, newStatus);
      } finally {
        setLoadingId(null);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job application?")) {
      setLoadingId(id);
      startTransition(async () => {
        try {
          await deleteJob(id);
        } finally {
          setLoadingId(null);
        }
      });
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
        <p className="text-gray-500">Add your first job application to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Mobile view (Cards) */}
      <div className="block md:hidden">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border-b border-gray-100 last:border-0 relative">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{job.position}</h4>
                <p className="text-sm text-gray-600">{job.companyName}</p>
              </div>
              <button onClick={() => handleDelete(job.id)} disabled={isPending && loadingId === job.id} className="text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                {isPending && loadingId === job.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {job.location && (
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {job.location}
                </div>
              )}
              {job.salary && (
                <div className="flex items-center text-xs text-gray-500">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {job.salary}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value as JobStatus)}
                disabled={isPending && loadingId === job.id}
                className={`text-sm rounded-full px-3 py-1 font-medium border-0 ring-1 ring-inset ${STATUS_STYLES[job.status]} appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none`}
              >
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key} className="bg-white text-gray-900">
                    {label}
                  </option>
                ))}
              </select>
              
              {job.jobLink && (
                <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  Link <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-4">Company & Position</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date & Location</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{job.position}</div>
                  <div className="text-gray-500">{job.companyName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative inline-block">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value as JobStatus)}
                      disabled={isPending && loadingId === job.id}
                      className={`text-xs rounded-full px-2.5 py-1 font-medium border-0 ring-1 ring-inset ${STATUS_STYLES[job.status]} appearance-none pr-8 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none min-w-[110px]`}
                    >
                      {Object.entries(STATUS_LABELS).map(([key, label]) => (
                        <option key={key} value={key} className="bg-white text-gray-900">
                          {label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      {isPending && loadingId === job.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <MoreVertical className="w-3 h-3" />}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <div className="flex items-center mb-1">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {job.interviewDate ? new Date(job.interviewDate).toLocaleDateString() : 'N/A'}
                  </div>
                  {job.location && (
                    <div className="flex items-center text-xs">
                      <MapPin className="w-3.5 h-3.5 mr-1.5" />
                      {job.location}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {job.salary || '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-3">
                    {job.jobLink && (
                      <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" title="View Job Link">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(job.id)}
                      disabled={isPending && loadingId === job.id}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Application"
                    >
                      {isPending && loadingId === job.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
