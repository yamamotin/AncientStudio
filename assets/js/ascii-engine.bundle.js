var ASCIIRealms=function(me){"use strict";var qS=Object.defineProperty;var ZS=(me,vn,ms)=>vn in me?qS(me,vn,{enumerable:!0,configurable:!0,writable:!0,value:ms}):me[vn]=ms;var D=(me,vn,ms)=>ZS(me,typeof vn!="symbol"?vn+"":vn,ms);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vn="170",ms={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Mm={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qh=0,Ol=1,eu=2,Sm=3,bm=0,Bl=1,kl=2,On=3,Bn=0,Ht=1,en=2,kn=0,Di=1,gs=2,zl=3,Hl=4,tu=5,fi=100,nu=101,iu=102,su=103,ru=104,au=200,ou=201,lu=202,cu=203,ua=204,da=205,hu=206,uu=207,du=208,fu=209,pu=210,mu=211,gu=212,vu=213,xu=214,fa=0,pa=1,ma=2,Ui=3,ga=4,va=5,xa=6,ya=7,ar=0,yu=1,_u=2,qn=0,Mu=1,Su=2,bu=3,wu=4,Tu=5,Au=6,Eu=7,Gl="attached",Cu="detached",_a=300,Zn=301,pi=302,or=303,lr=304,vs=306,Tn=1e3,Et=1001,xs=1002,wt=1003,Ma=1004,wm=1004,Ni=1005,Tm=1005,Je=1006,ys=1007,Am=1007,xn=1008,Em=1008,yn=1009,Vl=1010,Wl=1011,_s=1012,Sa=1013,Kn=1014,tn=1015,$n=1016,ba=1017,wa=1018,mi=1020,Xl=35902,Yl=1021,ql=1022,vt=1023,Zl=1024,Kl=1025,Fi=1026,gi=1027,Ta=1028,cr=1029,$l=1030,Aa=1031,Cm=1032,Ea=1033,hr=33776,ur=33777,dr=33778,fr=33779,Ca=35840,Ra=35841,La=35842,Pa=35843,Ia=36196,Da=37492,Ua=37496,Na=37808,Fa=37809,Oa=37810,Ba=37811,ka=37812,za=37813,Ha=37814,Ga=37815,Va=37816,Wa=37817,Xa=37818,Ya=37819,qa=37820,Za=37821,pr=36492,Ka=36494,$a=36495,jl=36283,ja=36284,Ja=36285,Qa=36286,eo=2200,mr=2201,Ru=2202,Ms=2300,Ss=2301,to=2302,Oi=2400,Bi=2401,gr=2402,no=2500,Jl=2501,Lu=0,Ql=1,io=2,Pu=3200,Iu=3201,Rm=3202,Lm=3203,jn=0,Du=1,An="",xt="srgb",Ot="srgb-linear",vr="linear",ht="srgb",Pm=0,ki=7680,Im=7681,Dm=7682,Um=7683,Nm=34055,Fm=34056,Om=5386,Bm=512,km=513,zm=514,Hm=515,Gm=516,Vm=517,Wm=518,ec=519,Uu=512,Nu=513,Fu=514,tc=515,Ou=516,Bu=517,ku=518,zu=519,xr=35044,Xm=35048,Ym=35040,qm=35045,Zm=35049,Km=35041,$m=35046,jm=35050,Jm=35042,Qm="100",nc="300 es",zn=2e3,yr=2001;class Hn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hu=1234567;const zi=Math.PI/180,bs=180/Math.PI;function cn(){const a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[a&255]+Gt[a>>8&255]+Gt[a>>16&255]+Gt[a>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function _t(a,e,t){return Math.max(e,Math.min(t,a))}function ic(a,e){return(a%e+e)%e}function eg(a,e,t,n,i){return n+(a-e)*(i-n)/(t-e)}function tg(a,e,t){return a!==e?(t-a)/(e-a):0}function _r(a,e,t){return(1-t)*a+t*e}function ng(a,e,t,n){return _r(a,e,1-Math.exp(-t*n))}function ig(a,e=1){return e-Math.abs(ic(a,e*2)-e)}function sg(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*(3-2*a))}function rg(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*a*(a*(a*6-15)+10))}function ag(a,e){return a+Math.floor(Math.random()*(e-a+1))}function og(a,e){return a+Math.random()*(e-a)}function lg(a){return a*(.5-Math.random())}function cg(a){a!==void 0&&(Hu=a);let e=Hu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hg(a){return a*zi}function ug(a){return a*bs}function dg(a){return(a&a-1)===0&&a!==0}function fg(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function pg(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function mg(a,e,t,n,i){const s=Math.cos,r=Math.sin,o=s(t/2),l=r(t/2),c=s((e+n)/2),h=r((e+n)/2),u=s((e-n)/2),d=r((e-n)/2),f=s((n-e)/2),p=r((n-e)/2);switch(i){case"XYX":a.set(o*h,l*u,l*d,o*c);break;case"YZY":a.set(l*d,o*h,l*u,o*c);break;case"ZXZ":a.set(l*u,l*d,o*h,o*c);break;case"XZX":a.set(o*h,l*p,l*f,o*c);break;case"YXY":a.set(l*f,o*h,l*p,o*c);break;case"ZYZ":a.set(l*p,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function $t(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function Ye(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}const ze={DEG2RAD:zi,RAD2DEG:bs,generateUUID:cn,clamp:_t,euclideanModulo:ic,mapLinear:eg,inverseLerp:tg,lerp:_r,damp:ng,pingpong:ig,smoothstep:sg,smootherstep:rg,randInt:ag,randFloat:og,randFloatSpread:lg,seededRandom:cg,degToRad:hg,radToDeg:ug,isPowerOfTwo:dg,ceilPowerOfTwo:fg,floorPowerOfTwo:pg,setQuaternionFromProperEuler:mg,normalize:Ye,denormalize:$t};class Q{constructor(e=0,t=0){Q.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,n,i,s,r,o,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,l,c)}set(e,t,n,i,s,r,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],y=i[1],_=i[4],x=i[7],E=i[2],b=i[5],T=i[8];return s[0]=r*v+o*y+l*E,s[3]=r*g+o*_+l*b,s[6]=r*m+o*x+l*T,s[1]=c*v+h*y+u*E,s[4]=c*g+h*_+u*b,s[7]=c*m+h*x+u*T,s[2]=d*v+f*y+p*E,s[5]=d*g+f*_+p*b,s[8]=d*m+f*x+p*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*o*c-n*s*h+n*o*l+i*s*c-i*r*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*r-o*c,d=o*l-h*s,f=c*s-r*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=u*v,e[1]=(i*c-h*n)*v,e[2]=(o*n-i*r)*v,e[3]=d*v,e[4]=(h*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(r*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*r+c*o)+r+e,-i*c,i*l,-i*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(sc.makeScale(e,t)),this}rotate(e){return this.premultiply(sc.makeRotation(-e)),this}translate(e,t){return this.premultiply(sc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const sc=new Xe;function Gu(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}const gg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function ws(a,e){return new gg[a](e)}function Mr(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function Vu(){const a=Mr("canvas");return a.style.display="block",a}const Wu={};function Sr(a){a in Wu||(Wu[a]=!0,console.warn(a))}function vg(a,e,t){return new Promise(function(n,i){function s(){switch(a.clientWaitSync(e,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:i();break;case a.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function xg(a){const e=a.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function yg(a){const e=a.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Qe={enabled:!0,workingColorSpace:Ot,spaces:{},convert:function(a,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ht&&(a.r=Jn(a.r),a.g=Jn(a.g),a.b=Jn(a.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(a.applyMatrix3(this.spaces[e].toXYZ),a.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ht&&(a.r=Ts(a.r),a.g=Ts(a.g),a.b=Ts(a.b))),a},fromWorkingColorSpace:function(a,e){return this.convert(a,this.workingColorSpace,e)},toWorkingColorSpace:function(a,e){return this.convert(a,e,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===An?vr:this.spaces[a].transfer},getLuminanceCoefficients:function(a,e=this.workingColorSpace){return a.fromArray(this.spaces[e].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,e,t){return a.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace}};function Jn(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Ts(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}const Xu=[.64,.33,.3,.6,.15,.06],Yu=[.2126,.7152,.0722],qu=[.3127,.329],Zu=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ku=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qe.define({[Ot]:{primaries:Xu,whitePoint:qu,transfer:vr,toXYZ:Zu,fromXYZ:Ku,luminanceCoefficients:Yu,workingColorSpaceConfig:{unpackColorSpace:xt},outputColorSpaceConfig:{drawingBufferColorSpace:xt}},[xt]:{primaries:Xu,whitePoint:qu,transfer:ht,toXYZ:Zu,fromXYZ:Ku,luminanceCoefficients:Yu,outputColorSpaceConfig:{drawingBufferColorSpace:xt}}});let As;class $u{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{As===void 0&&(As=Mr("canvas")),As.width=e.width,As.height=e.height;const n=As.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=As}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Mr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Jn(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jn(t[n]/255)*255):t[n]=Jn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _g=0;class Hi{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=cn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?s.push(rc(i[r].image)):s.push(rc(i[r]))}else s=rc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function rc(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?$u.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Mg=0;class gt extends Hn{constructor(e=gt.DEFAULT_IMAGE,t=gt.DEFAULT_MAPPING,n=Et,i=Et,s=Je,r=xn,o=vt,l=yn,c=gt.DEFAULT_ANISOTROPY,h=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=cn(),this.name="",this.source=new Hi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_a)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Tn:e.x=e.x-Math.floor(e.x);break;case Et:e.x=e.x<0?0:1;break;case xs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Tn:e.y=e.y-Math.floor(e.y);break;case Et:e.y=e.y<0?0:1;break;case xs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gt.DEFAULT_IMAGE=null,gt.DEFAULT_MAPPING=_a,gt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,i=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,x=(f+1)/2,E=(m+1)/2,b=(h+d)/4,T=(u+v)/4,R=(p+g)/4;return _>x&&_>E?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=T/n):x>E?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=R/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=T/s,i=R/s),this.set(n,i,s,t),this}let y=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ju extends Hn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new gt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Hi(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends ju{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class so extends gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wt,this.minFilter=wt,this.wrapR=Et,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Sg extends nn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new so(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class ac extends gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wt,this.minFilter=wt,this.wrapR=Et,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bg extends nn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new ac(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Vt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[r+0],f=s[r+1],p=s[r+2],v=s[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==p){let g=1-o;const m=l*d+c*f+h*p+u*v,y=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){const E=Math.sqrt(_),b=Math.atan2(E,m*y);g=Math.sin(g*b)/E,o=Math.sin(o*b)/E}const x=o*y;if(l=l*g+d*x,c=c*g+f*x,h=h*g+p*x,u=u*g+v*x,g===1-o){const E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,r){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[r],d=s[r+1],f=s[r+2],p=s[r+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),p=l(s/2);switch(r){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(r-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(r-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(_t(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,r=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+r*o+i*c-s*l,this._y=i*h+r*l+s*o-n*c,this._z=s*h+r*c+n*l-i*o,this._w=r*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,r=this._w;let o=r*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ju.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ju.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*i-o*n),h=2*(o*t-s*i),u=2*(s*n-r*t);return this.x=t+l*c+r*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,r=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*r-n*l,this.z=n*o-i*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return oc.copy(this).projectOnVector(e),this.sub(oc)}reflect(e){return this.sub(oc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oc=new C,Ju=new Vt;class Mt{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,En):En.fromBufferAttribute(s,r),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ro.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ro.copy(n.boundingBox)),ro.applyMatrix4(e.matrixWorld),this.union(ro)}const i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(br),ao.subVectors(this.max,br),Es.subVectors(e.a,br),Cs.subVectors(e.b,br),Rs.subVectors(e.c,br),vi.subVectors(Cs,Es),xi.subVectors(Rs,Cs),Gi.subVectors(Es,Rs);let t=[0,-vi.z,vi.y,0,-xi.z,xi.y,0,-Gi.z,Gi.y,vi.z,0,-vi.x,xi.z,0,-xi.x,Gi.z,0,-Gi.x,-vi.y,vi.x,0,-xi.y,xi.x,0,-Gi.y,Gi.x,0];return!lc(t,Es,Cs,Rs,ao)||(t=[1,0,0,0,1,0,0,0,1],!lc(t,Es,Cs,Rs,ao))?!1:(oo.crossVectors(vi,xi),t=[oo.x,oo.y,oo.z],lc(t,Es,Cs,Rs,ao))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Qn=[new C,new C,new C,new C,new C,new C,new C,new C],En=new C,ro=new Mt,Es=new C,Cs=new C,Rs=new C,vi=new C,xi=new C,Gi=new C,br=new C,ao=new C,oo=new C,Vi=new C;function lc(a,e,t,n,i){for(let s=0,r=a.length-3;s<=r;s+=3){Vi.fromArray(a,s);const o=i.x*Math.abs(Vi.x)+i.y*Math.abs(Vi.y)+i.z*Math.abs(Vi.z),l=e.dot(Vi),c=t.dot(Vi),h=n.dot(Vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const wg=new Mt,wr=new C,cc=new C;class Bt{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):wg.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wr.subVectors(e,this.center);const t=wr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(wr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wr.copy(e.center).add(cc)),this.expandByPoint(wr.copy(e.center).sub(cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ei=new C,hc=new C,lo=new C,yi=new C,uc=new C,co=new C,dc=new C;class Wi{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){hc.copy(e).add(t).multiplyScalar(.5),lo.copy(t).sub(e).normalize(),yi.copy(this.origin).sub(hc);const s=e.distanceTo(t)*.5,r=-this.direction.dot(lo),o=yi.dot(this.direction),l=-yi.dot(lo),c=yi.lengthSq(),h=Math.abs(1-r*r);let u,d,f,p;if(h>0)if(u=r*l-o,d=r*o-l,p=s*h,u>=0)if(d>=-p)if(d<=p){const v=1/h;u*=v,d*=v,f=u*(u+r*d+2*o)+d*(r*u+d+2*l)+c}else d=s,u=Math.max(0,-(r*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(r*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-r*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(r*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=r>0?-s:s,u=Math.max(0,-(r*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(hc).addScaledVector(lo,d),f}intersectSphere(e,t){ei.subVectors(e.center,this.origin);const n=ei.dot(this.direction),i=ei.dot(ei)-n*n,s=e.radius*e.radius;if(i>s)return null;const r=Math.sqrt(s-i),o=n-r,l=n+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,r=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,r=(e.min.y-d.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,i,s){uc.subVectors(t,e),co.subVectors(n,e),dc.crossVectors(uc,co);let r=this.direction.dot(dc),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;yi.subVectors(this.origin,e);const l=o*this.direction.dot(co.crossVectors(yi,co));if(l<0)return null;const c=o*this.direction.dot(uc.cross(yi));if(c<0||l+c>r)return null;const h=-o*yi.dot(dc);return h<0?null:this.at(h/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Oe{constructor(e,t,n,i,s,r,o,l,c,h,u,d,f,p,v,g){Oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,l,c,h,u,d,f,p,v,g)}set(e,t,n,i,s,r,o,l,c,h,u,d,f,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=r,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Oe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ls.setFromMatrixColumn(e,0).length(),s=1/Ls.setFromMatrixColumn(e,1).length(),r=1/Ls.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=r*h,f=r*u,p=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=p+f*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,v=c*u;t[0]=d+v*o,t[4]=p*o-f,t[8]=r*c,t[1]=r*u,t[5]=r*h,t[9]=-o,t[2]=f*o-p,t[6]=v+d*o,t[10]=r*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,v=c*u;t[0]=d-v*o,t[4]=-r*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=r*h,t[9]=v-d*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const d=r*h,f=r*u,p=o*h,v=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,f=r*c,p=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=p*u+f,t[1]=u,t[5]=r*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-v*u}else if(e.order==="XZY"){const d=r*l,f=r*c,p=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=r*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tg,e,Ag)}lookAt(e,t,n){const i=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),_i.crossVectors(n,hn),_i.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),_i.crossVectors(n,hn)),_i.normalize(),ho.crossVectors(hn,_i),i[0]=_i.x,i[4]=ho.x,i[8]=hn.x,i[1]=_i.y,i[5]=ho.y,i[9]=hn.y,i[2]=_i.z,i[6]=ho.z,i[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],y=n[3],_=n[7],x=n[11],E=n[15],b=i[0],T=i[4],R=i[8],S=i[12],M=i[1],P=i[5],z=i[9],F=i[13],k=i[2],H=i[6],U=i[10],$=i[14],G=i[3],J=i[7],oe=i[11],le=i[15];return s[0]=r*b+o*M+l*k+c*G,s[4]=r*T+o*P+l*H+c*J,s[8]=r*R+o*z+l*U+c*oe,s[12]=r*S+o*F+l*$+c*le,s[1]=h*b+u*M+d*k+f*G,s[5]=h*T+u*P+d*H+f*J,s[9]=h*R+u*z+d*U+f*oe,s[13]=h*S+u*F+d*$+f*le,s[2]=p*b+v*M+g*k+m*G,s[6]=p*T+v*P+g*H+m*J,s[10]=p*R+v*z+g*U+m*oe,s[14]=p*S+v*F+g*$+m*le,s[3]=y*b+_*M+x*k+E*G,s[7]=y*T+_*P+x*H+E*J,s[11]=y*R+_*z+x*U+E*oe,s[15]=y*S+_*F+x*$+E*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],v=e[7],g=e[11],m=e[15];return p*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+v*(+t*l*f-t*c*d+s*r*d-i*r*f+i*c*h-s*l*h)+g*(+t*c*u-t*o*f-s*r*u+n*r*f+s*o*h-n*c*h)+m*(-i*o*h-t*l*u+t*o*d+i*r*u-n*r*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],v=e[13],g=e[14],m=e[15],y=u*g*c-v*d*c+v*l*f-o*g*f-u*l*m+o*d*m,_=p*d*c-h*g*c-p*l*f+r*g*f+h*l*m-r*d*m,x=h*v*c-p*u*c+p*o*f-r*v*f-h*o*m+r*u*m,E=p*u*l-h*v*l-p*o*d+r*v*d+h*o*g-r*u*g,b=t*y+n*_+i*x+s*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=y*T,e[1]=(v*d*s-u*g*s-v*i*f+n*g*f+u*i*m-n*d*m)*T,e[2]=(o*g*s-v*l*s+v*i*c-n*g*c-o*i*m+n*l*m)*T,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*T,e[4]=_*T,e[5]=(h*g*s-p*d*s+p*i*f-t*g*f-h*i*m+t*d*m)*T,e[6]=(p*l*s-r*g*s-p*i*c+t*g*c+r*i*m-t*l*m)*T,e[7]=(r*d*s-h*l*s+h*i*c-t*d*c-r*i*f+t*l*f)*T,e[8]=x*T,e[9]=(p*u*s-h*v*s-p*n*f+t*v*f+h*n*m-t*u*m)*T,e[10]=(r*v*s-p*o*s+p*n*c-t*v*c-r*n*m+t*o*m)*T,e[11]=(h*o*s-r*u*s-h*n*c+t*u*c+r*n*f-t*o*f)*T,e[12]=E*T,e[13]=(h*v*i-p*u*i+p*n*d-t*v*d-h*n*g+t*u*g)*T,e[14]=(p*o*i-r*v*i-p*n*l+t*v*l+r*n*g-t*o*g)*T,e[15]=(r*u*i-h*o*i+h*n*l-t*u*l-r*n*d+t*o*d)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,o=e.y,l=e.z,c=s*r,h=s*o;return this.set(c*r+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*r,0,c*l-i*o,h*l+i*r,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,r=t._y,o=t._z,l=t._w,c=s+s,h=r+r,u=o+o,d=s*c,f=s*h,p=s*u,v=r*h,g=r*u,m=o*u,y=l*c,_=l*h,x=l*u,E=n.x,b=n.y,T=n.z;return i[0]=(1-(v+m))*E,i[1]=(f+x)*E,i[2]=(p-_)*E,i[3]=0,i[4]=(f-x)*b,i[5]=(1-(d+m))*b,i[6]=(g+y)*b,i[7]=0,i[8]=(p+_)*T,i[9]=(g-y)*T,i[10]=(1-(d+v))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ls.set(i[0],i[1],i[2]).length();const r=Ls.set(i[4],i[5],i[6]).length(),o=Ls.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Cn.copy(this);const c=1/s,h=1/r,u=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=u,Cn.elements[9]*=u,Cn.elements[10]*=u,t.setFromRotationMatrix(Cn),n.x=s,n.y=r,n.z=o,this}makePerspective(e,t,n,i,s,r,o=zn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,p;if(o===zn)f=-(r+s)/(r-s),p=-2*r*s/(r-s);else if(o===yr)f=-r/(r-s),p=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,r,o=zn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(r-s),d=(t+e)*c,f=(n+i)*h;let p,v;if(o===zn)p=(r+s)*u,v=-2*u;else if(o===yr)p=s*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ls=new C,Cn=new Oe,Tg=new C(0,0,0),Ag=new C(1,1,1),_i=new C,ho=new C,hn=new C,Qu=new Oe,ed=new Vt;class un{constructor(e=0,t=0,n=0,i=un.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],r=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(_t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-_t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(_t(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-_t(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(_t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-_t(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Qu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ed.setFromEuler(this),this.setFromQuaternion(ed,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}un.DEFAULT_ORDER="XYZ";class uo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Eg=0;const td=new C,Ps=new Vt,ti=new Oe,fo=new C,Tr=new C,Cg=new C,Rg=new Vt,nd=new C(1,0,0),id=new C(0,1,0),sd=new C(0,0,1),rd={type:"added"},Lg={type:"removed"},Is={type:"childadded",child:null},fc={type:"childremoved",child:null};class it extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eg++}),this.uuid=cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=it.DEFAULT_UP.clone();const e=new C,t=new un,n=new Vt,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Oe},normalMatrix:{value:new Xe}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=it.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(nd,e)}rotateY(e){return this.rotateOnAxis(id,e)}rotateZ(e){return this.rotateOnAxis(sd,e)}translateOnAxis(e,t){return td.copy(e).applyQuaternion(this.quaternion),this.position.add(td.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nd,e)}translateY(e){return this.translateOnAxis(id,e)}translateZ(e){return this.translateOnAxis(sd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fo.copy(e):fo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(Tr,fo,this.up):ti.lookAt(fo,Tr,this.up),this.quaternion.setFromRotationMatrix(ti),i&&(ti.extractRotation(i.matrixWorld),Ps.setFromRotationMatrix(ti),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rd),Is.child=e,this.dispatchEvent(Is),Is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Lg),fc.child=e,this.dispatchEvent(fc),fc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rd),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,e,Cg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,Rg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),u=r(e.shapes),d=r(e.skeletons),f=r(e.animations),p=r(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}it.DEFAULT_UP=new C(0,1,0),it.DEFAULT_MATRIX_AUTO_UPDATE=!0,it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new C,ni=new C,pc=new C,ii=new C,Ds=new C,Us=new C,ad=new C,mc=new C,gc=new C,vc=new C,xc=new at,yc=new at,_c=new at;class sn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Rn.subVectors(e,t),i.cross(Rn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Rn.subVectors(i,t),ni.subVectors(n,t),pc.subVectors(e,t);const r=Rn.dot(Rn),o=Rn.dot(ni),l=Rn.dot(pc),c=ni.dot(ni),h=ni.dot(pc),u=r*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,p=(r*h-o*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,n,i,s,r,o,l){return this.getBarycoord(e,t,n,i,ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ii.x),l.addScaledVector(r,ii.y),l.addScaledVector(o,ii.z),l)}static getInterpolatedAttribute(e,t,n,i,s,r){return xc.setScalar(0),yc.setScalar(0),_c.setScalar(0),xc.fromBufferAttribute(e,t),yc.fromBufferAttribute(e,n),_c.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(xc,s.x),r.addScaledVector(yc,s.y),r.addScaledVector(_c,s.z),r}static isFrontFacing(e,t,n,i){return Rn.subVectors(n,t),ni.subVectors(e,t),Rn.cross(ni).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),Rn.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(.3333333333333333)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return sn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let r,o;Ds.subVectors(i,n),Us.subVectors(s,n),mc.subVectors(e,n);const l=Ds.dot(mc),c=Us.dot(mc);if(l<=0&&c<=0)return t.copy(n);gc.subVectors(e,i);const h=Ds.dot(gc),u=Us.dot(gc);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(Ds,r);vc.subVectors(e,s);const f=Ds.dot(vc),p=Us.dot(vc);if(p>=0&&f<=p)return t.copy(s);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Us,o);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return ad.subVectors(s,i),o=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(ad,o);const m=1/(g+v+d);return r=v*m,o=d*m,t.copy(n).addScaledVector(Ds,r).addScaledVector(Us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const od={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},po={h:0,s:0,l:0};function Mc(a,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<.16666666666666666?a+(e-a)*6*t:t<.5?e:t<.6666666666666666?a+(e-a)*6*(.6666666666666666-t):a}class Y{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Qe.workingColorSpace){if(e=ic(e,1),t=_t(t,0,1),n=_t(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=Mc(r,s,e+.3333333333333333),this.g=Mc(r,s,e),this.b=Mc(r,s,e-.3333333333333333)}return Qe.toWorkingColorSpace(this,i),this}setStyle(e,t=xt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xt){const n=od[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}copyLinearToSRGB(e){return this.r=Ts(e.r),this.g=Ts(e.g),this.b=Ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xt){return Qe.fromWorkingColorSpace(Wt.copy(this),e),Math.round(_t(Wt.r*255,0,255))*65536+Math.round(_t(Wt.g*255,0,255))*256+Math.round(_t(Wt.b*255,0,255))}getHexString(e=xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(Wt.copy(this),t);const n=Wt.r,i=Wt.g,s=Wt.b,r=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=h<=.5?u/(r+o):u/(2-r-o),r){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=xt){Qe.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,i=Wt.b;return e!==xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(po);const n=_r(Mi.h,po.h,t),i=_r(Mi.s,po.s,t),s=_r(Mi.l,po.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Y;Y.NAMES=od;let Pg=0;class Lt extends Hn{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=cn(),this.name="",this.blending=Di,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ua,this.blendDst=da,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=Ui,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ec,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(n.blending=this.blending),this.side!==Bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ua&&(n.blendSrc=this.blendSrc),this.blendDst!==da&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ui&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ec&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(t){const s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Pt extends Lt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=ar,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const si=Ig();function Ig(){const a=new ArrayBuffer(4),e=new Float32Array(a),t=new Uint32Array(a),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),r=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)r[l]=l<<23;r[31]=1199570944,r[32]=2147483648;for(let l=33;l<63;++l)r[l]=2147483648+(l-32<<23);r[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:r,offsetTable:o}}function rn(a){Math.abs(a)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),a=_t(a,-65504,65504),si.floatView[0]=a;const e=si.uint32View[0],t=e>>23&511;return si.baseTable[t]+((e&8388607)>>si.shiftTable[t])}function Ar(a){const e=a>>10;return si.uint32View[0]=si.mantissaTable[si.offsetTable[e]+(a&1023)]+si.exponentTable[e],si.floatView[0]}const Dg={toHalfFloat:rn,fromHalfFloat:Ar},Ct=new C,mo=new Q;class tt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xr,this.updateRanges=[],this.gpuType=tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mo.fromBufferAttribute(this,t),mo.applyMatrix3(e),this.setXY(t,mo.x,mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$t(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ye(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$t(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$t(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$t(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$t(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array),s=Ye(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xr&&(e.usage=this.usage),e}}class Ug extends tt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class Ng extends tt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class Fg extends tt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class Og extends tt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Sc extends tt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Bg extends tt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class bc extends tt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kg extends tt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Ar(this.array[e*this.itemSize]);return this.normalized&&(t=$t(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize]=rn(t),this}getY(e){let t=Ar(this.array[e*this.itemSize+1]);return this.normalized&&(t=$t(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+1]=rn(t),this}getZ(e){let t=Ar(this.array[e*this.itemSize+2]);return this.normalized&&(t=$t(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+2]=rn(t),this}getW(e){let t=Ar(this.array[e*this.itemSize+3]);return this.normalized&&(t=$t(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+3]=rn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.array[e+0]=rn(t),this.array[e+1]=rn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array)),this.array[e+0]=rn(t),this.array[e+1]=rn(n),this.array[e+2]=rn(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array),s=Ye(s,this.array)),this.array[e+0]=rn(t),this.array[e+1]=rn(n),this.array[e+2]=rn(i),this.array[e+3]=rn(s),this}}class Ce extends tt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let zg=0;const _n=new Oe,wc=new it,Ns=new C,dn=new Mt,Er=new Mt,Nt=new C;class Ve extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gu(e)?bc:Sc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Xe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return wc.lookAt(e),wc.updateMatrix(),this.applyMatrix4(wc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ce(n,3))}else{for(let n=0,i=t.count;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const o=t[s];Er.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(dn.min,Er.min),dn.expandByPoint(Nt),Nt.addVectors(dn.max,Er.max),dn.expandByPoint(Nt)):(dn.expandByPoint(Er.min),dn.expandByPoint(Er.max))}dn.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Nt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Nt));if(t)for(let s=0,r=t.length;s<r;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Nt.fromBufferAttribute(o,c),l&&(Ns.fromBufferAttribute(e,c),Nt.add(Ns)),i=Math.max(i,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tt(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new C,l[R]=new C;const c=new C,h=new C,u=new C,d=new Q,f=new Q,p=new Q,v=new C,g=new C;function m(R,S,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,S),p.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),o[R].add(v),o[S].add(v),o[M].add(v),l[R].add(g),l[S].add(g),l[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let R=0,S=y.length;R<S;++R){const M=y[R],P=M.start,z=M.count;for(let F=P,k=P+z;F<k;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const _=new C,x=new C,E=new C,b=new C;function T(R){E.fromBufferAttribute(i,R),b.copy(E);const S=o[R];_.copy(S),_.sub(E.multiplyScalar(E.dot(S))).normalize(),x.crossVectors(b,S);const P=x.dot(l[R])<0?-1:1;r.setXYZW(R,_.x,_.y,_.z,P)}for(let R=0,S=y.length;R<S;++R){const M=y[R],P=M.start,z=M.count;for(let F=P,k=P+z;F<k;F+=3)T(e.getX(F+0)),T(e.getX(F+1)),T(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,r=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new tt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ve,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ld=new Oe,Xi=new Wi,go=new Bt,cd=new C,vo=new C,xo=new C,yo=new C,Tc=new C,_o=new C,hd=new C,Mo=new C;class Le extends it{constructor(e=new Ve,t=new Pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){_o.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Tc.fromBufferAttribute(u,e),r?_o.addScaledVector(Tc,h):_o.addScaledVector(Tc.sub(t),h))}t.add(_o)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),go.copy(n.boundingSphere),go.applyMatrix4(s),Xi.copy(e.ray).recast(e.near),!(go.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(go,cd)===null||Xi.origin.distanceToSquared(cd)>(e.far-e.near)**2))&&(ld.copy(s).invert(),Xi.copy(e.ray).applyMatrix4(ld),!(n.boundingBox!==null&&Xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=r[g.materialIndex],y=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,E=_;x<E;x+=3){const b=o.getX(x),T=o.getX(x+1),R=o.getX(x+2);i=So(this,m,e,n,c,h,u,b,T,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const y=o.getX(g),_=o.getX(g+1),x=o.getX(g+2);i=So(this,r,e,n,c,h,u,y,_,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=r[g.materialIndex],y=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,E=_;x<E;x+=3){const b=x,T=x+1,R=x+2;i=So(this,m,e,n,c,h,u,b,T,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const y=g,_=g+1,x=g+2;i=So(this,r,e,n,c,h,u,y,_,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Hg(a,e,t,n,i,s,r,o){let l;if(e.side===Ht?l=n.intersectTriangle(r,s,i,!0,o):l=n.intersectTriangle(i,s,r,e.side===Bn,o),l===null)return null;Mo.copy(o),Mo.applyMatrix4(a.matrixWorld);const c=t.ray.origin.distanceTo(Mo);return c<t.near||c>t.far?null:{distance:c,point:Mo.clone(),object:a}}function So(a,e,t,n,i,s,r,o,l,c){a.getVertexPosition(o,vo),a.getVertexPosition(l,xo),a.getVertexPosition(c,yo);const h=Hg(a,e,t,n,vo,xo,yo,hd);if(h){const u=new C;sn.getBarycoord(hd,vo,xo,yo,u),i&&(h.uv=sn.getInterpolatedAttribute(i,o,l,c,u,new Q)),s&&(h.uv1=sn.getInterpolatedAttribute(s,o,l,c,u,new Q)),r&&(h.normal=sn.getInterpolatedAttribute(r,o,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new C,materialIndex:0};sn.getNormal(vo,xo,yo,d.normal),h.face=d,h.barycoord=u}return h}class Mn extends Ve{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const o=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,r,s,0),p("z","y","x",1,-1,n,t,-e,r,s,1),p("x","z","y",1,1,e,n,t,i,r,2),p("x","z","y",1,-1,e,n,-t,i,r,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(u,2));function p(v,g,m,y,_,x,E,b,T,R,S){const M=x/T,P=E/R,z=x/2,F=E/2,k=b/2,H=T+1,U=R+1;let $=0,G=0;const J=new C;for(let oe=0;oe<U;oe++){const le=oe*P-F;for(let Se=0;Se<H;Se++){const K=Se*M-z;J[v]=K*y,J[g]=le*_,J[m]=k,c.push(J.x,J.y,J.z),J[v]=0,J[g]=0,J[m]=b>0?1:-1,h.push(J.x,J.y,J.z),u.push(Se/T),u.push(1-oe/R),$+=1}}for(let oe=0;oe<R;oe++)for(let le=0;le<T;le++){const Se=d+le+H*oe,K=d+le+H*(oe+1),X=d+(le+1)+H*(oe+1),V=d+(le+1)+H*oe;l.push(Se,K,V),l.push(K,X,V),G+=6}o.addGroup(f,G,S),f+=G,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fs(a){const e={};for(const t in a){e[t]={};for(const n in a[t]){const i=a[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function jt(a){const e={};for(let t=0;t<a.length;t++){const n=Fs(a[t]);for(const i in n)e[i]=n[i]}return e}function Gg(a){const e=[];for(let t=0;t<a.length;t++)e.push(a[t].clone());return e}function ud(a){const e=a.getRenderTarget();return e===null?a.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const dd={clone:Fs,merge:jt};var Vg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xt extends Lt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vg,this.fragmentShader=Wg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=Gg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class bo extends it{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new C,fd=new Q,pd=new Q;class Rt extends bo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(zi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,fd,pd),t.subVectors(pd,fd)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/l,t-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Os=-90,Bs=1;class md extends it{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Rt(Os,Bs,e,t);i.layers=this.layers,this.add(i);const s=new Rt(Os,Bs,e,t);s.layers=this.layers,this.add(s);const r=new Rt(Os,Bs,e,t);r.layers=this.layers,this.add(r);const o=new Rt(Os,Bs,e,t);o.layers=this.layers,this.add(o);const l=new Rt(Os,Bs,e,t);l.layers=this.layers,this.add(l);const c=new Rt(Os,Bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,o,l]=t;for(const c of t)this.remove(c);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Cr extends gt{constructor(e,t,n,i,s,r,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Zn,super(e,t,n,i,s,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gd extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Cr(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Je}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Mn(5,5,5),s=new Xt({name:"CubemapFromEquirect",uniforms:Fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:kn});s.uniforms.tEquirect.value=t;const r=new Le(i,s),o=t.minFilter;return t.minFilter===xn&&(t.minFilter=Je),new md(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}}const Ac=new C,Xg=new C,Yg=new Xe;class ri{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ac.subVectors(n,t).cross(Xg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ac),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yg.getNormalMatrix(e),i=this.coplanarPoint(Ac).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yi=new Bt,wo=new C;class Rr{constructor(e=new ri,t=new ri,n=new ri,i=new ri,s=new ri,r=new ri){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn){const n=this.planes,i=e.elements,s=i[0],r=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],v=i[10],g=i[11],m=i[12],y=i[13],_=i[14],x=i[15];if(n[0].setComponents(l-s,d-c,g-f,x-m).normalize(),n[1].setComponents(l+s,d+c,g+f,x+m).normalize(),n[2].setComponents(l+r,d+h,g+p,x+y).normalize(),n[3].setComponents(l-r,d-h,g-p,x-y).normalize(),n[4].setComponents(l-o,d-u,g-v,x-_).normalize(),t===zn)n[5].setComponents(l+o,d+u,g+v,x+_).normalize();else if(t===yr)n[5].setComponents(o,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yi)}intersectsSprite(e){return Yi.center.set(0,0,0),Yi.radius=.7071067811865476,Yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(wo.x=i.normal.x>0?e.max.x:e.min.x,wo.y=i.normal.y>0?e.max.y:e.min.y,wo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(wo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function vd(){let a=null,e=!1,t=null,n=null;function i(s,r){t(s,r),n=a.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=a.requestAnimationFrame(i),e=!0)},stop:function(){a.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){a=s}}}function qg(a){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=a.createBuffer();a.bindBuffer(l,d),a.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=a.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=a.HALF_FLOAT:f=a.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=a.SHORT;else if(c instanceof Uint32Array)f=a.UNSIGNED_INT;else if(c instanceof Int32Array)f=a.INT;else if(c instanceof Int8Array)f=a.BYTE;else if(c instanceof Uint8Array)f=a.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(a.bindBuffer(c,o),u.length===0)a.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const v=u[f];a.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(a.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:r}}class Ln extends Ve{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,r=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const y=m*d-r;for(let _=0;_<c;_++){const x=_*u-s;p.push(x,-y,0),v.push(0,0,1),g.push(_/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){const _=y+c*m,x=y+c*(m+1),E=y+1+c*(m+1),b=y+1+c*m;f.push(_,x,b),f.push(x,E,b)}this.setIndex(f),this.setAttribute("position",new Ce(p,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.width,e.height,e.widthSegments,e.heightSegments)}}var Zg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kg=`#ifdef USE_ALPHAHASH
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
#endif`,$g=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e0=`#ifdef USE_AOMAP
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
#endif`,t0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n0=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,i0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,s0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,o0=`#ifdef USE_IRIDESCENCE
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
#endif`,l0=`#ifdef USE_BUMPMAP
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
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,f0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,m0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,g0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,v0=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,x0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,y0=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,w0="gl_FragColor = linearToOutputTexel( gl_FragColor );",T0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,A0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,E0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,C0=`#ifdef USE_ENVMAP
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
#endif`,R0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,L0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,P0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,I0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,U0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,N0=`#ifdef USE_GRADIENTMAP
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
}`,F0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,O0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,B0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,k0=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,z0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,H0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,G0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,V0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,X0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Y0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,q0=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Z0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,K0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,j0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ev=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,iv=`#if defined( USE_POINTS_UV )
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
#endif`,sv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,av=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ov=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cv=`#ifdef USE_MORPHTARGETS
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
#endif`,hv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gv=`#ifdef USE_NORMALMAP
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
#endif`,vv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_v=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Av=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ev=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Lv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,Pv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,Iv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,Dv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uv=`#ifdef USE_SKINNING
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
#endif`,Nv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fv=`#ifdef USE_SKINNING
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
#endif`,Ov=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hv=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gv=`#ifdef USE_TRANSMISSION
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
#endif`,Vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ze={alphahash_fragment:Zg,alphahash_pars_fragment:Kg,alphamap_fragment:$g,alphamap_pars_fragment:jg,alphatest_fragment:Jg,alphatest_pars_fragment:Qg,aomap_fragment:e0,aomap_pars_fragment:t0,batching_pars_vertex:n0,batching_vertex:i0,begin_vertex:s0,beginnormal_vertex:r0,bsdfs:a0,iridescence_fragment:o0,bumpmap_pars_fragment:l0,clipping_planes_fragment:c0,clipping_planes_pars_fragment:h0,clipping_planes_pars_vertex:u0,clipping_planes_vertex:d0,color_fragment:f0,color_pars_fragment:p0,color_pars_vertex:m0,color_vertex:g0,common:v0,cube_uv_reflection_fragment:x0,defaultnormal_vertex:y0,displacementmap_pars_vertex:_0,displacementmap_vertex:M0,emissivemap_fragment:S0,emissivemap_pars_fragment:b0,colorspace_fragment:w0,colorspace_pars_fragment:T0,envmap_fragment:A0,envmap_common_pars_fragment:E0,envmap_pars_fragment:C0,envmap_pars_vertex:R0,envmap_physical_pars_fragment:z0,envmap_vertex:L0,fog_vertex:P0,fog_pars_vertex:I0,fog_fragment:D0,fog_pars_fragment:U0,gradientmap_pars_fragment:N0,lightmap_pars_fragment:F0,lights_lambert_fragment:O0,lights_lambert_pars_fragment:B0,lights_pars_begin:k0,lights_toon_fragment:H0,lights_toon_pars_fragment:G0,lights_phong_fragment:V0,lights_phong_pars_fragment:W0,lights_physical_fragment:X0,lights_physical_pars_fragment:Y0,lights_fragment_begin:q0,lights_fragment_maps:Z0,lights_fragment_end:K0,logdepthbuf_fragment:$0,logdepthbuf_pars_fragment:j0,logdepthbuf_pars_vertex:J0,logdepthbuf_vertex:Q0,map_fragment:ev,map_pars_fragment:tv,map_particle_fragment:nv,map_particle_pars_fragment:iv,metalnessmap_fragment:sv,metalnessmap_pars_fragment:rv,morphinstance_vertex:av,morphcolor_vertex:ov,morphnormal_vertex:lv,morphtarget_pars_vertex:cv,morphtarget_vertex:hv,normal_fragment_begin:uv,normal_fragment_maps:dv,normal_pars_fragment:fv,normal_pars_vertex:pv,normal_vertex:mv,normalmap_pars_fragment:gv,clearcoat_normal_fragment_begin:vv,clearcoat_normal_fragment_maps:xv,clearcoat_pars_fragment:yv,iridescence_pars_fragment:_v,opaque_fragment:Mv,packing:Sv,premultiplied_alpha_fragment:bv,project_vertex:wv,dithering_fragment:Tv,dithering_pars_fragment:Av,roughnessmap_fragment:Ev,roughnessmap_pars_fragment:Cv,shadowmap_pars_fragment:Rv,shadowmap_pars_vertex:Lv,shadowmap_vertex:Pv,shadowmask_pars_fragment:Iv,skinbase_vertex:Dv,skinning_pars_vertex:Uv,skinning_vertex:Nv,skinnormal_vertex:Fv,specularmap_fragment:Ov,specularmap_pars_fragment:Bv,tonemapping_fragment:kv,tonemapping_pars_fragment:zv,transmission_fragment:Hv,transmission_pars_fragment:Gv,uv_pars_fragment:Vv,uv_pars_vertex:Wv,uv_vertex:Xv,worldpos_vertex:Yv,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
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
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},fe={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Pn={basic:{uniforms:jt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:jt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Y(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:jt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:jt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:jt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Y(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:jt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:jt([fe.points,fe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:jt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:jt([fe.common,fe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:jt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:jt([fe.sprite,fe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:jt([fe.common,fe.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:jt([fe.lights,fe.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Pn.physical={uniforms:jt([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new Q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const To={r:0,b:0,g:0},qi=new un,qv=new Oe;function Zv(a,e,t,n,i,s,r){const o=new Y(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function p(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function v(y){let _=!1;const x=p(y);x===null?m(o,l):x&&x.isColor&&(m(x,1),_=!0);const E=a.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(a.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function g(y,_){const x=p(_);x&&(x.isCubeTexture||x.mapping===vs)?(h===void 0&&(h=new Le(new Mn(1,1,1),new Xt({name:"BackgroundCubeMaterial",uniforms:Fs(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),qi.copy(_.backgroundRotation),qi.x*=-1,qi.y*=-1,qi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(qv.makeRotationFromEuler(qi)),h.material.toneMapped=Qe.getTransfer(x.colorSpace)!==ht,(u!==x||d!==x.version||f!==a.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=a.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Le(new Ln(2,2),new Xt({name:"BackgroundMaterial",uniforms:Fs(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(x.colorSpace)!==ht,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==a.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=a.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,_){y.getRGB(To,ud(a)),n.buffers.color.setClear(To.r,To.g,To.b,_,r)}return{getClearColor:function(){return o},setClearColor:function(y,_=1){o.set(y),l=_,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(o,l)},render:v,addToRenderList:g}}function Kv(a,e){const t=a.getParameter(a.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,r=!1;function o(M,P,z,F,k){let H=!1;const U=u(F,z,P);s!==U&&(s=U,c(s.object)),H=f(M,F,z,k),H&&p(M,F,z,k),k!==null&&e.update(k,a.ELEMENT_ARRAY_BUFFER),(H||r)&&(r=!1,x(M,P,z,F),k!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return a.createVertexArray()}function c(M){return a.bindVertexArray(M)}function h(M){return a.deleteVertexArray(M)}function u(M,P,z){const F=z.wireframe===!0;let k=n[M.id];k===void 0&&(k={},n[M.id]=k);let H=k[P.id];H===void 0&&(H={},k[P.id]=H);let U=H[F];return U===void 0&&(U=d(l()),H[F]=U),U}function d(M){const P=[],z=[],F=[];for(let k=0;k<t;k++)P[k]=0,z[k]=0,F[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:F,object:M,attributes:{},index:null}}function f(M,P,z,F){const k=s.attributes,H=P.attributes;let U=0;const $=z.getAttributes();for(const G in $)if($[G].location>=0){const oe=k[G];let le=H[G];if(le===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(le=M.instanceColor)),oe===void 0||oe.attribute!==le||le&&oe.data!==le.data)return!0;U++}return s.attributesNum!==U||s.index!==F}function p(M,P,z,F){const k={},H=P.attributes;let U=0;const $=z.getAttributes();for(const G in $)if($[G].location>=0){let oe=H[G];oe===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor));const le={};le.attribute=oe,oe&&oe.data&&(le.data=oe.data),k[G]=le,U++}s.attributes=k,s.attributesNum=U,s.index=F}function v(){const M=s.newAttributes;for(let P=0,z=M.length;P<z;P++)M[P]=0}function g(M){m(M,0)}function m(M,P){const z=s.newAttributes,F=s.enabledAttributes,k=s.attributeDivisors;z[M]=1,F[M]===0&&(a.enableVertexAttribArray(M),F[M]=1),k[M]!==P&&(a.vertexAttribDivisor(M,P),k[M]=P)}function y(){const M=s.newAttributes,P=s.enabledAttributes;for(let z=0,F=P.length;z<F;z++)P[z]!==M[z]&&(a.disableVertexAttribArray(z),P[z]=0)}function _(M,P,z,F,k,H,U){U===!0?a.vertexAttribIPointer(M,P,z,k,H):a.vertexAttribPointer(M,P,z,F,k,H)}function x(M,P,z,F){v();const k=F.attributes,H=z.getAttributes(),U=P.defaultAttributeValues;for(const $ in H){const G=H[$];if(G.location>=0){let J=k[$];if(J===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(J=M.instanceColor)),J!==void 0){const oe=J.normalized,le=J.itemSize,Se=e.get(J);if(Se===void 0)continue;const K=Se.buffer,X=Se.type,V=Se.bytesPerElement,ge=X===a.INT||X===a.UNSIGNED_INT||J.gpuType===Sa;if(J.isInterleavedBufferAttribute){const de=J.data,Ue=de.stride,He=J.offset;if(de.isInstancedInterleavedBuffer){for(let Fe=0;Fe<G.locationSize;Fe++)m(G.location+Fe,de.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Fe=0;Fe<G.locationSize;Fe++)g(G.location+Fe);a.bindBuffer(a.ARRAY_BUFFER,K);for(let Fe=0;Fe<G.locationSize;Fe++)_(G.location+Fe,le/G.locationSize,X,oe,Ue*V,(He+le/G.locationSize*Fe)*V,ge)}else{if(J.isInstancedBufferAttribute){for(let de=0;de<G.locationSize;de++)m(G.location+de,J.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let de=0;de<G.locationSize;de++)g(G.location+de);a.bindBuffer(a.ARRAY_BUFFER,K);for(let de=0;de<G.locationSize;de++)_(G.location+de,le/G.locationSize,X,oe,le*V,le/G.locationSize*de*V,ge)}}else if(U!==void 0){const oe=U[$];if(oe!==void 0)switch(oe.length){case 2:a.vertexAttrib2fv(G.location,oe);break;case 3:a.vertexAttrib3fv(G.location,oe);break;case 4:a.vertexAttrib4fv(G.location,oe);break;default:a.vertexAttrib1fv(G.location,oe)}}}}y()}function E(){R();for(const M in n){const P=n[M];for(const z in P){const F=P[z];for(const k in F)h(F[k].object),delete F[k];delete P[z]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const z in P){const F=P[z];for(const k in F)h(F[k].object),delete F[k];delete P[z]}delete n[M.id]}function T(M){for(const P in n){const z=n[P];if(z[M.id]===void 0)continue;const F=z[M.id];for(const k in F)h(F[k].object),delete F[k];delete z[M.id]}}function R(){S(),r=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function $v(a,e,t){let n;function i(c){n=c}function s(c,h){a.drawArrays(n,c,h),t.update(h,n,1)}function r(c,h,u){u!==0&&(a.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)r(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v]*d[v];t.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function jv(a,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=a.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(T){return!(T!==vt&&n.convert(T)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const R=T===$n&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==yn&&n.convert(T)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==tn&&!R)}function l(T){if(T==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),p=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=a.getParameter(a.MAX_TEXTURE_SIZE),g=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),m=a.getParameter(a.MAX_VERTEX_ATTRIBS),y=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),_=a.getParameter(a.MAX_VARYING_VECTORS),x=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),E=p>0,b=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:E,maxSamples:b}}function Jv(a){const e=this;let t=null,n=0,i=!1,s=!1;const r=new ri,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=a.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):c();else{const y=s?0:n,_=y*4;let x=m.clippingState||null;l.value=x,x=h(p,d,_,f);for(let E=0;E!==_;++E)x[E]=t[E];m.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let _=0,x=f;_!==v;++_,x+=4)r.copy(u[_]).applyMatrix4(y,o),r.normal.toArray(g,x),g[x+3]=r.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Qv(a){let e=new WeakMap;function t(r,o){return o===or?r.mapping=Zn:o===lr&&(r.mapping=pi),r}function n(r){if(r&&r.isTexture){const o=r.mapping;if(o===or||o===lr)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new gd(l.height);return c.fromEquirectangularTexture(a,r),e.set(r,c),r.addEventListener("dispose",i),t(c.texture,r.mapping)}else return null}}return r}function i(r){const o=r.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ks extends bo{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,r=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const zs=4,xd=[.125,.215,.35,.446,.526,.582],Zi=20,Ec=new ks,yd=new Y;let Cc=null,Rc=0,Lc=0,Pc=!1;const Ki=(1+Math.sqrt(5))/2,Hs=1/Ki,_d=[new C(-Ki,Hs,0),new C(Ki,Hs,0),new C(-Hs,0,Ki),new C(Hs,0,Ki),new C(0,Ki,-Hs),new C(0,Ki,Hs),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Ic{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Cc=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Pc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Cc,Rc,Lc),this._renderer.xr.enabled=Pc,e.scissorTest=!1,Ao(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zn||e.mapping===pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cc=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Pc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:$n,format:vt,colorSpace:Ot,depthBuffer:!1},i=Md(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Md(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ex(s)),this._blurMaterial=tx(s,e,t)}return i}_compileMaterial(e){const t=new Le(this._lodPlanes[0],e);this._renderer.compile(t,Ec)}_sceneToCubeUV(e,t,n,i){const o=new Rt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(yd),h.toneMapping=qn,h.autoClear=!1;const f=new Pt({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),p=new Le(new Mn,f);let v=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,v=!0):(f.color.copy(yd),v=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):y===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const _=this._cubeSize;Ao(i,y*_,m>2?_:0,_,_),h.setRenderTarget(i),v&&h.render(p,o),h.render(e,o)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Zn||e.mapping===pi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sd());const s=i?this._cubemapMaterial:this._equirectMaterial,r=new Le(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ao(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,Ec)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=_d[(i-s-1)%_d.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Le(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Zi-1),v=s/p,g=isFinite(s)?1+Math.floor(h*v):Zi;g>Zi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Zi}`);const m=[];let y=0;for(let T=0;T<Zi;++T){const R=T/v,S=Math.exp(-R*R/2);m.push(S),T===0?y+=S:T<g&&(y+=2*S)}for(let T=0;T<m.length;T++)m[T]=m[T]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=r==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:_}=this;d.dTheta.value=p,d.mipInt.value=_-n;const x=this._sizeLods[i],E=3*x*(i>_-zs?i-_+zs:0),b=4*(this._cubeSize-x);Ao(t,E,b,3*x,2*x),l.setRenderTarget(t),l.render(u,Ec)}}function ex(a){const e=[],t=[],n=[];let i=a;const s=a-zs+1+xd.length;for(let r=0;r<s;r++){const o=Math.pow(2,i);t.push(o);let l=1/o;r>a-zs?l=xd[r-a+zs-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,v=3,g=2,m=1,y=new Float32Array(v*p*f),_=new Float32Array(g*p*f),x=new Float32Array(m*p*f);for(let b=0;b<f;b++){const T=b%3*2/3-1,R=b>2?0:-1,S=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];y.set(S,v*p*b),_.set(d,g*p*b);const M=[b,b,b,b,b,b];x.set(M,m*p*b)}const E=new Ve;E.setAttribute("position",new tt(y,v)),E.setAttribute("uv",new tt(_,g)),E.setAttribute("faceIndex",new tt(x,m)),e.push(E),i>zs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Md(a,e,t){const n=new nn(a,e,t);return n.texture.mapping=vs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ao(a,e,t,n,i){a.viewport.set(e,t,n,i),a.scissor.set(e,t,n,i)}function tx(a,e,t){const n=new Float32Array(Zi),i=new C(0,1,0);return new Xt({name:"SphericalGaussianBlur",defines:{n:Zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Sd(){return new Xt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dc(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function bd(){return new Xt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Dc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function nx(a){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===or||l===lr,h=l===Zn||l===pi;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Ic(a)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Ic(a)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function ix(a){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=a.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Sr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function sx(a,e,t,n){const i={},s=new WeakMap;function r(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);for(const p in d.morphAttributes){const v=d.morphAttributes[p];for(let g=0,m=v.length;g<m;g++)e.remove(v[g])}d.removeEventListener("dispose",r),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",r),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)e.update(d[p],a.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const v=f[p];for(let g=0,m=v.length;g<m;g++)e.update(v[g],a.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,p=u.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let _=0,x=y.length;_<x;_+=3){const E=y[_+0],b=y[_+1],T=y[_+2];d.push(E,b,b,T,T,E)}}else if(p!==void 0){const y=p.array;v=p.version;for(let _=0,x=y.length/3-1;_<x;_+=3){const E=_+0,b=_+1,T=_+2;d.push(E,b,b,T,T,E)}}else return;const g=new(Gu(d)?bc:Sc)(d,1);g.version=v;const m=s.get(u);m&&e.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function rx(a,e,t){let n;function i(d){n=d}let s,r;function o(d){s=d.type,r=d.bytesPerElement}function l(d,f){a.drawElements(n,f,s,d*r),t.update(f,n,1)}function c(d,f,p){p!==0&&(a.drawElementsInstanced(n,f,s,d*r,p),t.update(f,n,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function u(d,f,p,v){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)c(d[m]/r,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,p);let m=0;for(let y=0;y<p;y++)m+=f[y]*v[y];t.update(m,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ax(a){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,o){switch(t.calls++,r){case a.TRIANGLES:t.triangles+=o*(s/3);break;case a.LINES:t.lines+=o*(s/2);break;case a.LINE_STRIP:t.lines+=o*(s-1);break;case a.LINE_LOOP:t.lines+=o*s;break;case a.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function ox(a,e,t){const n=new WeakMap,i=new at;function s(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let S=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let _=0;f===!0&&(_=1),p===!0&&(_=2),v===!0&&(_=3);let x=o.attributes.position.count*_,E=1;x>e.maxTextureSize&&(E=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const b=new Float32Array(x*E*4*u),T=new so(b,x,E,u);T.type=tn,T.needsUpdate=!0;const R=_*4;for(let M=0;M<u;M++){const P=g[M],z=m[M],F=y[M],k=x*E*4*M;for(let H=0;H<P.count;H++){const U=H*R;f===!0&&(i.fromBufferAttribute(P,H),b[k+U+0]=i.x,b[k+U+1]=i.y,b[k+U+2]=i.z,b[k+U+3]=0),p===!0&&(i.fromBufferAttribute(z,H),b[k+U+4]=i.x,b[k+U+5]=i.y,b[k+U+6]=i.z,b[k+U+7]=0),v===!0&&(i.fromBufferAttribute(F,H),b[k+U+8]=i.x,b[k+U+9]=i.y,b[k+U+10]=i.z,b[k+U+11]=F.itemSize===4?i.w:1)}}d={count:u,texture:T,size:new Q(x,E)},n.set(o,d),o.addEventListener("dispose",S)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(a,"morphTexture",r.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(a,"morphTargetBaseInfluence",p),l.getUniforms().setValue(a,"morphTargetInfluences",c)}l.getUniforms().setValue(a,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(a,"morphTargetsTextureSize",d.size)}return{update:s}}function lx(a,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,a.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,a.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function r(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}class Eo extends gt{constructor(e,t,n,i,s,r,o,l,c,h=Fi){if(h!==Fi&&h!==gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Fi&&(n=Kn),n===void 0&&h===gi&&(n=mi),super(null,i,s,r,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:wt,this.minFilter=l!==void 0?l:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const wd=new gt,Td=new Eo(1,1),Ad=new so,Ed=new ac,Cd=new Cr,Rd=[],Ld=[],Pd=new Float32Array(16),Id=new Float32Array(9),Dd=new Float32Array(4);function Gs(a,e,t){const n=a[0];if(n<=0||n>0)return a;const i=e*t;let s=Rd[i];if(s===void 0&&(s=new Float32Array(i),Rd[i]=s),e!==0){n.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,a[r].toArray(s,o)}return s}function It(a,e){if(a.length!==e.length)return!1;for(let t=0,n=a.length;t<n;t++)if(a[t]!==e[t])return!1;return!0}function Dt(a,e){for(let t=0,n=e.length;t<n;t++)a[t]=e[t]}function Co(a,e){let t=Ld[e];t===void 0&&(t=new Int32Array(e),Ld[e]=t);for(let n=0;n!==e;++n)t[n]=a.allocateTextureUnit();return t}function cx(a,e){const t=this.cache;t[0]!==e&&(a.uniform1f(this.addr,e),t[0]=e)}function hx(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2fv(this.addr,e),Dt(t,e)}}function ux(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;a.uniform3fv(this.addr,e),Dt(t,e)}}function dx(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4fv(this.addr,e),Dt(t,e)}}function fx(a,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;a.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;Dd.set(n),a.uniformMatrix2fv(this.addr,!1,Dd),Dt(t,n)}}function px(a,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;a.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;Id.set(n),a.uniformMatrix3fv(this.addr,!1,Id),Dt(t,n)}}function mx(a,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;a.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;Pd.set(n),a.uniformMatrix4fv(this.addr,!1,Pd),Dt(t,n)}}function gx(a,e){const t=this.cache;t[0]!==e&&(a.uniform1i(this.addr,e),t[0]=e)}function vx(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2iv(this.addr,e),Dt(t,e)}}function xx(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;a.uniform3iv(this.addr,e),Dt(t,e)}}function yx(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4iv(this.addr,e),Dt(t,e)}}function _x(a,e){const t=this.cache;t[0]!==e&&(a.uniform1ui(this.addr,e),t[0]=e)}function Mx(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2uiv(this.addr,e),Dt(t,e)}}function Sx(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;a.uniform3uiv(this.addr,e),Dt(t,e)}}function bx(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4uiv(this.addr,e),Dt(t,e)}}function wx(a,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i);let s;this.type===a.SAMPLER_2D_SHADOW?(Td.compareFunction=tc,s=Td):s=wd,t.setTexture2D(e||s,i)}function Tx(a,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Ed,i)}function Ax(a,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Cd,i)}function Ex(a,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ad,i)}function Cx(a){switch(a){case 5126:return cx;case 35664:return hx;case 35665:return ux;case 35666:return dx;case 35674:return fx;case 35675:return px;case 35676:return mx;case 5124:case 35670:return gx;case 35667:case 35671:return vx;case 35668:case 35672:return xx;case 35669:case 35673:return yx;case 5125:return _x;case 36294:return Mx;case 36295:return Sx;case 36296:return bx;case 35678:case 36198:case 36298:case 36306:case 35682:return wx;case 35679:case 36299:case 36307:return Tx;case 35680:case 36300:case 36308:case 36293:return Ax;case 36289:case 36303:case 36311:case 36292:return Ex}}function Rx(a,e){a.uniform1fv(this.addr,e)}function Lx(a,e){const t=Gs(e,this.size,2);a.uniform2fv(this.addr,t)}function Px(a,e){const t=Gs(e,this.size,3);a.uniform3fv(this.addr,t)}function Ix(a,e){const t=Gs(e,this.size,4);a.uniform4fv(this.addr,t)}function Dx(a,e){const t=Gs(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,t)}function Ux(a,e){const t=Gs(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,t)}function Nx(a,e){const t=Gs(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,t)}function Fx(a,e){a.uniform1iv(this.addr,e)}function Ox(a,e){a.uniform2iv(this.addr,e)}function Bx(a,e){a.uniform3iv(this.addr,e)}function kx(a,e){a.uniform4iv(this.addr,e)}function zx(a,e){a.uniform1uiv(this.addr,e)}function Hx(a,e){a.uniform2uiv(this.addr,e)}function Gx(a,e){a.uniform3uiv(this.addr,e)}function Vx(a,e){a.uniform4uiv(this.addr,e)}function Wx(a,e,t){const n=this.cache,i=e.length,s=Co(t,i);It(n,s)||(a.uniform1iv(this.addr,s),Dt(n,s));for(let r=0;r!==i;++r)t.setTexture2D(e[r]||wd,s[r])}function Xx(a,e,t){const n=this.cache,i=e.length,s=Co(t,i);It(n,s)||(a.uniform1iv(this.addr,s),Dt(n,s));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||Ed,s[r])}function Yx(a,e,t){const n=this.cache,i=e.length,s=Co(t,i);It(n,s)||(a.uniform1iv(this.addr,s),Dt(n,s));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||Cd,s[r])}function qx(a,e,t){const n=this.cache,i=e.length,s=Co(t,i);It(n,s)||(a.uniform1iv(this.addr,s),Dt(n,s));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||Ad,s[r])}function Zx(a){switch(a){case 5126:return Rx;case 35664:return Lx;case 35665:return Px;case 35666:return Ix;case 35674:return Dx;case 35675:return Ux;case 35676:return Nx;case 5124:case 35670:return Fx;case 35667:case 35671:return Ox;case 35668:case 35672:return Bx;case 35669:case 35673:return kx;case 5125:return zx;case 36294:return Hx;case 36295:return Gx;case 36296:return Vx;case 35678:case 36198:case 36298:case 36306:case 35682:return Wx;case 35679:case 36299:case 36307:return Xx;case 35680:case 36300:case 36308:case 36293:return Yx;case 36289:case 36303:case 36311:case 36292:return qx}}class Kx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cx(t.type)}}class $x{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zx(t.type)}}class jx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Uc=/(\w+)(\])?(\[|\.)?/g;function Ud(a,e){a.seq.push(e),a.map[e.id]=e}function Jx(a,e,t){const n=a.name,i=n.length;for(Uc.lastIndex=0;;){const s=Uc.exec(n),r=Uc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===i){Ud(t,c===void 0?new Kx(o,a,e):new $x(o,a,e));break}else{let u=t.map[o];u===void 0&&(u=new jx(o),Ud(t,u)),t=u}}}class Ro{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),r=e.getUniformLocation(t,s.name);Jx(s,r,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function Nd(a,e,t){const n=a.createShader(e);return a.shaderSource(n,t),a.compileShader(n),n}const Qx=37297;let ey=0;function ty(a,e){const t=a.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=i;r<s;r++){const o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}const Fd=new Xe;function ny(a){Qe._getMatrix(Fd,Qe.workingColorSpace,a);const e=`mat3( ${Fd.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(a)){case vr:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",a),[e,"LinearTransferOETF"]}}function Od(a,e,t){const n=a.getShaderParameter(e,a.COMPILE_STATUS),i=a.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const r=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+ty(a.getShaderSource(e),r)}else return i}function iy(a,e){const t=ny(e);return[`vec4 ${a}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function sy(a,e){let t;switch(e){case Mu:t="Linear";break;case Su:t="Reinhard";break;case bu:t="Cineon";break;case wu:t="ACESFilmic";break;case Au:t="AgX";break;case Eu:t="Neutral";break;case Tu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+a+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Lo=new C;function ry(){Qe.getLuminanceCoefficients(Lo);const a=Lo.x.toFixed(4),e=Lo.y.toFixed(4),t=Lo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ay(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function oy(a){const e=[];for(const t in a){const n=a[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ly(a,e){const t={},n=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=a.getActiveAttrib(e,i),r=s.name;let o=1;s.type===a.FLOAT_MAT2&&(o=2),s.type===a.FLOAT_MAT3&&(o=3),s.type===a.FLOAT_MAT4&&(o=4),t[r]={type:s.type,location:a.getAttribLocation(e,r),locationSize:o}}return t}function Lr(a){return a!==""}function Bd(a,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kd(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nc(a){return a.replace(cy,uy)}const hy=new Map;function uy(a,e){let t=Ze[e];if(t===void 0){const n=hy.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Nc(t)}const dy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zd(a){return a.replace(dy,fy)}function fy(a,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Hd(a){let e=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function py(a){let e="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===Bl?e="SHADOWMAP_TYPE_PCF":a.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function my(a){let e="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case Zn:case pi:e="ENVMAP_TYPE_CUBE";break;case vs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gy(a){let e="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case pi:e="ENVMAP_MODE_REFRACTION";break}return e}function vy(a){let e="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case ar:e="ENVMAP_BLENDING_MULTIPLY";break;case yu:e="ENVMAP_BLENDING_MIX";break;case _u:e="ENVMAP_BLENDING_ADD";break}return e}function xy(a){const e=a.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function yy(a,e,t,n){const i=a.getContext(),s=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=py(t),c=my(t),h=gy(t),u=vy(t),d=xy(t),f=ay(t),p=oy(s),v=i.createProgram();let g,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Lr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Lr).join(`
`),m.length>0&&(m+=`
`)):(g=[Hd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),m=[Hd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==qn?sy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,iy("linearToOutputTexel",t.outputColorSpace),ry(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),r=Nc(r),r=Bd(r,t),r=kd(r,t),o=Nc(o),o=Bd(o,t),o=kd(o,t),r=zd(r),o=zd(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=y+g+r,x=y+m+o,E=Nd(i,i.VERTEX_SHADER,_),b=Nd(i,i.FRAGMENT_SHADER,x);i.attachShader(v,E),i.attachShader(v,b),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function T(P){if(a.debug.checkShaderErrors){const z=i.getProgramInfoLog(v).trim(),F=i.getShaderInfoLog(E).trim(),k=i.getShaderInfoLog(b).trim();let H=!0,U=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(H=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(i,v,E,b);else{const $=Od(i,E,"vertex"),G=Od(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+$+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||k==="")&&(U=!1);U&&(P.diagnostics={runnable:H,programLog:z,vertexShader:{log:F,prefix:g},fragmentShader:{log:k,prefix:m}})}i.deleteShader(E),i.deleteShader(b),R=new Ro(i,v),S=ly(i,v)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,Qx)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ey++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=b,this}let _y=0;class My{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Sy(e),t.set(e,n)),n}}class Sy{constructor(e){this.id=_y++,this.code=e,this.usedTimes=0}}function by(a,e,t,n,i,s,r){const o=new uo,l=new My,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,z,F){const k=z.fog,H=F.geometry,U=S.isMeshStandardMaterial?z.environment:null,$=(S.isMeshStandardMaterial?t:e).get(S.envMap||U),G=$&&$.mapping===vs?$.image.height:null,J=p[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const oe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,le=oe!==void 0?oe.length:0;let Se=0;H.morphAttributes.position!==void 0&&(Se=1),H.morphAttributes.normal!==void 0&&(Se=2),H.morphAttributes.color!==void 0&&(Se=3);let K,X,V,ge;if(J){const ut=Pn[J];K=ut.vertexShader,X=ut.fragmentShader}else K=S.vertexShader,X=S.fragmentShader,l.update(S),V=l.getVertexShaderID(S),ge=l.getFragmentShaderID(S);const de=a.getRenderTarget(),Ue=a.state.buffers.depth.getReversed(),He=F.isInstancedMesh===!0,Fe=F.isBatchedMesh===!0,qe=!!S.map,ne=!!S.matcap,ae=!!$,I=!!S.aoMap,Ee=!!S.lightMap,re=!!S.bumpMap,pe=!!S.normalMap,he=!!S.displacementMap,Be=!!S.emissiveMap,be=!!S.metalnessMap,L=!!S.roughnessMap,w=S.anisotropy>0,W=S.clearcoat>0,ee=S.dispersion>0,se=S.iridescence>0,te=S.sheen>0,Re=S.transmission>0,ve=w&&!!S.anisotropyMap,we=W&&!!S.clearcoatMap,nt=W&&!!S.clearcoatNormalMap,ce=W&&!!S.clearcoatRoughnessMap,Te=se&&!!S.iridescenceMap,ke=se&&!!S.iridescenceThicknessMap,Ge=te&&!!S.sheenColorMap,Ae=te&&!!S.sheenRoughnessMap,rt=!!S.specularMap,je=!!S.specularColorMap,dt=!!S.specularIntensityMap,N=Re&&!!S.transmissionMap,xe=Re&&!!S.thicknessMap,j=!!S.gradientMap,ie=!!S.alphaMap,Me=S.alphaTest>0,ye=!!S.alphaHash,Ke=!!S.extensions;let bt=qn;S.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(bt=a.toneMapping);const Kt={shaderID:J,shaderType:S.type,shaderName:S.name,vertexShader:K,fragmentShader:X,defines:S.defines,customVertexShaderID:V,customFragmentShaderID:ge,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&F._colorsTexture!==null,instancing:He,instancingColor:He&&F.instanceColor!==null,instancingMorph:He&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:de===null?a.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Ot,alphaToCoverage:!!S.alphaToCoverage,map:qe,matcap:ne,envMap:ae,envMapMode:ae&&$.mapping,envMapCubeUVHeight:G,aoMap:I,lightMap:Ee,bumpMap:re,normalMap:pe,displacementMap:d&&he,emissiveMap:Be,normalMapObjectSpace:pe&&S.normalMapType===Du,normalMapTangentSpace:pe&&S.normalMapType===jn,metalnessMap:be,roughnessMap:L,anisotropy:w,anisotropyMap:ve,clearcoat:W,clearcoatMap:we,clearcoatNormalMap:nt,clearcoatRoughnessMap:ce,dispersion:ee,iridescence:se,iridescenceMap:Te,iridescenceThicknessMap:ke,sheen:te,sheenColorMap:Ge,sheenRoughnessMap:Ae,specularMap:rt,specularColorMap:je,specularIntensityMap:dt,transmission:Re,transmissionMap:N,thicknessMap:xe,gradientMap:j,opaque:S.transparent===!1&&S.blending===Di&&S.alphaToCoverage===!1,alphaMap:ie,alphaTest:Me,alphaHash:ye,combine:S.combine,mapUv:qe&&v(S.map.channel),aoMapUv:I&&v(S.aoMap.channel),lightMapUv:Ee&&v(S.lightMap.channel),bumpMapUv:re&&v(S.bumpMap.channel),normalMapUv:pe&&v(S.normalMap.channel),displacementMapUv:he&&v(S.displacementMap.channel),emissiveMapUv:Be&&v(S.emissiveMap.channel),metalnessMapUv:be&&v(S.metalnessMap.channel),roughnessMapUv:L&&v(S.roughnessMap.channel),anisotropyMapUv:ve&&v(S.anisotropyMap.channel),clearcoatMapUv:we&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:nt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&v(S.sheenRoughnessMap.channel),specularMapUv:rt&&v(S.specularMap.channel),specularColorMapUv:je&&v(S.specularColorMap.channel),specularIntensityMapUv:dt&&v(S.specularIntensityMap.channel),transmissionMapUv:N&&v(S.transmissionMap.channel),thicknessMapUv:xe&&v(S.thicknessMap.channel),alphaMapUv:ie&&v(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(pe||w),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!H.attributes.uv&&(qe||ie),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ue,skinning:F.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Se,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:a.shadowMap.enabled&&P.length>0,shadowMapType:a.shadowMap.type,toneMapping:bt,decodeVideoTexture:qe&&S.map.isVideoTexture===!0&&Qe.getTransfer(S.map.colorSpace)===ht,decodeVideoTextureEmissive:Be&&S.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(S.emissiveMap.colorSpace)===ht,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===en,flipSided:S.side===Ht,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ke&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ke&&S.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Kt.vertexUv1s=c.has(1),Kt.vertexUv2s=c.has(2),Kt.vertexUv3s=c.has(3),c.clear(),Kt}function m(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(y(M,S),_(M,S),M.push(a.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function y(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function _(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const M=p[S.type];let P;if(M){const z=Pn[M];P=dd.clone(z.uniforms)}else P=S.uniforms;return P}function E(S,M){let P;for(let z=0,F=h.length;z<F;z++){const k=h[z];if(k.cacheKey===M){P=k,++P.usedTimes;break}}return P===void 0&&(P=new yy(a,M,S,s),h.push(P)),P}function b(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function T(S){l.remove(S)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:x,acquireProgram:E,releaseProgram:b,releaseShaderCache:T,programs:h,dispose:R}}function wy(){let a=new WeakMap;function e(r){return a.has(r)}function t(r){let o=a.get(r);return o===void 0&&(o={},a.set(r,o)),o}function n(r){a.delete(r)}function i(r,o,l){a.get(r)[o]=l}function s(){a=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Ty(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.z!==e.z?a.z-e.z:a.id-e.id}function Gd(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function Vd(){const a=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function r(u,d,f,p,v,g){let m=a[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:v,group:g},a[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=v,m.group=g),e++,m}function o(u,d,f,p,v,g){const m=r(u,d,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(u,d,f,p,v,g){const m=r(u,d,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||Ty),n.length>1&&n.sort(d||Gd),i.length>1&&i.sort(d||Gd)}function h(){for(let u=e,d=a.length;u<d;u++){const f=a[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function Ay(){let a=new WeakMap;function e(n,i){const s=a.get(n);let r;return s===void 0?(r=new Vd,a.set(n,[r])):i>=s.length?(r=new Vd,s.push(r)):r=s[i],r}function t(){a=new WeakMap}return{get:e,dispose:t}}function Ey(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Y};break;case"SpotLight":t={position:new C,direction:new C,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Y,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Y,groundColor:new Y};break;case"RectAreaLight":t={color:new Y,position:new C,halfWidth:new C,halfHeight:new C};break}return a[e.id]=t,t}}}function Cy(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=t,t}}}let Ry=0;function Ly(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function Py(a){const e=new Ey,t=Cy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const i=new C,s=new Oe,r=new Oe;function o(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,y=0,_=0,x=0,E=0,b=0,T=0;c.sort(Ly);for(let S=0,M=c.length;S<M;S++){const P=c[S],z=P.color,F=P.intensity,k=P.distance,H=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=z.r*F,u+=z.g*F,d+=z.b*F;else if(P.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(P.sh.coefficients[U],F);T++}else if(P.isDirectionalLight){const U=e.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,G=t.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=U,f++}else if(P.isSpotLight){const U=e.get(P);U.position.setFromMatrixPosition(P.matrixWorld),U.color.copy(z).multiplyScalar(F),U.distance=k,U.coneCos=Math.cos(P.angle),U.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),U.decay=P.decay,n.spot[v]=U;const $=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,$.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[v]=$.matrix,P.castShadow){const G=t.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=H,x++}v++}else if(P.isRectAreaLight){const U=e.get(P);U.color.copy(z).multiplyScalar(F),U.halfWidth.set(P.width*.5,0,0),U.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=U,g++}else if(P.isPointLight){const U=e.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),U.distance=P.distance,U.decay=P.decay,P.castShadow){const $=P.shadow,G=t.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,G.shadowCameraNear=$.camera.near,G.shadowCameraFar=$.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=H,n.pointShadowMatrix[p]=P.shadow.matrix,_++}n.point[p]=U,p++}else if(P.isHemisphereLight){const U=e.get(P);U.skyColor.copy(P.color).multiplyScalar(F),U.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[m]=U,m++}}g>0&&(a.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==p||R.spotLength!==v||R.rectAreaLength!==g||R.hemiLength!==m||R.numDirectionalShadows!==y||R.numPointShadows!==_||R.numSpotShadows!==x||R.numSpotMaps!==E||R.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+E-b,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=T,R.directionalLength=f,R.pointLength=p,R.spotLength=v,R.rectAreaLength=g,R.hemiLength=m,R.numDirectionalShadows=y,R.numPointShadows=_,R.numSpotShadows=x,R.numSpotMaps=E,R.numLightProbes=T,n.version=Ry++)}function l(c,h){let u=0,d=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){const _=c[m];if(_.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(_.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),r.identity(),s.copy(_.matrixWorld),s.premultiply(g),r.extractRotation(s),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(r),x.halfHeight.applyMatrix4(r),p++}else if(_.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Wd(a){const e=new Py(a),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function r(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function Iy(a){let e=new WeakMap;function t(i,s=0){const r=e.get(i);let o;return r===void 0?(o=new Wd(a),e.set(i,[o])):s>=r.length?(o=new Wd(a),r.push(o)):o=r[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Fc extends Lt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Pu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Oc extends Lt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Dy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Uy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ny(a,e,t){let n=new Rr;const i=new Q,s=new Q,r=new at,o=new Fc({depthPacking:Iu}),l=new Oc,c={},h=t.maxTextureSize,u={[Bn]:Ht,[Ht]:Bn,[en]:en},d=new Xt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:Dy,fragmentShader:Uy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Ve;p.setAttribute("position",new tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Le(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bl;let m=this.type;this.render=function(b,T,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const S=a.getRenderTarget(),M=a.getActiveCubeFace(),P=a.getActiveMipmapLevel(),z=a.state;z.setBlending(kn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const F=m!==On&&this.type===On,k=m===On&&this.type!==On;for(let H=0,U=b.length;H<U;H++){const $=b[H],G=$.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const J=G.getFrameExtents();if(i.multiply(J),s.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/J.x),i.x=s.x*J.x,G.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/J.y),i.y=s.y*J.y,G.mapSize.y=s.y)),G.map===null||F===!0||k===!0){const le=this.type!==On?{minFilter:wt,magFilter:wt}:{};G.map!==null&&G.map.dispose(),G.map=new nn(i.x,i.y,le),G.map.texture.name=$.name+".shadowMap",G.camera.updateProjectionMatrix()}a.setRenderTarget(G.map),a.clear();const oe=G.getViewportCount();for(let le=0;le<oe;le++){const Se=G.getViewport(le);r.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),z.viewport(r),G.updateMatrices($,le),n=G.getFrustum(),x(T,R,G.camera,$,this.type)}G.isPointLightShadow!==!0&&this.type===On&&y(G,R),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,a.setRenderTarget(S,M,P)};function y(b,T){const R=e.update(v);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new nn(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,a.setRenderTarget(b.mapPass),a.clear(),a.renderBufferDirect(T,null,R,d,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,a.setRenderTarget(b.map),a.clear(),a.renderBufferDirect(T,null,R,f,v,null)}function _(b,T,R,S){let M=null;const P=R.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)M=P;else if(M=R.isPointLight===!0?l:o,a.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const z=M.uuid,F=T.uuid;let k=c[z];k===void 0&&(k={},c[z]=k);let H=k[F];H===void 0&&(H=M.clone(),k[F]=H,T.addEventListener("dispose",E)),M=H}if(M.visible=T.visible,M.wireframe=T.wireframe,S===On?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:u[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=a.properties.get(M);z.light=R}return M}function x(b,T,R,S,M){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===On)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,b.matrixWorld);const F=e.update(b),k=b.material;if(Array.isArray(k)){const H=F.groups;for(let U=0,$=H.length;U<$;U++){const G=H[U],J=k[G.materialIndex];if(J&&J.visible){const oe=_(b,J,S,M);b.onBeforeShadow(a,b,T,R,F,oe,G),a.renderBufferDirect(R,null,F,oe,b,G),b.onAfterShadow(a,b,T,R,F,oe,G)}}}else if(k.visible){const H=_(b,k,S,M);b.onBeforeShadow(a,b,T,R,F,H,null),a.renderBufferDirect(R,null,F,H,b,null),b.onAfterShadow(a,b,T,R,F,H,null)}}const z=b.children;for(let F=0,k=z.length;F<k;F++)x(z[F],T,R,S,M)}function E(b){b.target.removeEventListener("dispose",E);for(const R in c){const S=c[R],M=b.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Fy={[fa]:pa,[ma]:xa,[ga]:ya,[Ui]:va,[pa]:fa,[xa]:ma,[ya]:ga,[va]:Ui};function Oy(a,e){function t(){let N=!1;const xe=new at;let j=null;const ie=new at(0,0,0,0);return{setMask:function(Me){j!==Me&&!N&&(a.colorMask(Me,Me,Me,Me),j=Me)},setLocked:function(Me){N=Me},setClear:function(Me,ye,Ke,bt,Kt){Kt===!0&&(Me*=bt,ye*=bt,Ke*=bt),xe.set(Me,ye,Ke,bt),ie.equals(xe)===!1&&(a.clearColor(Me,ye,Ke,bt),ie.copy(xe))},reset:function(){N=!1,j=null,ie.set(-1,0,0,0)}}}function n(){let N=!1,xe=!1,j=null,ie=null,Me=null;return{setReversed:function(ye){if(xe!==ye){const Ke=e.get("EXT_clip_control");xe?Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.ZERO_TO_ONE_EXT):Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.NEGATIVE_ONE_TO_ONE_EXT);const bt=Me;Me=null,this.setClear(bt)}xe=ye},getReversed:function(){return xe},setTest:function(ye){ye?de(a.DEPTH_TEST):Ue(a.DEPTH_TEST)},setMask:function(ye){j!==ye&&!N&&(a.depthMask(ye),j=ye)},setFunc:function(ye){if(xe&&(ye=Fy[ye]),ie!==ye){switch(ye){case fa:a.depthFunc(a.NEVER);break;case pa:a.depthFunc(a.ALWAYS);break;case ma:a.depthFunc(a.LESS);break;case Ui:a.depthFunc(a.LEQUAL);break;case ga:a.depthFunc(a.EQUAL);break;case va:a.depthFunc(a.GEQUAL);break;case xa:a.depthFunc(a.GREATER);break;case ya:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}ie=ye}},setLocked:function(ye){N=ye},setClear:function(ye){Me!==ye&&(xe&&(ye=1-ye),a.clearDepth(ye),Me=ye)},reset:function(){N=!1,j=null,ie=null,Me=null,xe=!1}}}function i(){let N=!1,xe=null,j=null,ie=null,Me=null,ye=null,Ke=null,bt=null,Kt=null;return{setTest:function(ut){N||(ut?de(a.STENCIL_TEST):Ue(a.STENCIL_TEST))},setMask:function(ut){xe!==ut&&!N&&(a.stencilMask(ut),xe=ut)},setFunc:function(ut,Nn,ui){(j!==ut||ie!==Nn||Me!==ui)&&(a.stencilFunc(ut,Nn,ui),j=ut,ie=Nn,Me=ui)},setOp:function(ut,Nn,ui){(ye!==ut||Ke!==Nn||bt!==ui)&&(a.stencilOp(ut,Nn,ui),ye=ut,Ke=Nn,bt=ui)},setLocked:function(ut){N=ut},setClear:function(ut){Kt!==ut&&(a.clearStencil(ut),Kt=ut)},reset:function(){N=!1,xe=null,j=null,ie=null,Me=null,ye=null,Ke=null,bt=null,Kt=null}}}const s=new t,r=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,y=null,_=null,x=null,E=null,b=null,T=new Y(0,0,0),R=0,S=!1,M=null,P=null,z=null,F=null,k=null;const H=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,$=0;const G=a.getParameter(a.VERSION);G.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(G)[1]),U=$>=1):G.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),U=$>=2);let J=null,oe={};const le=a.getParameter(a.SCISSOR_BOX),Se=a.getParameter(a.VIEWPORT),K=new at().fromArray(le),X=new at().fromArray(Se);function V(N,xe,j,ie){const Me=new Uint8Array(4),ye=a.createTexture();a.bindTexture(N,ye),a.texParameteri(N,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(N,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let Ke=0;Ke<j;Ke++)N===a.TEXTURE_3D||N===a.TEXTURE_2D_ARRAY?a.texImage3D(xe,0,a.RGBA,1,1,ie,0,a.RGBA,a.UNSIGNED_BYTE,Me):a.texImage2D(xe+Ke,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,Me);return ye}const ge={};ge[a.TEXTURE_2D]=V(a.TEXTURE_2D,a.TEXTURE_2D,1),ge[a.TEXTURE_CUBE_MAP]=V(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[a.TEXTURE_2D_ARRAY]=V(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),ge[a.TEXTURE_3D]=V(a.TEXTURE_3D,a.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),de(a.DEPTH_TEST),r.setFunc(Ui),re(!1),pe(Ol),de(a.CULL_FACE),I(kn);function de(N){h[N]!==!0&&(a.enable(N),h[N]=!0)}function Ue(N){h[N]!==!1&&(a.disable(N),h[N]=!1)}function He(N,xe){return u[N]!==xe?(a.bindFramebuffer(N,xe),u[N]=xe,N===a.DRAW_FRAMEBUFFER&&(u[a.FRAMEBUFFER]=xe),N===a.FRAMEBUFFER&&(u[a.DRAW_FRAMEBUFFER]=xe),!0):!1}function Fe(N,xe){let j=f,ie=!1;if(N){j=d.get(xe),j===void 0&&(j=[],d.set(xe,j));const Me=N.textures;if(j.length!==Me.length||j[0]!==a.COLOR_ATTACHMENT0){for(let ye=0,Ke=Me.length;ye<Ke;ye++)j[ye]=a.COLOR_ATTACHMENT0+ye;j.length=Me.length,ie=!0}}else j[0]!==a.BACK&&(j[0]=a.BACK,ie=!0);ie&&a.drawBuffers(j)}function qe(N){return p!==N?(a.useProgram(N),p=N,!0):!1}const ne={[fi]:a.FUNC_ADD,[nu]:a.FUNC_SUBTRACT,[iu]:a.FUNC_REVERSE_SUBTRACT};ne[su]=a.MIN,ne[ru]=a.MAX;const ae={[au]:a.ZERO,[ou]:a.ONE,[lu]:a.SRC_COLOR,[ua]:a.SRC_ALPHA,[pu]:a.SRC_ALPHA_SATURATE,[du]:a.DST_COLOR,[hu]:a.DST_ALPHA,[cu]:a.ONE_MINUS_SRC_COLOR,[da]:a.ONE_MINUS_SRC_ALPHA,[fu]:a.ONE_MINUS_DST_COLOR,[uu]:a.ONE_MINUS_DST_ALPHA,[mu]:a.CONSTANT_COLOR,[gu]:a.ONE_MINUS_CONSTANT_COLOR,[vu]:a.CONSTANT_ALPHA,[xu]:a.ONE_MINUS_CONSTANT_ALPHA};function I(N,xe,j,ie,Me,ye,Ke,bt,Kt,ut){if(N===kn){v===!0&&(Ue(a.BLEND),v=!1);return}if(v===!1&&(de(a.BLEND),v=!0),N!==tu){if(N!==g||ut!==S){if((m!==fi||x!==fi)&&(a.blendEquation(a.FUNC_ADD),m=fi,x=fi),ut)switch(N){case Di:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case gs:a.blendFunc(a.ONE,a.ONE);break;case zl:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Hl:a.blendFuncSeparate(a.ZERO,a.SRC_COLOR,a.ZERO,a.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Di:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case gs:a.blendFunc(a.SRC_ALPHA,a.ONE);break;case zl:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Hl:a.blendFunc(a.ZERO,a.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,_=null,E=null,b=null,T.set(0,0,0),R=0,g=N,S=ut}return}Me=Me||xe,ye=ye||j,Ke=Ke||ie,(xe!==m||Me!==x)&&(a.blendEquationSeparate(ne[xe],ne[Me]),m=xe,x=Me),(j!==y||ie!==_||ye!==E||Ke!==b)&&(a.blendFuncSeparate(ae[j],ae[ie],ae[ye],ae[Ke]),y=j,_=ie,E=ye,b=Ke),(bt.equals(T)===!1||Kt!==R)&&(a.blendColor(bt.r,bt.g,bt.b,Kt),T.copy(bt),R=Kt),g=N,S=!1}function Ee(N,xe){N.side===en?Ue(a.CULL_FACE):de(a.CULL_FACE);let j=N.side===Ht;xe&&(j=!j),re(j),N.blending===Di&&N.transparent===!1?I(kn):I(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);const ie=N.stencilWrite;o.setTest(ie),ie&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Be(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?de(a.SAMPLE_ALPHA_TO_COVERAGE):Ue(a.SAMPLE_ALPHA_TO_COVERAGE)}function re(N){M!==N&&(N?a.frontFace(a.CW):a.frontFace(a.CCW),M=N)}function pe(N){N!==Qh?(de(a.CULL_FACE),N!==P&&(N===Ol?a.cullFace(a.BACK):N===eu?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):Ue(a.CULL_FACE),P=N}function he(N){N!==z&&(U&&a.lineWidth(N),z=N)}function Be(N,xe,j){N?(de(a.POLYGON_OFFSET_FILL),(F!==xe||k!==j)&&(a.polygonOffset(xe,j),F=xe,k=j)):Ue(a.POLYGON_OFFSET_FILL)}function be(N){N?de(a.SCISSOR_TEST):Ue(a.SCISSOR_TEST)}function L(N){N===void 0&&(N=a.TEXTURE0+H-1),J!==N&&(a.activeTexture(N),J=N)}function w(N,xe,j){j===void 0&&(J===null?j=a.TEXTURE0+H-1:j=J);let ie=oe[j];ie===void 0&&(ie={type:void 0,texture:void 0},oe[j]=ie),(ie.type!==N||ie.texture!==xe)&&(J!==j&&(a.activeTexture(j),J=j),a.bindTexture(N,xe||ge[N]),ie.type=N,ie.texture=xe)}function W(){const N=oe[J];N!==void 0&&N.type!==void 0&&(a.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ee(){try{a.compressedTexImage2D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{a.compressedTexImage3D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{a.texSubImage2D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Re(){try{a.texSubImage3D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{a.compressedTexSubImage3D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{a.texStorage2D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ce(){try{a.texStorage3D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{a.texImage2D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ke(){try{a.texImage3D.apply(a,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ge(N){K.equals(N)===!1&&(a.scissor(N.x,N.y,N.z,N.w),K.copy(N))}function Ae(N){X.equals(N)===!1&&(a.viewport(N.x,N.y,N.z,N.w),X.copy(N))}function rt(N,xe){let j=c.get(xe);j===void 0&&(j=new WeakMap,c.set(xe,j));let ie=j.get(N);ie===void 0&&(ie=a.getUniformBlockIndex(xe,N.name),j.set(N,ie))}function je(N,xe){const ie=c.get(xe).get(N);l.get(xe)!==ie&&(a.uniformBlockBinding(xe,ie,N.__bindingPointIndex),l.set(xe,ie))}function dt(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),r.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),h={},J=null,oe={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,y=null,_=null,x=null,E=null,b=null,T=new Y(0,0,0),R=0,S=!1,M=null,P=null,z=null,F=null,k=null,K.set(0,0,a.canvas.width,a.canvas.height),X.set(0,0,a.canvas.width,a.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:de,disable:Ue,bindFramebuffer:He,drawBuffers:Fe,useProgram:qe,setBlending:I,setMaterial:Ee,setFlipSided:re,setCullFace:pe,setLineWidth:he,setPolygonOffset:Be,setScissorTest:be,activeTexture:L,bindTexture:w,unbindTexture:W,compressedTexImage2D:ee,compressedTexImage3D:se,texImage2D:Te,texImage3D:ke,updateUBOMapping:rt,uniformBlockBinding:je,texStorage2D:nt,texStorage3D:ce,texSubImage2D:te,texSubImage3D:Re,compressedTexSubImage2D:ve,compressedTexSubImage3D:we,scissor:Ge,viewport:Ae,reset:dt}}function By(a,e){const t=a.image&&a.image.width?a.image.width/a.image.height:1;return t>e?(a.repeat.x=1,a.repeat.y=t/e,a.offset.x=0,a.offset.y=(1-a.repeat.y)/2):(a.repeat.x=e/t,a.repeat.y=1,a.offset.x=(1-a.repeat.x)/2,a.offset.y=0),a}function ky(a,e){const t=a.image&&a.image.width?a.image.width/a.image.height:1;return t>e?(a.repeat.x=e/t,a.repeat.y=1,a.offset.x=(1-a.repeat.x)/2,a.offset.y=0):(a.repeat.x=1,a.repeat.y=t/e,a.offset.x=0,a.offset.y=(1-a.repeat.y)/2),a}function zy(a){return a.repeat.x=1,a.repeat.y=1,a.offset.x=0,a.offset.y=0,a}function Bc(a,e,t,n){const i=Hy(n);switch(t){case Yl:return a*e;case Zl:return a*e;case Kl:return a*e*2;case Ta:return a*e/i.components*i.byteLength;case cr:return a*e/i.components*i.byteLength;case $l:return a*e*2/i.components*i.byteLength;case Aa:return a*e*2/i.components*i.byteLength;case ql:return a*e*3/i.components*i.byteLength;case vt:return a*e*4/i.components*i.byteLength;case Ea:return a*e*4/i.components*i.byteLength;case hr:case ur:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case dr:case fr:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Ra:case Pa:return Math.max(a,16)*Math.max(e,8)/4;case Ca:case La:return Math.max(a,8)*Math.max(e,8)/2;case Ia:case Da:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case Ua:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Na:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Fa:return Math.floor((a+4)/5)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((a+4)/5)*Math.floor((e+4)/5)*16;case Ba:return Math.floor((a+5)/6)*Math.floor((e+4)/5)*16;case ka:return Math.floor((a+5)/6)*Math.floor((e+5)/6)*16;case za:return Math.floor((a+7)/8)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((a+7)/8)*Math.floor((e+5)/6)*16;case Ga:return Math.floor((a+7)/8)*Math.floor((e+7)/8)*16;case Va:return Math.floor((a+9)/10)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((a+9)/10)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((a+9)/10)*Math.floor((e+7)/8)*16;case Ya:return Math.floor((a+9)/10)*Math.floor((e+9)/10)*16;case qa:return Math.floor((a+11)/12)*Math.floor((e+9)/10)*16;case Za:return Math.floor((a+11)/12)*Math.floor((e+11)/12)*16;case pr:case Ka:case $a:return Math.ceil(a/4)*Math.ceil(e/4)*16;case jl:case ja:return Math.ceil(a/4)*Math.ceil(e/4)*8;case Ja:case Qa:return Math.ceil(a/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hy(a){switch(a){case yn:case Vl:return{byteLength:1,components:1};case _s:case Wl:case $n:return{byteLength:2,components:1};case ba:case wa:return{byteLength:2,components:4};case Kn:case Sa:case tn:return{byteLength:4,components:1};case Xl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}const Gy={contain:By,cover:ky,fill:zy,getByteLength:Bc};function Vy(a,e,t,n,i,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Q,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(L,w){return f?new OffscreenCanvas(L,w):Mr("canvas")}function v(L,w,W){let ee=1;const se=be(L);if((se.width>W||se.height>W)&&(ee=W/Math.max(se.width,se.height)),ee<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const te=Math.floor(ee*se.width),Re=Math.floor(ee*se.height);u===void 0&&(u=p(te,Re));const ve=w?p(te,Re):u;return ve.width=te,ve.height=Re,ve.getContext("2d").drawImage(L,0,0,te,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+te+"x"+Re+")."),ve}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),L;return L}function g(L){return L.generateMipmaps}function m(L){a.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?a.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function _(L,w,W,ee,se=!1){if(L!==null){if(a[L]!==void 0)return a[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let te=w;if(w===a.RED&&(W===a.FLOAT&&(te=a.R32F),W===a.HALF_FLOAT&&(te=a.R16F),W===a.UNSIGNED_BYTE&&(te=a.R8)),w===a.RED_INTEGER&&(W===a.UNSIGNED_BYTE&&(te=a.R8UI),W===a.UNSIGNED_SHORT&&(te=a.R16UI),W===a.UNSIGNED_INT&&(te=a.R32UI),W===a.BYTE&&(te=a.R8I),W===a.SHORT&&(te=a.R16I),W===a.INT&&(te=a.R32I)),w===a.RG&&(W===a.FLOAT&&(te=a.RG32F),W===a.HALF_FLOAT&&(te=a.RG16F),W===a.UNSIGNED_BYTE&&(te=a.RG8)),w===a.RG_INTEGER&&(W===a.UNSIGNED_BYTE&&(te=a.RG8UI),W===a.UNSIGNED_SHORT&&(te=a.RG16UI),W===a.UNSIGNED_INT&&(te=a.RG32UI),W===a.BYTE&&(te=a.RG8I),W===a.SHORT&&(te=a.RG16I),W===a.INT&&(te=a.RG32I)),w===a.RGB_INTEGER&&(W===a.UNSIGNED_BYTE&&(te=a.RGB8UI),W===a.UNSIGNED_SHORT&&(te=a.RGB16UI),W===a.UNSIGNED_INT&&(te=a.RGB32UI),W===a.BYTE&&(te=a.RGB8I),W===a.SHORT&&(te=a.RGB16I),W===a.INT&&(te=a.RGB32I)),w===a.RGBA_INTEGER&&(W===a.UNSIGNED_BYTE&&(te=a.RGBA8UI),W===a.UNSIGNED_SHORT&&(te=a.RGBA16UI),W===a.UNSIGNED_INT&&(te=a.RGBA32UI),W===a.BYTE&&(te=a.RGBA8I),W===a.SHORT&&(te=a.RGBA16I),W===a.INT&&(te=a.RGBA32I)),w===a.RGB&&W===a.UNSIGNED_INT_5_9_9_9_REV&&(te=a.RGB9_E5),w===a.RGBA){const Re=se?vr:Qe.getTransfer(ee);W===a.FLOAT&&(te=a.RGBA32F),W===a.HALF_FLOAT&&(te=a.RGBA16F),W===a.UNSIGNED_BYTE&&(te=Re===ht?a.SRGB8_ALPHA8:a.RGBA8),W===a.UNSIGNED_SHORT_4_4_4_4&&(te=a.RGBA4),W===a.UNSIGNED_SHORT_5_5_5_1&&(te=a.RGB5_A1)}return(te===a.R16F||te===a.R32F||te===a.RG16F||te===a.RG32F||te===a.RGBA16F||te===a.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function x(L,w){let W;return L?w===null||w===Kn||w===mi?W=a.DEPTH24_STENCIL8:w===tn?W=a.DEPTH32F_STENCIL8:w===_s&&(W=a.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Kn||w===mi?W=a.DEPTH_COMPONENT24:w===tn?W=a.DEPTH_COMPONENT32F:w===_s&&(W=a.DEPTH_COMPONENT16),W}function E(L,w){return g(L)===!0||L.isFramebufferTexture&&L.minFilter!==wt&&L.minFilter!==Je?Math.log2(Math.max(w.width,w.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?w.mipmaps.length:1}function b(L){const w=L.target;w.removeEventListener("dispose",b),R(w),w.isVideoTexture&&h.delete(w)}function T(L){const w=L.target;w.removeEventListener("dispose",T),M(w)}function R(L){const w=n.get(L);if(w.__webglInit===void 0)return;const W=L.source,ee=d.get(W);if(ee){const se=ee[w.__cacheKey];se.usedTimes--,se.usedTimes===0&&S(L),Object.keys(ee).length===0&&d.delete(W)}n.remove(L)}function S(L){const w=n.get(L);a.deleteTexture(w.__webglTexture);const W=L.source,ee=d.get(W);delete ee[w.__cacheKey],r.memory.textures--}function M(L){const w=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(w.__webglFramebuffer[ee]))for(let se=0;se<w.__webglFramebuffer[ee].length;se++)a.deleteFramebuffer(w.__webglFramebuffer[ee][se]);else a.deleteFramebuffer(w.__webglFramebuffer[ee]);w.__webglDepthbuffer&&a.deleteRenderbuffer(w.__webglDepthbuffer[ee])}else{if(Array.isArray(w.__webglFramebuffer))for(let ee=0;ee<w.__webglFramebuffer.length;ee++)a.deleteFramebuffer(w.__webglFramebuffer[ee]);else a.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&a.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&a.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ee=0;ee<w.__webglColorRenderbuffer.length;ee++)w.__webglColorRenderbuffer[ee]&&a.deleteRenderbuffer(w.__webglColorRenderbuffer[ee]);w.__webglDepthRenderbuffer&&a.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const W=L.textures;for(let ee=0,se=W.length;ee<se;ee++){const te=n.get(W[ee]);te.__webglTexture&&(a.deleteTexture(te.__webglTexture),r.memory.textures--),n.remove(W[ee])}n.remove(L)}let P=0;function z(){P=0}function F(){const L=P;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),P+=1,L}function k(L){const w=[];return w.push(L.wrapS),w.push(L.wrapT),w.push(L.wrapR||0),w.push(L.magFilter),w.push(L.minFilter),w.push(L.anisotropy),w.push(L.internalFormat),w.push(L.format),w.push(L.type),w.push(L.generateMipmaps),w.push(L.premultiplyAlpha),w.push(L.flipY),w.push(L.unpackAlignment),w.push(L.colorSpace),w.join()}function H(L,w){const W=n.get(L);if(L.isVideoTexture&&he(L),L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){const ee=L.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(W,L,w);return}}t.bindTexture(a.TEXTURE_2D,W.__webglTexture,a.TEXTURE0+w)}function U(L,w){const W=n.get(L);if(L.version>0&&W.__version!==L.version){X(W,L,w);return}t.bindTexture(a.TEXTURE_2D_ARRAY,W.__webglTexture,a.TEXTURE0+w)}function $(L,w){const W=n.get(L);if(L.version>0&&W.__version!==L.version){X(W,L,w);return}t.bindTexture(a.TEXTURE_3D,W.__webglTexture,a.TEXTURE0+w)}function G(L,w){const W=n.get(L);if(L.version>0&&W.__version!==L.version){V(W,L,w);return}t.bindTexture(a.TEXTURE_CUBE_MAP,W.__webglTexture,a.TEXTURE0+w)}const J={[Tn]:a.REPEAT,[Et]:a.CLAMP_TO_EDGE,[xs]:a.MIRRORED_REPEAT},oe={[wt]:a.NEAREST,[Ma]:a.NEAREST_MIPMAP_NEAREST,[Ni]:a.NEAREST_MIPMAP_LINEAR,[Je]:a.LINEAR,[ys]:a.LINEAR_MIPMAP_NEAREST,[xn]:a.LINEAR_MIPMAP_LINEAR},le={[Uu]:a.NEVER,[zu]:a.ALWAYS,[Nu]:a.LESS,[tc]:a.LEQUAL,[Fu]:a.EQUAL,[ku]:a.GEQUAL,[Ou]:a.GREATER,[Bu]:a.NOTEQUAL};function Se(L,w){if(w.type===tn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Je||w.magFilter===ys||w.magFilter===Ni||w.magFilter===xn||w.minFilter===Je||w.minFilter===ys||w.minFilter===Ni||w.minFilter===xn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(L,a.TEXTURE_WRAP_S,J[w.wrapS]),a.texParameteri(L,a.TEXTURE_WRAP_T,J[w.wrapT]),(L===a.TEXTURE_3D||L===a.TEXTURE_2D_ARRAY)&&a.texParameteri(L,a.TEXTURE_WRAP_R,J[w.wrapR]),a.texParameteri(L,a.TEXTURE_MAG_FILTER,oe[w.magFilter]),a.texParameteri(L,a.TEXTURE_MIN_FILTER,oe[w.minFilter]),w.compareFunction&&(a.texParameteri(L,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(L,a.TEXTURE_COMPARE_FUNC,le[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===wt||w.minFilter!==Ni&&w.minFilter!==xn||w.type===tn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");a.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function K(L,w){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,w.addEventListener("dispose",b));const ee=w.source;let se=d.get(ee);se===void 0&&(se={},d.set(ee,se));const te=k(w);if(te!==L.__cacheKey){se[te]===void 0&&(se[te]={texture:a.createTexture(),usedTimes:0},r.memory.textures++,W=!0),se[te].usedTimes++;const Re=se[L.__cacheKey];Re!==void 0&&(se[L.__cacheKey].usedTimes--,Re.usedTimes===0&&S(w)),L.__cacheKey=te,L.__webglTexture=se[te].texture}return W}function X(L,w,W){let ee=a.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ee=a.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ee=a.TEXTURE_3D);const se=K(L,w),te=w.source;t.bindTexture(ee,L.__webglTexture,a.TEXTURE0+W);const Re=n.get(te);if(te.version!==Re.__version||se===!0){t.activeTexture(a.TEXTURE0+W);const ve=Qe.getPrimaries(Qe.workingColorSpace),we=w.colorSpace===An?null:Qe.getPrimaries(w.colorSpace),nt=w.colorSpace===An||ve===we?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,w.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,w.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let ce=v(w.image,!1,i.maxTextureSize);ce=Be(w,ce);const Te=s.convert(w.format,w.colorSpace),ke=s.convert(w.type);let Ge=_(w.internalFormat,Te,ke,w.colorSpace,w.isVideoTexture);Se(ee,w);let Ae;const rt=w.mipmaps,je=w.isVideoTexture!==!0,dt=Re.__version===void 0||se===!0,N=te.dataReady,xe=E(w,ce);if(w.isDepthTexture)Ge=x(w.format===gi,w.type),dt&&(je?t.texStorage2D(a.TEXTURE_2D,1,Ge,ce.width,ce.height):t.texImage2D(a.TEXTURE_2D,0,Ge,ce.width,ce.height,0,Te,ke,null));else if(w.isDataTexture)if(rt.length>0){je&&dt&&t.texStorage2D(a.TEXTURE_2D,xe,Ge,rt[0].width,rt[0].height);for(let j=0,ie=rt.length;j<ie;j++)Ae=rt[j],je?N&&t.texSubImage2D(a.TEXTURE_2D,j,0,0,Ae.width,Ae.height,Te,ke,Ae.data):t.texImage2D(a.TEXTURE_2D,j,Ge,Ae.width,Ae.height,0,Te,ke,Ae.data);w.generateMipmaps=!1}else je?(dt&&t.texStorage2D(a.TEXTURE_2D,xe,Ge,ce.width,ce.height),N&&t.texSubImage2D(a.TEXTURE_2D,0,0,0,ce.width,ce.height,Te,ke,ce.data)):t.texImage2D(a.TEXTURE_2D,0,Ge,ce.width,ce.height,0,Te,ke,ce.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){je&&dt&&t.texStorage3D(a.TEXTURE_2D_ARRAY,xe,Ge,rt[0].width,rt[0].height,ce.depth);for(let j=0,ie=rt.length;j<ie;j++)if(Ae=rt[j],w.format!==vt)if(Te!==null)if(je){if(N)if(w.layerUpdates.size>0){const Me=Bc(Ae.width,Ae.height,w.format,w.type);for(const ye of w.layerUpdates){const Ke=Ae.data.subarray(ye*Me/Ae.data.BYTES_PER_ELEMENT,(ye+1)*Me/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,j,0,0,ye,Ae.width,Ae.height,1,Te,Ke)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,j,0,0,0,Ae.width,Ae.height,ce.depth,Te,Ae.data)}else t.compressedTexImage3D(a.TEXTURE_2D_ARRAY,j,Ge,Ae.width,Ae.height,ce.depth,0,Ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?N&&t.texSubImage3D(a.TEXTURE_2D_ARRAY,j,0,0,0,Ae.width,Ae.height,ce.depth,Te,ke,Ae.data):t.texImage3D(a.TEXTURE_2D_ARRAY,j,Ge,Ae.width,Ae.height,ce.depth,0,Te,ke,Ae.data)}else{je&&dt&&t.texStorage2D(a.TEXTURE_2D,xe,Ge,rt[0].width,rt[0].height);for(let j=0,ie=rt.length;j<ie;j++)Ae=rt[j],w.format!==vt?Te!==null?je?N&&t.compressedTexSubImage2D(a.TEXTURE_2D,j,0,0,Ae.width,Ae.height,Te,Ae.data):t.compressedTexImage2D(a.TEXTURE_2D,j,Ge,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?N&&t.texSubImage2D(a.TEXTURE_2D,j,0,0,Ae.width,Ae.height,Te,ke,Ae.data):t.texImage2D(a.TEXTURE_2D,j,Ge,Ae.width,Ae.height,0,Te,ke,Ae.data)}else if(w.isDataArrayTexture)if(je){if(dt&&t.texStorage3D(a.TEXTURE_2D_ARRAY,xe,Ge,ce.width,ce.height,ce.depth),N)if(w.layerUpdates.size>0){const j=Bc(ce.width,ce.height,w.format,w.type);for(const ie of w.layerUpdates){const Me=ce.data.subarray(ie*j/ce.data.BYTES_PER_ELEMENT,(ie+1)*j/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,ie,ce.width,ce.height,1,Te,ke,Me)}w.clearLayerUpdates()}else t.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Te,ke,ce.data)}else t.texImage3D(a.TEXTURE_2D_ARRAY,0,Ge,ce.width,ce.height,ce.depth,0,Te,ke,ce.data);else if(w.isData3DTexture)je?(dt&&t.texStorage3D(a.TEXTURE_3D,xe,Ge,ce.width,ce.height,ce.depth),N&&t.texSubImage3D(a.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Te,ke,ce.data)):t.texImage3D(a.TEXTURE_3D,0,Ge,ce.width,ce.height,ce.depth,0,Te,ke,ce.data);else if(w.isFramebufferTexture){if(dt)if(je)t.texStorage2D(a.TEXTURE_2D,xe,Ge,ce.width,ce.height);else{let j=ce.width,ie=ce.height;for(let Me=0;Me<xe;Me++)t.texImage2D(a.TEXTURE_2D,Me,Ge,j,ie,0,Te,ke,null),j>>=1,ie>>=1}}else if(rt.length>0){if(je&&dt){const j=be(rt[0]);t.texStorage2D(a.TEXTURE_2D,xe,Ge,j.width,j.height)}for(let j=0,ie=rt.length;j<ie;j++)Ae=rt[j],je?N&&t.texSubImage2D(a.TEXTURE_2D,j,0,0,Te,ke,Ae):t.texImage2D(a.TEXTURE_2D,j,Ge,Te,ke,Ae);w.generateMipmaps=!1}else if(je){if(dt){const j=be(ce);t.texStorage2D(a.TEXTURE_2D,xe,Ge,j.width,j.height)}N&&t.texSubImage2D(a.TEXTURE_2D,0,0,0,Te,ke,ce)}else t.texImage2D(a.TEXTURE_2D,0,Ge,Te,ke,ce);g(w)&&m(ee),Re.__version=te.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function V(L,w,W){if(w.image.length!==6)return;const ee=K(L,w),se=w.source;t.bindTexture(a.TEXTURE_CUBE_MAP,L.__webglTexture,a.TEXTURE0+W);const te=n.get(se);if(se.version!==te.__version||ee===!0){t.activeTexture(a.TEXTURE0+W);const Re=Qe.getPrimaries(Qe.workingColorSpace),ve=w.colorSpace===An?null:Qe.getPrimaries(w.colorSpace),we=w.colorSpace===An||Re===ve?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,w.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,w.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const nt=w.isCompressedTexture||w.image[0].isCompressedTexture,ce=w.image[0]&&w.image[0].isDataTexture,Te=[];for(let ie=0;ie<6;ie++)!nt&&!ce?Te[ie]=v(w.image[ie],!0,i.maxCubemapSize):Te[ie]=ce?w.image[ie].image:w.image[ie],Te[ie]=Be(w,Te[ie]);const ke=Te[0],Ge=s.convert(w.format,w.colorSpace),Ae=s.convert(w.type),rt=_(w.internalFormat,Ge,Ae,w.colorSpace),je=w.isVideoTexture!==!0,dt=te.__version===void 0||ee===!0,N=se.dataReady;let xe=E(w,ke);Se(a.TEXTURE_CUBE_MAP,w);let j;if(nt){je&&dt&&t.texStorage2D(a.TEXTURE_CUBE_MAP,xe,rt,ke.width,ke.height);for(let ie=0;ie<6;ie++){j=Te[ie].mipmaps;for(let Me=0;Me<j.length;Me++){const ye=j[Me];w.format!==vt?Ge!==null?je?N&&t.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me,0,0,ye.width,ye.height,Ge,ye.data):t.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me,rt,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?N&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me,0,0,ye.width,ye.height,Ge,Ae,ye.data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me,rt,ye.width,ye.height,0,Ge,Ae,ye.data)}}}else{if(j=w.mipmaps,je&&dt){j.length>0&&xe++;const ie=be(Te[0]);t.texStorage2D(a.TEXTURE_CUBE_MAP,xe,rt,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(ce){je?N&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Te[ie].width,Te[ie].height,Ge,Ae,Te[ie].data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,rt,Te[ie].width,Te[ie].height,0,Ge,Ae,Te[ie].data);for(let Me=0;Me<j.length;Me++){const Ke=j[Me].image[ie].image;je?N&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me+1,0,0,Ke.width,Ke.height,Ge,Ae,Ke.data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me+1,rt,Ke.width,Ke.height,0,Ge,Ae,Ke.data)}}else{je?N&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ge,Ae,Te[ie]):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,rt,Ge,Ae,Te[ie]);for(let Me=0;Me<j.length;Me++){const ye=j[Me];je?N&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me+1,0,0,Ge,Ae,ye.image[ie]):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me+1,rt,Ge,Ae,ye.image[ie])}}}g(w)&&m(a.TEXTURE_CUBE_MAP),te.__version=se.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function ge(L,w,W,ee,se,te){const Re=s.convert(W.format,W.colorSpace),ve=s.convert(W.type),we=_(W.internalFormat,Re,ve,W.colorSpace),nt=n.get(w),ce=n.get(W);if(ce.__renderTarget=w,!nt.__hasExternalTextures){const Te=Math.max(1,w.width>>te),ke=Math.max(1,w.height>>te);se===a.TEXTURE_3D||se===a.TEXTURE_2D_ARRAY?t.texImage3D(se,te,we,Te,ke,w.depth,0,Re,ve,null):t.texImage2D(se,te,we,Te,ke,0,Re,ve,null)}t.bindFramebuffer(a.FRAMEBUFFER,L),pe(w)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,ee,se,ce.__webglTexture,0,re(w)):(se===a.TEXTURE_2D||se>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,ee,se,ce.__webglTexture,te),t.bindFramebuffer(a.FRAMEBUFFER,null)}function de(L,w,W){if(a.bindRenderbuffer(a.RENDERBUFFER,L),w.depthBuffer){const ee=w.depthTexture,se=ee&&ee.isDepthTexture?ee.type:null,te=x(w.stencilBuffer,se),Re=w.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,ve=re(w);pe(w)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ve,te,w.width,w.height):W?a.renderbufferStorageMultisample(a.RENDERBUFFER,ve,te,w.width,w.height):a.renderbufferStorage(a.RENDERBUFFER,te,w.width,w.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,Re,a.RENDERBUFFER,L)}else{const ee=w.textures;for(let se=0;se<ee.length;se++){const te=ee[se],Re=s.convert(te.format,te.colorSpace),ve=s.convert(te.type),we=_(te.internalFormat,Re,ve,te.colorSpace),nt=re(w);W&&pe(w)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,nt,we,w.width,w.height):pe(w)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,nt,we,w.width,w.height):a.renderbufferStorage(a.RENDERBUFFER,we,w.width,w.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function Ue(L,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(a.FRAMEBUFFER,L),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(w.depthTexture);ee.__renderTarget=w,(!ee.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),H(w.depthTexture,0);const se=ee.__webglTexture,te=re(w);if(w.depthTexture.format===Fi)pe(w)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,se,0,te):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,se,0);else if(w.depthTexture.format===gi)pe(w)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,se,0,te):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function He(L){const w=n.get(L),W=L.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==L.depthTexture){const ee=L.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ee){const se=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ee.removeEventListener("dispose",se)};ee.addEventListener("dispose",se),w.__depthDisposeCallback=se}w.__boundDepthTexture=ee}if(L.depthTexture&&!w.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ue(w.__webglFramebuffer,L)}else if(W){w.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(a.FRAMEBUFFER,w.__webglFramebuffer[ee]),w.__webglDepthbuffer[ee]===void 0)w.__webglDepthbuffer[ee]=a.createRenderbuffer(),de(w.__webglDepthbuffer[ee],L,!1);else{const se=L.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,te=w.__webglDepthbuffer[ee];a.bindRenderbuffer(a.RENDERBUFFER,te),a.framebufferRenderbuffer(a.FRAMEBUFFER,se,a.RENDERBUFFER,te)}}else if(t.bindFramebuffer(a.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=a.createRenderbuffer(),de(w.__webglDepthbuffer,L,!1);else{const ee=L.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,se=w.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,se),a.framebufferRenderbuffer(a.FRAMEBUFFER,ee,a.RENDERBUFFER,se)}t.bindFramebuffer(a.FRAMEBUFFER,null)}function Fe(L,w,W){const ee=n.get(L);w!==void 0&&ge(ee.__webglFramebuffer,L,L.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),W!==void 0&&He(L)}function qe(L){const w=L.texture,W=n.get(L),ee=n.get(w);L.addEventListener("dispose",T);const se=L.textures,te=L.isWebGLCubeRenderTarget===!0,Re=se.length>1;if(Re||(ee.__webglTexture===void 0&&(ee.__webglTexture=a.createTexture()),ee.__version=w.version,r.memory.textures++),te){W.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer[ve]=[];for(let we=0;we<w.mipmaps.length;we++)W.__webglFramebuffer[ve][we]=a.createFramebuffer()}else W.__webglFramebuffer[ve]=a.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer=[];for(let ve=0;ve<w.mipmaps.length;ve++)W.__webglFramebuffer[ve]=a.createFramebuffer()}else W.__webglFramebuffer=a.createFramebuffer();if(Re)for(let ve=0,we=se.length;ve<we;ve++){const nt=n.get(se[ve]);nt.__webglTexture===void 0&&(nt.__webglTexture=a.createTexture(),r.memory.textures++)}if(L.samples>0&&pe(L)===!1){W.__webglMultisampledFramebuffer=a.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(a.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ve=0;ve<se.length;ve++){const we=se[ve];W.__webglColorRenderbuffer[ve]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,W.__webglColorRenderbuffer[ve]);const nt=s.convert(we.format,we.colorSpace),ce=s.convert(we.type),Te=_(we.internalFormat,nt,ce,we.colorSpace,L.isXRRenderTarget===!0),ke=re(L);a.renderbufferStorageMultisample(a.RENDERBUFFER,ke,Te,L.width,L.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ve,a.RENDERBUFFER,W.__webglColorRenderbuffer[ve])}a.bindRenderbuffer(a.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=a.createRenderbuffer(),de(W.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(a.FRAMEBUFFER,null)}}if(te){t.bindTexture(a.TEXTURE_CUBE_MAP,ee.__webglTexture),Se(a.TEXTURE_CUBE_MAP,w);for(let ve=0;ve<6;ve++)if(w.mipmaps&&w.mipmaps.length>0)for(let we=0;we<w.mipmaps.length;we++)ge(W.__webglFramebuffer[ve][we],L,w,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,we);else ge(W.__webglFramebuffer[ve],L,w,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);g(w)&&m(a.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ve=0,we=se.length;ve<we;ve++){const nt=se[ve],ce=n.get(nt);t.bindTexture(a.TEXTURE_2D,ce.__webglTexture),Se(a.TEXTURE_2D,nt),ge(W.__webglFramebuffer,L,nt,a.COLOR_ATTACHMENT0+ve,a.TEXTURE_2D,0),g(nt)&&m(a.TEXTURE_2D)}t.unbindTexture()}else{let ve=a.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ve=L.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),t.bindTexture(ve,ee.__webglTexture),Se(ve,w),w.mipmaps&&w.mipmaps.length>0)for(let we=0;we<w.mipmaps.length;we++)ge(W.__webglFramebuffer[we],L,w,a.COLOR_ATTACHMENT0,ve,we);else ge(W.__webglFramebuffer,L,w,a.COLOR_ATTACHMENT0,ve,0);g(w)&&m(ve),t.unbindTexture()}L.depthBuffer&&He(L)}function ne(L){const w=L.textures;for(let W=0,ee=w.length;W<ee;W++){const se=w[W];if(g(se)){const te=y(L),Re=n.get(se).__webglTexture;t.bindTexture(te,Re),m(te),t.unbindTexture()}}}const ae=[],I=[];function Ee(L){if(L.samples>0){if(pe(L)===!1){const w=L.textures,W=L.width,ee=L.height;let se=a.COLOR_BUFFER_BIT;const te=L.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Re=n.get(L),ve=w.length>1;if(ve)for(let we=0;we<w.length;we++)t.bindFramebuffer(a.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.RENDERBUFFER,null),t.bindFramebuffer(a.FRAMEBUFFER,Re.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.TEXTURE_2D,null,0);t.bindFramebuffer(a.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(a.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let we=0;we<w.length;we++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(se|=a.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(se|=a.STENCIL_BUFFER_BIT)),ve){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,Re.__webglColorRenderbuffer[we]);const nt=n.get(w[we]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,nt,0)}a.blitFramebuffer(0,0,W,ee,0,0,W,ee,se,a.NEAREST),l===!0&&(ae.length=0,I.length=0,ae.push(a.COLOR_ATTACHMENT0+we),L.depthBuffer&&L.resolveDepthBuffer===!1&&(ae.push(te),I.push(te),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,I)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,ae))}if(t.bindFramebuffer(a.READ_FRAMEBUFFER,null),t.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),ve)for(let we=0;we<w.length;we++){t.bindFramebuffer(a.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.RENDERBUFFER,Re.__webglColorRenderbuffer[we]);const nt=n.get(w[we]).__webglTexture;t.bindFramebuffer(a.FRAMEBUFFER,Re.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.TEXTURE_2D,nt,0)}t.bindFramebuffer(a.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const w=L.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[w])}}}function re(L){return Math.min(i.maxSamples,L.samples)}function pe(L){const w=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function he(L){const w=r.render.frame;h.get(L)!==w&&(h.set(L,w),L.update())}function Be(L,w){const W=L.colorSpace,ee=L.format,se=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==Ot&&W!==An&&(Qe.getTransfer(W)===ht?(ee!==vt||se!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),w}function be(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=z,this.setTexture2D=H,this.setTexture2DArray=U,this.setTexture3D=$,this.setTextureCube=G,this.rebindTextures=Fe,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=pe}function Xd(a,e){function t(n,i=An){let s;const r=Qe.getTransfer(i);if(n===yn)return a.UNSIGNED_BYTE;if(n===ba)return a.UNSIGNED_SHORT_4_4_4_4;if(n===wa)return a.UNSIGNED_SHORT_5_5_5_1;if(n===Xl)return a.UNSIGNED_INT_5_9_9_9_REV;if(n===Vl)return a.BYTE;if(n===Wl)return a.SHORT;if(n===_s)return a.UNSIGNED_SHORT;if(n===Sa)return a.INT;if(n===Kn)return a.UNSIGNED_INT;if(n===tn)return a.FLOAT;if(n===$n)return a.HALF_FLOAT;if(n===Yl)return a.ALPHA;if(n===ql)return a.RGB;if(n===vt)return a.RGBA;if(n===Zl)return a.LUMINANCE;if(n===Kl)return a.LUMINANCE_ALPHA;if(n===Fi)return a.DEPTH_COMPONENT;if(n===gi)return a.DEPTH_STENCIL;if(n===Ta)return a.RED;if(n===cr)return a.RED_INTEGER;if(n===$l)return a.RG;if(n===Aa)return a.RG_INTEGER;if(n===Ea)return a.RGBA_INTEGER;if(n===hr||n===ur||n===dr||n===fr)if(r===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===hr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===hr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ca||n===Ra||n===La||n===Pa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ca)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ra)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===La)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Pa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ia||n===Da||n===Ua)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ia||n===Da)return r===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ua)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Na||n===Fa||n===Oa||n===Ba||n===ka||n===za||n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===Ya||n===qa||n===Za)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Na)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fa)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Oa)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ba)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ka)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===za)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ha)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ga)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Va)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wa)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Xa)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ya)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qa)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Za)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pr||n===Ka||n===$a)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===pr)return r===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ka)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$a)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jl||n===ja||n===Ja||n===Qa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===pr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ja)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ja)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===mi?a.UNSIGNED_INT_24_8:a[n]!==void 0?a[n]:null}return{convert:t}}class Yd extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class kt extends it{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wy={type:"move"};class kc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wy)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new kt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Xy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yy=`
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

}`;class qy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new gt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Xt({vertexShader:Xy,fragmentShader:Yy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Le(new Ln(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zy extends Hn{constructor(e,t){super();const n=this;let i=null,s=1,r=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const v=new qy,g=t.getContextAttributes();let m=null,y=null;const _=[],x=[],E=new Q;let b=null;const T=new Rt;T.viewport=new at;const R=new Rt;R.viewport=new at;const S=[T,R],M=new Yd;let P=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let V=_[X];return V===void 0&&(V=new kc,_[X]=V),V.getTargetRaySpace()},this.getControllerGrip=function(X){let V=_[X];return V===void 0&&(V=new kc,_[X]=V),V.getGripSpace()},this.getHand=function(X){let V=_[X];return V===void 0&&(V=new kc,_[X]=V),V.getHandSpace()};function F(X){const V=x.indexOf(X.inputSource);if(V===-1)return;const ge=_[V];ge!==void 0&&(ge.update(X.inputSource,X.frame,c||r),ge.dispatchEvent({type:X.type,data:X.inputSource}))}function k(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",H);for(let X=0;X<_.length;X++){const V=x[X];V!==null&&(x[X]=null,_[X].disconnect(V))}P=null,z=null,v.reset(),e.setRenderTarget(m),f=null,d=null,u=null,i=null,y=null,K.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",k),i.addEventListener("inputsourceschange",H),g.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(E),i.renderState.layers===void 0){const V={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,V),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new nn(f.framebufferWidth,f.framebufferHeight,{format:vt,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let V=null,ge=null,de=null;g.depth&&(de=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=g.stencil?gi:Fi,ge=g.stencil?mi:Kn);const Ue={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ue),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new nn(d.textureWidth,d.textureHeight,{format:vt,type:yn,depthTexture:new Eo(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(o),K.setContext(i),K.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function H(X){for(let V=0;V<X.removed.length;V++){const ge=X.removed[V],de=x.indexOf(ge);de>=0&&(x[de]=null,_[de].disconnect(ge))}for(let V=0;V<X.added.length;V++){const ge=X.added[V];let de=x.indexOf(ge);if(de===-1){for(let He=0;He<_.length;He++)if(He>=x.length){x.push(ge),de=He;break}else if(x[He]===null){x[He]=ge,de=He;break}if(de===-1)break}const Ue=_[de];Ue&&Ue.connect(ge)}}const U=new C,$=new C;function G(X,V,ge){U.setFromMatrixPosition(V.matrixWorld),$.setFromMatrixPosition(ge.matrixWorld);const de=U.distanceTo($),Ue=V.projectionMatrix.elements,He=ge.projectionMatrix.elements,Fe=Ue[14]/(Ue[10]-1),qe=Ue[14]/(Ue[10]+1),ne=(Ue[9]+1)/Ue[5],ae=(Ue[9]-1)/Ue[5],I=(Ue[8]-1)/Ue[0],Ee=(He[8]+1)/He[0],re=Fe*I,pe=Fe*Ee,he=de/(-I+Ee),Be=he*-I;if(V.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Be),X.translateZ(he),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ue[10]===-1)X.projectionMatrix.copy(V.projectionMatrix),X.projectionMatrixInverse.copy(V.projectionMatrixInverse);else{const be=Fe+he,L=qe+he,w=re-Be,W=pe+(de-Be),ee=ne*qe/L*be,se=ae*qe/L*be;X.projectionMatrix.makePerspective(w,W,ee,se,be,L),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function J(X,V){V===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(V.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let V=X.near,ge=X.far;v.texture!==null&&(v.depthNear>0&&(V=v.depthNear),v.depthFar>0&&(ge=v.depthFar)),M.near=R.near=T.near=V,M.far=R.far=T.far=ge,(P!==M.near||z!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,z=M.far),T.layers.mask=X.layers.mask|2,R.layers.mask=X.layers.mask|4,M.layers.mask=T.layers.mask|R.layers.mask;const de=X.parent,Ue=M.cameras;J(M,de);for(let He=0;He<Ue.length;He++)J(Ue[He],de);Ue.length===2?G(M,T,R):M.projectionMatrix.copy(T.projectionMatrix),oe(X,M,de)};function oe(X,V,ge){ge===null?X.matrix.copy(V.matrixWorld):(X.matrix.copy(ge.matrixWorld),X.matrix.invert(),X.matrix.multiply(V.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(V.projectionMatrix),X.projectionMatrixInverse.copy(V.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=bs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let le=null;function Se(X,V){if(h=V.getViewerPose(c||r),p=V,h!==null){const ge=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let de=!1;ge.length!==M.cameras.length&&(M.cameras.length=0,de=!0);for(let He=0;He<ge.length;He++){const Fe=ge[He];let qe=null;if(f!==null)qe=f.getViewport(Fe);else{const ae=u.getViewSubImage(d,Fe);qe=ae.viewport,He===0&&(e.setRenderTargetTextures(y,ae.colorTexture,d.ignoreDepthValues?void 0:ae.depthStencilTexture),e.setRenderTarget(y))}let ne=S[He];ne===void 0&&(ne=new Rt,ne.layers.enable(He),ne.viewport=new at,S[He]=ne),ne.matrix.fromArray(Fe.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(Fe.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(qe.x,qe.y,qe.width,qe.height),He===0&&(M.matrix.copy(ne.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),de===!0&&M.cameras.push(ne)}const Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")){const He=u.getDepthInformation(ge[0]);He&&He.isValid&&He.texture&&v.init(e,He,i.renderState)}}for(let ge=0;ge<_.length;ge++){const de=x[ge],Ue=_[ge];de!==null&&Ue!==void 0&&Ue.update(de,V,c||r)}le&&le(X,V),V.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:V}),p=null}const K=new vd;K.setAnimationLoop(Se),this.setAnimationLoop=function(X){le=X},this.dispose=function(){}}}const $i=new un,Ky=new Oe;function $y(a,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,ud(a)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,y,_,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,y,_):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ht&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ht&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const y=e.get(m),_=y.envMap,x=y.envMapRotation;_&&(g.envMap.value=_,$i.copy(x),$i.x*=-1,$i.y*=-1,$i.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),g.envMapRotation.value.setFromMatrix4(Ky.makeRotationFromEuler($i)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,_){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=_*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ht&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const y=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function jy(a,e,t,n){let i={},s={},r=[];const o=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const x=_.program;n.uniformBlockBinding(y,x)}function c(y,_){let x=i[y.id];x===void 0&&(p(y),x=h(y),i[y.id]=x,y.addEventListener("dispose",g));const E=_.program;n.updateUBOMapping(y,E);const b=e.render.frame;s[y.id]!==b&&(d(y),s[y.id]=b)}function h(y){const _=u();y.__bindingPointIndex=_;const x=a.createBuffer(),E=y.__size,b=y.usage;return a.bindBuffer(a.UNIFORM_BUFFER,x),a.bufferData(a.UNIFORM_BUFFER,E,b),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,_,x),x}function u(){for(let y=0;y<o;y++)if(r.indexOf(y)===-1)return r.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=i[y.id],x=y.uniforms,E=y.__cache;a.bindBuffer(a.UNIFORM_BUFFER,_);for(let b=0,T=x.length;b<T;b++){const R=Array.isArray(x[b])?x[b]:[x[b]];for(let S=0,M=R.length;S<M;S++){const P=R[S];if(f(P,b,S,E)===!0){const z=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let H=0;H<F.length;H++){const U=F[H],$=v(U);typeof U=="number"||typeof U=="boolean"?(P.__data[0]=U,a.bufferSubData(a.UNIFORM_BUFFER,z+k,P.__data)):U.isMatrix3?(P.__data[0]=U.elements[0],P.__data[1]=U.elements[1],P.__data[2]=U.elements[2],P.__data[3]=0,P.__data[4]=U.elements[3],P.__data[5]=U.elements[4],P.__data[6]=U.elements[5],P.__data[7]=0,P.__data[8]=U.elements[6],P.__data[9]=U.elements[7],P.__data[10]=U.elements[8],P.__data[11]=0):(U.toArray(P.__data,k),k+=$.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,z,P.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function f(y,_,x,E){const b=y.value,T=_+"_"+x;if(E[T]===void 0)return typeof b=="number"||typeof b=="boolean"?E[T]=b:E[T]=b.clone(),!0;{const R=E[T];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return E[T]=b,!0}else if(R.equals(b)===!1)return R.copy(b),!0}return!1}function p(y){const _=y.uniforms;let x=0;const E=16;for(let T=0,R=_.length;T<R;T++){const S=Array.isArray(_[T])?_[T]:[_[T]];for(let M=0,P=S.length;M<P;M++){const z=S[M],F=Array.isArray(z.value)?z.value:[z.value];for(let k=0,H=F.length;k<H;k++){const U=F[k],$=v(U),G=x%E,J=G%$.boundary,oe=G+J;x+=J,oe!==0&&E-oe<$.storage&&(x+=E-oe),z.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=$.storage}}}const b=x%E;return b>0&&(x+=E-b),y.__size=x,y.__cache={},this}function v(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function g(y){const _=y.target;_.removeEventListener("dispose",g);const x=r.indexOf(_.__bindingPointIndex);r.splice(x,1),a.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function m(){for(const y in i)a.deleteBuffer(i[y]);r=[],i={},s={}}return{bind:l,update:c,dispose:m}}class qd{constructor(e={}){const{canvas:t=Vu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const y=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xt,this.toneMapping=qn,this.toneMappingExposure=1;const x=this;let E=!1,b=0,T=0,R=null,S=-1,M=null;const P=new at,z=new at;let F=null;const k=new Y(0);let H=0,U=t.width,$=t.height,G=1,J=null,oe=null;const le=new at(0,0,U,$),Se=new at(0,0,U,$);let K=!1;const X=new Rr;let V=!1,ge=!1;const de=new Oe,Ue=new Oe,He=new C,Fe=new at,qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ne=!1;function ae(){return R===null?G:1}let I=n;function Ee(A,O){return t.getContext(A,O)}try{const A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vn}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",ye,!1),I===null){const O="webgl2";if(I=Ee(O,A),I===null)throw Ee(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let re,pe,he,Be,be,L,w,W,ee,se,te,Re,ve,we,nt,ce,Te,ke,Ge,Ae,rt,je,dt,N;function xe(){re=new ix(I),re.init(),je=new Xd(I,re),pe=new jv(I,re,e,je),he=new Oy(I,re),pe.reverseDepthBuffer&&d&&he.buffers.depth.setReversed(!0),Be=new ax(I),be=new wy,L=new Vy(I,re,he,be,pe,je,Be),w=new Qv(x),W=new nx(x),ee=new qg(I),dt=new Kv(I,ee),se=new sx(I,ee,Be,dt),te=new lx(I,se,ee,Be),Ge=new ox(I,pe,L),ce=new Jv(be),Re=new by(x,w,W,re,pe,dt,ce),ve=new $y(x,be),we=new Ay,nt=new Iy(re),ke=new Zv(x,w,W,he,te,f,l),Te=new Ny(x,te,pe),N=new jy(I,Be,pe,he),Ae=new $v(I,re,Be),rt=new rx(I,re,Be),Be.programs=Re.programs,x.capabilities=pe,x.extensions=re,x.properties=be,x.renderLists=we,x.shadowMap=Te,x.state=he,x.info=Be}xe();const j=new Zy(x,I);this.xr=j,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=re.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=re.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(A){A!==void 0&&(G=A,this.setSize(U,$,!1))},this.getSize=function(A){return A.set(U,$)},this.setSize=function(A,O,q=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=A,$=O,t.width=Math.floor(A*G),t.height=Math.floor(O*G),q===!0&&(t.style.width=A+"px",t.style.height=O+"px"),this.setViewport(0,0,A,O)},this.getDrawingBufferSize=function(A){return A.set(U*G,$*G).floor()},this.setDrawingBufferSize=function(A,O,q){U=A,$=O,G=q,t.width=Math.floor(A*q),t.height=Math.floor(O*q),this.setViewport(0,0,A,O)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(le)},this.setViewport=function(A,O,q,Z){A.isVector4?le.set(A.x,A.y,A.z,A.w):le.set(A,O,q,Z),he.viewport(P.copy(le).multiplyScalar(G).round())},this.getScissor=function(A){return A.copy(Se)},this.setScissor=function(A,O,q,Z){A.isVector4?Se.set(A.x,A.y,A.z,A.w):Se.set(A,O,q,Z),he.scissor(z.copy(Se).multiplyScalar(G).round())},this.getScissorTest=function(){return K},this.setScissorTest=function(A){he.setScissorTest(K=A)},this.setOpaqueSort=function(A){J=A},this.setTransparentSort=function(A){oe=A},this.getClearColor=function(A){return A.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(A=!0,O=!0,q=!0){let Z=0;if(A){let B=!1;if(R!==null){const ue=R.texture.format;B=ue===Ea||ue===Aa||ue===cr}if(B){const ue=R.texture.type,_e=ue===yn||ue===Kn||ue===_s||ue===mi||ue===ba||ue===wa,Pe=ke.getClearColor(),Ie=ke.getClearAlpha(),We=Pe.r,$e=Pe.g,De=Pe.b;_e?(p[0]=We,p[1]=$e,p[2]=De,p[3]=Ie,I.clearBufferuiv(I.COLOR,0,p)):(v[0]=We,v[1]=$e,v[2]=De,v[3]=Ie,I.clearBufferiv(I.COLOR,0,v))}else Z|=I.COLOR_BUFFER_BIT}O&&(Z|=I.DEPTH_BUFFER_BIT),q&&(Z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),we.dispose(),nt.dispose(),be.dispose(),w.dispose(),W.dispose(),te.dispose(),dt.dispose(),N.dispose(),Re.dispose(),j.dispose(),j.removeEventListener("sessionstart",fm),j.removeEventListener("sessionend",pm),ps.stop()};function ie(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const A=Be.autoReset,O=Te.enabled,q=Te.autoUpdate,Z=Te.needsUpdate,B=Te.type;xe(),Be.autoReset=A,Te.enabled=O,Te.autoUpdate=q,Te.needsUpdate=Z,Te.type=B}function ye(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ke(A){const O=A.target;O.removeEventListener("dispose",Ke),bt(O)}function bt(A){Kt(A),be.remove(A)}function Kt(A){const O=be.get(A).programs;O!==void 0&&(O.forEach(function(q){Re.releaseProgram(q)}),A.isShaderMaterial&&Re.releaseShaderCache(A))}this.renderBufferDirect=function(A,O,q,Z,B,ue){O===null&&(O=qe);const _e=B.isMesh&&B.matrixWorld.determinant()<0,Pe=WS(A,O,q,Z,B);he.setMaterial(Z,_e);let Ie=q.index,We=1;if(Z.wireframe===!0){if(Ie=se.getWireframeAttribute(q),Ie===void 0)return;We=2}const $e=q.drawRange,De=q.attributes.position;let ot=$e.start*We,ft=($e.start+$e.count)*We;ue!==null&&(ot=Math.max(ot,ue.start*We),ft=Math.min(ft,(ue.start+ue.count)*We)),Ie!==null?(ot=Math.max(ot,0),ft=Math.min(ft,Ie.count)):De!=null&&(ot=Math.max(ot,0),ft=Math.min(ft,De.count));const pt=ft-ot;if(pt<0||pt===1/0)return;dt.setup(B,Z,Pe,q,Ie);let ln,lt=Ae;if(Ie!==null&&(ln=ee.get(Ie),lt=rt,lt.setIndex(ln)),B.isMesh)Z.wireframe===!0?(he.setLineWidth(Z.wireframeLinewidth*ae()),lt.setMode(I.LINES)):lt.setMode(I.TRIANGLES);else if(B.isLine){let Ne=Z.linewidth;Ne===void 0&&(Ne=1),he.setLineWidth(Ne*ae()),B.isLineSegments?lt.setMode(I.LINES):B.isLineLoop?lt.setMode(I.LINE_LOOP):lt.setMode(I.LINE_STRIP)}else B.isPoints?lt.setMode(I.POINTS):B.isSprite&&lt.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)lt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(re.get("WEBGL_multi_draw"))lt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ne=B._multiDrawStarts,di=B._multiDrawCounts,ct=B._multiDrawCount,Fn=Ie?ee.get(Ie).bytesPerElement:1,rr=be.get(Z).currentProgram.getUniforms();for(let gn=0;gn<ct;gn++)rr.setValue(I,"_gl_DrawID",gn),lt.render(Ne[gn]/Fn,di[gn])}else if(B.isInstancedMesh)lt.renderInstances(ot,pt,B.count);else if(q.isInstancedBufferGeometry){const Ne=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,di=Math.min(q.instanceCount,Ne);lt.renderInstances(ot,pt,di)}else lt.render(ot,pt)};function ut(A,O,q){A.transparent===!0&&A.side===en&&A.forceSinglePass===!1?(A.side=Ht,A.needsUpdate=!0,Fl(A,O,q),A.side=Bn,A.needsUpdate=!0,Fl(A,O,q),A.side=en):Fl(A,O,q)}this.compile=function(A,O,q=null){q===null&&(q=A),m=nt.get(q),m.init(O),_.push(m),q.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),A!==q&&A.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const Z=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ue=B.material;if(ue)if(Array.isArray(ue))for(let _e=0;_e<ue.length;_e++){const Pe=ue[_e];ut(Pe,q,B),Z.add(Pe)}else ut(ue,q,B),Z.add(ue)}),_.pop(),m=null,Z},this.compileAsync=function(A,O,q=null){const Z=this.compile(A,O,q);return new Promise(B=>{function ue(){if(Z.forEach(function(_e){be.get(_e).currentProgram.isReady()&&Z.delete(_e)}),Z.size===0){B(A);return}setTimeout(ue,10)}re.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Nn=null;function ui(A){Nn&&Nn(A)}function fm(){ps.stop()}function pm(){ps.start()}const ps=new vd;ps.setAnimationLoop(ui),typeof self<"u"&&ps.setContext(self),this.setAnimationLoop=function(A){Nn=A,j.setAnimationLoop(A),A===null?ps.stop():ps.start()},j.addEventListener("sessionstart",fm),j.addEventListener("sessionend",pm),this.render=function(A,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(O),O=j.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,O,R),m=nt.get(A,_.length),m.init(O),_.push(m),Ue.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),X.setFromProjectionMatrix(Ue),ge=this.localClippingEnabled,V=ce.init(this.clippingPlanes,ge),g=we.get(A,y.length),g.init(),y.push(g),j.enabled===!0&&j.isPresenting===!0){const ue=x.xr.getDepthSensingMesh();ue!==null&&Jh(ue,O,-1/0,x.sortObjects)}Jh(A,O,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(J,oe),ne=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,ne&&ke.addToRenderList(g,A),this.info.render.frame++,V===!0&&ce.beginShadows();const q=m.state.shadowsArray;Te.render(q,A,O),V===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=g.opaque,B=g.transmissive;if(m.setupLights(),O.isArrayCamera){const ue=O.cameras;if(B.length>0)for(let _e=0,Pe=ue.length;_e<Pe;_e++){const Ie=ue[_e];gm(Z,B,A,Ie)}ne&&ke.render(A);for(let _e=0,Pe=ue.length;_e<Pe;_e++){const Ie=ue[_e];mm(g,A,Ie,Ie.viewport)}}else B.length>0&&gm(Z,B,A,O),ne&&ke.render(A),mm(g,A,O);R!==null&&(L.updateMultisampleRenderTarget(R),L.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(x,A,O),dt.resetDefaultState(),S=-1,M=null,_.pop(),_.length>0?(m=_[_.length-1],V===!0&&ce.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Jh(A,O,q,Z){if(A.visible===!1)return;if(A.layers.test(O.layers)){if(A.isGroup)q=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(O);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||X.intersectsSprite(A)){Z&&Fe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ue);const _e=te.update(A),Pe=A.material;Pe.visible&&g.push(A,_e,Pe,q,Fe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||X.intersectsObject(A))){const _e=te.update(A),Pe=A.material;if(Z&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Fe.copy(A.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Fe.copy(_e.boundingSphere.center)),Fe.applyMatrix4(A.matrixWorld).applyMatrix4(Ue)),Array.isArray(Pe)){const Ie=_e.groups;for(let We=0,$e=Ie.length;We<$e;We++){const De=Ie[We],ot=Pe[De.materialIndex];ot&&ot.visible&&g.push(A,_e,ot,q,Fe.z,De)}}else Pe.visible&&g.push(A,_e,Pe,q,Fe.z,null)}}const ue=A.children;for(let _e=0,Pe=ue.length;_e<Pe;_e++)Jh(ue[_e],O,q,Z)}function mm(A,O,q,Z){const B=A.opaque,ue=A.transmissive,_e=A.transparent;m.setupLightsView(q),V===!0&&ce.setGlobalState(x.clippingPlanes,q),Z&&he.viewport(P.copy(Z)),B.length>0&&Nl(B,O,q),ue.length>0&&Nl(ue,O,q),_e.length>0&&Nl(_e,O,q),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function gm(A,O,q,Z){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Z.id]===void 0&&(m.state.transmissionRenderTarget[Z.id]=new nn(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float")?$n:yn,minFilter:xn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ue=m.state.transmissionRenderTarget[Z.id],_e=Z.viewport||P;ue.setSize(_e.z,_e.w);const Pe=x.getRenderTarget();x.setRenderTarget(ue),x.getClearColor(k),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear(),ne&&ke.render(q);const Ie=x.toneMapping;x.toneMapping=qn;const We=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),m.setupLightsView(Z),V===!0&&ce.setGlobalState(x.clippingPlanes,Z),Nl(A,q,Z),L.updateMultisampleRenderTarget(ue),L.updateRenderTargetMipmap(ue),re.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let De=0,ot=O.length;De<ot;De++){const ft=O[De],pt=ft.object,ln=ft.geometry,lt=ft.material,Ne=ft.group;if(lt.side===en&&pt.layers.test(Z.layers)){const di=lt.side;lt.side=Ht,lt.needsUpdate=!0,vm(pt,q,Z,ln,lt,Ne),lt.side=di,lt.needsUpdate=!0,$e=!0}}$e===!0&&(L.updateMultisampleRenderTarget(ue),L.updateRenderTargetMipmap(ue))}x.setRenderTarget(Pe),x.setClearColor(k,H),We!==void 0&&(Z.viewport=We),x.toneMapping=Ie}function Nl(A,O,q){const Z=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ue=A.length;B<ue;B++){const _e=A[B],Pe=_e.object,Ie=_e.geometry,We=Z===null?_e.material:Z,$e=_e.group;Pe.layers.test(q.layers)&&vm(Pe,O,q,Ie,We,$e)}}function vm(A,O,q,Z,B,ue){A.onBeforeRender(x,O,q,Z,B,ue),A.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(x,O,q,Z,A,ue),B.transparent===!0&&B.side===en&&B.forceSinglePass===!1?(B.side=Ht,B.needsUpdate=!0,x.renderBufferDirect(q,O,Z,B,A,ue),B.side=Bn,B.needsUpdate=!0,x.renderBufferDirect(q,O,Z,B,A,ue),B.side=en):x.renderBufferDirect(q,O,Z,B,A,ue),A.onAfterRender(x,O,q,Z,B,ue)}function Fl(A,O,q){O.isScene!==!0&&(O=qe);const Z=be.get(A),B=m.state.lights,ue=m.state.shadowsArray,_e=B.state.version,Pe=Re.getParameters(A,B.state,ue,O,q),Ie=Re.getProgramCacheKey(Pe);let We=Z.programs;Z.environment=A.isMeshStandardMaterial?O.environment:null,Z.fog=O.fog,Z.envMap=(A.isMeshStandardMaterial?W:w).get(A.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&A.envMap===null?O.environmentRotation:A.envMapRotation,We===void 0&&(A.addEventListener("dispose",Ke),We=new Map,Z.programs=We);let $e=We.get(Ie);if($e!==void 0){if(Z.currentProgram===$e&&Z.lightsStateVersion===_e)return ym(A,Pe),$e}else Pe.uniforms=Re.getUniforms(A),A.onBeforeCompile(Pe,x),$e=Re.acquireProgram(Pe,Ie),We.set(Ie,$e),Z.uniforms=Pe.uniforms;const De=Z.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(De.clippingPlanes=ce.uniform),ym(A,Pe),Z.needsLights=YS(A),Z.lightsStateVersion=_e,Z.needsLights&&(De.ambientLightColor.value=B.state.ambient,De.lightProbe.value=B.state.probe,De.directionalLights.value=B.state.directional,De.directionalLightShadows.value=B.state.directionalShadow,De.spotLights.value=B.state.spot,De.spotLightShadows.value=B.state.spotShadow,De.rectAreaLights.value=B.state.rectArea,De.ltc_1.value=B.state.rectAreaLTC1,De.ltc_2.value=B.state.rectAreaLTC2,De.pointLights.value=B.state.point,De.pointLightShadows.value=B.state.pointShadow,De.hemisphereLights.value=B.state.hemi,De.directionalShadowMap.value=B.state.directionalShadowMap,De.directionalShadowMatrix.value=B.state.directionalShadowMatrix,De.spotShadowMap.value=B.state.spotShadowMap,De.spotLightMatrix.value=B.state.spotLightMatrix,De.spotLightMap.value=B.state.spotLightMap,De.pointShadowMap.value=B.state.pointShadowMap,De.pointShadowMatrix.value=B.state.pointShadowMatrix),Z.currentProgram=$e,Z.uniformsList=null,$e}function xm(A){if(A.uniformsList===null){const O=A.currentProgram.getUniforms();A.uniformsList=Ro.seqWithValue(O.seq,A.uniforms)}return A.uniformsList}function ym(A,O){const q=be.get(A);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function WS(A,O,q,Z,B){O.isScene!==!0&&(O=qe),L.resetTextureUnits();const ue=O.fog,_e=Z.isMeshStandardMaterial?O.environment:null,Pe=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ot,Ie=(Z.isMeshStandardMaterial?W:w).get(Z.envMap||_e),We=Z.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,$e=!!q.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),De=!!q.morphAttributes.position,ot=!!q.morphAttributes.normal,ft=!!q.morphAttributes.color;let pt=qn;Z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(pt=x.toneMapping);const ln=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,lt=ln!==void 0?ln.length:0,Ne=be.get(Z),di=m.state.lights;if(V===!0&&(ge===!0||A!==M)){const wn=A===M&&Z.id===S;ce.setState(Z,A,wn)}let ct=!1;Z.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==di.state.version||Ne.outputColorSpace!==Pe||B.isBatchedMesh&&Ne.batching===!1||!B.isBatchedMesh&&Ne.batching===!0||B.isBatchedMesh&&Ne.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ne.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ne.instancing===!1||!B.isInstancedMesh&&Ne.instancing===!0||B.isSkinnedMesh&&Ne.skinning===!1||!B.isSkinnedMesh&&Ne.skinning===!0||B.isInstancedMesh&&Ne.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ne.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ne.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ne.instancingMorph===!1&&B.morphTexture!==null||Ne.envMap!==Ie||Z.fog===!0&&Ne.fog!==ue||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ce.numPlanes||Ne.numIntersection!==ce.numIntersection)||Ne.vertexAlphas!==We||Ne.vertexTangents!==$e||Ne.morphTargets!==De||Ne.morphNormals!==ot||Ne.morphColors!==ft||Ne.toneMapping!==pt||Ne.morphTargetsCount!==lt)&&(ct=!0):(ct=!0,Ne.__version=Z.version);let Fn=Ne.currentProgram;ct===!0&&(Fn=Fl(Z,O,B));let rr=!1,gn=!1,ca=!1;const mt=Fn.getUniforms(),Yn=Ne.uniforms;if(he.useProgram(Fn.program)&&(rr=!0,gn=!0,ca=!0),Z.id!==S&&(S=Z.id,gn=!0),rr||M!==A){he.buffers.depth.getReversed()?(de.copy(A.projectionMatrix),xg(de),yg(de),mt.setValue(I,"projectionMatrix",de)):mt.setValue(I,"projectionMatrix",A.projectionMatrix),mt.setValue(I,"viewMatrix",A.matrixWorldInverse);const Pi=mt.map.cameraPosition;Pi!==void 0&&Pi.setValue(I,He.setFromMatrixPosition(A.matrixWorld)),pe.logarithmicDepthBuffer&&mt.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&mt.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),M!==A&&(M=A,gn=!0,ca=!0)}if(B.isSkinnedMesh){mt.setOptional(I,B,"bindMatrix"),mt.setOptional(I,B,"bindMatrixInverse");const wn=B.skeleton;wn&&(wn.boneTexture===null&&wn.computeBoneTexture(),mt.setValue(I,"boneTexture",wn.boneTexture,L))}B.isBatchedMesh&&(mt.setOptional(I,B,"batchingTexture"),mt.setValue(I,"batchingTexture",B._matricesTexture,L),mt.setOptional(I,B,"batchingIdTexture"),mt.setValue(I,"batchingIdTexture",B._indirectTexture,L),mt.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&mt.setValue(I,"batchingColorTexture",B._colorsTexture,L));const ha=q.morphAttributes;if((ha.position!==void 0||ha.normal!==void 0||ha.color!==void 0)&&Ge.update(B,q,Fn),(gn||Ne.receiveShadow!==B.receiveShadow)&&(Ne.receiveShadow=B.receiveShadow,mt.setValue(I,"receiveShadow",B.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(Yn.envMap.value=Ie,Yn.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&O.environment!==null&&(Yn.envMapIntensity.value=O.environmentIntensity),gn&&(mt.setValue(I,"toneMappingExposure",x.toneMappingExposure),Ne.needsLights&&XS(Yn,ca),ue&&Z.fog===!0&&ve.refreshFogUniforms(Yn,ue),ve.refreshMaterialUniforms(Yn,Z,G,$,m.state.transmissionRenderTarget[A.id]),Ro.upload(I,xm(Ne),Yn,L)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ro.upload(I,xm(Ne),Yn,L),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&mt.setValue(I,"center",B.center),mt.setValue(I,"modelViewMatrix",B.modelViewMatrix),mt.setValue(I,"normalMatrix",B.normalMatrix),mt.setValue(I,"modelMatrix",B.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const wn=Z.uniformsGroups;for(let Pi=0,Ii=wn.length;Pi<Ii;Pi++){const _m=wn[Pi];N.update(_m,Fn),N.bind(_m,Fn)}}return Fn}function XS(A,O){A.ambientLightColor.needsUpdate=O,A.lightProbe.needsUpdate=O,A.directionalLights.needsUpdate=O,A.directionalLightShadows.needsUpdate=O,A.pointLights.needsUpdate=O,A.pointLightShadows.needsUpdate=O,A.spotLights.needsUpdate=O,A.spotLightShadows.needsUpdate=O,A.rectAreaLights.needsUpdate=O,A.hemisphereLights.needsUpdate=O}function YS(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,O,q){be.get(A.texture).__webglTexture=O,be.get(A.depthTexture).__webglTexture=q;const Z=be.get(A);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=q===void 0,Z.__autoAllocateDepthBuffer||re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,O){const q=be.get(A);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(A,O=0,q=0){R=A,b=O,T=q;let Z=!0,B=null,ue=!1,_e=!1;if(A){const Ie=be.get(A);if(Ie.__useDefaultFramebuffer!==void 0)he.bindFramebuffer(I.FRAMEBUFFER,null),Z=!1;else if(Ie.__webglFramebuffer===void 0)L.setupRenderTarget(A);else if(Ie.__hasExternalTextures)L.rebindTextures(A,be.get(A.texture).__webglTexture,be.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const De=A.depthTexture;if(Ie.__boundDepthTexture!==De){if(De!==null&&be.has(De)&&(A.width!==De.image.width||A.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(A)}}const We=A.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(_e=!0);const $e=be.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray($e[O])?B=$e[O][q]:B=$e[O],ue=!0):A.samples>0&&L.useMultisampledRTT(A)===!1?B=be.get(A).__webglMultisampledFramebuffer:Array.isArray($e)?B=$e[q]:B=$e,P.copy(A.viewport),z.copy(A.scissor),F=A.scissorTest}else P.copy(le).multiplyScalar(G).floor(),z.copy(Se).multiplyScalar(G).floor(),F=K;if(he.bindFramebuffer(I.FRAMEBUFFER,B)&&Z&&he.drawBuffers(A,B),he.viewport(P),he.scissor(z),he.setScissorTest(F),ue){const Ie=be.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ie.__webglTexture,q)}else if(_e){const Ie=be.get(A.texture),We=O||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ie.__webglTexture,q||0,We)}S=-1},this.readRenderTargetPixels=function(A,O,q,Z,B,ue,_e){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_e!==void 0&&(Pe=Pe[_e]),Pe){he.bindFramebuffer(I.FRAMEBUFFER,Pe);try{const Ie=A.texture,We=Ie.format,$e=Ie.type;if(!pe.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pe.textureTypeReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=A.width-Z&&q>=0&&q<=A.height-B&&I.readPixels(O,q,Z,B,je.convert(We),je.convert($e),ue)}finally{const Ie=R!==null?be.get(R).__webglFramebuffer:null;he.bindFramebuffer(I.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(A,O,q,Z,B,ue,_e){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_e!==void 0&&(Pe=Pe[_e]),Pe){const Ie=A.texture,We=Ie.format,$e=Ie.type;if(!pe.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pe.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=A.width-Z&&q>=0&&q<=A.height-B){he.bindFramebuffer(I.FRAMEBUFFER,Pe);const De=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,De),I.bufferData(I.PIXEL_PACK_BUFFER,ue.byteLength,I.STREAM_READ),I.readPixels(O,q,Z,B,je.convert(We),je.convert($e),0);const ot=R!==null?be.get(R).__webglFramebuffer:null;he.bindFramebuffer(I.FRAMEBUFFER,ot);const ft=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await vg(I,ft,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,De),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ue),I.deleteBuffer(De),I.deleteSync(ft),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,O=null,q=0){A.isTexture!==!0&&(Sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,A=arguments[1]);const Z=Math.pow(2,-q),B=Math.floor(A.image.width*Z),ue=Math.floor(A.image.height*Z),_e=O!==null?O.x:0,Pe=O!==null?O.y:0;L.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,q,0,0,_e,Pe,B,ue),he.unbindTexture()},this.copyTextureToTexture=function(A,O,q=null,Z=null,B=0){A.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,A=arguments[1],O=arguments[2],B=arguments[3]||0,q=null);let ue,_e,Pe,Ie,We,$e,De,ot,ft;const pt=A.isCompressedTexture?A.mipmaps[B]:A.image;q!==null?(ue=q.max.x-q.min.x,_e=q.max.y-q.min.y,Pe=q.isBox3?q.max.z-q.min.z:1,Ie=q.min.x,We=q.min.y,$e=q.isBox3?q.min.z:0):(ue=pt.width,_e=pt.height,Pe=pt.depth||1,Ie=0,We=0,$e=0),Z!==null?(De=Z.x,ot=Z.y,ft=Z.z):(De=0,ot=0,ft=0);const ln=je.convert(O.format),lt=je.convert(O.type);let Ne;O.isData3DTexture?(L.setTexture3D(O,0),Ne=I.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(L.setTexture2DArray(O,0),Ne=I.TEXTURE_2D_ARRAY):(L.setTexture2D(O,0),Ne=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const di=I.getParameter(I.UNPACK_ROW_LENGTH),ct=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Fn=I.getParameter(I.UNPACK_SKIP_PIXELS),rr=I.getParameter(I.UNPACK_SKIP_ROWS),gn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,pt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ie),I.pixelStorei(I.UNPACK_SKIP_ROWS,We),I.pixelStorei(I.UNPACK_SKIP_IMAGES,$e);const ca=A.isDataArrayTexture||A.isData3DTexture,mt=O.isDataArrayTexture||O.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const Yn=be.get(A),ha=be.get(O),wn=be.get(Yn.__renderTarget),Pi=be.get(ha.__renderTarget);he.bindFramebuffer(I.READ_FRAMEBUFFER,wn.__webglFramebuffer),he.bindFramebuffer(I.DRAW_FRAMEBUFFER,Pi.__webglFramebuffer);for(let Ii=0;Ii<Pe;Ii++)ca&&I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,be.get(A).__webglTexture,B,$e+Ii),A.isDepthTexture?(mt&&I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,be.get(O).__webglTexture,B,ft+Ii),I.blitFramebuffer(Ie,We,ue,_e,De,ot,ue,_e,I.DEPTH_BUFFER_BIT,I.NEAREST)):mt?I.copyTexSubImage3D(Ne,B,De,ot,ft+Ii,Ie,We,ue,_e):I.copyTexSubImage2D(Ne,B,De,ot,ft+Ii,Ie,We,ue,_e);he.bindFramebuffer(I.READ_FRAMEBUFFER,null),he.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else mt?A.isDataTexture||A.isData3DTexture?I.texSubImage3D(Ne,B,De,ot,ft,ue,_e,Pe,ln,lt,pt.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(Ne,B,De,ot,ft,ue,_e,Pe,ln,pt.data):I.texSubImage3D(Ne,B,De,ot,ft,ue,_e,Pe,ln,lt,pt):A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,B,De,ot,ue,_e,ln,lt,pt.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,B,De,ot,pt.width,pt.height,ln,pt.data):I.texSubImage2D(I.TEXTURE_2D,B,De,ot,ue,_e,ln,lt,pt);I.pixelStorei(I.UNPACK_ROW_LENGTH,di),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ct),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Fn),I.pixelStorei(I.UNPACK_SKIP_ROWS,rr),I.pixelStorei(I.UNPACK_SKIP_IMAGES,gn),B===0&&O.generateMipmaps&&I.generateMipmap(Ne),he.unbindTexture()},this.copyTextureToTexture3D=function(A,O,q=null,Z=null,B=0){return A.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,Z=arguments[1]||null,A=arguments[2],O=arguments[3],B=arguments[4]||0),Sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,O,q,Z,B)},this.initRenderTarget=function(A){be.get(A).__webglFramebuffer===void 0&&L.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?L.setTextureCube(A,0):A.isData3DTexture?L.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?L.setTexture2DArray(A,0):L.setTexture2D(A,0),he.unbindTexture()},this.resetState=function(){b=0,T=0,R=null,he.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}class Vs{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Y(e),this.density=t}clone(){return new Vs(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Po{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Y(e),this.near=t,this.far=n}clone(){return new Po(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ws extends it{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Pr{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xr,this.updateRanges=[],this.version=0,this.uuid=cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Jt=new C;class bi{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=$t(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ye(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=$t(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=$t(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=$t(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=$t(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array),s=Ye(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new tt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new bi(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class zc extends Lt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Xs;const Ir=new C,Ys=new C,qs=new C,Zs=new Q,Dr=new Q,Zd=new Oe,Io=new C,Ur=new C,Do=new C,Kd=new Q,Hc=new Q,$d=new Q;class jd extends it{constructor(e=new zc){if(super(),this.isSprite=!0,this.type="Sprite",Xs===void 0){Xs=new Ve;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Pr(t,5);Xs.setIndex([0,1,2,0,2,3]),Xs.setAttribute("position",new bi(n,3,0,!1)),Xs.setAttribute("uv",new bi(n,2,3,!1))}this.geometry=Xs,this.material=e,this.center=new Q(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ys.setFromMatrixScale(this.matrixWorld),Zd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),qs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ys.multiplyScalar(-qs.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const r=this.center;Uo(Io.set(-.5,-.5,0),qs,r,Ys,i,s),Uo(Ur.set(.5,-.5,0),qs,r,Ys,i,s),Uo(Do.set(.5,.5,0),qs,r,Ys,i,s),Kd.set(0,0),Hc.set(1,0),$d.set(1,1);let o=e.ray.intersectTriangle(Io,Ur,Do,!1,Ir);if(o===null&&(Uo(Ur.set(-.5,.5,0),qs,r,Ys,i,s),Hc.set(0,1),o=e.ray.intersectTriangle(Io,Do,Ur,!1,Ir),o===null))return;const l=e.ray.origin.distanceTo(Ir);l<e.near||l>e.far||t.push({distance:l,point:Ir.clone(),uv:sn.getInterpolation(Ir,Io,Ur,Do,Kd,Hc,$d,new Q),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Uo(a,e,t,n,i,s){Zs.subVectors(a,t).addScalar(.5).multiply(n),i!==void 0?(Dr.x=s*Zs.x-i*Zs.y,Dr.y=i*Zs.x+s*Zs.y):Dr.copy(Zs),a.copy(e),a.x+=Dr.x,a.y+=Dr.y,a.applyMatrix4(Zd)}const No=new C,Jd=new C;class Qd extends it{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){No.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(No);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){No.setFromMatrixPosition(e.matrixWorld),Jd.setFromMatrixPosition(this.matrixWorld);const n=No.distanceTo(Jd)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let r=t[i].distance;if(t[i].object.visible&&(r-=r*t[i].hysteresis),n>=r)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const r=n[i];t.object.levels.push({object:r.object.uuid,distance:r.distance,hysteresis:r.hysteresis})}return t}}const ef=new C,tf=new at,nf=new at,Jy=new C,sf=new Oe,Fo=new C,Gc=new Bt,rf=new Oe,Vc=new Wi;class Wc extends Le{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Gl,this.bindMatrix=new Oe,this.bindMatrixInverse=new Oe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fo),this.boundingBox.expandByPoint(Fo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Bt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fo),this.boundingSphere.expandByPoint(Fo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gc.copy(this.boundingSphere),Gc.applyMatrix4(i),e.ray.intersectsSphere(Gc)!==!1&&(rf.copy(i).invert(),Vc.copy(e.ray).applyMatrix4(rf),!(this.boundingBox!==null&&Vc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Vc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Gl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Cu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;tf.fromBufferAttribute(i.attributes.skinIndex,e),nf.fromBufferAttribute(i.attributes.skinWeight,e),ef.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const r=nf.getComponent(s);if(r!==0){const o=tf.getComponent(s);sf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Jy.copy(ef).applyMatrix4(sf),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Oo extends it{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Qt extends gt{constructor(e=null,t=1,n=1,i,s,r,o,l,c=wt,h=wt,u,d){super(null,r,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const af=new Oe,Qy=new Oe;class Nr{constructor(e=[],t=[]){this.uuid=cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Oe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Oe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){const o=e[s]?e[s].matrixWorld:Qy;af.multiplyMatrices(o,t[s]),af.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Nr(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Qt(t,e,e,vt,tn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let r=t[s];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new Oo),this.bones.push(r),this.boneInverses.push(new Oe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const r=t[i];e.bones.push(r.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class ji extends tt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ks=new Oe,of=new Oe,Bo=[],lf=new Mt,e_=new Oe,Fr=new Le,Or=new Bt;class Xc extends Le{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ji(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,e_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ks),lf.copy(e.boundingBox).applyMatrix4(Ks),this.boundingBox.union(lf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ks),Or.copy(e.boundingSphere).applyMatrix4(Ks),this.boundingSphere.union(Or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Fr.geometry=this.geometry,Fr.material=this.material,Fr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Or.copy(this.boundingSphere),Or.applyMatrix4(n),e.ray.intersectsSphere(Or)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ks),of.multiplyMatrices(n,Ks),Fr.matrixWorld=of,Fr.raycast(e,Bo);for(let r=0,o=Bo.length;r<o;r++){const l=Bo[r];l.instanceId=s,l.object=this,t.push(l)}Bo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ji(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qt(new Float32Array(i*this.count),i,this.count,Ta,tn));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function Yc(a,e){return a-e}function t_(a,e){return a.z-e.z}function n_(a,e){return e.z-a.z}class i_{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,r=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];r.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const an=new Oe,s_=new Y(1,1,1),qc=new Rr,ko=new Mt,Ji=new Bt,Br=new C,cf=new C,r_=new C,Zc=new i_,Yt=new Le,zo=[];function a_(a,e,t=0){const n=e.itemSize;if(a.isInterleavedBufferAttribute||a.array.constructor!==e.array.constructor){const i=a.count;for(let s=0;s<i;s++)for(let r=0;r<n;r++)e.setComponent(s+t,r,a.getComponent(s,r))}else e.array.set(a.array,t*n);e.needsUpdate=!0}function Qi(a,e){if(a.constructor!==e.constructor){const t=Math.min(a.length,e.length);for(let n=0;n<t;n++)e[n]=a[n]}else{const t=Math.min(a.length,e.length);e.set(new a.constructor(a.buffer,0,t))}}class hf extends Le{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(e,t,n=t*2,i){super(new Ve,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new Qt(t,e,e,vt,tn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new Qt(t,e,e,cr,Kn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new Qt(t,e,e,vt,tn);n.colorSpace=Qe.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const r=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=r,h=new o.constructor(n*l),u=new tt(h,l,c);t.setAttribute(s,u)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new tt(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,an),this.getBoundingBoxAt(s,ko).applyMatrix4(an),e.union(ko)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,an),this.getBoundingSphereAt(s,Ji).applyMatrix4(an),e.union(Ji)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Yc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;an.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const r=this._colorsTexture;return r&&(s_.toArray(r.image.data,i*4),r.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const r=e.getIndex();if(r!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?r.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Yc),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),r=t.getIndex(),o=this._geometryInfo[e];if(i&&r.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const h in n.attributes){const u=t.getAttribute(h),d=n.getAttribute(h);a_(u,d,l);const f=u.itemSize;for(let p=u.count,v=c;p<v;p++){const g=l+p;for(let m=0;m<f;m++)d.setComponent(g,m,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const h=o.indexStart,u=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let d=0;d<r.count;d++)s.setX(h+d,l+r.getX(d));for(let d=r.count,f=u;d<f;d++)s.setX(h+d,l);s.needsUpdate=!0,s.addUpdateRange(h,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?this:(t[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this)}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((r,o)=>o).sort((r,o)=>n[r].vertexStart-n[o].vertexStart),s=this.geometry;for(let r=0,o=n.length;r<o;r++){const l=i[r],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:h,vertexStart:u,reservedIndexCount:d}=c,f=s.index,p=f.array,v=e-u;for(let g=h;g<h+d;g++)p[g]=p[g]+v;f.array.copyWithin(t,h,h+d),f.addUpdateRange(t,d),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:h,reservedVertexCount:u}=c,d=s.attributes;for(const f in d){const p=d[f],{array:v,itemSize:g}=p;v.copyWithin(e*g,h*g,(h+u)*g),p.addUpdateRange(e*g,u*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart,this._nextIndexStart=s.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new Mt,r=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;r&&(h=r.getX(h)),s.expandByPoint(Br.fromBufferAttribute(o,h))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new Bt;this.getBoundingBoxAt(e,ko),ko.getCenter(s.center);const r=n.index,o=n.attributes.position;let l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;r&&(u=r.getX(u)),Br.fromBufferAttribute(o,u),l=Math.max(l,s.center.distanceToSquared(Br))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture,s=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?this:(t.toArray(s,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?null:t.fromArray(i,e*16)}setColorAt(e,t){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,s=this._instanceInfo;return e>=s.length||s[e].active===!1?this:(t.toArray(i,e*4),n.needsUpdate=!0,this)}getColorAt(e,t){const n=this._colorsTexture.image.data,i=this._instanceInfo;return e>=i.length||i[e].active===!1?null:t.fromArray(n,e*4)}setVisibleAt(e,t){const n=this._instanceInfo;return e>=n.length||n[e].active===!1||n[e].visible===t?this:(n[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?!1:t[e].visible}setGeometryIdAt(e,t){const n=this._instanceInfo,i=this._geometryInfo;return e>=n.length||n[e].active===!1||t>=i.length||i[t].active===!1?null:(n[e].geometryIndex=t,this)}getGeometryIdAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?-1:t[e].geometryIndex}getGeometryRangeAt(e,t={}){if(e<0||e>=this._geometryCount)return null;const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Yc);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);Qi(this._multiDrawCounts,i),Qi(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const r=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;r.dispose(),this._initIndirectTexture(),Qi(r.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),Qi(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Qi(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Ve,this._initializeGeometry(s));const r=this.geometry;s.index&&Qi(s.index.array,r.index.array);for(const o in s.attributes)Qi(s.attributes[o].array,r.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,r=this.geometry;Yt.material=this.material,Yt.geometry.index=r.index,Yt.geometry.attributes=r.attributes,Yt.geometry.boundingBox===null&&(Yt.geometry.boundingBox=new Mt),Yt.geometry.boundingSphere===null&&(Yt.geometry.boundingSphere=new Bt);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,h=i[c];Yt.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(o,Yt.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,Yt.geometry.boundingBox),this.getBoundingSphereAt(c,Yt.geometry.boundingSphere),Yt.raycast(e,zo);for(let u=0,d=zo.length;u<d;u++){const f=zo[u];f.object=this,f.batchId=o,t.push(f)}zo.length=0}Yt.material=null,Yt.geometry.index=null,Yt.geometry.attributes={},Yt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const r=i.getIndex(),o=r===null?1:r.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,p=f.image.data;d&&(an.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),qc.setFromProjectionMatrix(an,e.coordinateSystem));let v=0;if(this.sortObjects){an.copy(this.matrixWorld).invert(),Br.setFromMatrixPosition(n.matrixWorld).applyMatrix4(an),cf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(an);for(let y=0,_=l.length;y<_;y++)if(l[y].visible&&l[y].active){const x=l[y].geometryIndex;this.getMatrixAt(y,an),this.getBoundingSphereAt(x,Ji).applyMatrix4(an);let E=!1;if(d&&(E=!qc.intersectsSphere(Ji)),!E){const b=u[x],T=r_.subVectors(Ji.center,Br).dot(cf);Zc.push(b.start,b.count,T,y)}}const g=Zc.list,m=this.customSort;m===null?g.sort(s.transparent?n_:t_):m.call(this,g,n);for(let y=0,_=g.length;y<_;y++){const x=g[y];c[v]=x.start*o,h[v]=x.count,p[v]=x.index,v++}Zc.reset()}else for(let g=0,m=l.length;g<m;g++)if(l[g].visible&&l[g].active){const y=l[g].geometryIndex;let _=!1;if(d&&(this.getMatrixAt(g,an),this.getBoundingSphereAt(y,Ji).applyMatrix4(an),_=!qc.intersectsSphere(Ji)),!_){const x=u[y];c[v]=x.start*o,h[v]=x.count,p[v]=g,v++}}f.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,r){this.onBeforeRender(e,null,i,s,r)}}class qt extends Lt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Y(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ho=new C,Go=new C,uf=new Oe,kr=new Wi,Vo=new Bt,Kc=new C,df=new C;class ai extends it{constructor(e=new Ve,t=new qt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Ho.fromBufferAttribute(t,i-1),Go.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ho.distanceTo(Go);e.setAttribute("lineDistance",new Ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(i),Vo.radius+=s,e.ray.intersectsSphere(Vo)===!1)return;uf.copy(i).invert(),kr.copy(e.ray).applyMatrix4(uf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=h.getX(v),y=h.getX(v+1),_=Wo(this,e,kr,l,m,y);_&&t.push(_)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=Wo(this,e,kr,l,v,g);m&&t.push(m)}}else{const f=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=Wo(this,e,kr,l,v,v+1);m&&t.push(m)}if(this.isLineLoop){const v=Wo(this,e,kr,l,p-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Wo(a,e,t,n,i,s){const r=a.geometry.attributes.position;if(Ho.fromBufferAttribute(r,i),Go.fromBufferAttribute(r,s),t.distanceSqToSegment(Ho,Go,Kc,df)>n)return;Kc.applyMatrix4(a.matrixWorld);const l=e.ray.origin.distanceTo(Kc);if(!(l<e.near||l>e.far))return{distance:l,point:df.clone().applyMatrix4(a.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:a}}const ff=new C,pf=new C;class In extends ai{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)ff.fromBufferAttribute(t,i),pf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ff.distanceTo(pf);e.setAttribute("lineDistance",new Ce(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $c extends ai{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class zr extends Lt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const mf=new Oe,jc=new Wi,Xo=new Bt,Yo=new C;class qo extends it{constructor(e=new Ve,t=new zr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xo.copy(n.boundingSphere),Xo.applyMatrix4(i),Xo.radius+=s,e.ray.intersectsSphere(Xo)===!1)return;mf.copy(i).invert(),jc.copy(e.ray).applyMatrix4(mf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let p=d,v=f;p<v;p++){const g=c.getX(p);Yo.fromBufferAttribute(u,g),gf(Yo,g,l,i,e,t,this)}}else{const d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let p=d,v=f;p<v;p++)Yo.fromBufferAttribute(u,p),gf(Yo,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function gf(a,e,t,n,i,s,r){const o=jc.distanceSqToPoint(a);if(o<t){const l=new C;jc.closestPointToPoint(a,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class o_ extends gt{constructor(e,t,n,i,s,r,o,l,c){super(e,t,n,i,s,r,o,l,c),this.isVideoTexture=!0,this.minFilter=r!==void 0?r:Je,this.magFilter=s!==void 0?s:Je,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class l_ extends gt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=wt,this.minFilter=wt,this.generateMipmaps=!1,this.needsUpdate=!0}}class Zo extends gt{constructor(e,t,n,i,s,r,o,l,c,h,u,d){super(null,r,o,l,c,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class c_ extends Zo{constructor(e,t,n,i,s,r){super(e,t,n,s,r),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Et,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class h_ extends Zo{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Zn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class vf extends gt{constructor(e,t,n,i,s,r,o,l,c){super(e,t,n,i,s,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let r;t?r=t:r=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-r,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(r-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const r=this.getPoint(i),o=this.getPoint(s),l=t||(r.isVector2?new Q:new C);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new C,i=[],s=[],r=[],o=new C,l=new Oe;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new C)}s[0]=new C,r[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),r[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(_t(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}r[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(_t(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),r[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ko extends Dn{constructor(e=0,t=0,n=1,i=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Q){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(r?s=0:s=i),this.aClockwise===!0&&!r&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class xf extends Ko{constructor(e,t,n,i,s,r){super(e,t,n,n,i,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Jc(){let a=0,e=0,t=0,n=0;function i(s,r,o,l){a=s,e=o,t=-3*s+3*r-2*o-l,n=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){i(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,h,u){let d=(r-s)/c-(o-s)/(c+h)+(o-r)/h,f=(o-r)/h-(l-r)/(h+u)+(l-o)/u;d*=h,f*=h,i(r,o,d,f)},calc:function(s){const r=s*s,o=r*s;return a+e*s+t*r+n*o}}}const $o=new C,Qc=new Jc,eh=new Jc,th=new Jc;class yf extends Dn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){const n=t,i=this.points,s=i.length,r=(s-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:($o.subVectors(i[0],i[1]).add(i[0]),c=$o);const u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:($o.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=$o),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Qc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,v,g),eh.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,v,g),th.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(Qc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),eh.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),th.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Qc.calc(l),eh.calc(l),th.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function _f(a,e,t,n,i){const s=(n-e)*.5,r=(i-t)*.5,o=a*a,l=a*o;return(2*t-2*n+s+r)*l+(-3*t+3*n-2*s-r)*o+s*a+t}function u_(a,e){const t=1-a;return t*t*e}function d_(a,e){return 2*(1-a)*a*e}function f_(a,e){return a*a*e}function Hr(a,e,t,n){return u_(a,e)+d_(a,t)+f_(a,n)}function p_(a,e){const t=1-a;return t*t*t*e}function m_(a,e){const t=1-a;return 3*t*t*a*e}function g_(a,e){return 3*(1-a)*a*a*e}function v_(a,e){return a*a*a*e}function Gr(a,e,t,n,i){return p_(a,e)+m_(a,t)+g_(a,n)+v_(a,i)}class nh extends Dn{constructor(e=new Q,t=new Q,n=new Q,i=new Q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Q){const n=t,i=this.v0,s=this.v1,r=this.v2,o=this.v3;return n.set(Gr(e,i.x,s.x,r.x,o.x),Gr(e,i.y,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mf extends Dn{constructor(e=new C,t=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,r=this.v2,o=this.v3;return n.set(Gr(e,i.x,s.x,r.x,o.x),Gr(e,i.y,s.y,r.y,o.y),Gr(e,i.z,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ih extends Dn{constructor(e=new Q,t=new Q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Q){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sf extends Dn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sh extends Dn{constructor(e=new Q,t=new Q,n=new Q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Q){const n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(Hr(e,i.x,s.x,r.x),Hr(e,i.y,s.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rh extends Dn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(Hr(e,i.x,s.x,r.x),Hr(e,i.y,s.y,r.y),Hr(e,i.z,s.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ah extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Q){const n=t,i=this.points,s=(i.length-1)*e,r=Math.floor(s),o=s-r,l=i[r===0?r:r-1],c=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(_f(o,l.x,c.x,h.x,u.x),_f(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new Q().fromArray(i))}return this}}var jo=Object.freeze({__proto__:null,ArcCurve:xf,CatmullRomCurve3:yf,CubicBezierCurve:nh,CubicBezierCurve3:Mf,EllipseCurve:Ko,LineCurve:ih,LineCurve3:Sf,QuadraticBezierCurve:sh,QuadraticBezierCurve3:rh,SplineCurve:ah});class bf extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const r=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const r=s[i],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new jo[i.type]().fromJSON(i))}return this}}class Vr extends bf{constructor(e){super(),this.type="Path",this.currentPoint=new Q,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ih(this.currentPoint.clone(),new Q(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new sh(this.currentPoint.clone(),new Q(e,t),new Q(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,r){const o=new nh(this.currentPoint.clone(),new Q(e,t),new Q(n,i),new Q(s,r));return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new ah(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,r),this}absarc(e,t,n,i,s,r){return this.absellipse(e,t,n,n,i,s,r),this}ellipse(e,t,n,i,s,r,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,r,o,l),this}absellipse(e,t,n,i,s,r,o,l){const c=new Ko(e,t,n,i,s,r,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Wr extends Ve{constructor(e=[new Q(0,-.5),new Q(.5,0),new Q(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=_t(i,0,Math.PI*2);const s=[],r=[],o=[],l=[],c=[],h=1/t,u=new C,d=new Q,f=new C,p=new C,v=new C;let g=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(p)}for(let y=0;y<=t;y++){const _=n+y*h*i,x=Math.sin(_),E=Math.cos(_);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*E,r.push(u.x,u.y,u.z),d.x=y/t,d.y=b/(e.length-1),o.push(d.x,d.y);const T=l[3*b+0]*x,R=l[3*b+1],S=l[3*b+0]*E;c.push(T,R,S)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){const x=_+y*e.length,E=x,b=x+e.length,T=x+e.length+1,R=x+1;s.push(E,b,R),s.push(T,R,b)}this.setIndex(s),this.setAttribute("position",new Ce(r,3)),this.setAttribute("uv",new Ce(o,2)),this.setAttribute("normal",new Ce(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.points,e.segments,e.phiStart,e.phiLength)}}class Jo extends Wr{constructor(e=1,t=1,n=4,i=8){const s=new Vr;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Jo(e.radius,e.length,e.capSegments,e.radialSegments)}}class Qo extends Ve{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],r=[],o=[],l=[],c=new C,h=new Q;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(r[d]/e+1)/2,h.y=(r[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ce(r,3)),this.setAttribute("normal",new Ce(o,3)),this.setAttribute("uv",new Ce(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class wi extends Ve{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const v=[],g=n/2;let m=0;y(),r===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ce(u,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(f,2));function y(){const x=new C,E=new C;let b=0;const T=(t-e)/n;for(let R=0;R<=s;R++){const S=[],M=R/s,P=M*(t-e)+e;for(let z=0;z<=i;z++){const F=z/i,k=F*l+o,H=Math.sin(k),U=Math.cos(k);E.x=P*H,E.y=-M*n+g,E.z=P*U,u.push(E.x,E.y,E.z),x.set(H,T,U).normalize(),d.push(x.x,x.y,x.z),f.push(F,1-M),S.push(p++)}v.push(S)}for(let R=0;R<i;R++)for(let S=0;S<s;S++){const M=v[S][R],P=v[S+1][R],z=v[S+1][R+1],F=v[S][R+1];(e>0||S!==0)&&(h.push(M,P,F),b+=3),(t>0||S!==s-1)&&(h.push(P,z,F),b+=3)}c.addGroup(m,b,0),m+=b}function _(x){const E=p,b=new Q,T=new C;let R=0;const S=x===!0?e:t,M=x===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),p++;const P=p;for(let z=0;z<=i;z++){const k=z/i*l+o,H=Math.cos(k),U=Math.sin(k);T.x=S*U,T.y=g*M,T.z=S*H,u.push(T.x,T.y,T.z),d.push(0,M,0),b.x=H*.5+.5,b.y=U*.5*M+.5,f.push(b.x,b.y),p++}for(let z=0;z<i;z++){const F=E+z,k=P+z;x===!0?h.push(k,k+1,F):h.push(k+1,k,F),R+=3}c.addGroup(m,R,x===!0?1:2),m+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xr extends wi{constructor(e=1,t=1,n=32,i=1,s=!1,r=0,o=Math.PI*2){super(0,e,t,n,i,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Xr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ti extends Ve{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],r=[];o(i),c(n),h(),this.setAttribute("position",new Ce(s,3)),this.setAttribute("normal",new Ce(s.slice(),3)),this.setAttribute("uv",new Ce(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const _=new C,x=new C,E=new C;for(let b=0;b<t.length;b+=3)f(t[b+0],_),f(t[b+1],x),f(t[b+2],E),l(_,x,E,y)}function l(y,_,x,E){const b=E+1,T=[];for(let R=0;R<=b;R++){T[R]=[];const S=y.clone().lerp(x,R/b),M=_.clone().lerp(x,R/b),P=b-R;for(let z=0;z<=P;z++)z===0&&R===b?T[R][z]=S:T[R][z]=S.clone().lerp(M,z/P)}for(let R=0;R<b;R++)for(let S=0;S<2*(b-R)-1;S++){const M=Math.floor(S/2);S%2===0?(d(T[R][M+1]),d(T[R+1][M]),d(T[R][M])):(d(T[R][M+1]),d(T[R+1][M+1]),d(T[R+1][M]))}}function c(y){const _=new C;for(let x=0;x<s.length;x+=3)_.x=s[x+0],_.y=s[x+1],_.z=s[x+2],_.normalize().multiplyScalar(y),s[x+0]=_.x,s[x+1]=_.y,s[x+2]=_.z}function h(){const y=new C;for(let _=0;_<s.length;_+=3){y.x=s[_+0],y.y=s[_+1],y.z=s[_+2];const x=g(y)/2/Math.PI+.5,E=m(y)/Math.PI+.5;r.push(x,1-E)}p(),u()}function u(){for(let y=0;y<r.length;y+=6){const _=r[y+0],x=r[y+2],E=r[y+4],b=Math.max(_,x,E),T=Math.min(_,x,E);b>.9&&T<.1&&(_<.2&&(r[y+0]+=1),x<.2&&(r[y+2]+=1),E<.2&&(r[y+4]+=1))}}function d(y){s.push(y.x,y.y,y.z)}function f(y,_){const x=y*3;_.x=e[x+0],_.y=e[x+1],_.z=e[x+2]}function p(){const y=new C,_=new C,x=new C,E=new C,b=new Q,T=new Q,R=new Q;for(let S=0,M=0;S<s.length;S+=9,M+=6){y.set(s[S+0],s[S+1],s[S+2]),_.set(s[S+3],s[S+4],s[S+5]),x.set(s[S+6],s[S+7],s[S+8]),b.set(r[M+0],r[M+1]),T.set(r[M+2],r[M+3]),R.set(r[M+4],r[M+5]),E.copy(y).add(_).add(x).divideScalar(3);const P=g(E);v(b,M+0,y,P),v(T,M+2,_,P),v(R,M+4,x,P)}}function v(y,_,x,E){E<0&&y.x===1&&(r[_]=y.x-1),x.x===0&&x.z===0&&(r[_]=E/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.vertices,e.indices,e.radius,e.details)}}class el extends Ti{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new el(e.radius,e.detail)}}const tl=new C,nl=new C,oh=new C,il=new sn;class wf extends Ve{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(zi*t),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){r?(c[0]=r.getX(p),c[1]=r.getX(p+1),c[2]=r.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:v,b:g,c:m}=il;if(v.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),il.getNormal(oh),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){const _=(y+1)%3,x=u[y],E=u[_],b=il[h[y]],T=il[h[_]],R=`${x}_${E}`,S=`${E}_${x}`;S in d&&d[S]?(oh.dot(d[S].normal)<=s&&(f.push(b.x,b.y,b.z),f.push(T.x,T.y,T.z)),d[S]=null):R in d||(d[R]={index0:c[y],index1:c[_],normal:oh.clone()})}}for(const p in d)if(d[p]){const{index0:v,index1:g}=d[p];tl.fromBufferAttribute(o,v),nl.fromBufferAttribute(o,g),f.push(tl.x,tl.y,tl.z),f.push(nl.x,nl.y,nl.z)}this.setAttribute("position",new Ce(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class es extends Vr{constructor(e){super(e),this.uuid=cn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Vr().fromJSON(i))}return this}}const x_={triangulate:function(a,e,t=2){const n=e&&e.length,i=n?e[0]*t:a.length;let s=Tf(a,0,i,t,!0);const r=[];if(!s||s.next===s.prev)return r;let o,l,c,h,u,d,f;if(n&&(s=b_(a,e,s,t)),a.length>80*t){o=c=a[0],l=h=a[1];for(let p=t;p<i;p+=t)u=a[p],d=a[p+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return Yr(s,r,t,o,l,f,0),r}};function Tf(a,e,t,n,i){let s,r;if(i===U_(a,e,t,n)>0)for(s=e;s<t;s+=n)r=Cf(s,a[s],a[s+1],r);else for(s=t-n;s>=e;s-=n)r=Cf(s,a[s],a[s+1],r);return r&&sl(r,r.next)&&(Zr(r),r=r.next),r}function ts(a,e){if(!a)return a;e||(e=a);let t=a,n;do if(n=!1,!t.steiner&&(sl(t,t.next)||yt(t.prev,t,t.next)===0)){if(Zr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Yr(a,e,t,n,i,s,r){if(!a)return;!r&&s&&C_(a,n,i,s);let o=a,l,c;for(;a.prev!==a.next;){if(l=a.prev,c=a.next,s?__(a,n,i,s):y_(a)){e.push(l.i/t|0),e.push(a.i/t|0),e.push(c.i/t|0),Zr(a),a=c.next,o=c.next;continue}if(a=c,a===o){r?r===1?(a=M_(ts(a),e,t),Yr(a,e,t,n,i,s,2)):r===2&&S_(a,e,t,n,i,s):Yr(ts(a),e,t,n,i,s,1);break}}}function y_(a){const e=a.prev,t=a,n=a.next;if(yt(e,t,n)>=0)return!1;const i=e.x,s=t.x,r=n.x,o=e.y,l=t.y,c=n.y,h=i<s?i<r?i:r:s<r?s:r,u=o<l?o<c?o:c:l<c?l:c,d=i>s?i>r?i:r:s>r?s:r,f=o>l?o>c?o:c:l>c?l:c;let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&$s(i,o,s,l,r,c,p.x,p.y)&&yt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function __(a,e,t,n){const i=a.prev,s=a,r=a.next;if(yt(i,s,r)>=0)return!1;const o=i.x,l=s.x,c=r.x,h=i.y,u=s.y,d=r.y,f=o<l?o<c?o:c:l<c?l:c,p=h<u?h<d?h:d:u<d?u:d,v=o>l?o>c?o:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,m=lh(f,p,e,t,n),y=lh(v,g,e,t,n);let _=a.prevZ,x=a.nextZ;for(;_&&_.z>=m&&x&&x.z<=y;){if(_.x>=f&&_.x<=v&&_.y>=p&&_.y<=g&&_!==i&&_!==r&&$s(o,h,l,u,c,d,_.x,_.y)&&yt(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==r&&$s(o,h,l,u,c,d,x.x,x.y)&&yt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=m;){if(_.x>=f&&_.x<=v&&_.y>=p&&_.y<=g&&_!==i&&_!==r&&$s(o,h,l,u,c,d,_.x,_.y)&&yt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==r&&$s(o,h,l,u,c,d,x.x,x.y)&&yt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function M_(a,e,t){let n=a;do{const i=n.prev,s=n.next.next;!sl(i,s)&&Af(i,n,n.next,s)&&qr(i,s)&&qr(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Zr(n),Zr(n.next),n=a=s),n=n.next}while(n!==a);return ts(n)}function S_(a,e,t,n,i,s){let r=a;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&P_(r,o)){let l=Ef(r,o);r=ts(r,r.next),l=ts(l,l.next),Yr(r,e,t,n,i,s,0),Yr(l,e,t,n,i,s,0);return}o=o.next}r=r.next}while(r!==a)}function b_(a,e,t,n){const i=[];let s,r,o,l,c;for(s=0,r=e.length;s<r;s++)o=e[s]*n,l=s<r-1?e[s+1]*n:a.length,c=Tf(a,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(L_(c));for(i.sort(w_),s=0;s<i.length;s++)t=T_(i[s],t);return t}function w_(a,e){return a.x-e.x}function T_(a,e){const t=A_(a,e);if(!t)return e;const n=Ef(t,a);return ts(n,n.next),ts(t,t.next)}function A_(a,e){let t=e,n=-1/0,i;const s=a.x,r=a.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,u;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&$s(r<c?s:n,r,l,c,r<c?n:s,r,t.x,t.y)&&(u=Math.abs(r-t.y)/(s-t.x),qr(t,a)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&E_(i,t)))&&(i=t,h=u)),t=t.next;while(t!==o);return i}function E_(a,e){return yt(a.prev,a,e.prev)<0&&yt(e.next,a,a.next)<0}function C_(a,e,t,n){let i=a;do i.z===0&&(i.z=lh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==a);i.prevZ.nextZ=null,i.prevZ=null,R_(i)}function R_(a){let e,t,n,i,s,r,o,l,c=1;do{for(t=a,a=null,s=null,r=0;t;){for(r++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:a=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(r>1);return a}function lh(a,e,t,n,i){return a=(a-t)*i|0,e=(e-n)*i|0,a=(a|a<<8)&16711935,a=(a|a<<4)&252645135,a=(a|a<<2)&858993459,a=(a|a<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,a|e<<1}function L_(a){let e=a,t=a;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==a);return t}function $s(a,e,t,n,i,s,r,o){return(i-r)*(e-o)>=(a-r)*(s-o)&&(a-r)*(n-o)>=(t-r)*(e-o)&&(t-r)*(s-o)>=(i-r)*(n-o)}function P_(a,e){return a.next.i!==e.i&&a.prev.i!==e.i&&!I_(a,e)&&(qr(a,e)&&qr(e,a)&&D_(a,e)&&(yt(a.prev,a,e.prev)||yt(a,e.prev,e))||sl(a,e)&&yt(a.prev,a,a.next)>0&&yt(e.prev,e,e.next)>0)}function yt(a,e,t){return(e.y-a.y)*(t.x-e.x)-(e.x-a.x)*(t.y-e.y)}function sl(a,e){return a.x===e.x&&a.y===e.y}function Af(a,e,t,n){const i=al(yt(a,e,t)),s=al(yt(a,e,n)),r=al(yt(t,n,a)),o=al(yt(t,n,e));return!!(i!==s&&r!==o||i===0&&rl(a,t,e)||s===0&&rl(a,n,e)||r===0&&rl(t,a,n)||o===0&&rl(t,e,n))}function rl(a,e,t){return e.x<=Math.max(a.x,t.x)&&e.x>=Math.min(a.x,t.x)&&e.y<=Math.max(a.y,t.y)&&e.y>=Math.min(a.y,t.y)}function al(a){return a>0?1:a<0?-1:0}function I_(a,e){let t=a;do{if(t.i!==a.i&&t.next.i!==a.i&&t.i!==e.i&&t.next.i!==e.i&&Af(t,t.next,a,e))return!0;t=t.next}while(t!==a);return!1}function qr(a,e){return yt(a.prev,a,a.next)<0?yt(a,e,a.next)>=0&&yt(a,a.prev,e)>=0:yt(a,e,a.prev)<0||yt(a,a.next,e)<0}function D_(a,e){let t=a,n=!1;const i=(a.x+e.x)/2,s=(a.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==a);return n}function Ef(a,e){const t=new ch(a.i,a.x,a.y),n=new ch(e.i,e.x,e.y),i=a.next,s=e.prev;return a.next=e,e.prev=a,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Cf(a,e,t,n){const i=new ch(a,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Zr(a){a.next.prev=a.prev,a.prev.next=a.next,a.prevZ&&(a.prevZ.nextZ=a.nextZ),a.nextZ&&(a.nextZ.prevZ=a.prevZ)}function ch(a,e,t){this.i=a,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function U_(a,e,t,n){let i=0;for(let s=e,r=t-n;s<t;s+=n)i+=(a[r]-a[s])*(a[s+1]+a[r+1]),r=s;return i}class Gn{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return Gn.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];Rf(e),Lf(n,e);let r=e.length;t.forEach(Rf);for(let l=0;l<t.length;l++)i.push(r),r+=t[l].length,Lf(n,t[l]);const o=x_.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Rf(a){const e=a.length;e>2&&a[e-1].equals(a[0])&&a.pop()}function Lf(a,e){for(let t=0;t<e.length;t++)a.push(e[t].x),a.push(e[t].y)}class ol extends Ve{constructor(e=new es([new Q(.5,.5),new Q(-.5,.5),new Q(-.5,-.5),new Q(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];r(c)}this.setAttribute("position",new Ce(i,3)),this.setAttribute("uv",new Ce(s,2)),this.computeVertexNormals();function r(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:N_;let _,x=!1,E,b,T,R;m&&(_=m.getSpacedPoints(h),x=!0,d=!1,E=m.computeFrenetFrames(h,!1),b=new C,T=new C,R=new C),d||(g=0,f=0,p=0,v=0);const S=o.extractPoints(c);let M=S.shape;const P=S.holes;if(!Gn.isClockWise(M)){M=M.reverse();for(let ne=0,ae=P.length;ne<ae;ne++){const I=P[ne];Gn.isClockWise(I)&&(P[ne]=I.reverse())}}const F=Gn.triangulateShape(M,P),k=M;for(let ne=0,ae=P.length;ne<ae;ne++){const I=P[ne];M=M.concat(I)}function H(ne,ae,I){return ae||console.error("THREE.ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(ae,I)}const U=M.length,$=F.length;function G(ne,ae,I){let Ee,re,pe;const he=ne.x-ae.x,Be=ne.y-ae.y,be=I.x-ne.x,L=I.y-ne.y,w=he*he+Be*Be,W=he*L-Be*be;if(Math.abs(W)>Number.EPSILON){const ee=Math.sqrt(w),se=Math.sqrt(be*be+L*L),te=ae.x-Be/ee,Re=ae.y+he/ee,ve=I.x-L/se,we=I.y+be/se,nt=((ve-te)*L-(we-Re)*be)/(he*L-Be*be);Ee=te+he*nt-ne.x,re=Re+Be*nt-ne.y;const ce=Ee*Ee+re*re;if(ce<=2)return new Q(Ee,re);pe=Math.sqrt(ce/2)}else{let ee=!1;he>Number.EPSILON?be>Number.EPSILON&&(ee=!0):he<-Number.EPSILON?be<-Number.EPSILON&&(ee=!0):Math.sign(Be)===Math.sign(L)&&(ee=!0),ee?(Ee=-Be,re=he,pe=Math.sqrt(w)):(Ee=he,re=Be,pe=Math.sqrt(w/2))}return new Q(Ee/pe,re/pe)}const J=[];for(let ne=0,ae=k.length,I=ae-1,Ee=ne+1;ne<ae;ne++,I++,Ee++)I===ae&&(I=0),Ee===ae&&(Ee=0),J[ne]=G(k[ne],k[I],k[Ee]);const oe=[];let le,Se=J.concat();for(let ne=0,ae=P.length;ne<ae;ne++){const I=P[ne];le=[];for(let Ee=0,re=I.length,pe=re-1,he=Ee+1;Ee<re;Ee++,pe++,he++)pe===re&&(pe=0),he===re&&(he=0),le[Ee]=G(I[Ee],I[pe],I[he]);oe.push(le),Se=Se.concat(le)}for(let ne=0;ne<g;ne++){const ae=ne/g,I=f*Math.cos(ae*Math.PI/2),Ee=p*Math.sin(ae*Math.PI/2)+v;for(let re=0,pe=k.length;re<pe;re++){const he=H(k[re],J[re],Ee);de(he.x,he.y,-I)}for(let re=0,pe=P.length;re<pe;re++){const he=P[re];le=oe[re];for(let Be=0,be=he.length;Be<be;Be++){const L=H(he[Be],le[Be],Ee);de(L.x,L.y,-I)}}}const K=p+v;for(let ne=0;ne<U;ne++){const ae=d?H(M[ne],Se[ne],K):M[ne];x?(T.copy(E.normals[0]).multiplyScalar(ae.x),b.copy(E.binormals[0]).multiplyScalar(ae.y),R.copy(_[0]).add(T).add(b),de(R.x,R.y,R.z)):de(ae.x,ae.y,0)}for(let ne=1;ne<=h;ne++)for(let ae=0;ae<U;ae++){const I=d?H(M[ae],Se[ae],K):M[ae];x?(T.copy(E.normals[ne]).multiplyScalar(I.x),b.copy(E.binormals[ne]).multiplyScalar(I.y),R.copy(_[ne]).add(T).add(b),de(R.x,R.y,R.z)):de(I.x,I.y,u/h*ne)}for(let ne=g-1;ne>=0;ne--){const ae=ne/g,I=f*Math.cos(ae*Math.PI/2),Ee=p*Math.sin(ae*Math.PI/2)+v;for(let re=0,pe=k.length;re<pe;re++){const he=H(k[re],J[re],Ee);de(he.x,he.y,u+I)}for(let re=0,pe=P.length;re<pe;re++){const he=P[re];le=oe[re];for(let Be=0,be=he.length;Be<be;Be++){const L=H(he[Be],le[Be],Ee);x?de(L.x,L.y+_[h-1].y,_[h-1].x+I):de(L.x,L.y,u+I)}}}X(),V();function X(){const ne=i.length/3;if(d){let ae=0,I=U*ae;for(let Ee=0;Ee<$;Ee++){const re=F[Ee];Ue(re[2]+I,re[1]+I,re[0]+I)}ae=h+g*2,I=U*ae;for(let Ee=0;Ee<$;Ee++){const re=F[Ee];Ue(re[0]+I,re[1]+I,re[2]+I)}}else{for(let ae=0;ae<$;ae++){const I=F[ae];Ue(I[2],I[1],I[0])}for(let ae=0;ae<$;ae++){const I=F[ae];Ue(I[0]+U*h,I[1]+U*h,I[2]+U*h)}}n.addGroup(ne,i.length/3-ne,0)}function V(){const ne=i.length/3;let ae=0;ge(k,ae),ae+=k.length;for(let I=0,Ee=P.length;I<Ee;I++){const re=P[I];ge(re,ae),ae+=re.length}n.addGroup(ne,i.length/3-ne,1)}function ge(ne,ae){let I=ne.length;for(;--I>=0;){const Ee=I;let re=I-1;re<0&&(re=ne.length-1);for(let pe=0,he=h+g*2;pe<he;pe++){const Be=U*pe,be=U*(pe+1),L=ae+Ee+Be,w=ae+re+Be,W=ae+re+be,ee=ae+Ee+be;He(L,w,W,ee)}}}function de(ne,ae,I){l.push(ne),l.push(ae),l.push(I)}function Ue(ne,ae,I){Fe(ne),Fe(ae),Fe(I);const Ee=i.length/3,re=y.generateTopUV(n,i,Ee-3,Ee-2,Ee-1);qe(re[0]),qe(re[1]),qe(re[2])}function He(ne,ae,I,Ee){Fe(ne),Fe(ae),Fe(Ee),Fe(ae),Fe(I),Fe(Ee);const re=i.length/3,pe=y.generateSideWallUV(n,i,re-6,re-3,re-2,re-1);qe(pe[0]),qe(pe[1]),qe(pe[3]),qe(pe[1]),qe(pe[2]),qe(pe[3])}function Fe(ne){i.push(l[ne*3+0]),i.push(l[ne*3+1]),i.push(l[ne*3+2])}function qe(ne){s.push(ne.x),s.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return F_(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new jo[i.type]().fromJSON(i)),new ol(n,e.options)}}const N_={generateTopUV:function(a,e,t,n,i){const s=e[t*3],r=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new Q(s,r),new Q(o,l),new Q(c,h)]},generateSideWallUV:function(a,e,t,n,i,s){const r=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],p=e[i*3+2],v=e[s*3],g=e[s*3+1],m=e[s*3+2];return Math.abs(o-h)<Math.abs(r-c)?[new Q(r,1-l),new Q(c,1-u),new Q(d,1-p),new Q(v,1-m)]:[new Q(o,1-l),new Q(h,1-u),new Q(f,1-p),new Q(g,1-m)]}};function F_(a,e,t){if(t.shapes=[],Array.isArray(a))for(let n=0,i=a.length;n<i;n++){const s=a[n];t.shapes.push(s.uuid)}else t.shapes.push(a.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ll extends Ti{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ll(e.radius,e.detail)}}class Kr extends Ti{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Kr(e.radius,e.detail)}}class $r extends Ve{constructor(e=.5,t=1,n=32,i=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new C,p=new Q;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=s+g/n*r;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const y=m+g,_=y,x=y+n+1,E=y+n+2,b=y+1;o.push(_,x,b),o.push(x,E,b)}}this.setIndex(o),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(c,3)),this.setAttribute("uv",new Ce(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class cl extends Ve{constructor(e=new es([new Q(0,.5),new Q(-.5,-.5),new Q(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ce(i,3)),this.setAttribute("normal",new Ce(s,3)),this.setAttribute("uv",new Ce(r,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const p=d.holes;Gn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const y=p[g];Gn.isClockWise(y)===!0&&(p[g]=y.reverse())}const v=Gn.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const y=p[g];f=f.concat(y)}for(let g=0,m=f.length;g<m;g++){const y=f[g];i.push(y.x,y.y,0),s.push(0,0,1),r.push(y.x,y.y)}for(let g=0,m=v.length;g<m;g++){const y=v[g],_=y[0]+u,x=y[1]+u,E=y[2]+u;n.push(_,x,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return O_(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const r=t[e.shapes[i]];n.push(r)}return new cl(n,e.curveSegments)}}function O_(a,e){if(e.shapes=[],Array.isArray(a))for(let t=0,n=a.length;t<n;t++){const i=a[t];e.shapes.push(i.uuid)}else e.shapes.push(a.uuid);return e}class Ut extends Ve{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+o,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const y=[],_=m/n;let x=0;m===0&&r===0?x=.5/t:m===n&&l===Math.PI&&(x=-.5/t);for(let E=0;E<=t;E++){const b=E/t;u.x=-e*Math.cos(i+b*s)*Math.sin(r+_*o),u.y=e*Math.cos(r+_*o),u.z=e*Math.sin(i+b*s)*Math.sin(r+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(b+x,1-_),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<t;y++){const _=h[m][y+1],x=h[m][y],E=h[m+1][y],b=h[m+1][y+1];(m!==0||r>0)&&f.push(_,x,b),(m!==n-1||l<Math.PI)&&f.push(x,E,b)}this.setIndex(f),this.setAttribute("position",new Ce(p,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ut(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class hl extends Ti{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new hl(e.radius,e.detail)}}class ul extends Ve{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const r=[],o=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(v),u.y=(e+t*Math.cos(g))*Math.sin(v),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,y=(i+1)*f+p;r.push(v,g,y),r.push(g,m,y)}this.setIndex(r),this.setAttribute("position",new Ce(o,3)),this.setAttribute("normal",new Ce(l,3)),this.setAttribute("uv",new Ce(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ul(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class dl extends Ve{constructor(e=1,t=.4,n=64,i=8,s=2,r=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:r},n=Math.floor(n),i=Math.floor(i);const o=[],l=[],c=[],h=[],u=new C,d=new C,f=new C,p=new C,v=new C,g=new C,m=new C;for(let _=0;_<=n;++_){const x=_/n*s*Math.PI*2;y(x,s,r,e,f),y(x+.01,s,r,e,p),g.subVectors(p,f),m.addVectors(p,f),v.crossVectors(g,m),m.crossVectors(v,g),v.normalize(),m.normalize();for(let E=0;E<=i;++E){const b=E/i*Math.PI*2,T=-t*Math.cos(b),R=t*Math.sin(b);u.x=f.x+(T*m.x+R*v.x),u.y=f.y+(T*m.y+R*v.y),u.z=f.z+(T*m.z+R*v.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(_/n),h.push(E/i)}}for(let _=1;_<=n;_++)for(let x=1;x<=i;x++){const E=(i+1)*(_-1)+(x-1),b=(i+1)*_+(x-1),T=(i+1)*_+x,R=(i+1)*(_-1)+x;o.push(E,b,R),o.push(b,T,R)}this.setIndex(o),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(c,3)),this.setAttribute("uv",new Ce(h,2));function y(_,x,E,b,T){const R=Math.cos(_),S=Math.sin(_),M=E/x*_,P=Math.cos(M);T.x=b*(2+P)*.5*R,T.y=b*(2+P)*S*.5,T.z=b*Math.sin(M)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dl(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class fl extends Ve{constructor(e=new rh(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const r=e.computeFrenetFrames(t,s);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const o=new C,l=new C,c=new Q;let h=new C;const u=[],d=[],f=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new Ce(u,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(f,2));function v(){for(let _=0;_<t;_++)g(_);g(s===!1?t:0),y(),m()}function g(_){h=e.getPointAt(_/t,h);const x=r.normals[_],E=r.binormals[_];for(let b=0;b<=i;b++){const T=b/i*Math.PI*2,R=Math.sin(T),S=-Math.cos(T);l.x=S*x.x+R*E.x,l.y=S*x.y+R*E.y,l.z=S*x.z+R*E.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let _=1;_<=t;_++)for(let x=1;x<=i;x++){const E=(i+1)*(_-1)+(x-1),b=(i+1)*_+(x-1),T=(i+1)*_+x,R=(i+1)*(_-1)+x;p.push(E,b,R),p.push(b,T,R)}}function y(){for(let _=0;_<=t;_++)for(let x=0;x<=i;x++)c.x=_/t,c.y=x/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new fl(new jo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Pf extends Ve{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new C,s=new C;if(e.index!==null){const r=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,f=u.count;for(let p=d,v=d+f;p<v;p+=3)for(let g=0;g<3;g++){const m=o.getX(p+g),y=o.getX(p+(g+1)%3);i.fromBufferAttribute(r,m),s.fromBufferAttribute(r,y),If(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const r=e.attributes.position;for(let o=0,l=r.count/3;o<l;o++)for(let c=0;c<3;c++){const h=3*o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(r,h),s.fromBufferAttribute(r,u),If(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ce(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function If(a,e,t){const n=`${a.x},${a.y},${a.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${a.x},${a.y},${a.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var Df=Object.freeze({__proto__:null,BoxGeometry:Mn,CapsuleGeometry:Jo,CircleGeometry:Qo,ConeGeometry:Xr,CylinderGeometry:wi,DodecahedronGeometry:el,EdgesGeometry:wf,ExtrudeGeometry:ol,IcosahedronGeometry:ll,LatheGeometry:Wr,OctahedronGeometry:Kr,PlaneGeometry:Ln,PolyhedronGeometry:Ti,RingGeometry:$r,ShapeGeometry:cl,SphereGeometry:Ut,TetrahedronGeometry:hl,TorusGeometry:ul,TorusKnotGeometry:dl,TubeGeometry:fl,WireframeGeometry:Pf});class Uf extends Lt{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new Y(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Nf extends Xt{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class fn extends Lt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Y(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jn,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sn extends fn{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Q(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return _t(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Y(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Y(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Y(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Ff extends Lt{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new Y(16777215),this.specular=new Y(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jn,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=ar,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Of extends Lt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Y(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jn,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class pl extends Lt{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jn,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Bf extends Lt{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jn,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=ar,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kf extends Lt{static get type(){return"MeshMatcapMaterial"}constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new Y(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jn,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class zf extends qt{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function ns(a,e,t){return!a||!t&&a.constructor===e?a:typeof e.BYTES_PER_ELEMENT=="number"?new e(a):Array.prototype.slice.call(a)}function Hf(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}function Gf(a){function e(i,s){return a[i]-a[s]}const t=a.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function hh(a,e,t){const n=a.length,i=new a.constructor(n);for(let s=0,r=0;r!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[r++]=a[o+l]}return i}function uh(a,e,t,n){let i=1,s=a[0];for(;s!==void 0&&s[n]===void 0;)s=a[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push.apply(t,r)),s=a[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=a[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=a[i++];while(s!==void 0)}function B_(a,e,t,n,i=30){const s=a.clone();s.name=e;const r=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*i;if(!(p<t||p>=n)){u.push(c.times[f]);for(let v=0;v<h;++v)d.push(c.values[f*h+v])}}u.length!==0&&(c.times=ns(u,c.times.constructor),c.values=ns(d,c.values.constructor),r.push(c))}s.tracks=r;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function k_(a,e=0,t=a,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let r=0;r<i;++r){const o=t.tracks[r],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=a.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=o.times.length-1;let v;if(s<=o.times[0]){const m=h,y=u-h;v=o.values.slice(m,y)}else if(s>=o.times[p]){const m=p*u+h,y=m+u-h;v=o.values.slice(m,y)}else{const m=o.createInterpolant(),y=h,_=u-h;m.evaluate(s),v=m.resultBuffer.slice(y,_)}l==="quaternion"&&new Vt().fromArray(v).normalize().conjugate().toArray(v);const g=c.times.length;for(let m=0;m<g;++m){const y=m*f+d;if(l==="quaternion")Vt.multiplyQuaternionsFlat(c.values,y,v,0,c.values,y);else{const _=f-d*2;for(let x=0;x<_;++x)c.values[y+x]-=v[x]}}}return a.blendMode=Jl,a}const z_={convertArray:ns,isTypedArray:Hf,getKeyframeOrder:Gf,sortedArray:hh,flattenJSON:uh,subclip:B_,makeClipAdditive:k_};class js{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let r;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}r=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}r=n,n=0;break n}break e}for(;n<r;){const o=n+r>>>1;e<t[o]?r=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Vf extends js{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Oi,endingEnd:Oi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,r=e+1,o=i[s],l=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case Bi:s=e,o=2*t-n;break;case gr:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Bi:r=e,l=2*n-t;break;case gr:r=1,l=n+i[1]-i[0];break;default:r=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,g=v*p,m=-d*g+2*d*v-d*p,y=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*p+1,_=(-1-f)*g+(1.5+f)*v+.5*p,x=f*g-f*v;for(let E=0;E!==o;++E)s[E]=m*r[h+E]+y*r[c+E]+_*r[l+E]+x*r[u+E];return s}}class dh extends js{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=r[c+d]*u+r[l+d]*h;return s}}class Wf extends js{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Un{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ns(t,this.TimeBufferType),this.values=ns(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ns(e.times,Array),values:ns(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Wf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new dh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Vf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ms:t=this.InterpolantFactoryMethodDiscrete;break;case Ss:t=this.InterpolantFactoryMethodLinear;break;case to:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ms;case this.InterpolantFactoryMethodLinear:return Ss;case this.InterpolantFactoryMethodSmooth:return to}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);const o=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),e=!1;break}r=l}if(i!==void 0&&Hf(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===to,s=e.length-1;let r=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const v=t[u+p];if(v!==t[d+p]||v!==t[f+p]){l=!0;break}}}if(l){if(o!==r){e[r]=e[o];const u=o*n,d=r*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++r}}if(s>0){e[r]=e[s];for(let o=s*n,l=r*n,c=0;c!==n;++c)t[l+c]=t[o+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Un.prototype.TimeBufferType=Float32Array,Un.prototype.ValueBufferType=Float32Array,Un.prototype.DefaultInterpolation=Ss;class is extends Un{constructor(e,t,n){super(e,t,n)}}is.prototype.ValueTypeName="bool",is.prototype.ValueBufferType=Array,is.prototype.DefaultInterpolation=Ms,is.prototype.InterpolantFactoryMethodLinear=void 0,is.prototype.InterpolantFactoryMethodSmooth=void 0;class fh extends Un{}fh.prototype.ValueTypeName="color";class ss extends Un{}ss.prototype.ValueTypeName="number";class Xf extends js{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Vt.slerpFlat(s,0,r,c-o,r,c,l);return s}}class rs extends Un{InterpolantFactoryMethodLinear(e){return new Xf(this.times,this.values,this.getValueSize(),e)}}rs.prototype.ValueTypeName="quaternion",rs.prototype.InterpolantFactoryMethodSmooth=void 0;class as extends Un{constructor(e,t,n){super(e,t,n)}}as.prototype.ValueTypeName="string",as.prototype.ValueBufferType=Array,as.prototype.DefaultInterpolation=Ms,as.prototype.InterpolantFactoryMethodLinear=void 0,as.prototype.InterpolantFactoryMethodSmooth=void 0;class os extends Un{}os.prototype.ValueTypeName="vector";class Js{constructor(e="",t=-1,n=[],i=no){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=cn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,o=n.length;r!==o;++r)t.push(G_(n[r]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,r=n.length;s!==r;++s)t.push(Un.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,r=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=Gf(l);l=hh(l,1,h),c=hh(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),r.push(new ss(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const r=[];for(const o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return r}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,v){if(f.length!==0){const g=[],m=[];uh(f,g,m,p),g.length!==0&&v.push(new u(d,g,m))}},i=[],s=e.name||"default",r=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let v=0;v<d[p].morphTargets.length;v++)f[d[p].morphTargets[v]]=-1;for(const v in f){const g=[],m=[];for(let y=0;y!==d[p].morphTargets.length;++y){const _=d[p];g.push(_.time),m.push(_.morphTarget===v?1:0)}i.push(new ss(".morphTargetInfluence["+v+"]",g,m))}l=f.length*r}else{const f=".bones["+t[u].name+"]";n(os,f+".position",d,"pos",i),n(rs,f+".quaternion",d,"rot",i),n(os,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function H_(a){switch(a.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ss;case"vector":case"vector2":case"vector3":case"vector4":return os;case"color":return fh;case"quaternion":return rs;case"bool":case"boolean":return is;case"string":return as}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+a)}function G_(a){if(a.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=H_(a.type);if(a.times===void 0){const t=[],n=[];uh(a.keys,t,n,"value"),a.times=t,a.values=n}return e.parse!==void 0?e.parse(a):new e(a.name,a.times,a.values,a.interpolation)}const oi={enabled:!1,files:{},add:function(a,e){this.enabled!==!1&&(this.files[a]=e)},get:function(a){if(this.enabled!==!1)return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}};class ph{constructor(e,t,n){const i=this;let s=!1,r=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,r,o),s=!0},this.itemEnd=function(h){r++,i.onProgress!==void 0&&i.onProgress(h,r,o),r===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const Yf=new ph;class Zt{constructor(e){this.manager=e!==void 0?e:Yf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Zt.DEFAULT_MATERIAL_NAME="__DEFAULT";const li={};class V_ extends Error{constructor(e,t){super(e),this.response=t}}class pn extends Zt{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=oi.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(li[e]!==void 0){li[e].push({onLoad:t,onProgress:n,onError:i});return}li[e]=[],li[e].push({onLoad:t,onProgress:n,onError:i});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=li[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let v=0;const g=new ReadableStream({start(m){y();function y(){u.read().then(({done:_,value:x})=>{if(_)m.close();else{v+=x.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:f});for(let b=0,T=h.length;b<T;b++){const R=h[b];R.onProgress&&R.onProgress(E)}m.enqueue(x),y()}},_=>{m.error(_)})}}});return new Response(g)}else throw new V_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{oi.add(e,c);const h=li[e];delete li[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=li[e];if(h===void 0)throw this.manager.itemError(e),c;delete li[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class W_ extends Zt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new pn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=Js.parse(e[n]);t.push(i)}return t}}class X_ extends Zt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=[],o=new Zo,l=new pn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function h(u){l.load(e[u],function(d){const f=s.parse(d,!0);r[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Je),o.image=r,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let u=0,d=e.length;u<d;++u)h(u);else l.load(e,function(u){const d=s.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let p=0;p<f;p++){r[p]={mipmaps:[]};for(let v=0;v<d.mipmapCount;v++)r[p].mipmaps.push(d.mipmaps[p*d.mipmapCount+v]),r[p].format=d.format,r[p].width=d.width,r[p].height=d.height}o.image=r}else o.image.width=d.width,o.image.height=d.height,o.mipmaps=d.mipmaps;d.mipmapCount===1&&(o.minFilter=Je),o.format=d.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}}class jr extends Zt{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=oi.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const o=Mr("img");function l(){h(),oi.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Y_ extends Zt{constructor(e){super(e)}load(e,t,n,i){const s=new Cr;s.colorSpace=xt;const r=new jr(this.manager);r.setCrossOrigin(this.crossOrigin),r.setPath(this.path);let o=0;function l(c){r.load(e[c],function(h){s.images[c]=h,o++,o===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class q_ extends Zt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new Qt,o=new pn(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?r.image=c.image:c.data!==void 0&&(r.image.width=c.width,r.image.height=c.height,r.image.data=c.data),r.wrapS=c.wrapS!==void 0?c.wrapS:Et,r.wrapT=c.wrapT!==void 0?c.wrapT:Et,r.magFilter=c.magFilter!==void 0?c.magFilter:Je,r.minFilter=c.minFilter!==void 0?c.minFilter:Je,r.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(r.colorSpace=c.colorSpace),c.flipY!==void 0&&(r.flipY=c.flipY),c.format!==void 0&&(r.format=c.format),c.type!==void 0&&(r.type=c.type),c.mipmaps!==void 0&&(r.mipmaps=c.mipmaps,r.minFilter=xn),c.mipmapCount===1&&(r.minFilter=Je),c.generateMipmaps!==void 0&&(r.generateMipmaps=c.generateMipmaps),r.needsUpdate=!0,t&&t(r,c)},n,i),r}}class qf extends Zt{constructor(e){super(e)}load(e,t,n,i){const s=new gt,r=new jr(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Ai extends it{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Y(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ml extends Ai{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const mh=new Oe,Zf=new C,Kf=new C;class gh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Q(512,512),this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rr,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Zf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zf),Kf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kf),t.updateMatrixWorld(),mh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(mh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Z_ extends gh{constructor(){super(new Rt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=bs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Jr extends Ai{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new Z_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const $f=new Oe,Qr=new C,vh=new C;class K_ extends gh{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Q(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Qr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Qr),vh.copy(n.position),vh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(vh),n.updateMatrixWorld(),i.makeTranslation(-Qr.x,-Qr.y,-Qr.z),$f.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($f)}}class on extends Ai{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new K_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class $_ extends gh{constructor(){super(new ks(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vn extends Ai{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.shadow=new $_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class xh extends Ai{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class jf extends Ai{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class Jf{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new C)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,r=this.coefficients;return t.copy(r[0]).multiplyScalar(.282095),t.addScaledVector(r[1],.488603*i),t.addScaledVector(r[2],.488603*s),t.addScaledVector(r[3],.488603*n),t.addScaledVector(r[4],1.092548*(n*i)),t.addScaledVector(r[5],1.092548*(i*s)),t.addScaledVector(r[6],.315392*(3*s*s-1)),t.addScaledVector(r[7],1.092548*(n*s)),t.addScaledVector(r[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,r=this.coefficients;return t.copy(r[0]).multiplyScalar(.886227),t.addScaledVector(r[1],1.023328*i),t.addScaledVector(r[2],1.023328*s),t.addScaledVector(r[3],1.023328*n),t.addScaledVector(r[4],.858086*n*i),t.addScaledVector(r[5],.858086*i*s),t.addScaledVector(r[6],.743125*s*s-.247708),t.addScaledVector(r[7],.858086*n*s),t.addScaledVector(r[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Qf extends Ai{constructor(e=new Jf,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class gl extends Zt{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,r=new pn(s.manager);r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const r=e.uniforms[s];switch(i.uniforms[s]={},r.type){case"t":i.uniforms[s].value=n(r.value);break;case"c":i.uniforms[s].value=new Y().setHex(r.value);break;case"v2":i.uniforms[s].value=new Q().fromArray(r.value);break;case"v3":i.uniforms[s].value=new C().fromArray(r.value);break;case"v4":i.uniforms[s].value=new at().fromArray(r.value);break;case"m3":i.uniforms[s].value=new Xe().fromArray(r.value);break;case"m4":i.uniforms[s].value=new Oe().fromArray(r.value);break;default:i.uniforms[s].value=r.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new Q().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new Q().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return gl.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:Uf,SpriteMaterial:zc,RawShaderMaterial:Nf,ShaderMaterial:Xt,PointsMaterial:zr,MeshPhysicalMaterial:Sn,MeshStandardMaterial:fn,MeshPhongMaterial:Ff,MeshToonMaterial:Of,MeshNormalMaterial:pl,MeshLambertMaterial:Bf,MeshDepthMaterial:Fc,MeshDistanceMaterial:Oc,MeshBasicMaterial:Pt,MeshMatcapMaterial:kf,LineDashedMaterial:zf,LineBasicMaterial:qt,Material:Lt};return new t[e]}}class Ei{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ep extends Ve{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class tp extends Zt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new pn(s.manager);r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];const g=f.interleavedBuffers[p],m=s(f,g.buffer),y=ws(g.type,m),_=new Pr(y,g.stride);return _.uuid=g.uuid,t[p]=_,_}function s(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const r=e.isInstancedBufferGeometry?new ep:new Ve,o=e.data.index;if(o!==void 0){const f=ws(o.type,o.array);r.setIndex(new tt(f,1))}const l=e.data.attributes;for(const f in l){const p=l[f];let v;if(p.isInterleavedBufferAttribute){const g=i(e.data,p.data);v=new bi(g,p.itemSize,p.offset,p.normalized)}else{const g=ws(p.type,p.array),m=p.isInstancedBufferAttribute?ji:tt;v=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(v.name=p.name),p.usage!==void 0&&v.setUsage(p.usage),r.setAttribute(f,v)}const c=e.data.morphAttributes;if(c)for(const f in c){const p=c[f],v=[];for(let g=0,m=p.length;g<m;g++){const y=p[g];let _;if(y.isInterleavedBufferAttribute){const x=i(e.data,y.data);_=new bi(x,y.itemSize,y.offset,y.normalized)}else{const x=ws(y.type,y.array);_=new tt(x,y.itemSize,y.normalized)}y.name!==void 0&&(_.name=y.name),v.push(_)}r.morphAttributes[f]=v}e.data.morphTargetsRelative&&(r.morphTargetsRelative=!0);const u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let f=0,p=u.length;f!==p;++f){const v=u[f];r.addGroup(v.start,v.count,v.materialIndex)}const d=e.data.boundingSphere;if(d!==void 0){const f=new C;d.center!==void 0&&f.fromArray(d.center),r.boundingSphere=new Bt(f,d.radius)}return e.name&&(r.name=e.name),e.userData&&(r.userData=e.userData),r}}class j_ extends Zt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=this.path===""?Ei.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||r;const o=new pn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+e+".",u.message);return}const h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),console.error("THREE.ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?Ei.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new pn(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const r=await s.loadAsync(e,t),o=JSON.parse(r),l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),r=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,r),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,s,l,o,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let u=!1;for(const d in r)if(r[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),r=this.parseTextures(e.textures,s),o=this.parseMaterials(e.materials,r),l=this.parseObject(e.object,i,o,r,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new es().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,r=e.length;s<r;s++){const o=new Nr().fromJSON(e[s],i);n[o.uuid]=o}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new tp;for(let s=0,r=e.length;s<r;s++){let o;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in Df?o=Df[l.type].fromJSON(l,t):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new gl;s.setTextures(t);for(let r=0,o=e.length;r<o;r++){const l=e[r];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=Js.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function r(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){const c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return r(h)}else return l.data?{data:ws(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new ph(t);s=new jr(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){const u=e[c],d=u.url;if(Array.isArray(d)){const f=[];for(let p=0,v=d.length;p<v;p++){const g=d[p],m=o(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new Qt(m.data,m.width,m.height)))}i[u.uuid]=new Hi(f)}else{const f=o(u.url);i[u.uuid]=new Hi(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(r){if(typeof r=="string"){const o=r,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return r.data?{data:ws(r.type,r.data),width:r.width,height:r.height}:null}if(e!==void 0&&e.length>0){i=new jr(this.manager),i.setCrossOrigin(this.crossOrigin);for(let r=0,o=e.length;r<o;r++){const l=e[r],c=l.url;if(Array.isArray(c)){const h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=await s(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new Qt(p.data,p.width,p.height)))}n[l.uuid]=new Hi(h)}else{const h=await s(l.url);n[l.uuid]=new Hi(h)}}}return n}parseTextures(e,t){function n(s,r){return typeof s=="number"?s:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",s),r[s])}const i={};if(e!==void 0)for(let s=0,r=e.length;s<r;s++){const o=e[s];o.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",o.image);const l=t[o.image],c=l.data;let h;Array.isArray(c)?(h=new Cr,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new Qt:h=new gt,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=o.uuid,o.name!==void 0&&(h.name=o.name),o.mapping!==void 0&&(h.mapping=n(o.mapping,J_)),o.channel!==void 0&&(h.channel=o.channel),o.offset!==void 0&&h.offset.fromArray(o.offset),o.repeat!==void 0&&h.repeat.fromArray(o.repeat),o.center!==void 0&&h.center.fromArray(o.center),o.rotation!==void 0&&(h.rotation=o.rotation),o.wrap!==void 0&&(h.wrapS=n(o.wrap[0],np),h.wrapT=n(o.wrap[1],np)),o.format!==void 0&&(h.format=o.format),o.internalFormat!==void 0&&(h.internalFormat=o.internalFormat),o.type!==void 0&&(h.type=o.type),o.colorSpace!==void 0&&(h.colorSpace=o.colorSpace),o.minFilter!==void 0&&(h.minFilter=n(o.minFilter,ip)),o.magFilter!==void 0&&(h.magFilter=n(o.magFilter,ip)),o.anisotropy!==void 0&&(h.anisotropy=o.anisotropy),o.flipY!==void 0&&(h.flipY=o.flipY),o.generateMipmaps!==void 0&&(h.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(h.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(h.compareFunction=o.compareFunction),o.userData!==void 0&&(h.userData=o.userData),i[o.uuid]=h}return i}parseObject(e,t,n,i,s){let r;function o(d){return t[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let p=0,v=d.length;p<v;p++){const g=d[p];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(e.type){case"Scene":r=new Ws,e.background!==void 0&&(Number.isInteger(e.background)?r.background=new Y(e.background):r.background=c(e.background)),e.environment!==void 0&&(r.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?r.fog=new Po(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(r.fog=new Vs(e.fog.color,e.fog.density)),e.fog.name!==""&&(r.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(r.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(r.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&r.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(r.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&r.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":r=new Rt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(r.focus=e.focus),e.zoom!==void 0&&(r.zoom=e.zoom),e.filmGauge!==void 0&&(r.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(r.filmOffset=e.filmOffset),e.view!==void 0&&(r.view=Object.assign({},e.view));break;case"OrthographicCamera":r=new ks(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(r.zoom=e.zoom),e.view!==void 0&&(r.view=Object.assign({},e.view));break;case"AmbientLight":r=new xh(e.color,e.intensity);break;case"DirectionalLight":r=new Vn(e.color,e.intensity),r.target=e.target||"";break;case"PointLight":r=new on(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":r=new jf(e.color,e.intensity,e.width,e.height);break;case"SpotLight":r=new Jr(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),r.target=e.target||"";break;case"HemisphereLight":r=new ml(e.color,e.groundColor,e.intensity);break;case"LightProbe":r=new Qf().fromJSON(e);break;case"SkinnedMesh":h=o(e.geometry),u=l(e.material),r=new Wc(h,u),e.bindMode!==void 0&&(r.bindMode=e.bindMode),e.bindMatrix!==void 0&&r.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(r.skeleton=e.skeleton);break;case"Mesh":h=o(e.geometry),u=l(e.material),r=new Le(h,u);break;case"InstancedMesh":h=o(e.geometry),u=l(e.material);const d=e.count,f=e.instanceMatrix,p=e.instanceColor;r=new Xc(h,u,d),r.instanceMatrix=new ji(new Float32Array(f.array),16),p!==void 0&&(r.instanceColor=new ji(new Float32Array(p.array),p.itemSize));break;case"BatchedMesh":h=o(e.geometry),u=l(e.material),r=new hf(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,u),r.geometry=h,r.perObjectFrustumCulled=e.perObjectFrustumCulled,r.sortObjects=e.sortObjects,r._drawRanges=e.drawRanges,r._reservedRanges=e.reservedRanges,r._visibility=e.visibility,r._active=e.active,r._bounds=e.bounds.map(v=>{const g=new Mt;g.min.fromArray(v.boxMin),g.max.fromArray(v.boxMax);const m=new Bt;return m.radius=v.sphereRadius,m.center.fromArray(v.sphereCenter),{boxInitialized:v.boxInitialized,box:g,sphereInitialized:v.sphereInitialized,sphere:m}}),r._maxInstanceCount=e.maxInstanceCount,r._maxVertexCount=e.maxVertexCount,r._maxIndexCount=e.maxIndexCount,r._geometryInitialized=e.geometryInitialized,r._geometryCount=e.geometryCount,r._matricesTexture=c(e.matricesTexture.uuid),e.colorsTexture!==void 0&&(r._colorsTexture=c(e.colorsTexture.uuid));break;case"LOD":r=new Qd;break;case"Line":r=new ai(o(e.geometry),l(e.material));break;case"LineLoop":r=new $c(o(e.geometry),l(e.material));break;case"LineSegments":r=new In(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":r=new qo(o(e.geometry),l(e.material));break;case"Sprite":r=new jd(l(e.material));break;case"Group":r=new kt;break;case"Bone":r=new Oo;break;default:r=new it}if(r.uuid=e.uuid,e.name!==void 0&&(r.name=e.name),e.matrix!==void 0?(r.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(r.matrixAutoUpdate=e.matrixAutoUpdate),r.matrixAutoUpdate&&r.matrix.decompose(r.position,r.quaternion,r.scale)):(e.position!==void 0&&r.position.fromArray(e.position),e.rotation!==void 0&&r.rotation.fromArray(e.rotation),e.quaternion!==void 0&&r.quaternion.fromArray(e.quaternion),e.scale!==void 0&&r.scale.fromArray(e.scale)),e.up!==void 0&&r.up.fromArray(e.up),e.castShadow!==void 0&&(r.castShadow=e.castShadow),e.receiveShadow!==void 0&&(r.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(r.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(r.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(r.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(r.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&r.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(r.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(r.visible=e.visible),e.frustumCulled!==void 0&&(r.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(r.renderOrder=e.renderOrder),e.userData!==void 0&&(r.userData=e.userData),e.layers!==void 0&&(r.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)r.add(this.parseObject(d[f],t,n,i,s))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const p=d[f];r.animations.push(s[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(r.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const p=d[f],v=r.getObjectByProperty("uuid",p.object);v!==void 0&&r.addLevel(v,p.distance,p.hysteresis)}}return r}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new it}})}}const J_={UVMapping:_a,CubeReflectionMapping:Zn,CubeRefractionMapping:pi,EquirectangularReflectionMapping:or,EquirectangularRefractionMapping:lr,CubeUVReflectionMapping:vs},np={RepeatWrapping:Tn,ClampToEdgeWrapping:Et,MirroredRepeatWrapping:xs},ip={NearestFilter:wt,NearestMipmapNearestFilter:Ma,NearestMipmapLinearFilter:Ni,LinearFilter:Je,LinearMipmapNearestFilter:ys,LinearMipmapLinearFilter:xn};class sp extends Zt{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=oi.get(e);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return oi.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),oi.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});oi.add(e,l),s.manager.itemStart(e)}}let vl;class yh{static getContext(){return vl===void 0&&(vl=new(window.AudioContext||window.webkitAudioContext)),vl}static setContext(e){vl=e}}class Q_ extends Zt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new pn(this.manager);r.setResponseType("arraybuffer"),r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(l){try{const c=l.slice(0);yh.getContext().decodeAudioData(c,function(u){t(u)}).catch(o)}catch(c){o(c)}},n,i);function o(l){i?i(l):console.error(l),s.manager.itemError(e)}}}const rp=new Oe,ap=new Oe,ls=new Oe;class eM{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Rt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Rt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,ls.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,r=t.near*Math.tan(zi*t.fov*.5)/t.zoom;let o,l;ap.elements[12]=-i,rp.elements[12]=i,o=-r*t.aspect+s,l=r*t.aspect+s,ls.elements[0]=2*t.near/(l-o),ls.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(ls),o=-r*t.aspect-s,l=r*t.aspect-s,ls.elements[0]=2*t.near/(l-o),ls.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(ls)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(ap),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(rp)}}class op{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=lp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=lp();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function lp(){return performance.now()}const cs=new C,cp=new Vt,tM=new C,hs=new C;class nM extends it{constructor(){super(),this.type="AudioListener",this.context=yh.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new op}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(cs,cp,tM),hs.set(0,0,-1).applyQuaternion(cp),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(cs.x,i),t.positionY.linearRampToValueAtTime(cs.y,i),t.positionZ.linearRampToValueAtTime(cs.z,i),t.forwardX.linearRampToValueAtTime(hs.x,i),t.forwardY.linearRampToValueAtTime(hs.y,i),t.forwardZ.linearRampToValueAtTime(hs.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(cs.x,cs.y,cs.z),t.setOrientation(hs.x,hs.y,hs.z,n.x,n.y,n.z)}}class hp extends it{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const us=new C,up=new Vt,iM=new C,ds=new C;class sM extends hp{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(us,up,iM),ds.set(0,0,1).applyQuaternion(up);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(us.x,n),t.positionY.linearRampToValueAtTime(us.y,n),t.positionZ.linearRampToValueAtTime(us.z,n),t.orientationX.linearRampToValueAtTime(ds.x,n),t.orientationY.linearRampToValueAtTime(ds.y,n),t.orientationZ.linearRampToValueAtTime(ds.z,n)}else t.setPosition(us.x,us.y,us.z),t.setOrientation(ds.x,ds.y,ds.z)}}class rM{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class dp{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,r;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,r=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,r=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,r=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=r,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let r=this.cumulativeWeight;if(r===0){for(let o=0;o!==i;++o)n[s+o]=n[o];r=t}else{r+=t;const o=t/r;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=r}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}r>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,r=i;s!==r;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let r=0;r!==s;++r)e[t+r]=e[n+r]}_slerp(e,t,n,i){Vt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const r=this._workIndex*s;Vt.multiplyQuaternionsFlat(e,r,e,t,e,n),Vt.slerpFlat(e,t,e,t,e,r,i)}_lerp(e,t,n,i,s){const r=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*r+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let r=0;r!==s;++r){const o=t+r;e[o]=e[o]+e[n+r]*i}}}const _h="\\[\\]\\.:\\/",aM=new RegExp("["+_h+"]","g"),Mh="[^"+_h+"]",oM="[^"+_h.replace("\\.","")+"]",lM=/((?:WC+[\/:])*)/.source.replace("WC",Mh),cM=/(WCOD+)?/.source.replace("WCOD",oM),hM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mh),uM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mh),dM=new RegExp("^"+lM+cM+hM+uM+"$"),fM=["material","materials","bones","map"];class pM{constructor(e,t,n){const i=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class st{constructor(e,t,n){this.path=t,this.parsedPath=n||st.parseTrackName(t),this.node=st.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new st.Composite(e,t,n):new st(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(aM,"")}static parseTrackName(e){const t=dM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);fM.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let r=0;r<s.length;r++){const o=s[r];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=st.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[i];if(r===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}st.Composite=pM,st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray],st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class mM{constructor(){this.isAnimationObjectGroup=!0,this.uuid=cn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,r=s.length;let o,l=e.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(d);for(let v=0,g=r;v!==g;++v)s[v].push(new st(d,n[v],i[v]))}else if(p<c){o=e[p];const v=--c,g=e[v];t[g.uuid]=p,e[p]=g,t[f]=v,e[v]=d;for(let m=0,y=r;m!==y;++m){const _=s[m],x=_[v];let E=_[p];_[p]=x,E===void 0&&(E=new st(d,n[m],i[m])),_[v]=E}}else e[p]!==o&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let r=0,o=arguments.length;r!==o;++r){const l=arguments[r],c=l.uuid,h=t[c];if(h!==void 0&&h>=s){const u=s++,d=e[u];t[d.uuid]=h,e[h]=d,t[c]=u,e[u]=l;for(let f=0,p=i;f!==p;++f){const v=n[f],g=v[u],m=v[h];v[h]=g,v[u]=m}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,r=e.length;for(let o=0,l=arguments.length;o!==l;++o){const c=arguments[o],h=c.uuid,u=t[h];if(u!==void 0)if(delete t[h],u<s){const d=--s,f=e[d],p=--r,v=e[p];t[f.uuid]=u,e[u]=f,t[v.uuid]=d,e[d]=v,e.pop();for(let g=0,m=i;g!==m;++g){const y=n[g],_=y[d],x=y[p];y[u]=_,y[d]=x,y.pop()}}else{const d=--r,f=e[d];d>0&&(t[f.uuid]=u),e[u]=f,e.pop();for(let p=0,v=i;p!==v;++p){const g=n[p];g[u]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const r=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=s.length,n[e]=i,r.push(e),o.push(t),s.push(u);for(let d=h,f=l.length;d!==f;++d){const p=l[d];u[d]=new st(p,e,t)}return u}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,r=this._bindings,o=r.length-1,l=r[o],c=e[o];t[c]=n,r[n]=l,r.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class fp{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,r=s.length,o=new Array(r),l={endingStart:Oi,endingEnd:Oi};for(let c=0;c!==r;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=mr,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,r=s/i,o=i/s;e.warp(1,r,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,r=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/r,c[1]=t/r,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const r=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Jl:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulateAdditive(o);break;case no:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const r=n===Ru;if(e===0)return s===-1?i:r&&(s&1)===1?t-i:i;if(n===eo){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,r)):this._setEndings(this.repetitions===0,!0,r)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,r)}else this._setEndings(!1,!1,r);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(r&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Bi,i.endingEnd=Bi):(e?i.endingStart=this.zeroSlopeAtStart?Bi:Oi:i.endingStart=gr,t?i.endingEnd=this.zeroSlopeAtEnd?Bi:Oi:i.endingEnd=gr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let r=this._weightInterpolant;r===null&&(r=i._lendControlInterpolant(),this._weightInterpolant=r);const o=r.parameterPositions,l=r.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const gM=new Float32Array(1);class pp extends Hn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,r=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,r[u]=p;else{if(p=r[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const v=t&&t._propertyBindings[u].binding.parsedPath;p=new dp(st.create(n,f,v),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),r[u]=p}o[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let r=s[t];if(r===void 0)r={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=r;else{const o=r.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),r.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,r=this._actionsByClip,o=r[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete r[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let r=i[t];r===void 0&&(r={},i[t]=r),r[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,r=this._bindingsByRootAndName,o=r[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete r[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new dh(new Float32Array(2),new Float32Array(2),1,gM),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let r=typeof e=="string"?Js.findByName(i,e):e;const o=r!==null?r.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(r!==null?n=r.blendMode:n=no),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],r===null&&(r=c._clip)}if(r===null)return null;const h=new fp(this,r,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Js.findByName(n,e):e,r=s?s.uuid:e,o=this._actionsByClip[r];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),r=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,r);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(r);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const r=s.knownActions;for(let o=0,l=r.length;o!==l;++o){const c=r[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const r in n){const o=n[r].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const r in s){const o=s[r];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Sh{constructor(e){this.value=e}clone(){return new Sh(this.value.clone===void 0?this.value:this.value.clone())}}let vM=0;class xM extends Hn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:vM++}),this.name="",this.usage=xr,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let r=0;r<s.length;r++)this.uniforms.push(s[r].clone())}return this}clone(){return new this.constructor().copy(this)}}class yM extends Pr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class _M{constructor(e,t,n,i,s){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const mp=new Oe;class gp{constructor(e,t,n=0,i=1/0){this.ray=new Wi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new uo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return mp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mp),this}intersectObject(e,t=!0,n=[]){return bh(e,this,n,t),n.sort(vp),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)bh(e[i],this,n,t);return n.sort(vp),n}}function vp(a,e){return a.distance-e.distance}function bh(a,e,t,n){let i=!0;if(a.layers.test(e.layers)&&a.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=a.children;for(let r=0,o=s.length;r<o;r++)bh(s[r],e,t,!0)}}class MM{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(_t(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class SM{constructor(e=1,t=0,n=0){return this.radius=e,this.theta=t,this.y=n,this}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}class wh{constructor(e,t,n,i){wh.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}}const xp=new Q;class bM{constructor(e=new Q(1/0,1/0),t=new Q(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xp.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xp).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const yp=new C,xl=new C;class wM{constructor(e=new C,t=new C){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){yp.subVectors(e,this.start),xl.subVectors(this.end,this.start);const n=xl.dot(xl);let s=xl.dot(yp)/n;return t&&(s=_t(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const _p=new C;class TM extends it{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new Ve,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let r=0,o=1,l=32;r<l;r++,o++){const c=r/l*Math.PI*2,h=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Ce(i,3));const s=new qt({fog:!1,toneMapped:!1});this.cone=new In(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),_p.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(_p),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Ci=new C,yl=new Oe,Th=new Oe;class AM extends In{constructor(e){const t=Mp(e),n=new Ve,i=[],s=[],r=new Y(0,0,1),o=new Y(0,1,0);for(let c=0;c<t.length;c++){const h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(r.r,r.g,r.b),s.push(o.r,o.g,o.b))}n.setAttribute("position",new Ce(i,3)),n.setAttribute("color",new Ce(s,3));const l=new qt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Th.copy(this.root.matrixWorld).invert();for(let s=0,r=0;s<t.length;s++){const o=t[s];o.parent&&o.parent.isBone&&(yl.multiplyMatrices(Th,o.matrixWorld),Ci.setFromMatrixPosition(yl),i.setXYZ(r,Ci.x,Ci.y,Ci.z),yl.multiplyMatrices(Th,o.parent.matrixWorld),Ci.setFromMatrixPosition(yl),i.setXYZ(r+1,Ci.x,Ci.y,Ci.z),r+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function Mp(a){const e=[];a.isBone===!0&&e.push(a);for(let t=0;t<a.children.length;t++)e.push.apply(e,Mp(a.children[t]));return e}class EM extends Le{constructor(e,t,n){const i=new Ut(t,4,2),s=new Pt({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const CM=new C,Sp=new Y,bp=new Y;class RM extends it{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Kr(t);i.rotateY(Math.PI*.5),this.material=new Pt({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),r=new Float32Array(s.count*3);i.setAttribute("color",new tt(r,3)),this.add(new Le(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Sp.copy(this.light.color),bp.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?Sp:bp;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(CM.setFromMatrixPosition(this.light.matrixWorld).negate())}}class LM extends In{constructor(e=10,t=10,n=4473924,i=8947848){n=new Y(n),i=new Y(i);const s=t/2,r=e/t,o=e/2,l=[],c=[];for(let d=0,f=0,p=-o;d<=t;d++,p+=r){l.push(-o,0,p,o,0,p),l.push(p,0,-o,p,0,o);const v=d===s?n:i;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const h=new Ve;h.setAttribute("position",new Ce(l,3)),h.setAttribute("color",new Ce(c,3));const u=new qt({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class PM extends In{constructor(e=10,t=16,n=8,i=64,s=4473924,r=8947848){s=new Y(s),r=new Y(r);const o=[],l=[];if(t>1)for(let u=0;u<t;u++){const d=u/t*(Math.PI*2),f=Math.sin(d)*e,p=Math.cos(d)*e;o.push(0,0,0),o.push(f,0,p);const v=u&1?s:r;l.push(v.r,v.g,v.b),l.push(v.r,v.g,v.b)}for(let u=0;u<n;u++){const d=u&1?s:r,f=e-e/n*u;for(let p=0;p<i;p++){let v=p/i*(Math.PI*2),g=Math.sin(v)*f,m=Math.cos(v)*f;o.push(g,0,m),l.push(d.r,d.g,d.b),v=(p+1)/i*(Math.PI*2),g=Math.sin(v)*f,m=Math.cos(v)*f,o.push(g,0,m),l.push(d.r,d.g,d.b)}}const c=new Ve;c.setAttribute("position",new Ce(o,3)),c.setAttribute("color",new Ce(l,3));const h=new qt({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const wp=new C,_l=new C,Tp=new C;class IM extends it{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new Ve;i.setAttribute("position",new Ce([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new qt({fog:!1,toneMapped:!1});this.lightPlane=new ai(i,s),this.add(this.lightPlane),i=new Ve,i.setAttribute("position",new Ce([0,0,0,0,0,1],3)),this.targetLine=new ai(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),wp.setFromMatrixPosition(this.light.matrixWorld),_l.setFromMatrixPosition(this.light.target.matrixWorld),Tp.subVectors(_l,wp),this.lightPlane.lookAt(_l),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(_l),this.targetLine.scale.z=Tp.length()}}const Ml=new C,St=new bo;class DM extends In{constructor(e){const t=new Ve,n=new qt({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],r={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(p,v){l(p),l(v)}function l(p){i.push(0,0,0),s.push(0,0,0),r[p]===void 0&&(r[p]=[]),r[p].push(i.length/3-1)}t.setAttribute("position",new Ce(i,3)),t.setAttribute("color",new Ce(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=r,this.update();const c=new Y(16755200),h=new Y(16711680),u=new Y(43775),d=new Y(16777215),f=new Y(3355443);this.setColors(c,h,u,d,f)}setColors(e,t,n,i,s){const o=this.geometry.getAttribute("color");o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;St.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),Tt("c",t,e,St,0,0,-1),Tt("t",t,e,St,0,0,1),Tt("n1",t,e,St,-n,-i,-1),Tt("n2",t,e,St,n,-i,-1),Tt("n3",t,e,St,-n,i,-1),Tt("n4",t,e,St,n,i,-1),Tt("f1",t,e,St,-n,-i,1),Tt("f2",t,e,St,n,-i,1),Tt("f3",t,e,St,-n,i,1),Tt("f4",t,e,St,n,i,1),Tt("u1",t,e,St,n*.7,i*1.1,-1),Tt("u2",t,e,St,-n*.7,i*1.1,-1),Tt("u3",t,e,St,0,i*2,-1),Tt("cf1",t,e,St,-n,0,1),Tt("cf2",t,e,St,n,0,1),Tt("cf3",t,e,St,0,-i,1),Tt("cf4",t,e,St,0,i,1),Tt("cn1",t,e,St,-n,0,-1),Tt("cn2",t,e,St,n,0,-1),Tt("cn3",t,e,St,0,-i,-1),Tt("cn4",t,e,St,0,i,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Tt(a,e,t,n,i,s,r){Ml.set(i,s,r).unproject(n);const o=e[a];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],Ml.x,Ml.y,Ml.z)}}const Sl=new Mt;class UM extends In{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),s=new Ve;s.setIndex(new tt(n,1)),s.setAttribute("position",new tt(i,3)),super(s,new qt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(e!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&Sl.setFromObject(this.object),Sl.isEmpty())return;const t=Sl.min,n=Sl.max,i=this.geometry.attributes.position,s=i.array;s[0]=n.x,s[1]=n.y,s[2]=n.z,s[3]=t.x,s[4]=n.y,s[5]=n.z,s[6]=t.x,s[7]=t.y,s[8]=n.z,s[9]=n.x,s[10]=t.y,s[11]=n.z,s[12]=n.x,s[13]=n.y,s[14]=t.z,s[15]=t.x,s[16]=n.y,s[17]=t.z,s[18]=t.x,s[19]=t.y,s[20]=t.z,s[21]=n.x,s[22]=t.y,s[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class NM extends In{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new Ve;s.setIndex(new tt(n,1)),s.setAttribute("position",new Ce(i,3)),super(s,new qt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class FM extends ai{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],r=new Ve;r.setAttribute("position",new Ce(s,3)),r.computeBoundingSphere(),super(r,new qt({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new Ve;l.setAttribute("position",new Ce(o,3)),l.computeBoundingSphere(),this.add(new Le(l,new Pt({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Ap=new C;let bl,Ah;class OM extends it{constructor(e=new C(0,0,1),t=new C(0,0,0),n=1,i=16776960,s=n*.2,r=s*.2){super(),this.type="ArrowHelper",bl===void 0&&(bl=new Ve,bl.setAttribute("position",new Ce([0,0,0,0,1,0],3)),Ah=new wi(0,.5,1,5,1),Ah.translate(0,-.5,0)),this.position.copy(t),this.line=new ai(bl,new qt({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Le(Ah,new Pt({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Ap.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Ap,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class BM extends In{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ve;i.setAttribute("position",new Ce(t,3)),i.setAttribute("color",new Ce(n,3));const s=new qt({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Y,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class kM{constructor(){this.type="ShapePath",this.color=new Y,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Vr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,r){return this.currentPath.bezierCurveTo(e,t,n,i,s,r),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const y=[];for(let _=0,x=m.length;_<x;_++){const E=m[_],b=new es;b.curves=E.curves,y.push(b)}return y}function n(m,y){const _=y.length;let x=!1;for(let E=_-1,b=0;b<_;E=b++){let T=y[E],R=y[b],S=R.x-T.x,M=R.y-T.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(T=y[b],S=-S,R=y[E],M=-M),m.y<T.y||m.y>R.y)continue;if(m.y===T.y){if(m.x===T.x)return!0}else{const P=M*(m.x-T.x)-S*(m.y-T.y);if(P===0)return!0;if(P<0)continue;x=!x}}else{if(m.y!==T.y)continue;if(R.x<=m.x&&m.x<=T.x||T.x<=m.x&&m.x<=R.x)return!0}}return x}const i=Gn.isClockWise,s=this.subPaths;if(s.length===0)return[];let r,o,l;const c=[];if(s.length===1)return o=s[0],l=new es,l.curves=o.curves,c.push(l),c;let h=!i(s[0].getPoints());h=e?!h:h;const u=[],d=[];let f=[],p=0,v;d[p]=void 0,f[p]=[];for(let m=0,y=s.length;m<y;m++)o=s[m],v=o.getPoints(),r=i(v),r=e?!r:r,r?(!h&&d[p]&&p++,d[p]={s:new es,p:v},d[p].s.curves=o.curves,h&&p++,f[p]=[]):f[p].push({h:o,p:v[0]});if(!d[0])return t(s);if(d.length>1){let m=!1,y=0;for(let _=0,x=d.length;_<x;_++)u[_]=[];for(let _=0,x=d.length;_<x;_++){const E=f[_];for(let b=0;b<E.length;b++){const T=E[b];let R=!0;for(let S=0;S<d.length;S++)n(T.p,d[S].p)&&(_!==S&&y++,R?(R=!1,u[S].push(T)):m=!0);R&&u[_].push(T)}}y>0&&m===!1&&(f=u)}let g;for(let m=0,y=d.length;m<y;m++){l=d[m].s,c.push(l),g=f[m];for(let _=0,x=g.length;_<x;_++)l.holes.push(g[_].h)}return c}}class zM extends Hn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class HM extends nn{constructor(e=1,t=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(e,t,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vn}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vn);const GM=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:wu,AddEquation:fi,AddOperation:_u,AdditiveAnimationBlendMode:Jl,AdditiveBlending:gs,AgXToneMapping:Au,AlphaFormat:Yl,AlwaysCompare:zu,AlwaysDepth:pa,AlwaysStencilFunc:ec,AmbientLight:xh,AnimationAction:fp,AnimationClip:Js,AnimationLoader:W_,AnimationMixer:pp,AnimationObjectGroup:mM,AnimationUtils:z_,ArcCurve:xf,ArrayCamera:Yd,ArrowHelper:OM,AttachedBindMode:Gl,Audio:hp,AudioAnalyser:rM,AudioContext:yh,AudioListener:nM,AudioLoader:Q_,AxesHelper:BM,BackSide:Ht,BasicDepthPacking:Pu,BasicShadowMap:bm,BatchedMesh:hf,Bone:Oo,BooleanKeyframeTrack:is,Box2:bM,Box3:Mt,Box3Helper:NM,BoxGeometry:Mn,BoxHelper:UM,BufferAttribute:tt,BufferGeometry:Ve,BufferGeometryLoader:tp,ByteType:Vl,Cache:oi,Camera:bo,CameraHelper:DM,CanvasTexture:vf,CapsuleGeometry:Jo,CatmullRomCurve3:yf,CineonToneMapping:bu,CircleGeometry:Qo,ClampToEdgeWrapping:Et,Clock:op,Color:Y,ColorKeyframeTrack:fh,ColorManagement:Qe,CompressedArrayTexture:c_,CompressedCubeTexture:h_,CompressedTexture:Zo,CompressedTextureLoader:X_,ConeGeometry:Xr,ConstantAlphaFactor:vu,ConstantColorFactor:mu,Controls:zM,CubeCamera:md,CubeReflectionMapping:Zn,CubeRefractionMapping:pi,CubeTexture:Cr,CubeTextureLoader:Y_,CubeUVReflectionMapping:vs,CubicBezierCurve:nh,CubicBezierCurve3:Mf,CubicInterpolant:Vf,CullFaceBack:Ol,CullFaceFront:eu,CullFaceFrontBack:Sm,CullFaceNone:Qh,Curve:Dn,CurvePath:bf,CustomBlending:tu,CustomToneMapping:Tu,CylinderGeometry:wi,Cylindrical:SM,Data3DTexture:ac,DataArrayTexture:so,DataTexture:Qt,DataTextureLoader:q_,DataUtils:Dg,DecrementStencilOp:Um,DecrementWrapStencilOp:Fm,DefaultLoadingManager:Yf,DepthFormat:Fi,DepthStencilFormat:gi,DepthTexture:Eo,DetachedBindMode:Cu,DirectionalLight:Vn,DirectionalLightHelper:IM,DiscreteInterpolant:Wf,DodecahedronGeometry:el,DoubleSide:en,DstAlphaFactor:hu,DstColorFactor:du,DynamicCopyUsage:jm,DynamicDrawUsage:Xm,DynamicReadUsage:Zm,EdgesGeometry:wf,EllipseCurve:Ko,EqualCompare:Fu,EqualDepth:ga,EqualStencilFunc:zm,EquirectangularReflectionMapping:or,EquirectangularRefractionMapping:lr,Euler:un,EventDispatcher:Hn,ExtrudeGeometry:ol,FileLoader:pn,Float16BufferAttribute:kg,Float32BufferAttribute:Ce,FloatType:tn,Fog:Po,FogExp2:Vs,FramebufferTexture:l_,FrontSide:Bn,Frustum:Rr,GLBufferAttribute:_M,GLSL1:Qm,GLSL3:nc,GreaterCompare:Ou,GreaterDepth:xa,GreaterEqualCompare:ku,GreaterEqualDepth:va,GreaterEqualStencilFunc:Wm,GreaterStencilFunc:Gm,GridHelper:LM,Group:kt,HalfFloatType:$n,HemisphereLight:ml,HemisphereLightHelper:RM,IcosahedronGeometry:ll,ImageBitmapLoader:sp,ImageLoader:jr,ImageUtils:$u,IncrementStencilOp:Dm,IncrementWrapStencilOp:Nm,InstancedBufferAttribute:ji,InstancedBufferGeometry:ep,InstancedInterleavedBuffer:yM,InstancedMesh:Xc,Int16BufferAttribute:Og,Int32BufferAttribute:Bg,Int8BufferAttribute:Ug,IntType:Sa,InterleavedBuffer:Pr,InterleavedBufferAttribute:bi,Interpolant:js,InterpolateDiscrete:Ms,InterpolateLinear:Ss,InterpolateSmooth:to,InvertStencilOp:Om,KeepStencilOp:ki,KeyframeTrack:Un,LOD:Qd,LatheGeometry:Wr,Layers:uo,LessCompare:Nu,LessDepth:ma,LessEqualCompare:tc,LessEqualDepth:Ui,LessEqualStencilFunc:Hm,LessStencilFunc:km,Light:Ai,LightProbe:Qf,Line:ai,Line3:wM,LineBasicMaterial:qt,LineCurve:ih,LineCurve3:Sf,LineDashedMaterial:zf,LineLoop:$c,LineSegments:In,LinearFilter:Je,LinearInterpolant:dh,LinearMipMapLinearFilter:Em,LinearMipMapNearestFilter:Am,LinearMipmapLinearFilter:xn,LinearMipmapNearestFilter:ys,LinearSRGBColorSpace:Ot,LinearToneMapping:Mu,LinearTransfer:vr,Loader:Zt,LoaderUtils:Ei,LoadingManager:ph,LoopOnce:eo,LoopPingPong:Ru,LoopRepeat:mr,LuminanceAlphaFormat:Kl,LuminanceFormat:Zl,MOUSE:ms,Material:Lt,MaterialLoader:gl,MathUtils:ze,Matrix2:wh,Matrix3:Xe,Matrix4:Oe,MaxEquation:ru,Mesh:Le,MeshBasicMaterial:Pt,MeshDepthMaterial:Fc,MeshDistanceMaterial:Oc,MeshLambertMaterial:Bf,MeshMatcapMaterial:kf,MeshNormalMaterial:pl,MeshPhongMaterial:Ff,MeshPhysicalMaterial:Sn,MeshStandardMaterial:fn,MeshToonMaterial:Of,MinEquation:su,MirroredRepeatWrapping:xs,MixOperation:yu,MultiplyBlending:Hl,MultiplyOperation:ar,NearestFilter:wt,NearestMipMapLinearFilter:Tm,NearestMipMapNearestFilter:wm,NearestMipmapLinearFilter:Ni,NearestMipmapNearestFilter:Ma,NeutralToneMapping:Eu,NeverCompare:Uu,NeverDepth:fa,NeverStencilFunc:Bm,NoBlending:kn,NoColorSpace:An,NoToneMapping:qn,NormalAnimationBlendMode:no,NormalBlending:Di,NotEqualCompare:Bu,NotEqualDepth:ya,NotEqualStencilFunc:Vm,NumberKeyframeTrack:ss,Object3D:it,ObjectLoader:j_,ObjectSpaceNormalMap:Du,OctahedronGeometry:Kr,OneFactor:ou,OneMinusConstantAlphaFactor:xu,OneMinusConstantColorFactor:gu,OneMinusDstAlphaFactor:uu,OneMinusDstColorFactor:fu,OneMinusSrcAlphaFactor:da,OneMinusSrcColorFactor:cu,OrthographicCamera:ks,PCFShadowMap:Bl,PCFSoftShadowMap:kl,PMREMGenerator:Ic,Path:Vr,PerspectiveCamera:Rt,Plane:ri,PlaneGeometry:Ln,PlaneHelper:FM,PointLight:on,PointLightHelper:EM,Points:qo,PointsMaterial:zr,PolarGridHelper:PM,PolyhedronGeometry:Ti,PositionalAudio:sM,PropertyBinding:st,PropertyMixer:dp,QuadraticBezierCurve:sh,QuadraticBezierCurve3:rh,Quaternion:Vt,QuaternionKeyframeTrack:rs,QuaternionLinearInterpolant:Xf,RED_GREEN_RGTC2_Format:Ja,RED_RGTC1_Format:jl,REVISION:vn,RGBADepthPacking:Iu,RGBAFormat:vt,RGBAIntegerFormat:Ea,RGBA_ASTC_10x10_Format:Ya,RGBA_ASTC_10x5_Format:Va,RGBA_ASTC_10x6_Format:Wa,RGBA_ASTC_10x8_Format:Xa,RGBA_ASTC_12x10_Format:qa,RGBA_ASTC_12x12_Format:Za,RGBA_ASTC_4x4_Format:Na,RGBA_ASTC_5x4_Format:Fa,RGBA_ASTC_5x5_Format:Oa,RGBA_ASTC_6x5_Format:Ba,RGBA_ASTC_6x6_Format:ka,RGBA_ASTC_8x5_Format:za,RGBA_ASTC_8x6_Format:Ha,RGBA_ASTC_8x8_Format:Ga,RGBA_BPTC_Format:pr,RGBA_ETC2_EAC_Format:Ua,RGBA_PVRTC_2BPPV1_Format:Pa,RGBA_PVRTC_4BPPV1_Format:La,RGBA_S3TC_DXT1_Format:ur,RGBA_S3TC_DXT3_Format:dr,RGBA_S3TC_DXT5_Format:fr,RGBDepthPacking:Rm,RGBFormat:ql,RGBIntegerFormat:Cm,RGB_BPTC_SIGNED_Format:Ka,RGB_BPTC_UNSIGNED_Format:$a,RGB_ETC1_Format:Ia,RGB_ETC2_Format:Da,RGB_PVRTC_2BPPV1_Format:Ra,RGB_PVRTC_4BPPV1_Format:Ca,RGB_S3TC_DXT1_Format:hr,RGDepthPacking:Lm,RGFormat:$l,RGIntegerFormat:Aa,RawShaderMaterial:Nf,Ray:Wi,Raycaster:gp,RectAreaLight:jf,RedFormat:Ta,RedIntegerFormat:cr,ReinhardToneMapping:Su,RenderTarget:ju,RepeatWrapping:Tn,ReplaceStencilOp:Im,ReverseSubtractEquation:iu,RingGeometry:$r,SIGNED_RED_GREEN_RGTC2_Format:Qa,SIGNED_RED_RGTC1_Format:ja,SRGBColorSpace:xt,SRGBTransfer:ht,Scene:Ws,ShaderChunk:Ze,ShaderLib:Pn,ShaderMaterial:Xt,ShadowMaterial:Uf,Shape:es,ShapeGeometry:cl,ShapePath:kM,ShapeUtils:Gn,ShortType:Wl,Skeleton:Nr,SkeletonHelper:AM,SkinnedMesh:Wc,Source:Hi,Sphere:Bt,SphereGeometry:Ut,Spherical:MM,SphericalHarmonics3:Jf,SplineCurve:ah,SpotLight:Jr,SpotLightHelper:TM,Sprite:jd,SpriteMaterial:zc,SrcAlphaFactor:ua,SrcAlphaSaturateFactor:pu,SrcColorFactor:lu,StaticCopyUsage:$m,StaticDrawUsage:xr,StaticReadUsage:qm,StereoCamera:eM,StreamCopyUsage:Jm,StreamDrawUsage:Ym,StreamReadUsage:Km,StringKeyframeTrack:as,SubtractEquation:nu,SubtractiveBlending:zl,TOUCH:Mm,TangentSpaceNormalMap:jn,TetrahedronGeometry:hl,Texture:gt,TextureLoader:qf,TextureUtils:Gy,TorusGeometry:ul,TorusKnotGeometry:dl,Triangle:sn,TriangleFanDrawMode:io,TriangleStripDrawMode:Ql,TrianglesDrawMode:Lu,TubeGeometry:fl,UVMapping:_a,Uint16BufferAttribute:Sc,Uint32BufferAttribute:bc,Uint8BufferAttribute:Ng,Uint8ClampedBufferAttribute:Fg,Uniform:Sh,UniformsGroup:xM,UniformsLib:fe,UniformsUtils:dd,UnsignedByteType:yn,UnsignedInt248Type:mi,UnsignedInt5999Type:Xl,UnsignedIntType:Kn,UnsignedShort4444Type:ba,UnsignedShort5551Type:wa,UnsignedShortType:_s,VSMShadowMap:On,Vector2:Q,Vector3:C,Vector4:at,VectorKeyframeTrack:os,VideoTexture:o_,WebGL3DRenderTarget:bg,WebGLArrayRenderTarget:Sg,WebGLCoordinateSystem:zn,WebGLCubeRenderTarget:gd,WebGLMultipleRenderTargets:HM,WebGLRenderTarget:nn,WebGLRenderer:qd,WebGLUtils:Xd,WebGPUCoordinateSystem:yr,WireframeGeometry:Pf,WrapAroundEnding:gr,ZeroCurvatureEnding:Oi,ZeroFactor:au,ZeroSlopeEnding:Bi,ZeroStencilOp:Pm,createCanvasElement:Vu},Symbol.toStringTag,{value:"Module"}));function wl(a,e,t){if(a.activeClip===e&&e!=="Casting")return;const n=a.actions[e];if(!n){a.activeClip=e;return}const i=a.actions[a.activeClip],s=t??a.crossFadeDuration;e==="Casting"?(n.setLoop(eo,1),n.clampWhenFinished=!0,a.castRemaining=Math.max(.1,a.durations.Casting)):(n.setLoop(mr,1/0),n.clampWhenFinished=!1),n.enabled=!0,n.setEffectiveTimeScale(1),n.setEffectiveWeight(1),n.reset(),i&&i!==n?(n.play(),i.crossFadeTo(n,s,!1)):n.fadeIn(s).play(),a.activeClip=e}class Ep{constructor(){D(this,"name","CharacterAnimationSystem")}update(e,{dt:t}){const n=e.query("CharacterAnimation");for(const i of n){const s=e.getComponent(i,"CharacterAnimation"),r=e.getComponent(i,"Velocity"),o=e.getComponent(i,"NavigationTarget"),l=e.getComponent(i,"InputState"),c=!!(l&&(Math.abs(l.moveX)>.01||Math.abs(l.moveZ)>.01)),h=r?Math.hypot(r.vx,r.vz):0,u=c||!!(o&&o.active)||h>.06;if(s.interactRequested&&(s.interactRequested=!1,s.actions.Casting&&wl(s,"Casting",.18)),s.activeClip==="Casting"){t>0&&(s.castRemaining-=t);const d=s.actions.Casting,f=!!(d&&!d.isRunning()&&s.castRemaining<s.durations.Casting-.05);(s.castRemaining<=0||f)&&(s.castRemaining=0,wl(s,u?"Walking":"Idle",.24))}else{const d=u?"Walking":"Idle";s.activeClip!==d&&wl(s,d,s.crossFadeDuration)}t>0&&s.mixer.update(t)}}}class Eh{constructor(){D(this,"name","AnimationSystem")}update(e,{dt:t,elapsed:n}){const i=e.query("Transform","AnimationState");for(const s of i){const r=e.getComponent(s,"Transform"),o=e.getComponent(s,"AnimationState");o.excitement=Math.max(0,o.excitement-t*1.6);const l=n*o.bobFrequency+o.phase,c=1+o.excitement*.65;if(o.bobAmplitude>0&&(r.y=o.baseY+Math.sin(l*c)*o.bobAmplitude),o.breatheAmplitude>0){const u=Math.sin(n*2.1+o.phase)*o.breatheAmplitude;r.scaleY=1+u,r.scaleX=1-u*.45,r.scaleZ=1-u*.45}if(!o.parts)continue;const h=Math.sin(n*(2.6+o.excitement*4.5)+o.phase)*(.08+o.excitement*.22);o.parts.leftWing&&(o.parts.leftWing.rotation.z=.28+h),o.parts.rightWing&&(o.parts.rightWing.rotation.z=-.28-h),o.parts.head&&(o.parts.head.rotation.z=Math.sin(n*1.4+o.phase)*.045),o.parts.leftFoot&&(o.parts.leftFoot.rotation.x=Math.sin(n*2.4+o.phase)*.06),o.parts.rightFoot&&(o.parts.rightFoot.rotation.x=-Math.sin(n*2.4+o.phase)*.06),o.parts.orbitRing&&(o.parts.orbitRing.rotation.x=Math.sin(n*.7)*.45+.6,o.parts.orbitRing.rotation.y=-n*.55)}}}const Cp={background:"#0C1217",warmLight:"#4A7C7E",warmCore:"#8A99A6",coolAmbient:"#6E7B87",foliageAccent:"#2A3540",cursorLight:"#6E7B87"},Rp="    .,'-~_:;^+=*o!?rcvusaez<>kpqdbwm0OQCJL8$&#%@",ea="./assets/models/cena_completa.glb",Qs="./assets/draco/",Ch={mode:"playground",modelUrl:ea,dracoDecoderPath:Qs,atmosphere:"night",fov:58,enableKeyboard:!0,autoOrbit:!1,pauseOffscreen:!0,palette:{...Cp},cellSize:2.25,autoResponsiveDensity:!1,characterRamp:Rp,structuralChars:"|/\\-+",edgeStrength:.96,blockBlendWeight:.06,windStrength:1,reflectionStrength:.25,bloomIntensity:.28,bloomThreshold:.58,dofFocusDistance:.34,dofStrength:.2,parallaxIntensity:.35,parallaxSmoothing:6.5,cursorLightIntensity:.32,enableShadows:!0,maxFps:60,maxPixelRatio:2,pauseOnHiddenTab:!0,fontFamily:'"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace'};function ta(a,e){return e?{...a,...e,palette:{...a.palette,...e.palette??{}},callbacks:e.callbacks?{...a.callbacks??{},...e.callbacks}:a.callbacks?{...a.callbacks}:void 0}:{...a,palette:{...a.palette},callbacks:a.callbacks?{...a.callbacks}:void 0}}class Lp{constructor(e){D(this,"rafId",null);D(this,"running",!1);D(this,"lastTimestamp",null);D(this,"elapsedSeconds",0);D(this,"maxFps");D(this,"accumFrames",0);D(this,"accumMs",0);D(this,"smoothedFps",60);D(this,"lastFrameMs",16.67);D(this,"onFrame");D(this,"onTelemetry");D(this,"tickBound");this.maxFps=e.maxFps,this.onFrame=e.onFrame,this.onTelemetry=e.onTelemetry,this.tickBound=this.tick.bind(this)}start(){this.running||(this.running=!0,this.lastTimestamp=null,this.schedule())}pause(){this.running&&(this.running=!1,this.cancel(),this.lastTimestamp=null)}resume(){this.start()}stop(){this.pause(),this.elapsedSeconds=0}setMaxFps(e){this.maxFps=e}isRunning(){return this.running}getElapsedSeconds(){return this.elapsedSeconds}getTelemetry(){return{fps:Math.round(this.smoothedFps),frameTimeMs:Number(this.lastFrameMs.toFixed(2))}}stepOnce(e=0){this.elapsedSeconds+=e,this.onFrame({dt:e,elapsed:this.elapsedSeconds,rawFrameMs:this.lastFrameMs})}schedule(){this.rafId===null&&this.running&&(this.rafId=window.requestAnimationFrame(this.tickBound))}cancel(){this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null)}tick(e){var s;if(this.rafId=null,!this.running)return;if(this.lastTimestamp===null){this.lastTimestamp=e,this.stepOnce(.016666666666666666),this.schedule();return}const t=e-this.lastTimestamp,n=this.maxFps>0?1e3/this.maxFps:0;if(n>0&&t<n-1.5){this.schedule();return}this.lastTimestamp=e;const i=Math.min(.1,Math.max(1e-4,t/1e3));if(this.lastFrameMs=t,this.stepOnce(i),this.accumFrames+=1,this.accumMs+=t,this.accumMs>=450){const r=this.accumFrames*1e3/this.accumMs;this.smoothedFps=this.smoothedFps*.35+r*.65,this.accumFrames=0,this.accumMs=0,(s=this.onTelemetry)==null||s.call(this,this.getTelemetry())}this.schedule()}}const VM=["map","alphaMap","aoMap","bumpMap","clearcoatMap","clearcoatNormalMap","clearcoatRoughnessMap","displacementMap","emissiveMap","envMap","iridescenceMap","iridescenceThicknessMap","lightMap","metalnessMap","normalMap","roughnessMap","sheenColorMap","sheenRoughnessMap","specularColorMap","specularIntensityMap","thicknessMap","transmissionMap"];class zt{constructor(e){D(this,"container");D(this,"cleanups",[]);D(this,"disposed",!1);this.container=e??null}register(e){if(this.disposed){try{e()}catch{}return}this.cleanups.push(e)}registerCleanup(e){this.register(e)}observeContainer(e,t){const n=this.container;if(!n||typeof window>"u")return;let i=null;const s=(r,o)=>{r<=0||o<=0||(i!==null&&window.cancelAnimationFrame(i),i=window.requestAnimationFrame(()=>{var l;i=null,this.disposed||(l=e.onResize)==null||l.call(e,r,o)}))};if(typeof ResizeObserver<"u"){const r=new ResizeObserver(o=>{const l=o[0];l&&l.contentRect.width>0&&l.contentRect.height>0&&s(l.contentRect.width,l.contentRect.height)});r.observe(n),this.register(()=>{i!==null&&(window.cancelAnimationFrame(i),i=null),r.disconnect()})}if((t==null?void 0:t.observeViewportIntersection)!==!1&&typeof IntersectionObserver<"u"){const r=new IntersectionObserver(o=>{var c;const l=o[0];l&&!this.disposed&&((c=e.onVisibilityChange)==null||c.call(e,l.isIntersecting))},{threshold:.02});r.observe(n),this.register(()=>r.disconnect())}if((t==null?void 0:t.observeTabVisibility)!==!1&&typeof document<"u"){const r=()=>{var o;this.disposed||(o=e.onTabHiddenChange)==null||o.call(e,document.hidden)};document.addEventListener("visibilitychange",r),this.register(()=>document.removeEventListener("visibilitychange",r))}if(typeof document<"u"){const r=()=>{var c,h;if(this.disposed)return;const o=!!(document.fullscreenElement||(c=n.closest)!=null&&c.call(n,'[data-fullscreen-view="true"], .is-scene-fullscreen'));(h=e.onFullscreenChange)==null||h.call(e,o);const l=n.getBoundingClientRect();l.width>0&&l.height>0&&s(l.width,l.height)};document.addEventListener("fullscreenchange",r),this.register(()=>document.removeEventListener("fullscreenchange",r))}}static disposeMixer(e,t){if(e)try{e.stopAllAction();const n=t??e.getRoot();n&&e.uncacheRoot(n)}catch{}}static disposeObject3D(e){if(!e)return;const t=new Set,n=new Set,i=new Set;for(e.traverse(s=>{var l;const r=s;if(r.geometry&&!t.has(r.geometry)&&(t.add(r.geometry),r.geometry.dispose()),r.skeleton&&typeof r.skeleton.dispose=="function"&&r.skeleton.dispose(),r.material)if(Array.isArray(r.material))for(const c of r.material)zt.disposeMaterial(c,n,i);else zt.disposeMaterial(r.material,n,i);const o=s;o.isLight&&((l=o.shadow)!=null&&l.map)&&o.shadow.map.dispose()}),e.parent&&e.parent.remove(e);e.children.length>0;){const s=e.children[e.children.length-1];s&&e.remove(s)}}static disposeMaterial(e,t,n){var o;if(!e)return;if(t){if(t.has(e))return;t.add(e)}const i=e,s=l=>{if(!l||typeof l!="object")return;const c=l;if(!(!c.isTexture||typeof c.dispose!="function")){if(n){if(n.has(c))return;n.add(c)}c.dispose()}};for(const l of VM)s(i[l]);for(const l of Object.keys(i))s(i[l]);const r=e.uniforms;if(r&&typeof r=="object")for(const l of Object.keys(r))s((o=r[l])==null?void 0:o.value);e.dispose()}disposeAll(e){if(!this.disposed){this.disposed=!0;for(let t=this.cleanups.length-1;t>=0;t--)try{this.cleanups[t]()}catch{}this.cleanups.length=0,e&&zt.disposeObject3D(e)}}isDisposed(){return this.disposed}}const na=.625,Rh=4096,WM=3840*2160,er=2,Tl=6,Lh=.25,Ph=.5;function Pp(a,e=er){const t=Math.max(1.5,Number(e.toFixed(2))),n=Math.max(t,Number(a.toFixed(2))),i=[],s=Math.min(n,Tl),r=Math.floor((s-t+1e-6)/Lh);for(let l=0;l<=r;l++){const c=Number((t+l*Lh).toFixed(2));c<=n+1e-6&&i.push(Math.min(c,n))}if(n>Tl+1e-6){let l=Tl+Ph;for(;l<n-1e-6;)i.push(Number(l.toFixed(2))),l+=Ph}const o=i[i.length-1];return(o===void 0||Math.abs(o-n)>.005)&&i.push(n),i}function Ip(a,e,t=er){const n=Pp(e,t);if(!Number.isFinite(a))return n[n.length-1];const i=Math.max(n[0],Math.min(n[n.length-1],a));let s=n[0],r=Math.abs(i-s);for(let o=1;o<n.length;o++){const l=n[o],c=Math.abs(i-l);c<r-1e-6&&(s=l,r=c)}return s}function XM(a,e,t=er){const n=Number.isFinite(a)?Math.max(0,Math.min(1,a)):1,i=Math.max(1.5,t),s=Math.max(i,e),r=i+(s-i)*Math.pow(n,1.35);return Ip(r,s,i)}function Dp(a,e,t){const n=Math.min(a,e);return t&&a<640?"mobile":a<460||n<280?a<380&&t?"mobile":"compact":a>=1440&&n>=480&&!t?"uhd":a>=960&&n>=360&&!t?"hd":a<720?"compact":"desktop"}function Ih(a){const e=Math.max(1,Math.floor(a.cssWidth)),t=Math.max(1,Math.floor(a.cssHeight)),n=Number.isFinite(a.devicePixelRatio)&&a.devicePixelRatio>0?a.devicePixelRatio:1,i=!!a.isCoarsePointer,s=Dp(e,t,i),r=Math.min(2,Math.max(1,a.config.maxPixelRatio)),o=s==="mobile"?Math.min(1.5,r):r,l=Math.max(1,Math.min(n,o)),c=Math.max(2,Math.floor(e*l)),h=Math.max(2,Math.floor(t*l));let u=1.65;s==="mobile"?u=1.4:s==="compact"?u=l<1.5?1.9:1.6:s==="desktop"?u=l<1.5?1.85:1.6:s==="hd"?u=l<1.5?1.75:1.55:u=l<1.5?1.65:1.5;const d=Math.max(c,h,1),f=Math.max(1,c*h),p=Rh/d,v=Math.sqrt(WM/f),g=Math.min(1,p),m=Math.max(g,Math.min(u,p,v)),y=Math.min(Rh,Math.max(2,Math.round(c*m))),_=Math.min(Rh,Math.max(2,Math.round(h*m))),x=Number((y/Math.max(1,c)).toFixed(2)),E=Math.max(er,Math.min(28,a.config.cellSize)),b=E/8,T=a.config.mode!=="mascot"&&(!a.config.autoResponsiveDensity||E<7.5);let R=E;if(a.config.autoResponsiveDensity)if(a.config.mode==="mascot")s==="mobile"?R=Math.max(E,8.2):s==="compact"?R=Math.max(6.2,E*.9):(s==="hd"||s==="uhd")&&(R=Math.max(6,E*.82));else if(E<7.5)R=Math.max(er,Number(((s==="mobile"?8.2:s==="compact"?7:s==="desktop"?6.45:5.95)*b).toFixed(2)));else{if(s==="mobile")R=Math.max(7.6,Math.min(9.2,Number((8.2*b).toFixed(2))));else if(s==="compact"){const le=7.2-Math.max(0,Math.min(1,(e-460)/260))*.45;R=Math.max(6.4,Math.min(7.8,Number((le*b).toFixed(2))))}else if(s==="desktop"){const le=6.65-Math.max(0,Math.min(1,(e-720)/240))*.45;R=Math.max(6,Math.min(6.8,Number((le*b).toFixed(2))))}else if(s==="hd"){const le=6.12-Math.max(0,Math.min(1,(e-960)/480))*.34;R=Math.max(5.5,Math.min(6.2,Number((le*b).toFixed(2))))}else{const le=5.82-Math.max(0,Math.min(1,(e-1440)/1120))*.28;R=Math.max(5.5,Math.min(6.2,Number((le*b).toFixed(2))))}a.isFullscreen&&s!=="mobile"&&(R=Math.max(s==="hd"||s==="uhd"?5.5:6,Number((R*.96).toFixed(2))))}let S,M;T?(S=Math.max(2,R*l),M=Math.max(1.25,S*na)):(S=Math.max(6,Math.round(R*l)),M=Math.max(4,Math.round(S*na)));const P=a.config.mode==="mascot"?88:T?4096:680,z=a.config.mode==="mascot"?24:42,F=Math.floor(c/M);F>P?T?(M=Math.max(1.25,Math.ceil(c/P*4)/4),S=Math.max(2,Math.round(M/na*4)/4)):(M=Math.max(4,Math.ceil(c/P)),S=Math.max(6,Math.round(M/na))):!T&&F<z&&c>=z*4&&(M=Math.max(4,Math.floor(c/z)),S=Math.max(6,Math.round(M/na)));const k=Math.max(1,Math.floor(c/M)),H=Math.max(1,Math.floor(h/S)),U=Number((S/l).toFixed(2)),$=l>=1.75?112:l>=1.25||s==="hd"||s==="uhd"?96:80,G=.25,J=s==="mobile"?4:3;return{tier:s,cssWidth:e,cssHeight:t,effectiveDpr:Number(l.toFixed(2)),physicalWidth:c,physicalHeight:h,supersampleScale:x,renderTargetWidth:y,renderTargetHeight:_,activeCellSize:U,cellPhysW:M,cellPhysH:S,columns:k,rows:H,atlasTileSize:$,subCellSampleSpread:G,bloomDownsample:J}}class Up{constructor(e=14){D(this,"currentCellW",0);D(this,"currentCellH",0);D(this,"targetCellW",8);D(this,"targetCellH",10);D(this,"currentSpread",.22);D(this,"targetSpread",.22);D(this,"transitionEnergy",0);D(this,"initialized",!1);D(this,"smoothingSpeed");this.smoothingSpeed=e}setTarget(e,t=!1){if(this.targetCellW=e.cellPhysW,this.targetCellH=e.cellPhysH,this.targetSpread=e.subCellSampleSpread,!this.initialized||t){this.currentCellW=e.cellPhysW,this.currentCellH=e.cellPhysH,this.currentSpread=e.subCellSampleSpread,this.transitionEnergy=0,this.initialized=!0;return}const n=Math.abs(this.targetCellW-this.currentCellW)+Math.abs(this.targetCellH-this.currentCellH);n>.05&&(this.transitionEnergy=Math.min(1,Math.max(this.transitionEnergy,n/6)))}step(e){if(!this.initialized)return{cellW:this.targetCellW,cellH:this.targetCellH,subCellSpread:this.targetSpread,transitionMix:0,isTransitioning:!1};const t=Math.max(0,Math.min(.1,e)),n=t>0?1-Math.exp(-this.smoothingSpeed*t):1;return this.currentCellW+=(this.targetCellW-this.currentCellW)*n,this.currentCellH+=(this.targetCellH-this.currentCellH)*n,this.currentSpread+=(this.targetSpread-this.currentSpread)*n,this.transitionEnergy*=Math.exp(-9.5*t),Math.abs(this.targetCellW-this.currentCellW)+Math.abs(this.targetCellH-this.currentCellH)<.06&&this.transitionEnergy<.03?(this.currentCellW=this.targetCellW,this.currentCellH=this.targetCellH,this.currentSpread=this.targetSpread,this.transitionEnergy=0,{cellW:this.targetCellW,cellH:this.targetCellH,subCellSpread:this.targetSpread,transitionMix:0,isTransitioning:!1}):{cellW:this.currentCellW,cellH:this.currentCellH,subCellSpread:Math.max(this.currentSpread,.28),transitionMix:Math.min(1,this.transitionEnergy),isTransitioning:!0}}}function Al(a,e,t){const n=[{minX:t.minX,maxX:t.westStorefrontMinX,minZ:t.corridorMinZ,maxZ:t.corridorMaxZ},{minX:t.westStorefrontMinX,maxX:t.westStorefrontMaxX,minZ:t.westStorefrontMinZ,maxZ:t.corridorMaxZ},{minX:t.westStorefrontMaxX,maxX:t.maxX,minZ:t.corridorMinZ,maxZ:t.corridorMaxZ},{minX:t.plazaMinX,maxX:t.plazaMaxX,minZ:t.minZ,maxZ:t.maxZ},...t.walkablePockets??[]],i=(o,l)=>{let c=t.minX,h=t.corridorMinZ,u=1/0;for(const d of n){const f=ze.clamp(o,Math.max(t.minX,d.minX),Math.min(t.maxX,d.maxX)),p=ze.clamp(l,Math.max(t.minZ,d.minZ),Math.min(t.maxZ,d.maxZ)),v=(o-f)**2+(l-p)**2;v<u&&(u=v,c=f,h=p)}return{x:c,z:h}},s=(o,l)=>o.x>l.minX&&o.x<l.maxX&&o.z>l.minZ&&o.z<l.maxZ;let r=i(a,e);for(const o of t.obstacles){if(!s(r,o))continue;const l=[i(o.minX,r.z),i(o.maxX,r.z),i(r.x,o.minZ),i(r.x,o.maxZ)].filter(h=>!s(h,o)&&!t.obstacles.some(u=>u!==o&&s(h,u)));let c=1/0;for(const h of l){const u=(a-h.x)**2+(e-h.z)**2;u<c&&(c=u,r=h)}}return r}class Np{constructor(e,t,n=null){D(this,"name","InputSystem");D(this,"pointer");D(this,"keyboard");D(this,"camera");D(this,"raycaster",new gp);D(this,"tapNdc",new Q);D(this,"groundPlane",new ri(new C(0,1,0),0));D(this,"groundHit",new C);this.pointer=e,this.keyboard=t,this.camera=n}setCamera(e){this.camera=e}update(e,{dt:t}){const n=this.pointer.sample(t),i=this.pointer.consumeTap(),s=this.pointer.consumeWheelDelta(),r=this.keyboard.sampleAxes(),o=Math.abs(r.moveX)>.01||Math.abs(r.moveZ)>.01;if(s!==0){const c=e.query("CameraFollow");for(const h of c){const u=e.getComponent(h,"CameraFollow"),d=u.offsetX-u.lookAtOffsetX,f=u.offsetY-u.lookAtOffsetY,p=u.offsetZ-u.lookAtOffsetZ,v=Math.hypot(d,f,p)||19.65,g=u.minDistance??8.2,m=u.maxDistance??31.5,y=u.zoomSpeed??2.15,_=u.targetDistance??v;u.targetDistance=ze.clamp(_+s*y,g,m)}}if(i&&!o){const c=e.query("Transform","NavigationTarget");for(const h of c){const u=e.getComponent(h,"Transform"),d=e.getComponent(h,"NavigationTarget"),f=e.getComponent(h,"SidewalkBounds"),p=f?f.groundY:u.y;let v=u.x+i.ndcX*3.5,g=u.z-i.ndcY*4.5;if(this.camera)if(this.camera.updateMatrixWorld(),this.tapNdc.set(i.ndcX,i.ndcY),this.raycaster.setFromCamera(this.tapNdc,this.camera),this.groundPlane.constant=-p,this.raycaster.ray.direction.y<-.025){const m=this.raycaster.ray.intersectPlane(this.groundPlane,this.groundHit);m&&(v=m.x,g=m.z)}else{const m=this.raycaster.ray.direction.x,y=this.raycaster.ray.direction.z,_=Math.hypot(m,y)||1;v=this.raycaster.ray.origin.x+m/_*10,g=this.raycaster.ray.origin.z+y/_*10}if(f){const m=Al(v,g,f);d.targetX=m.x,d.targetZ=m.z}else d.targetX=ze.clamp(v,d.minX,d.maxX),d.targetZ=ze.clamp(g,d.minZ,d.maxZ);d.active=!0}}const l=e.query("InputState");for(const c of l){const h=e.getComponent(c,"InputState"),u=e.getComponent(c,"NavigationTarget"),d=e.getComponent(c,"CharacterAnimation");h.pointerX=n.normX,h.pointerY=n.normY,h.pointerActive=n.active,h.isDragging=n.isDown,h.moveX=r.moveX,h.moveZ=r.moveZ,o&&u&&(u.active=!1),r.interactPressed&&d&&(d.interactRequested=!0,u&&(u.active=!1));const f=e.getComponent(c,"RotationTarget");if(f&&n.active&&!u&&!d){const v=n.normX*h.yawSensitivity+n.dragYaw*.85,g=-n.normY*h.pitchSensitivity+n.dragPitch*.65;f.targetYaw=v,f.targetPitch=ze.clamp(g,-f.maxPitch,f.maxPitch),f.targetRoll=-n.normX*.06}const p=e.getComponent(c,"AnimationState");p&&n.motionSpeed>.04&&(p.excitement=Math.min(1,p.excitement+n.motionSpeed*.25))}}}class Fp{constructor(){D(this,"name","TrafficFlowSystem")}update(e,{elapsed:t}){const n=e.query("Transform","TrafficCycle","Renderable");for(const i of n){const s=e.getComponent(i,"Transform"),r=e.getComponent(i,"TrafficCycle"),o=e.getComponent(i,"Renderable"),l=Math.max(.1,r.cycleDuration),c=ze.clamp(r.activeDuration,.05,l),h=(t+r.timeOffset)%l,u=h<0?h+l:h;if(u<c){const f=u/c,p=ze.lerp(r.startZ,r.endZ,f),v=ze.clamp(u/.35,.15,1),g=ze.clamp((c-u)/.35,.15,1),m=Math.min(v,g);if(s.x=r.laneX,s.y=r.laneY,s.z=p,s.rotY=r.headingYaw,o.object3D.visible=!0,r.headlightLeft&&(r.headlightLeft.visible=!0,r.headlightLeft.intensity=r.baseSpotIntensity*m),r.headlightRight&&(r.headlightRight.visible=!0,r.headlightRight.intensity=r.baseSpotIntensity*m),r.streetThrowLight&&(r.streetThrowLight.visible=!0,r.streetThrowLight.intensity=r.basePointIntensity*m),r.taillightGlow&&(r.taillightGlow.visible=!0,r.taillightGlow.intensity=r.baseTailIntensity*m),r.headlightEmitterGroup&&(r.headlightEmitterGroup.visible=!0),r.headlightLensMaterial&&(r.headlightLensMaterial.emissiveIntensity=(r.baseLensEmissive??3.8)*m),r.headlightHaloMaterial&&(r.headlightHaloMaterial.opacity=(r.baseHaloOpacity??.62)*m),r.headlightConeMaterial&&(r.headlightConeMaterial.opacity=(r.baseConeOpacity??.22)*m),r.headlightRoadPoolMaterial){const y=1-ze.smoothstep(p,12.5,19.2);r.headlightRoadPoolMaterial.opacity=(r.baseRoadPoolOpacity??.34)*m*y}if(r.headlightMaterials)for(const y of r.headlightMaterials)y.emissiveIntensity=(r.baseLensEmissive??3.8)*.42*m}else if(o.object3D.visible=!1,s.x=r.laneX,s.y=r.laneY,s.z=r.startZ-24,r.headlightLeft&&(r.headlightLeft.visible=!1,r.headlightLeft.intensity=0),r.headlightRight&&(r.headlightRight.visible=!1,r.headlightRight.intensity=0),r.streetThrowLight&&(r.streetThrowLight.visible=!1,r.streetThrowLight.intensity=0),r.taillightGlow&&(r.taillightGlow.visible=!1,r.taillightGlow.intensity=0),r.headlightEmitterGroup&&(r.headlightEmitterGroup.visible=!1),r.headlightLensMaterial&&(r.headlightLensMaterial.emissiveIntensity=0),r.headlightHaloMaterial&&(r.headlightHaloMaterial.opacity=0),r.headlightConeMaterial&&(r.headlightConeMaterial.opacity=0),r.headlightRoadPoolMaterial&&(r.headlightRoadPoolMaterial.opacity=0),r.headlightMaterials)for(const f of r.headlightMaterials)f.emissiveIntensity=0}}}class Dh{constructor(e=null){D(this,"name","MovementRotationSystem");D(this,"waypointMarker");this.waypointMarker=e}setWaypointMarker(e){this.waypointMarker=e}update(e,{dt:t,elapsed:n}){let i=0,s=0,r=.1,o=!1;const l=e.query("Transform","Velocity");for(const h of l){const u=e.getComponent(h,"Transform"),d=e.getComponent(h,"Velocity"),f=e.getComponent(h,"InputState"),p=e.getComponent(h,"NavigationTarget"),v=e.getComponent(h,"SidewalkBounds"),g=e.getComponent(h,"CharacterAnimation"),m=e.getComponent(h,"RotationTarget");if(!!(g&&g.activeClip==="Casting"))d.vx=0,d.vz=0,p&&(p.active=!1);else if(f&&f.moveSpeed>0&&(Math.abs(f.moveX)>.001||Math.abs(f.moveZ)>.001))p&&(p.active=!1),d.vx=f.moveX*f.moveSpeed,d.vz=f.moveZ*f.moveSpeed,m&&(m.targetYaw=Math.atan2(d.vx,d.vz),m.targetPitch=0,m.targetRoll=0),u.x+=d.vx*t,u.z+=d.vz*t;else if(p&&p.active){const _=u.x,x=u.z,E=p.targetX-u.x,b=p.targetZ-u.z,T=Math.hypot(E,b);if(T<=p.arrivalRadius)u.x=p.targetX,u.z=p.targetZ,d.vx=0,d.vz=0,p.active=!1;else{const R=ze.clamp(T/.65,.35,1),S=p.moveSpeed*R,M=E/T,P=b/T,z=Math.min(T,S*t);if(d.vx=M*S,d.vz=P*S,u.x+=M*z,u.z+=P*z,m&&(m.targetYaw=Math.atan2(M,P),m.targetPitch=0,m.targetRoll=0),v){const k=Al(u.x,u.z,v),H=Math.hypot(k.x-_,k.z-x);u.x=k.x,u.z=k.z,t>.001&&H<z*.15&&(d.vx=0,d.vz=0,p.active=!1)}Math.hypot(p.targetX-u.x,p.targetZ-u.z)<=p.arrivalRadius?(u.x=p.targetX,u.z=p.targetZ,d.vx=0,d.vz=0,p.active=!1):p.active&&(o=!0,i=p.targetX,s=p.targetZ)}}else{const _=Math.exp(-d.damping*t);d.vx*=_,d.vy*=_,d.vz*=_,Math.hypot(d.vx,d.vz)<.03&&(d.vx=0,d.vz=0),u.x+=d.vx*t,u.y+=d.vy*t,u.z+=d.vz*t}if(u.rotX+=d.angularVx*t,u.rotY+=d.angularVy*t,u.rotZ+=d.angularVz*t,v){const _=Al(u.x,u.z,v);u.x=_.x,u.z=_.z,u.y=v.groundY,r=v.groundY+.025}else if(p)u.x=ze.clamp(u.x,p.minX,p.maxX),u.z=ze.clamp(u.z,p.minZ,p.maxZ);else if(f&&f.boundsRadius>0){const _=Math.hypot(u.x,u.z);if(_>f.boundsRadius){const x=f.boundsRadius/_;u.x*=x,u.z*=x}}}if(this.waypointMarker&&(this.waypointMarker.visible=o,o)){this.waypointMarker.position.set(i,r,s);const h=.92+Math.sin(n*5)*.08;this.waypointMarker.scale.set(h,1,h)}const c=e.query("Transform","RotationTarget");for(const h of c){const u=e.getComponent(h,"Transform"),d=e.getComponent(h,"RotationTarget"),f=e.getComponent(h,"InputState"),p=e.getComponent(h,"NavigationTarget"),v=e.getComponent(h,"CharacterAnimation"),g=1-Math.exp(-d.lerpSpeed*t);if(v||p){const m=Math.atan2(Math.sin(d.targetYaw-u.rotY),Math.cos(d.targetYaw-u.rotY));u.rotY+=m*g,u.rotX=ze.lerp(u.rotX,d.targetPitch,g),u.rotZ=ze.lerp(u.rotZ,d.targetRoll,g)}else if(f&&f.pointerActive){const m=Math.atan2(Math.sin(d.targetYaw-u.rotY),Math.cos(d.targetYaw-u.rotY));u.rotY+=m*g,u.rotX+=(d.targetPitch-u.rotX)*g,u.rotZ+=(d.targetRoll-u.rotZ)*g}else if(d.idleSpinSpeed!==0)u.rotY+=d.idleSpinSpeed*t,u.rotX+=(Math.sin(n*.9)*.04-u.rotX)*g,u.rotZ+=(0-u.rotZ)*g;else{const m=Math.sin(n*.85)*.28,y=Math.cos(n*.65)*.06;u.rotY+=(m-u.rotY)*(g*.6),u.rotX+=(y-u.rotX)*(g*.6),u.rotZ+=(0-u.rotZ)*g}}}}class Op{constructor(e=null){D(this,"name","CameraFollowSystem");D(this,"camera");D(this,"lookTarget",new C);D(this,"overviewCenter",new C);D(this,"viewDirection",new C);D(this,"viewRight",new C);D(this,"viewUp",new C);D(this,"corner",new C);this.camera=e}setCamera(e){this.camera=e}update(e,{dt:t}){if(!this.camera)return;const n=e.query("Transform","CameraFollow");if(n.length===0)return;const i=n[0],s=e.getComponent(i,"Transform"),r=e.getComponent(i,"CameraFollow");let o=r.offsetX,l=r.offsetZ;if(r.autoOrbit){t>0&&(r.orbitAngle+=r.orbitSpeed*t);const T=Math.hypot(r.offsetX,r.offsetZ),S=Math.atan2(r.offsetX,r.offsetZ)+Math.sin(r.orbitAngle)*.34;o=Math.sin(S)*T,l=Math.cos(S)*T}else r.orbitAngle!==0&&t>0&&(r.orbitAngle=ze.lerp(r.orbitAngle,0,1-Math.exp(-3*t)),Math.abs(r.orbitAngle)<.001&&(r.orbitAngle=0));let c=s.x+r.lookAtOffsetX,h=s.y+r.lookAtOffsetY,u=s.z+r.lookAtOffsetZ;const d=o-r.lookAtOffsetX,f=r.offsetY-r.lookAtOffsetY,p=l-r.lookAtOffsetZ,v=Math.hypot(d,f,p)||1,g=r.minDistance??8.2;if(r.overviewBounds&&!r.overviewBounds.isEmpty()){const T=r.overviewBounds;T.getCenter(this.overviewCenter),this.viewDirection.set(d,f,p).normalize(),this.viewRight.crossVectors(this.camera.up,this.viewDirection).normalize(),this.viewUp.crossVectors(this.viewDirection,this.viewRight).normalize();const R=Math.tan(ze.degToRad(this.camera.fov)*.5)/this.camera.zoom,S=R*Math.max(.1,this.camera.aspect);let M=v;for(let F=0;F<8;F++){this.corner.set(F&1?T.max.x:T.min.x,F&2?T.max.y:T.min.y,F&4?T.max.z:T.min.z).sub(this.overviewCenter);const k=this.corner.dot(this.viewDirection);M=Math.max(M,k+Math.abs(this.corner.dot(this.viewRight))/S,k+Math.abs(this.corner.dot(this.viewUp))/R)}r.maxDistance=Math.max(v+1,M*1.12);const P=Math.max(160,r.maxDistance+T.getSize(this.corner).length()*1.5);Math.abs(this.camera.far-P)>.1&&(this.camera.far=P,this.camera.updateProjectionMatrix());const z=ze.smoothstep(r.currentDistance??r.targetDistance??v,v,r.maxDistance);c=ze.lerp(c,this.overviewCenter.x,z),h=ze.lerp(h,this.overviewCenter.y,z),u=ze.lerp(u,this.overviewCenter.z,z)}const m=r.maxDistance??31.5,y=ze.clamp(r.targetDistance??v,g,m);if(r.targetDistance=y,!r.initialized||t<=0)r.currentDistance=y;else{const T=1-Math.exp(-(r.zoomSmoothing??10.5)*t);r.currentDistance=ze.lerp(r.currentDistance??v,y,T)}const _=(r.currentDistance??v)/v,x=c+d*_,E=h+f*_,b=u+p*_;if(!r.initialized||t<=0)this.camera.position.set(x,E,b),r.currentLookX=c,r.currentLookY=h,r.currentLookZ=u,r.initialized=!0;else{const T=1-Math.exp(-r.followSharpness*t);this.camera.position.x=ze.lerp(this.camera.position.x,x,T),this.camera.position.y=ze.lerp(this.camera.position.y,E,T),this.camera.position.z=ze.lerp(this.camera.position.z,b,T),r.currentLookX=ze.lerp(r.currentLookX??c,c,T),r.currentLookY=ze.lerp(r.currentLookY??h,h,T),r.currentLookZ=ze.lerp(r.currentLookZ??u,u,T)}this.lookTarget.set(r.currentLookX??c,r.currentLookY??h,r.currentLookZ??u),this.camera.lookAt(this.lookTarget),this.camera.updateMatrixWorld()}}class Bp{constructor(e=null){D(this,"name","LineOfSightOcclusionSystem");D(this,"camera");D(this,"ray",new Wi);D(this,"rayDir",new C);D(this,"hitPoint",new C);D(this,"expandedBox",new Mt);D(this,"sampleTarget",new C);D(this,"playerNdc",new C);D(this,"cornerVec",new C);this.camera=e}setCamera(e){this.camera=e}segmentIntersectsExpandedBox(e,t,n,i){if(this.expandedBox.copy(n).expandByScalar(i),this.expandedBox.containsPoint(e))return!0;this.rayDir.subVectors(t,e);const s=this.rayDir.length();if(s<=.05)return!1;this.rayDir.multiplyScalar(1/s),this.ray.set(e,this.rayDir);const r=this.ray.intersectBox(this.expandedBox,this.hitPoint);return r?e.distanceTo(r)<s-.12:!1}update(e){if(!this.camera)return;const t=e.query("ForegroundOccluders");if(t.length===0)return;const n=e.query("Transform","CharacterAnimation"),i=n.length>0?e.getComponent(n[0],"Transform"):void 0;this.camera.updateMatrixWorld(),this.camera.updateProjectionMatrix();const s=this.camera.position;let r=!1,o=1/0;i&&(this.sampleTarget.set(i.x,i.y+1.05,i.z),o=s.distanceTo(this.sampleTarget),this.playerNdc.copy(this.sampleTarget).project(this.camera),r=!0);for(const l of t){const c=e.getComponent(l,"ForegroundOccluders");this.sampleTarget.set(c.centralFocusX,c.centralFocusY,c.centralFocusZ);const h=s.distanceTo(this.sampleTarget);for(const u of c.groups){let d=!1;if(i){const f=u.occluded?c.playerClearanceRadius+.35:c.playerClearanceRadius;for(const p of[.35,1.05,1.72])if(this.sampleTarget.set(i.x,i.y+p,i.z),this.segmentIntersectsExpandedBox(s,this.sampleTarget,u.worldBox,f)){d=!0;break}}if(d||(this.sampleTarget.set(c.centralFocusX,c.centralFocusY,c.centralFocusZ),this.segmentIntersectsExpandedBox(s,this.sampleTarget,u.worldBox,1.85)&&(d=!0)),!d){const f=u.worldBox;let p=1/0,v=-1/0,g=1/0,m=-1/0,y=1/0;for(let S=0;S<2;S++){const M=S===0?f.min.x:f.max.x;for(let P=0;P<2;P++){const z=P===0?f.min.y:f.max.y;for(let F=0;F<2;F++){const k=F===0?f.min.z:f.max.z;this.cornerVec.set(M,z,k);const H=s.distanceTo(this.cornerVec);H<y&&(y=H),this.cornerVec.project(this.camera),this.cornerVec.z<=1.05&&(this.cornerVec.x<p&&(p=this.cornerVec.x),this.cornerVec.x>v&&(v=this.cornerVec.x),this.cornerVec.y<g&&(g=this.cornerVec.y),this.cornerVec.y>m&&(m=this.cornerVec.y))}}}const _=u.occluded?.05:0,x=c.centralNdcHalfWidth+_,E=c.centralNdcHalfHeight+_,b=y<h+1.2&&v>-x&&p<x&&m>-E&&g<E,T=.22+_,R=r&&y<o+.5&&v>this.playerNdc.x-T&&p<this.playerNdc.x+T&&m>this.playerNdc.y-.28&&g<this.playerNdc.y+.34;(b||R)&&(d=!0)}u.occluded!==d&&(u.occluded=d);for(const f of u.meshes)f.visible=!d}}}}class Uh{constructor(){D(this,"name","RenderSyncSystem")}update(e,{elapsed:t}){const n=e.query("Transform","Renderable");for(const i of n){const s=e.getComponent(i,"Transform"),r=e.getComponent(i,"Renderable");if(r.object3D.position.set(s.x,s.y,s.z),r.object3D.rotation.set(s.rotX,s.rotY,s.rotZ),r.object3D.scale.set(s.scaleX,s.scaleY,s.scaleZ),r.pointLight&&r.baseLightIntensity!==void 0){const o=r.lightFlickerSpeed??7.2,l=1+Math.sin(t*o+i*1.7)*.08+Math.sin(t*o*2.13+i)*.04;r.pointLight.intensity=r.baseLightIntensity*l}}}}class kp{constructor(){D(this,"entries",[]);D(this,"nextOrder",0)}addSystem(e,t){const n=t??(this.entries.length+1)*10;return this.entries.push({priority:n,order:this.nextOrder++,system:e}),this.entries.sort((i,s)=>i.priority!==s.priority?i.priority-s.priority:i.order-s.order),this}removeSystem(e){const t=this.entries.findIndex(n=>n.system.name===e);return t===-1?!1:(this.entries.splice(t,1),!0)}getSystemNames(){return this.entries.map(e=>e.system.name)}run(e,t){for(let n=0;n<this.entries.length;n++)this.entries[n].system.update(e,t)}clear(){this.entries.length=0,this.nextOrder=0}}class zp{constructor(){D(this,"nextEntityId",1);D(this,"entities",new Set);D(this,"stores",{Transform:new Map,Velocity:new Map,RotationTarget:new Map,AnimationState:new Map,CharacterAnimation:new Map,SidewalkBounds:new Map,TrafficCycle:new Map,ForegroundOccluders:new Map,Renderable:new Map,DepthLayer:new Map,LifecycleTag:new Map,InputState:new Map,NavigationTarget:new Map,CameraFollow:new Map})}createEntity(){const e=this.nextEntityId++;return this.entities.add(e),e}hasEntity(e){return this.entities.has(e)}getEntityCount(){return this.entities.size}addComponent(e,t,n){if(!this.entities.has(e))throw new Error(`[ECS World] Cannot add component "${t}" to non-existent entity ${e}`);return this.stores[t].set(e,n),this}getComponent(e,t){return this.stores[t].get(e)}hasComponent(e,t){return this.stores[t].has(e)}removeComponent(e,t){return this.stores[t].delete(e)}query(...e){if(e.length===0)return Array.from(this.entities);let t=this.stores[e[0]];for(let i=1;i<e.length;i++){const s=this.stores[e[i]];s.size<t.size&&(t=s)}const n=[];for(const i of t.keys()){let s=!0;for(let r=0;r<e.length;r++)if(!this.stores[e[r]].has(i)){s=!1;break}s&&n.push(i)}return n}destroyEntity(e,t=!0){var r,o,l;if(!this.entities.has(e))return!1;const n=this.stores.CharacterAnimation.get(e);n&&(n.disposeListener&&n.disposeListener(),zt.disposeMixer(n.mixer,n.root));const i=this.stores.TrafficCycle.get(e);if(i){const c=[i.headlightLeft,i.headlightRight,i.streetThrowLight,i.taillightGlow];for(const h of c)h&&((r=h.target)!=null&&r.parent&&h.target.parent.remove(h.target),(o=h.shadow)!=null&&o.map&&h.shadow.map.dispose(),h.parent&&h.parent.remove(h),typeof h.dispose=="function"&&h.dispose());i.headlightEmitterGroup&&t&&zt.disposeObject3D(i.headlightEmitterGroup)}const s=this.stores.Renderable.get(e);s&&t&&s.disposeOnDestroy!==!1&&(s.pointLight&&((l=s.pointLight.shadow)!=null&&l.map&&s.pointLight.shadow.map.dispose(),s.pointLight.parent&&s.pointLight.parent.remove(s.pointLight),s.pointLight.dispose()),zt.disposeObject3D(s.object3D));for(const c of Object.values(this.stores))c.delete(e);return this.entities.delete(e)}queryByLayer(e){const t=[];for(const[n,i]of this.stores.DepthLayer.entries())i.layer===e&&t.push(n);return t}destroyEntitiesByRole(e,t=!0){const n=[];for(const[i,s]of this.stores.LifecycleTag.entries())s.role===e&&n.push(i);for(const i of n)this.destroyEntity(i,t);return n.length}clear(e=!0){const t=Array.from(this.entities);for(const n of t)this.destroyEntity(n,e);this.entities.clear(),this.nextEntityId=1}}function Hp(a,e,t){const n=Math.max(0,Math.min(1,(t-a)/(e-a)));return n*n*(3-2*n)}function YM(a,e){const n=new Ut(.76,64,48),i=n.getAttribute("position"),s=i.count,r=new Float32Array(s*3),o=new Y;for(let l=0;l<s;l++){const c=i.getX(l),h=i.getY(l),u=i.getZ(l),d=h/.76,f=1-.19*d,p=1-.13*d,v=c*.92*f,g=h*1.18,m=u*.82*p;i.setXYZ(l,v,g,m);const y=v/.46,_=(g+.05)/.65,x=Math.hypot(y,_),E=Hp(.08,.28,m/.62),b=(1-Hp(.86,1.02,x))*E;o.lerpColors(a,e,b),r[l*3]=o.r,r[l*3+1]=o.g,r[l*3+2]=o.b}return i.needsUpdate=!0,n.setAttribute("color",new tt(r,3)),n.computeVertexNormals(),n}class Gp{static spawn(e,t,n){const i=(n==null?void 0:n.position)??[0,-.35,0],s=(n==null?void 0:n.scale)??1,r=new kt;r.name="TuxMascotRoot";const o=new Y(527636),l=new Y(16055039),c=new fn({color:o,roughness:.64,metalness:.04,flatShading:!1}),h=new fn({color:16777215,vertexColors:!0,roughness:.64,metalness:0,flatShading:!1}),u=new fn({color:16752412,emissive:3873024,emissiveIntensity:.34,roughness:.52,metalness:0,flatShading:!1}),d=new Pt({color:16186367}),f=new Pt({color:329740}),p=new Le(YM(o,l),h);p.name="TuxTorso",p.position.set(0,.86,0),p.castShadow=!0,p.receiveShadow=!1,p.userData.coatColor=o.clone(),p.userData.bellyColor=l.clone(),r.add(p);const v=new kt;v.name="TuxHeadPivot",v.position.set(0,1.72,.03);const g=new Le(new Ut(.48,48,36),c);g.name="TuxHead",g.scale.set(.98,.95,.9),g.castShadow=!0,g.receiveShadow=!1,v.add(g);for(const F of[-1,1]){const k=new Le(new Ut(.132,24,18),d);k.position.set(F*.162,.095,.405),k.scale.set(.96,1.16,.58),v.add(k);const H=new Le(new Ut(.048,18,14),f);H.position.set(F*.152,.095,.472),H.scale.set(.92,.96,.55),v.add(H)}const m=new Le(new Ut(.21,32,24),u);m.name="TuxUpperBeak",m.scale.set(1.16,.42,1.24),m.position.set(0,-.055,.43),m.rotation.x=.08,m.castShadow=!0,m.receiveShadow=!1,v.add(m);const y=new Le(new Ut(.17,28,20),u);y.name="TuxLowerBeak",y.scale.set(1.02,.3,1.02),y.position.set(0,-.115,.4),y.rotation.x=.16,y.castShadow=!0,y.receiveShadow=!1,v.add(y),r.add(v);const _=new kt;_.position.set(-.65,1.32,.02),_.rotation.z=.28;const x=new Le(new Ut(.22,32,24),c);x.position.set(-.06,-.38,0),x.scale.set(.42,2.05,.96),x.castShadow=!0,x.receiveShadow=!1,_.add(x),r.add(_);const E=new kt;E.position.set(.65,1.32,.02),E.rotation.z=-.28;const b=new Le(new Ut(.22,32,24),c);b.position.set(.06,-.38,0),b.scale.set(.42,2.05,.96),b.castShadow=!0,b.receiveShadow=!1,E.add(b),r.add(E);const T=new kt;T.position.set(-.34,.08,.34),T.rotation.y=.26;const R=new Le(new Ut(.24,28,20),u);R.scale.set(.84,.3,1.18),R.position.set(0,.01,.12),R.castShadow=!0,R.receiveShadow=!1,T.add(R),r.add(T);const S=new kt;S.position.set(.34,.08,.34),S.rotation.y=-.26;const M=new Le(new Ut(.24,28,20),u);M.scale.set(.84,.3,1.18),M.position.set(0,.01,.12),M.castShadow=!0,M.receiveShadow=!1,S.add(M),r.add(S);const P=new Le(new Ut(.17,24,18),c);if(P.position.set(0,.22,-.6),P.scale.set(.85,.72,1.35),P.rotation.x=-.24,P.castShadow=!0,P.receiveShadow=!1,r.add(P),n!=null&&n.includeShowcaseRig){const F=new fn({color:1782596,roughness:.82,metalness:.08,flatShading:!1}),k=new Le(new wi(.92,1.08,.16,32),F);k.name="TuxShowcasePlinth",k.userData.isShowcasePedestal=!0,k.position.set(0,-.06,.08),k.receiveShadow=!0,r.add(k)}r.position.set(i[0],i[1],i[2]),r.scale.setScalar(s),t.add(r);const z=e.createEntity();return e.addComponent(z,"Transform",{x:i[0],y:i[1],z:i[2],rotX:0,rotY:.14,rotZ:0,scaleX:s,scaleY:s,scaleZ:s}),e.addComponent(z,"Velocity",{vx:0,vy:0,vz:0,angularVx:0,angularVy:0,angularVz:0,damping:6.5}),e.addComponent(z,"RotationTarget",{targetYaw:.14,targetPitch:0,targetRoll:0,lerpSpeed:6.2,idleSpinSpeed:0,maxPitch:.46}),e.addComponent(z,"AnimationState",{baseY:i[1],bobAmplitude:(n==null?void 0:n.bobAmplitude)??.045,bobFrequency:2.1,breatheAmplitude:.022,phase:.3,excitement:0,parts:{leftWing:_,rightWing:E,head:v,leftFoot:T,rightFoot:S}}),e.addComponent(z,"InputState",{pointerX:0,pointerY:0,pointerActive:!1,isDragging:!1,moveX:0,moveZ:0,yawSensitivity:1.25,pitchSensitivity:.4,moveSpeed:(n==null?void 0:n.moveSpeed)??0,boundsRadius:(n==null?void 0:n.boundsRadius)??0}),e.addComponent(z,"Renderable",{object3D:r}),{entityId:z,rootGroup:r}}}class Vp{constructor(e){D(this,"pressed",new Set);D(this,"enabled",!1);D(this,"attached",!1);D(this,"interactQueued",!1);D(this,"container",null);D(this,"pointerInsideContainer",!1);D(this,"onKeyDownBound");D(this,"onKeyUpBound");D(this,"onBlurBound");D(this,"onPointerEnterBound");D(this,"onPointerLeaveBound");if(e&&typeof e=="object"&&("enabled"in e||"focusTarget"in e)){const t=e;this.enabled=!!t.enabled,this.container=t.focusTarget??null}else this.container=e??null;this.onKeyDownBound=this.handleKeyDown.bind(this),this.onKeyUpBound=this.handleKeyUp.bind(this),this.onBlurBound=this.handleBlur.bind(this),this.onPointerEnterBound=()=>{this.pointerInsideContainer=!0},this.onPointerLeaveBound=()=>{this.pointerInsideContainer=!1}}setContainer(e){this.container!==e&&(this.attached&&this.container&&typeof this.container.removeEventListener=="function"&&(this.container.removeEventListener("pointerenter",this.onPointerEnterBound),this.container.removeEventListener("pointerleave",this.onPointerLeaveBound)),this.container=e,this.pointerInsideContainer=!1,this.attached&&this.container&&typeof this.container.addEventListener=="function"&&(this.container.addEventListener("pointerenter",this.onPointerEnterBound,{passive:!0}),this.container.addEventListener("pointerleave",this.onPointerLeaveBound,{passive:!0})))}setEnabled(e){this.enabled!==e&&(this.enabled=e,e?this.attach():this.detach())}isEnabled(){return this.enabled}attach(){this.attached||typeof window>"u"||typeof window.addEventListener!="function"||(this.attached=!0,window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound),window.addEventListener("blur",this.onBlurBound),this.container&&typeof this.container.addEventListener=="function"&&(this.container.addEventListener("pointerenter",this.onPointerEnterBound,{passive:!0}),this.container.addEventListener("pointerleave",this.onPointerLeaveBound,{passive:!0})))}detach(){this.attached&&(this.attached=!1,this.pressed.clear(),this.interactQueued=!1,this.pointerInsideContainer=!1,typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),window.removeEventListener("blur",this.onBlurBound)),this.container&&typeof this.container.removeEventListener=="function"&&(this.container.removeEventListener("pointerenter",this.onPointerEnterBound),this.container.removeEventListener("pointerleave",this.onPointerLeaveBound)))}setKeyState(e,t){this.enabled&&(t?(!this.pressed.has(e)&&(e==="KeyE"||e==="Space")&&(this.interactQueued=!0),this.pressed.add(e)):this.pressed.delete(e))}sampleAxes(){if(!this.enabled)return{moveX:0,moveZ:0,interactPressed:!1};let e=0,t=0;(this.pressed.has("KeyA")||this.pressed.has("ArrowLeft"))&&(e-=1),(this.pressed.has("KeyD")||this.pressed.has("ArrowRight"))&&(e+=1),(this.pressed.has("KeyW")||this.pressed.has("ArrowUp"))&&(t-=1),(this.pressed.has("KeyS")||this.pressed.has("ArrowDown"))&&(t+=1);const n=Math.hypot(e,t);n>1&&(e/=n,t/=n);const i=this.interactQueued;return this.interactQueued=!1,{moveX:e,moveZ:t,interactPressed:i}}isSceneStageFocusedOrHovered(){var e,t,n,i;return this.pointerInsideContainer?!0:typeof document>"u"?!1:!!(document.fullscreenElement||(t=(e=document.body)==null?void 0:e.classList)!=null&&t.contains("scene-fullscreen-active")||this.container&&document.activeElement&&((i=(n=this.container).contains)!=null&&i.call(n,document.activeElement)))}handleKeyDown(e){var r;if(!this.enabled||e.ctrlKey||e.metaKey||e.altKey)return;const t=typeof document<"u"?document.activeElement:null;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;const n=e.code,i=n==="KeyW"||n==="KeyA"||n==="KeyS"||n==="KeyD"||n==="KeyE",s=n==="ArrowUp"||n==="ArrowDown"||n==="ArrowLeft"||n==="ArrowRight"||n==="Space";if(!(!i&&!s)){if(s){if(!this.isSceneStageFocusedOrHovered())return;(r=e.preventDefault)==null||r.call(e)}!e.repeat&&(n==="KeyE"||n==="Space")&&(this.interactQueued=!0),this.pressed.add(n)}}handleKeyUp(e){this.pressed.delete(e.code)}handleBlur(){this.pressed.clear(),this.interactQueued=!1}}const Wp=14*14,Nh=320;class Xp{constructor(e,t){D(this,"container");D(this,"trackWindowHover");D(this,"enableWheelZoom");D(this,"normX",0);D(this,"normY",0);D(this,"dragYaw",0);D(this,"dragPitch",0);D(this,"wheelDelta",0);D(this,"active",!1);D(this,"isDown",!1);D(this,"isTouch",!1);D(this,"activeTouchId",null);D(this,"lastClientX",0);D(this,"lastClientY",0);D(this,"downOriginX",0);D(this,"downOriginY",0);D(this,"maxGestureDistSq",0);D(this,"gestureActive",!1);D(this,"hasPendingTap",!1);D(this,"lastTapRecordedMs",0);D(this,"pendingTap",{ndcX:0,ndcY:0});D(this,"motionSpeed",0);D(this,"lastInteractionMs",0);D(this,"touchReleaseHoldTimer",0);D(this,"attached",!1);D(this,"onPointerDownBound");D(this,"onPointerMoveBound");D(this,"onWindowPointerMoveBound");D(this,"onPointerUpBound");D(this,"onPointerCancelBound");D(this,"onPointerLeaveBound");D(this,"onTouchStartBound");D(this,"onTouchMoveBound");D(this,"onTouchEndBound");D(this,"onTouchCancelBound");D(this,"onClickBound");D(this,"onWheelBound");this.container=e,this.trackWindowHover=!!(t!=null&&t.trackWindowHover),this.enableWheelZoom=(t==null?void 0:t.enableWheelZoom)!==!1,this.onPointerDownBound=this.handlePointerDown.bind(this),this.onPointerMoveBound=this.handleContainerPointerMove.bind(this),this.onWindowPointerMoveBound=this.handleWindowPointerMove.bind(this),this.onPointerUpBound=this.handlePointerUp.bind(this),this.onPointerCancelBound=this.handlePointerCancel.bind(this),this.onPointerLeaveBound=this.handlePointerLeave.bind(this),this.onTouchStartBound=this.handleTouchStart.bind(this),this.onTouchMoveBound=this.handleTouchMove.bind(this),this.onTouchEndBound=this.handleTouchEnd.bind(this),this.onTouchCancelBound=this.handleTouchCancel.bind(this),this.onClickBound=this.handleClick.bind(this),this.onWheelBound=this.handleWheel.bind(this)}attach(){this.attached||(this.attached=!0,this.container.style.touchAction||(this.container.style.touchAction="pan-y"),this.container.addEventListener("pointerdown",this.onPointerDownBound,{passive:!0}),this.container.addEventListener("pointermove",this.onPointerMoveBound,{passive:!0}),this.container.addEventListener("pointerup",this.onPointerUpBound,{passive:!0}),this.container.addEventListener("pointercancel",this.onPointerCancelBound,{passive:!0}),this.container.addEventListener("pointerleave",this.onPointerLeaveBound,{passive:!0}),this.container.addEventListener("click",this.onClickBound,{passive:!0}),this.enableWheelZoom&&this.container.addEventListener("wheel",this.onWheelBound,{passive:!1}),this.container.addEventListener("touchstart",this.onTouchStartBound,{passive:!0}),this.container.addEventListener("touchmove",this.onTouchMoveBound,{passive:!0}),this.container.addEventListener("touchend",this.onTouchEndBound,{passive:!0}),this.container.addEventListener("touchcancel",this.onTouchCancelBound,{passive:!0}),this.trackWindowHover&&typeof window<"u"&&(window.addEventListener("pointermove",this.onWindowPointerMoveBound,{passive:!0}),window.addEventListener("pointerup",this.onPointerUpBound,{passive:!0})))}detach(){this.attached&&(this.attached=!1,this.hasPendingTap=!1,this.gestureActive=!1,this.wheelDelta=0,this.container.removeEventListener("pointerdown",this.onPointerDownBound),this.container.removeEventListener("pointermove",this.onPointerMoveBound),this.container.removeEventListener("pointerup",this.onPointerUpBound),this.container.removeEventListener("pointercancel",this.onPointerCancelBound),this.container.removeEventListener("pointerleave",this.onPointerLeaveBound),this.container.removeEventListener("click",this.onClickBound),this.container.removeEventListener("wheel",this.onWheelBound),this.container.removeEventListener("touchstart",this.onTouchStartBound),this.container.removeEventListener("touchmove",this.onTouchMoveBound),this.container.removeEventListener("touchend",this.onTouchEndBound),this.container.removeEventListener("touchcancel",this.onTouchCancelBound),typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pointermove",this.onWindowPointerMoveBound),window.removeEventListener("pointerup",this.onPointerUpBound)))}isAttached(){return this.attached}sample(e){if(this.motionSpeed=Math.max(0,this.motionSpeed-e*2.4),this.touchReleaseHoldTimer>0&&!this.isDown&&(this.touchReleaseHoldTimer=Math.max(0,this.touchReleaseHoldTimer-e),this.touchReleaseHoldTimer===0&&!this.trackWindowHover&&(this.active=!1)),!this.isDown&&!this.active){const t=1-Math.exp(-2.2*e);this.dragYaw+=(0-this.dragYaw)*t,this.dragPitch+=(0-this.dragPitch)*t,this.normX+=(0-this.normX)*t,this.normY+=(0-this.normY)*t}return{normX:this.normX,normY:this.normY,dragYaw:this.dragYaw,dragPitch:this.dragPitch,active:this.active,isDown:this.isDown,isTouch:this.isTouch,motionSpeed:this.motionSpeed,lastInteractionMs:this.lastInteractionMs}}setNormalized(e,t,n=!0){this.normX=Math.max(-1,Math.min(1,e)),this.normY=Math.max(-1,Math.min(1,t)),this.active=n}triggerTapNormalized(e,t){this.pendingTap.ndcX=Math.max(-1,Math.min(1,e)),this.pendingTap.ndcY=Math.max(-1,Math.min(1,t)),this.hasPendingTap=!0,this.lastTapRecordedMs=Date.now()}consumeTap(){return this.hasPendingTap?(this.hasPendingTap=!1,this.pendingTap):null}triggerWheel(e,t=0){if(!this.enableWheelZoom||!Number.isFinite(e)||e===0)return;const i=Math.max(-180,Math.min(180,e*(t===1?32:t===2?320:1)));this.wheelDelta=Math.max(-6,Math.min(6,this.wheelDelta+i/100))}consumeWheelDelta(){const e=this.wheelDelta;return this.wheelDelta=0,e}handleWheel(e){!this.attached||!this.enableWheelZoom||!Number.isFinite(e.deltaY)||e.deltaY===0||(e.cancelable&&e.preventDefault(),e.isTrusted&&(this.lastInteractionMs=Date.now()),this.triggerWheel(e.deltaY,e.deltaMode))}recordTapFromClient(e,t){const n=this.container.getBoundingClientRect();if(n.width<=0||n.height<=0)return;const i=(e-n.left)/n.width,s=(t-n.top)/n.height;i<0||i>1||s<0||s>1||(this.pendingTap.ndcX=Math.max(-1,Math.min(1,i*2-1)),this.pendingTap.ndcY=Math.max(-1,Math.min(1,-(s*2-1))),this.hasPendingTap=!0,this.lastTapRecordedMs=Date.now())}handlePointerDown(e){if(e.pointerType==="touch")this.isTouch=!0;else{if(typeof e.button=="number"&&e.button!==0)return;this.isTouch=!1}this.isDown=!0,this.active=!0,this.touchReleaseHoldTimer=0,this.lastClientX=e.clientX,this.lastClientY=e.clientY,this.downOriginX=e.clientX,this.downOriginY=e.clientY,this.maxGestureDistSq=0,this.gestureActive=!0,e.isTrusted&&(this.lastInteractionMs=Date.now()),this.updateNormalizedFromClient(e.clientX,e.clientY,!1)}handleContainerPointerMove(e){if(e.pointerType==="touch"&&this.activeTouchId!==null)return;e.isTrusted&&(this.lastInteractionMs=Date.now());const t=e.pointerType==="touch"?1.35:1;if(this.isDown){const n=e.clientX-this.downOriginX,i=e.clientY-this.downOriginY,s=n*n+i*i;s>this.maxGestureDistSq&&(this.maxGestureDistSq=s);const r=e.clientX-this.lastClientX,o=e.clientY-this.lastClientY;this.lastClientX=e.clientX,this.lastClientY=e.clientY,this.dragYaw=Math.max(-Math.PI,Math.min(Math.PI,this.dragYaw+r*.012*t)),this.dragPitch=Math.max(-.55,Math.min(.55,this.dragPitch+o*.0075*t)),this.motionSpeed=Math.min(1,this.motionSpeed+Math.hypot(r,o)*.026)}this.active=!0,this.updateNormalizedFromClient(e.clientX,e.clientY,!1)}handleWindowPointerMove(e){e.isTrusted&&(this.lastInteractionMs=Date.now(),this.active=!0,this.updateNormalizedFromClient(e.clientX,e.clientY,!0))}handlePointerUp(e){e.pointerType==="touch"&&(this.touchReleaseHoldTimer=1.6),this.gestureActive&&this.maxGestureDistSq<=Wp&&Date.now()-this.lastTapRecordedMs>Nh*.5&&this.recordTapFromClient(e.clientX,e.clientY),this.gestureActive=!1,this.isDown=!1}handlePointerCancel(e){e.pointerType==="touch"&&(this.touchReleaseHoldTimer=1.6),this.gestureActive=!1,this.isDown=!1}handleClick(e){Date.now()-this.lastTapRecordedMs<=Nh||this.recordTapFromClient(e.clientX,e.clientY)}handlePointerLeave(e){e.pointerType!=="touch"&&(this.isDown=!1,this.trackWindowHover||(this.active=!1))}handleTouchStart(e){var n,i;const t=((n=e.changedTouches)==null?void 0:n[0])??((i=e.touches)==null?void 0:i[0]);t&&(this.isTouch=!0,this.isDown=!0,this.active=!0,this.touchReleaseHoldTimer=0,this.activeTouchId=t.identifier??0,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.downOriginX=t.clientX,this.downOriginY=t.clientY,this.maxGestureDistSq=0,this.gestureActive=!0,e.isTrusted!==!1&&(this.lastInteractionMs=Date.now()),this.updateNormalizedFromClient(t.clientX,t.clientY,!1))}handleTouchMove(e){const t=e.changedTouches??e.touches;if(!t||t.length===0)return;let n=t[0];if(this.activeTouchId!==null){for(let c=0;c<t.length;c++)if(t[c].identifier===this.activeTouchId){n=t[c];break}}e.isTrusted!==!1&&(this.lastInteractionMs=Date.now());const i=n.clientX-this.downOriginX,s=n.clientY-this.downOriginY,r=i*i+s*s;r>this.maxGestureDistSq&&(this.maxGestureDistSq=r);const o=n.clientX-this.lastClientX,l=n.clientY-this.lastClientY;this.lastClientX=n.clientX,this.lastClientY=n.clientY,this.dragYaw=Math.max(-Math.PI,Math.min(Math.PI,this.dragYaw+o*.015)),this.dragPitch=Math.max(-.55,Math.min(.55,this.dragPitch+l*.0085)),this.motionSpeed=Math.min(1,this.motionSpeed+Math.hypot(o,l)*.03),this.active=!0,this.isDown=!0,this.updateNormalizedFromClient(n.clientX,n.clientY,!1)}handleTouchEnd(e){var i;const t=(i=e.changedTouches)==null?void 0:i[0];(e.touches?e.touches.length:0)===0&&(t&&this.gestureActive&&this.maxGestureDistSq<=Wp&&Date.now()-this.lastTapRecordedMs>Nh*.5&&this.recordTapFromClient(t.clientX,t.clientY),this.gestureActive=!1,this.isDown=!1,this.activeTouchId=null,this.touchReleaseHoldTimer=1.8)}handleTouchCancel(){this.gestureActive=!1,this.isDown=!1,this.activeTouchId=null}updateNormalizedFromClient(e,t,n){const i=this.container.getBoundingClientRect();if(i.width<=0||i.height<=0)return;const s=this.normX,r=this.normY;if(n&&typeof window<"u"){const l=i.left+i.width*.5,c=i.top+i.height*.5,h=Math.max(i.width*.7,window.innerWidth*.38,160),u=Math.max(i.height*.7,window.innerHeight*.38,140);this.normX=Math.max(-1,Math.min(1,(e-l)/h)),this.normY=Math.max(-1,Math.min(1,-((t-c)/u)))}else{const l=(e-i.left)/i.width,c=(t-i.top)/i.height;this.normX=Math.max(-1,Math.min(1,l*2-1)),this.normY=Math.max(-1,Math.min(1,-(c*2-1)))}const o=Math.hypot(this.normX-s,this.normY-r);this.motionSpeed=Math.min(1,this.motionSpeed+o*1.4)}}const Yp=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,qM=`
  precision highp float;

  uniform sampler2D tScene;
  uniform vec2 uTexelSize;
  uniform float uThreshold;

  varying vec2 vUv;

  float luma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  void main() {
    // 13-tap dual-ring Kawase downsample for smooth, contained typographic light halos
    vec3 acc = texture2D(tScene, vUv).rgb * 0.22;

    vec2 r1 = uTexelSize * 1.25;
    acc += texture2D(tScene, clamp(vUv + vec2( r1.x,  r1.y), 0.001, 0.999)).rgb * 0.105;
    acc += texture2D(tScene, clamp(vUv + vec2(-r1.x,  r1.y), 0.001, 0.999)).rgb * 0.105;
    acc += texture2D(tScene, clamp(vUv + vec2( r1.x, -r1.y), 0.001, 0.999)).rgb * 0.105;
    acc += texture2D(tScene, clamp(vUv + vec2(-r1.x, -r1.y), 0.001, 0.999)).rgb * 0.105;

    vec2 r2 = uTexelSize * 2.65;
    acc += texture2D(tScene, clamp(vUv + vec2( r2.x,  0.0 ), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2(-r2.x,  0.0 ), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2( 0.0,   r2.y), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2( 0.0,  -r2.y), 0.001, 0.999)).rgb * 0.055;

    vec2 r3 = uTexelSize * 4.10;
    acc += texture2D(tScene, clamp(vUv + vec2( r3.x,  r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2(-r3.x,  r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2( r3.x, -r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2(-r3.x, -r3.y), 0.001, 0.999)).rgb * 0.035;

    float lum = luma(acc);
    float knee = 0.22;
    float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee + 0.0001);
    float contrib = max(soft, lum - uThreshold) / max(lum, 0.0001);

    // Cap peak bloom radiance so lamp/headlight halos lift nearby glyphs without solid whitewash
    vec3 extracted = min(acc * clamp(contrib, 0.0, 1.25), vec3(1.05));
    gl_FragColor = vec4(extracted, 1.0);
  }
`,ZM=`
  precision highp float;

  uniform sampler2D tScene;
  uniform sampler2D tNormal;
  uniform sampler2D tDepth;
  uniform sampler2D tBloom;
  uniform sampler2D tGlyphAtlas;

  uniform vec2 uResolution;
  uniform vec2 uSceneTexelSize;
  uniform vec2 uCellPixelSize;
  uniform float uCellCssSize;
  uniform vec2 uAtlasTileSize;
  uniform float uSubCellSpread;
  uniform float uRampCount;
  uniform float uStructCount;
  uniform float uBlockCount;
  uniform float uTotalGlyphs;
  uniform vec3 uHighlightGlyphs;
  uniform float uEdgeStrength;
  uniform float uBlockBlendWeight;
  uniform float uBloomIntensity;
  uniform float uDofFocus;
  uniform float uDofStrength;
  uniform float uDaylight;
  uniform float uWetness;
  uniform float uReflectionStrength;
  uniform float uCameraNear;
  uniform float uCameraFar;
  uniform float uVolumeWrapStrength;
  uniform float uNormalReliefStrength;
  uniform vec3 uKeyLightViewDir;
  uniform vec3 uRimLightViewDir;
  uniform vec3 uWorldUpViewDir;
  uniform vec3 uBgColor;
  uniform vec3 uCoolTint;
  uniform vec3 uWarmTint;
  uniform float uTime;

  varying vec2 vUv;

  float getLuma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  vec3 linearToSrgb(vec3 c) {
    return pow(max(c, vec3(0.0)), vec3(0.454545));
  }

  /**
   * Deterministic flicker-free 2D spatial hash in [-0.5 .. +0.5] anchored to cell clusters.
   */
  float glyphVarietyHash(vec2 cellCoord) {
    vec2 p = fract(cellCoord * vec2(0.3183099, 0.3678794)) + 0.07;
    p += dot(p, p.yx + 19.19);
    return fract((p.x + p.y) * p.x) - 0.5;
  }

  /**
   * Converts non-linear [0..1] DepthTexture sample into normalized linear view-space depth [0..1].
   */
  float linearizeDepth(float rawDepth) {
    float nearP = max(0.05, uCameraNear);
    float farP = max(nearP + 1.0, uCameraFar);
    float zNdc = rawDepth * 2.0 - 1.0;
    float viewZ = (2.0 * nearP * farP) / max(farP + nearP - zNdc * (farP - nearP), 0.0001);
    return clamp((viewZ - nearP) / (farP - nearP), 0.0, 1.0);
  }

  /**
   * 2x2 Sub-Cell Multi-Point Filtered Downsampling (sampleCellIntegrated):
   * Samples all 4 sub-quadrant centers ((-q,-q), (+q,-q), (-q,+q), (+q,+q)) plus the
   * cell center in the supersampled 3D tScene buffer (each tap hardware-bilinearly filtering
   * 4 supersampled texels), integrating weighted mean color/luminance while preserving crisp
   * sub-cell highlight peaks (headlights, character rim, mullions, wet specular glints)
   * without reintroducing 1-pixel granular noise.
   */
  vec3 sampleCellIntegrated(vec2 centerUv, vec2 cellUvSpan) {
    vec2 q = cellUvSpan * uSubCellSpread;

    vec3 qBL = texture2D(tScene, clamp(centerUv + vec2(-q.x, -q.y), 0.001, 0.999)).rgb;
    vec3 qBR = texture2D(tScene, clamp(centerUv + vec2( q.x, -q.y), 0.001, 0.999)).rgb;
    vec3 qTL = texture2D(tScene, clamp(centerUv + vec2(-q.x,  q.y), 0.001, 0.999)).rgb;
    vec3 qTR = texture2D(tScene, clamp(centerUv + vec2( q.x,  q.y), 0.001, 0.999)).rgb;
    vec3 qC  = texture2D(tScene, centerUv).rgb;

    vec3 avgCol = (qBL + qBR + qTL + qTR) * 0.205 + qC * 0.18;
    vec3 peakCol = max(max(qBL, qBR), max(qTL, qTR));
    float peakLuma = getLuma(peakCol);
    float avgLuma = getLuma(avgCol);
    // Preserve thin luminous features crossing a single sub-quadrant while keeping flat areas smooth
    float peakKeep = smoothstep(0.24, 0.86, peakLuma) * smoothstep(0.06, 0.36, peakLuma - avgLuma) * 0.38;
    return mix(avgCol, peakCol, peakKeep);
  }

  /**
   * Selective vertical rippled reflection sampler for upward-facing wet asphalt & sidewalk:
   * Perturbs reflection rays by actual surface normal tilt ('normalTilt' from embedded/procedural
   * normal maps) plus gentle rain ripples, reflecting only genuinely luminous upper-screen sources.
   */
  vec3 sampleGroundReflection(
    vec2 centerUv,
    vec2 cellIndex,
    vec2 cellUvSpan,
    float upwardMask,
    vec2 normalTilt
  ) {
    if (upwardMask <= 0.01 || uWetness <= 0.01 || uReflectionStrength <= 0.001) {
      return vec3(0.0);
    }

    float rainAnim = smoothstep(0.45, 0.95, uWetness);
    float wavePhase = cellIndex.y * 0.88 + cellIndex.x * 0.19 - uTime * (0.45 + 1.65 * rainAnim);
    float rippleX = sin(wavePhase) * cellUvSpan.x * (0.28 + 0.56 * rainAnim);
    float normalRefractX = normalTilt.x * cellUvSpan.x * (1.85 + 1.35 * uWetness);
    float normalRefractY = normalTilt.y * cellUvSpan.y * 1.25;
    float rippleBand = 0.74 + 0.26 * sin(cellIndex.y * 1.35 - uTime * (0.55 + 1.95 * rainAnim) + normalTilt.x * 3.2);

    vec3 reflAcc = vec3(0.0);
    float weightSum = 0.0;

    float stepReflY = max(cellUvSpan.y * 2.85, 0.022);
    for (int i = 1; i <= 6; i++) {
      float fi = float(i);
      float w = 1.0 / (0.70 + fi * 0.58);
      float subWave = sin(wavePhase + fi * 0.82) * max(cellUvSpan.x, 0.004) * (0.24 + 0.52 * rainAnim);
      vec2 sampleUv = clamp(
        centerUv + vec2(
          normalRefractX + rippleX * 0.55 + subWave * 0.45,
          fi * stepReflY + normalRefractY
        ),
        vec2(0.002),
        vec2(0.998)
      );
      vec3 sCol = texture2D(tScene, sampleUv).rgb;
      vec3 bCol = texture2D(tBloom, sampleUv).rgb;
      float sLum = getLuma(sCol);
      // Reflect warm storefronts, illuminated facades, neon trims & headlights on wet pavement
      float specGate = smoothstep(0.12, 0.65, sLum);
      reflAcc += (sCol * specGate * 0.92 + bCol * 1.38) * w;
      weightSum += w;
    }

    vec3 reflected = (reflAcc / max(weightSum, 0.001)) * rippleBand;
    // Limit screen-space reflection energy, which otherwise exaggerates the
    // hard visual transition where one road half samples bright facades.
    return min(reflected, vec3(0.16)) * upwardMask * uWetness * uReflectionStrength;
  }

  /**
   * Samples a glyph tile from the horizontal 1D atlas strip with half-texel UV clamping,
   * 4-tap rotated-grid sub-pixel anti-aliasing (RGSS) when cells shrink below 8.5 physical px,
   * and adaptive stem sharpening so 2.0px–6.8px characters stay crisp without stroke dropout.
   */
  float sampleAtlasTile(float tileIndex, vec2 glyphUv, vec2 cellSize) {
    vec2 safeTileDims = max(uAtlasTileSize, vec2(16.0, 24.0));
    float microCellFactor = 1.0 - smoothstep(3.5, 8.5, cellSize.y);
    vec2 inset = mix(0.55 / safeTileDims, 1.65 / safeTileDims, microCellFactor);
    vec2 clampedUv = clamp(glyphUv, inset, vec2(1.0) - inset);
    vec2 atlasUv = vec2((tileIndex + clampedUv.x) / uTotalGlyphs, clampedUv.y);
    float rawGlyph = texture2D(tGlyphAtlas, atlasUv).r;

    if (microCellFactor > 0.001) {
      vec2 subStep = vec2(0.19, 0.38) / max(cellSize, vec2(1.25, 2.0));
      vec2 uv0 = clamp(glyphUv + vec2( subStep.x,  subStep.y), inset, vec2(1.0) - inset);
      vec2 uv1 = clamp(glyphUv + vec2(-subStep.x, -subStep.y), inset, vec2(1.0) - inset);
      vec2 uv2 = clamp(glyphUv + vec2(-subStep.y,  subStep.x), inset, vec2(1.0) - inset);
      vec2 uv3 = clamp(glyphUv + vec2( subStep.y, -subStep.x), inset, vec2(1.0) - inset);
      float s0 = texture2D(tGlyphAtlas, vec2((tileIndex + uv0.x) / uTotalGlyphs, uv0.y)).r;
      float s1 = texture2D(tGlyphAtlas, vec2((tileIndex + uv1.x) / uTotalGlyphs, uv1.y)).r;
      float s2 = texture2D(tGlyphAtlas, vec2((tileIndex + uv2.x) / uTotalGlyphs, uv2.y)).r;
      float s3 = texture2D(tGlyphAtlas, vec2((tileIndex + uv3.x) / uTotalGlyphs, uv3.y)).r;
      float avgGlyph = (s0 + s1 + s2 + s3) * 0.25;
      float peakGlyph = max(max(s0, s1), max(s2, s3));
      rawGlyph = mix(rawGlyph, mix(avgGlyph, peakGlyph, 0.44 * microCellFactor), microCellFactor);
    }

    float lowKnee = mix(0.35, 0.15, microCellFactor);
    float highKnee = mix(0.70, 0.50, microCellFactor);
    return mix(rawGlyph, smoothstep(lowKnee, highKnee, rawGlyph), mix(0.36, 0.62, microCellFactor));
  }

  void main() {
    vec2 cellSize = max(uCellPixelSize, vec2(1.25, 2.0));
    float microCellFactor = 1.0 - smoothstep(3.5, 8.5, cellSize.y);
    float smallFontFactor = uVolumeWrapStrength > 0.5 ? (1.0 - smoothstep(3.0, 6.0, max(uCellCssSize, 2.0))) : 0.0;
    float cellDensitySupport = max(microCellFactor, smallFontFactor);

    // Anchor the ASCII character grid to viewport center so resizes expand symmetrically
    vec2 screenCenter = floor(uResolution * 0.5);
    vec2 relFrag = gl_FragCoord.xy - screenCenter;
    vec2 cellIndex = floor(relFrag / cellSize);
    vec2 glyphUv = fract(relFrag / cellSize);

    vec2 cellCenterPx = screenCenter + (cellIndex + 0.5) * cellSize;
    vec2 cellCenterUv = clamp(cellCenterPx / uResolution, vec2(0.001), vec2(0.999));
    vec2 cellUvSpan = cellSize / uResolution;
    vec2 subQuadOffset = cellUvSpan * uSubCellSpread;

    // 1. 2x2 Sub-Cell Multi-Point Filtered Downsampling (radiance + foreground depth + normals)
    vec3 sceneCol = sampleCellIntegrated(cellCenterUv, cellUvSpan);
    vec3 bloomCol = texture2D(tBloom, cellCenterUv).rgb;

    float rawCenterDepth = texture2D(tDepth, cellCenterUv).r;
    float rawDepthBL = texture2D(tDepth, clamp(cellCenterUv + vec2(-subQuadOffset.x, -subQuadOffset.y), 0.001, 0.999)).r;
    float rawDepthBR = texture2D(tDepth, clamp(cellCenterUv + vec2( subQuadOffset.x, -subQuadOffset.y), 0.001, 0.999)).r;
    float rawDepthTL = texture2D(tDepth, clamp(cellCenterUv + vec2(-subQuadOffset.x,  subQuadOffset.y), 0.001, 0.999)).r;
    float rawDepthTR = texture2D(tDepth, clamp(cellCenterUv + vec2( subQuadOffset.x,  subQuadOffset.y), 0.001, 0.999)).r;
    float minSubRawDepth = min(min(rawDepthBL, rawDepthBR), min(rawDepthTL, rawDepthTR));
    float maxSubRawDepth = max(max(rawDepthBL, rawDepthBR), max(rawDepthTL, rawDepthTR));

    float linCenterOnly = linearizeDepth(rawCenterDepth);
    float linSubMin = linearizeDepth(minSubRawDepth);
    float linSubMax = linearizeDepth(maxSubRawDepth);
    // Favor foreground sub-quadrant when a thin character/vehicle contour crosses the cell
    float fgSnap = smoothstep(0.014, 0.055, linCenterOnly - linSubMin);
    float centerLinDepth = mix(linCenterOnly, linSubMin, fgSnap * 0.72);
    // Perspective depth is nonlinear: 0.9994 already excludes valid distant
    // geometry. Only the cleared far-plane value (1.0) represents empty sky.
    float foregroundDepth = min(rawCenterDepth, minSubRawDepth);
    float isGeometry = 1.0 - step(0.9999999, foregroundDepth);
    float subDepthPeak = clamp((linSubMax - linSubMin) * 9.5, 0.0, 1.15) * isGeometry;

    // 2. Atmospheric Depth Layering & Far-Plane Suppression (dark background with light points)
    float depthDelta = abs(centerLinDepth - uDofFocus);
    float dofBlurFactor = clamp(depthDelta * uDofStrength * 2.0, 0.0, 0.68) * isGeometry;

    if (dofBlurFactor > 0.02) {
      vec2 blurStep = cellUvSpan * (1.0 + dofBlurFactor * 1.25);
      vec3 farSample = 0.25 * (
        texture2D(tScene, clamp(cellCenterUv + vec2( blurStep.x, 0.0), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(-blurStep.x, 0.0), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(0.0,  blurStep.y), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(0.0, -blurStep.y), 0.001, 0.999)).rgb
      );
      sceneCol = mix(sceneCol, farSample, dofBlurFactor * 0.52);
    }

    // Gentle atmospheric depth haze that preserves background architecture & skyline continuity
    // instead of blacking out distant facades into disconnected floating blocks
    if (uVolumeWrapStrength > 0.5 && isGeometry > 0.5) {
      float farFade = smoothstep(0.52, 0.96, centerLinDepth) * (1.0 - uDaylight * 0.85);
      float emissiveKeep = smoothstep(0.32, 0.85, getLuma(sceneCol + bloomCol * 1.15));
      sceneCol *= mix(1.0, 0.86, farFade * (1.0 - emissiveKeep));
    }

    // 3. Dual 3x3 Sobel Silhouette & Crease Detection + Balanced Foreground Silhouette Moat
    // Floor stepUv to 1.15 supersampled texels so 2.0px micro-cells still sample crisp Sobel gradients
    vec2 stepUv = max((cellSize * 0.85) / uResolution, uSceneTexelSize * 1.15);

    float dTL = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(-stepUv.x,  stepUv.y), 0.001, 0.999)).r);
    float dTC = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( 0.0,       stepUv.y), 0.001, 0.999)).r);
    float dTR = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( stepUv.x,  stepUv.y), 0.001, 0.999)).r);
    float dML = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(-stepUv.x,  0.0     ), 0.001, 0.999)).r);
    float dMR = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( stepUv.x,  0.0     ), 0.001, 0.999)).r);
    float dBL = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(-stepUv.x, -stepUv.y), 0.001, 0.999)).r);
    float dBC = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( 0.0,      -stepUv.y), 0.001, 0.999)).r);
    float dBR = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( stepUv.x, -stepUv.y), 0.001, 0.999)).r);

    float gxD = (dTR + 2.0 * dMR + dBR) - (dTL + 2.0 * dML + dBL);
    float gyD = (dTL + 2.0 * dTC + dTR) - (dBL + 2.0 * dBC + dBR);
    float depthEdgeMag = length(vec2(gxD, gyD)) * 13.5;

    // Distinguish outer background side vs inner foreground side of 3D depth silhouettes:
    // Tightly scope silhouetteOuterMoat to close focal subjects so background structures never fragment
    float minNeighborDepth = min(min(min(dTL, dTC), min(dTR, dML)), min(min(dMR, dBL), min(dBC, dBR)));
    float maxNeighborDepth = max(max(max(dTL, dTC), max(dTR, dML)), max(max(dMR, dBL), max(dBC, dBR)));
    float silhouetteOuterMoat =
      uVolumeWrapStrength *
      smoothstep(0.022, 0.075, centerLinDepth - minNeighborDepth) *
      (1.0 - smoothstep(0.22, 0.44, minNeighborDepth));
    float silhouetteInnerRim =
      uVolumeWrapStrength *
      isGeometry *
      smoothstep(0.016, 0.062, maxNeighborDepth - centerLinDepth) *
      (1.0 - smoothstep(0.55, 0.88, centerLinDepth));

    vec4 normalCenterSample = texture2D(tNormal, cellCenterUv);
    vec3 nCenterEnc = normalCenterSample.xyz;
    // Road is tagged in Pass 2 alpha; no screen-position or normal heuristic,
    // so sidewalks, the character, and car retain their own tonal response.
    float roadMask = (1.0 - smoothstep(0.15, 0.85, normalCenterSample.a)) * isGeometry * uVolumeWrapStrength;
    vec3 nSubBL = texture2D(tNormal, clamp(cellCenterUv + vec2(-subQuadOffset.x, -subQuadOffset.y), 0.001, 0.999)).xyz;
    vec3 nSubBR = texture2D(tNormal, clamp(cellCenterUv + vec2( subQuadOffset.x, -subQuadOffset.y), 0.001, 0.999)).xyz;
    vec3 nSubTL = texture2D(tNormal, clamp(cellCenterUv + vec2(-subQuadOffset.x,  subQuadOffset.y), 0.001, 0.999)).xyz;
    vec3 nSubTR = texture2D(tNormal, clamp(cellCenterUv + vec2( subQuadOffset.x,  subQuadOffset.y), 0.001, 0.999)).xyz;
    vec3 nSubIntegrated = (nSubBL + nSubBR + nSubTL + nSubTR) * 0.20 + nCenterEnc * 0.20;
    vec3 subGxN = (nSubTR + nSubBR) - (nSubTL + nSubBL);
    vec3 subGyN = (nSubTL + nSubTR) - (nSubBL + nSubBR);
    float subNormalPeak =
      length(vec2(dot(subGxN, vec3(0.38, 0.38, 0.24)), dot(subGyN, vec3(0.38, 0.38, 0.24)))) *
      0.52 *
      isGeometry;

    vec3 nTL = texture2D(tNormal, clamp(cellCenterUv + vec2(-stepUv.x,  stepUv.y), 0.001, 0.999)).xyz;
    vec3 nTC = texture2D(tNormal, clamp(cellCenterUv + vec2( 0.0,       stepUv.y), 0.001, 0.999)).xyz;
    vec3 nTR = texture2D(tNormal, clamp(cellCenterUv + vec2( stepUv.x,  stepUv.y), 0.001, 0.999)).xyz;
    vec3 nML = texture2D(tNormal, clamp(cellCenterUv + vec2(-stepUv.x,  0.0     ), 0.001, 0.999)).xyz;
    vec3 nMR = texture2D(tNormal, clamp(cellCenterUv + vec2( stepUv.x,  0.0     ), 0.001, 0.999)).xyz;
    vec3 nBL = texture2D(tNormal, clamp(cellCenterUv + vec2(-stepUv.x, -stepUv.y), 0.001, 0.999)).xyz;
    vec3 nBC = texture2D(tNormal, clamp(cellCenterUv + vec2( 0.0,      -stepUv.y), 0.001, 0.999)).xyz;
    vec3 nBR = texture2D(tNormal, clamp(cellCenterUv + vec2( stepUv.x, -stepUv.y), 0.001, 0.999)).xyz;

    vec3 gxNVec = (nTR + 2.0 * nMR + nBR) - (nTL + 2.0 * nML + nBL);
    vec3 gyNVec = (nTL + 2.0 * nTC + nTR) - (nBL + 2.0 * nBC + nBR);
    float gxN = dot(gxNVec, vec3(0.38, 0.38, 0.24));
    float gyN = dot(gyNVec, vec3(0.38, 0.38, 0.24));
    float normalEdgeMag = max(length(vec2(gxN, gyN)) * 0.38 * isGeometry, subNormalPeak * 0.72);
    depthEdgeMag = max(depthEdgeMag, subDepthPeak * 0.78);

    // 4. Reconstruct Normal-Mapped Surface Orientation & View-Space Directional Lighting
    vec3 rawViewN = normalize(nSubIntegrated * 2.0 - 1.0 + vec3(0.0, 0.0, 0.0001));
    vec3 macroViewN = normalize(((nTC + nBC + nML + nMR) * 0.25) * 2.0 - 1.0 + vec3(0.0, 0.0, 0.0001));
    // Distance-filter micro-normals into macro planar normals so distant facades never alias into static
    vec3 viewN = normalize(mix(rawViewN, macroViewN, smoothstep(0.24, 0.74, centerLinDepth) * 0.68));

    // Exact surface slope relative to world gravity '+Y' (independent of camera pitch or orbit)
    float worldUpY = clamp(dot(viewN, uWorldUpViewDir), -1.0, 1.0);
    vec2 normalTilt = (viewN - uWorldUpViewDir * worldUpY).xy;
    float upwardSurfaceMask =
      uVolumeWrapStrength *
      isGeometry *
      smoothstep(0.68, 0.90, worldUpY) *
      (1.0 - smoothstep(0.62, 0.92, centerLinDepth));

    // Directional key & rim incidence (Lambertian N*L, back-facing self-occlusion, Blinn-Phong N*H, Fresnel rim)
    float rawKeyDot = dot(viewN, uKeyLightViewDir);
    float keyNdotL = clamp(rawKeyDot, 0.0, 1.0);
    float keyAway = clamp(-rawKeyDot, 0.0, 1.0);
    float rimNdotL = clamp(dot(viewN, uRimLightViewDir), 0.0, 1.0);
    vec3 halfVec = normalize(uKeyLightViewDir + vec3(0.0, 0.0, 1.0));
    float specPower = mix(22.0, 44.0, uWetness);
    float normalSpec = pow(max(dot(viewN, halfVec), 0.0), specPower) * mix(0.035, 0.075, uWetness) * uReflectionStrength;
    float grazingRim = pow(1.0 - clamp(abs(viewN.z), 0.0, 1.0), 2.15) * (0.36 + 0.64 * rimNdotL) * 0.105;
    float hemiCatch = worldUpY * 0.038;

    // Suppress fine internal bevel noise on far facades while letting architectural creases read clearly
    float creaseLightCatch = 0.64 + 0.58 * max(keyNdotL, rimNdotL);
    float depthCreaseAtten = mix(1.0, 0.34, smoothstep(0.24, 0.78, centerLinDepth));
    float effectiveNormalEdge = normalEdgeMag * depthCreaseAtten * creaseLightCatch * (1.0 - silhouetteOuterMoat * 0.75);
    float effectiveDepthEdge = depthEdgeMag * (1.0 - silhouetteOuterMoat * 0.65);
    float combinedEdge = max(effectiveDepthEdge, effectiveNormalEdge) * uEdgeStrength * (1.0 - dofBlurFactor * 0.45);
    vec2 domGrad = effectiveDepthEdge >= effectiveNormalEdge ? vec2(gxD, gyD) : vec2(gxN, gyN);

    vec3 groundRefl = sampleGroundReflection(cellCenterUv, cellIndex, cellUvSpan, upwardSurfaceMask, normalTilt);

    // Calibrated linear structural floor on real 3D geometry so roofs/walls/streets read as connected 3D mass
    vec3 structuralMassFloor =
      uCoolTint *
      mix(0.085, 0.22, uDaylight) *
      (0.60 + 0.40 * clamp(worldUpY * 0.5 + 0.5, 0.0, 1.0)) *
      isGeometry *
      uVolumeWrapStrength;
    // The generic structural floor otherwise lifts dark asphalt toward concrete.
    // Retain the textured road signal (including lane markings) instead.
    vec3 baseGeomCol = mix(max(sceneCol, structuralMassFloor), sceneCol, roadMask);

    // Contained typographic light halo: bloom lifts nearby character indices into crisp bright glyphs
    vec3 haloLift = bloomCol * (uBloomIntensity * 0.45);
    vec3 combinedHdr = baseGeomCol + haloLift + groundRefl * mix(0.92, 1.12, uWetness);

    // Modulate scene radiance by directional surface orientation so 90-degree return walls separate cleanly
    if (uVolumeWrapStrength > 0.5 && isGeometry > 0.5) {
      float emissiveKeep = smoothstep(0.55, 0.96, getLuma(combinedHdr));
      float planarFactor = mix(
        1.0 + (keyNdotL * 0.26 - keyAway * 0.16 + hemiCatch * 1.65) * uNormalReliefStrength,
        1.0,
        emissiveKeep
      );
      combinedHdr = combinedHdr * clamp(planarFactor, 0.80, 1.32) + vec3(normalSpec * 0.56 * uNormalReliefStrength);
    }

    // Soft-shoulder tone curve in linear space + perceptual sRGB transfer for urban 3D offscreen target
    // (Pass 1 renders linear radiance into HalfFloatType and Pass 4 writes directly to sRGB framebuffer)
    vec3 combinedSignal;
    if (uVolumeWrapStrength > 0.5) {
      vec3 workingHdr = isGeometry > 0.5
        ? combinedHdr
        : (max(sceneCol - uBgColor * 1.04, vec3(0.0)) + haloLift);
      float exposureGain = mix(0.85, 0.65, uDaylight);
      vec3 exposedLinear = (workingHdr * exposureGain) / (vec3(1.0) + workingHdr * exposureGain);
      combinedSignal = linearToSrgb(exposedLinear);
    } else {
      combinedSignal = (combinedHdr / (vec3(1.0) + combinedHdr * 0.36)) * 1.28;
    }

    // Selective chromatic discipline: cohesive stone/asphalt base with amber, cyan & moss accents
    float rawLuma = getLuma(combinedSignal);
    float warmAccentMask = clamp((combinedHdr.r - combinedHdr.b) * 1.85, 0.0, 1.0);
    float coolCyanMask = clamp((combinedHdr.b - combinedHdr.r) * 1.65, 0.0, 1.0);
    float foliageMask = clamp((combinedHdr.g - max(combinedHdr.r * 0.90, combinedHdr.b * 0.94)) * 2.65, 0.0, 1.0);
    float baseSatKeep = mix(mix(0.60, 0.76, uDaylight), 0.96, max(max(warmAccentMask, foliageMask), coolCyanMask * 0.86));
    if (uVolumeWrapStrength > 0.5) {
      combinedSignal = mix(vec3(rawLuma), combinedSignal, baseSatKeep);
    }

    // Gate directional 3D normal relief so sky stays calm while 3D forms wrap with volume
    float litGate = smoothstep(0.04, 0.24, rawLuma);
    float directionalRelief =
      (keyNdotL * 0.072 - keyAway * 0.044 + hemiCatch + grazingRim * 1.15 + normalSpec) * uNormalReliefStrength;
    float volumeRelief =
      (directionalRelief * litGate + silhouetteInnerRim * 0.045) *
      isGeometry *
      uVolumeWrapStrength;

    // Perceptual value hierarchy across day / night / rain and micro-cells (down to 2px–4px):
    // - Sky/void ('isGeometry == 0') stays clean unless crossed by bloom halos or rain streaks
    // - Every 3D surface clears the 4 leading empty spaces of DEFAULT_ASCII_RAMP and preserves mass at 4px
    // - Foreground focal subjects ('silhouetteOuterMoat') get a subtle, non-destructive contrast cushion
    float shapedLuma = clamp(getLuma(combinedSignal), 0.0, 1.0);
    if (uVolumeWrapStrength > 0.5) {
      if (isGeometry > 0.5) {
        shapedLuma = pow(max(shapedLuma, 0.0001), mix(1.02, 1.06, uDaylight));
        float geomMinLuma = mix(0.13, 0.16, uDaylight) + cellDensitySupport * 0.04;
        shapedLuma = mix(geomMinLuma, 0.84, clamp((shapedLuma - 0.10) / 0.88, 0.0, 1.0));
        float highlightProtect = smoothstep(0.54, 0.90, shapedLuma);
        float moatAtten = mix(0.80, 0.90, max(uDaylight, cellDensitySupport));
        shapedLuma *= mix(1.0, moatAtten, silhouetteOuterMoat * (1.0 - highlightProtect));
      } else {
        shapedLuma = smoothstep(0.05, 0.88, shapedLuma) * (1.0 - uDaylight * 0.35);
      }
    } else {
      shapedLuma = pow(shapedLuma, 0.82);
    }

    float luma = clamp(shapedLuma + volumeRelief, 0.0, 1.0);

    // 5. Graduated Surface Glyph Fill + Highlight Sparkles ('*', 'o') + Directional Contours ('|', '/', '', '-', '+')
    float varietyJitter = 0.0;
    if (uVolumeWrapStrength > 0.5) {
      // Restrained planar jitter so surfaces display smooth graduated glyph progressions across light falloff
      float midtoneEnvelope =
        smoothstep(0.14, 0.30, luma) *
        (1.0 - smoothstep(0.88, 0.985, luma)) *
        (1.0 - clamp(combinedEdge * 1.25, 0.0, 1.0)) *
        smoothstep(0.08, 0.22, centerLinDepth);
      vec2 normalSector = floor(macroViewN.xy * 2.5 + 0.5);
      float wordClusterHash = glyphVarietyHash(
        floor(vec2(cellIndex.x * 0.24, cellIndex.y * 0.48)) + normalSector * 4.1 + vec2(11.7, 5.3)
      );
      float cellSubtleHash = glyphVarietyHash(cellIndex * 0.85 + vec2(3.1, 7.9));
      float blendedHash = wordClusterHash * 0.84 + cellSubtleHash * 0.16;
      float wetRippleShift =
        upwardSurfaceMask * uWetness * sin(cellIndex.y * 1.35 - uTime * 1.8 + normalTilt.x * 4.0) * 0.85;
      varietyJitter = (blendedHash * 1.45 + wetRippleShift) * midtoneEnvelope * (1.0 - cellDensitySupport * 0.65);
    }

    float detailTileIndex = floor(luma * (uRampCount - 1.0) + 0.5 + varietyJitter);
    detailTileIndex = clamp(detailTileIndex, 0.0, uRampCount - 1.0);

    // Curated '*' and 'o' highlight accents on light halos, wet ground reflections & storm rain particles
    bool isSparkleHighlight = false;
    if (uVolumeWrapStrength > 0.5) {
      float nocturnalBoost = mix(1.0, 0.22, uDaylight);
      float bloomLuma = getLuma(bloomCol);
      float reflLuma = getLuma(groundRefl);
      float sparkleNoise = glyphVarietyHash(cellIndex + floor(uTime * 2.2) * vec2(0.0, uWetness > 0.85 ? 1.0 : 0.0));
      float staticSparkle = glyphVarietyHash(cellIndex * 1.13 + vec2(17.3, 9.1));

      // Wet ground reflection glints ('*' on bright ripple crests, 'o' on soft wet shimmer)
      bool wetReflAccent =
        upwardSurfaceMask > 0.35 &&
        reflLuma > 0.065 &&
        luma > 0.22 &&
        luma < 0.88 &&
        staticSparkle > mix(0.32, 0.14, uWetness);

      // Light-source halo & lamp/headlight aura points ('*' / 'o' around warm/cyan emitters at night/rain)
      bool haloAccent =
        nocturnalBoost > 0.5 &&
        bloomLuma > 0.075 &&
        luma > 0.26 &&
        luma < 0.84 &&
        staticSparkle > 0.24;

      // Falling rain particle & mist droplet glints in 'rain' mode
      bool rainParticleAccent =
        uWetness > 0.85 &&
        subDepthPeak > 0.26 &&
        luma > 0.24 &&
        sparkleNoise > 0.16;

      if (wetReflAccent || haloAccent || rainParticleAccent) {
        bool pickStar =
          (luma > 0.56 && staticSparkle > 0.28) ||
          (rainParticleAccent && sparkleNoise > 0.30) ||
          (reflLuma > 0.18);
        detailTileIndex = clamp(pickStar ? uHighlightGlyphs.x : uHighlightGlyphs.y, 0.0, uRampCount - 1.0);
        isSparkleHighlight = true;
      }
    }

    // Geometrically-aligned directional structural contours ('|', '/', '', '-', '+')
    float edgeThresh = uVolumeWrapStrength > 0.5 ? mix(0.44, 0.52, cellDensitySupport) : 0.30;
    bool isStrongSilhouette = (effectiveDepthEdge * uEdgeStrength) > 0.36;
    bool allowGroundCurbEdge = combinedEdge > 0.68;
    bool useStructuralEdge =
      (isStrongSilhouette || combinedEdge > edgeThresh) &&
      (luma > 0.06 || silhouetteInnerRim > 0.28) &&
      (silhouetteOuterMoat < 0.65) &&
      (uStructCount >= 4.0) &&
      (upwardSurfaceMask < 0.52 || allowGroundCurbEdge);

    if (useStructuralEdge) {
      // Tangent vector to gradient (gx, gy) is (-gy, gx); angle in [0..180) from +X horizontal axis
      float tangentAngle = atan(domGrad.x, -domGrad.y);
      float deg = mod(degrees(tangentAngle) + 180.0, 180.0);

      float absGx = abs(domGrad.x);
      float absGy = abs(domGrad.y);
      float cornerRatio = min(absGx, absGy) / max(max(absGx, absGy), 0.0001);

      float structOffset = 0.0; // '|' vertical (67.5..112.5 deg)
      if (uVolumeWrapStrength > 0.5 && uStructCount >= 5.0 && cornerRatio > 0.72 && combinedEdge > edgeThresh * 1.32 && subNormalPeak > 0.22) {
        structOffset = 4.0; // '+' orthogonal structural corner / frame junction
      } else if (deg >= 22.5 && deg < 67.5) {
        structOffset = 1.0; // '/' rising diagonal
      } else if (deg >= 67.5 && deg < 112.5) {
        structOffset = 0.0; // '|' vertical edge
      } else if (deg >= 112.5 && deg < 157.5) {
        structOffset = 2.0; // '' falling diagonal
      } else {
        structOffset = 3.0; // '-' horizontal roof, lintel, curb, step
      }
      detailTileIndex = uRampCount + min(structOffset, uStructCount - 1.0);
      isSparkleHighlight = false;
    }

    float detailGlyphMask = sampleAtlasTile(detailTileIndex, glyphUv, cellSize);

    // 6. GPU Lighten Stipple-Detail Blend (adaptive halftone support preserves solid surface mass at 4px)
    float compositeGlyphMask = detailGlyphMask;
    float stippleGate = uVolumeWrapStrength > 0.5 ? mix(0.24, 0.14, cellDensitySupport) : 0.065;
    float effectiveBlockWeight = uVolumeWrapStrength > 0.5
      ? clamp(uBlockBlendWeight + cellDensitySupport * 0.24, 0.0, 0.46)
      : uBlockBlendWeight;
    if (uBlockCount >= 3.0 && effectiveBlockWeight > 0.001 && luma > stippleGate && !isSparkleHighlight) {
      float blockTier = clamp(floor(smoothstep(stippleGate, 0.96, luma) * 3.0), 0.0, min(2.0, uBlockCount - 2.0));
      float blockTileIndex = uRampCount + uStructCount + blockTier;
      float blockMask = sampleAtlasTile(blockTileIndex, glyphUv, cellSize) * effectiveBlockWeight;
      compositeGlyphMask = max(detailGlyphMask, blockMask);
    }
    // Preserve stable micro-engraving luminance density when cell size enters the small range (2.0px–5.5px)
    if (cellDensitySupport > 0.01 && isGeometry > 0.5) {
      float microDensityFloor = smoothstep(0.10, 0.86, luma) * (useStructuralEdge ? 0.84 : 0.62);
      compositeGlyphMask = mix(compositeGlyphMask, max(compositeGlyphMask, microDensityFloor), cellDensitySupport * 0.48);
    }

    // 7. Calibrated Perceptual Foreground Ink, Accents & Grounded 3D Tonal Underlayer
    vec3 coolTintOut = uVolumeWrapStrength > 0.5 ? linearToSrgb(uCoolTint) : uCoolTint;
    vec3 warmTintOut = uVolumeWrapStrength > 0.5 ? linearToSrgb(uWarmTint) : uWarmTint;
    vec3 bgColorOut = uVolumeWrapStrength > 0.5 ? linearToSrgb(uBgColor) : uBgColor;

    vec3 normColor = combinedSignal / max(rawLuma, 0.08);
    normColor = clamp(normColor, vec3(0.32), vec3(1.42));

    vec3 shadowGrade = mix(normColor, coolTintOut * 1.06, 0.34);
    vec3 highlightGrade = mix(normColor, warmTintOut * 1.10, 0.18);
    vec3 charColor = mix(shadowGrade, highlightGrade, smoothstep(0.14, 0.82, luma));

    if (uVolumeWrapStrength > 0.5) {
      // Warm golden-amber ink on storefront lights, streetlamps & headlight halos
      vec3 amberInk = vec3(1.06, 0.82, 0.48);
      charColor = mix(charColor, mix(charColor, amberInk, 0.54), warmAccentMask * smoothstep(0.18, 0.82, luma));

      // Contained cool cyber-slate/cyan accent on neon trim, rain streaks & wet reflections
      vec3 cyanInk = vec3(0.62, 0.87, 0.97);
      charColor = mix(charColor, mix(charColor, cyanInk, 0.40), coolCyanMask * smoothstep(0.18, 0.82, luma));

      // Readable emerald / sage ink on tree canopies & grass planters
      vec3 mossInk = mix(vec3(0.34, 0.72, 0.46), vec3(0.42, 0.78, 0.50), uDaylight);
      charColor = mix(charColor, mix(charColor, mossInk, 0.52), foliageMask * (1.0 - warmAccentMask * 0.7));

      // Crisp ivory-white core on peak lights, '*' / 'o' sparkles & character silhouette rims
      float sparkleLift = isSparkleHighlight ? 0.20 : 0.0;
      float peakIvory = max(max(smoothstep(0.82, 0.98, luma) * 0.22, silhouetteInnerRim * 0.12), sparkleLift);
      charColor = mix(charColor, vec3(0.94, 0.93, 0.90), clamp(peakIvory, 0.0, 0.30));
    }

    if (useStructuralEdge) {
      vec3 edgeInk = uVolumeWrapStrength > 0.5
        ? mix(coolTintOut * 1.12, vec3(0.96, 0.98, 1.02), max(silhouetteInnerRim * 0.24, smoothstep(0.32, 0.84, luma) * 0.25))
        : warmTintOut * 1.16;
      charColor = mix(charColor, edgeInk, 0.34 * clamp(combinedEdge, 0.0, 1.0));
    }

    // Readable structural ink across shadowed streets/walls and bright sunlit/nocturnal focal planes
    float brightness = uVolumeWrapStrength > 0.5
      ? mix(mix(0.38, 0.43, uDaylight), 0.88, smoothstep(0.08, 0.86, luma))
      : mix(0.18, 1.24, smoothstep(0.02, 0.94, luma));
    vec3 litGlyph = charColor * brightness * compositeGlyphMask;

    // Grounded 3D Tonal Base Underneath Glyphs ('smoothBackdrop'):
    // Gives solid continuous 3D mass to streets, sidewalks, facades, trees & characters even at 4px cell size
    vec3 deepVoid = uVolumeWrapStrength > 0.5 ? bgColorOut * mix(0.92, 1.0, uDaylight) : bgColorOut;
    float formUnderlayerStrength = uVolumeWrapStrength > 0.5
      ? (mix(0.28, 0.44, uDaylight) + cellDensitySupport * 0.14) * isGeometry * (1.0 - silhouetteOuterMoat * 0.35)
      : mix(0.036, 0.095, uDaylight);
    vec3 perceptualBase = uVolumeWrapStrength > 0.5
      ? mix(vec3(luma), normColor * luma, 0.58)
      : mix(vec3(getLuma(combinedSignal)), combinedSignal, 0.58);
    vec3 tonedUnderlayer = perceptualBase * formUnderlayerStrength;
    vec3 smoothBackdrop = mix(
      deepVoid,
      deepVoid * (1.0 - formUnderlayerStrength * 0.45 * isGeometry) + tonedUnderlayer,
      smoothstep(0.06, 0.64, luma)
    );
    smoothBackdrop *= mix(1.0, mix(0.84, 0.92, max(uDaylight, cellDensitySupport)), silhouetteOuterMoat);

    vec2 vigUv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vigUv, vigUv) * mix(0.09, 0.035, uDaylight);

    vec3 finalRgb = mix(smoothBackdrop, litGlyph, clamp(compositeGlyphMask, 0.0, 1.0));
    // Glyph-locked halo aura (subtle ambient + glyph-masked glow around streetlamps/headlights)
    vec3 bloomSrgb = uVolumeWrapStrength > 0.5 ? linearToSrgb(bloomCol * 0.85) : bloomCol;
    finalRgb += bloomSrgb * (uBloomIntensity * mix(0.26, 0.10, uDaylight) * (0.10 + 0.90 * compositeGlyphMask));
    finalRgb *= clamp(vignette, 0.86, 1.0);
    // Reserve output headroom: prevent bloom and glyph ink from clipping to white.
    if (uVolumeWrapStrength > 0.5) {
      finalRgb = max(finalRgb, vec3(0.0));
      finalRgb = min(finalRgb, vec3(0.70)) + vec3(0.24) * (vec3(1.0) - exp(-max(finalRgb - vec3(0.70), vec3(0.0)) / 0.24));
    }

    // Bound only road radiance after glyph ink, bloom and reflections have been
    // combined. A smooth luminance shoulder keeps markings/glints visible while
    // preventing local lamps from making foreground asphalt sidewalk-gray.
    float roadLuma = getLuma(finalRgb);
    vec3 darkRoad = finalRgb * (0.32 / (0.32 + roadLuma));
    finalRgb = mix(finalRgb, darkRoad, roadMask);
    gl_FragColor = vec4(finalRgb, 1.0);
  }
`,KM='"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';function Fh(a,e,t,n=64){const i=a.length>=2?a:" .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",s=e.length>=4?e:"|/\\-+",r=4,o=i.length+s.length,l=o+r,c=Math.max(48,Math.min(128,Math.round(n/8)*8)),h=Math.round(c*.625),u=Math.round(c*.86),d=Math.round(c*.94),f=document.createElement("canvas");f.width=h*l,f.height=c;const p=f.getContext("2d",{alpha:!1});if(!p)throw new Error("[AsciiSceneEngine] Unable to create 2D Canvas context for glyph atlas.");"imageSmoothingEnabled"in p&&(p.imageSmoothingEnabled=!0),"imageSmoothingQuality"in p&&(p.imageSmoothingQuality="high"),p.fillStyle="#000000",p.fillRect(0,0,f.width,f.height);const v=t||KM;p.fillStyle="#FFFFFF",p.textAlign="center",p.textBaseline="middle";const g=i+s;for(let b=0;b<o;b++){const T=g[b]??" ";if(T===" ")continue;const R=b>=i.length;p.font=`${R?700:600} ${R?d:u}px ${v}`,typeof p.save=="function"&&typeof p.beginPath=="function"&&typeof p.clip=="function"?(p.save(),p.beginPath(),p.rect(b*h+2,1,Math.max(1,h-4),Math.max(1,c-2)),p.clip(),p.fillText(T,b*h+h*.5,c*.52),p.restore()):p.fillText(T,b*h+h*.5,c*.52)}const m=4,y=8,_=h/m,x=c/y;for(let b=0;b<r;b++){const T=(o+b)*h;if(b===3){p.fillStyle="#FFFFFF",p.fillRect(T,0,h,c);continue}const R=b===0?.28:b===1?.54:.8;p.fillStyle="#FFFFFF";for(let S=0;S<y;S++)for(let M=0;M<m;M++)((M&1)<<2|(S&1)<<3|(M&2)>>1|S&2)/16<R&&p.fillRect(Math.round(T+M*_),Math.round(S*x),Math.ceil(_),Math.ceil(x))}const E=new vf(f);return E.minFilter=Je,E.magFilter=Je,E.wrapS=Et,E.wrapT=Et,E.generateMipmaps=!1,E.needsUpdate=!0,{texture:E,rampCount:i.length,structuralCount:s.length,blockCount:r,totalGlyphs:l,tileSize:c,tileWidth:h,tileHeight:c}}function El(a,e,t,n){const i=(a%t+t)%t,s=(e%t+t)%t;let r=Math.imul(i+37,374761393)+Math.imul(s+17,668265263)+Math.imul(n,1442695041);return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967295}function ia(a,e,t,n){const i=a*t,s=e*t,r=Math.floor(i),o=Math.floor(s),l=i-r,c=s-o,h=l*l*(3-2*l),u=c*c*(3-2*c),d=El(r,o,t,n),f=El(r+1,o,t,n),p=El(r,o+1,t,n),v=El(r+1,o+1,t,n),g=d+(f-d)*h,m=p+(v-p)*h;return g+(m-g)*u}function Cl(a,e,t,n,i){const s=new Float32Array(a*a);for(let l=0;l<a;l++){const c=l/a;for(let h=0;h<a;h++){const u=h/a;s[l*a+h]=i(u,c)}}const r=new Uint8Array(a*a*4);for(let l=0;l<a;l++){const c=(l-1+a)%a,h=(l+1)%a;for(let u=0;u<a;u++){const d=(u-1+a)%a,f=(u+1)%a,p=s[l*a+d],v=s[l*a+f],g=s[c*a+u],m=s[h*a+u],y=-(v-p)*e,_=-(m-g)*e,x=1,E=1/Math.hypot(y,_,x),b=(l*a+u)*4;r[b]=Math.round(ze.clamp((y*E*.5+.5)*255,0,255)),r[b+1]=Math.round(ze.clamp((_*E*.5+.5)*255,0,255)),r[b+2]=Math.round(ze.clamp((x*E*.5+.5)*255,0,255)),r[b+3]=255}}const o=new Qt(r,a,a,vt,yn);return o.colorSpace=An,o.wrapS=Tn,o.wrapT=Tn,o.magFilter=Je,o.minFilter=Je,o.generateMipmaps=!1,o.repeat.set(t,n),o.needsUpdate=!0,o}function qp(a=64){const e=Cl(a,2.4,8,8,(s,r)=>{const o=ia(s,r,8,11)*.55,l=ia(s,r,16,29)*.3,c=Math.cos(s*Math.PI*4)*.15;return o+l+c}),t=Cl(a,2.8,6,6,(s,r)=>{const o=s*2%1,l=r*2%1,c=Math.min(o,1-o),h=Math.min(l,1-l),u=ze.smoothstep(c,0,.075),d=ze.smoothstep(h,0,.075),f=Math.min(u,d),p=ia(s,r,12,47)*.14;return f*.86+p}),n=Cl(a,2.6,4,4,(s,r)=>{const o=Math.floor(r*4),l=r*4%1,c=(s*2+o%2*.5)%1,h=ze.smoothstep(Math.min(l,1-l),0,.085),u=ze.smoothstep(Math.min(c,1-c),0,.065),d=Math.min(h,u),f=ia(s,r,8,73)*.12;return d*.88+f}),i=Cl(a,1.65,3,3,(s,r)=>{const o=Math.sin(s*Math.PI*4)*.35+Math.cos(r*Math.PI*2)*.35,l=ia(s,r,6,101)*.3;return o+l});return{asphalt:e,pavement:t,facade:n,contourTrim:i,dispose(){e.dispose(),t.dispose(),n.dispose(),i.dispose()}}}class Zp{constructor(){D(this,"fallbackMaterial",new pl);D(this,"bySourceUuid",new Map);D(this,"swappedMeshes",[]);D(this,"hiddenObjects",[])}beginPass(e){this.swappedMeshes.length=0,this.hiddenObjects.length=0,e.traverseVisible(t=>{var r;if(((r=t.userData)==null?void 0:r.skipNormalPass)===!0||t.isPoints===!0||t.isLine===!0){this.hiddenObjects.push(t);return}if(!t.isMesh)return;const n=t,i=n.material;if((Array.isArray(i)?i:[i]).some(o=>o&&o.alphaTest>0)){this.hiddenObjects.push(n);return}this.swappedMeshes.push({mesh:n,originalMaterial:i}),Array.isArray(i)?n.material=i.map(o=>this.resolveNormalMaterial(o)):n.material=this.resolveNormalMaterial(i)});for(let t=0;t<this.hiddenObjects.length;t++)this.hiddenObjects[t].visible=!1}endPass(){for(let e=0;e<this.swappedMeshes.length;e++){const t=this.swappedMeshes[e];t.mesh.material=t.originalMaterial}this.swappedMeshes.length=0;for(let e=0;e<this.hiddenObjects.length;e++)this.hiddenObjects[e].visible=!0;this.hiddenObjects.length=0}resolveNormalMaterial(e){var u;if(!e)return this.fallbackMaterial;const t=e,n=(u=t.normalMap)!=null&&u.isTexture?t.normalMap:null,i=e.userData.asciiRoadSurface===!0;if(!n&&!i)return this.fallbackMaterial;const s=t.normalScale?Math.abs(t.normalScale.x):.6,r=t.normalScale?Math.abs(t.normalScale.y):.6,o=s===0?0:ze.clamp(s*.42,.14,.48),l=r===0?0:ze.clamp(r*.42,.14,.48),c=this.bySourceUuid.get(e.uuid);if(c&&c.sourceMap===n)return c.normalMat.normalScale.set(o,l),c.normalMat.side=e.side,c.normalMat.opacity=i?0:1,c.normalMat;c&&c.normalMat.dispose();const h=new pl({normalMap:n,normalMapType:t.normalMapType??jn,normalScale:new Q(o,l),flatShading:t.flatShading===!0,side:e.side,blending:kn,opacity:i?0:1});return this.bySourceUuid.set(e.uuid,{normalMat:h,sourceMap:n}),h}dispose(){this.endPass(),this.fallbackMaterial.dispose();for(const e of this.bySourceUuid.values())e.normalMat.dispose();this.bySourceUuid.clear()}}const Rl=new C,Ll=new C,tr=new C;function Kp(a,e,t,n,i){e.updateMatrixWorld();const s=e.matrixWorldInverse;i.set(0,1,0).transformDirection(s).normalize();let r=null,o=null;for(let l=0;l<a.children.length;l++){const c=a.children[l];c instanceof Vn&&c.visible&&c.intensity>.01&&(c.name==="KeyDirectionalLight"||!r&&c.name!=="RimDirectionalLight"?r=c:(c.name==="RimDirectionalLight"||!o)&&(o=c))}r?(r.getWorldPosition(Rl),r.target.getWorldPosition(Ll),tr.subVectors(Rl,Ll),tr.lengthSq()>1e-6?t.copy(tr.normalize()).transformDirection(s).normalize():t.set(-.48,.72,.5).normalize()):t.set(-.48,.72,.5).normalize(),o?(o.getWorldPosition(Rl),o.target.getWorldPosition(Ll),tr.subVectors(Rl,Ll),tr.lengthSq()>1e-6?n.copy(tr.normalize()).transformDirection(s).normalize():n.set(.58,.42,-.7).normalize()):n.set(.58,.42,-.7).normalize()}class ci{constructor(e,t,n,i=64){D(this,"sceneTarget");D(this,"normalTarget");D(this,"bloomTarget");D(this,"depthTexture");D(this,"normalPassCache",new Zp);D(this,"bloomMaterial");D(this,"compositeMaterial");D(this,"transitionController",new Up(14));D(this,"savedClearColor",new Y);D(this,"quadGeometry");D(this,"bloomQuad");D(this,"compositeQuad");D(this,"postScene");D(this,"bloomScene");D(this,"orthoCamera");D(this,"atlas");D(this,"currentAtlasSignature","");D(this,"currentBloomDownsample",3);const s=typeof e=="object",r=s?e:n,o=Math.max(2,Math.floor(s?320:e)),l=Math.max(2,Math.floor(s?240:t??240));this.depthTexture=new Eo(o,l),this.depthTexture.type=mi,this.depthTexture.format=gi,this.sceneTarget=new nn(o,l,{minFilter:Je,magFilter:Je,format:vt,type:$n,depthTexture:this.depthTexture,depthBuffer:!0}),this.normalTarget=new nn(o,l,{minFilter:Je,magFilter:Je,format:vt,type:$n,depthBuffer:!0});const c=Math.max(2,Math.floor(o/this.currentBloomDownsample)),h=Math.max(2,Math.floor(l/this.currentBloomDownsample));this.bloomTarget=new nn(c,h,{minFilter:Je,magFilter:Je,format:vt,type:$n,depthBuffer:!1}),this.atlas=Fh(r.characterRamp,r.structuralChars,r.fontFamily,i),this.currentAtlasSignature=this.computeAtlasSignature(r,i),this.orthoCamera=new ks(-1,1,1,-1,0,1),this.quadGeometry=new Ln(2,2),this.bloomMaterial=new Xt({vertexShader:Yp,fragmentShader:qM,uniforms:{tScene:{value:this.sceneTarget.texture},uTexelSize:{value:new Q(1/o,1/l)},uThreshold:{value:r.bloomThreshold}},depthTest:!1,depthWrite:!1});const u=new Y(r.palette.background),d=new Y(r.palette.coolAmbient),f=new Y(r.palette.warmLight);this.compositeMaterial=new Xt({vertexShader:Yp,fragmentShader:ZM,uniforms:{tScene:{value:this.sceneTarget.texture},tNormal:{value:this.normalTarget.texture},tDepth:{value:this.depthTexture},tBloom:{value:this.bloomTarget.texture},tGlyphAtlas:{value:this.atlas.texture},uResolution:{value:new Q(o,l)},uSceneTexelSize:{value:new Q(1/o,1/l)},uCellPixelSize:{value:new Q(6,10)},uCellCssSize:{value:6.5},uAtlasTileSize:{value:new Q(this.atlas.tileWidth,this.atlas.tileHeight)},uSubCellSpread:{value:.25},uRampCount:{value:this.atlas.rampCount},uStructCount:{value:this.atlas.structuralCount},uBlockCount:{value:this.atlas.blockCount},uTotalGlyphs:{value:this.atlas.totalGlyphs},uHighlightGlyphs:{value:ci.resolveHighlightGlyphIndices(r.characterRamp)},uEdgeStrength:{value:r.edgeStrength},uBlockBlendWeight:{value:r.blockBlendWeight},uBloomIntensity:{value:r.bloomIntensity},uDofFocus:{value:r.dofFocusDistance},uDofStrength:{value:r.dofStrength},uDaylight:{value:r.atmosphere==="day"?1:0},uWetness:{value:ci.resolveWetness(r)},uReflectionStrength:{value:ze.clamp(r.reflectionStrength??.25,0,1)},uCameraNear:{value:.1},uCameraFar:{value:140},uVolumeWrapStrength:{value:r.mode==="mascot"?0:1},uNormalReliefStrength:{value:ci.resolveNormalRelief(r)},uKeyLightViewDir:{value:new C(-.48,.72,.5).normalize()},uRimLightViewDir:{value:new C(.58,.42,-.7).normalize()},uWorldUpViewDir:{value:new C(0,.78,.62).normalize()},uBgColor:{value:u},uCoolTint:{value:d},uWarmTint:{value:f},uTime:{value:0}},depthTest:!1,depthWrite:!1}),this.bloomQuad=new Le(this.quadGeometry,this.bloomMaterial),this.bloomScene=new Ws,this.bloomScene.add(this.bloomQuad),this.compositeQuad=new Le(this.quadGeometry,this.compositeMaterial),this.postScene=new Ws,this.postScene.add(this.compositeQuad)}static resolveWetness(e){return e.mode==="mascot"?0:e.atmosphere==="rain"?1:e.atmosphere==="day"?.08:.55}static resolveNormalRelief(e){return e.mode==="mascot"?.72:e.atmosphere==="day"?1.12:e.atmosphere==="rain"?1.06:1}static resolveHighlightGlyphIndices(e){const t=e.indexOf("*"),n=e.indexOf("o"),i=e.indexOf("+"),s=Math.max(0,Math.floor(e.length*.34));return new C(t>=0?t:s,n>=0?n:s+1,i>=0?i:Math.max(0,s-2))}computeAtlasSignature(e,t){return`${e.characterRamp}::${e.structuralChars}::${e.fontFamily}::${t}`}rebuildAtlasIfNeeded(e,t,n=!1){const i=this.computeAtlasSignature(e,t);if(!n&&i===this.currentAtlasSignature)return;const s=this.atlas;this.atlas=Fh(e.characterRamp,e.structuralChars,e.fontFamily,t),this.currentAtlasSignature=i,this.compositeMaterial.uniforms.tGlyphAtlas.value=this.atlas.texture,this.compositeMaterial.uniforms.uAtlasTileSize.value.set(this.atlas.tileWidth,this.atlas.tileHeight),this.compositeMaterial.uniforms.uRampCount.value=this.atlas.rampCount,this.compositeMaterial.uniforms.uStructCount.value=this.atlas.structuralCount,this.compositeMaterial.uniforms.uBlockCount.value=this.atlas.blockCount,this.compositeMaterial.uniforms.uTotalGlyphs.value=this.atlas.totalGlyphs,this.compositeMaterial.uniforms.uHighlightGlyphs.value.copy(ci.resolveHighlightGlyphIndices(e.characterRamp)),s.texture.dispose()}applyResolutionProfile(e,t,n=!1){const i=Math.max(2,e.physicalWidth),s=Math.max(2,e.physicalHeight),r=Math.max(2,e.renderTargetWidth||i),o=Math.max(2,e.renderTargetHeight||s);this.currentBloomDownsample=e.bloomDownsample;const l=Math.max(2,Math.floor(i/this.currentBloomDownsample)),c=Math.max(2,Math.floor(s/this.currentBloomDownsample));this.sceneTarget.setSize(r,o),this.normalTarget.setSize(r,o),this.bloomTarget.setSize(l,c),this.bloomMaterial.uniforms.uTexelSize.value.set(1/l,1/c),this.compositeMaterial.uniforms.uSceneTexelSize.value.set(1/r,1/o),this.compositeMaterial.uniforms.uResolution.value.set(i,s),this.transitionController.setTarget(e,n);const h=this.transitionController.step(0);this.compositeMaterial.uniforms.uCellPixelSize.value.set(h.cellW,h.cellH),this.compositeMaterial.uniforms.uCellCssSize.value=e.activeCellSize,this.compositeMaterial.uniforms.uSubCellSpread.value=h.subCellSpread,this.rebuildAtlasIfNeeded(t,e.atlasTileSize,!1)}applyConfig(e,t=!1,n=640,i=360,s=1,r=!1,o=!1){const l=Ih({cssWidth:n,cssHeight:i,devicePixelRatio:s,config:e,isCoarsePointer:r});return this.rebuildAtlasIfNeeded(e,l.atlasTileSize,t),o||this.applyResolutionProfile(l,e,!0),this.bloomMaterial.uniforms.uThreshold.value=e.bloomThreshold,this.compositeMaterial.uniforms.uEdgeStrength.value=e.edgeStrength,this.compositeMaterial.uniforms.uBlockBlendWeight.value=e.blockBlendWeight,this.compositeMaterial.uniforms.uBloomIntensity.value=e.bloomIntensity,this.compositeMaterial.uniforms.uDofFocus.value=e.dofFocusDistance,this.compositeMaterial.uniforms.uDofStrength.value=e.dofStrength,this.compositeMaterial.uniforms.uDaylight.value=e.atmosphere==="day"?1:0,this.compositeMaterial.uniforms.uWetness.value=ci.resolveWetness(e),this.compositeMaterial.uniforms.uReflectionStrength.value=ze.clamp(e.reflectionStrength??.25,0,1),this.compositeMaterial.uniforms.uVolumeWrapStrength.value=e.mode==="mascot"?0:1,this.compositeMaterial.uniforms.uNormalReliefStrength.value=ci.resolveNormalRelief(e),this.compositeMaterial.uniforms.uBgColor.value.set(e.palette.background),this.compositeMaterial.uniforms.uCoolTint.value.set(e.palette.coolAmbient),this.compositeMaterial.uniforms.uWarmTint.value.set(e.palette.warmLight),l}render(e,t,n,i,s=0){var d;if(this.compositeMaterial.uniforms.uTime.value=i,s>0){const f=this.transitionController.step(s);this.compositeMaterial.uniforms.uCellPixelSize.value.set(f.cellW,f.cellH),this.compositeMaterial.uniforms.uSubCellSpread.value=f.subCellSpread}const r=n;r.isPerspectiveCamera&&(this.compositeMaterial.uniforms.uCameraNear.value=r.near,this.compositeMaterial.uniforms.uCameraFar.value=r.far),Kp(t,n,this.compositeMaterial.uniforms.uKeyLightViewDir.value,this.compositeMaterial.uniforms.uRimLightViewDir.value,this.compositeMaterial.uniforms.uWorldUpViewDir.value);const o=(d=e.capabilities)==null?void 0:d.maxTextureSize;if(typeof o=="number"&&o>=512&&(this.sceneTarget.width>o||this.sceneTarget.height>o)){const f=Math.min(o/this.sceneTarget.width,o/this.sceneTarget.height),p=Math.max(2,Math.floor(this.sceneTarget.width*f)),v=Math.max(2,Math.floor(this.sceneTarget.height*f));this.sceneTarget.setSize(p,v),this.normalTarget.setSize(p,v),this.compositeMaterial.uniforms.uSceneTexelSize.value.set(1/p,1/v)}e.setRenderTarget(this.sceneTarget),e.clear(),e.render(t,n);const l=e.info.render.calls,c=e.info.render.triangles,h=t.background,u=e.getClearAlpha();return e.getClearColor(this.savedClearColor),this.normalPassCache.beginPass(t),t.background=null,e.setRenderTarget(this.normalTarget),e.setClearColor(8421631,1),e.clear(),e.render(t,n),this.normalPassCache.endPass(),t.background=h,e.setClearColor(this.savedClearColor,u),e.setRenderTarget(this.bloomTarget),e.clear(),e.render(this.bloomScene,this.orthoCamera),e.setRenderTarget(null),e.clear(),e.render(this.postScene,this.orthoCamera),{drawCalls:l,triangles:c}}dispose(){this.sceneTarget.dispose(),this.normalTarget.dispose(),this.bloomTarget.dispose(),this.depthTexture.dispose(),this.atlas.texture.dispose(),this.normalPassCache.dispose(),this.bloomMaterial.dispose(),this.compositeMaterial.dispose(),this.quadGeometry.dispose()}}const nr="#7DF9FF",Oh="__AsciiObjectOutlineShell__",$M=`
  attribute vec3 aOutlineNormal;

  uniform float uOutlineThickness;
  uniform float uDepthBias;

  void main() {
    vec3 smoothN = length(aOutlineNormal) > 0.001 ? normalize(aOutlineNormal) : normalize(normal);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewNormal = normalize(normalMatrix * smoothN);

    // Hybrid view-space + clip-space silhouette extrusion keeps outline crisp & uniform in ASCII cells
    mvPosition.xyz += viewNormal * (0.016 * uOutlineThickness);
    vec4 clipPos = projectionMatrix * mvPosition;

    vec2 projNormal = (projectionMatrix * vec4(viewNormal.xy, 0.0, 0.0)).xy;
    float projLen = length(projNormal);
    vec2 screenDir = projLen > 0.0001 ? (projNormal / projLen) : vec2(0.0, 1.0);

    clipPos.xy += screenDir * (0.0135 * uOutlineThickness) * clipPos.w;
    clipPos.z += uDepthBias * clipPos.w;

    gl_Position = clipPos;
  }
`,jM=`
  precision highp float;

  uniform vec3 uOutlineColor;
  uniform float uOutlineIntensity;
  uniform float uOutlineOpacity;

  void main() {
    gl_FragColor = vec4(uOutlineColor * uOutlineIntensity, uOutlineOpacity);
  }
`,sa=new WeakMap;function Pl(a,e,t){return Number.isFinite(a)?Math.max(e,Math.min(t,a)):e}function Bh(a,e){const t=new Y;if(a==null)return t.set(e),t;if(a instanceof Y)return a.clone();try{return t.set(a),t}catch{return t.set(e),t}}function $p(a){if(a.getAttribute("aOutlineNormal"))return;const e=a.getAttribute("position");if(!e||e.count===0)return;a.getAttribute("normal")||a.computeVertexNormals();const t=a.getAttribute("normal");if(!t)return;const n=e.count,i=new Map,s=new Array(n);for(let o=0;o<n;o++){const l=Math.round(e.getX(o)*1e4),c=Math.round(e.getY(o)*1e4),h=Math.round(e.getZ(o)*1e4),u=`${l},${c},${h}`;s[o]=u;let d=t.getX(o),f=t.getY(o),p=t.getZ(o);const v=Math.hypot(d,f,p);v>1e-6&&(d/=v,f/=v,p/=v);let g=i.get(u);g||(g={sumX:0,sumY:0,sumZ:0,seen:new Set},i.set(u,g));const m=`${Math.round(d*100)},${Math.round(f*100)},${Math.round(p*100)}`;g.seen.has(m)||(g.seen.add(m),g.sumX+=d,g.sumY+=f,g.sumZ+=p)}const r=new Float32Array(n*3);for(let o=0;o<n;o++){const l=i.get(s[o]);let c=l?l.sumX:t.getX(o),h=l?l.sumY:t.getY(o),u=l?l.sumZ:t.getZ(o),d=Math.hypot(c,h,u);d<=1e-5&&(c=t.getX(o),h=t.getY(o),u=t.getZ(o),d=Math.hypot(c,h,u)||1),r[o*3]=c/d,r[o*3+1]=h/d,r[o*3+2]=u/d}a.setAttribute("aOutlineNormal",new tt(r,3))}function JM(a,e,t){var i,s,r,o,l;if((i=a.userData)!=null&&i.__isAsciiOutlineShell||(s=a.userData)!=null&&s.skipObjectOutline||a.name===Oh)return!1;let n=a.parent;for(;n;){if((r=n.userData)!=null&&r.__isAsciiOutlineShell)return!1;n=n.parent}return e&&((o=a.userData)!=null&&o.isShowcasePedestal||a.name==="TuxShowcasePlinth"||((l=a.geometry)==null?void 0:l.type)==="RingGeometry")||t&&!t(a)?!1:!!(a.geometry&&a.geometry.getAttribute("position"))}function QM(a){const e=Bh(a.highlightColor,nr);return new Xt({name:"AsciiObjectOutlineMaterial",vertexShader:$M,fragmentShader:jM,side:Ht,transparent:a.opacity<.999,depthTest:!0,depthWrite:a.opacity>=.999,toneMapped:!1,uniforms:{uOutlineThickness:{value:a.thickness},uOutlineColor:{value:e},uOutlineIntensity:{value:a.intensity},uOutlineOpacity:{value:a.opacity},uDepthBias:{value:a.depthBias}}})}function jp(a){var i;const e=new Set;a.target.traverse(s=>{if(s.isMesh){const r=s;JM(r,a.state.excludePedestal,a.meshFilter)&&e.add(r)}});for(const[s,r]of a.shells.entries())e.has(s)||((i=r.parent)==null||i.remove(r),a.shells.delete(s));for(const s of e){let r=a.shells.get(s);r||($p(s.geometry),r=new Le(s.geometry,a.material),r.name=Oh,r.userData.__isAsciiOutlineShell=!0,r.userData.skipNormalPass=!0,r.castShadow=!1,r.receiveShadow=!1,r.frustumCulled=s.frustumCulled,r.renderOrder=(s.renderOrder||0)+1,s.add(r),a.shells.set(s,r)),r.visible=a.state.enabled}const t=a.material.uniforms;t.uOutlineThickness&&(t.uOutlineThickness.value=a.state.thickness),t.uOutlineColor&&t.uOutlineColor.value.copy(Bh(a.state.highlightColor,nr)),t.uOutlineIntensity&&(t.uOutlineIntensity.value=a.state.intensity),t.uOutlineOpacity&&(t.uOutlineOpacity.value=a.state.opacity),t.uDepthBias&&(t.uDepthBias.value=a.state.depthBias);const n=a.state.opacity<.999;a.material.transparent!==n&&(a.material.transparent=n,a.material.depthWrite=!n,a.material.needsUpdate=!0)}function Il(a){return{enabled:a.state.enabled,thickness:a.state.thickness,highlightColor:a.state.highlightColor,intensity:a.state.intensity,opacity:a.state.opacity,depthBias:a.state.depthBias,excludePedestal:a.state.excludePedestal,outlinedMeshCount:a.shells.size}}function Dl(a,e){if(!a||typeof a.traverse!="function")throw new TypeError("[applyObjectOutline] Expected a valid THREE.Object3D target.");const t=sa.get(a),n=(e==null?void 0:e.enabled)!==void 0?e.enabled:(e==null?void 0:e.visible)!==void 0?e.visible:(t==null?void 0:t.state.enabled)??!0,i=(e==null?void 0:e.thickness)!==void 0?e.thickness:(e==null?void 0:e.width)!==void 0?e.width:(t==null?void 0:t.state.thickness)??1,s=(e==null?void 0:e.highlightColor)!==void 0?e.highlightColor:(e==null?void 0:e.color)!==void 0?e.color:(t==null?void 0:t.state.highlightColor)??nr,r=Bh(s,nr),o={enabled:!!n,thickness:Pl(i,.05,8),highlightColor:`#${r.getHexString().toUpperCase()}`,intensity:Pl((e==null?void 0:e.intensity)??(t==null?void 0:t.state.intensity)??1.85,.1,6),opacity:Pl((e==null?void 0:e.opacity)??(t==null?void 0:t.state.opacity)??1,0,1),depthBias:Pl((e==null?void 0:e.depthBias)??(t==null?void 0:t.state.depthBias)??.0012,0,.05),excludePedestal:(e==null?void 0:e.excludePedestal)??(t==null?void 0:t.state.excludePedestal)??!0};if(t)return t.state=o,(e==null?void 0:e.meshFilter)!==void 0&&(t.meshFilter=e.meshFilter),jp(t),t.handle;const l=QM(o),h={target:a,material:l,shells:new Map,state:o,meshFilter:e==null?void 0:e.meshFilter,handle:null},u={target:a,getState:()=>Il(h),update:d=>(Dl(a,d),Il(h)),setVisible:d=>(Dl(a,{enabled:d}),Il(h)),dispose:()=>ra(a)};return h.handle=u,sa.set(a,h),jp(h),u}function ra(a){var s,r;if(!a)return 0;const e=sa.get(a);let t=0;if(e){for(const o of e.shells.values())(s=o.parent)==null||s.remove(o),t+=1;return e.shells.clear(),e.material.dispose(),sa.delete(a),t}const n=[];a.traverse(o=>{var l;o.isMesh&&((l=o.userData)!=null&&l.__isAsciiOutlineShell)&&n.push(o)});const i=new Set;for(const o of n)(r=o.parent)==null||r.remove(o),o.material&&!Array.isArray(o.material)&&!i.has(o.material)&&(i.add(o.material),o.material.dispose()),t+=1;return t}function kh(a){const e=sa.get(a);return e?Il(e):null}const aa={minX:-19.35,maxX:10.75,minZ:-3.3,maxZ:4.1,plazaMinX:-5.55,plazaMaxX:.55,corridorMinZ:-3.25,corridorMaxZ:-1.92,westStorefrontMinX:-17.65,westStorefrontMaxX:-9.35,westStorefrontMinZ:-2.5,walkablePockets:[{minX:-14,maxX:-5.55,minZ:-1.92,maxZ:4.1},{minX:.55,maxX:7.8,minZ:-1.92,maxZ:4.1}],obstacles:[{minX:-13.5,maxX:-5.55,minZ:2.05,maxZ:4.1},{minX:2.1,maxX:7.2,minZ:1.75,maxZ:4.05},{minX:-4.8,maxX:-2.08,minZ:2.08,maxZ:3.62},{minX:-5.52,maxX:-4.98,minZ:3.74,maxZ:4.26}],groundY:.08635},ir={x:-3.8,y:.08635,z:-1.1},Wn={offsetX:10.3,offsetY:11.3,offsetZ:10.3,lookAtOffsetX:-1.85,lookAtOffsetY:1.05,lookAtOffsetZ:-1.25,followSharpness:6.5,minDistance:8.2,maxDistance:31.5,zoomSmoothing:10.5,zoomSpeed:4},Ft={cycleDuration:30,activeDuration:8,laneX:-22.335,laneY:-.092,startZ:-12.5,endZ:24.5,headingYaw:0};class mn{static createHeadlightFlareTexture(e=32){const t=new Uint8Array(e*e*4);for(let i=0;i<e;i++){const s=(i+.5)/e*2-1;for(let r=0;r<e;r++){const o=(r+.5)/e*2-1,l=Math.hypot(o*.92,s*1.18),c=Math.exp(-l*l*5.2),h=Math.exp(-s*s*18)*Math.exp(-o*o*2.1)*.42,u=Math.max(0,1-Math.hypot(o,s)),d=Math.min(1,(c+h)*Math.min(1,u*2.2)),f=(i*e+r)*4;t[f]=255,t[f+1]=Math.round(238+17*c),t[f+2]=Math.round(188+62*c),t[f+3]=Math.round(d*255)}}const n=new Qt(t,e,e,vt);return n.minFilter=Je,n.magFilter=Je,n.wrapS=Et,n.wrapT=Et,n.needsUpdate=!0,n}static createBeamFalloffTexture(e=16,t=48){const n=new Uint8Array(e*t*4);for(let s=0;s<t;s++){const r=s/Math.max(1,t-1),o=Math.pow(r,1.85)*Math.min(1,(1-r)*8.5+.18);for(let l=0;l<e;l++){const c=(s*e+l)*4;n[c]=255,n[c+1]=232,n[c+2]=178,n[c+3]=Math.round(Math.min(1,o)*255)}}const i=new Qt(n,e,t,vt);return i.minFilter=Je,i.magFilter=Je,i.wrapS=Tn,i.wrapT=Et,i.needsUpdate=!0,i}static createRoadPoolTexture(e=32,t=64){const n=new Uint8Array(e*t*4);for(let s=0;s<t;s++){const r=1-s/Math.max(1,t-1),o=ze.smoothstep(r,0,.16),l=Math.pow(Math.max(0,1-r),1.45),c=.26+r*.68;for(let h=0;h<e;h++){const u=((h+.5)/e*2-1)/c,d=Math.exp(-u*u*2.6)*Math.max(0,1-Math.abs(u)),f=Math.min(1,o*l*d),p=(s*e+h)*4;n[p]=255,n[p+1]=Math.round(218+32*(1-r)),n[p+2]=Math.round(154+68*(1-r)),n[p+3]=Math.round(f*255)}}const i=new Qt(n,e,t,vt);return i.minFilter=Je,i.magFilter=Je,i.wrapS=Et,i.wrapT=Et,i.needsUpdate=!0,i}static attachVehicleHeadlightRig(e,t){const n=Math.max(1e-4,Math.abs(e.scale.x||1)),i=Math.max(1e-4,Math.abs(e.scale.y||n)),s=Math.max(1e-4,Math.abs(e.scale.z||n)),r=1/n,o=1/i,l=1/s,c=e.position.clone(),h=e.quaternion.clone();e.position.set(0,0,0),e.rotation.set(0,Ft.headingYaw,0),e.updateMatrixWorld(!0);let u=-.051,d=-1.128,f=1.026,p=1.168,v=.19;const g=new Mt;let m=!1;if(e.traverse(pe=>{const he=pe;he.isMesh&&/headlight/i.test(he.name)&&(g.expandByObject(he),m=!0)}),m&&!g.isEmpty()){const pe=g.max.x-g.min.x,he=g.max.y-g.min.y;if(pe>.4&&he>.1){u=(g.min.x+g.max.x)*.5;const Be=pe*.5;d=u-Be*.78,f=u+Be*.78,p=g.min.y+he*.44,v=g.max.z+.035}}e.position.copy(c),e.quaternion.copy(h),e.updateMatrixWorld(!0);const y=-.286-Ft.laneY,_=new Y("#FFF0C2"),x=new Y("#F5C878"),E=new kt;E.name="CarroHeadlightEmitterRig",E.userData.skipNormalPass=!0,E.userData.skipObjectOutline=!0;const b=new Ut(1,14,10),T=new fn({color:new Y("#FFFDF5"),emissive:new Y("#FFE8AD"),emissiveIntensity:4,roughness:.1,metalness:.05}),R=new Le(b,T);R.name="HeadlightLensLeft",R.position.set(d*r,p*o,v*l),R.scale.set(.28*r,.165*o,.125*l),R.userData.skipNormalPass=!0,R.userData.skipObjectOutline=!0,R.renderOrder=2,E.add(R);const S=new Le(b,T);S.name="HeadlightLensRight",S.position.set(f*r,p*o,v*l),S.scale.set(.28*r,.165*o,.125*l),S.userData.skipNormalPass=!0,S.userData.skipObjectOutline=!0,S.renderOrder=2,E.add(S);const M=mn.createHeadlightFlareTexture(32),P=new Ln(1,1),z=new Pt({map:M,color:new Y("#FFE49E"),transparent:!0,opacity:.64,blending:gs,depthWrite:!1,side:en}),F=v+.04,k=new Le(P,z);k.name="HeadlightHaloLeft",k.position.set(d*r,p*o,F*l),k.rotation.x=-.24,k.scale.set(.96*r,.64*o,1),k.userData.skipNormalPass=!0,k.userData.skipObjectOutline=!0,k.renderOrder=3,E.add(k);const H=new Le(P,z);H.name="HeadlightHaloRight",H.position.set(f*r,p*o,F*l),H.rotation.x=-.24,H.scale.set(.96*r,.64*o,1),H.userData.skipNormalPass=!0,H.userData.skipObjectOutline=!0,H.renderOrder=3,E.add(H);const U=mn.createBeamFalloffTexture(16,48),$=6.2,G=.88,J=new Xr(G,$,14,1,!0);J.translate(0,-$*.5,0),J.rotateX(-Math.PI*.5);const oe=new Pt({map:U,color:new Y("#FFE6A8"),transparent:!0,opacity:.22,blending:gs,depthWrite:!1,side:en}),le=Math.atan2(p-y,9.5),Se=new Le(J,oe);Se.name="HeadlightBeamConeLeft",Se.position.set(d*r,p*o,v*l),Se.rotation.set(le,.02,0),Se.scale.set(r,o,l),Se.userData.skipNormalPass=!0,Se.userData.skipObjectOutline=!0,Se.renderOrder=2,E.add(Se);const K=new Le(J,oe);K.name="HeadlightBeamConeRight",K.position.set(f*r,p*o,v*l),K.rotation.set(le,.06,0),K.scale.set(r,o,l),K.userData.skipNormalPass=!0,K.userData.skipObjectOutline=!0,K.renderOrder=2,E.add(K);const X=mn.createRoadPoolTexture(32,64),V=new Ln(1,1);V.rotateX(-Math.PI*.5);const ge=new Pt({map:X,color:new Y("#F7CF84"),transparent:!0,opacity:.36,blending:gs,depthWrite:!1}),de=y+.024,Ue=10.6,He=v+.55+Ue*.5,Fe=new Le(V,ge);Fe.name="HeadlightRoadPoolLeft",Fe.position.set((d+.12)*r,de*o,He*l),Fe.scale.set(2.45*r,1,Ue*l),Fe.userData.skipNormalPass=!0,Fe.userData.skipObjectOutline=!0,Fe.renderOrder=1,E.add(Fe);const qe=new Le(V,ge);qe.name="HeadlightRoadPoolRight",qe.position.set((f+.42)*r,de*o,He*l),qe.rotation.y=.05,qe.scale.set(2.65*r,1,(Ue+.8)*l),qe.userData.skipNormalPass=!0,qe.userData.skipObjectOutline=!0,qe.renderOrder=1,E.add(qe),e.add(E);const ne=v+.06,ae=new Jr(_,54,42,Math.PI*.27,.56,1.08);ae.name="CarroHeadlightSpotLeft",ae.position.set(d*r,p*o,ne*l),ae.target.name="CarroHeadlightTargetLeft",ae.target.position.set((d+.22)*r,y*o,13.2*l),e.add(ae),e.add(ae.target);const I=new Jr(_,54,44,Math.PI*.29,.56,1.08);I.name="CarroHeadlightSpotRight",I.position.set(f*r,p*o,ne*l),I.target.name="CarroHeadlightTargetRight",I.target.position.set((f+1.45)*r,y*o,14.4*l),e.add(I),e.add(I.target);const Ee=new on(x,24,29,1.24);Ee.name="CarroStreetThrowLight",Ee.position.set((u+.35)*r,1.08*o,7*l),e.add(Ee);const re=new on(new Y("#C83E3E"),3.4,10.5,1.55);re.name="CarroTaillightGlow",re.position.set(u*r,1.02*o,-9.55*l),e.add(re);for(const pe of t)pe.emissive=new Y("#FFE4A0"),pe.emissiveIntensity=1.65,pe.transparent&&(pe.opacity=Math.max(pe.opacity,.74));return{headlightLeft:ae,headlightRight:I,streetThrowLight:Ee,taillightGlow:re,emitterGroup:E,lensMaterial:T,haloMaterial:z,coneMaterial:oe,roadPoolMaterial:ge}}static createArchitecturalLightRig(e){const t=new kt;t.name="UrbanArchitecturalLightRig";const n=[],i=(Se,K,X)=>{const V=new fn({color:new Y(Se),emissive:new Y(K),emissiveIntensity:X,roughness:.32,metalness:.14});return n.push(V),V},s=new on(new Y("#F4AA4C"),13.5,24,1.32);s.position.set(-4.35,3.05,-2.55),t.add(s);const r=new Mn(5.8,.28,.14),o=i("#3A2B1C","#F6B85C",1.52),l=new Le(r,o);l.name="StorefrontEastTransom",l.position.set(-4.35,3.22,-3.45),l.userData.skipObjectOutline=!0,t.add(l);const c=new Mn(.12,2.35,.12),h=i("#162C33","#58B6C6",1.32),u=new Le(c,h);u.name="StorefrontEastNeon",u.position.set(-.52,2.25,-3.44),u.userData.skipObjectOutline=!0,t.add(u);const d=new on(new Y("#ED9F44"),12.8,24,1.32);d.position.set(-13.35,3.1,-1.75),t.add(d);const f=new Mn(5.4,.26,.14),p=i("#38291A","#F0AC50",1.45),v=new Le(f,p);v.name="StorefrontWestTransom",v.position.set(-13.35,3.25,-2.55),v.userData.skipObjectOutline=!0,t.add(v);const g=new Le(c,h);g.name="StorefrontWestNeon",g.position.set(-9.82,2.3,-2.56),g.userData.skipObjectOutline=!0,t.add(g);const m=new on(new Y("#F2B258"),9.4,20,1.35);m.position.set(-3.42,2.35,3.65),t.add(m);const y=new Mn(2.15,.12,.12),_=i("#3B2B1B","#F7BC64",1.48),x=new Le(y,_);x.name="KioskCanopyGlow",x.position.set(-3.42,2.54,3.42),x.userData.skipObjectOutline=!0,t.add(x);const E=new Ut(.22,10,8),b=i("#FFF4DC","#FAD284",1.82),T=new on(new Y("#F6C270"),17.5,30,1.28);T.position.set(-17.99,6,3.14),t.add(T);const R=new Le(E,b);R.name="StreetLampGlobeWest",R.position.set(-17.99,6.2,3.14),R.userData.skipObjectOutline=!0,t.add(R);const S=new fn({color:new Y("#3C4A56"),roughness:.52,metalness:.18}),M=new wi(.06,.085,5.35,8),P=new Le(M,S);P.name="CurbsideLuminairePost",P.position.set(-5.25,2.75,4),P.castShadow=!0,P.receiveShadow=!0,t.add(P);const z=new Mn(.08,.08,.72),F=new Le(z,S);F.name="CurbsideLuminaireArm",F.position.set(-5.25,5.42,4.3),t.add(F);const k=new on(new Y("#F2BA68"),15.6,28,1.28);k.position.set(-5.25,5.25,4.58),t.add(k);const H=new Le(E,b);H.name="StreetLampGlobeCenter",H.position.set(-5.25,5.32,4.58),H.userData.skipObjectOutline=!0,t.add(H);const U=new on(new Y("#ECAF5E"),13.8,28,1.28);U.position.set(8.4,6,4.83),t.add(U);const $=new Le(E,b);$.name="StreetLampGlobeEast",$.position.set(8.4,6.2,4.83),$.userData.skipObjectOutline=!0,t.add($);const G=new on(new Y("#5CA8BA"),8.8,26,1.32);G.position.set(-27.2,4.8,1.6),t.add(G);const J=new Ut(.18,8,6),oe=i("#1B323A","#6AC2D4",1.35),le=new Le(J,oe);return le.name="AvenueCyberBeacon",le.position.set(-27.6,4.95,1.6),le.userData.skipObjectOutline=!0,t.add(le),e.add(t),{group:t,storefrontEastLight:s,storefrontWestLight:d,kioskWarmLight:m,streetLampWest:T,streetLampCenter:k,streetLampEast:U,avenueBeaconLight:G,poleMaterial:S,emissiveFixtureMaterials:n}}static createStage(e,t,n){const i=new Ws,s=new Y(e.palette.background);i.background=s,i.fog=new Vs(s.getHex(),.011);const r=new xh(new Y("#6E88A4"),.56);r.name="UrbanAmbientFillLight",i.add(r);const o=new ml(new Y(e.palette.coolAmbient),new Y("#2C3C4C"),1.58);i.add(o);const l=new Vn(new Y(e.palette.coolAmbient).lerp(new Y("#C8DCF0"),.55),2.15);l.name="KeyDirectionalLight",l.position.set(16,28,18),l.target.position.set(-6,.5,0),i.add(l.target),l.castShadow=e.enableShadows,l.shadow.mapSize.width=1536,l.shadow.mapSize.height=1536,l.shadow.camera.near=2,l.shadow.camera.far=90,l.shadow.camera.left=-34,l.shadow.camera.right=24,l.shadow.camera.top=26,l.shadow.camera.bottom=-26,l.shadow.bias=-5e-4,l.shadow.normalBias=.035,i.add(l);const c=new Vn(new Y(e.palette.warmLight),1.08);c.name="RimDirectionalLight",c.position.set(-20,14,-15),c.target.position.set(-4,1,-1),i.add(c.target),i.add(c);const h=mn.createArchitecturalLightRig(i),u=new $r(.24,.36,24);u.rotateX(-Math.PI/2);const d=new Pt({color:new Y(e.palette.warmLight),transparent:!0,opacity:.65,side:en}),f=new Le(u,d);f.name="UrbanWaypointMarker",f.userData.skipNormalPass=!0,f.visible=!1,i.add(f);const p={scene:i,ambientFill:r,ambientHemi:o,keyDirLight:l,rimDirLight:c,urbanLightRig:h,playerRimLight:null,waypointMarker:f,cidadeEntityId:null,playerEntityId:null,carroEntityId:null,assets:null};return t&&n?mn.attachPreparedAssets(p,n,e,t):mn.applyAtmosphere(p,e,t),p}static attachPreparedAssets(e,t,n,i){var J,oe,le,Se;e.assets=t,e.urbanLightRig.poleMaterial.normalMap=t.proceduralNormals.facade,e.urbanLightRig.poleMaterial.normalScale.set(.36,.36);const{cidade:s,playerRig:r,carroGrupo:o}=t.nodes;e.scene.add(s),e.scene.add(r),e.scene.add(o),s.updateWorldMatrix(!0,!0);const l=new Mt().makeEmpty(),c=new Mt;s.traverseVisible(K=>{const X=K;!X.isMesh||!X.geometry||(X.geometry.boundingBox||X.geometry.computeBoundingBox(),X.geometry.boundingBox&&(c.copy(X.geometry.boundingBox).applyMatrix4(X.matrixWorld),l.union(c)))}),l.expandByPoint(new C(Ft.laneX,0,Ft.startZ)),l.expandByPoint(new C(Ft.laneX,0,Ft.endZ));const h=i.createEntity();i.addComponent(h,"LifecycleTag",{role:"environment",label:"Cidade_Sketchfab_model"}).addComponent(h,"DepthLayer",{layer:"midground",order:1,contrastPriority:.72}).addComponent(h,"Transform",{x:s.position.x,y:s.position.y,z:s.position.z,rotX:s.rotation.x,rotY:s.rotation.y,rotZ:s.rotation.z,scaleX:s.scale.x,scaleY:s.scale.y,scaleZ:s.scale.z}).addComponent(h,"ForegroundOccluders",{groups:t.foregroundOccluders,centralFocusX:-4.2,centralFocusY:1.8,centralFocusZ:-2.4,playerClearanceRadius:1.65,centralNdcHalfWidth:.52,centralNdcHalfHeight:.58}).addComponent(h,"Renderable",{object3D:s,disposeOnDestroy:!0});const u=r.position.y||aa.groundY,d=ir.x,f=ir.z;r.position.set(d,u,f);const p=Math.max(.001,Math.abs(r.scale.y||1)),v=new on(new Y("#EEF6FF"),3.4,4.6,1.95);v.position.set(.18/p,2.75/p,.35/p),r.add(v),e.playerRimLight=v;const g={...aa,obstacles:aa.obstacles.map(K=>({...K})),walkablePockets:(J=aa.walkablePockets)==null?void 0:J.map(K=>({...K})),groundY:u},m=new pp(r),y=t.clips.Idle?m.clipAction(t.clips.Idle):null,_=t.clips.Walking?m.clipAction(t.clips.Walking):null,x=t.clips.Casting?m.clipAction(t.clips.Casting):null;y&&(y.setLoop(mr,1/0),y.play()),_&&_.setLoop(mr,1/0),x&&(x.setLoop(eo,1),x.clampWhenFinished=!0);const E=i.createEntity(),b={mixer:m,root:r,actions:{Idle:y,Walking:_,Casting:x},durations:{Idle:((oe=t.clips.Idle)==null?void 0:oe.duration)??2,Walking:((le=t.clips.Walking)==null?void 0:le.duration)??1,Casting:((Se=t.clips.Casting)==null?void 0:Se.duration)??1.47},activeClip:"Idle",castRemaining:0,crossFadeDuration:.22,interactRequested:!1,disposeListener:void 0},T=K=>{x&&K.action===x&&b.activeClip==="Casting"&&(b.castRemaining=0)};m.addEventListener("finished",T),b.disposeListener=()=>{m.removeEventListener("finished",T)},m.update(1e-4),i.addComponent(E,"LifecycleTag",{role:"avatar",label:"Player_Rig"}).addComponent(E,"DepthLayer",{layer:"foreground",order:0,contrastPriority:1}).addComponent(E,"Transform",{x:d,y:u,z:f,rotX:r.rotation.x,rotY:r.rotation.y,rotZ:r.rotation.z,scaleX:r.scale.x,scaleY:r.scale.y,scaleZ:r.scale.z}).addComponent(E,"Velocity",{vx:0,vy:0,vz:0,angularVx:0,angularVy:0,angularVz:0,damping:12}).addComponent(E,"RotationTarget",{targetYaw:r.rotation.y,targetPitch:0,targetRoll:0,lerpSpeed:10.5,idleSpinSpeed:0,maxPitch:.15}).addComponent(E,"InputState",{pointerX:0,pointerY:0,pointerActive:!1,isDragging:!1,moveX:0,moveZ:0,yawSensitivity:.6,pitchSensitivity:.25,moveSpeed:3.6,boundsRadius:0}).addComponent(E,"NavigationTarget",{targetX:d,targetZ:f,active:!1,moveSpeed:3.6,arrivalRadius:.14,minX:g.minX,maxX:g.maxX,minZ:g.minZ,maxZ:g.maxZ}).addComponent(E,"SidewalkBounds",g).addComponent(E,"CharacterAnimation",b).addComponent(E,"CameraFollow",{...Wn,overviewBounds:l,autoOrbit:!!n.autoOrbit,orbitAngle:0,orbitSpeed:.42,initialized:!1}).addComponent(E,"Renderable",{object3D:r,disposeOnDestroy:!0});const R=mn.attachVehicleHeadlightRig(o,t.materials.carHeadlightCovers),{headlightLeft:S,headlightRight:M,streetThrowLight:P,taillightGlow:z,emitterGroup:F,lensMaterial:k,haloMaterial:H,coneMaterial:U,roadPoolMaterial:$}=R,G=i.createEntity();i.addComponent(G,"LifecycleTag",{role:"vehicle",label:"Carro_Grupo"}).addComponent(G,"DepthLayer",{layer:"midground",order:1,contrastPriority:.9}).addComponent(G,"Transform",{x:Ft.laneX,y:Ft.laneY,z:Ft.startZ,rotX:o.rotation.x,rotY:Ft.headingYaw,rotZ:o.rotation.z,scaleX:o.scale.x,scaleY:o.scale.y,scaleZ:o.scale.z}).addComponent(G,"TrafficCycle",{cycleDuration:Ft.cycleDuration,activeDuration:Ft.activeDuration,laneX:Ft.laneX,laneY:Ft.laneY,startZ:Ft.startZ,endZ:Ft.endZ,headingYaw:Ft.headingYaw,timeOffset:0,headlightLeft:S,headlightRight:M,streetThrowLight:P,taillightGlow:z,headlightEmitterGroup:F,headlightLensMaterial:k,headlightHaloMaterial:H,headlightConeMaterial:U,headlightRoadPoolMaterial:$,baseSpotIntensity:54,basePointIntensity:24,baseTailIntensity:3.4,baseLensEmissive:4,baseHaloOpacity:.64,baseConeOpacity:.22,baseRoadPoolOpacity:.36,headlightMaterials:t.materials.carHeadlightCovers}).addComponent(G,"Renderable",{object3D:o,disposeOnDestroy:!0}),e.cidadeEntityId=h,e.playerEntityId=E,e.carroEntityId=G,mn.applyAtmosphere(e,n,i)}static applyAtmosphere(e,t,n){const i=t.atmosphere,s=new Y(t.palette.background);e.scene.background=s;const r=e.scene.fog;r&&r.isFogExp2&&(r.color.copy(s),r.density=i==="rain"?.0205:i==="day"?.0055:.011);const o=new Y(t.palette.coolAmbient),l=new Y(t.palette.warmLight),c=e.urbanLightRig;if(i==="day"){e.ambientFill.color.set("#D6E4F0"),e.ambientFill.intensity=.7,e.ambientHemi.color.copy(o).lerp(new Y("#E4F0FA"),.72),e.ambientHemi.groundColor.set("#6E7F8E"),e.ambientHemi.intensity=1.7,e.keyDirLight.color.set("#FFF6E8"),e.keyDirLight.intensity=2.65,e.keyDirLight.position.set(20,34,18),e.rimDirLight.color.copy(o).lerp(new Y("#C6DCF0"),.55),e.rimDirLight.intensity=.7,c.storefrontEastLight.intensity=1.4,c.storefrontWestLight.intensity=1.3,c.kioskWarmLight.intensity=.95,c.streetLampWest.intensity=1.15,c.streetLampCenter.intensity=1.05,c.streetLampEast.intensity=.95,c.avenueBeaconLight.intensity=.75;for(const h of c.emissiveFixtureMaterials)h.emissiveIntensity=.28;e.playerRimLight&&(e.playerRimLight.intensity=.3)}else if(i==="rain"){e.ambientFill.color.set("#7B9AB8"),e.ambientFill.intensity=.72,e.ambientHemi.color.copy(o).lerp(new Y("#B0CAE2"),.56),e.ambientHemi.groundColor.set("#34485C"),e.ambientHemi.intensity=1.92,e.keyDirLight.color.copy(o).lerp(new Y("#C2DAF0"),.58),e.keyDirLight.intensity=2.48,e.keyDirLight.position.set(14,27,18),e.rimDirLight.color.copy(l).lerp(new Y("#92C2DA"),.52),e.rimDirLight.intensity=1.38,c.storefrontEastLight.intensity=15.2,c.storefrontWestLight.intensity=14.4,c.kioskWarmLight.intensity=10.6,c.streetLampWest.intensity=19.6,c.streetLampCenter.intensity=17.4,c.streetLampEast.intensity=15.2,c.avenueBeaconLight.intensity=9.8;for(const h of c.emissiveFixtureMaterials)h.emissiveIntensity=1.95;e.playerRimLight&&(e.playerRimLight.intensity=.5)}else{e.ambientFill.color.set("#6E88A4"),e.ambientFill.intensity=.56,e.ambientHemi.color.copy(o).lerp(new Y("#9AB4CC"),.48),e.ambientHemi.groundColor.set("#2C3C4C"),e.ambientHemi.intensity=1.58,e.keyDirLight.color.copy(o).lerp(new Y("#C8DCF0"),.55),e.keyDirLight.intensity=2.15,e.keyDirLight.position.set(16,28,18),e.rimDirLight.color.copy(l).lerp(new Y("#88B4C6"),.42),e.rimDirLight.intensity=1.08,c.storefrontEastLight.intensity=13.5,c.storefrontWestLight.intensity=12.8,c.kioskWarmLight.intensity=9.4,c.streetLampWest.intensity=17.5,c.streetLampCenter.intensity=15.6,c.streetLampEast.intensity=13.8,c.avenueBeaconLight.intensity=8.8;for(const h of c.emissiveFixtureMaterials)h.emissiveIntensity=1.72;e.playerRimLight&&(e.playerRimLight.intensity=.45)}if(e.keyDirLight.castShadow=t.enableShadows,e.waypointMarker.material.color.copy(l),e.assets){const h=(K,X)=>{if(!K.normalMap||!K.normalScale)return;const V=typeof K.userData.__baseNormalScaleX=="number"?K.userData.__baseNormalScaleX:K.normalScale.x,ge=typeof K.userData.__baseNormalScaleY=="number"?K.userData.__baseNormalScaleY:K.normalScale.y;K.normalScale.set(V*X,ge*X)},u=ze.clamp(t.reflectionStrength??.25,0,1),d=ze.lerp(.98,i==="rain"?.78:.86,u),f=.02*u,p=i==="day"?[7,7.4,7.8]:i==="rain"?[5,5.5,6]:[5.2,5.7,6.2],v=i==="day"?.03:i==="rain"?.09:.08,g=i==="rain"?.62:i==="day"?1.08:.92;for(const K of e.assets.materials.roads)K.roughness=d,K.metalness=f,K.roughnessMap&&(K.roughnessMap=null,K.needsUpdate=!0),K.color.setRGB(p[0],p[1],p[2]),K.emissive&&(K.emissive.set(i==="day"?"#2A3642":"#121D28"),K.emissiveIntensity=v),h(K,g);const m=ze.lerp(.98,i==="rain"?.72:.84,u),y=.02*u,_=i==="day"?[.9,.94,.98]:i==="rain"?[.98,1.08,1.18]:[1.04,1.12,1.2],x=i==="day"?.02:i==="rain"?.07:.06,E=i==="rain"?.74:i==="day"?1.08:.96;for(const K of e.assets.materials.sidewalks)K.roughness=m,K.metalness=y,K.color.setRGB(_[0],_[1],_[2]),K.emissive&&(K.emissive.set("#16222E"),K.emissiveIntensity=x),h(K,E);const b=i==="day"?[.9,.94,.98]:i==="rain"?[.96,1.06,1.16]:[1.02,1.1,1.18],T=i==="day"?.05:i==="rain"?.1:.09,R=i==="day"?1.15:i==="rain"?.98:1.08;for(const K of e.assets.materials.walls)K.color.setRGB(b[0],b[1],b[2]),K.emissive&&(K.emissive.set(i==="day"?"#243240":"#16222E"),K.emissiveIntensity=T),h(K,R);const S=i==="day"?.03:i==="rain"?.08:.07,M=i==="day"?1.08:1;for(const K of e.assets.materials.character){const X=K.userData.__playerBaseColor;X?K.color.copy(X):K.color.set("#55778A"),K.roughness=Math.max(.7,K.roughness),K.metalness=Math.min(.04,K.metalness),h(K,M),K.emissive&&(K.emissive.set("#2C4456"),K.emissiveIntensity=S)}const P=i==="day"?.14:i==="rain"?.3:.26,z=i==="rain"?.88:1;for(const K of e.assets.materials.carBody)K.color.set(i==="day"?"#D8E4EE":"#CEDCE8"),h(K,z),K.emissive&&(K.emissive.set("#1F3140"),K.emissiveIntensity=P);const F=i==="day"?.12:i==="rain"?.92:.85,k=new Y("#ECA84C");for(const K of e.assets.materials.windows)K.emissive&&(K.emissive.copy(k),K.emissiveIntensity=F);const H=i==="day"?.12:i==="rain"?.76:.68,U=new Y("#E2A24A");for(const K of e.assets.materials.kioskGlass)K.emissive&&(K.emissive.copy(U),K.emissiveIntensity=H);const $=i==="day"?.08:i==="rain"?.48:.42,G=new Y("#5AA6B8");for(const K of e.assets.materials.billboards)K.emissive&&(K.emissive.copy(G),K.emissiveIntensity=$);const J=i==="day"?[1.38,1.54,1.32]:i==="rain"?[1.04,1.18,1.08]:[1.06,1.2,1.06],oe=i==="day"?.12:i==="rain"?.2:.18,le=new Y(i==="day"?"#234E34":"#1E4A30");for(const K of e.assets.materials.foliage)K.color.setRGB(J[0],J[1],J[2]),K.emissive&&(K.emissive.copy(le),K.emissiveIntensity=oe);const Se=i==="day"?.22:i==="rain"?1.38:1.25;for(const K of e.assets.materials.streetLamps)K.emissiveIntensity=Se}if(n&&e.carroEntityId!==null){const h=n.getComponent(e.carroEntityId,"TrafficCycle");h&&(i==="day"?(h.baseSpotIntensity=5.5,h.basePointIntensity=3.2,h.baseTailIntensity=1,h.baseLensEmissive=.95,h.baseHaloOpacity=.18,h.baseConeOpacity=0,h.baseRoadPoolOpacity=.06):i==="rain"?(h.baseSpotIntensity=72,h.basePointIntensity=32,h.baseTailIntensity=4.5,h.baseLensEmissive=4.8,h.baseHaloOpacity=.82,h.baseConeOpacity=.32,h.baseRoadPoolOpacity=.52):(h.baseSpotIntensity=58,h.basePointIntensity=26,h.baseTailIntensity=3.6,h.baseLensEmissive=4.2,h.baseHaloOpacity=.68,h.baseConeOpacity=.24,h.baseRoadPoolOpacity=.4))}}}const At=class At{constructor(e){D(this,"scene");D(this,"config");D(this,"baseCam",new C);D(this,"baseLookAt",new C);D(this,"currentLookAt",new C);D(this,"tempCamDir",new C);D(this,"cursorLight");D(this,"rainPoints",null);D(this,"rainPositions",null);D(this,"rainSpeeds",null);D(this,"rainActive",!1);this.scene=e.scene,this.config=e.config,this.baseCam.set(...e.baseCameraPos),this.baseLookAt.set(...e.lookAtTarget),this.currentLookAt.copy(this.baseLookAt),this.cursorLight=new on(new Y(this.config.palette.cursorLight),this.config.mode==="playground"?this.config.cursorLightIntensity*2.2:0,11.5,1.8),this.cursorLight.position.set(-2,1.8,0),this.scene.add(this.cursorLight),this.syncWeatherParticles()}applyConfig(e){this.config=e,this.cursorLight.color.set(this.config.palette.cursorLight),this.cursorLight.intensity=this.config.mode==="playground"?this.config.cursorLightIntensity*2.2:0,this.syncWeatherParticles()}setCameraAnchors(e,t){this.baseCam.set(...e),this.baseLookAt.set(...t)}isRainActive(){return this.rainActive}getCursorLightWorldPosition(){return this.cursorLight.position}syncWeatherParticles(){const e=this.config.mode==="playground"&&this.config.atmosphere==="rain";if(e&&!this.rainPoints){const t=At.RAIN_COUNT,n=new Float32Array(t*3),i=new Float32Array(t);for(let o=0;o<t;o++)n[o*3]=-6+(Math.random()-.5)*At.RAIN_SPAN_X,n[o*3+1]=Math.random()*At.RAIN_TOP_Y,n[o*3+2]=(Math.random()-.5)*At.RAIN_SPAN_Z,i[o]=12.5+Math.random()*6.5;const s=new Ve;s.setAttribute("position",new tt(n,3));const r=new zr({color:new Y(this.config.palette.coolAmbient).lerp(new Y("#D4E6F5"),.62),size:.23,transparent:!0,opacity:.86,depthWrite:!1});this.rainPoints=new qo(s,r),this.rainPoints.name="WeatherRainParticles",this.rainPoints.frustumCulled=!1,this.rainPoints.userData.skipNormalPass=!0,this.rainPositions=n,this.rainSpeeds=i,this.scene.add(this.rainPoints)}this.rainActive=e,this.rainPoints&&(this.rainPoints.visible=e,this.rainPoints.material.color.set(this.config.palette.coolAmbient).lerp(new Y("#D4E6F5"),.62))}resolveGroundFocus(e){if(e.getWorldDirection(this.tempCamDir),this.tempCamDir.y<-.05){const t=-e.position.y/this.tempCamDir.y,n=Math.max(2,Math.min(45,t));return{x:e.position.x+this.tempCamDir.x*n,z:e.position.z+this.tempCamDir.z*n}}return{x:e.position.x-Wn.offsetX,z:e.position.z-Wn.offsetZ}}update(e,t,n,i){if(this.config.mode==="mascot"){const r=1-Math.exp(-this.config.parallaxSmoothing*n),o=Math.sin(i*.55)*.04;e.position.x+=(this.baseCam.x-e.position.x)*r,e.position.y+=(this.baseCam.y+o-e.position.y)*r,e.position.z+=(this.baseCam.z-e.position.z)*r,this.currentLookAt.lerp(this.baseLookAt,r),e.lookAt(this.currentLookAt)}const s=this.config.mode==="playground"?this.resolveGroundFocus(e):{x:0,z:0};if(this.config.mode==="playground"){const r=Math.max(0,this.config.parallaxIntensity)/.35,o=s.x+t.normX*7.5*r,l=1.85+t.normY*1.4*r,c=s.z-t.normY*5.4*r,h=1-Math.exp(-8.5*n);this.cursorLight.position.x+=(o-this.cursorLight.position.x)*h,this.cursorLight.position.y+=(l-this.cursorLight.position.y)*h,this.cursorLight.position.z+=(c-this.cursorLight.position.z)*h;const u=t.active?1+t.motionSpeed*.35:.3;this.cursorLight.intensity=this.config.cursorLightIntensity*2.2*u}if(this.rainActive&&this.rainPoints&&this.rainPositions&&this.rainSpeeds&&n>0){const r=this.rainPositions,o=this.rainSpeeds,l=o.length,c=s.x,h=s.z,u=At.RAIN_SPAN_X*.5,d=At.RAIN_SPAN_Z*.5,f=-2.2*this.config.windStrength;for(let v=0;v<l;v++){const g=v*3;r[g]=r[g]+f*n,r[g+1]=r[g+1]-o[v]*n,r[g+1]<At.RAIN_BOTTOM_Y?(r[g+1]=At.RAIN_TOP_Y,r[g]=c+(Math.random()-.5)*At.RAIN_SPAN_X,r[g+2]=h+(Math.random()-.5)*At.RAIN_SPAN_Z):(r[g]<c-u?r[g]=r[g]+At.RAIN_SPAN_X:r[g]>c+u&&(r[g]=r[g]-At.RAIN_SPAN_X),r[g+2]<h-d?r[g+2]=r[g+2]+At.RAIN_SPAN_Z:r[g+2]>h+d&&(r[g+2]=r[g+2]-At.RAIN_SPAN_Z))}const p=this.rainPoints.geometry.getAttribute("position");p.needsUpdate=!0}}dispose(){this.cursorLight.parent&&this.cursorLight.parent.remove(this.cursorLight),this.cursorLight.dispose(),this.rainPoints&&(this.rainPoints.parent&&this.rainPoints.parent.remove(this.rainPoints),this.rainPoints.geometry.dispose(),this.rainPoints.material.dispose(),this.rainPoints=null),this.rainPositions=null,this.rainSpeeds=null}};D(At,"RAIN_COUNT",780),D(At,"RAIN_SPAN_X",48),D(At,"RAIN_SPAN_Z",46),D(At,"RAIN_TOP_Y",17.5),D(At,"RAIN_BOTTOM_Y",-.35);let Ul=At;const zh=new WeakMap;class Hh extends Zt{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new pn(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,r=>{this.parse(r,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,xt,n).catch(n)}decodeDracoFile(e,t,n,i,s=Ot,r=()=>{}){const o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,o).then(t).catch(r)}decodeGeometry(e,t){const n=JSON.stringify(t);if(zh.has(e)){const l=zh.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,r=e.byteLength,o=this._getWorker(s,r).then(l=>(i=l,new Promise((c,h)=>{i._callbacks[s]={resolve:c,reject:h},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),zh.set(e,{key:n,promise:o}),o}_createGeometry(e){const t=new Ve;e.index&&t.setIndex(new tt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,r=i.array,o=i.itemSize,l=new tt(r,o);s==="color"&&(this._assignVertexColorSpace(l,i.vertexColorSpace),l.normalized=!(r instanceof Float32Array)),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==xt)return;const n=new Y;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i),Qe.toWorkingColorSpace(n,xt),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new pn(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=eS.toString(),r=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([r]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const r=s.data;switch(r.type){case"decode":i._callbacks[r.id].resolve(r);break;case"error":i._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function eS(){let a,e;onmessage=function(r){const o=r.data;switch(o.type){case"init":a=o.decoderConfig,e=new Promise(function(h){a.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(a)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder;try{const f=t(u,d,new Int8Array(l),c),p=f.attributes.map(v=>v.array.buffer);f.index&&p.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},p)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{u.destroy(d)}});break}};function t(r,o,l,c){const h=c.attributeIDs,u=c.attributeTypes;let d,f;const p=o.GetEncodedGeometryType(l);if(p===r.TRIANGULAR_MESH)d=new r.Mesh,f=o.DecodeArrayToMesh(l,l.byteLength,d);else if(p===r.POINT_CLOUD)d=new r.PointCloud,f=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const v={index:null,attributes:[]};for(const g in h){const m=self[u[g]];let y,_;if(c.useUniqueIDs)_=h[g],y=o.GetAttributeByUniqueId(d,_);else{if(_=o.GetAttributeId(d,r[h[g]]),_===-1)continue;y=o.GetAttribute(d,_)}const x=i(r,o,d,g,m,y);g==="color"&&(x.vertexColorSpace=c.vertexColorSpace),v.attributes.push(x)}return p===r.TRIANGULAR_MESH&&(v.index=n(r,o,d)),r.destroy(d),v}function n(r,o,l){const h=l.num_faces()*3,u=h*4,d=r._malloc(u);o.GetTrianglesUInt32Array(l,u,d);const f=new Uint32Array(r.HEAPF32.buffer,d,h).slice();return r._free(d),{array:f,itemSize:1}}function i(r,o,l,c,h,u){const d=u.num_components(),p=l.num_points()*d,v=p*h.BYTES_PER_ELEMENT,g=s(r,h),m=r._malloc(v);o.GetAttributeDataArrayForAllPoints(l,u,g,v,m);const y=new h(r.HEAPF32.buffer,m,p).slice();return r._free(m),{name:c,array:y,itemSize:d}}function s(r,o){switch(o){case Float32Array:return r.DT_FLOAT32;case Int8Array:return r.DT_INT8;case Int16Array:return r.DT_INT16;case Int32Array:return r.DT_INT32;case Uint8Array:return r.DT_UINT8;case Uint16Array:return r.DT_UINT16;case Uint32Array:return r.DT_UINT32}}}function Jp(a,e){if(e===Lu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),a;if(e===io||e===Ql){let t=a.getIndex();if(t===null){const r=[],o=a.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)r.push(l);a.setIndex(r),t=a.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}const n=t.count-2,i=[];if(e===io)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=a.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),a}class Gh extends Zt{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new rS(t)}),this.register(function(t){return new aS(t)}),this.register(function(t){return new mS(t)}),this.register(function(t){return new gS(t)}),this.register(function(t){return new vS(t)}),this.register(function(t){return new lS(t)}),this.register(function(t){return new cS(t)}),this.register(function(t){return new hS(t)}),this.register(function(t){return new uS(t)}),this.register(function(t){return new sS(t)}),this.register(function(t){return new dS(t)}),this.register(function(t){return new oS(t)}),this.register(function(t){return new pS(t)}),this.register(function(t){return new fS(t)}),this.register(function(t){return new nS(t)}),this.register(function(t){return new xS(t)}),this.register(function(t){return new yS(t)})}load(e,t,n,i){const s=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=Ei.extractUrlBase(e);r=Ei.resolveURL(c,this.path)}else r=Ei.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new pn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const r={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Qp){try{r[et.KHR_BINARY_GLTF]=new _S(e)}catch(u){i&&i(u);return}s=JSON.parse(r[et.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new DS(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,r[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case et.KHR_MATERIALS_UNLIT:r[u]=new iS;break;case et.KHR_DRACO_MESH_COMPRESSION:r[u]=new MS(s,this.dracoLoader);break;case et.KHR_TEXTURE_TRANSFORM:r[u]=new SS;break;case et.KHR_MESH_QUANTIZATION:r[u]=new bS;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(r),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function tS(){let a={};return{get:function(e){return a[e]},add:function(e,t){a[e]=t},remove:function(e){delete a[e]},removeAll:function(){a={}}}}const et={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class nS{constructor(e){this.parser=e,this.name=et.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new Y(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ot);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Vn(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new on(h),c.distance=u;break;case"spot":c=new Jr(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,hi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class iS{constructor(){this.name=et.KHR_MATERIALS_UNLIT}getMaterialType(){return Pt}extendParams(e,t,n){const i=[];e.color=new Y(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],Ot),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,xt))}return Promise.all(i)}}class sS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class rS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Q(o,o)}return Promise.all(s)}}class aS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class oS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}}class lS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Y(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){const o=r.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Ot)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,xt)),r.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}}class cS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}}class hS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const o=r.attenuationColor||[1,1,1];return t.attenuationColor=new Y().setRGB(o[0],o[1],o[2],Ot),Promise.all(s)}}class uS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class dS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));const o=r.specularColorFactor||[1,1,1];return t.specularColor=new Y().setRGB(o[0],o[1],o[2],Ot),r.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,xt)),Promise.all(s)}}class fS{constructor(e){this.parser=e,this.name=et.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(s)}}class pS{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(s)}}class mS{constructor(e){this.parser=e,this.name=et.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}}class gS{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],o=i.images[r.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class vS{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],o=i.images[r.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class xS{constructor(e){this.name=et.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){const f=new ArrayBuffer(h*u);return r.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class yS{constructor(e){this.name=et.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==bn.TRIANGLES&&c.mode!==bn.TRIANGLE_STRIP&&c.mode!==bn.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=n.extensions[this.name].attributes,o=[],l={};for(const c in r)o.push(this.parser.getDependency("accessor",r[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const p of u){const v=new Oe,g=new C,m=new Vt,y=new C(1,1,1),_=new Xc(p.geometry,p.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,x),l.SCALE&&y.fromBufferAttribute(l.SCALE,x),_.setMatrixAt(x,v.compose(g,m,y));for(const x in l)if(x==="_COLOR_0"){const E=l[x];_.instanceColor=new ji(E.array,E.itemSize,E.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&p.geometry.setAttribute(x,l[x]);it.prototype.copy.call(_,p),this.parser.assignFinalMaterial(_),f.push(_)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Qp="glTF",oa=12,em={JSON:1313821514,BIN:5130562};class _S{constructor(e){this.name=et.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,oa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Qp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-oa,s=new DataView(e,oa);let r=0;for(;r<i;){const o=s.getUint32(r,!0);r+=4;const l=s.getUint32(r,!0);if(r+=4,l===em.JSON){const c=new Uint8Array(e,oa+r,o);this.content=n.decode(c)}else if(l===em.BIN){const c=oa+r;this.body=e.slice(c,c+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class MS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=et.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},l={},c={};for(const h in r){const u=Wh[h]||h.toLowerCase();o[u]=r[h]}for(const h in e.attributes){const u=Wh[h]||h.toLowerCase();if(r[h]!==void 0){const d=n.accessors[e.attributes[h]],f=sr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const v=f.attributes[p],g=l[p];g!==void 0&&(v.normalized=g)}u(f)},o,c,Ot,d)})})}}class SS{constructor(){this.name=et.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class bS{constructor(){this.name=et.KHR_MESH_QUANTIZATION}}class tm extends js{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,v=p-c,g=-2*f+3*d,m=f-d,y=1-g,_=m-d+u;for(let x=0;x!==o;x++){const E=r[v+x+o],b=r[v+x+l]*h,T=r[p+x+o],R=r[p+x]*h;s[x]=y*E+_*b+g*T+m*R}return s}}const wS=new Vt;class TS extends tm{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return wS.fromArray(s).normalize().toArray(s),s}}const bn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},sr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},nm={9728:wt,9729:Je,9984:Ma,9985:ys,9986:Ni,9987:xn},im={33071:Et,33648:xs,10497:Tn},Vh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Wh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ri={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},AS={CUBICSPLINE:void 0,LINEAR:Ss,STEP:Ms},Xh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ES(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new fn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Bn})),a.DefaultMaterial}function fs(a,e,t){for(const n in t.extensions)a[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function hi(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function CS(a,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(a);const r=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):a.attributes.position;r.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):a.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):a.attributes.color;l.push(d)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(a.morphAttributes.position=h),i&&(a.morphAttributes.normal=u),s&&(a.morphAttributes.color=d),a.morphTargetsRelative=!0,a})}function RS(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)a.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(a.morphTargetInfluences.length===t.length){a.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)a.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function LS(a){let e;const t=a.extensions&&a.extensions[et.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Yh(t.attributes):e=a.indices+":"+Yh(a.attributes)+":"+a.mode,a.targets!==void 0)for(let n=0,i=a.targets.length;n<i;n++)e+=":"+Yh(a.targets[n]);return e}function Yh(a){let e="";const t=Object.keys(a).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+a[t[n]]+";";return e}function qh(a){switch(a){case Int8Array:return .007874015748031496;case Uint8Array:return .00392156862745098;case Int16Array:return 3051850947599719e-20;case Uint16Array:return 15259021896696422e-21;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function PS(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":a.search(/\.ktx2($|\?)/i)>0||a.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const IS=new Oe;class DS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new tS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,r=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new qf(this.options.manager):this.textureLoader=new sp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new pn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){const o={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return fs(s,o,i),hi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i].joints;for(let o=0,l=r.length;o<l;o++)e[r[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(r,o)=>{const l=this.associations.get(r);l!=null&&this.associations.set(o,l);for(const[c,h]of r.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[et.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,r){n.load(Ei.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const r=Vh[i.type],o=sr[i.componentType],l=i.normalized===!0,c=new o(i.count*r);return Promise.resolve(new tt(c,r,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){const o=r[0],l=Vh[i.type],c=sr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let v,g;if(f&&f!==u){const m=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let _=t.cache.get(y);_||(v=new c(o,m*f,i.count*f/h),_=new Pr(v,f/h),t.cache.add(y,_)),g=new bi(_,l,d%f/h,p)}else o===null?v=new c(i.count*l):v=new c(o,d,i.count*l),g=new tt(v,l,p);if(i.sparse!==void 0){const m=Vh.SCALAR,y=sr[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,E=new y(r[1],_,i.sparse.count*m),b=new c(r[2],x,i.sparse.count*l);o!==null&&(g=new tt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let T=0,R=E.length;T<R;T++){const S=E[T];if(g.setX(S,b[T*l]),l>=2&&g.setY(S,b[T*l+1]),l>=3&&g.setZ(S,b[T*l+2]),l>=4&&g.setW(S,b[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s];let o=this.textureLoader;if(r.uri){const l=n.manager.getHandler(r.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,r=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[r.sampler]||{};return h.magFilter=nm[d.magFilter]||Je,h.minFilter=nm[d.minFilter]||xn,h.wrapS=im[d.wrapS]||Tn,h.wrapT=im[d.wrapT]||Tn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==wt&&h.minFilter!==Je,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const r=i.images[e],o=self.URL||self.webkitURL;let l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=n.getDependency("bufferView",r.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:r.mimeType});return l=o.createObjectURL(d),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(v){const g=new gt(v);g.needsUpdate=!0,d(g)}),t.load(Ei.resolveURL(u,s.path),p,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),hi(u,r),u.userData.mimeType=r.mimeType||PS(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[et.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[et.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(r);r=s.extensions[et.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,l)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new zr,Lt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new qt,Lt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||r){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),r&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return fn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let r;const o={},l=s.extensions||{},c=[];if(l[et.KHR_MATERIALS_UNLIT]){const u=i[et.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new Y(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ot),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,xt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=en);const h=s.alphaMode||Xh.OPAQUE;if(h===Xh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Xh.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==Pt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new Q(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&r!==Pt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==Pt){const u=s.emissiveFactor;o.emissive=new Y().setRGB(u[0],u[1],u[2],Ot)}return s.emissiveTexture!==void 0&&r!==Pt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,xt)),Promise.all(c).then(function(){const u=new r(o);return s.name&&(u.name=s.name),hi(u,s),t.associations.set(u,{materials:e}),s.extensions&&fs(i,u,s),u})}createUniqueName(e){const t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[et.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return sm(l,o,t)})}const r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=LS(c),u=i[h];if(u)r.push(u.promise);else{let d;c.extensions&&c.extensions[et.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=sm(new Ve,c,t),i[h]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,o=[];for(let l=0,c=r.length;l<c;l++){const h=r[l].material===void 0?ES(this.cache):this.getDependency("material",r[l].material);o.push(h)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const v=h[f],g=r[f];let m;const y=c[f];if(g.mode===bn.TRIANGLES||g.mode===bn.TRIANGLE_STRIP||g.mode===bn.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new Wc(v,y):new Le(v,y),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===bn.TRIANGLE_STRIP?m.geometry=Jp(m.geometry,Ql):g.mode===bn.TRIANGLE_FAN&&(m.geometry=Jp(m.geometry,io));else if(g.mode===bn.LINES)m=new In(v,y);else if(g.mode===bn.LINE_STRIP)m=new ai(v,y);else if(g.mode===bn.LINE_LOOP)m=new $c(v,y);else if(g.mode===bn.POINTS)m=new qo(v,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&RS(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),hi(m,s),g.extensions&&fs(i,m,g),t.assignFinalMaterial(m),u.push(m)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&fs(i,u[0],s),u[0];const d=new kt;s.extensions&&fs(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Rt(ze.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ks(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),hi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),r=i,o=[],l=[];for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u){o.push(u);const d=new Oe;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Nr(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],v=f.target,g=v.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,y=i.parameters!==void 0?i.parameters[p.output]:p.output;v.node!==void 0&&(r.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",y)),c.push(p),h.push(v))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],v=u[3],g=u[4],m=[];for(let y=0,_=d.length;y<_;y++){const x=d[y],E=f[y],b=p[y],T=v[y],R=g[y];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const S=n._createAnimationTracks(x,E,b,T,R);if(S)for(let M=0;M<S.length;M++)m.push(S[M])}return new Js(s,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),r})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)r.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,IS)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new Oo:c.length>1?h=new kt:c.length===1?h=c[0]:h=new it,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=r),hi(h,s),s.extensions&&fs(n,h,s),s.matrix!==void 0){const u=new Oe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new kt;n.name&&(s.name=i.createUniqueName(n.name)),hi(s,n),n.extensions&&fs(t,s,n);const r=n.nodes||[],o=[];for(let l=0,c=r.length;l<c;l++)o.push(i.getDependency("node",r[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Lt||d instanceof gt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const r=[],o=e.name?e.name:e.uuid,l=[];Ri[s.path]===Ri.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Ri[s.path]){case Ri.weights:c=ss;break;case Ri.rotation:c=rs;break;case Ri.position:case Ri.scale:c=os;break;default:switch(n.itemSize){case 1:c=ss;break;case 2:case 3:default:c=os;break}break}const h=i.interpolation!==void 0?AS[i.interpolation]:Ss,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const p=new c(l[d]+"."+Ri[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),r.push(p)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=qh(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof rs?TS:tm;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function US(a,e,t){const n=e.attributes,i=new Mt;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){const h=qh(sr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new C,l=new C;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const v=qh(sr[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}a.boundingBox=i;const r=new Bt;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,a.boundingSphere=r}function sm(a,e,t){const n=e.attributes,i=[];function s(r,o){return t.getDependency("accessor",r).then(function(l){a.setAttribute(o,l)})}for(const r in n){const o=Wh[r]||r.toLowerCase();o in a.attributes||i.push(s(n[r],o))}if(e.indices!==void 0&&!a.index){const r=t.getDependency("accessor",e.indices).then(function(o){a.setIndex(o)});i.push(r)}return Qe.workingColorSpace!==Ot&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Qe.workingColorSpace}" not supported.`),hi(a,e),US(a,e,t),Promise.all(i).then(function(){return e.targets!==void 0?CS(a,e.targets,t):a})}const Xn={cidade:"Cidade_Sketchfab_model",playerRig:"Player_Rig",carroGrupo:"Carro_Grupo"};function Zh(a){const e=(a??Qs).trim()||Qs;if(/^https?:\/\//i.test(e)||/^\/\//.test(e))throw new Error(`[GlbSceneLoader] External CDN URLs are forbidden by the zero-CDN policy for Draco decoders ("${e}"). Use a relative local path such as "./assets/draco/".`);return e.endsWith("/")?e:`${e}/`}function Kh(a){const e=(a??ea).trim()||ea;if(/^https?:\/\//i.test(e)||/^\/\//.test(e))throw new Error(`[GlbSceneLoader] External CDN URLs are forbidden by the zero-CDN policy for GLB models ("${e}"). Use a relative local path such as "./assets/models/cena_completa.glb".`);return e}function rm(a){const e=l=>{const c=a.find(u=>u.name.toLowerCase()===l.toLowerCase());if(c)return c.clone();const h=a.find(u=>u.name.toLowerCase().includes(l.toLowerCase()));return h?h.clone():null},t=e("Idle"),n=e("Walking"),i=e("Casting");let s=0,r=0;if(t){const l=t.tracks.find(c=>/hips\.position$/i.test(c.name));l&&l.values.length>=3&&(s=l.values[0],r=l.values[1])}const o=l=>{if(!l)return null;for(const c of l.tracks){if(!/hips\.position$/i.test(c.name)||c.values.length<3)continue;const h=Float32Array.from(c.values),u=h[0]-s,d=h[1]-r;if(Math.hypot(u,d)>.05){for(let f=0;f<h.length;f+=3)h[f]=h[f]-u,h[f+1]=h[f+1]-d;c.values=h}}return l};return{Idle:o(t),Walking:o(n),Casting:o(i)}}function $h(a,e){const t=a.scene,n=t.getObjectByName(Xn.cidade),i=t.getObjectByName(Xn.playerRig),s=t.getObjectByName(Xn.carroGrupo);if(!n||!i||!s){const H=[n?null:Xn.cidade,i?null:Xn.playerRig,s?null:Xn.carroGrupo].filter(Boolean).join(", ");throw zt.disposeObject3D(t),new Error(`[GlbSceneLoader] Missing required root node(s) in cena_completa.glb: ${H}`)}const r=[],o=[],l=[],c=[],h=[],u=[],d=[],f=[],p=[],v=[],g=[],m=new Set,y=qp(),_=(H,U,$,G=.68)=>{if(H.normalMap&&H.normalMap.isTexture){H.normalMap.colorSpace=An;const J=H.normalScale?H.normalScale.x:1,oe=H.normalScale?H.normalScale.y:1,le=J<0?-1:1,Se=oe<0?-1:1,K=le*Math.max(Math.abs(J),G),X=Se*Math.max(Math.abs(oe),G);H.normalScale?H.normalScale.set(K,X):H.normalScale=new Q(K,X)}else H.normalMap=U,H.normalScale=new Q($,$);H.userData.__baseNormalScaleX=H.normalScale.x,H.userData.__baseNormalScaleY=H.normalScale.y},x=[],E=[],b=[];n.updateMatrixWorld(!0);const T=H=>{const U=[H.name];let $=H.parent;for(;$&&$!==n;)$.name&&U.push($.name),$=$.parent;return U.join("/")};n.traverse(H=>{const U=H;if(!U.isMesh)return;const $=Array.isArray(U.material)?U.material:[U.material],G=$[0];if(U.name==="Cidade_Object_331"||G&&G.opacity===0&&!G.transparent){U.visible=!1,U.castShadow=!1,U.receiveShadow=!1;return}const J=T(U);/Cidade_leaves_0_3/i.test(J)||/^Cidade_Object_(8|10|12)$/i.test(U.name)?x.push(U):/Cidade_leaves001_1_7/i.test(J)||/^Cidade_Object_(15|17|19)$/i.test(U.name)?E.push(U):(/Cidade_(Plane05[23]_8[56]|Cylinder00[1-5]_(79|80|81|84|87))/i.test(J)||/^Cidade_Object_(296|299|302|304|313|315|318|321|323|326|328)$/i.test(U.name))&&b.push(U);const oe=$.map(X=>(X==null?void 0:X.name)??"").join(" ").toLowerCase(),le=/grass|leav|material\.00[569]/i.test(oe),Se=$.some(X=>!!(X&&X.transparent));Se&&(U.userData.skipNormalPass=!0),U.castShadow=!le&&!Se;const K=/real_road|road|asphalt/i.test(oe);U.receiveShadow=!Se&&!K,K&&(U.castShadow=!1);for(const X of $){const V=X;if(!V||m.has(V.uuid))continue;m.add(V.uuid);const ge=(V.name||"").toLowerCase();V.metalnessMap&&(V.metalnessMap=null),(/palettematerial00[1-7]|material\.034/i.test(ge)||V.metalness>=.35)&&(V.metalness=Math.min(.18,V.metalness),V.roughness=Math.min(.62,Math.max(.28,V.roughness))),/real_road|road|asphalt/i.test(ge)?(V.userData.asciiRoadSurface=!0,V.fog=!1,_(V,y.asphalt,0,0),V.normalScale.set(0,0),V.userData.__baseNormalScaleX=0,V.userData.__baseNormalScaleY=0,r.push(V)):/concrete_pavement|tiles|material\.010/i.test(ge)?(_(V,y.pavement,.68,.82),o.push(V)):/window|wiind/i.test(ge)?c.push(V):/grass|leav|material\.00[569]/i.test(ge)?u.push(V):/palettematerial005|material\.033/i.test(ge)?d.push(V):/material\.026|material\.035/i.test(ge)?f.push(V):V.emissive&&V.emissive.r+V.emissive.g+V.emissive.b>.25?(V.metalness=Math.min(.12,V.metalness),h.push(V)):/^material$|wall|hous|roof|rust|metal|palettematerial00[1347]|bollard|utility_box|material\.0(01|03|04|07|08|11|12|14|16|17|20|21|24|28|29|30|31|32|34)/i.test(ge)?(_(V,y.facade,.56,.72),l.push(V)):Se||(_(V,y.facade,.42,.6),l.push(V))}});const R=(H,U,$)=>{if($.length===0)return null;const G=new Mt;for(const J of $)G.union(new Mt().setFromObject(J));return{role:H,label:U,meshes:$,worldBox:G,occluded:!1}},S=[R("eastTree","Cidade_leaves_0_3 (East Plaza Tree)",x),R("westTree","Cidade_leaves001_1_7 (West Plaza Tree)",E),R("frontSign","Cidade_Plane052_053 (Foreground Hanging Sign)",b)].filter(H=>H!==null),M=new fn({name:"PlayerProtagonistMaterial",color:new Y("#55778A"),emissive:new Y("#2A4152"),emissiveIntensity:.06,roughness:.72,metalness:.03});_(M,y.contourTrim,.38,.38),p.push(M),i.traverse(H=>{const U=H,$=H;if(U.isMesh){U.castShadow=!0,U.receiveShadow=!0;const J=Array.isArray(U.material)?U.material[0]:U.material;!J||!J.map&&J.metalness>=.85?(J&&!m.has(J.uuid)&&J.dispose(),U.material=M):m.has(J.uuid)||(m.add(J.uuid),J.userData.__playerBaseColor=J.color.clone(),J.metalness=Math.min(.22,J.metalness),J.roughness=Math.min(.55,Math.max(.3,J.roughness)),_(J,y.contourTrim,.38,.45),p.push(J))}$.isSkinnedMesh&&($.frustumCulled=!1)});const P=new Map;s.traverse(H=>{const U=H;if(!U.isMesh)return;const $=/headlight/i.test(U.name),G=/body_color|supra|chrome|rims/i.test(U.name),J=/tire|rubber|blocker/i.test(U.name),le=(Array.isArray(U.material)?U.material:[U.material]).map(Se=>{const K=Se;if(!K)return Se;K.transparent&&(U.userData.skipNormalPass=!0);const X=`${K.uuid}::${$?"hl":G?"body":J?"tire":"trim"}`;let V=P.get(X);return V||(V=K.clone(),V.metalnessMap=null,$?(V.metalness=.1,V.roughness=.18,g.push(V)):G?(V.color=new Y("#C8D6E2"),V.emissive=new Y("#1B2A36"),V.emissiveIntensity=.22,V.metalness=.28,V.roughness=.28,_(V,y.contourTrim,.32,.45),v.push(V)):J?(V.color=new Y("#283038"),V.metalness=.08,V.roughness=.78,_(V,y.asphalt,.65,.75)):(V.metalness=.25,V.roughness=.42,_(V,y.contourTrim,.3,.45),v.push(V)),P.set(X,V)),V});U.material=Array.isArray(U.material)?le:le[0],U.castShadow=!U.userData.skipNormalPass,U.receiveShadow=!U.userData.skipNormalPass});const z=rm(a.animations??[]);let F=!1;return{sceneRoot:t,nodes:{cidade:n,playerRig:i,carroGrupo:s},clips:z,materials:{roads:r,sidewalks:o,walls:l,windows:c,streetLamps:h,foliage:u,kioskGlass:d,billboards:f,character:p,carBody:v,carHeadlightCovers:g},proceduralNormals:y,foregroundOccluders:S,dispose:()=>{F||(F=!0,zt.disposeObject3D(n),zt.disposeObject3D(i),zt.disposeObject3D(s),zt.disposeObject3D(t),y.dispose(),e==null||e())}}}class am{constructor(){D(this,"dracoLoader",null);D(this,"gltfLoader",null);D(this,"disposed",!1)}load(e){if(this.disposed)return Promise.reject(new Error("[GlbSceneLoader] Loader has already been disposed."));const t=Kh(e==null?void 0:e.modelUrl),n=Zh(e==null?void 0:e.dracoDecoderPath);return this.dracoLoader||(this.dracoLoader=new Hh),this.dracoLoader.setDecoderPath(n),this.dracoLoader.setWorkerLimit(Math.max(1,Math.min(8,Math.round((e==null?void 0:e.workerLimit)??4)))),this.dracoLoader.preload(),this.gltfLoader||(this.gltfLoader=new Gh,this.gltfLoader.setDRACOLoader(this.dracoLoader)),new Promise((i,s)=>{this.gltfLoader.load(t,r=>{if(this.disposed){zt.disposeObject3D(r.scene),s(new Error("[GlbSceneLoader] Load cancelled because engine was destroyed."));return}try{const o=$h(r);i(o)}catch(o){s(o instanceof Error?o:new Error(String(o)))}},r=>{if(this.disposed||!(e!=null&&e.onProgress))return;const o=r.loaded??0,l=r.lengthComputable&&r.total>0?r.total:0;e.onProgress({url:t,loaded:o,total:l,ratio:l>0?Math.min(1,o/l):-1})},r=>{const o=r instanceof Error?r.message:typeof r=="object"&&r!==null&&"message"in r?String(r.message):String(r);s(new Error(`[GlbSceneLoader] Failed to load "${t}": ${o}`))})})}parseBuffer(e,t=""){return this.disposed?Promise.reject(new Error("[GlbSceneLoader] Loader has already been disposed.")):(this.dracoLoader||(this.dracoLoader=new Hh,this.dracoLoader.setDecoderPath(Qs),this.dracoLoader.setWorkerLimit(4)),this.gltfLoader||(this.gltfLoader=new Gh,this.gltfLoader.setDRACOLoader(this.dracoLoader)),new Promise((n,i)=>{this.gltfLoader.parse(e,t,s=>{try{n($h(s))}catch(r){i(r instanceof Error?r:new Error(String(r)))}},s=>{i(s instanceof Error?s:new Error(String(s)))})}))}dispose(){this.disposed||(this.disposed=!0,this.dracoLoader&&(this.dracoLoader.dispose(),this.dracoLoader=null),this.gltfLoader=null)}isDisposed(){return this.disposed}}const la="#25465B",om="#4E819A",lm="#BFE4F6",NS=`
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,FS=`
  precision highp float;

  uniform vec3 uBackdropColor;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    // Calibrated directly for the single canonical ASCII composite pass:
    // maps the deep polar-ice backdrop (#25465B) into a calm, cold ASCII stipple
    // (',' ':' ';'). Kept dark on purpose: the composite remaps geometry into
    // 0.13→0.84, so a bright wall would flood the frame with dense glyphs and wash
    // Tux out instead of framing his silhouette.
    vec3 backdropBase = pow(max(uBackdropColor, vec3(0.0001)), vec3(1.0 / 2.2));
    vec2 focus = vec2(vWorldPos.x * 0.24, (vWorldPos.y - 1.05) * 0.34);
    float studioPool = exp(-dot(focus, focus) * 1.45);
    float verticalFalloff = clamp(1.04 - max(vWorldPos.y, 0.0) * 0.055, 0.88, 1.04);
    float radianceScale = clamp(verticalFalloff * 0.500 + studioPool * 0.060, 0.460, 0.560);

    gl_FragColor = vec4(backdropBase * radianceScale, 1.0);
  }
`,OS=`
  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,BS=`
  precision highp float;

  uniform vec3 uFloorColor;
  uniform vec3 uBackdropColor;
  uniform vec3 uReflectBellyColor;
  uniform vec3 uReflectAmberColor;
  uniform vec3 uReflectRimColor;
  uniform vec3 uCamPos;
  uniform vec3 uSubjectPos;
  uniform float uSubjectYaw;
  uniform float uHorizonZ;

  uniform sampler2D uDirShadowMap;
  uniform mat4 uDirShadowMatrix;
  uniform vec2 uShadowMapSize;
  uniform float uShadowEnabled;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  const float UnpackDownscale = 255.0 / 256.0;
  const vec4 PackFactors = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
  const vec4 UnpackFactors4 = vec4(UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a);

  float unpackRGBAToDepth(const in vec4 v) {
    return dot(v, UnpackFactors4);
  }

  float sampleSoftKeyShadow(vec3 worldPos) {
    if (uShadowEnabled < 0.5) return 1.0;

    vec4 sc = uDirShadowMatrix * vec4(worldPos, 1.0);
    vec3 proj = sc.xyz / max(sc.w, 0.0001);
    proj.z -= 0.00065;

    if (proj.x <= 0.005 || proj.x >= 0.995 || proj.y <= 0.005 || proj.y >= 0.995 || proj.z <= 0.0 || proj.z >= 1.0) {
      return 1.0;
    }

    vec2 texel = 1.75 / max(uShadowMapSize, vec2(512.0));
    float s0 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy)));
    float s1 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy + vec2( texel.x,  texel.y * 0.5))));
    float s2 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy + vec2(-texel.x, -texel.y * 0.5))));
    float s3 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy + vec2(-texel.x * 0.5,  texel.y))));
    float s4 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy + vec2( texel.x * 0.5, -texel.y))));
    return s0 * 0.28 + (s1 + s2 + s3 + s4) * 0.18;
  }

  void main() {
    vec2 relXz = vWorldPos.xz - uSubjectPos.xz;
    float cosY = cos(-uSubjectYaw);
    float sinY = sin(-uSubjectYaw);
    vec2 localGround = vec2(
      relXz.x * cosY - relXz.y * sinY,
      relXz.x * sinY + relXz.y * cosY
    );

    vec3 floorBase = pow(max(uFloorColor, vec3(0.0001)), vec3(1.0 / 2.2));
    vec3 backdropBase = pow(max(uBackdropColor, vec3(0.0001)), vec3(1.0 / 2.2));

    // 1. Calibrated #4E819A glacier-shelf radiance so the canonical ASCII ramp selects horizontal weave ('~' '+' '_' '-')
    float radialDist = length(relXz * vec2(0.38, 0.46));
    float depthGrade = clamp((vWorldPos.z - uHorizonZ) / 6.2, 0.0, 1.0);
    float floorLight = clamp(0.50 + depthGrade * 0.05 + exp(-radialDist * radialDist * 1.1) * 0.04, 0.49, 0.60);
    vec3 color = floorBase * floorLight;

    // 2. Soft grounding shadow under Tux (5-tap PCF directional shadow + smooth elliptical contact AO)
    float pcfLit = sampleSoftKeyShadow(vWorldPos);
    float bodyAoDist = length((relXz - vec2(0.08, -0.05)) / vec2(0.88, 0.72));
    float bodyContactAo = 1.0 - smoothstep(0.16, 1.10, bodyAoDist);

    float footLDist = length((localGround - vec2(-0.34, 0.42)) / vec2(0.30, 0.36));
    float footRDist = length((localGround - vec2( 0.34, 0.42)) / vec2(0.30, 0.36));
    float feetContactAo =
      (1.0 - smoothstep(0.14, 1.04, footLDist)) * 0.52 +
      (1.0 - smoothstep(0.14, 1.04, footRDist)) * 0.52;

    float combinedOcclusion = clamp(
      max(bodyContactAo * 0.42 + feetContactAo * 0.18, (1.0 - pcfLit) * 0.40),
      0.0,
      0.48
    );
    color *= (1.0 - combinedOcclusion);

    // 3. Subtle, diffused planar reflection quantized through the same ASCII pass
    vec3 viewInc = normalize(vWorldPos - uCamPos);
    vec3 reflDir = reflect(viewInc, vec3(0.0, 1.0, 0.0));
    float rHoriz2 = max(dot(reflDir.xz, reflDir.xz), 0.0001);
    float tHit = -dot(relXz, reflDir.xz) / rHoriz2;

    if (tHit > 0.0 && reflDir.y > 0.01) {
      vec3 q = vWorldPos + reflDir * tHit;
      float qy = q.y - uSubjectPos.y;

      if (qy > -0.05 && qy < 2.10) {
        vec2 qRel = q.xz - uSubjectPos.xz;
        vec2 qLocal = vec2(
          qRel.x * cosY - qRel.y * sinY,
          qRel.x * sinY + qRel.y * cosY
        );

        float blur = 0.18 + max(qy, 0.0) * 0.28;
        float heightFade = exp(-max(qy, 0.0) * 1.25);
        float floorProxFade = exp(-length(relXz) * 0.55);
        float reflEnvelope = heightFade * floorProxFade;

        vec2 coatEllip = vec2(qLocal.x / (0.72 + blur), (qy - 0.88) / (0.98 + blur));
        float coatMask = (1.0 - smoothstep(0.55, 1.08, length(coatEllip))) * reflEnvelope;
        float coatRim = smoothstep(0.54, 0.94, length(coatEllip)) * coatMask;
        color *= (1.0 - coatMask * 0.10);
        color += uReflectRimColor * (coatRim * 0.032);

        float frontFacing = smoothstep(-0.15, 0.65, cos(uSubjectYaw));
        vec2 bellyEllip = vec2(qLocal.x / (0.50 + blur), (qy - 0.76) / (0.82 + blur));
        float bellyMask = (1.0 - smoothstep(0.42, 1.02, length(bellyEllip))) * frontFacing * reflEnvelope;
        color += uReflectBellyColor * (bellyMask * 0.065);

        vec2 footLRefl = vec2((qLocal.x + 0.34) / (0.26 + blur * 0.65), (qy - 0.10) / (0.22 + blur * 0.65));
        vec2 footRRefl = vec2((qLocal.x - 0.34) / (0.26 + blur * 0.65), (qy - 0.10) / (0.22 + blur * 0.65));
        float footVisL = smoothstep(-0.35, 0.55, qLocal.y + 0.32);
        float feetReflMask = (
          (1.0 - smoothstep(0.35, 1.05, length(footLRefl))) +
          (1.0 - smoothstep(0.35, 1.05, length(footRRefl)))
        ) * footVisL * reflEnvelope;
        color += uReflectAmberColor * (clamp(feetReflMask, 0.0, 1.15) * 0.055);
      }
    }

    float ndotv = clamp(dot(-viewInc, vec3(0.0, 1.0, 0.0)), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 4.0);
    color += uReflectRimColor * (fresnel * 0.018);

    float horizonSeam = smoothstep(uHorizonZ + 0.045, uHorizonZ - 0.005, vWorldPos.z);
    color = mix(color, backdropBase * 0.50, horizonSeam);

    gl_FragColor = vec4(color, 1.0);
  }
`;let jh=null;function kS(){if(!jh){const a=new Uint8Array([255,255,255,255]),e=new Qt(a,1,1,vt,yn);e.minFilter=wt,e.magFilter=wt,e.needsUpdate=!0,jh=e}return jh}class cm{static build(e){const t=new Y(la),n=new Y(om),i=new Ws;i.background=t.clone();const s=-3.35,r=new Xt({vertexShader:NS,fragmentShader:FS,uniforms:{uBackdropColor:{value:t.clone()}},depthWrite:!0}),o=new Le(new Ln(26,14,1,1),r);o.name="MascotStageBackdrop",o.position.set(0,4.6,s),o.userData.isMascotBackdrop=!0,o.userData.skipObjectOutline=!0,i.add(o);const l=kS(),c=new Xt({vertexShader:OS,fragmentShader:BS,uniforms:{uFloorColor:{value:n.clone()},uBackdropColor:{value:t.clone()},uReflectBellyColor:{value:new Y("#DCEBF5")},uReflectAmberColor:{value:new Y("#FF9F1C")},uReflectRimColor:{value:new Y("#7FA8C4")},uCamPos:{value:new C(0,1.08,4.25)},uSubjectPos:{value:new C(0,0,0)},uSubjectYaw:{value:.14},uHorizonZ:{value:s},uDirShadowMap:{value:l},uDirShadowMatrix:{value:new Oe},uShadowMapSize:{value:new Q(1024,1024)},uShadowEnabled:{value:0}},depthWrite:!0}),h=new Le(new Ln(24,12,1,1),c);h.name="MascotStageFloor",h.rotation.x=-Math.PI/2,h.position.set(0,0,-.55),h.receiveShadow=!0,h.userData.isMascotFloor=!0,h.userData.skipObjectOutline=!0,i.add(h);const u=new ml(13953527,3492958,.92);u.name="MascotHemiLight",i.add(u);const d=new Vn(16186111,1.24);d.name="MascotKeyLight",d.position.set(-2.1,3.6,4.1),e.enableShadows&&(d.castShadow=!0,d.shadow.mapSize.width=1024,d.shadow.mapSize.height=1024,d.shadow.radius=3.2,d.shadow.bias=-4e-4,d.shadow.normalBias=.02,d.shadow.camera.left=-1.8,d.shadow.camera.right=1.8,d.shadow.camera.top=2.5,d.shadow.camera.bottom=-.6,d.shadow.camera.near=.5,d.shadow.camera.far=12,d.shadow.camera.updateProjectionMatrix()),i.add(d);const f=new Vn(14478584,.56);f.name="MascotFillLight",f.position.set(2.4,1.9,3.5),i.add(f);const p=new Vn(10146032,.82);p.name="MascotRimLight",p.position.set(2.35,2.25,-2.9),i.add(p);const v=new Vn(8961758,.6);return v.name="MascotBackLeftRimLight",v.position.set(-2.25,2.1,-2.8),i.add(v),{scene:i,backdropMesh:o,backdropMaterial:r,floorMesh:h,floorMaterial:c,hemiLight:u,keyLight:d,fillLight:f,rimLight:p,backLeftRimLight:v}}}class hm{constructor(e,t){D(this,"container");D(this,"config");D(this,"state","idle");D(this,"userManuallyPaused",!1);D(this,"autoPausedOffscreen",!1);D(this,"autoPausedHiddenTab",!1);D(this,"isFullscreenActive",!1);D(this,"renderer",null);D(this,"scene",null);D(this,"camera",null);D(this,"lastAutoPlaygroundFov",null);D(this,"outlinedTargets",new Set);D(this,"postProcessor",null);D(this,"loop",null);D(this,"lifecycle",null);D(this,"pointerInput",null);D(this,"keyboardInput",null);D(this,"ecsWorld",null);D(this,"systemRunner",null);D(this,"vfx",null);D(this,"glbLoader",null);D(this,"builtUrbanStage",null);D(this,"glbLoaded",!1);D(this,"builtMascot",null);D(this,"mascotRootObj",null);D(this,"primaryEntityId",null);D(this,"lastResolutionProfile",null);D(this,"containerWidth",1);D(this,"containerHeight",1);D(this,"activeCellSize",8);D(this,"gridColumns",1);D(this,"gridRows",1);D(this,"effectiveDpr",1);D(this,"resolutionTier","desktop");D(this,"lastDrawCalls",0);D(this,"lastTriangles",0);D(this,"onPassivePointerMoveBound");D(this,"onContextLostBound");if(!e||!(e instanceof HTMLElement))throw new Error("[AsciiSceneEngine] A valid container HTMLElement is required to instantiate the engine.");this.container=e;const n=(t==null?void 0:t.mode)==="mascot"?ta(Ch,{fov:38,cellSize:8,autoResponsiveDensity:!0,enableKeyboard:!1,bloomIntensity:.08,dofStrength:0,blockBlendWeight:0,palette:{background:la}}):Ch;this.config=ta(n,t),this.onPassivePointerMoveBound=this.handlePassiveContainerMove.bind(this),this.onContextLostBound=this.handleContextLost.bind(this)}mount(){var e,t,n,i,s,r;if(this.state==="destroyed")throw new Error("[AsciiSceneEngine] Cannot mount an engine instance that has already been destroyed. Create a new instance instead.");if(this.state==="idle")try{window.getComputedStyle(this.container).position==="static"&&(this.container.style.position="relative");const l=new qd({antialias:!1,alpha:!1,powerPreference:"high-performance",stencil:!1,depth:!1}),c=Math.min(window.devicePixelRatio||1,this.config.maxPixelRatio);l.setPixelRatio(c),l.shadowMap.enabled=this.config.enableShadows,l.shadowMap.type=kl,l.outputColorSpace=xt,l.info.autoReset=!0;const h=l.domElement;h.style.display="block",h.style.width="100%",h.style.height="100%",h.style.position="absolute",h.style.inset="0",h.style.zIndex="0",h.style.pointerEvents="none",h.setAttribute("aria-hidden","true"),h.dataset.asciiEngineCanvas="true",h.addEventListener("webglcontextlost",this.onContextLostBound,!1),this.container.prepend(h),this.renderer=l;const u=new zt(this.container),d=new Xp(this.container,{trackWindowHover:!1}),f=new Vp({enabled:this.config.mode!=="mascot"&&this.config.enableKeyboard,focusTarget:this.container});this.config.mode!=="mascot"&&(d.attach(),this.config.enableKeyboard&&f.attach(),this.container.addEventListener("pointermove",this.onPassivePointerMoveBound,{passive:!0})),u.registerCleanup(()=>{this.container.removeEventListener("pointermove",this.onPassivePointerMoveBound),d.detach(),f.detach()}),this.lifecycle=u,this.pointerInput=d,this.keyboardInput=f;const p=new zp,v=new kp;this.ecsWorld=p,this.systemRunner=v,this.config.mode==="mascot"?this.initMascotStage(p,v):this.initPlaygroundStage(v,d,f),this.postProcessor=new ci(this.config);const g=this.container.getBoundingClientRect();this.postProcessor.applyConfig(this.config,!1,Math.max(1,g.width),Math.max(1,g.height),typeof window<"u"&&window.devicePixelRatio||1,this.isCoarsePointerDevice(),!0),this.applyResize(Math.max(1,g.width),Math.max(1,g.height),!0),u.observeContainer({onResize:(m,y)=>this.applyResize(m,y,!1),onVisibilityChange:m=>this.handleIntersectionVisibility(m),onTabHiddenChange:m=>this.handleTabVisibility(m),onFullscreenChange:m=>{this.isFullscreenActive=m}},{observeViewportIntersection:this.config.pauseOffscreen,observeTabVisibility:this.config.pauseOnHiddenTab}),this.loop=new Lp({maxFps:this.config.maxFps,onFrame:({dt:m,elapsed:y})=>this.renderFrame(m,y),onTelemetry:()=>{var m,y;return(y=(m=this.config.callbacks)==null?void 0:m.onFpsUpdate)==null?void 0:y.call(m,this.getStats())}}),this.state="running",this.loop.start(),(t=(e=this.config.callbacks)==null?void 0:e.onStateChange)==null||t.call(e,"running"),(i=(n=this.config.callbacks)==null?void 0:n.onMount)==null||i.call(n)}catch(o){const l=o instanceof Error?o:new Error(String(o));throw(r=(s=this.config.callbacks)==null?void 0:s.onError)==null||r.call(s,l),l}}initPlaygroundStage(e,t,n){const i=mn.createStage(this.config);this.builtUrbanStage=i,this.scene=i.scene;const s=typeof this.config.fov=="number"?this.config.fov:58,r=[ir.x,ir.y,ir.z],o=[r[0]+Wn.offsetX,r[1]+Wn.offsetY,r[2]+Wn.offsetZ],l=[r[0]+Wn.lookAtOffsetX,r[1]+Wn.lookAtOffsetY,r[2]+Wn.lookAtOffsetZ],c=new Rt(s,16/9,.15,160);c.position.set(...o),c.lookAt(...l),c.updateMatrixWorld(),this.camera=c,this.lastAutoPlaygroundFov=typeof this.config.fov=="number"?null:s,this.vfx=new Ul({scene:i.scene,config:this.config,baseCameraPos:o,lookAtTarget:l}),e.addSystem(new Np(t,n,c),10).addSystem(new Fp,15).addSystem(new Dh(i.waypointMarker),20).addSystem(new Ep,28).addSystem(new Eh,30).addSystem(new Op(c),38).addSystem(new Bp(c),39).addSystem(new Uh,40);const h=new am;this.glbLoader=h,this.container.setAttribute("data-scene-loading","true"),h.load({modelUrl:this.config.modelUrl,dracoDecoderPath:this.config.dracoDecoderPath,onProgress:u=>{var d,f;(f=(d=this.config.callbacks)==null?void 0:d.onLoadProgress)==null||f.call(d,u)}}).then(u=>{var d,f,p,v,g;if(this.state==="destroyed"||!this.ecsWorld||!this.builtUrbanStage){u.dispose();return}mn.attachPreparedAssets(this.builtUrbanStage,u,this.config,this.ecsWorld),this.primaryEntityId=this.builtUrbanStage.playerEntityId,this.glbLoaded=!0,this.container.removeAttribute("data-scene-loading"),this.container.setAttribute("data-glb-ready","true"),(f=this.systemRunner)==null||f.run(this.ecsWorld,{dt:0,elapsed:((d=this.loop)==null?void 0:d.getElapsedSeconds())??0}),this.renderer&&(this.renderer.shadowMap.needsUpdate=!0),this.state==="paused"&&((p=this.loop)==null||p.stepOnce(0)),(g=(v=this.config.callbacks)==null?void 0:v.onLoadReady)==null||g.call(v)}).catch(u=>{var f,p,v,g;if(this.state==="destroyed")return;this.container.removeAttribute("data-scene-loading"),this.container.setAttribute("data-glb-error","true");const d=u instanceof Error?u:new Error(String(u));(p=(f=this.config.callbacks)==null?void 0:f.onLoadError)==null||p.call(f,d),(g=(v=this.config.callbacks)==null?void 0:v.onError)==null||g.call(v,d)})}initMascotStage(e,t){this.config={...this.config,palette:{...this.config.palette,background:la}};const n=cm.build(this.config);this.builtMascot=n,this.scene=n.scene;const i=[0,1.08,4.25],s=[0,.9,0],r=typeof this.config.fov=="number"?this.config.fov:38,o=new Rt(r,1,.3,40);o.position.set(...i),o.lookAt(...s),this.camera=o;const{entityId:l,rootGroup:c}=Gp.spawn(e,n.scene,{position:[0,.04,0],scale:1.02,includeShowcaseRig:!1,bobAmplitude:.018});this.primaryEntityId=l,this.mascotRootObj=c,this.setObjectOutline(c,{highlightColor:lm,thickness:3,intensity:1,opacity:1}),this.vfx=null,t.addSystem(new Dh,20).addSystem(new Eh,30).addSystem(new Uh,40)}pause(){this.userManuallyPaused=!0,this.transitionToPaused()}resume(){this.userManuallyPaused=!1,this.tryResumeIfEligible()}setPlayableKeyboardEnabled(e){var t;this.config.enableKeyboard=e,this.config.mode!=="mascot"&&((t=this.keyboardInput)==null||t.setEnabled(e))}setAutoOrbit(e){var t;if(this.config.autoOrbit=!!e,this.ecsWorld&&((t=this.builtUrbanStage)==null?void 0:t.playerEntityId)!=null){const n=this.ecsWorld.getComponent(this.builtUrbanStage.playerEntityId,"CameraFollow");n&&(n.autoOrbit=!!e)}}isGlbLoaded(){return this.glbLoaded}resize(e,t=!1){this.state!=="destroyed"&&e.width>0&&e.height>0&&this.applyResize(e.width,e.height,t)}updateConfig(e){var l,c,h,u,d;if(this.state==="destroyed")return;const t=this.config.characterRamp,n=this.config.structuralChars,i=this.config.fontFamily,s=this.config.enableShadows;if(this.config=ta(this.config,e),this.config.mode!=="mascot"&&((l=this.keyboardInput)==null||l.setEnabled(this.config.enableKeyboard)),e.autoOrbit!==void 0&&this.setAutoOrbit(e.autoOrbit),(c=this.loop)==null||c.setMaxFps(this.config.maxFps),!this.renderer||!this.scene||!this.postProcessor)return;this.camera&&typeof e.fov=="number"&&(this.camera.fov=e.fov,this.camera.updateProjectionMatrix(),this.lastAutoPlaygroundFov=null),s!==this.config.enableShadows&&(this.renderer.shadowMap.enabled=this.config.enableShadows,this.builtMascot&&(this.builtMascot.keyLight.castShadow=this.config.enableShadows),this.renderer.shadowMap.needsUpdate=!0),this.builtMascot&&!((h=e.palette)!=null&&h.background)&&(this.config.palette.background=la),this.scene.background instanceof Y&&this.scene.background.set(this.config.palette.background),(e.atmosphere!==void 0||e.palette!==void 0||s!==this.config.enableShadows||e.windStrength!==void 0||e.reflectionStrength!==void 0||e.cursorLightIntensity!==void 0)&&(this.builtUrbanStage?(mn.applyAtmosphere(this.builtUrbanStage,this.config,this.ecsWorld??void 0),this.renderer.shadowMap.needsUpdate=!0):this.scene.fog instanceof Vs&&this.scene.fog.color.set(this.config.palette.background),(u=this.vfx)==null||u.applyConfig(this.config));const o=t!==this.config.characterRamp||n!==this.config.structuralChars||i!==this.config.fontFamily;this.postProcessor.applyConfig(this.config,o,this.containerWidth,this.containerHeight,typeof window<"u"&&window.devicePixelRatio||1,this.isCoarsePointerDevice(),!0),this.applyResize(this.containerWidth,this.containerHeight,!1,!0),this.state==="paused"&&((d=this.loop)==null||d.stepOnce(0))}destroy(){var e,t,n,i,s,r,o,l,c;if(this.state!=="destroyed"){(e=this.loop)==null||e.stop(),this.loop=null,(t=this.systemRunner)==null||t.clear(),this.systemRunner=null;for(const h of this.outlinedTargets)ra(h);if(this.outlinedTargets.clear(),this.glbLoader&&(this.glbLoader.dispose(),this.glbLoader=null),this.vfx&&(this.vfx.dispose(),this.vfx=null),(n=this.ecsWorld)==null||n.clear(!0),this.ecsWorld=null,(i=this.builtUrbanStage)!=null&&i.assets&&this.builtUrbanStage.assets.dispose(),this.builtUrbanStage=null,this.glbLoaded=!1,this.builtMascot=null,this.mascotRootObj=null,this.container.removeAttribute("data-scene-loading"),this.container.removeAttribute("data-glb-ready"),this.container.removeAttribute("data-glb-error"),(s=this.lifecycle)==null||s.disposeAll(this.scene),this.lifecycle=null,this.scene=null,this.camera=null,this.pointerInput=null,this.keyboardInput=null,this.postProcessor&&(this.postProcessor.dispose(),this.postProcessor=null),this.renderer){const h=this.renderer.domElement;h.removeEventListener("webglcontextlost",this.onContextLostBound,!1),this.renderer.renderLists.dispose(),this.renderer.dispose(),h.parentNode&&h.parentNode.removeChild(h),this.renderer=null}this.state="destroyed",(o=(r=this.config.callbacks)==null?void 0:r.onStateChange)==null||o.call(r,"destroyed"),(c=(l=this.config.callbacks)==null?void 0:l.onDestroy)==null||c.call(l)}}getState(){return this.state}getConfig(){return ta(this.config)}getStats(){var t,n;const e=((t=this.loop)==null?void 0:t.getTelemetry())??{fps:60,frameTimeMs:16.67};return{fps:e.fps,frameTimeMs:e.frameTimeMs,activeCellSize:this.activeCellSize,gridColumns:this.gridColumns,gridRows:this.gridRows,drawCalls:this.lastDrawCalls,triangles:this.lastTriangles,entityCount:((n=this.ecsWorld)==null?void 0:n.getEntityCount())??0,effectiveDpr:this.effectiveDpr,resolutionTier:this.resolutionTier}}getResolutionProfile(){return this.lastResolutionProfile}getScene(){return this.scene}getWorld(){return this.ecsWorld}getCamera(){return this.camera}getPrimaryEntityAngles(){if(!this.ecsWorld||this.primaryEntityId===null)return null;const e=this.ecsWorld.getComponent(this.primaryEntityId,"Transform");return e?{yaw:e.rotY,pitch:e.rotX}:null}resolveOutlineTarget(e){var t,n,i;return!e&&e!==0?null:typeof e.traverse=="function"?e:e==="primary"?this.ecsWorld&&this.primaryEntityId!==null?((t=this.ecsWorld.getComponent(this.primaryEntityId,"Renderable"))==null?void 0:t.object3D)??null:null:typeof e=="number"?((i=(n=this.ecsWorld)==null?void 0:n.getComponent(e,"Renderable"))==null?void 0:i.object3D)??null:typeof e=="string"&&this.scene?this.scene.getObjectByName(e)??null:null}setObjectOutline(e,t){var o,l;if(this.state==="destroyed")return null;const n=this.resolveOutlineTarget(e);if(!n)return null;const i=kh(n)!==null,s={...t??{}};!i&&s.highlightColor===void 0&&s.color===void 0&&(s.highlightColor=((o=this.config.palette)==null?void 0:o.cursorLight)||nr);const r=Dl(n,s);return this.outlinedTargets.add(n),this.state==="paused"&&((l=this.loop)==null||l.stepOnce(0)),r}clearObjectOutline(e){var i,s;if(e===void 0){let r=0;for(const o of this.outlinedTargets)r+=ra(o);return this.outlinedTargets.clear(),this.state==="paused"&&((i=this.loop)==null||i.stepOnce(0)),r}const t=this.resolveOutlineTarget(e);if(!t)return 0;const n=ra(t);return this.outlinedTargets.delete(t),this.state==="paused"&&((s=this.loop)==null||s.stepOnce(0)),n}getObjectOutlineState(e){const t=this.resolveOutlineTarget(e);return t?kh(t):null}renderFrame(e,t){var s;if(!this.renderer||!this.scene||!this.camera||!this.postProcessor)return;this.ecsWorld&&this.systemRunner&&this.systemRunner.run(this.ecsWorld,{dt:e,elapsed:t});const n=this.pointerInput?this.pointerInput.sample(0):{normX:0,normY:0,dragYaw:0,dragPitch:0,active:!1,isDown:!1,isTouch:!1,motionSpeed:0,lastInteractionMs:0};if((s=this.vfx)==null||s.update(this.camera,n,e,t),this.builtMascot){const r=this.builtMascot.floorMaterial.uniforms;r.uCamPos&&r.uCamPos.value.copy(this.camera.position);const o=this.builtMascot.keyLight.shadow;if(this.config.enableShadows&&o.map?(r.uDirShadowMap&&(r.uDirShadowMap.value=o.map.texture),r.uDirShadowMatrix&&r.uDirShadowMatrix.value.copy(o.matrix),r.uShadowMapSize&&r.uShadowMapSize.value.set(o.mapSize.width,o.mapSize.height),r.uShadowEnabled&&(r.uShadowEnabled.value=1)):r.uShadowEnabled&&(r.uShadowEnabled.value=0),this.mascotRootObj){this.mascotRootObj.updateWorldMatrix(!0,!1);const l=this.mascotRootObj.matrixWorld.elements;r.uSubjectYaw&&(r.uSubjectYaw.value=Math.atan2(l[8]??0,l[10]??1)),r.uSubjectPos&&r.uSubjectPos.value.set(l[12]??0,0,l[14]??0)}}const i=this.postProcessor.render(this.renderer,this.scene,this.camera,t,e);this.lastDrawCalls=i.drawCalls,this.lastTriangles=i.triangles}isCoarsePointerDevice(){if(typeof window>"u"||typeof window.matchMedia!="function")return!1;try{return window.matchMedia("(pointer: coarse)").matches}catch{return!1}}applyResize(e,t,n=!1,i=!1){var h,u,d,f,p;if(!this.renderer||!this.camera||!this.postProcessor)return;const s=typeof window<"u"&&window.devicePixelRatio||1,r=this.isCoarsePointerDevice(),o=typeof document<"u"&&!!((u=(h=this.container).closest)!=null&&u.call(h,'[data-fullscreen-view="true"], .is-scene-fullscreen')),l=Ih({cssWidth:e,cssHeight:t,devicePixelRatio:s,config:this.config,isCoarsePointer:r,isFullscreen:this.isFullscreenActive||o});if(!n&&!i&&this.containerWidth===l.cssWidth&&this.containerHeight===l.cssHeight&&this.effectiveDpr===l.effectiveDpr&&this.activeCellSize===l.activeCellSize)return;this.lastResolutionProfile=l,this.containerWidth=l.cssWidth,this.containerHeight=l.cssHeight,this.effectiveDpr=l.effectiveDpr,this.resolutionTier=l.tier,this.activeCellSize=l.activeCellSize,this.gridColumns=l.columns,this.gridRows=l.rows,this.renderer.getPixelRatio()!==l.effectiveDpr&&this.renderer.setPixelRatio(l.effectiveDpr),this.renderer.setSize(l.cssWidth,l.cssHeight,!1);const c=Math.max(.1,l.cssWidth/Math.max(1,l.cssHeight));this.camera.aspect=c,typeof this.config.fov=="number"?(this.camera.fov=this.config.fov,this.lastAutoPlaygroundFov=null):this.config.mode==="playground"&&(this.lastAutoPlaygroundFov!==null&&Math.abs(this.camera.fov-this.lastAutoPlaygroundFov)>.01||(this.camera.fov=58,this.lastAutoPlaygroundFov=58)),this.camera.updateProjectionMatrix(),this.postProcessor.applyResolutionProfile(l,this.config,n),(f=(d=this.config.callbacks)==null?void 0:d.onResolutionChange)==null||f.call(d,l),this.state==="paused"&&((p=this.loop)==null||p.stepOnce(0))}transitionToPaused(){var e,t,n,i,s;this.state==="running"&&((e=this.loop)==null||e.pause(),this.state="paused",(n=(t=this.config.callbacks)==null?void 0:t.onStateChange)==null||n.call(t,"paused"),(s=(i=this.config.callbacks)==null?void 0:i.onPause)==null||s.call(i))}tryResumeIfEligible(){var e,t,n,i,s;this.state==="paused"&&(this.userManuallyPaused||this.autoPausedOffscreen||this.autoPausedHiddenTab||(this.state="running",(e=this.loop)==null||e.resume(),(n=(t=this.config.callbacks)==null?void 0:t.onStateChange)==null||n.call(t,"running"),(s=(i=this.config.callbacks)==null?void 0:i.onResume)==null||s.call(i)))}handleIntersectionVisibility(e){this.config.pauseOffscreen&&(e?(this.autoPausedOffscreen=!1,this.tryResumeIfEligible()):(this.autoPausedOffscreen=!0,this.transitionToPaused()))}handleTabVisibility(e){this.config.pauseOnHiddenTab&&(e?(this.autoPausedHiddenTab=!0,this.transitionToPaused()):(this.autoPausedHiddenTab=!1,this.tryResumeIfEligible()))}handlePassiveContainerMove(e){}handleContextLost(e){var t,n,i;e.preventDefault(),(t=this.loop)==null||t.pause(),(i=(n=this.config.callbacks)==null?void 0:n.onError)==null||i.call(n,new Error("[AsciiSceneEngine] WebGL context lost."))}}const um=ea,dm=[Xn.cidade,Xn.playerRig,Xn.carroGrupo],zS=["Idle","Walking","Casting"];function Li(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function HS(a){const e=a.lastIndexOf("/");return e>=0?a.slice(0,e+1):"./"}function GS(a){let e=0,t=0,n=0;const i={};return a.traverse(s=>{s.name&&(i[s.name]=s);const r=s;if(r.isMesh&&r.geometry){e+=1;const o=r.geometry.getAttribute("position");o&&(t+=o.count);const l=r.geometry.getIndex();l?n+=Math.floor(l.count/3):o&&(n+=Math.floor(o.count/3))}}),{meshCount:e,vertexCount:t,triangleCount:n,nodesByName:i}}class VS{constructor(e={}){D(this,"decoderPath");D(this,"defaultModelUrl");D(this,"workerLimit");D(this,"fetchImpl");D(this,"dracoLoader",null);D(this,"gltfLoader",null);D(this,"loadedScenes",new Set);D(this,"disposed",!1);this.decoderPath=Zh(e.decoderPath??Qs),this.defaultModelUrl=Kh(e.modelUrl??um);const t=Number.isFinite(e.workerLimit)?Number(e.workerLimit):4;this.workerLimit=Math.max(1,Math.min(8,Math.round(t))),this.fetchImpl=e.fetchImpl??(typeof globalThis.fetch=="function"?globalThis.fetch.bind(globalThis):null);const n=new Hh;n.setDecoderPath(this.decoderPath),n.setWorkerLimit(this.workerLimit),e.decoderType==="js"&&n.setDecoderConfig({type:"js"});const i=new Gh;i.setDRACOLoader(n),this.dracoLoader=n,this.gltfLoader=i}getDecoderPath(){return this.decoderPath}getWorkerLimit(){return this.workerLimit}preloadDecoder(){if(this.disposed||!this.dracoLoader)throw new Error("[SceneGlbLoader] Cannot preload a disposed loader.");this.dracoLoader.preload()}async load(e=this.defaultModelUrl){if(this.disposed||!this.gltfLoader||!this.dracoLoader)throw new Error("[SceneGlbLoader] Loader has already been disposed.");if(!this.fetchImpl)throw new Error("[SceneGlbLoader] Global fetch is unavailable in this environment.");const t=Li(),n=Li();this.dracoLoader.preload();const i=Li()-n,s=Li(),r=await this.fetchImpl(e);if(!r.ok)throw new Error(`[SceneGlbLoader] Failed to fetch "${e}" (HTTP ${r.status} ${r.statusText}).`);const o=await r.arrayBuffer(),l=Li()-s,c=o.byteLength,h=Li(),u=await this.gltfLoader.parseAsync(o,HS(e)),d=Li()-h,f=Li()-t,{meshCount:p,vertexCount:v,triangleCount:g,nodesByName:m}=GS(u.scene),y=dm.filter(S=>!!m[S]),_=(u.animations||[]).map(S=>S.name).filter(Boolean),x=c/(1024*1024),E=Math.max(f/1e3,1e-6),b=Number((x/E).toFixed(2));this.loadedScenes.add(u.scene);let T=!1;const R=()=>{T||(T=!0,this.loadedScenes.delete(u.scene),u.scene.parent&&u.scene.parent.remove(u.scene),zt.disposeObject3D(u.scene))};return{gltf:u,scene:u.scene,animations:u.animations||[],nodesByName:m,metrics:{url:e,decoderPath:this.decoderPath,workerLimit:this.workerLimit,byteLength:c,decoderPreloadMs:Number(i.toFixed(2)),fetchMs:Number(l.toFixed(2)),decompressAndParseMs:Number(d.toFixed(2)),totalMs:Number(f.toFixed(2)),throughputMiBps:b,meshCount:p,vertexCount:v,triangleCount:g,preservedNodes:y,animationNames:_},dispose:R}}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.loadedScenes)e.parent&&e.parent.remove(e),zt.disposeObject3D(e);this.loadedScenes.clear(),this.dracoLoader&&(this.dracoLoader.dispose(),this.dracoLoader=null),this.gltfLoader=null}}}return me.AnimationSystem=Eh,me.AsciiEngineCore=hm,me.AsciiPostProcessor=ci,me.AsciiSceneEngine=hm,me.CameraFollowSystem=Op,me.CharacterAnimationSystem=Ep,me.DEFAULT_ASCII_RAMP=Rp,me.DEFAULT_DRACO_DECODER_PATH=Qs,me.DEFAULT_ENGINE_CONFIG=Ch,me.DEFAULT_OUTLINE_HIGHLIGHT_COLOR=nr,me.DEFAULT_PALETTE=Cp,me.DEFAULT_SCENE_GLB_URL=um,me.DEFAULT_SCENE_MODEL_URL=ea,me.DEFAULT_URBAN_PLAYER_SPAWN=ir,me.DEFAULT_URBAN_SIDEWALK_BOUNDS=aa,me.EngineLoop=Lp,me.GLB_NODE_NAMES=Xn,me.GlbSceneLoader=am,me.InputSystem=Np,me.KeyboardInput=Vp,me.LifecycleManager=zt,me.LineOfSightOcclusionSystem=Bp,me.MASCOT_BACKDROP_HEX=la,me.MASCOT_FLOOR_HEX=om,me.MASCOT_OUTLINE_HEX=lm,me.MICRO_COARSE_STEP=Ph,me.MICRO_FINE_STEP=Lh,me.MICRO_FINE_STEP_THRESHOLD=Tl,me.MIN_MICRO_CELL_SIZE=er,me.MascotStageBuilder=cm,me.MovementRotationSystem=Dh,me.NormalPassMaterialCache=Zp,me.OUTLINE_SHELL_NAME=Oh,me.PointerInput=Xp,me.REQUIRED_SCENE_NLA_TRACKS=zS,me.REQUIRED_SCENE_ROOT_NODES=dm,me.RenderSyncSystem=Uh,me.ResolutionTransitionController=Up,me.SceneGlbLoader=VS,me.SystemRunner=kp,me.THREE=GM,me.TrafficFlowSystem=Fp,me.TuxEntityFactory=Gp,me.URBAN_CAMERA_FOLLOW_DEFAULTS=Wn,me.URBAN_TRAFFIC_DEFAULTS=Ft,me.UrbanGlbSceneBuilder=mn,me.VfxController=Ul,me.World=zp,me.applyObjectOutline=Dl,me.buildMicroCellStops=Pp,me.clampToSidewalkBounds=Al,me.clearObjectOutline=ra,me.computeAdaptiveResolution=Ih,me.createGlyphAtlas=Fh,me.createProceduralNormalMapSet=qp,me.detectResolutionTier=Dp,me.ensureWeldedOutlineNormals=$p,me.extractAndPrepareGlbNodes=$h,me.extractSceneDirectionalVectors=Kp,me.getObjectOutlineState=kh,me.mapNormalizedToMicroCell=XM,me.mergeEngineConfig=ta,me.normalizeCharacterClips=rm,me.normalizeRelativeDecoderPath=Zh,me.normalizeRelativeModelUrl=Kh,me.snapToMicroCellStop=Ip,me.transitionCharacterClip=wl,Object.defineProperty(me,Symbol.toStringTag,{value:"Module"}),me}({});
