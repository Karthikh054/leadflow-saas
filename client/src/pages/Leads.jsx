import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../services/leadService";
import LeadForm from "../components/LeadForm";

const Leads = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [source, setSource] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingLead, setEditingLead] = useState(null);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["leads", { page, search, status, source }],
    queryFn: () => getLeads({ page, limit: 10, search, status, source }),
    placeholderData: (previousData) => previousData,
  });

  const createMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient: invalidateQuires({
        queryKey: ["leads"],
      });

      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      queryClient: invalidateQuires({
        queryKey: ["leads"],
      });

      setEditingLead(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient: invalidateQuires({
        queryKey: ["leads"],
      });
    },
  });

  const handleCreate = (formData) => {
    createMutation.mutate(formData);
  };

  const handleUpdate = (formData) => {
    updateMutation.mutate({
      id: editingLead._id,
      data: formData,
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure want to delete this lead?");
    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  const leads = data?.leads || [];

  const pagination = data?.pagination || {};

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your sales leads</p>
        </div>
        <button
          onClick={() => {
            setEditingLead(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer"
        >
          + Add Lead
        </button>
      </header>
      <main className="p-6">
        <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-col-3">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search leads.."
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">All Statuses</option>

              <option value="new">New</option>

              <option value="contacted">Contacted</option>

              <option value="qualified">Qualified</option>

              <option value="proposal">Proposal</option>

              <option value="won">Won</option>

              <option value="lost">Lost</option>
            </select>
            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">All Sources</option>

              <option value="website">Website</option>

              <option value="facebook">Facebook</option>

              <option value="instagram">Instagram</option>

              <option value="google">Google</option>

              <option value="referral">Referral</option>

              <option value="whatsapp">WhatsApp</option>

              <option value="other">Other</option>
            </select>
          </div>
        </div>
        {showForm && (
          <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">Create New Lead</h2>
            <LeadForm
              onSubmit={handleCreate}
              loading={createMutation.isPending}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}
        {editingLead && (
          <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">Edit Lead</h2>
            <LeadForm
              lead={editingLead}
              onSubmit={handleUpdate}
              loading={updateMutation.isPending}
              onCancel={() => setEditingLead(null)}
            />
          </div>
        )}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {isLoading ? (
            <div className="p-10 text-center text-gray-500">
              Loading leads...
            </div>
          ) : isError ? (
            <div className="p-10 text-center text-red-500">
              Failed to load leads.
            </div>
          ) : leads.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No leads found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Lead
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Company
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Source
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Value
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {lead.name}
                        </div>

                        <div className="text-sm text-gray-500">
                          {lead.email || "-"}
                        </div>

                        <div className="text-sm text-gray-500">
                          {lead.phone || "-"}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {lead.company || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize">
                          {lead.source}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                          {lead.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium">
                        ₹
                        {Number(lead.expectedValue || 0).toLocaleString(
                          "en-IN",
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setShowForm(false);
                            setEditingLead(lead);
                          }}
                          className="mr-3 text-sm font-medium text-blue-600 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(lead._id)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isFetching && !isLoading && (
            <div className="border-t px-6 py-2 text-right text-xs text-gray-400">
              Updating...
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {pagination.page || 1} of {pagination.totalPages || 1}
          </p>

          <div className="flex gap-2">
            <button
              disabled={!pagination.hasPreviousPage}
              onClick={() => setPage((previous) => Math.max(previous - 1, 1))}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((previous) => previous + 1)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leads;
