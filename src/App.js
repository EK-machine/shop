import React from "react";
import styles from "./style.module.css";

export function App() {
    return(
        <div >
            <h1 className={styles.h1}>hello {new Date().toDateString()}</h1>
        </div>
    )
}