var ASCIIRealms=function(ye){"use strict";var OS=Object.defineProperty;var BS=(ye,dn,ms)=>dn in ye?OS(ye,dn,{enumerable:!0,configurable:!0,writable:!0,value:ms}):ye[dn]=ms;var N=(ye,dn,ms)=>BS(ye,typeof dn!="symbol"?dn+"":dn,ms);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const dn="170",ms={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},fm={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qh=0,Dl=1,Zh=2,pm=3,mm=0,Ul=1,Nl=2,Nn=3,Fn=0,Ft=1,fn=2,Wn=0,Ii=1,Fl=2,Ol=3,Bl=4,Kh=5,di=100,$h=101,jh=102,Jh=103,Qh=104,eu=200,tu=201,nu=202,iu=203,oo=204,ao=205,su=206,ru=207,ou=208,au=209,lu=210,cu=211,hu=212,uu=213,du=214,lo=0,co=1,ho=2,Di=3,uo=4,fo=5,po=6,mo=7,sr=0,fu=1,pu=2,Xn=0,mu=1,gu=2,vu=3,yu=4,xu=5,_u=6,Mu=7,kl="attached",Su="detached",go=300,Yn=301,fi=302,rr=303,or=304,gs=306,On=1e3,Zt=1001,vs=1002,vt=1003,vo=1004,gm=1004,Ui=1005,vm=1005,at=1006,ys=1007,ym=1007,pn=1008,xm=1008,mn=1009,zl=1010,Hl=1011,xs=1012,yo=1013,qn=1014,Jt=1015,Zn=1016,xo=1017,_o=1018,pi=1020,Vl=35902,Gl=1021,Wl=1022,Tt=1023,Xl=1024,Yl=1025,Ni=1026,mi=1027,Mo=1028,ar=1029,ql=1030,So=1031,_m=1032,bo=1033,lr=33776,cr=33777,hr=33778,ur=33779,wo=35840,To=35841,Ao=35842,Eo=35843,Co=36196,Ro=37492,Lo=37496,Po=37808,Io=37809,Do=37810,Uo=37811,No=37812,Fo=37813,Oo=37814,Bo=37815,ko=37816,zo=37817,Ho=37818,Vo=37819,Go=37820,Wo=37821,dr=36492,Xo=36494,Yo=36495,Zl=36283,qo=36284,Zo=36285,Ko=36286,$o=2200,fr=2201,bu=2202,_s=2300,Ms=2301,jo=2302,Fi=2400,Oi=2401,pr=2402,Jo=2500,Kl=2501,wu=0,$l=1,Qo=2,Tu=3200,Au=3201,Mm=3202,Sm=3203,Kn=0,Eu=1,Tn="",yt="srgb",Ut="srgb-linear",mr="linear",ht="srgb",bm=0,Bi=7680,wm=7681,Tm=7682,Am=7683,Em=34055,Cm=34056,Rm=5386,Lm=512,Pm=513,Im=514,Dm=515,Um=516,Nm=517,Fm=518,jl=519,Cu=512,Ru=513,Lu=514,Jl=515,Pu=516,Iu=517,Du=518,Uu=519,gr=35044,Om=35048,Bm=35040,km=35045,zm=35049,Hm=35041,Vm=35046,Gm=35050,Wm=35042,Xm="100",Ql="300 es",Bn=2e3,vr=2001;class kn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nu=1234567;const ki=Math.PI/180,Ss=180/Math.PI;function on(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[o&255]+Ot[o>>8&255]+Ot[o>>16&255]+Ot[o>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function _t(o,e,t){return Math.max(e,Math.min(t,o))}function ec(o,e){return(o%e+e)%e}function Ym(o,e,t,n,i){return n+(o-e)*(i-n)/(t-e)}function qm(o,e,t){return o!==e?(t-o)/(e-o):0}function yr(o,e,t){return(1-t)*o+t*e}function Zm(o,e,t,n){return yr(o,e,1-Math.exp(-t*n))}function Km(o,e=1){return e-Math.abs(ec(o,e*2)-e)}function $m(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*(3-2*o))}function jm(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*o*(o*(o*6-15)+10))}function Jm(o,e){return o+Math.floor(Math.random()*(e-o+1))}function Qm(o,e){return o+Math.random()*(e-o)}function eg(o){return o*(.5-Math.random())}function tg(o){o!==void 0&&(Nu=o);let e=Nu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ng(o){return o*ki}function ig(o){return o*Ss}function sg(o){return(o&o-1)===0&&o!==0}function rg(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function og(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function ag(o,e,t,n,i){const s=Math.cos,r=Math.sin,a=s(t/2),l=r(t/2),c=s((e+n)/2),h=r((e+n)/2),u=s((e-n)/2),d=r((e-n)/2),f=s((n-e)/2),p=r((n-e)/2);switch(i){case"XYX":o.set(a*h,l*u,l*d,a*c);break;case"YZY":o.set(l*d,a*h,l*u,a*c);break;case"ZXZ":o.set(l*u,l*d,a*h,a*c);break;case"XZX":o.set(a*h,l*p,l*f,a*c);break;case"YXY":o.set(l*f,a*h,l*p,a*c);break;case"ZYZ":o.set(l*p,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Kt(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Xe(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const et={DEG2RAD:ki,RAD2DEG:Ss,generateUUID:on,clamp:_t,euclideanModulo:ec,mapLinear:Ym,inverseLerp:qm,lerp:yr,damp:Zm,pingpong:Km,smoothstep:$m,smootherstep:jm,randInt:Jm,randFloat:Qm,randFloatSpread:eg,seededRandom:tg,degToRad:ng,radToDeg:ig,isPowerOfTwo:sg,ceilPowerOfTwo:rg,floorPowerOfTwo:og,setQuaternionFromProperEuler:ag,normalize:Xe,denormalize:Kt};class j{constructor(e=0,t=0){j.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,i,s,r,a,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,l,c)}set(e,t,n,i,s,r,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],_=i[1],x=i[4],y=i[7],L=i[2],w=i[5],A=i[8];return s[0]=r*v+a*_+l*L,s[3]=r*g+a*x+l*w,s[6]=r*m+a*y+l*A,s[1]=c*v+h*_+u*L,s[4]=c*g+h*x+u*w,s[7]=c*m+h*y+u*A,s[2]=d*v+f*_+p*L,s[5]=d*g+f*x+p*w,s[8]=d*m+f*y+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*a*c-n*s*h+n*a*l+i*s*c-i*r*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*r-a*c,d=a*l-h*s,f=c*s-r*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=u*v,e[1]=(i*c-h*n)*v,e[2]=(a*n-i*r)*v,e[3]=d*v,e[4]=(h*t-i*l)*v,e[5]=(i*s-a*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(r*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*r+c*a)+r+e,-i*c,i*l,-i*(-c*r+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(tc.makeScale(e,t)),this}rotate(e){return this.premultiply(tc.makeRotation(-e)),this}translate(e,t){return this.premultiply(tc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const tc=new We;function Fu(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}const lg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function bs(o,e){return new lg[o](e)}function xr(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Ou(){const o=xr("canvas");return o.style.display="block",o}const Bu={};function _r(o){o in Bu||(Bu[o]=!0,console.warn(o))}function cg(o,e,t){return new Promise(function(n,i){function s(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:i();break;case o.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function hg(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function ug(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $e={enabled:!0,workingColorSpace:Ut,spaces:{},convert:function(o,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ht&&(o.r=$n(o.r),o.g=$n(o.g),o.b=$n(o.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(o.applyMatrix3(this.spaces[e].toXYZ),o.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ht&&(o.r=ws(o.r),o.g=ws(o.g),o.b=ws(o.b))),o},fromWorkingColorSpace:function(o,e){return this.convert(o,this.workingColorSpace,e)},toWorkingColorSpace:function(o,e){return this.convert(o,e,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Tn?mr:this.spaces[o].transfer},getLuminanceCoefficients:function(o,e=this.workingColorSpace){return o.fromArray(this.spaces[e].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,e,t){return o.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace}};function $n(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function ws(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}const ku=[.64,.33,.3,.6,.15,.06],zu=[.2126,.7152,.0722],Hu=[.3127,.329],Vu=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gu=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[Ut]:{primaries:ku,whitePoint:Hu,transfer:mr,toXYZ:Vu,fromXYZ:Gu,luminanceCoefficients:zu,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:ku,whitePoint:Hu,transfer:ht,toXYZ:Vu,fromXYZ:Gu,luminanceCoefficients:zu,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}});let Ts;class Wu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ts===void 0&&(Ts=xr("canvas")),Ts.width=e.width,Ts.height=e.height;const n=Ts.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ts}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=$n(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($n(t[n]/255)*255):t[n]=$n(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let dg=0;class zi{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=on(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(nc(i[r].image)):s.push(nc(i[r]))}else s=nc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function nc(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Wu.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fg=0;class gt extends kn{constructor(e=gt.DEFAULT_IMAGE,t=gt.DEFAULT_MAPPING,n=Zt,i=Zt,s=at,r=pn,a=Tt,l=mn,c=gt.DEFAULT_ANISOTROPY,h=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=on(),this.name="",this.source=new zi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new j(0,0),this.repeat=new j(1,1),this.center=new j(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==go)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case On:e.x=e.x-Math.floor(e.x);break;case Zt:e.x=e.x<0?0:1;break;case vs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case On:e.y=e.y-Math.floor(e.y);break;case Zt:e.y=e.y<0?0:1;break;case vs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gt.DEFAULT_IMAGE=null,gt.DEFAULT_MAPPING=go,gt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,n=0,i=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(f+1)/2,L=(m+1)/2,w=(h+d)/4,A=(u+v)/4,C=(p+g)/4;return x>y&&x>L?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=w/n,s=A/n):y>L?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=w/i,s=C/i):L<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(L),n=A/s,i=C/s),this.set(n,i,s,t),this}let _=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xu extends kn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:at,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new gt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new zi(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qt extends Xu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ea extends gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vt,this.minFilter=vt,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class pg extends Qt{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new ea(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class ic extends gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vt,this.minFilter=vt,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mg extends Qt{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new ic(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Bt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[r+0],f=s[r+1],p=s[r+2],v=s[r+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==p){let g=1-a;const m=l*d+c*f+h*p+u*v,_=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const L=Math.sqrt(x),w=Math.atan2(L,m*_);g=Math.sin(g*w)/L,a=Math.sin(a*w)/L}const y=a*_;if(l=l*g+d*y,c=c*g+f*y,h=h*g+p*y,u=u*g+v*y,g===1-a){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,r){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[r],d=s[r+1],f=s[r+2],p=s[r+3];return e[t]=a*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-a*f,e[t+2]=c*p+h*f+a*d-l*u,e[t+3]=h*p-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,r=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),p=l(s/2);switch(r){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(r-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(r-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(_t(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,r=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+r*a+i*c-s*l,this._y=i*h+r*l+s*a-n*c,this._z=s*h+r*c+n*l-i*a,this._w=r*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,r=this._w;let a=r*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,n=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,a=e.z,l=e.w,c=2*(r*i-a*n),h=2*(a*t-s*i),u=2*(s*n-r*t);return this.x=t+l*c+r*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,r=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*r-n*l,this.z=n*a-i*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sc.copy(this).projectOnVector(e),this.sub(sc)}reflect(e){return this.sub(sc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const sc=new E,Yu=new Bt;class Ct{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)e.isMesh===!0?e.getVertexPosition(r,An):An.fromBufferAttribute(s,r),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ta.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ta.copy(n.boundingBox)),ta.applyMatrix4(e.matrixWorld),this.union(ta)}const i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mr),na.subVectors(this.max,Mr),As.subVectors(e.a,Mr),Es.subVectors(e.b,Mr),Cs.subVectors(e.c,Mr),gi.subVectors(Es,As),vi.subVectors(Cs,Es),Hi.subVectors(As,Cs);let t=[0,-gi.z,gi.y,0,-vi.z,vi.y,0,-Hi.z,Hi.y,gi.z,0,-gi.x,vi.z,0,-vi.x,Hi.z,0,-Hi.x,-gi.y,gi.x,0,-vi.y,vi.x,0,-Hi.y,Hi.x,0];return!rc(t,As,Es,Cs,na)||(t=[1,0,0,0,1,0,0,0,1],!rc(t,As,Es,Cs,na))?!1:(ia.crossVectors(gi,vi),t=[ia.x,ia.y,ia.z],rc(t,As,Es,Cs,na))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const jn=[new E,new E,new E,new E,new E,new E,new E,new E],An=new E,ta=new Ct,As=new E,Es=new E,Cs=new E,gi=new E,vi=new E,Hi=new E,Mr=new E,na=new E,ia=new E,Vi=new E;function rc(o,e,t,n,i){for(let s=0,r=o.length-3;s<=r;s+=3){Vi.fromArray(o,s);const a=i.x*Math.abs(Vi.x)+i.y*Math.abs(Vi.y)+i.z*Math.abs(Vi.z),l=e.dot(Vi),c=t.dot(Vi),h=n.dot(Vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const gg=new Ct,Sr=new E,oc=new E;class Nt{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):gg.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);const t=Sr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Sr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(oc)),this.expandByPoint(Sr.copy(e.center).sub(oc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Jn=new E,ac=new E,sa=new E,yi=new E,lc=new E,ra=new E,cc=new E;class Gi{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ac.copy(e).add(t).multiplyScalar(.5),sa.copy(t).sub(e).normalize(),yi.copy(this.origin).sub(ac);const s=e.distanceTo(t)*.5,r=-this.direction.dot(sa),a=yi.dot(this.direction),l=-yi.dot(sa),c=yi.lengthSq(),h=Math.abs(1-r*r);let u,d,f,p;if(h>0)if(u=r*l-a,d=r*a-l,p=s*h,u>=0)if(d>=-p)if(d<=p){const v=1/h;u*=v,d*=v,f=u*(u+r*d+2*a)+d*(r*u+d+2*l)+c}else d=s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-r*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(r*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=r>0?-s:s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ac).addScaledVector(sa,d),f}intersectSphere(e,t){Jn.subVectors(e.center,this.origin);const n=Jn.dot(this.direction),i=Jn.dot(Jn)-n*n,s=e.radius*e.radius;if(i>s)return null;const r=Math.sqrt(s-i),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,r=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,r=(e.min.y-d.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,n,i,s){lc.subVectors(t,e),ra.subVectors(n,e),cc.crossVectors(lc,ra);let r=this.direction.dot(cc),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;yi.subVectors(this.origin,e);const l=a*this.direction.dot(ra.crossVectors(yi,ra));if(l<0)return null;const c=a*this.direction.dot(lc.cross(yi));if(c<0||l+c>r)return null;const h=-a*yi.dot(cc);return h<0?null:this.at(h/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class De{constructor(e,t,n,i,s,r,a,l,c,h,u,d,f,p,v,g){De.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,l,c,h,u,d,f,p,v,g)}set(e,t,n,i,s,r,a,l,c,h,u,d,f,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=r,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new De().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Rs.setFromMatrixColumn(e,0).length(),s=1/Rs.setFromMatrixColumn(e,1).length(),r=1/Rs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=r*h,f=r*u,p=a*h,v=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=p+f*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,v=c*u;t[0]=d+v*a,t[4]=p*a-f,t[8]=r*c,t[1]=r*u,t[5]=r*h,t[9]=-a,t[2]=f*a-p,t[6]=v+d*a,t[10]=r*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,v=c*u;t[0]=d-v*a,t[4]=-r*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=r*h,t[9]=v-d*a,t[2]=-r*c,t[6]=a,t[10]=r*l}else if(e.order==="ZYX"){const d=r*h,f=r*u,p=a*h,v=a*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,f=r*c,p=a*l,v=a*c;t[0]=l*h,t[4]=v-d*u,t[8]=p*u+f,t[1]=u,t[5]=r*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-v*u}else if(e.order==="XZY"){const d=r*l,f=r*c,p=a*l,v=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=r*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vg,e,yg)}lookAt(e,t,n){const i=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),xi.crossVectors(n,an),xi.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),xi.crossVectors(n,an)),xi.normalize(),oa.crossVectors(an,xi),i[0]=xi.x,i[4]=oa.x,i[8]=an.x,i[1]=xi.y,i[5]=oa.y,i[9]=an.y,i[2]=xi.z,i[6]=oa.z,i[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],_=n[3],x=n[7],y=n[11],L=n[15],w=i[0],A=i[4],C=i[8],S=i[12],M=i[1],P=i[5],H=i[9],k=i[13],z=i[2],V=i[6],U=i[10],K=i[14],D=i[3],ee=i[7],he=i[11],de=i[15];return s[0]=r*w+a*M+l*z+c*D,s[4]=r*A+a*P+l*V+c*ee,s[8]=r*C+a*H+l*U+c*he,s[12]=r*S+a*k+l*K+c*de,s[1]=h*w+u*M+d*z+f*D,s[5]=h*A+u*P+d*V+f*ee,s[9]=h*C+u*H+d*U+f*he,s[13]=h*S+u*k+d*K+f*de,s[2]=p*w+v*M+g*z+m*D,s[6]=p*A+v*P+g*V+m*ee,s[10]=p*C+v*H+g*U+m*he,s[14]=p*S+v*k+g*K+m*de,s[3]=_*w+x*M+y*z+L*D,s[7]=_*A+x*P+y*V+L*ee,s[11]=_*C+x*H+y*U+L*he,s[15]=_*S+x*k+y*K+L*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],v=e[7],g=e[11],m=e[15];return p*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+v*(+t*l*f-t*c*d+s*r*d-i*r*f+i*c*h-s*l*h)+g*(+t*c*u-t*a*f-s*r*u+n*r*f+s*a*h-n*c*h)+m*(-i*a*h-t*l*u+t*a*d+i*r*u-n*r*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],v=e[13],g=e[14],m=e[15],_=u*g*c-v*d*c+v*l*f-a*g*f-u*l*m+a*d*m,x=p*d*c-h*g*c-p*l*f+r*g*f+h*l*m-r*d*m,y=h*v*c-p*u*c+p*a*f-r*v*f-h*a*m+r*u*m,L=p*u*l-h*v*l-p*a*d+r*v*d+h*a*g-r*u*g,w=t*_+n*x+i*y+s*L;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=_*A,e[1]=(v*d*s-u*g*s-v*i*f+n*g*f+u*i*m-n*d*m)*A,e[2]=(a*g*s-v*l*s+v*i*c-n*g*c-a*i*m+n*l*m)*A,e[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*A,e[4]=x*A,e[5]=(h*g*s-p*d*s+p*i*f-t*g*f-h*i*m+t*d*m)*A,e[6]=(p*l*s-r*g*s-p*i*c+t*g*c+r*i*m-t*l*m)*A,e[7]=(r*d*s-h*l*s+h*i*c-t*d*c-r*i*f+t*l*f)*A,e[8]=y*A,e[9]=(p*u*s-h*v*s-p*n*f+t*v*f+h*n*m-t*u*m)*A,e[10]=(r*v*s-p*a*s+p*n*c-t*v*c-r*n*m+t*a*m)*A,e[11]=(h*a*s-r*u*s-h*n*c+t*u*c+r*n*f-t*a*f)*A,e[12]=L*A,e[13]=(h*v*i-p*u*i+p*n*d-t*v*d-h*n*g+t*u*g)*A,e[14]=(p*a*i-r*v*i-p*n*l+t*v*l+r*n*g-t*a*g)*A,e[15]=(r*u*i-h*a*i+h*n*l-t*u*l-r*n*d+t*a*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,a=e.y,l=e.z,c=s*r,h=s*a;return this.set(c*r+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*r,0,c*l-i*a,h*l+i*r,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,r=t._y,a=t._z,l=t._w,c=s+s,h=r+r,u=a+a,d=s*c,f=s*h,p=s*u,v=r*h,g=r*u,m=a*u,_=l*c,x=l*h,y=l*u,L=n.x,w=n.y,A=n.z;return i[0]=(1-(v+m))*L,i[1]=(f+y)*L,i[2]=(p-x)*L,i[3]=0,i[4]=(f-y)*w,i[5]=(1-(d+m))*w,i[6]=(g+_)*w,i[7]=0,i[8]=(p+x)*A,i[9]=(g-_)*A,i[10]=(1-(d+v))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Rs.set(i[0],i[1],i[2]).length();const r=Rs.set(i[4],i[5],i[6]).length(),a=Rs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],En.copy(this);const c=1/s,h=1/r,u=1/a;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,t.setFromRotationMatrix(En),n.x=s,n.y=r,n.z=a,this}makePerspective(e,t,n,i,s,r,a=Bn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,p;if(a===Bn)f=-(r+s)/(r-s),p=-2*r*s/(r-s);else if(a===vr)f=-r/(r-s),p=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,r,a=Bn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(r-s),d=(t+e)*c,f=(n+i)*h;let p,v;if(a===Bn)p=(r+s)*u,v=-2*u;else if(a===vr)p=s*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Rs=new E,En=new De,vg=new E(0,0,0),yg=new E(1,1,1),xi=new E,oa=new E,an=new E,qu=new De,Zu=new Bt;class ln{constructor(e=0,t=0,n=0,i=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],r=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(_t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-_t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(_t(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-_t(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(_t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-_t(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zu.setFromEuler(this),this.setFromQuaternion(Zu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class aa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xg=0;const Ku=new E,Ls=new Bt,Qn=new De,la=new E,br=new E,_g=new E,Mg=new Bt,$u=new E(1,0,0),ju=new E(0,1,0),Ju=new E(0,0,1),Qu={type:"added"},Sg={type:"removed"},Ps={type:"childadded",child:null},hc={type:"childremoved",child:null};class tt extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=on(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tt.DEFAULT_UP.clone();const e=new E,t=new ln,n=new Bt,i=new E(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new De},normalMatrix:{value:new We}}),this.matrix=new De,this.matrixWorld=new De,this.matrixAutoUpdate=tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis($u,e)}rotateY(e){return this.rotateOnAxis(ju,e)}rotateZ(e){return this.rotateOnAxis(Ju,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($u,e)}translateY(e){return this.translateOnAxis(ju,e)}translateZ(e){return this.translateOnAxis(Ju,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?la.copy(e):la.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(br,la,this.up):Qn.lookAt(la,br,this.up),this.quaternion.setFromRotationMatrix(Qn),i&&(Qn.extractRotation(i.matrixWorld),Ls.setFromRotationMatrix(Qn),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qu),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sg),hc.child=e,this.dispatchEvent(hc),hc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qu),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,e,_g),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,Mg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),u=r(e.shapes),d=r(e.skeletons),f=r(e.animations),p=r(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}tt.DEFAULT_UP=new E(0,1,0),tt.DEFAULT_MATRIX_AUTO_UPDATE=!0,tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Cn=new E,ei=new E,uc=new E,ti=new E,Is=new E,Ds=new E,ed=new E,dc=new E,fc=new E,pc=new E,mc=new st,gc=new st,vc=new st;class en{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Cn.subVectors(e,t),i.cross(Cn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Cn.subVectors(i,t),ei.subVectors(n,t),uc.subVectors(e,t);const r=Cn.dot(Cn),a=Cn.dot(ei),l=Cn.dot(uc),c=ei.dot(ei),h=ei.dot(uc),u=r*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,p=(r*h-a*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,n,i,s,r,a,l){return this.getBarycoord(e,t,n,i,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ti.x),l.addScaledVector(r,ti.y),l.addScaledVector(a,ti.z),l)}static getInterpolatedAttribute(e,t,n,i,s,r){return mc.setScalar(0),gc.setScalar(0),vc.setScalar(0),mc.fromBufferAttribute(e,t),gc.fromBufferAttribute(e,n),vc.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(mc,s.x),r.addScaledVector(gc,s.y),r.addScaledVector(vc,s.z),r}static isFrontFacing(e,t,n,i){return Cn.subVectors(n,t),ei.subVectors(e,t),Cn.cross(ei).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Cn.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(.3333333333333333)}getNormal(e){return en.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return en.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return en.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return en.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return en.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let r,a;Is.subVectors(i,n),Ds.subVectors(s,n),dc.subVectors(e,n);const l=Is.dot(dc),c=Ds.dot(dc);if(l<=0&&c<=0)return t.copy(n);fc.subVectors(e,i);const h=Is.dot(fc),u=Ds.dot(fc);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(Is,r);pc.subVectors(e,s);const f=Is.dot(pc),p=Ds.dot(pc);if(p>=0&&f<=p)return t.copy(s);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(Ds,a);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return ed.subVectors(s,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(ed,a);const m=1/(g+v+d);return r=v*m,a=d*m,t.copy(n).addScaledVector(Is,r).addScaledVector(Ds,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const td={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},ca={h:0,s:0,l:0};function yc(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<.16666666666666666?o+(e-o)*6*t:t<.5?e:t<.6666666666666666?o+(e-o)*6*(.6666666666666666-t):o}class q{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=$e.workingColorSpace){if(e=ec(e,1),t=_t(t,0,1),n=_t(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=yc(r,s,e+.3333333333333333),this.g=yc(r,s,e),this.b=yc(r,s,e-.3333333333333333)}return $e.toWorkingColorSpace(this,i),this}setStyle(e,t=yt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=td[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return $e.fromWorkingColorSpace(kt.copy(this),e),Math.round(_t(kt.r*255,0,255))*65536+Math.round(_t(kt.g*255,0,255))*256+Math.round(_t(kt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(kt.copy(this),t);const n=kt.r,i=kt.g,s=kt.b,r=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+r)/2;if(a===r)l=0,c=0;else{const u=r-a;switch(c=h<=.5?u/(r+a):u/(2-r-a),r){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=yt){$e.fromWorkingColorSpace(kt.copy(this),e);const t=kt.r,n=kt.g,i=kt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(ca);const n=yr(_i.h,ca.h,t),i=yr(_i.s,ca.s,t),s=yr(_i.l,ca.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new q;q.NAMES=td;let bg=0;class Rt extends kn{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bg++}),this.uuid=on(),this.name="",this.blending=Ii,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oo,this.blendDst=ao,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=Di,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oo&&(n.blendSrc=this.blendSrc),this.blendDst!==ao&&(n.blendDst=this.blendDst),this.blendEquation!==di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Di&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const a in s){const l=s[a];delete l.metadata,r.push(l)}return r}if(t){const s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class zt extends Rt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=sr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ni=wg();function wg(){const o=new ArrayBuffer(4),e=new Float32Array(o),t=new Uint32Array(o),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),r=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)r[l]=l<<23;r[31]=1199570944,r[32]=2147483648;for(let l=33;l<63;++l)r[l]=2147483648+(l-32<<23);r[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:r,offsetTable:a}}function tn(o){Math.abs(o)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),o=_t(o,-65504,65504),ni.floatView[0]=o;const e=ni.uint32View[0],t=e>>23&511;return ni.baseTable[t]+((e&8388607)>>ni.shiftTable[t])}function wr(o){const e=o>>10;return ni.uint32View[0]=ni.mantissaTable[ni.offsetTable[e]+(o&1023)]+ni.exponentTable[e],ni.floatView[0]}const Tg={toHalfFloat:tn,fromHalfFloat:wr},At=new E,ha=new j;class Je{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gr,this.updateRanges=[],this.gpuType=Jt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ha.fromBufferAttribute(this,t),ha.applyMatrix3(e),this.setXY(t,ha.x,ha.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Kt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gr&&(e.usage=this.usage),e}}class Ag extends Je{constructor(e,t,n){super(new Int8Array(e),t,n)}}class Eg extends Je{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class Cg extends Je{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class Rg extends Je{constructor(e,t,n){super(new Int16Array(e),t,n)}}class xc extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Lg extends Je{constructor(e,t,n){super(new Int32Array(e),t,n)}}class _c extends Je{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Pg extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=wr(this.array[e*this.itemSize]);return this.normalized&&(t=Kt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize]=tn(t),this}getY(e){let t=wr(this.array[e*this.itemSize+1]);return this.normalized&&(t=Kt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+1]=tn(t),this}getZ(e){let t=wr(this.array[e*this.itemSize+2]);return this.normalized&&(t=Kt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+2]=tn(t),this}getW(e){let t=wr(this.array[e*this.itemSize+3]);return this.normalized&&(t=Kt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+3]=tn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this.array[e+2]=tn(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this.array[e+2]=tn(i),this.array[e+3]=tn(s),this}}class we extends Je{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ig=0;const gn=new De,Mc=new tt,Us=new E,cn=new Ct,Tr=new Ct,It=new E;class He extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=on(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Fu(e)?_c:xc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new We().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return Mc.lookAt(e),Mc.updateMatrix(),this.applyMatrix4(Mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new we(n,3))}else{for(let n=0,i=t.count;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ct);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const a=t[s];Tr.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(cn.min,Tr.min),cn.expandByPoint(It),It.addVectors(cn.max,Tr.max),cn.expandByPoint(It)):(cn.expandByPoint(Tr.min),cn.expandByPoint(Tr.max))}cn.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)It.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(It));if(t)for(let s=0,r=t.length;s<r;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)It.fromBufferAttribute(a,c),l&&(Us.fromBufferAttribute(e,c),It.add(Us)),i=Math.max(i,n.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new E,l[C]=new E;const c=new E,h=new E,u=new E,d=new j,f=new j,p=new j,v=new E,g=new E;function m(C,S,M){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,C),f.fromBufferAttribute(s,S),p.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),a[C].add(v),a[S].add(v),a[M].add(v),l[C].add(g),l[S].add(g),l[M].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let C=0,S=_.length;C<S;++C){const M=_[C],P=M.start,H=M.count;for(let k=P,z=P+H;k<z;k+=3)m(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const x=new E,y=new E,L=new E,w=new E;function A(C){L.fromBufferAttribute(i,C),w.copy(L);const S=a[C];x.copy(S),x.sub(L.multiplyScalar(L.dot(S))).normalize(),y.crossVectors(w,S);const P=y.dot(l[C])<0?-1:1;r.setXYZW(C,x.x,x.y,x.z,P)}for(let C=0,S=_.length;C<S;++C){const M=_[C],P=M.start,H=M.count;for(let k=P,z=P+H;k<z;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new E,s=new E,r=new E,a=new E,l=new E,c=new E,h=new E,u=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new Je(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new He,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nd=new De,Wi=new Gi,ua=new Nt,id=new E,da=new E,fa=new E,pa=new E,Sc=new E,ma=new E,sd=new E,ga=new E;class Ne extends tt{constructor(e=new He,t=new zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){ma.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(Sc.fromBufferAttribute(u,e),r?ma.addScaledVector(Sc,h):ma.addScaledVector(Sc.sub(t),h))}t.add(ma)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(s),Wi.copy(e.ray).recast(e.near),!(ua.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(ua,id)===null||Wi.origin.distanceToSquared(id)>(e.far-e.near)**2))&&(nd.copy(s).invert(),Wi.copy(e.ray).applyMatrix4(nd),!(n.boundingBox!==null&&Wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,r=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=r[g.materialIndex],_=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,L=x;y<L;y+=3){const w=a.getX(y),A=a.getX(y+1),C=a.getX(y+2);i=va(this,m,e,n,c,h,u,w,A,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const _=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);i=va(this,r,e,n,c,h,u,_,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=r[g.materialIndex],_=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,L=x;y<L;y+=3){const w=y,A=y+1,C=y+2;i=va(this,m,e,n,c,h,u,w,A,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const _=g,x=g+1,y=g+2;i=va(this,r,e,n,c,h,u,_,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Dg(o,e,t,n,i,s,r,a){let l;if(e.side===Ft?l=n.intersectTriangle(r,s,i,!0,a):l=n.intersectTriangle(i,s,r,e.side===Fn,a),l===null)return null;ga.copy(a),ga.applyMatrix4(o.matrixWorld);const c=t.ray.origin.distanceTo(ga);return c<t.near||c>t.far?null:{distance:c,point:ga.clone(),object:o}}function va(o,e,t,n,i,s,r,a,l,c){o.getVertexPosition(a,da),o.getVertexPosition(l,fa),o.getVertexPosition(c,pa);const h=Dg(o,e,t,n,da,fa,pa,sd);if(h){const u=new E;en.getBarycoord(sd,da,fa,pa,u),i&&(h.uv=en.getInterpolatedAttribute(i,a,l,c,u,new j)),s&&(h.uv1=en.getInterpolatedAttribute(s,a,l,c,u,new j)),r&&(h.normal=en.getInterpolatedAttribute(r,a,l,c,u,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new E,materialIndex:0};en.getNormal(da,fa,pa,d.normal),h.face=d,h.barycoord=u}return h}class vn extends He{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,r,s,0),p("z","y","x",1,-1,n,t,-e,r,s,1),p("x","z","y",1,1,e,n,t,i,r,2),p("x","z","y",1,-1,e,n,-t,i,r,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new we(c,3)),this.setAttribute("normal",new we(h,3)),this.setAttribute("uv",new we(u,2));function p(v,g,m,_,x,y,L,w,A,C,S){const M=y/A,P=L/C,H=y/2,k=L/2,z=w/2,V=A+1,U=C+1;let K=0,D=0;const ee=new E;for(let he=0;he<U;he++){const de=he*P-k;for(let Ie=0;Ie<V;Ie++){const Fe=Ie*M-H;ee[v]=Fe*_,ee[g]=de*x,ee[m]=z,c.push(ee.x,ee.y,ee.z),ee[v]=0,ee[g]=0,ee[m]=w>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(Ie/A),u.push(1-he/C),K+=1}}for(let he=0;he<C;he++)for(let de=0;de<A;de++){const Ie=d+de+V*he,Fe=d+de+V*(he+1),W=d+(de+1)+V*(he+1),$=d+(de+1)+V*he;l.push(Ie,Fe,$),l.push(Fe,W,$),D+=6}a.addGroup(f,D,S),f+=D,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ns(o){const e={};for(const t in o){e[t]={};for(const n in o[t]){const i=o[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function $t(o){const e={};for(let t=0;t<o.length;t++){const n=Ns(o[t]);for(const i in n)e[i]=n[i]}return e}function Ug(o){const e=[];for(let t=0;t<o.length;t++)e.push(o[t].clone());return e}function rd(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const od={clone:Ns,merge:$t};var Ng=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ht extends Rt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ng,this.fragmentShader=Fg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ns(e.uniforms),this.uniformsGroups=Ug(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ya extends tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new De,this.projectionMatrix=new De,this.projectionMatrixInverse=new De,this.coordinateSystem=Bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mi=new E,ad=new j,ld=new j;class Et extends ya{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ki*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ss*2*Math.atan(Math.tan(ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z)}getViewSize(e,t){return this.getViewBounds(e,ad,ld),t.subVectors(ld,ad)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ki*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/l,t-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Fs=-90,Os=1;class cd extends tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Et(Fs,Os,e,t);i.layers=this.layers,this.add(i);const s=new Et(Fs,Os,e,t);s.layers=this.layers,this.add(s);const r=new Et(Fs,Os,e,t);r.layers=this.layers,this.add(r);const a=new Et(Fs,Os,e,t);a.layers=this.layers,this.add(a);const l=new Et(Fs,Os,e,t);l.layers=this.layers,this.add(l);const c=new Et(Fs,Os,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,a,l]=t;for(const c of t)this.remove(c);if(e===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Ar extends gt{constructor(e,t,n,i,s,r,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Yn,super(e,t,n,i,s,r,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hd extends Qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ar(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:at}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new vn(5,5,5),s=new Ht({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:Wn});s.uniforms.tEquirect.value=t;const r=new Ne(i,s),a=t.minFilter;return t.minFilter===pn&&(t.minFilter=at),new cd(1,10,this).update(e,r),t.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}}const bc=new E,Og=new E,Bg=new We;class ii{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=bc.subVectors(n,t).cross(Og.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(bc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Bg.getNormalMatrix(e),i=this.coplanarPoint(bc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xi=new Nt,xa=new E;class Er{constructor(e=new ii,t=new ii,n=new ii,i=new ii,s=new ii,r=new ii){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bn){const n=this.planes,i=e.elements,s=i[0],r=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],v=i[10],g=i[11],m=i[12],_=i[13],x=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,g-f,y-m).normalize(),n[1].setComponents(l+s,d+c,g+f,y+m).normalize(),n[2].setComponents(l+r,d+h,g+p,y+_).normalize(),n[3].setComponents(l-r,d-h,g-p,y-_).normalize(),n[4].setComponents(l-a,d-u,g-v,y-x).normalize(),t===Bn)n[5].setComponents(l+a,d+u,g+v,y+x).normalize();else if(t===vr)n[5].setComponents(a,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){return Xi.center.set(0,0,0),Xi.radius=.7071067811865476,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(xa.x=i.normal.x>0?e.max.x:e.min.x,xa.y=i.normal.y>0?e.max.y:e.min.y,xa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(xa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ud(){let o=null,e=!1,t=null,n=null;function i(s,r){t(s,r),n=o.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=o.requestAnimationFrame(i),e=!0)},stop:function(){o.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){o=s}}}function kg(o){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=o.createBuffer();o.bindBuffer(l,d),o.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=o.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=o.HALF_FLOAT:f=o.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=o.SHORT;else if(c instanceof Uint32Array)f=o.UNSIGNED_INT;else if(c instanceof Int32Array)f=o.INT;else if(c instanceof Int8Array)f=o.BYTE;else if(c instanceof Uint8Array)f=o.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(o.bindBuffer(c,a),u.length===0)o.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const v=u[f];o.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(o.deleteBuffer(l.buffer),e.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:r}}class si extends He{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,r=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const _=m*d-r;for(let x=0;x<c;x++){const y=x*u-s;p.push(y,-_,0),v.push(0,0,1),g.push(x/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<a;_++){const x=_+c*m,y=_+c*(m+1),L=_+1+c*(m+1),w=_+1+c*m;f.push(x,y,w),f.push(y,L,w)}this.setIndex(f),this.setAttribute("position",new we(p,3)),this.setAttribute("normal",new we(v,3)),this.setAttribute("uv",new we(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.width,e.height,e.widthSegments,e.heightSegments)}}var zg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hg=`#ifdef USE_ALPHAHASH
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
#endif`,Vg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yg=`#ifdef USE_AOMAP
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
#endif`,qg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zg=`#ifdef USE_BATCHING
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
#endif`,Kg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$g=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qg=`#ifdef USE_IRIDESCENCE
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
#endif`,e0=`#ifdef USE_BUMPMAP
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
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,c0=`#define PI 3.141592653589793
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
} // validated`,h0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,u0=`vec3 transformedNormal = objectNormal;
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
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,f0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,p0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,g0="gl_FragColor = linearToOutputTexel( gl_FragColor );",v0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,y0=`#ifdef USE_ENVMAP
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
#endif`,x0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_0=`#ifdef USE_ENVMAP
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
#endif`,M0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,S0=`#ifdef USE_ENVMAP
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
#endif`,b0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,w0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,T0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,A0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,E0=`#ifdef USE_GRADIENTMAP
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
}`,C0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,R0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,P0=`uniform bool receiveShadow;
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
#endif`,I0=`#ifdef USE_ENVMAP
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
#endif`,D0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,U0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,N0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O0=`PhysicalMaterial material;
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
#endif`,B0=`struct PhysicalMaterial {
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
}`,k0=`
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
#endif`,z0=`#if defined( RE_IndirectDiffuse )
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
#endif`,H0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,G0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Y0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,q0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Z0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,K0=`#if defined( USE_POINTS_UV )
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
#endif`,$0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,j0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,J0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Q0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ev=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tv=`#ifdef USE_MORPHTARGETS
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
#endif`,nv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ov=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,av=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lv=`#ifdef USE_NORMALMAP
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
#endif`,cv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,mv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_v=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wv=`float getShadowMask() {
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
}`,Tv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Av=`#ifdef USE_SKINNING
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
#endif`,Ev=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cv=`#ifdef USE_SKINNING
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
#endif`,Rv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Iv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dv=`#ifdef USE_TRANSMISSION
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
#endif`,Uv=`#ifdef USE_TRANSMISSION
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
#endif`,Nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ye={alphahash_fragment:zg,alphahash_pars_fragment:Hg,alphamap_fragment:Vg,alphamap_pars_fragment:Gg,alphatest_fragment:Wg,alphatest_pars_fragment:Xg,aomap_fragment:Yg,aomap_pars_fragment:qg,batching_pars_vertex:Zg,batching_vertex:Kg,begin_vertex:$g,beginnormal_vertex:jg,bsdfs:Jg,iridescence_fragment:Qg,bumpmap_pars_fragment:e0,clipping_planes_fragment:t0,clipping_planes_pars_fragment:n0,clipping_planes_pars_vertex:i0,clipping_planes_vertex:s0,color_fragment:r0,color_pars_fragment:o0,color_pars_vertex:a0,color_vertex:l0,common:c0,cube_uv_reflection_fragment:h0,defaultnormal_vertex:u0,displacementmap_pars_vertex:d0,displacementmap_vertex:f0,emissivemap_fragment:p0,emissivemap_pars_fragment:m0,colorspace_fragment:g0,colorspace_pars_fragment:v0,envmap_fragment:y0,envmap_common_pars_fragment:x0,envmap_pars_fragment:_0,envmap_pars_vertex:M0,envmap_physical_pars_fragment:I0,envmap_vertex:S0,fog_vertex:b0,fog_pars_vertex:w0,fog_fragment:T0,fog_pars_fragment:A0,gradientmap_pars_fragment:E0,lightmap_pars_fragment:C0,lights_lambert_fragment:R0,lights_lambert_pars_fragment:L0,lights_pars_begin:P0,lights_toon_fragment:D0,lights_toon_pars_fragment:U0,lights_phong_fragment:N0,lights_phong_pars_fragment:F0,lights_physical_fragment:O0,lights_physical_pars_fragment:B0,lights_fragment_begin:k0,lights_fragment_maps:z0,lights_fragment_end:H0,logdepthbuf_fragment:V0,logdepthbuf_pars_fragment:G0,logdepthbuf_pars_vertex:W0,logdepthbuf_vertex:X0,map_fragment:Y0,map_pars_fragment:q0,map_particle_fragment:Z0,map_particle_pars_fragment:K0,metalnessmap_fragment:$0,metalnessmap_pars_fragment:j0,morphinstance_vertex:J0,morphcolor_vertex:Q0,morphnormal_vertex:ev,morphtarget_pars_vertex:tv,morphtarget_vertex:nv,normal_fragment_begin:iv,normal_fragment_maps:sv,normal_pars_fragment:rv,normal_pars_vertex:ov,normal_vertex:av,normalmap_pars_fragment:lv,clearcoat_normal_fragment_begin:cv,clearcoat_normal_fragment_maps:hv,clearcoat_pars_fragment:uv,iridescence_pars_fragment:dv,opaque_fragment:fv,packing:pv,premultiplied_alpha_fragment:mv,project_vertex:gv,dithering_fragment:vv,dithering_pars_fragment:yv,roughnessmap_fragment:xv,roughnessmap_pars_fragment:_v,shadowmap_pars_fragment:Mv,shadowmap_pars_vertex:Sv,shadowmap_vertex:bv,shadowmask_pars_fragment:wv,skinbase_vertex:Tv,skinning_pars_vertex:Av,skinning_vertex:Ev,skinnormal_vertex:Cv,specularmap_fragment:Rv,specularmap_pars_fragment:Lv,tonemapping_fragment:Pv,tonemapping_pars_fragment:Iv,transmission_fragment:Dv,transmission_pars_fragment:Uv,uv_pars_fragment:Nv,uv_pars_vertex:Fv,uv_vertex:Ov,worldpos_vertex:Bv,background_vert:`varying vec2 vUv;
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
}`},ue={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new j(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new j(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Rn={basic:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new q(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:$t([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:$t([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new q(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:$t([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:$t([ue.points,ue.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:$t([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:$t([ue.common,ue.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:$t([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:$t([ue.sprite,ue.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:$t([ue.common,ue.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:$t([ue.lights,ue.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};Rn.physical={uniforms:$t([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new j(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new j},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new j},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const _a={r:0,b:0,g:0},Yi=new ln,kv=new De;function zv(o,e,t,n,i,s,r){const a=new q(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function p(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?t:e).get(x)),x}function v(_){let x=!1;const y=p(_);y===null?m(a,l):y&&y.isColor&&(m(y,1),x=!0);const L=o.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(o.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function g(_,x){const y=p(x);y&&(y.isCubeTexture||y.mapping===gs)?(h===void 0&&(h=new Ne(new vn(1,1,1),new Ht({name:"BackgroundCubeMaterial",uniforms:Ns(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Yi.copy(x.backgroundRotation),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(kv.makeRotationFromEuler(Yi)),h.material.toneMapped=$e.getTransfer(y.colorSpace)!==ht,(u!==y||d!==y.version||f!==o.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=o.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ne(new si(2,2),new Ht({name:"BackgroundMaterial",uniforms:Ns(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=$e.getTransfer(y.colorSpace)!==ht,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==o.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=o.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,x){_.getRGB(_a,rd(o)),n.buffers.color.setClear(_a.r,_a.g,_a.b,x,r)}return{getClearColor:function(){return a},setClearColor:function(_,x=1){a.set(_),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,m(a,l)},render:v,addToRenderList:g}}function Hv(o,e){const t=o.getParameter(o.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,r=!1;function a(M,P,H,k,z){let V=!1;const U=u(k,H,P);s!==U&&(s=U,c(s.object)),V=f(M,k,H,z),V&&p(M,k,H,z),z!==null&&e.update(z,o.ELEMENT_ARRAY_BUFFER),(V||r)&&(r=!1,y(M,P,H,k),z!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return o.createVertexArray()}function c(M){return o.bindVertexArray(M)}function h(M){return o.deleteVertexArray(M)}function u(M,P,H){const k=H.wireframe===!0;let z=n[M.id];z===void 0&&(z={},n[M.id]=z);let V=z[P.id];V===void 0&&(V={},z[P.id]=V);let U=V[k];return U===void 0&&(U=d(l()),V[k]=U),U}function d(M){const P=[],H=[],k=[];for(let z=0;z<t;z++)P[z]=0,H[z]=0,k[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:H,attributeDivisors:k,object:M,attributes:{},index:null}}function f(M,P,H,k){const z=s.attributes,V=P.attributes;let U=0;const K=H.getAttributes();for(const D in K)if(K[D].location>=0){const he=z[D];let de=V[D];if(de===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(de=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(de=M.instanceColor)),he===void 0||he.attribute!==de||de&&he.data!==de.data)return!0;U++}return s.attributesNum!==U||s.index!==k}function p(M,P,H,k){const z={},V=P.attributes;let U=0;const K=H.getAttributes();for(const D in K)if(K[D].location>=0){let he=V[D];he===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(he=M.instanceColor));const de={};de.attribute=he,he&&he.data&&(de.data=he.data),z[D]=de,U++}s.attributes=z,s.attributesNum=U,s.index=k}function v(){const M=s.newAttributes;for(let P=0,H=M.length;P<H;P++)M[P]=0}function g(M){m(M,0)}function m(M,P){const H=s.newAttributes,k=s.enabledAttributes,z=s.attributeDivisors;H[M]=1,k[M]===0&&(o.enableVertexAttribArray(M),k[M]=1),z[M]!==P&&(o.vertexAttribDivisor(M,P),z[M]=P)}function _(){const M=s.newAttributes,P=s.enabledAttributes;for(let H=0,k=P.length;H<k;H++)P[H]!==M[H]&&(o.disableVertexAttribArray(H),P[H]=0)}function x(M,P,H,k,z,V,U){U===!0?o.vertexAttribIPointer(M,P,H,z,V):o.vertexAttribPointer(M,P,H,k,z,V)}function y(M,P,H,k){v();const z=k.attributes,V=H.getAttributes(),U=P.defaultAttributeValues;for(const K in V){const D=V[K];if(D.location>=0){let ee=z[K];if(ee===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(ee=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(ee=M.instanceColor)),ee!==void 0){const he=ee.normalized,de=ee.itemSize,Ie=e.get(ee);if(Ie===void 0)continue;const Fe=Ie.buffer,W=Ie.type,$=Ie.bytesPerElement,Te=W===o.INT||W===o.UNSIGNED_INT||ee.gpuType===yo;if(ee.isInterleavedBufferAttribute){const le=ee.data,Ue=le.stride,Ve=ee.offset;if(le.isInstancedInterleavedBuffer){for(let ke=0;ke<D.locationSize;ke++)m(D.location+ke,le.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ke=0;ke<D.locationSize;ke++)g(D.location+ke);o.bindBuffer(o.ARRAY_BUFFER,Fe);for(let ke=0;ke<D.locationSize;ke++)x(D.location+ke,de/D.locationSize,W,he,Ue*$,(Ve+de/D.locationSize*ke)*$,Te)}else{if(ee.isInstancedBufferAttribute){for(let le=0;le<D.locationSize;le++)m(D.location+le,ee.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let le=0;le<D.locationSize;le++)g(D.location+le);o.bindBuffer(o.ARRAY_BUFFER,Fe);for(let le=0;le<D.locationSize;le++)x(D.location+le,de/D.locationSize,W,he,de*$,de/D.locationSize*le*$,Te)}}else if(U!==void 0){const he=U[K];if(he!==void 0)switch(he.length){case 2:o.vertexAttrib2fv(D.location,he);break;case 3:o.vertexAttrib3fv(D.location,he);break;case 4:o.vertexAttrib4fv(D.location,he);break;default:o.vertexAttrib1fv(D.location,he)}}}}_()}function L(){C();for(const M in n){const P=n[M];for(const H in P){const k=P[H];for(const z in k)h(k[z].object),delete k[z];delete P[H]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const H in P){const k=P[H];for(const z in k)h(k[z].object),delete k[z];delete P[H]}delete n[M.id]}function A(M){for(const P in n){const H=n[P];if(H[M.id]===void 0)continue;const k=H[M.id];for(const z in k)h(k[z].object),delete k[z];delete H[M.id]}}function C(){S(),r=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:L,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function Vv(o,e,t){let n;function i(c){n=c}function s(c,h){o.drawArrays(n,c,h),t.update(h,n,1)}function r(c,h,u){u!==0&&(o.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)r(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v]*d[v];t.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Gv(o,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=o.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){return!(A!==Tt&&n.convert(A)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const C=A===Zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==mn&&n.convert(A)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Jt&&!C)}function l(A){if(A==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),p=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=o.getParameter(o.MAX_TEXTURE_SIZE),g=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),m=o.getParameter(o.MAX_VERTEX_ATTRIBS),_=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),x=o.getParameter(o.MAX_VARYING_VECTORS),y=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),L=p>0,w=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:L,maxSamples:w}}function Wv(o){const e=this;let t=null,n=0,i=!1,s=!1;const r=new ii,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=o.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):c();else{const _=s?0:n,x=_*4;let y=m.clippingState||null;l.value=y,y=h(p,d,x,f);for(let L=0;L!==x;++L)y[L]=t[L];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,y=f;x!==v;++x,y+=4)r.copy(u[x]).applyMatrix4(_,a),r.normal.toArray(g,y),g[y+3]=r.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Xv(o){let e=new WeakMap;function t(r,a){return a===rr?r.mapping=Yn:a===or&&(r.mapping=fi),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===rr||a===or)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new hd(l.height);return c.fromEquirectangularTexture(o,r),e.set(r,c),r.addEventListener("dispose",i),t(c.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Bs extends ya{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,r=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ks=4,dd=[.125,.215,.35,.446,.526,.582],qi=20,wc=new Bs,fd=new q;let Tc=null,Ac=0,Ec=0,Cc=!1;const Zi=(1+Math.sqrt(5))/2,zs=1/Zi,pd=[new E(-Zi,zs,0),new E(Zi,zs,0),new E(-zs,0,Zi),new E(zs,0,Zi),new E(0,Zi,-zs),new E(0,Zi,zs),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)];class Rc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Tc=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Ec=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Tc,Ac,Ec),this._renderer.xr.enabled=Cc,e.scissorTest=!1,Ma(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yn||e.mapping===fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tc=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Ec=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:at,minFilter:at,generateMipmaps:!1,type:Zn,format:Tt,colorSpace:Ut,depthBuffer:!1},i=md(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=md(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yv(s)),this._blurMaterial=qv(s,e,t)}return i}_compileMaterial(e){const t=new Ne(this._lodPlanes[0],e);this._renderer.compile(t,wc)}_sceneToCubeUV(e,t,n,i){const a=new Et(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(fd),h.toneMapping=Xn,h.autoClear=!1;const f=new zt({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),p=new Ne(new vn,f);let v=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,v=!0):(f.color.copy(fd),v=!0);for(let m=0;m<6;m++){const _=m%3;_===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):_===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;Ma(i,_*x,m>2?x:0,x,x),h.setRenderTarget(i),v&&h.render(p,a),h.render(e,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Yn||e.mapping===fi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=vd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gd());const s=i?this._cubemapMaterial:this._equirectMaterial,r=new Ne(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ma(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,wc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=pd[(i-s-1)%pd.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ne(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*qi-1),v=s/p,g=isFinite(s)?1+Math.floor(h*v):qi;g>qi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${qi}`);const m=[];let _=0;for(let A=0;A<qi;++A){const C=A/v,S=Math.exp(-C*C/2);m.push(S),A===0?_+=S:A<g&&(_+=2*S)}for(let A=0;A<m.length;A++)m[A]=m[A]/_;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=p,d.mipInt.value=x-n;const y=this._sizeLods[i],L=3*y*(i>x-ks?i-x+ks:0),w=4*(this._cubeSize-y);Ma(t,L,w,3*y,2*y),l.setRenderTarget(t),l.render(u,wc)}}function Yv(o){const e=[],t=[],n=[];let i=o;const s=o-ks+1+dd.length;for(let r=0;r<s;r++){const a=Math.pow(2,i);t.push(a);let l=1/a;r>o-ks?l=dd[r-o+ks-1]:r===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,v=3,g=2,m=1,_=new Float32Array(v*p*f),x=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,C=w>2?0:-1,S=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];_.set(S,v*p*w),x.set(d,g*p*w);const M=[w,w,w,w,w,w];y.set(M,m*p*w)}const L=new He;L.setAttribute("position",new Je(_,v)),L.setAttribute("uv",new Je(x,g)),L.setAttribute("faceIndex",new Je(y,m)),e.push(L),i>ks&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function md(o,e,t){const n=new Qt(o,e,t);return n.texture.mapping=gs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ma(o,e,t,n,i){o.viewport.set(e,t,n,i),o.scissor.set(e,t,n,i)}function qv(o,e,t){const n=new Float32Array(qi),i=new E(0,1,0);return new Ht({name:"SphericalGaussianBlur",defines:{n:qi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Lc(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function gd(){return new Ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lc(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function vd(){return new Ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Lc(){return`

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
	`}function Zv(o){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===rr||l===or,h=l===Yn||l===fi;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Rc(o)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Rc(o)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function Kv(o){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=o.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&_r("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $v(o,e,t,n){const i={},s=new WeakMap;function r(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);for(const p in d.morphAttributes){const v=d.morphAttributes[p];for(let g=0,m=v.length;g<m;g++)e.remove(v[g])}d.removeEventListener("dispose",r),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",r),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)e.update(d[p],o.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const v=f[p];for(let g=0,m=v.length;g<m;g++)e.update(v[g],o.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,p=u.attributes.position;let v=0;if(f!==null){const _=f.array;v=f.version;for(let x=0,y=_.length;x<y;x+=3){const L=_[x+0],w=_[x+1],A=_[x+2];d.push(L,w,w,A,A,L)}}else if(p!==void 0){const _=p.array;v=p.version;for(let x=0,y=_.length/3-1;x<y;x+=3){const L=x+0,w=x+1,A=x+2;d.push(L,w,w,A,A,L)}}else return;const g=new(Fu(d)?_c:xc)(d,1);g.version=v;const m=s.get(u);m&&e.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function jv(o,e,t){let n;function i(d){n=d}let s,r;function a(d){s=d.type,r=d.bytesPerElement}function l(d,f){o.drawElements(n,f,s,d*r),t.update(f,n,1)}function c(d,f,p){p!==0&&(o.drawElementsInstanced(n,f,s,d*r,p),t.update(f,n,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function u(d,f,p,v){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)c(d[m]/r,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,p);let m=0;for(let _=0;_<p;_++)m+=f[_]*v[_];t.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Jv(o){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,a){switch(t.calls++,r){case o.TRIANGLES:t.triangles+=a*(s/3);break;case o.LINES:t.lines+=a*(s/2);break;case o.LINE_STRIP:t.lines+=a*(s-1);break;case o.LINE_LOOP:t.lines+=a*s;break;case o.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Qv(o,e,t){const n=new WeakMap,i=new st;function s(r,a,l){const c=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let S=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let x=0;f===!0&&(x=1),p===!0&&(x=2),v===!0&&(x=3);let y=a.attributes.position.count*x,L=1;y>e.maxTextureSize&&(L=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const w=new Float32Array(y*L*4*u),A=new ea(w,y,L,u);A.type=Jt,A.needsUpdate=!0;const C=x*4;for(let M=0;M<u;M++){const P=g[M],H=m[M],k=_[M],z=y*L*4*M;for(let V=0;V<P.count;V++){const U=V*C;f===!0&&(i.fromBufferAttribute(P,V),w[z+U+0]=i.x,w[z+U+1]=i.y,w[z+U+2]=i.z,w[z+U+3]=0),p===!0&&(i.fromBufferAttribute(H,V),w[z+U+4]=i.x,w[z+U+5]=i.y,w[z+U+6]=i.z,w[z+U+7]=0),v===!0&&(i.fromBufferAttribute(k,V),w[z+U+8]=i.x,w[z+U+9]=i.y,w[z+U+10]=i.z,w[z+U+11]=k.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new j(y,L)},n.set(a,d),a.addEventListener("dispose",S)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(o,"morphTexture",r.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(o,"morphTargetBaseInfluence",p),l.getUniforms().setValue(o,"morphTargetInfluences",c)}l.getUniforms().setValue(o,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(o,"morphTargetsTextureSize",d.size)}return{update:s}}function ey(o,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,o.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,o.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function r(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}class Sa extends gt{constructor(e,t,n,i,s,r,a,l,c,h=Ni){if(h!==Ni&&h!==mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ni&&(n=qn),n===void 0&&h===mi&&(n=pi),super(null,i,s,r,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:vt,this.minFilter=l!==void 0?l:vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const yd=new gt,xd=new Sa(1,1),_d=new ea,Md=new ic,Sd=new Ar,bd=[],wd=[],Td=new Float32Array(16),Ad=new Float32Array(9),Ed=new Float32Array(4);function Hs(o,e,t){const n=o[0];if(n<=0||n>0)return o;const i=e*t;let s=bd[i];if(s===void 0&&(s=new Float32Array(i),bd[i]=s),e!==0){n.toArray(s,0);for(let r=1,a=0;r!==e;++r)a+=t,o[r].toArray(s,a)}return s}function Lt(o,e){if(o.length!==e.length)return!1;for(let t=0,n=o.length;t<n;t++)if(o[t]!==e[t])return!1;return!0}function Pt(o,e){for(let t=0,n=e.length;t<n;t++)o[t]=e[t]}function ba(o,e){let t=wd[e];t===void 0&&(t=new Int32Array(e),wd[e]=t);for(let n=0;n!==e;++n)t[n]=o.allocateTextureUnit();return t}function ty(o,e){const t=this.cache;t[0]!==e&&(o.uniform1f(this.addr,e),t[0]=e)}function ny(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;o.uniform2fv(this.addr,e),Pt(t,e)}}function iy(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;o.uniform3fv(this.addr,e),Pt(t,e)}}function sy(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;o.uniform4fv(this.addr,e),Pt(t,e)}}function ry(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;o.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Lt(t,n))return;Ed.set(n),o.uniformMatrix2fv(this.addr,!1,Ed),Pt(t,n)}}function oy(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;o.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Lt(t,n))return;Ad.set(n),o.uniformMatrix3fv(this.addr,!1,Ad),Pt(t,n)}}function ay(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;o.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Lt(t,n))return;Td.set(n),o.uniformMatrix4fv(this.addr,!1,Td),Pt(t,n)}}function ly(o,e){const t=this.cache;t[0]!==e&&(o.uniform1i(this.addr,e),t[0]=e)}function cy(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;o.uniform2iv(this.addr,e),Pt(t,e)}}function hy(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;o.uniform3iv(this.addr,e),Pt(t,e)}}function uy(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;o.uniform4iv(this.addr,e),Pt(t,e)}}function dy(o,e){const t=this.cache;t[0]!==e&&(o.uniform1ui(this.addr,e),t[0]=e)}function fy(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;o.uniform2uiv(this.addr,e),Pt(t,e)}}function py(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;o.uniform3uiv(this.addr,e),Pt(t,e)}}function my(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;o.uniform4uiv(this.addr,e),Pt(t,e)}}function gy(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i);let s;this.type===o.SAMPLER_2D_SHADOW?(xd.compareFunction=Jl,s=xd):s=yd,t.setTexture2D(e||s,i)}function vy(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Md,i)}function yy(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Sd,i)}function xy(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||_d,i)}function _y(o){switch(o){case 5126:return ty;case 35664:return ny;case 35665:return iy;case 35666:return sy;case 35674:return ry;case 35675:return oy;case 35676:return ay;case 5124:case 35670:return ly;case 35667:case 35671:return cy;case 35668:case 35672:return hy;case 35669:case 35673:return uy;case 5125:return dy;case 36294:return fy;case 36295:return py;case 36296:return my;case 35678:case 36198:case 36298:case 36306:case 35682:return gy;case 35679:case 36299:case 36307:return vy;case 35680:case 36300:case 36308:case 36293:return yy;case 36289:case 36303:case 36311:case 36292:return xy}}function My(o,e){o.uniform1fv(this.addr,e)}function Sy(o,e){const t=Hs(e,this.size,2);o.uniform2fv(this.addr,t)}function by(o,e){const t=Hs(e,this.size,3);o.uniform3fv(this.addr,t)}function wy(o,e){const t=Hs(e,this.size,4);o.uniform4fv(this.addr,t)}function Ty(o,e){const t=Hs(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,t)}function Ay(o,e){const t=Hs(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,t)}function Ey(o,e){const t=Hs(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,t)}function Cy(o,e){o.uniform1iv(this.addr,e)}function Ry(o,e){o.uniform2iv(this.addr,e)}function Ly(o,e){o.uniform3iv(this.addr,e)}function Py(o,e){o.uniform4iv(this.addr,e)}function Iy(o,e){o.uniform1uiv(this.addr,e)}function Dy(o,e){o.uniform2uiv(this.addr,e)}function Uy(o,e){o.uniform3uiv(this.addr,e)}function Ny(o,e){o.uniform4uiv(this.addr,e)}function Fy(o,e,t){const n=this.cache,i=e.length,s=ba(t,i);Lt(n,s)||(o.uniform1iv(this.addr,s),Pt(n,s));for(let r=0;r!==i;++r)t.setTexture2D(e[r]||yd,s[r])}function Oy(o,e,t){const n=this.cache,i=e.length,s=ba(t,i);Lt(n,s)||(o.uniform1iv(this.addr,s),Pt(n,s));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||Md,s[r])}function By(o,e,t){const n=this.cache,i=e.length,s=ba(t,i);Lt(n,s)||(o.uniform1iv(this.addr,s),Pt(n,s));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||Sd,s[r])}function ky(o,e,t){const n=this.cache,i=e.length,s=ba(t,i);Lt(n,s)||(o.uniform1iv(this.addr,s),Pt(n,s));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||_d,s[r])}function zy(o){switch(o){case 5126:return My;case 35664:return Sy;case 35665:return by;case 35666:return wy;case 35674:return Ty;case 35675:return Ay;case 35676:return Ey;case 5124:case 35670:return Cy;case 35667:case 35671:return Ry;case 35668:case 35672:return Ly;case 35669:case 35673:return Py;case 5125:return Iy;case 36294:return Dy;case 36295:return Uy;case 36296:return Ny;case 35678:case 36198:case 36298:case 36306:case 35682:return Fy;case 35679:case 36299:case 36307:return Oy;case 35680:case 36300:case 36308:case 36293:return By;case 36289:case 36303:case 36311:case 36292:return ky}}class Hy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_y(t.type)}}class Vy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zy(t.type)}}class Gy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Pc=/(\w+)(\])?(\[|\.)?/g;function Cd(o,e){o.seq.push(e),o.map[e.id]=e}function Wy(o,e,t){const n=o.name,i=n.length;for(Pc.lastIndex=0;;){const s=Pc.exec(n),r=Pc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===i){Cd(t,c===void 0?new Hy(a,o,e):new Vy(a,o,e));break}else{let u=t.map[a];u===void 0&&(u=new Gy(a),Cd(t,u)),t=u}}}class wa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),r=e.getUniformLocation(t,s.name);Wy(s,r,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function Rd(o,e,t){const n=o.createShader(e);return o.shaderSource(n,t),o.compileShader(n),n}const Xy=37297;let Yy=0;function qy(o,e){const t=o.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=i;r<s;r++){const a=r+1;n.push(`${a===e?">":" "} ${a}: ${t[r]}`)}return n.join(`
`)}const Ld=new We;function Zy(o){$e._getMatrix(Ld,$e.workingColorSpace,o);const e=`mat3( ${Ld.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(o)){case mr:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function Pd(o,e,t){const n=o.getShaderParameter(e,o.COMPILE_STATUS),i=o.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const r=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+qy(o.getShaderSource(e),r)}else return i}function Ky(o,e){const t=Zy(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function $y(o,e){let t;switch(e){case mu:t="Linear";break;case gu:t="Reinhard";break;case vu:t="Cineon";break;case yu:t="ACESFilmic";break;case _u:t="AgX";break;case Mu:t="Neutral";break;case xu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+o+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ta=new E;function jy(){$e.getLuminanceCoefficients(Ta);const o=Ta.x.toFixed(4),e=Ta.y.toFixed(4),t=Ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jy(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function Qy(o){const e=[];for(const t in o){const n=o[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ex(o,e){const t={},n=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=o.getActiveAttrib(e,i),r=s.name;let a=1;s.type===o.FLOAT_MAT2&&(a=2),s.type===o.FLOAT_MAT3&&(a=3),s.type===o.FLOAT_MAT4&&(a=4),t[r]={type:s.type,location:o.getAttribLocation(e,r),locationSize:a}}return t}function Cr(o){return o!==""}function Id(o,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dd(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const tx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ic(o){return o.replace(tx,ix)}const nx=new Map;function ix(o,e){let t=Ye[e];if(t===void 0){const n=nx.get(e);if(n!==void 0)t=Ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ic(t)}const sx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ud(o){return o.replace(sx,rx)}function rx(o,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Nd(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ox(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===Ul?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===Nl?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Nn&&(e="SHADOWMAP_TYPE_VSM"),e}function ax(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Yn:case fi:e="ENVMAP_TYPE_CUBE";break;case gs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function lx(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case fi:e="ENVMAP_MODE_REFRACTION";break}return e}function cx(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case sr:e="ENVMAP_BLENDING_MULTIPLY";break;case fu:e="ENVMAP_BLENDING_MIX";break;case pu:e="ENVMAP_BLENDING_ADD";break}return e}function hx(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ux(o,e,t,n){const i=o.getContext(),s=t.defines;let r=t.vertexShader,a=t.fragmentShader;const l=ox(t),c=ax(t),h=lx(t),u=cx(t),d=hx(t),f=Jy(t),p=Qy(s),v=i.createProgram();let g,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cr).join(`
`),m.length>0&&(m+=`
`)):(g=[Nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),m=[Nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Ye.tonemapping_pars_fragment:"",t.toneMapping!==Xn?$y("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,Ky("linearToOutputTexel",t.outputColorSpace),jy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),r=Ic(r),r=Id(r,t),r=Dd(r,t),a=Ic(a),a=Id(a,t),a=Dd(a,t),r=Ud(r),a=Ud(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=_+g+r,y=_+m+a,L=Rd(i,i.VERTEX_SHADER,x),w=Rd(i,i.FRAGMENT_SHADER,y);i.attachShader(v,L),i.attachShader(v,w),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(P){if(o.debug.checkShaderErrors){const H=i.getProgramInfoLog(v).trim(),k=i.getShaderInfoLog(L).trim(),z=i.getShaderInfoLog(w).trim();let V=!0,U=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(V=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,v,L,w);else{const K=Pd(i,L,"vertex"),D=Pd(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+K+`
`+D)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(k===""||z==="")&&(U=!1);U&&(P.diagnostics={runnable:V,programLog:H,vertexShader:{log:k,prefix:g},fragmentShader:{log:z,prefix:m}})}i.deleteShader(L),i.deleteShader(w),C=new wa(i,v),S=ex(i,v)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,Xy)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yy++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=w,this}let dx=0;class fx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new px(e),t.set(e,n)),n}}class px{constructor(e){this.id=dx++,this.code=e,this.usedTimes=0}}function mx(o,e,t,n,i,s,r){const a=new aa,l=new fx,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,H,k){const z=H.fog,V=k.geometry,U=S.isMeshStandardMaterial?H.environment:null,K=(S.isMeshStandardMaterial?t:e).get(S.envMap||U),D=K&&K.mapping===gs?K.image.height:null,ee=p[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const he=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,de=he!==void 0?he.length:0;let Ie=0;V.morphAttributes.position!==void 0&&(Ie=1),V.morphAttributes.normal!==void 0&&(Ie=2),V.morphAttributes.color!==void 0&&(Ie=3);let Fe,W,$,Te;if(ee){const ut=Rn[ee];Fe=ut.vertexShader,W=ut.fragmentShader}else Fe=S.vertexShader,W=S.fragmentShader,l.update(S),$=l.getVertexShaderID(S),Te=l.getFragmentShaderID(S);const le=o.getRenderTarget(),Ue=o.state.buffers.depth.getReversed(),Ve=k.isInstancedMesh===!0,ke=k.isBatchedMesh===!0,rt=!!S.map,ne=!!S.matcap,oe=!!K,I=!!S.aoMap,Le=!!S.lightMap,se=!!S.bumpMap,Me=!!S.normalMap,ce=!!S.displacementMap,Oe=!!S.emissiveMap,xe=!!S.metalnessMap,R=!!S.roughnessMap,b=S.anisotropy>0,G=S.clearcoat>0,J=S.dispersion>0,ie=S.iridescence>0,Q=S.sheen>0,Ae=S.transmission>0,fe=b&&!!S.anisotropyMap,_e=G&&!!S.clearcoatMap,Qe=G&&!!S.clearcoatNormalMap,re=G&&!!S.clearcoatRoughnessMap,Se=ie&&!!S.iridescenceMap,Be=ie&&!!S.iridescenceThicknessMap,ze=Q&&!!S.sheenColorMap,be=Q&&!!S.sheenRoughnessMap,it=!!S.specularMap,Ke=!!S.specularColorMap,dt=!!S.specularIntensityMap,F=Ae&&!!S.transmissionMap,pe=Ae&&!!S.thicknessMap,Z=!!S.gradientMap,te=!!S.alphaMap,ve=S.alphaTest>0,me=!!S.alphaHash,qe=!!S.extensions;let St=Xn;S.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(St=o.toneMapping);const qt={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Fe,fragmentShader:W,defines:S.defines,customVertexShaderID:$,customFragmentShaderID:Te,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:ke,batchingColor:ke&&k._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&k.instanceColor!==null,instancingMorph:Ve&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?o.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Ut,alphaToCoverage:!!S.alphaToCoverage,map:rt,matcap:ne,envMap:oe,envMapMode:oe&&K.mapping,envMapCubeUVHeight:D,aoMap:I,lightMap:Le,bumpMap:se,normalMap:Me,displacementMap:d&&ce,emissiveMap:Oe,normalMapObjectSpace:Me&&S.normalMapType===Eu,normalMapTangentSpace:Me&&S.normalMapType===Kn,metalnessMap:xe,roughnessMap:R,anisotropy:b,anisotropyMap:fe,clearcoat:G,clearcoatMap:_e,clearcoatNormalMap:Qe,clearcoatRoughnessMap:re,dispersion:J,iridescence:ie,iridescenceMap:Se,iridescenceThicknessMap:Be,sheen:Q,sheenColorMap:ze,sheenRoughnessMap:be,specularMap:it,specularColorMap:Ke,specularIntensityMap:dt,transmission:Ae,transmissionMap:F,thicknessMap:pe,gradientMap:Z,opaque:S.transparent===!1&&S.blending===Ii&&S.alphaToCoverage===!1,alphaMap:te,alphaTest:ve,alphaHash:me,combine:S.combine,mapUv:rt&&v(S.map.channel),aoMapUv:I&&v(S.aoMap.channel),lightMapUv:Le&&v(S.lightMap.channel),bumpMapUv:se&&v(S.bumpMap.channel),normalMapUv:Me&&v(S.normalMap.channel),displacementMapUv:ce&&v(S.displacementMap.channel),emissiveMapUv:Oe&&v(S.emissiveMap.channel),metalnessMapUv:xe&&v(S.metalnessMap.channel),roughnessMapUv:R&&v(S.roughnessMap.channel),anisotropyMapUv:fe&&v(S.anisotropyMap.channel),clearcoatMapUv:_e&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Qe&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Be&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:be&&v(S.sheenRoughnessMap.channel),specularMapUv:it&&v(S.specularMap.channel),specularColorMapUv:Ke&&v(S.specularColorMap.channel),specularIntensityMapUv:dt&&v(S.specularIntensityMap.channel),transmissionMapUv:F&&v(S.transmissionMap.channel),thicknessMapUv:pe&&v(S.thicknessMap.channel),alphaMapUv:te&&v(S.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Me||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!V.attributes.uv&&(rt||te),fog:!!z,useFog:S.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ue,skinning:k.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ie,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:o.shadowMap.enabled&&P.length>0,shadowMapType:o.shadowMap.type,toneMapping:St,decodeVideoTexture:rt&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===ht,decodeVideoTextureEmissive:Oe&&S.emissiveMap.isVideoTexture===!0&&$e.getTransfer(S.emissiveMap.colorSpace)===ht,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===fn,flipSided:S.side===Ft,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:qe&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&S.extensions.multiDraw===!0||ke)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return qt.vertexUv1s=c.has(1),qt.vertexUv2s=c.has(2),qt.vertexUv3s=c.has(3),c.clear(),qt}function m(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(_(M,S),x(M,S),M.push(o.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function _(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){const M=p[S.type];let P;if(M){const H=Rn[M];P=od.clone(H.uniforms)}else P=S.uniforms;return P}function L(S,M){let P;for(let H=0,k=h.length;H<k;H++){const z=h[H];if(z.cacheKey===M){P=z,++P.usedTimes;break}}return P===void 0&&(P=new ux(o,M,S,s),h.push(P)),P}function w(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function C(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:L,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:C}}function gx(){let o=new WeakMap;function e(r){return o.has(r)}function t(r){let a=o.get(r);return a===void 0&&(a={},o.set(r,a)),a}function n(r){o.delete(r)}function i(r,a,l){o.get(r)[a]=l}function s(){o=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function vx(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Fd(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function Od(){const o=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function r(u,d,f,p,v,g){let m=o[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:v,group:g},o[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=v,m.group=g),e++,m}function a(u,d,f,p,v,g){const m=r(u,d,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(u,d,f,p,v,g){const m=r(u,d,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||vx),n.length>1&&n.sort(d||Fd),i.length>1&&i.sort(d||Fd)}function h(){for(let u=e,d=o.length;u<d;u++){const f=o[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function yx(){let o=new WeakMap;function e(n,i){const s=o.get(n);let r;return s===void 0?(r=new Od,o.set(n,[r])):i>=s.length?(r=new Od,s.push(r)):r=s[i],r}function t(){o=new WeakMap}return{get:e,dispose:t}}function xx(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new q};break;case"SpotLight":t={position:new E,direction:new E,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new q,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new q,groundColor:new q};break;case"RectAreaLight":t={color:new q,position:new E,halfWidth:new E,halfHeight:new E};break}return o[e.id]=t,t}}}function _x(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=t,t}}}let Mx=0;function Sx(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function bx(o){const e=new xx,t=_x(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);const i=new E,s=new De,r=new De;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,_=0,x=0,y=0,L=0,w=0,A=0;c.sort(Sx);for(let S=0,M=c.length;S<M;S++){const P=c[S],H=P.color,k=P.intensity,z=P.distance,V=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=H.r*k,u+=H.g*k,d+=H.b*k;else if(P.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(P.sh.coefficients[U],k);A++}else if(P.isDirectionalLight){const U=e.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,D=t.get(P);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,n.directionalShadow[f]=D,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=P.shadow.matrix,_++}n.directional[f]=U,f++}else if(P.isSpotLight){const U=e.get(P);U.position.setFromMatrixPosition(P.matrixWorld),U.color.copy(H).multiplyScalar(k),U.distance=z,U.coneCos=Math.cos(P.angle),U.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),U.decay=P.decay,n.spot[v]=U;const K=P.shadow;if(P.map&&(n.spotLightMap[L]=P.map,L++,K.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[v]=K.matrix,P.castShadow){const D=t.get(P);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,n.spotShadow[v]=D,n.spotShadowMap[v]=V,y++}v++}else if(P.isRectAreaLight){const U=e.get(P);U.color.copy(H).multiplyScalar(k),U.halfWidth.set(P.width*.5,0,0),U.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=U,g++}else if(P.isPointLight){const U=e.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),U.distance=P.distance,U.decay=P.decay,P.castShadow){const K=P.shadow,D=t.get(P);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,D.shadowCameraNear=K.camera.near,D.shadowCameraFar=K.camera.far,n.pointShadow[p]=D,n.pointShadowMap[p]=V,n.pointShadowMatrix[p]=P.shadow.matrix,x++}n.point[p]=U,p++}else if(P.isHemisphereLight){const U=e.get(P);U.skyColor.copy(P.color).multiplyScalar(k),U.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[m]=U,m++}}g>0&&(o.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==f||C.pointLength!==p||C.spotLength!==v||C.rectAreaLength!==g||C.hemiLength!==m||C.numDirectionalShadows!==_||C.numPointShadows!==x||C.numSpotShadows!==y||C.numSpotMaps!==L||C.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+L-w,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,C.directionalLength=f,C.pointLength=p,C.spotLength=v,C.rectAreaLength=g,C.hemiLength=m,C.numDirectionalShadows=_,C.numPointShadows=x,C.numSpotShadows=y,C.numSpotMaps=L,C.numLightProbes=A,n.version=Mx++)}function l(c,h){let u=0,d=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){const x=c[m];if(x.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),r.identity(),s.copy(x.matrixWorld),s.premultiply(g),r.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),p++}else if(x.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:n}}function Bd(o){const e=new bx(o),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function r(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:r}}function wx(o){let e=new WeakMap;function t(i,s=0){const r=e.get(i);let a;return r===void 0?(a=new Bd(o),e.set(i,[a])):s>=r.length?(a=new Bd(o),r.push(a)):a=r[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Dc extends Rt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Uc extends Rt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Tx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ax=`uniform sampler2D shadow_pass;
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
}`;function Ex(o,e,t){let n=new Er;const i=new j,s=new j,r=new st,a=new Dc({depthPacking:Au}),l=new Uc,c={},h=t.maxTextureSize,u={[Fn]:Ft,[Ft]:Fn,[fn]:fn},d=new Ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new j},radius:{value:4}},vertexShader:Tx,fragmentShader:Ax}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new He;p.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ne(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ul;let m=this.type;this.render=function(w,A,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const S=o.getRenderTarget(),M=o.getActiveCubeFace(),P=o.getActiveMipmapLevel(),H=o.state;H.setBlending(Wn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const k=m!==Nn&&this.type===Nn,z=m===Nn&&this.type!==Nn;for(let V=0,U=w.length;V<U;V++){const K=w[V],D=K.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;i.copy(D.mapSize);const ee=D.getFrameExtents();if(i.multiply(ee),s.copy(D.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ee.x),i.x=s.x*ee.x,D.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ee.y),i.y=s.y*ee.y,D.mapSize.y=s.y)),D.map===null||k===!0||z===!0){const de=this.type!==Nn?{minFilter:vt,magFilter:vt}:{};D.map!==null&&D.map.dispose(),D.map=new Qt(i.x,i.y,de),D.map.texture.name=K.name+".shadowMap",D.camera.updateProjectionMatrix()}o.setRenderTarget(D.map),o.clear();const he=D.getViewportCount();for(let de=0;de<he;de++){const Ie=D.getViewport(de);r.set(s.x*Ie.x,s.y*Ie.y,s.x*Ie.z,s.y*Ie.w),H.viewport(r),D.updateMatrices(K,de),n=D.getFrustum(),y(A,C,D.camera,K,this.type)}D.isPointLightShadow!==!0&&this.type===Nn&&_(D,C),D.needsUpdate=!1}m=this.type,g.needsUpdate=!1,o.setRenderTarget(S,M,P)};function _(w,A){const C=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Qt(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,o.setRenderTarget(w.mapPass),o.clear(),o.renderBufferDirect(A,null,C,d,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,o.setRenderTarget(w.map),o.clear(),o.renderBufferDirect(A,null,C,f,v,null)}function x(w,A,C,S){let M=null;const P=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)M=P;else if(M=C.isPointLight===!0?l:a,o.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=M.uuid,k=A.uuid;let z=c[H];z===void 0&&(z={},c[H]=z);let V=z[k];V===void 0&&(V=M.clone(),z[k]=V,A.addEventListener("dispose",L)),M=V}if(M.visible=A.visible,M.wireframe=A.wireframe,S===Nn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=o.properties.get(M);H.light=C}return M}function y(w,A,C,S,M){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===Nn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const k=e.update(w),z=w.material;if(Array.isArray(z)){const V=k.groups;for(let U=0,K=V.length;U<K;U++){const D=V[U],ee=z[D.materialIndex];if(ee&&ee.visible){const he=x(w,ee,S,M);w.onBeforeShadow(o,w,A,C,k,he,D),o.renderBufferDirect(C,null,k,he,w,D),w.onAfterShadow(o,w,A,C,k,he,D)}}}else if(z.visible){const V=x(w,z,S,M);w.onBeforeShadow(o,w,A,C,k,V,null),o.renderBufferDirect(C,null,k,V,w,null),w.onAfterShadow(o,w,A,C,k,V,null)}}const H=w.children;for(let k=0,z=H.length;k<z;k++)y(H[k],A,C,S,M)}function L(w){w.target.removeEventListener("dispose",L);for(const C in c){const S=c[C],M=w.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Cx={[lo]:co,[ho]:po,[uo]:mo,[Di]:fo,[co]:lo,[po]:ho,[mo]:uo,[fo]:Di};function Rx(o,e){function t(){let F=!1;const pe=new st;let Z=null;const te=new st(0,0,0,0);return{setMask:function(ve){Z!==ve&&!F&&(o.colorMask(ve,ve,ve,ve),Z=ve)},setLocked:function(ve){F=ve},setClear:function(ve,me,qe,St,qt){qt===!0&&(ve*=St,me*=St,qe*=St),pe.set(ve,me,qe,St),te.equals(pe)===!1&&(o.clearColor(ve,me,qe,St),te.copy(pe))},reset:function(){F=!1,Z=null,te.set(-1,0,0,0)}}}function n(){let F=!1,pe=!1,Z=null,te=null,ve=null;return{setReversed:function(me){if(pe!==me){const qe=e.get("EXT_clip_control");pe?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT);const St=ve;ve=null,this.setClear(St)}pe=me},getReversed:function(){return pe},setTest:function(me){me?le(o.DEPTH_TEST):Ue(o.DEPTH_TEST)},setMask:function(me){Z!==me&&!F&&(o.depthMask(me),Z=me)},setFunc:function(me){if(pe&&(me=Cx[me]),te!==me){switch(me){case lo:o.depthFunc(o.NEVER);break;case co:o.depthFunc(o.ALWAYS);break;case ho:o.depthFunc(o.LESS);break;case Di:o.depthFunc(o.LEQUAL);break;case uo:o.depthFunc(o.EQUAL);break;case fo:o.depthFunc(o.GEQUAL);break;case po:o.depthFunc(o.GREATER);break;case mo:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}te=me}},setLocked:function(me){F=me},setClear:function(me){ve!==me&&(pe&&(me=1-me),o.clearDepth(me),ve=me)},reset:function(){F=!1,Z=null,te=null,ve=null,pe=!1}}}function i(){let F=!1,pe=null,Z=null,te=null,ve=null,me=null,qe=null,St=null,qt=null;return{setTest:function(ut){F||(ut?le(o.STENCIL_TEST):Ue(o.STENCIL_TEST))},setMask:function(ut){pe!==ut&&!F&&(o.stencilMask(ut),pe=ut)},setFunc:function(ut,Dn,hi){(Z!==ut||te!==Dn||ve!==hi)&&(o.stencilFunc(ut,Dn,hi),Z=ut,te=Dn,ve=hi)},setOp:function(ut,Dn,hi){(me!==ut||qe!==Dn||St!==hi)&&(o.stencilOp(ut,Dn,hi),me=ut,qe=Dn,St=hi)},setLocked:function(ut){F=ut},setClear:function(ut){qt!==ut&&(o.clearStencil(ut),qt=ut)},reset:function(){F=!1,pe=null,Z=null,te=null,ve=null,me=null,qe=null,St=null,qt=null}}}const s=new t,r=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,_=null,x=null,y=null,L=null,w=null,A=new q(0,0,0),C=0,S=!1,M=null,P=null,H=null,k=null,z=null;const V=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,K=0;const D=o.getParameter(o.VERSION);D.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(D)[1]),U=K>=1):D.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),U=K>=2);let ee=null,he={};const de=o.getParameter(o.SCISSOR_BOX),Ie=o.getParameter(o.VIEWPORT),Fe=new st().fromArray(de),W=new st().fromArray(Ie);function $(F,pe,Z,te){const ve=new Uint8Array(4),me=o.createTexture();o.bindTexture(F,me),o.texParameteri(F,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(F,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let qe=0;qe<Z;qe++)F===o.TEXTURE_3D||F===o.TEXTURE_2D_ARRAY?o.texImage3D(pe,0,o.RGBA,1,1,te,0,o.RGBA,o.UNSIGNED_BYTE,ve):o.texImage2D(pe+qe,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,ve);return me}const Te={};Te[o.TEXTURE_2D]=$(o.TEXTURE_2D,o.TEXTURE_2D,1),Te[o.TEXTURE_CUBE_MAP]=$(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),Te[o.TEXTURE_2D_ARRAY]=$(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),Te[o.TEXTURE_3D]=$(o.TEXTURE_3D,o.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),le(o.DEPTH_TEST),r.setFunc(Di),se(!1),Me(Dl),le(o.CULL_FACE),I(Wn);function le(F){h[F]!==!0&&(o.enable(F),h[F]=!0)}function Ue(F){h[F]!==!1&&(o.disable(F),h[F]=!1)}function Ve(F,pe){return u[F]!==pe?(o.bindFramebuffer(F,pe),u[F]=pe,F===o.DRAW_FRAMEBUFFER&&(u[o.FRAMEBUFFER]=pe),F===o.FRAMEBUFFER&&(u[o.DRAW_FRAMEBUFFER]=pe),!0):!1}function ke(F,pe){let Z=f,te=!1;if(F){Z=d.get(pe),Z===void 0&&(Z=[],d.set(pe,Z));const ve=F.textures;if(Z.length!==ve.length||Z[0]!==o.COLOR_ATTACHMENT0){for(let me=0,qe=ve.length;me<qe;me++)Z[me]=o.COLOR_ATTACHMENT0+me;Z.length=ve.length,te=!0}}else Z[0]!==o.BACK&&(Z[0]=o.BACK,te=!0);te&&o.drawBuffers(Z)}function rt(F){return p!==F?(o.useProgram(F),p=F,!0):!1}const ne={[di]:o.FUNC_ADD,[$h]:o.FUNC_SUBTRACT,[jh]:o.FUNC_REVERSE_SUBTRACT};ne[Jh]=o.MIN,ne[Qh]=o.MAX;const oe={[eu]:o.ZERO,[tu]:o.ONE,[nu]:o.SRC_COLOR,[oo]:o.SRC_ALPHA,[lu]:o.SRC_ALPHA_SATURATE,[ou]:o.DST_COLOR,[su]:o.DST_ALPHA,[iu]:o.ONE_MINUS_SRC_COLOR,[ao]:o.ONE_MINUS_SRC_ALPHA,[au]:o.ONE_MINUS_DST_COLOR,[ru]:o.ONE_MINUS_DST_ALPHA,[cu]:o.CONSTANT_COLOR,[hu]:o.ONE_MINUS_CONSTANT_COLOR,[uu]:o.CONSTANT_ALPHA,[du]:o.ONE_MINUS_CONSTANT_ALPHA};function I(F,pe,Z,te,ve,me,qe,St,qt,ut){if(F===Wn){v===!0&&(Ue(o.BLEND),v=!1);return}if(v===!1&&(le(o.BLEND),v=!0),F!==Kh){if(F!==g||ut!==S){if((m!==di||y!==di)&&(o.blendEquation(o.FUNC_ADD),m=di,y=di),ut)switch(F){case Ii:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Fl:o.blendFunc(o.ONE,o.ONE);break;case Ol:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Bl:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ii:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Fl:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case Ol:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Bl:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}_=null,x=null,L=null,w=null,A.set(0,0,0),C=0,g=F,S=ut}return}ve=ve||pe,me=me||Z,qe=qe||te,(pe!==m||ve!==y)&&(o.blendEquationSeparate(ne[pe],ne[ve]),m=pe,y=ve),(Z!==_||te!==x||me!==L||qe!==w)&&(o.blendFuncSeparate(oe[Z],oe[te],oe[me],oe[qe]),_=Z,x=te,L=me,w=qe),(St.equals(A)===!1||qt!==C)&&(o.blendColor(St.r,St.g,St.b,qt),A.copy(St),C=qt),g=F,S=!1}function Le(F,pe){F.side===fn?Ue(o.CULL_FACE):le(o.CULL_FACE);let Z=F.side===Ft;pe&&(Z=!Z),se(Z),F.blending===Ii&&F.transparent===!1?I(Wn):I(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);const te=F.stencilWrite;a.setTest(te),te&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Oe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?le(o.SAMPLE_ALPHA_TO_COVERAGE):Ue(o.SAMPLE_ALPHA_TO_COVERAGE)}function se(F){M!==F&&(F?o.frontFace(o.CW):o.frontFace(o.CCW),M=F)}function Me(F){F!==qh?(le(o.CULL_FACE),F!==P&&(F===Dl?o.cullFace(o.BACK):F===Zh?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Ue(o.CULL_FACE),P=F}function ce(F){F!==H&&(U&&o.lineWidth(F),H=F)}function Oe(F,pe,Z){F?(le(o.POLYGON_OFFSET_FILL),(k!==pe||z!==Z)&&(o.polygonOffset(pe,Z),k=pe,z=Z)):Ue(o.POLYGON_OFFSET_FILL)}function xe(F){F?le(o.SCISSOR_TEST):Ue(o.SCISSOR_TEST)}function R(F){F===void 0&&(F=o.TEXTURE0+V-1),ee!==F&&(o.activeTexture(F),ee=F)}function b(F,pe,Z){Z===void 0&&(ee===null?Z=o.TEXTURE0+V-1:Z=ee);let te=he[Z];te===void 0&&(te={type:void 0,texture:void 0},he[Z]=te),(te.type!==F||te.texture!==pe)&&(ee!==Z&&(o.activeTexture(Z),ee=Z),o.bindTexture(F,pe||Te[F]),te.type=F,te.texture=pe)}function G(){const F=he[ee];F!==void 0&&F.type!==void 0&&(o.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function J(){try{o.compressedTexImage2D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{o.compressedTexImage3D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{o.texSubImage2D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ae(){try{o.texSubImage3D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function fe(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function _e(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Qe(){try{o.texStorage2D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function re(){try{o.texStorage3D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{o.texImage2D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Be(){try{o.texImage3D.apply(o,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(F){Fe.equals(F)===!1&&(o.scissor(F.x,F.y,F.z,F.w),Fe.copy(F))}function be(F){W.equals(F)===!1&&(o.viewport(F.x,F.y,F.z,F.w),W.copy(F))}function it(F,pe){let Z=c.get(pe);Z===void 0&&(Z=new WeakMap,c.set(pe,Z));let te=Z.get(F);te===void 0&&(te=o.getUniformBlockIndex(pe,F.name),Z.set(F,te))}function Ke(F,pe){const te=c.get(pe).get(F);l.get(pe)!==te&&(o.uniformBlockBinding(pe,te,F.__bindingPointIndex),l.set(pe,te))}function dt(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),r.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),h={},ee=null,he={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,_=null,x=null,y=null,L=null,w=null,A=new q(0,0,0),C=0,S=!1,M=null,P=null,H=null,k=null,z=null,Fe.set(0,0,o.canvas.width,o.canvas.height),W.set(0,0,o.canvas.width,o.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:le,disable:Ue,bindFramebuffer:Ve,drawBuffers:ke,useProgram:rt,setBlending:I,setMaterial:Le,setFlipSided:se,setCullFace:Me,setLineWidth:ce,setPolygonOffset:Oe,setScissorTest:xe,activeTexture:R,bindTexture:b,unbindTexture:G,compressedTexImage2D:J,compressedTexImage3D:ie,texImage2D:Se,texImage3D:Be,updateUBOMapping:it,uniformBlockBinding:Ke,texStorage2D:Qe,texStorage3D:re,texSubImage2D:Q,texSubImage3D:Ae,compressedTexSubImage2D:fe,compressedTexSubImage3D:_e,scissor:ze,viewport:be,reset:dt}}function Lx(o,e){const t=o.image&&o.image.width?o.image.width/o.image.height:1;return t>e?(o.repeat.x=1,o.repeat.y=t/e,o.offset.x=0,o.offset.y=(1-o.repeat.y)/2):(o.repeat.x=e/t,o.repeat.y=1,o.offset.x=(1-o.repeat.x)/2,o.offset.y=0),o}function Px(o,e){const t=o.image&&o.image.width?o.image.width/o.image.height:1;return t>e?(o.repeat.x=e/t,o.repeat.y=1,o.offset.x=(1-o.repeat.x)/2,o.offset.y=0):(o.repeat.x=1,o.repeat.y=t/e,o.offset.x=0,o.offset.y=(1-o.repeat.y)/2),o}function Ix(o){return o.repeat.x=1,o.repeat.y=1,o.offset.x=0,o.offset.y=0,o}function Nc(o,e,t,n){const i=Dx(n);switch(t){case Gl:return o*e;case Xl:return o*e;case Yl:return o*e*2;case Mo:return o*e/i.components*i.byteLength;case ar:return o*e/i.components*i.byteLength;case ql:return o*e*2/i.components*i.byteLength;case So:return o*e*2/i.components*i.byteLength;case Wl:return o*e*3/i.components*i.byteLength;case Tt:return o*e*4/i.components*i.byteLength;case bo:return o*e*4/i.components*i.byteLength;case lr:case cr:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case hr:case ur:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case To:case Eo:return Math.max(o,16)*Math.max(e,8)/4;case wo:case Ao:return Math.max(o,8)*Math.max(e,8)/2;case Co:case Ro:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Lo:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Po:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Io:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case Do:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case No:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case ko:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case zo:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Ho:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Vo:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Go:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case dr:case Xo:case Yo:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Zl:case qo:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Zo:case Ko:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dx(o){switch(o){case mn:case zl:return{byteLength:1,components:1};case xs:case Hl:case Zn:return{byteLength:2,components:1};case xo:case _o:return{byteLength:2,components:4};case qn:case yo:case Jt:return{byteLength:4,components:1};case Vl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}const Ux={contain:Lx,cover:Px,fill:Ix,getByteLength:Nc};function Nx(o,e,t,n,i,s,r){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new j,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,b){return f?new OffscreenCanvas(R,b):xr("canvas")}function v(R,b,G){let J=1;const ie=xe(R);if((ie.width>G||ie.height>G)&&(J=G/Math.max(ie.width,ie.height)),J<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Q=Math.floor(J*ie.width),Ae=Math.floor(J*ie.height);u===void 0&&(u=p(Q,Ae));const fe=b?p(Q,Ae):u;return fe.width=Q,fe.height=Ae,fe.getContext("2d").drawImage(R,0,0,Q,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Q+"x"+Ae+")."),fe}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),R;return R}function g(R){return R.generateMipmaps}function m(R){o.generateMipmap(R)}function _(R){return R.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?o.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function x(R,b,G,J,ie=!1){if(R!==null){if(o[R]!==void 0)return o[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Q=b;if(b===o.RED&&(G===o.FLOAT&&(Q=o.R32F),G===o.HALF_FLOAT&&(Q=o.R16F),G===o.UNSIGNED_BYTE&&(Q=o.R8)),b===o.RED_INTEGER&&(G===o.UNSIGNED_BYTE&&(Q=o.R8UI),G===o.UNSIGNED_SHORT&&(Q=o.R16UI),G===o.UNSIGNED_INT&&(Q=o.R32UI),G===o.BYTE&&(Q=o.R8I),G===o.SHORT&&(Q=o.R16I),G===o.INT&&(Q=o.R32I)),b===o.RG&&(G===o.FLOAT&&(Q=o.RG32F),G===o.HALF_FLOAT&&(Q=o.RG16F),G===o.UNSIGNED_BYTE&&(Q=o.RG8)),b===o.RG_INTEGER&&(G===o.UNSIGNED_BYTE&&(Q=o.RG8UI),G===o.UNSIGNED_SHORT&&(Q=o.RG16UI),G===o.UNSIGNED_INT&&(Q=o.RG32UI),G===o.BYTE&&(Q=o.RG8I),G===o.SHORT&&(Q=o.RG16I),G===o.INT&&(Q=o.RG32I)),b===o.RGB_INTEGER&&(G===o.UNSIGNED_BYTE&&(Q=o.RGB8UI),G===o.UNSIGNED_SHORT&&(Q=o.RGB16UI),G===o.UNSIGNED_INT&&(Q=o.RGB32UI),G===o.BYTE&&(Q=o.RGB8I),G===o.SHORT&&(Q=o.RGB16I),G===o.INT&&(Q=o.RGB32I)),b===o.RGBA_INTEGER&&(G===o.UNSIGNED_BYTE&&(Q=o.RGBA8UI),G===o.UNSIGNED_SHORT&&(Q=o.RGBA16UI),G===o.UNSIGNED_INT&&(Q=o.RGBA32UI),G===o.BYTE&&(Q=o.RGBA8I),G===o.SHORT&&(Q=o.RGBA16I),G===o.INT&&(Q=o.RGBA32I)),b===o.RGB&&G===o.UNSIGNED_INT_5_9_9_9_REV&&(Q=o.RGB9_E5),b===o.RGBA){const Ae=ie?mr:$e.getTransfer(J);G===o.FLOAT&&(Q=o.RGBA32F),G===o.HALF_FLOAT&&(Q=o.RGBA16F),G===o.UNSIGNED_BYTE&&(Q=Ae===ht?o.SRGB8_ALPHA8:o.RGBA8),G===o.UNSIGNED_SHORT_4_4_4_4&&(Q=o.RGBA4),G===o.UNSIGNED_SHORT_5_5_5_1&&(Q=o.RGB5_A1)}return(Q===o.R16F||Q===o.R32F||Q===o.RG16F||Q===o.RG32F||Q===o.RGBA16F||Q===o.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function y(R,b){let G;return R?b===null||b===qn||b===pi?G=o.DEPTH24_STENCIL8:b===Jt?G=o.DEPTH32F_STENCIL8:b===xs&&(G=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===qn||b===pi?G=o.DEPTH_COMPONENT24:b===Jt?G=o.DEPTH_COMPONENT32F:b===xs&&(G=o.DEPTH_COMPONENT16),G}function L(R,b){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==vt&&R.minFilter!==at?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function w(R){const b=R.target;b.removeEventListener("dispose",w),C(b),b.isVideoTexture&&h.delete(b)}function A(R){const b=R.target;b.removeEventListener("dispose",A),M(b)}function C(R){const b=n.get(R);if(b.__webglInit===void 0)return;const G=R.source,J=d.get(G);if(J){const ie=J[b.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&S(R),Object.keys(J).length===0&&d.delete(G)}n.remove(R)}function S(R){const b=n.get(R);o.deleteTexture(b.__webglTexture);const G=R.source,J=d.get(G);delete J[b.__cacheKey],r.memory.textures--}function M(R){const b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let ie=0;ie<b.__webglFramebuffer[J].length;ie++)o.deleteFramebuffer(b.__webglFramebuffer[J][ie]);else o.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)o.deleteFramebuffer(b.__webglFramebuffer[J]);else o.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&o.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&o.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&o.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const G=R.textures;for(let J=0,ie=G.length;J<ie;J++){const Q=n.get(G[J]);Q.__webglTexture&&(o.deleteTexture(Q.__webglTexture),r.memory.textures--),n.remove(G[J])}n.remove(R)}let P=0;function H(){P=0}function k(){const R=P;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),P+=1,R}function z(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function V(R,b){const G=n.get(R);if(R.isVideoTexture&&ce(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const J=R.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(G,R,b);return}}t.bindTexture(o.TEXTURE_2D,G.__webglTexture,o.TEXTURE0+b)}function U(R,b){const G=n.get(R);if(R.version>0&&G.__version!==R.version){W(G,R,b);return}t.bindTexture(o.TEXTURE_2D_ARRAY,G.__webglTexture,o.TEXTURE0+b)}function K(R,b){const G=n.get(R);if(R.version>0&&G.__version!==R.version){W(G,R,b);return}t.bindTexture(o.TEXTURE_3D,G.__webglTexture,o.TEXTURE0+b)}function D(R,b){const G=n.get(R);if(R.version>0&&G.__version!==R.version){$(G,R,b);return}t.bindTexture(o.TEXTURE_CUBE_MAP,G.__webglTexture,o.TEXTURE0+b)}const ee={[On]:o.REPEAT,[Zt]:o.CLAMP_TO_EDGE,[vs]:o.MIRRORED_REPEAT},he={[vt]:o.NEAREST,[vo]:o.NEAREST_MIPMAP_NEAREST,[Ui]:o.NEAREST_MIPMAP_LINEAR,[at]:o.LINEAR,[ys]:o.LINEAR_MIPMAP_NEAREST,[pn]:o.LINEAR_MIPMAP_LINEAR},de={[Cu]:o.NEVER,[Uu]:o.ALWAYS,[Ru]:o.LESS,[Jl]:o.LEQUAL,[Lu]:o.EQUAL,[Du]:o.GEQUAL,[Pu]:o.GREATER,[Iu]:o.NOTEQUAL};function Ie(R,b){if(b.type===Jt&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===at||b.magFilter===ys||b.magFilter===Ui||b.magFilter===pn||b.minFilter===at||b.minFilter===ys||b.minFilter===Ui||b.minFilter===pn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(R,o.TEXTURE_WRAP_S,ee[b.wrapS]),o.texParameteri(R,o.TEXTURE_WRAP_T,ee[b.wrapT]),(R===o.TEXTURE_3D||R===o.TEXTURE_2D_ARRAY)&&o.texParameteri(R,o.TEXTURE_WRAP_R,ee[b.wrapR]),o.texParameteri(R,o.TEXTURE_MAG_FILTER,he[b.magFilter]),o.texParameteri(R,o.TEXTURE_MIN_FILTER,he[b.minFilter]),b.compareFunction&&(o.texParameteri(R,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(R,o.TEXTURE_COMPARE_FUNC,de[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===vt||b.minFilter!==Ui&&b.minFilter!==pn||b.type===Jt&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");o.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Fe(R,b){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",w));const J=b.source;let ie=d.get(J);ie===void 0&&(ie={},d.set(J,ie));const Q=z(b);if(Q!==R.__cacheKey){ie[Q]===void 0&&(ie[Q]={texture:o.createTexture(),usedTimes:0},r.memory.textures++,G=!0),ie[Q].usedTimes++;const Ae=ie[R.__cacheKey];Ae!==void 0&&(ie[R.__cacheKey].usedTimes--,Ae.usedTimes===0&&S(b)),R.__cacheKey=Q,R.__webglTexture=ie[Q].texture}return G}function W(R,b,G){let J=o.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(J=o.TEXTURE_2D_ARRAY),b.isData3DTexture&&(J=o.TEXTURE_3D);const ie=Fe(R,b),Q=b.source;t.bindTexture(J,R.__webglTexture,o.TEXTURE0+G);const Ae=n.get(Q);if(Q.version!==Ae.__version||ie===!0){t.activeTexture(o.TEXTURE0+G);const fe=$e.getPrimaries($e.workingColorSpace),_e=b.colorSpace===Tn?null:$e.getPrimaries(b.colorSpace),Qe=b.colorSpace===Tn||fe===_e?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let re=v(b.image,!1,i.maxTextureSize);re=Oe(b,re);const Se=s.convert(b.format,b.colorSpace),Be=s.convert(b.type);let ze=x(b.internalFormat,Se,Be,b.colorSpace,b.isVideoTexture);Ie(J,b);let be;const it=b.mipmaps,Ke=b.isVideoTexture!==!0,dt=Ae.__version===void 0||ie===!0,F=Q.dataReady,pe=L(b,re);if(b.isDepthTexture)ze=y(b.format===mi,b.type),dt&&(Ke?t.texStorage2D(o.TEXTURE_2D,1,ze,re.width,re.height):t.texImage2D(o.TEXTURE_2D,0,ze,re.width,re.height,0,Se,Be,null));else if(b.isDataTexture)if(it.length>0){Ke&&dt&&t.texStorage2D(o.TEXTURE_2D,pe,ze,it[0].width,it[0].height);for(let Z=0,te=it.length;Z<te;Z++)be=it[Z],Ke?F&&t.texSubImage2D(o.TEXTURE_2D,Z,0,0,be.width,be.height,Se,Be,be.data):t.texImage2D(o.TEXTURE_2D,Z,ze,be.width,be.height,0,Se,Be,be.data);b.generateMipmaps=!1}else Ke?(dt&&t.texStorage2D(o.TEXTURE_2D,pe,ze,re.width,re.height),F&&t.texSubImage2D(o.TEXTURE_2D,0,0,0,re.width,re.height,Se,Be,re.data)):t.texImage2D(o.TEXTURE_2D,0,ze,re.width,re.height,0,Se,Be,re.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ke&&dt&&t.texStorage3D(o.TEXTURE_2D_ARRAY,pe,ze,it[0].width,it[0].height,re.depth);for(let Z=0,te=it.length;Z<te;Z++)if(be=it[Z],b.format!==Tt)if(Se!==null)if(Ke){if(F)if(b.layerUpdates.size>0){const ve=Nc(be.width,be.height,b.format,b.type);for(const me of b.layerUpdates){const qe=be.data.subarray(me*ve/be.data.BYTES_PER_ELEMENT,(me+1)*ve/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,Z,0,0,me,be.width,be.height,1,Se,qe)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,Z,0,0,0,be.width,be.height,re.depth,Se,be.data)}else t.compressedTexImage3D(o.TEXTURE_2D_ARRAY,Z,ze,be.width,be.height,re.depth,0,be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ke?F&&t.texSubImage3D(o.TEXTURE_2D_ARRAY,Z,0,0,0,be.width,be.height,re.depth,Se,Be,be.data):t.texImage3D(o.TEXTURE_2D_ARRAY,Z,ze,be.width,be.height,re.depth,0,Se,Be,be.data)}else{Ke&&dt&&t.texStorage2D(o.TEXTURE_2D,pe,ze,it[0].width,it[0].height);for(let Z=0,te=it.length;Z<te;Z++)be=it[Z],b.format!==Tt?Se!==null?Ke?F&&t.compressedTexSubImage2D(o.TEXTURE_2D,Z,0,0,be.width,be.height,Se,be.data):t.compressedTexImage2D(o.TEXTURE_2D,Z,ze,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?F&&t.texSubImage2D(o.TEXTURE_2D,Z,0,0,be.width,be.height,Se,Be,be.data):t.texImage2D(o.TEXTURE_2D,Z,ze,be.width,be.height,0,Se,Be,be.data)}else if(b.isDataArrayTexture)if(Ke){if(dt&&t.texStorage3D(o.TEXTURE_2D_ARRAY,pe,ze,re.width,re.height,re.depth),F)if(b.layerUpdates.size>0){const Z=Nc(re.width,re.height,b.format,b.type);for(const te of b.layerUpdates){const ve=re.data.subarray(te*Z/re.data.BYTES_PER_ELEMENT,(te+1)*Z/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,te,re.width,re.height,1,Se,Be,ve)}b.clearLayerUpdates()}else t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,Se,Be,re.data)}else t.texImage3D(o.TEXTURE_2D_ARRAY,0,ze,re.width,re.height,re.depth,0,Se,Be,re.data);else if(b.isData3DTexture)Ke?(dt&&t.texStorage3D(o.TEXTURE_3D,pe,ze,re.width,re.height,re.depth),F&&t.texSubImage3D(o.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,Se,Be,re.data)):t.texImage3D(o.TEXTURE_3D,0,ze,re.width,re.height,re.depth,0,Se,Be,re.data);else if(b.isFramebufferTexture){if(dt)if(Ke)t.texStorage2D(o.TEXTURE_2D,pe,ze,re.width,re.height);else{let Z=re.width,te=re.height;for(let ve=0;ve<pe;ve++)t.texImage2D(o.TEXTURE_2D,ve,ze,Z,te,0,Se,Be,null),Z>>=1,te>>=1}}else if(it.length>0){if(Ke&&dt){const Z=xe(it[0]);t.texStorage2D(o.TEXTURE_2D,pe,ze,Z.width,Z.height)}for(let Z=0,te=it.length;Z<te;Z++)be=it[Z],Ke?F&&t.texSubImage2D(o.TEXTURE_2D,Z,0,0,Se,Be,be):t.texImage2D(o.TEXTURE_2D,Z,ze,Se,Be,be);b.generateMipmaps=!1}else if(Ke){if(dt){const Z=xe(re);t.texStorage2D(o.TEXTURE_2D,pe,ze,Z.width,Z.height)}F&&t.texSubImage2D(o.TEXTURE_2D,0,0,0,Se,Be,re)}else t.texImage2D(o.TEXTURE_2D,0,ze,Se,Be,re);g(b)&&m(J),Ae.__version=Q.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function $(R,b,G){if(b.image.length!==6)return;const J=Fe(R,b),ie=b.source;t.bindTexture(o.TEXTURE_CUBE_MAP,R.__webglTexture,o.TEXTURE0+G);const Q=n.get(ie);if(ie.version!==Q.__version||J===!0){t.activeTexture(o.TEXTURE0+G);const Ae=$e.getPrimaries($e.workingColorSpace),fe=b.colorSpace===Tn?null:$e.getPrimaries(b.colorSpace),_e=b.colorSpace===Tn||Ae===fe?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Qe=b.isCompressedTexture||b.image[0].isCompressedTexture,re=b.image[0]&&b.image[0].isDataTexture,Se=[];for(let te=0;te<6;te++)!Qe&&!re?Se[te]=v(b.image[te],!0,i.maxCubemapSize):Se[te]=re?b.image[te].image:b.image[te],Se[te]=Oe(b,Se[te]);const Be=Se[0],ze=s.convert(b.format,b.colorSpace),be=s.convert(b.type),it=x(b.internalFormat,ze,be,b.colorSpace),Ke=b.isVideoTexture!==!0,dt=Q.__version===void 0||J===!0,F=ie.dataReady;let pe=L(b,Be);Ie(o.TEXTURE_CUBE_MAP,b);let Z;if(Qe){Ke&&dt&&t.texStorage2D(o.TEXTURE_CUBE_MAP,pe,it,Be.width,Be.height);for(let te=0;te<6;te++){Z=Se[te].mipmaps;for(let ve=0;ve<Z.length;ve++){const me=Z[ve];b.format!==Tt?ze!==null?Ke?F&&t.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve,0,0,me.width,me.height,ze,me.data):t.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve,it,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ke?F&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve,0,0,me.width,me.height,ze,be,me.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve,it,me.width,me.height,0,ze,be,me.data)}}}else{if(Z=b.mipmaps,Ke&&dt){Z.length>0&&pe++;const te=xe(Se[0]);t.texStorage2D(o.TEXTURE_CUBE_MAP,pe,it,te.width,te.height)}for(let te=0;te<6;te++)if(re){Ke?F&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Se[te].width,Se[te].height,ze,be,Se[te].data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,it,Se[te].width,Se[te].height,0,ze,be,Se[te].data);for(let ve=0;ve<Z.length;ve++){const qe=Z[ve].image[te].image;Ke?F&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve+1,0,0,qe.width,qe.height,ze,be,qe.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve+1,it,qe.width,qe.height,0,ze,be,qe.data)}}else{Ke?F&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ze,be,Se[te]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,it,ze,be,Se[te]);for(let ve=0;ve<Z.length;ve++){const me=Z[ve];Ke?F&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve+1,0,0,ze,be,me.image[te]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve+1,it,ze,be,me.image[te])}}}g(b)&&m(o.TEXTURE_CUBE_MAP),Q.__version=ie.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Te(R,b,G,J,ie,Q){const Ae=s.convert(G.format,G.colorSpace),fe=s.convert(G.type),_e=x(G.internalFormat,Ae,fe,G.colorSpace),Qe=n.get(b),re=n.get(G);if(re.__renderTarget=b,!Qe.__hasExternalTextures){const Se=Math.max(1,b.width>>Q),Be=Math.max(1,b.height>>Q);ie===o.TEXTURE_3D||ie===o.TEXTURE_2D_ARRAY?t.texImage3D(ie,Q,_e,Se,Be,b.depth,0,Ae,fe,null):t.texImage2D(ie,Q,_e,Se,Be,0,Ae,fe,null)}t.bindFramebuffer(o.FRAMEBUFFER,R),Me(b)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,J,ie,re.__webglTexture,0,se(b)):(ie===o.TEXTURE_2D||ie>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,J,ie,re.__webglTexture,Q),t.bindFramebuffer(o.FRAMEBUFFER,null)}function le(R,b,G){if(o.bindRenderbuffer(o.RENDERBUFFER,R),b.depthBuffer){const J=b.depthTexture,ie=J&&J.isDepthTexture?J.type:null,Q=y(b.stencilBuffer,ie),Ae=b.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,fe=se(b);Me(b)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,fe,Q,b.width,b.height):G?o.renderbufferStorageMultisample(o.RENDERBUFFER,fe,Q,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,Q,b.width,b.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Ae,o.RENDERBUFFER,R)}else{const J=b.textures;for(let ie=0;ie<J.length;ie++){const Q=J[ie],Ae=s.convert(Q.format,Q.colorSpace),fe=s.convert(Q.type),_e=x(Q.internalFormat,Ae,fe,Q.colorSpace),Qe=se(b);G&&Me(b)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,Qe,_e,b.width,b.height):Me(b)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Qe,_e,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,_e,b.width,b.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Ue(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(o.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(b.depthTexture);J.__renderTarget=b,(!J.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),V(b.depthTexture,0);const ie=J.__webglTexture,Q=se(b);if(b.depthTexture.format===Ni)Me(b)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,ie,0,Q):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,ie,0);else if(b.depthTexture.format===mi)Me(b)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,ie,0,Q):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ve(R){const b=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const J=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),J){const ie=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,J.removeEventListener("dispose",ie)};J.addEventListener("dispose",ie),b.__depthDisposeCallback=ie}b.__boundDepthTexture=J}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Ue(b.__webglFramebuffer,R)}else if(G){b.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer[J]),b.__webglDepthbuffer[J]===void 0)b.__webglDepthbuffer[J]=o.createRenderbuffer(),le(b.__webglDepthbuffer[J],R,!1);else{const ie=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer[J];o.bindRenderbuffer(o.RENDERBUFFER,Q),o.framebufferRenderbuffer(o.FRAMEBUFFER,ie,o.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=o.createRenderbuffer(),le(b.__webglDepthbuffer,R,!1);else{const J=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ie=b.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,ie),o.framebufferRenderbuffer(o.FRAMEBUFFER,J,o.RENDERBUFFER,ie)}t.bindFramebuffer(o.FRAMEBUFFER,null)}function ke(R,b,G){const J=n.get(R);b!==void 0&&Te(J.__webglFramebuffer,R,R.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),G!==void 0&&Ve(R)}function rt(R){const b=R.texture,G=n.get(R),J=n.get(b);R.addEventListener("dispose",A);const ie=R.textures,Q=R.isWebGLCubeRenderTarget===!0,Ae=ie.length>1;if(Ae||(J.__webglTexture===void 0&&(J.__webglTexture=o.createTexture()),J.__version=b.version,r.memory.textures++),Q){G.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer[fe]=[];for(let _e=0;_e<b.mipmaps.length;_e++)G.__webglFramebuffer[fe][_e]=o.createFramebuffer()}else G.__webglFramebuffer[fe]=o.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer=[];for(let fe=0;fe<b.mipmaps.length;fe++)G.__webglFramebuffer[fe]=o.createFramebuffer()}else G.__webglFramebuffer=o.createFramebuffer();if(Ae)for(let fe=0,_e=ie.length;fe<_e;fe++){const Qe=n.get(ie[fe]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=o.createTexture(),r.memory.textures++)}if(R.samples>0&&Me(R)===!1){G.__webglMultisampledFramebuffer=o.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(o.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let fe=0;fe<ie.length;fe++){const _e=ie[fe];G.__webglColorRenderbuffer[fe]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,G.__webglColorRenderbuffer[fe]);const Qe=s.convert(_e.format,_e.colorSpace),re=s.convert(_e.type),Se=x(_e.internalFormat,Qe,re,_e.colorSpace,R.isXRRenderTarget===!0),Be=se(R);o.renderbufferStorageMultisample(o.RENDERBUFFER,Be,Se,R.width,R.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+fe,o.RENDERBUFFER,G.__webglColorRenderbuffer[fe])}o.bindRenderbuffer(o.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=o.createRenderbuffer(),le(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Q){t.bindTexture(o.TEXTURE_CUBE_MAP,J.__webglTexture),Ie(o.TEXTURE_CUBE_MAP,b);for(let fe=0;fe<6;fe++)if(b.mipmaps&&b.mipmaps.length>0)for(let _e=0;_e<b.mipmaps.length;_e++)Te(G.__webglFramebuffer[fe][_e],R,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+fe,_e);else Te(G.__webglFramebuffer[fe],R,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);g(b)&&m(o.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let fe=0,_e=ie.length;fe<_e;fe++){const Qe=ie[fe],re=n.get(Qe);t.bindTexture(o.TEXTURE_2D,re.__webglTexture),Ie(o.TEXTURE_2D,Qe),Te(G.__webglFramebuffer,R,Qe,o.COLOR_ATTACHMENT0+fe,o.TEXTURE_2D,0),g(Qe)&&m(o.TEXTURE_2D)}t.unbindTexture()}else{let fe=o.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(fe=R.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),t.bindTexture(fe,J.__webglTexture),Ie(fe,b),b.mipmaps&&b.mipmaps.length>0)for(let _e=0;_e<b.mipmaps.length;_e++)Te(G.__webglFramebuffer[_e],R,b,o.COLOR_ATTACHMENT0,fe,_e);else Te(G.__webglFramebuffer,R,b,o.COLOR_ATTACHMENT0,fe,0);g(b)&&m(fe),t.unbindTexture()}R.depthBuffer&&Ve(R)}function ne(R){const b=R.textures;for(let G=0,J=b.length;G<J;G++){const ie=b[G];if(g(ie)){const Q=_(R),Ae=n.get(ie).__webglTexture;t.bindTexture(Q,Ae),m(Q),t.unbindTexture()}}}const oe=[],I=[];function Le(R){if(R.samples>0){if(Me(R)===!1){const b=R.textures,G=R.width,J=R.height;let ie=o.COLOR_BUFFER_BIT;const Q=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ae=n.get(R),fe=b.length>1;if(fe)for(let _e=0;_e<b.length;_e++)t.bindFramebuffer(o.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+_e,o.RENDERBUFFER,null),t.bindFramebuffer(o.FRAMEBUFFER,Ae.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+_e,o.TEXTURE_2D,null,0);t.bindFramebuffer(o.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let _e=0;_e<b.length;_e++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ie|=o.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ie|=o.STENCIL_BUFFER_BIT)),fe){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Ae.__webglColorRenderbuffer[_e]);const Qe=n.get(b[_e]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Qe,0)}o.blitFramebuffer(0,0,G,J,0,0,G,J,ie,o.NEAREST),l===!0&&(oe.length=0,I.length=0,oe.push(o.COLOR_ATTACHMENT0+_e),R.depthBuffer&&R.resolveDepthBuffer===!1&&(oe.push(Q),I.push(Q),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,I)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,oe))}if(t.bindFramebuffer(o.READ_FRAMEBUFFER,null),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),fe)for(let _e=0;_e<b.length;_e++){t.bindFramebuffer(o.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+_e,o.RENDERBUFFER,Ae.__webglColorRenderbuffer[_e]);const Qe=n.get(b[_e]).__webglTexture;t.bindFramebuffer(o.FRAMEBUFFER,Ae.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+_e,o.TEXTURE_2D,Qe,0)}t.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[b])}}}function se(R){return Math.min(i.maxSamples,R.samples)}function Me(R){const b=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ce(R){const b=r.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function Oe(R,b){const G=R.colorSpace,J=R.format,ie=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==Ut&&G!==Tn&&($e.getTransfer(G)===ht?(J!==Tt||ie!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),b}function xe(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=H,this.setTexture2D=V,this.setTexture2DArray=U,this.setTexture3D=K,this.setTextureCube=D,this.rebindTextures=ke,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Me}function kd(o,e){function t(n,i=Tn){let s;const r=$e.getTransfer(i);if(n===mn)return o.UNSIGNED_BYTE;if(n===xo)return o.UNSIGNED_SHORT_4_4_4_4;if(n===_o)return o.UNSIGNED_SHORT_5_5_5_1;if(n===Vl)return o.UNSIGNED_INT_5_9_9_9_REV;if(n===zl)return o.BYTE;if(n===Hl)return o.SHORT;if(n===xs)return o.UNSIGNED_SHORT;if(n===yo)return o.INT;if(n===qn)return o.UNSIGNED_INT;if(n===Jt)return o.FLOAT;if(n===Zn)return o.HALF_FLOAT;if(n===Gl)return o.ALPHA;if(n===Wl)return o.RGB;if(n===Tt)return o.RGBA;if(n===Xl)return o.LUMINANCE;if(n===Yl)return o.LUMINANCE_ALPHA;if(n===Ni)return o.DEPTH_COMPONENT;if(n===mi)return o.DEPTH_STENCIL;if(n===Mo)return o.RED;if(n===ar)return o.RED_INTEGER;if(n===ql)return o.RG;if(n===So)return o.RG_INTEGER;if(n===bo)return o.RGBA_INTEGER;if(n===lr||n===cr||n===hr||n===ur)if(r===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===lr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===lr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===hr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ur)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wo||n===To||n===Ao||n===Eo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===wo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===To)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ao)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Eo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Co||n===Ro||n===Lo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Co||n===Ro)return r===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Lo)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Po||n===Io||n===Do||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===ko||n===zo||n===Ho||n===Vo||n===Go||n===Wo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Po)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Io)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Do)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===No)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fo)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oo)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bo)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ko)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zo)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ho)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vo)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Go)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wo)return r===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===dr||n===Xo||n===Yo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===dr)return r===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zl||n===qo||n===Zo||n===Ko)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===dr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===qo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ko)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===pi?o.UNSIGNED_INT_24_8:o[n]!==void 0?o[n]:null}return{convert:t}}class zd extends Et{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Vt extends tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fx={type:"move"};class Fc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Fx)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Vt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ox=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bx=`
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

}`;class kx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new gt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ht({vertexShader:Ox,fragmentShader:Bx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ne(new si(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zx extends kn{constructor(e,t){super();const n=this;let i=null,s=1,r=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const v=new kx,g=t.getContextAttributes();let m=null,_=null;const x=[],y=[],L=new j;let w=null;const A=new Et;A.viewport=new st;const C=new Et;C.viewport=new st;const S=[A,C],M=new zd;let P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let $=x[W];return $===void 0&&($=new Fc,x[W]=$),$.getTargetRaySpace()},this.getControllerGrip=function(W){let $=x[W];return $===void 0&&($=new Fc,x[W]=$),$.getGripSpace()},this.getHand=function(W){let $=x[W];return $===void 0&&($=new Fc,x[W]=$),$.getHandSpace()};function k(W){const $=y.indexOf(W.inputSource);if($===-1)return;const Te=x[$];Te!==void 0&&(Te.update(W.inputSource,W.frame,c||r),Te.dispatchEvent({type:W.type,data:W.inputSource}))}function z(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",V);for(let W=0;W<x.length;W++){const $=y[W];$!==null&&(y[W]=null,x[W].disconnect($))}P=null,H=null,v.reset(),e.setRenderTarget(m),f=null,d=null,u=null,i=null,_=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",z),i.addEventListener("inputsourceschange",V),g.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(L),i.renderState.layers===void 0){const $={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,$),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Qt(f.framebufferWidth,f.framebufferHeight,{format:Tt,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let $=null,Te=null,le=null;g.depth&&(le=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=g.stencil?mi:Ni,Te=g.stencil?pi:qn);const Ue={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ue),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new Qt(d.textureWidth,d.textureHeight,{format:Tt,type:mn,depthTexture:new Sa(d.textureWidth,d.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(a),Fe.setContext(i),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function V(W){for(let $=0;$<W.removed.length;$++){const Te=W.removed[$],le=y.indexOf(Te);le>=0&&(y[le]=null,x[le].disconnect(Te))}for(let $=0;$<W.added.length;$++){const Te=W.added[$];let le=y.indexOf(Te);if(le===-1){for(let Ve=0;Ve<x.length;Ve++)if(Ve>=y.length){y.push(Te),le=Ve;break}else if(y[Ve]===null){y[Ve]=Te,le=Ve;break}if(le===-1)break}const Ue=x[le];Ue&&Ue.connect(Te)}}const U=new E,K=new E;function D(W,$,Te){U.setFromMatrixPosition($.matrixWorld),K.setFromMatrixPosition(Te.matrixWorld);const le=U.distanceTo(K),Ue=$.projectionMatrix.elements,Ve=Te.projectionMatrix.elements,ke=Ue[14]/(Ue[10]-1),rt=Ue[14]/(Ue[10]+1),ne=(Ue[9]+1)/Ue[5],oe=(Ue[9]-1)/Ue[5],I=(Ue[8]-1)/Ue[0],Le=(Ve[8]+1)/Ve[0],se=ke*I,Me=ke*Le,ce=le/(-I+Le),Oe=ce*-I;if($.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Oe),W.translateZ(ce),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ue[10]===-1)W.projectionMatrix.copy($.projectionMatrix),W.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const xe=ke+ce,R=rt+ce,b=se-Oe,G=Me+(le-Oe),J=ne*rt/R*xe,ie=oe*rt/R*xe;W.projectionMatrix.makePerspective(b,G,J,ie,xe,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ee(W,$){$===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices($.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;let $=W.near,Te=W.far;v.texture!==null&&(v.depthNear>0&&($=v.depthNear),v.depthFar>0&&(Te=v.depthFar)),M.near=C.near=A.near=$,M.far=C.far=A.far=Te,(P!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,H=M.far),A.layers.mask=W.layers.mask|2,C.layers.mask=W.layers.mask|4,M.layers.mask=A.layers.mask|C.layers.mask;const le=W.parent,Ue=M.cameras;ee(M,le);for(let Ve=0;Ve<Ue.length;Ve++)ee(Ue[Ve],le);Ue.length===2?D(M,A,C):M.projectionMatrix.copy(A.projectionMatrix),he(W,M,le)};function he(W,$,Te){Te===null?W.matrix.copy($.matrixWorld):(W.matrix.copy(Te.matrixWorld),W.matrix.invert(),W.matrix.multiply($.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy($.projectionMatrix),W.projectionMatrixInverse.copy($.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ss*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let de=null;function Ie(W,$){if(h=$.getViewerPose(c||r),p=$,h!==null){const Te=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let le=!1;Te.length!==M.cameras.length&&(M.cameras.length=0,le=!0);for(let Ve=0;Ve<Te.length;Ve++){const ke=Te[Ve];let rt=null;if(f!==null)rt=f.getViewport(ke);else{const oe=u.getViewSubImage(d,ke);rt=oe.viewport,Ve===0&&(e.setRenderTargetTextures(_,oe.colorTexture,d.ignoreDepthValues?void 0:oe.depthStencilTexture),e.setRenderTarget(_))}let ne=S[Ve];ne===void 0&&(ne=new Et,ne.layers.enable(Ve),ne.viewport=new st,S[Ve]=ne),ne.matrix.fromArray(ke.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(ke.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(rt.x,rt.y,rt.width,rt.height),Ve===0&&(M.matrix.copy(ne.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),le===!0&&M.cameras.push(ne)}const Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")){const Ve=u.getDepthInformation(Te[0]);Ve&&Ve.isValid&&Ve.texture&&v.init(e,Ve,i.renderState)}}for(let Te=0;Te<x.length;Te++){const le=y[Te],Ue=x[Te];le!==null&&Ue!==void 0&&Ue.update(le,$,c||r)}de&&de(W,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),p=null}const Fe=new ud;Fe.setAnimationLoop(Ie),this.setAnimationLoop=function(W){de=W},this.dispose=function(){}}}const Ki=new ln,Hx=new De;function Vx(o,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,rd(o)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,_,x,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,_,x):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ft&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ft&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const _=e.get(m),x=_.envMap,y=_.envMapRotation;x&&(g.envMap.value=x,Ki.copy(y),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),g.envMapRotation.value.setFromMatrix4(Hx.makeRotationFromEuler(Ki)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,_,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=x*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ft&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const _=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Gx(o,e,t,n){let i={},s={},r=[];const a=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){const y=x.program;n.uniformBlockBinding(_,y)}function c(_,x){let y=i[_.id];y===void 0&&(p(_),y=h(_),i[_.id]=y,_.addEventListener("dispose",g));const L=x.program;n.updateUBOMapping(_,L);const w=e.render.frame;s[_.id]!==w&&(d(_),s[_.id]=w)}function h(_){const x=u();_.__bindingPointIndex=x;const y=o.createBuffer(),L=_.__size,w=_.usage;return o.bindBuffer(o.UNIFORM_BUFFER,y),o.bufferData(o.UNIFORM_BUFFER,L,w),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,x,y),y}function u(){for(let _=0;_<a;_++)if(r.indexOf(_)===-1)return r.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const x=i[_.id],y=_.uniforms,L=_.__cache;o.bindBuffer(o.UNIFORM_BUFFER,x);for(let w=0,A=y.length;w<A;w++){const C=Array.isArray(y[w])?y[w]:[y[w]];for(let S=0,M=C.length;S<M;S++){const P=C[S];if(f(P,w,S,L)===!0){const H=P.__offset,k=Array.isArray(P.value)?P.value:[P.value];let z=0;for(let V=0;V<k.length;V++){const U=k[V],K=v(U);typeof U=="number"||typeof U=="boolean"?(P.__data[0]=U,o.bufferSubData(o.UNIFORM_BUFFER,H+z,P.__data)):U.isMatrix3?(P.__data[0]=U.elements[0],P.__data[1]=U.elements[1],P.__data[2]=U.elements[2],P.__data[3]=0,P.__data[4]=U.elements[3],P.__data[5]=U.elements[4],P.__data[6]=U.elements[5],P.__data[7]=0,P.__data[8]=U.elements[6],P.__data[9]=U.elements[7],P.__data[10]=U.elements[8],P.__data[11]=0):(U.toArray(P.__data,z),z+=K.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,H,P.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function f(_,x,y,L){const w=_.value,A=x+"_"+y;if(L[A]===void 0)return typeof w=="number"||typeof w=="boolean"?L[A]=w:L[A]=w.clone(),!0;{const C=L[A];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return L[A]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function p(_){const x=_.uniforms;let y=0;const L=16;for(let A=0,C=x.length;A<C;A++){const S=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,P=S.length;M<P;M++){const H=S[M],k=Array.isArray(H.value)?H.value:[H.value];for(let z=0,V=k.length;z<V;z++){const U=k[z],K=v(U),D=y%L,ee=D%K.boundary,he=D+ee;y+=ee,he!==0&&L-he<K.storage&&(y+=L-he),H.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=y,y+=K.storage}}}const w=y%L;return w>0&&(y+=L-w),_.__size=y,_.__cache={},this}function v(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function g(_){const x=_.target;x.removeEventListener("dispose",g);const y=r.indexOf(x.__bindingPointIndex);r.splice(y,1),o.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const _ in i)o.deleteBuffer(i[_]);r=[],i={},s={}}return{bind:l,update:c,dispose:m}}class Hd{constructor(e={}){const{canvas:t=Ou(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const _=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yt,this.toneMapping=Xn,this.toneMappingExposure=1;const y=this;let L=!1,w=0,A=0,C=null,S=-1,M=null;const P=new st,H=new st;let k=null;const z=new q(0);let V=0,U=t.width,K=t.height,D=1,ee=null,he=null;const de=new st(0,0,U,K),Ie=new st(0,0,U,K);let Fe=!1;const W=new Er;let $=!1,Te=!1;const le=new De,Ue=new De,Ve=new E,ke=new st,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ne=!1;function oe(){return C===null?D:1}let I=n;function Le(T,O){return t.getContext(T,O)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${dn}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",me,!1),I===null){const O="webgl2";if(I=Le(O,T),I===null)throw Le(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let se,Me,ce,Oe,xe,R,b,G,J,ie,Q,Ae,fe,_e,Qe,re,Se,Be,ze,be,it,Ke,dt,F;function pe(){se=new Kv(I),se.init(),Ke=new kd(I,se),Me=new Gv(I,se,e,Ke),ce=new Rx(I,se),Me.reverseDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),Oe=new Jv(I),xe=new gx,R=new Nx(I,se,ce,xe,Me,Ke,Oe),b=new Xv(y),G=new Zv(y),J=new kg(I),dt=new Hv(I,J),ie=new $v(I,J,Oe,dt),Q=new ey(I,ie,J,Oe),ze=new Qv(I,Me,R),re=new Wv(xe),Ae=new mx(y,b,G,se,Me,dt,re),fe=new Vx(y,xe),_e=new yx,Qe=new wx(se),Be=new zv(y,b,G,ce,Q,f,l),Se=new Ex(y,Q,Me),F=new Gx(I,Oe,Me,ce),be=new Vv(I,se,Oe),it=new jv(I,se,Oe),Oe.programs=Ae.programs,y.capabilities=Me,y.extensions=se,y.properties=xe,y.renderLists=_e,y.shadowMap=Se,y.state=ce,y.info=Oe}pe();const Z=new zx(y,I);this.xr=Z,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=se.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=se.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(T){T!==void 0&&(D=T,this.setSize(U,K,!1))},this.getSize=function(T){return T.set(U,K)},this.setSize=function(T,O,X=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=T,K=O,t.width=Math.floor(T*D),t.height=Math.floor(O*D),X===!0&&(t.style.width=T+"px",t.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(U*D,K*D).floor()},this.setDrawingBufferSize=function(T,O,X){U=T,K=O,D=X,t.width=Math.floor(T*X),t.height=Math.floor(O*X),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(de)},this.setViewport=function(T,O,X,Y){T.isVector4?de.set(T.x,T.y,T.z,T.w):de.set(T,O,X,Y),ce.viewport(P.copy(de).multiplyScalar(D).round())},this.getScissor=function(T){return T.copy(Ie)},this.setScissor=function(T,O,X,Y){T.isVector4?Ie.set(T.x,T.y,T.z,T.w):Ie.set(T,O,X,Y),ce.scissor(H.copy(Ie).multiplyScalar(D).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(T){ce.setScissorTest(Fe=T)},this.setOpaqueSort=function(T){ee=T},this.setTransparentSort=function(T){he=T},this.getClearColor=function(T){return T.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor.apply(Be,arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha.apply(Be,arguments)},this.clear=function(T=!0,O=!0,X=!0){let Y=0;if(T){let B=!1;if(C!==null){const ae=C.texture.format;B=ae===bo||ae===So||ae===ar}if(B){const ae=C.texture.type,ge=ae===mn||ae===qn||ae===xs||ae===pi||ae===xo||ae===_o,Ee=Be.getClearColor(),Ce=Be.getClearAlpha(),Ge=Ee.r,Ze=Ee.g,Re=Ee.b;ge?(p[0]=Ge,p[1]=Ze,p[2]=Re,p[3]=Ce,I.clearBufferuiv(I.COLOR,0,p)):(v[0]=Ge,v[1]=Ze,v[2]=Re,v[3]=Ce,I.clearBufferiv(I.COLOR,0,v))}else Y|=I.COLOR_BUFFER_BIT}O&&(Y|=I.DEPTH_BUFFER_BIT),X&&(Y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",me,!1),_e.dispose(),Qe.dispose(),xe.dispose(),b.dispose(),G.dispose(),Q.dispose(),dt.dispose(),F.dispose(),Ae.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",rm),Z.removeEventListener("sessionend",om),ps.stop()};function te(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const T=Oe.autoReset,O=Se.enabled,X=Se.autoUpdate,Y=Se.needsUpdate,B=Se.type;pe(),Oe.autoReset=T,Se.enabled=O,Se.autoUpdate=X,Se.needsUpdate=Y,Se.type=B}function me(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function qe(T){const O=T.target;O.removeEventListener("dispose",qe),St(O)}function St(T){qt(T),xe.remove(T)}function qt(T){const O=xe.get(T).programs;O!==void 0&&(O.forEach(function(X){Ae.releaseProgram(X)}),T.isShaderMaterial&&Ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,X,Y,B,ae){O===null&&(O=rt);const ge=B.isMesh&&B.matrixWorld.determinant()<0,Ee=US(T,O,X,Y,B);ce.setMaterial(Y,ge);let Ce=X.index,Ge=1;if(Y.wireframe===!0){if(Ce=ie.getWireframeAttribute(X),Ce===void 0)return;Ge=2}const Ze=X.drawRange,Re=X.attributes.position;let ot=Ze.start*Ge,ft=(Ze.start+Ze.count)*Ge;ae!==null&&(ot=Math.max(ot,ae.start*Ge),ft=Math.min(ft,(ae.start+ae.count)*Ge)),Ce!==null?(ot=Math.max(ot,0),ft=Math.min(ft,Ce.count)):Re!=null&&(ot=Math.max(ot,0),ft=Math.min(ft,Re.count));const pt=ft-ot;if(pt<0||pt===1/0)return;dt.setup(B,Y,Ee,X,Ce);let rn,lt=be;if(Ce!==null&&(rn=J.get(Ce),lt=it,lt.setIndex(rn)),B.isMesh)Y.wireframe===!0?(ce.setLineWidth(Y.wireframeLinewidth*oe()),lt.setMode(I.LINES)):lt.setMode(I.TRIANGLES);else if(B.isLine){let Pe=Y.linewidth;Pe===void 0&&(Pe=1),ce.setLineWidth(Pe*oe()),B.isLineSegments?lt.setMode(I.LINES):B.isLineLoop?lt.setMode(I.LINE_LOOP):lt.setMode(I.LINE_STRIP)}else B.isPoints?lt.setMode(I.POINTS):B.isSprite&&lt.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)lt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(se.get("WEBGL_multi_draw"))lt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Pe=B._multiDrawStarts,ui=B._multiDrawCounts,ct=B._multiDrawCount,Un=Ce?J.get(Ce).bytesPerElement:1,ir=xe.get(Y).currentProgram.getUniforms();for(let un=0;un<ct;un++)ir.setValue(I,"_gl_DrawID",un),lt.render(Pe[un]/Un,ui[un])}else if(B.isInstancedMesh)lt.renderInstances(ot,pt,B.count);else if(X.isInstancedBufferGeometry){const Pe=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ui=Math.min(X.instanceCount,Pe);lt.renderInstances(ot,pt,ui)}else lt.render(ot,pt)};function ut(T,O,X){T.transparent===!0&&T.side===fn&&T.forceSinglePass===!1?(T.side=Ft,T.needsUpdate=!0,Il(T,O,X),T.side=Fn,T.needsUpdate=!0,Il(T,O,X),T.side=fn):Il(T,O,X)}this.compile=function(T,O,X=null){X===null&&(X=T),m=Qe.get(X),m.init(O),x.push(m),X.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),T!==X&&T.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const Y=new Set;return T.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ae=B.material;if(ae)if(Array.isArray(ae))for(let ge=0;ge<ae.length;ge++){const Ee=ae[ge];ut(Ee,X,B),Y.add(Ee)}else ut(ae,X,B),Y.add(ae)}),x.pop(),m=null,Y},this.compileAsync=function(T,O,X=null){const Y=this.compile(T,O,X);return new Promise(B=>{function ae(){if(Y.forEach(function(ge){xe.get(ge).currentProgram.isReady()&&Y.delete(ge)}),Y.size===0){B(T);return}setTimeout(ae,10)}se.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Dn=null;function hi(T){Dn&&Dn(T)}function rm(){ps.stop()}function om(){ps.start()}const ps=new ud;ps.setAnimationLoop(hi),typeof self<"u"&&ps.setContext(self),this.setAnimationLoop=function(T){Dn=T,Z.setAnimationLoop(T),T===null?ps.stop():ps.start()},Z.addEventListener("sessionstart",rm),Z.addEventListener("sessionend",om),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(O),O=Z.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,O,C),m=Qe.get(T,x.length),m.init(O),x.push(m),Ue.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),W.setFromProjectionMatrix(Ue),Te=this.localClippingEnabled,$=re.init(this.clippingPlanes,Te),g=_e.get(T,_.length),g.init(),_.push(g),Z.enabled===!0&&Z.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&Yh(ae,O,-1/0,y.sortObjects)}Yh(T,O,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ee,he),ne=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,ne&&Be.addToRenderList(g,T),this.info.render.frame++,$===!0&&re.beginShadows();const X=m.state.shadowsArray;Se.render(X,T,O),$===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=g.opaque,B=g.transmissive;if(m.setupLights(),O.isArrayCamera){const ae=O.cameras;if(B.length>0)for(let ge=0,Ee=ae.length;ge<Ee;ge++){const Ce=ae[ge];lm(Y,B,T,Ce)}ne&&Be.render(T);for(let ge=0,Ee=ae.length;ge<Ee;ge++){const Ce=ae[ge];am(g,T,Ce,Ce.viewport)}}else B.length>0&&lm(Y,B,T,O),ne&&Be.render(T),am(g,T,O);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(y,T,O),dt.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(m=x[x.length-1],$===!0&&re.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function Yh(T,O,X,Y){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||W.intersectsSprite(T)){Y&&ke.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ue);const ge=Q.update(T),Ee=T.material;Ee.visible&&g.push(T,ge,Ee,X,ke.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||W.intersectsObject(T))){const ge=Q.update(T),Ee=T.material;if(Y&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ke.copy(T.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),ke.copy(ge.boundingSphere.center)),ke.applyMatrix4(T.matrixWorld).applyMatrix4(Ue)),Array.isArray(Ee)){const Ce=ge.groups;for(let Ge=0,Ze=Ce.length;Ge<Ze;Ge++){const Re=Ce[Ge],ot=Ee[Re.materialIndex];ot&&ot.visible&&g.push(T,ge,ot,X,ke.z,Re)}}else Ee.visible&&g.push(T,ge,Ee,X,ke.z,null)}}const ae=T.children;for(let ge=0,Ee=ae.length;ge<Ee;ge++)Yh(ae[ge],O,X,Y)}function am(T,O,X,Y){const B=T.opaque,ae=T.transmissive,ge=T.transparent;m.setupLightsView(X),$===!0&&re.setGlobalState(y.clippingPlanes,X),Y&&ce.viewport(P.copy(Y)),B.length>0&&Pl(B,O,X),ae.length>0&&Pl(ae,O,X),ge.length>0&&Pl(ge,O,X),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function lm(T,O,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Y.id]===void 0&&(m.state.transmissionRenderTarget[Y.id]=new Qt(1,1,{generateMipmaps:!0,type:se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float")?Zn:mn,minFilter:pn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const ae=m.state.transmissionRenderTarget[Y.id],ge=Y.viewport||P;ae.setSize(ge.z,ge.w);const Ee=y.getRenderTarget();y.setRenderTarget(ae),y.getClearColor(z),V=y.getClearAlpha(),V<1&&y.setClearColor(16777215,.5),y.clear(),ne&&Be.render(X);const Ce=y.toneMapping;y.toneMapping=Xn;const Ge=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),m.setupLightsView(Y),$===!0&&re.setGlobalState(y.clippingPlanes,Y),Pl(T,X,Y),R.updateMultisampleRenderTarget(ae),R.updateRenderTargetMipmap(ae),se.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let Re=0,ot=O.length;Re<ot;Re++){const ft=O[Re],pt=ft.object,rn=ft.geometry,lt=ft.material,Pe=ft.group;if(lt.side===fn&&pt.layers.test(Y.layers)){const ui=lt.side;lt.side=Ft,lt.needsUpdate=!0,cm(pt,X,Y,rn,lt,Pe),lt.side=ui,lt.needsUpdate=!0,Ze=!0}}Ze===!0&&(R.updateMultisampleRenderTarget(ae),R.updateRenderTargetMipmap(ae))}y.setRenderTarget(Ee),y.setClearColor(z,V),Ge!==void 0&&(Y.viewport=Ge),y.toneMapping=Ce}function Pl(T,O,X){const Y=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ae=T.length;B<ae;B++){const ge=T[B],Ee=ge.object,Ce=ge.geometry,Ge=Y===null?ge.material:Y,Ze=ge.group;Ee.layers.test(X.layers)&&cm(Ee,O,X,Ce,Ge,Ze)}}function cm(T,O,X,Y,B,ae){T.onBeforeRender(y,O,X,Y,B,ae),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),B.onBeforeRender(y,O,X,Y,T,ae),B.transparent===!0&&B.side===fn&&B.forceSinglePass===!1?(B.side=Ft,B.needsUpdate=!0,y.renderBufferDirect(X,O,Y,B,T,ae),B.side=Fn,B.needsUpdate=!0,y.renderBufferDirect(X,O,Y,B,T,ae),B.side=fn):y.renderBufferDirect(X,O,Y,B,T,ae),T.onAfterRender(y,O,X,Y,B,ae)}function Il(T,O,X){O.isScene!==!0&&(O=rt);const Y=xe.get(T),B=m.state.lights,ae=m.state.shadowsArray,ge=B.state.version,Ee=Ae.getParameters(T,B.state,ae,O,X),Ce=Ae.getProgramCacheKey(Ee);let Ge=Y.programs;Y.environment=T.isMeshStandardMaterial?O.environment:null,Y.fog=O.fog,Y.envMap=(T.isMeshStandardMaterial?G:b).get(T.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Ge===void 0&&(T.addEventListener("dispose",qe),Ge=new Map,Y.programs=Ge);let Ze=Ge.get(Ce);if(Ze!==void 0){if(Y.currentProgram===Ze&&Y.lightsStateVersion===ge)return um(T,Ee),Ze}else Ee.uniforms=Ae.getUniforms(T),T.onBeforeCompile(Ee,y),Ze=Ae.acquireProgram(Ee,Ce),Ge.set(Ce,Ze),Y.uniforms=Ee.uniforms;const Re=Y.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Re.clippingPlanes=re.uniform),um(T,Ee),Y.needsLights=FS(T),Y.lightsStateVersion=ge,Y.needsLights&&(Re.ambientLightColor.value=B.state.ambient,Re.lightProbe.value=B.state.probe,Re.directionalLights.value=B.state.directional,Re.directionalLightShadows.value=B.state.directionalShadow,Re.spotLights.value=B.state.spot,Re.spotLightShadows.value=B.state.spotShadow,Re.rectAreaLights.value=B.state.rectArea,Re.ltc_1.value=B.state.rectAreaLTC1,Re.ltc_2.value=B.state.rectAreaLTC2,Re.pointLights.value=B.state.point,Re.pointLightShadows.value=B.state.pointShadow,Re.hemisphereLights.value=B.state.hemi,Re.directionalShadowMap.value=B.state.directionalShadowMap,Re.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Re.spotShadowMap.value=B.state.spotShadowMap,Re.spotLightMatrix.value=B.state.spotLightMatrix,Re.spotLightMap.value=B.state.spotLightMap,Re.pointShadowMap.value=B.state.pointShadowMap,Re.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=Ze,Y.uniformsList=null,Ze}function hm(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=wa.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function um(T,O){const X=xe.get(T);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function US(T,O,X,Y,B){O.isScene!==!0&&(O=rt),R.resetTextureUnits();const ae=O.fog,ge=Y.isMeshStandardMaterial?O.environment:null,Ee=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Ut,Ce=(Y.isMeshStandardMaterial?G:b).get(Y.envMap||ge),Ge=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ze=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Re=!!X.morphAttributes.position,ot=!!X.morphAttributes.normal,ft=!!X.morphAttributes.color;let pt=Xn;Y.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(pt=y.toneMapping);const rn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,lt=rn!==void 0?rn.length:0,Pe=xe.get(Y),ui=m.state.lights;if($===!0&&(Te===!0||T!==M)){const wn=T===M&&Y.id===S;re.setState(Y,T,wn)}let ct=!1;Y.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==ui.state.version||Pe.outputColorSpace!==Ee||B.isBatchedMesh&&Pe.batching===!1||!B.isBatchedMesh&&Pe.batching===!0||B.isBatchedMesh&&Pe.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Pe.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Pe.instancing===!1||!B.isInstancedMesh&&Pe.instancing===!0||B.isSkinnedMesh&&Pe.skinning===!1||!B.isSkinnedMesh&&Pe.skinning===!0||B.isInstancedMesh&&Pe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Pe.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Pe.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Pe.instancingMorph===!1&&B.morphTexture!==null||Pe.envMap!==Ce||Y.fog===!0&&Pe.fog!==ae||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==re.numPlanes||Pe.numIntersection!==re.numIntersection)||Pe.vertexAlphas!==Ge||Pe.vertexTangents!==Ze||Pe.morphTargets!==Re||Pe.morphNormals!==ot||Pe.morphColors!==ft||Pe.toneMapping!==pt||Pe.morphTargetsCount!==lt)&&(ct=!0):(ct=!0,Pe.__version=Y.version);let Un=Pe.currentProgram;ct===!0&&(Un=Il(Y,O,B));let ir=!1,un=!1,so=!1;const mt=Un.getUniforms(),Gn=Pe.uniforms;if(ce.useProgram(Un.program)&&(ir=!0,un=!0,so=!0),Y.id!==S&&(S=Y.id,un=!0),ir||M!==T){ce.buffers.depth.getReversed()?(le.copy(T.projectionMatrix),hg(le),ug(le),mt.setValue(I,"projectionMatrix",le)):mt.setValue(I,"projectionMatrix",T.projectionMatrix),mt.setValue(I,"viewMatrix",T.matrixWorldInverse);const Li=mt.map.cameraPosition;Li!==void 0&&Li.setValue(I,Ve.setFromMatrixPosition(T.matrixWorld)),Me.logarithmicDepthBuffer&&mt.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&mt.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,un=!0,so=!0)}if(B.isSkinnedMesh){mt.setOptional(I,B,"bindMatrix"),mt.setOptional(I,B,"bindMatrixInverse");const wn=B.skeleton;wn&&(wn.boneTexture===null&&wn.computeBoneTexture(),mt.setValue(I,"boneTexture",wn.boneTexture,R))}B.isBatchedMesh&&(mt.setOptional(I,B,"batchingTexture"),mt.setValue(I,"batchingTexture",B._matricesTexture,R),mt.setOptional(I,B,"batchingIdTexture"),mt.setValue(I,"batchingIdTexture",B._indirectTexture,R),mt.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&mt.setValue(I,"batchingColorTexture",B._colorsTexture,R));const ro=X.morphAttributes;if((ro.position!==void 0||ro.normal!==void 0||ro.color!==void 0)&&ze.update(B,X,Un),(un||Pe.receiveShadow!==B.receiveShadow)&&(Pe.receiveShadow=B.receiveShadow,mt.setValue(I,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Gn.envMap.value=Ce,Gn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&O.environment!==null&&(Gn.envMapIntensity.value=O.environmentIntensity),un&&(mt.setValue(I,"toneMappingExposure",y.toneMappingExposure),Pe.needsLights&&NS(Gn,so),ae&&Y.fog===!0&&fe.refreshFogUniforms(Gn,ae),fe.refreshMaterialUniforms(Gn,Y,D,K,m.state.transmissionRenderTarget[T.id]),wa.upload(I,hm(Pe),Gn,R)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(wa.upload(I,hm(Pe),Gn,R),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&mt.setValue(I,"center",B.center),mt.setValue(I,"modelViewMatrix",B.modelViewMatrix),mt.setValue(I,"normalMatrix",B.normalMatrix),mt.setValue(I,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const wn=Y.uniformsGroups;for(let Li=0,Pi=wn.length;Li<Pi;Li++){const dm=wn[Li];F.update(dm,Un),F.bind(dm,Un)}}return Un}function NS(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function FS(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,O,X){xe.get(T.texture).__webglTexture=O,xe.get(T.depthTexture).__webglTexture=X;const Y=xe.get(T);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){const X=xe.get(T);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,X=0){C=T,w=O,A=X;let Y=!0,B=null,ae=!1,ge=!1;if(T){const Ce=xe.get(T);if(Ce.__useDefaultFramebuffer!==void 0)ce.bindFramebuffer(I.FRAMEBUFFER,null),Y=!1;else if(Ce.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(Ce.__hasExternalTextures)R.rebindTextures(T,xe.get(T.texture).__webglTexture,xe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Re=T.depthTexture;if(Ce.__boundDepthTexture!==Re){if(Re!==null&&xe.has(Re)&&(T.width!==Re.image.width||T.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}const Ge=T.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(ge=!0);const Ze=xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ze[O])?B=Ze[O][X]:B=Ze[O],ae=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?B=xe.get(T).__webglMultisampledFramebuffer:Array.isArray(Ze)?B=Ze[X]:B=Ze,P.copy(T.viewport),H.copy(T.scissor),k=T.scissorTest}else P.copy(de).multiplyScalar(D).floor(),H.copy(Ie).multiplyScalar(D).floor(),k=Fe;if(ce.bindFramebuffer(I.FRAMEBUFFER,B)&&Y&&ce.drawBuffers(T,B),ce.viewport(P),ce.scissor(H),ce.setScissorTest(k),ae){const Ce=xe.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ce.__webglTexture,X)}else if(ge){const Ce=xe.get(T.texture),Ge=O||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ce.__webglTexture,X||0,Ge)}S=-1},this.readRenderTargetPixels=function(T,O,X,Y,B,ae,ge){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){ce.bindFramebuffer(I.FRAMEBUFFER,Ee);try{const Ce=T.texture,Ge=Ce.format,Ze=Ce.type;if(!Me.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Me.textureTypeReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-Y&&X>=0&&X<=T.height-B&&I.readPixels(O,X,Y,B,Ke.convert(Ge),Ke.convert(Ze),ae)}finally{const Ce=C!==null?xe.get(C).__webglFramebuffer:null;ce.bindFramebuffer(I.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(T,O,X,Y,B,ae,ge){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){const Ce=T.texture,Ge=Ce.format,Ze=Ce.type;if(!Me.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Me.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-Y&&X>=0&&X<=T.height-B){ce.bindFramebuffer(I.FRAMEBUFFER,Ee);const Re=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.bufferData(I.PIXEL_PACK_BUFFER,ae.byteLength,I.STREAM_READ),I.readPixels(O,X,Y,B,Ke.convert(Ge),Ke.convert(Ze),0);const ot=C!==null?xe.get(C).__webglFramebuffer:null;ce.bindFramebuffer(I.FRAMEBUFFER,ot);const ft=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await cg(I,ft,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ae),I.deleteBuffer(Re),I.deleteSync(ft),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,X=0){T.isTexture!==!0&&(_r("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);const Y=Math.pow(2,-X),B=Math.floor(T.image.width*Y),ae=Math.floor(T.image.height*Y),ge=O!==null?O.x:0,Ee=O!==null?O.y:0;R.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,X,0,0,ge,Ee,B,ae),ce.unbindTexture()},this.copyTextureToTexture=function(T,O,X=null,Y=null,B=0){T.isTexture!==!0&&(_r("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,T=arguments[1],O=arguments[2],B=arguments[3]||0,X=null);let ae,ge,Ee,Ce,Ge,Ze,Re,ot,ft;const pt=T.isCompressedTexture?T.mipmaps[B]:T.image;X!==null?(ae=X.max.x-X.min.x,ge=X.max.y-X.min.y,Ee=X.isBox3?X.max.z-X.min.z:1,Ce=X.min.x,Ge=X.min.y,Ze=X.isBox3?X.min.z:0):(ae=pt.width,ge=pt.height,Ee=pt.depth||1,Ce=0,Ge=0,Ze=0),Y!==null?(Re=Y.x,ot=Y.y,ft=Y.z):(Re=0,ot=0,ft=0);const rn=Ke.convert(O.format),lt=Ke.convert(O.type);let Pe;O.isData3DTexture?(R.setTexture3D(O,0),Pe=I.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),Pe=I.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),Pe=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const ui=I.getParameter(I.UNPACK_ROW_LENGTH),ct=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Un=I.getParameter(I.UNPACK_SKIP_PIXELS),ir=I.getParameter(I.UNPACK_SKIP_ROWS),un=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,pt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ce),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ge),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ze);const so=T.isDataArrayTexture||T.isData3DTexture,mt=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Gn=xe.get(T),ro=xe.get(O),wn=xe.get(Gn.__renderTarget),Li=xe.get(ro.__renderTarget);ce.bindFramebuffer(I.READ_FRAMEBUFFER,wn.__webglFramebuffer),ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,Li.__webglFramebuffer);for(let Pi=0;Pi<Ee;Pi++)so&&I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,xe.get(T).__webglTexture,B,Ze+Pi),T.isDepthTexture?(mt&&I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,xe.get(O).__webglTexture,B,ft+Pi),I.blitFramebuffer(Ce,Ge,ae,ge,Re,ot,ae,ge,I.DEPTH_BUFFER_BIT,I.NEAREST)):mt?I.copyTexSubImage3D(Pe,B,Re,ot,ft+Pi,Ce,Ge,ae,ge):I.copyTexSubImage2D(Pe,B,Re,ot,ft+Pi,Ce,Ge,ae,ge);ce.bindFramebuffer(I.READ_FRAMEBUFFER,null),ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else mt?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(Pe,B,Re,ot,ft,ae,ge,Ee,rn,lt,pt.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(Pe,B,Re,ot,ft,ae,ge,Ee,rn,pt.data):I.texSubImage3D(Pe,B,Re,ot,ft,ae,ge,Ee,rn,lt,pt):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,B,Re,ot,ae,ge,rn,lt,pt.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,B,Re,ot,pt.width,pt.height,rn,pt.data):I.texSubImage2D(I.TEXTURE_2D,B,Re,ot,ae,ge,rn,lt,pt);I.pixelStorei(I.UNPACK_ROW_LENGTH,ui),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ct),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Un),I.pixelStorei(I.UNPACK_SKIP_ROWS,ir),I.pixelStorei(I.UNPACK_SKIP_IMAGES,un),B===0&&O.generateMipmaps&&I.generateMipmap(Pe),ce.unbindTexture()},this.copyTextureToTexture3D=function(T,O,X=null,Y=null,B=0){return T.isTexture!==!0&&(_r("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,Y=arguments[1]||null,T=arguments[2],O=arguments[3],B=arguments[4]||0),_r('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,X,Y,B)},this.initRenderTarget=function(T){xe.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),ce.unbindTexture()},this.resetState=function(){w=0,A=0,C=null,ce.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class Vs{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new q(e),this.density=t}clone(){return new Vs(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Aa{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new q(e),this.near=t,this.far=n}clone(){return new Aa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Gs extends tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Rr{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gr,this.updateRanges=[],this.version=0,this.uuid=on()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new E;class Si{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Kt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Kt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Kt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Kt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Kt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Je(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Si(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Oc extends Rt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ws;const Lr=new E,Xs=new E,Ys=new E,qs=new j,Pr=new j,Vd=new De,Ea=new E,Ir=new E,Ca=new E,Gd=new j,Bc=new j,Wd=new j;class Xd extends tt{constructor(e=new Oc){if(super(),this.isSprite=!0,this.type="Sprite",Ws===void 0){Ws=new He;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Rr(t,5);Ws.setIndex([0,1,2,0,2,3]),Ws.setAttribute("position",new Si(n,3,0,!1)),Ws.setAttribute("uv",new Si(n,2,3,!1))}this.geometry=Ws,this.material=e,this.center=new j(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xs.setFromMatrixScale(this.matrixWorld),Vd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ys.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xs.multiplyScalar(-Ys.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const r=this.center;Ra(Ea.set(-.5,-.5,0),Ys,r,Xs,i,s),Ra(Ir.set(.5,-.5,0),Ys,r,Xs,i,s),Ra(Ca.set(.5,.5,0),Ys,r,Xs,i,s),Gd.set(0,0),Bc.set(1,0),Wd.set(1,1);let a=e.ray.intersectTriangle(Ea,Ir,Ca,!1,Lr);if(a===null&&(Ra(Ir.set(-.5,.5,0),Ys,r,Xs,i,s),Bc.set(0,1),a=e.ray.intersectTriangle(Ea,Ca,Ir,!1,Lr),a===null))return;const l=e.ray.origin.distanceTo(Lr);l<e.near||l>e.far||t.push({distance:l,point:Lr.clone(),uv:en.getInterpolation(Lr,Ea,Ir,Ca,Gd,Bc,Wd,new j),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ra(o,e,t,n,i,s){qs.subVectors(o,t).addScalar(.5).multiply(n),i!==void 0?(Pr.x=s*qs.x-i*qs.y,Pr.y=i*qs.x+s*qs.y):Pr.copy(qs),o.copy(e),o.x+=Pr.x,o.y+=Pr.y,o.applyMatrix4(Vd)}const La=new E,Yd=new E;class qd extends tt{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){La.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(La);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){La.setFromMatrixPosition(e.matrixWorld),Yd.setFromMatrixPosition(this.matrixWorld);const n=La.distanceTo(Yd)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let r=t[i].distance;if(t[i].object.visible&&(r-=r*t[i].hysteresis),n>=r)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const r=n[i];t.object.levels.push({object:r.object.uuid,distance:r.distance,hysteresis:r.hysteresis})}return t}}const Zd=new E,Kd=new st,$d=new st,Wx=new E,jd=new De,Pa=new E,kc=new Nt,Jd=new De,zc=new Gi;class Hc extends Ne{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=kl,this.bindMatrix=new De,this.bindMatrixInverse=new De,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ct),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Pa),this.boundingBox.expandByPoint(Pa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Nt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Pa),this.boundingSphere.expandByPoint(Pa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kc.copy(this.boundingSphere),kc.applyMatrix4(i),e.ray.intersectsSphere(kc)!==!1&&(Jd.copy(i).invert(),zc.copy(e.ray).applyMatrix4(Jd),!(this.boundingBox!==null&&zc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,zc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new st,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===kl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Su?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Kd.fromBufferAttribute(i.attributes.skinIndex,e),$d.fromBufferAttribute(i.attributes.skinWeight,e),Zd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const r=$d.getComponent(s);if(r!==0){const a=Kd.getComponent(s);jd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Wx.copy(Zd).applyMatrix4(jd),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Ia extends tt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class yn extends gt{constructor(e=null,t=1,n=1,i,s,r,a,l,c=vt,h=vt,u,d){super(null,r,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qd=new De,Xx=new De;class Dr{constructor(e=[],t=[]){this.uuid=on(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new De)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new De;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){const a=e[s]?e[s].matrixWorld:Xx;Qd.multiplyMatrices(a,t[s]),Qd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Dr(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new yn(t,e,e,Tt,Jt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let r=t[s];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new Ia),this.bones.push(r),this.boneInverses.push(new De().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const r=t[i];e.bones.push(r.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class $i extends Je{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zs=new De,ef=new De,Da=[],tf=new Ct,Yx=new De,Ur=new Ne,Nr=new Nt;class Vc extends Ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $i(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Yx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ct),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zs),tf.copy(e.boundingBox).applyMatrix4(Zs),this.boundingBox.union(tf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zs),Nr.copy(e.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(Nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[r+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ur.geometry=this.geometry,Ur.material=this.material,Ur.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nr.copy(this.boundingSphere),Nr.applyMatrix4(n),e.ray.intersectsSphere(Nr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Zs),ef.multiplyMatrices(n,Zs),Ur.matrixWorld=ef,Ur.raycast(e,Da);for(let r=0,a=Da.length;r<a;r++){const l=Da[r];l.instanceId=s,l.object=this,t.push(l)}Da.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new $i(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new yn(new Float32Array(i*this.count),i,this.count,Mo,Jt));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const a=this.geometry.morphTargetsRelative?1:1-r,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function Gc(o,e){return o-e}function qx(o,e){return o.z-e.z}function Zx(o,e){return e.z-o.z}class Kx{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,r=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const a=s[this.index];r.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}const nn=new De,$x=new q(1,1,1),Wc=new Er,Ua=new Ct,ji=new Nt,Fr=new E,nf=new E,jx=new E,Xc=new Kx,Gt=new Ne,Na=[];function Jx(o,e,t=0){const n=e.itemSize;if(o.isInterleavedBufferAttribute||o.array.constructor!==e.array.constructor){const i=o.count;for(let s=0;s<i;s++)for(let r=0;r<n;r++)e.setComponent(s+t,r,o.getComponent(s,r))}else e.array.set(o.array,t*n);e.needsUpdate=!0}function Ji(o,e){if(o.constructor!==e.constructor){const t=Math.min(o.length,e.length);for(let n=0;n<t;n++)e[n]=o[n]}else{const t=Math.min(o.length,e.length);e.set(new o.constructor(o.buffer,0,t))}}class sf extends Ne{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(e,t,n=t*2,i){super(new He,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new yn(t,e,e,Tt,Jt);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new yn(t,e,e,ar,qn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new yn(t,e,e,Tt,Jt);n.colorSpace=$e.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const r=e.getAttribute(s),{array:a,itemSize:l,normalized:c}=r,h=new a.constructor(n*l),u=new Je(h,l,c);t.setAttribute(s,u)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Je(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ct);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,nn),this.getBoundingBoxAt(s,Ua).applyMatrix4(nn),e.union(Ua)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,nn),this.getBoundingSphereAt(s,ji).applyMatrix4(nn),e.union(ji)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Gc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;nn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const r=this._colorsTexture;return r&&($x.toArray(r.image.data,i*4),r.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const r=e.getIndex();if(r!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?r.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Gc),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),r=t.getIndex(),a=this._geometryInfo[e];if(i&&r.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(const h in n.attributes){const u=t.getAttribute(h),d=n.getAttribute(h);Jx(u,d,l);const f=u.itemSize;for(let p=u.count,v=c;p<v;p++){const g=l+p;for(let m=0;m<f;m++)d.setComponent(g,m,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const h=a.indexStart,u=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let d=0;d<r.count;d++)s.setX(h+d,l+r.getX(d));for(let d=r.count,f=u;d<f;d++)s.setX(h+d,l);s.needsUpdate=!0,s.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?this:(t[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this)}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((r,a)=>a).sort((r,a)=>n[r].vertexStart-n[a].vertexStart),s=this.geometry;for(let r=0,a=n.length;r<a;r++){const l=i[r],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:h,vertexStart:u,reservedIndexCount:d}=c,f=s.index,p=f.array,v=e-u;for(let g=h;g<h+d;g++)p[g]=p[g]+v;f.array.copyWithin(t,h,h+d),f.addUpdateRange(t,d),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:h,reservedVertexCount:u}=c,d=s.attributes;for(const f in d){const p=d[f],{array:v,itemSize:g}=p;v.copyWithin(e*g,h*g,(h+u)*g),p.addUpdateRange(e*g,u*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart,this._nextIndexStart=s.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new Ct,r=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;r&&(h=r.getX(h)),s.expandByPoint(Fr.fromBufferAttribute(a,h))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new Nt;this.getBoundingBoxAt(e,Ua),Ua.getCenter(s.center);const r=n.index,a=n.attributes.position;let l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;r&&(u=r.getX(u)),Fr.fromBufferAttribute(a,u),l=Math.max(l,s.center.distanceToSquared(Fr))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture,s=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?this:(t.toArray(s,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?null:t.fromArray(i,e*16)}setColorAt(e,t){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,s=this._instanceInfo;return e>=s.length||s[e].active===!1?this:(t.toArray(i,e*4),n.needsUpdate=!0,this)}getColorAt(e,t){const n=this._colorsTexture.image.data,i=this._instanceInfo;return e>=i.length||i[e].active===!1?null:t.fromArray(n,e*4)}setVisibleAt(e,t){const n=this._instanceInfo;return e>=n.length||n[e].active===!1||n[e].visible===t?this:(n[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?!1:t[e].visible}setGeometryIdAt(e,t){const n=this._instanceInfo,i=this._geometryInfo;return e>=n.length||n[e].active===!1||t>=i.length||i[t].active===!1?null:(n[e].geometryIndex=t,this)}getGeometryIdAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?-1:t[e].geometryIndex}getGeometryRangeAt(e,t={}){if(e<0||e>=this._geometryCount)return null;const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Gc);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);Ji(this._multiDrawCounts,i),Ji(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const r=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;r.dispose(),this._initIndirectTexture(),Ji(r.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),Ji(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Ji(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new He,this._initializeGeometry(s));const r=this.geometry;s.index&&Ji(s.index.array,r.index.array);for(const a in s.attributes)Ji(s.attributes[a].array,r.attributes[a].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,r=this.geometry;Gt.material=this.material,Gt.geometry.index=r.index,Gt.geometry.attributes=r.attributes,Gt.geometry.boundingBox===null&&(Gt.geometry.boundingBox=new Ct),Gt.geometry.boundingSphere===null&&(Gt.geometry.boundingSphere=new Nt);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;const c=n[a].geometryIndex,h=i[c];Gt.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Gt.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,Gt.geometry.boundingBox),this.getBoundingSphereAt(c,Gt.geometry.boundingSphere),Gt.raycast(e,Na);for(let u=0,d=Na.length;u<d;u++){const f=Na[u];f.object=this,f.batchId=a,t.push(f)}Na.length=0}Gt.material=null,Gt.geometry.index=null,Gt.geometry.attributes={},Gt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const r=i.getIndex(),a=r===null?1:r.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,p=f.image.data;d&&(nn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Wc.setFromProjectionMatrix(nn,e.coordinateSystem));let v=0;if(this.sortObjects){nn.copy(this.matrixWorld).invert(),Fr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(nn),nf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(nn);for(let _=0,x=l.length;_<x;_++)if(l[_].visible&&l[_].active){const y=l[_].geometryIndex;this.getMatrixAt(_,nn),this.getBoundingSphereAt(y,ji).applyMatrix4(nn);let L=!1;if(d&&(L=!Wc.intersectsSphere(ji)),!L){const w=u[y],A=jx.subVectors(ji.center,Fr).dot(nf);Xc.push(w.start,w.count,A,_)}}const g=Xc.list,m=this.customSort;m===null?g.sort(s.transparent?Zx:qx):m.call(this,g,n);for(let _=0,x=g.length;_<x;_++){const y=g[_];c[v]=y.start*a,h[v]=y.count,p[v]=y.index,v++}Xc.reset()}else for(let g=0,m=l.length;g<m;g++)if(l[g].visible&&l[g].active){const _=l[g].geometryIndex;let x=!1;if(d&&(this.getMatrixAt(g,nn),this.getBoundingSphereAt(_,ji).applyMatrix4(nn),x=!Wc.intersectsSphere(ji)),!x){const y=u[_];c[v]=y.start*a,h[v]=y.count,p[v]=g,v++}}f.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,r){this.onBeforeRender(e,null,i,s,r)}}class Wt extends Rt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new q(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Fa=new E,Oa=new E,rf=new De,Or=new Gi,Ba=new Nt,Yc=new E,of=new E;class ri extends tt{constructor(e=new He,t=new Wt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Fa.fromBufferAttribute(t,i-1),Oa.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Fa.distanceTo(Oa);e.setAttribute("lineDistance",new we(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ba.copy(n.boundingSphere),Ba.applyMatrix4(i),Ba.radius+=s,e.ray.intersectsSphere(Ba)===!1)return;rf.copy(i).invert(),Or.copy(e.ray).applyMatrix4(rf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=h.getX(v),_=h.getX(v+1),x=ka(this,e,Or,l,m,_);x&&t.push(x)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=ka(this,e,Or,l,v,g);m&&t.push(m)}}else{const f=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=ka(this,e,Or,l,v,v+1);m&&t.push(m)}if(this.isLineLoop){const v=ka(this,e,Or,l,p-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ka(o,e,t,n,i,s){const r=o.geometry.attributes.position;if(Fa.fromBufferAttribute(r,i),Oa.fromBufferAttribute(r,s),t.distanceSqToSegment(Fa,Oa,Yc,of)>n)return;Yc.applyMatrix4(o.matrixWorld);const l=e.ray.origin.distanceTo(Yc);if(!(l<e.near||l>e.far))return{distance:l,point:of.clone().applyMatrix4(o.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:o}}const af=new E,lf=new E;class Ln extends ri{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)af.fromBufferAttribute(t,i),lf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+af.distanceTo(lf);e.setAttribute("lineDistance",new we(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class qc extends ri{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Br extends Rt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const cf=new De,Zc=new Gi,za=new Nt,Ha=new E;class Va extends tt{constructor(e=new He,t=new Br){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(i),za.radius+=s,e.ray.intersectsSphere(za)===!1)return;cf.copy(i).invert(),Zc.copy(e.ray).applyMatrix4(cf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let p=d,v=f;p<v;p++){const g=c.getX(p);Ha.fromBufferAttribute(u,g),hf(Ha,g,l,i,e,t,this)}}else{const d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let p=d,v=f;p<v;p++)Ha.fromBufferAttribute(u,p),hf(Ha,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function hf(o,e,t,n,i,s,r){const a=Zc.distanceSqToPoint(o);if(a<t){const l=new E;Zc.closestPointToPoint(o,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class Qx extends gt{constructor(e,t,n,i,s,r,a,l,c){super(e,t,n,i,s,r,a,l,c),this.isVideoTexture=!0,this.minFilter=r!==void 0?r:at,this.magFilter=s!==void 0?s:at,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class e_ extends gt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=vt,this.minFilter=vt,this.generateMipmaps=!1,this.needsUpdate=!0}}class Ga extends gt{constructor(e,t,n,i,s,r,a,l,c,h,u,d){super(null,r,a,l,c,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class t_ extends Ga{constructor(e,t,n,i,s,r){super(e,t,n,s,r),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Zt,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class n_ extends Ga{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Yn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class uf extends gt{constructor(e,t,n,i,s,r,a,l,c){super(e,t,n,i,s,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let r;t?r=t:r=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-r,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(r-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const r=this.getPoint(i),a=this.getPoint(s),l=t||(r.isVector2?new j:new E);return l.copy(a).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new E,i=[],s=[],r=[],a=new E,l=new De;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new E)}s[0]=new E,r[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),r[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(_t(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,p))}r[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(_t(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),r[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Wa extends Pn{constructor(e=0,t=0,n=1,i=1,s=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new j){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(r?s=0:s=i),this.aClockwise===!0&&!r&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class df extends Wa{constructor(e,t,n,i,s,r){super(e,t,n,n,i,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Kc(){let o=0,e=0,t=0,n=0;function i(s,r,a,l){o=s,e=a,t=-3*s+3*r-2*a-l,n=2*s-2*r+a+l}return{initCatmullRom:function(s,r,a,l,c){i(r,a,c*(a-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,a,l,c,h,u){let d=(r-s)/c-(a-s)/(c+h)+(a-r)/h,f=(a-r)/h-(l-r)/(h+u)+(l-a)/u;d*=h,f*=h,i(r,a,d,f)},calc:function(s){const r=s*s,a=r*s;return o+e*s+t*r+n*a}}}const Xa=new E,$c=new Kc,jc=new Kc,Jc=new Kc;class ff extends Pn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){const n=t,i=this.points,s=i.length,r=(s-(this.closed?0:1))*e;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Xa.subVectors(i[0],i[1]).add(i[0]),c=Xa);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Xa.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Xa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),$c.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,v,g),jc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,v,g),Jc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&($c.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),jc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Jc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set($c.calc(l),jc.calc(l),Jc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function pf(o,e,t,n,i){const s=(n-e)*.5,r=(i-t)*.5,a=o*o,l=o*a;return(2*t-2*n+s+r)*l+(-3*t+3*n-2*s-r)*a+s*o+t}function i_(o,e){const t=1-o;return t*t*e}function s_(o,e){return 2*(1-o)*o*e}function r_(o,e){return o*o*e}function kr(o,e,t,n){return i_(o,e)+s_(o,t)+r_(o,n)}function o_(o,e){const t=1-o;return t*t*t*e}function a_(o,e){const t=1-o;return 3*t*t*o*e}function l_(o,e){return 3*(1-o)*o*o*e}function c_(o,e){return o*o*o*e}function zr(o,e,t,n,i){return o_(o,e)+a_(o,t)+l_(o,n)+c_(o,i)}class Qc extends Pn{constructor(e=new j,t=new j,n=new j,i=new j){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new j){const n=t,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(zr(e,i.x,s.x,r.x,a.x),zr(e,i.y,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mf extends Pn{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){const n=t,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(zr(e,i.x,s.x,r.x,a.x),zr(e,i.y,s.y,r.y,a.y),zr(e,i.z,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class eh extends Pn{constructor(e=new j,t=new j){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new j){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new j){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gf extends Pn{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class th extends Pn{constructor(e=new j,t=new j,n=new j){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new j){const n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(kr(e,i.x,s.x,r.x),kr(e,i.y,s.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nh extends Pn{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){const n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(kr(e,i.x,s.x,r.x),kr(e,i.y,s.y,r.y),kr(e,i.z,s.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ih extends Pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new j){const n=t,i=this.points,s=(i.length-1)*e,r=Math.floor(s),a=s-r,l=i[r===0?r:r-1],c=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(pf(a,l.x,c.x,h.x,u.x),pf(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new j().fromArray(i))}return this}}var Ya=Object.freeze({__proto__:null,ArcCurve:df,CatmullRomCurve3:ff,CubicBezierCurve:Qc,CubicBezierCurve3:mf,EllipseCurve:Wa,LineCurve:eh,LineCurve3:gf,QuadraticBezierCurve:th,QuadraticBezierCurve3:nh,SplineCurve:ih});class vf extends Pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ya[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const r=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-r/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const r=s[i],a=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Ya[i.type]().fromJSON(i))}return this}}class Hr extends vf{constructor(e){super(),this.type="Path",this.currentPoint=new j,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new eh(this.currentPoint.clone(),new j(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new th(this.currentPoint.clone(),new j(e,t),new j(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,r){const a=new Qc(this.currentPoint.clone(),new j(e,t),new j(n,i),new j(s,r));return this.curves.push(a),this.currentPoint.set(s,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new ih(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,r){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,s,r),this}absarc(e,t,n,i,s,r){return this.absellipse(e,t,n,n,i,s,r),this}ellipse(e,t,n,i,s,r,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,r,a,l),this}absellipse(e,t,n,i,s,r,a,l){const c=new Wa(e,t,n,i,s,r,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Vr extends He{constructor(e=[new j(0,-.5),new j(.5,0),new j(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=_t(i,0,Math.PI*2);const s=[],r=[],a=[],l=[],c=[],h=1/t,u=new E,d=new j,f=new E,p=new E,v=new E;let g=0,m=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:g=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(p)}for(let _=0;_<=t;_++){const x=n+_*h*i,y=Math.sin(x),L=Math.cos(x);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*y,u.y=e[w].y,u.z=e[w].x*L,r.push(u.x,u.y,u.z),d.x=_/t,d.y=w/(e.length-1),a.push(d.x,d.y);const A=l[3*w+0]*y,C=l[3*w+1],S=l[3*w+0]*L;c.push(A,C,S)}}for(let _=0;_<t;_++)for(let x=0;x<e.length-1;x++){const y=x+_*e.length,L=y,w=y+e.length,A=y+e.length+1,C=y+1;s.push(L,w,C),s.push(A,C,w)}this.setIndex(s),this.setAttribute("position",new we(r,3)),this.setAttribute("uv",new we(a,2)),this.setAttribute("normal",new we(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vr(e.points,e.segments,e.phiStart,e.phiLength)}}class qa extends Vr{constructor(e=1,t=1,n=4,i=8){const s=new Hr;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new qa(e.radius,e.length,e.capSegments,e.radialSegments)}}class Za extends He{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],r=[],a=[],l=[],c=new E,h=new j;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(r[d]/e+1)/2,h.y=(r[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new we(r,3)),this.setAttribute("normal",new we(a,3)),this.setAttribute("uv",new we(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Za(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class bi extends He{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const v=[],g=n/2;let m=0;_(),r===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new we(u,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(f,2));function _(){const y=new E,L=new E;let w=0;const A=(t-e)/n;for(let C=0;C<=s;C++){const S=[],M=C/s,P=M*(t-e)+e;for(let H=0;H<=i;H++){const k=H/i,z=k*l+a,V=Math.sin(z),U=Math.cos(z);L.x=P*V,L.y=-M*n+g,L.z=P*U,u.push(L.x,L.y,L.z),y.set(V,A,U).normalize(),d.push(y.x,y.y,y.z),f.push(k,1-M),S.push(p++)}v.push(S)}for(let C=0;C<i;C++)for(let S=0;S<s;S++){const M=v[S][C],P=v[S+1][C],H=v[S+1][C+1],k=v[S][C+1];(e>0||S!==0)&&(h.push(M,P,k),w+=3),(t>0||S!==s-1)&&(h.push(P,H,k),w+=3)}c.addGroup(m,w,0),m+=w}function x(y){const L=p,w=new j,A=new E;let C=0;const S=y===!0?e:t,M=y===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),p++;const P=p;for(let H=0;H<=i;H++){const z=H/i*l+a,V=Math.cos(z),U=Math.sin(z);A.x=S*U,A.y=g*M,A.z=S*V,u.push(A.x,A.y,A.z),d.push(0,M,0),w.x=V*.5+.5,w.y=U*.5*M+.5,f.push(w.x,w.y),p++}for(let H=0;H<i;H++){const k=L+H,z=P+H;y===!0?h.push(z,z+1,k):h.push(z+1,z,k),C+=3}c.addGroup(m,C,y===!0?1:2),m+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ka extends bi{constructor(e=1,t=1,n=32,i=1,s=!1,r=0,a=Math.PI*2){super(0,e,t,n,i,s,r,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(e){return new Ka(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wi extends He{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],r=[];a(i),c(n),h(),this.setAttribute("position",new we(s,3)),this.setAttribute("normal",new we(s.slice(),3)),this.setAttribute("uv",new we(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const x=new E,y=new E,L=new E;for(let w=0;w<t.length;w+=3)f(t[w+0],x),f(t[w+1],y),f(t[w+2],L),l(x,y,L,_)}function l(_,x,y,L){const w=L+1,A=[];for(let C=0;C<=w;C++){A[C]=[];const S=_.clone().lerp(y,C/w),M=x.clone().lerp(y,C/w),P=w-C;for(let H=0;H<=P;H++)H===0&&C===w?A[C][H]=S:A[C][H]=S.clone().lerp(M,H/P)}for(let C=0;C<w;C++)for(let S=0;S<2*(w-C)-1;S++){const M=Math.floor(S/2);S%2===0?(d(A[C][M+1]),d(A[C+1][M]),d(A[C][M])):(d(A[C][M+1]),d(A[C+1][M+1]),d(A[C+1][M]))}}function c(_){const x=new E;for(let y=0;y<s.length;y+=3)x.x=s[y+0],x.y=s[y+1],x.z=s[y+2],x.normalize().multiplyScalar(_),s[y+0]=x.x,s[y+1]=x.y,s[y+2]=x.z}function h(){const _=new E;for(let x=0;x<s.length;x+=3){_.x=s[x+0],_.y=s[x+1],_.z=s[x+2];const y=g(_)/2/Math.PI+.5,L=m(_)/Math.PI+.5;r.push(y,1-L)}p(),u()}function u(){for(let _=0;_<r.length;_+=6){const x=r[_+0],y=r[_+2],L=r[_+4],w=Math.max(x,y,L),A=Math.min(x,y,L);w>.9&&A<.1&&(x<.2&&(r[_+0]+=1),y<.2&&(r[_+2]+=1),L<.2&&(r[_+4]+=1))}}function d(_){s.push(_.x,_.y,_.z)}function f(_,x){const y=_*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function p(){const _=new E,x=new E,y=new E,L=new E,w=new j,A=new j,C=new j;for(let S=0,M=0;S<s.length;S+=9,M+=6){_.set(s[S+0],s[S+1],s[S+2]),x.set(s[S+3],s[S+4],s[S+5]),y.set(s[S+6],s[S+7],s[S+8]),w.set(r[M+0],r[M+1]),A.set(r[M+2],r[M+3]),C.set(r[M+4],r[M+5]),L.copy(_).add(x).add(y).divideScalar(3);const P=g(L);v(w,M+0,_,P),v(A,M+2,x,P),v(C,M+4,y,P)}}function v(_,x,y,L){L<0&&_.x===1&&(r[x]=_.x-1),y.x===0&&y.z===0&&(r[x]=L/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wi(e.vertices,e.indices,e.radius,e.details)}}class $a extends wi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $a(e.radius,e.detail)}}const ja=new E,Ja=new E,sh=new E,Qa=new en;class yf extends He{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(ki*t),r=e.getIndex(),a=e.getAttribute("position"),l=r?r.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){r?(c[0]=r.getX(p),c[1]=r.getX(p+1),c[2]=r.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:v,b:g,c:m}=Qa;if(v.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Qa.getNormal(sh),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let _=0;_<3;_++){const x=(_+1)%3,y=u[_],L=u[x],w=Qa[h[_]],A=Qa[h[x]],C=`${y}_${L}`,S=`${L}_${y}`;S in d&&d[S]?(sh.dot(d[S].normal)<=s&&(f.push(w.x,w.y,w.z),f.push(A.x,A.y,A.z)),d[S]=null):C in d||(d[C]={index0:c[_],index1:c[x],normal:sh.clone()})}}for(const p in d)if(d[p]){const{index0:v,index1:g}=d[p];ja.fromBufferAttribute(a,v),Ja.fromBufferAttribute(a,g),f.push(ja.x,ja.y,ja.z),f.push(Ja.x,Ja.y,Ja.z)}this.setAttribute("position",new we(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Qi extends Hr{constructor(e){super(e),this.uuid=on(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Hr().fromJSON(i))}return this}}const h_={triangulate:function(o,e,t=2){const n=e&&e.length,i=n?e[0]*t:o.length;let s=xf(o,0,i,t,!0);const r=[];if(!s||s.next===s.prev)return r;let a,l,c,h,u,d,f;if(n&&(s=m_(o,e,s,t)),o.length>80*t){a=c=o[0],l=h=o[1];for(let p=t;p<i;p+=t)u=o[p],d=o[p+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Gr(s,r,t,a,l,f,0),r}};function xf(o,e,t,n,i){let s,r;if(i===A_(o,e,t,n)>0)for(s=e;s<t;s+=n)r=Sf(s,o[s],o[s+1],r);else for(s=t-n;s>=e;s-=n)r=Sf(s,o[s],o[s+1],r);return r&&el(r,r.next)&&(Xr(r),r=r.next),r}function es(o,e){if(!o)return o;e||(e=o);let t=o,n;do if(n=!1,!t.steiner&&(el(t,t.next)||xt(t.prev,t,t.next)===0)){if(Xr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Gr(o,e,t,n,i,s,r){if(!o)return;!r&&s&&__(o,n,i,s);let a=o,l,c;for(;o.prev!==o.next;){if(l=o.prev,c=o.next,s?d_(o,n,i,s):u_(o)){e.push(l.i/t|0),e.push(o.i/t|0),e.push(c.i/t|0),Xr(o),o=c.next,a=c.next;continue}if(o=c,o===a){r?r===1?(o=f_(es(o),e,t),Gr(o,e,t,n,i,s,2)):r===2&&p_(o,e,t,n,i,s):Gr(es(o),e,t,n,i,s,1);break}}}function u_(o){const e=o.prev,t=o,n=o.next;if(xt(e,t,n)>=0)return!1;const i=e.x,s=t.x,r=n.x,a=e.y,l=t.y,c=n.y,h=i<s?i<r?i:r:s<r?s:r,u=a<l?a<c?a:c:l<c?l:c,d=i>s?i>r?i:r:s>r?s:r,f=a>l?a>c?a:c:l>c?l:c;let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Ks(i,a,s,l,r,c,p.x,p.y)&&xt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function d_(o,e,t,n){const i=o.prev,s=o,r=o.next;if(xt(i,s,r)>=0)return!1;const a=i.x,l=s.x,c=r.x,h=i.y,u=s.y,d=r.y,f=a<l?a<c?a:c:l<c?l:c,p=h<u?h<d?h:d:u<d?u:d,v=a>l?a>c?a:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,m=rh(f,p,e,t,n),_=rh(v,g,e,t,n);let x=o.prevZ,y=o.nextZ;for(;x&&x.z>=m&&y&&y.z<=_;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==r&&Ks(a,h,l,u,c,d,x.x,x.y)&&xt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==r&&Ks(a,h,l,u,c,d,y.x,y.y)&&xt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==r&&Ks(a,h,l,u,c,d,x.x,x.y)&&xt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=_;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==r&&Ks(a,h,l,u,c,d,y.x,y.y)&&xt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function f_(o,e,t){let n=o;do{const i=n.prev,s=n.next.next;!el(i,s)&&_f(i,n,n.next,s)&&Wr(i,s)&&Wr(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Xr(n),Xr(n.next),n=o=s),n=n.next}while(n!==o);return es(n)}function p_(o,e,t,n,i,s){let r=o;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&b_(r,a)){let l=Mf(r,a);r=es(r,r.next),l=es(l,l.next),Gr(r,e,t,n,i,s,0),Gr(l,e,t,n,i,s,0);return}a=a.next}r=r.next}while(r!==o)}function m_(o,e,t,n){const i=[];let s,r,a,l,c;for(s=0,r=e.length;s<r;s++)a=e[s]*n,l=s<r-1?e[s+1]*n:o.length,c=xf(o,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(S_(c));for(i.sort(g_),s=0;s<i.length;s++)t=v_(i[s],t);return t}function g_(o,e){return o.x-e.x}function v_(o,e){const t=y_(o,e);if(!t)return e;const n=Mf(t,o);return es(n,n.next),es(t,t.next)}function y_(o,e){let t=e,n=-1/0,i;const s=o.x,r=o.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&Ks(r<c?s:n,r,l,c,r<c?n:s,r,t.x,t.y)&&(u=Math.abs(r-t.y)/(s-t.x),Wr(t,o)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&x_(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function x_(o,e){return xt(o.prev,o,e.prev)<0&&xt(e.next,o,o.next)<0}function __(o,e,t,n){let i=o;do i.z===0&&(i.z=rh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==o);i.prevZ.nextZ=null,i.prevZ=null,M_(i)}function M_(o){let e,t,n,i,s,r,a,l,c=1;do{for(t=o,o=null,s=null,r=0;t;){for(r++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:o=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(r>1);return o}function rh(o,e,t,n,i){return o=(o-t)*i|0,e=(e-n)*i|0,o=(o|o<<8)&16711935,o=(o|o<<4)&252645135,o=(o|o<<2)&858993459,o=(o|o<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,o|e<<1}function S_(o){let e=o,t=o;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==o);return t}function Ks(o,e,t,n,i,s,r,a){return(i-r)*(e-a)>=(o-r)*(s-a)&&(o-r)*(n-a)>=(t-r)*(e-a)&&(t-r)*(s-a)>=(i-r)*(n-a)}function b_(o,e){return o.next.i!==e.i&&o.prev.i!==e.i&&!w_(o,e)&&(Wr(o,e)&&Wr(e,o)&&T_(o,e)&&(xt(o.prev,o,e.prev)||xt(o,e.prev,e))||el(o,e)&&xt(o.prev,o,o.next)>0&&xt(e.prev,e,e.next)>0)}function xt(o,e,t){return(e.y-o.y)*(t.x-e.x)-(e.x-o.x)*(t.y-e.y)}function el(o,e){return o.x===e.x&&o.y===e.y}function _f(o,e,t,n){const i=nl(xt(o,e,t)),s=nl(xt(o,e,n)),r=nl(xt(t,n,o)),a=nl(xt(t,n,e));return!!(i!==s&&r!==a||i===0&&tl(o,t,e)||s===0&&tl(o,n,e)||r===0&&tl(t,o,n)||a===0&&tl(t,e,n))}function tl(o,e,t){return e.x<=Math.max(o.x,t.x)&&e.x>=Math.min(o.x,t.x)&&e.y<=Math.max(o.y,t.y)&&e.y>=Math.min(o.y,t.y)}function nl(o){return o>0?1:o<0?-1:0}function w_(o,e){let t=o;do{if(t.i!==o.i&&t.next.i!==o.i&&t.i!==e.i&&t.next.i!==e.i&&_f(t,t.next,o,e))return!0;t=t.next}while(t!==o);return!1}function Wr(o,e){return xt(o.prev,o,o.next)<0?xt(o,e,o.next)>=0&&xt(o,o.prev,e)>=0:xt(o,e,o.prev)<0||xt(o,o.next,e)<0}function T_(o,e){let t=o,n=!1;const i=(o.x+e.x)/2,s=(o.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==o);return n}function Mf(o,e){const t=new oh(o.i,o.x,o.y),n=new oh(e.i,e.x,e.y),i=o.next,s=e.prev;return o.next=e,e.prev=o,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Sf(o,e,t,n){const i=new oh(o,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Xr(o){o.next.prev=o.prev,o.prev.next=o.next,o.prevZ&&(o.prevZ.nextZ=o.nextZ),o.nextZ&&(o.nextZ.prevZ=o.prevZ)}function oh(o,e,t){this.i=o,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function A_(o,e,t,n){let i=0;for(let s=e,r=t-n;s<t;s+=n)i+=(o[r]-o[s])*(o[s+1]+o[r+1]),r=s;return i}class zn{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return zn.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];bf(e),wf(n,e);let r=e.length;t.forEach(bf);for(let l=0;l<t.length;l++)i.push(r),r+=t[l].length,wf(n,t[l]);const a=h_.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function bf(o){const e=o.length;e>2&&o[e-1].equals(o[0])&&o.pop()}function wf(o,e){for(let t=0;t<e.length;t++)o.push(e[t].x),o.push(e[t].y)}class il extends He{constructor(e=new Qi([new j(.5,.5),new j(-.5,.5),new j(-.5,-.5),new j(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];r(c)}this.setAttribute("position",new we(i,3)),this.setAttribute("uv",new we(s,2)),this.computeVertexNormals();function r(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:E_;let x,y=!1,L,w,A,C;m&&(x=m.getSpacedPoints(h),y=!0,d=!1,L=m.computeFrenetFrames(h,!1),w=new E,A=new E,C=new E),d||(g=0,f=0,p=0,v=0);const S=a.extractPoints(c);let M=S.shape;const P=S.holes;if(!zn.isClockWise(M)){M=M.reverse();for(let ne=0,oe=P.length;ne<oe;ne++){const I=P[ne];zn.isClockWise(I)&&(P[ne]=I.reverse())}}const k=zn.triangulateShape(M,P),z=M;for(let ne=0,oe=P.length;ne<oe;ne++){const I=P[ne];M=M.concat(I)}function V(ne,oe,I){return oe||console.error("THREE.ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(oe,I)}const U=M.length,K=k.length;function D(ne,oe,I){let Le,se,Me;const ce=ne.x-oe.x,Oe=ne.y-oe.y,xe=I.x-ne.x,R=I.y-ne.y,b=ce*ce+Oe*Oe,G=ce*R-Oe*xe;if(Math.abs(G)>Number.EPSILON){const J=Math.sqrt(b),ie=Math.sqrt(xe*xe+R*R),Q=oe.x-Oe/J,Ae=oe.y+ce/J,fe=I.x-R/ie,_e=I.y+xe/ie,Qe=((fe-Q)*R-(_e-Ae)*xe)/(ce*R-Oe*xe);Le=Q+ce*Qe-ne.x,se=Ae+Oe*Qe-ne.y;const re=Le*Le+se*se;if(re<=2)return new j(Le,se);Me=Math.sqrt(re/2)}else{let J=!1;ce>Number.EPSILON?xe>Number.EPSILON&&(J=!0):ce<-Number.EPSILON?xe<-Number.EPSILON&&(J=!0):Math.sign(Oe)===Math.sign(R)&&(J=!0),J?(Le=-Oe,se=ce,Me=Math.sqrt(b)):(Le=ce,se=Oe,Me=Math.sqrt(b/2))}return new j(Le/Me,se/Me)}const ee=[];for(let ne=0,oe=z.length,I=oe-1,Le=ne+1;ne<oe;ne++,I++,Le++)I===oe&&(I=0),Le===oe&&(Le=0),ee[ne]=D(z[ne],z[I],z[Le]);const he=[];let de,Ie=ee.concat();for(let ne=0,oe=P.length;ne<oe;ne++){const I=P[ne];de=[];for(let Le=0,se=I.length,Me=se-1,ce=Le+1;Le<se;Le++,Me++,ce++)Me===se&&(Me=0),ce===se&&(ce=0),de[Le]=D(I[Le],I[Me],I[ce]);he.push(de),Ie=Ie.concat(de)}for(let ne=0;ne<g;ne++){const oe=ne/g,I=f*Math.cos(oe*Math.PI/2),Le=p*Math.sin(oe*Math.PI/2)+v;for(let se=0,Me=z.length;se<Me;se++){const ce=V(z[se],ee[se],Le);le(ce.x,ce.y,-I)}for(let se=0,Me=P.length;se<Me;se++){const ce=P[se];de=he[se];for(let Oe=0,xe=ce.length;Oe<xe;Oe++){const R=V(ce[Oe],de[Oe],Le);le(R.x,R.y,-I)}}}const Fe=p+v;for(let ne=0;ne<U;ne++){const oe=d?V(M[ne],Ie[ne],Fe):M[ne];y?(A.copy(L.normals[0]).multiplyScalar(oe.x),w.copy(L.binormals[0]).multiplyScalar(oe.y),C.copy(x[0]).add(A).add(w),le(C.x,C.y,C.z)):le(oe.x,oe.y,0)}for(let ne=1;ne<=h;ne++)for(let oe=0;oe<U;oe++){const I=d?V(M[oe],Ie[oe],Fe):M[oe];y?(A.copy(L.normals[ne]).multiplyScalar(I.x),w.copy(L.binormals[ne]).multiplyScalar(I.y),C.copy(x[ne]).add(A).add(w),le(C.x,C.y,C.z)):le(I.x,I.y,u/h*ne)}for(let ne=g-1;ne>=0;ne--){const oe=ne/g,I=f*Math.cos(oe*Math.PI/2),Le=p*Math.sin(oe*Math.PI/2)+v;for(let se=0,Me=z.length;se<Me;se++){const ce=V(z[se],ee[se],Le);le(ce.x,ce.y,u+I)}for(let se=0,Me=P.length;se<Me;se++){const ce=P[se];de=he[se];for(let Oe=0,xe=ce.length;Oe<xe;Oe++){const R=V(ce[Oe],de[Oe],Le);y?le(R.x,R.y+x[h-1].y,x[h-1].x+I):le(R.x,R.y,u+I)}}}W(),$();function W(){const ne=i.length/3;if(d){let oe=0,I=U*oe;for(let Le=0;Le<K;Le++){const se=k[Le];Ue(se[2]+I,se[1]+I,se[0]+I)}oe=h+g*2,I=U*oe;for(let Le=0;Le<K;Le++){const se=k[Le];Ue(se[0]+I,se[1]+I,se[2]+I)}}else{for(let oe=0;oe<K;oe++){const I=k[oe];Ue(I[2],I[1],I[0])}for(let oe=0;oe<K;oe++){const I=k[oe];Ue(I[0]+U*h,I[1]+U*h,I[2]+U*h)}}n.addGroup(ne,i.length/3-ne,0)}function $(){const ne=i.length/3;let oe=0;Te(z,oe),oe+=z.length;for(let I=0,Le=P.length;I<Le;I++){const se=P[I];Te(se,oe),oe+=se.length}n.addGroup(ne,i.length/3-ne,1)}function Te(ne,oe){let I=ne.length;for(;--I>=0;){const Le=I;let se=I-1;se<0&&(se=ne.length-1);for(let Me=0,ce=h+g*2;Me<ce;Me++){const Oe=U*Me,xe=U*(Me+1),R=oe+Le+Oe,b=oe+se+Oe,G=oe+se+xe,J=oe+Le+xe;Ve(R,b,G,J)}}}function le(ne,oe,I){l.push(ne),l.push(oe),l.push(I)}function Ue(ne,oe,I){ke(ne),ke(oe),ke(I);const Le=i.length/3,se=_.generateTopUV(n,i,Le-3,Le-2,Le-1);rt(se[0]),rt(se[1]),rt(se[2])}function Ve(ne,oe,I,Le){ke(ne),ke(oe),ke(Le),ke(oe),ke(I),ke(Le);const se=i.length/3,Me=_.generateSideWallUV(n,i,se-6,se-3,se-2,se-1);rt(Me[0]),rt(Me[1]),rt(Me[3]),rt(Me[1]),rt(Me[2]),rt(Me[3])}function ke(ne){i.push(l[ne*3+0]),i.push(l[ne*3+1]),i.push(l[ne*3+2])}function rt(ne){s.push(ne.x),s.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return C_(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ya[i.type]().fromJSON(i)),new il(n,e.options)}}const E_={generateTopUV:function(o,e,t,n,i){const s=e[t*3],r=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new j(s,r),new j(a,l),new j(c,h)]},generateSideWallUV:function(o,e,t,n,i,s){const r=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],p=e[i*3+2],v=e[s*3],g=e[s*3+1],m=e[s*3+2];return Math.abs(a-h)<Math.abs(r-c)?[new j(r,1-l),new j(c,1-u),new j(d,1-p),new j(v,1-m)]:[new j(a,1-l),new j(h,1-u),new j(f,1-p),new j(g,1-m)]}};function C_(o,e,t){if(t.shapes=[],Array.isArray(o))for(let n=0,i=o.length;n<i;n++){const s=o[n];t.shapes.push(s.uuid)}else t.shapes.push(o.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class sl extends wi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new sl(e.radius,e.detail)}}class Yr extends wi{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Yr(e.radius,e.detail)}}class qr extends He{constructor(e=.5,t=1,n=32,i=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new E,p=new j;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=s+g/n*r;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const _=m+g,x=_,y=_+n+1,L=_+n+2,w=_+1;a.push(x,y,w),a.push(y,L,w)}}this.setIndex(a),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(c,3)),this.setAttribute("uv",new we(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class rl extends He{constructor(e=new Qi([new j(0,.5),new j(-.5,-.5),new j(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],r=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new we(i,3)),this.setAttribute("normal",new we(s,3)),this.setAttribute("uv",new we(r,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const p=d.holes;zn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const _=p[g];zn.isClockWise(_)===!0&&(p[g]=_.reverse())}const v=zn.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const _=p[g];f=f.concat(_)}for(let g=0,m=f.length;g<m;g++){const _=f[g];i.push(_.x,_.y,0),s.push(0,0,1),r.push(_.x,_.y)}for(let g=0,m=v.length;g<m;g++){const _=v[g],x=_[0]+u,y=_[1]+u,L=_[2]+u;n.push(x,y,L),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return R_(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const r=t[e.shapes[i]];n.push(r)}return new rl(n,e.curveSegments)}}function R_(o,e){if(e.shapes=[],Array.isArray(o))for(let t=0,n=o.length;t<n;t++){const i=o[t];e.shapes.push(i.uuid)}else e.shapes.push(o.uuid);return e}class Dt extends He{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const h=[],u=new E,d=new E,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const _=[],x=m/n;let y=0;m===0&&r===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let L=0;L<=t;L++){const w=L/t;u.x=-e*Math.cos(i+w*s)*Math.sin(r+x*a),u.y=e*Math.cos(r+x*a),u.z=e*Math.sin(i+w*s)*Math.sin(r+x*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(w+y,1-x),_.push(c++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<t;_++){const x=h[m][_+1],y=h[m][_],L=h[m+1][_],w=h[m+1][_+1];(m!==0||r>0)&&f.push(x,y,w),(m!==n-1||l<Math.PI)&&f.push(y,L,w)}this.setIndex(f),this.setAttribute("position",new we(p,3)),this.setAttribute("normal",new we(v,3)),this.setAttribute("uv",new we(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ol extends wi{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ol(e.radius,e.detail)}}class al extends He{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],l=[],c=[],h=new E,u=new E,d=new E;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(v),u.y=(e+t*Math.cos(g))*Math.sin(v),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,_=(i+1)*f+p;r.push(v,g,_),r.push(g,m,_)}this.setIndex(r),this.setAttribute("position",new we(a,3)),this.setAttribute("normal",new we(l,3)),this.setAttribute("uv",new we(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new al(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ll extends He{constructor(e=1,t=.4,n=64,i=8,s=2,r=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:r},n=Math.floor(n),i=Math.floor(i);const a=[],l=[],c=[],h=[],u=new E,d=new E,f=new E,p=new E,v=new E,g=new E,m=new E;for(let x=0;x<=n;++x){const y=x/n*s*Math.PI*2;_(y,s,r,e,f),_(y+.01,s,r,e,p),g.subVectors(p,f),m.addVectors(p,f),v.crossVectors(g,m),m.crossVectors(v,g),v.normalize(),m.normalize();for(let L=0;L<=i;++L){const w=L/i*Math.PI*2,A=-t*Math.cos(w),C=t*Math.sin(w);u.x=f.x+(A*m.x+C*v.x),u.y=f.y+(A*m.y+C*v.y),u.z=f.z+(A*m.z+C*v.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(x/n),h.push(L/i)}}for(let x=1;x<=n;x++)for(let y=1;y<=i;y++){const L=(i+1)*(x-1)+(y-1),w=(i+1)*x+(y-1),A=(i+1)*x+y,C=(i+1)*(x-1)+y;a.push(L,w,C),a.push(w,A,C)}this.setIndex(a),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(c,3)),this.setAttribute("uv",new we(h,2));function _(x,y,L,w,A){const C=Math.cos(x),S=Math.sin(x),M=L/y*x,P=Math.cos(M);A.x=w*(2+P)*.5*C,A.y=w*(2+P)*S*.5,A.z=w*Math.sin(M)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ll(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class cl extends He{constructor(e=new nh(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const r=e.computeFrenetFrames(t,s);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new E,l=new E,c=new j;let h=new E;const u=[],d=[],f=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new we(u,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(f,2));function v(){for(let x=0;x<t;x++)g(x);g(s===!1?t:0),_(),m()}function g(x){h=e.getPointAt(x/t,h);const y=r.normals[x],L=r.binormals[x];for(let w=0;w<=i;w++){const A=w/i*Math.PI*2,C=Math.sin(A),S=-Math.cos(A);l.x=S*y.x+C*L.x,l.y=S*y.y+C*L.y,l.z=S*y.z+C*L.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function m(){for(let x=1;x<=t;x++)for(let y=1;y<=i;y++){const L=(i+1)*(x-1)+(y-1),w=(i+1)*x+(y-1),A=(i+1)*x+y,C=(i+1)*(x-1)+y;p.push(L,w,C),p.push(w,A,C)}}function _(){for(let x=0;x<=t;x++)for(let y=0;y<=i;y++)c.x=x/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new cl(new Ya[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Tf extends He{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new E,s=new E;if(e.index!==null){const r=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,f=u.count;for(let p=d,v=d+f;p<v;p+=3)for(let g=0;g<3;g++){const m=a.getX(p+g),_=a.getX(p+(g+1)%3);i.fromBufferAttribute(r,m),s.fromBufferAttribute(r,_),Af(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const r=e.attributes.position;for(let a=0,l=r.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;i.fromBufferAttribute(r,h),s.fromBufferAttribute(r,u),Af(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new we(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Af(o,e,t){const n=`${o.x},${o.y},${o.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${o.x},${o.y},${o.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var Ef=Object.freeze({__proto__:null,BoxGeometry:vn,CapsuleGeometry:qa,CircleGeometry:Za,ConeGeometry:Ka,CylinderGeometry:bi,DodecahedronGeometry:$a,EdgesGeometry:yf,ExtrudeGeometry:il,IcosahedronGeometry:sl,LatheGeometry:Vr,OctahedronGeometry:Yr,PlaneGeometry:si,PolyhedronGeometry:wi,RingGeometry:qr,ShapeGeometry:rl,SphereGeometry:Dt,TetrahedronGeometry:ol,TorusGeometry:al,TorusKnotGeometry:ll,TubeGeometry:cl,WireframeGeometry:Tf});class Cf extends Rt{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new q(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Rf extends Ht{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class xn extends Rt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _n extends xn{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new j(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return _t(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new q(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new q(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new q(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Lf extends Rt{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new q(16777215),this.specular=new q(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=sr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Pf extends Rt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new q(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class hl extends Rt{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class If extends Rt{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=sr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Df extends Rt{static get type(){return"MeshMatcapMaterial"}constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new q(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Uf extends Wt{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function ts(o,e,t){return!o||!t&&o.constructor===e?o:typeof e.BYTES_PER_ELEMENT=="number"?new e(o):Array.prototype.slice.call(o)}function Nf(o){return ArrayBuffer.isView(o)&&!(o instanceof DataView)}function Ff(o){function e(i,s){return o[i]-o[s]}const t=o.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function ah(o,e,t){const n=o.length,i=new o.constructor(n);for(let s=0,r=0;r!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[r++]=o[a+l]}return i}function lh(o,e,t,n){let i=1,s=o[0];for(;s!==void 0&&s[n]===void 0;)s=o[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push.apply(t,r)),s=o[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=o[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=o[i++];while(s!==void 0)}function L_(o,e,t,n,i=30){const s=o.clone();s.name=e;const r=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*i;if(!(p<t||p>=n)){u.push(c.times[f]);for(let v=0;v<h;++v)d.push(c.values[f*h+v])}}u.length!==0&&(c.times=ts(u,c.times.constructor),c.values=ts(d,c.values.constructor),r.push(c))}s.tracks=r;let a=1/0;for(let l=0;l<s.tracks.length;++l)a>s.tracks[l].times[0]&&(a=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*a);return s.resetDuration(),s}function P_(o,e=0,t=o,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let r=0;r<i;++r){const a=t.tracks[r],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=o.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=a.times.length-1;let v;if(s<=a.times[0]){const m=h,_=u-h;v=a.values.slice(m,_)}else if(s>=a.times[p]){const m=p*u+h,_=m+u-h;v=a.values.slice(m,_)}else{const m=a.createInterpolant(),_=h,x=u-h;m.evaluate(s),v=m.resultBuffer.slice(_,x)}l==="quaternion"&&new Bt().fromArray(v).normalize().conjugate().toArray(v);const g=c.times.length;for(let m=0;m<g;++m){const _=m*f+d;if(l==="quaternion")Bt.multiplyQuaternionsFlat(c.values,_,v,0,c.values,_);else{const x=f-d*2;for(let y=0;y<x;++y)c.values[_+y]-=v[y]}}}return o.blendMode=Kl,o}const I_={convertArray:ts,isTypedArray:Nf,getKeyframeOrder:Ff,sortedArray:ah,flattenJSON:lh,subclip:L_,makeClipAdditive:P_};class $s{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let r;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}r=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}r=n,n=0;break n}break e}for(;n<r;){const a=n+r>>>1;e<t[a]?r=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Of extends $s{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fi,endingEnd:Fi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,r=e+1,a=i[s],l=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case Oi:s=e,a=2*t-n;break;case pr:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Oi:r=e,l=2*n-t;break;case pr:r=1,l=n+i[1]-i[0];break;default:r=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,g=v*p,m=-d*g+2*d*v-d*p,_=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*p+1,x=(-1-f)*g+(1.5+f)*v+.5*p,y=f*g-f*v;for(let L=0;L!==a;++L)s[L]=m*r[h+L]+_*r[c+L]+x*r[l+L]+y*r[u+L];return s}}class ch extends $s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=r[c+d]*u+r[l+d]*h;return s}}class Bf extends $s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class In{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ts(t,this.TimeBufferType),this.values=ts(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ts(e.times,Array),values:ts(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Bf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ch(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Of(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case _s:t=this.InterpolantFactoryMethodDiscrete;break;case Ms:t=this.InterpolantFactoryMethodLinear;break;case jo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _s;case this.InterpolantFactoryMethodLinear:return Ms;case this.InterpolantFactoryMethodSmooth:return jo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);const a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,r),e=!1;break}r=l}if(i!==void 0&&Nf(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===jo,s=e.length-1;let r=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const v=t[u+p];if(v!==t[d+p]||v!==t[f+p]){l=!0;break}}}if(l){if(a!==r){e[r]=e[a];const u=a*n,d=r*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++r}}if(s>0){e[r]=e[s];for(let a=s*n,l=r*n,c=0;c!==n;++c)t[l+c]=t[a+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}In.prototype.TimeBufferType=Float32Array,In.prototype.ValueBufferType=Float32Array,In.prototype.DefaultInterpolation=Ms;class ns extends In{constructor(e,t,n){super(e,t,n)}}ns.prototype.ValueTypeName="bool",ns.prototype.ValueBufferType=Array,ns.prototype.DefaultInterpolation=_s,ns.prototype.InterpolantFactoryMethodLinear=void 0,ns.prototype.InterpolantFactoryMethodSmooth=void 0;class hh extends In{}hh.prototype.ValueTypeName="color";class is extends In{}is.prototype.ValueTypeName="number";class kf extends $s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Bt.slerpFlat(s,0,r,c-a,r,c,l);return s}}class ss extends In{InterpolantFactoryMethodLinear(e){return new kf(this.times,this.values,this.getValueSize(),e)}}ss.prototype.ValueTypeName="quaternion",ss.prototype.InterpolantFactoryMethodSmooth=void 0;class rs extends In{constructor(e,t,n){super(e,t,n)}}rs.prototype.ValueTypeName="string",rs.prototype.ValueBufferType=Array,rs.prototype.DefaultInterpolation=_s,rs.prototype.InterpolantFactoryMethodLinear=void 0,rs.prototype.InterpolantFactoryMethodSmooth=void 0;class os extends In{}os.prototype.ValueTypeName="vector";class js{constructor(e="",t=-1,n=[],i=Jo){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=on(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,a=n.length;r!==a;++r)t.push(U_(n[r]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,r=n.length;s!==r;++s)t.push(In.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,r=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=Ff(l);l=ah(l,1,h),c=ah(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),r.push(new is(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const r=[];for(const a in i)r.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return r}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,v){if(f.length!==0){const g=[],m=[];lh(f,g,m,p),g.length!==0&&v.push(new u(d,g,m))}},i=[],s=e.name||"default",r=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let v=0;v<d[p].morphTargets.length;v++)f[d[p].morphTargets[v]]=-1;for(const v in f){const g=[],m=[];for(let _=0;_!==d[p].morphTargets.length;++_){const x=d[p];g.push(x.time),m.push(x.morphTarget===v?1:0)}i.push(new is(".morphTargetInfluence["+v+"]",g,m))}l=f.length*r}else{const f=".bones["+t[u].name+"]";n(os,f+".position",d,"pos",i),n(ss,f+".quaternion",d,"rot",i),n(os,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function D_(o){switch(o.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return is;case"vector":case"vector2":case"vector3":case"vector4":return os;case"color":return hh;case"quaternion":return ss;case"bool":case"boolean":return ns;case"string":return rs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+o)}function U_(o){if(o.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=D_(o.type);if(o.times===void 0){const t=[],n=[];lh(o.keys,t,n,"value"),o.times=t,o.values=n}return e.parse!==void 0?e.parse(o):new e(o.name,o.times,o.values,o.interpolation)}const oi={enabled:!1,files:{},add:function(o,e){this.enabled!==!1&&(this.files[o]=e)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class uh{constructor(e,t,n){const i=this;let s=!1,r=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,r,a),s=!0},this.itemEnd=function(h){r++,i.onProgress!==void 0&&i.onProgress(h,r,a),r===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const zf=new uh;class Xt{constructor(e){this.manager=e!==void 0?e:zf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Xt.DEFAULT_MATERIAL_NAME="__DEFAULT";const ai={};class N_ extends Error{constructor(e,t){super(e),this.response=t}}class hn extends Xt{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=oi.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(ai[e]!==void 0){ai[e].push({onLoad:t,onProgress:n,onError:i});return}ai[e]=[],ai[e].push({onLoad:t,onProgress:n,onError:i});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=ai[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let v=0;const g=new ReadableStream({start(m){_();function _(){u.read().then(({done:x,value:y})=>{if(x)m.close();else{v+=y.byteLength;const L=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:f});for(let w=0,A=h.length;w<A;w++){const C=h[w];C.onProgress&&C.onProgress(L)}m.enqueue(y),_()}},x=>{m.error(x)})}}});return new Response(g)}else throw new N_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{oi.add(e,c);const h=ai[e];delete ai[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=ai[e];if(h===void 0)throw this.manager.itemError(e),c;delete ai[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class F_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new hn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=js.parse(e[n]);t.push(i)}return t}}class O_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=[],a=new Ga,l=new hn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function h(u){l.load(e[u],function(d){const f=s.parse(d,!0);r[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=at),a.image=r,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let u=0,d=e.length;u<d;++u)h(u);else l.load(e,function(u){const d=s.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let p=0;p<f;p++){r[p]={mipmaps:[]};for(let v=0;v<d.mipmapCount;v++)r[p].mipmaps.push(d.mipmaps[p*d.mipmapCount+v]),r[p].format=d.format,r[p].width=d.width,r[p].height=d.height}a.image=r}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=at),a.format=d.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}}class Zr extends Xt{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=oi.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const a=xr("img");function l(){h(),oi.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class B_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=new Ar;s.colorSpace=yt;const r=new Zr(this.manager);r.setCrossOrigin(this.crossOrigin),r.setPath(this.path);let a=0;function l(c){r.load(e[c],function(h){s.images[c]=h,a++,a===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class k_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new yn,a=new hn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?r.image=c.image:c.data!==void 0&&(r.image.width=c.width,r.image.height=c.height,r.image.data=c.data),r.wrapS=c.wrapS!==void 0?c.wrapS:Zt,r.wrapT=c.wrapT!==void 0?c.wrapT:Zt,r.magFilter=c.magFilter!==void 0?c.magFilter:at,r.minFilter=c.minFilter!==void 0?c.minFilter:at,r.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(r.colorSpace=c.colorSpace),c.flipY!==void 0&&(r.flipY=c.flipY),c.format!==void 0&&(r.format=c.format),c.type!==void 0&&(r.type=c.type),c.mipmaps!==void 0&&(r.mipmaps=c.mipmaps,r.minFilter=pn),c.mipmapCount===1&&(r.minFilter=at),c.generateMipmaps!==void 0&&(r.generateMipmaps=c.generateMipmaps),r.needsUpdate=!0,t&&t(r,c)},n,i),r}}class Hf extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=new gt,r=new Zr(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Ti extends tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new q(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ul extends Ti{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new q(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const dh=new De,Vf=new E,Gf=new E;class fh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new j(512,512),this.map=null,this.mapPass=null,this.matrix=new De,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Er,this._frameExtents=new j(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Vf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vf),Gf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gf),t.updateMatrixWorld(),dh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(dh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class z_ extends fh{constructor(){super(new Et(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ss*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Kr extends Ti{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.target=new tt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new z_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Wf=new De,$r=new E,ph=new E;class H_ extends fh{constructor(){super(new Et(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new j(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),$r.setFromMatrixPosition(e.matrixWorld),n.position.copy($r),ph.copy(n.position),ph.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ph),n.updateMatrixWorld(),i.makeTranslation(-$r.x,-$r.y,-$r.z),Wf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wf)}}class sn extends Ti{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new H_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class V_ extends fh{constructor(){super(new Bs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hn extends Ti{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.target=new tt,this.shadow=new V_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Xf extends Ti{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Yf extends Ti{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class qf{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new E)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,r=this.coefficients;return t.copy(r[0]).multiplyScalar(.282095),t.addScaledVector(r[1],.488603*i),t.addScaledVector(r[2],.488603*s),t.addScaledVector(r[3],.488603*n),t.addScaledVector(r[4],1.092548*(n*i)),t.addScaledVector(r[5],1.092548*(i*s)),t.addScaledVector(r[6],.315392*(3*s*s-1)),t.addScaledVector(r[7],1.092548*(n*s)),t.addScaledVector(r[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,r=this.coefficients;return t.copy(r[0]).multiplyScalar(.886227),t.addScaledVector(r[1],1.023328*i),t.addScaledVector(r[2],1.023328*s),t.addScaledVector(r[3],1.023328*n),t.addScaledVector(r[4],.858086*n*i),t.addScaledVector(r[5],.858086*i*s),t.addScaledVector(r[6],.743125*s*s-.247708),t.addScaledVector(r[7],.858086*n*s),t.addScaledVector(r[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Zf extends Ti{constructor(e=new qf,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class dl extends Xt{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,r=new hn(s.manager);r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const r=e.uniforms[s];switch(i.uniforms[s]={},r.type){case"t":i.uniforms[s].value=n(r.value);break;case"c":i.uniforms[s].value=new q().setHex(r.value);break;case"v2":i.uniforms[s].value=new j().fromArray(r.value);break;case"v3":i.uniforms[s].value=new E().fromArray(r.value);break;case"v4":i.uniforms[s].value=new st().fromArray(r.value);break;case"m3":i.uniforms[s].value=new We().fromArray(r.value);break;case"m4":i.uniforms[s].value=new De().fromArray(r.value);break;default:i.uniforms[s].value=r.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new j().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new j().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return dl.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:Cf,SpriteMaterial:Oc,RawShaderMaterial:Rf,ShaderMaterial:Ht,PointsMaterial:Br,MeshPhysicalMaterial:_n,MeshStandardMaterial:xn,MeshPhongMaterial:Lf,MeshToonMaterial:Pf,MeshNormalMaterial:hl,MeshLambertMaterial:If,MeshDepthMaterial:Dc,MeshDistanceMaterial:Uc,MeshBasicMaterial:zt,MeshMatcapMaterial:Df,LineDashedMaterial:Uf,LineBasicMaterial:Wt,Material:Rt};return new t[e]}}class Ai{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Kf extends He{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class $f extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new hn(s.manager);r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];const g=f.interleavedBuffers[p],m=s(f,g.buffer),_=bs(g.type,m),x=new Rr(_,g.stride);return x.uuid=g.uuid,t[p]=x,x}function s(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const r=e.isInstancedBufferGeometry?new Kf:new He,a=e.data.index;if(a!==void 0){const f=bs(a.type,a.array);r.setIndex(new Je(f,1))}const l=e.data.attributes;for(const f in l){const p=l[f];let v;if(p.isInterleavedBufferAttribute){const g=i(e.data,p.data);v=new Si(g,p.itemSize,p.offset,p.normalized)}else{const g=bs(p.type,p.array),m=p.isInstancedBufferAttribute?$i:Je;v=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(v.name=p.name),p.usage!==void 0&&v.setUsage(p.usage),r.setAttribute(f,v)}const c=e.data.morphAttributes;if(c)for(const f in c){const p=c[f],v=[];for(let g=0,m=p.length;g<m;g++){const _=p[g];let x;if(_.isInterleavedBufferAttribute){const y=i(e.data,_.data);x=new Si(y,_.itemSize,_.offset,_.normalized)}else{const y=bs(_.type,_.array);x=new Je(y,_.itemSize,_.normalized)}_.name!==void 0&&(x.name=_.name),v.push(x)}r.morphAttributes[f]=v}e.data.morphTargetsRelative&&(r.morphTargetsRelative=!0);const u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let f=0,p=u.length;f!==p;++f){const v=u[f];r.addGroup(v.start,v.count,v.materialIndex)}const d=e.data.boundingSphere;if(d!==void 0){const f=new E;d.center!==void 0&&f.fromArray(d.center),r.boundingSphere=new Nt(f,d.radius)}return e.name&&(r.name=e.name),e.userData&&(r.userData=e.userData),r}}class G_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=this.path===""?Ai.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||r;const a=new hn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+e+".",u.message);return}const h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),console.error("THREE.ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?Ai.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new hn(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const r=await s.loadAsync(e,t),a=JSON.parse(r),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),r=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,r),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,s,l,a,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let u=!1;for(const d in r)if(r[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),r=this.parseTextures(e.textures,s),a=this.parseMaterials(e.materials,r),l=this.parseObject(e.object,i,a,r,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new Qi().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,r=e.length;s<r;s++){const a=new Dr().fromJSON(e[s],i);n[a.uuid]=a}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new $f;for(let s=0,r=e.length;s<r;s++){let a;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in Ef?a=Ef[l.type].fromJSON(l,t):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new dl;s.setTextures(t);for(let r=0,a=e.length;r<a;r++){const l=e[r];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=js.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function r(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return r(h)}else return l.data?{data:bs(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new uh(t);s=new Zr(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){const u=e[c],d=u.url;if(Array.isArray(d)){const f=[];for(let p=0,v=d.length;p<v;p++){const g=d[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new yn(m.data,m.width,m.height)))}i[u.uuid]=new zi(f)}else{const f=a(u.url);i[u.uuid]=new zi(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(r){if(typeof r=="string"){const a=r,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return r.data?{data:bs(r.type,r.data),width:r.width,height:r.height}:null}if(e!==void 0&&e.length>0){i=new Zr(this.manager),i.setCrossOrigin(this.crossOrigin);for(let r=0,a=e.length;r<a;r++){const l=e[r],c=l.url;if(Array.isArray(c)){const h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=await s(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new yn(p.data,p.width,p.height)))}n[l.uuid]=new zi(h)}else{const h=await s(l.url);n[l.uuid]=new zi(h)}}}return n}parseTextures(e,t){function n(s,r){return typeof s=="number"?s:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",s),r[s])}const i={};if(e!==void 0)for(let s=0,r=e.length;s<r;s++){const a=e[s];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const l=t[a.image],c=l.data;let h;Array.isArray(c)?(h=new Ar,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new yn:h=new gt,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,W_)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],jf),h.wrapT=n(a.wrap[1],jf)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,Jf)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,Jf)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(e,t,n,i,s){let r;function a(d){return t[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let p=0,v=d.length;p<v;p++){const g=d[p];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(e.type){case"Scene":r=new Gs,e.background!==void 0&&(Number.isInteger(e.background)?r.background=new q(e.background):r.background=c(e.background)),e.environment!==void 0&&(r.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?r.fog=new Aa(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(r.fog=new Vs(e.fog.color,e.fog.density)),e.fog.name!==""&&(r.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(r.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(r.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&r.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(r.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&r.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":r=new Et(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(r.focus=e.focus),e.zoom!==void 0&&(r.zoom=e.zoom),e.filmGauge!==void 0&&(r.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(r.filmOffset=e.filmOffset),e.view!==void 0&&(r.view=Object.assign({},e.view));break;case"OrthographicCamera":r=new Bs(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(r.zoom=e.zoom),e.view!==void 0&&(r.view=Object.assign({},e.view));break;case"AmbientLight":r=new Xf(e.color,e.intensity);break;case"DirectionalLight":r=new Hn(e.color,e.intensity),r.target=e.target||"";break;case"PointLight":r=new sn(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":r=new Yf(e.color,e.intensity,e.width,e.height);break;case"SpotLight":r=new Kr(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),r.target=e.target||"";break;case"HemisphereLight":r=new ul(e.color,e.groundColor,e.intensity);break;case"LightProbe":r=new Zf().fromJSON(e);break;case"SkinnedMesh":h=a(e.geometry),u=l(e.material),r=new Hc(h,u),e.bindMode!==void 0&&(r.bindMode=e.bindMode),e.bindMatrix!==void 0&&r.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(r.skeleton=e.skeleton);break;case"Mesh":h=a(e.geometry),u=l(e.material),r=new Ne(h,u);break;case"InstancedMesh":h=a(e.geometry),u=l(e.material);const d=e.count,f=e.instanceMatrix,p=e.instanceColor;r=new Vc(h,u,d),r.instanceMatrix=new $i(new Float32Array(f.array),16),p!==void 0&&(r.instanceColor=new $i(new Float32Array(p.array),p.itemSize));break;case"BatchedMesh":h=a(e.geometry),u=l(e.material),r=new sf(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,u),r.geometry=h,r.perObjectFrustumCulled=e.perObjectFrustumCulled,r.sortObjects=e.sortObjects,r._drawRanges=e.drawRanges,r._reservedRanges=e.reservedRanges,r._visibility=e.visibility,r._active=e.active,r._bounds=e.bounds.map(v=>{const g=new Ct;g.min.fromArray(v.boxMin),g.max.fromArray(v.boxMax);const m=new Nt;return m.radius=v.sphereRadius,m.center.fromArray(v.sphereCenter),{boxInitialized:v.boxInitialized,box:g,sphereInitialized:v.sphereInitialized,sphere:m}}),r._maxInstanceCount=e.maxInstanceCount,r._maxVertexCount=e.maxVertexCount,r._maxIndexCount=e.maxIndexCount,r._geometryInitialized=e.geometryInitialized,r._geometryCount=e.geometryCount,r._matricesTexture=c(e.matricesTexture.uuid),e.colorsTexture!==void 0&&(r._colorsTexture=c(e.colorsTexture.uuid));break;case"LOD":r=new qd;break;case"Line":r=new ri(a(e.geometry),l(e.material));break;case"LineLoop":r=new qc(a(e.geometry),l(e.material));break;case"LineSegments":r=new Ln(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":r=new Va(a(e.geometry),l(e.material));break;case"Sprite":r=new Xd(l(e.material));break;case"Group":r=new Vt;break;case"Bone":r=new Ia;break;default:r=new tt}if(r.uuid=e.uuid,e.name!==void 0&&(r.name=e.name),e.matrix!==void 0?(r.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(r.matrixAutoUpdate=e.matrixAutoUpdate),r.matrixAutoUpdate&&r.matrix.decompose(r.position,r.quaternion,r.scale)):(e.position!==void 0&&r.position.fromArray(e.position),e.rotation!==void 0&&r.rotation.fromArray(e.rotation),e.quaternion!==void 0&&r.quaternion.fromArray(e.quaternion),e.scale!==void 0&&r.scale.fromArray(e.scale)),e.up!==void 0&&r.up.fromArray(e.up),e.castShadow!==void 0&&(r.castShadow=e.castShadow),e.receiveShadow!==void 0&&(r.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(r.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(r.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(r.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(r.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&r.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(r.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(r.visible=e.visible),e.frustumCulled!==void 0&&(r.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(r.renderOrder=e.renderOrder),e.userData!==void 0&&(r.userData=e.userData),e.layers!==void 0&&(r.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)r.add(this.parseObject(d[f],t,n,i,s))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const p=d[f];r.animations.push(s[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(r.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const p=d[f],v=r.getObjectByProperty("uuid",p.object);v!==void 0&&r.addLevel(v,p.distance,p.hysteresis)}}return r}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new tt}})}}const W_={UVMapping:go,CubeReflectionMapping:Yn,CubeRefractionMapping:fi,EquirectangularReflectionMapping:rr,EquirectangularRefractionMapping:or,CubeUVReflectionMapping:gs},jf={RepeatWrapping:On,ClampToEdgeWrapping:Zt,MirroredRepeatWrapping:vs},Jf={NearestFilter:vt,NearestMipmapNearestFilter:vo,NearestMipmapLinearFilter:Ui,LinearFilter:at,LinearMipmapNearestFilter:ys,LinearMipmapLinearFilter:pn};class Qf extends Xt{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=oi.get(e);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return oi.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),oi.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});oi.add(e,l),s.manager.itemStart(e)}}let fl;class mh{static getContext(){return fl===void 0&&(fl=new(window.AudioContext||window.webkitAudioContext)),fl}static setContext(e){fl=e}}class X_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new hn(this.manager);r.setResponseType("arraybuffer"),r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(l){try{const c=l.slice(0);mh.getContext().decodeAudioData(c,function(u){t(u)}).catch(a)}catch(c){a(c)}},n,i);function a(l){i?i(l):console.error(l),s.manager.itemError(e)}}}const ep=new De,tp=new De,as=new De;class Y_{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Et,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Et,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,as.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,r=t.near*Math.tan(ki*t.fov*.5)/t.zoom;let a,l;tp.elements[12]=-i,ep.elements[12]=i,a=-r*t.aspect+s,l=r*t.aspect+s,as.elements[0]=2*t.near/(l-a),as.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(as),a=-r*t.aspect-s,l=r*t.aspect-s,as.elements[0]=2*t.near/(l-a),as.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(as)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(tp),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(ep)}}class np{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ip(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ip();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ip(){return performance.now()}const ls=new E,sp=new Bt,q_=new E,cs=new E;class Z_ extends tt{constructor(){super(),this.type="AudioListener",this.context=mh.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new np}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(ls,sp,q_),cs.set(0,0,-1).applyQuaternion(sp),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(ls.x,i),t.positionY.linearRampToValueAtTime(ls.y,i),t.positionZ.linearRampToValueAtTime(ls.z,i),t.forwardX.linearRampToValueAtTime(cs.x,i),t.forwardY.linearRampToValueAtTime(cs.y,i),t.forwardZ.linearRampToValueAtTime(cs.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(ls.x,ls.y,ls.z),t.setOrientation(cs.x,cs.y,cs.z,n.x,n.y,n.z)}}class rp extends tt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const hs=new E,op=new Bt,K_=new E,us=new E;class $_ extends rp{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(hs,op,K_),us.set(0,0,1).applyQuaternion(op);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(hs.x,n),t.positionY.linearRampToValueAtTime(hs.y,n),t.positionZ.linearRampToValueAtTime(hs.z,n),t.orientationX.linearRampToValueAtTime(us.x,n),t.orientationY.linearRampToValueAtTime(us.y,n),t.orientationZ.linearRampToValueAtTime(us.z,n)}else t.setPosition(hs.x,hs.y,hs.z),t.setOrientation(us.x,us.y,us.z)}}class j_{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class ap{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,r;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,r=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,r=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,r=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=r,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let r=this.cumulativeWeight;if(r===0){for(let a=0;a!==i;++a)n[s+a]=n[a];r=t}else{r+=t;const a=t/r;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=r}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}r>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,r=i;s!==r;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let r=0;r!==s;++r)e[t+r]=e[n+r]}_slerp(e,t,n,i){Bt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const r=this._workIndex*s;Bt.multiplyQuaternionsFlat(e,r,e,t,e,n),Bt.slerpFlat(e,t,e,t,e,r,i)}_lerp(e,t,n,i,s){const r=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*r+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let r=0;r!==s;++r){const a=t+r;e[a]=e[a]+e[n+r]*i}}}const gh="\\[\\]\\.:\\/",J_=new RegExp("["+gh+"]","g"),vh="[^"+gh+"]",Q_="[^"+gh.replace("\\.","")+"]",eM=/((?:WC+[\/:])*)/.source.replace("WC",vh),tM=/(WCOD+)?/.source.replace("WCOD",Q_),nM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vh),iM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vh),sM=new RegExp("^"+eM+tM+nM+iM+"$"),rM=["material","materials","bones","map"];class oM{constructor(e,t,n){const i=n||nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class nt{constructor(e,t,n){this.path=t,this.parsedPath=n||nt.parseTrackName(t),this.node=nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new nt.Composite(e,t,n):new nt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(J_,"")}static parseTrackName(e){const t=sM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);rM.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let r=0;r<s.length;r++){const a=s[r];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[i];if(r===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}nt.Composite=oM,nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},nt.prototype.GetterByBindingType=[nt.prototype._getValue_direct,nt.prototype._getValue_array,nt.prototype._getValue_arrayElement,nt.prototype._getValue_toArray],nt.prototype.SetterByBindingTypeAndVersioning=[[nt.prototype._setValue_direct,nt.prototype._setValue_direct_setNeedsUpdate,nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_array,nt.prototype._setValue_array_setNeedsUpdate,nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_arrayElement,nt.prototype._setValue_arrayElement_setNeedsUpdate,nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_fromArray,nt.prototype._setValue_fromArray_setNeedsUpdate,nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class aM{constructor(){this.isAnimationObjectGroup=!0,this.uuid=on(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,r=s.length;let a,l=e.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(d);for(let v=0,g=r;v!==g;++v)s[v].push(new nt(d,n[v],i[v]))}else if(p<c){a=e[p];const v=--c,g=e[v];t[g.uuid]=p,e[p]=g,t[f]=v,e[v]=d;for(let m=0,_=r;m!==_;++m){const x=s[m],y=x[v];let L=x[p];x[p]=y,L===void 0&&(L=new nt(d,n[m],i[m])),x[v]=L}}else e[p]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let r=0,a=arguments.length;r!==a;++r){const l=arguments[r],c=l.uuid,h=t[c];if(h!==void 0&&h>=s){const u=s++,d=e[u];t[d.uuid]=h,e[h]=d,t[c]=u,e[u]=l;for(let f=0,p=i;f!==p;++f){const v=n[f],g=v[u],m=v[h];v[h]=g,v[u]=m}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,r=e.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],h=c.uuid,u=t[h];if(u!==void 0)if(delete t[h],u<s){const d=--s,f=e[d],p=--r,v=e[p];t[f.uuid]=u,e[u]=f,t[v.uuid]=d,e[d]=v,e.pop();for(let g=0,m=i;g!==m;++g){const _=n[g],x=_[d],y=_[p];_[u]=x,_[d]=y,_.pop()}}else{const d=--r,f=e[d];d>0&&(t[f.uuid]=u),e[u]=f,e.pop();for(let p=0,v=i;p!==v;++p){const g=n[p];g[u]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const r=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=s.length,n[e]=i,r.push(e),a.push(t),s.push(u);for(let d=h,f=l.length;d!==f;++d){const p=l[d];u[d]=new nt(p,e,t)}return u}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,r=this._bindings,a=r.length-1,l=r[a],c=e[a];t[c]=n,r[n]=l,r.pop(),s[n]=s[a],s.pop(),i[n]=i[a],i.pop()}}}class lp{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,r=s.length,a=new Array(r),l={endingStart:Fi,endingEnd:Fi};for(let c=0;c!==r;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=fr,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,r=s/i,a=i/s;e.warp(1,r,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,r=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/r,c[1]=t/r,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const r=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Kl:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulateAdditive(a);break;case Jo:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const r=n===bu;if(e===0)return s===-1?i:r&&(s&1)===1?t-i:i;if(n===$o){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,r)):this._setEndings(this.repetitions===0,!0,r)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,r)}else this._setEndings(!1,!1,r);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(r&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Oi,i.endingEnd=Oi):(e?i.endingStart=this.zeroSlopeAtStart?Oi:Fi:i.endingStart=pr,t?i.endingEnd=this.zeroSlopeAtEnd?Oi:Fi:i.endingEnd=pr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let r=this._weightInterpolant;r===null&&(r=i._lendControlInterpolant(),this._weightInterpolant=r);const a=r.parameterPositions,l=r.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const lM=new Float32Array(1);class cp extends kn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,r=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,r[u]=p;else{if(p=r[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const v=t&&t._propertyBindings[u].binding.parsedPath;p=new ap(nt.create(n,f,v),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),r[u]=p}a[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let r=s[t];if(r===void 0)r={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=r;else{const a=r.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),r.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,r=this._actionsByClip,a=r[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete r[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let r=i[t];r===void 0&&(r={},i[t]=r),r[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,r=this._bindingsByRootAndName,a=r[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete r[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new ch(new Float32Array(2),new Float32Array(2),1,lM),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let r=typeof e=="string"?js.findByName(i,e):e;const a=r!==null?r.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(r!==null?n=r.blendMode:n=Jo),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],r===null&&(r=c._clip)}if(r===null)return null;const h=new lp(this,r,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?js.findByName(n,e):e,r=s?s.uuid:e,a=this._actionsByClip[r];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),r=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,r);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(r);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const r=s.knownActions;for(let a=0,l=r.length;a!==l;++a){const c=r[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const r in n){const a=n[r].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const r in s){const a=s[r];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class yh{constructor(e){this.value=e}clone(){return new yh(this.value.clone===void 0?this.value:this.value.clone())}}let cM=0;class hM extends kn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:cM++}),this.name="",this.usage=gr,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let r=0;r<s.length;r++)this.uniforms.push(s[r].clone())}return this}clone(){return new this.constructor().copy(this)}}class uM extends Rr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class dM{constructor(e,t,n,i,s){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const hp=new De;class up{constructor(e,t,n=0,i=1/0){this.ray=new Gi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hp),this}intersectObject(e,t=!0,n=[]){return xh(e,this,n,t),n.sort(dp),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)xh(e[i],this,n,t);return n.sort(dp),n}}function dp(o,e){return o.distance-e.distance}function xh(o,e,t,n){let i=!0;if(o.layers.test(e.layers)&&o.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=o.children;for(let r=0,a=s.length;r<a;r++)xh(s[r],e,t,!0)}}class fM{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(_t(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class pM{constructor(e=1,t=0,n=0){return this.radius=e,this.theta=t,this.y=n,this}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}class _h{constructor(e,t,n,i){_h.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}}const fp=new j;class mM{constructor(e=new j(1/0,1/0),t=new j(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=fp.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fp).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const pp=new E,pl=new E;class gM{constructor(e=new E,t=new E){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){pp.subVectors(e,this.start),pl.subVectors(this.end,this.start);const n=pl.dot(pl);let s=pl.dot(pp)/n;return t&&(s=_t(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const mp=new E;class vM extends tt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new He,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let r=0,a=1,l=32;r<l;r++,a++){const c=r/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new we(i,3));const s=new Wt({fog:!1,toneMapped:!1});this.cone=new Ln(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),mp.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(mp),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Ei=new E,ml=new De,Mh=new De;class yM extends Ln{constructor(e){const t=gp(e),n=new He,i=[],s=[],r=new q(0,0,1),a=new q(0,1,0);for(let c=0;c<t.length;c++){const h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(r.r,r.g,r.b),s.push(a.r,a.g,a.b))}n.setAttribute("position",new we(i,3)),n.setAttribute("color",new we(s,3));const l=new Wt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Mh.copy(this.root.matrixWorld).invert();for(let s=0,r=0;s<t.length;s++){const a=t[s];a.parent&&a.parent.isBone&&(ml.multiplyMatrices(Mh,a.matrixWorld),Ei.setFromMatrixPosition(ml),i.setXYZ(r,Ei.x,Ei.y,Ei.z),ml.multiplyMatrices(Mh,a.parent.matrixWorld),Ei.setFromMatrixPosition(ml),i.setXYZ(r+1,Ei.x,Ei.y,Ei.z),r+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function gp(o){const e=[];o.isBone===!0&&e.push(o);for(let t=0;t<o.children.length;t++)e.push.apply(e,gp(o.children[t]));return e}class xM extends Ne{constructor(e,t,n){const i=new Dt(t,4,2),s=new zt({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const _M=new E,vp=new q,yp=new q;class MM extends tt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Yr(t);i.rotateY(Math.PI*.5),this.material=new zt({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),r=new Float32Array(s.count*3);i.setAttribute("color",new Je(r,3)),this.add(new Ne(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");vp.copy(this.light.color),yp.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?vp:yp;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(_M.setFromMatrixPosition(this.light.matrixWorld).negate())}}class SM extends Ln{constructor(e=10,t=10,n=4473924,i=8947848){n=new q(n),i=new q(i);const s=t/2,r=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,p=-a;d<=t;d++,p+=r){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);const v=d===s?n:i;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const h=new He;h.setAttribute("position",new we(l,3)),h.setAttribute("color",new we(c,3));const u=new Wt({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class bM extends Ln{constructor(e=10,t=16,n=8,i=64,s=4473924,r=8947848){s=new q(s),r=new q(r);const a=[],l=[];if(t>1)for(let u=0;u<t;u++){const d=u/t*(Math.PI*2),f=Math.sin(d)*e,p=Math.cos(d)*e;a.push(0,0,0),a.push(f,0,p);const v=u&1?s:r;l.push(v.r,v.g,v.b),l.push(v.r,v.g,v.b)}for(let u=0;u<n;u++){const d=u&1?s:r,f=e-e/n*u;for(let p=0;p<i;p++){let v=p/i*(Math.PI*2),g=Math.sin(v)*f,m=Math.cos(v)*f;a.push(g,0,m),l.push(d.r,d.g,d.b),v=(p+1)/i*(Math.PI*2),g=Math.sin(v)*f,m=Math.cos(v)*f,a.push(g,0,m),l.push(d.r,d.g,d.b)}}const c=new He;c.setAttribute("position",new we(a,3)),c.setAttribute("color",new we(l,3));const h=new Wt({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const xp=new E,gl=new E,_p=new E;class wM extends tt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new He;i.setAttribute("position",new we([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new Wt({fog:!1,toneMapped:!1});this.lightPlane=new ri(i,s),this.add(this.lightPlane),i=new He,i.setAttribute("position",new we([0,0,0,0,0,1],3)),this.targetLine=new ri(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),xp.setFromMatrixPosition(this.light.matrixWorld),gl.setFromMatrixPosition(this.light.target.matrixWorld),_p.subVectors(gl,xp),this.lightPlane.lookAt(gl),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(gl),this.targetLine.scale.z=_p.length()}}const vl=new E,Mt=new ya;class TM extends Ln{constructor(e){const t=new He,n=new Wt({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],r={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,v){l(p),l(v)}function l(p){i.push(0,0,0),s.push(0,0,0),r[p]===void 0&&(r[p]=[]),r[p].push(i.length/3-1)}t.setAttribute("position",new we(i,3)),t.setAttribute("color",new we(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=r,this.update();const c=new q(16755200),h=new q(16711680),u=new q(43775),d=new q(16777215),f=new q(3355443);this.setColors(c,h,u,d,f)}setColors(e,t,n,i,s){const a=this.geometry.getAttribute("color");a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,s.r,s.g,s.b),a.setXYZ(41,s.r,s.g,s.b),a.setXYZ(42,s.r,s.g,s.b),a.setXYZ(43,s.r,s.g,s.b),a.setXYZ(44,s.r,s.g,s.b),a.setXYZ(45,s.r,s.g,s.b),a.setXYZ(46,s.r,s.g,s.b),a.setXYZ(47,s.r,s.g,s.b),a.setXYZ(48,s.r,s.g,s.b),a.setXYZ(49,s.r,s.g,s.b),a.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;Mt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),bt("c",t,e,Mt,0,0,-1),bt("t",t,e,Mt,0,0,1),bt("n1",t,e,Mt,-n,-i,-1),bt("n2",t,e,Mt,n,-i,-1),bt("n3",t,e,Mt,-n,i,-1),bt("n4",t,e,Mt,n,i,-1),bt("f1",t,e,Mt,-n,-i,1),bt("f2",t,e,Mt,n,-i,1),bt("f3",t,e,Mt,-n,i,1),bt("f4",t,e,Mt,n,i,1),bt("u1",t,e,Mt,n*.7,i*1.1,-1),bt("u2",t,e,Mt,-n*.7,i*1.1,-1),bt("u3",t,e,Mt,0,i*2,-1),bt("cf1",t,e,Mt,-n,0,1),bt("cf2",t,e,Mt,n,0,1),bt("cf3",t,e,Mt,0,-i,1),bt("cf4",t,e,Mt,0,i,1),bt("cn1",t,e,Mt,-n,0,-1),bt("cn2",t,e,Mt,n,0,-1),bt("cn3",t,e,Mt,0,-i,-1),bt("cn4",t,e,Mt,0,i,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function bt(o,e,t,n,i,s,r){vl.set(i,s,r).unproject(n);const a=e[o];if(a!==void 0){const l=t.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],vl.x,vl.y,vl.z)}}const yl=new Ct;class AM extends Ln{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),s=new He;s.setIndex(new Je(n,1)),s.setAttribute("position",new Je(i,3)),super(s,new Wt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(e!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&yl.setFromObject(this.object),yl.isEmpty())return;const t=yl.min,n=yl.max,i=this.geometry.attributes.position,s=i.array;s[0]=n.x,s[1]=n.y,s[2]=n.z,s[3]=t.x,s[4]=n.y,s[5]=n.z,s[6]=t.x,s[7]=t.y,s[8]=n.z,s[9]=n.x,s[10]=t.y,s[11]=n.z,s[12]=n.x,s[13]=n.y,s[14]=t.z,s[15]=t.x,s[16]=n.y,s[17]=t.z,s[18]=t.x,s[19]=t.y,s[20]=t.z,s[21]=n.x,s[22]=t.y,s[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class EM extends Ln{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new He;s.setIndex(new Je(n,1)),s.setAttribute("position",new we(i,3)),super(s,new Wt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class CM extends ri{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],r=new He;r.setAttribute("position",new we(s,3)),r.computeBoundingSphere(),super(r,new Wt({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new He;l.setAttribute("position",new we(a,3)),l.computeBoundingSphere(),this.add(new Ne(l,new zt({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Mp=new E;let xl,Sh;class RM extends tt{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,i=16776960,s=n*.2,r=s*.2){super(),this.type="ArrowHelper",xl===void 0&&(xl=new He,xl.setAttribute("position",new we([0,0,0,0,1,0],3)),Sh=new bi(0,.5,1,5,1),Sh.translate(0,-.5,0)),this.position.copy(t),this.line=new ri(xl,new Wt({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ne(Sh,new zt({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Mp.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Mp,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class LM extends Ln{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new He;i.setAttribute("position",new we(t,3)),i.setAttribute("color",new we(n,3));const s=new Wt({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new q,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class PM{constructor(){this.type="ShapePath",this.color=new q,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Hr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,r){return this.currentPath.bezierCurveTo(e,t,n,i,s,r),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const _=[];for(let x=0,y=m.length;x<y;x++){const L=m[x],w=new Qi;w.curves=L.curves,_.push(w)}return _}function n(m,_){const x=_.length;let y=!1;for(let L=x-1,w=0;w<x;L=w++){let A=_[L],C=_[w],S=C.x-A.x,M=C.y-A.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(A=_[w],S=-S,C=_[L],M=-M),m.y<A.y||m.y>C.y)continue;if(m.y===A.y){if(m.x===A.x)return!0}else{const P=M*(m.x-A.x)-S*(m.y-A.y);if(P===0)return!0;if(P<0)continue;y=!y}}else{if(m.y!==A.y)continue;if(C.x<=m.x&&m.x<=A.x||A.x<=m.x&&m.x<=C.x)return!0}}return y}const i=zn.isClockWise,s=this.subPaths;if(s.length===0)return[];let r,a,l;const c=[];if(s.length===1)return a=s[0],l=new Qi,l.curves=a.curves,c.push(l),c;let h=!i(s[0].getPoints());h=e?!h:h;const u=[],d=[];let f=[],p=0,v;d[p]=void 0,f[p]=[];for(let m=0,_=s.length;m<_;m++)a=s[m],v=a.getPoints(),r=i(v),r=e?!r:r,r?(!h&&d[p]&&p++,d[p]={s:new Qi,p:v},d[p].s.curves=a.curves,h&&p++,f[p]=[]):f[p].push({h:a,p:v[0]});if(!d[0])return t(s);if(d.length>1){let m=!1,_=0;for(let x=0,y=d.length;x<y;x++)u[x]=[];for(let x=0,y=d.length;x<y;x++){const L=f[x];for(let w=0;w<L.length;w++){const A=L[w];let C=!0;for(let S=0;S<d.length;S++)n(A.p,d[S].p)&&(x!==S&&_++,C?(C=!1,u[S].push(A)):m=!0);C&&u[x].push(A)}}_>0&&m===!1&&(f=u)}let g;for(let m=0,_=d.length;m<_;m++){l=d[m].s,c.push(l),g=f[m];for(let x=0,y=g.length;x<y;x++)l.holes.push(g[x].h)}return c}}class IM extends kn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class DM extends Qt{constructor(e=1,t=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(e,t,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dn}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dn);const UM=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:yu,AddEquation:di,AddOperation:pu,AdditiveAnimationBlendMode:Kl,AdditiveBlending:Fl,AgXToneMapping:_u,AlphaFormat:Gl,AlwaysCompare:Uu,AlwaysDepth:co,AlwaysStencilFunc:jl,AmbientLight:Xf,AnimationAction:lp,AnimationClip:js,AnimationLoader:F_,AnimationMixer:cp,AnimationObjectGroup:aM,AnimationUtils:I_,ArcCurve:df,ArrayCamera:zd,ArrowHelper:RM,AttachedBindMode:kl,Audio:rp,AudioAnalyser:j_,AudioContext:mh,AudioListener:Z_,AudioLoader:X_,AxesHelper:LM,BackSide:Ft,BasicDepthPacking:Tu,BasicShadowMap:mm,BatchedMesh:sf,Bone:Ia,BooleanKeyframeTrack:ns,Box2:mM,Box3:Ct,Box3Helper:EM,BoxGeometry:vn,BoxHelper:AM,BufferAttribute:Je,BufferGeometry:He,BufferGeometryLoader:$f,ByteType:zl,Cache:oi,Camera:ya,CameraHelper:TM,CanvasTexture:uf,CapsuleGeometry:qa,CatmullRomCurve3:ff,CineonToneMapping:vu,CircleGeometry:Za,ClampToEdgeWrapping:Zt,Clock:np,Color:q,ColorKeyframeTrack:hh,ColorManagement:$e,CompressedArrayTexture:t_,CompressedCubeTexture:n_,CompressedTexture:Ga,CompressedTextureLoader:O_,ConeGeometry:Ka,ConstantAlphaFactor:uu,ConstantColorFactor:cu,Controls:IM,CubeCamera:cd,CubeReflectionMapping:Yn,CubeRefractionMapping:fi,CubeTexture:Ar,CubeTextureLoader:B_,CubeUVReflectionMapping:gs,CubicBezierCurve:Qc,CubicBezierCurve3:mf,CubicInterpolant:Of,CullFaceBack:Dl,CullFaceFront:Zh,CullFaceFrontBack:pm,CullFaceNone:qh,Curve:Pn,CurvePath:vf,CustomBlending:Kh,CustomToneMapping:xu,CylinderGeometry:bi,Cylindrical:pM,Data3DTexture:ic,DataArrayTexture:ea,DataTexture:yn,DataTextureLoader:k_,DataUtils:Tg,DecrementStencilOp:Am,DecrementWrapStencilOp:Cm,DefaultLoadingManager:zf,DepthFormat:Ni,DepthStencilFormat:mi,DepthTexture:Sa,DetachedBindMode:Su,DirectionalLight:Hn,DirectionalLightHelper:wM,DiscreteInterpolant:Bf,DodecahedronGeometry:$a,DoubleSide:fn,DstAlphaFactor:su,DstColorFactor:ou,DynamicCopyUsage:Gm,DynamicDrawUsage:Om,DynamicReadUsage:zm,EdgesGeometry:yf,EllipseCurve:Wa,EqualCompare:Lu,EqualDepth:uo,EqualStencilFunc:Im,EquirectangularReflectionMapping:rr,EquirectangularRefractionMapping:or,Euler:ln,EventDispatcher:kn,ExtrudeGeometry:il,FileLoader:hn,Float16BufferAttribute:Pg,Float32BufferAttribute:we,FloatType:Jt,Fog:Aa,FogExp2:Vs,FramebufferTexture:e_,FrontSide:Fn,Frustum:Er,GLBufferAttribute:dM,GLSL1:Xm,GLSL3:Ql,GreaterCompare:Pu,GreaterDepth:po,GreaterEqualCompare:Du,GreaterEqualDepth:fo,GreaterEqualStencilFunc:Fm,GreaterStencilFunc:Um,GridHelper:SM,Group:Vt,HalfFloatType:Zn,HemisphereLight:ul,HemisphereLightHelper:MM,IcosahedronGeometry:sl,ImageBitmapLoader:Qf,ImageLoader:Zr,ImageUtils:Wu,IncrementStencilOp:Tm,IncrementWrapStencilOp:Em,InstancedBufferAttribute:$i,InstancedBufferGeometry:Kf,InstancedInterleavedBuffer:uM,InstancedMesh:Vc,Int16BufferAttribute:Rg,Int32BufferAttribute:Lg,Int8BufferAttribute:Ag,IntType:yo,InterleavedBuffer:Rr,InterleavedBufferAttribute:Si,Interpolant:$s,InterpolateDiscrete:_s,InterpolateLinear:Ms,InterpolateSmooth:jo,InvertStencilOp:Rm,KeepStencilOp:Bi,KeyframeTrack:In,LOD:qd,LatheGeometry:Vr,Layers:aa,LessCompare:Ru,LessDepth:ho,LessEqualCompare:Jl,LessEqualDepth:Di,LessEqualStencilFunc:Dm,LessStencilFunc:Pm,Light:Ti,LightProbe:Zf,Line:ri,Line3:gM,LineBasicMaterial:Wt,LineCurve:eh,LineCurve3:gf,LineDashedMaterial:Uf,LineLoop:qc,LineSegments:Ln,LinearFilter:at,LinearInterpolant:ch,LinearMipMapLinearFilter:xm,LinearMipMapNearestFilter:ym,LinearMipmapLinearFilter:pn,LinearMipmapNearestFilter:ys,LinearSRGBColorSpace:Ut,LinearToneMapping:mu,LinearTransfer:mr,Loader:Xt,LoaderUtils:Ai,LoadingManager:uh,LoopOnce:$o,LoopPingPong:bu,LoopRepeat:fr,LuminanceAlphaFormat:Yl,LuminanceFormat:Xl,MOUSE:ms,Material:Rt,MaterialLoader:dl,MathUtils:et,Matrix2:_h,Matrix3:We,Matrix4:De,MaxEquation:Qh,Mesh:Ne,MeshBasicMaterial:zt,MeshDepthMaterial:Dc,MeshDistanceMaterial:Uc,MeshLambertMaterial:If,MeshMatcapMaterial:Df,MeshNormalMaterial:hl,MeshPhongMaterial:Lf,MeshPhysicalMaterial:_n,MeshStandardMaterial:xn,MeshToonMaterial:Pf,MinEquation:Jh,MirroredRepeatWrapping:vs,MixOperation:fu,MultiplyBlending:Bl,MultiplyOperation:sr,NearestFilter:vt,NearestMipMapLinearFilter:vm,NearestMipMapNearestFilter:gm,NearestMipmapLinearFilter:Ui,NearestMipmapNearestFilter:vo,NeutralToneMapping:Mu,NeverCompare:Cu,NeverDepth:lo,NeverStencilFunc:Lm,NoBlending:Wn,NoColorSpace:Tn,NoToneMapping:Xn,NormalAnimationBlendMode:Jo,NormalBlending:Ii,NotEqualCompare:Iu,NotEqualDepth:mo,NotEqualStencilFunc:Nm,NumberKeyframeTrack:is,Object3D:tt,ObjectLoader:G_,ObjectSpaceNormalMap:Eu,OctahedronGeometry:Yr,OneFactor:tu,OneMinusConstantAlphaFactor:du,OneMinusConstantColorFactor:hu,OneMinusDstAlphaFactor:ru,OneMinusDstColorFactor:au,OneMinusSrcAlphaFactor:ao,OneMinusSrcColorFactor:iu,OrthographicCamera:Bs,PCFShadowMap:Ul,PCFSoftShadowMap:Nl,PMREMGenerator:Rc,Path:Hr,PerspectiveCamera:Et,Plane:ii,PlaneGeometry:si,PlaneHelper:CM,PointLight:sn,PointLightHelper:xM,Points:Va,PointsMaterial:Br,PolarGridHelper:bM,PolyhedronGeometry:wi,PositionalAudio:$_,PropertyBinding:nt,PropertyMixer:ap,QuadraticBezierCurve:th,QuadraticBezierCurve3:nh,Quaternion:Bt,QuaternionKeyframeTrack:ss,QuaternionLinearInterpolant:kf,RED_GREEN_RGTC2_Format:Zo,RED_RGTC1_Format:Zl,REVISION:dn,RGBADepthPacking:Au,RGBAFormat:Tt,RGBAIntegerFormat:bo,RGBA_ASTC_10x10_Format:Vo,RGBA_ASTC_10x5_Format:ko,RGBA_ASTC_10x6_Format:zo,RGBA_ASTC_10x8_Format:Ho,RGBA_ASTC_12x10_Format:Go,RGBA_ASTC_12x12_Format:Wo,RGBA_ASTC_4x4_Format:Po,RGBA_ASTC_5x4_Format:Io,RGBA_ASTC_5x5_Format:Do,RGBA_ASTC_6x5_Format:Uo,RGBA_ASTC_6x6_Format:No,RGBA_ASTC_8x5_Format:Fo,RGBA_ASTC_8x6_Format:Oo,RGBA_ASTC_8x8_Format:Bo,RGBA_BPTC_Format:dr,RGBA_ETC2_EAC_Format:Lo,RGBA_PVRTC_2BPPV1_Format:Eo,RGBA_PVRTC_4BPPV1_Format:Ao,RGBA_S3TC_DXT1_Format:cr,RGBA_S3TC_DXT3_Format:hr,RGBA_S3TC_DXT5_Format:ur,RGBDepthPacking:Mm,RGBFormat:Wl,RGBIntegerFormat:_m,RGB_BPTC_SIGNED_Format:Xo,RGB_BPTC_UNSIGNED_Format:Yo,RGB_ETC1_Format:Co,RGB_ETC2_Format:Ro,RGB_PVRTC_2BPPV1_Format:To,RGB_PVRTC_4BPPV1_Format:wo,RGB_S3TC_DXT1_Format:lr,RGDepthPacking:Sm,RGFormat:ql,RGIntegerFormat:So,RawShaderMaterial:Rf,Ray:Gi,Raycaster:up,RectAreaLight:Yf,RedFormat:Mo,RedIntegerFormat:ar,ReinhardToneMapping:gu,RenderTarget:Xu,RepeatWrapping:On,ReplaceStencilOp:wm,ReverseSubtractEquation:jh,RingGeometry:qr,SIGNED_RED_GREEN_RGTC2_Format:Ko,SIGNED_RED_RGTC1_Format:qo,SRGBColorSpace:yt,SRGBTransfer:ht,Scene:Gs,ShaderChunk:Ye,ShaderLib:Rn,ShaderMaterial:Ht,ShadowMaterial:Cf,Shape:Qi,ShapeGeometry:rl,ShapePath:PM,ShapeUtils:zn,ShortType:Hl,Skeleton:Dr,SkeletonHelper:yM,SkinnedMesh:Hc,Source:zi,Sphere:Nt,SphereGeometry:Dt,Spherical:fM,SphericalHarmonics3:qf,SplineCurve:ih,SpotLight:Kr,SpotLightHelper:vM,Sprite:Xd,SpriteMaterial:Oc,SrcAlphaFactor:oo,SrcAlphaSaturateFactor:lu,SrcColorFactor:nu,StaticCopyUsage:Vm,StaticDrawUsage:gr,StaticReadUsage:km,StereoCamera:Y_,StreamCopyUsage:Wm,StreamDrawUsage:Bm,StreamReadUsage:Hm,StringKeyframeTrack:rs,SubtractEquation:$h,SubtractiveBlending:Ol,TOUCH:fm,TangentSpaceNormalMap:Kn,TetrahedronGeometry:ol,Texture:gt,TextureLoader:Hf,TextureUtils:Ux,TorusGeometry:al,TorusKnotGeometry:ll,Triangle:en,TriangleFanDrawMode:Qo,TriangleStripDrawMode:$l,TrianglesDrawMode:wu,TubeGeometry:cl,UVMapping:go,Uint16BufferAttribute:xc,Uint32BufferAttribute:_c,Uint8BufferAttribute:Eg,Uint8ClampedBufferAttribute:Cg,Uniform:yh,UniformsGroup:hM,UniformsLib:ue,UniformsUtils:od,UnsignedByteType:mn,UnsignedInt248Type:pi,UnsignedInt5999Type:Vl,UnsignedIntType:qn,UnsignedShort4444Type:xo,UnsignedShort5551Type:_o,UnsignedShortType:xs,VSMShadowMap:Nn,Vector2:j,Vector3:E,Vector4:st,VectorKeyframeTrack:os,VideoTexture:Qx,WebGL3DRenderTarget:mg,WebGLArrayRenderTarget:pg,WebGLCoordinateSystem:Bn,WebGLCubeRenderTarget:hd,WebGLMultipleRenderTargets:DM,WebGLRenderTarget:Qt,WebGLRenderer:Hd,WebGLUtils:kd,WebGPUCoordinateSystem:vr,WireframeGeometry:Tf,WrapAroundEnding:pr,ZeroCurvatureEnding:Fi,ZeroFactor:eu,ZeroSlopeEnding:Oi,ZeroStencilOp:bm,createCanvasElement:Ou},Symbol.toStringTag,{value:"Module"}));function _l(o,e,t){if(o.activeClip===e&&e!=="Casting")return;const n=o.actions[e];if(!n){o.activeClip=e;return}const i=o.actions[o.activeClip],s=t??o.crossFadeDuration;e==="Casting"?(n.setLoop($o,1),n.clampWhenFinished=!0,o.castRemaining=Math.max(.1,o.durations.Casting)):(n.setLoop(fr,1/0),n.clampWhenFinished=!1),n.enabled=!0,n.setEffectiveTimeScale(1),n.setEffectiveWeight(1),n.reset(),i&&i!==n?(n.play(),i.crossFadeTo(n,s,!1)):n.fadeIn(s).play(),o.activeClip=e}class Sp{constructor(){N(this,"name","CharacterAnimationSystem")}update(e,{dt:t}){const n=e.query("CharacterAnimation");for(const i of n){const s=e.getComponent(i,"CharacterAnimation"),r=e.getComponent(i,"Velocity"),a=e.getComponent(i,"NavigationTarget"),l=e.getComponent(i,"InputState"),c=!!(l&&(Math.abs(l.moveX)>.01||Math.abs(l.moveZ)>.01)),h=r?Math.hypot(r.vx,r.vz):0,u=c||!!(a&&a.active)||h>.06;if(s.interactRequested&&(s.interactRequested=!1,s.actions.Casting&&_l(s,"Casting",.18)),s.activeClip==="Casting"){t>0&&(s.castRemaining-=t);const d=s.actions.Casting,f=!!(d&&!d.isRunning()&&s.castRemaining<s.durations.Casting-.05);(s.castRemaining<=0||f)&&(s.castRemaining=0,_l(s,u?"Walking":"Idle",.24))}else{const d=u?"Walking":"Idle";s.activeClip!==d&&_l(s,d,s.crossFadeDuration)}t>0&&s.mixer.update(t)}}}class bh{constructor(){N(this,"name","AnimationSystem")}update(e,{dt:t,elapsed:n}){const i=e.query("Transform","AnimationState");for(const s of i){const r=e.getComponent(s,"Transform"),a=e.getComponent(s,"AnimationState");a.excitement=Math.max(0,a.excitement-t*1.6);const l=n*a.bobFrequency+a.phase,c=1+a.excitement*.65;if(a.bobAmplitude>0&&(r.y=a.baseY+Math.sin(l*c)*a.bobAmplitude),a.breatheAmplitude>0){const u=Math.sin(n*2.1+a.phase)*a.breatheAmplitude;r.scaleY=1+u,r.scaleX=1-u*.45,r.scaleZ=1-u*.45}if(!a.parts)continue;const h=Math.sin(n*(2.6+a.excitement*4.5)+a.phase)*(.08+a.excitement*.22);a.parts.leftWing&&(a.parts.leftWing.rotation.z=.28+h),a.parts.rightWing&&(a.parts.rightWing.rotation.z=-.28-h),a.parts.head&&(a.parts.head.rotation.z=Math.sin(n*1.4+a.phase)*.045),a.parts.leftFoot&&(a.parts.leftFoot.rotation.x=Math.sin(n*2.4+a.phase)*.06),a.parts.rightFoot&&(a.parts.rightFoot.rotation.x=-Math.sin(n*2.4+a.phase)*.06),a.parts.orbitRing&&(a.parts.orbitRing.rotation.x=Math.sin(n*.7)*.45+.6,a.parts.orbitRing.rotation.y=-n*.55)}}}const bp={background:"#0C1217",warmLight:"#4A7C7E",warmCore:"#8A99A6",coolAmbient:"#6E7B87",foliageAccent:"#2A3540",cursorLight:"#6E7B87"},wp="      .,'-~_:;^+=*!?rcvusaoenxz<>kpqdbwm0OQCJL8$&#%@",jr="./assets/models/cena_completa.glb",Js="./assets/draco/",wh={mode:"playground",modelUrl:jr,dracoDecoderPath:Js,atmosphere:"night",fov:58,enableKeyboard:!0,autoOrbit:!1,pauseOffscreen:!0,palette:{...bp},cellSize:8,autoResponsiveDensity:!0,characterRamp:wp,structuralChars:"/\\|_[]",edgeStrength:.96,blockBlendWeight:.06,windStrength:1,bloomIntensity:.28,bloomThreshold:.58,dofFocusDistance:.34,dofStrength:.2,parallaxIntensity:.35,parallaxSmoothing:6.5,cursorLightIntensity:.32,enableShadows:!0,maxFps:60,maxPixelRatio:2,pauseOnHiddenTab:!0,fontFamily:'"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace'};function Jr(o,e){return e?{...o,...e,palette:{...o.palette,...e.palette??{}},callbacks:e.callbacks?{...o.callbacks??{},...e.callbacks}:o.callbacks?{...o.callbacks}:void 0}:{...o,palette:{...o.palette},callbacks:o.callbacks?{...o.callbacks}:void 0}}class Tp{constructor(e){N(this,"rafId",null);N(this,"running",!1);N(this,"lastTimestamp",null);N(this,"elapsedSeconds",0);N(this,"maxFps");N(this,"accumFrames",0);N(this,"accumMs",0);N(this,"smoothedFps",60);N(this,"lastFrameMs",16.67);N(this,"onFrame");N(this,"onTelemetry");N(this,"tickBound");this.maxFps=e.maxFps,this.onFrame=e.onFrame,this.onTelemetry=e.onTelemetry,this.tickBound=this.tick.bind(this)}start(){this.running||(this.running=!0,this.lastTimestamp=null,this.schedule())}pause(){this.running&&(this.running=!1,this.cancel(),this.lastTimestamp=null)}resume(){this.start()}stop(){this.pause(),this.elapsedSeconds=0}setMaxFps(e){this.maxFps=e}isRunning(){return this.running}getElapsedSeconds(){return this.elapsedSeconds}getTelemetry(){return{fps:Math.round(this.smoothedFps),frameTimeMs:Number(this.lastFrameMs.toFixed(2))}}stepOnce(e=0){this.elapsedSeconds+=e,this.onFrame({dt:e,elapsed:this.elapsedSeconds,rawFrameMs:this.lastFrameMs})}schedule(){this.rafId===null&&this.running&&(this.rafId=window.requestAnimationFrame(this.tickBound))}cancel(){this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null)}tick(e){var s;if(this.rafId=null,!this.running)return;if(this.lastTimestamp===null){this.lastTimestamp=e,this.stepOnce(.016666666666666666),this.schedule();return}const t=e-this.lastTimestamp,n=this.maxFps>0?1e3/this.maxFps:0;if(n>0&&t<n-1.5){this.schedule();return}this.lastTimestamp=e;const i=Math.min(.1,Math.max(1e-4,t/1e3));if(this.lastFrameMs=t,this.stepOnce(i),this.accumFrames+=1,this.accumMs+=t,this.accumMs>=450){const r=this.accumFrames*1e3/this.accumMs;this.smoothedFps=this.smoothedFps*.35+r*.65,this.accumFrames=0,this.accumMs=0,(s=this.onTelemetry)==null||s.call(this,this.getTelemetry())}this.schedule()}}const NM=["map","alphaMap","aoMap","bumpMap","clearcoatMap","clearcoatNormalMap","clearcoatRoughnessMap","displacementMap","emissiveMap","envMap","iridescenceMap","iridescenceThicknessMap","lightMap","metalnessMap","normalMap","roughnessMap","sheenColorMap","sheenRoughnessMap","specularColorMap","specularIntensityMap","thicknessMap","transmissionMap"];class Yt{constructor(e){N(this,"container");N(this,"cleanups",[]);N(this,"disposed",!1);this.container=e??null}register(e){if(this.disposed){try{e()}catch{}return}this.cleanups.push(e)}registerCleanup(e){this.register(e)}observeContainer(e,t){const n=this.container;if(!n||typeof window>"u")return;let i=null;const s=(r,a)=>{r<=0||a<=0||(i!==null&&window.cancelAnimationFrame(i),i=window.requestAnimationFrame(()=>{var l;i=null,this.disposed||(l=e.onResize)==null||l.call(e,r,a)}))};if(typeof ResizeObserver<"u"){const r=new ResizeObserver(a=>{const l=a[0];l&&l.contentRect.width>0&&l.contentRect.height>0&&s(l.contentRect.width,l.contentRect.height)});r.observe(n),this.register(()=>{i!==null&&(window.cancelAnimationFrame(i),i=null),r.disconnect()})}if((t==null?void 0:t.observeViewportIntersection)!==!1&&typeof IntersectionObserver<"u"){const r=new IntersectionObserver(a=>{var c;const l=a[0];l&&!this.disposed&&((c=e.onVisibilityChange)==null||c.call(e,l.isIntersecting))},{threshold:.02});r.observe(n),this.register(()=>r.disconnect())}if((t==null?void 0:t.observeTabVisibility)!==!1&&typeof document<"u"){const r=()=>{var a;this.disposed||(a=e.onTabHiddenChange)==null||a.call(e,document.hidden)};document.addEventListener("visibilitychange",r),this.register(()=>document.removeEventListener("visibilitychange",r))}if(typeof document<"u"){const r=()=>{var c,h;if(this.disposed)return;const a=!!(document.fullscreenElement||(c=n.closest)!=null&&c.call(n,'[data-fullscreen-view="true"], .is-scene-fullscreen'));(h=e.onFullscreenChange)==null||h.call(e,a);const l=n.getBoundingClientRect();l.width>0&&l.height>0&&s(l.width,l.height)};document.addEventListener("fullscreenchange",r),this.register(()=>document.removeEventListener("fullscreenchange",r))}}static disposeMixer(e,t){if(e)try{e.stopAllAction();const n=t??e.getRoot();n&&e.uncacheRoot(n)}catch{}}static disposeObject3D(e){if(!e)return;const t=new Set,n=new Set,i=new Set;for(e.traverse(s=>{var l;const r=s;if(r.geometry&&!t.has(r.geometry)&&(t.add(r.geometry),r.geometry.dispose()),r.skeleton&&typeof r.skeleton.dispose=="function"&&r.skeleton.dispose(),r.material)if(Array.isArray(r.material))for(const c of r.material)Yt.disposeMaterial(c,n,i);else Yt.disposeMaterial(r.material,n,i);const a=s;a.isLight&&((l=a.shadow)!=null&&l.map)&&a.shadow.map.dispose()}),e.parent&&e.parent.remove(e);e.children.length>0;){const s=e.children[e.children.length-1];s&&e.remove(s)}}static disposeMaterial(e,t,n){var a;if(!e)return;if(t){if(t.has(e))return;t.add(e)}const i=e,s=l=>{if(!l||typeof l!="object")return;const c=l;if(!(!c.isTexture||typeof c.dispose!="function")){if(n){if(n.has(c))return;n.add(c)}c.dispose()}};for(const l of NM)s(i[l]);for(const l of Object.keys(i))s(i[l]);const r=e.uniforms;if(r&&typeof r=="object")for(const l of Object.keys(r))s((a=r[l])==null?void 0:a.value);e.dispose()}disposeAll(e){if(!this.disposed){this.disposed=!0;for(let t=this.cleanups.length-1;t>=0;t--)try{this.cleanups[t]()}catch{}this.cleanups.length=0,e&&Yt.disposeObject3D(e)}}isDisposed(){return this.disposed}}const Th=.625;function Ap(o,e,t){const n=Math.min(o,e);return t&&o<640?"mobile":o<460||n<280?o<380&&t?"mobile":"compact":o>=1440&&n>=520&&!t?"uhd":o>=960&&n>=400&&!t?"hd":o<720?"compact":"desktop"}function Ah(o){const e=Math.max(1,Math.floor(o.cssWidth)),t=Math.max(1,Math.floor(o.cssHeight)),n=Number.isFinite(o.devicePixelRatio)&&o.devicePixelRatio>0?o.devicePixelRatio:1,i=!!o.isCoarsePointer,s=Ap(e,t,i),r=s==="mobile"?Math.min(1.5,o.config.maxPixelRatio):o.config.maxPixelRatio,a=Math.max(1,Math.min(n,Math.max(1,r))),l=Math.max(2,Math.floor(e*a)),c=Math.max(2,Math.floor(t*a)),h=Math.max(5,Math.min(28,o.config.cellSize));let u=h;if(o.config.autoResponsiveDensity)if(o.config.mode==="mascot")s==="mobile"?u=Math.max(h,8.5):s==="compact"?u=Math.max(6.5,h*.92):(s==="hd"||s==="uhd")&&(u=Math.max(6.5,h*.85));else{const C=1.22-Math.max(0,Math.min(1,(e-360)/1240))*.32;s==="mobile"?u=Math.max(10.5,Math.round(h*Math.max(1.34,C))):s==="compact"?u=Math.max(8.8,Number((h*Math.max(1.08,C)).toFixed(2))):s==="hd"?u=Math.max(7.4,Number((h*Math.min(.95,C)).toFixed(2))):s==="uhd"?u=Math.max(6.9,Number((h*Math.min(.88,C)).toFixed(2))):u=Math.max(8,Number((h*C).toFixed(2))),o.isFullscreen&&s!=="mobile"&&(u=Math.max(6.5,Number((u*.93).toFixed(2))))}let d=Math.max(8,Math.round(u*a)),f=Math.max(6,Math.round(d*Th));const p=o.config.mode==="mascot"?78:190,v=o.config.mode==="mascot"?24:36,g=Math.floor(l/f);g>p?(f=Math.max(6,Math.ceil(l/p)),d=Math.max(8,Math.round(f/Th))):g<v&&l>=v*6&&(f=Math.max(6,Math.floor(l/v)),d=Math.max(8,Math.round(f/Th)));const m=Math.max(1,Math.floor(l/f)),_=Math.max(1,Math.floor(c/d)),x=Number((d/a).toFixed(2)),y=a>=1.5||d>=14?96:64,L=d>=12?.26:.18,w=s==="mobile"?4:3;return{tier:s,cssWidth:e,cssHeight:t,effectiveDpr:Number(a.toFixed(2)),physicalWidth:l,physicalHeight:c,activeCellSize:x,cellPhysW:f,cellPhysH:d,columns:m,rows:_,atlasTileSize:y,subCellSampleSpread:L,bloomDownsample:w}}class Ep{constructor(e=14){N(this,"currentCellW",0);N(this,"currentCellH",0);N(this,"targetCellW",8);N(this,"targetCellH",10);N(this,"currentSpread",.22);N(this,"targetSpread",.22);N(this,"transitionEnergy",0);N(this,"initialized",!1);N(this,"smoothingSpeed");this.smoothingSpeed=e}setTarget(e,t=!1){if(this.targetCellW=e.cellPhysW,this.targetCellH=e.cellPhysH,this.targetSpread=e.subCellSampleSpread,!this.initialized||t){this.currentCellW=e.cellPhysW,this.currentCellH=e.cellPhysH,this.currentSpread=e.subCellSampleSpread,this.transitionEnergy=0,this.initialized=!0;return}const n=Math.abs(this.targetCellW-this.currentCellW)+Math.abs(this.targetCellH-this.currentCellH);n>.05&&(this.transitionEnergy=Math.min(1,Math.max(this.transitionEnergy,n/6)))}step(e){if(!this.initialized)return{cellW:this.targetCellW,cellH:this.targetCellH,subCellSpread:this.targetSpread,transitionMix:0,isTransitioning:!1};const t=Math.max(0,Math.min(.1,e)),n=t>0?1-Math.exp(-this.smoothingSpeed*t):1;return this.currentCellW+=(this.targetCellW-this.currentCellW)*n,this.currentCellH+=(this.targetCellH-this.currentCellH)*n,this.currentSpread+=(this.targetSpread-this.currentSpread)*n,this.transitionEnergy*=Math.exp(-9.5*t),Math.abs(this.targetCellW-this.currentCellW)+Math.abs(this.targetCellH-this.currentCellH)<.06&&this.transitionEnergy<.03?(this.currentCellW=this.targetCellW,this.currentCellH=this.targetCellH,this.currentSpread=this.targetSpread,this.transitionEnergy=0,{cellW:this.targetCellW,cellH:this.targetCellH,subCellSpread:this.targetSpread,transitionMix:0,isTransitioning:!1}):{cellW:this.currentCellW,cellH:this.currentCellH,subCellSpread:Math.max(this.currentSpread,.28),transitionMix:Math.min(1,this.transitionEnergy),isTransitioning:!0}}}function Ml(o,e,t){let n=et.clamp(o,t.minX,t.maxX),i=et.clamp(e,t.minZ,t.maxZ);if(n<t.plazaMinX||n>t.plazaMaxX){const s=n>=t.westStorefrontMinX&&n<=t.westStorefrontMaxX?t.westStorefrontMinZ:t.corridorMinZ;i=et.clamp(i,s,t.corridorMaxZ)}for(let s=0;s<t.obstacles.length;s++){const r=t.obstacles[s];if(n>r.minX&&n<r.maxX&&i>r.minZ&&i<r.maxZ){const a=n-r.minX,l=r.maxX-n,c=i-r.minZ,h=r.maxZ-i,u=Math.min(a,l,c,h);u===a?n=r.minX:u===l?n=r.maxX:u===c?i=r.minZ:i=r.maxZ}}return n=et.clamp(n,t.minX,t.maxX),i=et.clamp(i,t.minZ,t.maxZ),{x:n,z:i}}class Cp{constructor(e,t,n=null){N(this,"name","InputSystem");N(this,"pointer");N(this,"keyboard");N(this,"camera");N(this,"raycaster",new up);N(this,"tapNdc",new j);N(this,"groundPlane",new ii(new E(0,1,0),0));N(this,"groundHit",new E);this.pointer=e,this.keyboard=t,this.camera=n}setCamera(e){this.camera=e}update(e,{dt:t}){const n=this.pointer.sample(t),i=this.pointer.consumeTap(),s=this.keyboard.sampleAxes(),r=Math.abs(s.moveX)>.01||Math.abs(s.moveZ)>.01;if(i&&!r){const l=e.query("Transform","NavigationTarget");for(const c of l){const h=e.getComponent(c,"Transform"),u=e.getComponent(c,"NavigationTarget"),d=e.getComponent(c,"SidewalkBounds"),f=d?d.groundY:h.y;let p=h.x+i.ndcX*3.5,v=h.z-i.ndcY*4.5;if(this.camera)if(this.camera.updateMatrixWorld(),this.tapNdc.set(i.ndcX,i.ndcY),this.raycaster.setFromCamera(this.tapNdc,this.camera),this.groundPlane.constant=-f,this.raycaster.ray.direction.y<-.025){const g=this.raycaster.ray.intersectPlane(this.groundPlane,this.groundHit);g&&(p=g.x,v=g.z)}else{const g=this.raycaster.ray.direction.x,m=this.raycaster.ray.direction.z,_=Math.hypot(g,m)||1;p=this.raycaster.ray.origin.x+g/_*10,v=this.raycaster.ray.origin.z+m/_*10}if(d){const g=Ml(p,v,d);u.targetX=g.x,u.targetZ=g.z}else u.targetX=et.clamp(p,u.minX,u.maxX),u.targetZ=et.clamp(v,u.minZ,u.maxZ);u.active=!0}}const a=e.query("InputState");for(const l of a){const c=e.getComponent(l,"InputState"),h=e.getComponent(l,"NavigationTarget"),u=e.getComponent(l,"CharacterAnimation");c.pointerX=n.normX,c.pointerY=n.normY,c.pointerActive=n.active,c.isDragging=n.isDown,c.moveX=s.moveX,c.moveZ=s.moveZ,r&&h&&(h.active=!1),s.interactPressed&&u&&(u.interactRequested=!0,h&&(h.active=!1));const d=e.getComponent(l,"RotationTarget");if(d&&n.active&&!h&&!u){const p=n.normX*c.yawSensitivity+n.dragYaw*.85,v=-n.normY*c.pitchSensitivity+n.dragPitch*.65;d.targetYaw=p,d.targetPitch=et.clamp(v,-d.maxPitch,d.maxPitch),d.targetRoll=-n.normX*.06}const f=e.getComponent(l,"AnimationState");f&&n.motionSpeed>.04&&(f.excitement=Math.min(1,f.excitement+n.motionSpeed*.25))}}}class Rp{constructor(){N(this,"name","TrafficFlowSystem")}update(e,{elapsed:t}){const n=e.query("Transform","TrafficCycle","Renderable");for(const i of n){const s=e.getComponent(i,"Transform"),r=e.getComponent(i,"TrafficCycle"),a=e.getComponent(i,"Renderable"),l=Math.max(.1,r.cycleDuration),c=et.clamp(r.activeDuration,.05,l),h=(t+r.timeOffset)%l,u=h<0?h+l:h;if(u<c){const f=u/c,p=et.lerp(r.startZ,r.endZ,f),v=et.clamp(u/.35,.15,1),g=et.clamp((c-u)/.35,.15,1),m=Math.min(v,g);if(s.x=r.laneX,s.y=r.laneY,s.z=p,s.rotY=r.headingYaw,a.object3D.visible=!0,r.headlightLeft&&(r.headlightLeft.visible=!0,r.headlightLeft.intensity=r.baseSpotIntensity*m),r.headlightRight&&(r.headlightRight.visible=!0,r.headlightRight.intensity=r.baseSpotIntensity*m),r.streetThrowLight&&(r.streetThrowLight.visible=!0,r.streetThrowLight.intensity=r.basePointIntensity*m),r.taillightGlow&&(r.taillightGlow.visible=!0,r.taillightGlow.intensity=r.baseTailIntensity*m),r.headlightMaterials)for(const _ of r.headlightMaterials)_.emissiveIntensity=.85*m}else if(a.object3D.visible=!1,s.x=r.laneX,s.y=r.laneY,s.z=r.startZ-24,r.headlightLeft&&(r.headlightLeft.visible=!1,r.headlightLeft.intensity=0),r.headlightRight&&(r.headlightRight.visible=!1,r.headlightRight.intensity=0),r.streetThrowLight&&(r.streetThrowLight.visible=!1,r.streetThrowLight.intensity=0),r.taillightGlow&&(r.taillightGlow.visible=!1,r.taillightGlow.intensity=0),r.headlightMaterials)for(const f of r.headlightMaterials)f.emissiveIntensity=0}}}class Eh{constructor(e=null){N(this,"name","MovementRotationSystem");N(this,"waypointMarker");this.waypointMarker=e}setWaypointMarker(e){this.waypointMarker=e}update(e,{dt:t,elapsed:n}){let i=0,s=0,r=.1,a=!1;const l=e.query("Transform","Velocity");for(const h of l){const u=e.getComponent(h,"Transform"),d=e.getComponent(h,"Velocity"),f=e.getComponent(h,"InputState"),p=e.getComponent(h,"NavigationTarget"),v=e.getComponent(h,"SidewalkBounds"),g=e.getComponent(h,"CharacterAnimation"),m=e.getComponent(h,"RotationTarget");if(!!(g&&g.activeClip==="Casting"))d.vx=0,d.vz=0,p&&(p.active=!1);else if(f&&f.moveSpeed>0&&(Math.abs(f.moveX)>.001||Math.abs(f.moveZ)>.001))p&&(p.active=!1),d.vx=f.moveX*f.moveSpeed,d.vz=f.moveZ*f.moveSpeed,m&&(m.targetYaw=Math.atan2(d.vx,d.vz),m.targetPitch=0,m.targetRoll=0),u.x+=d.vx*t,u.z+=d.vz*t;else if(p&&p.active){const x=u.x,y=u.z,L=p.targetX-u.x,w=p.targetZ-u.z,A=Math.hypot(L,w);if(A<=p.arrivalRadius)u.x=p.targetX,u.z=p.targetZ,d.vx=0,d.vz=0,p.active=!1;else{const C=et.clamp(A/.65,.35,1),S=p.moveSpeed*C,M=L/A,P=w/A,H=Math.min(A,S*t);if(d.vx=M*S,d.vz=P*S,u.x+=M*H,u.z+=P*H,m&&(m.targetYaw=Math.atan2(M,P),m.targetPitch=0,m.targetRoll=0),v){const z=Ml(u.x,u.z,v),V=Math.hypot(z.x-x,z.z-y);u.x=z.x,u.z=z.z,t>.001&&V<H*.15&&(d.vx=0,d.vz=0,p.active=!1)}Math.hypot(p.targetX-u.x,p.targetZ-u.z)<=p.arrivalRadius?(u.x=p.targetX,u.z=p.targetZ,d.vx=0,d.vz=0,p.active=!1):p.active&&(a=!0,i=p.targetX,s=p.targetZ)}}else{const x=Math.exp(-d.damping*t);d.vx*=x,d.vy*=x,d.vz*=x,Math.hypot(d.vx,d.vz)<.03&&(d.vx=0,d.vz=0),u.x+=d.vx*t,u.y+=d.vy*t,u.z+=d.vz*t}if(u.rotX+=d.angularVx*t,u.rotY+=d.angularVy*t,u.rotZ+=d.angularVz*t,v){const x=Ml(u.x,u.z,v);u.x=x.x,u.z=x.z,u.y=v.groundY,r=v.groundY+.025}else if(p)u.x=et.clamp(u.x,p.minX,p.maxX),u.z=et.clamp(u.z,p.minZ,p.maxZ);else if(f&&f.boundsRadius>0){const x=Math.hypot(u.x,u.z);if(x>f.boundsRadius){const y=f.boundsRadius/x;u.x*=y,u.z*=y}}}if(this.waypointMarker&&(this.waypointMarker.visible=a,a)){this.waypointMarker.position.set(i,r,s);const h=.92+Math.sin(n*5)*.08;this.waypointMarker.scale.set(h,1,h)}const c=e.query("Transform","RotationTarget");for(const h of c){const u=e.getComponent(h,"Transform"),d=e.getComponent(h,"RotationTarget"),f=e.getComponent(h,"InputState"),p=e.getComponent(h,"NavigationTarget"),v=e.getComponent(h,"CharacterAnimation"),g=1-Math.exp(-d.lerpSpeed*t);if(v||p){const m=Math.atan2(Math.sin(d.targetYaw-u.rotY),Math.cos(d.targetYaw-u.rotY));u.rotY+=m*g,u.rotX=et.lerp(u.rotX,d.targetPitch,g),u.rotZ=et.lerp(u.rotZ,d.targetRoll,g)}else if(f&&f.pointerActive){const m=Math.atan2(Math.sin(d.targetYaw-u.rotY),Math.cos(d.targetYaw-u.rotY));u.rotY+=m*g,u.rotX+=(d.targetPitch-u.rotX)*g,u.rotZ+=(d.targetRoll-u.rotZ)*g}else if(d.idleSpinSpeed!==0)u.rotY+=d.idleSpinSpeed*t,u.rotX+=(Math.sin(n*.9)*.04-u.rotX)*g,u.rotZ+=(0-u.rotZ)*g;else{const m=Math.sin(n*.85)*.28,_=Math.cos(n*.65)*.06;u.rotY+=(m-u.rotY)*(g*.6),u.rotX+=(_-u.rotX)*(g*.6),u.rotZ+=(0-u.rotZ)*g}}}}class Lp{constructor(e=null){N(this,"name","CameraFollowSystem");N(this,"camera");N(this,"lookTarget",new E);this.camera=e}setCamera(e){this.camera=e}update(e,{dt:t}){if(!this.camera)return;const n=e.query("Transform","CameraFollow");if(n.length===0)return;const i=n[0],s=e.getComponent(i,"Transform"),r=e.getComponent(i,"CameraFollow");let a=r.offsetX,l=r.offsetZ;if(r.autoOrbit){t>0&&(r.orbitAngle+=r.orbitSpeed*t);const v=Math.hypot(r.offsetX,r.offsetZ),m=Math.atan2(r.offsetX,r.offsetZ)+Math.sin(r.orbitAngle)*.34;a=Math.sin(m)*v,l=Math.cos(m)*v}else r.orbitAngle!==0&&t>0&&(r.orbitAngle=et.lerp(r.orbitAngle,0,1-Math.exp(-3*t)),Math.abs(r.orbitAngle)<.001&&(r.orbitAngle=0));const c=s.x+a,h=s.y+r.offsetY,u=s.z+l,d=s.x+r.lookAtOffsetX,f=s.y+r.lookAtOffsetY,p=s.z+r.lookAtOffsetZ;if(!r.initialized||t<=0)this.camera.position.set(c,h,u),r.currentLookX=d,r.currentLookY=f,r.currentLookZ=p,r.initialized=!0;else{const v=1-Math.exp(-r.followSharpness*t);this.camera.position.x=et.lerp(this.camera.position.x,c,v),this.camera.position.y=et.lerp(this.camera.position.y,h,v),this.camera.position.z=et.lerp(this.camera.position.z,u,v),r.currentLookX=et.lerp(r.currentLookX??d,d,v),r.currentLookY=et.lerp(r.currentLookY??f,f,v),r.currentLookZ=et.lerp(r.currentLookZ??p,p,v)}this.lookTarget.set(r.currentLookX??d,r.currentLookY??f,r.currentLookZ??p),this.camera.lookAt(this.lookTarget),this.camera.updateMatrixWorld()}}class Pp{constructor(e=null){N(this,"name","LineOfSightOcclusionSystem");N(this,"camera");N(this,"ray",new Gi);N(this,"rayDir",new E);N(this,"hitPoint",new E);N(this,"expandedBox",new Ct);N(this,"sampleTarget",new E);N(this,"playerNdc",new E);N(this,"cornerVec",new E);this.camera=e}setCamera(e){this.camera=e}segmentIntersectsExpandedBox(e,t,n,i){if(this.expandedBox.copy(n).expandByScalar(i),this.expandedBox.containsPoint(e))return!0;this.rayDir.subVectors(t,e);const s=this.rayDir.length();if(s<=.05)return!1;this.rayDir.multiplyScalar(1/s),this.ray.set(e,this.rayDir);const r=this.ray.intersectBox(this.expandedBox,this.hitPoint);return r?e.distanceTo(r)<s-.12:!1}update(e){if(!this.camera)return;const t=e.query("ForegroundOccluders");if(t.length===0)return;const n=e.query("Transform","CharacterAnimation"),i=n.length>0?e.getComponent(n[0],"Transform"):void 0;this.camera.updateMatrixWorld(),this.camera.updateProjectionMatrix();const s=this.camera.position;let r=!1,a=1/0;i&&(this.sampleTarget.set(i.x,i.y+1.05,i.z),a=s.distanceTo(this.sampleTarget),this.playerNdc.copy(this.sampleTarget).project(this.camera),r=!0);for(const l of t){const c=e.getComponent(l,"ForegroundOccluders");this.sampleTarget.set(c.centralFocusX,c.centralFocusY,c.centralFocusZ);const h=s.distanceTo(this.sampleTarget);for(const u of c.groups){let d=!1;if(i){const f=u.occluded?c.playerClearanceRadius+.35:c.playerClearanceRadius;for(const p of[.35,1.05,1.72])if(this.sampleTarget.set(i.x,i.y+p,i.z),this.segmentIntersectsExpandedBox(s,this.sampleTarget,u.worldBox,f)){d=!0;break}}if(d||(this.sampleTarget.set(c.centralFocusX,c.centralFocusY,c.centralFocusZ),this.segmentIntersectsExpandedBox(s,this.sampleTarget,u.worldBox,1.85)&&(d=!0)),!d){const f=u.worldBox;let p=1/0,v=-1/0,g=1/0,m=-1/0,_=1/0;for(let S=0;S<2;S++){const M=S===0?f.min.x:f.max.x;for(let P=0;P<2;P++){const H=P===0?f.min.y:f.max.y;for(let k=0;k<2;k++){const z=k===0?f.min.z:f.max.z;this.cornerVec.set(M,H,z);const V=s.distanceTo(this.cornerVec);V<_&&(_=V),this.cornerVec.project(this.camera),this.cornerVec.z<=1.05&&(this.cornerVec.x<p&&(p=this.cornerVec.x),this.cornerVec.x>v&&(v=this.cornerVec.x),this.cornerVec.y<g&&(g=this.cornerVec.y),this.cornerVec.y>m&&(m=this.cornerVec.y))}}}const x=u.occluded?.05:0,y=c.centralNdcHalfWidth+x,L=c.centralNdcHalfHeight+x,w=_<h+1.2&&v>-y&&p<y&&m>-L&&g<L,A=.22+x,C=r&&_<a+.5&&v>this.playerNdc.x-A&&p<this.playerNdc.x+A&&m>this.playerNdc.y-.28&&g<this.playerNdc.y+.34;(w||C)&&(d=!0)}u.occluded!==d&&(u.occluded=d);for(const f of u.meshes)f.visible=!d}}}}class Ch{constructor(){N(this,"name","RenderSyncSystem")}update(e,{elapsed:t}){const n=e.query("Transform","Renderable");for(const i of n){const s=e.getComponent(i,"Transform"),r=e.getComponent(i,"Renderable");if(r.object3D.position.set(s.x,s.y,s.z),r.object3D.rotation.set(s.rotX,s.rotY,s.rotZ),r.object3D.scale.set(s.scaleX,s.scaleY,s.scaleZ),r.pointLight&&r.baseLightIntensity!==void 0){const a=r.lightFlickerSpeed??7.2,l=1+Math.sin(t*a+i*1.7)*.08+Math.sin(t*a*2.13+i)*.04;r.pointLight.intensity=r.baseLightIntensity*l}}}}class Ip{constructor(){N(this,"entries",[]);N(this,"nextOrder",0)}addSystem(e,t){const n=t??(this.entries.length+1)*10;return this.entries.push({priority:n,order:this.nextOrder++,system:e}),this.entries.sort((i,s)=>i.priority!==s.priority?i.priority-s.priority:i.order-s.order),this}removeSystem(e){const t=this.entries.findIndex(n=>n.system.name===e);return t===-1?!1:(this.entries.splice(t,1),!0)}getSystemNames(){return this.entries.map(e=>e.system.name)}run(e,t){for(let n=0;n<this.entries.length;n++)this.entries[n].system.update(e,t)}clear(){this.entries.length=0,this.nextOrder=0}}class Dp{constructor(){N(this,"nextEntityId",1);N(this,"entities",new Set);N(this,"stores",{Transform:new Map,Velocity:new Map,RotationTarget:new Map,AnimationState:new Map,CharacterAnimation:new Map,SidewalkBounds:new Map,TrafficCycle:new Map,ForegroundOccluders:new Map,Renderable:new Map,DepthLayer:new Map,LifecycleTag:new Map,InputState:new Map,NavigationTarget:new Map,CameraFollow:new Map})}createEntity(){const e=this.nextEntityId++;return this.entities.add(e),e}hasEntity(e){return this.entities.has(e)}getEntityCount(){return this.entities.size}addComponent(e,t,n){if(!this.entities.has(e))throw new Error(`[ECS World] Cannot add component "${t}" to non-existent entity ${e}`);return this.stores[t].set(e,n),this}getComponent(e,t){return this.stores[t].get(e)}hasComponent(e,t){return this.stores[t].has(e)}removeComponent(e,t){return this.stores[t].delete(e)}query(...e){if(e.length===0)return Array.from(this.entities);let t=this.stores[e[0]];for(let i=1;i<e.length;i++){const s=this.stores[e[i]];s.size<t.size&&(t=s)}const n=[];for(const i of t.keys()){let s=!0;for(let r=0;r<e.length;r++)if(!this.stores[e[r]].has(i)){s=!1;break}s&&n.push(i)}return n}destroyEntity(e,t=!0){var r,a,l;if(!this.entities.has(e))return!1;const n=this.stores.CharacterAnimation.get(e);n&&(n.disposeListener&&n.disposeListener(),Yt.disposeMixer(n.mixer,n.root));const i=this.stores.TrafficCycle.get(e);if(i){const c=[i.headlightLeft,i.headlightRight,i.streetThrowLight,i.taillightGlow];for(const h of c)h&&((r=h.target)!=null&&r.parent&&h.target.parent.remove(h.target),(a=h.shadow)!=null&&a.map&&h.shadow.map.dispose(),h.parent&&h.parent.remove(h),typeof h.dispose=="function"&&h.dispose())}const s=this.stores.Renderable.get(e);s&&t&&s.disposeOnDestroy!==!1&&(s.pointLight&&((l=s.pointLight.shadow)!=null&&l.map&&s.pointLight.shadow.map.dispose(),s.pointLight.parent&&s.pointLight.parent.remove(s.pointLight),s.pointLight.dispose()),Yt.disposeObject3D(s.object3D));for(const c of Object.values(this.stores))c.delete(e);return this.entities.delete(e)}queryByLayer(e){const t=[];for(const[n,i]of this.stores.DepthLayer.entries())i.layer===e&&t.push(n);return t}destroyEntitiesByRole(e,t=!0){const n=[];for(const[i,s]of this.stores.LifecycleTag.entries())s.role===e&&n.push(i);for(const i of n)this.destroyEntity(i,t);return n.length}clear(e=!0){const t=Array.from(this.entities);for(const n of t)this.destroyEntity(n,e);this.entities.clear(),this.nextEntityId=1}}function Up(o,e,t){const n=Math.max(0,Math.min(1,(t-o)/(e-o)));return n*n*(3-2*n)}function FM(o,e){const n=new Dt(.76,64,48),i=n.getAttribute("position"),s=i.count,r=new Float32Array(s*3),a=new q;for(let l=0;l<s;l++){const c=i.getX(l),h=i.getY(l),u=i.getZ(l),d=h/.76,f=1-.19*d,p=1-.13*d,v=c*.92*f,g=h*1.18,m=u*.82*p;i.setXYZ(l,v,g,m);const _=v/.46,x=(g+.05)/.65,y=Math.hypot(_,x),L=Up(.08,.28,m/.62),w=(1-Up(.86,1.02,y))*L;a.lerpColors(o,e,w),r[l*3]=a.r,r[l*3+1]=a.g,r[l*3+2]=a.b}return i.needsUpdate=!0,n.setAttribute("color",new Je(r,3)),n.computeVertexNormals(),n}class Np{static spawn(e,t,n){const i=(n==null?void 0:n.position)??[0,-.35,0],s=(n==null?void 0:n.scale)??1,r=new Vt;r.name="TuxMascotRoot";const a=new q(527636),l=new q(16055039),c=new xn({color:a,roughness:.64,metalness:.04,flatShading:!1}),h=new xn({color:16777215,vertexColors:!0,roughness:.64,metalness:0,flatShading:!1}),u=new xn({color:16752412,emissive:3873024,emissiveIntensity:.34,roughness:.52,metalness:0,flatShading:!1}),d=new zt({color:16186367}),f=new zt({color:329740}),p=new Ne(FM(a,l),h);p.name="TuxTorso",p.position.set(0,.86,0),p.castShadow=!0,p.receiveShadow=!1,p.userData.coatColor=a.clone(),p.userData.bellyColor=l.clone(),r.add(p);const v=new Vt;v.name="TuxHeadPivot",v.position.set(0,1.72,.03);const g=new Ne(new Dt(.48,48,36),c);g.name="TuxHead",g.scale.set(.98,.95,.9),g.castShadow=!0,g.receiveShadow=!1,v.add(g);for(const k of[-1,1]){const z=new Ne(new Dt(.132,24,18),d);z.position.set(k*.162,.095,.405),z.scale.set(.96,1.16,.58),v.add(z);const V=new Ne(new Dt(.048,18,14),f);V.position.set(k*.152,.095,.472),V.scale.set(.92,.96,.55),v.add(V)}const m=new Ne(new Dt(.21,32,24),u);m.name="TuxUpperBeak",m.scale.set(1.16,.42,1.24),m.position.set(0,-.055,.43),m.rotation.x=.08,m.castShadow=!0,m.receiveShadow=!1,v.add(m);const _=new Ne(new Dt(.17,28,20),u);_.name="TuxLowerBeak",_.scale.set(1.02,.3,1.02),_.position.set(0,-.115,.4),_.rotation.x=.16,_.castShadow=!0,_.receiveShadow=!1,v.add(_),r.add(v);const x=new Vt;x.position.set(-.65,1.32,.02),x.rotation.z=.28;const y=new Ne(new Dt(.22,32,24),c);y.position.set(-.06,-.38,0),y.scale.set(.42,2.05,.96),y.castShadow=!0,y.receiveShadow=!1,x.add(y),r.add(x);const L=new Vt;L.position.set(.65,1.32,.02),L.rotation.z=-.28;const w=new Ne(new Dt(.22,32,24),c);w.position.set(.06,-.38,0),w.scale.set(.42,2.05,.96),w.castShadow=!0,w.receiveShadow=!1,L.add(w),r.add(L);const A=new Vt;A.position.set(-.34,.08,.34),A.rotation.y=.26;const C=new Ne(new Dt(.24,28,20),u);C.scale.set(.84,.3,1.18),C.position.set(0,.01,.12),C.castShadow=!0,C.receiveShadow=!1,A.add(C),r.add(A);const S=new Vt;S.position.set(.34,.08,.34),S.rotation.y=-.26;const M=new Ne(new Dt(.24,28,20),u);M.scale.set(.84,.3,1.18),M.position.set(0,.01,.12),M.castShadow=!0,M.receiveShadow=!1,S.add(M),r.add(S);const P=new Ne(new Dt(.17,24,18),c);if(P.position.set(0,.22,-.6),P.scale.set(.85,.72,1.35),P.rotation.x=-.24,P.castShadow=!0,P.receiveShadow=!1,r.add(P),n!=null&&n.includeShowcaseRig){const k=new xn({color:1782596,roughness:.82,metalness:.08,flatShading:!1}),z=new Ne(new bi(.92,1.08,.16,32),k);z.name="TuxShowcasePlinth",z.userData.isShowcasePedestal=!0,z.position.set(0,-.06,.08),z.receiveShadow=!0,r.add(z)}r.position.set(i[0],i[1],i[2]),r.scale.setScalar(s),t.add(r);const H=e.createEntity();return e.addComponent(H,"Transform",{x:i[0],y:i[1],z:i[2],rotX:0,rotY:.14,rotZ:0,scaleX:s,scaleY:s,scaleZ:s}),e.addComponent(H,"Velocity",{vx:0,vy:0,vz:0,angularVx:0,angularVy:0,angularVz:0,damping:6.5}),e.addComponent(H,"RotationTarget",{targetYaw:.14,targetPitch:0,targetRoll:0,lerpSpeed:6.2,idleSpinSpeed:0,maxPitch:.46}),e.addComponent(H,"AnimationState",{baseY:i[1],bobAmplitude:(n==null?void 0:n.bobAmplitude)??.045,bobFrequency:2.1,breatheAmplitude:.022,phase:.3,excitement:0,parts:{leftWing:x,rightWing:L,head:v,leftFoot:A,rightFoot:S}}),e.addComponent(H,"InputState",{pointerX:0,pointerY:0,pointerActive:!1,isDragging:!1,moveX:0,moveZ:0,yawSensitivity:1.25,pitchSensitivity:.4,moveSpeed:(n==null?void 0:n.moveSpeed)??0,boundsRadius:(n==null?void 0:n.boundsRadius)??0}),e.addComponent(H,"Renderable",{object3D:r}),{entityId:H,rootGroup:r}}}class Fp{constructor(e){N(this,"pressed",new Set);N(this,"enabled",!1);N(this,"attached",!1);N(this,"interactQueued",!1);N(this,"container",null);N(this,"pointerInsideContainer",!1);N(this,"onKeyDownBound");N(this,"onKeyUpBound");N(this,"onBlurBound");N(this,"onPointerEnterBound");N(this,"onPointerLeaveBound");if(e&&typeof e=="object"&&("enabled"in e||"focusTarget"in e)){const t=e;this.enabled=!!t.enabled,this.container=t.focusTarget??null}else this.container=e??null;this.onKeyDownBound=this.handleKeyDown.bind(this),this.onKeyUpBound=this.handleKeyUp.bind(this),this.onBlurBound=this.handleBlur.bind(this),this.onPointerEnterBound=()=>{this.pointerInsideContainer=!0},this.onPointerLeaveBound=()=>{this.pointerInsideContainer=!1}}setContainer(e){this.container!==e&&(this.attached&&this.container&&typeof this.container.removeEventListener=="function"&&(this.container.removeEventListener("pointerenter",this.onPointerEnterBound),this.container.removeEventListener("pointerleave",this.onPointerLeaveBound)),this.container=e,this.pointerInsideContainer=!1,this.attached&&this.container&&typeof this.container.addEventListener=="function"&&(this.container.addEventListener("pointerenter",this.onPointerEnterBound,{passive:!0}),this.container.addEventListener("pointerleave",this.onPointerLeaveBound,{passive:!0})))}setEnabled(e){this.enabled!==e&&(this.enabled=e,e?this.attach():this.detach())}isEnabled(){return this.enabled}attach(){this.attached||typeof window>"u"||typeof window.addEventListener!="function"||(this.attached=!0,window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound),window.addEventListener("blur",this.onBlurBound),this.container&&typeof this.container.addEventListener=="function"&&(this.container.addEventListener("pointerenter",this.onPointerEnterBound,{passive:!0}),this.container.addEventListener("pointerleave",this.onPointerLeaveBound,{passive:!0})))}detach(){this.attached&&(this.attached=!1,this.pressed.clear(),this.interactQueued=!1,this.pointerInsideContainer=!1,typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),window.removeEventListener("blur",this.onBlurBound)),this.container&&typeof this.container.removeEventListener=="function"&&(this.container.removeEventListener("pointerenter",this.onPointerEnterBound),this.container.removeEventListener("pointerleave",this.onPointerLeaveBound)))}setKeyState(e,t){this.enabled&&(t?(!this.pressed.has(e)&&(e==="KeyE"||e==="Space")&&(this.interactQueued=!0),this.pressed.add(e)):this.pressed.delete(e))}sampleAxes(){if(!this.enabled)return{moveX:0,moveZ:0,interactPressed:!1};let e=0,t=0;(this.pressed.has("KeyA")||this.pressed.has("ArrowLeft"))&&(e-=1),(this.pressed.has("KeyD")||this.pressed.has("ArrowRight"))&&(e+=1),(this.pressed.has("KeyW")||this.pressed.has("ArrowUp"))&&(t-=1),(this.pressed.has("KeyS")||this.pressed.has("ArrowDown"))&&(t+=1);const n=Math.hypot(e,t);n>1&&(e/=n,t/=n);const i=this.interactQueued;return this.interactQueued=!1,{moveX:e,moveZ:t,interactPressed:i}}isSceneStageFocusedOrHovered(){var e,t,n,i;return this.pointerInsideContainer?!0:typeof document>"u"?!1:!!(document.fullscreenElement||(t=(e=document.body)==null?void 0:e.classList)!=null&&t.contains("scene-fullscreen-active")||this.container&&document.activeElement&&((i=(n=this.container).contains)!=null&&i.call(n,document.activeElement)))}handleKeyDown(e){var r;if(!this.enabled||e.ctrlKey||e.metaKey||e.altKey)return;const t=typeof document<"u"?document.activeElement:null;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;const n=e.code,i=n==="KeyW"||n==="KeyA"||n==="KeyS"||n==="KeyD"||n==="KeyE",s=n==="ArrowUp"||n==="ArrowDown"||n==="ArrowLeft"||n==="ArrowRight"||n==="Space";if(!(!i&&!s)){if(s){if(!this.isSceneStageFocusedOrHovered())return;(r=e.preventDefault)==null||r.call(e)}!e.repeat&&(n==="KeyE"||n==="Space")&&(this.interactQueued=!0),this.pressed.add(n)}}handleKeyUp(e){this.pressed.delete(e.code)}handleBlur(){this.pressed.clear(),this.interactQueued=!1}}const Op=14*14,Rh=320;class Bp{constructor(e,t){N(this,"container");N(this,"trackWindowHover");N(this,"normX",0);N(this,"normY",0);N(this,"dragYaw",0);N(this,"dragPitch",0);N(this,"active",!1);N(this,"isDown",!1);N(this,"isTouch",!1);N(this,"activeTouchId",null);N(this,"lastClientX",0);N(this,"lastClientY",0);N(this,"downOriginX",0);N(this,"downOriginY",0);N(this,"maxGestureDistSq",0);N(this,"gestureActive",!1);N(this,"hasPendingTap",!1);N(this,"lastTapRecordedMs",0);N(this,"pendingTap",{ndcX:0,ndcY:0});N(this,"motionSpeed",0);N(this,"lastInteractionMs",0);N(this,"touchReleaseHoldTimer",0);N(this,"attached",!1);N(this,"onPointerDownBound");N(this,"onPointerMoveBound");N(this,"onWindowPointerMoveBound");N(this,"onPointerUpBound");N(this,"onPointerCancelBound");N(this,"onPointerLeaveBound");N(this,"onTouchStartBound");N(this,"onTouchMoveBound");N(this,"onTouchEndBound");N(this,"onTouchCancelBound");N(this,"onClickBound");this.container=e,this.trackWindowHover=!!(t!=null&&t.trackWindowHover),this.onPointerDownBound=this.handlePointerDown.bind(this),this.onPointerMoveBound=this.handleContainerPointerMove.bind(this),this.onWindowPointerMoveBound=this.handleWindowPointerMove.bind(this),this.onPointerUpBound=this.handlePointerUp.bind(this),this.onPointerCancelBound=this.handlePointerCancel.bind(this),this.onPointerLeaveBound=this.handlePointerLeave.bind(this),this.onTouchStartBound=this.handleTouchStart.bind(this),this.onTouchMoveBound=this.handleTouchMove.bind(this),this.onTouchEndBound=this.handleTouchEnd.bind(this),this.onTouchCancelBound=this.handleTouchCancel.bind(this),this.onClickBound=this.handleClick.bind(this)}attach(){this.attached||(this.attached=!0,this.container.style.touchAction||(this.container.style.touchAction="pan-y"),this.container.addEventListener("pointerdown",this.onPointerDownBound,{passive:!0}),this.container.addEventListener("pointermove",this.onPointerMoveBound,{passive:!0}),this.container.addEventListener("pointerup",this.onPointerUpBound,{passive:!0}),this.container.addEventListener("pointercancel",this.onPointerCancelBound,{passive:!0}),this.container.addEventListener("pointerleave",this.onPointerLeaveBound,{passive:!0}),this.container.addEventListener("click",this.onClickBound,{passive:!0}),this.container.addEventListener("touchstart",this.onTouchStartBound,{passive:!0}),this.container.addEventListener("touchmove",this.onTouchMoveBound,{passive:!0}),this.container.addEventListener("touchend",this.onTouchEndBound,{passive:!0}),this.container.addEventListener("touchcancel",this.onTouchCancelBound,{passive:!0}),this.trackWindowHover&&typeof window<"u"&&(window.addEventListener("pointermove",this.onWindowPointerMoveBound,{passive:!0}),window.addEventListener("pointerup",this.onPointerUpBound,{passive:!0})))}detach(){this.attached&&(this.attached=!1,this.hasPendingTap=!1,this.gestureActive=!1,this.container.removeEventListener("pointerdown",this.onPointerDownBound),this.container.removeEventListener("pointermove",this.onPointerMoveBound),this.container.removeEventListener("pointerup",this.onPointerUpBound),this.container.removeEventListener("pointercancel",this.onPointerCancelBound),this.container.removeEventListener("pointerleave",this.onPointerLeaveBound),this.container.removeEventListener("click",this.onClickBound),this.container.removeEventListener("touchstart",this.onTouchStartBound),this.container.removeEventListener("touchmove",this.onTouchMoveBound),this.container.removeEventListener("touchend",this.onTouchEndBound),this.container.removeEventListener("touchcancel",this.onTouchCancelBound),typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pointermove",this.onWindowPointerMoveBound),window.removeEventListener("pointerup",this.onPointerUpBound)))}sample(e){if(this.motionSpeed=Math.max(0,this.motionSpeed-e*2.4),this.touchReleaseHoldTimer>0&&!this.isDown&&(this.touchReleaseHoldTimer=Math.max(0,this.touchReleaseHoldTimer-e),this.touchReleaseHoldTimer===0&&!this.trackWindowHover&&(this.active=!1)),!this.isDown&&!this.active){const t=1-Math.exp(-2.2*e);this.dragYaw+=(0-this.dragYaw)*t,this.dragPitch+=(0-this.dragPitch)*t,this.normX+=(0-this.normX)*t,this.normY+=(0-this.normY)*t}return{normX:this.normX,normY:this.normY,dragYaw:this.dragYaw,dragPitch:this.dragPitch,active:this.active,isDown:this.isDown,isTouch:this.isTouch,motionSpeed:this.motionSpeed,lastInteractionMs:this.lastInteractionMs}}setNormalized(e,t,n=!0){this.normX=Math.max(-1,Math.min(1,e)),this.normY=Math.max(-1,Math.min(1,t)),this.active=n}triggerTapNormalized(e,t){this.pendingTap.ndcX=Math.max(-1,Math.min(1,e)),this.pendingTap.ndcY=Math.max(-1,Math.min(1,t)),this.hasPendingTap=!0,this.lastTapRecordedMs=Date.now()}consumeTap(){return this.hasPendingTap?(this.hasPendingTap=!1,this.pendingTap):null}recordTapFromClient(e,t){const n=this.container.getBoundingClientRect();if(n.width<=0||n.height<=0)return;const i=(e-n.left)/n.width,s=(t-n.top)/n.height;i<0||i>1||s<0||s>1||(this.pendingTap.ndcX=Math.max(-1,Math.min(1,i*2-1)),this.pendingTap.ndcY=Math.max(-1,Math.min(1,-(s*2-1))),this.hasPendingTap=!0,this.lastTapRecordedMs=Date.now())}handlePointerDown(e){if(e.pointerType==="touch")this.isTouch=!0;else{if(typeof e.button=="number"&&e.button!==0)return;this.isTouch=!1}this.isDown=!0,this.active=!0,this.touchReleaseHoldTimer=0,this.lastClientX=e.clientX,this.lastClientY=e.clientY,this.downOriginX=e.clientX,this.downOriginY=e.clientY,this.maxGestureDistSq=0,this.gestureActive=!0,e.isTrusted&&(this.lastInteractionMs=Date.now()),this.updateNormalizedFromClient(e.clientX,e.clientY,!1)}handleContainerPointerMove(e){if(e.pointerType==="touch"&&this.activeTouchId!==null)return;e.isTrusted&&(this.lastInteractionMs=Date.now());const t=e.pointerType==="touch"?1.35:1;if(this.isDown){const n=e.clientX-this.downOriginX,i=e.clientY-this.downOriginY,s=n*n+i*i;s>this.maxGestureDistSq&&(this.maxGestureDistSq=s);const r=e.clientX-this.lastClientX,a=e.clientY-this.lastClientY;this.lastClientX=e.clientX,this.lastClientY=e.clientY,this.dragYaw=Math.max(-Math.PI,Math.min(Math.PI,this.dragYaw+r*.012*t)),this.dragPitch=Math.max(-.55,Math.min(.55,this.dragPitch+a*.0075*t)),this.motionSpeed=Math.min(1,this.motionSpeed+Math.hypot(r,a)*.026)}this.active=!0,this.updateNormalizedFromClient(e.clientX,e.clientY,!1)}handleWindowPointerMove(e){e.isTrusted&&(this.lastInteractionMs=Date.now(),this.active=!0,this.updateNormalizedFromClient(e.clientX,e.clientY,!0))}handlePointerUp(e){e.pointerType==="touch"&&(this.touchReleaseHoldTimer=1.6),this.gestureActive&&this.maxGestureDistSq<=Op&&Date.now()-this.lastTapRecordedMs>Rh*.5&&this.recordTapFromClient(e.clientX,e.clientY),this.gestureActive=!1,this.isDown=!1}handlePointerCancel(e){e.pointerType==="touch"&&(this.touchReleaseHoldTimer=1.6),this.gestureActive=!1,this.isDown=!1}handleClick(e){Date.now()-this.lastTapRecordedMs<=Rh||this.recordTapFromClient(e.clientX,e.clientY)}handlePointerLeave(e){e.pointerType!=="touch"&&(this.isDown=!1,this.trackWindowHover||(this.active=!1))}handleTouchStart(e){var n,i;const t=((n=e.changedTouches)==null?void 0:n[0])??((i=e.touches)==null?void 0:i[0]);t&&(this.isTouch=!0,this.isDown=!0,this.active=!0,this.touchReleaseHoldTimer=0,this.activeTouchId=t.identifier??0,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.downOriginX=t.clientX,this.downOriginY=t.clientY,this.maxGestureDistSq=0,this.gestureActive=!0,e.isTrusted!==!1&&(this.lastInteractionMs=Date.now()),this.updateNormalizedFromClient(t.clientX,t.clientY,!1))}handleTouchMove(e){const t=e.changedTouches??e.touches;if(!t||t.length===0)return;let n=t[0];if(this.activeTouchId!==null){for(let c=0;c<t.length;c++)if(t[c].identifier===this.activeTouchId){n=t[c];break}}e.isTrusted!==!1&&(this.lastInteractionMs=Date.now());const i=n.clientX-this.downOriginX,s=n.clientY-this.downOriginY,r=i*i+s*s;r>this.maxGestureDistSq&&(this.maxGestureDistSq=r);const a=n.clientX-this.lastClientX,l=n.clientY-this.lastClientY;this.lastClientX=n.clientX,this.lastClientY=n.clientY,this.dragYaw=Math.max(-Math.PI,Math.min(Math.PI,this.dragYaw+a*.015)),this.dragPitch=Math.max(-.55,Math.min(.55,this.dragPitch+l*.0085)),this.motionSpeed=Math.min(1,this.motionSpeed+Math.hypot(a,l)*.03),this.active=!0,this.isDown=!0,this.updateNormalizedFromClient(n.clientX,n.clientY,!1)}handleTouchEnd(e){var i;const t=(i=e.changedTouches)==null?void 0:i[0];(e.touches?e.touches.length:0)===0&&(t&&this.gestureActive&&this.maxGestureDistSq<=Op&&Date.now()-this.lastTapRecordedMs>Rh*.5&&this.recordTapFromClient(t.clientX,t.clientY),this.gestureActive=!1,this.isDown=!1,this.activeTouchId=null,this.touchReleaseHoldTimer=1.8)}handleTouchCancel(){this.gestureActive=!1,this.isDown=!1,this.activeTouchId=null}updateNormalizedFromClient(e,t,n){const i=this.container.getBoundingClientRect();if(i.width<=0||i.height<=0)return;const s=this.normX,r=this.normY;if(n&&typeof window<"u"){const l=i.left+i.width*.5,c=i.top+i.height*.5,h=Math.max(i.width*.7,window.innerWidth*.38,160),u=Math.max(i.height*.7,window.innerHeight*.38,140);this.normX=Math.max(-1,Math.min(1,(e-l)/h)),this.normY=Math.max(-1,Math.min(1,-((t-c)/u)))}else{const l=(e-i.left)/i.width,c=(t-i.top)/i.height;this.normX=Math.max(-1,Math.min(1,l*2-1)),this.normY=Math.max(-1,Math.min(1,-(c*2-1)))}const a=Math.hypot(this.normX-s,this.normY-r);this.motionSpeed=Math.min(1,this.motionSpeed+a*1.4)}}const kp=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,OM=`
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
`,BM=`
  precision highp float;

  uniform sampler2D tScene;
  uniform sampler2D tNormal;
  uniform sampler2D tDepth;
  uniform sampler2D tBloom;
  uniform sampler2D tGlyphAtlas;

  uniform vec2 uResolution;
  uniform vec2 uCellPixelSize;
  uniform vec2 uAtlasTileSize;
  uniform float uSubCellSpread;
  uniform float uRampCount;
  uniform float uStructCount;
  uniform float uBlockCount;
  uniform float uTotalGlyphs;
  uniform float uEdgeStrength;
  uniform float uBlockBlendWeight;
  uniform float uBloomIntensity;
  uniform float uDofFocus;
  uniform float uDofStrength;
  uniform float uDaylight;
  uniform float uWetness;
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
   * 5-tap sub-cell area integration (center + 4 rotated-grid sub-cell offsets).
   */
  vec3 sampleCellIntegrated(vec2 centerUv, vec2 cellUvSpan) {
    vec2 o1 = vec2( uSubCellSpread,  uSubCellSpread * 0.5) * cellUvSpan;
    vec2 o2 = vec2(-uSubCellSpread * 0.5,  uSubCellSpread) * cellUvSpan;

    vec3 c0 = texture2D(tScene, centerUv).rgb * 0.42;
    vec3 c1 = texture2D(tScene, clamp(centerUv + o1, 0.001, 0.999)).rgb * 0.145;
    vec3 c2 = texture2D(tScene, clamp(centerUv - o1, 0.001, 0.999)).rgb * 0.145;
    vec3 c3 = texture2D(tScene, clamp(centerUv + o2, 0.001, 0.999)).rgb * 0.145;
    vec3 c4 = texture2D(tScene, clamp(centerUv - o2, 0.001, 0.999)).rgb * 0.145;

    return c0 + c1 + c2 + c3 + c4;
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
    if (upwardMask <= 0.01 || uWetness <= 0.01) {
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

    for (int i = 1; i <= 6; i++) {
      float fi = float(i);
      float w = 1.0 / (0.70 + fi * 0.58);
      float subWave = sin(wavePhase + fi * 0.82) * cellUvSpan.x * (0.24 + 0.52 * rainAnim);
      vec2 sampleUv = clamp(
        centerUv + vec2(
          normalRefractX + rippleX * 0.55 + subWave * 0.45,
          fi * cellUvSpan.y * 2.85 + normalRefractY
        ),
        vec2(0.002),
        vec2(0.998)
      );
      vec3 sCol = texture2D(tScene, sampleUv).rgb;
      vec3 bCol = texture2D(tBloom, sampleUv).rgb;
      float sLum = getLuma(sCol);
      // High-pass specular gate: only reflect lit sources & silhouettes (never dull unlit walls)
      float specGate = smoothstep(0.26, 0.82, sLum);
      reflAcc += (sCol * specGate * 0.82 + bCol * 1.30) * w;
      weightSum += w;
    }

    vec3 reflected = (reflAcc / max(weightSum, 0.001)) * rippleBand;
    return reflected * upwardMask * uWetness;
  }

  /**
   * Samples a glyph tile from the horizontal 1D atlas strip with half-texel UV clamping
   * so adjacent characters never bleed into neighboring cells.
   */
  float sampleAtlasTile(float tileIndex, vec2 glyphUv) {
    vec2 safeTileDims = max(uAtlasTileSize, vec2(16.0, 24.0));
    vec2 inset = 0.55 / safeTileDims;
    vec2 clampedUv = clamp(glyphUv, inset, vec2(1.0) - inset);
    vec2 atlasUv = vec2((tileIndex + clampedUv.x) / uTotalGlyphs, clampedUv.y);
    return texture2D(tGlyphAtlas, atlasUv).r;
  }

  void main() {
    vec2 cellSize = max(uCellPixelSize, vec2(4.0, 6.0));

    // Anchor the ASCII character grid to viewport center so resizes expand symmetrically
    vec2 screenCenter = floor(uResolution * 0.5);
    vec2 relFrag = gl_FragCoord.xy - screenCenter;
    vec2 cellIndex = floor(relFrag / cellSize);
    vec2 glyphUv = fract(relFrag / cellSize);

    vec2 cellCenterPx = screenCenter + (cellIndex + 0.5) * cellSize;
    vec2 cellCenterUv = clamp(cellCenterPx / uResolution, vec2(0.001), vec2(0.999));
    vec2 cellUvSpan = cellSize / uResolution;

    // 1. Sub-cell integrated scene radiance + depth + view-space normal
    vec3 sceneCol = sampleCellIntegrated(cellCenterUv, cellUvSpan);
    vec3 bloomCol = texture2D(tBloom, cellCenterUv).rgb;
    float rawCenterDepth = texture2D(tDepth, cellCenterUv).r;
    float centerLinDepth = linearizeDepth(rawCenterDepth);
    float isGeometry = step(rawCenterDepth, 0.9994);

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

    // Strongly quiet non-emissive far background structures so distant background breathes darkly
    if (uVolumeWrapStrength > 0.5 && isGeometry > 0.5) {
      float farFade = smoothstep(0.28, 0.78, centerLinDepth) * (1.0 - uDaylight * 0.55);
      float emissiveKeep = smoothstep(0.45, 0.92, getLuma(sceneCol + bloomCol * 1.15));
      sceneCol *= mix(1.0, 0.36, farFade * (1.0 - emissiveKeep));
    }

    // 3. Dual 3x3 Sobel Silhouette & Crease Detection + Foreground Silhouette Separation Moat
    vec2 stepUv = (cellSize * 0.85) / uResolution;

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
    float depthEdgeMag = length(vec2(gxD, gyD)) * 13.0;

    // Distinguish outer background side vs inner foreground side of 3D depth silhouettes
    float minNeighborDepth = min(min(min(dTL, dTC), min(dTR, dML)), min(min(dMR, dBL), min(dBC, dBR)));
    float maxNeighborDepth = max(max(max(dTL, dTC), max(dTR, dML)), max(max(dMR, dBL), max(dBC, dBR)));
    // Background pixel immediately outside a closer object (e.g. street right behind Player_Rig / Carro_Grupo)
    float silhouetteOuterMoat =
      uVolumeWrapStrength *
      smoothstep(0.018, 0.065, centerLinDepth - minNeighborDepth) *
      (1.0 - smoothstep(0.45, 0.80, minNeighborDepth));
    // Foreground pixel right on the outer contour of a closer object
    float silhouetteInnerRim =
      uVolumeWrapStrength *
      isGeometry *
      smoothstep(0.018, 0.065, maxNeighborDepth - centerLinDepth) *
      (1.0 - smoothstep(0.48, 0.82, centerLinDepth));

    vec3 nCenterEnc = texture2D(tNormal, cellCenterUv).xyz;
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
    float normalEdgeMag = length(vec2(gxN, gyN)) * 0.38 * isGeometry;

    // 4. Reconstruct Normal-Mapped Surface Orientation & View-Space Directional Lighting
    vec3 rawViewN = normalize(nCenterEnc * 2.0 - 1.0 + vec3(0.0, 0.0, 0.0001));
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
    float normalSpec = pow(max(dot(viewN, halfVec), 0.0), specPower) * mix(0.075, 0.165, uWetness);
    float grazingRim = pow(1.0 - clamp(abs(viewN.z), 0.0, 1.0), 2.15) * (0.36 + 0.64 * rimNdotL) * 0.105;
    float hemiCatch = worldUpY * 0.038;

    // Suppress fine internal bevel noise on far facades while letting key/rim-lit architectural creases glint
    float creaseLightCatch = 0.58 + 0.62 * max(keyNdotL, rimNdotL);
    float depthCreaseAtten = mix(1.0, 0.22, smoothstep(0.18, 0.62, centerLinDepth));
    float effectiveNormalEdge = normalEdgeMag * depthCreaseAtten * creaseLightCatch * (1.0 - silhouetteOuterMoat);
    float effectiveDepthEdge = depthEdgeMag * (1.0 - silhouetteOuterMoat * 0.85);
    float combinedEdge = max(effectiveDepthEdge, effectiveNormalEdge) * uEdgeStrength * (1.0 - dofBlurFactor * 0.55);
    vec2 domGrad = effectiveDepthEdge >= effectiveNormalEdge ? vec2(gxD, gyD) : vec2(gxN, gyN);

    vec3 groundRefl = sampleGroundReflection(cellCenterUv, cellIndex, cellUvSpan, upwardSurfaceMask, normalTilt);

    // Contained typographic light halo: bloom lifts nearby character indices into crisp bright glyphs
    vec3 haloLift = bloomCol * (uBloomIntensity * 0.96);
    vec3 combinedHdr = sceneCol + haloLift + groundRefl * 0.82;

    // Modulate scene radiance by directional surface orientation so 90-degree return walls separate cleanly
    if (uVolumeWrapStrength > 0.5 && isGeometry > 0.5) {
      float emissiveKeep = smoothstep(0.55, 0.96, getLuma(combinedHdr));
      float planarFactor = mix(
        1.0 + (keyNdotL * 0.16 - keyAway * 0.18 + hemiCatch * 1.4) * uNormalReliefStrength,
        1.0,
        emissiveKeep
      );
      combinedHdr = combinedHdr * clamp(planarFactor, 0.72, 1.24) + vec3(normalSpec * 0.45 * uNormalReliefStrength);
    }

    // Soft-shoulder tone curve compresses bright lamp/headlight peaks smoothly without solid clipping
    vec3 combinedSignal = (combinedHdr / (vec3(1.0) + combinedHdr * 0.38)) * 1.26;

    // Selective chromatic discipline: dark desaturated stone/asphalt base with amber, cyan & moss accents
    float rawLuma = getLuma(combinedSignal);
    float warmAccentMask = clamp((combinedHdr.r - combinedHdr.b) * 1.72, 0.0, 1.0);
    float coolCyanMask = clamp((combinedHdr.b - combinedHdr.r) * 1.55, 0.0, 1.0);
    float foliageMask = clamp((combinedHdr.g - max(combinedHdr.r * 0.90, combinedHdr.b * 0.94)) * 2.55, 0.0, 1.0);
    float baseSatKeep = mix(0.55, 0.94, max(max(warmAccentMask, foliageMask), coolCyanMask * 0.85));
    if (uVolumeWrapStrength > 0.5) {
      combinedSignal = mix(vec3(rawLuma), combinedSignal, baseSatKeep);
    }

    // Gate directional 3D normal relief strictly to lit surfaces so unlit shadows stay genuinely dark & empty
    float litGate = smoothstep(0.065, 0.27, rawLuma);
    float directionalRelief =
      (keyNdotL * 0.056 - keyAway * 0.044 + hemiCatch + grazingRim + normalSpec) * uNormalReliefStrength;
    float volumeRelief =
      (directionalRelief * litGate + silhouetteInnerRim * 0.115) *
      isGeometry *
      uVolumeWrapStrength;

    // Value hierarchy S-curve in playground mode:
    // - Carves true dark breathing space in shadows ('rawLuma < 0.08' -> empty space)
    // - Carves a crisp dark moat ('silhouetteOuterMoat') right outside foreground silhouettes
    float shapedLuma = clamp(getLuma(combinedSignal), 0.0, 1.0);
    if (uVolumeWrapStrength > 0.5) {
      float shadowFloor = mix(0.068, 0.032, uDaylight);
      shapedLuma = smoothstep(shadowFloor, 0.95, shapedLuma);
      shapedLuma = pow(shapedLuma, mix(1.08, 0.92, uDaylight));
      // Quiet background clutter immediately behind Player_Rig / Carro_Grupo silhouettes
      float highlightProtect = smoothstep(0.62, 0.92, shapedLuma);
      shapedLuma *= mix(1.0, 0.14, silhouetteOuterMoat * (1.0 - highlightProtect));
    } else {
      shapedLuma = pow(shapedLuma, 0.82);
    }

    float luma = clamp(shapedLuma + volumeRelief, 0.0, 1.0);

    // 5. Select Primary Detail ASCII Glyph (Surface-Orientation Coherent Clusters, Zero 1-Cell Static)
    float varietyJitter = 0.0;
    if (uVolumeWrapStrength > 0.5) {
      // Only diversify active midtones/highlights ('luma > 0.18'), keeping shadows & silhouettes clean
      float midtoneEnvelope =
        smoothstep(0.18, 0.34, luma) *
        (1.0 - smoothstep(0.88, 0.985, luma)) *
        (1.0 - clamp(combinedEdge * 1.2, 0.0, 1.0)) *
        smoothstep(0.14, 0.28, centerLinDepth);
      // Anchor typographic clusters to quantized planar orientation ('normalSector') so flat walls read calmly
      vec2 normalSector = floor(macroViewN.xy * 2.5 + 0.5);
      float wordClusterHash = glyphVarietyHash(
        floor(vec2(cellIndex.x * 0.28, cellIndex.y * 0.58)) + normalSector * 4.1 + vec2(11.7, 5.3)
      );
      float cellSubtleHash = glyphVarietyHash(cellIndex * 0.85 + vec2(3.1, 7.9));
      float blendedHash = wordClusterHash * 0.80 + cellSubtleHash * 0.20;
      float wetRippleShift =
        upwardSurfaceMask * uWetness * sin(cellIndex.y * 1.35 - uTime * 1.8 + normalTilt.x * 4.0) * 1.10;
      varietyJitter = (blendedHash * 3.4 + wetRippleShift) * midtoneEnvelope;
    }

    float detailTileIndex = floor(luma * (uRampCount - 1.0) + 0.5 + varietyJitter);
    detailTileIndex = clamp(detailTileIndex, 0.0, uRampCount - 1.0);

    // Reserve directional structural glyphs ('|' '/' '' '_') strictly for true silhouettes & strong creases
    float edgeThresh = uVolumeWrapStrength > 0.5 ? 0.62 : 0.30;
    bool isStrongSilhouette = (effectiveDepthEdge * uEdgeStrength) > 0.42;
    bool useStructuralEdge =
      (isStrongSilhouette || combinedEdge > edgeThresh) &&
      (luma > 0.10 || silhouetteInnerRim > 0.35) &&
      (silhouetteOuterMoat < 0.45) &&
      (uStructCount >= 4.0) &&
      (upwardSurfaceMask < 0.45);

    if (useStructuralEdge) {
      float tangentAngle = atan(-domGrad.x, domGrad.y);
      float deg = mod(degrees(tangentAngle) + 180.0, 180.0);

      float structOffset = 0.0; // '|'
      if (deg >= 22.5 && deg < 67.5) {
        structOffset = 1.0; // '/'
      } else if (deg >= 67.5 && deg < 112.5) {
        if (uVolumeWrapStrength < 0.5 || isStrongSilhouette) {
          structOffset = 3.0; // '_'
        } else {
          useStructuralEdge = false;
        }
      } else if (deg >= 112.5 && deg < 157.5) {
        structOffset = 2.0; // ''
      }
      if (useStructuralEdge) {
        detailTileIndex = uRampCount + min(structOffset, uStructCount - 1.0);
      }
    }

    float detailGlyphMask = sampleAtlasTile(detailTileIndex, glyphUv);

    // 6. GPU Lighten Stipple-Detail Blend (gated to active lit surfaces 'luma > 0.34', zero shadow dots)
    float compositeGlyphMask = detailGlyphMask;
    float stippleGate = uVolumeWrapStrength > 0.5 ? 0.34 : 0.065;
    if (uBlockCount >= 3.0 && uBlockBlendWeight > 0.001 && luma > stippleGate) {
      float blockTier = clamp(floor(smoothstep(stippleGate, 0.96, luma) * 3.0), 0.0, min(2.0, uBlockCount - 2.0));
      float blockTileIndex = uRampCount + uStructCount + blockTier;
      float blockMask = sampleAtlasTile(blockTileIndex, glyphUv) * uBlockBlendWeight;
      compositeGlyphMask = max(detailGlyphMask, blockMask);
    }

    // 7. Calibrated Foreground Ink, Contained Amber/Emerald Accents & Grounded 3D Tonal Underlayer
    vec3 normColor = combinedSignal / max(rawLuma, 0.065);
    normColor = clamp(normColor, vec3(0.20), vec3(1.50));

    vec3 shadowGrade = mix(normColor, uCoolTint * 1.04, 0.28);
    vec3 highlightGrade = mix(normColor, uWarmTint * 1.12, 0.14);
    vec3 charColor = mix(shadowGrade, highlightGrade, smoothstep(0.18, 0.82, luma));

    if (uVolumeWrapStrength > 0.5) {
      // Warm golden-amber ink on storefront lights, streetlamps & headlight halos (Image 3 & 4 reference)
      vec3 amberInk = vec3(1.06, 0.80, 0.44);
      charColor = mix(charColor, mix(charColor, amberInk, 0.56), warmAccentMask * smoothstep(0.22, 0.82, luma));

      // Contained cool cyber-slate/cyan accent on neon trim & wet reflections (Image 4 reference)
      vec3 cyanInk = vec3(0.58, 0.85, 0.95);
      charColor = mix(charColor, mix(charColor, cyanInk, 0.40), coolCyanMask * smoothstep(0.22, 0.82, luma));

      // Contained dark-emerald / sage ink on foliage & grass planters (Image 2 & 5 reference)
      vec3 mossInk = vec3(0.28, 0.66, 0.42);
      charColor = mix(charColor, mix(charColor, mossInk, 0.52), foliageMask * (1.0 - warmAccentMask * 0.7));

      // Crisp ivory-white core on peak light & character silhouette glyphs without losing legibility
      float peakIvory = max(smoothstep(0.74, 0.96, luma) * 0.64, silhouetteInnerRim * 0.42);
      charColor = mix(charColor, vec3(1.08, 1.05, 0.98), clamp(peakIvory, 0.0, 0.78));
    }

    if (useStructuralEdge) {
      vec3 edgeInk = uVolumeWrapStrength > 0.5 ? mix(uWarmTint * 1.15, vec3(0.94, 0.97, 1.0), silhouetteInnerRim * 0.65) : uWarmTint * 1.16;
      charColor = mix(charColor, edgeInk, 0.26 * clamp(combinedEdge, 0.0, 1.0));
    }

    // Quiet low-contrast ink on sparse shadow punctuation so dark areas breathe naturally;
    // crisp luminous ink on active midtones, silhouettes, reflections, and focal lights.
    float brightness = uVolumeWrapStrength > 0.5
      ? mix(0.12, 1.28, smoothstep(0.10, 0.88, luma))
      : mix(0.18, 1.24, smoothstep(0.02, 0.94, luma));
    vec3 litGlyph = charColor * brightness * compositeGlyphMask;

    // Grounded 3D Tonal Base Underneath Glyphs ('smoothBackdrop'):
    // - Deep dark slate-black in shadows & silhouette moats for clean breathing contrast
    // - Cohesive shaded 3D form underlayer beneath lit characters, vehicles, planters & storefronts
    //   so silhouettes never dissolve into floating text static!
    vec3 deepVoid = uVolumeWrapStrength > 0.5 ? uBgColor * mix(0.76, 0.92, uDaylight) : uBgColor;
    float formUnderlayerStrength = uVolumeWrapStrength > 0.5
      ? mix(0.19, 0.25, uDaylight) * isGeometry * (1.0 - silhouetteOuterMoat * 0.85)
      : mix(0.036, 0.095, uDaylight);
    vec3 tonedUnderlayer = mix(vec3(getLuma(combinedSignal)), combinedSignal, 0.58) * formUnderlayerStrength;
    vec3 smoothBackdrop = mix(
      deepVoid,
      deepVoid + tonedUnderlayer,
      smoothstep(0.14, 0.72, luma)
    );
    // Reinforce dark separation moat right outside foreground silhouettes
    smoothBackdrop *= mix(1.0, 0.58, silhouetteOuterMoat);

    vec2 vigUv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vigUv, vigUv) * mix(0.16, 0.06, uDaylight);

    vec3 finalRgb = mix(smoothBackdrop, litGlyph, clamp(compositeGlyphMask, 0.0, 1.0));
    // Glyph-locked halo aura (0.06 ambient + 0.94 glyph-masked so dark breathing areas never wash out!)
    finalRgb += bloomCol * (uBloomIntensity * mix(0.22, 0.08, uDaylight) * (0.06 + 0.94 * compositeGlyphMask));
    finalRgb *= clamp(vignette, 0.74, 1.0);

    gl_FragColor = vec4(finalRgb, 1.0);
  }
`,kM='"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';function Lh(o,e,t,n=64){const i=o.length>=2?o:" .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",s=e.length>=4?e:"/\\|_[]",r=4,a=i.length+s.length,l=a+r,c=Math.max(48,Math.min(128,Math.round(n/8)*8)),h=Math.round(c*.625),u=Math.round(c*.84),d=Math.round(c*.92),f=document.createElement("canvas");f.width=h*l,f.height=c;const p=f.getContext("2d",{alpha:!1});if(!p)throw new Error("[AsciiSceneEngine] Unable to create 2D Canvas context for glyph atlas.");p.fillStyle="#000000",p.fillRect(0,0,f.width,f.height);const v=t||kM;p.fillStyle="#FFFFFF",p.textAlign="center",p.textBaseline="middle";const g=i+s;for(let w=0;w<a;w++){const A=g[w]??" ";if(A===" ")continue;const C=w>=i.length;p.font=`${C?700:600} ${C?d:u}px ${v}`,typeof p.save=="function"&&typeof p.beginPath=="function"&&typeof p.clip=="function"?(p.save(),p.beginPath(),p.rect(w*h+1,0,h-2,c),p.clip(),p.fillText(A,w*h+h*.5,c*.52),p.restore()):p.fillText(A,w*h+h*.5,c*.52)}const m=4,_=8,x=h/m,y=c/_;for(let w=0;w<r;w++){const A=(a+w)*h;if(w===3){p.fillStyle="#FFFFFF",p.fillRect(A,0,h,c);continue}const C=w===0?.28:w===1?.54:.8;p.fillStyle="#FFFFFF";for(let S=0;S<_;S++)for(let M=0;M<m;M++)((M&1)<<2|(S&1)<<3|(M&2)>>1|S&2)/16<C&&p.fillRect(Math.round(A+M*x),Math.round(S*y),Math.ceil(x),Math.ceil(y))}const L=new uf(f);return L.minFilter=at,L.magFilter=at,L.wrapS=Zt,L.wrapT=Zt,L.generateMipmaps=!1,L.needsUpdate=!0,{texture:L,rampCount:i.length,structuralCount:s.length,blockCount:r,totalGlyphs:l,tileSize:c,tileWidth:h,tileHeight:c}}function Sl(o,e,t,n){const i=(o%t+t)%t,s=(e%t+t)%t;let r=Math.imul(i+37,374761393)+Math.imul(s+17,668265263)+Math.imul(n,1442695041);return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967295}function Qr(o,e,t,n){const i=o*t,s=e*t,r=Math.floor(i),a=Math.floor(s),l=i-r,c=s-a,h=l*l*(3-2*l),u=c*c*(3-2*c),d=Sl(r,a,t,n),f=Sl(r+1,a,t,n),p=Sl(r,a+1,t,n),v=Sl(r+1,a+1,t,n),g=d+(f-d)*h,m=p+(v-p)*h;return g+(m-g)*u}function bl(o,e,t,n,i){const s=new Float32Array(o*o);for(let l=0;l<o;l++){const c=l/o;for(let h=0;h<o;h++){const u=h/o;s[l*o+h]=i(u,c)}}const r=new Uint8Array(o*o*4);for(let l=0;l<o;l++){const c=(l-1+o)%o,h=(l+1)%o;for(let u=0;u<o;u++){const d=(u-1+o)%o,f=(u+1)%o,p=s[l*o+d],v=s[l*o+f],g=s[c*o+u],m=s[h*o+u],_=-(v-p)*e,x=-(m-g)*e,y=1,L=1/Math.hypot(_,x,y),w=(l*o+u)*4;r[w]=Math.round(et.clamp((_*L*.5+.5)*255,0,255)),r[w+1]=Math.round(et.clamp((x*L*.5+.5)*255,0,255)),r[w+2]=Math.round(et.clamp((y*L*.5+.5)*255,0,255)),r[w+3]=255}}const a=new yn(r,o,o,Tt,mn);return a.colorSpace=Tn,a.wrapS=On,a.wrapT=On,a.magFilter=at,a.minFilter=at,a.generateMipmaps=!1,a.repeat.set(t,n),a.needsUpdate=!0,a}function zp(o=64){const e=bl(o,2.4,8,8,(s,r)=>{const a=Qr(s,r,8,11)*.55,l=Qr(s,r,16,29)*.3,c=Math.cos(s*Math.PI*4)*.15;return a+l+c}),t=bl(o,2.8,6,6,(s,r)=>{const a=s*2%1,l=r*2%1,c=Math.min(a,1-a),h=Math.min(l,1-l),u=et.smoothstep(c,0,.075),d=et.smoothstep(h,0,.075),f=Math.min(u,d),p=Qr(s,r,12,47)*.14;return f*.86+p}),n=bl(o,2.6,4,4,(s,r)=>{const a=Math.floor(r*4),l=r*4%1,c=(s*2+a%2*.5)%1,h=et.smoothstep(Math.min(l,1-l),0,.085),u=et.smoothstep(Math.min(c,1-c),0,.065),d=Math.min(h,u),f=Qr(s,r,8,73)*.12;return d*.88+f}),i=bl(o,1.65,3,3,(s,r)=>{const a=Math.sin(s*Math.PI*4)*.35+Math.cos(r*Math.PI*2)*.35,l=Qr(s,r,6,101)*.3;return a+l});return{asphalt:e,pavement:t,facade:n,contourTrim:i,dispose(){e.dispose(),t.dispose(),n.dispose(),i.dispose()}}}class Hp{constructor(){N(this,"fallbackMaterial",new hl);N(this,"bySourceUuid",new Map);N(this,"swappedMeshes",[]);N(this,"hiddenObjects",[])}beginPass(e){this.swappedMeshes.length=0,this.hiddenObjects.length=0,e.traverseVisible(t=>{var s;if(((s=t.userData)==null?void 0:s.skipNormalPass)===!0||t.isPoints===!0||t.isLine===!0){this.hiddenObjects.push(t);return}if(!t.isMesh)return;const n=t,i=n.material;this.swappedMeshes.push({mesh:n,originalMaterial:i}),Array.isArray(i)?n.material=i.map(r=>this.resolveNormalMaterial(r)):n.material=this.resolveNormalMaterial(i)});for(let t=0;t<this.hiddenObjects.length;t++)this.hiddenObjects[t].visible=!1}endPass(){for(let e=0;e<this.swappedMeshes.length;e++){const t=this.swappedMeshes[e];t.mesh.material=t.originalMaterial}this.swappedMeshes.length=0;for(let e=0;e<this.hiddenObjects.length;e++)this.hiddenObjects[e].visible=!0;this.hiddenObjects.length=0}resolveNormalMaterial(e){if(!e)return this.fallbackMaterial;const t=e,n=t.normalMap;if(!n||!n.isTexture)return this.fallbackMaterial;const i=t.normalScale?Math.abs(t.normalScale.x):.6,s=t.normalScale?Math.abs(t.normalScale.y):.6,r=et.clamp(i*.42,.14,.48),a=et.clamp(s*.42,.14,.48),l=this.bySourceUuid.get(e.uuid);if(l&&l.sourceMap===n)return l.normalMat.normalScale.set(r,a),l.normalMat.side=e.side,l.normalMat;l&&l.normalMat.dispose();const c=new hl({normalMap:n,normalMapType:t.normalMapType??Kn,normalScale:new j(r,a),flatShading:t.flatShading===!0,side:e.side});return this.bySourceUuid.set(e.uuid,{normalMat:c,sourceMap:n}),c}dispose(){this.endPass(),this.fallbackMaterial.dispose();for(const e of this.bySourceUuid.values())e.normalMat.dispose();this.bySourceUuid.clear()}}const wl=new E,Tl=new E,Qs=new E;function Vp(o,e,t,n,i){e.updateMatrixWorld();const s=e.matrixWorldInverse;i.set(0,1,0).transformDirection(s).normalize();let r=null,a=null;for(let l=0;l<o.children.length;l++){const c=o.children[l];c instanceof Hn&&c.visible&&c.intensity>.01&&(c.name==="KeyDirectionalLight"||!r&&c.name!=="RimDirectionalLight"?r=c:(c.name==="RimDirectionalLight"||!a)&&(a=c))}r?(r.getWorldPosition(wl),r.target.getWorldPosition(Tl),Qs.subVectors(wl,Tl),Qs.lengthSq()>1e-6?t.copy(Qs.normalize()).transformDirection(s).normalize():t.set(-.48,.72,.5).normalize()):t.set(-.48,.72,.5).normalize(),a?(a.getWorldPosition(wl),a.target.getWorldPosition(Tl),Qs.subVectors(wl,Tl),Qs.lengthSq()>1e-6?n.copy(Qs.normalize()).transformDirection(s).normalize():n.set(.58,.42,-.7).normalize()):n.set(.58,.42,-.7).normalize()}class ds{constructor(e,t,n,i=64){N(this,"sceneTarget");N(this,"normalTarget");N(this,"bloomTarget");N(this,"depthTexture");N(this,"normalPassCache",new Hp);N(this,"bloomMaterial");N(this,"compositeMaterial");N(this,"transitionController",new Ep(14));N(this,"savedClearColor",new q);N(this,"quadGeometry");N(this,"bloomQuad");N(this,"compositeQuad");N(this,"postScene");N(this,"bloomScene");N(this,"orthoCamera");N(this,"atlas");N(this,"currentAtlasSignature","");N(this,"currentBloomDownsample",3);const s=typeof e=="object",r=s?e:n,a=Math.max(2,Math.floor(s?320:e)),l=Math.max(2,Math.floor(s?240:t??240));this.depthTexture=new Sa(a,l),this.depthTexture.type=pi,this.depthTexture.format=mi,this.sceneTarget=new Qt(a,l,{minFilter:at,magFilter:at,format:Tt,type:Zn,depthTexture:this.depthTexture,depthBuffer:!0}),this.normalTarget=new Qt(a,l,{minFilter:vt,magFilter:vt,format:Tt,type:Zn,depthBuffer:!0});const c=Math.max(2,Math.floor(a/this.currentBloomDownsample)),h=Math.max(2,Math.floor(l/this.currentBloomDownsample));this.bloomTarget=new Qt(c,h,{minFilter:at,magFilter:at,format:Tt,type:Zn,depthBuffer:!1}),this.atlas=Lh(r.characterRamp,r.structuralChars,r.fontFamily,i),this.currentAtlasSignature=this.computeAtlasSignature(r,i),this.orthoCamera=new Bs(-1,1,1,-1,0,1),this.quadGeometry=new si(2,2),this.bloomMaterial=new Ht({vertexShader:kp,fragmentShader:OM,uniforms:{tScene:{value:this.sceneTarget.texture},uTexelSize:{value:new j(1/a,1/l)},uThreshold:{value:r.bloomThreshold}},depthTest:!1,depthWrite:!1});const u=new q(r.palette.background),d=new q(r.palette.coolAmbient),f=new q(r.palette.warmLight);this.compositeMaterial=new Ht({vertexShader:kp,fragmentShader:BM,uniforms:{tScene:{value:this.sceneTarget.texture},tNormal:{value:this.normalTarget.texture},tDepth:{value:this.depthTexture},tBloom:{value:this.bloomTarget.texture},tGlyphAtlas:{value:this.atlas.texture},uResolution:{value:new j(a,l)},uCellPixelSize:{value:new j(6,10)},uAtlasTileSize:{value:new j(this.atlas.tileWidth,this.atlas.tileHeight)},uSubCellSpread:{value:.22},uRampCount:{value:this.atlas.rampCount},uStructCount:{value:this.atlas.structuralCount},uBlockCount:{value:this.atlas.blockCount},uTotalGlyphs:{value:this.atlas.totalGlyphs},uEdgeStrength:{value:r.edgeStrength},uBlockBlendWeight:{value:r.blockBlendWeight},uBloomIntensity:{value:r.bloomIntensity},uDofFocus:{value:r.dofFocusDistance},uDofStrength:{value:r.dofStrength},uDaylight:{value:r.atmosphere==="day"?1:0},uWetness:{value:ds.resolveWetness(r)},uCameraNear:{value:.1},uCameraFar:{value:140},uVolumeWrapStrength:{value:r.mode==="mascot"?0:1},uNormalReliefStrength:{value:ds.resolveNormalRelief(r)},uKeyLightViewDir:{value:new E(-.48,.72,.5).normalize()},uRimLightViewDir:{value:new E(.58,.42,-.7).normalize()},uWorldUpViewDir:{value:new E(0,.78,.62).normalize()},uBgColor:{value:u},uCoolTint:{value:d},uWarmTint:{value:f},uTime:{value:0}},depthTest:!1,depthWrite:!1}),this.bloomQuad=new Ne(this.quadGeometry,this.bloomMaterial),this.bloomScene=new Gs,this.bloomScene.add(this.bloomQuad),this.compositeQuad=new Ne(this.quadGeometry,this.compositeMaterial),this.postScene=new Gs,this.postScene.add(this.compositeQuad)}static resolveWetness(e){return e.mode==="mascot"?0:e.atmosphere==="rain"?1:e.atmosphere==="day"?.22:.62}static resolveNormalRelief(e){return e.mode==="mascot"?.72:e.atmosphere==="day"?1.12:e.atmosphere==="rain"?1.06:1}computeAtlasSignature(e,t){return`${e.characterRamp}::${e.structuralChars}::${e.fontFamily}::${t}`}rebuildAtlasIfNeeded(e,t,n=!1){const i=this.computeAtlasSignature(e,t);if(!n&&i===this.currentAtlasSignature)return;const s=this.atlas;this.atlas=Lh(e.characterRamp,e.structuralChars,e.fontFamily,t),this.currentAtlasSignature=i,this.compositeMaterial.uniforms.tGlyphAtlas.value=this.atlas.texture,this.compositeMaterial.uniforms.uAtlasTileSize.value.set(this.atlas.tileWidth,this.atlas.tileHeight),this.compositeMaterial.uniforms.uRampCount.value=this.atlas.rampCount,this.compositeMaterial.uniforms.uStructCount.value=this.atlas.structuralCount,this.compositeMaterial.uniforms.uBlockCount.value=this.atlas.blockCount,this.compositeMaterial.uniforms.uTotalGlyphs.value=this.atlas.totalGlyphs,s.texture.dispose()}applyResolutionProfile(e,t,n=!1){const i=Math.max(2,e.physicalWidth),s=Math.max(2,e.physicalHeight);this.currentBloomDownsample=e.bloomDownsample;const r=Math.max(2,Math.floor(i/this.currentBloomDownsample)),a=Math.max(2,Math.floor(s/this.currentBloomDownsample));this.sceneTarget.setSize(i,s),this.normalTarget.setSize(i,s),this.bloomTarget.setSize(r,a),this.bloomMaterial.uniforms.uTexelSize.value.set(1/i,1/s),this.compositeMaterial.uniforms.uResolution.value.set(i,s),this.transitionController.setTarget(e,n);const l=this.transitionController.step(0);this.compositeMaterial.uniforms.uCellPixelSize.value.set(l.cellW,l.cellH),this.compositeMaterial.uniforms.uSubCellSpread.value=l.subCellSpread,this.rebuildAtlasIfNeeded(t,e.atlasTileSize,!1)}applyConfig(e,t=!1,n=640,i=360,s=1,r=!1){const a=Ah({cssWidth:n,cssHeight:i,devicePixelRatio:s,config:e,isCoarsePointer:r});return this.rebuildAtlasIfNeeded(e,a.atlasTileSize,t),this.transitionController.setTarget(a,!0),this.compositeMaterial.uniforms.uCellPixelSize.value.set(a.cellPhysW,a.cellPhysH),this.compositeMaterial.uniforms.uSubCellSpread.value=a.subCellSampleSpread,this.bloomMaterial.uniforms.uThreshold.value=e.bloomThreshold,this.compositeMaterial.uniforms.uEdgeStrength.value=e.edgeStrength,this.compositeMaterial.uniforms.uBlockBlendWeight.value=e.blockBlendWeight,this.compositeMaterial.uniforms.uBloomIntensity.value=e.bloomIntensity,this.compositeMaterial.uniforms.uDofFocus.value=e.dofFocusDistance,this.compositeMaterial.uniforms.uDofStrength.value=e.dofStrength,this.compositeMaterial.uniforms.uDaylight.value=e.atmosphere==="day"?1:0,this.compositeMaterial.uniforms.uWetness.value=ds.resolveWetness(e),this.compositeMaterial.uniforms.uVolumeWrapStrength.value=e.mode==="mascot"?0:1,this.compositeMaterial.uniforms.uNormalReliefStrength.value=ds.resolveNormalRelief(e),this.compositeMaterial.uniforms.uBgColor.value.set(e.palette.background),this.compositeMaterial.uniforms.uCoolTint.value.set(e.palette.coolAmbient),this.compositeMaterial.uniforms.uWarmTint.value.set(e.palette.warmLight),a}render(e,t,n,i,s=0){if(this.compositeMaterial.uniforms.uTime.value=i,s>0){const u=this.transitionController.step(s);this.compositeMaterial.uniforms.uCellPixelSize.value.set(u.cellW,u.cellH),this.compositeMaterial.uniforms.uSubCellSpread.value=u.subCellSpread}const r=n;r.isPerspectiveCamera&&(this.compositeMaterial.uniforms.uCameraNear.value=r.near,this.compositeMaterial.uniforms.uCameraFar.value=r.far),Vp(t,n,this.compositeMaterial.uniforms.uKeyLightViewDir.value,this.compositeMaterial.uniforms.uRimLightViewDir.value,this.compositeMaterial.uniforms.uWorldUpViewDir.value),e.setRenderTarget(this.sceneTarget),e.clear(),e.render(t,n);const a=e.info.render.calls,l=e.info.render.triangles,c=t.background,h=e.getClearAlpha();return e.getClearColor(this.savedClearColor),this.normalPassCache.beginPass(t),t.background=null,e.setRenderTarget(this.normalTarget),e.setClearColor(8421631,1),e.clear(),e.render(t,n),this.normalPassCache.endPass(),t.background=c,e.setClearColor(this.savedClearColor,h),e.setRenderTarget(this.bloomTarget),e.clear(),e.render(this.bloomScene,this.orthoCamera),e.setRenderTarget(null),e.clear(),e.render(this.postScene,this.orthoCamera),{drawCalls:a,triangles:l}}dispose(){this.sceneTarget.dispose(),this.normalTarget.dispose(),this.bloomTarget.dispose(),this.depthTexture.dispose(),this.atlas.texture.dispose(),this.normalPassCache.dispose(),this.bloomMaterial.dispose(),this.compositeMaterial.dispose(),this.quadGeometry.dispose()}}const er="#7DF9FF",Ph="__AsciiObjectOutlineShell__",zM=`
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
`,HM=`
  precision highp float;

  uniform vec3 uOutlineColor;
  uniform float uOutlineIntensity;
  uniform float uOutlineOpacity;

  void main() {
    gl_FragColor = vec4(uOutlineColor * uOutlineIntensity, uOutlineOpacity);
  }
`,eo=new WeakMap;function Al(o,e,t){return Number.isFinite(o)?Math.max(e,Math.min(t,o)):e}function Ih(o,e){const t=new q;if(o==null)return t.set(e),t;if(o instanceof q)return o.clone();try{return t.set(o),t}catch{return t.set(e),t}}function Gp(o){if(o.getAttribute("aOutlineNormal"))return;const e=o.getAttribute("position");if(!e||e.count===0)return;o.getAttribute("normal")||o.computeVertexNormals();const t=o.getAttribute("normal");if(!t)return;const n=e.count,i=new Map,s=new Array(n);for(let a=0;a<n;a++){const l=Math.round(e.getX(a)*1e4),c=Math.round(e.getY(a)*1e4),h=Math.round(e.getZ(a)*1e4),u=`${l},${c},${h}`;s[a]=u;let d=t.getX(a),f=t.getY(a),p=t.getZ(a);const v=Math.hypot(d,f,p);v>1e-6&&(d/=v,f/=v,p/=v);let g=i.get(u);g||(g={sumX:0,sumY:0,sumZ:0,seen:new Set},i.set(u,g));const m=`${Math.round(d*100)},${Math.round(f*100)},${Math.round(p*100)}`;g.seen.has(m)||(g.seen.add(m),g.sumX+=d,g.sumY+=f,g.sumZ+=p)}const r=new Float32Array(n*3);for(let a=0;a<n;a++){const l=i.get(s[a]);let c=l?l.sumX:t.getX(a),h=l?l.sumY:t.getY(a),u=l?l.sumZ:t.getZ(a),d=Math.hypot(c,h,u);d<=1e-5&&(c=t.getX(a),h=t.getY(a),u=t.getZ(a),d=Math.hypot(c,h,u)||1),r[a*3]=c/d,r[a*3+1]=h/d,r[a*3+2]=u/d}o.setAttribute("aOutlineNormal",new Je(r,3))}function VM(o,e,t){var i,s,r,a,l;if((i=o.userData)!=null&&i.__isAsciiOutlineShell||(s=o.userData)!=null&&s.skipObjectOutline||o.name===Ph)return!1;let n=o.parent;for(;n;){if((r=n.userData)!=null&&r.__isAsciiOutlineShell)return!1;n=n.parent}return e&&((a=o.userData)!=null&&a.isShowcasePedestal||o.name==="TuxShowcasePlinth"||((l=o.geometry)==null?void 0:l.type)==="RingGeometry")||t&&!t(o)?!1:!!(o.geometry&&o.geometry.getAttribute("position"))}function GM(o){const e=Ih(o.highlightColor,er);return new Ht({name:"AsciiObjectOutlineMaterial",vertexShader:zM,fragmentShader:HM,side:Ft,transparent:o.opacity<.999,depthTest:!0,depthWrite:o.opacity>=.999,toneMapped:!1,uniforms:{uOutlineThickness:{value:o.thickness},uOutlineColor:{value:e},uOutlineIntensity:{value:o.intensity},uOutlineOpacity:{value:o.opacity},uDepthBias:{value:o.depthBias}}})}function Wp(o){var i;const e=new Set;o.target.traverse(s=>{if(s.isMesh){const r=s;VM(r,o.state.excludePedestal,o.meshFilter)&&e.add(r)}});for(const[s,r]of o.shells.entries())e.has(s)||((i=r.parent)==null||i.remove(r),o.shells.delete(s));for(const s of e){let r=o.shells.get(s);r||(Gp(s.geometry),r=new Ne(s.geometry,o.material),r.name=Ph,r.userData.__isAsciiOutlineShell=!0,r.castShadow=!1,r.receiveShadow=!1,r.frustumCulled=s.frustumCulled,r.renderOrder=(s.renderOrder||0)+1,s.add(r),o.shells.set(s,r)),r.visible=o.state.enabled}const t=o.material.uniforms;t.uOutlineThickness&&(t.uOutlineThickness.value=o.state.thickness),t.uOutlineColor&&t.uOutlineColor.value.copy(Ih(o.state.highlightColor,er)),t.uOutlineIntensity&&(t.uOutlineIntensity.value=o.state.intensity),t.uOutlineOpacity&&(t.uOutlineOpacity.value=o.state.opacity),t.uDepthBias&&(t.uDepthBias.value=o.state.depthBias);const n=o.state.opacity<.999;o.material.transparent!==n&&(o.material.transparent=n,o.material.depthWrite=!n,o.material.needsUpdate=!0)}function El(o){return{enabled:o.state.enabled,thickness:o.state.thickness,highlightColor:o.state.highlightColor,intensity:o.state.intensity,opacity:o.state.opacity,depthBias:o.state.depthBias,excludePedestal:o.state.excludePedestal,outlinedMeshCount:o.shells.size}}function Cl(o,e){if(!o||typeof o.traverse!="function")throw new TypeError("[applyObjectOutline] Expected a valid THREE.Object3D target.");const t=eo.get(o),n=(e==null?void 0:e.enabled)!==void 0?e.enabled:(e==null?void 0:e.visible)!==void 0?e.visible:(t==null?void 0:t.state.enabled)??!0,i=(e==null?void 0:e.thickness)!==void 0?e.thickness:(e==null?void 0:e.width)!==void 0?e.width:(t==null?void 0:t.state.thickness)??1,s=(e==null?void 0:e.highlightColor)!==void 0?e.highlightColor:(e==null?void 0:e.color)!==void 0?e.color:(t==null?void 0:t.state.highlightColor)??er,r=Ih(s,er),a={enabled:!!n,thickness:Al(i,.05,8),highlightColor:`#${r.getHexString().toUpperCase()}`,intensity:Al((e==null?void 0:e.intensity)??(t==null?void 0:t.state.intensity)??1.85,.1,6),opacity:Al((e==null?void 0:e.opacity)??(t==null?void 0:t.state.opacity)??1,0,1),depthBias:Al((e==null?void 0:e.depthBias)??(t==null?void 0:t.state.depthBias)??.0012,0,.05),excludePedestal:(e==null?void 0:e.excludePedestal)??(t==null?void 0:t.state.excludePedestal)??!0};if(t)return t.state=a,(e==null?void 0:e.meshFilter)!==void 0&&(t.meshFilter=e.meshFilter),Wp(t),t.handle;const l=GM(a),h={target:o,material:l,shells:new Map,state:a,meshFilter:e==null?void 0:e.meshFilter,handle:null},u={target:o,getState:()=>El(h),update:d=>(Cl(o,d),El(h)),setVisible:d=>(Cl(o,{enabled:d}),El(h)),dispose:()=>to(o)};return h.handle=u,eo.set(o,h),Wp(h),u}function to(o){var s,r;if(!o)return 0;const e=eo.get(o);let t=0;if(e){for(const a of e.shells.values())(s=a.parent)==null||s.remove(a),t+=1;return e.shells.clear(),e.material.dispose(),eo.delete(o),t}const n=[];o.traverse(a=>{var l;a.isMesh&&((l=a.userData)!=null&&l.__isAsciiOutlineShell)&&n.push(a)});const i=new Set;for(const a of n)(r=a.parent)==null||r.remove(a),a.material&&!Array.isArray(a.material)&&!i.has(a.material)&&(i.add(a.material),a.material.dispose()),t+=1;return t}function Dh(o){const e=eo.get(o);return e?El(e):null}const Rl={minX:-19.35,maxX:10.75,minZ:-3.3,maxZ:4.1,plazaMinX:-5.55,plazaMaxX:.55,corridorMinZ:-3.25,corridorMaxZ:-1.92,westStorefrontMinX:-17.65,westStorefrontMaxX:-9.35,westStorefrontMinZ:-2.5,obstacles:[{minX:-4.8,maxX:-2.08,minZ:2.08,maxZ:3.62},{minX:-5.52,maxX:-4.98,minZ:3.74,maxZ:4.26}],groundY:.08635},tr={x:-3.8,y:.08635,z:-1.1},Mn={offsetX:10.3,offsetY:11.3,offsetZ:10.3,lookAtOffsetX:-1.85,lookAtOffsetY:1.05,lookAtOffsetZ:-1.25,followSharpness:6.5},Sn={cycleDuration:30,activeDuration:8,laneX:-22.335,laneY:-.092,startZ:-12.5,endZ:24.5,headingYaw:0};class li{static createArchitecturalLightRig(e){const t=new Vt;t.name="UrbanArchitecturalLightRig";const n=[],i=(Ie,Fe,W)=>{const $=new xn({color:new q(Ie),emissive:new q(Fe),emissiveIntensity:W,roughness:.32,metalness:.14});return n.push($),$},s=new sn(new q("#F4AA4C"),9.2,14.5,1.78);s.position.set(-4.35,3.05,-2.55),t.add(s);const r=new vn(5.8,.28,.14),a=i("#3A2B1C","#F6B85C",1.52),l=new Ne(r,a);l.name="StorefrontEastTransom",l.position.set(-4.35,3.22,-3.45),l.userData.skipObjectOutline=!0,t.add(l);const c=new vn(.12,2.35,.12),h=i("#162C33","#58B6C6",1.32),u=new Ne(c,h);u.name="StorefrontEastNeon",u.position.set(-.52,2.25,-3.44),u.userData.skipObjectOutline=!0,t.add(u);const d=new sn(new q("#ED9F44"),8.8,14.5,1.78);d.position.set(-13.35,3.1,-1.75),t.add(d);const f=new vn(5.4,.26,.14),p=i("#38291A","#F0AC50",1.45),v=new Ne(f,p);v.name="StorefrontWestTransom",v.position.set(-13.35,3.25,-2.55),v.userData.skipObjectOutline=!0,t.add(v);const g=new Ne(c,h);g.name="StorefrontWestNeon",g.position.set(-9.82,2.3,-2.56),g.userData.skipObjectOutline=!0,t.add(g);const m=new sn(new q("#F2B258"),6.4,11.5,1.82);m.position.set(-3.42,2.35,3.65),t.add(m);const _=new vn(2.15,.12,.12),x=i("#3B2B1B","#F7BC64",1.48),y=new Ne(_,x);y.name="KioskCanopyGlow",y.position.set(-3.42,2.54,3.42),y.userData.skipObjectOutline=!0,t.add(y);const L=new Dt(.22,10,8),w=i("#FFF4DC","#FAD284",1.82),A=new sn(new q("#F6C270"),12.2,19,1.72);A.position.set(-17.99,6,3.14),t.add(A);const C=new Ne(L,w);C.name="StreetLampGlobeWest",C.position.set(-17.99,6.2,3.14),C.userData.skipObjectOutline=!0,t.add(C);const S=new xn({color:new q("#28323B"),roughness:.52,metalness:.35}),M=new bi(.06,.085,5.35,8),P=new Ne(M,S);P.name="CurbsideLuminairePost",P.position.set(-5.25,2.75,4),P.castShadow=!0,P.receiveShadow=!0,t.add(P);const H=new vn(.08,.08,.72),k=new Ne(H,S);k.name="CurbsideLuminaireArm",k.position.set(-5.25,5.42,4.3),t.add(k);const z=new sn(new q("#F2BA68"),10.6,16.5,1.76);z.position.set(-5.25,5.25,4.58),t.add(z);const V=new Ne(L,w);V.name="StreetLampGlobeCenter",V.position.set(-5.25,5.32,4.58),V.userData.skipObjectOutline=!0,t.add(V);const U=new sn(new q("#ECAF5E"),9.2,16,1.76);U.position.set(8.4,6,4.83),t.add(U);const K=new Ne(L,w);K.name="StreetLampGlobeEast",K.position.set(8.4,6.2,4.83),K.userData.skipObjectOutline=!0,t.add(K);const D=new sn(new q("#5CA8BA"),5.8,17.5,1.75);D.position.set(-27.2,4.8,1.6),t.add(D);const ee=new Dt(.18,8,6),he=i("#1B323A","#6AC2D4",1.35),de=new Ne(ee,he);return de.name="AvenueCyberBeacon",de.position.set(-27.6,4.95,1.6),de.userData.skipObjectOutline=!0,t.add(de),e.add(t),{group:t,storefrontEastLight:s,storefrontWestLight:d,kioskWarmLight:m,streetLampWest:A,streetLampCenter:z,streetLampEast:U,avenueBeaconLight:D,poleMaterial:S,emissiveFixtureMaterials:n}}static createStage(e,t,n){const i=new Gs,s=new q(e.palette.background);i.background=s,i.fog=new Vs(s.getHex(),.015);const r=new ul(new q(e.palette.coolAmbient),new q("#090E13"),.78);i.add(r);const a=new Hn(new q(e.palette.coolAmbient).lerp(new q("#C8D6E2"),.45),1.48);a.name="KeyDirectionalLight",a.position.set(16,28,18),a.target.position.set(-6,.5,0),i.add(a.target),a.castShadow=e.enableShadows,a.shadow.mapSize.width=1536,a.shadow.mapSize.height=1536,a.shadow.camera.near=2,a.shadow.camera.far=90,a.shadow.camera.left=-34,a.shadow.camera.right=24,a.shadow.camera.top=26,a.shadow.camera.bottom=-26,a.shadow.bias=-5e-4,a.shadow.normalBias=.035,i.add(a);const l=new Hn(new q(e.palette.warmLight),.54);l.name="RimDirectionalLight",l.position.set(-20,14,-15),l.target.position.set(-4,1,-1),i.add(l.target),i.add(l);const c=li.createArchitecturalLightRig(i),h=new qr(.24,.36,24);h.rotateX(-Math.PI/2);const u=new zt({color:new q(e.palette.warmLight),transparent:!0,opacity:.65,side:fn}),d=new Ne(h,u);d.name="UrbanWaypointMarker",d.userData.skipNormalPass=!0,d.visible=!1,i.add(d);const f={scene:i,ambientHemi:r,keyDirLight:a,rimDirLight:l,urbanLightRig:c,playerRimLight:null,waypointMarker:d,cidadeEntityId:null,playerEntityId:null,carroEntityId:null,assets:null};return t&&n?li.attachPreparedAssets(f,n,e,t):li.applyAtmosphere(f,e,t),f}static attachPreparedAssets(e,t,n,i){var V,U,K;e.assets=t,e.urbanLightRig.poleMaterial.normalMap=t.proceduralNormals.facade,e.urbanLightRig.poleMaterial.normalScale.set(.36,.36);const{cidade:s,playerRig:r,carroGrupo:a}=t.nodes;e.scene.add(s),e.scene.add(r),e.scene.add(a);const l=i.createEntity();i.addComponent(l,"LifecycleTag",{role:"environment",label:"Cidade_Sketchfab_model"}).addComponent(l,"DepthLayer",{layer:"midground",order:1,contrastPriority:.72}).addComponent(l,"Transform",{x:s.position.x,y:s.position.y,z:s.position.z,rotX:s.rotation.x,rotY:s.rotation.y,rotZ:s.rotation.z,scaleX:s.scale.x,scaleY:s.scale.y,scaleZ:s.scale.z}).addComponent(l,"ForegroundOccluders",{groups:t.foregroundOccluders,centralFocusX:-4.2,centralFocusY:1.8,centralFocusZ:-2.4,playerClearanceRadius:1.65,centralNdcHalfWidth:.52,centralNdcHalfHeight:.58}).addComponent(l,"Renderable",{object3D:s,disposeOnDestroy:!0});const c=r.position.y||Rl.groundY,h=tr.x,u=tr.z;r.position.set(h,c,u);const d=Math.max(.001,Math.abs(r.scale.y||1)),f=new sn(new q("#EEF6FF"),3.4,4.6,1.95);f.position.set(.18/d,2.75/d,.35/d),r.add(f),e.playerRimLight=f;const p={...Rl,obstacles:Rl.obstacles.map(D=>({...D})),groundY:c},v=new cp(r),g=t.clips.Idle?v.clipAction(t.clips.Idle):null,m=t.clips.Walking?v.clipAction(t.clips.Walking):null,_=t.clips.Casting?v.clipAction(t.clips.Casting):null;g&&(g.setLoop(fr,1/0),g.play()),m&&m.setLoop(fr,1/0),_&&(_.setLoop($o,1),_.clampWhenFinished=!0);const x=i.createEntity(),y={mixer:v,root:r,actions:{Idle:g,Walking:m,Casting:_},durations:{Idle:((V=t.clips.Idle)==null?void 0:V.duration)??2,Walking:((U=t.clips.Walking)==null?void 0:U.duration)??1,Casting:((K=t.clips.Casting)==null?void 0:K.duration)??1.47},activeClip:"Idle",castRemaining:0,crossFadeDuration:.22,interactRequested:!1,disposeListener:void 0},L=D=>{_&&D.action===_&&y.activeClip==="Casting"&&(y.castRemaining=0)};v.addEventListener("finished",L),y.disposeListener=()=>{v.removeEventListener("finished",L)},v.update(1e-4),i.addComponent(x,"LifecycleTag",{role:"avatar",label:"Player_Rig"}).addComponent(x,"DepthLayer",{layer:"foreground",order:0,contrastPriority:1}).addComponent(x,"Transform",{x:h,y:c,z:u,rotX:r.rotation.x,rotY:r.rotation.y,rotZ:r.rotation.z,scaleX:r.scale.x,scaleY:r.scale.y,scaleZ:r.scale.z}).addComponent(x,"Velocity",{vx:0,vy:0,vz:0,angularVx:0,angularVy:0,angularVz:0,damping:12}).addComponent(x,"RotationTarget",{targetYaw:r.rotation.y,targetPitch:0,targetRoll:0,lerpSpeed:10.5,idleSpinSpeed:0,maxPitch:.15}).addComponent(x,"InputState",{pointerX:0,pointerY:0,pointerActive:!1,isDragging:!1,moveX:0,moveZ:0,yawSensitivity:.6,pitchSensitivity:.25,moveSpeed:3.6,boundsRadius:0}).addComponent(x,"NavigationTarget",{targetX:h,targetZ:u,active:!1,moveSpeed:3.6,arrivalRadius:.14,minX:p.minX,maxX:p.maxX,minZ:p.minZ,maxZ:p.maxZ}).addComponent(x,"SidewalkBounds",p).addComponent(x,"CharacterAnimation",y).addComponent(x,"CameraFollow",{...Mn,autoOrbit:!!n.autoOrbit,orbitAngle:0,orbitSpeed:.42,initialized:!1}).addComponent(x,"Renderable",{object3D:r,disposeOnDestroy:!0});const A=1/Math.max(1e-4,Math.abs(a.scale.x)),C=new q("#F6DFAA"),S=new q("#EEBE72"),M=new Kr(C,21.5,36,Math.PI*.29,.54,1.28);M.position.set(-1.12*A,1.18*A,.24*A),M.target.position.set(-.4*A,-.25*A,18*A),a.add(M),a.add(M.target);const P=new Kr(C,21.5,38,Math.PI*.31,.54,1.28);P.position.set(1.12*A,1.18*A,.24*A),P.target.position.set(4.8*A,.45*A,17*A),a.add(P),a.add(P.target);const H=new sn(S,12.2,27,1.38);H.position.set(.85*A,1.35*A,4.4*A),a.add(H);const k=new sn(new q("#BE3E3E"),3,10,1.6);k.position.set(0,1.05*A,-9.5*A),a.add(k);for(const D of t.materials.carHeadlightCovers)D.emissive=C.clone(),D.emissiveIntensity=1.12;const z=i.createEntity();i.addComponent(z,"LifecycleTag",{role:"vehicle",label:"Carro_Grupo"}).addComponent(z,"DepthLayer",{layer:"midground",order:1,contrastPriority:.9}).addComponent(z,"Transform",{x:Sn.laneX,y:Sn.laneY,z:Sn.startZ,rotX:a.rotation.x,rotY:Sn.headingYaw,rotZ:a.rotation.z,scaleX:a.scale.x,scaleY:a.scale.y,scaleZ:a.scale.z}).addComponent(z,"TrafficCycle",{cycleDuration:Sn.cycleDuration,activeDuration:Sn.activeDuration,laneX:Sn.laneX,laneY:Sn.laneY,startZ:Sn.startZ,endZ:Sn.endZ,headingYaw:Sn.headingYaw,timeOffset:0,headlightLeft:M,headlightRight:P,streetThrowLight:H,taillightGlow:k,baseSpotIntensity:21.5,basePointIntensity:12.2,baseTailIntensity:3,headlightMaterials:t.materials.carHeadlightCovers}).addComponent(z,"Renderable",{object3D:a,disposeOnDestroy:!0}),e.cidadeEntityId=l,e.playerEntityId=x,e.carroEntityId=z,li.applyAtmosphere(e,n,i)}static applyAtmosphere(e,t,n){const i=t.atmosphere,s=new q(t.palette.background);e.scene.background=s;const r=e.scene.fog;r&&r.isFogExp2&&(r.color.copy(s),r.density=i==="rain"?.023:i==="day"?.01:.015);const a=new q(t.palette.coolAmbient),l=new q(t.palette.warmLight),c=e.urbanLightRig;if(i==="day"){e.ambientHemi.color.copy(a).lerp(new q("#D5E2EC"),.55),e.ambientHemi.groundColor.set("#222D36"),e.ambientHemi.intensity=1.55,e.keyDirLight.color.set("#E2ECF4"),e.keyDirLight.intensity=2.95,e.keyDirLight.position.set(18,32,16),e.rimDirLight.color.copy(a),e.rimDirLight.intensity=.68,c.storefrontEastLight.intensity=1.25,c.storefrontWestLight.intensity=1.15,c.kioskWarmLight.intensity=.85,c.streetLampWest.intensity=1.05,c.streetLampCenter.intensity=.95,c.streetLampEast.intensity=.85,c.avenueBeaconLight.intensity=.7;for(const h of c.emissiveFixtureMaterials)h.emissiveIntensity=.24;e.playerRimLight&&(e.playerRimLight.intensity=1.1)}else if(i==="rain"){e.ambientHemi.color.copy(a),e.ambientHemi.groundColor.set("#05080B"),e.ambientHemi.intensity=.32,e.keyDirLight.color.copy(a).lerp(new q("#9BB0C2"),.35),e.keyDirLight.intensity=.62,e.keyDirLight.position.set(14,27,18),e.rimDirLight.color.copy(l),e.rimDirLight.intensity=.42,c.storefrontEastLight.intensity=10.8,c.storefrontWestLight.intensity=10.2,c.kioskWarmLight.intensity=7.6,c.streetLampWest.intensity=14.2,c.streetLampCenter.intensity=12.4,c.streetLampEast.intensity=10.8,c.avenueBeaconLight.intensity=7;for(const h of c.emissiveFixtureMaterials)h.emissiveIntensity=1.82;e.playerRimLight&&(e.playerRimLight.intensity=3.8)}else{e.ambientHemi.color.copy(a),e.ambientHemi.groundColor.set("#060A0E"),e.ambientHemi.intensity=.36,e.keyDirLight.color.copy(a).lerp(new q("#C4D3E0"),.4),e.keyDirLight.intensity=.72,e.keyDirLight.position.set(16,28,18),e.rimDirLight.color.copy(l),e.rimDirLight.intensity=.38,c.storefrontEastLight.intensity=9.2,c.storefrontWestLight.intensity=8.8,c.kioskWarmLight.intensity=6.4,c.streetLampWest.intensity=12.2,c.streetLampCenter.intensity=10.6,c.streetLampEast.intensity=9.2,c.avenueBeaconLight.intensity=5.8;for(const h of c.emissiveFixtureMaterials)h.emissiveIntensity=1.55;e.playerRimLight&&(e.playerRimLight.intensity=3.4)}if(e.keyDirLight.castShadow=t.enableShadows,e.waypointMarker.material.color.copy(l),e.assets){const h=(D,ee)=>{if(!D.normalMap||!D.normalScale)return;const he=typeof D.userData.__baseNormalScaleX=="number"?D.userData.__baseNormalScaleX:D.normalScale.x,de=typeof D.userData.__baseNormalScaleY=="number"?D.userData.__baseNormalScaleY:D.normalScale.y;D.normalScale.set(he*ee,de*ee)},u=i==="rain"?.12:i==="day"?.9:.26,d=i==="rain"?.42:i==="day"?.04:.28,f=i==="day"?"#E4E9EE":i==="rain"?"#58626C":"#646F7A",p=i==="rain"?.62:i==="day"?1.08:.92;for(const D of e.assets.materials.roads)D.roughness=u,D.metalness=d,D.color.set(f),h(D,p);const v=i==="rain"?.18:i==="day"?.88:.38,g=i==="rain"?.32:i==="day"?.05:.18,m=i==="day"?"#E8EDF2":i==="rain"?"#707B86":"#7C8894",_=i==="rain"?.74:i==="day"?1.08:.96;for(const D of e.assets.materials.sidewalks)D.roughness=v,D.metalness=g,D.color.set(m),h(D,_);const x=i==="day"?"#F2F5F8":i==="rain"?"#848F9A":"#8E9AA6",y=i==="day"?1.15:i==="rain"?.96:1.06;for(const D of e.assets.materials.walls)D.color.set(x),h(D,y);const L=i==="day"?.08:i==="rain"?.34:.28,w=i==="day"?1.08:1;for(const D of e.assets.materials.character)D.color.set(i==="day"?"#DCE6F0":"#E6F0F8"),h(D,w),D.emissive&&(D.emissive.set("#2C4456"),D.emissiveIntensity=L);const A=i==="day"?.06:i==="rain"?.28:.24,C=i==="rain"?.88:1;for(const D of e.assets.materials.carBody)h(D,C),D.emissive&&(D.emissive.set("#1F3140"),D.emissiveIntensity=A);const S=i==="day"?.06:i==="rain"?.82:.72,M=new q("#ECA84C");for(const D of e.assets.materials.windows)D.emissive&&(D.emissive.copy(M),D.emissiveIntensity=S);const P=i==="day"?.08:i==="rain"?.68:.58,H=new q("#E2A24A");for(const D of e.assets.materials.kioskGlass)D.emissive&&(D.emissive.copy(H),D.emissiveIntensity=P);const k=i==="day"?.04:i==="rain"?.42:.34,z=new q("#5AA6B8");for(const D of e.assets.materials.billboards)D.emissive&&(D.emissive.copy(z),D.emissiveIntensity=k);const V=i==="day"?.02:i==="rain"?.12:.1,U=new q("#1E4A30");for(const D of e.assets.materials.foliage)D.emissive&&(D.emissive.copy(U),D.emissiveIntensity=V);const K=i==="day"?.18:i==="rain"?1.28:1.15;for(const D of e.assets.materials.streetLamps)D.emissiveIntensity=K}if(n&&e.carroEntityId!==null){const h=n.getComponent(e.carroEntityId,"TrafficCycle");h&&(i==="day"?(h.baseSpotIntensity=5.5,h.basePointIntensity=2.8,h.baseTailIntensity=.8):i==="rain"?(h.baseSpotIntensity=26.5,h.basePointIntensity=14.5,h.baseTailIntensity=3.6):(h.baseSpotIntensity=21.5,h.basePointIntensity=12.2,h.baseTailIntensity=3))}}}const wt=class wt{constructor(e){N(this,"scene");N(this,"config");N(this,"baseCam",new E);N(this,"baseLookAt",new E);N(this,"currentLookAt",new E);N(this,"cursorLight");N(this,"rainPoints",null);N(this,"rainPositions",null);N(this,"rainSpeeds",null);N(this,"rainActive",!1);this.scene=e.scene,this.config=e.config,this.baseCam.set(...e.baseCameraPos),this.baseLookAt.set(...e.lookAtTarget),this.currentLookAt.copy(this.baseLookAt),this.cursorLight=new sn(new q(this.config.palette.cursorLight),this.config.mode==="playground"?this.config.cursorLightIntensity*2.2:0,11.5,1.8),this.cursorLight.position.set(-2,1.8,0),this.scene.add(this.cursorLight),this.syncWeatherParticles()}applyConfig(e){this.config=e,this.cursorLight.color.set(this.config.palette.cursorLight),this.cursorLight.intensity=this.config.mode==="playground"?this.config.cursorLightIntensity*2.2:0,this.syncWeatherParticles()}setCameraAnchors(e,t){this.baseCam.set(...e),this.baseLookAt.set(...t)}isRainActive(){return this.rainActive}getCursorLightWorldPosition(){return this.cursorLight.position}syncWeatherParticles(){const e=this.config.mode==="playground"&&this.config.atmosphere==="rain";if(e&&!this.rainPoints){const t=wt.RAIN_COUNT,n=new Float32Array(t*3),i=new Float32Array(t);for(let a=0;a<t;a++)n[a*3]=-6+(Math.random()-.5)*wt.RAIN_SPAN_X,n[a*3+1]=Math.random()*wt.RAIN_TOP_Y,n[a*3+2]=(Math.random()-.5)*wt.RAIN_SPAN_Z,i[a]=12.5+Math.random()*6.5;const s=new He;s.setAttribute("position",new Je(n,3));const r=new Br({color:new q(this.config.palette.coolAmbient).lerp(new q("#AFC2D2"),.45),size:.14,transparent:!0,opacity:.62,depthWrite:!1});this.rainPoints=new Va(s,r),this.rainPoints.name="WeatherRainParticles",this.rainPoints.frustumCulled=!1,this.rainPoints.userData.skipNormalPass=!0,this.rainPositions=n,this.rainSpeeds=i,this.scene.add(this.rainPoints)}this.rainActive=e,this.rainPoints&&(this.rainPoints.visible=e,this.rainPoints.material.color.set(this.config.palette.coolAmbient).lerp(new q("#AFC2D2"),.45))}update(e,t,n,i){if(this.config.mode==="mascot"){const s=1-Math.exp(-this.config.parallaxSmoothing*n),r=Math.sin(i*.55)*.04;e.position.x+=(this.baseCam.x-e.position.x)*s,e.position.y+=(this.baseCam.y+r-e.position.y)*s,e.position.z+=(this.baseCam.z-e.position.z)*s,this.currentLookAt.lerp(this.baseLookAt,s),e.lookAt(this.currentLookAt)}if(this.config.mode==="playground"){const s=e.position.x-Mn.offsetX,r=e.position.z-Mn.offsetZ,a=s+t.normX*7.5,l=1.85+t.normY*1.4,c=r-t.normY*5.4,h=1-Math.exp(-8.5*n);this.cursorLight.position.x+=(a-this.cursorLight.position.x)*h,this.cursorLight.position.y+=(l-this.cursorLight.position.y)*h,this.cursorLight.position.z+=(c-this.cursorLight.position.z)*h;const u=t.active?1+t.motionSpeed*.35:.3;this.cursorLight.intensity=this.config.cursorLightIntensity*2.2*u}if(this.rainActive&&this.rainPoints&&this.rainPositions&&this.rainSpeeds&&n>0){const s=this.rainPositions,r=this.rainSpeeds,a=r.length,l=e.position.x-Mn.offsetX,c=e.position.z-Mn.offsetZ,h=wt.RAIN_SPAN_X*.5,u=wt.RAIN_SPAN_Z*.5,d=-2.2*this.config.windStrength;for(let p=0;p<a;p++){const v=p*3;s[v]=s[v]+d*n,s[v+1]=s[v+1]-r[p]*n,s[v+1]<wt.RAIN_BOTTOM_Y?(s[v+1]=wt.RAIN_TOP_Y,s[v]=l+(Math.random()-.5)*wt.RAIN_SPAN_X,s[v+2]=c+(Math.random()-.5)*wt.RAIN_SPAN_Z):(s[v]<l-h?s[v]=s[v]+wt.RAIN_SPAN_X:s[v]>l+h&&(s[v]=s[v]-wt.RAIN_SPAN_X),s[v+2]<c-u?s[v+2]=s[v+2]+wt.RAIN_SPAN_Z:s[v+2]>c+u&&(s[v+2]=s[v+2]-wt.RAIN_SPAN_Z))}const f=this.rainPoints.geometry.getAttribute("position");f.needsUpdate=!0}}dispose(){this.cursorLight.parent&&this.cursorLight.parent.remove(this.cursorLight),this.cursorLight.dispose(),this.rainPoints&&(this.rainPoints.parent&&this.rainPoints.parent.remove(this.rainPoints),this.rainPoints.geometry.dispose(),this.rainPoints.material.dispose(),this.rainPoints=null),this.rainPositions=null,this.rainSpeeds=null}};N(wt,"RAIN_COUNT",620),N(wt,"RAIN_SPAN_X",46),N(wt,"RAIN_SPAN_Z",44),N(wt,"RAIN_TOP_Y",17.5),N(wt,"RAIN_BOTTOM_Y",-.35);let Ll=wt;const Uh=new WeakMap;class Nh extends Xt{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new hn(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,r=>{this.parse(r,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,yt,n).catch(n)}decodeDracoFile(e,t,n,i,s=Ut,r=()=>{}){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t).catch(r)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Uh.has(e)){const l=Uh.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,r=e.byteLength,a=this._getWorker(s,r).then(l=>(i=l,new Promise((c,h)=>{i._callbacks[s]={resolve:c,reject:h},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Uh.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new He;e.index&&t.setIndex(new Je(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,r=i.array,a=i.itemSize,l=new Je(r,a);s==="color"&&(this._assignVertexColorSpace(l,i.vertexColorSpace),l.normalized=!(r instanceof Float32Array)),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==yt)return;const n=new q;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i),$e.toWorkingColorSpace(n,yt),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new hn(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=WM.toString(),r=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([r]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const r=s.data;switch(r.type){case"decode":i._callbacks[r.id].resolve(r);break;case"error":i._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function WM(){let o,e;onmessage=function(r){const a=r.data;switch(a.type){case"init":o=a.decoderConfig,e=new Promise(function(h){o.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(o)});break;case"decode":const l=a.buffer,c=a.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder;try{const f=t(u,d,new Int8Array(l),c),p=f.attributes.map(v=>v.array.buffer);f.index&&p.push(f.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:f},p)}catch(f){console.error(f),self.postMessage({type:"error",id:a.id,error:f.message})}finally{u.destroy(d)}});break}};function t(r,a,l,c){const h=c.attributeIDs,u=c.attributeTypes;let d,f;const p=a.GetEncodedGeometryType(l);if(p===r.TRIANGULAR_MESH)d=new r.Mesh,f=a.DecodeArrayToMesh(l,l.byteLength,d);else if(p===r.POINT_CLOUD)d=new r.PointCloud,f=a.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const v={index:null,attributes:[]};for(const g in h){const m=self[u[g]];let _,x;if(c.useUniqueIDs)x=h[g],_=a.GetAttributeByUniqueId(d,x);else{if(x=a.GetAttributeId(d,r[h[g]]),x===-1)continue;_=a.GetAttribute(d,x)}const y=i(r,a,d,g,m,_);g==="color"&&(y.vertexColorSpace=c.vertexColorSpace),v.attributes.push(y)}return p===r.TRIANGULAR_MESH&&(v.index=n(r,a,d)),r.destroy(d),v}function n(r,a,l){const h=l.num_faces()*3,u=h*4,d=r._malloc(u);a.GetTrianglesUInt32Array(l,u,d);const f=new Uint32Array(r.HEAPF32.buffer,d,h).slice();return r._free(d),{array:f,itemSize:1}}function i(r,a,l,c,h,u){const d=u.num_components(),p=l.num_points()*d,v=p*h.BYTES_PER_ELEMENT,g=s(r,h),m=r._malloc(v);a.GetAttributeDataArrayForAllPoints(l,u,g,v,m);const _=new h(r.HEAPF32.buffer,m,p).slice();return r._free(m),{name:c,array:_,itemSize:d}}function s(r,a){switch(a){case Float32Array:return r.DT_FLOAT32;case Int8Array:return r.DT_INT8;case Int16Array:return r.DT_INT16;case Int32Array:return r.DT_INT32;case Uint8Array:return r.DT_UINT8;case Uint16Array:return r.DT_UINT16;case Uint32Array:return r.DT_UINT32}}}function Xp(o,e){if(e===wu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===Qo||e===$l){let t=o.getIndex();if(t===null){const r=[],a=o.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)r.push(l);o.setIndex(r),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const n=t.count-2,i=[];if(e===Qo)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=o.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}class Fh extends Xt{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new KM(t)}),this.register(function(t){return new $M(t)}),this.register(function(t){return new rS(t)}),this.register(function(t){return new oS(t)}),this.register(function(t){return new aS(t)}),this.register(function(t){return new JM(t)}),this.register(function(t){return new QM(t)}),this.register(function(t){return new eS(t)}),this.register(function(t){return new tS(t)}),this.register(function(t){return new ZM(t)}),this.register(function(t){return new nS(t)}),this.register(function(t){return new jM(t)}),this.register(function(t){return new sS(t)}),this.register(function(t){return new iS(t)}),this.register(function(t){return new YM(t)}),this.register(function(t){return new lS(t)}),this.register(function(t){return new cS(t)})}load(e,t,n,i){const s=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=Ai.extractUrlBase(e);r=Ai.resolveURL(c,this.path)}else r=Ai.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new hn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const r={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Yp){try{r[je.KHR_BINARY_GLTF]=new hS(e)}catch(u){i&&i(u);return}s=JSON.parse(r[je.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new bS(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,r[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:r[u]=new qM;break;case je.KHR_DRACO_MESH_COMPRESSION:r[u]=new uS(s,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:r[u]=new dS;break;case je.KHR_MESH_QUANTIZATION:r[u]=new fS;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(r),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function XM(){let o={};return{get:function(e){return o[e]},add:function(e,t){o[e]=t},remove:function(e){delete o[e]},removeAll:function(){o={}}}}const je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class YM{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new q(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ut);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Hn(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new sn(h),c.distance=u;break;case"spot":c=new Kr(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,ci(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class qM{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return zt}extendParams(e,t,n){const i=[];e.color=new q(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],Ut),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,yt))}return Promise.all(i)}}class ZM{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class KM{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const a=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new j(a,a)}return Promise.all(s)}}class $M{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class jM{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}}class JM{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new q(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){const a=r.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ut)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,yt)),r.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}}class QM{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}}class eS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const a=r.attenuationColor||[1,1,1];return t.attenuationColor=new q().setRGB(a[0],a[1],a[2],Ut),Promise.all(s)}}class tS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class nS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));const a=r.specularColorFactor||[1,1,1];return t.specularColor=new q().setRGB(a[0],a[1],a[2],Ut),r.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,yt)),Promise.all(s)}}class iS{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(s)}}class sS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(s)}}class rS{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}}class oS{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],a=i.images[r.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class aS{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],a=i.images[r.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class lS{constructor(e){this.name=je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){const f=new ArrayBuffer(h*u);return r.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class cS{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==bn.TRIANGLES&&c.mode!==bn.TRIANGLE_STRIP&&c.mode!==bn.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=n.extensions[this.name].attributes,a=[],l={};for(const c in r)a.push(this.parser.getDependency("accessor",r[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const p of u){const v=new De,g=new E,m=new Bt,_=new E(1,1,1),x=new Vc(p.geometry,p.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,y),l.SCALE&&_.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,v.compose(g,m,_));for(const y in l)if(y==="_COLOR_0"){const L=l[y];x.instanceColor=new $i(L.array,L.itemSize,L.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&p.geometry.setAttribute(y,l[y]);tt.prototype.copy.call(x,p),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Yp="glTF",no=12,qp={JSON:1313821514,BIN:5130562};class hS{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,no),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Yp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-no,s=new DataView(e,no);let r=0;for(;r<i;){const a=s.getUint32(r,!0);r+=4;const l=s.getUint32(r,!0);if(r+=4,l===qp.JSON){const c=new Uint8Array(e,no+r,a);this.content=n.decode(c)}else if(l===qp.BIN){const c=no+r;this.body=e.slice(c,c+a)}r+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class uS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,a={},l={},c={};for(const h in r){const u=Bh[h]||h.toLowerCase();a[u]=r[h]}for(const h in e.attributes){const u=Bh[h]||h.toLowerCase();if(r[h]!==void 0){const d=n.accessors[e.attributes[h]],f=nr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const v=f.attributes[p],g=l[p];g!==void 0&&(v.normalized=g)}u(f)},a,c,Ut,d)})})}}class dS{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class fS{constructor(){this.name=je.KHR_MESH_QUANTIZATION}}class Zp extends $s{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,v=p-c,g=-2*f+3*d,m=f-d,_=1-g,x=m-d+u;for(let y=0;y!==a;y++){const L=r[v+y+a],w=r[v+y+l]*h,A=r[p+y+a],C=r[p+y]*h;s[y]=_*L+x*w+g*A+m*C}return s}}const pS=new Bt;class mS extends Zp{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return pS.fromArray(s).normalize().toArray(s),s}}const bn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},nr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Kp={9728:vt,9729:at,9984:vo,9985:ys,9986:Ui,9987:pn},$p={33071:Zt,33648:vs,10497:On},Oh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Bh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ci={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},gS={CUBICSPLINE:void 0,LINEAR:Ms,STEP:_s},kh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function vS(o){return o.DefaultMaterial===void 0&&(o.DefaultMaterial=new xn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Fn})),o.DefaultMaterial}function fs(o,e,t){for(const n in t.extensions)o[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ci(o,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(o.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function yS(o,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(o);const r=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):o.attributes.position;r.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):o.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):o.attributes.color;l.push(d)}}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(o.morphAttributes.position=h),i&&(o.morphAttributes.normal=u),s&&(o.morphAttributes.color=d),o.morphTargetsRelative=!0,o})}function xS(o,e){if(o.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)o.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(o.morphTargetInfluences.length===t.length){o.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)o.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _S(o){let e;const t=o.extensions&&o.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+zh(t.attributes):e=o.indices+":"+zh(o.attributes)+":"+o.mode,o.targets!==void 0)for(let n=0,i=o.targets.length;n<i;n++)e+=":"+zh(o.targets[n]);return e}function zh(o){let e="";const t=Object.keys(o).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+o[t[n]]+";";return e}function Hh(o){switch(o){case Int8Array:return .007874015748031496;case Uint8Array:return .00392156862745098;case Int16Array:return 3051850947599719e-20;case Uint16Array:return 15259021896696422e-21;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function MS(o){return o.search(/\.jpe?g($|\?)/i)>0||o.search(/^data\:image\/jpeg/)===0?"image/jpeg":o.search(/\.webp($|\?)/i)>0||o.search(/^data\:image\/webp/)===0?"image/webp":o.search(/\.ktx2($|\?)/i)>0||o.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const SS=new De;class bS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new XM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,r=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new Hf(this.options.manager):this.textureLoader=new Qf(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new hn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){const a={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return fs(s,a,i),ci(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i].joints;for(let a=0,l=r.length;a<l;a++)e[r[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(r,a)=>{const l=this.associations.get(r);l!=null&&this.associations.set(a,l);for(const[c,h]of r.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,r){n.load(Ai.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const r=Oh[i.type],a=nr[i.componentType],l=i.normalized===!0,c=new a(i.count*r);return Promise.resolve(new Je(c,r,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){const a=r[0],l=Oh[i.type],c=nr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let v,g;if(f&&f!==u){const m=Math.floor(d/f),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let x=t.cache.get(_);x||(v=new c(a,m*f,i.count*f/h),x=new Rr(v,f/h),t.cache.add(_,x)),g=new Si(x,l,d%f/h,p)}else a===null?v=new c(i.count*l):v=new c(a,d,i.count*l),g=new Je(v,l,p);if(i.sparse!==void 0){const m=Oh.SCALAR,_=nr[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,L=new _(r[1],x,i.sparse.count*m),w=new c(r[2],y,i.sparse.count*l);a!==null&&(g=new Je(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,C=L.length;A<C;A++){const S=L[A];if(g.setX(S,w[A*l]),l>=2&&g.setY(S,w[A*l+1]),l>=3&&g.setZ(S,w[A*l+2]),l>=4&&g.setW(S,w[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s];let a=this.textureLoader;if(r.uri){const l=n.manager.getHandler(r.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,r=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[r.sampler]||{};return h.magFilter=Kp[d.magFilter]||at,h.minFilter=Kp[d.minFilter]||pn,h.wrapS=$p[d.wrapS]||On,h.wrapT=$p[d.wrapT]||On,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==vt&&h.minFilter!==at,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const r=i.images[e],a=self.URL||self.webkitURL;let l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=n.getDependency("bufferView",r.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:r.mimeType});return l=a.createObjectURL(d),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(v){const g=new gt(v);g.needsUpdate=!0,d(g)}),t.load(Ai.resolveURL(u,s.path),p,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),ci(u,r),u.userData.mimeType=r.mimeType||MS(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[je.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(r);r=s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(r,a),s.associations.set(r,l)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Br,Rt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Wt,Rt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||r){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),r&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),r&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return xn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let r;const a={},l=s.extensions||{},c=[];if(l[je.KHR_MATERIALS_UNLIT]){const u=i[je.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new q(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Ut),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,yt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=fn);const h=s.alphaMode||kh.OPAQUE;if(h===kh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===kh.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==zt&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new j(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&r!==zt&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==zt){const u=s.emissiveFactor;a.emissive=new q().setRGB(u[0],u[1],u[2],Ut)}return s.emissiveTexture!==void 0&&r!==zt&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,yt)),Promise.all(c).then(function(){const u=new r(a);return s.name&&(u.name=s.name),ci(u,s),t.associations.set(u,{materials:e}),s.extensions&&fs(i,u,s),u})}createUniqueName(e){const t=nt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return jp(l,a,t)})}const r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=_S(c),u=i[h];if(u)r.push(u.promise);else{let d;c.extensions&&c.extensions[je.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=jp(new He,c,t),i[h]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,a=[];for(let l=0,c=r.length;l<c;l++){const h=r[l].material===void 0?vS(this.cache):this.getDependency("material",r[l].material);a.push(h)}return a.push(t.loadGeometries(r)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const v=h[f],g=r[f];let m;const _=c[f];if(g.mode===bn.TRIANGLES||g.mode===bn.TRIANGLE_STRIP||g.mode===bn.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new Hc(v,_):new Ne(v,_),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===bn.TRIANGLE_STRIP?m.geometry=Xp(m.geometry,$l):g.mode===bn.TRIANGLE_FAN&&(m.geometry=Xp(m.geometry,Qo));else if(g.mode===bn.LINES)m=new Ln(v,_);else if(g.mode===bn.LINE_STRIP)m=new ri(v,_);else if(g.mode===bn.LINE_LOOP)m=new qc(v,_);else if(g.mode===bn.POINTS)m=new Va(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&xS(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),ci(m,s),g.extensions&&fs(i,m,g),t.assignFinalMaterial(m),u.push(m)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&fs(i,u[0],s),u[0];const d=new Vt;s.extensions&&fs(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Et(et.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Bs(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ci(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),r=i,a=[],l=[];for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u){a.push(u);const d=new De;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Dr(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],v=f.target,g=v.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,_=i.parameters!==void 0?i.parameters[p.output]:p.output;v.node!==void 0&&(r.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",_)),c.push(p),h.push(v))}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],v=u[3],g=u[4],m=[];for(let _=0,x=d.length;_<x;_++){const y=d[_],L=f[_],w=p[_],A=v[_],C=g[_];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const S=n._createAnimationTracks(y,L,w,A,C);if(S)for(let M=0;M<S.length;M++)m.push(S[M])}return new js(s,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),r})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)r.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,SS)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new Ia:c.length>1?h=new Vt:c.length===1?h=c[0]:h=new tt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=r),ci(h,s),s.extensions&&fs(n,h,s),s.matrix!==void 0){const u=new De;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Vt;n.name&&(s.name=i.createUniqueName(n.name)),ci(s,n),n.extensions&&fs(t,s,n);const r=n.nodes||[],a=[];for(let l=0,c=r.length;l<c;l++)a.push(i.getDependency("node",r[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Rt||d instanceof gt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const r=[],a=e.name?e.name:e.uuid,l=[];Ci[s.path]===Ci.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Ci[s.path]){case Ci.weights:c=is;break;case Ci.rotation:c=ss;break;case Ci.position:case Ci.scale:c=os;break;default:switch(n.itemSize){case 1:c=is;break;case 2:case 3:default:c=os;break}break}const h=i.interpolation!==void 0?gS[i.interpolation]:Ms,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const p=new c(l[d]+"."+Ci[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),r.push(p)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Hh(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ss?mS:Zp;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function wS(o,e,t){const n=e.attributes,i=new Ct;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new E(l[0],l[1],l[2]),new E(c[0],c[1],c[2])),a.normalized){const h=Hh(nr[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new E,l=new E;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const v=Hh(nr[d.componentType]);l.multiplyScalar(v)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}o.boundingBox=i;const r=new Nt;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,o.boundingSphere=r}function jp(o,e,t){const n=e.attributes,i=[];function s(r,a){return t.getDependency("accessor",r).then(function(l){o.setAttribute(a,l)})}for(const r in n){const a=Bh[r]||r.toLowerCase();a in o.attributes||i.push(s(n[r],a))}if(e.indices!==void 0&&!o.index){const r=t.getDependency("accessor",e.indices).then(function(a){o.setIndex(a)});i.push(r)}return $e.workingColorSpace!==Ut&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$e.workingColorSpace}" not supported.`),ci(o,e),wS(o,e,t),Promise.all(i).then(function(){return e.targets!==void 0?yS(o,e.targets,t):o})}const Vn={cidade:"Cidade_Sketchfab_model",playerRig:"Player_Rig",carroGrupo:"Carro_Grupo"};function Vh(o){const e=(o??Js).trim()||Js;if(/^https?:\/\//i.test(e)||/^\/\//.test(e))throw new Error(`[GlbSceneLoader] External CDN URLs are forbidden by the zero-CDN policy for Draco decoders ("${e}"). Use a relative local path such as "./assets/draco/".`);return e.endsWith("/")?e:`${e}/`}function Gh(o){const e=(o??jr).trim()||jr;if(/^https?:\/\//i.test(e)||/^\/\//.test(e))throw new Error(`[GlbSceneLoader] External CDN URLs are forbidden by the zero-CDN policy for GLB models ("${e}"). Use a relative local path such as "./assets/models/cena_completa.glb".`);return e}function Jp(o){const e=l=>{const c=o.find(u=>u.name.toLowerCase()===l.toLowerCase());if(c)return c.clone();const h=o.find(u=>u.name.toLowerCase().includes(l.toLowerCase()));return h?h.clone():null},t=e("Idle"),n=e("Walking"),i=e("Casting");let s=0,r=0;if(t){const l=t.tracks.find(c=>/hips\.position$/i.test(c.name));l&&l.values.length>=3&&(s=l.values[0],r=l.values[1])}const a=l=>{if(!l)return null;for(const c of l.tracks){if(!/hips\.position$/i.test(c.name)||c.values.length<3)continue;const h=Float32Array.from(c.values),u=h[0]-s,d=h[1]-r;if(Math.hypot(u,d)>.05){for(let f=0;f<h.length;f+=3)h[f]=h[f]-u,h[f+1]=h[f+1]-d;c.values=h}}return l};return{Idle:a(t),Walking:a(n),Casting:a(i)}}function Wh(o,e){const t=o.scene,n=t.getObjectByName(Vn.cidade),i=t.getObjectByName(Vn.playerRig),s=t.getObjectByName(Vn.carroGrupo);if(!n||!i||!s){const V=[n?null:Vn.cidade,i?null:Vn.playerRig,s?null:Vn.carroGrupo].filter(Boolean).join(", ");throw Yt.disposeObject3D(t),new Error(`[GlbSceneLoader] Missing required root node(s) in cena_completa.glb: ${V}`)}const r=[],a=[],l=[],c=[],h=[],u=[],d=[],f=[],p=[],v=[],g=[],m=new Set,_=zp(),x=(V,U,K,D=.68)=>{if(V.normalMap&&V.normalMap.isTexture){V.normalMap.colorSpace=Tn;const ee=V.normalScale?V.normalScale.x:1,he=V.normalScale?V.normalScale.y:1,de=ee<0?-1:1,Ie=he<0?-1:1,Fe=de*Math.max(Math.abs(ee),D),W=Ie*Math.max(Math.abs(he),D);V.normalScale?V.normalScale.set(Fe,W):V.normalScale=new j(Fe,W)}else V.normalMap=U,V.normalScale=new j(K,K);V.userData.__baseNormalScaleX=V.normalScale.x,V.userData.__baseNormalScaleY=V.normalScale.y},y=[],L=[],w=[];n.updateMatrixWorld(!0);const A=V=>{const U=[V.name];let K=V.parent;for(;K&&K!==n;)K.name&&U.push(K.name),K=K.parent;return U.join("/")};n.traverse(V=>{const U=V;if(!U.isMesh)return;const K=Array.isArray(U.material)?U.material:[U.material],D=K[0];if(U.name==="Cidade_Object_331"||D&&D.opacity===0&&!D.transparent){U.visible=!1,U.castShadow=!1,U.receiveShadow=!1;return}const ee=A(U);/Cidade_leaves_0_3/i.test(ee)||/^Cidade_Object_(8|10|12)$/i.test(U.name)?y.push(U):/Cidade_leaves001_1_7/i.test(ee)||/^Cidade_Object_(15|17|19)$/i.test(U.name)?L.push(U):(/Cidade_(Plane05[23]_8[56]|Cylinder00[1-5]_(79|80|81|84|87))/i.test(ee)||/^Cidade_Object_(296|299|302|304|313|315|318|321|323|326|328)$/i.test(U.name))&&w.push(U);const he=K.map(Fe=>(Fe==null?void 0:Fe.name)??"").join(" ").toLowerCase(),de=/grass|leav|material\.005|material\.009/i.test(he),Ie=K.some(Fe=>!!(Fe&&Fe.transparent));Ie&&(U.userData.skipNormalPass=!0),U.castShadow=!de&&!Ie,U.receiveShadow=!Ie;for(const Fe of K){const W=Fe;if(!W||m.has(W.uuid))continue;m.add(W.uuid);const $=(W.name||"").toLowerCase();/palettematerial00[1-5]|material\.034/i.test($)&&W.metalness>=.85&&(W.metalnessMap=null,W.metalness=.32,W.roughness=Math.min(.56,Math.max(.28,W.roughness))),/real_road|road|asphalt/i.test($)?(x(W,_.asphalt,.78,.85),r.push(W)):/concrete_pavement|tiles/i.test($)?(x(W,_.pavement,.68,.82),a.push(W)):/window|wiind/i.test($)?c.push(W):/grass|leav|material\.005|material\.009/i.test($)?u.push(W):/palettematerial005|material\.033/i.test($)?d.push(W):/material\.026|material\.035/i.test($)?f.push(W):W.emissive&&W.emissive.r+W.emissive.g+W.emissive.b>.25?h.push(W):/wall|hous|roof|rust|metal|material\.0(01|03|07|08|10|11|12|14|16|17|20|21|24|28|29|30|31|32)/i.test($)?(x(W,_.facade,.56,.72),l.push(W)):Ie||x(W,_.facade,.42,.6)}});const C=(V,U,K)=>{if(K.length===0)return null;const D=new Ct;for(const ee of K)D.union(new Ct().setFromObject(ee));return{role:V,label:U,meshes:K,worldBox:D,occluded:!1}},S=[C("eastTree","Cidade_leaves_0_3 (East Plaza Tree)",y),C("westTree","Cidade_leaves001_1_7 (West Plaza Tree)",L),C("frontSign","Cidade_Plane052_053 (Foreground Hanging Sign)",w)].filter(V=>V!==null),M=new xn({name:"PlayerProtagonistMaterial",color:new q("#E2EDF5"),emissive:new q("#2A4152"),emissiveIntensity:.26,roughness:.38,metalness:.12});x(M,_.contourTrim,.38,.38),p.push(M),i.traverse(V=>{const U=V,K=V;if(U.isMesh){U.castShadow=!0,U.receiveShadow=!0;const ee=Array.isArray(U.material)?U.material[0]:U.material;!ee||!ee.map&&ee.metalness>=.85?(ee&&!m.has(ee.uuid)&&ee.dispose(),U.material=M):m.has(ee.uuid)||(m.add(ee.uuid),ee.metalness=Math.min(.22,ee.metalness),ee.roughness=Math.min(.55,Math.max(.3,ee.roughness)),x(ee,_.contourTrim,.38,.45),p.push(ee))}K.isSkinnedMesh&&(K.frustumCulled=!1)});const P=new Map;s.traverse(V=>{const U=V;if(!U.isMesh)return;const K=/headlight/i.test(U.name),D=/body_color|supra|chrome|rims/i.test(U.name),ee=/tire|rubber|blocker/i.test(U.name),de=(Array.isArray(U.material)?U.material:[U.material]).map(Ie=>{const Fe=Ie;if(!Fe)return Ie;Fe.transparent&&(U.userData.skipNormalPass=!0);const W=`${Fe.uuid}::${K?"hl":D?"body":ee?"tire":"trim"}`;let $=P.get(W);return $||($=Fe.clone(),$.metalnessMap=null,K?($.metalness=.1,$.roughness=.18,g.push($)):D?($.color=new q("#C8D6E2"),$.emissive=new q("#1B2A36"),$.emissiveIntensity=.22,$.metalness=.28,$.roughness=.28,x($,_.contourTrim,.32,.45),v.push($)):ee?($.color=new q("#283038"),$.metalness=.08,$.roughness=.78,x($,_.asphalt,.65,.75)):($.metalness=.25,$.roughness=.42,x($,_.contourTrim,.3,.45),v.push($)),P.set(W,$)),$});U.material=Array.isArray(U.material)?de:de[0],U.castShadow=!U.userData.skipNormalPass,U.receiveShadow=!U.userData.skipNormalPass});const H=Jp(o.animations??[]);let k=!1;return{sceneRoot:t,nodes:{cidade:n,playerRig:i,carroGrupo:s},clips:H,materials:{roads:r,sidewalks:a,walls:l,windows:c,streetLamps:h,foliage:u,kioskGlass:d,billboards:f,character:p,carBody:v,carHeadlightCovers:g},proceduralNormals:_,foregroundOccluders:S,dispose:()=>{k||(k=!0,Yt.disposeObject3D(n),Yt.disposeObject3D(i),Yt.disposeObject3D(s),Yt.disposeObject3D(t),_.dispose(),e==null||e())}}}class Qp{constructor(){N(this,"dracoLoader",null);N(this,"gltfLoader",null);N(this,"disposed",!1)}load(e){if(this.disposed)return Promise.reject(new Error("[GlbSceneLoader] Loader has already been disposed."));const t=Gh(e==null?void 0:e.modelUrl),n=Vh(e==null?void 0:e.dracoDecoderPath);return this.dracoLoader||(this.dracoLoader=new Nh),this.dracoLoader.setDecoderPath(n),this.dracoLoader.setWorkerLimit(Math.max(1,Math.min(8,Math.round((e==null?void 0:e.workerLimit)??4)))),this.dracoLoader.preload(),this.gltfLoader||(this.gltfLoader=new Fh,this.gltfLoader.setDRACOLoader(this.dracoLoader)),new Promise((i,s)=>{this.gltfLoader.load(t,r=>{if(this.disposed){Yt.disposeObject3D(r.scene),s(new Error("[GlbSceneLoader] Load cancelled because engine was destroyed."));return}try{const a=Wh(r);i(a)}catch(a){s(a instanceof Error?a:new Error(String(a)))}},r=>{if(this.disposed||!(e!=null&&e.onProgress))return;const a=r.loaded??0,l=r.lengthComputable&&r.total>0?r.total:0;e.onProgress({url:t,loaded:a,total:l,ratio:l>0?Math.min(1,a/l):-1})},r=>{const a=r instanceof Error?r.message:typeof r=="object"&&r!==null&&"message"in r?String(r.message):String(r);s(new Error(`[GlbSceneLoader] Failed to load "${t}": ${a}`))})})}parseBuffer(e,t=""){return this.disposed?Promise.reject(new Error("[GlbSceneLoader] Loader has already been disposed.")):(this.dracoLoader||(this.dracoLoader=new Nh,this.dracoLoader.setDecoderPath(Js),this.dracoLoader.setWorkerLimit(4)),this.gltfLoader||(this.gltfLoader=new Fh,this.gltfLoader.setDRACOLoader(this.dracoLoader)),new Promise((n,i)=>{this.gltfLoader.parse(e,t,s=>{try{n(Wh(s))}catch(r){i(r instanceof Error?r:new Error(String(r)))}},s=>{i(s instanceof Error?s:new Error(String(s)))})}))}dispose(){this.disposed||(this.disposed=!0,this.dracoLoader&&(this.dracoLoader.dispose(),this.dracoLoader=null),this.gltfLoader=null)}isDisposed(){return this.disposed}}const io="#13222E",em="#1D2B36",TS=`
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,AS=`
  precision highp float;

  uniform vec3 uBackdropColor;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    // Calibrated directly for the single canonical ASCII composite pass:
    // maps #13222E into calm atmospheric ASCII stipple (',' ':' ';') over the dark slate substrate
    vec3 backdropBase = pow(max(uBackdropColor, vec3(0.0001)), vec3(1.0 / 2.2));
    vec2 focus = vec2(vWorldPos.x * 0.24, (vWorldPos.y - 1.05) * 0.34);
    float studioPool = exp(-dot(focus, focus) * 1.45);
    float verticalFalloff = clamp(1.04 - max(vWorldPos.y, 0.0) * 0.055, 0.88, 1.04);
    float radianceScale = clamp(verticalFalloff * 0.255 + studioPool * 0.070, 0.24, 0.33);

    gl_FragColor = vec4(backdropBase * radianceScale, 1.0);
  }
`,ES=`
  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,CS=`
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

    // 1. Calibrated #1D2B36 floor radiance so the canonical ASCII ramp selects horizontal weave ('~' '+' '_' '-')
    float radialDist = length(relXz * vec2(0.38, 0.46));
    float depthGrade = clamp((vWorldPos.z - uHorizonZ) / 6.2, 0.0, 1.0);
    float floorLight = clamp(0.71 + depthGrade * 0.09 + exp(-radialDist * radialDist * 1.1) * 0.08, 0.70, 0.88);
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
    color = mix(color, backdropBase * 0.26, horizonSeam);

    gl_FragColor = vec4(color, 1.0);
  }
`;let Xh=null;function RS(){if(!Xh){const o=new Uint8Array([255,255,255,255]),e=new yn(o,1,1,Tt,mn);e.minFilter=vt,e.magFilter=vt,e.needsUpdate=!0,Xh=e}return Xh}class tm{static build(e){const t=new q(io),n=new q(em),i=new Gs;i.background=t.clone();const s=-3.35,r=new Ht({vertexShader:TS,fragmentShader:AS,uniforms:{uBackdropColor:{value:t.clone()}},depthWrite:!0}),a=new Ne(new si(26,14,1,1),r);a.name="MascotStageBackdrop",a.position.set(0,4.6,s),a.userData.isMascotBackdrop=!0,a.userData.skipObjectOutline=!0,i.add(a);const l=RS(),c=new Ht({vertexShader:ES,fragmentShader:CS,uniforms:{uFloorColor:{value:n.clone()},uBackdropColor:{value:t.clone()},uReflectBellyColor:{value:new q("#DCEBF5")},uReflectAmberColor:{value:new q("#FF9F1C")},uReflectRimColor:{value:new q("#7FA8C4")},uCamPos:{value:new E(0,1.08,4.25)},uSubjectPos:{value:new E(0,0,0)},uSubjectYaw:{value:.14},uHorizonZ:{value:s},uDirShadowMap:{value:l},uDirShadowMatrix:{value:new De},uShadowMapSize:{value:new j(1024,1024)},uShadowEnabled:{value:0}},depthWrite:!0}),h=new Ne(new si(24,12,1,1),c);h.name="MascotStageFloor",h.rotation.x=-Math.PI/2,h.position.set(0,0,-.55),h.receiveShadow=!0,h.userData.isMascotFloor=!0,h.userData.skipObjectOutline=!0,i.add(h);const u=new ul(13953527,3492958,.92);u.name="MascotHemiLight",i.add(u);const d=new Hn(16186111,1.24);d.name="MascotKeyLight",d.position.set(-2.1,3.6,4.1),e.enableShadows&&(d.castShadow=!0,d.shadow.mapSize.width=1024,d.shadow.mapSize.height=1024,d.shadow.radius=3.2,d.shadow.bias=-4e-4,d.shadow.normalBias=.02,d.shadow.camera.left=-1.8,d.shadow.camera.right=1.8,d.shadow.camera.top=2.5,d.shadow.camera.bottom=-.6,d.shadow.camera.near=.5,d.shadow.camera.far=12,d.shadow.camera.updateProjectionMatrix()),i.add(d);const f=new Hn(14478584,.56);f.name="MascotFillLight",f.position.set(2.4,1.9,3.5),i.add(f);const p=new Hn(10146032,.82);p.name="MascotRimLight",p.position.set(2.35,2.25,-2.9),i.add(p);const v=new Hn(8961758,.6);return v.name="MascotBackLeftRimLight",v.position.set(-2.25,2.1,-2.8),i.add(v),{scene:i,backdropMesh:a,backdropMaterial:r,floorMesh:h,floorMaterial:c,hemiLight:u,keyLight:d,fillLight:f,rimLight:p,backLeftRimLight:v}}}class nm{constructor(e,t){N(this,"container");N(this,"config");N(this,"state","idle");N(this,"userManuallyPaused",!1);N(this,"autoPausedOffscreen",!1);N(this,"autoPausedHiddenTab",!1);N(this,"isFullscreenActive",!1);N(this,"renderer",null);N(this,"scene",null);N(this,"camera",null);N(this,"lastAutoPlaygroundFov",null);N(this,"outlinedTargets",new Set);N(this,"postProcessor",null);N(this,"loop",null);N(this,"lifecycle",null);N(this,"pointerInput",null);N(this,"keyboardInput",null);N(this,"ecsWorld",null);N(this,"systemRunner",null);N(this,"vfx",null);N(this,"glbLoader",null);N(this,"builtUrbanStage",null);N(this,"glbLoaded",!1);N(this,"builtMascot",null);N(this,"mascotRootObj",null);N(this,"primaryEntityId",null);N(this,"lastResolutionProfile",null);N(this,"containerWidth",1);N(this,"containerHeight",1);N(this,"activeCellSize",8);N(this,"gridColumns",1);N(this,"gridRows",1);N(this,"effectiveDpr",1);N(this,"resolutionTier","desktop");N(this,"lastDrawCalls",0);N(this,"lastTriangles",0);N(this,"onPassivePointerMoveBound");N(this,"onContextLostBound");if(!e||!(e instanceof HTMLElement))throw new Error("[AsciiSceneEngine] A valid container HTMLElement is required to instantiate the engine.");this.container=e;const n=(t==null?void 0:t.mode)==="mascot"?Jr(wh,{fov:38,enableKeyboard:!1,bloomIntensity:.08,dofStrength:0,blockBlendWeight:0,palette:{background:io}}):wh;this.config=Jr(n,t),this.onPassivePointerMoveBound=this.handlePassiveContainerMove.bind(this),this.onContextLostBound=this.handleContextLost.bind(this)}mount(){var e,t,n,i,s,r;if(this.state==="destroyed")throw new Error("[AsciiSceneEngine] Cannot mount an engine instance that has already been destroyed. Create a new instance instead.");if(this.state==="idle")try{window.getComputedStyle(this.container).position==="static"&&(this.container.style.position="relative");const l=new Hd({antialias:!1,alpha:!1,powerPreference:"high-performance",stencil:!1,depth:!1}),c=Math.min(window.devicePixelRatio||1,this.config.maxPixelRatio);l.setPixelRatio(c),l.shadowMap.enabled=this.config.enableShadows,l.shadowMap.type=Nl,l.outputColorSpace=yt,l.info.autoReset=!0;const h=l.domElement;h.style.display="block",h.style.width="100%",h.style.height="100%",h.style.position="absolute",h.style.inset="0",h.style.zIndex="0",h.style.pointerEvents="none",h.setAttribute("aria-hidden","true"),h.dataset.asciiEngineCanvas="true",h.addEventListener("webglcontextlost",this.onContextLostBound,!1),this.container.prepend(h),this.renderer=l;const u=new Yt(this.container),d=new Bp(this.container,{trackWindowHover:!1}),f=new Fp({enabled:this.config.mode!=="mascot"&&this.config.enableKeyboard,focusTarget:this.container});this.config.mode!=="mascot"&&(d.attach(),this.config.enableKeyboard&&f.attach(),this.container.addEventListener("pointermove",this.onPassivePointerMoveBound,{passive:!0})),u.registerCleanup(()=>{this.container.removeEventListener("pointermove",this.onPassivePointerMoveBound),d.detach(),f.detach()}),this.lifecycle=u,this.pointerInput=d,this.keyboardInput=f;const p=new Dp,v=new Ip;this.ecsWorld=p,this.systemRunner=v,this.config.mode==="mascot"?this.initMascotStage(p,v):this.initPlaygroundStage(v,d,f),this.postProcessor=new ds(this.config);const g=this.container.getBoundingClientRect();this.applyResize(Math.max(1,g.width),Math.max(1,g.height),!0),u.observeContainer({onResize:(m,_)=>this.applyResize(m,_,!1),onVisibilityChange:m=>this.handleIntersectionVisibility(m),onTabHiddenChange:m=>this.handleTabVisibility(m),onFullscreenChange:m=>{this.isFullscreenActive=m}},{observeViewportIntersection:this.config.pauseOffscreen,observeTabVisibility:this.config.pauseOnHiddenTab}),this.loop=new Tp({maxFps:this.config.maxFps,onFrame:({dt:m,elapsed:_})=>this.renderFrame(m,_),onTelemetry:()=>{var m,_;return(_=(m=this.config.callbacks)==null?void 0:m.onFpsUpdate)==null?void 0:_.call(m,this.getStats())}}),this.state="running",this.loop.start(),(t=(e=this.config.callbacks)==null?void 0:e.onStateChange)==null||t.call(e,"running"),(i=(n=this.config.callbacks)==null?void 0:n.onMount)==null||i.call(n)}catch(a){const l=a instanceof Error?a:new Error(String(a));throw(r=(s=this.config.callbacks)==null?void 0:s.onError)==null||r.call(s,l),l}}initPlaygroundStage(e,t,n){const i=li.createStage(this.config);this.builtUrbanStage=i,this.scene=i.scene;const s=typeof this.config.fov=="number"?this.config.fov:58,r=[tr.x,tr.y,tr.z],a=[r[0]+Mn.offsetX,r[1]+Mn.offsetY,r[2]+Mn.offsetZ],l=[r[0]+Mn.lookAtOffsetX,r[1]+Mn.lookAtOffsetY,r[2]+Mn.lookAtOffsetZ],c=new Et(s,16/9,.15,160);c.position.set(...a),c.lookAt(...l),c.updateMatrixWorld(),this.camera=c,this.lastAutoPlaygroundFov=typeof this.config.fov=="number"?null:s,this.vfx=new Ll({scene:i.scene,config:this.config,baseCameraPos:a,lookAtTarget:l}),e.addSystem(new Cp(t,n,c),10).addSystem(new Rp,15).addSystem(new Eh(i.waypointMarker),20).addSystem(new Sp,28).addSystem(new bh,30).addSystem(new Lp(c),38).addSystem(new Pp(c),39).addSystem(new Ch,40);const h=new Qp;this.glbLoader=h,this.container.setAttribute("data-scene-loading","true"),h.load({modelUrl:this.config.modelUrl,dracoDecoderPath:this.config.dracoDecoderPath,onProgress:u=>{var d,f;(f=(d=this.config.callbacks)==null?void 0:d.onLoadProgress)==null||f.call(d,u)}}).then(u=>{var d,f,p,v,g;if(this.state==="destroyed"||!this.ecsWorld||!this.builtUrbanStage){u.dispose();return}li.attachPreparedAssets(this.builtUrbanStage,u,this.config,this.ecsWorld),this.primaryEntityId=this.builtUrbanStage.playerEntityId,this.glbLoaded=!0,this.container.removeAttribute("data-scene-loading"),this.container.setAttribute("data-glb-ready","true"),(f=this.systemRunner)==null||f.run(this.ecsWorld,{dt:0,elapsed:((d=this.loop)==null?void 0:d.getElapsedSeconds())??0}),this.renderer&&(this.renderer.shadowMap.needsUpdate=!0),this.state==="paused"&&((p=this.loop)==null||p.stepOnce(0)),(g=(v=this.config.callbacks)==null?void 0:v.onLoadReady)==null||g.call(v)}).catch(u=>{var f,p,v,g;if(this.state==="destroyed")return;this.container.removeAttribute("data-scene-loading"),this.container.setAttribute("data-glb-error","true");const d=u instanceof Error?u:new Error(String(u));(p=(f=this.config.callbacks)==null?void 0:f.onLoadError)==null||p.call(f,d),(g=(v=this.config.callbacks)==null?void 0:v.onError)==null||g.call(v,d)})}initMascotStage(e,t){this.config={...this.config,palette:{...this.config.palette,background:io}};const n=tm.build(this.config);this.builtMascot=n,this.scene=n.scene;const i=[0,1.08,4.25],s=[0,.9,0],r=typeof this.config.fov=="number"?this.config.fov:38,a=new Et(r,1,.3,40);a.position.set(...i),a.lookAt(...s),this.camera=a;const{entityId:l,rootGroup:c}=Np.spawn(e,n.scene,{position:[0,.04,0],scale:1.02,includeShowcaseRig:!1,bobAmplitude:.018});this.primaryEntityId=l,this.mascotRootObj=c,this.vfx=null,t.addSystem(new Eh,20).addSystem(new bh,30).addSystem(new Ch,40)}pause(){this.userManuallyPaused=!0,this.transitionToPaused()}resume(){this.userManuallyPaused=!1,this.tryResumeIfEligible()}setPlayableKeyboardEnabled(e){var t;this.config.enableKeyboard=e,this.config.mode!=="mascot"&&((t=this.keyboardInput)==null||t.setEnabled(e))}setAutoOrbit(e){var t;if(this.config.autoOrbit=!!e,this.ecsWorld&&((t=this.builtUrbanStage)==null?void 0:t.playerEntityId)!=null){const n=this.ecsWorld.getComponent(this.builtUrbanStage.playerEntityId,"CameraFollow");n&&(n.autoOrbit=!!e)}}isGlbLoaded(){return this.glbLoaded}resize(e,t=!1){this.state!=="destroyed"&&e.width>0&&e.height>0&&this.applyResize(e.width,e.height,t)}updateConfig(e){var l,c,h,u,d;if(this.state==="destroyed")return;const t=this.config.characterRamp,n=this.config.structuralChars,i=this.config.fontFamily,s=this.config.enableShadows,r=this.config.maxPixelRatio;if(this.config=Jr(this.config,e),this.config.mode!=="mascot"&&((l=this.keyboardInput)==null||l.setEnabled(this.config.enableKeyboard)),e.autoOrbit!==void 0&&this.setAutoOrbit(e.autoOrbit),(c=this.loop)==null||c.setMaxFps(this.config.maxFps),!this.renderer||!this.scene||!this.postProcessor)return;this.camera&&typeof e.fov=="number"&&(this.camera.fov=e.fov,this.camera.updateProjectionMatrix(),this.lastAutoPlaygroundFov=null),s!==this.config.enableShadows&&(this.renderer.shadowMap.enabled=this.config.enableShadows,this.builtMascot&&(this.builtMascot.keyLight.castShadow=this.config.enableShadows),this.renderer.shadowMap.needsUpdate=!0),this.builtMascot&&!((h=e.palette)!=null&&h.background)&&(this.config.palette.background=io),this.scene.background instanceof q&&this.scene.background.set(this.config.palette.background),this.builtUrbanStage?(li.applyAtmosphere(this.builtUrbanStage,this.config,this.ecsWorld??void 0),this.renderer.shadowMap.needsUpdate=!0):this.scene.fog instanceof Vs&&this.scene.fog.color.set(this.config.palette.background),(u=this.vfx)==null||u.applyConfig(this.config);const a=t!==this.config.characterRamp||n!==this.config.structuralChars||i!==this.config.fontFamily;if(r!==this.config.maxPixelRatio)this.applyResize(this.containerWidth,this.containerHeight,!1);else{const f=this.postProcessor.applyConfig(this.config,a,this.containerWidth,this.containerHeight,typeof window<"u"&&window.devicePixelRatio||1,this.isCoarsePointerDevice());this.lastResolutionProfile=f,this.activeCellSize=f.activeCellSize,this.gridColumns=f.columns,this.gridRows=f.rows,this.effectiveDpr=f.effectiveDpr,this.resolutionTier=f.tier}this.state==="paused"&&((d=this.loop)==null||d.stepOnce(0))}destroy(){var e,t,n,i,s,r,a,l,c;if(this.state!=="destroyed"){(e=this.loop)==null||e.stop(),this.loop=null,(t=this.systemRunner)==null||t.clear(),this.systemRunner=null;for(const h of this.outlinedTargets)to(h);if(this.outlinedTargets.clear(),this.glbLoader&&(this.glbLoader.dispose(),this.glbLoader=null),this.vfx&&(this.vfx.dispose(),this.vfx=null),(n=this.ecsWorld)==null||n.clear(!0),this.ecsWorld=null,(i=this.builtUrbanStage)!=null&&i.assets&&this.builtUrbanStage.assets.dispose(),this.builtUrbanStage=null,this.glbLoaded=!1,this.builtMascot=null,this.mascotRootObj=null,this.container.removeAttribute("data-scene-loading"),this.container.removeAttribute("data-glb-ready"),this.container.removeAttribute("data-glb-error"),(s=this.lifecycle)==null||s.disposeAll(this.scene),this.lifecycle=null,this.scene=null,this.camera=null,this.pointerInput=null,this.keyboardInput=null,this.postProcessor&&(this.postProcessor.dispose(),this.postProcessor=null),this.renderer){const h=this.renderer.domElement;h.removeEventListener("webglcontextlost",this.onContextLostBound,!1),this.renderer.renderLists.dispose(),this.renderer.dispose(),h.parentNode&&h.parentNode.removeChild(h),this.renderer=null}this.state="destroyed",(a=(r=this.config.callbacks)==null?void 0:r.onStateChange)==null||a.call(r,"destroyed"),(c=(l=this.config.callbacks)==null?void 0:l.onDestroy)==null||c.call(l)}}getState(){return this.state}getConfig(){return Jr(this.config)}getStats(){var t,n;const e=((t=this.loop)==null?void 0:t.getTelemetry())??{fps:60,frameTimeMs:16.67};return{fps:e.fps,frameTimeMs:e.frameTimeMs,activeCellSize:this.activeCellSize,gridColumns:this.gridColumns,gridRows:this.gridRows,drawCalls:this.lastDrawCalls,triangles:this.lastTriangles,entityCount:((n=this.ecsWorld)==null?void 0:n.getEntityCount())??0,effectiveDpr:this.effectiveDpr,resolutionTier:this.resolutionTier}}getResolutionProfile(){return this.lastResolutionProfile}getScene(){return this.scene}getWorld(){return this.ecsWorld}getCamera(){return this.camera}getPrimaryEntityAngles(){if(!this.ecsWorld||this.primaryEntityId===null)return null;const e=this.ecsWorld.getComponent(this.primaryEntityId,"Transform");return e?{yaw:e.rotY,pitch:e.rotX}:null}resolveOutlineTarget(e){var t,n,i;return!e&&e!==0?null:typeof e.traverse=="function"?e:e==="primary"?this.ecsWorld&&this.primaryEntityId!==null?((t=this.ecsWorld.getComponent(this.primaryEntityId,"Renderable"))==null?void 0:t.object3D)??null:null:typeof e=="number"?((i=(n=this.ecsWorld)==null?void 0:n.getComponent(e,"Renderable"))==null?void 0:i.object3D)??null:typeof e=="string"&&this.scene?this.scene.getObjectByName(e)??null:null}setObjectOutline(e,t){var a,l;if(this.state==="destroyed")return null;const n=this.resolveOutlineTarget(e);if(!n)return null;const i=Dh(n)!==null,s={...t??{}};!i&&s.highlightColor===void 0&&s.color===void 0&&(s.highlightColor=((a=this.config.palette)==null?void 0:a.cursorLight)||er);const r=Cl(n,s);return this.outlinedTargets.add(n),this.state==="paused"&&((l=this.loop)==null||l.stepOnce(0)),r}clearObjectOutline(e){var i,s;if(e===void 0){let r=0;for(const a of this.outlinedTargets)r+=to(a);return this.outlinedTargets.clear(),this.state==="paused"&&((i=this.loop)==null||i.stepOnce(0)),r}const t=this.resolveOutlineTarget(e);if(!t)return 0;const n=to(t);return this.outlinedTargets.delete(t),this.state==="paused"&&((s=this.loop)==null||s.stepOnce(0)),n}getObjectOutlineState(e){const t=this.resolveOutlineTarget(e);return t?Dh(t):null}renderFrame(e,t){var s;if(!this.renderer||!this.scene||!this.camera||!this.postProcessor)return;this.ecsWorld&&this.systemRunner&&this.systemRunner.run(this.ecsWorld,{dt:e,elapsed:t});const n=this.pointerInput?this.pointerInput.sample(0):{normX:0,normY:0,dragYaw:0,dragPitch:0,active:!1,isDown:!1,isTouch:!1,motionSpeed:0,lastInteractionMs:0};if((s=this.vfx)==null||s.update(this.camera,n,e,t),this.builtMascot){const r=this.builtMascot.floorMaterial.uniforms;r.uCamPos&&r.uCamPos.value.copy(this.camera.position);const a=this.builtMascot.keyLight.shadow;if(this.config.enableShadows&&a.map?(r.uDirShadowMap&&(r.uDirShadowMap.value=a.map.texture),r.uDirShadowMatrix&&r.uDirShadowMatrix.value.copy(a.matrix),r.uShadowMapSize&&r.uShadowMapSize.value.set(a.mapSize.width,a.mapSize.height),r.uShadowEnabled&&(r.uShadowEnabled.value=1)):r.uShadowEnabled&&(r.uShadowEnabled.value=0),this.mascotRootObj){this.mascotRootObj.updateWorldMatrix(!0,!1);const l=this.mascotRootObj.matrixWorld.elements;r.uSubjectYaw&&(r.uSubjectYaw.value=Math.atan2(l[8]??0,l[10]??1)),r.uSubjectPos&&r.uSubjectPos.value.set(l[12]??0,0,l[14]??0)}}const i=this.postProcessor.render(this.renderer,this.scene,this.camera,t,e);this.lastDrawCalls=i.drawCalls,this.lastTriangles=i.triangles}isCoarsePointerDevice(){if(typeof window>"u"||typeof window.matchMedia!="function")return!1;try{return window.matchMedia("(pointer: coarse)").matches}catch{return!1}}applyResize(e,t,n=!1){var c,h,u,d,f;if(!this.renderer||!this.camera||!this.postProcessor)return;const i=typeof window<"u"&&window.devicePixelRatio||1,s=this.isCoarsePointerDevice(),r=typeof document<"u"&&!!((h=(c=this.container).closest)!=null&&h.call(c,'[data-fullscreen-view="true"], .is-scene-fullscreen')),a=Ah({cssWidth:e,cssHeight:t,devicePixelRatio:i,config:this.config,isCoarsePointer:s,isFullscreen:this.isFullscreenActive||r});if(!n&&this.containerWidth===a.cssWidth&&this.containerHeight===a.cssHeight&&this.effectiveDpr===a.effectiveDpr&&this.activeCellSize===a.activeCellSize)return;this.lastResolutionProfile=a,this.containerWidth=a.cssWidth,this.containerHeight=a.cssHeight,this.effectiveDpr=a.effectiveDpr,this.resolutionTier=a.tier,this.activeCellSize=a.activeCellSize,this.gridColumns=a.columns,this.gridRows=a.rows,this.renderer.getPixelRatio()!==a.effectiveDpr&&this.renderer.setPixelRatio(a.effectiveDpr),this.renderer.setSize(a.cssWidth,a.cssHeight,!1);const l=Math.max(.1,a.cssWidth/Math.max(1,a.cssHeight));this.camera.aspect=l,typeof this.config.fov=="number"?(this.camera.fov=this.config.fov,this.lastAutoPlaygroundFov=null):this.config.mode==="playground"&&(this.lastAutoPlaygroundFov!==null&&Math.abs(this.camera.fov-this.lastAutoPlaygroundFov)>.01||(this.camera.fov=58,this.lastAutoPlaygroundFov=58)),this.camera.updateProjectionMatrix(),this.postProcessor.applyResolutionProfile(a,this.config,n),(d=(u=this.config.callbacks)==null?void 0:u.onResolutionChange)==null||d.call(u,a),this.state==="paused"&&((f=this.loop)==null||f.stepOnce(0))}transitionToPaused(){var e,t,n,i,s;this.state==="running"&&((e=this.loop)==null||e.pause(),this.state="paused",(n=(t=this.config.callbacks)==null?void 0:t.onStateChange)==null||n.call(t,"paused"),(s=(i=this.config.callbacks)==null?void 0:i.onPause)==null||s.call(i))}tryResumeIfEligible(){var e,t,n,i,s;this.state==="paused"&&(this.userManuallyPaused||this.autoPausedOffscreen||this.autoPausedHiddenTab||(this.state="running",(e=this.loop)==null||e.resume(),(n=(t=this.config.callbacks)==null?void 0:t.onStateChange)==null||n.call(t,"running"),(s=(i=this.config.callbacks)==null?void 0:i.onResume)==null||s.call(i)))}handleIntersectionVisibility(e){this.config.pauseOffscreen&&(e?(this.autoPausedOffscreen=!1,this.tryResumeIfEligible()):(this.autoPausedOffscreen=!0,this.transitionToPaused()))}handleTabVisibility(e){this.config.pauseOnHiddenTab&&(e?(this.autoPausedHiddenTab=!0,this.transitionToPaused()):(this.autoPausedHiddenTab=!1,this.tryResumeIfEligible()))}handlePassiveContainerMove(e){}handleContextLost(e){var t,n,i;e.preventDefault(),(t=this.loop)==null||t.pause(),(i=(n=this.config.callbacks)==null?void 0:n.onError)==null||i.call(n,new Error("[AsciiSceneEngine] WebGL context lost."))}}const im=jr,sm=[Vn.cidade,Vn.playerRig,Vn.carroGrupo],LS=["Idle","Walking","Casting"];function Ri(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function PS(o){const e=o.lastIndexOf("/");return e>=0?o.slice(0,e+1):"./"}function IS(o){let e=0,t=0,n=0;const i={};return o.traverse(s=>{s.name&&(i[s.name]=s);const r=s;if(r.isMesh&&r.geometry){e+=1;const a=r.geometry.getAttribute("position");a&&(t+=a.count);const l=r.geometry.getIndex();l?n+=Math.floor(l.count/3):a&&(n+=Math.floor(a.count/3))}}),{meshCount:e,vertexCount:t,triangleCount:n,nodesByName:i}}class DS{constructor(e={}){N(this,"decoderPath");N(this,"defaultModelUrl");N(this,"workerLimit");N(this,"fetchImpl");N(this,"dracoLoader",null);N(this,"gltfLoader",null);N(this,"loadedScenes",new Set);N(this,"disposed",!1);this.decoderPath=Vh(e.decoderPath??Js),this.defaultModelUrl=Gh(e.modelUrl??im);const t=Number.isFinite(e.workerLimit)?Number(e.workerLimit):4;this.workerLimit=Math.max(1,Math.min(8,Math.round(t))),this.fetchImpl=e.fetchImpl??(typeof globalThis.fetch=="function"?globalThis.fetch.bind(globalThis):null);const n=new Nh;n.setDecoderPath(this.decoderPath),n.setWorkerLimit(this.workerLimit),e.decoderType==="js"&&n.setDecoderConfig({type:"js"});const i=new Fh;i.setDRACOLoader(n),this.dracoLoader=n,this.gltfLoader=i}getDecoderPath(){return this.decoderPath}getWorkerLimit(){return this.workerLimit}preloadDecoder(){if(this.disposed||!this.dracoLoader)throw new Error("[SceneGlbLoader] Cannot preload a disposed loader.");this.dracoLoader.preload()}async load(e=this.defaultModelUrl){if(this.disposed||!this.gltfLoader||!this.dracoLoader)throw new Error("[SceneGlbLoader] Loader has already been disposed.");if(!this.fetchImpl)throw new Error("[SceneGlbLoader] Global fetch is unavailable in this environment.");const t=Ri(),n=Ri();this.dracoLoader.preload();const i=Ri()-n,s=Ri(),r=await this.fetchImpl(e);if(!r.ok)throw new Error(`[SceneGlbLoader] Failed to fetch "${e}" (HTTP ${r.status} ${r.statusText}).`);const a=await r.arrayBuffer(),l=Ri()-s,c=a.byteLength,h=Ri(),u=await this.gltfLoader.parseAsync(a,PS(e)),d=Ri()-h,f=Ri()-t,{meshCount:p,vertexCount:v,triangleCount:g,nodesByName:m}=IS(u.scene),_=sm.filter(S=>!!m[S]),x=(u.animations||[]).map(S=>S.name).filter(Boolean),y=c/(1024*1024),L=Math.max(f/1e3,1e-6),w=Number((y/L).toFixed(2));this.loadedScenes.add(u.scene);let A=!1;const C=()=>{A||(A=!0,this.loadedScenes.delete(u.scene),u.scene.parent&&u.scene.parent.remove(u.scene),Yt.disposeObject3D(u.scene))};return{gltf:u,scene:u.scene,animations:u.animations||[],nodesByName:m,metrics:{url:e,decoderPath:this.decoderPath,workerLimit:this.workerLimit,byteLength:c,decoderPreloadMs:Number(i.toFixed(2)),fetchMs:Number(l.toFixed(2)),decompressAndParseMs:Number(d.toFixed(2)),totalMs:Number(f.toFixed(2)),throughputMiBps:w,meshCount:p,vertexCount:v,triangleCount:g,preservedNodes:_,animationNames:x},dispose:C}}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.loadedScenes)e.parent&&e.parent.remove(e),Yt.disposeObject3D(e);this.loadedScenes.clear(),this.dracoLoader&&(this.dracoLoader.dispose(),this.dracoLoader=null),this.gltfLoader=null}}}return ye.AnimationSystem=bh,ye.AsciiEngineCore=nm,ye.AsciiPostProcessor=ds,ye.AsciiSceneEngine=nm,ye.CameraFollowSystem=Lp,ye.CharacterAnimationSystem=Sp,ye.DEFAULT_ASCII_RAMP=wp,ye.DEFAULT_DRACO_DECODER_PATH=Js,ye.DEFAULT_ENGINE_CONFIG=wh,ye.DEFAULT_OUTLINE_HIGHLIGHT_COLOR=er,ye.DEFAULT_PALETTE=bp,ye.DEFAULT_SCENE_GLB_URL=im,ye.DEFAULT_SCENE_MODEL_URL=jr,ye.DEFAULT_URBAN_PLAYER_SPAWN=tr,ye.DEFAULT_URBAN_SIDEWALK_BOUNDS=Rl,ye.EngineLoop=Tp,ye.GLB_NODE_NAMES=Vn,ye.GlbSceneLoader=Qp,ye.InputSystem=Cp,ye.KeyboardInput=Fp,ye.LifecycleManager=Yt,ye.LineOfSightOcclusionSystem=Pp,ye.MASCOT_BACKDROP_HEX=io,ye.MASCOT_FLOOR_HEX=em,ye.MascotStageBuilder=tm,ye.MovementRotationSystem=Eh,ye.NormalPassMaterialCache=Hp,ye.OUTLINE_SHELL_NAME=Ph,ye.PointerInput=Bp,ye.REQUIRED_SCENE_NLA_TRACKS=LS,ye.REQUIRED_SCENE_ROOT_NODES=sm,ye.RenderSyncSystem=Ch,ye.ResolutionTransitionController=Ep,ye.SceneGlbLoader=DS,ye.SystemRunner=Ip,ye.THREE=UM,ye.TrafficFlowSystem=Rp,ye.TuxEntityFactory=Np,ye.URBAN_CAMERA_FOLLOW_DEFAULTS=Mn,ye.URBAN_TRAFFIC_DEFAULTS=Sn,ye.UrbanGlbSceneBuilder=li,ye.VfxController=Ll,ye.World=Dp,ye.applyObjectOutline=Cl,ye.clampToSidewalkBounds=Ml,ye.clearObjectOutline=to,ye.computeAdaptiveResolution=Ah,ye.createGlyphAtlas=Lh,ye.createProceduralNormalMapSet=zp,ye.detectResolutionTier=Ap,ye.ensureWeldedOutlineNormals=Gp,ye.extractAndPrepareGlbNodes=Wh,ye.extractSceneDirectionalVectors=Vp,ye.getObjectOutlineState=Dh,ye.mergeEngineConfig=Jr,ye.normalizeCharacterClips=Jp,ye.normalizeRelativeDecoderPath=Vh,ye.normalizeRelativeModelUrl=Gh,ye.transitionCharacterClip=_l,Object.defineProperty(ye,Symbol.toStringTag,{value:"Module"}),ye}({});
