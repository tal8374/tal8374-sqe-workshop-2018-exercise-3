import {getGlobalVariables} from '../utils/common';

function VariableStatement(wrapper, payloads) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.localVariables = {};
}

VariableStatement.prototype.doSymbolicSubstitution = function () {

};

VariableStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper, this.getParams());
};

VariableStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};

VariableStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

VariableStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

export {VariableStatement};
