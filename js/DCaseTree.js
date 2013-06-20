var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var $ = require("jquery")
function outputText(text) {
    console.log(text);
}
var DCaseNode = (function () {
    function DCaseNode(NodeType, Description, MetaData, ThisNodeId) {
        this.NodeType = NodeType;
        this.Description = Description;
        this.MetaData = MetaData;
        this.ThisNodeId = ThisNodeId;
        this.Children = [];
    }
    DCaseNode.prototype.convertAllChildNodeIntoJson = function (jsonData) {
        var elem = {
        };
        elem["NodeType"] = this.NodeType;
        elem["Description"] = this.Description;
        elem["ThisNodeId"] = this.ThisNodeId;
        elem["MetaData"] = this.MetaData;
        var childrenIds = [];
        for(var i = 0; i < this.Children.length; i++) {
            childrenIds[i] = this.Children[i].ThisNodeId;
        }
        elem["Children"] = childrenIds;
        jsonData.push(elem);
        for(var j = 0; j < this.Children.length; j++) {
            this.Children[j].convertAllChildNodeIntoJson(jsonData);
        }
        return jsonData;
    };
    DCaseNode.prototype.convertAllChildNodeIntoXml = function () {
        var $dcaseObj = $("dcase:Argument");
        var linkNum = 1;
        var $nodeObj = $("rootBasicnode");
        var nodeId = this.ThisNodeId.toString();
        $nodeObj.attr("xsi:type", "dcase:" + this.NodeType);
        $nodeObj.attr("id", nodeId);
        $nodeObj.attr("name", "Undefined");
        $nodeObj.appendTo($dcaseObj);
        for(var i = 0; i < this.Children.length; i++) {
            var $linkObj = $("rootBasicLink");
            $linkObj.attr("xsi:type", "dcase:link");
            $linkObj.attr("id", nodeId + "-" + this.Children[i].ThisNodeId.toString());
            $linkObj.attr("source", nodeId);
            $linkObj.attr("target", this.Children[i].ThisNodeId.toString());
            $linkObj.attr("name", "Link_" + linkNum.toString());
            linkNum++;
            $linkObj.appendTo($dcaseObj);
            this.Children[i].convertAllChildNodeIntoXml();
        }
        var strXml = $dcaseObj.text();
        console.log(strXml);
    };
    DCaseNode.prototype.convertAllChildNodeIntoMarkdown = function (goalNum) {
        var outputStr = "";
        var goalFlag = false;
        if(this.NodeType == "Goal") {
            goalFlag = true;
            goalNum++;
        }
        for(var i = 0; i < goalNum; i++) {
            outputStr += "*";
        }
        outputStr += this.NodeType + " " + "NodeName(not defined)" + " " + this.ThisNodeId;
        outputText(outputStr);
        outputText(this.Description + "\n");
        outputText("---");
        for(var j = 0; j < this.MetaData.length; j++) {
            outputText(this.MetaData[j]);
        }
        outputText("---");
        for(var k = 0; k < this.Children.length; k++) {
            this.Children[k].convertAllChildNodeIntoMarkdown(goalNum);
        }
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
        this.Contexts = [];
    }
    ContextAddableNode.prototype.dumpAllChild = function (depth) {
        var data = "";
        for(var i = 0; i < depth; i++) {
            data += "\t";
        }
        data += this.NodeType + ":" + this.ThisNodeId;
        if(this.Contexts.length != 0) {
            data += "(" + this.Contexts[0].ThisNodeId;
            for(var i = 1; i < this.Contexts.length; i++) {
                data += ", ";
                data += this.Contexts[i].ThisNodeId;
            }
            data += ")";
        }
        console.log(data);
        for(var i = 0; i < this.Children.length; i++) {
            this.Children[i].dumpAllChild(depth + 1);
        }
    };
    return ContextAddableNode;
})(DCaseNode);
exports.ContextAddableNode = ContextAddableNode;
var GoalNode = (function (_super) {
    __extends(GoalNode, _super);
    function GoalNode(Description, MetaData, ThisNodeId) {
        _super.call(this, "Goal", Description, MetaData, ThisNodeId);
    }
    return GoalNode;
})(ContextAddableNode);
exports.GoalNode = GoalNode;
var StrategyNode = (function (_super) {
    __extends(StrategyNode, _super);
    function StrategyNode(Description, MetaData, ThisNodeId) {
        _super.call(this, "Strategy", Description, MetaData, ThisNodeId);
    }
    return StrategyNode;
})(ContextAddableNode);
exports.StrategyNode = StrategyNode;
