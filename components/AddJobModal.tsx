"use client";

import { useState, useTransition } from "react";
import { createJob } from "@/app/actions";
import { JobStatus, STATUS_LABELS } from "@/lib/types";
import { X, Loader2, Plus } from "lucide-react";

export function AddJobModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      companyName: formData.get("companyName") as string,
      position: formData.get("position") as string,
      jobLink: formData.get("jobLink") as string || null,
      salary: formData.get("salary") as string || null,
      location: formData.get("location") as string || null,
      status: formData.get("status") as any,
      notes: formData.get("notes") as string || null,
      interviewDate: formData.get("interviewDate") as string || null,
    };

    startTransition(async () => {
      try {
        await createJob(data);
        setIsOpen(false);
      } catch (error) {
        alert("Failed to create job application.");
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Add Application</span>
        <span className="sm:hidden">Add</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Add New Application</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name *</label>
                  <input required id="companyName" name="companyName" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Google" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="position" className="text-sm font-medium text-gray-700">Position *</label>
                  <input required id="position" name="position" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Frontend Engineer" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="status" className="text-sm font-medium text-gray-700">Status *</label>
                  <select required id="status" name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" defaultValue="APPLIED">
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="location" className="text-sm font-medium text-gray-700">Location (Optional)</label>
                  <input id="location" name="location" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Remote, NY" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="salary" className="text-sm font-medium text-gray-700">Salary (Optional)</label>
                  <input id="salary" name="salary" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. $120k - $140k" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="interviewDate" className="text-sm font-medium text-gray-700">Interview Date (Optional)</label>
                  <input id="interviewDate" name="interviewDate" type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="jobLink" className="text-sm font-medium text-gray-700">Job Link (Optional)</label>
                <input id="jobLink" name="jobLink" type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="https://..." />
              </div>

              <div className="space-y-1">
                <label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes (Optional)</label>
                <textarea id="notes" name="notes" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Any specific details about this application..." />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" disabled={isPending}>
                  Cancel
                </button>
                <button type="submit" disabled={isPending} className="flex items-center px-4 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}