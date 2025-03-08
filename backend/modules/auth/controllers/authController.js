import fs from "fs";
import path from "path";

const usersFilePath = path.resolve("data", "users.json");

// Read users from JSON file
const readUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Write users to JSON file
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Get user by username or email
export const getUserByUsernameOrEmail = (username, email) => {
    const users = readUsers();
    return users.find(user => user.username === username || user.email === email);
};

// Create user
export const createUser = (userData) => {
    const users = readUsers();
    const newUser = { id: Date.now().toString(), ...userData };
    users.push(newUser);
    writeUsers(users);
    return newUser;
};

// Find user by ID
export const findById = (userId) => {
    const users = readUsers();
    return users.find(user => user.id === userId);
};

// Update user's refresh token
export const updateRefreshToken = (userId, refreshToken) => {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex].refreshToken = refreshToken;
        writeUsers(users);
        return { accessToken: "dummyAccessToken", refreshToken };
    }
    return null;
};

// Get logged-in user details
export const loggedInUserDetails = (userId) => {
    const user = findById(userId);
    if (!user) return null;
    const { password, refreshToken, ...safeUserData } = user;
    return safeUserData;
};

export const testController = (req, res) => {
    res.json({ message: "Test successful" });
}