import {ColorHandler} from './color-handler';

function FunctionStatement(wrapper, payloads, input) {
    this.payloads = payloads;
    this.wrapper = wrapper;
    this.input = input;
}

FunctionStatement.prototype.colorCode = function () {
    let bodyCode = this.payloads.body;

    let colorCreator = new ColorHandler(bodyCode, this, this.input);
    colorCreator.colorCode();
};

FunctionStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

FunctionStatement.prototype.getParams = function () {
    let params = this.payloads.params;
    let wrapperParams = this.getWrapperParams();

    return [...params, ...wrapperParams];
};


export {FunctionStatement};
