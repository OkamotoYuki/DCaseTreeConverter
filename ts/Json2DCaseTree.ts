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

	parseChild(nodeId : number, parentNode : DCaseTree.DCaseNode) : DCaseTree.DCaseNode {
		var nodeData : any = this.nodeMap[nodeId];
		var NodeType : string = nodeData["NodeType"];
		var Description : string = nodeData["Description"];
		var MetaData : any[] = nodeData["MetaData"];
		var Children : number[] = nodeData["Children"];

		var childNode : DCaseTree.DCaseNode = new DCaseTree.DCaseNode(NodeType, Description, MetaData, nodeId);

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

	parseJson(jsonData : any) : DCaseTree.DCaseNode {
		var DCaseName : string = jsonData["DCaseName"];
		var NodeCount : number = jsonData["NodeCount"];
		var TopGoalId : number = jsonData["TopGoalId"];
		var NodeList : any[] = jsonData["NodeList"];

		this.initNodeMap(NodeList);

		var rootNode : DCaseTree.DCaseNode = this.parseChild(TopGoalId, null);

		return rootNode;
	}

}
