import {CodeHandler} from './code-handler';
import {addMarginLeft} from '../utils/common';

function WhileStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

WhileStatement.prototype.createCode = function () {
    this.createDeclarationCode();

    this.createBodyCode();

    this.closeCode();
};

WhileStatement.prototype.createDeclarationCode = function () {
    let conditionText = ' (' + this.payloads.declaration.condition + ')';

    let text = 'while ' + conditionText + ' {';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

WhileStatement.prototype.createBodyCode = function () {
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

WhileStatement.prototype.closeCode = function () {
    let text = '}';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

WhileStatement.prototype.getParams = function () {
    if(!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

WhileStatement.prototype.getCode = function () {
    return this.code;
};

export {WhileStatement};
