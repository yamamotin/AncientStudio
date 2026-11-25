var ASCIIRealms=function(De){"use strict";var LS=Object.defineProperty;var DS=(De,fn,fs)=>fn in De?LS(De,fn,{enumerable:!0,configurable:!0,writable:!0,value:fs}):De[fn]=fs;var F=(De,fn,fs)=>DS(De,typeof fn!="symbol"?fn+"":fn,fs);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fn="170",fs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Qp={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jh=0,Ml=1,jh=2,em=3,tm=0,Sl=1,wl=2,Ln=3,Dn=0,Ft=1,Mn=2,kn=0,ai=1,bl=2,Tl=3,Al=4,Qh=5,li=100,eu=101,tu=102,nu=103,iu=104,su=200,ru=201,ou=202,au=203,Qr=204,eo=205,lu=206,cu=207,hu=208,uu=209,du=210,fu=211,pu=212,mu=213,gu=214,to=0,no=1,io=2,Ci=3,so=4,ro=5,oo=6,ao=7,sr=0,vu=1,yu=2,Hn=0,xu=1,_u=2,Mu=3,Su=4,wu=5,bu=6,Tu=7,El="attached",Au="detached",lo=300,Gn=301,ci=302,rr=303,or=304,ps=306,hi=1e3,qt=1001,ms=1002,gt=1003,co=1004,nm=1004,Ri=1005,im=1005,ct=1006,gs=1007,sm=1007,pn=1008,rm=1008,mn=1009,Cl=1010,Rl=1011,vs=1012,ho=1013,Un=1014,jt=1015,Vn=1016,uo=1017,fo=1018,Pi=1020,Pl=35902,Il=1021,Ll=1022,At=1023,Dl=1024,Ul=1025,Ii=1026,Li=1027,po=1028,ar=1029,Nl=1030,mo=1031,om=1032,go=1033,lr=33776,cr=33777,hr=33778,ur=33779,vo=35840,yo=35841,xo=35842,_o=35843,Mo=36196,So=37492,wo=37496,bo=37808,To=37809,Ao=37810,Eo=37811,Co=37812,Ro=37813,Po=37814,Io=37815,Lo=37816,Do=37817,Uo=37818,No=37819,Fo=37820,Oo=37821,dr=36492,Bo=36494,zo=36495,Fl=36283,ko=36284,Ho=36285,Go=36286,Eu=2200,Cu=2201,Ru=2202,ys=2300,xs=2301,Vo=2302,Di=2400,Ui=2401,fr=2402,Wo=2500,Ol=2501,Pu=0,Bl=1,Xo=2,Iu=3200,Lu=3201,am=3202,lm=3203,ui=0,Du=1,Wn="",_t="srgb",Ut="srgb-linear",pr="linear",dt="srgb",cm=0,Ni=7680,hm=7681,um=7682,dm=7683,fm=34055,pm=34056,mm=5386,gm=512,vm=513,ym=514,xm=515,_m=516,Mm=517,Sm=518,zl=519,Uu=512,Nu=513,Fu=514,kl=515,Ou=516,Bu=517,zu=518,ku=519,mr=35044,wm=35048,bm=35040,Tm=35045,Am=35049,Em=35041,Cm=35046,Rm=35050,Pm=35042,Im="100",Hl="300 es",Nn=2e3,gr=2001;class Fn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hu=1234567;const Fi=Math.PI/180,_s=180/Math.PI;function rn(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[o&255]+Ot[o>>8&255]+Ot[o>>16&255]+Ot[o>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function St(o,e,t){return Math.max(e,Math.min(t,o))}function Gl(o,e){return(o%e+e)%e}function Lm(o,e,t,n,i){return n+(o-e)*(i-n)/(t-e)}function Dm(o,e,t){return o!==e?(t-o)/(e-o):0}function vr(o,e,t){return(1-t)*o+t*e}function Um(o,e,t,n){return vr(o,e,1-Math.exp(-t*n))}function Nm(o,e=1){return e-Math.abs(Gl(o,e*2)-e)}function Fm(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*(3-2*o))}function Om(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*o*(o*(o*6-15)+10))}function Bm(o,e){return o+Math.floor(Math.random()*(e-o+1))}function zm(o,e){return o+Math.random()*(e-o)}function km(o){return o*(.5-Math.random())}function Hm(o){o!==void 0&&(Hu=o);let e=Hu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gm(o){return o*Fi}function Vm(o){return o*_s}function Wm(o){return(o&o-1)===0&&o!==0}function Xm(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function Ym(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function qm(o,e,t,n,i){const s=Math.cos,r=Math.sin,a=s(t/2),l=r(t/2),c=s((e+n)/2),h=r((e+n)/2),u=s((e-n)/2),d=r((e-n)/2),f=s((n-e)/2),m=r((n-e)/2);switch(i){case"XYX":o.set(a*h,l*u,l*d,a*c);break;case"YZY":o.set(l*d,a*h,l*u,a*c);break;case"ZXZ":o.set(l*u,l*d,a*h,a*c);break;case"XZX":o.set(a*h,l*m,l*f,a*c);break;case"YXY":o.set(l*f,a*h,l*m,a*c);break;case"ZYZ":o.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Zt(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Ye(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Gu={DEG2RAD:Fi,RAD2DEG:_s,generateUUID:rn,clamp:St,euclideanModulo:Gl,mapLinear:Lm,inverseLerp:Dm,lerp:vr,damp:Um,pingpong:Nm,smoothstep:Fm,smootherstep:Om,randInt:Bm,randFloat:zm,randFloatSpread:km,seededRandom:Hm,degToRad:Gm,radToDeg:Vm,isPowerOfTwo:Wm,ceilPowerOfTwo:Xm,floorPowerOfTwo:Ym,setQuaternionFromProperEuler:qm,normalize:Ye,denormalize:Zt};class Z{constructor(e=0,t=0){Z.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,n,i,s,r,a,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,l,c)}set(e,t,n,i,s,r,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],v=i[0],g=i[3],p=i[6],x=i[1],_=i[4],y=i[7],C=i[2],b=i[5],A=i[8];return s[0]=r*v+a*x+l*C,s[3]=r*g+a*_+l*b,s[6]=r*p+a*y+l*A,s[1]=c*v+h*x+u*C,s[4]=c*g+h*_+u*b,s[7]=c*p+h*y+u*A,s[2]=d*v+f*x+m*C,s[5]=d*g+f*_+m*b,s[8]=d*p+f*y+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*a*c-n*s*h+n*a*l+i*s*c-i*r*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*r-a*c,d=a*l-h*s,f=c*s-r*l,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=u*v,e[1]=(i*c-h*n)*v,e[2]=(a*n-i*r)*v,e[3]=d*v,e[4]=(h*t-i*l)*v,e[5]=(i*s-a*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(r*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*r+c*a)+r+e,-i*c,i*l,-i*(-c*r+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Vl.makeScale(e,t)),this}rotate(e){return this.premultiply(Vl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vl=new Xe;function Vu(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}const Zm={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Ms(o,e){return new Zm[o](e)}function yr(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Wu(){const o=yr("canvas");return o.style.display="block",o}const Xu={};function xr(o){o in Xu||(Xu[o]=!0,console.warn(o))}function Km(o,e,t){return new Promise(function(n,i){function s(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:i();break;case o.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function $m(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Jm(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Qe={enabled:!0,workingColorSpace:Ut,spaces:{},convert:function(o,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===dt&&(o.r=Xn(o.r),o.g=Xn(o.g),o.b=Xn(o.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(o.applyMatrix3(this.spaces[e].toXYZ),o.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===dt&&(o.r=Ss(o.r),o.g=Ss(o.g),o.b=Ss(o.b))),o},fromWorkingColorSpace:function(o,e){return this.convert(o,this.workingColorSpace,e)},toWorkingColorSpace:function(o,e){return this.convert(o,e,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Wn?pr:this.spaces[o].transfer},getLuminanceCoefficients:function(o,e=this.workingColorSpace){return o.fromArray(this.spaces[e].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,e,t){return o.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace}};function Xn(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Ss(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}const Yu=[.64,.33,.3,.6,.15,.06],qu=[.2126,.7152,.0722],Zu=[.3127,.329],Ku=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$u=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qe.define({[Ut]:{primaries:Yu,whitePoint:Zu,transfer:pr,toXYZ:Ku,fromXYZ:$u,luminanceCoefficients:qu,workingColorSpaceConfig:{unpackColorSpace:_t},outputColorSpaceConfig:{drawingBufferColorSpace:_t}},[_t]:{primaries:Yu,whitePoint:Zu,transfer:dt,toXYZ:Ku,fromXYZ:$u,luminanceCoefficients:qu,outputColorSpaceConfig:{drawingBufferColorSpace:_t}}});let ws;class Ju{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ws===void 0&&(ws=yr("canvas")),ws.width=e.width,ws.height=e.height;const n=ws.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ws}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=yr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Xn(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xn(t[n]/255)*255):t[n]=Xn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jm=0;class Oi{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=rn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(Wl(i[r].image)):s.push(Wl(i[r]))}else s=Wl(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Wl(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Ju.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qm=0;class vt extends Fn{constructor(e=vt.DEFAULT_IMAGE,t=vt.DEFAULT_MAPPING,n=qt,i=qt,s=ct,r=pn,a=At,l=mn,c=vt.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=rn(),this.name="",this.source=new Oi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Z(0,0),this.repeat=new Z(1,1),this.center=new Z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hi:e.x=e.x-Math.floor(e.x);break;case qt:e.x=e.x<0?0:1;break;case ms:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hi:e.y=e.y-Math.floor(e.y);break;case qt:e.y=e.y<0?0:1;break;case ms:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vt.DEFAULT_IMAGE=null,vt.DEFAULT_MAPPING=lo,vt.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,n=0,i=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,y=(f+1)/2,C=(p+1)/2,b=(h+d)/4,A=(u+v)/4,R=(m+g)/4;return _>y&&_>C?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=A/n):y>C?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=b/i,s=R/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=A/s,i=R/s),this.set(n,i,s,t),this}let x=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(u-v)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ju extends Fn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new vt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Oi(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qt extends ju{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yo extends vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=gt,this.minFilter=gt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class eg extends Qt{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Yo(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Xl extends vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=gt,this.minFilter=gt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tg extends Qt{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Xl(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Bt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[r+0],f=s[r+1],m=s[r+2],v=s[r+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==m){let g=1-a;const p=l*d+c*f+h*m+u*v,x=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const C=Math.sqrt(_),b=Math.atan2(C,p*x);g=Math.sin(g*b)/C,a=Math.sin(a*b)/C}const y=a*x;if(l=l*g+d*y,c=c*g+f*y,h=h*g+m*y,u=u*g+v*y,g===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,r){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[r],d=s[r+1],f=s[r+2],m=s[r+3];return e[t]=a*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-a*f,e[t+2]=c*m+h*f+a*d-l*u,e[t+3]=h*m-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,r=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(r){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(r-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(r-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,r=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+r*a+i*c-s*l,this._y=i*h+r*l+s*a-n*c,this._z=s*h+r*c+n*l-i*a,this._w=r*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,r=this._w;let a=r*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,n=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,a=e.z,l=e.w,c=2*(r*i-a*n),h=2*(a*t-s*i),u=2*(s*n-r*t);return this.x=t+l*c+r*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,r=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*r-n*l,this.z=n*a-i*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yl.copy(this).projectOnVector(e),this.sub(Yl)}reflect(e){return this.sub(Yl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yl=new E,Qu=new Bt;class zt{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)e.isMesh===!0?e.getVertexPosition(r,Sn):Sn.fromBufferAttribute(s,r),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qo.copy(n.boundingBox)),qo.applyMatrix4(e.matrixWorld),this.union(qo)}const i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_r),Zo.subVectors(this.max,_r),bs.subVectors(e.a,_r),Ts.subVectors(e.b,_r),As.subVectors(e.c,_r),di.subVectors(Ts,bs),fi.subVectors(As,Ts),Bi.subVectors(bs,As);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Bi.z,Bi.y,di.z,0,-di.x,fi.z,0,-fi.x,Bi.z,0,-Bi.x,-di.y,di.x,0,-fi.y,fi.x,0,-Bi.y,Bi.x,0];return!ql(t,bs,Ts,As,Zo)||(t=[1,0,0,0,1,0,0,0,1],!ql(t,bs,Ts,As,Zo))?!1:(Ko.crossVectors(di,fi),t=[Ko.x,Ko.y,Ko.z],ql(t,bs,Ts,As,Zo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Yn=[new E,new E,new E,new E,new E,new E,new E,new E],Sn=new E,qo=new zt,bs=new E,Ts=new E,As=new E,di=new E,fi=new E,Bi=new E,_r=new E,Zo=new E,Ko=new E,zi=new E;function ql(o,e,t,n,i){for(let s=0,r=o.length-3;s<=r;s+=3){zi.fromArray(o,s);const a=i.x*Math.abs(zi.x)+i.y*Math.abs(zi.y)+i.z*Math.abs(zi.z),l=e.dot(zi),c=t.dot(zi),h=n.dot(zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const ng=new zt,Mr=new E,Zl=new E;class Nt{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ng.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mr.subVectors(e,this.center);const t=Mr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Mr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mr.copy(e.center).add(Zl)),this.expandByPoint(Mr.copy(e.center).sub(Zl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qn=new E,Kl=new E,$o=new E,pi=new E,$l=new E,Jo=new E,Jl=new E;class Es{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Kl.copy(e).add(t).multiplyScalar(.5),$o.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(Kl);const s=e.distanceTo(t)*.5,r=-this.direction.dot($o),a=pi.dot(this.direction),l=-pi.dot($o),c=pi.lengthSq(),h=Math.abs(1-r*r);let u,d,f,m;if(h>0)if(u=r*l-a,d=r*a-l,m=s*h,u>=0)if(d>=-m)if(d<=m){const v=1/h;u*=v,d*=v,f=u*(u+r*d+2*a)+d*(r*u+d+2*l)+c}else d=s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-r*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(r*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=r>0?-s:s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Kl).addScaledVector($o,d),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),i=qn.dot(qn)-n*n,s=e.radius*e.radius;if(i>s)return null;const r=Math.sqrt(s-i),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,r=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,r=(e.min.y-d.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,i,s){$l.subVectors(t,e),Jo.subVectors(n,e),Jl.crossVectors($l,Jo);let r=this.direction.dot(Jl),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;pi.subVectors(this.origin,e);const l=a*this.direction.dot(Jo.crossVectors(pi,Jo));if(l<0)return null;const c=a*this.direction.dot($l.cross(pi));if(c<0||l+c>r)return null;const h=-a*pi.dot(Jl);return h<0?null:this.at(h/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ne{constructor(e,t,n,i,s,r,a,l,c,h,u,d,f,m,v,g){Ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,l,c,h,u,d,f,m,v,g)}set(e,t,n,i,s,r,a,l,c,h,u,d,f,m,v,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=r,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ne().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Cs.setFromMatrixColumn(e,0).length(),s=1/Cs.setFromMatrixColumn(e,1).length(),r=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=r*h,f=r*u,m=a*h,v=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=m+f*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,m=c*h,v=c*u;t[0]=d+v*a,t[4]=m*a-f,t[8]=r*c,t[1]=r*u,t[5]=r*h,t[9]=-a,t[2]=f*a-m,t[6]=v+d*a,t[10]=r*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,m=c*h,v=c*u;t[0]=d-v*a,t[4]=-r*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=r*h,t[9]=v-d*a,t[2]=-r*c,t[6]=a,t[10]=r*l}else if(e.order==="ZYX"){const d=r*h,f=r*u,m=a*h,v=a*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,f=r*c,m=a*l,v=a*c;t[0]=l*h,t[4]=v-d*u,t[8]=m*u+f,t[1]=u,t[5]=r*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-v*u}else if(e.order==="XZY"){const d=r*l,f=r*c,m=a*l,v=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=r*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ig,e,sg)}lookAt(e,t,n){const i=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),mi.crossVectors(n,on),mi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),mi.crossVectors(n,on)),mi.normalize(),jo.crossVectors(on,mi),i[0]=mi.x,i[4]=jo.x,i[8]=on.x,i[1]=mi.y,i[5]=jo.y,i[9]=on.y,i[2]=mi.z,i[6]=jo.z,i[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],x=n[3],_=n[7],y=n[11],C=n[15],b=i[0],A=i[4],R=i[8],S=i[12],M=i[1],L=i[5],B=i[9],O=i[13],k=i[2],K=i[6],H=i[10],te=i[14],X=i[3],ue=i[7],fe=i[11],pe=i[15];return s[0]=r*b+a*M+l*k+c*X,s[4]=r*A+a*L+l*K+c*ue,s[8]=r*R+a*B+l*H+c*fe,s[12]=r*S+a*O+l*te+c*pe,s[1]=h*b+u*M+d*k+f*X,s[5]=h*A+u*L+d*K+f*ue,s[9]=h*R+u*B+d*H+f*fe,s[13]=h*S+u*O+d*te+f*pe,s[2]=m*b+v*M+g*k+p*X,s[6]=m*A+v*L+g*K+p*ue,s[10]=m*R+v*B+g*H+p*fe,s[14]=m*S+v*O+g*te+p*pe,s[3]=x*b+_*M+y*k+C*X,s[7]=x*A+_*L+y*K+C*ue,s[11]=x*R+_*B+y*H+C*fe,s[15]=x*S+_*O+y*te+C*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15];return m*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+v*(+t*l*f-t*c*d+s*r*d-i*r*f+i*c*h-s*l*h)+g*(+t*c*u-t*a*f-s*r*u+n*r*f+s*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*r*u-n*r*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],x=u*g*c-v*d*c+v*l*f-a*g*f-u*l*p+a*d*p,_=m*d*c-h*g*c-m*l*f+r*g*f+h*l*p-r*d*p,y=h*v*c-m*u*c+m*a*f-r*v*f-h*a*p+r*u*p,C=m*u*l-h*v*l-m*a*d+r*v*d+h*a*g-r*u*g,b=t*x+n*_+i*y+s*C;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return e[0]=x*A,e[1]=(v*d*s-u*g*s-v*i*f+n*g*f+u*i*p-n*d*p)*A,e[2]=(a*g*s-v*l*s+v*i*c-n*g*c-a*i*p+n*l*p)*A,e[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*A,e[4]=_*A,e[5]=(h*g*s-m*d*s+m*i*f-t*g*f-h*i*p+t*d*p)*A,e[6]=(m*l*s-r*g*s-m*i*c+t*g*c+r*i*p-t*l*p)*A,e[7]=(r*d*s-h*l*s+h*i*c-t*d*c-r*i*f+t*l*f)*A,e[8]=y*A,e[9]=(m*u*s-h*v*s-m*n*f+t*v*f+h*n*p-t*u*p)*A,e[10]=(r*v*s-m*a*s+m*n*c-t*v*c-r*n*p+t*a*p)*A,e[11]=(h*a*s-r*u*s-h*n*c+t*u*c+r*n*f-t*a*f)*A,e[12]=C*A,e[13]=(h*v*i-m*u*i+m*n*d-t*v*d-h*n*g+t*u*g)*A,e[14]=(m*a*i-r*v*i-m*n*l+t*v*l+r*n*g-t*a*g)*A,e[15]=(r*u*i-h*a*i+h*n*l-t*u*l-r*n*d+t*a*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,a=e.y,l=e.z,c=s*r,h=s*a;return this.set(c*r+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*r,0,c*l-i*a,h*l+i*r,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,r=t._y,a=t._z,l=t._w,c=s+s,h=r+r,u=a+a,d=s*c,f=s*h,m=s*u,v=r*h,g=r*u,p=a*u,x=l*c,_=l*h,y=l*u,C=n.x,b=n.y,A=n.z;return i[0]=(1-(v+p))*C,i[1]=(f+y)*C,i[2]=(m-_)*C,i[3]=0,i[4]=(f-y)*b,i[5]=(1-(d+p))*b,i[6]=(g+x)*b,i[7]=0,i[8]=(m+_)*A,i[9]=(g-x)*A,i[10]=(1-(d+v))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Cs.set(i[0],i[1],i[2]).length();const r=Cs.set(i[4],i[5],i[6]).length(),a=Cs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],wn.copy(this);const c=1/s,h=1/r,u=1/a;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=u,wn.elements[9]*=u,wn.elements[10]*=u,t.setFromRotationMatrix(wn),n.x=s,n.y=r,n.z=a,this}makePerspective(e,t,n,i,s,r,a=Nn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,m;if(a===Nn)f=-(r+s)/(r-s),m=-2*r*s/(r-s);else if(a===gr)f=-r/(r-s),m=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,r,a=Nn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(r-s),d=(t+e)*c,f=(n+i)*h;let m,v;if(a===Nn)m=(r+s)*u,v=-2*u;else if(a===gr)m=s*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Cs=new E,wn=new Ne,ig=new E(0,0,0),sg=new E(1,1,1),mi=new E,jo=new E,on=new E,ed=new Ne,td=new Bt;class an{constructor(e=0,t=0,n=0,i=an.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],r=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(St(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-St(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(St(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-St(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ed.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ed,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return td.setFromEuler(this),this.setFromQuaternion(td,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class Qo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rg=0;const nd=new E,Rs=new Bt,Zn=new Ne,ea=new E,Sr=new E,og=new E,ag=new Bt,id=new E(1,0,0),sd=new E(0,1,0),rd=new E(0,0,1),od={type:"added"},lg={type:"removed"},Ps={type:"childadded",child:null},jl={type:"childremoved",child:null};class it extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rg++}),this.uuid=rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=it.DEFAULT_UP.clone();const e=new E,t=new an,n=new Bt,i=new E(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Xe}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=it.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(id,e)}rotateY(e){return this.rotateOnAxis(sd,e)}rotateZ(e){return this.rotateOnAxis(rd,e)}translateOnAxis(e,t){return nd.copy(e).applyQuaternion(this.quaternion),this.position.add(nd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(id,e)}translateY(e){return this.translateOnAxis(sd,e)}translateZ(e){return this.translateOnAxis(rd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ea.copy(e):ea.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(Sr,ea,this.up):Zn.lookAt(ea,Sr,this.up),this.quaternion.setFromRotationMatrix(Zn),i&&(Zn.extractRotation(i.matrixWorld),Rs.setFromRotationMatrix(Zn),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(od),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lg),jl.child=e,this.dispatchEvent(jl),jl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(od),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,e,og),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,ag,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),u=r(e.shapes),d=r(e.skeletons),f=r(e.animations),m=r(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}it.DEFAULT_UP=new E(0,1,0),it.DEFAULT_MATRIX_AUTO_UPDATE=!0,it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bn=new E,Kn=new E,Ql=new E,$n=new E,Is=new E,Ls=new E,ad=new E,ec=new E,tc=new E,nc=new E,ic=new et,sc=new et,rc=new et;class en{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),bn.subVectors(e,t),i.cross(bn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){bn.subVectors(i,t),Kn.subVectors(n,t),Ql.subVectors(e,t);const r=bn.dot(bn),a=bn.dot(Kn),l=bn.dot(Ql),c=Kn.dot(Kn),h=Kn.dot(Ql),u=r*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,m=(r*h-a*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,i,s,r,a,l){return this.getBarycoord(e,t,n,i,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,$n.x),l.addScaledVector(r,$n.y),l.addScaledVector(a,$n.z),l)}static getInterpolatedAttribute(e,t,n,i,s,r){return ic.setScalar(0),sc.setScalar(0),rc.setScalar(0),ic.fromBufferAttribute(e,t),sc.fromBufferAttribute(e,n),rc.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(ic,s.x),r.addScaledVector(sc,s.y),r.addScaledVector(rc,s.z),r}static isFrontFacing(e,t,n,i){return bn.subVectors(n,t),Kn.subVectors(e,t),bn.cross(Kn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),bn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(.3333333333333333)}getNormal(e){return en.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return en.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return en.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return en.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return en.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let r,a;Is.subVectors(i,n),Ls.subVectors(s,n),ec.subVectors(e,n);const l=Is.dot(ec),c=Ls.dot(ec);if(l<=0&&c<=0)return t.copy(n);tc.subVectors(e,i);const h=Is.dot(tc),u=Ls.dot(tc);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(Is,r);nc.subVectors(e,s);const f=Is.dot(nc),m=Ls.dot(nc);if(m>=0&&f<=m)return t.copy(s);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(Ls,a);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return ad.subVectors(s,i),a=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(ad,a);const p=1/(g+v+d);return r=v*p,a=d*p,t.copy(n).addScaledVector(Is,r).addScaledVector(Ls,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},ta={h:0,s:0,l:0};function oc(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<.16666666666666666?o+(e-o)*6*t:t<.5?e:t<.6666666666666666?o+(e-o)*6*(.6666666666666666-t):o}class G{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Qe.workingColorSpace){if(e=Gl(e,1),t=St(t,0,1),n=St(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=oc(r,s,e+.3333333333333333),this.g=oc(r,s,e),this.b=oc(r,s,e-.3333333333333333)}return Qe.toWorkingColorSpace(this,i),this}setStyle(e,t=_t){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){const n=ld[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return Qe.fromWorkingColorSpace(kt.copy(this),e),Math.round(St(kt.r*255,0,255))*65536+Math.round(St(kt.g*255,0,255))*256+Math.round(St(kt.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(kt.copy(this),t);const n=kt.r,i=kt.g,s=kt.b,r=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+r)/2;if(a===r)l=0,c=0;else{const u=r-a;switch(c=h<=.5?u/(r+a):u/(2-r-a),r){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=_t){Qe.fromWorkingColorSpace(kt.copy(this),e);const t=kt.r,n=kt.g,i=kt.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(ta);const n=vr(gi.h,ta.h,t),i=vr(gi.s,ta.s,t),s=vr(gi.l,ta.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new G;G.NAMES=ld;let cg=0;class Rt extends Fn{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=rn(),this.name="",this.blending=ai,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qr,this.blendDst=eo,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new G(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ai&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qr&&(n.blendSrc=this.blendSrc),this.blendDst!==eo&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const a in s){const l=s[a];delete l.metadata,r.push(l)}return r}if(t){const s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ht extends Rt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=sr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jn=hg();function hg(){const o=new ArrayBuffer(4),e=new Float32Array(o),t=new Uint32Array(o),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),r=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)r[l]=l<<23;r[31]=1199570944,r[32]=2147483648;for(let l=33;l<63;++l)r[l]=2147483648+(l-32<<23);r[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:r,offsetTable:a}}function tn(o){Math.abs(o)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),o=St(o,-65504,65504),Jn.floatView[0]=o;const e=Jn.uint32View[0],t=e>>23&511;return Jn.baseTable[t]+((e&8388607)>>Jn.shiftTable[t])}function wr(o){const e=o>>10;return Jn.uint32View[0]=Jn.mantissaTable[Jn.offsetTable[e]+(o&1023)]+Jn.exponentTable[e],Jn.floatView[0]}const ug={toHalfFloat:tn,fromHalfFloat:wr},Et=new E,na=new Z;class $e{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=mr,this.updateRanges=[],this.gpuType=jt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)na.fromBufferAttribute(this,t),na.applyMatrix3(e),this.setXY(t,na.x,na.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Zt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ye(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array),s=Ye(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==mr&&(e.usage=this.usage),e}}class dg extends $e{constructor(e,t,n){super(new Int8Array(e),t,n)}}class fg extends $e{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class pg extends $e{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class mg extends $e{constructor(e,t,n){super(new Int16Array(e),t,n)}}class ac extends $e{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class gg extends $e{constructor(e,t,n){super(new Int32Array(e),t,n)}}class lc extends $e{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vg extends $e{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=wr(this.array[e*this.itemSize]);return this.normalized&&(t=Zt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize]=tn(t),this}getY(e){let t=wr(this.array[e*this.itemSize+1]);return this.normalized&&(t=Zt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+1]=tn(t),this}getZ(e){let t=wr(this.array[e*this.itemSize+2]);return this.normalized&&(t=Zt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+2]=tn(t),this}getW(e){let t=wr(this.array[e*this.itemSize+3]);return this.normalized&&(t=Zt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+3]=tn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this.array[e+2]=tn(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array),s=Ye(s,this.array)),this.array[e+0]=tn(t),this.array[e+1]=tn(n),this.array[e+2]=tn(i),this.array[e+3]=tn(s),this}}class Ae extends $e{constructor(e,t,n){super(new Float32Array(e),t,n)}}let yg=0;const gn=new Ne,cc=new it,Ds=new E,ln=new zt,br=new zt,Lt=new E;class Ge extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=rn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vu(e)?lc:ac)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Xe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return cc.lookAt(e),cc.updateMatrix(),this.applyMatrix4(cc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ds).negate(),this.translate(Ds.x,Ds.y,Ds.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ae(n,3))}else{for(let n=0,i=t.count;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];ln.setFromBufferAttribute(s),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const a=t[s];br.setFromBufferAttribute(a),this.morphTargetsRelative?(Lt.addVectors(ln.min,br.min),ln.expandByPoint(Lt),Lt.addVectors(ln.max,br.max),ln.expandByPoint(Lt)):(ln.expandByPoint(br.min),ln.expandByPoint(br.max))}ln.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Lt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Lt));if(t)for(let s=0,r=t.length;s<r;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Lt.fromBufferAttribute(a,c),l&&(Ds.fromBufferAttribute(e,c),Lt.add(Ds)),i=Math.max(i,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new E,l[R]=new E;const c=new E,h=new E,u=new E,d=new Z,f=new Z,m=new Z,v=new E,g=new E;function p(R,S,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,S),m.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(L),a[R].add(v),a[S].add(v),a[M].add(v),l[R].add(g),l[S].add(g),l[M].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let R=0,S=x.length;R<S;++R){const M=x[R],L=M.start,B=M.count;for(let O=L,k=L+B;O<k;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const _=new E,y=new E,C=new E,b=new E;function A(R){C.fromBufferAttribute(i,R),b.copy(C);const S=a[R];_.copy(S),_.sub(C.multiplyScalar(C.dot(S))).normalize(),y.crossVectors(b,S);const L=y.dot(l[R])<0?-1:1;r.setXYZW(R,_.x,_.y,_.z,L)}for(let R=0,S=x.length;R<S;++R){const M=x[R],L=M.start,B=M.count;for(let O=L,k=L+B;O<k;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new E,s=new E,r=new E,a=new E,l=new E,c=new E,h=new E,u=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new $e(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ge,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cd=new Ne,ki=new Es,ia=new Nt,hd=new E,sa=new E,ra=new E,oa=new E,hc=new E,aa=new E,ud=new E,la=new E;class Y extends it{constructor(e=new Ge,t=new Ht){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){aa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(hc.fromBufferAttribute(u,e),r?aa.addScaledVector(hc,h):aa.addScaledVector(hc.sub(t),h))}t.add(aa)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(s),ki.copy(e.ray).recast(e.near),!(ia.containsPoint(ki.origin)===!1&&(ki.intersectSphere(ia,hd)===null||ki.origin.distanceToSquared(hd)>(e.far-e.near)**2))&&(cd.copy(s).invert(),ki.copy(e.ray).applyMatrix4(cd),!(n.boundingBox!==null&&ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ki)))}_computeIntersections(e,t,n){let i;const s=this.geometry,r=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(r))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=r[g.materialIndex],x=Math.max(g.start,f.start),_=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,C=_;y<C;y+=3){const b=a.getX(y),A=a.getX(y+1),R=a.getX(y+2);i=ca(this,p,e,n,c,h,u,b,A,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const x=a.getX(g),_=a.getX(g+1),y=a.getX(g+2);i=ca(this,r,e,n,c,h,u,x,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=r[g.materialIndex],x=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,C=_;y<C;y+=3){const b=y,A=y+1,R=y+2;i=ca(this,p,e,n,c,h,u,b,A,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const x=g,_=g+1,y=g+2;i=ca(this,r,e,n,c,h,u,x,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function xg(o,e,t,n,i,s,r,a){let l;if(e.side===Ft?l=n.intersectTriangle(r,s,i,!0,a):l=n.intersectTriangle(i,s,r,e.side===Dn,a),l===null)return null;la.copy(a),la.applyMatrix4(o.matrixWorld);const c=t.ray.origin.distanceTo(la);return c<t.near||c>t.far?null:{distance:c,point:la.clone(),object:o}}function ca(o,e,t,n,i,s,r,a,l,c){o.getVertexPosition(a,sa),o.getVertexPosition(l,ra),o.getVertexPosition(c,oa);const h=xg(o,e,t,n,sa,ra,oa,ud);if(h){const u=new E;en.getBarycoord(ud,sa,ra,oa,u),i&&(h.uv=en.getInterpolatedAttribute(i,a,l,c,u,new Z)),s&&(h.uv1=en.getInterpolatedAttribute(s,a,l,c,u,new Z)),r&&(h.normal=en.getInterpolatedAttribute(r,a,l,c,u,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new E,materialIndex:0};en.getNormal(sa,ra,oa,d.normal),h.face=d,h.barycoord=u}return h}class he extends Ge{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,r,s,0),m("z","y","x",1,-1,n,t,-e,r,s,1),m("x","z","y",1,1,e,n,t,i,r,2),m("x","z","y",1,-1,e,n,-t,i,r,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ae(c,3)),this.setAttribute("normal",new Ae(h,3)),this.setAttribute("uv",new Ae(u,2));function m(v,g,p,x,_,y,C,b,A,R,S){const M=y/A,L=C/R,B=y/2,O=C/2,k=b/2,K=A+1,H=R+1;let te=0,X=0;const ue=new E;for(let fe=0;fe<H;fe++){const pe=fe*L-O;for(let ke=0;ke<K;ke++){const st=ke*M-B;ue[v]=st*x,ue[g]=pe*_,ue[p]=k,c.push(ue.x,ue.y,ue.z),ue[v]=0,ue[g]=0,ue[p]=b>0?1:-1,h.push(ue.x,ue.y,ue.z),u.push(ke/A),u.push(1-fe/R),te+=1}}for(let fe=0;fe<R;fe++)for(let pe=0;pe<A;pe++){const ke=d+pe+K*fe,st=d+pe+K*(fe+1),$=d+(pe+1)+K*(fe+1),ie=d+(pe+1)+K*fe;l.push(ke,st,ie),l.push(st,$,ie),X+=6}a.addGroup(f,X,S),f+=X,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new he(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Us(o){const e={};for(const t in o){e[t]={};for(const n in o[t]){const i=o[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Kt(o){const e={};for(let t=0;t<o.length;t++){const n=Us(o[t]);for(const i in n)e[i]=n[i]}return e}function _g(o){const e=[];for(let t=0;t<o.length;t++)e.push(o[t].clone());return e}function dd(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const fd={clone:Us,merge:Kt};var Mg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dt extends Rt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mg,this.fragmentShader=Sg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Us(e.uniforms),this.uniformsGroups=_g(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ha extends it{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=Nn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new E,pd=new Z,md=new Z;class Ct extends ha{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_s*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Fi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _s*2*Math.atan(Math.tan(Fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,pd,md),t.subVectors(md,pd)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Fi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/l,t-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ns=-90,Fs=1;class gd extends it{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ct(Ns,Fs,e,t);i.layers=this.layers,this.add(i);const s=new Ct(Ns,Fs,e,t);s.layers=this.layers,this.add(s);const r=new Ct(Ns,Fs,e,t);r.layers=this.layers,this.add(r);const a=new Ct(Ns,Fs,e,t);a.layers=this.layers,this.add(a);const l=new Ct(Ns,Fs,e,t);l.layers=this.layers,this.add(l);const c=new Ct(Ns,Fs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,a,l]=t;for(const c of t)this.remove(c);if(e===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Tr extends vt{constructor(e,t,n,i,s,r,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Gn,super(e,t,n,i,s,r,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vd extends Qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Tr(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ct}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new he(5,5,5),s=new Dt({name:"CubemapFromEquirect",uniforms:Us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:kn});s.uniforms.tEquirect.value=t;const r=new Y(i,s),a=t.minFilter;return t.minFilter===pn&&(t.minFilter=ct),new gd(1,10,this).update(e,r),t.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}}const uc=new E,wg=new E,bg=new Xe;class jn{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=uc.subVectors(n,t).cross(wg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(uc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bg.getNormalMatrix(e),i=this.coplanarPoint(uc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new Nt,ua=new E;class Ar{constructor(e=new jn,t=new jn,n=new jn,i=new jn,s=new jn,r=new jn){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nn){const n=this.planes,i=e.elements,s=i[0],r=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],v=i[10],g=i[11],p=i[12],x=i[13],_=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,g-f,y-p).normalize(),n[1].setComponents(l+s,d+c,g+f,y+p).normalize(),n[2].setComponents(l+r,d+h,g+m,y+x).normalize(),n[3].setComponents(l-r,d-h,g-m,y-x).normalize(),n[4].setComponents(l-a,d-u,g-v,y-_).normalize(),t===Nn)n[5].setComponents(l+a,d+u,g+v,y+_).normalize();else if(t===gr)n[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ua.x=i.normal.x>0?e.max.x:e.min.x,ua.y=i.normal.y>0?e.max.y:e.min.y,ua.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ua)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function yd(){let o=null,e=!1,t=null,n=null;function i(s,r){t(s,r),n=o.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=o.requestAnimationFrame(i),e=!0)},stop:function(){o.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){o=s}}}function Tg(o){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=o.createBuffer();o.bindBuffer(l,d),o.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=o.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=o.HALF_FLOAT:f=o.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=o.SHORT;else if(c instanceof Uint32Array)f=o.UNSIGNED_INT;else if(c instanceof Int32Array)f=o.INT;else if(c instanceof Int8Array)f=o.BYTE;else if(c instanceof Uint8Array)f=o.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(o.bindBuffer(c,a),u.length===0)o.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],v=u[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const v=u[f];o.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(o.deleteBuffer(l.buffer),e.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:r}}class Tn extends Ge{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,r=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const x=p*d-r;for(let _=0;_<c;_++){const y=_*u-s;m.push(y,-x,0),v.push(0,0,1),g.push(_/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const _=x+c*p,y=x+c*(p+1),C=x+1+c*(p+1),b=x+1+c*p;f.push(_,y,b),f.push(y,C,b)}this.setIndex(f),this.setAttribute("position",new Ae(m,3)),this.setAttribute("normal",new Ae(v,3)),this.setAttribute("uv",new Ae(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ag=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Eg=`#ifdef USE_ALPHAHASH
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
#endif`,Cg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ig=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lg=`#ifdef USE_AOMAP
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
#endif`,Dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ug=`#ifdef USE_BATCHING
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
#endif`,Ng=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Og=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zg=`#ifdef USE_IRIDESCENCE
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
#endif`,kg=`#ifdef USE_BUMPMAP
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
#endif`,Hg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Gg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Kg=`#define PI 3.141592653589793
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
} // validated`,$g=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Jg=`vec3 transformedNormal = objectNormal;
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
#endif`,jg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,n0="gl_FragColor = linearToOutputTexel( gl_FragColor );",i0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,s0=`#ifdef USE_ENVMAP
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
#endif`,r0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,o0=`#ifdef USE_ENVMAP
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
#endif`,a0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,l0=`#ifdef USE_ENVMAP
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
#endif`,c0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,h0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,u0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,d0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,f0=`#ifdef USE_GRADIENTMAP
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
}`,p0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,m0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,g0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,v0=`uniform bool receiveShadow;
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
#endif`,y0=`#ifdef USE_ENVMAP
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
#endif`,x0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,M0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,S0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,w0=`PhysicalMaterial material;
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
#endif`,b0=`struct PhysicalMaterial {
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
}`,T0=`
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
#endif`,A0=`#if defined( RE_IndirectDiffuse )
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
#endif`,E0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,C0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,R0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,I0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,L0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,D0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,U0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,N0=`#if defined( USE_POINTS_UV )
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
#endif`,F0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,O0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,B0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,z0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,k0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H0=`#ifdef USE_MORPHTARGETS
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
#endif`,G0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,V0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,W0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,X0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Z0=`#ifdef USE_NORMALMAP
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
#endif`,K0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,J0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Q0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ev=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ov=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,av=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hv=`float getShadowMask() {
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
}`,uv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dv=`#ifdef USE_SKINNING
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
#endif`,fv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pv=`#ifdef USE_SKINNING
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
#endif`,mv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,xv=`#ifdef USE_TRANSMISSION
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
#endif`,_v=`#ifdef USE_TRANSMISSION
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
#endif`,Mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qe={alphahash_fragment:Ag,alphahash_pars_fragment:Eg,alphamap_fragment:Cg,alphamap_pars_fragment:Rg,alphatest_fragment:Pg,alphatest_pars_fragment:Ig,aomap_fragment:Lg,aomap_pars_fragment:Dg,batching_pars_vertex:Ug,batching_vertex:Ng,begin_vertex:Fg,beginnormal_vertex:Og,bsdfs:Bg,iridescence_fragment:zg,bumpmap_pars_fragment:kg,clipping_planes_fragment:Hg,clipping_planes_pars_fragment:Gg,clipping_planes_pars_vertex:Vg,clipping_planes_vertex:Wg,color_fragment:Xg,color_pars_fragment:Yg,color_pars_vertex:qg,color_vertex:Zg,common:Kg,cube_uv_reflection_fragment:$g,defaultnormal_vertex:Jg,displacementmap_pars_vertex:jg,displacementmap_vertex:Qg,emissivemap_fragment:e0,emissivemap_pars_fragment:t0,colorspace_fragment:n0,colorspace_pars_fragment:i0,envmap_fragment:s0,envmap_common_pars_fragment:r0,envmap_pars_fragment:o0,envmap_pars_vertex:a0,envmap_physical_pars_fragment:y0,envmap_vertex:l0,fog_vertex:c0,fog_pars_vertex:h0,fog_fragment:u0,fog_pars_fragment:d0,gradientmap_pars_fragment:f0,lightmap_pars_fragment:p0,lights_lambert_fragment:m0,lights_lambert_pars_fragment:g0,lights_pars_begin:v0,lights_toon_fragment:x0,lights_toon_pars_fragment:_0,lights_phong_fragment:M0,lights_phong_pars_fragment:S0,lights_physical_fragment:w0,lights_physical_pars_fragment:b0,lights_fragment_begin:T0,lights_fragment_maps:A0,lights_fragment_end:E0,logdepthbuf_fragment:C0,logdepthbuf_pars_fragment:R0,logdepthbuf_pars_vertex:P0,logdepthbuf_vertex:I0,map_fragment:L0,map_pars_fragment:D0,map_particle_fragment:U0,map_particle_pars_fragment:N0,metalnessmap_fragment:F0,metalnessmap_pars_fragment:O0,morphinstance_vertex:B0,morphcolor_vertex:z0,morphnormal_vertex:k0,morphtarget_pars_vertex:H0,morphtarget_vertex:G0,normal_fragment_begin:V0,normal_fragment_maps:W0,normal_pars_fragment:X0,normal_pars_vertex:Y0,normal_vertex:q0,normalmap_pars_fragment:Z0,clearcoat_normal_fragment_begin:K0,clearcoat_normal_fragment_maps:$0,clearcoat_pars_fragment:J0,iridescence_pars_fragment:j0,opaque_fragment:Q0,packing:ev,premultiplied_alpha_fragment:tv,project_vertex:nv,dithering_fragment:iv,dithering_pars_fragment:sv,roughnessmap_fragment:rv,roughnessmap_pars_fragment:ov,shadowmap_pars_fragment:av,shadowmap_pars_vertex:lv,shadowmap_vertex:cv,shadowmask_pars_fragment:hv,skinbase_vertex:uv,skinning_pars_vertex:dv,skinning_vertex:fv,skinnormal_vertex:pv,specularmap_fragment:mv,specularmap_pars_fragment:gv,tonemapping_fragment:vv,tonemapping_pars_fragment:yv,transmission_fragment:xv,transmission_pars_fragment:_v,uv_pars_fragment:Mv,uv_pars_vertex:Sv,uv_vertex:wv,worldpos_vertex:bv,background_vert:`varying vec2 vUv;
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
}`},de={common:{diffuse:{value:new G(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new G(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new G(16777215)},opacity:{value:1},center:{value:new Z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},An={basic:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new G(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Kt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new G(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Kt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new G(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Kt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Kt([de.points,de.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Kt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Kt([de.common,de.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Kt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Kt([de.sprite,de.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Kt([de.common,de.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Kt([de.lights,de.fog,{color:{value:new G(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};An.physical={uniforms:Kt([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new G(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new G(0)},specularColor:{value:new G(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new Z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const da={r:0,b:0,g:0},Gi=new an,Tv=new Ne;function Av(o,e,t,n,i,s,r){const a=new G(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function m(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?t:e).get(_)),_}function v(x){let _=!1;const y=m(x);y===null?p(a,l):y&&y.isColor&&(p(y,1),_=!0);const C=o.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(o.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function g(x,_){const y=m(_);y&&(y.isCubeTexture||y.mapping===ps)?(h===void 0&&(h=new Y(new he(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:Us(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Gi.copy(_.backgroundRotation),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Tv.makeRotationFromEuler(Gi)),h.material.toneMapped=Qe.getTransfer(y.colorSpace)!==dt,(u!==y||d!==y.version||f!==o.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=o.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Y(new Tn(2,2),new Dt({name:"BackgroundMaterial",uniforms:Us(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(y.colorSpace)!==dt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==o.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=o.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,_){x.getRGB(da,dd(o)),n.buffers.color.setClear(da.r,da.g,da.b,_,r)}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:v,addToRenderList:g}}function Ev(o,e){const t=o.getParameter(o.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,r=!1;function a(M,L,B,O,k){let K=!1;const H=u(O,B,L);s!==H&&(s=H,c(s.object)),K=f(M,O,B,k),K&&m(M,O,B,k),k!==null&&e.update(k,o.ELEMENT_ARRAY_BUFFER),(K||r)&&(r=!1,y(M,L,B,O),k!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return o.createVertexArray()}function c(M){return o.bindVertexArray(M)}function h(M){return o.deleteVertexArray(M)}function u(M,L,B){const O=B.wireframe===!0;let k=n[M.id];k===void 0&&(k={},n[M.id]=k);let K=k[L.id];K===void 0&&(K={},k[L.id]=K);let H=K[O];return H===void 0&&(H=d(l()),K[O]=H),H}function d(M){const L=[],B=[],O=[];for(let k=0;k<t;k++)L[k]=0,B[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:O,object:M,attributes:{},index:null}}function f(M,L,B,O){const k=s.attributes,K=L.attributes;let H=0;const te=B.getAttributes();for(const X in te)if(te[X].location>=0){const fe=k[X];let pe=K[X];if(pe===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor)),fe===void 0||fe.attribute!==pe||pe&&fe.data!==pe.data)return!0;H++}return s.attributesNum!==H||s.index!==O}function m(M,L,B,O){const k={},K=L.attributes;let H=0;const te=B.getAttributes();for(const X in te)if(te[X].location>=0){let fe=K[X];fe===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor));const pe={};pe.attribute=fe,fe&&fe.data&&(pe.data=fe.data),k[X]=pe,H++}s.attributes=k,s.attributesNum=H,s.index=O}function v(){const M=s.newAttributes;for(let L=0,B=M.length;L<B;L++)M[L]=0}function g(M){p(M,0)}function p(M,L){const B=s.newAttributes,O=s.enabledAttributes,k=s.attributeDivisors;B[M]=1,O[M]===0&&(o.enableVertexAttribArray(M),O[M]=1),k[M]!==L&&(o.vertexAttribDivisor(M,L),k[M]=L)}function x(){const M=s.newAttributes,L=s.enabledAttributes;for(let B=0,O=L.length;B<O;B++)L[B]!==M[B]&&(o.disableVertexAttribArray(B),L[B]=0)}function _(M,L,B,O,k,K,H){H===!0?o.vertexAttribIPointer(M,L,B,k,K):o.vertexAttribPointer(M,L,B,O,k,K)}function y(M,L,B,O){v();const k=O.attributes,K=B.getAttributes(),H=L.defaultAttributeValues;for(const te in K){const X=K[te];if(X.location>=0){let ue=k[te];if(ue===void 0&&(te==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),te==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor)),ue!==void 0){const fe=ue.normalized,pe=ue.itemSize,ke=e.get(ue);if(ke===void 0)continue;const st=ke.buffer,$=ke.type,ie=ke.bytesPerElement,we=$===o.INT||$===o.UNSIGNED_INT||ue.gpuType===ho;if(ue.isInterleavedBufferAttribute){const le=ue.data,Ue=le.stride,Be=ue.offset;if(le.isInstancedInterleavedBuffer){for(let Oe=0;Oe<X.locationSize;Oe++)p(X.location+Oe,le.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Oe=0;Oe<X.locationSize;Oe++)g(X.location+Oe);o.bindBuffer(o.ARRAY_BUFFER,st);for(let Oe=0;Oe<X.locationSize;Oe++)_(X.location+Oe,pe/X.locationSize,$,fe,Ue*ie,(Be+pe/X.locationSize*Oe)*ie,we)}else{if(ue.isInstancedBufferAttribute){for(let le=0;le<X.locationSize;le++)p(X.location+le,ue.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let le=0;le<X.locationSize;le++)g(X.location+le);o.bindBuffer(o.ARRAY_BUFFER,st);for(let le=0;le<X.locationSize;le++)_(X.location+le,pe/X.locationSize,$,fe,pe*ie,pe/X.locationSize*le*ie,we)}}else if(H!==void 0){const fe=H[te];if(fe!==void 0)switch(fe.length){case 2:o.vertexAttrib2fv(X.location,fe);break;case 3:o.vertexAttrib3fv(X.location,fe);break;case 4:o.vertexAttrib4fv(X.location,fe);break;default:o.vertexAttrib1fv(X.location,fe)}}}}x()}function C(){R();for(const M in n){const L=n[M];for(const B in L){const O=L[B];for(const k in O)h(O[k].object),delete O[k];delete L[B]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const B in L){const O=L[B];for(const k in O)h(O[k].object),delete O[k];delete L[B]}delete n[M.id]}function A(M){for(const L in n){const B=n[L];if(B[M.id]===void 0)continue;const O=B[M.id];for(const k in O)h(O[k].object),delete O[k];delete B[M.id]}}function R(){S(),r=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function Cv(o,e,t){let n;function i(c){n=c}function s(c,h){o.drawArrays(n,c,h),t.update(h,n,1)}function r(c,h,u){u!==0&&(o.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)r(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*d[v];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Rv(o,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=o.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){return!(A!==At&&n.convert(A)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const R=A===Vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==mn&&n.convert(A)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==jt&&!R)}function l(A){if(A==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),m=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=o.getParameter(o.MAX_TEXTURE_SIZE),g=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),p=o.getParameter(o.MAX_VERTEX_ATTRIBS),x=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),_=o.getParameter(o.MAX_VARYING_VECTORS),y=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,b=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:C,maxSamples:b}}function Pv(o){const e=this;let t=null,n=0,i=!1,s=!1;const r=new jn,a=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=o.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):c();else{const x=s?0:n,_=x*4;let y=p.clippingState||null;l.value=y,y=h(m,d,_,f);for(let C=0;C!==_;++C)y[C]=t[C];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,y=f;_!==v;++_,y+=4)r.copy(u[_]).applyMatrix4(x,a),r.normal.toArray(g,y),g[y+3]=r.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Iv(o){let e=new WeakMap;function t(r,a){return a===rr?r.mapping=Gn:a===or&&(r.mapping=ci),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===rr||a===or)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new vd(l.height);return c.fromEquirectangularTexture(o,r),e.set(r,c),r.addEventListener("dispose",i),t(c.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Os extends ha{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,r=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Bs=4,xd=[.125,.215,.35,.446,.526,.582],Vi=20,dc=new Os,_d=new G;let fc=null,pc=0,mc=0,gc=!1;const Wi=(1+Math.sqrt(5))/2,zs=1/Wi,Md=[new E(-Wi,zs,0),new E(Wi,zs,0),new E(-zs,0,Wi),new E(zs,0,Wi),new E(0,Wi,-zs),new E(0,Wi,zs),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)];class vc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fc,pc,mc),this._renderer.xr.enabled=gc,e.scissorTest=!1,fa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gn||e.mapping===ci?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ct,minFilter:ct,generateMipmaps:!1,type:Vn,format:At,colorSpace:Ut,depthBuffer:!1},i=Sd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sd(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lv(s)),this._blurMaterial=Dv(s,e,t)}return i}_compileMaterial(e){const t=new Y(this._lodPlanes[0],e);this._renderer.compile(t,dc)}_sceneToCubeUV(e,t,n,i){const a=new Ct(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(_d),h.toneMapping=Hn,h.autoClear=!1;const f=new Ht({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),m=new Y(new he,f);let v=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,v=!0):(f.color.copy(_d),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;fa(i,x*_,p>2?_:0,_,_),h.setRenderTarget(i),v&&h.render(m,a),h.render(e,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Gn||e.mapping===ci;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wd());const s=i?this._cubemapMaterial:this._equirectMaterial,r=new Y(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;fa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,dc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Md[(i-s-1)%Md.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Y(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Vi-1),v=s/m,g=isFinite(s)?1+Math.floor(h*v):Vi;g>Vi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Vi}`);const p=[];let x=0;for(let A=0;A<Vi;++A){const R=A/v,S=Math.exp(-R*R/2);p.push(S),A===0?x+=S:A<g&&(x+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;const y=this._sizeLods[i],C=3*y*(i>_-Bs?i-_+Bs:0),b=4*(this._cubeSize-y);fa(t,C,b,3*y,2*y),l.setRenderTarget(t),l.render(u,dc)}}function Lv(o){const e=[],t=[],n=[];let i=o;const s=o-Bs+1+xd.length;for(let r=0;r<s;r++){const a=Math.pow(2,i);t.push(a);let l=1/a;r>o-Bs?l=xd[r-o+Bs-1]:r===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,v=3,g=2,p=1,x=new Float32Array(v*m*f),_=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let b=0;b<f;b++){const A=b%3*2/3-1,R=b>2?0:-1,S=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];x.set(S,v*m*b),_.set(d,g*m*b);const M=[b,b,b,b,b,b];y.set(M,p*m*b)}const C=new Ge;C.setAttribute("position",new $e(x,v)),C.setAttribute("uv",new $e(_,g)),C.setAttribute("faceIndex",new $e(y,p)),e.push(C),i>Bs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Sd(o,e,t){const n=new Qt(o,e,t);return n.texture.mapping=ps,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fa(o,e,t,n,i){o.viewport.set(e,t,n,i),o.scissor.set(e,t,n,i)}function Dv(o,e,t){const n=new Float32Array(Vi),i=new E(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:yc(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function wd(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yc(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function bd(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function yc(){return`

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
	`}function Uv(o){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===rr||l===or,h=l===Gn||l===ci;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new vc(o)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new vc(o)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function Nv(o){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=o.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&xr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Fv(o,e,t,n){const i={},s=new WeakMap;function r(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);for(const m in d.morphAttributes){const v=d.morphAttributes[m];for(let g=0,p=v.length;g<p;g++)e.remove(v[g])}d.removeEventListener("dispose",r),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",r),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)e.update(d[m],o.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const v=f[m];for(let g=0,p=v.length;g<p;g++)e.update(v[g],o.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,m=u.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let _=0,y=x.length;_<y;_+=3){const C=x[_+0],b=x[_+1],A=x[_+2];d.push(C,b,b,A,A,C)}}else if(m!==void 0){const x=m.array;v=m.version;for(let _=0,y=x.length/3-1;_<y;_+=3){const C=_+0,b=_+1,A=_+2;d.push(C,b,b,A,A,C)}}else return;const g=new(Vu(d)?lc:ac)(d,1);g.version=v;const p=s.get(u);p&&e.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Ov(o,e,t){let n;function i(d){n=d}let s,r;function a(d){s=d.type,r=d.bytesPerElement}function l(d,f){o.drawElements(n,f,s,d*r),t.update(f,n,1)}function c(d,f,m){m!==0&&(o.drawElementsInstanced(n,f,s,d*r,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,v){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/r,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,m);let p=0;for(let x=0;x<m;x++)p+=f[x]*v[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Bv(o){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,a){switch(t.calls++,r){case o.TRIANGLES:t.triangles+=a*(s/3);break;case o.LINES:t.lines+=a*(s/2);break;case o.LINE_STRIP:t.lines+=a*(s-1);break;case o.LINE_LOOP:t.lines+=a*s;break;case o.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function zv(o,e,t){const n=new WeakMap,i=new et;function s(r,a,l){const c=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let S=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let _=0;f===!0&&(_=1),m===!0&&(_=2),v===!0&&(_=3);let y=a.attributes.position.count*_,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*C*4*u),A=new Yo(b,y,C,u);A.type=jt,A.needsUpdate=!0;const R=_*4;for(let M=0;M<u;M++){const L=g[M],B=p[M],O=x[M],k=y*C*4*M;for(let K=0;K<L.count;K++){const H=K*R;f===!0&&(i.fromBufferAttribute(L,K),b[k+H+0]=i.x,b[k+H+1]=i.y,b[k+H+2]=i.z,b[k+H+3]=0),m===!0&&(i.fromBufferAttribute(B,K),b[k+H+4]=i.x,b[k+H+5]=i.y,b[k+H+6]=i.z,b[k+H+7]=0),v===!0&&(i.fromBufferAttribute(O,K),b[k+H+8]=i.x,b[k+H+9]=i.y,b[k+H+10]=i.z,b[k+H+11]=O.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new Z(y,C)},n.set(a,d),a.addEventListener("dispose",S)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(o,"morphTexture",r.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(o,"morphTargetBaseInfluence",m),l.getUniforms().setValue(o,"morphTargetInfluences",c)}l.getUniforms().setValue(o,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(o,"morphTargetsTextureSize",d.size)}return{update:s}}function kv(o,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,o.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,o.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function r(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}class pa extends vt{constructor(e,t,n,i,s,r,a,l,c,h=Ii){if(h!==Ii&&h!==Li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ii&&(n=Un),n===void 0&&h===Li&&(n=Pi),super(null,i,s,r,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:gt,this.minFilter=l!==void 0?l:gt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Td=new vt,Ad=new pa(1,1),Ed=new Yo,Cd=new Xl,Rd=new Tr,Pd=[],Id=[],Ld=new Float32Array(16),Dd=new Float32Array(9),Ud=new Float32Array(4);function ks(o,e,t){const n=o[0];if(n<=0||n>0)return o;const i=e*t;let s=Pd[i];if(s===void 0&&(s=new Float32Array(i),Pd[i]=s),e!==0){n.toArray(s,0);for(let r=1,a=0;r!==e;++r)a+=t,o[r].toArray(s,a)}return s}function Pt(o,e){if(o.length!==e.length)return!1;for(let t=0,n=o.length;t<n;t++)if(o[t]!==e[t])return!1;return!0}function It(o,e){for(let t=0,n=e.length;t<n;t++)o[t]=e[t]}function ma(o,e){let t=Id[e];t===void 0&&(t=new Int32Array(e),Id[e]=t);for(let n=0;n!==e;++n)t[n]=o.allocateTextureUnit();return t}function Hv(o,e){const t=this.cache;t[0]!==e&&(o.uniform1f(this.addr,e),t[0]=e)}function Gv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;o.uniform2fv(this.addr,e),It(t,e)}}function Vv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;o.uniform3fv(this.addr,e),It(t,e)}}function Wv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;o.uniform4fv(this.addr,e),It(t,e)}}function Xv(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;o.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Ud.set(n),o.uniformMatrix2fv(this.addr,!1,Ud),It(t,n)}}function Yv(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;o.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Dd.set(n),o.uniformMatrix3fv(this.addr,!1,Dd),It(t,n)}}function qv(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;o.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Ld.set(n),o.uniformMatrix4fv(this.addr,!1,Ld),It(t,n)}}function Zv(o,e){const t=this.cache;t[0]!==e&&(o.uniform1i(this.addr,e),t[0]=e)}function Kv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;o.uniform2iv(this.addr,e),It(t,e)}}function $v(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;o.uniform3iv(this.addr,e),It(t,e)}}function Jv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;o.uniform4iv(this.addr,e),It(t,e)}}function jv(o,e){const t=this.cache;t[0]!==e&&(o.uniform1ui(this.addr,e),t[0]=e)}function Qv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;o.uniform2uiv(this.addr,e),It(t,e)}}function ey(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;o.uniform3uiv(this.addr,e),It(t,e)}}function ty(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;o.uniform4uiv(this.addr,e),It(t,e)}}function ny(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i);let s;this.type===o.SAMPLER_2D_SHADOW?(Ad.compareFunction=kl,s=Ad):s=Td,t.setTexture2D(e||s,i)}function iy(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Cd,i)}function sy(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Rd,i)}function ry(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ed,i)}function oy(o){switch(o){case 5126:return Hv;case 35664:return Gv;case 35665:return Vv;case 35666:return Wv;case 35674:return Xv;case 35675:return Yv;case 35676:return qv;case 5124:case 35670:return Zv;case 35667:case 35671:return Kv;case 35668:case 35672:return $v;case 35669:case 35673:return Jv;case 5125:return jv;case 36294:return Qv;case 36295:return ey;case 36296:return ty;case 35678:case 36198:case 36298:case 36306:case 35682:return ny;case 35679:case 36299:case 36307:return iy;case 35680:case 36300:case 36308:case 36293:return sy;case 36289:case 36303:case 36311:case 36292:return ry}}function ay(o,e){o.uniform1fv(this.addr,e)}function ly(o,e){const t=ks(e,this.size,2);o.uniform2fv(this.addr,t)}function cy(o,e){const t=ks(e,this.size,3);o.uniform3fv(this.addr,t)}function hy(o,e){const t=ks(e,this.size,4);o.uniform4fv(this.addr,t)}function uy(o,e){const t=ks(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,t)}function dy(o,e){const t=ks(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,t)}function fy(o,e){const t=ks(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,t)}function py(o,e){o.uniform1iv(this.addr,e)}function my(o,e){o.uniform2iv(this.addr,e)}function gy(o,e){o.uniform3iv(this.addr,e)}function vy(o,e){o.uniform4iv(this.addr,e)}function yy(o,e){o.uniform1uiv(this.addr,e)}function xy(o,e){o.uniform2uiv(this.addr,e)}function _y(o,e){o.uniform3uiv(this.addr,e)}function My(o,e){o.uniform4uiv(this.addr,e)}function Sy(o,e,t){const n=this.cache,i=e.length,s=ma(t,i);Pt(n,s)||(o.uniform1iv(this.addr,s),It(n,s));for(let r=0;r!==i;++r)t.setTexture2D(e[r]||Td,s[r])}function wy(o,e,t){const n=this.cache,i=e.length,s=ma(t,i);Pt(n,s)||(o.uniform1iv(this.addr,s),It(n,s));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||Cd,s[r])}function by(o,e,t){const n=this.cache,i=e.length,s=ma(t,i);Pt(n,s)||(o.uniform1iv(this.addr,s),It(n,s));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||Rd,s[r])}function Ty(o,e,t){const n=this.cache,i=e.length,s=ma(t,i);Pt(n,s)||(o.uniform1iv(this.addr,s),It(n,s));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||Ed,s[r])}function Ay(o){switch(o){case 5126:return ay;case 35664:return ly;case 35665:return cy;case 35666:return hy;case 35674:return uy;case 35675:return dy;case 35676:return fy;case 5124:case 35670:return py;case 35667:case 35671:return my;case 35668:case 35672:return gy;case 35669:case 35673:return vy;case 5125:return yy;case 36294:return xy;case 36295:return _y;case 36296:return My;case 35678:case 36198:case 36298:case 36306:case 35682:return Sy;case 35679:case 36299:case 36307:return wy;case 35680:case 36300:case 36308:case 36293:return by;case 36289:case 36303:case 36311:case 36292:return Ty}}class Ey{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=oy(t.type)}}class Cy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ay(t.type)}}class Ry{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const xc=/(\w+)(\])?(\[|\.)?/g;function Nd(o,e){o.seq.push(e),o.map[e.id]=e}function Py(o,e,t){const n=o.name,i=n.length;for(xc.lastIndex=0;;){const s=xc.exec(n),r=xc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===i){Nd(t,c===void 0?new Ey(a,o,e):new Cy(a,o,e));break}else{let u=t.map[a];u===void 0&&(u=new Ry(a),Nd(t,u)),t=u}}}class ga{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),r=e.getUniformLocation(t,s.name);Py(s,r,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function Fd(o,e,t){const n=o.createShader(e);return o.shaderSource(n,t),o.compileShader(n),n}const Iy=37297;let Ly=0;function Dy(o,e){const t=o.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=i;r<s;r++){const a=r+1;n.push(`${a===e?">":" "} ${a}: ${t[r]}`)}return n.join(`
`)}const Od=new Xe;function Uy(o){Qe._getMatrix(Od,Qe.workingColorSpace,o);const e=`mat3( ${Od.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(o)){case pr:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function Bd(o,e,t){const n=o.getShaderParameter(e,o.COMPILE_STATUS),i=o.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const r=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Dy(o.getShaderSource(e),r)}else return i}function Ny(o,e){const t=Uy(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Fy(o,e){let t;switch(e){case xu:t="Linear";break;case _u:t="Reinhard";break;case Mu:t="Cineon";break;case Su:t="ACESFilmic";break;case bu:t="AgX";break;case Tu:t="Neutral";break;case wu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+o+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const va=new E;function Oy(){Qe.getLuminanceCoefficients(va);const o=va.x.toFixed(4),e=va.y.toFixed(4),t=va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function By(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function zy(o){const e=[];for(const t in o){const n=o[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ky(o,e){const t={},n=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=o.getActiveAttrib(e,i),r=s.name;let a=1;s.type===o.FLOAT_MAT2&&(a=2),s.type===o.FLOAT_MAT3&&(a=3),s.type===o.FLOAT_MAT4&&(a=4),t[r]={type:s.type,location:o.getAttribLocation(e,r),locationSize:a}}return t}function Er(o){return o!==""}function zd(o,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kd(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Hy=/^[ \t]*#include +<([\w\d./]+)>/gm;function _c(o){return o.replace(Hy,Vy)}const Gy=new Map;function Vy(o,e){let t=qe[e];if(t===void 0){const n=Gy.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return _c(t)}const Wy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hd(o){return o.replace(Wy,Xy)}function Xy(o,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Gd(o){let e=`precision ${o.precision} float;
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
#define LOW_PRECISION`),e}function Yy(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===Sl?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===wl?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Ln&&(e="SHADOWMAP_TYPE_VSM"),e}function qy(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Gn:case ci:e="ENVMAP_TYPE_CUBE";break;case ps:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Zy(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case ci:e="ENVMAP_MODE_REFRACTION";break}return e}function Ky(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case sr:e="ENVMAP_BLENDING_MULTIPLY";break;case vu:e="ENVMAP_BLENDING_MIX";break;case yu:e="ENVMAP_BLENDING_ADD";break}return e}function $y(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Jy(o,e,t,n){const i=o.getContext(),s=t.defines;let r=t.vertexShader,a=t.fragmentShader;const l=Yy(t),c=qy(t),h=Zy(t),u=Ky(t),d=$y(t),f=By(t),m=zy(s),v=i.createProgram();let g,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Er).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Er).join(`
`),p.length>0&&(p+=`
`)):(g=[Gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),p=[Gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Hn?Fy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,Ny("linearToOutputTexel",t.outputColorSpace),Oy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Er).join(`
`)),r=_c(r),r=zd(r,t),r=kd(r,t),a=_c(a),a=zd(a,t),a=kd(a,t),r=Hd(r),a=Hd(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=x+g+r,y=x+p+a,C=Fd(i,i.VERTEX_SHADER,_),b=Fd(i,i.FRAGMENT_SHADER,y);i.attachShader(v,C),i.attachShader(v,b),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(L){if(o.debug.checkShaderErrors){const B=i.getProgramInfoLog(v).trim(),O=i.getShaderInfoLog(C).trim(),k=i.getShaderInfoLog(b).trim();let K=!0,H=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(K=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,v,C,b);else{const te=Bd(i,C,"vertex"),X=Bd(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+B+`
`+te+`
`+X)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(O===""||k==="")&&(H=!1);H&&(L.diagnostics={runnable:K,programLog:B,vertexShader:{log:O,prefix:g},fragmentShader:{log:k,prefix:p}})}i.deleteShader(C),i.deleteShader(b),R=new ga(i,v),S=ky(i,v)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,Iy)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ly++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=b,this}let jy=0;class Qy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ex(e),t.set(e,n)),n}}class ex{constructor(e){this.id=jy++,this.code=e,this.usedTimes=0}}function tx(o,e,t,n,i,s,r){const a=new Qo,l=new Qy,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,L,B,O){const k=B.fog,K=O.geometry,H=S.isMeshStandardMaterial?B.environment:null,te=(S.isMeshStandardMaterial?t:e).get(S.envMap||H),X=te&&te.mapping===ps?te.image.height:null,ue=m[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const fe=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,pe=fe!==void 0?fe.length:0;let ke=0;K.morphAttributes.position!==void 0&&(ke=1),K.morphAttributes.normal!==void 0&&(ke=2),K.morphAttributes.color!==void 0&&(ke=3);let st,$,ie,we;if(ue){const ft=An[ue];st=ft.vertexShader,$=ft.fragmentShader}else st=S.vertexShader,$=S.fragmentShader,l.update(S),ie=l.getVertexShaderID(S),we=l.getFragmentShaderID(S);const le=o.getRenderTarget(),Ue=o.state.buffers.depth.getReversed(),Be=O.isInstancedMesh===!0,Oe=O.isBatchedMesh===!0,He=!!S.map,Q=!!S.matcap,re=!!te,I=!!S.aoMap,Ee=!!S.lightMap,se=!!S.bumpMap,xe=!!S.normalMap,ce=!!S.displacementMap,Fe=!!S.emissiveMap,Me=!!S.metalnessMap,P=!!S.roughnessMap,w=S.anisotropy>0,z=S.clearcoat>0,J=S.dispersion>0,ne=S.iridescence>0,j=S.sheen>0,Ce=S.transmission>0,me=w&&!!S.anisotropyMap,Se=z&&!!S.clearcoatMap,nt=z&&!!S.clearcoatNormalMap,oe=z&&!!S.clearcoatRoughnessMap,be=ne&&!!S.iridescenceMap,ze=ne&&!!S.iridescenceThicknessMap,Ve=j&&!!S.sheenColorMap,Te=j&&!!S.sheenRoughnessMap,ot=!!S.specularMap,Je=!!S.specularColorMap,pt=!!S.specularIntensityMap,D=Ce&&!!S.transmissionMap,ge=Ce&&!!S.thicknessMap,q=!!S.gradientMap,ee=!!S.alphaMap,_e=S.alphaTest>0,ve=!!S.alphaHash,Ze=!!S.extensions;let bt=Hn;S.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(bt=o.toneMapping);const Yt={shaderID:ue,shaderType:S.type,shaderName:S.name,vertexShader:st,fragmentShader:$,defines:S.defines,customVertexShaderID:ie,customFragmentShaderID:we,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Oe,batchingColor:Oe&&O._colorsTexture!==null,instancing:Be,instancingColor:Be&&O.instanceColor!==null,instancingMorph:Be&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?o.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Ut,alphaToCoverage:!!S.alphaToCoverage,map:He,matcap:Q,envMap:re,envMapMode:re&&te.mapping,envMapCubeUVHeight:X,aoMap:I,lightMap:Ee,bumpMap:se,normalMap:xe,displacementMap:d&&ce,emissiveMap:Fe,normalMapObjectSpace:xe&&S.normalMapType===Du,normalMapTangentSpace:xe&&S.normalMapType===ui,metalnessMap:Me,roughnessMap:P,anisotropy:w,anisotropyMap:me,clearcoat:z,clearcoatMap:Se,clearcoatNormalMap:nt,clearcoatRoughnessMap:oe,dispersion:J,iridescence:ne,iridescenceMap:be,iridescenceThicknessMap:ze,sheen:j,sheenColorMap:Ve,sheenRoughnessMap:Te,specularMap:ot,specularColorMap:Je,specularIntensityMap:pt,transmission:Ce,transmissionMap:D,thicknessMap:ge,gradientMap:q,opaque:S.transparent===!1&&S.blending===ai&&S.alphaToCoverage===!1,alphaMap:ee,alphaTest:_e,alphaHash:ve,combine:S.combine,mapUv:He&&v(S.map.channel),aoMapUv:I&&v(S.aoMap.channel),lightMapUv:Ee&&v(S.lightMap.channel),bumpMapUv:se&&v(S.bumpMap.channel),normalMapUv:xe&&v(S.normalMap.channel),displacementMapUv:ce&&v(S.displacementMap.channel),emissiveMapUv:Fe&&v(S.emissiveMap.channel),metalnessMapUv:Me&&v(S.metalnessMap.channel),roughnessMapUv:P&&v(S.roughnessMap.channel),anisotropyMapUv:me&&v(S.anisotropyMap.channel),clearcoatMapUv:Se&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:nt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Te&&v(S.sheenRoughnessMap.channel),specularMapUv:ot&&v(S.specularMap.channel),specularColorMapUv:Je&&v(S.specularColorMap.channel),specularIntensityMapUv:pt&&v(S.specularIntensityMap.channel),transmissionMapUv:D&&v(S.transmissionMap.channel),thicknessMapUv:ge&&v(S.thicknessMap.channel),alphaMapUv:ee&&v(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(xe||w),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!K.attributes.uv&&(He||ee),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ue,skinning:O.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:ke,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:o.shadowMap.enabled&&L.length>0,shadowMapType:o.shadowMap.type,toneMapping:bt,decodeVideoTexture:He&&S.map.isVideoTexture===!0&&Qe.getTransfer(S.map.colorSpace)===dt,decodeVideoTextureEmissive:Fe&&S.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(S.emissiveMap.colorSpace)===dt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Mn,flipSided:S.side===Ft,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ze&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ze&&S.extensions.multiDraw===!0||Oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Yt.vertexUv1s=c.has(1),Yt.vertexUv2s=c.has(2),Yt.vertexUv3s=c.has(3),c.clear(),Yt}function p(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)M.push(L),M.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(x(M,S),_(M,S),M.push(o.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function x(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function _(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){const M=m[S.type];let L;if(M){const B=An[M];L=fd.clone(B.uniforms)}else L=S.uniforms;return L}function C(S,M){let L;for(let B=0,O=h.length;B<O;B++){const k=h[B];if(k.cacheKey===M){L=k,++L.usedTimes;break}}return L===void 0&&(L=new Jy(o,M,S,s),h.push(L)),L}function b(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:C,releaseProgram:b,releaseShaderCache:A,programs:h,dispose:R}}function nx(){let o=new WeakMap;function e(r){return o.has(r)}function t(r){let a=o.get(r);return a===void 0&&(a={},o.set(r,a)),a}function n(r){o.delete(r)}function i(r,a,l){o.get(r)[a]=l}function s(){o=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function ix(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Vd(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function Wd(){const o=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function r(u,d,f,m,v,g){let p=o[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},o[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=v,p.group=g),e++,p}function a(u,d,f,m,v,g){const p=r(u,d,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,m,v,g){const p=r(u,d,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||ix),n.length>1&&n.sort(d||Vd),i.length>1&&i.sort(d||Vd)}function h(){for(let u=e,d=o.length;u<d;u++){const f=o[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function sx(){let o=new WeakMap;function e(n,i){const s=o.get(n);let r;return s===void 0?(r=new Wd,o.set(n,[r])):i>=s.length?(r=new Wd,s.push(r)):r=s[i],r}function t(){o=new WeakMap}return{get:e,dispose:t}}function rx(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new G};break;case"SpotLight":t={position:new E,direction:new E,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new G,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new G,groundColor:new G};break;case"RectAreaLight":t={color:new G,position:new E,halfWidth:new E,halfHeight:new E};break}return o[e.id]=t,t}}}function ox(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=t,t}}}let ax=0;function lx(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function cx(o){const e=new rx,t=ox(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);const i=new E,s=new Ne,r=new Ne;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,x=0,_=0,y=0,C=0,b=0,A=0;c.sort(lx);for(let S=0,M=c.length;S<M;S++){const L=c[S],B=L.color,O=L.intensity,k=L.distance,K=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=B.r*O,u+=B.g*O,d+=B.b*O;else if(L.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(L.sh.coefficients[H],O);A++}else if(L.isDirectionalLight){const H=e.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,X=t.get(L);X.shadowIntensity=te.intensity,X.shadowBias=te.bias,X.shadowNormalBias=te.normalBias,X.shadowRadius=te.radius,X.shadowMapSize=te.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=K,n.directionalShadowMatrix[f]=L.shadow.matrix,x++}n.directional[f]=H,f++}else if(L.isSpotLight){const H=e.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(B).multiplyScalar(O),H.distance=k,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,n.spot[v]=H;const te=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,te.updateMatrices(L),L.castShadow&&b++),n.spotLightMatrix[v]=te.matrix,L.castShadow){const X=t.get(L);X.shadowIntensity=te.intensity,X.shadowBias=te.bias,X.shadowNormalBias=te.normalBias,X.shadowRadius=te.radius,X.shadowMapSize=te.mapSize,n.spotShadow[v]=X,n.spotShadowMap[v]=K,y++}v++}else if(L.isRectAreaLight){const H=e.get(L);H.color.copy(B).multiplyScalar(O),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=H,g++}else if(L.isPointLight){const H=e.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){const te=L.shadow,X=t.get(L);X.shadowIntensity=te.intensity,X.shadowBias=te.bias,X.shadowNormalBias=te.normalBias,X.shadowRadius=te.radius,X.shadowMapSize=te.mapSize,X.shadowCameraNear=te.camera.near,X.shadowCameraFar=te.camera.far,n.pointShadow[m]=X,n.pointShadowMap[m]=K,n.pointShadowMatrix[m]=L.shadow.matrix,_++}n.point[m]=H,m++}else if(L.isHemisphereLight){const H=e.get(L);H.skyColor.copy(L.color).multiplyScalar(O),H.groundColor.copy(L.groundColor).multiplyScalar(O),n.hemi[p]=H,p++}}g>0&&(o.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==v||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==x||R.numPointShadows!==_||R.numSpotShadows!==y||R.numSpotMaps!==C||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+C-b,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,R.directionalLength=f,R.pointLength=m,R.spotLength=v,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=x,R.numPointShadows=_,R.numSpotShadows=y,R.numSpotMaps=C,R.numLightProbes=A,n.version=ax++)}function l(c,h){let u=0,d=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const _=c[p];if(_.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(_.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const y=n.rectArea[m];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),r.identity(),s.copy(_.matrixWorld),s.premultiply(g),r.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),m++}else if(_.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:n}}function Xd(o){const e=new cx(o),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function r(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:r}}function hx(o){let e=new WeakMap;function t(i,s=0){const r=e.get(i);let a;return r===void 0?(a=new Xd(o),e.set(i,[a])):s>=r.length?(a=new Xd(o),r.push(a)):a=r[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Mc extends Rt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sc extends Rt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ux=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dx=`uniform sampler2D shadow_pass;
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
}`;function fx(o,e,t){let n=new Ar;const i=new Z,s=new Z,r=new et,a=new Mc({depthPacking:Lu}),l=new Sc,c={},h=t.maxTextureSize,u={[Dn]:Ft,[Ft]:Dn,[Mn]:Mn},d=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Z},radius:{value:4}},vertexShader:ux,fragmentShader:dx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Ge;m.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Y(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sl;let p=this.type;this.render=function(b,A,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const S=o.getRenderTarget(),M=o.getActiveCubeFace(),L=o.getActiveMipmapLevel(),B=o.state;B.setBlending(kn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const O=p!==Ln&&this.type===Ln,k=p===Ln&&this.type!==Ln;for(let K=0,H=b.length;K<H;K++){const te=b[K],X=te.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const ue=X.getFrameExtents();if(i.multiply(ue),s.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ue.x),i.x=s.x*ue.x,X.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ue.y),i.y=s.y*ue.y,X.mapSize.y=s.y)),X.map===null||O===!0||k===!0){const pe=this.type!==Ln?{minFilter:gt,magFilter:gt}:{};X.map!==null&&X.map.dispose(),X.map=new Qt(i.x,i.y,pe),X.map.texture.name=te.name+".shadowMap",X.camera.updateProjectionMatrix()}o.setRenderTarget(X.map),o.clear();const fe=X.getViewportCount();for(let pe=0;pe<fe;pe++){const ke=X.getViewport(pe);r.set(s.x*ke.x,s.y*ke.y,s.x*ke.z,s.y*ke.w),B.viewport(r),X.updateMatrices(te,pe),n=X.getFrustum(),y(A,R,X.camera,te,this.type)}X.isPointLightShadow!==!0&&this.type===Ln&&x(X,R),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,o.setRenderTarget(S,M,L)};function x(b,A){const R=e.update(v);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Qt(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,o.setRenderTarget(b.mapPass),o.clear(),o.renderBufferDirect(A,null,R,d,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,o.setRenderTarget(b.map),o.clear(),o.renderBufferDirect(A,null,R,f,v,null)}function _(b,A,R,S){let M=null;const L=R.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)M=L;else if(M=R.isPointLight===!0?l:a,o.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=M.uuid,O=A.uuid;let k=c[B];k===void 0&&(k={},c[B]=k);let K=k[O];K===void 0&&(K=M.clone(),k[O]=K,A.addEventListener("dispose",C)),M=K}if(M.visible=A.visible,M.wireframe=A.wireframe,S===Ln?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=o.properties.get(M);B.light=R}return M}function y(b,A,R,S,M){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===Ln)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,b.matrixWorld);const O=e.update(b),k=b.material;if(Array.isArray(k)){const K=O.groups;for(let H=0,te=K.length;H<te;H++){const X=K[H],ue=k[X.materialIndex];if(ue&&ue.visible){const fe=_(b,ue,S,M);b.onBeforeShadow(o,b,A,R,O,fe,X),o.renderBufferDirect(R,null,O,fe,b,X),b.onAfterShadow(o,b,A,R,O,fe,X)}}}else if(k.visible){const K=_(b,k,S,M);b.onBeforeShadow(o,b,A,R,O,K,null),o.renderBufferDirect(R,null,O,K,b,null),b.onAfterShadow(o,b,A,R,O,K,null)}}const B=b.children;for(let O=0,k=B.length;O<k;O++)y(B[O],A,R,S,M)}function C(b){b.target.removeEventListener("dispose",C);for(const R in c){const S=c[R],M=b.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const px={[to]:no,[io]:oo,[so]:ao,[Ci]:ro,[no]:to,[oo]:io,[ao]:so,[ro]:Ci};function mx(o,e){function t(){let D=!1;const ge=new et;let q=null;const ee=new et(0,0,0,0);return{setMask:function(_e){q!==_e&&!D&&(o.colorMask(_e,_e,_e,_e),q=_e)},setLocked:function(_e){D=_e},setClear:function(_e,ve,Ze,bt,Yt){Yt===!0&&(_e*=bt,ve*=bt,Ze*=bt),ge.set(_e,ve,Ze,bt),ee.equals(ge)===!1&&(o.clearColor(_e,ve,Ze,bt),ee.copy(ge))},reset:function(){D=!1,q=null,ee.set(-1,0,0,0)}}}function n(){let D=!1,ge=!1,q=null,ee=null,_e=null;return{setReversed:function(ve){if(ge!==ve){const Ze=e.get("EXT_clip_control");ge?Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.ZERO_TO_ONE_EXT):Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.NEGATIVE_ONE_TO_ONE_EXT);const bt=_e;_e=null,this.setClear(bt)}ge=ve},getReversed:function(){return ge},setTest:function(ve){ve?le(o.DEPTH_TEST):Ue(o.DEPTH_TEST)},setMask:function(ve){q!==ve&&!D&&(o.depthMask(ve),q=ve)},setFunc:function(ve){if(ge&&(ve=px[ve]),ee!==ve){switch(ve){case to:o.depthFunc(o.NEVER);break;case no:o.depthFunc(o.ALWAYS);break;case io:o.depthFunc(o.LESS);break;case Ci:o.depthFunc(o.LEQUAL);break;case so:o.depthFunc(o.EQUAL);break;case ro:o.depthFunc(o.GEQUAL);break;case oo:o.depthFunc(o.GREATER);break;case ao:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}ee=ve}},setLocked:function(ve){D=ve},setClear:function(ve){_e!==ve&&(ge&&(ve=1-ve),o.clearDepth(ve),_e=ve)},reset:function(){D=!1,q=null,ee=null,_e=null,ge=!1}}}function i(){let D=!1,ge=null,q=null,ee=null,_e=null,ve=null,Ze=null,bt=null,Yt=null;return{setTest:function(ft){D||(ft?le(o.STENCIL_TEST):Ue(o.STENCIL_TEST))},setMask:function(ft){ge!==ft&&!D&&(o.stencilMask(ft),ge=ft)},setFunc:function(ft,Pn,ri){(q!==ft||ee!==Pn||_e!==ri)&&(o.stencilFunc(ft,Pn,ri),q=ft,ee=Pn,_e=ri)},setOp:function(ft,Pn,ri){(ve!==ft||Ze!==Pn||bt!==ri)&&(o.stencilOp(ft,Pn,ri),ve=ft,Ze=Pn,bt=ri)},setLocked:function(ft){D=ft},setClear:function(ft){Yt!==ft&&(o.clearStencil(ft),Yt=ft)},reset:function(){D=!1,ge=null,q=null,ee=null,_e=null,ve=null,Ze=null,bt=null,Yt=null}}}const s=new t,r=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,x=null,_=null,y=null,C=null,b=null,A=new G(0,0,0),R=0,S=!1,M=null,L=null,B=null,O=null,k=null;const K=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,te=0;const X=o.getParameter(o.VERSION);X.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(X)[1]),H=te>=1):X.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),H=te>=2);let ue=null,fe={};const pe=o.getParameter(o.SCISSOR_BOX),ke=o.getParameter(o.VIEWPORT),st=new et().fromArray(pe),$=new et().fromArray(ke);function ie(D,ge,q,ee){const _e=new Uint8Array(4),ve=o.createTexture();o.bindTexture(D,ve),o.texParameteri(D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(D,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Ze=0;Ze<q;Ze++)D===o.TEXTURE_3D||D===o.TEXTURE_2D_ARRAY?o.texImage3D(ge,0,o.RGBA,1,1,ee,0,o.RGBA,o.UNSIGNED_BYTE,_e):o.texImage2D(ge+Ze,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,_e);return ve}const we={};we[o.TEXTURE_2D]=ie(o.TEXTURE_2D,o.TEXTURE_2D,1),we[o.TEXTURE_CUBE_MAP]=ie(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),we[o.TEXTURE_2D_ARRAY]=ie(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),we[o.TEXTURE_3D]=ie(o.TEXTURE_3D,o.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),le(o.DEPTH_TEST),r.setFunc(Ci),se(!1),xe(Ml),le(o.CULL_FACE),I(kn);function le(D){h[D]!==!0&&(o.enable(D),h[D]=!0)}function Ue(D){h[D]!==!1&&(o.disable(D),h[D]=!1)}function Be(D,ge){return u[D]!==ge?(o.bindFramebuffer(D,ge),u[D]=ge,D===o.DRAW_FRAMEBUFFER&&(u[o.FRAMEBUFFER]=ge),D===o.FRAMEBUFFER&&(u[o.DRAW_FRAMEBUFFER]=ge),!0):!1}function Oe(D,ge){let q=f,ee=!1;if(D){q=d.get(ge),q===void 0&&(q=[],d.set(ge,q));const _e=D.textures;if(q.length!==_e.length||q[0]!==o.COLOR_ATTACHMENT0){for(let ve=0,Ze=_e.length;ve<Ze;ve++)q[ve]=o.COLOR_ATTACHMENT0+ve;q.length=_e.length,ee=!0}}else q[0]!==o.BACK&&(q[0]=o.BACK,ee=!0);ee&&o.drawBuffers(q)}function He(D){return m!==D?(o.useProgram(D),m=D,!0):!1}const Q={[li]:o.FUNC_ADD,[eu]:o.FUNC_SUBTRACT,[tu]:o.FUNC_REVERSE_SUBTRACT};Q[nu]=o.MIN,Q[iu]=o.MAX;const re={[su]:o.ZERO,[ru]:o.ONE,[ou]:o.SRC_COLOR,[Qr]:o.SRC_ALPHA,[du]:o.SRC_ALPHA_SATURATE,[hu]:o.DST_COLOR,[lu]:o.DST_ALPHA,[au]:o.ONE_MINUS_SRC_COLOR,[eo]:o.ONE_MINUS_SRC_ALPHA,[uu]:o.ONE_MINUS_DST_COLOR,[cu]:o.ONE_MINUS_DST_ALPHA,[fu]:o.CONSTANT_COLOR,[pu]:o.ONE_MINUS_CONSTANT_COLOR,[mu]:o.CONSTANT_ALPHA,[gu]:o.ONE_MINUS_CONSTANT_ALPHA};function I(D,ge,q,ee,_e,ve,Ze,bt,Yt,ft){if(D===kn){v===!0&&(Ue(o.BLEND),v=!1);return}if(v===!1&&(le(o.BLEND),v=!0),D!==Qh){if(D!==g||ft!==S){if((p!==li||y!==li)&&(o.blendEquation(o.FUNC_ADD),p=li,y=li),ft)switch(D){case ai:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case bl:o.blendFunc(o.ONE,o.ONE);break;case Tl:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Al:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ai:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case bl:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case Tl:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Al:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}x=null,_=null,C=null,b=null,A.set(0,0,0),R=0,g=D,S=ft}return}_e=_e||ge,ve=ve||q,Ze=Ze||ee,(ge!==p||_e!==y)&&(o.blendEquationSeparate(Q[ge],Q[_e]),p=ge,y=_e),(q!==x||ee!==_||ve!==C||Ze!==b)&&(o.blendFuncSeparate(re[q],re[ee],re[ve],re[Ze]),x=q,_=ee,C=ve,b=Ze),(bt.equals(A)===!1||Yt!==R)&&(o.blendColor(bt.r,bt.g,bt.b,Yt),A.copy(bt),R=Yt),g=D,S=!1}function Ee(D,ge){D.side===Mn?Ue(o.CULL_FACE):le(o.CULL_FACE);let q=D.side===Ft;ge&&(q=!q),se(q),D.blending===ai&&D.transparent===!1?I(kn):I(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),s.setMask(D.colorWrite);const ee=D.stencilWrite;a.setTest(ee),ee&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Fe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?le(o.SAMPLE_ALPHA_TO_COVERAGE):Ue(o.SAMPLE_ALPHA_TO_COVERAGE)}function se(D){M!==D&&(D?o.frontFace(o.CW):o.frontFace(o.CCW),M=D)}function xe(D){D!==Jh?(le(o.CULL_FACE),D!==L&&(D===Ml?o.cullFace(o.BACK):D===jh?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Ue(o.CULL_FACE),L=D}function ce(D){D!==B&&(H&&o.lineWidth(D),B=D)}function Fe(D,ge,q){D?(le(o.POLYGON_OFFSET_FILL),(O!==ge||k!==q)&&(o.polygonOffset(ge,q),O=ge,k=q)):Ue(o.POLYGON_OFFSET_FILL)}function Me(D){D?le(o.SCISSOR_TEST):Ue(o.SCISSOR_TEST)}function P(D){D===void 0&&(D=o.TEXTURE0+K-1),ue!==D&&(o.activeTexture(D),ue=D)}function w(D,ge,q){q===void 0&&(ue===null?q=o.TEXTURE0+K-1:q=ue);let ee=fe[q];ee===void 0&&(ee={type:void 0,texture:void 0},fe[q]=ee),(ee.type!==D||ee.texture!==ge)&&(ue!==q&&(o.activeTexture(q),ue=q),o.bindTexture(D,ge||we[D]),ee.type=D,ee.texture=ge)}function z(){const D=fe[ue];D!==void 0&&D.type!==void 0&&(o.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function J(){try{o.compressedTexImage2D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{o.compressedTexImage3D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{o.texSubImage2D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{o.texSubImage3D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Se(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{o.texStorage2D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function oe(){try{o.texStorage3D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function be(){try{o.texImage2D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ze(){try{o.texImage3D.apply(o,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ve(D){st.equals(D)===!1&&(o.scissor(D.x,D.y,D.z,D.w),st.copy(D))}function Te(D){$.equals(D)===!1&&(o.viewport(D.x,D.y,D.z,D.w),$.copy(D))}function ot(D,ge){let q=c.get(ge);q===void 0&&(q=new WeakMap,c.set(ge,q));let ee=q.get(D);ee===void 0&&(ee=o.getUniformBlockIndex(ge,D.name),q.set(D,ee))}function Je(D,ge){const ee=c.get(ge).get(D);l.get(ge)!==ee&&(o.uniformBlockBinding(ge,ee,D.__bindingPointIndex),l.set(ge,ee))}function pt(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),r.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),h={},ue=null,fe={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,x=null,_=null,y=null,C=null,b=null,A=new G(0,0,0),R=0,S=!1,M=null,L=null,B=null,O=null,k=null,st.set(0,0,o.canvas.width,o.canvas.height),$.set(0,0,o.canvas.width,o.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:le,disable:Ue,bindFramebuffer:Be,drawBuffers:Oe,useProgram:He,setBlending:I,setMaterial:Ee,setFlipSided:se,setCullFace:xe,setLineWidth:ce,setPolygonOffset:Fe,setScissorTest:Me,activeTexture:P,bindTexture:w,unbindTexture:z,compressedTexImage2D:J,compressedTexImage3D:ne,texImage2D:be,texImage3D:ze,updateUBOMapping:ot,uniformBlockBinding:Je,texStorage2D:nt,texStorage3D:oe,texSubImage2D:j,texSubImage3D:Ce,compressedTexSubImage2D:me,compressedTexSubImage3D:Se,scissor:Ve,viewport:Te,reset:pt}}function gx(o,e){const t=o.image&&o.image.width?o.image.width/o.image.height:1;return t>e?(o.repeat.x=1,o.repeat.y=t/e,o.offset.x=0,o.offset.y=(1-o.repeat.y)/2):(o.repeat.x=e/t,o.repeat.y=1,o.offset.x=(1-o.repeat.x)/2,o.offset.y=0),o}function vx(o,e){const t=o.image&&o.image.width?o.image.width/o.image.height:1;return t>e?(o.repeat.x=e/t,o.repeat.y=1,o.offset.x=(1-o.repeat.x)/2,o.offset.y=0):(o.repeat.x=1,o.repeat.y=t/e,o.offset.x=0,o.offset.y=(1-o.repeat.y)/2),o}function yx(o){return o.repeat.x=1,o.repeat.y=1,o.offset.x=0,o.offset.y=0,o}function wc(o,e,t,n){const i=xx(n);switch(t){case Il:return o*e;case Dl:return o*e;case Ul:return o*e*2;case po:return o*e/i.components*i.byteLength;case ar:return o*e/i.components*i.byteLength;case Nl:return o*e*2/i.components*i.byteLength;case mo:return o*e*2/i.components*i.byteLength;case Ll:return o*e*3/i.components*i.byteLength;case At:return o*e*4/i.components*i.byteLength;case go:return o*e*4/i.components*i.byteLength;case lr:case cr:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case hr:case ur:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case yo:case _o:return Math.max(o,16)*Math.max(e,8)/4;case vo:case xo:return Math.max(o,8)*Math.max(e,8)/2;case Mo:case So:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case wo:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case bo:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case To:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case Ao:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Eo:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Co:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Po:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Io:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Lo:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Do:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Uo:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case No:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Fo:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Oo:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case dr:case Bo:case zo:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Fl:case ko:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Ho:case Go:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xx(o){switch(o){case mn:case Cl:return{byteLength:1,components:1};case vs:case Rl:case Vn:return{byteLength:2,components:1};case uo:case fo:return{byteLength:2,components:4};case Un:case ho:case jt:return{byteLength:4,components:1};case Pl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}const _x={contain:gx,cover:vx,fill:yx,getByteLength:wc};function Mx(o,e,t,n,i,s,r){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Z,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,w){return f?new OffscreenCanvas(P,w):yr("canvas")}function v(P,w,z){let J=1;const ne=Me(P);if((ne.width>z||ne.height>z)&&(J=z/Math.max(ne.width,ne.height)),J<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const j=Math.floor(J*ne.width),Ce=Math.floor(J*ne.height);u===void 0&&(u=m(j,Ce));const me=w?m(j,Ce):u;return me.width=j,me.height=Ce,me.getContext("2d").drawImage(P,0,0,j,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+j+"x"+Ce+")."),me}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),P;return P}function g(P){return P.generateMipmaps}function p(P){o.generateMipmap(P)}function x(P){return P.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?o.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function _(P,w,z,J,ne=!1){if(P!==null){if(o[P]!==void 0)return o[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let j=w;if(w===o.RED&&(z===o.FLOAT&&(j=o.R32F),z===o.HALF_FLOAT&&(j=o.R16F),z===o.UNSIGNED_BYTE&&(j=o.R8)),w===o.RED_INTEGER&&(z===o.UNSIGNED_BYTE&&(j=o.R8UI),z===o.UNSIGNED_SHORT&&(j=o.R16UI),z===o.UNSIGNED_INT&&(j=o.R32UI),z===o.BYTE&&(j=o.R8I),z===o.SHORT&&(j=o.R16I),z===o.INT&&(j=o.R32I)),w===o.RG&&(z===o.FLOAT&&(j=o.RG32F),z===o.HALF_FLOAT&&(j=o.RG16F),z===o.UNSIGNED_BYTE&&(j=o.RG8)),w===o.RG_INTEGER&&(z===o.UNSIGNED_BYTE&&(j=o.RG8UI),z===o.UNSIGNED_SHORT&&(j=o.RG16UI),z===o.UNSIGNED_INT&&(j=o.RG32UI),z===o.BYTE&&(j=o.RG8I),z===o.SHORT&&(j=o.RG16I),z===o.INT&&(j=o.RG32I)),w===o.RGB_INTEGER&&(z===o.UNSIGNED_BYTE&&(j=o.RGB8UI),z===o.UNSIGNED_SHORT&&(j=o.RGB16UI),z===o.UNSIGNED_INT&&(j=o.RGB32UI),z===o.BYTE&&(j=o.RGB8I),z===o.SHORT&&(j=o.RGB16I),z===o.INT&&(j=o.RGB32I)),w===o.RGBA_INTEGER&&(z===o.UNSIGNED_BYTE&&(j=o.RGBA8UI),z===o.UNSIGNED_SHORT&&(j=o.RGBA16UI),z===o.UNSIGNED_INT&&(j=o.RGBA32UI),z===o.BYTE&&(j=o.RGBA8I),z===o.SHORT&&(j=o.RGBA16I),z===o.INT&&(j=o.RGBA32I)),w===o.RGB&&z===o.UNSIGNED_INT_5_9_9_9_REV&&(j=o.RGB9_E5),w===o.RGBA){const Ce=ne?pr:Qe.getTransfer(J);z===o.FLOAT&&(j=o.RGBA32F),z===o.HALF_FLOAT&&(j=o.RGBA16F),z===o.UNSIGNED_BYTE&&(j=Ce===dt?o.SRGB8_ALPHA8:o.RGBA8),z===o.UNSIGNED_SHORT_4_4_4_4&&(j=o.RGBA4),z===o.UNSIGNED_SHORT_5_5_5_1&&(j=o.RGB5_A1)}return(j===o.R16F||j===o.R32F||j===o.RG16F||j===o.RG32F||j===o.RGBA16F||j===o.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(P,w){let z;return P?w===null||w===Un||w===Pi?z=o.DEPTH24_STENCIL8:w===jt?z=o.DEPTH32F_STENCIL8:w===vs&&(z=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Un||w===Pi?z=o.DEPTH_COMPONENT24:w===jt?z=o.DEPTH_COMPONENT32F:w===vs&&(z=o.DEPTH_COMPONENT16),z}function C(P,w){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==gt&&P.minFilter!==ct?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function b(P){const w=P.target;w.removeEventListener("dispose",b),R(w),w.isVideoTexture&&h.delete(w)}function A(P){const w=P.target;w.removeEventListener("dispose",A),M(w)}function R(P){const w=n.get(P);if(w.__webglInit===void 0)return;const z=P.source,J=d.get(z);if(J){const ne=J[w.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&S(P),Object.keys(J).length===0&&d.delete(z)}n.remove(P)}function S(P){const w=n.get(P);o.deleteTexture(w.__webglTexture);const z=P.source,J=d.get(z);delete J[w.__cacheKey],r.memory.textures--}function M(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(w.__webglFramebuffer[J]))for(let ne=0;ne<w.__webglFramebuffer[J].length;ne++)o.deleteFramebuffer(w.__webglFramebuffer[J][ne]);else o.deleteFramebuffer(w.__webglFramebuffer[J]);w.__webglDepthbuffer&&o.deleteRenderbuffer(w.__webglDepthbuffer[J])}else{if(Array.isArray(w.__webglFramebuffer))for(let J=0;J<w.__webglFramebuffer.length;J++)o.deleteFramebuffer(w.__webglFramebuffer[J]);else o.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&o.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&o.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let J=0;J<w.__webglColorRenderbuffer.length;J++)w.__webglColorRenderbuffer[J]&&o.deleteRenderbuffer(w.__webglColorRenderbuffer[J]);w.__webglDepthRenderbuffer&&o.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const z=P.textures;for(let J=0,ne=z.length;J<ne;J++){const j=n.get(z[J]);j.__webglTexture&&(o.deleteTexture(j.__webglTexture),r.memory.textures--),n.remove(z[J])}n.remove(P)}let L=0;function B(){L=0}function O(){const P=L;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),L+=1,P}function k(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function K(P,w){const z=n.get(P);if(P.isVideoTexture&&ce(P),P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){const J=P.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(z,P,w);return}}t.bindTexture(o.TEXTURE_2D,z.__webglTexture,o.TEXTURE0+w)}function H(P,w){const z=n.get(P);if(P.version>0&&z.__version!==P.version){$(z,P,w);return}t.bindTexture(o.TEXTURE_2D_ARRAY,z.__webglTexture,o.TEXTURE0+w)}function te(P,w){const z=n.get(P);if(P.version>0&&z.__version!==P.version){$(z,P,w);return}t.bindTexture(o.TEXTURE_3D,z.__webglTexture,o.TEXTURE0+w)}function X(P,w){const z=n.get(P);if(P.version>0&&z.__version!==P.version){ie(z,P,w);return}t.bindTexture(o.TEXTURE_CUBE_MAP,z.__webglTexture,o.TEXTURE0+w)}const ue={[hi]:o.REPEAT,[qt]:o.CLAMP_TO_EDGE,[ms]:o.MIRRORED_REPEAT},fe={[gt]:o.NEAREST,[co]:o.NEAREST_MIPMAP_NEAREST,[Ri]:o.NEAREST_MIPMAP_LINEAR,[ct]:o.LINEAR,[gs]:o.LINEAR_MIPMAP_NEAREST,[pn]:o.LINEAR_MIPMAP_LINEAR},pe={[Uu]:o.NEVER,[ku]:o.ALWAYS,[Nu]:o.LESS,[kl]:o.LEQUAL,[Fu]:o.EQUAL,[zu]:o.GEQUAL,[Ou]:o.GREATER,[Bu]:o.NOTEQUAL};function ke(P,w){if(w.type===jt&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===ct||w.magFilter===gs||w.magFilter===Ri||w.magFilter===pn||w.minFilter===ct||w.minFilter===gs||w.minFilter===Ri||w.minFilter===pn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(P,o.TEXTURE_WRAP_S,ue[w.wrapS]),o.texParameteri(P,o.TEXTURE_WRAP_T,ue[w.wrapT]),(P===o.TEXTURE_3D||P===o.TEXTURE_2D_ARRAY)&&o.texParameteri(P,o.TEXTURE_WRAP_R,ue[w.wrapR]),o.texParameteri(P,o.TEXTURE_MAG_FILTER,fe[w.magFilter]),o.texParameteri(P,o.TEXTURE_MIN_FILTER,fe[w.minFilter]),w.compareFunction&&(o.texParameteri(P,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(P,o.TEXTURE_COMPARE_FUNC,pe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===gt||w.minFilter!==Ri&&w.minFilter!==pn||w.type===jt&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");o.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function st(P,w){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",b));const J=w.source;let ne=d.get(J);ne===void 0&&(ne={},d.set(J,ne));const j=k(w);if(j!==P.__cacheKey){ne[j]===void 0&&(ne[j]={texture:o.createTexture(),usedTimes:0},r.memory.textures++,z=!0),ne[j].usedTimes++;const Ce=ne[P.__cacheKey];Ce!==void 0&&(ne[P.__cacheKey].usedTimes--,Ce.usedTimes===0&&S(w)),P.__cacheKey=j,P.__webglTexture=ne[j].texture}return z}function $(P,w,z){let J=o.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(J=o.TEXTURE_2D_ARRAY),w.isData3DTexture&&(J=o.TEXTURE_3D);const ne=st(P,w),j=w.source;t.bindTexture(J,P.__webglTexture,o.TEXTURE0+z);const Ce=n.get(j);if(j.version!==Ce.__version||ne===!0){t.activeTexture(o.TEXTURE0+z);const me=Qe.getPrimaries(Qe.workingColorSpace),Se=w.colorSpace===Wn?null:Qe.getPrimaries(w.colorSpace),nt=w.colorSpace===Wn||me===Se?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,w.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,w.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let oe=v(w.image,!1,i.maxTextureSize);oe=Fe(w,oe);const be=s.convert(w.format,w.colorSpace),ze=s.convert(w.type);let Ve=_(w.internalFormat,be,ze,w.colorSpace,w.isVideoTexture);ke(J,w);let Te;const ot=w.mipmaps,Je=w.isVideoTexture!==!0,pt=Ce.__version===void 0||ne===!0,D=j.dataReady,ge=C(w,oe);if(w.isDepthTexture)Ve=y(w.format===Li,w.type),pt&&(Je?t.texStorage2D(o.TEXTURE_2D,1,Ve,oe.width,oe.height):t.texImage2D(o.TEXTURE_2D,0,Ve,oe.width,oe.height,0,be,ze,null));else if(w.isDataTexture)if(ot.length>0){Je&&pt&&t.texStorage2D(o.TEXTURE_2D,ge,Ve,ot[0].width,ot[0].height);for(let q=0,ee=ot.length;q<ee;q++)Te=ot[q],Je?D&&t.texSubImage2D(o.TEXTURE_2D,q,0,0,Te.width,Te.height,be,ze,Te.data):t.texImage2D(o.TEXTURE_2D,q,Ve,Te.width,Te.height,0,be,ze,Te.data);w.generateMipmaps=!1}else Je?(pt&&t.texStorage2D(o.TEXTURE_2D,ge,Ve,oe.width,oe.height),D&&t.texSubImage2D(o.TEXTURE_2D,0,0,0,oe.width,oe.height,be,ze,oe.data)):t.texImage2D(o.TEXTURE_2D,0,Ve,oe.width,oe.height,0,be,ze,oe.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Je&&pt&&t.texStorage3D(o.TEXTURE_2D_ARRAY,ge,Ve,ot[0].width,ot[0].height,oe.depth);for(let q=0,ee=ot.length;q<ee;q++)if(Te=ot[q],w.format!==At)if(be!==null)if(Je){if(D)if(w.layerUpdates.size>0){const _e=wc(Te.width,Te.height,w.format,w.type);for(const ve of w.layerUpdates){const Ze=Te.data.subarray(ve*_e/Te.data.BYTES_PER_ELEMENT,(ve+1)*_e/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,q,0,0,ve,Te.width,Te.height,1,be,Ze)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,q,0,0,0,Te.width,Te.height,oe.depth,be,Te.data)}else t.compressedTexImage3D(o.TEXTURE_2D_ARRAY,q,Ve,Te.width,Te.height,oe.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?D&&t.texSubImage3D(o.TEXTURE_2D_ARRAY,q,0,0,0,Te.width,Te.height,oe.depth,be,ze,Te.data):t.texImage3D(o.TEXTURE_2D_ARRAY,q,Ve,Te.width,Te.height,oe.depth,0,be,ze,Te.data)}else{Je&&pt&&t.texStorage2D(o.TEXTURE_2D,ge,Ve,ot[0].width,ot[0].height);for(let q=0,ee=ot.length;q<ee;q++)Te=ot[q],w.format!==At?be!==null?Je?D&&t.compressedTexSubImage2D(o.TEXTURE_2D,q,0,0,Te.width,Te.height,be,Te.data):t.compressedTexImage2D(o.TEXTURE_2D,q,Ve,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?D&&t.texSubImage2D(o.TEXTURE_2D,q,0,0,Te.width,Te.height,be,ze,Te.data):t.texImage2D(o.TEXTURE_2D,q,Ve,Te.width,Te.height,0,be,ze,Te.data)}else if(w.isDataArrayTexture)if(Je){if(pt&&t.texStorage3D(o.TEXTURE_2D_ARRAY,ge,Ve,oe.width,oe.height,oe.depth),D)if(w.layerUpdates.size>0){const q=wc(oe.width,oe.height,w.format,w.type);for(const ee of w.layerUpdates){const _e=oe.data.subarray(ee*q/oe.data.BYTES_PER_ELEMENT,(ee+1)*q/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,ee,oe.width,oe.height,1,be,ze,_e)}w.clearLayerUpdates()}else t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,be,ze,oe.data)}else t.texImage3D(o.TEXTURE_2D_ARRAY,0,Ve,oe.width,oe.height,oe.depth,0,be,ze,oe.data);else if(w.isData3DTexture)Je?(pt&&t.texStorage3D(o.TEXTURE_3D,ge,Ve,oe.width,oe.height,oe.depth),D&&t.texSubImage3D(o.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,be,ze,oe.data)):t.texImage3D(o.TEXTURE_3D,0,Ve,oe.width,oe.height,oe.depth,0,be,ze,oe.data);else if(w.isFramebufferTexture){if(pt)if(Je)t.texStorage2D(o.TEXTURE_2D,ge,Ve,oe.width,oe.height);else{let q=oe.width,ee=oe.height;for(let _e=0;_e<ge;_e++)t.texImage2D(o.TEXTURE_2D,_e,Ve,q,ee,0,be,ze,null),q>>=1,ee>>=1}}else if(ot.length>0){if(Je&&pt){const q=Me(ot[0]);t.texStorage2D(o.TEXTURE_2D,ge,Ve,q.width,q.height)}for(let q=0,ee=ot.length;q<ee;q++)Te=ot[q],Je?D&&t.texSubImage2D(o.TEXTURE_2D,q,0,0,be,ze,Te):t.texImage2D(o.TEXTURE_2D,q,Ve,be,ze,Te);w.generateMipmaps=!1}else if(Je){if(pt){const q=Me(oe);t.texStorage2D(o.TEXTURE_2D,ge,Ve,q.width,q.height)}D&&t.texSubImage2D(o.TEXTURE_2D,0,0,0,be,ze,oe)}else t.texImage2D(o.TEXTURE_2D,0,Ve,be,ze,oe);g(w)&&p(J),Ce.__version=j.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function ie(P,w,z){if(w.image.length!==6)return;const J=st(P,w),ne=w.source;t.bindTexture(o.TEXTURE_CUBE_MAP,P.__webglTexture,o.TEXTURE0+z);const j=n.get(ne);if(ne.version!==j.__version||J===!0){t.activeTexture(o.TEXTURE0+z);const Ce=Qe.getPrimaries(Qe.workingColorSpace),me=w.colorSpace===Wn?null:Qe.getPrimaries(w.colorSpace),Se=w.colorSpace===Wn||Ce===me?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,w.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,w.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const nt=w.isCompressedTexture||w.image[0].isCompressedTexture,oe=w.image[0]&&w.image[0].isDataTexture,be=[];for(let ee=0;ee<6;ee++)!nt&&!oe?be[ee]=v(w.image[ee],!0,i.maxCubemapSize):be[ee]=oe?w.image[ee].image:w.image[ee],be[ee]=Fe(w,be[ee]);const ze=be[0],Ve=s.convert(w.format,w.colorSpace),Te=s.convert(w.type),ot=_(w.internalFormat,Ve,Te,w.colorSpace),Je=w.isVideoTexture!==!0,pt=j.__version===void 0||J===!0,D=ne.dataReady;let ge=C(w,ze);ke(o.TEXTURE_CUBE_MAP,w);let q;if(nt){Je&&pt&&t.texStorage2D(o.TEXTURE_CUBE_MAP,ge,ot,ze.width,ze.height);for(let ee=0;ee<6;ee++){q=be[ee].mipmaps;for(let _e=0;_e<q.length;_e++){const ve=q[_e];w.format!==At?Ve!==null?Je?D&&t.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e,0,0,ve.width,ve.height,Ve,ve.data):t.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e,ot,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Je?D&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e,0,0,ve.width,ve.height,Ve,Te,ve.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e,ot,ve.width,ve.height,0,Ve,Te,ve.data)}}}else{if(q=w.mipmaps,Je&&pt){q.length>0&&ge++;const ee=Me(be[0]);t.texStorage2D(o.TEXTURE_CUBE_MAP,ge,ot,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(oe){Je?D&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,be[ee].width,be[ee].height,Ve,Te,be[ee].data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,ot,be[ee].width,be[ee].height,0,Ve,Te,be[ee].data);for(let _e=0;_e<q.length;_e++){const Ze=q[_e].image[ee].image;Je?D&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e+1,0,0,Ze.width,Ze.height,Ve,Te,Ze.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e+1,ot,Ze.width,Ze.height,0,Ve,Te,Ze.data)}}else{Je?D&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ve,Te,be[ee]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,ot,Ve,Te,be[ee]);for(let _e=0;_e<q.length;_e++){const ve=q[_e];Je?D&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e+1,0,0,Ve,Te,ve.image[ee]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e+1,ot,Ve,Te,ve.image[ee])}}}g(w)&&p(o.TEXTURE_CUBE_MAP),j.__version=ne.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function we(P,w,z,J,ne,j){const Ce=s.convert(z.format,z.colorSpace),me=s.convert(z.type),Se=_(z.internalFormat,Ce,me,z.colorSpace),nt=n.get(w),oe=n.get(z);if(oe.__renderTarget=w,!nt.__hasExternalTextures){const be=Math.max(1,w.width>>j),ze=Math.max(1,w.height>>j);ne===o.TEXTURE_3D||ne===o.TEXTURE_2D_ARRAY?t.texImage3D(ne,j,Se,be,ze,w.depth,0,Ce,me,null):t.texImage2D(ne,j,Se,be,ze,0,Ce,me,null)}t.bindFramebuffer(o.FRAMEBUFFER,P),xe(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,J,ne,oe.__webglTexture,0,se(w)):(ne===o.TEXTURE_2D||ne>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,J,ne,oe.__webglTexture,j),t.bindFramebuffer(o.FRAMEBUFFER,null)}function le(P,w,z){if(o.bindRenderbuffer(o.RENDERBUFFER,P),w.depthBuffer){const J=w.depthTexture,ne=J&&J.isDepthTexture?J.type:null,j=y(w.stencilBuffer,ne),Ce=w.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,me=se(w);xe(w)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,me,j,w.width,w.height):z?o.renderbufferStorageMultisample(o.RENDERBUFFER,me,j,w.width,w.height):o.renderbufferStorage(o.RENDERBUFFER,j,w.width,w.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Ce,o.RENDERBUFFER,P)}else{const J=w.textures;for(let ne=0;ne<J.length;ne++){const j=J[ne],Ce=s.convert(j.format,j.colorSpace),me=s.convert(j.type),Se=_(j.internalFormat,Ce,me,j.colorSpace),nt=se(w);z&&xe(w)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,nt,Se,w.width,w.height):xe(w)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,nt,Se,w.width,w.height):o.renderbufferStorage(o.RENDERBUFFER,Se,w.width,w.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Ue(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(o.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(w.depthTexture);J.__renderTarget=w,(!J.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),K(w.depthTexture,0);const ne=J.__webglTexture,j=se(w);if(w.depthTexture.format===Ii)xe(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,ne,0,j):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,ne,0);else if(w.depthTexture.format===Li)xe(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,ne,0,j):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Be(P){const w=n.get(P),z=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const J=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),J){const ne=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,J.removeEventListener("dispose",ne)};J.addEventListener("dispose",ne),w.__depthDisposeCallback=ne}w.__boundDepthTexture=J}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Ue(w.__webglFramebuffer,P)}else if(z){w.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer[J]),w.__webglDepthbuffer[J]===void 0)w.__webglDepthbuffer[J]=o.createRenderbuffer(),le(w.__webglDepthbuffer[J],P,!1);else{const ne=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer[J];o.bindRenderbuffer(o.RENDERBUFFER,j),o.framebufferRenderbuffer(o.FRAMEBUFFER,ne,o.RENDERBUFFER,j)}}else if(t.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=o.createRenderbuffer(),le(w.__webglDepthbuffer,P,!1);else{const J=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ne=w.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,ne),o.framebufferRenderbuffer(o.FRAMEBUFFER,J,o.RENDERBUFFER,ne)}t.bindFramebuffer(o.FRAMEBUFFER,null)}function Oe(P,w,z){const J=n.get(P);w!==void 0&&we(J.__webglFramebuffer,P,P.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),z!==void 0&&Be(P)}function He(P){const w=P.texture,z=n.get(P),J=n.get(w);P.addEventListener("dispose",A);const ne=P.textures,j=P.isWebGLCubeRenderTarget===!0,Ce=ne.length>1;if(Ce||(J.__webglTexture===void 0&&(J.__webglTexture=o.createTexture()),J.__version=w.version,r.memory.textures++),j){z.__webglFramebuffer=[];for(let me=0;me<6;me++)if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer[me]=[];for(let Se=0;Se<w.mipmaps.length;Se++)z.__webglFramebuffer[me][Se]=o.createFramebuffer()}else z.__webglFramebuffer[me]=o.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer=[];for(let me=0;me<w.mipmaps.length;me++)z.__webglFramebuffer[me]=o.createFramebuffer()}else z.__webglFramebuffer=o.createFramebuffer();if(Ce)for(let me=0,Se=ne.length;me<Se;me++){const nt=n.get(ne[me]);nt.__webglTexture===void 0&&(nt.__webglTexture=o.createTexture(),r.memory.textures++)}if(P.samples>0&&xe(P)===!1){z.__webglMultisampledFramebuffer=o.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(o.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let me=0;me<ne.length;me++){const Se=ne[me];z.__webglColorRenderbuffer[me]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,z.__webglColorRenderbuffer[me]);const nt=s.convert(Se.format,Se.colorSpace),oe=s.convert(Se.type),be=_(Se.internalFormat,nt,oe,Se.colorSpace,P.isXRRenderTarget===!0),ze=se(P);o.renderbufferStorageMultisample(o.RENDERBUFFER,ze,be,P.width,P.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+me,o.RENDERBUFFER,z.__webglColorRenderbuffer[me])}o.bindRenderbuffer(o.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=o.createRenderbuffer(),le(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(o.FRAMEBUFFER,null)}}if(j){t.bindTexture(o.TEXTURE_CUBE_MAP,J.__webglTexture),ke(o.TEXTURE_CUBE_MAP,w);for(let me=0;me<6;me++)if(w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)we(z.__webglFramebuffer[me][Se],P,w,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+me,Se);else we(z.__webglFramebuffer[me],P,w,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(w)&&p(o.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let me=0,Se=ne.length;me<Se;me++){const nt=ne[me],oe=n.get(nt);t.bindTexture(o.TEXTURE_2D,oe.__webglTexture),ke(o.TEXTURE_2D,nt),we(z.__webglFramebuffer,P,nt,o.COLOR_ATTACHMENT0+me,o.TEXTURE_2D,0),g(nt)&&p(o.TEXTURE_2D)}t.unbindTexture()}else{let me=o.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(me=P.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),t.bindTexture(me,J.__webglTexture),ke(me,w),w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)we(z.__webglFramebuffer[Se],P,w,o.COLOR_ATTACHMENT0,me,Se);else we(z.__webglFramebuffer,P,w,o.COLOR_ATTACHMENT0,me,0);g(w)&&p(me),t.unbindTexture()}P.depthBuffer&&Be(P)}function Q(P){const w=P.textures;for(let z=0,J=w.length;z<J;z++){const ne=w[z];if(g(ne)){const j=x(P),Ce=n.get(ne).__webglTexture;t.bindTexture(j,Ce),p(j),t.unbindTexture()}}}const re=[],I=[];function Ee(P){if(P.samples>0){if(xe(P)===!1){const w=P.textures,z=P.width,J=P.height;let ne=o.COLOR_BUFFER_BIT;const j=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ce=n.get(P),me=w.length>1;if(me)for(let Se=0;Se<w.length;Se++)t.bindFramebuffer(o.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Se,o.RENDERBUFFER,null),t.bindFramebuffer(o.FRAMEBUFFER,Ce.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Se,o.TEXTURE_2D,null,0);t.bindFramebuffer(o.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Se=0;Se<w.length;Se++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ne|=o.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ne|=o.STENCIL_BUFFER_BIT)),me){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Ce.__webglColorRenderbuffer[Se]);const nt=n.get(w[Se]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,nt,0)}o.blitFramebuffer(0,0,z,J,0,0,z,J,ne,o.NEAREST),l===!0&&(re.length=0,I.length=0,re.push(o.COLOR_ATTACHMENT0+Se),P.depthBuffer&&P.resolveDepthBuffer===!1&&(re.push(j),I.push(j),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,I)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,re))}if(t.bindFramebuffer(o.READ_FRAMEBUFFER,null),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),me)for(let Se=0;Se<w.length;Se++){t.bindFramebuffer(o.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Se,o.RENDERBUFFER,Ce.__webglColorRenderbuffer[Se]);const nt=n.get(w[Se]).__webglTexture;t.bindFramebuffer(o.FRAMEBUFFER,Ce.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Se,o.TEXTURE_2D,nt,0)}t.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[w])}}}function se(P){return Math.min(i.maxSamples,P.samples)}function xe(P){const w=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ce(P){const w=r.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function Fe(P,w){const z=P.colorSpace,J=P.format,ne=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==Ut&&z!==Wn&&(Qe.getTransfer(z)===dt?(J!==At||ne!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),w}function Me(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=B,this.setTexture2D=K,this.setTexture2DArray=H,this.setTexture3D=te,this.setTextureCube=X,this.rebindTextures=Oe,this.setupRenderTarget=He,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=we,this.useMultisampledRTT=xe}function Yd(o,e){function t(n,i=Wn){let s;const r=Qe.getTransfer(i);if(n===mn)return o.UNSIGNED_BYTE;if(n===uo)return o.UNSIGNED_SHORT_4_4_4_4;if(n===fo)return o.UNSIGNED_SHORT_5_5_5_1;if(n===Pl)return o.UNSIGNED_INT_5_9_9_9_REV;if(n===Cl)return o.BYTE;if(n===Rl)return o.SHORT;if(n===vs)return o.UNSIGNED_SHORT;if(n===ho)return o.INT;if(n===Un)return o.UNSIGNED_INT;if(n===jt)return o.FLOAT;if(n===Vn)return o.HALF_FLOAT;if(n===Il)return o.ALPHA;if(n===Ll)return o.RGB;if(n===At)return o.RGBA;if(n===Dl)return o.LUMINANCE;if(n===Ul)return o.LUMINANCE_ALPHA;if(n===Ii)return o.DEPTH_COMPONENT;if(n===Li)return o.DEPTH_STENCIL;if(n===po)return o.RED;if(n===ar)return o.RED_INTEGER;if(n===Nl)return o.RG;if(n===mo)return o.RG_INTEGER;if(n===go)return o.RGBA_INTEGER;if(n===lr||n===cr||n===hr||n===ur)if(r===dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===lr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===lr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===hr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ur)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vo||n===yo||n===xo||n===_o)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===vo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_o)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Mo||n===So||n===wo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Mo||n===So)return r===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===wo)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===bo||n===To||n===Ao||n===Eo||n===Co||n===Ro||n===Po||n===Io||n===Lo||n===Do||n===Uo||n===No||n===Fo||n===Oo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===bo)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===To)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ao)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Eo)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Co)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ro)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Po)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Io)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Lo)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Do)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uo)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===No)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fo)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oo)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===dr||n===Bo||n===zo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===dr)return r===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fl||n===ko||n===Ho||n===Go)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===dr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ko)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ho)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Go)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Pi?o.UNSIGNED_INT_24_8:o[n]!==void 0?o[n]:null}return{convert:t}}class qd extends Ct{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class je extends it{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sx={type:"move"};class bc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Sx)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new je;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const wx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bx=`
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

}`;class Tx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new vt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Dt({vertexShader:wx,fragmentShader:bx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new Tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ax extends Fn{constructor(e,t){super();const n=this;let i=null,s=1,r=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const v=new Tx,g=t.getContextAttributes();let p=null,x=null;const _=[],y=[],C=new Z;let b=null;const A=new Ct;A.viewport=new et;const R=new Ct;R.viewport=new et;const S=[A,R],M=new qd;let L=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ie=_[$];return ie===void 0&&(ie=new bc,_[$]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function($){let ie=_[$];return ie===void 0&&(ie=new bc,_[$]=ie),ie.getGripSpace()},this.getHand=function($){let ie=_[$];return ie===void 0&&(ie=new bc,_[$]=ie),ie.getHandSpace()};function O($){const ie=y.indexOf($.inputSource);if(ie===-1)return;const we=_[ie];we!==void 0&&(we.update($.inputSource,$.frame,c||r),we.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",K);for(let $=0;$<_.length;$++){const ie=y[$];ie!==null&&(y[$]=null,_[$].disconnect(ie))}L=null,B=null,v.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,x=null,st.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",k),i.addEventListener("inputsourceschange",K),g.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),i.renderState.layers===void 0){const ie={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,ie),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Qt(f.framebufferWidth,f.framebufferHeight,{format:At,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ie=null,we=null,le=null;g.depth&&(le=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=g.stencil?Li:Ii,we=g.stencil?Pi:Un);const Ue={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ue),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Qt(d.textureWidth,d.textureHeight,{format:At,type:mn,depthTexture:new pa(d.textureWidth,d.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(a),st.setContext(i),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function K($){for(let ie=0;ie<$.removed.length;ie++){const we=$.removed[ie],le=y.indexOf(we);le>=0&&(y[le]=null,_[le].disconnect(we))}for(let ie=0;ie<$.added.length;ie++){const we=$.added[ie];let le=y.indexOf(we);if(le===-1){for(let Be=0;Be<_.length;Be++)if(Be>=y.length){y.push(we),le=Be;break}else if(y[Be]===null){y[Be]=we,le=Be;break}if(le===-1)break}const Ue=_[le];Ue&&Ue.connect(we)}}const H=new E,te=new E;function X($,ie,we){H.setFromMatrixPosition(ie.matrixWorld),te.setFromMatrixPosition(we.matrixWorld);const le=H.distanceTo(te),Ue=ie.projectionMatrix.elements,Be=we.projectionMatrix.elements,Oe=Ue[14]/(Ue[10]-1),He=Ue[14]/(Ue[10]+1),Q=(Ue[9]+1)/Ue[5],re=(Ue[9]-1)/Ue[5],I=(Ue[8]-1)/Ue[0],Ee=(Be[8]+1)/Be[0],se=Oe*I,xe=Oe*Ee,ce=le/(-I+Ee),Fe=ce*-I;if(ie.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Fe),$.translateZ(ce),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ue[10]===-1)$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Me=Oe+ce,P=He+ce,w=se-Fe,z=xe+(le-Fe),J=Q*He/P*Me,ne=re*He/P*Me;$.projectionMatrix.makePerspective(w,z,J,ne,Me,P),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ue($,ie){ie===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ie.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ie=$.near,we=$.far;v.texture!==null&&(v.depthNear>0&&(ie=v.depthNear),v.depthFar>0&&(we=v.depthFar)),M.near=R.near=A.near=ie,M.far=R.far=A.far=we,(L!==M.near||B!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,B=M.far),A.layers.mask=$.layers.mask|2,R.layers.mask=$.layers.mask|4,M.layers.mask=A.layers.mask|R.layers.mask;const le=$.parent,Ue=M.cameras;ue(M,le);for(let Be=0;Be<Ue.length;Be++)ue(Ue[Be],le);Ue.length===2?X(M,A,R):M.projectionMatrix.copy(A.projectionMatrix),fe($,M,le)};function fe($,ie,we){we===null?$.matrix.copy(ie.matrixWorld):($.matrix.copy(we.matrixWorld),$.matrix.invert(),$.matrix.multiply(ie.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=_s*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let pe=null;function ke($,ie){if(h=ie.getViewerPose(c||r),m=ie,h!==null){const we=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let le=!1;we.length!==M.cameras.length&&(M.cameras.length=0,le=!0);for(let Be=0;Be<we.length;Be++){const Oe=we[Be];let He=null;if(f!==null)He=f.getViewport(Oe);else{const re=u.getViewSubImage(d,Oe);He=re.viewport,Be===0&&(e.setRenderTargetTextures(x,re.colorTexture,d.ignoreDepthValues?void 0:re.depthStencilTexture),e.setRenderTarget(x))}let Q=S[Be];Q===void 0&&(Q=new Ct,Q.layers.enable(Be),Q.viewport=new et,S[Be]=Q),Q.matrix.fromArray(Oe.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Oe.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(He.x,He.y,He.width,He.height),Be===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),le===!0&&M.cameras.push(Q)}const Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")){const Be=u.getDepthInformation(we[0]);Be&&Be.isValid&&Be.texture&&v.init(e,Be,i.renderState)}}for(let we=0;we<_.length;we++){const le=y[we],Ue=_[we];le!==null&&Ue!==void 0&&Ue.update(le,ie,c||r)}pe&&pe($,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),m=null}const st=new yd;st.setAnimationLoop(ke),this.setAnimationLoop=function($){pe=$},this.dispose=function(){}}}const Xi=new an,Ex=new Ne;function Cx(o,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,dd(o)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,x,_,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),v(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(r(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,x,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ft&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ft&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const x=e.get(p),_=x.envMap,y=x.envMapRotation;_&&(g.envMap.value=_,Xi.copy(y),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),g.envMapRotation.value.setFromMatrix4(Ex.makeRotationFromEuler(Xi)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function r(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,x,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*x,g.scale.value=_*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,x){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ft&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const x=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Rx(o,e,t,n){let i={},s={},r=[];const a=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,_){const y=_.program;n.uniformBlockBinding(x,y)}function c(x,_){let y=i[x.id];y===void 0&&(m(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",g));const C=_.program;n.updateUBOMapping(x,C);const b=e.render.frame;s[x.id]!==b&&(d(x),s[x.id]=b)}function h(x){const _=u();x.__bindingPointIndex=_;const y=o.createBuffer(),C=x.__size,b=x.usage;return o.bindBuffer(o.UNIFORM_BUFFER,y),o.bufferData(o.UNIFORM_BUFFER,C,b),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,_,y),y}function u(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const _=i[x.id],y=x.uniforms,C=x.__cache;o.bindBuffer(o.UNIFORM_BUFFER,_);for(let b=0,A=y.length;b<A;b++){const R=Array.isArray(y[b])?y[b]:[y[b]];for(let S=0,M=R.length;S<M;S++){const L=R[S];if(f(L,b,S,C)===!0){const B=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let k=0;for(let K=0;K<O.length;K++){const H=O[K],te=v(H);typeof H=="number"||typeof H=="boolean"?(L.__data[0]=H,o.bufferSubData(o.UNIFORM_BUFFER,B+k,L.__data)):H.isMatrix3?(L.__data[0]=H.elements[0],L.__data[1]=H.elements[1],L.__data[2]=H.elements[2],L.__data[3]=0,L.__data[4]=H.elements[3],L.__data[5]=H.elements[4],L.__data[6]=H.elements[5],L.__data[7]=0,L.__data[8]=H.elements[6],L.__data[9]=H.elements[7],L.__data[10]=H.elements[8],L.__data[11]=0):(H.toArray(L.__data,k),k+=te.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,B,L.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function f(x,_,y,C){const b=x.value,A=_+"_"+y;if(C[A]===void 0)return typeof b=="number"||typeof b=="boolean"?C[A]=b:C[A]=b.clone(),!0;{const R=C[A];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return C[A]=b,!0}else if(R.equals(b)===!1)return R.copy(b),!0}return!1}function m(x){const _=x.uniforms;let y=0;const C=16;for(let A=0,R=_.length;A<R;A++){const S=Array.isArray(_[A])?_[A]:[_[A]];for(let M=0,L=S.length;M<L;M++){const B=S[M],O=Array.isArray(B.value)?B.value:[B.value];for(let k=0,K=O.length;k<K;k++){const H=O[k],te=v(H),X=y%C,ue=X%te.boundary,fe=X+ue;y+=ue,fe!==0&&C-fe<te.storage&&(y+=C-fe),B.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=te.storage}}}const b=y%C;return b>0&&(y+=C-b),x.__size=y,x.__cache={},this}function v(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function g(x){const _=x.target;_.removeEventListener("dispose",g);const y=r.indexOf(_.__bindingPointIndex);r.splice(y,1),o.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function p(){for(const x in i)o.deleteBuffer(i[x]);r=[],i={},s={}}return{bind:l,update:c,dispose:p}}class Zd{constructor(e={}){const{canvas:t=Wu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const x=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_t,this.toneMapping=Hn,this.toneMappingExposure=1;const y=this;let C=!1,b=0,A=0,R=null,S=-1,M=null;const L=new et,B=new et;let O=null;const k=new G(0);let K=0,H=t.width,te=t.height,X=1,ue=null,fe=null;const pe=new et(0,0,H,te),ke=new et(0,0,H,te);let st=!1;const $=new Ar;let ie=!1,we=!1;const le=new Ne,Ue=new Ne,Be=new E,Oe=new et,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function re(){return R===null?X:1}let I=n;function Ee(T,U){return t.getContext(T,U)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${fn}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",ve,!1),I===null){const U="webgl2";if(I=Ee(U,T),I===null)throw Ee(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let se,xe,ce,Fe,Me,P,w,z,J,ne,j,Ce,me,Se,nt,oe,be,ze,Ve,Te,ot,Je,pt,D;function ge(){se=new Nv(I),se.init(),Je=new Yd(I,se),xe=new Rv(I,se,e,Je),ce=new mx(I,se),xe.reverseDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),Fe=new Bv(I),Me=new nx,P=new Mx(I,se,ce,Me,xe,Je,Fe),w=new Iv(y),z=new Uv(y),J=new Tg(I),pt=new Ev(I,J),ne=new Fv(I,J,Fe,pt),j=new kv(I,ne,J,Fe),Ve=new zv(I,xe,P),oe=new Pv(Me),Ce=new tx(y,w,z,se,xe,pt,oe),me=new Cx(y,Me),Se=new sx,nt=new hx(se),ze=new Av(y,w,z,ce,j,f,l),be=new fx(y,j,xe),D=new Rx(I,Fe,xe,ce),Te=new Cv(I,se,Fe),ot=new Ov(I,se,Fe),Fe.programs=Ce.programs,y.capabilities=xe,y.extensions=se,y.properties=Me,y.renderLists=Se,y.shadowMap=be,y.state=ce,y.info=Fe}ge();const q=new Ax(y,I);this.xr=q,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=se.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=se.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(H,te,!1))},this.getSize=function(T){return T.set(H,te)},this.setSize=function(T,U,V=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,te=U,t.width=Math.floor(T*X),t.height=Math.floor(U*X),V===!0&&(t.style.width=T+"px",t.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(H*X,te*X).floor()},this.setDrawingBufferSize=function(T,U,V){H=T,te=U,X=V,t.width=Math.floor(T*V),t.height=Math.floor(U*V),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(pe)},this.setViewport=function(T,U,V,W){T.isVector4?pe.set(T.x,T.y,T.z,T.w):pe.set(T,U,V,W),ce.viewport(L.copy(pe).multiplyScalar(X).round())},this.getScissor=function(T){return T.copy(ke)},this.setScissor=function(T,U,V,W){T.isVector4?ke.set(T.x,T.y,T.z,T.w):ke.set(T,U,V,W),ce.scissor(B.copy(ke).multiplyScalar(X).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(T){ce.setScissorTest(st=T)},this.setOpaqueSort=function(T){ue=T},this.setTransparentSort=function(T){fe=T},this.getClearColor=function(T){return T.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(T=!0,U=!0,V=!0){let W=0;if(T){let N=!1;if(R!==null){const ae=R.texture.format;N=ae===go||ae===mo||ae===ar}if(N){const ae=R.texture.type,ye=ae===mn||ae===Un||ae===vs||ae===Pi||ae===uo||ae===fo,Re=ze.getClearColor(),Pe=ze.getClearAlpha(),We=Re.r,Ke=Re.g,Ie=Re.b;ye?(m[0]=We,m[1]=Ke,m[2]=Ie,m[3]=Pe,I.clearBufferuiv(I.COLOR,0,m)):(v[0]=We,v[1]=Ke,v[2]=Ie,v[3]=Pe,I.clearBufferiv(I.COLOR,0,v))}else W|=I.COLOR_BUFFER_BIT}U&&(W|=I.DEPTH_BUFFER_BIT),V&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),Se.dispose(),nt.dispose(),Me.dispose(),w.dispose(),z.dispose(),j.dispose(),pt.dispose(),D.dispose(),Ce.dispose(),q.dispose(),q.removeEventListener("sessionstart",Xp),q.removeEventListener("sessionend",Yp),ds.stop()};function ee(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function _e(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=Fe.autoReset,U=be.enabled,V=be.autoUpdate,W=be.needsUpdate,N=be.type;ge(),Fe.autoReset=T,be.enabled=U,be.autoUpdate=V,be.needsUpdate=W,be.type=N}function ve(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ze(T){const U=T.target;U.removeEventListener("dispose",Ze),bt(U)}function bt(T){Yt(T),Me.remove(T)}function Yt(T){const U=Me.get(T).programs;U!==void 0&&(U.forEach(function(V){Ce.releaseProgram(V)}),T.isShaderMaterial&&Ce.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,V,W,N,ae){U===null&&(U=He);const ye=N.isMesh&&N.matrixWorld.determinant()<0,Re=RS(T,U,V,W,N);ce.setMaterial(W,ye);let Pe=V.index,We=1;if(W.wireframe===!0){if(Pe=ne.getWireframeAttribute(V),Pe===void 0)return;We=2}const Ke=V.drawRange,Ie=V.attributes.position;let at=Ke.start*We,mt=(Ke.start+Ke.count)*We;ae!==null&&(at=Math.max(at,ae.start*We),mt=Math.min(mt,(ae.start+ae.count)*We)),Pe!==null?(at=Math.max(at,0),mt=Math.min(mt,Pe.count)):Ie!=null&&(at=Math.max(at,0),mt=Math.min(mt,Ie.count));const yt=mt-at;if(yt<0||yt===1/0)return;pt.setup(N,W,Re,V,Pe);let sn,ht=Te;if(Pe!==null&&(sn=J.get(Pe),ht=ot,ht.setIndex(sn)),N.isMesh)W.wireframe===!0?(ce.setLineWidth(W.wireframeLinewidth*re()),ht.setMode(I.LINES)):ht.setMode(I.TRIANGLES);else if(N.isLine){let Le=W.linewidth;Le===void 0&&(Le=1),ce.setLineWidth(Le*re()),N.isLineSegments?ht.setMode(I.LINES):N.isLineLoop?ht.setMode(I.LINE_LOOP):ht.setMode(I.LINE_STRIP)}else N.isPoints?ht.setMode(I.POINTS):N.isSprite&&ht.setMode(I.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ht.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(se.get("WEBGL_multi_draw"))ht.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Le=N._multiDrawStarts,oi=N._multiDrawCounts,ut=N._multiDrawCount,In=Pe?J.get(Pe).bytesPerElement:1,ir=Me.get(W).currentProgram.getUniforms();for(let dn=0;dn<ut;dn++)ir.setValue(I,"_gl_DrawID",dn),ht.render(Le[dn]/In,oi[dn])}else if(N.isInstancedMesh)ht.renderInstances(at,yt,N.count);else if(V.isInstancedBufferGeometry){const Le=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,oi=Math.min(V.instanceCount,Le);ht.renderInstances(at,yt,oi)}else ht.render(at,yt)};function ft(T,U,V){T.transparent===!0&&T.side===Mn&&T.forceSinglePass===!1?(T.side=Ft,T.needsUpdate=!0,_l(T,U,V),T.side=Dn,T.needsUpdate=!0,_l(T,U,V),T.side=Mn):_l(T,U,V)}this.compile=function(T,U,V=null){V===null&&(V=T),p=nt.get(V),p.init(U),_.push(p),V.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),T!==V&&T.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const W=new Set;return T.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ae=N.material;if(ae)if(Array.isArray(ae))for(let ye=0;ye<ae.length;ye++){const Re=ae[ye];ft(Re,V,N),W.add(Re)}else ft(ae,V,N),W.add(ae)}),_.pop(),p=null,W},this.compileAsync=function(T,U,V=null){const W=this.compile(T,U,V);return new Promise(N=>{function ae(){if(W.forEach(function(ye){Me.get(ye).currentProgram.isReady()&&W.delete(ye)}),W.size===0){N(T);return}setTimeout(ae,10)}se.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Pn=null;function ri(T){Pn&&Pn(T)}function Xp(){ds.stop()}function Yp(){ds.start()}const ds=new yd;ds.setAnimationLoop(ri),typeof self<"u"&&ds.setContext(self),this.setAnimationLoop=function(T){Pn=T,q.setAnimationLoop(T),T===null?ds.stop():ds.start()},q.addEventListener("sessionstart",Xp),q.addEventListener("sessionend",Yp),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(U),U=q.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,U,R),p=nt.get(T,_.length),p.init(U),_.push(p),Ue.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(Ue),we=this.localClippingEnabled,ie=oe.init(this.clippingPlanes,we),g=Se.get(T,x.length),g.init(),x.push(g),q.enabled===!0&&q.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&$h(ae,U,-1/0,y.sortObjects)}$h(T,U,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ue,fe),Q=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Q&&ze.addToRenderList(g,T),this.info.render.frame++,ie===!0&&oe.beginShadows();const V=p.state.shadowsArray;be.render(V,T,U),ie===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,N=g.transmissive;if(p.setupLights(),U.isArrayCamera){const ae=U.cameras;if(N.length>0)for(let ye=0,Re=ae.length;ye<Re;ye++){const Pe=ae[ye];Zp(W,N,T,Pe)}Q&&ze.render(T);for(let ye=0,Re=ae.length;ye<Re;ye++){const Pe=ae[ye];qp(g,T,Pe,Pe.viewport)}}else N.length>0&&Zp(W,N,T,U),Q&&ze.render(T),qp(g,T,U);R!==null&&(P.updateMultisampleRenderTarget(R),P.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(y,T,U),pt.resetDefaultState(),S=-1,M=null,_.pop(),_.length>0?(p=_[_.length-1],ie===!0&&oe.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function $h(T,U,V,W){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)V=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||$.intersectsSprite(T)){W&&Oe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ue);const ye=j.update(T),Re=T.material;Re.visible&&g.push(T,ye,Re,V,Oe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||$.intersectsObject(T))){const ye=j.update(T),Re=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Oe.copy(T.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Oe.copy(ye.boundingSphere.center)),Oe.applyMatrix4(T.matrixWorld).applyMatrix4(Ue)),Array.isArray(Re)){const Pe=ye.groups;for(let We=0,Ke=Pe.length;We<Ke;We++){const Ie=Pe[We],at=Re[Ie.materialIndex];at&&at.visible&&g.push(T,ye,at,V,Oe.z,Ie)}}else Re.visible&&g.push(T,ye,Re,V,Oe.z,null)}}const ae=T.children;for(let ye=0,Re=ae.length;ye<Re;ye++)$h(ae[ye],U,V,W)}function qp(T,U,V,W){const N=T.opaque,ae=T.transmissive,ye=T.transparent;p.setupLightsView(V),ie===!0&&oe.setGlobalState(y.clippingPlanes,V),W&&ce.viewport(L.copy(W)),N.length>0&&xl(N,U,V),ae.length>0&&xl(ae,U,V),ye.length>0&&xl(ye,U,V),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function Zp(T,U,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Qt(1,1,{generateMipmaps:!0,type:se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float")?Vn:mn,minFilter:pn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ae=p.state.transmissionRenderTarget[W.id],ye=W.viewport||L;ae.setSize(ye.z,ye.w);const Re=y.getRenderTarget();y.setRenderTarget(ae),y.getClearColor(k),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),Q&&ze.render(V);const Pe=y.toneMapping;y.toneMapping=Hn;const We=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),ie===!0&&oe.setGlobalState(y.clippingPlanes,W),xl(T,V,W),P.updateMultisampleRenderTarget(ae),P.updateRenderTargetMipmap(ae),se.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let Ie=0,at=U.length;Ie<at;Ie++){const mt=U[Ie],yt=mt.object,sn=mt.geometry,ht=mt.material,Le=mt.group;if(ht.side===Mn&&yt.layers.test(W.layers)){const oi=ht.side;ht.side=Ft,ht.needsUpdate=!0,Kp(yt,V,W,sn,ht,Le),ht.side=oi,ht.needsUpdate=!0,Ke=!0}}Ke===!0&&(P.updateMultisampleRenderTarget(ae),P.updateRenderTargetMipmap(ae))}y.setRenderTarget(Re),y.setClearColor(k,K),We!==void 0&&(W.viewport=We),y.toneMapping=Pe}function xl(T,U,V){const W=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ae=T.length;N<ae;N++){const ye=T[N],Re=ye.object,Pe=ye.geometry,We=W===null?ye.material:W,Ke=ye.group;Re.layers.test(V.layers)&&Kp(Re,U,V,Pe,We,Ke)}}function Kp(T,U,V,W,N,ae){T.onBeforeRender(y,U,V,W,N,ae),T.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),N.onBeforeRender(y,U,V,W,T,ae),N.transparent===!0&&N.side===Mn&&N.forceSinglePass===!1?(N.side=Ft,N.needsUpdate=!0,y.renderBufferDirect(V,U,W,N,T,ae),N.side=Dn,N.needsUpdate=!0,y.renderBufferDirect(V,U,W,N,T,ae),N.side=Mn):y.renderBufferDirect(V,U,W,N,T,ae),T.onAfterRender(y,U,V,W,N,ae)}function _l(T,U,V){U.isScene!==!0&&(U=He);const W=Me.get(T),N=p.state.lights,ae=p.state.shadowsArray,ye=N.state.version,Re=Ce.getParameters(T,N.state,ae,U,V),Pe=Ce.getProgramCacheKey(Re);let We=W.programs;W.environment=T.isMeshStandardMaterial?U.environment:null,W.fog=U.fog,W.envMap=(T.isMeshStandardMaterial?z:w).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,We===void 0&&(T.addEventListener("dispose",Ze),We=new Map,W.programs=We);let Ke=We.get(Pe);if(Ke!==void 0){if(W.currentProgram===Ke&&W.lightsStateVersion===ye)return Jp(T,Re),Ke}else Re.uniforms=Ce.getUniforms(T),T.onBeforeCompile(Re,y),Ke=Ce.acquireProgram(Re,Pe),We.set(Pe,Ke),W.uniforms=Re.uniforms;const Ie=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ie.clippingPlanes=oe.uniform),Jp(T,Re),W.needsLights=IS(T),W.lightsStateVersion=ye,W.needsLights&&(Ie.ambientLightColor.value=N.state.ambient,Ie.lightProbe.value=N.state.probe,Ie.directionalLights.value=N.state.directional,Ie.directionalLightShadows.value=N.state.directionalShadow,Ie.spotLights.value=N.state.spot,Ie.spotLightShadows.value=N.state.spotShadow,Ie.rectAreaLights.value=N.state.rectArea,Ie.ltc_1.value=N.state.rectAreaLTC1,Ie.ltc_2.value=N.state.rectAreaLTC2,Ie.pointLights.value=N.state.point,Ie.pointLightShadows.value=N.state.pointShadow,Ie.hemisphereLights.value=N.state.hemi,Ie.directionalShadowMap.value=N.state.directionalShadowMap,Ie.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ie.spotShadowMap.value=N.state.spotShadowMap,Ie.spotLightMatrix.value=N.state.spotLightMatrix,Ie.spotLightMap.value=N.state.spotLightMap,Ie.pointShadowMap.value=N.state.pointShadowMap,Ie.pointShadowMatrix.value=N.state.pointShadowMatrix),W.currentProgram=Ke,W.uniformsList=null,Ke}function $p(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=ga.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function Jp(T,U){const V=Me.get(T);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function RS(T,U,V,W,N){U.isScene!==!0&&(U=He),P.resetTextureUnits();const ae=U.fog,ye=W.isMeshStandardMaterial?U.environment:null,Re=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ut,Pe=(W.isMeshStandardMaterial?z:w).get(W.envMap||ye),We=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ke=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ie=!!V.morphAttributes.position,at=!!V.morphAttributes.normal,mt=!!V.morphAttributes.color;let yt=Hn;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(yt=y.toneMapping);const sn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ht=sn!==void 0?sn.length:0,Le=Me.get(W),oi=p.state.lights;if(ie===!0&&(we===!0||T!==M)){const _n=T===M&&W.id===S;oe.setState(W,T,_n)}let ut=!1;W.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==oi.state.version||Le.outputColorSpace!==Re||N.isBatchedMesh&&Le.batching===!1||!N.isBatchedMesh&&Le.batching===!0||N.isBatchedMesh&&Le.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Le.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Le.instancing===!1||!N.isInstancedMesh&&Le.instancing===!0||N.isSkinnedMesh&&Le.skinning===!1||!N.isSkinnedMesh&&Le.skinning===!0||N.isInstancedMesh&&Le.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Le.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Le.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Le.instancingMorph===!1&&N.morphTexture!==null||Le.envMap!==Pe||W.fog===!0&&Le.fog!==ae||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==oe.numPlanes||Le.numIntersection!==oe.numIntersection)||Le.vertexAlphas!==We||Le.vertexTangents!==Ke||Le.morphTargets!==Ie||Le.morphNormals!==at||Le.morphColors!==mt||Le.toneMapping!==yt||Le.morphTargetsCount!==ht)&&(ut=!0):(ut=!0,Le.__version=W.version);let In=Le.currentProgram;ut===!0&&(In=_l(W,U,N));let ir=!1,dn=!1,Jr=!1;const xt=In.getUniforms(),zn=Le.uniforms;if(ce.useProgram(In.program)&&(ir=!0,dn=!0,Jr=!0),W.id!==S&&(S=W.id,dn=!0),ir||M!==T){ce.buffers.depth.getReversed()?(le.copy(T.projectionMatrix),$m(le),Jm(le),xt.setValue(I,"projectionMatrix",le)):xt.setValue(I,"projectionMatrix",T.projectionMatrix),xt.setValue(I,"viewMatrix",T.matrixWorldInverse);const Ai=xt.map.cameraPosition;Ai!==void 0&&Ai.setValue(I,Be.setFromMatrixPosition(T.matrixWorld)),xe.logarithmicDepthBuffer&&xt.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&xt.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,dn=!0,Jr=!0)}if(N.isSkinnedMesh){xt.setOptional(I,N,"bindMatrix"),xt.setOptional(I,N,"bindMatrixInverse");const _n=N.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),xt.setValue(I,"boneTexture",_n.boneTexture,P))}N.isBatchedMesh&&(xt.setOptional(I,N,"batchingTexture"),xt.setValue(I,"batchingTexture",N._matricesTexture,P),xt.setOptional(I,N,"batchingIdTexture"),xt.setValue(I,"batchingIdTexture",N._indirectTexture,P),xt.setOptional(I,N,"batchingColorTexture"),N._colorsTexture!==null&&xt.setValue(I,"batchingColorTexture",N._colorsTexture,P));const jr=V.morphAttributes;if((jr.position!==void 0||jr.normal!==void 0||jr.color!==void 0)&&Ve.update(N,V,In),(dn||Le.receiveShadow!==N.receiveShadow)&&(Le.receiveShadow=N.receiveShadow,xt.setValue(I,"receiveShadow",N.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(zn.envMap.value=Pe,zn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&U.environment!==null&&(zn.envMapIntensity.value=U.environmentIntensity),dn&&(xt.setValue(I,"toneMappingExposure",y.toneMappingExposure),Le.needsLights&&PS(zn,Jr),ae&&W.fog===!0&&me.refreshFogUniforms(zn,ae),me.refreshMaterialUniforms(zn,W,X,te,p.state.transmissionRenderTarget[T.id]),ga.upload(I,$p(Le),zn,P)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ga.upload(I,$p(Le),zn,P),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&xt.setValue(I,"center",N.center),xt.setValue(I,"modelViewMatrix",N.modelViewMatrix),xt.setValue(I,"normalMatrix",N.normalMatrix),xt.setValue(I,"modelMatrix",N.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const _n=W.uniformsGroups;for(let Ai=0,Ei=_n.length;Ai<Ei;Ai++){const jp=_n[Ai];D.update(jp,In),D.bind(jp,In)}}return In}function PS(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function IS(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,U,V){Me.get(T.texture).__webglTexture=U,Me.get(T.depthTexture).__webglTexture=V;const W=Me.get(T);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,U){const V=Me.get(T);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,V=0){R=T,b=U,A=V;let W=!0,N=null,ae=!1,ye=!1;if(T){const Pe=Me.get(T);if(Pe.__useDefaultFramebuffer!==void 0)ce.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(Pe.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(Pe.__hasExternalTextures)P.rebindTextures(T,Me.get(T.texture).__webglTexture,Me.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ie=T.depthTexture;if(Pe.__boundDepthTexture!==Ie){if(Ie!==null&&Me.has(Ie)&&(T.width!==Ie.image.width||T.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}const We=T.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(ye=!0);const Ke=Me.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ke[U])?N=Ke[U][V]:N=Ke[U],ae=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?N=Me.get(T).__webglMultisampledFramebuffer:Array.isArray(Ke)?N=Ke[V]:N=Ke,L.copy(T.viewport),B.copy(T.scissor),O=T.scissorTest}else L.copy(pe).multiplyScalar(X).floor(),B.copy(ke).multiplyScalar(X).floor(),O=st;if(ce.bindFramebuffer(I.FRAMEBUFFER,N)&&W&&ce.drawBuffers(T,N),ce.viewport(L),ce.scissor(B),ce.setScissorTest(O),ae){const Pe=Me.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,Pe.__webglTexture,V)}else if(ye){const Pe=Me.get(T.texture),We=U||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Pe.__webglTexture,V||0,We)}S=-1},this.readRenderTargetPixels=function(T,U,V,W,N,ae,ye){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Re=Re[ye]),Re){ce.bindFramebuffer(I.FRAMEBUFFER,Re);try{const Pe=T.texture,We=Pe.format,Ke=Pe.type;if(!xe.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xe.textureTypeReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-W&&V>=0&&V<=T.height-N&&I.readPixels(U,V,W,N,Je.convert(We),Je.convert(Ke),ae)}finally{const Pe=R!==null?Me.get(R).__webglFramebuffer:null;ce.bindFramebuffer(I.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(T,U,V,W,N,ae,ye){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Re=Re[ye]),Re){const Pe=T.texture,We=Pe.format,Ke=Pe.type;if(!xe.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xe.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=T.width-W&&V>=0&&V<=T.height-N){ce.bindFramebuffer(I.FRAMEBUFFER,Re);const Ie=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ie),I.bufferData(I.PIXEL_PACK_BUFFER,ae.byteLength,I.STREAM_READ),I.readPixels(U,V,W,N,Je.convert(We),Je.convert(Ke),0);const at=R!==null?Me.get(R).__webglFramebuffer:null;ce.bindFramebuffer(I.FRAMEBUFFER,at);const mt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Km(I,mt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ie),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ae),I.deleteBuffer(Ie),I.deleteSync(mt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,U=null,V=0){T.isTexture!==!0&&(xr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,T=arguments[1]);const W=Math.pow(2,-V),N=Math.floor(T.image.width*W),ae=Math.floor(T.image.height*W),ye=U!==null?U.x:0,Re=U!==null?U.y:0;P.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,ye,Re,N,ae),ce.unbindTexture()},this.copyTextureToTexture=function(T,U,V=null,W=null,N=0){T.isTexture!==!0&&(xr("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1],U=arguments[2],N=arguments[3]||0,V=null);let ae,ye,Re,Pe,We,Ke,Ie,at,mt;const yt=T.isCompressedTexture?T.mipmaps[N]:T.image;V!==null?(ae=V.max.x-V.min.x,ye=V.max.y-V.min.y,Re=V.isBox3?V.max.z-V.min.z:1,Pe=V.min.x,We=V.min.y,Ke=V.isBox3?V.min.z:0):(ae=yt.width,ye=yt.height,Re=yt.depth||1,Pe=0,We=0,Ke=0),W!==null?(Ie=W.x,at=W.y,mt=W.z):(Ie=0,at=0,mt=0);const sn=Je.convert(U.format),ht=Je.convert(U.type);let Le;U.isData3DTexture?(P.setTexture3D(U,0),Le=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(P.setTexture2DArray(U,0),Le=I.TEXTURE_2D_ARRAY):(P.setTexture2D(U,0),Le=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const oi=I.getParameter(I.UNPACK_ROW_LENGTH),ut=I.getParameter(I.UNPACK_IMAGE_HEIGHT),In=I.getParameter(I.UNPACK_SKIP_PIXELS),ir=I.getParameter(I.UNPACK_SKIP_ROWS),dn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,yt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Pe),I.pixelStorei(I.UNPACK_SKIP_ROWS,We),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ke);const Jr=T.isDataArrayTexture||T.isData3DTexture,xt=U.isDataArrayTexture||U.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const zn=Me.get(T),jr=Me.get(U),_n=Me.get(zn.__renderTarget),Ai=Me.get(jr.__renderTarget);ce.bindFramebuffer(I.READ_FRAMEBUFFER,_n.__webglFramebuffer),ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ai.__webglFramebuffer);for(let Ei=0;Ei<Re;Ei++)Jr&&I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Me.get(T).__webglTexture,N,Ke+Ei),T.isDepthTexture?(xt&&I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Me.get(U).__webglTexture,N,mt+Ei),I.blitFramebuffer(Pe,We,ae,ye,Ie,at,ae,ye,I.DEPTH_BUFFER_BIT,I.NEAREST)):xt?I.copyTexSubImage3D(Le,N,Ie,at,mt+Ei,Pe,We,ae,ye):I.copyTexSubImage2D(Le,N,Ie,at,mt+Ei,Pe,We,ae,ye);ce.bindFramebuffer(I.READ_FRAMEBUFFER,null),ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else xt?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(Le,N,Ie,at,mt,ae,ye,Re,sn,ht,yt.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(Le,N,Ie,at,mt,ae,ye,Re,sn,yt.data):I.texSubImage3D(Le,N,Ie,at,mt,ae,ye,Re,sn,ht,yt):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,N,Ie,at,ae,ye,sn,ht,yt.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,N,Ie,at,yt.width,yt.height,sn,yt.data):I.texSubImage2D(I.TEXTURE_2D,N,Ie,at,ae,ye,sn,ht,yt);I.pixelStorei(I.UNPACK_ROW_LENGTH,oi),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ut),I.pixelStorei(I.UNPACK_SKIP_PIXELS,In),I.pixelStorei(I.UNPACK_SKIP_ROWS,ir),I.pixelStorei(I.UNPACK_SKIP_IMAGES,dn),N===0&&U.generateMipmaps&&I.generateMipmap(Le),ce.unbindTexture()},this.copyTextureToTexture3D=function(T,U,V=null,W=null,N=0){return T.isTexture!==!0&&(xr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,T=arguments[2],U=arguments[3],N=arguments[4]||0),xr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,U,V,W,N)},this.initRenderTarget=function(T){Me.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),ce.unbindTexture()},this.resetState=function(){b=0,A=0,R=null,ce.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}class Yi{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new G(e),this.density=t}clone(){return new Yi(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ya{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new G(e),this.near=t,this.far=n}clone(){return new ya(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hs extends it{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Cr{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=mr,this.updateRanges=[],this.version=0,this.uuid=rn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $t=new E;class yi{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Zt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ye(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Zt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Zt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Zt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Zt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),i=Ye(i,this.array),s=Ye(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new $e(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new yi(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Tc extends Rt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Gs;const Rr=new E,Vs=new E,Ws=new E,Xs=new Z,Pr=new Z,Kd=new Ne,xa=new E,Ir=new E,_a=new E,$d=new Z,Ac=new Z,Jd=new Z;class jd extends it{constructor(e=new Tc){if(super(),this.isSprite=!0,this.type="Sprite",Gs===void 0){Gs=new Ge;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Cr(t,5);Gs.setIndex([0,1,2,0,2,3]),Gs.setAttribute("position",new yi(n,3,0,!1)),Gs.setAttribute("uv",new yi(n,2,3,!1))}this.geometry=Gs,this.material=e,this.center=new Z(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vs.setFromMatrixScale(this.matrixWorld),Kd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ws.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vs.multiplyScalar(-Ws.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const r=this.center;Ma(xa.set(-.5,-.5,0),Ws,r,Vs,i,s),Ma(Ir.set(.5,-.5,0),Ws,r,Vs,i,s),Ma(_a.set(.5,.5,0),Ws,r,Vs,i,s),$d.set(0,0),Ac.set(1,0),Jd.set(1,1);let a=e.ray.intersectTriangle(xa,Ir,_a,!1,Rr);if(a===null&&(Ma(Ir.set(-.5,.5,0),Ws,r,Vs,i,s),Ac.set(0,1),a=e.ray.intersectTriangle(xa,_a,Ir,!1,Rr),a===null))return;const l=e.ray.origin.distanceTo(Rr);l<e.near||l>e.far||t.push({distance:l,point:Rr.clone(),uv:en.getInterpolation(Rr,xa,Ir,_a,$d,Ac,Jd,new Z),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ma(o,e,t,n,i,s){Xs.subVectors(o,t).addScalar(.5).multiply(n),i!==void 0?(Pr.x=s*Xs.x-i*Xs.y,Pr.y=i*Xs.x+s*Xs.y):Pr.copy(Xs),o.copy(e),o.x+=Pr.x,o.y+=Pr.y,o.applyMatrix4(Kd)}const Sa=new E,Qd=new E;class ef extends it{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Sa.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Sa);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Sa.setFromMatrixPosition(e.matrixWorld),Qd.setFromMatrixPosition(this.matrixWorld);const n=Sa.distanceTo(Qd)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let r=t[i].distance;if(t[i].object.visible&&(r-=r*t[i].hysteresis),n>=r)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const r=n[i];t.object.levels.push({object:r.object.uuid,distance:r.distance,hysteresis:r.hysteresis})}return t}}const tf=new E,nf=new et,sf=new et,Px=new E,rf=new Ne,wa=new E,Ec=new Nt,of=new Ne,Cc=new Es;class Rc extends Y{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=El,this.bindMatrix=new Ne,this.bindMatrixInverse=new Ne,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,wa),this.boundingBox.expandByPoint(wa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Nt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,wa),this.boundingSphere.expandByPoint(wa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ec.copy(this.boundingSphere),Ec.applyMatrix4(i),e.ray.intersectsSphere(Ec)!==!1&&(of.copy(i).invert(),Cc.copy(e.ray).applyMatrix4(of),!(this.boundingBox!==null&&Cc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===El?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Au?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;nf.fromBufferAttribute(i.attributes.skinIndex,e),sf.fromBufferAttribute(i.attributes.skinWeight,e),tf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const r=sf.getComponent(s);if(r!==0){const a=nf.getComponent(s);rf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Px.copy(tf).applyMatrix4(rf),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class ba extends it{constructor(){super(),this.isBone=!0,this.type="Bone"}}class vn extends vt{constructor(e=null,t=1,n=1,i,s,r,a,l,c=gt,h=gt,u,d){super(null,r,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const af=new Ne,Ix=new Ne;class Lr{constructor(e=[],t=[]){this.uuid=rn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ne)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ne;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){const a=e[s]?e[s].matrixWorld:Ix;af.multiplyMatrices(a,t[s]),af.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Lr(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new vn(t,e,e,At,jt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let r=t[s];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new ba),this.bones.push(r),this.boneInverses.push(new Ne().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const r=t[i];e.bones.push(r.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class qi extends $e{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ys=new Ne,lf=new Ne,Ta=[],cf=new zt,Lx=new Ne,Dr=new Y,Ur=new Nt;class Pc extends Y{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new qi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Lx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ys),cf.copy(e.boundingBox).applyMatrix4(Ys),this.boundingBox.union(cf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ys),Ur.copy(e.boundingSphere).applyMatrix4(Ys),this.boundingSphere.union(Ur)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[r+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Dr.geometry=this.geometry,Dr.material=this.material,Dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ur.copy(this.boundingSphere),Ur.applyMatrix4(n),e.ray.intersectsSphere(Ur)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ys),lf.multiplyMatrices(n,Ys),Dr.matrixWorld=lf,Dr.raycast(e,Ta);for(let r=0,a=Ta.length;r<a;r++){const l=Ta[r];l.instanceId=s,l.object=this,t.push(l)}Ta.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new qi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new vn(new Float32Array(i*this.count),i,this.count,po,jt));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const a=this.geometry.morphTargetsRelative?1:1-r,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function Ic(o,e){return o-e}function Dx(o,e){return o.z-e.z}function Ux(o,e){return e.z-o.z}class Nx{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,r=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const a=s[this.index];r.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}const nn=new Ne,Fx=new G(1,1,1),Lc=new Ar,Aa=new zt,Zi=new Nt,Nr=new E,hf=new E,Ox=new E,Dc=new Nx,Gt=new Y,Ea=[];function Bx(o,e,t=0){const n=e.itemSize;if(o.isInterleavedBufferAttribute||o.array.constructor!==e.array.constructor){const i=o.count;for(let s=0;s<i;s++)for(let r=0;r<n;r++)e.setComponent(s+t,r,o.getComponent(s,r))}else e.array.set(o.array,t*n);e.needsUpdate=!0}function Ki(o,e){if(o.constructor!==e.constructor){const t=Math.min(o.length,e.length);for(let n=0;n<t;n++)e[n]=o[n]}else{const t=Math.min(o.length,e.length);e.set(new o.constructor(o.buffer,0,t))}}class uf extends Y{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(e,t,n=t*2,i){super(new Ge,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new vn(t,e,e,At,jt);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new vn(t,e,e,ar,Un);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new vn(t,e,e,At,jt);n.colorSpace=Qe.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const r=e.getAttribute(s),{array:a,itemSize:l,normalized:c}=r,h=new a.constructor(n*l),u=new $e(h,l,c);t.setAttribute(s,u)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new $e(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,nn),this.getBoundingBoxAt(s,Aa).applyMatrix4(nn),e.union(Aa)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,nn),this.getBoundingSphereAt(s,Zi).applyMatrix4(nn),e.union(Zi)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Ic),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;nn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const r=this._colorsTexture;return r&&(Fx.toArray(r.image.data,i*4),r.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const r=e.getIndex();if(r!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?r.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Ic),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),r=t.getIndex(),a=this._geometryInfo[e];if(i&&r.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(const h in n.attributes){const u=t.getAttribute(h),d=n.getAttribute(h);Bx(u,d,l);const f=u.itemSize;for(let m=u.count,v=c;m<v;m++){const g=l+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const h=a.indexStart,u=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let d=0;d<r.count;d++)s.setX(h+d,l+r.getX(d));for(let d=r.count,f=u;d<f;d++)s.setX(h+d,l);s.needsUpdate=!0,s.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?this:(t[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this)}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((r,a)=>a).sort((r,a)=>n[r].vertexStart-n[a].vertexStart),s=this.geometry;for(let r=0,a=n.length;r<a;r++){const l=i[r],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:h,vertexStart:u,reservedIndexCount:d}=c,f=s.index,m=f.array,v=e-u;for(let g=h;g<h+d;g++)m[g]=m[g]+v;f.array.copyWithin(t,h,h+d),f.addUpdateRange(t,d),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:h,reservedVertexCount:u}=c,d=s.attributes;for(const f in d){const m=d[f],{array:v,itemSize:g}=m;v.copyWithin(e*g,h*g,(h+u)*g),m.addUpdateRange(e*g,u*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart,this._nextIndexStart=s.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new zt,r=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;r&&(h=r.getX(h)),s.expandByPoint(Nr.fromBufferAttribute(a,h))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new Nt;this.getBoundingBoxAt(e,Aa),Aa.getCenter(s.center);const r=n.index,a=n.attributes.position;let l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;r&&(u=r.getX(u)),Nr.fromBufferAttribute(a,u),l=Math.max(l,s.center.distanceToSquared(Nr))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture,s=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?this:(t.toArray(s,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?null:t.fromArray(i,e*16)}setColorAt(e,t){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,s=this._instanceInfo;return e>=s.length||s[e].active===!1?this:(t.toArray(i,e*4),n.needsUpdate=!0,this)}getColorAt(e,t){const n=this._colorsTexture.image.data,i=this._instanceInfo;return e>=i.length||i[e].active===!1?null:t.fromArray(n,e*4)}setVisibleAt(e,t){const n=this._instanceInfo;return e>=n.length||n[e].active===!1||n[e].visible===t?this:(n[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?!1:t[e].visible}setGeometryIdAt(e,t){const n=this._instanceInfo,i=this._geometryInfo;return e>=n.length||n[e].active===!1||t>=i.length||i[t].active===!1?null:(n[e].geometryIndex=t,this)}getGeometryIdAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?-1:t[e].geometryIndex}getGeometryRangeAt(e,t={}){if(e<0||e>=this._geometryCount)return null;const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Ic);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);Ki(this._multiDrawCounts,i),Ki(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const r=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;r.dispose(),this._initIndirectTexture(),Ki(r.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),Ki(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Ki(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Ge,this._initializeGeometry(s));const r=this.geometry;s.index&&Ki(s.index.array,r.index.array);for(const a in s.attributes)Ki(s.attributes[a].array,r.attributes[a].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,r=this.geometry;Gt.material=this.material,Gt.geometry.index=r.index,Gt.geometry.attributes=r.attributes,Gt.geometry.boundingBox===null&&(Gt.geometry.boundingBox=new zt),Gt.geometry.boundingSphere===null&&(Gt.geometry.boundingSphere=new Nt);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;const c=n[a].geometryIndex,h=i[c];Gt.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Gt.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,Gt.geometry.boundingBox),this.getBoundingSphereAt(c,Gt.geometry.boundingSphere),Gt.raycast(e,Ea);for(let u=0,d=Ea.length;u<d;u++){const f=Ea[u];f.object=this,f.batchId=a,t.push(f)}Ea.length=0}Gt.material=null,Gt.geometry.index=null,Gt.geometry.attributes={},Gt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const r=i.getIndex(),a=r===null?1:r.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,m=f.image.data;d&&(nn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Lc.setFromProjectionMatrix(nn,e.coordinateSystem));let v=0;if(this.sortObjects){nn.copy(this.matrixWorld).invert(),Nr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(nn),hf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(nn);for(let x=0,_=l.length;x<_;x++)if(l[x].visible&&l[x].active){const y=l[x].geometryIndex;this.getMatrixAt(x,nn),this.getBoundingSphereAt(y,Zi).applyMatrix4(nn);let C=!1;if(d&&(C=!Lc.intersectsSphere(Zi)),!C){const b=u[y],A=Ox.subVectors(Zi.center,Nr).dot(hf);Dc.push(b.start,b.count,A,x)}}const g=Dc.list,p=this.customSort;p===null?g.sort(s.transparent?Ux:Dx):p.call(this,g,n);for(let x=0,_=g.length;x<_;x++){const y=g[x];c[v]=y.start*a,h[v]=y.count,m[v]=y.index,v++}Dc.reset()}else for(let g=0,p=l.length;g<p;g++)if(l[g].visible&&l[g].active){const x=l[g].geometryIndex;let _=!1;if(d&&(this.getMatrixAt(g,nn),this.getBoundingSphereAt(x,Zi).applyMatrix4(nn),_=!Lc.intersectsSphere(Zi)),!_){const y=u[x];c[v]=y.start*a,h[v]=y.count,m[v]=g,v++}}f.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,r){this.onBeforeRender(e,null,i,s,r)}}class Vt extends Rt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new G(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ca=new E,Ra=new E,df=new Ne,Fr=new Es,Pa=new Nt,Uc=new E,ff=new E;class On extends it{constructor(e=new Ge,t=new Vt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Ca.fromBufferAttribute(t,i-1),Ra.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ca.distanceTo(Ra);e.setAttribute("lineDistance",new Ae(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pa.copy(n.boundingSphere),Pa.applyMatrix4(i),Pa.radius+=s,e.ray.intersectsSphere(Pa)===!1)return;df.copy(i).invert(),Fr.copy(e.ray).applyMatrix4(df);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),m=Math.min(h.count,r.start+r.count);for(let v=f,g=m-1;v<g;v+=c){const p=h.getX(v),x=h.getX(v+1),_=Ia(this,e,Fr,l,p,x);_&&t.push(_)}if(this.isLineLoop){const v=h.getX(m-1),g=h.getX(f),p=Ia(this,e,Fr,l,v,g);p&&t.push(p)}}else{const f=Math.max(0,r.start),m=Math.min(d.count,r.start+r.count);for(let v=f,g=m-1;v<g;v+=c){const p=Ia(this,e,Fr,l,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=Ia(this,e,Fr,l,m-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ia(o,e,t,n,i,s){const r=o.geometry.attributes.position;if(Ca.fromBufferAttribute(r,i),Ra.fromBufferAttribute(r,s),t.distanceSqToSegment(Ca,Ra,Uc,ff)>n)return;Uc.applyMatrix4(o.matrixWorld);const l=e.ray.origin.distanceTo(Uc);if(!(l<e.near||l>e.far))return{distance:l,point:ff.clone().applyMatrix4(o.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:o}}const pf=new E,mf=new E;class En extends On{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)pf.fromBufferAttribute(t,i),mf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+pf.distanceTo(mf);e.setAttribute("lineDistance",new Ae(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Nc extends On{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class qs extends Rt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const gf=new Ne,Fc=new Es,La=new Nt,Da=new E;class Zs extends it{constructor(e=new Ge,t=new qs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(i),La.radius+=s,e.ray.intersectsSphere(La)===!1)return;gf.copy(i).invert(),Fc.copy(e.ray).applyMatrix4(gf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let m=d,v=f;m<v;m++){const g=c.getX(m);Da.fromBufferAttribute(u,g),vf(Da,g,l,i,e,t,this)}}else{const d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let m=d,v=f;m<v;m++)Da.fromBufferAttribute(u,m),vf(Da,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function vf(o,e,t,n,i,s,r){const a=Fc.distanceSqToPoint(o);if(a<t){const l=new E;Fc.closestPointToPoint(o,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class zx extends vt{constructor(e,t,n,i,s,r,a,l,c){super(e,t,n,i,s,r,a,l,c),this.isVideoTexture=!0,this.minFilter=r!==void 0?r:ct,this.magFilter=s!==void 0?s:ct,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class kx extends vt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=gt,this.minFilter=gt,this.generateMipmaps=!1,this.needsUpdate=!0}}class Ua extends vt{constructor(e,t,n,i,s,r,a,l,c,h,u,d){super(null,r,a,l,c,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class Hx extends Ua{constructor(e,t,n,i,s,r){super(e,t,n,s,r),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=qt,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gx extends Ua{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Gn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class yf extends vt{constructor(e,t,n,i,s,r,a,l,c){super(e,t,n,i,s,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let r;t?r=t:r=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-r,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(r-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const r=this.getPoint(i),a=this.getPoint(s),l=t||(r.isVector2?new Z:new E);return l.copy(a).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new E,i=[],s=[],r=[],a=new E,l=new Ne;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new E)}s[0]=new E,r[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),r[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(St(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,m))}r[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(St(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),r[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Na extends Cn{constructor(e=0,t=0,n=1,i=1,s=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Z){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(r?s=0:s=i),this.aClockwise===!0&&!r&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class xf extends Na{constructor(e,t,n,i,s,r){super(e,t,n,n,i,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Oc(){let o=0,e=0,t=0,n=0;function i(s,r,a,l){o=s,e=a,t=-3*s+3*r-2*a-l,n=2*s-2*r+a+l}return{initCatmullRom:function(s,r,a,l,c){i(r,a,c*(a-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,a,l,c,h,u){let d=(r-s)/c-(a-s)/(c+h)+(a-r)/h,f=(a-r)/h-(l-r)/(h+u)+(l-a)/u;d*=h,f*=h,i(r,a,d,f)},calc:function(s){const r=s*s,a=r*s;return o+e*s+t*r+n*a}}}const Fa=new E,Bc=new Oc,zc=new Oc,kc=new Oc;class _f extends Cn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){const n=t,i=this.points,s=i.length,r=(s-(this.closed?0:1))*e;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Fa.subVectors(i[0],i[1]).add(i[0]),c=Fa);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Fa.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Fa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Bc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,v,g),zc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,v,g),kc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(Bc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),zc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),kc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Bc.calc(l),zc.calc(l),kc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Mf(o,e,t,n,i){const s=(n-e)*.5,r=(i-t)*.5,a=o*o,l=o*a;return(2*t-2*n+s+r)*l+(-3*t+3*n-2*s-r)*a+s*o+t}function Vx(o,e){const t=1-o;return t*t*e}function Wx(o,e){return 2*(1-o)*o*e}function Xx(o,e){return o*o*e}function Or(o,e,t,n){return Vx(o,e)+Wx(o,t)+Xx(o,n)}function Yx(o,e){const t=1-o;return t*t*t*e}function qx(o,e){const t=1-o;return 3*t*t*o*e}function Zx(o,e){return 3*(1-o)*o*o*e}function Kx(o,e){return o*o*o*e}function Br(o,e,t,n,i){return Yx(o,e)+qx(o,t)+Zx(o,n)+Kx(o,i)}class Hc extends Cn{constructor(e=new Z,t=new Z,n=new Z,i=new Z){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Z){const n=t,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(Br(e,i.x,s.x,r.x,a.x),Br(e,i.y,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Sf extends Cn{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){const n=t,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(Br(e,i.x,s.x,r.x,a.x),Br(e,i.y,s.y,r.y,a.y),Br(e,i.z,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Gc extends Cn{constructor(e=new Z,t=new Z){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Z){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wf extends Cn{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vc extends Cn{constructor(e=new Z,t=new Z,n=new Z){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Z){const n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(Or(e,i.x,s.x,r.x),Or(e,i.y,s.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wc extends Cn{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){const n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(Or(e,i.x,s.x,r.x),Or(e,i.y,s.y,r.y),Or(e,i.z,s.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xc extends Cn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Z){const n=t,i=this.points,s=(i.length-1)*e,r=Math.floor(s),a=s-r,l=i[r===0?r:r-1],c=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(Mf(a,l.x,c.x,h.x,u.x),Mf(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new Z().fromArray(i))}return this}}var Oa=Object.freeze({__proto__:null,ArcCurve:xf,CatmullRomCurve3:_f,CubicBezierCurve:Hc,CubicBezierCurve3:Sf,EllipseCurve:Na,LineCurve:Gc,LineCurve3:wf,QuadraticBezierCurve:Vc,QuadraticBezierCurve3:Wc,SplineCurve:Xc});class bf extends Cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Oa[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const r=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-r/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const r=s[i],a=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Oa[i.type]().fromJSON(i))}return this}}class zr extends bf{constructor(e){super(),this.type="Path",this.currentPoint=new Z,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Gc(this.currentPoint.clone(),new Z(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Vc(this.currentPoint.clone(),new Z(e,t),new Z(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,r){const a=new Hc(this.currentPoint.clone(),new Z(e,t),new Z(n,i),new Z(s,r));return this.curves.push(a),this.currentPoint.set(s,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Xc(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,r){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,s,r),this}absarc(e,t,n,i,s,r){return this.absellipse(e,t,n,n,i,s,r),this}ellipse(e,t,n,i,s,r,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,r,a,l),this}absellipse(e,t,n,i,s,r,a,l){const c=new Na(e,t,n,i,s,r,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class kr extends Ge{constructor(e=[new Z(0,-.5),new Z(.5,0),new Z(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=St(i,0,Math.PI*2);const s=[],r=[],a=[],l=[],c=[],h=1/t,u=new E,d=new Z,f=new E,m=new E,v=new E;let g=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-g,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(m)}for(let x=0;x<=t;x++){const _=n+x*h*i,y=Math.sin(_),C=Math.cos(_);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*y,u.y=e[b].y,u.z=e[b].x*C,r.push(u.x,u.y,u.z),d.x=x/t,d.y=b/(e.length-1),a.push(d.x,d.y);const A=l[3*b+0]*y,R=l[3*b+1],S=l[3*b+0]*C;c.push(A,R,S)}}for(let x=0;x<t;x++)for(let _=0;_<e.length-1;_++){const y=_+x*e.length,C=y,b=y+e.length,A=y+e.length+1,R=y+1;s.push(C,b,R),s.push(A,R,b)}this.setIndex(s),this.setAttribute("position",new Ae(r,3)),this.setAttribute("uv",new Ae(a,2)),this.setAttribute("normal",new Ae(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.points,e.segments,e.phiStart,e.phiLength)}}class Ba extends kr{constructor(e=1,t=1,n=4,i=8){const s=new zr;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Ba(e.radius,e.length,e.capSegments,e.radialSegments)}}class Hr extends Ge{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],r=[],a=[],l=[],c=new E,h=new Z;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(r[d]/e+1)/2,h.y=(r[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ae(r,3)),this.setAttribute("normal",new Ae(a,3)),this.setAttribute("uv",new Ae(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Jt extends Ge{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const v=[],g=n/2;let p=0;x(),r===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ae(u,3)),this.setAttribute("normal",new Ae(d,3)),this.setAttribute("uv",new Ae(f,2));function x(){const y=new E,C=new E;let b=0;const A=(t-e)/n;for(let R=0;R<=s;R++){const S=[],M=R/s,L=M*(t-e)+e;for(let B=0;B<=i;B++){const O=B/i,k=O*l+a,K=Math.sin(k),H=Math.cos(k);C.x=L*K,C.y=-M*n+g,C.z=L*H,u.push(C.x,C.y,C.z),y.set(K,A,H).normalize(),d.push(y.x,y.y,y.z),f.push(O,1-M),S.push(m++)}v.push(S)}for(let R=0;R<i;R++)for(let S=0;S<s;S++){const M=v[S][R],L=v[S+1][R],B=v[S+1][R+1],O=v[S][R+1];(e>0||S!==0)&&(h.push(M,L,O),b+=3),(t>0||S!==s-1)&&(h.push(L,B,O),b+=3)}c.addGroup(p,b,0),p+=b}function _(y){const C=m,b=new Z,A=new E;let R=0;const S=y===!0?e:t,M=y===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const L=m;for(let B=0;B<=i;B++){const k=B/i*l+a,K=Math.cos(k),H=Math.sin(k);A.x=S*H,A.y=g*M,A.z=S*K,u.push(A.x,A.y,A.z),d.push(0,M,0),b.x=K*.5+.5,b.y=H*.5*M+.5,f.push(b.x,b.y),m++}for(let B=0;B<i;B++){const O=C+B,k=L+B;y===!0?h.push(k,k+1,O):h.push(k+1,k,O),R+=3}c.addGroup(p,R,y===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class za extends Jt{constructor(e=1,t=1,n=32,i=1,s=!1,r=0,a=Math.PI*2){super(0,e,t,n,i,s,r,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(e){return new za(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xi extends Ge{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],r=[];a(i),c(n),h(),this.setAttribute("position",new Ae(s,3)),this.setAttribute("normal",new Ae(s.slice(),3)),this.setAttribute("uv",new Ae(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const _=new E,y=new E,C=new E;for(let b=0;b<t.length;b+=3)f(t[b+0],_),f(t[b+1],y),f(t[b+2],C),l(_,y,C,x)}function l(x,_,y,C){const b=C+1,A=[];for(let R=0;R<=b;R++){A[R]=[];const S=x.clone().lerp(y,R/b),M=_.clone().lerp(y,R/b),L=b-R;for(let B=0;B<=L;B++)B===0&&R===b?A[R][B]=S:A[R][B]=S.clone().lerp(M,B/L)}for(let R=0;R<b;R++)for(let S=0;S<2*(b-R)-1;S++){const M=Math.floor(S/2);S%2===0?(d(A[R][M+1]),d(A[R+1][M]),d(A[R][M])):(d(A[R][M+1]),d(A[R+1][M+1]),d(A[R+1][M]))}}function c(x){const _=new E;for(let y=0;y<s.length;y+=3)_.x=s[y+0],_.y=s[y+1],_.z=s[y+2],_.normalize().multiplyScalar(x),s[y+0]=_.x,s[y+1]=_.y,s[y+2]=_.z}function h(){const x=new E;for(let _=0;_<s.length;_+=3){x.x=s[_+0],x.y=s[_+1],x.z=s[_+2];const y=g(x)/2/Math.PI+.5,C=p(x)/Math.PI+.5;r.push(y,1-C)}m(),u()}function u(){for(let x=0;x<r.length;x+=6){const _=r[x+0],y=r[x+2],C=r[x+4],b=Math.max(_,y,C),A=Math.min(_,y,C);b>.9&&A<.1&&(_<.2&&(r[x+0]+=1),y<.2&&(r[x+2]+=1),C<.2&&(r[x+4]+=1))}}function d(x){s.push(x.x,x.y,x.z)}function f(x,_){const y=x*3;_.x=e[y+0],_.y=e[y+1],_.z=e[y+2]}function m(){const x=new E,_=new E,y=new E,C=new E,b=new Z,A=new Z,R=new Z;for(let S=0,M=0;S<s.length;S+=9,M+=6){x.set(s[S+0],s[S+1],s[S+2]),_.set(s[S+3],s[S+4],s[S+5]),y.set(s[S+6],s[S+7],s[S+8]),b.set(r[M+0],r[M+1]),A.set(r[M+2],r[M+3]),R.set(r[M+4],r[M+5]),C.copy(x).add(_).add(y).divideScalar(3);const L=g(C);v(b,M+0,x,L),v(A,M+2,_,L),v(R,M+4,y,L)}}function v(x,_,y,C){C<0&&x.x===1&&(r[_]=x.x-1),y.x===0&&y.z===0&&(r[_]=C/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.vertices,e.indices,e.radius,e.details)}}class ka extends xi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ka(e.radius,e.detail)}}const Ha=new E,Ga=new E,Yc=new E,Va=new en;class Tf extends Ge{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Fi*t),r=e.getIndex(),a=e.getAttribute("position"),l=r?r.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){r?(c[0]=r.getX(m),c[1]=r.getX(m+1),c[2]=r.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:v,b:g,c:p}=Va;if(v.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Va.getNormal(Yc),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const _=(x+1)%3,y=u[x],C=u[_],b=Va[h[x]],A=Va[h[_]],R=`${y}_${C}`,S=`${C}_${y}`;S in d&&d[S]?(Yc.dot(d[S].normal)<=s&&(f.push(b.x,b.y,b.z),f.push(A.x,A.y,A.z)),d[S]=null):R in d||(d[R]={index0:c[x],index1:c[_],normal:Yc.clone()})}}for(const m in d)if(d[m]){const{index0:v,index1:g}=d[m];Ha.fromBufferAttribute(a,v),Ga.fromBufferAttribute(a,g),f.push(Ha.x,Ha.y,Ha.z),f.push(Ga.x,Ga.y,Ga.z)}this.setAttribute("position",new Ae(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class $i extends zr{constructor(e){super(e),this.uuid=rn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new zr().fromJSON(i))}return this}}const $x={triangulate:function(o,e,t=2){const n=e&&e.length,i=n?e[0]*t:o.length;let s=Af(o,0,i,t,!0);const r=[];if(!s||s.next===s.prev)return r;let a,l,c,h,u,d,f;if(n&&(s=t_(o,e,s,t)),o.length>80*t){a=c=o[0],l=h=o[1];for(let m=t;m<i;m+=t)u=o[m],d=o[m+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Gr(s,r,t,a,l,f,0),r}};function Af(o,e,t,n,i){let s,r;if(i===d_(o,e,t,n)>0)for(s=e;s<t;s+=n)r=Rf(s,o[s],o[s+1],r);else for(s=t-n;s>=e;s-=n)r=Rf(s,o[s],o[s+1],r);return r&&Wa(r,r.next)&&(Wr(r),r=r.next),r}function Ji(o,e){if(!o)return o;e||(e=o);let t=o,n;do if(n=!1,!t.steiner&&(Wa(t,t.next)||Mt(t.prev,t,t.next)===0)){if(Wr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Gr(o,e,t,n,i,s,r){if(!o)return;!r&&s&&o_(o,n,i,s);let a=o,l,c;for(;o.prev!==o.next;){if(l=o.prev,c=o.next,s?jx(o,n,i,s):Jx(o)){e.push(l.i/t|0),e.push(o.i/t|0),e.push(c.i/t|0),Wr(o),o=c.next,a=c.next;continue}if(o=c,o===a){r?r===1?(o=Qx(Ji(o),e,t),Gr(o,e,t,n,i,s,2)):r===2&&e_(o,e,t,n,i,s):Gr(Ji(o),e,t,n,i,s,1);break}}}function Jx(o){const e=o.prev,t=o,n=o.next;if(Mt(e,t,n)>=0)return!1;const i=e.x,s=t.x,r=n.x,a=e.y,l=t.y,c=n.y,h=i<s?i<r?i:r:s<r?s:r,u=a<l?a<c?a:c:l<c?l:c,d=i>s?i>r?i:r:s>r?s:r,f=a>l?a>c?a:c:l>c?l:c;let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Ks(i,a,s,l,r,c,m.x,m.y)&&Mt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function jx(o,e,t,n){const i=o.prev,s=o,r=o.next;if(Mt(i,s,r)>=0)return!1;const a=i.x,l=s.x,c=r.x,h=i.y,u=s.y,d=r.y,f=a<l?a<c?a:c:l<c?l:c,m=h<u?h<d?h:d:u<d?u:d,v=a>l?a>c?a:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,p=qc(f,m,e,t,n),x=qc(v,g,e,t,n);let _=o.prevZ,y=o.nextZ;for(;_&&_.z>=p&&y&&y.z<=x;){if(_.x>=f&&_.x<=v&&_.y>=m&&_.y<=g&&_!==i&&_!==r&&Ks(a,h,l,u,c,d,_.x,_.y)&&Mt(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=f&&y.x<=v&&y.y>=m&&y.y<=g&&y!==i&&y!==r&&Ks(a,h,l,u,c,d,y.x,y.y)&&Mt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=v&&_.y>=m&&_.y<=g&&_!==i&&_!==r&&Ks(a,h,l,u,c,d,_.x,_.y)&&Mt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=m&&y.y<=g&&y!==i&&y!==r&&Ks(a,h,l,u,c,d,y.x,y.y)&&Mt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Qx(o,e,t){let n=o;do{const i=n.prev,s=n.next.next;!Wa(i,s)&&Ef(i,n,n.next,s)&&Vr(i,s)&&Vr(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Wr(n),Wr(n.next),n=o=s),n=n.next}while(n!==o);return Ji(n)}function e_(o,e,t,n,i,s){let r=o;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&c_(r,a)){let l=Cf(r,a);r=Ji(r,r.next),l=Ji(l,l.next),Gr(r,e,t,n,i,s,0),Gr(l,e,t,n,i,s,0);return}a=a.next}r=r.next}while(r!==o)}function t_(o,e,t,n){const i=[];let s,r,a,l,c;for(s=0,r=e.length;s<r;s++)a=e[s]*n,l=s<r-1?e[s+1]*n:o.length,c=Af(o,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(l_(c));for(i.sort(n_),s=0;s<i.length;s++)t=i_(i[s],t);return t}function n_(o,e){return o.x-e.x}function i_(o,e){const t=s_(o,e);if(!t)return e;const n=Cf(t,o);return Ji(n,n.next),Ji(t,t.next)}function s_(o,e){let t=e,n=-1/0,i;const s=o.x,r=o.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&Ks(r<c?s:n,r,l,c,r<c?n:s,r,t.x,t.y)&&(u=Math.abs(r-t.y)/(s-t.x),Vr(t,o)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&r_(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function r_(o,e){return Mt(o.prev,o,e.prev)<0&&Mt(e.next,o,o.next)<0}function o_(o,e,t,n){let i=o;do i.z===0&&(i.z=qc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==o);i.prevZ.nextZ=null,i.prevZ=null,a_(i)}function a_(o){let e,t,n,i,s,r,a,l,c=1;do{for(t=o,o=null,s=null,r=0;t;){for(r++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:o=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(r>1);return o}function qc(o,e,t,n,i){return o=(o-t)*i|0,e=(e-n)*i|0,o=(o|o<<8)&16711935,o=(o|o<<4)&252645135,o=(o|o<<2)&858993459,o=(o|o<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,o|e<<1}function l_(o){let e=o,t=o;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==o);return t}function Ks(o,e,t,n,i,s,r,a){return(i-r)*(e-a)>=(o-r)*(s-a)&&(o-r)*(n-a)>=(t-r)*(e-a)&&(t-r)*(s-a)>=(i-r)*(n-a)}function c_(o,e){return o.next.i!==e.i&&o.prev.i!==e.i&&!h_(o,e)&&(Vr(o,e)&&Vr(e,o)&&u_(o,e)&&(Mt(o.prev,o,e.prev)||Mt(o,e.prev,e))||Wa(o,e)&&Mt(o.prev,o,o.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(o,e,t){return(e.y-o.y)*(t.x-e.x)-(e.x-o.x)*(t.y-e.y)}function Wa(o,e){return o.x===e.x&&o.y===e.y}function Ef(o,e,t,n){const i=Ya(Mt(o,e,t)),s=Ya(Mt(o,e,n)),r=Ya(Mt(t,n,o)),a=Ya(Mt(t,n,e));return!!(i!==s&&r!==a||i===0&&Xa(o,t,e)||s===0&&Xa(o,n,e)||r===0&&Xa(t,o,n)||a===0&&Xa(t,e,n))}function Xa(o,e,t){return e.x<=Math.max(o.x,t.x)&&e.x>=Math.min(o.x,t.x)&&e.y<=Math.max(o.y,t.y)&&e.y>=Math.min(o.y,t.y)}function Ya(o){return o>0?1:o<0?-1:0}function h_(o,e){let t=o;do{if(t.i!==o.i&&t.next.i!==o.i&&t.i!==e.i&&t.next.i!==e.i&&Ef(t,t.next,o,e))return!0;t=t.next}while(t!==o);return!1}function Vr(o,e){return Mt(o.prev,o,o.next)<0?Mt(o,e,o.next)>=0&&Mt(o,o.prev,e)>=0:Mt(o,e,o.prev)<0||Mt(o,o.next,e)<0}function u_(o,e){let t=o,n=!1;const i=(o.x+e.x)/2,s=(o.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==o);return n}function Cf(o,e){const t=new Zc(o.i,o.x,o.y),n=new Zc(e.i,e.x,e.y),i=o.next,s=e.prev;return o.next=e,e.prev=o,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Rf(o,e,t,n){const i=new Zc(o,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Wr(o){o.next.prev=o.prev,o.prev.next=o.next,o.prevZ&&(o.prevZ.nextZ=o.nextZ),o.nextZ&&(o.nextZ.prevZ=o.prevZ)}function Zc(o,e,t){this.i=o,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function d_(o,e,t,n){let i=0;for(let s=e,r=t-n;s<t;s+=n)i+=(o[r]-o[s])*(o[s+1]+o[r+1]),r=s;return i}class Bn{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return Bn.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];Pf(e),If(n,e);let r=e.length;t.forEach(Pf);for(let l=0;l<t.length;l++)i.push(r),r+=t[l].length,If(n,t[l]);const a=$x.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Pf(o){const e=o.length;e>2&&o[e-1].equals(o[0])&&o.pop()}function If(o,e){for(let t=0;t<e.length;t++)o.push(e[t].x),o.push(e[t].y)}class qa extends Ge{constructor(e=new $i([new Z(.5,.5),new Z(-.5,.5),new Z(-.5,-.5),new Z(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];r(c)}this.setAttribute("position",new Ae(i,3)),this.setAttribute("uv",new Ae(s,2)),this.computeVertexNormals();function r(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:f_;let _,y=!1,C,b,A,R;p&&(_=p.getSpacedPoints(h),y=!0,d=!1,C=p.computeFrenetFrames(h,!1),b=new E,A=new E,R=new E),d||(g=0,f=0,m=0,v=0);const S=a.extractPoints(c);let M=S.shape;const L=S.holes;if(!Bn.isClockWise(M)){M=M.reverse();for(let Q=0,re=L.length;Q<re;Q++){const I=L[Q];Bn.isClockWise(I)&&(L[Q]=I.reverse())}}const O=Bn.triangulateShape(M,L),k=M;for(let Q=0,re=L.length;Q<re;Q++){const I=L[Q];M=M.concat(I)}function K(Q,re,I){return re||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(re,I)}const H=M.length,te=O.length;function X(Q,re,I){let Ee,se,xe;const ce=Q.x-re.x,Fe=Q.y-re.y,Me=I.x-Q.x,P=I.y-Q.y,w=ce*ce+Fe*Fe,z=ce*P-Fe*Me;if(Math.abs(z)>Number.EPSILON){const J=Math.sqrt(w),ne=Math.sqrt(Me*Me+P*P),j=re.x-Fe/J,Ce=re.y+ce/J,me=I.x-P/ne,Se=I.y+Me/ne,nt=((me-j)*P-(Se-Ce)*Me)/(ce*P-Fe*Me);Ee=j+ce*nt-Q.x,se=Ce+Fe*nt-Q.y;const oe=Ee*Ee+se*se;if(oe<=2)return new Z(Ee,se);xe=Math.sqrt(oe/2)}else{let J=!1;ce>Number.EPSILON?Me>Number.EPSILON&&(J=!0):ce<-Number.EPSILON?Me<-Number.EPSILON&&(J=!0):Math.sign(Fe)===Math.sign(P)&&(J=!0),J?(Ee=-Fe,se=ce,xe=Math.sqrt(w)):(Ee=ce,se=Fe,xe=Math.sqrt(w/2))}return new Z(Ee/xe,se/xe)}const ue=[];for(let Q=0,re=k.length,I=re-1,Ee=Q+1;Q<re;Q++,I++,Ee++)I===re&&(I=0),Ee===re&&(Ee=0),ue[Q]=X(k[Q],k[I],k[Ee]);const fe=[];let pe,ke=ue.concat();for(let Q=0,re=L.length;Q<re;Q++){const I=L[Q];pe=[];for(let Ee=0,se=I.length,xe=se-1,ce=Ee+1;Ee<se;Ee++,xe++,ce++)xe===se&&(xe=0),ce===se&&(ce=0),pe[Ee]=X(I[Ee],I[xe],I[ce]);fe.push(pe),ke=ke.concat(pe)}for(let Q=0;Q<g;Q++){const re=Q/g,I=f*Math.cos(re*Math.PI/2),Ee=m*Math.sin(re*Math.PI/2)+v;for(let se=0,xe=k.length;se<xe;se++){const ce=K(k[se],ue[se],Ee);le(ce.x,ce.y,-I)}for(let se=0,xe=L.length;se<xe;se++){const ce=L[se];pe=fe[se];for(let Fe=0,Me=ce.length;Fe<Me;Fe++){const P=K(ce[Fe],pe[Fe],Ee);le(P.x,P.y,-I)}}}const st=m+v;for(let Q=0;Q<H;Q++){const re=d?K(M[Q],ke[Q],st):M[Q];y?(A.copy(C.normals[0]).multiplyScalar(re.x),b.copy(C.binormals[0]).multiplyScalar(re.y),R.copy(_[0]).add(A).add(b),le(R.x,R.y,R.z)):le(re.x,re.y,0)}for(let Q=1;Q<=h;Q++)for(let re=0;re<H;re++){const I=d?K(M[re],ke[re],st):M[re];y?(A.copy(C.normals[Q]).multiplyScalar(I.x),b.copy(C.binormals[Q]).multiplyScalar(I.y),R.copy(_[Q]).add(A).add(b),le(R.x,R.y,R.z)):le(I.x,I.y,u/h*Q)}for(let Q=g-1;Q>=0;Q--){const re=Q/g,I=f*Math.cos(re*Math.PI/2),Ee=m*Math.sin(re*Math.PI/2)+v;for(let se=0,xe=k.length;se<xe;se++){const ce=K(k[se],ue[se],Ee);le(ce.x,ce.y,u+I)}for(let se=0,xe=L.length;se<xe;se++){const ce=L[se];pe=fe[se];for(let Fe=0,Me=ce.length;Fe<Me;Fe++){const P=K(ce[Fe],pe[Fe],Ee);y?le(P.x,P.y+_[h-1].y,_[h-1].x+I):le(P.x,P.y,u+I)}}}$(),ie();function $(){const Q=i.length/3;if(d){let re=0,I=H*re;for(let Ee=0;Ee<te;Ee++){const se=O[Ee];Ue(se[2]+I,se[1]+I,se[0]+I)}re=h+g*2,I=H*re;for(let Ee=0;Ee<te;Ee++){const se=O[Ee];Ue(se[0]+I,se[1]+I,se[2]+I)}}else{for(let re=0;re<te;re++){const I=O[re];Ue(I[2],I[1],I[0])}for(let re=0;re<te;re++){const I=O[re];Ue(I[0]+H*h,I[1]+H*h,I[2]+H*h)}}n.addGroup(Q,i.length/3-Q,0)}function ie(){const Q=i.length/3;let re=0;we(k,re),re+=k.length;for(let I=0,Ee=L.length;I<Ee;I++){const se=L[I];we(se,re),re+=se.length}n.addGroup(Q,i.length/3-Q,1)}function we(Q,re){let I=Q.length;for(;--I>=0;){const Ee=I;let se=I-1;se<0&&(se=Q.length-1);for(let xe=0,ce=h+g*2;xe<ce;xe++){const Fe=H*xe,Me=H*(xe+1),P=re+Ee+Fe,w=re+se+Fe,z=re+se+Me,J=re+Ee+Me;Be(P,w,z,J)}}}function le(Q,re,I){l.push(Q),l.push(re),l.push(I)}function Ue(Q,re,I){Oe(Q),Oe(re),Oe(I);const Ee=i.length/3,se=x.generateTopUV(n,i,Ee-3,Ee-2,Ee-1);He(se[0]),He(se[1]),He(se[2])}function Be(Q,re,I,Ee){Oe(Q),Oe(re),Oe(Ee),Oe(re),Oe(I),Oe(Ee);const se=i.length/3,xe=x.generateSideWallUV(n,i,se-6,se-3,se-2,se-1);He(xe[0]),He(xe[1]),He(xe[3]),He(xe[1]),He(xe[2]),He(xe[3])}function Oe(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function He(Q){s.push(Q.x),s.push(Q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return p_(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Oa[i.type]().fromJSON(i)),new qa(n,e.options)}}const f_={generateTopUV:function(o,e,t,n,i){const s=e[t*3],r=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new Z(s,r),new Z(a,l),new Z(c,h)]},generateSideWallUV:function(o,e,t,n,i,s){const r=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],v=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(a-h)<Math.abs(r-c)?[new Z(r,1-l),new Z(c,1-u),new Z(d,1-m),new Z(v,1-p)]:[new Z(a,1-l),new Z(h,1-u),new Z(f,1-m),new Z(g,1-p)]}};function p_(o,e,t){if(t.shapes=[],Array.isArray(o))for(let n=0,i=o.length;n<i;n++){const s=o[n];t.shapes.push(s.uuid)}else t.shapes.push(o.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Za extends xi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Za(e.radius,e.detail)}}class Qn extends xi{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Qn(e.radius,e.detail)}}class $s extends Ge{constructor(e=.5,t=1,n=32,i=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new E,m=new Z;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const p=s+g/n*r;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let v=0;v<i;v++){const g=v*(n+1);for(let p=0;p<n;p++){const x=p+g,_=x,y=x+n+1,C=x+n+2,b=x+1;a.push(_,y,b),a.push(y,C,b)}}this.setIndex(a),this.setAttribute("position",new Ae(l,3)),this.setAttribute("normal",new Ae(c,3)),this.setAttribute("uv",new Ae(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ka extends Ge{constructor(e=new $i([new Z(0,.5),new Z(-.5,-.5),new Z(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],r=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ae(i,3)),this.setAttribute("normal",new Ae(s,3)),this.setAttribute("uv",new Ae(r,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const m=d.holes;Bn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const x=m[g];Bn.isClockWise(x)===!0&&(m[g]=x.reverse())}const v=Bn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const x=m[g];f=f.concat(x)}for(let g=0,p=f.length;g<p;g++){const x=f[g];i.push(x.x,x.y,0),s.push(0,0,1),r.push(x.x,x.y)}for(let g=0,p=v.length;g<p;g++){const x=v[g],_=x[0]+u,y=x[1]+u,C=x[2]+u;n.push(_,y,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return m_(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const r=t[e.shapes[i]];n.push(r)}return new Ka(n,e.curveSegments)}}function m_(o,e){if(e.shapes=[],Array.isArray(o))for(let t=0,n=o.length;t<n;t++){const i=o[t];e.shapes.push(i.uuid)}else e.shapes.push(o.uuid);return e}class Wt extends Ge{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const h=[],u=new E,d=new E,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const x=[],_=p/n;let y=0;p===0&&r===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const b=C/t;u.x=-e*Math.cos(i+b*s)*Math.sin(r+_*a),u.y=e*Math.cos(r+_*a),u.z=e*Math.sin(i+b*s)*Math.sin(r+_*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(b+y,1-_),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const _=h[p][x+1],y=h[p][x],C=h[p+1][x],b=h[p+1][x+1];(p!==0||r>0)&&f.push(_,y,b),(p!==n-1||l<Math.PI)&&f.push(y,C,b)}this.setIndex(f),this.setAttribute("position",new Ae(m,3)),this.setAttribute("normal",new Ae(v,3)),this.setAttribute("uv",new Ae(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class $a extends xi{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $a(e.radius,e.detail)}}class Js extends Ge{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],l=[],c=[],h=new E,u=new E,d=new E;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const v=m/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(v),u.y=(e+t*Math.cos(g))*Math.sin(v),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const v=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,x=(i+1)*f+m;r.push(v,g,x),r.push(g,p,x)}this.setIndex(r),this.setAttribute("position",new Ae(a,3)),this.setAttribute("normal",new Ae(l,3)),this.setAttribute("uv",new Ae(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ja extends Ge{constructor(e=1,t=.4,n=64,i=8,s=2,r=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:r},n=Math.floor(n),i=Math.floor(i);const a=[],l=[],c=[],h=[],u=new E,d=new E,f=new E,m=new E,v=new E,g=new E,p=new E;for(let _=0;_<=n;++_){const y=_/n*s*Math.PI*2;x(y,s,r,e,f),x(y+.01,s,r,e,m),g.subVectors(m,f),p.addVectors(m,f),v.crossVectors(g,p),p.crossVectors(v,g),v.normalize(),p.normalize();for(let C=0;C<=i;++C){const b=C/i*Math.PI*2,A=-t*Math.cos(b),R=t*Math.sin(b);u.x=f.x+(A*p.x+R*v.x),u.y=f.y+(A*p.y+R*v.y),u.z=f.z+(A*p.z+R*v.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(_/n),h.push(C/i)}}for(let _=1;_<=n;_++)for(let y=1;y<=i;y++){const C=(i+1)*(_-1)+(y-1),b=(i+1)*_+(y-1),A=(i+1)*_+y,R=(i+1)*(_-1)+y;a.push(C,b,R),a.push(b,A,R)}this.setIndex(a),this.setAttribute("position",new Ae(l,3)),this.setAttribute("normal",new Ae(c,3)),this.setAttribute("uv",new Ae(h,2));function x(_,y,C,b,A){const R=Math.cos(_),S=Math.sin(_),M=C/y*_,L=Math.cos(M);A.x=b*(2+L)*.5*R,A.y=b*(2+L)*S*.5,A.z=b*Math.sin(M)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ja(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class ja extends Ge{constructor(e=new Wc(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const r=e.computeFrenetFrames(t,s);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new E,l=new E,c=new Z;let h=new E;const u=[],d=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new Ae(u,3)),this.setAttribute("normal",new Ae(d,3)),this.setAttribute("uv",new Ae(f,2));function v(){for(let _=0;_<t;_++)g(_);g(s===!1?t:0),x(),p()}function g(_){h=e.getPointAt(_/t,h);const y=r.normals[_],C=r.binormals[_];for(let b=0;b<=i;b++){const A=b/i*Math.PI*2,R=Math.sin(A),S=-Math.cos(A);l.x=S*y.x+R*C.x,l.y=S*y.y+R*C.y,l.z=S*y.z+R*C.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=t;_++)for(let y=1;y<=i;y++){const C=(i+1)*(_-1)+(y-1),b=(i+1)*_+(y-1),A=(i+1)*_+y,R=(i+1)*(_-1)+y;m.push(C,b,R),m.push(b,A,R)}}function x(){for(let _=0;_<=t;_++)for(let y=0;y<=i;y++)c.x=_/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ja(new Oa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Lf extends Ge{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new E,s=new E;if(e.index!==null){const r=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,f=u.count;for(let m=d,v=d+f;m<v;m+=3)for(let g=0;g<3;g++){const p=a.getX(m+g),x=a.getX(m+(g+1)%3);i.fromBufferAttribute(r,p),s.fromBufferAttribute(r,x),Df(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const r=e.attributes.position;for(let a=0,l=r.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;i.fromBufferAttribute(r,h),s.fromBufferAttribute(r,u),Df(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ae(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Df(o,e,t){const n=`${o.x},${o.y},${o.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${o.x},${o.y},${o.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var Uf=Object.freeze({__proto__:null,BoxGeometry:he,CapsuleGeometry:Ba,CircleGeometry:Hr,ConeGeometry:za,CylinderGeometry:Jt,DodecahedronGeometry:ka,EdgesGeometry:Tf,ExtrudeGeometry:qa,IcosahedronGeometry:Za,LatheGeometry:kr,OctahedronGeometry:Qn,PlaneGeometry:Tn,PolyhedronGeometry:xi,RingGeometry:$s,ShapeGeometry:Ka,SphereGeometry:Wt,TetrahedronGeometry:$a,TorusGeometry:Js,TorusKnotGeometry:Ja,TubeGeometry:ja,WireframeGeometry:Lf});class Nf extends Rt{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new G(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Ff extends Dt{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class lt extends Rt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new G(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yn extends lt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Z(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return St(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new G(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new G(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new G(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Of extends Rt{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new G(16777215),this.specular=new G(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=sr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Bf extends Rt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new G(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class zf extends Rt{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class kf extends Rt{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=sr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hf extends Rt{static get type(){return"MeshMatcapMaterial"}constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new G(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Gf extends Vt{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function ji(o,e,t){return!o||!t&&o.constructor===e?o:typeof e.BYTES_PER_ELEMENT=="number"?new e(o):Array.prototype.slice.call(o)}function Vf(o){return ArrayBuffer.isView(o)&&!(o instanceof DataView)}function Wf(o){function e(i,s){return o[i]-o[s]}const t=o.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Kc(o,e,t){const n=o.length,i=new o.constructor(n);for(let s=0,r=0;r!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[r++]=o[a+l]}return i}function $c(o,e,t,n){let i=1,s=o[0];for(;s!==void 0&&s[n]===void 0;)s=o[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push.apply(t,r)),s=o[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=o[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=o[i++];while(s!==void 0)}function g_(o,e,t,n,i=30){const s=o.clone();s.name=e;const r=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const m=c.times[f]*i;if(!(m<t||m>=n)){u.push(c.times[f]);for(let v=0;v<h;++v)d.push(c.values[f*h+v])}}u.length!==0&&(c.times=ji(u,c.times.constructor),c.values=ji(d,c.values.constructor),r.push(c))}s.tracks=r;let a=1/0;for(let l=0;l<s.tracks.length;++l)a>s.tracks[l].times[0]&&(a=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*a);return s.resetDuration(),s}function v_(o,e=0,t=o,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let r=0;r<i;++r){const a=t.tracks[r],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=o.tracks.find(function(p){return p.name===a.name&&p.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const m=a.times.length-1;let v;if(s<=a.times[0]){const p=h,x=u-h;v=a.values.slice(p,x)}else if(s>=a.times[m]){const p=m*u+h,x=p+u-h;v=a.values.slice(p,x)}else{const p=a.createInterpolant(),x=h,_=u-h;p.evaluate(s),v=p.resultBuffer.slice(x,_)}l==="quaternion"&&new Bt().fromArray(v).normalize().conjugate().toArray(v);const g=c.times.length;for(let p=0;p<g;++p){const x=p*f+d;if(l==="quaternion")Bt.multiplyQuaternionsFlat(c.values,x,v,0,c.values,x);else{const _=f-d*2;for(let y=0;y<_;++y)c.values[x+y]-=v[y]}}}return o.blendMode=Ol,o}const y_={convertArray:ji,isTypedArray:Vf,getKeyframeOrder:Wf,sortedArray:Kc,flattenJSON:$c,subclip:g_,makeClipAdditive:v_};class js{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let r;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}r=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}r=n,n=0;break n}break e}for(;n<r;){const a=n+r>>>1;e<t[a]?r=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Xf extends js{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Di,endingEnd:Di}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,r=e+1,a=i[s],l=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case Ui:s=e,a=2*t-n;break;case fr:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ui:r=e,l=2*n-t;break;case fr:r=1,l=n+i[1]-i[0];break;default:r=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),v=m*m,g=v*m,p=-d*g+2*d*v-d*m,x=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*m+1,_=(-1-f)*g+(1.5+f)*v+.5*m,y=f*g-f*v;for(let C=0;C!==a;++C)s[C]=p*r[h+C]+x*r[c+C]+_*r[l+C]+y*r[u+C];return s}}class Jc extends js{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=r[c+d]*u+r[l+d]*h;return s}}class Yf extends js{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Rn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ji(t,this.TimeBufferType),this.values=ji(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ji(e.times,Array),values:ji(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Yf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Jc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Xf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ys:t=this.InterpolantFactoryMethodDiscrete;break;case xs:t=this.InterpolantFactoryMethodLinear;break;case Vo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ys;case this.InterpolantFactoryMethodLinear:return xs;case this.InterpolantFactoryMethodSmooth:return Vo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);const a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,r),e=!1;break}r=l}if(i!==void 0&&Vf(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Vo,s=e.length-1;let r=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const v=t[u+m];if(v!==t[d+m]||v!==t[f+m]){l=!0;break}}}if(l){if(a!==r){e[r]=e[a];const u=a*n,d=r*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++r}}if(s>0){e[r]=e[s];for(let a=s*n,l=r*n,c=0;c!==n;++c)t[l+c]=t[a+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Rn.prototype.TimeBufferType=Float32Array,Rn.prototype.ValueBufferType=Float32Array,Rn.prototype.DefaultInterpolation=xs;class Qi extends Rn{constructor(e,t,n){super(e,t,n)}}Qi.prototype.ValueTypeName="bool",Qi.prototype.ValueBufferType=Array,Qi.prototype.DefaultInterpolation=ys,Qi.prototype.InterpolantFactoryMethodLinear=void 0,Qi.prototype.InterpolantFactoryMethodSmooth=void 0;class jc extends Rn{}jc.prototype.ValueTypeName="color";class es extends Rn{}es.prototype.ValueTypeName="number";class qf extends js{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Bt.slerpFlat(s,0,r,c-a,r,c,l);return s}}class ts extends Rn{InterpolantFactoryMethodLinear(e){return new qf(this.times,this.values,this.getValueSize(),e)}}ts.prototype.ValueTypeName="quaternion",ts.prototype.InterpolantFactoryMethodSmooth=void 0;class ns extends Rn{constructor(e,t,n){super(e,t,n)}}ns.prototype.ValueTypeName="string",ns.prototype.ValueBufferType=Array,ns.prototype.DefaultInterpolation=ys,ns.prototype.InterpolantFactoryMethodLinear=void 0,ns.prototype.InterpolantFactoryMethodSmooth=void 0;class is extends Rn{}is.prototype.ValueTypeName="vector";class Qs{constructor(e="",t=-1,n=[],i=Wo){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=rn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,a=n.length;r!==a;++r)t.push(__(n[r]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,r=n.length;s!==r;++s)t.push(Rn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,r=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=Wf(l);l=Kc(l,1,h),c=Kc(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),r.push(new es(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const r=[];for(const a in i)r.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return r}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,v){if(f.length!==0){const g=[],p=[];$c(f,g,p,m),g.length!==0&&v.push(new u(d,g,p))}},i=[],s=e.name||"default",r=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let v=0;v<d[m].morphTargets.length;v++)f[d[m].morphTargets[v]]=-1;for(const v in f){const g=[],p=[];for(let x=0;x!==d[m].morphTargets.length;++x){const _=d[m];g.push(_.time),p.push(_.morphTarget===v?1:0)}i.push(new es(".morphTargetInfluence["+v+"]",g,p))}l=f.length*r}else{const f=".bones["+t[u].name+"]";n(is,f+".position",d,"pos",i),n(ts,f+".quaternion",d,"rot",i),n(is,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function x_(o){switch(o.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return es;case"vector":case"vector2":case"vector3":case"vector4":return is;case"color":return jc;case"quaternion":return ts;case"bool":case"boolean":return Qi;case"string":return ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+o)}function __(o){if(o.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=x_(o.type);if(o.times===void 0){const t=[],n=[];$c(o.keys,t,n,"value"),o.times=t,o.values=n}return e.parse!==void 0?e.parse(o):new e(o.name,o.times,o.values,o.interpolation)}const ei={enabled:!1,files:{},add:function(o,e){this.enabled!==!1&&(this.files[o]=e)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class Qc{constructor(e,t,n){const i=this;let s=!1,r=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,r,a),s=!0},this.itemEnd=function(h){r++,i.onProgress!==void 0&&i.onProgress(h,r,a),r===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const Zf=new Qc;class Xt{constructor(e){this.manager=e!==void 0?e:Zf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Xt.DEFAULT_MATERIAL_NAME="__DEFAULT";const ti={};class M_ extends Error{constructor(e,t){super(e),this.response=t}}class cn extends Xt{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ei.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(ti[e]!==void 0){ti[e].push({onLoad:t,onProgress:n,onError:i});return}ti[e]=[],ti[e].push({onLoad:t,onProgress:n,onError:i});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=ti[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let v=0;const g=new ReadableStream({start(p){x();function x(){u.read().then(({done:_,value:y})=>{if(_)p.close();else{v+=y.byteLength;const C=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:f});for(let b=0,A=h.length;b<A;b++){const R=h[b];R.onProgress&&R.onProgress(C)}p.enqueue(y),x()}},_=>{p.error(_)})}}});return new Response(g)}else throw new M_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{ei.add(e,c);const h=ti[e];delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=ti[e];if(h===void 0)throw this.manager.itemError(e),c;delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class S_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new cn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=Qs.parse(e[n]);t.push(i)}return t}}class w_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=[],a=new Ua,l=new cn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function h(u){l.load(e[u],function(d){const f=s.parse(d,!0);r[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=ct),a.image=r,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let u=0,d=e.length;u<d;++u)h(u);else l.load(e,function(u){const d=s.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let m=0;m<f;m++){r[m]={mipmaps:[]};for(let v=0;v<d.mipmapCount;v++)r[m].mipmaps.push(d.mipmaps[m*d.mipmapCount+v]),r[m].format=d.format,r[m].width=d.width,r[m].height=d.height}a.image=r}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=ct),a.format=d.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}}class Xr extends Xt{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=ei.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const a=yr("img");function l(){h(),ei.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class b_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=new Tr;s.colorSpace=_t;const r=new Xr(this.manager);r.setCrossOrigin(this.crossOrigin),r.setPath(this.path);let a=0;function l(c){r.load(e[c],function(h){s.images[c]=h,a++,a===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class T_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new vn,a=new cn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?r.image=c.image:c.data!==void 0&&(r.image.width=c.width,r.image.height=c.height,r.image.data=c.data),r.wrapS=c.wrapS!==void 0?c.wrapS:qt,r.wrapT=c.wrapT!==void 0?c.wrapT:qt,r.magFilter=c.magFilter!==void 0?c.magFilter:ct,r.minFilter=c.minFilter!==void 0?c.minFilter:ct,r.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(r.colorSpace=c.colorSpace),c.flipY!==void 0&&(r.flipY=c.flipY),c.format!==void 0&&(r.format=c.format),c.type!==void 0&&(r.type=c.type),c.mipmaps!==void 0&&(r.mipmaps=c.mipmaps,r.minFilter=pn),c.mipmapCount===1&&(r.minFilter=ct),c.generateMipmaps!==void 0&&(r.generateMipmaps=c.generateMipmaps),r.needsUpdate=!0,t&&t(r,c)},n,i),r}}class Kf extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=new vt,r=new Xr(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class ni extends it{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new G(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Qa extends ni{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.groundColor=new G(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const eh=new Ne,$f=new E,Jf=new E;class th{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Z(512,512),this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ar,this._frameExtents=new Z(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;$f.setFromMatrixPosition(e.matrixWorld),t.position.copy($f),Jf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jf),t.updateMatrixWorld(),eh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(eh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(eh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class A_ extends th{constructor(){super(new Ct(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=_s*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class nh extends ni{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new A_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const jf=new Ne,Yr=new E,ih=new E;class E_ extends th{constructor(){super(new Ct(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Z(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Yr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Yr),ih.copy(n.position),ih.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ih),n.updateMatrixWorld(),i.makeTranslation(-Yr.x,-Yr.y,-Yr.z),jf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jf)}}class _i extends ni{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new E_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class C_ extends th{constructor(){super(new Os(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mi extends ni{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.shadow=new C_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qf extends ni{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ep extends ni{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class tp{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new E)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,r=this.coefficients;return t.copy(r[0]).multiplyScalar(.282095),t.addScaledVector(r[1],.488603*i),t.addScaledVector(r[2],.488603*s),t.addScaledVector(r[3],.488603*n),t.addScaledVector(r[4],1.092548*(n*i)),t.addScaledVector(r[5],1.092548*(i*s)),t.addScaledVector(r[6],.315392*(3*s*s-1)),t.addScaledVector(r[7],1.092548*(n*s)),t.addScaledVector(r[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,r=this.coefficients;return t.copy(r[0]).multiplyScalar(.886227),t.addScaledVector(r[1],1.023328*i),t.addScaledVector(r[2],1.023328*s),t.addScaledVector(r[3],1.023328*n),t.addScaledVector(r[4],.858086*n*i),t.addScaledVector(r[5],.858086*i*s),t.addScaledVector(r[6],.743125*s*s-.247708),t.addScaledVector(r[7],.858086*n*s),t.addScaledVector(r[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class np extends ni{constructor(e=new tp,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class el extends Xt{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,r=new cn(s.manager);r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new G().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const r=e.uniforms[s];switch(i.uniforms[s]={},r.type){case"t":i.uniforms[s].value=n(r.value);break;case"c":i.uniforms[s].value=new G().setHex(r.value);break;case"v2":i.uniforms[s].value=new Z().fromArray(r.value);break;case"v3":i.uniforms[s].value=new E().fromArray(r.value);break;case"v4":i.uniforms[s].value=new et().fromArray(r.value);break;case"m3":i.uniforms[s].value=new Xe().fromArray(r.value);break;case"m4":i.uniforms[s].value=new Ne().fromArray(r.value);break;default:i.uniforms[s].value=r.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new Z().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new Z().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return el.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:Nf,SpriteMaterial:Tc,RawShaderMaterial:Ff,ShaderMaterial:Dt,PointsMaterial:qs,MeshPhysicalMaterial:yn,MeshStandardMaterial:lt,MeshPhongMaterial:Of,MeshToonMaterial:Bf,MeshNormalMaterial:zf,MeshLambertMaterial:kf,MeshDepthMaterial:Mc,MeshDistanceMaterial:Sc,MeshBasicMaterial:Ht,MeshMatcapMaterial:Hf,LineDashedMaterial:Gf,LineBasicMaterial:Vt,Material:Rt};return new t[e]}}class Si{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ip extends Ge{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class sp extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new cn(s.manager);r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(e,function(a){try{t(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,m){if(t[m]!==void 0)return t[m];const g=f.interleavedBuffers[m],p=s(f,g.buffer),x=Ms(g.type,p),_=new Cr(x,g.stride);return _.uuid=g.uuid,t[m]=_,_}function s(f,m){if(n[m]!==void 0)return n[m];const g=f.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}const r=e.isInstancedBufferGeometry?new ip:new Ge,a=e.data.index;if(a!==void 0){const f=Ms(a.type,a.array);r.setIndex(new $e(f,1))}const l=e.data.attributes;for(const f in l){const m=l[f];let v;if(m.isInterleavedBufferAttribute){const g=i(e.data,m.data);v=new yi(g,m.itemSize,m.offset,m.normalized)}else{const g=Ms(m.type,m.array),p=m.isInstancedBufferAttribute?qi:$e;v=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(v.name=m.name),m.usage!==void 0&&v.setUsage(m.usage),r.setAttribute(f,v)}const c=e.data.morphAttributes;if(c)for(const f in c){const m=c[f],v=[];for(let g=0,p=m.length;g<p;g++){const x=m[g];let _;if(x.isInterleavedBufferAttribute){const y=i(e.data,x.data);_=new yi(y,x.itemSize,x.offset,x.normalized)}else{const y=Ms(x.type,x.array);_=new $e(y,x.itemSize,x.normalized)}x.name!==void 0&&(_.name=x.name),v.push(_)}r.morphAttributes[f]=v}e.data.morphTargetsRelative&&(r.morphTargetsRelative=!0);const u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let f=0,m=u.length;f!==m;++f){const v=u[f];r.addGroup(v.start,v.count,v.materialIndex)}const d=e.data.boundingSphere;if(d!==void 0){const f=new E;d.center!==void 0&&f.fromArray(d.center),r.boundingSphere=new Nt(f,d.radius)}return e.name&&(r.name=e.name),e.userData&&(r.userData=e.userData),r}}class R_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=this.path===""?Si.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||r;const a=new cn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+e+".",u.message);return}const h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),console.error("THREE.ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?Si.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new cn(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const r=await s.loadAsync(e,t),a=JSON.parse(r),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),r=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,r),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,s,l,a,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let u=!1;for(const d in r)if(r[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),r=this.parseTextures(e.textures,s),a=this.parseMaterials(e.materials,r),l=this.parseObject(e.object,i,a,r,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new $i().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,r=e.length;s<r;s++){const a=new Lr().fromJSON(e[s],i);n[a.uuid]=a}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new sp;for(let s=0,r=e.length;s<r;s++){let a;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in Uf?a=Uf[l.type].fromJSON(l,t):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new el;s.setTextures(t);for(let r=0,a=e.length;r<a;r++){const l=e[r];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=Qs.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function r(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return r(h)}else return l.data?{data:Ms(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new Qc(t);s=new Xr(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){const u=e[c],d=u.url;if(Array.isArray(d)){const f=[];for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a(g);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new vn(p.data,p.width,p.height)))}i[u.uuid]=new Oi(f)}else{const f=a(u.url);i[u.uuid]=new Oi(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(r){if(typeof r=="string"){const a=r,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return r.data?{data:Ms(r.type,r.data),width:r.width,height:r.height}:null}if(e!==void 0&&e.length>0){i=new Xr(this.manager),i.setCrossOrigin(this.crossOrigin);for(let r=0,a=e.length;r<a;r++){const l=e[r],c=l.url;if(Array.isArray(c)){const h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u],m=await s(f);m!==null&&(m instanceof HTMLImageElement?h.push(m):h.push(new vn(m.data,m.width,m.height)))}n[l.uuid]=new Oi(h)}else{const h=await s(l.url);n[l.uuid]=new Oi(h)}}}return n}parseTextures(e,t){function n(s,r){return typeof s=="number"?s:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",s),r[s])}const i={};if(e!==void 0)for(let s=0,r=e.length;s<r;s++){const a=e[s];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const l=t[a.image],c=l.data;let h;Array.isArray(c)?(h=new Tr,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new vn:h=new vt,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,P_)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],rp),h.wrapT=n(a.wrap[1],rp)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,op)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,op)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(e,t,n,i,s){let r;function a(d){return t[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let m=0,v=d.length;m<v;m++){const g=d[m];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(e.type){case"Scene":r=new Hs,e.background!==void 0&&(Number.isInteger(e.background)?r.background=new G(e.background):r.background=c(e.background)),e.environment!==void 0&&(r.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?r.fog=new ya(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(r.fog=new Yi(e.fog.color,e.fog.density)),e.fog.name!==""&&(r.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(r.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(r.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&r.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(r.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&r.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":r=new Ct(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(r.focus=e.focus),e.zoom!==void 0&&(r.zoom=e.zoom),e.filmGauge!==void 0&&(r.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(r.filmOffset=e.filmOffset),e.view!==void 0&&(r.view=Object.assign({},e.view));break;case"OrthographicCamera":r=new Os(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(r.zoom=e.zoom),e.view!==void 0&&(r.view=Object.assign({},e.view));break;case"AmbientLight":r=new Qf(e.color,e.intensity);break;case"DirectionalLight":r=new Mi(e.color,e.intensity),r.target=e.target||"";break;case"PointLight":r=new _i(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":r=new ep(e.color,e.intensity,e.width,e.height);break;case"SpotLight":r=new nh(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),r.target=e.target||"";break;case"HemisphereLight":r=new Qa(e.color,e.groundColor,e.intensity);break;case"LightProbe":r=new np().fromJSON(e);break;case"SkinnedMesh":h=a(e.geometry),u=l(e.material),r=new Rc(h,u),e.bindMode!==void 0&&(r.bindMode=e.bindMode),e.bindMatrix!==void 0&&r.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(r.skeleton=e.skeleton);break;case"Mesh":h=a(e.geometry),u=l(e.material),r=new Y(h,u);break;case"InstancedMesh":h=a(e.geometry),u=l(e.material);const d=e.count,f=e.instanceMatrix,m=e.instanceColor;r=new Pc(h,u,d),r.instanceMatrix=new qi(new Float32Array(f.array),16),m!==void 0&&(r.instanceColor=new qi(new Float32Array(m.array),m.itemSize));break;case"BatchedMesh":h=a(e.geometry),u=l(e.material),r=new uf(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,u),r.geometry=h,r.perObjectFrustumCulled=e.perObjectFrustumCulled,r.sortObjects=e.sortObjects,r._drawRanges=e.drawRanges,r._reservedRanges=e.reservedRanges,r._visibility=e.visibility,r._active=e.active,r._bounds=e.bounds.map(v=>{const g=new zt;g.min.fromArray(v.boxMin),g.max.fromArray(v.boxMax);const p=new Nt;return p.radius=v.sphereRadius,p.center.fromArray(v.sphereCenter),{boxInitialized:v.boxInitialized,box:g,sphereInitialized:v.sphereInitialized,sphere:p}}),r._maxInstanceCount=e.maxInstanceCount,r._maxVertexCount=e.maxVertexCount,r._maxIndexCount=e.maxIndexCount,r._geometryInitialized=e.geometryInitialized,r._geometryCount=e.geometryCount,r._matricesTexture=c(e.matricesTexture.uuid),e.colorsTexture!==void 0&&(r._colorsTexture=c(e.colorsTexture.uuid));break;case"LOD":r=new ef;break;case"Line":r=new On(a(e.geometry),l(e.material));break;case"LineLoop":r=new Nc(a(e.geometry),l(e.material));break;case"LineSegments":r=new En(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":r=new Zs(a(e.geometry),l(e.material));break;case"Sprite":r=new jd(l(e.material));break;case"Group":r=new je;break;case"Bone":r=new ba;break;default:r=new it}if(r.uuid=e.uuid,e.name!==void 0&&(r.name=e.name),e.matrix!==void 0?(r.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(r.matrixAutoUpdate=e.matrixAutoUpdate),r.matrixAutoUpdate&&r.matrix.decompose(r.position,r.quaternion,r.scale)):(e.position!==void 0&&r.position.fromArray(e.position),e.rotation!==void 0&&r.rotation.fromArray(e.rotation),e.quaternion!==void 0&&r.quaternion.fromArray(e.quaternion),e.scale!==void 0&&r.scale.fromArray(e.scale)),e.up!==void 0&&r.up.fromArray(e.up),e.castShadow!==void 0&&(r.castShadow=e.castShadow),e.receiveShadow!==void 0&&(r.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(r.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(r.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(r.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(r.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&r.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(r.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(r.visible=e.visible),e.frustumCulled!==void 0&&(r.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(r.renderOrder=e.renderOrder),e.userData!==void 0&&(r.userData=e.userData),e.layers!==void 0&&(r.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)r.add(this.parseObject(d[f],t,n,i,s))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const m=d[f];r.animations.push(s[m])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(r.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const m=d[f],v=r.getObjectByProperty("uuid",m.object);v!==void 0&&r.addLevel(v,m.distance,m.hysteresis)}}return r}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new it}})}}const P_={UVMapping:lo,CubeReflectionMapping:Gn,CubeRefractionMapping:ci,EquirectangularReflectionMapping:rr,EquirectangularRefractionMapping:or,CubeUVReflectionMapping:ps},rp={RepeatWrapping:hi,ClampToEdgeWrapping:qt,MirroredRepeatWrapping:ms},op={NearestFilter:gt,NearestMipmapNearestFilter:co,NearestMipmapLinearFilter:Ri,LinearFilter:ct,LinearMipmapNearestFilter:gs,LinearMipmapLinearFilter:pn};class ap extends Xt{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=ei.get(e);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return ei.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ei.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});ei.add(e,l),s.manager.itemStart(e)}}let tl;class sh{static getContext(){return tl===void 0&&(tl=new(window.AudioContext||window.webkitAudioContext)),tl}static setContext(e){tl=e}}class I_ extends Xt{constructor(e){super(e)}load(e,t,n,i){const s=this,r=new cn(this.manager);r.setResponseType("arraybuffer"),r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(l){try{const c=l.slice(0);sh.getContext().decodeAudioData(c,function(u){t(u)}).catch(a)}catch(c){a(c)}},n,i);function a(l){i?i(l):console.error(l),s.manager.itemError(e)}}}const lp=new Ne,cp=new Ne,ss=new Ne;class L_{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Ct,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Ct,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,ss.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,r=t.near*Math.tan(Fi*t.fov*.5)/t.zoom;let a,l;cp.elements[12]=-i,lp.elements[12]=i,a=-r*t.aspect+s,l=r*t.aspect+s,ss.elements[0]=2*t.near/(l-a),ss.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(ss),a=-r*t.aspect-s,l=r*t.aspect-s,ss.elements[0]=2*t.near/(l-a),ss.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(ss)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(cp),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(lp)}}class hp{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=up(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=up();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function up(){return performance.now()}const rs=new E,dp=new Bt,D_=new E,os=new E;class U_ extends it{constructor(){super(),this.type="AudioListener",this.context=sh.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new hp}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(rs,dp,D_),os.set(0,0,-1).applyQuaternion(dp),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(rs.x,i),t.positionY.linearRampToValueAtTime(rs.y,i),t.positionZ.linearRampToValueAtTime(rs.z,i),t.forwardX.linearRampToValueAtTime(os.x,i),t.forwardY.linearRampToValueAtTime(os.y,i),t.forwardZ.linearRampToValueAtTime(os.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(rs.x,rs.y,rs.z),t.setOrientation(os.x,os.y,os.z,n.x,n.y,n.z)}}class fp extends it{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const as=new E,pp=new Bt,N_=new E,ls=new E;class F_ extends fp{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(as,pp,N_),ls.set(0,0,1).applyQuaternion(pp);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(as.x,n),t.positionY.linearRampToValueAtTime(as.y,n),t.positionZ.linearRampToValueAtTime(as.z,n),t.orientationX.linearRampToValueAtTime(ls.x,n),t.orientationY.linearRampToValueAtTime(ls.y,n),t.orientationZ.linearRampToValueAtTime(ls.z,n)}else t.setPosition(as.x,as.y,as.z),t.setOrientation(ls.x,ls.y,ls.z)}}class O_{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class mp{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,r;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,r=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,r=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,r=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=r,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let r=this.cumulativeWeight;if(r===0){for(let a=0;a!==i;++a)n[s+a]=n[a];r=t}else{r+=t;const a=t/r;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=r}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}r>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,r=i;s!==r;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let r=0;r!==s;++r)e[t+r]=e[n+r]}_slerp(e,t,n,i){Bt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const r=this._workIndex*s;Bt.multiplyQuaternionsFlat(e,r,e,t,e,n),Bt.slerpFlat(e,t,e,t,e,r,i)}_lerp(e,t,n,i,s){const r=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*r+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let r=0;r!==s;++r){const a=t+r;e[a]=e[a]+e[n+r]*i}}}const rh="\\[\\]\\.:\\/",B_=new RegExp("["+rh+"]","g"),oh="[^"+rh+"]",z_="[^"+rh.replace("\\.","")+"]",k_=/((?:WC+[\/:])*)/.source.replace("WC",oh),H_=/(WCOD+)?/.source.replace("WCOD",z_),G_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",oh),V_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",oh),W_=new RegExp("^"+k_+H_+G_+V_+"$"),X_=["material","materials","bones","map"];class Y_{constructor(e,t,n){const i=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class rt{constructor(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(B_,"")}static parseTrackName(e){const t=W_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);X_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let r=0;r<s.length;r++){const a=s[r];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[i];if(r===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=Y_,rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray],rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class q_{constructor(){this.isAnimationObjectGroup=!0,this.uuid=rn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,r=s.length;let a,l=e.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let m=t[f];if(m===void 0){m=l++,t[f]=m,e.push(d);for(let v=0,g=r;v!==g;++v)s[v].push(new rt(d,n[v],i[v]))}else if(m<c){a=e[m];const v=--c,g=e[v];t[g.uuid]=m,e[m]=g,t[f]=v,e[v]=d;for(let p=0,x=r;p!==x;++p){const _=s[p],y=_[v];let C=_[m];_[m]=y,C===void 0&&(C=new rt(d,n[p],i[p])),_[v]=C}}else e[m]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let r=0,a=arguments.length;r!==a;++r){const l=arguments[r],c=l.uuid,h=t[c];if(h!==void 0&&h>=s){const u=s++,d=e[u];t[d.uuid]=h,e[h]=d,t[c]=u,e[u]=l;for(let f=0,m=i;f!==m;++f){const v=n[f],g=v[u],p=v[h];v[h]=g,v[u]=p}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,r=e.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],h=c.uuid,u=t[h];if(u!==void 0)if(delete t[h],u<s){const d=--s,f=e[d],m=--r,v=e[m];t[f.uuid]=u,e[u]=f,t[v.uuid]=d,e[d]=v,e.pop();for(let g=0,p=i;g!==p;++g){const x=n[g],_=x[d],y=x[m];x[u]=_,x[d]=y,x.pop()}}else{const d=--r,f=e[d];d>0&&(t[f.uuid]=u),e[u]=f,e.pop();for(let m=0,v=i;m!==v;++m){const g=n[m];g[u]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const r=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=s.length,n[e]=i,r.push(e),a.push(t),s.push(u);for(let d=h,f=l.length;d!==f;++d){const m=l[d];u[d]=new rt(m,e,t)}return u}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,r=this._bindings,a=r.length-1,l=r[a],c=e[a];t[c]=n,r[n]=l,r.pop(),s[n]=s[a],s.pop(),i[n]=i[a],i.pop()}}}class gp{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,r=s.length,a=new Array(r),l={endingStart:Di,endingEnd:Di};for(let c=0;c!==r;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Cu,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,r=s/i,a=i/s;e.warp(1,r,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,r=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/r,c[1]=t/r,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const r=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Ol:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulateAdditive(a);break;case Wo:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const r=n===Ru;if(e===0)return s===-1?i:r&&(s&1)===1?t-i:i;if(n===Eu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,r)):this._setEndings(this.repetitions===0,!0,r)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,r)}else this._setEndings(!1,!1,r);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(r&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ui,i.endingEnd=Ui):(e?i.endingStart=this.zeroSlopeAtStart?Ui:Di:i.endingStart=fr,t?i.endingEnd=this.zeroSlopeAtEnd?Ui:Di:i.endingEnd=fr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let r=this._weightInterpolant;r===null&&(r=i._lendControlInterpolant(),this._weightInterpolant=r);const a=r.parameterPositions,l=r.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const Z_=new Float32Array(1);class K_ extends Fn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,r=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let m=h[f];if(m!==void 0)++m.referenceCount,r[u]=m;else{if(m=r[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const v=t&&t._propertyBindings[u].binding.parsedPath;m=new mp(rt.create(n,f,v),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),r[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let r=s[t];if(r===void 0)r={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=r;else{const a=r.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),r.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,r=this._actionsByClip,a=r[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete r[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let r=i[t];r===void 0&&(r={},i[t]=r),r[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,r=this._bindingsByRootAndName,a=r[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete r[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Jc(new Float32Array(2),new Float32Array(2),1,Z_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let r=typeof e=="string"?Qs.findByName(i,e):e;const a=r!==null?r.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(r!==null?n=r.blendMode:n=Wo),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],r===null&&(r=c._clip)}if(r===null)return null;const h=new gp(this,r,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Qs.findByName(n,e):e,r=s?s.uuid:e,a=this._actionsByClip[r];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),r=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,r);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(r);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const r=s.knownActions;for(let a=0,l=r.length;a!==l;++a){const c=r[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const r in n){const a=n[r].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const r in s){const a=s[r];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class ah{constructor(e){this.value=e}clone(){return new ah(this.value.clone===void 0?this.value:this.value.clone())}}let $_=0;class J_ extends Fn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:$_++}),this.name="",this.usage=mr,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let r=0;r<s.length;r++)this.uniforms.push(s[r].clone())}return this}clone(){return new this.constructor().copy(this)}}class j_ extends Cr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class Q_{constructor(e,t,n,i,s){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const vp=new Ne;class yp{constructor(e,t,n=0,i=1/0){this.ray=new Es(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Qo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vp),this}intersectObject(e,t=!0,n=[]){return lh(e,this,n,t),n.sort(xp),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)lh(e[i],this,n,t);return n.sort(xp),n}}function xp(o,e){return o.distance-e.distance}function lh(o,e,t,n){let i=!0;if(o.layers.test(e.layers)&&o.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=o.children;for(let r=0,a=s.length;r<a;r++)lh(s[r],e,t,!0)}}class eM{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(St(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class tM{constructor(e=1,t=0,n=0){return this.radius=e,this.theta=t,this.y=n,this}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}class ch{constructor(e,t,n,i){ch.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}}const _p=new Z;class nM{constructor(e=new Z(1/0,1/0),t=new Z(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=_p.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_p).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Mp=new E,nl=new E;class iM{constructor(e=new E,t=new E){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Mp.subVectors(e,this.start),nl.subVectors(this.end,this.start);const n=nl.dot(nl);let s=nl.dot(Mp)/n;return t&&(s=St(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Sp=new E;class sM extends it{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new Ge,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let r=0,a=1,l=32;r<l;r++,a++){const c=r/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Ae(i,3));const s=new Vt({fog:!1,toneMapped:!1});this.cone=new En(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Sp.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Sp),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const wi=new E,il=new Ne,hh=new Ne;class rM extends En{constructor(e){const t=wp(e),n=new Ge,i=[],s=[],r=new G(0,0,1),a=new G(0,1,0);for(let c=0;c<t.length;c++){const h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(r.r,r.g,r.b),s.push(a.r,a.g,a.b))}n.setAttribute("position",new Ae(i,3)),n.setAttribute("color",new Ae(s,3));const l=new Vt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");hh.copy(this.root.matrixWorld).invert();for(let s=0,r=0;s<t.length;s++){const a=t[s];a.parent&&a.parent.isBone&&(il.multiplyMatrices(hh,a.matrixWorld),wi.setFromMatrixPosition(il),i.setXYZ(r,wi.x,wi.y,wi.z),il.multiplyMatrices(hh,a.parent.matrixWorld),wi.setFromMatrixPosition(il),i.setXYZ(r+1,wi.x,wi.y,wi.z),r+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function wp(o){const e=[];o.isBone===!0&&e.push(o);for(let t=0;t<o.children.length;t++)e.push.apply(e,wp(o.children[t]));return e}class oM extends Y{constructor(e,t,n){const i=new Wt(t,4,2),s=new Ht({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const aM=new E,bp=new G,Tp=new G;class lM extends it{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Qn(t);i.rotateY(Math.PI*.5),this.material=new Ht({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),r=new Float32Array(s.count*3);i.setAttribute("color",new $e(r,3)),this.add(new Y(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");bp.copy(this.light.color),Tp.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?bp:Tp;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(aM.setFromMatrixPosition(this.light.matrixWorld).negate())}}class cM extends En{constructor(e=10,t=10,n=4473924,i=8947848){n=new G(n),i=new G(i);const s=t/2,r=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,m=-a;d<=t;d++,m+=r){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);const v=d===s?n:i;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const h=new Ge;h.setAttribute("position",new Ae(l,3)),h.setAttribute("color",new Ae(c,3));const u=new Vt({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class hM extends En{constructor(e=10,t=16,n=8,i=64,s=4473924,r=8947848){s=new G(s),r=new G(r);const a=[],l=[];if(t>1)for(let u=0;u<t;u++){const d=u/t*(Math.PI*2),f=Math.sin(d)*e,m=Math.cos(d)*e;a.push(0,0,0),a.push(f,0,m);const v=u&1?s:r;l.push(v.r,v.g,v.b),l.push(v.r,v.g,v.b)}for(let u=0;u<n;u++){const d=u&1?s:r,f=e-e/n*u;for(let m=0;m<i;m++){let v=m/i*(Math.PI*2),g=Math.sin(v)*f,p=Math.cos(v)*f;a.push(g,0,p),l.push(d.r,d.g,d.b),v=(m+1)/i*(Math.PI*2),g=Math.sin(v)*f,p=Math.cos(v)*f,a.push(g,0,p),l.push(d.r,d.g,d.b)}}const c=new Ge;c.setAttribute("position",new Ae(a,3)),c.setAttribute("color",new Ae(l,3));const h=new Vt({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Ap=new E,sl=new E,Ep=new E;class uM extends it{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new Ge;i.setAttribute("position",new Ae([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new Vt({fog:!1,toneMapped:!1});this.lightPlane=new On(i,s),this.add(this.lightPlane),i=new Ge,i.setAttribute("position",new Ae([0,0,0,0,0,1],3)),this.targetLine=new On(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Ap.setFromMatrixPosition(this.light.matrixWorld),sl.setFromMatrixPosition(this.light.target.matrixWorld),Ep.subVectors(sl,Ap),this.lightPlane.lookAt(sl),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(sl),this.targetLine.scale.z=Ep.length()}}const rl=new E,wt=new ha;class dM extends En{constructor(e){const t=new Ge,n=new Vt({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],r={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(m,v){l(m),l(v)}function l(m){i.push(0,0,0),s.push(0,0,0),r[m]===void 0&&(r[m]=[]),r[m].push(i.length/3-1)}t.setAttribute("position",new Ae(i,3)),t.setAttribute("color",new Ae(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=r,this.update();const c=new G(16755200),h=new G(16711680),u=new G(43775),d=new G(16777215),f=new G(3355443);this.setColors(c,h,u,d,f)}setColors(e,t,n,i,s){const a=this.geometry.getAttribute("color");a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,s.r,s.g,s.b),a.setXYZ(41,s.r,s.g,s.b),a.setXYZ(42,s.r,s.g,s.b),a.setXYZ(43,s.r,s.g,s.b),a.setXYZ(44,s.r,s.g,s.b),a.setXYZ(45,s.r,s.g,s.b),a.setXYZ(46,s.r,s.g,s.b),a.setXYZ(47,s.r,s.g,s.b),a.setXYZ(48,s.r,s.g,s.b),a.setXYZ(49,s.r,s.g,s.b),a.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;wt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),Tt("c",t,e,wt,0,0,-1),Tt("t",t,e,wt,0,0,1),Tt("n1",t,e,wt,-n,-i,-1),Tt("n2",t,e,wt,n,-i,-1),Tt("n3",t,e,wt,-n,i,-1),Tt("n4",t,e,wt,n,i,-1),Tt("f1",t,e,wt,-n,-i,1),Tt("f2",t,e,wt,n,-i,1),Tt("f3",t,e,wt,-n,i,1),Tt("f4",t,e,wt,n,i,1),Tt("u1",t,e,wt,n*.7,i*1.1,-1),Tt("u2",t,e,wt,-n*.7,i*1.1,-1),Tt("u3",t,e,wt,0,i*2,-1),Tt("cf1",t,e,wt,-n,0,1),Tt("cf2",t,e,wt,n,0,1),Tt("cf3",t,e,wt,0,-i,1),Tt("cf4",t,e,wt,0,i,1),Tt("cn1",t,e,wt,-n,0,-1),Tt("cn2",t,e,wt,n,0,-1),Tt("cn3",t,e,wt,0,-i,-1),Tt("cn4",t,e,wt,0,i,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Tt(o,e,t,n,i,s,r){rl.set(i,s,r).unproject(n);const a=e[o];if(a!==void 0){const l=t.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],rl.x,rl.y,rl.z)}}const ol=new zt;class fM extends En{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),s=new Ge;s.setIndex(new $e(n,1)),s.setAttribute("position",new $e(i,3)),super(s,new Vt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(e!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&ol.setFromObject(this.object),ol.isEmpty())return;const t=ol.min,n=ol.max,i=this.geometry.attributes.position,s=i.array;s[0]=n.x,s[1]=n.y,s[2]=n.z,s[3]=t.x,s[4]=n.y,s[5]=n.z,s[6]=t.x,s[7]=t.y,s[8]=n.z,s[9]=n.x,s[10]=t.y,s[11]=n.z,s[12]=n.x,s[13]=n.y,s[14]=t.z,s[15]=t.x,s[16]=n.y,s[17]=t.z,s[18]=t.x,s[19]=t.y,s[20]=t.z,s[21]=n.x,s[22]=t.y,s[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class pM extends En{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new Ge;s.setIndex(new $e(n,1)),s.setAttribute("position",new Ae(i,3)),super(s,new Vt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class mM extends On{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],r=new Ge;r.setAttribute("position",new Ae(s,3)),r.computeBoundingSphere(),super(r,new Vt({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new Ge;l.setAttribute("position",new Ae(a,3)),l.computeBoundingSphere(),this.add(new Y(l,new Ht({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Cp=new E;let al,uh;class gM extends it{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,i=16776960,s=n*.2,r=s*.2){super(),this.type="ArrowHelper",al===void 0&&(al=new Ge,al.setAttribute("position",new Ae([0,0,0,0,1,0],3)),uh=new Jt(0,.5,1,5,1),uh.translate(0,-.5,0)),this.position.copy(t),this.line=new On(al,new Vt({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Y(uh,new Ht({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Cp.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Cp,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class vM extends En{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ge;i.setAttribute("position",new Ae(t,3)),i.setAttribute("color",new Ae(n,3));const s=new Vt({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new G,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class yM{constructor(){this.type="ShapePath",this.color=new G,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new zr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,r){return this.currentPath.bezierCurveTo(e,t,n,i,s,r),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const x=[];for(let _=0,y=p.length;_<y;_++){const C=p[_],b=new $i;b.curves=C.curves,x.push(b)}return x}function n(p,x){const _=x.length;let y=!1;for(let C=_-1,b=0;b<_;C=b++){let A=x[C],R=x[b],S=R.x-A.x,M=R.y-A.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(A=x[b],S=-S,R=x[C],M=-M),p.y<A.y||p.y>R.y)continue;if(p.y===A.y){if(p.x===A.x)return!0}else{const L=M*(p.x-A.x)-S*(p.y-A.y);if(L===0)return!0;if(L<0)continue;y=!y}}else{if(p.y!==A.y)continue;if(R.x<=p.x&&p.x<=A.x||A.x<=p.x&&p.x<=R.x)return!0}}return y}const i=Bn.isClockWise,s=this.subPaths;if(s.length===0)return[];let r,a,l;const c=[];if(s.length===1)return a=s[0],l=new $i,l.curves=a.curves,c.push(l),c;let h=!i(s[0].getPoints());h=e?!h:h;const u=[],d=[];let f=[],m=0,v;d[m]=void 0,f[m]=[];for(let p=0,x=s.length;p<x;p++)a=s[p],v=a.getPoints(),r=i(v),r=e?!r:r,r?(!h&&d[m]&&m++,d[m]={s:new $i,p:v},d[m].s.curves=a.curves,h&&m++,f[m]=[]):f[m].push({h:a,p:v[0]});if(!d[0])return t(s);if(d.length>1){let p=!1,x=0;for(let _=0,y=d.length;_<y;_++)u[_]=[];for(let _=0,y=d.length;_<y;_++){const C=f[_];for(let b=0;b<C.length;b++){const A=C[b];let R=!0;for(let S=0;S<d.length;S++)n(A.p,d[S].p)&&(_!==S&&x++,R?(R=!1,u[S].push(A)):p=!0);R&&u[_].push(A)}}x>0&&p===!1&&(f=u)}let g;for(let p=0,x=d.length;p<x;p++){l=d[p].s,c.push(l),g=f[p];for(let _=0,y=g.length;_<y;_++)l.holes.push(g[_].h)}return c}}class xM extends Fn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class _M extends Qt{constructor(e=1,t=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(e,t,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fn}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fn);const Rp=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Su,AddEquation:li,AddOperation:yu,AdditiveAnimationBlendMode:Ol,AdditiveBlending:bl,AgXToneMapping:bu,AlphaFormat:Il,AlwaysCompare:ku,AlwaysDepth:no,AlwaysStencilFunc:zl,AmbientLight:Qf,AnimationAction:gp,AnimationClip:Qs,AnimationLoader:S_,AnimationMixer:K_,AnimationObjectGroup:q_,AnimationUtils:y_,ArcCurve:xf,ArrayCamera:qd,ArrowHelper:gM,AttachedBindMode:El,Audio:fp,AudioAnalyser:O_,AudioContext:sh,AudioListener:U_,AudioLoader:I_,AxesHelper:vM,BackSide:Ft,BasicDepthPacking:Iu,BasicShadowMap:tm,BatchedMesh:uf,Bone:ba,BooleanKeyframeTrack:Qi,Box2:nM,Box3:zt,Box3Helper:pM,BoxGeometry:he,BoxHelper:fM,BufferAttribute:$e,BufferGeometry:Ge,BufferGeometryLoader:sp,ByteType:Cl,Cache:ei,Camera:ha,CameraHelper:dM,CanvasTexture:yf,CapsuleGeometry:Ba,CatmullRomCurve3:_f,CineonToneMapping:Mu,CircleGeometry:Hr,ClampToEdgeWrapping:qt,Clock:hp,Color:G,ColorKeyframeTrack:jc,ColorManagement:Qe,CompressedArrayTexture:Hx,CompressedCubeTexture:Gx,CompressedTexture:Ua,CompressedTextureLoader:w_,ConeGeometry:za,ConstantAlphaFactor:mu,ConstantColorFactor:fu,Controls:xM,CubeCamera:gd,CubeReflectionMapping:Gn,CubeRefractionMapping:ci,CubeTexture:Tr,CubeTextureLoader:b_,CubeUVReflectionMapping:ps,CubicBezierCurve:Hc,CubicBezierCurve3:Sf,CubicInterpolant:Xf,CullFaceBack:Ml,CullFaceFront:jh,CullFaceFrontBack:em,CullFaceNone:Jh,Curve:Cn,CurvePath:bf,CustomBlending:Qh,CustomToneMapping:wu,CylinderGeometry:Jt,Cylindrical:tM,Data3DTexture:Xl,DataArrayTexture:Yo,DataTexture:vn,DataTextureLoader:T_,DataUtils:ug,DecrementStencilOp:dm,DecrementWrapStencilOp:pm,DefaultLoadingManager:Zf,DepthFormat:Ii,DepthStencilFormat:Li,DepthTexture:pa,DetachedBindMode:Au,DirectionalLight:Mi,DirectionalLightHelper:uM,DiscreteInterpolant:Yf,DodecahedronGeometry:ka,DoubleSide:Mn,DstAlphaFactor:lu,DstColorFactor:hu,DynamicCopyUsage:Rm,DynamicDrawUsage:wm,DynamicReadUsage:Am,EdgesGeometry:Tf,EllipseCurve:Na,EqualCompare:Fu,EqualDepth:so,EqualStencilFunc:ym,EquirectangularReflectionMapping:rr,EquirectangularRefractionMapping:or,Euler:an,EventDispatcher:Fn,ExtrudeGeometry:qa,FileLoader:cn,Float16BufferAttribute:vg,Float32BufferAttribute:Ae,FloatType:jt,Fog:ya,FogExp2:Yi,FramebufferTexture:kx,FrontSide:Dn,Frustum:Ar,GLBufferAttribute:Q_,GLSL1:Im,GLSL3:Hl,GreaterCompare:Ou,GreaterDepth:oo,GreaterEqualCompare:zu,GreaterEqualDepth:ro,GreaterEqualStencilFunc:Sm,GreaterStencilFunc:_m,GridHelper:cM,Group:je,HalfFloatType:Vn,HemisphereLight:Qa,HemisphereLightHelper:lM,IcosahedronGeometry:Za,ImageBitmapLoader:ap,ImageLoader:Xr,ImageUtils:Ju,IncrementStencilOp:um,IncrementWrapStencilOp:fm,InstancedBufferAttribute:qi,InstancedBufferGeometry:ip,InstancedInterleavedBuffer:j_,InstancedMesh:Pc,Int16BufferAttribute:mg,Int32BufferAttribute:gg,Int8BufferAttribute:dg,IntType:ho,InterleavedBuffer:Cr,InterleavedBufferAttribute:yi,Interpolant:js,InterpolateDiscrete:ys,InterpolateLinear:xs,InterpolateSmooth:Vo,InvertStencilOp:mm,KeepStencilOp:Ni,KeyframeTrack:Rn,LOD:ef,LatheGeometry:kr,Layers:Qo,LessCompare:Nu,LessDepth:io,LessEqualCompare:kl,LessEqualDepth:Ci,LessEqualStencilFunc:xm,LessStencilFunc:vm,Light:ni,LightProbe:np,Line:On,Line3:iM,LineBasicMaterial:Vt,LineCurve:Gc,LineCurve3:wf,LineDashedMaterial:Gf,LineLoop:Nc,LineSegments:En,LinearFilter:ct,LinearInterpolant:Jc,LinearMipMapLinearFilter:rm,LinearMipMapNearestFilter:sm,LinearMipmapLinearFilter:pn,LinearMipmapNearestFilter:gs,LinearSRGBColorSpace:Ut,LinearToneMapping:xu,LinearTransfer:pr,Loader:Xt,LoaderUtils:Si,LoadingManager:Qc,LoopOnce:Eu,LoopPingPong:Ru,LoopRepeat:Cu,LuminanceAlphaFormat:Ul,LuminanceFormat:Dl,MOUSE:fs,Material:Rt,MaterialLoader:el,MathUtils:Gu,Matrix2:ch,Matrix3:Xe,Matrix4:Ne,MaxEquation:iu,Mesh:Y,MeshBasicMaterial:Ht,MeshDepthMaterial:Mc,MeshDistanceMaterial:Sc,MeshLambertMaterial:kf,MeshMatcapMaterial:Hf,MeshNormalMaterial:zf,MeshPhongMaterial:Of,MeshPhysicalMaterial:yn,MeshStandardMaterial:lt,MeshToonMaterial:Bf,MinEquation:nu,MirroredRepeatWrapping:ms,MixOperation:vu,MultiplyBlending:Al,MultiplyOperation:sr,NearestFilter:gt,NearestMipMapLinearFilter:im,NearestMipMapNearestFilter:nm,NearestMipmapLinearFilter:Ri,NearestMipmapNearestFilter:co,NeutralToneMapping:Tu,NeverCompare:Uu,NeverDepth:to,NeverStencilFunc:gm,NoBlending:kn,NoColorSpace:Wn,NoToneMapping:Hn,NormalAnimationBlendMode:Wo,NormalBlending:ai,NotEqualCompare:Bu,NotEqualDepth:ao,NotEqualStencilFunc:Mm,NumberKeyframeTrack:es,Object3D:it,ObjectLoader:R_,ObjectSpaceNormalMap:Du,OctahedronGeometry:Qn,OneFactor:ru,OneMinusConstantAlphaFactor:gu,OneMinusConstantColorFactor:pu,OneMinusDstAlphaFactor:cu,OneMinusDstColorFactor:uu,OneMinusSrcAlphaFactor:eo,OneMinusSrcColorFactor:au,OrthographicCamera:Os,PCFShadowMap:Sl,PCFSoftShadowMap:wl,PMREMGenerator:vc,Path:zr,PerspectiveCamera:Ct,Plane:jn,PlaneGeometry:Tn,PlaneHelper:mM,PointLight:_i,PointLightHelper:oM,Points:Zs,PointsMaterial:qs,PolarGridHelper:hM,PolyhedronGeometry:xi,PositionalAudio:F_,PropertyBinding:rt,PropertyMixer:mp,QuadraticBezierCurve:Vc,QuadraticBezierCurve3:Wc,Quaternion:Bt,QuaternionKeyframeTrack:ts,QuaternionLinearInterpolant:qf,RED_GREEN_RGTC2_Format:Ho,RED_RGTC1_Format:Fl,REVISION:fn,RGBADepthPacking:Lu,RGBAFormat:At,RGBAIntegerFormat:go,RGBA_ASTC_10x10_Format:No,RGBA_ASTC_10x5_Format:Lo,RGBA_ASTC_10x6_Format:Do,RGBA_ASTC_10x8_Format:Uo,RGBA_ASTC_12x10_Format:Fo,RGBA_ASTC_12x12_Format:Oo,RGBA_ASTC_4x4_Format:bo,RGBA_ASTC_5x4_Format:To,RGBA_ASTC_5x5_Format:Ao,RGBA_ASTC_6x5_Format:Eo,RGBA_ASTC_6x6_Format:Co,RGBA_ASTC_8x5_Format:Ro,RGBA_ASTC_8x6_Format:Po,RGBA_ASTC_8x8_Format:Io,RGBA_BPTC_Format:dr,RGBA_ETC2_EAC_Format:wo,RGBA_PVRTC_2BPPV1_Format:_o,RGBA_PVRTC_4BPPV1_Format:xo,RGBA_S3TC_DXT1_Format:cr,RGBA_S3TC_DXT3_Format:hr,RGBA_S3TC_DXT5_Format:ur,RGBDepthPacking:am,RGBFormat:Ll,RGBIntegerFormat:om,RGB_BPTC_SIGNED_Format:Bo,RGB_BPTC_UNSIGNED_Format:zo,RGB_ETC1_Format:Mo,RGB_ETC2_Format:So,RGB_PVRTC_2BPPV1_Format:yo,RGB_PVRTC_4BPPV1_Format:vo,RGB_S3TC_DXT1_Format:lr,RGDepthPacking:lm,RGFormat:Nl,RGIntegerFormat:mo,RawShaderMaterial:Ff,Ray:Es,Raycaster:yp,RectAreaLight:ep,RedFormat:po,RedIntegerFormat:ar,ReinhardToneMapping:_u,RenderTarget:ju,RepeatWrapping:hi,ReplaceStencilOp:hm,ReverseSubtractEquation:tu,RingGeometry:$s,SIGNED_RED_GREEN_RGTC2_Format:Go,SIGNED_RED_RGTC1_Format:ko,SRGBColorSpace:_t,SRGBTransfer:dt,Scene:Hs,ShaderChunk:qe,ShaderLib:An,ShaderMaterial:Dt,ShadowMaterial:Nf,Shape:$i,ShapeGeometry:Ka,ShapePath:yM,ShapeUtils:Bn,ShortType:Rl,Skeleton:Lr,SkeletonHelper:rM,SkinnedMesh:Rc,Source:Oi,Sphere:Nt,SphereGeometry:Wt,Spherical:eM,SphericalHarmonics3:tp,SplineCurve:Xc,SpotLight:nh,SpotLightHelper:sM,Sprite:jd,SpriteMaterial:Tc,SrcAlphaFactor:Qr,SrcAlphaSaturateFactor:du,SrcColorFactor:ou,StaticCopyUsage:Cm,StaticDrawUsage:mr,StaticReadUsage:Tm,StereoCamera:L_,StreamCopyUsage:Pm,StreamDrawUsage:bm,StreamReadUsage:Em,StringKeyframeTrack:ns,SubtractEquation:eu,SubtractiveBlending:Tl,TOUCH:Qp,TangentSpaceNormalMap:ui,TetrahedronGeometry:$a,Texture:vt,TextureLoader:Kf,TextureUtils:_x,TorusGeometry:Js,TorusKnotGeometry:Ja,Triangle:en,TriangleFanDrawMode:Xo,TriangleStripDrawMode:Bl,TrianglesDrawMode:Pu,TubeGeometry:ja,UVMapping:lo,Uint16BufferAttribute:ac,Uint32BufferAttribute:lc,Uint8BufferAttribute:fg,Uint8ClampedBufferAttribute:pg,Uniform:ah,UniformsGroup:J_,UniformsLib:de,UniformsUtils:fd,UnsignedByteType:mn,UnsignedInt248Type:Pi,UnsignedInt5999Type:Pl,UnsignedIntType:Un,UnsignedShort4444Type:uo,UnsignedShort5551Type:fo,UnsignedShortType:vs,VSMShadowMap:Ln,Vector2:Z,Vector3:E,Vector4:et,VectorKeyframeTrack:is,VideoTexture:zx,WebGL3DRenderTarget:tg,WebGLArrayRenderTarget:eg,WebGLCoordinateSystem:Nn,WebGLCubeRenderTarget:vd,WebGLMultipleRenderTargets:_M,WebGLRenderTarget:Qt,WebGLRenderer:Zd,WebGLUtils:Yd,WebGPUCoordinateSystem:gr,WireframeGeometry:Lf,WrapAroundEnding:fr,ZeroCurvatureEnding:Di,ZeroFactor:su,ZeroSlopeEnding:Ui,ZeroStencilOp:cm,createCanvasElement:Wu},Symbol.toStringTag,{value:"Module"}));class ll{constructor(){F(this,"name","AnimationSystem")}update(e,{dt:t,elapsed:n}){const i=e.query("Transform","AnimationState");for(const s of i){const r=e.getComponent(s,"Transform"),a=e.getComponent(s,"AnimationState"),l=e.getComponent(s,"Velocity"),c=e.getComponent(s,"NavigationTarget");a.excitement=Math.max(0,a.excitement-t*1.6);const h=l?Math.hypot(l.vx,l.vz):0,u=!!(c&&c.active||h>.08);a.isMoving=u;const d=a.locomotionBlend??0,f=1-Math.exp(-11*t),m=d+((u?1:0)-d)*f,v=!u&&m<.001?0:m;a.locomotionBlend=v;const g=3.4+Math.min(h,5)*1.85,p=(a.stridePhase??0)+(v>.001?t*g:0);a.stridePhase=p;const x=!!(a.parts&&(a.parts.leftArm||a.parts.rightArm)),_=n*a.bobFrequency+a.phase,y=1+a.excitement*.65;if(x){const C=Math.sin(_)*a.bobAmplitude*(1-v*.7),b=Math.abs(Math.sin(p))*.055*v;r.y=a.baseY+C+b}else a.bobAmplitude>0&&(r.y=a.baseY+Math.sin(_*y)*a.bobAmplitude);if(a.breatheAmplitude>0){const C=x?1-v*.6:1,b=Math.sin(n*2.1+a.phase)*a.breatheAmplitude*C;r.scaleY=1+b,r.scaleX=1-b*.45,r.scaleZ=1-b*.45}if(a.parts)if(x){const C=Math.sin(p)*.56*v,b=Math.sin(p)*.44*v,A=Math.sin(n*1.55+a.phase)*.03*(1-v);if(a.parts.leftFoot&&(a.parts.leftFoot.rotation.x=C),a.parts.rightFoot&&(a.parts.rightFoot.rotation.x=-C),a.parts.leftArm&&(a.parts.leftArm.rotation.x=-b+A*.6,a.parts.leftArm.rotation.z=.09+Math.sin(n*1.2+a.phase)*.018),a.parts.rightArm&&(a.parts.rightArm.rotation.x=b-A,a.parts.rightArm.rotation.z=-.1-Math.cos(n*1.35+a.phase)*.018),a.parts.rightForearm){const R=Math.max(0,-Math.sin(p))*.3*v,S=Math.sin(n*1.85+a.phase)*.035*(1-v);a.parts.rightForearm.rotation.x=-.24-R-S}if(a.parts.head&&(a.parts.head.rotation.x=.05*v,a.parts.head.rotation.z=Math.sin(n*1.25+a.phase)*.025*(1-v)),a.parts.coatTail){const R=.1+.06*Math.sin(n*1.15);a.parts.coatTail.rotation.x=.14+v*.22+Math.sin(p*2)*.075*v+Math.sin(n*3.2+a.phase)*.045*(1-v)+R*.4,a.parts.coatTail.rotation.z=-.04-Math.cos(n*2.6+a.phase)*.04}}else{const C=Math.sin(n*(2.6+a.excitement*4.5)+a.phase)*(.08+a.excitement*.22);if(a.parts.leftWing&&(a.parts.leftWing.rotation.z=.28+C),a.parts.rightWing&&(a.parts.rightWing.rotation.z=-.28-C),a.parts.head&&(a.parts.head.rotation.z=Math.sin(n*1.4+a.phase)*.045),a.parts.leftFoot&&(a.parts.leftFoot.rotation.x=Math.sin(n*2.4+a.phase)*.06),a.parts.rightFoot&&(a.parts.rightFoot.rotation.x=-Math.sin(n*2.4+a.phase)*.06),a.parts.orbitRing&&(a.parts.orbitRing.rotation.x=Math.sin(n*.7)*.45+.6,a.parts.orbitRing.rotation.y=-n*.55),a.parts.coatTail){const b=.14+.08*Math.sin(n*1.15);a.parts.coatTail.rotation.x=.18+Math.sin(n*4.2+a.phase)*.09+b*.5,a.parts.coatTail.rotation.z=-.08-Math.cos(n*3.1+a.phase)*.065}}}}}const dh={background:"#0C1217",warmLight:"#4A7C7E",warmCore:"#8A99A6",coolAmbient:"#6E7B87",foliageAccent:"#2A3540",cursorLight:"#6E7B87"},fh=" .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",cl={mode:"playground",mapId:"cyberpunk-citadel",atmosphere:"night",fov:106,enableKeyboard:!1,pauseOffscreen:!0,palette:{...dh},cellSize:8,autoResponsiveDensity:!0,characterRamp:fh,structuralChars:"/\\|_[]",edgeStrength:.96,blockBlendWeight:.35,windStrength:1,bloomIntensity:.24,bloomThreshold:.62,dofFocusDistance:4.1,dofStrength:.2,parallaxIntensity:.35,parallaxSmoothing:6,cursorLightIntensity:.55,enableShadows:!0,maxFps:60,maxPixelRatio:2,pauseOnHiddenTab:!0,fontFamily:'"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace'};function hl(o,e){return e?{...o,...e,palette:{...o.palette,...e.palette??{}},callbacks:e.callbacks?{...o.callbacks??{},...e.callbacks}:o.callbacks?{...o.callbacks}:void 0}:{...o,palette:{...o.palette},callbacks:o.callbacks?{...o.callbacks}:void 0}}class ph{constructor(e){F(this,"rafId",null);F(this,"running",!1);F(this,"lastTimestamp",null);F(this,"elapsedSeconds",0);F(this,"maxFps");F(this,"accumFrames",0);F(this,"accumMs",0);F(this,"smoothedFps",60);F(this,"lastFrameMs",16.67);F(this,"onFrame");F(this,"onTelemetry");F(this,"tickBound");this.maxFps=e.maxFps,this.onFrame=e.onFrame,this.onTelemetry=e.onTelemetry,this.tickBound=this.tick.bind(this)}start(){this.running||(this.running=!0,this.lastTimestamp=null,this.schedule())}pause(){this.running&&(this.running=!1,this.cancel(),this.lastTimestamp=null)}resume(){this.start()}stop(){this.pause(),this.elapsedSeconds=0}setMaxFps(e){this.maxFps=e}isRunning(){return this.running}getElapsedSeconds(){return this.elapsedSeconds}getTelemetry(){return{fps:Math.round(this.smoothedFps),frameTimeMs:Number(this.lastFrameMs.toFixed(2))}}stepOnce(e=0){this.elapsedSeconds+=e,this.onFrame({dt:e,elapsed:this.elapsedSeconds,rawFrameMs:this.lastFrameMs})}schedule(){this.rafId===null&&this.running&&(this.rafId=window.requestAnimationFrame(this.tickBound))}cancel(){this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null)}tick(e){var s;if(this.rafId=null,!this.running)return;if(this.lastTimestamp===null){this.lastTimestamp=e,this.stepOnce(.016666666666666666),this.schedule();return}const t=e-this.lastTimestamp,n=this.maxFps>0?1e3/this.maxFps:0;if(n>0&&t<n-1.5){this.schedule();return}this.lastTimestamp=e;const i=Math.min(.1,Math.max(1e-4,t/1e3));if(this.lastFrameMs=t,this.stepOnce(i),this.accumFrames+=1,this.accumMs+=t,this.accumMs>=450){const r=this.accumFrames*1e3/this.accumMs;this.smoothedFps=this.smoothedFps*.35+r*.65,this.accumFrames=0,this.accumMs=0,(s=this.onTelemetry)==null||s.call(this,this.getTelemetry())}this.schedule()}}class ii{constructor(e){F(this,"container");F(this,"resizeObserver",null);F(this,"intersectionObserver",null);F(this,"pendingResizeRaf",null);F(this,"pendingWidth",0);F(this,"pendingHeight",0);F(this,"cleanupCallbacks",[]);F(this,"disposed",!1);this.container=e}observeContainer(e,t){if(this.disposed)return;const n=(i,s)=>{if(!(i<=0||s<=0||this.disposed))if(this.pendingWidth=i,this.pendingHeight=s,typeof window<"u"&&typeof window.requestAnimationFrame=="function"){if(this.pendingResizeRaf!==null)return;this.pendingResizeRaf=window.requestAnimationFrame(()=>{this.pendingResizeRaf=null,!this.disposed&&this.pendingWidth>0&&this.pendingHeight>0&&e.onResize(this.pendingWidth,this.pendingHeight,!1)})}else e.onResize(i,s,!1)};if(typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(i=>{for(const s of i)if(s.target===this.container){const{width:r,height:a}=s.contentRect;r>0&&a>0&&n(r,a)}}),this.resizeObserver.observe(this.container)),typeof document<"u"){const i=()=>{var l;if(this.disposed)return;const s=document.fullscreenElement??document.webkitFullscreenElement??null,r=!!(s&&(s===this.container||s.contains(this.container)));(l=e.onFullscreenChange)==null||l.call(e,r);const a=this.container.getBoundingClientRect();a.width>0&&a.height>0&&n(a.width,a.height)};document.addEventListener("fullscreenchange",i),document.addEventListener("webkitfullscreenchange",i),this.registerCleanup(()=>{document.removeEventListener("fullscreenchange",i),document.removeEventListener("webkitfullscreenchange",i)})}if((t==null?void 0:t.observeViewportIntersection)!==!1&&typeof IntersectionObserver<"u"&&e.onVisibilityChange){const i=e.onVisibilityChange;this.intersectionObserver=new IntersectionObserver(s=>{const r=s[0];r&&i(r.isIntersecting)},{threshold:.01}),this.intersectionObserver.observe(this.container)}if((t==null?void 0:t.observeTabVisibility)!==!1&&typeof document<"u"&&e.onTabHiddenChange){const i=e.onTabHiddenChange,s=()=>i(document.hidden);document.addEventListener("visibilitychange",s),this.registerCleanup(()=>document.removeEventListener("visibilitychange",s))}}registerCleanup(e){if(this.disposed){e();return}this.cleanupCallbacks.push(e)}static disposeObject3D(e){const t=new Set,n=new Set;e.traverse(i=>{if(i instanceof Y||i instanceof Zs||i instanceof On){i.geometry&&!t.has(i.geometry)&&(i.geometry.dispose(),t.add(i.geometry));const s=Array.isArray(i.material)?i.material:[i.material];for(const r of s)r&&!n.has(r)&&(ii.disposeMaterialTextures(r),r.dispose(),n.add(r))}i instanceof ni&&i.shadow&&i.shadow.map&&i.shadow.map.dispose()}),e instanceof Hs&&e.clear()}static disposeMaterialTextures(e){const t=e;for(const n of Object.keys(t)){const i=t[n];i instanceof vt&&i.dispose()}}disposeAll(e){var t,n;if(!this.disposed){this.disposed=!0,this.pendingResizeRaf!==null&&typeof window<"u"&&(window.cancelAnimationFrame(this.pendingResizeRaf),this.pendingResizeRaf=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null);for(let i=this.cleanupCallbacks.length-1;i>=0;i--)try{(n=(t=this.cleanupCallbacks)[i])==null||n.call(t)}catch{}this.cleanupCallbacks.length=0,e&&ii.disposeObject3D(e)}}}const mh=.625;function gh(o,e,t){const n=Math.min(o,e);return t&&o<640?"mobile":o<460||n<280?o<380&&t?"mobile":"compact":o>=1440&&n>=520&&!t?"uhd":o>=960&&n>=400&&!t?"hd":o<720?"compact":"desktop"}function qr(o){const e=Math.max(1,Math.floor(o.cssWidth)),t=Math.max(1,Math.floor(o.cssHeight)),n=Number.isFinite(o.devicePixelRatio)&&o.devicePixelRatio>0?o.devicePixelRatio:1,i=!!o.isCoarsePointer,s=gh(e,t,i),r=s==="mobile"?Math.min(1.5,o.config.maxPixelRatio):o.config.maxPixelRatio,a=Math.max(1,Math.min(n,Math.max(1,r))),l=Math.max(2,Math.floor(e*a)),c=Math.max(2,Math.floor(t*a)),h=Math.max(5,Math.min(28,o.config.cellSize));let u=h;if(o.config.autoResponsiveDensity)if(o.config.mode==="mascot")s==="mobile"?u=Math.max(h,8.5):s==="compact"?u=Math.max(6.5,h*.92):(s==="hd"||s==="uhd")&&(u=Math.max(6.5,h*.85));else{const R=1.24-Math.max(0,Math.min(1,(e-360)/1240))*.44;s==="mobile"?u=Math.max(11,Math.round(h*Math.max(1.38,R))):s==="compact"?u=Math.max(9,Number((h*Math.max(1.06,R)).toFixed(2))):s==="hd"?u=Math.max(7.2,Number((h*Math.min(.92,R)).toFixed(2))):s==="uhd"?u=Math.max(6.8,Number((h*Math.min(.84,R)).toFixed(2))):u=Math.max(8,Number((h*R).toFixed(2))),o.isFullscreen&&s!=="mobile"&&(u=Math.max(6.8,Number((u*.93).toFixed(2))))}let d=Math.max(8,Math.round(u*a)),f=Math.max(6,Math.round(d*mh));const m=o.config.mode==="mascot"?78:190,v=o.config.mode==="mascot"?24:36,g=Math.floor(l/f);g>m?(f=Math.max(6,Math.ceil(l/m)),d=Math.max(8,Math.round(f/mh))):g<v&&l>=v*6&&(f=Math.max(6,Math.floor(l/v)),d=Math.max(8,Math.round(f/mh)));const p=Math.max(1,Math.floor(l/f)),x=Math.max(1,Math.floor(c/d)),_=Number((d/a).toFixed(2)),y=a>=1.5||d>=14?96:64,C=d>=12?.26:.18,b=s==="mobile"?4:3;return{tier:s,cssWidth:e,cssHeight:t,effectiveDpr:Number(a.toFixed(2)),physicalWidth:l,physicalHeight:c,activeCellSize:_,cellPhysW:f,cellPhysH:d,columns:p,rows:x,atlasTileSize:y,subCellSampleSpread:C,bloomDownsample:b}}class vh{constructor(e=14){F(this,"currentCellW",0);F(this,"currentCellH",0);F(this,"targetCellW",8);F(this,"targetCellH",10);F(this,"currentSpread",.22);F(this,"targetSpread",.22);F(this,"transitionEnergy",0);F(this,"initialized",!1);F(this,"smoothingSpeed");this.smoothingSpeed=e}setTarget(e,t=!1){if(this.targetCellW=e.cellPhysW,this.targetCellH=e.cellPhysH,this.targetSpread=e.subCellSampleSpread,!this.initialized||t){this.currentCellW=e.cellPhysW,this.currentCellH=e.cellPhysH,this.currentSpread=e.subCellSampleSpread,this.transitionEnergy=0,this.initialized=!0;return}const n=Math.abs(this.targetCellW-this.currentCellW)+Math.abs(this.targetCellH-this.currentCellH);n>.05&&(this.transitionEnergy=Math.min(1,Math.max(this.transitionEnergy,n/6)))}step(e){if(!this.initialized)return{cellW:this.targetCellW,cellH:this.targetCellH,subCellSpread:this.targetSpread,transitionMix:0,isTransitioning:!1};const t=Math.max(0,Math.min(.1,e)),n=t>0?1-Math.exp(-this.smoothingSpeed*t):1;return this.currentCellW+=(this.targetCellW-this.currentCellW)*n,this.currentCellH+=(this.targetCellH-this.currentCellH)*n,this.currentSpread+=(this.targetSpread-this.currentSpread)*n,this.transitionEnergy*=Math.exp(-9.5*t),Math.abs(this.targetCellW-this.currentCellW)+Math.abs(this.targetCellH-this.currentCellH)<.06&&this.transitionEnergy<.03?(this.currentCellW=this.targetCellW,this.currentCellH=this.targetCellH,this.currentSpread=this.targetSpread,this.transitionEnergy=0,{cellW:this.targetCellW,cellH:this.targetCellH,subCellSpread:this.targetSpread,transitionMix:0,isTransitioning:!1}):{cellW:this.currentCellW,cellH:this.currentCellH,subCellSpread:Math.max(this.currentSpread,.28),transitionMix:Math.min(1,this.transitionEnergy),isTransitioning:!0}}}class yh{constructor(e,t,n=null){F(this,"name","InputSystem");F(this,"pointer");F(this,"keyboard");F(this,"camera");F(this,"raycaster",new yp);F(this,"tapNdc",new Z);F(this,"groundPlane",new jn(new E(0,1,0),0));F(this,"groundHit",new E);this.pointer=e,this.keyboard=t,this.camera=n}setCamera(e){this.camera=e}update(e,{dt:t}){const n=this.pointer.sample(t),i=this.pointer.consumeTap(),s=this.keyboard.sampleAxes(),r=Math.abs(s.moveX)>.01||Math.abs(s.moveZ)>.01;if(i){const l=e.query("Transform","NavigationTarget");for(const c of l){const h=e.getComponent(c,"Transform"),u=e.getComponent(c,"NavigationTarget"),d=e.getComponent(c,"AnimationState"),f=d?d.baseY:h.y;let m=h.x+i.ndcX*3.5,v=h.z-i.ndcY*4.5;if(this.camera)if(this.camera.updateMatrixWorld(),this.tapNdc.set(i.ndcX,i.ndcY),this.raycaster.setFromCamera(this.tapNdc,this.camera),this.groundPlane.constant=-f,this.raycaster.ray.direction.y<-.025){const g=this.raycaster.ray.intersectPlane(this.groundPlane,this.groundHit);g&&(m=g.x,v=g.z)}else{const g=this.raycaster.ray.direction.x,p=this.raycaster.ray.direction.z,x=Math.hypot(g,p)||1;m=this.raycaster.ray.origin.x+g/x*14,v=this.raycaster.ray.origin.z+p/x*14}u.targetX=Math.max(u.minX,Math.min(u.maxX,m)),u.targetZ=Math.max(u.minZ,Math.min(u.maxZ,v)),u.active=!0}}const a=e.query("InputState");for(const l of a){const c=e.getComponent(l,"InputState"),h=e.getComponent(l,"NavigationTarget");c.pointerX=n.normX,c.pointerY=n.normY,c.pointerActive=n.active,c.isDragging=n.isDown,c.moveX=s.moveX,c.moveZ=s.moveZ,r&&h&&(h.active=!1);const u=e.getComponent(l,"RotationTarget");if(u&&n.active&&!h){const f=n.normX*c.yawSensitivity+n.dragYaw*.85,m=-n.normY*c.pitchSensitivity+n.dragPitch*.65;u.targetYaw=f,u.targetPitch=Math.max(-u.maxPitch,Math.min(u.maxPitch,m)),u.targetRoll=-n.normX*.06}const d=e.getComponent(l,"AnimationState");d&&n.motionSpeed>.04&&(d.excitement=Math.min(1,d.excitement+n.motionSpeed*.25))}}}class xh{constructor(){F(this,"name","PatrolSystem")}update(e,{elapsed:t}){const n=e.query("Transform","PatrolPath");for(const i of n){const s=e.getComponent(i,"Transform"),r=e.getComponent(i,"PatrolPath"),a=t*r.speed+r.phase,l=r.originX+Math.sin(a)*r.amplitudeX,c=r.originY+Math.sin(a*1.7+r.phase)*r.amplitudeY,h=r.originZ+Math.cos(a*.85)*r.amplitudeZ;if(r.faceTangent){const d=Math.cos(a)*r.amplitudeX*r.speed,f=-Math.sin(a*.85)*r.amplitudeZ*r.speed*.85;Math.abs(d)+Math.abs(f)>.001&&(s.rotY=Math.atan2(d,f),s.rotZ=-d*.045)}s.x=l,s.y=c,s.z=h;const u=e.getComponent(i,"AnimationState");u&&(u.baseY=c)}}}class ul{constructor(e,t=null){F(this,"name","MovementRotationSystem");F(this,"terrainHeightFn");F(this,"waypointMarker");this.terrainHeightFn=e,this.waypointMarker=t}setWaypointMarker(e){this.waypointMarker=e}update(e,{dt:t,elapsed:n}){let i=0,s=0,r=.025,a=!1;const l=e.query("Transform","Velocity");for(const h of l){const u=e.getComponent(h,"Transform"),d=e.getComponent(h,"Velocity"),f=e.getComponent(h,"InputState"),m=e.getComponent(h,"NavigationTarget"),v=e.getComponent(h,"AnimationState"),g=e.getComponent(h,"RotationTarget");if(f&&f.moveSpeed>0&&(f.moveX!==0||f.moveZ!==0)){m&&(m.active=!1),d.vx=f.moveX*f.moveSpeed,d.vz=f.moveZ*f.moveSpeed,g&&(g.targetYaw=Math.atan2(d.vx,d.vz),g.targetPitch=0,g.targetRoll=0),v&&(v.excitement=Math.min(1,v.excitement+t*2)),u.x+=d.vx*t,u.y+=d.vy*t,u.z+=d.vz*t;const p=Math.exp(-d.damping*t);d.vx*=p,d.vy*=p,d.vz*=p}else if(m&&m.active){const p=m.targetX-u.x,x=m.targetZ-u.z,_=Math.hypot(p,x);if(_<=m.arrivalRadius)u.x=m.targetX,u.z=m.targetZ,d.vx=0,d.vz=0,m.active=!1;else{const y=Math.min(1,Math.max(.3,_/.65)),C=m.moveSpeed*y,b=p/_,A=x/_,R=Math.min(_,C*t);d.vx=b*C,d.vz=A*C,u.x+=b*R,u.z+=A*R,g&&(g.targetYaw=Math.atan2(b,A),g.targetPitch=0,g.targetRoll=0),v&&(v.excitement=Math.min(1,v.excitement+t*1.4)),Math.hypot(m.targetX-u.x,m.targetZ-u.z)<=m.arrivalRadius?(u.x=m.targetX,u.z=m.targetZ,d.vx=0,d.vz=0,m.active=!1):(a=!0,i=m.targetX,s=m.targetZ)}}else{u.x+=d.vx*t,u.y+=d.vy*t,u.z+=d.vz*t;const p=Math.exp(-d.damping*t);d.vx*=p,d.vy*=p,d.vz*=p,Math.hypot(d.vx,d.vz)<.02&&(d.vx=0,d.vz=0)}if(u.rotX+=d.angularVx*t,u.rotY+=d.angularVy*t,u.rotZ+=d.angularVz*t,m)u.x=Math.max(m.minX,Math.min(m.maxX,u.x)),u.z=Math.max(m.minZ,Math.min(m.maxZ,u.z));else if(f&&f.boundsRadius>0){const p=Math.hypot(u.x,u.z+1.5);if(p>f.boundsRadius){const x=f.boundsRadius/p;u.x*=x,u.z=-1.5+(u.z+1.5)*x}}if(this.terrainHeightFn&&(m||f&&f.moveSpeed>0)){const p=this.terrainHeightFn(u.x,u.z);v?v.baseY=p:u.y=p,a&&(r=this.terrainHeightFn(i,s)+.025)}}if(this.waypointMarker&&(this.waypointMarker.visible=a,a)){this.waypointMarker.position.set(i,r,s);const h=.92+Math.sin(n*5)*.08;this.waypointMarker.scale.set(h,1,h)}const c=e.query("Transform","RotationTarget");for(const h of c){const u=e.getComponent(h,"Transform"),d=e.getComponent(h,"RotationTarget"),f=e.getComponent(h,"InputState"),m=e.getComponent(h,"NavigationTarget"),v=e.getComponent(h,"Velocity"),g=1-Math.exp(-d.lerpSpeed*t),p=!!(m&&m.active||v&&Math.hypot(v.vx,v.vz)>.05);if(m){const x=p?0:Math.sin(n*.75)*.035,_=d.targetYaw+x,y=Math.atan2(Math.sin(_-u.rotY),Math.cos(_-u.rotY));u.rotY+=y*g,u.rotX+=(d.targetPitch-u.rotX)*g,u.rotZ+=(d.targetRoll-u.rotZ)*g}else if(f&&f.pointerActive){const x=Math.atan2(Math.sin(d.targetYaw-u.rotY),Math.cos(d.targetYaw-u.rotY));u.rotY+=x*g,u.rotX+=(d.targetPitch-u.rotX)*g,u.rotZ+=(d.targetRoll-u.rotZ)*g}else if(d.idleSpinSpeed!==0)u.rotY+=d.idleSpinSpeed*t,u.rotX+=(Math.sin(n*.9)*.04-u.rotX)*g,u.rotZ+=(0-u.rotZ)*g;else{const x=Math.sin(n*.85)*.28,_=Math.cos(n*.65)*.06;u.rotY+=(x-u.rotY)*(g*.6),u.rotX+=(_-u.rotX)*(g*.6),u.rotZ+=(0-u.rotZ)*g}}}}class _h{constructor(e=1){F(this,"name","WindSystem");F(this,"windStrength");this.windStrength=e}setWindStrength(e){this.windStrength=Math.max(0,Math.min(3,e))}update(e,{elapsed:t}){const n=e.query("Transform","WindSway");if(n.length===0)return;const i=(.65+.35*Math.sin(t*.72)+.22*Math.sin(t*1.83+1.1))*this.windStrength;for(const s of n){const r=e.getComponent(s,"Transform"),a=e.getComponent(s,"WindSway"),l=t*a.frequency+a.phase,c=Math.sin(l*2.35+a.phase)*.28,h=i*a.gustFactor;r.rotZ=a.baseRotZ+(Math.sin(l)*.72+c+.35)*a.swayAmpZ*h,r.rotX=a.baseRotX+Math.cos(l*.88+a.phase)*a.swayAmpX*h,r.rotY=a.baseRotY+Math.sin(l*.55)*a.swayAmpZ*.35*h}}}class Mh{constructor(){F(this,"name","NeonPulseSystem")}update(e,{elapsed:t}){const n=e.query("NeonBeacon");for(const i of n){const s=e.getComponent(i,"NeonBeacon"),r=Math.sin(t*s.pulseSpeed+s.phase)*.65+Math.sin(t*s.pulseSpeed*2.37+s.phase*1.7)*.35;let a=1;if(s.glitchRate&&s.glitchRate>0){const h=Math.sin(Math.floor(t*14+s.phase*10)*91.7)*43758.5453;h-Math.floor(h)<s.glitchRate*.12&&(a=.42)}const l=Math.max(.2,(1+r*s.pulseAmplitude)*a);s.emissiveMaterial&&(s.emissiveIntensityCache=s.baseEmissiveIntensity*l,s.emissiveMaterial.emissiveIntensity=s.emissiveIntensityCache);const c=e.getComponent(i,"Renderable");c!=null&&c.pointLight&&c.baseLightIntensity!==void 0&&(c.pointLight.intensity=c.baseLightIntensity*l)}}}class Sh{constructor(e=null){F(this,"name","CameraFollowSystem");F(this,"camera");F(this,"lookTarget",new E);this.camera=e}setCamera(e){this.camera=e}update(e,{dt:t}){if(!this.camera)return;const n=e.query("Transform","CameraFollow");if(n.length===0)return;const i=n[0],s=e.getComponent(i,"Transform"),r=e.getComponent(i,"CameraFollow"),a=e.getComponent(i,"AnimationState"),l=a?a.baseY:s.y,c=s.x+r.offsetX,h=l+r.offsetY,u=s.z+r.offsetZ;if(!r.initialized||t<=0)this.camera.position.set(c,h,u),r.initialized=!0;else{const d=1-Math.exp(-r.followSharpness*t);this.camera.position.x+=(c-this.camera.position.x)*d,this.camera.position.y+=(h-this.camera.position.y)*d,this.camera.position.z+=(u-this.camera.position.z)*d}this.lookTarget.set(s.x,l+r.lookAtOffsetY,s.z),this.camera.lookAt(this.lookTarget),this.camera.updateMatrixWorld()}}class dl{constructor(){F(this,"name","RenderSyncSystem")}update(e,{elapsed:t}){const n=e.query("Transform","Renderable");for(const i of n){const s=e.getComponent(i,"Transform"),r=e.getComponent(i,"Renderable");if(r.object3D.position.set(s.x,s.y,s.z),r.object3D.rotation.set(s.rotX,s.rotY,s.rotZ),r.object3D.scale.set(s.scaleX,s.scaleY,s.scaleZ),r.pointLight&&!e.hasComponent(i,"NeonBeacon")&&r.baseLightIntensity!==void 0){const a=r.lightFlickerSpeed??7.2,l=1+Math.sin(t*a+i*1.7)*.12+Math.sin(t*a*2.13+i)*.06;r.pointLight.intensity=r.baseLightIntensity*l}}}}class wh{constructor(){F(this,"entries",[]);F(this,"nextOrder",0)}addSystem(e,t){const n=t??(this.entries.length+1)*10;return this.entries.push({priority:n,order:this.nextOrder++,system:e}),this.entries.sort((i,s)=>i.priority!==s.priority?i.priority-s.priority:i.order-s.order),this}removeSystem(e){const t=this.entries.findIndex(n=>n.system.name===e);return t===-1?!1:(this.entries.splice(t,1),!0)}getSystemNames(){return this.entries.map(e=>e.system.name)}run(e,t){for(let n=0;n<this.entries.length;n++)this.entries[n].system.update(e,t)}clear(){this.entries.length=0,this.nextOrder=0}}class bh{constructor(){F(this,"nextEntityId",1);F(this,"entities",new Set);F(this,"stores",{Transform:new Map,Velocity:new Map,RotationTarget:new Map,AnimationState:new Map,Renderable:new Map,NeonBeacon:new Map,PatrolPath:new Map,WindSway:new Map,DepthLayer:new Map,LifecycleTag:new Map,InputState:new Map,NavigationTarget:new Map,CameraFollow:new Map})}createEntity(){const e=this.nextEntityId++;return this.entities.add(e),e}destroyEntity(e,t=!0){if(!this.entities.has(e))return!1;if(t){const n=this.stores.Renderable.get(e);n&&n.disposeOnDestroy!==!1&&this.disposeRenderableResources(n)}for(const n of Object.keys(this.stores))this.stores[n].delete(e);return this.entities.delete(e),!0}addComponent(e,t,n){if(!this.entities.has(e))throw new Error(`[ECS World] Entity ${e} does not exist.`);return this.stores[t].set(e,n),n}getComponent(e,t){return this.stores[t].get(e)}hasComponent(e,t){return this.stores[t].has(e)}removeComponent(e,t){this.stores[t].delete(e)}query(...e){if(e.length===0)return Array.from(this.entities);let t=this.stores[e[0]];for(let i=1;i<e.length;i++){const s=this.stores[e[i]];s.size<t.size&&(t=s)}const n=[];for(const i of t.keys()){let s=!0;for(let r=0;r<e.length;r++)if(!this.stores[e[r]].has(i)){s=!1;break}s&&n.push(i)}return n}getEntityCount(){return this.entities.size}queryByLayer(e){const t=[];for(const[n,i]of this.stores.DepthLayer.entries())i.layer===e&&t.push(n);return t}destroyEntitiesByRole(e,t=!0){const n=[];for(const[s,r]of this.stores.LifecycleTag.entries())r.role===e&&n.push(s);let i=0;for(const s of n)this.destroyEntity(s,t)&&i++;return i}clear(e=!0){if(e)for(const t of this.stores.Renderable.values())t.disposeOnDestroy!==!1&&this.disposeRenderableResources(t);for(const t of Object.keys(this.stores))this.stores[t].clear();this.entities.clear()}disposeRenderableResources(e){var t;e.pointLight&&(e.pointLight.parent&&e.pointLight.parent.remove(e.pointLight),(t=e.pointLight.shadow)!=null&&t.map&&e.pointLight.shadow.map.dispose()),e.object3D&&(e.object3D.parent&&e.object3D.parent.remove(e.object3D),ii.disposeObject3D(e.object3D))}}function Pp(o,e,t){const n=Math.max(0,Math.min(1,(t-o)/(e-o)));return n*n*(3-2*n)}function MM(o,e){const n=new Wt(.76,64,48),i=n.getAttribute("position"),s=i.count,r=new Float32Array(s*3),a=new G;for(let l=0;l<s;l++){const c=i.getX(l),h=i.getY(l),u=i.getZ(l),d=h/.76,f=1-.19*d,m=1-.13*d,v=c*.92*f,g=h*1.18,p=u*.82*m;i.setXYZ(l,v,g,p);const x=v/.46,_=(g+.05)/.65,y=Math.hypot(x,_),C=Pp(.08,.28,p/.62),b=(1-Pp(.86,1.02,y))*C;a.lerpColors(o,e,b),r[l*3]=a.r,r[l*3+1]=a.g,r[l*3+2]=a.b}return i.needsUpdate=!0,n.setAttribute("color",new $e(r,3)),n.computeVertexNormals(),n}class Th{static spawn(e,t,n){const i=(n==null?void 0:n.position)??[0,-.35,0],s=(n==null?void 0:n.scale)??1,r=new je;r.name="TuxMascotRoot";const a=new G(527636),l=new G(16055039),c=new lt({color:a,roughness:.64,metalness:.04,flatShading:!1}),h=new lt({color:16777215,vertexColors:!0,roughness:.64,metalness:0,flatShading:!1}),u=new lt({color:16752412,emissive:3873024,emissiveIntensity:.34,roughness:.52,metalness:0,flatShading:!1}),d=new Ht({color:16186367}),f=new Ht({color:329740}),m=new Y(MM(a,l),h);m.name="TuxTorso",m.position.set(0,.86,0),m.castShadow=!0,m.receiveShadow=!1,m.userData.coatColor=a.clone(),m.userData.bellyColor=l.clone(),r.add(m);const v=new je;v.name="TuxHeadPivot",v.position.set(0,1.72,.03);const g=new Y(new Wt(.48,48,36),c);g.name="TuxHead",g.scale.set(.98,.95,.9),g.castShadow=!0,g.receiveShadow=!1,v.add(g);for(const O of[-1,1]){const k=new Y(new Wt(.132,24,18),d);k.position.set(O*.162,.095,.405),k.scale.set(.96,1.16,.58),v.add(k);const K=new Y(new Wt(.048,18,14),f);K.position.set(O*.152,.095,.472),K.scale.set(.92,.96,.55),v.add(K)}const p=new Y(new Wt(.21,32,24),u);p.name="TuxUpperBeak",p.scale.set(1.16,.42,1.24),p.position.set(0,-.055,.43),p.rotation.x=.08,p.castShadow=!0,p.receiveShadow=!1,v.add(p);const x=new Y(new Wt(.17,28,20),u);x.name="TuxLowerBeak",x.scale.set(1.02,.3,1.02),x.position.set(0,-.115,.4),x.rotation.x=.16,x.castShadow=!0,x.receiveShadow=!1,v.add(x),r.add(v);const _=new je;_.position.set(-.65,1.32,.02),_.rotation.z=.28;const y=new Y(new Wt(.22,32,24),c);y.position.set(-.06,-.38,0),y.scale.set(.42,2.05,.96),y.castShadow=!0,y.receiveShadow=!1,_.add(y),r.add(_);const C=new je;C.position.set(.65,1.32,.02),C.rotation.z=-.28;const b=new Y(new Wt(.22,32,24),c);b.position.set(.06,-.38,0),b.scale.set(.42,2.05,.96),b.castShadow=!0,b.receiveShadow=!1,C.add(b),r.add(C);const A=new je;A.position.set(-.34,.08,.34),A.rotation.y=.26;const R=new Y(new Wt(.24,28,20),u);R.scale.set(.84,.3,1.18),R.position.set(0,.01,.12),R.castShadow=!0,R.receiveShadow=!1,A.add(R),r.add(A);const S=new je;S.position.set(.34,.08,.34),S.rotation.y=-.26;const M=new Y(new Wt(.24,28,20),u);M.scale.set(.84,.3,1.18),M.position.set(0,.01,.12),M.castShadow=!0,M.receiveShadow=!1,S.add(M),r.add(S);const L=new Y(new Wt(.17,24,18),c);if(L.position.set(0,.22,-.6),L.scale.set(.85,.72,1.35),L.rotation.x=-.24,L.castShadow=!0,L.receiveShadow=!1,r.add(L),n!=null&&n.includeShowcaseRig){const O=new lt({color:1782596,roughness:.82,metalness:.08,flatShading:!1}),k=new Y(new Jt(.92,1.08,.16,32),O);k.name="TuxShowcasePlinth",k.userData.isShowcasePedestal=!0,k.position.set(0,-.06,.08),k.receiveShadow=!0,r.add(k)}r.position.set(i[0],i[1],i[2]),r.scale.setScalar(s),t.add(r);const B=e.createEntity();return e.addComponent(B,"Transform",{x:i[0],y:i[1],z:i[2],rotX:0,rotY:.14,rotZ:0,scaleX:s,scaleY:s,scaleZ:s}),e.addComponent(B,"Velocity",{vx:0,vy:0,vz:0,angularVx:0,angularVy:0,angularVz:0,damping:6.5}),e.addComponent(B,"RotationTarget",{targetYaw:.14,targetPitch:0,targetRoll:0,lerpSpeed:6.2,idleSpinSpeed:0,maxPitch:.46}),e.addComponent(B,"AnimationState",{baseY:i[1],bobAmplitude:(n==null?void 0:n.bobAmplitude)??.045,bobFrequency:2.1,breatheAmplitude:.022,phase:.3,excitement:0,parts:{leftWing:_,rightWing:C,head:v,leftFoot:A,rightFoot:S}}),e.addComponent(B,"InputState",{pointerX:0,pointerY:0,pointerActive:!1,isDragging:!1,moveX:0,moveZ:0,yawSensitivity:1.25,pitchSensitivity:.4,moveSpeed:(n==null?void 0:n.moveSpeed)??0,boundsRadius:(n==null?void 0:n.boundsRadius)??0}),e.addComponent(B,"Renderable",{object3D:r}),{entityId:B,rootGroup:r}}}const SM=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);class Ah{constructor(e){F(this,"pressedKeys",new Set);F(this,"enabled",!1);F(this,"attached",!1);F(this,"requireFocusTarget",null);F(this,"onKeyDownBound");F(this,"onKeyUpBound");F(this,"onWindowBlurBound");this.enabled=!!(e!=null&&e.enabled),this.requireFocusTarget=(e==null?void 0:e.focusTarget)??null,this.onKeyDownBound=this.handleKeyDown.bind(this),this.onKeyUpBound=this.handleKeyUp.bind(this),this.onWindowBlurBound=this.clearKeys.bind(this)}attach(){this.attached||typeof window>"u"||(this.attached=!0,window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound),window.addEventListener("blur",this.onWindowBlurBound))}detach(){!this.attached||typeof window>"u"||(this.attached=!1,window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),window.removeEventListener("blur",this.onWindowBlurBound),this.clearKeys())}setEnabled(e){this.enabled=e,e||this.clearKeys()}isEnabled(){return this.enabled}isKeyDown(e){return this.enabled&&this.pressedKeys.has(e)}clearKeys(){this.pressedKeys.clear()}sampleAxes(){if(!this.enabled)return{moveX:0,moveZ:0,interactPressed:!1};const e=this.pressedKeys.has("KeyA")||this.pressedKeys.has("ArrowLeft")?-1:0,t=this.pressedKeys.has("KeyD")||this.pressedKeys.has("ArrowRight")?1:0,n=this.pressedKeys.has("KeyW")||this.pressedKeys.has("ArrowUp")?-1:0,i=this.pressedKeys.has("KeyS")||this.pressedKeys.has("ArrowDown")?1:0;let s=e+t,r=n+i;const a=Math.hypot(s,r);return a>1&&(s/=a,r/=a),{moveX:s,moveZ:r,interactPressed:this.pressedKeys.has("KeyE")}}isTypingInFormField(e){if(!(e instanceof HTMLElement))return!1;const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"?!0:e.isContentEditable}hasActiveContextFocus(){if(!this.requireFocusTarget||typeof document>"u")return!0;const e=document.activeElement;return e===this.requireFocusTarget||this.requireFocusTarget.contains(e)}handleKeyDown(e){this.enabled&&(e.ctrlKey||e.metaKey||e.altKey||this.isTypingInFormField(e.target)||this.hasActiveContextFocus()&&(this.pressedKeys.add(e.code),SM.has(e.code)&&this.requireFocusTarget&&e.preventDefault()))}handleKeyUp(e){this.pressedKeys.delete(e.code)}}const Ip=14*14,Eh=320;class Ch{constructor(e,t){F(this,"container");F(this,"trackWindowHover");F(this,"normX",0);F(this,"normY",0);F(this,"dragYaw",0);F(this,"dragPitch",0);F(this,"active",!1);F(this,"isDown",!1);F(this,"isTouch",!1);F(this,"activeTouchId",null);F(this,"lastClientX",0);F(this,"lastClientY",0);F(this,"downOriginX",0);F(this,"downOriginY",0);F(this,"maxGestureDistSq",0);F(this,"gestureActive",!1);F(this,"hasPendingTap",!1);F(this,"lastTapRecordedMs",0);F(this,"pendingTap",{ndcX:0,ndcY:0});F(this,"motionSpeed",0);F(this,"lastInteractionMs",0);F(this,"touchReleaseHoldTimer",0);F(this,"attached",!1);F(this,"onPointerDownBound");F(this,"onPointerMoveBound");F(this,"onWindowPointerMoveBound");F(this,"onPointerUpBound");F(this,"onPointerCancelBound");F(this,"onPointerLeaveBound");F(this,"onTouchStartBound");F(this,"onTouchMoveBound");F(this,"onTouchEndBound");F(this,"onTouchCancelBound");F(this,"onClickBound");this.container=e,this.trackWindowHover=!!(t!=null&&t.trackWindowHover),this.onPointerDownBound=this.handlePointerDown.bind(this),this.onPointerMoveBound=this.handleContainerPointerMove.bind(this),this.onWindowPointerMoveBound=this.handleWindowPointerMove.bind(this),this.onPointerUpBound=this.handlePointerUp.bind(this),this.onPointerCancelBound=this.handlePointerCancel.bind(this),this.onPointerLeaveBound=this.handlePointerLeave.bind(this),this.onTouchStartBound=this.handleTouchStart.bind(this),this.onTouchMoveBound=this.handleTouchMove.bind(this),this.onTouchEndBound=this.handleTouchEnd.bind(this),this.onTouchCancelBound=this.handleTouchCancel.bind(this),this.onClickBound=this.handleClick.bind(this)}attach(){this.attached||(this.attached=!0,this.container.style.touchAction||(this.container.style.touchAction="pan-y"),this.container.addEventListener("pointerdown",this.onPointerDownBound,{passive:!0}),this.container.addEventListener("pointermove",this.onPointerMoveBound,{passive:!0}),this.container.addEventListener("pointerup",this.onPointerUpBound,{passive:!0}),this.container.addEventListener("pointercancel",this.onPointerCancelBound,{passive:!0}),this.container.addEventListener("pointerleave",this.onPointerLeaveBound,{passive:!0}),this.container.addEventListener("click",this.onClickBound,{passive:!0}),this.container.addEventListener("touchstart",this.onTouchStartBound,{passive:!0}),this.container.addEventListener("touchmove",this.onTouchMoveBound,{passive:!0}),this.container.addEventListener("touchend",this.onTouchEndBound,{passive:!0}),this.container.addEventListener("touchcancel",this.onTouchCancelBound,{passive:!0}),this.trackWindowHover&&typeof window<"u"&&(window.addEventListener("pointermove",this.onWindowPointerMoveBound,{passive:!0}),window.addEventListener("pointerup",this.onPointerUpBound,{passive:!0})))}detach(){this.attached&&(this.attached=!1,this.hasPendingTap=!1,this.gestureActive=!1,this.container.removeEventListener("pointerdown",this.onPointerDownBound),this.container.removeEventListener("pointermove",this.onPointerMoveBound),this.container.removeEventListener("pointerup",this.onPointerUpBound),this.container.removeEventListener("pointercancel",this.onPointerCancelBound),this.container.removeEventListener("pointerleave",this.onPointerLeaveBound),this.container.removeEventListener("click",this.onClickBound),this.container.removeEventListener("touchstart",this.onTouchStartBound),this.container.removeEventListener("touchmove",this.onTouchMoveBound),this.container.removeEventListener("touchend",this.onTouchEndBound),this.container.removeEventListener("touchcancel",this.onTouchCancelBound),typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pointermove",this.onWindowPointerMoveBound),window.removeEventListener("pointerup",this.onPointerUpBound)))}sample(e){if(this.motionSpeed=Math.max(0,this.motionSpeed-e*2.4),this.touchReleaseHoldTimer>0&&!this.isDown&&(this.touchReleaseHoldTimer=Math.max(0,this.touchReleaseHoldTimer-e),this.touchReleaseHoldTimer===0&&!this.trackWindowHover&&(this.active=!1)),!this.isDown&&!this.active){const t=1-Math.exp(-2.2*e);this.dragYaw+=(0-this.dragYaw)*t,this.dragPitch+=(0-this.dragPitch)*t,this.normX+=(0-this.normX)*t,this.normY+=(0-this.normY)*t}return{normX:this.normX,normY:this.normY,dragYaw:this.dragYaw,dragPitch:this.dragPitch,active:this.active,isDown:this.isDown,isTouch:this.isTouch,motionSpeed:this.motionSpeed,lastInteractionMs:this.lastInteractionMs}}setNormalized(e,t,n=!0){this.normX=Math.max(-1,Math.min(1,e)),this.normY=Math.max(-1,Math.min(1,t)),this.active=n}triggerTapNormalized(e,t){this.pendingTap.ndcX=Math.max(-1,Math.min(1,e)),this.pendingTap.ndcY=Math.max(-1,Math.min(1,t)),this.hasPendingTap=!0,this.lastTapRecordedMs=Date.now()}consumeTap(){return this.hasPendingTap?(this.hasPendingTap=!1,this.pendingTap):null}recordTapFromClient(e,t){const n=this.container.getBoundingClientRect();if(n.width<=0||n.height<=0)return;const i=(e-n.left)/n.width,s=(t-n.top)/n.height;i<0||i>1||s<0||s>1||(this.pendingTap.ndcX=Math.max(-1,Math.min(1,i*2-1)),this.pendingTap.ndcY=Math.max(-1,Math.min(1,-(s*2-1))),this.hasPendingTap=!0,this.lastTapRecordedMs=Date.now())}handlePointerDown(e){if(e.pointerType==="touch")this.isTouch=!0;else{if(typeof e.button=="number"&&e.button!==0)return;this.isTouch=!1}this.isDown=!0,this.active=!0,this.touchReleaseHoldTimer=0,this.lastClientX=e.clientX,this.lastClientY=e.clientY,this.downOriginX=e.clientX,this.downOriginY=e.clientY,this.maxGestureDistSq=0,this.gestureActive=!0,e.isTrusted&&(this.lastInteractionMs=Date.now()),this.updateNormalizedFromClient(e.clientX,e.clientY,!1)}handleContainerPointerMove(e){if(e.pointerType==="touch"&&this.activeTouchId!==null)return;e.isTrusted&&(this.lastInteractionMs=Date.now());const t=e.pointerType==="touch"?1.35:1;if(this.isDown){const n=e.clientX-this.downOriginX,i=e.clientY-this.downOriginY,s=n*n+i*i;s>this.maxGestureDistSq&&(this.maxGestureDistSq=s);const r=e.clientX-this.lastClientX,a=e.clientY-this.lastClientY;this.lastClientX=e.clientX,this.lastClientY=e.clientY,this.dragYaw=Math.max(-Math.PI,Math.min(Math.PI,this.dragYaw+r*.012*t)),this.dragPitch=Math.max(-.55,Math.min(.55,this.dragPitch+a*.0075*t)),this.motionSpeed=Math.min(1,this.motionSpeed+Math.hypot(r,a)*.026)}this.active=!0,this.updateNormalizedFromClient(e.clientX,e.clientY,!1)}handleWindowPointerMove(e){e.isTrusted&&(this.lastInteractionMs=Date.now(),this.active=!0,this.updateNormalizedFromClient(e.clientX,e.clientY,!0))}handlePointerUp(e){e.pointerType==="touch"&&(this.touchReleaseHoldTimer=1.6),this.gestureActive&&this.maxGestureDistSq<=Ip&&Date.now()-this.lastTapRecordedMs>Eh*.5&&this.recordTapFromClient(e.clientX,e.clientY),this.gestureActive=!1,this.isDown=!1}handlePointerCancel(e){e.pointerType==="touch"&&(this.touchReleaseHoldTimer=1.6),this.gestureActive=!1,this.isDown=!1}handleClick(e){Date.now()-this.lastTapRecordedMs<=Eh||this.recordTapFromClient(e.clientX,e.clientY)}handlePointerLeave(e){e.pointerType!=="touch"&&(this.isDown=!1,this.trackWindowHover||(this.active=!1))}handleTouchStart(e){var n,i;const t=((n=e.changedTouches)==null?void 0:n[0])??((i=e.touches)==null?void 0:i[0]);t&&(this.isTouch=!0,this.isDown=!0,this.active=!0,this.touchReleaseHoldTimer=0,this.activeTouchId=t.identifier??0,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.downOriginX=t.clientX,this.downOriginY=t.clientY,this.maxGestureDistSq=0,this.gestureActive=!0,e.isTrusted!==!1&&(this.lastInteractionMs=Date.now()),this.updateNormalizedFromClient(t.clientX,t.clientY,!1))}handleTouchMove(e){const t=e.changedTouches??e.touches;if(!t||t.length===0)return;let n=t[0];if(this.activeTouchId!==null){for(let c=0;c<t.length;c++)if(t[c].identifier===this.activeTouchId){n=t[c];break}}e.isTrusted!==!1&&(this.lastInteractionMs=Date.now());const i=n.clientX-this.downOriginX,s=n.clientY-this.downOriginY,r=i*i+s*s;r>this.maxGestureDistSq&&(this.maxGestureDistSq=r);const a=n.clientX-this.lastClientX,l=n.clientY-this.lastClientY;this.lastClientX=n.clientX,this.lastClientY=n.clientY,this.dragYaw=Math.max(-Math.PI,Math.min(Math.PI,this.dragYaw+a*.015)),this.dragPitch=Math.max(-.55,Math.min(.55,this.dragPitch+l*.0085)),this.motionSpeed=Math.min(1,this.motionSpeed+Math.hypot(a,l)*.03),this.active=!0,this.isDown=!0,this.updateNormalizedFromClient(n.clientX,n.clientY,!1)}handleTouchEnd(e){var i;const t=(i=e.changedTouches)==null?void 0:i[0];(e.touches?e.touches.length:0)===0&&(t&&this.gestureActive&&this.maxGestureDistSq<=Ip&&Date.now()-this.lastTapRecordedMs>Eh*.5&&this.recordTapFromClient(t.clientX,t.clientY),this.gestureActive=!1,this.isDown=!1,this.activeTouchId=null,this.touchReleaseHoldTimer=1.8)}handleTouchCancel(){this.gestureActive=!1,this.isDown=!1,this.activeTouchId=null}updateNormalizedFromClient(e,t,n){const i=this.container.getBoundingClientRect();if(i.width<=0||i.height<=0)return;const s=this.normX,r=this.normY;if(n&&typeof window<"u"){const l=i.left+i.width*.5,c=i.top+i.height*.5,h=Math.max(i.width*.7,window.innerWidth*.38,160),u=Math.max(i.height*.7,window.innerHeight*.38,140);this.normX=Math.max(-1,Math.min(1,(e-l)/h)),this.normY=Math.max(-1,Math.min(1,-((t-c)/u)))}else{const l=(e-i.left)/i.width,c=(t-i.top)/i.height;this.normX=Math.max(-1,Math.min(1,l*2-1)),this.normY=Math.max(-1,Math.min(1,-(c*2-1)))}const a=Math.hypot(this.normX-s,this.normY-r);this.motionSpeed=Math.min(1,this.motionSpeed+a*1.4)}}const Rh=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,wM=`
  precision highp float;

  uniform sampler2D tScene;
  uniform vec2 uTexelSize;
  uniform float uThreshold;
  uniform float uTime;

  varying vec2 vUv;

  float getLuma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  vec3 extractBright(vec3 color) {
    float luma = getLuma(color);
    float maxCh = max(color.r, max(color.g, color.b));
    float minCh = min(color.r, min(color.g, color.b));
    float neonChroma = (maxCh - minCh) * 0.66 + maxCh * 0.46;
    float metric = max(luma, neonChroma);
    float knee = uThreshold * 0.45 + 0.0001;
    float soft = clamp(metric - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee);
    float contribution = max(soft, metric - uThreshold) / max(metric, 0.0001);
    return color * clamp(contribution, 0.0, 2.8);
  }

  void main() {
    vec2 d = uTexelSize * 1.75;
    vec3 sum = extractBright(texture2D(tScene, vUv).rgb) * 0.28;
    sum += extractBright(texture2D(tScene, vUv + vec2( d.x,  d.y)).rgb) * 0.12;
    sum += extractBright(texture2D(tScene, vUv + vec2(-d.x,  d.y)).rgb) * 0.12;
    sum += extractBright(texture2D(tScene, vUv + vec2( d.x, -d.y)).rgb) * 0.12;
    sum += extractBright(texture2D(tScene, vUv + vec2(-d.x, -d.y)).rgb) * 0.12;
    sum += extractBright(texture2D(tScene, vUv + vec2( d.x * 2.2, 0.0)).rgb) * 0.06;
    sum += extractBright(texture2D(tScene, vUv + vec2(-d.x * 2.2, 0.0)).rgb) * 0.06;
    sum += extractBright(texture2D(tScene, vUv + vec2(0.0,  d.y * 2.2)).rgb) * 0.06;
    sum += extractBright(texture2D(tScene, vUv + vec2(0.0, -d.y * 2.2)).rgb) * 0.06;

    gl_FragColor = vec4(sum, 1.0);
  }
`,bM=`
  precision highp float;

  uniform sampler2D tInput;
  uniform vec2 uTexelSize;
  uniform vec2 uDirection;

  varying vec2 vUv;

  void main() {
    vec2 off1 = vec2(1.3846153846) * uDirection * uTexelSize;
    vec2 off2 = vec2(3.2307692308) * uDirection * uTexelSize;
    vec2 off3 = vec2(5.4000000000) * uDirection * uTexelSize;

    vec3 color = texture2D(tInput, vUv).rgb * 0.204;
    color += texture2D(tInput, vUv + off1).rgb * 0.244;
    color += texture2D(tInput, vUv - off1).rgb * 0.244;
    color += texture2D(tInput, vUv + off2).rgb * 0.112;
    color += texture2D(tInput, vUv - off2).rgb * 0.112;
    color += texture2D(tInput, vUv + off3).rgb * 0.042;
    color += texture2D(tInput, vUv - off3).rgb * 0.042;

    gl_FragColor = vec4(color, 1.0);
  }
`,TM=`
  precision highp float;

  uniform sampler2D tScene;
  uniform sampler2D tDepth;
  uniform sampler2D tBloom;
  uniform sampler2D tGlyphAtlas;

  uniform vec2 uResolution;
  uniform vec2 uCellSize;
  uniform vec2 uAtlasTileSize;
  uniform float uSubCellSpread;
  uniform float uTransitionMix;
  uniform float uRampCount;
  uniform float uStructuralCount;
  uniform float uBlockCount;
  uniform float uTotalGlyphs;

  uniform float uCameraNear;
  uniform float uCameraFar;
  uniform float uDofFocus;
  uniform float uDofStrength;
  uniform float uEdgeStrength;
  uniform float uBlockBlendWeight;
  uniform float uBloomIntensity;
  uniform float uDaylight;
  uniform vec3 uBgColor;
  uniform float uTime;

  varying vec2 vUv;

  float linearizeDepth(float rawDepth) {
    float zNdc = rawDepth * 2.0 - 1.0;
    return (2.0 * uCameraNear * uCameraFar) /
           (uCameraFar + uCameraNear - zNdc * (uCameraFar - uCameraNear));
  }

  float getLuma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  /**
   * 5-tap sub-cell rotated-grid supersampling: integrates scene radiance across the footprint
   * of a single ASCII character cell so high-DPI 3D geometry, rain & street glints never flicker.
   */
  vec3 sampleCellIntegrated(vec2 centerUv, vec2 cellStepUv, float spread) {
    vec2 ox = vec2(cellStepUv.x * spread, cellStepUv.y * spread * 0.5);
    vec2 oy = vec2(-cellStepUv.x * spread * 0.5, cellStepUv.y * spread);

    vec3 c0 = texture2D(tScene, centerUv).rgb * 0.36;
    vec3 c1 = texture2D(tScene, clamp(centerUv + ox, 0.001, 0.999)).rgb * 0.16;
    vec3 c2 = texture2D(tScene, clamp(centerUv - ox, 0.001, 0.999)).rgb * 0.16;
    vec3 c3 = texture2D(tScene, clamp(centerUv + oy, 0.001, 0.999)).rgb * 0.16;
    vec3 c4 = texture2D(tScene, clamp(centerUv - oy, 0.001, 0.999)).rgb * 0.16;
    return c0 + c1 + c2 + c3 + c4;
  }

  void main() {
    // 1. Integer-aligned center-anchored cell quantization:
    //    - floor(uResolution * 0.5) guarantees pixel centers (gl_FragCoord.xy = k + 0.5) never land
    //      on exact integer 0.0 cell borders even when physicalWidth/Height is odd.
    //    - Once resize transitions settle (uTransitionMix <= 0.001), activeCell snaps to exact integers.
    vec2 halfRes = floor(uResolution * 0.5);
    vec2 activeCell = uTransitionMix > 0.001 ? uCellSize : max(vec2(4.0), floor(uCellSize + 0.5));
    vec2 centeredPx = gl_FragCoord.xy - halfRes;
    vec2 cellCoord = centeredPx / activeCell;
    vec2 cellIndex = floor(cellCoord);
    vec2 localCellUv = fract(cellCoord);
    vec2 glyphUv = vec2(localCellUv.x, 1.0 - localCellUv.y);

    vec2 cellCenterUv = clamp(((cellIndex + 0.5) * activeCell + halfRes) / uResolution, 0.001, 0.999);
    vec2 cellStepUv = activeCell / uResolution;

    // 2. Depth & Depth-of-Field calculation at the cell center
    float rawCenterDepth = texture2D(tDepth, cellCenterUv).r;
    float linearDist = linearizeDepth(rawCenterDepth);
    bool isSky = rawCenterDepth >= 0.9995;

    float focalDiff = abs(linearDist - uDofFocus);
    float coc = clamp((focalDiff - 5.2) / 18.0, 0.0, 1.0) * uDofStrength;
    if (isSky) {
      coc *= 0.30;
    }

    // 3. Sub-cell supersampled color + optional DoF neighbor softening
    vec3 colIntegrated = sampleCellIntegrated(cellCenterUv, cellStepUv, uSubCellSpread);

    vec2 dofSpread = cellStepUv * (0.65 + coc * 1.25);
    vec3 colN = texture2D(tScene, clamp(cellCenterUv + vec2(0.0, dofSpread.y), 0.001, 0.999)).rgb;
    vec3 colS = texture2D(tScene, clamp(cellCenterUv - vec2(0.0, dofSpread.y), 0.001, 0.999)).rgb;
    vec3 colE = texture2D(tScene, clamp(cellCenterUv + vec2(dofSpread.x, 0.0), 0.001, 0.999)).rgb;
    vec3 colW = texture2D(tScene, clamp(cellCenterUv - vec2(dofSpread.x, 0.0), 0.001, 0.999)).rgb;

    vec3 avgNeighbors = (colN + colS + colE + colW) * 0.25;
    vec3 cellColor = mix(colIntegrated, (colIntegrated * 0.45 + avgNeighbors * 0.55), coc);

    // 4. Sample multi-tap bloom buffer
    vec3 bloomCell = texture2D(tBloom, cellCenterUv).rgb;
    vec3 bloomSmooth = texture2D(tBloom, vUv).rgb;
    vec3 bloomBleed = (bloomCell * 0.62 + bloomSmooth * 0.38) * uBloomIntensity;

    vec3 litCellColor = cellColor + bloomBleed * 0.85;
    float luma = getLuma(litCellColor);
    float peakCh = max(litCellColor.r, max(litCellColor.g, litCellColor.b));

    // Perceptual luminance curve: preserves shadow contrast in Day mode while lifting saturated neon in Night/Rain
    float chromaLift = mix(0.38, 0.18, uDaylight);
    float gammaExp = mix(0.74, 0.86, uDaylight);
    float neonLuma = mix(luma, peakCh, chromaLift);
    float dither = (hash12(cellIndex) - 0.5) * 0.02;
    float perceivedLuma = clamp(pow(max(neonLuma, 0.0), gammaExp) + dither, 0.0, 1.0);

    // 5. Resolution-invariant Structural Edge Detection (Sobel on depth + luminance across 1 cell step)
    float dN = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(0.0, cellStepUv.y), 0.001, 0.999)).r);
    float dS = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv - vec2(0.0, cellStepUv.y), 0.001, 0.999)).r);
    float dE = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(cellStepUv.x, 0.0), 0.001, 0.999)).r);
    float dW = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv - vec2(cellStepUv.x, 0.0), 0.001, 0.999)).r);

    float lN = getLuma(texture2D(tScene, clamp(cellCenterUv + vec2(0.0, cellStepUv.y), 0.001, 0.999)).rgb);
    float lS = getLuma(texture2D(tScene, clamp(cellCenterUv - vec2(0.0, cellStepUv.y), 0.001, 0.999)).rgb);
    float lE = getLuma(texture2D(tScene, clamp(cellCenterUv + vec2(cellStepUv.x, 0.0), 0.001, 0.999)).rgb);
    float lW = getLuma(texture2D(tScene, clamp(cellCenterUv - vec2(cellStepUv.x, 0.0), 0.001, 0.999)).rgb);

    float normScale = 1.0 / max(linearDist, 1.6);
    float gxDepth = (dE - dW) * normScale * 4.2;
    float gyDepth = (dN - dS) * normScale * 4.2;
    float gxLuma = (lE - lW) * 1.82;
    float gyLuma = (lN - lS) * 1.82;

    float gx = abs(gxDepth) > abs(gxLuma) ? gxDepth : gxLuma;
    float gy = abs(gyDepth) > abs(gyLuma) ? gyDepth : gyLuma;
    float edgeMag = length(vec2(gx, gy));

    // Adaptive compact-grid silhouette boost so smaller viewports keep sharp outlines
    float gridColsApprox = uResolution.x / max(activeCell.x, 4.0);
    float compactEdgeBoost = mix(1.22, 1.0, clamp((gridColsApprox - 48.0) / 72.0, 0.0, 1.0));
    float effectiveEdge = edgeMag * uEdgeStrength * compactEdgeBoost * (1.0 - coc * 0.78) * smoothstep(0.025, 0.12, perceivedLuma);

    // 6. Select fine typographic glyph index in the 1D horizontal atlas
    float glyphIndex = floor(perceivedLuma * (uRampCount - 0.001));

    // Directional structural silhouette glyphs: [0]='/' [1]='\\' [2]='|' [3]='_' [4]='[' [5]=']'
    if (effectiveEdge > 0.27 && uStructuralCount >= 6.0 && !isSky) {
      float absGx = abs(gx);
      float absGy = abs(gy);
      float structOffset = 2.0;

      if (absGy > absGx * 1.95) {
        structOffset = 3.0; // '_'
      } else if (absGx > absGy * 1.95) {
        if (gxDepth > 0.18) {
          structOffset = 4.0; // '['
        } else if (gxDepth < -0.18) {
          structOffset = 5.0; // ']'
        } else {
          structOffset = 2.0; // '|'
        }
      } else {
        structOffset = (gx * gy < 0.0) ? 0.0 : 1.0; // '/' or '\\'
      }

      glyphIndex = uRampCount + clamp(structOffset, 0.0, uStructuralCount - 1.0);
    }

    // 7. Exact half-texel UV seam guard (0.5 / uAtlasTileSize):
    //    Eliminates neighbor glyph bleed while preserving 100% edge-to-edge full-bleed block continuity (zero cell border gap!)
    vec2 safeTileDims = max(uAtlasTileSize, vec2(32.0, 48.0));
    vec2 halfTexel = 0.55 / safeTileDims;
    vec2 safeGlyphUv = clamp(glyphUv, halfTexel, vec2(1.0) - halfTexel);

    float aaWidth = clamp(1.25 / max(activeCell.y, 6.0) + uTransitionMix * 0.06, 0.055, 0.24);
    float detailAtlasU = (glyphIndex + safeGlyphUv.x) / uTotalGlyphs;
    float rawDetailMask = texture2D(tGlyphAtlas, vec2(detailAtlasU, safeGlyphUv.y)).r;
    float detailGlyphMask = smoothstep(0.44 - aaWidth, 0.44 + aaWidth, rawDetailMask);

    // Continuous screen-space radiance for seamless block-layer & backdrop (zero rectangular cell stepping!)
    vec3 smoothSceneCol = texture2D(tScene, vUv).rgb;
    vec3 pixelLitCol = smoothSceneCol + bloomSmooth * (0.48 * uBloomIntensity);
    float continuousLuma = clamp(pow(max(getLuma(pixelLitCol), 0.0), gammaExp), 0.0, 1.15);

    // Single-pass GPU halftone stipple accent (clamped to stipple tiers 0..uBlockCount-2 so 100% solid rectangles never erase glyphs)
    float maxStippleTiers = max(uBlockCount - 1.0, 1.0);
    float blockPresence = smoothstep(0.14, 0.88, continuousLuma) * (isSky ? mix(0.16, 0.32, uDaylight) : 1.0);
    float blockTier = floor(clamp((perceivedLuma - 0.10) / 0.86, 0.0, 0.999) * maxStippleTiers);
    float blockIndex = uRampCount + uStructuralCount + blockTier;
    float blockAtlasU = (blockIndex + safeGlyphUv.x) / uTotalGlyphs;
    float rawBlockMask = uBlockCount > 0.5 ? texture2D(tGlyphAtlas, vec2(blockAtlasU, safeGlyphUv.y)).r : 0.0;
    float sharpBlockMask = smoothstep(0.38 - aaWidth, 0.38 + aaWidth, rawBlockMask);

    float weightedBlockLayer = sharpBlockMask * blockPresence * uBlockBlendWeight * 0.48;
    float compositeMask = max(detailGlyphMask, clamp(weightedBlockLayer, 0.0, 0.22));

    // 8. Pure-ASCII value modulation & restrained terminal substrate (zero solid light blowout)
    float rawLuma = max(getLuma(litCellColor), 0.0001);
    vec3 normalizedHue = mix(vec3(1.0), litCellColor / rawLuma, 0.82);
    float boostGain = mix(1.42, 1.26, uDaylight);
    float boostedBrightness = mix(perceivedLuma, min(1.22, rawLuma * boostGain + 0.07), 0.72);
    vec3 glyphColor = min(normalizedHue * boostedBrightness, vec3(1.18, 1.20, 1.22));

    vec3 blockTone = glyphColor * 0.72 + bloomSmooth * (0.08 * uBloomIntensity);
    vec3 litForeground = mix(blockTone, glyphColor, clamp(detailGlyphMask * 1.18, 0.0, 1.0));

    // Dark terminal substrate keeps high glyph-to-background contrast even at light cores and reflections
    vec3 atmosphericMist = min(
      bloomSmooth * (0.045 * uBloomIntensity) + smoothSceneCol * 0.025,
      vec3(0.065)
    );
    vec3 smoothBackdrop = uBgColor + atmosphericMist;

    vec3 finalColor = mix(smoothBackdrop, litForeground, compositeMask);

    vec2 centeredUv = vUv - 0.5;
    float vignette = 1.0 - dot(centeredUv, centeredUv) * mix(0.30, 0.18, uDaylight);
    finalColor = mix(uBgColor, finalColor, clamp(vignette, 0.66, 1.0));

    finalColor = finalColor / (1.0 + finalColor * 0.15);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`,AM='"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';function fl(o,e,t,n=64){const i=o.length>=2?o:" .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",s=e.length>=4?e:"/\\|_[]",r=4,a=i.length+s.length,l=a+r,c=Math.max(48,Math.min(128,Math.round(n/8)*8)),h=Math.round(c*.625),u=Math.round(c*.9),d=Math.round(c*.96),f=document.createElement("canvas");f.width=h*l,f.height=c;const m=f.getContext("2d",{alpha:!1});if(!m)throw new Error("[AsciiSceneEngine] Unable to create 2D Canvas context for glyph atlas.");m.fillStyle="#000000",m.fillRect(0,0,f.width,f.height);const v=t||AM;m.fillStyle="#FFFFFF",m.textAlign="center",m.textBaseline="middle";const g=i+s;for(let b=0;b<a;b++){const A=g[b]??" ";if(A===" ")continue;const R=b>=i.length;m.font=`700 ${R?d:u}px ${v}`,typeof m.save=="function"&&typeof m.beginPath=="function"&&typeof m.clip=="function"?(m.save(),m.beginPath(),m.rect(b*h+1,0,h-2,c),m.clip(),m.fillText(A,b*h+h*.5,c*.52),m.restore()):m.fillText(A,b*h+h*.5,c*.52)}const p=4,x=8,_=h/p,y=c/x;for(let b=0;b<r;b++){const A=(a+b)*h;if(b===3){m.fillStyle="#FFFFFF",m.fillRect(A,0,h,c);continue}const R=b===0?.28:b===1?.54:.8;m.fillStyle="#FFFFFF";for(let S=0;S<x;S++)for(let M=0;M<p;M++)((M&1)<<2|(S&1)<<3|(M&2)>>1|S&2)/16<R&&m.fillRect(Math.round(A+M*_),Math.round(S*y),Math.ceil(_),Math.ceil(y))}const C=new yf(f);return C.minFilter=ct,C.magFilter=ct,C.wrapS=qt,C.wrapT=qt,C.generateMipmaps=!1,C.needsUpdate=!0,{texture:C,rampCount:i.length,structuralCount:s.length,blockCount:r,totalGlyphs:l,tileSize:c,tileWidth:h,tileHeight:c}}class EM{constructor(e){F(this,"quadScene");F(this,"quadCamera");F(this,"quadGeometry");F(this,"quadMesh");F(this,"sceneTarget");F(this,"depthTexture");F(this,"bloomTargetA");F(this,"bloomTargetB");F(this,"atlasData");F(this,"downsampleMaterial");F(this,"blurMaterial");F(this,"compositeMaterial");F(this,"transitionController");F(this,"lastProfile",null);F(this,"allocatedPhysW",2);F(this,"allocatedPhysH",2);F(this,"allocatedBloomW",2);F(this,"allocatedBloomH",2);this.quadCamera=new Os(-1,1,1,-1,0,1),this.quadScene=new Hs,this.quadGeometry=new Tn(2,2),this.transitionController=new vh(14),this.atlasData=fl(e.characterRamp,e.structuralChars,e.fontFamily,64),this.depthTexture=new pa(2,2),this.depthTexture.type=Un,this.depthTexture.minFilter=gt,this.depthTexture.magFilter=gt,this.sceneTarget=new Qt(2,2,{minFilter:ct,magFilter:ct,format:At,type:Vn,depthBuffer:!0,stencilBuffer:!1,depthTexture:this.depthTexture}),this.bloomTargetA=new Qt(2,2,{minFilter:ct,magFilter:ct,format:At,type:Vn,depthBuffer:!1,stencilBuffer:!1}),this.bloomTargetB=new Qt(2,2,{minFilter:ct,magFilter:ct,format:At,type:Vn,depthBuffer:!1,stencilBuffer:!1}),this.downsampleMaterial=new Dt({vertexShader:Rh,fragmentShader:wM,depthWrite:!1,depthTest:!1,uniforms:{tScene:{value:this.sceneTarget.texture},uTexelSize:{value:new Z(.5,.5)},uThreshold:{value:e.bloomThreshold},uTime:{value:0}}}),this.blurMaterial=new Dt({vertexShader:Rh,fragmentShader:bM,depthWrite:!1,depthTest:!1,uniforms:{tInput:{value:null},uTexelSize:{value:new Z(.5,.5)},uDirection:{value:new Z(1,0)}}});const t=new G;this.syncSubstrateColor(e,t),this.compositeMaterial=new Dt({vertexShader:Rh,fragmentShader:TM,depthWrite:!1,depthTest:!1,uniforms:{tScene:{value:this.sceneTarget.texture},tDepth:{value:this.depthTexture},tBloom:{value:this.bloomTargetA.texture},tGlyphAtlas:{value:this.atlasData.texture},uResolution:{value:new Z(2,2)},uCellSize:{value:new Z(8,13)},uAtlasTileSize:{value:new Z(this.atlasData.tileWidth,this.atlasData.tileHeight)},uSubCellSpread:{value:.22},uTransitionMix:{value:0},uRampCount:{value:this.atlasData.rampCount},uStructuralCount:{value:this.atlasData.structuralCount},uBlockCount:{value:this.atlasData.blockCount},uTotalGlyphs:{value:this.atlasData.totalGlyphs},uCameraNear:{value:.5},uCameraFar:{value:110},uDofFocus:{value:e.dofFocusDistance},uDofStrength:{value:e.dofStrength},uEdgeStrength:{value:e.edgeStrength},uBlockBlendWeight:{value:e.blockBlendWeight},uBloomIntensity:{value:e.bloomIntensity},uDaylight:{value:e.atmosphere==="day"?1:0},uBgColor:{value:t},uTime:{value:0}}}),this.quadMesh=new Y(this.quadGeometry,this.compositeMaterial),this.quadMesh.frustumCulled=!1,this.quadScene.add(this.quadMesh)}applyResolutionProfile(e,t,n=!1){this.lastProfile=e,(this.allocatedPhysW!==e.physicalWidth||this.allocatedPhysH!==e.physicalHeight)&&(this.allocatedPhysW=e.physicalWidth,this.allocatedPhysH=e.physicalHeight,this.sceneTarget.setSize(e.physicalWidth,e.physicalHeight));const i=Math.max(2,Math.floor(e.physicalWidth/e.bloomDownsample)),s=Math.max(2,Math.floor(e.physicalHeight/e.bloomDownsample));(this.allocatedBloomW!==i||this.allocatedBloomH!==s)&&(this.allocatedBloomW=i,this.allocatedBloomH=s,this.bloomTargetA.setSize(i,s),this.bloomTargetB.setSize(i,s)),this.downsampleMaterial.uniforms.uTexelSize.value.set(1/e.physicalWidth,1/e.physicalHeight),this.blurMaterial.uniforms.uTexelSize.value.set(1/i,1/s),this.compositeMaterial.uniforms.uResolution.value.set(e.physicalWidth,e.physicalHeight),this.transitionController.setTarget(e,n);const r=this.transitionController.step(0);return this.compositeMaterial.uniforms.uCellSize.value.set(r.cellW,r.cellH),this.compositeMaterial.uniforms.uSubCellSpread.value=r.subCellSpread,this.compositeMaterial.uniforms.uTransitionMix.value=r.transitionMix,this.atlasData.tileSize!==e.atlasTileSize&&this.rebuildGlyphAtlas(t,e.atlasTileSize),e}setSize(e,t,n,i,s=!1){const r=qr({cssWidth:e,cssHeight:t,devicePixelRatio:n,config:i,isCoarsePointer:s});return this.applyResolutionProfile(r,i)}applyConfig(e,t,n,i,s=1,r=!1){var l;const a=qr({cssWidth:n,cssHeight:i,devicePixelRatio:((l=this.lastProfile)==null?void 0:l.effectiveDpr)??s,config:e,isCoarsePointer:r});return(t||this.atlasData.tileSize!==a.atlasTileSize)&&this.rebuildGlyphAtlas(e,a.atlasTileSize),this.downsampleMaterial.uniforms.uThreshold.value=e.bloomThreshold,this.compositeMaterial.uniforms.uBloomIntensity.value=e.bloomIntensity,this.compositeMaterial.uniforms.uDofFocus.value=e.dofFocusDistance,this.compositeMaterial.uniforms.uDofStrength.value=e.dofStrength,this.compositeMaterial.uniforms.uEdgeStrength.value=e.edgeStrength,this.compositeMaterial.uniforms.uBlockBlendWeight.value=e.blockBlendWeight,this.compositeMaterial.uniforms.uDaylight.value=e.atmosphere==="day"?1:0,this.syncSubstrateColor(e,this.compositeMaterial.uniforms.uBgColor.value),this.applyResolutionProfile(a,e,!1)}syncSubstrateColor(e,t){t.set(e.palette.background),t.convertLinearToSRGB(),t.multiplyScalar(e.mode==="mascot"?.72:.88)}rebuildGlyphAtlas(e,t){const n=this.atlasData;this.atlasData=fl(e.characterRamp,e.structuralChars,e.fontFamily,t),this.compositeMaterial.uniforms.tGlyphAtlas.value=this.atlasData.texture,this.compositeMaterial.uniforms.uAtlasTileSize.value.set(this.atlasData.tileWidth,this.atlasData.tileHeight),this.compositeMaterial.uniforms.uRampCount.value=this.atlasData.rampCount,this.compositeMaterial.uniforms.uStructuralCount.value=this.atlasData.structuralCount,this.compositeMaterial.uniforms.uBlockCount.value=this.atlasData.blockCount,this.compositeMaterial.uniforms.uTotalGlyphs.value=this.atlasData.totalGlyphs,n.texture.dispose()}render(e,t,n,i,s=.016666666666666666){const r=this.transitionController.step(s);this.compositeMaterial.uniforms.uCellSize.value.set(r.cellW,r.cellH),this.compositeMaterial.uniforms.uSubCellSpread.value=r.subCellSpread,this.compositeMaterial.uniforms.uTransitionMix.value=r.transitionMix,this.compositeMaterial.uniforms.uCameraNear.value=n.near,this.compositeMaterial.uniforms.uCameraFar.value=n.far,this.compositeMaterial.uniforms.uTime.value=i,this.downsampleMaterial.uniforms.uTime.value=i,e.setRenderTarget(this.sceneTarget),e.clear(!0,!0,!1),e.render(t,n);const a=e.info.render.calls,l=e.info.render.triangles;return this.compositeMaterial.uniforms.uBloomIntensity.value>.001&&(this.quadMesh.material=this.downsampleMaterial,e.setRenderTarget(this.bloomTargetA),e.render(this.quadScene,this.quadCamera),this.quadMesh.material=this.blurMaterial,this.blurMaterial.uniforms.tInput.value=this.bloomTargetA.texture,this.blurMaterial.uniforms.uDirection.value.set(1.35,0),e.setRenderTarget(this.bloomTargetB),e.render(this.quadScene,this.quadCamera),this.quadMesh.material=this.blurMaterial,this.blurMaterial.uniforms.tInput.value=this.bloomTargetB.texture,this.blurMaterial.uniforms.uDirection.value.set(0,1.35),e.setRenderTarget(this.bloomTargetA),e.render(this.quadScene,this.quadCamera)),this.quadMesh.material=this.compositeMaterial,e.setRenderTarget(null),e.render(this.quadScene,this.quadCamera),{drawCalls:a,triangles:l}}dispose(){this.quadScene.remove(this.quadMesh),this.quadGeometry.dispose(),this.downsampleMaterial.dispose(),this.blurMaterial.dispose(),this.compositeMaterial.dispose(),this.atlasData.texture.dispose(),this.depthTexture.dispose(),this.sceneTarget.dispose(),this.bloomTargetA.dispose(),this.bloomTargetB.dispose()}}const cs="#7DF9FF",pl="__AsciiObjectOutlineShell__",CM=`
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
`,RM=`
  precision highp float;

  uniform vec3 uOutlineColor;
  uniform float uOutlineIntensity;
  uniform float uOutlineOpacity;

  void main() {
    gl_FragColor = vec4(uOutlineColor * uOutlineIntensity, uOutlineOpacity);
  }
`,Zr=new WeakMap;function ml(o,e,t){return Number.isFinite(o)?Math.max(e,Math.min(t,o)):e}function Ph(o,e){const t=new G;if(o==null)return t.set(e),t;if(o instanceof G)return o.clone();try{return t.set(o),t}catch{return t.set(e),t}}function Ih(o){if(o.getAttribute("aOutlineNormal"))return;const e=o.getAttribute("position");if(!e||e.count===0)return;o.getAttribute("normal")||o.computeVertexNormals();const t=o.getAttribute("normal");if(!t)return;const n=e.count,i=new Map,s=new Array(n);for(let a=0;a<n;a++){const l=Math.round(e.getX(a)*1e4),c=Math.round(e.getY(a)*1e4),h=Math.round(e.getZ(a)*1e4),u=`${l},${c},${h}`;s[a]=u;let d=t.getX(a),f=t.getY(a),m=t.getZ(a);const v=Math.hypot(d,f,m);v>1e-6&&(d/=v,f/=v,m/=v);let g=i.get(u);g||(g={sumX:0,sumY:0,sumZ:0,seen:new Set},i.set(u,g));const p=`${Math.round(d*100)},${Math.round(f*100)},${Math.round(m*100)}`;g.seen.has(p)||(g.seen.add(p),g.sumX+=d,g.sumY+=f,g.sumZ+=m)}const r=new Float32Array(n*3);for(let a=0;a<n;a++){const l=i.get(s[a]);let c=l?l.sumX:t.getX(a),h=l?l.sumY:t.getY(a),u=l?l.sumZ:t.getZ(a),d=Math.hypot(c,h,u);d<=1e-5&&(c=t.getX(a),h=t.getY(a),u=t.getZ(a),d=Math.hypot(c,h,u)||1),r[a*3]=c/d,r[a*3+1]=h/d,r[a*3+2]=u/d}o.setAttribute("aOutlineNormal",new $e(r,3))}function PM(o,e,t){var i,s,r,a,l;if((i=o.userData)!=null&&i.__isAsciiOutlineShell||(s=o.userData)!=null&&s.skipObjectOutline||o.name===pl)return!1;let n=o.parent;for(;n;){if((r=n.userData)!=null&&r.__isAsciiOutlineShell)return!1;n=n.parent}return e&&((a=o.userData)!=null&&a.isShowcasePedestal||o.name==="TuxShowcasePlinth"||((l=o.geometry)==null?void 0:l.type)==="RingGeometry")||t&&!t(o)?!1:!!(o.geometry&&o.geometry.getAttribute("position"))}function IM(o){const e=Ph(o.highlightColor,cs);return new Dt({name:"AsciiObjectOutlineMaterial",vertexShader:CM,fragmentShader:RM,side:Ft,transparent:o.opacity<.999,depthTest:!0,depthWrite:o.opacity>=.999,toneMapped:!1,uniforms:{uOutlineThickness:{value:o.thickness},uOutlineColor:{value:e},uOutlineIntensity:{value:o.intensity},uOutlineOpacity:{value:o.opacity},uDepthBias:{value:o.depthBias}}})}function Lp(o){var i;const e=new Set;o.target.traverse(s=>{if(s.isMesh){const r=s;PM(r,o.state.excludePedestal,o.meshFilter)&&e.add(r)}});for(const[s,r]of o.shells.entries())e.has(s)||((i=r.parent)==null||i.remove(r),o.shells.delete(s));for(const s of e){let r=o.shells.get(s);r||(Ih(s.geometry),r=new Y(s.geometry,o.material),r.name=pl,r.userData.__isAsciiOutlineShell=!0,r.castShadow=!1,r.receiveShadow=!1,r.frustumCulled=s.frustumCulled,r.renderOrder=(s.renderOrder||0)+1,s.add(r),o.shells.set(s,r)),r.visible=o.state.enabled}const t=o.material.uniforms;t.uOutlineThickness&&(t.uOutlineThickness.value=o.state.thickness),t.uOutlineColor&&t.uOutlineColor.value.copy(Ph(o.state.highlightColor,cs)),t.uOutlineIntensity&&(t.uOutlineIntensity.value=o.state.intensity),t.uOutlineOpacity&&(t.uOutlineOpacity.value=o.state.opacity),t.uDepthBias&&(t.uDepthBias.value=o.state.depthBias);const n=o.state.opacity<.999;o.material.transparent!==n&&(o.material.transparent=n,o.material.depthWrite=!n,o.material.needsUpdate=!0)}function gl(o){return{enabled:o.state.enabled,thickness:o.state.thickness,highlightColor:o.state.highlightColor,intensity:o.state.intensity,opacity:o.state.opacity,depthBias:o.state.depthBias,excludePedestal:o.state.excludePedestal,outlinedMeshCount:o.shells.size}}function Kr(o,e){if(!o||typeof o.traverse!="function")throw new TypeError("[applyObjectOutline] Expected a valid THREE.Object3D target.");const t=Zr.get(o),n=(e==null?void 0:e.enabled)!==void 0?e.enabled:(e==null?void 0:e.visible)!==void 0?e.visible:(t==null?void 0:t.state.enabled)??!0,i=(e==null?void 0:e.thickness)!==void 0?e.thickness:(e==null?void 0:e.width)!==void 0?e.width:(t==null?void 0:t.state.thickness)??1,s=(e==null?void 0:e.highlightColor)!==void 0?e.highlightColor:(e==null?void 0:e.color)!==void 0?e.color:(t==null?void 0:t.state.highlightColor)??cs,r=Ph(s,cs),a={enabled:!!n,thickness:ml(i,.05,8),highlightColor:`#${r.getHexString().toUpperCase()}`,intensity:ml((e==null?void 0:e.intensity)??(t==null?void 0:t.state.intensity)??1.85,.1,6),opacity:ml((e==null?void 0:e.opacity)??(t==null?void 0:t.state.opacity)??1,0,1),depthBias:ml((e==null?void 0:e.depthBias)??(t==null?void 0:t.state.depthBias)??.0012,0,.05),excludePedestal:(e==null?void 0:e.excludePedestal)??(t==null?void 0:t.state.excludePedestal)??!0};if(t)return t.state=a,(e==null?void 0:e.meshFilter)!==void 0&&(t.meshFilter=e.meshFilter),Lp(t),t.handle;const l=IM(a),h={target:o,material:l,shells:new Map,state:a,meshFilter:e==null?void 0:e.meshFilter,handle:null},u={target:o,getState:()=>gl(h),update:d=>(Kr(o,d),gl(h)),setVisible:d=>(Kr(o,{enabled:d}),gl(h)),dispose:()=>er(o)};return h.handle=u,Zr.set(o,h),Lp(h),u}function er(o){var s,r;if(!o)return 0;const e=Zr.get(o);let t=0;if(e){for(const a of e.shells.values())(s=a.parent)==null||s.remove(a),t+=1;return e.shells.clear(),e.material.dispose(),Zr.delete(o),t}const n=[];o.traverse(a=>{var l;a.isMesh&&((l=a.userData)!=null&&l.__isAsciiOutlineShell)&&n.push(a)});const i=new Set;for(const a of n)(r=a.parent)==null||r.remove(a),a.material&&!Array.isArray(a.material)&&!i.has(a.material)&&(i.add(a.material),a.material.dispose()),t+=1;return t}function vl(o){const e=Zr.get(o);return e?gl(e):null}class Lh{constructor(e){F(this,"mode");F(this,"baseCameraPos",new E);F(this,"lookAtTarget",new E);F(this,"smoothedPointer",new Z(0,0));F(this,"cursorLight");F(this,"particles",null);F(this,"particlePositions",null);F(this,"particleColors",null);F(this,"particleSeeds",[]);F(this,"centerOffset",[0,-10.4]);F(this,"currentAtmosphere","night");this.mode=e.config.mode,this.currentAtmosphere=e.config.atmosphere??"night",this.baseCameraPos.set(...e.baseCameraPos),this.lookAtTarget.set(...e.lookAtTarget),e.particleOrigin&&(this.centerOffset=e.particleOrigin),this.cursorLight=new _i(new G(e.config.palette.cursorLight),this.mode==="mascot"?0:e.config.cursorLightIntensity*3.8,14,1.7),this.cursorLight.position.set(0,2,4.2),this.mode!=="mascot"&&e.scene.add(this.cursorLight);const t=e.particleCount??(this.mode==="mascot"?0:240);t>0&&this.mode!=="mascot"&&this.buildParticles(e.scene,e.config,t)}buildParticles(e,t,n){this.particlePositions=new Float32Array(n*3),this.particleColors=new Float32Array(n*3);for(let r=0;r<n;r++){const a=r%10,l=a<7?"rain":a<9?"steam":"spark",c=Math.sin(r*91.3+1.7)*43758.5453,h=Math.sin(r*217.9+5.3)*43758.5453,u=c-Math.floor(c),d=h-Math.floor(h),f=.7+u*5.6,m=r*2.39996,v=l==="rain"?-.2:.15,g=l==="rain"?16.5:l==="steam"?4.2:8.4,p=l==="steam"?(r%2===0?-3.6:3.6)+(u-.5)*2.2:(u-.5)*26,x=l==="steam"?-3.5+d*10.5:(d-.5)*24-2,_=l==="rain"?-(11.4+r%6*1.9):l==="steam"?.65+r%4*.18:.55+r%5*.16,y=v+d*(g-v);this.particleSeeds.push({kind:l,baseRadius:f,angleOffset:m,speedY:_,minY:v,maxY:g,spawnX:p,spawnZ:x,windSensitivity:.75+r%5*.14}),this.particlePositions[r*3]=l==="spark"?Math.cos(m)*f+this.centerOffset[0]:p,this.particlePositions[r*3+1]=l==="rain"&&t.atmosphere!=="rain"?-120:y,this.particlePositions[r*3+2]=l==="spark"?Math.sin(m)*f+this.centerOffset[1]:x}const i=new Ge;i.setAttribute("position",new $e(this.particlePositions,3)),i.setAttribute("color",new $e(this.particleColors,3));const s=new qs({size:.24,vertexColors:!0,transparent:!0,opacity:.62,blending:ai,depthWrite:!1});this.particles=new Zs(i,s),this.particles.userData.skipObjectOutline=!0,e.add(this.particles),this.syncParticleAtmosphere(t)}syncParticleAtmosphere(e){if(this.currentAtmosphere=e.atmosphere??"night",!this.particles||!this.particleColors||!this.particlePositions)return;const t=this.mode==="playground"&&this.currentAtmosphere==="rain",n=this.mode==="playground"&&this.currentAtmosphere==="day",i=new G(e.palette.coolAmbient),s=new G(e.palette.warmLight),r=new G(e.palette.warmCore),a=n?.28:t?.85:.48;for(let u=0;u<this.particleSeeds.length;u++){const d=this.particleSeeds[u];if(d.kind==="rain"){if(!t){this.particleColors[u*3]=0,this.particleColors[u*3+1]=0,this.particleColors[u*3+2]=0,this.particlePositions[u*3+1]=-120;continue}const f=u%6===0?s:u%3===0?r:i;this.particleColors[u*3]=f.r,this.particleColors[u*3+1]=f.g,this.particleColors[u*3+2]=f.b}else{const f=d.kind==="steam"?n?r:u%2===0?i:r:u%3===0?s:r;this.particleColors[u*3]=f.r*a,this.particleColors[u*3+1]=f.g*a,this.particleColors[u*3+2]=f.b*a}}const l=this.particles.material;l.size=t?.26:n?.18:.21,l.opacity=t?.72:n?.34:.52;const c=this.particles.geometry.getAttribute("color");c.needsUpdate=!0;const h=this.particles.geometry.getAttribute("position");h.needsUpdate=!0}update(e,t,n,i,s){if(this.mode==="mascot"){i.position.copy(this.baseCameraPos),i.lookAt(this.lookAtTarget);return}const r=1-Math.exp(-s.parallaxSmoothing*e),a=n.active?n.normX:0,l=n.active?n.normY:0;if(this.smoothedPointer.x+=(a-this.smoothedPointer.x)*r,this.smoothedPointer.y+=(l-this.smoothedPointer.y)*r,this.cursorLight.position.set(i.position.x+this.smoothedPointer.x*4.2,1.85+this.smoothedPointer.y*1.2,i.position.z-3.6-this.smoothedPointer.y*2.8),this.particles&&this.particlePositions){const c=s.windStrength??1,h=(.75+.38*Math.sin(t*.68)+.18*Math.sin(t*1.95))*c,u=(s.atmosphere??"night")==="rain",d=i.position.z-4,f=this.particleSeeds.length;for(let v=0;v<f;v++){const g=this.particleSeeds[v],p=g.maxY-g.minY;if(g.kind==="rain"){if(!u){this.particlePositions[v*3+1]=-120;continue}const x=((g.maxY+t*g.speedY-v*.73)%p+p)%p,_=g.minY+x,C=(g.maxY-_)*.16*h*g.windSensitivity,b=i.position.x+(((g.spawnX-i.position.x+C+14)%28+28)%28-14),A=d+(((g.spawnZ-d+12)%24+24)%24-12);this.particlePositions[v*3]=b,this.particlePositions[v*3+1]=_,this.particlePositions[v*3+2]=A}else if(g.kind==="steam"){const x=((t*g.speedY+v*.57)%p+p)%p,_=g.minY+x,y=x*.72*h*g.windSensitivity+Math.sin(t*1.4+v)*.25;this.particlePositions[v*3]=g.spawnX+y,this.particlePositions[v*3+1]=_,this.particlePositions[v*3+2]=g.spawnZ+Math.cos(t*.9+v)*.2}else{const x=g.minY+((t*g.speedY+v*.41)%p+p)%p,_=g.angleOffset+t*.32*(v%2===0?1:-1),y=g.baseRadius+Math.sin(t*.9+v)*.18,C=(x-g.minY)*.12*h;this.particlePositions[v*3]=Math.cos(_)*y+this.centerOffset[0]+C,this.particlePositions[v*3+1]=x,this.particlePositions[v*3+2]=Math.sin(_)*y+this.centerOffset[1]}}const m=this.particles.geometry.getAttribute("position");m.needsUpdate=!0}}applyConfig(e){const t=e.atmosphere==="day"?.55:1;this.cursorLight.color.set(e.palette.cursorLight),this.cursorLight.intensity=this.mode==="mascot"?0:e.cursorLightIntensity*3.8*t,this.syncParticleAtmosphere(e)}isRainActive(){return this.mode==="playground"&&this.currentAtmosphere==="rain"}getCursorLight(){return this.cursorLight}}const Dp={id:"cyberpunk-citadel",title:"Sector 09 // Entropic Cyber-Noir Boulevard",themeStyle:"cyberpunk",terrainSize:60,terrainSegments:64,waterSize:68,waterLevel:-.06,fogDensity:.017,cameraAnchor:[0,2.25,7.85],cameraLookAt:[0,1.08,4.15],shrineCenter:[0,-10.4],avatarSpawn:[0,4.15],buildings:[{x:-7.1,z:5.4,width:3.1,depth:3.2,height:8.6,floors:5,neonTone:"cyan",hasBillboard:!0,hasStorefront:!0,setbackRatio:.78},{x:7.2,z:5.2,width:3.2,depth:3.2,height:9.2,floors:6,neonTone:"magenta",hasBillboard:!0,hasStorefront:!0,setbackRatio:.75},{x:-6.6,z:.8,width:3,depth:3.4,height:11.4,floors:7,neonTone:"amber",hasBillboard:!0,hasStorefront:!0,hasAntenna:!0,setbackRatio:.72},{x:6.7,z:.6,width:3.1,depth:3.4,height:12.2,floors:8,neonTone:"cyan",hasBillboard:!0,hasStorefront:!0,hasAntenna:!0,setbackRatio:.7},{x:-6.4,z:-4.2,width:3.2,depth:3.4,height:14.5,floors:9,neonTone:"magenta",hasBillboard:!0,hasStorefront:!0,hasAntenna:!0,setbackRatio:.68},{x:6.5,z:-4.4,width:3.2,depth:3.4,height:15.2,floors:10,neonTone:"amber",hasBillboard:!0,hasStorefront:!0,hasAntenna:!0,setbackRatio:.68},{x:-11.2,z:-1.8,width:3.8,depth:4,height:13.6,floors:8,neonTone:"cyan",hasAntenna:!0},{x:11.4,z:-2,width:3.8,depth:4,height:14,floors:9,neonTone:"magenta",hasAntenna:!0},{x:-14.2,z:-12.5,width:4.4,depth:4.2,height:19.5,floors:12,neonTone:"cyan",hasAntenna:!0,setbackRatio:.65},{x:-7.2,z:-13.8,width:4.2,depth:4,height:23.5,floors:14,neonTone:"magenta",hasAntenna:!0,hasBillboard:!0,setbackRatio:.66},{x:-2.6,z:-18.2,width:4,depth:4,height:27.5,floors:16,neonTone:"cyan",hasAntenna:!0,setbackRatio:.62},{x:2.8,z:-18.6,width:4.2,depth:4,height:29,floors:17,neonTone:"amber",hasAntenna:!0,setbackRatio:.6},{x:7.5,z:-14,width:4.2,depth:4,height:22.8,floors:14,neonTone:"cyan",hasAntenna:!0,hasBillboard:!0,setbackRatio:.66},{x:14.4,z:-12.2,width:4.4,depth:4.2,height:18.8,floors:11,neonTone:"magenta",hasAntenna:!0,setbackRatio:.68}],streetPoles:[{x:-4.35,z:6.4,height:4.3,side:-1,tone:"cyan",hasHangingBanner:!0},{x:4.35,z:6.4,height:4.3,side:1,tone:"magenta",hasHangingBanner:!0},{x:-4.35,z:1.9,height:4.5,side:-1,tone:"amber",hasHangingBanner:!0},{x:4.35,z:1.9,height:4.5,side:1,tone:"cyan",hasHangingBanner:!0},{x:-4.35,z:-2.6,height:4.6,side:-1,tone:"magenta",hasHangingBanner:!0},{x:4.35,z:-2.6,height:4.6,side:1,tone:"amber",hasHangingBanner:!0}],drones:[{origin:[0,5.4,-1.2],amplitude:[6.4,.42,3.6],speed:.68,phase:0,tone:"cyan"},{origin:[0,7.2,-7.4],amplitude:[9.6,.52,2.8],speed:-.52,phase:2.1,tone:"magenta"},{origin:[0,9.4,-12.5],amplitude:[11.5,.48,2.2],speed:.44,phase:4.2,tone:"amber"}],braziers:[{x:-3.65,z:3.2,tone:"cyan"},{x:3.65,z:3.2,tone:"magenta"}]},Dh={"cyberpunk-citadel":Dp};class Uh{static load(e){return e&&Dh[e]?Dh[e]:Dp}static listMapIds(){return Object.keys(Dh)}}const tr="#13222E",Nh="#1D2B36",LM=`
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,DM=`
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
`,UM=`
  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,NM=`
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
`;let Fh=null;function FM(){if(!Fh){const o=new Uint8Array([255,255,255,255]),e=new vn(o,1,1,At,mn);e.minFilter=gt,e.magFilter=gt,e.needsUpdate=!0,Fh=e}return Fh}class Oh{static build(e){const t=new G(tr),n=new G(Nh),i=new Hs;i.background=t.clone();const s=-3.35,r=new Dt({vertexShader:LM,fragmentShader:DM,uniforms:{uBackdropColor:{value:t.clone()}},depthWrite:!0}),a=new Y(new Tn(26,14,1,1),r);a.name="MascotStageBackdrop",a.position.set(0,4.6,s),a.userData.isMascotBackdrop=!0,a.userData.skipObjectOutline=!0,i.add(a);const l=FM(),c=new Dt({vertexShader:UM,fragmentShader:NM,uniforms:{uFloorColor:{value:n.clone()},uBackdropColor:{value:t.clone()},uReflectBellyColor:{value:new G("#DCEBF5")},uReflectAmberColor:{value:new G("#FF9F1C")},uReflectRimColor:{value:new G("#7FA8C4")},uCamPos:{value:new E(0,1.08,4.25)},uSubjectPos:{value:new E(0,0,0)},uSubjectYaw:{value:.14},uHorizonZ:{value:s},uDirShadowMap:{value:l},uDirShadowMatrix:{value:new Ne},uShadowMapSize:{value:new Z(1024,1024)},uShadowEnabled:{value:0}},depthWrite:!0}),h=new Y(new Tn(24,12,1,1),c);h.name="MascotStageFloor",h.rotation.x=-Math.PI/2,h.position.set(0,0,-.55),h.receiveShadow=!0,h.userData.isMascotFloor=!0,h.userData.skipObjectOutline=!0,i.add(h);const u=new Qa(13953527,3492958,.92);u.name="MascotHemiLight",i.add(u);const d=new Mi(16186111,1.24);d.name="MascotKeyLight",d.position.set(-2.1,3.6,4.1),e.enableShadows&&(d.castShadow=!0,d.shadow.mapSize.width=1024,d.shadow.mapSize.height=1024,d.shadow.radius=3.2,d.shadow.bias=-4e-4,d.shadow.normalBias=.02,d.shadow.camera.left=-1.8,d.shadow.camera.right=1.8,d.shadow.camera.top=2.5,d.shadow.camera.bottom=-.6,d.shadow.camera.near=.5,d.shadow.camera.far=12,d.shadow.camera.updateProjectionMatrix()),i.add(d);const f=new Mi(14478584,.56);f.name="MascotFillLight",f.position.set(2.4,1.9,3.5),i.add(f);const m=new Mi(10146032,.82);m.name="MascotRimLight",m.position.set(2.35,2.25,-2.9),i.add(m);const v=new Mi(8961758,.6);return v.name="MascotBackLeftRimLight",v.position.set(-2.25,2.1,-2.8),i.add(v),{scene:i,backdropMesh:a,backdropMaterial:r,floorMesh:h,floorMaterial:c,hemiLight:u,keyLight:d,fillLight:f,rimLight:m,backLeftRimLight:v}}}const OM={foreground:0,midground:1,background:2,sky:3};class Bh{constructor(){F(this,"blueprints",new Map)}register(e){return this.blueprints.set(e.id,e),this}has(e){return this.blueprints.has(e)}listIds(){return Array.from(this.blueprints.keys())}spawn(e,t,n){var u,d,f,m;const i=this.blueprints.get(e);if(!i)throw new Error(`[EntityBlueprintRegistry] Unknown blueprint "${e}".`);const s=i.build(t,n),r=t.scale??1,a=t.rotationY??0,l=t.layer??i.defaultLayer;s.object3D.position.set(t.position[0],t.position[1],t.position[2]),s.object3D.rotation.y=a,s.object3D.scale.setScalar(r),(t.parentGroup??t.scene).add(s.object3D),s.pointLight&&!s.pointLight.parent&&t.scene.add(s.pointLight);const h=t.world.createEntity();if(t.world.addComponent(h,"LifecycleTag",{role:i.role,label:((d=(u=s.components)==null?void 0:u.LifecycleTag)==null?void 0:d.label)??`${i.id}#${h}`}),t.world.addComponent(h,"DepthLayer",{layer:l,order:OM[l],contrastPriority:((m=(f=s.components)==null?void 0:f.DepthLayer)==null?void 0:m.contrastPriority)??i.contrastPriority??(l==="foreground"?1:l==="midground"?.72:.45)}),t.world.addComponent(h,"Transform",{x:t.position[0],y:t.position[1],z:t.position[2],rotX:0,rotY:a,rotZ:0,scaleX:r,scaleY:r,scaleZ:r}),t.world.addComponent(h,"Renderable",{object3D:s.object3D,pointLight:s.pointLight,baseLightIntensity:s.baseLightIntensity,lightFlickerSpeed:s.lightFlickerSpeed,disposeOnDestroy:!0}),s.components){const v=Object.keys(s.components);for(const g of v){if(g==="LifecycleTag"||g==="DepthLayer")continue;const p=s.components[g];p!==void 0&&t.world.addComponent(h,g,p)}}return{entityId:h,object3D:s.object3D,pointLight:s.pointLight}}}class hn{constructor(e){F(this,"foreground",new je);F(this,"midground",new je);F(this,"background",new je);F(this,"sky",new je);this.foreground.name="DepthLayer_Foreground",this.midground.name="DepthLayer_Midground",this.background.name="DepthLayer_Background",this.sky.name="DepthLayer_Sky",e.add(this.sky),e.add(this.background),e.add(this.midground),e.add(this.foreground)}getGroup(e){switch(e){case"foreground":return this.foreground;case"midground":return this.midground;case"background":return this.background;case"sky":return this.sky}}static classifyZ(e){return e>=2.2?"foreground":e>=-9.5?"midground":e>=-24?"background":"sky"}}class hs{static createMaterialBank(e){const t=new lt({color:new G(e.coolAmbient),emissive:new G(e.coolAmbient),emissiveIntensity:.64,roughness:.42,metalness:.28,flatShading:!0}),n=new lt({color:new G(e.warmLight),emissive:new G(e.warmLight),emissiveIntensity:.68,roughness:.42,metalness:.24,flatShading:!0}),i=new lt({color:new G(e.warmCore),emissive:new G(e.warmCore),emissiveIntensity:.62,roughness:.38,metalness:.32,flatShading:!0}),s=new lt({color:1910061,roughness:.78,metalness:.24,flatShading:!0}),r=new lt({color:2766144,roughness:.74,metalness:.28,flatShading:!0}),a=new lt({color:2305077,roughness:.66,metalness:.42,flatShading:!0}),l=new lt({color:3883596,emissive:new G(e.coolAmbient).multiplyScalar(.06),roughness:.68,flatShading:!0});return{cyan:t,magenta:n,amber:i,hullDark:s,hullMid:r,poleMetal:a,cableMetal:l,updatePalette(c){t.color.set(c.coolAmbient),t.emissive.set(c.coolAmbient),n.color.set(c.warmLight),n.emissive.set(c.warmLight),i.color.set(c.warmCore),i.emissive.set(c.warmCore),l.emissive.set(c.coolAmbient).multiplyScalar(.06)},setAtmosphere(c,h){t.color.set(h.coolAmbient),t.emissive.set(h.coolAmbient),n.color.set(h.warmLight),n.emissive.set(h.warmLight),i.color.set(h.warmCore),i.emissive.set(h.warmCore),c==="day"?(t.emissiveIntensity=.28,n.emissiveIntensity=.32,i.emissiveIntensity=.3,s.color.setHex(2041905),s.roughness=.8,r.color.setHex(2766144),r.roughness=.76,a.color.setHex(2502714),a.roughness=.68,l.color.setHex(3883596),l.emissive.set(h.coolAmbient).multiplyScalar(.03)):c==="rain"?(t.emissiveIntensity=.78,n.emissiveIntensity=.82,i.emissiveIntensity=.74,s.color.setHex(1581095),s.roughness=.56,r.color.setHex(2437178),r.roughness=.58,a.color.setHex(2041905),a.roughness=.5,l.color.setHex(3423302),l.emissive.set(h.coolAmbient).multiplyScalar(.08)):(t.emissiveIntensity=.64,n.emissiveIntensity=.68,i.emissiveIntensity=.62,s.color.setHex(1910061),s.roughness=.78,r.color.setHex(2766144),r.roughness=.74,a.color.setHex(2305077),a.roughness=.66,l.color.setHex(3883596),l.emissive.set(h.coolAmbient).multiplyScalar(.06))}}}static resolveToneMaterial(e,t){return t==="cyan"?e.cyan:t==="magenta"?e.magenta:e.amber}static resolveSecondaryTone(e){return e==="cyan"?"magenta":e==="magenta"?"amber":"cyan"}static composeUrbanBuilding(e,t){const n=new je;n.name=`UrbanBlock_${e.seedIndex}`,n.position.set(e.x,e.baseY,e.z);const i=this.resolveToneMaterial(t,e.neonTone),s=this.resolveSecondaryTone(e.neonTone),r=this.resolveToneMaterial(t,s),a=e.x<0?1:e.x>0?-1:1,l=new Y(new he(e.width,e.height,e.depth),e.seedIndex%2===0?t.hullDark:t.hullMid);l.position.y=e.height*.5,l.castShadow=!0,l.receiveShadow=!0,n.add(l);const c=e.setbackRatio??.72,h=e.height*.24,u=new Y(new he(e.width*c,h,e.depth*c),t.hullDark);u.position.y=e.height+h*.5,u.castShadow=!0,u.receiveShadow=!0,n.add(u);const d=new Y(new he(e.width*1.04,.2,e.depth*1.04),t.hullMid);d.position.y=e.height+.06,n.add(d);const f=new Y(new he(e.width*c*1.04,.15,e.depth*c*1.04),t.poleMetal);f.position.y=e.height+h+.04,n.add(f);for(const g of[-1,1]){const p=new Y(new he(.16,e.height*.94,.16),t.poleMetal);p.position.set(a*(e.width*.5+.03),e.height*.48,g*(e.depth*.5+.03)),n.add(p)}const m=e.floors??Math.max(4,Math.floor(e.height/1.8)),v=3;for(let g=1;g<=m;g++){const p=1.4+(g-.5)/m*(e.height-1.9);if(!(p>=e.height-.35))for(let x=0;x<v;x++){const _=Math.sin((e.seedIndex+1)*37.7+g*13.3+x*7.1)*43758.5453,y=_-Math.floor(_);if(y<.62)continue;const C=y>.9?r:y>.76?t.amber:i,b=(x-(v-1)*.5)*(e.width*.27),A=new Y(new he(e.width*.18,.22,.06),C);A.position.set(b,p,e.depth*.5+.04),n.add(A);const R=(x-(v-1)*.5)*(e.depth*.27),S=new Y(new he(.06,.22,e.depth*.18),C);S.position.set(a*(e.width*.5+.04),p,R),n.add(S)}}if(e.hasStorefront){const g=new Y(new he(.84,.16,e.depth*.84),t.hullMid);g.position.set(a*(e.width*.5+.42),1.38,0),g.castShadow=!0,g.receiveShadow=!0,n.add(g);const p=new Y(new he(.08,.78,e.depth*.58),t.cyan);p.position.set(a*(e.width*.5+.05),.68,0),n.add(p)}if(e.hasBillboard){const g=this.composeNeonSignPanel({height:3.1,depthSpan:.94,inwardSign:a,primaryTone:s,secondaryTone:"amber"},t);g.position.set(a*(e.width*.5),e.height*.52,.42),n.add(g)}if(e.hasAntenna){const g=2.8+e.seedIndex%3*1.1,p=new Y(new Jt(.045,.11,g,4),t.hullMid);p.position.y=e.height+h+g*.5,n.add(p);const x=new Y(new Qn(.18,0),t.magenta);x.position.y=e.height+h+g+.12,n.add(x)}return n}static composeNeonSignPanel(e,t){const n=new je,i=this.resolveToneMaterial(t,e.primaryTone),s=this.resolveToneMaterial(t,e.secondaryTone),r=new Y(new he(.76,.1,.12),t.poleMetal);r.position.set(e.inwardSign*.38,e.height*.32,0),n.add(r);const a=new Y(new he(.76,.1,.12),t.poleMetal);a.position.set(e.inwardSign*.38,-e.height*.28,0),n.add(a);const l=new Y(new he(.16,e.height,e.depthSpan),t.hullDark);l.position.set(e.inwardSign*.7,0,0),l.castShadow=!0,n.add(l);for(let u=-1;u<=1;u++){const d=new Y(new he(.19,.12,e.depthSpan*.82),u===0?s:i);d.position.set(e.inwardSign*.7,u*(e.height*.28),0),n.add(d)}const c=new Y(new he(.92,.56,.14),t.hullMid);c.position.set(e.inwardSign*.52,-e.height*.58,e.depthSpan*.62),n.add(c);const h=new Y(new he(.74,.12,.17),i);return h.position.set(e.inwardSign*.52,-e.height*.58,e.depthSpan*.62),n.add(h),n}static composeStreetLampPole(e,t){const n=new je;n.name="StreetLampPole",n.position.set(e.x,e.baseY,e.z);const i=this.resolveToneMaterial(t,e.tone),s=e.side<0?1:-1,r=new Y(new he(.34,.32,.34),t.hullDark);r.position.y=.16,r.castShadow=!0,r.receiveShadow=!0,n.add(r);const a=new Y(new he(.16,e.height,.16),t.poleMetal);a.position.y=e.height*.5,a.castShadow=!0,a.receiveShadow=!0,n.add(a);const l=new Y(new he(.28,.44,.28),t.hullMid);l.position.set(-s*.12,e.height*.62,0),l.castShadow=!0,n.add(l);const c=new Y(new he(1.42,.11,.12),t.poleMetal);c.position.set(s*.58,e.height-.18,0),c.castShadow=!0,n.add(c);const h=new Y(new he(.66,.13,.26),i);return h.position.set(s*1,e.height-.28,0),h.castShadow=!0,n.add(h),n}static composeCatenaryCableSpan(e,t,n){const i=new je;i.name="CatenaryCableSpan";const s=e*.36,r=new Y(new he(s,.055,.055),n.cableMetal);r.position.set(-e*.33,-.24,0),r.rotation.z=-.15,i.add(r);const a=new Y(new he(s*.96,.055,.055),n.cableMetal);a.position.set(0,-.46,0),i.add(a);const l=new Y(new he(s,.055,.055),n.cableMetal);l.position.set(e*.33,-.24,0),l.rotation.z=.15,i.add(l);const c=new Y(new Qn(.19,0),this.resolveToneMaterial(n,t));return c.position.set(0,-.58,0),i.add(c),i}static composeStreetKioskProp(e,t){const n=new je;n.name="StreetVendingKiosk",n.position.set(e.x,e.baseY,e.z);const i=this.resolveToneMaterial(t,e.tone),s=new Y(new he(.62,1.58,.86),t.hullDark);s.position.y=.79,s.castShadow=!0,s.receiveShadow=!0,n.add(s);const r=new Y(new he(.08,.88,.66),i);r.position.set(e.facingX*.31,.96,0),n.add(r);const a=new Y(new he(.1,.18,.52),t.amber);return a.position.set(e.facingX*.31,.32,0),n.add(a),n}}class zh{static createDefaultBlueprintRegistry(e,t=!0){const n=new Bh;return n.register({id:"cyber.holo-reactor",role:"core",defaultLayer:"midground",contrastPriority:.85,build:(i,s)=>{const r=new je;r.name="CyberHoloReactor";const a=new lt({color:new G(e.warmLight),emissive:new G(e.warmLight),emissiveIntensity:.72,roughness:.36,metalness:.42,flatShading:!0}),l=new lt({color:2766144,emissive:new G(e.coolAmbient).multiplyScalar(.18),roughness:.58,metalness:.52,flatShading:!0}),c=new lt({color:7240583,emissive:new G(e.warmCore).multiplyScalar(.16),roughness:.48,metalness:.58,flatShading:!0}),h=new Y(new Qn(.92,0),a);h.scale.set(.88,1.58,.88),r.add(h);const u=new je,d=new Y(new Js(1.62,.08,6,24),l);d.rotation.x=Math.PI*.36,u.add(d);const f=new Y(new Js(1.18,.055,5,16),c);f.rotation.y=Math.PI*.28,u.add(f),r.add(u);const m=s.enableShadows??t,v=new _i(new G(e.warmLight),6.8,28,1.6);return v.position.set(i.position[0],i.position[1]+.35,i.position[2]+.5),v.castShadow=m,m&&(v.shadow.mapSize.width=512,v.shadow.mapSize.height=512,v.shadow.camera.near=.5,v.shadow.camera.far=36,v.shadow.bias=-8e-4,v.shadow.normalBias=.04),{object3D:r,pointLight:v,baseLightIntensity:6.8,lightFlickerSpeed:4.8,components:{LifecycleTag:{role:"core",label:"HoloReactorCore"},RotationTarget:{targetYaw:0,targetPitch:0,targetRoll:0,lerpSpeed:3.2,idleSpinSpeed:.52,maxPitch:.2},AnimationState:{baseY:i.position[1],bobAmplitude:.14,bobFrequency:1.6,breatheAmplitude:.015,phase:i.phase??0,excitement:0,parts:{orbitRing:u}},NeonBeacon:{emissiveMaterial:a,baseEmissiveIntensity:.72,pulseSpeed:2.4,pulseAmplitude:.12,phase:.4,glitchRate:.04}}}}}),n.register({id:"cyber.neon-pylon",role:"beacon",defaultLayer:"foreground",contrastPriority:.78,build:(i,s)=>{const r=new je;r.name="CyberNeonPylon";const a=new lt({color:2766144,roughness:.72,metalness:.36,flatShading:!0}),l=s.tone==="cyan"?e.coolAmbient:s.tone==="magenta"?e.warmLight:e.warmCore,c=new lt({color:new G(l),emissive:new G(l),emissiveIntensity:.62,roughness:.4,flatShading:!0}),h=new Y(new he(.44,.34,.44),a);h.position.y=.17,h.castShadow=!0,h.receiveShadow=!0,r.add(h);const u=new Y(new he(.2,1.88,.2),a);u.position.y=1.1,u.castShadow=!0,r.add(u);const d=new Y(new he(.08,.92,.23),c);d.position.y=1.32,r.add(d);const f=new Y(new he(.28,.14,.28),a);f.position.y=2.1,r.add(f);const m=new _i(new G(l),3.6,12,1.7);m.position.set(i.position[0],i.position[1]+2,i.position[2]);const v=i.phase??0;return{object3D:r,pointLight:m,baseLightIntensity:3.6,lightFlickerSpeed:5.5,components:{LifecycleTag:{role:"beacon",label:`NeonPylon_${s.tone}`},AnimationState:{baseY:i.position[1],bobAmplitude:0,bobFrequency:2,breatheAmplitude:.006,phase:v,excitement:0},NeonBeacon:{emissiveMaterial:c,baseEmissiveIntensity:.62,pulseSpeed:2.8,pulseAmplitude:.12,phase:v,glitchRate:.05}}}}}),n.register({id:"cyber.wind-banner",role:"prop",defaultLayer:"midground",contrastPriority:.74,build:(i,s)=>{const r=new je;r.name="HangingNeonBanner";const a=new lt({color:2766144,roughness:.74,metalness:.34,flatShading:!0}),l=s.tone==="cyan"?e.coolAmbient:s.tone==="magenta"?e.warmLight:e.warmCore,c=new lt({color:new G(l),emissive:new G(l),emissiveIntensity:.56,roughness:.44,flatShading:!0}),h=new Y(new he(.1,s.height,s.width),a);h.position.y=-s.height*.5,h.castShadow=!0,r.add(h);for(let d=1;d<=2;d++){const f=new Y(new he(.14,.1,s.width*.76),c);f.position.y=-s.height*(.3*d+.08),r.add(f)}const u=i.phase??0;return{object3D:r,components:{LifecycleTag:{role:"prop",label:`WindSign_${s.tone}`},WindSway:{baseRotX:0,baseRotY:0,baseRotZ:0,swayAmpZ:.14,swayAmpX:.08,frequency:2.15,phase:u,gustFactor:1},NeonBeacon:{emissiveMaterial:c,baseEmissiveIntensity:.56,pulseSpeed:2.6,pulseAmplitude:.1,phase:u,glitchRate:.06}}}}}),n.register({id:"cyber.hover-drone",role:"vehicle",defaultLayer:"midground",contrastPriority:.76,build:(i,s)=>{const r=new je;r.name="CyberHoverSpinner";const a=new lt({color:1975854,roughness:.64,metalness:.46,flatShading:!0}),l=s.tone==="cyan"?e.coolAmbient:s.tone==="magenta"?e.warmLight:e.warmCore,c=new lt({color:new G(l),emissive:new G(l),emissiveIntensity:.65,roughness:.36,flatShading:!0}),h=new Y(new he(.72,.24,1.42),a);h.castShadow=!0,r.add(h);const u=new Y(new he(.62,.07,.96),c);u.position.y=-.05,r.add(u);const d=i.phase??0;return{object3D:r,components:{LifecycleTag:{role:"vehicle",label:`HoverSpinner_${s.tone}`},PatrolPath:{originX:i.position[0],originY:i.position[1],originZ:i.position[2],amplitudeX:s.amplitude[0],amplitudeY:s.amplitude[1],amplitudeZ:s.amplitude[2],speed:s.speed,phase:d,faceTangent:!0},NeonBeacon:{emissiveMaterial:c,baseEmissiveIntensity:.65,pulseSpeed:4.2,pulseAmplitude:.1,phase:d}}}}}),n.register({id:"cyber.netrunner-avatar",role:"avatar",defaultLayer:"foreground",contrastPriority:1,build:i=>{const s=new je;s.name="CyberNetrunnerAvatar";const r=new lt({color:1316636,emissive:new G(1316636).multiplyScalar(.16),roughness:.78,metalness:.16,flatShading:!0}),a=new lt({color:3883596,emissive:new G(3883596).multiplyScalar(.18),roughness:.68,metalness:.24,flatShading:!0}),l=new lt({color:7240583,emissive:new G(7240583).multiplyScalar(.22),roughness:.44,metalness:.62,flatShading:!0}),c=new lt({color:9083302,emissive:new G(9083302).multiplyScalar(.24),roughness:.36,metalness:.68,flatShading:!0}),h=new lt({color:4881534,emissive:new G(4881534),emissiveIntensity:.58,roughness:.4,flatShading:!0}),u=new je;u.name="AvatarLeftLeg",u.position.set(-.19,.8,0);const d=new Y(new he(.22,.4,.24),r);d.position.y=-.2,d.castShadow=!0,u.add(d);const f=new Y(new he(.06,.2,.16),a);f.position.set(-.12,-.2,.01),u.add(f);const m=new Y(new he(.2,.12,.26),a);m.position.set(0,-.4,.02),u.add(m);const v=new Y(new he(.18,.32,.2),r);v.position.y=-.56,v.castShadow=!0,u.add(v);const g=new Y(new he(.21,.14,.3),a);g.position.set(0,-.73,.04),g.castShadow=!0,u.add(g),s.add(u);const p=new je;p.name="AvatarRightLeg",p.position.set(.19,.8,0);const x=new Y(new he(.22,.4,.24),r);x.position.y=-.2,x.castShadow=!0,p.add(x);const _=new Y(new he(.06,.2,.16),a);_.position.set(.12,-.2,.01),p.add(_);const y=new Y(new he(.2,.12,.26),a);y.position.set(0,-.4,.02),p.add(y);const C=new Y(new he(.18,.32,.2),r);C.position.y=-.56,C.castShadow=!0,p.add(C);const b=new Y(new he(.21,.14,.3),a);b.position.set(0,-.73,.04),b.castShadow=!0,p.add(b),s.add(p);const A=new Y(new he(.64,.76,.36),r);A.position.y=1.16,A.castShadow=!0,s.add(A);const R=new Y(new he(.5,.32,.4),a);R.position.set(0,1.22,.02),R.castShadow=!0,s.add(R);const S=new Y(new he(.1,.72,.41),a);S.position.set(-.04,1.18,.01),S.rotation.z=-.46,s.add(S);const M=new Y(new he(.67,.1,.39),a);M.position.set(0,.82,0),s.add(M);const L=new Y(new he(.24,.18,.4),a);L.position.set(-.41,1.47,0),L.rotation.z=.14,L.castShadow=!0,s.add(L);const B=new je;B.name="AvatarCoatTail",B.position.set(0,.86,-.15);const O=new Y(new he(.3,.66,.08),r);O.position.set(-.17,-.32,-.03),O.rotation.z=.08,O.castShadow=!0,B.add(O);const k=new Y(new he(.3,.66,.08),r);k.position.set(.17,-.32,-.03),k.rotation.z=-.08,k.castShadow=!0,B.add(k);const K=new Y(new he(.64,.06,.09),a);K.position.set(0,-.63,-.03),B.add(K),s.add(B);const H=new Y(new Jt(.25,.28,.18,8),a);H.position.y=1.6,H.castShadow=!0,s.add(H);const te=new je;te.name="AvatarHead",te.position.set(0,1.8,0);const X=new Y(new Qn(.26,1),r);X.scale.set(.96,1.08,1.04),X.castShadow=!0,te.add(X);const ue=new Y(new he(.32,.16,.24),a);ue.position.set(0,-.05,.1),te.add(ue);const fe=new Y(new he(.28,.042,.06),h);fe.position.set(0,.03,.22),te.add(fe),s.add(te);const pe=new je;pe.name="AvatarLeftArm",pe.position.set(-.42,1.44,0);const ke=new Y(new he(.17,.34,.19),r);ke.position.y=-.16,ke.castShadow=!0,pe.add(ke);const st=new Y(new he(.15,.3,.17),a);st.position.set(-.01,-.46,.04),st.rotation.x=-.18,st.castShadow=!0,pe.add(st);const $=new Y(new he(.12,.13,.14),r);$.position.set(-.01,-.64,.07),pe.add($),s.add(pe);const ie=new je;ie.name="AvatarMechanicalArm",ie.position.set(.44,1.44,0);const we=new Y(new he(.24,.22,.26),l);we.position.set(.02,.01,0),we.castShadow=!0,ie.add(we);const le=new Y(new he(.26,.06,.28),c);le.position.set(.02,.11,0),ie.add(le);const Ue=new Y(new he(.05,.05,.29),h);Ue.position.set(.08,.02,0),ie.add(Ue);const Be=new Y(new he(.14,.3,.16),c);Be.position.set(.02,-.18,0),Be.castShadow=!0,ie.add(Be);const Oe=new Y(new Jt(.032,.032,.28,6),l);Oe.position.set(.1,-.18,-.03),ie.add(Oe);const He=new je;He.name="AvatarMechanicalForearm",He.position.set(.02,-.34,0),He.rotation.x=-.24;const Q=new Y(new Jt(.095,.095,.2,8),l);Q.rotation.z=Math.PI*.5,He.add(Q);const re=new Y(new he(.16,.3,.18),c);re.position.set(.01,-.18,.01),re.castShadow=!0,He.add(re);const I=new Y(new he(.18,.08,.2),l);I.position.set(.01,-.16,.01),He.add(I);const Ee=new Y(new Jt(.075,.08,.07,8),l);Ee.position.set(.01,-.35,.01),He.add(Ee);const se=new Y(new he(.11,.1,.14),l);se.position.set(.01,-.42,.02),se.castShadow=!0,He.add(se);for(let ce=-1;ce<=1;ce++){const Fe=new Y(new he(.032,.1,.036),c);Fe.position.set(.03,-.5,.02+ce*.042),Fe.rotation.z=-.12,He.add(Fe)}const xe=new Y(new he(.034,.08,.038),c);return xe.position.set(-.04,-.45,.08),xe.rotation.x=.35,He.add(xe),ie.add(He),s.add(ie),{object3D:s,components:{LifecycleTag:{role:"avatar",label:"CyberNetrunner"},Velocity:{vx:0,vy:0,vz:0,angularVx:0,angularVy:0,angularVz:0,damping:9},RotationTarget:{targetYaw:.12,targetPitch:0,targetRoll:0,lerpSpeed:9.5,idleSpinSpeed:0,maxPitch:.16},NavigationTarget:{targetX:i.position[0],targetZ:i.position[2],active:!1,moveSpeed:3.5,arrivalRadius:.08,minX:-4.8,maxX:4.8,minZ:-9.2,maxZ:11.8},CameraFollow:{offsetX:0,offsetY:2.25,offsetZ:3.7,lookAtOffsetY:1.08,followSharpness:12,initialized:!1},AnimationState:{baseY:i.position[1],bobAmplitude:.018,bobFrequency:2.1,breatheAmplitude:.012,phase:1.1,excitement:0,isMoving:!1,locomotionBlend:0,stridePhase:0,parts:{head:te,leftArm:pe,rightArm:ie,rightForearm:He,leftFoot:u,rightFoot:p,coatTail:B}},InputState:{pointerX:0,pointerY:0,pointerActive:!1,isDragging:!1,moveX:0,moveZ:0,yawSensitivity:.35,pitchSensitivity:.12,moveSpeed:3.5,boundsRadius:12}}}}}),n}static spawnShrineCrystal(e,t,n,i,s,r){const l=this.createDefaultBlueprintRegistry(n,s).spawn("cyber.holo-reactor",{world:e,scene:t,parentGroup:r,position:i,layer:hn.classifyZ(i[2])},{enableShadows:s});return{entityId:l.entityId,torchLight:l.pointLight}}static spawnBrazierBeacon(e,t,n,i,s,r="cyan",a){const c=this.createDefaultBlueprintRegistry(n).spawn("cyber.neon-pylon",{world:e,scene:t,parentGroup:a,position:i,rotationY:s*.2,phase:s,layer:hn.classifyZ(i[2])},{tone:r});return{entityId:c.entityId,light:c.pointLight}}static spawnHangingNeonBanner(e,t,n,i){return{entityId:this.createDefaultBlueprintRegistry(n).spawn("cyber.wind-banner",{world:e,scene:t,parentGroup:i.parentGroup,position:i.pivot,phase:i.phase,layer:i.layer??hn.classifyZ(i.pivot[2])},{width:i.width,height:i.height,tone:i.tone}).entityId}}static spawnCyberDrone(e,t,n,i){return{entityId:this.createDefaultBlueprintRegistry(n).spawn("cyber.hover-drone",{world:e,scene:t,parentGroup:i.parentGroup,position:i.origin,phase:i.phase,layer:hn.classifyZ(i.origin[2])},{amplitude:i.amplitude,speed:i.speed,tone:i.tone}).entityId}}static spawnWayfarerAvatar(e,t,n,i,s){const a=this.createDefaultBlueprintRegistry(n).spawn("cyber.netrunner-avatar",{world:e,scene:t,parentGroup:s,position:i,rotationY:.12,scale:1.12,layer:"foreground"},{});return{entityId:a.entityId,group:a.object3D}}}let kh=null;function BM(){if(!kh){const o=new Uint8Array([255,255,255,255]),e=new vn(o,1,1,At,mn);e.minFilter=gt,e.magFilter=gt,e.needsUpdate=!0,kh=e}return kh}const zM=`
  uniform float uTime;
  uniform float uWetness;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    // Surface micro-swell scales with wetness (flat solid asphalt in Day, shimmering puddles in Rain)
    float swell = (sin(worldPos.x * 1.15 + uTime * 1.85) * 0.015 +
                   cos(worldPos.z * 1.45 - uTime * 1.35) * 0.013) * uWetness;
    worldPos.y += swell;
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`,kM=`
  precision highp float;

  uniform float uTime;
  uniform vec3 uCamPos;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uWarmColor;
  uniform vec3 uWarmCoreColor;
  uniform vec3 uCursorColor;
  uniform vec3 uCursorPos;
  uniform float uCursorIntensity;
  uniform vec3 uMoonDir;

  // Atmosphere & real-time directional shadow uniforms
  uniform float uWetness;
  uniform float uRainIntensity;
  uniform float uDaylight;
  uniform sampler2D uDirShadowMap;
  uniform mat4 uDirShadowMatrix;
  uniform vec2 uShadowMapSize;
  uniform float uShadowEnabled;
  uniform float uShadowStrength;
  uniform vec3 uAvatarPos;

  // 4 neon street/pylon light positions (xyz) + intensity (w)
  uniform vec4 uTorch0;
  uniform vec4 uTorch1;
  uniform vec4 uTorch2;
  uniform vec4 uTorch3;
  // Central holo-arch / focal light
  uniform vec4 uShrineLight;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  // Exact Three.js RGBADepthPacking constants for DirectionalLight shadow map unpacking
  const float UnpackDownscale = 255.0 / 256.0;
  const vec4 PackFactors = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
  const vec4 UnpackFactors4 = vec4(UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a);

  float unpackRGBAToDepth(const in vec4 v) {
    return dot(v, UnpackFactors4);
  }

  float sampleDirectionalShadow(vec3 worldPos) {
    if (uShadowEnabled < 0.5) return 1.0;

    vec4 shadowCoord = uDirShadowMatrix * vec4(worldPos, 1.0);
    shadowCoord.xyz /= max(shadowCoord.w, 0.0001);
    shadowCoord.z -= 0.00055;

    if (
      shadowCoord.x <= 0.002 || shadowCoord.x >= 0.998 ||
      shadowCoord.y <= 0.002 || shadowCoord.y >= 0.998 ||
      shadowCoord.z >= 1.0 || shadowCoord.z <= 0.0
    ) {
      return 1.0;
    }

    vec2 texel = 1.35 / max(uShadowMapSize, vec2(512.0));
    float s0 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy)));
    float s1 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy + vec2( texel.x,  texel.y * 0.5))));
    float s2 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy + vec2(-texel.x, -texel.y * 0.5))));
    float s3 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy + vec2(-texel.x * 0.5,  texel.y))));
    float s4 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy + vec2( texel.x * 0.5, -texel.y))));

    float rawVis = s0 * 0.28 + (s1 + s2 + s3 + s4) * 0.18;
    return mix(1.0, rawVis, uShadowStrength);
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Procedural raindrop impact ripples on wet puddles (active ONLY in 'rain' mode)
  float raindropRings(vec2 xz, float t) {
    if (uRainIntensity <= 0.01) return 0.0;
    vec2 cell = floor(xz * 1.65);
    vec2 local = fract(xz * 1.65) - 0.5;
    float seed = hash21(cell);
    float life = fract(t * (0.85 + seed * 0.65) + seed * 7.13);
    float radius = life * 0.46;
    float ring = exp(-pow((length(local) - radius) * 18.0, 2.0)) * (1.0 - life);
    return ring * uRainIntensity;
  }

  vec3 computeRippleNormal(vec2 p, float t, float camDist) {
    // Attenuate high-frequency ripples at distance to prevent subpixel aliasing in dense ASCII grids
    float hiFreqFade = clamp(1.0 - (camDist - 12.0) / 26.0, 0.22, 1.0);
    float rippleAmp = 0.12 + 0.88 * uWetness;

    float w1 = sin(p.x * 2.8 + t * 2.45 + sin(p.y * 1.45)) * 0.040 * rippleAmp;
    float w2 = cos(p.y * 3.4 - t * 2.10 + cos(p.x * 1.85)) * 0.036 * rippleAmp;
    float w3 = sin((p.x * 1.3 + p.y) * 5.2 + t * 3.2) * 0.022 * hiFreqFade * rippleAmp;
    float drop = raindropRings(p, t) * 0.08 * hiFreqFade;

    float dx = w1 + w3 + drop;
    float dz = w2 - w3 + drop;
    return normalize(vec3(-dx * 2.2, 1.0, -dz * 1.6));
  }

  vec3 evalPointReflection(
    vec3 worldPos,
    vec3 normal,
    vec3 viewDir,
    vec3 lightPos,
    vec3 lightColor,
    float intensity,
    float mirrorGain
  ) {
    if (intensity <= 0.01 || mirrorGain <= 0.01) return vec3(0.0);

    vec3 mirroredLight = vec3(lightPos.x, 2.0 * worldPos.y - lightPos.y, lightPos.z);
    vec3 toMirrored = normalize(mirroredLight - worldPos);
    vec3 reflDir = reflect(-viewDir, normal);
    vec3 targetDir = normalize(vec3(toMirrored.x, abs(toMirrored.y) * 0.58, toMirrored.z));

    float specAlign = max(0.0, dot(reflDir, targetDir));
    float dx = abs(lightPos.x - worldPos.x);
    float dz = abs(lightPos.z - worldPos.z);

    float streakMask = exp(-dx * 0.58) * (1.0 / (1.0 + dz * 0.085));
    float dist = length(lightPos.xz - worldPos.xz);
    float attenuation = 1.0 / (1.0 + dist * dist * 0.085);

    float rippleBand = 0.82 + 0.18 * uWetness * sin(worldPos.z * 6.4 - uTime * 4.2 + worldPos.x * 2.2);
    float specCore = pow(specAlign, 20.0) * 0.85;
    float specWide = pow(specAlign, 5.0) * 0.34;
    float wetColumn = streakMask * 0.22 * uWetness;

    return lightColor * ((specCore + specWide) * attenuation + wetColumn) * rippleBand * (intensity * 0.024 * mirrorGain);
  }

  void main() {
    vec3 viewVec = uCamPos - vWorldPos;
    float camDist = length(viewVec);
    vec3 viewDir = viewVec / max(camDist, 0.001);

    vec3 normal = computeRippleNormal(vWorldPos.xz, uTime, camDist);
    vec3 reflDir = reflect(-viewDir, normal);

    // Real-time PCF directional shadow + soft contact AO beneath foreground protagonist
    float dirShadow = sampleDirectionalShadow(vWorldPos);
    float avatarDist = length(vWorldPos.xz - uAvatarPos.xz);
    float contactAo = 1.0 - 0.38 * exp(-avatarDist * avatarDist * 2.4) * uShadowEnabled;
    float shadowMask = clamp(dirShadow * contactAo, 0.22, 1.0);

    // Puddle distribution & Fresnel mirror strength governed by uWetness
    float puddleWave = sin(vWorldPos.x * 0.75 + cos(vWorldPos.z * 0.55)) * 0.5 + 0.5;
    float puddleMask = smoothstep(0.26, 0.78, puddleWave);
    float effectiveMirror = clamp(uWetness * (0.52 + 0.48 * puddleMask), 0.05, 1.0);

    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.6);
    fresnel = clamp(0.14 + fresnel * 0.72, 0.0, 1.0) * effectiveMirror;

    // Base ASCII ground surface calibrated around #1A222A (entropic weathered asphalt)
    float grain = (hash21(floor(vWorldPos.xz * 5.5)) - 0.5) * 0.018;
    float macroWear = (sin(vWorldPos.x * 0.9 + cos(vWorldPos.z * 0.65)) * 0.5 + 0.5) * 0.014;
    vec3 dayAsphaltLit = vec3(0.068, 0.088, 0.108) + grain + macroWear;
    vec3 dayAsphaltShadow = vec3(0.026, 0.035, 0.045) + grain * 0.5;
    vec3 dayBase = mix(dayAsphaltShadow, dayAsphaltLit, shadowMask);

    vec3 skyReflect = mix(uDeepColor * 1.12, uShallowColor * 0.52, clamp(reflDir.y * 1.4 + 0.18, 0.0, 1.0));
    vec3 nightBase = (mix(uDeepColor, skyReflect, fresnel * 0.65) + grain + macroWear) * mix(0.54, 1.0, shadowMask);

    vec3 color = mix(nightBase, dayBase, uDaylight);

    // Weathered entropic road markings (#2A3540 / #3B424C value hierarchy, never bright neon)
    float inRoad = step(abs(vWorldPos.x), 4.6);
    float wearMask = 0.45 + 0.55 * hash21(floor(vWorldPos.xz * 2.8));
    float centerDash = step(abs(vWorldPos.x), 0.08) * step(0.48, fract(vWorldPos.z * 0.45)) * wearMask;
    float sideLine = step(abs(abs(vWorldPos.x) - 3.85), 0.07) * wearMask;
    float crossZ1 = step(abs(vWorldPos.z - 4.5), 0.52);
    float crossZ2 = step(abs(vWorldPos.z + 0.8), 0.48);
    float zebra = step(0.52, fract(vWorldPos.x * 1.35)) * max(crossZ1, crossZ2) * step(abs(vWorldPos.x), 3.5) * wearMask;

    float paintShadowScale = mix(0.85, 0.50 + 0.50 * shadowMask, uDaylight);
    color += uWarmColor * centerDash * inRoad * 0.14 * paintShadowScale;
    color += uShallowColor * sideLine * 0.12 * paintShadowScale;
    color += uWarmCoreColor * zebra * 0.11 * paintShadowScale;

    // Restrained architectural reflection bands along wet asphalt (modulates ASCII glyphs, zero washout)
    float neonMirrorGain = mix(0.16 + 0.54 * uWetness, 0.08, uDaylight);
    float leftFacadeGlow = exp(-abs(vWorldPos.x + 4.2) * 0.68) * (0.55 + 0.45 * sin(vWorldPos.z * 1.4 + 0.8));
    float rightFacadeGlow = exp(-abs(vWorldPos.x - 4.2) * 0.68) * (0.55 + 0.45 * cos(vWorldPos.z * 1.3 - 0.5));
    color += uShallowColor * leftFacadeGlow * fresnel * 0.14 * neonMirrorGain;
    color += uWarmColor * rightFacadeGlow * fresnel * 0.14 * neonMirrorGain;

    // Desaturated lunar / overcast sky glint along boulevard perspective
    float moonAlign = max(0.0, dot(reflDir, normalize(uMoonDir)));
    float moonGlint = (pow(moonAlign, 26.0) * 0.36 + pow(moonAlign, 6.5) * 0.10) * shadowMask;
    vec3 skySpecTint = mix(uShallowColor, uWarmCoreColor, 0.45);
    color += skySpecTint * moonGlint * mix(0.22 + 0.48 * uWetness, 0.24, uDaylight);

    // Controlled planar reflections from distant reactor + streetlamps (pure ASCII value ramp)
    color += evalPointReflection(vWorldPos, normal, viewDir, uShrineLight.xyz, uWarmColor, uShrineLight.w, neonMirrorGain);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch0.xyz, uShallowColor, uTorch0.w, neonMirrorGain);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch1.xyz, uWarmColor, uTorch1.w, neonMirrorGain);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch2.xyz, uShallowColor, uTorch2.w, neonMirrorGain);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch3.xyz, uWarmColor, uTorch3.w, neonMirrorGain);

    // Subtle cursor inspection glint
    color += evalPointReflection(
      vWorldPos,
      normal,
      viewDir,
      uCursorPos,
      uCursorColor,
      uCursorIntensity,
      mix(0.20 + 0.38 * uWetness, 0.14, uDaylight)
    );

    // Raindrop splash glints (active ONLY when uRainIntensity > 0)
    if (uRainIntensity > 0.01) {
      float splash = raindropRings(vWorldPos.xz * 1.25, uTime * 1.15);
      color += mix(uShallowColor, uWarmColor, 0.45) * splash * 0.22 * clamp(1.2 - camDist / 22.0, 0.0, 1.0);
    }

    // Clamp reflected ground luminance so floor reflections never exceed crisp ASCII glyph range
    color = min(color, vec3(0.28, 0.32, 0.35));

    // Distance perspective haze blending smoothly toward #0C1217 entropic horizon
    float fogRate = mix(0.00042 + uRainIntensity * 0.00024, 0.00024, uDaylight);
    float fogFactor = 1.0 - exp(-fogRate * camDist * camDist);
    vec3 horizonTint = mix(uDeepColor * 0.62, vec3(0.032, 0.046, 0.058), uDaylight);
    color = mix(color, horizonTint, clamp(fogFactor, 0.0, 1.0));

    float surfaceAlpha = mix(0.86 + 0.12 * effectiveMirror, 0.92, uDaylight);
    gl_FragColor = vec4(color, surfaceAlpha);
  }
`;function Up(o){switch(o){case"day":return{wetness:.12,rainIntensity:0,daylight:1,shadowStrength:.68};case"rain":return{wetness:.96,rainIntensity:1,daylight:0,shadowStrength:.45};case"night":default:return{wetness:.36,rainIntensity:0,daylight:0,shadowStrength:.55}}}function HM(o){const{palette:e,shrineLightPos:t,moonDir:n}=o,i=Up(o.atmosphere??"night"),s=new G("#1A222A").lerp(new G(e.background),.22),r=new G(e.coolAmbient).lerp(new G("#8A99A6"),.25);return new Dt({vertexShader:zM,fragmentShader:kM,transparent:!0,depthWrite:!0,uniforms:{uTime:{value:0},uCamPos:{value:new E(0,2.25,7.85)},uDeepColor:{value:s},uShallowColor:{value:r},uWarmColor:{value:new G(e.warmLight)},uWarmCoreColor:{value:new G(e.warmCore)},uCursorColor:{value:new G(e.cursorLight)},uCursorPos:{value:new E(0,1.8,3.8)},uCursorIntensity:{value:4.5},uMoonDir:{value:n.clone().normalize()},uWetness:{value:i.wetness},uRainIntensity:{value:i.rainIntensity},uDaylight:{value:i.daylight},uDirShadowMap:{value:BM()},uDirShadowMatrix:{value:new Ne},uShadowMapSize:{value:new Z(1536,1536)},uShadowEnabled:{value:o.enableShadows===!1?0:1},uShadowStrength:{value:i.shadowStrength},uAvatarPos:{value:new E(0,.04,4.15)},uTorch0:{value:new et(-3.4,2.2,2.8,6.5)},uTorch1:{value:new et(3.4,2.2,2.8,6.5)},uTorch2:{value:new et(-3.8,2.8,-3.6,7)},uTorch3:{value:new et(3.8,2.8,-3.6,7)},uShrineLight:{value:new et(t.x,t.y,t.z,12)}}})}class un{static terrainHeight(e,t){return Math.hypot(e,t+10.4)<2.65?.24:Math.abs(e)>=8.8||t<=-12.2?.3:Math.abs(e)>=4.05?.16:-.14}static walkableHeight(e,t,n=-.06){return Math.max(n+.04,un.terrainHeight(e,t))}static build(e,t,n){const i=new Hs,s=new G(t.palette.background);i.background=s,i.fog=new Yi(s.getHex(),e.fogDensity);const r=new hn(i),a=hs.createMaterialBank(t.palette),l=zh.createDefaultBlueprintRegistry(t.palette,t.enableShadows),c={cyan:a.cyan,magenta:a.magenta,amber:a.amber},h=new Qa(new G(t.palette.coolAmbient),new G("#0C1217"),.86);i.add(h);const u=new Mi(new G(t.palette.coolAmbient).lerp(new G("#B8C7D4"),.42),1.68);u.position.set(-13,24,10),u.target.position.set(0,1,2),i.add(u.target),u.castShadow=t.enableShadows,u.shadow.mapSize.width=1536,u.shadow.mapSize.height=1536,u.shadow.camera.near=1.5,u.shadow.camera.far=56,u.shadow.camera.left=-17,u.shadow.camera.right=17,u.shadow.camera.top=19,u.shadow.camera.bottom=-16,u.shadow.bias=-45e-5,u.shadow.normalBias=.035,u.shadow.radius=1.55,i.add(u);const d=this.buildUrbanStreetFoundation(r.midground,e,t,a),{waterMesh:f,waterMaterial:m}=this.buildReflectiveWetBoulevard(i,e,t);f.userData.skipObjectOutline=!0;const v=new $s(.26,.36,16);v.rotateX(-Math.PI/2);const g=new Y(v,a.magenta);g.name="GroundWaypointReticle",g.visible=!1,g.userData.skipObjectOutline=!0,r.foreground.add(g),this.buildStreetCorridorProps(i,r,n,l,e.streetPoles??[],a);const[p,x]=e.shrineCenter,_=this.terrainHeight(p,x);this.buildCyberPortalAndOverpass(r,p,_,x,a),this.buildCyberCityscape(r,e.buildings,a);const y=this.buildCyberSkyBackdrop(r.sky,a),C=l.spawn("cyber.holo-reactor",{world:n,scene:i,parentGroup:r.midground,position:[p,_+2.55,x],layer:"midground"},{enableShadows:t.enableShadows}),b=C.entityId,A=C.pointLight,R=[];e.braziers.forEach((H,te)=>{const X=this.terrainHeight(H.x,H.z),ue=H.tone??(te%2===0?"cyan":"magenta"),fe=hn.classifyZ(H.z),pe=l.spawn("cyber.neon-pylon",{world:n,scene:i,parentGroup:r.getGroup(fe),position:[H.x,X,H.z],rotationY:te*.38,phase:te*1.9,layer:fe},{tone:ue});pe.pointLight&&R.push(pe.pointLight)});const S=new _i(new G(t.palette.coolAmbient),3.8,20,1.7);S.position.set(-4.4,3.2,-1.8),i.add(S),R.push(S);const M=new _i(new G(t.palette.warmLight),3.8,20,1.7);M.position.set(4.4,3.2,-1.8),i.add(M),R.push(M);for(const H of e.drones){const te=hn.classifyZ(H.origin[2]);l.spawn("cyber.hover-drone",{world:n,scene:i,parentGroup:r.getGroup(te),position:H.origin,phase:H.phase,layer:te},{amplitude:H.amplitude,speed:H.speed,tone:H.tone})}const[L,B]=e.avatarSpawn,O=un.walkableHeight(L,B,e.waterLevel),k=l.spawn("cyber.netrunner-avatar",{world:n,scene:i,parentGroup:r.foreground,position:[L,O,B],rotationY:.12,scale:1.12,layer:"foreground"},{}),K={scene:i,depthRig:r,materialBank:a,blueprintRegistry:l,foundationMaterial:d,waterMesh:f,waterMaterial:m,ambientHemi:h,moonDirLight:u,torchLight:A,brazierLights:R,skySunMesh:y.skySunMesh,skyHaloMesh:y.skyHaloMesh,skyBeams:y.skyBeams,starPoints:y.starPoints,neonMaterials:c,waypointMarker:g,shrineEntityId:b,avatarEntityId:k.entityId,terrainHeightAt:(H,te)=>un.walkableHeight(H,te,e.waterLevel)};return this.applyAtmosphere(K,t),K}static applyAtmosphere(e,t){const n=t.atmosphere??"night",i=t.palette;if(e.materialBank.setAtmosphere(n,i),e.scene.background instanceof G&&e.scene.background.set(i.background),e.scene.fog instanceof Yi&&(e.scene.fog.color.set(i.background),e.scene.fog.density=n==="day"?.0085:n==="rain"?.0255:.0165),e.moonDirLight.castShadow=t.enableShadows,e.torchLight.castShadow=t.enableShadows&&n!=="day",n==="day"){e.ambientHemi.color.set("#8A99A6"),e.ambientHemi.groundColor.set("#1A222A"),e.ambientHemi.intensity=.92,e.moonDirLight.position.set(15,27,11),e.moonDirLight.color.set("#B4C2CE"),e.moonDirLight.intensity=2.92,e.moonDirLight.shadow.radius=1.15,e.foundationMaterial.roughness=.76,e.foundationMaterial.metalness=.24,e.torchLight.color.set(i.warmCore),e.torchLight.intensity=3.2,e.brazierLights.forEach((a,l)=>{a.color.set(l%2===0?i.coolAmbient:i.warmLight),a.intensity=1.8}),e.starPoints.visible=!1;for(const a of e.skyBeams)a.visible=!1;e.skySunMesh.scale.setScalar(1.06)}else if(n==="rain"){e.ambientHemi.color.set(i.coolAmbient),e.ambientHemi.groundColor.set("#0C1217"),e.ambientHemi.intensity=.82,e.moonDirLight.position.set(-9,25,8),e.moonDirLight.color.set(i.coolAmbient).lerp(new G("#9AA9B6"),.35),e.moonDirLight.intensity=1.48,e.moonDirLight.shadow.radius=2.35,e.foundationMaterial.roughness=.44,e.foundationMaterial.metalness=.42,e.torchLight.color.set(i.warmLight),e.torchLight.intensity=7.6,e.brazierLights.forEach((a,l)=>{a.color.set(l%2===0?i.coolAmbient:i.warmLight),a.intensity=4.4}),e.starPoints.visible=!0,e.starPoints.material.opacity=.14;for(let a=0;a<e.skyBeams.length;a++){const l=e.skyBeams[a];l.visible=!0;const c=l.material;c.color.set(a===0?i.coolAmbient:i.warmLight),c.opacity=.08}e.skySunMesh.scale.setScalar(.96)}else{e.ambientHemi.color.set(i.coolAmbient),e.ambientHemi.groundColor.set("#0C1217"),e.ambientHemi.intensity=.88,e.moonDirLight.position.set(-13,24,10),e.moonDirLight.color.set(i.coolAmbient).lerp(new G("#B8C7D4"),.42),e.moonDirLight.intensity=1.68,e.moonDirLight.shadow.radius=1.55,e.foundationMaterial.roughness=.68,e.foundationMaterial.metalness=.3,e.torchLight.color.set(i.warmLight),e.torchLight.intensity=6.8,e.brazierLights.forEach((a,l)=>{a.color.set(l%2===0?i.coolAmbient:i.warmLight),a.intensity=3.6}),e.starPoints.visible=!0,e.starPoints.material.opacity=.55;for(let a=0;a<e.skyBeams.length;a++){const l=e.skyBeams[a];l.visible=!0;const c=l.material;c.color.set(a===0?i.coolAmbient:i.warmLight),c.opacity=.06}e.skySunMesh.scale.setScalar(1)}e.moonDirLight.updateMatrixWorld();const s=e.waterMaterial.uniforms,r=Up(n);s.uDeepColor&&s.uDeepColor.value.set("#1A222A").lerp(new G(i.background),.22),s.uShallowColor&&s.uShallowColor.value.set(i.coolAmbient).lerp(new G("#8A99A6"),.25),s.uWarmColor&&s.uWarmColor.value.set(i.warmLight),s.uWarmCoreColor&&s.uWarmCoreColor.value.set(i.warmCore),s.uCursorColor&&s.uCursorColor.value.set(i.cursorLight),s.uMoonDir&&s.uMoonDir.value.copy(e.moonDirLight.position).normalize(),s.uWetness&&(s.uWetness.value=r.wetness),s.uRainIntensity&&(s.uRainIntensity.value=r.rainIntensity),s.uDaylight&&(s.uDaylight.value=r.daylight),s.uShadowStrength&&(s.uShadowStrength.value=r.shadowStrength),s.uShadowEnabled&&(s.uShadowEnabled.value=t.enableShadows?1:0)}static buildUrbanStreetFoundation(e,t,n,i){const s=new Tn(t.terrainSize,t.terrainSize,t.terrainSegments,t.terrainSegments);s.rotateX(-Math.PI/2);const r=s.attributes.position,a=new Float32Array(r.count*3),l=new G("#1A222A"),c=new G("#2A3540"),h=new G("#202933"),u=new G(n.palette.coolAmbient).multiplyScalar(.28),d=new G;for(let p=0;p<r.count;p++){const x=r.getX(p),_=r.getZ(p),y=un.terrainHeight(x,_);r.setY(p,y),y<0?d.copy(l):(Math.abs(x%1.5+1.5)%1.5<.12||Math.abs(_%1.5+1.5)%1.5<.12)&&Math.abs(x)<10.5?d.copy(c).lerp(u,.35):d.copy(y>.22?h:c),a[p*3]=d.r,a[p*3+1]=d.g,a[p*3+2]=d.b}s.setAttribute("color",new $e(a,3)),s.computeVertexNormals();const f=new lt({vertexColors:!0,roughness:.68,metalness:.3,flatShading:!0}),m=new Y(s,f);m.receiveShadow=!0,m.userData.skipObjectOutline=!0,e.add(m);const v=new Y(new he(.16,.16,28),i.hullMid);v.position.set(-4.02,.2,-2.5),v.castShadow=!0,v.receiveShadow=!0,e.add(v);const g=new Y(new he(.16,.16,28),i.hullMid);return g.position.set(4.02,.2,-2.5),g.castShadow=!0,g.receiveShadow=!0,e.add(g),f}static buildReflectiveWetBoulevard(e,t,n){const[i,s]=t.shrineCenter,r=un.terrainHeight(i,s)+2.55,a=new Tn(t.waterSize,t.waterSize,48,48);a.rotateX(-Math.PI/2);const l=HM({palette:n.palette,shrineLightPos:new E(i,r,s),moonDir:new E(-13,24,10),atmosphere:n.atmosphere,enableShadows:n.enableShadows}),c=new Y(a,l);return c.position.y=t.waterLevel,c.renderOrder=1,e.add(c),{waterMesh:c,waterMaterial:l}}static buildStreetCorridorProps(e,t,n,i,s,r){s.forEach((c,h)=>{const u=un.terrainHeight(c.x,c.z),d=hn.classifyZ(c.z),f=t.getGroup(d),m=hs.composeStreetLampPole({x:c.x,baseY:u,z:c.z,height:c.height,side:c.side,tone:c.tone},r);if(f.add(m),c.hasHangingBanner){const v=c.side<0?1:-1;i.spawn("cyber.wind-banner",{world:n,scene:e,parentGroup:f,position:[c.x+v*.62,u+c.height-.34,c.z],phase:h*1.35,layer:d},{width:.54,height:1.3,tone:c.tone})}});const a=[{x:-4.85,z:3.9,facingX:1,tone:"amber"},{x:4.85,z:3.7,facingX:-1,tone:"cyan"},{x:-4.85,z:-.6,facingX:1,tone:"magenta"},{x:4.85,z:-.8,facingX:-1,tone:"amber"}];for(const c of a){const h=un.terrainHeight(c.x,c.z),u=hn.classifyZ(c.z);t.getGroup(u).add(hs.composeStreetKioskProp({x:c.x,baseY:h,z:c.z,facingX:c.facingX,tone:c.tone},r))}[6.4,1.9,-2.6].forEach((c,h)=>{const d=hn.classifyZ(c),f=hs.composeCatenaryCableSpan(8.6,h%2===0?"amber":"cyan",r);f.position.set(0,4.35,c),t.getGroup(d).add(f);const m=n.createEntity();n.addComponent(m,"LifecycleTag",{role:"prop",label:`OverheadCable_${h}`}),n.addComponent(m,"DepthLayer",{layer:d,order:d==="foreground"?0:1,contrastPriority:.65}),n.addComponent(m,"Transform",{x:0,y:4.35,z:c,rotX:0,rotY:0,rotZ:0,scaleX:1,scaleY:1,scaleZ:1}),n.addComponent(m,"WindSway",{baseRotX:0,baseRotY:0,baseRotZ:0,swayAmpZ:.035,swayAmpX:.14,frequency:1.85,phase:h*1.7,gustFactor:.9}),n.addComponent(m,"Renderable",{object3D:f})})}static buildCyberPortalAndOverpass(e,t,n,i,s){const r=new je;r.position.set(t,n,i);const a=new Y(new Jt(2.6,3,.3,8),s.hullDark);a.position.y=.15,a.castShadow=!0,a.receiveShadow=!0,r.add(a);const l=new Y(new Jt(2.35,2.42,.1,8),s.hullMid);l.position.y=.34,r.add(l);for(const v of[-1,1]){const g=new Y(new he(.76,5.8,.78),s.hullDark);g.position.set(v*2.55,2.95,-.2),g.castShadow=!0,g.receiveShadow=!0,r.add(g);const p=new Y(new he(.14,5.3,.84),s.poleMetal);p.position.set(v*2.1,2.95,-.2),r.add(p)}const c=new Y(new he(6.5,.72,.96),s.hullMid);c.position.set(0,6,-.2),c.castShadow=!0,c.receiveShadow=!0,r.add(c);const h=new Y(new he(4.8,.09,1.01),s.magenta);h.position.set(0,6,-.2),r.add(h),e.midground.add(r);const u=new je;u.position.set(0,6.8,-12.6);const d=new Y(new he(20,.62,1.4),s.hullMid);d.castShadow=!0,d.receiveShadow=!0,u.add(d);const f=new Y(new he(19.6,.14,1.48),s.poleMetal);f.position.y=.36,u.add(f);const m=new Y(new he(19.6,.12,1.48),s.hullDark);m.position.y=-.34,u.add(m),e.midground.add(u)}static buildCyberCityscape(e,t,n){for(let i=0;i<t.length;i++){const s=t[i],r=un.terrainHeight(s.x,s.z),a=hn.classifyZ(s.z),l=hs.composeUrbanBuilding({seedIndex:i,x:s.x,baseY:r,z:s.z,width:s.width,depth:s.depth,height:s.height,neonTone:s.neonTone,floors:s.floors,setbackRatio:s.setbackRatio,hasStorefront:s.hasStorefront,hasBillboard:s.hasBillboard,hasAntenna:s.hasAntenna},n);e.getGroup(a).add(l)}}static buildCyberSkyBackdrop(e,t){const n=new Y(new $s(2.9,3.18,28),t.poleMetal);n.position.set(0,14.2,-29),n.userData.skipObjectOutline=!0,e.add(n);const i=new Y(new Hr(2.65,24),t.hullMid);i.position.set(0,14.2,-29.2),i.userData.skipObjectOutline=!0,e.add(i);const s=[];for(const v of[-9.5,9.5]){const g=new Ht({color:v<0?t.cyan.color:t.magenta.color,transparent:!0,opacity:.06}),p=new Y(new Jt(.38,.12,24,6),g);p.position.set(v,15,-20),p.rotation.z=v<0?-.1:.1,p.userData.skipObjectOutline=!0,e.add(p),s.push(p)}const r=140,a=new Float32Array(r*3),l=new Float32Array(r*3),c=new G("#6E7B87"),h=new G("#8A99A6"),u=new G("#3B424C");for(let v=0;v<r;v++){const g=Math.sin(v*127.1)*43758.5453,p=Math.sin(v*311.7)*43758.5453,x=g-Math.floor(g),_=p-Math.floor(p);a[v*3]=(x-.5)*80,a[v*3+1]=8.2+_*25,a[v*3+2]=-22-v*.37%18;const y=v%5===0?h:v%2===0?c:u;l[v*3]=y.r,l[v*3+1]=y.g,l[v*3+2]=y.b}const d=new Ge;d.setAttribute("position",new $e(a,3)),d.setAttribute("color",new $e(l,3));const f=new qs({size:.32,vertexColors:!0,fog:!1,transparent:!0,opacity:.55}),m=new Zs(d,f);return m.userData.skipObjectOutline=!0,e.add(m),{skySunMesh:i,skyHaloMesh:n,skyBeams:s,starPoints:m}}}class Hh{constructor(e,t){F(this,"container");F(this,"config");F(this,"state","idle");F(this,"userManuallyPaused",!1);F(this,"autoPausedOffscreen",!1);F(this,"autoPausedHiddenTab",!1);F(this,"isFullscreenActive",!1);F(this,"renderer",null);F(this,"scene",null);F(this,"camera",null);F(this,"lastAutoPlaygroundFov",null);F(this,"outlinedTargets",new Set);F(this,"postProcessor",null);F(this,"loop",null);F(this,"lifecycle",null);F(this,"pointerInput",null);F(this,"keyboardInput",null);F(this,"ecsWorld",null);F(this,"systemRunner",null);F(this,"windSystem",null);F(this,"vfx",null);F(this,"builtPlayground",null);F(this,"builtMascot",null);F(this,"mascotRootObj",null);F(this,"primaryEntityId",null);F(this,"containerWidth",1);F(this,"containerHeight",1);F(this,"activeCellSize",10);F(this,"gridColumns",1);F(this,"gridRows",1);F(this,"effectiveDpr",1);F(this,"resolutionTier","desktop");F(this,"lastDrawCalls",0);F(this,"lastTriangles",0);F(this,"onPassivePointerMoveBound");F(this,"onContextLostBound");if(!e||!(e instanceof HTMLElement))throw new Error("[AsciiSceneEngine] A valid container HTMLElement is required to instantiate the engine.");this.container=e;const n=(t==null?void 0:t.mode)==="mascot"?hl(cl,{fov:38,bloomIntensity:.08,dofStrength:0,blockBlendWeight:0,palette:{background:tr}}):cl;this.config=hl(n,t),this.onPassivePointerMoveBound=this.handlePassiveContainerMove.bind(this),this.onContextLostBound=this.handleContextLost.bind(this)}mount(){var e,t,n,i;if(this.state==="destroyed")throw new Error("[AsciiSceneEngine] Cannot mount an engine instance that has already been destroyed. Create a new instance instead.");if(this.state==="idle")try{window.getComputedStyle(this.container).position==="static"&&(this.container.style.position="relative");const r=new Zd({antialias:!1,alpha:!1,powerPreference:"high-performance",stencil:!1,depth:!1}),a=Math.min(window.devicePixelRatio||1,this.config.maxPixelRatio);r.setPixelRatio(a),r.shadowMap.enabled=this.config.enableShadows,r.shadowMap.type=wl,r.outputColorSpace=_t,r.info.autoReset=!0;const l=r.domElement;l.style.display="block",l.style.width="100%",l.style.height="100%",l.style.position="absolute",l.style.inset="0",l.style.zIndex="0",l.style.pointerEvents="none",l.setAttribute("aria-hidden","true"),l.dataset.asciiEngineCanvas="true",l.addEventListener("webglcontextlost",this.onContextLostBound,!1),this.container.prepend(l),this.renderer=r;const c=new ii(this.container),h=new Ch(this.container,{trackWindowHover:!1}),u=new Ah({enabled:this.config.enableKeyboard,focusTarget:this.container});this.config.mode!=="mascot"&&(h.attach(),u.attach(),this.container.addEventListener("pointermove",this.onPassivePointerMoveBound,{passive:!0})),c.registerCleanup(()=>{this.container.removeEventListener("pointermove",this.onPassivePointerMoveBound),h.detach(),u.detach()}),this.lifecycle=c,this.pointerInput=h,this.keyboardInput=u;const d=new bh,f=new wh;this.ecsWorld=d,this.systemRunner=f,this.config.mode==="mascot"?this.initMascotStage(d,f):this.initPlaygroundStage(d,f,h,u),this.postProcessor=new EM(this.config);const m=this.container.getBoundingClientRect();this.applyResize(Math.max(1,m.width),Math.max(1,m.height),!0),c.observeContainer({onResize:(v,g)=>this.applyResize(v,g,!1),onVisibilityChange:v=>this.handleIntersectionVisibility(v),onTabHiddenChange:v=>this.handleTabVisibility(v),onFullscreenChange:v=>{this.isFullscreenActive=v}},{observeViewportIntersection:this.config.pauseOffscreen,observeTabVisibility:this.config.pauseOnHiddenTab}),this.loop=new ph({maxFps:this.config.maxFps,onFrame:({dt:v,elapsed:g})=>this.renderFrame(v,g),onTelemetry:()=>{var v,g;return(g=(v=this.config.callbacks)==null?void 0:v.onFpsUpdate)==null?void 0:g.call(v,this.getStats())}}),this.state="running",this.loop.start(),(t=(e=this.config.callbacks)==null?void 0:e.onMount)==null||t.call(e)}catch(s){const r=s instanceof Error?s:new Error(String(s));throw(i=(n=this.config.callbacks)==null?void 0:n.onError)==null||i.call(n,r),r}}initPlaygroundStage(e,t,n,i){const s=Uh.load(this.config.mapId),r=un.build(s,this.config,e);this.builtPlayground=r,this.scene=r.scene,this.primaryEntityId=r.avatarEntityId;const a=typeof this.config.fov=="number"?this.config.fov:106,l=new Ct(a,16/9,.5,110);l.position.set(...s.cameraAnchor),l.lookAt(...s.cameraLookAt),l.updateMatrixWorld(),this.camera=l,this.lastAutoPlaygroundFov=typeof this.config.fov=="number"?null:a,this.vfx=new Lh({scene:r.scene,config:this.config,baseCameraPos:s.cameraAnchor,lookAtTarget:s.cameraLookAt,particleOrigin:s.shrineCenter,particleCount:200});const c=new _h(this.config.windStrength);this.windSystem=c,t.addSystem(new yh(n,i,l),10).addSystem(new xh,15).addSystem(new ul(r.terrainHeightAt,r.waypointMarker),20).addSystem(c,25).addSystem(new ll,30).addSystem(new Mh,35).addSystem(new Sh(l),38).addSystem(new dl,40),t.run(e,{dt:0,elapsed:0})}initMascotStage(e,t){this.config={...this.config,palette:{...this.config.palette,background:tr}};const n=Oh.build(this.config);this.builtMascot=n,this.scene=n.scene;const i=[0,1.08,4.25],s=[0,.9,0],r=typeof this.config.fov=="number"?this.config.fov:38,a=new Ct(r,1,.3,40);a.position.set(...i),a.lookAt(...s),this.camera=a;const{entityId:l,rootGroup:c}=Th.spawn(e,n.scene,{position:[0,.04,0],scale:1.02,includeShowcaseRig:!1,bobAmplitude:.018});this.primaryEntityId=l,this.mascotRootObj=c,this.vfx=null,t.addSystem(new ul,20).addSystem(new ll,30).addSystem(new dl,40)}pause(){this.userManuallyPaused=!0,this.transitionToPaused()}resume(){this.userManuallyPaused=!1,this.tryResumeIfEligible()}setPlayableKeyboardEnabled(e){var t;this.config.enableKeyboard=e,(t=this.keyboardInput)==null||t.setEnabled(e)}resize(e,t=!1){this.state!=="destroyed"&&e.width>0&&e.height>0&&this.applyResize(e.width,e.height,t)}updateConfig(e){var l,c,h,u,d,f;if(this.state==="destroyed")return;const t=this.config.characterRamp,n=this.config.structuralChars,i=this.config.fontFamily,s=this.config.enableShadows,r=this.config.maxPixelRatio;if(this.config=hl(this.config,e),(l=this.keyboardInput)==null||l.setEnabled(this.config.enableKeyboard),(c=this.loop)==null||c.setMaxFps(this.config.maxFps),(h=this.windSystem)==null||h.setWindStrength(this.config.windStrength),!this.renderer||!this.scene||!this.postProcessor)return;this.camera&&typeof e.fov=="number"&&(this.camera.fov=e.fov,this.camera.updateProjectionMatrix(),this.lastAutoPlaygroundFov=null),s!==this.config.enableShadows&&(this.renderer.shadowMap.enabled=this.config.enableShadows,this.builtMascot&&(this.builtMascot.keyLight.castShadow=this.config.enableShadows),this.renderer.shadowMap.needsUpdate=!0),this.builtMascot&&!((u=e.palette)!=null&&u.background)&&(this.config.palette.background=tr),this.scene.background instanceof G&&this.scene.background.set(this.config.palette.background),this.builtPlayground?(un.applyAtmosphere(this.builtPlayground,this.config),this.renderer.shadowMap.needsUpdate=!0):this.scene.fog instanceof Yi&&this.scene.fog.color.set(this.config.palette.background),(d=this.vfx)==null||d.applyConfig(this.config);const a=t!==this.config.characterRamp||n!==this.config.structuralChars||i!==this.config.fontFamily;if(r!==this.config.maxPixelRatio)this.applyResize(this.containerWidth,this.containerHeight,!1);else{const m=this.postProcessor.applyConfig(this.config,a,this.containerWidth,this.containerHeight,typeof window<"u"&&window.devicePixelRatio||1,this.isCoarsePointerDevice());this.activeCellSize=m.activeCellSize,this.gridColumns=m.columns,this.gridRows=m.rows,this.effectiveDpr=m.effectiveDpr,this.resolutionTier=m.tier}this.state==="paused"&&((f=this.loop)==null||f.stepOnce(0))}destroy(){var e,t,n,i,s,r;if(this.state!=="destroyed"){(e=this.loop)==null||e.stop(),this.loop=null,(t=this.systemRunner)==null||t.clear(),this.systemRunner=null,this.windSystem=null;for(const a of this.outlinedTargets)er(a);if(this.outlinedTargets.clear(),(n=this.ecsWorld)==null||n.clear(!0),this.ecsWorld=null,this.builtPlayground=null,this.builtMascot=null,this.mascotRootObj=null,this.vfx=null,(i=this.lifecycle)==null||i.disposeAll(this.scene),this.lifecycle=null,this.scene=null,this.camera=null,this.pointerInput=null,this.keyboardInput=null,this.postProcessor&&(this.postProcessor.dispose(),this.postProcessor=null),this.renderer){const a=this.renderer.domElement;a.removeEventListener("webglcontextlost",this.onContextLostBound,!1),this.renderer.renderLists.dispose(),this.renderer.dispose(),a.parentNode&&a.parentNode.removeChild(a),this.renderer=null}this.state="destroyed",(r=(s=this.config.callbacks)==null?void 0:s.onDestroy)==null||r.call(s)}}getState(){return this.state}getConfig(){return hl(this.config)}getStats(){var t,n;const e=((t=this.loop)==null?void 0:t.getTelemetry())??{fps:60,frameTimeMs:16.67};return{fps:e.fps,frameTimeMs:e.frameTimeMs,activeCellSize:this.activeCellSize,gridColumns:this.gridColumns,gridRows:this.gridRows,drawCalls:this.lastDrawCalls,triangles:this.lastTriangles,entityCount:((n=this.ecsWorld)==null?void 0:n.getEntityCount())??0,effectiveDpr:this.effectiveDpr,resolutionTier:this.resolutionTier}}getScene(){return this.scene}getCamera(){return this.camera}getPrimaryEntityAngles(){if(!this.ecsWorld||this.primaryEntityId===null)return null;const e=this.ecsWorld.getComponent(this.primaryEntityId,"Transform");return e?{yaw:e.rotY,pitch:e.rotX}:null}resolveOutlineTarget(e){var t,n,i;return!e&&e!==0?null:typeof e.traverse=="function"?e:e==="primary"?this.ecsWorld&&this.primaryEntityId!==null?((t=this.ecsWorld.getComponent(this.primaryEntityId,"Renderable"))==null?void 0:t.object3D)??null:null:typeof e=="number"?((i=(n=this.ecsWorld)==null?void 0:n.getComponent(e,"Renderable"))==null?void 0:i.object3D)??null:typeof e=="string"&&this.scene?this.scene.getObjectByName(e)??null:null}setObjectOutline(e,t){var a,l;if(this.state==="destroyed")return null;const n=this.resolveOutlineTarget(e);if(!n)return null;const i=vl(n)!==null,s={...t??{}};!i&&s.highlightColor===void 0&&s.color===void 0&&(s.highlightColor=((a=this.config.palette)==null?void 0:a.cursorLight)||cs);const r=Kr(n,s);return this.outlinedTargets.add(n),this.state==="paused"&&((l=this.loop)==null||l.stepOnce(0)),r}clearObjectOutline(e){var i,s;if(e===void 0){let r=0;for(const a of this.outlinedTargets)r+=er(a);return this.outlinedTargets.clear(),this.state==="paused"&&((i=this.loop)==null||i.stepOnce(0)),r}const t=this.resolveOutlineTarget(e);if(!t)return 0;const n=er(t);return this.outlinedTargets.delete(t),this.state==="paused"&&((s=this.loop)==null||s.stepOnce(0)),n}getObjectOutlineState(e){const t=this.resolveOutlineTarget(e);return t?vl(t):null}renderFrame(e,t){var s;if(!this.renderer||!this.scene||!this.camera||!this.postProcessor)return;this.ecsWorld&&this.systemRunner&&this.systemRunner.run(this.ecsWorld,{dt:e,elapsed:t});const n=this.pointerInput?this.pointerInput.sample(0):{normX:0,normY:0,dragYaw:0,dragPitch:0,active:!1,isDown:!1,isTouch:!1,motionSpeed:0,lastInteractionMs:0};if((s=this.vfx)==null||s.update(e,t,n,this.camera,this.config),this.builtPlayground){const r=this.builtPlayground.waterMaterial.uniforms;r.uTime&&(r.uTime.value=t),r.uCamPos&&r.uCamPos.value.copy(this.camera.position),r.uShrineLight&&r.uShrineLight.value.set(this.builtPlayground.torchLight.position.x,this.builtPlayground.torchLight.position.y,this.builtPlayground.torchLight.position.z,this.builtPlayground.torchLight.intensity);const a=this.builtPlayground.moonDirLight.shadow;if(this.config.enableShadows&&a.map?(r.uDirShadowMap&&(r.uDirShadowMap.value=a.map.texture),r.uDirShadowMatrix&&r.uDirShadowMatrix.value.copy(a.matrix),r.uShadowMapSize&&r.uShadowMapSize.value.set(a.mapSize.width,a.mapSize.height),r.uShadowEnabled&&(r.uShadowEnabled.value=1)):r.uShadowEnabled&&(r.uShadowEnabled.value=0),this.ecsWorld&&r.uAvatarPos){const c=this.ecsWorld.getComponent(this.builtPlayground.avatarEntityId,"Transform");c&&r.uAvatarPos.value.set(c.x,c.y,c.z)}if(this.vfx){const c=this.vfx.getCursorLight();r.uCursorPos&&r.uCursorPos.value.copy(c.position),r.uCursorIntensity&&(r.uCursorIntensity.value=c.intensity)}const l=["uTorch0","uTorch1","uTorch2","uTorch3"];for(let c=0;c<l.length;c++){const h=l[c],u=this.builtPlayground.brazierLights[c];r[h]&&(u?r[h].value.set(u.position.x,u.position.y,u.position.z,u.intensity):r[h].value.set(0,0,0,0))}}if(this.builtMascot){const r=this.builtMascot.floorMaterial.uniforms;r.uCamPos&&r.uCamPos.value.copy(this.camera.position);const a=this.builtMascot.keyLight.shadow;if(this.config.enableShadows&&a.map?(r.uDirShadowMap&&(r.uDirShadowMap.value=a.map.texture),r.uDirShadowMatrix&&r.uDirShadowMatrix.value.copy(a.matrix),r.uShadowMapSize&&r.uShadowMapSize.value.set(a.mapSize.width,a.mapSize.height),r.uShadowEnabled&&(r.uShadowEnabled.value=1)):r.uShadowEnabled&&(r.uShadowEnabled.value=0),this.mascotRootObj){this.mascotRootObj.updateWorldMatrix(!0,!1);const l=this.mascotRootObj.matrixWorld.elements;r.uSubjectYaw&&(r.uSubjectYaw.value=Math.atan2(l[8]??0,l[10]??1)),r.uSubjectPos&&r.uSubjectPos.value.set(l[12]??0,0,l[14]??0)}}const i=this.postProcessor.render(this.renderer,this.scene,this.camera,t,e);this.lastDrawCalls=i.drawCalls,this.lastTriangles=i.triangles}isCoarsePointerDevice(){if(typeof window>"u"||typeof window.matchMedia!="function")return!1;try{return window.matchMedia("(pointer: coarse)").matches}catch{return!1}}applyResize(e,t,n=!1){var c,h,u;if(!this.renderer||!this.camera||!this.postProcessor)return;const i=typeof window<"u"&&window.devicePixelRatio||1,s=this.isCoarsePointerDevice(),r=typeof document<"u"&&!!((h=(c=this.container).closest)!=null&&h.call(c,'[data-fullscreen-view="true"], .is-scene-fullscreen')),a=qr({cssWidth:e,cssHeight:t,devicePixelRatio:i,config:this.config,isCoarsePointer:s,isFullscreen:this.isFullscreenActive||r});if(!n&&this.containerWidth===a.cssWidth&&this.containerHeight===a.cssHeight&&this.effectiveDpr===a.effectiveDpr&&this.activeCellSize===a.activeCellSize)return;this.containerWidth=a.cssWidth,this.containerHeight=a.cssHeight,this.effectiveDpr=a.effectiveDpr,this.resolutionTier=a.tier,this.activeCellSize=a.activeCellSize,this.gridColumns=a.columns,this.gridRows=a.rows,this.renderer.getPixelRatio()!==a.effectiveDpr&&this.renderer.setPixelRatio(a.effectiveDpr),this.renderer.setSize(a.cssWidth,a.cssHeight,!1);const l=Math.max(.1,a.cssWidth/Math.max(1,a.cssHeight));this.camera.aspect=l,typeof this.config.fov=="number"?(this.camera.fov=this.config.fov,this.lastAutoPlaygroundFov=null):this.config.mode==="playground"&&(this.lastAutoPlaygroundFov!==null&&Math.abs(this.camera.fov-this.lastAutoPlaygroundFov)>.01||(this.camera.fov=106,this.lastAutoPlaygroundFov=106)),this.camera.updateProjectionMatrix(),this.postProcessor.applyResolutionProfile(a,this.config,n),this.state==="paused"&&((u=this.loop)==null||u.stepOnce(0))}transitionToPaused(){var e,t,n;this.state==="running"&&((e=this.loop)==null||e.pause(),this.state="paused",(n=(t=this.config.callbacks)==null?void 0:t.onPause)==null||n.call(t))}tryResumeIfEligible(){var e,t,n;this.state==="paused"&&(this.userManuallyPaused||this.autoPausedOffscreen||this.autoPausedHiddenTab||(this.state="running",(e=this.loop)==null||e.resume(),(n=(t=this.config.callbacks)==null?void 0:t.onResume)==null||n.call(t)))}handleIntersectionVisibility(e){this.config.pauseOffscreen&&(e?(this.autoPausedOffscreen=!1,this.tryResumeIfEligible()):(this.autoPausedOffscreen=!0,this.transitionToPaused()))}handleTabVisibility(e){this.config.pauseOnHiddenTab&&(e?(this.autoPausedHiddenTab=!0,this.transitionToPaused()):(this.autoPausedHiddenTab=!1,this.tryResumeIfEligible()))}handlePassiveContainerMove(e){}handleContextLost(e){var t,n,i;e.preventDefault(),(t=this.loop)==null||t.pause(),(i=(n=this.config.callbacks)==null?void 0:n.onError)==null||i.call(n,new Error("[AsciiSceneEngine] WebGL context lost."))}}const Gh=new WeakMap;class GM extends Xt{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new cn(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,r=>{this.parse(r,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,_t,n).catch(n)}decodeDracoFile(e,t,n,i,s=Ut,r=()=>{}){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t).catch(r)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Gh.has(e)){const l=Gh.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,r=e.byteLength,a=this._getWorker(s,r).then(l=>(i=l,new Promise((c,h)=>{i._callbacks[s]={resolve:c,reject:h},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Gh.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new Ge;e.index&&t.setIndex(new $e(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,r=i.array,a=i.itemSize,l=new $e(r,a);s==="color"&&(this._assignVertexColorSpace(l,i.vertexColorSpace),l.normalized=!(r instanceof Float32Array)),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==_t)return;const n=new G;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i),Qe.toWorkingColorSpace(n,_t),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new cn(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=VM.toString(),r=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([r]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const r=s.data;switch(r.type){case"decode":i._callbacks[r.id].resolve(r);break;case"error":i._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function VM(){let o,e;onmessage=function(r){const a=r.data;switch(a.type){case"init":o=a.decoderConfig,e=new Promise(function(h){o.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(o)});break;case"decode":const l=a.buffer,c=a.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder;try{const f=t(u,d,new Int8Array(l),c),m=f.attributes.map(v=>v.array.buffer);f.index&&m.push(f.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:f},m)}catch(f){console.error(f),self.postMessage({type:"error",id:a.id,error:f.message})}finally{u.destroy(d)}});break}};function t(r,a,l,c){const h=c.attributeIDs,u=c.attributeTypes;let d,f;const m=a.GetEncodedGeometryType(l);if(m===r.TRIANGULAR_MESH)d=new r.Mesh,f=a.DecodeArrayToMesh(l,l.byteLength,d);else if(m===r.POINT_CLOUD)d=new r.PointCloud,f=a.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const v={index:null,attributes:[]};for(const g in h){const p=self[u[g]];let x,_;if(c.useUniqueIDs)_=h[g],x=a.GetAttributeByUniqueId(d,_);else{if(_=a.GetAttributeId(d,r[h[g]]),_===-1)continue;x=a.GetAttribute(d,_)}const y=i(r,a,d,g,p,x);g==="color"&&(y.vertexColorSpace=c.vertexColorSpace),v.attributes.push(y)}return m===r.TRIANGULAR_MESH&&(v.index=n(r,a,d)),r.destroy(d),v}function n(r,a,l){const h=l.num_faces()*3,u=h*4,d=r._malloc(u);a.GetTrianglesUInt32Array(l,u,d);const f=new Uint32Array(r.HEAPF32.buffer,d,h).slice();return r._free(d),{array:f,itemSize:1}}function i(r,a,l,c,h,u){const d=u.num_components(),m=l.num_points()*d,v=m*h.BYTES_PER_ELEMENT,g=s(r,h),p=r._malloc(v);a.GetAttributeDataArrayForAllPoints(l,u,g,v,p);const x=new h(r.HEAPF32.buffer,p,m).slice();return r._free(p),{name:c,array:x,itemSize:d}}function s(r,a){switch(a){case Float32Array:return r.DT_FLOAT32;case Int8Array:return r.DT_INT8;case Int16Array:return r.DT_INT16;case Int32Array:return r.DT_INT32;case Uint8Array:return r.DT_UINT8;case Uint16Array:return r.DT_UINT16;case Uint32Array:return r.DT_UINT32}}}function Np(o,e){if(e===Pu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===Xo||e===Bl){let t=o.getIndex();if(t===null){const r=[],a=o.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)r.push(l);o.setIndex(r),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const n=t.count-2,i=[];if(e===Xo)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=o.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}class WM extends Xt{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new KM(t)}),this.register(function(t){return new $M(t)}),this.register(function(t){return new rS(t)}),this.register(function(t){return new oS(t)}),this.register(function(t){return new aS(t)}),this.register(function(t){return new jM(t)}),this.register(function(t){return new QM(t)}),this.register(function(t){return new eS(t)}),this.register(function(t){return new tS(t)}),this.register(function(t){return new ZM(t)}),this.register(function(t){return new nS(t)}),this.register(function(t){return new JM(t)}),this.register(function(t){return new sS(t)}),this.register(function(t){return new iS(t)}),this.register(function(t){return new YM(t)}),this.register(function(t){return new lS(t)}),this.register(function(t){return new cS(t)})}load(e,t,n,i){const s=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=Si.extractUrlBase(e);r=Si.resolveURL(c,this.path)}else r=Si.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new cn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const r={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Fp){try{r[tt.KHR_BINARY_GLTF]=new hS(e)}catch(u){i&&i(u);return}s=JSON.parse(r[tt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new wS(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,r[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case tt.KHR_MATERIALS_UNLIT:r[u]=new qM;break;case tt.KHR_DRACO_MESH_COMPRESSION:r[u]=new uS(s,this.dracoLoader);break;case tt.KHR_TEXTURE_TRANSFORM:r[u]=new dS;break;case tt.KHR_MESH_QUANTIZATION:r[u]=new fS;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(r),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function XM(){let o={};return{get:function(e){return o[e]},add:function(e,t){o[e]=t},remove:function(e){delete o[e]},removeAll:function(){o={}}}}const tt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class YM{constructor(e){this.parser=e,this.name=tt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new G(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ut);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Mi(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new _i(h),c.distance=u;break;case"spot":c=new nh(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,si(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class qM{constructor(){this.name=tt.KHR_MATERIALS_UNLIT}getMaterialType(){return Ht}extendParams(e,t,n){const i=[];e.color=new G(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],Ut),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,_t))}return Promise.all(i)}}class ZM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class KM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const a=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Z(a,a)}return Promise.all(s)}}class $M{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class JM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}}class jM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new G(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){const a=r.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ut)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,_t)),r.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}}class QM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}}class eS{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const a=r.attenuationColor||[1,1,1];return t.attenuationColor=new G().setRGB(a[0],a[1],a[2],Ut),Promise.all(s)}}class tS{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class nS{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));const a=r.specularColorFactor||[1,1,1];return t.specularColor=new G().setRGB(a[0],a[1],a[2],Ut),r.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,_t)),Promise.all(s)}}class iS{constructor(e){this.parser=e,this.name=tt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(s)}}class sS{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:yn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(s)}}class rS{constructor(e){this.parser=e,this.name=tt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}}class oS{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],a=i.images[r.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class aS{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],a=i.images[r.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class lS{constructor(e){this.name=tt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){const f=new ArrayBuffer(h*u);return r.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class cS{constructor(e){this.name=tt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==xn.TRIANGLES&&c.mode!==xn.TRIANGLE_STRIP&&c.mode!==xn.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=n.extensions[this.name].attributes,a=[],l={};for(const c in r)a.push(this.parser.getDependency("accessor",r[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const m of u){const v=new Ne,g=new E,p=new Bt,x=new E(1,1,1),_=new Pc(m.geometry,m.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),_.setMatrixAt(y,v.compose(g,p,x));for(const y in l)if(y==="_COLOR_0"){const C=l[y];_.instanceColor=new qi(C.array,C.itemSize,C.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,l[y]);it.prototype.copy.call(_,m),this.parser.assignFinalMaterial(_),f.push(_)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Fp="glTF",$r=12,Op={JSON:1313821514,BIN:5130562};class hS{constructor(e){this.name=tt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,$r),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Fp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-$r,s=new DataView(e,$r);let r=0;for(;r<i;){const a=s.getUint32(r,!0);r+=4;const l=s.getUint32(r,!0);if(r+=4,l===Op.JSON){const c=new Uint8Array(e,$r+r,a);this.content=n.decode(c)}else if(l===Op.BIN){const c=$r+r;this.body=e.slice(c,c+a)}r+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class uS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=tt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,a={},l={},c={};for(const h in r){const u=Wh[h]||h.toLowerCase();a[u]=r[h]}for(const h in e.attributes){const u=Wh[h]||h.toLowerCase();if(r[h]!==void 0){const d=n.accessors[e.attributes[h]],f=nr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const m in f.attributes){const v=f.attributes[m],g=l[m];g!==void 0&&(v.normalized=g)}u(f)},a,c,Ut,d)})})}}class dS{constructor(){this.name=tt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class fS{constructor(){this.name=tt.KHR_MESH_QUANTIZATION}}class Bp extends js{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,m=e*c,v=m-c,g=-2*f+3*d,p=f-d,x=1-g,_=p-d+u;for(let y=0;y!==a;y++){const C=r[v+y+a],b=r[v+y+l]*h,A=r[m+y+a],R=r[m+y]*h;s[y]=x*C+_*b+g*A+p*R}return s}}const pS=new Bt;class mS extends Bp{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return pS.fromArray(s).normalize().toArray(s),s}}const xn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},nr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},zp={9728:gt,9729:ct,9984:co,9985:gs,9986:Ri,9987:pn},kp={33071:qt,33648:ms,10497:hi},Vh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Wh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},bi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},gS={CUBICSPLINE:void 0,LINEAR:xs,STEP:ys},Xh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function vS(o){return o.DefaultMaterial===void 0&&(o.DefaultMaterial=new lt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Dn})),o.DefaultMaterial}function us(o,e,t){for(const n in t.extensions)o[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function si(o,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(o.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function yS(o,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(o);const r=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):o.attributes.position;r.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):o.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):o.attributes.color;l.push(d)}}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(o.morphAttributes.position=h),i&&(o.morphAttributes.normal=u),s&&(o.morphAttributes.color=d),o.morphTargetsRelative=!0,o})}function xS(o,e){if(o.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)o.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(o.morphTargetInfluences.length===t.length){o.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)o.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _S(o){let e;const t=o.extensions&&o.extensions[tt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Yh(t.attributes):e=o.indices+":"+Yh(o.attributes)+":"+o.mode,o.targets!==void 0)for(let n=0,i=o.targets.length;n<i;n++)e+=":"+Yh(o.targets[n]);return e}function Yh(o){let e="";const t=Object.keys(o).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+o[t[n]]+";";return e}function qh(o){switch(o){case Int8Array:return .007874015748031496;case Uint8Array:return .00392156862745098;case Int16Array:return 3051850947599719e-20;case Uint16Array:return 15259021896696422e-21;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function MS(o){return o.search(/\.jpe?g($|\?)/i)>0||o.search(/^data\:image\/jpeg/)===0?"image/jpeg":o.search(/\.webp($|\?)/i)>0||o.search(/^data\:image\/webp/)===0?"image/webp":o.search(/\.ktx2($|\?)/i)>0||o.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const SS=new Ne;class wS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new XM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,r=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new Kf(this.options.manager):this.textureLoader=new ap(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new cn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){const a={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return us(s,a,i),si(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i].joints;for(let a=0,l=r.length;a<l;a++)e[r[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(r,a)=>{const l=this.associations.get(r);l!=null&&this.associations.set(a,l);for(const[c,h]of r.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[tt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,r){n.load(Si.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const r=Vh[i.type],a=nr[i.componentType],l=i.normalized===!0,c=new a(i.count*r);return Promise.resolve(new $e(c,r,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){const a=r[0],l=Vh[i.type],c=nr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let v,g;if(f&&f!==u){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let _=t.cache.get(x);_||(v=new c(a,p*f,i.count*f/h),_=new Cr(v,f/h),t.cache.add(x,_)),g=new yi(_,l,d%f/h,m)}else a===null?v=new c(i.count*l):v=new c(a,d,i.count*l),g=new $e(v,l,m);if(i.sparse!==void 0){const p=Vh.SCALAR,x=nr[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,C=new x(r[1],_,i.sparse.count*p),b=new c(r[2],y,i.sparse.count*l);a!==null&&(g=new $e(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,R=C.length;A<R;A++){const S=C[A];if(g.setX(S,b[A*l]),l>=2&&g.setY(S,b[A*l+1]),l>=3&&g.setZ(S,b[A*l+2]),l>=4&&g.setW(S,b[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s];let a=this.textureLoader;if(r.uri){const l=n.manager.getHandler(r.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,r=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[r.sampler]||{};return h.magFilter=zp[d.magFilter]||ct,h.minFilter=zp[d.minFilter]||pn,h.wrapS=kp[d.wrapS]||hi,h.wrapT=kp[d.wrapT]||hi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==gt&&h.minFilter!==ct,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const r=i.images[e],a=self.URL||self.webkitURL;let l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=n.getDependency("bufferView",r.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:r.mimeType});return l=a.createObjectURL(d),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(v){const g=new vt(v);g.needsUpdate=!0,d(g)}),t.load(Si.resolveURL(u,s.path),m,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),si(u,r),u.userData.mimeType=r.mimeType||MS(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[tt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[tt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(r);r=s.extensions[tt.KHR_TEXTURE_TRANSFORM].extendTexture(r,a),s.associations.set(r,l)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new qs,Rt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Vt,Rt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||r){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),r&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),r&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return lt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let r;const a={},l=s.extensions||{},c=[];if(l[tt.KHR_MATERIALS_UNLIT]){const u=i[tt.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new G(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Ut),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,_t)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Mn);const h=s.alphaMode||Xh.OPAQUE;if(h===Xh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Xh.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==Ht&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Z(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&r!==Ht&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==Ht){const u=s.emissiveFactor;a.emissive=new G().setRGB(u[0],u[1],u[2],Ut)}return s.emissiveTexture!==void 0&&r!==Ht&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,_t)),Promise.all(c).then(function(){const u=new r(a);return s.name&&(u.name=s.name),si(u,s),t.associations.set(u,{materials:e}),s.extensions&&us(i,u,s),u})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[tt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Hp(l,a,t)})}const r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=_S(c),u=i[h];if(u)r.push(u.promise);else{let d;c.extensions&&c.extensions[tt.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Hp(new Ge,c,t),i[h]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,a=[];for(let l=0,c=r.length;l<c;l++){const h=r[l].material===void 0?vS(this.cache):this.getDependency("material",r[l].material);a.push(h)}return a.push(t.loadGeometries(r)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const v=h[f],g=r[f];let p;const x=c[f];if(g.mode===xn.TRIANGLES||g.mode===xn.TRIANGLE_STRIP||g.mode===xn.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new Rc(v,x):new Y(v,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===xn.TRIANGLE_STRIP?p.geometry=Np(p.geometry,Bl):g.mode===xn.TRIANGLE_FAN&&(p.geometry=Np(p.geometry,Xo));else if(g.mode===xn.LINES)p=new En(v,x);else if(g.mode===xn.LINE_STRIP)p=new On(v,x);else if(g.mode===xn.LINE_LOOP)p=new Nc(v,x);else if(g.mode===xn.POINTS)p=new Zs(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&xS(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),si(p,s),g.extensions&&us(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&us(i,u[0],s),u[0];const d=new je;s.extensions&&us(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ct(Gu.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Os(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),si(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),r=i,a=[],l=[];for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u){a.push(u);const d=new Ne;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Lr(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],m=i.samplers[f.sampler],v=f.target,g=v.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,x=i.parameters!==void 0?i.parameters[m.output]:m.output;v.node!==void 0&&(r.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",x)),c.push(m),h.push(v))}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],v=u[3],g=u[4],p=[];for(let x=0,_=d.length;x<_;x++){const y=d[x],C=f[x],b=m[x],A=v[x],R=g[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const S=n._createAnimationTracks(y,C,b,A,R);if(S)for(let M=0;M<S.length;M++)p.push(S[M])}return new Qs(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),r})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)r.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,SS)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new ba:c.length>1?h=new je:c.length===1?h=c[0]:h=new it,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=r),si(h,s),s.extensions&&us(n,h,s),s.matrix!==void 0){const u=new Ne;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new je;n.name&&(s.name=i.createUniqueName(n.name)),si(s,n),n.extensions&&us(t,s,n);const r=n.nodes||[],a=[];for(let l=0,c=r.length;l<c;l++)a.push(i.getDependency("node",r[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Rt||d instanceof vt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const r=[],a=e.name?e.name:e.uuid,l=[];bi[s.path]===bi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(bi[s.path]){case bi.weights:c=es;break;case bi.rotation:c=ts;break;case bi.position:case bi.scale:c=is;break;default:switch(n.itemSize){case 1:c=es;break;case 2:case 3:default:c=is;break}break}const h=i.interpolation!==void 0?gS[i.interpolation]:xs,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const m=new c(l[d]+"."+bi[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),r.push(m)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=qh(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ts?mS:Bp;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function bS(o,e,t){const n=e.attributes,i=new zt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new E(l[0],l[1],l[2]),new E(c[0],c[1],c[2])),a.normalized){const h=qh(nr[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new E,l=new E;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const v=qh(nr[d.componentType]);l.multiplyScalar(v)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}o.boundingBox=i;const r=new Nt;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,o.boundingSphere=r}function Hp(o,e,t){const n=e.attributes,i=[];function s(r,a){return t.getDependency("accessor",r).then(function(l){o.setAttribute(a,l)})}for(const r in n){const a=Wh[r]||r.toLowerCase();a in o.attributes||i.push(s(n[r],a))}if(e.indices!==void 0&&!o.index){const r=t.getDependency("accessor",e.indices).then(function(a){o.setIndex(a)});i.push(r)}return Qe.workingColorSpace!==Ut&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Qe.workingColorSpace}" not supported.`),si(o,e),bS(o,e,t),Promise.all(i).then(function(){return e.targets!==void 0?yS(o,e.targets,t):o})}const yl="./assets/draco/",Zh="./assets/models/cena_completa.glb",Kh=["Cidade_Sketchfab_model","Player_Rig","Carro_Grupo"],Gp=["Idle","Walking","Casting"];function Ti(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function TS(o){const e=String(o||yl).trim();if(/^https?:\/\//i.test(e)||/^\/\//.test(e))throw new Error(`[SceneGlbLoader] External CDN decoder path "${e}" is forbidden by the zero-CDN policy. Use a relative path such as "./assets/draco/".`);return e.endsWith("/")?e:`${e}/`}function AS(o){const e=o.lastIndexOf("/");return e>=0?o.slice(0,e+1):"./"}function ES(o){let e=0,t=0,n=0;const i={};return o.traverse(s=>{s.name&&(i[s.name]=s);const r=s;if(r.isMesh&&r.geometry){e+=1;const a=r.geometry.getAttribute("position");a&&(t+=a.count);const l=r.geometry.getIndex();l?n+=Math.floor(l.count/3):a&&(n+=Math.floor(a.count/3))}}),{meshCount:e,vertexCount:t,triangleCount:n,nodesByName:i}}class Vp{constructor(e={}){F(this,"decoderPath");F(this,"defaultModelUrl");F(this,"workerLimit");F(this,"fetchImpl");F(this,"dracoLoader",null);F(this,"gltfLoader",null);F(this,"loadedScenes",new Set);F(this,"disposed",!1);this.decoderPath=TS(e.decoderPath??yl),this.defaultModelUrl=String(e.modelUrl??Zh).trim();const t=Number.isFinite(e.workerLimit)?Number(e.workerLimit):4;this.workerLimit=Math.max(1,Math.min(8,Math.round(t))),this.fetchImpl=e.fetchImpl??(typeof globalThis.fetch=="function"?globalThis.fetch.bind(globalThis):null);const n=new GM;n.setDecoderPath(this.decoderPath),n.setWorkerLimit(this.workerLimit),e.decoderType==="js"&&n.setDecoderConfig({type:"js"});const i=new WM;i.setDRACOLoader(n),this.dracoLoader=n,this.gltfLoader=i}getDecoderPath(){return this.decoderPath}getWorkerLimit(){return this.workerLimit}preloadDecoder(){if(this.disposed||!this.dracoLoader)throw new Error("[SceneGlbLoader] Cannot preload a disposed loader.");this.dracoLoader.preload()}async load(e=this.defaultModelUrl){if(this.disposed||!this.gltfLoader||!this.dracoLoader)throw new Error("[SceneGlbLoader] Loader has already been disposed.");if(!this.fetchImpl)throw new Error("[SceneGlbLoader] Global fetch is unavailable in this environment.");const t=Ti(),n=Ti();this.dracoLoader.preload();const i=Ti()-n,s=Ti(),r=await this.fetchImpl(e);if(!r.ok)throw new Error(`[SceneGlbLoader] Failed to fetch "${e}" (HTTP ${r.status} ${r.statusText}).`);const a=await r.arrayBuffer(),l=Ti()-s,c=a.byteLength,h=Ti(),u=await this.gltfLoader.parseAsync(a,AS(e)),d=Ti()-h,f=Ti()-t,{meshCount:m,vertexCount:v,triangleCount:g,nodesByName:p}=ES(u.scene),x=Kh.filter(S=>!!p[S]),_=(u.animations||[]).map(S=>S.name).filter(Boolean),y=c/(1024*1024),C=Math.max(f/1e3,1e-6),b=Number((y/C).toFixed(2));this.loadedScenes.add(u.scene);let A=!1;const R=()=>{A||(A=!0,this.loadedScenes.delete(u.scene),u.scene.parent&&u.scene.parent.remove(u.scene),ii.disposeObject3D(u.scene))};return{gltf:u,scene:u.scene,animations:u.animations||[],nodesByName:p,metrics:{url:e,decoderPath:this.decoderPath,workerLimit:this.workerLimit,byteLength:c,decoderPreloadMs:Number(i.toFixed(2)),fetchMs:Number(l.toFixed(2)),decompressAndParseMs:Number(d.toFixed(2)),totalMs:Number(f.toFixed(2)),throughputMiBps:b,meshCount:m,vertexCount:v,triangleCount:g,preservedNodes:x,animationNames:_},dispose:R}}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.loadedScenes)e.parent&&e.parent.remove(e),ii.disposeObject3D(e);this.loadedScenes.clear(),this.dracoLoader&&(this.dracoLoader.dispose(),this.dracoLoader=null),this.gltfLoader=null}}}class Wp{constructor(e,t){F(this,"core");this.core=new Hh(e,t)}mount(){this.core.mount()}pause(){this.core.pause()}resume(){this.core.resume()}resize(e,t=!1){this.core.resize(e,t)}updateConfig(e){this.core.updateConfig(e)}setPlayableKeyboardEnabled(e){this.core.setPlayableKeyboardEnabled(e)}destroy(){this.core.destroy()}getState(){return this.core.getState()}getConfig(){return this.core.getConfig()}getStats(){return this.core.getStats()}getScene(){return this.core.getScene()}getCamera(){return this.core.getCamera()}getPrimaryEntityAngles(){return this.core.getPrimaryEntityAngles()}setObjectOutline(e,t){return this.core.setObjectOutline(e,t)}clearObjectOutline(e){return this.core.clearObjectOutline(e)}getObjectOutlineState(e){return this.core.getObjectOutlineState(e)}}const CS={AnimationSystem:ll,applyObjectOutline:Kr,AsciiEngineCore:Hh,AsciiSceneEngine:Wp,CameraFollowSystem:Sh,clearObjectOutline:er,computeAdaptiveResolution:qr,createGlyphAtlas:fl,DEFAULT_ASCII_RAMP:fh,DEFAULT_DRACO_DECODER_PATH:yl,DEFAULT_ENGINE_CONFIG:cl,DEFAULT_OUTLINE_HIGHLIGHT_COLOR:cs,DEFAULT_PALETTE:dh,DEFAULT_SCENE_GLB_URL:Zh,detectResolutionTier:gh,EngineLoop:ph,ensureWeldedOutlineNormals:Ih,EntityBlueprintRegistry:Bh,getObjectOutlineState:vl,InputSystem:yh,KeyboardInput:Ah,LifecycleManager:ii,MapLoader:Uh,MASCOT_BACKDROP_HEX:tr,MASCOT_FLOOR_HEX:Nh,MascotStageBuilder:Oh,MovementRotationSystem:ul,NeonPulseSystem:Mh,OUTLINE_SHELL_NAME:pl,PatrolSystem:xh,PlaygroundEntityFactory:zh,PlaygroundSceneBuilder:un,PointerInput:Ch,RenderSyncSystem:dl,REQUIRED_SCENE_NLA_TRACKS:Gp,REQUIRED_SCENE_ROOT_NODES:Kh,ResolutionTransitionController:vh,SceneComposerKit:hs,SceneDepthRig:hn,SceneGlbLoader:Vp,SystemRunner:wh,TuxEntityFactory:Th,VfxController:Lh,WindSystem:_h,World:bh,THREE:Rp};return De.AnimationSystem=ll,De.AsciiEngineCore=Hh,De.AsciiSceneEngine=Wp,De.CameraFollowSystem=Sh,De.DEFAULT_ASCII_RAMP=fh,De.DEFAULT_DRACO_DECODER_PATH=yl,De.DEFAULT_ENGINE_CONFIG=cl,De.DEFAULT_OUTLINE_HIGHLIGHT_COLOR=cs,De.DEFAULT_PALETTE=dh,De.DEFAULT_SCENE_GLB_URL=Zh,De.EngineLoop=ph,De.EntityBlueprintRegistry=Bh,De.InputSystem=yh,De.KeyboardInput=Ah,De.LifecycleManager=ii,De.MASCOT_BACKDROP_HEX=tr,De.MASCOT_FLOOR_HEX=Nh,De.MapLoader=Uh,De.MascotStageBuilder=Oh,De.MovementRotationSystem=ul,De.NeonPulseSystem=Mh,De.OUTLINE_SHELL_NAME=pl,De.PatrolSystem=xh,De.PlaygroundEntityFactory=zh,De.PlaygroundSceneBuilder=un,De.PointerInput=Ch,De.REQUIRED_SCENE_NLA_TRACKS=Gp,De.REQUIRED_SCENE_ROOT_NODES=Kh,De.RenderSyncSystem=dl,De.ResolutionTransitionController=vh,De.SceneComposerKit=hs,De.SceneDepthRig=hn,De.SceneGlbLoader=Vp,De.SystemRunner=wh,De.THREE=Rp,De.TuxEntityFactory=Th,De.VfxController=Lh,De.WindSystem=_h,De.World=bh,De.applyObjectOutline=Kr,De.clearObjectOutline=er,De.computeAdaptiveResolution=qr,De.createGlyphAtlas=fl,De.default=CS,De.detectResolutionTier=gh,De.ensureWeldedOutlineNormals=Ih,De.getObjectOutlineState=vl,Object.defineProperties(De,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),De}({});
