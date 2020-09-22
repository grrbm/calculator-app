import React from "react"
import styled from 'styled-components'
const { operatorsAvailable } = require('../Utils/Utils.js')

const Number = styled.button`
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
        width: 1.375em
    `;

class DotButton extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { value: this.props.text};

    }

    handleClick = () => {
        if (this.props.solved)
        {
            return this.props.triggerButtonAction('0'+this.props.text);
        }
        if(!this.props.lastResult.includes('.')){
            //if last thing typed was an operator
            if (this.props.lastResult.length === 1 && operatorsAvailable.includes(this.props.lastResult[0])){
                return this.props.triggerButtonAction('0'+this.props.text);
            }
            return this.props.triggerButtonAction(this.props.text);
        }

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

export default DotButton