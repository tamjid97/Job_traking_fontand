"use client";

import { Job } from "@/lib/types";
import { StatsHeader } from "./StatsHeader";
import { JobTable } from "./JobTable";
import { AddJobModal } from "./AddJobModal";
import { BriefcaseBusiness } from "lucide-react";

interface JobDashboardProps {
  initialJobs: Job[];
}

export function JobDashboard({ initialJobs }: JobDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
              <BriefcaseBusiness className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Job Tracker</h1>
              <p className="text-sm text-gray-500 font-medium mt-0.5">Manage your applications</p>
            </div>
          </div>
          <AddJobModal />
        </header>

        {/* Stats */}
        <StatsHeader jobs={initialJobs} />

        {/* Main content area */}
        <main>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
          </div>
          
          <JobTable jobs={initialJobs} />
        </main>

      </div>
    </div>
  );
}