/**
 ** @desc Стандартный объект трёхмерного вектора, по сути для этой задачи нужен был 2д, но мне проще использовать одну и ту же реализацию, просто не учитывать z координату.
 **/
class Vector3F {
	x = 0;
	y = 0;
	z = 0;
	constructor( x = 0 , y = 0 , z = 0 ) {
		this.Set( x , y , z );
	}
	Dot( vector3f ) {
		return ( this.x * vector3f.x ) + ( this.y * vector3f.y ) + ( this.z * vector3f.z );
	}
	Cross( vector3f ) {
		return new Vector3F( this.z * vector3f.y - this.y * vector3f.z , this.x * vector3f.z - this.z * vector3f.x , this.y * vector3f.x - this.x * vector3f.y );
	}
	Normalize() {
		let len = Math.sqrt( Math.pow( this.x , 2 ) + Math.pow( this.y , 2 ) + Math.pow( this.z , 2 ) );
		return new Vector3F( this.x / len , this.y / len , this.z / len );
	}
	Negate() {
		return new Vector3F( -this.x , -this.y , -this.z );
	}
	Set( x , y , z ) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	Translate( vector3f ) {
		this.x += vector3f.x;
		this.y += vector3f.y;
		this.z += vector3f.z;
	}
	Copy() {
		return new Vector3F( this.x , this.y , this.z );
	}
	Subtract( vector3f ) {
		return new Vector3F( this.x - vector3f.x , this.y - vector3f.y , this.z - vector3f.z );
	}
	Plus( vector3f ) {
		return new Vector3F( this.x + vector3f.x , this.y + vector3f.y , this.z + vector3f.z );
	}
	Multiply( num ) {
		return new Vector3F( this.x * num , this.y * num , this.z * num );
	}
	Devide( num ) {
		return new Vector3F( this.x / num , this.y / num , this.z / num );
	}
	Compare( vector3f ) {
		if( vector3f.x == this.x && vector3f.y == this.y && vector3f.z == this.z ) return true;
		return false;
	}
}