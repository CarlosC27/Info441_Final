import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {

  if (!req.session || !req.session.isAuthenticated) {
      console.error("Unauthorized: User not logged in.");
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  const { username} = req.session.account || {};
  if (!username) {
      console.error("Unauthorized: Username missing in session.");
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  try {
      const { firstName, lastName, email, jobTitle, skills, jobInterest } = req.body;

      const newUser = new req.models.User({
          username,
          firstName: firstName, 
          lastName,
          email,
          jobTitle,
          skills,
          jobInterest,
      });

      await newUser.save();
      console.log("User registered successfully:", newUser);
      res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.put('/update', async (req, res) => {
  const { username } = req.session.account || {};

  try {
    const { firstName, lastName, email, jobTitle, skills, jobInterest } = req.body;

    // Find the user in the database
    const user = await req.models.User.findOne({ username });
    if (!user) {
      console.error(`User with username ${username} not found.`);
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.jobTitle = jobTitle || user.jobTitle;
    user.skills = skills || user.skills;
    user.jobInterest = jobInterest || user.jobInterest;

    await user.save();
    console.log("User updated successfully:", user);
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }

});


router.get('/profile', async (req, res) => {

  if (!req.session || !req.session.isAuthenticated) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  const { username } = req.session.account || {};
  if (!username) {
      return res.status(401).json({ message: 'Unauthorized. Username is missing.' });
  }

  try {
      const user = await req.models.User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/jobInterests', async (req, res) => {

  if (!req.session || !req.session.isAuthenticated) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  const { username } = req.session.account || {};
  if (!username) {
      return res.status(401).json({ message: 'Unauthorized. Username is missing.' });
  }

  try {
      const user = await req.models.User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      if (!user.jobInterest || user.jobInterest.length === 0) {
          return res.status(404).json({ message: 'No job interests found for this user.' });
      }

      res.status(200).json(user.jobInterest);
  } catch (error) {
      console.error("Error fetching job interests:", error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


export default router;
