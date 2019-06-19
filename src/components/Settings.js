import React from "react";
import { toast } from "react-toastify";

import API from "../services/api";
import StateButton from "./fragments/StateButton";

class Settings extends React.Component {
    state = {
        lifestyleSettings: [],
        newLifestyleName: ""
    };

    componentDidMount () {
        this.getAllSettings();
    }

    getAllSettings = () =>
        API.get("/settings/getAllSettings")
            .then(response => {
                this.setState({
                    lifestyleSettings: response.data.data.lifestyleSettings
                });
            });

    updateNewLifestyleName = e => {
        this.setState({ newLifestyleName: e.target.value });
    }

    enterEditing = lifestyleItem => {
        lifestyleItem.editing = true;
        this.forceUpdate();
    }

    updateLifestyleName = (e, lifestyleItem) => {
        lifestyleItem.editing = false;
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
        lifestyleItem.editing = false;
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

    createLifestyle = () => {
        this.forceUpdate();
        return API.post("/settings/saveLifestyleSetting", {
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
    }

    render () {
        const lifestyleSettingList = this.state.lifestyleSettings.length
            ? this.state.lifestyleSettings.map(lifestyleItem =>
                <tr key={ lifestyleItem.lifestyleId }>
                    { !lifestyleItem.editing
                        ? <td onDoubleClick={ () => this.enterEditing(lifestyleItem) }>
                            { lifestyleItem.lifestyleName }
                        </td>
                        : <td>
                            <input type="text"
                                className="form-control"
                                defaultValue={ lifestyleItem.lifestyleName }
                                onBlur={ e => this.updateLifestyleName(e, lifestyleItem) } />
                        </td>
                    }
                    { !lifestyleItem.editing
                        ? <td onDoubleClick={ () => this.enterEditing(lifestyleItem) }>
                            { lifestyleItem.lifestyleDailyValue } per day
                        </td>
                        : <td>
                            <input type="text"
                                className="form-control"
                                defaultValue={ lifestyleItem.lifestyleDailyValue }
                                onBlur={ e => this.updateLifestyleValue(e, lifestyleItem) } /> per day
                        </td>
                    }
                    <td className="text-right">
                        <button className="btn btn-danger btn-sm">
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

export default Settings;
