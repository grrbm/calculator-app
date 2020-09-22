import React from "react"
import styled from 'styled-components'
const { operatorsAvailable } = require('../Utils/Utils.js')

const Number = styled.button`
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
        width: 1.375em
    `;

class OperatorButton extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { value: this.props.text};

    }

    handleClick = () => {
        if (this.props.lastResult.length === 1 && operatorsAvailable.includes(this.props.lastResult)){
            return;
        }
        return this.props.triggerButtonAction(this.props.text);
    }

    handleChange = () => {
        this.props.setState({value: this.props.text})
    }

    render() {
        return  <Number onClick={this.handleClick} onChange={this.handleChange} value={this.state.value} >
                    {this.props.text}
                </Number>
    }
}

export default OperatorButton