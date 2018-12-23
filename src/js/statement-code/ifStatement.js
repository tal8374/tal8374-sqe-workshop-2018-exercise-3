import {addColor, addMarginLeft} from '../utils/common';
import {CodeHandler} from './code-handler';

function IfStatement(wrapper, payload, numberOfTabs) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

IfStatement.prototype.createCode = function () {
    this.createDeclarationCode();

    this.createBodyCode();

    this.closeCode();
};


IfStatement.prototype.createDeclarationCode = function () {
    let conditionText = ' (' + this.payload.declaration.condition + ')';

    let text = 'if ' + conditionText + ' {';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    addColor(code, this.payload.style.backgroundColor);

    this.code.push(code);
};

IfStatement.prototype.createBodyCode = function () {
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

IfStatement.prototype.closeCode = function () {
    let text = '}';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

IfStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

IfStatement.prototype.getCode = function () {
    return this.code;
};

export {IfStatement};
