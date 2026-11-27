var Bf=Object.defineProperty;var Gf=(n,t,e)=>t in n?Bf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var rs=(n,t,e)=>Gf(n,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Is={ROTATE:0,DOLLY:1,PAN:2},As={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hf=0,Cl=1,Vf=2,Yc=1,Wf=2,ni=3,ri=0,Ke=1,Sn=2,Ei=0,Ls=1,Pl=2,Il=3,Ll=4,kf=5,Wi=100,Xf=101,Yf=102,Zf=103,qf=104,jf=200,$f=201,Kf=202,Jf=203,Ja=204,Qa=205,Qf=206,td=207,ed=208,nd=209,id=210,sd=211,od=212,rd=213,ad=214,tc=0,ec=1,nc=2,Os=3,ic=4,sc=5,oc=6,rc=7,Zc=0,cd=1,ld=2,Ti=0,hd=1,ud=2,fd=3,Mu=4,dd=5,pd=6,md=7,bu=300,zs=301,Bs=302,ac=303,cc=304,jr=306,vo=1e3,Xi=1001,lc=1002,Je=1003,gd=1004,Ho=1005,Nn=1006,oa=1007,yi=1008,ai=1009,yu=1010,wu=1011,Mo=1012,qc=1013,Ki=1014,Hn=1015,Uo=1016,jc=1017,$c=1018,Gs=1020,Su=35902,Eu=1021,Tu=1022,Fn=1023,Au=1024,Ru=1025,Ds=1026,Hs=1027,Kc=1028,Jc=1029,Cu=1030,Qc=1031,tl=1033,Cr=33776,Pr=33777,Ir=33778,Lr=33779,hc=35840,uc=35841,fc=35842,dc=35843,pc=36196,mc=37492,gc=37496,_c=37808,xc=37809,vc=37810,Mc=37811,bc=37812,yc=37813,wc=37814,Sc=37815,Ec=37816,Tc=37817,Ac=37818,Rc=37819,Cc=37820,Pc=37821,Dr=36492,Ic=36494,Lc=36495,Pu=36283,Dc=36284,Uc=36285,Nc=36286,_d=3200,Iu=3201,$r=0,xd=1,bi="",Fe="srgb",Vs="srgb-linear",Fr="linear",Te="srgb",as=7680,Dl=519,vd=512,Md=513,bd=514,Lu=515,yd=516,wd=517,Sd=518,Ed=519,Fc=35044,Zi=35048,Ul="300 es",ii=2e3,Or=2001;class ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const Ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nl=1234567;const uo=Math.PI/180,bo=180/Math.PI;function Vn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ze[n&255]+Ze[n>>8&255]+Ze[n>>16&255]+Ze[n>>24&255]+"-"+Ze[t&255]+Ze[t>>8&255]+"-"+Ze[t>>16&15|64]+Ze[t>>24&255]+"-"+Ze[e&63|128]+Ze[e>>8&255]+"-"+Ze[e>>16&255]+Ze[e>>24&255]+Ze[i&255]+Ze[i>>8&255]+Ze[i>>16&255]+Ze[i>>24&255]).toLowerCase()}function Qt(n,t,e){return Math.max(t,Math.min(e,n))}function el(n,t){return(n%t+t)%t}function Td(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Ad(n,t,e){return n!==t?(e-n)/(t-n):0}function fo(n,t,e){return(1-e)*n+e*t}function Rd(n,t,e,i){return fo(n,t,1-Math.exp(-e*i))}function Cd(n,t=1){return t-Math.abs(el(n,t*2)-t)}function Pd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Id(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Ld(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Dd(n,t){return n+Math.random()*(t-n)}function Ud(n){return n*(.5-Math.random())}function Nd(n){n!==void 0&&(Nl=n);let t=Nl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Fd(n){return n*uo}function Od(n){return n*bo}function zd(n){return(n&n-1)===0&&n!==0}function Bd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Gd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Hd(n,t,e,i,s){const o=Math.cos,r=Math.sin,a=o(e/2),c=r(e/2),l=o((t+i)/2),h=r((t+i)/2),u=o((t-i)/2),f=r((t-i)/2),d=o((i-t)/2),g=r((i-t)/2);switch(s){case"XYX":n.set(a*h,c*u,c*f,a*l);break;case"YZY":n.set(c*f,a*h,c*u,a*l);break;case"ZXZ":n.set(c*u,c*f,a*h,a*l);break;case"XZX":n.set(a*h,c*g,c*d,a*l);break;case"YXY":n.set(c*d,a*h,c*g,a*l);break;case"ZYZ":n.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Dn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Se(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const pe={DEG2RAD:uo,RAD2DEG:bo,generateUUID:Vn,clamp:Qt,euclideanModulo:el,mapLinear:Td,inverseLerp:Ad,lerp:fo,damp:Rd,pingpong:Cd,smoothstep:Pd,smootherstep:Id,randInt:Ld,randFloat:Dd,randFloatSpread:Ud,seededRandom:Nd,degToRad:Fd,radToDeg:Od,isPowerOfTwo:zd,ceilPowerOfTwo:Bd,floorPowerOfTwo:Gd,setQuaternionFromProperEuler:Hd,normalize:Se,denormalize:Dn};class it{constructor(t=0,e=0){it.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*i-r*s+t.x,this.y=o*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ie{constructor(t,e,i,s,o,r,a,c,l){ie.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,c,l)}set(t,e,i,s,o,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=o,h[5]=c,h[6]=i,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],_=s[0],p=s[3],m=s[6],x=s[1],M=s[4],v=s[7],w=s[2],E=s[5],R=s[8];return o[0]=r*_+a*x+c*w,o[3]=r*p+a*M+c*E,o[6]=r*m+a*v+c*R,o[1]=l*_+h*x+u*w,o[4]=l*p+h*M+u*E,o[7]=l*m+h*v+u*R,o[2]=f*_+d*x+g*w,o[5]=f*p+d*M+g*E,o[8]=f*m+d*v+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-i*o*h+i*a*c+s*o*l-s*r*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*r-a*l,f=a*c-h*o,d=l*o-r*c,g=e*u+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*i)*_,t[2]=(a*i-s*r)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*o-a*e)*_,t[6]=d*_,t[7]=(i*c-l*e)*_,t[8]=(r*e-i*o)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(i*c,i*l,-i*(c*r+l*a)+r+t,-s*l,s*c,-s*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ra.makeScale(t,e)),this}rotate(t){return this.premultiply(ra.makeRotation(-t)),this}translate(t,e){return this.premultiply(ra.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ra=new ie;function Du(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function zr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vd(){const n=zr("canvas");return n.style.display="block",n}const Fl={};function Hi(n){n in Fl||(Fl[n]=!0,console.warn(n))}function Wd(n,t,e){return new Promise(function(i,s){function o(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:i()}}setTimeout(o,e)})}function kd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Xd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ol=new ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zl=new ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yd(){const n={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(s,o,r){return this.enabled===!1||o===r||!o||!r||(this.spaces[o].transfer===Te&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[o].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[o].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Te&&(s.r=Us(s.r),s.g=Us(s.g),s.b=Us(s.b))),s},fromWorkingColorSpace:function(s,o){return this.convert(s,this.workingColorSpace,o)},toWorkingColorSpace:function(s,o){return this.convert(s,o,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bi?Fr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,o=this.workingColorSpace){return s.fromArray(this.spaces[o].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,o,r){return s.copy(this.spaces[o].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Vs]:{primaries:t,whitePoint:i,transfer:Fr,toXYZ:Ol,fromXYZ:zl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:i,transfer:Te,toXYZ:Ol,fromXYZ:zl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),n}const ge=Yd();function oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Us(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let cs;class Zd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{cs===void 0&&(cs=zr("canvas")),cs.width=t.width,cs.height=t.height;const i=cs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=cs}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=zr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=oi(o[r]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(oi(e[i]/255)*255):e[i]=oi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qd=0;class nl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=Vn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(aa(s[r].image)):o.push(aa(s[r]))}else o=aa(s);i.url=o}return e||(t.images[this.uuid]=i),i}}function aa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jd=0;class Qe extends ns{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,i=Xi,s=Xi,o=Nn,r=yi,a=Fn,c=ai,l=Qe.DEFAULT_ANISOTROPY,h=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Vn(),this.name="",this.source=new nl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vo:t.x=t.x-Math.floor(t.x);break;case Xi:t.x=t.x<0?0:1;break;case lc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vo:t.y=t.y-Math.floor(t.y);break;case Xi:t.y=t.y<0?0:1;break;case lc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=bu;Qe.DEFAULT_ANISOTROPY=1;class Ne{constructor(t=0,e=0,i=0,s=1){Ne.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*i+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*i+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*i+r[11]*s+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,o;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,v=(d+1)/2,w=(m+1)/2,E=(h+f)/4,R=(u+_)/4,A=(g+p)/4;return M>v&&M>w?M<.01?(i=0,s=.707106781,o=.707106781):(i=Math.sqrt(M),s=E/i,o=R/i):v>w?v<.01?(i=.707106781,s=0,o=.707106781):(s=Math.sqrt(v),i=E/s,o=A/s):w<.01?(i=.707106781,s=.707106781,o=0):(o=Math.sqrt(w),i=R/o,s=A/o),this.set(i,s,o,e),this}let x=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(u-_)/x,this.z=(f-h)/x,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $d extends ns{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ne(0,0,t,e),this.scissorTest=!1,this.viewport=new Ne(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const o=new Qe(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];const r=i.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new nl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ji extends $d{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Uu extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kd extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,o,r,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const f=o[r+0],d=o[r+1],g=o[r+2],_=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let p=1-a;const m=c*f+l*d+h*g+u*_,x=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){const w=Math.sqrt(M),E=Math.atan2(w,m*x);p=Math.sin(p*E)/w,a=Math.sin(a*E)/w}const v=a*x;if(c=c*p+f*v,l=l*p+d*v,h=h*p+g*v,u=u*p+_*v,p===1-a){const w=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=w,l*=w,h*=w,u*=w}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,o,r){const a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=o[r],f=o[r+1],d=o[r+2],g=o[r+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(o/2),f=c(i/2),d=c(s/2),g=c(o/2);switch(r){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(o-l)*d,this._z=(r-s)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+r)/d,this._z=(o+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(o-l)/d,this._x=(s+r)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(r-s)/d,this._x=(o+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+r*a+s*l-o*c,this._y=s*h+r*c+o*a-i*l,this._z=o*h+r*l+i*c-s*a,this._w=r*h-i*a-s*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+i*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=i,this._y=s,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*r+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=r*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=o*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Bl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Bl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*s,this.y=o[1]*e+o[4]*i+o[7]*s,this.z=o[2]*e+o[5]*i+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*i+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*i+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*i+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*s-a*i),h=2*(a*e-o*s),u=2*(o*i-r*e);return this.x=e+c*l+r*u-a*h,this.y=i+c*h+a*l-o*u,this.z=s+c*u+o*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s,this.y=o[1]*e+o[5]*i+o[9]*s,this.z=o[2]*e+o[6]*i+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=s*c-o*a,this.y=o*r-i*c,this.z=i*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ca.copy(this).projectOnVector(t),this.sub(ca)}reflect(t){return this.sub(ca.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ca=new U,Bl=new Wn;class is{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,Pn):Pn.fromBufferAttribute(o,r),Pn.applyMatrix4(t.matrixWorld),this.expandByPoint(Pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Vo.copy(i.boundingBox)),Vo.applyMatrix4(t.matrixWorld),this.union(Vo)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pn),Pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Js),Wo.subVectors(this.max,Js),ls.subVectors(t.a,Js),hs.subVectors(t.b,Js),us.subVectors(t.c,Js),fi.subVectors(hs,ls),di.subVectors(us,hs),Ui.subVectors(ls,us);let e=[0,-fi.z,fi.y,0,-di.z,di.y,0,-Ui.z,Ui.y,fi.z,0,-fi.x,di.z,0,-di.x,Ui.z,0,-Ui.x,-fi.y,fi.x,0,-di.y,di.x,0,-Ui.y,Ui.x,0];return!la(e,ls,hs,us,Wo)||(e=[1,0,0,0,1,0,0,0,1],!la(e,ls,hs,us,Wo))?!1:(ko.crossVectors(fi,di),e=[ko.x,ko.y,ko.z],la(e,ls,hs,us,Wo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Kn=[new U,new U,new U,new U,new U,new U,new U,new U],Pn=new U,Vo=new is,ls=new U,hs=new U,us=new U,fi=new U,di=new U,Ui=new U,Js=new U,Wo=new U,ko=new U,Ni=new U;function la(n,t,e,i,s){for(let o=0,r=n.length-3;o<=r;o+=3){Ni.fromArray(n,o);const a=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),c=t.dot(Ni),l=e.dot(Ni),h=i.dot(Ni);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Jd=new is,Qs=new U,ha=new U;class zn{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Jd.setFromPoints(t).getCenter(i);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Qs.subVectors(t,this.center);const e=Qs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Qs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ha.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Qs.copy(t.center).add(ha)),this.expandByPoint(Qs.copy(t.center).sub(ha))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Jn=new U,ua=new U,Xo=new U,pi=new U,fa=new U,Yo=new U,da=new U;class No{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Jn.copy(this.origin).addScaledVector(this.direction,e),Jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ua.copy(t).add(e).multiplyScalar(.5),Xo.copy(e).sub(t).normalize(),pi.copy(this.origin).sub(ua);const o=t.distanceTo(e)*.5,r=-this.direction.dot(Xo),a=pi.dot(this.direction),c=-pi.dot(Xo),l=pi.lengthSq(),h=Math.abs(1-r*r);let u,f,d,g;if(h>0)if(u=r*c-a,f=r*a-c,g=o*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+r*f+2*a)+f*(r*u+f+2*c)+l}else f=o,u=Math.max(0,-(r*f+a)),d=-u*u+f*(f+2*c)+l;else f=-o,u=Math.max(0,-(r*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-r*o+a)),f=u>0?-o:Math.min(Math.max(-o,-c),o),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-o,-c),o),d=f*(f+2*c)+l):(u=Math.max(0,-(r*o+a)),f=u>0?o:Math.min(Math.max(-o,-c),o),d=-u*u+f*(f+2*c)+l);else f=r>0?-o:o,u=Math.max(0,-(r*f+a)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ua).addScaledVector(Xo,f),d}intersectSphere(t,e){Jn.subVectors(t.center,this.origin);const i=Jn.dot(this.direction),s=Jn.dot(Jn)-i*i,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=i-r,c=i+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,o,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(o=(t.min.y-f.y)*h,r=(t.max.y-f.y)*h):(o=(t.max.y-f.y)*h,r=(t.min.y-f.y)*h),i>r||o>s||((o>i||isNaN(i))&&(i=o),(r<s||isNaN(s))&&(s=r),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Jn)!==null}intersectTriangle(t,e,i,s,o){fa.subVectors(e,t),Yo.subVectors(i,t),da.crossVectors(fa,Yo);let r=this.direction.dot(da),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;pi.subVectors(this.origin,t);const c=a*this.direction.dot(Yo.crossVectors(pi,Yo));if(c<0)return null;const l=a*this.direction.dot(fa.cross(pi));if(l<0||c+l>r)return null;const h=-a*pi.dot(da);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ee{constructor(t,e,i,s,o,r,a,c,l,h,u,f,d,g,_,p){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,c,l,h,u,f,d,g,_,p)}set(t,e,i,s,o,r,a,c,l,h,u,f,d,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=o,m[5]=r,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/fs.setFromMatrixColumn(t,0).length(),o=1/fs.setFromMatrixColumn(t,1).length(),r=1/fs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,o=t.z,r=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(o),u=Math.sin(o);if(t.order==="XYZ"){const f=r*h,d=r*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=r*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=r*l,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=r*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*a,e[4]=-r*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=r*h,e[9]=_-f*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const f=r*h,d=r*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const f=r*c,d=r*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=r*c,d=r*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=r*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qd,t,tp)}lookAt(t,e,i){const s=this.elements;return pn.subVectors(t,e),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),mi.crossVectors(i,pn),mi.lengthSq()===0&&(Math.abs(i.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),mi.crossVectors(i,pn)),mi.normalize(),Zo.crossVectors(pn,mi),s[0]=mi.x,s[4]=Zo.x,s[8]=pn.x,s[1]=mi.y,s[5]=Zo.y,s[9]=pn.y,s[2]=mi.z,s[6]=Zo.z,s[10]=pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],_=i[6],p=i[10],m=i[14],x=i[3],M=i[7],v=i[11],w=i[15],E=s[0],R=s[4],A=s[8],y=s[12],b=s[1],D=s[5],V=s[9],G=s[13],Y=s[2],C=s[6],N=s[10],z=s[14],I=s[3],k=s[7],Q=s[11],st=s[15];return o[0]=r*E+a*b+c*Y+l*I,o[4]=r*R+a*D+c*C+l*k,o[8]=r*A+a*V+c*N+l*Q,o[12]=r*y+a*G+c*z+l*st,o[1]=h*E+u*b+f*Y+d*I,o[5]=h*R+u*D+f*C+d*k,o[9]=h*A+u*V+f*N+d*Q,o[13]=h*y+u*G+f*z+d*st,o[2]=g*E+_*b+p*Y+m*I,o[6]=g*R+_*D+p*C+m*k,o[10]=g*A+_*V+p*N+m*Q,o[14]=g*y+_*G+p*z+m*st,o[3]=x*E+M*b+v*Y+w*I,o[7]=x*R+M*D+v*C+w*k,o[11]=x*A+M*V+v*N+w*Q,o[15]=x*y+M*G+v*z+w*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+o*c*u-s*l*u-o*a*f+i*l*f+s*a*d-i*c*d)+_*(+e*c*d-e*l*f+o*r*f-s*r*d+s*l*h-o*c*h)+p*(+e*l*u-e*a*d-o*r*u+i*r*d+o*a*h-i*l*h)+m*(-s*a*h-e*c*u+e*a*f+s*r*u-i*r*f+i*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],x=u*p*l-_*f*l+_*c*d-a*p*d-u*c*m+a*f*m,M=g*f*l-h*p*l-g*c*d+r*p*d+h*c*m-r*f*m,v=h*_*l-g*u*l+g*a*d-r*_*d-h*a*m+r*u*m,w=g*u*c-h*_*c-g*a*f+r*_*f+h*a*p-r*u*p,E=e*x+i*M+s*v+o*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/E;return t[0]=x*R,t[1]=(_*f*o-u*p*o-_*s*d+i*p*d+u*s*m-i*f*m)*R,t[2]=(a*p*o-_*c*o+_*s*l-i*p*l-a*s*m+i*c*m)*R,t[3]=(u*c*o-a*f*o-u*s*l+i*f*l+a*s*d-i*c*d)*R,t[4]=M*R,t[5]=(h*p*o-g*f*o+g*s*d-e*p*d-h*s*m+e*f*m)*R,t[6]=(g*c*o-r*p*o-g*s*l+e*p*l+r*s*m-e*c*m)*R,t[7]=(r*f*o-h*c*o+h*s*l-e*f*l-r*s*d+e*c*d)*R,t[8]=v*R,t[9]=(g*u*o-h*_*o-g*i*d+e*_*d+h*i*m-e*u*m)*R,t[10]=(r*_*o-g*a*o+g*i*l-e*_*l-r*i*m+e*a*m)*R,t[11]=(h*a*o-r*u*o-h*i*l+e*u*l+r*i*d-e*a*d)*R,t[12]=w*R,t[13]=(h*_*s-g*u*s+g*i*f-e*_*f-h*i*p+e*u*p)*R,t[14]=(g*a*s-r*_*s-g*i*c+e*_*c+r*i*p-e*a*p)*R,t[15]=(r*u*s-h*a*s+h*i*c-e*u*c-r*i*f+e*a*f)*R,this}scale(t){const e=this.elements,i=t.x,s=t.y,o=t.z;return e[0]*=i,e[4]*=s,e[8]*=o,e[1]*=i,e[5]*=s,e[9]*=o,e[2]*=i,e[6]*=s,e[10]*=o,e[3]*=i,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),o=1-i,r=t.x,a=t.y,c=t.z,l=o*r,h=o*a;return this.set(l*r+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*r,0,l*c-s*a,h*c+s*r,o*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,o,r){return this.set(1,i,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,h=r+r,u=a+a,f=o*l,d=o*h,g=o*u,_=r*h,p=r*u,m=a*u,x=c*l,M=c*h,v=c*u,w=i.x,E=i.y,R=i.z;return s[0]=(1-(_+m))*w,s[1]=(d+v)*w,s[2]=(g-M)*w,s[3]=0,s[4]=(d-v)*E,s[5]=(1-(f+m))*E,s[6]=(p+x)*E,s[7]=0,s[8]=(g+M)*R,s[9]=(p-x)*R,s[10]=(1-(f+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let o=fs.set(s[0],s[1],s[2]).length();const r=fs.set(s[4],s[5],s[6]).length(),a=fs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],In.copy(this);const l=1/o,h=1/r,u=1/a;return In.elements[0]*=l,In.elements[1]*=l,In.elements[2]*=l,In.elements[4]*=h,In.elements[5]*=h,In.elements[6]*=h,In.elements[8]*=u,In.elements[9]*=u,In.elements[10]*=u,e.setFromRotationMatrix(In),i.x=o,i.y=r,i.z=a,this}makePerspective(t,e,i,s,o,r,a=ii){const c=this.elements,l=2*o/(e-t),h=2*o/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s);let d,g;if(a===ii)d=-(r+o)/(r-o),g=-2*r*o/(r-o);else if(a===Or)d=-r/(r-o),g=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,o,r,a=ii){const c=this.elements,l=1/(e-t),h=1/(i-s),u=1/(r-o),f=(e+t)*l,d=(i+s)*h;let g,_;if(a===ii)g=(r+o)*u,_=-2*u;else if(a===Or)g=o*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const fs=new U,In=new ee,Qd=new U(0,0,0),tp=new U(1,1,1),mi=new U,Zo=new U,pn=new U,Gl=new ee,Hl=new Wn;class xn{constructor(t=0,e=0,i=0,s=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Qt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Gl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Gl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hl.setFromEuler(this),this.setFromQuaternion(Hl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class il{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ep=0;const Vl=new U,ds=new Wn,Qn=new ee,qo=new U,to=new U,np=new U,ip=new Wn,Wl=new U(1,0,0),kl=new U(0,1,0),Xl=new U(0,0,1),Yl={type:"added"},sp={type:"removed"},ps={type:"childadded",child:null},pa={type:"childremoved",child:null};class xe extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new U,e=new xn,i=new Wn,s=new U(1,1,1);function o(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new ie}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new il,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ds.setFromAxisAngle(t,e),this.quaternion.multiply(ds),this}rotateOnWorldAxis(t,e){return ds.setFromAxisAngle(t,e),this.quaternion.premultiply(ds),this}rotateX(t){return this.rotateOnAxis(Wl,t)}rotateY(t){return this.rotateOnAxis(kl,t)}rotateZ(t){return this.rotateOnAxis(Xl,t)}translateOnAxis(t,e){return Vl.copy(t).applyQuaternion(this.quaternion),this.position.add(Vl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Wl,t)}translateY(t){return this.translateOnAxis(kl,t)}translateZ(t){return this.translateOnAxis(Xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?qo.copy(t):qo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),to.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(to,qo,this.up):Qn.lookAt(qo,to,this.up),this.quaternion.setFromRotationMatrix(Qn),s&&(Qn.extractRotation(s.matrixWorld),ds.setFromRotationMatrix(Qn),this.quaternion.premultiply(ds.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Yl),ps.child=t,this.dispatchEvent(ps),ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sp),pa.child=t,this.dispatchEvent(pa),pa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Yl),ps.child=t,this.dispatchEvent(ps),ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,t,np),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,ip,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];o(t.shapes,u)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),u=r(t.shapes),f=r(t.skeletons),d=r(t.animations),g=r(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}xe.DEFAULT_UP=new U(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ln=new U,ti=new U,ma=new U,ei=new U,ms=new U,gs=new U,Zl=new U,ga=new U,_a=new U,xa=new U,va=new Ne,Ma=new Ne,ba=new Ne;class En{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Ln.subVectors(t,e),s.cross(Ln);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,i,s,o){Ln.subVectors(s,e),ti.subVectors(i,e),ma.subVectors(t,e);const r=Ln.dot(Ln),a=Ln.dot(ti),c=Ln.dot(ma),l=ti.dot(ti),h=ti.dot(ma),u=r*l-a*a;if(u===0)return o.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(r*h-a*c)*f;return o.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(t,e,i,s,o,r,a,c){return this.getBarycoord(t,e,i,s,ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,ei.x),c.addScaledVector(r,ei.y),c.addScaledVector(a,ei.z),c)}static getInterpolatedAttribute(t,e,i,s,o,r){return va.setScalar(0),Ma.setScalar(0),ba.setScalar(0),va.fromBufferAttribute(t,e),Ma.fromBufferAttribute(t,i),ba.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(va,o.x),r.addScaledVector(Ma,o.y),r.addScaledVector(ba,o.z),r}static isFrontFacing(t,e,i,s){return Ln.subVectors(i,e),ti.subVectors(t,e),Ln.cross(ti).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ln.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),Ln.cross(ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return En.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return En.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,o){return En.getInterpolation(t,this.a,this.b,this.c,e,i,s,o)}containsPoint(t){return En.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return En.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,o=this.c;let r,a;ms.subVectors(s,i),gs.subVectors(o,i),ga.subVectors(t,i);const c=ms.dot(ga),l=gs.dot(ga);if(c<=0&&l<=0)return e.copy(i);_a.subVectors(t,s);const h=ms.dot(_a),u=gs.dot(_a);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(i).addScaledVector(ms,r);xa.subVectors(t,o);const d=ms.dot(xa),g=gs.dot(xa);if(g>=0&&d<=g)return e.copy(o);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(i).addScaledVector(gs,a);const p=h*g-d*u;if(p<=0&&u-h>=0&&d-g>=0)return Zl.subVectors(o,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Zl,a);const m=1/(p+_+f);return r=_*m,a=f*m,e.copy(i).addScaledVector(ms,r).addScaledVector(gs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},jo={h:0,s:0,l:0};function ya(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class rt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ge.workingColorSpace){return this.r=t,this.g=e,this.b=i,ge.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ge.workingColorSpace){if(t=el(t,1),e=Qt(e,0,1),i=Qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,r=2*i-o;this.r=ya(r,o,t+1/3),this.g=ya(r,o,t),this.b=ya(r,o,t-1/3)}return ge.toWorkingColorSpace(this,s),this}setStyle(t,e=Fe){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){const i=Nu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=oi(t.r),this.g=oi(t.g),this.b=oi(t.b),this}copyLinearToSRGB(t){return this.r=Us(t.r),this.g=Us(t.g),this.b=Us(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return ge.fromWorkingColorSpace(qe.copy(this),t),Math.round(Qt(qe.r*255,0,255))*65536+Math.round(Qt(qe.g*255,0,255))*256+Math.round(Qt(qe.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.fromWorkingColorSpace(qe.copy(this),e);const i=qe.r,s=qe.g,o=qe.b,r=Math.max(i,s,o),a=Math.min(i,s,o);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const u=r-a;switch(l=h<=.5?u/(r+a):u/(2-r-a),r){case i:c=(s-o)/u+(s<o?6:0);break;case s:c=(o-i)/u+2;break;case o:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ge.workingColorSpace){return ge.fromWorkingColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=Fe){ge.fromWorkingColorSpace(qe.copy(this),t);const e=qe.r,i=qe.g,s=qe.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(gi),this.setHSL(gi.h+t,gi.s+e,gi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(gi),t.getHSL(jo);const i=fo(gi.h,jo.h,e),s=fo(gi.s,jo.s,e),o=fo(gi.l,jo.l,e);return this.setHSL(i,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*s,this.g=o[1]*e+o[4]*i+o[7]*s,this.b=o[2]*e+o[5]*i+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qe=new rt;rt.NAMES=Nu;let op=0;class Yn extends ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=Vn(),this.name="",this.type="Material",this.blending=Ls,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ja,this.blendDst=Qa,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=as,this.stencilZFail=as,this.stencilZPass=as,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(i.blending=this.blending),this.side!==ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ja&&(i.blendSrc=this.blendSrc),this.blendDst!==Qa&&(i.blendDst=this.blendDst),this.blendEquation!==Wi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Os&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==as&&(i.stencilFail=this.stencilFail),this.stencilZFail!==as&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==as&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(i.textures=o),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let o=0;o!==s;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ci extends Yn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ze=new U,$o=new it;let rp=0;class Xe{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Fc,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)$o.fromBufferAttribute(this,e),$o.applyMatrix3(t),this.setXY(e,$o.x,$o.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Se(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Dn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Dn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Dn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Dn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array),s=Se(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array),s=Se(s,this.array),o=Se(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fc&&(t.usage=this.usage),t}}class Fu extends Xe{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Ou extends Xe{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ft extends Xe{constructor(t,e,i){super(new Float32Array(t),e,i)}}let ap=0;const bn=new ee,wa=new xe,_s=new U,mn=new is,eo=new is,We=new U;class ye extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Du(t)?Ou:Fu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new ie().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,i){return bn.makeTranslation(t,e,i),this.applyMatrix4(bn),this}scale(t,e,i){return bn.makeScale(t,e,i),this.applyMatrix4(bn),this}lookAt(t){return wa.lookAt(t),wa.updateMatrix(),this.applyMatrix4(wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,o=t.length;s<o;s++){const r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ft(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const o=t[s];e.setXYZ(s,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const o=e[i];mn.setFromBufferAttribute(o),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];eo.setFromBufferAttribute(a),this.morphTargetsRelative?(We.addVectors(mn.min,eo.min),mn.expandByPoint(We),We.addVectors(mn.max,eo.max),mn.expandByPoint(We)):(mn.expandByPoint(eo.min),mn.expandByPoint(eo.max))}mn.getCenter(i);let s=0;for(let o=0,r=t.count;o<r;o++)We.fromBufferAttribute(t,o),s=Math.max(s,i.distanceToSquared(We));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)We.fromBufferAttribute(a,l),c&&(_s.fromBufferAttribute(t,l),We.add(_s)),s=Math.max(s,i.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xe(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let A=0;A<i.count;A++)a[A]=new U,c[A]=new U;const l=new U,h=new U,u=new U,f=new it,d=new it,g=new it,_=new U,p=new U;function m(A,y,b){l.fromBufferAttribute(i,A),h.fromBufferAttribute(i,y),u.fromBufferAttribute(i,b),f.fromBufferAttribute(o,A),d.fromBufferAttribute(o,y),g.fromBufferAttribute(o,b),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(D),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),a[A].add(_),a[y].add(_),a[b].add(_),c[A].add(p),c[y].add(p),c[b].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let A=0,y=x.length;A<y;++A){const b=x[A],D=b.start,V=b.count;for(let G=D,Y=D+V;G<Y;G+=3)m(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const M=new U,v=new U,w=new U,E=new U;function R(A){w.fromBufferAttribute(s,A),E.copy(w);const y=a[A];M.copy(y),M.sub(w.multiplyScalar(w.dot(y))).normalize(),v.crossVectors(E,y);const D=v.dot(c[A])<0?-1:1;r.setXYZW(A,M.x,M.y,M.z,D)}for(let A=0,y=x.length;A<y;++A){const b=x[A],D=b.start,V=b.count;for(let G=D,Y=D+V;G<Y;G+=3)R(t.getX(G+0)),R(t.getX(G+1)),R(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new U,o=new U,r=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,_),r.fromBufferAttribute(e,p),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,p),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),o.fromBufferAttribute(e,f+1),r.fromBufferAttribute(e,f+2),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let m=0;m<h;m++)f[g++]=l[d++]}return new Xe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ye,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const o=t.morphAttributes;for(const l in o){const h=[],u=o[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ql=new ee,Fi=new No,Ko=new zn,jl=new U,Jo=new U,Qo=new U,tr=new U,Sa=new U,er=new U,$l=new U,nr=new U;class ht extends xe{constructor(t=new ye,e=new Ci){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,o=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){er.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const h=a[c],u=o[c];h!==0&&(Sa.fromBufferAttribute(u,t),r?er.addScaledVector(Sa,h):er.addScaledVector(Sa.sub(e),h))}e.add(er)}return e}raycast(t,e){const i=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ko.copy(i.boundingSphere),Ko.applyMatrix4(o),Fi.copy(t.ray).recast(t.near),!(Ko.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Ko,jl)===null||Fi.origin.distanceToSquared(jl)>(t.far-t.near)**2))&&(ql.copy(o).invert(),Fi.copy(t.ray).applyMatrix4(ql),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Fi)))}_computeIntersections(t,e,i){let s;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,f=o.groups,d=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=r[p.materialIndex],x=Math.max(p.start,d.start),M=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let v=x,w=M;v<w;v+=3){const E=a.getX(v),R=a.getX(v+1),A=a.getX(v+2);s=ir(this,m,t,i,l,h,u,E,R,A),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const x=a.getX(p),M=a.getX(p+1),v=a.getX(p+2);s=ir(this,r,t,i,l,h,u,x,M,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=r[p.materialIndex],x=Math.max(p.start,d.start),M=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let v=x,w=M;v<w;v+=3){const E=v,R=v+1,A=v+2;s=ir(this,m,t,i,l,h,u,E,R,A),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const x=p,M=p+1,v=p+2;s=ir(this,r,t,i,l,h,u,x,M,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function cp(n,t,e,i,s,o,r,a){let c;if(t.side===Ke?c=i.intersectTriangle(r,o,s,!0,a):c=i.intersectTriangle(s,o,r,t.side===ri,a),c===null)return null;nr.copy(a),nr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(nr);return l<e.near||l>e.far?null:{distance:l,point:nr.clone(),object:n}}function ir(n,t,e,i,s,o,r,a,c,l){n.getVertexPosition(a,Jo),n.getVertexPosition(c,Qo),n.getVertexPosition(l,tr);const h=cp(n,t,e,i,Jo,Qo,tr,$l);if(h){const u=new U;En.getBarycoord($l,Jo,Qo,tr,u),s&&(h.uv=En.getInterpolatedAttribute(s,a,c,l,u,new it)),o&&(h.uv1=En.getInterpolatedAttribute(o,a,c,l,u,new it)),r&&(h.normal=En.getInterpolatedAttribute(r,a,c,l,u,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new U,materialIndex:0};En.getNormal(Jo,Qo,tr,f.normal),h.face=f,h.barycoord=u}return h}class At extends ye{constructor(t=1,e=1,i=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,r,o,0),g("z","y","x",1,-1,i,e,-t,r,o,1),g("x","z","y",1,1,t,i,e,s,r,2),g("x","z","y",1,-1,t,i,-e,s,r,3),g("x","y","z",1,-1,t,e,i,s,o,4),g("x","y","z",-1,-1,t,e,-i,s,o,5),this.setIndex(c),this.setAttribute("position",new Ft(l,3)),this.setAttribute("normal",new Ft(h,3)),this.setAttribute("uv",new Ft(u,2));function g(_,p,m,x,M,v,w,E,R,A,y){const b=v/R,D=w/A,V=v/2,G=w/2,Y=E/2,C=R+1,N=A+1;let z=0,I=0;const k=new U;for(let Q=0;Q<N;Q++){const st=Q*D-G;for(let bt=0;bt<C;bt++){const Wt=bt*b-V;k[_]=Wt*x,k[p]=st*M,k[m]=Y,l.push(k.x,k.y,k.z),k[_]=0,k[p]=0,k[m]=E>0?1:-1,h.push(k.x,k.y,k.z),u.push(bt/R),u.push(1-Q/A),z+=1}}for(let Q=0;Q<A;Q++)for(let st=0;st<R;st++){const bt=f+st+C*Q,Wt=f+st+C*(Q+1),$=f+(st+1)+C*(Q+1),ot=f+(st+1)+C*Q;c.push(bt,Wt,ot),c.push(Wt,$,ot),I+=6}a.addGroup(d,I,y),d+=I,f+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new At(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ws(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function on(n){const t={};for(let e=0;e<n.length;e++){const i=Ws(n[e]);for(const s in i)t[s]=i[s]}return t}function lp(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function zu(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ge.workingColorSpace}const hp={clone:Ws,merge:on};var up=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends Yn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=up,this.fragmentShader=fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ws(t.uniforms),this.uniformsGroups=lp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Bu extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=ii}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const _i=new U,Kl=new it,Jl=new it;class wn extends Bu{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=bo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(uo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bo*2*Math.atan(Math.tan(uo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(_i.x,_i.y).multiplyScalar(-t/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(_i.x,_i.y).multiplyScalar(-t/_i.z)}getViewSize(t,e){return this.getViewBounds(t,Kl,Jl),e.subVectors(Jl,Kl)}setViewOffset(t,e,i,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(uo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*s/c,e-=r.offsetY*i/l,s*=r.width/c,i*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const xs=-90,vs=1;class dp extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new wn(xs,vs,t,e);s.layers=this.layers,this.add(s);const o=new wn(xs,vs,t,e);o.layers=this.layers,this.add(o);const r=new wn(xs,vs,t,e);r.layers=this.layers,this.add(r);const a=new wn(xs,vs,t,e);a.layers=this.layers,this.add(a);const c=new wn(xs,vs,t,e);c.layers=this.layers,this.add(c);const l=new wn(xs,vs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===ii)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Or)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,o),t.setRenderTarget(i,1,s),t.render(e,r),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Gu extends Qe{constructor(t,e,i,s,o,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:zs,super(t,e,i,s,o,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class pp extends Ji{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Gu(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Nn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new At(5,5,5),o=new ci({name:"CubemapFromEquirect",uniforms:Ws(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ke,blending:Ei});o.uniforms.tEquirect.value=e;const r=new ht(s,o),a=e.minFilter;return e.minFilter===yi&&(e.minFilter=Nn),new dp(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,i,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,s);t.setRenderTarget(o)}}class te extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mp={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,i),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mp)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new te;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class sl{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new rt(t),this.near=e,this.far=i}clone(){return new sl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hu extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class gp{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Fc,this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,o=this.stride;s<o;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const sn=new U;class Br{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)sn.fromBufferAttribute(this,e),sn.applyMatrix4(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)sn.fromBufferAttribute(this,e),sn.applyNormalMatrix(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)sn.fromBufferAttribute(this,e),sn.transformDirection(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Se(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=Se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Dn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Dn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Dn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Dn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array),s=Se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array),s=Se(s,this.array),o=Se(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return new Xe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Br(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Vu extends Yn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ms;const no=new U,bs=new U,ys=new U,ws=new it,io=new it,Wu=new ee,sr=new U,so=new U,or=new U,Ql=new it,Ta=new it,th=new it;class _p extends xe{constructor(t=new Vu){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new ye;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new gp(e,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new Br(i,3,0,!1)),Ms.setAttribute("uv",new Br(i,2,3,!1))}this.geometry=Ms,this.material=t,this.center=new it(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bs.setFromMatrixScale(this.matrixWorld),Wu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ys.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bs.multiplyScalar(-ys.z);const i=this.material.rotation;let s,o;i!==0&&(o=Math.cos(i),s=Math.sin(i));const r=this.center;rr(sr.set(-.5,-.5,0),ys,r,bs,s,o),rr(so.set(.5,-.5,0),ys,r,bs,s,o),rr(or.set(.5,.5,0),ys,r,bs,s,o),Ql.set(0,0),Ta.set(1,0),th.set(1,1);let a=t.ray.intersectTriangle(sr,so,or,!1,no);if(a===null&&(rr(so.set(-.5,.5,0),ys,r,bs,s,o),Ta.set(0,1),a=t.ray.intersectTriangle(sr,or,so,!1,no),a===null))return;const c=t.ray.origin.distanceTo(no);c<t.near||c>t.far||e.push({distance:c,point:no.clone(),uv:En.getInterpolation(no,sr,so,or,Ql,Ta,th,new it),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function rr(n,t,e,i,s,o){ws.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(io.x=o*ws.x-s*ws.y,io.y=s*ws.x+o*ws.y):io.copy(ws),n.copy(t),n.x+=io.x,n.y+=io.y,n.applyMatrix4(Wu)}class xp extends Qe{constructor(t=null,e=1,i=1,s,o,r,a,c,l=Je,h=Je,u,f){super(null,r,a,c,l,h,s,o,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qi extends Xe{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ss=new ee,eh=new ee,ar=[],nh=new is,vp=new ee,oo=new ht,ro=new zn;class Ee extends ht{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Qi(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,vp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new is),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ss),nh.copy(t.boundingBox).applyMatrix4(Ss),this.boundingBox.union(nh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new zn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ss),ro.copy(t.boundingSphere).applyMatrix4(Ss),this.boundingSphere.union(ro)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,o=i.length+1,r=t*o+1;for(let a=0;a<i.length;a++)i[a]=s[r+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(oo.geometry=this.geometry,oo.material=this.material,oo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ro.copy(this.boundingSphere),ro.applyMatrix4(i),t.ray.intersectsSphere(ro)!==!1))for(let o=0;o<s;o++){this.getMatrixAt(o,Ss),eh.multiplyMatrices(i,Ss),oo.matrixWorld=eh,oo.raycast(t,ar);for(let r=0,a=ar.length;r<a;r++){const c=ar[r];c.instanceId=o,c.object=this,e.push(c)}ar.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Qi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new xp(new Float32Array(s*this.count),s,this.count,Kc,Hn));const o=this.morphTexture.source.data.data;let r=0;for(let l=0;l<i.length;l++)r+=i[l];const a=this.geometry.morphTargetsRelative?1:1-r,c=s*t;o[c]=a,o.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Aa=new U,Mp=new U,bp=new ie;class Mi{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Aa.subVectors(i,e).cross(Mp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Aa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||bp.getNormalMatrix(t),s=this.coplanarPoint(Aa).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Oi=new zn,cr=new U;class Xs{constructor(t=new Mi,e=new Mi,i=new Mi,s=new Mi,o=new Mi,r=new Mi){this.planes=[t,e,i,s,o,r]}set(t,e,i,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ii){const i=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],p=s[11],m=s[12],x=s[13],M=s[14],v=s[15];if(i[0].setComponents(c-o,f-l,p-d,v-m).normalize(),i[1].setComponents(c+o,f+l,p+d,v+m).normalize(),i[2].setComponents(c+r,f+h,p+g,v+x).normalize(),i[3].setComponents(c-r,f-h,p-g,v-x).normalize(),i[4].setComponents(c-a,f-u,p-_,v-M).normalize(),e===ii)i[5].setComponents(c+a,f+u,p+_,v+M).normalize();else if(e===Or)i[5].setComponents(a,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(t){return Oi.center.set(0,0,0),Oi.radius=.7071067811865476,Oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(cr.x=s.normal.x>0?t.max.x:t.min.x,cr.y=s.normal.y>0?t.max.y:t.min.y,cr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ol extends Yn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Gr=new U,Hr=new U,ih=new ee,ao=new No,lr=new zn,Ra=new U,sh=new U;class ku extends xe{constructor(t=new ye,e=new ol){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,o=e.count;s<o;s++)Gr.fromBufferAttribute(e,s-1),Hr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Gr.distanceTo(Hr);t.setAttribute("lineDistance",new Ft(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),lr.copy(i.boundingSphere),lr.applyMatrix4(s),lr.radius+=o,t.ray.intersectsSphere(lr)===!1)return;ih.copy(s).invert(),ao.copy(t.ray).applyMatrix4(ih);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const d=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=d,p=g-1;_<p;_+=l){const m=h.getX(_),x=h.getX(_+1),M=hr(this,t,ao,c,m,x,_);M&&e.push(M)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(d),m=hr(this,t,ao,c,_,p,g-1);m&&e.push(m)}}else{const d=Math.max(0,r.start),g=Math.min(f.count,r.start+r.count);for(let _=d,p=g-1;_<p;_+=l){const m=hr(this,t,ao,c,_,_+1,_);m&&e.push(m)}if(this.isLineLoop){const _=hr(this,t,ao,c,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function hr(n,t,e,i,s,o,r){const a=n.geometry.attributes.position;if(Gr.fromBufferAttribute(a,s),Hr.fromBufferAttribute(a,o),e.distanceSqToSegment(Gr,Hr,Ra,sh)>i)return;Ra.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ra);if(!(l<t.near||l>t.far))return{distance:l,point:sh.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const oh=new U,rh=new U;class yp extends ku{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,o=e.count;s<o;s+=2)oh.fromBufferAttribute(e,s),rh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+oh.distanceTo(rh);t.setAttribute("lineDistance",new Ft(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Xu extends Yn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ah=new ee,Oc=new No,ur=new zn,fr=new U;class wp extends xe{constructor(t=new ye,e=new Xu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ur.copy(i.boundingSphere),ur.applyMatrix4(s),ur.radius+=o,t.ray.intersectsSphere(ur)===!1)return;ah.copy(s).invert(),Oc.copy(t.ray).applyMatrix4(ah);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){const f=Math.max(0,r.start),d=Math.min(l.count,r.start+r.count);for(let g=f,_=d;g<_;g++){const p=l.getX(g);fr.fromBufferAttribute(u,p),ch(fr,p,c,s,t,e,this)}}else{const f=Math.max(0,r.start),d=Math.min(u.count,r.start+r.count);for(let g=f,_=d;g<_;g++)fr.fromBufferAttribute(u,g),ch(fr,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function ch(n,t,e,i,s,o,r){const a=Oc.distanceSqToPoint(n);if(a<e){const c=new U;Oc.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;o.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class kn extends Qe{constructor(t,e,i,s,o,r,a,c,l){super(t,e,i,s,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Yu extends Qe{constructor(t,e,i,s,o,r,a,c,l,h=Ds){if(h!==Ds&&h!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ds&&(i=Ki),i===void 0&&h===Hs&&(i=Gs),super(null,s,o,r,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Je,this.minFilter=c!==void 0?c:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new nl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Zn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),o+=i.distanceTo(s),e.push(o),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const o=i.length;let r;e?r=e:r=t*i[o-1];let a=0,c=o-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-r,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===r)return s/(o-1);const h=i[s],f=i[s+1]-h,d=(r-h)/f;return(s+d)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),c=e||(r.isVector2?new it:new U);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new U,s=[],o=[],r=[],a=new U,c=new ee;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new U)}o[0]=new U,r[0]=new U;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let d=1;d<=t;d++){if(o[d]=o[d-1].clone(),r[d]=r[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Qt(s[d-1].dot(s[d]),-1,1));o[d].applyMatrix4(c.makeRotationAxis(a,g))}r[d].crossVectors(s[d],o[d])}if(e===!0){let d=Math.acos(Qt(o[0].dot(o[t]),-1,1));d/=t,s[0].dot(a.crossVectors(o[0],o[t]))>0&&(d=-d);for(let g=1;g<=t;g++)o[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),r[g].crossVectors(s[g],o[g])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class rl extends Zn{constructor(t=0,e=0,i=1,s=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new it){const i=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+t*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Sp extends rl{constructor(t,e,i,s,o,r){super(t,e,i,i,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function al(){let n=0,t=0,e=0,i=0;function s(o,r,a,c){n=o,t=a,e=-3*o+3*r-2*a-c,i=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){s(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,h,u){let f=(r-o)/l-(a-o)/(l+h)+(a-r)/h,d=(a-r)/h-(c-r)/(h+u)+(c-a)/u;f*=h,d*=h,s(r,a,f,d)},calc:function(o){const r=o*o,a=r*o;return n+t*o+e*r+i*a}}}const dr=new U,Ca=new al,Pa=new al,Ia=new al;class Zu extends Zn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new U){const i=e,s=this.points,o=s.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%o]:(dr.subVectors(s[0],s[1]).add(s[0]),l=dr);const u=s[a%o],f=s[(a+1)%o];if(this.closed||a+2<o?h=s[(a+2)%o]:(dr.subVectors(s[o-1],s[o-2]).add(s[o-1]),h=dr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),Ca.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,p),Pa.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,p),Ia.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(Ca.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Pa.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Ia.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(Ca.calc(c),Pa.calc(c),Ia.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new U().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function lh(n,t,e,i,s){const o=(i-t)*.5,r=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+o+r)*c+(-3*e+3*i-2*o-r)*a+o*n+e}function Ep(n,t){const e=1-n;return e*e*t}function Tp(n,t){return 2*(1-n)*n*t}function Ap(n,t){return n*n*t}function po(n,t,e,i){return Ep(n,t)+Tp(n,e)+Ap(n,i)}function Rp(n,t){const e=1-n;return e*e*e*t}function Cp(n,t){const e=1-n;return 3*e*e*n*t}function Pp(n,t){return 3*(1-n)*n*n*t}function Ip(n,t){return n*n*n*t}function mo(n,t,e,i,s){return Rp(n,t)+Cp(n,e)+Pp(n,i)+Ip(n,s)}class qu extends Zn{constructor(t=new it,e=new it,i=new it,s=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new it){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(mo(t,s.x,o.x,r.x,a.x),mo(t,s.y,o.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lp extends Zn{constructor(t=new U,e=new U,i=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new U){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(mo(t,s.x,o.x,r.x,a.x),mo(t,s.y,o.y,r.y,a.y),mo(t,s.z,o.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ju extends Zn{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dp extends Zn{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $u extends Zn{constructor(t=new it,e=new it,i=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new it){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(po(t,s.x,o.x,r.x),po(t,s.y,o.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Up extends Zn{constructor(t=new U,e=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new U){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(po(t,s.x,o.x,r.x),po(t,s.y,o.y,r.y),po(t,s.z,o.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ku extends Zn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const i=e,s=this.points,o=(s.length-1)*t,r=Math.floor(o),a=o-r,c=s[r===0?r:r-1],l=s[r],h=s[r>s.length-2?s.length-1:r+1],u=s[r>s.length-3?s.length-1:r+2];return i.set(lh(a,c.x,l.x,h.x,u.x),lh(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new it().fromArray(s))}return this}}var hh=Object.freeze({__proto__:null,ArcCurve:Sp,CatmullRomCurve3:Zu,CubicBezierCurve:qu,CubicBezierCurve3:Lp,EllipseCurve:rl,LineCurve:ju,LineCurve3:Dp,QuadraticBezierCurve:$u,QuadraticBezierCurve3:Up,SplineCurve:Ku});class Np extends Zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new hh[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=i){const r=s[o]-i,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,o=this.curves;s<o.length;s++){const r=o[s],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new hh[s.type]().fromJSON(s))}return this}}class Vr extends Np{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new ju(this.currentPoint.clone(),new it(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const o=new $u(this.currentPoint.clone(),new it(t,e),new it(i,s));return this.curves.push(o),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,o,r){const a=new qu(this.currentPoint.clone(),new it(t,e),new it(i,s),new it(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Ku(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,o,r),this}absarc(t,e,i,s,o,r){return this.absellipse(t,e,i,i,s,o,r),this}ellipse(t,e,i,s,o,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,o,r,a,c),this}absellipse(t,e,i,s,o,r,a,c){const l=new rl(t,e,i,s,o,r,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class qi extends ye{constructor(t=[new it(0,-.5),new it(.5,0),new it(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Qt(s,0,Math.PI*2);const o=[],r=[],a=[],c=[],l=[],h=1/e,u=new U,f=new it,d=new U,g=new U,_=new U;let p=0,m=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:p=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,d.x=m*1,d.y=-p,d.z=m*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:p=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let x=0;x<=e;x++){const M=i+x*h*s,v=Math.sin(M),w=Math.cos(M);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*v,u.y=t[E].y,u.z=t[E].x*w,r.push(u.x,u.y,u.z),f.x=x/e,f.y=E/(t.length-1),a.push(f.x,f.y);const R=c[3*E+0]*v,A=c[3*E+1],y=c[3*E+0]*w;l.push(R,A,y)}}for(let x=0;x<e;x++)for(let M=0;M<t.length-1;M++){const v=M+x*t.length,w=v,E=v+t.length,R=v+t.length+1,A=v+1;o.push(w,E,A),o.push(R,A,E)}this.setIndex(o),this.setAttribute("position",new Ft(r,3)),this.setAttribute("uv",new Ft(a,2)),this.setAttribute("normal",new Ft(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qi(t.points,t.segments,t.phiStart,t.phiLength)}}class On extends qi{constructor(t=1,e=1,i=4,s=8){const o=new Vr;o.absarc(0,-e/2,t,Math.PI*1.5,0),o.absarc(0,e/2,t,0,Math.PI*.5),super(o.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:i,radialSegments:s}}static fromJSON(t){return new On(t.radius,t.length,t.capSegments,t.radialSegments)}}class Wr extends ye{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const o=[],r=[],a=[],c=[],l=new U,h=new it;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=i+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[f]/t+1)/2,h.y=(r[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)o.push(u,u+1,0);this.setIndex(o),this.setAttribute("position",new Ft(r,3)),this.setAttribute("normal",new Ft(a,3)),this.setAttribute("uv",new Ft(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class oe extends ye{constructor(t=1,e=1,i=1,s=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),o=Math.floor(o);const h=[],u=[],f=[],d=[];let g=0;const _=[],p=i/2;let m=0;x(),r===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Ft(u,3)),this.setAttribute("normal",new Ft(f,3)),this.setAttribute("uv",new Ft(d,2));function x(){const v=new U,w=new U;let E=0;const R=(e-t)/i;for(let A=0;A<=o;A++){const y=[],b=A/o,D=b*(e-t)+t;for(let V=0;V<=s;V++){const G=V/s,Y=G*c+a,C=Math.sin(Y),N=Math.cos(Y);w.x=D*C,w.y=-b*i+p,w.z=D*N,u.push(w.x,w.y,w.z),v.set(C,R,N).normalize(),f.push(v.x,v.y,v.z),d.push(G,1-b),y.push(g++)}_.push(y)}for(let A=0;A<s;A++)for(let y=0;y<o;y++){const b=_[y][A],D=_[y+1][A],V=_[y+1][A+1],G=_[y][A+1];(t>0||y!==0)&&(h.push(b,D,G),E+=3),(e>0||y!==o-1)&&(h.push(D,V,G),E+=3)}l.addGroup(m,E,0),m+=E}function M(v){const w=g,E=new it,R=new U;let A=0;const y=v===!0?t:e,b=v===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,p*b,0),f.push(0,b,0),d.push(.5,.5),g++;const D=g;for(let V=0;V<=s;V++){const Y=V/s*c+a,C=Math.cos(Y),N=Math.sin(Y);R.x=y*N,R.y=p*b,R.z=y*C,u.push(R.x,R.y,R.z),f.push(0,b,0),E.x=C*.5+.5,E.y=N*.5*b+.5,d.push(E.x,E.y),g++}for(let V=0;V<s;V++){const G=w+V,Y=D+V;v===!0?h.push(Y,Y+1,G):h.push(Y+1,Y,G),A+=3}l.addGroup(m,A,v===!0?1:2),m+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ai extends oe{constructor(t=1,e=1,i=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,i,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new Ai(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fo extends ye{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const o=[],r=[];a(s),l(i),h(),this.setAttribute("position",new Ft(o,3)),this.setAttribute("normal",new Ft(o.slice(),3)),this.setAttribute("uv",new Ft(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const M=new U,v=new U,w=new U;for(let E=0;E<e.length;E+=3)d(e[E+0],M),d(e[E+1],v),d(e[E+2],w),c(M,v,w,x)}function c(x,M,v,w){const E=w+1,R=[];for(let A=0;A<=E;A++){R[A]=[];const y=x.clone().lerp(v,A/E),b=M.clone().lerp(v,A/E),D=E-A;for(let V=0;V<=D;V++)V===0&&A===E?R[A][V]=y:R[A][V]=y.clone().lerp(b,V/D)}for(let A=0;A<E;A++)for(let y=0;y<2*(E-A)-1;y++){const b=Math.floor(y/2);y%2===0?(f(R[A][b+1]),f(R[A+1][b]),f(R[A][b])):(f(R[A][b+1]),f(R[A+1][b+1]),f(R[A+1][b]))}}function l(x){const M=new U;for(let v=0;v<o.length;v+=3)M.x=o[v+0],M.y=o[v+1],M.z=o[v+2],M.normalize().multiplyScalar(x),o[v+0]=M.x,o[v+1]=M.y,o[v+2]=M.z}function h(){const x=new U;for(let M=0;M<o.length;M+=3){x.x=o[M+0],x.y=o[M+1],x.z=o[M+2];const v=p(x)/2/Math.PI+.5,w=m(x)/Math.PI+.5;r.push(v,1-w)}g(),u()}function u(){for(let x=0;x<r.length;x+=6){const M=r[x+0],v=r[x+2],w=r[x+4],E=Math.max(M,v,w),R=Math.min(M,v,w);E>.9&&R<.1&&(M<.2&&(r[x+0]+=1),v<.2&&(r[x+2]+=1),w<.2&&(r[x+4]+=1))}}function f(x){o.push(x.x,x.y,x.z)}function d(x,M){const v=x*3;M.x=t[v+0],M.y=t[v+1],M.z=t[v+2]}function g(){const x=new U,M=new U,v=new U,w=new U,E=new it,R=new it,A=new it;for(let y=0,b=0;y<o.length;y+=9,b+=6){x.set(o[y+0],o[y+1],o[y+2]),M.set(o[y+3],o[y+4],o[y+5]),v.set(o[y+6],o[y+7],o[y+8]),E.set(r[b+0],r[b+1]),R.set(r[b+2],r[b+3]),A.set(r[b+4],r[b+5]),w.copy(x).add(M).add(v).divideScalar(3);const D=p(w);_(E,b+0,x,D),_(R,b+2,M,D),_(A,b+4,v,D)}}function _(x,M,v,w){w<0&&x.x===1&&(r[M]=x.x-1),v.x===0&&v.z===0&&(r[M]=w/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fo(t.vertices,t.indices,t.radius,t.details)}}class Kr extends Fo{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,o=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(o,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Kr(t.radius,t.detail)}}class Ju extends Vr{constructor(t){super(t),this.uuid=Vn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Vr().fromJSON(s))}return this}}class Fp{static triangulate(t,e,i=2){const s=e&&e.length,o=s?e[0]*i:t.length;let r=Qu(t,0,o,i,!0);const a=[];if(!r||r.next===r.prev)return a;let c,l,h,u,f,d,g;if(s&&(r=Hp(t,e,r,i)),t.length>80*i){c=h=t[0],l=u=t[1];for(let _=i;_<o;_+=i)f=t[_],d=t[_+1],f<c&&(c=f),d<l&&(l=d),f>h&&(h=f),d>u&&(u=d);g=Math.max(h-c,u-l),g=g!==0?32767/g:0}return yo(r,a,i,c,l,g,0),a}}function Qu(n,t,e,i,s){let o,r;if(s===Jp(n,t,e,i)>0)for(o=t;o<e;o+=i)r=uh(o,n[o],n[o+1],r);else for(o=e-i;o>=t;o-=i)r=uh(o,n[o],n[o+1],r);return r&&Jr(r,r.next)&&(So(r),r=r.next),r}function ts(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Jr(e,e.next)||Le(e.prev,e,e.next)===0)){if(So(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function yo(n,t,e,i,s,o,r){if(!n)return;!r&&o&&Yp(n,i,s,o);let a=n,c,l;for(;n.prev!==n.next;){if(c=n.prev,l=n.next,o?zp(n,i,s,o):Op(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),So(n),n=l.next,a=l.next;continue}if(n=l,n===a){r?r===1?(n=Bp(ts(n),t,e),yo(n,t,e,i,s,o,2)):r===2&&Gp(n,t,e,i,s,o):yo(ts(n),t,e,i,s,o,1);break}}}function Op(n){const t=n.prev,e=n,i=n.next;if(Le(t,e,i)>=0)return!1;const s=t.x,o=e.x,r=i.x,a=t.y,c=e.y,l=i.y,h=s<o?s<r?s:r:o<r?o:r,u=a<c?a<l?a:l:c<l?c:l,f=s>o?s>r?s:r:o>r?o:r,d=a>c?a>l?a:l:c>l?c:l;let g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Rs(s,a,o,c,r,l,g.x,g.y)&&Le(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function zp(n,t,e,i){const s=n.prev,o=n,r=n.next;if(Le(s,o,r)>=0)return!1;const a=s.x,c=o.x,l=r.x,h=s.y,u=o.y,f=r.y,d=a<c?a<l?a:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,_=a>c?a>l?a:l:c>l?c:l,p=h>u?h>f?h:f:u>f?u:f,m=zc(d,g,t,e,i),x=zc(_,p,t,e,i);let M=n.prevZ,v=n.nextZ;for(;M&&M.z>=m&&v&&v.z<=x;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=p&&M!==s&&M!==r&&Rs(a,h,c,u,l,f,M.x,M.y)&&Le(M.prev,M,M.next)>=0||(M=M.prevZ,v.x>=d&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==r&&Rs(a,h,c,u,l,f,v.x,v.y)&&Le(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;M&&M.z>=m;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=p&&M!==s&&M!==r&&Rs(a,h,c,u,l,f,M.x,M.y)&&Le(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;v&&v.z<=x;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==r&&Rs(a,h,c,u,l,f,v.x,v.y)&&Le(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Bp(n,t,e){let i=n;do{const s=i.prev,o=i.next.next;!Jr(s,o)&&tf(s,i,i.next,o)&&wo(s,o)&&wo(o,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(o.i/e|0),So(i),So(i.next),i=n=o),i=i.next}while(i!==n);return ts(i)}function Gp(n,t,e,i,s,o){let r=n;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&jp(r,a)){let c=ef(r,a);r=ts(r,r.next),c=ts(c,c.next),yo(r,t,e,i,s,o,0),yo(c,t,e,i,s,o,0);return}a=a.next}r=r.next}while(r!==n)}function Hp(n,t,e,i){const s=[];let o,r,a,c,l;for(o=0,r=t.length;o<r;o++)a=t[o]*i,c=o<r-1?t[o+1]*i:n.length,l=Qu(n,a,c,i,!1),l===l.next&&(l.steiner=!0),s.push(qp(l));for(s.sort(Vp),o=0;o<s.length;o++)e=Wp(s[o],e);return e}function Vp(n,t){return n.x-t.x}function Wp(n,t){const e=kp(n,t);if(!e)return t;const i=ef(e,n);return ts(i,i.next),ts(e,e.next)}function kp(n,t){let e=t,i=-1/0,s;const o=n.x,r=n.y;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const f=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=o&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===o))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do o>=e.x&&e.x>=c&&o!==e.x&&Rs(r<l?o:i,r,c,l,r<l?i:o,r,e.x,e.y)&&(u=Math.abs(r-e.y)/(o-e.x),wo(e,n)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Xp(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function Xp(n,t){return Le(n.prev,n,t.prev)<0&&Le(t.next,n,n.next)<0}function Yp(n,t,e,i){let s=n;do s.z===0&&(s.z=zc(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Zp(s)}function Zp(n){let t,e,i,s,o,r,a,c,l=1;do{for(e=n,n=null,o=null,r=0;e;){for(r++,i=e,a=0,t=0;t<l&&(a++,i=i.nextZ,!!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,c--),o?o.nextZ=s:n=s,s.prevZ=o,o=s;e=i}o.nextZ=null,l*=2}while(r>1);return n}function zc(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function qp(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Rs(n,t,e,i,s,o,r,a){return(s-r)*(t-a)>=(n-r)*(o-a)&&(n-r)*(i-a)>=(e-r)*(t-a)&&(e-r)*(o-a)>=(s-r)*(i-a)}function jp(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!$p(n,t)&&(wo(n,t)&&wo(t,n)&&Kp(n,t)&&(Le(n.prev,n,t.prev)||Le(n,t.prev,t))||Jr(n,t)&&Le(n.prev,n,n.next)>0&&Le(t.prev,t,t.next)>0)}function Le(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Jr(n,t){return n.x===t.x&&n.y===t.y}function tf(n,t,e,i){const s=mr(Le(n,t,e)),o=mr(Le(n,t,i)),r=mr(Le(e,i,n)),a=mr(Le(e,i,t));return!!(s!==o&&r!==a||s===0&&pr(n,e,t)||o===0&&pr(n,i,t)||r===0&&pr(e,n,i)||a===0&&pr(e,t,i))}function pr(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function mr(n){return n>0?1:n<0?-1:0}function $p(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&tf(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function wo(n,t){return Le(n.prev,n,n.next)<0?Le(n,t,n.next)>=0&&Le(n,n.prev,t)>=0:Le(n,t,n.prev)<0||Le(n,n.next,t)<0}function Kp(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,o=(n.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function ef(n,t){const e=new Bc(n.i,n.x,n.y),i=new Bc(t.i,t.x,t.y),s=n.next,o=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,o.next=i,i.prev=o,i}function uh(n,t,e,i){const s=new Bc(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function So(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Bc(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Jp(n,t,e,i){let s=0;for(let o=t,r=e-i;o<e;o+=i)s+=(n[r]-n[o])*(n[o+1]+n[r+1]),r=o;return s}class go{static area(t){const e=t.length;let i=0;for(let s=e-1,o=0;o<e;s=o++)i+=t[s].x*t[o].y-t[o].x*t[s].y;return i*.5}static isClockWise(t){return go.area(t)<0}static triangulateShape(t,e){const i=[],s=[],o=[];fh(t),dh(i,t);let r=t.length;e.forEach(fh);for(let c=0;c<e.length;c++)s.push(r),r+=e[c].length,dh(i,e[c]);const a=Fp.triangulate(i,s);for(let c=0;c<a.length;c+=3)o.push(a.slice(c,c+3));return o}}function fh(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function dh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class Oo extends Fo{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Oo(t.radius,t.detail)}}class cl extends Fo{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cl(t.radius,t.detail)}}class Ys extends ye{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const x=m*f-r;for(let M=0;M<l;M++){const v=M*u-o;g.push(v,-x,0),_.push(0,0,1),p.push(M/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const M=x+l*m,v=x+l*(m+1),w=x+1+l*(m+1),E=x+1+l*m;d.push(M,v,E),d.push(v,w,E)}this.setIndex(d),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(_,3)),this.setAttribute("uv",new Ft(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ys(t.width,t.height,t.widthSegments,t.heightSegments)}}class ll extends ye{constructor(t=.5,e=1,i=32,s=1,o=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:o,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const f=(e-t)/s,d=new U,g=new it;for(let _=0;_<=s;_++){for(let p=0;p<=i;p++){const m=o+p/i*r;d.x=u*Math.cos(m),d.y=u*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const p=_*(i+1);for(let m=0;m<i;m++){const x=m+p,M=x,v=x+i+1,w=x+i+2,E=x+1;a.push(M,v,E),a.push(v,w,E)}}this.setIndex(a),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(l,3)),this.setAttribute("uv",new Ft(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ll(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class hl extends ye{constructor(t=new Ju([new it(0,.5),new it(-.5,-.5),new it(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],o=[],r=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Ft(s,3)),this.setAttribute("normal",new Ft(o,3)),this.setAttribute("uv",new Ft(r,2));function l(h){const u=s.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;go.isClockWise(d)===!1&&(d=d.reverse());for(let p=0,m=g.length;p<m;p++){const x=g[p];go.isClockWise(x)===!0&&(g[p]=x.reverse())}const _=go.triangulateShape(d,g);for(let p=0,m=g.length;p<m;p++){const x=g[p];d=d.concat(x)}for(let p=0,m=d.length;p<m;p++){const x=d[p];s.push(x.x,x.y,0),o.push(0,0,1),r.push(x.x,x.y)}for(let p=0,m=_.length;p<m;p++){const x=_[p],M=x[0]+u,v=x[1]+u,w=x[2]+u;i.push(M,v,w),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Qp(e,t)}static fromJSON(t,e){const i=[];for(let s=0,o=t.shapes.length;s<o;s++){const r=e[t.shapes[s]];i.push(r)}return new hl(i,t.curveSegments)}}function Qp(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class he extends ye{constructor(t=1,e=32,i=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(r+a,Math.PI);let l=0;const h=[],u=new U,f=new U,d=[],g=[],_=[],p=[];for(let m=0;m<=i;m++){const x=[],M=m/i;let v=0;m===0&&r===0?v=.5/e:m===i&&c===Math.PI&&(v=-.5/e);for(let w=0;w<=e;w++){const E=w/e;u.x=-t*Math.cos(s+E*o)*Math.sin(r+M*a),u.y=t*Math.cos(r+M*a),u.z=t*Math.sin(s+E*o)*Math.sin(r+M*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(E+v,1-M),x.push(l++)}h.push(x)}for(let m=0;m<i;m++)for(let x=0;x<e;x++){const M=h[m][x+1],v=h[m][x],w=h[m+1][x],E=h[m+1][x+1];(m!==0||r>0)&&d.push(M,v,E),(m!==i-1||c<Math.PI)&&d.push(v,w,E)}this.setIndex(d),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(_,3)),this.setAttribute("uv",new Ft(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Pe extends ye{constructor(t=1,e=.4,i=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:o},i=Math.floor(i),s=Math.floor(s);const r=[],a=[],c=[],l=[],h=new U,u=new U,f=new U;for(let d=0;d<=i;d++)for(let g=0;g<=s;g++){const _=g/s*o,p=d/i*Math.PI*2;u.x=(t+e*Math.cos(p))*Math.cos(_),u.y=(t+e*Math.cos(p))*Math.sin(_),u.z=e*Math.sin(p),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=s;g++){const _=(s+1)*d+g-1,p=(s+1)*(d-1)+g-1,m=(s+1)*(d-1)+g,x=(s+1)*d+g;r.push(_,p,x),r.push(p,m,x)}this.setIndex(r),this.setAttribute("position",new Ft(a,3)),this.setAttribute("normal",new Ft(c,3)),this.setAttribute("uv",new Ft(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ct extends Yn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$r,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class t0 extends ct{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new rt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new rt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new rt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class e0 extends Yn{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new rt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$r,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Ns extends Yn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$r,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nf extends Yn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_d,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class n0 extends Yn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ul extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class i0 extends ul{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new rt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const La=new ee,ph=new U,mh=new U;class s0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xs,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new Ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;ph.setFromMatrixPosition(t.matrixWorld),e.position.copy(ph),mh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(mh),e.updateMatrixWorld(),La.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(La),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(La)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class sf extends Bu{constructor(t=-1,e=1,i=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=i-t,r=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class o0 extends s0{constructor(){super(new sf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class r0 extends ul{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new o0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class a0 extends ul{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class c0 extends wn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}const gh=new ee;class l0{constructor(t,e,i=0,s=1/0){this.ray=new No(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new il,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return gh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gh),this}intersectObject(t,e=!0,i=[]){return Gc(t,this,i,e),i.sort(_h),i}intersectObjects(t,e=!0,i=[]){for(let s=0,o=t.length;s<o;s++)Gc(t[s],this,i,e);return i.sort(_h),i}}function _h(n,t){return n.distance-t.distance}function Gc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const o=n.children;for(let r=0,a=o.length;r<a;r++)Gc(o[r],t,e,!0)}}class xh{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class h0 extends yp{constructor(t=10,e=10,i=4473924,s=8947848){i=new rt(i),s=new rt(s);const o=e/2,r=t/e,a=t/2,c=[],l=[];for(let f=0,d=0,g=-a;f<=e;f++,g+=r){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);const _=f===o?i:s;_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3}const h=new ye;h.setAttribute("position",new Ft(c,3)),h.setAttribute("color",new Ft(l,3));const u=new ol({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class u0 extends ns{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function vh(n,t,e,i){const s=f0(i);switch(e){case Eu:return n*t;case Au:return n*t;case Ru:return n*t*2;case Kc:return n*t/s.components*s.byteLength;case Jc:return n*t/s.components*s.byteLength;case Cu:return n*t*2/s.components*s.byteLength;case Qc:return n*t*2/s.components*s.byteLength;case Tu:return n*t*3/s.components*s.byteLength;case Fn:return n*t*4/s.components*s.byteLength;case tl:return n*t*4/s.components*s.byteLength;case Cr:case Pr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ir:case Lr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case uc:case dc:return Math.max(n,16)*Math.max(t,8)/4;case hc:case fc:return Math.max(n,8)*Math.max(t,8)/2;case pc:case mc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case gc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _c:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case vc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case bc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case yc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case wc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Sc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ec:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Tc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ac:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Rc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Cc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Pc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Dr:case Ic:case Lc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Pu:case Dc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Uc:case Nc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function f0(n){switch(n){case ai:case yu:return{byteLength:1,components:1};case Mo:case wu:case Uo:return{byteLength:2,components:1};case jc:case $c:return{byteLength:2,components:4};case Ki:case qc:case Hn:return{byteLength:4,components:1};case Su:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"174"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="174");/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function of(){let n=null,t=!1,e=null,i=null;function s(o,r){e(o,r),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){n=o}}}function d0(n){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:o,update:r}}var p0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,m0=`#ifdef USE_ALPHAHASH
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
#endif`,g0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,x0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,v0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,M0=`#ifdef USE_AOMAP
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
#endif`,b0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,y0=`#ifdef USE_BATCHING
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
#endif`,w0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,S0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,E0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,T0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,A0=`#ifdef USE_IRIDESCENCE
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
#endif`,R0=`#ifdef USE_BUMPMAP
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
#endif`,C0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,D0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,U0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,N0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,F0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,O0=`#define PI 3.141592653589793
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
} // validated`,z0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,B0=`vec3 transformedNormal = objectNormal;
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
#endif`,G0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,H0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,V0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,W0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,k0="gl_FragColor = linearToOutputTexel( gl_FragColor );",X0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Y0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,q0=`#ifdef USE_ENVMAP
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
#endif`,j0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
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
#endif`,K0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,J0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Q0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,em=`#ifdef USE_GRADIENTMAP
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
}`,nm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,im=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,om=`uniform bool receiveShadow;
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
#endif`,rm=`#ifdef USE_ENVMAP
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
#endif`,am=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,um=`PhysicalMaterial material;
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
#endif`,fm=`struct PhysicalMaterial {
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
}`,dm=`
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
#endif`,pm=`#if defined( RE_IndirectDiffuse )
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
#endif`,mm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_m=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ym=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wm=`#if defined( USE_POINTS_UV )
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
#endif`,Sm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Em=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Am=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cm=`#ifdef USE_MORPHTARGETS
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
#endif`,Pm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Im=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Um=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fm=`#ifdef USE_NORMALMAP
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
#endif`,Om=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,km=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ym=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$m=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Km=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jm=`float getShadowMask() {
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
}`,Qm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tg=`#ifdef USE_SKINNING
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
#endif`,eg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ng=`#ifdef USE_SKINNING
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
#endif`,ig=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,og=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ag=`#ifdef USE_TRANSMISSION
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
#endif`,cg=`#ifdef USE_TRANSMISSION
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
#endif`,lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pg=`uniform sampler2D t2D;
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
}`,mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`#include <common>
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
}`,Mg=`#if DEPTH_PACKING == 3200
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
}`,bg=`#define DISTANCE
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
}`,yg=`#define DISTANCE
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
}`,wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`uniform float scale;
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
}`,Tg=`uniform vec3 diffuse;
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
}`,Ag=`#include <common>
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
}`,Rg=`uniform vec3 diffuse;
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
}`,Cg=`#define LAMBERT
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
}`,Pg=`#define LAMBERT
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
}`,Ig=`#define MATCAP
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
}`,Lg=`#define MATCAP
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
}`,Dg=`#define NORMAL
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
}`,Ug=`#define NORMAL
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
}`,Ng=`#define PHONG
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
}`,Fg=`#define PHONG
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
}`,Og=`#define STANDARD
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
}`,zg=`#define STANDARD
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
}`,Bg=`#define TOON
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
}`,Gg=`#define TOON
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
}`,Hg=`uniform float size;
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
}`,Vg=`uniform vec3 diffuse;
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
}`,Wg=`#include <common>
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
}`,kg=`uniform vec3 color;
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
}`,Xg=`uniform float rotation;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:p0,alphahash_pars_fragment:m0,alphamap_fragment:g0,alphamap_pars_fragment:_0,alphatest_fragment:x0,alphatest_pars_fragment:v0,aomap_fragment:M0,aomap_pars_fragment:b0,batching_pars_vertex:y0,batching_vertex:w0,begin_vertex:S0,beginnormal_vertex:E0,bsdfs:T0,iridescence_fragment:A0,bumpmap_pars_fragment:R0,clipping_planes_fragment:C0,clipping_planes_pars_fragment:P0,clipping_planes_pars_vertex:I0,clipping_planes_vertex:L0,color_fragment:D0,color_pars_fragment:U0,color_pars_vertex:N0,color_vertex:F0,common:O0,cube_uv_reflection_fragment:z0,defaultnormal_vertex:B0,displacementmap_pars_vertex:G0,displacementmap_vertex:H0,emissivemap_fragment:V0,emissivemap_pars_fragment:W0,colorspace_fragment:k0,colorspace_pars_fragment:X0,envmap_fragment:Y0,envmap_common_pars_fragment:Z0,envmap_pars_fragment:q0,envmap_pars_vertex:j0,envmap_physical_pars_fragment:rm,envmap_vertex:$0,fog_vertex:K0,fog_pars_vertex:J0,fog_fragment:Q0,fog_pars_fragment:tm,gradientmap_pars_fragment:em,lightmap_pars_fragment:nm,lights_lambert_fragment:im,lights_lambert_pars_fragment:sm,lights_pars_begin:om,lights_toon_fragment:am,lights_toon_pars_fragment:cm,lights_phong_fragment:lm,lights_phong_pars_fragment:hm,lights_physical_fragment:um,lights_physical_pars_fragment:fm,lights_fragment_begin:dm,lights_fragment_maps:pm,lights_fragment_end:mm,logdepthbuf_fragment:gm,logdepthbuf_pars_fragment:_m,logdepthbuf_pars_vertex:xm,logdepthbuf_vertex:vm,map_fragment:Mm,map_pars_fragment:bm,map_particle_fragment:ym,map_particle_pars_fragment:wm,metalnessmap_fragment:Sm,metalnessmap_pars_fragment:Em,morphinstance_vertex:Tm,morphcolor_vertex:Am,morphnormal_vertex:Rm,morphtarget_pars_vertex:Cm,morphtarget_vertex:Pm,normal_fragment_begin:Im,normal_fragment_maps:Lm,normal_pars_fragment:Dm,normal_pars_vertex:Um,normal_vertex:Nm,normalmap_pars_fragment:Fm,clearcoat_normal_fragment_begin:Om,clearcoat_normal_fragment_maps:zm,clearcoat_pars_fragment:Bm,iridescence_pars_fragment:Gm,opaque_fragment:Hm,packing:Vm,premultiplied_alpha_fragment:Wm,project_vertex:km,dithering_fragment:Xm,dithering_pars_fragment:Ym,roughnessmap_fragment:Zm,roughnessmap_pars_fragment:qm,shadowmap_pars_fragment:jm,shadowmap_pars_vertex:$m,shadowmap_vertex:Km,shadowmask_pars_fragment:Jm,skinbase_vertex:Qm,skinning_pars_vertex:tg,skinning_vertex:eg,skinnormal_vertex:ng,specularmap_fragment:ig,specularmap_pars_fragment:sg,tonemapping_fragment:og,tonemapping_pars_fragment:rg,transmission_fragment:ag,transmission_pars_fragment:cg,uv_pars_fragment:lg,uv_pars_vertex:hg,uv_vertex:ug,worldpos_vertex:fg,background_vert:dg,background_frag:pg,backgroundCube_vert:mg,backgroundCube_frag:gg,cube_vert:_g,cube_frag:xg,depth_vert:vg,depth_frag:Mg,distanceRGBA_vert:bg,distanceRGBA_frag:yg,equirect_vert:wg,equirect_frag:Sg,linedashed_vert:Eg,linedashed_frag:Tg,meshbasic_vert:Ag,meshbasic_frag:Rg,meshlambert_vert:Cg,meshlambert_frag:Pg,meshmatcap_vert:Ig,meshmatcap_frag:Lg,meshnormal_vert:Dg,meshnormal_frag:Ug,meshphong_vert:Ng,meshphong_frag:Fg,meshphysical_vert:Og,meshphysical_frag:zg,meshtoon_vert:Bg,meshtoon_frag:Gg,points_vert:Hg,points_frag:Vg,shadow_vert:Wg,shadow_frag:kg,sprite_vert:Xg,sprite_frag:Yg},gt={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},envMapRotation:{value:new ie},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},Gn={basic:{uniforms:on([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:on([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new rt(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:on([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:on([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:on([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new rt(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:on([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:on([gt.points,gt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:on([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:on([gt.common,gt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:on([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:on([gt.sprite,gt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ie}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:on([gt.common,gt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:on([gt.lights,gt.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Gn.physical={uniforms:on([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};const gr={r:0,b:0,g:0},zi=new xn,Zg=new ee;function qg(n,t,e,i,s,o,r){const a=new rt(0);let c=o===!0?0:1,l,h,u=null,f=0,d=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function _(M){let v=!1;const w=g(M);w===null?m(a,c):w&&w.isColor&&(m(w,1),v=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(M,v){const w=g(v);w&&(w.isCubeTexture||w.mapping===jr)?(h===void 0&&(h=new ht(new At(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:Ws(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),zi.copy(v.backgroundRotation),zi.x*=-1,zi.y*=-1,zi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Zg.makeRotationFromEuler(zi)),h.material.toneMapped=ge.getTransfer(w.colorSpace)!==Te,(u!==w||f!==w.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=w,f=w.version,d=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new ht(new Ys(2,2),new ci({name:"BackgroundMaterial",uniforms:Ws(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ge.getTransfer(w.colorSpace)!==Te,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,f=w.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,v){M.getRGB(gr,zu(n)),i.buffers.color.setClear(gr.r,gr.g,gr.b,v,r)}function x(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,m(a,c)},render:_,addToRenderList:p,dispose:x}}function jg(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let o=s,r=!1;function a(b,D,V,G,Y){let C=!1;const N=u(G,V,D);o!==N&&(o=N,l(o.object)),C=d(b,G,V,Y),C&&g(b,G,V,Y),Y!==null&&t.update(Y,n.ELEMENT_ARRAY_BUFFER),(C||r)&&(r=!1,v(b,D,V,G),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return n.createVertexArray()}function l(b){return n.bindVertexArray(b)}function h(b){return n.deleteVertexArray(b)}function u(b,D,V){const G=V.wireframe===!0;let Y=i[b.id];Y===void 0&&(Y={},i[b.id]=Y);let C=Y[D.id];C===void 0&&(C={},Y[D.id]=C);let N=C[G];return N===void 0&&(N=f(c()),C[G]=N),N}function f(b){const D=[],V=[],G=[];for(let Y=0;Y<e;Y++)D[Y]=0,V[Y]=0,G[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:V,attributeDivisors:G,object:b,attributes:{},index:null}}function d(b,D,V,G){const Y=o.attributes,C=D.attributes;let N=0;const z=V.getAttributes();for(const I in z)if(z[I].location>=0){const Q=Y[I];let st=C[I];if(st===void 0&&(I==="instanceMatrix"&&b.instanceMatrix&&(st=b.instanceMatrix),I==="instanceColor"&&b.instanceColor&&(st=b.instanceColor)),Q===void 0||Q.attribute!==st||st&&Q.data!==st.data)return!0;N++}return o.attributesNum!==N||o.index!==G}function g(b,D,V,G){const Y={},C=D.attributes;let N=0;const z=V.getAttributes();for(const I in z)if(z[I].location>=0){let Q=C[I];Q===void 0&&(I==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),I==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor));const st={};st.attribute=Q,Q&&Q.data&&(st.data=Q.data),Y[I]=st,N++}o.attributes=Y,o.attributesNum=N,o.index=G}function _(){const b=o.newAttributes;for(let D=0,V=b.length;D<V;D++)b[D]=0}function p(b){m(b,0)}function m(b,D){const V=o.newAttributes,G=o.enabledAttributes,Y=o.attributeDivisors;V[b]=1,G[b]===0&&(n.enableVertexAttribArray(b),G[b]=1),Y[b]!==D&&(n.vertexAttribDivisor(b,D),Y[b]=D)}function x(){const b=o.newAttributes,D=o.enabledAttributes;for(let V=0,G=D.length;V<G;V++)D[V]!==b[V]&&(n.disableVertexAttribArray(V),D[V]=0)}function M(b,D,V,G,Y,C,N){N===!0?n.vertexAttribIPointer(b,D,V,Y,C):n.vertexAttribPointer(b,D,V,G,Y,C)}function v(b,D,V,G){_();const Y=G.attributes,C=V.getAttributes(),N=D.defaultAttributeValues;for(const z in C){const I=C[z];if(I.location>=0){let k=Y[z];if(k===void 0&&(z==="instanceMatrix"&&b.instanceMatrix&&(k=b.instanceMatrix),z==="instanceColor"&&b.instanceColor&&(k=b.instanceColor)),k!==void 0){const Q=k.normalized,st=k.itemSize,bt=t.get(k);if(bt===void 0)continue;const Wt=bt.buffer,$=bt.type,ot=bt.bytesPerElement,ut=$===n.INT||$===n.UNSIGNED_INT||k.gpuType===qc;if(k.isInterleavedBufferAttribute){const ft=k.data,Ut=ft.stride,ce=k.offset;if(ft.isInstancedInterleavedBuffer){for(let pt=0;pt<I.locationSize;pt++)m(I.location+pt,ft.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let pt=0;pt<I.locationSize;pt++)p(I.location+pt);n.bindBuffer(n.ARRAY_BUFFER,Wt);for(let pt=0;pt<I.locationSize;pt++)M(I.location+pt,st/I.locationSize,$,Q,Ut*ot,(ce+st/I.locationSize*pt)*ot,ut)}else{if(k.isInstancedBufferAttribute){for(let ft=0;ft<I.locationSize;ft++)m(I.location+ft,k.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let ft=0;ft<I.locationSize;ft++)p(I.location+ft);n.bindBuffer(n.ARRAY_BUFFER,Wt);for(let ft=0;ft<I.locationSize;ft++)M(I.location+ft,st/I.locationSize,$,Q,st*ot,st/I.locationSize*ft*ot,ut)}}else if(N!==void 0){const Q=N[z];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(I.location,Q);break;case 3:n.vertexAttrib3fv(I.location,Q);break;case 4:n.vertexAttrib4fv(I.location,Q);break;default:n.vertexAttrib1fv(I.location,Q)}}}}x()}function w(){A();for(const b in i){const D=i[b];for(const V in D){const G=D[V];for(const Y in G)h(G[Y].object),delete G[Y];delete D[V]}delete i[b]}}function E(b){if(i[b.id]===void 0)return;const D=i[b.id];for(const V in D){const G=D[V];for(const Y in G)h(G[Y].object),delete G[Y];delete D[V]}delete i[b.id]}function R(b){for(const D in i){const V=i[D];if(V[b.id]===void 0)continue;const G=V[b.id];for(const Y in G)h(G[Y].object),delete G[Y];delete V[b.id]}}function A(){y(),r=!0,o!==s&&(o=s,l(o.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:y,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:p,disableUnusedAttributes:x}}function $g(n,t,e){let i;function s(l){i=l}function o(l,h){n.drawArrays(i,l,h),e.update(h,i,1)}function r(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),e.update(h,i,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,i,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)r(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,i,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Kg(n,t,e,i){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(R){return!(R!==Fn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const A=R===Uo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==ai&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Hn&&!A)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:w,maxSamples:E}}function Jg(n){const t=this;let e=null,i=0,s=!1,o=!1;const r=new Mi,a=new ie,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!s||g===null||g.length===0||o&&!p)o?h(null):l();else{const x=o?0:i,M=x*4;let v=m.clippingState||null;c.value=v,v=h(g,f,M,d);for(let w=0;w!==M;++w)v[w]=e[w];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=d+_*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let M=0,v=d;M!==_;++M,v+=4)r.copy(u[M]).applyMatrix4(x,a),r.normal.toArray(p,v),p[v+3]=r.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Qg(n){let t=new WeakMap;function e(r,a){return a===ac?r.mapping=zs:a===cc&&(r.mapping=Bs),r}function i(r){if(r&&r.isTexture){const a=r.mapping;if(a===ac||a===cc)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new pp(c.height);return l.fromEquirectangularTexture(n,r),t.set(r,l),r.addEventListener("dispose",s),e(l.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}const Cs=4,Mh=[.125,.215,.35,.446,.526,.582],ki=20,Da=new sf,bh=new rt;let Ua=null,Na=0,Fa=0,Oa=!1;const Vi=(1+Math.sqrt(5))/2,Es=1/Vi,yh=[new U(-Vi,Es,0),new U(Vi,Es,0),new U(-Es,0,Vi),new U(Es,0,Vi),new U(0,Vi,-Es),new U(0,Vi,Es),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],t_=new U;class Hc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,o={}){const{size:r=256,position:a=t_}=o;Ua=this._renderer.getRenderTarget(),Na=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ua,Na,Fa),this._renderer.xr.enabled=Oa,t.scissorTest=!1,_r(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===zs||t.mapping===Bs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ua=this._renderer.getRenderTarget(),Na=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:Uo,format:Fn,colorSpace:Vs,depthBuffer:!1},s=wh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wh(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=e_(o)),this._blurMaterial=n_(o,t,e)}return s}_compileMaterial(t){const e=new ht(this._lodPlanes[0],t);this._renderer.compile(e,Da)}_sceneToCubeUV(t,e,i,s,o){const c=new wn(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(bh),u.toneMapping=Ti,u.autoClear=!1;const g=new Ci({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1}),_=new ht(new At,g);let p=!1;const m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,p=!0):(g.color.copy(bh),p=!0);for(let x=0;x<6;x++){const M=x%3;M===0?(c.up.set(0,l[x],0),c.position.set(o.x,o.y,o.z),c.lookAt(o.x+h[x],o.y,o.z)):M===1?(c.up.set(0,0,l[x]),c.position.set(o.x,o.y,o.z),c.lookAt(o.x,o.y+h[x],o.z)):(c.up.set(0,l[x],0),c.position.set(o.x,o.y,o.z),c.lookAt(o.x,o.y,o.z+h[x]));const v=this._cubeSize;_r(s,M*v,x>2?v:0,v,v),u.setRenderTarget(s),p&&u.render(_,c),u.render(t,c)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===zs||t.mapping===Bs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sh());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new ht(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;_r(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(r,Da)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=yh[(s-o-1)%yh.length];this._blur(t,o-1,o,r,a)}e.autoClear=i}_blur(t,e,i,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,s,"latitudinal",o),this._halfBlur(r,t,i,i,s,"longitudinal",o)}_halfBlur(t,e,i,s,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ht(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[i]-1,g=isFinite(o)?Math.PI/(2*d):2*Math.PI/(2*ki-1),_=o/g,p=isFinite(o)?1+Math.floor(h*_):ki;p>ki&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ki}`);const m=[];let x=0;for(let R=0;R<ki;++R){const A=R/_,y=Math.exp(-A*A/2);m.push(y),R===0?x+=y:R<p&&(x+=2*y)}for(let R=0;R<m.length;R++)m[R]=m[R]/x;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=r==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-i;const v=this._sizeLods[s],w=3*v*(s>M-Cs?s-M+Cs:0),E=4*(this._cubeSize-v);_r(e,w,E,3*v,2*v),c.setRenderTarget(e),c.render(u,Da)}}function e_(n){const t=[],e=[],i=[];let s=n;const o=n-Cs+1+Mh.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let c=1/a;r>n-Cs?c=Mh[r-n+Cs-1]:r===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,p=2,m=1,x=new Float32Array(_*g*d),M=new Float32Array(p*g*d),v=new Float32Array(m*g*d);for(let E=0;E<d;E++){const R=E%3*2/3-1,A=E>2?0:-1,y=[R,A,0,R+2/3,A,0,R+2/3,A+1,0,R,A,0,R+2/3,A+1,0,R,A+1,0];x.set(y,_*g*E),M.set(f,p*g*E);const b=[E,E,E,E,E,E];v.set(b,m*g*E)}const w=new ye;w.setAttribute("position",new Xe(x,_)),w.setAttribute("uv",new Xe(M,p)),w.setAttribute("faceIndex",new Xe(v,m)),t.push(w),s>Cs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function wh(n,t,e){const i=new Ji(n,t,e);return i.texture.mapping=jr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _r(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function n_(n,t,e){const i=new Float32Array(ki),s=new U(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:ki,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fl(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Sh(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fl(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Eh(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function fl(){return`

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
	`}function i_(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===ac||c===cc,h=c===zs||c===Bs;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Hc(n)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Hc(n)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:r}}function s_(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Hi("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function o_(n,t,e,i){const s={},o=new WeakMap;function r(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",r),delete s[f.id];const d=o.get(f);d&&(t.remove(d),o.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",r),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const x=d.array;_=d.version;for(let M=0,v=x.length;M<v;M+=3){const w=x[M+0],E=x[M+1],R=x[M+2];f.push(w,E,E,R,R,w)}}else if(g!==void 0){const x=g.array;_=g.version;for(let M=0,v=x.length/3-1;M<v;M+=3){const w=M+0,E=M+1,R=M+2;f.push(w,E,E,R,R,w)}}else return;const p=new(Du(f)?Ou:Fu)(f,1);p.version=_;const m=o.get(u);m&&t.remove(m),o.set(u,p)}function h(u){const f=o.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return o.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function r_(n,t,e){let i;function s(f){i=f}let o,r;function a(f){o=f.type,r=f.bytesPerElement}function c(f,d){n.drawElements(i,d,o,f*r),e.update(d,i,1)}function l(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,o,f*r,g),e.update(d,i,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,o,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,i,1)}function u(f,d,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/r,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(i,d,0,o,f,0,_,0,g);let m=0;for(let x=0;x<g;x++)m+=d[x]*_[x];e.update(m,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function a_(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,r,a){switch(e.calls++,r){case n.TRIANGLES:e.triangles+=a*(o/3);break;case n.LINES:e.lines+=a*(o/2);break;case n.LINE_STRIP:e.lines+=a*(o-1);break;case n.LINE_LOOP:e.lines+=a*o;break;case n.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function c_(n,t,e){const i=new WeakMap,s=new Ne;function o(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let b=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",b)};var d=b;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),p===!0&&(v=3);let w=a.attributes.position.count*v,E=1;w>t.maxTextureSize&&(E=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const R=new Float32Array(w*E*4*u),A=new Uu(R,w,E,u);A.type=Hn,A.needsUpdate=!0;const y=v*4;for(let D=0;D<u;D++){const V=m[D],G=x[D],Y=M[D],C=w*E*4*D;for(let N=0;N<V.count;N++){const z=N*y;g===!0&&(s.fromBufferAttribute(V,N),R[C+z+0]=s.x,R[C+z+1]=s.y,R[C+z+2]=s.z,R[C+z+3]=0),_===!0&&(s.fromBufferAttribute(G,N),R[C+z+4]=s.x,R[C+z+5]=s.y,R[C+z+6]=s.z,R[C+z+7]=0),p===!0&&(s.fromBufferAttribute(Y,N),R[C+z+8]=s.x,R[C+z+9]=s.y,R[C+z+10]=s.z,R[C+z+11]=Y.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new it(w,E)},i.set(a,f),a.addEventListener("dispose",b)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",r.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:o}}function l_(n,t,e,i){let s=new WeakMap;function o(c){const l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function r(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}const rf=new Qe,Th=new Yu(1,1),af=new Uu,cf=new Kd,lf=new Gu,Ah=[],Rh=[],Ch=new Float32Array(16),Ph=new Float32Array(9),Ih=new Float32Array(4);function Zs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let o=Ah[s];if(o===void 0&&(o=new Float32Array(s),Ah[s]=o),t!==0){i.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,n[r].toArray(o,a)}return o}function He(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ve(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Qr(n,t){let e=Rh[t];e===void 0&&(e=new Int32Array(t),Rh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function h_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function u_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2fv(this.addr,t),Ve(e,t)}}function f_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;n.uniform3fv(this.addr,t),Ve(e,t)}}function d_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4fv(this.addr,t),Ve(e,t)}}function p_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;Ih.set(i),n.uniformMatrix2fv(this.addr,!1,Ih),Ve(e,i)}}function m_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;Ph.set(i),n.uniformMatrix3fv(this.addr,!1,Ph),Ve(e,i)}}function g_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;Ch.set(i),n.uniformMatrix4fv(this.addr,!1,Ch),Ve(e,i)}}function __(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function x_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2iv(this.addr,t),Ve(e,t)}}function v_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3iv(this.addr,t),Ve(e,t)}}function M_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4iv(this.addr,t),Ve(e,t)}}function b_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function y_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2uiv(this.addr,t),Ve(e,t)}}function w_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3uiv(this.addr,t),Ve(e,t)}}function S_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4uiv(this.addr,t),Ve(e,t)}}function E_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let o;this.type===n.SAMPLER_2D_SHADOW?(Th.compareFunction=Lu,o=Th):o=rf,e.setTexture2D(t||o,s)}function T_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||cf,s)}function A_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||lf,s)}function R_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||af,s)}function C_(n){switch(n){case 5126:return h_;case 35664:return u_;case 35665:return f_;case 35666:return d_;case 35674:return p_;case 35675:return m_;case 35676:return g_;case 5124:case 35670:return __;case 35667:case 35671:return x_;case 35668:case 35672:return v_;case 35669:case 35673:return M_;case 5125:return b_;case 36294:return y_;case 36295:return w_;case 36296:return S_;case 35678:case 36198:case 36298:case 36306:case 35682:return E_;case 35679:case 36299:case 36307:return T_;case 35680:case 36300:case 36308:case 36293:return A_;case 36289:case 36303:case 36311:case 36292:return R_}}function P_(n,t){n.uniform1fv(this.addr,t)}function I_(n,t){const e=Zs(t,this.size,2);n.uniform2fv(this.addr,e)}function L_(n,t){const e=Zs(t,this.size,3);n.uniform3fv(this.addr,e)}function D_(n,t){const e=Zs(t,this.size,4);n.uniform4fv(this.addr,e)}function U_(n,t){const e=Zs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function N_(n,t){const e=Zs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function F_(n,t){const e=Zs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function O_(n,t){n.uniform1iv(this.addr,t)}function z_(n,t){n.uniform2iv(this.addr,t)}function B_(n,t){n.uniform3iv(this.addr,t)}function G_(n,t){n.uniform4iv(this.addr,t)}function H_(n,t){n.uniform1uiv(this.addr,t)}function V_(n,t){n.uniform2uiv(this.addr,t)}function W_(n,t){n.uniform3uiv(this.addr,t)}function k_(n,t){n.uniform4uiv(this.addr,t)}function X_(n,t,e){const i=this.cache,s=t.length,o=Qr(e,s);He(i,o)||(n.uniform1iv(this.addr,o),Ve(i,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||rf,o[r])}function Y_(n,t,e){const i=this.cache,s=t.length,o=Qr(e,s);He(i,o)||(n.uniform1iv(this.addr,o),Ve(i,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||cf,o[r])}function Z_(n,t,e){const i=this.cache,s=t.length,o=Qr(e,s);He(i,o)||(n.uniform1iv(this.addr,o),Ve(i,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||lf,o[r])}function q_(n,t,e){const i=this.cache,s=t.length,o=Qr(e,s);He(i,o)||(n.uniform1iv(this.addr,o),Ve(i,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||af,o[r])}function j_(n){switch(n){case 5126:return P_;case 35664:return I_;case 35665:return L_;case 35666:return D_;case 35674:return U_;case 35675:return N_;case 35676:return F_;case 5124:case 35670:return O_;case 35667:case 35671:return z_;case 35668:case 35672:return B_;case 35669:case 35673:return G_;case 5125:return H_;case 36294:return V_;case 36295:return W_;case 36296:return k_;case 35678:case 36198:case 36298:case 36306:case 35682:return X_;case 35679:case 36299:case 36307:return Y_;case 35680:case 36300:case 36308:case 36293:return Z_;case 36289:case 36303:case 36311:case 36292:return q_}}class $_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=C_(e.type)}}class K_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=j_(e.type)}}class J_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],i)}}}const za=/(\w+)(\])?(\[|\.)?/g;function Lh(n,t){n.seq.push(t),n.map[t.id]=t}function Q_(n,t,e){const i=n.name,s=i.length;for(za.lastIndex=0;;){const o=za.exec(i),r=za.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===s){Lh(e,l===void 0?new $_(a,n,t):new K_(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new J_(a),Lh(e,u)),e=u}}}class Ur{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);Q_(o,r,this)}}setValue(t,e,i,s){const o=this.map[e];o!==void 0&&o.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&i.push(r)}return i}}function Dh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const t1=37297;let e1=0;function n1(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;i.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return i.join(`
`)}const Uh=new ie;function i1(n){ge._getMatrix(Uh,ge.workingColorSpace,n);const t=`mat3( ${Uh.elements.map(e=>e.toFixed(4))} )`;switch(ge.getTransfer(n)){case Fr:return[t,"LinearTransferOETF"];case Te:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Nh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+n1(n.getShaderSource(t),r)}else return s}function s1(n,t){const e=i1(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function o1(n,t){let e;switch(t){case hd:e="Linear";break;case ud:e="Reinhard";break;case fd:e="Cineon";break;case Mu:e="ACESFilmic";break;case pd:e="AgX";break;case md:e="Neutral";break;case dd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const xr=new U;function r1(){ge.getLuminanceCoefficients(xr);const n=xr.x.toFixed(4),t=xr.y.toFixed(4),e=xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function a1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ho).join(`
`)}function c1(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function l1(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const o=n.getActiveAttrib(t,s),r=o.name;let a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:n.getAttribLocation(t,r),locationSize:a}}return e}function ho(n){return n!==""}function Fh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Oh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const h1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vc(n){return n.replace(h1,f1)}const u1=new Map;function f1(n,t){let e=se[t];if(e===void 0){const i=u1.get(t);if(i!==void 0)e=se[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Vc(e)}const d1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zh(n){return n.replace(d1,p1)}function p1(n,t,e,i){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Bh(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function m1(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Yc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Wf?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ni&&(t="SHADOWMAP_TYPE_VSM"),t}function g1(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case zs:case Bs:t="ENVMAP_TYPE_CUBE";break;case jr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _1(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Bs:t="ENVMAP_MODE_REFRACTION";break}return t}function x1(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Zc:t="ENVMAP_BLENDING_MULTIPLY";break;case cd:t="ENVMAP_BLENDING_MIX";break;case ld:t="ENVMAP_BLENDING_ADD";break}return t}function v1(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function M1(n,t,e,i){const s=n.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=m1(e),l=g1(e),h=_1(e),u=x1(e),f=v1(e),d=a1(e),g=c1(o),_=s.createProgram();let p,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ho).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ho).join(`
`),m.length>0&&(m+=`
`)):(p=[Bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ho).join(`
`),m=[Bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ti?"#define TONE_MAPPING":"",e.toneMapping!==Ti?se.tonemapping_pars_fragment:"",e.toneMapping!==Ti?o1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,s1("linearToOutputTexel",e.outputColorSpace),r1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ho).join(`
`)),r=Vc(r),r=Fh(r,e),r=Oh(r,e),a=Vc(a),a=Fh(a,e),a=Oh(a,e),r=zh(r),a=zh(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=x+p+r,v=x+m+a,w=Dh(s,s.VERTEX_SHADER,M),E=Dh(s,s.FRAGMENT_SHADER,v);s.attachShader(_,w),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(D){if(n.debug.checkShaderErrors){const V=s.getProgramInfoLog(_).trim(),G=s.getShaderInfoLog(w).trim(),Y=s.getShaderInfoLog(E).trim();let C=!0,N=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(C=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,w,E);else{const z=Nh(s,w,"vertex"),I=Nh(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+V+`
`+z+`
`+I)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(G===""||Y==="")&&(N=!1);N&&(D.diagnostics={runnable:C,programLog:V,vertexShader:{log:G,prefix:p},fragmentShader:{log:Y,prefix:m}})}s.deleteShader(w),s.deleteShader(E),A=new Ur(s,_),y=l1(s,_)}let A;this.getUniforms=function(){return A===void 0&&R(this),A};let y;this.getAttributes=function(){return y===void 0&&R(this),y};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,t1)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=e1++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=E,this}let b1=0;class y1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new w1(t),e.set(t,i)),i}}class w1{constructor(t){this.id=b1++,this.code=t,this.usedTimes=0}}function S1(n,t,e,i,s,o,r){const a=new il,c=new y1,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function p(y,b,D,V,G){const Y=V.fog,C=G.geometry,N=y.isMeshStandardMaterial?V.environment:null,z=(y.isMeshStandardMaterial?e:t).get(y.envMap||N),I=z&&z.mapping===jr?z.image.height:null,k=g[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const Q=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,st=Q!==void 0?Q.length:0;let bt=0;C.morphAttributes.position!==void 0&&(bt=1),C.morphAttributes.normal!==void 0&&(bt=2),C.morphAttributes.color!==void 0&&(bt=3);let Wt,$,ot,ut;if(k){const we=Gn[k];Wt=we.vertexShader,$=we.fragmentShader}else Wt=y.vertexShader,$=y.fragmentShader,c.update(y),ot=c.getVertexShaderID(y),ut=c.getFragmentShaderID(y);const ft=n.getRenderTarget(),Ut=n.state.buffers.depth.getReversed(),ce=G.isInstancedMesh===!0,pt=G.isBatchedMesh===!0,ve=!!y.map,ue=!!y.matcap,B=!!z,L=!!y.aoMap,Ot=!!y.lightMap,wt=!!y.bumpMap,Ht=!!y.normalMap,_t=!!y.displacementMap,Nt=!!y.emissiveMap,xt=!!y.metalnessMap,P=!!y.roughnessMap,S=y.anisotropy>0,O=y.clearcoat>0,K=y.dispersion>0,tt=y.iridescence>0,et=y.sheen>0,It=y.transmission>0,mt=S&&!!y.anisotropyMap,St=O&&!!y.clearcoatMap,Kt=O&&!!y.clearcoatNormalMap,at=O&&!!y.clearcoatRoughnessMap,yt=tt&&!!y.iridescenceMap,Xt=tt&&!!y.iridescenceThicknessMap,zt=et&&!!y.sheenColorMap,Rt=et&&!!y.sheenRoughnessMap,ae=!!y.specularMap,Jt=!!y.specularColorMap,Re=!!y.specularIntensityMap,H=It&&!!y.transmissionMap,vt=It&&!!y.thicknessMap,J=!!y.gradientMap,nt=!!y.alphaMap,Tt=y.alphaTest>0,Et=!!y.alphaHash,ne=!!y.extensions;let De=Ti;y.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(De=n.toneMapping);const Ye={shaderID:k,shaderType:y.type,shaderName:y.name,vertexShader:Wt,fragmentShader:$,defines:y.defines,customVertexShaderID:ot,customFragmentShaderID:ut,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:pt,batchingColor:pt&&G._colorsTexture!==null,instancing:ce,instancingColor:ce&&G.instanceColor!==null,instancingMorph:ce&&G.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ft===null?n.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:Vs,alphaToCoverage:!!y.alphaToCoverage,map:ve,matcap:ue,envMap:B,envMapMode:B&&z.mapping,envMapCubeUVHeight:I,aoMap:L,lightMap:Ot,bumpMap:wt,normalMap:Ht,displacementMap:f&&_t,emissiveMap:Nt,normalMapObjectSpace:Ht&&y.normalMapType===xd,normalMapTangentSpace:Ht&&y.normalMapType===$r,metalnessMap:xt,roughnessMap:P,anisotropy:S,anisotropyMap:mt,clearcoat:O,clearcoatMap:St,clearcoatNormalMap:Kt,clearcoatRoughnessMap:at,dispersion:K,iridescence:tt,iridescenceMap:yt,iridescenceThicknessMap:Xt,sheen:et,sheenColorMap:zt,sheenRoughnessMap:Rt,specularMap:ae,specularColorMap:Jt,specularIntensityMap:Re,transmission:It,transmissionMap:H,thicknessMap:vt,gradientMap:J,opaque:y.transparent===!1&&y.blending===Ls&&y.alphaToCoverage===!1,alphaMap:nt,alphaTest:Tt,alphaHash:Et,combine:y.combine,mapUv:ve&&_(y.map.channel),aoMapUv:L&&_(y.aoMap.channel),lightMapUv:Ot&&_(y.lightMap.channel),bumpMapUv:wt&&_(y.bumpMap.channel),normalMapUv:Ht&&_(y.normalMap.channel),displacementMapUv:_t&&_(y.displacementMap.channel),emissiveMapUv:Nt&&_(y.emissiveMap.channel),metalnessMapUv:xt&&_(y.metalnessMap.channel),roughnessMapUv:P&&_(y.roughnessMap.channel),anisotropyMapUv:mt&&_(y.anisotropyMap.channel),clearcoatMapUv:St&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Xt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(y.sheenRoughnessMap.channel),specularMapUv:ae&&_(y.specularMap.channel),specularColorMapUv:Jt&&_(y.specularColorMap.channel),specularIntensityMapUv:Re&&_(y.specularIntensityMap.channel),transmissionMapUv:H&&_(y.transmissionMap.channel),thicknessMapUv:vt&&_(y.thicknessMap.channel),alphaMapUv:nt&&_(y.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(Ht||S),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!C.attributes.uv&&(ve||nt),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ut,skinning:G.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:bt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:De,decodeVideoTexture:ve&&y.map.isVideoTexture===!0&&ge.getTransfer(y.map.colorSpace)===Te,decodeVideoTextureEmissive:Nt&&y.emissiveMap.isVideoTexture===!0&&ge.getTransfer(y.emissiveMap.colorSpace)===Te,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Sn,flipSided:y.side===Ke,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ne&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&y.extensions.multiDraw===!0||pt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ye.vertexUv1s=l.has(1),Ye.vertexUv2s=l.has(2),Ye.vertexUv3s=l.has(3),l.clear(),Ye}function m(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)b.push(D),b.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(x(b,y),M(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function x(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function M(y,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const b=g[y.type];let D;if(b){const V=Gn[b];D=hp.clone(V.uniforms)}else D=y.uniforms;return D}function w(y,b){let D;for(let V=0,G=h.length;V<G;V++){const Y=h[V];if(Y.cacheKey===b){D=Y,++D.usedTimes;break}}return D===void 0&&(D=new M1(n,b,y,o),h.push(D)),D}function E(y){if(--y.usedTimes===0){const b=h.indexOf(y);h[b]=h[h.length-1],h.pop(),y.destroy()}}function R(y){c.remove(y)}function A(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:v,acquireProgram:w,releaseProgram:E,releaseShaderCache:R,programs:h,dispose:A}}function E1(){let n=new WeakMap;function t(r){return n.has(r)}function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function i(r){n.delete(r)}function s(r,a,c){n.get(r)[a]=c}function o(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:o}}function T1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Gh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Hh(){const n=[];let t=0;const e=[],i=[],s=[];function o(){t=0,e.length=0,i.length=0,s.length=0}function r(u,f,d,g,_,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function a(u,f,d,g,_,p){const m=r(u,f,d,g,_,p);d.transmission>0?i.push(m):d.transparent===!0?s.push(m):e.push(m)}function c(u,f,d,g,_,p){const m=r(u,f,d,g,_,p);d.transmission>0?i.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,f){e.length>1&&e.sort(u||T1),i.length>1&&i.sort(f||Gh),s.length>1&&s.sort(f||Gh)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:o,push:a,unshift:c,finish:h,sort:l}}function A1(){let n=new WeakMap;function t(i,s){const o=n.get(i);let r;return o===void 0?(r=new Hh,n.set(i,[r])):s>=o.length?(r=new Hh,o.push(r)):r=o[s],r}function e(){n=new WeakMap}return{get:t,dispose:e}}function R1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new rt};break;case"SpotLight":e={position:new U,direction:new U,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":e={color:new rt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function C1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let P1=0;function I1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function L1(n){const t=new R1,e=C1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const s=new U,o=new ee,r=new ee;function a(l){let h=0,u=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,x=0,M=0,v=0,w=0,E=0,R=0;l.sort(I1);for(let y=0,b=l.length;y<b;y++){const D=l[y],V=D.color,G=D.intensity,Y=D.distance,C=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=V.r*G,u+=V.g*G,f+=V.b*G;else if(D.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(D.sh.coefficients[N],G);R++}else if(D.isDirectionalLight){const N=t.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const z=D.shadow,I=e.get(D);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,i.directionalShadow[d]=I,i.directionalShadowMap[d]=C,i.directionalShadowMatrix[d]=D.shadow.matrix,x++}i.directional[d]=N,d++}else if(D.isSpotLight){const N=t.get(D);N.position.setFromMatrixPosition(D.matrixWorld),N.color.copy(V).multiplyScalar(G),N.distance=Y,N.coneCos=Math.cos(D.angle),N.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),N.decay=D.decay,i.spot[_]=N;const z=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,z.updateMatrices(D),D.castShadow&&E++),i.spotLightMatrix[_]=z.matrix,D.castShadow){const I=e.get(D);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,i.spotShadow[_]=I,i.spotShadowMap[_]=C,v++}_++}else if(D.isRectAreaLight){const N=t.get(D);N.color.copy(V).multiplyScalar(G),N.halfWidth.set(D.width*.5,0,0),N.halfHeight.set(0,D.height*.5,0),i.rectArea[p]=N,p++}else if(D.isPointLight){const N=t.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),N.distance=D.distance,N.decay=D.decay,D.castShadow){const z=D.shadow,I=e.get(D);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,I.shadowCameraNear=z.camera.near,I.shadowCameraFar=z.camera.far,i.pointShadow[g]=I,i.pointShadowMap[g]=C,i.pointShadowMatrix[g]=D.shadow.matrix,M++}i.point[g]=N,g++}else if(D.isHemisphereLight){const N=t.get(D);N.skyColor.copy(D.color).multiplyScalar(G),N.groundColor.copy(D.groundColor).multiplyScalar(G),i.hemi[m]=N,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=gt.LTC_FLOAT_1,i.rectAreaLTC2=gt.LTC_FLOAT_2):(i.rectAreaLTC1=gt.LTC_HALF_1,i.rectAreaLTC2=gt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const A=i.hash;(A.directionalLength!==d||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==p||A.hemiLength!==m||A.numDirectionalShadows!==x||A.numPointShadows!==M||A.numSpotShadows!==v||A.numSpotMaps!==w||A.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=v+w-E,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,A.directionalLength=d,A.pointLength=g,A.spotLength=_,A.rectAreaLength=p,A.hemiLength=m,A.numDirectionalShadows=x,A.numPointShadows=M,A.numSpotShadows=v,A.numSpotMaps=w,A.numLightProbes=R,i.version=P1++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const M=l[m];if(M.isDirectionalLight){const v=i.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),u++}else if(M.isSpotLight){const v=i.spot[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),d++}else if(M.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),r.identity(),o.copy(M.matrixWorld),o.premultiply(p),r.extractRotation(o),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(r),v.halfHeight.applyMatrix4(r),g++}else if(M.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:i}}function Vh(n){const t=new L1(n),e=[],i=[];function s(h){l.camera=h,e.length=0,i.length=0}function o(h){e.push(h)}function r(h){i.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function D1(n){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new Vh(n),t.set(s,[a])):o>=r.length?(a=new Vh(n),r.push(a)):a=r[o],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const U1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N1=`uniform sampler2D shadow_pass;
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
}`;function F1(n,t,e){let i=new Xs;const s=new it,o=new it,r=new Ne,a=new nf({depthPacking:Iu}),c=new n0,l={},h=e.maxTextureSize,u={[ri]:Ke,[Ke]:ri,[Sn]:Sn},f=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:U1,fragmentShader:N1}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new ye;g.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ht(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yc;let m=this.type;this.render=function(E,R,A){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;const y=n.getRenderTarget(),b=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),V=n.state;V.setBlending(Ei),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const G=m!==ni&&this.type===ni,Y=m===ni&&this.type!==ni;for(let C=0,N=E.length;C<N;C++){const z=E[C],I=z.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;s.copy(I.mapSize);const k=I.getFrameExtents();if(s.multiply(k),o.copy(I.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(o.x=Math.floor(h/k.x),s.x=o.x*k.x,I.mapSize.x=o.x),s.y>h&&(o.y=Math.floor(h/k.y),s.y=o.y*k.y,I.mapSize.y=o.y)),I.map===null||G===!0||Y===!0){const st=this.type!==ni?{minFilter:Je,magFilter:Je}:{};I.map!==null&&I.map.dispose(),I.map=new Ji(s.x,s.y,st),I.map.texture.name=z.name+".shadowMap",I.camera.updateProjectionMatrix()}n.setRenderTarget(I.map),n.clear();const Q=I.getViewportCount();for(let st=0;st<Q;st++){const bt=I.getViewport(st);r.set(o.x*bt.x,o.y*bt.y,o.x*bt.z,o.y*bt.w),V.viewport(r),I.updateMatrices(z,st),i=I.getFrustum(),v(R,A,I.camera,z,this.type)}I.isPointLightShadow!==!0&&this.type===ni&&x(I,A),I.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(y,b,D)};function x(E,R){const A=t.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ji(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(R,null,A,f,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(R,null,A,d,_,null)}function M(E,R,A,y){let b=null;const D=A.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)b=D;else if(b=A.isPointLight===!0?c:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const V=b.uuid,G=R.uuid;let Y=l[V];Y===void 0&&(Y={},l[V]=Y);let C=Y[G];C===void 0&&(C=b.clone(),Y[G]=C,R.addEventListener("dispose",w)),b=C}if(b.visible=R.visible,b.wireframe=R.wireframe,y===ni?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,A.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const V=n.properties.get(b);V.light=A}return b}function v(E,R,A,y,b){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&b===ni)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,E.matrixWorld);const G=t.update(E),Y=E.material;if(Array.isArray(Y)){const C=G.groups;for(let N=0,z=C.length;N<z;N++){const I=C[N],k=Y[I.materialIndex];if(k&&k.visible){const Q=M(E,k,y,b);E.onBeforeShadow(n,E,R,A,G,Q,I),n.renderBufferDirect(A,null,G,Q,E,I),E.onAfterShadow(n,E,R,A,G,Q,I)}}}else if(Y.visible){const C=M(E,Y,y,b);E.onBeforeShadow(n,E,R,A,G,C,null),n.renderBufferDirect(A,null,G,C,E,null),E.onAfterShadow(n,E,R,A,G,C,null)}}const V=E.children;for(let G=0,Y=V.length;G<Y;G++)v(V[G],R,A,y,b)}function w(E){E.target.removeEventListener("dispose",w);for(const A in l){const y=l[A],b=E.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const O1={[tc]:ec,[nc]:oc,[ic]:rc,[Os]:sc,[ec]:tc,[oc]:nc,[rc]:ic,[sc]:Os};function z1(n,t){function e(){let H=!1;const vt=new Ne;let J=null;const nt=new Ne(0,0,0,0);return{setMask:function(Tt){J!==Tt&&!H&&(n.colorMask(Tt,Tt,Tt,Tt),J=Tt)},setLocked:function(Tt){H=Tt},setClear:function(Tt,Et,ne,De,Ye){Ye===!0&&(Tt*=De,Et*=De,ne*=De),vt.set(Tt,Et,ne,De),nt.equals(vt)===!1&&(n.clearColor(Tt,Et,ne,De),nt.copy(vt))},reset:function(){H=!1,J=null,nt.set(-1,0,0,0)}}}function i(){let H=!1,vt=!1,J=null,nt=null,Tt=null;return{setReversed:function(Et){if(vt!==Et){const ne=t.get("EXT_clip_control");vt?ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.ZERO_TO_ONE_EXT):ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.NEGATIVE_ONE_TO_ONE_EXT);const De=Tt;Tt=null,this.setClear(De)}vt=Et},getReversed:function(){return vt},setTest:function(Et){Et?ft(n.DEPTH_TEST):Ut(n.DEPTH_TEST)},setMask:function(Et){J!==Et&&!H&&(n.depthMask(Et),J=Et)},setFunc:function(Et){if(vt&&(Et=O1[Et]),nt!==Et){switch(Et){case tc:n.depthFunc(n.NEVER);break;case ec:n.depthFunc(n.ALWAYS);break;case nc:n.depthFunc(n.LESS);break;case Os:n.depthFunc(n.LEQUAL);break;case ic:n.depthFunc(n.EQUAL);break;case sc:n.depthFunc(n.GEQUAL);break;case oc:n.depthFunc(n.GREATER);break;case rc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}nt=Et}},setLocked:function(Et){H=Et},setClear:function(Et){Tt!==Et&&(vt&&(Et=1-Et),n.clearDepth(Et),Tt=Et)},reset:function(){H=!1,J=null,nt=null,Tt=null,vt=!1}}}function s(){let H=!1,vt=null,J=null,nt=null,Tt=null,Et=null,ne=null,De=null,Ye=null;return{setTest:function(we){H||(we?ft(n.STENCIL_TEST):Ut(n.STENCIL_TEST))},setMask:function(we){vt!==we&&!H&&(n.stencilMask(we),vt=we)},setFunc:function(we,Rn,$n){(J!==we||nt!==Rn||Tt!==$n)&&(n.stencilFunc(we,Rn,$n),J=we,nt=Rn,Tt=$n)},setOp:function(we,Rn,$n){(Et!==we||ne!==Rn||De!==$n)&&(n.stencilOp(we,Rn,$n),Et=we,ne=Rn,De=$n)},setLocked:function(we){H=we},setClear:function(we){Ye!==we&&(n.clearStencil(we),Ye=we)},reset:function(){H=!1,vt=null,J=null,nt=null,Tt=null,Et=null,ne=null,De=null,Ye=null}}}const o=new e,r=new i,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,p=null,m=null,x=null,M=null,v=null,w=null,E=null,R=new rt(0,0,0),A=0,y=!1,b=null,D=null,V=null,G=null,Y=null;const C=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,z=0;const I=n.getParameter(n.VERSION);I.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(I)[1]),N=z>=1):I.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),N=z>=2);let k=null,Q={};const st=n.getParameter(n.SCISSOR_BOX),bt=n.getParameter(n.VIEWPORT),Wt=new Ne().fromArray(st),$=new Ne().fromArray(bt);function ot(H,vt,J,nt){const Tt=new Uint8Array(4),Et=n.createTexture();n.bindTexture(H,Et),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ne=0;ne<J;ne++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(vt,0,n.RGBA,1,1,nt,0,n.RGBA,n.UNSIGNED_BYTE,Tt):n.texImage2D(vt+ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Tt);return Et}const ut={};ut[n.TEXTURE_2D]=ot(n.TEXTURE_2D,n.TEXTURE_2D,1),ut[n.TEXTURE_CUBE_MAP]=ot(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ut[n.TEXTURE_2D_ARRAY]=ot(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ut[n.TEXTURE_3D]=ot(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ft(n.DEPTH_TEST),r.setFunc(Os),wt(!1),Ht(Cl),ft(n.CULL_FACE),L(Ei);function ft(H){h[H]!==!0&&(n.enable(H),h[H]=!0)}function Ut(H){h[H]!==!1&&(n.disable(H),h[H]=!1)}function ce(H,vt){return u[H]!==vt?(n.bindFramebuffer(H,vt),u[H]=vt,H===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=vt),H===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=vt),!0):!1}function pt(H,vt){let J=d,nt=!1;if(H){J=f.get(vt),J===void 0&&(J=[],f.set(vt,J));const Tt=H.textures;if(J.length!==Tt.length||J[0]!==n.COLOR_ATTACHMENT0){for(let Et=0,ne=Tt.length;Et<ne;Et++)J[Et]=n.COLOR_ATTACHMENT0+Et;J.length=Tt.length,nt=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,nt=!0);nt&&n.drawBuffers(J)}function ve(H){return g!==H?(n.useProgram(H),g=H,!0):!1}const ue={[Wi]:n.FUNC_ADD,[Xf]:n.FUNC_SUBTRACT,[Yf]:n.FUNC_REVERSE_SUBTRACT};ue[Zf]=n.MIN,ue[qf]=n.MAX;const B={[jf]:n.ZERO,[$f]:n.ONE,[Kf]:n.SRC_COLOR,[Ja]:n.SRC_ALPHA,[id]:n.SRC_ALPHA_SATURATE,[ed]:n.DST_COLOR,[Qf]:n.DST_ALPHA,[Jf]:n.ONE_MINUS_SRC_COLOR,[Qa]:n.ONE_MINUS_SRC_ALPHA,[nd]:n.ONE_MINUS_DST_COLOR,[td]:n.ONE_MINUS_DST_ALPHA,[sd]:n.CONSTANT_COLOR,[od]:n.ONE_MINUS_CONSTANT_COLOR,[rd]:n.CONSTANT_ALPHA,[ad]:n.ONE_MINUS_CONSTANT_ALPHA};function L(H,vt,J,nt,Tt,Et,ne,De,Ye,we){if(H===Ei){_===!0&&(Ut(n.BLEND),_=!1);return}if(_===!1&&(ft(n.BLEND),_=!0),H!==kf){if(H!==p||we!==y){if((m!==Wi||v!==Wi)&&(n.blendEquation(n.FUNC_ADD),m=Wi,v=Wi),we)switch(H){case Ls:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pl:n.blendFunc(n.ONE,n.ONE);break;case Il:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ll:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Ls:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Il:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ll:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}x=null,M=null,w=null,E=null,R.set(0,0,0),A=0,p=H,y=we}return}Tt=Tt||vt,Et=Et||J,ne=ne||nt,(vt!==m||Tt!==v)&&(n.blendEquationSeparate(ue[vt],ue[Tt]),m=vt,v=Tt),(J!==x||nt!==M||Et!==w||ne!==E)&&(n.blendFuncSeparate(B[J],B[nt],B[Et],B[ne]),x=J,M=nt,w=Et,E=ne),(De.equals(R)===!1||Ye!==A)&&(n.blendColor(De.r,De.g,De.b,Ye),R.copy(De),A=Ye),p=H,y=!1}function Ot(H,vt){H.side===Sn?Ut(n.CULL_FACE):ft(n.CULL_FACE);let J=H.side===Ke;vt&&(J=!J),wt(J),H.blending===Ls&&H.transparent===!1?L(Ei):L(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),r.setFunc(H.depthFunc),r.setTest(H.depthTest),r.setMask(H.depthWrite),o.setMask(H.colorWrite);const nt=H.stencilWrite;a.setTest(nt),nt&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Nt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ft(n.SAMPLE_ALPHA_TO_COVERAGE):Ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function wt(H){b!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),b=H)}function Ht(H){H!==Hf?(ft(n.CULL_FACE),H!==D&&(H===Cl?n.cullFace(n.BACK):H===Vf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ut(n.CULL_FACE),D=H}function _t(H){H!==V&&(N&&n.lineWidth(H),V=H)}function Nt(H,vt,J){H?(ft(n.POLYGON_OFFSET_FILL),(G!==vt||Y!==J)&&(n.polygonOffset(vt,J),G=vt,Y=J)):Ut(n.POLYGON_OFFSET_FILL)}function xt(H){H?ft(n.SCISSOR_TEST):Ut(n.SCISSOR_TEST)}function P(H){H===void 0&&(H=n.TEXTURE0+C-1),k!==H&&(n.activeTexture(H),k=H)}function S(H,vt,J){J===void 0&&(k===null?J=n.TEXTURE0+C-1:J=k);let nt=Q[J];nt===void 0&&(nt={type:void 0,texture:void 0},Q[J]=nt),(nt.type!==H||nt.texture!==vt)&&(k!==J&&(n.activeTexture(J),k=J),n.bindTexture(H,vt||ut[H]),nt.type=H,nt.texture=vt)}function O(){const H=Q[k];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function K(){try{n.compressedTexImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function tt(){try{n.compressedTexImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function et(){try{n.texSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function It(){try{n.texSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function mt(){try{n.compressedTexSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function St(){try{n.compressedTexSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Kt(){try{n.texStorage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function at(){try{n.texStorage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function yt(){try{n.texImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Xt(){try{n.texImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function zt(H){Wt.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Wt.copy(H))}function Rt(H){$.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),$.copy(H))}function ae(H,vt){let J=l.get(vt);J===void 0&&(J=new WeakMap,l.set(vt,J));let nt=J.get(H);nt===void 0&&(nt=n.getUniformBlockIndex(vt,H.name),J.set(H,nt))}function Jt(H,vt){const nt=l.get(vt).get(H);c.get(vt)!==nt&&(n.uniformBlockBinding(vt,nt,H.__bindingPointIndex),c.set(vt,nt))}function Re(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},k=null,Q={},u={},f=new WeakMap,d=[],g=null,_=!1,p=null,m=null,x=null,M=null,v=null,w=null,E=null,R=new rt(0,0,0),A=0,y=!1,b=null,D=null,V=null,G=null,Y=null,Wt.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:ft,disable:Ut,bindFramebuffer:ce,drawBuffers:pt,useProgram:ve,setBlending:L,setMaterial:Ot,setFlipSided:wt,setCullFace:Ht,setLineWidth:_t,setPolygonOffset:Nt,setScissorTest:xt,activeTexture:P,bindTexture:S,unbindTexture:O,compressedTexImage2D:K,compressedTexImage3D:tt,texImage2D:yt,texImage3D:Xt,updateUBOMapping:ae,uniformBlockBinding:Jt,texStorage2D:Kt,texStorage3D:at,texSubImage2D:et,texSubImage3D:It,compressedTexSubImage2D:mt,compressedTexSubImage3D:St,scissor:zt,viewport:Rt,reset:Re}}function B1(n,t,e,i,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new it,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return d?new OffscreenCanvas(P,S):zr("canvas")}function _(P,S,O){let K=1;const tt=xt(P);if((tt.width>O||tt.height>O)&&(K=O/Math.max(tt.width,tt.height)),K<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const et=Math.floor(K*tt.width),It=Math.floor(K*tt.height);u===void 0&&(u=g(et,It));const mt=S?g(et,It):u;return mt.width=et,mt.height=It,mt.getContext("2d").drawImage(P,0,0,et,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+et+"x"+It+")."),mt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),P;return P}function p(P){return P.generateMipmaps}function m(P){n.generateMipmap(P)}function x(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(P,S,O,K,tt=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let et=S;if(S===n.RED&&(O===n.FLOAT&&(et=n.R32F),O===n.HALF_FLOAT&&(et=n.R16F),O===n.UNSIGNED_BYTE&&(et=n.R8)),S===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(et=n.R8UI),O===n.UNSIGNED_SHORT&&(et=n.R16UI),O===n.UNSIGNED_INT&&(et=n.R32UI),O===n.BYTE&&(et=n.R8I),O===n.SHORT&&(et=n.R16I),O===n.INT&&(et=n.R32I)),S===n.RG&&(O===n.FLOAT&&(et=n.RG32F),O===n.HALF_FLOAT&&(et=n.RG16F),O===n.UNSIGNED_BYTE&&(et=n.RG8)),S===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(et=n.RG8UI),O===n.UNSIGNED_SHORT&&(et=n.RG16UI),O===n.UNSIGNED_INT&&(et=n.RG32UI),O===n.BYTE&&(et=n.RG8I),O===n.SHORT&&(et=n.RG16I),O===n.INT&&(et=n.RG32I)),S===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(et=n.RGB8UI),O===n.UNSIGNED_SHORT&&(et=n.RGB16UI),O===n.UNSIGNED_INT&&(et=n.RGB32UI),O===n.BYTE&&(et=n.RGB8I),O===n.SHORT&&(et=n.RGB16I),O===n.INT&&(et=n.RGB32I)),S===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(et=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(et=n.RGBA16UI),O===n.UNSIGNED_INT&&(et=n.RGBA32UI),O===n.BYTE&&(et=n.RGBA8I),O===n.SHORT&&(et=n.RGBA16I),O===n.INT&&(et=n.RGBA32I)),S===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(et=n.RGB9_E5),S===n.RGBA){const It=tt?Fr:ge.getTransfer(K);O===n.FLOAT&&(et=n.RGBA32F),O===n.HALF_FLOAT&&(et=n.RGBA16F),O===n.UNSIGNED_BYTE&&(et=It===Te?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(et=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(et=n.RGB5_A1)}return(et===n.R16F||et===n.R32F||et===n.RG16F||et===n.RG32F||et===n.RGBA16F||et===n.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function v(P,S){let O;return P?S===null||S===Ki||S===Gs?O=n.DEPTH24_STENCIL8:S===Hn?O=n.DEPTH32F_STENCIL8:S===Mo&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ki||S===Gs?O=n.DEPTH_COMPONENT24:S===Hn?O=n.DEPTH_COMPONENT32F:S===Mo&&(O=n.DEPTH_COMPONENT16),O}function w(P,S){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Je&&P.minFilter!==Nn?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function E(P){const S=P.target;S.removeEventListener("dispose",E),A(S),S.isVideoTexture&&h.delete(S)}function R(P){const S=P.target;S.removeEventListener("dispose",R),b(S)}function A(P){const S=i.get(P);if(S.__webglInit===void 0)return;const O=P.source,K=f.get(O);if(K){const tt=K[S.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&y(P),Object.keys(K).length===0&&f.delete(O)}i.remove(P)}function y(P){const S=i.get(P);n.deleteTexture(S.__webglTexture);const O=P.source,K=f.get(O);delete K[S.__cacheKey],r.memory.textures--}function b(P){const S=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let tt=0;tt<S.__webglFramebuffer[K].length;tt++)n.deleteFramebuffer(S.__webglFramebuffer[K][tt]);else n.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)n.deleteFramebuffer(S.__webglFramebuffer[K]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const O=P.textures;for(let K=0,tt=O.length;K<tt;K++){const et=i.get(O[K]);et.__webglTexture&&(n.deleteTexture(et.__webglTexture),r.memory.textures--),i.remove(O[K])}i.remove(P)}let D=0;function V(){D=0}function G(){const P=D;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),D+=1,P}function Y(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function C(P,S){const O=i.get(P);if(P.isVideoTexture&&_t(P),P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){const K=P.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(O,P,S);return}}e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+S)}function N(P,S){const O=i.get(P);if(P.version>0&&O.__version!==P.version){$(O,P,S);return}e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+S)}function z(P,S){const O=i.get(P);if(P.version>0&&O.__version!==P.version){$(O,P,S);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+S)}function I(P,S){const O=i.get(P);if(P.version>0&&O.__version!==P.version){ot(O,P,S);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+S)}const k={[vo]:n.REPEAT,[Xi]:n.CLAMP_TO_EDGE,[lc]:n.MIRRORED_REPEAT},Q={[Je]:n.NEAREST,[gd]:n.NEAREST_MIPMAP_NEAREST,[Ho]:n.NEAREST_MIPMAP_LINEAR,[Nn]:n.LINEAR,[oa]:n.LINEAR_MIPMAP_NEAREST,[yi]:n.LINEAR_MIPMAP_LINEAR},st={[vd]:n.NEVER,[Ed]:n.ALWAYS,[Md]:n.LESS,[Lu]:n.LEQUAL,[bd]:n.EQUAL,[Sd]:n.GEQUAL,[yd]:n.GREATER,[wd]:n.NOTEQUAL};function bt(P,S){if(S.type===Hn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Nn||S.magFilter===oa||S.magFilter===Ho||S.magFilter===yi||S.minFilter===Nn||S.minFilter===oa||S.minFilter===Ho||S.minFilter===yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,k[S.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,k[S.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,k[S.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,Q[S.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,Q[S.minFilter]),S.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,st[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Je||S.minFilter!==Ho&&S.minFilter!==yi||S.type===Hn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(P,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Wt(P,S){let O=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",E));const K=S.source;let tt=f.get(K);tt===void 0&&(tt={},f.set(K,tt));const et=Y(S);if(et!==P.__cacheKey){tt[et]===void 0&&(tt[et]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,O=!0),tt[et].usedTimes++;const It=tt[P.__cacheKey];It!==void 0&&(tt[P.__cacheKey].usedTimes--,It.usedTimes===0&&y(S)),P.__cacheKey=et,P.__webglTexture=tt[et].texture}return O}function $(P,S,O){let K=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=n.TEXTURE_3D);const tt=Wt(P,S),et=S.source;e.bindTexture(K,P.__webglTexture,n.TEXTURE0+O);const It=i.get(et);if(et.version!==It.__version||tt===!0){e.activeTexture(n.TEXTURE0+O);const mt=ge.getPrimaries(ge.workingColorSpace),St=S.colorSpace===bi?null:ge.getPrimaries(S.colorSpace),Kt=S.colorSpace===bi||mt===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let at=_(S.image,!1,s.maxTextureSize);at=Nt(S,at);const yt=o.convert(S.format,S.colorSpace),Xt=o.convert(S.type);let zt=M(S.internalFormat,yt,Xt,S.colorSpace,S.isVideoTexture);bt(K,S);let Rt;const ae=S.mipmaps,Jt=S.isVideoTexture!==!0,Re=It.__version===void 0||tt===!0,H=et.dataReady,vt=w(S,at);if(S.isDepthTexture)zt=v(S.format===Hs,S.type),Re&&(Jt?e.texStorage2D(n.TEXTURE_2D,1,zt,at.width,at.height):e.texImage2D(n.TEXTURE_2D,0,zt,at.width,at.height,0,yt,Xt,null));else if(S.isDataTexture)if(ae.length>0){Jt&&Re&&e.texStorage2D(n.TEXTURE_2D,vt,zt,ae[0].width,ae[0].height);for(let J=0,nt=ae.length;J<nt;J++)Rt=ae[J],Jt?H&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Rt.width,Rt.height,yt,Xt,Rt.data):e.texImage2D(n.TEXTURE_2D,J,zt,Rt.width,Rt.height,0,yt,Xt,Rt.data);S.generateMipmaps=!1}else Jt?(Re&&e.texStorage2D(n.TEXTURE_2D,vt,zt,at.width,at.height),H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,at.width,at.height,yt,Xt,at.data)):e.texImage2D(n.TEXTURE_2D,0,zt,at.width,at.height,0,yt,Xt,at.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Jt&&Re&&e.texStorage3D(n.TEXTURE_2D_ARRAY,vt,zt,ae[0].width,ae[0].height,at.depth);for(let J=0,nt=ae.length;J<nt;J++)if(Rt=ae[J],S.format!==Fn)if(yt!==null)if(Jt){if(H)if(S.layerUpdates.size>0){const Tt=vh(Rt.width,Rt.height,S.format,S.type);for(const Et of S.layerUpdates){const ne=Rt.data.subarray(Et*Tt/Rt.data.BYTES_PER_ELEMENT,(Et+1)*Tt/Rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,Et,Rt.width,Rt.height,1,yt,ne)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Rt.width,Rt.height,at.depth,yt,Rt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,zt,Rt.width,Rt.height,at.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?H&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Rt.width,Rt.height,at.depth,yt,Xt,Rt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,J,zt,Rt.width,Rt.height,at.depth,0,yt,Xt,Rt.data)}else{Jt&&Re&&e.texStorage2D(n.TEXTURE_2D,vt,zt,ae[0].width,ae[0].height);for(let J=0,nt=ae.length;J<nt;J++)Rt=ae[J],S.format!==Fn?yt!==null?Jt?H&&e.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,Rt.width,Rt.height,yt,Rt.data):e.compressedTexImage2D(n.TEXTURE_2D,J,zt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?H&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Rt.width,Rt.height,yt,Xt,Rt.data):e.texImage2D(n.TEXTURE_2D,J,zt,Rt.width,Rt.height,0,yt,Xt,Rt.data)}else if(S.isDataArrayTexture)if(Jt){if(Re&&e.texStorage3D(n.TEXTURE_2D_ARRAY,vt,zt,at.width,at.height,at.depth),H)if(S.layerUpdates.size>0){const J=vh(at.width,at.height,S.format,S.type);for(const nt of S.layerUpdates){const Tt=at.data.subarray(nt*J/at.data.BYTES_PER_ELEMENT,(nt+1)*J/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,nt,at.width,at.height,1,yt,Xt,Tt)}S.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,yt,Xt,at.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,zt,at.width,at.height,at.depth,0,yt,Xt,at.data);else if(S.isData3DTexture)Jt?(Re&&e.texStorage3D(n.TEXTURE_3D,vt,zt,at.width,at.height,at.depth),H&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,yt,Xt,at.data)):e.texImage3D(n.TEXTURE_3D,0,zt,at.width,at.height,at.depth,0,yt,Xt,at.data);else if(S.isFramebufferTexture){if(Re)if(Jt)e.texStorage2D(n.TEXTURE_2D,vt,zt,at.width,at.height);else{let J=at.width,nt=at.height;for(let Tt=0;Tt<vt;Tt++)e.texImage2D(n.TEXTURE_2D,Tt,zt,J,nt,0,yt,Xt,null),J>>=1,nt>>=1}}else if(ae.length>0){if(Jt&&Re){const J=xt(ae[0]);e.texStorage2D(n.TEXTURE_2D,vt,zt,J.width,J.height)}for(let J=0,nt=ae.length;J<nt;J++)Rt=ae[J],Jt?H&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,yt,Xt,Rt):e.texImage2D(n.TEXTURE_2D,J,zt,yt,Xt,Rt);S.generateMipmaps=!1}else if(Jt){if(Re){const J=xt(at);e.texStorage2D(n.TEXTURE_2D,vt,zt,J.width,J.height)}H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,yt,Xt,at)}else e.texImage2D(n.TEXTURE_2D,0,zt,yt,Xt,at);p(S)&&m(K),It.__version=et.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ot(P,S,O){if(S.image.length!==6)return;const K=Wt(P,S),tt=S.source;e.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+O);const et=i.get(tt);if(tt.version!==et.__version||K===!0){e.activeTexture(n.TEXTURE0+O);const It=ge.getPrimaries(ge.workingColorSpace),mt=S.colorSpace===bi?null:ge.getPrimaries(S.colorSpace),St=S.colorSpace===bi||It===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Kt=S.isCompressedTexture||S.image[0].isCompressedTexture,at=S.image[0]&&S.image[0].isDataTexture,yt=[];for(let nt=0;nt<6;nt++)!Kt&&!at?yt[nt]=_(S.image[nt],!0,s.maxCubemapSize):yt[nt]=at?S.image[nt].image:S.image[nt],yt[nt]=Nt(S,yt[nt]);const Xt=yt[0],zt=o.convert(S.format,S.colorSpace),Rt=o.convert(S.type),ae=M(S.internalFormat,zt,Rt,S.colorSpace),Jt=S.isVideoTexture!==!0,Re=et.__version===void 0||K===!0,H=tt.dataReady;let vt=w(S,Xt);bt(n.TEXTURE_CUBE_MAP,S);let J;if(Kt){Jt&&Re&&e.texStorage2D(n.TEXTURE_CUBE_MAP,vt,ae,Xt.width,Xt.height);for(let nt=0;nt<6;nt++){J=yt[nt].mipmaps;for(let Tt=0;Tt<J.length;Tt++){const Et=J[Tt];S.format!==Fn?zt!==null?Jt?H&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt,0,0,Et.width,Et.height,zt,Et.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt,ae,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Jt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt,0,0,Et.width,Et.height,zt,Rt,Et.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt,ae,Et.width,Et.height,0,zt,Rt,Et.data)}}}else{if(J=S.mipmaps,Jt&&Re){J.length>0&&vt++;const nt=xt(yt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,vt,ae,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(at){Jt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,yt[nt].width,yt[nt].height,zt,Rt,yt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ae,yt[nt].width,yt[nt].height,0,zt,Rt,yt[nt].data);for(let Tt=0;Tt<J.length;Tt++){const ne=J[Tt].image[nt].image;Jt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt+1,0,0,ne.width,ne.height,zt,Rt,ne.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt+1,ae,ne.width,ne.height,0,zt,Rt,ne.data)}}else{Jt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,zt,Rt,yt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ae,zt,Rt,yt[nt]);for(let Tt=0;Tt<J.length;Tt++){const Et=J[Tt];Jt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt+1,0,0,zt,Rt,Et.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt+1,ae,zt,Rt,Et.image[nt])}}}p(S)&&m(n.TEXTURE_CUBE_MAP),et.__version=tt.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ut(P,S,O,K,tt,et){const It=o.convert(O.format,O.colorSpace),mt=o.convert(O.type),St=M(O.internalFormat,It,mt,O.colorSpace),Kt=i.get(S),at=i.get(O);if(at.__renderTarget=S,!Kt.__hasExternalTextures){const yt=Math.max(1,S.width>>et),Xt=Math.max(1,S.height>>et);tt===n.TEXTURE_3D||tt===n.TEXTURE_2D_ARRAY?e.texImage3D(tt,et,St,yt,Xt,S.depth,0,It,mt,null):e.texImage2D(tt,et,St,yt,Xt,0,It,mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,P),Ht(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,tt,at.__webglTexture,0,wt(S)):(tt===n.TEXTURE_2D||tt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,tt,at.__webglTexture,et),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ft(P,S,O){if(n.bindRenderbuffer(n.RENDERBUFFER,P),S.depthBuffer){const K=S.depthTexture,tt=K&&K.isDepthTexture?K.type:null,et=v(S.stencilBuffer,tt),It=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=wt(S);Ht(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt,et,S.width,S.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt,et,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,et,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,It,n.RENDERBUFFER,P)}else{const K=S.textures;for(let tt=0;tt<K.length;tt++){const et=K[tt],It=o.convert(et.format,et.colorSpace),mt=o.convert(et.type),St=M(et.internalFormat,It,mt,et.colorSpace),Kt=wt(S);O&&Ht(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Kt,St,S.width,S.height):Ht(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Kt,St,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,St,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ut(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(S.depthTexture);K.__renderTarget=S,(!K.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),C(S.depthTexture,0);const tt=K.__webglTexture,et=wt(S);if(S.depthTexture.format===Ds)Ht(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,tt,0,et):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,tt,0);else if(S.depthTexture.format===Hs)Ht(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,tt,0,et):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function ce(P){const S=i.get(P),O=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const K=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const tt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",tt)};K.addEventListener("dispose",tt),S.__depthDisposeCallback=tt}S.__boundDepthTexture=K}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ut(S.__webglFramebuffer,P)}else if(O){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=n.createRenderbuffer(),ft(S.__webglDepthbuffer[K],P,!1);else{const tt=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,et=S.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,et),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,et)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),ft(S.__webglDepthbuffer,P,!1);else{const K=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,tt),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,tt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function pt(P,S,O){const K=i.get(P);S!==void 0&&ut(K.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&ce(P)}function ve(P){const S=P.texture,O=i.get(P),K=i.get(S);P.addEventListener("dispose",R);const tt=P.textures,et=P.isWebGLCubeRenderTarget===!0,It=tt.length>1;if(It||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=S.version,r.memory.textures++),et){O.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[mt]=[];for(let St=0;St<S.mipmaps.length;St++)O.__webglFramebuffer[mt][St]=n.createFramebuffer()}else O.__webglFramebuffer[mt]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let mt=0;mt<S.mipmaps.length;mt++)O.__webglFramebuffer[mt]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(It)for(let mt=0,St=tt.length;mt<St;mt++){const Kt=i.get(tt[mt]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=n.createTexture(),r.memory.textures++)}if(P.samples>0&&Ht(P)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let mt=0;mt<tt.length;mt++){const St=tt[mt];O.__webglColorRenderbuffer[mt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[mt]);const Kt=o.convert(St.format,St.colorSpace),at=o.convert(St.type),yt=M(St.internalFormat,Kt,at,St.colorSpace,P.isXRRenderTarget===!0),Xt=wt(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt,yt,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,O.__webglColorRenderbuffer[mt])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),ft(O.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(et){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),bt(n.TEXTURE_CUBE_MAP,S);for(let mt=0;mt<6;mt++)if(S.mipmaps&&S.mipmaps.length>0)for(let St=0;St<S.mipmaps.length;St++)ut(O.__webglFramebuffer[mt][St],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,St);else ut(O.__webglFramebuffer[mt],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);p(S)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let mt=0,St=tt.length;mt<St;mt++){const Kt=tt[mt],at=i.get(Kt);e.bindTexture(n.TEXTURE_2D,at.__webglTexture),bt(n.TEXTURE_2D,Kt),ut(O.__webglFramebuffer,P,Kt,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,0),p(Kt)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let mt=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(mt=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(mt,K.__webglTexture),bt(mt,S),S.mipmaps&&S.mipmaps.length>0)for(let St=0;St<S.mipmaps.length;St++)ut(O.__webglFramebuffer[St],P,S,n.COLOR_ATTACHMENT0,mt,St);else ut(O.__webglFramebuffer,P,S,n.COLOR_ATTACHMENT0,mt,0);p(S)&&m(mt),e.unbindTexture()}P.depthBuffer&&ce(P)}function ue(P){const S=P.textures;for(let O=0,K=S.length;O<K;O++){const tt=S[O];if(p(tt)){const et=x(P),It=i.get(tt).__webglTexture;e.bindTexture(et,It),m(et),e.unbindTexture()}}}const B=[],L=[];function Ot(P){if(P.samples>0){if(Ht(P)===!1){const S=P.textures,O=P.width,K=P.height;let tt=n.COLOR_BUFFER_BIT;const et=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,It=i.get(P),mt=S.length>1;if(mt)for(let St=0;St<S.length;St++)e.bindFramebuffer(n.FRAMEBUFFER,It.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,It.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let St=0;St<S.length;St++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(tt|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(tt|=n.STENCIL_BUFFER_BIT)),mt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,It.__webglColorRenderbuffer[St]);const Kt=i.get(S[St]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Kt,0)}n.blitFramebuffer(0,0,O,K,0,0,O,K,tt,n.NEAREST),c===!0&&(B.length=0,L.length=0,B.push(n.COLOR_ATTACHMENT0+St),P.depthBuffer&&P.resolveDepthBuffer===!1&&(B.push(et),L.push(et),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,L)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,B))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),mt)for(let St=0;St<S.length;St++){e.bindFramebuffer(n.FRAMEBUFFER,It.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,It.__webglColorRenderbuffer[St]);const Kt=i.get(S[St]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,It.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,Kt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const S=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function wt(P){return Math.min(s.maxSamples,P.samples)}function Ht(P){const S=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function _t(P){const S=r.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function Nt(P,S){const O=P.colorSpace,K=P.format,tt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||O!==Vs&&O!==bi&&(ge.getTransfer(O)===Te?(K!==Fn||tt!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),S}function xt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=V,this.setTexture2D=C,this.setTexture2DArray=N,this.setTexture3D=z,this.setTextureCube=I,this.rebindTextures=pt,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Ot,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=Ht}function G1(n,t){function e(i,s=bi){let o;const r=ge.getTransfer(s);if(i===ai)return n.UNSIGNED_BYTE;if(i===jc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===$c)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Su)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yu)return n.BYTE;if(i===wu)return n.SHORT;if(i===Mo)return n.UNSIGNED_SHORT;if(i===qc)return n.INT;if(i===Ki)return n.UNSIGNED_INT;if(i===Hn)return n.FLOAT;if(i===Uo)return n.HALF_FLOAT;if(i===Eu)return n.ALPHA;if(i===Tu)return n.RGB;if(i===Fn)return n.RGBA;if(i===Au)return n.LUMINANCE;if(i===Ru)return n.LUMINANCE_ALPHA;if(i===Ds)return n.DEPTH_COMPONENT;if(i===Hs)return n.DEPTH_STENCIL;if(i===Kc)return n.RED;if(i===Jc)return n.RED_INTEGER;if(i===Cu)return n.RG;if(i===Qc)return n.RG_INTEGER;if(i===tl)return n.RGBA_INTEGER;if(i===Cr||i===Pr||i===Ir||i===Lr)if(r===Te)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Cr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Pr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ir)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Lr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Cr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Pr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ir)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Lr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hc||i===uc||i===fc||i===dc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===hc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===uc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===dc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===pc||i===mc||i===gc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===pc||i===mc)return r===Te?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===gc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===_c||i===xc||i===vc||i===Mc||i===bc||i===yc||i===wc||i===Sc||i===Ec||i===Tc||i===Ac||i===Rc||i===Cc||i===Pc)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===_c)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===vc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Mc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===wc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ec)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Tc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ac)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Rc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Cc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Pc)return r===Te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Dr||i===Ic||i===Lc)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===Dr)return r===Te?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ic)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Lc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pu||i===Dc||i===Uc||i===Nc)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===Dr)return o.COMPRESSED_RED_RGTC1_EXT;if(i===Dc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Uc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Nc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Gs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const H1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V1=`
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

}`;class W1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Qe,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ci({vertexShader:H1,fragmentShader:V1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ht(new Ys(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k1 extends ns{constructor(t,e){super();const i=this;let s=null,o=1,r=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const _=new W1,p=e.getContextAttributes();let m=null,x=null;const M=[],v=[],w=new it;let E=null;const R=new wn;R.viewport=new Ne;const A=new wn;A.viewport=new Ne;const y=[R,A],b=new c0;let D=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ot=M[$];return ot===void 0&&(ot=new Ea,M[$]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function($){let ot=M[$];return ot===void 0&&(ot=new Ea,M[$]=ot),ot.getGripSpace()},this.getHand=function($){let ot=M[$];return ot===void 0&&(ot=new Ea,M[$]=ot),ot.getHandSpace()};function G($){const ot=v.indexOf($.inputSource);if(ot===-1)return;const ut=M[ot];ut!==void 0&&(ut.update($.inputSource,$.frame,l||r),ut.dispatchEvent({type:$.type,data:$.inputSource}))}function Y(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",C);for(let $=0;$<M.length;$++){const ot=v[$];ot!==null&&(v[$]=null,M[$].disconnect(ot))}D=null,V=null,_.reset(),t.setRenderTarget(m),d=null,f=null,u=null,s=null,x=null,Wt.stop(),i.isPresenting=!1,t.setPixelRatio(E),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){o=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",C),p.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(w),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ut=null,ft=null,Ut=null;p.depth&&(Ut=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=p.stencil?Hs:Ds,ft=p.stencil?Gs:Ki);const ce={colorFormat:e.RGBA8,depthFormat:Ut,scaleFactor:o};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(ce),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new Ji(f.textureWidth,f.textureHeight,{format:Fn,type:ai,depthTexture:new Yu(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ut={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:o};d=new XRWebGLLayer(s,e,ut),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Ji(d.framebufferWidth,d.framebufferHeight,{format:Fn,type:ai,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(a),Wt.setContext(s),Wt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function C($){for(let ot=0;ot<$.removed.length;ot++){const ut=$.removed[ot],ft=v.indexOf(ut);ft>=0&&(v[ft]=null,M[ft].disconnect(ut))}for(let ot=0;ot<$.added.length;ot++){const ut=$.added[ot];let ft=v.indexOf(ut);if(ft===-1){for(let ce=0;ce<M.length;ce++)if(ce>=v.length){v.push(ut),ft=ce;break}else if(v[ce]===null){v[ce]=ut,ft=ce;break}if(ft===-1)break}const Ut=M[ft];Ut&&Ut.connect(ut)}}const N=new U,z=new U;function I($,ot,ut){N.setFromMatrixPosition(ot.matrixWorld),z.setFromMatrixPosition(ut.matrixWorld);const ft=N.distanceTo(z),Ut=ot.projectionMatrix.elements,ce=ut.projectionMatrix.elements,pt=Ut[14]/(Ut[10]-1),ve=Ut[14]/(Ut[10]+1),ue=(Ut[9]+1)/Ut[5],B=(Ut[9]-1)/Ut[5],L=(Ut[8]-1)/Ut[0],Ot=(ce[8]+1)/ce[0],wt=pt*L,Ht=pt*Ot,_t=ft/(-L+Ot),Nt=_t*-L;if(ot.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Nt),$.translateZ(_t),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ut[10]===-1)$.projectionMatrix.copy(ot.projectionMatrix),$.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const xt=pt+_t,P=ve+_t,S=wt-Nt,O=Ht+(ft-Nt),K=ue*ve/P*xt,tt=B*ve/P*xt;$.projectionMatrix.makePerspective(S,O,K,tt,xt,P),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function k($,ot){ot===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ot.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ot=$.near,ut=$.far;_.texture!==null&&(_.depthNear>0&&(ot=_.depthNear),_.depthFar>0&&(ut=_.depthFar)),b.near=A.near=R.near=ot,b.far=A.far=R.far=ut,(D!==b.near||V!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),D=b.near,V=b.far),R.layers.mask=$.layers.mask|2,A.layers.mask=$.layers.mask|4,b.layers.mask=R.layers.mask|A.layers.mask;const ft=$.parent,Ut=b.cameras;k(b,ft);for(let ce=0;ce<Ut.length;ce++)k(Ut[ce],ft);Ut.length===2?I(b,R,A):b.projectionMatrix.copy(R.projectionMatrix),Q($,b,ft)};function Q($,ot,ut){ut===null?$.matrix.copy(ot.matrixWorld):($.matrix.copy(ut.matrixWorld),$.matrix.invert(),$.matrix.multiply(ot.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ot.projectionMatrix),$.projectionMatrixInverse.copy(ot.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=bo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(b)};let st=null;function bt($,ot){if(h=ot.getViewerPose(l||r),g=ot,h!==null){const ut=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let ft=!1;ut.length!==b.cameras.length&&(b.cameras.length=0,ft=!0);for(let pt=0;pt<ut.length;pt++){const ve=ut[pt];let ue=null;if(d!==null)ue=d.getViewport(ve);else{const L=u.getViewSubImage(f,ve);ue=L.viewport,pt===0&&(t.setRenderTargetTextures(x,L.colorTexture,f.ignoreDepthValues?void 0:L.depthStencilTexture),t.setRenderTarget(x))}let B=y[pt];B===void 0&&(B=new wn,B.layers.enable(pt),B.viewport=new Ne,y[pt]=B),B.matrix.fromArray(ve.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(ve.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(ue.x,ue.y,ue.width,ue.height),pt===0&&(b.matrix.copy(B.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ft===!0&&b.cameras.push(B)}const Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const pt=u.getDepthInformation(ut[0]);pt&&pt.isValid&&pt.texture&&_.init(t,pt,s.renderState)}}for(let ut=0;ut<M.length;ut++){const ft=v[ut],Ut=M[ut];ft!==null&&Ut!==void 0&&Ut.update(ft,ot,l||r)}st&&st($,ot),ot.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ot}),g=null}const Wt=new of;Wt.setAnimationLoop(bt),this.setAnimationLoop=function($){st=$},this.dispose=function(){}}}const Bi=new xn,X1=new ee;function Y1(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,zu(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,x,M,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?o(p,m):m.isMeshToonMaterial?(o(p,m),u(p,m)):m.isMeshPhongMaterial?(o(p,m),h(p,m)):m.isMeshStandardMaterial?(o(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,v)):m.isMeshMatcapMaterial?(o(p,m),g(p,m)):m.isMeshDepthMaterial?o(p,m):m.isMeshDistanceMaterial?(o(p,m),_(p,m)):m.isMeshNormalMaterial?o(p,m):m.isLineBasicMaterial?(r(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,x,M):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ke&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ke&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=t.get(m),M=x.envMap,v=x.envMapRotation;M&&(p.envMap.value=M,Bi.copy(v),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),p.envMapRotation.value.setFromMatrix4(X1.makeRotationFromEuler(Bi)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function r(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=M*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ke&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Z1(n,t,e,i){let s={},o={},r=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const v=M.program;i.uniformBlockBinding(x,v)}function l(x,M){let v=s[x.id];v===void 0&&(g(x),v=h(x),s[x.id]=v,x.addEventListener("dispose",p));const w=M.program;i.updateUBOMapping(x,w);const E=t.render.frame;o[x.id]!==E&&(f(x),o[x.id]=E)}function h(x){const M=u();x.__bindingPointIndex=M;const v=n.createBuffer(),w=x.__size,E=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,w,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,v),v}function u(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=s[x.id],v=x.uniforms,w=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let E=0,R=v.length;E<R;E++){const A=Array.isArray(v[E])?v[E]:[v[E]];for(let y=0,b=A.length;y<b;y++){const D=A[y];if(d(D,E,y,w)===!0){const V=D.__offset,G=Array.isArray(D.value)?D.value:[D.value];let Y=0;for(let C=0;C<G.length;C++){const N=G[C],z=_(N);typeof N=="number"||typeof N=="boolean"?(D.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,V+Y,D.__data)):N.isMatrix3?(D.__data[0]=N.elements[0],D.__data[1]=N.elements[1],D.__data[2]=N.elements[2],D.__data[3]=0,D.__data[4]=N.elements[3],D.__data[5]=N.elements[4],D.__data[6]=N.elements[5],D.__data[7]=0,D.__data[8]=N.elements[6],D.__data[9]=N.elements[7],D.__data[10]=N.elements[8],D.__data[11]=0):(N.toArray(D.__data,Y),Y+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,V,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,M,v,w){const E=x.value,R=M+"_"+v;if(w[R]===void 0)return typeof E=="number"||typeof E=="boolean"?w[R]=E:w[R]=E.clone(),!0;{const A=w[R];if(typeof E=="number"||typeof E=="boolean"){if(A!==E)return w[R]=E,!0}else if(A.equals(E)===!1)return A.copy(E),!0}return!1}function g(x){const M=x.uniforms;let v=0;const w=16;for(let R=0,A=M.length;R<A;R++){const y=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,D=y.length;b<D;b++){const V=y[b],G=Array.isArray(V.value)?V.value:[V.value];for(let Y=0,C=G.length;Y<C;Y++){const N=G[Y],z=_(N),I=v%w,k=I%z.boundary,Q=I+k;v+=k,Q!==0&&w-Q<z.storage&&(v+=w-Q),V.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=v,v+=z.storage}}}const E=v%w;return E>0&&(v+=w-E),x.__size=v,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){const M=x.target;M.removeEventListener("dispose",p);const v=r.indexOf(M.__bindingPointIndex);r.splice(v,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete o[M.id]}function m(){for(const x in s)n.deleteBuffer(s[x]);r=[],s={},o={}}return{bind:c,update:l,dispose:m}}class q1{constructor(t={}){const{canvas:e=Vd(),context:i=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=r;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,m=null;const x=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fe,this.toneMapping=Ti,this.toneMappingExposure=1;const v=this;let w=!1,E=0,R=0,A=null,y=-1,b=null;const D=new Ne,V=new Ne;let G=null;const Y=new rt(0);let C=0,N=e.width,z=e.height,I=1,k=null,Q=null;const st=new Ne(0,0,N,z),bt=new Ne(0,0,N,z);let Wt=!1;const $=new Xs;let ot=!1,ut=!1;this.transmissionResolutionScale=1;const ft=new ee,Ut=new ee,ce=new U,pt=new Ne,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ue=!1;function B(){return A===null?I:1}let L=i;function Ot(T,W){return e.getContext(T,W)}try{const T={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r174"),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",Et,!1),L===null){const W="webgl2";if(L=Ot(W,T),L===null)throw Ot(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let wt,Ht,_t,Nt,xt,P,S,O,K,tt,et,It,mt,St,Kt,at,yt,Xt,zt,Rt,ae,Jt,Re,H;function vt(){wt=new s_(L),wt.init(),Jt=new G1(L,wt),Ht=new Kg(L,wt,t,Jt),_t=new z1(L,wt),Ht.reverseDepthBuffer&&f&&_t.buffers.depth.setReversed(!0),Nt=new a_(L),xt=new E1,P=new B1(L,wt,_t,xt,Ht,Jt,Nt),S=new Qg(v),O=new i_(v),K=new d0(L),Re=new jg(L,K),tt=new o_(L,K,Nt,Re),et=new l_(L,tt,K,Nt),zt=new c_(L,Ht,P),at=new Jg(xt),It=new S1(v,S,O,wt,Ht,Re,at),mt=new Y1(v,xt),St=new A1,Kt=new D1(wt),Xt=new qg(v,S,O,_t,et,d,c),yt=new F1(v,et,Ht),H=new Z1(L,Nt,Ht,_t),Rt=new $g(L,wt,Nt),ae=new r_(L,wt,Nt),Nt.programs=It.programs,v.capabilities=Ht,v.extensions=wt,v.properties=xt,v.renderLists=St,v.shadowMap=yt,v.state=_t,v.info=Nt}vt();const J=new k1(v,L);this.xr=J,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=wt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=wt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(T){T!==void 0&&(I=T,this.setSize(N,z,!1))},this.getSize=function(T){return T.set(N,z)},this.setSize=function(T,W,Z=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=T,z=W,e.width=Math.floor(T*I),e.height=Math.floor(W*I),Z===!0&&(e.style.width=T+"px",e.style.height=W+"px"),this.setViewport(0,0,T,W)},this.getDrawingBufferSize=function(T){return T.set(N*I,z*I).floor()},this.setDrawingBufferSize=function(T,W,Z){N=T,z=W,I=Z,e.width=Math.floor(T*Z),e.height=Math.floor(W*Z),this.setViewport(0,0,T,W)},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(st)},this.setViewport=function(T,W,Z,j){T.isVector4?st.set(T.x,T.y,T.z,T.w):st.set(T,W,Z,j),_t.viewport(D.copy(st).multiplyScalar(I).round())},this.getScissor=function(T){return T.copy(bt)},this.setScissor=function(T,W,Z,j){T.isVector4?bt.set(T.x,T.y,T.z,T.w):bt.set(T,W,Z,j),_t.scissor(V.copy(bt).multiplyScalar(I).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(T){_t.setScissorTest(Wt=T)},this.setOpaqueSort=function(T){k=T},this.setTransparentSort=function(T){Q=T},this.getClearColor=function(T){return T.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor(...arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha(...arguments)},this.clear=function(T=!0,W=!0,Z=!0){let j=0;if(T){let X=!1;if(A!==null){const lt=A.texture.format;X=lt===tl||lt===Qc||lt===Jc}if(X){const lt=A.texture.type,Mt=lt===ai||lt===Ki||lt===Mo||lt===Gs||lt===jc||lt===$c,Ct=Xt.getClearColor(),Pt=Xt.getClearAlpha(),Zt=Ct.r,qt=Ct.g,Vt=Ct.b;Mt?(g[0]=Zt,g[1]=qt,g[2]=Vt,g[3]=Pt,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=Zt,_[1]=qt,_[2]=Vt,_[3]=Pt,L.clearBufferiv(L.COLOR,0,_))}else j|=L.COLOR_BUFFER_BIT}W&&(j|=L.DEPTH_BUFFER_BIT),Z&&(j|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),Xt.dispose(),St.dispose(),Kt.dispose(),xt.dispose(),S.dispose(),O.dispose(),et.dispose(),Re.dispose(),H.dispose(),It.dispose(),J.dispose(),J.removeEventListener("sessionstart",yl),J.removeEventListener("sessionend",wl),Li.stop()};function nt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const T=Nt.autoReset,W=yt.enabled,Z=yt.autoUpdate,j=yt.needsUpdate,X=yt.type;vt(),Nt.autoReset=T,yt.enabled=W,yt.autoUpdate=Z,yt.needsUpdate=j,yt.type=X}function Et(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ne(T){const W=T.target;W.removeEventListener("dispose",ne),De(W)}function De(T){Ye(T),xt.remove(T)}function Ye(T){const W=xt.get(T).programs;W!==void 0&&(W.forEach(function(Z){It.releaseProgram(Z)}),T.isShaderMaterial&&It.releaseShaderCache(T))}this.renderBufferDirect=function(T,W,Z,j,X,lt){W===null&&(W=ve);const Mt=X.isMesh&&X.matrixWorld.determinant()<0,Ct=Df(T,W,Z,j,X);_t.setMaterial(j,Mt);let Pt=Z.index,Zt=1;if(j.wireframe===!0){if(Pt=tt.getWireframeAttribute(Z),Pt===void 0)return;Zt=2}const qt=Z.drawRange,Vt=Z.attributes.position;let fe=qt.start*Zt,Me=(qt.start+qt.count)*Zt;lt!==null&&(fe=Math.max(fe,lt.start*Zt),Me=Math.min(Me,(lt.start+lt.count)*Zt)),Pt!==null?(fe=Math.max(fe,0),Me=Math.min(Me,Pt.count)):Vt!=null&&(fe=Math.max(fe,0),Me=Math.min(Me,Vt.count));const Oe=Me-fe;if(Oe<0||Oe===1/0)return;Re.setup(X,j,Ct,Z,Pt);let Ue,de=Rt;if(Pt!==null&&(Ue=K.get(Pt),de=ae,de.setIndex(Ue)),X.isMesh)j.wireframe===!0?(_t.setLineWidth(j.wireframeLinewidth*B()),de.setMode(L.LINES)):de.setMode(L.TRIANGLES);else if(X.isLine){let kt=j.linewidth;kt===void 0&&(kt=1),_t.setLineWidth(kt*B()),X.isLineSegments?de.setMode(L.LINES):X.isLineLoop?de.setMode(L.LINE_LOOP):de.setMode(L.LINE_STRIP)}else X.isPoints?de.setMode(L.POINTS):X.isSprite&&de.setMode(L.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Hi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),de.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(wt.get("WEBGL_multi_draw"))de.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const kt=X._multiDrawStarts,ke=X._multiDrawCounts,be=X._multiDrawCount,Cn=Pt?K.get(Pt).bytesPerElement:1,os=xt.get(j).currentProgram.getUniforms();for(let dn=0;dn<be;dn++)os.setValue(L,"_gl_DrawID",dn),de.render(kt[dn]/Cn,ke[dn])}else if(X.isInstancedMesh)de.renderInstances(fe,Oe,X.count);else if(Z.isInstancedBufferGeometry){const kt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,ke=Math.min(Z.instanceCount,kt);de.renderInstances(fe,Oe,ke)}else de.render(fe,Oe)};function we(T,W,Z){T.transparent===!0&&T.side===Sn&&T.forceSinglePass===!1?(T.side=Ke,T.needsUpdate=!0,Go(T,W,Z),T.side=ri,T.needsUpdate=!0,Go(T,W,Z),T.side=Sn):Go(T,W,Z)}this.compile=function(T,W,Z=null){Z===null&&(Z=T),m=Kt.get(Z),m.init(W),M.push(m),Z.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(m.pushLight(X),X.castShadow&&m.pushShadow(X))}),T!==Z&&T.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(m.pushLight(X),X.castShadow&&m.pushShadow(X))}),m.setupLights();const j=new Set;return T.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const lt=X.material;if(lt)if(Array.isArray(lt))for(let Mt=0;Mt<lt.length;Mt++){const Ct=lt[Mt];we(Ct,Z,X),j.add(Ct)}else we(lt,Z,X),j.add(lt)}),m=M.pop(),j},this.compileAsync=function(T,W,Z=null){const j=this.compile(T,W,Z);return new Promise(X=>{function lt(){if(j.forEach(function(Mt){xt.get(Mt).currentProgram.isReady()&&j.delete(Mt)}),j.size===0){X(T);return}setTimeout(lt,10)}wt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let Rn=null;function $n(T){Rn&&Rn(T)}function yl(){Li.stop()}function wl(){Li.start()}const Li=new of;Li.setAnimationLoop($n),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(T){Rn=T,J.setAnimationLoop(T),T===null?Li.stop():Li.start()},J.addEventListener("sessionstart",yl),J.addEventListener("sessionend",wl),this.render=function(T,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(W),W=J.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,W,A),m=Kt.get(T,M.length),m.init(W),M.push(m),Ut.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),$.setFromProjectionMatrix(Ut),ut=this.localClippingEnabled,ot=at.init(this.clippingPlanes,ut),p=St.get(T,x.length),p.init(),x.push(p),J.enabled===!0&&J.isPresenting===!0){const lt=v.xr.getDepthSensingMesh();lt!==null&&ia(lt,W,-1/0,v.sortObjects)}ia(T,W,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(k,Q),ue=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ue&&Xt.addToRenderList(p,T),this.info.render.frame++,ot===!0&&at.beginShadows();const Z=m.state.shadowsArray;yt.render(Z,T,W),ot===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=p.opaque,X=p.transmissive;if(m.setupLights(),W.isArrayCamera){const lt=W.cameras;if(X.length>0)for(let Mt=0,Ct=lt.length;Mt<Ct;Mt++){const Pt=lt[Mt];El(j,X,T,Pt)}ue&&Xt.render(T);for(let Mt=0,Ct=lt.length;Mt<Ct;Mt++){const Pt=lt[Mt];Sl(p,T,Pt,Pt.viewport)}}else X.length>0&&El(j,X,T,W),ue&&Xt.render(T),Sl(p,T,W);A!==null&&R===0&&(P.updateMultisampleRenderTarget(A),P.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(v,T,W),Re.resetDefaultState(),y=-1,b=null,M.pop(),M.length>0?(m=M[M.length-1],ot===!0&&at.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,x.pop(),x.length>0?p=x[x.length-1]:p=null};function ia(T,W,Z,j){if(T.visible===!1)return;if(T.layers.test(W.layers)){if(T.isGroup)Z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(W);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||$.intersectsSprite(T)){j&&pt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ut);const Mt=et.update(T),Ct=T.material;Ct.visible&&p.push(T,Mt,Ct,Z,pt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||$.intersectsObject(T))){const Mt=et.update(T),Ct=T.material;if(j&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),pt.copy(T.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),pt.copy(Mt.boundingSphere.center)),pt.applyMatrix4(T.matrixWorld).applyMatrix4(Ut)),Array.isArray(Ct)){const Pt=Mt.groups;for(let Zt=0,qt=Pt.length;Zt<qt;Zt++){const Vt=Pt[Zt],fe=Ct[Vt.materialIndex];fe&&fe.visible&&p.push(T,Mt,fe,Z,pt.z,Vt)}}else Ct.visible&&p.push(T,Mt,Ct,Z,pt.z,null)}}const lt=T.children;for(let Mt=0,Ct=lt.length;Mt<Ct;Mt++)ia(lt[Mt],W,Z,j)}function Sl(T,W,Z,j){const X=T.opaque,lt=T.transmissive,Mt=T.transparent;m.setupLightsView(Z),ot===!0&&at.setGlobalState(v.clippingPlanes,Z),j&&_t.viewport(D.copy(j)),X.length>0&&Bo(X,W,Z),lt.length>0&&Bo(lt,W,Z),Mt.length>0&&Bo(Mt,W,Z),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function El(T,W,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[j.id]===void 0&&(m.state.transmissionRenderTarget[j.id]=new Ji(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float")?Uo:ai,minFilter:yi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ge.workingColorSpace}));const lt=m.state.transmissionRenderTarget[j.id],Mt=j.viewport||D;lt.setSize(Mt.z*v.transmissionResolutionScale,Mt.w*v.transmissionResolutionScale);const Ct=v.getRenderTarget();v.setRenderTarget(lt),v.getClearColor(Y),C=v.getClearAlpha(),C<1&&v.setClearColor(16777215,.5),v.clear(),ue&&Xt.render(Z);const Pt=v.toneMapping;v.toneMapping=Ti;const Zt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),m.setupLightsView(j),ot===!0&&at.setGlobalState(v.clippingPlanes,j),Bo(T,Z,j),P.updateMultisampleRenderTarget(lt),P.updateRenderTargetMipmap(lt),wt.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Vt=0,fe=W.length;Vt<fe;Vt++){const Me=W[Vt],Oe=Me.object,Ue=Me.geometry,de=Me.material,kt=Me.group;if(de.side===Sn&&Oe.layers.test(j.layers)){const ke=de.side;de.side=Ke,de.needsUpdate=!0,Tl(Oe,Z,j,Ue,de,kt),de.side=ke,de.needsUpdate=!0,qt=!0}}qt===!0&&(P.updateMultisampleRenderTarget(lt),P.updateRenderTargetMipmap(lt))}v.setRenderTarget(Ct),v.setClearColor(Y,C),Zt!==void 0&&(j.viewport=Zt),v.toneMapping=Pt}function Bo(T,W,Z){const j=W.isScene===!0?W.overrideMaterial:null;for(let X=0,lt=T.length;X<lt;X++){const Mt=T[X],Ct=Mt.object,Pt=Mt.geometry,Zt=j===null?Mt.material:j,qt=Mt.group;Ct.layers.test(Z.layers)&&Tl(Ct,W,Z,Pt,Zt,qt)}}function Tl(T,W,Z,j,X,lt){T.onBeforeRender(v,W,Z,j,X,lt),T.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),X.onBeforeRender(v,W,Z,j,T,lt),X.transparent===!0&&X.side===Sn&&X.forceSinglePass===!1?(X.side=Ke,X.needsUpdate=!0,v.renderBufferDirect(Z,W,j,X,T,lt),X.side=ri,X.needsUpdate=!0,v.renderBufferDirect(Z,W,j,X,T,lt),X.side=Sn):v.renderBufferDirect(Z,W,j,X,T,lt),T.onAfterRender(v,W,Z,j,X,lt)}function Go(T,W,Z){W.isScene!==!0&&(W=ve);const j=xt.get(T),X=m.state.lights,lt=m.state.shadowsArray,Mt=X.state.version,Ct=It.getParameters(T,X.state,lt,W,Z),Pt=It.getProgramCacheKey(Ct);let Zt=j.programs;j.environment=T.isMeshStandardMaterial?W.environment:null,j.fog=W.fog,j.envMap=(T.isMeshStandardMaterial?O:S).get(T.envMap||j.environment),j.envMapRotation=j.environment!==null&&T.envMap===null?W.environmentRotation:T.envMapRotation,Zt===void 0&&(T.addEventListener("dispose",ne),Zt=new Map,j.programs=Zt);let qt=Zt.get(Pt);if(qt!==void 0){if(j.currentProgram===qt&&j.lightsStateVersion===Mt)return Rl(T,Ct),qt}else Ct.uniforms=It.getUniforms(T),T.onBeforeCompile(Ct,v),qt=It.acquireProgram(Ct,Pt),Zt.set(Pt,qt),j.uniforms=Ct.uniforms;const Vt=j.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Vt.clippingPlanes=at.uniform),Rl(T,Ct),j.needsLights=Nf(T),j.lightsStateVersion=Mt,j.needsLights&&(Vt.ambientLightColor.value=X.state.ambient,Vt.lightProbe.value=X.state.probe,Vt.directionalLights.value=X.state.directional,Vt.directionalLightShadows.value=X.state.directionalShadow,Vt.spotLights.value=X.state.spot,Vt.spotLightShadows.value=X.state.spotShadow,Vt.rectAreaLights.value=X.state.rectArea,Vt.ltc_1.value=X.state.rectAreaLTC1,Vt.ltc_2.value=X.state.rectAreaLTC2,Vt.pointLights.value=X.state.point,Vt.pointLightShadows.value=X.state.pointShadow,Vt.hemisphereLights.value=X.state.hemi,Vt.directionalShadowMap.value=X.state.directionalShadowMap,Vt.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Vt.spotShadowMap.value=X.state.spotShadowMap,Vt.spotLightMatrix.value=X.state.spotLightMatrix,Vt.spotLightMap.value=X.state.spotLightMap,Vt.pointShadowMap.value=X.state.pointShadowMap,Vt.pointShadowMatrix.value=X.state.pointShadowMatrix),j.currentProgram=qt,j.uniformsList=null,qt}function Al(T){if(T.uniformsList===null){const W=T.currentProgram.getUniforms();T.uniformsList=Ur.seqWithValue(W.seq,T.uniforms)}return T.uniformsList}function Rl(T,W){const Z=xt.get(T);Z.outputColorSpace=W.outputColorSpace,Z.batching=W.batching,Z.batchingColor=W.batchingColor,Z.instancing=W.instancing,Z.instancingColor=W.instancingColor,Z.instancingMorph=W.instancingMorph,Z.skinning=W.skinning,Z.morphTargets=W.morphTargets,Z.morphNormals=W.morphNormals,Z.morphColors=W.morphColors,Z.morphTargetsCount=W.morphTargetsCount,Z.numClippingPlanes=W.numClippingPlanes,Z.numIntersection=W.numClipIntersection,Z.vertexAlphas=W.vertexAlphas,Z.vertexTangents=W.vertexTangents,Z.toneMapping=W.toneMapping}function Df(T,W,Z,j,X){W.isScene!==!0&&(W=ve),P.resetTextureUnits();const lt=W.fog,Mt=j.isMeshStandardMaterial?W.environment:null,Ct=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Vs,Pt=(j.isMeshStandardMaterial?O:S).get(j.envMap||Mt),Zt=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,qt=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Vt=!!Z.morphAttributes.position,fe=!!Z.morphAttributes.normal,Me=!!Z.morphAttributes.color;let Oe=Ti;j.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Oe=v.toneMapping);const Ue=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,de=Ue!==void 0?Ue.length:0,kt=xt.get(j),ke=m.state.lights;if(ot===!0&&(ut===!0||T!==b)){const nn=T===b&&j.id===y;at.setState(j,T,nn)}let be=!1;j.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==ke.state.version||kt.outputColorSpace!==Ct||X.isBatchedMesh&&kt.batching===!1||!X.isBatchedMesh&&kt.batching===!0||X.isBatchedMesh&&kt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&kt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&kt.instancing===!1||!X.isInstancedMesh&&kt.instancing===!0||X.isSkinnedMesh&&kt.skinning===!1||!X.isSkinnedMesh&&kt.skinning===!0||X.isInstancedMesh&&kt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&kt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&kt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&kt.instancingMorph===!1&&X.morphTexture!==null||kt.envMap!==Pt||j.fog===!0&&kt.fog!==lt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==at.numPlanes||kt.numIntersection!==at.numIntersection)||kt.vertexAlphas!==Zt||kt.vertexTangents!==qt||kt.morphTargets!==Vt||kt.morphNormals!==fe||kt.morphColors!==Me||kt.toneMapping!==Oe||kt.morphTargetsCount!==de)&&(be=!0):(be=!0,kt.__version=j.version);let Cn=kt.currentProgram;be===!0&&(Cn=Go(j,W,X));let os=!1,dn=!1,Ks=!1;const Ce=Cn.getUniforms(),vn=kt.uniforms;if(_t.useProgram(Cn.program)&&(os=!0,dn=!0,Ks=!0),j.id!==y&&(y=j.id,dn=!0),os||b!==T){_t.buffers.depth.getReversed()?(ft.copy(T.projectionMatrix),kd(ft),Xd(ft),Ce.setValue(L,"projectionMatrix",ft)):Ce.setValue(L,"projectionMatrix",T.projectionMatrix),Ce.setValue(L,"viewMatrix",T.matrixWorldInverse);const ln=Ce.map.cameraPosition;ln!==void 0&&ln.setValue(L,ce.setFromMatrixPosition(T.matrixWorld)),Ht.logarithmicDepthBuffer&&Ce.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Ce.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),b!==T&&(b=T,dn=!0,Ks=!0)}if(X.isSkinnedMesh){Ce.setOptional(L,X,"bindMatrix"),Ce.setOptional(L,X,"bindMatrixInverse");const nn=X.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),Ce.setValue(L,"boneTexture",nn.boneTexture,P))}X.isBatchedMesh&&(Ce.setOptional(L,X,"batchingTexture"),Ce.setValue(L,"batchingTexture",X._matricesTexture,P),Ce.setOptional(L,X,"batchingIdTexture"),Ce.setValue(L,"batchingIdTexture",X._indirectTexture,P),Ce.setOptional(L,X,"batchingColorTexture"),X._colorsTexture!==null&&Ce.setValue(L,"batchingColorTexture",X._colorsTexture,P));const Mn=Z.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&zt.update(X,Z,Cn),(dn||kt.receiveShadow!==X.receiveShadow)&&(kt.receiveShadow=X.receiveShadow,Ce.setValue(L,"receiveShadow",X.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(vn.envMap.value=Pt,vn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&W.environment!==null&&(vn.envMapIntensity.value=W.environmentIntensity),dn&&(Ce.setValue(L,"toneMappingExposure",v.toneMappingExposure),kt.needsLights&&Uf(vn,Ks),lt&&j.fog===!0&&mt.refreshFogUniforms(vn,lt),mt.refreshMaterialUniforms(vn,j,I,z,m.state.transmissionRenderTarget[T.id]),Ur.upload(L,Al(kt),vn,P)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Ur.upload(L,Al(kt),vn,P),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Ce.setValue(L,"center",X.center),Ce.setValue(L,"modelViewMatrix",X.modelViewMatrix),Ce.setValue(L,"normalMatrix",X.normalMatrix),Ce.setValue(L,"modelMatrix",X.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const nn=j.uniformsGroups;for(let ln=0,sa=nn.length;ln<sa;ln++){const Di=nn[ln];H.update(Di,Cn),H.bind(Di,Cn)}}return Cn}function Uf(T,W){T.ambientLightColor.needsUpdate=W,T.lightProbe.needsUpdate=W,T.directionalLights.needsUpdate=W,T.directionalLightShadows.needsUpdate=W,T.pointLights.needsUpdate=W,T.pointLightShadows.needsUpdate=W,T.spotLights.needsUpdate=W,T.spotLightShadows.needsUpdate=W,T.rectAreaLights.needsUpdate=W,T.hemisphereLights.needsUpdate=W}function Nf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,W,Z){xt.get(T.texture).__webglTexture=W,xt.get(T.depthTexture).__webglTexture=Z;const j=xt.get(T);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=Z===void 0,j.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,W){const Z=xt.get(T);Z.__webglFramebuffer=W,Z.__useDefaultFramebuffer=W===void 0};const Ff=L.createFramebuffer();this.setRenderTarget=function(T,W=0,Z=0){A=T,E=W,R=Z;let j=!0,X=null,lt=!1,Mt=!1;if(T){const Pt=xt.get(T);if(Pt.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(L.FRAMEBUFFER,null),j=!1;else if(Pt.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(Pt.__hasExternalTextures)P.rebindTextures(T,xt.get(T.texture).__webglTexture,xt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Vt=T.depthTexture;if(Pt.__boundDepthTexture!==Vt){if(Vt!==null&&xt.has(Vt)&&(T.width!==Vt.image.width||T.height!==Vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}const Zt=T.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Mt=!0);const qt=xt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(qt[W])?X=qt[W][Z]:X=qt[W],lt=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?X=xt.get(T).__webglMultisampledFramebuffer:Array.isArray(qt)?X=qt[Z]:X=qt,D.copy(T.viewport),V.copy(T.scissor),G=T.scissorTest}else D.copy(st).multiplyScalar(I).floor(),V.copy(bt).multiplyScalar(I).floor(),G=Wt;if(Z!==0&&(X=Ff),_t.bindFramebuffer(L.FRAMEBUFFER,X)&&j&&_t.drawBuffers(T,X),_t.viewport(D),_t.scissor(V),_t.setScissorTest(G),lt){const Pt=xt.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+W,Pt.__webglTexture,Z)}else if(Mt){const Pt=xt.get(T.texture),Zt=W;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Pt.__webglTexture,Z,Zt)}else if(T!==null&&Z!==0){const Pt=xt.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Pt.__webglTexture,Z)}y=-1},this.readRenderTargetPixels=function(T,W,Z,j,X,lt,Mt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=xt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Mt!==void 0&&(Ct=Ct[Mt]),Ct){_t.bindFramebuffer(L.FRAMEBUFFER,Ct);try{const Pt=T.texture,Zt=Pt.format,qt=Pt.type;if(!Ht.textureFormatReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=T.width-j&&Z>=0&&Z<=T.height-X&&L.readPixels(W,Z,j,X,Jt.convert(Zt),Jt.convert(qt),lt)}finally{const Pt=A!==null?xt.get(A).__webglFramebuffer:null;_t.bindFramebuffer(L.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(T,W,Z,j,X,lt,Mt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=xt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Mt!==void 0&&(Ct=Ct[Mt]),Ct){const Pt=T.texture,Zt=Pt.format,qt=Pt.type;if(!Ht.textureFormatReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=T.width-j&&Z>=0&&Z<=T.height-X){_t.bindFramebuffer(L.FRAMEBUFFER,Ct);const Vt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Vt),L.bufferData(L.PIXEL_PACK_BUFFER,lt.byteLength,L.STREAM_READ),L.readPixels(W,Z,j,X,Jt.convert(Zt),Jt.convert(qt),0);const fe=A!==null?xt.get(A).__webglFramebuffer:null;_t.bindFramebuffer(L.FRAMEBUFFER,fe);const Me=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Wd(L,Me,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Vt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,lt),L.deleteBuffer(Vt),L.deleteSync(Me),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,W=null,Z=0){T.isTexture!==!0&&(Hi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1]);const j=Math.pow(2,-Z),X=Math.floor(T.image.width*j),lt=Math.floor(T.image.height*j),Mt=W!==null?W.x:0,Ct=W!==null?W.y:0;P.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,Z,0,0,Mt,Ct,X,lt),_t.unbindTexture()};const Of=L.createFramebuffer(),zf=L.createFramebuffer();this.copyTextureToTexture=function(T,W,Z=null,j=null,X=0,lt=null){T.isTexture!==!0&&(Hi("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,T=arguments[1],W=arguments[2],lt=arguments[3]||0,Z=null),lt===null&&(X!==0?(Hi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),lt=X,X=0):lt=0);let Mt,Ct,Pt,Zt,qt,Vt,fe,Me,Oe;const Ue=T.isCompressedTexture?T.mipmaps[lt]:T.image;if(Z!==null)Mt=Z.max.x-Z.min.x,Ct=Z.max.y-Z.min.y,Pt=Z.isBox3?Z.max.z-Z.min.z:1,Zt=Z.min.x,qt=Z.min.y,Vt=Z.isBox3?Z.min.z:0;else{const Mn=Math.pow(2,-X);Mt=Math.floor(Ue.width*Mn),Ct=Math.floor(Ue.height*Mn),T.isDataArrayTexture?Pt=Ue.depth:T.isData3DTexture?Pt=Math.floor(Ue.depth*Mn):Pt=1,Zt=0,qt=0,Vt=0}j!==null?(fe=j.x,Me=j.y,Oe=j.z):(fe=0,Me=0,Oe=0);const de=Jt.convert(W.format),kt=Jt.convert(W.type);let ke;W.isData3DTexture?(P.setTexture3D(W,0),ke=L.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(P.setTexture2DArray(W,0),ke=L.TEXTURE_2D_ARRAY):(P.setTexture2D(W,0),ke=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,W.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,W.unpackAlignment);const be=L.getParameter(L.UNPACK_ROW_LENGTH),Cn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),os=L.getParameter(L.UNPACK_SKIP_PIXELS),dn=L.getParameter(L.UNPACK_SKIP_ROWS),Ks=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Ue.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ue.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Zt),L.pixelStorei(L.UNPACK_SKIP_ROWS,qt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Vt);const Ce=T.isDataArrayTexture||T.isData3DTexture,vn=W.isDataArrayTexture||W.isData3DTexture;if(T.isDepthTexture){const Mn=xt.get(T),nn=xt.get(W),ln=xt.get(Mn.__renderTarget),sa=xt.get(nn.__renderTarget);_t.bindFramebuffer(L.READ_FRAMEBUFFER,ln.__webglFramebuffer),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,sa.__webglFramebuffer);for(let Di=0;Di<Pt;Di++)Ce&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.get(T).__webglTexture,X,Vt+Di),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.get(W).__webglTexture,lt,Oe+Di)),L.blitFramebuffer(Zt,qt,Mt,Ct,fe,Me,Mt,Ct,L.DEPTH_BUFFER_BIT,L.NEAREST);_t.bindFramebuffer(L.READ_FRAMEBUFFER,null),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(X!==0||T.isRenderTargetTexture||xt.has(T)){const Mn=xt.get(T),nn=xt.get(W);_t.bindFramebuffer(L.READ_FRAMEBUFFER,Of),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,zf);for(let ln=0;ln<Pt;ln++)Ce?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Mn.__webglTexture,X,Vt+ln):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Mn.__webglTexture,X),vn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,nn.__webglTexture,lt,Oe+ln):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,nn.__webglTexture,lt),X!==0?L.blitFramebuffer(Zt,qt,Mt,Ct,fe,Me,Mt,Ct,L.COLOR_BUFFER_BIT,L.NEAREST):vn?L.copyTexSubImage3D(ke,lt,fe,Me,Oe+ln,Zt,qt,Mt,Ct):L.copyTexSubImage2D(ke,lt,fe,Me,Zt,qt,Mt,Ct);_t.bindFramebuffer(L.READ_FRAMEBUFFER,null),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else vn?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(ke,lt,fe,Me,Oe,Mt,Ct,Pt,de,kt,Ue.data):W.isCompressedArrayTexture?L.compressedTexSubImage3D(ke,lt,fe,Me,Oe,Mt,Ct,Pt,de,Ue.data):L.texSubImage3D(ke,lt,fe,Me,Oe,Mt,Ct,Pt,de,kt,Ue):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,lt,fe,Me,Mt,Ct,de,kt,Ue.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,lt,fe,Me,Ue.width,Ue.height,de,Ue.data):L.texSubImage2D(L.TEXTURE_2D,lt,fe,Me,Mt,Ct,de,kt,Ue);L.pixelStorei(L.UNPACK_ROW_LENGTH,be),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Cn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,os),L.pixelStorei(L.UNPACK_SKIP_ROWS,dn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ks),lt===0&&W.generateMipmaps&&L.generateMipmap(ke),_t.unbindTexture()},this.copyTextureToTexture3D=function(T,W,Z=null,j=null,X=0){return T.isTexture!==!0&&(Hi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,j=arguments[1]||null,T=arguments[2],W=arguments[3],X=arguments[4]||0),Hi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,W,Z,j,X)},this.initRenderTarget=function(T){xt.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),_t.unbindTexture()},this.resetState=function(){E=0,R=0,A=null,_t.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ge._getDrawingBufferColorSpace(t),e.unpackColorSpace=ge._getUnpackColorSpace()}}const Wh={type:"change"},dl={type:"start"},hf={type:"end"},vr=new No,kh=new Mi,j1=Math.cos(70*pe.DEG2RAD),Be=new U,hn=2*Math.PI,Ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ba=1e-6;class $1 extends u0{constructor(t,e=null){super(t,e),this.state=Ae.NONE,this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Is.ROTATE,MIDDLE:Is.DOLLY,RIGHT:Is.PAN},this.touches={ONE:As.ROTATE,TWO:As.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Wn,this._lastTargetPosition=new U,this._quat=new Wn().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new xh,this._sphericalDelta=new xh,this._scale=1,this._panOffset=new U,this._rotateStart=new it,this._rotateEnd=new it,this._rotateDelta=new it,this._panStart=new it,this._panEnd=new it,this._panDelta=new it,this._dollyStart=new it,this._dollyEnd=new it,this._dollyDelta=new it,this._dollyDirection=new U,this._mouse=new it,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=J1.bind(this),this._onPointerDown=K1.bind(this),this._onPointerUp=Q1.bind(this),this._onContextMenu=rx.bind(this),this._onMouseWheel=nx.bind(this),this._onKeyDown=ix.bind(this),this._onTouchStart=sx.bind(this),this._onTouchMove=ox.bind(this),this._onMouseDown=tx.bind(this),this._onMouseMove=ex.bind(this),this._interceptControlDown=ax.bind(this),this._interceptControlUp=cx.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wh),this.update(),this.state=Ae.NONE}update(t=null){const e=this.object.position;Be.copy(e).sub(this.target),Be.applyQuaternion(this._quat),this._spherical.setFromVector3(Be),this.autoRotate&&this.state===Ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=hn:i>Math.PI&&(i-=hn),s<-Math.PI?s+=hn:s>Math.PI&&(s-=hn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=r!=this._spherical.radius}if(Be.setFromSpherical(this._spherical),Be.applyQuaternion(this._quatInverse),e.copy(this.target).add(Be),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const a=Be.length();r=this._clampDistance(a*this._scale);const c=a-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),o=!!c}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=c!==this.object.zoom;const l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),r=Be.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(vr.origin.copy(this.object.position),vr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(vr.direction))<j1?this.object.lookAt(this.target):(kh.setFromNormalAndCoplanarPoint(this.object.up,this.target),vr.intersectPlane(kh,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>Ba||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ba||this._lastTargetPosition.distanceToSquared(this.target)>Ba?(this.dispatchEvent(Wh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?hn/60*this.autoRotateSpeed*t:hn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Be.setFromMatrixColumn(e,0),Be.multiplyScalar(-t),this._panOffset.add(Be)}_panUp(t,e){this.screenSpacePanning===!0?Be.setFromMatrixColumn(e,1):(Be.setFromMatrixColumn(e,0),Be.crossVectors(this.object.up,Be)),Be.multiplyScalar(t),this._panOffset.add(Be)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Be.copy(s).sub(this.target);let o=Be.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*o/i.clientHeight,this.object.matrix),this._panUp(2*e*o/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,o=e-i.top,r=i.width,a=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(o/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/e.clientHeight),this._rotateUp(hn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,o=Math.sqrt(i*i+s*s);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),o=.5*(t.pageY+i.y);this._rotateEnd.set(s,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/e.clientHeight),this._rotateUp(hn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,o=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(r,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new it,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function K1(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function J1(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Q1(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(hf),this.state=Ae.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function tx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Is.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Ae.DOLLY;break;case Is.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ae.ROTATE}break;case Is.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ae.PAN}break;default:this.state=Ae.NONE}this.state!==Ae.NONE&&this.dispatchEvent(dl)}function ex(n){switch(this.state){case Ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function nx(n){this.enabled===!1||this.enableZoom===!1||this.state!==Ae.NONE||(n.preventDefault(),this.dispatchEvent(dl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(hf))}function ix(n){this.enabled!==!1&&this._handleKeyDown(n)}function sx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case As.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Ae.TOUCH_ROTATE;break;case As.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Ae.TOUCH_PAN;break;default:this.state=Ae.NONE}break;case 2:switch(this.touches.TWO){case As.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Ae.TOUCH_DOLLY_PAN;break;case As.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Ae.TOUCH_DOLLY_ROTATE;break;default:this.state=Ae.NONE}break;default:this.state=Ae.NONE}this.state!==Ae.NONE&&this.dispatchEvent(dl)}function ox(n){switch(this._trackPointer(n),this.state){case Ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Ae.NONE}}function rx(n){this.enabled!==!1&&n.preventDefault()}function ax(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function cx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Xh=new U(50,27,26),Yh=new U(-16,7,-42);function lx(n){const t=new wn(44,window.innerWidth/window.innerHeight,.5,4e3);t.position.copy(Xh);const e=new $1(t,n);return e.target.copy(Yh),e.enableDamping=!0,e.dampingFactor=.06,e.minDistance=4,e.maxDistance=230,e.minPolarAngle=pe.degToRad(12),e.maxPolarAngle=pe.degToRad(86),e.screenSpacePanning=!1,e.panSpeed=.9,e.rotateSpeed=.75,e.update(),{camera:t,controls:e,reset:()=>{t.position.copy(Xh),e.target.copy(Yh),e.update()},resize:(a,c)=>{t.aspect=a/c,t.updateProjectionMatrix()},followPosition:(a,c)=>{const l=new U(a.x,a.y+1,a.z),h=t.position.clone().sub(e.target);h.length()>16&&h.setLength(14);const u=Math.min(1,c*4.5);e.target.lerp(l,u),t.position.lerp(l.clone().add(h),u)},update:()=>{e.update(),e.target.x=pe.clamp(e.target.x,-140,125),e.target.z=pe.clamp(e.target.z,-130,120),e.target.y=pe.clamp(e.target.y,0,40)}}}const Gi=(n,t,e,i,s,o,r,a,c,l,h,u,f)=>({hour:n,top:new rt(t),sky:new rt(e),sunColor:new rt(i),sunIntensity:s,hemiSky:new rt(o),hemiGround:new rt(r),hemiIntensity:a,ambientColor:new rt(c),ambientIntensity:l,fogNear:h,fogFar:u,nightFactor:f}),xi=[Gi(0,"#070c1c","#161e36","#8ea8d9",.45,"#2b3a63","#1c1b29",.48,"#3b4c7a",.28,60,1500,1),Gi(5.5,"#6577ad","#f0b6a0","#ffbd8c",1.4,"#ffd9c4","#6b5a6e",.75,"#ffd3ba",.25,90,2100,.45),Gi(9,"#3f82d1","#a9d5f2","#fff5df",2.1,"#dff2ff","#7f8c6c",.92,"#fff4e0",.28,160,2900,0),Gi(13.5,"#3479cf","#9bcdf0","#fff7e6",2.25,"#e3f4ff","#7a8768",.95,"#fff6e5",.3,170,3e3,0),Gi(17.25,"#5d7fc2","#f4ba88","#ffb56b",2.05,"#ffe4bd","#6b5b7b",.85,"#ffdab5",.26,120,2400,.55),Gi(19.2,"#141f45","#34426b","#8e8ec4",.65,"#4a5b8c","#282538",.55,"#5a6b9c",.28,80,1750,.92),Gi(24,"#070c1c","#161e36","#8ea8d9",.45,"#2b3a63","#1c1b29",.48,"#3b4c7a",.28,60,1500,1)];function hx(n){const t=new rt("#f4ba88");n.background=t;const e=new sl("#f4ba88",120,2400);n.fog=e;const i=new i0("#ffe4bd","#6b5b7b",.85);i.position.set(0,40,0),n.add(i);const s=new r0("#ffb56b",2.05);s.castShadow=!0,s.shadow.mapSize.set(1024,1024),s.shadow.camera.near=1,s.shadow.camera.far=420,s.shadow.bias=-6e-4,s.shadow.normalBias=.02,n.add(s),n.add(s.target);const o=new a0("#ffdab5",.26);n.add(o);const r=700,a=new Float32Array(r*3);for(let m=0;m<r;m++){const x=Math.random()*Math.PI*2,M=.08+Math.random()*.92,v=Math.sqrt(1-M*M);a[m*3]=Math.cos(x)*v*2e3,a[m*3+1]=M*2e3,a[m*3+2]=Math.sin(x)*v*2e3}const c=new ye;c.setAttribute("position",new Xe(a,3));const l=new Xu({color:"#fff6d6",size:1.8,sizeAttenuation:!1,transparent:!0,opacity:0,fog:!1,depthWrite:!1}),h=new wp(c,l);h.frustumCulled=!1,h.renderOrder=-9,n.add(h);const u=new U(.6,.5,.3).normalize(),f={top:new rt,horizon:t,bottom:new rt,sunDir:u,sunColor:new rt,sunVis:1},d=new U;let g=45;const _=()=>{const m=s.shadow.camera;m.left=-g,m.right=g,m.top=g,m.bottom=-g,m.updateProjectionMatrix();const x=g*2/s.shadow.mapSize.x,M=u.clone().negate(),v=new U().crossVectors(M,new U(0,1,0)).normalize(),w=new U().crossVectors(v,M).normalize(),E=Math.round(d.dot(v)/x)*x,R=Math.round(d.dot(w)/x)*x,A=d.dot(M),y=new U().addScaledVector(v,E).addScaledVector(w,R).addScaledVector(M,A);s.target.position.copy(y),s.position.copy(y).addScaledVector(u,180),s.target.updateMatrixWorld(),s.updateMatrixWorld()};return{sunLight:s,hemiLight:i,ambientLight:o,updateTimeOfDay:m=>{const x=(m%24+24)%24;let M=xi[0],v=xi[xi.length-1];for(let y=0;y<xi.length-1;y++)if(x>=xi[y].hour&&x<=xi[y+1].hour){M=xi[y],v=xi[y+1];break}const w=Math.max(1e-4,v.hour-M.hour),E=pe.smoothstep((x-M.hour)/w,0,1);t.copy(M.sky).lerp(v.sky,E),f.top.copy(M.top).lerp(v.top,E),f.bottom.copy(t).multiplyScalar(.55),e.color.copy(t),e.near=pe.lerp(M.fogNear,v.fogNear,E),e.far=pe.lerp(M.fogFar,v.fogFar,E),s.color.copy(M.sunColor).lerp(v.sunColor,E),s.intensity=pe.lerp(M.sunIntensity,v.sunIntensity,E),i.color.copy(M.hemiSky).lerp(v.hemiSky,E),i.groundColor.copy(M.hemiGround).lerp(v.hemiGround,E),i.intensity=pe.lerp(M.hemiIntensity,v.hemiIntensity,E),o.color.copy(M.ambientColor).lerp(v.ambientColor,E),o.intensity=pe.lerp(M.ambientIntensity,v.ambientIntensity,E);const R=pe.lerp(M.nightFactor,v.nightFactor,E);if(x>=5.2&&x<=19){const b=(x-5.2)/13.8*Math.PI;u.set(-Math.cos(b)*34,Math.max(8,Math.sin(b)*36),14).normalize(),f.sunVis=pe.clamp(1-R*.6,0,1),f.sunColor.copy(s.color)}else u.set(18,26,-16).normalize(),f.sunVis=.15,f.sunColor.set("#c8d6ff");_(),l.opacity=pe.clamp((R-.65)/.35,0,.95),h.visible=l.opacity>.02;let A="深夜";return x>=5&&x<8.5?A="清晨":x>=8.5&&x<15.5?A="晴晝":x>=15.5&&x<18.4?A="夕陽黃昏":x>=18.4&&x<20.2&&(A="藍調薄暮"),{nightFactor:R,periodLabel:A,sky:f}},setShadowFocus:(m,x)=>{d.copy(m),g=pe.clamp(x*.75,32,85),_()},setShadowMapSize:m=>{var x;s.shadow.mapSize.x!==m&&(s.shadow.mapSize.set(m,m),(x=s.shadow.map)==null||x.dispose(),s.shadow.map=null)},update:m=>{h.position.copy(m.position)}}}const $t={roadY:.02,sidewalkY:.14,mainRoadZ:0,mainRoadWidth:5.6,mainRoadLength:72,crossRoadX:-6.5,crossRoadWidth:4.4,crossRoadLength:62,eastLaneX:21.8,eastLaneWidth:3.4,railwayX:9.5,railwayBedWidth:3.4,railwayLength:366,railGauge:1.067},pl=[{id:"bakery",label:"日和麵包坊",style:"bakery",x:-23.2,z:-8.4,width:5.6,depth:4.6,height:3.8,facing:"S",blockoutColor:"#f7ebd2",roofColor:"#c98242"},{id:"convenience_store",label:"便利商店",style:"convenience_store",x:-14.8,z:-8.6,width:6.4,depth:5,height:3.6,facing:"S",blockoutColor:"#e7f1ea",roofColor:"#5c8d76"},{id:"ramen_shop",label:"夕陽拉麵店",style:"ramen_shop",x:1.4,z:-8.4,width:5.2,depth:4.6,height:4,facing:"S",blockoutColor:"#f2dfd0",roofColor:"#b5563c"},{id:"cafe",label:"鐵道咖啡廳",style:"cafe",x:15.6,z:-8.6,width:5.6,depth:4.8,height:3.8,facing:"S",blockoutColor:"#f5e8d3",roofColor:"#7c5c43"},{id:"flower_shop",label:"小春日花屋",style:"flower_shop",x:27.6,z:-8.4,width:5.4,depth:4.6,height:3.6,facing:"S",blockoutColor:"#ebf2e4",roofColor:"#5d8a5e"},{id:"izakaya",label:"夕陽居酒屋",style:"izakaya",x:-23.4,z:8.5,width:5.4,depth:4.6,height:4,facing:"N",blockoutColor:"#e8d8c8",roofColor:"#733b2e"},{id:"bookstore",label:"老街書局",style:"bookstore",x:.8,z:8.5,width:5,depth:4.6,height:4.4,facing:"N",blockoutColor:"#e5dfd3",roofColor:"#4a5f78"},{id:"bathhouse",label:"富士乃湯（錢湯）",style:"bathhouse",x:27.8,z:8.8,width:6.4,depth:5.2,height:4.2,facing:"N",blockoutColor:"#ede4d5",roofColor:"#495a6b"},{id:"house_w_north",label:"西側民宅",style:"house",x:-23.2,z:-16.2,width:5.6,depth:4.6,height:4.6,facing:"S",blockoutColor:"#f0e5d5",roofColor:"#5e6b52"},{id:"house_nw",label:"北側民宅 A",style:"house",x:-14.8,z:-16.2,width:5.8,depth:4.6,height:4.8,facing:"S",blockoutColor:"#efe6d8",roofColor:"#6d584f"},{id:"house_n",label:"北側民宅 B",style:"house",x:1.6,z:-16.2,width:6,depth:4.8,height:5.2,facing:"S",blockoutColor:"#e8e2d5",roofColor:"#556270"},{id:"house_e_north",label:"鐵道北側民宅",style:"house",x:15.8,z:-16.4,width:5.8,depth:4.8,height:4.8,facing:"S",blockoutColor:"#f2e8da",roofColor:"#7a5a44"},{id:"apartment_west",label:"西街木造公寓",style:"apartment",x:-17.5,z:18.2,width:7.4,depth:4.8,height:5.5,facing:"N",blockoutColor:"#ebe0cc",roofColor:"#62564e"},{id:"apartment",label:"木造公寓",style:"apartment",x:1.2,z:16.2,width:7.4,depth:4.8,height:5.6,facing:"N",blockoutColor:"#efe2ce",roofColor:"#7a5448"},{id:"house_se",label:"車站南側民宅",style:"house",x:27.6,z:17.6,width:6,depth:4.8,height:5,facing:"N",blockoutColor:"#ece4d8",roofColor:"#586778"}],Yt={x:-14.8,z:9.8,width:7.8,depth:7.2},le={x:13,z:10.8,width:3.4,depth:10.8,height:.78};function ux(n){const t=new te;t.name="TownGrid";const e=new h0(76,76,"#7a6856","#88a16b");e.position.y=.008,(Array.isArray(e.material)?e.material:[e.material]).forEach(r=>{r.transparent=!0,r.opacity=.25}),t.add(e),t.add(fx()),t.add(dx());const s=px();t.add(s.railwayGroup),t.add(mx()),t.add(gx());const o=_x();return o.visible=!1,o.userData.dynamic=!0,t.add(o),n.add(t),{group:t,setGridVisible:r=>{e.visible=r},setBlockoutVisible:r=>{o.visible=r},setCrossingActive:s.setCrossingActive,isCrossingClosed:s.isCrossingClosed,update:(r,a)=>{s.updateSignals(r,a)}}}function fx(){const n=new te;n.name="Roads";const t=new ct({color:"#4f5157",roughness:.9}),e=new ct({color:"#5a5c62",roughness:.92}),i=new ct({color:"#f2ede2",roughness:.75}),s=new ct({color:"#e8b349",roughness:.75}),o=new ht(new At($t.mainRoadLength,.04,$t.mainRoadWidth),t);o.position.set(0,$t.roadY,$t.mainRoadZ),o.receiveShadow=!0,n.add(o);const r=new ht(new At($t.crossRoadWidth,.04,$t.crossRoadLength),t);r.position.set($t.crossRoadX,$t.roadY-.002,0),r.receiveShadow=!0,n.add(r);const a=new ht(new At($t.eastLaneWidth,.04,52),e);a.position.set($t.eastLaneX,$t.roadY-.004,0),a.receiveShadow=!0,n.add(a);const c=new At(1.5,.01,.14),l=[];for(let _=-33;_<=33;_+=3)_>-10.5&&_<-2.5||_>6.5&&_<12.5||_>19.2&&_<24.4||l.push(_);const h=new Ee(c,s,l.length),u=new xe;l.forEach((_,p)=>{u.position.set(_,$t.roadY+.025,$t.mainRoadZ),u.rotation.set(0,0,0),u.updateMatrix(),h.setMatrixAt(p,u.matrix)}),h.receiveShadow=!0,n.add(h);const f=new At(.42,.01,1.9),d=[];for(const _ of[-9.7,-3.3])for(let p=-2.1;p<=2.11;p+=.84)d.push({x:_,z:p,rotY:Math.PI/2});for(const _ of[-3.9,3.9])for(let p=-8.1;p<=-4.9;p+=.8)d.push({x:p,z:_,rotY:0});for(const _ of[-3.7,3.7])for(let p=20.6;p<=23.1;p+=.8)d.push({x:p,z:_,rotY:0});const g=new Ee(f,i,d.length);d.forEach((_,p)=>{u.position.set(_.x,$t.roadY+.026,_.z),u.rotation.set(0,_.rotY,0),u.updateMatrix(),g.setMatrixAt(p,u.matrix)}),g.receiveShadow=!0,n.add(g);for(const _ of[6.9,12.1]){const p=new ht(new At(.32,.01,$t.mainRoadWidth-.5),i);p.position.set(_,$t.roadY+.026,0),p.receiveShadow=!0,n.add(p)}return n}function dx(){const n=new te;n.name="Sidewalks";const t=new ct({color:"#d8cbb8",roughness:.86}),e=$t.sidewalkY,i=e/2,s=[[-22.3,-4,27.2,2.4],[-9.8,-17,2.2,24],[-22.3,4,27.2,2.4],[-9.8,17,2.2,24],[1.7,-4,12,2.4],[-3.2,-17,2.2,24],[1.7,4,12,2.4],[-3.2,17,2.2,24],[15.65,-4,8.7,2.4],[15.65,4,8.7,2.4],[29.7,-4,12.4,2.4],[29.7,4,12.4,2.4]];for(const[o,r,a,c]of s){const l=new ht(new At(a,e,c),t);l.position.set(o,i,r),l.receiveShadow=!0,l.castShadow=!0,n.add(l)}return n}function px(){const n=new te;n.name="RailwayAndCrossing";const t=$t.railwayX,e=$t.railwayLength,i=new ht(new At($t.railwayBedWidth,.08,e),new ct({color:"#7b746c",roughness:.96}));i.position.set(t,.03,0),i.receiveShadow=!0,n.add(i);const s=new ct({color:"#5a4332",roughness:.92}),o=new At(2.1,.09,.24),r=[];for(let w=-e/2+.5;w<=e/2-.5;w+=.65)Math.abs(w)<3||r.push(w);const a=new Ee(o,s,r.length),c=new xe;r.forEach((w,E)=>{c.position.set(t,.09,w),c.rotation.set(0,0,0),c.updateMatrix(),a.setMatrixAt(E,c.matrix)}),a.castShadow=!0,a.receiveShadow=!0,n.add(a);const l=new ct({color:"#8f969e",roughness:.4,metalness:.7}),h=$t.railGauge/2;for(const w of[-h,h]){const E=new ht(new At(.08,.1,e),l);E.position.set(t+w,.14,0),E.castShadow=!0,n.add(E)}const u=new ht(new At(2.9,.08,$t.mainRoadWidth+4.4),new ct({color:"#8f8478",roughness:.88}));u.position.set(t,.07,0),u.receiveShadow=!0,n.add(u);const f=[],d=[],g=[{x:t-1.9,z:-3.2,rotY:0},{x:t+1.9,z:3.2,rotY:Math.PI}],_=new ct({color:"#f2c12e",roughness:.65}),p=new ct({color:"#2b2b2f",roughness:.7}),m=new ct({color:"#f4f0e8",roughness:.7});for(const w of g){const E=new te;E.position.set(w.x,.14,w.z),E.rotation.y=w.rotY;for(let I=0;I<6;I++){const k=new ht(new oe(.08,.08,.55,8),I%2===0?_:p);k.position.y=.275+I*.55,k.castShadow=!0,E.add(k)}const R=new At(.95,.14,.06),A=new ht(R,m);A.position.set(0,2.75,.1),A.rotation.z=Math.PI/4,E.add(A);const y=new ht(R,m);y.position.set(0,2.75,.1),y.rotation.z=-Math.PI/4,E.add(y);const b=new ct({color:"#ff4d4d",emissive:"#ff2a2a",emissiveIntensity:.2}),D=new ct({color:"#ff4d4d",emissive:"#ff2a2a",emissiveIntensity:.2});f.push({left:b,right:D});const V=new ht(new At(.75,.26,.16),p);V.position.set(0,2.15,.08),E.add(V);const G=new he(.09,10,8),Y=new ht(G,b);Y.position.set(-.2,2.15,.15),E.add(Y);const C=new ht(G,D);C.position.set(.2,2.15,.15),E.add(C);const N=new ht(new At(.36,.85,.36),_);N.position.set(.34,.42,0),N.castShadow=!0,E.add(N);const z=new te;z.userData.dynamic=!0,z.position.set(.34,.82,0),z.rotation.x=-Math.PI*.44;for(let I=0;I<6;I++){const k=new ht(new At(.07,.09,.52),I%2===0?_:p);k.position.z=.26+I*.52,k.castShadow=!0,z.add(k)}E.add(z),d.push(z),n.add(E)}let x=!1,M=-Math.PI*.44;return{railwayGroup:n,setCrossingActive:w=>{x=w},isCrossingClosed:()=>x||M>-.35,updateSignals:(w,E)=>{const R=x?0:-Math.PI*.44,A=Math.min(1,E*2.6);M+=(R-M)*A;for(const y of d)y.rotation.x=M;if(x){const y=Math.sin(w*10.5)>0;for(const b of f)b.left.emissiveIntensity=y?2.2:.1,b.right.emissiveIntensity=y?.1:2.2}else for(const y of f)y.left.emissiveIntensity=.08,y.right.emissiveIntensity=.08}}}function mx(){const n=new te;n.name="PocketParkBase";const t=new ht(new At(Yt.width,.16,Yt.depth),new ct({color:"#7ea862",roughness:.92}));t.position.set(Yt.x,.08,Yt.z),t.receiveShadow=!0,n.add(t);const e=new ht(new At(2.2,.04,Yt.depth-.8),new ct({color:"#dfd1bc",roughness:.85}));e.position.set(Yt.x,.17,Yt.z),e.receiveShadow=!0,n.add(e);const i=new ht(new At(Yt.width-1.2,.04,1.8),new ct({color:"#dfd1bc",roughness:.85}));i.position.set(Yt.x,.17,Yt.z),i.receiveShadow=!0,n.add(i);const s=new ct({color:"#8f6948",roughness:.9}),o=new ht(new At(Yt.width,.28,.16),s);return o.position.set(Yt.x,.22,Yt.z-Yt.depth/2+.08),o.castShadow=!0,n.add(o),n}function gx(){const n=new te;n.name="StationPlatform";const t=new ht(new At(le.width,le.height,le.depth),new ct({color:"#c7c1b8",roughness:.88}));t.position.set(le.x,le.height/2,le.z),t.castShadow=!0,t.receiveShadow=!0,n.add(t);const e=new ht(new At(.24,.02,le.depth-.4),new ct({color:"#f0c438",roughness:.7}));e.position.set(le.x-le.width/2+.35,le.height+.01,le.z),n.add(e);const i=new ct({color:"#586c7a",roughness:.8}),s=new ht(new At(2.6,.14,5.8),i);s.position.set(le.x+.1,le.height+2.55,le.z),s.castShadow=!0,n.add(s);const o=new ct({color:"#474c52",roughness:.7});for(const r of[-2.2,2.2]){const a=new ht(new oe(.08,.08,2.5,8),o);a.position.set(le.x+.4,le.height+1.25,le.z+r),a.castShadow=!0,n.add(a)}return n}function _x(){const n=new te;n.name="BuildingLotBlockouts";for(const t of pl){const e=new te;e.name=`Lot_${t.id}`,e.position.set(t.x,0,t.z);const i=new ht(new At(t.width+.5,.14,t.depth+.5),new ct({color:"#cabda9",roughness:.9}));i.position.y=.07,i.receiveShadow=!0,e.add(i);const s=new ht(new At(t.width,t.height,t.depth),new ct({color:t.blockoutColor,roughness:.85}));s.position.y=.14+t.height/2,s.castShadow=!0,s.receiveShadow=!0,e.add(s);const o=new ht(new At(t.width+.35,.36,t.depth+.35),new ct({color:t.roofColor,roughness:.82}));o.position.y=.14+t.height+.18,o.castShadow=!0,o.receiveShadow=!0,e.add(o);const r=t.facing==="S"?t.depth/2+.02:-t.depth/2-.02,a=new ht(new At(1.4,2.1,.08),new ct({color:"#7d563c",roughness:.85}));a.position.set(0,.14+1.05,r),e.add(a),n.add(e)}return n}function uf(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),o={},r={},a=n[0].morphTargetsRelative,c=new ye;let l=0;for(let h=0;h<n.length;++h){const u=n[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=n[f].attributes.position.count}c.setIndex(u)}for(const h in o){const u=Zh(o[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in r){const u=r[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let _=0;_<r[h].length;++_)d.push(r[h][_][f]);const g=Zh(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Zh(n){let t,e,i,s=-1,o=0;for(let l=0;l<n.length;++l){const h=n[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=h.count*e}const r=new t(o),a=new Xe(r,e,i);let c=0;for(let l=0;l<n.length;++l){const h=n[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){const _=h.getComponent(f,g);a.setComponent(f+u,g,_)}}else r.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const qh=new rt("#ffffff"),Mr=new U;class qs{constructor(t){rs(this,"parts",new Map);rs(this,"stack",[new ee]);rs(this,"tmpM",new ee);rs(this,"tmpE",new xn);rs(this,"tmpQ",new Wn);this.remap=t}top(){return this.stack[this.stack.length-1]}push(t,e,i,s=0,o=1,r=1,a=1){this.tmpQ.setFromEuler(this.tmpE.set(0,s,0));const c=new ee().compose(new U(t,e,i),this.tmpQ,new U(o,r,a));return this.stack.push(this.top().clone().multiply(c)),this}pop(){return this.stack.length>1&&this.stack.pop(),this}add(t,e,i=qh,s={}){if(e.index===null){const l=e.attributes.position.count,h=[];for(let u=0;u<l;u++)h.push(u);e.setIndex(h)}for(const l of Object.keys(e.attributes))l!=="position"&&l!=="normal"&&l!=="uv"&&e.deleteAttribute(l);e.attributes.normal||e.computeVertexNormals(),e.attributes.uv||e.setAttribute("uv",new Ft(new Float32Array(e.attributes.position.count*2),2)),e.applyMatrix4(this.top()),s.keepUv||xx(e);const o=i instanceof rt?i.clone():new rt(i);this.remap&&(t=this.remap(t,o));const r=e.attributes.position.count,a=new Float32Array(r*3);for(let l=0;l<r;l++)a[l*3]=o.r,a[l*3+1]=o.g,a[l*3+2]=o.b;e.setAttribute("color",new Xe(a,3));let c=this.parts.get(t);c||(c=[],this.parts.set(t,c)),c.push(e)}box(t,e,i,s,o,r,a,c,l=0,h=0,u=0){const f=new At(e,i,s);(l||h||u)&&f.applyMatrix4(this.tmpM.makeRotationFromEuler(this.tmpE.set(l,h,u))),f.translate(o,r,a),this.add(t,f,c)}boxUp(t,e,i,s,o,r,a,c){this.box(t,e,i,s,o,r+i/2,a,c)}cyl(t,e,i,s,o,r,a,c,l,h=0,u=0,f=!1,d=0,g=Math.PI*2){const _=new oe(e,i,s,o,1,f,d,g);(h||u)&&_.applyMatrix4(this.tmpM.makeRotationFromEuler(this.tmpE.set(h,0,u))),_.translate(r,a,c),this.add(t,_,l)}cone(t,e,i,s,o,r,a,c,l=0){const h=new Ai(e,i,s);l&&h.rotateY(l),h.translate(o,r+i/2,a),this.add(t,h,c)}sphere(t,e,i,s,o,r,a=10,c=8,l=Math.PI,h=1,u=1,f=1){const d=new he(e,a,c,0,Math.PI*2,0,l);(h!==1||u!==1||f!==1)&&d.scale(h,u,f),d.translate(i,s,o),this.add(t,d,r)}lathe(t,e,i,s,o,r,a){const c=new qi(e.map(([l,h])=>new it(l,h)),i);c.translate(s,o,r),this.add(t,c,a)}polys(t,e,i){const s=[],o=[],r=[],a=new U,c=new U,l=new U;for(const u of e){if(u.length<3)continue;a.fromArray(u[0]),c.fromArray(u[1]),l.fromArray(u[2]);const f=new U().subVectors(c,a).cross(new U().subVectors(l,a)).normalize(),d=s.length/3;for(const g of u)s.push(g[0],g[1],g[2]),o.push(f.x,f.y,f.z);for(let g=1;g<u.length-1;g++)r.push(d,d+g,d+g+1)}const h=new ye;h.setAttribute("position",new Ft(s,3)),h.setAttribute("normal",new Ft(o,3)),h.setIndex(r),this.add(t,h,i)}sign(t,e,i,s,o,r,a,c=0){const l=new At(e,i,s),h=l.attributes.uv;for(let u=0;u<h.count;u++)if(Math.floor(u/4)===4){const d=h.getX(u),g=h.getY(u);h.setXY(u,t.u0+(t.u1-t.u0)*d,t.v0+(t.v1-t.v0)*g)}else h.setXY(u,t.u0+.002,t.v0+.002);c&&l.rotateY(c),l.translate(o,r,a),this.add("sign",l,qh,{keepUv:!0})}isEmpty(){return this.parts.size===0}build(){const t=new Map;for(const[e,i]of this.parts){if(i.length===0)continue;const s=uf(i,!1);if(s){s.computeBoundingBox(),s.computeBoundingSphere(),t.set(e,s);for(const o of i)o.dispose()}}return this.parts.clear(),t}}function xx(n){const t=n.attributes.position,e=n.attributes.normal,i=n.attributes.uv;for(let s=0;s<t.count;s++){Mr.set(e.getX(s),e.getY(s),e.getZ(s));const o=Math.abs(Mr.x),r=Math.abs(Mr.y),a=Math.abs(Mr.z),c=t.getX(s),l=t.getY(s),h=t.getZ(s);r>=o&&r>=a?o>a?i.setXY(s,h,c):i.setXY(s,c,h):o>=a?i.setXY(s,h,l):i.setXY(s,c,l)}i.needsUpdate=!0}function ml(n,t,e,i=!0){const s=new te;s.name=e;for(const[o,r]of n){const a=new ht(r,t(o));a.name=`${e}_${o}`;const c=o!=="glass"&&o!=="sign"&&o!=="glow"&&o!=="water";a.castShadow=i&&c,a.receiveShadow=i&&o!=="glow",s.add(a)}return s}const jh=["#ff7b9c","#ffd166","#ff6b6b","#c38cf2","#ff9f4a","#ffffff"];let Ga=0;function Dt(n,t,e,i,s,o,r){const a=o.top==="arch",c=a?s-i/2:s;if(!r){n.box("glass",i,c,.06,t,e+c/2,.02),a&&n.cyl("glass",i/2,i/2,.06,8,t,e+c,.02,void 0,Math.PI/2,0,!1,Math.PI/2,Math.PI);return}n.box("glass",i,c,.04,t,e+c/2,0);const l=.1;if(n.box(o.frameMat,l,c+.06,.12,t-i/2-l/2,e+c/2,.06,o.frame),n.box(o.frameMat,l,c+.06,.12,t+i/2+l/2,e+c/2,.06,o.frame),a||n.box(o.frameMat,i+l*2,l,.12,t,e+c+l/2,.06,o.frame),o.mullion&&(n.box("wood",.045,c,.05,t,e+c/2,.035,"#4a3a2e"),n.box("wood",i,.045,.05,t,e+c*.64,.035,"#4a3a2e")),o.lattice){for(let h=1;h<4;h++)n.box("wood",.035,c,.05,t-i/2+i*h/4,e+c/2,.035,"#3d2a1e");for(let h=1;h<3;h++)n.box("wood",i,.035,.05,t,e+c*h/3,.035,"#3d2a1e")}switch(o.sill&&n.box(o.frameMat,i+.32,.09,.24,t,e-.045,.1,o.frame),o.top){case"cornice":n.box(o.frameMat,i+.28,.08,.16,t,e+s+.14,.08,o.frame),n.box(o.frameMat,i+.44,.1,.26,t,e+s+.23,.13,o.frame);break;case"pediment":n.box(o.frameMat,i+.4,.1,.22,t,e+s+.15,.11,o.frame),ta(n,o.frameMat,i+.5,.42,.2,t,e+s+.2,.1,o.frame);break;case"keystone":n.box(o.frameMat,i+.3,.16,.12,t,e+s+.18,.06,o.frame),n.box(o.frameMat,.24,.34,.16,t,e+s+.2,.08,o.frame);break;case"eyebrow":n.box("roof",i+.5,.06,.5,t,e+s+.32,.25,"#8a8580",.3);break;case"arch":{n.cyl("glass",i/2,i/2,.04,10,t,e+c,0,void 0,Math.PI/2,0,!1,Math.PI/2,Math.PI);const h=new Pe(i/2+.05,.07,4,10,Math.PI);h.translate(t,e+c,.06),n.add(o.frameMat,h,o.frame),n.box(o.frameMat,.2,.3,.16,t,e+c+i/2+.06,.08,o.frame),o.mullion&&n.box("wood",.04,i/2,.05,t,e+c+i/4,.035,"#4a3a2e");break}}if(o.shutters){const h=i*.52;for(const u of[-1,1]){const f=t+u*(i/2+l+h/2+.02);n.box("wood",h,c,.05,f,e+c/2,.04,o.shutters);for(let d=1;d<6;d++)n.box("wood",h*.86,.025,.03,f,e+c*d/6,.08,o.shutters)}}if(o.flowers){n.box("wood",i+.12,.22,.26,t,e+.02,.22,"#7a5236"),n.box("plain",i,.08,.2,t,e+.16,.22,"#4f7f3c");const h=Math.max(3,Math.round(i/.28));for(let u=0;u<h;u++){Ga=(Ga+7)%jh.length;const f=new Oo(.1,0);f.translate(t-i/2+i*(u+.5)/h,e+.26,.24+(u%2-.5)*.06),n.add("plain",f,jh[Ga])}}o.balconet&&zo(n,i+.3,e+.04,.3,.85,"#2e2b2a")}function zo(n,t,e,i,s,o,r=0){n.box("metal",t,.05,.05,r,e+s,i,o),n.box("metal",t,.035,.035,r,e+.08,i,o);const a=Math.max(2,Math.round(t/.16));for(let c=0;c<=a;c++)n.box("metal",.022,s,.022,r-t/2+t*c/a,e+s/2,i,o)}function ta(n,t,e,i,s,o,r,a,c){const l=e/2,h=a+s/2,u=a-s/2,f=[[[o-l,r,h],[o+l,r,h],[o,r+i,h]],[[o+l,r,u],[o-l,r,u],[o,r+i,u]],[[o+l,r,h],[o+l,r,u],[o,r+i,u],[o,r+i,h]],[[o-l,r,u],[o-l,r,h],[o,r+i,h],[o,r+i,u]],[[o-l,r,u],[o+l,r,u],[o+l,r,h],[o-l,r,h]]];n.polys(t,f,c)}function li(n,t,e,i,s,o=!0,r="stone"){if(n.box(r,t,.16,.14,0,e+.08,.07,i),s&&o){const a=Math.floor(t/.3);for(let c=0;c<a;c++)n.box(r,.13,.13,.13,-t/2+.15+c*(t/a),e+.24,.15,i)}n.box(r,t+.26,.16,s?.38:.3,0,e+.38,s?.19:.15,i),s&&n.box(r,t+.36,.08,.44,0,e+.5,.22,i)}function hi(n,t,e,i,s="stone"){n.box(s,t+.06,.16,.12,0,e,.06,i)}function Ri(n,t,e,i,s,o){let r=e,a=0;for(;r+.4<i;){const c=a%2===0?.62:.4;n.box("stone",c,.4,.07,t+s*c/2,r+.2,.035,o),r+=.46,a++}}function gl(n,t,e,i,s,o=.46){n.box("stone",o+.14,.22,.22,t,e+.11,.11,s),n.box("stone",o,i-.44,.13,t,e+i/2,.065,s),n.box("stone",o+.18,.22,.24,t,e+i-.11,.12,s)}function Eo(n,t,e,i,s,o,r,a){n.box("stone",o*2.6,.24,o*2.6,t,i+.12,e,r),n.cyl("stone",o*.86,o,s-.6,a?12:6,t,i+.24+(s-.6)/2,e,r),a&&n.cyl("stone",o*1.15,o*.86,.16,12,t,i+s-.28,e,r),n.box("stone",o*2.7,.2,o*2.7,t,i+s-.1,e,r)}function es(n,t,e,i,s,o,r=0){if(n.box("stone",t,.14,.34,r,e+.07,i,s),n.box("stone",t+.06,.12,.4,r,e+.86,i,s),!o){n.box("stone",t,.66,.16,r,e+.47,i,s);return}const a=Math.max(2,Math.round(t/.27));for(let c=0;c<a;c++){const l=r-t/2+t*(c+.5)/a;n.cyl("stone",.05,.075,.66,6,l,e+.47,i,s)}for(const c of[r-t/2+.12,r+t/2-.12])n.box("stone",.26,.8,.38,c,e+.47,i,s)}function js(n,t,e,i,s,o,r,a,c="#efe6d6"){const l=t/2+s,h=e/2+s,u=Math.max(0,l-h),f=o+i,d=[[[-l,o,h],[l,o,h],[u,f,0],[-u,f,0]],[[l,o,-h],[-l,o,-h],[-u,f,0],[u,f,0]],[[l,o,h],[l,o,-h],[u,f,0]],[[-l,o,-h],[-l,o,h],[-u,f,0]]];n.polys("roof",d,r),n.polys("stone",[[[-l,o,-h],[l,o,-h],[l,o,h],[-l,o,h]]],c),a&&(n.box("stone",l*2+.04,.2,.1,0,o-.08,h,c),n.box("stone",l*2+.04,.2,.1,0,o-.08,-h,c),n.box("stone",.1,.2,h*2,l,o-.08,0,c),n.box("stone",.1,.2,h*2,-l,o-.08,0,c),u>.05&&n.box("roof",u*2+.2,.14,.22,0,f+.02,0,new rt(r).multiplyScalar(.7)))}function An(n,t,e,i,s,o,r,a,c,l,h="#5a3d2b"){const u=t/2+s,f=e/2+s,d=s*i/(e/2),g=o-d,_=o+i,p=.14,m=[[[-u,g,f],[u,g,f],[u,_,0],[-u,_,0]],[[u,g,-f],[-u,g,-f],[-u,_,0],[u,_,0]],[[u,g-p,f],[-u,g-p,f],[-u,_-p,0],[u,_-p,0]],[[-u,g-p,-f],[u,g-p,-f],[u,_-p,0],[-u,_-p,0]],[[-u,g-p,f],[u,g-p,f],[u,g,f],[-u,g,f]],[[u,g-p,-f],[-u,g-p,-f],[-u,g,-f],[u,g,-f]]];n.polys("roof",m,r);const x=t/2-.02,M=e/2;if(n.polys(a,[[[x,o,M],[x,o,-M],[x,_-.05,0]],[[-x,o,-M],[-x,o,M],[-x,_-.05,0]]],c),l){n.box("roof",u*2+.2,.2,.3,0,_+.04,0,new rt(r).multiplyScalar(.7));const v=Math.hypot(f,i+d),w=Math.atan2(i+d,f);for(const E of[-u+.04,u-.04])n.box("wood",.08,.26,v,E,(g+_)/2-.06,f/2,h,w),n.box("wood",.08,.26,v,E,(g+_)/2-.06,-f/2,h,-w)}}function ff(n,t,e,i,s,o,r,a,c){const l=t/2+.15,h=e/2+.15,u=l-o,f=h-o,d=r+i,g=[[[-l,r,h],[l,r,h],[u,d,f],[-u,d,f]],[[l,r,-h],[-l,r,-h],[-u,d,-f],[u,d,-f]],[[l,r,h],[l,r,-h],[u,d,-f],[u,d,f]],[[-l,r,-h],[-l,r,h],[-u,d,f],[-u,d,-f]]];n.polys("roof",g,a),js(n,u*2,f*2,s,.05,d,a,!1),c&&(n.box("metal",u*2+.12,.08,.08,0,d+.02,f,"#c9a24c"),n.box("metal",u*2+.12,.08,.08,0,d+.02,-f,"#c9a24c"),n.box("metal",.08,.08,f*2,u,d+.02,0,"#c9a24c"),n.box("metal",.08,.08,f*2,-u,d+.02,0,"#c9a24c"))}function To(n,t,e,i,s,o,r,a,c,l=!1){n.box("wall",s+.3,o,1.3,t,e+o/2,i-1.3/2,a),n.push(t,e+o,i-1.3/2,Math.PI/2),An(n,1.3,s+.3,.55,.12,0,r,"wall",a,!1),n.pop(),n.push(0,0,i+.01),Dt(n,t,e+.18,s-.2,o-.4,{frameMat:"stone",frame:a,top:l?"arch":"none",sill:!0,mullion:!0},c),n.pop()}function ks(n,t,e,i,s,o){n.box("brick",.7,s,.55,t,e+s/2,i),n.box("stone",.86,.14,.72,t,e+s+.07,i,"#d8d0c2"),o&&(n.cyl("brick",.1,.12,.35,6,t-.15,e+s+.3,i,"#c98a66"),n.cyl("brick",.1,.12,.35,6,t+.15,e+s+.3,i,"#c98a66"))}function Xn(n,t,e,i,s=1){n.sphere("metal",.12*s,t,e+.12*s,i,"#d6ad4f",8,6),n.cone("metal",.06*s,.7*s,6,t,e+.2*s,i,"#d6ad4f")}function ui(n){let t=n>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Pi(n,t,e=!0){const i=new kn(n);return e&&(i.colorSpace=Fe),i.wrapS=vo,i.wrapT=vo,i.repeat.set(1/t,1/t),i.anisotropy=4,i.generateMipmaps=!0,i.minFilter=yi,i.magFilter=Nn,i}function qn(n=256){const t=document.createElement("canvas");return t.width=n,t.height=n,{c:t,ctx:t.getContext("2d")}}function ss(n,t,e,i,s){const o=ui(s);for(let r=0;r<e;r++){const a=o()>.5?255:0;n.fillStyle=`rgba(${a},${a},${a},${i*o()})`;const c=1+o()*2.5;n.fillRect(o()*t,o()*t,c,c)}}function vx(){const{c:n,ctx:t}=qn();t.fillStyle="#f4efe6",t.fillRect(0,0,256,256),ss(t,256,2600,.09,11);const e=ui(5);for(let i=0;i<14;i++){const s=e()*256,o=t.createLinearGradient(0,0,0,256);o.addColorStop(0,"rgba(120,105,90,0.07)"),o.addColorStop(1,"rgba(120,105,90,0)"),t.fillStyle=o,t.fillRect(s,0,3+e()*8,140+e()*110)}return Pi(n,3.2)}function Mx(){const{c:n,ctx:t}=qn();t.fillStyle="#bdb3a4",t.fillRect(0,0,256,256);const e=ui(21),i=4,s=256/i;for(let o=0;o<i;o++){const r=o%2===0?0:64;for(let a=-64;a<256;a+=128){const c=232+Math.floor(e()*20);t.fillStyle=`rgb(${c},${c-6},${c-16})`,t.fillRect(a+r+2,o*s+2,124,s-4);const l=t.createLinearGradient(0,o*s,0,o*s+s);l.addColorStop(0,"rgba(255,255,255,0.12)"),l.addColorStop(1,"rgba(0,0,0,0.08)"),t.fillStyle=l,t.fillRect(a+r+2,o*s+2,124,s-4)}}return ss(t,256,1800,.08,31),Pi(n,2.4)}function bx(){const{c:n,ctx:t}=qn();t.fillStyle="#d8cfc2",t.fillRect(0,0,256,256);const e=ui(41),i=16,s=256/i,o=32;for(let r=0;r<i;r++){const a=r%2===0?0:o/2;for(let c=-o;c<256+o;c+=o){const l=e(),h=150+Math.floor(l*50),u=72+Math.floor(l*28),f=52+Math.floor(l*20);t.fillStyle=`rgb(${h},${u},${f})`,t.fillRect(c+a+1.5,r*s+1.5,o-3,s-3)}}return ss(t,256,1500,.1,43),Pi(n,2)}function yx(){const{c:n,ctx:t}=qn();t.fillStyle="#b9b2a8",t.fillRect(0,0,256,256);const e=ui(61),i=10,s=256/i,o=256/8;for(let r=i-1;r>=0;r--){const a=r%2===0?0:o/2;for(let c=-o;c<256+o;c+=o){const l=205+Math.floor(e()*45);t.fillStyle=`rgb(${l},${l-4},${l-8})`,t.beginPath();const h=c+a+o/2,u=r*s;t.moveTo(h-o/2+1,u),t.lineTo(h+o/2-1,u),t.lineTo(h+o/2-1,u+s*.9),t.quadraticCurveTo(h,u+s*1.35,h-o/2+1,u+s*.9),t.closePath(),t.fill(),t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(h-o/2,u+s*.86,o,2)}}return ss(t,256,900,.08,67),Pi(n,2.2)}function wx(){const{c:n,ctx:t}=qn(128);t.fillStyle="#d9bf9c",t.fillRect(0,0,128,128);const e=ui(81);for(let i=0;i<128;i+=16){const s=200+Math.floor(e()*40);t.fillStyle=`rgb(${s},${s-30},${s-70})`,t.fillRect(i+1,0,14,128);for(let o=0;o<6;o++)t.fillStyle=`rgba(90,60,30,${.08+e()*.1})`,t.fillRect(i+2+e()*11,0,1,128)}return Pi(n,1.6)}function $h(n="#d9cfbf",t=91){const{c:e,ctx:i}=qn();i.fillStyle="#a89c8a",i.fillRect(0,0,256,256);const s=ui(t),o=8,r=256/o,a=new rt(n);for(let c=0;c<o;c++)for(let l=0;l<o;l++){const h=.9+s()*.14;i.fillStyle=`rgb(${Math.floor(a.r*255*h)},${Math.floor(a.g*255*h)},${Math.floor(a.b*255*h)})`,i.fillRect(c*r+1.5,l*r+1.5,r-3,r-3)}return ss(i,256,1400,.07,t+1),Pi(e,4)}function Sx(){const{c:n,ctx:t}=qn();return t.fillStyle="#5a5c62",t.fillRect(0,0,256,256),ss(t,256,5e3,.12,101),Pi(n,6)}function Ex(){const{c:n,ctx:t}=qn();t.fillStyle="#9ab477",t.fillRect(0,0,256,256);const e=ui(111);for(let i=0;i<3500;i++){const s=e();t.fillStyle=s>.5?`rgba(70,110,50,${.15*e()})`:`rgba(200,220,140,${.18*e()})`,t.fillRect(e()*256,e()*256,1+e()*2,2+e()*4)}return Pi(n,7)}function Tx(){const{c:t,ctx:e}=qn(1024);e.fillStyle="#d8ccb6",e.fillRect(0,0,1024,1024);const i=ui(121),s=1024/40;for(let l=0;l<40;l++)for(let h=0;h<40;h++){const u=.92+i()*.1;e.fillStyle=`rgb(${Math.floor(222*u)},${Math.floor(210*u)},${Math.floor(188*u)})`,e.fillRect(l*s+1,h*s+1,s-2,s-2)}const o=1024/2,r=1024/2,a=[[.46,.03,"#9c7b5c"],[.4,.018,"#c9a77c"],[.3,.03,"#8e6e52"],[.22,.015,"#c9a77c"]];for(const[l,h,u]of a)e.strokeStyle=u,e.lineWidth=h*1024,e.beginPath(),e.arc(o,r,l*1024,0,Math.PI*2),e.stroke();for(let l=0;l<16;l++){const h=l/16*Math.PI*2,u=l%2===0,f=(u?.4:.3)*1024;e.fillStyle=u?"rgba(150,110,80,0.55)":"rgba(190,160,120,0.5)",e.beginPath(),e.moveTo(o+Math.cos(h)*f,r+Math.sin(h)*f),e.lineTo(o+Math.cos(h+.09)*.22*1024,r+Math.sin(h+.09)*.22*1024),e.lineTo(o+Math.cos(h-.09)*.22*1024,r+Math.sin(h-.09)*.22*1024),e.closePath(),e.fill()}ss(e,1024,9e3,.06,123);const c=new kn(t);return c.colorSpace=Fe,c.anisotropy=4,c}function Ax(n){const{c:e,ctx:i}=qn(1024);i.fillStyle="#3a2a20",i.fillRect(0,0,1024,1024);const s={};let o=0,r=0,a=0;const c=4;for(const h of n){const u=h.kind==="clock"?192:h.vertical?96:256,f=h.kind==="clock"?192:h.vertical?256:96;o+u>1024&&(o=0,r+=a+c,a=0),i.save(),i.translate(o,r),h.kind==="clock"?Px(i,u):h.kind==="konbini"?Cx(i,u,f):Rx(i,h,u,f),i.restore(),s[h.key]={u0:(o+2)/1024,u1:(o+u-2)/1024,v0:1-(r+f-2)/1024,v1:1-(r+2)/1024},o+=u+c,a=Math.max(a,f)}const l=new kn(e);return l.colorSpace=Fe,l.anisotropy=4,{texture:l,rects:s}}function Rx(n,t,e,i){const s=n.createLinearGradient(0,0,0,i);if(s.addColorStop(0,t.bg),s.addColorStop(1,Kh(t.bg,-.12)),n.fillStyle=s,n.fillRect(0,0,e,i),n.strokeStyle=t.border,n.lineWidth=6,n.strokeRect(5,5,e-10,i-10),n.strokeStyle=Kh(t.border,.25),n.lineWidth=1.5,n.strokeRect(11,11,e-22,i-22),n.fillStyle=t.fg,n.textAlign="center",n.textBaseline="middle",t.vertical){const o=Array.from(t.text),r=Math.min(46,Math.floor(200/Math.max(o.length,1)));n.font=`bold ${r}px "Noto Serif TC", "Microsoft JhengHei", serif`;const a=(i-44)/Math.max(o.length,1);o.forEach((c,l)=>n.fillText(c,e/2,26+a*(l+.5)))}else{const o=Math.min(42,Math.floor(210/Math.max(Array.from(t.text).length,1))+6);n.font=`bold ${o}px "Noto Serif TC", "Microsoft JhengHei", serif`,n.fillText(t.text,e/2,i/2+2)}}function Cx(n,t,e){n.fillStyle="#fffdf7",n.fillRect(0,0,t,e),n.fillStyle="#e86f38",n.fillRect(0,0,t,20),n.fillStyle="#2d936c",n.fillRect(0,20,t,16),n.fillStyle="#3b82c4",n.fillRect(0,e-16,t,16),n.fillStyle="#244b3c",n.font='bold 26px "Segoe UI", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText("SUNSET MART 24H",t/2,58)}function Px(n,t){const e=t/2;n.fillStyle="#2b2520",n.fillRect(0,0,t,t);const i=n.createRadialGradient(e,e,4,e,e,e);i.addColorStop(0,"#fffaf0"),i.addColorStop(1,"#efe2c4"),n.fillStyle=i,n.beginPath(),n.arc(e,e,e-6,0,Math.PI*2),n.fill(),n.strokeStyle="#b8892e",n.lineWidth=7,n.stroke(),n.fillStyle="#3a2d22",n.font='bold 22px "Times New Roman", serif',n.textAlign="center",n.textBaseline="middle",["XII","I","II","III","IV","V","VI","VII","VIII","IX","X","XI"].forEach((o,r)=>{const a=r/12*Math.PI*2-Math.PI/2;n.fillText(o,e+Math.cos(a)*(e-30),e+Math.sin(a)*(e-30))});for(let o=0;o<60;o++){const r=o/60*Math.PI*2,a=e-14,c=o%5===0?e-22:e-17;n.strokeStyle="#5a4530",n.lineWidth=o%5===0?3:1,n.beginPath(),n.moveTo(e+Math.cos(r)*a,e+Math.sin(r)*a),n.lineTo(e+Math.cos(r)*c,e+Math.sin(r)*c),n.stroke()}}function Kh(n,t){const e=new rt(n);return t<0?e.multiplyScalar(1+t):e.lerp(new rt("#ffffff"),t),`#${e.getHexString()}`}const Ix=[{key:"ramen",text:"夕陽拉麵",bg:"#fff5e1",fg:"#9e261b",border:"#c9402c"},{key:"ramen_v",text:"拉麵",bg:"#b83227",fg:"#fff5dc",border:"#f0c459",vertical:!0},{key:"cafe",text:"踏切珈琲",bg:"#4a3225",fg:"#ffefd2",border:"#c89b6e"},{key:"book",text:"老街古書店",bg:"#2c415c",fg:"#f8edd9",border:"#d4b483"},{key:"bakery",text:"日和麵包坊",bg:"#fff6e0",fg:"#8c4b1e",border:"#d99338"},{key:"izakaya",text:"夕陽居酒屋",bg:"#3b241a",fg:"#ffebc2",border:"#d6703c"},{key:"izakaya_v",text:"酒処",bg:"#f5ead6",fg:"#3b241a",border:"#d6703c",vertical:!0},{key:"flower",text:"小春日花屋",bg:"#f7faf2",fg:"#35663b",border:"#6ba36e"},{key:"bath",text:"富士乃湯",bg:"#234c70",fg:"#fff8e8",border:"#89b7db"},{key:"bath_v",text:"ゆ",bg:"#2b5f8c",fg:"#ffffff",border:"#89b7db",vertical:!0},{key:"station",text:"夕陽駅",bg:"#f8f5ee",fg:"#233b52",border:"#3a7ca5"},{key:"konbini",text:"",bg:"#fff",fg:"#000",border:"#000",kind:"konbini"},{key:"clock",text:"",bg:"#fff",fg:"#000",border:"#000",kind:"clock"},{key:"cityhall",text:"夕陽市役所",bg:"#2f3b2e",fg:"#f3e3b5",border:"#c9a24c"},{key:"theater",text:"浪漫劇場",bg:"#5a1f2a",fg:"#ffe7b0",border:"#d6ad4f"},{key:"gallery",text:"回廊市集",bg:"#24404a",fg:"#f4ead2",border:"#c9a24c"}];let Ha=null;function df(){return Ha||(Ha=Ax(Ix)),Ha}function tn(n){const e=df().rects[n];if(!e)throw new Error(`missing sign ${n}`);return e}function Lx(n,t){const e=new qs;for(const s of pl){switch(e.push(s.x,0,s.z,s.facing==="N"?Math.PI:0),e.boxUp("stone",s.width+.55,.14,s.depth+.55,0,0,0,"#cabda9"),s.style){case"ramen_shop":Dx(e,s);break;case"convenience_store":Ux(e,s);break;case"cafe":Nx(e,s);break;case"bookstore":Fx(e,s);break;case"bakery":Ox(e,s);break;case"izakaya":zx(e,s);break;case"flower_shop":Bx(e,s);break;case"bathhouse":Gx(e,s);break;case"apartment":Vx(e,s);break;default:Hx(e,s);break}e.pop()}Wx(e);const i=ml(e.build(),t.get,"ShoppingStreetBuildings");return n.add(i),{group:i,setVisible:s=>{i.visible=s}}}const q=.14,Un={frameMat:"wood",frame:"#4a3122",top:"none",sill:!0,mullion:!1,lattice:!0},_n="#3a281d";function jn(n,t,e){n.push(0,0,t.depth/2),e(),n.pop()}function Ao(n,t,e,i){n.push(e*t.width/2,0,0,e*Math.PI/2),i(),n.pop()}function _l(n,t,e){n.push(0,0,-t.depth/2,Math.PI),e(),n.pop()}function pf(n,t,e,i,s){n.box("roof",t,.11,i,0,e,i/2-.08,s,.26);const o=Math.max(3,Math.round(t/.55));for(let r=0;r<=o;r++)n.box("wood",.06,.06,i-.1,-t/2+.1+(t-.2)*r/o,e-.1,i/2-.12,_n,.26)}function ea(n,t,e,i,s,o,r){An(n,t.width,t.depth,i,.45,e,s,o,r,!0,_n);for(const a of[-t.width/2-.45,t.width/2+.45])n.box("roof",.2,.5,.42,a,e+i+.15,0,"#5b5b63")}function mf(n,t,e){n.cyl("metal",.045,.045,e,6,t,q+e/2,.08,"#8a8f94")}function gf(n,t,e){n.box("metal",.8,.55,.3,t,e,.16,"#e3e4e1"),n.cyl("metal",.2,.2,.04,10,t-.1,e,.32,"#9aa0a5",Math.PI/2)}function kr(n,t,e,i){n.cyl("plain",.16,.12,.3,8,t,q+.15,e,"#a0583a"),n.sphere("plain",.22,t,q+.42,e,"#4f7f3c",7,5);for(let s=0;s<3;s++)n.sphere("plain",.07,t+Math.cos(s*2.1)*.13,q+.55,e+Math.sin(s*2.1)*.13,i,5,4)}function Dx(n,t){const e=t.width,i=t.depth;n.boxUp("wood",e,2.3,i,0,q,0,"#7a4e36"),n.boxUp("wall",e-.12,1.75,i-.12,0,q+2.3,0,"#efe0cb"),jn(n,t,()=>{Dt(n,-.2,q+.02,1.5,2,{...Un,sill:!1},!0),Dt(n,1.55,q+.75,1.3,1.1,Un,!0);for(const s of[-1.25,1.25])Dt(n,s,q+2.75,1.05,.9,Un,!0);n.push(0,0,-.06),pf(n,e+.3,q+2.32,1.05,"#9a4434"),n.pop();for(let s=0;s<4;s++)n.box("plain",.35,.58,.03,-.78+s*.39,q+1.72,.26,"#b83227");n.box("wood",1.7,.05,.05,-.2,q+2.02,.26,_n);for(const s of[-1.4,.95])n.sphere("glow",.18,s,q+1.95,.4,"#ff6b4a",10,8,Math.PI,.85,1.25,.85),n.cyl("wood",.1,.1,.06,8,s,q+2.2,.4,_n);n.sign(tn("ramen"),2.4,.72,.12,0,q+2.72,.55),n.box("wood",2.56,.88,.08,0,q+2.72,.47,_n),kr(n,-2.2,.4,"#ff6b6b"),mf(n,e/2-.12,4)}),Ao(n,t,-1,()=>{n.sign(tn("ramen_v"),.5,1.5,.08,i/2-.6,q+3.1,.38,0),n.box("metal",.04,.04,.4,i/2-.6,q+3.88,.2,"#555"),Dt(n,-.6,q+2.75,.9,.85,Un,!0),gf(n,.8,q+.5)}),_l(n,t,()=>{Dt(n,.6,q+2.75,1.2,.9,Un,!0)}),ea(n,t,q+4.05,1.35,"#8f3f31","wall","#efe0cb"),n.cyl("metal",.14,.14,1.6,8,1.6,q+4.7,-.8,"#5b6169"),n.cyl("metal",.24,.2,.18,8,1.6,q+5.55,-.8,"#5b6169")}function Ux(n,t){const e=t.width;n.boxUp("brick",e,3.2,t.depth,0,q,0,"#f7f2ec"),n.boxUp("stone",e+.25,.45,t.depth+.25,0,q+3.2,0,"#d8d4c8"),jn(n,t,()=>{n.sign(tn("konbini"),e+.36,.72,.26,0,q+2.75,.13);const i={frameMat:"metal",frame:"#c9ced3",top:"none",sill:!1,mullion:!0};Dt(n,-1.85,q+.25,2.1,1.85,i,!0),Dt(n,1.85,q+.25,2.1,1.85,i,!0),n.box("metal",1.45,2.05,.1,0,q+1.05,.02,"#8f969c"),n.box("glass",1.25,1.9,.12,0,q+1.02,.03),n.box("metal",.04,1.9,.14,0,q+1.02,.04,"#8f969c");for(let s=0;s<3;s++)n.boxUp("plain",.42,.75,.4,-e/2+.5+s*.48,q,.45,["#3b82c4","#e8b349","#2d936c"][s]);n.boxUp("metal",.5,.6,.25,1,q,.3,"#9aa0a5"),n.box("glass",1.8,.04,1,0,q+2.25,.5),n.box("metal",1.9,.06,.06,0,q+2.25,1,"#8f969c")});for(const i of[-1.4,.2])n.box("metal",.95,.65,.75,i,q+3.78,-.6,"#cfd2d4"),n.cyl("metal",.26,.26,.04,12,i,q+4.12,-.6,"#7c8288");Ao(n,t,1,()=>{mf(n,-t.depth/2+.2,3.4),Dt(n,.8,q+1.5,1,.9,{frameMat:"metal",frame:"#c9ced3",top:"none",sill:!1,mullion:!1},!0)})}function Nx(n,t){const e=t.width,i=t.depth;n.boxUp("brick",e+.06,1.1,i+.06,0,q,0),n.boxUp("wall",e,2.55,i,0,q+1.1,0,"#f7ebd8"),jn(n,t,()=>{hi(n,e,q+1.1,"#efe6d6"),Dt(n,-1.1,q+.72,2.2,1.4,{frameMat:"wood",frame:"#4a3225",top:"none",sill:!0,mullion:!0},!0),n.boxUp("wood",1.1,2.05,.1,1.5,q,.03,"#4d3527"),n.box("glass",.6,.9,.12,1.5,q+1.4,.04),n.box("fabric",e-.2,.08,1.2,0,q+2.42,.5,"#c96444",.32),n.sign(tn("cafe"),2.5,.62,.1,0,q+3.15,.07),n.box("wood",2.66,.78,.06,0,q+3.15,.02,_n),n.box("wood",.5,.75,.06,.55,q+.4,.55,"#2d2b28",-.15),n.cyl("wood",.38,.38,.05,12,-1.8,q+.72,.9,"#6b4a35"),n.cyl("metal",.03,.03,.7,6,-1.8,q+.37,.9,"#333");for(const s of[-2.35,-1.25])n.boxUp("wood",.34,.45,.34,s,q,.9,"#8d6546");kr(n,2.3,.4,"#ffd166")}),Ao(n,t,1,()=>{Dt(n,0,q+1.6,1,1.1,{frameMat:"wood",frame:"#4a3225",top:"none",sill:!0,mullion:!0,shutters:"#6b8f71"},!0)}),An(n,e,i,1.3,.45,q+3.65,"#6e4e3a","wall","#f7ebd8",!0,_n),n.boxUp("brick",.55,1.4,.55,-1.6,q+3.8,-.7),n.box("stone",.7,.1,.7,-1.6,q+5.25,-.7,"#d8d0c2")}function Fx(n,t){const e=t.width;n.boxUp("wood",e,t.height,t.depth,0,q,0,"#d9ccb6"),jn(n,t,()=>{Dt(n,-.95,q+.5,2.2,1.5,{frameMat:"wood",frame:"#2c3a4a",top:"none",sill:!0,mullion:!0},!0),n.boxUp("wood",1.15,1.95,.1,1.35,q,.02,"#3d2a1e"),n.box("glass",.7,.8,.12,1.35,q+1.3,.03),n.box("fabric",e-.15,.08,1,0,q+2.32,.42,"#334e6f",.25),n.sign(tn("book"),2.5,.62,.1,0,q+2.6,.55),Dt(n,0,q+3,2.6,1,{frameMat:"wood",frame:"#2c3a4a",top:"none",sill:!1,mullion:!0},!0),n.box("wood",3.2,.12,.6,0,q+2.86,.3,_n),zo(n,3.2,q+2.9,.58,.45,"#3a281d"),n.boxUp("wood",1.2,.9,.4,-1.4,q,.7,"#7a5236");for(let i=0;i<6;i++)n.box("plain",.12,.28,.3,-1.85+i*.18,q+1.05,.7,["#a23b3b","#3b5ea2","#e2b24a","#2f6d5a","#7d3f6e","#d97a46"][i])}),ea(n,t,q+t.height,1.35,"#3f556e","wood","#d9ccb6")}function Ox(n,t){const e=t.width;n.boxUp("wall",e,t.height,t.depth,0,q,0,"#fae9c8"),jn(n,t,()=>{Dt(n,-1.1,q+.55,2.4,1.5,{frameMat:"wood",frame:"#8c4b1e",top:"none",sill:!0,mullion:!0,flowers:!0},!0),n.boxUp("wood",1.15,2,.1,1.45,q,.03,"#a8774c"),n.box("glass",.7,.9,.12,1.45,q+1.3,.04),n.box("fabric",e-.1,.08,1.1,0,q+2.38,.45,"#d99338",.28),n.sign(tn("bakery"),2.6,.65,.1,0,q+3.1,.07),n.box("wood",2.76,.8,.06,0,q+3.1,.02,"#8c4b1e"),n.boxUp("wood",1.4,.75,.55,-1.1,q,.6,"#8d6546");for(let i=0;i<5;i++)n.sphere("plain",.12,-1.6+i*.25,q+.82,.6,"#d9a05b",7,5,Math.PI,1.4,.8,1)}),An(n,e,t.depth,1.3,.45,q+t.height,"#c2763b","wall","#fae9c8",!0,"#874c1f"),n.boxUp("brick",.6,1.5,.6,1.7,q+t.height+.2,-.6)}function zx(n,t){const e=t.width,i=t.depth;n.boxUp("wood",e,2.25,i,0,q,0,"#5e3d2c"),n.boxUp("wall",e-.1,1.75,i-.1,0,q+2.25,0,"#e6d9c5"),jn(n,t,()=>{Dt(n,0,q+.02,1.5,1.95,{...Un,sill:!1},!0);for(const s of[-1.9,1.9])Dt(n,s,q+.9,1,.9,Un,!0);for(const s of[-1.3,1.3])Dt(n,s,q+2.7,1.1,.85,Un,!0);n.push(0,0,-.06),pf(n,e+.25,q+2.26,.95,"#4a4340"),n.pop();for(let s=0;s<4;s++)n.sphere("glow",.16,-1.65+s*1.1,q+1.9,.45,s%2===0?"#ff7a45":"#fff0d0",10,8,Math.PI,.85,1.25,.85),n.cyl("wood",.09,.09,.05,8,-1.65+s*1.1,q+2.13,.45,_n);for(let s=0;s<3;s++)n.cyl("wood",.24,.24,.46,12,-1.8+s*.52,q+.23,.38,"#e6d7b8"),n.cyl("wood",.245,.245,.05,12,-1.8+s*.52,q+.32,.38,"#8a3b2b");n.sign(tn("izakaya"),2.5,.65,.1,0,q+3.55,.1),n.sign(tn("izakaya_v"),.42,1.2,.06,e/2-.35,q+1.2,.2);for(const s of[-e/2+.12,e/2-.12])n.box("wood",.18,2.25,.18,s,q+1.12,.06,"#3a281d")}),ea(n,t,q+4,1.35,"#4a4340","wall","#e6d9c5")}function Bx(n,t){const e=t.width;n.boxUp("wood",e,t.height,t.depth,0,q,0,"#edf2e6"),jn(n,t,()=>{Dt(n,0,q+.4,3.2,1.65,{frameMat:"wood",frame:"#35663b",top:"none",sill:!1,mullion:!0},!0),n.box("fabric",e-.1,.08,1.2,0,q+2.35,.5,"#4d8a55",.28),n.sign(tn("flower"),2.5,.62,.1,0,q+3,.07);for(let s=0;s<3;s++)n.boxUp("wood",3.8,.1,.32,0,q+.15+s*.28,.85-s*.28,"#b08660");const i=["#ff7b9c","#ffd166","#ff9f4a","#a389f4","#ff6b6b","#ffffff"];for(let s=0;s<3;s++)for(let o=0;o<9;o++){const r=-1.7+o*.42,a=.85-s*.28;n.cyl("plain",.1,.08,.16,6,r,q+.33+s*.28,a,"#a0583a"),n.sphere("plain",.13,r,q+.5+s*.28,a,i[(o+s*2)%i.length],6,4)}kr(n,-2.4,.5,"#ff7b9c"),kr(n,2.4,.5,"#a389f4")}),An(n,e,t.depth,1.25,.45,q+t.height,"#4e7a52","wood","#edf2e6",!0,"#305234")}function Gx(n,t){const e=t.width,i=t.depth;n.boxUp("wall",e,t.height,i,0,q,0,"#efe7d8"),n.boxUp("wood",e+.04,1,i+.04,0,q,0,"#5e3d2c"),jn(n,t,()=>{Dt(n,0,q+.02,2,2.1,{...Un,sill:!1},!0);for(const r of[-2.4,2.4])Dt(n,r,q+2.5,1,1,Un,!0);n.push(0,q+2.55,.55,Math.PI/2),An(n,1.5,2.6,.7,.25,0,"#445466","wood","#5e3d2c",!0,_n),n.pop();for(const r of[-1.15,1.15])n.box("wood",.16,2.45,.16,r,q+1.22,.95,"#4d3527");for(let r=0;r<4;r++)n.box("plain",.42,.72,.03,-.69+r*.46,q+1.9,.32,"#2b5f8c");n.sign(tn("bath_v"),.36,.8,.04,-.23,q+1.85,.36),n.sign(tn("bath"),2.6,.7,.12,0,q+3.4,.1)}),ea(n,t,q+t.height,1.65,"#445466","wall","#efe7d8");const s=e/2-.85,o=-i/2+.9;n.cyl("brick",.32,.52,7.6,12,s,q+5.6,o);for(const r of[q+4.2,q+6.8,q+9.2])n.cyl("stone",.5-(r-4)*.035,.52-(r-4)*.035,.2,12,s,r,o,"#f2ece0");n.cyl("metal",.02,.02,1,4,s,q+9.9,o,"#444")}function Hx(n,t){const e=t.width;n.boxUp("stone",e+.12,.4,t.depth+.12,0,q,0,"#9a948c"),n.boxUp("wall",e,t.height-.4,t.depth,0,q+.4,0,t.blockoutColor);const i={frameMat:"metal",frame:"#a4abb2",top:"none",sill:!0,mullion:!0};jn(n,t,()=>{n.boxUp("wood",1.1,2,.1,-1.3,q+.4,.03,"#4d3527"),n.box("roof",1.7,.1,.75,-1.3,q+2.62,.34,t.roofColor,.2),Dt(n,1.1,q+.85,1.5,1.1,{...i,shutters:null},!0);for(const s of[-1.3,1.2])Dt(n,s,q+t.height-1.75,1.2,1,i,!0);n.box("wood",2.2,.12,.65,1.2,q+t.height-2,.32,"#8d6546"),zo(n,2.2,q+t.height-1.95,.62,.6,"#5a4536",1.2),hi(n,e,q+2.75,"#d8cfc0","wood")}),Ao(n,t,1,()=>{Dt(n,.8,q+1,1,1,i,!0),Dt(n,-.8,q+t.height-1.7,1,.9,i,!0),gf(n,-1.2,q+.45)}),Ao(n,t,-1,()=>{Dt(n,0,q+t.height-1.7,1,.9,i,!0)}),_l(n,t,()=>{Dt(n,-1,q+1,1.2,1,i,!0)}),An(n,e,t.depth,1.45,.5,q+t.height,t.roofColor,"wall",t.blockoutColor,!0,_n)}function Vx(n,t){const e=t.width;n.boxUp("wood",e,t.height,t.depth,0,q,0,t.blockoutColor),jn(n,t,()=>{n.box("wood",e+.2,.16,.95,0,q+2.75,.47,"#8d6546"),zo(n,e+.2,q+2.83,.92,.9,"#4a3a2e");for(const i of[-e/2+.1,0,e/2-.1])n.box("wood",.12,2.7,.12,i,q+1.36,.9,"#5a4536");for(const i of[q,q+2.8])for(const s of[-2.2,0,2.2])n.boxUp("wood",.82,1.85,.08,s-.45,i+.05,.03,"#4d3527"),Dt(n,s+.55,i+.85,.85,.9,{frameMat:"wood",frame:"#5a4536",top:"none",sill:!0,mullion:!0},!0),n.cyl("glow",.07,.07,.12,6,s-.45,i+2.1,.12,"#ffe0a0");for(let i=0;i<9;i++)n.box("metal",.9,.06,.3,e/2+.55,q+.3+i*.3,.6-i*.3+1.5,"#6b6e72");n.box("metal",.04,3.3,.04,e/2+1,q+1.6,.2,"#6b6e72",.65)}),_l(n,t,()=>{for(const i of[q+.9,q+3.7])for(const s of[-2.4,0,2.4])Dt(n,s,i,1.2,1,{frameMat:"wood",frame:"#5a4536",top:"none",sill:!0,mullion:!0},!0)}),An(n,e,t.depth,1.5,.45,q+t.height,t.roofColor,"wood",t.blockoutColor,!0,_n)}function Wx(n){const t=le.height,e=le.x+.7,i=le.z-2.8;n.sign(tn("station"),1.55,.62,.1,e,t+1.75,i,Math.PI/2),n.box("wood",.06,.74,1.67,e-.06,t+1.75,i,_n);for(const s of[-.55,.55])n.cyl("wood",.045,.045,1.5,8,e,t+.75,i+s,"#4d3527");n.box("wood",.55,.08,2.2,le.x+.65,t+.44,le.z+.6,"#8d6546"),n.box("wood",.08,.42,2.2,le.x+.9,t+.72,le.z+.6,"#8d6546");for(const s of[-.9,.9])n.boxUp("metal",.4,.4,.06,le.x+.65,t,le.z+.6+s,"#3b3e45");n.push(le.x+.6,t,le.z+4),n.boxUp("wood",1.8,2.3,2.4,0,0,0,"#c7a27a"),n.push(-.9,0,0,-Math.PI/2),Dt(n,0,.9,1.2,.9,Un,!0),n.pop(),js(n,1.8,2.4,.8,.35,2.3,"#586c7a",!0),n.pop()}function kx(n){const t=new te;t.name="StreetProps";const e=Xx();t.add(e.group),t.add(Yx());const i=qx();return t.add(i.group),t.add(jx()),t.add($x()),t.add(Kx()),n.add(t),{group:t,getTrafficPhase:i.getPhase,setNightFactor:e.setNightFactor,update:s=>{i.update(s)}}}function Xx(){const n=new te;n.name="StreetLamps";const t=$t.sidewalkY,e=[[-28,-3,-Math.PI/2],[-19,-3,-Math.PI/2],[-11.5,-3,-Math.PI/2],[-2.4,-3,-Math.PI/2],[4.8,-3,-Math.PI/2],[13.5,-3,-Math.PI/2],[19.2,-3,-Math.PI/2],[28.5,-3,-Math.PI/2],[-25,3,Math.PI/2],[-15,3,Math.PI/2],[-2.4,3,Math.PI/2],[4.8,3,Math.PI/2],[15.8,3,Math.PI/2],[26.5,3,Math.PI/2],[-9,-13,0],[-4,13,Math.PI]],i=new ct({color:"#3a3b42",roughness:.55,metalness:.35}),s=new ct({color:"#fff2c6",emissive:"#ffb045",emissiveIntensity:1.9,roughness:.2}),o=new Ee(new oe(.055,.085,3.3,7),i,e.length),r=new Ee(new At(.68,.07,.07),i,e.length),a=new Ee(new Ai(.24,.16,7),i,e.length),c=new Ee(new he(.11,8,6),s,e.length);o.castShadow=!0,r.castShadow=!0;const l=new xe;e.forEach(([d,g,_],p)=>{const m=Math.cos(_),x=Math.sin(_);l.position.set(d,t+1.65,g),l.rotation.set(0,_,0),l.updateMatrix(),o.setMatrixAt(p,l.matrix),l.position.set(d+m*.28,t+3.22,g-x*.28),l.updateMatrix(),r.setMatrixAt(p,l.matrix),l.position.set(d+m*.56,t+3.16,g-x*.56),l.updateMatrix(),a.setMatrixAt(p,l.matrix),l.position.set(d+m*.56,t+3.04,g-x*.56),l.updateMatrix(),c.setMatrixAt(p,l.matrix)}),n.add(o,r,a,c);const h=new Ci({color:"#ffc978",transparent:!0,opacity:.22,depthWrite:!1}),u=new Ee(new he(.45,8,6),h,e.length);return e.forEach(([d,g,_],p)=>{const m=Math.cos(_),x=Math.sin(_);l.position.set(d+m*.56,t+3.04,g-x*.56),l.rotation.set(0,0,0),l.scale.setScalar(1),l.updateMatrix(),u.setMatrixAt(p,l.matrix)}),n.add(u),{group:n,setNightFactor:d=>{const g=pe.clamp((d-.2)/.8,0,1);s.emissiveIntensity=.1+g*2.4,h.opacity=g*.34,u.visible=g>.04}}}function Yx(){const n=new te;n.name="VendingMachines";const t=$t.sidewalkY,e=[[-11.2,-5,0,"#d9483b"],[4.4,-5,0,"#f0ede6"],[12.4,-5,0,"#3a7bb8"],[24.4,5,Math.PI,"#d9483b"],[-2.5,5,Math.PI,"#e89d38"]],i=Zx(),s=new ct({map:i,emissive:"#fff2d6",emissiveMap:i,emissiveIntensity:.85,roughness:.25}),o=new ct({color:"#24262b",roughness:.7});for(const[r,a,c,l]of e){const h=new te;h.position.set(r,t,a),h.rotation.y=c;const u=new ht(new At(.95,1.75,.62),new ct({color:l,roughness:.55}));u.position.y=.875,u.castShadow=!0,u.receiveShadow=!0,h.add(u);const f=new ht(new At(.8,.82,.05),s);f.position.set(0,1.18,.3),h.add(f);const d=new ht(new At(.68,.26,.06),o);d.position.set(0,.36,.3),h.add(d),n.add(h)}return n}function Zx(){const n=document.createElement("canvas");n.width=64,n.height=64;const t=n.getContext("2d");t.fillStyle="#fff9eb",t.fillRect(0,0,64,64),[["#e63946","#457b9d","#f4a261","#2a9d8f","#e76f51"],["#52b788","#ffb703","#fb8500","#219ebc","#d62828"],["#8ecae6","#f77f00","#06d6a0","#ef476f","#118ab2"]].forEach((s,o)=>{const r=6+o*19;t.fillStyle="#d8d2c5",t.fillRect(4,r+12,56,3),s.forEach((a,c)=>{t.fillStyle=a,t.fillRect(6+c*11,r,7,11)})});const i=new kn(n);return i.colorSpace=Fe,i.magFilter=Je,i}function qx(){const n=new te;n.name="TrafficLights";const t=$t.sidewalkY,e=new ct({color:"#585c63",roughness:.6,metalness:.3}),i=new ct({color:"#2b2d32",roughness:.7}),s={red:new ct({color:"#ff4040",emissive:"#ff2020",emissiveIntensity:.1}),yellow:new ct({color:"#ffd038",emissive:"#ffbb00",emissiveIntensity:.1}),green:new ct({color:"#38e878",emissive:"#1fd662",emissiveIntensity:1.8})},o={red:new ct({color:"#ff4040",emissive:"#ff2020",emissiveIntensity:1.8}),yellow:new ct({color:"#ffd038",emissive:"#ffbb00",emissiveIntensity:.1}),green:new ct({color:"#38e878",emissive:"#1fd662",emissiveIntensity:.1})},r=[{x:-9.2,z:-3.2,rotY:0,axis:"EW"},{x:-3.8,z:3.2,rotY:Math.PI,axis:"EW"},{x:-3.8,z:-3.2,rotY:-Math.PI/2,axis:"NS"},{x:-9.2,z:3.2,rotY:Math.PI/2,axis:"NS"}],a=new he(.11,8,6);for(const h of r){const u=new te;u.position.set(h.x,t,h.z),u.rotation.y=h.rotY;const f=new ht(new oe(.08,.1,4.3,8),e);f.position.y=2.15,f.castShadow=!0,u.add(f);const d=new ht(new At(1.5,.1,.1),e);d.position.set(.7,4.05,0),u.add(d);const g=new ht(new At(1.05,.34,.24),i);g.position.set(1.1,4.05,0),g.castShadow=!0,u.add(g);const _=h.axis==="EW"?s:o,p=new ht(a,_.green);p.position.set(.78,4.05,.12);const m=new ht(a,_.yellow);m.position.set(1.1,4.05,.12);const x=new ht(a,_.red);x.position.set(1.42,4.05,.12),u.add(p,m,x),n.add(u)}let c="EW_GREEN";return{group:n,getPhase:()=>c,update:h=>{const u=h%16;u<6?c="EW_GREEN":u<8?c="EW_YELLOW":u<14?c="NS_GREEN":c="NS_YELLOW",s.green.emissiveIntensity=c==="EW_GREEN"?1.8:.12,s.yellow.emissiveIntensity=c==="EW_YELLOW"?1.8:.12,s.red.emissiveIntensity=c==="NS_GREEN"||c==="NS_YELLOW"?1.8:.12,o.green.emissiveIntensity=c==="NS_GREEN"?1.8:.12,o.yellow.emissiveIntensity=c==="NS_YELLOW"?1.8:.12,o.red.emissiveIntensity=c==="EW_GREEN"||c==="EW_YELLOW"?1.8:.12}}}function jx(){const n=new te;n.name="UtilityPoles";const t=$t.sidewalkY,e=[[-29.5,-5],[-19.5,-5],[-1.8,-5],[6.6,-5],[19.2,-5],[31.5,-5],[-29.5,5],[6.6,5],[31.5,5]],i=new ct({color:"#9c9a95",roughness:.92}),s=new ct({color:"#45484f",roughness:.7}),o=new Ee(new oe(.1,.15,6.8,7),i,e.length),r=new Ee(new At(.12,.1,1.5),s,e.length),a=new Ee(new oe(.22,.22,.65,8),i,e.length);o.castShadow=!0;const c=new xe;return e.forEach(([l,h],u)=>{c.position.set(l,t+3.4,h),c.rotation.set(0,0,0),c.updateMatrix(),o.setMatrixAt(u,c.matrix),c.position.set(l,t+6.3,h),c.updateMatrix(),r.setMatrixAt(u,c.matrix),c.position.set(l+.25,t+5.2,h),c.updateMatrix(),a.setMatrixAt(u,c.matrix)}),n.add(o,r,a),n}function $x(){const n=new te;n.name="LandmarksAndBenches";const t=$t.sidewalkY,e=new te;e.position.set(-2.3,t,4.6);const i=new ct({color:"#cc332b",roughness:.45}),s=new ht(new oe(.18,.22,.55,10),i);s.position.y=.275,s.castShadow=!0;const o=new ht(new oe(.26,.26,.72,12),i);o.position.y=.88,o.castShadow=!0;const r=new ht(new he(.27,12,8,0,Math.PI*2,0,Math.PI/2),i);r.position.y=1.24,e.add(s,o,r),n.add(e);const a=new te;a.position.set(-18.2,t,-3.1);const c=new ht(new oe(.24,.28,.22,8),new ct({color:"#70747a",roughness:.85}));c.position.y=.11;const l=new ht(new oe(.04,.04,2.25,8),new ct({color:"#e6e2d8",roughness:.6}));l.position.y=1.15,l.castShadow=!0;const h=new ht(new oe(.28,.28,.06,14),new ct({color:"#2c6aa0",roughness:.5}));h.rotation.x=Math.PI/2,h.position.y=2.25,a.add(c,l,h),n.add(a);const u=[[Yt.x-1.8,.17,Yt.z-1.6,0],[Yt.x+1.8,.17,Yt.z-1.6,0],[Yt.x-1.8,.17,Yt.z+1.8,Math.PI],[-19.5,t,-4.6,0],[15.6,t,4.6,Math.PI]],f=new ct({color:"#9c6e44",roughness:.85}),d=new ct({color:"#3b3e45",roughness:.7}),g=new Ee(new At(1.5,.08,.48),f,u.length),_=new Ee(new At(1.5,.42,.08),f,u.length),p=new Ee(new At(1.3,.36,.38),d,u.length);g.castShadow=!0,_.castShadow=!0;const m=new xe;return u.forEach(([x,M,v,w],E)=>{const R=Math.sin(w),A=Math.cos(w);m.position.set(x,M+.42,v),m.rotation.set(0,w,0),m.updateMatrix(),g.setMatrixAt(E,m.matrix),m.position.set(x-R*.22,M+.68,v-A*.22),m.updateMatrix(),_.setMatrixAt(E,m.matrix),m.position.set(x,M+.2,v),m.updateMatrix(),p.setMatrixAt(E,m.matrix)}),n.add(g,_,p),n}function Kx(){const n=new te;n.name="InstancedTrees";const t=[[Yt.x-2.6,Yt.z-2.2,1.25,0],[Yt.x+2.6,Yt.z+2,1.15,2],[Yt.x+2.8,Yt.z-2.1,1,1],[Yt.x-2.5,Yt.z+2.2,1.1,0],[-28.5,-5.4,1.05,1],[-19.2,-5.6,.95,0],[-10.2,-11.5,1,2],[-10.2,-20.5,1.15,0],[-3.2,-11.5,1.05,1],[-3.2,-21,1.2,0],[6.6,-12.5,1.15,2],[6.6,12.2,1.1,1],[13,-13,1.05,0],[23.5,-13.5,1.15,1],[23.5,13.5,1.1,2],[-31.5,-13,1.45,0],[-32,-21.5,1.55,2],[-25,-23,1.4,1],[-16,-23.5,1.5,0],[-1.5,-23.5,1.45,2],[5.5,-23,1.35,0],[15,-23.5,1.5,1],[24.5,-22,1.45,0],[33.5,-15,1.5,2],[34,-5.5,1.35,1],[34.5,6.5,1.4,0],[34,16.5,1.55,2],[25.5,24,1.45,0],[16,23,1.35,1],[4,23.5,1.5,0],[-12.5,24.5,1.45,2],[-24.5,23.5,1.55,0],[-31.5,16,1.4,1],[-31.5,7.5,1.3,0]],e=new ct({color:"#6b4a35",roughness:.92}),i=[new ct({color:"#6b9c56",roughness:.85,flatShading:!0}),new ct({color:"#e2b24a",roughness:.85,flatShading:!0}),new ct({color:"#d97a46",roughness:.85,flatShading:!0})],s=new oe(.13,.22,1.45,6),o=new Kr(.95,0),r=new Ee(s,e,t.length);r.castShadow=!0,r.receiveShadow=!0;const a=new xe,c=[[],[],[]];return t.forEach(([l,h,u,f],d)=>{a.position.set(l,.72*u,h),a.rotation.set(0,d*1.1%Math.PI,0),a.scale.setScalar(u),a.updateMatrix(),r.setMatrixAt(d,a.matrix),c[f].push([l,h,u])}),n.add(r),c.forEach((l,h)=>{if(l.length===0)return;const u=new Ee(o,i[h],l.length*2);u.castShadow=!0,u.receiveShadow=!0,l.forEach(([f,d,g],_)=>{a.position.set(f,2.05*g,d),a.rotation.set(0,_*.7,0),a.scale.setScalar(g),a.updateMatrix(),u.setMatrixAt(_*2,a.matrix),a.position.set(f+.42*g,1.8*g,d+.28*g),a.scale.setScalar(g*.72),a.updateMatrix(),u.setMatrixAt(_*2+1,a.matrix)}),n.add(u)}),n}function Jx(n){const t=new te;t.name="LocalTrain";const e=new ct({color:"#2f6847",roughness:.55}),i=new ct({color:"#f4e8c8",roughness:.6}),s=new ct({color:"#6b7075",roughness:.75}),o=new ct({color:"#2c2f34",roughness:.7}),r=new ct({color:"#ffebb3",emissive:"#ffbe66",emissiveIntensity:.85,roughness:.25}),a=new ct({color:"#fff8d6",emissive:"#ffe499",emissiveIntensity:2}),c=new ct({color:"#ff4a4a",emissive:"#ff2b2b",emissiveIntensity:1.5}),l=7.4,h=.5,u=[-7.9/2,(l+h)/2];for(let A=0;A<u.length;A++){const y=u[A],b=new te;b.position.z=y;const D=new ht(new At(2.1,.36,l-.3),o);D.position.y=.42,D.castShadow=!0,b.add(D);const V=new ht(new At(2.26,.95,l),e);V.position.y=1.05,V.castShadow=!0,V.receiveShadow=!0,b.add(V);const G=new ht(new At(2.24,1.05,l),i);G.position.y=2.02,G.castShadow=!0,b.add(G);const Y=new ht(new At(2.16,.24,l-.1),s);Y.position.y=2.64,Y.castShadow=!0,b.add(Y);const C=new ht(new At(1.1,.24,2.2),s);C.position.set(0,2.84,0),b.add(C);for(const k of[-2.4,-.8,.8,2.4]){const Q=new ht(new At(2.28,.68,1.15),r);Q.position.set(0,1.98,k),b.add(Q)}const N=A===0?-l/2-.02:l/2+.02,z=new ht(new At(1.65,.72,.06),r);z.position.set(0,2.02,N),b.add(z);const I=new ht(new oe(.14,.14,.08,10),a);I.rotation.x=Math.PI/2,I.position.set(0,2.52,N),b.add(I);for(const k of[-.72,.72]){const Q=new ht(new At(.22,.14,.06),c);Q.position.set(k,1.12,N),b.add(Q)}if(A===0){const k=new ht(new At(1.1,.45,.9),o);k.position.set(0,2.96,-1.8),b.add(k)}t.add(b)}const f=new ht(new At(1.7,1.85,h+.15),o);f.position.set(0,1.55,0),t.add(f);const d=184,g=le.z,_=8.5;let p="WAITING",m=1,x=-d,M=0,v=3.5,w=!1;return t.position.set($t.railwayX,.16,x),t.visible=!1,n.add(t),{group:t,getBounds:()=>{if(!t.visible)return null;const A=1.2,y=l+h/2+.2;return{minX:$t.railwayX-A,maxX:$t.railwayX+A,minZ:x-y,maxZ:x+y}},update:A=>{let y=!1;if(p==="WAITING")v-=A,v<=0&&(p="RUNNING",x=m===1?-d:d,M=_,w=!1,t.visible=!0);else if(p==="AT_STATION")v-=A,v<=0&&(p="RUNNING");else if(p==="RUNNING"){const b=(g-x)*m;if(!w&&b>0&&b<11){const D=Math.max(1.2,b/11*_);M+=(D-M)*Math.min(1,A*4.5),b<.35&&(x=g,M=0,w=!0,p="AT_STATION",v=4)}else M+=(_-M)*Math.min(1,A*2.2);x+=m*M*A,(m===1&&x>d||m===-1&&x<-d)&&(p="WAITING",t.visible=!1,m=m===1?-1:1,v=10)}if(t.position.z=x,t.visible){const b=m===1&&x>-24&&x<10.2,D=m===-1&&x<18&&x>-11;(b||D)&&(y=!0)}return{crossingActive:y,isMoving:p==="RUNNING"}}}}const Jh={violet:{top:"#38324a",mid:"#766e8d",light:"#c9c3da"},emerald:{top:"#184e43",mid:"#3ca387",light:"#a8f0d8"},amber:{top:"#4e2f12",mid:"#b87d2e",light:"#fae19c"}};function Qh(n=!1){const t=document.createElement("canvas");t.width=4,t.height=1;const e=t.getContext("2d");(n?["#8f8aa8","#c6c2d6","#efedf7","#ffffff"]:["#90858c","#c7bfc4","#f2edf0","#ffffff"]).forEach((o,r)=>{e.fillStyle=o,e.fillRect(r,0,1,1)});const s=new kn(t);return s.minFilter=Je,s.magFilter=Je,s.generateMipmaps=!1,s}function yn(n,t,e=22,i=10,s=[1,.72]){const o=new Zu(n.map(f=>new U(...f))),r=o.computeFrenetFrames(e,!1),a=[],c=[],l=[];for(let f=0;f<=e;f++){const d=f/e,g=o.getPointAt(d),_=r.normals[f],p=r.binormals[f],m=Math.max(.002,t(d));for(let x=0;x<=i;x++){const M=x/i,v=M*Math.PI*2,w=Math.cos(v)*s[0],E=Math.sin(v)*s[1],R=g.x+m*(w*_.x+E*p.x),A=g.y+m*(w*_.y+E*p.y),y=g.z+m*(w*_.z+E*p.z);a.push(R,A,y),c.push(M,d)}}const h=i+1;for(let f=0;f<e;f++)for(let d=0;d<i;d++){const g=f*h+d,_=(f+1)*h+d,p=(f+1)*h+(d+1),m=f*h+(d+1);l.push(g,_,m),l.push(_,p,m)}const u=new ye;return u.setAttribute("position",new Ft(a,3)),u.setAttribute("uv",new Ft(c,2)),u.setIndex(l),u.computeVertexNormals(),u}function Qx(){const e=[],i=[],s=[],o=(h,u)=>{const f=Math.abs(h),d=.21+u*.34,g=h*(1.12-u*.14),_=.17+u*.14,p=Math.sin(g)*d*1.08,m=Math.pow(1-f,1.8)*.13,x=Math.pow(f,2.2)*.04,M=.44+m+x,v=-u*M,w=Math.cos(h*Math.PI*3)*.015*u,E=-Math.cos(g)*_*.85-u*.14+w;return[p,v,E]};for(let h=0;h<=14;h++){const u=h/14;for(let f=0;f<=22;f++){const d=f/22*2-1,[g,_,p]=o(d,u);e.push(g,_,p),i.push(f/22,u)}}const r=23;for(let h=0;h<14;h++)for(let u=0;u<22;u++){const f=h*r+u,d=(h+1)*r+u,g=(h+1)*r+(u+1),_=h*r+(u+1);s.push(f,d,_),s.push(d,g,_)}const a=new ye;a.setAttribute("position",new Ft(e,3)),a.setAttribute("uv",new Ft(i,2)),a.setIndex(s),a.computeVertexNormals();const c=[];for(let h=2;h<=14;h++)c.push(o(-1,h/14));for(let h=1;h<=22;h++){const u=h/22*2-1;c.push(o(u,1))}for(let h=13;h>=2;h--)c.push(o(1,h/14));const l=yn(c,()=>.016,48,8,[1,1]);return{capeGeo:a,trimGeo:l}}function t2(n){const i=[],s=[],o=[],r=(u,f)=>{const d=n*(.14+f*.34),g=n*2.15,_=pe.lerp(d,g,u),p=.14+f*.132,m=Math.sin(_)*p*1.04,x=Math.cos(_)*p*.96,M=.195-f*.21-Math.sin(u*Math.PI)*.015*f;return[m,M,x]};for(let u=0;u<=8;u++){const f=u/8;for(let d=0;d<=14;d++){const g=d/14,[_,p,m]=r(g,f);i.push(_,p,m),s.push(g,f)}}const a=15;for(let u=0;u<8;u++)for(let f=0;f<14;f++){const d=u*a+f,g=(u+1)*a+f,_=(u+1)*a+(f+1),p=u*a+(f+1);n>0?o.push(d,g,p,g,_,p):o.push(d,p,g,g,p,_)}const c=new ye;c.setAttribute("position",new Ft(i,3)),c.setAttribute("uv",new Ft(s,2)),c.setIndex(o),c.computeVertexNormals();const l=[];for(let u=0;u<=8;u++)l.push(r(0,u/8));for(let u=1;u<=14;u++)l.push(r(u/14,1));const h=yn(l,()=>.014,34,8,[1,1]);return{meshGeo:c,trimGeo:h}}function e2(){const n=document.createElement("canvas");n.width=512,n.height=512;const t=n.getContext("2d");t.fillStyle="#faf8f5",t.fillRect(0,0,512,512),t.fillStyle="#2d2933";for(let i=36;i<370;i+=56)t.fillRect(0,i,512,24);t.fillStyle="#26232c",t.fillRect(0,390,512,72),t.fillStyle="#474252",t.fillRect(0,398,512,8);const e=new kn(n);return e.colorSpace=Fe,e}function n2(){const n=document.createElement("canvas");n.width=512,n.height=512;const t=n.getContext("2d");t.fillStyle="#faf8f4",t.fillRect(0,0,512,512);for(let i=0;i<12;i++){const s=i/12*512,o=t.createLinearGradient(s,0,s+42,0);o.addColorStop(0,"rgba(185, 178, 196, 0.28)"),o.addColorStop(.5,"rgba(255, 255, 255, 0)"),o.addColorStop(1,"rgba(185, 178, 196, 0.25)"),t.fillStyle=o,t.fillRect(s,0,44,420)}t.fillStyle="#c89b44",t.fillRect(0,412,512,12),t.fillStyle="#e5c171",t.fillRect(0,424,512,58),t.fillStyle="#b48432",t.fillRect(0,482,512,30);const e=new kn(n);return e.colorSpace=Fe,e}function Va(n,t="violet",e="calm"){const i=n.getContext("2d"),s=n.width,o=n.height,r=Jh[t]||Jh.violet;i.fillStyle="#fcebe2",i.fillRect(0,0,s,o);const a=s*.25,c=o*.565,l=s*.052,h=c-o*.012,u=(p,m,x=.42)=>{const M=i.createRadialGradient(p,m,2,p,m,s*.036);M.addColorStop(0,`rgba(245, 130, 148, ${x})`),M.addColorStop(1,"rgba(245, 130, 148, 0)"),i.fillStyle=M,i.beginPath(),i.ellipse(p,m,s*.036,o*.032,0,0,Math.PI*2),i.fill()};u(a-l*1.15,h+o*.088,e==="mimic"?.55:.42),u(a+l*1.15,h+o*.088,e==="mimic"?.55:.42),(p=>{i.fillStyle="#c4bed3",i.strokeStyle="#a49db8",i.lineWidth=3.5;for(const m of[-1,1]){const x=a+m*l*.88,M=h-o*.115;i.save(),i.translate(x,M),p==="focused"?i.rotate(-m*.26):p==="sleepy"||p==="mimic"?i.rotate(m*.22):i.rotate(-m*.06),i.beginPath(),i.ellipse(0,0,s*.017,o*.011,0,0,Math.PI*2),i.fill(),i.restore()}})(e);const d=(p,m,x,M={})=>{const v=s*.033,w=o*.072;if(M.mimic){i.strokeStyle="#382a34",i.lineWidth=6.5,i.lineCap="round",i.lineJoin="round",i.beginPath(),i.moveTo(p-x*v*.8,m-w*.5),i.lineTo(p+x*v*.65,m),i.lineTo(p-x*v*.8,m+w*.5),i.stroke();return}if(M.smug){i.strokeStyle="#352832",i.lineWidth=6.5,i.lineCap="round",i.beginPath(),i.moveTo(p-v*.95,m+2),i.quadraticCurveTo(p,m-8,p+v*.95,m+2),i.stroke(),i.lineWidth=4,i.beginPath(),i.moveTo(p-v*.65,m+14),i.lineTo(p+v*.65,m+14),i.stroke();return}i.fillStyle="#ffffff",i.beginPath(),i.ellipse(p,m,v,w,0,0,Math.PI*2),i.fill();const E=v*.76,R=w*.82,A=i.createLinearGradient(p,m-R,p,m+R);if(A.addColorStop(0,r.top),A.addColorStop(.42,r.mid),A.addColorStop(.86,r.light),A.addColorStop(1,"#ffffff"),i.fillStyle=A,i.beginPath(),i.ellipse(p,m+w*.04,E,R,0,0,Math.PI*2),i.fill(),i.fillStyle="#251e2e",i.beginPath(),i.ellipse(p,m+w*.02,E*.44,R*.46,0,0,Math.PI*2),i.fill(),i.fillStyle="#ffffff",i.beginPath(),i.ellipse(p-v*.28,m-w*.3,v*.24,w*.22,-.2,0,Math.PI*2),i.fill(),i.beginPath(),i.arc(p+v*.26,m+w*.3,v*.13,0,Math.PI*2),i.fill(),M.sleepy){i.fillStyle="#fcebe2",i.fillRect(p-v*1.2,m-w*1.2,v*2.4,w*1.15),i.strokeStyle="#362933",i.lineWidth=6.5,i.lineCap="round",i.beginPath(),i.moveTo(p-v*1.05,m-w*.05),i.quadraticCurveTo(p,m+w*.05,p+v*1.05,m-w*.05),i.stroke();return}i.strokeStyle="#352732",i.lineWidth=7.5,i.lineCap="round",i.beginPath(),i.ellipse(p,m-w*.03,v*1.06,w*.96,0,Math.PI*1.08,Math.PI*1.92),i.stroke(),i.lineWidth=4.5,i.beginPath(),i.moveTo(p+x*v*.92,m-w*.28),i.lineTo(p+x*v*1.18,m-w*.46),i.stroke(),i.strokeStyle="rgba(70, 52, 66, 0.45)",i.lineWidth=2.6,i.beginPath(),i.ellipse(p,m+w*.04,v*.9,w*.88,0,Math.PI*.18,Math.PI*.82),i.stroke()},g={sleepy:e==="sleepy",smug:e==="smug",mimic:e==="mimic"};d(a-l,h,-1,g),d(a+l,h,1,g),i.fillStyle="rgba(175, 130, 120, 0.35)",i.beginPath(),i.arc(a,c+o*.045,2.2,0,Math.PI*2),i.fill();const _=c+o*.108;i.strokeStyle="#734a52",i.lineWidth=3.8,i.lineCap="round",e==="calm"?(i.beginPath(),i.arc(a,_-5,10,.18*Math.PI,.82*Math.PI),i.stroke()):e==="happy"?(i.fillStyle="#f28b9c",i.beginPath(),i.arc(a,_-3,13,.08*Math.PI,.92*Math.PI),i.closePath(),i.fill(),i.stroke()):e==="smug"?(i.beginPath(),i.arc(a-8,_-1,8,.08*Math.PI,.95*Math.PI),i.arc(a+8,_-1,8,.05*Math.PI,.92*Math.PI),i.stroke()):e==="sleepy"?(i.fillStyle="#f29aa8",i.beginPath(),i.ellipse(a,_+2,7,9,0,0,Math.PI*2),i.fill(),i.stroke()):e==="focused"?(i.beginPath(),i.moveTo(a-10,_+2),i.quadraticCurveTo(a,_-3,a+10,_+2),i.stroke()):e==="mimic"&&(i.fillStyle="#f0788c",i.beginPath(),i.ellipse(a,_+3,13,11,0,0,Math.PI*2),i.fill(),i.stroke())}class i2{constructor(){this.root=new te,this.root.name="FrierenRoot",this.eyeKey="violet",this.expression="calm",this.useToon=!0,this.skeletonVisible=!1,this.selectedJoint="head",this.warmToonMap=Qh(!1),this.coolToonMap=Qh(!0),this.joints={},this.bonePairs=[],this.characterMeshes=[],this.materials={},this.jointMarkers={},this.boneLines=[],this.faceCanvas=document.createElement("canvas"),this.faceCanvas.width=1024,this.faceCanvas.height=512,this.faceTexture=new kn(this.faceCanvas),this.faceTexture.colorSpace=Fe,Va(this.faceCanvas,this.eyeKey,this.expression),this.torsoTexture=e2(),this.skirtTexture=n2(),this._initMaterials(),this._buildSkeletonAndBody(),this._buildProps(),this._buildSkeletonOverlay()}_makeMat(t,e={}){const{cool:i=!1,doubleSide:s=!1,metalness:o=.05,roughness:r=.58,...a}=e,c=s?Sn:ri;return this.useToon?new e0({color:t,gradientMap:i?this.coolToonMap:this.warmToonMap,side:c,...a}):new ct({color:t,roughness:r,metalness:o,side:c,...a})}_initMaterials(){this.materials.skin=this._makeMat("#fcebe2"),this.materials.earInner=this._makeMat("#f3c1bc"),this.materials.face=this._makeMat("#ffffff",{map:this.faceTexture}),this.materials.hair=this._makeMat("#eceaf4",{cool:!0,roughness:.48}),this.materials.whiteCloth=this._makeMat("#faf8f5",{doubleSide:!0,roughness:.65}),this.materials.torsoStriped=this._makeMat("#ffffff",{map:this.torsoTexture}),this.materials.skirtFabric=this._makeMat("#ffffff",{map:this.skirtTexture,doubleSide:!0}),this.materials.gold=new ct({color:"#e2bd6b",metalness:.52,roughness:.32}),this.materials.belt=this._makeMat("#28252f"),this.materials.leggings=this._makeMat("#2d2b36"),this.materials.boot=this._makeMat("#7c533c",{roughness:.72}),this.materials.bootCuff=this._makeMat("#91644a",{roughness:.75}),this.materials.bootSole=this._makeMat("#4b3123",{roughness:.85}),this.materials.staffWood=this._makeMat("#8e1f29",{roughness:.45}),this.materials.redRibbon=this._makeMat("#b22234",{doubleSide:!0}),this.materials.ruby=new t0({color:"#d9162d",emissive:"#8f0a1c",emissiveIntensity:.55,roughness:.1,metalness:.08,clearcoat:1,clearcoatRoughness:.08}),this.materials.bookCover=this._makeMat("#3b2a54",{roughness:.6}),this.materials.bookPages=this._makeMat("#f4ead3",{roughness:.85})}_addMesh(t,e,i,s=[0,0,0],o=[0,0,0],r=[1,1,1],a=!0){const c=new ht(e,this.materials[i]);return c.position.set(...s),c.rotation.set(...o),c.scale.set(...r),c.castShadow=!0,c.receiveShadow=a,c.userData.matKey=i,t.add(c),this.characterMeshes.push(c),c}_createJoint(t,e,i=[0,0,0]){const s=new te;return s.name=`joint_${t}`,s.position.set(...i),e.add(s),this.joints[t]=s,e!==this.root&&this.bonePairs.push([e,s]),s}_buildSkeletonAndBody(){const t=this._createJoint("hips",this.root,[0,.57,0]);this._addMesh(t,new he(.175,16,14),"leggings",[0,0,0],[0,0,0],[1.05,.74,.92]);const e=new oe(.17,.355,.27,24,1,!0);this._addMesh(t,e,"skirtFabric",[0,-.04,0]),this._addMesh(t,new Pe(.352,.014,10,32),"gold",[0,-.17,0],[Math.PI/2,0,0]);const i=this._createJoint("spine",t,[0,.07,0]);this._addMesh(i,new oe(.155,.17,.21,20),"torsoStriped",[0,.09,0]),this._addMesh(i,new At(.068,.048,.025),"gold",[0,.005,.168]),this._addMesh(i,new At(.036,.026,.028),"belt",[0,.005,.17]);const s=this._createJoint("chest",i,[0,.17,0]);this._addMesh(s,new oe(.175,.155,.19,20),"torsoStriped",[0,.085,0],[0,0,0],[1.06,1,.88]);for(const g of[-1,1]){const{meshGeo:_,trimGeo:p}=t2(g);this._addMesh(s,_,"whiteCloth",[0,0,0],[0,0,0],[1,1,1],!1),this._addMesh(s,p,"gold",[0,0,0],[0,0,0],[1,1,1],!1)}this._addMesh(s,new Pe(.078,.011,8,18,Math.PI),"gold",[.18,.155,0],[0,Math.PI/2,-.35]),this._addMesh(s,new Pe(.078,.011,8,18,Math.PI),"gold",[-.18,.155,0],[0,-Math.PI/2,.35]);const o=this._createJoint("capeBack",s,[0,.17,-.08]),{capeGeo:r,trimGeo:a}=Qx();this._addMesh(o,r,"whiteCloth",[0,0,0],[0,0,0],[1,1,1],!1),this._addMesh(o,a,"gold",[0,0,0],[0,0,0],[1,1,1],!1),this._addMesh(o,new cl(.025,1),"ruby",[0,-.015,-.15]);const c=this._createJoint("neck",s,[0,.19,0]);this._addMesh(c,new oe(.115,.13,.085,20),"whiteCloth",[0,.025,0]),this._addMesh(c,new Pe(.116,.011,8,24),"gold",[0,.064,0],[Math.PI/2,0,0]),this._addMesh(c,new Pe(.13,.012,8,24),"gold",[0,-.012,0],[Math.PI/2,0,0]),this._addMesh(c,new he(.022,12,12),"ruby",[0,.028,.125]),this._addMesh(c,new oe(.068,.075,.09,14),"skin",[0,.055,0]);const l=this._createJoint("head",c,[0,.085,0]);this._addMesh(l,new he(.425,40,30),"face",[0,.365,0],[0,0,0],[1.07,.94,.98],!1);const h=g=>{const _=g==="L"?1:-1,p=this._createJoint(`ear${g}`,l,[_*.41,.32,-.02]),m=yn([[0,0,0],[_*.1,.025,-.01],[_*.21,.065,-.025],[_*.29,.105,-.035]],v=>v<.15?.072:.075*Math.pow(1-(v-.1)/.9,.95),14,10,[.45,1.05]);this._addMesh(p,m,"skin",[0,0,0],[0,0,0],[1,1,1],!1);const x=yn([[_*.03,.005,.022],[_*.13,.032,.015],[_*.23,.075,-.004]],v=>.036*(1-v*.85),10,8,[.32,.9]);this._addMesh(p,x,"earInner",[0,0,0],[0,0,0],[1,1,1],!1),this._addMesh(p,new oe(.006,.006,.085,8),"gold",[_*.105,-.052,.025]);const M=[new it(.001,-.048),new it(.024,-.024),new it(.02,0),new it(.008,.026),new it(.001,.038)];this._addMesh(p,new qi(M,14),"ruby",[_*.105,-.125,.025],[0,0,0],[1,1,1],!1)};h("L"),h("R"),this._addMesh(l,new he(.45,36,26,0,Math.PI*2,0,Math.PI*.49),"hair",[0,.385,-.04],[-.52,0,0],[1.07,.99,1.03],!1),this._addMesh(l,new he(.445,32,24),"hair",[0,.355,-.07],[0,0,0],[1.05,.95,.95],!1),this._addMesh(l,new he(.32,20,16),"hair",[0,.16,-.19],[0,0,0],[1.12,.72,.72],!1);for(const g of[-1,1]){const _=yn([[g*.014,.785,.12],[g*.11,.69,.315],[g*.255,.54,.39],[g*.365,.34,.335],[g*.39,.14,.225],[g*.345,.01,.16]],x=>x<.2?.075+x*.24:x<.75?.122-(x-.2)*.048:Math.max(.01,.095*(1-(x-.75)/.25)),28,14,[1.08,.56]);this._addMesh(l,_,"hair",[0,0,0],[0,0,0],[1,1,1],!1);const p=yn([[g*.035,.79,.04],[g*.22,.71,.24],[g*.385,.53,.26],[g*.435,.34,.18],[g*.4,.13,.12]],x=>x<.5?.105+Math.sin(x*Math.PI)*.03:Math.max(.012,.115*(1-(x-.5)/.5)),24,12,[1.02,.58]);this._addMesh(l,p,"hair",[0,0,0],[0,0,0],[1,1,1],!1);const m=yn([[g*.33,.46,.33],[g*.36,.26,.295],[g*.31,.09,.24],[g*.26,0,.2]],x=>Math.max(.008,.048*(1-x*.88)),16,10,[.9,.55]);this._addMesh(l,m,"hair",[0,0,0],[0,0,0],[1,1,1],!1)}const u=g=>{const _=g==="L"?1:-1,p=this._createJoint(`hair${g}1`,l,[_*.31,.62,-.14]);this._addMesh(p,new Pe(.072,.018,10,22),"gold",[_*.025,.01,-.01],[.25,_*.95,0]);const m=yn([[0,0,0],[_*.13,.075,-.02],[_*.26,-.07,-.06],[_*.33,-.26,-.085],[_*.365,-.44,-.09]],E=>.088+Math.sin(E*Math.PI)*.048-E*.006,30,16,[1,.88]);this._addMesh(p,m,"hair",[0,0,0],[0,0,0],[1,1,1],!1);const x=this._createJoint(`hair${g}2`,p,[_*.365,-.43,-.09]);this._addMesh(x,new Pe(.076,.026,14,28),"gold",[0,.005,0],[Math.PI/2,-_*.2,0]);const M=yn([[0,.025,0],[_*.075,-.17,-.01],[_*.135,-.37,.02],[_*.085,-.55,.05],[_*-.01,-.67,.04]],E=>E<.24?.082+E*.14:Math.max(.008,.116*Math.pow(1-(E-.22)/.78,1.15)),30,16,[1.02,.78]);this._addMesh(x,M,"hair",[0,0,0],[0,0,0],[1,1,1],!1);const v=yn([[_*.02,-.02,-.01],[_*.15,-.19,-.04],[_*.23,-.39,-.02],[_*.16,-.54,.01]],E=>Math.max(.006,.056*(1-E*.9)),22,10,[.92,.58]);this._addMesh(x,v,"hair",[0,0,0],[0,0,0],[1,1,1],!1);const w=yn([[-_*.02,-.04,.01],[_*.01,-.24,.04],[-_*.04,-.45,.06],[-_*.1,-.56,.04]],E=>Math.max(.006,.052*(1-E*.88)),20,10,[.92,.62]);this._addMesh(x,w,"hair",[0,0,0],[0,0,0],[1,1,1],!1)};u("L"),u("R");const f=g=>{const _=g==="L"?1:-1,p=this._createJoint(`shoulder${g}`,s,[_*.195,.14,0]);this._addMesh(p,new he(.075,14,12),"whiteCloth",[_*.02,-.01,0]);const m=this._createJoint(`upperArm${g}`,p,[_*.04,-.02,0]);this._addMesh(m,new On(.056,.12,8,14),"whiteCloth",[0,-.095,0]);const x=this._createJoint(`forearm${g}`,m,[0,-.19,0]);this._addMesh(x,new On(.055,.11,8,14),"whiteCloth",[0,-.085,0]),this._addMesh(x,new oe(.064,.07,.05,16),"gold",[0,-.145,0]),this._addMesh(x,new Pe(.068,.009,8,18),"whiteCloth",[0,-.168,0],[Math.PI/2,0,0]);const M=this._createJoint(`hand${g}`,x,[0,-.185,0]);this._addMesh(M,new he(.054,14,12),"skin",[0,-.02,0],[0,0,0],[.96,1.05,.88]),this._addMesh(M,new he(.022,8,8),"skin",[-_*.04,-.012,.028])};f("L"),f("R");const d=g=>{const _=g==="L"?1:-1,p=this._createJoint(`thigh${g}`,t,[_*.105,-.04,0]);this._addMesh(p,new On(.068,.12,8,14),"leggings",[0,-.11,0]);const m=this._createJoint(`shin${g}`,p,[0,-.22,0]);this._addMesh(m,new On(.058,.07,8,14),"leggings",[0,-.055,0]),this._addMesh(m,new oe(.075,.072,.055,16),"bootCuff",[0,-.115,0]),this._addMesh(m,new oe(.064,.068,.1,16),"boot",[0,-.185,0]);const x=this._createJoint(`foot${g}`,m,[0,-.23,0]);this._addMesh(x,new he(.072,16,12),"boot",[0,-.032,.032],[0,0,0],[.96,.7,1.38]),this._addMesh(x,new oe(.066,.068,.024,16),"bootSole",[0,-.068,.03],[0,0,0],[.98,1,1.38])};d("L"),d("R")}_buildProps(){const t=this._createJoint("staffPivot",this.joints.chest,[0,-.02,.22]);this.propGroups={none:null};const e=new te;e.name="Prop_FrierenStaff",this._addMesh(e,new oe(.022,.022,1.38,14),"staffWood",[0,-.06,0]);const i=[new it(.001,-.07),new it(.034,-.055),new it(.022,-.025),new it(.036,0),new it(.025,.035)];this._addMesh(e,new qi(i,14),"gold",[0,-.75,0]);const s=[new it(.025,-.07),new it(.042,-.04),new it(.028,-.01),new it(.05,.025),new it(.032,.06)];this._addMesh(e,new qi(s,16),"gold",[0,.62,0]);const o=.85,r=.32*Math.PI,a=1.52*Math.PI;this._addMesh(e,new Pe(.185,.026,16,40,a),"gold",[0,o,0],[0,0,r]);const c=[r,r+a,.62*Math.PI,1.04*Math.PI,1.46*Math.PI];for(const u of c)this._addMesh(e,new he(.025,12,12),"gold",[Math.cos(u)*.198,o+Math.sin(u)*.198,0]);for(const u of[.55*Math.PI,1.02*Math.PI,1.5*Math.PI])this._addMesh(e,new oe(.011,.011,.095,10),"gold",[Math.cos(u)*.138,o+Math.sin(u)*.138,0],[0,0,u-Math.PI/2]);this._addMesh(e,new Pe(.092,.016,14,28),"gold",[0,o,0]),this.rubyMesh=this._addMesh(e,new he(.088,28,22),"ruby",[0,o,0],[0,0,0],[1,1,.78],!1),this._addMesh(e,new Pe(.044,.014,10,20),"redRibbon",[0,.6,0],[Math.PI/2+.15,0,0]),this._addMesh(e,new Pe(.042,.014,10,20),"redRibbon",[0,.56,0],[Math.PI/2-.15,0,0]);const l=yn([[-.03,.58,.02],[-.13,.51,.03],[-.19,.4,.01],[-.17,.31,-.01]],u=>.022*(1-u*.3),16,10,[1.2,.4]);this._addMesh(e,l,"redRibbon",[0,0,0],[0,0,0],[1,1,1],!1),this._addMesh(e,new Ai(.03,.088,12),"gold",[-.17,.28,-.01],[0,0,.15]),t.add(e),this.propGroups.staff=e;const h=new te;h.name="Prop_Grimoire",h.position.set(.02,-.06,.09),h.rotation.set(.45,-.2,.1),this._addMesh(h,new At(.24,.055,.3),"bookCover",[0,0,0]),this._addMesh(h,new At(.215,.042,.275),"bookPages",[.008,0,0]),this._addMesh(h,new Pe(.055,.008,8,18),"gold",[0,.029,0],[Math.PI/2,0,0]),this._addMesh(h,new he(.018,10,10),"ruby",[0,.031,0]),h.visible=!1,this.joints.handL.add(h),this.propGroups.grimoire=h}_buildSkeletonOverlay(){this.skeletonGroup=new te,this.skeletonGroup.name="SkeletonOverlay",this.skeletonGroup.visible=!1;const t=new he(.034,12,12);for(const[i,s]of Object.entries(this.joints)){const o=new Ci({color:"#63f5d0",depthTest:!1,transparent:!0,opacity:.95}),r=new ht(t,o);r.renderOrder=999,s.add(r),r.visible=!1,this.jointMarkers[i]=r}const e=new ol({color:"#ffd659",depthTest:!1,transparent:!0,opacity:.95});for(const[i,s]of this.bonePairs){const o=new ye().setFromPoints([new U,new U]),r=new ku(o,e);r.renderOrder=998,r.frustumCulled=!1,this.skeletonGroup.add(r),this.boneLines.push({line:r,parent:i,child:s})}this.root.add(this.skeletonGroup)}updateSkeletonOverlay(){if(!this.skeletonVisible)return;this.root.updateMatrixWorld(!0);const t=new ee().copy(this.root.matrixWorld).invert(),e=new U,i=new U;for(const s of this.boneLines){s.parent.getWorldPosition(e).applyMatrix4(t),s.child.getWorldPosition(i).applyMatrix4(t);const o=s.line.geometry.attributes.position;o.setXYZ(0,e.x,e.y,e.z),o.setXYZ(1,i.x,i.y,i.z),o.needsUpdate=!0}}setSkeletonVisible(t){this.skeletonVisible=t,this.skeletonGroup.visible=t;for(const[e,i]of Object.entries(this.jointMarkers))i.visible=t,i.material.color.set(e===this.selectedJoint?"#ff5588":"#63f5d0"),i.scale.setScalar(e===this.selectedJoint?1.55:1);for(const e of Object.values(this.materials))e.transparent=t,e.opacity=t?.38:1,e.needsUpdate=!0}setSelectedJoint(t){this.selectedJoint=t;for(const[e,i]of Object.entries(this.jointMarkers))i.material.color.set(e===t?"#ff5588":"#63f5d0"),i.scale.setScalar(e===t?1.55:1)}setProp(t){for(const[e,i]of Object.entries(this.propGroups))i&&(i.visible=e===t)}setExpression(t){this.expression=t,Va(this.faceCanvas,this.eyeKey,this.expression),this.faceTexture.needsUpdate=!0}setEyePalette(t){this.eyeKey=t,Va(this.faceCanvas,this.eyeKey,this.expression),this.faceTexture.needsUpdate=!0}setRubyGlow(t){this.materials.ruby.emissiveIntensity=t}setToonShading(t){if(this.useToon===t)return;this.useToon=t;const e=this.skeletonVisible?.38:1;this._initMaterials();for(const i of Object.values(this.materials))i.transparent=this.skeletonVisible,i.opacity=e;for(const i of this.characterMeshes)i.material=this.materials[i.userData.matKey]}resetAllJoints(){this.joints.hips.position.set(0,.57,0),this.joints.staffPivot.position.set(0,-.02,.22);for(const t of Object.values(this.joints))t.rotation.set(0,0,0)}}const s2=Math.PI/180,F=n=>n*s2;function o2(n=.57){return{hipsPos:[0,n,0],staffPos:[-.04,-.05,.24],staffRot:[.06,.12,F(56)],magicCircle:!1,rubyGlow:.55,rot:{hips:[0,0,0],spine:[0,0,0],chest:[0,0,0],neck:[0,0,0],head:[0,0,0],earL:[0,0,0],earR:[0,0,0],hairL1:[0,0,0],hairL2:[0,0,0],hairR1:[0,0,0],hairR2:[0,0,0],capeBack:[0,0,0],shoulderL:[0,0,0],upperArmL:[0,0,0],forearmL:[0,0,0],handL:[0,0,0],shoulderR:[0,0,0],upperArmR:[0,0,0],forearmR:[0,0,0],handR:[0,0,0],thighL:[0,0,0],shinL:[0,0,0],footL:[0,0,0],thighR:[0,0,0],shinR:[0,0,0],footR:[0,0,0]}}}function r2(n,t,e=!0){const i=o2(.57),s=i.rot;switch(n){case"walk_ref":{const o=t*5.2,r=Math.sin(o),a=Math.cos(o),c=Math.abs(a);i.hipsPos[1]=.55+c*.06,s.hips=[.07,-r*.12,r*.05],s.spine=[.04,r*.08,-r*.03],s.chest=[.03,r*.08,0],s.head=[-.06,-r*.05,r*.05],i.staffPos=[-.03,-.05+c*.018,.28],i.staffRot=[.06+r*.05,.06,F(56)+r*.06],s.upperArmR=[F(-48)-r*.08,F(-12),F(-6)],s.forearmR=[F(-58),0,F(26)],s.upperArmL=[F(-36)+r*.08,F(16),F(-4)],s.forearmL=[F(-46),0,F(-36)],s.thighL=[-r*.52-.06,0,.04],s.shinL=[Math.max(.06,(a+.55)*.72),0,0],s.footL=[Math.max(0,a)*.22,0,0],s.thighR=[r*.52-.06,0,-.04],s.shinR=[Math.max(.06,(-a+.55)*.72),0,0],s.footR=[Math.max(0,-a)*.22,0,0];break}case"idle":{const o=Math.sin(t*2.1),r=Math.sin(t*1.05);i.hipsPos[1]=.57+o*.012,s.hips=[0,r*.04,r*.02],s.spine=[o*.02,0,-r*.015],s.chest=[o*.025,0,0],s.head=[Math.sin(t*1.1)*.035,Math.sin(t*.7)*.07,r*.04],i.staffPos=[-.03,-.06+o*.01,.28],i.staffRot=[.05,.06,F(55)+o*.025],s.upperArmR=[F(-46),F(-12),F(-6)],s.forearmR=[F(-56),0,F(26)],s.upperArmL=[F(-34),F(16),F(-4)],s.forearmL=[F(-44),0,F(-34)],s.thighL=[-.03,.06,.04],s.shinL=[.06,0,0],s.thighR=[-.03,-.06,-.04],s.shinR=[.06,0,0];break}case"zoltraak":{const o=Math.sin(t*4.5),r=Math.sin(t*2.2)*.02;i.hipsPos[1]=.56+r,i.magicCircle=!0,i.rubyGlow=1.45+o*.45,s.hips=[.04,F(-28),0],s.spine=[.03,F(12),0],s.chest=[.02,F(14),0],s.head=[-.05,F(4),F(3)],s.shoulderR=[0,F(-12),F(-10)],s.upperArmR=[F(-72)+o*.03,F(-18),F(-34)],s.forearmR=[F(-20),0,F(-8)],s.handR=[F(10),0,0],i.staffPos=[-.36,.14+o*.01,.34],i.staffRot=[F(44)+o*.03,F(-28),F(34)],s.upperArmL=[F(16),0,F(32)],s.forearmL=[F(-36),0,F(-10)],s.thighL=[F(-24),F(14),F(10)],s.shinL=[F(28),0,0],s.thighR=[F(22),F(-14),F(-10)],s.shinR=[F(18),0,0];break}case"flower":{const o=Math.sin(t*2.8),r=Math.cos(t*1.4);i.hipsPos[1]=.57+Math.sin(t*2.8)*.025,i.magicCircle=!0,i.rubyGlow=1.15+o*.3,s.hips=[0,r*.12,r*.05],s.spine=[-.05,-r*.06,0],s.chest=[-.06,0,0],s.head=[-.14,r*.12,-r*.1],s.upperArmR=[F(-45),0,F(-128)+o*.16],s.forearmR=[F(-28),0,F(-14)+o*.18],i.staffPos=[-.36+o*.05,.44,.14],i.staffRot=[F(10),0,F(22)-o*.22],s.upperArmL=[F(-35),F(18),F(18)],s.forearmL=[F(-72),0,F(-28)],s.thighL=[F(-8),F(8),F(6)],s.shinL=[F(12),0,0],s.thighR=[F(6),F(-8),F(-6)],s.shinR=[F(10),0,0];break}case"float":{const o=Math.sin(t*2.4),r=Math.cos(t*1.2);i.hipsPos[1]=.86+o*.09,i.magicCircle=!0,i.rubyGlow=.95+o*.2,s.hips=[F(10)+o*.04,r*.1,r*.05],s.spine=[F(-6),0,-r*.04],s.chest=[F(-6),0,0],s.head=[F(-4),-r*.08,F(6)+r*.06],i.staffPos=[-.03,-.04,.28],i.staffRot=[.08,.06,F(52)+o*.05],s.upperArmR=[F(-48),F(-12),F(-6)],s.forearmR=[F(-58),0,F(26)],s.upperArmL=[F(-36),F(16),F(-4)],s.forearmL=[F(-46),0,F(-36)],s.thighL=[F(-18)+o*.08,F(8),F(8)],s.shinL=[F(42)-o*.1,0,0],s.footL=[F(28),0,0],s.thighR=[F(10)-o*.08,F(-8),F(-8)],s.shinR=[F(64)+o*.1,0,0],s.footR=[F(32),0,0];break}case"sleepy":{const o=Math.sin(t*1.9),r=Math.sin(t*.95);i.hipsPos[1]=.56,s.hips=[0,0,r*.05],s.spine=[.06+Math.max(0,o)*.08,0,r*.04],s.chest=[.05,0,0],s.head=[F(12)+Math.pow(Math.max(0,o),1.5)*.34,r*.1,r*.16],i.staffPos=[-.28,-.02,.18],i.staffRot=[F(12),0,F(8)+r*.06],s.upperArmR=[F(-18),0,F(-14)],s.forearmR=[F(-45),0,F(10)],s.upperArmL=[F(8),0,F(14)],s.forearmL=[F(-18),0,0],s.thighL=[-.02,-.06,.03],s.thighR=[-.02,.06,-.03];break}case"ref_front":{i.hipsPos[1]=.57,s.hips=[.04,F(-4),F(2)],s.spine=[.02,F(2),0],s.chest=[.02,F(2),0],s.head=[F(-2),0,F(3)],i.staffPos=[-.03,-.05,.28],i.staffRot=[.05,.06,F(56)],s.upperArmR=[F(-48),F(-12),F(-6)],s.forearmR=[F(-58),0,F(26)],s.upperArmL=[F(-36),F(16),F(-4)],s.forearmL=[F(-46),0,F(-36)],s.thighR=[F(-2),F(-4),F(-3)],s.shinR=[F(4),0,0],s.thighL=[F(-10),F(6),F(4)],s.shinL=[F(62),0,0],s.footL=[F(18),0,0];break}case"tpose":{i.hipsPos[1]=.57,s.upperArmL=[0,0,F(90)],s.upperArmR=[0,0,F(-90)],i.staffPos=[-.62,.06,0],i.staffRot=[0,0,0];break}case"apose":{i.hipsPos[1]=.57,s.upperArmL=[0,0,F(40)],s.forearmL=[F(-8),0,0],s.upperArmR=[0,0,F(-40)],s.forearmR=[F(-8),0,0],s.thighL=[0,F(6),F(7)],s.thighR=[0,F(-6),F(-7)],i.staffPos=[-.52,.06,.04],i.staffRot=[0,0,F(8)];break}case"smug":{i.hipsPos[1]=.58,s.hips=[F(-4),F(-10),F(4)],s.spine=[F(-6),F(6),F(-4)],s.chest=[F(-8),F(6),0],s.head=[F(-12),F(-6),F(10)],s.upperArmL=[F(12),0,F(54)],s.forearmL=[F(-55),0,F(-68)],s.upperArmR=[F(12),0,F(-54)],s.forearmR=[F(-55),0,F(68)],i.staffPos=[-.52,.08,-.05],i.staffRot=[0,0,F(14)],s.thighL=[F(-6),F(10),F(8)],s.thighR=[F(6),F(-10),F(-8)];break}case"kiss":{i.hipsPos[1]=.57,s.hips=[0,F(-14),F(4)],s.spine=[F(4),F(8),F(-4)],s.chest=[F(2),F(10),0],s.head=[F(-4),F(-4),F(14)],s.upperArmR=[F(-62),F(-25),F(-34)],s.forearmR=[F(-102),0,F(38)],s.handR=[F(20),F(-15),0],s.upperArmL=[F(-18),0,F(24)],s.forearmL=[F(-35),0,F(-12)],i.staffPos=[.34,.04,.16],i.staffRot=[F(8),0,F(-12)],s.thighL=[F(-6),F(8),F(5)],s.thighR=[F(12),F(-8),F(-8)],s.shinR=[F(48),0,0];break}case"sit":{i.hipsPos=[0,.3,-.04],s.hips=[F(-8),0,0],s.spine=[F(8),0,0],s.chest=[F(6),0,0],s.head=[F(12),F(6),F(-6)],s.upperArmL=[F(-42),F(14),F(14)],s.forearmL=[F(-68),0,F(-22)],s.handL=[F(10),0,0],s.upperArmR=[F(-32),F(-12),F(-16)],s.forearmR=[F(-62),0,F(24)],i.staffPos=[-.42,.02,.08],i.staffRot=[F(16),0,F(16)],s.thighL=[F(-85),F(12),F(8)],s.shinL=[F(36),0,0],s.footL=[F(18),0,0],s.thighR=[F(-85),F(-12),F(-8)],s.shinR=[F(24),0,0],s.footR=[F(22),0,0];break}}if(e){const o=["walk_ref","idle","zoltraak","flower","float","sleepy"].includes(n),r=n==="walk_ref"?5.2:n==="zoltraak"?4.5:2.3,a=n==="walk_ref"?.2:n==="float"?.18:n==="zoltraak"?.16:o?.09:.035,c=n==="float"?.32:n==="zoltraak"?.28:n==="walk_ref"?.18:.05,l=Math.sin(t*r),h=Math.sin(t*r-.85);s.hairL1=[c*.7+l*a*.45,0,.08+Math.abs(l)*a*.6],s.hairL2=[c*.5+h*a*.7,0,.06+h*a*.65],s.hairR1=[c*.7-l*a*.45,0,-.08-Math.abs(l)*a*.6],s.hairR2=[c*.5-h*a*.7,0,-.06-h*a*.65],s.capeBack=[c+Math.sin(t*r*.9)*a*.65,0,l*a*.25];const u=n==="sleepy"?-.14:Math.sin(t*2)*.035;s.earL=[0,0,u],s.earR=[0,0,-u]}return i}const Gt="#f1e9da",Ro="#eadcc2",Co="#cfc4b2";function $s(n,t,e,i,s){i==="front"?n.push(0,0,e/2,0):i==="back"?n.push(0,0,-e/2,Math.PI):i==="right"?n.push(t/2,0,0,Math.PI/2):n.push(-t/2,0,0,-Math.PI/2),s(i==="front"||i==="back"?t:e),n.pop()}function _e(n,t,e,i,s,o,r){for(const a of t)Dt(n,a,e,i,s,o,r)}const a2={id:"townhouse",label:"洋風連棟町屋",width:8,depth:10,height:14.5,wallTints:["#f2d9cc","#f4e6cc","#dbe7dc","#d9e3ef","#f6e7b0","#f5f1ea","#e9cfa6"],roofTints:["#5d6b7a","#4a4d57","#6fa392","#7a4a42"],fabricTints:["#b8423a","#2f6d5a","#2d5a8c","#c98a2e","#7d3f6e"],build:(n,t)=>{n.boxUp("stone",8+.3,.6,10+.3,0,0,0,Co),n.boxUp("stone",8,3.8-.6,10,0,.6,0,"#efe4d0"),n.boxUp("wall",8,10.4-3.8,10,0,3.8,0);for(const a of["front","back","right","left"])$s(n,8,10,a,c=>{if(hi(n,c,3.8+.05,Gt),li(n,c,10.4,Gt,t,a==="front"||a==="back"),a==="front"){if(_e(n,[-2.3,2.3],.9,2,2.6,{frameMat:"wood",frame:"#5a3a28",top:"arch",sill:!0,mullion:!0},t),n.boxUp("wood",1.3,2.5,.12,0,.6,.04,"#4e3324"),n.box("glass",1.1,.5,.05,0,3.4,.04),t){n.box("wood",1.6,.14,.18,0,3.12,.09,"#3a281d");for(const l of[-2.3,2.3])n.box("fabric",2.7,.06,1.25,l,3.55,.6,"#ffffff",.38);Ri(n,-8/2,3.8,10.4,1,Gt),Ri(n,8/2,3.8,10.4,-1,Gt),n.box("stone",8-.6,.18,1,0,3.8+.09,.5,Gt)}es(n,8-.8,3.8+.18,.9,Gt,t),_e(n,[-2.4,0,2.4],3.8+.45,1.15,2.2,{frameMat:"stone",frame:Gt,top:"pediment",sill:!0,mullion:!0},t),_e(n,[-2.4,0,2.4],3.8+3.75,1.15,2,{frameMat:"stone",frame:Gt,top:"cornice",sill:!0,mullion:!0,flowers:!0,shutters:"#4f6f63"},t)}else a==="back"?(_e(n,[-2.4,2.4],1,1.2,2,{frameMat:"stone",frame:Gt,top:"keystone",sill:!0,mullion:!0},t),_e(n,[-2.4,0,2.4],3.8+.6,1.1,2,{frameMat:"stone",frame:Gt,top:"keystone",sill:!0,mullion:!0},t),_e(n,[-2.4,0,2.4],3.8+3.8,1.1,1.9,{frameMat:"stone",frame:Gt,top:"none",sill:!0,mullion:!0,balconet:!0},t)):(_e(n,[-2.2,2.2],3.8+.6,1,1.9,{frameMat:"stone",frame:Gt,top:"none",sill:!0,mullion:!1},t),_e(n,[-2.2,2.2],3.8+3.8,1,1.8,{frameMat:"stone",frame:Gt,top:"none",sill:!0,mullion:!1},t))});const r=10.4+.54;if(ff(n,8,10,2.6,.9,1,r,"#ffffff",t),t){for(const a of[-1.8,1.8])To(n,a,r+.3,10/2-.25,1.1,1.6,"#ffffff",Ro,t,a<0),n.push(0,0,0,Math.PI),To(n,a,r+.3,10/2-.25,1.1,1.6,"#ffffff",Ro,t),n.pop();ks(n,-8/2+.9,r+1,-1.5,3.2,t),ks(n,8/2-.9,r+1,-1.5,3.2,t),Xn(n,0,r+3.5,0,1.2)}}},c2={id:"mansion",label:"大正浪漫洋館",width:13,depth:11,height:13,wallTints:["#f5f1ea","#f3e3c8","#e3ecf3","#f2dcd2","#e5efdf","#f6eac4"],roofTints:["#4f6478","#7c3e36","#3f4a52","#6c8f86","#b0603f"],fabricTints:["#ffffff"],build:(n,t)=>{n.boxUp("stone",13+.4,.8,11+.4,0,0,0,Co),n.boxUp("wall",13,8.4-.8,11,0,.8,0);const r="#3f6b5a";for(const c of["front","back","right","left"])$s(n,13,11,c,l=>{if(hi(n,l,.8+3.85,Gt),li(n,l,8.4,Gt,t,!0),t&&(Ri(n,-l/2,.8,8.4,1,Gt),Ri(n,l/2,.8,8.4,-1,Gt)),c==="front"){_e(n,[-5,-3.2,3.2,5],.8+.8,1.15,2.3,{frameMat:"stone",frame:Gt,top:"pediment",sill:!0,mullion:!0,shutters:r},t),_e(n,[-5,-3.2,3.2,5],.8+4.6,1.15,2.2,{frameMat:"stone",frame:Gt,top:"cornice",sill:!0,mullion:!0,shutters:r,flowers:!0},t),Dt(n,0,.8+4.3,1.4,2.8,{frameMat:"stone",frame:Gt,top:"arch",sill:!1,mullion:!0},t),n.boxUp("wood",1.7,2.7,.14,0,.8,.05,"#5b3a26"),t&&(n.box("wood",.05,2.5,.05,0,.8+1.3,.13,"#3a2418"),n.cyl("glass",.85,.85,.05,10,0,.8+2.75,.03,void 0,Math.PI/2,0,!1,Math.PI/2,Math.PI));for(const h of[-1.9,-.65,.65,1.9])Eo(n,h,2.2,.8,3.8,.2,Gt,t);if(n.boxUp("stone",4.9,.55,2.7,0,.8+3.8,1.25,Gt),es(n,4.9,.8+4.35,2.45,Gt,t),t)for(const h of[-2.35,2.35])n.push(h,0,1.25,Math.PI/2),es(n,2.3,.8+4.35,0,Gt,t),n.pop();for(let h=0;h<3;h++)n.boxUp("stone",4.4-h*.3,.8-h*.27,.45,0,0,3+.9-h*.45,Co)}else c==="back"?(_e(n,[-4.8,-2.4,0,2.4,4.8],.8+.8,1.1,2.2,{frameMat:"stone",frame:Gt,top:"keystone",sill:!0,mullion:!0},t),_e(n,[-4.8,-2.4,0,2.4,4.8],.8+4.6,1.1,2.1,{frameMat:"stone",frame:Gt,top:"cornice",sill:!0,mullion:!0},t)):(_e(n,[-3.2,0,3.2],.8+.8,1.1,2.2,{frameMat:"stone",frame:Gt,top:"keystone",sill:!0,mullion:!0,shutters:r},t),_e(n,[-3.2,0,3.2],.8+4.6,1.1,2.1,{frameMat:"stone",frame:Gt,top:"none",sill:!0,mullion:!0,shutters:r},t))});const a=8.4+.54;if(js(n,13,11,3.4,.45,a,"#ffffff",t),t){for(const c of[-3.4,3.4])To(n,c,a+.4,11/2-.15,1,1.5,"#ffffff",Ro,t,!0);ks(n,-13/2+1.6,a+1,-1.2,3.6,t),ks(n,13/2-1.6,a+1,-1.2,3.6,t),Xn(n,-1,a+3.5,0),Xn(n,1,a+3.5,0)}}},l2={id:"tower_house",label:"紅磚塔樓宅",width:10,depth:10,height:19,wallTints:["#f3ead8","#efe0c8","#e6eef2"],roofTints:["#4c5966","#3f4148","#6a8d83","#7a4038"],fabricTints:["#ffffff"],brickTints:["#ffffff","#f0d8cc","#e3d0c6","#f6e6d8"],build:(n,t)=>{n.boxUp("stone",10+.3,.6,10+.3,0,0,0,Co),n.boxUp("brick",10,10.2-.6,10,0,.6,0);for(const f of["front","back","right","left"])$s(n,10,10,f,d=>{hi(n,d,.6+3.2,Gt),hi(n,d,.6+6.4,Gt),li(n,d,10.2,Gt,t,f!=="left");const g={frameMat:"stone",frame:Gt,top:"keystone",sill:!0,mullion:!0};f==="front"?(n.boxUp("brick",4.4,10.2-.6,.6,-2.2,.6,.3),t&&(Ri(n,-4.4,.6,10.2,1,Gt),Ri(n,0,.6,10.2,-1,Gt)),n.push(0,0,.6),Dt(n,-2.2,.6+.5,1.6,2.6,{...g,top:"arch"},t),Dt(n,-2.2,.6+3.7,1.5,2.4,{...g,top:"arch",flowers:!0},t),Dt(n,-2.2,.6+6.9,1.4,2.2,{...g,top:"arch"},t),n.pop(),n.boxUp("wood",1.1,2.4,.12,1.3,.6,.04,"#5a3a28"),Dt(n,1.3,.6+3.7,1,2,g,t),Dt(n,1.3,.6+6.9,1,1.9,{...g,balconet:!0},t)):f==="right"?(_e(n,[-2.6,.6],.6+.7,1,2,g,t),_e(n,[-2.6,.6],.6+3.9,1,1.9,g,t),_e(n,[-2.6,.6],.6+7.1,1,1.8,g,t)):(_e(n,[-2.5,0,2.5],.6+.7,1,2,g,t),_e(n,[-2.5,0,2.5],.6+3.9,1,1.9,g,t),_e(n,[-2.5,0,2.5],.6+7.1,1,1.8,g,t))});const r=10.2+.54;An(n,10,10,3.4,.4,r,"#ffffff","brick","#ffffff",t,"#efe6d6"),n.push(-2.2,r,10/2-1.6,Math.PI/2),An(n,3.8,4.6,2.6,.3,0,"#ffffff","wall","#ffffff",t,"#efe6d6"),n.pop(),t&&(n.push(0,0,10/2+.75),Dt(n,-2.2,r+.4,.8,1.3,{frameMat:"stone",frame:Gt,top:"arch",sill:!0,mullion:!0},t),n.pop());const a=10/2-.5,c=10/2-.5,l=1.9,h=10.2+3.2;n.push(a,0,c,Math.PI/8),n.cyl("brick",l,l,h-.6,8,0,.6+(h-.6)/2,0);for(const f of[.6+3.2,.6+6.4,10.2,h])n.cyl("stone",l+.12,l+.12,.22,8,0,f,0,Gt);n.pop();const u=l*Math.cos(Math.PI/8);for(const f of[0,Math.PI/4,Math.PI/2]){n.push(a,0,c,f),n.push(0,0,u);for(const d of[.6+.7,.6+3.9,.6+7.1,10.2+.6])Dt(n,0,d,.75,d>10.2?1.6:1.8,{frameMat:"stone",frame:Gt,top:"arch",sill:!0,mullion:!1},t);n.pop(),n.pop()}n.push(a,0,c,Math.PI/8),n.cone("roof",l+.45,5.4,8,0,h+.1,0,"#ffffff"),n.pop(),t&&(Xn(n,a,h+5.4,c,1.5),ks(n,-10/2+1.2,r+.8,-1.8,3,t))}},h2={id:"grand_apartment",label:"宏偉公寓大樓",width:16,depth:12,height:19,wallTints:["#f3e6cf","#efe9df","#f2d8c8","#e1e9e4","#f4e9c0"],roofTints:["#6fa392","#5d6b7a","#4a4d57","#7d9fa6"],fabricTints:["#ffffff"],build:(n,t)=>{n.boxUp("stone",16+.3,.5,12+.3,0,0,0,Co),n.boxUp("stone",16,4.4-.5,12,0,.5,0,"#eee2cc"),n.boxUp("wall",16,14-4.4,12,0,4.4,0);const a=[-6,-3,0,3,6];for(const l of["front","back","right","left"])$s(n,16,12,l,h=>{if(n.box("stone",h+.1,.3,.2,0,4.4,.1,Gt),li(n,h,14,Gt,t,l==="front"||l==="back"),l==="front"){if(_e(n,a,.5+.3,2,3.3,{frameMat:"stone",frame:Gt,top:"arch",sill:!1,mullion:!0},t),n.boxUp("wall",5.2,14-4.4,.5,0,4.4,.25),t){for(const f of[-7.6,-4.5,4.5,7.6,-2.6,2.6])n.push(0,0,Math.abs(f)<3?.5:0),gl(n,f,4.4+.15,14-4.4-.15,Gt),n.pop();n.box("stone",16-.6,.18,1.1,0,4.4+.25,.55,Gt)}es(n,16-.8,4.4+.34,1,Gt,t),n.push(0,0,.5),Dt(n,0,4.4+.6,1.4,2.3,{frameMat:"stone",frame:Gt,top:"pediment",sill:!0,mullion:!0},t),Dt(n,0,4.4+3.8,1.3,2.1,{frameMat:"stone",frame:Gt,top:"arch",sill:!0,mullion:!0,balconet:!0},t),Dt(n,0,4.4+7,1.2,1.9,{frameMat:"stone",frame:Gt,top:"keystone",sill:!0,mullion:!0,flowers:!0},t),ta(n,"stone",5.9,1.6,.6,0,14+.55,.1,Gt),t&&n.cyl("glass",.42,.42,.1,12,0,14+1.15,.42,void 0,Math.PI/2),n.pop();const u=[-6,-3,3,6];_e(n,u,4.4+.6,1.3,2.3,{frameMat:"stone",frame:Gt,top:"pediment",sill:!0,mullion:!0},t),_e(n,u,4.4+3.8,1.25,2.1,{frameMat:"stone",frame:Gt,top:"cornice",sill:!0,mullion:!0,balconet:!0},t),_e(n,u,4.4+7,1.2,1.9,{frameMat:"stone",frame:Gt,top:"keystone",sill:!0,mullion:!0,flowers:!0},t)}else if(l==="back"){_e(n,a,.5+.8,1.3,2.4,{frameMat:"stone",frame:Gt,top:"keystone",sill:!0,mullion:!0},t);for(const u of[4.4+.7,4.4+3.9,4.4+7.1])_e(n,a,u,1.2,2,{frameMat:"stone",frame:Gt,top:"none",sill:!0,mullion:!0},t)}else for(const u of[.5+.8,4.4+.7,4.4+3.9,4.4+7.1])_e(n,[-3.5,0,3.5],u,1.1,2,{frameMat:"stone",frame:Gt,top:u<4.4?"keystone":"none",sill:!0,mullion:!0},t)});const c=14+.54;if(ff(n,16,12,3,.8,1.1,c,"#ffffff",t),t){for(const l of[-5.6,-3,3,5.6])To(n,l,c+.35,12/2-.25,1,1.7,"#ffffff",Ro,t,!0),n.push(0,0,0,Math.PI),To(n,l,c+.35,12/2-.25,1,1.7,"#ffffff",Ro,t),n.pop();for(const l of[-5,0,5])ks(n,l,c+1.6,-2.2,3,t);Xn(n,-3.5,c+3.8,0),Xn(n,3.5,c+3.8,0)}}},u2={id:"machiya",label:"京町家",width:8,depth:10,height:8.6,wallTints:["#f0e8da","#e9dfcc","#f4efe4","#e6d7c0"],roofTints:["#4b5563","#555059","#3d4f60","#5a4a42"],fabricTints:["#2b3f66","#8c2f2a","#3d5a45","#5b3b62"],build:(n,t)=>{const r=6.050000000000001,a="#6a4a35";n.boxUp("stone",8+.2,.45,10+.2,0,0,0,"#857f78"),n.boxUp("wood",8,3,10,0,.45,0,a),n.boxUp("wall",8-.2,2.6,10-.2,0,3.45,0);for(const c of["front","back","right","left"])$s(n,8,10,c,l=>{if(c==="front"){if(n.box("glass",4.6,2.2,.05,-1.3,.45+1.2,.03),t){for(let h=0;h<34;h++)n.box("wood",.05,2.3,.08,-3.55+h*.135,.45+1.2,.09,"#4a3122");n.box("wood",4.8,.1,.12,-1.3,.45+2.35,.09,"#4a3122"),n.box("wood",4.8,.1,.12,-1.3,.45+.05,.09,"#4a3122")}if(Dt(n,2.5,.45+.05,1.6,2.2,{frameMat:"wood",frame:"#4a3122",top:"none",sill:!1,mullion:!1,lattice:!0},t),t){for(let h=0;h<3;h++)n.box("fabric",.5,.7,.03,2+h*.52,.45+2,.28,"#ffffff");n.box("wood",1.8,.05,.05,2.5,.45+2.36,.28,"#3a281d"),n.cyl("glow",.17,.17,.5,8,3.55,.45+1.9,.35,"#ffcf8a"),n.cyl("wood",.18,.18,.05,8,3.55,.45+2.17,.35,"#2a1d15")}if(n.box("roof",8+.5,.12,1.35,0,3.45+.15,.62,"#ffffff",.3),t)for(let h=0;h<12;h++)n.box("wood",.07,.07,1.2,-3.85+h*.7,3.45+.02,.6,"#3a281d",.3);for(const h of[-1.9,1.9])if(Dt(n,h,3.45+.75,1.6,.95,{frameMat:"wood",frame:"#4a3122",top:"none",sill:!1,mullion:!1},t),t)for(let u=0;u<9;u++)n.box("wall",.07,.95,.08,h-.72+u*.18,3.45+1.22,.06,"#d9ccb6")}else if(c==="back")Dt(n,-1.6,.45+.9,1.8,1.3,{frameMat:"wood",frame:"#4a3122",top:"none",sill:!0,mullion:!1,lattice:!0},t),Dt(n,1.8,3.45+.6,1.4,1.2,{frameMat:"wood",frame:"#4a3122",top:"none",sill:!1,mullion:!1,lattice:!0},t);else if(Dt(n,2,3.45+.6,1.2,1.1,{frameMat:"wood",frame:"#4a3122",top:"none",sill:!1,mullion:!1,lattice:!0},t),t){for(const h of[-l/2+.12,-1.6,1.6,l/2-.12])n.box("wood",.14,2.6,.06,h,3.45+1.3,.03,a);n.box("wood",l,.12,.06,0,3.45+2,.03,a)}});if(An(n,8,10,2.2,.75,r,"#ffffff","wall","#f0e6d4",t,"#3a281d"),t)for(const c of[-8/2-.7,8/2+.7])n.box("roof",.22,.62,.5,c,r+2.35,0,"#6b6b72")}},f2={id:"modern_house",label:"和洋折衷住宅",width:10,depth:11,height:9,wallTints:["#f4efe6","#ece2d0","#e3e8ea","#f1e4d9","#e8eadf"],roofTints:["#4b5563","#3d4f60","#6e3d34","#555059"],fabricTints:["#ffffff"],build:(n,t)=>{n.push(0,0,-1),n.boxUp("stone",10+.2,.4,9+.2,0,0,0,"#b8b2a8"),n.boxUp("wall",10,6.2-.4,9,0,.4,0);const a="#a4abb2";for(const c of["front","back","right","left"])$s(n,10,9,c,()=>{c==="front"?(n.boxUp("wood",1,2.2,.1,-3.2,.4,.04,"#6b4b33"),n.box("roof",2,.1,1.2,-3.2,.4+2.6,.55,"#ffffff",.12),Dt(n,1.6,.4+.6,2.6,1.7,{frameMat:"metal",frame:a,top:"none",sill:!0,mullion:!0},t),_e(n,[-2.6,1.6],.4+3.6,1.6,1.3,{frameMat:"metal",frame:a,top:"none",sill:!1,mullion:!0},t),n.box("stone",4.6,.16,1.2,1.6,.4+3,.6,"#d8d2c8"),t&&zo(n,4.6,.4+3.08,1.18,1,"#6b7178",1.6)):c==="back"?(_e(n,[-2.8,0,2.8],.4+.8,1.4,1.3,{frameMat:"metal",frame:a,top:"none",sill:!1,mullion:!0},t),_e(n,[-2.8,2.8],.4+3.6,1.4,1.2,{frameMat:"metal",frame:a,top:"none",sill:!1,mullion:!0},t)):(_e(n,[-2,2],.4+.9,1,1.2,{frameMat:"metal",frame:a,top:"none",sill:!1,mullion:!1},t),_e(n,[0],.4+3.7,1,1.1,{frameMat:"metal",frame:a,top:"none",sill:!1,mullion:!1},t),t&&c==="right"&&n.box("metal",.8,.6,.3,2.8,.4+.4,.18,"#d9dcdf"))});js(n,10,9,2.4,.7,6.2,"#ffffff",t,"#e8e1d6"),n.pop(),t&&(n.boxUp("stone",6,1,.22,1.8,0,5.1,"#c9c1b4"),n.boxUp("stone",2.2,1,.22,-3.9,0,5.1,"#c9c1b4"),n.boxUp("plain",6,.5,.5,1.8,1,5.1-.1,"#4f7f3c"),n.boxUp("metal",.36,.3,.2,-2.6,.8,5.1+.15,"#b8423a"))}},_f=[a2,c2,l2,h2,u2,f2],jt={minX:-135,maxX:118,minZ:-122,maxZ:112,centerX:-8.5,centerZ:-5,groundRadius:186},wi={minX:-37,maxX:37,minZ:-27,maxZ:27},gn=2.4,an=9.5,dt={x:92,width:10,minZ:-122,maxZ:112,promenade:3.2},br=6,yr=13,rn=[{id:"Z1w",axis:"x",at:-100,from:jt.minX,to:br,width:5},{id:"Z1e",axis:"x",at:-100,from:yr,to:jt.maxX,width:5},{id:"Z2w",axis:"x",at:-48,from:jt.minX,to:br,width:6},{id:"Z2e",axis:"x",at:-48,from:yr,to:jt.maxX,width:6},{id:"MAIN",axis:"x",at:0,from:jt.minX,to:jt.maxX,width:5.6},{id:"Z4w",axis:"x",at:48,from:jt.minX,to:br,width:6},{id:"Z4e",axis:"x",at:48,from:yr,to:jt.maxX,width:6},{id:"Z5w",axis:"x",at:96,from:jt.minX,to:br,width:5},{id:"Z5e",axis:"x",at:96,from:yr,to:jt.maxX,width:5},{id:"X1",axis:"z",at:-112,from:jt.minZ,to:jt.maxZ,width:5},{id:"X2",axis:"z",at:-62,from:jt.minZ,to:jt.maxZ,width:8,boulevard:!0},{id:"CROSS",axis:"z",at:-6.5,from:-48,to:96,width:4.4},{id:"EAST",axis:"z",at:21.8,from:jt.minZ,to:jt.maxZ,width:3.4},{id:"X5",axis:"z",at:56,from:jt.minZ,to:jt.maxZ,width:5}],Lt={minX:-54.9,maxX:5,minZ:-94.4,maxZ:-54.1,fountainX:-25,fountainZ:-64.5,clockX:-6.5,clockZ:-58.4},tu={xs:[-40,-34,-28,-22,-16,-10,-4],zs:[-76,-71,-66,-61,-56.5]},Bt={minX:-54.9,maxX:-11.8,minZ:54.1,maxZ:90.4,pondX:-33,pondZ:74,pondR:8.5},Ps={xs:[-50,-44,-22,-16],zs:[58,64,70,78,86]},Ie={x:38.8,z:-73,width:13,depth:26},eu=[{minX:wi.minX-1,maxX:wi.maxX+1,minZ:wi.minZ-1,maxZ:wi.maxZ+1},{minX:Lt.minX-1,maxX:Lt.maxX+1,minZ:Lt.minZ-1,maxZ:Lt.maxZ+1},{minX:Bt.minX-1,maxX:Bt.maxX+1,minZ:Bt.minZ-1,maxZ:Bt.maxZ+1},{minX:Ie.x-Ie.width/2-2.5,maxX:Ie.x+Ie.width/2+2.5,minZ:Ie.z-Ie.depth/2-3,maxZ:Ie.z+Ie.depth/2+6},{minX:an-5,maxX:an+5,minZ:-200,maxZ:200}];function Xr(n){let t=n>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function wr(n,t){return n.minX<t.maxX&&n.maxX>t.minX&&n.minZ<t.maxZ&&n.maxZ>t.minZ}function d2(n,t){return t<-102?[["mansion",3],["modern_house",1],["tower_house",2]]:t>98?[["modern_house",3],["machiya",2],["mansion",1]]:n<-62?t>0?[["machiya",3],["modern_house",4],["mansion",1],["townhouse",1]]:[["townhouse",3],["mansion",3],["tower_house",2],["grand_apartment",2]]:n<-6.5?t<0?[["townhouse",4],["grand_apartment",2],["tower_house",1]]:[["machiya",3],["modern_house",2],["townhouse",1]]:n<56?[["townhouse",3],["tower_house",2],["modern_house",2],["machiya",1],["mansion",1]]:n<92?[["grand_apartment",3],["townhouse",3],["tower_house",2]]:[["mansion",3],["tower_house",2],["townhouse",2]]}function p2(n,t){const e=t.reduce((s,[,o])=>s+o,0);let i=n()*e;for(const[s,o]of t)if(i-=o,i<=0)return s;return t[t.length-1][0]}function m2(){const n=s=>s/2+gn+.7,t=[{at:jt.minX,inset:-1,front:!1},{at:-112,inset:n(5),front:!0},{at:-62,inset:n(8),front:!0},{at:-6.5,inset:n(4.4),front:!0},{at:an,inset:4.5,front:!1},{at:21.8,inset:n(3.4),front:!0},{at:56,inset:n(5),front:!0},{at:dt.x,inset:dt.width/2+dt.promenade+.6,front:!0},{at:jt.maxX,inset:-1,front:!1}],e=[{at:jt.minZ,inset:-1,front:!1},{at:-100,inset:n(5),front:!0},{at:-48,inset:n(6),front:!0},{at:0,inset:n(5.6),front:!0},{at:48,inset:n(6),front:!0},{at:96,inset:n(5),front:!0},{at:jt.maxZ,inset:-1,front:!1}],i=[];for(let s=0;s<t.length-1;s++)for(let o=0;o<e.length-1;o++){const r=t[s],a=t[s+1],c=e[o],l=e[o+1],h={minX:r.at+Math.abs(r.inset),maxX:a.at-Math.abs(a.inset),minZ:c.at+Math.abs(c.inset),maxZ:l.at-Math.abs(l.inset)};if(h.maxX-h.minX<8||h.maxZ-h.minZ<8)continue;const u=[];c.front&&u.push("N"),l.front&&u.push("S"),r.front&&u.push("W"),a.front&&u.push("E"),r.at===-6.5&&c.at<-48&&u.includes("W")&&u.splice(u.indexOf("W"),1),a.at===-6.5&&l.at<=-48&&u.includes("E")&&u.splice(u.indexOf("E"),1),i.push({rect:h,fronts:u})}return i}let Wa=null,xf=[];function vf(){return xl(),xf}function xl(){if(Wa)return Wa;const n=Xr(20261126),t=[],e=m2(),i=(o,r,a,c)=>{const l=Math.abs(Math.sin(c))>.5,h=(l?o.depth:o.width)/2,u=(l?o.width:o.depth)/2,f={minX:r-h,maxX:r+h,minZ:a-u,maxZ:a+u};if(eu.some(g=>wr(g,f))||t.some(g=>wr(g.rect,f))||f.minX<jt.minX||f.maxX>jt.maxX||f.minZ<jt.minZ||f.maxZ>jt.maxZ)return!1;const d=o.brickTints??["#ffffff"];return t.push({arch:o,x:r,z:a,rotY:c,wallTint:o.wallTints[Math.floor(n()*o.wallTints.length)],roofTint:o.roofTints[Math.floor(n()*o.roofTints.length)],fabricTint:o.fabricTints[Math.floor(n()*o.fabricTints.length)],brickTint:d[Math.floor(n()*d.length)],rect:f}),!0};for(const o of e){const{rect:r}=o,a=r.maxX-r.minX,c=r.maxZ-r.minZ,l=o.fronts.includes("N"),h=o.fronts.includes("S"),u=o.fronts.includes("E"),f=o.fronts.includes("W"),d=l&&h?c/2-.6:c-.6,g=u&&f?a/2-.6:a-.6;let _=0,p=0;const m=(v,w,E,R)=>{let A=w+.2+n()*.6,y=0,b=0;for(;b++<60;){const D=v==="N"||v==="S"?A:0,V=v==="E"||v==="W"?A:0,G=d2(D||(v==="E"?r.maxX:r.minX),V||(v==="S"?r.maxZ:r.minZ)).map(([k,Q])=>[_f.find(st=>st.id===k),Q]).filter(([k])=>k.depth<=R&&k.width<=E-A);if(G.length===0)break;const Y=p2(n,G),C=A+Y.width/2;let N=0,z=0,I=0;if(v==="N"?(N=C,z=r.minZ+Y.depth/2,I=Math.PI):v==="S"?(N=C,z=r.maxZ-Y.depth/2,I=0):v==="W"?(z=C,N=r.minX+Y.depth/2,I=-Math.PI/2):(z=C,N=r.maxX-Y.depth/2,I=Math.PI/2),i(Y,N,z,I)?(y=Math.max(y,Y.depth),A+=Y.width+.3+n()*1):A+=1.5,A>E-7.5)break}return y};l&&(_=m("N",r.minX,r.maxX,Math.min(12.5,d))),h&&(p=m("S",r.minX,r.maxX,Math.min(12.5,d)));const x=r.minZ+(_?_+.6:0),M=r.maxZ-(p?p+.6:0);M-x>7.8&&(f&&m("W",x,M,Math.min(12.5,g)),u&&m("E",x,M,Math.min(12.5,g)))}const s=[];for(const o of e){const{rect:r}=o;if(!eu.some(a=>wr(a,r)))for(let a=0;a<14;a++){const c=r.minX+2+n()*(r.maxX-r.minX-4),l=r.minZ+2+n()*(r.maxZ-r.minZ-4),h={minX:c-2,maxX:c+2,minZ:l-2,maxZ:l+2};t.some(u=>wr(u.rect,h))||s.some(([u,f])=>Math.hypot(u-c,f-l)<4.5)||s.push([c,l,.9+n()*.5,Math.floor(n()*4)])}}return xf=s,Wa=t,t}function g2(n,t,e=0){for(const i of rn){const s=i.width/2+e;if(i.axis==="x"){if(Math.abs(t-i.at)<s&&n>=i.from-e&&n<=i.to+e)return!0}else if(Math.abs(n-i.at)<s&&t>=i.from-e&&t<=i.to+e)return!0}return!1}function Mf(){const n=Xr(777),t=[],e=[],i=[],s=(a,c)=>a>wi.minX-2&&a<wi.maxX+2&&c>wi.minZ-4&&c<wi.maxZ+4,o=(a,c)=>rn.some(l=>{if(l.axis===a.axis)return!1;const h=l.at;return a.at>=l.from-4&&a.at<=l.to+4&&Math.abs(c-h)<l.width/2+gn+2.5})||a.axis==="x"&&Math.abs(c-an)<7||a.axis==="x"&&Math.abs(c-dt.x)<8,r=(a,c)=>a>Lt.minX-1&&a<Lt.maxX+1&&c>Lt.minZ-1&&c<Lt.maxZ+1;for(const a of rn){const c=a.width/2+gn-.55;let l=0;for(let h=a.from+6;h<a.to-4;h+=11)if(!o(a,h)){for(const u of[-1,1]){const f=a.axis==="x"?h:a.at+u*c,d=a.axis==="x"?a.at+u*c:h;if(s(f,d)||r(f,d)||a.axis==="x"&&Math.abs(f-dt.x)<dt.width/2+3)continue;if((Math.round((h-a.from)/11)+(u>0?1:0)+l)%2===0){const _=a.axis==="x"?u<0?Math.PI:0:u<0?-Math.PI/2:Math.PI/2;e.push([f,d,_+Math.PI])}else t.push([f,d,.85+n()*.35,Math.floor(n()*3)])}l=0}if(a.boulevard)for(let h=a.from+5;h<a.to-4;h+=8)o(a,h)||t.push([a.at,h,1+n()*.3,h%3===0?1:0])}for(let a=dt.minZ+6;a<dt.maxZ-4;a+=9)if(![-100,-48,0,48,96].some(c=>Math.abs(a-c)<7)){for(const c of[-1,1]){const l=dt.x+c*(dt.width/2+dt.promenade-.6);Math.round(a/9)%2===0?t.push([l,a,.9+n()*.3,3]):e.push([l,a,c<0?Math.PI/2:-Math.PI/2])}Math.round(a/9)%3===0&&i.push([dt.x-dt.width/2-1.4,a+2.5,Math.PI/2])}for(let a=-118;a<110;a+=7)if(!(Math.abs(a)<34)&&![-100,-48,48,96].some(c=>Math.abs(a-c)<6))for(const c of[1.2+n()*2.5,16.5+n()*1.5])t.push([c,a+n()*3,.9+n()*.5,Math.floor(n()*3)]);return{trees:t,lamps:e,benches:i}}const nu={MAIN:[-36,36],CROSS:[-31,31],EAST:[-26,26]},iu={MAIN:[-36,36],CROSS:[-29.2,29.2],EAST:[-27,27]};function Ts(n,t){const e=[];for(const[i,s]of n){if(t[1]<=i||t[0]>=s){e.push([i,s]);continue}t[0]>i&&e.push([i,t[0]]),t[1]<s&&e.push([t[1],s])}return e.filter(([i,s])=>s-i>.05)}const si=168;function _2(n,t){const e=new te;e.name="CityGround";const i={asphalt:new ct({map:Sx(),roughness:.92,vertexColors:!0}),paving:new ct({map:$h("#ddd2c0",91),roughness:.86,vertexColors:!0}),plazaPave:new ct({map:$h("#e3d6bf",131),roughness:.82,vertexColors:!0}),grass:new ct({map:Ex(),roughness:.95,vertexColors:!0}),line:new ct({color:"#f2ede2",roughness:.7}),mound:new Ns({vertexColors:!0,flatShading:!0})},s=C=>i[C]??t.get(C),o=new Ju;o.absarc(jt.centerX,5,jt.groundRadius,0,Math.PI*2,!1);const r=new Vr,a=dt.x-dt.width/2,c=dt.x+dt.width/2;r.moveTo(a,122),r.lineTo(a,-112),r.lineTo(c,-112),r.lineTo(c,122),r.closePath(),o.holes.push(r);const l=new hl(o,64);l.rotateX(-Math.PI/2);const h=new Float32Array(l.attributes.position.count*3).fill(1);l.setAttribute("color",new Xe(h,3));const u=new ht(l,i.grass);u.receiveShadow=!0,u.name="CityGrass",e.add(u);const f=new qs,d=[];for(const C of rn){let N=[[C.from,C.to]];nu[C.id]&&(N=Ts(N,nu[C.id]));const z=C.axis==="x"?.02:.017;for(const[I,k]of N){const Q=k-I,st=(I+k)/2;if(C.axis==="x"?f.box("asphalt",Q,.04,C.width,st,z,C.at):f.box("asphalt",C.width,.04,Q,C.at,z,st),C.width>=5&&!C.boulevard)for(let bt=I+1.5;bt<k-1;bt+=3)x2(C,bt,1.5)||d.push(C.axis==="x"?[bt,C.at,0]:[C.at,bt,Math.PI/2])}if(C.boulevard){let I=[[C.from,C.to]];for(const k of rn)k.axis!==C.axis&&C.at>=k.from&&C.at<=k.to&&(I=Ts(I,[k.at-k.width/2-2.5,k.at+k.width/2+2.5]));for(const[k,Q]of I)f.box("paving",1.6,.22,Q-k,C.at,.11,(k+Q)/2,"#cfc6b6"),f.box("grass",1.3,.06,Q-k-.3,C.at,.24,(k+Q)/2,"#c9e0a8")}}for(const C of rn)for(const N of[-1,1]){const z=C.at+N*(C.width/2+gn/2);let I=[[C.from-(C.axis==="x",0),C.to]];iu[C.id]&&(I=Ts(I,iu[C.id]));for(const k of rn)k.axis!==C.axis&&z>=k.from-.1&&z<=k.to+.1&&(I=Ts(I,[k.at-k.width/2,k.at+k.width/2]));C.axis==="x"&&C.id!=="MAIN"&&(I=Ts(I,[an-3,an+3]));for(const[k,Q]of I){const st=Q-k,bt=(k+Q)/2,Wt=C.at+N*(C.width/2+.09);C.axis==="x"?(f.box("paving",st,.14,gn,bt,.07,z),f.box("paving",st,.15,.18,bt,.075,Wt,"#b8b0a2")):(f.box("paving",gn,.14,st,z,.07,bt),f.box("paving",.18,.15,st,Wt,.075,bt,"#b8b0a2"))}}const g=[];for(const C of rn.filter(N=>N.axis==="x"))for(const N of rn.filter(z=>z.axis==="z"))if(!(N.at<C.from-.1||N.at>C.to+.1||C.at<N.from-.1||C.at>N.to+.1)&&!(Math.abs(N.at)<37&&Math.abs(C.at)<31)){for(const z of[-1,1]){const I=C.at+z*(C.width/2+1.3);if(!(I<N.from||I>N.to))for(let k=N.at-N.width/2+.35;k<=N.at+N.width/2-.3;k+=.8)g.push([k,I,0])}for(const z of[-1,1]){const I=N.at+z*(N.width/2+1.3);if(!(I<C.from||I>C.to))for(let k=C.at-C.width/2+.35;k<=C.at+C.width/2-.3;k+=.8)g.push([I,k,Math.PI/2])}}f.box("plazaPave",Lt.maxX-Lt.minX,.12,Lt.maxZ-Lt.minZ,(Lt.minX+Lt.maxX)/2,.06,(Lt.minZ+Lt.maxZ)/2);const _=new Wr(12.5,48);_.rotateX(-Math.PI/2),_.translate(Lt.fountainX,.125,Lt.fountainZ);const p=new ht(_,new ct({map:Tx(),roughness:.8}));p.receiveShadow=!0,e.add(p);const m=[],x=[],M=(Bt.minX+Bt.maxX)/2,v=(Bt.minZ+Bt.maxZ)/2;for(const C of Ps.zs)f.box("paving",Bt.maxX-Bt.minX-2,.06,1.8,M,.03,C,"#e2cfae");for(const C of Ps.xs)f.box("paving",1.8,.06,Bt.maxZ-Bt.minZ-2,C,.031,v,"#e2cfae");f.lathe("stone",[[Bt.pondR-.2,0],[Bt.pondR+.9,0],[Bt.pondR+.9,.35],[Bt.pondR-.2,.35]],40,Bt.pondX,0,Bt.pondZ,"#cfc4b2");const w=new ht(new Wr(Bt.pondR,40),t.water);w.rotation.x=-Math.PI/2,w.position.set(Bt.pondX,.22,Bt.pondZ),e.add(w),f.box("wood",2,.15,Bt.pondR,Bt.pondX,.35,Bt.pondZ+Bt.pondR/2,"#8d6546"),f.push(Bt.pondX,0,Bt.pondZ),f.cyl("wood",2.4,2.4,.25,8,0,.4,0,"#8d6546");for(let C=0;C<6;C++){const N=C/6*Math.PI*2;f.cyl("wood",.1,.1,2.6,6,Math.cos(N)*2,1.8,Math.sin(N)*2,"#f2ece0")}f.cone("roof",3,1.6,6,0,3.1,0,"#b0603f"),f.pop();const E=Xr(4242);for(let C=0;C<70;C++){const N=Bt.minX+2+E()*(Bt.maxX-Bt.minX-4),z=Bt.minZ+2+E()*(Bt.maxZ-Bt.minZ-4);Math.hypot(N-Bt.pondX,z-Bt.pondZ)<Bt.pondR+3||Ps.zs.some(I=>Math.abs(z-I)<2.2)||Ps.xs.some(I=>Math.abs(N-I)<2.2)||m.push([N,z,.9+E()*.6,Math.floor(E()*4)])}for(let C=0;C<8;C++){const N=C/8*Math.PI*2+.2;x.push([Bt.pondX+Math.cos(N)*(Bt.pondR+2.2),Bt.pondZ+Math.sin(N)*(Bt.pondR+2.2),-N-Math.PI/2])}for(const C of[-46.5,-39.5,-20,-12.8])x.push([C,64-1.6,0]);const R=dt.maxZ-dt.minZ,A=(dt.minZ+dt.maxZ)/2,y=new ht(new Ys(dt.width-1.2,R,1,1),t.water);y.rotation.x=-Math.PI/2,y.position.set(dt.x,-.95,A),e.add(y),f.box("stone",dt.width,.3,R,dt.x,-1.9,A,"#6e6a62");for(const C of[-1,1]){f.box("stone",.6,2,R,dt.x+C*(dt.width/2-.3),-.85,A,"#a39a8a"),f.box("paving",dt.promenade,.14,R,dt.x+C*(dt.width/2+dt.promenade/2),.07,A,"#e8dcc8");let N=[[dt.minZ,dt.maxZ]];for(const z of rn)z.axis==="x"&&dt.x>=z.from&&dt.x<=z.to&&(N=Ts(N,[z.at-z.width/2-gn-.4,z.at+z.width/2+gn+.4]));for(const[z,I]of N)f.box("stone",.4,.55,I-z,dt.x+C*(dt.width/2+.2),.42,(z+I)/2,"#d8cfbf"),f.box("stone",.52,.1,I-z,dt.x+C*(dt.width/2+.2),.74,(z+I)/2,"#efe6d6")}for(const C of[dt.minZ,dt.maxZ])f.box("stone",dt.width,2,.6,dt.x,-.85,C,"#a39a8a");const b=[];for(const C of rn){if(C.axis!=="x"||dt.x<C.from||dt.x>C.to)continue;const N=C.width/2+gn;for(const z of[-1,1]){const I=C.at+z*(N+.2);f.box("stone",dt.width+1.2,1,.4,dt.x,-.45,I,"#cbbfa9");const k=new Pe(dt.width/2-.4,.28,6,18,Math.PI);k.translate(dt.x,-2.1,I+z*.12),f.add("stone",k,"#e3d8c4"),f.box("stone",dt.width+1.6,.16,.42,dt.x,.22,I,"#e3d8c4"),f.box("stone",dt.width+1.6,.12,.46,dt.x,1.02,I,"#efe6d6");for(let Q=0;Q<19;Q++)f.cyl("stone",.06,.09,.66,6,dt.x-dt.width/2-.6+Q*((dt.width+1.2)/18),.63,I,"#e3d8c4");for(const Q of[-1,1])f.box("stone",.6,1.3,.6,dt.x+Q*(dt.width/2+.8),.65,I,"#d8cfbf"),b.push([dt.x+Q*(dt.width/2+.8),I,z>0?Math.PI:0])}f.box("stone",dt.width+.4,.5,C.width+gn*2,dt.x,-.25,C.at,"#b8ad99")}for(const C of[-1,1]){const N=an+C*2.6;for(const[z,I]of[[-si,-34],[34,si]]){f.box("wood",.06,.08,I-z,N,.95,(z+I)/2,"#e8e2d6"),f.box("wood",.06,.08,I-z,N,.5,(z+I)/2,"#e8e2d6");for(let k=z;k<=I;k+=2.5)f.box("wood",.1,1.1,.1,N,.55,k,"#d9d2c4")}}for(const C of[-1,1]){const N=C*si;f.push(an,0,N,C>0?Math.PI:0),f.boxUp("stone",9,7.2,1.4,0,0,0,"#b8ad99"),f.boxUp("plain",4.6,4.8,.2,0,0,-.62,"#141210");const z=new Pe(2.55,.35,6,16,Math.PI);z.translate(0,4.6,-.75),f.add("stone",z,"#d8cfbf"),f.box("stone",9.6,.4,1.7,0,7.3,0,"#d8cfbf"),f.pop();const I=new he(30,14,7,0,Math.PI*2,0,Math.PI/2);I.scale(1.1,.5,1),I.translate(an,-.5,N+C*22);const k=I.attributes.position,Q=Xr(C>0?9:19);for(let st=0;st<k.count;st++)k.getY(st)>1&&k.setY(st,k.getY(st)+(Q()-.5)*1.6);f.add("mound",I,"#6f9a4f")}const D=ml(f.build(),s,"CityGroundMerged");for(const C of D.children)C.castShadow=C.name.endsWith("_stone")||C.name.endsWith("_wood")||C.name.endsWith("_roof"),C.receiveShadow=!0;e.add(D);const V=new Ee(new At(.45,.012,1.9),i.line,g.length),G=new Ee(new At(1.5,.012,.14),new ct({color:"#e8b349",roughness:.75}),d.length),Y=new xe;return g.forEach(([C,N,z],I)=>{Y.position.set(C,.047,N),Y.rotation.set(0,z,0),Y.updateMatrix(),V.setMatrixAt(I,Y.matrix)}),d.forEach(([C,N,z],I)=>{Y.position.set(C,.047,N),Y.rotation.set(0,z,0),Y.updateMatrix(),G.setMatrixAt(I,Y.matrix)}),V.receiveShadow=!0,G.receiveShadow=!0,e.add(V,G),n.add(e),{group:e,parkTrees:m,parkBenches:x,extraLamps:b,railPortalZ:si}}function x2(n,t,e){return rn.some(i=>i.axis!==n.axis&&n.at>=i.from&&n.at<=i.to&&Math.abs(t-i.at)<i.width/2+gn+e)}const bf=[],yf=[];function Ge(n,t,e,i,s=!1){bf.push({minX:n-e/2,maxX:n+e/2,minZ:t-i/2,maxZ:t+i/2,low:s})}function je(n,t,e,i=!1){yf.push({x:n,z:t,r:e,low:i})}let su=!1;function v2(){if(su)return;su=!0;for(const l of pl)Ge(l.x,l.z,l.width+.3,l.depth+.3,!1);Ge(le.x,le.z,le.width+.1,le.depth+.1,!0);const n=[[-11.2,-5],[4.4,-5],[12.4,-5],[24.4,5],[-2.5,5]];for(const[l,h]of n)Ge(l,h,1.05,.72,!0);const t=[[Yt.x-1.8,Yt.z-1.6],[Yt.x+1.8,Yt.z-1.6],[Yt.x-1.8,Yt.z+1.8],[-19.5,-4.6],[15.6,4.6]];for(const[l,h]of t)Ge(l,h,1.56,.58,!0);Ge(Yt.x,Yt.z-Yt.depth/2+.08,Yt.width,.28,!0);const e=[[-28,-3],[-19,-3],[-11.5,-3],[-2.4,-3],[4.8,-3],[13.5,-3],[19.2,-3],[28.5,-3],[-25,3],[-15,3],[-2.4,3],[4.8,3],[15.8,3],[26.5,3],[-9,-13],[-4,13]];for(const[l,h]of e)je(l,h,.16,!1);for(const[l,h]of[[-9.2,-3.2],[-3.8,3.2],[-3.8,-3.2],[-9.2,3.2]])je(l,h,.18,!1);const i=[[-29.5,-5],[-19.5,-5],[-1.8,-5],[6.6,-5],[19.2,-5],[31.5,-5],[-29.5,5],[6.6,5],[31.5,5]];for(const[l,h]of i)je(l,h,.22,!1);je(-2.3,4.6,.34,!0),je(-18.2,-3.1,.32,!0),je($t.railwayX-1.9,-3.2,.42,!1),je($t.railwayX+1.9,3.2,.42,!1);const s=[[Yt.x-2.6,Yt.z-2.2,1.25],[Yt.x+2.6,Yt.z+2,1.15],[Yt.x+2.8,Yt.z-2.1,1],[Yt.x-2.5,Yt.z+2.2,1.1],[-28.5,-5.4,1.05],[-19.2,-5.6,.95],[-10.2,-11.5,1],[-10.2,-20.5,1.15],[-3.2,-11.5,1.05],[-3.2,-21,1.2],[6.6,-12.5,1.15],[6.6,12.2,1.1],[13,-13,1.05],[23.5,-13.5,1.15],[23.5,13.5,1.1],[-31.5,-13,1.45],[-32,-21.5,1.55],[-25,-23,1.4],[-16,-23.5,1.5],[-1.5,-23.5,1.45],[5.5,-23,1.35],[15,-23.5,1.5],[24.5,-22,1.45],[33.5,-15,1.5],[34,-5.5,1.35],[34.5,6.5,1.4],[34,16.5,1.55],[25.5,24,1.45],[16,23,1.35],[4,23.5,1.5],[-12.5,24.5,1.45],[-24.5,23.5,1.55],[-31.5,16,1.4],[-31.5,7.5,1.3]];for(const[l,h,u]of s)je(l,h,.28*u,!1);Ge(-18.6,-1.7,2.85,1.52,!0),Ge(20.8,-11.5,1.52,2.85,!0);for(const l of xl()){const h=l.rect;Ge((h.minX+h.maxX)/2,(h.minZ+h.maxZ)/2,h.maxX-h.minX+.2,h.maxZ-h.minZ+.2,!1)}const o=Lt.minZ+6;Ge(Lt.fountainX,o,34.4,11.4,!1),Ge(Lt.fountainX,o+7.6,13,4.2,!1),Ge(Lt.clockX,Lt.clockZ,5.9,5.9,!1),je(Lt.fountainX,Lt.fountainZ,7.5,!0);for(let l=0;l<4;l++){const h=l*Math.PI/2+Math.PI/4;je(Lt.fountainX+Math.cos(h)*11,Lt.fountainZ+Math.sin(h)*11,2.7,!0)}Ge(Lt.minX+7.1,Lt.fountainZ-1.5,13.6,22.4,!1),Ge(Ie.x,Ie.z,Ie.width+1.6,Ie.depth+.8,!1),Ge(Ie.x+Ie.width/2+2,Ie.z+Ie.depth/2-2.6,4.8,4.8,!1),je(Bt.pondX,Bt.pondZ,Bt.pondR+.9,!0);const r=rn.filter(l=>l.axis==="x"&&dt.x>=l.from&&dt.x<=l.to).map(l=>[l.at-l.width/2-gn,l.at+l.width/2+gn]).sort((l,h)=>l[0]-h[0]);let a=dt.minZ;for(const[l,h]of r)l>a&&Ge(dt.x,(a+l)/2,dt.width+.8,l-a,!0),a=h;a<dt.maxZ&&Ge(dt.x,(a+dt.maxZ)/2,dt.width+.8,dt.maxZ-a,!0);for(const l of[-1,1])Ge($t.railwayX+l*2.6,-202/2,.3,si-34,!0),Ge($t.railwayX+l*2.6,(si+34)/2,.3,si-34,!0);for(const l of[-1,1])Ge($t.railwayX,l*si,9.2,2,!1);const c=Mf();for(const[l,h,u]of[...c.trees,...vf()])je(l,h,.26*u,!1);for(const[l,h]of c.lamps)je(l,h,.24,!1);je(-1.4,5.1,.48,!0),je(3.5,-5.2,.48,!0),je(-20.5,-5.2,.48,!0)}function Sr(n,t,e,i){const s=Math.max(i.minX,Math.min(n,i.maxX)),o=Math.max(i.minZ,Math.min(t,i.maxZ)),r=n-s,a=t-o,c=r*r+a*a;if(c>=e*e)return[n,t];if(c>1e-6){const g=Math.sqrt(c),_=e-g;return[n+r/g*_,t+a/g*_]}const l=n-i.minX,h=i.maxX-n,u=t-i.minZ,f=i.maxZ-t,d=Math.min(l,h,u,f);return d===l?[i.minX-e,t]:d===h?[i.maxX+e,t]:d===u?[n,i.minZ-e]:[n,i.maxZ+e]}function M2(n,t,e,i){const s=n-i.x,o=t-i.z,r=e+i.r,a=s*s+o*o;if(a>=r*r)return[n,t];const c=Math.sqrt(a)||.001,l=r-c;return[n+s/c*l,t+o/c*l]}function b2(n,t,e,i){v2();let s=Math.max(jt.minX+1,Math.min(jt.maxX-1,n)),o=Math.max(jt.minZ+1,Math.min(jt.maxZ-1,t));for(let r=0;r<2;r++){for(const a of bf)i.isFlying&&a.low||s<a.minX-2||s>a.maxX+2||o<a.minZ-2||o>a.maxZ+2||([s,o]=Sr(s,o,e,a));for(const a of yf)i.isFlying&&a.low||Math.abs(s-a.x)>a.r+2||Math.abs(o-a.z)>a.r+2||([s,o]=M2(s,o,e,a));if(i.crossingClosed&&!i.isFlying){const a={minX:$t.railwayX-2.1,maxX:$t.railwayX-1.65,minZ:-5.2,maxZ:5.2},c={minX:$t.railwayX+1.65,maxX:$t.railwayX+2.1,minZ:-5.2,maxZ:5.2};[s,o]=Sr(s,o,e,a),[s,o]=Sr(s,o,e,c)}i.trainBounds&&([s,o]=Sr(s,o,e+.1,i.trainBounds))}return[s,o]}const y2=[{x:1.4,z:-5.4,message:"🍜 夕陽拉麵店 — 芙莉蓮聞到了濃郁豚骨拉麵香氣！"},{x:-14.8,z:-5.4,message:"🏪 商店街便利店 — 24 小時溫暖燈光歡迎光臨"},{x:-23.2,z:-5.4,message:"🥐 日和麵包坊 — 剛出爐的麵包香氣飄滿街角"},{x:15.6,z:-5.4,message:"☕ 踏切珈琲 — 聽著平交道叮噹聲喝杯手沖咖啡"},{x:27.6,z:-5.4,message:"🌸 小春日花屋 — 「是變出花田的魔法呢」"},{x:-23.4,z:5.4,message:"🏮 夕陽居酒屋 — 紅燈籠亮起，很有昭和味道"},{x:.8,z:5.4,message:"📖 老街古書店 — 說不定能找到稀有的民間魔導書！"},{x:27.8,z:5.4,message:"♨️ 富士乃湯錢湯 — 泡完熱呼呼的澡再喝瓶冰牛奶"},{x:Yt.x,z:Yt.z,message:"🌳 街角小公園 — 夕陽微風吹拂，最適合發呆睡午覺"},{x:le.x-1.2,z:le.z,message:"🚃 夕陽駅月台 — 地方電車每隔一會兒就會進站停靠"},{x:Lt.fountainX,z:Lt.fountainZ+9,message:"⛲ 中央大廣場 — 三層噴水池在陽光下閃閃發亮"},{x:Lt.clockX-4,z:Lt.clockZ,message:"🕰️ 廣場鐘樓 — 鐘面指針會跟著小鎮時間走喔"},{x:Lt.fountainX,z:Lt.minZ+18,message:"🏛️ 夕陽市役所 — 銅綠色大穹頂是城市的地標"},{x:Lt.minX+16,z:Lt.fountainZ,message:"🎭 浪漫劇場 — 今晚上演的是勇者一行人的冒險劇"},{x:Ie.x,z:Ie.z+Ie.depth/2+4,message:"⛪ 山丘教堂 — 玫瑰花窗在夕陽下最美"},{x:Bt.pondX+9,z:Bt.pondZ,message:"🦆 城市公園池畔 — 涼亭裡傳來陣陣笑聲"},{x:dt.x-6.6,z:20,message:"🚤 運河步道 — 石拱橋倒映在水面上"}];function w2(n){const t=new te;t.name="PlayerFrieren",t.position.set(-1.5,$t.sidewalkY,-3.8);let e=!1;const i=new i2;i.root.scale.setScalar(1),i.setProp("staff"),i.setToonShading(!0),t.add(i.root);const s=new ht(new ll(.42,.56,24),new Ci({color:"#ffe299",side:Sn,transparent:!0,opacity:.72}));s.rotation.x=-Math.PI/2,s.position.y=.03,s.visible=!1,t.add(s);const o=S2();o.visible=!1,t.add(o),n.add(t);const r=new Set;let a=!1,c=null;const l={forward:0,right:0,run:!1,fly:!1},h=[["zoltraak","focused"],["flower","smile"],["smug","smug"],["sleepy","sleepy"]],u=p=>{const[m,x]=h[p-1]??[null,"calm"];m&&(c=c===m?null:m,i.setExpression(c?x:"calm"))};window.addEventListener("keydown",p=>{r.add(p.code),a&&p.key>="1"&&p.key<="4"&&u(Number(p.key))}),window.addEventListener("keyup",p=>{r.delete(p.code)}),window.addEventListener("blur",()=>r.clear());let f=0,d=0;function g(p,m,x){const M=r2(p,m,!0),v=1-Math.exp(-12*x);i.setRubyGlow(M.rubyGlow);const w=i.joints.hips;w&&(w.position.x=pe.lerp(w.position.x,M.hipsPos[0],v),w.position.y=pe.lerp(w.position.y,M.hipsPos[1],v),w.position.z=pe.lerp(w.position.z,M.hipsPos[2],v));const E=i.joints.staffPivot;E&&(E.position.x=pe.lerp(E.position.x,M.staffPos[0],v),E.position.y=pe.lerp(E.position.y,M.staffPos[1],v),E.position.z=pe.lerp(E.position.z,M.staffPos[2],v),E.rotation.x=pe.lerp(E.rotation.x,M.staffRot[0],v),E.rotation.y=pe.lerp(E.rotation.y,M.staffRot[1],v),E.rotation.z=pe.lerp(E.rotation.z,M.staffRot[2],v));for(const[R,A]of Object.entries(M.rot)){const y=i.joints[R];y&&(y.rotation.x=pe.lerp(y.rotation.x,A[0],v),y.rotation.y=pe.lerp(y.rotation.y,A[1],v),y.rotation.z=pe.lerp(y.rotation.z,A[2],v))}}return{group:t,setActive:p=>{a=p,s.visible=p,p||(c=null,i.setExpression("calm"))},isActive:()=>a,getPosition:()=>t.position,setVirtualInput:p=>Object.assign(l,p),toggleEmote:u,update:(p,m,x,M,v)=>{if(v&&!a){const N=v.distanceTo(t.position),z=N>45;if(z!==e&&(e=z,i.root.visible=!z),o.visible=z&&N<170,z)return null}else e&&(e=!1,i.root.visible=!0,o.visible=!1);let w=0,E=0,R=!1;a&&((r.has("KeyW")||r.has("ArrowUp"))&&(w+=1),(r.has("KeyS")||r.has("ArrowDown"))&&(w-=1),(r.has("KeyD")||r.has("ArrowRight"))&&(E+=1),(r.has("KeyA")||r.has("ArrowLeft"))&&(E-=1),w=pe.clamp(w+l.forward,-1,1),E=pe.clamp(E+l.right,-1,1),R=r.has("Space")||l.fly);const A=Math.abs(w)>.05||Math.abs(E)>.05,y=r.has("ShiftLeft")||r.has("ShiftRight")||l.run;A&&c&&(c=null,i.setExpression("calm"));let b="idle",D=1;R?(b="float",D=1.1):A?(b="walk_ref",D=y?1.55:1.1):c&&(b=c);let V=t.position.x,G=t.position.z;if(a&&A){const N=Math.hypot(w,E),z=w/N,I=E/N,k=Math.sin(x),Q=Math.cos(x),st=-k*z+Q*I,bt=-Q*z-k*I,Wt=Math.min(1,N),$=(R?4.8:y?5:3.2)*Wt;V+=st*$*p,G+=bt*$*p;let ut=Math.atan2(st,bt)-f;for(;ut>Math.PI;)ut-=Math.PI*2;for(;ut<-Math.PI;)ut+=Math.PI*2;f+=ut*Math.min(1,p*12),t.rotation.y=f}const[Y,C]=b2(V,G,.42,{...M,isFlying:R});if(t.position.x=Y,t.position.z=C,d+=p*D,g(b,d,p),a){s.scale.setScalar(1+Math.sin(m*3.5)*.06);for(const N of y2)if(Math.hypot(t.position.x-N.x,t.position.z-N.z)<3.6)return N.message}return null}}}function S2(){const n=[[new Ai(.36,.95,8).translate(0,.55,0),"#f4f1ea"],[new oe(.06,.06,.25,5).translate(-.09,.12,0),"#4a3a35"],[new oe(.06,.06,.25,5).translate(.09,.12,0),"#4a3a35"],[new he(.24,8,6).translate(0,1.18,0),"#ffe6d5"],[new he(.26,8,5,0,Math.PI*2,0,Math.PI*.6).translate(0,1.2,-.01),"#e8e6ef"],[new On(.07,.55,2,5).translate(-.24,.95,-.12),"#e8e6ef"],[new On(.07,.55,2,5).translate(.24,.95,-.12),"#e8e6ef"],[new oe(.025,.025,1.5,4).translate(.38,.75,.1),"#8a5a3a"],[new he(.06,6,4).translate(.38,1.52,.1),"#d9343e"]],t=[],e=[],i=[],s=new rt;for(const[a,c]of n){const l=a.toNonIndexed();s.set(c);const h=l.attributes.position,u=l.attributes.normal;for(let f=0;f<h.count;f++)t.push(h.getX(f),h.getY(f),h.getZ(f)),e.push(u.getX(f),u.getY(f),u.getZ(f)),i.push(s.r,s.g,s.b)}const o=new ye;o.setAttribute("position",new Ft(t,3)),o.setAttribute("normal",new Ft(e,3)),o.setAttribute("color",new Ft(i,3));const r=new ht(o,new Ns({vertexColors:!0}));return r.castShadow=!0,r.name="FrierenProxyLOD",r}function E2(n){const t=new te;t.name="TownExtras";const e=T2(),i=new Ee(new Kr(.32,0),new Ci({color:"#fff8ee",transparent:!0,opacity:.3,depthWrite:!1}),e.length);i.frustumCulled=!1,i.userData.dynamic=!0,t.add(i);const s=new xe,o=ou("#84b8a0","#f4f0e4");o.position.set(-18.6,$t.roadY+.02,-1.7),o.rotation.y=Math.PI/2,t.add(o);const r=ou("#e8c474","#fff7e6");r.position.set(20.8,$t.roadY+.02,-11.5),r.rotation.y=0,t.add(r);const a=[[-1.4,5.1,.35,"#c94c4c"],[3.5,-5.2,-.5,"#3b6ea5"],[-20.5,-5.2,.2,"#5a8f63"]];for(const[l,h,u,f]of a){const d=A2(f);d.position.set(l,$t.sidewalkY,h),d.rotation.y=u,t.add(d)}return n.add(t),{group:t,update:l=>{e.forEach((h,u)=>{h.age+=l,h.age>=h.life&&(h.age=0);const f=h.age/h.life;s.position.set(h.origin.x+h.driftX*f*2.2,h.origin.y+f*3.4,h.origin.z+h.driftZ*f*1.4),s.scale.setScalar(h.baseScale*(.55+f*1.5)*Math.max(.05,Math.sin(f*Math.PI))),s.updateMatrix(),i.setMatrixAt(u,s.matrix)}),i.instanceMatrix.needsUpdate=!0}}}function T2(){const n=[],t=new U(25.45,9.9,10.5);for(let i=0;i<8;i++)n.push({origin:t,age:i/8*5,life:5,driftX:.9+i%3*.15,driftZ:-.3+i%2*.25,baseScale:1});const e=new U(1.4+1.6,5.8,-8.4-.8);for(let i=0;i<5;i++)n.push({origin:e,age:i/5*3.6,life:3.6,driftX:.55,driftZ:-.2,baseScale:.58});return n}function ou(n,t){const e=new te,i=new ct({color:n,roughness:.5}),s=new ct({color:t,roughness:.55}),o=new ct({color:"#3b4e61",roughness:.25}),r=new ct({color:"#26282c",roughness:.85}),a=new ct({color:"#fff5cc",emissive:"#ffd980",emissiveIntensity:.6}),c=new ht(new At(1.42,.58,2.75),i);c.position.y=.48,c.castShadow=!0,c.receiveShadow=!0,e.add(c);const l=new ht(new At(1.32,.54,1.85),s);l.position.set(0,1,-.1),l.castShadow=!0,e.add(l);const h=new ht(new At(1.35,.36,1.62),o);h.position.set(0,1,-.1),e.add(h);const u=new oe(.24,.24,.18,10);u.rotateZ(Math.PI/2);for(const[f,d]of[[-.68,.82],[.68,.82],[-.68,-.82],[.68,-.82]]){const g=new ht(u,r);g.position.set(f,.24,d),e.add(g)}for(const f of[-.46,.46]){const d=new ht(new oe(.11,.11,.06,8),a);d.rotation.x=Math.PI/2,d.position.set(f,.52,1.38),e.add(d)}return e}function A2(n){const t=new te,e=new ct({color:n,roughness:.55}),i=new ct({color:"#2b2d30",roughness:.85}),s=new ct({color:"#c49a6c",roughness:.85}),o=new Pe(.26,.04,6,12),r=new ht(o,i);r.position.set(0,.28,.44),r.rotation.y=Math.PI/2;const a=new ht(o,i);a.position.set(0,.28,-.44),a.rotation.y=Math.PI/2,t.add(r,a);const c=new ht(new At(.05,.06,.85),e);c.position.set(0,.46,0),c.castShadow=!0,t.add(c);const l=new ht(new At(.46,.05,.05),i);l.position.set(0,.78,.36),t.add(l);const h=new ht(new oe(.025,.025,.45,6),e);h.position.set(0,.56,.38),t.add(h);const u=new ht(new At(.26,.18,.2),s);return u.position.set(0,.66,.52),t.add(u),t}const ru={eco:"效能：省電 30fps",smooth:"效能：流暢 60fps",paused:"效能：已暫停"},ka=["smooth","eco","paused"];function R2(n){const t=Math.floor((n%24+24)%24),e=Math.floor((n-Math.floor(n))*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`}function C2(n){const t=document.body,e=document.createElement("div");e.className="vignette-overlay",t.appendChild(e);const i=[],s=document.createElement("div");s.className="hud-panel hud-top-left",s.innerHTML=`
    <div class="hud-title">
      <span>夕陽山城</span>
      <span class="hud-badge">Phase 8 · 華麗山城擴建版</span>
    </div>
    <div class="hud-subtitle">按 P 操控芙莉蓮 (WASD散步 · Shift跑 · Space飛行 · 1~4魔法動作) · 點居民跟隨 · 按 H 拍照</div>
  `,t.appendChild(s),i.push(s);const o=document.createElement("div");o.className="hud-panel hud-top-right",o.innerHTML=`
    <div class="stat-row"><span class="stat-label">FPS</span><span class="stat-value good" id="stat-fps">--</span></div>
    <div class="stat-row"><span class="stat-label">Draw Calls</span><span class="stat-value" id="stat-calls">--</span></div>
    <div class="stat-row"><span class="stat-label">Triangles</span><span class="stat-value" id="stat-tris">--</span></div>
    <div class="stat-row"><span class="stat-label">居民</span><span class="stat-value" id="stat-crowd">--</span></div>
    <div class="stat-row"><span class="stat-label">建築 近/遠</span><span class="stat-value" id="stat-bld">--</span></div>
    <div class="stat-row"><span class="stat-label">像素比</span><span class="stat-value" id="stat-pr">--</span></div>
  `,t.appendChild(o),i.push(o);const r=document.createElement("div");r.className="hud-panel",r.style.cssText="top: 16px; left: 50%; transform: translateX(-50%); padding: 8px 14px; display: none; align-items: center; gap: 12px; font-size: 13px;",r.innerHTML=`
    <span id="follow-text"></span>
    <button class="hud-btn" id="btn-stop-follow">結束跟隨 (Esc)</button>
  `,t.appendChild(r);const a=document.createElement("div");a.className="hud-panel",a.style.cssText="bottom: 72px; left: 50%; transform: translateX(-50%); padding: 8px 16px; display: none; font-size: 13px; color: #fff6eb;",t.appendChild(a);const c=document.createElement("div");c.className="hud-panel hud-bottom-left",c.innerHTML=`
    <button class="hud-btn" id="btn-player-mode">操控芙莉蓮 (P)</button>
    <button class="hud-btn" id="btn-photo-mode">拍照 (H)</button>
    <button class="hud-btn" id="btn-capture-png">📸 截圖</button>
    <button class="hud-btn" id="btn-perf-mode">效能：流暢 60fps</button>
    <button class="hud-btn" id="btn-toggle-grid">格線：關</button>
    <button class="hud-btn" id="btn-toggle-mode">建築：精細</button>
    <button class="hud-btn" id="btn-reset-cam">重置</button>
  `,t.appendChild(c),i.push(c);const l=document.createElement("div");l.className="hud-panel hud-bottom-right",l.innerHTML=`
    <div class="time-header">
      <span class="time-readout" id="time-readout">17:15 · 夕陽黃昏</span>
      <button class="hud-btn" id="btn-auto-time">自動流轉：關</button>
    </div>
    <input class="time-slider" id="time-slider" type="range" min="0" max="24" step="0.05" value="17.25" />
    <div class="time-presets">
      <button class="hud-btn" data-hour="6.2">清晨</button>
      <button class="hud-btn" data-hour="12.5">正午</button>
      <button class="hud-btn" data-hour="17.25">黃昏</button>
      <button class="hud-btn" data-hour="21.5">深夜</button>
    </div>
  `,t.appendChild(l),i.push(l);const h=document.createElement("div");h.className="hud-panel",h.style.cssText="bottom: 16px; left: 50%; transform: translateX(-50%); padding: 6px 14px; display: none; font-size: 12px; gap: 10px; align-items: center; opacity: 0.78;",h.innerHTML=`
    <span>拍照模式 · 按 <b>H</b> 顯示介面</span>
    <button class="hud-btn" id="btn-photo-snap">📸 下載 PNG</button>
  `,t.appendChild(h);const u=o.querySelector("#stat-fps"),f=o.querySelector("#stat-calls"),d=o.querySelector("#stat-tris"),g=o.querySelector("#stat-crowd"),_=o.querySelector("#stat-bld"),p=o.querySelector("#stat-pr"),m=r.querySelector("#follow-text"),x=r.querySelector("#btn-stop-follow"),M=c.querySelector("#btn-player-mode"),v=c.querySelector("#btn-photo-mode"),w=c.querySelector("#btn-capture-png"),E=h.querySelector("#btn-photo-snap"),R=c.querySelector("#btn-perf-mode"),A=c.querySelector("#btn-toggle-grid"),y=c.querySelector("#btn-toggle-mode"),b=c.querySelector("#btn-reset-cam"),D=l.querySelector("#time-readout"),V=l.querySelector("#time-slider"),G=l.querySelector("#btn-auto-time"),Y=l.querySelectorAll("[data-hour]");let C=0,N=!1,z=!0,I=!1,k=!1;const Q=()=>{k=!k;for(const pt of i)pt.style.display=k?"none":"";k&&(r.style.display="none",a.style.display="none"),h.style.display=k?"flex":"none"};M.addEventListener("click",n.onTogglePlayerMode),v.addEventListener("click",Q),w.addEventListener("click",n.onCapturePhoto),E.addEventListener("click",n.onCapturePhoto),R.addEventListener("click",()=>{C=(C+1)%ka.length;const pt=ka[C];R.textContent=ru[pt],pt==="paused"&&(u.textContent="PAUSED",u.className="stat-value warn"),n.onChangePerfMode(pt)}),A.addEventListener("click",()=>{N=!N,A.textContent=`格線：${N?"開":"關"}`,n.onToggleGrid(N)}),y.addEventListener("click",()=>{z=!z,y.textContent=`建築：${z?"精細":"白模"}`,n.onToggleBuildingMode(z)}),b.addEventListener("click",n.onResetCamera),x.addEventListener("click",n.onStopFollow),V.addEventListener("input",()=>{n.onChangeTimeOfDay(parseFloat(V.value))}),G.addEventListener("click",()=>{I=!I,G.textContent=`自動流轉：${I?"開":"關"}`,G.classList.toggle("active",I),n.onToggleAutoTime(I)}),Y.forEach(pt=>{pt.addEventListener("click",()=>{const ve=parseFloat(pt.dataset.hour||"17.25");V.value=String(ve),n.onChangeTimeOfDay(ve)})});let st=0,bt=0;const Wt=(pt,ve,ue)=>{if(st+=1,bt+=ve,bt>=500){const B=Math.round(st*1e3/bt);u.textContent=String(B),u.className=`stat-value ${B>=50?"good":"warn"}`,f.textContent=String(pt.info.render.calls),d.textContent=pt.info.render.triangles.toLocaleString(),ue&&(g.textContent=ue.crowd,_.textContent=ue.buildings,p.textContent=ue.pixelRatio.toFixed(2)),st=0,bt=0}};let $="";const ot=(pt,ve="")=>{if(!pt||k){r.style.display="none",$="";return}const ue=`正在跟隨 <b>${pt}</b> · ${ve}`;ue!==$&&(m.innerHTML=ue,r.style.display="flex",$=ue)},ut=(pt,ve)=>{D.textContent=`${R2(pt)} · ${ve}`,document.activeElement!==V&&(V.value=pt.toFixed(2))},ft=pt=>{M.textContent=pt?"結束操控 (P)":"操控芙莉蓮 (P)",M.classList.toggle("active",pt),pt||(a.style.display="none")};let Ut=null;return{updateStats:Wt,setFollowStatus:ot,updateTimeDisplay:ut,setPlayerModeUI:ft,setLandmarkPrompt:pt=>{if(k||!pt){Ut!==null&&(a.style.display="none",Ut=null);return}pt!==Ut&&(a.textContent=pt,a.style.display="block",Ut=pt)},togglePhotoMode:Q,isPhotoMode:()=>k,setPerfMode:pt=>{C=ka.indexOf(pt),R.textContent=ru[pt],n.onChangePerfMode(pt)}}}const P2=()=>window.matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0&&window.innerWidth<900,I2=["🔥 殺人魔法","🌸 花田魔法","😏 得意","😪 想睡"];function L2(n){document.body.classList.add("is-touch");const t=(C,N,z="")=>{const I=document.createElement(C);return I.className=N,I.innerHTML=z,I},e=C=>C.preventDefault(),i=window.CITY_BACK_URL;if(i){const C=t("a","m-back","←");C.href=i,C.setAttribute("aria-label","返回"),document.body.appendChild(C)}const s=t("div","m-fab"),o=t("button","m-round","🧙");o.title="操控芙莉蓮";const r=t("button","m-round","📷");r.title="拍照模式（隱藏介面）";const a=t("button","m-round","⚙️");a.title="設定",s.append(o,r,a),document.body.appendChild(s);const c=t("div","m-sheet",'<div class="m-sheet-head"><b>⚙️ 設定</b><button class="m-close" aria-label="關閉">✕</button></div>'),l=t("div","m-sheet-body");c.appendChild(l);const h=t("label","m-row",'<span>顯示效能數據</span><input type="checkbox">');for(const C of[".hud-bottom-right",".hud-bottom-left"]){const N=document.querySelector(C);N&&l.appendChild(N)}l.appendChild(h),document.body.appendChild(c);const u=t("p","m-tip","單指拖曳旋轉視角、雙指縮放與平移、點居民可以跟著他走。按 🧙 操控芙莉蓮，用左下搖桿散步。");l.appendChild(u);const f=h.querySelector("input");f.addEventListener("change",()=>document.body.classList.toggle("m-show-stats",f.checked));const d=C=>c.classList.toggle("open",C);a.addEventListener("click",()=>d(!c.classList.contains("open"))),c.querySelector(".m-close").addEventListener("click",()=>d(!1));const g=t("div","m-pad",'<div class="m-knob"></div>'),_=g.querySelector(".m-knob"),p=t("div","m-actions"),m=t("button","m-act","🏃<small>跑</small>"),x=t("button","m-act","🕊<small>飛</small>"),M=t("button","m-act","✨<small>魔法</small>");p.append(M,m,x);const v=t("div","m-magic");I2.forEach((C,N)=>{const z=t("button","m-chip",C);z.addEventListener("click",()=>{n.toggleEmote(N+1),v.classList.remove("open")}),v.appendChild(z)}),document.body.append(g,p,v),M.addEventListener("click",()=>v.classList.toggle("open"));const w=48;let E=null,R=0,A=0;const y=(C,N)=>{_.style.transform=`translate(${C}px, ${N}px)`,n.setVirtualInput({right:C/w,forward:-N/w})};g.addEventListener("pointerdown",C=>{E=C.pointerId;try{g.setPointerCapture(C.pointerId)}catch{}const N=g.getBoundingClientRect();R=N.left+N.width/2,A=N.top+N.height/2,C.preventDefault()}),g.addEventListener("pointermove",C=>{if(C.pointerId!==E)return;let N=C.clientX-R,z=C.clientY-A;const I=Math.hypot(N,z);I>w&&(N=N/I*w,z=z/I*w),y(N,z)});const b=C=>{C.pointerId===E&&(E=null,y(0,0))};g.addEventListener("pointerup",b),g.addEventListener("pointercancel",b);const D=(C,N)=>{const z=I=>{C.classList.toggle("on",I),n.setVirtualInput({[N]:I})};C.addEventListener("pointerdown",I=>{try{C.setPointerCapture(I.pointerId)}catch{}z(!0),I.preventDefault()});for(const I of["pointerup","pointercancel","lostpointercapture"])C.addEventListener(I,()=>z(!1))};D(m,"run"),D(x,"fly");for(const C of[g,p,s,v])C.addEventListener("contextmenu",e);o.addEventListener("click",()=>{d(!1),n.onTogglePlayer()});const V=t("div","m-photo",'<button class="m-act wide">📸 存圖</button><button class="m-act wide">✕ 結束拍照</button>'),[G,Y]=V.querySelectorAll("button");return G.addEventListener("click",n.onCapture),Y.addEventListener("click",n.onTogglePhoto),document.body.appendChild(V),r.addEventListener("click",()=>{d(!1),n.onTogglePhoto()}),{setPlayerMode:C=>{document.body.classList.toggle("m-player",C),o.classList.toggle("on",C),o.title=C?"結束操控":"操控芙莉蓮",C||(y(0,0),n.setVirtualInput({run:!1,fly:!1}),v.classList.remove("open"))},setPhotoMode:C=>{document.body.classList.toggle("m-photo-mode",C)}}}function D2(n){const t=new Hu,e=new he(10,32,16),i=[],s=e.attributes.position,o=new rt("#7fb2e6"),r=new rt("#f6d9b8"),a=new rt("#6b6258"),c=new rt;for(let u=0;u<s.count;u++){const f=s.getY(u)/10;f>0?c.copy(r).lerp(o,Math.pow(f,.6)):c.copy(r).lerp(a,Math.min(1,-f*3)),i.push(c.r,c.g,c.b)}e.setAttribute("color",new Ft(i,3)),t.add(new ht(e,new Ci({vertexColors:!0,side:Ke})));const l=new Hc(n),h=l.fromScene(t,.02);return l.dispose(),e.dispose(),h.texture}function U2(n){const t=D2(n),e={value:0},i=new ct({map:vx(),vertexColors:!0,roughness:.92}),s=new ct({map:Mx(),vertexColors:!0,roughness:.86}),o=new ct({map:bx(),vertexColors:!0,roughness:.9}),r=new ct({map:yx(),vertexColors:!0,roughness:.72}),a=new ct({map:wx(),vertexColors:!0,roughness:.82}),c=new ct({vertexColors:!0,roughness:.82}),l=new ct({vertexColors:!0,metalness:.85,roughness:.32,envMap:t,envMapIntensity:1}),h=new ct({color:"#2b3846",metalness:.55,roughness:.12,envMap:t,envMapIntensity:1.1,emissive:"#ffbd6b",emissiveIntensity:.2});h.defines={USE_UV:""},h.onBeforeCompile=p=>{p.vertexShader=p.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
      #ifdef USE_INSTANCING
        vUv += instanceMatrix[3].xz * 0.731;
      #endif`),p.fragmentShader=p.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      {
        vec2 cell = floor(vUv / vec2(1.35, 1.75));
        float h = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
        float lit = step(0.36, h);
        float warm = 0.55 + 0.45 * fract(h * 7.13);
        float curtain = 0.75 + 0.25 * smoothstep(0.0, 1.0, fract(vUv.y / 1.75));
        totalEmissiveRadiance *= lit * warm * curtain;
      }`)},h.customProgramCacheKey=()=>"city-glass";const u=new ct({vertexColors:!0,roughness:.9,side:Sn});u.defines={USE_UV:""},u.onBeforeCompile=p=>{p.fragmentShader=p.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      {
        float stripe = step(0.5, fract(vUv.x / 0.7));
        diffuseColor.rgb = mix(diffuse * vec3(0.96, 0.93, 0.86), diffuseColor.rgb, stripe);
      }`)},u.customProgramCacheKey=()=>"city-fabric";const f=new ct({vertexColors:!0,roughness:.45,emissive:"#ffffff",emissiveIntensity:.6});f.onBeforeCompile=p=>{p.fragmentShader=p.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      totalEmissiveRadiance *= vColor.rgb;`)},f.customProgramCacheKey=()=>"city-glow";const d=new ct({roughness:.55,emissive:"#fff2dc",emissiveIntensity:.4}),g=new ct({color:"#3f7288",metalness:.35,roughness:.08,envMap:t,envMapIntensity:1.2,transparent:!0,opacity:.9});g.defines={USE_UV:""},g.onBeforeCompile=p=>{p.uniforms.uTime=e,p.fragmentShader=p.fragmentShader.replace("void main() {",`uniform float uTime;
void main() {`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        normal = normalize(normal + vec3(
          sin(vUv.x * 1.9 + uTime * 1.4) * 0.05 + sin(vUv.y * 3.1 - uTime * 0.9) * 0.03,
          cos(vUv.y * 2.3 + uTime * 1.1) * 0.05, 0.0));`)},g.customProgramCacheKey=()=>"city-water";const _={wall:i,stone:s,brick:o,roof:r,wood:a,metal:l,glass:h,fabric:u,plain:c,glow:f,sign:d,water:g};return{get:p=>_[p],water:g,envMap:t,setNight:p=>{h.emissiveIntensity=.12+p*1.25,f.emissiveIntensity=.35+p*1.6,d.emissiveIntensity=.25+p*.75;const m=1-p*.75;h.envMapIntensity=1.1*m,l.envMapIntensity=m,g.envMapIntensity=1.2*m},setSignAtlas:p=>{d.map=p,d.emissiveMap=p,d.needsUpdate=!0},update:p=>{e.value=p}}}const N2=68,F2=78,O2=40,z2={wall:"wall",roof:"roof",fabric:"fabric",brick:"brick"},B2={stone:new rt("#ddd5c5"),brick:new rt("#b0634a"),wood:new rt("#b8936c"),metal:new rt("#8a8a8a")};function G2(n,t){if(n==="roof"||n==="glass"||n==="wall")return n;const e=B2[n];return e&&t.multiply(e),"wall"}function H2(n){return n==="plain"?"stone":n}function au(n,t,e,i,s){const o=new qs(t?H2:G2);n.build(o,t);const r=o.build(),a=new Qi(new Float32Array(e*16),16);a.setUsage(Zi);const c=()=>{const f=new Qi(new Float32Array(e*3).fill(1),3);return f.setUsage(Zi),f},l={wall:c(),roof:c(),fabric:c(),brick:c()},h=[];let u=0;for(const[f,d]of r){const g=new Ee(d,i.get(f),e);g.name=`${n.id}_${t?"LOD0":"LOD1"}_${f}`,g.instanceMatrix=a;const _=z2[f];_&&(g.instanceColor=l[_]),g.frustumCulled=!1;const p=t&&f!=="glass"&&f!=="glow"&&f!=="sign"&&f!=="fabric";g.castShadow=p,g.receiveShadow=f!=="glow",g.count=0,g.visible=!1,s.add(g),h.push(g),u+=(d.index?d.index.count:d.attributes.position.count)/3}return{meshes:h,matrix:a,colors:l,triangles:u}}function V2(n,t){const e=new te;e.name="CityBuildings_Instanced";const i=xl(),s=[];for(const h of _f){const u=i.filter(_=>_.arch===h);if(u.length===0)continue;const f=new ee,d=new Wn,g=u.map(_=>{f.compose(new U(_.x,0,_.z),d.setFromAxisAngle(new U(0,1,0),_.rotY),new U(1,1,1));const p=.5*Math.hypot(h.width,h.depth,h.height);return{..._,matrix:new Float32Array(f.elements),sphere:new zn(new U(_.x,h.height/2,_.z),p),lod:1,tints:{wall:new rt(_.wallTint),roof:new rt(_.roofTint),fabric:new rt(_.fabricTint),brick:new rt(_.brickTint)}}});s.push({arch:h,lots:g,lods:[au(h,!0,u.length,t,e),au(h,!1,u.length,t,e)]})}n.add(e);const o=new Xs,r=new ee,a=new Float32Array(16);let c={lod0:0,lod1:0,culled:0,total:i.length};return{group:e,update:(h,u=!1)=>{h.updateMatrixWorld();const f=h.matrixWorld.elements;let d=0;for(let x=0;x<16;x++)d+=Math.abs(f[x]-a[x]);if(!u&&d<1e-4)return;a.set(f),r.multiplyMatrices(h.projectionMatrix,h.matrixWorldInverse),o.setFromProjectionMatrix(r);const g=h.position;let _=0,p=0,m=0;for(const x of s){const M=[0,0];for(const v of x.lots){const w=v.sphere.center.distanceTo(g);if(w>O2&&!o.intersectsSphere(v.sphere)){m++;continue}v.lod===0&&w>F2?v.lod=1:v.lod===1&&w<N2&&(v.lod=0);const E=x.lods[v.lod],R=M[v.lod]++;E.matrix.array.set(v.matrix,R*16);for(const A of["wall","roof","fabric","brick"]){const y=v.tints[A],b=E.colors[A].array;b[R*3]=y.r,b[R*3+1]=y.g,b[R*3+2]=y.b}}for(let v=0;v<2;v++){const w=x.lods[v],E=M[v];w.matrix.needsUpdate=!0,w.matrix.clearUpdateRanges(),w.matrix.addUpdateRange(0,Math.max(1,E)*16);for(const R of["wall","roof","fabric","brick"])w.colors[R].needsUpdate=!0,w.colors[R].clearUpdateRanges(),w.colors[R].addUpdateRange(0,Math.max(1,E)*3);for(const R of w.meshes)R.count=E,R.visible=E>0}_+=M[0],p+=M[1]}c={lod0:_,lod1:p,culled:m,total:i.length}},stats:()=>c,lots:i}}const me="#f1e9da",Er="#f3e6cf",Po="#d6ad4f",cu="#6fa392",un=(n,t={})=>({frameMat:"stone",frame:me,top:n,sill:!0,mullion:!0,...t});function W2(n,t){const e=new qs;k2(e);const i=X2(e);Y2(e),Z2(e),q2(e),j2(e);const s=ml(e.build(),t.get,"Landmarks"),o=new At(.12,1,.05);o.translate(0,.5,0);const r=new Ee(o,new ct({color:"#2a2018",metalness:.5,roughness:.4}),8);r.frustumCulled=!1,s.add(r);const a=$2(t);s.add(a.mesh),n.add(s);const c=new xe;let l=-1;const h=(u,f)=>{a.update(u);const d=Math.floor(f*60);if(d===l)return;l=d;const g=f%12/12,_=f-Math.floor(f);let p=0;for(const m of i.faces)for(const[x,M,v]of[[g,1,1.25],[_,1.45,.8]])c.position.copy(m.center),c.rotation.set(0,m.rotY,-x*Math.PI*2),c.scale.set(v,M,1),c.updateMatrix(),r.setMatrixAt(p++,c.matrix);r.instanceMatrix.needsUpdate=!0};return h(0,17.25),{group:s,update:h}}function k2(n){const i=Lt.fountainX,s=Lt.minZ+11/2+.5,o=1.2,r=o+9;n.push(i,0,s,0),n.boxUp("stone",34+.6,o,11+.6,0,0,0,"#cfc4b2"),n.boxUp("stone",34,4.4,11,0,o,0,"#eee2cc"),n.boxUp("wall",34,r-o-4.4,11,0,o+4.4,0,Er),n.boxUp("wall",12,r-o,1.6,0,o,11/2+.8,Er),n.push(0,0,11/2),hi(n,34,o+4.4,me),li(n,34,r,me,!0,!0),Ri(n,-34/2,o,r,1,me),Ri(n,34/2,o,r,-1,me);for(const c of[-1,1])for(let l=0;l<4;l++){const h=c*(8.2+l*2.4);Dt(n,h,o+.9,1.3,2.6,un("keystone"),!0),Dt(n,h,o+5.2,1.3,2.6,un(l%2===0?"pediment":"cornice",{balconet:!0}),!0),l<3&&gl(n,c*(9.4+l*2.4),o+4.5,r-o-4.5,me,.4)}n.pop(),n.push(0,0,11/2+1.6),hi(n,12,o+4.4,me);for(let c=0;c<8;c++)Eo(n,-5.25+c*1.5,2.2,o,7.6,.33,me,!0);n.boxUp("stone",12.4,.9,2.9,0,o+7.6,1.1,me),li(n,12.4,o+8.5,me,!0,!0),ta(n,"stone",13,2.6,3.1,0,o+9.05,1.1,me),n.cyl("glass",.7,.7,.1,16,0,o+10,2.67,void 0,Math.PI/2),n.sign(tn("cityhall"),4.2,.62,.1,0,o+8.05,2.58);for(let c=0;c<3;c++)Dt(n,-3+c*3,o+.2,1.6,3.4,un("arch",{sill:!1}),!0),Dt(n,-3+c*3,o+4.9,1.4,2.4,un("pediment"),!0);for(let c=0;c<5;c++)n.boxUp("stone",13-c*.4,o-c*.24,.5,0,0,3+(4-c)*.5,"#d8cfbf");n.pop();for(const c of[11/2,-11/2])n.push(0,0,c,c>0?0:Math.PI),es(n,34-.6,r+.55,-.2,me,!0),n.pop();js(n,34-1.2,11-1.6,2.2,0,r+.55,"#5d6b7a",!0);const a=r+2;n.cyl("wall",4.2,4.2,4.2,20,0,a+2.1,0,Er);for(let c=0;c<12;c++){const l=c/12*Math.PI*2;n.push(Math.sin(l)*4.25,0,Math.cos(l)*4.25,l),Dt(n,0,a+.9,.75,2.4,un("arch",{sill:!1,mullion:!1}),!0),n.pop(),Eo(n,Math.sin(l+Math.PI/12)*4.45,Math.cos(l+Math.PI/12)*4.45,a,4.2,.16,me,!0)}n.cyl("stone",4.7,4.7,.4,20,0,a+4.4,0,me),n.sphere("metal",4.3,0,a+4.6,0,cu,22,10,Math.PI/2,1,1.15,1);for(let c=0;c<12;c++){const l=c/12*Math.PI*2,h=new Pe(4.32,.08,4,10,Math.PI/2);h.scale(1,1.15,1),h.rotateY(l),h.translate(0,a+4.6,0),n.add("metal",h,Po)}n.cyl("wall",.9,.9,1.6,8,0,a+9.9,0,Er),n.cone("metal",1.1,1.3,8,0,a+10.7,0,cu),Xn(n,0,a+11.9,0,2.2);for(const c of[-10,10])n.cyl("metal",.06,.08,6,6,c,r+3.5,11/2-.5,"#d8d8d8"),n.box("plain",1.6,1,.03,c+.85,r+5.8,11/2-.5,c<0?"#c94c4c":"#2d5a8c");n.pop()}function X2(n){const t=Lt.clockX,e=Lt.clockZ,i=4.6;n.push(t,0,e),n.boxUp("stone",i+1.2,.6,i+1.2,0,0,0,"#cfc4b2"),n.boxUp("stone",i,6,i,0,.6,0,"#e9dcc4"),n.boxUp("brick",i-.4,12,i-.4,0,6.6,0);for(const a of[6.6,12.6,18.6])n.box("stone",i+.1,.35,i+.1,0,a,0,me);for(let a=0;a<4;a++)n.push(0,0,0,a*Math.PI/2),n.push(0,0,i/2-.2),Dt(n,0,1.2,1.4,3.4,un("arch",{sill:!1}),!0),Dt(n,0,8.4,.9,2.4,un("arch"),!0),Dt(n,0,14,.9,2.4,un("keystone"),!0),n.pop(),n.pop();const s=21;n.boxUp("stone",i+.4,4.6,i+.4,0,18.8,0,"#efe4d0");const o=[];for(let a=0;a<4;a++){const c=a*Math.PI/2;n.push(0,0,0,c),n.push(0,0,(i+.4)/2),n.sign(tn("clock"),3.3,3.3,.08,0,s,.04);const l=new Pe(1.72,.12,6,28);l.translate(0,s,.1),n.add("metal",l,Po),n.pop(),n.pop();const h=new U(Math.sin(c),0,Math.cos(c));o.push({center:new U(t,s,e).addScaledVector(h,(i+.4)/2+.14),rotY:c})}n.push(0,0,0);for(let a=0;a<4;a++)n.push(0,0,0,a*Math.PI/2),n.push(0,0,(i+.4)/2),li(n,i+.4,23.4,me,!0,!0),n.pop(),n.pop();n.pop();const r=24;n.boxUp("stone",i+.2,.3,i+.2,0,r,0,me);for(const a of[-1,1])for(const c of[-1,1])n.boxUp("stone",.7,3.4,.7,a*(i/2-.35),r+.3,c*(i/2-.35),"#efe4d0");n.sphere("metal",.9,0,r+2.3,0,Po,12,8,Math.PI,1,1.2,1),n.boxUp("stone",i+.4,.5,i+.4,0,r+3.7,0,me);for(let a=0;a<4;a++)n.push(0,0,0,a*Math.PI/2),es(n,i,r+4.2,i/2-.1,me,!0),n.pop();return n.cone("roof",2.4,7.5,4,0,r+4.2,0,"#5d6b7a",Math.PI/4),Xn(n,0,r+11.7,0,2),n.pop(),{faces:o}}function Y2(n){const i=Lt.minX+6.5+.6,s=Lt.fountainZ-1.5,o=13.2;n.push(i,0,s,Math.PI/2),n.boxUp("stone",22+.4,.8,13+.4,0,0,0,"#cfc4b2"),n.boxUp("stone",22,5.2,13,0,.8,0,"#f0e4cc"),n.boxUp("wall",22,o-6,13,0,6,0,"#f2d8c8"),n.push(0,0,13/2);for(let r=0;r<6;r++)Dt(n,-8.5+r*3.4,1,2.2,4.2,un("arch",{sill:!1,frame:"#f6efe2"}),!0);hi(n,22,6,me);for(let r=0;r<7;r++)gl(n,-10.2+r*3.4,6.1,o-6.1,me,.5);for(let r=0;r<6;r++)Dt(n,-8.5+r*3.4,6.9,1.5,3.2,un(r===2||r===3?"arch":"pediment",{balconet:r%2===1}),!0);li(n,22,o,me,!0,!0),ta(n,"stone",12,2.8,.8,0,o+.55,.1,me),n.sign(tn("theater"),4.6,.8,.1,0,5.4,.08);for(let r=0;r<2;r++)n.box("fabric",2.4,.06,1.4,-1.7+r*3.4,5.1,.7,"#8c2f3a",.3);n.pop(),n.push(0,0,13/2),es(n,22-.6,o+.55,-.15,me,!0),n.pop(),js(n,21,12,3.2,0,o+.55,"#7c3e36",!0);for(const r of[-6,0,6])n.boxUp("stone",.9,1,.9,r,o+3,13/2-.4,me),n.sphere("metal",.45,r,o+4.3,13/2-.4,Po,10,8);n.pop()}function Z2(n){const e=Lt.maxX-2.6,i=(Lt.minZ+Lt.maxZ)/2-1;n.push(e,0,i,-Math.PI/2),n.boxUp("stone",35,.3,4.6,0,0,0,"#d8cfbf");for(let s=0;s<=12;s++){const o=-17+34*s/12;if(Eo(n,o,1.7,.3,4.6,.24,me,!0),Eo(n,o,-1.7,.3,4.6,.24,me,!0),s<12){const r=new Pe(1.4166666666666667,.16,4,10,Math.PI);r.scale(1,.55,1),r.translate(o+34/24,4.6,1.7),n.add("stone",r,me),n.sphere("plain",.32,o+34/24,3.3,1.7,"#4f7f3c",7,5),n.sphere("plain",.12,o+34/24+.15,3.25,1.95,s%2===0?"#ff7b9c":"#ffd166",5,4),n.cyl("metal",.01,.01,.9,3,o+34/24,3.9,1.7,"#333")}}n.box("stone",34+.6,.5,4.2,0,5.15,0,me),n.push(0,0,2.1),li(n,34+.6,5.4,me,!0,!0),n.pop();for(let s=0;s<24;s++)n.box("wood",.14,.2,4,-34/2+.75+s*1.5,5.9,0,"#6b4a35");n.push(0,0,-2.3);for(let s=0;s<6;s++)n.boxUp("wood",2.6,2.4,.4,-15+s*6,.3,.3,"#8d6546");n.pop(),n.sign(tn("gallery"),4.6,.7,.1,0,5.15,2.15),n.pop()}function q2(n){const t=Lt.fountainX,e=Lt.fountainZ;n.push(t,0,e),n.lathe("stone",[[0,0],[7.2,0],[7.4,.2],[7.4,.75],[7,.85],[6.8,.85],[6.8,.3],[0,.3]],40,0,0,0,"#e8dcc6"),n.lathe("stone",[[0,.3],[1.1,.3],[.8,1.2],[.6,2.2],[.9,2.5],[0,2.5]],16,0,0,0,"#efe6d6"),n.lathe("stone",[[0,2.4],[.6,2.4],[2.9,2.75],[3.1,3],[2.9,3.05],[0,2.85]],28,0,0,0,"#efe6d6"),n.lathe("stone",[[0,3],[.45,3],[.3,4],[.55,4.3],[0,4.3]],12,0,0,0,"#efe6d6"),n.lathe("stone",[[0,4.25],[.4,4.25],[1.6,4.55],[1.7,4.75],[0,4.6]],20,0,0,0,"#efe6d6"),n.lathe("metal",[[0,4.6],[.25,4.7],[.12,5.4],[.3,5.6],[0,6.2]],10,0,0,0,Po),n.cyl("water",6.8,6.8,.05,40,0,.62,0),n.cyl("water",2.75,2.75,.04,24,0,2.95,0);for(let i=0;i<4;i++){const s=i*Math.PI/2+Math.PI/4,o=Math.cos(s)*11,r=Math.sin(s)*11;n.cyl("stone",2.6,2.6,.5,20,o,.25,r,"#d8cfbf"),n.cyl("plain",2.4,2.4,.2,20,o,.55,r,"#5d8a45");for(let a=0;a<14;a++){const c=a/14*Math.PI*2,l=a%2===0?1.8:1.1;n.sphere("plain",.28,o+Math.cos(c)*l,.75,r+Math.sin(c)*l,["#ff7b9c","#ffd166","#ffffff","#c38cf2"][(a+i)%4],6,4)}n.cone("plain",.7,2.2,7,o,.6,r,"#3e6e3a")}n.pop()}function j2(n){const{x:t,z:e,width:i,depth:s}=Ie;n.push(t,0,e),n.boxUp("stone",i+.6,.6,s+.6,0,0,0,"#cfc4b2"),n.boxUp("stone",i,11,s,0,.6,0,"#e9e1d2");for(const c of[-1,1]){n.push(c*i/2,0,0,c*Math.PI/2);for(let l=0;l<5;l++){const h=-s/2+3+l*5;n.boxUp("stone",.8,9,1,h,.6,.5,"#ddd3c2"),n.box("stone",.8,1.6,1,h,9.9,.2,"#ddd3c2",.5),l<4&&Dt(n,h+2.5,2.4,1.6,6.4,un("arch",{mullion:!0,frame:"#ddd3c2"}),!0)}n.pop()}n.pop(),n.push(t,0,e,Math.PI/2),An(n,s,i,5.4,.5,11.6,"#4c5966","stone","#e9e1d2",!0,"#d8cfbf"),n.pop(),n.push(t,0,e+s/2),n.boxUp("wood",2.6,4.2,.2,0,.6,.05,"#4e3324"),Dt(n,0,.6,3.2,5.6,un("arch",{sill:!1,frame:"#ddd3c2",mullion:!1}),!0),n.cyl("glass",2.3,2.3,.12,24,0,9,.05,void 0,Math.PI/2);const o=new Pe(2.4,.18,6,32);o.translate(0,9,.12),n.add("stone",o,"#ddd3c2");for(let c=0;c<8;c++)n.box("stone",.08,4.6,.12,0,9,.14,"#ddd3c2",0,0,c*Math.PI/8);Xn(n,0,17,-.2,2),n.pop();const r=t+i/2+2,a=e+s/2-2.6;n.push(r,0,a),n.boxUp("stone",4.6,.6,4.6,0,0,0,"#cfc4b2"),n.boxUp("stone",4,20,4,0,.6,0,"#e3dacb");for(const c of[7,13.5])n.box("stone",4.3,.3,4.3,0,c,0,me);for(let c=0;c<4;c++)n.push(0,0,0,c*Math.PI/2),n.push(0,0,2),Dt(n,0,15.2,1.2,3.6,un("arch",{mullion:!1,frame:"#ddd3c2"}),!0),Dt(n,0,8.6,.7,2.6,un("arch",{frame:"#ddd3c2"}),!0),n.pop(),n.pop();n.boxUp("stone",4.4,.6,4.4,0,20.6,0,me);for(const c of[-1,1])for(const l of[-1,1])n.cone("roof",.35,2.2,4,c*1.9,21.2,l*1.9,"#4c5966",Math.PI/4);n.cone("roof",2.4,14,8,0,21.2,0,"#4c5966",Math.PI/8),Xn(n,0,35.2,0,2.4),n.pop()}function $2(n){const e=new he(.09,5,4),i=new Ee(e,n.water,72);i.frustumCulled=!1;const s=Array.from({length:72},(a,c)=>({a:c/72*Math.PI*2*3,tier:c%3,off:c*.37%1})),o=new xe;return{mesh:i,update:a=>{s.forEach((c,l)=>{const h=(a*.7+c.off)%1;let u=0,f=0,d=0;c.tier===0?(u=Math.cos(c.a)*h*1.6,d=Math.sin(c.a)*h*1.6,f=6.2+h*2.2-h*h*5.5):c.tier===1?(u=Math.cos(c.a)*(3.1+h*.6),d=Math.sin(c.a)*(3.1+h*.6),f=3-h*h*2.3):(u=Math.cos(c.a)*(6-h*2.2),d=Math.sin(c.a)*(6-h*2.2),f=.7+h*2-h*h*2),o.position.set(Lt.fountainX+u,Math.max(.6,f),Lt.fountainZ+d),o.scale.setScalar(1-h*.4),o.updateMatrix(),i.setMatrixAt(l,o.matrix)}),i.instanceMatrix.needsUpdate=!0}}}const wf=[],lu=new Xs,hu=new ee,uu=new Float32Array(16);function Yr(n,t,e,i,s){const o=t.length,r=new Float32Array(o*16),a=[];t.forEach((g,_)=>{g.toArray(r,_*16),a.push(new U().setFromMatrixPosition(g))});const c=t.map(g=>g.getMaxScaleOnAxis()),l=new Qi(new Float32Array(o*16),16);l.setUsage(Zi);const h=s?new Qi(new Float32Array(o*3),3):null;h&&h.setUsage(Zi);for(const g of n)g.instanceMatrix=l,h&&(g.instanceColor=h),g.frustumCulled=!1,g.count=0;const u=new zn;let f=0;const d={update:(g,_)=>{let p=0;const m=l.array,x=h?h.array:null;for(let M=0;M<o;M++){const v=a[M],w=v.distanceTo(_);w>i||(u.center.copy(v),u.radius=e*c[M],!(w>25&&!g.intersectsSphere(u))&&(m.set(r.subarray(M*16,M*16+16),p*16),x&&s&&(x[p*3]=s[M].r,x[p*3+1]=s[M].g,x[p*3+2]=s[M].b),p++))}f=p,l.clearUpdateRanges(),l.addUpdateRange(0,Math.max(1,p)*16),l.needsUpdate=!0,h&&(h.clearUpdateRanges(),h.addUpdateRange(0,Math.max(1,p)*3),h.needsUpdate=!0);for(const M of n)M.count=p,M.visible=p>0},visibleCount:()=>f};return wf.push(d),d}function K2(n,t=!1){const e=n.matrixWorld.elements;let i=0;for(let o=0;o<16;o++)i+=Math.abs(e[o]-uu[o]);if(!t&&i<1e-4)return;uu.set(e),hu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),lu.setFromProjectionMatrix(hu);const s=new U().setFromMatrixPosition(n.matrixWorld);for(const o of wf)o.update(lu,s)}const fu=["#6b9c56","#e2b24a","#d97a46","#f2b8c6"];function du(n,t,e,i,s,o,r,a){if(e.length===0)return;const c=new qs;n(c);const l=[];for(const[h,u]of c.build()){const f=new Ee(u,t.get(h),e.length);f.name=`${s}_${h}`,f.castShadow=o(h),f.receiveShadow=h!=="glow",i.add(f),l.push(f)}Yr(l,e,r,a)}function J2(n,t,e,i,s){const o=new te;o.name="CityProps";const r=new xe,a=(c,l,h,u,f=1)=>(r.position.set(c,l,h),r.rotation.set(0,u,0),r.scale.setScalar(f),r.updateMatrix(),r.matrix.clone());if(du(c=>{const l="#2b2d30",h="#c9a24c";c.cyl("metal",.2,.26,.5,6,0,.39,0,l),c.cyl("metal",.15,.19,.18,6,0,.73,0,h),c.cyl("metal",.06,.085,3.6,6,0,2.6,0,l),c.cyl("metal",.1,.1,.12,6,0,3.2,0,h),c.cyl("metal",.11,.11,.12,6,0,4.35,0,h);for(const u of[-1,1])c.box("metal",.46,.045,.045,u*.23,4.56,0,l),c.box("metal",.035,.22,.035,u*.12,4.42,0,l,0,0,u*.7),c.sphere("glow",.19,u*.42,4.25,0,"#ffe0a8",7,5,Math.PI,1,1.25,1),c.cone("metal",.2,.24,6,u*.42,4.44,0,l);c.cone("metal",.05,.4,5,0,4.41,0,h)},t,e.map(([c,l,h])=>a(c,.14,l,h)),o,"OrnateLamps",c=>c==="metal",3,150),i.length>0){const c=new oe(.14,.24,2,5,1,!0);c.translate(0,1,0);const l=new Ee(c,new ct({color:"#6b4a35",roughness:.92}),i.length),h=new Ee(Q2(),new ct({color:"#ffffff",roughness:.85,flatShading:!0}),i.length),u=new rt,f=[],d=[];i.forEach(([g,_,p,m],x)=>{f.push(a(g,.1,_,x*.7,p)),u.set(fu[m%fu.length]),u.offsetHSL(x*37%10/400,0,x*13%10/160-.03),d.push(u.clone())}),l.castShadow=!0,h.castShadow=!0,h.receiveShadow=!0,l.name="StreetTreeTrunks",h.name="StreetTreeCrowns",o.add(l,h),Yr([h],f,3.5,260,d),Yr([l],f,3.5,160)}return du(c=>{for(let l=0;l<4;l++)c.box("wood",1.6,.05,.11,0,.45,-.18+l*.13,"#9c6e44");for(let l=0;l<3;l++)c.box("wood",1.6,.1,.04,0,.62+l*.13,-.27,"#9c6e44",-.15);for(const l of[-.68,.68])c.box("metal",.06,.45,.5,l,.22,0,"#2b2d30"),c.box("metal",.06,.5,.06,l,.7,-.28,"#2b2d30")},t,s.map(([c,l,h])=>a(c,.14,l,h)),o,"Benches",()=>!0,1.2,90),n.add(o),{group:o}}function Q2(){const n=new qs,t=[[0,3,0,1.3],[.7,2.55,.35,.95],[-.6,2.6,-.4,.9],[.2,2.6,-.75,.85],[.1,3.8,-.1,.8]];for(const[i,s,o,r]of t){const a=new Oo(r,0);a.translate(i,s,o),n.add("crown",a,"#ffffff")}const e=n.build().get("crown");return e.deleteAttribute("color"),e.computeVertexNormals(),e}function Tr(n,t){const e=Math.sin(n*127.1+t*311.7)*43758.5453;return e-Math.floor(e)}function Sf(n,t){const e=Math.floor(n),i=Math.floor(t),s=n-e,o=t-i,r=s*s*(3-2*s),a=o*o*(3-2*o),c=Tr(e,i),l=Tr(e+1,i),h=Tr(e,i+1),u=Tr(e+1,i+1);return c+(l-c)*r+(h-c)*a+(c-l-h+u)*r*a}function _o(n,t,e=4){let i=0,s=.5,o=1;for(let r=0;r<e;r++)i+=s*Sf(n*o,t*o),o*=2.03,s*=.5;return i}function tv(n,t,e=5){let i=0,s=.55,o=1;for(let r=0;r<e;r++){const a=1-Math.abs(Sf(n*o,t*o)*2-1);i+=s*a*a,o*=2.1,s*=.48}return i}const Yi=(n,t,e)=>{const i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)},xo=jt.groundRadius-2,co={x:jt.centerX-600,z:jt.centerZ-740,h:290,r:420};function Xa(n,t){const e=n-jt.centerX,i=t-jt.centerZ,s=Math.hypot(e,i);if(s<xo)return 0;const o=Math.atan2(i,e),r=Yi(xo,300,s);let a=(_o(n*.011,t*.011)*.9+.1)*22*r;const c=Math.abs(n-9.5);c<40&&Math.abs(t)>si&&(a+=(1-c/40)*10*r);const l=Yi(430,900,s),h=.6+.4*Math.max(Math.cos(o+3*Math.PI/4),Math.cos(o-Math.PI/4)*.7),u=tv(n*.0036+3.1,t*.0036-1.7);a+=(Math.pow(u,1.4)*270+_o(n*.006,t*.006)*60)*l*h;const f=Math.hypot(n-co.x,t-co.z);if(f<co.r){const d=1-f/co.r,g=co.h*Math.pow(d,1.35)*(1-Math.pow(Math.max(0,d-.9)*10,2)*.08);a=Math.max(a,g+_o(n*.02,t*.02)*12*d)}return a=Math.max(a,Yi(950,1400,s)*130*(.6+u*.6)),a}const ev=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
  gl_Position.z = gl_Position.w * 0.99999;
}`,nv=`
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uBottom;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunVis;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float h = d.y;
  vec3 col = mix(uHorizon, uTop, pow(clamp(h, 0.0, 1.0), 0.5));
  col = mix(col, uBottom, clamp(-h * 3.0, 0.0, 1.0));
  float sd = max(dot(d, normalize(uSunDir)), 0.0);
  col += uSunColor * (pow(sd, 1200.0) * 4.0 + pow(sd, 24.0) * 0.35 + pow(sd, 4.0) * 0.12) * uSunVis;
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;function iv(n){const t=new te;t.name="Landscape";const e={uTop:{value:new rt("#5d8fd0")},uHorizon:{value:new rt("#f4ba88")},uBottom:{value:new rt("#8a7a6a")},uSunDir:{value:new U(.5,.3,.2)},uSunColor:{value:new rt("#ffb56b")},uSunVis:{value:1}},i=new ht(new he(2400,32,16),new ci({uniforms:e,vertexShader:ev,fragmentShader:nv,side:Ke,depthWrite:!1,fog:!1}));i.frustumCulled=!1,i.renderOrder=-10,i.name="SkyDome",t.add(i);const s=60,o=220,r=1500,a=[],c=[],l=[],h=new rt,u=new rt("#93b06f"),f=new rt("#7da35a"),d=new rt("#46703c"),g=new rt("#3a5a3a"),_=new rt("#857a6d"),p=new rt("#9d958a"),m=new rt("#f3f5fa"),x=new rt("#8fa3bd");for(let I=0;I<=s;I++){const k=I/s,Q=xo+(r-xo)*Math.pow(k,1.55);for(let st=0;st<=o;st++){const bt=st/o*Math.PI*2,Wt=jt.centerX+Math.cos(bt)*Q,$=jt.centerZ+Math.sin(bt)*Q,ot=I===0?-.05:Xa(Wt,$);a.push(Wt,ot,$);const ut=_o(Wt*.03,$*.03,2),ft=150+ut*40;ot>ft?h.copy(m):ot>100+ut*25?h.copy(_).lerp(p,ut):ot>45?h.copy(d).lerp(_,Yi(70,120,ot)*.8).lerp(g,ut*.4):ot>6?h.copy(f).lerp(d,Yi(8,45,ot)*(.5+ut*.5)):h.copy(u).lerp(f,Yi(0,8,ot)),h.lerp(x,Yi(380,1300,Q)*.42),c.push(h.r,h.g,h.b)}}for(let I=0;I<s;I++)for(let k=0;k<o;k++){const Q=I*(o+1)+k,st=Q+o+1;l.push(Q,Q+1,st,Q+1,st+1,st)}const M=new ye;M.setAttribute("position",new Ft(a,3)),M.setAttribute("color",new Ft(c,3)),M.setIndex(l),M.computeVertexNormals();const v=new ht(M,new Ns({vertexColors:!0,flatShading:!0}));v.name="MountainTerrain",v.receiveShadow=!0,t.add(v);const w=(()=>{const I=new Ai(1,1.6,6,1,!0);I.translate(0,1.1,0);const k=new Ai(.75,1.3,6,1,!0);k.translate(0,2,0);const Q=[I,k].map($=>$.toNonIndexed()),st=[],bt=[];Q.forEach(($,ot)=>{const ut=$.attributes.position;for(let ft=0;ft<ut.count;ft++){st.push(ut.getX(ft),ut.getY(ft),ut.getZ(ft));const Ut=ot===0?[.72,.85,.7]:[.85,.95,.8];bt.push(Ut[0],Ut[1],Ut[2])}});const Wt=new ye;return Wt.setAttribute("position",new Ft(st,3)),Wt.setAttribute("color",new Ft(bt,3)),Wt.computeVertexNormals(),Wt})(),E=[];let R=1;const A=()=>(R=R*16807%2147483647,R/2147483647);for(let I=0;I<9e3&&E.length<1800;I++){const k=A()*Math.PI*2,Q=xo+6+Math.pow(A(),1.4)*520,st=jt.centerX+Math.cos(k)*Q,bt=jt.centerZ+Math.sin(k)*Q,Wt=Xa(st,bt);Wt>95||Math.abs(st-9.5)<8&&Math.abs(bt)<230||_o(st*.02,bt*.02,2)<.42&&Q<320||E.push([st,Wt-.3,bt,(Q<260?2.2:3.4)*(.7+A()*.6)])}const y=new Ee(w,new Ns({vertexColors:!0,flatShading:!0}),E.length),b=new xe,D=[],V=[];E.forEach(([I,k,Q,st])=>{b.position.set(I,k,Q),b.rotation.set(0,A()*Math.PI,0),b.scale.set(st,st*(.9+A()*.5),st),b.updateMatrix(),D.push(b.matrix.clone()),V.push(new rt("#3f6b3a").offsetHSL((A()-.5)*.04,(A()-.5)*.1,(A()-.5)*.08))}),Yr([y],D,3,1300,V),y.name="MountainForest",t.add(y);const G=new te,Y=new Oo(1,1),C=[];for(let I=0;I<16;I++){const k=I/16*Math.PI*2+A()*.3,Q=520+A()*600,st=jt.centerX+Math.cos(k)*Q,bt=jt.centerZ+Math.sin(k)*Q,Wt=230+A()*140,$=5+Math.floor(A()*4);for(let ot=0;ot<$;ot++){const ut=22+A()*26;b.position.set(st+(ot-$/2)*24+A()*10,Wt+A()*12,bt+(A()-.5)*30),b.rotation.set(0,A()*3,0),b.scale.set(ut*1.4,ut*.62,ut),b.updateMatrix(),C.push(b.matrix.clone())}}const N=new Ee(Y,new Ns({color:"#ffffff",emissive:"#ffffff",emissiveIntensity:.25,flatShading:!0}),C.length);C.forEach((I,k)=>N.setMatrixAt(k,I)),N.frustumCulled=!1,G.add(N),G.name="Clouds",t.add(G);const z=N.material;return n.add(t),{group:t,heightAt:Xa,setSky:I=>{e.uTop.value.copy(I.top),e.uHorizon.value.copy(I.horizon),e.uBottom.value.copy(I.bottom),e.uSunDir.value.copy(I.sunDir).normalize(),e.uSunColor.value.copy(I.sunColor),e.uSunVis.value=I.sunVis,z.emissive.copy(I.horizon).lerp(I.top,.3),z.emissiveIntensity=.18+I.sunVis*.18},update:(I,k)=>{i.position.copy(I.position),G.rotation.y=k*.0015}}}const sv=.14;function ov(){const n=[],t=(_,p)=>`${Math.round(_*10)},${Math.round(p*10)}`,e=new Map,i=(_,p,m=sv)=>{const x=t(_,p),M=e.get(x);if(M!==void 0)return M;const v=n.length;return n.push({id:v,x:_,z:p,y:m,edges:[]}),e.set(x,v),v},s=(_,p,m="walk")=>{if(_===p)return;const x=n[_],M=n[p];if(x.edges.some(w=>w.to===p))return;const v=Math.hypot(x.x-M.x,x.z-M.z);x.edges.push({to:p,kind:m,len:v}),M.edges.push({to:_,kind:m,len:v})},o=[];for(const _ of rn){const p=_.id==="EAST"?.95:_.width/2+1.2;let m=_.from,x=_.to;for(const M of rn){if(M.axis===_.axis)continue;const v=E=>E>=M.from-.5&&E<=M.to+.5,w=M.id==="EAST"?.95:M.width/2+1.2;Math.abs(m-M.at)<.6&&v(_.at)&&(m=M.at-w),Math.abs(x-M.at)<.6&&v(_.at)&&(x=M.at+w)}for(const M of[-1,1])o.push({axis:_.axis,at:_.at+M*p,from:m,to:x,pts:[]})}for(const _ of[-1,1])o.push({axis:"z",at:dt.x+_*(dt.width/2+1.6),from:dt.minZ+2,to:dt.maxZ-2,pts:[]});for(const _ of o){_.pts.push(_.from,_.to);for(const p of o){if(p.axis===_.axis)continue;const m=p.at,x=_.at;m>=_.from-.05&&m<=_.to+.05&&x>=p.from-.05&&x<=p.to+.05&&_.pts.push(m)}_.axis==="x"&&_.from<an&&_.to>an&&_.pts.push(an-3.3,an+3.3)}const r=[{x:-23.2,z:-5.1,poi:{label:"日和麵包坊",icon:"🥐",faceYaw:Math.PI,dur:[5,9],kind:"stand",weight:1}},{x:-14.8,z:-5.1,poi:{label:"商店街便利店",icon:"🥤",faceYaw:Math.PI,dur:[5,8],kind:"stand",weight:1}},{x:1.4,z:-5.1,poi:{label:"夕陽拉麵店",icon:"🍜",faceYaw:Math.PI,dur:[6,10],kind:"stand",weight:1}},{x:15.6,z:-5.1,poi:{label:"踏切珈琲",icon:"☕",faceYaw:Math.PI,dur:[6,10],kind:"stand",weight:1}},{x:27.6,z:-5.1,poi:{label:"小春日花屋",icon:"🌸",faceYaw:Math.PI,dur:[5,8],kind:"stand",weight:1}},{x:-23.4,z:5.1,poi:{label:"夕陽居酒屋",icon:"🏮",faceYaw:0,dur:[5,9],kind:"stand",weight:1}},{x:.8,z:5.1,poi:{label:"老街古書店",icon:"📖",faceYaw:0,dur:[6,10],kind:"stand",weight:1}},{x:14.3,z:4.6,poi:{label:"夕陽駅看電車",icon:"🚃",faceYaw:-Math.PI/2,dur:[5,9],kind:"stand",weight:1}},{x:27.8,z:5.1,poi:{label:"富士乃湯錢湯",icon:"♨️",faceYaw:0,dur:[6,10],kind:"stand",weight:1}},{x:-14.8,z:7,poi:{label:"街角小公園",icon:"💤",faceYaw:0,dur:[7,11],kind:"stand",weight:1}},{x:Lt.fountainX,z:Lt.fountainZ+8.6,poi:{label:"中央廣場噴水池",icon:"⛲",faceYaw:Math.PI,dur:[6,12],kind:"wander",area:"plaza",weight:4}},{x:Lt.clockX-4.2,z:Lt.clockZ,poi:{label:"鐘樓下等人",icon:"🕰️",faceYaw:Math.PI/2,dur:[6,12],kind:"stand",area:"plaza",weight:2}},{x:Lt.fountainX,z:-76,poi:{label:"市政廳前階梯",icon:"🏛️",faceYaw:Math.PI,dur:[5,9],kind:"stand",area:"plaza",weight:2}},{x:-40.2,z:-66,poi:{label:"浪漫劇場看海報",icon:"🎭",faceYaw:-Math.PI/2,dur:[5,9],kind:"stand",area:"plaza",weight:2}},{x:-2.6,z:-70,poi:{label:"迴廊市集",icon:"🛍️",faceYaw:Math.PI/2,dur:[6,10],kind:"stand",area:"plaza",weight:2}},{x:Ie.x,z:Ie.z+Ie.depth/2+4,poi:{label:"教堂前廣場",icon:"⛪",faceYaw:Math.PI,dur:[5,10],kind:"stand",weight:2}},{x:Bt.pondX+8,z:70,poi:{label:"公園池畔",icon:"🦆",faceYaw:-Math.PI/2,dur:[6,12],kind:"wander",area:"park",weight:4}}];for(let _=0;_<8;_++){const p=_/8*Math.PI*2+.2,m=Bt.pondX+Math.cos(p)*(Bt.pondR+2.2),x=Bt.pondZ+Math.sin(p)*(Bt.pondR+2.2);r.push({x:m,z:x,poi:{label:"公園長椅小憩",icon:"💤",faceYaw:-p-Math.PI/2,dur:[8,16],kind:"sit",area:"park",weight:.6}})}for(const _ of[-46.5,-39.5,-20,-12.8])r.push({x:_,z:62.4,poi:{label:"公園長椅看書",icon:"📚",faceYaw:0,dur:[8,16],kind:"sit",area:"park",weight:.6}});for(let _=dt.minZ+6;_<dt.maxZ-4;_+=9)[-100,-48,0,48,96].some(p=>Math.abs(_-p)<7)||Math.round(_/9)%3===0&&r.push({x:dt.x-dt.width/2-1.4,z:_+2.5,poi:{label:"運河邊發呆",icon:"🚤",faceYaw:Math.PI/2,dur:[8,14],kind:"sit",weight:.8}});const a=[];for(const _ of o){const p=Array.from(new Set(_.pts.map(x=>Math.round(x*100)/100))).sort((x,M)=>x-M),m=[];for(let x=0;x<p.length;x++){if(x>0){const M=p[x]-p[x-1],v=Math.floor(M/14);for(let w=1;w<=v;w++)m.push(p[x-1]+M*w/(v+1))}m.push(p[x])}a.push(m.filter(x=>x>=_.from-.05&&x<=_.to+.05).map(x=>_.axis==="x"?i(x,_.at):i(_.at,x)))}const c=[];for(const _ of r){let p=-1,m=1/0,x=0;o.forEach((E,R)=>{const A=E.axis==="x"?_.x:_.z,y=Math.abs((E.axis==="x"?_.z:_.x)-E.at);A>=E.from&&A<=E.to&&y<m&&(m=y,p=R,x=A)});const M=i(_.x,_.z,_.poi.area==="park"?.06:_.poi.area==="plaza"?.12:.14);if(n[M].poi=_.poi,_.poi.area&&(n[M].area=_.poi.area),c.push(M),p<0||m>14)continue;const v=o[p],w=v.axis==="x"?i(x,v.at):i(v.at,x);a[p].push(w),s(w,M)}o.forEach((_,p)=>{const m=Array.from(new Set(a[p])).sort((x,M)=>_.axis==="x"?n[x].x-n[M].x:n[x].z-n[M].z);for(let x=1;x<m.length;x++){const M=n[m[x-1]],v=n[m[x]];let w="walk";_.axis==="x"&&Math.min(M.x,v.x)<an&&Math.max(M.x,v.x)>an&&(w="rail"),_.axis==="x"&&Math.abs(_.at)<6&&Math.min(M.x,v.x)<-6.5&&Math.max(M.x,v.x)>-6.5&&(w="lightEW"),_.axis==="z"&&Math.abs(_.at+6.5)<4&&Math.min(M.z,v.z)<0&&Math.max(M.z,v.z)>0&&(w="lightNS"),s(M.id,v.id,w)}});const l={plaza:[],park:[]},h=(_,p,m,x,M)=>{const v=[];p.forEach((E,R)=>{v[R]=[],m.forEach((A,y)=>{if(M(E,A)){v[R][y]=-1;return}const b=i(E,A,x);n[b].area=_,v[R][y]=b,l[_].push(b)})});const w=(E,R)=>{for(let A=.25;A<1;A+=.25)if(M(E.x+(R.x-E.x)*A,E.z+(R.z-E.z)*A))return!0;return!1};p.forEach((E,R)=>{m.forEach((A,y)=>{const b=v[R][y];b<0||(R+1<p.length&&v[R+1][y]>=0&&!w(n[b],n[v[R+1][y]])&&s(b,v[R+1][y]),y+1<m.length&&v[R][y+1]>=0&&!w(n[b],n[v[R][y+1]])&&s(b,v[R][y+1]))})})},u=[0,1,2,3].map(_=>{const p=_*Math.PI/2+Math.PI/4;return[Lt.fountainX+Math.cos(p)*11,Lt.fountainZ+Math.sin(p)*11]});h("plaza",tu.xs,tu.zs,.12,(_,p)=>Math.hypot(_-Lt.fountainX,p-Lt.fountainZ)<8.4||u.some(([m,x])=>Math.hypot(_-m,p-x)<3.4)||Math.hypot(_-Lt.clockX,p-Lt.clockZ)<3.8),h("park",Ps.xs,Ps.zs,.06,(_,p)=>Math.hypot(_-Bt.pondX,p-Bt.pondZ)<Bt.pondR+1.2);const f=(_,p)=>{for(const m of l[_]){const x=n[m];for(const M of n){if(M.area===_&&!M.poi||M.id===m)continue;Math.hypot(x.x-M.x,x.z-M.z)<p&&!g2((x.x+M.x)/2,(x.z+M.z)/2)&&s(m,M.id)}}};return f("plaza",6.5),f("park",7.5),{nodes:n,poiIds:c,areaNodes:l,findPath:(_,p)=>{if(_===p)return[];const m=n.length,x=new Float64Array(m).fill(1/0),M=new Int32Array(m).fill(-1),v=new Uint8Array(m),w=[],E=(D,V)=>{w.push([D,V]);let G=w.length-1;for(;G>0;){const Y=G-1>>1;if(w[Y][0]<=w[G][0])break;[w[Y],w[G]]=[w[G],w[Y]],G=Y}},R=()=>{const D=w[0],V=w.pop();if(w.length>0){w[0]=V;let G=0;for(;;){const Y=G*2+1,C=Y+1;let N=G;if(Y<w.length&&w[Y][0]<w[N][0]&&(N=Y),C<w.length&&w[C][0]<w[N][0]&&(N=C),N===G)break;[w[N],w[G]]=[w[G],w[N]],G=N}}return D},A=n[p],y=D=>Math.hypot(n[D].x-A.x,n[D].z-A.z);for(x[_]=0,E(y(_),_);w.length;){const[,D]=R();if(D===p)break;if(!v[D]){v[D]=1;for(const V of n[D].edges){const G=x[D]+V.len;G<x[V.to]&&(x[V.to]=G,M[V.to]=D,E(G+y(V.to),V.to))}}}if(M[p]<0)return[];const b=[];for(let D=p;D!==_;D=M[D])b.push(D);return b.reverse()},nearest:(_,p)=>{let m=0,x=1/0;for(const M of n){const v=(M.x-_)**2+(M.z-p)**2;v<x&&(x=v,m=M.id)}return m}}}const lo=320,rv=115,pu=45,mu=80,av=["#e06c53","#4d7ea8","#f0a6ca","#5b8c5a","#f2c14e","#7d6b91","#5fa8d3","#d97a46","#99c2a2","#c95f5f","#e6b89c","#495867","#ffffff","#2f4858","#e9c46a","#a8dadc","#b5838d","#6d597a"],cv=["#3b4d6b","#444852","#5c4b51","#4d463c","#4b644a","#353a47","#3d4c5c","#3d4047","#524943","#334054","#2f343d","#6b5b4b","#8a6f5a"],lv=["#4a3525","#2c2623","#593b2b","#302824","#6b442a","#262322","#3b2b22","#2b241f","#543828","#382a20","#a0703f","#c9a36b","#7a3b2b"],hv=["#ffdfc4","#f7d3b5","#ffe3cc","#f2cba9","#ffe0c8","#f5cfa8","#e8b994","#d9a07a"],uv=["#d9534f","#e6c280","#ffffff","#2d5a43","#c96444","#3b5ea2","#f2c14e"],gu=["小春","健太","美咲","大輔","花子","阿哲","小葵","翔太","優衣","陽太","奈奈","蓮","結衣","悠真","凜","湊","陽菜","颯太","美月","大和","莉子","拓海","彩花","千尋","真白","琴音","航","雪乃","楓","紗希","誠","舞"],fv=["佐藤","鈴木","高橋","田中","伊藤","渡邊","山本","中村","小林","加藤","吉田","山田"];function dv(){const n=[],t=(c,l,h)=>n.push({g:c,part:l,slot:h}),e=()=>new On(.085,.2,2,5);for(const[c,l]of[[-.1,1],[.1,2]])t(e().translate(c,.24,0),l,1),t(new At(.15,.09,.22).translate(c,.06,.04),l,4);t(new oe(.19,.24,.46,8).translate(0,.6,0),0,0),t(new oe(.21,.34,.28,8,1,!0).translate(0,.43,0),0,10);for(const[c,l,h]of[[-.26,3,.2],[.26,4,-.2]])t(new On(.07,.2,2,5).rotateZ(h).translate(c,.6,0),l,0),t(new he(.065,5,3).translate(c*1.12,.42,0),l,2);t(new At(.26,.28,.13).translate(0,.62,-.22),0,8),t(new he(.29,10,7).translate(0,1.08,0),5,2),t(new he(.305,10,5,0,Math.PI*2,0,Math.PI*.58).rotateX(-.18).translate(0,1.08,0),5,3),t(new On(.2,.28,2,6).scale(1.15,1,.6).translate(0,.95,-.15),5,9),t(new oe(.24,.28,.12,8).rotateX(-.12).translate(0,1.35,-.02),5,7),t(new oe(.38,.38,.025,10).rotateX(-.12).translate(0,1.3,0),5,7);for(const c of[-.095,.095])t(new he(.032,4,3).translate(c,1.1,.26),5,5),t(new he(.042,4,3).scale(1.2,.65,.4).translate(c*1.68,1.04,.23),5,6);const i=[],s=[],o=[],r=[];for(const{g:c,part:l,slot:h}of n){const u=i.length/3,f=c.attributes.position,d=c.attributes.normal;for(let g=0;g<f.count;g++)i.push(f.getX(g),f.getY(g),f.getZ(g)),s.push(d.getX(g),d.getY(g),d.getZ(g)),o.push(l,h);if(c.index)for(let g=0;g<c.index.count;g++)r.push(u+c.index.getX(g));else for(let g=0;g<f.count;g++)r.push(u+g);c.dispose()}const a=new ye;return a.setAttribute("position",new Ft(i,3)),a.setAttribute("normal",new Ft(s,3)),a.setAttribute("aPS",new Ft(o,2)),a.setIndex(r),a.computeBoundingSphere(),a}const pv=`
attribute vec2 aPS;
attribute vec3 iShirt;
attribute vec3 iPants;
attribute vec3 iHair;
attribute vec4 iSkinF;
attribute vec4 iAccent;
attribute vec4 iAnim;
mat3 crowdRotX(float a) { float c = cos(a); float s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }
mat3 crowdRotY(float a) { float c = cos(a); float s = sin(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
void crowdXform(out mat3 R, out vec3 P) {
  float part = aPS.x;
  float sw = sin(iAnim.x);
  R = mat3(1.0);
  P = vec3(0.0);
  if (part > 0.5 && part < 1.5) { P = vec3(-0.1, 0.42, 0.0); R = crowdRotX(iAccent.w + sw * iAnim.y); }
  else if (part > 1.5 && part < 2.5) { P = vec3(0.1, 0.42, 0.0); R = crowdRotX(iAccent.w - sw * iAnim.y); }
  else if (part > 2.5 && part < 3.5) { P = vec3(-0.26, 0.78, 0.0); R = crowdRotX(-sw * iAnim.z); }
  else if (part > 3.5 && part < 4.5) { P = vec3(0.26, 0.78, 0.0); R = crowdRotX(sw * iAnim.z); }
  else if (part > 4.5) { P = vec3(0.0, 0.88, 0.0); R = crowdRotY(iAnim.w); }
}
float crowdVisible() {
  float fl = floor(iSkinF.w + 0.5);
  float slot = aPS.y;
  if (abs(slot - 7.0) < 0.5) return mod(fl, 2.0);
  if (abs(slot - 8.0) < 0.5) return mod(floor(fl / 2.0), 2.0);
  if (abs(slot - 9.0) < 0.5) return mod(floor(fl / 4.0), 2.0);
  if (abs(slot - 10.0) < 0.5) return mod(floor(fl / 8.0), 2.0);
  return 1.0;
}
`,mv=`
#include <begin_vertex>
{
  mat3 cR; vec3 cP;
  crowdXform(cR, cP);
  transformed = cP + cR * (transformed - cP);
  transformed *= crowdVisible();
}
`;function _u(n,t){n.onBeforeCompile=e=>{let i=e.vertexShader.replace("void main() {",`${pv}
${t?"varying vec3 vCrowdColor;":""}
void main() {`);i=i.replace("#include <begin_vertex>",mv),t&&(i=i.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
        { mat3 nR; vec3 nP; crowdXform(nR, nP); objectNormal = nR * objectNormal; }
        {
          float slot = aPS.y;
          vec3 c = iShirt;
          if (slot > 0.5 && slot < 1.5) c = iPants;
          else if (slot > 1.5 && slot < 2.5) c = iSkinF.rgb;
          else if (slot > 2.5 && slot < 3.5) c = iHair;
          else if (slot > 3.5 && slot < 4.5) c = vec3(0.16, 0.1, 0.07);
          else if (slot > 4.5 && slot < 5.5) c = vec3(0.03, 0.025, 0.02);
          else if (slot > 5.5 && slot < 6.5) c = vec3(1.0, 0.42, 0.42);
          else if (slot > 6.5 && slot < 7.5) c = iAccent.rgb;
          else if (slot > 7.5 && slot < 8.5) c = vec3(0.6, 0.38, 0.16);
          else if (slot > 8.5 && slot < 9.5) c = iHair;
          else if (slot > 9.5) c = iPants;
          vCrowdColor = c;
        }`),e.fragmentShader=e.fragmentShader.replace("void main() {",`varying vec3 vCrowdColor;
void main() {`).replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= vCrowdColor;`)),e.vertexShader=i},n.customProgramCacheKey=()=>t?"crowd-color":"crowd-depth"}function gv(n){const t=ov(),e=t.nodes,i=dv(),s=B=>{const L=new Qi(new Float32Array(lo*B),B);return L.setUsage(Zi),L},o=s(3),r=s(3),a=s(3),c=s(4),l=s(4),h=s(4);i.setAttribute("iShirt",o),i.setAttribute("iPants",r),i.setAttribute("iHair",a),i.setAttribute("iSkinF",c),i.setAttribute("iAccent",l),i.setAttribute("iAnim",h);const u=new Ns({color:"#ffffff"});_u(u,!0);const f=new nf({depthPacking:Iu});_u(f,!1);const d=new Ee(i,u,lo);d.instanceMatrix.setUsage(Zi),d.customDepthMaterial=f,d.castShadow=!1,d.receiveShadow=!0,d.frustumCulled=!1,d.count=0,d.name="CrowdInstanced",n.add(d);const g=document.createElement("canvas");g.width=64,g.height=64;const _=g.getContext("2d"),p=_.createRadialGradient(32,32,2,32,32,31);p.addColorStop(0,"rgba(0,0,0,0.55)"),p.addColorStop(.6,"rgba(0,0,0,0.3)"),p.addColorStop(1,"rgba(0,0,0,0)"),_.fillStyle=p,_.fillRect(0,0,64,64);const m=new Ys(.95,.95);m.rotateX(-Math.PI/2);const x=new Ee(m,new Ci({map:new kn(g),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),lo);x.instanceMatrix.setUsage(Zi),x.frustumCulled=!1,x.count=0,x.renderOrder=1,x.name="CrowdBlobShadows",n.add(x);const M=new ee;let v=314159;const w=()=>(v=v*16807%2147483647,v/2147483647),E=B=>B[Math.floor(w()*B.length)],R=e.filter(B=>B.edges.length>0),A=[];let y=0;const b=B=>{const L=w(),Ot=L<.17?"runner":L<.42?"stroller":"walker",wt=R[Math.floor(w()*R.length)],Ht=w()<.5;let _t=0;w()<.3&&(_t|=1),w()<.45&&Ot!=="runner"&&(_t|=2),Ht&&w()<.7&&(_t|=4),Ht&&Ot!=="runner"&&w()<.55&&(_t|=8);const Nt=B<12?gu[B]:`${E(fv)}${E(gu)}`,xt=Ot==="runner"?3+w()*1.2:Ot==="stroller"?.75+w()*.3:1.25+w()*.4;return{id:`c${B+1}`,name:Nt,kind:Ot,speed:xt,pos:new U(wt.x,wt.y,wt.z),yaw:w()*Math.PI*2,lane:(w()-.5)*1.3,cur:wt.id,path:[],state:"WALK",timer:0,phase:w()*Math.PI*2,headYaw:0,label:"",icon:"🎵",wanderLeft:0,lookTimer:4+w()*10,acc:0,shirt:new rt(E(Ot==="runner"?["#ff6b6b","#4dabf7","#51cf66","#fcc419","#ffffff"]:av)),pants:new rt(E(Ot==="runner"?["#2b2d42","#343a40","#1d3557"]:cv)),hair:new rt(E(lv)),skin:new rt(E(hv)),accent:new rt(E(uv)),flags:_t,legBase:0,hurry:!1}};for(let B=0;B<lo;B++){const L=b(B);A.push(L),V(L)}y=260;function D(B,L){B.path=t.findPath(B.cur,L)}function V(B){var xt,P;B.state="WALK",B.legBase=0;const L=e[B.cur];if(B.wanderLeft>0&&L.area){B.wanderLeft--;const S=t.areaNodes[L.area],O=S.filter(tt=>tt!==B.cur&&Math.hypot(e[tt].x-L.x,e[tt].z-L.z)<16),K=(O.length?O:S)[Math.floor(w()*(O.length||S.length))];if(D(B,K),B.label=L.area==="plaza"?"中央廣場散步":"公園散步",B.icon=L.area==="plaza"?"⛲":"🌳",B.path.length)return}if(B.kind==="runner"){let S=B.cur;for(let O=0;O<6;O++){const K=R[Math.floor(w()*R.length)];if(Math.hypot(K.x-L.x,K.z-L.z)>60){S=K.id;break}}D(B,S),B.label="城市慢跑",B.icon="🏃";return}const Ot=t.poiIds.filter(S=>S!==B.cur);let wt=0;const Ht=Ot.map(S=>{const O=e[S].poi;let K=O.weight;B.kind==="stroller"&&O.area&&(K*=2.5);const tt=Math.hypot(e[S].x-L.x,e[S].z-L.z);return K*=1/(1+tt/90),wt+=K,K});let _t=w()*wt,Nt=Ot[0];for(let S=0;S<Ot.length;S++)if(_t-=Ht[S],_t<=0){Nt=Ot[S];break}D(B,Nt),B.label=((xt=e[Nt].poi)==null?void 0:xt.label)??"城市散步",B.icon=((P=e[Nt].poi)==null?void 0:P.icon)??"🎵",B.path.length||(B.state="LOOK",B.timer=2)}const G=(B,L)=>{var Ot;return((Ot=e[B].edges.find(wt=>wt.to===L))==null?void 0:Ot.kind)??"walk"};function Y(B,L,Ot,wt,Ht){if(B.state==="ACTIVITY"||B.state==="SIT"||B.state==="LOOK"){B.timer-=L,B.headYaw=Math.sin(Ot*1.1+B.phase)*(B.state==="LOOK"?.6:.3),B.timer<=0&&(B.state==="LOOK"&&B.path.length?B.state="WALK":V(B),B.legBase=0);return}if(B.path.length===0){C(B);return}const _t=B.path[0],Nt=e[B.cur],xt=e[_t],P=G(B.cur,_t);if(Math.hypot(B.pos.x-Nt.x,B.pos.z-Nt.z)<1){if(P==="rail"&&Ht){B.state="WAIT_TRAIN",B.headYaw=Math.sin(Ot*1.6)*.4;return}if(P==="lightEW"&&wt!=="EW_GREEN"||P==="lightNS"&&wt!=="NS_GREEN"){B.state="WAIT_LIGHT",B.headYaw*=.9;return}}B.state="WALK",B.hurry=P==="rail"&&Ht;const O=xt.x-Nt.x,K=xt.z-Nt.z,tt=Math.hypot(O,K)||1,et=xt.area||xt.poi?0:B.lane,It=xt.x+-K/tt*et,mt=xt.z+O/tt*et,St=It-B.pos.x,Kt=mt-B.pos.z,at=Math.hypot(St,Kt),yt=B.speed*(B.hurry?2.2:1)*L;let zt=Math.atan2(St,Kt)-B.yaw;for(;zt>Math.PI;)zt-=Math.PI*2;for(;zt<-Math.PI;)zt+=Math.PI*2;if(B.yaw+=zt*Math.min(1,L*8),at<=yt+.05)B.pos.x=It,B.pos.z=mt,B.cur=_t,B.path.shift(),B.path.length===0&&C(B);else{B.pos.x+=St/at*yt,B.pos.z+=Kt/at*yt;const Rt=1-Math.min(1,at/tt);B.pos.y=Nt.y+(xt.y-Nt.y)*Rt}B.phase+=L*B.speed*(B.kind==="runner"?2.9:5),B.headYaw*=.9,B.kind==="stroller"&&(B.lookTimer-=L,B.lookTimer<=0&&(B.lookTimer=8+w()*14,B.state="LOOK",B.timer=1.5+w()*2.5))}function C(B){const L=e[B.cur];if(B.pos.y=L.y,B.kind==="runner"){w()<.2?(B.state="LOOK",B.timer=2+w()*3,B.label="慢跑中途伸展",B.icon="💦"):V(B);return}if(L.poi){const Ot=L.poi;B.yaw=Ot.faceYaw,B.label=Ot.label,B.icon=Ot.icon,B.timer=Ot.dur[0]+w()*(Ot.dur[1]-Ot.dur[0]),Ot.kind==="sit"?(B.state="SIT",B.legBase=-1.45,B.pos.x+=Math.sin(Ot.faceYaw)*.05,B.pos.z+=Math.cos(Ot.faceYaw)*.05):(B.state="ACTIVITY",Ot.kind==="wander"&&(B.wanderLeft=2+Math.floor(w()*4)));return}if(B.wanderLeft>0){B.state="LOOK",B.timer=1+w()*3,B.path=[];return}V(B)}const N=new Xs,z=new ee,I=new zn(new U,1),k=new ee,Q=new Wn,st=new xn,bt=new U(1,1,1),Wt=new U,$=[];let ot={total:0,drawn:0,full:0},ut=null;const ft=new Map,Ut=B=>{const L=ft.get(B);if(L)return L;const Ot=document.createElement("canvas");Ot.width=64,Ot.height=64;const wt=Ot.getContext("2d");wt.fillStyle="rgba(255, 250, 242, 0.94)",wt.strokeStyle="rgba(92, 64, 46, 0.55)",wt.lineWidth=3,wt.beginPath(),wt.arc(32,28,22,0,Math.PI*2),wt.fill(),wt.stroke(),wt.beginPath(),wt.moveTo(26,48),wt.lineTo(32,58),wt.lineTo(38,48),wt.closePath(),wt.fill(),wt.font='26px "Segoe UI Emoji", "Apple Color Emoji", sans-serif',wt.textAlign="center",wt.textBaseline="middle",wt.fillText(B,32,29);const Ht=new kn(Ot);Ht.colorSpace=Fe;const _t=new Vu({map:Ht,transparent:!0,depthTest:!0});return ft.set(B,_t),_t},ce=[];for(let B=0;B<8;B++){const L=new _p(Ut("🎵"));L.scale.set(.62,.62,1),L.visible=!1,n.add(L),ce.push(L)}return{mesh:d,update:(B,L,Ot,wt,Ht)=>{z.multiplyMatrices(Ht.projectionMatrix,Ht.matrixWorldInverse),N.setFromProjectionMatrix(z);const _t=Ht.position;let Nt=0,xt=0;$.length=0;const P=[];for(let S=0;S<y;S++){const O=A[S],K=O.pos.distanceTo(_t);I.center.set(O.pos.x,O.pos.y+.75,O.pos.z);const tt=K<rv&&N.intersectsSphere(I),et=O.id===ut;O.acc+=B;const It=et||tt&&K<pu,mt=tt&&K<mu,St=It?0:mt?1/30:.2;if(O.acc>=St&&(Y(O,Math.min(O.acc,.25),L,Ot,wt),O.acc=0),!tt&&!et)continue;It&&xt++;const Kt=O.kind==="runner"&&O.state==="WALK",at=O.state==="WALK",yt=K<pu?1:K<mu?.7:0,Xt=at?(Kt?.95:O.kind==="stroller"?.38:.55)*yt:0,zt=at?(Kt?1.05:O.kind==="stroller"?.2:.4)*yt:0,Rt=at?Math.abs(Math.sin(O.phase))*(Kt?.09:.05)*yt:O.state==="SIT"?0:Math.abs(Math.sin(L*2.2+O.phase))*.015,ae=Kt?.2:0,Jt=O.state==="SIT"?.12:0;Wt.set(O.pos.x,O.pos.y+Rt+Jt,O.pos.z),st.set(ae,O.yaw,0,"YXZ"),Q.setFromEuler(st),k.compose(Wt,Q,bt),k.toArray(d.instanceMatrix.array,Nt*16),M.makeTranslation(O.pos.x,O.pos.y+.015,O.pos.z),M.toArray(x.instanceMatrix.array,Nt*16),o.array.set([O.shirt.r,O.shirt.g,O.shirt.b],Nt*3),r.array.set([O.pants.r,O.pants.g,O.pants.b],Nt*3),a.array.set([O.hair.r,O.hair.g,O.hair.b],Nt*3),c.array.set([O.skin.r,O.skin.g,O.skin.b,O.flags],Nt*4),l.array.set([O.accent.r,O.accent.g,O.accent.b,O.legBase],Nt*4),h.array.set([O.phase,Xt,zt,O.headYaw],Nt*4),$.push(S),Nt++,K<34&&(O.state==="ACTIVITY"||O.state==="SIT"||O.state==="WAIT_TRAIN"||O.state==="WAIT_LIGHT")&&P.push([K,O])}d.count=Nt,x.count=Nt,x.instanceMatrix.clearUpdateRanges(),x.instanceMatrix.addUpdateRange(0,Math.max(1,Nt)*16),x.instanceMatrix.needsUpdate=!0;for(const S of[d.instanceMatrix,o,r,a,c,l,h])S.clearUpdateRanges(),S.addUpdateRange(0,Math.max(1,Nt)*S.itemSize),S.needsUpdate=!0;P.sort((S,O)=>S[0]-O[0]),ce.forEach((S,O)=>{const K=P[O];if(!K){S.visible=!1;return}const tt=K[1],et=tt.state==="WAIT_TRAIN"?"🚃":tt.state==="WAIT_LIGHT"?"🚦":tt.icon;S.material=Ut(et),S.position.set(tt.pos.x,tt.pos.y+(tt.state==="SIT"?1.7:1.88)+Math.sin(L*3+tt.phase)*.05,tt.pos.z),S.visible=!0}),ot={total:y,drawn:Nt,full:xt}},pickCitizen:B=>{let L=null,Ot=1/0;const wt=new zn(new U,.55),Ht=new U;for(const _t of $){const Nt=A[_t];if(wt.center.set(Nt.pos.x,Nt.pos.y+.75,Nt.pos.z),B.ray.intersectSphere(wt,Ht)){const xt=Ht.distanceTo(B.ray.origin);xt<Ot&&(Ot=xt,L=Nt.id)}}return L},followById:B=>{ut=B},getFollowedInfo:()=>{if(!ut)return null;const B=A.find(Ot=>Ot.id===ut);if(!B)return null;let L=B.kind==="runner"?"沿著街道慢跑中 🏃":`前往 ${B.label} ${B.icon}`;return B.state==="ACTIVITY"||B.state==="SIT"?L=`正在 ${B.label} ${B.icon}`:B.state==="LOOK"?L="停下來東張西望 👀":B.state==="WAIT_TRAIN"?L="正在平交道等電車通過 🚃":B.state==="WAIT_LIGHT"&&(L="正在路口等紅綠燈 🚦"),{name:B.name,activityText:L,position:B.pos}},stats:()=>ot,setCount:B=>{y=Math.max(0,Math.min(lo,B))}}}function Ef(n){n.updateMatrixWorld(!0);const t=new ee().copy(n.matrixWorld).invert(),e=new Map,i=new Map,s=l=>{const h=l;return!h.isMeshStandardMaterial||h.map||h.transparent||h.vertexColors||Object.prototype.hasOwnProperty.call(h,"onBeforeCompile")||h.emissive&&(h.emissive.r>0||h.emissive.g>0||h.emissive.b>0)?null:`plain|${h.roughness.toFixed(2)}|${h.metalness.toFixed(2)}|${h.flatShading}|${h.side}`};let o=0;const r=l=>{let h=l;for(;h&&h!==n;){if(h.userData.dynamic)return!0;h=h.parent}return!1},a=[];n.traverse(l=>{l!==n&&l.userData.dynamic&&l.children.length>1&&a.push(l);const h=l;if(!h.isMesh||h.isInstancedMesh||h.isSkinnedMesh||Array.isArray(h.material)||r(h))return;o++;const u=s(h.material),f=`${u??h.material.uuid}|${h.castShadow}|${h.receiveShadow}|${h.visible}`;let d=e.get(f);if(!d){let g=h.material;if(u){let _=i.get(u);if(!_){const p=h.material;_=new ct({vertexColors:!0,roughness:p.roughness,metalness:p.metalness,flatShading:p.flatShading,side:p.side}),i.set(u,_)}g=_}d={mat:g,cast:h.castShadow,recv:h.receiveShadow,items:[],tint:!!u},e.set(f,d)}d.items.push(h)});let c=o;for(const l of e.values()){if(l.items.length<2&&!l.tint)continue;const h=[];for(const d of l.items){let g=d.geometry.clone();for(const p of Object.keys(g.attributes))p!=="position"&&p!=="normal"&&p!=="uv"&&p!=="color"&&g.deleteAttribute(p);g.attributes.color&&!l.tint&&g.deleteAttribute("color"),g.attributes.uv||g.setAttribute("uv",new Ft(new Float32Array(g.attributes.position.count*2),2)),g.attributes.normal||g.computeVertexNormals(),g.index&&(g=g.toNonIndexed()),g.clearGroups();const _=new ee().multiplyMatrices(t,d.matrixWorld);if(g.applyMatrix4(_),l.tint){const p=d.material.color,m=new Float32Array(g.attributes.position.count*3);for(let x=0;x<m.length;x+=3)m[x]=p.r,m[x+1]=p.g,m[x+2]=p.b;g.setAttribute("color",new Xe(m,3))}h.push(g)}const u=uf(h,!1);if(h.forEach(d=>d.dispose()),!u)continue;const f=new ht(u,l.mat);f.castShadow=l.cast,f.receiveShadow=l.recv,f.visible=l.items[0].visible,f.name=`Baked_${l.items[0].name||"mesh"}`,n.add(f);for(const d of l.items)d.removeFromParent();c-=l.items.length-1}for(const l of a){const h=Ef(l);c-=h.before-h.after}return{before:o,after:c}}const _v=document.getElementById("app"),re=new q1({antialias:!0,powerPreference:"high-performance"});re.setSize(window.innerWidth,window.innerHeight);const vl=Math.min(window.devicePixelRatio||1,1.5);re.setPixelRatio(Math.min(vl,1.25));re.shadowMap.enabled=!0;re.shadowMap.type=Yc;re.shadowMap.autoUpdate=!1;re.shadowMap.needsUpdate=!0;re.toneMapping=Mu;re.toneMappingExposure=1.08;re.outputColorSpace=Fe;_v.appendChild(re.domElement);const en=new Hu,$e=lx(re.domElement),Io=hx(en),Ii=U2(re);Ii.setSignAtlas(df().texture);const Tf=iv(en),Ya=_2(en,Ii),Si=ux(en);Si.setGridVisible(!1);const xv=Lx(en,Ii),Lo=V2(en,Ii),vv=W2(en,Ii),Zr=kx(en),Za=Mf();J2(en,Ii,[...Za.lamps,...Ya.extraLamps],[...Za.trees,...Ya.parkTrees,...vf()],[...Za.benches,...Ya.parkBenches]);const Nr=Jx(en),fn=gv(en),Tn=w2(en),Af=E2(en),Mv=[Zr.group,Si.group,Af.group,Nr.group].map(n=>Ef(n));console.info("[city] 靜態合併",Mv,"城市建築",Lo.lots.length,"棟");let ji=17.25,Wc=!1,kc=!0;const Do=n=>{ji=(n%24+24)%24;const{nightFactor:t,periodLabel:e,sky:i}=Io.updateTimeOfDay(ji);Ii.setNight(t),Zr.setNightFactor(t),Tf.setSky(i),re.toneMappingExposure=1.06+t*.14,kc=!0,cn.updateTimeDisplay(ji,e)};let Ml="smooth",qr=0,Bn=re.getPixelRatio();const bl=n=>{Ml=n,n==="eco"?(qr=1e3/30,Bn=1,re.setPixelRatio(1),Io.setShadowMapSize(1024),fn.setCount(180)):n==="smooth"&&(qr=0,Bn=Math.min(vl,1.25),re.setPixelRatio(Bn),Io.setShadowMapSize(1024),fn.setCount(260)),re.shadowMap.needsUpdate=!0},Fs=()=>{const n=!Tn.isActive();n&&(fn.followById(null),cn.setFollowStatus(null)),Tn.setActive(n),cn.setPlayerModeUI(n),$i==null||$i.setPlayerMode(n),re.shadowMap.needsUpdate=!0},Rf=()=>{re.render(en,$e.camera);const n=document.createElement("a");n.download=`sunset-city-3d-${Math.round(ji*100)}.png`,n.href=re.domElement.toDataURL("image/png"),n.click()},cn=C2({onResetCamera:()=>{fn.followById(null),cn.setFollowStatus(null),Tn.isActive()&&Fs(),$e.reset()},onToggleGrid:n=>Si.setGridVisible(n),onToggleBuildingMode:n=>{xv.setVisible(n),Si.setBlockoutVisible(!n),re.shadowMap.needsUpdate=!0},onChangePerfMode:bl,onStopFollow:()=>{fn.followById(null),cn.setFollowStatus(null)},onChangeTimeOfDay:Do,onToggleAutoTime:n=>{Wc=n},onTogglePlayerMode:Fs,onCapturePhoto:Rf});Do(ji);bl("smooth");const Xc=()=>{cn.togglePhotoMode(),$i==null||$i.setPhotoMode(cn.isPhotoMode())};let $i=null;P2()&&($i=L2({onTogglePlayer:Fs,onTogglePhoto:Xc,onCapture:Rf,isPhotoMode:cn.isPhotoMode,setVirtualInput:Tn.setVirtualInput,toggleEmote:Tn.toggleEmote}),cn.setPerfMode("eco"));const xu=new l0,qa=new it;let Cf=0,Pf=0;re.domElement.addEventListener("pointerdown",n=>{Cf=n.clientX,Pf=n.clientY});re.domElement.addEventListener("pointerup",n=>{if(n.button!==0||Tn.isActive()||Math.hypot(n.clientX-Cf,n.clientY-Pf)>6)return;qa.x=n.clientX/window.innerWidth*2-1,qa.y=-(n.clientY/window.innerHeight)*2+1,xu.setFromCamera(qa,$e.camera);const t=fn.pickCitizen(xu);t&&fn.followById(t)});window.addEventListener("keydown",n=>{n.key==="r"||n.key==="R"?(fn.followById(null),cn.setFollowStatus(null),Tn.isActive()&&Fs(),$e.reset()):n.key==="Escape"?(fn.followById(null),cn.setFollowStatus(null),Tn.isActive()&&Fs(),cn.isPhotoMode()&&Xc()):n.key==="p"||n.key==="P"?Fs():(n.key==="h"||n.key==="H")&&Xc()});window.addEventListener("resize",()=>{const n=window.innerWidth,t=window.innerHeight;$e.resize(n,t),re.setSize(n,t),re.shadowMap.needsUpdate=!0,Lo.update($e.camera,!0)});let ja=performance.now(),vi=0,Ar=0;const vu=new U(1e9,0,0);let Rr=0,$a=0,Ka=0,If=!0;const bv=n=>{if(!If||Ml!=="smooth"||n>60||(Rr+=n,$a++,Ka-=n,Rr<1500))return;const t=$a*1e3/Rr;if(Rr=0,$a=0,Ka>0)return;const e=Math.min(vl,1.25);let i=Bn;t<48?i=Math.max(.75,Bn-.125):t>58&&Bn<e&&(i=Math.min(e,Bn+.0625)),i!==Bn&&(Bn=i,re.setPixelRatio(Bn),Ka=2500)};function Lf(n){if(requestAnimationFrame(Lf),document.hidden||Ml==="paused"){ja=n;return}const t=n-ja;qr>0&&t<qr-1||(ja=n,na(t),bv(t))}function na(n){const t=Math.min(n/1e3,.1);vi+=t;const e=$e.camera;Wc&&Do(ji+t*.26);const i=Nr.update(t);Si.setCrossingActive(i.crossingActive),Si.update(vi,t),Zr.update(vi),Af.update(t),Ii.update(vi),vv.update(vi,ji);const s=$e.controls.getAzimuthalAngle(),o=Tn.update(t,vi,s,{crossingClosed:Si.isCrossingClosed(),trainBounds:Nr.getBounds()},e.position);if(Tn.isActive())cn.setLandmarkPrompt(o),$e.followPosition(Tn.getPosition(),t);else{const u=fn.getFollowedInfo();u&&($e.followPosition(u.position,t),cn.setFollowStatus(u.name,u.activityText))}$e.update(),e.updateMatrixWorld(),fn.update(t,vi,Zr.getTrafficPhase(),Si.isCrossingClosed(),e),Lo.update(e),K2(e),Tf.update(e,vi),Io.update(e),Ar+=t;const r=$e.controls.target,a=r.distanceTo(vu)>2.5,c=i.isMoving||Nr.getBounds()!==null||Tn.isActive();if(a||kc||c&&Ar>=.15||Wc&&Ar>=.5){const u=e.position.distanceTo(r);Io.setShadowFocus(r,u),vu.copy(r),re.shadowMap.needsUpdate=!0,Ar=0,kc=!1}re.render(en,e);const l=fn.stats(),h=Lo.stats();cn.updateStats(re,n,{crowd:`${l.drawn}/${l.total}`,buildings:`${h.lod0}/${h.lod1}`,pixelRatio:re.getPixelRatio()})}window.__bench=(n=120,t=16.7)=>{const e=re.getContext(),i=new Uint8Array(4),s=performance.now();let o=0,r=0;for(let c=0;c<n;c++)na(t),e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,i),o=Math.max(o,re.info.render.calls),r=Math.max(r,re.info.render.triangles);const a=(performance.now()-s)/n;return{msPerFrame:+a.toFixed(2),fps:+(1e3/a).toFixed(1),calls:o,tris:r}};window.__profile=async(n=120)=>{const t=re.getContext(),e=t.getExtension("EXT_disjoint_timer_query_webgl2"),i=[],s=[];let o=0,r=0;for(let u=0;u<n;u++){const f=e?t.createQuery():null;e&&f&&t.beginQuery(e.TIME_ELAPSED_EXT,f);const d=performance.now();na(16.7),i.push(performance.now()-d),e&&f&&(t.endQuery(e.TIME_ELAPSED_EXT),s.push(f)),o+=re.info.render.calls,r+=re.info.render.triangles,await new Promise(g=>setTimeout(g,0))}await new Promise(u=>setTimeout(u,300));const a=[];for(const u of s){for(let f=0;f<50&&!t.getQueryParameter(u,t.QUERY_RESULT_AVAILABLE);f++)await new Promise(d=>setTimeout(d,10));t.getQueryParameter(u,t.QUERY_RESULT_AVAILABLE)&&a.push(t.getQueryParameter(u,t.QUERY_RESULT)/1e6),t.deleteQuery(u)}const c=u=>u.reduce((f,d)=>f+d,0)/Math.max(1,u.length),l=u=>[...u].sort((f,d)=>f-d)[Math.floor(u.length*.95)]??0,h=i.map((u,f)=>Math.max(u,a[f]??0));return{cpuAvg:+c(i).toFixed(2),gpuAvg:+c(a).toFixed(2),frameAvg:+c(h).toFixed(2),frameP95:+l(h).toFixed(2),estFps:+(1e3/c(h)).toFixed(1),minFpsP95:+(1e3/l(h)).toFixed(1),drawCallsAvg:Math.round(o/n),trianglesAvg:Math.round(r/n),pixelRatio:re.getPixelRatio()}};window.__city={renderer:re,scene:en,cameraRig:$e,crowd:fn,cityBuildings:Lo,applyTimeOfDay:Do,applyPerfMode:bl,setAdaptive:n=>{If=n},shot:(n,t,e)=>{e!==void 0&&Do(e),fn.followById(null),$e.camera.position.set(...n),$e.controls.target.set(...t),$e.controls.update();for(let i=0;i<3;i++)na(16.7)}};requestAnimationFrame(Lf);
