import React from "react"
import styled from "styled-components"


const VisorScreen = styled.input`
    font-size: 1.5em; 
    width: 10em;
    height: 1.3em;
    text-align: right;
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