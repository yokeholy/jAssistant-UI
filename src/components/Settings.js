import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SettingsLifestyles from "./SettingsLifestyles";
import SettingsTodoCategories from "./SettingsTodoCategories";

import API from "../services/api";

class Settings extends React.Component {
    state = {
        lifestyleSettings: [],
        contentSettings: {},
        todoCategorySettings: []
    };

    componentDidMount () {
        if (this.props.loginStatus) {
            this.getAllSettings();
        }
    }

    getAllSettings = () =>
        API.get("/settings/getAllSettings")
            .then(response => {
                this.setState({
                    lifestyleSettings: response.lifestyleSettings,
                    contentSettings: response.contentSettings,
                    todoCategorySettings: response.todoCategorySettings
                });
            });

    render () {
        return (
            <section className="container-fluid pt-3 mb-5 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h3>Settings</h3>
                        <SettingsLifestyles lifestyleSettings={ this.state.lifestyleSettings }
                            contentSettings={ this.state.contentSettings}
                            getAllSettings={ this.getAllSettings }>
                        </SettingsLifestyles>
                        <SettingsTodoCategories todoCategorySettings={ this.state.todoCategorySettings }
                            getAllSettings={ this.getAllSettings }>
                        </SettingsTodoCategories>
                    </div>
                </div>
            </section>
        );
    }
}

// Map JData from Redux to this component
const mapStateToProps = state => state;

Settings.propTypes = {
    loginStatus: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Settings);
