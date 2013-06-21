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
    function DCaseNode(NodeType, Description, MetaData, Id) {
        this.NodeType = NodeType;
        this.Description = Description;
        this.MetaData = MetaData;
        this.Id = Id;
        this.Children = [];
    }
    DCaseNode.prototype.convertAllChildNodeIntoJson = function (jsonData) {
        var elem = {
        };
        elem["NodeType"] = this.NodeType;
        elem["Description"] = this.Description;
        elem["Id"] = this.Id;
        elem["MetaData"] = this.MetaData;
        var childrenIds = [];
        for(var i = 0; i < this.Children.length; i++) {
            childrenIds[i] = this.Children[i].Id;
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
        var nodeId = this.Id.toString();
        $nodeObj.attr("xsi:type", "dcase:" + this.NodeType);
        $nodeObj.attr("id", nodeId);
        $nodeObj.attr("name", "Undefined");
        $nodeObj.appendTo($dcaseObj);
        for(var i = 0; i < this.Children.length; i++) {
            var $linkObj = $("rootBasicLink");
            $linkObj.attr("xsi:type", "dcase:link");
            $linkObj.attr("id", nodeId + "-" + this.Children[i].Id.toString());
            $linkObj.attr("source", nodeId);
            $linkObj.attr("target", this.Children[i].Id.toString());
            $linkObj.attr("name", "Link_" + linkNum.toString());
            linkNum++;
            $linkObj.appendTo($dcaseObj);
            this.Children[i].convertAllChildNodeIntoXml();
        }
        var strXml = $dcaseObj.text();
        console.log(strXml);
    };
    DCaseNode.prototype.convertAllChildNodeIntoMarkdown = function (goalNum, contextsNum) {
        var outputStr = "";
        var asterisk = "";
        if(this.NodeType == "Goal") {
            goalNum++;
        }
        for(var i = 0; i < goalNum; i++) {
            asterisk += "*";
        }
        outputStr += asterisk + this.NodeType + " " + "NodeName(not defined)" + " " + this.Id;
        outputText(outputStr);
        outputText(this.Description + "\n");
        outputText("---");
        for(var j = 0; j < this.MetaData.length; j++) {
            outputText(this.MetaData[j]);
        }
        outputText("---");
        for(var k = 0; k < this.Children.length; k++) {
            this.Children[k].convertAllChildNodeIntoMarkdown(goalNum, contextsNum);
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
        data += this.NodeType + ":" + this.Id;
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
    function SolutionNode(Description, MetaData, Id) {
        _super.call(this, "Solution", Description, MetaData, Id);
    }
    return SolutionNode;
})(DCaseNode);
exports.SolutionNode = SolutionNode;
var ContextNode = (function (_super) {
    __extends(ContextNode, _super);
    function ContextNode(Description, MetaData, Id) {
        _super.call(this, "Context", Description, MetaData, Id);
    }
    return ContextNode;
})(DCaseNode);
exports.ContextNode = ContextNode;
var RebbutalNode = (function (_super) {
    __extends(RebbutalNode, _super);
    function RebbutalNode(Description, MetaData, Id) {
        _super.call(this, "Rebbutal", Description, MetaData, Id);
    }
    return RebbutalNode;
})(DCaseNode);
exports.RebbutalNode = RebbutalNode;
var ContextAddableNode = (function (_super) {
    __extends(ContextAddableNode, _super);
    function ContextAddableNode(NodeType, Description, MetaData, Id) {
        _super.call(this, NodeType, Description, MetaData, Id);
        this.Contexts = [];
    }
    ContextAddableNode.prototype.convertAllChildNodeIntoMarkdown = function (goalNum, contextsNum) {
        var outputStr = "";
        var asterisk = "";
        if(this.NodeType == "Goal") {
            goalNum++;
        }
        for(var i = 0; i < goalNum; i++) {
            asterisk += "*";
        }
        outputStr += asterisk + this.NodeType + " " + "NodeName(not defined)" + " " + this.Id;
        outputText(outputStr);
        outputText(this.Description + "\n");
        outputText("---");
        for(var j = 0; j < this.MetaData.length; j++) {
            outputText(this.MetaData[j]);
        }
        outputText("---");
        if(this.Contexts.length != 0) {
            asterisk = "";
            var contextCount = contextsNum + 1;
            for(var l = 0; l < contextCount; l++) {
                asterisk += "*";
            }
            for(var m = 0; m < this.Contexts.length; m++) {
                outputStr = "";
                outputStr += asterisk + this.Contexts[m].NodeType + " " + "NodeName(Undefined)" + this.Contexts[m].Id;
                outputText(outputStr);
                outputText(this.Contexts[m].Description + "\n");
                outputText("---");
                for(var n = 0; n < this.Contexts[m].MetaData.length; n++) {
                    outputText(this.Contexts[m].MetaData[n]);
                }
                contextCount++;
                asterisk += "*";
            }
            contextsNum = contextCount - 1;
        }
        for(var k = 0; k < this.Children.length; k++) {
            this.Children[k].convertAllChildNodeIntoMarkdown(goalNum, contextsNum);
        }
    };
    ContextAddableNode.prototype.dumpAllChild = function (depth) {
        var data = "";
        for(var i = 0; i < depth; i++) {
            data += "\t";
        }
        data += this.NodeType + ":" + this.Id;
        if(this.Contexts.length != 0) {
            data += " (Contexts:" + this.Contexts[0].Id;
            for(var i = 1; i < this.Contexts.length; i++) {
                data += ", ";
                data += this.Contexts[i].Id;
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
    function GoalNode(Description, MetaData, Id) {
        _super.call(this, "Goal", Description, MetaData, Id);
    }
    return GoalNode;
})(ContextAddableNode);
exports.GoalNode = GoalNode;
var TopGoalNode = (function (_super) {
    __extends(TopGoalNode, _super);
    function TopGoalNode(DCaseName, NodeCount, Description, MetaData, Id) {
        _super.call(this, Description, MetaData, Id);
        this.DCaseName = DCaseName;
        this.NodeCount = NodeCount;
        this.TopGoalId = Id;
    }
    return TopGoalNode;
})(GoalNode);
exports.TopGoalNode = TopGoalNode;
var StrategyNode = (function (_super) {
    __extends(StrategyNode, _super);
    function StrategyNode(Description, MetaData, Id) {
        _super.call(this, "Strategy", Description, MetaData, Id);
    }
    return StrategyNode;
})(ContextAddableNode);
exports.StrategyNode = StrategyNode;
