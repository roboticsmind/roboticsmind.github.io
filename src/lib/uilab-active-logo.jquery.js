
import $ from 'jquery';

var UILabLogo = function($container) {
	this.$container = $container;
	this.setStyle().setConfig().setLengthes();
	this.createDots();
	return this;
};
UILabLogo.prototype.setStyle = function() {
	this.$container.css({
		'position': 'relative'
	});
	return this;
};
UILabLogo.prototype.setConfig = function() {
	this.config = {
		'matrixSize': 4,
		'smallDotRatio': 0.07,
		'bigDotRatio': 0.16,
		'defaultAnimationInterval': 500,
	};
	return this;
};
UILabLogo.prototype.setLengthes = function() {
	var containerSize = this.$container.width();
	var smallDotSize = containerSize * this.config.smallDotRatio;
	var bigDotSize = containerSize * this.config.bigDotRatio;
	var outerMargin = bigDotSize * 0.5;
	var innerMargin = (containerSize - (2 * outerMargin)) / (this.config.matrixSize - 1);

	this.lengthes = {
		'outerMargin': Math.round(outerMargin),
		'innerMargin': Math.round(innerMargin),
		'smallDotSize': Math.round(smallDotSize),
		'bigDotSize': Math.round(bigDotSize)
	};
	return this;
};
UILabLogo.prototype.createDot = function(i, j, x, y) {
	var className = 'dot-' + i + '-' + j;
	this.$container.append('<div class="' + className + '"></div>');
	var dot = this.$container.find('.' + className);
	var size = this.lengthes.smallDotSize;
	dot.css({
		'position': 'absolute',
		'top': y - (size * 0.5) + 'px',
		'left': x - (size * 0.5) + 'px',
		'width': size + 'px',
		'height': size + 'px',
		'border-radius': '50%',
		'background-color': '#333333',
		'transition': 'all 0.2s ease-in-out',
	});
	return dot;
};
UILabLogo.prototype.changeDotSize = function(i, j, size) {
	var x = this.lengthes.outerMargin + j * this.lengthes.innerMargin;
	var y = this.lengthes.outerMargin + i * this.lengthes.innerMargin;
	this.dots[i][j].css({
		'width': size,
		'height': size,
		'top': y - (size * 0.5) + 'px',
		'left': x - (size * 0.5) + 'px',
	});
	return this;
};
UILabLogo.prototype.increaseDot = function(i, j) {
	return this.changeDotSize(i, j, this.lengthes.bigDotSize);
};
UILabLogo.prototype.decreaseDot = function(i, j) {
	return this.changeDotSize(i, j, this.lengthes.smallDotSize);
};
UILabLogo.prototype.changeDotColor = function(i, j, color) {
	this.dots[i][j].css({'background-color': color});
	return this;
};
UILabLogo.prototype.createDots = function() {
	var i, j, x, y, size;
	this.dots = [];
	for (i = 0; i < this.config.matrixSize; i++) {
		var dotLine = []
		for (j = 0; j < this.config.matrixSize; j++) {
			x = this.lengthes.outerMargin + j * this.lengthes.innerMargin;
			y = this.lengthes.outerMargin + i * this.lengthes.innerMargin;
			size = this.lengthes.smallDotSize;
			dotLine.push(this.createDot(i, j, x, y))
		}
		this.dots.push(dotLine);
	}
	return this;
};
UILabLogo.prototype.startDefaultAnimation = function() {
	// #26622E
	var logo = this;
	setTimeout(function(){
		logo.increaseDot(0, 1);
		logo.changeDotColor(0, 1, '#1C3D98');
	 }, 500);
	setTimeout(function(){
		logo.increaseDot(1, 1);
	 }, 1000);
	setTimeout(function(){
		logo.increaseDot(2, 1);
		logo.increaseDot(2, 2);
	 }, 1500);
	setTimeout(function(){
		logo.increaseDot(3, 1);
		logo.increaseDot(3, 3);
	 }, 2000);
};
UILabLogo.prototype.startTestAnimation = function() {
	var logo = this;
	setTimeout(function(){
		logo.increaseDot(0, 1);
		logo.increaseDot(0, 3);
		logo.changeDotColor(0, 1, '#1C3D98');
	 }, 500);
	setTimeout(function(){
		logo.increaseDot(1, 1);
		logo.increaseDot(1, 3);
	 }, 1000);
	setTimeout(function(){
		logo.increaseDot(2, 1);
		logo.increaseDot(2, 3);
	 }, 1500);
	setTimeout(function(){
		logo.increaseDot(3, 0);
		// logo.increaseDot(3, 1);
		logo.increaseDot(3, 2);
		logo.increaseDot(3, 3);
	 }, 2000);
};
UILabLogo.prototype.randInt = function(a, b) {
	return Math.floor((Math.random() * b) + a);
};
UILabLogo.prototype.randColor = function() {
	var colors = [
		'#1C3D98', '#4285F4', '#66D04F', '#FEEC4A', '#E32170', '#D4161B', '#2CA48F'
	];
	var randIndex = this.randInt(0, colors.length);
	return colors[randIndex];
};
UILabLogo.prototype.drawRandomAnimation = function() {
	var logo = this;
	var increase = this.randInt(1,2);
	var vertical = this.randInt(1,2);
	var branch = this.randInt(1,2);
	var interval = this.config.defaultAnimationInterval;
	var points = [];
	var colorCode = this.randColor();

	for (var i = 0; i < 4; i++) {
		var pointSet = [-1, -1, -1];
		if (increase == 1) pointSet[0] = i;
		else pointSet[0] = 3 - i;

		if (branch == 1) {
			if (i == 0 || i == 1) {
				pointSet[1] = 1;
				pointSet[2] = -1;
			}
			else if (i == 2) {
				pointSet[1] = 1;
				pointSet[2] = 2;
			}
			else {
				pointSet[1] = 1;
				pointSet[2] = 3;
			}
		}
		else {
			if (i == 0 || i == 1) {
				pointSet[1] = 2;
				pointSet[2] = -1;
			}
			else if (i == 2) {
				pointSet[1] = 2;
				pointSet[2] = 1;
			}
			else {
				pointSet[1] = 2;
				pointSet[2] = 0;
			}
		}
		points.push(pointSet);
	}
	setTimeout(function(){
		if (vertical == 1) {
			logo.increaseDot(points[0][0], points[0][1]);
			logo.changeDotColor(points[0][0], points[0][1], colorCode);
		}
		else {
			logo.increaseDot(points[0][1], points[0][0]);
			logo.changeDotColor(points[0][1], points[0][0], colorCode);
		}
	}, interval);
	setTimeout(function(){
		if (vertical == 1) {
			logo.increaseDot(points[1][0], points[1][1]);
		}
		else {
			logo.increaseDot(points[1][1], points[1][0]);
		}
	}, interval * 2);
	setTimeout(function(){
		if (vertical == 1) {
			logo.increaseDot(points[2][0], points[2][1]);
			logo.increaseDot(points[2][0], points[2][2]);
		}
		else {
			logo.increaseDot(points[2][1], points[2][0]);
			logo.increaseDot(points[2][2], points[2][0]);
		}
	}, interval * 3);
	setTimeout(function(){
		if (vertical == 1) {
			logo.increaseDot(points[3][0], points[3][1]);
			logo.increaseDot(points[3][0], points[3][2]);
		}
		else {
			logo.increaseDot(points[3][1], points[3][0]);
			logo.increaseDot(points[3][2], points[3][0]);
		}
	}, interval * 4);
	setTimeout(function(){
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				logo.decreaseDot(i, j);
				logo.changeDotColor(i, j, '#000000');
			}
		}
	}, interval * 12);
};
UILabLogo.prototype.startDefaultRandomAnimation = function() {
	var interval = this.config.defaultAnimationInterval;
	var logo = this;
	this.drawRandomAnimation();

	setTimeout(function() {
		logo.startDefaultRandomAnimation();
	}, interval * 13)
};

$.fn.extend({
	drawUILabLogo: function() {
		return new UILabLogo(this);
	}
});
