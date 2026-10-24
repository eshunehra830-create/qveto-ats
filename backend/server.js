// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Debugging logs - Terminal me print honge
    console.log("1. Frontend se aaya password:", password);
    console.log("2. Database me saved password:", user.password);

    // 2. Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("3. Password Match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. Login Successful
    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});