import React from "react";
import Todo from "./Todo";
import Routine from "./Routine";
import Note from "./Note";
import Lifestyle from "./Lifestyle";

const MainAssistant = () =>
    <div>
        <div className="row">
            <section id="notes" className="col-12 col-lg-4">
                <Todo dashboard />
            </section>
            <section id="notes" className="col-12 col-lg-4">
                <Routine dashboard />
            </section>
            <section id="notes" className="col-12 col-lg-4">
                <Note dashboard />
            </section>
        </div>
        <Lifestyle />
    </div>;

export default MainAssistant;
