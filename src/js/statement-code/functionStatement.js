import {CodeHandler} from './code-handler';
import {addMarginLeft} from '../utils/common';

function FunctionStatement(wrapper, payloads, numberOfTabs) {
    this.payloads = payloads;
    this.wrapper = wrapper;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

FunctionStatement.prototype.createCode = function () {
    this.createDeclarationCode();

    this.createBodyCode();

    this.closeCode();
};

FunctionStatement.prototype.createDeclarationCode = function () {
    let paramsText = this.getParamsText();

    let text = 'function ' + this.payloads.declaration.name + paramsText + ' {';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

FunctionStatement.prototype.getParamsText = function () {
    let paramsText = ' (';
    let params = this.payloads.params;

    for (let i = 0; i < params.length; i++) {
        if (i !== 0) {
            paramsText += ', ';
        }

        paramsText += params[i].name;
    }

    paramsText += ')';

    return paramsText;
};

FunctionStatement.prototype.createBodyCode = function () {
    let bodyCode = this.payloads.body;

    for (let i = 0; i < bodyCode.length; i++) {
        let codeCreator = new CodeHandler([bodyCode[i]], this, this.numberOfTabs + 1);
        codeCreator.createCode();
        let createdCode = codeCreator.getCode();

        for (let j = 0; j < createdCode.length; j++) {
            this.code.push(createdCode[j]);
        }
    }
};

FunctionStatement.prototype.closeCode = function () {
    let text = '}';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

FunctionStatement.prototype.getWrapperParams = function () {
    return [];
};

FunctionStatement.prototype.getParams = function () {
    let params = this.payloads.params;
    let wrapperParams = this.getWrapperParams();

    return [...params, ...wrapperParams];
};

FunctionStatement.prototype.getCode = function () {
    return this.code;
};

export {FunctionStatement};
