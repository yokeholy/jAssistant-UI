import React from "react";

class Settings extends React.Component {
    state = {
        setting: true
    };

    render () {
        return (
            <section className="container-fluid pt-3 mb-5 pb-5">
                <div className="row">
                    <h3>Settings</h3>
                </div>
            </section>
        );
    }
}

export default Settings;
