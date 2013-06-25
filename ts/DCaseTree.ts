///<reference path='../d.ts/DefinitelyTyped/jquery/jquery.d.ts'/>

import $ = module("jquery");

function outputText(text : string) : void {
	console.log(text);
}

export class DCaseNode {

	NodeType : string;
	NodeName : string;
	Description : string;
	Id : number;
	MetaData : any[];
	Children : DCaseNode[];

	constructor(NodeType : string, Description : string, MetaData : any, Id : number) {
		this.NodeType = NodeType;
		this.NodeName = null;
		this.Description = Description;
		this.MetaData = MetaData;
		this.Id = Id;
		this.Children = [];
	}

	convertAllChildNodeIntoJson(jsonData : any[]) : any[]{
		var elem : any = {};
		elem["NodeType"]   = this.NodeType;
		elem["Description"]= this.Description
		elem["Id"] = this.Id;

		var childrenIds : number[] = [];
		for(var i : number = 0; i < this.Children.length ; i++) {
			childrenIds[i] = this.Children[i].Id;
		}
		elem["Children"] = childrenIds;

		if(this.MetaData.length > 1){
			var metaArray : any[] = [];
			for(var h : number = 0; h < this.MetaData.length; h++){
				metaArray.push(this.MetaData[h]);
			}
			elem["MetaData"] = metaArray;
		} else {
			elem["MetaData"] = this.MetaData;
		}

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
		var nodeId : string   = this.Id.toString();
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
			$linkObj.attr("id",  nodeId + "-" + this.Children[i].Id.toString());
			$linkObj.attr("source", nodeId);
			$linkObj.attr("target", this.Children[i].Id.toString());
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
		var asterisk  : string = "";

		if(this.NodeType == "Goal"){
			goalNum++;	
		}

		for(var i : number = 0; i < goalNum; i++){
			asterisk += "*";
		}

		outputStr += asterisk + this.NodeType + " " + "NodeName(not defined)" + " " + this.Id;
		outputText(outputStr)
		outputText(this.Description);

		if(this.MetaData.length == 0){
			outputText("---");
		} else if (this.MetaData.length > 1) {
			for(var j : number = 0; j < this.MetaData.length; j++){
				var keyString: string[] = Object.keys(this.MetaData[j]);
				outputText("---");
				for(var keyName in this.MetaData[j]){
					outputText(keyName + ": " + this.MetaData[j][keyName]);
				}
			}
		} else {
			outputText("---");
			for(var keyName in this.MetaData){
				outputText(keyName + ": " + this.MetaData[keyName]);
			}
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
		data += this.NodeType + ":" + this.Id;
		console.log(data); // dump this node

		for(var i : number = 0; i < this.Children.length; i++) {
			this.Children[i].dumpAllChild(depth + 1);
		}
	}

}

export class SolutionNode extends DCaseNode {

	constructor(Description : string, MetaData : any, Id : number) {
		super("Solution", Description, MetaData, Id);
	}

}

export class EvidenceNode extends DCaseNode {

	constructor(Description : string, MetaData : any, Id : number) {
		super("Evidence", Description, MetaData, Id);
	}

}

export class ContextNode extends DCaseNode {

	constructor(Description : string, MetaData : any, Id : number) {
		super("Context", Description, MetaData, Id);
	}

}

export class RebbutalNode extends DCaseNode { // don't care

	constructor(Description : string, MetaData : any, Id : number) {
		super("Rebbutal", Description, MetaData, Id);
	}

}

export class ContextAddableNode extends DCaseNode {

	Contexts : ContextNode[];

	constructor(NodeType : string, Description : string, MetaData : any[], Id : number) {
		super(NodeType, Description, MetaData, Id);
		this.Contexts = [];
	}


