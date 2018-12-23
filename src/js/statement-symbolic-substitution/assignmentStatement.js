import {getGlobalVariables} from '../utils/common';

function AssignmentStatement(wrapper, payloads) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.localVariables = {};
}

AssignmentStatement.prototype.doSymbolicSubstitution = function () {

};

AssignmentStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};

AssignmentStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

AssignmentStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

AssignmentStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper, this.getParams());
};

export {AssignmentStatement};
