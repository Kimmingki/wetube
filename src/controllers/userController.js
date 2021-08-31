import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, location } = req.body;
  // req.body에서 데이터 가져와서 user 생성하기
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("remove User");
export const login = (req, res) => res.send("Login");
export const profile = (req, res) => res.send("Profile");
export const logout = (req, res) => res.send("Logout");
