import React from "react";

import Todo from "./Todo";
import Routine from "./Routine";
import Note from "./Note";
import Lifestyle from "./Lifestyle";

class MainAssistant extends React.Component {
    render () {
        return (
            <div>
                <div className="row" id="dashboard">
                    <section className="col-12 col-lg-4">
                        <Todo dashboard />
                    </section>
                    <section className="col-12 col-lg-4">
                        <Routine dashboard />
                    </section>
                    <section className="col-12 col-lg-4">
                        <Note dashboard />
                    </section>
                </div>
                <Lifestyle dashboard />
            </div>
        );
    }
}

export default MainAssistant;
