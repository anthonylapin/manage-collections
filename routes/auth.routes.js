const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const client = new OAuth2Client(config.get("googleClientId"));

const router = Router();

router.post(
  "/signup",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password length has to be at least 8 character."
    ).isLength({
      min: 8,
    }),
    check("firstName", "Field must be non-empty").exists(),
    check("lastName", "Field must be non-empty").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during registration",
        });
      }

      const { email, password, firstName, lastName } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      await createUser(email, password, firstName, lastName);
      res.status(201).json({
        message: "User has been created.",
      });
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
);

router.post(
  "/signin",
  [
    check("email", "Enter valid email").normalizeEmail().isEmail(),
    check("password", "Enter valid password").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during signing in.",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      if (user.blocked) {
        return res.status(400).json({
          message: "User is blocked",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const token = generateToken(user.id);

      res.status(200).json({
        token,
        userId: user.id,
        isSuperuser: user.superuser,
        isBlocked: user.blocked,
      });
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
);

router.post("/googlelogin", async (req, res) => {
  try {
    const { tokenId } = req.body;
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience:
        "997018043744-pmlk5mtt5tvh529irf8071vptk13ggd1.apps.googleusercontent.com",
    });
    const { email_verified, given_name, family_name, email } = response.payload;
    if (!email_verified) {
      return res.status(406).json({
        message: "Email not verified",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      const password = email + config.get("googleAuthSecret");
      user = await createUser(email, password, given_name, family_name);
    }

    if (user.blocked) {
      return res.status(400).json({
        message: "User is blocked",
      });
    }

    const token = generateToken(user.id);
    res.status(200).json({
      token,
      userId: user.id,
      isSuperuser: user.superuser,
      isBlocked: user.blocked,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.post("/facebooklogin", async (req, res) => {
  const { userID, accessToken } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  try {
    let response = await fetch(urlGraphFacebook, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    const { email, name } = response;
    const nameAsArray = name.split(" ");

    let user = await User.findOne({ email });
    if (!user) {
      const password = email + config.get("googleAuthSecret");
      user = await createUser(email, password, nameAsArray[0], nameAsArray[1]);
    }

    if (user.blocked) {
      return res.status(400).json({
        message: "User is blocked",
      });
    }

    const token = generateToken(user.id);
    res.status(200).json({
      token,
      userId: user.id,
      isSuperuser: user.superuser,
      isBlocked: user.blocked,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

async function createUser(email, password, firstName, lastName) {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    superuser: false,
    blocked: false,
  });
  await user.save();
  return user;
}

function generateToken(userId) {
  const token = jwt.sign({ userId: userId }, config.get("jwtSecret"), {
    expiresIn: "1h",
  });
  return token;
}

module.exports = router;
