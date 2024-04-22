import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ position: "relative", display: "inline-block" }}
        >
            {children}
            {showTooltip && (
                <div
                    style={{
                        position: "absolute",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                    className='text-[10px] '
                    
                >
                    {text}
                </div>
            )}
        </div>
    );
};


export default Tooltip;