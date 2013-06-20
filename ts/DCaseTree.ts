///<reference path='../d.ts/DefinitelyTyped/jquery/jquery.d.ts'/>

import $ = module("jquery");

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
	var $dcaseObj : JQuery = $("dcase:Argument");
		var linkNum: number = 1;
		var $nodeObj : JQuery = $("rootBasicnode");
		var nodeId : string   = this.ThisNodeId.toString();
		$nodeObj.attr("xsi:type", "dcase:"+ this.NodeType);
		$nodeObj.attr("id", nodeId);
	//	if(this.NodeName == undefined){
		$nodeObj.attr("name", "Undefined");
	//	}
	//	$nodeObj.attr("desc", this.Description);

		$nodeObj.appendTo($dcaseObj);

		for(var i = 0; i < this.Children.length; i ++){
			var $linkObj : JQuery = $("rootBasicLink");
			$linkObj.attr("xsi:type", "dcase:link");
			$linkObj.attr("id",  nodeId + "-" + this.Children[i].ThisNodeId.toString());
			$linkObj.attr("source", nodeId);
			$linkObj.attr("target", this.Children[i].ThisNodeId.toString());
			$linkObj.attr("name", "Link_" + linkNum.toString());

			linkNum++;

			$linkObj.appendTo($dcaseObj);

			this.Children[i].convertAllChildNodeIntoXml();
		}

		var strXml = $dcaseObj.text();
		console.log(strXml);
	}

	convertAllChildNodeIntoMarkdown(goalNum : number) : void {
		var outputStr : string = "";
		var goalFlag : bool = false;

		if(this.NodeType == "Goal"){
			goalFlag  = true;
			goalNum++;	
		}

		for(var i : number = 0; i < goalNum; i++){
			outputStr += "*";
		}

		outputStr += this.NodeType + " " + "NodeName(not defined)" + " " + this.ThisNodeId;
		outputText(outputStr)
		outputText(this.Description + "\n");
		outputText("---");

		for(var j : number = 0; j < this.MetaData.length; j++){ 
			outputText(this.MetaData[j]);
		}
		outputText("---");

		for(var k : number = 0; k < this.Children.length; k++) {
			this.Children[k].convertAllChildNodeIntoMarkdown(goalNum);
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

export class ContextNode extends DCaseNode {

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

	Contexts : ContextNode[];

	constructor(NodeType : string, Description : string, MetaData, ThisNodeId : number) {
		super(NodeType, Description, MetaData, ThisNodeId);
		this.Contexts = [];
	}

	dumpAllChild(depth : number) : void { // it is private method (don't use this)
		var data : string = "";
		for(var i : number = 0; i < depth; i++) {
			data += "\t";
		}
		data += this.NodeType + ":" + this.ThisNodeId;
		if(this.Contexts.length != 0) {
			data += "(" + this.Contexts[0].ThisNodeId;
			for(var i = 1; i < this.Contexts.length; i++) {
				data += ", ";
				data += this.Contexts[i].ThisNodeId;
			}
			data+= ")";
		}
		console.log(data); // dump this node

		for(var i : number = 0; i < this.Children.length; i++) {
			this.Children[i].dumpAllChild(depth + 1);
		}
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
