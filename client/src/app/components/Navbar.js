import { useContext } from "react";
import Logo from "../assets/img/Logo.png"
import SignIn from "../assets/img/SignIn.svg";
import Sun from "../assets/img/Sun.svg";
import { AuthContext } from "../context/LoginContext";
import Image from 'next/image';

export default function Navbar() {

    const { logout } = useContext(AuthContext);
    return (
        <nav style={navbarStyle}>
            <div style={navbarLogoStyle}>
                <Image src={Logo} alt="Logo" />
            </div>
            <ul style={navbarLinksStyle}>
                <li style={navbarLinksItemStyle}><a href="/" style={navbarLinkStyle}>Popular</a></li>
                <li style={navbarLinksItemStyle}><a href="/about" style={navbarLinkStyle}>Now Playing</a></li>
                <li style={navbarLinksItemStyle}><a href="/services" style={navbarLinkStyle}>Upcoming</a></li>
                <li style={navbarLinksItemStyle}><a href="/contact" style={navbarLinkStyle}>Top Rated</a></li>
                <li style={navbarLinksItemStyle}><a href="/contact" style={navbarLinkStyle}>Favorites</a></li>
                <li style={navbarLinksItemStyle}><a href="/contact" style={navbarLinkStyle}>Saved</a></li>
            </ul>
            <ul style={navbarLinksStyle}>
                <li style={navbarLinksItemStyle}>
                    <button style={iconButtonStyle}>
                        <Image src={Sun} alt="Sun" />
                    </button>
                </li>
                <li style={navbarLinksItemStyle}>
                    <button style={iconButtonStyle} onClick={()=>logout()}>
                        <Image src={SignIn} alt="SignIn" />
                    </button>
                </li>
            </ul>
        </nav>
    );
}


const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#000000',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
};

const navbarLogoStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
};

const navbarLinksStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
};

const navbarLinksItemStyle = {
    margin: 0,
};

const navbarLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
};

const navbarLinkHoverStyle = {
    color: '#ddd',
};

const iconButtonStyle = {
    backgroundColor: 'transparent',
    borderWidth: 0,
};