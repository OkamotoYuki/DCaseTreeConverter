import DCaseTree = module("DCaseTree");

function outputError(o : any) : void {
		console.log("error: " + o);
}

export class Converter {

	nodeMap : any = {};

	constructor() {
	}

	initNodeMap(nodeList : any[]) : void {
		for(var i : number = 0; i < nodeList.length; i++) {
			this.nodeMap[nodeList[i]["Id"]] = nodeList[i];
		}
	}

	parseContext(nodeId : number, parentNode : DCaseTree.ContextAddableNode) : DCaseTree.DCaseNode {
		var nodeData : any = this.nodeMap[nodeId];
		var NodeType : string = nodeData["NodeType"];
		var Description : string = nodeData["Description"];
		var Children : number[] = nodeData["Children"];
		var MetaData : any[] = nodeData["MetaData"];

		if(NodeType != "Context") {
			outputError("'Contexts' field must have only context node");
		}
		if(Children.length > 0) {
			outputError("context node has no 'Children'");
		}

		var contextNode : DCaseTree.ContextNode = new DCaseTree.ContextNode(Description, MetaData, nodeId);

		parentNode.Contexts.push(contextNode);
		return parentNode;
	}

	parseChild(nodeId : number, parentNode : DCaseTree.DCaseNode) : DCaseTree.DCaseNode {
		var nodeData : any = this.nodeMap[nodeId];
		var NodeType : string = nodeData["NodeType"];
		var Description : string = nodeData["Description"];
		var Children : number[] = nodeData["Children"];
		var MetaData : any[] = nodeData["MetaData"];

		var childNode : DCaseTree.DCaseNode = new DCaseTree[NodeType + "Node"](Description, MetaData, nodeId);

		if("Contexts" in nodeData) {
			var Contexts : number[] = nodeData["Contexts"];

			for(var i : number = 0; i < Contexts.length; i++) {
				this.parseContext(Contexts[i], <DCaseTree.ContextAddableNode>childNode);
			}
		}

		for(var i : number = 0; i < Children.length; i++) {
			this.parseChild(Children[i], childNode);
		}

		if(parentNode == null) {
			return childNode;
		}
		else {
			parentNode.Children.push(childNode);
			return parentNode;
		}
	}

	parseJson(jsonData : any) : DCaseTree.TopGoalNode {
		var DCaseName : string = jsonData["DCaseName"];
		var NodeCount : number = jsonData["NodeCount"];
		var TopGoalId : number = jsonData["TopGoalId"];
		var NodeList : any[] = jsonData["NodeList"];

		this.initNodeMap(NodeList);

		var rootNode : DCaseTree.TopGoalNode = <DCaseTree.TopGoalNode>this.parseChild(TopGoalId, null);
		rootNode.DCaseName = DCaseName;
		rootNode.NodeCount = NodeCount;
		rootNode.TopGoalId = TopGoalId;

		return rootNode;
	}

}
