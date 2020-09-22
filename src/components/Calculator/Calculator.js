import React from "react"
import DotButton from '../Button/DotButton.js'
import Button from '../Button/Button.js'
import ACButton from '../Button/ACButton.js'
import EQButton from '../Button/EQButton.js'
import Visor from '../Visor/Visor.js'
import SecondVisor from '../SecondVisor/SecondVisor.js'
import styled from 'styled-components'
const { operatorsAvailable } = require('../Utils/Utils.js')


const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Line = styled.div`
    display: flex;
    flex-direction: row;
    background: papayawhip;
`;

const TwoPlaceLine = styled(Line)`
`;



class Calculator extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            expression: '', 
            solved: true,
            lastResult: ''
        };
    }

    clearVisors = () => {
        this.setState({
            expression: '',
            solved: true,
            lastResult: ''
        });
    }

    addToExpression = (exp) => {

        //if current expression is an operator
        this.setState((prevState,props)=>{
            if (exp.length === 1 && operatorsAvailable.includes(exp[0])){
                return {
                    lastResult: exp[0]
                }
            }
            if (exp === '0.'){
                return {
                    lastResult: exp
                }
            }
            if (prevState.lastResult.length === 1 && operatorsAvailable.includes(prevState.lastResult[0])){
                return {
                    lastResult: exp[0]
                }
            }
            return {
                lastResult: prevState.lastResult+exp
            }
        })
        
        if (this.state.solved)
        {
            //if an operator shows up immediatly after a result
            if(exp.length === 1 && operatorsAvailable.includes(exp[0])){
                return this.setState({
                    expression: this.state.lastResult+exp,
                    solved: false
                })
            }
            console.log("setting state to "+exp);
            return this.setState({ 
                expression: exp,
                solved: false
            })
        }
        this.setState({ expression: this.state.expression+exp })
        console.log("setting state to "+this.state.expression+exp);
    };

    calculateAnswer = (exp) => {
        console.log("calculating answer");
        if (this.state.expression.includes('='))
        {
            return;
        }
        this.setState({ 
            expression: this.state.expression+exp+this.solveExpression(this.state.expression),
            solved: true
        })
    }

    solveExpression = (exp) => {
        let terms = [];
        let temp = '';
        let operators = [];
        for(let i=0;i < exp.length;i++)
        {
            if (operatorsAvailable.includes(exp.charAt(i))){
                terms.push(temp);
                operators.push(exp.charAt(i));
                temp = '';
            }
            else if (i === exp.length-1){
                temp+=exp.charAt(i);
                terms.push(temp);
                temp = '';
            }
            else{
                temp+=exp.charAt(i);
            }
        }
        console.log("terms: "+JSON.stringify(terms));
        console.log("operators: "+JSON.stringify(operators));
        const result = this.doMath(terms,operators);
        this.setState({lastResult: result});
        return result;
    }

    doMath = (terms,operators) => {
        let result = 0;
        let i = 0, j = 1;
        if (j > terms.length)
        {
            return "NaN"
        }
        for(let k=0;k<operators.length;k++){
            const term1 = parseFloat(terms[i]);
            const term2 = parseFloat(terms[j]);
            switch(operators[i]){
                case '+':
                    result =  term1 + term2;
                    break;
                case '-':
                    result = term1 - term2;
                    break;
                case 'x':
                    result = term1 * term2;
                    break;
                case '/':
                    result = term1 / term2;
                    break;
                default:
                    break;
            }
            console.log("term1 = "+term1+", term2 = "+term2+", operator = "+operators[i]+". result = "+result);
            i++;
            j++;
        }
        return result;
    }
    
    componentDidMount(){
        this.setState({ expression: '0' })
    }

    render() {
        return <Main>
                    <Line>
                        <Visor expression={this.state.expression}/>
                    </Line>
                    <Line>
                        <SecondVisor expression={this.state.expression} lastResult={this.state.lastResult} />
                    </Line>
                    <Line>
                        <ACButton triggerButtonAction={this.clearVisors} text={`AC`} />
                        <Button triggerButtonAction={this.addToExpression} text={`/`} />
                        <Button triggerButtonAction={this.addToExpression} text={`x`} />
                    </Line>
                    <Line>
                        <Button triggerButtonAction={this.addToExpression} text={`7`} />
                        <Button triggerButtonAction={this.addToExpression} text={`8`} />
                        <Button triggerButtonAction={this.addToExpression} text={`9`} />
                        <Button triggerButtonAction={this.addToExpression} text={`-`} />
                    </Line>
                    <Line>
                        <Button triggerButtonAction={this.addToExpression} text={`4`} />
                        <Button triggerButtonAction={this.addToExpression} text={`5`} />
                        <Button triggerButtonAction={this.addToExpression} text={`6`} />
                        <Button triggerButtonAction={this.addToExpression} text={`+`} />
                    </Line>
                    <Line>
                        <Button triggerButtonAction={this.addToExpression} text={`1`} />
                        <Button triggerButtonAction={this.addToExpression} text={`2`} />
                        <Button triggerButtonAction={this.addToExpression} text={`3`} />
                        <Button triggerButtonAction={this.calculateAnswer} text={`=`} />
                    </Line>
                    <TwoPlaceLine>
                        <ACButton triggerButtonAction={this.addToExpression} text={`0`} />
                        <DotButton triggerButtonAction={this.addToExpression} text={`.`} lastResult={this.state.lastResult} solved={this.state.solved} expression={this.state.expression} />
                        <Button triggerButtonAction={this.calculateAnswer} text={`=`} />
                    </TwoPlaceLine>
                    <EQButton triggerButtonAction={this.calculateAnswer} text={`=`} />
               </Main> 
    }
}

export default Calculator