import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import API from "../services/api";
import StateButton from "./fragments/StateButton";

class Settings extends React.Component {
    state = {
        lifestyleSettings: [],
        contentSettings: {},
        newLifestyleName: ""
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
                    lifestyleSettings: response.data.data.lifestyleSettings,
                    contentSettings: response.data.data.contentSettings
                });
            });

    updateNewLifestyleName = e => {
        this.setState({ newLifestyleName: e.target.value });
    }

    updateLifestyleName = (e, lifestyleItem) => {
        lifestyleItem.lifestyleName = e.target.value;
        this.forceUpdate();
        return API.post("/settings/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleName: lifestyleItem.lifestyleName,
            lifestyleDailyValue: lifestyleItem.lifestyleDailyValue
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName} is updated.`);
                this.getAllSettings();
            });
    }

    updateLifestyleValue = (e, lifestyleItem) => {
        lifestyleItem.lifestyleDailyValue = e.target.value;
        this.forceUpdate();
        return API.post("/settings/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleName: lifestyleItem.lifestyleName,
            lifestyleDailyValue: lifestyleItem.lifestyleDailyValue
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName} is updated.`);
                this.getAllSettings();
            });
    }

    updateLifestyleCaption = (e, lifestyleItem) => {
        this.forceUpdate();
        return API.post("/settings/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleCaption: e.target.value
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName}'s caption is updated.`);
                this.getAllSettings();
            });
    }

    selectLifestyleIcon = (lifestyleItem, iconName) => {
        API.post("/settings/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleIconName: iconName
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName}'s icon is updated.`);
                this.getAllSettings();
            });
    }

    selectLifestyleColor = (lifestyleItem, colorName) => {
        API.post("/settings/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleColorName: colorName
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName}'s color is updated.`);
                this.getAllSettings();
            });
    }

    createLifestyle = () =>
        API.post("/settings/saveLifestyleSetting", {
            lifestyleName: this.state.newLifestyleName,
            lifestyleDailyValue: 1
        })
            .then(() => {
                toast.success(`${this.state.newLifestyleName} is created.`);
                this.setState({
                    newLifestyleName: ""
                });
                this.getAllSettings();
            });

    deleteLifestyle = lifestyleItem =>
        API.post("/settings/deleteLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName} is deleted.`);
                this.getAllSettings();
            });

    render () {
        const lifestyleSettingList = this.state.lifestyleSettings.length
            ? this.state.lifestyleSettings.map(lifestyleItem =>
                <tr key={ lifestyleItem.lifestyleId }>
                    <td>
                        <input type="text"
                            className="form-control"
                            defaultValue={ lifestyleItem.lifestyleName }
                            onBlur={ e => this.updateLifestyleName(e, lifestyleItem) } />
                    </td>
                    <td>
                        <input type="text"
                            className="form-control"
                            defaultValue={ lifestyleItem.lifestyleCaption }
                            onBlur={ e => this.updateLifestyleCaption(e, lifestyleItem) } />
                    </td>
                    <td>
                        <div className="dropdown">
                            <button key={ lifestyleItem.iconName }
                                className="btn btn-outline-primary dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <i className={`text-info fas fa-${lifestyleItem.lifestyleIconName}`}></i>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                { this.state.contentSettings.lifestyleIcons.map(icon =>
                                    <button key={ icon.iconName }
                                        className="dropdown-item"
                                        onClick={ () => this.selectLifestyleIcon(lifestyleItem, icon.iconName) }>
                                        <i className={`fas fa-${icon.iconName}`}></i>
                                    </button>
                                ) }
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="dropdown">
                            <button key={ lifestyleItem.colorName }
                                className="btn btn-outline-primary dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <span className={`text-${lifestyleItem.lifestyleColorName}`}>&#x2588;</span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                { this.state.contentSettings.lifestyleColors.map(color =>
                                    <button key={ color.colorName }
                                        className="dropdown-item"
                                        onClick={ () => this.selectLifestyleColor(lifestyleItem, color.colorName) }>
                                        <span className={`text-${color.colorName}`}>&#x2588;</span>
                                    </button>
                                ) }
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                defaultValue={ lifestyleItem.lifestyleDailyValue }
                                onBlur={ e => this.updateLifestyleValue(e, lifestyleItem) } />
                            <div className="input-group-append">
                                <span className="input-group-text">per day</span>
                            </div>
                        </div>
                    </td>
                    <td className="text-right">
                        <button className="btn btn-danger btn-sm"
                            onClick={ () => this.deleteLifestyle(lifestyleItem) }>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            )
            : <tr>
                <td colSpan="4" className="bg-info">You have not set up any lifestyles yet.</td>
            </tr>;

        return (
            <section className="container-fluid pt-3 mb-5 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h3>Settings</h3>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Lifestyles</h4>
                                <form>
                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            value={ this.state.newLifestyleName }
                                            onChange={ this.updateNewLifestyleName } />
                                        <div className="input-group-append">
                                            <StateButton buttonType="primary"
                                                buttonIcon="fas fa-plus"
                                                buttonLabel="Create"
                                                inProgressLabel="Creating"
                                                action={ this.createLifestyle }>
                                            </StateButton>
                                        </div>
                                    </div>
                                </form>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Lifestyle Name</th>
                                            <th>Caption</th>
                                            <th>Icon</th>
                                            <th>Color</th>
                                            <th>Daily Value</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { lifestyleSettingList }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Settings.propTypes = {
    loginStatus: PropTypes.bool.isRequired
};

export default Settings;
