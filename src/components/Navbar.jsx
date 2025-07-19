// src/components/Navbar.jsx
import React from "react";

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>🎬 Movie Mania Mantap</h2>
        </nav>
    );
}

const styles = {
    nav: {
        backgroundColor: "#282c34",
        padding: "1rem 2rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        margin: 0,
    },
};

export default Navbar;
