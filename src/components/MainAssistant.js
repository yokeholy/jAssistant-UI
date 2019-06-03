import React from "react";
import Todo from "./Todo";
import Routine from "./Routine";
import Note from "./Note";

const MainAssistant = () =>
    <section className="container-fluid pt-3 mb-5 pb-5">
        <div className="row">
            <Todo />
            <Routine />
            <Note />
        </div>
    </section>;

export default MainAssistant;
