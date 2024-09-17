import OpenAI from "openai";
import User from "../models/User.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User is not registered or Token malfunctioned" });
        }
        const openAIConversations = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        openAIConversations.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPENAI_ORGANIZATION_ID,
        });
        // Send to OpenAI API
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: openAIConversations,
        });
        console.log(chatResponse.choices[0].message.content);
        // Update user chats with the AI response
        user.chats.push(chatResponse.choices[0].message);
        // Save user with updated chats
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    //User Login
    try {
        const existingUser = await User.findById(res.locals.jwtData.id);
        if (!existingUser) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (existingUser._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Authorization Failed!");
        }
        return res.status(200).json({ message: "OK", chats: existingUser.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    //User Login
    try {
        const existingUser = await User.findById(res.locals.jwtData.id);
        if (!existingUser) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (existingUser._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Authorization Failed!");
        }
        //@ts-ignore
        existingUser.chats = [];
        await existingUser.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map