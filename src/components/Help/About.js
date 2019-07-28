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
        <p>Project initiated by
            <a href="https://wangjin.me"
                target="_blank"
                rel="noopener noreferrer">Jin Wang</a>
        </p>
        <h3>jAssistant on Github</h3>
        <p>
            UI Repo on Github:
            <a href="https://github.com/yokeholy/jAssistant-UI"
                target="_blank"
                rel="noopener noreferrer">https://github.com/yokeholy/jAssistant-UI</a>
        </p>
        <p>
            API Repo on Github
            <a href="https://github.com/yokeholy/jAssistant-API"
                target="_blank"
                rel="noopener noreferrer">https://github.com/yokeholy/jAssistant-API</a>
        </p>
    </div>;

export default HelpAbout;
