import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import API from "../services/api";

import LifestyleSettings from "./LifestyleSettings";

class Lifestyle extends React.Component {
    state = {
        showingLifestyles: true,
        lifestyles: []
    };

    componentDidMount = () => {
        if (this.props.loginStatus) {
            this.getLifestyle();
        }
    };

    getLifestyle = () =>
        API.get("/lifestyle/getLifestyle")
            .then(response => {
                this.setState({
                    lifestyles: response.lifestyles
                });
            });

    lifestyleUp = lifestyleId =>
        API.post("/lifestyle/upLifestyle", { lifestyleId })
            .then(() => {
                toast.success("Cheers! Keep this good lifestyle up.");
                this.getLifestyle();
            });

    render () {
        const lifestyleList = this.state.lifestyles.length
            ? this.state.lifestyles.map(lifestyle =>
                <div key={ lifestyle.lifestyleId }
                    className={`col-12 col-md-${12 / this.state.lifestyles.length} lifestyleSection clickable hidingElement`}
                    onClick={ () => this.lifestyleUp(lifestyle.lifestyleId)}>
                    <div className="plusIcon bg-info">
                        <i className="fas fa-plus" />
                    </div>
                    <div className="row mt-2">
                        {
                            [...Array(lifestyle.lifestyleDailyValue).keys()].map(value =>
                                <div className={`col-1 ${value < lifestyle.todayValue ? `text-${lifestyle.lifestyleColorName}` : ""}`} key={ value }>
                                    <i className={`fas fa-${lifestyle.lifestyleIconName}`} />
                                </div>
                            )
                        }
                    </div>
                    <h5 className="mb-0 mt-2">{ lifestyle.lifestyleName }</h5>
                    <p className="text-muted">{ lifestyle.lifestyleCaption }</p>
                </div>)
            : <div className="col-12 text-center">
                <p className="text-info">You haven&lsquo;t set up and Lifestyle items yet.</p>
                <p>Please go to <NavLink to="/settings">Settings</NavLink> page to set it up.</p>
            </div>;

        return (
            <div id="lifestyle"
                className={`${this.props.dashboard ? "fixed-bottom bg-secondary" : ""}`}>
                { this.props.dashboard
                && <div id="toggleFooter" className="d-block d-md-none">
                    <button className="btn btn-block btn-secondary" onClick={ () => this.setState({ showingLifestyles: !this.state.showingLifestyles }) }>
                        { !this.state.showingLifestyles
                            && <span>
                                <i className="fas fa-chevron-up" /><br />
                            </span>
                        }
                        Lifestyle
                        { this.state.showingLifestyles
                            && <span>
                                <br /><i className="fas fa-chevron-down" />
                            </span>
                        }
                    </button>
                </div>
                }
                { this.state.showingLifestyles
                    ? <div className="container-fluid p-2">
                        <div className="row">
                            { lifestyleList }
                        </div>
                    </div>
                    : null
                }
                { !this.props.dashboard
                && <LifestyleSettings getLifestyle={ () => this.getLifestyle() } />
                }
            </div>
        );
    }
}

Lifestyle.propTypes = {
    dashboard: PropTypes.bool,
    loginStatus: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Lifestyle);
