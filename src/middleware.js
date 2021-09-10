import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  // 템플릿과 미들웨어가 res.locals를 공유하기 때문에 locals에 유저 정보를 입력
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

// 로그인 하지 않은 유저가 접근하지 못하도록
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인 유저가 접근하지 못하도록
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadFiles = multer({
  dest: "uploads/",
});
