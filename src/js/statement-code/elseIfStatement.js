import {addColor, addMarginLeft} from '../utils/common';
import {CodeHandler} from './code-handler';

function ElseIfStatement(wrapper, payload, numberOfTabs) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

ElseIfStatement.prototype.createCode = function () {
    this.createDeclarationCode();

    this.createBodyCode();

    this.closeCode();
};

ElseIfStatement.prototype.createDeclarationCode = function () {
    if (this.isElseIfStatement()) {
        this.createElseIfStatement();
    } else {
        this.createElseStatement();
    }
};

ElseIfStatement.prototype.isElseIfStatement = function () {
    return this.payload.declaration;
};

ElseIfStatement.prototype.createElseIfStatement = function () {
    let conditionText = ' (' + this.payload.declaration.condition + ')';

    let text = 'else if ' + conditionText + ' {';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    addColor(code, this.payload.style.backgroundColor);

    this.code.push(code);
};

ElseIfStatement.prototype.createElseStatement = function () {
    let text = 'else ' + ' {';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    addColor(code, this.payload.style.backgroundColor);

    this.code.push(code);
};

ElseIfStatement.prototype.createBodyCode = function () {
    let bodyCode = this.payload.body;

    for (let i = 0; i < bodyCode.length; i++) {
        let codeCreator = new CodeHandler([bodyCode[i]], this, this.numberOfTabs + 1);
        codeCreator.createCode();
        let createdCode = codeCreator.getCode();

        for (let j = 0; j < createdCode.length; j++) {
            this.code.push(createdCode[j]);
        }
    }
};

ElseIfStatement.prototype.closeCode = function () {
    let text = '}';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

ElseIfStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

ElseIfStatement.prototype.getCode = function () {
    return this.code;
};

export {ElseIfStatement};
