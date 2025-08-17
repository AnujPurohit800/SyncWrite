import Document from "../schema/document.js";
import crudRepository from "./crudRepository.js";

const documentRepository = {
  ...crudRepository(Document),
  getByOwnerOrCollaborator: async function (userId, limit = 10, offset = 0) {
    const documents = await Document.find({
      $or: [
        { owner: userId },
        { collaborators: { $elemMatch: { user: userId } } },
      ],
    })
      .populate("owner", "username email")
      .populate("collaborators.user", "username email")
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    return documents;
  },
};

export default documentRepository;
