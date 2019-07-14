import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import SettingsTodoCategories from "./SettingsTodoCategories";

// Bootstrap
import Form from "react-bootstrap/Form";

import API from "../services/api";
import StateButton from "./fragments/StateButton";

class Settings extends React.Component {
    state = {
        generalSettings: {
            appName: "jAssistant"
        },
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
                // Process General Settings data
                let generalSettings = {};
                for (let i = 0; i < response.generalSettings.length; i++) {
                    const settingsItem = response.generalSettings[i];
                    generalSettings[settingsItem.settingsName] = settingsItem.settingsValue;
                }
                this.setState({
                    generalSettings,
                    lifestyleSettings: response.lifestyleSettings,
                    contentSettings: response.contentSettings,
                    todoCategorySettings: response.todoCategorySettings
                });
            });

    updateAppName = e => {
        this.setState({
            generalSettings: {
                ...this.state.generalSettings,
                appName: e.target.value
            }
        });
    }

    saveGeneralSettings = () => {
        let newSettings = [];
        for (let key in this.state.generalSettings) {
            newSettings.push({
                settingsName: key,
                settingsValue: this.state.generalSettings[key]
            });
            if (key === "appName") {
                this.props.updateAppName(this.state.generalSettings[key]);
            }
        }
        return API.post("/settings/saveGeneralSettings", newSettings)
            .then(() => {
                toast.success("Settings are updated.");
            })
            .then(() => {
                this.getAllSettings();
            });
    }

    render () {
        return (
            <section className="container-fluid pt-3 mb-5 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h3>Settings</h3>
                        <div className="card mt-3">
                            <div className="card-body">
                                <h4 className="card-title">General</h4>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>App Name</Form.Label>
                                        <Form.Control type="text"
                                            className="hidingElement"
                                            value={ this.state.generalSettings.appName }
                                            onChange={ this.updateAppName } />
                                    </Form.Group>
                                    <StateButton buttonType="primary"
                                        buttonIcon="fas fa-save"
                                        buttonLabel="Save"
                                        inProgressLabel="Saving"
                                        action={ this.saveGeneralSettings } />
                                </Form>
                            </div>
                        </div>
                        <SettingsTodoCategories todoCategorySettings={ this.state.todoCategorySettings }
                            getAllSettings={ this.getAllSettings } />
                    </div>
                </div>
            </section>
        );
    }
}
Settings.propTypes = {
    loginStatus: PropTypes.bool.isRequired,
    updateAppName: PropTypes.func.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

// Map JData dispatch methods
const mapDispatchToProps = dispatch => ({
    updateAppName: newAppName => {
        dispatch({
            type: "UPDATE_APP_NAME",
            newAppName
        });
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
