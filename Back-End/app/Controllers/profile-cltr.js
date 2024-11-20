// import Profile from "../Models/profile-model.js";


// const profileCltr = {};

// // Create a new profile
// profileCltr.create = async (req, res) => {
//     const body = req.body;
//     const file = req.file ? `/uploads/${req.file.filename}` : undefined;

//     if (file) {
//         body.file = file;
//     }

//     try {
//         const profile = new Profile(body);
//         profile.user = req.userId; // Ensure req.userId is set correctly
//         await profile.save();
//         res.status(201).json({
//             message: "Profile created successfully",
//             profile,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to create profile" }); // Send error response
//     }
// };

// // Show user profile
// profileCltr.show = async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ user: req.userId });
//         if (!profile) {
//             return res.status(404).json({ message: "Profile not found" });
//         }
//         res.json(profile);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to retrieve profile" }); // Send error response
//     }
// };

// export default profileCltr;
