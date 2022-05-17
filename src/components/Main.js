import React from "react"
import MapLeaflet from "./MapLeaflet";
import MapOpenLayers from "./MapOpenLayers";

export default function Main() {
    return (
        <main className="main-content">
            <p>Main Content</p>
            <MapLeaflet/>
            <MapOpenLayers />
        </main>
    )
}