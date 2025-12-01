const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const response = require("./response");

// route
const userRoutes = require("./routes/userRoutes");
const poliRoutes = require("./routes/poliRoutes");
const dokterRoutes = require("./routes/dokterRoutes");
const antrianRoutes = require("./routes/antrianRoutes");
const kuotaRoutes = require("./routes/koutaRoutes");
const pasienRoutes = require("./routes/pasienRoutes")
const adminRoutes = require("./routes/adminRoutes")
const beritaRoutes = require("./routes/beritaRoutes")
const apotkerRoutes = require("./routes/apotekerRoutes")
const konsultasiRoutes = require("./routes/konsultasiRoutes")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  // buuuuug anj
  socket.onAny((event, data) => {
    console.log("📩 EVENT MASUK:", event, data);
  });

  socket.on("join_room", (room) => {
    console.log(`📌 User ${socket.id} JOIN ROOM: ${room}`);
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});



// io.on("connection", (socket) => {
//   console.log("✅ Client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => {
  response(200, "SUCCESS", "Connected", res);
});
app.use("/api/users", userRoutes);
app.use("/api/poli", poliRoutes);
app.use("/api/dokter", dokterRoutes);
app.use("/api/antrian", antrianRoutes);
app.use("/api/kuota", kuotaRoutes);
app.use("/api/pasien", pasienRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/berita", beritaRoutes)
app.use("/api/apoteker", apotkerRoutes)
app.use("/api/konsultasi", konsultasiRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

server.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});
