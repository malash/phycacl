global = {};
global.numRow = 0;
global.fixedNum = 8;
global.googleJsAPI = false;

function appendRow() {
	var id = global.numRow++;
	var str = "<tr class='row-%id%'><td class='order'>%idplus1%</td><td><div class='x-div control-group'><input type='text' class='x'/></div></td><td><div class='y-div control-group'><input type='text' class='y'/></div></td></tr>";
	str = str.replace(/%id%/g, id);
	str = str.replace(/%idplus1%/g, id + 1);
	$(".coordinate tbody").append(str);
}

function getX(p) {
	return parseFloat($(".coordinate tbody .row-" + p + " .x").val());
}

function getY(p) {
	return parseFloat($(".coordinate tbody .row-" + p + " .y").val());
}

function setX(p, d) {
	return parseFloat($(".coordinate tbody .row-" + p + " .x").val(d));
}

function setY(p, d) {
	return parseFloat($(".coordinate tbody .row-" + p + " .y").val(d));
}

function deleteRow(p) {
	if (typeof(p) == "undefined") {
		p = global.numRow - 1;
	}
	if (p < 0 || p >= global.numRow) {
		return;
	}
	$(".coordinate tbody .row-" + p).remove();
	p++;
	while (p < global.numRow) {
		var dom = $(".coordinate tbody .row-" + p);
		dom.find(".order").html(p);
		dom.attr("class", "row-" + (p - 1));
		p++;
	}
	global.numRow--;
}

function isEmptyRow(p) {
	var x = $(".coordinate tbody .row-" + p + " .x").val();
	var y = $(".coordinate tbody .row-" + p + " .y").val();
	if (x && x.length > 0) {
		return false;
	}
	if (y && y.length > 0) {
		return false;
	}
	return true;
}

function deleteEmptyRow() {
	for (var i = 0; i < global.numRow; i++) {
		if (isEmptyRow(i)) {
			deleteRow(i);
			i--;
		}
	}
}

function emptyRow() {
	while (global.numRow > 0) {
		deleteRow();
	}
}

function initRow() {
	while (global.numRow < 2) {
		appendRow();
	}
}

function generateExample() {
	emptyRow();
	var sum = 0;
	for (var i = 0; i < 6; i++) {
		appendRow();
		setX(i, i*10);
		sum += parseInt(Math.random() * 100000) / 10000;
		setY(i, sum);
	}
}

function drawChart() {
	if (!global.googleJsAPI) {
		return false;
	}
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'X');
	data.addColumn('number', 'Y');
	data.addColumn({
		type: 'boolean',
		role: 'certainty'
	});
	for (var i = 0; i < global.numRow; i++) {
		data.addRows([[getX(i), getY(i), true]]);
	}
	var options = {
		title: '直角坐标系',
		hAxis: {
			title: 'x',
			//minValue: -1,
			//maxValue: 1
		},
		vAxis: {
			title: 'y',
			//minValue: -1,
			//maxValue: 1
		},
		legend: 'none',
		axisTitlesPosition: 'in'
	};
	
	var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}

function checkInput() {
	var ret = true;
	for (var i = 0; i < global.numRow; i++) {
		var str  = $(".coordinate tbody .row-" + i + " .x").val();
		if (!str.match(/^-?\d+(\.\d+)?$/)) {
			$(".coordinate tbody .row-" + i + " .x-div").addClass("error");
			if (ret == true) {
				$(".coordinate tbody .row-" + i + " .x").focus();
			}
			ret = false;
		} else {
			$(".coordinate tbody .row-" + i + " .x-div").removeClass("error");
		}
		var str  = $(".coordinate tbody .row-" + i + " .y").val();
		if (!str.match(/^-?\d+(\.\d+)?$/)) {
			$(".coordinate tbody .row-" + i + " .y-div").addClass("error");
			if (ret == true) {
				$(".coordinate tbody .row-" + i + " .y").focus();
			}
			ret = false;
		} else {
			$(".coordinate tbody .row-" + i + " .y-div").removeClass("error");
		}
	}
	return ret;
}

function cacl() {
	deleteEmptyRow();
	if (global.numRow < 2) {
		initRow();
		alert("请至少输入两行数据");
		return false;
	}
	if (!checkInput()) {
		return false;
	}
	drawChart();
	global.linearReg = new LinearRegression();
	for (var i = 0; i < global.numRow; i++) {
		global.linearReg.pushData(getX(i), getY(i));
	}
	$(".result #xAvg").html(global.linearReg.xAvg().toFixed(global.fixedNum));
	$(".result #yAvg").html(global.linearReg.yAvg().toFixed(global.fixedNum));
	$(".result #xyMulAvg").html(global.linearReg.xyMulAvg().toFixed(global.fixedNum));
	$(".result #xAvgYAvgMul").html((global.linearReg.xAvg() * global.linearReg.yAvg()).toFixed(global.fixedNum));
	$(".result #xSquareAvg").html(global.linearReg.xSquareAvg().toFixed(global.fixedNum));
	$(".result #xAvgSquare").html(global.linearReg.xAvgSquare().toFixed(global.fixedNum));
	$(".result #ySquareAvg").html(global.linearReg.ySquareAvg().toFixed(global.fixedNum));
	$(".result #yAvgSquare").html(global.linearReg.yAvgSquare().toFixed(global.fixedNum));
	$(".result #a").html(global.linearReg.a().toFixed(global.fixedNum));
	$(".result #b").html(global.linearReg.b().toFixed(global.fixedNum));
	$(".result #r").html(global.linearReg.r().toFixed(global.fixedNum));
	$(".result #muaA").html(global.linearReg.muaA().toFixed(global.fixedNum));
	$(".result #muaB").html(global.linearReg.muaB().toFixed(global.fixedNum));
}

function initGoogleJsAPI() {
	global.googleJsAPI = true;
	google.load('visualization', '1', {packages: ['corechart'], "callback" : drawChart});
}

function checkChartSupport() {
	var ua = navigator.userAgent;
	return true;
}

$(document).ready(function(e) {
	$(".btn-add-row").click(function(e) {
		appendRow();
	});
	$(".btn-empty").click(function(e) {
		if (window.confirm("确定要清空吗？")) {
			emptyRow();	
			initRow();
		}
	});
	$(".btn-del-row").click(function(e) {
		deleteEmptyRow();
	});
	$(".btn-cacl").click(function(e) {
		cacl();
	});
	$(".btn-example").click(function(e) {
		generateExample();
	});
	for (var i = 0; i < 6; i++) {
		appendRow();
	}
	if (checkChartSupport()) {
		$("#google-jsapi").attr("src", "https://www.google.com/jsapi?callback=initGoogleJsAPI");
	}
});
