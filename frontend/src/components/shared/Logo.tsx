import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
    <div style={{
        display:'flex',
        marginRight:"auto",
        alignItems:"center",
        gap:"15px",
    }}>
        <Link to={"/"}>
            <img style={{borderRadius:"100px"}} src="chatbot_logo.png" 
            alt="botify" 
            width={"40px"} 
            height={"40px"}
            className="image-inverted" 
            />
        </Link>
            <Typography sx={{ display: {md:"block",sm:"none",xs:"none"} ,
            marginRight:"auto",
            fontWeight:"600",
            textShadow:"2px 2px 20px #000",}}>
                <span style={{ fontSize:"29px",color:"cyan"}} >BOT</span><span style={{ fontSize:"20px"}}>ify</span>
            </Typography>
        </div>
    );
};

export default Logo;