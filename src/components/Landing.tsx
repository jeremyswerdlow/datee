import type React from "react";
import heroImg from "../assets/datee_logo.png";

export type LandingProps = {
    onStart: () => void;
};

export const Landing: React.FC<LandingProps> = (props) => (
    <div className="landing-page">
        <img src={heroImg} className="hero-img" width="80%" alt="logo" />
        <div className="landing-text aligned-column-wrapper">
            <h1>Help plan our evening</h1>
            <p className="aligned-column-child">
                <span>
                    Help work with these fuzzy friends to come up with the
                    perfect date!
                </span>
            </p>
        </div>
        <button
            type="button"
            className="primary-button"
            onClick={props.onStart}
        >
            Get Started
        </button>
    </div>
);
