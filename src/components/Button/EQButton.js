import React from "react"
import styled from 'styled-components'

const Number = styled.button`
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
        margin: 0.1em;
        width: 1.375em;
        height: 2.83em;
        position: relative;
        left: 3.1rem;
        bottom: 4.4rem;
    `;

class EQButton extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { value: this.props.text};

    }

    handleClick = () => {
        console.log("handling click on "+this.props.text);
        this.props.triggerButtonAction(this.props.text);
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

export default EQButton