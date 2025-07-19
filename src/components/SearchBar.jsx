import React, { useState } from "react";

function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim() !== "") {
            onSearch(keyword);
            setKeyword(""); // reset
        }
    };

    return (
        <form onSubmit={handleSearch} style={styles.form}>
            <input
                type="text"
                placeholder="Cari film..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Cari</button>
        </form>
    );
}

const styles = {
    form: {
        display: "flex",
        justifyContent: "center",
        margin: "1.5rem 0",
    },
    input: {
        padding: "0.5rem",
        width: "300px",
        fontSize: "1rem",
    },
    button: {
        padding: "0.5rem 1rem",
        marginLeft: "0.5rem",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
};

export default SearchBar;
