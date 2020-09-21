import React from "react"
import Button from '../Button/Button.js'
import Visor from '../Visor/Visor.js'
import SecondVisor from '../SecondVisor/SecondVisor.js'
import styled from 'styled-components'


const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Line = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em;
    background: papayawhip;
`;

const operatorsAvailable = ['+','-','x','/'];

class Calculator extends React.Component {

    constructor(props){
        super(props);
        this.state = { expression: '', solved: true};
    }

    clearVisors = () => {
        this.setState({
            expression: '0',
            solved: true
        });
    }

    addToExpression = (exp) => {
        if (this.state.solved)
        {
            console.log("setting state to "+exp);
            return this.setState({ 
                expression: exp === '.' ? '0.' : exp,
                solved: false
            })
        }
        //if last char was an operator
        if (operatorsAvailable.includes(this.state.expression.charAt(this.state.expression.length-1))){
            if (exp === '.'){
                exp = '0.';
            }            
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
        console.log("solving expression "+exp);
        let terms = [];
        let temp = '';
        let operators = [];
        for(let i=0;i < exp.length;i++)
        {
            if (operatorsAvailable.includes(exp.charAt(i))){
                console.log("pushing term "+temp);
                terms.push(temp);
                operators.push(exp.charAt(i));
                temp = '';
            }
            else if (i === exp.length-1){
                temp+=exp.charAt(i);
                console.log("pushing term "+temp);
                terms.push(temp);
                temp = '';
            }
            else{
                temp+=exp.charAt(i);
            }
        }
        console.log("terms: "+JSON.stringify(terms));
        console.log("operators: "+JSON.stringify(operators));
        return this.doMath(terms,operators)
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
                        <SecondVisor expression={this.state.expression}/>
                    </Line>
                    <Line>
                        <Button triggerButtonAction={this.addToExpression} text={`1`} />
                        <Button triggerButtonAction={this.addToExpression} text={`2`} />
                        <Button triggerButtonAction={this.addToExpression} text={`3`} />
                    </Line>
                    <Line>
                        <Button triggerButtonAction={this.addToExpression} text={`4`} />
                        <Button triggerButtonAction={this.addToExpression} text={`5`} />
                        <Button triggerButtonAction={this.addToExpression} text={`6`} />
                    </Line>
                    <Line>
                        <Button triggerButtonAction={this.addToExpression} text={`7`} />
                        <Button triggerButtonAction={this.addToExpression} text={`8`} />
                        <Button triggerButtonAction={this.addToExpression} text={`9`} />
                    </Line>
                    <Line>
                        <Button triggerButtonAction={this.addToExpression} text={`0`} />
                        <Button triggerButtonAction={this.addToExpression} text={`.`} />
                        <Button triggerButtonAction={this.clearVisors} text={`AC`} />
                    </Line>
                    <Line>
                        <Button triggerButtonAction={this.addToExpression} text={`+`} />
                        <Button triggerButtonAction={this.addToExpression} text={`-`} />
                        <Button triggerButtonAction={this.addToExpression} text={`x`} />
                        <Button triggerButtonAction={this.addToExpression} text={`/`} />
                        <Button triggerButtonAction={this.calculateAnswer} text={`=`} />
                    </Line>
               </Main> 
    }
}

export default Calculator