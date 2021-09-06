export const localsMiddleware = (req, res, next) => {
  // 템플릿과 미들웨어가 res.locals를 공유하기 때문에 locals에 유저 정보를 입력
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
