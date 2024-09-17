import { Menu as MenuIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ChatItem from "../components/chat/ChatItem";
import { useAuth } from "../context/AuthContext";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";

type Message = {
    role: "user" | "assistant";
    content: string;
}

const Chat = () => {
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const auth = useAuth();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // const scrollToBottom = () => {
    //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // };
    const scrollToBottom = () => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    };
    
    const handleSubmit = async () => {
        const contentCheck = inputRef.current?.value?.trim();
        if (!contentCheck) {
            return;
        }
        const content = inputRef.current?.value as string;
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.style.height = "auto";
        }
        const newMessage: Message = { role: "user", content };
        setChatMessages((prev) => [...prev, newMessage]);
        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
    };

    const handleDeleteChats = async () => {
        try {
            toast.loading("Clearing Chats", { id: "deletechats" });
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Chats Cleared Successfully!", { id: "deletechats" });
        } catch (error) {
            console.log(error);
            toast.error("Clearing Chats Unsuccessful", { id: "deletechats" });
        }
    };

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            toast.loading("Loading Chats", { id: "loadchats" });
            getUserChats().then((data) => {
                setChatMessages([...data.chats]);
                toast.success("Successfully Loaded the Chats!", { id: "loadchats" });
            }).catch(err => {
                console.log(err);
                toast.error("Loading Failed", { id: "loadchats" });
            });
        }
    }, [auth]);

    useEffect(() => {
        if (!auth?.user) {
            return navigate("/login");
        }
    }, [auth]);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "90vh",
                overflow: "hidden",
                overflowY:"hidden",
                mt:1,
            }}
        >
            {/* Drawer for small screens */}
            <Drawer
                variant="temporary"
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 270,
                        bgcolor: "black",
                        color: "white",
                        border: "none",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'white',
                            color: 'black',
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
                    </Avatar>
                    <Typography sx={{ fontFamily: "work sans", mb: 4 }}>
                        Welcome to Botify, {auth?.user?.name.split(" ")[0]}!!
                    </Typography>
                    <Typography sx={{ fontFamily: "work sans", mb: 4, p: 2 }}>
                        Your friendly neighbourhood chatbot. It can answer questions related to knowledge, business, advice, education, etc.
                        Avoid sharing personal information. Enjoy chatting!!
                        <img src="ChatAreaRobot.gif" alt="chatarea" style={{ borderRadius: 5, width: "100%", height: "auto", marginTop: "5px" }} />
                    </Typography>
                    <Button
                        onClick={handleDeleteChats}
                        sx={{
                            width: "100%",
                            color: 'white',
                            fontWeight: "700",
                            borderRadius: 3,
                            bgcolor: red[300],
                            ":hover": {
                                bgcolor: red.A400,
                            },
                        }}
                    >
                        Clear Conversation
                    </Button>
                </Box>
            </Drawer>

            <Box
                sx={{//changes made
                    display: { md: "flex", sm:"none",xs: "none" },
                    flex: { md: 0.2, xs: "none",xm:"none" },
                    //height: "auto",
                    height:{xl:"86.5vh",lg:"83.8vh",md:"60vh",sm:"50vh"},
                    //width: "50vh",
                    width:"100%",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: 3,
                    ml: 3,
                    //mt:5
                    mt:"4vh",
                    //minWidth:"50vh",
                }}
                >
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        height:"auto",
                        //height: "100%",
                        bgcolor: "black",
                        borderRadius: 5,
                        flexDirection: 'column',
                        m: "auto",
                        overflowY: "scroll",
                        padding: 1,
                        "::-webkit-scrollbar": {
                            display: "none",
                        },
                        scrollbarWidth: "none",
                        "-ms-overflow-style": "none",
                        //new additions below
                        maxHeight:"85vh",
                        alignItems:"center",
                        //minWidth:"43vh",
                        //gap:3
                    }}
                >
                    <Avatar
                        sx={{
                            mx: "auto",
                            my: 2,
                            bgcolor: 'white',
                            color: 'black',
                            fontWeight: 700
                        }}
                    >
                        {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
                    </Avatar>
                    <Box style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"7px",padding:"20px 20px 0px 20px"}}>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
                        Welcome to Botify, {auth?.user?.name.split(" ")[0]}!!
                    </Typography>
                    </Box>
                    <Box style={{alignContent:"center"}}>
                        <img src="ChatAreaRobot.gif" alt="chatarea" width="270px" style={{ borderRadius: 5, marginTop: "5px" }} />
                    </Box>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 1, p: 3 }}>
                        Your friendly neighbourhood chatbot. It can answer questions related to knowledge, business, advice, education, etc.
                        Avoid sharing personal information. Enjoy chatting!!
                    </Typography>
                    <Button
                        onClick={handleDeleteChats}
                        sx={{
                            width: "200px",
                            my: 1,
                            color: 'white',
                            fontWeight: "700",
                            borderRadius: 3,
                            mx: "auto",
                            mb:2,
                            bgcolor: red[300],
                            ":hover": {
                                bgcolor: red.A400,
                            },
                        }}
                    >
                        Clear Conversation
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex:{md:0.8,sm:1,xs:1},
                    p: 3,
                    width: "100%",
                    height:"100vh",
                    boxSizing:"border-box",
                    //height: "100%",
                    overflow: "hidden",
                    maxHeight:"100vh",
                }}
            >
                <IconButton
                    onClick={toggleDrawer(true)}
                    sx={{
                        display: { md: "none", xs: drawerOpen ? "none" : "flex" }, // Hide the icon when drawer is open
                        position: "absolute",
                        top: 75,
                        left: 10,
                        zIndex: 2, // Ensure it appears above other elements
                    }}
                >
                    <MenuIcon sx={{ color: "white" }} />
                </IconButton>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: { md: "30px", sm: "25px", xs: "20px" },
                        color: "white",
                        mb: 2,
                    }}
                >
                    BOTify - GPT-3.5 Turbo
                </Typography>

                <Box
                    sx={{
                        flex: 0.9,
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        padding: 1,
                        paddingBottom:0,
                        height: "calc(100% - 500px)",
                    }}
                >
                    <Box
                        ref={chatMessagesRef}
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            "::-webkit-scrollbar": {
                            display: "none",
                            },
                            scrollbarWidth: "none",
                            "-ms-overflow-style": "none",
                            }}
                    >
                        {chatMessages.map((chat, index) => (
                            <ChatItem content={chat.content} role={chat.role} key={index} />
                        ))}
                        <div ref={bottomRef} />
                    </Box>

                    <Box
                        sx={{
                            position:"sticky",
                            bottom:0,
                            display: "flex",
                            alignItems: "center",
                            mt: 2,
                            paddingBottom: 0,
                            marginBottom:0,
                            borderRadius: 2,
                        }}
                    >
                        <textarea
                            ref={inputRef}
                            rows={1}
                            placeholder="Type your message here..."
                            onKeyPress={handleKeyPress}
                            onInput={handleInput}
                            style={{
                                width: "100%",
                                resize: "none",
                                border: "none",
                                outline: "none",
                                padding: "10px",
                                borderRadius: "4px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                backgroundColor: "#333",
                                maxHeight:"200px",
                                overflowY:"auto",
                                color:"white",
                            }}
                        />
                        <IconButton onClick={handleSubmit}>
                            <IoMdSend style={{ color: "white", fontSize: "24px" }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;



