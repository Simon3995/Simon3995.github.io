/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin  / http://mark-lundin.com
 */

THREE.TrackballControls = function ( object, domElement ) {
	var _this = this;
	var STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	this.enabled = true;

	this.screen = { left: 0, top: 0, width: 0, height: 0 };

	this.rotateSpeed = 0.25;
	this.zoomSpeed = 0.3;
	this.panSpeed = 0.75;

	this.noRotate = false;
	this.noZoom = false;
	this.noPan = false;

	this.staticMoving = false;
	this.dynamicDampingFactor = 0.1;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];

	// internals

	this.target = new THREE.Vector3();

	var EPS = 0.000001;

	var lastPosition = new THREE.Vector3();

	var _state = STATE.NONE,
	_prevState = STATE.NONE,

	_eye = new THREE.Vector3(),



	_inputStartPos = new THREE.Vector2(),
	_inputLastPos = new THREE.Vector2(),


	_zoomStart = new THREE.Vector2(),
	_zoomEnd = new THREE.Vector2(),

	_touchZoomDistanceStart = 0,
	_touchZoomDistanceEnd = 0,

	_panStart = new THREE.Vector2(),
	_panEnd = new THREE.Vector2();

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.up0 = this.object.up.clone();

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };


	// methods

	this.stopMoving = function () {
		_inputLastPos.copy(_inputStartPos);
	}
	
	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.screen.left = 0;
			this.screen.top = 0;
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;

		} else {

			var box = this.domElement.getBoundingClientRect();
			// adjustments come from similar code in the jquery offset() function
			var d = this.domElement.ownerDocument.documentElement;
			this.screen.left = box.left + window.pageXOffset - d.clientLeft;
			this.screen.top = box.top + window.pageYOffset - d.clientTop;
			this.screen.width = box.width;
			this.screen.height = box.height;

		}

	};

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	var getMouseOnScreen = ( function () {

		var vector = new THREE.Vector2();

		return function getMouseOnScreen( pageX, pageY ) {

			vector.set(
				( pageX - _this.screen.left ) / _this.screen.width,
				( pageY - _this.screen.top ) / _this.screen.height
			);

			return vector;

		};

	}() );

	var getMouseOnCircle = ( function () {

		var vector = new THREE.Vector2();

		return function getMouseOnCircle( pageX, pageY ) {

			vector.set(
				( ( pageX - _this.screen.width * 0.5 - _this.screen.left ) / ( _this.screen.width * 0.5 ) ),
				( ( _this.screen.height + 2 * ( _this.screen.top - pageY ) ) / _this.screen.width ) // screen.width intentional
			);

			return vector;

		};

	}() );

	this.rotateCamera = ( function() {
		var d = new THREE.Vector2(),
			axis = new THREE.Vector3(),
			up = new THREE.Vector3(),
			side = new THREE.Vector3(),
			quaternion = new THREE.Quaternion(),

			transmissibilityHold = 1 - Math.exp(_this.staticMoving ? -3 : (_this.dynamicDampingFactor * -6)),
			transmissibilityRelease = 1 - Math.exp(-_this.dynamicDampingFactor);

		return function rotateCamera() {

			d.subVectors( _inputLastPos, _inputStartPos );

			if (  d.length() > EPS ) {
				var angle = d.length(); // Math.acos( _inputStartPos.dot( _inputLastPos ) / _inputStartPos.length() / _inputLastPos.length() ) *10;

				_eye.copy( _this.object.position ).sub( _this.target );

				side.crossVectors( _this.object.up, _eye ).setLength( d.x );
				up.copy( _this.object.up ).setLength( d.y );
				axis.crossVectors( up.add( side ), _eye ).normalize();				

				quaternion.setFromAxisAngle( axis, angle*2 );

				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

				d.multiplyScalar( (!_this.staticMoving && _state == STATE.NONE) ? transmissibilityRelease : transmissibilityHold );

				_inputStartPos.add(d);
			}
		};

	}() );


	this.zoomCamera = function () {

		var factor;

		if ( _state === STATE.TOUCH_ZOOM_PAN ) {

			factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
			_touchZoomDistanceStart = _touchZoomDistanceEnd;
			_eye.multiplyScalar( factor );

		} else {

			factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;

			if ( factor !== 1.0 && factor > 0.0 ) {

				_eye.multiplyScalar( factor );

				if ( _this.staticMoving ) {

					_zoomStart.copy( _zoomEnd );

				} else {

					_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

				}

			}

		}

	};

	this.panCamera = ( function() {

		var mouseChange = new THREE.Vector2(),
			objectUp = new THREE.Vector3(),
			pan = new THREE.Vector3();

		return function panCamera() {

			mouseChange.copy( _panEnd ).sub( _panStart );

			if ( mouseChange.lengthSq() ) {

				mouseChange.multiplyScalar( _eye.length() * _this.panSpeed );

				pan.copy( _eye ).cross( _this.object.up ).setLength( mouseChange.x );
				pan.add( objectUp.copy( _this.object.up ).setLength( mouseChange.y ) );

				_this.object.position.add( pan );
				_this.target.add( pan );

				// always pan static
				_panStart.copy( _panEnd );

			}

		};

	}() );

	this.checkDistances = function () {

		if ( ! _this.noZoom || ! _this.noPan ) {

			if ( _eye.lengthSq() > _this.maxDistance * _this.maxDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );
				_zoomStart.copy( _zoomEnd );

			}

			if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );
				_zoomStart.copy( _zoomEnd );

			}

		}

	};

	this.update = function () {

		_eye.subVectors( _this.object.position, _this.target );

		if ( ! _this.noRotate ) {

			_this.rotateCamera();

		}

		if ( ! _this.noZoom ) {

			_this.zoomCamera();

		}

		if ( ! _this.noPan ) {

			_this.panCamera();

		}

		_this.object.position.addVectors( _this.target, _eye );

		_this.checkDistances();

		_this.object.lookAt( _this.target );

		if ( lastPosition.distanceToSquared( _this.object.position ) > EPS ) {

			lastPosition.copy( _this.object.position );

		}

	};

	this.reset = function () {

		_state = STATE.NONE;
		_prevState = STATE.NONE;

		_this.target.copy( _this.target0 );
		_this.object.position.copy( _this.position0 );
		_this.object.up.copy( _this.up0 );

		_eye.subVectors( _this.object.position, _this.target );

		_this.object.lookAt( _this.target );

		lastPosition.copy( _this.object.position );

	};

	// listeners

	function keydown( event ) {

		if ( _this.enabled === false ) return;

		window.removeEventListener( 'keydown', keydown );

		_prevState = _state;

		if ( _state !== STATE.NONE ) {

			return;

		} else if ( event.keyCode === _this.keys[ STATE.ROTATE ] && ! _this.noRotate ) {

			_state = STATE.ROTATE;

		} else if ( event.keyCode === _this.keys[ STATE.ZOOM ] && ! _this.noZoom ) {

			_state = STATE.ZOOM;

		} else if ( event.keyCode === _this.keys[ STATE.PAN ] && ! _this.noPan ) {

			_state = STATE.PAN;

		}

	}

	function keyup( event ) {

		if ( _this.enabled === false ) return;

		_state = _prevState;

		window.addEventListener( 'keydown', keydown, false );

	}

	function mousedown( event ) {

		if ( _this.enabled === false ) return;

		if ( _state === STATE.NONE ) {

			_state = event.button;

		}

		if ( _state === STATE.ROTATE && ! _this.noRotate ) {

			_inputLastPos.copy ( getMouseOnCircle( event.pageX, event.pageY ) );
			_inputStartPos.copy( _inputLastPos );

		} else if ( _state === STATE.ZOOM && ! _this.noZoom ) {

			_zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_zoomEnd.copy( _zoomStart );

		} else if ( _state === STATE.PAN && ! _this.noPan ) {

			_panStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_panEnd.copy( _panStart );

		}

		document.addEventListener( 'mousemove', mousemove, false );
		document.addEventListener( 'mouseup', mouseup, false );

	}

	function mousemove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.ROTATE && ! _this.noRotate ) {

			_inputLastPos.copy( getMouseOnCircle( event.pageX, event.pageY ) );	

		} else if ( _state === STATE.ZOOM && ! _this.noZoom ) {

			_zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		} else if ( _state === STATE.PAN && ! _this.noPan ) {

			_panEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		}

	}

	function mouseup( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		_state = STATE.NONE;	

		document.removeEventListener( 'mousemove', mousemove );
		document.removeEventListener( 'mouseup', mouseup );

	}

	function mousewheel( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta ) {

			// WebKit / Opera / Explorer 9

			delta = event.wheelDelta / 40;

		} else if ( event.detail ) {

			// Firefox

			delta = - event.detail / 3;

		}

		_zoomStart.y += delta * 0.01;

	}

	function touchstart( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				_state = STATE.TOUCH_ROTATE;
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_movePrev.copy( _moveCurr );
				break;

			case 2:
				_state = STATE.TOUCH_ZOOM_PAN;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panStart.copy( getMouseOnScreen( x, y ) );
				_panEnd.copy( _panStart );
				break;

			default:
				_state = STATE.NONE;

		}

	}

	function touchmove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1:
				_moveCurr.copy( getMouseOnCircle(  event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;

			case 2:
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				break;

			default:
				_state = STATE.NONE;

		}

	}

	function touchend( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				var pos = getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				//_inputLastPos.copy(  );
				
				break;

			case 2:
				_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				_panStart.copy( _panEnd );
				break;

		}

		_state = STATE.NONE;

	}

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function() {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', mousedown, false );
		this.domElement.removeEventListener( 'mousewheel', mousewheel, false );
		this.domElement.removeEventListener( 'MozMousePixelScroll', mousewheel, false ); // firefox

		this.domElement.removeEventListener( 'touchstart', touchstart, false );
		this.domElement.removeEventListener( 'touchend', touchend, false );
		this.domElement.removeEventListener( 'touchmove', touchmove, false );

		document.removeEventListener( 'mousemove', mousemove, false );
		document.removeEventListener( 'mouseup', mouseup, false );

		window.removeEventListener( 'keydown', keydown, false );
		window.removeEventListener( 'keyup', keyup, false );

	}

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	this.domElement.addEventListener( 'mousedown', mousedown, false );
	this.domElement.addEventListener( 'mousewheel', mousewheel, false );
	this.domElement.addEventListener( 'MozMousePixelScroll', mousewheel, false ); // firefox

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

	window.addEventListener( 'keydown', keydown, false );
	window.addEventListener( 'keyup', keyup, false );

	this.handleResize();

	// force an update at start
	this.update();
}