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
        console.log(payloads)

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);

        var diagram = flowchart.parse(
            flowchartData.join('\n')
        );
        diagram.drawSVG('diagram');

        // you can also try to pass options:

        diagram.drawSVG('diagram', {
            'x': 0,
            'y': 0,
            'line-width': 3,
            'line-length': 50,
            'text-margin': 10,
            'font-size': 14,
            'font-color': 'black',
            'line-color': 'black',
            'element-color': 'black',
            'fill': 'white',
            'yes-text': 'T',
            'no-text': 'F',
            'arrow-end': 'block',
            'scale': 1,
            // style symbol types
            'symbols': {
                'start': {
                    'font-color': 'red',
                    'element-color': 'green',
                    'fill': 'yellow'
                },
                'end': {
                    'class': 'end-element'
                }
            },
            // even flowstate support ;-)
            'flowstate': {
                'past': {'fill': '#CCCCCC', 'font-size': 12},
                'current': {'fill': 'yellow', 'font-color': 'red', 'font-weight': 'bold'},
                'future': {'fill': '#FFFF99'},
                'request': {'fill': 'blue'},
                'invalid': {'fill': '#444444'},
                'approved': {'fill': '#58C4A3', 'font-size': 12, 'border-radius': 25},
                'rejected': {'fill': '#C45879', 'font-size': 12}
            }
        });
    });

});

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
    let colorCode = new ColorHandler(payloads, null, input);
    colorCode.colorCode();
}


function parseInput(input) {
    input = '[' + input + ']';

    return eval(input);
}



