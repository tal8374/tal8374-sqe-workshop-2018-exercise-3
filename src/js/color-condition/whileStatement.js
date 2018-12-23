import {ColorHandler} from './color-handler';

function WhileStatement(wrapper, payloads, input) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.input = input;
}

WhileStatement.prototype.colorCode = function () {
    let bodyCode = this.payloads.body;

    let colorCreator = new ColorHandler(bodyCode, this, this.input);
    colorCreator.colorCode();
};

WhileStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};


export {WhileStatement};
