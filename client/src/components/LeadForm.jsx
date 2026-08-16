import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "other",
  expectedValue: "",
  notes: "",
};

const LeadForm = ({ lead = null, onSubmit, loading = false, onCancel }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        source: lead.source || "other",
        expectedValue: lead.expectedValue || "",
        notes: lead.notes || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      expectedValue: Number(form.expectedValue) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Lead Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Lead Name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="ABC Technologies"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Source</label>
          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="website">Website</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="google">Google</option>
            <option value="referral">Referral</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="new">New</option>

            <option value="contacted">Contacted</option>

            <option value="qualified">Qualified</option>

            <option value="proposal">Proposal</option>

            <option value="won">Won</option>

            <option value="lost">Lost</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Expected Value
          </label>

          <input
            type="number"
            name="expectedValue"
            value={form.expectedValue}
            onChange={handleChange}
            placeholder="50000"
            min="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Notes</label>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Add notes about this lead..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : lead ? "Update Lead" : "Create Lead"}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
