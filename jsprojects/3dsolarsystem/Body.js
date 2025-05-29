/**
 * name     name of the body
 * radius   radius of the body x1000km
 * dist     distance from the body to the sun x10^6km
 * angle    angle around the orbit in radians
 * mass     mass of the body in 10^21kg
 * emit     boolean, whether this body emits its own light
 * color    color of the body in hexadecimal
 */
class Body {
    constructor(name, radius, dist, angle, mass, vel, texture, bodyPoints, axis, ownangle) {
        // distance to sun multiplier
        let dm = 3;

        this.name = name;
        this.mass = mass;
        this.velx = vel[0];
        this.vely = vel[1];
        this.velz = vel[2];
        
        this.axis = axis;
        this.ownangle = ownangle;

        this.body = create_body(radius, texture, axis, ownangle);
        this.body.position.x = dm * dist * Math.cos(angle);
        this.body.position.z = dm * dist * Math.sin(angle);
        this.bodyPoints = bodyPoints;
    }
}