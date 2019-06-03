import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import API from "../services/api";

class Lifestyle extends React.Component {
    state = {
        showingFooter: true,
        lifestyleConfig: {dailyWater: 6, dailyStandingUp: 8, dailyWorkout: 1},
        lifestyles: {water: 0, standing: 0, workout: 0}
    };

    componentDidMount () {
        this.getLifestyle();
    }

    getLifestyle () {
        API.get("/lifestyle/getLifestyle")
            .then(response => {
                this.setState({
                    lifestyles: response.data.data.lifestyles,
                    lifestyleConfig: response.data.data.lifestyleConfig
                });
            });
    }
    lifestyleUp = type => {
        API.post("/lifestyle/upLifestyle", { type })
            .then(() => {
                toast.success("Cheers! Keep this good lifestyle up.");
                this.getLifestyle();
            });
    }

    render () {
        return (
            <footer className="fixed-bottom bg-secondary">
                <div id="toggleFooter" className="d-block d-md-none">
                    <button className="btn btn-block btn-secondary" onClick={ () => this.setState({ showingFooter: !this.state.showingFooter }) }>
                        { !this.state.showingFooter
                            && <span>
                                <i className="fas fa-chevron-up"></i><br />
                            </span>
                        }
                        Lifestyle
                        { this.state.showingFooter
                            && <span>
                                <br /><i className="fas fa-chevron-down"></i>
                            </span>
                        }
                    </button>
                </div>
                { this.state.showingFooter
                    ? <div className="container-fluid p-2">
                        <div className="row">
                            <div className="col-12 col-md-4 lifestyleSection clickable" onClick={ () => this.lifestyleUp("water")}>
                                <div className="plusIcon bg-info">
                                    <i className="fas fa-plus"></i>
                                </div>
                                <div className="row mt-2">
                                    {
                                        [...Array(this.state.lifestyleConfig.dailyWater).keys()].map(water =>
                                            <div className={`col-1 ${water < this.state.lifestyles.water ? "text-info" : ""}`} key={water}>
                                                <i className="fas fa-tint"></i>
                                            </div>
                                        )
                                    }
                                </div>
                                <h5 className="mb-0 mt-2">Water</h5>
                                <p className="text-muted">6 cups of 500ml of water</p>
                            </div>
                            <div className="col-12 col-md-4 lifestyleSection clickable" onClick={ () => this.lifestyleUp("standing")}>
                                <div className="plusIcon bg-success">
                                    <i className="fas fa-plus"></i>
                                </div>
                                <div className="row mt-2">
                                    {
                                        [...Array(this.state.lifestyleConfig.dailyStandingUp).keys()].map(standing =>
                                            <div className={`col-1 ${standing < this.state.lifestyles.standing ? "text-success" : ""}`} key={standing}>
                                                <i className="fas fa-shoe-prints"></i>
                                            </div>
                                        )
                                    }
                                </div>
                                <h5 className="mb-0 mt-2">Standing Up</h5>
                                <p className="text-muted">8 stand-ups 1 hour apart</p>
                            </div>
                            <div className="col-12 col-md-4 lifestyleSection clickable" onClick={ () => this.lifestyleUp("workout")}>
                                <div className="plusIcon bg-warning">
                                    <i className="fas fa-plus"></i>
                                </div>
                                <div className="row mt-2">
                                    {
                                        [...Array(this.state.lifestyleConfig.dailyWorkout).keys()].map(workout =>
                                            <div className={`col-1 ${workout < this.state.lifestyles.workout ? "text-warning" : ""}`} key={workout}>
                                                <i className="fas fa-dumbbell"></i>
                                            </div>
                                        )
                                    }
                                </div>
                                <h5 className="mb-0 mt-2">Workout</h5>
                                <p className="text-muted">Any sports</p>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </footer>
        );
    }
}

Lifestyle.propTypes = {
    hideEverything: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Lifestyle);
