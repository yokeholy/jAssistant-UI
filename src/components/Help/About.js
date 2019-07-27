import React from "react";
import { Image } from "react-bootstrap";
import PackageJson from "../../../package.json";

const HelpAbout = () =>
    <div className="text-center">
        <h2>
            <Image src={ require("../../images/logo_right_480.png") }
                alt="jAssistant"
                fluid />
        </h2>
        <p>Version { PackageJson.version }</p>
    </div>;

export default HelpAbout;
