import {guid} from '../utils/common';

function ReturnStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

ReturnStatement.prototype.createID = function () {
    if(!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

export {ReturnStatement};
