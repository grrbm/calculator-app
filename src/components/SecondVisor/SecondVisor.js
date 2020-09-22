import React from "react"
import styled from "styled-components"


const VisorScreen = styled.input`
    font-size: 1rem; 
    width: 10em;
    height: 1.3rem;
    width: 7.4rem;
    text-align: right;
    padding: 0.3rem;
    outline: 1px;
    &:focus {
        outline: 1px;
        
    }
    &:hover {
        outline: 1px;
        cursor:default;
    }
`
const operatorsAvailable = ['+','-','x','/'];

class SecondVisor extends React.Component{

    constructor(props){
        super(props);
        this.state = { filteredExpression: ''}
    }

    componentDidUpdate(prevProps){
        if (prevProps.lastResult !== this.props.lastResult){
            //let arrayOfChars = this.props.expression.split("");
            //const found = arr1.some(r=> arr2.includes(r))
            this.setState({
                filteredExpression: this.props.lastResult
            });
        }
    }

    render(){
        return <VisorScreen value={this.state.filteredExpression} readOnly/>
    }


}


export default SecondVisor