import React from "react";
import { toast } from "react-toastify";

import API from "../services/api";
import StateButton from "./fragments/StateButton";
import ConfirmationButton from "./fragments/ConfirmationButton";

class SettingsTodoCategories extends React.Component {
    state = {
        lifestyleSettings: [],
        contentSettings: [],
        newLifestyleName: ""
    };

    componentDidMount () {
        this.getLifestyleSettings();
    }

    updateNewLifestyleName = e => {
        this.setState({ newLifestyleName: e.target.value });
    }

    getLifestyleSettings = () =>
        API.get("/lifestyle/getLifestyleSettings")
            .then(response => {
                this.setState({
                    lifestyleSettings: response.lifestyleSettings,
                    contentSettings: response.contentSettings
                });
            });

    updateLifestyleName = (e, lifestyleItem) => {
        let newLifestyleName = e.target.value;
        return API.post("/lifestyle/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleName: newLifestyleName
        })
            .then(() => {
                toast.success(`${newLifestyleName} is updated.`);
                this.getLifestyleSettings();
            });
    }

    updateLifestyleValue = (e, lifestyleItem) => {
        let newLifestyleDailyValue = e.target.value;
        return API.post("/lifestyle/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleDailyValue: newLifestyleDailyValue
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName} is updated.`);
                this.getLifestyleSettings();
            });
    }

    updateLifestyleCaption = (e, lifestyleItem) => {
        let newLifestyleName = e.target.value;
        return API.post("/lifestyle/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleCaption: newLifestyleName
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName}'s caption is updated.`);
                this.getLifestyleSettings();
            });
    }

    selectLifestyleIcon = (lifestyleItem, iconName) => {
        API.post("/lifestyle/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleIconName: iconName
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName}'s icon is updated.`);
                this.getLifestyleSettings();
            });
    }

    selectLifestyleColor = (lifestyleItem, colorName) => {
        API.post("/lifestyle/saveLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId,
            lifestyleColorName: colorName
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName}'s color is updated.`);
                this.getLifestyleSettings();
            });
    }

    createLifestyle = () =>
        API.post("/lifestyle/saveLifestyleSetting", {
            lifestyleName: this.state.newLifestyleName,
            lifestyleDailyValue: 1
        })
            .then(() => {
                toast.success(`${this.state.newLifestyleName} is created.`);
                this.setState({
                    newLifestyleName: ""
                });
                this.getLifestyleSettings();
            });

    deleteLifestyle = lifestyleItem =>
        API.post("/lifestyle/deleteLifestyleSetting", {
            lifestyleId: lifestyleItem.lifestyleId
        })
            .then(() => {
                toast.success(`${lifestyleItem.lifestyleName} is deleted.`);
                this.getLifestyleSettings();
            });

    render () {
        const lifestyleSettingList = this.state.lifestyleSettings.length
            ? this.state.lifestyleSettings.map(lifestyleItem =>
                <tr key={ lifestyleItem.lifestyleId }>
                    <td>
                        <input type="text"
                            className="form-control hidingElement"
                            defaultValue={ lifestyleItem.lifestyleName }
                            onBlur={ e => this.updateLifestyleName(e, lifestyleItem) } />
                    </td>
                    <td>
                        <input type="text"
                            className="form-control hidingElement"
                            defaultValue={ lifestyleItem.lifestyleCaption }
                            onBlur={ e => this.updateLifestyleCaption(e, lifestyleItem) } />
                    </td>
                    <td>
                        <div className="dropdown hidingElement">
                            <button key={ lifestyleItem.iconName }
                                className="btn btn-outline-primary dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <i className={`text-info fas fa-${lifestyleItem.lifestyleIconName}`} />
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                { this.state.contentSettings.lifestyleIcons.map(icon =>
                                    <button key={ icon.iconName }
                                        className="dropdown-item"
                                        onClick={ () => this.selectLifestyleIcon(lifestyleItem, icon.iconName) }>
                                        <i className={`fas fa-${icon.iconName}`} />
                                    </button>
                                ) }
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="dropdown hidingElement">
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
                                className="form-control hidingElement"
                                defaultValue={ lifestyleItem.lifestyleDailyValue }
                                onBlur={ e => this.updateLifestyleValue(e, lifestyleItem) } />
                            <div className="input-group-append">
                                <span className="input-group-text">per day</span>
                            </div>
                        </div>
                    </td>
                    <td className="text-right">
                        <ConfirmationButton buttonType="danger"
                            buttonIcon="fas fa-trash-alt"
                            buttonLabel=""
                            buttonSize="sm"
                            action={ () => this.deleteLifestyle(lifestyleItem) } />
                    </td>
                </tr>
            )
            : <tr>
                <td colSpan="6" className="bg-info">You have not set up any lifestyles yet.</td>
            </tr>;

        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Lifestyle Settings</h4>
                    <form>
                        <div className="input-group">
                            <input type="text"
                                className="form-control hidingElement"
                                value={ this.state.newLifestyleName }
                                onChange={ this.updateNewLifestyleName } />
                            <div className="input-group-append">
                                <StateButton buttonType="primary"
                                    buttonIcon="fas fa-plus"
                                    buttonLabel="Create New Lifestyle"
                                    inProgressLabel="Creating"
                                    action={ this.createLifestyle } />
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
        );
    }
}

export default SettingsTodoCategories;
