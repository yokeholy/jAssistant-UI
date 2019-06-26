import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainAssistant from "./components/MainAssistant";
import Todo from "./components/Todo";
import Routine from "./components/Routine";
import Note from "./components/Note";
import Lifestyle from "./components/Lifestyle";
import Settings from "./components/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class JAssistant extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <div id="jAssistant">
                    <Navigation />
                    <section className="container-fluid pt-3 mb-5 pb-5">
                        <Route exact path="/" component={ MainAssistant } />
                        <Route exact path="/todo" component={ Todo } />
                        <Route exact path="/routine" component={ Routine } />
                        <Route exact path="/note" component={ Note } />
                        <Route exact path="/lifestyle" component={ Lifestyle } />
                        <Route exact path="/settings" component={ Settings } />
                    </section>
                    <ToastContainer />
                </div>
            </BrowserRouter>
        );
    }
}

export default JAssistant;
