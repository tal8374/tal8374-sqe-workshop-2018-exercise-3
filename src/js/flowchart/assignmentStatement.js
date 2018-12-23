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

export {AssignmentStatement};
