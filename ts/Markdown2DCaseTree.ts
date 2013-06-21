import DCaseTree = module("DCaseTree");

function outputError(o : any) : void {
		console.log("error: " + o);
}

function splitByLines(text : string) : string[] {
	return text.split(/\r\n|\r|\n/g);
}

function isNumber(text : string) : bool {
	return /\d+/.test(text);
}

function isBoolean(text : string) : bool {
	return /true|false/.test(text);
}

export class Converter {

	DCaseName :string;
	usedNodeIdList : number[] = [];
	currentNodeId : number = 0;
	NodeCount : number = 0;

	constructor() {
	}

	isUsedNodeId(nodeId : number) : bool {
		for(var i : number = 0; i < this.usedNodeIdList.length; i++) {
			if(nodeId == this.usedNodeIdList[i]) {
				return true;
			}
		}
		return false;
	}

	initUsedNodeIdList(text : string) : void {
		var lines : string[] = splitByLines(text);

		for(var i : number = 0; i < lines.length; i++) {
			var nodeIdMatcher : RegExp = /\*+.+\s.+\s/g;
			nodeIdMatcher.exec(lines[i]);
			if(nodeIdMatcher.lastIndex > 0) {
				var nodeIdText : string = lines[i].substring(nodeIdMatcher.lastIndex);
				if(!isNumber(nodeIdText)) {
					outputError("node id must be number");
				}
				var nodeId : number = parseInt(nodeIdText);
				if(!this.isUsedNodeId(nodeId)) {
					this.usedNodeIdList.push(nodeId);
				}
			}
		}
	}

	createNewNodeId() : number {
		this.NodeCount += 1;

		while(true) {
			this.currentNodeId += 1;
			if(!this.isUsedNodeId(this.currentNodeId)) {
				return this.currentNodeId;
			}
		}
	}

	parseNodeData(text : string, node : DCaseTree.DCaseNode) : void {
		var lines : string[] = splitByLines(text);

		if(lines.length < 2) {
			outputError("node doesn't include enough data");
		}

		if(lines[0] != "") {
			var nodeIdMatcher : RegExp = /\s.*\s/g;
			nodeIdMatcher.exec(lines[0]);
			if(nodeIdMatcher.lastIndex <= 0) {
				outputError("syntax is incorrect (nodeid)");
			}

			var nodeIdText = lines[0].substring(nodeIdMatcher.lastIndex);
			if(!isNumber(nodeIdText)) {
				outputError("node id must be number");
			}
			var nodeId : number = parseInt(nodeIdText);
			node.Id = nodeId;
		}
		node.Description = lines[1];

		if(lines.length == 2) {
			return;
		}

		var MetaData : any[] = [];
		var metaDataElem : any = null;

		for(var i = 2; i < lines.length; i++) {
			if(lines[i] == "") {
				continue;
			}
			else if(lines[i] == "---") {
				if(metaDataElem != null && "Type" in metaDataElem && "Visible" in metaDataElem) {
					MetaData.push(metaDataElem);
				}
				metaDataElem = {};
				continue;
			}

			var keyValPair : string[] = lines[i].split(":");

			if(keyValPair.length != 2) {
				outputError("you must put meta data in key-value format");
			}

			var key : string = keyValPair[0];
			var valText : string = keyValPair[1];
			var val : any;
			if(isNumber(valText)) {
				val = parseInt(valText);
			}
			else if(isBoolean(valText)) {
				val = Boolean(valText);
			}
			else {
				val = valText;
			}
			metaDataElem[key] = val;
		}
		node.MetaData = MetaData;
	}

