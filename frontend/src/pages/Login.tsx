// Page for handling logging details and routes to this page.
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try{
            toast.loading("Signing In",{id:"login"});
            await auth?.login(email,password);
            toast.success("Sign In Successful!",{id:"login"});
        }catch(error){
            console.log(error);
            toast.error("Sign in failed!",{id:"login"});
        }
        
    };

    useEffect(()=> {
        if (auth?.user) {
            return navigate("/chat");
        }
    })
    
    return (
    <Box width={'100%'} height={'90vh'} display="flex"flexDirection="row" gap="0" top="0">
        <Box display={{md:"flex",sm:"none",xs:"none"}} sx={{ flex:{md:0.5,sm:"none",xs:"none"},justifyContent:"center",alignItems:"center"}}>
            <img src="SelfieBot.gif" alt="FlyingRobot" className="flyingRobot" style={{width:"400px",height:"400px"}}/>
        </Box>
        <Box
        display={'flex'}
        flex={{xs:1 , md:0.5}}
        justifyContent={'center'}
        alignItems={"center"}
        ml={"auto"}
        p={1}>
            <form
            onSubmit={(handleSubmit)}
            style={{
                margin:'auto',
                padding:'30px',
                boxShadow:'10px 10px 20px #000',
                borderRadius:'10px',
                border:'none',
                //maxWidth:"420px",
                //maxHeight:"300px",
                alignItems:"center"}}>
                <Box sx={{
                    display:'flex',
                    flexDirection:"column",
                    justifyContent:"center",
                    }}>
                    <Typography variant="h4" textAlign="center" paddingBottom={2} fontWeight={600}>
                    Login
                    </Typography>
                    <CustomizedInput type="email" name="email" label="Email" />
                    <CustomizedInput type="password" name="password" label="Password"/>
                    <Button
                    type="submit"
                    sx={{
                        px:2,
                        py:1,
                        mt:2,
                        width:"100%",
                        borderRadius:2,
                        bgcolor:"cyan",
                        color: "black",
                        ":hover":{
                            bgcolor:"white",
                            color:"cyan",
                        },
                        }}
                        endIcon={<MdLogin/>}>
                        Login
                    </Button>
                </Box>
            </form>
        </Box>
    </Box>
    )
};

export default Login;