import React, { Component } from 'react';


export class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
            value: this.props.value
        }
    }

    onValueChange(value) {
        this.props.onValueChange(this.props.index, value);
    }
}

export class SubmitReset extends FormComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit() {
        this.props.onSubmit();
    }

    handleReset() {
        this.props.onReset();
    }
    handleCancel() {
        this.props.onCancel();
    }

    render() {
        return(
            <div>
                <br/>
                <button style={{fontSize: "15px"}} onClick={this.handleSubmit}>Submit</button>
                <button style={{fontSize: "15px"}} onClick={this.handleReset}>Reset</button>
                <button style={{fontSize: "15px"}} onClick={this.handleCancel}>Cancel</button>
            </div>

        );
    }
}

export class YesNo extends FormComponent {

    handleOnChange(event) {
        this.onValueChange(event.target.value);
    }

    render() {
        return (
            <div className="yesNo">
                <b>{this.props.title}</b><br/>
                <label key="Yes"> Yes
                    <input type="radio"
                        name="YesNo"
                        key="Yes"
                        value={true}
                        onChange={(event) => this.handleOnChange(event)}
                    />
                </label>
                <label key="No"> No
                    <input type="radio"
                        name="YesNo"
                        key="No"
                        value={false}
                        onChange={(event) => this.handleOnChange(event)}
                    />
                </label>
            </div>
        );
    }
}

export class TextBox extends FormComponent {

    handleOnChange(event) {
        this.onValueChange(event.target.value);
    }

    render() {
        return(
            <div className="textBox">
                <b>{this.props.title}</b><br/>
                <input type="text"
                    value={this.props.value}
                    onChange={(event) => this.handleOnChange(event)}
                />
            </div>
        );
    }
}

export class Increment extends FormComponent {
    constructor(props) {
        super(props);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleIncrement() {
        this.onValueChange(this.props.value + 1);
    }

    handleReset() {
        this.onValueChange(0);
    }

    render() {
        return(
            <div className="incrment">
                <b>{this.props.title}</b><br/>
                <b>{this.props.value}</b><br/>
                <button onClick={this.handleIncrement}>Increment</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

export class Timer extends FormComponent {
    constructor(props) {
        super(props);
        this.state = {time: 0, isOn: false, start: 0}
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        });
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
    }

    stopTimer() {
        this.setState({isOn: false});
        clearInterval(this.timer)
    }

    resetTimer() {
        this.setState({time: 0, isOn: false})
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    render() {
        let start = (this.state.time === 0) ?
            <button onClick={this.startTimer}>start</button> :
            null
        let stop = (this.state.time === 0 || !this.state.isOn) ?
            null :
            <button onClick={this.stopTimer}>stop</button>
        let resume = (this.state.time === 0 || this.state.isOn) ?
            null :
            <button onClick={this.startTimer}>resume</button>
        let reset = (this.state.time === 0 || this.state.isOn) ?
            null :
            <button onClick={this.resetTimer}>reset</button>
        return(
            <div>
                <h3>timer: {this.millisToMinutesAndSeconds(this.state.time)}</h3>
                {start}
                {resume}
                {stop}
                {reset}
            </div>
        );
    }
}

export class Dropdown extends FormComponent {
    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        this.onValueChange(event.target.value);
    }

    render() {
        var optionList = this.props.options.map((entry, index) => {
            return <option value={entry} key={index}>{entry}</option>
        });

        return(
            <b>{this.props.title}<br/>
                <select value={this.props.value} onChange={this.handleOnChange}>
                    {optionList}
                </select>
            </b>
        );
    }
}

export class ErrorField extends FormComponent {
    render() {

        return (<b>Error: {this.props.name} is not recognized</b>);
    }
}
