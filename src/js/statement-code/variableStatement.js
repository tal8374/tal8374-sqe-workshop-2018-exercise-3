import {addMarginLeft} from '../utils/common';

function VariableStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

VariableStatement.prototype.createCode = function () {
    let text = 'let ' + this.payloads.name + ' = ' + this.payloads.value + ';';

    let code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);
};

VariableStatement.prototype.getCode = function () {
    return this.code;
};

export {VariableStatement};
