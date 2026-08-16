import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../services/leadService";

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
        <button onClick={()=> {setEditingLead(null); setShowForm(true);}} 
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer">
                + Add Lead
            </button>
      </header>
      <main className="p-6">
        <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
            
        </div>
      </main>
    </div>
  );
};

export default Leads;
