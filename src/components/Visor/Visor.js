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

class Visor extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("Visor mounted!");
    }
    render(){
        return <VisorScreen value={this.props.expression} readOnly/>
    }


}


export default Visor