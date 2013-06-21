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
            this.nodeMap[nodeList[i]["Id"]] = nodeList[i];
        }
    };
    Converter.prototype.parseContext = function (nodeId, parentNode) {
        var nodeData = this.nodeMap[nodeId];
        var NodeType = nodeData["NodeType"];
        var Description = nodeData["Description"];
        var Children = nodeData["Children"];
        var MetaData = nodeData["MetaData"];
        if(NodeType != "Context") {
            outputError("'Contexts' field must have only context node");
        }
        if(Children.length > 0) {
            outputError("context node has no 'Children'");
        }
        var contextNode = new DCaseTree.ContextNode(Description, MetaData, nodeId);
        parentNode.Contexts.push(contextNode);
        return parentNode;
    };
    Converter.prototype.parseChild = function (nodeId, parentNode) {
        var nodeData = this.nodeMap[nodeId];
        var NodeType = nodeData["NodeType"];
        var Description = nodeData["Description"];
        var Children = nodeData["Children"];
        var MetaData = nodeData["MetaData"];
        var childNode = new DCaseTree[NodeType + "Node"](Description, MetaData, nodeId);
        if("Contexts" in nodeData) {
            var Contexts = nodeData["Contexts"];
            for(var i = 0; i < Contexts.length; i++) {
                this.parseContext(Contexts[i], childNode);
            }
        }
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
