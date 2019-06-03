import React from "react";
import Todo from "./Todo";
import Routine from "./Routine";
import Note from "./Note";
import Lifestyle from "./Lifestyle";

const MainAssistant = () =>
    <section className="container-fluid pt-3 mb-5 pb-5">
        <div className="row">
            <Todo />
            <Routine />
            <Note />
        </div>
        <Lifestyle />
    </section>;

export default MainAssistant;
