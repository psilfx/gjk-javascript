function DrawFigure( figure , color = "black" ) {
	let points = figure.GetTranslatedPoints();
	let begin  = points[ 0 ];
	let end    = [];
	context.beginPath();
	context.moveTo( widthH + begin.x * figscale , heightH + begin.y * figscale );
	context.strokeStyle = color;
	for( let p = 1; p < points.length; p++ ) {
		end = points[ p ];
		context.lineTo( widthH + end.x * figscale , heightH + end.y * figscale );
	}
	context.lineTo( widthH + begin.x * figscale , heightH + begin.y * figscale );
	context.stroke();
}
function DrawPoint( point , color = "black" , size = 5 ) {
	context.fillStyle = color;
	context.fillRect( widthH + point.x * figscale - size * 0.5 , heightH + point.y * figscale - size * 0.5 , size , size );
}
function DrawLine( point1 , point2 , color = "black" ) {
	context.beginPath();
	context.strokeStyle = color;
	context.moveTo( widthH + point1.x * figscale , heightH + point1.y * figscale );
	context.lineTo( widthH + point2.x * figscale , heightH + point2.y * figscale );
	context.stroke();
}
function DrawScale() {
	context.beginPath();
	context.strokeStyle = "black";
	context.moveTo( widthH + (-5) * figscale , heightH + 0 * figscale );
	context.lineTo( widthH + 0 * figscale , heightH + 0 * figscale );
	context.lineTo( widthH + 5 * figscale , heightH + 0 * figscale );
	context.stroke();
	context.beginPath();
	context.strokeStyle = "black";
	context.moveTo( widthH + 0 * figscale , heightH + (-5) * figscale );
	context.lineTo( widthH + 0 * figscale , heightH + 0 * figscale );
	context.lineTo( widthH + 0 * figscale , heightH + 5 * figscale );
	context.stroke();
	for( let y = -5; y <= 5; y++ ) {
		context.beginPath();
		context.moveTo( widthH + (-2) , heightH + y * figscale );
		context.lineTo( widthH + 2 , heightH + y * figscale );
		context.stroke();
		context.beginPath();
		context.moveTo( widthH + y * figscale , heightH + (-2) );
		context.lineTo( widthH + y * figscale , heightH + 2 );
		context.stroke();
	}
}