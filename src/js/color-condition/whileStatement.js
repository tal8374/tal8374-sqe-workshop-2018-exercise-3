import {ColorHandler} from './color-handler';
import {colorCondition} from '../utils/common';

function WhileStatement(wrapper, payload, input, isMarked) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.input = input;
    this.isMarked = isMarked;
}

WhileStatement.prototype.colorCode = function () {
    this.colorCondition();

    let bodyCode = this.payload.body;

    let colorCreator = new ColorHandler(bodyCode, this, this.input);
    colorCreator.colorCode();
};

WhileStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

WhileStatement.prototype.colorCondition = function () {
    let condition = this.payload.declaration.condition;
    colorCondition(this.payload, this.getParams(), condition, this.input);
    this.isMarked.isMarked = this.payload.style.backgroundColor === '#7FFF00';
};

export {WhileStatement};
