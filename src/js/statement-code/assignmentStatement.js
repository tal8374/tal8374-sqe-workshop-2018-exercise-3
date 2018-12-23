import {addMarginLeft} from '../utils/common';

function AssignmentStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

AssignmentStatement.prototype.createCode = function () {
    let text = this.payloads.name + ' = ' + this.payloads.value + ';';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    if (this.isParam()) return;

    this.code.push(code);
};

AssignmentStatement.prototype.isParam = function () {
    let params = this.getWrapperParams();

    return params.filter(param => param.name === this.payloads.name).length === 0;
};

AssignmentStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

AssignmentStatement.prototype.getCode = function () {
    return this.code;
};

export {AssignmentStatement};
