import $ from 'jquery';
import {parseCode} from './utils/code-analyzer';

import {facadeDeclaration} from './statement-payload/facade-declaration-handler';
import {CodeHandler} from './statement-code/code-handler';
import {SymbolicSubstitutionHandler} from './statement-symbolic-substitution/symbolic-substitution-handler';
import {ColorHandler} from './color-condition/color-handler';

$(document).ready(function () {

    $('#button').click(() => {
        let payloads = getPayloads();
        doSymbolicSubstitution(payloads);

        let inputCode = $('#inputCode').val();
        let inputCodeSplitted = parseInput(inputCode);

        colorCondition(payloads, inputCodeSplitted);

        let code = createCode(payloads);

        printCode(code);
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

function createCode(payloads) {
    let codeCreatorHandler = new CodeHandler(payloads);
    codeCreatorHandler.createCode();
    return codeCreatorHandler.getCode();
}

function colorCondition(payloads, input) {
    let colorCode = new ColorHandler(payloads, null, input);
    colorCode.colorCode();
}


function parseInput(input) {
    input = '[' + input + ']';

    return eval(input);
}

function printCode(code) {
    let codeWrapper = document.getElementById('codeWrapper');

    code.forEach(function (codeStatement) {
        var div = document.createElement('div');

        div.innerText = codeStatement.text;

        if (codeStatement.style) {
            div.style.marginLeft = codeStatement.style.marginLeft;
            div.style.backgroundColor = codeStatement.style.backgroundColor;
        }

        codeWrapper.appendChild(div);
    });
}



