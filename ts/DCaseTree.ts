export class DCaseNode {

	NodeType : string;
	Description : string;
	MetaData : any;
	ThisNodeId : number;
	Children : DCaseNode[];

	constructor(NodeType : string, Description : string, MetaData, ThisNodeId : number) {
		this.NodeType = NodeType;
		this.Description = Description;
		this.MetaData = MetaData;
		this.ThisNodeId = ThisNodeId;
		this.Children = [];
	}

	convertAllChildNodeIntoJson(jsonArray : any[]) : any[]{
		return [];
	}

	convertAllChildNodeIntoXml() : void {
	}

	convertAllChildNodeIntoMarkdown() : void {
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

	convertAllChildNodeIntoJson(jsonArray : any[]) : any[]{
		jsonArray.push({"key" : "goal"});
		for(var i = 0; i < this.Children.length; i++) {
			this.Children[i].convertAllChildNodeIntoJson(jsonArray);
		}
		return jsonArray;
	}

}

export class StrategyNode extends DCaseNode {

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Strategy", Description, MetaData, ThisNodeId);
	}

	convertAllChildNodeIntoJson(jsonArray : any[]) : any[]{
		jsonArray.push({"key" : "strategy"});
		return jsonArray;
	}

}
