/**
 ** @desc Моя реализация алгоритма Гилберта — Джонсона — Кирти для 2д фигур.
 ** @author PsilFX
 **/
class GJK {
	simplex     = []; //Массив для построения симплекса
	figures     = []; //Массив с проверяемыми фигурами. Используются ключи [0][1]
	direction   = {}; //Напавление поиска вспомогательных точек
	cycleLength = 0;  //Длина цикла проверки, я не использую классический while
	collision   = false;
	/**
	 ** @desc Задаёт фигуры для проверки столкновений
	 ** @vars (Shape) figure1 - объект первой фигуры, (Shape) figure2 - объект второй фигуры
	 **/
	SetFigures( figure1 , figure2 ) {
		this.figures[ 0 ] = figure1;
		this.figures[ 1 ] = figure2;
		this.cycleLength = this.figures[ 0 ].GetPoints().length * this.figures[ 1 ].GetPoints().length;
	}
	/**
	 ** @desc Получаем дальнюю точку относительно фигуры и направления
	 ** @vars (array) figure - массив точек фигуры, (Vector3F) direction - вектор направления поиска
	 **/
	GetDistantPoint( figure , direction ) {
		let distance = Number.NEGATIVE_INFINITY;
		let point    = new Vector3F( 0 , 0 );
			for( let p = 0; p < figure.length; p++ ) {
				let figurePoint   = figure[ p ];
				let pointDistance = figurePoint.Dot( direction );
				if( pointDistance > distance ) {
					point    = figurePoint;
					distance = pointDistance;
				} 
			}
		return point;
	}
	/**
	 ** @desc Получает вспомогательную точку разности Минковского
	 **/
	GetSupportPoint() {
		let distantPoint1 = this.GetDistantPoint( this.figures[ 0 ].GetTranslatedPoints() , this.direction );
		let distantPoint2 = this.GetDistantPoint( this.figures[ 1 ].GetTranslatedPoints() , this.direction.Negate() );
		return distantPoint1.Subtract( distantPoint2 );
	}
	SetDirection( vector3f ) {
		this.direction = vector3f.Copy();
	}
	/**
	 ** @desc Основная логика проверки: Содержит ли треугольник точку начала координат. Если треугольник содержит точку начала координат - вернёт true, если нет задаст направления для поиска следующей точки и вернёт false.
	 **/
	CalculateDirectionAndCheckCollision() {
		let a  = this.simplex[ this.simplex.length - 1 ];
		let ao = a.Negate();
		//Проверяем лежит ли точка внутри треугольника
		if ( this.simplex.length == 3 ) {
			let b      = this.simplex[ 1 ];
			let c      = this.simplex[ 0 ];
			let abPerp = b.Cross( new Vector3F( a.x , a.y , 1 ) );
			let acPerp = c.Cross( new Vector3F( a.x , a.y , 1 ) );
			if ( abPerp.Dot( c ) >= 0 ) {
				abPerp = abPerp.Negate();
			}
			if ( acPerp.Dot( b ) >= 0 ) {
				acPerp = acPerp.Negate();
			}
			if ( abPerp.Dot( ao ) > 0 ) {
				this.simplex.splice( 0 , 1 );
				this.direction = abPerp;
				return false;
			} else if ( acPerp.Dot( ao ) > 0 ) {
				this.simplex.splice( 1 , 1 );
				this.direction = acPerp;
				return false;
			}
			return this.collision = true;
		} else {
			//Если треугольник ещё не создан, возвращаем направление для получения вспомогательной точки
			let b      = this.simplex[ 0 ];
			let abPerp = b.Cross( new Vector3F( a.x , a.y , 1 ) );
			if ( abPerp.Dot( ao ) > 0 ) {
				this.direction = abPerp;
			} else {
				this.direction = new Vector3F( ao.x , ao.y );
			}
			return false;
		}
	}
	/**
	 ** @desc Основной скрипт запуска проверки столкновений. Возвращает значение переменной collision, true/false
	 **/
	CheckCollision () {
		this.simplex     = new Array();
		this.simplex.push( this.GetSupportPoint() );
		this.direction   = this.direction.Negate();
		this.collision   = false;
		for( let i = 0; i < this.cycleLength; i++ ) { 
			let supportPoint = this.GetSupportPoint();
			//Выход из цикла, если точка не достигает начала координат или если столкновение было обнаружено
			if ( supportPoint.Dot( this.direction ) <= 0 || this.collision ) break;
			this.simplex.push( supportPoint );
			this.CalculateDirectionAndCheckCollision();
		}
		return this.collision;
	}
}