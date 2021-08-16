export const trending = (req, res) => res.send("Home Page Vidoes");
export const detail = (req, res) => {
  return res.send(`Watch Video #${req.params.id}`);
};
export const edit = (req, res) => res.send("Edit Video");
export const search = (req, res) => res.send("Search Video");
export const remove = (req, res) => res.send("Remove");
export const upload = (req, res) => res.send("Upload");