	parseContext(text : string, depth : number, parentNode : DCaseTree.ContextAddableNode) : void {
		if(parentNode == null) {
			outputError("context node must be child node");
		}

		var separator : RegExp = new RegExp("\n\\*{" + depth + "}Context", "g");
		var contextBlocks = text.split(separator);
		var contextMatcher : RegExp = new RegExp("\\*{" + depth + "}Context", "g");
		contextMatcher.exec(contextBlocks[0]);
		contextBlocks[0] = contextBlocks[0].substring(contextMatcher.lastIndex);
		var childBlockText : string = null;

		for(var i : number = 0; i < contextBlocks.length; i++) {
			var contextNode : DCaseTree.ContextNode = new DCaseTree.ContextNode(null, null, null);
			var nodeDataText : string = contextBlocks[i];

			if(i == contextBlocks.length - 1) {
				var indexOfAsteriskChar : number = contextBlocks[i].indexOf("*");

				if(indexOfAsteriskChar != -1) {
					nodeDataText = contextBlocks[i].substring(0, indexOfAsteriskChar);
					childBlockText = contextBlocks[i].substring(indexOfAsteriskChar);
				}
			}

			this.parseNodeData(nodeDataText, contextNode);

			if(contextNode.Id == null) {
				contextNode.Id = this.createNewNodeId();
			}

			parentNode.Contexts.push(contextNode);
		}

		if(childBlockText == null) {
			return;
		}
		else if(splitByLines(childBlockText)[0].match("Goal") != null) {
			this.parseGoal(childBlockText, depth, parentNode);
		}
		else if(splitByLines(childBlockText)[0].match("Strategy") != null) {
			this.parseStrategy(childBlockText, depth, parentNode);
		}
		else if(splitByLines(childBlockText)[0].match("Solution") != null) {
			this.parseSolution(childBlockText, depth, parentNode);
		}
	}

	parseStrategy(text : string, depth : number, parentNode : DCaseTree.DCaseNode) : void {
		if(parentNode == null) {
			outputError("strategy node must be child node");
		}

		var separator : RegExp = new RegExp("\n\\*{" + depth + "}Strategy", "g");
		var strategyBlocks = text.split(separator);
		var strategyMatcher : RegExp = new RegExp("\\*{" + depth + "}Strategy", "g");
		strategyMatcher.exec(strategyBlocks[0]);
		strategyBlocks[0] = strategyBlocks[0].substring(strategyMatcher.lastIndex);

		for(var i : number = 0; i < strategyBlocks.length; i++) {
			var strategyNode : DCaseTree.StrategyNode = new DCaseTree.StrategyNode(null, null, null);
			var indexOfAsteriskChar : number = strategyBlocks[i].indexOf("*");
			var nodeDataText : string;
			var childBlockText : string;

			if(indexOfAsteriskChar == -1) {
				nodeDataText = strategyBlocks[i];
				childBlockText = null;
			}
			else {
				nodeDataText = strategyBlocks[i].substring(0, indexOfAsteriskChar);
				childBlockText = strategyBlocks[i].substring(indexOfAsteriskChar);
			}

			this.parseNodeData(nodeDataText, strategyNode);

			if(strategyNode.Id == null) {
				strategyNode.Id = this.createNewNodeId();
			}

			parentNode.Children.push(strategyNode);

			if(childBlockText != null) {
				if(splitByLines(childBlockText)[0].match("Goal") != null) {
					this.parseGoal(childBlockText, depth, strategyNode);
				}
				else if(splitByLines(childBlockText)[0].match("Context") != null) {
					this.parseContext(childBlockText, depth, strategyNode);
				}
			}
		}
	}

	parseSolution(text : string, depth : number, parentNode : DCaseTree.DCaseNode) : void {
		if(parentNode == null) {
			outputError("solution node must be child node");
		}

		var separator : RegExp = new RegExp("\n\\*{" + depth + "}Solution", "g");
		var solutionBlocks = text.split(separator);
		var solutionMatcher : RegExp = new RegExp("\\*{" + depth + "}Solution", "g");
		solutionMatcher.exec(solutionBlocks[0]);
		solutionBlocks[0] = solutionBlocks[0].substring(solutionMatcher.lastIndex);

		for(var i : number = 0; i < solutionBlocks.length; i++) {
			var solutionNode : DCaseTree.SolutionNode = new DCaseTree.SolutionNode(null, null, null);
			var nodeDataText : string = solutionBlocks[i];

			this.parseNodeData(nodeDataText, solutionNode);

			if(solutionNode.Id == null) {
				solutionNode.Id = this.createNewNodeId();
			}

			parentNode.Children.push(solutionNode);
		}
	}