	convertAllChildNodeIntoJson(jsonData : any[]) : any[]{
		var elem : any = {};
		elem["NodeType"]   = this.NodeType;
		elem["Description"]= this.Description
		elem["Id"] = this.Id;

		var childrenIds : number[] = [];
		for(var i : number = 0; i < this.Children.length ; i++) {
			childrenIds[i] = this.Children[i].Id;
		}
		elem["Children"] = childrenIds;


		if(this.Contexts.length != 0){
			var contextId: any[] = [];
			for(var i: number = 0; i < this.Contexts.length; i++){
				contextId.push(this.Contexts[i].Id);
			}
			elem["Contexts"] = contextId;
		}

		if(this.MetaData.length > 1){
			var MetaArray: string[] = [];
			for(var h: number = 0; h < this.MetaData.length; h++){
				MetaArray[h] = this.MetaData[h];
			}
			elem["MetaData"] = MetaArray;
		} else {
			elem["MetaData"] = this.MetaData;
		}

		jsonData.push(elem);

		if(this.Contexts.length != 0){
			for(var k : number = 0; k < this.Contexts.length; k++){
				elem["NodeType"]   = this.Contexts[k].NodeType;
				elem["Description"]= this.Contexts[k].Description;
				elem["Id"] = this.Contexts[k].Id;

				if(this.Contexts[k].MetaData.length > 1){
					var MetaArray: string[] = [];
					for(var h: number = 0; h < this.Contexts[k].MetaData.length; h++){
						MetaArray[h] = this.Contexts[k].MetaData[h];
					}
					elem["MetaData"] = MetaArray;
				} else {
					elem["MetaData"] = this.Contexts[k].MetaData;
				}
			}
			jsonData.push(elem);
		}

		for(var j : number = 0; j < this.Children.length ; j++){
			this.Children[j].convertAllChildNodeIntoJson(jsonData);
		}

		return jsonData;
	}


	convertAllChildNodeIntoMarkdown(goalNum : number) : void {
		var outputStr : string = "";
		var asterisk  : string = "";

		if(this.NodeType == "Goal"){
			goalNum++;
		}

		for(var i : number = 0; i < goalNum; i++){
			asterisk += "*";
		}

		outputStr += asterisk + this.NodeType + " " + "NodeName(not defined)" + " " + this.Id;
		outputText(outputStr)
		outputText(this.Description);


		if(this.MetaData.length == 0){
			outputText("---");
		} else if (this.MetaData.length > 1){
			for(var j : number = 0; j < this.MetaData.length; j++){
				var keyString: string[] = Object.keys(this.MetaData[j]);
				outputText("---");
				for(var keyName in this.MetaData[j]){
					outputText(keyName + ": " + this.MetaData[j][keyName]);
				}
			}
		} else {
			outputText("---");
			for(var keyName in this.MetaData){
				outputText(keyName + ": " + this.MetaData[keyName]);
			}
		}

		outputText("---");

		if(this.Contexts.length != 0){
			for(var m: number = 0; m < this.Contexts.length; m++) {
				outputStr = "";
				outputStr += asterisk + this.Contexts[m].NodeType + " " + 
					"NodeName(Undefined)" + this.Contexts[m].Id;

				outputText(outputStr);
				outputText(this.Contexts[m].Description);


				if(this.Contexts[m].MetaData.length == 0){
					outputText("---");
				} else if (this.Contexts[m].MetaData.length > 1) {
					for(var j : number = 0; j < this.Contexts[m].MetaData.length; j++){
						var keyString: string[] = Object.keys(this.Contexts[m].MetaData[j]);
						outputText("---");
						for(var keyName in this.Contexts[m].MetaData[j]){
							outputText(keyName + ": " + this.Contexts[m].MetaData[j][keyName]);
						}
					}
				} else {
					outputText("---");
					for(var keyName in this.Contexts[m].MetaData){
						outputText(keyName + ": " + this.Contexts[m].MetaData[keyName]);
					}
				}
				outputText("---");
			}
		}


		for(var k : number = 0; k < this.Children.length; k++) {
			this.Children[k].convertAllChildNodeIntoMarkdown(goalNum);
		}
	}

