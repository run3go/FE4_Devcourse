// 필요한 라이브러리 불러오기
const express = require("express"); // Express.js 모듈
const jwt = require("jsonwebtoken"); // JSON Web Token 모듈
const bcrypt = require("bcryptjs"); // 비밀번호 해싱을 위한 bcryptjs 모듈
const cookieParser = require("cookie-parser"); // 쿠키 파싱을 위한 미들웨어
const cors = require("cors"); // CORS (Cross-Origin Resource Sharing) 미들웨어

// Express 앱 생성
const app = express();

// CORS 설정 (클라이언트와 서버가 다른 도메인일 때 필요한 설정)
const corsOptions = {
  origin: "http://localhost:5173", // 클라이언트의 도메인 설정
  credentials: true, // 인증 정보를 쿠키에 담아 보내는 것을 허용
};

// CORS 미들웨어 사용
app.use(cors(corsOptions));

// JSON 형식의 요청 본문을 파싱하기 위한 미들웨어 사용
app.use(express.json());
// 쿠키를 파싱하기 위한 미들웨어 사용
app.use(cookieParser());

// Secret keys (토큰을 서명할 때 사용하는 비밀 키들)
const ACCESS_TOKEN_SECRET = "your_access_token_secret"; // 액세스 토큰을 서명할 때 사용
const REFRESH_TOKEN_SECRET = "your_refresh_token_secret"; // 리프레시 토큰을 서명할 때 사용

// Mock database (가상의 데이터베이스, 실제로는 DB를 사용해야 함)
const users = []; // { id, username, password, refreshToken } 형태로 사용자 정보를 저장

// Middleware: 액세스 토큰 검증 미들웨어
function authenticateToken(req, res, next) {
  // 요청 헤더에서 'Authorization' 정보를 가져옴
  const authHeader = req.headers["authorization"];
  // 'Bearer <token>' 형태로 되어 있으므로 공백을 기준으로 토큰을 분리
  const token = authHeader && authHeader.split(" ")[1];

  // 토큰이 없으면 401 상태 코드로 응답
  if (!token) return res.status(401).json({ message: "Access token required" });

  // jwt.verify()를 사용하여 토큰의 유효성을 검사
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" }); // 유효하지 않거나 만료된 토큰일 경우 403 상태 코드
    req.user = user; // 유효한 토큰이라면, 사용자 정보를 요청 객체에 저장
    next(); // 다음 미들웨어로 이동
  });
}

// 로그인 처리 라우트
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 사용자 배열에서 요청된 username을 가진 사용자 찾기
  const user = users.find((u) => u.username === username);

  // 사용자나 비밀번호가 맞지 않으면 400 상태 코드로 응답
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // 액세스 토큰과 리프레시 토큰 생성
  const accessToken = jwt.sign(
    { username: user.username, id: user.id },
    ACCESS_TOKEN_SECRET, // 서명할 비밀 키
    { expiresIn: "3s" } // 액세스 토큰의 만료 시간 (5초)
  );

  const refreshToken = jwt.sign(
    { username: user.username, id: user.id },
    REFRESH_TOKEN_SECRET // 서명할 비밀 키
  );

  // 사용자의 리프레시 토큰을 데이터베이스에 저장
  user.refreshToken = refreshToken;

  // 클라이언트에 리프레시 토큰을 쿠키로 전달 (httpOnly 설정으로 JavaScript에서 접근 불가)
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  // 액세스 토큰을 JSON 응답으로 전달
  res.json({ accessToken });
});

// 로그아웃 처리 라우트
app.post("/logout", (req, res) => {
  const { refreshToken } = req.cookies;

  // 리프레시 토큰이 없으면 204 상태 코드로 응답
  if (!refreshToken) return res.status(204).send();

  // 리프레시 토큰을 가진 사용자를 찾고, 해당 사용자의 리프레시 토큰을 무효화
  const user = users.find((u) => u.refreshToken === refreshToken);
  if (user) user.refreshToken = null; // 리프레시 토큰 무효화

  // 클라이언트에 저장된 리프레시 토큰 쿠키 삭제
  res.clearCookie("refreshToken");
  res.status(204).send();
});

// 리프레시 토큰을 이용해 새로운 액세스 토큰 발급
app.post("/token", (req, res) => {
  const { refreshToken } = req.cookies;

  // 리프레시 토큰이 없으면 401 상태 코드로 응답
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  // 리프레시 토큰의 유효성 검사
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });

    // 리프레시 토큰을 가진 사용자가 데이터베이스에 존재하는지 확인
    const storedUser = users.find((u) => u.refreshToken === refreshToken);
    if (!storedUser)
      return res.status(403).json({ message: "Invalid refresh token" });

    // 새로운 액세스 토큰을 생성
    const accessToken = jwt.sign(
      { username: user.username, id: user.id },
      ACCESS_TOKEN_SECRET, // 서명할 비밀 키
      { expiresIn: "3s" } // 액세스 토큰의 만료 시간 (5초)
    );
    res.json({ accessToken });
  });
});

// 보호된 라우트: 사용자 정보 가져오기
app.get("/user", authenticateToken, (req, res) => {
  // 요청된 사용자 ID에 맞는 사용자 찾기
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // 사용자 정보를 JSON 형태로 응답
  res.json({ id: user.id, username: user.username });
});

// 회원가입 처리 라우트
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // 이미 존재하는 사용자명이 있으면 400 상태 코드로 응답
  if (users.some((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 새로운 사용자 객체 생성
  const newUser = {
    id: users.length + 1, // 간단한 사용자 ID 부여 (실제 DB에서는 자동 증가)
    username,
    password: hashedPassword, // 해시된 비밀번호 저장
    refreshToken: null, // 리프레시 토큰은 처음에는 없음
  };

  // 사용자 목록에 새로운 사용자 추가
  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

// 서버 실행
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
