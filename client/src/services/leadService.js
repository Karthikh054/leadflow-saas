import api from "./api"

export const getLeads = async({
    page = 1,
    limit = 10,
    search = '',
    status = '',
    source = '',
    assignedTo = '',
})=> {
    const response = await api.get("/leads", {
        params: {
            page,
            limit,
            search,
            status,
            source,
            assignedTo
        },
    });
    return response.data;
};

export const createLead = async (leadData) => {
    const response = await api.post('/leads', leadData);

    return response.data;
};

export const updateLead = async (id, data) => {
    const response = await api.put(`/leads/${id}`, data);

    return response.data;
};

export const deleteLead = async(id) => {
    const response = await api.delete(`/leads/${id}`);

    return response.data;
}