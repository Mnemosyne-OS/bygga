import{P as Jc}from"./index-B-QJXoqT.js";const $a="186",Qc=0,Co=1,jc=2,qs=1,th=2,Yi=3,ai=0,Be=1,Ln=2,Un=0,Ji=1,Po=2,Lo=3,Do=4,eh=5,Di=100,nh=101,ih=102,sh=103,rh=104,ah=200,oh=201,lh=202,ch=203,Yl=204,Zl=205,hh=206,uh=207,fh=208,dh=209,ph=210,mh=211,gh=212,_h=213,xh=214,ea=0,na=1,ia=2,ns=3,sa=4,ra=5,aa=6,oa=7,Kl=0,vh=1,Sh=2,Mn=0,Jl=1,Ql=2,jl=3,tc=4,ec=5,nc=6,ic=7,sc=300,oi=301,Bi=302,pr=303,mr=304,lr=306,la=1e3,Dn=1001,ca=1002,Ce=1003,Mh=1004,ps=1005,Ue=1006,gr=1007,ii=1008,Je=1009,rc=1010,ac=1011,is=1012,Ya=1013,En=1014,xn=1015,bn=1016,Za=1017,Ka=1018,ss=1020,oc=35902,lc=35899,cc=1021,hc=1022,cn=1023,Nn=1026,si=1027,uc=1028,Ja=1029,li=1030,Qa=1031,ja=1033,$s=33776,Ys=33777,Zs=33778,Ks=33779,ha=35840,ua=35841,fa=35842,da=35843,pa=36196,ma=37492,ga=37496,_a=37488,xa=37489,Qs=37490,va=37491,Sa=37808,Ma=37809,ya=37810,Ea=37811,ba=37812,wa=37813,Ta=37814,Aa=37815,Ra=37816,Ca=37817,Pa=37818,La=37819,Da=37820,Ua=37821,Ia=36492,Na=36494,Fa=36495,Oa=36283,Ba=36284,js=36285,za=36286,yh=3200,Uo=0,Eh=1,Xn="",Ke="srgb",tr="srgb-linear",er="linear",oe="srgb",_r=7680,bh=519,wh=512,Th=513,Ah=514,to=515,Rh=516,Ch=517,eo=518,Ph=519,fc=35044,Io="300 es",vn=2e3,nr=2001;function Lh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Dh(){const i=ir("canvas");return i.style.display="block",i}const No={};function sr(...i){const t="THREE."+i.shift();console.log(t,...i)}function dc(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ht(...i){i=dc(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function te(...i){i=dc(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ni(...i){const t=i.join(" ");t in No||(No[t]=!0,Ht(...i))}function Uh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ih={[ea]:na,[ia]:aa,[sa]:oa,[ns]:ra,[na]:ea,[aa]:ia,[oa]:sa,[ra]:ns};class hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fo=1234567;const Fi=Math.PI/180,rs=180/Math.PI;function yn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function kt(i,t,e){return Math.max(t,Math.min(e,i))}function no(i,t){return(i%t+t)%t}function Nh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Fh(i,t,e){return i!==t?(e-i)/(t-i):0}function Qi(i,t,e){return(1-e)*i+e*t}function Oh(i,t,e,n){return Qi(i,t,1-Math.exp(-e*n))}function Bh(i,t=1){return t-Math.abs(no(i,t*2)-t)}function zh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Hh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Gh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Vh(i,t){return i+Math.random()*(t-i)}function kh(i){return i*(.5-Math.random())}function Wh(i){i!==void 0&&(Fo=i);let t=Fo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xh(i){return i*Fi}function qh(i){return i*rs}function $h(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Yh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Zh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Kh(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*u,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*p,o*l);break;case"YXY":i.set(c*p,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*p,o*h,o*l);break;default:Ht("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function on(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function le(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Jh={DEG2RAD:Fi,RAD2DEG:rs,generateUUID:yn,clamp:kt,euclideanModulo:no,mapLinear:Nh,inverseLerp:Fh,lerp:Qi,damp:Oh,pingpong:Bh,smoothstep:zh,smootherstep:Hh,randInt:Gh,randFloat:Vh,randFloatSpread:kh,seededRandom:Wh,degToRad:Xh,radToDeg:qh,isPowerOfTwo:$h,ceilPowerOfTwo:Yh,floorPowerOfTwo:Zh,setQuaternionFromProperEuler:Kh,normalize:le,denormalize:on},po=class po{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};po.prototype.isVector2=!0;let mt=po;class je{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(u!==v||c!==f||l!==p||h!==g){let m=c*f+l*p+h*g+u*v;m<0&&(f=-f,p=-p,g=-g,v=-v,m=-m);let d=1-o;if(m<.9995){const b=Math.acos(m),A=Math.sin(b);d=Math.sin(d*b)/A,o=Math.sin(o*b)/A,c=c*d+f*o,l=l*d+p*o,h=h*d+g*o,u=u*d+v*o}else{c=c*d+f*o,l=l*d+p*o,h=h*d+g*o,u=u*d+v*o;const b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+c*p-l*f,t[e+1]=c*g+h*f+l*u-o*p,t[e+2]=l*g+h*p+o*f-c*u,t[e+3]=h*g-o*u-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"YZX":this._x=f*h*u+l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u-f*p*g;break;case"XZY":this._x=f*h*u-l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u+f*p*g;break;default:Ht("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const mo=class mo{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Oo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Oo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xr.copy(this).projectOnVector(t),this.sub(xr)}reflect(t){return this.sub(xr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};mo.prototype.isVector3=!0;let R=mo;const xr=new R,Oo=new je,go=class go{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],v=s[0],m=s[3],d=s[6],b=s[1],A=s[4],S=s[7],y=s[2],E=s[5],C=s[8];return r[0]=a*v+o*b+c*y,r[3]=a*m+o*A+c*E,r[6]=a*d+o*S+c*C,r[1]=l*v+h*b+u*y,r[4]=l*m+h*A+u*E,r[7]=l*d+h*S+u*C,r[2]=f*v+p*b+g*y,r[5]=f*m+p*A+g*E,r[8]=f*d+p*S+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*r,p=l*r-a*c,g=e*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-o*e)*v,t[6]=p*v,t[7]=(n*c-l*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Ni("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(vr.makeScale(t,e)),this}rotate(t){return Ni("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(vr.makeRotation(-t)),this}translate(t,e){return Ni("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(vr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};go.prototype.isMatrix3=!0;let Vt=go;const vr=new Vt,Bo=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zo=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Qh(){const i={enabled:!0,workingColorSpace:tr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===oe&&(s.r=In(s.r),s.g=In(s.g),s.b=In(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===oe&&(s.r=Oi(s.r),s.g=Oi(s.g),s.b=Oi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xn?er:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ni("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ni("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[tr]:{primaries:t,whitePoint:n,transfer:er,toXYZ:Bo,fromXYZ:zo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:t,whitePoint:n,transfer:oe,toXYZ:Bo,fromXYZ:zo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),i}const jt=Qh();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Oi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let di;class jh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{di===void 0&&(di=ir("canvas")),di.width=t.width,di.height=t.height;const s=di.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=di}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ir("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=In(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return Ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let tu=0;class io{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=yn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Sr(s[a].image)):r.push(Sr(s[a]))}else r=Sr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Sr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?jh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ht("Texture: Unable to serialize Texture."),{})}let eu=0;const Mr=new R;class Ie extends hi{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=Dn,s=Dn,r=Ue,a=ii,o=cn,c=Je,l=Ie.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=yn(),this.name="",this.source=new io(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mr).x}get height(){return this.source.getSize(Mr).y}get depth(){return this.source.getSize(Mr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ht(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ht(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case la:t.x=t.x-Math.floor(t.x);break;case Dn:t.x=t.x<0?0:1;break;case ca:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case la:t.y=t.y-Math.floor(t.y);break;case Dn:t.y=t.y<0?0:1;break;case ca:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=sc;Ie.DEFAULT_ANISOTROPY=1;const _o=class _o{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],g=c[9],v=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(l+1)/2,S=(p+1)/2,y=(d+1)/2,E=(h+f)/4,C=(u+v)/4,x=(g+m)/4;return A>S&&A>y?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=E/n,r=C/n):S>y?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=E/s,r=x/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=C/r,s=x/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-v)/b,this.z=(f-h)/b,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_o.prototype.isVector4=!0;let ue=_o;class nu extends hi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ue,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new Ie(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Ue,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new io(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hn extends nu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class pc extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class iu extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const or=class or{constructor(t,e,n,s,r,a,o,c,l,h,u,f,p,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,f,p,g,v,m)}set(t,e,n,s,r,a,o,c,l,h,u,f,p,g,v,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new or().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/pi.setFromMatrixColumn(t,0).length(),r=1/pi.setFromMatrixColumn(t,1).length(),a=1/pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,p=a*u,g=o*h,v=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+g*l,e[5]=f-v*l,e[9]=-o*c,e[2]=v-f*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*h,p=c*u,g=l*h,v=l*u;e[0]=f+v*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=v+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*h,p=c*u,g=l*h,v=l*u;e[0]=f-v*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=v-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*h,p=a*u,g=o*h,v=o*u;e[0]=c*h,e[4]=g*l-p,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,p=a*l,g=o*c,v=o*l;e[0]=c*h,e[4]=v-f*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=p*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=a*c,p=a*l,g=o*c,v=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(su,t,ru)}lookAt(t,e,n){const s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),zn.crossVectors(n,Ve),zn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),zn.crossVectors(n,Ve)),zn.normalize(),ms.crossVectors(Ve,zn),s[0]=zn.x,s[4]=ms.x,s[8]=Ve.x,s[1]=zn.y,s[5]=ms.y,s[9]=Ve.y,s[2]=zn.z,s[6]=ms.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],d=n[14],b=n[3],A=n[7],S=n[11],y=n[15],E=s[0],C=s[4],x=s[8],w=s[12],P=s[1],U=s[5],F=s[9],z=s[13],D=s[2],B=s[6],X=s[10],W=s[14],Q=s[3],H=s[7],Y=s[11],J=s[15];return r[0]=a*E+o*P+c*D+l*Q,r[4]=a*C+o*U+c*B+l*H,r[8]=a*x+o*F+c*X+l*Y,r[12]=a*w+o*z+c*W+l*J,r[1]=h*E+u*P+f*D+p*Q,r[5]=h*C+u*U+f*B+p*H,r[9]=h*x+u*F+f*X+p*Y,r[13]=h*w+u*z+f*W+p*J,r[2]=g*E+v*P+m*D+d*Q,r[6]=g*C+v*U+m*B+d*H,r[10]=g*x+v*F+m*X+d*Y,r[14]=g*w+v*z+m*W+d*J,r[3]=b*E+A*P+S*D+y*Q,r[7]=b*C+A*U+S*B+y*H,r[11]=b*x+A*F+S*X+y*Y,r[15]=b*w+A*z+S*W+y*J,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],v=t[7],m=t[11],d=t[15],b=c*p-l*f,A=o*p-l*u,S=o*f-c*u,y=a*p-l*h,E=a*f-c*h,C=a*u-o*h;return e*(v*b-m*A+d*S)-n*(g*b-m*y+d*E)+s*(g*A-v*y+d*C)-r*(g*S-v*E+m*C)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],v=t[13],m=t[14],d=t[15],b=e*o-n*a,A=e*c-s*a,S=e*l-r*a,y=n*c-s*o,E=n*l-r*o,C=s*l-r*c,x=h*v-u*g,w=h*m-f*g,P=h*d-p*g,U=u*m-f*v,F=u*d-p*v,z=f*d-p*m,D=b*z-A*F+S*U+y*P-E*w+C*x;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/D;return t[0]=(o*z-c*F+l*U)*B,t[1]=(s*F-n*z-r*U)*B,t[2]=(v*C-m*E+d*y)*B,t[3]=(f*E-u*C-p*y)*B,t[4]=(c*P-a*z-l*w)*B,t[5]=(e*z-s*P+r*w)*B,t[6]=(m*S-g*C-d*A)*B,t[7]=(h*C-f*S+p*A)*B,t[8]=(a*F-o*P+l*x)*B,t[9]=(n*P-e*F-r*x)*B,t[10]=(g*E-v*S+d*b)*B,t[11]=(u*S-h*E-p*b)*B,t[12]=(o*w-a*U-c*x)*B,t[13]=(e*U-n*w+s*x)*B,t[14]=(v*A-g*y-m*b)*B,t[15]=(h*y-u*A+f*b)*B,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,f=r*l,p=r*h,g=r*u,v=a*h,m=a*u,d=o*u,b=c*l,A=c*h,S=c*u,y=n.x,E=n.y,C=n.z;return s[0]=(1-(v+d))*y,s[1]=(p+S)*y,s[2]=(g-A)*y,s[3]=0,s[4]=(p-S)*E,s[5]=(1-(f+d))*E,s[6]=(m+b)*E,s[7]=0,s[8]=(g+A)*C,s[9]=(m-b)*C,s[10]=(1-(f+v))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=pi.set(s[0],s[1],s[2]).length();const o=pi.set(s[4],s[5],s[6]).length(),c=pi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),nn.copy(this);const l=1/a,h=1/o,u=1/c;return nn.elements[0]*=l,nn.elements[1]*=l,nn.elements[2]*=l,nn.elements[4]*=h,nn.elements[5]*=h,nn.elements[6]*=h,nn.elements[8]*=u,nn.elements[9]*=u,nn.elements[10]*=u,e.setFromRotationMatrix(nn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=vn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),p=(n+s)/(n-s);let g,v;if(c)g=r/(a-r),v=a*r/(a-r);else if(o===vn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===nr)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=vn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),p=-(n+s)/(n-s);let g,v;if(c)g=1/(a-r),v=a/(a-r);else if(o===vn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===nr)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};or.prototype.isMatrix4=!0;let ge=or;const pi=new R,nn=new ge,su=new R(0,0,0),ru=new R(1,1,1),zn=new R,ms=new R,Ve=new R,Ho=new ge,Go=new je;class $n{constructor(t=0,e=0,n=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ho.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ho,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Go.setFromEuler(this),this.setFromQuaternion(Go,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class so{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let au=0;const Vo=new R,mi=new je,Tn=new ge,gs=new R,Vi=new R,ou=new R,lu=new je,ko=new R(1,0,0),Wo=new R(0,1,0),Xo=new R(0,0,1),qo={type:"added"},cu={type:"removed"},gi={type:"childadded",child:null},yr={type:"childremoved",child:null};class We extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=We.DEFAULT_UP.clone();const t=new R,e=new $n,n=new je,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new Vt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=We.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new so,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.multiply(mi),this}rotateOnWorldAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.premultiply(mi),this}rotateX(t){return this.rotateOnAxis(ko,t)}rotateY(t){return this.rotateOnAxis(Wo,t)}rotateZ(t){return this.rotateOnAxis(Xo,t)}translateOnAxis(t,e){return Vo.copy(t).applyQuaternion(this.quaternion),this.position.add(Vo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ko,t)}translateY(t){return this.translateOnAxis(Wo,t)}translateZ(t){return this.translateOnAxis(Xo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?gs.copy(t):gs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(Vi,gs,this.up):Tn.lookAt(gs,Vi,this.up),this.quaternion.setFromRotationMatrix(Tn),s&&(Tn.extractRotation(s.matrixWorld),mi.setFromRotationMatrix(Tn),this.quaternion.premultiply(mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(te("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(qo),gi.child=t,this.dispatchEvent(gi),gi.child=null):te("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cu),yr.child=t,this.dispatchEvent(yr),yr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Tn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Tn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(qo),gi.child=t,this.dispatchEvent(gi),gi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,t,ou),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,lu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}We.DEFAULT_UP=new R(0,1,0);We.DEFAULT_MATRIX_AUTO_UPDATE=!0;We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ln extends We{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hu={type:"move"};class Er{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),d=this._getHandJoint(l,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(hu)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ln;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},_s={h:0,s:0,l:0};function br(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=jt.workingColorSpace){if(t=no(t,1),e=kt(e,0,1),n=kt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=br(a,r,t+1/3),this.g=br(a,r,t),this.b=br(a,r,t-1/3)}return jt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ke){function n(r){r!==void 0&&parseFloat(r)<1&&Ht("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ht("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ht("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){const n=mc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ht("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return jt.workingToColorSpace(De.copy(this),t),Math.round(kt(De.r*255,0,255))*65536+Math.round(kt(De.g*255,0,255))*256+Math.round(kt(De.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(De.copy(this),e);const n=De.r,s=De.g,r=De.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Ke){jt.workingToColorSpace(De.copy(this),t);const e=De.r,n=De.g,s=De.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Hn),this.setHSL(Hn.h+t,Hn.s+e,Hn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Hn),t.getHSL(_s);const n=Qi(Hn.h,_s.h,e),s=Qi(Hn.s,_s.s,e),r=Qi(Hn.l,_s.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new Xt;Xt.NAMES=mc;class uu extends We{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const sn=new R,An=new R,wr=new R,Rn=new R,_i=new R,xi=new R,$o=new R,Tr=new R,Ar=new R,Rr=new R,Cr=new ue,Pr=new ue,Lr=new ue;class Qe{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),sn.subVectors(t,e),s.cross(sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){sn.subVectors(s,e),An.subVectors(n,e),wr.subVectors(t,e);const a=sn.dot(sn),o=sn.dot(An),c=sn.dot(wr),l=An.dot(An),h=An.dot(wr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Rn)===null?!1:Rn.x>=0&&Rn.y>=0&&Rn.x+Rn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Rn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Rn.x),c.addScaledVector(a,Rn.y),c.addScaledVector(o,Rn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Cr.setScalar(0),Pr.setScalar(0),Lr.setScalar(0),Cr.fromBufferAttribute(t,e),Pr.fromBufferAttribute(t,n),Lr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Cr,r.x),a.addScaledVector(Pr,r.y),a.addScaledVector(Lr,r.z),a}static isFrontFacing(t,e,n,s){return sn.subVectors(n,e),An.subVectors(t,e),sn.cross(An).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return sn.subVectors(this.c,this.b),An.subVectors(this.a,this.b),sn.cross(An).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;_i.subVectors(s,n),xi.subVectors(r,n),Tr.subVectors(t,n);const c=_i.dot(Tr),l=xi.dot(Tr);if(c<=0&&l<=0)return e.copy(n);Ar.subVectors(t,s);const h=_i.dot(Ar),u=xi.dot(Ar);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(_i,a);Rr.subVectors(t,r);const p=_i.dot(Rr),g=xi.dot(Rr);if(g>=0&&p<=g)return e.copy(r);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(xi,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return $o.subVectors(r,s),o=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector($o,o);const d=1/(m+v+f);return a=v*d,o=f*d,e.copy(n).addScaledVector(_i,a).addScaledVector(xi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class tn{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,rn):rn.fromBufferAttribute(r,a),rn.applyMatrix4(t.matrixWorld),this.expandByPoint(rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xs.copy(n.boundingBox)),xs.applyMatrix4(t.matrixWorld),this.union(xs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,rn),rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ki),vs.subVectors(this.max,ki),vi.subVectors(t.a,ki),Si.subVectors(t.b,ki),Mi.subVectors(t.c,ki),Gn.subVectors(Si,vi),Vn.subVectors(Mi,Si),Zn.subVectors(vi,Mi);let e=[0,-Gn.z,Gn.y,0,-Vn.z,Vn.y,0,-Zn.z,Zn.y,Gn.z,0,-Gn.x,Vn.z,0,-Vn.x,Zn.z,0,-Zn.x,-Gn.y,Gn.x,0,-Vn.y,Vn.x,0,-Zn.y,Zn.x,0];return!Dr(e,vi,Si,Mi,vs)||(e=[1,0,0,0,1,0,0,0,1],!Dr(e,vi,Si,Mi,vs))?!1:(Ss.crossVectors(Gn,Vn),e=[Ss.x,Ss.y,Ss.z],Dr(e,vi,Si,Mi,vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Cn=[new R,new R,new R,new R,new R,new R,new R,new R],rn=new R,xs=new tn,vi=new R,Si=new R,Mi=new R,Gn=new R,Vn=new R,Zn=new R,ki=new R,vs=new R,Ss=new R,Kn=new R;function Dr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Kn.fromArray(i,r);const o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),c=t.dot(Kn),l=e.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const ye=new R,Ms=new mt;let fu=0;class Xe extends hi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fc,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ms.fromBufferAttribute(this,e),Ms.applyMatrix3(t),this.setXY(e,Ms.x,Ms.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=on(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=on(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=on(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=on(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=on(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class gc extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class _c extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Se extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}const du=new tn,Wi=new R,Ur=new R;class hs{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):du.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Wi.subVectors(t,this.center);const e=Wi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Wi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ur.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Wi.copy(t.center).add(Ur)),this.expandByPoint(Wi.copy(t.center).sub(Ur))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let pu=0;const Ze=new ge,Ir=new We,yi=new R,ke=new tn,Xi=new tn,we=new R;class ze extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Lh(t)?_c:gc)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return Ir.lookAt(t),Ir.updateMatrix(),this.applyMatrix4(Ir.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Se(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];ke.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&te('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(ke.min,Xi.min),ke.expandByPoint(we),we.addVectors(ke.max,Xi.max),ke.expandByPoint(we)):(ke.expandByPoint(Xi.min),ke.expandByPoint(Xi.max))}ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)we.fromBufferAttribute(o,l),c&&(yi.fromBufferAttribute(t,l),we.add(yi)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&te('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){te("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Xe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new R,c[x]=new R;const l=new R,h=new R,u=new R,f=new mt,p=new mt,g=new mt,v=new R,m=new R;function d(x,w,P){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,P),f.fromBufferAttribute(r,x),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,P),h.sub(l),u.sub(l),p.sub(f),g.sub(f);const U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(U),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(U),o[x].add(v),o[w].add(v),o[P].add(v),c[x].add(m),c[w].add(m),c[P].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let x=0,w=b.length;x<w;++x){const P=b[x],U=P.start,F=P.count;for(let z=U,D=U+F;z<D;z+=3)d(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const A=new R,S=new R,y=new R,E=new R;function C(x){y.fromBufferAttribute(s,x),E.copy(y);const w=o[x];A.copy(w),A.sub(y.multiplyScalar(y.dot(w))).normalize(),S.crossVectors(E,w);const U=S.dot(c[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,U)}for(let x=0,w=b.length;x<w;++x){const P=b[x],U=P.start,F=P.count;for(let z=U,D=U+F;z<D;z+=3)C(t.getX(z+0)),C(t.getX(z+1)),C(t.getX(z+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new R,r=new R,a=new R,o=new R,c=new R,l=new R,h=new R,u=new R;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*h;for(let d=0;d<h;d++)f[g++]=l[p++]}return new Xe(f,h,u)}if(this.index===null)return Ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ze,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const f=l[h],p=t(f,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mu{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=fc,this.updateRanges=[],this.version=0,this.uuid=yn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const Fe=new R;class qn{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=on(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=on(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=on(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=on(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=on(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){sr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Xe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new qn(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){sr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Nr=new R,gu=new R,_u=new Vt;class Wn{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Nr.subVectors(n,e).cross(gu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Nr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||_u.getNormalMatrix(t),s=this.coplanarPoint(Nr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let xu=0;class cr extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=yn(),this.name="",this.type="Material",this.blending=Ji,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yl,this.blendDst=Zl,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_r,this.stencilZFail=_r,this.stencilZPass=_r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ht(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ht(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Xt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Wn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new mt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new mt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Pn=new R,Fr=new R,ys=new R,Es=new R;class xc{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Fr.copy(t).add(e).multiplyScalar(.5),ys.copy(e).sub(t).normalize(),Es.copy(this.origin).sub(Fr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ys),o=Es.dot(this.direction),c=-Es.dot(ys),l=Es.lengthSq(),h=Math.abs(1-a*a);let u,f,p,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,p=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Fr).addScaledVector(ys,f),p}intersectSphere(t,e){if(t.radius<0)return null;Pn.subVectors(t.center,this.origin);const n=Pn.dot(this.direction),s=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,u=t.x-a.x,f=t.y-a.y,p=t.z-a.z,g=e.x-a.x,v=e.y-a.y,m=e.z-a.z,d=n.x-a.x,b=n.y-a.y,A=n.z-a.z,S=Math.abs(c),y=Math.abs(l),E=Math.abs(h);let C,x,w,P,U,F,z,D,B,X,W,Q;if(S>=y&&S>=E?(w=c,F=u,B=g,Q=d,c>=0?(C=l,x=h,P=f,U=p,z=v,D=m,X=b,W=A):(C=h,x=l,P=p,U=f,z=m,D=v,X=A,W=b)):y>=E?(w=l,F=f,B=v,Q=b,l>=0?(C=h,x=c,P=p,U=u,z=m,D=g,X=A,W=d):(C=c,x=h,P=u,U=p,z=g,D=m,X=d,W=A)):(w=h,F=p,B=m,Q=A,h>=0?(C=c,x=l,P=u,U=f,z=g,D=v,X=d,W=b):(C=l,x=c,P=f,U=u,z=v,D=g,X=b,W=d)),w===0)return null;const H=C/w,Y=x/w,J=1/w,wt=P-H*F,Mt=U-Y*F,Zt=z-H*B,qt=D-Y*B,Kt=X-H*Q,K=W-Y*Q,et=Kt*qt-K*Zt,_t=wt*K-Mt*Kt,Ot=Zt*Mt-qt*wt;if(s){if(et<0||_t<0||Ot<0)return null}else if((et<0||_t<0||Ot<0)&&(et>0||_t>0||Ot>0))return null;const yt=et+_t+Ot;if(yt===0)return null;const Bt=J*(et*F+_t*B+Ot*Q);return(yt>0?Bt<0:Bt>0)?null:this.at(Bt/yt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ro extends cr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Yo=new ge,Jn=new xc,bs=new hs,Zo=new R,ws=new R,Ts=new R,As=new R,Or=new R,Rs=new R,Ko=new R,Cs=new R;class qe extends We{constructor(t=new ze,e=new ro){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Rs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Or.fromBufferAttribute(u,t),a?Rs.addScaledVector(Or,h):Rs.addScaledVector(Or.sub(e),h))}e.add(Rs)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(r),Jn.copy(t.ray).recast(t.near),!(bs.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(bs,Zo)===null||Jn.origin.distanceToSquared(Zo)>(t.far-t.near)**2))&&(Yo.copy(r).invert(),Jn.copy(t.ray).applyMatrix4(Yo),!(n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Jn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=b,y=A;S<y;S+=3){const E=o.getX(S),C=o.getX(S+1),x=o.getX(S+2);s=Ps(this,d,t,n,l,h,u,E,C,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const b=o.getX(m),A=o.getX(m+1),S=o.getX(m+2);s=Ps(this,a,t,n,l,h,u,b,A,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),A=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=b,y=A;S<y;S+=3){const E=S,C=S+1,x=S+2;s=Ps(this,d,t,n,l,h,u,E,C,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const b=m,A=m+1,S=m+2;s=Ps(this,a,t,n,l,h,u,b,A,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function vu(i,t,e,n,s,r,a,o){let c;if(t.side===Be?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===ai,o),c===null)return null;Cs.copy(o),Cs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Cs);return l<e.near||l>e.far?null:{distance:l,point:Cs.clone(),object:i}}function Ps(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,ws),i.getVertexPosition(c,Ts),i.getVertexPosition(l,As);const h=vu(i,t,e,n,ws,Ts,As,Ko);if(h){const u=new R;Qe.getBarycoord(Ko,ws,Ts,As,u),s&&(h.uv=Qe.getInterpolatedAttribute(s,o,c,l,u,new mt)),r&&(h.uv1=Qe.getInterpolatedAttribute(r,o,c,l,u,new mt)),a&&(h.normal=Qe.getInterpolatedAttribute(a,o,c,l,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new R,materialIndex:0};Qe.getNormal(ws,Ts,As,f.normal),h.face=f,h.barycoord=u}return h}class Su extends Ie{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Ce,h=Ce,u,f){super(null,a,o,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qn=new hs,Mu=new mt(.5,.5),Ls=new R;class vc{constructor(t=new Wn,e=new Wn,n=new Wn,s=new Wn,r=new Wn,a=new Wn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],p=r[7],g=r[8],v=r[9],m=r[10],d=r[11],b=r[12],A=r[13],S=r[14],y=r[15];if(s[0].setComponents(l-a,p-h,d-g,y-b).normalize(),s[1].setComponents(l+a,p+h,d+g,y+b).normalize(),s[2].setComponents(l+o,p+u,d+v,y+A).normalize(),s[3].setComponents(l-o,p-u,d-v,y-A).normalize(),n)s[4].setComponents(c,f,m,S).normalize(),s[5].setComponents(l-c,p-f,d-m,y-S).normalize();else if(s[4].setComponents(l-c,p-f,d-m,y-S).normalize(),e===vn)s[5].setComponents(l+c,p+f,d+m,y+S).normalize();else if(e===nr)s[5].setComponents(c,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(t){Qn.center.set(0,0,0);const e=Mu.distanceTo(t.center);return Qn.radius=.7071067811865476+e,Qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ls.x=s.normal.x>0?t.max.x:t.min.x,Ls.y=s.normal.y>0?t.max.y:t.min.y,Ls.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ls)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Sc extends Ie{constructor(t=[],e=oi,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class yu extends Ie{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class as extends Ie{constructor(t,e,n=En,s,r,a,o=Ce,c=Ce,l,h=Nn,u=1){if(h!==Nn&&h!==si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new io(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Eu extends as{constructor(t,e=En,n=oi,s,r,a=Ce,o=Ce,c,l=Nn){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Mc extends Ie{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class me extends ze{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(h,3)),this.setAttribute("uv",new Se(u,2));function g(v,m,d,b,A,S,y,E,C,x,w){const P=S/C,U=y/x,F=S/2,z=y/2,D=E/2,B=C+1,X=x+1;let W=0,Q=0;const H=new R;for(let Y=0;Y<X;Y++){const J=Y*U-z;for(let wt=0;wt<B;wt++){const Mt=wt*P-F;H[v]=Mt*b,H[m]=J*A,H[d]=D,l.push(H.x,H.y,H.z),H[v]=0,H[m]=0,H[d]=E>0?1:-1,h.push(H.x,H.y,H.z),u.push(wt/C),u.push(1-Y/x),W+=1}}for(let Y=0;Y<x;Y++)for(let J=0;J<C;J++){const wt=f+J+B*Y,Mt=f+J+B*(Y+1),Zt=f+(J+1)+B*(Y+1),qt=f+(J+1)+B*Y;c.push(wt,Mt,qt),c.push(Mt,Zt,qt),Q+=6}o.addGroup(p,Q,w),p+=Q,f+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new me(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Sn extends ze{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const v=[],m=n/2;let d=0;b(),a===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new Se(u,3)),this.setAttribute("normal",new Se(f,3)),this.setAttribute("uv",new Se(p,2));function b(){const S=new R,y=new R;let E=0;const C=(e-t)/n;for(let x=0;x<=r;x++){const w=[],P=x/r,U=P*(e-t)+t;for(let F=0;F<=s;F++){const z=F/s,D=z*c+o,B=Math.sin(D),X=Math.cos(D);y.x=U*B,y.y=-P*n+m,y.z=U*X,u.push(y.x,y.y,y.z),S.set(B,C,X).normalize(),f.push(S.x,S.y,S.z),p.push(z,1-P),w.push(g++)}v.push(w)}for(let x=0;x<s;x++)for(let w=0;w<r;w++){const P=v[w][x],U=v[w+1][x],F=v[w+1][x+1],z=v[w][x+1];(t>0||w!==0)&&(h.push(P,U,z),E+=3),(e>0||w!==r-1)&&(h.push(U,F,z),E+=3)}l.addGroup(d,E,0),d+=E}function A(S){const y=g,E=new mt,C=new R;let x=0;const w=S===!0?t:e,P=S===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,m*P,0),f.push(0,P,0),p.push(.5,.5),g++;const U=g;for(let F=0;F<=s;F++){const D=F/s*c+o,B=Math.cos(D),X=Math.sin(D);C.x=w*X,C.y=m*P,C.z=w*B,u.push(C.x,C.y,C.z),f.push(0,P,0),E.x=B*.5+.5,E.y=X*.5*P+.5,p.push(E.x,E.y),g++}for(let F=0;F<s;F++){const z=y+F,D=U+F;S===!0?h.push(D,D+1,z):h.push(D+1,D,z),x+=3}l.addGroup(d,x,S===!0?1:2),d+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class rr extends Sn{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new rr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const Ds=new R,Us=new R,Br=new R,Is=new Qe;class bu extends ze{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Fi*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},p=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:v,b:m,c:d}=Is;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),d.fromBufferAttribute(o,l[2]),Is.getNormal(Br),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){const A=(b+1)%3,S=u[b],y=u[A],E=Is[h[b]],C=Is[h[A]],x=`${S}_${y}`,w=`${y}_${S}`;w in f&&f[w]?(Br.dot(f[w].normal)<=r&&(p.push(E.x,E.y,E.z),p.push(C.x,C.y,C.z)),f[w]=null):x in f||(f[x]={index0:l[b],index1:l[A],normal:Br.clone()})}}for(const g in f)if(f[g]){const{index0:v,index1:m}=f[g];Ds.fromBufferAttribute(o,v),Us.fromBufferAttribute(o,m),p.push(Ds.x,Ds.y,Ds.z),p.push(Us.x,Us.y,Us.z)}this.setAttribute("position",new Se(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ht("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,p=(a-h)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new mt:new R);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new R,s=[],r=[],a=[],o=new R,c=new ge;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(kt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(kt(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ao extends wn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new mt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*h-p*u+this.aX,l=f*u+p*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class wu extends ao{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function oo(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+u)+(c-o)/u;f*=h,p*=h,s(a,o,f,p)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Jo=new R,Qo=new R,zr=new oo,Hr=new oo,Gr=new oo;class Tu extends wn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new R){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Qo.subVectors(s[0],s[1]).add(s[0]),l=Qo);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Jo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Jo),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),zr.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,v,m),Hr.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,v,m),Gr.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(zr.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Hr.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Gr.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(zr.calc(c),Hr.calc(c),Gr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new R().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function jo(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function Au(i,t){const e=1-i;return e*e*t}function Ru(i,t){return 2*(1-i)*i*t}function Cu(i,t){return i*i*t}function ji(i,t,e,n){return Au(i,t)+Ru(i,e)+Cu(i,n)}function Pu(i,t){const e=1-i;return e*e*e*t}function Lu(i,t){const e=1-i;return 3*e*e*i*t}function Du(i,t){return 3*(1-i)*i*i*t}function Uu(i,t){return i*i*i*t}function ts(i,t,e,n,s){return Pu(i,t)+Lu(i,e)+Du(i,n)+Uu(i,s)}class yc extends wn{constructor(t=new mt,e=new mt,n=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new mt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ts(t,s.x,r.x,a.x,o.x),ts(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Iu extends wn{constructor(t=new R,e=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new R){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ts(t,s.x,r.x,a.x,o.x),ts(t,s.y,r.y,a.y,o.y),ts(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ec extends wn{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nu extends wn{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class bc extends wn{constructor(t=new mt,e=new mt,n=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new mt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ji(t,s.x,r.x,a.x),ji(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fu extends wn{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ji(t,s.x,r.x,a.x),ji(t,s.y,r.y,a.y),ji(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wc extends wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(jo(o,c.x,l.x,h.x,u.x),jo(o,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new mt().fromArray(s))}return this}}var Ha=Object.freeze({__proto__:null,ArcCurve:wu,CatmullRomCurve3:Tu,CubicBezierCurve:yc,CubicBezierCurve3:Iu,EllipseCurve:ao,LineCurve:Ec,LineCurve3:Nu,QuadraticBezierCurve:bc,QuadraticBezierCurve3:Fu,SplineCurve:wc});class Ou extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ha[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Ha[s.type]().fromJSON(s))}return this}}class tl extends Ou{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ec(this.currentPoint.clone(),new mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new bc(this.currentPoint.clone(),new mt(t,e),new mt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new yc(this.currentPoint.clone(),new mt(t,e),new mt(n,s),new mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new wc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){const l=new ao(t,e,n,s,r,a,o,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Tc extends tl{constructor(t){super(t),this.uuid=yn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new tl().fromJSON(s))}return this}}function Bu(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Ac(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=ku(i,t,r,e)),i.length>80*e){o=i[0],c=i[1];let h=o,u=c;for(let f=e;f<s;f+=e){const p=i[f],g=i[f+1];p<o&&(o=p),g<c&&(c=g),p>h&&(h=p),g>u&&(u=g)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return os(r,a,e,o,c,l,0),a}function Ac(i,t,e,n,s){let r;if(s===tf(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=el(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=el(a/n|0,i[a],i[a+1],r);return r&&zi(r,r.next)&&(cs(r),r=r.next),r}function ci(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(zi(e,e.next)||_e(e.prev,e,e.next)===0)){if(cs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function os(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Yu(i,n,s,r);let o=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?Hu(i,n,s,r):zu(i)){t.push(c.i,i.i,l.i),cs(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Gu(ci(i),t),os(i,t,e,n,s,r,2)):a===2&&Vu(i,t,e,n,s,r):os(ci(i),t,e,n,s,r,1);break}}}function zu(i){const t=i.prev,e=i,n=i.next;if(_e(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=Math.min(s,r,a),u=Math.min(o,c,l),f=Math.max(s,r,a),p=Math.max(o,c,l);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=p&&Zi(s,o,r,c,a,l,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Hu(i,t,e,n){const s=i.prev,r=i,a=i.next;if(_e(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,f=a.y,p=Math.min(o,c,l),g=Math.min(h,u,f),v=Math.max(o,c,l),m=Math.max(h,u,f),d=Ga(p,g,t,e,n),b=Ga(v,m,t,e,n);let A=i.prevZ,S=i.nextZ;for(;A&&A.z>=d&&S&&S.z<=b;){if(A.x>=p&&A.x<=v&&A.y>=g&&A.y<=m&&A!==s&&A!==a&&Zi(o,h,c,u,l,f,A.x,A.y)&&_e(A.prev,A,A.next)>=0||(A=A.prevZ,S.x>=p&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&Zi(o,h,c,u,l,f,S.x,S.y)&&_e(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;A&&A.z>=d;){if(A.x>=p&&A.x<=v&&A.y>=g&&A.y<=m&&A!==s&&A!==a&&Zi(o,h,c,u,l,f,A.x,A.y)&&_e(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;S&&S.z<=b;){if(S.x>=p&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&Zi(o,h,c,u,l,f,S.x,S.y)&&_e(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Gu(i,t){let e=i;do{const n=e.prev,s=e.next.next;!zi(n,s)&&Cc(n,e,e.next,s)&&ls(n,s)&&ls(s,n)&&(t.push(n.i,e.i,s.i),cs(e),cs(e.next),e=i=s),e=e.next}while(e!==i);return ci(e)}function Vu(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ju(a,o)){let c=Pc(a,o);a=ci(a,a.next),c=ci(c,c.next),os(a,t,e,n,s,r,0),os(c,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function ku(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,c=r<a-1?t[r+1]*n:i.length,l=Ac(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Ku(l))}s.sort(Wu);for(let r=0;r<s.length;r++)e=Xu(s[r],e);return e}function Wu(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Xu(i,t){const e=qu(i,t);if(!e)return t;const n=Pc(e,i);return ci(n,n.next),ci(e,e.next)}function qu(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(zi(i,e))return e;do{if(zi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,c=a.x,l=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Rc(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);ls(e,i)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&$u(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function $u(i,t){return _e(i.prev,i,t.prev)<0&&_e(t.next,i,i.next)<0}function Yu(i,t,e,n){let s=i;do s.z===0&&(s.z=Ga(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Zu(s)}function Zu(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Ga(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Ku(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Rc(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Zi(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Rc(i,t,e,n,s,r,a,o)}function Ju(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Qu(i,t)&&(ls(i,t)&&ls(t,i)&&ju(i,t)&&(_e(i.prev,i,t.prev)||_e(i,t.prev,t))||zi(i,t)&&_e(i.prev,i,i.next)>0&&_e(t.prev,t,t.next)>0)}function _e(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function zi(i,t){return i.x===t.x&&i.y===t.y}function Cc(i,t,e,n){const s=Fs(_e(i,t,e)),r=Fs(_e(i,t,n)),a=Fs(_e(e,n,i)),o=Fs(_e(e,n,t));return!!(s!==r&&a!==o||s===0&&Ns(i,e,t)||r===0&&Ns(i,n,t)||a===0&&Ns(e,i,n)||o===0&&Ns(e,t,n))}function Ns(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Fs(i){return i>0?1:i<0?-1:0}function Qu(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Cc(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ls(i,t){return _e(i.prev,i,i.next)<0?_e(i,t,i.next)>=0&&_e(i,i.prev,t)>=0:_e(i,t,i.prev)<0||_e(i,i.next,t)<0}function ju(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Pc(i,t){const e=Va(i.i,i.x,i.y),n=Va(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function el(i,t,e,n){const s=Va(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function cs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Va(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function tf(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class ef{static triangulate(t,e,n=2){return Bu(t,e,n)}}class Ui{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Ui.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];nl(t),il(n,t);let a=t.length;e.forEach(nl);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,il(n,e[c]);const o=ef.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function nl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function il(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class lo extends ze{constructor(t=new Tc([new mt(.5,.5),new mt(-.5,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){const l=t[o];a(l)}this.setAttribute("position",new Se(s,3)),this.setAttribute("uv",new Se(r,2)),this.computeVertexNormals();function a(o){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const d=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:nf;let A,S=!1,y,E,C,x;if(d){A=d.getSpacedPoints(h),S=!0,f=!1;const nt=d.isCatmullRomCurve3?d.closed:!1;y=d.computeFrenetFrames(h,nt),E=new R,C=new R,x=new R}f||(m=0,p=0,g=0,v=0);const w=o.extractPoints(l);let P=w.shape;const U=w.holes;if(!Ui.isClockWise(P)){P=P.reverse();for(let nt=0,st=U.length;nt<st;nt++){const rt=U[nt];Ui.isClockWise(rt)&&(U[nt]=rt.reverse())}}function z(nt){const rt=10000000000000001e-36;let at=nt[0];for(let ct=1;ct<=nt.length;ct++){const Nt=ct%nt.length,It=nt[Nt],zt=It.x-at.x,Gt=It.y-at.y,L=zt*zt+Gt*Gt,ne=Math.max(Math.abs(It.x),Math.abs(It.y),Math.abs(at.x),Math.abs(at.y)),Jt=rt*ne*ne;if(L<=Jt){nt.splice(Nt,1),ct--;continue}at=It}}z(P),U.forEach(z);const D=U.length,B=P;for(let nt=0;nt<D;nt++){const st=U[nt];P=P.concat(st)}function X(nt,st,rt){return st||te("ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(st,rt)}const W=P.length;function Q(nt,st,rt){let at,ct,Nt;const It=nt.x-st.x,zt=nt.y-st.y,Gt=rt.x-nt.x,L=rt.y-nt.y,ne=It*It+zt*zt,Jt=It*L-zt*Gt;if(Math.abs(Jt)>Number.EPSILON){const T=Math.sqrt(ne),_=Math.sqrt(Gt*Gt+L*L),O=st.x-zt/T,k=st.y+It/T,$=rt.x-L/_,ot=rt.y+Gt/_,lt=(($-O)*L-(ot-k)*Gt)/(It*L-zt*Gt);at=O+It*lt-nt.x,ct=k+zt*lt-nt.y;const Z=at*at+ct*ct;if(Z<=2)return new mt(at,ct);Nt=Math.sqrt(Z/2)}else{let T=!1;It>Number.EPSILON?Gt>Number.EPSILON&&(T=!0):It<-Number.EPSILON?Gt<-Number.EPSILON&&(T=!0):Math.sign(zt)===Math.sign(L)&&(T=!0),T?(at=-zt,ct=It,Nt=Math.sqrt(ne)):(at=It,ct=zt,Nt=Math.sqrt(ne/2))}return new mt(at/Nt,ct/Nt)}const H=[];for(let nt=0,st=B.length,rt=st-1,at=nt+1;nt<st;nt++,rt++,at++)rt===st&&(rt=0),at===st&&(at=0),H[nt]=Q(B[nt],B[rt],B[at]);const Y=[];let J,wt=H.concat();for(let nt=0,st=D;nt<st;nt++){const rt=U[nt];J=[];for(let at=0,ct=rt.length,Nt=ct-1,It=at+1;at<ct;at++,Nt++,It++)Nt===ct&&(Nt=0),It===ct&&(It=0),J[at]=Q(rt[at],rt[Nt],rt[It]);Y.push(J),wt=wt.concat(J)}let Mt;if(m===0)Mt=Ui.triangulateShape(B,U);else{const nt=[],st=[];for(let rt=0;rt<m;rt++){const at=rt/m,ct=p*Math.cos(at*Math.PI/2),Nt=g*Math.sin(at*Math.PI/2)+v;for(let It=0,zt=B.length;It<zt;It++){const Gt=X(B[It],H[It],Nt);_t(Gt.x,Gt.y,-ct),at===0&&nt.push(Gt)}for(let It=0,zt=D;It<zt;It++){const Gt=U[It];J=Y[It];const L=[];for(let ne=0,Jt=Gt.length;ne<Jt;ne++){const T=X(Gt[ne],J[ne],Nt);_t(T.x,T.y,-ct),at===0&&L.push(T)}at===0&&st.push(L)}}Mt=Ui.triangulateShape(nt,st)}const Zt=Mt.length,qt=g+v;for(let nt=0;nt<W;nt++){const st=f?X(P[nt],wt[nt],qt):P[nt];S?(C.copy(y.normals[0]).multiplyScalar(st.x),E.copy(y.binormals[0]).multiplyScalar(st.y),x.copy(A[0]).add(C).add(E),_t(x.x,x.y,x.z)):_t(st.x,st.y,0)}for(let nt=1;nt<=h;nt++)for(let st=0;st<W;st++){const rt=f?X(P[st],wt[st],qt):P[st];S?(C.copy(y.normals[nt]).multiplyScalar(rt.x),E.copy(y.binormals[nt]).multiplyScalar(rt.y),x.copy(A[nt]).add(C).add(E),_t(x.x,x.y,x.z)):_t(rt.x,rt.y,u/h*nt)}for(let nt=m-1;nt>=0;nt--){const st=nt/m,rt=p*Math.cos(st*Math.PI/2),at=g*Math.sin(st*Math.PI/2)+v;for(let ct=0,Nt=B.length;ct<Nt;ct++){const It=X(B[ct],H[ct],at);_t(It.x,It.y,u+rt)}for(let ct=0,Nt=U.length;ct<Nt;ct++){const It=U[ct];J=Y[ct];for(let zt=0,Gt=It.length;zt<Gt;zt++){const L=X(It[zt],J[zt],at);S?_t(L.x,L.y+A[h-1].y,A[h-1].x+rt):_t(L.x,L.y,u+rt)}}}Kt(),K();function Kt(){const nt=s.length/3;if(f){let st=0,rt=W*st;for(let at=0;at<Zt;at++){const ct=Mt[at];Ot(ct[2]+rt,ct[1]+rt,ct[0]+rt)}st=h+m*2,rt=W*st;for(let at=0;at<Zt;at++){const ct=Mt[at];Ot(ct[0]+rt,ct[1]+rt,ct[2]+rt)}}else{for(let st=0;st<Zt;st++){const rt=Mt[st];Ot(rt[2],rt[1],rt[0])}for(let st=0;st<Zt;st++){const rt=Mt[st];Ot(rt[0]+W*h,rt[1]+W*h,rt[2]+W*h)}}n.addGroup(nt,s.length/3-nt,0)}function K(){const nt=s.length/3;let st=0;et(B,st),st+=B.length;for(let rt=0,at=U.length;rt<at;rt++){const ct=U[rt];et(ct,st),st+=ct.length}n.addGroup(nt,s.length/3-nt,1)}function et(nt,st){let rt=nt.length;for(;--rt>=0;){const at=rt;let ct=rt-1;ct<0&&(ct=nt.length-1);for(let Nt=0,It=h+m*2;Nt<It;Nt++){const zt=W*Nt,Gt=W*(Nt+1),L=st+at+zt,ne=st+ct+zt,Jt=st+ct+Gt,T=st+at+Gt;yt(L,ne,Jt,T)}}}function _t(nt,st,rt){c.push(nt),c.push(st),c.push(rt)}function Ot(nt,st,rt){Bt(nt),Bt(st),Bt(rt);const at=s.length/3,ct=b.generateTopUV(n,s,at-3,at-2,at-1);ae(ct[0]),ae(ct[1]),ae(ct[2])}function yt(nt,st,rt,at){Bt(nt),Bt(st),Bt(at),Bt(st),Bt(rt),Bt(at);const ct=s.length/3,Nt=b.generateSideWallUV(n,s,ct-6,ct-3,ct-2,ct-1);ae(Nt[0]),ae(Nt[1]),ae(Nt[3]),ae(Nt[1]),ae(Nt[2]),ae(Nt[3])}function Bt(nt){s.push(c[nt*3+0]),s.push(c[nt*3+1]),s.push(c[nt*3+2])}function ae(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return sf(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ha[s.type]().fromJSON(s)),new lo(n,t.options)}}const nf={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new mt(r,a),new mt(o,c),new mt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],p=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],d=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new mt(a,1-c),new mt(l,1-u),new mt(f,1-g),new mt(v,1-d)]:[new mt(o,1-c),new mt(h,1-u),new mt(p,1-g),new mt(m,1-d)]}};function sf(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class us extends ze{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,f=e/c,p=[],g=[],v=[],m=[];for(let d=0;d<h;d++){const b=d*f-a;for(let A=0;A<l;A++){const S=A*u-r;g.push(S,-b,0),v.push(0,0,1),m.push(A/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<o;b++){const A=b+l*d,S=b+l*(d+1),y=b+1+l*(d+1),E=b+1+l*d;p.push(A,S,E),p.push(S,y,E)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(v,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new us(t.width,t.height,t.widthSegments,t.heightSegments)}}class es extends ze{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new R,f=new R,p=[],g=[],v=[],m=[];for(let d=0;d<=n;d++){const b=[],A=d/n,S=a+A*o,y=t*Math.cos(S),E=Math.sqrt(t*t-y*y);let C=0;d===0&&a===0?C=.5/e:d===n&&c===Math.PI&&(C=-.5/e);for(let x=0;x<=e;x++){const w=x/e,P=s+w*r;u.x=-E*Math.cos(P),u.y=y,u.z=E*Math.sin(P),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(w+C,1-A),b.push(l++)}h.push(b)}for(let d=0;d<n;d++)for(let b=0;b<e;b++){const A=h[d][b+1],S=h[d][b],y=h[d+1][b],E=h[d+1][b+1];(d!==0||a>0)&&p.push(A,S,E),(d!==n-1||c<Math.PI)&&p.push(S,y,E)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(v,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new es(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class rf extends ze{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,s=new R,r=new R;if(t.index!==null){const a=t.attributes.position,o=t.index;let c=t.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){const u=c[l],f=u.start,p=u.count;for(let g=f,v=f+p;g<v;g+=3)for(let m=0;m<3;m++){const d=o.getX(g+m),b=o.getX(g+(m+1)%3);s.fromBufferAttribute(a,d),r.fromBufferAttribute(a,b),sl(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const a=t.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){const h=3*o+l,u=3*o+(l+1)%3;s.fromBufferAttribute(a,h),r.fromBufferAttribute(a,u),sl(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Se(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function sl(i,t,e){const n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(s)===!0?!1:(e.add(n),e.add(s),!0)}function Hi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(rl(s))s.isRenderTargetTexture?(Ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(rl(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Oe(i){const t={};for(let e=0;e<i.length;e++){const n=Hi(i[e]);for(const s in n)t[s]=n[s]}return t}function rl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function af(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Lc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const co={clone:Hi,merge:Oe};var of=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $e extends cr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=of,this.fragmentShader=lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=af(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Xt().setHex(s.value);break;case"v2":this.uniforms[n].value=new mt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new R().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ue().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Vt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ge().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class cf extends $e{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class hf extends cr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class uf extends cr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Os=new R,Bs=new je,dn=new R;class Dc extends We{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Os,Bs,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Os,Bs,dn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Os,Bs,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Os,Bs,dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const kn=new R,al=new mt,ol=new mt;class an extends Dc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=rs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Fi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(Fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,al,ol),e.subVectors(ol,al)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Fi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class ar extends Dc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class ff extends ze{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}const Ei=-90,bi=1;class df extends We{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new an(Ei,bi,t,e);s.layers=this.layers,this.add(s);const r=new an(Ei,bi,t,e);r.layers=this.layers,this.add(r);const a=new an(Ei,bi,t,e);a.layers=this.layers,this.add(a);const o=new an(Ei,bi,t,e);o.layers=this.layers,this.add(o);const c=new an(Ei,bi,t,e);c.layers=this.layers,this.add(c);const l=new an(Ei,bi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class pf extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class ka extends mu{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const ll=new ge;class mf{constructor(t,e,n=0,s=1/0){this.ray=new xc(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new so,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):te("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ll.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ll),this}intersectObject(t,e=!0,n=[]){return Wa(t,this,n,e),n.sort(cl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Wa(t[s],this,n,e);return n.sort(cl),n}}function cl(i,t){return i.distance-t.distance}function Wa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Wa(r[a],t,e,!0)}}const xo=class xo{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};xo.prototype.isMatrix2=!0;let hl=xo;const ul=new R,zs=new R,wi=new R,Ti=new R,Vr=new R,gf=new R,_f=new R;class xf{constructor(t=new R,e=new R){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){ul.subVectors(t,this.start),zs.subVectors(this.end,this.start);const n=zs.dot(zs);if(n===0)return 0;let r=zs.dot(ul)/n;return e&&(r=kt(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=gf,n=_f){const s=10000000000000001e-32;let r,a;const o=this.start,c=t.start,l=this.end,h=t.end;wi.subVectors(l,o),Ti.subVectors(h,c),Vr.subVectors(o,c);const u=wi.dot(wi),f=Ti.dot(Ti),p=Ti.dot(Vr);if(u<=s&&f<=s)return e.copy(o),n.copy(c),e.sub(n),e.dot(e);if(u<=s)r=0,a=p/f,a=kt(a,0,1);else{const g=wi.dot(Vr);if(f<=s)a=0,r=kt(-g/u,0,1);else{const v=wi.dot(Ti),m=u*f-v*v;m!==0?r=kt((v*p-g*f)/m,0,1):r=0,a=(v*r+p)/f,a<0?(a=0,r=kt(-g/u,0,1)):a>1&&(a=1,r=kt((v-g)/u,0,1))}}return e.copy(o).addScaledVector(wi,r),n.copy(c).addScaledVector(Ti,a),e.distanceToSquared(n)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function fl(i,t,e,n){const s=vf(n);switch(e){case cc:return i*t;case uc:return i*t/s.components*s.byteLength;case Ja:return i*t/s.components*s.byteLength;case li:return i*t*2/s.components*s.byteLength;case Qa:return i*t*2/s.components*s.byteLength;case hc:return i*t*3/s.components*s.byteLength;case cn:return i*t*4/s.components*s.byteLength;case ja:return i*t*4/s.components*s.byteLength;case $s:case Ys:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Zs:case Ks:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ua:case da:return Math.max(i,16)*Math.max(t,8)/4;case ha:case fa:return Math.max(i,8)*Math.max(t,8)/2;case pa:case ma:case _a:case xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ga:case Qs:case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ya:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case wa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Da:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ua:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ia:case Na:case Fa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Oa:case Ba:return Math.ceil(i/4)*Math.ceil(t/4)*8;case js:case za:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vf(i){switch(i){case Je:case rc:return{byteLength:1,components:1};case is:case ac:case bn:return{byteLength:2,components:1};case Za:case Ka:return{byteLength:2,components:4};case En:case Ya:case xn:return{byteLength:4,components:1};case oc:case lc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$a}}));typeof window<"u"&&(window.__THREE__?Ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$a);function Uc(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Sf(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Mf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Af=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Pf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Df=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,If=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Nf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Vf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Wf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,$f=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,td=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,id=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ad=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,od=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ld=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ud=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,dd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,pd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,md=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_d=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Md=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ed=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Td=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ld=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ud=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Id=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Od=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Wd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Xd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$d=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ap=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Rp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Cp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ip=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Np=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$p=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:Mf,alphahash_pars_fragment:yf,alphamap_fragment:Ef,alphamap_pars_fragment:bf,alphatest_fragment:wf,alphatest_pars_fragment:Tf,aomap_fragment:Af,aomap_pars_fragment:Rf,batching_pars_vertex:Cf,batching_vertex:Pf,begin_vertex:Lf,beginnormal_vertex:Df,bsdfs:Uf,iridescence_fragment:If,bumpmap_pars_fragment:Nf,clipping_planes_fragment:Ff,clipping_planes_pars_fragment:Of,clipping_planes_pars_vertex:Bf,clipping_planes_vertex:zf,color_fragment:Hf,color_pars_fragment:Gf,color_pars_vertex:Vf,color_vertex:kf,common:Wf,cube_uv_reflection_fragment:Xf,defaultnormal_vertex:qf,displacementmap_pars_vertex:$f,displacementmap_vertex:Yf,emissivemap_fragment:Zf,emissivemap_pars_fragment:Kf,colorspace_fragment:Jf,colorspace_pars_fragment:Qf,envmap_fragment:jf,envmap_common_pars_fragment:td,envmap_pars_fragment:ed,envmap_pars_vertex:nd,envmap_physical_pars_fragment:dd,envmap_vertex:id,fog_vertex:sd,fog_pars_vertex:rd,fog_fragment:ad,fog_pars_fragment:od,gradientmap_pars_fragment:ld,lightmap_pars_fragment:cd,lights_lambert_fragment:hd,lights_lambert_pars_fragment:ud,lights_pars_begin:fd,lights_toon_fragment:pd,lights_toon_pars_fragment:md,lights_phong_fragment:gd,lights_phong_pars_fragment:_d,lights_physical_fragment:xd,lights_physical_pars_fragment:vd,lights_fragment_begin:Sd,lights_fragment_maps:Md,lights_fragment_end:yd,lightprobes_pars_fragment:Ed,logdepthbuf_fragment:bd,logdepthbuf_pars_fragment:wd,logdepthbuf_pars_vertex:Td,logdepthbuf_vertex:Ad,map_fragment:Rd,map_pars_fragment:Cd,map_particle_fragment:Pd,map_particle_pars_fragment:Ld,metalnessmap_fragment:Dd,metalnessmap_pars_fragment:Ud,morphinstance_vertex:Id,morphcolor_vertex:Nd,morphnormal_vertex:Fd,morphtarget_pars_vertex:Od,morphtarget_vertex:Bd,normal_fragment_begin:zd,normal_fragment_maps:Hd,normal_pars_fragment:Gd,normal_pars_vertex:Vd,normal_vertex:kd,normalmap_pars_fragment:Wd,clearcoat_normal_fragment_begin:Xd,clearcoat_normal_fragment_maps:qd,clearcoat_pars_fragment:$d,iridescence_pars_fragment:Yd,opaque_fragment:Zd,packing:Kd,premultiplied_alpha_fragment:Jd,project_vertex:Qd,dithering_fragment:jd,dithering_pars_fragment:tp,roughnessmap_fragment:ep,roughnessmap_pars_fragment:np,shadowmap_pars_fragment:ip,shadowmap_pars_vertex:sp,shadowmap_vertex:rp,shadowmask_pars_fragment:ap,skinbase_vertex:op,skinning_pars_vertex:lp,skinning_vertex:cp,skinnormal_vertex:hp,specularmap_fragment:up,specularmap_pars_fragment:fp,tonemapping_fragment:dp,tonemapping_pars_fragment:pp,transmission_fragment:mp,transmission_pars_fragment:gp,uv_pars_fragment:_p,uv_pars_vertex:xp,uv_vertex:vp,worldpos_vertex:Sp,background_vert:Mp,background_frag:yp,backgroundCube_vert:Ep,backgroundCube_frag:bp,cube_vert:wp,cube_frag:Tp,depth_vert:Ap,depth_frag:Rp,distance_vert:Cp,distance_frag:Pp,equirect_vert:Lp,equirect_frag:Dp,linedashed_vert:Up,linedashed_frag:Ip,meshbasic_vert:Np,meshbasic_frag:Fp,meshlambert_vert:Op,meshlambert_frag:Bp,meshmatcap_vert:zp,meshmatcap_frag:Hp,meshnormal_vert:Gp,meshnormal_frag:Vp,meshphong_vert:kp,meshphong_frag:Wp,meshphysical_vert:Xp,meshphysical_frag:qp,meshtoon_vert:$p,meshtoon_frag:Yp,points_vert:Zp,points_frag:Kp,shadow_vert:Jp,shadow_frag:Qp,sprite_vert:jp,sprite_frag:tm},ht={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},He={basic:{uniforms:Oe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Oe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Xt(0)},envMapIntensity:{value:1}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Oe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Oe([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Oe([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Oe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Oe([ht.points,ht.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Oe([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Oe([ht.common,ht.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Oe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Oe([ht.sprite,ht.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distance:{uniforms:Oe([ht.common,ht.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distance_vert,fragmentShader:Yt.distance_frag},shadow:{uniforms:Oe([ht.lights,ht.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};He.physical={uniforms:Oe([He.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Hs={r:0,b:0,g:0},em=new ge,Ic=new Vt;Ic.set(-1,0,0,0,1,0,0,0,1);function nm(i,t,e,n,s,r){const a=new Xt(0);let o=s===!0?0:1,c,l,h=null,u=0,f=null;function p(b){let A=b.isScene===!0?b.background:null;if(A&&A.isTexture){const S=b.backgroundBlurriness>0;A=t.get(A,S)}return A}function g(b){let A=!1;const S=p(b);S===null?m(a,o):S&&S.isColor&&(m(S,1),A=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(b,A){const S=p(A);S&&(S.isCubeTexture||S.mapping===lr)?(l===void 0&&(l=new qe(new me(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:Hi(He.backgroundCube.uniforms),vertexShader:He.backgroundCube.vertexShader,fragmentShader:He.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(em.makeRotationFromEuler(A.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ic),l.material.toneMapped=jt.getTransfer(S.colorSpace)!==oe,(h!==S||u!==S.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,u=S.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new qe(new us(2,2),new $e({name:"BackgroundMaterial",uniforms:Hi(He.background.uniforms),vertexShader:He.background.vertexShader,fragmentShader:He.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=jt.getTransfer(S.colorSpace)!==oe,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||u!==S.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,u=S.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,A){b.getRGB(Hs,Lc(i)),e.buffers.color.setClear(Hs.r,Hs.g,Hs.b,A,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,A=1){a.set(b),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:v,dispose:d}}function im(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(U,F,z,D,B){let X=!1;const W=u(U,D,z,F);r!==W&&(r=W,l(r.object)),X=p(U,D,z,B),X&&g(U,D,z,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(U,F,z,D),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function h(U){return i.deleteVertexArray(U)}function u(U,F,z,D){const B=D.wireframe===!0;let X=n[F.id];X===void 0&&(X={},n[F.id]=X);const W=U.isInstancedMesh===!0?U.id:0;let Q=X[W];Q===void 0&&(Q={},X[W]=Q);let H=Q[z.id];H===void 0&&(H={},Q[z.id]=H);let Y=H[B];return Y===void 0&&(Y=f(c()),H[B]=Y),Y}function f(U){const F=[],z=[],D=[];for(let B=0;B<e;B++)F[B]=0,z[B]=0,D[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:D,object:U,attributes:{},index:null}}function p(U,F,z,D){const B=r.attributes,X=F.attributes;let W=0;const Q=z.getAttributes();for(const H in Q)if(Q[H].location>=0){const J=B[H];let wt=X[H];if(wt===void 0&&(H==="instanceMatrix"&&U.instanceMatrix&&(wt=U.instanceMatrix),H==="instanceColor"&&U.instanceColor&&(wt=U.instanceColor)),J===void 0||J.attribute!==wt||wt&&J.data!==wt.data)return!0;W++}return r.attributesNum!==W||r.index!==D}function g(U,F,z,D){const B={},X=F.attributes;let W=0;const Q=z.getAttributes();for(const H in Q)if(Q[H].location>=0){let J=X[H];J===void 0&&(H==="instanceMatrix"&&U.instanceMatrix&&(J=U.instanceMatrix),H==="instanceColor"&&U.instanceColor&&(J=U.instanceColor));const wt={};wt.attribute=J,J&&J.data&&(wt.data=J.data),B[H]=wt,W++}r.attributes=B,r.attributesNum=W,r.index=D}function v(){const U=r.newAttributes;for(let F=0,z=U.length;F<z;F++)U[F]=0}function m(U){d(U,0)}function d(U,F){const z=r.newAttributes,D=r.enabledAttributes,B=r.attributeDivisors;z[U]=1,D[U]===0&&(i.enableVertexAttribArray(U),D[U]=1),B[U]!==F&&(i.vertexAttribDivisor(U,F),B[U]=F)}function b(){const U=r.newAttributes,F=r.enabledAttributes;for(let z=0,D=F.length;z<D;z++)F[z]!==U[z]&&(i.disableVertexAttribArray(z),F[z]=0)}function A(U,F,z,D,B,X,W){W===!0?i.vertexAttribIPointer(U,F,z,B,X):i.vertexAttribPointer(U,F,z,D,B,X)}function S(U,F,z,D){v();const B=D.attributes,X=z.getAttributes(),W=F.defaultAttributeValues;for(const Q in X){const H=X[Q];if(H.location>=0){let Y=B[Q];if(Y===void 0&&(Q==="instanceMatrix"&&U.instanceMatrix&&(Y=U.instanceMatrix),Q==="instanceColor"&&U.instanceColor&&(Y=U.instanceColor)),Y!==void 0){const J=Y.normalized,wt=Y.itemSize,Mt=t.get(Y);if(Mt===void 0)continue;const Zt=Mt.buffer,qt=Mt.type,Kt=Mt.bytesPerElement,K=qt===i.INT||qt===i.UNSIGNED_INT||Y.gpuType===Ya;if(Y.isInterleavedBufferAttribute){const et=Y.data,_t=et.stride,Ot=Y.offset;if(et.isInstancedInterleavedBuffer){for(let yt=0;yt<H.locationSize;yt++)d(H.location+yt,et.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let yt=0;yt<H.locationSize;yt++)m(H.location+yt);i.bindBuffer(i.ARRAY_BUFFER,Zt);for(let yt=0;yt<H.locationSize;yt++)A(H.location+yt,wt/H.locationSize,qt,J,_t*Kt,(Ot+wt/H.locationSize*yt)*Kt,K)}else{if(Y.isInstancedBufferAttribute){for(let et=0;et<H.locationSize;et++)d(H.location+et,Y.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let et=0;et<H.locationSize;et++)m(H.location+et);i.bindBuffer(i.ARRAY_BUFFER,Zt);for(let et=0;et<H.locationSize;et++)A(H.location+et,wt/H.locationSize,qt,J,wt*Kt,wt/H.locationSize*et*Kt,K)}}else if(W!==void 0){const J=W[Q];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(H.location,J);break;case 3:i.vertexAttrib3fv(H.location,J);break;case 4:i.vertexAttrib4fv(H.location,J);break;default:i.vertexAttrib1fv(H.location,J)}}}}b()}function y(){w();for(const U in n){const F=n[U];for(const z in F){const D=F[z];for(const B in D){const X=D[B];for(const W in X)h(X[W].object),delete X[W];delete D[B]}}delete n[U]}}function E(U){if(n[U.id]===void 0)return;const F=n[U.id];for(const z in F){const D=F[z];for(const B in D){const X=D[B];for(const W in X)h(X[W].object),delete X[W];delete D[B]}}delete n[U.id]}function C(U){for(const F in n){const z=n[F];for(const D in z){const B=z[D];if(B[U.id]===void 0)continue;const X=B[U.id];for(const W in X)h(X[W].object),delete X[W];delete B[U.id]}}}function x(U){for(const F in n){const z=n[F],D=U.isInstancedMesh===!0?U.id:0,B=z[D];if(B!==void 0){for(const X in B){const W=B[X];for(const Q in W)h(W[Q].object),delete W[Q];delete B[X]}delete z[D],Object.keys(z).length===0&&delete n[F]}}}function w(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:P,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function sm(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let f=0;for(let p=0;p<h;p++)f+=l[p];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function rm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==cn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const x=C===bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Je&&C!==xn&&!x&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Ht("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Ht("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:b,maxVaryings:A,maxFragmentUniforms:S,maxSamples:y,samples:E}}function am(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Wn,o=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const b=r?0:n,A=b*4;let S=d.clippingState||null;c.value=S,S=h(g,f,A,p);for(let y=0;y!==A;++y)S[y]=e[y];d.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const d=p+v*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let A=0,S=p;A!==v;++A,S+=4)a.copy(u[A]).applyMatrix4(b,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}const Ii=4,om=6,lm=20,cm=256,qi=new ar,dl=new Xt;let kr=null,Wr=0,Xr=0,qr=!1;const hm=new R,jn=new R;class pl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=hm}=r;kr=this._renderer.getRenderTarget(),Wr=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_l(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(kr,Wr,Xr),this._renderer.xr.enabled=qr,t.scissorTest=!1,Ai(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===oi||t.mapping===Bi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),kr=this._renderer.getRenderTarget(),Wr=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ue,minFilter:Ue,generateMipmaps:!1,type:bn,format:cn,colorSpace:tr,depthBuffer:!1},s=ml(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ml(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=um(r)),this._blurMaterial=dm(r,t,e),this._ggxMaterial=fm(r,t,e)}return s}_compileMaterial(t){const e=new qe(new ze,t);this._renderer.compile(e,qi)}_sceneToCubeUV(t,e,n,s,r){const c=new an(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(dl),u.toneMapping=Mn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qe(new me,new ro({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let d=!1;const b=t.background;b?b.isColor&&(m.color.copy(b),t.background=null,d=!0):(m.color.copy(dl),d=!0);for(let A=0;A<6;A++){const S=A%3;S===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[A],r.y,r.z)):S===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[A]));const y=this._cubeSize;Ai(s,S*y,A>2?y:0,y,y),u.setRenderTarget(s),d&&u.render(v,c),u.render(t,c)}u.toneMapping=p,u.autoClear=f,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===oi||t.mapping===Bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_l()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Ai(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,qi)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=l*1.25,p=u*f,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Ii?n-g+Ii:0),d=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=p,c.mipInt.value=g-e,Ai(r,m,d,3*v,2*v),s.setRenderTarget(r),s.render(o,qi),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,Ai(t,m,d,3*v,2*v),s.setRenderTarget(t),s.render(o,qi)}_blur(t,e,n,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;const l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[s],u=3*h*(s>this._lodMax-Ii?s-this._lodMax+Ii:0),f=4*(this._cubeSize-h);Ai(e,u,f,3*h,2*h),a.setRenderTarget(e),a.render(c,qi)}}function um(i){const t=[],e=[];let n=i;const s=i-Ii+1+om;for(let r=0;r<s;r++){const a=Math.pow(2,n);t.push(a);const o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,f=6,p=3,g=new Float32Array(p*f*u),v=new Float32Array(p*f*u);for(let d=0;d<u;d++){const b=d%3*2/3-1,A=d>2?0:-1,S=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];g.set(S,p*f*d);for(let y=0;y<f;y++){const E=h[y*2]*2-1,C=h[y*2+1]*2-1;d===0?jn.set(1,C,E):d===1?jn.set(-E,1,-C):d===2?jn.set(-E,C,1):d===3?jn.set(-1,C,-E):d===4?jn.set(-E,-1,C):jn.set(E,C,-1),jn.toArray(v,(d*f+y)*p)}}const m=new ze;m.setAttribute("position",new Xe(g,p)),m.setAttribute("outputDirection",new Xe(v,p)),e.push(new qe(m,null)),n>Ii&&n--}return{lodMeshes:e,sizeLods:t}}function ml(i,t,e){const n=new hn(i,t,e);return n.texture.mapping=lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ai(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function fm(i,t,e){return new $e({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:cm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:hr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function dm(i,t,e){return new $e({name:"SphericalGaussianBlur",defines:{SAMPLES:lm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:hr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function gl(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function _l(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function hr(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Nc extends hn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Sc(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new me(5,5,5),r=new $e({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:Un});r.uniforms.tEquirect.value=e;const a=new qe(s,r),o=e.minFilter;return e.minFilter===ii&&(e.minFilter=Ue),new df(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function pm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,p=!1){return f==null?null:p?a(f):r(f)}function r(f){if(f&&f.isTexture){const p=f.mapping;if(p===pr||p===mr)if(t.has(f)){const g=t.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const v=new Nc(g.height);return v.fromEquirectangularTexture(i,f),t.set(f,v),f.addEventListener("dispose",l),o(v.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const p=f.mapping,g=p===pr||p===mr,v=p===oi||p===Bi;if(g||v){let m=e.get(f);const d=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==d)return n===null&&(n=new pl(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const b=f.image;return g&&b&&b.height>0||v&&b&&c(b)?(n===null&&(n=new pl(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function o(f,p){return p===pr?f.mapping=oi:p===mr&&(f.mapping=Bi),f}function c(f){let p=0;const g=6;for(let v=0;v<g;v++)f[v]!==void 0&&p++;return p===g}function l(f){const p=f.target;p.removeEventListener("dispose",l);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(f){const p=f.target;p.removeEventListener("dispose",h);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function mm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ni("WebGLRenderer: "+n+" extension not supported."),s}}}function gm(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const p in f)t.update(f[p],i.ARRAY_BUFFER)}function l(u){const f=[],p=u.index,g=u.attributes.position;let v=0;if(g===void 0)return;if(p!==null){const b=p.array;v=p.version;for(let A=0,S=b.length;A<S;A+=3){const y=b[A+0],E=b[A+1],C=b[A+2];f.push(y,E,E,C,C,y)}}else{const b=g.array;v=g.version;for(let A=0,S=b.length/3-1;A<S;A+=3){const y=A+0,E=A+1,C=A+2;f.push(y,E,E,C,C,y)}}const m=new(g.count>=65535?_c:gc)(f,1);m.version=v;const d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function _m(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function l(u,f,p){p!==0&&(i.drawElementsInstanced(n,f,r,u*a,p),e.update(f,n,p))}function h(u,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,p);let v=0;for(let m=0;m<p;m++)v+=f[m];e.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function xm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:te("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function vm(i,t,e){const n=new WeakMap,s=new ue;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let w=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let A=0;p===!0&&(A=1),g===!0&&(A=2),v===!0&&(A=3);let S=o.attributes.position.count*A,y=1;S>t.maxTextureSize&&(y=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const E=new Float32Array(S*y*4*u),C=new pc(E,S,y,u);C.type=xn,C.needsUpdate=!0;const x=A*4;for(let P=0;P<u;P++){const U=m[P],F=d[P],z=b[P],D=S*y*4*P;for(let B=0;B<U.count;B++){const X=B*x;p===!0&&(s.fromBufferAttribute(U,B),E[D+X+0]=s.x,E[D+X+1]=s.y,E[D+X+2]=s.z,E[D+X+3]=0),g===!0&&(s.fromBufferAttribute(F,B),E[D+X+4]=s.x,E[D+X+5]=s.y,E[D+X+6]=s.z,E[D+X+7]=0),v===!0&&(s.fromBufferAttribute(z,B),E[D+X+8]=s.x,E[D+X+9]=s.y,E[D+X+10]=s.z,E[D+X+11]=z.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new mt(S,y)},n.set(o,f),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Sm(i,t,e,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return f}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Mm={[Jl]:"LINEAR_TONE_MAPPING",[Ql]:"REINHARD_TONE_MAPPING",[jl]:"CINEON_TONE_MAPPING",[tc]:"ACES_FILMIC_TONE_MAPPING",[nc]:"AGX_TONE_MAPPING",[ic]:"NEUTRAL_TONE_MAPPING",[ec]:"CUSTOM_TONE_MAPPING"};function ym(i,t,e,n,s,r){const a=new hn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new ze;l.setAttribute("position",new Se([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Se([0,2,0,0,2,0],2));const h=new cf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new qe(l,h),f=new ar(-1,1,1,-1,0,1);let p=null,g=null,v=!1,m,d=null,b=[],A=!1;this.setSize=function(S,y){a.setSize(S,y),o!==null&&o.setSize(S,y),c!==null&&c.setSize(S,y);for(let E=0;E<b.length;E++){const C=b[E];C.setSize&&C.setSize(S,y)}},this.setEffects=function(S){b=S,A=b.length>0&&b[0].isRenderPass===!0;const y=a.width,E=a.height;b.length>0&&o===null&&(o=new hn(y,E,{type:bn,depthBuffer:!1,stencilBuffer:!1}),c=new hn(y,E,{type:bn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<b.length;C++){const x=b[C];x.setSize&&x.setSize(y,E)}},this.begin=function(S,y){if(v||S.toneMapping===Mn&&b.length===0)return!1;if(d=y,y!==null){const E=y.width,C=y.height;(a.width!==E||a.height!==C)&&this.setSize(E,C)}return A===!1&&S.setRenderTarget(a),m=S.toneMapping,S.toneMapping=Mn,!0},this.hasRenderPass=function(){return A},this.end=function(S,y){S.toneMapping=m,v=!0;let E=a,C=o;for(let x=0;x<b.length;x++){const w=b[x];w.enabled!==!1&&(w.render(S,C,E,y),w.needsSwap!==!1&&(E=C,C=C===o?c:o))}if(p!==S.outputColorSpace||g!==S.toneMapping){p=S.outputColorSpace,g=S.toneMapping,h.defines={},jt.getTransfer(p)===oe&&(h.defines.SRGB_TRANSFER="");const x=Mm[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(d),S.render(u,f),d=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const Fc=new Ie,Xa=new as(1,1),Oc=new pc,Bc=new iu,zc=new Sc,xl=[],vl=[],Sl=new Float32Array(16),Ml=new Float32Array(9),yl=new Float32Array(4);function Gi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=xl[s];if(r===void 0&&(r=new Float32Array(s),xl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ur(i,t){let e=vl[t];e===void 0&&(e=new Int32Array(t),vl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Em(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),be(e,t)}}function wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),be(e,t)}}function Tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),be(e,t)}}function Am(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;yl.set(n),i.uniformMatrix2fv(this.addr,!1,yl),be(e,n)}}function Rm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;Ml.set(n),i.uniformMatrix3fv(this.addr,!1,Ml),be(e,n)}}function Cm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;Sl.set(n),i.uniformMatrix4fv(this.addr,!1,Sl),be(e,n)}}function Pm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),be(e,t)}}function Dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),be(e,t)}}function Um(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),be(e,t)}}function Im(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),be(e,t)}}function Fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),be(e,t)}}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),be(e,t)}}function Bm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Xa.compareFunction=e.isReversedDepthBuffer()?eo:to,r=Xa):r=Fc,e.setTexture2D(t||r,s)}function zm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Bc,s)}function Hm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||zc,s)}function Gm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Oc,s)}function Vm(i){switch(i){case 5126:return Em;case 35664:return bm;case 35665:return wm;case 35666:return Tm;case 35674:return Am;case 35675:return Rm;case 35676:return Cm;case 5124:case 35670:return Pm;case 35667:case 35671:return Lm;case 35668:case 35672:return Dm;case 35669:case 35673:return Um;case 5125:return Im;case 36294:return Nm;case 36295:return Fm;case 36296:return Om;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return Hm;case 36289:case 36303:case 36311:case 36292:return Gm}}function km(i,t){i.uniform1fv(this.addr,t)}function Wm(i,t){const e=Gi(t,this.size,2);i.uniform2fv(this.addr,e)}function Xm(i,t){const e=Gi(t,this.size,3);i.uniform3fv(this.addr,e)}function qm(i,t){const e=Gi(t,this.size,4);i.uniform4fv(this.addr,e)}function $m(i,t){const e=Gi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ym(i,t){const e=Gi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Zm(i,t){const e=Gi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Km(i,t){i.uniform1iv(this.addr,t)}function Jm(i,t){i.uniform2iv(this.addr,t)}function Qm(i,t){i.uniform3iv(this.addr,t)}function jm(i,t){i.uniform4iv(this.addr,t)}function tg(i,t){i.uniform1uiv(this.addr,t)}function eg(i,t){i.uniform2uiv(this.addr,t)}function ng(i,t){i.uniform3uiv(this.addr,t)}function ig(i,t){i.uniform4uiv(this.addr,t)}function sg(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),be(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Xa:a=Fc;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function rg(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Bc,r[a])}function ag(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||zc,r[a])}function og(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Oc,r[a])}function lg(i){switch(i){case 5126:return km;case 35664:return Wm;case 35665:return Xm;case 35666:return qm;case 35674:return $m;case 35675:return Ym;case 35676:return Zm;case 5124:case 35670:return Km;case 35667:case 35671:return Jm;case 35668:case 35672:return Qm;case 35669:case 35673:return jm;case 5125:return tg;case 36294:return eg;case 36295:return ng;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return sg;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return og}}class cg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Vm(e.type)}}class hg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=lg(e.type)}}class ug{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const $r=/(\w+)(\])?(\[|\.)?/g;function El(i,t){i.seq.push(t),i.map[t.id]=t}function fg(i,t,e){const n=i.name,s=n.length;for($r.lastIndex=0;;){const r=$r.exec(n),a=$r.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){El(e,l===void 0?new cg(o,i,t):new hg(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new ug(o),El(e,u)),e=u}}}class Js{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);fg(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function bl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const dg=37297;let pg=0;function mg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const wl=new Vt;function gg(i){jt._getMatrix(wl,jt.workingColorSpace,i);const t=`mat3( ${wl.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(i)){case er:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Ht("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Tl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+mg(i.getShaderSource(t),o)}else return r}function _g(i,t){const e=gg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const xg={[Jl]:"Linear",[Ql]:"Reinhard",[jl]:"Cineon",[tc]:"ACESFilmic",[nc]:"AgX",[ic]:"Neutral",[ec]:"Custom"};function vg(i,t){const e=xg[t];return e===void 0?(Ht("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Gs=new R;function Sg(){jt.getLuminanceCoefficients(Gs);const i=Gs.x.toFixed(4),t=Gs.y.toFixed(4),e=Gs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Mg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ki).join(`
`)}function yg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Eg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ki(i){return i!==""}function Al(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bg=/^[ \t]*#include +<([\w\d./]+)>/gm;function qa(i){return i.replace(bg,Tg)}const wg=new Map;function Tg(i,t){let e=Yt[t];if(e===void 0){const n=wg.get(t);if(n!==void 0)e=Yt[n],Ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return qa(e)}const Ag=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cl(i){return i.replace(Ag,Rg)}function Rg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Cg={[qs]:"SHADOWMAP_TYPE_PCF",[Yi]:"SHADOWMAP_TYPE_VSM"};function Pg(i){return Cg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Lg={[oi]:"ENVMAP_TYPE_CUBE",[Bi]:"ENVMAP_TYPE_CUBE",[lr]:"ENVMAP_TYPE_CUBE_UV"};function Dg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Lg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Ug={[Bi]:"ENVMAP_MODE_REFRACTION"};function Ig(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ug[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ng={[Kl]:"ENVMAP_BLENDING_MULTIPLY",[vh]:"ENVMAP_BLENDING_MIX",[Sh]:"ENVMAP_BLENDING_ADD"};function Fg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Ng[i.combine]||"ENVMAP_BLENDING_NONE"}function Og(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Bg(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Pg(e),l=Dg(e),h=Ig(e),u=Fg(e),f=Og(e),p=Mg(e),g=yg(r),v=s.createProgram();let m,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ki).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ki).join(`
`),d.length>0&&(d+=`
`)):(m=[Pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ki).join(`
`),d=[Pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Mn?"#define TONE_MAPPING":"",e.toneMapping!==Mn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Mn?vg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,_g("linearToOutputTexel",e.outputColorSpace),Sg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ki).join(`
`)),a=qa(a),a=Al(a,e),a=Rl(a,e),o=qa(o),o=Al(o,e),o=Rl(o,e),a=Cl(a),o=Cl(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Io?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Io?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const A=b+m+a,S=b+d+o,y=bl(s,s.VERTEX_SHADER,A),E=bl(s,s.FRAGMENT_SHADER,S);s.attachShader(v,y),s.attachShader(v,E),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(U){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",z=s.getShaderInfoLog(y)||"",D=s.getShaderInfoLog(E)||"",B=F.trim(),X=z.trim(),W=D.trim();let Q=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,y,E);else{const Y=Tl(s,y,"vertex"),J=Tl(s,E,"fragment");te("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+B+`
`+Y+`
`+J)}else B!==""?Ht("WebGLProgram: Program Info Log:",B):(X===""||W==="")&&(H=!1);H&&(U.diagnostics={runnable:Q,programLog:B,vertexShader:{log:X,prefix:m},fragmentShader:{log:W,prefix:d}})}s.deleteShader(y),s.deleteShader(E),x=new Js(s,v),w=Eg(s,v)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,dg)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=pg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=y,this.fragmentShader=E,this}let zg=0;class Hg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Gg(t),e.set(t,n)),n}}class Gg{constructor(t){this.id=zg++,this.code=t,this.usedTimes=0}}function Vg(i){return i===li||i===Qs||i===js}function kg(i,t,e,n,s,r){const a=new so,o=new Hg,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function v(x,w,P,U,F,z){const D=U.fog,B=F.geometry,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Q=t.get(x.envMap||X,W),H=Q&&Q.mapping===lr?Q.image.height:null,Y=p[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Ht("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const J=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,wt=J!==void 0?J.length:0;let Mt=0;B.morphAttributes.position!==void 0&&(Mt=1),B.morphAttributes.normal!==void 0&&(Mt=2),B.morphAttributes.color!==void 0&&(Mt=3);let Zt,qt,Kt,K;if(Y){const fe=He[Y];Zt=fe.vertexShader,qt=fe.fragmentShader}else{Zt=x.vertexShader,qt=x.fragmentShader;const fe=o.getVertexShaderStage(x),ie=o.getFragmentShaderStage(x);o.update(x,fe,ie),Kt=fe.id,K=ie.id}const et=i.getRenderTarget(),_t=i.state.buffers.depth.getReversed(),Ot=F.isInstancedMesh===!0,yt=F.isBatchedMesh===!0,Bt=!!x.map,ae=!!x.matcap,nt=!!Q,st=!!x.aoMap,rt=!!x.lightMap,at=!!x.bumpMap&&x.wireframe===!1,ct=!!x.normalMap,Nt=!!x.displacementMap,It=!!x.emissiveMap,zt=!!x.metalnessMap,Gt=!!x.roughnessMap,L=x.anisotropy>0,ne=x.clearcoat>0,Jt=x.dispersion>0,T=x.retroreflectivity>0,_=x.iridescence>0,O=x.sheen>0,k=x.transmission>0,$=L&&!!x.anisotropyMap,ot=ne&&!!x.clearcoatMap,lt=ne&&!!x.clearcoatNormalMap,Z=ne&&!!x.clearcoatRoughnessMap,tt=_&&!!x.iridescenceMap,ut=_&&!!x.iridescenceThicknessMap,Lt=O&&!!x.sheenColorMap,gt=O&&!!x.sheenRoughnessMap,ft=!!x.specularMap,Dt=!!x.specularColorMap,Ft=!!x.specularIntensityMap,Wt=k&&!!x.transmissionMap,N=k&&!!x.thicknessMap,dt=!!x.gradientMap,j=!!x.alphaMap,pt=x.alphaTest>0,St=!!x.alphaHash,it=!!x.extensions;let Ut=Mn;x.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Ut=i.toneMapping);const Ct={shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:Zt,fragmentShader:qt,defines:x.defines,customVertexShaderID:Kt,customFragmentShaderID:K,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:yt,batchingColor:yt&&F._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&F.instanceColor!==null,instancingMorph:Ot&&F.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Bt,matcap:ae,envMap:nt,envMapMode:nt&&Q.mapping,envMapCubeUVHeight:H,aoMap:st,lightMap:rt,bumpMap:at,normalMap:ct,displacementMap:Nt,emissiveMap:It,normalMapObjectSpace:ct&&x.normalMapType===Eh,normalMapTangentSpace:ct&&x.normalMapType===Uo,packedNormalMap:ct&&x.normalMapType===Uo&&Vg(x.normalMap.format),metalnessMap:zt,roughnessMap:Gt,anisotropy:L,anisotropyMap:$,clearcoat:ne,clearcoatMap:ot,clearcoatNormalMap:lt,clearcoatRoughnessMap:Z,dispersion:Jt,retroreflection:T,iridescence:_,iridescenceMap:tt,iridescenceThicknessMap:ut,sheen:O,sheenColorMap:Lt,sheenRoughnessMap:gt,specularMap:ft,specularColorMap:Dt,specularIntensityMap:Ft,transmission:k,transmissionMap:Wt,thicknessMap:N,gradientMap:dt,opaque:x.transparent===!1&&x.blending===Ji&&x.alphaToCoverage===!1,alphaMap:j,alphaTest:pt,alphaHash:St,combine:x.combine,mapUv:Bt&&g(x.map.channel),aoMapUv:st&&g(x.aoMap.channel),lightMapUv:rt&&g(x.lightMap.channel),bumpMapUv:at&&g(x.bumpMap.channel),normalMapUv:ct&&g(x.normalMap.channel),displacementMapUv:Nt&&g(x.displacementMap.channel),emissiveMapUv:It&&g(x.emissiveMap.channel),metalnessMapUv:zt&&g(x.metalnessMap.channel),roughnessMapUv:Gt&&g(x.roughnessMap.channel),anisotropyMapUv:$&&g(x.anisotropyMap.channel),clearcoatMapUv:ot&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:lt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:gt&&g(x.sheenRoughnessMap.channel),specularMapUv:ft&&g(x.specularMap.channel),specularColorMapUv:Dt&&g(x.specularColorMap.channel),specularIntensityMapUv:Ft&&g(x.specularIntensityMap.channel),transmissionMapUv:Wt&&g(x.transmissionMap.channel),thicknessMapUv:N&&g(x.thicknessMap.channel),alphaMapUv:j&&g(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ct||L),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(Bt||j),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&ct===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_t,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Mt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Bt&&x.map.isVideoTexture===!0&&jt.getTransfer(x.map.colorSpace)===oe,decodeVideoTextureEmissive:It&&x.emissiveMap.isVideoTexture===!0&&jt.getTransfer(x.emissiveMap.colorSpace)===oe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ln,flipSided:x.side===Be,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:it&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&x.extensions.multiDraw===!0||yt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ct.vertexUv1s=c.has(1),Ct.vertexUv2s=c.has(2),Ct.vertexUv3s=c.has(3),c.clear(),Ct}function m(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)w.push(P),w.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(d(w,x),b(w,x),w.push(i.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function d(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function b(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){const w=p[x.type];let P;if(w){const U=He[w];P=co.clone(U.uniforms)}else P=x.uniforms;return P}function S(x,w){let P=h.get(w);return P!==void 0?++P.usedTimes:(P=new Bg(i,w,x,s),l.push(P),h.set(w,P)),P}function y(x){if(--x.usedTimes===0){const w=l.indexOf(x);l[w]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:A,acquireProgram:S,releaseProgram:y,releaseShaderCache:E,programs:l,dispose:C}}function Wg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Xg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Ll(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Dl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function o(f,p,g,v,m,d){let b=i[t];return b===void 0?(b={id:f.id,object:f,geometry:p,material:g,materialVariant:a(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:d},i[t]=b):(b.id=f.id,b.object=f,b.geometry=p,b.material=g,b.materialVariant=a(f),b.groupOrder=v,b.renderOrder=f.renderOrder,b.z=m,b.group=d),t++,b}function c(f,p,g,v,m,d,b){b.reversedDepth===!0&&(m=-m);const A=o(f,p,g,v,m,d);g.transmission>0?n.push(A):g.transparent===!0?s.push(A):e.push(A)}function l(f,p,g,v,m,d){const b=o(f,p,g,v,m,d);g.transmission>0?n.unshift(b):g.transparent===!0?s.unshift(b):e.unshift(b)}function h(f,p){e.length>1&&e.sort(f||Xg),n.length>1&&n.sort(p||Ll),s.length>1&&s.sort(p||Ll)}function u(){for(let f=t,p=i.length;f<p;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function qg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Dl,i.set(n,[a])):s>=r.length?(a=new Dl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function $g(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new R,color:new Xt};break;case"SpotLight":e={position:new R,direction:new R,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function Yg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Zg=0;function Kg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Jg(i){const t=new $g,e=Yg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const s=new R,r=new ge,a=new ge;function o(l){let h=0,u=0,f=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,b=0,A=0,S=0,y=0,E=0,C=0,x=0,w=0,P=0;l.sort(Kg);for(let F=0,z=l.length;F<z;F++){const D=l[F],B=D.color,X=D.intensity,W=D.distance;let Q=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===li?Q=D.shadow.map.texture:Q=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=B.r*X,u+=B.g*X,f+=B.b*X;else if(D.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(D.sh.coefficients[H],X);P++}else if(D.isSunLight){const H=t.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Y=D.shadow,J=e.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),n.sunShadow[g]=J,n.sunShadowMap[g]=Q;const wt=Y.getViewportCount();for(let Mt=0;Mt<wt;Mt++)n.sunShadowMatrix[v+Mt]=Y.getMatrix(Mt),n.sunShadowCascade[v+Mt]=Y._cascadeData[Mt];v+=wt,g++}n.sun[p]=H,p++}else if(D.isDirectionalLight){const H=t.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Y=D.shadow,J=e.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,n.directionalShadow[m]=J,n.directionalShadowMap[m]=Q,n.directionalShadowMatrix[m]=D.shadow.matrix,y++}n.directional[m]=H,m++}else if(D.isSpotLight){const H=t.get(D);H.position.setFromMatrixPosition(D.matrixWorld),H.color.copy(B).multiplyScalar(X),H.distance=W,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,n.spot[b]=H;const Y=D.shadow;if(D.map&&(n.spotLightMap[x]=D.map,x++,Y.updateMatrices(D),D.castShadow&&w++),n.spotLightMatrix[b]=Y.matrix,D.castShadow){const J=e.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,n.spotShadow[b]=J,n.spotShadowMap[b]=Q,C++}b++}else if(D.isRectAreaLight){const H=t.get(D);H.color.copy(B).multiplyScalar(X),H.halfWidth.set(D.width*.5,0,0),H.halfHeight.set(0,D.height*.5,0),n.rectArea[A]=H,A++}else if(D.isPointLight){const H=t.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),H.distance=D.distance,H.decay=D.decay,D.castShadow){const Y=D.shadow,J=e.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,J.shadowCameraNear=Y.camera.near,J.shadowCameraFar=Y.camera.far,n.pointShadow[d]=J,n.pointShadowMap[d]=Q,n.pointShadowMatrix[d]=D.shadow.matrix,E++}n.point[d]=H,d++}else if(D.isHemisphereLight){const H=t.get(D);H.skyColor.copy(D.color).multiplyScalar(X),H.groundColor.copy(D.groundColor).multiplyScalar(X),n.hemi[S]=H,S++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const U=n.hash;(U.sunLength!==p||U.directionalLength!==m||U.pointLength!==d||U.spotLength!==b||U.rectAreaLength!==A||U.hemiLength!==S||U.numSunShadows!==g||U.numDirectionalShadows!==y||U.numPointShadows!==E||U.numSpotShadows!==C||U.numSpotMaps!==x||U.numLightProbes!==P)&&(n.sun.length=p,n.directional.length=m,n.spot.length=b,n.rectArea.length=A,n.point.length=d,n.hemi.length=S,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+x-w,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,U.sunLength=p,U.directionalLength=m,U.pointLength=d,U.spotLength=b,U.rectAreaLength=A,U.hemiLength=S,U.numSunShadows=g,U.numDirectionalShadows=y,U.numPointShadows=E,U.numSpotShadows=C,U.numSpotMaps=x,U.numLightProbes=P,n.version=Zg++)}function c(l,h){let u=0,f=0,p=0,g=0,v=0,m=0;const d=h.matrixWorldInverse;for(let b=0,A=l.length;b<A;b++){const S=l[b];if(S.isSunLight){const y=n.sun[u];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(d),u++}else if(S.isDirectionalLight){const y=n.directional[f];y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),f++}else if(S.isSpotLight){const y=n.spot[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),g++}else if(S.isRectAreaLight){const y=n.rectArea[v];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(d),a.identity(),r.copy(S.matrixWorld),r.premultiply(d),a.extractRotation(r),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const y=n.point[p];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(d),p++}else if(S.isHemisphereLight){const y=n.hemi[m];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(d),m++}}}return{setup:o,setupView:c,state:n}}function Ul(i){const t=new Jg(i),e=[],n=[],s=[];function r(f){u.camera=f,e.length=0,n.length=0,s.length=0}function a(f){e.push(f)}function o(f){n.push(f)}function c(f){s.push(f)}function l(){t.setup(e)}function h(f){t.setupView(e,f)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Qg(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Ul(i),t.set(s,[o])):r>=a.length?(o=new Ul(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const jg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,e0=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],n0=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Il=new ge,$i=new R,Yr=new R;function i0(i,t,e){let n=new vc;const s=new mt,r=new mt,a=new ue,o=new hf,c=new uf,l={},h=e.maxTextureSize,u={[ai]:Be,[Be]:ai,[Ln]:Ln},f=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:jg,fragmentShader:t0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new ze;g.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new qe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qs;let d=this.type;this.render=function(E,C,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===th&&(Ht("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=qs);const w=i.getRenderTarget(),P=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Un),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=d!==this.type;z&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(B=>B.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,B=E.length;D<B;D++){const X=E[D],W=X.shadow;if(W===void 0){Ht("WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const Q=W.getFrameExtents();s.multiply(Q),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,W.mapSize.y=r.y));const H=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=H,W.map===null||z===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Yi){if(X.isPointLight){Ht("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new hn(s.x,s.y,{format:li,type:bn,minFilter:Ue,magFilter:Ue,generateMipmaps:!1}),W.map.texture.name=X.name+".shadowMap",W.map.depthTexture=new as(s.x,s.y,xn),W.map.depthTexture.name=X.name+".shadowMapDepth",W.map.depthTexture.format=Nn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ce,W.map.depthTexture.magFilter=Ce}else X.isPointLight?(W.map=new Nc(s.x),W.map.depthTexture=new Eu(s.x,En)):(W.map=new hn(s.x,s.y),W.map.depthTexture=new as(s.x,s.y,En)),W.map.depthTexture.name=X.name+".shadowMap",W.map.depthTexture.format=Nn,this.type===qs?(W.map.depthTexture.compareFunction=H?eo:to,W.map.depthTexture.minFilter=Ue,W.map.depthTexture.magFilter=Ue):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ce,W.map.depthTexture.magFilter=Ce);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const Y=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();X.isPointLight!==!0&&W.updateMatrices(X,x);for(let J=0;J<Y;J++){const wt=W.getCamera(J);if(X.isPointLight){const Mt=W.camera,Zt=W.matrix,qt=X.distance||Mt.far;qt!==Mt.far&&(Mt.far=qt,Mt.updateProjectionMatrix()),$i.setFromMatrixPosition(X.matrixWorld),Mt.position.copy($i),Yr.copy(Mt.position),Yr.add(e0[J]),Mt.up.copy(n0[J]),Mt.lookAt(Yr),Mt.updateMatrixWorld(),Zt.makeTranslation(-$i.x,-$i.y,-$i.z),Il.multiplyMatrices(Mt.projectionMatrix,Mt.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Il,Mt.coordinateSystem,Mt.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,J),i.clear();else{J===0&&(i.setRenderTarget(W.map),i.clear());const Mt=W.getViewport(J);a.set(r.x*Mt.x,r.y*Mt.y,r.x*Mt.z,r.y*Mt.w),F.viewport(a)}n=W.getFrustum(J),S(C,x,wt,X,this.type)}W.isPointLightShadow!==!0&&this.type===Yi&&b(W,x),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(w,P,U)};function b(E,C){const x=t.update(v);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new hn(s.x,s.y,{format:li,type:bn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,x,f,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,x,p,v,null)}function A(E,C,x,w){let P=null;const U=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)P=U;else if(P=x.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=P.uuid,z=C.uuid;let D=l[F];D===void 0&&(D={},l[F]=D);let B=D[z];B===void 0&&(B=P.clone(),D[z]=B,C.addEventListener("dispose",y)),P=B}if(P.visible=C.visible,P.wireframe=C.wireframe,w===Yi?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:u[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const F=i.properties.get(P);F.light=x}return P}function S(E,C,x,w,P){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===Yi)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const z=t.update(E),D=E.material;if(Array.isArray(D)){const B=z.groups;for(let X=0,W=B.length;X<W;X++){const Q=B[X],H=D[Q.materialIndex];if(H&&H.visible){const Y=A(E,H,w,P);E.onBeforeShadow(i,E,C,x,z,Y,Q),i.renderBufferDirect(x,null,z,Y,E,Q),E.onAfterShadow(i,E,C,x,z,Y,Q)}}}else if(D.visible){const B=A(E,D,w,P);E.onBeforeShadow(i,E,C,x,z,B,null),i.renderBufferDirect(x,null,z,B,E,null),E.onAfterShadow(i,E,C,x,z,B,null)}}const F=E.children;for(let z=0,D=F.length;z<D;z++)S(F[z],C,x,w,P)}function y(E){E.target.removeEventListener("dispose",y);for(const x in l){const w=l[x],P=E.target.uuid;P in w&&(w[P].dispose(),delete w[P])}}}function s0(i,t){function e(){let N=!1;const dt=new ue;let j=null;const pt=new ue(0,0,0,0);return{setMask:function(St){j!==St&&!N&&(i.colorMask(St,St,St,St),j=St)},setLocked:function(St){N=St},setClear:function(St,it,Ut,Ct,fe){fe===!0&&(St*=Ct,it*=Ct,Ut*=Ct),dt.set(St,it,Ut,Ct),pt.equals(dt)===!1&&(i.clearColor(St,it,Ut,Ct),pt.copy(dt))},reset:function(){N=!1,j=null,pt.set(-1,0,0,0)}}}function n(){let N=!1,dt=!1,j=null,pt=null,St=null;return{setReversed:function(it){if(dt!==it){const Ut=t.get("EXT_clip_control");it?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),dt=it;const Ct=St;St=null,this.setClear(Ct)}},getReversed:function(){return dt},setTest:function(it){it?et(i.DEPTH_TEST):_t(i.DEPTH_TEST)},setMask:function(it){j!==it&&!N&&(i.depthMask(it),j=it)},setFunc:function(it){if(dt&&(it=Ih[it]),pt!==it){switch(it){case ea:i.depthFunc(i.NEVER);break;case na:i.depthFunc(i.ALWAYS);break;case ia:i.depthFunc(i.LESS);break;case ns:i.depthFunc(i.LEQUAL);break;case sa:i.depthFunc(i.EQUAL);break;case ra:i.depthFunc(i.GEQUAL);break;case aa:i.depthFunc(i.GREATER);break;case oa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pt=it}},setLocked:function(it){N=it},setClear:function(it){St!==it&&(St=it,dt&&(it=1-it),i.clearDepth(it))},reset:function(){N=!1,j=null,pt=null,St=null,dt=!1}}}function s(){let N=!1,dt=null,j=null,pt=null,St=null,it=null,Ut=null,Ct=null,fe=null;return{setTest:function(ie){N||(ie?et(i.STENCIL_TEST):_t(i.STENCIL_TEST))},setMask:function(ie){dt!==ie&&!N&&(i.stencilMask(ie),dt=ie)},setFunc:function(ie,en,un){(j!==ie||pt!==en||St!==un)&&(i.stencilFunc(ie,en,un),j=ie,pt=en,St=un)},setOp:function(ie,en,un){(it!==ie||Ut!==en||Ct!==un)&&(i.stencilOp(ie,en,un),it=ie,Ut=en,Ct=un)},setLocked:function(ie){N=ie},setClear:function(ie){fe!==ie&&(i.clearStencil(ie),fe=ie)},reset:function(){N=!1,dt=null,j=null,pt=null,St=null,it=null,Ut=null,Ct=null,fe=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f={},p=new WeakMap,g=[],v=null,m=!1,d=null,b=null,A=null,S=null,y=null,E=null,C=null,x=new Xt(0,0,0),w=0,P=!1,U=null,F=null,z=null,D=null,B=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=Q>=1):H.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=Q>=2);let Y=null,J={};const wt=i.getParameter(i.SCISSOR_BOX),Mt=i.getParameter(i.VIEWPORT),Zt=new ue().fromArray(wt),qt=new ue().fromArray(Mt);function Kt(N,dt,j,pt){const St=new Uint8Array(4),it=i.createTexture();i.bindTexture(N,it),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<j;Ut++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,pt,0,i.RGBA,i.UNSIGNED_BYTE,St):i.texImage2D(dt+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,St);return it}const K={};K[i.TEXTURE_2D]=Kt(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Kt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Kt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Kt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(ns),at(!1),ct(Co),et(i.CULL_FACE),st(Un);function et(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function _t(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ot(N,dt){return f[N]!==dt?(i.bindFramebuffer(N,dt),f[N]=dt,N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=dt),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function yt(N,dt){let j=g,pt=!1;if(N){j=p.get(dt),j===void 0&&(j=[],p.set(dt,j));const St=N.textures;if(j.length!==St.length||j[0]!==i.COLOR_ATTACHMENT0){for(let it=0,Ut=St.length;it<Ut;it++)j[it]=i.COLOR_ATTACHMENT0+it;j.length=St.length,pt=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,pt=!0);pt&&i.drawBuffers(j)}function Bt(N){return v!==N?(i.useProgram(N),v=N,!0):!1}const ae={[Di]:i.FUNC_ADD,[nh]:i.FUNC_SUBTRACT,[ih]:i.FUNC_REVERSE_SUBTRACT};ae[sh]=i.MIN,ae[rh]=i.MAX;const nt={[ah]:i.ZERO,[oh]:i.ONE,[lh]:i.SRC_COLOR,[Yl]:i.SRC_ALPHA,[ph]:i.SRC_ALPHA_SATURATE,[fh]:i.DST_COLOR,[hh]:i.DST_ALPHA,[ch]:i.ONE_MINUS_SRC_COLOR,[Zl]:i.ONE_MINUS_SRC_ALPHA,[dh]:i.ONE_MINUS_DST_COLOR,[uh]:i.ONE_MINUS_DST_ALPHA,[mh]:i.CONSTANT_COLOR,[gh]:i.ONE_MINUS_CONSTANT_COLOR,[_h]:i.CONSTANT_ALPHA,[xh]:i.ONE_MINUS_CONSTANT_ALPHA};function st(N,dt,j,pt,St,it,Ut,Ct,fe,ie){if(N===Un){m===!0&&(_t(i.BLEND),m=!1);return}if(m===!1&&(et(i.BLEND),m=!0),N!==eh){if(N!==d||ie!==P){if((b!==Di||y!==Di)&&(i.blendEquation(i.FUNC_ADD),b=Di,y=Di),ie)switch(N){case Ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Po:i.blendFunc(i.ONE,i.ONE);break;case Lo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Do:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:te("WebGLState: Invalid blending: ",N);break}else switch(N){case Ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Po:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Lo:te("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Do:te("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:te("WebGLState: Invalid blending: ",N);break}A=null,S=null,E=null,C=null,x.set(0,0,0),w=0,d=N,P=ie}return}St=St||dt,it=it||j,Ut=Ut||pt,(dt!==b||St!==y)&&(i.blendEquationSeparate(ae[dt],ae[St]),b=dt,y=St),(j!==A||pt!==S||it!==E||Ut!==C)&&(i.blendFuncSeparate(nt[j],nt[pt],nt[it],nt[Ut]),A=j,S=pt,E=it,C=Ut),(Ct.equals(x)===!1||fe!==w)&&(i.blendColor(Ct.r,Ct.g,Ct.b,fe),x.copy(Ct),w=fe),d=N,P=!1}function rt(N,dt){N.side===Ln?_t(i.CULL_FACE):et(i.CULL_FACE);let j=N.side===Be;dt&&(j=!j),at(j),N.blending===Ji&&N.transparent===!1?st(Un):st(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const pt=N.stencilWrite;o.setTest(pt),pt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),It(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):_t(i.SAMPLE_ALPHA_TO_COVERAGE)}function at(N){U!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),U=N)}function ct(N){N!==Qc?(et(i.CULL_FACE),N!==F&&(N===Co?i.cullFace(i.BACK):N===jc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_t(i.CULL_FACE),F=N}function Nt(N){N!==z&&(W&&i.lineWidth(N),z=N)}function It(N,dt,j){N?(et(i.POLYGON_OFFSET_FILL),(D!==dt||B!==j)&&(D=dt,B=j,a.getReversed()&&(dt=-dt),i.polygonOffset(dt,j))):_t(i.POLYGON_OFFSET_FILL)}function zt(N){N?et(i.SCISSOR_TEST):_t(i.SCISSOR_TEST)}function Gt(N){N===void 0&&(N=i.TEXTURE0+X-1),Y!==N&&(i.activeTexture(N),Y=N)}function L(N,dt,j){j===void 0&&(Y===null?j=i.TEXTURE0+X-1:j=Y);let pt=J[j];pt===void 0&&(pt={type:void 0,texture:void 0},J[j]=pt),(pt.type!==N||pt.texture!==dt)&&(Y!==j&&(i.activeTexture(j),Y=j),i.bindTexture(N,dt||K[N]),pt.type=N,pt.texture=dt)}function ne(){const N=J[Y];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Jt(){try{i.compressedTexImage2D(...arguments)}catch(N){te("WebGLState:",N)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(N){te("WebGLState:",N)}}function _(){try{i.texSubImage2D(...arguments)}catch(N){te("WebGLState:",N)}}function O(){try{i.texSubImage3D(...arguments)}catch(N){te("WebGLState:",N)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(N){te("WebGLState:",N)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(N){te("WebGLState:",N)}}function ot(){try{i.texStorage2D(...arguments)}catch(N){te("WebGLState:",N)}}function lt(){try{i.texStorage3D(...arguments)}catch(N){te("WebGLState:",N)}}function Z(){try{i.texImage2D(...arguments)}catch(N){te("WebGLState:",N)}}function tt(){try{i.texImage3D(...arguments)}catch(N){te("WebGLState:",N)}}function ut(N){return u[N]!==void 0?u[N]:i.getParameter(N)}function Lt(N,dt){u[N]!==dt&&(i.pixelStorei(N,dt),u[N]=dt)}function gt(N){Zt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Zt.copy(N))}function ft(N){qt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),qt.copy(N))}function Dt(N,dt){let j=l.get(dt);j===void 0&&(j=new WeakMap,l.set(dt,j));let pt=j.get(N);pt===void 0&&(pt=i.getUniformBlockIndex(dt,N.name),j.set(N,pt))}function Ft(N,dt){const pt=l.get(dt).get(N);c.get(dt)!==pt&&(i.uniformBlockBinding(dt,pt,N.__bindingPointIndex),c.set(dt,pt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},Y=null,J={},f={},p=new WeakMap,g=[],v=null,m=!1,d=null,b=null,A=null,S=null,y=null,E=null,C=null,x=new Xt(0,0,0),w=0,P=!1,U=null,F=null,z=null,D=null,B=null,Zt.set(0,0,i.canvas.width,i.canvas.height),qt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:_t,bindFramebuffer:Ot,drawBuffers:yt,useProgram:Bt,setBlending:st,setMaterial:rt,setFlipSided:at,setCullFace:ct,setLineWidth:Nt,setPolygonOffset:It,setScissorTest:zt,activeTexture:Gt,bindTexture:L,unbindTexture:ne,compressedTexImage2D:Jt,compressedTexImage3D:T,texImage2D:Z,texImage3D:tt,pixelStorei:Lt,getParameter:ut,updateUBOMapping:Dt,uniformBlockBinding:Ft,texStorage2D:ot,texStorage3D:lt,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:k,compressedTexSubImage3D:$,scissor:gt,viewport:ft,reset:Wt}}function r0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new mt,h=new WeakMap,u=new Set;let f;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,_){return g?new OffscreenCanvas(T,_):ir("canvas")}function m(T,_,O){let k=1;const $=Jt(T);if(($.width>O||$.height>O)&&(k=O/Math.max($.width,$.height)),k<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ot=Math.floor(k*$.width),lt=Math.floor(k*$.height);f===void 0&&(f=v(ot,lt));const Z=_?v(ot,lt):f;return Z.width=ot,Z.height=lt,Z.getContext("2d").drawImage(T,0,0,ot,lt),Ht("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ot+"x"+lt+")."),Z}else return"data"in T&&Ht("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),T;return T}function d(T){return T.generateMipmaps}function b(T){i.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(T,_,O,k,$,ot=!1){if(T!==null){if(i[T]!==void 0)return i[T];Ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let lt;k&&(lt=t.get("EXT_texture_norm16"),lt||Ht("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=_;if(_===i.RED&&(O===i.FLOAT&&(Z=i.R32F),O===i.HALF_FLOAT&&(Z=i.R16F),O===i.UNSIGNED_BYTE&&(Z=i.R8),O===i.UNSIGNED_SHORT&&lt&&(Z=lt.R16_EXT),O===i.SHORT&&lt&&(Z=lt.R16_SNORM_EXT)),_===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.R8UI),O===i.UNSIGNED_SHORT&&(Z=i.R16UI),O===i.UNSIGNED_INT&&(Z=i.R32UI),O===i.BYTE&&(Z=i.R8I),O===i.SHORT&&(Z=i.R16I),O===i.INT&&(Z=i.R32I)),_===i.RG&&(O===i.FLOAT&&(Z=i.RG32F),O===i.HALF_FLOAT&&(Z=i.RG16F),O===i.UNSIGNED_BYTE&&(Z=i.RG8),O===i.UNSIGNED_SHORT&&lt&&(Z=lt.RG16_EXT),O===i.SHORT&&lt&&(Z=lt.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RG8UI),O===i.UNSIGNED_SHORT&&(Z=i.RG16UI),O===i.UNSIGNED_INT&&(Z=i.RG32UI),O===i.BYTE&&(Z=i.RG8I),O===i.SHORT&&(Z=i.RG16I),O===i.INT&&(Z=i.RG32I)),_===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),O===i.UNSIGNED_INT&&(Z=i.RGB32UI),O===i.BYTE&&(Z=i.RGB8I),O===i.SHORT&&(Z=i.RGB16I),O===i.INT&&(Z=i.RGB32I)),_===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),O===i.UNSIGNED_INT&&(Z=i.RGBA32UI),O===i.BYTE&&(Z=i.RGBA8I),O===i.SHORT&&(Z=i.RGBA16I),O===i.INT&&(Z=i.RGBA32I)),_===i.RGB&&(O===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGB16_EXT),O===i.SHORT&&lt&&(Z=lt.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),_===i.RGBA){const tt=ot?er:jt.getTransfer($);O===i.FLOAT&&(Z=i.RGBA32F),O===i.HALF_FLOAT&&(Z=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Z=tt===oe?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGBA16_EXT),O===i.SHORT&&lt&&(Z=lt.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function y(T,_){let O;return T?_===null||_===En||_===ss?O=i.DEPTH24_STENCIL8:_===xn?O=i.DEPTH32F_STENCIL8:_===is&&(O=i.DEPTH24_STENCIL8,Ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===En||_===ss?O=i.DEPTH_COMPONENT24:_===xn?O=i.DEPTH_COMPONENT32F:_===is&&(O=i.DEPTH_COMPONENT16),O}function E(T,_){return d(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ce&&T.minFilter!==Ue?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function C(T){const _=T.target;_.removeEventListener("dispose",C),w(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&u.delete(_)}function x(T){const _=T.target;_.removeEventListener("dispose",x),U(_)}function w(T){const _=n.get(T);if(_.__webglInit===void 0)return;const O=T.source,k=p.get(O);if(k){const $=k[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&P(T),Object.keys(k).length===0&&p.delete(O)}n.remove(T)}function P(T){const _=n.get(T);i.deleteTexture(_.__webglTexture);const O=T.source,k=p.get(O);delete k[_.__cacheKey],a.memory.textures--}function U(T){const _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(_.__webglFramebuffer[k]))for(let $=0;$<_.__webglFramebuffer[k].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[k][$]);else i.deleteFramebuffer(_.__webglFramebuffer[k]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[k])}else{if(Array.isArray(_.__webglFramebuffer))for(let k=0;k<_.__webglFramebuffer.length;k++)i.deleteFramebuffer(_.__webglFramebuffer[k]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let k=0;k<_.__webglColorRenderbuffer.length;k++)_.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[k]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const O=T.textures;for(let k=0,$=O.length;k<$;k++){const ot=n.get(O[k]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),a.memory.textures--),n.remove(O[k])}n.remove(T)}let F=0;function z(){F=0}function D(){return F}function B(T){F=T}function X(){const T=F;return T>=s.maxTextures&&Ht("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,T}function W(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function Q(T,_){const O=n.get(T);if(T.isVideoTexture&&L(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){const k=T.image;if(k===null)Ht("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Ht("WebGLRenderer: Texture marked for update but image is incomplete");else{_t(O,T,_);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+_)}function H(T,_){const O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){_t(O,T,_);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+_)}function Y(T,_){const O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){_t(O,T,_);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+_)}function J(T,_){const O=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&O.__version!==T.version){Ot(O,T,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+_)}const wt={[la]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[ca]:i.MIRRORED_REPEAT},Mt={[Ce]:i.NEAREST,[Mh]:i.NEAREST_MIPMAP_NEAREST,[ps]:i.NEAREST_MIPMAP_LINEAR,[Ue]:i.LINEAR,[gr]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},Zt={[wh]:i.NEVER,[Ph]:i.ALWAYS,[Th]:i.LESS,[to]:i.LEQUAL,[Ah]:i.EQUAL,[eo]:i.GEQUAL,[Rh]:i.GREATER,[Ch]:i.NOTEQUAL};function qt(T,_){if(_.type===xn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ue||_.magFilter===gr||_.magFilter===ps||_.magFilter===ii||_.minFilter===Ue||_.minFilter===gr||_.minFilter===ps||_.minFilter===ii)&&Ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,wt[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,wt[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,wt[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Mt[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Mt[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Zt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ce||_.minFilter!==ps&&_.minFilter!==ii||_.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Kt(T,_){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",C));const k=_.source;let $=p.get(k);$===void 0&&($={},p.set(k,$));const ot=W(_);if(ot!==T.__cacheKey){$[ot]===void 0&&($[ot]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),$[ot].usedTimes++;const lt=$[T.__cacheKey];lt!==void 0&&($[T.__cacheKey].usedTimes--,lt.usedTimes===0&&P(_)),T.__cacheKey=ot,T.__webglTexture=$[ot].texture}return O}function K(T,_,O){return Math.floor(Math.floor(T/O)/_)}function et(T,_,O,k){const ot=T.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,O,k,_.data);else{ot.sort((Lt,gt)=>Lt.start-gt.start);let lt=0;for(let Lt=1;Lt<ot.length;Lt++){const gt=ot[lt],ft=ot[Lt],Dt=gt.start+gt.count,Ft=K(ft.start,_.width,4),Wt=K(gt.start,_.width,4);ft.start<=Dt+1&&Ft===Wt&&K(ft.start+ft.count-1,_.width,4)===Ft?gt.count=Math.max(gt.count,ft.start+ft.count-gt.start):(++lt,ot[lt]=ft)}ot.length=lt+1;const Z=e.getParameter(i.UNPACK_ROW_LENGTH),tt=e.getParameter(i.UNPACK_SKIP_PIXELS),ut=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Lt=0,gt=ot.length;Lt<gt;Lt++){const ft=ot[Lt],Dt=Math.floor(ft.start/4),Ft=Math.ceil(ft.count/4),Wt=Dt%_.width,N=Math.floor(Dt/_.width),dt=Ft,j=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),e.pixelStorei(i.UNPACK_SKIP_ROWS,N),e.texSubImage2D(i.TEXTURE_2D,0,Wt,N,dt,j,O,k,_.data)}T.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(i.UNPACK_SKIP_ROWS,ut)}}function _t(T,_,O){let k=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(k=i.TEXTURE_3D);const $=Kt(T,_),ot=_.source;e.bindTexture(k,T.__webglTexture,i.TEXTURE0+O);const lt=n.get(ot);if(ot.version!==lt.__version||$===!0){if(e.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const j=jt.getPrimaries(jt.workingColorSpace),pt=_.colorSpace===Xn?null:jt.getPrimaries(_.colorSpace),St=_.colorSpace===Xn||j===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let tt=m(_.image,!1,s.maxTextureSize);tt=ne(_,tt);const ut=r.convert(_.format,_.colorSpace),Lt=r.convert(_.type);let gt=S(_.internalFormat,ut,Lt,_.normalized,_.colorSpace,_.isVideoTexture);qt(k,_);let ft;const Dt=_.mipmaps,Ft=_.isVideoTexture!==!0,Wt=lt.__version===void 0||$===!0,N=ot.dataReady,dt=E(_,tt);if(_.isDepthTexture)gt=y(_.format===si,_.type),Wt&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,gt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,gt,tt.width,tt.height,0,ut,Lt,null));else if(_.isDataTexture)if(Dt.length>0){Ft&&Wt&&e.texStorage2D(i.TEXTURE_2D,dt,gt,Dt[0].width,Dt[0].height);for(let j=0,pt=Dt.length;j<pt;j++)ft=Dt[j],Ft?N&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ft.width,ft.height,ut,Lt,ft.data):e.texImage2D(i.TEXTURE_2D,j,gt,ft.width,ft.height,0,ut,Lt,ft.data);_.generateMipmaps=!1}else Ft?(Wt&&e.texStorage2D(i.TEXTURE_2D,dt,gt,tt.width,tt.height),N&&et(_,tt,ut,Lt)):e.texImage2D(i.TEXTURE_2D,0,gt,tt.width,tt.height,0,ut,Lt,tt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ft&&Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,gt,Dt[0].width,Dt[0].height,tt.depth);for(let j=0,pt=Dt.length;j<pt;j++)if(ft=Dt[j],_.format!==cn)if(ut!==null)if(Ft){if(N)if(_.layerUpdates.size>0){const St=fl(ft.width,ft.height,_.format,_.type);for(const it of _.layerUpdates){const Ut=ft.data.subarray(it*St/ft.data.BYTES_PER_ELEMENT,(it+1)*St/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,it,ft.width,ft.height,1,ut,Ut)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ft.width,ft.height,tt.depth,ut,ft.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,gt,ft.width,ft.height,tt.depth,0,ft.data,0,0);else Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,ft.width,ft.height,tt.depth,ut,Lt,ft.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,gt,ft.width,ft.height,tt.depth,0,ut,Lt,ft.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ft&&Wt&&e.texStorage2D(i.TEXTURE_2D,dt,gt,Dt[0].width,Dt[0].height);for(let j=0,pt=Dt.length;j<pt;j++)ft=Dt[j],_.format!==cn?ut!==null?Ft?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,ft.width,ft.height,ut,ft.data):e.compressedTexImage2D(i.TEXTURE_2D,j,gt,ft.width,ft.height,0,ft.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?N&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ft.width,ft.height,ut,Lt,ft.data):e.texImage2D(i.TEXTURE_2D,j,gt,ft.width,ft.height,0,ut,Lt,ft.data)}else if(_.isDataArrayTexture)if(Ft){if(Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,gt,tt.width,tt.height,tt.depth),N)if(_.layerUpdates.size>0){const j=fl(tt.width,tt.height,_.format,_.type);for(const pt of _.layerUpdates){const St=tt.data.subarray(pt*j/tt.data.BYTES_PER_ELEMENT,(pt+1)*j/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pt,tt.width,tt.height,1,ut,Lt,St)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ut,Lt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,gt,tt.width,tt.height,tt.depth,0,ut,Lt,tt.data);else if(_.isData3DTexture)Ft?(Wt&&e.texStorage3D(i.TEXTURE_3D,dt,gt,tt.width,tt.height,tt.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ut,Lt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,gt,tt.width,tt.height,tt.depth,0,ut,Lt,tt.data);else if(_.isFramebufferTexture){if(Wt)if(Ft)e.texStorage2D(i.TEXTURE_2D,dt,gt,tt.width,tt.height);else{let j=tt.width,pt=tt.height;for(let St=0;St<dt;St++)e.texImage2D(i.TEXTURE_2D,St,gt,j,pt,0,ut,Lt,null),j>>=1,pt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),tt.parentNode!==j){j.appendChild(tt),u.add(_),j.onpaint=pt=>{const St=pt.changedElements;for(const it of u)St.includes(it.image)&&(it.needsUpdate=!0)},j.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,tt);else{const St=i.RGBA,it=i.RGBA,Ut=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,St,it,Ut,tt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Ft&&Wt){const j=Jt(Dt[0]);e.texStorage2D(i.TEXTURE_2D,dt,gt,j.width,j.height)}for(let j=0,pt=Dt.length;j<pt;j++)ft=Dt[j],Ft?N&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ut,Lt,ft):e.texImage2D(i.TEXTURE_2D,j,gt,ut,Lt,ft);_.generateMipmaps=!1}else if(Ft){if(Wt){const j=Jt(tt);e.texStorage2D(i.TEXTURE_2D,dt,gt,j.width,j.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Lt,tt)}else e.texImage2D(i.TEXTURE_2D,0,gt,ut,Lt,tt);d(_)&&b(k),lt.__version=ot.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ot(T,_,O){if(_.image.length!==6)return;const k=Kt(T,_),$=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+O);const ot=n.get($);if($.version!==ot.__version||k===!0){e.activeTexture(i.TEXTURE0+O);const lt=jt.getPrimaries(jt.workingColorSpace),Z=_.colorSpace===Xn?null:jt.getPrimaries(_.colorSpace),tt=_.colorSpace===Xn||lt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);const ut=_.isCompressedTexture||_.image[0].isCompressedTexture,Lt=_.image[0]&&_.image[0].isDataTexture,gt=[];for(let it=0;it<6;it++)!ut&&!Lt?gt[it]=m(_.image[it],!0,s.maxCubemapSize):gt[it]=Lt?_.image[it].image:_.image[it],gt[it]=ne(_,gt[it]);const ft=gt[0],Dt=r.convert(_.format,_.colorSpace),Ft=r.convert(_.type),Wt=S(_.internalFormat,Dt,Ft,_.normalized,_.colorSpace),N=_.isVideoTexture!==!0,dt=ot.__version===void 0||k===!0,j=$.dataReady;let pt=E(_,ft);qt(i.TEXTURE_CUBE_MAP,_);let St;if(ut){N&&dt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Wt,ft.width,ft.height);for(let it=0;it<6;it++){St=gt[it].mipmaps;for(let Ut=0;Ut<St.length;Ut++){const Ct=St[Ut];_.format!==cn?Dt!==null?N?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ut,0,0,Ct.width,Ct.height,Dt,Ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ut,Wt,Ct.width,Ct.height,0,Ct.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ut,0,0,Ct.width,Ct.height,Dt,Ft,Ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ut,Wt,Ct.width,Ct.height,0,Dt,Ft,Ct.data)}}}else{if(St=_.mipmaps,N&&dt){St.length>0&&pt++;const it=Jt(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Wt,it.width,it.height)}for(let it=0;it<6;it++)if(Lt){N?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,gt[it].width,gt[it].height,Dt,Ft,gt[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Wt,gt[it].width,gt[it].height,0,Dt,Ft,gt[it].data);for(let Ut=0;Ut<St.length;Ut++){const fe=St[Ut].image[it].image;N?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ut+1,0,0,fe.width,fe.height,Dt,Ft,fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ut+1,Wt,fe.width,fe.height,0,Dt,Ft,fe.data)}}else{N?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Dt,Ft,gt[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Wt,Dt,Ft,gt[it]);for(let Ut=0;Ut<St.length;Ut++){const Ct=St[Ut];N?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ut+1,0,0,Dt,Ft,Ct.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ut+1,Wt,Dt,Ft,Ct.image[it])}}}d(_)&&b(i.TEXTURE_CUBE_MAP),ot.__version=$.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function yt(T,_,O,k,$,ot){const lt=r.convert(O.format,O.colorSpace),Z=r.convert(O.type),tt=S(O.internalFormat,lt,Z,O.normalized,O.colorSpace),ut=n.get(_),Lt=n.get(O);if(Lt.__renderTarget=_,!ut.__hasExternalTextures){const gt=Math.max(1,_.width>>ot),ft=Math.max(1,_.height>>ot);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,ot,tt,gt,ft,_.depth,0,lt,Z,null):e.texImage2D($,ot,tt,gt,ft,0,lt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),Gt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,$,Lt.__webglTexture,0,zt(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,$,Lt.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Bt(T,_,O){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){const k=_.depthTexture,$=k&&k.isDepthTexture?k.type:null,ot=y(_.stencilBuffer,$),lt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Gt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt(_),ot,_.width,_.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt(_),ot,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ot,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,T)}else{const k=_.textures;for(let $=0;$<k.length;$++){const ot=k[$],lt=r.convert(ot.format,ot.colorSpace),Z=r.convert(ot.type),tt=S(ot.internalFormat,lt,Z,ot.normalized,ot.colorSpace);Gt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt(_),tt,_.width,_.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt(_),tt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,tt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ae(T,_,O){const k=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=n.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),k){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),qt(i.TEXTURE_CUBE_MAP,_.depthTexture);const ut=r.convert(_.depthTexture.format),Lt=r.convert(_.depthTexture.type);let gt;_.depthTexture.format===Nn?gt=i.DEPTH_COMPONENT24:_.depthTexture.format===si&&(gt=i.DEPTH24_STENCIL8);for(let ft=0;ft<6;ft++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,gt,_.width,_.height,0,ut,Lt,null)}}else Q(_.depthTexture,0);const ot=$.__webglTexture,lt=zt(_),Z=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,tt=_.depthTexture.format===si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Nn)Gt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Z,ot,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,tt,Z,ot,0);else if(_.depthTexture.format===si)Gt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Z,ot,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,tt,Z,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(T){const _=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const k=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),k){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,k.removeEventListener("dispose",$)};k.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=k}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let k=0;k<6;k++)ae(_.__webglFramebuffer[k],T,k);else{const k=T.texture.mipmaps;k&&k.length>0?ae(_.__webglFramebuffer[0],T,0):ae(_.__webglFramebuffer,T,0)}else if(O){_.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[k]),_.__webglDepthbuffer[k]===void 0)_.__webglDepthbuffer[k]=i.createRenderbuffer(),Bt(_.__webglDepthbuffer[k],T,!1);else{const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=_.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ot)}}else{const k=T.texture.mipmaps;if(k&&k.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Bt(_.__webglDepthbuffer,T,!1);else{const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ot)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(T,_,O){const k=n.get(T);_!==void 0&&yt(k.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&nt(T)}function rt(T){const _=T.texture,O=n.get(T),k=n.get(_);T.addEventListener("dispose",x);const $=T.textures,ot=T.isWebGLCubeRenderTarget===!0,lt=$.length>1;if(lt||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=_.version,a.memory.textures++),ot){O.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[Z]=[];for(let tt=0;tt<_.mipmaps.length;tt++)O.__webglFramebuffer[Z][tt]=i.createFramebuffer()}else O.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let Z=0;Z<_.mipmaps.length;Z++)O.__webglFramebuffer[Z]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(lt)for(let Z=0,tt=$.length;Z<tt;Z++){const ut=n.get($[Z]);ut.__webglTexture===void 0&&(ut.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Gt(T)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Z=0;Z<$.length;Z++){const tt=$[Z];O.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);const ut=r.convert(tt.format,tt.colorSpace),Lt=r.convert(tt.type),gt=S(tt.internalFormat,ut,Lt,tt.normalized,tt.colorSpace,T.isXRRenderTarget===!0),ft=zt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ft,gt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,O.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Bt(O.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),qt(i.TEXTURE_CUBE_MAP,_);for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0)for(let tt=0;tt<_.mipmaps.length;tt++)yt(O.__webglFramebuffer[Z][tt],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,tt);else yt(O.__webglFramebuffer[Z],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);d(_)&&b(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let Z=0,tt=$.length;Z<tt;Z++){const ut=$[Z],Lt=n.get(ut);let gt=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(gt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,Lt.__webglTexture),qt(gt,ut),yt(O.__webglFramebuffer,T,ut,i.COLOR_ATTACHMENT0+Z,gt,0),d(ut)&&b(gt)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Z=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,k.__webglTexture),qt(Z,_),_.mipmaps&&_.mipmaps.length>0)for(let tt=0;tt<_.mipmaps.length;tt++)yt(O.__webglFramebuffer[tt],T,_,i.COLOR_ATTACHMENT0,Z,tt);else yt(O.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,Z,0);d(_)&&b(Z),e.unbindTexture()}T.depthBuffer&&nt(T)}function at(T){const _=T.textures;for(let O=0,k=_.length;O<k;O++){const $=_[O];if(d($)){const ot=A(T),lt=n.get($).__webglTexture;e.bindTexture(ot,lt),b(ot),e.unbindTexture()}}}const ct=[],Nt=[];function It(T){if(T.samples>0){if(Gt(T)===!1){const _=T.textures,O=T.width,k=T.height;let $=i.COLOR_BUFFER_BIT;const ot=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(T),Z=_.length>1;if(Z)for(let ut=0;ut<_.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const tt=T.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ut=0;ut<_.length;ut++){if(T.resolveDepthBuffer&&(T.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ut]);const Lt=n.get(_[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Lt,0)}i.blitFramebuffer(0,0,O,k,0,0,O,k,$,i.NEAREST),c===!0&&(ct.length=0,Nt.length=0,ct.push(i.COLOR_ATTACHMENT0+ut),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(ct.push(ot),Nt.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ct))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ut=0;ut<_.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ut]);const Lt=n.get(_[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,Lt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){const _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function zt(T){return Math.min(s.maxSamples,T.samples)}function Gt(T){const _=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(T){const _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function ne(T,_){const O=T.colorSpace,k=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==tr&&O!==Xn&&(jt.getTransfer(O)===oe?(k!==cn||$!==Je)&&Ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):te("WebGLTextures: Unsupported texture color space:",O)),_}function Jt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=z,this.getTextureUnits=D,this.setTextureUnits=B,this.setTexture2D=Q,this.setTexture2DArray=H,this.setTexture3D=Y,this.setTextureCube=J,this.rebindTextures=st,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=Gt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function a0(i,t){function e(n,s=Xn){let r;const a=jt.getTransfer(s);if(n===Je)return i.UNSIGNED_BYTE;if(n===Za)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ka)return i.UNSIGNED_SHORT_5_5_5_1;if(n===oc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===lc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rc)return i.BYTE;if(n===ac)return i.SHORT;if(n===is)return i.UNSIGNED_SHORT;if(n===Ya)return i.INT;if(n===En)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===bn)return i.HALF_FLOAT;if(n===cc)return i.ALPHA;if(n===hc)return i.RGB;if(n===cn)return i.RGBA;if(n===Nn)return i.DEPTH_COMPONENT;if(n===si)return i.DEPTH_STENCIL;if(n===uc)return i.RED;if(n===Ja)return i.RED_INTEGER;if(n===li)return i.RG;if(n===Qa)return i.RG_INTEGER;if(n===ja)return i.RGBA_INTEGER;if(n===$s||n===Ys||n===Zs||n===Ks)if(a===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$s)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$s)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ks)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ha||n===ua||n===fa||n===da)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ha)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pa||n===ma||n===ga||n===_a||n===xa||n===Qs||n===va)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===pa||n===ma)return a===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ga)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===_a)return r.COMPRESSED_R11_EAC;if(n===xa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Qs)return r.COMPRESSED_RG11_EAC;if(n===va)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Sa||n===Ma||n===ya||n===Ea||n===ba||n===wa||n===Ta||n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ua)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ma)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ya)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ea)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ba)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ta)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Aa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ra)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ca)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===La)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Da)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ua)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ia||n===Na||n===Fa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ia)return a===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Na)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Oa||n===Ba||n===js||n===za)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Oa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ba)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===js)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const o0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class c0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Mc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new $e({vertexShader:o0,fragmentShader:l0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new qe(new us(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h0 extends hi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",m=new c0,d={},b=e.getContextAttributes();let A=null,S=null;const y=[],E=[],C=new mt;let x=null,w=null;const P=new an;P.viewport=new ue;const U=new an;U.viewport=new ue;const F=[P,U],z=new pf;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let et=y[K];return et===void 0&&(et=new Er,y[K]=et),et.getTargetRaySpace()},this.getControllerGrip=function(K){let et=y[K];return et===void 0&&(et=new Er,y[K]=et),et.getGripSpace()},this.getHand=function(K){let et=y[K];return et===void 0&&(et=new Er,y[K]=et),et.getHandSpace()};function X(K){const et=E.indexOf(K.inputSource);if(et===-1)return;const _t=y[et];_t!==void 0&&(_t.update(K.inputSource,K.frame,l||a),_t.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Q);for(let K=0;K<y.length;K++){const et=E[K];et!==null&&(E[K]=null,y[K].disconnect(et))}D=null,B=null,m.reset();for(const K in d)delete d[K];if(t.setRenderTarget(A),p=null,f=null,u=null,s=null,S=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(C.width,C.height,!1),w!==null){const K=w.camera;K.fov=w.fov,K.zoom=w.zoom,K.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Q),b.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Ot=null,yt=null;b.depth&&(yt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=b.stencil?si:Nn,Ot=b.stencil?ss:En);const Bt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Bt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new hn(f.textureWidth,f.textureHeight,{format:cn,type:Je,depthTexture:new as(f.textureWidth,f.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const _t={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new hn(p.framebufferWidth,p.framebufferHeight,{format:cn,type:Je,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(K){for(let et=0;et<K.removed.length;et++){const _t=K.removed[et],Ot=E.indexOf(_t);Ot>=0&&(E[Ot]=null,y[Ot].disconnect(_t))}for(let et=0;et<K.added.length;et++){const _t=K.added[et];let Ot=E.indexOf(_t);if(Ot===-1){for(let Bt=0;Bt<y.length;Bt++)if(Bt>=E.length){E.push(_t),Ot=Bt;break}else if(E[Bt]===null){E[Bt]=_t,Ot=Bt;break}if(Ot===-1)break}const yt=y[Ot];yt&&yt.connect(_t)}}const H=new R,Y=new R;function J(K,et,_t){H.setFromMatrixPosition(et.matrixWorld),Y.setFromMatrixPosition(_t.matrixWorld);const Ot=H.distanceTo(Y),yt=et.projectionMatrix.elements,Bt=_t.projectionMatrix.elements,ae=yt[14]/(yt[10]-1),nt=yt[14]/(yt[10]+1),st=(yt[9]+1)/yt[5],rt=(yt[9]-1)/yt[5],at=(yt[8]-1)/yt[0],ct=(Bt[8]+1)/Bt[0],Nt=ae*at,It=ae*ct,zt=Ot/(-at+ct),Gt=zt*-at;if(et.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Gt),K.translateZ(zt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),yt[10]===-1)K.projectionMatrix.copy(et.projectionMatrix),K.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const L=ae+zt,ne=nt+zt,Jt=Nt-Gt,T=It+(Ot-Gt),_=st*nt/ne*L,O=rt*nt/ne*L;K.projectionMatrix.makePerspective(Jt,T,_,O,L,ne),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function wt(K,et){et===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(et.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let et=K.near,_t=K.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(_t=m.depthFar)),z.near=U.near=P.near=et,z.far=U.far=P.far=_t,(D!==z.near||B!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),D=z.near,B=z.far),z.layers.mask=K.layers.mask|6,P.layers.mask=z.layers.mask&-5,U.layers.mask=z.layers.mask&-3;const Ot=K.parent,yt=z.cameras;wt(z,Ot);for(let Bt=0;Bt<yt.length;Bt++)wt(yt[Bt],Ot);yt.length===2?J(z,P,U):z.projectionMatrix.copy(P.projectionMatrix),w===null&&K.isPerspectiveCamera&&(w={camera:K,fov:K.fov,zoom:K.zoom}),Mt(K,z,Ot)};function Mt(K,et,_t){_t===null?K.matrix.copy(et.matrixWorld):(K.matrix.copy(_t.matrixWorld),K.matrix.invert(),K.matrix.multiply(et.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(et.projectionMatrix),K.projectionMatrixInverse.copy(et.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=rs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(K){c=K,f!==null&&(f.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(K){return d[K]};let Zt=null;function qt(K,et){if(h=et.getViewerPose(l||a),g=et,h!==null){const _t=h.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let Ot=!1;_t.length!==z.cameras.length&&(z.cameras.length=0,Ot=!0);for(let nt=0;nt<_t.length;nt++){const st=_t[nt];let rt=null;if(p!==null)rt=p.getViewport(st);else{const ct=u.getViewSubImage(f,st);rt=ct.viewport,nt===0&&(t.setRenderTargetTextures(S,ct.colorTexture,ct.depthStencilTexture),t.setRenderTarget(S))}let at=F[nt];at===void 0&&(at=new an,at.layers.enable(nt),at.viewport=new ue,F[nt]=at),at.matrix.fromArray(st.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(st.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(rt.x,rt.y,rt.width,rt.height),nt===0&&(z.matrix.copy(at.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ot===!0&&z.cameras.push(at)}const yt=s.enabledFeatures;if(yt&&yt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const nt=u.getDepthInformation(_t[0]);nt&&nt.isValid&&nt.texture&&m.init(nt,s.renderState)}if(yt&&yt.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let nt=0;nt<_t.length;nt++){const st=_t[nt].camera;if(st){let rt=d[st];rt||(rt=new Mc,d[st]=rt);const at=u.getCameraImage(st);rt.sourceTexture=at}}}}for(let _t=0;_t<y.length;_t++){const Ot=E[_t],yt=y[_t];Ot!==null&&yt!==void 0&&yt.update(Ot,et,l||a)}Zt&&Zt(K,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Kt=new Uc;Kt.setAnimationLoop(qt),this.setAnimationLoop=function(K){Zt=K},this.dispose=function(){}}}const u0=new ge,Hc=new Vt;Hc.set(-1,0,0,0,1,0,0,0,1);function f0(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Lc(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,b,A,S){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),v(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,b,A):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Be&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Be&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const b=t.get(d),A=b.envMap,S=b.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(u0.makeRotationFromEuler(S)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Hc),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,b,A){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=A*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Be&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const b=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function d0(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,y){const E=y.program;n.uniformBlockBinding(S,E)}function l(S,y){let E=s[S.id];E===void 0&&(m(S),E=h(S),s[S.id]=E,S.addEventListener("dispose",b));const C=y.program;n.updateUBOMapping(S,C);const x=t.render.frame;r[S.id]!==x&&(f(S),r[S.id]=x)}function h(S){const y=u();S.__bindingPointIndex=y;const E=i.createBuffer(),C=S.__size,x=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,C,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,E),E}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return te("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const y=s[S.id],E=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let x=0,w=E.length;x<w;x++){const P=E[x];if(Array.isArray(P))for(let U=0,F=P.length;U<F;U++)p(P[U],x,U,C);else p(P,x,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,y,E,C){if(v(S,y,E,C)===!0){const x=S.__offset,w=S.value;if(Array.isArray(w)){let P=0;for(let U=0;U<w.length;U++){const F=w[U],z=d(F);g(F,S.__data,P),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(P+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,S.__data)}}function g(S,y,E){typeof S=="number"||typeof S=="boolean"?y[0]=S:S.isMatrix3?(y[0]=S.elements[0],y[1]=S.elements[1],y[2]=S.elements[2],y[3]=0,y[4]=S.elements[3],y[5]=S.elements[4],y[6]=S.elements[5],y[7]=0,y[8]=S.elements[6],y[9]=S.elements[7],y[10]=S.elements[8],y[11]=0):ArrayBuffer.isView(S)?y.set(new S.constructor(S.buffer,S.byteOffset,y.length)):S.toArray(y,E)}function v(S,y,E,C){const x=S.value,w=y+"_"+E;if(C[w]===void 0)return typeof x=="number"||typeof x=="boolean"?C[w]=x:ArrayBuffer.isView(x)?C[w]=x.slice():C[w]=x.clone(),!0;{const P=C[w];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return C[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function m(S){const y=S.uniforms;let E=0;const C=16;for(let w=0,P=y.length;w<P;w++){const U=Array.isArray(y[w])?y[w]:[y[w]];for(let F=0,z=U.length;F<z;F++){const D=U[F],B=Array.isArray(D.value)?D.value:[D.value];for(let X=0,W=B.length;X<W;X++){const Q=B[X],H=d(Q),Y=E%C,J=Y%H.boundary,wt=Y+J;E+=J,wt!==0&&C-wt<H.storage&&(E+=C-wt),D.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=H.storage}}}const x=E%C;return x>0&&(E+=C-x),S.__size=E,S.__cache={},this}function d(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?Ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(y.boundary=16,y.storage=S.byteLength):Ht("WebGLRenderer: Unsupported uniform value type.",S),y}function b(S){const y=S.target;y.removeEventListener("dispose",b);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function A(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:A}}const p0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let pn=null;function m0(){return pn===null&&(pn=new Su(p0,16,16,li,bn),pn.name="DFG_LUT",pn.minFilter=Ue,pn.magFilter=Ue,pn.wrapS=Dn,pn.wrapT=Dn,pn.generateMipmaps=!1,pn.needsUpdate=!0),pn}class Nl{constructor(t={}){const{canvas:e=Dh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Je}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=p,m=new Set([ja,Qa,Ja]),d=new Set([Je,En,is,ss,Za,Ka]),b=new Uint32Array(4),A=new Int32Array(4),S=new R;let y=null,E=null;const C=[],x=[];let w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let U=!1,F=null,z=null,D=null,B=null;this._outputColorSpace=Ke;let X=0,W=0,Q=null,H=-1,Y=null;const J=new ue,wt=new ue;let Mt=null;const Zt=new Xt(0);let qt=0,Kt=e.width,K=e.height,et=1,_t=null,Ot=null;const yt=new ue(0,0,Kt,K),Bt=new ue(0,0,Kt,K);let ae=!1;const nt=new vc;let st=!1,rt=!1;const at=new ge,ct=new R,Nt=new ue,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function Gt(){return Q===null?et:1}let L=n;function ne(M,I){return e.getContext(M,I)}let Jt,T,_,O,k,$,ot,lt,Z,tt,ut,Lt,gt,ft,Dt,Ft,Wt,N,dt,j,pt,St,it;try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$a}`),e.addEventListener("webglcontextlost",fe,!1),e.addEventListener("webglcontextrestored",ie,!1),e.addEventListener("webglcontextcreationerror",en,!1),L===null){const I="webgl2";if(L=ne(I,M),L===null)throw ne(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ut()}catch(M){throw e.removeEventListener("webglcontextlost",fe,!1),e.removeEventListener("webglcontextrestored",ie,!1),e.removeEventListener("webglcontextcreationerror",en,!1),te("WebGLRenderer: "+M.message),M}function Ut(){Jt=new mm(L),Jt.init(),pt=new a0(L,Jt),T=new rm(L,Jt,t,pt),_=new s0(L,Jt),T.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),z=L.createFramebuffer(),D=L.createFramebuffer(),B=L.createFramebuffer(),O=new xm(L),k=new Wg,$=new r0(L,Jt,_,k,T,pt,O),ot=new pm(P),lt=new Sf(L),St=new im(L,lt),Z=new gm(L,lt,O,St),tt=new Sm(L,Z,lt,St,O),N=new vm(L,T,$),Dt=new am(k),ut=new kg(P,ot,Jt,T,St,Dt),Lt=new f0(P,k),gt=new qg,ft=new Qg(Jt),Wt=new nm(P,ot,_,tt,g,c),Ft=new i0(P,tt,T),it=new d0(L,O,T,_),dt=new sm(L,Jt,O),j=new _m(L,Jt,O),O.programs=ut.programs,P.capabilities=T,P.extensions=Jt,P.properties=k,P.renderLists=gt,P.shadowMap=Ft,P.state=_,P.info=O}v!==Je&&(w=new ym(v,e.width,e.height,o,s,r));const Ct=new h0(P,L);this.xr=Ct,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const M=Jt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Jt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(M){M!==void 0&&(et=M,this.setSize(Kt,K,!1))},this.getSize=function(M){return M.set(Kt,K)},this.setSize=function(M,I,q=!0){if(Ct.isPresenting){Ht("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=M,K=I,e.width=Math.floor(M*et),e.height=Math.floor(I*et),q===!0&&(e.style.width=M+"px",e.style.height=I+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(Kt*et,K*et).floor()},this.setDrawingBufferSize=function(M,I,q){Kt=M,K=I,et=q,e.width=Math.floor(M*q),e.height=Math.floor(I*q),this.setViewport(0,0,M,I)},this.setEffects=function(M){if(v===Je){te("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let I=0;I<M.length;I++)if(M[I].isOutputPass===!0){Ht("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(J)},this.getViewport=function(M){return M.copy(yt)},this.setViewport=function(M,I,q,G){M.isVector4?yt.set(M.x,M.y,M.z,M.w):yt.set(M,I,q,G),_.viewport(J.copy(yt).multiplyScalar(et).round())},this.getScissor=function(M){return M.copy(Bt)},this.setScissor=function(M,I,q,G){M.isVector4?Bt.set(M.x,M.y,M.z,M.w):Bt.set(M,I,q,G),_.scissor(wt.copy(Bt).multiplyScalar(et).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(M){_.setScissorTest(ae=M)},this.setOpaqueSort=function(M){_t=M},this.setTransparentSort=function(M){Ot=M},this.getClearColor=function(M){return M.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor(...arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha(...arguments)},this.clear=function(M=!0,I=!0,q=!0){let G=0;if(M){let V=!1;if(Q!==null){const vt=Q.texture.format;V=m.has(vt)}if(V){const vt=Q.texture.type,bt=d.has(vt),xt=Wt.getClearColor(),Tt=Wt.getClearAlpha(),Pt=xt.r,$t=xt.g,Qt=xt.b;bt?(b[0]=Pt,b[1]=$t,b[2]=Qt,b[3]=Tt,L.clearBufferuiv(L.COLOR,0,b)):(A[0]=Pt,A[1]=$t,A[2]=Qt,A[3]=Tt,L.clearBufferiv(L.COLOR,0,A))}else G|=L.COLOR_BUFFER_BIT}I&&(G|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){e.removeEventListener("webglcontextlost",fe,!1),e.removeEventListener("webglcontextrestored",ie,!1),e.removeEventListener("webglcontextcreationerror",en,!1),Wt.dispose(),gt.dispose(),ft.dispose(),k.dispose(),ot.dispose(),tt.dispose(),St.dispose(),it.dispose(),ut.dispose(),Ct.dispose(),Ct.removeEventListener("sessionstart",So),Ct.removeEventListener("sessionend",Mo),Yn.stop()};function fe(M){M.preventDefault(),sr("WebGLRenderer: Context Lost."),U=!0}function ie(){sr("WebGLRenderer: Context Restored."),U=!1;const M=O.autoReset,I=Ft.enabled,q=Ft.autoUpdate,G=Ft.needsUpdate,V=Ft.type;Ut(),O.autoReset=M,Ft.enabled=I,Ft.autoUpdate=q,Ft.needsUpdate=G,Ft.type=V}function en(M){te("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function un(M){const I=M.target;I.removeEventListener("dispose",un),Wc(I)}function Wc(M){Xc(M),k.remove(M)}function Xc(M){const I=k.get(M).programs;I!==void 0&&(I.forEach(function(q){ut.releaseProgram(q)}),M.isShaderMaterial&&ut.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,q,G,V,vt){I===null&&(I=It);const bt=V.isMesh&&V.matrixWorld.determinantAffine()<0,xt=Yc(M,I,q,G,V);_.setMaterial(G,bt);let Tt=q.index,Pt=1;if(G.wireframe===!0){if(Tt=Z.getWireframeAttribute(q),Tt===void 0)return;Pt=2}const $t=q.drawRange,Qt=q.attributes.position;let At=$t.start*Pt,se=($t.start+$t.count)*Pt;vt!==null&&(At=Math.max(At,vt.start*Pt),se=Math.min(se,(vt.start+vt.count)*Pt)),Tt!==null?(At=Math.max(At,0),se=Math.min(se,Tt.count)):Qt!=null&&(At=Math.max(At,0),se=Math.min(se,Qt.count));const Me=se-At;if(Me<0||Me===1/0)return;St.setup(V,G,xt,q,Tt);let pe,he=dt;if(Tt!==null&&(pe=lt.get(Tt),he=j,he.setIndex(pe)),V.isMesh)G.wireframe===!0?(_.setLineWidth(G.wireframeLinewidth*Gt()),he.setMode(L.LINES)):he.setMode(L.TRIANGLES);else if(V.isLine){let Pe=G.linewidth;Pe===void 0&&(Pe=1),_.setLineWidth(Pe*Gt()),V.isLineSegments?he.setMode(L.LINES):V.isLineLoop?he.setMode(L.LINE_LOOP):he.setMode(L.LINE_STRIP)}else V.isPoints?he.setMode(L.POINTS):V.isSprite&&he.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(Jt.get("WEBGL_multi_draw"))he.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Pe=V._multiDrawStarts,Et=V._multiDrawCounts,Ne=V._multiDrawCount,ee=Tt?lt.get(Tt).bytesPerElement:1,Ye=k.get(G).currentProgram.getUniforms();for(let fn=0;fn<Ne;fn++)Ye.setValue(L,"_gl_DrawID",fn),he.render(Pe[fn]/ee,Et[fn])}else if(V.isInstancedMesh)he.renderInstances(At,Me,V.count);else if(q.isInstancedBufferGeometry){const Pe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Et=Math.min(q.instanceCount,Pe);he.renderInstances(At,Me,Et)}else he.render(At,Me)};function vo(M,I,q,G){F!==null&&M.isNodeMaterial&&F.setObject(G,M),st===!0&&Dt.setState(M,q,!1),M.transparent===!0&&M.side===Ln&&M.forceSinglePass===!1?(M.side=Be,M.needsUpdate=!0,ds(M,I,G),M.side=ai,M.needsUpdate=!0,ds(M,I,G),M.side=Ln):ds(M,I,G)}this.compile=function(M,I,q=null){q===null&&(q=M),F!==null&&F.renderStart(M,I,q),E=ft.get(q),E.init(I),x.push(E),q.traverseVisible(function(V){V.isLight&&V.layers.test(I.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),M!==q&&M.traverseVisible(function(V){V.isLight&&V.layers.test(I.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights(),F!==null&&F.updateLights(E.state.lightsArray),rt=this.localClippingEnabled,st=Dt.init(this.clippingPlanes,rt),st===!0&&Dt.setGlobalState(this.clippingPlanes,I),F!==null&&Ft.render(E.state.shadowsArray,q,I);const G=new Set;return M.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const vt=V.material;if(vt)if(Array.isArray(vt))for(let bt=0;bt<vt.length;bt++){const xt=vt[bt];vo(xt,q,I,V),G.add(xt)}else vo(vt,q,I,V),G.add(vt)}),E=x.pop(),F!==null&&F.renderEnd(),G},this.compileAsync=function(M,I,q=null){const G=this.compile(M,I,q);return new Promise(V=>{function vt(){if(G.forEach(function(bt){const Tt=k.get(bt).currentProgram;(Tt===void 0||Tt.isReady())&&G.delete(bt)}),G.size===0){V(M);return}setTimeout(vt,10)}Jt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let fr=null;function qc(M){fr&&fr(M)}function So(){Yn.stop()}function Mo(){Yn.start()}const Yn=new Uc;Yn.setAnimationLoop(qc),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(M){fr=M,Ct.setAnimationLoop(M),M===null?Yn.stop():Yn.start()},Ct.addEventListener("sessionstart",So),Ct.addEventListener("sessionend",Mo),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){te("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;F!==null&&F.renderStart(M,I);const q=Ct.enabled===!0&&Ct.isPresenting===!0,G=w!==null&&(Q===null||q)&&w.begin(P,Q);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ct.enabled===!0&&Ct.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ct.cameraAutoUpdate===!0&&Ct.updateCamera(I),I=Ct.getCamera()),M.isScene===!0&&M.onBeforeRender(P,M,I,Q),E=ft.get(M,x.length),E.init(I),E.state.textureUnits=$.getTextureUnits(),x.push(E),at.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),nt.setFromProjectionMatrix(at,vn,I.reversedDepth),rt=this.localClippingEnabled,st=Dt.init(this.clippingPlanes,rt),y=gt.get(M,C.length),y.init(),C.push(y),Ct.enabled===!0&&Ct.isPresenting===!0){const bt=P.xr.getDepthSensingMesh();bt!==null&&dr(bt,I,-1/0,P.sortObjects)}dr(M,I,0,P.sortObjects),y.finish(),F!==null&&F.updateLights(E.state.lightsArray),P.sortObjects===!0&&y.sort(_t,Ot),zt=Ct.enabled===!1||Ct.isPresenting===!1||Ct.hasDepthSensing()===!1,zt&&Wt.addToRenderList(y,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&Dt.beginShadows();const V=E.state.shadowsArray;if(Ft.render(V,M,I),st===!0&&Dt.endShadows(),(G&&w.hasRenderPass())===!1){const bt=y.opaque,xt=y.transmissive;if(E.setupLights(),I.isArrayCamera){const Tt=I.cameras;if(xt.length>0)for(let Pt=0,$t=Tt.length;Pt<$t;Pt++){const Qt=Tt[Pt];Eo(bt,xt,M,Qt)}zt&&Wt.render(M);for(let Pt=0,$t=Tt.length;Pt<$t;Pt++){const Qt=Tt[Pt];yo(y,M,Qt,Qt.viewport)}}else xt.length>0&&Eo(bt,xt,M,I),zt&&Wt.render(M),yo(y,M,I)}Q!==null&&W===0&&($.updateMultisampleRenderTarget(Q),$.updateRenderTargetMipmap(Q)),G&&w.end(P),M.isScene===!0&&M.onAfterRender(P,M,I),St.resetDefaultState(),H=-1,Y=null,x.pop(),x.length>0?(E=x[x.length-1],$.setTextureUnits(E.state.textureUnits),st===!0&&Dt.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?y=C[C.length-1]:y=null,F!==null&&F.renderEnd()};function dr(M,I,q,G){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)q=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(nt)){G&&Nt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(at);const bt=tt.update(M),xt=M.material;xt.visible&&y.push(M,bt,xt,q,Nt.z,null,I)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(nt))){const bt=tt.update(M),xt=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Nt.copy(M.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Nt.copy(bt.boundingSphere.center)),Nt.applyMatrix4(M.matrixWorld).applyMatrix4(at)),Array.isArray(xt)){const Tt=bt.groups;for(let Pt=0,$t=Tt.length;Pt<$t;Pt++){const Qt=Tt[Pt],At=xt[Qt.materialIndex];At&&At.visible&&y.push(M,bt,At,q,Nt.z,Qt,I)}}else xt.visible&&y.push(M,bt,xt,q,Nt.z,null,I)}}const vt=M.children;for(let bt=0,xt=vt.length;bt<xt;bt++)dr(vt[bt],I,q,G)}function yo(M,I,q,G){const{opaque:V,transmissive:vt,transparent:bt}=M;E.setupLightsView(q),st===!0&&Dt.setGlobalState(P.clippingPlanes,q),G&&_.viewport(J.copy(G)),V.length>0&&fs(V,I,q),vt.length>0&&fs(vt,I,q),bt.length>0&&fs(bt,I,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Eo(M,I,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){const At=Jt.has("EXT_color_buffer_half_float")||Jt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new hn(1,1,{generateMipmaps:!0,type:At?bn:Je,minFilter:ii,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:jt.workingColorSpace})}const vt=E.state.transmissionRenderTarget[G.id],bt=G.viewport||J;vt.setSize(bt.z*P.transmissionResolutionScale,bt.w*P.transmissionResolutionScale);const xt=P.getRenderTarget(),Tt=P.getActiveCubeFace(),Pt=P.getActiveMipmapLevel();P.setRenderTarget(vt),P.getClearColor(Zt),qt=P.getClearAlpha(),qt<1&&P.setClearColor(16777215,.5),P.clear(),zt&&Wt.render(q);const $t=P.toneMapping;P.toneMapping=Mn;const Qt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),st===!0&&Dt.setGlobalState(P.clippingPlanes,G),fs(M,q,G),$.updateMultisampleRenderTarget(vt),$.updateRenderTargetMipmap(vt),Jt.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let se=0,Me=I.length;se<Me;se++){const pe=I[se],{object:he,geometry:Pe,material:Et,group:Ne}=pe;if(Et.side===Ln&&he.layers.test(G.layers)){const ee=Et.side;Et.side=Be,Et.needsUpdate=!0,bo(he,q,G,Pe,Et,Ne),Et.side=ee,Et.needsUpdate=!0,At=!0}}At===!0&&($.updateMultisampleRenderTarget(vt),$.updateRenderTargetMipmap(vt))}P.setRenderTarget(xt,Tt,Pt),P.setClearColor(Zt,qt),Qt!==void 0&&(G.viewport=Qt),P.toneMapping=$t}function fs(M,I,q){const G=I.isScene===!0?I.overrideMaterial:null;for(let V=0,vt=M.length;V<vt;V++){const bt=M[V],{object:xt,geometry:Tt,group:Pt}=bt;let $t=bt.material;$t.allowOverride===!0&&G!==null&&($t=G),xt.layers.test(q.layers)&&bo(xt,I,q,Tt,$t,Pt)}}function bo(M,I,q,G,V,vt){F!==null&&V.isNodeMaterial&&F.setObject(M,V),M.onBeforeRender(P,I,q,G,V,vt),M.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),V.onBeforeRender(P,I,q,G,M,vt),V.transparent===!0&&V.side===Ln&&V.forceSinglePass===!1?(V.side=Be,V.needsUpdate=!0,P.renderBufferDirect(q,I,G,V,M,vt),V.side=ai,V.needsUpdate=!0,P.renderBufferDirect(q,I,G,V,M,vt),V.side=Ln):P.renderBufferDirect(q,I,G,V,M,vt),M.onAfterRender(P,I,q,G,V,vt)}function ds(M,I,q){I.isScene!==!0&&(I=It);const G=k.get(M),V=E.state.lights,vt=E.state.shadowsArray,bt=V.state.version,xt=ut.getParameters(M,V.state,vt,I,q,E.state.lightProbeGridArray),Tt=ut.getProgramCacheKey(xt);let Pt=G.programs;G.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,G.fog=I.fog;const $t=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;G.envMap=ot.get(M.envMap||G.environment,$t),G.envMapRotation=G.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Pt===void 0&&(M.addEventListener("dispose",un),Pt=new Map,G.programs=Pt);let Qt=Pt.get(Tt);if(Qt!==void 0){if(G.currentProgram===Qt&&G.lightsStateVersion===bt)return To(M,xt),Qt}else xt.uniforms=ut.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,q,xt),M.onBeforeCompile(xt,P),Qt=ut.acquireProgram(xt,Tt),Pt.set(Tt,Qt),G.uniforms=xt.uniforms;const At=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(At.clippingPlanes=Dt.uniform),To(M,xt),G.needsLights=Kc(M),G.lightsStateVersion=bt,G.needsLights&&(At.ambientLightColor.value=V.state.ambient,At.lightProbe.value=V.state.probe,At.sunLights.value=V.state.sun,At.sunLightShadows.value=V.state.sunShadow,At.directionalLights.value=V.state.directional,At.directionalLightShadows.value=V.state.directionalShadow,At.spotLights.value=V.state.spot,At.spotLightShadows.value=V.state.spotShadow,At.rectAreaLights.value=V.state.rectArea,At.ltc_1.value=V.state.rectAreaLTC1,At.ltc_2.value=V.state.rectAreaLTC2,At.pointLights.value=V.state.point,At.pointLightShadows.value=V.state.pointShadow,At.hemisphereLights.value=V.state.hemi,At.sunShadowMatrix.value=V.state.sunShadowMatrix,At.sunShadowCascade.value=V.state.sunShadowCascade,At.directionalShadowMatrix.value=V.state.directionalShadowMatrix,At.spotLightMatrix.value=V.state.spotLightMatrix,At.spotLightMap.value=V.state.spotLightMap,At.pointShadowMatrix.value=V.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=Qt,G.uniformsList=null,Qt}function wo(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=Js.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function To(M,I){const q=k.get(M);q.outputColorSpace=I.outputColorSpace,q.batching=I.batching,q.batchingColor=I.batchingColor,q.instancing=I.instancing,q.instancingColor=I.instancingColor,q.instancingMorph=I.instancingMorph,q.skinning=I.skinning,q.morphTargets=I.morphTargets,q.morphNormals=I.morphNormals,q.morphColors=I.morphColors,q.morphTargetsCount=I.morphTargetsCount,q.numClippingPlanes=I.numClippingPlanes,q.numIntersection=I.numClipIntersection,q.vertexAlphas=I.vertexAlphas,q.vertexTangents=I.vertexTangents,q.toneMapping=I.toneMapping}function $c(M,I){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;S.setFromMatrixPosition(I.matrixWorld);for(let q=0,G=M.length;q<G;q++){const V=M[q];if(V.texture!==null&&V.boundingBox.containsPoint(S))return V}return null}function Yc(M,I,q,G,V){I.isScene!==!0&&(I=It),$.resetTextureUnits();const vt=I.fog,bt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?I.environment:null,xt=Q===null?P.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:jt.workingColorSpace,Tt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Pt=ot.get(G.envMap||bt,Tt),$t=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Qt=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),At=!!q.morphAttributes.position,se=!!q.morphAttributes.normal,Me=!!q.morphAttributes.color;let pe=Mn;G.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(pe=P.toneMapping);const he=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Pe=he!==void 0?he.length:0,Et=k.get(G),Ne=E.state.lights;if(st===!0&&(rt===!0||M!==Y)){const de=M===Y&&G.id===H;Dt.setState(G,M,de)}let ee=!1;G.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==Ne.state.version||Et.outputColorSpace!==xt||V.isBatchedMesh&&Et.batching===!1||!V.isBatchedMesh&&Et.batching===!0||V.isBatchedMesh&&Et.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Et.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Et.instancing===!1||!V.isInstancedMesh&&Et.instancing===!0||V.isSkinnedMesh&&Et.skinning===!1||!V.isSkinnedMesh&&Et.skinning===!0||V.isInstancedMesh&&Et.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Et.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Et.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Et.instancingMorph===!1&&V.morphTexture!==null||Et.envMap!==Pt||G.fog===!0&&Et.fog!==vt||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==Dt.numPlanes||Et.numIntersection!==Dt.numIntersection)||Et.vertexAlphas!==$t||Et.vertexTangents!==Qt||Et.morphTargets!==At||Et.morphNormals!==se||Et.morphColors!==Me||Et.toneMapping!==pe||Et.morphTargetsCount!==Pe||!!Et.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ee=!0):(ee=!0,Et.__version=G.version);let Ye=Et.currentProgram;ee===!0&&(Ye=ds(G,I,V),F&&G.isNodeMaterial&&F.onUpdateProgram(G,Ye,Et));let fn=!1,Fn=!1,ui=!1;const ce=Ye.getUniforms(),xe=Et.uniforms;if(_.useProgram(Ye.program)&&(fn=!0,Fn=!0,ui=!0),G.id!==H&&(H=G.id,Fn=!0),Et.needsLights){const de=$c(E.state.lightProbeGridArray,V);Et.lightProbeGrid!==de&&(Et.lightProbeGrid=de,Fn=!0)}if(fn||Y!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ce.setValue(L,"projectionMatrix",M.projectionMatrix),ce.setValue(L,"viewMatrix",M.matrixWorldInverse);const Bn=ce.map.cameraPosition;Bn!==void 0&&Bn.setValue(L,ct.setFromMatrixPosition(M.matrixWorld)),T.logarithmicDepthBuffer&&ce.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ce.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),Y!==M&&(Y=M,Fn=!0,ui=!0)}if(Et.needsLights&&(Ne.state.sunShadowMap.length>0&&ce.setValue(L,"sunShadowMap",Ne.state.sunShadowMap,$),Ne.state.directionalShadowMap.length>0&&ce.setValue(L,"directionalShadowMap",Ne.state.directionalShadowMap,$),Ne.state.spotShadowMap.length>0&&ce.setValue(L,"spotShadowMap",Ne.state.spotShadowMap,$),Ne.state.pointShadowMap.length>0&&ce.setValue(L,"pointShadowMap",Ne.state.pointShadowMap,$)),V.isSkinnedMesh){ce.setOptional(L,V,"bindMatrix"),ce.setOptional(L,V,"bindMatrixInverse");const de=V.skeleton;de&&(de.boneTexture===null&&de.computeBoneTexture(),ce.setValue(L,"boneTexture",de.boneTexture,$))}V.isBatchedMesh&&(ce.setOptional(L,V,"batchingTexture"),ce.setValue(L,"batchingTexture",V._matricesTexture,$),ce.setOptional(L,V,"batchingIdTexture"),ce.setValue(L,"batchingIdTexture",V._indirectTexture,$),ce.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&ce.setValue(L,"batchingColorTexture",V._colorsTexture,$));const On=q.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&N.update(V,q,Ye),(Fn||Et.receiveShadow!==V.receiveShadow)&&(Et.receiveShadow=V.receiveShadow,ce.setValue(L,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&I.environment!==null&&(xe.envMapIntensity.value=I.environmentIntensity),xe.dfgLUT!==void 0&&(xe.dfgLUT.value=m0()),Fn){if(ce.setValue(L,"toneMappingExposure",P.toneMappingExposure),Et.needsLights&&Zc(xe,ui),vt&&G.fog===!0&&Lt.refreshFogUniforms(xe,vt),Lt.refreshMaterialUniforms(xe,G,et,K,E.state.transmissionRenderTarget[M.id]),Et.needsLights&&Et.lightProbeGrid){const de=Et.lightProbeGrid;xe.probesSH.value=de.texture,xe.probesMin.value.copy(de.boundingBox.min),xe.probesMax.value.copy(de.boundingBox.max),xe.probesResolution.value.copy(de.resolution)}Js.upload(L,wo(Et),xe,$)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Js.upload(L,wo(Et),xe,$),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ce.setValue(L,"center",V.center),ce.setValue(L,"modelViewMatrix",V.modelViewMatrix),ce.setValue(L,"normalMatrix",V.normalMatrix),ce.setValue(L,"modelMatrix",V.matrixWorld),G.uniformsGroups!==void 0){const de=G.uniformsGroups;for(let Bn=0,fi=de.length;Bn<fi;Bn++){const Ro=de[Bn];it.update(Ro,Ye),it.bind(Ro,Ye)}}return Ye}function Zc(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.sunLights.needsUpdate=I,M.sunLightShadows.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function Kc(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(M,I,q){const G=k.get(M);G.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),k.get(M.texture).__webglTexture=I,k.get(M.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,I){const q=k.get(M);q.__webglFramebuffer=I,q.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,q=0){Q=M,X=I,W=q;let G=null,V=!1,vt=!1;if(M){const xt=k.get(M);if(xt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,xt.__webglFramebuffer),J.copy(M.viewport),wt.copy(M.scissor),Mt=M.scissorTest,_.viewport(J),_.scissor(wt),_.setScissorTest(Mt),H=-1;return}else if(xt.__webglFramebuffer===void 0)$.setupRenderTarget(M);else if(xt.__hasExternalTextures)$.rebindTextures(M,k.get(M.texture).__webglTexture,k.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const $t=M.depthTexture;if(xt.__boundDepthTexture!==$t){if($t!==null&&k.has($t)&&(M.width!==$t.image.width||M.height!==$t.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(M)}}const Tt=M.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(vt=!0);const Pt=k.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Pt[I])?G=Pt[I][q]:G=Pt[I],V=!0):M.samples>0&&$.useMultisampledRTT(M)===!1?G=k.get(M).__webglMultisampledFramebuffer:Array.isArray(Pt)?G=Pt[q]:G=Pt,J.copy(M.viewport),wt.copy(M.scissor),Mt=M.scissorTest}else J.copy(yt).multiplyScalar(et).floor(),wt.copy(Bt).multiplyScalar(et).floor(),Mt=ae;if(q!==0&&(G=z),_.bindFramebuffer(L.FRAMEBUFFER,G)&&_.drawBuffers(M,G),_.viewport(J),_.scissor(wt),_.setScissorTest(Mt),V){const xt=k.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+I,xt.__webglTexture,q)}else if(vt){const xt=I;for(let Tt=0;Tt<M.textures.length;Tt++){const Pt=k.get(M.textures[Tt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Tt,Pt.__webglTexture,q,xt)}}else if(M!==null&&q!==0){const xt=k.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xt.__webglTexture,q)}H=-1};function Ao(M){const I=k.get(M);return(I.__readFormat!==M.format||I.__readType!==M.type)&&(I.__readFormat=M.format,I.__readType=M.type,I.__formatReadable=T.textureFormatReadable(M.format),I.__typeReadable=T.textureTypeReadable(M.type)),I}this.readRenderTargetPixels=function(M,I,q,G,V,vt,bt,xt=0){if(!(M&&M.isWebGLRenderTarget)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=k.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&bt!==void 0&&(Tt=Tt[bt]),Tt){_.bindFramebuffer(L.FRAMEBUFFER,Tt);try{const Pt=M.textures[xt],$t=Pt.format,Qt=Pt.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+xt);const At=Ao(Pt);if(At.__formatReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-G&&q>=0&&q<=M.height-V&&L.readPixels(I,q,G,V,pt.convert($t),pt.convert(Qt),vt)}finally{const Pt=Q!==null?k.get(Q).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(M,I,q,G,V,vt,bt,xt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=k.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&bt!==void 0&&(Tt=Tt[bt]),Tt)if(I>=0&&I<=M.width-G&&q>=0&&q<=M.height-V){_.bindFramebuffer(L.FRAMEBUFFER,Tt);const Pt=M.textures[xt],$t=Pt.format,Qt=Pt.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+xt);const At=Ao(Pt);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const se=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,se),L.bufferData(L.PIXEL_PACK_BUFFER,vt.byteLength,L.STREAM_READ),L.readPixels(I,q,G,V,pt.convert($t),pt.convert(Qt),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const Me=Q!==null?k.get(Q).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Me);const pe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Uh(L,pe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,se),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,vt),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(se),L.deleteSync(pe),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,I=null,q=0){const G=Math.pow(2,-q),V=Math.floor(M.image.width*G),vt=Math.floor(M.image.height*G),bt=I!==null?I.x:0,xt=I!==null?I.y:0;$.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,q,0,0,bt,xt,V,vt),_.unbindTexture()},this.copyTextureToTexture=function(M,I,q=null,G=null,V=0,vt=0){let bt,xt,Tt,Pt,$t,Qt,At,se,Me;const pe=M.isCompressedTexture?M.mipmaps[vt]:M.image;if(q!==null)bt=q.max.x-q.min.x,xt=q.max.y-q.min.y,Tt=q.isBox3?q.max.z-q.min.z:1,Pt=q.min.x,$t=q.min.y,Qt=q.isBox3?q.min.z:0;else{const xe=Math.pow(2,-V);bt=Math.floor(pe.width*xe),xt=Math.floor(pe.height*xe),M.isDataArrayTexture?Tt=pe.depth:M.isData3DTexture?Tt=Math.floor(pe.depth*xe):Tt=1,Pt=0,$t=0,Qt=0}G!==null?(At=G.x,se=G.y,Me=G.z):(At=0,se=0,Me=0);const he=pt.convert(I.format),Pe=pt.convert(I.type);let Et;I.isData3DTexture?($.setTexture3D(I,0),Et=L.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?($.setTexture2DArray(I,0),Et=L.TEXTURE_2D_ARRAY):($.setTexture2D(I,0),Et=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,I.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,I.unpackAlignment);const Ne=_.getParameter(L.UNPACK_ROW_LENGTH),ee=_.getParameter(L.UNPACK_IMAGE_HEIGHT),Ye=_.getParameter(L.UNPACK_SKIP_PIXELS),fn=_.getParameter(L.UNPACK_SKIP_ROWS),Fn=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,pe.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pe.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Pt),_.pixelStorei(L.UNPACK_SKIP_ROWS,$t),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Qt);const ui=M.isDataArrayTexture||M.isData3DTexture,ce=I.isDataArrayTexture||I.isData3DTexture;if(M.isDepthTexture){const xe=k.get(M),On=k.get(I),de=k.get(xe.__renderTarget),Bn=k.get(On.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,de.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let fi=0;fi<Tt;fi++)ui&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,k.get(M).__webglTexture,V,Qt+fi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,k.get(I).__webglTexture,vt,Me+fi)),L.blitFramebuffer(Pt,$t,bt,xt,At,se,bt,xt,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(V!==0||M.isRenderTargetTexture||k.has(M)){const xe=k.get(M),On=k.get(I);_.bindFramebuffer(L.READ_FRAMEBUFFER,D),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,B);for(let de=0;de<Tt;de++)ui?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xe.__webglTexture,V,Qt+de):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xe.__webglTexture,V),ce?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,On.__webglTexture,vt,Me+de):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,On.__webglTexture,vt),V!==0?L.blitFramebuffer(Pt,$t,bt,xt,At,se,bt,xt,L.COLOR_BUFFER_BIT,L.NEAREST):ce?L.copyTexSubImage3D(Et,vt,At,se,Me+de,Pt,$t,bt,xt):L.copyTexSubImage2D(Et,vt,At,se,Pt,$t,bt,xt);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ce?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(Et,vt,At,se,Me,bt,xt,Tt,he,Pe,pe.data):I.isCompressedArrayTexture?L.compressedTexSubImage3D(Et,vt,At,se,Me,bt,xt,Tt,he,pe.data):L.texSubImage3D(Et,vt,At,se,Me,bt,xt,Tt,he,Pe,pe):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,vt,At,se,bt,xt,he,Pe,pe.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,vt,At,se,pe.width,pe.height,he,pe.data):L.texSubImage2D(L.TEXTURE_2D,vt,At,se,bt,xt,he,Pe,pe);_.pixelStorei(L.UNPACK_ROW_LENGTH,Ne),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ee),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Ye),_.pixelStorei(L.UNPACK_SKIP_ROWS,fn),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Fn),vt===0&&I.generateMipmaps&&L.generateMipmap(Et),_.unbindTexture()},this.initRenderTarget=function(M){k.get(M).__webglFramebuffer===void 0&&$.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?$.setTextureCube(M,0):M.isData3DTexture?$.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?$.setTexture2DArray(M,0):$.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){X=0,W=0,Q=null,_.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}const Fl=new tn,Vs=new R;class ho extends ff{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Se(t,3)),this.setAttribute("uv",new Se(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new ka(e,6,1);return this.setAttribute("instanceStart",new qn(n,3,0)),this.setAttribute("instanceEnd",new qn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new ka(e,6,1);return this.setAttribute("instanceColorStart",new qn(n,3,0)),this.setAttribute("instanceColorEnd",new qn(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new rf(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Fl.setFromBufferAttribute(e),this.boundingBox.union(Fl))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hs),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Vs.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Vs)),Vs.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vs));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}ht.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new mt},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};He.line={uniforms:co.merge([ht.common,ht.fog,ht.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Gc extends $e{constructor(t){super({type:"LineMaterial",uniforms:co.clone(He.line.uniforms),vertexShader:He.line.vertexShader,fragmentShader:He.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Zr=new ue,Ol=new R,Bl=new R,Te=new ue,Ae=new ue,mn=new ue,Kr=new R,Jr=new ge,Re=new xf,zl=new R,ks=new tn,Ws=new hs,gn=new ue;let _n,ri;function Hl(i,t,e){return gn.set(0,0,-t,1).applyMatrix4(i.projectionMatrix),gn.multiplyScalar(1/gn.w),gn.x=ri/e.width,gn.y=ri/e.height,gn.applyMatrix4(i.projectionMatrixInverse),gn.multiplyScalar(1/gn.w),Math.abs(Math.max(gn.x,gn.y))}function g0(i,t){const e=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,s.count);for(let o=0,c=a;o<c;o++){Re.start.fromBufferAttribute(s,o),Re.end.fromBufferAttribute(r,o),Re.applyMatrix4(e);const l=new R,h=new R;_n.distanceSqToSegment(Re.start,Re.end,h,l),h.distanceTo(l)<ri*.5&&t.push({point:h,pointOnLine:l,distance:_n.origin.distanceTo(h),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function _0(i,t,e){const n=t.projectionMatrix,r=i.material.resolution,a=i.matrixWorld,o=i.geometry,c=o.attributes.instanceStart,l=o.attributes.instanceEnd,h=Math.min(o.instanceCount,c.count),u=-t.near;_n.at(1,mn),mn.w=1,mn.applyMatrix4(t.matrixWorldInverse),mn.applyMatrix4(n),mn.multiplyScalar(1/mn.w),mn.x*=r.x/2,mn.y*=r.y/2,mn.z=0,Kr.copy(mn),Jr.multiplyMatrices(t.matrixWorldInverse,a);for(let f=0,p=h;f<p;f++){if(Te.fromBufferAttribute(c,f),Ae.fromBufferAttribute(l,f),Te.w=1,Ae.w=1,Te.applyMatrix4(Jr),Ae.applyMatrix4(Jr),Te.z>u&&Ae.z>u)continue;if(Te.z>u){const A=Te.z-Ae.z,S=(Te.z-u)/A;Te.lerp(Ae,S)}else if(Ae.z>u){const A=Ae.z-Te.z,S=(Ae.z-u)/A;Ae.lerp(Te,S)}Te.applyMatrix4(n),Ae.applyMatrix4(n),Te.multiplyScalar(1/Te.w),Ae.multiplyScalar(1/Ae.w),Te.x*=r.x/2,Te.y*=r.y/2,Ae.x*=r.x/2,Ae.y*=r.y/2,Re.start.copy(Te),Re.start.z=0,Re.end.copy(Ae),Re.end.z=0;const v=Re.closestPointToPointParameter(Kr,!0);Re.at(v,zl);const m=Jh.lerp(Te.z,Ae.z,v),d=m>=-1&&m<=1,b=Kr.distanceTo(zl)<ri*.5;if(d&&b){Re.start.fromBufferAttribute(c,f),Re.end.fromBufferAttribute(l,f),Re.start.applyMatrix4(a),Re.end.applyMatrix4(a);const A=new R,S=new R;_n.distanceSqToSegment(Re.start,Re.end,S,A),e.push({point:S,pointOnLine:A,distance:_n.origin.distanceTo(S),object:i,face:null,faceIndex:f,uv:null,uv1:null})}}}class Vc extends qe{constructor(t=new ho,e=new Gc({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let a=0,o=0,c=e.count;a<c;a++,o+=2)Ol.fromBufferAttribute(e,a),Bl.fromBufferAttribute(n,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Ol.distanceTo(Bl);const r=new ka(s,2,1);return t.setAttribute("instanceDistanceStart",new qn(r,1,0)),t.setAttribute("instanceDistanceEnd",new qn(r,1,1)),this}raycast(t,e){const n=this.material.worldUnits,s=t.camera;if(s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;_n=t.ray;const a=this.matrixWorld,o=this.geometry,c=this.material;ri=c.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Ws.copy(o.boundingSphere).applyMatrix4(a);let l;if(n)l=ri*.5;else{const u=Math.max(s.near,Ws.distanceToPoint(_n.origin));l=Hl(s,u,c.resolution)}if(Ws.radius+=l,_n.intersectsSphere(Ws)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),ks.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=ri*.5;else{const u=Math.max(s.near,ks.distanceToPoint(_n.origin));h=Hl(s,u,c.resolution)}ks.expandByScalar(h),_n.intersectsBox(ks)!==!1&&(n?g0(this,e):_0(this,s,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Zr),this.material.uniforms.resolution.value.set(Zr.z,Zr.w))}}const uo=new Xt("#141414"),Gl=new Xt("#94918b"),x0=new Xt("#fff3c4"),Ge={board:new Xt("#ffffff"),fiber:new Xt("#f5f1e8"),wood:new Xt("#fdfaf4"),metal:new Xt("#eceef0"),soft:new Xt("#f6f6f4"),hwMetal:new Xt("#dfe1e3"),hwWood:new Xt("#f1e2c3"),hwPlastic:new Xt("#f4f4f2"),wall:new Xt("#f3f2ee")},v0=`
varying vec3 vN;
void main() {
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,S0=`
uniform vec3 uColor;
uniform vec3 uTint;
uniform float uTintAmt;
uniform float uOpacity;
varying vec3 vN;
void main() {
  vec3 n = normalize(vN);
  vec3 L = normalize(vec3(-0.35, 1.0, 0.55));
  float d = dot(n, L);
  float shade = d > 0.72 ? 1.0 : (d > 0.18 ? 0.968 : (d > -0.2 ? 0.938 : 0.915));
  vec3 c = mix(uColor, uTint, uTintAmt) * shade;
  gl_FragColor = vec4(c, uOpacity);
}`;function M0(i){return new $e({uniforms:{uColor:{value:i.clone()},uTint:{value:x0.clone()},uTintAmt:{value:0},uOpacity:{value:1}},vertexShader:v0,fragmentShader:S0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1,transparent:!0})}const y0=`
attribute vec3 hullDir;
uniform float uWidth;
uniform vec2 uRes;
void main() {
  vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vec3 n = normalize(normalMatrix * hullDir);
  vec2 dir = n.xy;
  float l = length(dir);
  dir = l > 1e-4 ? dir / l : vec2(0.0);
  clip.xy += dir * uWidth * 2.0 / uRes * clip.w;
  gl_Position = clip;
}`,E0=`
uniform vec3 uColor;
uniform float uOpacity;
void main() { gl_FragColor = vec4(uColor, uOpacity); }`;function b0(i){return new $e({uniforms:{uColor:{value:uo.clone()},uOpacity:{value:1},uWidth:{value:i},uRes:{value:new mt(1,1)}},vertexShader:y0,fragmentShader:E0,side:Be,transparent:!0})}function kc(i){return new Gc({color:uo.getHex(),linewidth:i,worldUnits:!1,transparent:!0,dashed:!1})}function w0(i,t=new R){const e=i.getAttribute("position"),n=new Float32Array(e.count*3),s=new R;for(let r=0;r<e.count;r++)s.fromBufferAttribute(e,r).sub(t),s.lengthSq()<1e-8&&s.set(0,1,0),s.normalize(),n[r*3]=s.x,n[r*3+1]=s.y,n[r*3+2]=s.z;return i.setAttribute("hullDir",new Xe(n,3)),i}function T0(i,t=0){const e=i.getAttribute("position"),n=new Float32Array(e.count*3),s=new R;for(let r=0;r<e.count;r++){s.fromBufferAttribute(e,r);const a=Math.hypot(s.x,s.z),o=a>1e-4?s.x/a:0,c=a>1e-4?s.z/a:0,l=s.y-t>=0?1:-1,h=new R(o,l*.35,c);a<=1e-4&&h.set(0,l,0),h.normalize(),n[r*3]=h.x,n[r*3+1]=h.y,n[r*3+2]=h.z}return i.setAttribute("hullDir",new Xe(n,3)),i}function A0(i,t,e,n){const s=i.getAttribute("position"),r=new Float32Array(s.count*3),a=new R,o=7;for(let c=0;c<s.count;c++){a.fromBufferAttribute(s,c);const l=Math.sign(a.x)*Math.pow(Math.abs(a.x/t),o)/t,h=Math.sign(a.y)*Math.pow(Math.abs(a.y/e),o)/e,u=Math.sign(a.z)*Math.pow(Math.abs(a.z/n),o)/n;a.set(l,h,u),a.lengthSq()<1e-12&&a.set(0,1,0),a.normalize(),r[c*3]=a.x,r[c*3+1]=a.y,r[c*3+2]=a.z}return i.setAttribute("hullDir",new Xe(r,3)),i}class fo{constructor(){this.root=new ln,this.faces=[],this.lines=[],this.thin=[],this.hulls=[],this.meshes=[],this.base=[],this.opacity=1}}const Vl=new Map;function R0(i,t,e=30){let n=Vl.get(i);if(!n){const s=t(),r=new ho().fromEdgesGeometry(new bu(s,e));n={geo:s,edges:r},Vl.set(i,n)}return n}function Rt(i,t,e,n,s={}){const r=R0(t,()=>{const l=e();if(s.hull==="cyl")T0(l,s.cy??0);else if(s.hull==="box"&&s.half)A0(l,...s.half);else if(s.hull==="radial"){l.computeBoundingBox();const h=new R;l.boundingBox.getCenter(h),w0(l,h)}return l}),a=new ln;s.position&&a.position.set(...s.position),s.rotation&&a.rotation.set(...s.rotation);const o=M0(n),c=new qe(r.geo,o);if(a.add(c),i.faces.push(o),i.base.push(n.clone()),i.meshes.push(c),s.edges!==!1){const l=kc(1.6),h=new Vc(r.edges,l);a.add(h),i.lines.push(l)}if(s.hull){const l=b0(1.6),h=new qe(r.geo,l);s.hull==="box"&&(l.uniforms.uWidth.value=2),h.renderOrder=-1,a.add(h),i.hulls.push(l)}return(s.parent??i.root).add(a),a}const kl={board:Ge.board,fiber:Ge.fiber,wood:Ge.wood,metal:Ge.metal,soft:Ge.soft};function C0(i,t){const e=new fo,[n,s,r]=i.size,a=kl[i.material]??Ge.board;if(i.pieces)for(const o of i.pieces){const[c,l,h]=o.size,u=o.material??i.material,f=kl[u]??Ge.board,p={position:o.pos,rotation:o.rot};o.shape==="cyl"?Rt(e,`cyl:${c}:${l}`,()=>new Sn(c/2,c/2,l,32),f,{hull:"cyl",...p}):u==="soft"?Rt(e,`soft:${c}:${l}:${h}`,()=>Wl(c,l,h,Math.min(42,l/2.4,c/3,h/3)),f,{hull:"box",half:[c/2,l/2,h/2],edges:!1,...p}):Rt(e,`box:${c}:${l}:${h}`,()=>new me(c,l,h),f,p)}else i.shape==="cyl"?Rt(e,`cyl:${n}:${s}`,()=>new Sn(n/2,n/2,s,32),a,{hull:"cyl"}):i.material==="soft"?Rt(e,`soft:${n}:${s}:${r}`,()=>Wl(n,s,r,Math.min(42,s/2.4,n/3,r/3)),a,{hull:"box",half:[n/2,s/2,r/2],edges:!1}):Rt(e,`box:${n}:${s}:${r}`,()=>new me(n,s,r),a);if(t.length){const o=[],l=new R,h=new R,u=new R,f=new R;for(const v of t){l.set(...v.n).normalize(),h.set(Math.abs(l.y)<.9?0:1,Math.abs(l.y)<.9?1:0,0).cross(l).normalize(),u.copy(l).cross(h).normalize(),f.set(...v.p).addScaledVector(l,.35);for(let m=0;m<14;m++){const d=m/14*Math.PI*2,b=(m+1)/14*Math.PI*2;o.push(f.x+(h.x*Math.cos(d)+u.x*Math.sin(d))*v.r,f.y+(h.y*Math.cos(d)+u.y*Math.sin(d))*v.r,f.z+(h.z*Math.cos(d)+u.z*Math.sin(d))*v.r,f.x+(h.x*Math.cos(b)+u.x*Math.sin(b))*v.r,f.y+(h.y*Math.cos(b)+u.y*Math.sin(b))*v.r,f.z+(h.z*Math.cos(b)+u.z*Math.sin(b))*v.r)}}const p=new ho;p.setPositions(o);const g=kc(1);e.root.add(new Vc(p,g)),e.thin.push(g)}return e}function Wl(i,t,e,n){const s=new Tc,r=-i/2,a=-e/2;s.moveTo(r+n,a),s.lineTo(r+i-n,a),s.quadraticCurveTo(r+i,a,r+i,a+n),s.lineTo(r+i,a+e-n),s.quadraticCurveTo(r+i,a+e,r+i-n,a+e),s.lineTo(r+n,a+e),s.quadraticCurveTo(r,a+e,r,a+e-n),s.lineTo(r,a+n),s.quadraticCurveTo(r,a,r+n,a);const o=new lo(s,{depth:t-n,bevelEnabled:!0,bevelThickness:n/2,bevelSize:n/3,bevelSegments:3,curveSegments:6});return o.rotateX(-Math.PI/2),o.translate(0,-(t-n)/2,0),o}const re=(i,t,e=18)=>()=>new Sn(i,i,t,e);function P0(i,t,e){const n=new fo,s=Ge.hwMetal,r=Ge.hwWood,a=Ge.hwPlastic,o=e/2;switch(i){case"dowel":Rt(n,`dowel:${t}:${e}`,re(o,t,16),r,{hull:"cyl",position:[0,t/2-12,0]});break;case"camScrew":Rt(n,"cs:thread",re(2.9,11,12),s,{hull:"cyl",position:[0,-5.5,0]}),Rt(n,"cs:neck",re(2.2,17,12),s,{hull:"cyl",position:[0,8.5,0]}),Rt(n,"cs:head",()=>new es(3.6,14,10),s,{hull:"radial",position:[0,19.5,0],edges:!1});break;case"cam":{Rt(n,"cam:body",re(7.4,12.4,22),s,{hull:"cyl",position:[0,-6.2,0]}),Rt(n,"cam:slot",()=>new me(9,.8,1.6),Ge.hwMetal,{position:[0,.4,0]}),Rt(n,"cam:arrow",()=>new rr(1.4,2.6,3),Ge.hwMetal,{position:[5.2,.4,0],rotation:[0,0,-Math.PI/2],edges:!0});break}case"screw":{const c=Math.max(e,3.2);Rt(n,`sc:shank:${t}:${e}`,re(o*.92,t-2,10),s,{hull:"cyl",position:[0,-(t-2)/2-2,0]}),Rt(n,`sc:tip:${e}`,()=>new rr(o*.92,2.6,10),s,{position:[0,-t-.7,0],rotation:[Math.PI,0,0],edges:!1}),Rt(n,`sc:head:${e}`,re(c,1.9,18),s,{hull:"cyl",position:[0,.95,0]}),Rt(n,`sc:x1:${e}`,()=>new me(c*1.2,.4,.5),s,{position:[0,2,0]}),Rt(n,`sc:x2:${e}`,()=>new me(.5,.4,c*1.2),s,{position:[0,2,0]});break}case"nail":Rt(n,`nail:${t}`,re(o,t,8),s,{hull:"cyl",position:[0,-t/2,0]}),Rt(n,"nail:head",re(o*1.7,.7,12),s,{hull:"cyl",position:[0,.35,0]});break;case"pin":Rt(n,`pin:${e}`,re(o,16,12),s,{hull:"cyl"}),Rt(n,`pin:collar:${e}`,re(o+1.2,1.2,14),s,{hull:"cyl",position:[0,.6,0]});break;case"legScrew":Rt(n,`leg:${t}`,re(o,t,14),s,{hull:"cyl"});break;case"bolt":Rt(n,`bolt:${t}:${e}`,re(o,t,12),s,{hull:"cyl",position:[0,-t/2,0]}),Rt(n,`bolt:head:${e}`,re(e*.85,5,18),s,{hull:"cyl",position:[0,2.5,0]}),Rt(n,`bolt:hex:${e}`,re(e*.4,.6,6),Ge.hwMetal,{position:[0,5.2,0]});break;case"plate":Rt(n,"plate",()=>new me(70,3,70),s,{position:[0,1.5,0]}),Rt(n,"plate:sock",re(9,10,18),s,{hull:"cyl",position:[0,8,0]});break;case"bracket":Rt(n,"br:h",()=>new me(40,2,32),s,{position:[0,1,0]}),Rt(n,"br:v",()=>new me(40,42,2),s,{position:[0,21,-15]});break;case"runner":Rt(n,`run:${t}`,()=>new me(20,11,t),s,{position:[0,5.5,0]}),Rt(n,`run:lip:${t}`,()=>new me(4,6,t),s,{position:[-8,14,0]});break;case"knob":Rt(n,"knob:stem",re(5.5,12,14),r,{hull:"cyl",position:[0,6,0]}),Rt(n,"knob:head",()=>new es(14,22,12,0,Math.PI*2,0,Math.PI*.62),r,{hull:"radial",position:[0,14,0],edges:!1});break;case"handle":for(const c of[-t/2,t/2])Rt(n,"hd:post",re(5,26,12),s,{hull:"cyl",position:[c,13,0]});Rt(n,`hd:bar:${t}`,()=>new Sn(6,6,t+24,14).rotateZ(Math.PI/2),s,{hull:"radial",position:[0,30,0]});break;case"hinge":Rt(n,"hg:cup",re(17.5,12,24),s,{hull:"cyl",position:[0,-6,0]}),Rt(n,"hg:flange",()=>new me(52,1.6,14),s,{position:[0,.8,0]}),Rt(n,"hg:arm",()=>new me(12,40,11),s,{position:[4,20,0]}),Rt(n,"hg:plate",()=>new me(4,18,40),s,{position:[-4,34,0]});break;case"glide":Rt(n,"glide",re(10,4,18),a,{hull:"cyl",position:[0,2,0]});break;case"plug":Rt(n,`plug:${t}`,re(o,t,12),a,{hull:"cyl",position:[0,-t/2,0]}),Rt(n,"plug:lip",re(o+1.5,1.5,14),a,{hull:"cyl",position:[0,.75,0]});break;case"castor":{Rt(n,"ca:pin",re(5.5,22,12),s,{hull:"cyl",position:[0,-11,0]}),Rt(n,"ca:collar",re(9,3,16),a,{hull:"cyl",position:[0,1.5,0]}),Rt(n,`ca:hood:${e}`,()=>new me(e*.68,t-o-2,e*.9),a,{position:[0,3+(t-o-2)/2,-e*.12]});for(const c of[-1,1])Rt(n,`ca:wheel:${e}`,()=>new Sn(o,o,e*.26,24).rotateZ(Math.PI/2),a,{hull:"radial",position:[c*e*.21,t-o,-e*.16]});break}case"flatHinge":for(const c of[-1,1])Rt(n,`fh:leaf:${t}:${e}`,()=>new me(t/2-3,1.6,e),s,{position:[c*(t/4+1.5),.8,0]});Rt(n,`fh:pin:${e}`,()=>new Sn(3,3,e,12).rotateX(Math.PI/2),s,{hull:"radial",position:[0,2.2,0]});break;case"hook":Rt(n,"hk:thread",re(2.5,12,10),s,{hull:"cyl",position:[0,-6,0]}),Rt(n,`hk:plate:${e}`,re(o*.55,3,20),s,{hull:"cyl",position:[0,1.5,0]}),Rt(n,`hk:stem:${t}`,re(4,t-12,14),s,{hull:"cyl",position:[0,3+(t-12)/2,0]}),Rt(n,`hk:ball:${e}`,()=>new es(o*.42,18,12),s,{hull:"radial",position:[0,t-6,0],edges:!1});break;case"roller":Rt(n,`ro:plate:${t}`,()=>new me(t,3,14),s,{position:[0,1.5,0]}),Rt(n,"ro:arm",()=>new me(8,t*.45,8),s,{position:[0,3+t*.22,0]}),Rt(n,`ro:wheel:${e}`,()=>new Sn(o,o,7,22).rotateX(Math.PI/2),a,{hull:"radial",position:[0,3+t*.45+o*.4,0]});break;case"connector":Rt(n,`cn:${t}:${e}`,()=>new me(t,2,e),s,{position:[0,1,0]});break;case"gasLift":{Rt(n,"gl:foot",re(14,60,18),s,{hull:"cyl",position:[0,-30,0]}),Rt(n,`gl:body:${t}:${e}`,re(o,t-40,24),s,{hull:"cyl",position:[0,(t-40)/2,0]}),Rt(n,"gl:ring",re(18,6,20),a,{hull:"cyl",position:[0,t-37,0]}),Rt(n,"gl:rod",re(11,36,16),s,{hull:"cyl",position:[0,t-18,0]});break}}return n}function L0(i,t){const e=new fo;return Rt(e,`wall:${i}:${t}`,()=>new me(i,t,40),Ge.wall),e}const Xs=i=>String(i).replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),Xl=i=>1-Math.pow(1-i,4),ti=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,ve=i=>Math.max(0,Math.min(1,i)),ei=.95,Ri=.6,Qr=.62,Ci=2.4,jr=.35,Pi=new R,ql=new je,Li=new R(0,1,0);function ni(i){return new je().setFromEuler(new $n(i[0],i[1],i[2],"XYZ"))}class N0{constructor(t,e={}){this.scene=new uu,this.camera=new ar(-1,1,1,-1,1,4e4),this.root=new ln,this.plan=null,this.parts=[],this.hws=[],this.byKey=new Map,this.mode={kind:"assembled"},this.arrows=[],this.labels=new Map,this.squareEls=[],this.w=1,this.h=1,this.az=.62,this.el0=.46,this.userAz=0,this.userEl=0,this.userZoom=1,this.dragging=!1,this.autoReset=!0,this.camTarget=new R,this.camHalf=1e3,this.camReady=!1,this.rootQ=new je,this.rootReady=!1,this.t=0,this.last=0,this.raf=0,this.speed=1,this.paused=!1,this.stepEnd=0,this.loopCount=0,this.highlight=null,this.hovered=null,this.disposed=!1,this.visible=!0,this.introDone=!1,this.pointers=new Map,this.pinch0=0,this.zoom0=1,this.downAt={x:0,y:0,t:0},this.extents=new Map,this.typeFirst=new Map,this.frameLocal=[],this.stack=new Map,this.layout=new Map,this.cornerItems=0,this.fallback=0,this.introOrderCache=new Map,this.ray=new mf,this.el=t,this.opts=e,this.renderer=new Nl({antialias:!0,alpha:!0,preserveDrawingBuffer:!!e.offscreen}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(16777215,0);const n=this.renderer.domElement;n.className="stage-canvas",t.appendChild(n),this.scene.add(this.root);const s=document.createElement("canvas");s.width=s.height=128;const r=s.getContext("2d"),a=r.createRadialGradient(64,64,4,64,64,64);a.addColorStop(0,"rgba(20,20,20,0.16)"),a.addColorStop(.55,"rgba(20,20,20,0.07)"),a.addColorStop(1,"rgba(20,20,20,0)"),r.fillStyle=a,r.fillRect(0,0,128,128);const o=new yu(s);if(this.shadow=new qe(new us(1,1),new ro({map:o,transparent:!0,depthWrite:!1})),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=-1,this.shadow.renderOrder=-5,this.scene.add(this.shadow),!e.offscreen){const c="http://www.w3.org/2000/svg";this.overlay=document.createElementNS(c,"svg"),this.overlay.setAttribute("class","stage-overlay"),t.appendChild(this.overlay),e.labels!==!1&&(this.labelLayer=document.createElement("div"),this.labelLayer.className="stage-labels",t.appendChild(this.labelLayer)),e.callout&&this.makeCallout(),e.interactive&&this.bindPointer(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.io=new IntersectionObserver(h=>{this.visible=h[0]?.isIntersecting??!0}),this.io.observe(t),this.resize(),this.last=performance.now();const l=h=>{if(this.disposed)return;this.raf=requestAnimationFrame(l);const u=Math.min(.05,(h-this.last)/1e3);this.last=h,!(!this.visible||document.hidden)&&(this.tick(u),this.render())};this.raf=requestAnimationFrame(l),this.fallback=window.setInterval(()=>{const h=performance.now();if(this.disposed||document.hidden||h-this.last<120)return;const u=Math.min(.05,(h-this.last)/1e3);this.last=h,this.tick(u),this.render()},40)}}makeCallout(){const t=document.createElement("div");t.className="stage-callout",t.style.opacity="0",t.style.visibility="hidden";const e=new Nl({antialias:!0,alpha:!0});e.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),e.setClearColor(16777215,1),t.appendChild(e.domElement);const n="http://www.w3.org/2000/svg",s=document.createElementNS(n,"svg");s.setAttribute("class","stage-callout-svg"),t.appendChild(s),this.el.appendChild(t),this.callout={wrap:t,renderer:e,camera:new ar(-1,1,1,-1,1,4e3),svg:s,size:200,visible:0},this.leader=document.createElementNS(n,"path"),this.leader.setAttribute("class","leader"),this.leaderDot=document.createElementNS(n,"circle"),this.leaderDot.setAttribute("class","leader-dot"),this.leaderDot.setAttribute("r","4"),this.overlay.appendChild(this.leader),this.overlay.appendChild(this.leaderDot)}resize(t,e){if(t&&e)this.w=t,this.h=e;else{const n=this.el.getBoundingClientRect();this.w=Math.max(1,n.width),this.h=Math.max(1,n.height)}if(this.renderer.setSize(this.w,this.h,!1),this.callout){const n=Math.round(Math.min(220,Math.max(120,Math.min(this.w,this.h)*.34)));this.callout.size=n,this.callout.renderer.setSize(n,n,!1),this.callout.wrap.style.width=this.callout.wrap.style.height=n+"px"}}setPlan(t){if(this.plan===t)return;this.clear(),this.plan=t;const e=new Map(t.parts.map(s=>[s.id,s]));for(const s of t.items){if(s.kind!=="part")continue;const r=e.get(s.ref);if(!r)continue;const a=C0(r,s.holes),o=new ln;o.add(a.root),o.userData.key=s.key,a.meshes.forEach(p=>p.userData.ref=s.ref),this.root.add(o);const[c,l,h]=r.size,u=[];for(const p of[-1,1])for(const g of[-1,1])for(const v of[-1,1])u.push(new R(p*c/2,g*l/2,v*h/2));const f={item:s,type:r,d:a,node:o,corners:u};this.parts.push(f),this.byKey.set(s.key,f)}const n=new Map(t.hardware.map(s=>[s.id,s]));for(const s of t.items){if(s.kind!=="hw")continue;const r=n.get(s.ref),a=P0(r.kind,r.len,r.dia),o=new ln,c=new ln;o.add(c),c.add(a.root),o.position.set(...s.pos);const l=new R(...s.dir).normalize();o.quaternion.setFromUnitVectors(new R(0,-1,0),l),s.twist&&o.quaternion.premultiply(new je().setFromAxisAngle(l,s.twist));const h=s.parent?this.byKey.get(s.parent):void 0;(h?h.node:this.root).add(o),a.meshes.forEach(u=>u.userData.ref=s.ref),this.hws.push({item:s,d:a,holder:o,inner:c,parent:h})}this.computeExtents(),this.computeArrangements(),this.typeFirst.clear(),this.introOrderCache.clear();for(const s of this.parts){const r=Math.min(...s.item.states.map(a=>a.step));this.typeFirst.set(s.type.id,Math.min(this.typeFirst.get(s.type.id)??1e9,r))}this.camReady=!1,this.rootReady=!1}clear(){for(const t of this.parts)this.root.remove(t.node),ta(t.d);for(const t of this.hws)ta(t.d);this.root.clear(),this.parts=[],this.hws=[],this.byKey.clear(),this.labels.forEach(t=>t.remove()),this.labels.clear(),this.arrows.forEach(t=>t.remove()),this.arrows=[],this.wall&&(this.wall.node.removeFromParent(),ta(this.wall.d),this.wall=void 0)}stateAt(t,e){let n=null,s=null;for(const r of t.item.states)r.step<=e&&(s=n,n=r);return{st:n,prev:s}}corners(t,e,n){const s=ni(n),r=new R(...e);return t.corners.map(a=>a.clone().applyQuaternion(s).add(r))}computeExtents(){const t=new Map;for(const e of this.parts){for(const s of e.item.states){const r=t.get(s.scene)??[];r.push(...this.corners(e,s.pos,s.rot)),t.set(s.scene,r)}const n=t.get("final")??[];n.push(...this.corners(e,e.item.final.pos,e.item.final.rot)),t.set("final",n)}this.extents=t}flatQuat(t){const e=t.size,n=[0,1,2],s=n.reduce((h,u)=>e[u]<e[h]?u:h),r=n.filter(h=>h!==s),a=e[r[0]]>=e[r[1]]?r[0]:r[1],o=r.find(h=>h!==a),c=[new R,new R,new R];c[s].set(0,1,0),c[a].set(1,0,0),c[o].set(0,0,1);const l=new ge().makeBasis(c[0],c[1],c[2]);return l.determinant()<0&&(c[o].set(0,0,-1),l.makeBasis(c[0],c[1],c[2])),{q:new je().setFromRotationMatrix(l),thick:e[s],long:e[a],wide:e[o]}}computeArrangements(){this.stack.clear(),this.layout.clear();const t=this.parts.filter(m=>!m.type.extra),e=[...t].sort((m,d)=>d.type.size[0]*d.type.size[2]+d.type.size[0]*d.type.size[1]-(m.type.size[0]*m.type.size[2]+m.type.size[0]*m.type.size[1]));let n=0;const s=new Map;for(const m of e){const d=this.flatQuat(m.type);s.set(m.item.key,d),this.stack.set(m.item.key,{p:new R(0,n+d.thick/2,0),q:d.q}),n+=d.thick+3}const r=[...t].sort((m,d)=>m.type.label.localeCompare(d.type.label)),a=r.reduce((m,d)=>m+s.get(d.item.key).long*s.get(d.item.key).wide,0),o=Math.max(...r.map(m=>s.get(m.item.key).long),1),c=Math.max(o,Math.sqrt(a)*1.7);let l=0,h=0,u=0;const f=Math.max(50,o*.05),p=[];for(const m of r){const d=s.get(m.item.key);l>0&&l+d.long>c&&(l=0,h+=u+f*1.6,u=0),p.push({key:m.item.key,x:l+d.long/2,z:h+d.wide/2,f:d}),l+=d.long+f,u=Math.max(u,d.wide)}const g=Math.max(...p.map(m=>m.x+m.f.long/2)),v=Math.max(...p.map(m=>m.z+m.f.wide/2));for(const m of p)this.layout.set(m.key,{p:new R(m.x-g/2,m.f.thick/2,m.z-v/2),q:m.f.q})}setMode(t,e={}){const n=this.mode;if(this.mode=t,this.t=e.instant?999:0,this.loopCount=0,this.autoReset=!0,this.introDone=t.kind!=="intro",n.kind==="step"&&t.kind==="step"&&this.plan){const s=this.plan.steps[n.index]?.scene,r=this.plan.steps[t.index]?.scene;s!==r&&this.flash()}else n.kind!==t.kind&&!e.instant&&this.flash();this.prepareMode(),e.instant&&(this.camReady=!1,this.rootReady=!1,this.tick(0))}replay(){this.t=0,this.loopCount=0}setPaused(t){this.paused=t}setSpeed(t){this.speed=t}setHighlight(t){this.highlight=t&&t.length?new Set(t):null}resetView(){this.autoReset=!0,this.opts.onUserView?.(!1)}flash(){this.renderer.domElement.animate([{opacity:.15},{opacity:1}],{duration:420,easing:"cubic-bezier(.2,.8,.2,1)"})}get step(){return this.mode.kind!=="step"||!this.plan?null:this.plan.steps[this.mode.index]??null}prepareMode(){const t=this.plan;if(!t)return;this.focus=void 0,this.frameLocal=[],this.cornerItems=0;const e=this.mode;if(e.kind==="step"){const n=e.index,s=t.steps[n];let r=0;for(const o of this.parts){const{st:c}=this.stateAt(o,n);!c||c.scene!==s.scene||(this.frameLocal.push(...this.corners(o,c.pos,c.rot)),c.step===n&&(r=Math.max(r,c.delay+ei+(c.spin?.4:0))))}let a;for(const o of this.hws){if(o.item.step!==n)continue;const c=Ri+(o.item.turn?Qr:0);r=Math.max(r,o.item.delay+c),o.item.travel>0&&(!a||o.item.delay<a.item.delay)&&(a=o)}if(this.stepEnd=Math.max(r,.6),this.cornerItems=Math.min(4,new Set(this.hws.filter(o=>o.item.step===n&&!o.item.preset).map(o=>o.item.ref)).size),a&&this.callout){const o=new R(...a.item.pos),c=new R(...a.item.dir).normalize();if(a.parent){const{st:u}=this.stateAt(a.parent,n);if(u){const f=ni(u.rot);o.applyQuaternion(f).add(new R(...u.pos)),c.applyQuaternion(f)}}const l=t.hardware.find(u=>u.id===a.item.ref),h=l.kind==="runner"||l.kind==="hinge"?55:l.kind==="bracket"?50:l.kind==="plate"?55:l.kind==="knob"||l.kind==="handle"?50:Math.max(17,Math.min(55,Math.max(l.len,l.dia*2)*.72));this.focus={local:o,dir:c,size:h,hw:a}}s.wall&&this.ensureWall(),s.check==="square"&&this.ensureSquare()}else if(e.kind==="intro"){this.frameLocal=[...this.extents.get("final")??[]];for(const[n,s]of this.stack){const r=this.byKey.get(n);this.frameLocal.push(...r.corners.map(a=>a.clone().applyQuaternion(s.q).add(s.p)))}this.stepEnd=.3+this.parts.length*this.introGap()+ei+.6}else if(e.kind==="assembled"){this.frameLocal=[...this.extents.get("final")??[]];for(const n of e.frame??[])this.frameLocal.push(new R(...n))}else if(e.kind==="layout")for(const[n,s]of this.layout){const r=this.byKey.get(n);this.frameLocal.push(...r.corners.map(a=>a.clone().applyQuaternion(s.q).add(s.p)))}else if(e.kind==="part"){const n=this.parts.find(s=>s.item.ref===e.ref);n&&(this.frameLocal=n.corners.map(s=>s.clone()))}}introGap(){return Math.min(.14,2/Math.max(1,this.parts.length))}ensureWall(){if(this.wall)return;const t=this.extents.get("final")??[],e=new tn().setFromPoints(t),n=e.max.x-e.min.x+700,s=e.max.y+420,r=L0(n,s),a=new ln;a.add(r.root),a.position.set((e.min.x+e.max.x)/2,s/2,e.min.z-20),this.root.add(a);for(const o of r.lines)o.color.copy(Gl);this.wall={d:r,node:a,on:0}}ensureSquare(){if(!this.overlay||this.squareEls.length)return;const t="http://www.w3.org/2000/svg";for(let n=0;n<2;n++){const s=document.createElementNS(t,"path");s.setAttribute("class","diag"),this.overlay.appendChild(s),this.squareEls.push(s)}const e=document.createElementNS(t,"g");e.setAttribute("class","diag-eq"),e.innerHTML='<circle r="17"></circle><path d="M-7 -3.5 H7 M-7 3.5 H7"></path>',this.overlay.appendChild(e),this.squareEls.push(e)}tick(t){if(!this.plan)return;this.paused||(this.t+=t*this.speed);const e=this.mode;if(e.kind==="step"&&this.opts.loop!==!1){const n=this.stepEnd+Ci+jr;this.t>n&&(this.t=0,this.loopCount++)}e.kind==="intro"&&!this.introDone&&this.t>this.stepEnd&&(this.introDone=!0,this.opts.onIntroDone?.(),this.mode={kind:"assembled",turntable:!0,dims:e.kind==="intro"&&!!e.dims},this.t=0,this.prepareMode()),this.updateRoot(t),this.updateItems(),this.updateCamera(t)}targetPoseQ(){const t=this.step;return t?ni(Jc[t.pose]):new je}sceneName(){const t=this.step;return t?t.scene==="main"?"final":t.scene:"final"}updateRoot(t){const e=this.targetPoseQ();!this.rootReady||t===0?(this.rootQ.copy(e),this.rootReady=!0):this.rootQ.slerp(e,1-Math.exp(-t*3.2)),this.root.quaternion.copy(this.rootQ);const n=this.extents.get(this.sceneName())??[];if(!n.length)return;let s=1/0,r=1/0,a=-1/0,o=1/0,c=-1/0;for(const u of n)Pi.copy(u).applyQuaternion(this.rootQ),s=Math.min(s,Pi.y),r=Math.min(r,Pi.x),a=Math.max(a,Pi.x),o=Math.min(o,Pi.z),c=Math.max(c,Pi.z);(this.mode.kind==="layout"||this.mode.kind==="intro")&&(s=0),this.root.position.set(-(r+a)/2,-s,-(o+c)/2),(this.mode.kind==="layout"||this.mode.kind==="intro"||this.mode.kind==="part")&&this.root.position.set(0,0,0);const l=(a-r)*1.35+200,h=(c-o)*1.35+200;this.shadow.scale.set(l,h,1),this.shadow.visible=this.mode.kind!=="layout"&&this.mode.kind!=="part",this.root.updateMatrixWorld(!0)}styleDrawable(t,e){t.opacity=e.opacity;for(const r of t.faces)r.uniforms.uOpacity.value=e.opacity,r.uniforms.uTintAmt.value=e.tint,r.depthWrite=e.opacity>.05;const n=e.ink?uo:Gl,s=this.opts.offscreen?e.width*1.15:e.width;for(const r of t.lines)r.color.copy(n),r.opacity=e.opacity,r.linewidth=s;for(const r of t.thin)r.color.copy(n),r.opacity=e.opacity*.9,r.linewidth=Math.max(.8,e.width*.62);for(const r of t.hulls)r.uniforms.uColor.value.copy(n),r.uniforms.uOpacity.value=e.opacity,r.uniforms.uWidth.value=e.width*.95}updateItems(){const t=this.mode,e=this.t,n=this.step,s=t.kind==="step"?t.index:-1,r=n?.scene??"main",o=this.opts.loop!==!1&&t.kind==="step"&&e>this.stepEnd+Ci?1-ve((e-this.stepEnd-Ci)/jr):1,c=this.highlight,l=new Set;for(const h of this.parts){const u=h.node,f=h.item.ref,p=this.hovered===f,g=c?.has(f)??!1;if(t.kind==="step"){const{st:v,prev:m}=this.stateAt(h,s);if(!v||v.scene!==r){u.visible=!1;continue}u.visible=!0,l.add(h);const d=v.step===s,b={p:new R(...v.pos),q:ni(v.rot)};if(d){const A=ve((e-v.delay)/(ei+(v.spin?.4:0))),S=Xl(A);let y=ve((e-v.delay)/.22)*o;if(m&&m.scene===v.scene)u.position.lerpVectors(new R(...m.pos),b.p,ti(A)),u.quaternion.slerpQuaternions(ni(m.rot),b.q,ti(A)),y=1;else{const C=v.from?new R(...v.from):new R;u.position.copy(b.p).addScaledVector(C,1-S),u.quaternion.copy(b.q),v.spin&&(ql.setFromAxisAngle(Li,-(1-S)*v.spin*Math.PI*2),u.quaternion.multiply(ql))}const E=A>=1?ve((e-v.delay-ei)/.5):0;this.styleDrawable(h.d,{opacity:y,ink:!0,tint:p||g?.75:.34-E*.1,width:2.2})}else u.position.copy(b.p),u.quaternion.copy(b.q),this.styleDrawable(h.d,{opacity:1,ink:p||g,tint:p||g?.7:0,width:p||g?1.9:1.5})}else if(t.kind==="intro"){u.visible=!0,l.add(h);const v=this.introOrder(h),m=this.introGap(),d=.3+v*m,b=ve((e-d)/ei),A=ti(b),S=this.stack.get(h.item.key),y={p:new R(...h.item.final.pos),q:ni(h.item.final.rot)};S?(u.position.lerpVectors(S.p,y.p,A),u.position.y+=Math.sin(Math.PI*A)*260,u.quaternion.slerpQuaternions(S.q,y.q,A),this.styleDrawable(h.d,{opacity:1,ink:!0,tint:b>0&&b<1?.5:0,width:1.9})):(u.position.copy(y.p).add(new R(0,400*(1-Xl(b)),0)),u.quaternion.copy(y.q),this.styleDrawable(h.d,{opacity:ve((e-d)/.3),ink:!0,tint:0,width:1.9}))}else if(t.kind==="layout"){const v=this.layout.get(h.item.key);if(!v){u.visible=!1;continue}u.visible=!0,l.add(h),u.position.copy(v.p),u.quaternion.copy(v.q),this.styleDrawable(h.d,{opacity:c&&!g?.35:1,ink:!0,tint:g||p?.85:0,width:g||p?2.3:1.8})}else if(t.kind==="part"){const v=this.parts.find(m=>m.item.ref===t.ref);u.visible=v===h,v===h&&(l.add(h),u.position.set(0,0,0),u.quaternion.identity(),this.styleDrawable(h.d,{opacity:1,ink:!0,tint:0,width:2}))}else u.visible=!0,l.add(h),u.position.set(...h.item.final.pos),u.quaternion.copy(ni(h.item.final.rot)),this.styleDrawable(h.d,{opacity:1,ink:!0,tint:p||g?.6:0,width:1.9})}for(const h of this.hws){const u=h.item;let f=!1;if(t.kind==="step"?f=u.step<=s&&(h.parent?l.has(h.parent):u.scene===r):t.kind==="assembled"?f=!!h.parent&&!this.plan?.steps[u.step]?.wall:t.kind==="intro"&&(f=e>this.stepEnd-.7&&!!h.parent&&!this.plan?.steps[u.step]?.wall),h.holder.visible=f,!f)continue;const p=t.kind==="step"&&u.step===s;if(p&&u.travel>0){const g=ve((e-u.delay)/Ri),v=ti(g);h.inner.position.set(0,u.travel*(1-v),0);let m=(u.spin??0)*Math.PI*2*v;u.turn&&(m+=u.turn*ti(ve((e-u.delay-Ri)/Qr))),h.inner.quaternion.setFromAxisAngle(Li,m);const d=ve((e-u.delay)/.15)*o;this.styleDrawable(h.d,{opacity:d,ink:!0,tint:0,width:1.6})}else{h.inner.position.set(0,0,0),h.inner.quaternion.setFromAxisAngle(Li,(u.spin??0)*Math.PI*2+(u.turn??0));const g=t.kind==="intro"?ve((e-this.stepEnd+.7)/.5):1,v=this.highlight?.has(u.ref)??!1;this.styleDrawable(h.d,{opacity:g,ink:p||v||t.kind!=="step",tint:v?.8:0,width:v?1.7:1.25})}}if(this.wall){const h=!!n?.wall;this.wall.on+=((h?1:0)-this.wall.on)*.12,this.wall.node.visible=this.wall.on>.02,this.styleDrawable(this.wall.d,{opacity:this.wall.on*.9,ink:!1,tint:0,width:1.2})}}introOrder(t){return this.introOrderCache.size||[...this.parts].sort((n,s)=>{const r=n.item.states[n.item.states.length-1].step,a=s.item.states[s.item.states.length-1].step;return r-a||n.item.states[n.item.states.length-1].delay-s.item.states[s.item.states.length-1].delay}).forEach((n,s)=>this.introOrderCache.set(n.item.key,s)),this.introOrderCache.get(t.item.key)??0}camAngles(){let t=this.az,e=this.el0;return this.mode.kind==="layout"&&(t=.22,e=1),this.mode.kind==="assembled"&&this.mode.view&&(t=this.mode.view.az,e=this.mode.view.el),this.mode.kind==="assembled"&&this.mode.turntable&&(t+=Math.sin(performance.now()/1e3/3.2)*.32),this.mode.kind==="part"&&(t=.7,e=.5),{az:t+this.userAz,el:Math.max(.05,Math.min(1.45,e+this.userEl))}}updateCamera(t){if(this.autoReset&&!this.dragging){const H=t===0?1:1-Math.exp(-t*4);this.userAz+=(0-this.userAz)*H,this.userEl+=(0-this.userEl)*H,this.userZoom+=(1-this.userZoom)*H}const{az:e,el:n}=this.camAngles(),s=new R(Math.sin(e)*Math.cos(n),Math.sin(n),Math.cos(e)*Math.cos(n)),r=new R().crossVectors(Li,s).normalize(),a=new R().crossVectors(s,r).normalize(),o=this.frameLocal;let c=1/0,l=-1/0,h=1/0,u=-1/0;const f=new R,p=new R;if(o.length)for(const H of o){p.copy(H).applyMatrix4(this.root.matrixWorld);const Y=p.dot(r),J=p.dot(a);c=Math.min(c,Y),l=Math.max(l,Y),h=Math.min(h,J),u=Math.max(u,J)}else c=h=-500,l=u=500;const g=this.w/this.h,v=this.w<640,m=this.mode.kind,d=this.opts.margins??{t:0,r:0,b:0,l:0};let b=40,A=40,S=40,y=40;if(this.opts.offscreen){const H=Math.round(Math.min(this.w,this.h)*.07);b=A=S=y=m==="part"?4:H}else if(m==="step"){const H=this.callout&&this.focus?this.callout.size+(v?24:56):0;b=(v?70:96)+d.t,y=(v?24:36)+d.l,S=(v?56:72)+d.b,A=Math.max(v?24:36,H*(v?.55:1))+d.r}else m==="part"?b=A=S=y=4:m==="layout"?(b=v?30:60,S=v?40:70,y=A=v?16:40):(b=(v?36:70)+d.t,S=(v?36:70)+d.b,y=(v?24:70)+d.l,A=(v?24:70)+d.r);const E=(H,Y,J,wt)=>{const Mt=Math.max(60,this.w-H-J),Zt=Math.max(60,this.h-Y-wt);return{l:H,t:Y,aw:Mt,ah:Zt,s:Math.max((l-c)/Mt,(u-h)/Zt,.05)}},C=[[y,b]];if(m==="step"&&this.cornerItems){const H=(v?128:200)+d.t,Y=(v?34+this.cornerItems*48:46+this.cornerItems*62)+d.l;C.splice(0,1,[y,Math.max(b,H)],[Math.max(y,Y),b])}let x=E(y,b,A,S),w=!0;for(const[H,Y]of C){const J=E(H,Y,A,S);if((w||J.s<x.s)&&(x=J),w=!1,m==="step"&&this.callout&&this.focus){const wt=E(H,Math.max(Y,this.callout.size+34),(v?24:36)+d.r,S);wt.s<x.s&&(x=wt)}}y=x.l,b=x.t;const P=x.aw,U=x.ah,F=x.s*(m==="part"?1.04:1.06);let z=F*this.h/2;const D=y+P/2-this.w/2,B=b+U/2-this.h/2,X=(c+l)/2-D*F*this.userZoom,W=(h+u)/2+B*F*this.userZoom;if(z=Math.max(z,60)*this.userZoom,f.copy(r).multiplyScalar(X).addScaledVector(a,W),o.length){const H=new tn;for(const J of o)H.expandByPoint(p.copy(J).applyMatrix4(this.root.matrixWorld));const Y=H.getCenter(new R);f.addScaledVector(s,Y.dot(s))}if(!this.camReady||t===0)this.camTarget.copy(f),this.camHalf=z,this.camReady=!0;else{const H=1-Math.exp(-t*4.2);this.camTarget.lerp(f,H),this.camHalf+=(z-this.camHalf)*H}const Q=this.camera;Q.left=-this.camHalf*g,Q.right=this.camHalf*g,Q.top=this.camHalf,Q.bottom=-this.camHalf,Q.position.copy(this.camTarget).addScaledVector(s,8e3),Q.up.copy(Li),Q.lookAt(this.camTarget),Q.near=10,Q.far=3e4,Q.updateProjectionMatrix(),Q.updateMatrixWorld()}setRes(t,e){this.renderer.getPixelRatio();const n=s=>{for(const r of s.lines)r.resolution.set(t,e);for(const r of s.thin)r.resolution.set(t,e);for(const r of s.hulls)r.uniforms.uRes.value.set(t,e)};this.parts.forEach(s=>n(s.d)),this.hws.forEach(s=>n(s.d)),this.wall&&n(this.wall.d)}render(){this.setRes(this.w,this.h),this.renderer.render(this.scene,this.camera),this.overlay&&(this.updateOverlay(),this.renderCallout())}snapshot(t,e){return this.resize(t,e),this.camReady=!1,this.rootReady=!1,this.tick(0),this.setRes(t,e),this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png")}locate(t){const e=new R(...t);return this.root.updateMatrixWorld(!0),this.root.localToWorld(e),this.project(e)}project(t){const e=t.clone().project(this.camera);return{x:(e.x+1)/2*this.w,y:(1-e.y)/2*this.h}}updateOverlay(){const t=this.plan;if(!t||!this.overlay)return;const e=this.mode,n=this.t,s=this.step,r="http://www.w3.org/2000/svg";this.overlay.setAttribute("viewBox",`0 0 ${this.w} ${this.h}`);const a=[],o=new Set,c=new Map;if(e.kind==="step"&&s){const l=this.opts.loop!==!1&&n>this.stepEnd+Ci?1-ve((n-this.stepEnd-Ci)/jr):1;for(const h of this.parts){if(!h.node.visible)continue;const{st:u,prev:f}=this.stateAt(h,e.index);if(!u||u.step!==e.index)continue;const p=u.from?u.from.join(",")+"@"+u.delay.toFixed(2):"";if(u.from&&!(f&&f.scene===u.scene)&&!o.has(p)){o.add(p);const g=new R(...u.pos),v=new R(...u.from);if(v.length()>60){const d=(n-u.delay)/ei,b=(d<0?ve(1+d*4):d<.75?1:ve(1-(d-.75)*4))*l;if(b>.01){const A=this.root.localToWorld(g.clone().addScaledVector(v,1.12)),S=this.root.localToWorld(g.clone().addScaledVector(v,.42)),y=this.project(A),E=this.project(S),C=Math.hypot(E.x-y.x,E.y-y.y);C>26&&a.push({d:$l(y,E,Math.min(1,C/60)),o:b})}}}if(this.labelLayer&&!h.type.extra&&this.typeFirst.get(h.type.id)===e.index){const g=ve((n-u.delay-ei*.55)/.3)*l;if(!c.has(h.type.id)&&g>0){const v=new R;h.node.getWorldPosition(v);const m=this.project(v);c.set(h.type.id,{x:m.x,y:m.y,text:h.type.label,o:g,lit:this.highlight?.has(h.type.id)??!1})}}}}if(e.kind==="layout"&&this.labelLayer){const l=new Map;this.parts.forEach(h=>l.set(h.type.id,(l.get(h.type.id)??0)+1));for(const h of this.parts){if(!h.node.visible||c.has(h.type.id)||h.type.extra)continue;const u=new R;h.node.getWorldPosition(u);const f=this.project(u),p=l.get(h.type.id)??1;c.set(h.type.id,{x:f.x,y:f.y,text:h.type.label,sub:p>1?`${p}×`:void 0,o:1,lit:this.highlight?.has(h.type.id)??!1})}}for(;this.arrows.length<a.length;){const l=document.createElementNS(r,"path");l.setAttribute("class","arrow"),this.overlay.insertBefore(l,this.overlay.firstChild),this.arrows.push(l)}if(this.arrows.forEach((l,h)=>{const u=a[h];if(!u){l.style.opacity="0";return}l.setAttribute("d",u.d),l.style.opacity=String(u.o)}),this.labelLayer){for(const[l,h]of this.labels)c.has(l)||(h.remove(),this.labels.delete(l));for(const[l,h]of c){let u=this.labels.get(l);u||(u=document.createElement("div"),u.className="stage-label",this.labelLayer.appendChild(u),this.labels.set(l,u));const f=`<b>${Xs(h.text)}</b>${h.sub?`<span>${Xs(h.sub)}</span>`:""}`;u.innerHTML!==f&&(u.innerHTML=f),u.style.transform=`translate(${h.x}px, ${h.y}px) translate(-50%, -50%) scale(${.7+.3*h.o})`,u.style.opacity=String(h.o),u.classList.toggle("lit",h.lit)}}if(this.updateDims(),this.squareEls.length){const l=s?.check==="square",[h,u,f]=this.squareEls;if(l&&t){const p=this.extents.get("final"),g=new tn().setFromPoints(p),v=g.min.z,m=[new R(g.min.x+30,g.min.y+30,v),new R(g.max.x-30,g.max.y-30,v),new R(g.max.x-30,g.min.y+30,v),new R(g.min.x+30,g.max.y-30,v)].map(y=>this.project(this.root.localToWorld(y))),d=ti(ve((n-.3)/1.2)),b=(y,E)=>{const C=(y.x+E.x)/2,x=(y.y+E.y)/2,w=C+(y.x-C)*d,P=x+(y.y-x)*d,U=C+(E.x-C)*d,F=x+(E.y-x)*d;return D0({x:w,y:P},{x:U,y:F})};h.setAttribute("d",b(m[0],m[1])),u.setAttribute("d",b(m[2],m[3]));const A=(m[0].x+m[1].x)/2,S=(m[0].y+m[1].y)/2;f.setAttribute("transform",`translate(${A} ${S}) scale(${d})`);for(const y of this.squareEls)y.style.opacity=String(d>0?1:0)}else for(const p of this.squareEls)p.style.opacity="0"}}updateDims(){const t=this.mode;if(!(t.kind==="assembled"&&!!t.dims&&this.plan)){this.dimsEl&&(this.dimsEl.style.opacity="0");return}const n="http://www.w3.org/2000/svg";this.dimsEl||(this.dimsEl=document.createElementNS(n,"g"),this.dimsEl.setAttribute("class","dims"),this.overlay.appendChild(this.dimsEl));const s=this.extents.get("final")??[];if(!s.length)return;const r=new tn().setFromPoints(s),a=this.plan.spec.size,o=ti(ve((this.t-.2)/.9)),l=Math.max(r.max.x-r.min.x,r.max.y-r.min.y)*.07,h=(v,m,d)=>this.project(this.root.localToWorld(new R(v,m,d))),u=(v,m,d,b,A)=>{const S=h(...v),y=h(...m),E=h(v[0]+d[0],v[1]+d[1],v[2]+d[2]),C=h(m[0]+d[0],m[1]+d[1],m[2]+d[2]),x=(E.x+C.x)/2,w=(E.y+C.y)/2,P=x+(E.x-x)*o,U=w+(E.y-w)*o,F=x+(C.x-x)*o,z=w+(C.y-w)*o,D=C.x-E.x,B=C.y-E.y,X=Math.hypot(D,B)||1,W=D/X,Q=B/X,H=7,Y=(Zt,qt,Kt)=>`M${Zt+Kt*W*H+Q*H*.55} ${qt+Kt*Q*H-W*H*.55} L${Zt} ${qt} L${Zt+Kt*W*H-Q*H*.55} ${qt+Kt*Q*H+W*H*.55}`,J=`M${S.x} ${S.y} L${E.x+(E.x-S.x)*.25} ${E.y+(E.y-S.y)*.25} M${y.x} ${y.y} L${C.x+(C.x-y.x)*.25} ${C.y+(C.y-y.y)*.25}`,wt=x-Q*16*A,Mt=w+W*16*A;return`<path class="ext" d="${J}" style="opacity:${o*.6}"/><path class="dim" d="M${P} ${U} L${F} ${z} ${o>.98?Y(E.x,E.y,1)+Y(C.x,C.y,-1):""}"/><text x="${wt}" y="${Mt+5}" style="opacity:${ve((o-.6)/.4)}">${b}</text>`},{min:f,max:p}=r;let g="";g+=u([f.x,f.y,p.z],[p.x,f.y,p.z],[0,-l*.2,l],`${Math.round(a.w)} cm`,1),g+=u([p.x,f.y,p.z],[p.x,f.y,f.z],[l,-l*.2,0],`${Math.round(a.d)} cm`,1),g+=u([f.x,f.y,p.z],[f.x,p.y,p.z],[-l,0,l*.3],`${Math.round(a.h)} cm`,-1),this.dimsEl.innerHTML!==g&&(this.dimsEl.innerHTML=g),this.dimsEl.style.opacity="1"}renderCallout(){const t=this.callout;if(!t||!this.leader||!this.leaderDot)return;const e=this.mode.kind==="step"?this.focus:void 0,n=this.t;let s=0;if(e){const X=(n-e.hw.item.delay+.5)/.4;s=ve(X),n>this.stepEnd+Ci&&(s=1)}t.visible+=(s-t.visible)*.18;const r=t.visible>.02&&!!e;if(t.wrap.style.opacity=String(t.visible),t.wrap.style.transform=`scale(${.85+.15*t.visible})`,t.wrap.style.visibility=r?"visible":"hidden",this.leader.style.opacity=this.leaderDot.style.opacity=String(r?t.visible:0),!r||!e)return;const a=this.root.localToWorld(e.local.clone()),o=e.dir.clone().applyQuaternion(this.root.quaternion).normalize(),c=new R().subVectors(this.camera.position,this.camTarget).normalize().negate(),l=o.clone().multiplyScalar(.85).addScaledVector(c,.55).normalize(),h=t.camera,u=e.size;h.left=-u,h.right=u,h.top=u,h.bottom=-u,h.position.copy(a).addScaledVector(l,-900),h.up.copy(Math.abs(l.y)>.92?new R(0,0,-1):Li),h.lookAt(a),h.near=900-Math.max(120,u*2.2),h.far=1800,h.updateProjectionMatrix(),h.updateMatrixWorld();const f=t.size;this.setRes(f,f);const p=this.shadow.visible;this.shadow.visible=!1,this.wall&&(this.wall.node.visible=this.wall.on>.02),t.renderer.render(this.scene,h),this.shadow.visible=p,this.setRes(this.w,this.h);const g=this.project(a),v=t.wrap.getBoundingClientRect(),m=this.el.getBoundingClientRect(),d=v.left-m.left+v.width/2,b=v.top-m.top+v.height/2,A=v.width/2,S=Math.atan2(g.y-b,g.x-d),y=d+Math.cos(S)*A,E=b+Math.sin(S)*A;this.leader.setAttribute("d",`M${g.x} ${g.y} L${y} ${E}`),this.leaderDot.setAttribute("cx",String(g.x)),this.leaderDot.setAttribute("cy",String(g.y));const C=t.svg;C.setAttribute("viewBox",`0 0 ${f} ${f}`);const x=e.hw.item,w=ve((n-x.delay)/Ri),P=X=>{const W=X.clone().project(h);return{x:(W.x+1)/2*f,y:(1-W.y)/2*f}},U=P(a.clone().addScaledVector(o,-u*1.15)),F=P(a.clone().addScaledVector(o,-u*.45));let z="";const D=w<1?1:ve(1-(n-x.delay-Ri)*2);if(Math.hypot(F.x-U.x,F.y-U.y)>18&&(z+=`<path class="arrow" style="opacity:${D}" d="${$l(U,F,.9)}"/>`),(x.turn??0)>0||(x.spin??0)>0){const X=P(a),W=x.turn?ve((n-x.delay-Ri)/Qr):w,Q=x.turn?W>0?1:0:1;z+=`<path class="arrow turn" style="opacity:${Q}" d="${U0(X.x,X.y,Math.min(34,f*.2),-2.4+W*.4,.9+W*.4)}"/>`}C.innerHTML!==z&&(C.innerHTML=z)}bindPointer(){const t=this.renderer.domElement;t.style.touchAction="none",t.addEventListener("pointerdown",n=>{if(t.setPointerCapture(n.pointerId),this.pointers.set(n.pointerId,{x:n.clientX,y:n.clientY}),this.downAt={x:n.clientX,y:n.clientY,t:performance.now()},this.pointers.size===2){const[s,r]=[...this.pointers.values()];this.pinch0=Math.hypot(s.x-r.x,s.y-r.y),this.zoom0=this.userZoom}this.dragging=!0}),t.addEventListener("pointermove",n=>{const s=this.pointers.get(n.pointerId);if(!s){this.hoverAt(n.clientX,n.clientY);return}if(this.pointers.size===2){this.pointers.set(n.pointerId,{x:n.clientX,y:n.clientY});const[r,a]=[...this.pointers.values()],o=Math.hypot(r.x-a.x,r.y-a.y);this.pinch0>0&&(this.userZoom=Math.max(.35,Math.min(2.5,this.zoom0*this.pinch0/o)))}else{const r=n.clientX-s.x,a=n.clientY-s.y;this.pointers.set(n.pointerId,{x:n.clientX,y:n.clientY}),this.userAz-=r*.0075,this.userEl+=a*.005,this.userEl=Math.max(-.4,Math.min(.95,this.userEl))}Math.hypot(n.clientX-this.downAt.x,n.clientY-this.downAt.y)>4&&this.autoReset&&(this.autoReset=!1,this.opts.onUserView?.(!0)),this.setHover(null)});const e=n=>{this.pointers.delete(n.pointerId),this.pointers.size===0&&(this.dragging=!1),this.pinch0=0};t.addEventListener("pointerup",e),t.addEventListener("pointercancel",e),t.addEventListener("pointerleave",()=>this.setHover(null)),t.addEventListener("wheel",n=>{!n.ctrlKey&&Math.abs(n.deltaY)<1||(n.preventDefault(),this.userZoom=Math.max(.35,Math.min(2.5,this.userZoom*Math.exp(n.deltaY*.0015))),this.autoReset&&(this.autoReset=!1,this.opts.onUserView?.(!0)))},{passive:!1}),t.addEventListener("dblclick",()=>this.resetView()),this.tooltip=document.createElement("div"),this.tooltip.className="stage-tip",this.el.appendChild(this.tooltip)}hoverAt(t,e){if(!this.plan||matchMedia("(hover: none)").matches)return;const n=this.el.getBoundingClientRect(),s=(t-n.left)/n.width*2-1,r=-((e-n.top)/n.height)*2+1;this.ray.setFromCamera(new mt(s,r),this.camera);const a=[];for(const l of this.parts)l.node.visible&&l.d.opacity>.5&&a.push(...l.d.meshes);const c=this.ray.intersectObjects(a,!1)[0]?.object.userData.ref??null;if(this.setHover(c),this.tooltip){const l=c?this.plan.parts.find(h=>h.id===c):null;l&&!l.extra?(this.tooltip.innerHTML=`<b>${Xs(l.label)}</b>${Xs(l.name)}`,this.tooltip.style.transform=`translate(${t-n.left+14}px, ${e-n.top+16}px)`,this.tooltip.style.opacity="1"):this.tooltip.style.opacity="0"}}setHover(t){this.hovered!==t&&(this.hovered=t,this.opts.onHover?.(t),!t&&this.tooltip&&(this.tooltip.style.opacity="0"))}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),clearInterval(this.fallback),this.ro?.disconnect(),this.io?.disconnect(),this.clear(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement.remove(),this.callout&&(this.callout.renderer.dispose(),this.callout.renderer.forceContextLoss(),this.callout.wrap.remove()),this.overlay?.remove(),this.labelLayer?.remove(),this.tooltip?.remove()}}function ta(i){i.faces.forEach(t=>t.dispose()),i.lines.forEach(t=>t.dispose()),i.thin.forEach(t=>t.dispose()),i.hulls.forEach(t=>t.dispose())}function $l(i,t,e=1){const n=t.x-i.x,s=t.y-i.y,r=Math.hypot(n,s)||1,a=n/r,o=s/r,c=-o,l=a,h=4.2*e+1.5,u=16*e+4,f=Math.min(r*.55,18*e+6),p=t.x-a*f,g=t.y-o*f;return[`M${i.x+c*h} ${i.y+l*h}`,`L${p+c*h} ${g+l*h}`,`L${p+c*u/1.6} ${g+l*u/1.6}`,`L${t.x} ${t.y}`,`L${p-c*u/1.6} ${g-l*u/1.6}`,`L${p-c*h} ${g-l*h}`,`L${i.x-c*h} ${i.y-l*h}`,"Z"].join(" ")}function D0(i,t){const e=t.x-i.x,n=t.y-i.y,s=Math.hypot(e,n)||1,r=e/s,a=n/s,o=-a,c=r,l=9;return`M${i.x} ${i.y} L${t.x} ${t.y} M${i.x+r*l+o*l*.6} ${i.y+a*l+c*l*.6} L${i.x} ${i.y} L${i.x+r*l-o*l*.6} ${i.y+a*l-c*l*.6} M${t.x-r*l+o*l*.6} ${t.y-a*l+c*l*.6} L${t.x} ${t.y} L${t.x-r*l-o*l*.6} ${t.y-a*l-c*l*.6}`}function U0(i,t,e,n,s){const a=(l,h)=>`${i+Math.cos(l)*h} ${t+Math.sin(l)*h}`,o=s-n>Math.PI?1:0,c=s+.42;return[`M${a(n,e-3.4)}`,`A${e-3.4} ${e-3.4} 0 ${o} 1 ${a(s,e-3.4)}`,`L${a(s,e-3.4-6)}`,`L${a(c,e)}`,`L${a(s,e+3.4+6)}`,`L${a(s,e+3.4)}`,`A${e+3.4} ${e+3.4} 0 ${o} 0 ${a(n,e+3.4)}`,"Z"].join(" ")}export{N0 as Stage,U0 as arcArrow,$l as arrowPath};
