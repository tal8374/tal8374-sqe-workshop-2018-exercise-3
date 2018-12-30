import {ColorHandler} from './color-handler';

function FunctionStatement(wrapper, payloads, input, isMarked) {
    this.payloads = payloads;
    this.wrapper = wrapper;
    this.input = input;
    this.isMarked = isMarked;
}

FunctionStatement.prototype.colorCode = function () {
    let bodyCode = this.payloads.body;

    let colorCreator = new ColorHandler(bodyCode, this, this.input, this.isMarked);
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
