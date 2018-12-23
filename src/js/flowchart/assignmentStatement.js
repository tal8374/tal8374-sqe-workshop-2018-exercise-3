import {guid} from '../utils/common';

function AssignmentStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

AssignmentStatement.prototype.createID = function () {
    if(!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

AssignmentStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=> operation:' +  this.getOperation();
};

AssignmentStatement.prototype.getOperation = function () {
    return this.payload.name + ' = ' + this.payload.value;
};

AssignmentStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

export {AssignmentStatement};
