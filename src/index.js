import React from "react";
import ReactDOM from "react-dom";
import DayPicker, { DateUtils } from "react-day-picker";
import format from "date-fns/format";
import parse from "date-fns/parse";
import "react-day-picker/lib/style.css";
import Clipboard from "react-clipboard.js";

const formatDate = date => {
  return format(date, "YYYY-MM-DD");
};

const btnStyle = { padding: "10px 15px", fontWeight: "bold" };

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.inputRef = React.createRef();
    this.state = {
      selectedDays: []
    };
  }
  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  onBlur(event) {
    let input = this.inputRef.current.value;

    //'2018-08-15,2018-08-16,2018-08-22'
    input = input.split(",");

    const dates = input.map(date => {
      return parse(date);
    });
    this.setState({ selectedDays: dates });
  }

  outputSelected() {
    const { selectedDays } = this.state;
    const dates = selectedDays.map(date => {
      return formatDate(date);
    });

    return dates.join(", ");
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />

        <p>
          <input
            ref={this.inputRef}
            style={{ marginRight: "10px" }}
            name="input"
            placeholder="input"
          />
          <button style={btnStyle} onClick={this.onBlur}>
            {" "}
            Select Days
          </button>
        </p>

        <p>
          <Clipboard
            style={btnStyle}
            data-clipboard-text={this.outputSelected()}
          >
            Copy To Clipboard
          </Clipboard>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("root"));
