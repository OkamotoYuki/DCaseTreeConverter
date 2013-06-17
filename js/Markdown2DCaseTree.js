var DCaseTree = require("./DCaseTree")
function outputError(o) {
    console.log("error: " + o);
}
function splitByLines(text) {
    return text.split(/\r\n|\r|\n/g);
}
function isNumber(text) {
    return /\d+/.test(text);
}
var Converter = (function () {
    function Converter() {
        this.usedNodeIdList = [];
        this.currentNodeId = 0;
    }
    Converter.prototype.isUsedNodeId = function (nodeId) {
        for(var i = 0; i < this.usedNodeIdList.length; i++) {
            if(nodeId == this.usedNodeIdList[i]) {
                return true;
            }
        }
        return false;
    };
    Converter.prototype.initUsedNodeIdList = function (text) {
        var lines = splitByLines(text);
        for(var i = 0; i < lines.length; i++) {
            var nodeIdMacher = /#+.+\s.+\s/g;
            nodeIdMacher.exec(lines[i]);
            if(nodeIdMacher.lastIndex > 0) {
                var nodeIdText = lines[i].substring(nodeIdMacher.lastIndex);
                if(!isNumber(nodeIdText)) {
                    outputError("node id must be number");
                }
                var nodeId = parseInt(nodeIdText);
                if(!this.isUsedNodeId(nodeId)) {
                    this.usedNodeIdList.push(nodeId);
                }
            }
        }
    };
    Converter.prototype.createNewNodeId = function () {
        while(true) {
            this.currentNodeId += 1;
            if(!this.isUsedNodeId(this.currentNodeId)) {
                return this.currentNodeId;
            }
        }
    };
    Converter.prototype.parseMetaData = function (text, node) {
        var lines = splitByLines(text);
        if(lines.length < 2) {
            outputError("node doesn't include enough data");
        }
        if(lines[0] != "") {
            var nodeIdMacher = /\s.*\s/g;
            nodeIdMacher.exec(lines[0]);
            if(nodeIdMacher.lastIndex <= 0) {
                outputError("syntax is incorrect (nodeid)");
            }
            var nodeIdText = lines[0].substring(nodeIdMacher.lastIndex);
            if(!isNumber(nodeIdText)) {
                outputError("node id must be number");
            }
            var nodeId = parseInt(nodeIdText);
            node.ThisNodeId = nodeId;
        }
        node.Description = lines[1];
        if(lines.length == 2) {
            return;
        }
    };
    Converter.prototype.parseStrategy = function (text, depth, parentNode) {
        if(parentNode == null) {
            outputError("strategy node must be child node");
        }
        var strategyMacher = /#Strategy/g;
        strategyMacher.exec(text);
        text = text.substring(strategyMacher.lastIndex);
        var strategyNode = new DCaseTree.StrategyNode(null, null, null);
        var metaDataText = text.substring(0, text.indexOf("#"));
        var childBlock = text.substring(text.indexOf("#"));
        this.parseMetaData(metaDataText, strategyNode);
        if(strategyNode.ThisNodeId == null) {
            strategyNode.ThisNodeId = this.createNewNodeId();
        }
        parentNode.Children.push(strategyNode);
        this.parseGoal(childBlock, depth, strategyNode);
    };
    Converter.prototype.parseSolution = function (text, depth, parentNode) {
        if(parentNode == null) {
            outputError("strategy node must be child node");
        }
        var solutionMacher = /#Solution/g;
        solutionMacher.exec(text);
        var metaDataText = text.substring(solutionMacher.lastIndex);
        var solutionNode = new DCaseTree.SolutionNode(null, null, null);
        this.parseMetaData(metaDataText, solutionNode);
        if(solutionNode.ThisNodeId == null) {
            solutionNode.ThisNodeId = this.createNewNodeId();
        }
        parentNode.Children.push(solutionNode);
    };
    Converter.prototype.parseGoal = function (text, depth, parentNode) {
        depth++;
        var goalNodes = [];
        var separator = new RegExp("\n#{" + depth + "}Goal", "g");
        var goalBlocks = text.split(separator);
        var goalMacher = /#+Goal/g;
        goalMacher.exec(goalBlocks[0]);
        goalBlocks[0] = goalBlocks[0].substring(goalMacher.lastIndex);
        for(var i = 0; i < goalBlocks.length; i++) {
            var goalNode = new DCaseTree.GoalNode(null, null, null);
            var indexOfSharpChar = goalBlocks[i].indexOf("#");
            var metaDataText;
            var childBlock;
            if(indexOfSharpChar == -1) {
                metaDataText = goalBlocks[i];
                childBlock = null;
            } else {
                metaDataText = goalBlocks[i].substring(0, indexOfSharpChar);
                childBlock = goalBlocks[i].substring(indexOfSharpChar);
            }
            this.parseMetaData(metaDataText, goalNode);
            if(goalNode.ThisNodeId == null) {
                goalNode.ThisNodeId = this.createNewNodeId();
            }
            goalNodes.push(goalNode);
            if(childBlock == null) {
                continue;
            } else if(splitByLines(childBlock)[0].match("Strategy") != null) {
                this.parseStrategy(childBlock, depth, goalNode);
            } else if(splitByLines(childBlock)[0].match("Solution") != null) {
                this.parseSolution(childBlock, depth, goalNode);
            }
        }
        if(parentNode != null) {
            parentNode.Children = goalNodes;
        }
        return goalNodes;
    };
    Converter.prototype.parseMarkdown = function (markdownText) {
        this.initUsedNodeIdList(markdownText);
        var rootNode = this.parseGoal(markdownText, 0, null);
        if(rootNode.length != 1) {
            outputError("root node must be one node");
            return null;
        }
        return rootNode[0];
    };
    return Converter;
})();
exports.Converter = Converter;
