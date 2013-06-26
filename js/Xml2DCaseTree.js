var $ = require("jquery")
var DCaseTree = require("./DCaseTree")
function outputError(o) {
    console.log("error: " + o);
}
var DCaseLink = (function () {
    function DCaseLink(source, target) {
        this.source = source;
        this.target = target;
    }
    return DCaseLink;
})();
var Converter = (function () {
    function Converter() {
        this.nodes = {
        };
        this.links = {
        };
        this.nodeIdMap = {
        };
        this.NodeCount = 0;
    }
    Converter.prototype.addNodeIdToMap = function (IdText) {
        if(!(IdText in this.nodeIdMap)) {
            if(this.NodeCount == 0) {
                this.rootNodeIdText = IdText;
            }
            this.nodeIdMap[IdText] = this.NodeCount;
            this.NodeCount += 1;
        }
    };
    Converter.prototype.parseXml = function (xmlText) {
        var self = this;
        $(xmlText).find("rootBasicNode").each(function (index, elem) {
            var xsiType = $(this).attr("xsi\:type");
            if(xsiType.split(":").length != 2) {
                outputError("attr 'xsi:type' is incorrect format");
            }
            var NodeType = xsiType.split(":")[1];
            var IdText = $(this).attr("id");
            var Description = $(this).attr("desc");
            var NodeName = $(this).attr("name");
            self.addNodeIdToMap(IdText);
            var node = new DCaseTree[NodeType + "Node"](Description, null, self.nodeIdMap[IdText]);
            node.NodeName = NodeName;
            self.nodes[IdText] = node;
            return null;
        });
        $(xmlText).find("rootBasicLink").each(function (index, elem) {
            var IdText = $(this).attr("id");
            var source = $(this).attr("source").substring(1);
            var target = $(this).attr("target").substring(1);
            var link = new DCaseLink(source, target);
            self.links[IdText] = link;
            return null;
        });
        for(var IdText in this.links) {
            var link = this.links[IdText];
            var sourceNode = this.nodes[link.source];
            var targetNode = this.nodes[link.target];
            targetNode.Children.push(sourceNode);
        }
        return this.nodes[this.rootNodeIdText];
    };
    return Converter;
})();
exports.Converter = Converter;