	dumpAllChild(depth : number) : void { // it is private method (don't use this)
		var data : string = "";
		for(var i : number = 0; i < depth; i++) {
			data += "\t";
		}
		data += this.NodeType + ":" + this.Id;
		if(this.Contexts.length != 0) {
			data += " (Contexts:" + this.Contexts[0].Id;
			for(var i = 1; i < this.Contexts.length; i++) {
				data += ", ";
				data += this.Contexts[i].Id;
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

	constructor(Description : string, MetaData : any, Id : number) {
		super("Goal", Description, MetaData, Id);
	}

}

export class TopGoalNode extends GoalNode {

	DCaseName : string;
	NodeCount : number;
	TopGoalId : number;

	constructor(DCaseName : string, NodeCount : number, Description : string, MetaData : any, Id : number) {
		super(Description, MetaData, Id);
		this.DCaseName = DCaseName;
		this.NodeCount = NodeCount;
		this.TopGoalId = Id;
	}


	convertAllChildNodeIntoJson(jsonData : any[]) : any[]{
		var jsonOutput : any[] = [];
		jsonOutput["DCaseName"] = this.DCaseName;
		jsonOutput["NodeCount"] = this.NodeCount;
		jsonOutput["TopGoalId"] = this.TopGoalId;
		jsonOutput["NodeList"]  = jsonData;

		var elem : any = {};
		elem["NodeType"]   = this.NodeType;
		elem["Description"]= this.Description
		elem["Id"] = this.Id;

		var childrenIds : number[] = [];
		for(var i : number = 0; i < this.Children.length ; i++) {
			childrenIds[i] = this.Children[i].Id;
		}
		elem["Children"] = childrenIds;

		if(this.Contexts.length != 0){
			var contextId: any[] = [];
			for(var m: number = 0; m < this.Contexts.length; m++){
				contextId.push(this.Contexts[m].Id);
			}
			elem["Contexts"] = contextId;
		}

		if(this.MetaData.length > 1){
			var MetaArray : any[] = [];
			for(var h : number = 0; h < this.MetaData.length; h++){
				MetaArray[h] = this.MetaData[h];
			}
			elem["MetaData"] = MetaArray;
		} else {
			elem["MetaData"] = this.MetaData;
		}

		jsonData.push(elem);

		if(this.Contexts.length != 0){
			var contextElem : any [] = [];
			for(var k : number = 0; k < this.Contexts.length; k++){
				contextElem["NodeType"]   = this.Contexts[k].NodeType;
				contextElem["Description"]= this.Contexts[k].Description;
				contextElem["Id"] = this.Contexts[k].Id;

				if(this.Contexts[k].MetaData.length > 1){
					var MetaArray: string[] = [];
					for(var h: number = 0; h < this.Contexts[k].MetaData.length; h++){
						MetaArray[h] = this.Contexts[k].MetaData[h];
					}
					contextElem["MetaData"] = MetaArray;
				} else {
					contextElem["MetaData"] = this.Contexts[k].MetaData;
				}
			}
			jsonData.push(contextElem);
		}

		for(var j : number = 0; j < this.Children.length ; j++){
			this.Children[j].convertAllChildNodeIntoJson(jsonData);
		}

		return jsonOutput;
	}



	convertAllChildNodeIntoMarkdown(goalNum : number) : void {
		var outputStr : string = "";
		var asterisk  : string = "";

		if(this.NodeType == "Goal"){
			goalNum++;
		}

		for(var i : number = 0; i < goalNum; i++){
			asterisk += "*";
		}

		outputText("DCaseName: " + this.DCaseName + "\n");

		outputStr += asterisk + this.NodeType + " " + "NodeName(not defined)" + " " + this.TopGoalId;
		outputText(outputStr)
		outputText(this.Description);


		if(this.MetaData.length == 0){
			outputText("---");
		} else if (this.MetaData.length >1){
			for(var j : number = 0; j < this.MetaData.length; j++){
				var keyString: string[] = Object.keys(this.MetaData[j]);
				outputText("---");
				for(var keyName in this.MetaData[j]){
					outputText(keyName + ": " + this.MetaData[j][keyName]);
				}
			}
		} else {
			outputText("---");
			for(var keyName in this.MetaData){
				outputText(keyName + ": " + this.MetaData[keyName]);
			}
		}
		outputText("---");

		if(this.Contexts.length != 0){
			for(var m: number = 0; m < this.Contexts.length; m++) {
				outputStr = "";
				outputStr += asterisk + this.Contexts[m].NodeType + " " +
					"NodeName(Undefined)" + this.Contexts[m].Id;

				outputText(outputStr);
				outputText(this.Contexts[m].Description);

				if(this.Contexts[m].MetaData.length == 0){
					outputText("---");
				} else if (this.Contexts[m].MetaData.length > 1) {
					for(var j : number = 0; j < this.Contexts[m].MetaData.length; j++){
						var keyString: string[] = Object.keys(this.Contexts[m].MetaData[j]);
						outputText("---");
						for(var keyName in this.Contexts[m].MetaData[j]){
							outputText(keyName + ": " + this.Contexts[m].MetaData[j][keyName]);
						}
					}
				} else {
					outputText("---");
					for(var keyName in this.Contexts[m].MetaData){
						outputText(keyName + ": " + this.Contexts[m].MetaData[keyName]);
					}
				}
				outputText("---");
			}
		}

		for(var k : number = 0; k < this.Children.length; k++) {
			this.Children[k].convertAllChildNodeIntoMarkdown(goalNum);
		}
	}




}

export class StrategyNode extends ContextAddableNode {

	constructor(Description : string, MetaData, Id : number) {
		super("Strategy", Description, MetaData, Id);
	}

}
