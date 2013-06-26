var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

function outputText(text) {
    console.log(text);
}
var DCaseNode = (function () {
    function DCaseNode(NodeType, Description, MetaData, Id) {
        this.NodeType = NodeType;
        this.NodeName = null;
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
        var childrenIds = [];
        for(var i = 0; i < this.Children.length; i++) {
            childrenIds[i] = this.Children[i].Id;
        }
        elem["Children"] = childrenIds;
        elem["MetaData"] = this.MetaData;
        jsonData.push(elem);
        for(var j = 0; j < this.Children.length; j++) {
            this.Children[j].convertAllChildNodeIntoJson(jsonData);
        }
        return jsonData;
    };
    DCaseNode.prototype.convertAllChildNodeIntoXml = function (linkArray) {
        outputText("\t<rootBasicNode xsi:type=\"dcase:" + this.NodeType + "\" id=\"" + this.Id + "\" name=\"" + this.NodeName + "\" desc=\"" + this.Description + "\"/>");
    };
    DCaseNode.prototype.convertAllChildNodeIntoMarkdown = function (goalNum) {
        var outputStr = "";
        var asterisk = "";
        if(this.NodeType == "Goal") {
            goalNum++;
        }
        for(var i = 0; i < goalNum; i++) {
            asterisk += "*";
        }
        outputStr += asterisk + this.NodeType + " " + this.NodeName + " " + this.Id;
        outputText(outputStr);
        outputText(this.Description);
        if(this.MetaData.length == 0) {
            outputText("---");
        } else if(this.MetaData.length > 1) {
            for(var j = 0; j < this.MetaData.length; j++) {
                outputText("---");
                for(var keyName in this.MetaData[j]) {
                    outputText(keyName + ": " + this.MetaData[j][keyName]);
                }
            }
        } else {
            outputText("---");
            for(var keyName in this.MetaData) {
                outputText(keyName + ": " + this.MetaData[keyName]);
            }
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
var EvidenceNode = (function (_super) {
    __extends(EvidenceNode, _super);
    function EvidenceNode(Description, MetaData, Id) {
        _super.call(this, "Evidence", Description, MetaData, Id);
    }
    return EvidenceNode;
})(DCaseNode);
exports.EvidenceNode = EvidenceNode;
var ContextNode = (function (_super) {
    __extends(ContextNode, _super);
    function ContextNode(Description, MetaData, Id) {
        _super.call(this, "Context", Description, MetaData, Id);
    }
    ContextNode.prototype.convertAllChildNodeIntoJson = function (jsonData) {
        var elem = [];
        elem["NodeType"] = this.NodeType;
        elem["Description"] = this.Description;
        elem["Id"] = this.Id;
        elem["MetaData"] = this.MetaData;
        jsonData.push(elem);
        return jsonData;
    };
    ContextNode.prototype.convertAllChildNodeIntoXml = function (linkArray) {
        var nodeStr = "\t<rootBasicNode xsi:type=\"dcase:" + this.NodeType + "\" id=\"" + this.Id + "\" name=\"" + this.NodeName + "\" desc=\"" + this.Description + "\"/>";
        outputText(nodeStr);
    };
    ContextNode.prototype.convertAllChildNodeIntoMarkdonw = function (goalNum) {
        var outputStr = "";
        var asterisk = "";
        for(var i = 0; i < goalNum; i++) {
            asterisk += "*";
        }
        outputStr += asterisk + this.NodeType + " " + this.NodeName + " " + this.Id;
        outputText(outputStr);
        outputText(this.Description);
        if(this.MetaData.length == 0) {
            outputText("---");
        } else if(this.MetaData.length > 1) {
            for(var j = 0; j < this.MetaData.length; j++) {
                outputText("---");
                for(var keyName in this.MetaData[j]) {
                    outputText(keyName + ": " + this.MetaData[j][keyName]);
                }
            }
        } else {
            outputText("---");
            for(var keyName in this.MetaData) {
                outputText(keyName + ": " + this.MetaData[keyName]);
            }
        }
        outputText("---");
    };
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
    ContextAddableNode.prototype.convertAllChildNodeIntoJson = function (jsonData) {
        var elem = {
        };
        elem["NodeType"] = this.NodeType;
        elem["Description"] = this.Description;
        elem["Id"] = this.Id;
        var childrenIds = [];
        for(var i = 0; i < this.Children.length; i++) {
            childrenIds[i] = this.Children[i].Id;
        }
        elem["Children"] = childrenIds;
        var contextId = [];
        for(var i = 0; i < this.Contexts.length; i++) {
            contextId.push(this.Contexts[i].Id);
        }
        elem["Contexts"] = contextId;
        elem["MetaData"] = this.MetaData;
        jsonData.push(elem);
        for(var h = 0; h < this.Contexts.length; h++) {
            this.Contexts[h].convertAllChildNodeIntoJson(jsonData);
        }
        for(var j = 0; j < this.Children.length; j++) {
            this.Children[j].convertAllChildNodeIntoJson(jsonData);
        }
        return jsonData;
    };
    ContextAddableNode.prototype.convertAllChildNodeIntoXml = function (linkArray) {
        outputText("\t<rootBasicNode xsi:type=\"dcase:" + this.NodeType + "\" id=\"" + this.Id + "\" name=\"" + this.NodeName + "\" desc=\"" + this.Description + "\"/>");
        for(var i = 0; i < this.Contexts.length; i++) {
            var linkContext = "\t<rootBasicLink xsi:type=\"dcase:link\" id=\"Undefined\"" + " source=\"" + this.Id + "\" target=\"#" + this.Contexts[i].Id + "\" name=\"Link_" + (linkArray.length + 1) + "\"/>";
            linkArray.push(linkContext);
            this.Contexts[i].convertAllChildNodeIntoXml(linkArray);
        }
        for(var j = 0; j < this.Children.length; j++) {
            var linkChild = "\t<rootBasicLink xsi:type=\"dcase:link\" id=\"Undefined\"" + " source=\"" + this.Id + "\" target=\"#" + this.Children[j].Id + "\" name=\"Link_" + (linkArray.length + 1) + "\"/>";
            linkArray.push(linkChild);
            this.Children[j].convertAllChildNodeIntoXml(linkArray);
        }
    };
    ContextAddableNode.prototype.convertAllChildNodeIntoMarkdown = function (goalNum) {
        var outputStr = "";
        var asterisk = "";
        if(this.NodeType == "Goal") {
            goalNum++;
        }
        for(var i = 0; i < goalNum; i++) {
            asterisk += "*";
        }
        outputStr += asterisk + this.NodeType + " " + this.NodeName + " " + this.Id;
        outputText(outputStr);
        outputText(this.Description);
        if(this.MetaData.length == 0) {
            outputText("---");
        } else if(this.MetaData.length > 1) {
            for(var j = 0; j < this.MetaData.length; j++) {
                outputText("---");
                for(var keyName in this.MetaData[j]) {
                    outputText(keyName + ": " + this.MetaData[j][keyName]);
                }
            }
        } else {
            outputText("---");
            for(var keyName in this.MetaData) {
                outputText(keyName + ": " + this.MetaData[keyName]);
            }
        }
        outputText("---");
        for(var h = 0; h < this.Contexts.length; h++) {
            this.Contexts[h].convertAllChildNodeIntoMarkdown(goalNum);
        }
        for(var k = 0; k < this.Children.length; k++) {
            this.Children[k].convertAllChildNodeIntoMarkdown(goalNum);
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
    TopGoalNode.prototype.convertAllChildNodeIntoJson = function (jsonData) {
        var jsonOutput = [];
        jsonOutput["DCaseName"] = this.DCaseName;
        jsonOutput["NodeCount"] = this.NodeCount;
        jsonOutput["TopGoalId"] = this.TopGoalId;
        jsonOutput["NodeList"] = jsonData;
        var elem = {
        };
        elem["NodeType"] = this.NodeType;
        elem["Description"] = this.Description;
        elem["Id"] = this.Id;
        var childrenIds = [];
        for(var i = 0; i < this.Children.length; i++) {
            childrenIds[i] = this.Children[i].Id;
        }
        elem["Children"] = childrenIds;
        if(this.Contexts.length != 0) {
            var contextId = [];
            for(var m = 0; m < this.Contexts.length; m++) {
                contextId.push(this.Contexts[m].Id);
            }
            elem["Contexts"] = contextId;
        }
        elem["MetaData"] = this.MetaData;
        jsonData.push(elem);
        for(var k = 0; k < this.Contexts.length; k++) {
            this.Contexts[k].convertAllChildNodeIntoJson(jsonData);
        }
        for(var j = 0; j < this.Children.length; j++) {
            this.Children[j].convertAllChildNodeIntoJson(jsonData);
        }
        return jsonOutput;
    };
    TopGoalNode.prototype.convertAllChildNodeIntoXml = function (linkArray) {
        var xmlStr;
        xmlStr = "<dcase:Argument xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"" + " xmlns:dcase=\"http://www.dependalopble-os.net/2010/03/dcase/\"" + " id=\"_6A0EENScEeKCdP-goLYu9g\">";
        outputText(xmlStr);
        outputText("\t<rootBasicNode xsi:type=\"dcase:" + this.NodeType + "\" id=\"" + this.Id + "\" name=\"" + this.NodeName + "\" desc=\"" + this.Description + "\"/>");
        for(var i = 0; i < this.Contexts.length; i++) {
            var linkContext = "\t<rootBasicLink xsi:type=\"dcase:link\" id=\"Undefined\"" + " source=\"" + this.Id + "\" target=\"#" + this.Contexts[i].Id + "\" name=\"Link_" + (linkArray.length + 1) + "\"/>";
            linkArray.push(linkContext);
            this.Contexts[i].convertAllChildNodeIntoXml(linkArray);
        }
        for(var j = 0; j < this.Children.length; j++) {
            var linkChild = "\t<rootBasicLink xsi:type=\"dcase:link\" id=\"Undefined\"" + " source=\"" + this.Id + "\" target=\"#" + this.Children[i].Id + "\" name=\"Link_" + (linkArray.length + 1) + "\"/>";
            linkArray.push(linkChild);
            this.Children[j].convertAllChildNodeIntoXml(linkArray);
        }
        for(var k = 0; k < linkArray.length; k++) {
            outputText(linkArray[k]);
        }
        outputText("</dcase:Argument>");
    };
    TopGoalNode.prototype.convertAllChildNodeIntoMarkdown = function (goalNum) {
        var outputStr = "";
        var asterisk = "";
        if(this.NodeType == "Goal") {
            goalNum++;
        }
        for(var i = 0; i < goalNum; i++) {
            asterisk += "*";
        }
        outputText("DCaseName: " + this.DCaseName + "\n");
        outputStr += asterisk + this.NodeType + " " + this.NodeName + " " + this.TopGoalId;
        outputText(outputStr);
        outputText(this.Description);
        if(this.MetaData.length == 0) {
            outputText("---");
        } else if(this.MetaData.length > 1) {
            for(var j = 0; j < this.MetaData.length; j++) {
                outputText("---");
                for(var keyName in this.MetaData[j]) {
                    outputText(keyName + ": " + this.MetaData[j][keyName]);
                }
            }
        } else {
            outputText("---");
            for(var keyName in this.MetaData) {
                outputText(keyName + ": " + this.MetaData[keyName]);
            }
        }
        outputText("---");
        for(var h = 0; h < this.Contexts.length; h++) {
            this.Contexts[h].convertAllChildNodeIntoMarkdown(goalNum);
        }
        for(var k = 0; k < this.Children.length; k++) {
            this.Children[k].convertAllChildNodeIntoMarkdown(goalNum);
        }
    };
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
