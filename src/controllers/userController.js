import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  // password가 같은지 확인
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }

  // 이미 사용중인 데이터 알림
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("join", {
      pageTitle,
      errorMessage: "This username or email is already taken.",
    });
  }
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
