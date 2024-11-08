import "./Meter.css";

export default function Meter({ value = 0 }) {
    // Calculate the rotation based on the value
    const percentage = Math.round(value * 100);
    const rotation = value === 0 ? 0 : (percentage / 200); // Avoid any rotation if the value is 0
    return (
        <div className="gauge">
            <div className="gauge__body">
                <div
                    className="gauge__fill"
                    style={{ transform: `rotate(${rotation}turn)` }}
                ></div>
                <div className="gauge__cover">{percentage}%</div>
            </div>
        </div>
    );
}
