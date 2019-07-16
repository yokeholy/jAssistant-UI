import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";

// Bootstrap
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Filter
import OrginalFilter from "../filters/OrdinalFilter";

import API from "../services/api";
import StateButton from "./fragments/StateButton";

class RoutineConfig extends React.Component {
    state = {
        frequencyConfig: {
            periodType: "weekly",
            monthlyDay: 1,
            weeklyDay: 1,
            dailyFrequency: "1111111"
        },
        daysInWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        daysInMonth: [...Array(31).keys()]
    };

    componentDidMount () {
        this.getRoutineConfig();
    }

    updatePeriodType = (e, newPeriod) => {
        if (e.target.checked) {
            this.setState({
                frequencyConfig: {
                    ...this.state.frequencyConfig,
                    periodType: newPeriod
                }
            });
        }
    }

    updateMonthlyFrenquency = e => {
        this.setState({
            frequencyConfig: {
                ...this.state.frequencyConfig,
                monthlyDay: e.target.value
            }
        });
    }

    updateWeeklyFrenquency = e => {
        this.setState({
            frequencyConfig: {
                ...this.state.frequencyConfig,
                weeklyDay: e.target.value
            }
        });
    }

    updateDailyFrenquency = index => {
        let frequencyConfig = this.state.frequencyConfig.dailyFrequency;
        let newFrequency = frequencyConfig[index] === "0" ? "1" : "0";
        frequencyConfig = frequencyConfig.substr(0, index) + newFrequency + frequencyConfig.substr(index + newFrequency.length);
        this.setState({
            frequencyConfig: {
                ...this.state.frequencyConfig,
                dailyFrequency: frequencyConfig
            }
        });
    }

    getRoutineConfig = () =>
        API.post("/routine/getRoutineConfig", {
            routineId: this.props.routineId
        })
            .then(response => {
                this.setState({
                    frequencyConfig: response.frequencyConfig
                });
            });

    saveRoutineConfig = () =>
        API.post("/routine/saveRoutineConfig", {
            routineId: this.props.routineId,
            frequencyConfig: this.state.frequencyConfig
        })
            .then(() => {
                toast.success("Routine's configuration is updated successfully.");
                this.getRoutineConfig();
            });

    render () {
        return (
            <div className="card">
                <div className="card-body">
                    <Form className="hidingElement">
                        <Form.Label>Configure Routine Frequency</Form.Label>
                        <Form.Group>
                            <Form.Check type="radio"
                                label="Monthly"
                                inline
                                checked={ this.state.frequencyConfig.periodType === "monthly" }
                                onChange={ e => this.updatePeriodType(e, "monthly") } />
                            <Form.Check type="radio"
                                label="Weekly"
                                inline
                                checked={ this.state.frequencyConfig.periodType === "weekly" }
                                onChange={ e => this.updatePeriodType(e, "weekly") } />
                            <Form.Check type="radio"
                                label="Daily"
                                inline
                                checked={ this.state.frequencyConfig.periodType === "daily" }
                                onChange={ e => this.updatePeriodType(e, "daily") } />
                        </Form.Group>
                        { this.state.frequencyConfig.periodType === "monthly"
                        && <Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Every</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select"
                                    value={ this.state.frequencyConfig.monthlyDay }
                                    onChange={ this.updateMonthlyFrenquency }>
                                    { this.state.daysInMonth.map(day =>
                                        <option key={ day + 1 }
                                            value={ day + 1 }>
                                            { OrginalFilter(day + 1) }
                                        </option>
                                    )}
                                </Form.Control>
                                <InputGroup.Append>
                                    <InputGroup.Text>day of the month.</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            { this.state.frequencyConfig.monthlyDay >= 29
                            && <Form.Label className="text-info">For months with less than { this.state.frequencyConfig.monthlyDay } days, the last day will be used.</Form.Label>
                            }
                        </Form.Group>
                        }
                        { this.state.frequencyConfig.periodType === "weekly"
                        && <Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Every</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select"
                                    value={ this.state.frequencyConfig.weeklyDay }
                                    onChange={ this.updateWeeklyFrenquency }>
                                    { this.state.daysInWeek.map((day, index) =>
                                        <option key={ day }
                                            value={ index + 1 }>
                                            { day }
                                        </option>
                                    )}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                        }
                        { this.state.frequencyConfig.periodType === "daily"
                        && <Form.Group>
                            { this.state.frequencyConfig.dailyFrequency.length
                            && this.state.frequencyConfig.dailyFrequency.split("").map((day, index) =>
                                <Form.Check key={ index }
                                    type="checkbox"
                                    inline
                                    label={ this.state.daysInWeek[index] }
                                    checked={ day === "1" }
                                    onChange={ () => this.updateDailyFrenquency(index) } />
                            )}
                        </Form.Group>
                        }
                        <StateButton buttonType="primary"
                            buttonIcon="fas fa-plus"
                            buttonLabel="Save"
                            inProgressLabel="Saving"
                            action={ this.saveRoutineConfig } />
                    </Form>
                </div>
            </div>
        );
    }
}

RoutineConfig.propTypes = {
    routineId: PropTypes.number.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(RoutineConfig);