	parseGoal(text : string, depth : number, parentNode : DCaseTree.DCaseNode) : DCaseTree.DCaseNode {
		depth++;

		var goalNodes : DCaseTree.DCaseNode[] = [];

		var separator : RegExp = new RegExp("\n\\*{" + depth + "}Goal", "g");
		var goalBlocks = text.split(separator);
		var goalMatcher : RegExp = new RegExp("\\*{" + depth + "}Goal", "g");
		goalMatcher.exec(goalBlocks[0]);
		goalBlocks[0] = goalBlocks[0].substring(goalMatcher.lastIndex);

		for(var i : number = 0; i < goalBlocks.length; i++) {
			var goalNode : DCaseTree.GoalNode = new DCaseTree.GoalNode(null, null, null);
			var indexOfAsteriskChar : number = goalBlocks[i].indexOf("*");
			var nodeDataText : string;
			var childBlockText : string;

			if(indexOfAsteriskChar == -1) {
				nodeDataText = goalBlocks[i];
				childBlockText = null;
			}
			else {
				nodeDataText = goalBlocks[i].substring(0, indexOfAsteriskChar);
				childBlockText = goalBlocks[i].substring(indexOfAsteriskChar);
			}

			this.parseNodeData(nodeDataText, goalNode);

			if(goalNode.Id == null) {
				goalNode.Id = this.createNewNodeId();
			}
			goalNodes.push(goalNode);

			if(childBlockText == null) {
				continue;
			}
			else if(splitByLines(childBlockText)[0].match("Strategy") != null) {
				this.parseStrategy(childBlockText, depth, goalNode);
			}
			else if(splitByLines(childBlockText)[0].match("Solution") != null) {
				this.parseSolution(childBlockText, depth, goalNode);
			}
			else if(splitByLines(childBlockText)[0].match("Context") != null) {
				this.parseContext(childBlockText, depth, goalNode);
			}
		}

		if(parentNode == null) {
			if(goalNodes.length != 1) {
				outputError("root node must be one node");
			}
			return goalNodes[0];
		}
		else {
			parentNode.Children = goalNodes;
			return parentNode;
		}
	}

	parseHeader(text : string) : string {
		var indexOfAsteriskChar : number = text.indexOf("*");
		var headerText : string;
		var nodeInfoText : string;

		if(indexOfAsteriskChar == -1) {
			outputError("node info must start with '*'");
		}

		headerText = text.substring(0, indexOfAsteriskChar);
		nodeInfoText = text.substring(indexOfAsteriskChar);

		var headerLines : string[] = splitByLines(headerText);
		var DCaseNameMatcher : RegExp = /DCaseName\s*:\s*/g;

		for(var i = 0; i < headerLines.length; i++) {
			if(headerLines[i].match(DCaseNameMatcher)) {
				DCaseNameMatcher.exec(headerLines[i]);
				this.DCaseName = headerLines[i].substring(DCaseNameMatcher.lastIndex);
				break;
			}
		}

		return nodeInfoText;
	}

	parseMarkdown(markdownText : string) : DCaseTree.TopGoalNode {
		this.initUsedNodeIdList(markdownText);

		markdownText = this.parseHeader(markdownText);

		var rootNode : DCaseTree.TopGoalNode = <DCaseTree.TopGoalNode>this.parseGoal(markdownText, 0, null);
		rootNode.DCaseName = this.DCaseName;
		rootNode.NodeCount = this.NodeCount;
		rootNode.TopGoalId = rootNode.Id;

		return rootNode;
	}

}
