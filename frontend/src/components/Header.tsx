// import MenuIcon from "@mui/icons-material/Menu"; // Icon for the drawer toggle
// import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import Logo from "./shared/Logo";
// import NavigationLink from "./shared/NavigationLink";

// const Header = () => {
//     const auth = useAuth();
//     const [drawerOpen, setDrawerOpen] = useState(false);

//     const toggleDrawer = (open: boolean) => () => {
//         setDrawerOpen(open);
//     };

//     // Close drawer when clicking a navigation link
//     const handleLinkClick = () => {
//         setDrawerOpen(false);
//     };

//     return (
//         <AppBar sx={{ bgcolor: "#484848", position: "static", boxShadow: "none" }}>
//             <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Logo />

//                 {/* Drawer toggle icon for small screens */}
//                 <IconButton
//                     edge="start"
//                     color="inherit"
//                     aria-label="menu"
//                     onClick={toggleDrawer(true)} // Open drawer
//                     sx={{
//                         display: { xs: "block", sm: "none" }, // Show only on small screens
//                     }}
//                 >
//                     <MenuIcon />
//                 </IconButton>

//                 {/* Display chat/logout on larger screens */}
//                 <Box sx={{ display: { xs: "none", sm: "block" } }}>
//                     {auth?.isLoggedIn ? (
//                         <>
//                             <NavigationLink bg="cyan" to="/chat" text="Chat" textColor="black" />
//                             <NavigationLink bg="#001f3f" textColor="white" to="/" text="Logout" onClick={auth.logout} />
//                         </>
//                     ) : (
//                         <>
//                             <NavigationLink bg="cyan" to="/login" text="Login" textColor="black" />
//                             <NavigationLink bg="#001F3F" to="/signup" textColor="white" text="Sign Up" />
//                         </>
//                     )}
//                 </Box>

//                 {/* Drawer for small screens */}
//                 <Drawer
//                     variant="temporary"
//                     anchor="right"
//                     open={drawerOpen}
//                     onClose={toggleDrawer(false)} // Close drawer
//                     sx={{
//                         "& .MuiDrawer-paper": {
//                             width: 270,
//                             bgcolor: "black",
//                             color: "white",
//                             border: "none",
//                         },
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             padding: "10px",
//                             gap: "10px",
//                         }}
//                     >
//                         {auth?.isLoggedIn ? (
//                             <>
//                                 <NavigationLink
//                                     bg="cyan"
//                                     to="/chat"
//                                     text="Chat"
//                                     textColor="black"
//                                     onClick={handleLinkClick} // Close drawer after click
//                                 />
//                                 <NavigationLink
//                                     bg="#001f3f"
//                                     textColor="white"
//                                     to="/"
//                                     text="Logout"
//                                     onClick={() => {
//                                         auth.logout();
//                                         handleLinkClick(); // Close drawer after logging out
//                                     }}
//                                 />
//                             </>
//                         ) : (
//                             <>
//                                 <NavigationLink
//                                     bg="cyan"
//                                     to="/login"
//                                     text="Login"
//                                     textColor="black"
//                                     onClick={handleLinkClick} // Close drawer after click
//                                 />
//                                 <NavigationLink
//                                     bg="#001F3F"
//                                     to="/signup"
//                                     textColor="white"
//                                     text="Sign Up"
//                                     onClick={() => {
//                                         console.log('Sign Up clicked inside drawer');
//                                         handleLinkClick();
//                                     }}
//                                 />
//                             </>
//                         )}
//                     </Box>
//                 </Drawer>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Header;

import MenuIcon from "@mui/icons-material/Menu"; // Icon for the drawer toggle
import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
    const auth = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    // Close drawer when clicking a navigation link
    const handleLinkClick = () => {
        setDrawerOpen(false);
    };

    return (
        <AppBar sx={{ bgcolor: "#484848", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Logo />

                {/* Drawer toggle icon for small screens */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)} // Open drawer
                    sx={{
                        display: { xs: "block", sm: "none" }, // Show only on small screens
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Display chat/logout on larger screens */}
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    {auth?.isLoggedIn ? (
                        <>
                            <NavigationLink bg="cyan" to="/chat" text="Chat" textColor="black" />
                            <NavigationLink bg="#001f3f" textColor="white" to="/" text="Logout" onClick={auth.logout} />
                        </>
                    ) : (
                        <>
                            <NavigationLink bg="cyan" to="/login" text="Login" textColor="black" />
                            <NavigationLink bg="#001F3F" to="/signup" textColor="white" text="Sign Up" />
                        </>
                    )}
                </Box>

                {/* Drawer for small screens */}
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)} // Close drawer
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
                            padding: "10px",
                            gap: "10px",
                        }}
                    >
                        {auth?.isLoggedIn ? (
                            <>
                                <NavigationLink
                                    bg="cyan"
                                    to="/chat"
                                    text="Chat"
                                    textColor="black"
                                    onClick={handleLinkClick} // Close drawer after click
                                />
                                <NavigationLink
                                    bg="#001f3f"
                                    textColor="white"
                                    to="/"
                                    text="Logout"
                                    onClick={async () => {
                                        await auth.logout();
                                        handleLinkClick(); // Close drawer after logging out
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <NavigationLink
                                    bg="cyan"
                                    to="/login"
                                    text="Login"
                                    textColor="black"
                                    onClick={handleLinkClick} // Close drawer after click
                                />
                                <NavigationLink
                                    bg="#001F3F"
                                    to="/signup"
                                    textColor="white"
                                    text="Sign Up"
                                    onClick={handleLinkClick} // Close drawer after sign-up click
                                />
                            </>
                        )}
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;


