var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DCaseNode = (function () {
    function DCaseNode(NodeType, Description, MetaData, ThisNodeId) {
        this.NodeType = NodeType;
        this.Description = Description;
        this.MetaData = MetaData;
        this.ThisNodeId = ThisNodeId;
        this.Children = [];
    }
    DCaseNode.prototype.convertAllChildNodeIntoJson = function (jsonArray) {
        return [];
    };
    DCaseNode.prototype.convertAllChildNodeIntoXml = function () {
    };
    DCaseNode.prototype.convertAllChildNodeIntoMarkdown = function () {
    };
    DCaseNode.prototype.dump = function () {
        this.dumpAllChild(0);
    };
    DCaseNode.prototype.dumpAllChild = function (depth) {
        var data = "";
        for(var i = 0; i < depth; i++) {
            data += "\t";
        }
        data += this.NodeType + ":" + this.ThisNodeId;
        console.log(data);
        for(var i = 0; i < this.Children.length; i++) {
            this.Children[i].dumpAllChild(depth + 1);
        }
    };
    return DCaseNode;
})();
exports.DCaseNode = DCaseNode;
var SolutionNode = (function (_super) {
    __extends(SolutionNode, _super);
    function SolutionNode(Description, MetaData, ThisNodeId) {
        _super.call(this, "Solution", Description, MetaData, ThisNodeId);
    }
    return SolutionNode;
})(DCaseNode);
exports.SolutionNode = SolutionNode;
var ContextNode = (function (_super) {
    __extends(ContextNode, _super);
    function ContextNode(Description, MetaData, ThisNodeId) {
        _super.call(this, "Context", Description, MetaData, ThisNodeId);
    }
    return ContextNode;
})(DCaseNode);
exports.ContextNode = ContextNode;
var RebbutalNode = (function (_super) {
    __extends(RebbutalNode, _super);
    function RebbutalNode(Description, MetaData, ThisNodeId) {
        _super.call(this, "Context", Description, MetaData, ThisNodeId);
    }
    return RebbutalNode;
})(DCaseNode);
exports.RebbutalNode = RebbutalNode;
var ContextAddableNode = (function (_super) {
    __extends(ContextAddableNode, _super);
    function ContextAddableNode(NodeType, Description, MetaData, ThisNodeId) {
        _super.call(this, NodeType, Description, MetaData, ThisNodeId);
    }
    return ContextAddableNode;
})(DCaseNode);
exports.ContextAddableNode = ContextAddableNode;
var GoalNode = (function (_super) {
    __extends(GoalNode, _super);
    function GoalNode(Description, MetaData, ThisNodeId) {
        _super.call(this, "Goal", Description, MetaData, ThisNodeId);
    }
    GoalNode.prototype.convertAllChildNodeIntoJson = function (jsonArray) {
        jsonArray.push({
            "key": "goal"
        });
        for(var i = 0; i < this.Children.length; i++) {
            this.Children[i].convertAllChildNodeIntoJson(jsonArray);
        }
        return jsonArray;
    };
    return GoalNode;
})(ContextAddableNode);
exports.GoalNode = GoalNode;
var StrategyNode = (function (_super) {
    __extends(StrategyNode, _super);
    function StrategyNode(Description, MetaData, ThisNodeId) {
        _super.call(this, "Strategy", Description, MetaData, ThisNodeId);
    }
    StrategyNode.prototype.convertAllChildNodeIntoJson = function (jsonArray) {
        jsonArray.push({
            "key": "strategy"
        });
        return jsonArray;
    };
    return StrategyNode;
})(DCaseNode);
exports.StrategyNode = StrategyNode;
