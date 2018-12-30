import $ from 'jquery';
import {parseCode} from './utils/code-analyzer';

import {facadeDeclaration} from './statement-payload/facade-declaration-handler';
import {SymbolicSubstitutionHandler} from './statement-symbolic-substitution/symbolic-substitution-handler';
import {ColorHandler} from './color-condition/color-handler';
import {FlowchartHandler} from './flowchart/flowchart-handler';
import * as flowchart from 'flowchart.js';

$(document).ready(function () {

    $('#button').click(() => {
        let payloads = getPayloads();
        doSymbolicSubstitution(payloads);

        let inputCode = $('#inputCode').val();
        let inputCodeSplitted = parseInput(inputCode);

        colorCondition(payloads, inputCodeSplitted);

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        handleFlowChart(payloads);

    });
});

function handleFlowChart(payloads) {
    let flowchartInstance = new FlowchartHandler(payloads);
    flowchartInstance.addNullNode();
    flowchartInstance.addEmptyNode();
    flowchartInstance.createID({id: 1});
    flowchartInstance.declareNode();
    flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
    flowchartInstance.updateNextNode();
    let flowchartData = [];
    flowchartInstance.createNodeDeclarationCode(flowchartData);
    flowchartInstance.createNodeNextCode(flowchartData);

    drawFlowChart(flowchartData);
}

function drawFlowChart(flowchartData) {
    var diagram = flowchart.parse(flowchartData.join('\n'));
    diagram.drawSVG('diagram');
    diagram.drawSVG('diagram', {
        'yes-text': 'T',
        'no-text': 'F',
        'flowstate': {
            'approved': {'fill': '#58C4A3', 'font-size': 12, 'border-radius': 25},
        }
    });
}

function getPayloads() {
    let codeToParse = $('#codePlaceholder').val();
    let parsedCode = parseCode(codeToParse);

    let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
    facadeDeclarationHandler.createPayloads();
    return facadeDeclarationHandler.getPayloads();
}

function doSymbolicSubstitution(payloads) {
    let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
    symbolicSubstitution.doSymbolicSubstitution();
}

function colorCondition(payloads, input) {
    let colorCode = new ColorHandler(payloads, null, input, {isMarked: false});
    colorCode.colorCode();
}


function parseInput(input) {
    input = '[' + input + ']';

    return eval(input);
}



