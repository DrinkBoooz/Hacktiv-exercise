const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const encryptPassword = (password) => {
  const cipher = crypto.createCipher("aes-256-cbc", "secret-key");
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptPassword = (encryptedPassword) => {
  const decipher = crypto.createDecipher("aes-256-cbc", "secret-key");
  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

app.post("/api/register", (req, res) => {
  const {
    name,
    mobileNumber,
    email,
    address,
    gender,
    password,
    confirmPassword,
    birthdate,
  } = req.body;

  if (
    !name ||
    !mobileNumber ||
    !email ||
    !address ||
    !gender ||
    !password ||
    !confirmPassword ||
    !birthdate
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const encryptedPassword = encryptPassword(password);

  const userData = {
    name,
    mobileNumber,
    email,
    address,
    gender,
    password: encryptedPassword,
    unencryptedPassword: password, // saving unencrypted password for future reference
    birthdate,
  };

  fs.readFile("users.json", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading users file:", err);
      return res.status(500).json({ error: "Error reading users file" });
    }

    let users = [];
    if (data.length > 0) {
      users = JSON.parse(data);
    }
    users.push(userData);

    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error saving user data:", err);
        return res.status(500).json({ error: "Error saving user data" });
      }
      res.status(200).json({ message: "Registration successful" });
    });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.error("Error reading users file:", err);
      return res.status(500).json({ error: "Error reading users file" });
    }

    let users = [];
    if (data.length > 0) {
      users = JSON.parse(data);
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const decryptedPassword = decryptPassword(user.password);
    if (decryptedPassword !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json(user);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
