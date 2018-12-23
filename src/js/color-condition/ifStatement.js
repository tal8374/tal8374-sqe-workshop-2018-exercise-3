import {colorCondition} from '../utils/common';
import {ColorHandler} from './color-handler';

function IfStatement(wrapper, payload, input, isMarked) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.input = input;
    this.isMarked = isMarked;
}

IfStatement.prototype.colorCode = function () {
    this.colorCondition();

    this.handleBody();
};

IfStatement.prototype.colorCondition = function () {
    let condition = this.payload.declaration.condition;
    colorCondition(this.payload, this.getParams(), condition, this.input);
    this.isMarked.isMarked = this.payload.style.backgroundColor === '#7FFF00';
};

IfStatement.prototype.handleBody = function () {
    let bodyCode = this.payload.body;

    let colorCreator = new ColorHandler(bodyCode, this, this.input);
    colorCreator.colorCode();
};

IfStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

export {IfStatement};
