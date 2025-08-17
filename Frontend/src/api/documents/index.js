import axios from "../../config/axiosConfig";

export const createDocumentRequest = async (content, title, token) => {
  try {
    const response = await axios.post(
      "/documents/",
      {
        title: title || "Untitled Document",
      },
      {
        headers: {
          "x-access-header": token,
        },
      }
    );
    console.log("Document created successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};
export const getAllDocumentsRequest = async (token, limit = 10, offset = 0) => {
  try {
    const response = await axios.get(`/documents/`, {
      params: { offset, limit },
      headers: {
        "x-access-header": token,
      },
    });

    console.log("Documents fetched successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching documents:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteDocumentRequest = async (documentId, token) => {
  try {
    const response = await axios.delete(`/documents/${documentId}`, {
      headers: {
        "x-access-header": token,
      },
    });

    console.log("Document deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const updateDocumentRequest = async (documentId, data, token) => {
  try {
    const response = await axios.put(
      `/documents/${documentId}`,
      {
        title: data.title || "Untitled Document",
        content: data.content || "",
        collaborators: data.collaborators || [],
      },
      {
        headers: {
          "x-access-header": token,
        },
      }
    );

    console.log("Document updated successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};
