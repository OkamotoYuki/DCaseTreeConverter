var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DCaseNode = (function () {
    function DCaseNode(NodeType, Description, MetaData) {
        this.NodeType = NodeType;
        this.Description = Description;
        this.MetaData = MetaData;
        this.Children = [];
    }
    DCaseNode.prototype.toJson = function () {
    };
    DCaseNode.prototype.toXml = function () {
    };
    DCaseNode.prototype.toMarkdown = function () {
    };
    return DCaseNode;
})();
exports.DCaseNode = DCaseNode;
var GoalNode = (function (_super) {
    __extends(GoalNode, _super);
    function GoalNode(Description, MetaData) {
        _super.call(this, "Goal", Description, MetaData);
    }
    return GoalNode;
})(DCaseNode);
exports.GoalNode = GoalNode;
var StrategyNode = (function (_super) {
    __extends(StrategyNode, _super);
    function StrategyNode(Description, MetaData) {
        _super.call(this, "Strategy", Description, MetaData);
    }
    return StrategyNode;
})(DCaseNode);
exports.StrategyNode = StrategyNode;
var SolutionNode = (function (_super) {
    __extends(SolutionNode, _super);
    function SolutionNode(Description, MetaData) {
        _super.call(this, "Solution", Description, MetaData);
    }
    return SolutionNode;
})(DCaseNode);
exports.SolutionNode = SolutionNode;
var ContextNode = (function (_super) {
    __extends(ContextNode, _super);
    function ContextNode(Description, MetaData) {
        _super.call(this, "Context", Description, MetaData);
    }
    return ContextNode;
})(DCaseNode);
exports.ContextNode = ContextNode;
