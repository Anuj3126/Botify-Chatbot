// import { Avatar, Box, Typography } from "@mui/material";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { useAuth } from "../../context/AuthContext";

// function extractCodeFromString(message:string){
//     if(message.includes("```")){
//         const blocks = message.split("```").filter(block => block.trim() !== '');
//         return blocks;
//     }
// }

// function isCodeBlock(str:string){
//     if(
//         str.includes("=") ||
//         str.includes(";") ||
//         str.includes("[") ||
//         str.includes("]") ||
//         str.includes("{") ||
//         str.includes("}") ||
//         str.includes("#") ||
//         str.includes("//")
//     ){
//         return true;
//     }
//     return false;
// }

// const ChatItem = ({
//     content,
//     role
// }:{
//     content:string,
//     role:"user"|"assistant",
// }) => {
//     const messageBlocks = extractCodeFromString(content);
//     const auth = useAuth();
//     return role==="assistant" ? (
//         <Box sx={{
//             display:"flex",
//             p:1,
//             bgcolor:"teal",
//             my:1,
//             gap:2,
//             borderRadius:5,
//             fontSize: {md:"20px",xs:"15px",sm:"15px"},
//             }}>
//             <Avatar sx={{ ml:"0",bgcolor:"black",color:"white"}}>
//                 <img style={{borderRadius:"100px"}} src="chatbot_logo.png" alt="botify" width={"30px"} />
//             </Avatar>
//             <Box style={{overflow:"auto", alignContent:"center"}}>
//             {!messageBlocks && (<Typography sx={{ whiteSpace:"pre-wrap", fontSize: {md:"20px",xs:"15px",sm:"15px"} }}>{content}</Typography>)}
//             {messageBlocks &&
//             messageBlocks.length &&
//             messageBlocks.map((block)=>
//             isCodeBlock(block) ? (
//             <SyntaxHighlighter style={coldarkDark} language="javascript">
//                 {block}
//             </SyntaxHighlighter>
//             ) : (
//             <Typography sx={{ whiteSpace:"pre-wrap", fontSize:{md:"20px",xs:"15px",sm:"15px"} }}>
//                 {block}
//             </Typography>
//             )
//             )
//             }
//             </Box>
//         </Box>
//     ) : (
//         <Box sx={{display:"flex",p:1,bgcolor:"#2C2F33",my:1,gap:2,borderRadius:5,fontSize: {md:"20px",xs:"15px",sm:"10px"}}}>
//         <Avatar sx={{bgcolor:"black",color:"white", ml:"0",fontWeight: "600" }}>
//         {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
//         </Avatar>
//         <Box sx={{alignContent:"center"}}>
//         {!messageBlocks && (
//             <Typography sx={{ whiteSpace:"pre-wrap",fontSize: {md:"20px",xs:"15px",sm:"15px"}}}>{content}</Typography>
//         )}
//         {messageBlocks &&
//         messageBlocks.length &&
//         messageBlocks.map((block) =>
//             isCodeBlock(block) ? (
//             <SyntaxHighlighter style={ coldarkDark } language="javascript">
//                 {block}
//             </SyntaxHighlighter>
//             ) : (
//             <Typography sx={{ whiteSpace:"pre-wrap",fontSize: {md:"20px",xs:"15px",sm:"15px"} }}>{block}</Typography>
//             )
//         )}
//         </Box>
//     </Box>
//     );

// };

// export default ChatItem;

import { Avatar, Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAuth } from "../../context/AuthContext";

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```").filter(block => block.trim() !== '');
        return blocks;
    }
}

function isCodeBlock(str: string) {
    if (
        str.includes("=") ||
        str.includes(";") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//")
    ) {
        return true;
    }
    return false;
}

const ChatItem = ({
    content,
    role
}: {
    content: string,
    role: "user" | "assistant",
}) => {
    const messageBlocks = extractCodeFromString(content);
    const auth = useAuth();
    return role === "assistant" ? (
        <Box sx={{
            display: "flex",
            p: 1,
            bgcolor: "teal",
            my: 1,
            gap: 2,
            borderRadius: 5,
            fontSize: { md: "20px", xs: "15px", sm: "15px" },
            wordBreak: "break-word", // Ensures text wraps properly
            overflowWrap: "break-word", // Handles overflow of long words
        }}>
            <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
                <img style={{ borderRadius: "100px" }} src="chatbot_logo.png" alt="botify" width={"30px"} />
            </Avatar>
            <Box style={{ overflow: "auto", alignContent: "center" }}>
                {!messageBlocks && (
                    <Typography sx={{ whiteSpace: "pre-wrap", fontSize: { md: "20px", xs: "15px", sm: "15px" } }}>
                        {content}
                    </Typography>
                )}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter style={coldarkDark} language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography sx={{ whiteSpace: "pre-wrap", fontSize: { md: "20px", xs: "15px", sm: "15px" } }}>
                                {block}
                            </Typography>
                        )
                    )
                }
            </Box>
        </Box>
    ) : (
        <Box sx={{
            display: "flex",
            p: 1,
            bgcolor: "#2C2F33",
            my: 1,
            gap: 2,
            borderRadius: 5,
            fontSize: { md: "20px", xs: "15px", sm: "10px" },
            wordBreak: "break-word", // Ensures text wraps properly
            overflowWrap: "break-word", // Handles overflow of long words
        }}>
            <Avatar sx={{ bgcolor: "black", color: "white", ml: "0", fontWeight: "600" }}>
                {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
            </Avatar>
            <Box sx={{ alignContent: "center" }}>
                {!messageBlocks && (
                    <Typography sx={{ whiteSpace: "pre-wrap", fontSize: { md: "20px", xs: "15px", sm: "15px" } }}>
                        {content}
                    </Typography>
                )}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter style={coldarkDark} language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography sx={{ whiteSpace: "pre-wrap", fontSize: { md: "20px", xs: "15px", sm: "15px" } }}>
                                {block}
                            </Typography>
                        )
                    )
                }
            </Box>
        </Box>
    );
};

export default ChatItem;
