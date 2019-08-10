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
            appName: this.props.appName,
            todoAlertLevel: this.props.todoAlertLevel,
            todoDangerLevel: this.props.todoDangerLevel
        },
        todoCategorySettings: []
    };

    componentDidMount = () => {
        if (this.props.loginStatus) {
            this.getAllSettings();
        }
    };

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
                    todoCategorySettings: response.todoCategorySettings
                });
            });

    resetAppName = () =>
        this.setState({
            generalSettings: {
                ...this.state.generalSettings,
                appName: "jAssistant"
            }
        });

    updateAppName = e =>
        this.setState({
            generalSettings: {
                ...this.state.generalSettings,
                appName: e.target.value
            }
        });

    updateTodoAlertLevel = e =>
        this.setState({
            generalSettings: {
                ...this.state.generalSettings,
                todoAlertLevel: e.target.value
            }
        });

    updateTodoDangerLevel = e =>
        this.setState({
            generalSettings: {
                ...this.state.generalSettings,
                todoDangerLevel: e.target.value
            }
        });

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
    };

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
                                        <Form.Text>
                                            The App Name will be displayed at the top-left corner of every page,
                                            as well as in the title bar of your browser.<br />
                                            If you leave it as <span className="text-success clickable" onClick={ this.resetAppName }>jAssistant</span>, the jAssistant logo will be displayed. :)
                                        </Form.Text>
                                    </Form.Group>
                                    <StateButton buttonType="primary"
                                        buttonIcon="fas fa-save"
                                        buttonLabel="Save"
                                        inProgressLabel="Saving"
                                        action={ this.saveGeneralSettings } />
                                </Form>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <div className="card-body">
                                <h4 className="card-title">Todo</h4>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Todo Alert Level</Form.Label>
                                        <Form.Control type="number"
                                            className="hidingElement"
                                            value={ this.state.generalSettings.todoAlertLevel }
                                            onChange={ this.updateTodoAlertLevel } />
                                        <Form.Text>After this many days, the todo item will be shown in <span className="text-warning">orange</span></Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Todo Danger Level</Form.Label>
                                        <Form.Control type="number"
                                            className="hidingElement"
                                            value={ this.state.generalSettings.todoDangerLevel }
                                            onChange={ this.updateTodoDangerLevel } />
                                        <Form.Text>After this many days, the todo item will be shown in <span className="text-danger">red</span></Form.Text>
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
    updateAppName: PropTypes.func.isRequired,
    appName: PropTypes.string.isRequired,
    todoAlertLevel: PropTypes.number.isRequired,
    todoDangerLevel: PropTypes.number.isRequired,
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
