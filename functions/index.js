const functions = require("firebase-functions");
const fetch = require("node-fetch");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors({ origin: true }));

const corsOptions = {
  origin: true,
};

app.post("/", cors(corsOptions), async (req, res) => {
  try {
    const { name, platform, description, img } = req.body;

    const errors = {};

    if (!name) {
      errors.name = "Please enter a name";
    } else if (name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    } else if (name.length > 14) {
      errors.name = "Name must be less than 14 characters";
    }

    if (!platform) {
      errors.platform = "Please select a platform";
    }

    if (!img) {
      errors.img = "Please enter an image URL";
    }

    if (!description) {
      errors.description = "Please enter a description";
    } else if (description.length < 3) {
      errors.description = "Description must be at least 10 characters";
    } else if (description.length > 300) {
      errors.description = "Description must be less than 100 characters";
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
    } else {
      const url = "secret_address/users.json";

      const newUser = {
        name: name,
        platform: platform,
        description: description,
        img: img,
        rating: 0,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to add new user");
      }

      res.json({ success: true, message: "New user added successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/:id/:type", cors(corsOptions), async (req, res) => {
  try {
    const { id, type } = req.params;
    const url = `secret_address/users/${id}.json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await response.json();

    const updatedRating =
      type === "inc" ? userData.rating + 1 : userData.rating - 1;
    const updatedUserData = { ...userData, rating: updatedRating };

    const putResponse = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!putResponse.ok) {
      throw new Error("Failed to update user data");
    }

    updatedUserData.rating = updatedRating;

    res.json(updatedUserData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/:id?", cors(corsOptions), async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      const url = "secret_address/users.json";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } else {
      const url = `secret_address/users/${id}.json`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        throw new Error("Failed to fetch user data");
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.proxyUserData = functions.https.onRequest(app);
