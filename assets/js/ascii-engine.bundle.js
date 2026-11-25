var ASCIIRealms=function($t){"use strict";var V_=Object.defineProperty;var G_=($t,on,Qi)=>on in $t?V_($t,on,{enumerable:!0,configurable:!0,writable:!0,value:Qi}):$t[on]=Qi;var k=($t,on,Qi)=>G_($t,typeof on!="symbol"?on+"":on,Qi);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const on="170",Qi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},jf={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hh=0,Qa=1,uh=2,tp=3,ep=0,ja=1,tl=2,Mn=3,Dn=0,Ne=1,Sn=2,Un=0,gi=1,Fr=2,el=3,nl=4,dh=5,ei=100,fh=101,ph=102,mh=103,gh=104,vh=200,yh=201,xh=202,_h=203,Nr=204,Br=205,Mh=206,Sh=207,bh=208,wh=209,Th=210,Eh=211,Ah=212,Ch=213,Rh=214,Or=0,zr=1,kr=2,vi=3,Hr=4,Vr=5,Gr=6,Wr=7,Ds=0,Ph=1,Ih=2,Fn=0,Lh=1,Dh=2,Uh=3,Fh=4,Nh=5,Bh=6,Oh=7,il="attached",zh="detached",Xr=300,Nn=301,ni=302,Us=303,Fs=304,ji=306,Ns=1e3,We=1001,Bs=1002,we=1003,sl=1004,np=1004,ts=1005,ip=1005,de=1006,Os=1007,sp=1007,bn=1008,rp=1008,wn=1009,rl=1010,ol=1011,es=1012,Yr=1013,Tn=1014,Xe=1015,Bn=1016,qr=1017,Zr=1018,yi=1020,al=35902,ll=1021,cl=1022,Ce=1023,hl=1024,ul=1025,xi=1026,_i=1027,$r=1028,zs=1029,dl=1030,Kr=1031,op=1032,Jr=1033,ks=33776,Hs=33777,Vs=33778,Gs=33779,Qr=35840,jr=35841,to=35842,eo=35843,no=36196,io=37492,so=37496,ro=37808,oo=37809,ao=37810,lo=37811,co=37812,ho=37813,uo=37814,fo=37815,po=37816,mo=37817,go=37818,vo=37819,yo=37820,xo=37821,Ws=36492,_o=36494,Mo=36495,fl=36283,So=36284,bo=36285,wo=36286,kh=2200,Hh=2201,Vh=2202,Xs=2300,To=2301,Eo=2302,Mi=2400,Si=2401,Ys=2402,Ao=2500,pl=2501,ap=0,lp=1,cp=2,Gh=3200,Wh=3201,hp=3202,up=3203,ii=0,Xh=1,On="",Be="srgb",bi="srgb-linear",qs="linear",ce="srgb",dp=0,wi=7680,fp=7681,pp=7682,mp=7683,gp=34055,vp=34056,yp=5386,xp=512,_p=513,Mp=514,Sp=515,bp=516,wp=517,Tp=518,ml=519,Yh=512,qh=513,Zh=514,gl=515,$h=516,Kh=517,Jh=518,Qh=519,Zs=35044,Ep=35048,Ap=35040,Cp=35045,Rp=35049,Pp=35041,Ip=35046,Lp=35050,Dp=35042,Up="100",vl="300 es",En=2e3,$s=2001;class An{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let jh=1234567;const Ti=Math.PI/180,ns=180/Math.PI;function je(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[r&255]+Pe[r>>8&255]+Pe[r>>16&255]+Pe[r>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function xe(r,t,e){return Math.max(t,Math.min(e,r))}function yl(r,t){return(r%t+t)%t}function Fp(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function Np(r,t,e){return r!==t?(e-r)/(t-r):0}function Ks(r,t,e){return(1-e)*r+e*t}function Bp(r,t,e,n){return Ks(r,t,1-Math.exp(-e*n))}function Op(r,t=1){return t-Math.abs(yl(r,t*2)-t)}function zp(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function kp(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function Hp(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Vp(r,t){return r+Math.random()*(t-r)}function Gp(r){return r*(.5-Math.random())}function Wp(r){r!==void 0&&(jh=r);let t=jh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xp(r){return r*Ti}function Yp(r){return r*ns}function qp(r){return(r&r-1)===0&&r!==0}function Zp(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function $p(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Kp(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),f=s((n-t)/2),m=o((n-t)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*m,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*m,a*c);break;case"ZYZ":r.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Oe(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Wt(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Jp={DEG2RAD:Ti,RAD2DEG:ns,generateUUID:je,clamp:xe,euclideanModulo:yl,mapLinear:Fp,inverseLerp:Np,lerp:Ks,damp:Bp,pingpong:Op,smoothstep:zp,smootherstep:kp,randInt:Hp,randFloat:Vp,randFloatSpread:Gp,seededRandom:Wp,degToRad:Xp,radToDeg:Yp,isPowerOfTwo:qp,ceilPowerOfTwo:Zp,floorPowerOfTwo:$p,setQuaternionFromProperEuler:Kp,normalize:Wt,denormalize:Oe};class K{constructor(t=0,e=0){K.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(t,e,n,i,s,o,a,l,c){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],v=i[0],g=i[3],p=i[6],x=i[1],_=i[4],y=i[7],P=i[2],T=i[5],E=i[8];return s[0]=o*v+a*x+l*P,s[3]=o*g+a*_+l*T,s[6]=o*p+a*y+l*E,s[1]=c*v+h*x+u*P,s[4]=c*g+h*_+u*T,s[7]=c*p+h*y+u*E,s[2]=d*v+f*x+m*P,s[5]=d*g+f*_+m*T,s[8]=d*p+f*y+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,m=e*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*s-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(xl.makeScale(t,e)),this}rotate(t){return this.premultiply(xl.makeRotation(-t)),this}translate(t,e){return this.premultiply(xl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const xl=new Vt;function tu(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}const Qp={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function is(r,t){return new Qp[r](t)}function Js(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function eu(){const r=Js("canvas");return r.style.display="block",r}const nu={};function Qs(r){r in nu||(nu[r]=!0,console.warn(r))}function jp(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function tm(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function em(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:bi,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(r.r=zn(r.r),r.g=zn(r.g),r.b=zn(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(r.r=ss(r.r),r.g=ss(r.g),r.b=ss(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===On?qs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function zn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ss(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const iu=[.64,.33,.3,.6,.15,.06],su=[.2126,.7152,.0722],ru=[.3127,.329],ou=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),au=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[bi]:{primaries:iu,whitePoint:ru,transfer:qs,toXYZ:ou,fromXYZ:au,luminanceCoefficients:su,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:iu,whitePoint:ru,transfer:ce,toXYZ:ou,fromXYZ:au,luminanceCoefficients:su,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}});let rs;class lu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{rs===void 0&&(rs=Js("canvas")),rs.width=t.width,rs.height=t.height;const n=rs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=rs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Js("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=zn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(zn(e[n]/255)*255):e[n]=zn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let nm=0;class Ei{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=je(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(_l(i[o].image)):s.push(_l(i[o]))}else s=_l(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function _l(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?lu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let im=0;class ve extends An{constructor(t=ve.DEFAULT_IMAGE,e=ve.DEFAULT_MAPPING,n=We,i=We,s=de,o=bn,a=Ce,l=wn,c=ve.DEFAULT_ANISOTROPY,h=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=je(),this.name="",this.source=new Ei(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xr)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ns:t.x=t.x-Math.floor(t.x);break;case We:t.x=t.x<0?0:1;break;case Bs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ns:t.y=t.y-Math.floor(t.y);break;case We:t.y=t.y<0?0:1;break;case Bs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ve.DEFAULT_IMAGE=null,ve.DEFAULT_MAPPING=Xr,ve.DEFAULT_ANISOTROPY=1;class Kt{constructor(t=0,e=0,n=0,i=1){Kt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,y=(f+1)/2,P=(p+1)/2,T=(h+d)/4,E=(u+v)/4,R=(m+g)/4;return _>y&&_>P?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=T/n,s=E/n):y>P?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=T/i,s=R/i):P<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(P),n=E/s,i=R/s),this.set(n,i,s,e),this}let x=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(u-v)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cu extends An{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Kt(0,0,t,e),this.scissorTest=!1,this.viewport=new Kt(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:de,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new ve(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ei(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ye extends cu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Co extends ve{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=we,this.minFilter=we,this.wrapR=We,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class sm extends Ye{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Co(null,t,e,n),this.texture.isRenderTargetTexture=!0}}class Ml extends ve{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=we,this.minFilter=we,this.wrapR=We,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rm extends Ye{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Ml(null,t,e,n),this.texture.isRenderTargetTexture=!0}}class qe{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],m=s[o+2],v=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==m){let g=1-a;const p=l*d+c*f+h*m+u*v,x=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const P=Math.sqrt(_),T=Math.atan2(P,p*x);g=Math.sin(g*T)/P,a=Math.sin(a*T)/P}const y=a*x;if(l=l*g+d*y,c=c*g+f*y,h=h*g+m*y,u=u*g+v*y,g===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],m=s[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(xe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Sl.copy(this).projectOnVector(t),this.sub(Sl)}reflect(t){return this.sub(Sl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Sl=new C,hu=new qe;class ze{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,hn):hn.fromBufferAttribute(s,o),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ro.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ro.copy(n.boundingBox)),Ro.applyMatrix4(t.matrixWorld),this.union(Ro)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(js),Po.subVectors(this.max,js),os.subVectors(t.a,js),as.subVectors(t.b,js),ls.subVectors(t.c,js),si.subVectors(as,os),ri.subVectors(ls,as),Ai.subVectors(os,ls);let e=[0,-si.z,si.y,0,-ri.z,ri.y,0,-Ai.z,Ai.y,si.z,0,-si.x,ri.z,0,-ri.x,Ai.z,0,-Ai.x,-si.y,si.x,0,-ri.y,ri.x,0,-Ai.y,Ai.x,0];return!bl(e,os,as,ls,Po)||(e=[1,0,0,0,1,0,0,0,1],!bl(e,os,as,ls,Po))?!1:(Io.crossVectors(si,ri),e=[Io.x,Io.y,Io.z],bl(e,os,as,ls,Po))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const kn=[new C,new C,new C,new C,new C,new C,new C,new C],hn=new C,Ro=new ze,os=new C,as=new C,ls=new C,si=new C,ri=new C,Ai=new C,js=new C,Po=new C,Io=new C,Ci=new C;function bl(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ci.fromArray(r,s);const a=i.x*Math.abs(Ci.x)+i.y*Math.abs(Ci.y)+i.z*Math.abs(Ci.z),l=t.dot(Ci),c=e.dot(Ci),h=n.dot(Ci);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const om=new ze,tr=new C,wl=new C;class Ie{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):om.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;tr.subVectors(t,this.center);const e=tr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(tr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(tr.copy(t.center).add(wl)),this.expandByPoint(tr.copy(t.center).sub(wl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Hn=new C,Tl=new C,Lo=new C,oi=new C,El=new C,Do=new C,Al=new C;class cs{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Hn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Hn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Hn.copy(this.origin).addScaledVector(this.direction,e),Hn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Tl.copy(t).add(e).multiplyScalar(.5),Lo.copy(e).sub(t).normalize(),oi.copy(this.origin).sub(Tl);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Lo),a=oi.dot(this.direction),l=-oi.dot(Lo),c=oi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=s*h,u>=0)if(d>=-m)if(d<=m){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Tl).addScaledVector(Lo,d),f}intersectSphere(t,e){Hn.subVectors(t.center,this.origin);const n=Hn.dot(this.direction),i=Hn.dot(Hn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Hn)!==null}intersectTriangle(t,e,n,i,s){El.subVectors(e,t),Do.subVectors(n,t),Al.crossVectors(El,Do);let o=this.direction.dot(Al),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;oi.subVectors(this.origin,t);const l=a*this.direction.dot(Do.crossVectors(oi,Do));if(l<0)return null;const c=a*this.direction.dot(El.cross(oi));if(c<0||l+c>o)return null;const h=-a*oi.dot(Al);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ut{constructor(t,e,n,i,s,o,a,l,c,h,u,d,f,m,v,g){Ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,d,f,m,v,g)}set(t,e,n,i,s,o,a,l,c,h,u,d,f,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ut().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/hs.setFromMatrixColumn(t,0).length(),s=1/hs.setFromMatrixColumn(t,1).length(),o=1/hs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,f=o*u,m=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-v*c,e[9]=-a*l,e[2]=v-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,v=c*u;e[0]=d+v*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=v+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,v=c*u;e[0]=d-v*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,m=a*h,v=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,m=a*l,v=a*c;e[0]=l*h,e[4]=v-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*l,f=o*c,m=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(am,t,lm)}lookAt(t,e,n){const i=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ai.crossVectors(n,tn),ai.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ai.crossVectors(n,tn)),ai.normalize(),Uo.crossVectors(tn,ai),i[0]=ai.x,i[4]=Uo.x,i[8]=tn.x,i[1]=ai.y,i[5]=Uo.y,i[9]=tn.y,i[2]=ai.z,i[6]=Uo.z,i[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],x=n[3],_=n[7],y=n[11],P=n[15],T=i[0],E=i[4],R=i[8],b=i[12],M=i[1],I=i[5],B=i[9],N=i[13],z=i[2],q=i[6],W=i[10],nt=i[14],X=i[3],ct=i[7],dt=i[11],mt=i[15];return s[0]=o*T+a*M+l*z+c*X,s[4]=o*E+a*I+l*q+c*ct,s[8]=o*R+a*B+l*W+c*dt,s[12]=o*b+a*N+l*nt+c*mt,s[1]=h*T+u*M+d*z+f*X,s[5]=h*E+u*I+d*q+f*ct,s[9]=h*R+u*B+d*W+f*dt,s[13]=h*b+u*N+d*nt+f*mt,s[2]=m*T+v*M+g*z+p*X,s[6]=m*E+v*I+g*q+p*ct,s[10]=m*R+v*B+g*W+p*dt,s[14]=m*b+v*N+g*nt+p*mt,s[3]=x*T+_*M+y*z+P*X,s[7]=x*E+_*I+y*q+P*ct,s[11]=x*R+_*B+y*W+P*dt,s[15]=x*b+_*N+y*nt+P*mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+v*(+e*l*f-e*c*d+s*o*d-i*o*f+i*c*h-s*l*h)+g*(+e*c*u-e*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+p*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],v=t[13],g=t[14],p=t[15],x=u*g*c-v*d*c+v*l*f-a*g*f-u*l*p+a*d*p,_=m*d*c-h*g*c-m*l*f+o*g*f+h*l*p-o*d*p,y=h*v*c-m*u*c+m*a*f-o*v*f-h*a*p+o*u*p,P=m*u*l-h*v*l-m*a*d+o*v*d+h*a*g-o*u*g,T=e*x+n*_+i*y+s*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=x*E,t[1]=(v*d*s-u*g*s-v*i*f+n*g*f+u*i*p-n*d*p)*E,t[2]=(a*g*s-v*l*s+v*i*c-n*g*c-a*i*p+n*l*p)*E,t[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*E,t[4]=_*E,t[5]=(h*g*s-m*d*s+m*i*f-e*g*f-h*i*p+e*d*p)*E,t[6]=(m*l*s-o*g*s-m*i*c+e*g*c+o*i*p-e*l*p)*E,t[7]=(o*d*s-h*l*s+h*i*c-e*d*c-o*i*f+e*l*f)*E,t[8]=y*E,t[9]=(m*u*s-h*v*s-m*n*f+e*v*f+h*n*p-e*u*p)*E,t[10]=(o*v*s-m*a*s+m*n*c-e*v*c-o*n*p+e*a*p)*E,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*f-e*a*f)*E,t[12]=P*E,t[13]=(h*v*i-m*u*i+m*n*d-e*v*d-h*n*g+e*u*g)*E,t[14]=(m*a*i-o*v*i-m*n*l+e*v*l+o*n*g-e*a*g)*E,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,m=s*u,v=o*h,g=o*u,p=a*u,x=l*c,_=l*h,y=l*u,P=n.x,T=n.y,E=n.z;return i[0]=(1-(v+p))*P,i[1]=(f+y)*P,i[2]=(m-_)*P,i[3]=0,i[4]=(f-y)*T,i[5]=(1-(d+p))*T,i[6]=(g+x)*T,i[7]=0,i[8]=(m+_)*E,i[9]=(g-x)*E,i[10]=(1-(d+v))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=hs.set(i[0],i[1],i[2]).length();const o=hs.set(i[4],i[5],i[6]).length(),a=hs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],un.copy(this);const c=1/s,h=1/o,u=1/a;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=u,un.elements[9]*=u,un.elements[10]*=u,e.setFromRotationMatrix(un),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=En){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,m;if(a===En)f=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(a===$s)f=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=En){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*c,f=(n+i)*h;let m,v;if(a===En)m=(o+s)*u,v=-2*u;else if(a===$s)m=s*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const hs=new C,un=new Ut,am=new C(0,0,0),lm=new C(1,1,1),ai=new C,Uo=new C,tn=new C,uu=new Ut,du=new qe;class en{constructor(t=0,e=0,n=0,i=en.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-xe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return uu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(uu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return du.setFromEuler(this),this.setFromQuaternion(du,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class Fo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let cm=0;const fu=new C,us=new qe,Vn=new Ut,No=new C,er=new C,hm=new C,um=new qe,pu=new C(1,0,0),mu=new C(0,1,0),gu=new C(0,0,1),vu={type:"added"},dm={type:"removed"},ds={type:"childadded",child:null},Cl={type:"childremoved",child:null};class ee extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=je(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ee.DEFAULT_UP.clone();const t=new C,e=new en,n=new qe,i=new C(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ut},normalMatrix:{value:new Vt}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return us.setFromAxisAngle(t,e),this.quaternion.multiply(us),this}rotateOnWorldAxis(t,e){return us.setFromAxisAngle(t,e),this.quaternion.premultiply(us),this}rotateX(t){return this.rotateOnAxis(pu,t)}rotateY(t){return this.rotateOnAxis(mu,t)}rotateZ(t){return this.rotateOnAxis(gu,t)}translateOnAxis(t,e){return fu.copy(t).applyQuaternion(this.quaternion),this.position.add(fu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pu,t)}translateY(t){return this.translateOnAxis(mu,t)}translateZ(t){return this.translateOnAxis(gu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?No.copy(t):No.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(er,No,this.up):Vn.lookAt(No,er,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),us.setFromRotationMatrix(Vn),this.quaternion.premultiply(us.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vu),ds.child=t,this.dispatchEvent(ds),ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(dm),Cl.child=t,this.dispatchEvent(Cl),Cl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vu),ds.child=t,this.dispatchEvent(ds),ds.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,t,hm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,um,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ee.DEFAULT_UP=new C(0,1,0),ee.DEFAULT_MATRIX_AUTO_UPDATE=!0,ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new C,Gn=new C,Rl=new C,Wn=new C,fs=new C,ps=new C,yu=new C,Pl=new C,Il=new C,Ll=new C,Dl=new Kt,Ul=new Kt,Fl=new Kt;class Ze{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),dn.subVectors(t,e),i.cross(dn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){dn.subVectors(i,e),Gn.subVectors(n,e),Rl.subVectors(t,e);const o=dn.dot(dn),a=dn.dot(Gn),l=dn.dot(Rl),c=Gn.dot(Gn),h=Gn.dot(Rl),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return s.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Wn.x),l.addScaledVector(o,Wn.y),l.addScaledVector(a,Wn.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return Dl.setScalar(0),Ul.setScalar(0),Fl.setScalar(0),Dl.fromBufferAttribute(t,e),Ul.fromBufferAttribute(t,n),Fl.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Dl,s.x),o.addScaledVector(Ul,s.y),o.addScaledVector(Fl,s.z),o}static isFrontFacing(t,e,n,i){return dn.subVectors(n,e),Gn.subVectors(t,e),dn.cross(Gn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),dn.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(.3333333333333333)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return Ze.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;fs.subVectors(i,n),ps.subVectors(s,n),Pl.subVectors(t,n);const l=fs.dot(Pl),c=ps.dot(Pl);if(l<=0&&c<=0)return e.copy(n);Il.subVectors(t,i);const h=fs.dot(Il),u=ps.dot(Il);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(fs,o);Ll.subVectors(t,s);const f=fs.dot(Ll),m=ps.dot(Ll);if(m>=0&&f<=m)return e.copy(s);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(ps,a);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return yu.subVectors(s,i),a=(u-h)/(u-h+(f-m)),e.copy(i).addScaledVector(yu,a);const p=1/(g+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(fs,o).addScaledVector(ps,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const xu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Bo={h:0,s:0,l:0};function Nl(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<.16666666666666666?r+(t-r)*6*e:e<.5?t:e<.6666666666666666?r+(t-r)*6*(.6666666666666666-e):r}class G{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Qt.workingColorSpace){if(t=yl(t,1),e=xe(e,0,1),n=xe(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Nl(o,s,t+.3333333333333333),this.g=Nl(o,s,t),this.b=Nl(o,s,t-.3333333333333333)}return Qt.toWorkingColorSpace(this,i),this}setStyle(t,e=Be){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const n=xu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=zn(t.r),this.g=zn(t.g),this.b=zn(t.b),this}copyLinearToSRGB(t){return this.r=ss(t.r),this.g=ss(t.g),this.b=ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return Qt.fromWorkingColorSpace(Le.copy(this),t),Math.round(xe(Le.r*255,0,255))*65536+Math.round(xe(Le.g*255,0,255))*256+Math.round(xe(Le.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Le.copy(this),e);const n=Le.r,i=Le.g,s=Le.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=Be){Qt.fromWorkingColorSpace(Le.copy(this),t);const e=Le.r,n=Le.g,i=Le.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(Bo);const n=Ks(li.h,Bo.h,e),i=Ks(li.s,Bo.s,e),s=Ks(li.l,Bo.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new G;G.NAMES=xu;let fm=0;class De extends An{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=je(),this.name="",this.blending=gi,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nr,this.blendDst=Br,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new G(0,0,0),this.blendAlpha=0,this.depthFunc=vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ml,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gi&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Nr&&(n.blendSrc=this.blendSrc),this.blendDst!==Br&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ml&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class fn extends De{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Ds,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Xn=pm();function pm(){const r=new ArrayBuffer(4),t=new Float32Array(r),e=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function $e(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=xe(r,-65504,65504),Xn.floatView[0]=r;const t=Xn.uint32View[0],e=t>>23&511;return Xn.baseTable[e]+((t&8388607)>>Xn.shiftTable[e])}function nr(r){const t=r>>10;return Xn.uint32View[0]=Xn.mantissaTable[Xn.offsetTable[t]+(r&1023)]+Xn.exponentTable[t],Xn.floatView[0]}const mm={toHalfFloat:$e,fromHalfFloat:nr},be=new C,Oo=new K;class ne{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Zs,this.updateRanges=[],this.gpuType=Xe,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Oo.fromBufferAttribute(this,e),Oo.applyMatrix3(t),this.setXY(e,Oo.x,Oo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Oe(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Wt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Oe(e,this.array)),e}setX(t,e){return this.normalized&&(e=Wt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Oe(e,this.array)),e}setY(t,e){return this.normalized&&(e=Wt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Oe(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Wt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Oe(e,this.array)),e}setW(t,e){return this.normalized&&(e=Wt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array),i=Wt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array),i=Wt(i,this.array),s=Wt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Zs&&(t.usage=this.usage),t}}class gm extends ne{constructor(t,e,n){super(new Int8Array(t),e,n)}}class vm extends ne{constructor(t,e,n){super(new Uint8Array(t),e,n)}}class ym extends ne{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}}class xm extends ne{constructor(t,e,n){super(new Int16Array(t),e,n)}}class Bl extends ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class _m extends ne{constructor(t,e,n){super(new Int32Array(t),e,n)}}class Ol extends ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Mm extends ne{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=nr(this.array[t*this.itemSize]);return this.normalized&&(e=Oe(e,this.array)),e}setX(t,e){return this.normalized&&(e=Wt(e,this.array)),this.array[t*this.itemSize]=$e(e),this}getY(t){let e=nr(this.array[t*this.itemSize+1]);return this.normalized&&(e=Oe(e,this.array)),e}setY(t,e){return this.normalized&&(e=Wt(e,this.array)),this.array[t*this.itemSize+1]=$e(e),this}getZ(t){let e=nr(this.array[t*this.itemSize+2]);return this.normalized&&(e=Oe(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Wt(e,this.array)),this.array[t*this.itemSize+2]=$e(e),this}getW(t){let e=nr(this.array[t*this.itemSize+3]);return this.normalized&&(e=Oe(e,this.array)),e}setW(t,e){return this.normalized&&(e=Wt(e,this.array)),this.array[t*this.itemSize+3]=$e(e),this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array)),this.array[t+0]=$e(e),this.array[t+1]=$e(n),this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array),i=Wt(i,this.array)),this.array[t+0]=$e(e),this.array[t+1]=$e(n),this.array[t+2]=$e(i),this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array),i=Wt(i,this.array),s=Wt(s,this.array)),this.array[t+0]=$e(e),this.array[t+1]=$e(n),this.array[t+2]=$e(i),this.array[t+3]=$e(s),this}}class Tt extends ne{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Sm=0;const an=new Ut,zl=new ee,ms=new C,nn=new ze,ir=new ze,Re=new C;class Gt extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=je(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(tu(t)?Ol:Bl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Vt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return zl.lookAt(t),zl.updateMatrix(),this.applyMatrix4(zl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Tt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ze);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ie);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];ir.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors(nn.min,ir.min),nn.expandByPoint(Re),Re.addVectors(nn.max,ir.max),nn.expandByPoint(Re)):(nn.expandByPoint(ir.min),nn.expandByPoint(ir.max))}nn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Re.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Re));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Re.fromBufferAttribute(a,c),l&&(ms.fromBufferAttribute(t,c),Re.add(ms)),i=Math.max(i,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ne(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new C,l[R]=new C;const c=new C,h=new C,u=new C,d=new K,f=new K,m=new K,v=new C,g=new C;function p(R,b,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,b),m.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(I),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),a[R].add(v),a[b].add(v),a[M].add(v),l[R].add(g),l[b].add(g),l[M].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let R=0,b=x.length;R<b;++R){const M=x[R],I=M.start,B=M.count;for(let N=I,z=I+B;N<z;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const _=new C,y=new C,P=new C,T=new C;function E(R){P.fromBufferAttribute(i,R),T.copy(P);const b=a[R];_.copy(b),_.sub(P.multiplyScalar(P.dot(b))).normalize(),y.crossVectors(T,b);const I=y.dot(l[R])<0?-1:1;o.setXYZW(R,_.x,_.y,_.z,I)}for(let R=0,b=x.length;R<b;++R){const M=x[R],I=M.start,B=M.count;for(let N=I,z=I+B;N<z;N+=3)E(t.getX(N+0)),E(t.getX(N+1)),E(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,m),s.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new ne(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Gt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _u=new Ut,Ri=new cs,zo=new Ie,Mu=new C,ko=new C,Ho=new C,Vo=new C,kl=new C,Go=new C,Su=new C,Wo=new C;class J extends ee{constructor(t=new Gt,e=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Go.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(kl.fromBufferAttribute(u,t),o?Go.addScaledVector(kl,h):Go.addScaledVector(kl.sub(e),h))}e.add(Go)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(s),Ri.copy(t.ray).recast(t.near),!(zo.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(zo,Mu)===null||Ri.origin.distanceToSquared(Mu)>(t.far-t.near)**2))&&(_u.copy(s).invert(),Ri.copy(t.ray).applyMatrix4(_u),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ri)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=o[g.materialIndex],x=Math.max(g.start,f.start),_=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,P=_;y<P;y+=3){const T=a.getX(y),E=a.getX(y+1),R=a.getX(y+2);i=Xo(this,p,t,n,c,h,u,T,E,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const x=a.getX(g),_=a.getX(g+1),y=a.getX(g+2);i=Xo(this,o,t,n,c,h,u,x,_,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=o[g.materialIndex],x=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,P=_;y<P;y+=3){const T=y,E=y+1,R=y+2;i=Xo(this,p,t,n,c,h,u,T,E,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const x=g,_=g+1,y=g+2;i=Xo(this,o,t,n,c,h,u,x,_,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function bm(r,t,e,n,i,s,o,a){let l;if(t.side===Ne?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Dn,a),l===null)return null;Wo.copy(a),Wo.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Wo);return c<e.near||c>e.far?null:{distance:c,point:Wo.clone(),object:r}}function Xo(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,ko),r.getVertexPosition(l,Ho),r.getVertexPosition(c,Vo);const h=bm(r,t,e,n,ko,Ho,Vo,Su);if(h){const u=new C;Ze.getBarycoord(Su,ko,Ho,Vo,u),i&&(h.uv=Ze.getInterpolatedAttribute(i,a,l,c,u,new K)),s&&(h.uv1=Ze.getInterpolatedAttribute(s,a,l,c,u,new K)),o&&(h.normal=Ze.getInterpolatedAttribute(o,a,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new C,materialIndex:0};Ze.getNormal(ko,Ho,Vo,d.normal),h.face=d,h.barycoord=u}return h}class xt extends Gt{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,s,0),m("z","y","x",1,-1,n,e,-t,o,s,1),m("x","z","y",1,1,t,n,e,i,o,2),m("x","z","y",1,-1,t,n,-e,i,o,3),m("x","y","z",1,-1,t,e,n,i,s,4),m("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(h,3)),this.setAttribute("uv",new Tt(u,2));function m(v,g,p,x,_,y,P,T,E,R,b){const M=y/E,I=P/R,B=y/2,N=P/2,z=T/2,q=E+1,W=R+1;let nt=0,X=0;const ct=new C;for(let dt=0;dt<W;dt++){const mt=dt*I-N;for(let Ot=0;Ot<q;Ot++){const oe=Ot*M-B;ct[v]=oe*x,ct[g]=mt*_,ct[p]=z,c.push(ct.x,ct.y,ct.z),ct[v]=0,ct[g]=0,ct[p]=T>0?1:-1,h.push(ct.x,ct.y,ct.z),u.push(Ot/E),u.push(1-dt/R),nt+=1}}for(let dt=0;dt<R;dt++)for(let mt=0;mt<E;mt++){const Ot=d+mt+q*dt,oe=d+mt+q*(dt+1),Q=d+(mt+1)+q*(dt+1),ot=d+(mt+1)+q*dt;l.push(Ot,oe,ot),l.push(oe,Q,ot),X+=6}a.addGroup(f,X,b),f+=X,d+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function gs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ke(r){const t={};for(let e=0;e<r.length;e++){const n=gs(r[e]);for(const i in n)t[i]=n[i]}return t}function wm(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function bu(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const wu={clone:gs,merge:ke};var Tm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Em=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class He extends De{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tm,this.fragmentShader=Em,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gs(t.uniforms),this.uniformsGroups=wm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Yo extends ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=En}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ci=new C,Tu=new K,Eu=new K;class Te extends Yo{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ns*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ti*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ns*2*Math.atan(Math.tan(Ti*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ci.x,ci.y).multiplyScalar(-t/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-t/ci.z)}getViewSize(t,e){return this.getViewBounds(t,Tu,Eu),e.subVectors(Eu,Tu)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ti*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const vs=-90,ys=1;class Au extends ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Te(vs,ys,t,e);i.layers=this.layers,this.add(i);const s=new Te(vs,ys,t,e);s.layers=this.layers,this.add(s);const o=new Te(vs,ys,t,e);o.layers=this.layers,this.add(o);const a=new Te(vs,ys,t,e);a.layers=this.layers,this.add(a);const l=new Te(vs,ys,t,e);l.layers=this.layers,this.add(l);const c=new Te(vs,ys,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===En)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===$s)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class sr extends ve{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Nn,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Cu extends Ye{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new sr(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:de}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new xt(5,5,5),s=new He({name:"CubemapFromEquirect",uniforms:gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:Un});s.uniforms.tEquirect.value=e;const o=new J(i,s),a=e.minFilter;return e.minFilter===bn&&(e.minFilter=de),new Au(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const Hl=new C,Am=new C,Cm=new Vt;class hi{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Hl.subVectors(n,e).cross(Am.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Hl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Cm.getNormalMatrix(t),i=this.coplanarPoint(Hl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new Ie,qo=new C;class rr{constructor(t=new hi,e=new hi,n=new hi,i=new hi,s=new hi,o=new hi){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=En){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],v=i[10],g=i[11],p=i[12],x=i[13],_=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,g-f,y-p).normalize(),n[1].setComponents(l+s,d+c,g+f,y+p).normalize(),n[2].setComponents(l+o,d+h,g+m,y+x).normalize(),n[3].setComponents(l-o,d-h,g-m,y-x).normalize(),n[4].setComponents(l-a,d-u,g-v,y-_).normalize(),e===En)n[5].setComponents(l+a,d+u,g+v,y+_).normalize();else if(e===$s)n[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(t){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(qo.x=i.normal.x>0?t.max.x:t.min.x,qo.y=i.normal.y>0?t.max.y:t.min.y,qo.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(qo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ru(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Rm(r){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],v=u[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const v=u[f];r.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class Yn extends Gt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const x=p*d-o;for(let _=0;_<c;_++){const y=_*u-s;m.push(y,-x,0),v.push(0,0,1),g.push(_/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const _=x+c*p,y=x+c*(p+1),P=x+1+c*(p+1),T=x+1+c*p;f.push(_,y,T),f.push(y,P,T)}this.setIndex(f),this.setAttribute("position",new Tt(m,3)),this.setAttribute("normal",new Tt(v,3)),this.setAttribute("uv",new Tt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Pm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Im=`#ifdef USE_ALPHAHASH
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
#endif`,Lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Um=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nm=`#ifdef USE_AOMAP
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
#endif`,Bm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Om=`#ifdef USE_BATCHING
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
#endif`,zm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,km=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gm=`#ifdef USE_IRIDESCENCE
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
#endif`,Wm=`#ifdef USE_BUMPMAP
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
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$m=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Km=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,jm=`#define PI 3.141592653589793
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
} // validated`,tg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,eg=`vec3 transformedNormal = objectNormal;
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
#endif`,ng=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ig=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,og="gl_FragColor = linearToOutputTexel( gl_FragColor );",ag=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lg=`#ifdef USE_ENVMAP
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
#endif`,cg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hg=`#ifdef USE_ENVMAP
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
#endif`,ug=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dg=`#ifdef USE_ENVMAP
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
#endif`,fg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vg=`#ifdef USE_GRADIENTMAP
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
}`,yg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mg=`uniform bool receiveShadow;
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
#endif`,Sg=`#ifdef USE_ENVMAP
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
#endif`,bg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ag=`PhysicalMaterial material;
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
#endif`,Cg=`struct PhysicalMaterial {
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
}`,Rg=`
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
#endif`,Pg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ig=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ug=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ng=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Og=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zg=`#if defined( USE_POINTS_UV )
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
#endif`,kg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xg=`#ifdef USE_MORPHTARGETS
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
#endif`,Yg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qg=`#ifdef USE_NORMALMAP
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
#endif`,jg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,t0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,e0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,n0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,r0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,l0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,c0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,d0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,f0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,p0=`float getShadowMask() {
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
}`,m0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g0=`#ifdef USE_SKINNING
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
#endif`,v0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,y0=`#ifdef USE_SKINNING
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
#endif`,x0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,M0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,b0=`#ifdef USE_TRANSMISSION
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
#endif`,w0=`#ifdef USE_TRANSMISSION
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
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,C0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xt={alphahash_fragment:Pm,alphahash_pars_fragment:Im,alphamap_fragment:Lm,alphamap_pars_fragment:Dm,alphatest_fragment:Um,alphatest_pars_fragment:Fm,aomap_fragment:Nm,aomap_pars_fragment:Bm,batching_pars_vertex:Om,batching_vertex:zm,begin_vertex:km,beginnormal_vertex:Hm,bsdfs:Vm,iridescence_fragment:Gm,bumpmap_pars_fragment:Wm,clipping_planes_fragment:Xm,clipping_planes_pars_fragment:Ym,clipping_planes_pars_vertex:qm,clipping_planes_vertex:Zm,color_fragment:$m,color_pars_fragment:Km,color_pars_vertex:Jm,color_vertex:Qm,common:jm,cube_uv_reflection_fragment:tg,defaultnormal_vertex:eg,displacementmap_pars_vertex:ng,displacementmap_vertex:ig,emissivemap_fragment:sg,emissivemap_pars_fragment:rg,colorspace_fragment:og,colorspace_pars_fragment:ag,envmap_fragment:lg,envmap_common_pars_fragment:cg,envmap_pars_fragment:hg,envmap_pars_vertex:ug,envmap_physical_pars_fragment:Sg,envmap_vertex:dg,fog_vertex:fg,fog_pars_vertex:pg,fog_fragment:mg,fog_pars_fragment:gg,gradientmap_pars_fragment:vg,lightmap_pars_fragment:yg,lights_lambert_fragment:xg,lights_lambert_pars_fragment:_g,lights_pars_begin:Mg,lights_toon_fragment:bg,lights_toon_pars_fragment:wg,lights_phong_fragment:Tg,lights_phong_pars_fragment:Eg,lights_physical_fragment:Ag,lights_physical_pars_fragment:Cg,lights_fragment_begin:Rg,lights_fragment_maps:Pg,lights_fragment_end:Ig,logdepthbuf_fragment:Lg,logdepthbuf_pars_fragment:Dg,logdepthbuf_pars_vertex:Ug,logdepthbuf_vertex:Fg,map_fragment:Ng,map_pars_fragment:Bg,map_particle_fragment:Og,map_particle_pars_fragment:zg,metalnessmap_fragment:kg,metalnessmap_pars_fragment:Hg,morphinstance_vertex:Vg,morphcolor_vertex:Gg,morphnormal_vertex:Wg,morphtarget_pars_vertex:Xg,morphtarget_vertex:Yg,normal_fragment_begin:qg,normal_fragment_maps:Zg,normal_pars_fragment:$g,normal_pars_vertex:Kg,normal_vertex:Jg,normalmap_pars_fragment:Qg,clearcoat_normal_fragment_begin:jg,clearcoat_normal_fragment_maps:t0,clearcoat_pars_fragment:e0,iridescence_pars_fragment:n0,opaque_fragment:i0,packing:s0,premultiplied_alpha_fragment:r0,project_vertex:o0,dithering_fragment:a0,dithering_pars_fragment:l0,roughnessmap_fragment:c0,roughnessmap_pars_fragment:h0,shadowmap_pars_fragment:u0,shadowmap_pars_vertex:d0,shadowmap_vertex:f0,shadowmask_pars_fragment:p0,skinbase_vertex:m0,skinning_pars_vertex:g0,skinning_vertex:v0,skinnormal_vertex:y0,specularmap_fragment:x0,specularmap_pars_fragment:_0,tonemapping_fragment:M0,tonemapping_pars_fragment:S0,transmission_fragment:b0,transmission_pars_fragment:w0,uv_pars_fragment:T0,uv_pars_vertex:E0,uv_vertex:A0,worldpos_vertex:C0,background_vert:`varying vec2 vUv;
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
}`},ut={common:{diffuse:{value:new G(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new G(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new G(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},pn={basic:{uniforms:ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new G(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:ke([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new G(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:ke([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new G(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:ke([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:ke([ut.points,ut.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:ke([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:ke([ut.common,ut.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:ke([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:ke([ut.sprite,ut.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:ke([ut.common,ut.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:ke([ut.lights,ut.fog,{color:{value:new G(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};pn.physical={uniforms:ke([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new G(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new G(0)},specularColor:{value:new G(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const Zo={r:0,b:0,g:0},Ii=new en,R0=new Ut;function P0(r,t,e,n,i,s,o){const a=new G(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function m(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?e:t).get(_)),_}function v(x){let _=!1;const y=m(x);y===null?p(a,l):y&&y.isColor&&(p(y,1),_=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(x,_){const y=m(_);y&&(y.isCubeTexture||y.mapping===ji)?(h===void 0&&(h=new J(new xt(1,1,1),new He({name:"BackgroundCubeMaterial",uniforms:gs(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ii.copy(_.backgroundRotation),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(R0.makeRotationFromEuler(Ii)),h.material.toneMapped=Qt.getTransfer(y.colorSpace)!==ce,(u!==y||d!==y.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new J(new Yn(2,2),new He({name:"BackgroundMaterial",uniforms:gs(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(y.colorSpace)!==ce,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,_){x.getRGB(Zo,bu(r)),n.buffers.color.setClear(Zo.r,Zo.g,Zo.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:v,addToRenderList:g}}function I0(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(M,I,B,N,z){let q=!1;const W=u(N,B,I);s!==W&&(s=W,c(s.object)),q=f(M,N,B,z),q&&m(M,N,B,z),z!==null&&t.update(z,r.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,y(M,I,B,N),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,I,B){const N=B.wireframe===!0;let z=n[M.id];z===void 0&&(z={},n[M.id]=z);let q=z[I.id];q===void 0&&(q={},z[I.id]=q);let W=q[N];return W===void 0&&(W=d(l()),q[N]=W),W}function d(M){const I=[],B=[],N=[];for(let z=0;z<e;z++)I[z]=0,B[z]=0,N[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:N,object:M,attributes:{},index:null}}function f(M,I,B,N){const z=s.attributes,q=I.attributes;let W=0;const nt=B.getAttributes();for(const X in nt)if(nt[X].location>=0){const dt=z[X];let mt=q[X];if(mt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor)),dt===void 0||dt.attribute!==mt||mt&&dt.data!==mt.data)return!0;W++}return s.attributesNum!==W||s.index!==N}function m(M,I,B,N){const z={},q=I.attributes;let W=0;const nt=B.getAttributes();for(const X in nt)if(nt[X].location>=0){let dt=q[X];dt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(dt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(dt=M.instanceColor));const mt={};mt.attribute=dt,dt&&dt.data&&(mt.data=dt.data),z[X]=mt,W++}s.attributes=z,s.attributesNum=W,s.index=N}function v(){const M=s.newAttributes;for(let I=0,B=M.length;I<B;I++)M[I]=0}function g(M){p(M,0)}function p(M,I){const B=s.newAttributes,N=s.enabledAttributes,z=s.attributeDivisors;B[M]=1,N[M]===0&&(r.enableVertexAttribArray(M),N[M]=1),z[M]!==I&&(r.vertexAttribDivisor(M,I),z[M]=I)}function x(){const M=s.newAttributes,I=s.enabledAttributes;for(let B=0,N=I.length;B<N;B++)I[B]!==M[B]&&(r.disableVertexAttribArray(B),I[B]=0)}function _(M,I,B,N,z,q,W){W===!0?r.vertexAttribIPointer(M,I,B,z,q):r.vertexAttribPointer(M,I,B,N,z,q)}function y(M,I,B,N){v();const z=N.attributes,q=B.getAttributes(),W=I.defaultAttributeValues;for(const nt in q){const X=q[nt];if(X.location>=0){let ct=z[nt];if(ct===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),ct!==void 0){const dt=ct.normalized,mt=ct.itemSize,Ot=t.get(ct);if(Ot===void 0)continue;const oe=Ot.buffer,Q=Ot.type,ot=Ot.bytesPerElement,Et=Q===r.INT||Q===r.UNSIGNED_INT||ct.gpuType===Yr;if(ct.isInterleavedBufferAttribute){const lt=ct.data,Dt=lt.stride,kt=ct.offset;if(lt.isInstancedInterleavedBuffer){for(let Bt=0;Bt<X.locationSize;Bt++)p(X.location+Bt,lt.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Bt=0;Bt<X.locationSize;Bt++)g(X.location+Bt);r.bindBuffer(r.ARRAY_BUFFER,oe);for(let Bt=0;Bt<X.locationSize;Bt++)_(X.location+Bt,mt/X.locationSize,Q,dt,Dt*ot,(kt+mt/X.locationSize*Bt)*ot,Et)}else{if(ct.isInstancedBufferAttribute){for(let lt=0;lt<X.locationSize;lt++)p(X.location+lt,ct.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let lt=0;lt<X.locationSize;lt++)g(X.location+lt);r.bindBuffer(r.ARRAY_BUFFER,oe);for(let lt=0;lt<X.locationSize;lt++)_(X.location+lt,mt/X.locationSize,Q,dt,mt*ot,mt/X.locationSize*lt*ot,Et)}}else if(W!==void 0){const dt=W[nt];if(dt!==void 0)switch(dt.length){case 2:r.vertexAttrib2fv(X.location,dt);break;case 3:r.vertexAttrib3fv(X.location,dt);break;case 4:r.vertexAttrib4fv(X.location,dt);break;default:r.vertexAttrib1fv(X.location,dt)}}}}x()}function P(){R();for(const M in n){const I=n[M];for(const B in I){const N=I[B];for(const z in N)h(N[z].object),delete N[z];delete I[B]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const B in I){const N=I[B];for(const z in N)h(N[z].object),delete N[z];delete I[B]}delete n[M.id]}function E(M){for(const I in n){const B=n[I];if(B[M.id]===void 0)continue;const N=B[M.id];for(const z in N)h(N[z].object),delete N[z];delete B[M.id]}}function R(){b(),o=!0,s!==i&&(s=i,c(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function L0(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*d[v];e.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function D0(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==Ce&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===Bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==wn&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Xe&&!R)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),_=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:P,maxSamples:T}}function U0(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new hi,a=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):c();else{const x=s?0:n,_=x*4;let y=p.clippingState||null;l.value=y,y=h(m,d,_,f);for(let P=0;P!==_;++P)y[P]=e[P];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,y=f;_!==v;++_,y+=4)o.copy(u[_]).applyMatrix4(x,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function F0(r){let t=new WeakMap;function e(o,a){return a===Us?o.mapping=Nn:a===Fs&&(o.mapping=ni),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Us||a===Fs)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Cu(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class or extends Yo{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const xs=4,Pu=[.125,.215,.35,.446,.526,.582],Li=20,Vl=new or,Iu=new G;let Gl=null,Wl=0,Xl=0,Yl=!1;const Di=(1+Math.sqrt(5))/2,_s=1/Di,Lu=[new C(-Di,_s,0),new C(Di,_s,0),new C(-_s,0,Di),new C(_s,0,Di),new C(0,Di,-_s),new C(0,Di,_s),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class ql{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Gl=this._renderer.getRenderTarget(),Wl=this._renderer.getActiveCubeFace(),Xl=this._renderer.getActiveMipmapLevel(),Yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Gl,Wl,Xl),this._renderer.xr.enabled=Yl,t.scissorTest=!1,$o(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Nn||t.mapping===ni?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Gl=this._renderer.getRenderTarget(),Wl=this._renderer.getActiveCubeFace(),Xl=this._renderer.getActiveMipmapLevel(),Yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:de,minFilter:de,generateMipmaps:!1,type:Bn,format:Ce,colorSpace:bi,depthBuffer:!1},i=Du(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Du(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=N0(s)),this._blurMaterial=B0(s,t,e)}return i}_compileMaterial(t){const e=new J(this._lodPlanes[0],t);this._renderer.compile(e,Vl)}_sceneToCubeUV(t,e,n,i){const a=new Te(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Iu),h.toneMapping=Fn,h.autoClear=!1;const f=new fn({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),m=new J(new xt,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(Iu),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;$o(i,x*_,p>2?_:0,_,_),h.setRenderTarget(i),v&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Nn||t.mapping===ni;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uu());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new J(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;$o(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Vl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Lu[(i-s-1)%Lu.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new J(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Li-1),v=s/m,g=isFinite(s)?1+Math.floor(h*v):Li;g>Li&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Li}`);const p=[];let x=0;for(let E=0;E<Li;++E){const R=E/v,b=Math.exp(-R*R/2);p.push(b),E===0?x+=b:E<g&&(x+=2*b)}for(let E=0;E<p.length;E++)p[E]=p[E]/x;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;const y=this._sizeLods[i],P=3*y*(i>_-xs?i-_+xs:0),T=4*(this._cubeSize-y);$o(e,P,T,3*y,2*y),l.setRenderTarget(e),l.render(u,Vl)}}function N0(r){const t=[],e=[],n=[];let i=r;const s=r-xs+1+Pu.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-xs?l=Pu[o-r+xs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,v=3,g=2,p=1,x=new Float32Array(v*m*f),_=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,R=T>2?0:-1,b=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];x.set(b,v*m*T),_.set(d,g*m*T);const M=[T,T,T,T,T,T];y.set(M,p*m*T)}const P=new Gt;P.setAttribute("position",new ne(x,v)),P.setAttribute("uv",new ne(_,g)),P.setAttribute("faceIndex",new ne(y,p)),t.push(P),i>xs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Du(r,t,e){const n=new Ye(r,t,e);return n.texture.mapping=ji,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $o(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function B0(r,t,e){const n=new Float32Array(Li),i=new C(0,1,0);return new He({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Zl(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Uu(){return new He({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Fu(){return new He({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Zl(){return`

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
	`}function O0(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Us||l===Fs,h=l===Nn||l===ni;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new ql(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new ql(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function z0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Qs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function k0(r,t,e,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const v=d.morphAttributes[m];for(let g=0,p=v.length;g<p;g++)t.remove(v[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)t.update(d[m],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const v=f[m];for(let g=0,p=v.length;g<p;g++)t.update(v[g],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,m=u.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let _=0,y=x.length;_<y;_+=3){const P=x[_+0],T=x[_+1],E=x[_+2];d.push(P,T,T,E,E,P)}}else if(m!==void 0){const x=m.array;v=m.version;for(let _=0,y=x.length/3-1;_<y;_+=3){const P=_+0,T=_+1,E=_+2;d.push(P,T,T,E,E,P)}}else return;const g=new(tu(d)?Ol:Bl)(d,1);g.version=v;const p=s.get(u);p&&t.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function H0(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*o),e.update(f,n,1)}function c(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,m);let p=0;for(let x=0;x<m;x++)p+=f[x]*v[x];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function V0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function G0(r,t,e){const n=new WeakMap,i=new Kt;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let _=0;f===!0&&(_=1),m===!0&&(_=2),v===!0&&(_=3);let y=a.attributes.position.count*_,P=1;y>t.maxTextureSize&&(P=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const T=new Float32Array(y*P*4*u),E=new Co(T,y,P,u);E.type=Xe,E.needsUpdate=!0;const R=_*4;for(let M=0;M<u;M++){const I=g[M],B=p[M],N=x[M],z=y*P*4*M;for(let q=0;q<I.count;q++){const W=q*R;f===!0&&(i.fromBufferAttribute(I,q),T[z+W+0]=i.x,T[z+W+1]=i.y,T[z+W+2]=i.z,T[z+W+3]=0),m===!0&&(i.fromBufferAttribute(B,q),T[z+W+4]=i.x,T[z+W+5]=i.y,T[z+W+6]=i.z,T[z+W+7]=0),v===!0&&(i.fromBufferAttribute(N,q),T[z+W+8]=i.x,T[z+W+9]=i.y,T[z+W+10]=i.z,T[z+W+11]=N.itemSize===4?i.w:1)}}d={count:u,texture:E,size:new K(y,P)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function W0(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Ko extends ve{constructor(t,e,n,i,s,o,a,l,c,h=xi){if(h!==xi&&h!==_i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===xi&&(n=Tn),n===void 0&&h===_i&&(n=yi),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:we,this.minFilter=l!==void 0?l:we,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Nu=new ve,Bu=new Ko(1,1),Ou=new Co,zu=new Ml,ku=new sr,Hu=[],Vu=[],Gu=new Float32Array(16),Wu=new Float32Array(9),Xu=new Float32Array(4);function Ms(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Hu[i];if(s===void 0&&(s=new Float32Array(i),Hu[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Ee(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ae(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Jo(r,t){let e=Vu[t];e===void 0&&(e=new Int32Array(t),Vu[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function X0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Y0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2fv(this.addr,t),Ae(e,t)}}function q0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;r.uniform3fv(this.addr,t),Ae(e,t)}}function Z0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4fv(this.addr,t),Ae(e,t)}}function $0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Ee(e,n))return;Xu.set(n),r.uniformMatrix2fv(this.addr,!1,Xu),Ae(e,n)}}function K0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Ee(e,n))return;Wu.set(n),r.uniformMatrix3fv(this.addr,!1,Wu),Ae(e,n)}}function J0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Ee(e,n))return;Gu.set(n),r.uniformMatrix4fv(this.addr,!1,Gu),Ae(e,n)}}function Q0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function j0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2iv(this.addr,t),Ae(e,t)}}function tv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;r.uniform3iv(this.addr,t),Ae(e,t)}}function ev(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4iv(this.addr,t),Ae(e,t)}}function nv(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function iv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2uiv(this.addr,t),Ae(e,t)}}function sv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;r.uniform3uiv(this.addr,t),Ae(e,t)}}function rv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4uiv(this.addr,t),Ae(e,t)}}function ov(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Bu.compareFunction=gl,s=Bu):s=Nu,e.setTexture2D(t||s,i)}function av(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||zu,i)}function lv(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||ku,i)}function cv(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Ou,i)}function hv(r){switch(r){case 5126:return X0;case 35664:return Y0;case 35665:return q0;case 35666:return Z0;case 35674:return $0;case 35675:return K0;case 35676:return J0;case 5124:case 35670:return Q0;case 35667:case 35671:return j0;case 35668:case 35672:return tv;case 35669:case 35673:return ev;case 5125:return nv;case 36294:return iv;case 36295:return sv;case 36296:return rv;case 35678:case 36198:case 36298:case 36306:case 35682:return ov;case 35679:case 36299:case 36307:return av;case 35680:case 36300:case 36308:case 36293:return lv;case 36289:case 36303:case 36311:case 36292:return cv}}function uv(r,t){r.uniform1fv(this.addr,t)}function dv(r,t){const e=Ms(t,this.size,2);r.uniform2fv(this.addr,e)}function fv(r,t){const e=Ms(t,this.size,3);r.uniform3fv(this.addr,e)}function pv(r,t){const e=Ms(t,this.size,4);r.uniform4fv(this.addr,e)}function mv(r,t){const e=Ms(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function gv(r,t){const e=Ms(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function vv(r,t){const e=Ms(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function yv(r,t){r.uniform1iv(this.addr,t)}function xv(r,t){r.uniform2iv(this.addr,t)}function _v(r,t){r.uniform3iv(this.addr,t)}function Mv(r,t){r.uniform4iv(this.addr,t)}function Sv(r,t){r.uniform1uiv(this.addr,t)}function bv(r,t){r.uniform2uiv(this.addr,t)}function wv(r,t){r.uniform3uiv(this.addr,t)}function Tv(r,t){r.uniform4uiv(this.addr,t)}function Ev(r,t,e){const n=this.cache,i=t.length,s=Jo(e,i);Ee(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Nu,s[o])}function Av(r,t,e){const n=this.cache,i=t.length,s=Jo(e,i);Ee(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||zu,s[o])}function Cv(r,t,e){const n=this.cache,i=t.length,s=Jo(e,i);Ee(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||ku,s[o])}function Rv(r,t,e){const n=this.cache,i=t.length,s=Jo(e,i);Ee(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Ou,s[o])}function Pv(r){switch(r){case 5126:return uv;case 35664:return dv;case 35665:return fv;case 35666:return pv;case 35674:return mv;case 35675:return gv;case 35676:return vv;case 5124:case 35670:return yv;case 35667:case 35671:return xv;case 35668:case 35672:return _v;case 35669:case 35673:return Mv;case 5125:return Sv;case 36294:return bv;case 36295:return wv;case 36296:return Tv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return Av;case 35680:case 36300:case 36308:case 36293:return Cv;case 36289:case 36303:case 36311:case 36292:return Rv}}class Iv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=hv(e.type)}}class Lv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Pv(e.type)}}class Dv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const $l=/(\w+)(\])?(\[|\.)?/g;function Yu(r,t){r.seq.push(t),r.map[t.id]=t}function Uv(r,t,e){const n=r.name,i=n.length;for($l.lastIndex=0;;){const s=$l.exec(n),o=$l.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Yu(e,c===void 0?new Iv(a,r,t):new Lv(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new Dv(a),Yu(e,u)),e=u}}}class Qo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Uv(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function qu(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const Fv=37297;let Nv=0;function Bv(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Zu=new Vt;function Ov(r){Qt._getMatrix(Zu,Qt.workingColorSpace,r);const t=`mat3( ${Zu.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(r)){case qs:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function $u(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Bv(r.getShaderSource(t),o)}else return i}function zv(r,t){const e=Ov(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function kv(r,t){let e;switch(t){case Lh:e="Linear";break;case Dh:e="Reinhard";break;case Uh:e="Cineon";break;case Fh:e="ACESFilmic";break;case Bh:e="AgX";break;case Oh:e="Neutral";break;case Nh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const jo=new C;function Hv(){Qt.getLuminanceCoefficients(jo);const r=jo.x.toFixed(4),t=jo.y.toFixed(4),e=jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vv(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function Gv(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Wv(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ar(r){return r!==""}function Ku(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ju(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Xv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kl(r){return r.replace(Xv,qv)}const Yv=new Map;function qv(r,t){let e=Xt[t];if(e===void 0){const n=Yv.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Kl(e)}const Zv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qu(r){return r.replace(Zv,$v)}function $v(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function ju(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Kv(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===ja?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===tl?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Mn&&(t="SHADOWMAP_TYPE_VSM"),t}function Jv(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Nn:case ni:t="ENVMAP_TYPE_CUBE";break;case ji:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Qv(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ni:t="ENVMAP_MODE_REFRACTION";break}return t}function jv(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ds:t="ENVMAP_BLENDING_MULTIPLY";break;case Ph:t="ENVMAP_BLENDING_MIX";break;case Ih:t="ENVMAP_BLENDING_ADD";break}return t}function ty(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function ey(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Kv(e),c=Jv(e),h=Qv(e),u=jv(e),d=ty(e),f=Vv(e),m=Gv(s),v=i.createProgram();let g,p,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ar).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ar).join(`
`),p.length>0&&(p+=`
`)):(g=[ju(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),p=[ju(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Fn?"#define TONE_MAPPING":"",e.toneMapping!==Fn?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Fn?kv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,zv("linearToOutputTexel",e.outputColorSpace),Hv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ar).join(`
`)),o=Kl(o),o=Ku(o,e),o=Ju(o,e),a=Kl(a),a=Ku(a,e),a=Ju(a,e),o=Qu(o),a=Qu(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===vl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===vl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=x+g+o,y=x+p+a,P=qu(i,i.VERTEX_SHADER,_),T=qu(i,i.FRAGMENT_SHADER,y);i.attachShader(v,P),i.attachShader(v,T),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function E(I){if(r.debug.checkShaderErrors){const B=i.getProgramInfoLog(v).trim(),N=i.getShaderInfoLog(P).trim(),z=i.getShaderInfoLog(T).trim();let q=!0,W=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,P,T);else{const nt=$u(i,P,"vertex"),X=$u(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+nt+`
`+X)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(N===""||z==="")&&(W=!1);W&&(I.diagnostics={runnable:q,programLog:B,vertexShader:{log:N,prefix:g},fragmentShader:{log:z,prefix:p}})}i.deleteShader(P),i.deleteShader(T),R=new Qo(i,v),b=Wv(i,v)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,Fv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Nv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=T,this}let ny=0;class iy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new sy(t),e.set(t,n)),n}}class sy{constructor(t){this.id=ny++,this.code=t,this.usedTimes=0}}function ry(r,t,e,n,i,s,o){const a=new Fo,l=new iy,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,I,B,N){const z=B.fog,q=N.geometry,W=b.isMeshStandardMaterial?B.environment:null,nt=(b.isMeshStandardMaterial?e:t).get(b.envMap||W),X=nt&&nt.mapping===ji?nt.image.height:null,ct=m[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const dt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,mt=dt!==void 0?dt.length:0;let Ot=0;q.morphAttributes.position!==void 0&&(Ot=1),q.morphAttributes.normal!==void 0&&(Ot=2),q.morphAttributes.color!==void 0&&(Ot=3);let oe,Q,ot,Et;if(ct){const ue=pn[ct];oe=ue.vertexShader,Q=ue.fragmentShader}else oe=b.vertexShader,Q=b.fragmentShader,l.update(b),ot=l.getVertexShaderID(b),Et=l.getFragmentShaderID(b);const lt=r.getRenderTarget(),Dt=r.state.buffers.depth.getReversed(),kt=N.isInstancedMesh===!0,Bt=N.isBatchedMesh===!0,se=!!b.map,tt=!!b.matcap,rt=!!nt,L=!!b.aoMap,It=!!b.lightMap,it=!!b.bumpMap,St=!!b.normalMap,ht=!!b.displacementMap,Ft=!!b.emissiveMap,_t=!!b.metalnessMap,A=!!b.roughnessMap,S=b.anisotropy>0,O=b.clearcoat>0,Z=b.dispersion>0,et=b.iridescence>0,$=b.sheen>0,At=b.transmission>0,ft=S&&!!b.anisotropyMap,Mt=O&&!!b.clearcoatMap,Jt=O&&!!b.clearcoatNormalMap,st=O&&!!b.clearcoatRoughnessMap,bt=et&&!!b.iridescenceMap,Nt=et&&!!b.iridescenceThicknessMap,zt=$&&!!b.sheenColorMap,wt=$&&!!b.sheenRoughnessMap,te=!!b.specularMap,Zt=!!b.specularColorMap,fe=!!b.specularIntensityMap,D=At&&!!b.transmissionMap,pt=At&&!!b.thicknessMap,Y=!!b.gradientMap,j=!!b.alphaMap,yt=b.alphaTest>0,gt=!!b.alphaHash,Yt=!!b.extensions;let Me=Fn;b.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(Me=r.toneMapping);const Fe={shaderID:ct,shaderType:b.type,shaderName:b.name,vertexShader:oe,fragmentShader:Q,defines:b.defines,customVertexShaderID:ot,customFragmentShaderID:Et,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Bt,batchingColor:Bt&&N._colorsTexture!==null,instancing:kt,instancingColor:kt&&N.instanceColor!==null,instancingMorph:kt&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:lt===null?r.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:bi,alphaToCoverage:!!b.alphaToCoverage,map:se,matcap:tt,envMap:rt,envMapMode:rt&&nt.mapping,envMapCubeUVHeight:X,aoMap:L,lightMap:It,bumpMap:it,normalMap:St,displacementMap:d&&ht,emissiveMap:Ft,normalMapObjectSpace:St&&b.normalMapType===Xh,normalMapTangentSpace:St&&b.normalMapType===ii,metalnessMap:_t,roughnessMap:A,anisotropy:S,anisotropyMap:ft,clearcoat:O,clearcoatMap:Mt,clearcoatNormalMap:Jt,clearcoatRoughnessMap:st,dispersion:Z,iridescence:et,iridescenceMap:bt,iridescenceThicknessMap:Nt,sheen:$,sheenColorMap:zt,sheenRoughnessMap:wt,specularMap:te,specularColorMap:Zt,specularIntensityMap:fe,transmission:At,transmissionMap:D,thicknessMap:pt,gradientMap:Y,opaque:b.transparent===!1&&b.blending===gi&&b.alphaToCoverage===!1,alphaMap:j,alphaTest:yt,alphaHash:gt,combine:b.combine,mapUv:se&&v(b.map.channel),aoMapUv:L&&v(b.aoMap.channel),lightMapUv:It&&v(b.lightMap.channel),bumpMapUv:it&&v(b.bumpMap.channel),normalMapUv:St&&v(b.normalMap.channel),displacementMapUv:ht&&v(b.displacementMap.channel),emissiveMapUv:Ft&&v(b.emissiveMap.channel),metalnessMapUv:_t&&v(b.metalnessMap.channel),roughnessMapUv:A&&v(b.roughnessMap.channel),anisotropyMapUv:ft&&v(b.anisotropyMap.channel),clearcoatMapUv:Mt&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:wt&&v(b.sheenRoughnessMap.channel),specularMapUv:te&&v(b.specularMap.channel),specularColorMapUv:Zt&&v(b.specularColorMap.channel),specularIntensityMapUv:fe&&v(b.specularIntensityMap.channel),transmissionMapUv:D&&v(b.transmissionMap.channel),thicknessMapUv:pt&&v(b.thicknessMap.channel),alphaMapUv:j&&v(b.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(St||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!q.attributes.uv&&(se||j),fog:!!z,useFog:b.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:N.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:Ot,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:Me,decodeVideoTexture:se&&b.map.isVideoTexture===!0&&Qt.getTransfer(b.map.colorSpace)===ce,decodeVideoTextureEmissive:Ft&&b.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(b.emissiveMap.colorSpace)===ce,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Sn,flipSided:b.side===Ne,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Yt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&b.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(x(M,b),_(M,b),M.push(r.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function x(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function _(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function y(b){const M=m[b.type];let I;if(M){const B=pn[M];I=wu.clone(B.uniforms)}else I=b.uniforms;return I}function P(b,M){let I;for(let B=0,N=h.length;B<N;B++){const z=h[B];if(z.cacheKey===M){I=z,++I.usedTimes;break}}return I===void 0&&(I=new ey(r,M,b,s),h.push(I)),I}function T(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function E(b){l.remove(b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:P,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:R}}function oy(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function ay(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function td(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function ed(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,m,v,g){let p=r[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},r[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=v,p.group=g),t++,p}function a(u,d,f,m,v,g){const p=o(u,d,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,m,v,g){const p=o(u,d,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||ay),n.length>1&&n.sort(d||td),i.length>1&&i.sort(d||td)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function ly(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new ed,r.set(n,[o])):i>=s.length?(o=new ed,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function cy(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new G};break;case"SpotLight":e={position:new C,direction:new C,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new G,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new G,groundColor:new G};break;case"RectAreaLight":e={color:new G,position:new C,halfWidth:new C,halfHeight:new C};break}return r[t.id]=e,e}}}function hy(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let uy=0;function dy(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function fy(r){const t=new cy,e=hy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const i=new C,s=new Ut,o=new Ut;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,x=0,_=0,y=0,P=0,T=0,E=0;c.sort(dy);for(let b=0,M=c.length;b<M;b++){const I=c[b],B=I.color,N=I.intensity,z=I.distance,q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=B.r*N,u+=B.g*N,d+=B.b*N;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],N);E++}else if(I.isDirectionalLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const nt=I.shadow,X=e.get(I);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=I.shadow.matrix,x++}n.directional[f]=W,f++}else if(I.isSpotLight){const W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(B).multiplyScalar(N),W.distance=z,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[v]=W;const nt=I.shadow;if(I.map&&(n.spotLightMap[P]=I.map,P++,nt.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[v]=nt.matrix,I.castShadow){const X=e.get(I);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,n.spotShadow[v]=X,n.spotShadowMap[v]=q,y++}v++}else if(I.isRectAreaLight){const W=t.get(I);W.color.copy(B).multiplyScalar(N),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=W,g++}else if(I.isPointLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const nt=I.shadow,X=e.get(I);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,X.shadowCameraNear=nt.camera.near,X.shadowCameraFar=nt.camera.far,n.pointShadow[m]=X,n.pointShadowMap[m]=q,n.pointShadowMatrix[m]=I.shadow.matrix,_++}n.point[m]=W,m++}else if(I.isHemisphereLight){const W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(N),W.groundColor.copy(I.groundColor).multiplyScalar(N),n.hemi[p]=W,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==v||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==x||R.numPointShadows!==_||R.numSpotShadows!==y||R.numSpotMaps!==P||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+P-T,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,R.directionalLength=f,R.pointLength=m,R.spotLength=v,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=x,R.numPointShadows=_,R.numSpotShadows=y,R.numSpotMaps=P,R.numLightProbes=E,n.version=uy++)}function l(c,h){let u=0,d=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const _=c[p];if(_.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(_.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const y=n.rectArea[m];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(_.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(_.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:n}}function nd(r){const t=new fy(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function py(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new nd(r),t.set(i,[a])):s>=o.length?(a=new nd(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Jl extends De{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Gh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ql extends De{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const my=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gy=`uniform sampler2D shadow_pass;
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
}`;function vy(r,t,e){let n=new rr;const i=new K,s=new K,o=new Kt,a=new Jl({depthPacking:Wh}),l=new Ql,c={},h=e.maxTextureSize,u={[Dn]:Ne,[Ne]:Dn,[Sn]:Sn},d=new He({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:my,fragmentShader:gy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Gt;m.setAttribute("position",new ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new J(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ja;let p=this.type;this.render=function(T,E,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const b=r.getRenderTarget(),M=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),B=r.state;B.setBlending(Un),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const N=p!==Mn&&this.type===Mn,z=p===Mn&&this.type!==Mn;for(let q=0,W=T.length;q<W;q++){const nt=T[q],X=nt.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const ct=X.getFrameExtents();if(i.multiply(ct),s.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ct.x),i.x=s.x*ct.x,X.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ct.y),i.y=s.y*ct.y,X.mapSize.y=s.y)),X.map===null||N===!0||z===!0){const mt=this.type!==Mn?{minFilter:we,magFilter:we}:{};X.map!==null&&X.map.dispose(),X.map=new Ye(i.x,i.y,mt),X.map.texture.name=nt.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const dt=X.getViewportCount();for(let mt=0;mt<dt;mt++){const Ot=X.getViewport(mt);o.set(s.x*Ot.x,s.y*Ot.y,s.x*Ot.z,s.y*Ot.w),B.viewport(o),X.updateMatrices(nt,mt),n=X.getFrustum(),y(E,R,X.camera,nt,this.type)}X.isPointLightShadow!==!0&&this.type===Mn&&x(X,R),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(b,M,I)};function x(T,E){const R=t.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ye(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(E,null,R,d,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(E,null,R,f,v,null)}function _(T,E,R,b){let M=null;const I=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=R.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const B=M.uuid,N=E.uuid;let z=c[B];z===void 0&&(z={},c[B]=z);let q=z[N];q===void 0&&(q=M.clone(),z[N]=q,E.addEventListener("dispose",P)),M=q}if(M.visible=E.visible,M.wireframe=E.wireframe,b===Mn?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:u[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=r.properties.get(M);B.light=R}return M}function y(T,E,R,b,M){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Mn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const N=t.update(T),z=T.material;if(Array.isArray(z)){const q=N.groups;for(let W=0,nt=q.length;W<nt;W++){const X=q[W],ct=z[X.materialIndex];if(ct&&ct.visible){const dt=_(T,ct,b,M);T.onBeforeShadow(r,T,E,R,N,dt,X),r.renderBufferDirect(R,null,N,dt,T,X),T.onAfterShadow(r,T,E,R,N,dt,X)}}}else if(z.visible){const q=_(T,z,b,M);T.onBeforeShadow(r,T,E,R,N,q,null),r.renderBufferDirect(R,null,N,q,T,null),T.onAfterShadow(r,T,E,R,N,q,null)}}const B=T.children;for(let N=0,z=B.length;N<z;N++)y(B[N],E,R,b,M)}function P(T){T.target.removeEventListener("dispose",P);for(const R in c){const b=c[R],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const yy={[Or]:zr,[kr]:Gr,[Hr]:Wr,[vi]:Vr,[zr]:Or,[Gr]:kr,[Wr]:Hr,[Vr]:vi};function xy(r,t){function e(){let D=!1;const pt=new Kt;let Y=null;const j=new Kt(0,0,0,0);return{setMask:function(yt){Y!==yt&&!D&&(r.colorMask(yt,yt,yt,yt),Y=yt)},setLocked:function(yt){D=yt},setClear:function(yt,gt,Yt,Me,Fe){Fe===!0&&(yt*=Me,gt*=Me,Yt*=Me),pt.set(yt,gt,Yt,Me),j.equals(pt)===!1&&(r.clearColor(yt,gt,Yt,Me),j.copy(pt))},reset:function(){D=!1,Y=null,j.set(-1,0,0,0)}}}function n(){let D=!1,pt=!1,Y=null,j=null,yt=null;return{setReversed:function(gt){if(pt!==gt){const Yt=t.get("EXT_clip_control");pt?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT);const Me=yt;yt=null,this.setClear(Me)}pt=gt},getReversed:function(){return pt},setTest:function(gt){gt?lt(r.DEPTH_TEST):Dt(r.DEPTH_TEST)},setMask:function(gt){Y!==gt&&!D&&(r.depthMask(gt),Y=gt)},setFunc:function(gt){if(pt&&(gt=yy[gt]),j!==gt){switch(gt){case Or:r.depthFunc(r.NEVER);break;case zr:r.depthFunc(r.ALWAYS);break;case kr:r.depthFunc(r.LESS);break;case vi:r.depthFunc(r.LEQUAL);break;case Hr:r.depthFunc(r.EQUAL);break;case Vr:r.depthFunc(r.GEQUAL);break;case Gr:r.depthFunc(r.GREATER);break;case Wr:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}j=gt}},setLocked:function(gt){D=gt},setClear:function(gt){yt!==gt&&(pt&&(gt=1-gt),r.clearDepth(gt),yt=gt)},reset:function(){D=!1,Y=null,j=null,yt=null,pt=!1}}}function i(){let D=!1,pt=null,Y=null,j=null,yt=null,gt=null,Yt=null,Me=null,Fe=null;return{setTest:function(ue){D||(ue?lt(r.STENCIL_TEST):Dt(r.STENCIL_TEST))},setMask:function(ue){pt!==ue&&!D&&(r.stencilMask(ue),pt=ue)},setFunc:function(ue,xn,jn){(Y!==ue||j!==xn||yt!==jn)&&(r.stencilFunc(ue,xn,jn),Y=ue,j=xn,yt=jn)},setOp:function(ue,xn,jn){(gt!==ue||Yt!==xn||Me!==jn)&&(r.stencilOp(ue,xn,jn),gt=ue,Yt=xn,Me=jn)},setLocked:function(ue){D=ue},setClear:function(ue){Fe!==ue&&(r.clearStencil(ue),Fe=ue)},reset:function(){D=!1,pt=null,Y=null,j=null,yt=null,gt=null,Yt=null,Me=null,Fe=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,x=null,_=null,y=null,P=null,T=null,E=new G(0,0,0),R=0,b=!1,M=null,I=null,B=null,N=null,z=null;const q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,nt=0;const X=r.getParameter(r.VERSION);X.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=nt>=1):X.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=nt>=2);let ct=null,dt={};const mt=r.getParameter(r.SCISSOR_BOX),Ot=r.getParameter(r.VIEWPORT),oe=new Kt().fromArray(mt),Q=new Kt().fromArray(Ot);function ot(D,pt,Y,j){const yt=new Uint8Array(4),gt=r.createTexture();r.bindTexture(D,gt),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Yt=0;Yt<Y;Yt++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(pt,0,r.RGBA,1,1,j,0,r.RGBA,r.UNSIGNED_BYTE,yt):r.texImage2D(pt+Yt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,yt);return gt}const Et={};Et[r.TEXTURE_2D]=ot(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ot(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ot(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ot(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),lt(r.DEPTH_TEST),o.setFunc(vi),it(!1),St(Qa),lt(r.CULL_FACE),L(Un);function lt(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function Dt(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function kt(D,pt){return u[D]!==pt?(r.bindFramebuffer(D,pt),u[D]=pt,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=pt),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=pt),!0):!1}function Bt(D,pt){let Y=f,j=!1;if(D){Y=d.get(pt),Y===void 0&&(Y=[],d.set(pt,Y));const yt=D.textures;if(Y.length!==yt.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let gt=0,Yt=yt.length;gt<Yt;gt++)Y[gt]=r.COLOR_ATTACHMENT0+gt;Y.length=yt.length,j=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,j=!0);j&&r.drawBuffers(Y)}function se(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const tt={[ei]:r.FUNC_ADD,[fh]:r.FUNC_SUBTRACT,[ph]:r.FUNC_REVERSE_SUBTRACT};tt[mh]=r.MIN,tt[gh]=r.MAX;const rt={[vh]:r.ZERO,[yh]:r.ONE,[xh]:r.SRC_COLOR,[Nr]:r.SRC_ALPHA,[Th]:r.SRC_ALPHA_SATURATE,[bh]:r.DST_COLOR,[Mh]:r.DST_ALPHA,[_h]:r.ONE_MINUS_SRC_COLOR,[Br]:r.ONE_MINUS_SRC_ALPHA,[wh]:r.ONE_MINUS_DST_COLOR,[Sh]:r.ONE_MINUS_DST_ALPHA,[Eh]:r.CONSTANT_COLOR,[Ah]:r.ONE_MINUS_CONSTANT_COLOR,[Ch]:r.CONSTANT_ALPHA,[Rh]:r.ONE_MINUS_CONSTANT_ALPHA};function L(D,pt,Y,j,yt,gt,Yt,Me,Fe,ue){if(D===Un){v===!0&&(Dt(r.BLEND),v=!1);return}if(v===!1&&(lt(r.BLEND),v=!0),D!==dh){if(D!==g||ue!==b){if((p!==ei||y!==ei)&&(r.blendEquation(r.FUNC_ADD),p=ei,y=ei),ue)switch(D){case gi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fr:r.blendFunc(r.ONE,r.ONE);break;case el:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case nl:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case gi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fr:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case el:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case nl:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}x=null,_=null,P=null,T=null,E.set(0,0,0),R=0,g=D,b=ue}return}yt=yt||pt,gt=gt||Y,Yt=Yt||j,(pt!==p||yt!==y)&&(r.blendEquationSeparate(tt[pt],tt[yt]),p=pt,y=yt),(Y!==x||j!==_||gt!==P||Yt!==T)&&(r.blendFuncSeparate(rt[Y],rt[j],rt[gt],rt[Yt]),x=Y,_=j,P=gt,T=Yt),(Me.equals(E)===!1||Fe!==R)&&(r.blendColor(Me.r,Me.g,Me.b,Fe),E.copy(Me),R=Fe),g=D,b=!1}function It(D,pt){D.side===Sn?Dt(r.CULL_FACE):lt(r.CULL_FACE);let Y=D.side===Ne;pt&&(Y=!Y),it(Y),D.blending===gi&&D.transparent===!1?L(Un):L(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const j=D.stencilWrite;a.setTest(j),j&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ft(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?lt(r.SAMPLE_ALPHA_TO_COVERAGE):Dt(r.SAMPLE_ALPHA_TO_COVERAGE)}function it(D){M!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),M=D)}function St(D){D!==hh?(lt(r.CULL_FACE),D!==I&&(D===Qa?r.cullFace(r.BACK):D===uh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Dt(r.CULL_FACE),I=D}function ht(D){D!==B&&(W&&r.lineWidth(D),B=D)}function Ft(D,pt,Y){D?(lt(r.POLYGON_OFFSET_FILL),(N!==pt||z!==Y)&&(r.polygonOffset(pt,Y),N=pt,z=Y)):Dt(r.POLYGON_OFFSET_FILL)}function _t(D){D?lt(r.SCISSOR_TEST):Dt(r.SCISSOR_TEST)}function A(D){D===void 0&&(D=r.TEXTURE0+q-1),ct!==D&&(r.activeTexture(D),ct=D)}function S(D,pt,Y){Y===void 0&&(ct===null?Y=r.TEXTURE0+q-1:Y=ct);let j=dt[Y];j===void 0&&(j={type:void 0,texture:void 0},dt[Y]=j),(j.type!==D||j.texture!==pt)&&(ct!==Y&&(r.activeTexture(Y),ct=Y),r.bindTexture(D,pt||Et[D]),j.type=D,j.texture=pt)}function O(){const D=dt[ct];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Z(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ft(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Jt(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function st(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Nt(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function zt(D){oe.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),oe.copy(D))}function wt(D){Q.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),Q.copy(D))}function te(D,pt){let Y=c.get(pt);Y===void 0&&(Y=new WeakMap,c.set(pt,Y));let j=Y.get(D);j===void 0&&(j=r.getUniformBlockIndex(pt,D.name),Y.set(D,j))}function Zt(D,pt){const j=c.get(pt).get(D);l.get(pt)!==j&&(r.uniformBlockBinding(pt,j,D.__bindingPointIndex),l.set(pt,j))}function fe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ct=null,dt={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,x=null,_=null,y=null,P=null,T=null,E=new G(0,0,0),R=0,b=!1,M=null,I=null,B=null,N=null,z=null,oe.set(0,0,r.canvas.width,r.canvas.height),Q.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:lt,disable:Dt,bindFramebuffer:kt,drawBuffers:Bt,useProgram:se,setBlending:L,setMaterial:It,setFlipSided:it,setCullFace:St,setLineWidth:ht,setPolygonOffset:Ft,setScissorTest:_t,activeTexture:A,bindTexture:S,unbindTexture:O,compressedTexImage2D:Z,compressedTexImage3D:et,texImage2D:bt,texImage3D:Nt,updateUBOMapping:te,uniformBlockBinding:Zt,texStorage2D:Jt,texStorage3D:st,texSubImage2D:$,texSubImage3D:At,compressedTexSubImage2D:ft,compressedTexSubImage3D:Mt,scissor:zt,viewport:wt,reset:fe}}function _y(r,t){const e=r.image&&r.image.width?r.image.width/r.image.height:1;return e>t?(r.repeat.x=1,r.repeat.y=e/t,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=t/e,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function My(r,t){const e=r.image&&r.image.width?r.image.width/r.image.height:1;return e>t?(r.repeat.x=t/e,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=e/t,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function Sy(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function jl(r,t,e,n){const i=by(n);switch(e){case ll:return r*t;case hl:return r*t;case ul:return r*t*2;case $r:return r*t/i.components*i.byteLength;case zs:return r*t/i.components*i.byteLength;case dl:return r*t*2/i.components*i.byteLength;case Kr:return r*t*2/i.components*i.byteLength;case cl:return r*t*3/i.components*i.byteLength;case Ce:return r*t*4/i.components*i.byteLength;case Jr:return r*t*4/i.components*i.byteLength;case ks:case Hs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Vs:case Gs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case jr:case eo:return Math.max(r,16)*Math.max(t,8)/4;case Qr:case to:return Math.max(r,8)*Math.max(t,8)/2;case no:case io:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case so:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ro:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case oo:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ao:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case lo:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case co:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ho:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case uo:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case fo:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case po:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case mo:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case go:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case vo:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case yo:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case xo:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Ws:case _o:case Mo:return Math.ceil(r/4)*Math.ceil(t/4)*16;case fl:case So:return Math.ceil(r/4)*Math.ceil(t/4)*8;case bo:case wo:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function by(r){switch(r){case wn:case rl:return{byteLength:1,components:1};case es:case ol:case Bn:return{byteLength:2,components:1};case qr:case Zr:return{byteLength:2,components:4};case Tn:case Yr:case Xe:return{byteLength:4,components:1};case al:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}const wy={contain:_y,cover:My,fill:Sy,getByteLength:jl};function Ty(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new K,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,S){return f?new OffscreenCanvas(A,S):Js("canvas")}function v(A,S,O){let Z=1;const et=_t(A);if((et.width>O||et.height>O)&&(Z=O/Math.max(et.width,et.height)),Z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const $=Math.floor(Z*et.width),At=Math.floor(Z*et.height);u===void 0&&(u=m($,At));const ft=S?m($,At):u;return ft.width=$,ft.height=At,ft.getContext("2d").drawImage(A,0,0,$,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+$+"x"+At+")."),ft}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){r.generateMipmap(A)}function x(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(A,S,O,Z,et=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let $=S;if(S===r.RED&&(O===r.FLOAT&&($=r.R32F),O===r.HALF_FLOAT&&($=r.R16F),O===r.UNSIGNED_BYTE&&($=r.R8)),S===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&($=r.R8UI),O===r.UNSIGNED_SHORT&&($=r.R16UI),O===r.UNSIGNED_INT&&($=r.R32UI),O===r.BYTE&&($=r.R8I),O===r.SHORT&&($=r.R16I),O===r.INT&&($=r.R32I)),S===r.RG&&(O===r.FLOAT&&($=r.RG32F),O===r.HALF_FLOAT&&($=r.RG16F),O===r.UNSIGNED_BYTE&&($=r.RG8)),S===r.RG_INTEGER&&(O===r.UNSIGNED_BYTE&&($=r.RG8UI),O===r.UNSIGNED_SHORT&&($=r.RG16UI),O===r.UNSIGNED_INT&&($=r.RG32UI),O===r.BYTE&&($=r.RG8I),O===r.SHORT&&($=r.RG16I),O===r.INT&&($=r.RG32I)),S===r.RGB_INTEGER&&(O===r.UNSIGNED_BYTE&&($=r.RGB8UI),O===r.UNSIGNED_SHORT&&($=r.RGB16UI),O===r.UNSIGNED_INT&&($=r.RGB32UI),O===r.BYTE&&($=r.RGB8I),O===r.SHORT&&($=r.RGB16I),O===r.INT&&($=r.RGB32I)),S===r.RGBA_INTEGER&&(O===r.UNSIGNED_BYTE&&($=r.RGBA8UI),O===r.UNSIGNED_SHORT&&($=r.RGBA16UI),O===r.UNSIGNED_INT&&($=r.RGBA32UI),O===r.BYTE&&($=r.RGBA8I),O===r.SHORT&&($=r.RGBA16I),O===r.INT&&($=r.RGBA32I)),S===r.RGB&&O===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),S===r.RGBA){const At=et?qs:Qt.getTransfer(Z);O===r.FLOAT&&($=r.RGBA32F),O===r.HALF_FLOAT&&($=r.RGBA16F),O===r.UNSIGNED_BYTE&&($=At===ce?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function y(A,S){let O;return A?S===null||S===Tn||S===yi?O=r.DEPTH24_STENCIL8:S===Xe?O=r.DEPTH32F_STENCIL8:S===es&&(O=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Tn||S===yi?O=r.DEPTH_COMPONENT24:S===Xe?O=r.DEPTH_COMPONENT32F:S===es&&(O=r.DEPTH_COMPONENT16),O}function P(A,S){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==we&&A.minFilter!==de?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function T(A){const S=A.target;S.removeEventListener("dispose",T),R(S),S.isVideoTexture&&h.delete(S)}function E(A){const S=A.target;S.removeEventListener("dispose",E),M(S)}function R(A){const S=n.get(A);if(S.__webglInit===void 0)return;const O=A.source,Z=d.get(O);if(Z){const et=Z[S.__cacheKey];et.usedTimes--,et.usedTimes===0&&b(A),Object.keys(Z).length===0&&d.delete(O)}n.remove(A)}function b(A){const S=n.get(A);r.deleteTexture(S.__webglTexture);const O=A.source,Z=d.get(O);delete Z[S.__cacheKey],o.memory.textures--}function M(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let et=0;et<S.__webglFramebuffer[Z].length;et++)r.deleteFramebuffer(S.__webglFramebuffer[Z][et]);else r.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)r.deleteFramebuffer(S.__webglFramebuffer[Z]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const O=A.textures;for(let Z=0,et=O.length;Z<et;Z++){const $=n.get(O[Z]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(O[Z])}n.remove(A)}let I=0;function B(){I=0}function N(){const A=I;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),I+=1,A}function z(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function q(A,S){const O=n.get(A);if(A.isVideoTexture&&ht(A),A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){const Z=A.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(O,A,S);return}}e.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+S)}function W(A,S){const O=n.get(A);if(A.version>0&&O.__version!==A.version){Q(O,A,S);return}e.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+S)}function nt(A,S){const O=n.get(A);if(A.version>0&&O.__version!==A.version){Q(O,A,S);return}e.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+S)}function X(A,S){const O=n.get(A);if(A.version>0&&O.__version!==A.version){ot(O,A,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+S)}const ct={[Ns]:r.REPEAT,[We]:r.CLAMP_TO_EDGE,[Bs]:r.MIRRORED_REPEAT},dt={[we]:r.NEAREST,[sl]:r.NEAREST_MIPMAP_NEAREST,[ts]:r.NEAREST_MIPMAP_LINEAR,[de]:r.LINEAR,[Os]:r.LINEAR_MIPMAP_NEAREST,[bn]:r.LINEAR_MIPMAP_LINEAR},mt={[Yh]:r.NEVER,[Qh]:r.ALWAYS,[qh]:r.LESS,[gl]:r.LEQUAL,[Zh]:r.EQUAL,[Jh]:r.GEQUAL,[$h]:r.GREATER,[Kh]:r.NOTEQUAL};function Ot(A,S){if(S.type===Xe&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===de||S.magFilter===Os||S.magFilter===ts||S.magFilter===bn||S.minFilter===de||S.minFilter===Os||S.minFilter===ts||S.minFilter===bn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,ct[S.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,ct[S.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,ct[S.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,dt[S.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,dt[S.minFilter]),S.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,mt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===we||S.minFilter!==ts&&S.minFilter!==bn||S.type===Xe&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");r.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function oe(A,S){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",T));const Z=S.source;let et=d.get(Z);et===void 0&&(et={},d.set(Z,et));const $=z(S);if($!==A.__cacheKey){et[$]===void 0&&(et[$]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,O=!0),et[$].usedTimes++;const At=et[A.__cacheKey];At!==void 0&&(et[A.__cacheKey].usedTimes--,At.usedTimes===0&&b(S)),A.__cacheKey=$,A.__webglTexture=et[$].texture}return O}function Q(A,S,O){let Z=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=r.TEXTURE_3D);const et=oe(A,S),$=S.source;e.bindTexture(Z,A.__webglTexture,r.TEXTURE0+O);const At=n.get($);if($.version!==At.__version||et===!0){e.activeTexture(r.TEXTURE0+O);const ft=Qt.getPrimaries(Qt.workingColorSpace),Mt=S.colorSpace===On?null:Qt.getPrimaries(S.colorSpace),Jt=S.colorSpace===On||ft===Mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let st=v(S.image,!1,i.maxTextureSize);st=Ft(S,st);const bt=s.convert(S.format,S.colorSpace),Nt=s.convert(S.type);let zt=_(S.internalFormat,bt,Nt,S.colorSpace,S.isVideoTexture);Ot(Z,S);let wt;const te=S.mipmaps,Zt=S.isVideoTexture!==!0,fe=At.__version===void 0||et===!0,D=$.dataReady,pt=P(S,st);if(S.isDepthTexture)zt=y(S.format===_i,S.type),fe&&(Zt?e.texStorage2D(r.TEXTURE_2D,1,zt,st.width,st.height):e.texImage2D(r.TEXTURE_2D,0,zt,st.width,st.height,0,bt,Nt,null));else if(S.isDataTexture)if(te.length>0){Zt&&fe&&e.texStorage2D(r.TEXTURE_2D,pt,zt,te[0].width,te[0].height);for(let Y=0,j=te.length;Y<j;Y++)wt=te[Y],Zt?D&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,wt.width,wt.height,bt,Nt,wt.data):e.texImage2D(r.TEXTURE_2D,Y,zt,wt.width,wt.height,0,bt,Nt,wt.data);S.generateMipmaps=!1}else Zt?(fe&&e.texStorage2D(r.TEXTURE_2D,pt,zt,st.width,st.height),D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,st.width,st.height,bt,Nt,st.data)):e.texImage2D(r.TEXTURE_2D,0,zt,st.width,st.height,0,bt,Nt,st.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Zt&&fe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,pt,zt,te[0].width,te[0].height,st.depth);for(let Y=0,j=te.length;Y<j;Y++)if(wt=te[Y],S.format!==Ce)if(bt!==null)if(Zt){if(D)if(S.layerUpdates.size>0){const yt=jl(wt.width,wt.height,S.format,S.type);for(const gt of S.layerUpdates){const Yt=wt.data.subarray(gt*yt/wt.data.BYTES_PER_ELEMENT,(gt+1)*yt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,gt,wt.width,wt.height,1,bt,Yt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,wt.width,wt.height,st.depth,bt,wt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,zt,wt.width,wt.height,st.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Zt?D&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,wt.width,wt.height,st.depth,bt,Nt,wt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Y,zt,wt.width,wt.height,st.depth,0,bt,Nt,wt.data)}else{Zt&&fe&&e.texStorage2D(r.TEXTURE_2D,pt,zt,te[0].width,te[0].height);for(let Y=0,j=te.length;Y<j;Y++)wt=te[Y],S.format!==Ce?bt!==null?Zt?D&&e.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,wt.width,wt.height,bt,wt.data):e.compressedTexImage2D(r.TEXTURE_2D,Y,zt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Zt?D&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,wt.width,wt.height,bt,Nt,wt.data):e.texImage2D(r.TEXTURE_2D,Y,zt,wt.width,wt.height,0,bt,Nt,wt.data)}else if(S.isDataArrayTexture)if(Zt){if(fe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,pt,zt,st.width,st.height,st.depth),D)if(S.layerUpdates.size>0){const Y=jl(st.width,st.height,S.format,S.type);for(const j of S.layerUpdates){const yt=st.data.subarray(j*Y/st.data.BYTES_PER_ELEMENT,(j+1)*Y/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,j,st.width,st.height,1,bt,Nt,yt)}S.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,bt,Nt,st.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,zt,st.width,st.height,st.depth,0,bt,Nt,st.data);else if(S.isData3DTexture)Zt?(fe&&e.texStorage3D(r.TEXTURE_3D,pt,zt,st.width,st.height,st.depth),D&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,bt,Nt,st.data)):e.texImage3D(r.TEXTURE_3D,0,zt,st.width,st.height,st.depth,0,bt,Nt,st.data);else if(S.isFramebufferTexture){if(fe)if(Zt)e.texStorage2D(r.TEXTURE_2D,pt,zt,st.width,st.height);else{let Y=st.width,j=st.height;for(let yt=0;yt<pt;yt++)e.texImage2D(r.TEXTURE_2D,yt,zt,Y,j,0,bt,Nt,null),Y>>=1,j>>=1}}else if(te.length>0){if(Zt&&fe){const Y=_t(te[0]);e.texStorage2D(r.TEXTURE_2D,pt,zt,Y.width,Y.height)}for(let Y=0,j=te.length;Y<j;Y++)wt=te[Y],Zt?D&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,bt,Nt,wt):e.texImage2D(r.TEXTURE_2D,Y,zt,bt,Nt,wt);S.generateMipmaps=!1}else if(Zt){if(fe){const Y=_t(st);e.texStorage2D(r.TEXTURE_2D,pt,zt,Y.width,Y.height)}D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,bt,Nt,st)}else e.texImage2D(r.TEXTURE_2D,0,zt,bt,Nt,st);g(S)&&p(Z),At.__version=$.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function ot(A,S,O){if(S.image.length!==6)return;const Z=oe(A,S),et=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+O);const $=n.get(et);if(et.version!==$.__version||Z===!0){e.activeTexture(r.TEXTURE0+O);const At=Qt.getPrimaries(Qt.workingColorSpace),ft=S.colorSpace===On?null:Qt.getPrimaries(S.colorSpace),Mt=S.colorSpace===On||At===ft?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Jt=S.isCompressedTexture||S.image[0].isCompressedTexture,st=S.image[0]&&S.image[0].isDataTexture,bt=[];for(let j=0;j<6;j++)!Jt&&!st?bt[j]=v(S.image[j],!0,i.maxCubemapSize):bt[j]=st?S.image[j].image:S.image[j],bt[j]=Ft(S,bt[j]);const Nt=bt[0],zt=s.convert(S.format,S.colorSpace),wt=s.convert(S.type),te=_(S.internalFormat,zt,wt,S.colorSpace),Zt=S.isVideoTexture!==!0,fe=$.__version===void 0||Z===!0,D=et.dataReady;let pt=P(S,Nt);Ot(r.TEXTURE_CUBE_MAP,S);let Y;if(Jt){Zt&&fe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,pt,te,Nt.width,Nt.height);for(let j=0;j<6;j++){Y=bt[j].mipmaps;for(let yt=0;yt<Y.length;yt++){const gt=Y[yt];S.format!==Ce?zt!==null?Zt?D&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,yt,0,0,gt.width,gt.height,zt,gt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,yt,te,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Zt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,yt,0,0,gt.width,gt.height,zt,wt,gt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,yt,te,gt.width,gt.height,0,zt,wt,gt.data)}}}else{if(Y=S.mipmaps,Zt&&fe){Y.length>0&&pt++;const j=_t(bt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,pt,te,j.width,j.height)}for(let j=0;j<6;j++)if(st){Zt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,bt[j].width,bt[j].height,zt,wt,bt[j].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,te,bt[j].width,bt[j].height,0,zt,wt,bt[j].data);for(let yt=0;yt<Y.length;yt++){const Yt=Y[yt].image[j].image;Zt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,yt+1,0,0,Yt.width,Yt.height,zt,wt,Yt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,yt+1,te,Yt.width,Yt.height,0,zt,wt,Yt.data)}}else{Zt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,zt,wt,bt[j]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,te,zt,wt,bt[j]);for(let yt=0;yt<Y.length;yt++){const gt=Y[yt];Zt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,yt+1,0,0,zt,wt,gt.image[j]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,yt+1,te,zt,wt,gt.image[j])}}}g(S)&&p(r.TEXTURE_CUBE_MAP),$.__version=et.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Et(A,S,O,Z,et,$){const At=s.convert(O.format,O.colorSpace),ft=s.convert(O.type),Mt=_(O.internalFormat,At,ft,O.colorSpace),Jt=n.get(S),st=n.get(O);if(st.__renderTarget=S,!Jt.__hasExternalTextures){const bt=Math.max(1,S.width>>$),Nt=Math.max(1,S.height>>$);et===r.TEXTURE_3D||et===r.TEXTURE_2D_ARRAY?e.texImage3D(et,$,Mt,bt,Nt,S.depth,0,At,ft,null):e.texImage2D(et,$,Mt,bt,Nt,0,At,ft,null)}e.bindFramebuffer(r.FRAMEBUFFER,A),St(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,et,st.__webglTexture,0,it(S)):(et===r.TEXTURE_2D||et>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,et,st.__webglTexture,$),e.bindFramebuffer(r.FRAMEBUFFER,null)}function lt(A,S,O){if(r.bindRenderbuffer(r.RENDERBUFFER,A),S.depthBuffer){const Z=S.depthTexture,et=Z&&Z.isDepthTexture?Z.type:null,$=y(S.stencilBuffer,et),At=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ft=it(S);St(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ft,$,S.width,S.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,ft,$,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,$,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,At,r.RENDERBUFFER,A)}else{const Z=S.textures;for(let et=0;et<Z.length;et++){const $=Z[et],At=s.convert($.format,$.colorSpace),ft=s.convert($.type),Mt=_($.internalFormat,At,ft,$.colorSpace),Jt=it(S);O&&St(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Jt,Mt,S.width,S.height):St(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Jt,Mt,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Mt,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Dt(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(S.depthTexture);Z.__renderTarget=S,(!Z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q(S.depthTexture,0);const et=Z.__webglTexture,$=it(S);if(S.depthTexture.format===xi)St(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,et,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,et,0);else if(S.depthTexture.format===_i)St(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,et,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function kt(A){const S=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const Z=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const et=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",et)};Z.addEventListener("dispose",et),S.__depthDisposeCallback=et}S.__boundDepthTexture=Z}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Dt(S.__webglFramebuffer,A)}else if(O){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=r.createRenderbuffer(),lt(S.__webglDepthbuffer[Z],A,!1);else{const et=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=S.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,et,r.RENDERBUFFER,$)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),lt(S.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,et=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,et),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,et)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Bt(A,S,O){const Z=n.get(A);S!==void 0&&Et(Z.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&kt(A)}function se(A){const S=A.texture,O=n.get(A),Z=n.get(S);A.addEventListener("dispose",E);const et=A.textures,$=A.isWebGLCubeRenderTarget===!0,At=et.length>1;if(At||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=S.version,o.memory.textures++),$){O.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[ft]=[];for(let Mt=0;Mt<S.mipmaps.length;Mt++)O.__webglFramebuffer[ft][Mt]=r.createFramebuffer()}else O.__webglFramebuffer[ft]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let ft=0;ft<S.mipmaps.length;ft++)O.__webglFramebuffer[ft]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(At)for(let ft=0,Mt=et.length;ft<Mt;ft++){const Jt=n.get(et[ft]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=r.createTexture(),o.memory.textures++)}if(A.samples>0&&St(A)===!1){O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ft=0;ft<et.length;ft++){const Mt=et[ft];O.__webglColorRenderbuffer[ft]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[ft]);const Jt=s.convert(Mt.format,Mt.colorSpace),st=s.convert(Mt.type),bt=_(Mt.internalFormat,Jt,st,Mt.colorSpace,A.isXRRenderTarget===!0),Nt=it(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt,bt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,O.__webglColorRenderbuffer[ft])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),lt(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){e.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),Ot(r.TEXTURE_CUBE_MAP,S);for(let ft=0;ft<6;ft++)if(S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)Et(O.__webglFramebuffer[ft][Mt],A,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ft,Mt);else Et(O.__webglFramebuffer[ft],A,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);g(S)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ft=0,Mt=et.length;ft<Mt;ft++){const Jt=et[ft],st=n.get(Jt);e.bindTexture(r.TEXTURE_2D,st.__webglTexture),Ot(r.TEXTURE_2D,Jt),Et(O.__webglFramebuffer,A,Jt,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,0),g(Jt)&&p(r.TEXTURE_2D)}e.unbindTexture()}else{let ft=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ft=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ft,Z.__webglTexture),Ot(ft,S),S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)Et(O.__webglFramebuffer[Mt],A,S,r.COLOR_ATTACHMENT0,ft,Mt);else Et(O.__webglFramebuffer,A,S,r.COLOR_ATTACHMENT0,ft,0);g(S)&&p(ft),e.unbindTexture()}A.depthBuffer&&kt(A)}function tt(A){const S=A.textures;for(let O=0,Z=S.length;O<Z;O++){const et=S[O];if(g(et)){const $=x(A),At=n.get(et).__webglTexture;e.bindTexture($,At),p($),e.unbindTexture()}}}const rt=[],L=[];function It(A){if(A.samples>0){if(St(A)===!1){const S=A.textures,O=A.width,Z=A.height;let et=r.COLOR_BUFFER_BIT;const $=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=n.get(A),ft=S.length>1;if(ft)for(let Mt=0;Mt<S.length;Mt++)e.bindFramebuffer(r.FRAMEBUFFER,At.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,At.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Mt=0;Mt<S.length;Mt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(et|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(et|=r.STENCIL_BUFFER_BIT)),ft){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,At.__webglColorRenderbuffer[Mt]);const Jt=n.get(S[Mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Jt,0)}r.blitFramebuffer(0,0,O,Z,0,0,O,Z,et,r.NEAREST),l===!0&&(rt.length=0,L.length=0,rt.push(r.COLOR_ATTACHMENT0+Mt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(rt.push($),L.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ft)for(let Mt=0;Mt<S.length;Mt++){e.bindFramebuffer(r.FRAMEBUFFER,At.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.RENDERBUFFER,At.__webglColorRenderbuffer[Mt]);const Jt=n.get(S[Mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,At.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.TEXTURE_2D,Jt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function it(A){return Math.min(i.maxSamples,A.samples)}function St(A){const S=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ht(A){const S=o.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function Ft(A,S){const O=A.colorSpace,Z=A.format,et=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==bi&&O!==On&&(Qt.getTransfer(O)===ce?(Z!==Ce||et!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),S}function _t(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=B,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=nt,this.setTextureCube=X,this.rebindTextures=Bt,this.setupRenderTarget=se,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=St}function id(r,t){function e(n,i=On){let s;const o=Qt.getTransfer(i);if(n===wn)return r.UNSIGNED_BYTE;if(n===qr)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Zr)return r.UNSIGNED_SHORT_5_5_5_1;if(n===al)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===rl)return r.BYTE;if(n===ol)return r.SHORT;if(n===es)return r.UNSIGNED_SHORT;if(n===Yr)return r.INT;if(n===Tn)return r.UNSIGNED_INT;if(n===Xe)return r.FLOAT;if(n===Bn)return r.HALF_FLOAT;if(n===ll)return r.ALPHA;if(n===cl)return r.RGB;if(n===Ce)return r.RGBA;if(n===hl)return r.LUMINANCE;if(n===ul)return r.LUMINANCE_ALPHA;if(n===xi)return r.DEPTH_COMPONENT;if(n===_i)return r.DEPTH_STENCIL;if(n===$r)return r.RED;if(n===zs)return r.RED_INTEGER;if(n===dl)return r.RG;if(n===Kr)return r.RG_INTEGER;if(n===Jr)return r.RGBA_INTEGER;if(n===ks||n===Hs||n===Vs||n===Gs)if(o===ce)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ks)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Gs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ks)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Gs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qr||n===jr||n===to||n===eo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Qr)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jr)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===eo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===no||n===io||n===so)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===no||n===io)return o===ce?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===so)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ro||n===oo||n===ao||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===vo||n===yo||n===xo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ro)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ao)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===co)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ho)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===po)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===go)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ws||n===_o||n===Mo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Ws)return o===ce?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_o)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fl||n===So||n===bo||n===wo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ws)return s.COMPRESSED_RED_RGTC1_EXT;if(n===So)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===yi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class sd extends Te{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class jt extends ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ey={type:"move"};class tc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ey)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ay=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cy=`
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

}`;class Ry{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new ve,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new He({vertexShader:Ay,fragmentShader:Cy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new J(new Yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Py extends An{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const v=new Ry,g=e.getContextAttributes();let p=null,x=null;const _=[],y=[],P=new K;let T=null;const E=new Te;E.viewport=new Kt;const R=new Te;R.viewport=new Kt;const b=[E,R],M=new sd;let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ot=_[Q];return ot===void 0&&(ot=new tc,_[Q]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(Q){let ot=_[Q];return ot===void 0&&(ot=new tc,_[Q]=ot),ot.getGripSpace()},this.getHand=function(Q){let ot=_[Q];return ot===void 0&&(ot=new tc,_[Q]=ot),ot.getHandSpace()};function N(Q){const ot=y.indexOf(Q.inputSource);if(ot===-1)return;const Et=_[ot];Et!==void 0&&(Et.update(Q.inputSource,Q.frame,c||o),Et.dispatchEvent({type:Q.type,data:Q.inputSource}))}function z(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",q);for(let Q=0;Q<_.length;Q++){const ot=y[Q];ot!==null&&(y[Q]=null,_[Q].disconnect(ot))}I=null,B=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,x=null,oe.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",z),i.addEventListener("inputsourceschange",q),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(P),i.renderState.layers===void 0){const ot={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,ot),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Ye(f.framebufferWidth,f.framebufferHeight,{format:Ce,type:wn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let ot=null,Et=null,lt=null;g.depth&&(lt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=g.stencil?_i:xi,Et=g.stencil?yi:Tn);const Dt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Dt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new Ye(d.textureWidth,d.textureHeight,{format:Ce,type:wn,depthTexture:new Ko(d.textureWidth,d.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),oe.setContext(i),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q(Q){for(let ot=0;ot<Q.removed.length;ot++){const Et=Q.removed[ot],lt=y.indexOf(Et);lt>=0&&(y[lt]=null,_[lt].disconnect(Et))}for(let ot=0;ot<Q.added.length;ot++){const Et=Q.added[ot];let lt=y.indexOf(Et);if(lt===-1){for(let kt=0;kt<_.length;kt++)if(kt>=y.length){y.push(Et),lt=kt;break}else if(y[kt]===null){y[kt]=Et,lt=kt;break}if(lt===-1)break}const Dt=_[lt];Dt&&Dt.connect(Et)}}const W=new C,nt=new C;function X(Q,ot,Et){W.setFromMatrixPosition(ot.matrixWorld),nt.setFromMatrixPosition(Et.matrixWorld);const lt=W.distanceTo(nt),Dt=ot.projectionMatrix.elements,kt=Et.projectionMatrix.elements,Bt=Dt[14]/(Dt[10]-1),se=Dt[14]/(Dt[10]+1),tt=(Dt[9]+1)/Dt[5],rt=(Dt[9]-1)/Dt[5],L=(Dt[8]-1)/Dt[0],It=(kt[8]+1)/kt[0],it=Bt*L,St=Bt*It,ht=lt/(-L+It),Ft=ht*-L;if(ot.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ft),Q.translateZ(ht),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Dt[10]===-1)Q.projectionMatrix.copy(ot.projectionMatrix),Q.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const _t=Bt+ht,A=se+ht,S=it-Ft,O=St+(lt-Ft),Z=tt*se/A*_t,et=rt*se/A*_t;Q.projectionMatrix.makePerspective(S,O,Z,et,_t,A),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ct(Q,ot){ot===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ot.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let ot=Q.near,Et=Q.far;v.texture!==null&&(v.depthNear>0&&(ot=v.depthNear),v.depthFar>0&&(Et=v.depthFar)),M.near=R.near=E.near=ot,M.far=R.far=E.far=Et,(I!==M.near||B!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,B=M.far),E.layers.mask=Q.layers.mask|2,R.layers.mask=Q.layers.mask|4,M.layers.mask=E.layers.mask|R.layers.mask;const lt=Q.parent,Dt=M.cameras;ct(M,lt);for(let kt=0;kt<Dt.length;kt++)ct(Dt[kt],lt);Dt.length===2?X(M,E,R):M.projectionMatrix.copy(E.projectionMatrix),dt(Q,M,lt)};function dt(Q,ot,Et){Et===null?Q.matrix.copy(ot.matrixWorld):(Q.matrix.copy(Et.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ot.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ot.projectionMatrix),Q.projectionMatrixInverse.copy(ot.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ns*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Q){l=Q,d!==null&&(d.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let mt=null;function Ot(Q,ot){if(h=ot.getViewerPose(c||o),m=ot,h!==null){const Et=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let lt=!1;Et.length!==M.cameras.length&&(M.cameras.length=0,lt=!0);for(let kt=0;kt<Et.length;kt++){const Bt=Et[kt];let se=null;if(f!==null)se=f.getViewport(Bt);else{const rt=u.getViewSubImage(d,Bt);se=rt.viewport,kt===0&&(t.setRenderTargetTextures(x,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(x))}let tt=b[kt];tt===void 0&&(tt=new Te,tt.layers.enable(kt),tt.viewport=new Kt,b[kt]=tt),tt.matrix.fromArray(Bt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(Bt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(se.x,se.y,se.width,se.height),kt===0&&(M.matrix.copy(tt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),lt===!0&&M.cameras.push(tt)}const Dt=i.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const kt=u.getDepthInformation(Et[0]);kt&&kt.isValid&&kt.texture&&v.init(t,kt,i.renderState)}}for(let Et=0;Et<_.length;Et++){const lt=y[Et],Dt=_[Et];lt!==null&&Dt!==void 0&&Dt.update(lt,ot,c||o)}mt&&mt(Q,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),m=null}const oe=new Ru;oe.setAnimationLoop(Ot),this.setAnimationLoop=function(Q){mt=Q},this.dispose=function(){}}}const Ui=new en,Iy=new Ut;function Ly(r,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,bu(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,x,_,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),v(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,x,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ne&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ne&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const x=t.get(p),_=x.envMap,y=x.envMapRotation;_&&(g.envMap.value=_,Ui.copy(y),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),g.envMapRotation.value.setFromMatrix4(Iy.makeRotationFromEuler(Ui)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,x,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*x,g.scale.value=_*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,x){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ne&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const x=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Dy(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,_){const y=_.program;n.uniformBlockBinding(x,y)}function c(x,_){let y=i[x.id];y===void 0&&(m(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",g));const P=_.program;n.updateUBOMapping(x,P);const T=t.render.frame;s[x.id]!==T&&(d(x),s[x.id]=T)}function h(x){const _=u();x.__bindingPointIndex=_;const y=r.createBuffer(),P=x.__size,T=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,P,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,y),y}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const _=i[x.id],y=x.uniforms,P=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let T=0,E=y.length;T<E;T++){const R=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,M=R.length;b<M;b++){const I=R[b];if(f(I,T,b,P)===!0){const B=I.__offset,N=Array.isArray(I.value)?I.value:[I.value];let z=0;for(let q=0;q<N.length;q++){const W=N[q],nt=v(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,r.bufferSubData(r.UNIFORM_BUFFER,B+z,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,z),z+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,B,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,_,y,P){const T=x.value,E=_+"_"+y;if(P[E]===void 0)return typeof T=="number"||typeof T=="boolean"?P[E]=T:P[E]=T.clone(),!0;{const R=P[E];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return P[E]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function m(x){const _=x.uniforms;let y=0;const P=16;for(let E=0,R=_.length;E<R;E++){const b=Array.isArray(_[E])?_[E]:[_[E]];for(let M=0,I=b.length;M<I;M++){const B=b[M],N=Array.isArray(B.value)?B.value:[B.value];for(let z=0,q=N.length;z<q;z++){const W=N[z],nt=v(W),X=y%P,ct=X%nt.boundary,dt=X+ct;y+=ct,dt!==0&&P-dt<nt.storage&&(y+=P-dt),B.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=nt.storage}}}const T=y%P;return T>0&&(y+=P-T),x.__size=y,x.__cache={},this}function v(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function g(x){const _=x.target;_.removeEventListener("dispose",g);const y=o.indexOf(_.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function p(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class rd{constructor(t={}){const{canvas:e=eu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const x=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Be,this.toneMapping=Fn,this.toneMappingExposure=1;const y=this;let P=!1,T=0,E=0,R=null,b=-1,M=null;const I=new Kt,B=new Kt;let N=null;const z=new G(0);let q=0,W=e.width,nt=e.height,X=1,ct=null,dt=null;const mt=new Kt(0,0,W,nt),Ot=new Kt(0,0,W,nt);let oe=!1;const Q=new rr;let ot=!1,Et=!1;const lt=new Ut,Dt=new Ut,kt=new C,Bt=new Kt,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function rt(){return R===null?X:1}let L=n;function It(w,U){return e.getContext(w,U)}try{const w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${on}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),L===null){const U="webgl2";if(L=It(U,w),L===null)throw It(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let it,St,ht,Ft,_t,A,S,O,Z,et,$,At,ft,Mt,Jt,st,bt,Nt,zt,wt,te,Zt,fe,D;function pt(){it=new z0(L),it.init(),Zt=new id(L,it),St=new D0(L,it,t,Zt),ht=new xy(L,it),St.reverseDepthBuffer&&d&&ht.buffers.depth.setReversed(!0),Ft=new V0(L),_t=new oy,A=new Ty(L,it,ht,_t,St,Zt,Ft),S=new F0(y),O=new O0(y),Z=new Rm(L),fe=new I0(L,Z),et=new k0(L,Z,Ft,fe),$=new W0(L,et,Z,Ft),zt=new G0(L,St,A),st=new U0(_t),At=new ry(y,S,O,it,St,fe,st),ft=new Ly(y,_t),Mt=new ly,Jt=new py(it),Nt=new P0(y,S,O,ht,$,f,l),bt=new vy(y,$,St),D=new Dy(L,Ft,St,ht),wt=new L0(L,it,Ft),te=new H0(L,it,Ft),Ft.programs=At.programs,y.capabilities=St,y.extensions=it,y.properties=_t,y.renderLists=Mt,y.shadowMap=bt,y.state=ht,y.info=Ft}pt();const Y=new Py(y,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const w=it.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=it.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(w){w!==void 0&&(X=w,this.setSize(W,nt,!1))},this.getSize=function(w){return w.set(W,nt)},this.setSize=function(w,U,H=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=w,nt=U,e.width=Math.floor(w*X),e.height=Math.floor(U*X),H===!0&&(e.style.width=w+"px",e.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(W*X,nt*X).floor()},this.setDrawingBufferSize=function(w,U,H){W=w,nt=U,X=H,e.width=Math.floor(w*H),e.height=Math.floor(U*H),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(mt)},this.setViewport=function(w,U,H,V){w.isVector4?mt.set(w.x,w.y,w.z,w.w):mt.set(w,U,H,V),ht.viewport(I.copy(mt).multiplyScalar(X).round())},this.getScissor=function(w){return w.copy(Ot)},this.setScissor=function(w,U,H,V){w.isVector4?Ot.set(w.x,w.y,w.z,w.w):Ot.set(w,U,H,V),ht.scissor(B.copy(Ot).multiplyScalar(X).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(w){ht.setScissorTest(oe=w)},this.setOpaqueSort=function(w){ct=w},this.setTransparentSort=function(w){dt=w},this.getClearColor=function(w){return w.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(w=!0,U=!0,H=!0){let V=0;if(w){let F=!1;if(R!==null){const at=R.texture.format;F=at===Jr||at===Kr||at===zs}if(F){const at=R.texture.type,vt=at===wn||at===Tn||at===es||at===yi||at===qr||at===Zr,Ct=Nt.getClearColor(),Rt=Nt.getClearAlpha(),Ht=Ct.r,qt=Ct.g,Pt=Ct.b;vt?(m[0]=Ht,m[1]=qt,m[2]=Pt,m[3]=Rt,L.clearBufferuiv(L.COLOR,0,m)):(v[0]=Ht,v[1]=qt,v[2]=Pt,v[3]=Rt,L.clearBufferiv(L.COLOR,0,v))}else V|=L.COLOR_BUFFER_BIT}U&&(V|=L.DEPTH_BUFFER_BIT),H&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Mt.dispose(),Jt.dispose(),_t.dispose(),S.dispose(),O.dispose(),$.dispose(),fe.dispose(),D.dispose(),At.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Xf),Y.removeEventListener("sessionend",Yf),Ji.stop()};function j(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const w=Ft.autoReset,U=bt.enabled,H=bt.autoUpdate,V=bt.needsUpdate,F=bt.type;pt(),Ft.autoReset=w,bt.enabled=U,bt.autoUpdate=H,bt.needsUpdate=V,bt.type=F}function gt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Yt(w){const U=w.target;U.removeEventListener("dispose",Yt),Me(U)}function Me(w){Fe(w),_t.remove(w)}function Fe(w){const U=_t.get(w).programs;U!==void 0&&(U.forEach(function(H){At.releaseProgram(H)}),w.isShaderMaterial&&At.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,H,V,F,at){U===null&&(U=se);const vt=F.isMesh&&F.matrixWorld.determinant()<0,Ct=z_(w,U,H,V,F);ht.setMaterial(V,vt);let Rt=H.index,Ht=1;if(V.wireframe===!0){if(Rt=et.getWireframeAttribute(H),Rt===void 0)return;Ht=2}const qt=H.drawRange,Pt=H.attributes.position;let re=qt.start*Ht,pe=(qt.start+qt.count)*Ht;at!==null&&(re=Math.max(re,at.start*Ht),pe=Math.min(pe,(at.start+at.count)*Ht)),Rt!==null?(re=Math.max(re,0),pe=Math.min(pe,Rt.count)):Pt!=null&&(re=Math.max(re,0),pe=Math.min(pe,Pt.count));const me=pe-re;if(me<0||me===1/0)return;fe.setup(F,V,Ct,H,Rt);let Qe,ae=wt;if(Rt!==null&&(Qe=Z.get(Rt),ae=te,ae.setIndex(Qe)),F.isMesh)V.wireframe===!0?(ht.setLineWidth(V.wireframeLinewidth*rt()),ae.setMode(L.LINES)):ae.setMode(L.TRIANGLES);else if(F.isLine){let Lt=V.linewidth;Lt===void 0&&(Lt=1),ht.setLineWidth(Lt*rt()),F.isLineSegments?ae.setMode(L.LINES):F.isLineLoop?ae.setMode(L.LINE_LOOP):ae.setMode(L.LINE_STRIP)}else F.isPoints?ae.setMode(L.POINTS):F.isSprite&&ae.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ae.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))ae.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Lt=F._multiDrawStarts,ti=F._multiDrawCounts,le=F._multiDrawCount,_n=Rt?Z.get(Rt).bytesPerElement:1,Ls=_t.get(V).currentProgram.getUniforms();for(let rn=0;rn<le;rn++)Ls.setValue(L,"_gl_DrawID",rn),ae.render(Lt[rn]/_n,ti[rn])}else if(F.isInstancedMesh)ae.renderInstances(re,me,F.count);else if(H.isInstancedBufferGeometry){const Lt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ti=Math.min(H.instanceCount,Lt);ae.renderInstances(re,me,ti)}else ae.render(re,me)};function ue(w,U,H){w.transparent===!0&&w.side===Sn&&w.forceSinglePass===!1?(w.side=Ne,w.needsUpdate=!0,Ja(w,U,H),w.side=Dn,w.needsUpdate=!0,Ja(w,U,H),w.side=Sn):Ja(w,U,H)}this.compile=function(w,U,H=null){H===null&&(H=w),p=Jt.get(H),p.init(U),_.push(p),H.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),w!==H&&w.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const V=new Set;return w.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const at=F.material;if(at)if(Array.isArray(at))for(let vt=0;vt<at.length;vt++){const Ct=at[vt];ue(Ct,H,F),V.add(Ct)}else ue(at,H,F),V.add(at)}),_.pop(),p=null,V},this.compileAsync=function(w,U,H=null){const V=this.compile(w,U,H);return new Promise(F=>{function at(){if(V.forEach(function(vt){_t.get(vt).currentProgram.isReady()&&V.delete(vt)}),V.size===0){F(w);return}setTimeout(at,10)}it.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let xn=null;function jn(w){xn&&xn(w)}function Xf(){Ji.stop()}function Yf(){Ji.start()}const Ji=new Ru;Ji.setAnimationLoop(jn),typeof self<"u"&&Ji.setContext(self),this.setAnimationLoop=function(w){xn=w,Y.setAnimationLoop(w),w===null?Ji.stop():Ji.start()},Y.addEventListener("sessionstart",Xf),Y.addEventListener("sessionend",Yf),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(U),U=Y.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,U,R),p=Jt.get(w,_.length),p.init(U),_.push(p),Dt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Q.setFromProjectionMatrix(Dt),Et=this.localClippingEnabled,ot=st.init(this.clippingPlanes,Et),g=Mt.get(w,x.length),g.init(),x.push(g),Y.enabled===!0&&Y.isPresenting===!0){const at=y.xr.getDepthSensingMesh();at!==null&&ch(at,U,-1/0,y.sortObjects)}ch(w,U,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ct,dt),tt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,tt&&Nt.addToRenderList(g,w),this.info.render.frame++,ot===!0&&st.beginShadows();const H=p.state.shadowsArray;bt.render(H,w,U),ot===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=g.opaque,F=g.transmissive;if(p.setupLights(),U.isArrayCamera){const at=U.cameras;if(F.length>0)for(let vt=0,Ct=at.length;vt<Ct;vt++){const Rt=at[vt];Zf(V,F,w,Rt)}tt&&Nt.render(w);for(let vt=0,Ct=at.length;vt<Ct;vt++){const Rt=at[vt];qf(g,w,Rt,Rt.viewport)}}else F.length>0&&Zf(V,F,w,U),tt&&Nt.render(w),qf(g,w,U);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(y,w,U),fe.resetDefaultState(),b=-1,M=null,_.pop(),_.length>0?(p=_[_.length-1],ot===!0&&st.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function ch(w,U,H,V){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Q.intersectsSprite(w)){V&&Bt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Dt);const vt=$.update(w),Ct=w.material;Ct.visible&&g.push(w,vt,Ct,H,Bt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Q.intersectsObject(w))){const vt=$.update(w),Ct=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Bt.copy(w.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Bt.copy(vt.boundingSphere.center)),Bt.applyMatrix4(w.matrixWorld).applyMatrix4(Dt)),Array.isArray(Ct)){const Rt=vt.groups;for(let Ht=0,qt=Rt.length;Ht<qt;Ht++){const Pt=Rt[Ht],re=Ct[Pt.materialIndex];re&&re.visible&&g.push(w,vt,re,H,Bt.z,Pt)}}else Ct.visible&&g.push(w,vt,Ct,H,Bt.z,null)}}const at=w.children;for(let vt=0,Ct=at.length;vt<Ct;vt++)ch(at[vt],U,H,V)}function qf(w,U,H,V){const F=w.opaque,at=w.transmissive,vt=w.transparent;p.setupLightsView(H),ot===!0&&st.setGlobalState(y.clippingPlanes,H),V&&ht.viewport(I.copy(V)),F.length>0&&Ka(F,U,H),at.length>0&&Ka(at,U,H),vt.length>0&&Ka(vt,U,H),ht.buffers.depth.setTest(!0),ht.buffers.depth.setMask(!0),ht.buffers.color.setMask(!0),ht.setPolygonOffset(!1)}function Zf(w,U,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new Ye(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?Bn:wn,minFilter:bn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const at=p.state.transmissionRenderTarget[V.id],vt=V.viewport||I;at.setSize(vt.z,vt.w);const Ct=y.getRenderTarget();y.setRenderTarget(at),y.getClearColor(z),q=y.getClearAlpha(),q<1&&y.setClearColor(16777215,.5),y.clear(),tt&&Nt.render(H);const Rt=y.toneMapping;y.toneMapping=Fn;const Ht=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),ot===!0&&st.setGlobalState(y.clippingPlanes,V),Ka(w,H,V),A.updateMultisampleRenderTarget(at),A.updateRenderTargetMipmap(at),it.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Pt=0,re=U.length;Pt<re;Pt++){const pe=U[Pt],me=pe.object,Qe=pe.geometry,ae=pe.material,Lt=pe.group;if(ae.side===Sn&&me.layers.test(V.layers)){const ti=ae.side;ae.side=Ne,ae.needsUpdate=!0,$f(me,H,V,Qe,ae,Lt),ae.side=ti,ae.needsUpdate=!0,qt=!0}}qt===!0&&(A.updateMultisampleRenderTarget(at),A.updateRenderTargetMipmap(at))}y.setRenderTarget(Ct),y.setClearColor(z,q),Ht!==void 0&&(V.viewport=Ht),y.toneMapping=Rt}function Ka(w,U,H){const V=U.isScene===!0?U.overrideMaterial:null;for(let F=0,at=w.length;F<at;F++){const vt=w[F],Ct=vt.object,Rt=vt.geometry,Ht=V===null?vt.material:V,qt=vt.group;Ct.layers.test(H.layers)&&$f(Ct,U,H,Rt,Ht,qt)}}function $f(w,U,H,V,F,at){w.onBeforeRender(y,U,H,V,F,at),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(y,U,H,V,w,at),F.transparent===!0&&F.side===Sn&&F.forceSinglePass===!1?(F.side=Ne,F.needsUpdate=!0,y.renderBufferDirect(H,U,V,F,w,at),F.side=Dn,F.needsUpdate=!0,y.renderBufferDirect(H,U,V,F,w,at),F.side=Sn):y.renderBufferDirect(H,U,V,F,w,at),w.onAfterRender(y,U,H,V,F,at)}function Ja(w,U,H){U.isScene!==!0&&(U=se);const V=_t.get(w),F=p.state.lights,at=p.state.shadowsArray,vt=F.state.version,Ct=At.getParameters(w,F.state,at,U,H),Rt=At.getProgramCacheKey(Ct);let Ht=V.programs;V.environment=w.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(w.isMeshStandardMaterial?O:S).get(w.envMap||V.environment),V.envMapRotation=V.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Ht===void 0&&(w.addEventListener("dispose",Yt),Ht=new Map,V.programs=Ht);let qt=Ht.get(Rt);if(qt!==void 0){if(V.currentProgram===qt&&V.lightsStateVersion===vt)return Jf(w,Ct),qt}else Ct.uniforms=At.getUniforms(w),w.onBeforeCompile(Ct,y),qt=At.acquireProgram(Ct,Rt),Ht.set(Rt,qt),V.uniforms=Ct.uniforms;const Pt=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Pt.clippingPlanes=st.uniform),Jf(w,Ct),V.needsLights=H_(w),V.lightsStateVersion=vt,V.needsLights&&(Pt.ambientLightColor.value=F.state.ambient,Pt.lightProbe.value=F.state.probe,Pt.directionalLights.value=F.state.directional,Pt.directionalLightShadows.value=F.state.directionalShadow,Pt.spotLights.value=F.state.spot,Pt.spotLightShadows.value=F.state.spotShadow,Pt.rectAreaLights.value=F.state.rectArea,Pt.ltc_1.value=F.state.rectAreaLTC1,Pt.ltc_2.value=F.state.rectAreaLTC2,Pt.pointLights.value=F.state.point,Pt.pointLightShadows.value=F.state.pointShadow,Pt.hemisphereLights.value=F.state.hemi,Pt.directionalShadowMap.value=F.state.directionalShadowMap,Pt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pt.spotShadowMap.value=F.state.spotShadowMap,Pt.spotLightMatrix.value=F.state.spotLightMatrix,Pt.spotLightMap.value=F.state.spotLightMap,Pt.pointShadowMap.value=F.state.pointShadowMap,Pt.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=qt,V.uniformsList=null,qt}function Kf(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=Qo.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Jf(w,U){const H=_t.get(w);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function z_(w,U,H,V,F){U.isScene!==!0&&(U=se),A.resetTextureUnits();const at=U.fog,vt=V.isMeshStandardMaterial?U.environment:null,Ct=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:bi,Rt=(V.isMeshStandardMaterial?O:S).get(V.envMap||vt),Ht=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,qt=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Pt=!!H.morphAttributes.position,re=!!H.morphAttributes.normal,pe=!!H.morphAttributes.color;let me=Fn;V.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(me=y.toneMapping);const Qe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ae=Qe!==void 0?Qe.length:0,Lt=_t.get(V),ti=p.state.lights;if(ot===!0&&(Et===!0||w!==M)){const cn=w===M&&V.id===b;st.setState(V,w,cn)}let le=!1;V.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==ti.state.version||Lt.outputColorSpace!==Ct||F.isBatchedMesh&&Lt.batching===!1||!F.isBatchedMesh&&Lt.batching===!0||F.isBatchedMesh&&Lt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Lt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Lt.instancing===!1||!F.isInstancedMesh&&Lt.instancing===!0||F.isSkinnedMesh&&Lt.skinning===!1||!F.isSkinnedMesh&&Lt.skinning===!0||F.isInstancedMesh&&Lt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Lt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Lt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Lt.instancingMorph===!1&&F.morphTexture!==null||Lt.envMap!==Rt||V.fog===!0&&Lt.fog!==at||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==st.numPlanes||Lt.numIntersection!==st.numIntersection)||Lt.vertexAlphas!==Ht||Lt.vertexTangents!==qt||Lt.morphTargets!==Pt||Lt.morphNormals!==re||Lt.morphColors!==pe||Lt.toneMapping!==me||Lt.morphTargetsCount!==ae)&&(le=!0):(le=!0,Lt.__version=V.version);let _n=Lt.currentProgram;le===!0&&(_n=Ja(V,U,F));let Ls=!1,rn=!1,Dr=!1;const ge=_n.getUniforms(),Ln=Lt.uniforms;if(ht.useProgram(_n.program)&&(Ls=!0,rn=!0,Dr=!0),V.id!==b&&(b=V.id,rn=!0),Ls||M!==w){ht.buffers.depth.getReversed()?(lt.copy(w.projectionMatrix),tm(lt),em(lt),ge.setValue(L,"projectionMatrix",lt)):ge.setValue(L,"projectionMatrix",w.projectionMatrix),ge.setValue(L,"viewMatrix",w.matrixWorldInverse);const pi=ge.map.cameraPosition;pi!==void 0&&pi.setValue(L,kt.setFromMatrixPosition(w.matrixWorld)),St.logarithmicDepthBuffer&&ge.setValue(L,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ge.setValue(L,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,rn=!0,Dr=!0)}if(F.isSkinnedMesh){ge.setOptional(L,F,"bindMatrix"),ge.setOptional(L,F,"bindMatrixInverse");const cn=F.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),ge.setValue(L,"boneTexture",cn.boneTexture,A))}F.isBatchedMesh&&(ge.setOptional(L,F,"batchingTexture"),ge.setValue(L,"batchingTexture",F._matricesTexture,A),ge.setOptional(L,F,"batchingIdTexture"),ge.setValue(L,"batchingIdTexture",F._indirectTexture,A),ge.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&ge.setValue(L,"batchingColorTexture",F._colorsTexture,A));const Ur=H.morphAttributes;if((Ur.position!==void 0||Ur.normal!==void 0||Ur.color!==void 0)&&zt.update(F,H,_n),(rn||Lt.receiveShadow!==F.receiveShadow)&&(Lt.receiveShadow=F.receiveShadow,ge.setValue(L,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Ln.envMap.value=Rt,Ln.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(Ln.envMapIntensity.value=U.environmentIntensity),rn&&(ge.setValue(L,"toneMappingExposure",y.toneMappingExposure),Lt.needsLights&&k_(Ln,Dr),at&&V.fog===!0&&ft.refreshFogUniforms(Ln,at),ft.refreshMaterialUniforms(Ln,V,X,nt,p.state.transmissionRenderTarget[w.id]),Qo.upload(L,Kf(Lt),Ln,A)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Qo.upload(L,Kf(Lt),Ln,A),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ge.setValue(L,"center",F.center),ge.setValue(L,"modelViewMatrix",F.modelViewMatrix),ge.setValue(L,"normalMatrix",F.normalMatrix),ge.setValue(L,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const cn=V.uniformsGroups;for(let pi=0,mi=cn.length;pi<mi;pi++){const Qf=cn[pi];D.update(Qf,_n),D.bind(Qf,_n)}}return _n}function k_(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function H_(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,U,H){_t.get(w.texture).__webglTexture=U,_t.get(w.depthTexture).__webglTexture=H;const V=_t.get(w);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||it.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const H=_t.get(w);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,H=0){R=w,T=U,E=H;let V=!0,F=null,at=!1,vt=!1;if(w){const Rt=_t.get(w);if(Rt.__useDefaultFramebuffer!==void 0)ht.bindFramebuffer(L.FRAMEBUFFER,null),V=!1;else if(Rt.__webglFramebuffer===void 0)A.setupRenderTarget(w);else if(Rt.__hasExternalTextures)A.rebindTextures(w,_t.get(w.texture).__webglTexture,_t.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Pt=w.depthTexture;if(Rt.__boundDepthTexture!==Pt){if(Pt!==null&&_t.has(Pt)&&(w.width!==Pt.image.width||w.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(w)}}const Ht=w.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(vt=!0);const qt=_t.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(qt[U])?F=qt[U][H]:F=qt[U],at=!0):w.samples>0&&A.useMultisampledRTT(w)===!1?F=_t.get(w).__webglMultisampledFramebuffer:Array.isArray(qt)?F=qt[H]:F=qt,I.copy(w.viewport),B.copy(w.scissor),N=w.scissorTest}else I.copy(mt).multiplyScalar(X).floor(),B.copy(Ot).multiplyScalar(X).floor(),N=oe;if(ht.bindFramebuffer(L.FRAMEBUFFER,F)&&V&&ht.drawBuffers(w,F),ht.viewport(I),ht.scissor(B),ht.setScissorTest(N),at){const Rt=_t.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Rt.__webglTexture,H)}else if(vt){const Rt=_t.get(w.texture),Ht=U||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Rt.__webglTexture,H||0,Ht)}b=-1},this.readRenderTargetPixels=function(w,U,H,V,F,at,vt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=_t.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&vt!==void 0&&(Ct=Ct[vt]),Ct){ht.bindFramebuffer(L.FRAMEBUFFER,Ct);try{const Rt=w.texture,Ht=Rt.format,qt=Rt.type;if(!St.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-V&&H>=0&&H<=w.height-F&&L.readPixels(U,H,V,F,Zt.convert(Ht),Zt.convert(qt),at)}finally{const Rt=R!==null?_t.get(R).__webglFramebuffer:null;ht.bindFramebuffer(L.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(w,U,H,V,F,at,vt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=_t.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&vt!==void 0&&(Ct=Ct[vt]),Ct){const Rt=w.texture,Ht=Rt.format,qt=Rt.type;if(!St.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-V&&H>=0&&H<=w.height-F){ht.bindFramebuffer(L.FRAMEBUFFER,Ct);const Pt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Pt),L.bufferData(L.PIXEL_PACK_BUFFER,at.byteLength,L.STREAM_READ),L.readPixels(U,H,V,F,Zt.convert(Ht),Zt.convert(qt),0);const re=R!==null?_t.get(R).__webglFramebuffer:null;ht.bindFramebuffer(L.FRAMEBUFFER,re);const pe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await jp(L,pe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Pt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,at),L.deleteBuffer(Pt),L.deleteSync(pe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,U=null,H=0){w.isTexture!==!0&&(Qs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const V=Math.pow(2,-H),F=Math.floor(w.image.width*V),at=Math.floor(w.image.height*V),vt=U!==null?U.x:0,Ct=U!==null?U.y:0;A.setTexture2D(w,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,vt,Ct,F,at),ht.unbindTexture()},this.copyTextureToTexture=function(w,U,H=null,V=null,F=0){w.isTexture!==!0&&(Qs("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,w=arguments[1],U=arguments[2],F=arguments[3]||0,H=null);let at,vt,Ct,Rt,Ht,qt,Pt,re,pe;const me=w.isCompressedTexture?w.mipmaps[F]:w.image;H!==null?(at=H.max.x-H.min.x,vt=H.max.y-H.min.y,Ct=H.isBox3?H.max.z-H.min.z:1,Rt=H.min.x,Ht=H.min.y,qt=H.isBox3?H.min.z:0):(at=me.width,vt=me.height,Ct=me.depth||1,Rt=0,Ht=0,qt=0),V!==null?(Pt=V.x,re=V.y,pe=V.z):(Pt=0,re=0,pe=0);const Qe=Zt.convert(U.format),ae=Zt.convert(U.type);let Lt;U.isData3DTexture?(A.setTexture3D(U,0),Lt=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(A.setTexture2DArray(U,0),Lt=L.TEXTURE_2D_ARRAY):(A.setTexture2D(U,0),Lt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const ti=L.getParameter(L.UNPACK_ROW_LENGTH),le=L.getParameter(L.UNPACK_IMAGE_HEIGHT),_n=L.getParameter(L.UNPACK_SKIP_PIXELS),Ls=L.getParameter(L.UNPACK_SKIP_ROWS),rn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,me.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,me.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Rt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ht),L.pixelStorei(L.UNPACK_SKIP_IMAGES,qt);const Dr=w.isDataArrayTexture||w.isData3DTexture,ge=U.isDataArrayTexture||U.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const Ln=_t.get(w),Ur=_t.get(U),cn=_t.get(Ln.__renderTarget),pi=_t.get(Ur.__renderTarget);ht.bindFramebuffer(L.READ_FRAMEBUFFER,cn.__webglFramebuffer),ht.bindFramebuffer(L.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let mi=0;mi<Ct;mi++)Dr&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_t.get(w).__webglTexture,F,qt+mi),w.isDepthTexture?(ge&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,F,pe+mi),L.blitFramebuffer(Rt,Ht,at,vt,Pt,re,at,vt,L.DEPTH_BUFFER_BIT,L.NEAREST)):ge?L.copyTexSubImage3D(Lt,F,Pt,re,pe+mi,Rt,Ht,at,vt):L.copyTexSubImage2D(Lt,F,Pt,re,pe+mi,Rt,Ht,at,vt);ht.bindFramebuffer(L.READ_FRAMEBUFFER,null),ht.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ge?w.isDataTexture||w.isData3DTexture?L.texSubImage3D(Lt,F,Pt,re,pe,at,vt,Ct,Qe,ae,me.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Lt,F,Pt,re,pe,at,vt,Ct,Qe,me.data):L.texSubImage3D(Lt,F,Pt,re,pe,at,vt,Ct,Qe,ae,me):w.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,F,Pt,re,at,vt,Qe,ae,me.data):w.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,F,Pt,re,me.width,me.height,Qe,me.data):L.texSubImage2D(L.TEXTURE_2D,F,Pt,re,at,vt,Qe,ae,me);L.pixelStorei(L.UNPACK_ROW_LENGTH,ti),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,le),L.pixelStorei(L.UNPACK_SKIP_PIXELS,_n),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ls),L.pixelStorei(L.UNPACK_SKIP_IMAGES,rn),F===0&&U.generateMipmaps&&L.generateMipmap(Lt),ht.unbindTexture()},this.copyTextureToTexture3D=function(w,U,H=null,V=null,F=0){return w.isTexture!==!0&&(Qs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,w=arguments[2],U=arguments[3],F=arguments[4]||0),Qs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,U,H,V,F)},this.initRenderTarget=function(w){_t.get(w).__webglFramebuffer===void 0&&A.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),ht.unbindTexture()},this.resetState=function(){T=0,E=0,R=null,ht.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class Ss{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new G(t),this.density=e}clone(){return new Ss(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ta{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new G(t),this.near=e,this.far=n}clone(){return new ta(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bs extends ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ea{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Zs,this.updateRanges=[],this.version=0,this.uuid=je()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=je()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=je()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ve=new C;class Fi{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Oe(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Wt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Wt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Wt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Wt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Oe(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Oe(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Oe(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Oe(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array),i=Wt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Wt(e,this.array),n=Wt(n,this.array),i=Wt(i,this.array),s=Wt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Fi(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ec extends De{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ws;const lr=new C,Ts=new C,Es=new C,As=new K,cr=new K,od=new Ut,na=new C,hr=new C,ia=new C,ad=new K,nc=new K,ld=new K;class cd extends ee{constructor(t=new ec){if(super(),this.isSprite=!0,this.type="Sprite",ws===void 0){ws=new Gt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ea(e,5);ws.setIndex([0,1,2,0,2,3]),ws.setAttribute("position",new Fi(n,3,0,!1)),ws.setAttribute("uv",new Fi(n,2,3,!1))}this.geometry=ws,this.material=t,this.center=new K(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ts.setFromMatrixScale(this.matrixWorld),od.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Es.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ts.multiplyScalar(-Es.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;sa(na.set(-.5,-.5,0),Es,o,Ts,i,s),sa(hr.set(.5,-.5,0),Es,o,Ts,i,s),sa(ia.set(.5,.5,0),Es,o,Ts,i,s),ad.set(0,0),nc.set(1,0),ld.set(1,1);let a=t.ray.intersectTriangle(na,hr,ia,!1,lr);if(a===null&&(sa(hr.set(-.5,.5,0),Es,o,Ts,i,s),nc.set(0,1),a=t.ray.intersectTriangle(na,ia,hr,!1,lr),a===null))return;const l=t.ray.origin.distanceTo(lr);l<t.near||l>t.far||e.push({distance:l,point:lr.clone(),uv:Ze.getInterpolation(lr,na,hr,ia,ad,nc,ld,new K),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function sa(r,t,e,n,i,s){As.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(cr.x=s*As.x-i*As.y,cr.y=i*As.x+s*As.y):cr.copy(As),r.copy(t),r.x+=cr.x,r.y+=cr.y,r.applyMatrix4(od)}const ra=new C,hd=new C;class ud extends ee{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let n=0,i=e.length;n<i;n++){const s=e[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);const i=this.levels;let s;for(s=0;s<i.length&&!(e<i[s].distance);s++);return i.splice(s,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){const e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){const i=e.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i;n++){let s=e[n].distance;if(e[n].object.visible&&(s-=s*e[n].hysteresis),t<s)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){ra.setFromMatrixPosition(this.matrixWorld);const i=t.ray.origin.distanceTo(ra);this.getObjectForDistance(i).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){ra.setFromMatrixPosition(t.matrixWorld),hd.setFromMatrixPosition(this.matrixWorld);const n=ra.distanceTo(hd)/t.zoom;e[0].object.visible=!0;let i,s;for(i=1,s=e.length;i<s;i++){let o=e[i].distance;if(e[i].object.visible&&(o-=o*e[i].hysteresis),n>=o)e[i-1].object.visible=!1,e[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)e[i].object.visible=!1}}toJSON(t){const e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const o=n[i];e.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return e}}const dd=new C,fd=new Kt,pd=new Kt,Uy=new C,md=new Ut,oa=new C,ic=new Ie,gd=new Ut,sc=new cs;class vd extends J{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=il,this.bindMatrix=new Ut,this.bindMatrixInverse=new Ut,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ze),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,oa),this.boundingBox.expandByPoint(oa)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ie),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,oa),this.boundingSphere.expandByPoint(oa)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ic.copy(this.boundingSphere),ic.applyMatrix4(i),t.ray.intersectsSphere(ic)!==!1&&(gd.copy(i).invert(),sc.copy(t.ray).applyMatrix4(gd),!(this.boundingBox!==null&&sc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,sc)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Kt,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===il?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;fd.fromBufferAttribute(i.attributes.skinIndex,t),pd.fromBufferAttribute(i.attributes.skinWeight,t),dd.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const o=pd.getComponent(s);if(o!==0){const a=fd.getComponent(s);md.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Uy.copy(dd).applyMatrix4(md),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class rc extends ee{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Cn extends ve{constructor(t=null,e=1,n=1,i,s,o,a,l,c=we,h=we,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const yd=new Ut,Fy=new Ut;class aa{constructor(t=[],e=[]){this.uuid=je(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ut)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Ut;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=t.length;s<o;s++){const a=t[s]?t[s].matrixWorld:Fy;yd.multiplyMatrices(a,e[s]),yd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new aa(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Cn(e,t,t,Ce,Xe);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let o=e[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new rc),this.bones.push(o),this.boneInverses.push(new Ut().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class Cs extends ne{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Rs=new Ut,xd=new Ut,la=[],_d=new ze,Ny=new Ut,ur=new J,dr=new Ie;class Md extends J{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Cs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Ny)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ze),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),_d.copy(t.boundingBox).applyMatrix4(Rs),this.boundingBox.union(_d)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ie),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),dr.copy(t.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(dr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(ur.geometry=this.geometry,ur.material=this.material,ur.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dr.copy(this.boundingSphere),dr.applyMatrix4(n),t.ray.intersectsSphere(dr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Rs),xd.multiplyMatrices(n,Rs),ur.matrixWorld=xd,ur.raycast(t,la);for(let o=0,a=la.length;o<a;o++){const l=la[o];l.instanceId=s,l.object=this,e.push(l)}la.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Cs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cn(new Float32Array(i*this.count),i,this.count,$r,Xe));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function oc(r,t){return r-t}function By(r,t){return r.z-t.z}function Oy(r,t){return t.z-r.z}class zy{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){const s=this.pool,o=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const a=s[this.index];o.push(a),this.index++,a.start=t,a.count=e,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}const Ke=new Ut,ky=new G(1,1,1),ac=new rr,ca=new ze,Ni=new Ie,fr=new C,Sd=new C,Hy=new C,lc=new zy,Ue=new J,ha=[];function Vy(r,t,e=0){const n=t.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==t.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let o=0;o<n;o++)t.setComponent(s+e,o,r.getComponent(s,o))}else t.array.set(r.array,e*n);t.needsUpdate=!0}function Bi(r,t){if(r.constructor!==t.constructor){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++)t[n]=r[n]}else{const e=Math.min(r.length,t.length);t.set(new r.constructor(r.buffer,0,e))}}class bd extends J{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(t,e,n=e*2,i){super(new Gt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4),n=new Cn(e,t,t,Ce,Xe);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Uint32Array(t*t),n=new Cn(e,t,t,zs,Tn);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Float32Array(t*t*4).fill(1),n=new Cn(e,t,t,Ce,Xe);n.colorSpace=Qt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){const e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in t.attributes){const o=t.getAttribute(s),{array:a,itemSize:l,normalized:c}=o,h=new a.constructor(n*l),u=new ne(h,l,c);e.setAttribute(s,u)}if(t.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new ne(s,1))}this._geometryInitialized=!0}}_validateGeometry(t){const e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in e.attributes){if(!t.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=t.getAttribute(n),s=e.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ze);const t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const s=e[n].geometryIndex;this.getMatrixAt(n,Ke),this.getBoundingBoxAt(s,ca).applyMatrix4(Ke),t.union(ca)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ie);const t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const s=e[n].geometryIndex;this.getMatrixAt(n,Ke),this.getBoundingSphereAt(s,Ni).applyMatrix4(Ke),t.union(Ni)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:t};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(oc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;Ke.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const o=this._colorsTexture;return o&&(ky.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=e===-1?t.getAttribute("position").count:e;const o=t.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(oc),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,t),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),o=e.getIndex(),a=this._geometryInfo[t];if(i&&o.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=e.getAttribute("position").count;for(const h in n.attributes){const u=e.getAttribute(h),d=n.getAttribute(h);Vy(u,d,l);const f=u.itemSize;for(let m=u.count,v=c;m<v;m++){const g=l+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const h=a.indexStart,u=a.reservedIndexCount;a.indexCount=e.getIndex().count;for(let d=0;d<o.count;d++)s.setX(h+d,l+o.getX(d));for(let d=o.count,f=u;d<f;d++)s.setX(h+d,l);s.needsUpdate=!0,s.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,e.boundingBox!==null&&(a.boundingBox=e.boundingBox.clone()),a.boundingSphere=null,e.boundingSphere!==null&&(a.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){const e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].geometryIndex===t&&this.deleteInstance(i);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?this:(e[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this)}optimize(){let t=0,e=0;const n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),s=this.geometry;for(let o=0,a=n.length;o<a;o++){const l=i[o],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==e){const{indexStart:h,vertexStart:u,reservedIndexCount:d}=c,f=s.index,m=f.array,v=t-u;for(let g=h;g<h+d;g++)m[g]=m[g]+v;f.array.copyWithin(e,h,h+d),f.addUpdateRange(e,d),c.indexStart=e}e+=c.reservedIndexCount}if(c.vertexStart!==t){const{vertexStart:h,reservedVertexCount:u}=c,d=s.attributes;for(const f in d){const m=d[f],{array:v,itemSize:g}=m;v.copyWithin(t*g,h*g,(h+u)*g),m.addUpdateRange(t*g,u*g)}c.vertexStart=t}t+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart,this._nextIndexStart=s.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingBox===null){const s=new ze,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;o&&(h=o.getX(h)),s.expandByPoint(fr.fromBufferAttribute(a,h))}i.boundingBox=s}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingSphere===null){const s=new Ie;this.getBoundingBoxAt(t,ca),ca.getCenter(s.center);const o=n.index,a=n.attributes.position;let l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;o&&(u=o.getX(u)),fr.fromBufferAttribute(a,u),l=Math.max(l,s.center.distanceToSquared(fr))}s.radius=Math.sqrt(l),i.boundingSphere=s}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){const n=this._instanceInfo,i=this._matricesTexture,s=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?this:(e.toArray(s,t*16),i.needsUpdate=!0,this)}getMatrixAt(t,e){const n=this._instanceInfo,i=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?null:e.fromArray(i,t*16)}setColorAt(t,e){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,s=this._instanceInfo;return t>=s.length||s[t].active===!1?this:(e.toArray(i,t*4),n.needsUpdate=!0,this)}getColorAt(t,e){const n=this._colorsTexture.image.data,i=this._instanceInfo;return t>=i.length||i[t].active===!1?null:e.fromArray(n,t*4)}setVisibleAt(t,e){const n=this._instanceInfo;return t>=n.length||n[t].active===!1||n[t].visible===e?this:(n[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?!1:e[t].visible}setGeometryIdAt(t,e){const n=this._instanceInfo,i=this._geometryInfo;return t>=n.length||n[t].active===!1||e>=i.length||i[e].active===!1?null:(n[t].geometryIndex=e,this)}getGeometryIdAt(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?-1:e[t].geometryIndex}getGeometryRangeAt(t,e={}){if(t<0||t>=this._geometryCount)return null;const n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){const e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(oc);e[e.length-1]===n.length;)n.pop(),e.pop();if(t<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);const i=new Int32Array(t),s=new Int32Array(t);Bi(this._multiDrawCounts,i),Bi(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=t;const o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),Bi(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),Bi(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Bi(l.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>t)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>e)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Gt,this._initializeGeometry(s));const o=this.geometry;s.index&&Bi(s.index.array,o.index.array);for(const a in s.attributes)Bi(s.attributes[a].array,o.attributes[a].array)}raycast(t,e){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,o=this.geometry;Ue.material=this.material,Ue.geometry.index=o.index,Ue.geometry.attributes=o.attributes,Ue.geometry.boundingBox===null&&(Ue.geometry.boundingBox=new ze),Ue.geometry.boundingSphere===null&&(Ue.geometry.boundingSphere=new Ie);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;const c=n[a].geometryIndex,h=i[c];Ue.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Ue.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,Ue.geometry.boundingBox),this.getBoundingSphereAt(c,Ue.geometry.boundingSphere),Ue.raycast(t,ha);for(let u=0,d=ha.length;u<d;u++){const f=ha[u];f.object=this,f.batchId=a,e.push(f)}ha.length=0}Ue.material=null,Ue.geometry.index=null,Ue.geometry.attributes={},Ue.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._geometryCount=t._geometryCount,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(t,e,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,m=f.image.data;d&&(Ke.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),ac.setFromProjectionMatrix(Ke,t.coordinateSystem));let v=0;if(this.sortObjects){Ke.copy(this.matrixWorld).invert(),fr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Ke),Sd.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Ke);for(let x=0,_=l.length;x<_;x++)if(l[x].visible&&l[x].active){const y=l[x].geometryIndex;this.getMatrixAt(x,Ke),this.getBoundingSphereAt(y,Ni).applyMatrix4(Ke);let P=!1;if(d&&(P=!ac.intersectsSphere(Ni)),!P){const T=u[y],E=Hy.subVectors(Ni.center,fr).dot(Sd);lc.push(T.start,T.count,E,x)}}const g=lc.list,p=this.customSort;p===null?g.sort(s.transparent?Oy:By):p.call(this,g,n);for(let x=0,_=g.length;x<_;x++){const y=g[x];c[v]=y.start*a,h[v]=y.count,m[v]=y.index,v++}lc.reset()}else for(let g=0,p=l.length;g<p;g++)if(l[g].visible&&l[g].active){const x=l[g].geometryIndex;let _=!1;if(d&&(this.getMatrixAt(g,Ke),this.getBoundingSphereAt(x,Ni).applyMatrix4(Ke),_=!ac.intersectsSphere(Ni)),!_){const y=u[x];c[v]=y.start*a,h[v]=y.count,m[v]=g,v++}}f.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,s,o){this.onBeforeRender(t,null,i,s,o)}}class Ge extends De{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new G(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ua=new C,da=new C,wd=new Ut,pr=new cs,fa=new Ie,cc=new C,Td=new C;class qn extends ee{constructor(t=new Gt,e=new Ge){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)ua.fromBufferAttribute(e,i-1),da.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=ua.distanceTo(da);t.setAttribute("lineDistance",new Tt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(i),fa.radius+=s,t.ray.intersectsSphere(fa)===!1)return;wd.copy(i).invert(),pr.copy(t.ray).applyMatrix4(wd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let v=f,g=m-1;v<g;v+=c){const p=h.getX(v),x=h.getX(v+1),_=pa(this,t,pr,l,p,x);_&&e.push(_)}if(this.isLineLoop){const v=h.getX(m-1),g=h.getX(f),p=pa(this,t,pr,l,v,g);p&&e.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let v=f,g=m-1;v<g;v+=c){const p=pa(this,t,pr,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=pa(this,t,pr,l,m-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function pa(r,t,e,n,i,s){const o=r.geometry.attributes.position;if(ua.fromBufferAttribute(o,i),da.fromBufferAttribute(o,s),e.distanceSqToSegment(ua,da,cc,Td)>n)return;cc.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(cc);if(!(l<t.near||l>t.far))return{distance:l,point:Td.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const Ed=new C,Ad=new C;class Rn extends qn{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Ed.fromBufferAttribute(e,i),Ad.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ed.distanceTo(Ad);t.setAttribute("lineDistance",new Tt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Cd extends qn{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class mr extends De{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Rd=new Ut,hc=new cs,ma=new Ie,ga=new C;class gr extends ee{constructor(t=new Gt,e=new mr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(i),ma.radius+=s,t.ray.intersectsSphere(ma)===!1)return;Rd.copy(i).invert(),hc.copy(t.ray).applyMatrix4(Rd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,v=f;m<v;m++){const g=c.getX(m);ga.fromBufferAttribute(u,g),Pd(ga,g,l,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,v=f;m<v;m++)ga.fromBufferAttribute(u,m),Pd(ga,m,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Pd(r,t,e,n,i,s,o){const a=hc.distanceSqToPoint(r);if(a<e){const l=new C;hc.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Gy extends ve{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:de,this.magFilter=s!==void 0?s:de,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,t.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class Wy extends ve{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=we,this.minFilter=we,this.generateMipmaps=!1,this.needsUpdate=!0}}class va extends ve{constructor(t,e,n,i,s,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class Xy extends va{constructor(t,e,n,i,s,o){super(t,e,n,s,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=We,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yy extends va{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,Nn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}}class Id extends ve{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new K:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,i=[],s=[],o=[],a=new C,l=new Ut;for(let f=0;f<=t;f++){const m=f/t;i[f]=this.getTangentAt(m,new C)}s[0]=new C,o[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(xe(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(xe(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ya extends mn{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new K){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Ld extends ya{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function uc(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const xa=new C,dc=new uc,fc=new uc,pc=new uc;class Dd extends mn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new C){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(xa.subVectors(i[0],i[1]).add(i[0]),c=xa);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(xa.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=xa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),dc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,v,g),fc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,v,g),pc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(dc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),fc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),pc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(dc.calc(l),fc.calc(l),pc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new C().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ud(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function qy(r,t){const e=1-r;return e*e*t}function Zy(r,t){return 2*(1-r)*r*t}function $y(r,t){return r*r*t}function vr(r,t,e,n){return qy(r,t)+Zy(r,e)+$y(r,n)}function Ky(r,t){const e=1-r;return e*e*e*t}function Jy(r,t){const e=1-r;return 3*e*e*r*t}function Qy(r,t){return 3*(1-r)*r*r*t}function jy(r,t){return r*r*r*t}function yr(r,t,e,n,i){return Ky(r,t)+Jy(r,e)+Qy(r,n)+jy(r,i)}class mc extends mn{constructor(t=new K,e=new K,n=new K,i=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new K){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(yr(t,i.x,s.x,o.x,a.x),yr(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Fd extends mn{constructor(t=new C,e=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new C){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(yr(t,i.x,s.x,o.x,a.x),yr(t,i.y,s.y,o.y,a.y),yr(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class gc extends mn{constructor(t=new K,e=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new K){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new K){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nd extends mn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class vc extends mn{constructor(t=new K,e=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new K){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(vr(t,i.x,s.x,o.x),vr(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yc extends mn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(vr(t,i.x,s.x,o.x),vr(t,i.y,s.y,o.y),vr(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xc extends mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new K){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Ud(a,l.x,c.x,h.x,u.x),Ud(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new K().fromArray(i))}return this}}var _a=Object.freeze({__proto__:null,ArcCurve:Ld,CatmullRomCurve3:Dd,CubicBezierCurve:mc,CubicBezierCurve3:Fd,EllipseCurve:ya,LineCurve:gc,LineCurve3:Nd,QuadraticBezierCurve:vc,QuadraticBezierCurve3:yc,SplineCurve:xc});class Bd extends mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _a[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new _a[i.type]().fromJSON(i))}return this}}class xr extends Bd{constructor(t){super(),this.type="Path",this.currentPoint=new K,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new gc(this.currentPoint.clone(),new K(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new vc(this.currentPoint.clone(),new K(t,e),new K(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new mc(this.currentPoint.clone(),new K(t,e),new K(n,i),new K(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new xc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){const c=new ya(t,e,n,i,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class _r extends Gt{constructor(t=[new K(0,-.5),new K(.5,0),new K(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=xe(i,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/e,u=new C,d=new K,f=new C,m=new C,v=new C;let g=0,p=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:g=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,f.x=p*1,f.y=-g,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:g=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(m)}for(let x=0;x<=e;x++){const _=n+x*h*i,y=Math.sin(_),P=Math.cos(_);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*y,u.y=t[T].y,u.z=t[T].x*P,o.push(u.x,u.y,u.z),d.x=x/e,d.y=T/(t.length-1),a.push(d.x,d.y);const E=l[3*T+0]*y,R=l[3*T+1],b=l[3*T+0]*P;c.push(E,R,b)}}for(let x=0;x<e;x++)for(let _=0;_<t.length-1;_++){const y=_+x*t.length,P=y,T=y+t.length,E=y+t.length+1,R=y+1;s.push(P,T,R),s.push(E,R,T)}this.setIndex(s),this.setAttribute("position",new Tt(o,3)),this.setAttribute("uv",new Tt(a,2)),this.setAttribute("normal",new Tt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _r(t.points,t.segments,t.phiStart,t.phiLength)}}class Ma extends _r{constructor(t=1,e=1,n=4,i=8){const s=new xr;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Ma(t.radius,t.length,t.capSegments,t.radialSegments)}}class Mr extends Gt{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new C,h=new K;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Tt(o,3)),this.setAttribute("normal",new Tt(a,3)),this.setAttribute("uv",new Tt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class gn extends Gt{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const v=[],g=n/2;let p=0;x(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Tt(u,3)),this.setAttribute("normal",new Tt(d,3)),this.setAttribute("uv",new Tt(f,2));function x(){const y=new C,P=new C;let T=0;const E=(e-t)/n;for(let R=0;R<=s;R++){const b=[],M=R/s,I=M*(e-t)+t;for(let B=0;B<=i;B++){const N=B/i,z=N*l+a,q=Math.sin(z),W=Math.cos(z);P.x=I*q,P.y=-M*n+g,P.z=I*W,u.push(P.x,P.y,P.z),y.set(q,E,W).normalize(),d.push(y.x,y.y,y.z),f.push(N,1-M),b.push(m++)}v.push(b)}for(let R=0;R<i;R++)for(let b=0;b<s;b++){const M=v[b][R],I=v[b+1][R],B=v[b+1][R+1],N=v[b][R+1];(t>0||b!==0)&&(h.push(M,I,N),T+=3),(e>0||b!==s-1)&&(h.push(I,B,N),T+=3)}c.addGroup(p,T,0),p+=T}function _(y){const P=m,T=new K,E=new C;let R=0;const b=y===!0?t:e,M=y===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const I=m;for(let B=0;B<=i;B++){const z=B/i*l+a,q=Math.cos(z),W=Math.sin(z);E.x=b*W,E.y=g*M,E.z=b*q,u.push(E.x,E.y,E.z),d.push(0,M,0),T.x=q*.5+.5,T.y=W*.5*M+.5,f.push(T.x,T.y),m++}for(let B=0;B<i;B++){const N=P+B,z=I+B;y===!0?h.push(z,z+1,N):h.push(z+1,z,N),R+=3}c.addGroup(p,R,y===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ui extends gn{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ui(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class di extends Gt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Tt(s,3)),this.setAttribute("normal",new Tt(s.slice(),3)),this.setAttribute("uv",new Tt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const _=new C,y=new C,P=new C;for(let T=0;T<e.length;T+=3)f(e[T+0],_),f(e[T+1],y),f(e[T+2],P),l(_,y,P,x)}function l(x,_,y,P){const T=P+1,E=[];for(let R=0;R<=T;R++){E[R]=[];const b=x.clone().lerp(y,R/T),M=_.clone().lerp(y,R/T),I=T-R;for(let B=0;B<=I;B++)B===0&&R===T?E[R][B]=b:E[R][B]=b.clone().lerp(M,B/I)}for(let R=0;R<T;R++)for(let b=0;b<2*(T-R)-1;b++){const M=Math.floor(b/2);b%2===0?(d(E[R][M+1]),d(E[R+1][M]),d(E[R][M])):(d(E[R][M+1]),d(E[R+1][M+1]),d(E[R+1][M]))}}function c(x){const _=new C;for(let y=0;y<s.length;y+=3)_.x=s[y+0],_.y=s[y+1],_.z=s[y+2],_.normalize().multiplyScalar(x),s[y+0]=_.x,s[y+1]=_.y,s[y+2]=_.z}function h(){const x=new C;for(let _=0;_<s.length;_+=3){x.x=s[_+0],x.y=s[_+1],x.z=s[_+2];const y=g(x)/2/Math.PI+.5,P=p(x)/Math.PI+.5;o.push(y,1-P)}m(),u()}function u(){for(let x=0;x<o.length;x+=6){const _=o[x+0],y=o[x+2],P=o[x+4],T=Math.max(_,y,P),E=Math.min(_,y,P);T>.9&&E<.1&&(_<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),P<.2&&(o[x+4]+=1))}}function d(x){s.push(x.x,x.y,x.z)}function f(x,_){const y=x*3;_.x=t[y+0],_.y=t[y+1],_.z=t[y+2]}function m(){const x=new C,_=new C,y=new C,P=new C,T=new K,E=new K,R=new K;for(let b=0,M=0;b<s.length;b+=9,M+=6){x.set(s[b+0],s[b+1],s[b+2]),_.set(s[b+3],s[b+4],s[b+5]),y.set(s[b+6],s[b+7],s[b+8]),T.set(o[M+0],o[M+1]),E.set(o[M+2],o[M+3]),R.set(o[M+4],o[M+5]),P.copy(x).add(_).add(y).divideScalar(3);const I=g(P);v(T,M+0,x,I),v(E,M+2,_,I),v(R,M+4,y,I)}}function v(x,_,y,P){P<0&&x.x===1&&(o[_]=x.x-1),y.x===0&&y.z===0&&(o[_]=P/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new di(t.vertices,t.indices,t.radius,t.details)}}class Sa extends di{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Sa(t.radius,t.detail)}}const ba=new C,wa=new C,_c=new C,Ta=new Ze;class Od extends Gt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),s=Math.cos(Ti*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:v,b:g,c:p}=Ta;if(v.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Ta.getNormal(_c),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const _=(x+1)%3,y=u[x],P=u[_],T=Ta[h[x]],E=Ta[h[_]],R=`${y}_${P}`,b=`${P}_${y}`;b in d&&d[b]?(_c.dot(d[b].normal)<=s&&(f.push(T.x,T.y,T.z),f.push(E.x,E.y,E.z)),d[b]=null):R in d||(d[R]={index0:c[x],index1:c[_],normal:_c.clone()})}}for(const m in d)if(d[m]){const{index0:v,index1:g}=d[m];ba.fromBufferAttribute(a,v),wa.fromBufferAttribute(a,g),f.push(ba.x,ba.y,ba.z),f.push(wa.x,wa.y,wa.z)}this.setAttribute("position",new Tt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Oi extends xr{constructor(t){super(t),this.uuid=je(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new xr().fromJSON(i))}return this}}const tx={triangulate:function(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=zd(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,d,f;if(n&&(s=rx(r,t,s,e)),r.length>80*e){a=c=r[0],l=h=r[1];for(let m=e;m<i;m+=e)u=r[m],d=r[m+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Sr(s,o,e,a,l,f,0),o}};function zd(r,t,e,n,i){let s,o;if(i===gx(r,t,e,n)>0)for(s=t;s<e;s+=n)o=Vd(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=Vd(s,r[s],r[s+1],o);return o&&Ea(o,o.next)&&(wr(o),o=o.next),o}function zi(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Ea(e,e.next)||ye(e.prev,e,e.next)===0)){if(wr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Sr(r,t,e,n,i,s,o){if(!r)return;!o&&s&&hx(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?nx(r,n,i,s):ex(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(c.i/e|0),wr(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=ix(zi(r),t,e),Sr(r,t,e,n,i,s,2)):o===2&&sx(r,t,e,n,i,s):Sr(zi(r),t,e,n,i,s,1);break}}}function ex(r){const t=r.prev,e=r,n=r.next;if(ye(t,e,n)>=0)return!1;const i=t.x,s=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<s?i<o?i:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,d=i>s?i>o?i:o:s>o?s:o,f=a>l?a>c?a:c:l>c?l:c;let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Ps(i,a,s,l,o,c,m.x,m.y)&&ye(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function nx(r,t,e,n){const i=r.prev,s=r,o=r.next;if(ye(i,s,o)>=0)return!1;const a=i.x,l=s.x,c=o.x,h=i.y,u=s.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,m=h<u?h<d?h:d:u<d?u:d,v=a>l?a>c?a:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,p=Mc(f,m,t,e,n),x=Mc(v,g,t,e,n);let _=r.prevZ,y=r.nextZ;for(;_&&_.z>=p&&y&&y.z<=x;){if(_.x>=f&&_.x<=v&&_.y>=m&&_.y<=g&&_!==i&&_!==o&&Ps(a,h,l,u,c,d,_.x,_.y)&&ye(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=f&&y.x<=v&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ps(a,h,l,u,c,d,y.x,y.y)&&ye(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=v&&_.y>=m&&_.y<=g&&_!==i&&_!==o&&Ps(a,h,l,u,c,d,_.x,_.y)&&ye(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ps(a,h,l,u,c,d,y.x,y.y)&&ye(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function ix(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!Ea(i,s)&&kd(i,n,n.next,s)&&br(i,s)&&br(s,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),wr(n),wr(n.next),n=r=s),n=n.next}while(n!==r);return zi(n)}function sx(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&fx(o,a)){let l=Hd(o,a);o=zi(o,o.next),l=zi(l,l.next),Sr(o,t,e,n,i,s,0),Sr(l,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function rx(r,t,e,n){const i=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:r.length,c=zd(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(dx(c));for(i.sort(ox),s=0;s<i.length;s++)e=ax(i[s],e);return e}function ox(r,t){return r.x-t.x}function ax(r,t){const e=lx(r,t);if(!e)return t;const n=Hd(e,r);return zi(n,n.next),zi(e,e.next)}function lx(r,t){let e=t,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===s))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;e=i;do s>=e.x&&e.x>=l&&s!==e.x&&Ps(o<c?s:n,o,l,c,o<c?n:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),br(e,r)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&cx(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function cx(r,t){return ye(r.prev,r,t.prev)<0&&ye(t.next,r,r.next)<0}function hx(r,t,e,n){let i=r;do i.z===0&&(i.z=Mc(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,ux(i)}function ux(r){let t,e,n,i,s,o,a,l,c=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(o>1);return r}function Mc(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function dx(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Ps(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function fx(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!px(r,t)&&(br(r,t)&&br(t,r)&&mx(r,t)&&(ye(r.prev,r,t.prev)||ye(r,t.prev,t))||Ea(r,t)&&ye(r.prev,r,r.next)>0&&ye(t.prev,t,t.next)>0)}function ye(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Ea(r,t){return r.x===t.x&&r.y===t.y}function kd(r,t,e,n){const i=Ca(ye(r,t,e)),s=Ca(ye(r,t,n)),o=Ca(ye(e,n,r)),a=Ca(ye(e,n,t));return!!(i!==s&&o!==a||i===0&&Aa(r,e,t)||s===0&&Aa(r,n,t)||o===0&&Aa(e,r,n)||a===0&&Aa(e,t,n))}function Aa(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function Ca(r){return r>0?1:r<0?-1:0}function px(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&kd(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function br(r,t){return ye(r.prev,r,r.next)<0?ye(r,t,r.next)>=0&&ye(r,r.prev,t)>=0:ye(r,t,r.prev)<0||ye(r,r.next,t)<0}function mx(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Hd(r,t){const e=new Sc(r.i,r.x,r.y),n=new Sc(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Vd(r,t,e,n){const i=new Sc(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function wr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Sc(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function gx(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Pn{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return Pn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];Gd(t),Wd(n,t);let o=t.length;e.forEach(Gd);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,Wd(n,e[l]);const a=tx.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Gd(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Wd(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Ra extends Gt{constructor(t=new Oi([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Tt(i,3)),this.setAttribute("uv",new Tt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:vx;let _,y=!1,P,T,E,R;p&&(_=p.getSpacedPoints(h),y=!0,d=!1,P=p.computeFrenetFrames(h,!1),T=new C,E=new C,R=new C),d||(g=0,f=0,m=0,v=0);const b=a.extractPoints(c);let M=b.shape;const I=b.holes;if(!Pn.isClockWise(M)){M=M.reverse();for(let tt=0,rt=I.length;tt<rt;tt++){const L=I[tt];Pn.isClockWise(L)&&(I[tt]=L.reverse())}}const N=Pn.triangulateShape(M,I),z=M;for(let tt=0,rt=I.length;tt<rt;tt++){const L=I[tt];M=M.concat(L)}function q(tt,rt,L){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(rt,L)}const W=M.length,nt=N.length;function X(tt,rt,L){let It,it,St;const ht=tt.x-rt.x,Ft=tt.y-rt.y,_t=L.x-tt.x,A=L.y-tt.y,S=ht*ht+Ft*Ft,O=ht*A-Ft*_t;if(Math.abs(O)>Number.EPSILON){const Z=Math.sqrt(S),et=Math.sqrt(_t*_t+A*A),$=rt.x-Ft/Z,At=rt.y+ht/Z,ft=L.x-A/et,Mt=L.y+_t/et,Jt=((ft-$)*A-(Mt-At)*_t)/(ht*A-Ft*_t);It=$+ht*Jt-tt.x,it=At+Ft*Jt-tt.y;const st=It*It+it*it;if(st<=2)return new K(It,it);St=Math.sqrt(st/2)}else{let Z=!1;ht>Number.EPSILON?_t>Number.EPSILON&&(Z=!0):ht<-Number.EPSILON?_t<-Number.EPSILON&&(Z=!0):Math.sign(Ft)===Math.sign(A)&&(Z=!0),Z?(It=-Ft,it=ht,St=Math.sqrt(S)):(It=ht,it=Ft,St=Math.sqrt(S/2))}return new K(It/St,it/St)}const ct=[];for(let tt=0,rt=z.length,L=rt-1,It=tt+1;tt<rt;tt++,L++,It++)L===rt&&(L=0),It===rt&&(It=0),ct[tt]=X(z[tt],z[L],z[It]);const dt=[];let mt,Ot=ct.concat();for(let tt=0,rt=I.length;tt<rt;tt++){const L=I[tt];mt=[];for(let It=0,it=L.length,St=it-1,ht=It+1;It<it;It++,St++,ht++)St===it&&(St=0),ht===it&&(ht=0),mt[It]=X(L[It],L[St],L[ht]);dt.push(mt),Ot=Ot.concat(mt)}for(let tt=0;tt<g;tt++){const rt=tt/g,L=f*Math.cos(rt*Math.PI/2),It=m*Math.sin(rt*Math.PI/2)+v;for(let it=0,St=z.length;it<St;it++){const ht=q(z[it],ct[it],It);lt(ht.x,ht.y,-L)}for(let it=0,St=I.length;it<St;it++){const ht=I[it];mt=dt[it];for(let Ft=0,_t=ht.length;Ft<_t;Ft++){const A=q(ht[Ft],mt[Ft],It);lt(A.x,A.y,-L)}}}const oe=m+v;for(let tt=0;tt<W;tt++){const rt=d?q(M[tt],Ot[tt],oe):M[tt];y?(E.copy(P.normals[0]).multiplyScalar(rt.x),T.copy(P.binormals[0]).multiplyScalar(rt.y),R.copy(_[0]).add(E).add(T),lt(R.x,R.y,R.z)):lt(rt.x,rt.y,0)}for(let tt=1;tt<=h;tt++)for(let rt=0;rt<W;rt++){const L=d?q(M[rt],Ot[rt],oe):M[rt];y?(E.copy(P.normals[tt]).multiplyScalar(L.x),T.copy(P.binormals[tt]).multiplyScalar(L.y),R.copy(_[tt]).add(E).add(T),lt(R.x,R.y,R.z)):lt(L.x,L.y,u/h*tt)}for(let tt=g-1;tt>=0;tt--){const rt=tt/g,L=f*Math.cos(rt*Math.PI/2),It=m*Math.sin(rt*Math.PI/2)+v;for(let it=0,St=z.length;it<St;it++){const ht=q(z[it],ct[it],It);lt(ht.x,ht.y,u+L)}for(let it=0,St=I.length;it<St;it++){const ht=I[it];mt=dt[it];for(let Ft=0,_t=ht.length;Ft<_t;Ft++){const A=q(ht[Ft],mt[Ft],It);y?lt(A.x,A.y+_[h-1].y,_[h-1].x+L):lt(A.x,A.y,u+L)}}}Q(),ot();function Q(){const tt=i.length/3;if(d){let rt=0,L=W*rt;for(let It=0;It<nt;It++){const it=N[It];Dt(it[2]+L,it[1]+L,it[0]+L)}rt=h+g*2,L=W*rt;for(let It=0;It<nt;It++){const it=N[It];Dt(it[0]+L,it[1]+L,it[2]+L)}}else{for(let rt=0;rt<nt;rt++){const L=N[rt];Dt(L[2],L[1],L[0])}for(let rt=0;rt<nt;rt++){const L=N[rt];Dt(L[0]+W*h,L[1]+W*h,L[2]+W*h)}}n.addGroup(tt,i.length/3-tt,0)}function ot(){const tt=i.length/3;let rt=0;Et(z,rt),rt+=z.length;for(let L=0,It=I.length;L<It;L++){const it=I[L];Et(it,rt),rt+=it.length}n.addGroup(tt,i.length/3-tt,1)}function Et(tt,rt){let L=tt.length;for(;--L>=0;){const It=L;let it=L-1;it<0&&(it=tt.length-1);for(let St=0,ht=h+g*2;St<ht;St++){const Ft=W*St,_t=W*(St+1),A=rt+It+Ft,S=rt+it+Ft,O=rt+it+_t,Z=rt+It+_t;kt(A,S,O,Z)}}}function lt(tt,rt,L){l.push(tt),l.push(rt),l.push(L)}function Dt(tt,rt,L){Bt(tt),Bt(rt),Bt(L);const It=i.length/3,it=x.generateTopUV(n,i,It-3,It-2,It-1);se(it[0]),se(it[1]),se(it[2])}function kt(tt,rt,L,It){Bt(tt),Bt(rt),Bt(It),Bt(rt),Bt(L),Bt(It);const it=i.length/3,St=x.generateSideWallUV(n,i,it-6,it-3,it-2,it-1);se(St[0]),se(St[1]),se(St[3]),se(St[1]),se(St[2]),se(St[3])}function Bt(tt){i.push(l[tt*3+0]),i.push(l[tt*3+1]),i.push(l[tt*3+2])}function se(tt){s.push(tt.x),s.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return yx(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new _a[i.type]().fromJSON(i)),new Ra(n,t.options)}}const vx={generateTopUV:function(r,t,e,n,i){const s=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new K(s,o),new K(a,l),new K(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],m=t[i*3+2],v=t[s*3],g=t[s*3+1],p=t[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new K(o,1-l),new K(c,1-u),new K(d,1-m),new K(v,1-p)]:[new K(a,1-l),new K(h,1-u),new K(f,1-m),new K(g,1-p)]}};function yx(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Pa extends di{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Pa(t.radius,t.detail)}}class vn extends di{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vn(t.radius,t.detail)}}class Is extends Gt{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new C,m=new K;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const p=s+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let v=0;v<i;v++){const g=v*(n+1);for(let p=0;p<n;p++){const x=p+g,_=x,y=x+n+1,P=x+n+2,T=x+1;a.push(_,y,T),a.push(y,P,T)}}this.setIndex(a),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(c,3)),this.setAttribute("uv",new Tt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Is(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ia extends Gt{constructor(t=new Oi([new K(0,.5),new K(-.5,-.5),new K(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Tt(i,3)),this.setAttribute("normal",new Tt(s,3)),this.setAttribute("uv",new Tt(o,2));function c(h){const u=i.length/3,d=h.extractPoints(e);let f=d.shape;const m=d.holes;Pn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const x=m[g];Pn.isClockWise(x)===!0&&(m[g]=x.reverse())}const v=Pn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const x=m[g];f=f.concat(x)}for(let g=0,p=f.length;g<p;g++){const x=f[g];i.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let g=0,p=v.length;g<p;g++){const x=v[g],_=x[0]+u,y=x[1]+u,P=x[2]+u;n.push(_,y,P),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return xx(e,t)}static fromJSON(t,e){const n=[];for(let i=0,s=t.shapes.length;i<s;i++){const o=e[t.shapes[i]];n.push(o)}return new Ia(n,t.curveSegments)}}function xx(r,t){if(t.shapes=[],Array.isArray(r))for(let e=0,n=r.length;e<n;e++){const i=r[e];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t}class ln extends Gt{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const x=[],_=p/n;let y=0;p===0&&o===0?y=.5/e:p===n&&l===Math.PI&&(y=-.5/e);for(let P=0;P<=e;P++){const T=P/e;u.x=-t*Math.cos(i+T*s)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(i+T*s)*Math.sin(o+_*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(T+y,1-_),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){const _=h[p][x+1],y=h[p][x],P=h[p+1][x],T=h[p+1][x+1];(p!==0||o>0)&&f.push(_,y,T),(p!==n-1||l<Math.PI)&&f.push(y,P,T)}this.setIndex(f),this.setAttribute("position",new Tt(m,3)),this.setAttribute("normal",new Tt(v,3)),this.setAttribute("uv",new Tt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class La extends di{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new La(t.radius,t.detail)}}class ki extends Gt{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const v=m/i*s,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(v),u.y=(t+e*Math.cos(g))*Math.sin(v),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const v=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,x=(i+1)*f+m;o.push(v,g,x),o.push(g,p,x)}this.setIndex(o),this.setAttribute("position",new Tt(a,3)),this.setAttribute("normal",new Tt(l,3)),this.setAttribute("uv",new Tt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Da extends Gt{constructor(t=1,e=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],l=[],c=[],h=[],u=new C,d=new C,f=new C,m=new C,v=new C,g=new C,p=new C;for(let _=0;_<=n;++_){const y=_/n*s*Math.PI*2;x(y,s,o,t,f),x(y+.01,s,o,t,m),g.subVectors(m,f),p.addVectors(m,f),v.crossVectors(g,p),p.crossVectors(v,g),v.normalize(),p.normalize();for(let P=0;P<=i;++P){const T=P/i*Math.PI*2,E=-e*Math.cos(T),R=e*Math.sin(T);u.x=f.x+(E*p.x+R*v.x),u.y=f.y+(E*p.y+R*v.y),u.z=f.z+(E*p.z+R*v.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(_/n),h.push(P/i)}}for(let _=1;_<=n;_++)for(let y=1;y<=i;y++){const P=(i+1)*(_-1)+(y-1),T=(i+1)*_+(y-1),E=(i+1)*_+y,R=(i+1)*(_-1)+y;a.push(P,T,R),a.push(T,E,R)}this.setIndex(a),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(c,3)),this.setAttribute("uv",new Tt(h,2));function x(_,y,P,T,E){const R=Math.cos(_),b=Math.sin(_),M=P/y*_,I=Math.cos(M);E.x=T*(2+I)*.5*R,E.y=T*(2+I)*b*.5,E.z=T*Math.sin(M)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Da(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class Ua extends Gt{constructor(t=new yc(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new C,l=new C,c=new K;let h=new C;const u=[],d=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new Tt(u,3)),this.setAttribute("normal",new Tt(d,3)),this.setAttribute("uv",new Tt(f,2));function v(){for(let _=0;_<e;_++)g(_);g(s===!1?e:0),x(),p()}function g(_){h=t.getPointAt(_/e,h);const y=o.normals[_],P=o.binormals[_];for(let T=0;T<=i;T++){const E=T/i*Math.PI*2,R=Math.sin(E),b=-Math.cos(E);l.x=b*y.x+R*P.x,l.y=b*y.y+R*P.y,l.z=b*y.z+R*P.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=e;_++)for(let y=1;y<=i;y++){const P=(i+1)*(_-1)+(y-1),T=(i+1)*_+(y-1),E=(i+1)*_+y,R=(i+1)*(_-1)+y;m.push(P,T,R),m.push(T,E,R)}}function x(){for(let _=0;_<=e;_++)for(let y=0;y<=i;y++)c.x=_/e,c.y=y/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ua(new _a[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Xd extends Gt{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,i=new C,s=new C;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,f=u.count;for(let m=d,v=d+f;m<v;m+=3)for(let g=0;g<3;g++){const p=a.getX(m+g),x=a.getX(m+(g+1)%3);i.fromBufferAttribute(o,p),s.fromBufferAttribute(o,x),Yd(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;i.fromBufferAttribute(o,h),s.fromBufferAttribute(o,u),Yd(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new Tt(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Yd(r,t,e){const n=`${r.x},${r.y},${r.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${r.x},${r.y},${r.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}var qd=Object.freeze({__proto__:null,BoxGeometry:xt,CapsuleGeometry:Ma,CircleGeometry:Mr,ConeGeometry:ui,CylinderGeometry:gn,DodecahedronGeometry:Sa,EdgesGeometry:Od,ExtrudeGeometry:Ra,IcosahedronGeometry:Pa,LatheGeometry:_r,OctahedronGeometry:vn,PlaneGeometry:Yn,PolyhedronGeometry:di,RingGeometry:Is,ShapeGeometry:Ia,SphereGeometry:ln,TetrahedronGeometry:La,TorusGeometry:ki,TorusKnotGeometry:Da,TubeGeometry:Ua,WireframeGeometry:Xd});class Zd extends De{static get type(){return"ShadowMaterial"}constructor(t){super(),this.isShadowMaterial=!0,this.color=new G(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class $d extends He{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class he extends De{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new G(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Kd extends he{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new K(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new G(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new G(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new G(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Jd extends De{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new G(16777215),this.specular=new G(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Ds,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Qd extends De{static get type(){return"MeshToonMaterial"}constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new G(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class jd extends De{static get type(){return"MeshNormalMaterial"}constructor(t){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class tf extends De{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Ds,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ef extends De{static get type(){return"MeshMatcapMaterial"}constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new G(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nf extends Ge{static get type(){return"LineDashedMaterial"}constructor(t){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}function Hi(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function sf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function rf(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function bc(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=e[s]*t;for(let l=0;l!==t;++l)i[o++]=r[a+l]}return i}function wc(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(t.push(s.time),e.push.apply(e,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(t.push(s.time),o.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(t.push(s.time),e.push(o)),s=r[i++];while(s!==void 0)}function _x(r,t,e,n,i=30){const s=r.clone();s.name=t;const o=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const m=c.times[f]*i;if(!(m<e||m>=n)){u.push(c.times[f]);for(let v=0;v<h;++v)d.push(c.values[f*h+v])}}u.length!==0&&(c.times=Hi(u,c.times.constructor),c.values=Hi(d,c.values.constructor),o.push(c))}s.tracks=o;let a=1/0;for(let l=0;l<s.tracks.length;++l)a>s.tracks[l].times[0]&&(a=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*a);return s.resetDuration(),s}function Mx(r,t=0,e=r,n=30){n<=0&&(n=30);const i=e.tracks.length,s=t/n;for(let o=0;o<i;++o){const a=e.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(p){return p.name===a.name&&p.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const m=a.times.length-1;let v;if(s<=a.times[0]){const p=h,x=u-h;v=a.values.slice(p,x)}else if(s>=a.times[m]){const p=m*u+h,x=p+u-h;v=a.values.slice(p,x)}else{const p=a.createInterpolant(),x=h,_=u-h;p.evaluate(s),v=p.resultBuffer.slice(x,_)}l==="quaternion"&&new qe().fromArray(v).normalize().conjugate().toArray(v);const g=c.times.length;for(let p=0;p<g;++p){const x=p*f+d;if(l==="quaternion")qe.multiplyQuaternionsFlat(c.values,x,v,0,c.values,x);else{const _=f-d*2;for(let y=0;y<_;++y)c.values[x+y]-=v[y]}}}return r.blendMode=pl,r}const Sx={convertArray:Hi,isTypedArray:sf,getKeyframeOrder:rf,sortedArray:bc,flattenJSON:wc,subclip:_x,makeClipAdditive:Mx};class Tr{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){const a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class of extends Tr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mi,endingEnd:Mi}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Si:s=t,a=2*e-n;break;case Ys:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Si:o=t,l=2*n-e;break;case Ys:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(i-e),v=m*m,g=v*m,p=-d*g+2*d*v-d*m,x=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*m+1,_=(-1-f)*g+(1.5+f)*v+.5*m,y=f*g-f*v;for(let P=0;P!==a;++P)s[P]=p*o[h+P]+x*o[c+P]+_*o[l+P]+y*o[u+P];return s}}class Tc extends Tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}}class af extends Tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class yn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Hi(e,this.TimeBufferType),this.values=Hi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Hi(t.times,Array),values:Hi(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new af(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Tc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new of(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Xs:e=this.InterpolantFactoryMethodDiscrete;break;case To:e=this.InterpolantFactoryMethodLinear;break;case Eo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xs;case this.InterpolantFactoryMethodLinear:return To;case this.InterpolantFactoryMethodSmooth:return Eo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&sf(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Eo,s=t.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const v=e[u+m];if(v!==e[d+m]||v!==e[f+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}yn.prototype.TimeBufferType=Float32Array,yn.prototype.ValueBufferType=Float32Array,yn.prototype.DefaultInterpolation=To;class Vi extends yn{constructor(t,e,n){super(t,e,n)}}Vi.prototype.ValueTypeName="bool",Vi.prototype.ValueBufferType=Array,Vi.prototype.DefaultInterpolation=Xs,Vi.prototype.InterpolantFactoryMethodLinear=void 0,Vi.prototype.InterpolantFactoryMethodSmooth=void 0;class Ec extends yn{}Ec.prototype.ValueTypeName="color";class Er extends yn{}Er.prototype.ValueTypeName="number";class lf extends Tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e);let c=t*a;for(let h=c+a;c!==h;c+=4)qe.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Ar extends yn{InterpolantFactoryMethodLinear(t){return new lf(this.times,this.values,this.getValueSize(),t)}}Ar.prototype.ValueTypeName="quaternion",Ar.prototype.InterpolantFactoryMethodSmooth=void 0;class Gi extends yn{constructor(t,e,n){super(t,e,n)}}Gi.prototype.ValueTypeName="string",Gi.prototype.ValueBufferType=Array,Gi.prototype.DefaultInterpolation=Xs,Gi.prototype.InterpolantFactoryMethodLinear=void 0,Gi.prototype.InterpolantFactoryMethodSmooth=void 0;class Cr extends yn{}Cr.prototype.ValueTypeName="vector";class Rr{constructor(t="",e=-1,n=[],i=Ao){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=je(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(wx(n[o]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,o=n.length;s!==o;++s)e.push(yn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=rf(l);l=bc(l,1,h),c=bc(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Er(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){const c=t[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,v){if(f.length!==0){const g=[],p=[];wc(f,g,p,m),g.length!==0&&v.push(new u(d,g,p))}},i=[],s=t.name||"default",o=t.fps||30,a=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let v=0;v<d[m].morphTargets.length;v++)f[d[m].morphTargets[v]]=-1;for(const v in f){const g=[],p=[];for(let x=0;x!==d[m].morphTargets.length;++x){const _=d[m];g.push(_.time),p.push(_.morphTarget===v?1:0)}i.push(new Er(".morphTargetInfluence["+v+"]",g,p))}l=f.length*o}else{const f=".bones["+e[u].name+"]";n(Cr,f+".position",d,"pos",i),n(Ar,f+".quaternion",d,"rot",i),n(Cr,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function bx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Er;case"vector":case"vector2":case"vector3":case"vector4":return Cr;case"color":return Ec;case"quaternion":return Ar;case"bool":case"boolean":return Vi;case"string":return Gi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function wx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=bx(r.type);if(r.times===void 0){const e=[],n=[];wc(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const Zn={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Ac{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const cf=new Ac;class Je{constructor(t){this.manager=t!==void 0?t:cf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Je.DEFAULT_MATERIAL_NAME="__DEFAULT";const $n={};class Tx extends Error{constructor(t,e){super(t),this.response=e}}class Kn extends Je{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=Zn.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if($n[t]!==void 0){$n[t].push({onLoad:e,onProgress:n,onError:i});return}$n[t]=[],$n[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=$n[t],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let v=0;const g=new ReadableStream({start(p){x();function x(){u.read().then(({done:_,value:y})=>{if(_)p.close();else{v+=y.byteLength;const P=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:f});for(let T=0,E=h.length;T<E;T++){const R=h[T];R.onProgress&&R.onProgress(P)}p.enqueue(y),x()}},_=>{p.error(_)})}}});return new Response(g)}else throw new Tx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{Zn.add(t,c);const h=$n[t];delete $n[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=$n[t];if(h===void 0)throw this.manager.itemError(t),c;delete $n[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Ex extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new Kn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e=[];for(let n=0;n<t.length;n++){const i=Rr.parse(t[n]);e.push(i)}return e}}class Ax extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,o=[],a=new va,l=new Kn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function h(u){l.load(t[u],function(d){const f=s.parse(d,!0);o[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=de),a.image=o,a.format=f.format,a.needsUpdate=!0,e&&e(a))},n,i)}if(Array.isArray(t))for(let u=0,d=t.length;u<d;++u)h(u);else l.load(t,function(u){const d=s.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let m=0;m<f;m++){o[m]={mipmaps:[]};for(let v=0;v<d.mipmapCount;v++)o[m].mipmaps.push(d.mipmaps[m*d.mipmapCount+v]),o[m].format=d.format,o[m].width=d.width,o[m].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=de),a.format=d.format,a.needsUpdate=!0,e&&e(a)},n,i);return a}}class Pr extends Je{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Zn.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=Js("img");function l(){h(),Zn.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class Cx extends Je{constructor(t){super(t)}load(t,e,n,i){const s=new sr;s.colorSpace=Be;const o=new Pr(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(t[c],function(h){s.images[c]=h,a++,a===6&&(s.needsUpdate=!0,e&&e(s))},void 0,i)}for(let c=0;c<t.length;++c)l(c);return s}}class Rx extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new Cn,a=new Kn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(t,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:We,o.wrapT=c.wrapT!==void 0?c.wrapT:We,o.magFilter=c.magFilter!==void 0?c.magFilter:de,o.minFilter=c.minFilter!==void 0?c.minFilter:de,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=bn),c.mipmapCount===1&&(o.minFilter=de),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,e&&e(o,c)},n,i),o}}class Px extends Je{constructor(t){super(t)}load(t,e,n,i){const s=new ve,o=new Pr(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class Jn extends ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new G(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Fa extends Jn{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new G(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Cc=new Ut,hf=new C,uf=new C;class Rc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rr,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new Kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;hf.setFromMatrixPosition(t.matrixWorld),e.position.copy(hf),uf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(uf),e.updateMatrixWorld(),Cc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Cc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ix extends Rc{constructor(){super(new Te(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=ns*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class df extends Jn{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ee.DEFAULT_UP),this.updateMatrix(),this.target=new ee,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Ix}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const ff=new Ut,Ir=new C,Pc=new C;class Lx extends Rc{constructor(){super(new Te(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new K(4,2),this._viewportCount=6,this._viewports=[new Kt(2,1,1,1),new Kt(0,1,1,1),new Kt(3,1,1,1),new Kt(1,1,1,1),new Kt(3,0,1,1),new Kt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ir.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ir),Pc.copy(n.position),Pc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Pc),n.updateMatrixWorld(),i.makeTranslation(-Ir.x,-Ir.y,-Ir.z),ff.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ff)}}class Qn extends Jn{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Lx}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Dx extends Rc{constructor(){super(new or(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Na extends Jn{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ee.DEFAULT_UP),this.updateMatrix(),this.target=new ee,this.shadow=new Dx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class pf extends Jn{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class mf extends Jn{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}class gf{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new C)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){const n=t.x,i=t.y,s=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.282095),e.addScaledVector(o[1],.488603*i),e.addScaledVector(o[2],.488603*s),e.addScaledVector(o[3],.488603*n),e.addScaledVector(o[4],1.092548*(n*i)),e.addScaledVector(o[5],1.092548*(i*s)),e.addScaledVector(o[6],.315392*(3*s*s-1)),e.addScaledVector(o[7],1.092548*(n*s)),e.addScaledVector(o[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){const n=t.x,i=t.y,s=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.886227),e.addScaledVector(o[1],1.023328*i),e.addScaledVector(o[2],1.023328*s),e.addScaledVector(o[3],1.023328*n),e.addScaledVector(o[4],.858086*n*i),e.addScaledVector(o[5],.858086*i*s),e.addScaledVector(o[6],.743125*s*s-.247708),e.addScaledVector(o[7],.858086*n*s),e.addScaledVector(o[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){const n=t.x,i=t.y,s=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*s,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*s,e[6]=.315392*(3*s*s-1),e[7]=1.092548*n*s,e[8]=.546274*(n*n-i*i)}}class vf extends Jn{constructor(t=new gf,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(t.sh),this}toJSON(t){const e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}class Ba extends Je{constructor(t){super(t),this.textures={}}load(t,e,n,i){const s=this,o=new Kn(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e=this.textures;function n(s){return e[s]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",s),e[s]}const i=this.createMaterialFromType(t.type);if(t.uuid!==void 0&&(i.uuid=t.uuid),t.name!==void 0&&(i.name=t.name),t.color!==void 0&&i.color!==void 0&&i.color.setHex(t.color),t.roughness!==void 0&&(i.roughness=t.roughness),t.metalness!==void 0&&(i.metalness=t.metalness),t.sheen!==void 0&&(i.sheen=t.sheen),t.sheenColor!==void 0&&(i.sheenColor=new G().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(i.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(t.emissive),t.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(t.specular),t.specularIntensity!==void 0&&(i.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(i.shininess=t.shininess),t.clearcoat!==void 0&&(i.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(i.dispersion=t.dispersion),t.iridescence!==void 0&&(i.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(i.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(i.transmission=t.transmission),t.thickness!==void 0&&(i.thickness=t.thickness),t.attenuationDistance!==void 0&&(i.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(i.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(i.fog=t.fog),t.flatShading!==void 0&&(i.flatShading=t.flatShading),t.blending!==void 0&&(i.blending=t.blending),t.combine!==void 0&&(i.combine=t.combine),t.side!==void 0&&(i.side=t.side),t.shadowSide!==void 0&&(i.shadowSide=t.shadowSide),t.opacity!==void 0&&(i.opacity=t.opacity),t.transparent!==void 0&&(i.transparent=t.transparent),t.alphaTest!==void 0&&(i.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(i.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(i.depthFunc=t.depthFunc),t.depthTest!==void 0&&(i.depthTest=t.depthTest),t.depthWrite!==void 0&&(i.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(i.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(i.blendSrc=t.blendSrc),t.blendDst!==void 0&&(i.blendDst=t.blendDst),t.blendEquation!==void 0&&(i.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(i.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(i.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(i.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(i.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(i.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(i.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(i.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(i.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(i.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(i.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(i.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(i.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(i.rotation=t.rotation),t.linewidth!==void 0&&(i.linewidth=t.linewidth),t.dashSize!==void 0&&(i.dashSize=t.dashSize),t.gapSize!==void 0&&(i.gapSize=t.gapSize),t.scale!==void 0&&(i.scale=t.scale),t.polygonOffset!==void 0&&(i.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(i.dithering=t.dithering),t.alphaToCoverage!==void 0&&(i.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(i.forceSinglePass=t.forceSinglePass),t.visible!==void 0&&(i.visible=t.visible),t.toneMapped!==void 0&&(i.toneMapped=t.toneMapped),t.userData!==void 0&&(i.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?i.vertexColors=t.vertexColors>0:i.vertexColors=t.vertexColors),t.uniforms!==void 0)for(const s in t.uniforms){const o=t.uniforms[s];switch(i.uniforms[s]={},o.type){case"t":i.uniforms[s].value=n(o.value);break;case"c":i.uniforms[s].value=new G().setHex(o.value);break;case"v2":i.uniforms[s].value=new K().fromArray(o.value);break;case"v3":i.uniforms[s].value=new C().fromArray(o.value);break;case"v4":i.uniforms[s].value=new Kt().fromArray(o.value);break;case"m3":i.uniforms[s].value=new Vt().fromArray(o.value);break;case"m4":i.uniforms[s].value=new Ut().fromArray(o.value);break;default:i.uniforms[s].value=o.value}}if(t.defines!==void 0&&(i.defines=t.defines),t.vertexShader!==void 0&&(i.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(i.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(i.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)i.extensions[s]=t.extensions[s];if(t.lights!==void 0&&(i.lights=t.lights),t.clipping!==void 0&&(i.clipping=t.clipping),t.size!==void 0&&(i.size=t.size),t.sizeAttenuation!==void 0&&(i.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(i.map=n(t.map)),t.matcap!==void 0&&(i.matcap=n(t.matcap)),t.alphaMap!==void 0&&(i.alphaMap=n(t.alphaMap)),t.bumpMap!==void 0&&(i.bumpMap=n(t.bumpMap)),t.bumpScale!==void 0&&(i.bumpScale=t.bumpScale),t.normalMap!==void 0&&(i.normalMap=n(t.normalMap)),t.normalMapType!==void 0&&(i.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new K().fromArray(s)}return t.displacementMap!==void 0&&(i.displacementMap=n(t.displacementMap)),t.displacementScale!==void 0&&(i.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(i.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(i.roughnessMap=n(t.roughnessMap)),t.metalnessMap!==void 0&&(i.metalnessMap=n(t.metalnessMap)),t.emissiveMap!==void 0&&(i.emissiveMap=n(t.emissiveMap)),t.emissiveIntensity!==void 0&&(i.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(i.specularMap=n(t.specularMap)),t.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(t.specularIntensityMap)),t.specularColorMap!==void 0&&(i.specularColorMap=n(t.specularColorMap)),t.envMap!==void 0&&(i.envMap=n(t.envMap)),t.envMapRotation!==void 0&&i.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(i.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(i.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(i.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(i.lightMap=n(t.lightMap)),t.lightMapIntensity!==void 0&&(i.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(i.aoMap=n(t.aoMap)),t.aoMapIntensity!==void 0&&(i.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(i.gradientMap=n(t.gradientMap)),t.clearcoatMap!==void 0&&(i.clearcoatMap=n(t.clearcoatMap)),t.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(t.clearcoatRoughnessMap)),t.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(t.clearcoatNormalMap)),t.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new K().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(i.iridescenceMap=n(t.iridescenceMap)),t.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(t.iridescenceThicknessMap)),t.transmissionMap!==void 0&&(i.transmissionMap=n(t.transmissionMap)),t.thicknessMap!==void 0&&(i.thicknessMap=n(t.thicknessMap)),t.anisotropyMap!==void 0&&(i.anisotropyMap=n(t.anisotropyMap)),t.sheenColorMap!==void 0&&(i.sheenColorMap=n(t.sheenColorMap)),t.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(t.sheenRoughnessMap)),i}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return Ba.createMaterialFromType(t)}static createMaterialFromType(t){const e={ShadowMaterial:Zd,SpriteMaterial:ec,RawShaderMaterial:$d,ShaderMaterial:He,PointsMaterial:mr,MeshPhysicalMaterial:Kd,MeshStandardMaterial:he,MeshPhongMaterial:Jd,MeshToonMaterial:Qd,MeshNormalMaterial:jd,MeshLambertMaterial:tf,MeshDepthMaterial:Jl,MeshDistanceMaterial:Ql,MeshBasicMaterial:fn,MeshMatcapMaterial:ef,LineDashedMaterial:nf,LineBasicMaterial:Ge,Material:De};return new e[t]}}class Ic{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class yf extends Gt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class xf extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new Kn(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e={},n={};function i(f,m){if(e[m]!==void 0)return e[m];const g=f.interleavedBuffers[m],p=s(f,g.buffer),x=is(g.type,p),_=new ea(x,g.stride);return _.uuid=g.uuid,e[m]=_,_}function s(f,m){if(n[m]!==void 0)return n[m];const g=f.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}const o=t.isInstancedBufferGeometry?new yf:new Gt,a=t.data.index;if(a!==void 0){const f=is(a.type,a.array);o.setIndex(new ne(f,1))}const l=t.data.attributes;for(const f in l){const m=l[f];let v;if(m.isInterleavedBufferAttribute){const g=i(t.data,m.data);v=new Fi(g,m.itemSize,m.offset,m.normalized)}else{const g=is(m.type,m.array),p=m.isInstancedBufferAttribute?Cs:ne;v=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(v.name=m.name),m.usage!==void 0&&v.setUsage(m.usage),o.setAttribute(f,v)}const c=t.data.morphAttributes;if(c)for(const f in c){const m=c[f],v=[];for(let g=0,p=m.length;g<p;g++){const x=m[g];let _;if(x.isInterleavedBufferAttribute){const y=i(t.data,x.data);_=new Fi(y,x.itemSize,x.offset,x.normalized)}else{const y=is(x.type,x.array);_=new ne(y,x.itemSize,x.normalized)}x.name!==void 0&&(_.name=x.name),v.push(_)}o.morphAttributes[f]=v}t.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const u=t.data.groups||t.data.drawcalls||t.data.offsets;if(u!==void 0)for(let f=0,m=u.length;f!==m;++f){const v=u[f];o.addGroup(v.start,v.count,v.materialIndex)}const d=t.data.boundingSphere;if(d!==void 0){const f=new C;d.center!==void 0&&f.fromArray(d.center),o.boundingSphere=new Ie(f,d.radius)}return t.name&&(o.name=t.name),t.userData&&(o.userData=t.userData),o}}class Ux extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,o=this.path===""?Ic.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||o;const a=new Kn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+t+".",u.message);return}const h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+t)),console.error("THREE.ObjectLoader: Can't load "+t);return}s.parse(c,e)},n,i)}async loadAsync(t,e){const n=this,i=this.path===""?Ic.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;const s=new Kn(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const o=await s.loadAsync(t,e),a=JSON.parse(o),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(a)}parse(t,e){const n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),s=this.parseGeometries(t.geometries,i),o=this.parseImages(t.images,function(){e!==void 0&&e(c)}),a=this.parseTextures(t.textures,o),l=this.parseMaterials(t.materials,a),c=this.parseObject(t.object,s,l,a,n),h=this.parseSkeletons(t.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),e!==void 0){let u=!1;for(const d in o)if(o[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&e(c)}return c}async parseAsync(t){const e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),s=await this.parseImagesAsync(t.images),o=this.parseTextures(t.textures,s),a=this.parseMaterials(t.materials,o),l=this.parseObject(t.object,i,a,o,e),c=this.parseSkeletons(t.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(t){const e={};if(t!==void 0)for(let n=0,i=t.length;n<i;n++){const s=new Oi().fromJSON(t[n]);e[s.uuid]=s}return e}parseSkeletons(t,e){const n={},i={};if(e.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),t!==void 0)for(let s=0,o=t.length;s<o;s++){const a=new aa().fromJSON(t[s],i);n[a.uuid]=a}return n}parseGeometries(t,e){const n={};if(t!==void 0){const i=new xf;for(let s=0,o=t.length;s<o;s++){let a;const l=t[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in qd?a=qd[l.type].fromJSON(l,e):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(t,e){const n={},i={};if(t!==void 0){const s=new Ba;s.setTextures(e);for(let o=0,a=t.length;o<a;o++){const l=t[o];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(t){const e={};if(t!==void 0)for(let n=0;n<t.length;n++){const i=t[n],s=Rr.parse(i);e[s.uuid]=s}return e}parseImages(t,e){const n=this,i={};let s;function o(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(h)}else return l.data?{data:is(l.type,l.data),width:l.width,height:l.height}:null}if(t!==void 0&&t.length>0){const l=new Ac(e);s=new Pr(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,h=t.length;c<h;c++){const u=t[c],d=u.url;if(Array.isArray(d)){const f=[];for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a(g);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new Cn(p.data,p.width,p.height)))}i[u.uuid]=new Ei(f)}else{const f=a(u.url);i[u.uuid]=new Ei(f)}}}return i}async parseImagesAsync(t){const e=this,n={};let i;async function s(o){if(typeof o=="string"){const a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:e.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:is(o.type,o.data),width:o.width,height:o.height}:null}if(t!==void 0&&t.length>0){i=new Pr(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=t.length;o<a;o++){const l=t[o],c=l.url;if(Array.isArray(c)){const h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u],m=await s(f);m!==null&&(m instanceof HTMLImageElement?h.push(m):h.push(new Cn(m.data,m.width,m.height)))}n[l.uuid]=new Ei(h)}else{const h=await s(l.url);n[l.uuid]=new Ei(h)}}}return n}parseTextures(t,e){function n(s,o){return typeof s=="number"?s:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",s),o[s])}const i={};if(t!==void 0)for(let s=0,o=t.length;s<o;s++){const a=t[s];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),e[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const l=e[a.image],c=l.data;let h;Array.isArray(c)?(h=new sr,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new Cn:h=new ve,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,Fx)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],_f),h.wrapT=n(a.wrap[1],_f)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,Mf)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,Mf)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(t,e,n,i,s){let o;function a(d){return e[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),e[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let m=0,v=d.length;m<v;m++){const g=d[m];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(t.type){case"Scene":o=new bs,t.background!==void 0&&(Number.isInteger(t.background)?o.background=new G(t.background):o.background=c(t.background)),t.environment!==void 0&&(o.environment=c(t.environment)),t.fog!==void 0&&(t.fog.type==="Fog"?o.fog=new ta(t.fog.color,t.fog.near,t.fog.far):t.fog.type==="FogExp2"&&(o.fog=new Ss(t.fog.color,t.fog.density)),t.fog.name!==""&&(o.fog.name=t.fog.name)),t.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=t.backgroundBlurriness),t.backgroundIntensity!==void 0&&(o.backgroundIntensity=t.backgroundIntensity),t.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(t.backgroundRotation),t.environmentIntensity!==void 0&&(o.environmentIntensity=t.environmentIntensity),t.environmentRotation!==void 0&&o.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":o=new Te(t.fov,t.aspect,t.near,t.far),t.focus!==void 0&&(o.focus=t.focus),t.zoom!==void 0&&(o.zoom=t.zoom),t.filmGauge!==void 0&&(o.filmGauge=t.filmGauge),t.filmOffset!==void 0&&(o.filmOffset=t.filmOffset),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"OrthographicCamera":o=new or(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0&&(o.zoom=t.zoom),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"AmbientLight":o=new pf(t.color,t.intensity);break;case"DirectionalLight":o=new Na(t.color,t.intensity),o.target=t.target||"";break;case"PointLight":o=new Qn(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":o=new mf(t.color,t.intensity,t.width,t.height);break;case"SpotLight":o=new df(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),o.target=t.target||"";break;case"HemisphereLight":o=new Fa(t.color,t.groundColor,t.intensity);break;case"LightProbe":o=new vf().fromJSON(t);break;case"SkinnedMesh":h=a(t.geometry),u=l(t.material),o=new vd(h,u),t.bindMode!==void 0&&(o.bindMode=t.bindMode),t.bindMatrix!==void 0&&o.bindMatrix.fromArray(t.bindMatrix),t.skeleton!==void 0&&(o.skeleton=t.skeleton);break;case"Mesh":h=a(t.geometry),u=l(t.material),o=new J(h,u);break;case"InstancedMesh":h=a(t.geometry),u=l(t.material);const d=t.count,f=t.instanceMatrix,m=t.instanceColor;o=new Md(h,u,d),o.instanceMatrix=new Cs(new Float32Array(f.array),16),m!==void 0&&(o.instanceColor=new Cs(new Float32Array(m.array),m.itemSize));break;case"BatchedMesh":h=a(t.geometry),u=l(t.material),o=new bd(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,u),o.geometry=h,o.perObjectFrustumCulled=t.perObjectFrustumCulled,o.sortObjects=t.sortObjects,o._drawRanges=t.drawRanges,o._reservedRanges=t.reservedRanges,o._visibility=t.visibility,o._active=t.active,o._bounds=t.bounds.map(v=>{const g=new ze;g.min.fromArray(v.boxMin),g.max.fromArray(v.boxMax);const p=new Ie;return p.radius=v.sphereRadius,p.center.fromArray(v.sphereCenter),{boxInitialized:v.boxInitialized,box:g,sphereInitialized:v.sphereInitialized,sphere:p}}),o._maxInstanceCount=t.maxInstanceCount,o._maxVertexCount=t.maxVertexCount,o._maxIndexCount=t.maxIndexCount,o._geometryInitialized=t.geometryInitialized,o._geometryCount=t.geometryCount,o._matricesTexture=c(t.matricesTexture.uuid),t.colorsTexture!==void 0&&(o._colorsTexture=c(t.colorsTexture.uuid));break;case"LOD":o=new ud;break;case"Line":o=new qn(a(t.geometry),l(t.material));break;case"LineLoop":o=new Cd(a(t.geometry),l(t.material));break;case"LineSegments":o=new Rn(a(t.geometry),l(t.material));break;case"PointCloud":case"Points":o=new gr(a(t.geometry),l(t.material));break;case"Sprite":o=new cd(l(t.material));break;case"Group":o=new jt;break;case"Bone":o=new rc;break;default:o=new ee}if(o.uuid=t.uuid,t.name!==void 0&&(o.name=t.name),t.matrix!==void 0?(o.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=t.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(t.position!==void 0&&o.position.fromArray(t.position),t.rotation!==void 0&&o.rotation.fromArray(t.rotation),t.quaternion!==void 0&&o.quaternion.fromArray(t.quaternion),t.scale!==void 0&&o.scale.fromArray(t.scale)),t.up!==void 0&&o.up.fromArray(t.up),t.castShadow!==void 0&&(o.castShadow=t.castShadow),t.receiveShadow!==void 0&&(o.receiveShadow=t.receiveShadow),t.shadow&&(t.shadow.intensity!==void 0&&(o.shadow.intensity=t.shadow.intensity),t.shadow.bias!==void 0&&(o.shadow.bias=t.shadow.bias),t.shadow.normalBias!==void 0&&(o.shadow.normalBias=t.shadow.normalBias),t.shadow.radius!==void 0&&(o.shadow.radius=t.shadow.radius),t.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(t.shadow.mapSize),t.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(t.shadow.camera))),t.visible!==void 0&&(o.visible=t.visible),t.frustumCulled!==void 0&&(o.frustumCulled=t.frustumCulled),t.renderOrder!==void 0&&(o.renderOrder=t.renderOrder),t.userData!==void 0&&(o.userData=t.userData),t.layers!==void 0&&(o.layers.mask=t.layers),t.children!==void 0){const d=t.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],e,n,i,s))}if(t.animations!==void 0){const d=t.animations;for(let f=0;f<d.length;f++){const m=d[f];o.animations.push(s[m])}}if(t.type==="LOD"){t.autoUpdate!==void 0&&(o.autoUpdate=t.autoUpdate);const d=t.levels;for(let f=0;f<d.length;f++){const m=d[f],v=o.getObjectByProperty("uuid",m.object);v!==void 0&&o.addLevel(v,m.distance,m.hysteresis)}}return o}bindSkeletons(t,e){Object.keys(e).length!==0&&t.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=e[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){const n=e.target,i=t.getObjectByProperty("uuid",n);i!==void 0?e.target=i:e.target=new ee}})}}const Fx={UVMapping:Xr,CubeReflectionMapping:Nn,CubeRefractionMapping:ni,EquirectangularReflectionMapping:Us,EquirectangularRefractionMapping:Fs,CubeUVReflectionMapping:ji},_f={RepeatWrapping:Ns,ClampToEdgeWrapping:We,MirroredRepeatWrapping:Bs},Mf={NearestFilter:we,NearestMipmapNearestFilter:sl,NearestMipmapLinearFilter:ts,LinearFilter:de,LinearMipmapNearestFilter:Os,LinearMipmapLinearFilter:bn};class Nx extends Je{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Zn.get(t);if(o!==void 0){if(s.manager.itemStart(t),o.then){o.then(c=>{e&&e(c),s.manager.itemEnd(t)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Zn.add(t,c),e&&e(c),s.manager.itemEnd(t),c}).catch(function(c){i&&i(c),Zn.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});Zn.add(t,l),s.manager.itemStart(t)}}let Oa;class Lc{static getContext(){return Oa===void 0&&(Oa=new(window.AudioContext||window.webkitAudioContext)),Oa}static setContext(t){Oa=t}}class Bx extends Je{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new Kn(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(l){try{const c=l.slice(0);Lc.getContext().decodeAudioData(c,function(u){e(u)}).catch(a)}catch(c){a(c)}},n,i);function a(l){i?i(l):console.error(l),s.manager.itemError(t)}}}const Sf=new Ut,bf=new Ut,Wi=new Ut;class Ox{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Te,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Te,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){const e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,Wi.copy(t.projectionMatrix);const i=e.eyeSep/2,s=i*e.near/e.focus,o=e.near*Math.tan(Ti*e.fov*.5)/e.zoom;let a,l;bf.elements[12]=-i,Sf.elements[12]=i,a=-o*e.aspect+s,l=o*e.aspect+s,Wi.elements[0]=2*e.near/(l-a),Wi.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(Wi),a=-o*e.aspect-s,l=o*e.aspect-s,Wi.elements[0]=2*e.near/(l-a),Wi.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(Wi)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(bf),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(Sf)}}class wf{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Tf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Tf();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Tf(){return performance.now()}const Xi=new C,Ef=new qe,zx=new C,Yi=new C;class kx extends ee{constructor(){super(),this.type="AudioListener",this.context=Lc.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new wf}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Xi,Ef,zx),Yi.set(0,0,-1).applyQuaternion(Ef),e.positionX){const i=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(Xi.x,i),e.positionY.linearRampToValueAtTime(Xi.y,i),e.positionZ.linearRampToValueAtTime(Xi.z,i),e.forwardX.linearRampToValueAtTime(Yi.x,i),e.forwardY.linearRampToValueAtTime(Yi.y,i),e.forwardZ.linearRampToValueAtTime(Yi.z,i),e.upX.linearRampToValueAtTime(n.x,i),e.upY.linearRampToValueAtTime(n.y,i),e.upZ.linearRampToValueAtTime(n.z,i)}else e.setPosition(Xi.x,Xi.y,Xi.z),e.setOrientation(Yi.x,Yi.y,Yi.z,n.x,n.y,n.z)}}class Af extends ee{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}}const qi=new C,Cf=new qe,Hx=new C,Zi=new C;class Vx extends Af{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(qi,Cf,Hx),Zi.set(0,0,1).applyQuaternion(Cf);const e=this.panner;if(e.positionX){const n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(qi.x,n),e.positionY.linearRampToValueAtTime(qi.y,n),e.positionZ.linearRampToValueAtTime(qi.z,n),e.orientationX.linearRampToValueAtTime(Zi.x,n),e.orientationY.linearRampToValueAtTime(Zi.y,n),e.orientationZ.linearRampToValueAtTime(Zi.z,n)}else e.setPosition(qi.x,qi.y,qi.z),e.setOrientation(Zi.x,Zi.y,Zi.z)}}class Gx{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0;const e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}}class Rf{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,o;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-s,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,o=i;s!==o;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){qe.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const o=this._workIndex*s;qe.multiplyQuaternionsFlat(t,o,t,e,t,n),qe.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=e+a;t[l]=t[l]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,s){for(let o=0;o!==s;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const Dc="\\[\\]\\.:\\/",Wx=new RegExp("["+Dc+"]","g"),Uc="[^"+Dc+"]",Xx="[^"+Dc.replace("\\.","")+"]",Yx=/((?:WC+[\/:])*)/.source.replace("WC",Uc),qx=/(WCOD+)?/.source.replace("WCOD",Xx),Zx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uc),$x=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uc),Kx=new RegExp("^"+Yx+qx+Zx+$x+"$"),Jx=["material","materials","bones","map"];class Qx{constructor(t,e,n){const i=n||ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ie{constructor(t,e,n){this.path=e,this.parsedPath=n||ie.parseTrackName(e),this.node=ie.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ie.Composite(t,e,n):new ie(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Wx,"")}static parseTrackName(t){const e=Kx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Jx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=ie.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const o=t[i];if(o===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ie.Composite=Qx,ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ie.prototype.GetterByBindingType=[ie.prototype._getValue_direct,ie.prototype._getValue_array,ie.prototype._getValue_arrayElement,ie.prototype._getValue_toArray],ie.prototype.SetterByBindingTypeAndVersioning=[[ie.prototype._setValue_direct,ie.prototype._setValue_direct_setNeedsUpdate,ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_array,ie.prototype._setValue_array_setNeedsUpdate,ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_arrayElement,ie.prototype._setValue_arrayElement_setNeedsUpdate,ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_fromArray,ie.prototype._setValue_fromArray_setNeedsUpdate,ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class jx{constructor(){this.isAnimationObjectGroup=!0,this.uuid=je(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const t={};this._indicesByUUID=t;for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){const t=this._objects,e=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,o=s.length;let a,l=t.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let m=e[f];if(m===void 0){m=l++,e[f]=m,t.push(d);for(let v=0,g=o;v!==g;++v)s[v].push(new ie(d,n[v],i[v]))}else if(m<c){a=t[m];const v=--c,g=t[v];e[g.uuid]=m,t[m]=g,e[f]=v,t[v]=d;for(let p=0,x=o;p!==x;++p){const _=s[p],y=_[v];let P=_[m];_[m]=y,P===void 0&&(P=new ie(d,n[p],i[p])),_[v]=P}}else t[m]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const l=arguments[o],c=l.uuid,h=e[c];if(h!==void 0&&h>=s){const u=s++,d=t[u];e[d.uuid]=h,t[h]=d,e[c]=u,t[u]=l;for(let f=0,m=i;f!==m;++f){const v=n[f],g=v[u],p=v[h];v[h]=g,v[u]=p}}}this.nCachedObjects_=s}uncache(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,o=t.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],h=c.uuid,u=e[h];if(u!==void 0)if(delete e[h],u<s){const d=--s,f=t[d],m=--o,v=t[m];e[f.uuid]=u,t[u]=f,e[v.uuid]=d,t[d]=v,t.pop();for(let g=0,p=i;g!==p;++g){const x=n[g],_=x[d],y=x[m];x[u]=_,x[d]=y,x.pop()}}else{const d=--o,f=t[d];d>0&&(e[f.uuid]=u),t[u]=f,t.pop();for(let m=0,v=i;m!==v;++m){const g=n[m];g[u]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(t,e){const n=this._bindingsIndicesByPath;let i=n[t];const s=this._bindings;if(i!==void 0)return s[i];const o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=s.length,n[t]=i,o.push(t),a.push(e),s.push(u);for(let d=h,f=l.length;d!==f;++d){const m=l[d];u[d]=new ie(m,t,e)}return u}unsubscribe_(t){const e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){const i=this._paths,s=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=t[a];e[c]=n,o[n]=l,o.pop(),s[n]=s[a],s.pop(),i[n]=i[a],i.pop()}}}class Pf{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,o=s.length,a=new Array(o),l={endingStart:Mi,endingEnd:Mi};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Hh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,o=s/i,a=i/s;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const l=(t-s)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case pl:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Ao:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const o=n===Vh;if(t===0)return s===-1?i:o&&(s&1)===1?e-i:i;if(n===kh){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=Si,i.endingEnd=Si):(t?i.endingStart=this.zeroSlopeAtStart?Si:Mi:i.endingStart=Ys,e?i.endingEnd=this.zeroSlopeAtEnd?Si:Mi:i.endingEnd=Ys)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=e,a[1]=s+t,l[1]=n,this}}const t_=new Float32Array(1);class e_ extends An{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let m=h[f];if(m!==void 0)++m.referenceCount,o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const v=e&&e._propertyBindings[u].binding.parsedPath;m=new Rf(ie.create(n,f,v),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let o=s[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Tc(new Float32Array(2),new Float32Array(2),1,t_),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let o=typeof t=="string"?Rr.findByName(i,t):t;const a=o!==null?o.uuid:t,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Ao),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new Pf(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?Rr.findByName(n,t):t,o=s?s.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Fc{constructor(t){this.value=t}clone(){return new Fc(this.value.clone===void 0?this.value:this.value.clone())}}let n_=0;class i_ extends An{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:n_++}),this.name="",this.usage=Zs,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){const e=this.uniforms.indexOf(t);return e!==-1&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(t){this.name=t.name,this.usage=t.usage;const e=t.uniforms;this.uniforms.length=0;for(let n=0,i=e.length;n<i;n++){const s=Array.isArray(e[n])?e[n]:[e[n]];for(let o=0;o<s.length;o++)this.uniforms.push(s[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class s_ extends ea{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}class r_{constructor(t,e,n,i,s){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=s,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}}const If=new Ut;class o_{constructor(t,e,n=0,i=1/0){this.ray=new cs(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Fo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return If.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(If),this}intersectObject(t,e=!0,n=[]){return Nc(t,this,n,e),n.sort(Lf),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Nc(t[i],this,n,e);return n.sort(Lf),n}}function Lf(r,t){return r.distance-t.distance}function Nc(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)Nc(s[o],t,e,!0)}}class a_{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(xe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class l_{constructor(t=1,e=0,n=0){return this.radius=t,this.theta=e,this.y=n,this}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}}class Bc{constructor(t,e,n,i){Bc.prototype.isMatrix2=!0,this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}}const Df=new K;class c_{constructor(t=new K(1/0,1/0),e=new K(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Df.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Df).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Uf=new C,za=new C;class h_{constructor(t=new C,e=new C){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Uf.subVectors(t,this.start),za.subVectors(this.end,this.start);const n=za.dot(za);let s=za.dot(Uf)/n;return e&&(s=xe(s,0,1)),s}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Ff=new C;class u_ extends ee{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";const n=new Gt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Tt(i,3));const s=new Ge({fog:!1,toneMapped:!1});this.cone=new Rn(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),Ff.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Ff),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const fi=new C,ka=new Ut,Oc=new Ut;class d_ extends Rn{constructor(t){const e=Nf(t),n=new Gt,i=[],s=[],o=new G(0,0,1),a=new G(0,1,0);for(let c=0;c<e.length;c++){const h=e[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(o.r,o.g,o.b),s.push(a.r,a.g,a.b))}n.setAttribute("position",new Tt(i,3)),n.setAttribute("color",new Tt(s,3));const l=new Ge({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(t){const e=this.bones,n=this.geometry,i=n.getAttribute("position");Oc.copy(this.root.matrixWorld).invert();for(let s=0,o=0;s<e.length;s++){const a=e[s];a.parent&&a.parent.isBone&&(ka.multiplyMatrices(Oc,a.matrixWorld),fi.setFromMatrixPosition(ka),i.setXYZ(o,fi.x,fi.y,fi.z),ka.multiplyMatrices(Oc,a.parent.matrixWorld),fi.setFromMatrixPosition(ka),i.setXYZ(o+1,fi.x,fi.y,fi.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose()}}function Nf(r){const t=[];r.isBone===!0&&t.push(r);for(let e=0;e<r.children.length;e++)t.push.apply(t,Nf(r.children[e]));return t}class f_ extends J{constructor(t,e,n){const i=new ln(e,4,2),s=new fn({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const p_=new C,Bf=new G,Of=new G;class m_ extends ee{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new vn(e);i.rotateY(Math.PI*.5),this.material=new fn({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),o=new Float32Array(s.count*3);i.setAttribute("color",new ne(o,3)),this.add(new J(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const e=t.geometry.getAttribute("color");Bf.copy(this.light.color),Of.copy(this.light.groundColor);for(let n=0,i=e.count;n<i;n++){const s=n<i/2?Bf:Of;e.setXYZ(n,s.r,s.g,s.b)}e.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),t.lookAt(p_.setFromMatrixPosition(this.light.matrixWorld).negate())}}class g_ extends Rn{constructor(t=10,e=10,n=4473924,i=8947848){n=new G(n),i=new G(i);const s=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,f=0,m=-a;d<=e;d++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);const v=d===s?n:i;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const h=new Gt;h.setAttribute("position",new Tt(l,3)),h.setAttribute("color",new Tt(c,3));const u=new Ge({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class v_ extends Rn{constructor(t=10,e=16,n=8,i=64,s=4473924,o=8947848){s=new G(s),o=new G(o);const a=[],l=[];if(e>1)for(let u=0;u<e;u++){const d=u/e*(Math.PI*2),f=Math.sin(d)*t,m=Math.cos(d)*t;a.push(0,0,0),a.push(f,0,m);const v=u&1?s:o;l.push(v.r,v.g,v.b),l.push(v.r,v.g,v.b)}for(let u=0;u<n;u++){const d=u&1?s:o,f=t-t/n*u;for(let m=0;m<i;m++){let v=m/i*(Math.PI*2),g=Math.sin(v)*f,p=Math.cos(v)*f;a.push(g,0,p),l.push(d.r,d.g,d.b),v=(m+1)/i*(Math.PI*2),g=Math.sin(v)*f,p=Math.cos(v)*f,a.push(g,0,p),l.push(d.r,d.g,d.b)}}const c=new Gt;c.setAttribute("position",new Tt(a,3)),c.setAttribute("color",new Tt(l,3));const h=new Ge({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const zf=new C,Ha=new C,kf=new C;class y_ extends ee{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0&&(e=1);let i=new Gt;i.setAttribute("position",new Tt([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));const s=new Ge({fog:!1,toneMapped:!1});this.lightPlane=new qn(i,s),this.add(this.lightPlane),i=new Gt,i.setAttribute("position",new Tt([0,0,0,0,0,1],3)),this.targetLine=new qn(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),zf.setFromMatrixPosition(this.light.matrixWorld),Ha.setFromMatrixPosition(this.light.target.matrixWorld),kf.subVectors(Ha,zf),this.lightPlane.lookAt(Ha),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Ha),this.targetLine.scale.z=kf.length()}}const Va=new C,_e=new Yo;class x_ extends Rn{constructor(t){const e=new Gt,n=new Ge({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(m,v){l(m),l(v)}function l(m){i.push(0,0,0),s.push(0,0,0),o[m]===void 0&&(o[m]=[]),o[m].push(i.length/3-1)}e.setAttribute("position",new Tt(i,3)),e.setAttribute("color",new Tt(s,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const c=new G(16755200),h=new G(16711680),u=new G(43775),d=new G(16777215),f=new G(3355443);this.setColors(c,h,u,d,f)}setColors(t,e,n,i,s){const a=this.geometry.getAttribute("color");a.setXYZ(0,t.r,t.g,t.b),a.setXYZ(1,t.r,t.g,t.b),a.setXYZ(2,t.r,t.g,t.b),a.setXYZ(3,t.r,t.g,t.b),a.setXYZ(4,t.r,t.g,t.b),a.setXYZ(5,t.r,t.g,t.b),a.setXYZ(6,t.r,t.g,t.b),a.setXYZ(7,t.r,t.g,t.b),a.setXYZ(8,t.r,t.g,t.b),a.setXYZ(9,t.r,t.g,t.b),a.setXYZ(10,t.r,t.g,t.b),a.setXYZ(11,t.r,t.g,t.b),a.setXYZ(12,t.r,t.g,t.b),a.setXYZ(13,t.r,t.g,t.b),a.setXYZ(14,t.r,t.g,t.b),a.setXYZ(15,t.r,t.g,t.b),a.setXYZ(16,t.r,t.g,t.b),a.setXYZ(17,t.r,t.g,t.b),a.setXYZ(18,t.r,t.g,t.b),a.setXYZ(19,t.r,t.g,t.b),a.setXYZ(20,t.r,t.g,t.b),a.setXYZ(21,t.r,t.g,t.b),a.setXYZ(22,t.r,t.g,t.b),a.setXYZ(23,t.r,t.g,t.b),a.setXYZ(24,e.r,e.g,e.b),a.setXYZ(25,e.r,e.g,e.b),a.setXYZ(26,e.r,e.g,e.b),a.setXYZ(27,e.r,e.g,e.b),a.setXYZ(28,e.r,e.g,e.b),a.setXYZ(29,e.r,e.g,e.b),a.setXYZ(30,e.r,e.g,e.b),a.setXYZ(31,e.r,e.g,e.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,s.r,s.g,s.b),a.setXYZ(41,s.r,s.g,s.b),a.setXYZ(42,s.r,s.g,s.b),a.setXYZ(43,s.r,s.g,s.b),a.setXYZ(44,s.r,s.g,s.b),a.setXYZ(45,s.r,s.g,s.b),a.setXYZ(46,s.r,s.g,s.b),a.setXYZ(47,s.r,s.g,s.b),a.setXYZ(48,s.r,s.g,s.b),a.setXYZ(49,s.r,s.g,s.b),a.needsUpdate=!0}update(){const t=this.geometry,e=this.pointMap,n=1,i=1;_e.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),Se("c",e,t,_e,0,0,-1),Se("t",e,t,_e,0,0,1),Se("n1",e,t,_e,-n,-i,-1),Se("n2",e,t,_e,n,-i,-1),Se("n3",e,t,_e,-n,i,-1),Se("n4",e,t,_e,n,i,-1),Se("f1",e,t,_e,-n,-i,1),Se("f2",e,t,_e,n,-i,1),Se("f3",e,t,_e,-n,i,1),Se("f4",e,t,_e,n,i,1),Se("u1",e,t,_e,n*.7,i*1.1,-1),Se("u2",e,t,_e,-n*.7,i*1.1,-1),Se("u3",e,t,_e,0,i*2,-1),Se("cf1",e,t,_e,-n,0,1),Se("cf2",e,t,_e,n,0,1),Se("cf3",e,t,_e,0,-i,1),Se("cf4",e,t,_e,0,i,1),Se("cn1",e,t,_e,-n,0,-1),Se("cn2",e,t,_e,n,0,-1),Se("cn3",e,t,_e,0,-i,-1),Se("cn4",e,t,_e,0,i,-1),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Se(r,t,e,n,i,s,o){Va.set(i,s,o).unproject(n);const a=t[r];if(a!==void 0){const l=e.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],Va.x,Va.y,Va.z)}}const Ga=new ze;class __ extends Rn{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),s=new Gt;s.setIndex(new ne(n,1)),s.setAttribute("position",new ne(i,3)),super(s,new Ge({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&Ga.setFromObject(this.object),Ga.isEmpty())return;const e=Ga.min,n=Ga.max,i=this.geometry.attributes.position,s=i.array;s[0]=n.x,s[1]=n.y,s[2]=n.z,s[3]=e.x,s[4]=n.y,s[5]=n.z,s[6]=e.x,s[7]=e.y,s[8]=n.z,s[9]=n.x,s[10]=e.y,s[11]=n.z,s[12]=n.x,s[13]=n.y,s[14]=e.z,s[15]=e.x,s[16]=n.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=n.x,s[22]=e.y,s[23]=e.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class M_ extends Rn{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new Gt;s.setIndex(new ne(n,1)),s.setAttribute("position",new Tt(i,3)),super(s,new Ge({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}}class S_ extends qn{constructor(t,e=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new Gt;o.setAttribute("position",new Tt(s,3)),o.computeBoundingSphere(),super(o,new Ge({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new Gt;l.setAttribute("position",new Tt(a,3)),l.computeBoundingSphere(),this.add(new J(l,new fn({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Hf=new C;let Wa,zc;class b_ extends ee{constructor(t=new C(0,0,1),e=new C(0,0,0),n=1,i=16776960,s=n*.2,o=s*.2){super(),this.type="ArrowHelper",Wa===void 0&&(Wa=new Gt,Wa.setAttribute("position",new Tt([0,0,0,0,1,0],3)),zc=new gn(0,.5,1,5,1),zc.translate(0,-.5,0)),this.position.copy(e),this.line=new qn(Wa,new Ge({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new J(zc,new fn({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,s,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Hf.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Hf,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class w_ extends Rn{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Gt;i.setAttribute("position",new Tt(e,3)),i.setAttribute("color",new Tt(n,3));const s=new Ge({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(t,e,n){const i=new G,s=this.geometry.attributes.color.array;return i.set(t),i.toArray(s,0),i.toArray(s,3),i.set(e),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class T_{constructor(){this.type="ShapePath",this.color=new G,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new xr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,s,o){return this.currentPath.bezierCurveTo(t,e,n,i,s,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function e(p){const x=[];for(let _=0,y=p.length;_<y;_++){const P=p[_],T=new Oi;T.curves=P.curves,x.push(T)}return x}function n(p,x){const _=x.length;let y=!1;for(let P=_-1,T=0;T<_;P=T++){let E=x[P],R=x[T],b=R.x-E.x,M=R.y-E.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(E=x[T],b=-b,R=x[P],M=-M),p.y<E.y||p.y>R.y)continue;if(p.y===E.y){if(p.x===E.x)return!0}else{const I=M*(p.x-E.x)-b*(p.y-E.y);if(I===0)return!0;if(I<0)continue;y=!y}}else{if(p.y!==E.y)continue;if(R.x<=p.x&&p.x<=E.x||E.x<=p.x&&p.x<=R.x)return!0}}return y}const i=Pn.isClockWise,s=this.subPaths;if(s.length===0)return[];let o,a,l;const c=[];if(s.length===1)return a=s[0],l=new Oi,l.curves=a.curves,c.push(l),c;let h=!i(s[0].getPoints());h=t?!h:h;const u=[],d=[];let f=[],m=0,v;d[m]=void 0,f[m]=[];for(let p=0,x=s.length;p<x;p++)a=s[p],v=a.getPoints(),o=i(v),o=t?!o:o,o?(!h&&d[m]&&m++,d[m]={s:new Oi,p:v},d[m].s.curves=a.curves,h&&m++,f[m]=[]):f[m].push({h:a,p:v[0]});if(!d[0])return e(s);if(d.length>1){let p=!1,x=0;for(let _=0,y=d.length;_<y;_++)u[_]=[];for(let _=0,y=d.length;_<y;_++){const P=f[_];for(let T=0;T<P.length;T++){const E=P[T];let R=!0;for(let b=0;b<d.length;b++)n(E.p,d[b].p)&&(_!==b&&x++,R?(R=!1,u[b].push(E)):p=!0);R&&u[_].push(E)}}x>0&&p===!1&&(f=u)}let g;for(let p=0,x=d.length;p<x;p++){l=d[p].s,c.push(l),g=f[p];for(let _=0,y=g.length;_<y;_++)l.holes.push(g[_].h)}return c}}class E_ extends An{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class A_ extends Ye{constructor(t=1,e=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(t,e,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:on}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=on);const Vf=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Fh,AddEquation:ei,AddOperation:Ih,AdditiveAnimationBlendMode:pl,AdditiveBlending:Fr,AgXToneMapping:Bh,AlphaFormat:ll,AlwaysCompare:Qh,AlwaysDepth:zr,AlwaysStencilFunc:ml,AmbientLight:pf,AnimationAction:Pf,AnimationClip:Rr,AnimationLoader:Ex,AnimationMixer:e_,AnimationObjectGroup:jx,AnimationUtils:Sx,ArcCurve:Ld,ArrayCamera:sd,ArrowHelper:b_,AttachedBindMode:il,Audio:Af,AudioAnalyser:Gx,AudioContext:Lc,AudioListener:kx,AudioLoader:Bx,AxesHelper:w_,BackSide:Ne,BasicDepthPacking:Gh,BasicShadowMap:ep,BatchedMesh:bd,Bone:rc,BooleanKeyframeTrack:Vi,Box2:c_,Box3:ze,Box3Helper:M_,BoxGeometry:xt,BoxHelper:__,BufferAttribute:ne,BufferGeometry:Gt,BufferGeometryLoader:xf,ByteType:rl,Cache:Zn,Camera:Yo,CameraHelper:x_,CanvasTexture:Id,CapsuleGeometry:Ma,CatmullRomCurve3:Dd,CineonToneMapping:Uh,CircleGeometry:Mr,ClampToEdgeWrapping:We,Clock:wf,Color:G,ColorKeyframeTrack:Ec,ColorManagement:Qt,CompressedArrayTexture:Xy,CompressedCubeTexture:Yy,CompressedTexture:va,CompressedTextureLoader:Ax,ConeGeometry:ui,ConstantAlphaFactor:Ch,ConstantColorFactor:Eh,Controls:E_,CubeCamera:Au,CubeReflectionMapping:Nn,CubeRefractionMapping:ni,CubeTexture:sr,CubeTextureLoader:Cx,CubeUVReflectionMapping:ji,CubicBezierCurve:mc,CubicBezierCurve3:Fd,CubicInterpolant:of,CullFaceBack:Qa,CullFaceFront:uh,CullFaceFrontBack:tp,CullFaceNone:hh,Curve:mn,CurvePath:Bd,CustomBlending:dh,CustomToneMapping:Nh,CylinderGeometry:gn,Cylindrical:l_,Data3DTexture:Ml,DataArrayTexture:Co,DataTexture:Cn,DataTextureLoader:Rx,DataUtils:mm,DecrementStencilOp:mp,DecrementWrapStencilOp:vp,DefaultLoadingManager:cf,DepthFormat:xi,DepthStencilFormat:_i,DepthTexture:Ko,DetachedBindMode:zh,DirectionalLight:Na,DirectionalLightHelper:y_,DiscreteInterpolant:af,DodecahedronGeometry:Sa,DoubleSide:Sn,DstAlphaFactor:Mh,DstColorFactor:bh,DynamicCopyUsage:Lp,DynamicDrawUsage:Ep,DynamicReadUsage:Rp,EdgesGeometry:Od,EllipseCurve:ya,EqualCompare:Zh,EqualDepth:Hr,EqualStencilFunc:Mp,EquirectangularReflectionMapping:Us,EquirectangularRefractionMapping:Fs,Euler:en,EventDispatcher:An,ExtrudeGeometry:Ra,FileLoader:Kn,Float16BufferAttribute:Mm,Float32BufferAttribute:Tt,FloatType:Xe,Fog:ta,FogExp2:Ss,FramebufferTexture:Wy,FrontSide:Dn,Frustum:rr,GLBufferAttribute:r_,GLSL1:Up,GLSL3:vl,GreaterCompare:$h,GreaterDepth:Gr,GreaterEqualCompare:Jh,GreaterEqualDepth:Vr,GreaterEqualStencilFunc:Tp,GreaterStencilFunc:bp,GridHelper:g_,Group:jt,HalfFloatType:Bn,HemisphereLight:Fa,HemisphereLightHelper:m_,IcosahedronGeometry:Pa,ImageBitmapLoader:Nx,ImageLoader:Pr,ImageUtils:lu,IncrementStencilOp:pp,IncrementWrapStencilOp:gp,InstancedBufferAttribute:Cs,InstancedBufferGeometry:yf,InstancedInterleavedBuffer:s_,InstancedMesh:Md,Int16BufferAttribute:xm,Int32BufferAttribute:_m,Int8BufferAttribute:gm,IntType:Yr,InterleavedBuffer:ea,InterleavedBufferAttribute:Fi,Interpolant:Tr,InterpolateDiscrete:Xs,InterpolateLinear:To,InterpolateSmooth:Eo,InvertStencilOp:yp,KeepStencilOp:wi,KeyframeTrack:yn,LOD:ud,LatheGeometry:_r,Layers:Fo,LessCompare:qh,LessDepth:kr,LessEqualCompare:gl,LessEqualDepth:vi,LessEqualStencilFunc:Sp,LessStencilFunc:_p,Light:Jn,LightProbe:vf,Line:qn,Line3:h_,LineBasicMaterial:Ge,LineCurve:gc,LineCurve3:Nd,LineDashedMaterial:nf,LineLoop:Cd,LineSegments:Rn,LinearFilter:de,LinearInterpolant:Tc,LinearMipMapLinearFilter:rp,LinearMipMapNearestFilter:sp,LinearMipmapLinearFilter:bn,LinearMipmapNearestFilter:Os,LinearSRGBColorSpace:bi,LinearToneMapping:Lh,LinearTransfer:qs,Loader:Je,LoaderUtils:Ic,LoadingManager:Ac,LoopOnce:kh,LoopPingPong:Vh,LoopRepeat:Hh,LuminanceAlphaFormat:ul,LuminanceFormat:hl,MOUSE:Qi,Material:De,MaterialLoader:Ba,MathUtils:Jp,Matrix2:Bc,Matrix3:Vt,Matrix4:Ut,MaxEquation:gh,Mesh:J,MeshBasicMaterial:fn,MeshDepthMaterial:Jl,MeshDistanceMaterial:Ql,MeshLambertMaterial:tf,MeshMatcapMaterial:ef,MeshNormalMaterial:jd,MeshPhongMaterial:Jd,MeshPhysicalMaterial:Kd,MeshStandardMaterial:he,MeshToonMaterial:Qd,MinEquation:mh,MirroredRepeatWrapping:Bs,MixOperation:Ph,MultiplyBlending:nl,MultiplyOperation:Ds,NearestFilter:we,NearestMipMapLinearFilter:ip,NearestMipMapNearestFilter:np,NearestMipmapLinearFilter:ts,NearestMipmapNearestFilter:sl,NeutralToneMapping:Oh,NeverCompare:Yh,NeverDepth:Or,NeverStencilFunc:xp,NoBlending:Un,NoColorSpace:On,NoToneMapping:Fn,NormalAnimationBlendMode:Ao,NormalBlending:gi,NotEqualCompare:Kh,NotEqualDepth:Wr,NotEqualStencilFunc:wp,NumberKeyframeTrack:Er,Object3D:ee,ObjectLoader:Ux,ObjectSpaceNormalMap:Xh,OctahedronGeometry:vn,OneFactor:yh,OneMinusConstantAlphaFactor:Rh,OneMinusConstantColorFactor:Ah,OneMinusDstAlphaFactor:Sh,OneMinusDstColorFactor:wh,OneMinusSrcAlphaFactor:Br,OneMinusSrcColorFactor:_h,OrthographicCamera:or,PCFShadowMap:ja,PCFSoftShadowMap:tl,PMREMGenerator:ql,Path:xr,PerspectiveCamera:Te,Plane:hi,PlaneGeometry:Yn,PlaneHelper:S_,PointLight:Qn,PointLightHelper:f_,Points:gr,PointsMaterial:mr,PolarGridHelper:v_,PolyhedronGeometry:di,PositionalAudio:Vx,PropertyBinding:ie,PropertyMixer:Rf,QuadraticBezierCurve:vc,QuadraticBezierCurve3:yc,Quaternion:qe,QuaternionKeyframeTrack:Ar,QuaternionLinearInterpolant:lf,RED_GREEN_RGTC2_Format:bo,RED_RGTC1_Format:fl,REVISION:on,RGBADepthPacking:Wh,RGBAFormat:Ce,RGBAIntegerFormat:Jr,RGBA_ASTC_10x10_Format:vo,RGBA_ASTC_10x5_Format:po,RGBA_ASTC_10x6_Format:mo,RGBA_ASTC_10x8_Format:go,RGBA_ASTC_12x10_Format:yo,RGBA_ASTC_12x12_Format:xo,RGBA_ASTC_4x4_Format:ro,RGBA_ASTC_5x4_Format:oo,RGBA_ASTC_5x5_Format:ao,RGBA_ASTC_6x5_Format:lo,RGBA_ASTC_6x6_Format:co,RGBA_ASTC_8x5_Format:ho,RGBA_ASTC_8x6_Format:uo,RGBA_ASTC_8x8_Format:fo,RGBA_BPTC_Format:Ws,RGBA_ETC2_EAC_Format:so,RGBA_PVRTC_2BPPV1_Format:eo,RGBA_PVRTC_4BPPV1_Format:to,RGBA_S3TC_DXT1_Format:Hs,RGBA_S3TC_DXT3_Format:Vs,RGBA_S3TC_DXT5_Format:Gs,RGBDepthPacking:hp,RGBFormat:cl,RGBIntegerFormat:op,RGB_BPTC_SIGNED_Format:_o,RGB_BPTC_UNSIGNED_Format:Mo,RGB_ETC1_Format:no,RGB_ETC2_Format:io,RGB_PVRTC_2BPPV1_Format:jr,RGB_PVRTC_4BPPV1_Format:Qr,RGB_S3TC_DXT1_Format:ks,RGDepthPacking:up,RGFormat:dl,RGIntegerFormat:Kr,RawShaderMaterial:$d,Ray:cs,Raycaster:o_,RectAreaLight:mf,RedFormat:$r,RedIntegerFormat:zs,ReinhardToneMapping:Dh,RenderTarget:cu,RepeatWrapping:Ns,ReplaceStencilOp:fp,ReverseSubtractEquation:ph,RingGeometry:Is,SIGNED_RED_GREEN_RGTC2_Format:wo,SIGNED_RED_RGTC1_Format:So,SRGBColorSpace:Be,SRGBTransfer:ce,Scene:bs,ShaderChunk:Xt,ShaderLib:pn,ShaderMaterial:He,ShadowMaterial:Zd,Shape:Oi,ShapeGeometry:Ia,ShapePath:T_,ShapeUtils:Pn,ShortType:ol,Skeleton:aa,SkeletonHelper:d_,SkinnedMesh:vd,Source:Ei,Sphere:Ie,SphereGeometry:ln,Spherical:a_,SphericalHarmonics3:gf,SplineCurve:xc,SpotLight:df,SpotLightHelper:u_,Sprite:cd,SpriteMaterial:ec,SrcAlphaFactor:Nr,SrcAlphaSaturateFactor:Th,SrcColorFactor:xh,StaticCopyUsage:Ip,StaticDrawUsage:Zs,StaticReadUsage:Cp,StereoCamera:Ox,StreamCopyUsage:Dp,StreamDrawUsage:Ap,StreamReadUsage:Pp,StringKeyframeTrack:Gi,SubtractEquation:fh,SubtractiveBlending:el,TOUCH:jf,TangentSpaceNormalMap:ii,TetrahedronGeometry:La,Texture:ve,TextureLoader:Px,TextureUtils:wy,TorusGeometry:ki,TorusKnotGeometry:Da,Triangle:Ze,TriangleFanDrawMode:cp,TriangleStripDrawMode:lp,TrianglesDrawMode:ap,TubeGeometry:Ua,UVMapping:Xr,Uint16BufferAttribute:Bl,Uint32BufferAttribute:Ol,Uint8BufferAttribute:vm,Uint8ClampedBufferAttribute:ym,Uniform:Fc,UniformsGroup:i_,UniformsLib:ut,UniformsUtils:wu,UnsignedByteType:wn,UnsignedInt248Type:yi,UnsignedInt5999Type:al,UnsignedIntType:Tn,UnsignedShort4444Type:qr,UnsignedShort5551Type:Zr,UnsignedShortType:es,VSMShadowMap:Mn,Vector2:K,Vector3:C,Vector4:Kt,VectorKeyframeTrack:Cr,VideoTexture:Gy,WebGL3DRenderTarget:rm,WebGLArrayRenderTarget:sm,WebGLCoordinateSystem:En,WebGLCubeRenderTarget:Cu,WebGLMultipleRenderTargets:A_,WebGLRenderTarget:Ye,WebGLRenderer:rd,WebGLUtils:id,WebGPUCoordinateSystem:$s,WireframeGeometry:Xd,WrapAroundEnding:Ys,ZeroCurvatureEnding:Mi,ZeroFactor:vh,ZeroSlopeEnding:Si,ZeroStencilOp:dp,createCanvasElement:eu},Symbol.toStringTag,{value:"Module"}));class Xa{constructor(){k(this,"name","AnimationSystem")}update(t,{dt:e,elapsed:n}){const i=t.query("Transform","AnimationState");for(const s of i){const o=t.getComponent(s,"Transform"),a=t.getComponent(s,"AnimationState");a.excitement=Math.max(0,a.excitement-e*1.6);const l=n*a.bobFrequency+a.phase,c=1+a.excitement*.65;if(a.bobAmplitude>0&&(o.y=a.baseY+Math.sin(l*c)*a.bobAmplitude),a.breatheAmplitude>0){const h=Math.sin(n*2.1+a.phase)*a.breatheAmplitude;o.scaleY=1+h,o.scaleX=1-h*.45,o.scaleZ=1-h*.45}if(a.parts){const h=Math.sin(n*(2.6+a.excitement*4.5)+a.phase)*(.08+a.excitement*.22);if(a.parts.leftWing&&(a.parts.leftWing.rotation.z=.28+h),a.parts.rightWing&&(a.parts.rightWing.rotation.z=-.28-h),a.parts.head&&(a.parts.head.rotation.z=Math.sin(n*1.4+a.phase)*.045),a.parts.leftFoot&&(a.parts.leftFoot.rotation.x=Math.sin(n*2.4+a.phase)*.06),a.parts.rightFoot&&(a.parts.rightFoot.rotation.x=-Math.sin(n*2.4+a.phase)*.06),a.parts.orbitRing&&(a.parts.orbitRing.rotation.x=Math.sin(n*.7)*.45+.6,a.parts.orbitRing.rotation.y=-n*.55),a.parts.coatTail){const u=.14+.08*Math.sin(n*1.15);a.parts.coatTail.rotation.x=.18+Math.sin(n*4.2+a.phase)*.09+u*.5,a.parts.coatTail.rotation.z=-.08-Math.cos(n*3.1+a.phase)*.065}}}}}const kc={background:"#05060D",warmLight:"#FF2A85",warmCore:"#FFC145",coolAmbient:"#00F0FF",foliageAccent:"#8A5CFF",cursorLight:"#64F5FF"},Hc=" .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",Vc={mode:"playground",mapId:"cyberpunk-citadel",enableKeyboard:!1,pauseOffscreen:!0,palette:{...kc},cellSize:8,autoResponsiveDensity:!0,characterRamp:Hc,structuralChars:"/\\|_[]",edgeStrength:.96,blockBlendWeight:.35,windStrength:1,bloomIntensity:1.48,bloomThreshold:.28,dofFocusDistance:10.6,dofStrength:.36,parallaxIntensity:1.65,parallaxSmoothing:5.6,cursorLightIntensity:1.55,enableShadows:!0,maxFps:60,maxPixelRatio:2,pauseOnHiddenTab:!0,fontFamily:'"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace'};function Gc(r,t){return t?{...r,...t,palette:{...r.palette,...t.palette??{}},callbacks:t.callbacks?{...r.callbacks??{},...t.callbacks}:r.callbacks?{...r.callbacks}:void 0}:{...r,palette:{...r.palette},callbacks:r.callbacks?{...r.callbacks}:void 0}}class Wc{constructor(t){k(this,"rafId",null);k(this,"running",!1);k(this,"lastTimestamp",null);k(this,"elapsedSeconds",0);k(this,"maxFps");k(this,"accumFrames",0);k(this,"accumMs",0);k(this,"smoothedFps",60);k(this,"lastFrameMs",16.67);k(this,"onFrame");k(this,"onTelemetry");k(this,"tickBound");this.maxFps=t.maxFps,this.onFrame=t.onFrame,this.onTelemetry=t.onTelemetry,this.tickBound=this.tick.bind(this)}start(){this.running||(this.running=!0,this.lastTimestamp=null,this.schedule())}pause(){this.running&&(this.running=!1,this.cancel(),this.lastTimestamp=null)}resume(){this.start()}stop(){this.pause(),this.elapsedSeconds=0}setMaxFps(t){this.maxFps=t}isRunning(){return this.running}getElapsedSeconds(){return this.elapsedSeconds}getTelemetry(){return{fps:Math.round(this.smoothedFps),frameTimeMs:Number(this.lastFrameMs.toFixed(2))}}stepOnce(t=0){this.elapsedSeconds+=t,this.onFrame({dt:t,elapsed:this.elapsedSeconds,rawFrameMs:this.lastFrameMs})}schedule(){this.rafId===null&&this.running&&(this.rafId=window.requestAnimationFrame(this.tickBound))}cancel(){this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null)}tick(t){var s;if(this.rafId=null,!this.running)return;if(this.lastTimestamp===null){this.lastTimestamp=t,this.stepOnce(.016666666666666666),this.schedule();return}const e=t-this.lastTimestamp,n=this.maxFps>0?1e3/this.maxFps:0;if(n>0&&e<n-1.5){this.schedule();return}this.lastTimestamp=t;const i=Math.min(.1,Math.max(1e-4,e/1e3));if(this.lastFrameMs=e,this.stepOnce(i),this.accumFrames+=1,this.accumMs+=e,this.accumMs>=450){const o=this.accumFrames*1e3/this.accumMs;this.smoothedFps=this.smoothedFps*.35+o*.65,this.accumFrames=0,this.accumMs=0,(s=this.onTelemetry)==null||s.call(this,this.getTelemetry())}this.schedule()}}class $i{constructor(t){k(this,"container");k(this,"resizeObserver",null);k(this,"intersectionObserver",null);k(this,"pendingResizeRaf",null);k(this,"pendingWidth",0);k(this,"pendingHeight",0);k(this,"cleanupCallbacks",[]);k(this,"disposed",!1);this.container=t}observeContainer(t,e){if(this.disposed)return;const n=(i,s)=>{if(!(i<=0||s<=0||this.disposed))if(this.pendingWidth=i,this.pendingHeight=s,typeof window<"u"&&typeof window.requestAnimationFrame=="function"){if(this.pendingResizeRaf!==null)return;this.pendingResizeRaf=window.requestAnimationFrame(()=>{this.pendingResizeRaf=null,!this.disposed&&this.pendingWidth>0&&this.pendingHeight>0&&t.onResize(this.pendingWidth,this.pendingHeight,!1)})}else t.onResize(i,s,!1)};if(typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(i=>{for(const s of i)if(s.target===this.container){const{width:o,height:a}=s.contentRect;o>0&&a>0&&n(o,a)}}),this.resizeObserver.observe(this.container)),typeof document<"u"){const i=()=>{var l;if(this.disposed)return;const s=document.fullscreenElement??document.webkitFullscreenElement??null,o=!!(s&&(s===this.container||s.contains(this.container)));(l=t.onFullscreenChange)==null||l.call(t,o);const a=this.container.getBoundingClientRect();a.width>0&&a.height>0&&n(a.width,a.height)};document.addEventListener("fullscreenchange",i),document.addEventListener("webkitfullscreenchange",i),this.registerCleanup(()=>{document.removeEventListener("fullscreenchange",i),document.removeEventListener("webkitfullscreenchange",i)})}if((e==null?void 0:e.observeViewportIntersection)!==!1&&typeof IntersectionObserver<"u"&&t.onVisibilityChange){const i=t.onVisibilityChange;this.intersectionObserver=new IntersectionObserver(s=>{const o=s[0];o&&i(o.isIntersecting)},{threshold:.01}),this.intersectionObserver.observe(this.container)}if((e==null?void 0:e.observeTabVisibility)!==!1&&typeof document<"u"&&t.onTabHiddenChange){const i=t.onTabHiddenChange,s=()=>i(document.hidden);document.addEventListener("visibilitychange",s),this.registerCleanup(()=>document.removeEventListener("visibilitychange",s))}}registerCleanup(t){if(this.disposed){t();return}this.cleanupCallbacks.push(t)}static disposeObject3D(t){const e=new Set,n=new Set;t.traverse(i=>{if(i instanceof J||i instanceof gr||i instanceof qn){i.geometry&&!e.has(i.geometry)&&(i.geometry.dispose(),e.add(i.geometry));const s=Array.isArray(i.material)?i.material:[i.material];for(const o of s)o&&!n.has(o)&&($i.disposeMaterialTextures(o),o.dispose(),n.add(o))}i instanceof Jn&&i.shadow&&i.shadow.map&&i.shadow.map.dispose()}),t instanceof bs&&t.clear()}static disposeMaterialTextures(t){const e=t;for(const n of Object.keys(e)){const i=e[n];i instanceof ve&&i.dispose()}}disposeAll(t){var e,n;if(!this.disposed){this.disposed=!0,this.pendingResizeRaf!==null&&typeof window<"u"&&(window.cancelAnimationFrame(this.pendingResizeRaf),this.pendingResizeRaf=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null);for(let i=this.cleanupCallbacks.length-1;i>=0;i--)try{(n=(e=this.cleanupCallbacks)[i])==null||n.call(e)}catch{}this.cleanupCallbacks.length=0,t&&$i.disposeObject3D(t)}}}const Xc=.82;function Yc(r,t,e){const n=Math.min(r,t);return e&&r<640?"mobile":r<460||n<280?r<380&&e?"mobile":"compact":r>=1440&&n>=520&&!e?"uhd":r>=960&&n>=400&&!e?"hd":r<720?"compact":"desktop"}function Lr(r){const t=Math.max(1,Math.floor(r.cssWidth)),e=Math.max(1,Math.floor(r.cssHeight)),n=Number.isFinite(r.devicePixelRatio)&&r.devicePixelRatio>0?r.devicePixelRatio:1,i=!!r.isCoarsePointer,s=Yc(t,e,i),o=s==="mobile"?Math.min(1.5,r.config.maxPixelRatio):r.config.maxPixelRatio,a=Math.max(1,Math.min(n,Math.max(1,o))),l=Math.max(2,Math.floor(t*a)),c=Math.max(2,Math.floor(e*a)),h=Math.max(5,Math.min(28,r.config.cellSize));let u=h;if(r.config.autoResponsiveDensity)if(r.config.mode==="mascot")s==="mobile"?u=Math.max(h,8.5):s==="compact"?u=Math.max(6.5,h*.92):(s==="hd"||s==="uhd")&&(u=Math.max(6.5,h*.85));else{const R=1.24-Math.max(0,Math.min(1,(t-360)/1240))*.44;s==="mobile"?u=Math.max(11,Math.round(h*Math.max(1.38,R))):s==="compact"?u=Math.max(9,Number((h*Math.max(1.06,R)).toFixed(2))):s==="hd"?u=Math.max(7.2,Number((h*Math.min(.92,R)).toFixed(2))):s==="uhd"?u=Math.max(6.8,Number((h*Math.min(.84,R)).toFixed(2))):u=Math.max(8,Number((h*R).toFixed(2))),r.isFullscreen&&s!=="mobile"&&(u=Math.max(6.8,Number((u*.93).toFixed(2))))}let d=Math.max(8,Math.round(u*a)),f=Math.max(6,Math.round(d*Xc));const m=r.config.mode==="mascot"?78:190,v=r.config.mode==="mascot"?24:36,g=Math.floor(l/f);g>m?(f=Math.max(6,Math.ceil(l/m)),d=Math.max(8,Math.round(f/Xc))):g<v&&l>=v*6&&(f=Math.max(6,Math.floor(l/v)),d=Math.max(8,Math.round(f/Xc)));const p=Math.max(1,Math.floor(l/f)),x=Math.max(1,Math.floor(c/d)),_=Number((d/a).toFixed(2)),y=a>=1.5||d>=14?96:64,P=d>=12?.26:.18,T=s==="mobile"?4:3;return{tier:s,cssWidth:t,cssHeight:e,effectiveDpr:Number(a.toFixed(2)),physicalWidth:l,physicalHeight:c,activeCellSize:_,cellPhysW:f,cellPhysH:d,columns:p,rows:x,atlasTileSize:y,subCellSampleSpread:P,bloomDownsample:T}}class qc{constructor(t=14){k(this,"currentCellW",0);k(this,"currentCellH",0);k(this,"targetCellW",8);k(this,"targetCellH",10);k(this,"currentSpread",.22);k(this,"targetSpread",.22);k(this,"transitionEnergy",0);k(this,"initialized",!1);k(this,"smoothingSpeed");this.smoothingSpeed=t}setTarget(t,e=!1){if(this.targetCellW=t.cellPhysW,this.targetCellH=t.cellPhysH,this.targetSpread=t.subCellSampleSpread,!this.initialized||e){this.currentCellW=t.cellPhysW,this.currentCellH=t.cellPhysH,this.currentSpread=t.subCellSampleSpread,this.transitionEnergy=0,this.initialized=!0;return}const n=Math.abs(this.targetCellW-this.currentCellW)+Math.abs(this.targetCellH-this.currentCellH);n>.05&&(this.transitionEnergy=Math.min(1,Math.max(this.transitionEnergy,n/6)))}step(t){if(!this.initialized)return{cellW:this.targetCellW,cellH:this.targetCellH,subCellSpread:this.targetSpread,transitionMix:0,isTransitioning:!1};const e=Math.max(0,Math.min(.1,t)),n=e>0?1-Math.exp(-this.smoothingSpeed*e):1;return this.currentCellW+=(this.targetCellW-this.currentCellW)*n,this.currentCellH+=(this.targetCellH-this.currentCellH)*n,this.currentSpread+=(this.targetSpread-this.currentSpread)*n,this.transitionEnergy*=Math.exp(-9.5*e),Math.abs(this.targetCellW-this.currentCellW)+Math.abs(this.targetCellH-this.currentCellH)<.06&&this.transitionEnergy<.03?(this.currentCellW=this.targetCellW,this.currentCellH=this.targetCellH,this.currentSpread=this.targetSpread,this.transitionEnergy=0,{cellW:this.targetCellW,cellH:this.targetCellH,subCellSpread:this.targetSpread,transitionMix:0,isTransitioning:!1}):{cellW:this.currentCellW,cellH:this.currentCellH,subCellSpread:Math.max(this.currentSpread,.28),transitionMix:Math.min(1,this.transitionEnergy),isTransitioning:!0}}}class Ya{constructor(t,e){k(this,"name","InputSystem");k(this,"pointer");k(this,"keyboard");this.pointer=t,this.keyboard=e}update(t,{dt:e}){const n=this.pointer.sample(e),i=this.keyboard.sampleAxes(),s=t.query("InputState");for(const o of s){const a=t.getComponent(o,"InputState");a.pointerX=n.normX,a.pointerY=n.normY,a.pointerActive=n.active,a.isDragging=n.isDown,a.moveX=i.moveX,a.moveZ=i.moveZ;const l=t.getComponent(o,"RotationTarget");if(l&&n.active){const h=n.normX*a.yawSensitivity+n.dragYaw*.85,u=-n.normY*a.pitchSensitivity+n.dragPitch*.65;l.targetYaw=h,l.targetPitch=Math.max(-l.maxPitch,Math.min(l.maxPitch,u)),l.targetRoll=-n.normX*.06}const c=t.getComponent(o,"AnimationState");c&&n.motionSpeed>.04&&(c.excitement=Math.min(1,c.excitement+n.motionSpeed*.35))}}}class Zc{constructor(){k(this,"name","PatrolSystem")}update(t,{elapsed:e}){const n=t.query("Transform","PatrolPath");for(const i of n){const s=t.getComponent(i,"Transform"),o=t.getComponent(i,"PatrolPath"),a=e*o.speed+o.phase,l=o.originX+Math.sin(a)*o.amplitudeX,c=o.originY+Math.sin(a*1.7+o.phase)*o.amplitudeY,h=o.originZ+Math.cos(a*.85)*o.amplitudeZ;if(o.faceTangent){const d=Math.cos(a)*o.amplitudeX*o.speed,f=-Math.sin(a*.85)*o.amplitudeZ*o.speed*.85;Math.abs(d)+Math.abs(f)>.001&&(s.rotY=Math.atan2(d,f),s.rotZ=-d*.045)}s.x=l,s.y=c,s.z=h;const u=t.getComponent(i,"AnimationState");u&&(u.baseY=c)}}}class qa{constructor(t){k(this,"name","MovementRotationSystem");k(this,"terrainHeightFn");this.terrainHeightFn=t}update(t,{dt:e,elapsed:n}){const i=t.query("Transform","RotationTarget");for(const o of i){const a=t.getComponent(o,"Transform"),l=t.getComponent(o,"RotationTarget"),c=t.getComponent(o,"InputState"),h=1-Math.exp(-l.lerpSpeed*e);if(!!(c&&c.pointerActive)){const d=Math.atan2(Math.sin(l.targetYaw-a.rotY),Math.cos(l.targetYaw-a.rotY));a.rotY+=d*h,a.rotX+=(l.targetPitch-a.rotX)*h,a.rotZ+=(l.targetRoll-a.rotZ)*h}else if(l.idleSpinSpeed!==0)a.rotY+=l.idleSpinSpeed*e,a.rotX+=(Math.sin(n*.9)*.04-a.rotX)*h,a.rotZ+=(0-a.rotZ)*h;else{const d=Math.sin(n*.85)*.28,f=Math.cos(n*.65)*.06;a.rotY+=(d-a.rotY)*(h*.6),a.rotX+=(f-a.rotX)*(h*.6),a.rotZ+=(0-a.rotZ)*h}}const s=t.query("Transform","Velocity");for(const o of s){const a=t.getComponent(o,"Transform"),l=t.getComponent(o,"Velocity"),c=t.getComponent(o,"InputState"),h=t.getComponent(o,"AnimationState");if(c&&c.moveSpeed>0&&(c.moveX!==0||c.moveZ!==0)){l.vx=c.moveX*c.moveSpeed,l.vz=c.moveZ*c.moveSpeed;const d=t.getComponent(o,"RotationTarget");d&&(d.targetYaw=Math.atan2(l.vx,l.vz)),h&&(h.excitement=Math.min(1,h.excitement+e*2.5))}if(a.x+=l.vx*e,a.y+=l.vy*e,a.z+=l.vz*e,a.rotX+=l.angularVx*e,a.rotY+=l.angularVy*e,a.rotZ+=l.angularVz*e,c&&c.boundsRadius>0){const d=Math.hypot(a.x,a.z+1.5);if(d>c.boundsRadius){const f=c.boundsRadius/d;a.x*=f,a.z=-1.5+(a.z+1.5)*f}}if(this.terrainHeightFn&&c&&c.moveSpeed>0){const d=this.terrainHeightFn(a.x,a.z);h?h.baseY=d:a.y=d}const u=Math.exp(-l.damping*e);l.vx*=u,l.vy*=u,l.vz*=u}}}class $c{constructor(t=1){k(this,"name","WindSystem");k(this,"windStrength");this.windStrength=t}setWindStrength(t){this.windStrength=Math.max(0,Math.min(3,t))}update(t,{elapsed:e}){const n=t.query("Transform","WindSway");if(n.length===0)return;const i=(.65+.35*Math.sin(e*.72)+.22*Math.sin(e*1.83+1.1))*this.windStrength;for(const s of n){const o=t.getComponent(s,"Transform"),a=t.getComponent(s,"WindSway"),l=e*a.frequency+a.phase,c=Math.sin(l*2.35+a.phase)*.28,h=i*a.gustFactor;o.rotZ=a.baseRotZ+(Math.sin(l)*.72+c+.35)*a.swayAmpZ*h,o.rotX=a.baseRotX+Math.cos(l*.88+a.phase)*a.swayAmpX*h,o.rotY=a.baseRotY+Math.sin(l*.55)*a.swayAmpZ*.35*h}}}class Kc{constructor(){k(this,"name","NeonPulseSystem")}update(t,{elapsed:e}){const n=t.query("NeonBeacon");for(const i of n){const s=t.getComponent(i,"NeonBeacon"),o=Math.sin(e*s.pulseSpeed+s.phase)*.65+Math.sin(e*s.pulseSpeed*2.37+s.phase*1.7)*.35;let a=1;if(s.glitchRate&&s.glitchRate>0){const h=Math.sin(Math.floor(e*14+s.phase*10)*91.7)*43758.5453;h-Math.floor(h)<s.glitchRate*.12&&(a=.42)}const l=Math.max(.2,(1+o*s.pulseAmplitude)*a);s.emissiveMaterial&&(s.emissiveIntensityCache=s.baseEmissiveIntensity*l,s.emissiveMaterial.emissiveIntensity=s.emissiveIntensityCache);const c=t.getComponent(i,"Renderable");c!=null&&c.pointLight&&c.baseLightIntensity!==void 0&&(c.pointLight.intensity=c.baseLightIntensity*l)}}}class Za{constructor(){k(this,"name","RenderSyncSystem")}update(t,{elapsed:e}){const n=t.query("Transform","Renderable");for(const i of n){const s=t.getComponent(i,"Transform"),o=t.getComponent(i,"Renderable");if(o.object3D.position.set(s.x,s.y,s.z),o.object3D.rotation.set(s.rotX,s.rotY,s.rotZ),o.object3D.scale.set(s.scaleX,s.scaleY,s.scaleZ),o.pointLight&&!t.hasComponent(i,"NeonBeacon")&&o.baseLightIntensity!==void 0){const a=o.lightFlickerSpeed??7.2,l=1+Math.sin(e*a+i*1.7)*.12+Math.sin(e*a*2.13+i)*.06;o.pointLight.intensity=o.baseLightIntensity*l}}}}class Jc{constructor(){k(this,"entries",[]);k(this,"nextOrder",0)}addSystem(t,e){const n=e??(this.entries.length+1)*10;return this.entries.push({priority:n,order:this.nextOrder++,system:t}),this.entries.sort((i,s)=>i.priority!==s.priority?i.priority-s.priority:i.order-s.order),this}removeSystem(t){const e=this.entries.findIndex(n=>n.system.name===t);return e===-1?!1:(this.entries.splice(e,1),!0)}getSystemNames(){return this.entries.map(t=>t.system.name)}run(t,e){for(let n=0;n<this.entries.length;n++)this.entries[n].system.update(t,e)}clear(){this.entries.length=0,this.nextOrder=0}}class Qc{constructor(){k(this,"nextEntityId",1);k(this,"entities",new Set);k(this,"stores",{Transform:new Map,Velocity:new Map,RotationTarget:new Map,AnimationState:new Map,Renderable:new Map,NeonBeacon:new Map,PatrolPath:new Map,WindSway:new Map,DepthLayer:new Map,LifecycleTag:new Map,InputState:new Map})}createEntity(){const t=this.nextEntityId++;return this.entities.add(t),t}destroyEntity(t,e=!0){if(!this.entities.has(t))return!1;if(e){const n=this.stores.Renderable.get(t);n&&n.disposeOnDestroy!==!1&&this.disposeRenderableResources(n)}for(const n of Object.keys(this.stores))this.stores[n].delete(t);return this.entities.delete(t),!0}addComponent(t,e,n){if(!this.entities.has(t))throw new Error(`[ECS World] Entity ${t} does not exist.`);return this.stores[e].set(t,n),n}getComponent(t,e){return this.stores[e].get(t)}hasComponent(t,e){return this.stores[e].has(t)}removeComponent(t,e){this.stores[e].delete(t)}query(...t){if(t.length===0)return Array.from(this.entities);let e=this.stores[t[0]];for(let i=1;i<t.length;i++){const s=this.stores[t[i]];s.size<e.size&&(e=s)}const n=[];for(const i of e.keys()){let s=!0;for(let o=0;o<t.length;o++)if(!this.stores[t[o]].has(i)){s=!1;break}s&&n.push(i)}return n}getEntityCount(){return this.entities.size}queryByLayer(t){const e=[];for(const[n,i]of this.stores.DepthLayer.entries())i.layer===t&&e.push(n);return e}destroyEntitiesByRole(t,e=!0){const n=[];for(const[s,o]of this.stores.LifecycleTag.entries())o.role===t&&n.push(s);let i=0;for(const s of n)this.destroyEntity(s,e)&&i++;return i}clear(t=!0){if(t)for(const e of this.stores.Renderable.values())e.disposeOnDestroy!==!1&&this.disposeRenderableResources(e);for(const e of Object.keys(this.stores))this.stores[e].clear();this.entities.clear()}disposeRenderableResources(t){var e;t.pointLight&&(t.pointLight.parent&&t.pointLight.parent.remove(t.pointLight),(e=t.pointLight.shadow)!=null&&e.map&&t.pointLight.shadow.map.dispose()),t.object3D&&(t.object3D.parent&&t.object3D.parent.remove(t.object3D),$i.disposeObject3D(t.object3D))}}class jc{static spawn(t,e,n){const i=(n==null?void 0:n.position)??[0,-.35,0],s=(n==null?void 0:n.scale)??1,o=new jt;o.name="TuxMascotRoot";const a=new he({color:1054754,emissive:33e4,roughness:.72,metalness:.18,flatShading:!0}),l=new he({color:16186367,emissive:13625591,emissiveIntensity:.34,roughness:.45,metalness:.02,flatShading:!0}),c=new he({color:16752412,emissive:16743168,emissiveIntensity:.28,roughness:.52,metalness:.08,flatShading:!0}),h=new fn({color:16777215}),u=new fn({color:329224}),d=new J(new ln(.76,16,14),a);d.position.set(0,.86,0),d.scale.set(.92,1.18,.82),d.castShadow=!0,d.receiveShadow=!0,o.add(d);const f=new J(new ln(.58,16,14),l);f.position.set(0,.78,.28),f.scale.set(.86,1.14,.56),o.add(f);const m=new jt;m.position.set(0,1.72,.04);const v=new J(new ln(.48,16,12),a);v.scale.set(.98,.95,.92),v.castShadow=!0,m.add(v);const g=new J(new ln(.21,12,10),l);g.position.set(-.14,.02,.31),g.scale.set(.85,1.05,.45),m.add(g);const p=new J(new ln(.21,12,10),l);p.position.set(.14,.02,.31),p.scale.set(.85,1.05,.45),m.add(p);for(const N of[-1,1]){const z=new J(new ln(.105,10,8),h);z.position.set(N*.155,.09,.39),z.scale.set(.92,1.15,.55),m.add(z);const q=new J(new ln(.052,8,8),u);q.position.set(N*.145,.09,.445),m.add(q)}const x=new J(new ui(.21,.42,6),c);x.rotation.x=Math.PI*.52,x.scale.set(1.22,1,.58),x.position.set(0,-.07,.54),x.castShadow=!0,m.add(x),o.add(m);const _=new jt;_.position.set(-.66,1.32,.02),_.rotation.z=.28;const y=new J(new ui(.2,.96,8),a);y.position.set(-.08,-.42,0),y.scale.set(.55,1,1.28),y.rotation.z=Math.PI,y.castShadow=!0,_.add(y),o.add(_);const P=new jt;P.position.set(.66,1.32,.02),P.rotation.z=-.28;const T=new J(new ui(.2,.96,8),a);T.position.set(.08,-.42,0),T.scale.set(.55,1,1.28),T.rotation.z=Math.PI,T.castShadow=!0,P.add(T),o.add(P);const E=new jt;E.position.set(-.34,.08,.34),E.rotation.y=.26;const R=new J(new xt(.38,.13,.52),c);R.position.set(0,.02,.12),R.castShadow=!0,E.add(R),o.add(E);const b=new jt;b.position.set(.34,.08,.34),b.rotation.y=-.26;const M=new J(new xt(.38,.13,.52),c);M.position.set(0,.02,.12),M.castShadow=!0,b.add(M),o.add(b);const I=new J(new ui(.18,.34,5),a);if(I.position.set(0,.22,-.64),I.rotation.x=-Math.PI*.42,o.add(I),n!=null&&n.includeShowcaseRig){const N=new he({color:1782596,roughness:.85,metalness:.15,flatShading:!0}),z=new J(new gn(.92,1.08,.16,12),N);z.position.set(0,-.06,.08),z.receiveShadow=!0,o.add(z)}o.position.set(i[0],i[1],i[2]),o.scale.setScalar(s),e.add(o);const B=t.createEntity();return t.addComponent(B,"Transform",{x:i[0],y:i[1],z:i[2],rotX:0,rotY:.14,rotZ:0,scaleX:s,scaleY:s,scaleZ:s}),t.addComponent(B,"Velocity",{vx:0,vy:0,vz:0,angularVx:0,angularVy:0,angularVz:0,damping:6.5}),t.addComponent(B,"RotationTarget",{targetYaw:.14,targetPitch:0,targetRoll:0,lerpSpeed:6.2,idleSpinSpeed:0,maxPitch:.46}),t.addComponent(B,"AnimationState",{baseY:i[1],bobAmplitude:.045,bobFrequency:2.1,breatheAmplitude:.022,phase:.3,excitement:0,parts:{leftWing:_,rightWing:P,head:m,leftFoot:E,rightFoot:b}}),t.addComponent(B,"InputState",{pointerX:0,pointerY:0,pointerActive:!1,isDragging:!1,moveX:0,moveZ:0,yawSensitivity:1.25,pitchSensitivity:.4,moveSpeed:(n==null?void 0:n.moveSpeed)??0,boundsRadius:(n==null?void 0:n.boundsRadius)??0}),t.addComponent(B,"Renderable",{object3D:o}),{entityId:B,rootGroup:o}}}const C_=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);class th{constructor(t){k(this,"pressedKeys",new Set);k(this,"enabled",!1);k(this,"attached",!1);k(this,"requireFocusTarget",null);k(this,"onKeyDownBound");k(this,"onKeyUpBound");k(this,"onWindowBlurBound");this.enabled=!!(t!=null&&t.enabled),this.requireFocusTarget=(t==null?void 0:t.focusTarget)??null,this.onKeyDownBound=this.handleKeyDown.bind(this),this.onKeyUpBound=this.handleKeyUp.bind(this),this.onWindowBlurBound=this.clearKeys.bind(this)}attach(){this.attached||typeof window>"u"||(this.attached=!0,window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound),window.addEventListener("blur",this.onWindowBlurBound))}detach(){!this.attached||typeof window>"u"||(this.attached=!1,window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),window.removeEventListener("blur",this.onWindowBlurBound),this.clearKeys())}setEnabled(t){this.enabled=t,t||this.clearKeys()}isEnabled(){return this.enabled}isKeyDown(t){return this.enabled&&this.pressedKeys.has(t)}clearKeys(){this.pressedKeys.clear()}sampleAxes(){if(!this.enabled)return{moveX:0,moveZ:0,interactPressed:!1};const t=this.pressedKeys.has("KeyA")||this.pressedKeys.has("ArrowLeft")?-1:0,e=this.pressedKeys.has("KeyD")||this.pressedKeys.has("ArrowRight")?1:0,n=this.pressedKeys.has("KeyW")||this.pressedKeys.has("ArrowUp")?-1:0,i=this.pressedKeys.has("KeyS")||this.pressedKeys.has("ArrowDown")?1:0;let s=t+e,o=n+i;const a=Math.hypot(s,o);return a>1&&(s/=a,o/=a),{moveX:s,moveZ:o,interactPressed:this.pressedKeys.has("KeyE")}}isTypingInFormField(t){if(!(t instanceof HTMLElement))return!1;const e=t.tagName;return e==="INPUT"||e==="TEXTAREA"||e==="SELECT"?!0:t.isContentEditable}hasActiveContextFocus(){if(!this.requireFocusTarget||typeof document>"u")return!0;const t=document.activeElement;return t===this.requireFocusTarget||this.requireFocusTarget.contains(t)}handleKeyDown(t){this.enabled&&(t.ctrlKey||t.metaKey||t.altKey||this.isTypingInFormField(t.target)||this.hasActiveContextFocus()&&(this.pressedKeys.add(t.code),C_.has(t.code)&&this.requireFocusTarget&&t.preventDefault()))}handleKeyUp(t){this.pressedKeys.delete(t.code)}}class eh{constructor(t,e){k(this,"container");k(this,"trackWindowHover");k(this,"normX",0);k(this,"normY",0);k(this,"dragYaw",0);k(this,"dragPitch",0);k(this,"active",!1);k(this,"isDown",!1);k(this,"isTouch",!1);k(this,"activeTouchId",null);k(this,"lastClientX",0);k(this,"lastClientY",0);k(this,"motionSpeed",0);k(this,"lastInteractionMs",0);k(this,"touchReleaseHoldTimer",0);k(this,"attached",!1);k(this,"onPointerDownBound");k(this,"onPointerMoveBound");k(this,"onWindowPointerMoveBound");k(this,"onPointerUpBound");k(this,"onPointerLeaveBound");k(this,"onTouchStartBound");k(this,"onTouchMoveBound");k(this,"onTouchEndBound");this.container=t,this.trackWindowHover=!!(e!=null&&e.trackWindowHover),this.onPointerDownBound=this.handlePointerDown.bind(this),this.onPointerMoveBound=this.handleContainerPointerMove.bind(this),this.onWindowPointerMoveBound=this.handleWindowPointerMove.bind(this),this.onPointerUpBound=this.handlePointerUp.bind(this),this.onPointerLeaveBound=this.handlePointerLeave.bind(this),this.onTouchStartBound=this.handleTouchStart.bind(this),this.onTouchMoveBound=this.handleTouchMove.bind(this),this.onTouchEndBound=this.handleTouchEnd.bind(this)}attach(){this.attached||(this.attached=!0,this.container.style.touchAction||(this.container.style.touchAction="pan-y"),this.container.addEventListener("pointerdown",this.onPointerDownBound,{passive:!0}),this.container.addEventListener("pointermove",this.onPointerMoveBound,{passive:!0}),this.container.addEventListener("pointerup",this.onPointerUpBound,{passive:!0}),this.container.addEventListener("pointercancel",this.onPointerUpBound,{passive:!0}),this.container.addEventListener("pointerleave",this.onPointerLeaveBound,{passive:!0}),this.container.addEventListener("touchstart",this.onTouchStartBound,{passive:!0}),this.container.addEventListener("touchmove",this.onTouchMoveBound,{passive:!0}),this.container.addEventListener("touchend",this.onTouchEndBound,{passive:!0}),this.container.addEventListener("touchcancel",this.onTouchEndBound,{passive:!0}),this.trackWindowHover&&typeof window<"u"&&(window.addEventListener("pointermove",this.onWindowPointerMoveBound,{passive:!0}),window.addEventListener("pointerup",this.onPointerUpBound,{passive:!0})))}detach(){this.attached&&(this.attached=!1,this.container.removeEventListener("pointerdown",this.onPointerDownBound),this.container.removeEventListener("pointermove",this.onPointerMoveBound),this.container.removeEventListener("pointerup",this.onPointerUpBound),this.container.removeEventListener("pointercancel",this.onPointerUpBound),this.container.removeEventListener("pointerleave",this.onPointerLeaveBound),this.container.removeEventListener("touchstart",this.onTouchStartBound),this.container.removeEventListener("touchmove",this.onTouchMoveBound),this.container.removeEventListener("touchend",this.onTouchEndBound),this.container.removeEventListener("touchcancel",this.onTouchEndBound),typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pointermove",this.onWindowPointerMoveBound),window.removeEventListener("pointerup",this.onPointerUpBound)))}sample(t){if(this.motionSpeed=Math.max(0,this.motionSpeed-t*2.4),this.touchReleaseHoldTimer>0&&!this.isDown&&(this.touchReleaseHoldTimer=Math.max(0,this.touchReleaseHoldTimer-t),this.touchReleaseHoldTimer===0&&!this.trackWindowHover&&(this.active=!1)),!this.isDown&&!this.active){const e=1-Math.exp(-2.2*t);this.dragYaw+=(0-this.dragYaw)*e,this.dragPitch+=(0-this.dragPitch)*e,this.normX+=(0-this.normX)*e,this.normY+=(0-this.normY)*e}return{normX:this.normX,normY:this.normY,dragYaw:this.dragYaw,dragPitch:this.dragPitch,active:this.active,isDown:this.isDown,isTouch:this.isTouch,motionSpeed:this.motionSpeed,lastInteractionMs:this.lastInteractionMs}}setNormalized(t,e,n=!0){this.normX=Math.max(-1,Math.min(1,t)),this.normY=Math.max(-1,Math.min(1,e)),this.active=n}handlePointerDown(t){t.pointerType==="touch"?this.isTouch=!0:this.isTouch=!1,this.isDown=!0,this.active=!0,this.touchReleaseHoldTimer=0,this.lastClientX=t.clientX,this.lastClientY=t.clientY,t.isTrusted&&(this.lastInteractionMs=Date.now()),this.updateNormalizedFromClient(t.clientX,t.clientY,!1)}handleContainerPointerMove(t){if(t.pointerType==="touch"&&this.activeTouchId!==null)return;t.isTrusted&&(this.lastInteractionMs=Date.now());const e=t.pointerType==="touch"?1.35:1;if(this.isDown){const n=t.clientX-this.lastClientX,i=t.clientY-this.lastClientY;this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.dragYaw=Math.max(-Math.PI,Math.min(Math.PI,this.dragYaw+n*.012*e)),this.dragPitch=Math.max(-.55,Math.min(.55,this.dragPitch+i*.0075*e)),this.motionSpeed=Math.min(1,this.motionSpeed+Math.hypot(n,i)*.026)}this.active=!0,this.updateNormalizedFromClient(t.clientX,t.clientY,!1)}handleWindowPointerMove(t){t.isTrusted&&(this.lastInteractionMs=Date.now(),this.active=!0,this.updateNormalizedFromClient(t.clientX,t.clientY,!0))}handlePointerUp(t){t.pointerType==="touch"&&(this.touchReleaseHoldTimer=1.6),this.isDown=!1}handlePointerLeave(t){t.pointerType!=="touch"&&(this.isDown=!1,this.trackWindowHover||(this.active=!1))}handleTouchStart(t){var n,i;const e=((n=t.changedTouches)==null?void 0:n[0])??((i=t.touches)==null?void 0:i[0]);e&&(this.isTouch=!0,this.isDown=!0,this.active=!0,this.touchReleaseHoldTimer=0,this.activeTouchId=e.identifier??0,this.lastClientX=e.clientX,this.lastClientY=e.clientY,t.isTrusted!==!1&&(this.lastInteractionMs=Date.now()),this.updateNormalizedFromClient(e.clientX,e.clientY,!1))}handleTouchMove(t){const e=t.changedTouches??t.touches;if(!e||e.length===0)return;let n=e[0];if(this.activeTouchId!==null){for(let o=0;o<e.length;o++)if(e[o].identifier===this.activeTouchId){n=e[o];break}}t.isTrusted!==!1&&(this.lastInteractionMs=Date.now());const i=n.clientX-this.lastClientX,s=n.clientY-this.lastClientY;this.lastClientX=n.clientX,this.lastClientY=n.clientY,this.dragYaw=Math.max(-Math.PI,Math.min(Math.PI,this.dragYaw+i*.015)),this.dragPitch=Math.max(-.55,Math.min(.55,this.dragPitch+s*.0085)),this.motionSpeed=Math.min(1,this.motionSpeed+Math.hypot(i,s)*.03),this.active=!0,this.isDown=!0,this.updateNormalizedFromClient(n.clientX,n.clientY,!1)}handleTouchEnd(t){(t.touches?t.touches.length:0)===0&&(this.isDown=!1,this.activeTouchId=null,this.touchReleaseHoldTimer=1.8)}updateNormalizedFromClient(t,e,n){const i=this.container.getBoundingClientRect();if(i.width<=0||i.height<=0)return;const s=this.normX,o=this.normY;if(n&&typeof window<"u"){const l=i.left+i.width*.5,c=i.top+i.height*.5,h=Math.max(i.width*.7,window.innerWidth*.38,160),u=Math.max(i.height*.7,window.innerHeight*.38,140);this.normX=Math.max(-1,Math.min(1,(t-l)/h)),this.normY=Math.max(-1,Math.min(1,-((e-c)/u)))}else{const l=(t-i.left)/i.width,c=(e-i.top)/i.height;this.normX=Math.max(-1,Math.min(1,l*2-1)),this.normY=Math.max(-1,Math.min(1,-(c*2-1)))}const a=Math.hypot(this.normX-s,this.normY-o);this.motionSpeed=Math.min(1,this.motionSpeed+a*1.4)}}const nh=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,R_=`
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
    // Boost cyberpunk neon emissions (cyan, magenta, amber) equally for vivid atmospheric glow
    float maxCh = max(color.r, max(color.g, color.b));
    float minCh = min(color.r, min(color.g, color.b));
    float neonChroma = (maxCh - minCh) * 0.68 + maxCh * 0.48;
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
`,P_=`
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
`,I_=`
  precision highp float;

  uniform sampler2D tScene;
  uniform sampler2D tDepth;
  uniform sampler2D tBloom;
  uniform sampler2D tGlyphAtlas;

  uniform vec2 uResolution;
  uniform vec2 uCellSize;
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
    // 1. Center-anchored monospace cell quantization: expands/contracts symmetrically from
    //    viewport center during container resize & fullscreen transitions without corner crawling!
    vec2 halfRes = uResolution * 0.5;
    vec2 centeredPx = vUv * uResolution - halfRes;
    vec2 cellIndex = floor(centeredPx / uCellSize);
    vec2 localCellUv = fract(centeredPx / uCellSize);
    vec2 glyphUv = vec2(localCellUv.x, 1.0 - localCellUv.y);

    vec2 cellCenterUv = clamp(((cellIndex + 0.5) * uCellSize + halfRes) / uResolution, 0.001, 0.999);
    vec2 cellStepUv = uCellSize / uResolution;
    vec2 pixelPos = vUv * uResolution;

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

    // 4. Sample multi-tap bloom buffer (allows neon signage & wet street reflections to glow richly)
    vec3 bloomCell = texture2D(tBloom, cellCenterUv).rgb;
    vec3 bloomSmooth = texture2D(tBloom, vUv).rgb;
    vec3 bloomBleed = (bloomCell * 0.66 + bloomSmooth * 0.34) * uBloomIntensity;

    vec3 litCellColor = cellColor + bloomBleed * 0.88;
    float luma = getLuma(litCellColor);
    float peakCh = max(litCellColor.r, max(litCellColor.g, litCellColor.b));

    // Perceptual luminance lift: honors vivid saturated cyan/magenta neons whose Rec.709 luma would otherwise look dim
    float neonLuma = mix(luma, peakCh, 0.38);
    float dither = (hash12(cellIndex) - 0.5) * 0.024;
    float perceivedLuma = clamp(pow(max(neonLuma, 0.0), 0.72) + dither, 0.0, 1.0);

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
    float gxLuma = (lE - lW) * 1.75;
    float gyLuma = (lN - lS) * 1.75;

    float gx = abs(gxDepth) > abs(gxLuma) ? gxDepth : gxLuma;
    float gy = abs(gyDepth) > abs(gyLuma) ? gyDepth : gyLuma;
    float edgeMag = length(vec2(gx, gy));

    // Adaptive compact-grid silhouette boost: when cells are coarser (fewer columns on mobile/compact views),
    // lower the structural edge threshold slightly so character & building silhouettes stay unmistakably sharp!
    float gridColsApprox = uResolution.x / max(uCellSize.x, 4.0);
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

    // 7. Sample fine typographic detail mask + procedural block-mass mask and blend via lighten (~35% weight)
    float clampedLocalX = clamp(glyphUv.x, 0.04, 0.96);
    float clampedLocalY = clamp(glyphUv.y, 0.04, 0.96);
    float aaWidth = clamp(1.30 / max(uCellSize.y, 6.0) + uTransitionMix * 0.06, 0.055, 0.26);

    float detailAtlasU = (glyphIndex + clampedLocalX) / uTotalGlyphs;
    float rawDetailMask = texture2D(tGlyphAtlas, vec2(detailAtlasU, clampedLocalY)).r;
    float detailGlyphMask = smoothstep(0.45 - aaWidth, 0.45 + aaWidth, rawDetailMask);

    // Single-pass GPU lighten block composition (max(detail, block * uBlockBlendWeight)):
    // Gives solid volumetric presence to lit architecture, neon signs, character silhouette & street reflections
    // while keeping every fine ASCII stroke crisp on top and deep night sky cells clean!
    float blockPresence = smoothstep(0.08, 0.88, perceivedLuma) * (isSky ? 0.25 : 1.0);
    float blockTier = floor(clamp((perceivedLuma - 0.08) / 0.84, 0.0, 0.999) * max(uBlockCount, 1.0));
    float blockIndex = uRampCount + uStructuralCount + blockTier;
    float blockAtlasU = (blockIndex + clampedLocalX) / uTotalGlyphs;
    float rawBlockMask = uBlockCount > 0.5 ? texture2D(tGlyphAtlas, vec2(blockAtlasU, clampedLocalY)).r : 0.0;
    float sharpBlockMask = smoothstep(0.38 - aaWidth, 0.38 + aaWidth, rawBlockMask);

    // Subpixel pixel-level sub-cell radiance modulation so block mass also carries internal light gradient
    vec3 pixelSceneCol = texture2D(tScene, vUv).rgb + bloomSmooth * (0.45 * uBloomIntensity);
    float subCellLuma = clamp(pow(max(getLuma(pixelSceneCol), 0.0), 0.78), 0.25, 1.15);
    float weightedBlockLayer = sharpBlockMask * blockPresence * uBlockBlendWeight * subCellLuma;

    // Lighten blend (max) between 100% typographic glyph and ~35% volumetric block mass
    float compositeMask = max(detailGlyphMask, clamp(weightedBlockLayer, 0.0, 0.88));

    // 8. High-contrast Cyberpunk neon color grading & atmospheric bloom aura
    float rawLuma = max(getLuma(litCellColor), 0.0001);
    vec3 normalizedHue = litCellColor / rawLuma;
    float boostedBrightness = mix(perceivedLuma, min(1.68, rawLuma * 1.66 + 0.11), 0.78);
    vec3 glyphColor = normalizedHue * boostedBrightness;

    // Preserve hot white-core highlights inside intense neon signs, visors & street puddles
    float hotCore = smoothstep(0.76, 1.32, peakCh);
    glyphColor = mix(glyphColor, vec3(1.42, 1.46, 1.52), hotCore * 0.32);
    glyphColor = min(glyphColor, vec3(1.68, 1.62, 1.72));

    // Block layer carries slightly deeper rich neon tone while typographic stroke shines brightest on top
    vec3 blockTone = glyphColor * 0.86 + bloomSmooth * (0.18 * uBloomIntensity);
    vec3 litForeground = mix(blockTone, glyphColor, clamp(detailGlyphMask * 1.15, 0.0, 1.0));

    vec3 cellBackdrop = uBgColor + bloomSmooth * (0.28 * uBloomIntensity) + cellColor * (0.075 + uBlockBlendWeight * 0.08);
    float phosphor = 0.974 + 0.026 * sin(pixelPos.y * 3.14159265);

    vec3 finalColor = mix(cellBackdrop, litForeground * phosphor, compositeMask);

    vec2 centeredUv = vUv - 0.5;
    float vignette = 1.0 - dot(centeredUv, centeredUv) * 0.32;
    finalColor = mix(uBgColor, finalColor, clamp(vignette, 0.64, 1.0));

    // Clean filmic shoulder preserving punchy cyberpunk contrast
    finalColor = finalColor / (1.0 + finalColor * 0.15);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`,L_='"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';function Gf(r,t,e,n=64){const i=r.length>=2?r:" .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",s=t.length>=4?t:"/\\|_[]",o=4,a=i.length+s.length,l=a+o,c=Math.max(48,Math.min(128,Math.round(n))),h=Math.round(c*.76),u=document.createElement("canvas");u.width=c*l,u.height=c;const d=u.getContext("2d",{alpha:!1});if(!d)throw new Error("[AsciiSceneEngine] Unable to create 2D Canvas context for glyph atlas.");d.fillStyle="#000000",d.fillRect(0,0,u.width,u.height);const f=e||L_;d.font=`700 ${h}px ${f}`,d.fillStyle="#FFFFFF",d.textAlign="center",d.textBaseline="middle";const m=i+s;for(let T=0;T<a;T++){const E=m[T]??" ";if(E===" ")continue;const R=T*c+c*.5,b=c*.53;d.fillText(E,R,b)}const v=Math.max(2,Math.round(c*.06)),g=c-v*2,p=c-v*2,x=8,_=g/x,y=p/x;for(let T=0;T<o;T++){const E=(a+T)*c+v,R=v;if(T===3){d.fillStyle="#FFFFFF",d.fillRect(E,R,g,p);continue}const b=T===0?.28:T===1?.54:.8;d.fillStyle="#FFFFFF";for(let M=0;M<x;M++)for(let I=0;I<x;I++)((I&1)<<2|(M&1)<<3|(I&2)>>1|M&2)/16<b&&d.fillRect(Math.round(E+I*_),Math.round(R+M*y),Math.max(1,Math.ceil(_-.5)),Math.max(1,Math.ceil(y-.5)))}const P=new Id(u);return P.minFilter=de,P.magFilter=de,P.wrapS=We,P.wrapT=We,P.generateMipmaps=!1,P.needsUpdate=!0,{texture:P,rampCount:i.length,structuralCount:s.length,blockCount:o,totalGlyphs:l,tileSize:c}}class D_{constructor(t){k(this,"quadScene");k(this,"quadCamera");k(this,"quadGeometry");k(this,"quadMesh");k(this,"sceneTarget");k(this,"depthTexture");k(this,"bloomTargetA");k(this,"bloomTargetB");k(this,"atlasData");k(this,"downsampleMaterial");k(this,"blurMaterial");k(this,"compositeMaterial");k(this,"transitionController");k(this,"lastProfile",null);k(this,"allocatedPhysW",2);k(this,"allocatedPhysH",2);k(this,"allocatedBloomW",2);k(this,"allocatedBloomH",2);this.quadCamera=new or(-1,1,1,-1,0,1),this.quadScene=new bs,this.quadGeometry=new Yn(2,2),this.transitionController=new qc(14),this.atlasData=Gf(t.characterRamp,t.structuralChars,t.fontFamily,64),this.depthTexture=new Ko(2,2),this.depthTexture.type=Tn,this.depthTexture.minFilter=we,this.depthTexture.magFilter=we,this.sceneTarget=new Ye(2,2,{minFilter:de,magFilter:de,format:Ce,type:Bn,depthBuffer:!0,stencilBuffer:!1,depthTexture:this.depthTexture}),this.bloomTargetA=new Ye(2,2,{minFilter:de,magFilter:de,format:Ce,type:Bn,depthBuffer:!1,stencilBuffer:!1}),this.bloomTargetB=new Ye(2,2,{minFilter:de,magFilter:de,format:Ce,type:Bn,depthBuffer:!1,stencilBuffer:!1}),this.downsampleMaterial=new He({vertexShader:nh,fragmentShader:R_,depthWrite:!1,depthTest:!1,uniforms:{tScene:{value:this.sceneTarget.texture},uTexelSize:{value:new K(.5,.5)},uThreshold:{value:t.bloomThreshold},uTime:{value:0}}}),this.blurMaterial=new He({vertexShader:nh,fragmentShader:P_,depthWrite:!1,depthTest:!1,uniforms:{tInput:{value:null},uTexelSize:{value:new K(.5,.5)},uDirection:{value:new K(1,0)}}});const e=new G(t.palette.background);this.compositeMaterial=new He({vertexShader:nh,fragmentShader:I_,depthWrite:!1,depthTest:!1,uniforms:{tScene:{value:this.sceneTarget.texture},tDepth:{value:this.depthTexture},tBloom:{value:this.bloomTargetA.texture},tGlyphAtlas:{value:this.atlasData.texture},uResolution:{value:new K(2,2)},uCellSize:{value:new K(8,10)},uSubCellSpread:{value:.22},uTransitionMix:{value:0},uRampCount:{value:this.atlasData.rampCount},uStructuralCount:{value:this.atlasData.structuralCount},uBlockCount:{value:this.atlasData.blockCount},uTotalGlyphs:{value:this.atlasData.totalGlyphs},uCameraNear:{value:.5},uCameraFar:{value:110},uDofFocus:{value:t.dofFocusDistance},uDofStrength:{value:t.dofStrength},uEdgeStrength:{value:t.edgeStrength},uBlockBlendWeight:{value:t.blockBlendWeight},uBloomIntensity:{value:t.bloomIntensity},uBgColor:{value:e},uTime:{value:0}}}),this.quadMesh=new J(this.quadGeometry,this.compositeMaterial),this.quadMesh.frustumCulled=!1,this.quadScene.add(this.quadMesh)}applyResolutionProfile(t,e,n=!1){this.lastProfile=t,(this.allocatedPhysW!==t.physicalWidth||this.allocatedPhysH!==t.physicalHeight)&&(this.allocatedPhysW=t.physicalWidth,this.allocatedPhysH=t.physicalHeight,this.sceneTarget.setSize(t.physicalWidth,t.physicalHeight));const i=Math.max(2,Math.floor(t.physicalWidth/t.bloomDownsample)),s=Math.max(2,Math.floor(t.physicalHeight/t.bloomDownsample));(this.allocatedBloomW!==i||this.allocatedBloomH!==s)&&(this.allocatedBloomW=i,this.allocatedBloomH=s,this.bloomTargetA.setSize(i,s),this.bloomTargetB.setSize(i,s)),this.downsampleMaterial.uniforms.uTexelSize.value.set(1/t.physicalWidth,1/t.physicalHeight),this.blurMaterial.uniforms.uTexelSize.value.set(1/i,1/s),this.compositeMaterial.uniforms.uResolution.value.set(t.physicalWidth,t.physicalHeight),this.transitionController.setTarget(t,n);const o=this.transitionController.step(0);return this.compositeMaterial.uniforms.uCellSize.value.set(o.cellW,o.cellH),this.compositeMaterial.uniforms.uSubCellSpread.value=o.subCellSpread,this.compositeMaterial.uniforms.uTransitionMix.value=o.transitionMix,this.atlasData.tileSize!==t.atlasTileSize&&this.rebuildGlyphAtlas(e,t.atlasTileSize),t}setSize(t,e,n,i,s=!1){const o=Lr({cssWidth:t,cssHeight:e,devicePixelRatio:n,config:i,isCoarsePointer:s});return this.applyResolutionProfile(o,i)}applyConfig(t,e,n,i,s=1,o=!1){var l;const a=Lr({cssWidth:n,cssHeight:i,devicePixelRatio:((l=this.lastProfile)==null?void 0:l.effectiveDpr)??s,config:t,isCoarsePointer:o});return(e||this.atlasData.tileSize!==a.atlasTileSize)&&this.rebuildGlyphAtlas(t,a.atlasTileSize),this.downsampleMaterial.uniforms.uThreshold.value=t.bloomThreshold,this.compositeMaterial.uniforms.uBloomIntensity.value=t.bloomIntensity,this.compositeMaterial.uniforms.uDofFocus.value=t.dofFocusDistance,this.compositeMaterial.uniforms.uDofStrength.value=t.dofStrength,this.compositeMaterial.uniforms.uEdgeStrength.value=t.edgeStrength,this.compositeMaterial.uniforms.uBlockBlendWeight.value=t.blockBlendWeight,this.compositeMaterial.uniforms.uBgColor.value.set(t.palette.background),this.applyResolutionProfile(a,t,!1)}rebuildGlyphAtlas(t,e){const n=this.atlasData;this.atlasData=Gf(t.characterRamp,t.structuralChars,t.fontFamily,e),this.compositeMaterial.uniforms.tGlyphAtlas.value=this.atlasData.texture,this.compositeMaterial.uniforms.uRampCount.value=this.atlasData.rampCount,this.compositeMaterial.uniforms.uStructuralCount.value=this.atlasData.structuralCount,this.compositeMaterial.uniforms.uBlockCount.value=this.atlasData.blockCount,this.compositeMaterial.uniforms.uTotalGlyphs.value=this.atlasData.totalGlyphs,n.texture.dispose()}render(t,e,n,i,s=.016666666666666666){const o=this.transitionController.step(s);this.compositeMaterial.uniforms.uCellSize.value.set(o.cellW,o.cellH),this.compositeMaterial.uniforms.uSubCellSpread.value=o.subCellSpread,this.compositeMaterial.uniforms.uTransitionMix.value=o.transitionMix,this.compositeMaterial.uniforms.uCameraNear.value=n.near,this.compositeMaterial.uniforms.uCameraFar.value=n.far,this.compositeMaterial.uniforms.uTime.value=i,this.downsampleMaterial.uniforms.uTime.value=i,t.setRenderTarget(this.sceneTarget),t.clear(!0,!0,!1),t.render(e,n);const a=t.info.render.calls,l=t.info.render.triangles;return this.quadMesh.material=this.downsampleMaterial,t.setRenderTarget(this.bloomTargetA),t.render(this.quadScene,this.quadCamera),this.quadMesh.material=this.blurMaterial,this.blurMaterial.uniforms.tInput.value=this.bloomTargetA.texture,this.blurMaterial.uniforms.uDirection.value.set(1.35,0),t.setRenderTarget(this.bloomTargetB),t.render(this.quadScene,this.quadCamera),this.blurMaterial.uniforms.tInput.value=this.bloomTargetB.texture,this.blurMaterial.uniforms.uDirection.value.set(0,1.35),t.setRenderTarget(this.bloomTargetA),t.render(this.quadScene,this.quadCamera),this.quadMesh.material=this.compositeMaterial,t.setRenderTarget(null),t.render(this.quadScene,this.quadCamera),{drawCalls:a,triangles:l}}dispose(){this.quadScene.remove(this.quadMesh),this.quadGeometry.dispose(),this.downsampleMaterial.dispose(),this.blurMaterial.dispose(),this.compositeMaterial.dispose(),this.atlasData.texture.dispose(),this.depthTexture.dispose(),this.sceneTarget.dispose(),this.bloomTargetA.dispose(),this.bloomTargetB.dispose()}}class $a{constructor(t){k(this,"mode");k(this,"baseCameraPos",new C);k(this,"lookAtTarget",new C);k(this,"smoothedPointer",new K(0,0));k(this,"smoothedDrag",new K(0,0));k(this,"cursorLight");k(this,"particles",null);k(this,"particlePositions",null);k(this,"particleColors",null);k(this,"particleSeeds",[]);k(this,"centerOffset",[0,-4.6]);this.mode=t.config.mode,this.baseCameraPos.set(...t.baseCameraPos),this.lookAtTarget.set(...t.lookAtTarget),t.particleOrigin&&(this.centerOffset=t.particleOrigin),this.cursorLight=new Qn(new G(t.config.palette.cursorLight),t.config.cursorLightIntensity*(this.mode==="mascot"?4.5:13.5),this.mode==="mascot"?10:18,1.5),this.cursorLight.position.set(0,2.4,4.2),t.scene.add(this.cursorLight);const e=t.particleCount??(this.mode==="mascot"?16:240);e>0&&this.buildParticles(t.scene,t.config.palette,e)}buildParticles(t,e,n){this.particlePositions=new Float32Array(n*3),this.particleColors=new Float32Array(n*3);const i=new G(e.coolAmbient).lerp(new G("#D8FFFF"),.28),s=new G(e.warmLight).lerp(new G("#FFD0EB"),.22),o=new G(e.warmCore);for(let c=0;c<n;c++){let h="spark";if(this.mode==="playground"){const R=c%10;R<6?h="rain":R<8?h="steam":h="spark"}const u=Math.sin(c*91.3+1.7)*43758.5453,d=Math.sin(c*217.9+5.3)*43758.5453,f=u-Math.floor(u),m=d-Math.floor(d),v=this.mode==="mascot"?.9+c*1.37%1.4:.7+f*5.6,g=c*2.39996,p=this.mode==="mascot"||h==="rain"?-.2:.15,x=this.mode==="mascot"?2.4:h==="rain"?16.5:h==="steam"?4.2:8.4,_=h==="steam"?(c%2===0?-3.6:3.6)+(f-.5)*2.2:(f-.5)*26,y=h==="steam"?-3.5+m*10.5:(m-.5)*24-2,P=h==="rain"?-(10.8+c%6*1.85):h==="steam"?.65+c%4*.18:.55+c%5*.16,T=p+m*(x-p);this.particleSeeds.push({kind:h,baseRadius:v,angleOffset:g,speedY:P,minY:p,maxY:x,spawnX:_,spawnZ:y,windSensitivity:.75+c%5*.14}),this.particlePositions[c*3]=h==="spark"?Math.cos(g)*v+this.centerOffset[0]:_,this.particlePositions[c*3+1]=T,this.particlePositions[c*3+2]=h==="spark"?Math.sin(g)*v+this.centerOffset[1]:y;const E=h==="rain"?c%5===0?s:c%7===0?o:i:h==="steam"?c%2===0?i:s:c%2===0?o:s;this.particleColors[c*3]=E.r,this.particleColors[c*3+1]=E.g,this.particleColors[c*3+2]=E.b}const a=new Gt;a.setAttribute("position",new ne(this.particlePositions,3)),a.setAttribute("color",new ne(this.particleColors,3));const l=new mr({size:this.mode==="mascot"?.12:.28,vertexColors:!0,transparent:!0,opacity:this.mode==="mascot"?.65:.94,blending:Fr,depthWrite:!1});this.particles=new gr(a,l),t.add(this.particles)}update(t,e,n,i,s){const o=1-Math.exp(-s.parallaxSmoothing*t),a=n.active?n.normX:0,l=n.active?n.normY:0;this.smoothedPointer.x+=(a-this.smoothedPointer.x)*o,this.smoothedPointer.y+=(l-this.smoothedPointer.y)*o,this.smoothedDrag.x+=(n.dragYaw-this.smoothedDrag.x)*o,this.smoothedDrag.y+=(n.dragPitch-this.smoothedDrag.y)*o;const c=s.parallaxIntensity;if(this.mode==="mascot"){const h=Math.sin(e*.85)*.04;i.position.set(this.baseCameraPos.x+this.smoothedPointer.x*c*.25,this.baseCameraPos.y+this.smoothedPointer.y*c*.16+h,this.baseCameraPos.z),i.lookAt(this.lookAtTarget),this.cursorLight.position.set(this.smoothedPointer.x*2.8,1.25+this.smoothedPointer.y*1.4,2.6)}else{const h=Math.sin(e*.35)*.3,u=Math.cos(e*.28)*.12,d=Math.sin(this.smoothedDrag.x*.55)*2.35,f=-this.smoothedDrag.y*1.45;i.position.set(this.baseCameraPos.x+this.smoothedPointer.x*c+d+h,Math.max(1.15,this.baseCameraPos.y+this.smoothedPointer.y*(c*.48)+f+u),this.baseCameraPos.z-Math.abs(this.smoothedPointer.x+d*.25)*.45),i.lookAt(this.lookAtTarget.x+this.smoothedPointer.x*.75+this.smoothedDrag.x*1.25,this.lookAtTarget.y+this.smoothedPointer.y*.42-this.smoothedDrag.y*.85,this.lookAtTarget.z),this.cursorLight.position.set(this.smoothedPointer.x*5.8+d*.6,2.1+this.smoothedPointer.y*1.8,3.6-this.smoothedPointer.y*3.5)}if(this.particles&&this.particlePositions){const h=s.windStrength??1,u=(.75+.38*Math.sin(e*.68)+.18*Math.sin(e*1.95))*h,d=this.particleSeeds.length;for(let m=0;m<d;m++){const v=this.particleSeeds[m],g=v.maxY-v.minY;if(v.kind==="rain"){const p=((v.maxY+e*v.speedY-m*.73)%g+g)%g,x=v.minY+p,y=(v.maxY-x)*.16*u*v.windSensitivity,P=((v.spawnX+y+14)%28+28)%28-14;this.particlePositions[m*3]=P,this.particlePositions[m*3+1]=x,this.particlePositions[m*3+2]=v.spawnZ}else if(v.kind==="steam"){const p=((e*v.speedY+m*.57)%g+g)%g,x=v.minY+p,_=p*.72*u*v.windSensitivity+Math.sin(e*1.4+m)*.25;this.particlePositions[m*3]=v.spawnX+_,this.particlePositions[m*3+1]=x,this.particlePositions[m*3+2]=v.spawnZ+Math.cos(e*.9+m)*.2}else{const p=v.minY+((e*v.speedY+m*.41)%g+g)%g,x=v.angleOffset+e*.32*(m%2===0?1:-1),_=v.baseRadius+Math.sin(e*.9+m)*.18,y=(p-v.minY)*.12*u;this.particlePositions[m*3]=Math.cos(x)*_+this.centerOffset[0]+y,this.particlePositions[m*3+1]=p,this.particlePositions[m*3+2]=Math.sin(x)*_+this.centerOffset[1]}}const f=this.particles.geometry.getAttribute("position");f.needsUpdate=!0}}applyConfig(t){if(this.cursorLight.color.set(t.palette.cursorLight),this.cursorLight.intensity=t.cursorLightIntensity*(this.mode==="mascot"?4.5:13.5),this.particles&&this.particleColors){const e=new G(t.palette.coolAmbient).lerp(new G("#D8FFFF"),.28),n=new G(t.palette.warmLight).lerp(new G("#FFD0EB"),.22),i=new G(t.palette.warmCore);for(let o=0;o<this.particleSeeds.length;o++){const a=this.particleSeeds[o],l=a.kind==="rain"?o%5===0?n:o%7===0?i:e:a.kind==="steam"?o%2===0?e:n:o%2===0?i:n;this.particleColors[o*3]=l.r,this.particleColors[o*3+1]=l.g,this.particleColors[o*3+2]=l.b}const s=this.particles.geometry.getAttribute("color");s.needsUpdate=!0}}getCursorLight(){return this.cursorLight}}const ih={id:"cyberpunk-citadel",title:"Neo-District 09 // Rain-Slicked Cyberpunk Avenue",themeStyle:"cyberpunk",terrainSize:60,terrainSegments:64,waterSize:68,waterLevel:-.06,fogDensity:.021,cameraAnchor:[0,3.35,13.4],cameraLookAt:[0,2.55,-5.5],shrineCenter:[0,-4.6],avatarSpawn:[0,4.15],causewayStones:8,buildings:[{x:-7.1,z:5.4,width:3.1,depth:3.2,height:8.6,floors:5,neonTone:"cyan",hasBillboard:!0,hasStorefront:!0,setbackRatio:.78},{x:7.2,z:5.2,width:3.2,depth:3.2,height:9.2,floors:6,neonTone:"magenta",hasBillboard:!0,hasStorefront:!0,setbackRatio:.75},{x:-6.6,z:.8,width:3,depth:3.4,height:11.4,floors:7,neonTone:"amber",hasBillboard:!0,hasStorefront:!0,hasAntenna:!0,setbackRatio:.72},{x:6.7,z:.6,width:3.1,depth:3.4,height:12.2,floors:8,neonTone:"cyan",hasBillboard:!0,hasStorefront:!0,hasAntenna:!0,setbackRatio:.7},{x:-6.4,z:-4.2,width:3.2,depth:3.4,height:14.5,floors:9,neonTone:"magenta",hasBillboard:!0,hasStorefront:!0,hasAntenna:!0,setbackRatio:.68},{x:6.5,z:-4.4,width:3.2,depth:3.4,height:15.2,floors:10,neonTone:"amber",hasBillboard:!0,hasStorefront:!0,hasAntenna:!0,setbackRatio:.68},{x:-11.2,z:-1.8,width:3.8,depth:4,height:13.6,floors:8,neonTone:"cyan",hasAntenna:!0},{x:11.4,z:-2,width:3.8,depth:4,height:14,floors:9,neonTone:"magenta",hasAntenna:!0},{x:-14.2,z:-12.5,width:4.4,depth:4.2,height:19.5,floors:12,neonTone:"cyan",hasAntenna:!0,setbackRatio:.65},{x:-7.2,z:-13.8,width:4.2,depth:4,height:23.5,floors:14,neonTone:"magenta",hasAntenna:!0,hasBillboard:!0,setbackRatio:.66},{x:-2.6,z:-18.2,width:4,depth:4,height:27.5,floors:16,neonTone:"cyan",hasAntenna:!0,setbackRatio:.62},{x:2.8,z:-18.6,width:4.2,depth:4,height:29,floors:17,neonTone:"amber",hasAntenna:!0,setbackRatio:.6},{x:7.5,z:-14,width:4.2,depth:4,height:22.8,floors:14,neonTone:"cyan",hasAntenna:!0,hasBillboard:!0,setbackRatio:.66},{x:14.4,z:-12.2,width:4.4,depth:4.2,height:18.8,floors:11,neonTone:"magenta",hasAntenna:!0,setbackRatio:.68}],streetPoles:[{x:-4.35,z:6.4,height:4.3,side:-1,tone:"cyan",hasHangingBanner:!0},{x:4.35,z:6.4,height:4.3,side:1,tone:"magenta",hasHangingBanner:!0},{x:-4.35,z:1.9,height:4.5,side:-1,tone:"amber",hasHangingBanner:!0},{x:4.35,z:1.9,height:4.5,side:1,tone:"cyan",hasHangingBanner:!0},{x:-4.35,z:-2.6,height:4.6,side:-1,tone:"magenta",hasHangingBanner:!0},{x:4.35,z:-2.6,height:4.6,side:1,tone:"amber",hasHangingBanner:!0}],drones:[{origin:[0,5.4,-1.2],amplitude:[6.4,.42,3.6],speed:.68,phase:0,tone:"cyan"},{origin:[0,7.2,-7.4],amplitude:[9.6,.52,2.8],speed:-.52,phase:2.1,tone:"magenta"},{origin:[0,9.4,-12.5],amplitude:[11.5,.48,2.2],speed:.44,phase:4.2,tone:"amber"}],trees:[{x:-4.6,z:3.6,scale:1},{x:4.6,z:3.6,scale:1},{x:-4.6,z:-.8,scale:1.1},{x:4.6,z:-.8,scale:1.1}],boulders:[{x:-3.9,z:5.1,scale:.65},{x:3.9,z:5.1,scale:.65}],braziers:[{x:-3.65,z:3.2,tone:"cyan"},{x:3.65,z:3.2,tone:"magenta"}]},sh={"cyberpunk-citadel":ih,"sanctuary-isle":{...ih,id:"sanctuary-isle"}};class rh{static load(t){return t&&sh[t]?sh[t]:ih}static listMapIds(){return Object.keys(sh)}}const U_={foreground:0,midground:1,background:2,sky:3};class oh{constructor(){k(this,"blueprints",new Map)}register(t){return this.blueprints.set(t.id,t),this}has(t){return this.blueprints.has(t)}listIds(){return Array.from(this.blueprints.keys())}spawn(t,e,n){var u,d,f,m;const i=this.blueprints.get(t);if(!i)throw new Error(`[EntityBlueprintRegistry] Unknown blueprint "${t}".`);const s=i.build(e,n),o=e.scale??1,a=e.rotationY??0,l=e.layer??i.defaultLayer;s.object3D.position.set(e.position[0],e.position[1],e.position[2]),s.object3D.rotation.y=a,s.object3D.scale.setScalar(o),(e.parentGroup??e.scene).add(s.object3D),s.pointLight&&!s.pointLight.parent&&e.scene.add(s.pointLight);const h=e.world.createEntity();if(e.world.addComponent(h,"LifecycleTag",{role:i.role,label:((d=(u=s.components)==null?void 0:u.LifecycleTag)==null?void 0:d.label)??`${i.id}#${h}`}),e.world.addComponent(h,"DepthLayer",{layer:l,order:U_[l],contrastPriority:((m=(f=s.components)==null?void 0:f.DepthLayer)==null?void 0:m.contrastPriority)??i.contrastPriority??(l==="foreground"?1:l==="midground"?.72:.45)}),e.world.addComponent(h,"Transform",{x:e.position[0],y:e.position[1],z:e.position[2],rotX:0,rotY:a,rotZ:0,scaleX:o,scaleY:o,scaleZ:o}),e.world.addComponent(h,"Renderable",{object3D:s.object3D,pointLight:s.pointLight,baseLightIntensity:s.baseLightIntensity,lightFlickerSpeed:s.lightFlickerSpeed,disposeOnDestroy:!0}),s.components){const v=Object.keys(s.components);for(const g of v){if(g==="LifecycleTag"||g==="DepthLayer")continue;const p=s.components[g];p!==void 0&&e.world.addComponent(h,g,p)}}return{entityId:h,object3D:s.object3D,pointLight:s.pointLight}}}class sn{constructor(t){k(this,"foreground",new jt);k(this,"midground",new jt);k(this,"background",new jt);k(this,"sky",new jt);this.foreground.name="DepthLayer_Foreground",this.midground.name="DepthLayer_Midground",this.background.name="DepthLayer_Background",this.sky.name="DepthLayer_Sky",t.add(this.sky),t.add(this.background),t.add(this.midground),t.add(this.foreground)}getGroup(t){switch(t){case"foreground":return this.foreground;case"midground":return this.midground;case"background":return this.background;case"sky":return this.sky}}static classifyZ(t){return t>=2.2?"foreground":t>=-9.5?"midground":t>=-24?"background":"sky"}}class Ki{static createMaterialBank(t){const e=new he({color:new G(t.coolAmbient),emissive:new G(t.coolAmbient),emissiveIntensity:2.7,roughness:.14,flatShading:!0}),n=new he({color:new G(t.warmLight),emissive:new G(t.warmLight),emissiveIntensity:2.7,roughness:.14,flatShading:!0}),i=new he({color:new G(t.warmCore),emissive:new G(t.warmCore),emissiveIntensity:2.6,roughness:.16,flatShading:!0}),s=new he({color:1055017,roughness:.5,metalness:.72,flatShading:!0}),o=new he({color:1648445,roughness:.54,metalness:.64,flatShading:!0}),a=new he({color:1582392,roughness:.48,metalness:.78,flatShading:!0}),l=new he({color:2505561,emissive:new G(t.coolAmbient).multiplyScalar(.22),roughness:.5,flatShading:!0});return{cyan:e,magenta:n,amber:i,hullDark:s,hullMid:o,poleMetal:a,cableMetal:l,updatePalette(c){e.color.set(c.coolAmbient),e.emissive.set(c.coolAmbient),n.color.set(c.warmLight),n.emissive.set(c.warmLight),i.color.set(c.warmCore),i.emissive.set(c.warmCore),l.emissive.set(c.coolAmbient).multiplyScalar(.22)}}}static resolveToneMaterial(t,e){return e==="cyan"?t.cyan:e==="magenta"?t.magenta:t.amber}static resolveSecondaryTone(t){return t==="cyan"?"magenta":t==="magenta"?"amber":"cyan"}static composeUrbanBuilding(t,e){const n=new jt;n.name=`UrbanBlock_${t.seedIndex}`,n.position.set(t.x,t.baseY,t.z);const i=this.resolveToneMaterial(e,t.neonTone),s=this.resolveSecondaryTone(t.neonTone),o=this.resolveToneMaterial(e,s),a=t.x<0?1:t.x>0?-1:1,l=new J(new xt(t.width,t.height,t.depth),t.seedIndex%2===0?e.hullDark:e.hullMid);l.position.y=t.height*.5,l.castShadow=!0,l.receiveShadow=!0,n.add(l);const c=t.setbackRatio??.72,h=t.height*.24,u=new J(new xt(t.width*c,h,t.depth*c),e.hullDark);u.position.y=t.height+h*.5,n.add(u);const d=new J(new xt(t.width*1.04,.2,t.depth*1.04),i);d.position.y=t.height+.06,n.add(d);const f=new J(new xt(t.width*c*1.04,.15,t.depth*c*1.04),o);f.position.y=t.height+h+.04,n.add(f);for(const g of[-1,1]){const p=new J(new xt(.14,t.height*.92,.14),g>0?i:o);p.position.set(a*(t.width*.5+.04),t.height*.48,g*(t.depth*.5+.04)),n.add(p)}const m=t.floors??Math.max(4,Math.floor(t.height/1.8)),v=3;for(let g=1;g<=m;g++){const p=1.4+(g-.5)/m*(t.height-1.9);if(!(p>=t.height-.35))for(let x=0;x<v;x++){const _=Math.sin((t.seedIndex+1)*37.7+g*13.3+x*7.1)*43758.5453,y=_-Math.floor(_);if(y<.3)continue;const P=y>.82?o:y>.54?e.amber:i,T=(x-(v-1)*.5)*(t.width*.27),E=new J(new xt(t.width*.2,.25,.08),P);E.position.set(T,p,t.depth*.5+.05),n.add(E);const R=(x-(v-1)*.5)*(t.depth*.27),b=new J(new xt(.08,.25,t.depth*.2),P);b.position.set(a*(t.width*.5+.05),p,R),n.add(b)}}if(t.hasStorefront){const g=new J(new xt(.88,.16,t.depth*.86),o);g.position.set(a*(t.width*.5+.44),1.38,0),n.add(g);const p=new J(new xt(.1,.94,t.depth*.74),e.amber);p.position.set(a*(t.width*.5+.06),.7,0),n.add(p)}if(t.hasBillboard){const g=this.composeNeonSignPanel({height:3.3,depthSpan:1.02,inwardSign:a,primaryTone:s,secondaryTone:"amber"},e);g.position.set(a*(t.width*.5),t.height*.52,.42),n.add(g)}if(t.hasAntenna){const g=2.8+t.seedIndex%3*1.1,p=new J(new gn(.045,.11,g,4),e.hullMid);p.position.y=t.height+h+g*.5,n.add(p);const x=new J(new vn(.22,0),e.magenta);x.position.y=t.height+h+g+.12,n.add(x)}return n}static composeNeonSignPanel(t,e){const n=new jt,i=this.resolveToneMaterial(e,t.primaryTone),s=this.resolveToneMaterial(e,t.secondaryTone),o=new J(new xt(.76,.1,.12),e.hullMid);o.position.set(t.inwardSign*.38,t.height*.32,0),n.add(o);const a=new J(new xt(.76,.1,.12),e.hullMid);a.position.set(t.inwardSign*.38,-t.height*.28,0),n.add(a);const l=new J(new xt(.18,t.height,t.depthSpan),i);l.position.set(t.inwardSign*.7,0,0),n.add(l);for(let h=-1;h<=1;h++){const u=new J(new xt(.22,.11,t.depthSpan*1.04),e.hullDark);u.position.set(t.inwardSign*.7,h*(t.height*.26),0),n.add(u)}const c=new J(new xt(.98,.68,.16),s);return c.position.set(t.inwardSign*.54,-t.height*.58,t.depthSpan*.65),n.add(c),n}static composeStreetLampPole(t,e){const n=new jt;n.name="StreetLampPole",n.position.set(t.x,t.baseY,t.z);const i=this.resolveToneMaterial(e,t.tone),s=t.side<0?1:-1,o=new J(new xt(.34,.32,.34),e.hullDark);o.position.y=.16,n.add(o);const a=new J(new xt(.16,t.height,.16),e.poleMetal);a.position.y=t.height*.5,a.castShadow=!0,n.add(a);const l=new J(new xt(.28,.44,.28),e.hullMid);l.position.set(-s*.12,t.height*.62,0),n.add(l);const c=new J(new xt(1.42,.11,.12),e.poleMetal);c.position.set(s*.58,t.height-.18,0),n.add(c);const h=new J(new xt(.66,.13,.26),i);return h.position.set(s*1,t.height-.28,0),n.add(h),n}static composeCatenaryCableSpan(t,e,n){const i=new jt;i.name="CatenaryCableSpan";const s=t*.36,o=new J(new xt(s,.055,.055),n.cableMetal);o.position.set(-t*.33,-.24,0),o.rotation.z=-.15,i.add(o);const a=new J(new xt(s*.96,.055,.055),n.cableMetal);a.position.set(0,-.46,0),i.add(a);const l=new J(new xt(s,.055,.055),n.cableMetal);l.position.set(t*.33,-.24,0),l.rotation.z=.15,i.add(l);const c=new J(new vn(.19,0),this.resolveToneMaterial(n,e));return c.position.set(0,-.58,0),i.add(c),i}static composeStreetKioskProp(t,e){const n=new jt;n.name="StreetVendingKiosk",n.position.set(t.x,t.baseY,t.z);const i=this.resolveToneMaterial(e,t.tone),s=new J(new xt(.62,1.58,.86),e.hullDark);s.position.y=.79,s.castShadow=!0,s.receiveShadow=!0,n.add(s);const o=new J(new xt(.08,.88,.66),i);o.position.set(t.facingX*.31,.96,0),n.add(o);const a=new J(new xt(.1,.18,.52),e.amber);return a.position.set(t.facingX*.31,.32,0),n.add(a),n}}class ah{static createDefaultBlueprintRegistry(t,e=!0){const n=new oh;return n.register({id:"cyber.holo-reactor",role:"core",defaultLayer:"midground",contrastPriority:.9,build:(i,s)=>{const o=new jt;o.name="CyberHoloReactor";const a=new he({color:new G(t.warmCore),emissive:new G(t.warmLight),emissiveIntensity:2.95,roughness:.12,metalness:.35,flatShading:!0}),l=new he({color:new G(t.coolAmbient),emissive:new G(t.coolAmbient),emissiveIntensity:2.15,roughness:.22,metalness:.65,flatShading:!0}),c=new he({color:new G(t.warmCore),emissive:new G(t.warmCore),emissiveIntensity:1.65,roughness:.3,metalness:.7,flatShading:!0}),h=new J(new vn(1.05,0),a);h.scale.set(.92,1.72,.92),o.add(h);const u=new jt,d=new J(new ki(1.74,.085,6,24),l);d.rotation.x=Math.PI*.36,u.add(d);const f=new J(new ki(1.28,.06,5,16),c);f.rotation.y=Math.PI*.28,u.add(f),o.add(u);const m=s.enableShadows??e,v=new Qn(new G(t.warmLight),52,40,1.45);return v.position.set(i.position[0],i.position[1]+.35,i.position[2]+.5),v.castShadow=m,m&&(v.shadow.mapSize.width=512,v.shadow.mapSize.height=512,v.shadow.camera.near=.5,v.shadow.camera.far=36,v.shadow.bias=-.002),{object3D:o,pointLight:v,baseLightIntensity:52,lightFlickerSpeed:6.8,components:{LifecycleTag:{role:"core",label:"HoloReactorCore"},RotationTarget:{targetYaw:0,targetPitch:0,targetRoll:0,lerpSpeed:3.2,idleSpinSpeed:.78,maxPitch:.25},AnimationState:{baseY:i.position[1],bobAmplitude:.22,bobFrequency:1.9,breatheAmplitude:.025,phase:i.phase??0,excitement:0,parts:{orbitRing:u}},NeonBeacon:{emissiveMaterial:a,baseEmissiveIntensity:2.95,pulseSpeed:3.4,pulseAmplitude:.18,phase:.4,glitchRate:.08}}}}}),n.register({id:"cyber.neon-pylon",role:"beacon",defaultLayer:"foreground",contrastPriority:.85,build:(i,s)=>{const o=new jt;o.name="CyberNeonPylon";const a=new he({color:1252654,roughness:.5,metalness:.75,flatShading:!0}),l=s.tone==="cyan"?t.coolAmbient:s.tone==="magenta"?t.warmLight:t.warmCore,c=new he({color:new G(l),emissive:new G(l),emissiveIntensity:2.75,roughness:.14,flatShading:!0}),h=new J(new xt(.46,.34,.46),a);h.position.y=.17,h.castShadow=!0,h.receiveShadow=!0,o.add(h);const u=new J(new xt(.2,1.95,.2),a);u.position.y=1.12,u.castShadow=!0,o.add(u);const d=new J(new xt(.14,1.55,.28),c);d.position.y=1.28,o.add(d);const f=new J(new vn(.22,0),c);f.position.y=2.28,o.add(f);const m=new Qn(new G(l),18,16,1.55);m.position.set(i.position[0],i.position[1]+2.15,i.position[2]);const v=i.phase??0;return{object3D:o,pointLight:m,baseLightIntensity:18,lightFlickerSpeed:8.5,components:{LifecycleTag:{role:"beacon",label:`NeonPylon_${s.tone}`},AnimationState:{baseY:i.position[1],bobAmplitude:0,bobFrequency:2.2,breatheAmplitude:.01,phase:v,excitement:0},NeonBeacon:{emissiveMaterial:c,baseEmissiveIntensity:2.75,pulseSpeed:4.2,pulseAmplitude:.2,phase:v,glitchRate:.14}}}}}),n.register({id:"cyber.wind-banner",role:"prop",defaultLayer:"midground",contrastPriority:.78,build:(i,s)=>{const o=new jt;o.name="HangingNeonBanner";const a=new he({color:922914,roughness:.55,metalness:.75,flatShading:!0}),l=s.tone==="cyan"?t.coolAmbient:s.tone==="magenta"?t.warmLight:t.warmCore,c=new he({color:new G(l),emissive:new G(l),emissiveIntensity:2.5,roughness:.18,flatShading:!0}),h=new J(new xt(.1,s.height,s.width),a);h.position.y=-s.height*.5,o.add(h);const u=new J(new xt(.14,s.height*.84,s.width*.82),c);u.position.y=-s.height*.5,o.add(u);for(let f=1;f<=2;f++){const m=new J(new xt(.17,.08,s.width*.86),a);m.position.y=-s.height*(.28*f+.1),o.add(m)}const d=i.phase??0;return{object3D:o,components:{LifecycleTag:{role:"prop",label:`WindSign_${s.tone}`},WindSway:{baseRotX:0,baseRotY:0,baseRotZ:0,swayAmpZ:.16,swayAmpX:.09,frequency:2.35,phase:d,gustFactor:1},NeonBeacon:{emissiveMaterial:c,baseEmissiveIntensity:2.5,pulseSpeed:3.6,pulseAmplitude:.18,phase:d,glitchRate:.18}}}}}),n.register({id:"cyber.hover-drone",role:"vehicle",defaultLayer:"midground",contrastPriority:.8,build:(i,s)=>{const o=new jt;o.name="CyberHoverSpinner";const a=new he({color:923172,roughness:.42,metalness:.82,flatShading:!0}),l=s.tone==="cyan"?t.coolAmbient:s.tone==="magenta"?t.warmLight:t.warmCore,c=new he({color:new G(l),emissive:new G(l),emissiveIntensity:3,roughness:.1,flatShading:!0}),h=new J(new xt(.74,.24,1.45),a);o.add(h);const u=new J(new xt(.84,.1,1.25),c);u.position.y=-.04,o.add(u);const d=i.phase??0;return{object3D:o,components:{LifecycleTag:{role:"vehicle",label:`HoverSpinner_${s.tone}`},PatrolPath:{originX:i.position[0],originY:i.position[1],originZ:i.position[2],amplitudeX:s.amplitude[0],amplitudeY:s.amplitude[1],amplitudeZ:s.amplitude[2],speed:s.speed,phase:d,faceTangent:!0},NeonBeacon:{emissiveMaterial:c,baseEmissiveIntensity:3,pulseSpeed:6,pulseAmplitude:.16,phase:d}}}}}),n.register({id:"cyber.netrunner-avatar",role:"avatar",defaultLayer:"foreground",contrastPriority:1,build:i=>{const s=new jt;s.name="CyberNetrunnerAvatar";const o=new he({color:1978442,emissive:new G(t.coolAmbient).multiplyScalar(.2),roughness:.36,metalness:.68,flatShading:!0}),a=new he({color:1385530,emissive:new G(t.warmLight).multiplyScalar(.16),roughness:.44,metalness:.55,flatShading:!0}),l=new he({color:new G(t.warmLight),emissive:new G(t.warmLight),emissiveIntensity:2.8,roughness:.15,flatShading:!0}),c=new he({color:new G(t.cursorLight),emissive:new G(t.cursorLight),emissiveIntensity:3.15,roughness:.12,flatShading:!0}),h=new he({color:new G(t.warmCore),emissive:new G(t.warmCore),emissiveIntensity:2.95,roughness:.12,flatShading:!0}),u=new J(new Is(.58,.74,20),c);u.rotation.x=-Math.PI/2,u.position.y=.04,s.add(u);const d=new jt;d.position.set(-.22,0,.02);const f=new J(new xt(.2,.78,.22),o);f.position.y=.39,f.rotation.z=.06,f.castShadow=!0,d.add(f);const m=new J(new xt(.065,.5,.25),c);m.position.set(0,.34,.02),d.add(m),s.add(d);const v=new jt;v.position.set(.22,0,-.02);const g=new J(new xt(.2,.78,.22),o);g.position.y=.39,g.rotation.z=-.06,g.castShadow=!0,v.add(g);const p=new J(new xt(.065,.5,.25),c);p.position.set(0,.34,.02),v.add(p),s.add(v);const x=new J(new xt(.68,.82,.38),o);x.position.y=1.16,x.castShadow=!0,s.add(x);const _=new J(new vn(.15,0),h);_.position.set(0,1.22,.21),s.add(_);const y=new J(new xt(.11,.68,.42),c);y.position.set(0,1.18,0),s.add(y);for(const dt of[-1,1]){const mt=new J(new xt(.26,.22,.42),a);mt.position.set(dt*.46,1.46,0),mt.rotation.z=-dt*.18,s.add(mt);const Ot=new J(new xt(.28,.075,.44),l);Ot.position.set(dt*.47,1.56,0),Ot.rotation.z=-dt*.18,s.add(Ot)}const P=new jt;P.position.set(0,.88,-.14);const T=new J(new xt(.34,.72,.09),a);T.position.set(-.19,-.34,-.04),T.rotation.z=.12,P.add(T);const E=new J(new xt(.34,.72,.09),a);E.position.set(.19,-.34,-.04),E.rotation.z=-.12,P.add(E);const R=new J(new xt(.76,.075,.11),l);R.position.set(0,-.68,-.04),P.add(R),s.add(P);const b=new J(new ki(.31,.078,6,12),l);b.rotation.x=Math.PI*.45,b.position.y=1.62,s.add(b);const M=new jt;M.position.set(0,1.84,0);const I=new J(new vn(.28,1),o);I.scale.set(.98,1.1,1.02),I.castShadow=!0,M.add(I);const B=new J(new xt(.44,.105,.32),c);B.position.set(0,.03,.12),M.add(B);for(const dt of[-1,1]){const mt=new J(new xt(.05,.32,.08),h);mt.position.set(dt*.18,.28,-.04),mt.rotation.z=-dt*.16,M.add(mt)}s.add(M);const N=new jt;N.position.set(-.46,1.38,.04);const z=new J(new xt(.16,.62,.18),o);z.position.y=-.26,z.rotation.z=.18,N.add(z),s.add(N);const q=new jt;q.position.set(.48,1.32,.12);const W=new J(new xt(.16,.56,.18),o);W.position.y=-.22,W.rotation.z=-.24,q.add(W);const nt=new J(new xt(.1,.34,.12),h);nt.position.set(.14,-.34,.14),nt.rotation.z=-.52,q.add(nt);const X=new J(new xt(.08,1.98,.11),c);X.position.set(.62,.48,.16),X.rotation.z=-.52,q.add(X),s.add(q);const ct=new Qn(new G(t.cursorLight),14.5,7.8,1.6);return ct.position.set(0,1.75,.75),s.add(ct),{object3D:s,components:{LifecycleTag:{role:"avatar",label:"CyberNetrunner"},Velocity:{vx:0,vy:0,vz:0,angularVx:0,angularVy:0,angularVz:0,damping:7.5},RotationTarget:{targetYaw:.18,targetPitch:0,targetRoll:0,lerpSpeed:5.4,idleSpinSpeed:0,maxPitch:.22},AnimationState:{baseY:i.position[1],bobAmplitude:.032,bobFrequency:2.35,breatheAmplitude:.018,phase:1.1,excitement:0,parts:{head:M,leftWing:N,rightWing:q,leftFoot:d,rightFoot:v,coatTail:P}},InputState:{pointerX:0,pointerY:0,pointerActive:!1,isDragging:!1,moveX:0,moveZ:0,yawSensitivity:.92,pitchSensitivity:.22,moveSpeed:3.8,boundsRadius:6.4}}}}}),n}static spawnShrineCrystal(t,e,n,i,s,o){const l=this.createDefaultBlueprintRegistry(n,s).spawn("cyber.holo-reactor",{world:t,scene:e,parentGroup:o,position:i,layer:sn.classifyZ(i[2])},{enableShadows:s});return{entityId:l.entityId,torchLight:l.pointLight}}static spawnBrazierBeacon(t,e,n,i,s,o="cyan",a){const c=this.createDefaultBlueprintRegistry(n).spawn("cyber.neon-pylon",{world:t,scene:e,parentGroup:a,position:i,rotationY:s*.2,phase:s,layer:sn.classifyZ(i[2])},{tone:o});return{entityId:c.entityId,light:c.pointLight}}static spawnHangingNeonBanner(t,e,n,i){return{entityId:this.createDefaultBlueprintRegistry(n).spawn("cyber.wind-banner",{world:t,scene:e,parentGroup:i.parentGroup,position:i.pivot,phase:i.phase,layer:i.layer??sn.classifyZ(i.pivot[2])},{width:i.width,height:i.height,tone:i.tone}).entityId}}static spawnCyberDrone(t,e,n,i){return{entityId:this.createDefaultBlueprintRegistry(n).spawn("cyber.hover-drone",{world:t,scene:e,parentGroup:i.parentGroup,position:i.origin,phase:i.phase,layer:sn.classifyZ(i.origin[2])},{amplitude:i.amplitude,speed:i.speed,tone:i.tone}).entityId}}static spawnWayfarerAvatar(t,e,n,i,s){const a=this.createDefaultBlueprintRegistry(n).spawn("cyber.netrunner-avatar",{world:t,scene:e,parentGroup:s,position:i,rotationY:.18,scale:1.12,layer:"foreground"},{});return{entityId:a.entityId,group:a.object3D}}}const F_=`
  uniform float uTime;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    // Subtle wind-driven surface shimmer across puddles & wet street channels
    float swell = sin(worldPos.x * 1.15 + uTime * 1.85) * 0.016 +
                  cos(worldPos.z * 1.45 - uTime * 1.35) * 0.014;
    worldPos.y += swell;
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`,N_=`
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

  // 4 neon street/pylon light positions (xyz) + intensity (w)
  uniform vec4 uTorch0;
  uniform vec4 uTorch1;
  uniform vec4 uTorch2;
  uniform vec4 uTorch3;
  // Central holo-arch / focal light
  uniform vec4 uShrineLight;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Procedural raindrop impact ripples on wet puddles
  float raindropRings(vec2 xz, float t) {
    vec2 cell = floor(xz * 1.65);
    vec2 local = fract(xz * 1.65) - 0.5;
    float seed = hash21(cell);
    float life = fract(t * (0.85 + seed * 0.65) + seed * 7.13);
    float radius = life * 0.46;
    float ring = exp(-pow((length(local) - radius) * 18.0, 2.0)) * (1.0 - life);
    return ring;
  }

  vec3 computeRippleNormal(vec2 p, float t, float camDist) {
    // Attenuate high-frequency ripples at distance to prevent subpixel aliasing in dense ASCII grids
    float hiFreqFade = clamp(1.0 - (camDist - 12.0) / 26.0, 0.22, 1.0);

    // Wind-driven diagonal street surface ripples + raindrop micro-rings
    float w1 = sin(p.x * 2.8 + t * 2.45 + sin(p.y * 1.45)) * 0.042;
    float w2 = cos(p.y * 3.4 - t * 2.10 + cos(p.x * 1.85)) * 0.038;
    float w3 = sin((p.x * 1.3 + p.y) * 5.2 + t * 3.2) * 0.024 * hiFreqFade;
    float drop = raindropRings(p, t) * 0.075 * hiFreqFade;

    float dx = w1 + w3 + drop;
    float dz = w2 - w3 + drop;
    return normalize(vec3(-dx * 2.25, 1.0, -dz * 1.65));
  }

  vec3 evalPointReflection(
    vec3 worldPos,
    vec3 normal,
    vec3 viewDir,
    vec3 lightPos,
    vec3 lightColor,
    float intensity
  ) {
    if (intensity <= 0.01) return vec3(0.0);

    // True planar mirror across the wet street plane y = worldPos.y
    vec3 mirroredLight = vec3(lightPos.x, 2.0 * worldPos.y - lightPos.y, lightPos.z);
    vec3 toMirrored = normalize(mirroredLight - worldPos);
    vec3 reflDir = reflect(-viewDir, normal);
    vec3 targetDir = normalize(vec3(toMirrored.x, abs(toMirrored.y) * 0.58, toMirrored.z));

    float specAlign = max(0.0, dot(reflDir, targetDir));
    float dx = abs(lightPos.x - worldPos.x);
    float dz = abs(lightPos.z - worldPos.z);

    // Elongated vertical neon reflection streaks on wet rain-slicked asphalt!
    float streakMask = exp(-dx * 0.58) * (1.0 / (1.0 + dz * 0.085));
    float dist = length(lightPos.xz - worldPos.xz);
    float attenuation = 1.0 / (1.0 + dist * dist * 0.085);

    float rippleBand = 0.72 + 0.28 * sin(worldPos.z * 6.4 - uTime * 4.2 + worldPos.x * 2.2);
    float specCore = pow(specAlign, 22.0) * 1.95;
    float specWide = pow(specAlign, 4.5) * 0.68;
    float wetColumn = streakMask * 0.42;

    return lightColor * ((specCore + specWide) * attenuation + wetColumn) * rippleBand * (intensity * 0.055);
  }

  void main() {
    vec3 viewVec = uCamPos - vWorldPos;
    float camDist = length(viewVec);
    vec3 viewDir = viewVec / max(camDist, 0.001);

    vec3 normal = computeRippleNormal(vWorldPos.xz, uTime, camDist);
    vec3 reflDir = reflect(-viewDir, normal);

    // Puddle mask: richer mirror puddles interwoven with textured damp asphalt grain
    float puddleWave = sin(vWorldPos.x * 0.75 + cos(vWorldPos.z * 0.55)) * 0.5 + 0.5;
    float puddleMask = smoothstep(0.22, 0.78, puddleWave);

    // Fresnel reflectance (grazing street angles reflect bright neon skyline)
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.6);
    fresnel = clamp(0.24 + fresnel * 0.76, 0.0, 1.0) * (0.68 + 0.32 * puddleMask);

    // Base wet asphalt + reflected nocturnal cyan/magenta skyline gradient
    vec3 skyReflect = mix(uDeepColor * 1.35, uShallowColor * 0.92, clamp(reflDir.y * 1.5 + 0.22, 0.0, 1.0));
    vec3 color = mix(uDeepColor * 0.85, skyReflect, fresnel);

    // Illuminated cybernetic lane lines & pedestrian crosswalk bars along central street (|x| < 4.6)
    float inRoad = step(abs(vWorldPos.x), 4.6);
    float centerDash = step(abs(vWorldPos.x), 0.09) * step(0.45, fract(vWorldPos.z * 0.45));
    float sideLine = step(abs(abs(vWorldPos.x) - 3.85), 0.08);
    // Glowing crosswalk stripes in foreground/midground (z around 4.4 and -0.6)
    float crossZ1 = step(abs(vWorldPos.z - 4.5), 0.58);
    float crossZ2 = step(abs(vWorldPos.z + 0.8), 0.52);
    float zebra = step(0.48, fract(vWorldPos.x * 1.35)) * max(crossZ1, crossZ2) * step(abs(vWorldPos.x), 3.6);

    color += uWarmCoreColor * centerDash * inRoad * 0.52;
    color += uShallowColor * sideLine * 0.48;
    color += mix(uShallowColor, vec3(0.95, 0.98, 1.0), 0.45) * zebra * 0.42;

    // Reflected flanking storefront neon strips along street canyon (x = +/- 5.4)
    float leftFacadeGlow = exp(-abs(vWorldPos.x + 4.2) * 0.62) * (0.55 + 0.45 * sin(vWorldPos.z * 1.4 + 0.8));
    float rightFacadeGlow = exp(-abs(vWorldPos.x - 4.2) * 0.62) * (0.55 + 0.45 * cos(vWorldPos.z * 1.3 - 0.5));
    color += uShallowColor * leftFacadeGlow * fresnel * 0.46;
    color += uWarmColor * rightFacadeGlow * fresnel * 0.48;

    // Sky halo / moon specular reflection down the center of the wet avenue
    float moonAlign = max(0.0, dot(reflDir, normalize(uMoonDir)));
    float moonGlint = pow(moonAlign, 30.0) * 1.35 + pow(moonAlign, 6.5) * 0.32;
    color += uShallowColor * moonGlint * 1.15;

    // Reflected Holo-Portal Core + 4 Street Neon Beacons/Signs
    color += evalPointReflection(vWorldPos, normal, viewDir, uShrineLight.xyz, uWarmCoreColor, uShrineLight.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch0.xyz, uShallowColor, uTorch0.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch1.xyz, uWarmColor, uTorch1.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch2.xyz, uShallowColor, uTorch2.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch3.xyz, uWarmColor, uTorch3.w);

    // Interactive cursor/touch spotlight reflection on wet asphalt
    color += evalPointReflection(
      vWorldPos,
      normal,
      viewDir,
      uCursorPos,
      uCursorColor,
      uCursorIntensity
    );

    // Raindrop splash glints catching neon light across the foreground street
    float splash = raindropRings(vWorldPos.xz * 1.25, uTime * 1.15);
    color += mix(uShallowColor, uWarmColor, 0.45) * splash * 0.52 * clamp(1.2 - camDist / 22.0, 0.0, 1.0);

    // Distance perspective haze blending smoothly toward horizon glow
    float fogFactor = 1.0 - exp(-0.00042 * camDist * camDist);
    color = mix(color, uDeepColor * 0.45 + uWarmColor * 0.06, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(color, 0.95);
  }
`;function B_(r){const{palette:t,shrineLightPos:e,moonDir:n}=r,i=new G(t.background).lerp(new G(t.coolAmbient),.3),s=new G(t.coolAmbient).lerp(new G("#96F2FF"),.36);return new He({vertexShader:F_,fragmentShader:N_,transparent:!0,depthWrite:!0,uniforms:{uTime:{value:0},uCamPos:{value:new C(0,3.8,12.6)},uDeepColor:{value:i},uShallowColor:{value:s},uWarmColor:{value:new G(t.warmLight)},uWarmCoreColor:{value:new G(t.warmCore)},uCursorColor:{value:new G(t.cursorLight)},uCursorPos:{value:new C(0,2.2,3.2)},uCursorIntensity:{value:14},uMoonDir:{value:n.clone().normalize()},uTorch0:{value:new Kt(-3.4,2.2,2.8,18)},uTorch1:{value:new Kt(3.4,2.2,2.8,18)},uTorch2:{value:new Kt(-3.8,2.8,-3.6,20)},uTorch3:{value:new Kt(3.8,2.8,-3.6,20)},uShrineLight:{value:new Kt(e.x,e.y,e.z,48)}}})}class In{static terrainHeight(t,e){return Math.hypot(t,e+4.6)<2.85?.28:Math.abs(t)<1.35&&Math.abs(e-4.15)<1.1?.04:Math.abs(t)>=8.8||e<=-10.8?.34:Math.abs(t)>=4.05?.2:-.14}static build(t,e,n){const i=new bs,s=new G(e.palette.background);i.background=s,i.fog=new Ss(s.getHex(),t.fogDensity);const o=new sn(i),a=Ki.createMaterialBank(e.palette),l=ah.createDefaultBlueprintRegistry(e.palette,e.enableShadows),c={cyan:a.cyan,magenta:a.magenta,amber:a.amber},h=new Fa(new G(e.palette.coolAmbient),new G("#141A2E"),1.3);i.add(h);const u=new Na(new G(e.palette.coolAmbient).lerp(new G("#E2F9FF"),.45),1.78);if(u.position.set(-12,24,10),u.castShadow=e.enableShadows,e.enableShadows){u.shadow.mapSize.width=1024,u.shadow.mapSize.height=1024,u.shadow.camera.near=2,u.shadow.camera.far=60;const I=22;u.shadow.camera.left=-I,u.shadow.camera.right=I,u.shadow.camera.top=I,u.shadow.camera.bottom=-I,u.shadow.bias=-.0015}i.add(u),this.buildUrbanStreetFoundation(o.midground,t,e,a);const{waterMesh:d,waterMaterial:f}=this.buildReflectiveWetBoulevard(i,t,e);this.buildStreetCorridorProps(i,o,n,l,t.streetPoles??[],a);const[m,v]=t.shrineCenter,g=this.terrainHeight(m,v);this.buildCyberPortalAndOverpass(o,m,g,v,a),this.buildCyberCityscape(o,t.buildings,a),this.buildCyberSkyBackdrop(o.sky,a);const p=l.spawn("cyber.holo-reactor",{world:n,scene:i,parentGroup:o.midground,position:[m,g+2.55,v],layer:"midground"},{enableShadows:e.enableShadows}),x=p.entityId,_=p.pointLight,y=[];t.braziers.forEach((I,B)=>{const N=this.terrainHeight(I.x,I.z),z=I.tone??(B%2===0?"cyan":"magenta"),q=sn.classifyZ(I.z),W=l.spawn("cyber.neon-pylon",{world:n,scene:i,parentGroup:o.getGroup(q),position:[I.x,N,I.z],rotationY:B*.38,phase:B*1.9,layer:q},{tone:z});W.pointLight&&y.push(W.pointLight)});const P=new Qn(new G(e.palette.coolAmbient),24,24,1.5);P.position.set(-4.4,3.2,-1.8),i.add(P),y.push(P);const T=new Qn(new G(e.palette.warmLight),24,24,1.5);T.position.set(4.4,3.2,-1.8),i.add(T),y.push(T);for(const I of t.drones){const B=sn.classifyZ(I.origin[2]);l.spawn("cyber.hover-drone",{world:n,scene:i,parentGroup:o.getGroup(B),position:I.origin,phase:I.phase,layer:B},{amplitude:I.amplitude,speed:I.speed,tone:I.tone})}const[E,R]=t.avatarSpawn,b=Math.max(t.waterLevel+.08,this.terrainHeight(E,R)),M=l.spawn("cyber.netrunner-avatar",{world:n,scene:i,parentGroup:o.foreground,position:[E,b,R],rotationY:.18,scale:1.12,layer:"foreground"},{});return{scene:i,depthRig:o,materialBank:a,blueprintRegistry:l,waterMesh:d,waterMaterial:f,ambientHemi:h,moonDirLight:u,torchLight:_,brazierLights:y,neonMaterials:c,shrineEntityId:x,avatarEntityId:M.entityId,terrainHeightAt:In.terrainHeight}}static buildUrbanStreetFoundation(t,e,n,i){const s=new Yn(e.terrainSize,e.terrainSize,e.terrainSegments,e.terrainSegments);s.rotateX(-Math.PI/2);const o=s.attributes.position,a=new Float32Array(o.count*3),l=new G("#0A101D"),c=new G("#1E2C42"),h=new G("#162235"),u=new G(n.palette.coolAmbient).multiplyScalar(.45),d=new G;for(let p=0;p<o.count;p++){const x=o.getX(p),_=o.getZ(p),y=In.terrainHeight(x,_);o.setY(p,y),y<0?d.copy(l):(Math.abs(x%1.5+1.5)%1.5<.12||Math.abs(_%1.5+1.5)%1.5<.12)&&Math.abs(x)<10.5?d.copy(c).lerp(u,.55):d.copy(y>.25?h:c),a[p*3]=d.r,a[p*3+1]=d.g,a[p*3+2]=d.b}s.setAttribute("color",new ne(a,3)),s.computeVertexNormals();const f=new he({vertexColors:!0,roughness:.4,metalness:.58,flatShading:!0}),m=new J(s,f);m.receiveShadow=!0,t.add(m);const v=new J(new xt(.14,.16,28),i.cyan);v.position.set(-4.02,.24,-2.5),t.add(v);const g=new J(new xt(.14,.16,28),i.magenta);g.position.set(4.02,.24,-2.5),t.add(g)}static buildReflectiveWetBoulevard(t,e,n){const[i,s]=e.shrineCenter,o=In.terrainHeight(i,s)+2.55,a=new Yn(e.waterSize,e.waterSize,48,48);a.rotateX(-Math.PI/2);const l=B_({palette:n.palette,shrineLightPos:new C(i,o,s),moonDir:new C(-12,24,10)}),c=new J(a,l);return c.position.y=e.waterLevel,c.renderOrder=1,t.add(c),{waterMesh:c,waterMaterial:l}}static buildStreetCorridorProps(t,e,n,i,s,o){s.forEach((c,h)=>{const u=In.terrainHeight(c.x,c.z),d=sn.classifyZ(c.z),f=e.getGroup(d),m=Ki.composeStreetLampPole({x:c.x,baseY:u,z:c.z,height:c.height,side:c.side,tone:c.tone},o);if(f.add(m),c.hasHangingBanner){const v=c.side<0?1:-1;i.spawn("cyber.wind-banner",{world:n,scene:t,parentGroup:f,position:[c.x+v*.62,u+c.height-.34,c.z],phase:h*1.35,layer:d},{width:.54,height:1.3,tone:c.tone})}});const a=[{x:-4.85,z:3.9,facingX:1,tone:"amber"},{x:4.85,z:3.7,facingX:-1,tone:"cyan"},{x:-4.85,z:-.6,facingX:1,tone:"magenta"},{x:4.85,z:-.8,facingX:-1,tone:"amber"}];for(const c of a){const h=In.terrainHeight(c.x,c.z),u=sn.classifyZ(c.z);e.getGroup(u).add(Ki.composeStreetKioskProp({x:c.x,baseY:h,z:c.z,facingX:c.facingX,tone:c.tone},o))}[6.4,1.9,-2.6].forEach((c,h)=>{const d=sn.classifyZ(c),f=Ki.composeCatenaryCableSpan(8.6,h%2===0?"amber":"cyan",o);f.position.set(0,4.35,c),e.getGroup(d).add(f);const m=n.createEntity();n.addComponent(m,"LifecycleTag",{role:"prop",label:`OverheadCable_${h}`}),n.addComponent(m,"DepthLayer",{layer:d,order:d==="foreground"?0:1,contrastPriority:.65}),n.addComponent(m,"Transform",{x:0,y:4.35,z:c,rotX:0,rotY:0,rotZ:0,scaleX:1,scaleY:1,scaleZ:1}),n.addComponent(m,"WindSway",{baseRotX:0,baseRotY:0,baseRotZ:0,swayAmpZ:.035,swayAmpX:.14,frequency:1.85,phase:h*1.7,gustFactor:.9}),n.addComponent(m,"Renderable",{object3D:f})})}static buildCyberPortalAndOverpass(t,e,n,i,s){const o=new jt;o.position.set(e,n,i);const a=new J(new gn(2.6,3,.3,8),s.hullDark);a.position.y=.15,a.receiveShadow=!0,o.add(a);const l=new J(new gn(2.35,2.42,.1,8),s.amber);l.position.y=.34,o.add(l);for(const v of[-1,1]){const g=new J(new xt(.76,5.8,.78),s.hullDark);g.position.set(v*2.55,2.95,-.2),g.castShadow=!0,g.receiveShadow=!0,o.add(g);const p=new J(new xt(.14,5.3,.84),v<0?s.cyan:s.magenta);p.position.set(v*2.1,2.95,-.2),o.add(p)}const c=new J(new xt(6.5,.72,.96),s.hullMid);c.position.set(0,6,-.2),c.castShadow=!0,o.add(c);const h=new J(new xt(6,.16,1.04),s.cyan);h.position.set(0,6,-.2),o.add(h),t.midground.add(o);const u=new jt;u.position.set(0,6.8,-8.6);const d=new J(new xt(20,.62,1.4),s.hullMid);u.add(d);const f=new J(new xt(19.6,.14,1.48),s.amber);f.position.y=.36,u.add(f);const m=new J(new xt(19.6,.12,1.48),s.magenta);m.position.y=-.34,u.add(m),t.midground.add(u)}static buildCyberCityscape(t,e,n){for(let i=0;i<e.length;i++){const s=e[i],o=In.terrainHeight(s.x,s.z),a=sn.classifyZ(s.z),l=Ki.composeUrbanBuilding({seedIndex:i,x:s.x,baseY:o,z:s.z,width:s.width,depth:s.depth,height:s.height,neonTone:s.neonTone,floors:s.floors,setbackRatio:s.setbackRatio,hasStorefront:s.hasStorefront,hasBillboard:s.hasBillboard,hasAntenna:s.hasAntenna},n);t.getGroup(a).add(l)}}static buildCyberSkyBackdrop(t,e){const n=new J(new Is(3.8,4.35,32),e.magenta);n.position.set(0,13.8,-28.5),t.add(n);const i=new J(new Mr(3.25,28),e.amber);i.position.set(0,13.8,-28.7),t.add(i);for(const f of[-9.5,9.5]){const m=new fn({color:f<0?e.cyan.color:e.magenta.color,transparent:!0,opacity:.22}),v=new J(new gn(.45,.14,26,6),m);v.position.set(f,15,-20),v.rotation.z=f<0?-.1:.1,t.add(v)}const s=160,o=new Float32Array(s*3),a=new Float32Array(s*3),l=new G("#8AF6FF"),c=new G("#FF7AD9"),h=new G("#FFD97D");for(let f=0;f<s;f++){const m=Math.sin(f*127.1)*43758.5453,v=Math.sin(f*311.7)*43758.5453,g=m-Math.floor(m),p=v-Math.floor(v);o[f*3]=(g-.5)*80,o[f*3+1]=8.2+p*25,o[f*3+2]=-22-f*.37%18;const x=f%5===0?h:f%3===0?c:l;a[f*3]=x.r,a[f*3+1]=x.g,a[f*3+2]=x.b}const u=new Gt;u.setAttribute("position",new ne(o,3)),u.setAttribute("color",new ne(a,3));const d=new mr({size:.38,vertexColors:!0,fog:!1,transparent:!0,opacity:.88});t.add(new gr(u,d))}}class lh{constructor(t,e){k(this,"container");k(this,"config");k(this,"state","idle");k(this,"userManuallyPaused",!1);k(this,"autoPausedOffscreen",!1);k(this,"autoPausedHiddenTab",!1);k(this,"isFullscreenActive",!1);k(this,"renderer",null);k(this,"scene",null);k(this,"camera",null);k(this,"postProcessor",null);k(this,"loop",null);k(this,"lifecycle",null);k(this,"pointerInput",null);k(this,"keyboardInput",null);k(this,"ecsWorld",null);k(this,"systemRunner",null);k(this,"windSystem",null);k(this,"vfx",null);k(this,"builtPlayground",null);k(this,"primaryEntityId",null);k(this,"containerWidth",1);k(this,"containerHeight",1);k(this,"activeCellSize",10);k(this,"gridColumns",1);k(this,"gridRows",1);k(this,"effectiveDpr",1);k(this,"resolutionTier","desktop");k(this,"lastDrawCalls",0);k(this,"lastTriangles",0);k(this,"onPassivePointerMoveBound");k(this,"onContextLostBound");if(!t||!(t instanceof HTMLElement))throw new Error("[AsciiSceneEngine] A valid container HTMLElement is required to instantiate the engine.");this.container=t,this.config=Gc(Vc,e),this.onPassivePointerMoveBound=this.handlePassiveContainerMove.bind(this),this.onContextLostBound=this.handleContextLost.bind(this)}mount(){var t,e,n,i;if(this.state==="destroyed")throw new Error("[AsciiSceneEngine] Cannot mount an engine instance that has already been destroyed. Create a new instance instead.");if(this.state==="idle")try{window.getComputedStyle(this.container).position==="static"&&(this.container.style.position="relative");const o=new rd({antialias:!1,alpha:!1,powerPreference:"high-performance",stencil:!1,depth:!1}),a=Math.min(window.devicePixelRatio||1,this.config.maxPixelRatio);o.setPixelRatio(a),o.shadowMap.enabled=this.config.enableShadows,o.shadowMap.type=tl,o.outputColorSpace=Be,o.info.autoReset=!0;const l=o.domElement;l.style.display="block",l.style.width="100%",l.style.height="100%",l.style.position="absolute",l.style.inset="0",l.style.zIndex="0",l.style.pointerEvents="none",l.setAttribute("aria-hidden","true"),l.dataset.asciiEngineCanvas="true",l.addEventListener("webglcontextlost",this.onContextLostBound,!1),this.container.prepend(l),this.renderer=o;const c=new $i(this.container),h=new eh(this.container,{trackWindowHover:this.config.mode==="mascot"}),u=new th({enabled:this.config.enableKeyboard,focusTarget:this.container});h.attach(),u.attach(),this.container.addEventListener("pointermove",this.onPassivePointerMoveBound,{passive:!0}),c.registerCleanup(()=>{this.container.removeEventListener("pointermove",this.onPassivePointerMoveBound),h.detach(),u.detach()}),this.lifecycle=c,this.pointerInput=h,this.keyboardInput=u;const d=new Qc,f=new Jc;this.ecsWorld=d,this.systemRunner=f,this.config.mode==="mascot"?this.initMascotStage(d,f,h,u):this.initPlaygroundStage(d,f,h,u),this.postProcessor=new D_(this.config);const m=this.container.getBoundingClientRect();this.applyResize(Math.max(1,m.width),Math.max(1,m.height),!0),c.observeContainer({onResize:(v,g)=>this.applyResize(v,g,!1),onVisibilityChange:v=>this.handleIntersectionVisibility(v),onTabHiddenChange:v=>this.handleTabVisibility(v),onFullscreenChange:v=>{this.isFullscreenActive=v}},{observeViewportIntersection:this.config.pauseOffscreen,observeTabVisibility:this.config.pauseOnHiddenTab}),this.loop=new Wc({maxFps:this.config.maxFps,onFrame:({dt:v,elapsed:g})=>this.renderFrame(v,g),onTelemetry:()=>{var v,g;return(g=(v=this.config.callbacks)==null?void 0:v.onFpsUpdate)==null?void 0:g.call(v,this.getStats())}}),this.state="running",this.loop.start(),(e=(t=this.config.callbacks)==null?void 0:t.onMount)==null||e.call(t)}catch(s){const o=s instanceof Error?s:new Error(String(s));throw(i=(n=this.config.callbacks)==null?void 0:n.onError)==null||i.call(n,o),o}}initPlaygroundStage(t,e,n,i){const s=rh.load(this.config.mapId),o=In.build(s,this.config,t);this.builtPlayground=o,this.scene=o.scene,this.primaryEntityId=o.avatarEntityId;const a=new Te(46,16/9,.5,110);a.position.set(...s.cameraAnchor),a.lookAt(...s.cameraLookAt),this.camera=a,this.vfx=new $a({scene:o.scene,config:this.config,baseCameraPos:s.cameraAnchor,lookAtTarget:s.cameraLookAt,particleOrigin:s.shrineCenter,particleCount:240});const l=new $c(this.config.windStrength);this.windSystem=l,e.addSystem(new Ya(n,i),10).addSystem(new Zc,15).addSystem(new qa(o.terrainHeightAt),20).addSystem(l,25).addSystem(new Xa,30).addSystem(new Kc,35).addSystem(new Za,40)}initMascotStage(t,e,n,i){const s=new bs;s.background=new G(this.config.palette.background),this.scene=s;const o=new Fa(14218239,594202,1.35);s.add(o);const a=new Na(16777215,2.35);a.position.set(-2.6,4.2,4.8),s.add(a);const l=new Qn(new G(this.config.palette.warmCore),10.5,12,1.5);l.position.set(2.8,2.5,-2.2),s.add(l);const c=[0,1.02,4.15],h=[0,.92,0],u=new Te(38,1,.3,40);u.position.set(...c),u.lookAt(...h),this.camera=u;const{entityId:d}=jc.spawn(t,s,{position:[0,-.05,0],scale:1.05,includeShowcaseRig:!0});this.primaryEntityId=d,this.vfx=new $a({scene:s,config:this.config,baseCameraPos:c,lookAtTarget:h,particleOrigin:[0,0],particleCount:16}),e.addSystem(new Ya(n,i),10).addSystem(new qa,20).addSystem(new Xa,30).addSystem(new Za,40)}pause(){this.userManuallyPaused=!0,this.transitionToPaused()}resume(){this.userManuallyPaused=!1,this.tryResumeIfEligible()}setPlayableKeyboardEnabled(t){var e;this.config.enableKeyboard=t,(e=this.keyboardInput)==null||e.setEnabled(t)}resize(t,e=!1){this.state!=="destroyed"&&t.width>0&&t.height>0&&this.applyResize(t.width,t.height,e)}updateConfig(t){var l,c,h,u,d,f,m,v,g,p;if(this.state==="destroyed")return;const e=this.config.characterRamp,n=this.config.structuralChars,i=this.config.fontFamily,s=this.config.enableShadows,o=this.config.maxPixelRatio;if(this.config=Gc(this.config,t),(l=this.keyboardInput)==null||l.setEnabled(this.config.enableKeyboard),(c=this.loop)==null||c.setMaxFps(this.config.maxFps),(h=this.windSystem)==null||h.setWindStrength(this.config.windStrength),!this.renderer||!this.scene||!this.postProcessor)return;if(s!==this.config.enableShadows&&(this.renderer.shadowMap.enabled=this.config.enableShadows,this.renderer.shadowMap.needsUpdate=!0),this.scene.background instanceof G&&this.scene.background.set(this.config.palette.background),this.scene.fog instanceof Ss&&this.scene.fog.color.set(this.config.palette.background),this.builtPlayground){const x=this.config.palette;this.builtPlayground.ambientHemi.color.set(x.coolAmbient),this.builtPlayground.moonDirLight.color.set(x.coolAmbient).lerp(new G("#D8F6FF"),.4),this.builtPlayground.torchLight.color.set(x.warmLight),this.builtPlayground.materialBank.updatePalette(x),this.builtPlayground.brazierLights.forEach((y,P)=>{y.color.set(P%2===0?x.coolAmbient:x.warmLight)});const _=this.builtPlayground.waterMaterial.uniforms;(u=_.uDeepColor)==null||u.value.set(x.background).lerp(new G(x.coolAmbient),.26),(d=_.uShallowColor)==null||d.value.set(x.coolAmbient).lerp(new G("#8be4ff"),.32),(f=_.uWarmColor)==null||f.value.set(x.warmLight),(m=_.uWarmCoreColor)==null||m.value.set(x.warmCore),(v=_.uCursorColor)==null||v.value.set(x.cursorLight)}(g=this.vfx)==null||g.applyConfig(this.config);const a=e!==this.config.characterRamp||n!==this.config.structuralChars||i!==this.config.fontFamily;if(o!==this.config.maxPixelRatio)this.applyResize(this.containerWidth,this.containerHeight,!1);else{const x=this.postProcessor.applyConfig(this.config,a,this.containerWidth,this.containerHeight,typeof window<"u"&&window.devicePixelRatio||1,this.isCoarsePointerDevice());this.activeCellSize=x.activeCellSize,this.gridColumns=x.columns,this.gridRows=x.rows,this.effectiveDpr=x.effectiveDpr,this.resolutionTier=x.tier}this.state==="paused"&&((p=this.loop)==null||p.stepOnce(0))}destroy(){var t,e,n,i,s,o;if(this.state!=="destroyed"){if((t=this.loop)==null||t.stop(),this.loop=null,(e=this.systemRunner)==null||e.clear(),this.systemRunner=null,this.windSystem=null,(n=this.ecsWorld)==null||n.clear(!0),this.ecsWorld=null,this.builtPlayground=null,this.vfx=null,(i=this.lifecycle)==null||i.disposeAll(this.scene),this.lifecycle=null,this.scene=null,this.camera=null,this.pointerInput=null,this.keyboardInput=null,this.postProcessor&&(this.postProcessor.dispose(),this.postProcessor=null),this.renderer){const a=this.renderer.domElement;a.removeEventListener("webglcontextlost",this.onContextLostBound,!1),this.renderer.renderLists.dispose(),this.renderer.dispose(),a.parentNode&&a.parentNode.removeChild(a),this.renderer=null}this.state="destroyed",(o=(s=this.config.callbacks)==null?void 0:s.onDestroy)==null||o.call(s)}}getState(){return this.state}getConfig(){return Gc(this.config)}getStats(){var e,n;const t=((e=this.loop)==null?void 0:e.getTelemetry())??{fps:60,frameTimeMs:16.67};return{fps:t.fps,frameTimeMs:t.frameTimeMs,activeCellSize:this.activeCellSize,gridColumns:this.gridColumns,gridRows:this.gridRows,drawCalls:this.lastDrawCalls,triangles:this.lastTriangles,entityCount:((n=this.ecsWorld)==null?void 0:n.getEntityCount())??0,effectiveDpr:this.effectiveDpr,resolutionTier:this.resolutionTier}}getScene(){return this.scene}getCamera(){return this.camera}getPrimaryEntityAngles(){if(!this.ecsWorld||this.primaryEntityId===null)return null;const t=this.ecsWorld.getComponent(this.primaryEntityId,"Transform");return t?{yaw:t.rotY,pitch:t.rotX}:null}renderFrame(t,e){var s;if(!this.renderer||!this.scene||!this.camera||!this.postProcessor)return;this.ecsWorld&&this.systemRunner&&this.systemRunner.run(this.ecsWorld,{dt:t,elapsed:e});const n=this.pointerInput?this.pointerInput.sample(0):{normX:0,normY:0,dragYaw:0,dragPitch:0,active:!1,isDown:!1,isTouch:!1,motionSpeed:0,lastInteractionMs:0};if((s=this.vfx)==null||s.update(t,e,n,this.camera,this.config),this.builtPlayground){const o=this.builtPlayground.waterMaterial.uniforms;if(o.uTime&&(o.uTime.value=e),o.uCamPos&&o.uCamPos.value.copy(this.camera.position),o.uShrineLight&&o.uShrineLight.value.set(this.builtPlayground.torchLight.position.x,this.builtPlayground.torchLight.position.y,this.builtPlayground.torchLight.position.z,this.builtPlayground.torchLight.intensity),this.vfx){const l=this.vfx.getCursorLight();o.uCursorPos&&o.uCursorPos.value.copy(l.position),o.uCursorIntensity&&(o.uCursorIntensity.value=l.intensity)}const a=["uTorch0","uTorch1","uTorch2","uTorch3"];for(let l=0;l<a.length;l++){const c=a[l],h=this.builtPlayground.brazierLights[l];o[c]&&(h?o[c].value.set(h.position.x,h.position.y,h.position.z,h.intensity):o[c].value.set(0,0,0,0))}}const i=this.postProcessor.render(this.renderer,this.scene,this.camera,e,t);this.lastDrawCalls=i.drawCalls,this.lastTriangles=i.triangles}isCoarsePointerDevice(){if(typeof window>"u"||typeof window.matchMedia!="function")return!1;try{return window.matchMedia("(pointer: coarse)").matches}catch{return!1}}applyResize(t,e,n=!1){var c,h,u;if(!this.renderer||!this.camera||!this.postProcessor)return;const i=typeof window<"u"&&window.devicePixelRatio||1,s=this.isCoarsePointerDevice(),o=typeof document<"u"&&!!((h=(c=this.container).closest)!=null&&h.call(c,'[data-fullscreen-view="true"], .is-scene-fullscreen')),a=Lr({cssWidth:t,cssHeight:e,devicePixelRatio:i,config:this.config,isCoarsePointer:s,isFullscreen:this.isFullscreenActive||o});if(!n&&this.containerWidth===a.cssWidth&&this.containerHeight===a.cssHeight&&this.effectiveDpr===a.effectiveDpr&&this.activeCellSize===a.activeCellSize)return;this.containerWidth=a.cssWidth,this.containerHeight=a.cssHeight,this.effectiveDpr=a.effectiveDpr,this.resolutionTier=a.tier,this.activeCellSize=a.activeCellSize,this.gridColumns=a.columns,this.gridRows=a.rows,this.renderer.getPixelRatio()!==a.effectiveDpr&&this.renderer.setPixelRatio(a.effectiveDpr),this.renderer.setSize(a.cssWidth,a.cssHeight,!1);const l=Math.max(.1,a.cssWidth/Math.max(1,a.cssHeight));this.camera.aspect=l,this.config.mode==="playground"&&(this.camera.fov=l<1?54:this.isFullscreenActive||o?44:46),this.camera.updateProjectionMatrix(),this.postProcessor.applyResolutionProfile(a,this.config,n),this.state==="paused"&&((u=this.loop)==null||u.stepOnce(0))}transitionToPaused(){var t,e,n;this.state==="running"&&((t=this.loop)==null||t.pause(),this.state="paused",(n=(e=this.config.callbacks)==null?void 0:e.onPause)==null||n.call(e))}tryResumeIfEligible(){var t,e,n;this.state==="paused"&&(this.userManuallyPaused||this.autoPausedOffscreen||this.autoPausedHiddenTab||(this.state="running",(t=this.loop)==null||t.resume(),(n=(e=this.config.callbacks)==null?void 0:e.onResume)==null||n.call(e)))}handleIntersectionVisibility(t){this.config.pauseOffscreen&&(t?(this.autoPausedOffscreen=!1,this.tryResumeIfEligible()):(this.autoPausedOffscreen=!0,this.transitionToPaused()))}handleTabVisibility(t){this.config.pauseOnHiddenTab&&(t?(this.autoPausedHiddenTab=!0,this.transitionToPaused()):(this.autoPausedHiddenTab=!1,this.tryResumeIfEligible()))}handlePassiveContainerMove(t){}handleContextLost(t){var e,n,i;t.preventDefault(),(e=this.loop)==null||e.pause(),(i=(n=this.config.callbacks)==null?void 0:n.onError)==null||i.call(n,new Error("[AsciiSceneEngine] WebGL context lost."))}}class Wf{constructor(t,e){k(this,"core");this.core=new lh(t,e)}mount(){this.core.mount()}pause(){this.core.pause()}resume(){this.core.resume()}resize(t,e=!1){this.core.resize(t,e)}updateConfig(t){this.core.updateConfig(t)}setPlayableKeyboardEnabled(t){this.core.setPlayableKeyboardEnabled(t)}destroy(){this.core.destroy()}getState(){return this.core.getState()}getConfig(){return this.core.getConfig()}getStats(){return this.core.getStats()}getScene(){return this.core.getScene()}getCamera(){return this.core.getCamera()}getPrimaryEntityAngles(){return this.core.getPrimaryEntityAngles()}}const O_={AnimationSystem:Xa,AsciiEngineCore:lh,AsciiSceneEngine:Wf,computeAdaptiveResolution:Lr,DEFAULT_ASCII_RAMP:Hc,DEFAULT_ENGINE_CONFIG:Vc,DEFAULT_PALETTE:kc,detectResolutionTier:Yc,EngineLoop:Wc,EntityBlueprintRegistry:oh,InputSystem:Ya,KeyboardInput:th,LifecycleManager:$i,MapLoader:rh,MovementRotationSystem:qa,NeonPulseSystem:Kc,PatrolSystem:Zc,PlaygroundEntityFactory:ah,PlaygroundSceneBuilder:In,PointerInput:eh,RenderSyncSystem:Za,ResolutionTransitionController:qc,SceneComposerKit:Ki,SceneDepthRig:sn,SystemRunner:Jc,TuxEntityFactory:jc,VfxController:$a,WindSystem:$c,World:Qc,THREE:Vf};return $t.AnimationSystem=Xa,$t.AsciiEngineCore=lh,$t.AsciiSceneEngine=Wf,$t.DEFAULT_ASCII_RAMP=Hc,$t.DEFAULT_ENGINE_CONFIG=Vc,$t.DEFAULT_PALETTE=kc,$t.EngineLoop=Wc,$t.EntityBlueprintRegistry=oh,$t.InputSystem=Ya,$t.KeyboardInput=th,$t.LifecycleManager=$i,$t.MapLoader=rh,$t.MovementRotationSystem=qa,$t.NeonPulseSystem=Kc,$t.PatrolSystem=Zc,$t.PlaygroundEntityFactory=ah,$t.PlaygroundSceneBuilder=In,$t.PointerInput=eh,$t.RenderSyncSystem=Za,$t.ResolutionTransitionController=qc,$t.SceneComposerKit=Ki,$t.SceneDepthRig=sn,$t.SystemRunner=Jc,$t.THREE=Vf,$t.TuxEntityFactory=jc,$t.VfxController=$a,$t.WindSystem=$c,$t.World=Qc,$t.computeAdaptiveResolution=Lr,$t.default=O_,$t.detectResolutionTier=Yc,Object.defineProperties($t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),$t}({});
