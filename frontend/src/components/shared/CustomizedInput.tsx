import { TextField } from "@mui/material";

type Props = {
    name: string;
    type: string;
    label: string;
};

const CustomizedInput = (props: Props) => {
    return (
        <TextField
            margin="normal"
            sx={{
                width: "100%", // Adjust the input field width
                '& .MuiInputLabel-root': {
                    color: "white", // Styling the label (same as InputLabelProps)
                },
                '& .MuiOutlinedInput-root': {
                    borderRadius: 5, // Apply border radius to the root
                    fontSize: 20, // Set input font size
                    color: "white", // Input text color (same as InputProps)
                    '& fieldset': {
                        borderColor: "white", // Border color for the input
                    },
                    '&:hover fieldset': {
                        borderColor: "gray", // Hover border color
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: "cyan", // Focused border color
                    },
                    '& input': {
                        color: "white", // Input text color (same as InputProps)
                    },
                },
            }}
            name={props.name}
            label={props.label}
            type={props.type}
        />
    );
};

export default CustomizedInput;
