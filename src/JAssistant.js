import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainAssistant from "./components/MainAssistant";
import Settings from "./components/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class JAssistant extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <div id="jAssistant">
                    <Navigation />
                    <Route exact path="/" component={MainAssistant} />
                    <Route exact path="/settings" component={Settings} />
                    <ToastContainer />
                </div>
            </BrowserRouter>
        );
    }
}

export default JAssistant;
