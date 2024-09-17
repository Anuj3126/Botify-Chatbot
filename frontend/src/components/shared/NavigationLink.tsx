// import { Link } from "react-router-dom";

// type Props = {
//     to: string;
//     bg: string;
//     text: string;
//     textColor: string;
//     onClick?: () => void | Promise<void>; // Allow both void and Promise<void>
//     style?: React.CSSProperties; // Optional style prop
// };

// const NavigationLink = (props: Props) => {
//     const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//         if (props.onClick) {
//             e.preventDefault(); // Prevent default link navigation if onClick is provided
//             await props.onClick(); // Execute the onClick function
//         }
//     };

//     return (
//         <Link
//             to={props.to}
//             className="nav-link"
//             onClick={handleClick} // Call handleClick to check onClick presence
//             style={{ background: props.bg, color: props.textColor, ...props.style }} // Merge with passed style
//         >
//             {props.text}
//         </Link>
//     );
// };

// export default NavigationLink;

import { Link, useNavigate } from "react-router-dom";

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => void | Promise<void>; // Allow both void and Promise<void>
    style?: React.CSSProperties; // Optional style prop
};

const NavigationLink = (props: Props) => {
    const navigate = useNavigate(); // Use navigate hook for programmatic navigation

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (props.onClick) {
            e.preventDefault(); // Prevent default link navigation if onClick is provided
            await props.onClick(); // Execute the onClick function
        }
        navigate(props.to); // Ensure proper route navigation
    };

    return (
        <Link
            to={props.to}
            className="nav-link"
            onClick={handleClick} // Call handleClick to check onClick presence and navigate
            style={{ background: props.bg, color: props.textColor, ...props.style }} // Merge with passed style
        >
            {props.text}
        </Link>
    );
};

export default NavigationLink;
