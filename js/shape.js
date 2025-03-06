/**
 ** @desc Объект для хранения и трансформации точек обрабатываемой фигуры
 **/
class Shape {
	points           = [];      //Основные точки в пространстве модели
	translatedPoints = [];      //Преобразованные точки, с углом поворота и смещением относительно оси
	color     = "orange";       //Цвет фигуры
	translate = new Vector3F(); //Смещение фигуры относительно оси координат
	angle     = 0;
	/**
	 ** @desc Конструктор фигуры, принимает массив точек и сохраняет их в points
	 ** @vars (array) pointsArray - массив с исходными точками фигуры
	 **/
	constructor( pointsArray ) {
		for( let p = 0; p < pointsArray.length; p++ ) {
			this.points.push( pointsArray[ p ] )
		}
	}
	/**
	 ** @desc Добавляем новую точку в фигуру
	 **/
	AddPoint( vector3f ) {
		this.points.push( vector3f );
	}
	/**
	 ** @desc Удаляет точку из фигуры
	 **/
	RemovePoint( pointIndex ) {
		this.points.splice( pointIndex , 1 ) ;
	}
	/**
	 ** @desc Задаёт цвет фигуры
	 **/
	SetColor( color ) {
		this.color = color;
	}
	/**
	 ** @desc Возвращает точки, без преобразований, может понадобится если нужно применить изменения к самой фигуре
	 **/
	GetPoints() {
		return this.points;
	}
	/**
	 ** @desc Выводит фигуру на холст
	 **/
	Draw() {
		DrawFigure( this , this.color );
	}
	/**
	 ** @desc Смещает точку на заданный вектор
	 ** @vars (Vector3F) vector3f - вектор смещения
	 **/
	Translate( vector3f ) {
		this.translate.Translate( vector3f );
	}
	/**
	 ** @desc Поворачивает всю фигуру на заданный угол
	 ** @vars (float) angle - угол поворота в радианах
	 **/
	Rotate( angle ) {
		this.angle += angle;
	}
	/**
	 ** @desc Обновление объекта фигуры, применяется раз за кадр
	 **/
	Update() {
		this.ApplyTransforms();
	}
	/**
	 ** @desc Применяет преобразования смещения и вращения, должен использоваться раз, за кадр
	 **/
	ApplyTransforms() {
		this.translatedPoints = [];
		let points = this.points;
		let sin    = Math.sin( this.angle );
		let cos    = Math.cos( this.angle );
		let x      = 0;
		let y      = 0;
		for( let p = 0; p < points.length; p++ ) {
			let point = points[ p ];
			x         = this.translate.x + ( point.x * cos - point.y * sin );
			y         = this.translate.y + ( point.x * sin + point.y * cos );
			this.translatedPoints.push( new Vector3F( x , y ) );
		}
	}
	/**
	 ** @desc Возвращает точки, со всеми преобразованиями, должен использоваться при основных вычислениях
	 **/
	GetTranslatedPoints() {
		return this.translatedPoints;
	}
}