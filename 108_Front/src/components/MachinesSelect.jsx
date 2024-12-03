import React from "react";
import "./MachinesSelect.css";

const MachinesSelect = () => {
    const products = [
        {
            id: 1,
            name: "Device A",
            description: "High-performance device for SSH and Telnet connections.",
            image: "https://images.pexels.com/photos/1105379/pexels-photo-1105379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            name: "Device B",
            description: "Ideal for chip debugging with advanced features.",
            image: "https://images.pexels.com/photos/1472443/pexels-photo-1472443.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
            id: 3,
            name: "Device C",
            description: "Optimized for real-time CLI operations.",
            image: "https://images.pexels.com/photos/6755091/pexels-photo-6755091.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
    ];

    return (
        <div className="product-cards-container">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default MachinesSelect;