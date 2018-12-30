import {updateLocalVariable, getGlobalVariables} from '../utils/common';

function ReturnStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.localVariables = {};
}

ReturnStatement.prototype.doSymbolicSubstitution = function () {
    this.initializeLocalVariables();
};

ReturnStatement.prototype.initializeLocalVariables = function () {
    updateLocalVariable(this.payload, this.localVariables, this.getGlobalVariables(), this.getParams());
};

ReturnStatement.prototype.getParams = function () {
    return this.wrapper.getParams();
};

ReturnStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper, this.getParams());
};

export {ReturnStatement};
