var DCaseTree = require("./DCaseTree")
function outputError(o) {
    console.log("error: " + o);
}
var Converter = (function () {
    function Converter() {
        this.nodeMap = {
        };
    }
    Converter.prototype.initNodeMap = function (nodeList) {
        for(var i = 0; i < nodeList.length; i++) {
            this.nodeMap[nodeList[i]["ThisNodeId"]] = nodeList[i];
        }
    };
    Converter.prototype.parseChild = function (nodeId, parentNode) {
        var nodeData = this.nodeMap[nodeId];
        var NodeType = nodeData["NodeType"];
        var Description = nodeData["Description"];
        var MetaData = nodeData["MetaData"];
        var Children = nodeData["Children"];
        var childNode = new DCaseTree.DCaseNode(NodeType, Description, MetaData, nodeId);
        for(var i = 0; i < Children.length; i++) {
            this.parseChild(Children[i], childNode);
        }
        if(parentNode == null) {
            return childNode;
        } else {
            parentNode.Children.push(childNode);
            return parentNode;
        }
    };
    Converter.prototype.parseJson = function (jsonData) {
        var DCaseName = jsonData["DCaseName"];
        var NodeCount = jsonData["NodeCount"];
        var TopGoalId = jsonData["TopGoalId"];
        var NodeList = jsonData["NodeList"];
        this.initNodeMap(NodeList);
        var rootNode = this.parseChild(TopGoalId, null);
        return rootNode;
    };
    return Converter;
})();
exports.Converter = Converter;
