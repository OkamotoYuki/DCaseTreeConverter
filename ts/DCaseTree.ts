function outputText(text : string) : void {
	console.log(text);
}

export class DCaseNode {

	NodeType : string;
	Description : string;
	ThisNodeId : number;
	MetaData : any[];
	Children : DCaseNode[];

	constructor(NodeType : string, Description : string, MetaData, ThisNodeId : number) {
		this.NodeType = NodeType;
		this.Description = Description;
		this.MetaData = MetaData;
		this.ThisNodeId = ThisNodeId;
		this.Children = [];
	}

	convertAllChildNodeIntoJson(jsonData : any[]) : any[]{
		var elem : any = {};
		elem["NodeType"]   = this.NodeType;
		elem["Description"]= this.Description
		elem["ThisNodeId"] = this.ThisNodeId;
		elem["MetaData"]   = this.MetaData;

		var childrenIds : number[] = [];
		for(var i : number = 0; i < this.Children.length ; i++) {
			childrenIds[i] = this.Children[i].ThisNodeId;
		}
		elem["Children"] = childrenIds;

		jsonData.push(elem);

		for(var j : number = 0; j < this.Children.length ; j++){
			this.Children[j].convertAllChildNodeIntoJson(jsonData);
		}

		return jsonData;
	}

	convertAllChildNodeIntoXml() : void {
	}

	convertAllChildNodeIntoMarkdown(goalNum : number) : void {
		var outputStr : string = "";
		var targetNum : number = 0;
		var goalFlag : bool = false;

		if(this.NodeType == "Goal"){
			targetNum = goalNum;
			goalFlag  = true;
		} else {
			targetNum = 1;
		}

		for(var i : number = 0; i < targetNum; i++){
			outputStr += "#";
		}

		outputStr += this.NodeType + " " + "NodeName(not defined)" + " " + this.ThisNodeId;
		outputText(outputStr)
		outputText(this.Description + "\n");
		outputText("------");

		for(var j : number = 0; j < this.MetaData.length; j++){ 
			outputText(this.MetaData[j]);
		}
		outputText("------\n");

		for(var k : number = 0; k < this.Children.length; k++) {
			if(goalFlag == true) {
				this.Children[k].convertAllChildNodeIntoMarkdown(goalNum + 1);
			} else {
				this.Children[k].convertAllChildNodeIntoMarkdown(goalNum);
			}
		}
	}

	/* for debug */
	dump() : void {
		this.dumpAllChild(0);
	}

	dumpAllChild(depth : number) : void { // it is private method (don't use this)
		var data : string = "";
		for(var i : number = 0; i < depth; i++) {
			data += "\t";
		}
		data += this.NodeType + ":" + this.ThisNodeId;
		console.log(data); // dump this node

		for(var i : number = 0; i < this.Children.length; i++) {
			this.Children[i].dumpAllChild(depth + 1);
		}
	}

}

export class SolutionNode extends DCaseNode {

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Solution", Description, MetaData, ThisNodeId);
	}

}

export class ContextNode extends DCaseNode { // don't care

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Context", Description, MetaData, ThisNodeId);
	}

}

export class RebbutalNode extends DCaseNode { // don't care

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Context", Description, MetaData, ThisNodeId);
	}

}

export class ContextAddableNode extends DCaseNode {

	Context : ContextNode; // don't care

	constructor(NodeType : string, Description : string, MetaData, ThisNodeId : number) {
		super(NodeType, Description, MetaData, ThisNodeId);
	}

}

export class GoalNode extends ContextAddableNode {

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Goal", Description, MetaData, ThisNodeId);
	}

}

export class StrategyNode extends DCaseNode {

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Strategy", Description, MetaData, ThisNodeId);
	}

}
