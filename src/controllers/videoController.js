import Video from "../models/Video";

/* callback
  Video.find({}, (error, videos) => {
    if(error) {
      return res.render("server-error");
    }
    return res.render("home", { pageTitle: "Home", videos });
  })
*/

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  return res.render("watch", { pageTitle: `Watching: ${video.title}` });
};
export const getEdit = (req, res) => {
  return res.render("edit", { pageTitle: `Editing: ${video.title}` });
};
export const postEdit = (req, res) => {
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload` });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  await Video.create({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags
      .split(",")
      .map((word) => `#${word}`)
      .map((word) => word.trim()),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  return res.redirect("/");
};
