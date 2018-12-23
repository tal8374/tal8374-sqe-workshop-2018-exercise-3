import {guid} from '../utils/common';

function VariableStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

VariableStatement.prototype.createID = function () {
    if(!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

export {VariableStatement};
